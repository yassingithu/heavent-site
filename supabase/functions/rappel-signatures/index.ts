import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";
import { Resend } from "npm:resend@2.0.0";

/**
 * Rappel de signature des contrats (lancé chaque jour par la base, à 9 h heure du Maroc).
 * Tout contrat actif non signé déclenche un e-mail au crew, puis un nouveau tous les 2 jours,
 * jusqu'à la signature ou jusqu'à la fin du mois de la mission (après, le contrat n'est plus signable).
 */
const FROM = "Heavent People Agency <noreply@heaventagency.com>";
const ESPACE = "https://heaventagency.com/staff-dashboard";
const DEUX_JOURS = 47 * 3600 * 1000; // un peu moins de 48 h pour ne pas sauter un passage quotidien

const trier = (ds: any[]) => [...(ds ?? [])].sort((a, b) => String(a.date).localeCompare(String(b.date)));
function debutMission(c: any) {
  const p = trier(c.dates)[0];
  return new Date(`${p?.date ?? c.date_debut}T${(p?.heure_debut ?? "00:00").slice(0, 5)}:00Z`);
}
function finSignature(c: any) {
  const ds = trier(c.dates);
  const [a, m] = String(ds[ds.length - 1]?.date ?? c.date_fin ?? c.date_debut).split("-").map(Number);
  const suivant = m === 12 ? `${a + 1}-01` : `${a}-${String(m + 1).padStart(2, "0")}`;
  return new Date(new Date(`${suivant}-01T00:00:00Z`).getTime() - 60 * 1000);
}
const fr = (d: Date) => d.toLocaleString("fr-FR", { timeZone: "UTC", weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });
const jourFr = (d: string) => new Date(d + "T12:00:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));

serve(async (req) => {
  const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { autoRefreshToken: false, persistSession: false } });
  // Clé partagée avec la tâche planifiée de la base (table privée, invisible depuis le site)
  const { data: secret } = await db.from("secrets_internes").select("valeur").eq("nom", "rappel_signatures").maybeSingle();
  if (!secret?.valeur || req.headers.get("x-cle-rappel") !== secret.valeur) return new Response("Accès refusé", { status: 403 });
  const essai = new URL(req.url).searchParams.get("essai") === "1"; // essai = ne rien envoyer, juste lister
  const debutMoisPrecedent = new Date(); debutMoisPrecedent.setUTCDate(1); debutMoisPrecedent.setUTCMonth(debutMoisPrecedent.getUTCMonth() - 1);
  const { data: contrats, error } = await db.from("contrats")
    .select("id, titre, evenement, lieu, dates, date_debut, date_fin, total_heures, salaire_brut, statut, rappel_signature_le, rappels_signature, staff(prenom, nom, email, banni)")
    .is("signe_le", null).neq("statut", "annule").gte("date_fin", debutMoisPrecedent.toISOString().slice(0, 10));
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  const resend = new Resend(Deno.env.get("RESEND_API_KEY") ?? "");
  const maintenant = Date.now();
  const envoyes: string[] = [];
  for (const c of contrats ?? []) {
    const s: any = c.staff;
    if (!s?.email || s.banni) continue;
    if (maintenant > finSignature(c).getTime()) continue; // plus signable
    if (c.rappel_signature_le && maintenant - new Date(c.rappel_signature_le).getTime() < DEUX_JOURS) continue;

    const limite = new Date(debutMission(c).getTime() - 24 * 3600 * 1000);
    const enRetard = maintenant > limite.getTime();
    const premier = !c.rappel_signature_le;
    const quoi = c.evenement || c.titre;
    const sujet = premier ? `Ton contrat « ${quoi} » est prêt à signer` : enRetard ? `⏰ Rappel : ton contrat « ${quoi} » n'est toujours pas signé` : `Rappel : signe ton contrat « ${quoi} »`;
    const dates = trier(c.dates as any[]).map((d) => `<li>${jourFr(d.date)}${d.heure_debut && d.heure_fin ? ` · ${d.heure_debut.slice(0, 5)} – ${d.heure_fin.slice(0, 5)}` : ""}</li>`).join("");
    const delai = enRetard
      ? `<p style="color:#9a3412"><b>Le délai conseillé (24 h avant la mission) est passé.</b> Tu peux encore signer jusqu'au <b>${fr(finSignature(c))}</b>.</p>`
      : `<p>Merci de le signer avant le <b>${fr(limite)}</b> (24 h avant la mission).</p>`;
    const html = `<div style="font-family:Arial,sans-serif;max-width:600px;color:#1a1a1a">
      <p>Bonjour ${s.prenom},</p>
      <p>${premier ? "Ton contrat pour la mission suivante est prêt :" : "Petit rappel : ton contrat pour cette mission attend toujours ta signature."}</p>
      <div style="background:#FAF7EE;border:1px solid #ece6d3;border-radius:8px;padding:12px 16px">
        <b>${quoi}</b> — ${c.titre}${c.lieu ? ` · ${c.lieu}` : ""}<ul style="margin:6px 0;padding-left:18px">${dates}</ul>
        ${c.total_heures ?? ""} h · ${c.salaire_brut ?? ""} MAD brut
      </div>
      ${delai}
      <p><a href="${ESPACE}" style="display:inline-block;background:#141414;color:#fff;text-decoration:none;padding:10px 18px;border-radius:6px">Lire et signer mon contrat</a></p>
      <p style="font-size:12px;color:#666">Connecte-toi à ton espace staff, onglet « Contrats ». Tu recevras un rappel tous les 2 jours tant que le contrat n'est pas signé.</p>
      <p>À bientôt,<br>L'équipe Heavent People Agency</p></div>`;

    if (!essai) {
      const { error: e } = await resend.emails.send({ from: FROM, to: [s.email], subject: sujet, html });
      if (e) continue;
      await db.from("contrats").update({ rappel_signature_le: new Date().toISOString(), rappels_signature: (c.rappels_signature ?? 0) + 1 }).eq("id", c.id);
      await pause(600); // limite d'envoi Resend
    }
    envoyes.push(`${s.prenom} ${s.nom} — ${quoi}${enRetard ? " (en retard)" : ""}`);
  }
  return new Response(JSON.stringify({ essai, envoyes }), { headers: { "Content-Type": "application/json" } });
});
