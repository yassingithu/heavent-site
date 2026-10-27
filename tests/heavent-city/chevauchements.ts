import { dimensionner } from "../../src/components/heavent-city/positions";
import { DECORS, EXPERIENCES, MUSIQUES } from "../../src/components/heavent-city/donnees";
const opts = [...DECORS, ...EXPERIENCES].map((o) => o.id), mus = MUSIQUES.map((m) => m.id);
let seed = 7; const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
const accs = [null, "discret", "hotesses", "maitre_hotel", "the"], lums = [null, "chaleureuse", "etoilee", "bougies", "festive"];
const ok = (a: string, b: string) => (a === "piste" && (b === "troupe" || b.startsWith("feu"))) || (b === "piste" && (a === "troupe" || a.startsWith("feu")));
const bad = new Map<string, number>(); let total = 0, short = 0, maxN = 0;
for (let it = 0; it < 3000; it++) {
  const all = it % 3 === 0;
  const options = new Set(opts.filter(() => all || rnd() < 0.5)), musiques = mus.filter(() => all || rnd() < 0.5);
  const type = (["rondes", "rectangulaires", "hautes"] as const)[it % 3 === 0 ? (it / 3) % 3 : Math.floor(rnd() * 3)];
  const inv = [30, 80, 120, 200, 300, 400, 500][Math.floor(rnd() * 7)];
  const nb = Math.max(2, Math.ceil(inv / (type === "rondes" ? 10 : 6)));
  const A = { options, musiques, accueil: accs[Math.floor(rnd() * 5)], lumiere: lums[Math.floor(rnd() * 5)], type: rnd() < 0.2 ? "pro" : "mariage", tables: type };
  const s = dimensionner(nb, type, A); total++; maxN = Math.max(maxN, s.n);
  if (s.tables.length < nb) { short++; if (short < 6) console.log("manque", type, inv, nb, s.tables.length, s.n, [...options].length, musiques.length); }
  const ob = s.pos.obstacles;
  for (let i = 0; i < ob.length; i++) for (let j = i + 1; j < ob.length; j++) {
    const a = ob[i], b = ob[j];
    if (ok(a.id, b.id)) continue;
    if (a.x0 < b.x1 - 0.02 && b.x0 < a.x1 - 0.02 && a.y0 < b.y1 - 0.02 && b.y0 < a.y1 - 0.02) { const k = [a.id.replace(/\d+$/, ""), b.id.replace(/\d+$/, "")].sort().join("×"); bad.set(k, (bad.get(k) ?? 0) + 1); }
  }
  for (const a of ob) if (a.x0 < 0 || a.y0 < 0 || a.x1 > s.n + 0.1 || a.y1 > s.n + 0.1) { const k = "hors:" + a.id.replace(/\d+$/, ""); bad.set(k, (bad.get(k) ?? 0) + 1); }
}
console.log({ total, short, maxN, conflits: Object.fromEntries(bad) });
