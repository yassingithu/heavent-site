// Tables hautes ajoutées en plus des tables assises : toutes posées, sans toucher ni objet ni table, allée libre.
// Usage : npx esbuild tests/heavent-city/tables-hautes-en-plus.ts --bundle --format=esm --platform=node --outfile=/tmp/th.mjs && node /tmp/th.mjs
import { dimensionner, GABARITS } from "../../src/components/heavent-city/positions";
import { DECORS, EXPERIENCES, MUSIQUES } from "../../src/components/heavent-city/donnees";
const opts = [...DECORS, ...EXPERIENCES].map((o) => o.id), mus = MUSIQUES.map((m) => m.id);
let seed = 11; const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
let ko = 0, manque = 0;
for (let it = 0; it < 1500; it++) {
  const type = rnd() < 0.5 ? "rondes" : "rectangulaires";
  const inv = [15, 25, 60, 120, 250, 400][Math.floor(rnd() * 6)];
  const nb = Math.max(1, Math.ceil(inv / (type === "rondes" ? 10 : 6)));
  const nbH = [1, 4, 8, 15, 30][Math.floor(rnd() * 5)];
  const A = { options: new Set(opts.filter(() => rnd() < 0.35)), musiques: mus.filter(() => rnd() < 0.4), accueils: ["hotesses"], lumiere: null, type: "mariage", tables: type as "rondes" };
  const s = dimensionner(nb, type, A, nbH);
  if (s.hautes.length < nbH) { manque++; if (manque < 4) console.log("manque", inv, nbH, s.hautes.length, s.n); }
  const g = GABARITS[type], h = GABARITS.hautes;
  for (const [x, y] of s.hautes) {
    if (s.tables.some(([tx, ty]) => Math.abs(x - tx) < g.dx + h.dx && Math.abs(y - ty) < g.dy + h.dy)) { ko++; continue; }
    if (s.pos.obstacles.some((p) => !/^(pl|cd)\d/.test(p.id) && x - h.dx < p.x1 && p.x0 < x + h.dx && y - h.dy < p.y1 && p.y0 < y + h.dy)) { ko++; continue; }
    if (x - h.dx < 0 || y - h.dy < 0 || x + h.dx > s.n || y + h.dy > s.n) ko++;
  }
}
console.log(ko || manque ? `ERREUR : ${ko} chevauchement(s), ${manque} salle(s) sans assez de tables hautes` : "OK : tables hautes toutes posées, sans chevauchement");
process.exit(ko || manque ? 1 : 0);
