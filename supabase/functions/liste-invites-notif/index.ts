import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";
import { Resend } from "npm:resend@2.0.0";

/**
 * Invitation seule : e-mail au client à chaque nouvelle réponse d'invité (regroupées, 5 min au plus).
 * Appelée par la base toutes les 5 minutes avec la clé interne. « ?essai=1 » : ne rien envoyer, renvoyer le contenu.
 */
const FROM = "Heavent People Agency <noreply@heaventagency.com>";
const SITE = "https://heaventagency.com";
const esc = (s: unknown) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));
const MAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

Deno.serve(async (req) => {
  const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: secret } = await db.from("secrets_internes").select("valeur").eq("nom", "rappel_signatures").maybeSingle();
  if (!secret?.valeur || req.headers.get("x-cle-rappel") !== secret.valeur) return new Response("Accès refusé", { status: 403 });
  const essai = new URL(req.url).searchParams.get("essai") === "1";

  const { data: cartes } = await db.from("invitations_apercu").select("id, noms, jeton_liste, notif_email, notif_envoye_le, finale_le").eq("mode", "final").not("notif_email", "is", null);
  const resend = new Resend(Deno.env.get("RESEND_API_KEY") ?? "");
  const resultat: unknown[] = [];
  for (const c of (cartes ?? []) as any[]) {
    if (!MAIL.test(String(c.notif_email ?? "").trim())) continue;
    const depuis = c.notif_envoye_le ?? c.finale_le ?? "1970-01-01T00:00:00Z";
    const { data: toutes } = await db.from("reponses_invitation").select("nom, reponse, nb_confirmes, accompagnants, created_at").eq("apercu_id", c.id).order("created_at");
    const nouvelles = ((toutes ?? []) as any[]).filter((r) => r.created_at > depuis);
    if (!nouvelles.length) continue;
    const oui = ((toutes ?? []) as any[]).filter((r) => r.reponse === "oui");
    const personnes = oui.reduce((s, r) => s + r.nb_confirmes, 0);
    const absents = ((toutes ?? []) as any[]).filter((r) => r.reponse === "non").length;
    const ligne = (r: any) => `<li><b>${esc(r.nom)}</b> : ${r.reponse === "oui" ? `sera présent(e)${r.nb_confirmes > 1 ? ` (${r.nb_confirmes} personnes${r.accompagnants?.length ? ` : ${esc(r.accompagnants.join(", "))}` : ""})` : ""}` : "ne pourra pas venir"}</li>`;
    const n = nouvelles.length;
    resultat.push({ carte: c.noms, nouvelles: n, envoye: !essai });
    if (essai) continue;
    const bouton = c.jeton_liste ? `<p style="margin:22px 0 0"><a href="${SITE}/liste/${c.jeton_liste}" style="background:#141414;color:#fff;text-decoration:none;padding:12px 22px;border-radius:999px;display:inline-block">Voir la liste en direct</a></p>` : "";
    const html = `<div style="font-family:Georgia,serif;background:#FBF8F1;padding:24px"><div style="max-width:560px;margin:0 auto;background:#fff;border-radius:24px;overflow:hidden;border:1px solid #EADFC8">
      <div style="background:#141414;color:#fff;padding:26px 28px"><div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#E4D49A">${esc(c.noms)}</div>
      <h1 style="font-weight:normal;font-size:26px;margin:6px 0 0">${n} nouvelle${n > 1 ? "s" : ""} réponse${n > 1 ? "s" : ""}</h1></div>
      <div style="padding:22px 28px;font-family:Arial,sans-serif;color:#2A2420;font-size:15px"><ul style="margin:0;padding-left:18px;line-height:1.8">${nouvelles.slice(0, 30).map(ligne).join("")}</ul>${n > 30 ? `<p style="color:#6b6154">… et ${n - 30} autres.</p>` : ""}
      <p style="margin:20px 0 0;padding:14px 16px;background:#FBF6E9;border-radius:12px"><b>${personnes}</b> personne${personnes > 1 ? "s" : ""} confirmée${personnes > 1 ? "s" : ""} · <b>${absents}</b> absent${absents > 1 ? "s" : ""}</p>${bouton}
      <p style="margin:22px 0 0;font-size:12px;color:#8a8070">Vous recevez ce message car votre adresse est liée à cette invitation. Pour ne plus le recevoir, écrivez à contact@heaventagency.com.</p></div></div></div>`;
    const { error } = await resend.emails.send({ from: FROM, to: String(c.notif_email).trim(), subject: `${n} nouvelle${n > 1 ? "s" : ""} réponse${n > 1 ? "s" : ""} à votre invitation`, html });
    if (error) { resultat.push({ erreur: String(error.message ?? error) }); continue; }
    await db.from("invitations_apercu").update({ notif_envoye_le: nouvelles[nouvelles.length - 1].created_at }).eq("id", c.id);
  }
  return new Response(JSON.stringify({ essai, resultat }), { headers: { "Content-Type": "application/json" } });
});
