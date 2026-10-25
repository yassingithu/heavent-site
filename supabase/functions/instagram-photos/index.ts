import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";
import { corsHeaders, deny, getCaller } from "../_shared/auth.ts";

/**
 * Photos des posts Instagram (bibliothèque gratuite Pixabay), réservé à l'administration.
 * - « chercher » : liste de photos pour des mots-clés
 * - « choisir » : copie la photo choisie dans notre stockage (Pixabay interdit le lien direct permanent)
 * - « utilisees » : identifiants Pixabay déjà utilisés (tous comptes, y compris posts supprimés dont le fichier est resté en stockage)
 * Règle : jamais deux fois la même photo. « choisir » refuse une photo déjà prise par un AUTRE post.
 */
const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  { auth: { autoRefreshToken: false, persistSession: false } });
const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", ...corsHeaders } });

/** Identifiants Pixabay déjà utilisés, et ceux de chaque post (nom de fichier : <post>-<idPixabay>.jpg). */
async function photosUtilisees() {
  const ids = new Map<string, Set<string>>(); // idPixabay -> posts qui l'utilisent
  const ajouter = (id: string, post: string) => { if (!ids.has(id)) ids.set(id, new Set()); ids.get(id)!.add(post); };
  const { data: posts } = await db.from("posts_instagram").select("id, photo_url").not("photo_url", "is", null);
  for (const p of posts ?? []) { const m = String(p.photo_url).match(/-(\d+)\.jpg/); if (m) ajouter(m[1], p.id); }
  for (let decalage = 0; decalage < 20000; decalage += 1000) {
    const { data: fichiers } = await db.storage.from("assets").list("instagram/photos", { limit: 1000, offset: decalage });
    for (const f of fichiers ?? []) { const m = f.name.match(/^(.+)-(\d+)\.jpg$/); if (m) ajouter(m[2], m[1]); }
    if (!fichiers || fichiers.length < 1000) break;
  }
  return ids;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  const appelant = await getCaller(req);
  if (!appelant) return deny();
  if (!appelant.isAdmin) {
    // Nawar a son propre espace : elle peut aussi choisir les photos des posts
    const { data: profil } = await db.from("admin_profils").select("espace").eq("email", appelant.email).maybeSingle();
    if (profil?.espace !== "nawar") return deny();
  }
  const { action, recherche, page, post_id, photo } = await req.json().catch(() => ({}));
  const { data: secret } = await db.from("secrets_internes").select("valeur").eq("nom", "pixabay").maybeSingle();
  if (!secret?.valeur) return json({ error: "Clé Pixabay manquante" }, 400);

  if (action === "utilisees") return json({ ids: [...(await photosUtilisees()).keys()] });

  if (action === "chercher") {
    const q = String(recherche ?? "").trim().slice(0, 100);
    if (!q) return json({ photos: [] });
    const url = `https://pixabay.com/api/?key=${encodeURIComponent(secret.valeur)}&q=${encodeURIComponent(q)}&image_type=photo&safesearch=true&per_page=30&page=${Math.max(1, Number(page) || 1)}&order=popular`;
    const r = await fetch(url);
    if (!r.ok) return json({ error: r.status === 400 || r.status === 401 ? "Clé Pixabay refusée" : `Pixabay indisponible (${r.status})` }, 502);
    const d = await r.json();
    return json({ total: d.totalHits ?? 0, photos: (d.hits ?? []).map((h: any) => ({
      id: h.id, apercu: h.webformatURL, grande: h.largeImageURL, page: h.pageURL, auteur: h.user, largeur: h.imageWidth, hauteur: h.imageHeight, tags: h.tags,
    })) });
  }

  if (action === "choisir") {
    if (!post_id || !photo?.grande || !/^https:\/\/pixabay\.com\//.test(String(photo.grande))) return json({ error: "Photo invalide" }, 400);
    const prises = (await photosUtilisees()).get(String(photo.id));
    if (prises && [...prises].some((autre) => autre !== String(post_id))) return json({ error: "Cette photo a déjà été utilisée pour un autre post. Choisis-en une autre." }, 409);
    const r = await fetch(photo.grande);
    if (!r.ok) return json({ error: "Téléchargement impossible" }, 502);
    const chemin = `instagram/photos/${post_id}-${photo.id}.jpg`;
    const { error } = await db.storage.from("assets").upload(chemin, await r.arrayBuffer(), { contentType: "image/jpeg", upsert: true });
    if (error) return json({ error: error.message }, 500);
    const { data: pub } = db.storage.from("assets").getPublicUrl(chemin);
    await db.from("posts_instagram").update({ photo_url: pub.publicUrl, photo_page: photo.page ?? null, photo_auteur: photo.auteur ?? null, statut: "brouillon", visuel_url: null }).eq("id", post_id);
    return json({ photo_url: pub.publicUrl });
  }
  return json({ error: "Action inconnue" }, 400);
});
