import { dimensionner } from "../../src/components/heavent-city/positions";
import { DECORS, EXPERIENCES, MUSIQUES } from "../../src/components/heavent-city/donnees";
const ids = [...DECORS, ...EXPERIENCES].map((o) => o.id), mus = MUSIQUES.map((m) => m.id);
const run = (inv: number, k: number, m: number) => { const s = dimensionner(Math.ceil(inv / 10), "rondes", { options: new Set(ids.slice(0, k)), musiques: mus.slice(0, m), accueils: ["hotesses"], lumiere: "bougies", type: "mariage", tables: "rondes" }); return s.n; };
for (const inv of [30, 120, 300]) console.log(inv, [0, 4, 8, 12, 16, 20, ids.length].map((k) => `${k}obj:${run(inv, k, k > 8 ? 3 : 1)}`).join("  "));
