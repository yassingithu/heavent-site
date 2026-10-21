import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";
import { corsHeaders, deny, getCaller } from "../_shared/auth.ts";

/**
 * Prestataires partenaires de Heavent.
 * - « inscription » (site, sans connexion) : envoie au prestataire le lien de confirmation de son e-mail
 *   (seulement dans les 15 minutes qui suivent l'inscription, et une seule fois).
 * - « decision » (admin) : prévient le prestataire qu'il est validé, refusé ou suspendu.
 */
const SITE = "https://heaventagency.com";
const FROM = "Heavent People Agency <noreply@heaventagency.com>";
const REPONDRE = "i.chaigari@heaventagency.com";
const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  { auth: { autoRefreshToken: false, persistSession: false } });
const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", ...corsHeaders } });
const esc = (s: unknown) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));

async function envoyer(to: string, sujet: string, html: string) {
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST", headers: { Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY") ?? ""}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to: [to], reply_to: REPONDRE, subject: sujet, html }),
  });
  if (!r.ok) { const d = await r.json().catch(() => ({})); throw new Error(d.message ?? `Resend ${r.status}`); }
}

function gabarit(titre: string, corps: string, bouton?: { texte: string; lien: string }) {
  return `<!doctype html><html><body style="margin:0;background:#FBF8F1"><div style="font-family:Arial,sans-serif;background:#FBF8F1;padding:24px 12px">
    <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:24px;overflow:hidden;border:1px solid #EADFC8">
      <div style="background:#141414;padding:22px 28px;text-align:center"><div style="font-size:11px;letter-spacing:4px;color:#E4D49A">HEAVENT PEOPLE AGENCY</div></div>
      <div style="padding:30px 32px;color:#2A2420;font-size:15px">
        <h1 style="font-family:Georgia,serif;font-weight:normal;font-size:26px;margin:0 0 18px;color:#141414">${esc(titre)}</h1>
        ${corps}
        ${bouton ? `<p style="margin:26px 0 8px"><a href="${esc(bouton.lien)}" style="display:inline-block;background:#C8B560;color:#141414;text-decoration:none;padding:14px 26px;border-radius:999px;font-weight:bold">${esc(bouton.texte)}</a></p>` : ""}
        <p style="margin:26px 0 0;color:#6B6155">Imane CHAIGARI — CEO, Heavent People Agency<br>+212 6 10 93 96 55 · ${REPONDRE}</p>
      </div>
    </div></div></body></html>`;
}
const p = (t: string) => `<p style="margin:0 0 14px;line-height:1.65">${t}</p>`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  const { action, id, statut, message } = await req.json().catch(() => ({}));

  if (action === "inscription") {
    const { data: r } = await db.from("prestataires").select("*").eq("id", id).maybeSingle();
    if (!r || r.statut !== "email_a_confirmer" || r.mail_envoye_le || Date.now() - Date.parse(r.cree_le) > 15 * 60 * 1000) return json({ ok: false });
    await db.from("prestataires").update({ mail_envoye_le: new Date().toISOString() }).eq("id", id);
    try {
      await envoyer(r.email, "Confirmez votre inscription — Heavent People Agency", gabarit(`Bienvenue ${r.contact}`,
        p(`Merci d'avoir inscrit <b>${esc(r.societe)}</b> comme prestataire partenaire de Heavent People Agency.`) +
        p("Pour finaliser votre inscription, confirmez votre adresse e-mail en cliquant sur le bouton ci-dessous. Notre équipe étudiera ensuite votre dossier (prestations, tarifs, photos) et reviendra vers vous rapidement."),
        { texte: "Confirmer mon inscription", lien: `${SITE}/prestataires/confirmer/${r.jeton}` }));
      return json({ ok: true });
    } catch (e) { console.error(e); return json({ ok: false, error: (e as Error).message }, 502); }
  }

  if (action === "decision") {
    const appelant = await getCaller(req);
    if (!appelant?.isAdmin) return deny();
    const { data: r } = await db.from("prestataires").select("*").eq("id", id).maybeSingle();
    if (!r) return json({ error: "Prestataire introuvable" }, 404);
    const extra = message ? p(esc(message).replace(/\n/g, "<br>")) : "";
    const textes: Record<string, [string, string, string]> = {
      valide: ["Votre profil est validé 🎉", `Bonne nouvelle : <b>${esc(r.societe)}</b> fait désormais partie des prestataires partenaires de Heavent People Agency. Vos prestations sont intégrées à nos devis : nous vous contacterons dès qu'un événement correspond à votre savoir-faire.`, "Prestataire partenaire validé — Heavent People Agency"],
      refuse: ["Votre candidature", `Merci pour l'intérêt que vous portez à Heavent People Agency. Après étude, nous ne pouvons pas donner suite à la candidature de <b>${esc(r.societe)}</b> pour le moment. Nous gardons vos coordonnées et n'hésiterons pas à revenir vers vous.`, "Votre candidature — Heavent People Agency"],
      suspendu: ["Votre profil est en pause", `Le profil de <b>${esc(r.societe)}</b> est momentanément suspendu de nos devis. Contactez-nous si vous souhaitez le réactiver ou mettre à jour vos prestations.`, "Votre profil prestataire — Heavent People Agency"],
    };
    const t = textes[statut];
    if (!t) return json({ error: "Décision inconnue" }, 400);
    try { await envoyer(r.email, t[2], gabarit(t[0], p(t[1]) + extra)); return json({ ok: true }); }
    catch (e) { return json({ error: (e as Error).message }, 502); }
  }
  return json({ error: "Action inconnue" }, 400);
});
