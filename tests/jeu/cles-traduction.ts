// Liste toutes les phrases françaises du jeu qui doivent exister dans traductions.ts (anglais + arabe).
import { readFileSync, readdirSync } from "node:fs";
import { AMBIANCES, CATALOGUE, CATEGORIES, CENTRES_DE_TABLE, LIBELLES, LIEUX, MENTION_ESTIMATION, MISSIONS, MODELES, NUANCIER, TYPES_EVENEMENT } from "../../src/components/jeu-evenement/config";

export function clesDuJeu(): string[] {
  const cles = new Set<string>();
  const dossier = `${process.cwd()}/src/components/jeu-evenement/`; // lancé depuis la racine du projet
  for (const f of readdirSync(dossier).filter((x) => /\.(ts|tsx)$/.test(x) && x !== "traductions.ts" && x !== "langue.ts")) {
    const s = readFileSync(dossier + f, "utf8");
    for (const m of s.matchAll(/\btr\(\s*"((?:[^"\\]|\\.)*)"/g)) cles.add(JSON.parse(`"${m[1]}"`));
    for (const m of s.matchAll(/\btr\(\s*'((?:[^'\\]|\\.)*)'/g)) cles.add(m[1].replace(/\\'/g, "'"));
    for (const m of s.matchAll(/tr\(\s*[\w.]+ > 1 \? "((?:[^"\\]|\\.)*)" : "((?:[^"\\]|\\.)*)"/g)) { cles.add(m[1]); cles.add(m[2]); }
  }
  for (const t of TYPES_EVENEMENT) { cles.add(t.nom); cles.add(`Parlez-nous de ${t.article}`); cles.add(`Voici ${t.article} de rêve`); }
  for (const l of LIEUX) { cles.add(l.nom); cles.add(l.description); }
  for (const a of AMBIANCES) { cles.add(a.nom); cles.add(a.description); }
  for (const n of NUANCIER) cles.add(n.nom);
  for (const c of CATEGORIES) cles.add(c.nom);
  for (const d of CATALOGUE) { cles.add(d.nom); cles.add(d.description); }
  for (const parType of Object.values(LIBELLES)) for (const l of Object.values(parType ?? {})) { if (l?.nom) cles.add(l.nom); if (l?.description) cles.add(l.description); }
  for (const m of MISSIONS) cles.add(m.titre);
  for (const m of MODELES) { cles.add(m.nom); cles.add(m.description); }
  cles.add(CENTRES_DE_TABLE.nom); cles.add(CENTRES_DE_TABLE.description); cles.add(MENTION_ESTIMATION);
  for (const c of ["Couleur des nappes", "Couleur des fleurs", "Couleur de la décoration"]) cles.add(c);
  return [...cles].filter(Boolean).sort();
}

if (process.argv[2] === "--liste") console.log(JSON.stringify(clesDuJeu(), null, 1));
