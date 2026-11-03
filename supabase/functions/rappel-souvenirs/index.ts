import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";
import { Resend } from "npm:resend@2.0.0";

/**
 * La veille du mariage (18 h, heure du Maroc) : e-mail aux mariés pour préparer le partage des souvenirs
 * (lien général + carte QR à imprimer dans leur espace). « ?essai=1 » : ne rien envoyer.
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
  const fmt = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Casablanca" });
  const heureMaroc = Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Casablanca", hour: "2-digit", hour12: false }).format(new Date())) % 24;
  if (!essai && heureMaroc !== 18) return new Response(JSON.stringify({ envoyes: 0, raison: "pas l'heure" }));
  const demain = fmt.format(new Date(Date.now() + 86400e3));

  const { data: devis } = await db.from("devis").select("id, client_nom, client_email, lien_token, date_evenement")
    .eq("type", "mariage").eq("statut", "accepte").eq("date_evenement", demain);
  const resend = new Resend(Deno.env.get("RESEND_API_KEY") ?? "");
  const resultat: unknown[] = [];
  for (const d of (devis ?? []) as any[]) {
    const { data: espace } = await db.from("espace_maries").select("noms").eq("devis_id", d.id).maybeSingle();
    const noms = (espace?.noms || d.client_nom || "").trim();
    resultat.push({ couple: noms, email: !!d.client_email });
    if (essai || !d.client_email) continue;
    const html = `<div style="font-family:Georgia,serif;background:#FBF8F1;padding:24px"><div style="max-width:560px;margin:0 auto;background:#fff;overflow:hidden;border:1px solid #EADFC8">
      <div style="background:#141414;color:#fff;padding:26px 28px"><div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#E4D49A">Demain, c'est le grand jour</div>
      <h1 style="font-weight:normal;font-size:26px;margin:6px 0 0">${esc(noms)}</h1></div>
      <div style="padding:22px 28px;font-family:Arial,sans-serif;color:#2A2420;font-size:15px;line-height:1.6">
      <p style="margin:0 0 14px">Pour que vos invités vous laissent de beaux souvenirs, deux minutes aujourd'hui suffisent :</p>
      <ol style="margin:0 0 18px;padding-left:20px"><li><b>Téléchargez la carte à imprimer</b> (avec le QR code) dans votre espace, onglet « Souvenirs », et posez-la sur les tables.</li>
      <li><b>Envoyez le message prêt</b> à vos invités (groupe WhatsApp) : il contient le lien pour déposer leurs photos.</li></ol>
      <p style="margin:0 0 18px">Le partage reste ouvert jusqu'à 2 jours après le mariage. Heavent vous prépare ensuite un livre souvenir.</p>
      <p style="margin:22px 0 0"><a href="${SITE}/mon-mariage/${d.lien_token}" style="background:#141414;color:#fff;text-decoration:none;padding:12px 22px;display:inline-block">Ouvrir mon espace</a></p></div></div></div>`;
    const { error } = await resend.emails.send({ from: FROM, to: d.client_email, subject: "Demain : préparez les souvenirs de votre mariage", html });
    if (error) resultat.push({ erreur: String(error.message ?? error) });
  }
  return new Response(JSON.stringify({ essai, demain, resultat }), { headers: { "Content-Type": "application/json" } });
});
