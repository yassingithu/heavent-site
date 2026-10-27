import * as D from "../../src/components/heavent-city/donnees";
import * as fs from "fs";
import { TRADUCTIONS as T } from "../../src/components/heavent-city/traductions";
const CH = new Set(["nom","phrase","court","titre","message","effet","article","nomPlaceholder"]);
const cles = new Set<string>();
const marcher = (v: unknown) => { if (Array.isArray(v)) v.forEach(marcher); else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) { if (CH.has(k) && typeof x === "string") cles.add(x); else if (typeof x === "object") marcher(x); } };
for (const [, v] of Object.entries(D)) if (typeof v !== "function") marcher(v);
for (const s of [D.MENTION_LIEUX, D.MESSAGE_BIENVENUE, D.PROMESSE, ...D.VILLES]) cles.add(s);
const dir = "src/components/heavent-city/";
for (const f of fs.readdirSync(dir).filter((x) => /\.tsx?$/.test(x) && x !== "traductions.ts" && x !== "langue.ts")) {
  const src = fs.readFileSync(dir + f, "utf8");
  for (const m of src.matchAll(/\btr\(\s*"((?:[^"\\]|\\.)*)"/g)) cles.add(JSON.parse('"' + m[1] + '"'));
}
const vars = (s: string) => (s.match(/\{\w+\}/g) ?? []).sort().join();
let ko = 0;
for (const k of cles) { const t = T[k]; if (!t || !t.en || !t.ar || vars(t.en) !== vars(k) || vars(t.ar) !== vars(k)) { console.log("MANQUE/VARS:", k); ko++; } }
console.log(ko ? `${ko} problème(s)` : `OK : ${cles.size} textes traduits en anglais et en arabe`);
process.exit(ko ? 1 : 0);
