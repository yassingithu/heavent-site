// Vérifie que chaque phrase française affichée via useTexte() a sa traduction anglaise et arabe (mêmes variables {…}).
// node tests/i18n/verifier.mjs
import { readFileSync } from "node:fs";
import cles from "./cles.mjs";

const src = readFileSync(new URL("../../src/i18n/textesTraduits.ts", import.meta.url), "utf8")
  .replace(/^export const TEXTES[^=]*=/m, "return ");
const TEXTES = new Function(src)();
const vars = (t) => [...t.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",");
const manquantes = cles.filter((k) => !TEXTES[k] || !TEXTES[k].en || !TEXTES[k].ar);
const variables = cles.filter((k) => TEXTES[k] && (vars(TEXTES[k].en) !== vars(k) || vars(TEXTES[k].ar) !== vars(k)));
if (manquantes.length || variables.length) {
  console.log("❌ traductions du site :", manquantes.length, "manquante(s),", variables.length, "variable(s) différente(s)");
  for (const k of [...manquantes, ...variables].slice(0, 40)) console.log("  -", k);
  process.exit(1);
}
console.log(`✅ traductions du site : ${cles.length} phrases en anglais et en arabe, variables conservées`);
