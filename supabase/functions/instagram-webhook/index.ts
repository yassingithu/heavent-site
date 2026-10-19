import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";

/**
 * Webhook Instagram (Meta) : « Commentez GUIDE ».
 * - GET : vérification de l'adresse par Meta (hub.challenge)
 * - POST : nouveau commentaire contenant « GUIDE » → message privé avec le lien du bon guide + petite réponse publique.
 *          Message privé contenant « GUIDE » → réponse avec les liens des guides.
 */
const API_IG = "https://graph.instagram.com/v21.0";
const API_FB = "https://graph.facebook.com/v21.0";
const SITE = "https://heaventagency.com";
const GUIDES: Record<string, { slug: string; titre: string }> = {
  mariage: { slug: "10-conseils-mariage-reussi", titre: "10 conseils pour un mariage réussi" },
  naissance: { slug: "guide-baby-shower-naissance", titre: "Baby shower et naissance : 10 idées pour une fête tout en douceur" },
  fete: { slug: "guide-fiancailles-henne-fetes", titre: "Fiançailles, henné, anniversaires : 10 clés pour une fête qui vous ressemble" },
  entreprise: { slug: "guide-evenement-entreprise", titre: "Événement d'entreprise : 10 conseils pour un salon ou un séminaire réussi" },
};
const REPONSES = ["C'est envoyé en message privé 📩", "Regardez vos messages, le guide vous attend 🎁", "Envoyé ! Bonne lecture 📩✨", "C'est parti, le lien est dans vos messages 💌"];
const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  { auth: { autoRefreshToken: false, persistSession: false } });

const normaliser = (t: string) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase();
const demandeGuide = (t?: string) => !!t && /\bGUIDES?\b/.test(normaliser(t));

async function secrets() {
  const { data } = await db.from("secrets_internes").select("nom, valeur").in("nom", ["instagram_jeton", "instagram_compte", "instagram_secret_app", "instagram_webhook_jeton", "instagram_mode", "instagram_page_id"]);
  return Object.fromEntries((data ?? []).map((x: any) => [x.nom, x.valeur])) as Record<string, string>;
}

async function signatureValide(corps: string, signature: string | null, secret?: string) {
  if (!secret) return true; // tant que le secret de l'app n'est pas enregistré, on accepte (journalisé)
  if (!signature?.startsWith("sha256=")) return false;
  const cle = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = new Uint8Array(await crypto.subtle.sign("HMAC", cle, new TextEncoder().encode(corps)));
  const attendu = Array.from(mac).map((b) => b.toString(16).padStart(2, "0")).join("");
  return attendu === signature.slice(7);
}

