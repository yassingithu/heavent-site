import { getCaller, deny, corsHeaders } from "../_shared/auth.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";
import { Resend } from "npm:resend@2.0.0";

/** Envoie une facture au client (réservé à l'admin) : montant, RIB, et lien vers sa page où il télécharge le PDF. */
const ADMIN_EMAIL = "i.chaigari@heaventagency.com";
const FROM = "Heavent People Agency <noreply@heaventagency.com>";
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", ...corsHeaders } });
const e = (v: unknown) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
const mad = (n: unknown) => `${new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(n) || 0)} MAD`;
const TYPES: Record<string, string> = { acompte: "facture d'acompte", solde: "facture de solde", totale: "facture" };

export function emailFacture(f: any, token: string, rib: string | null) {
  const lien = `https://heaventagency.com/mon-devis/${token}#factures`;
  const payee = f.statut === "payee";
  return `<div style="font-family:Arial,sans-serif;max-width:620px;color:#2a2420">
    <p>Bonjour ${e(f.client_nom)},</p>
    <p>${payee ? "Merci pour votre règlement ! Voici votre" : "Veuillez trouver votre"} ${TYPES[f.type] ?? "facture"} ${f.titre ? `pour « ${e(f.titre)} »` : ""} :</p>
    <div style="background:#FAF7EE;border:1px solid #ece6d3;border-radius:8px;padding:12px 16px">
      <b>Facture ${e(f.numero)}</b> (devis ${e(f.devis_numero)})<br>
      ${f.type === "solde" ? `Total TTC : ${mad(f.total_ttc)} · acompte déduit : ${mad(f.deduction_ttc)}<br>` : ""}
      ${payee ? "Montant réglé" : "Montant à régler"} : <b>${mad(f.net_a_payer)}</b><br>
      ${!payee && rib ? `Par virement — RIB : <b>${e(rib)}</b><br>Référence à indiquer : <b>${e(f.numero)}</b>` : ""}
    </div>
    <p style="margin:22px 0"><a href="${lien}" style="background:#141414;color:#fff;text-decoration:none;padding:12px 22px;border-radius:999px;display:inline-block">Télécharger ma facture (PDF)</a></p>
    <p>Bien à vous,<br>Imane CHAIGARI — CEO, Heavent People Agency<br>+212 6 10 93 96 55 · ${ADMIN_EMAIL}</p></div>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const caller = await getCaller(req);
    if (!caller?.isAdmin) return deny();
    const { factureId } = await req.json();
    const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "", { auth: { persistSession: false } });
    const { data: f } = await db.from("factures").select("*, devis(lien_token, client_email)").eq("id", factureId).maybeSingle();
    if (!f) return json({ error: "Facture introuvable" }, 404);
    if (f.statut === "annulee") return json({ error: "Cette facture est annulée." }, 409);
    const email = f.client_email || f.devis?.client_email;
    if (!email) return json({ error: "Ajoutez l'e-mail du client dans le devis." }, 400);
    const { data: ag } = await db.from("parametres_agence").select("rib").eq("id", 1).maybeSingle();
    const cle = Deno.env.get("RESEND_API_KEY");
    if (!cle) return json({ error: "Envoi d'e-mails non configuré" }, 500);
    const r = await new Resend(cle).emails.send({
      from: FROM, to: [email], reply_to: ADMIN_EMAIL, subject: `Votre ${TYPES[f.type] ?? "facture"} ${f.numero} — Heavent People Agency`,
      html: emailFacture(f, f.devis?.lien_token, ag?.rib ?? null),
    });
    if ((r as any)?.error) return json({ error: "L'e-mail n'a pas pu être envoyé" }, 502);
    await db.from("factures").update({ envoyee_le: new Date().toISOString() }).eq("id", f.id);
    return json({ success: true });
  } catch (err: any) {
    return json({ error: "Erreur interne : " + err.message }, 500);
  }
});
