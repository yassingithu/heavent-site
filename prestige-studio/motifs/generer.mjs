// Génère une planche d'essai de motifs : node generer.mjs (après compilation par esbuild, voir README)
import { genererMotif, versSVG, TUILAGES } from "./kaplan.mjs";
import fs from "node:fs";
const style = { fond: "#f3e9d6", trait: "#8a6a2c", ruban: "#e7cf94", epaisseur: 3.2 };
fs.mkdirSync("planche", { recursive: true });
let i = 0;
for (const t of TUILAGES) for (const th of t.theta) {
  const svg = versSVG(genererMotif({ tuilage: t.id, theta: th, cote: 44, largeur: 360, hauteur: 360 }), style);
  fs.writeFileSync(`planche/${t.id}_theta${th}.svg`, svg); i++;
}
console.log(i, "motifs");