async function appel(url: string, corps: unknown, jeton: string) {
  const r = await fetch(`${url}${url.includes("?") ? "&" : "?"}access_token=${encodeURIComponent(jeton)}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(corps) });
  const d = await r.json().catch(() => ({}));
  if (!r.ok || d.error) throw new Error(d.error?.message ?? `Instagram ${r.status}`);
  return d;
}

const base = (s: Record<string, string>) => (s.instagram_mode === "facebook" ? API_FB : API_IG);
const expediteur = (s: Record<string, string>) => (s.instagram_mode === "facebook" ? s.instagram_page_id : s.instagram_compte);
const lien = (slug: string) => `${SITE}/guides/${slug}?utm_source=instagram&utm_medium=dm`;

async function traiterCommentaire(v: any, s: Record<string, string>) {
  const id = String(v.id ?? "");
  if (!id || !demandeGuide(v.text)) return;
  if (v.from?.id && v.from.id === s.instagram_compte) return; // nos propres réponses
  // Une seule fois par commentaire
  const { error: deja } = await db.from("instagram_commentaires").insert({ commentaire_id: id, media_id: v.media?.id ?? null, auteur_id: v.from?.id ?? null, auteur: v.from?.username ?? null, texte: String(v.text).slice(0, 500) });
  if (deja) return;
  const { data: post } = v.media?.id ? await db.from("posts_instagram").select("id, theme").eq("ig_media_id", v.media.id).maybeSingle() : { data: null };
  const g = post ? GUIDES[post.theme] : null;
  // Pas plus d'un envoi du même guide à la même personne par jour
  if (v.from?.id) {
    const { data: recent } = await db.from("instagram_commentaires").select("commentaire_id").eq("auteur_id", v.from.id).eq("statut", "envoye")
      .eq("guide_slug", g?.slug ?? "liens").gte("cree_le", new Date(Date.now() - 864e5).toISOString()).limit(1);
    if (recent?.length) { await db.from("instagram_commentaires").update({ statut: "ignore", post_id: post?.id ?? null }).eq("commentaire_id", id); return; }
  }
  const prenom = v.from?.username ? ` @${v.from.username}` : "";
  const texte = g
    ? `Bonjour${prenom} 👋 Merci pour votre commentaire !\n\nVoici votre guide gratuit « ${g.titre} » 🎁\n${lien(g.slug)}\n\nBonne lecture, et n'hésitez pas à nous écrire ici si vous avez une question sur votre événement.\nL'équipe Heavent`
    : `Bonjour${prenom} 👋 Merci pour votre commentaire !\n\nVoici nos guides gratuits 🎁 (mariage, baby shower, fêtes et événements d'entreprise) :\n${SITE}/liens\n\nBonne lecture !\nL'équipe Heavent`;
  try {
    await appel(`${base(s)}/${expediteur(s)}/messages`, { recipient: { comment_id: id }, message: { text: texte } }, s.instagram_jeton);
    await db.from("instagram_commentaires").update({ statut: "envoye", post_id: post?.id ?? null, guide_slug: g?.slug ?? "liens" }).eq("commentaire_id", id);
    try { await appel(`${base(s)}/${id}/replies`, { message: REPONSES[Math.floor(Math.random() * REPONSES.length)] }, s.instagram_jeton); } catch { /* la réponse publique est un bonus */ }
  } catch (e) {
    await db.from("instagram_commentaires").update({ statut: "erreur", erreur: String((e as Error).message).slice(0, 300), post_id: post?.id ?? null }).eq("commentaire_id", id);
  }
}

async function traiterMessage(m: any, s: Record<string, string>) {
  if (m.message?.is_echo || !m.sender?.id || m.sender.id === s.instagram_compte || !demandeGuide(m.message?.text)) return;
  const id = `dm:${m.message.mid}`;
  const { error: deja } = await db.from("instagram_commentaires").insert({ commentaire_id: id, auteur_id: m.sender.id, texte: String(m.message.text).slice(0, 500), guide_slug: "liens" });
  if (deja) return;
  const texte = `Avec plaisir ! 🎁 Voici nos guides gratuits :\n\n💍 Mariage : ${lien(GUIDES.mariage.slug)}\n🎈 Baby shower : ${lien(GUIDES.naissance.slug)}\n✨ Fiançailles, henné : ${lien(GUIDES.fete.slug)}\n🤝 Entreprise : ${lien(GUIDES.entreprise.slug)}\n\nL'équipe Heavent`;
  try {
    await appel(`${base(s)}/${expediteur(s)}/messages`, { recipient: { id: m.sender.id }, message: { text: texte } }, s.instagram_jeton);
    await db.from("instagram_commentaires").update({ statut: "envoye" }).eq("commentaire_id", id);
  } catch (e) {
    await db.from("instagram_commentaires").update({ statut: "erreur", erreur: String((e as Error).message).slice(0, 300) }).eq("commentaire_id", id);
  }
}

Deno.serve(async (req) => {
  const s = await secrets();
  const url = new URL(req.url);
  if (req.method === "GET") {
    if (url.searchParams.get("hub.mode") === "subscribe" && s.instagram_webhook_jeton && url.searchParams.get("hub.verify_token") === s.instagram_webhook_jeton)
      return new Response(url.searchParams.get("hub.challenge") ?? "", { status: 200 });
    return new Response("Accès refusé", { status: 403 });
  }
  const brut = await req.text();
  if (!(await signatureValide(brut, req.headers.get("x-hub-signature-256"), s.instagram_secret_app))) return new Response("Signature invalide", { status: 403 });
  if (!s.instagram_jeton || !s.instagram_compte) return new Response("ok");
  const corps = JSON.parse(brut || "{}");
  for (const entree of corps.entry ?? []) {
    for (const c of entree.changes ?? []) if (c.field === "comments") await traiterCommentaire(c.value ?? {}, s);
    for (const m of entree.messaging ?? []) await traiterMessage(m, s);
  }
  return new Response("ok"); // toujours 200 rapidement, sinon Meta réessaie
});
