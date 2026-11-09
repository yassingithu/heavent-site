// Déplace les photos de candidats déjà envoyées de l'espace public « photos » (dossier photos/)
// vers l'espace privé « photos-crew ». À lancer UNE FOIS, après avoir appliqué la migration 20261109170100.
// Usage : SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node outils/photos/deplacer-photos-crew.mjs
// La clé de service n'est jamais écrite dans le dépôt : elle est lue dans l'environnement.
import { createClient } from "@supabase/supabase-js";

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) { console.error("SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY requis"); process.exit(1); }
const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const { data: staff, error } = await sb.from("staff").select("photo, photo_plein_pied");
if (error) throw error;
const fichiers = [...new Set(staff.flatMap((s) => [s.photo, s.photo_plein_pied]).filter(Boolean))];
console.log(`${fichiers.length} fichier(s) à déplacer`);

for (const f of fichiers) {
  const { data: blob, error: e1 } = await sb.storage.from("photos").download(`photos/${f}`);
  if (e1) { console.log("absent ou déjà déplacé :", f); continue; }
  const { error: e2 } = await sb.storage.from("photos-crew").upload(`photos-crew/${f}`, blob, { contentType: blob.type || "image/jpeg", upsert: true });
  if (e2) { console.error("échec copie :", f, e2.message); continue; }
  const { error: e3 } = await sb.storage.from("photos").remove([`photos/${f}`]);
  console.log(e3 ? `copié, ancien fichier non supprimé : ${f}` : `déplacé : ${f}`);
}
