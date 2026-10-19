// Liste toutes les phrases françaises affichées via useTexte() (x("…")) et les données traduites dynamiquement.
// node tests/i18n/cles.mjs → JSON des clés ; utilisé par tests/i18n/verifier.mjs
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const RACINE = new URL("../../", import.meta.url).pathname;
const lire = (f) => readFileSync(join(RACINE, f), "utf8");
const cles = new Set();
const ajouter = (t) => { if (t && /[A-Za-zÀ-ÿ]/.test(t)) cles.add(t); };
const chaine = (lit) => JSON.parse(lit.replace(/^'(.*)'$/s, (_, c) => JSON.stringify(c.replace(/\\'/g, "'"))));

function fichiers(d) {
  return readdirSync(join(RACINE, d)).flatMap((f) => { const p = join(d, f); return statSync(join(RACINE, p)).isDirectory() ? fichiers(p) : /\.tsx?$/.test(f) ? [p] : []; });
}
// 1. x("…") écrits dans le code
const utilisateurs = fichiers("src").filter((f) => !f.includes("jeu-evenement") && /useTexte/.test(lire(f)));
for (const f of utilisateurs) {
  const s = lire(f);
  for (const m of s.matchAll(/\bx\(\s*("(?:[^"\\]|\\.)*")/g)) ajouter(chaine(m[1]));
  // Messages d'erreur des formulaires (zod), listes d'options, étapes, titres de blocs
  for (const m of s.matchAll(/z\.[\s\S]{0,200}?\(\s*(?:\d+,\s*)?("(?:[^"\\]|\\.)*")/g)) ajouter(chaine(m[1]));
  for (const m of s.matchAll(/(?:message|invalid_type_error|required_error):\s*("(?:[^"\\]|\\.)*")/g)) ajouter(chaine(m[1]));
  for (const m of s.matchAll(/(?:titre|court|bravo|label|description)[:=]\s*("(?:[^"\\]|\\.)*")/g)) ajouter(chaine(m[1]));
  for (const m of s.matchAll(/missingFields\.push\(\s*'([^']*)'/g)) ajouter(m[1]);
  for (const nom of ["eventTypes", "budgetRanges", "daysOfWeek", "LANGUES"]) {
    const m = s.match(new RegExp(`${nom}\\s*=\\s*\\[([\\s\\S]*?)\\]`));
    if (m) for (const l of m[1].matchAll(/"((?:[^"\\]|\\.)*)"/g)) ajouter(l[1]);
  }
  for (const m of s.matchAll(/\["([A-ZÀ-ÿ][^"]*)", "([^"]*)"\]/g)) { ajouter(m[1]); ajouter(m[2]); } // villes de l'accueil
}
// 2. Pages villes / services
const pl = lire("src/lib/pagesLocales.ts");
for (const m of pl.matchAll(/(?:nomCourt|h1|accroche|ville|titre|texte|q|r):\s*("(?:[^"\\]|\\.)*")/g)) ajouter(chaine(m[1]));
for (const bloc of pl.matchAll(/(?:intro|evenements):\s*\[([\s\S]*?)\]/g)) for (const m of bloc[1].matchAll(/("(?:[^"\\]|\\.)*")/g)) ajouter(chaine(m[1]));
// 3. FAQ par défaut (base) et engagements
const sql = lire("supabase/migrations/20261019190000_vitrine_confiance.sql");
for (const m of sql.matchAll(/\{"q": "((?:[^"\\]|\\.)*)", "r": "((?:[^"\\]|\\.)*)"\}/g)) { ajouter(m[1].replace(/''/g, "'")); ajouter(m[2].replace(/''/g, "'")); }
const conf = lire("src/components/vitrine/Confiance.tsx");
for (const m of conf.matchAll(/(?:titre|texte|titreFaq = )[:=]?\s*("(?:[^"\\]|\\.)*")/g)) ajouter(chaine(m[1]));
ajouter("Questions fréquentes");

const liste = [...cles].sort();
if (process.argv[1].endsWith("cles.mjs")) console.log(JSON.stringify(liste, null, 1));
export default liste;
