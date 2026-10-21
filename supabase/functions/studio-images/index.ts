import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";

/**
 * Heavent Studio : photos des démos par métier (voitures, boutique, immobilier, événementiel).
 * Choisies une fois sur Pixabay (licence libre), puis copiées dans le stockage du site :
 * assets/studio/demo/<métier>/<n>.jpg. Appel réservé à la clé interne.
 */
const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  { auth: { autoRefreshToken: false, persistSession: false } });

const RECHERCHES: Record<string, string[]> = {
  automobile: ["car showroom", "suv car road", "luxury sedan car", "electric car charging", "sports car red", "car interior dashboard", "white car", "car dealership"],
  ecommerce: ["natural cosmetics flat lay", "scented candle", "argan oil bottle", "gift box ribbon", "handmade soap", "skincare products", "delivery package", "essential oils"],
  immobilier: ["modern villa pool", "apartment living room", "luxury house exterior", "modern kitchen interior", "bedroom interior", "terrace view", "house keys", "penthouse"],
  evenementiel: ["wedding reception hall", "event table decoration", "gala dinner", "wedding flowers table", "conference audience", "party lights night", "champagne glasses", "outdoor wedding"],
};

Deno.serve(async (req) => {
  const { data: s } = await db.from("secrets_internes").select("nom, valeur").in("nom", ["rappel_signatures", "pixabay"]);
  const sec = Object.fromEntries((s ?? []).map((x: any) => [x.nom, x.valeur]));
  if (!req.headers.get("x-cle-rappel") || req.headers.get("x-cle-rappel") !== sec.rappel_signatures) return new Response("Accès refusé", { status: 403 });
  if (!sec.pixabay) return Response.json({ error: "Clé Pixabay manquante" }, { status: 400 });
  const { metier } = await req.json().catch(() => ({}));
  const res: Record<string, string[]> = {};
  for (const [m, termes] of Object.entries(RECHERCHES)) {
    if (metier && metier !== m) continue;
    res[m] = [];
    for (const [i, q] of termes.entries()) {
      try {
        const r = await fetch(`https://pixabay.com/api/?key=${encodeURIComponent(sec.pixabay)}&q=${encodeURIComponent(q)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=10&min_width=1600&order=popular`);
        const d = await r.json();
        const h = (d.hits ?? [])[0];
        if (!h) { res[m].push(`${i}: aucune photo`); continue; }
        const img = await fetch(h.largeImageURL).then((x) => x.arrayBuffer());
        const chemin = `studio/demo/${m}/${i}.jpg`;
        const { error } = await db.storage.from("assets").upload(chemin, img, { contentType: "image/jpeg", upsert: true, cacheControl: "31536000" });
        res[m].push(error ? `${i}: ${error.message}` : `${i}: ok (${h.user})`);
      } catch (e) { res[m].push(`${i}: ${(e as Error).message}`); }
    }
  }
  return Response.json(res);
});
