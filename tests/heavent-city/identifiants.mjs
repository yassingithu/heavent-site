// Vérifie que la liste d'identifiants de la fonction serveur est identique à celle du jeu.
// Usage : npx esbuild tests/heavent-city/ids.ts --bundle --format=esm --platform=node --outfile=/tmp/ids.mjs && node tests/heavent-city/identifiants.mjs
import { readFileSync } from "node:fs";
const { IDS } = await import(process.env.IDS_MJS ?? "/tmp/ids.mjs");
const src = readFileSync(new URL("../../supabase/functions/heavent-city-ia/index.ts", import.meta.url), "utf8");
const serveur = JSON.parse(src.match(/const IDS = (\{.*\});/)[1]);
const ok = JSON.stringify(serveur) === JSON.stringify(IDS);
console.log(ok ? "OK : identifiants identiques" : "ERREUR : identifiants différents");
process.exit(ok ? 0 : 1);
