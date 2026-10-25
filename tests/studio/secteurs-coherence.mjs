// Vérifie que les 12 métiers du Studio sont cohérents partout : formulaire public, configs, images, base.
//   node tests/studio/secteurs-coherence.mjs
import { readFileSync } from "node:fs";
const lire = (f) => readFileSync(new URL(`../../${f}`, import.meta.url), "utf8");
const metiers = [...lire("src/demo/metiers.ts").matchAll(/(\w+): "/g)].map((m) => m[1]);
const bloc = lire("src/demo/secteurs.ts");
const secteurs = [...bloc.slice(bloc.indexOf("export const SECTEURS")).matchAll(/^  (\w+): \{/gm)].map((m) => m[1]);
const union = [...lire("src/demo/secteurs.ts").match(/export type Secteur = ([^;]+);/)[1].matchAll(/"(\w+)"/g)].map((m) => m[1]);
const images = lire("supabase/functions/studio-images/index.ts");
const recherches = [...images.slice(images.indexOf("const RECHERCHES")).split("};")[0].matchAll(/^\s{2}(\w+): \[/gm)].map((m) => m[1]);
let ko = 0;
const verif = (c, m) => { console.log(c ? "✅" : "❌", m); if (!c) ko++; };
const egal = (a, b) => a.length === b.length && a.every((x) => b.includes(x));
verif(metiers.length === 12, `12 métiers proposés (${metiers.length})`);
verif(egal(metiers, secteurs), "métiers du formulaire = secteurs configurés");
verif(egal(metiers, union), "type Secteur = métiers du formulaire");
verif(egal(metiers, recherches), "images : une recherche par métier");
verif(new Set(metiers).size === metiers.length, "pas de doublon");
process.exit(ko ? 1 : 0);
