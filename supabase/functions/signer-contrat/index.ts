import { getCaller, deny, corsHeaders } from "../_shared/auth.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";
import { Resend } from "npm:resend@2.0.0";

/**
 * Signature électronique d'un contrat par le crew (loi 53-05 : signature électronique simple).
 * - seul le crew concerné peut signer son contrat ;
 * - idéalement 24 h avant le début de la mission, au plus tard le dernier jour du mois de la mission ;
 * - en acceptant, le crew signe aussi les conditions de la mission (annexe) ; l'employeur contresigne
 *   au même moment (Imane CHAIGARI, CEO — Heavent Agency SARL ; signature imprimée par le site) ;
 * - on garde une preuve : date, nom saisi, image de la signature, adresse IP, navigateur, empreinte du contenu signé.
 */
const ADMIN_EMAIL = "i.chaigari@heaventagency.com";
const FROM = "Heavent People Agency <noreply@heaventagency.com>";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", ...corsHeaders } });

/** Début de la mission (heure du Maroc = GMT depuis le 20/09/2026) */
export function debutMission(dates: any[], dateDebut: string): Date {
  const premiere = [...(dates ?? [])].sort((a, b) => String(a.date).localeCompare(String(b.date)))[0];
  const jour = premiere?.date ?? dateDebut;
  const heure = (premiere?.heure_debut ?? "00:00").slice(0, 5);
  return new Date(`${jour}T${heure}:00Z`);
}

/** Dernier moment pour signer : fin du mois de la dernière date (23:59 heure du Maroc) */
export function finSignature(dates: any[], dateFin: string): Date {
  const ds = [...(dates ?? [])].sort((a, b) => String(a.date).localeCompare(String(b.date)));
  const jour = ds[ds.length - 1]?.date ?? dateFin;
  const [a, m] = String(jour).split("-").map(Number);
  const suivant = m === 12 ? `${a + 1}-01` : `${a}-${String(m + 1).padStart(2, "0")}`;
  return new Date(new Date(`${suivant}-01T00:00:00Z`).getTime() - 60 * 1000);
}

async function empreinte(texte: string) {
  const h = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(texte));
  return [...new Uint8Array(h)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const caller = await getCaller(req);
    if (!caller?.staffId) return deny(401, "Connecte-toi à ton espace staff pour signer.");
    const { contratId, nom, image, accepte } = await req.json();
    if (!contratId || !accepte) return json({ error: "Coche la case « J'ai lu et j'accepte »." }, 400);
    if (!nom || String(nom).trim().length < 3) return json({ error: "Écris ton nom complet." }, 400);
    if (!/^data:image\/png;base64,/.test(String(image ?? "")) || String(image).length < 1500 || String(image).length > 400_000)
      return json({ error: "Dessine ta signature dans le cadre." }, 400);

    const admin = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { autoRefreshToken: false, persistSession: false } });
    const { data: c } = await admin.from("contrats").select("*, staff(nom, prenom, email)").eq("id", contratId).maybeSingle();
    if (!c || c.staff_id !== caller.staffId) return deny(403, "Ce contrat n'est pas le tien.");
    if (c.statut === "annule") return json({ error: "Ce contrat a été annulé." }, 400);
    if (c.signe_le) return json({ error: "Contrat déjà signé." }, 409);

    const limite = new Date(debutMission(c.dates, c.date_debut).getTime() - 24 * 3600 * 1000);
    const fin = finSignature(c.dates, c.date_fin ?? c.date_debut);
    if (Date.now() > fin.getTime())
      return json({ error: "Le délai de signature est dépassé (fin du mois de la mission). Contacte l'agence." }, 410);

    const { data: agence } = await admin.from("parametres_agence").select("conditions_contrat").eq("id", 1).maybeSingle();
    const contenu = JSON.stringify({ titre: c.titre, evenement: c.evenement, lieu: c.lieu, dates: c.dates, taux: c.taux_horaire, brut: c.salaire_brut });
    const preuve = {
      ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
      navigateur: req.headers.get("user-agent"),
      email: caller.email,
      empreinte_contenu: await empreinte(contenu),
      // texte des conditions accepté (vide = texte par défaut du site)
      empreinte_conditions: await empreinte(agence?.conditions_contrat?.trim() ?? "defaut"),
      limite_signature: limite.toISOString(),
      fin_signature: fin.toISOString(),
      signe_en_retard: Date.now() > limite.getTime(),
    };
    const signeLe = new Date().toISOString();
    const { error } = await admin.from("contrats").update({
      signe_le: signeLe, signature_nom: String(nom).trim().slice(0, 120), signature_image: image,
      conditions_acceptees_le: signeLe,
      employeur_signe_le: signeLe,
      employeur_signataire: "Imane CHAIGARI, CEO — Heavent Agency SARL",
      signature_preuve: { ...(c.signature_preuve ?? {}), ...preuve, signe_le: signeLe },
    }).eq("id", contratId);
    if (error) return json({ error: "Signature non enregistrée : " + error.message }, 500);

    const cle = Deno.env.get("RESEND_API_KEY");
    if (cle) {
      await new Resend(cle).emails.send({
        from: FROM, to: [ADMIN_EMAIL], subject: `Contrat signé — ${c.staff?.prenom} ${c.staff?.nom}`,
        html: `<p><b>${c.staff?.prenom} ${c.staff?.nom}</b> a signé son contrat « ${c.evenement ?? c.titre} » le ${new Date(signeLe).toLocaleString("fr-FR", { timeZone: "UTC" })}${Date.now() > limite.getTime() ? " (en retard : après le délai de 24 h avant la mission)" : ""}, avec les conditions de la mission.</p><p>Le contrat a été contresigné automatiquement par l'employeur (Imane CHAIGARI, CEO).</p>`,
      }).catch(() => {});
    }
    return json({ success: true, signe_le: signeLe });
  } catch (e: any) {
    return json({ error: "Erreur interne : " + e.message }, 500);
  }
};

serve(handler);
