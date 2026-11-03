import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";
import { Resend } from "npm:resend@2.0.0";

/**
 * Résumé quotidien des réponses d'invités (18 h, heure du Maroc) : un mail par couple
 * ayant reçu au moins une réponse depuis 24 h. « ?essai=1 » : ne rien envoyer, renvoyer le contenu.
 */
const FROM = "Heavent People Agency <noreply@heaventagency.com>";
const SITE = "https://heaventagency.com";
const esc = (s: unknown) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));

Deno.serve(async (req) => {
  const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: secret } = await db.from("secrets_internes").select("valeur").eq("nom", "rappel_signatures").maybeSingle();
  if (!secret?.valeur || req.headers.get("x-cle-rappel") !== secret.valeur) return new Response("Accès refusé", { status: 403 });
  const essai = new URL(req.url).searchParams.get("essai") === "1";
  const heureMaroc = Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Casablanca", hour: "2-digit", hour12: false }).format(new Date())) % 24;
  if (!essai && heureMaroc !== 18) return new Response(JSON.stringify({ envoyes: 0, raison: "pas l'heure" }));

  const depuis = new Date(Date.now() - 24 * 3600e3).toISOString();
  const { data: recents } = await db.from("invites_mariage").select("devis_id, nom, reponse, nb_confirmes, remarque, repondu_le").gte("repondu_le", depuis).order("repondu_le");
  const ids = [...new Set((recents ?? []).map((r: any) => r.devis_id))];
  if (!ids.length) return new Response(JSON.stringify({ envoyes: 0, raison: "aucune réponse" }));

  const [{ data: devis }, { data: tous }] = await Promise.all([
    db.from("devis").select("id, client_nom, client_email, lien_token, date_evenement").in("id", ids),
    db.from("invites_mariage").select("devis_id, reponse, nb_prevus, nb_confirmes").in("devis_id", ids),
  ]);
  const resend = new Resend(Deno.env.get("RESEND_API_KEY") ?? "");
  const resultat: unknown[] = [];
  for (const d of (devis ?? []) as any[]) {
    const nouvelles = (recents as any[]).filter((r) => r.devis_id === d.id);
    const t = (tous as any[]).filter((r) => r.devis_id === d.id);
    const oui = t.filter((r) => r.reponse === "oui").reduce((s, r) => s + (r.nb_confirmes ?? r.nb_prevus), 0);
    const non = t.filter((r) => r.reponse === "non").length;
    const attente = t.filter((r) => r.reponse === "attente").length;
    const lignes = nouvelles.map((r) => `<li><b>${esc(r.nom)}</b> : ${r.reponse === "oui" ? `sera présent(e)${(r.nb_confirmes ?? 1) > 1 ? ` (${r.nb_confirmes} personnes)` : ""}` : "ne pourra pas venir"}${r.remarque ? `<br><i style="color:#6b6154">« ${esc(r.remarque)} »</i>` : ""}</li>`).join("");
    resultat.push({ couple: d.client_nom, nouvelles: nouvelles.length, email: !!d.client_email });
    if (essai || !d.client_email) continue;
    const html = `<div style="font-family:Georgia,serif;background:#FBF8F1;padding:24px"><div style="max-width:560px;margin:0 auto;background:#fff;border-radius:24px;overflow:hidden;border:1px solid #EADFC8">
      <div style="background:#141414;color:#fff;padding:26px 28px"><div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#E4D49A">Vos invitations</div>
      <h1 style="font-weight:normal;font-size:26px;margin:6px 0 0">${nouvelles.length} nouvelle${nouvelles.length > 1 ? "s" : ""} réponse${nouvelles.length > 1 ? "s" : ""}</h1></div>
      <div style="padding:22px 28px;font-family:Arial,sans-serif;color:#2A2420;font-size:15px"><ul style="margin:0;padding-left:18px;line-height:1.8">${lignes}</ul>
      <p style="margin:20px 0 0;padding:14px 16px;background:#FBF6E9;border-radius:12px"><b>${oui}</b> personnes confirmées · <b>${non}</b> absent${non > 1 ? "s" : ""} · <b>${attente}</b> en attente</p>
      <p style="margin:22px 0 0"><a href="${SITE}/mon-mariage/${d.lien_token}" style="background:#141414;color:#fff;text-decoration:none;padding:12px 22px;border-radius:999px;display:inline-block">Voir mes invités</a></p></div></div></div>`;
    const { error } = await resend.emails.send({ from: FROM, to: d.client_email, subject: `${nouvelles.length} nouvelle${nouvelles.length > 1 ? "s" : ""} réponse${nouvelles.length > 1 ? "s" : ""} à votre invitation`, html });
    if (error) resultat.push({ erreur: String(error.message ?? error) });
  }
  return new Response(JSON.stringify({ essai, resultat }), { headers: { "Content-Type": "application/json" } });
});
