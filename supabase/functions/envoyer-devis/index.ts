import { getCaller, deny, corsHeaders } from "../_shared/auth.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";
import { Resend } from "npm:resend@2.0.0";

/** Envoie le devis au client avec son lien de consultation et de signature en ligne (réservé à l'admin). */
const ADMIN_EMAIL = "i.chaigari@heaventagency.com";
const FROM = "Heavent People Agency <noreply@heaventagency.com>";
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", ...corsHeaders } });
const e = (v: unknown) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
const mad = (n: unknown) => `${new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(n) || 0)} MAD`;
const dateFr = (d?: string | null) => (d ? new Date(d + "T12:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : "");

export function emailDevis(d: any, intro: string) {
  const lien = `https://heaventagency.com/mon-devis/${d.lien_token}`;
  return `<div style="font-family:Arial,sans-serif;max-width:620px;color:#2a2420">
    <p>Bonjour ${e(d.client_nom)},</p>
    <p>${intro}</p>
    <div style="background:#FAF7EE;border:1px solid #ece6d3;border-radius:8px;padding:12px 16px">
      <b>Devis ${e(d.numero)}</b>${d.titre ? ` — ${e(d.titre)}` : ""}<br>
      ${d.date_evenement ? `Date : ${e(dateFr(d.date_evenement))}<br>` : ""}${d.lieu ? `Lieu : ${e(d.lieu)}<br>` : ""}
      Total TTC : <b>${mad(d.total_ttc)}</b>${Number(d.acompte_pct) ? ` · acompte ${e(d.acompte_pct)} %` : ""}<br>
      ${d.date_validite ? `Valable jusqu'au ${e(dateFr(d.date_validite))}` : ""}
    </div>
    <p style="margin:22px 0"><a href="${lien}" style="background:#141414;color:#fff;text-decoration:none;padding:12px 22px;border-radius:999px;display:inline-block">Consulter et signer mon devis</a></p>
    <p style="font-size:13px;color:#555">Vous pouvez le lire en détail, le télécharger en PDF et donner votre accord en ligne en quelques secondes, depuis votre téléphone ou votre ordinateur. Vous préférez en parler d'abord ? Vous pourrez aussi, depuis cette page, demander un rendez-vous sans signer.</p>
    <p style="font-size:12px;color:#777">Ce devis est établi d'après les informations transmises. Son montant peut évoluer en fonction des services et des prestataires retenus lors d'un premier rendez-vous.</p>
    <p>À votre écoute pour toute question,<br>Imane CHAIGARI — CEO, Heavent People Agency<br>+212 6 10 93 96 55 · ${ADMIN_EMAIL}</p></div>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const caller = await getCaller(req);
    if (!caller?.isAdmin) return deny();
    const { devisId } = await req.json();
    const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "", { auth: { persistSession: false } });
    const { data: d } = await db.from("devis").select("*").eq("id", devisId).maybeSingle();
    if (!d) return json({ error: "Devis introuvable" }, 404);
    if (!d.client_email) return json({ error: "Ajoutez l'e-mail du client dans le devis avant de l'envoyer." }, 400);
    const cle = Deno.env.get("RESEND_API_KEY");
    if (!cle) return json({ error: "Envoi d'e-mails non configuré" }, 500);
    const r = await new Resend(cle).emails.send({
      from: FROM, to: [d.client_email], reply_to: ADMIN_EMAIL, subject: `Votre devis ${d.numero} — Heavent People Agency`,
      html: emailDevis(d, "Merci pour votre confiance. Voici notre proposition pour votre événement :"),
    });
    if ((r as any)?.error) return json({ error: "L'e-mail n'a pas pu être envoyé" }, 502);
    await db.from("devis").update({ statut: d.statut === "brouillon" ? "envoye" : d.statut, date_envoi: new Date().toISOString(), relances: 0, derniere_relance_le: null }).eq("id", d.id);
    return json({ success: true, lien: `https://heaventagency.com/mon-devis/${d.lien_token}` });
  } catch (err: any) {
    return json({ error: "Erreur interne : " + err.message }, 500);
  }
});
