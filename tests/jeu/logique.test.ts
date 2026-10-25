// Tests de la logique du jeu « Crée ton événement de rêve » : node tests/jeu/lancer.mjs
import assert from "node:assert/strict";
import { MODELES } from "../../src/components/jeu-evenement/config";
import { TRADUCTIONS } from "../../src/components/jeu-evenement/traductions";
import { definirLangue, enFrancais, tr } from "../../src/components/jeu-evenement/langue";
import { clesDuJeu } from "./cles-traduction";
import { creationDepuisModele } from "../../src/components/jeu-evenement/logique";
import { decoderCreation, encoderCreation } from "../../src/components/jeu-evenement/partage";
import {
  calculerBudget, emprise, evaluerMissions, nouvelleCreation, placeLibre, placesPrevues, proposerDisposition, reglagesParDefaut, tailleGrille, trouverPlace,
} from "../../src/components/jeu-evenement/logique";

const r = { ...reglagesParDefaut(), invites: 100, budget: 60000 };
const c = nouvelleCreation(r);
const el = (type: any, x: number, y: number, tourne = false) => ({ uid: `${type}${x}${y}`, type, x, y, tourne });

// Places : 10 par table ronde, 6 par rectangulaire, 6 à la table d'honneur (mariage), 0 pour la scène (pro)
c.elements.push(el("table_ronde", 0, 0), el("table_ronde", 2, 0), el("table_rect", 4, 0), el("honneur", 0, 3));
assert.equal(placesPrevues(c), 32);
assert.equal(placesPrevues({ ...c, reglages: { ...r, type: "pro" } }), 26);

// Prix : tables (chaises comprises, pas de double comptage) + 2 buffets = 1 seul coût par invité
c.elements.push(el("buffet", 0, 5), el("buffet", 0, 6));
let b = calculerBudget(c);
const buffet = b.lignes.find((l) => l.libelle === "Buffet")!;
assert.equal(buffet.quantite, 2);
assert.equal(buffet.fixe, 5000);
assert.equal(buffet.parInvite, 150 * 100, "coût par invité compté une seule fois");
assert.equal(b.total, 450 * 2 + 320 + 2500 + 5000 + 15000);
// Centres de table : par table (rondes + rectangulaires)
c.centres.actif = true;
b = calculerBudget(c);
assert.equal(b.lignes.find((l) => l.libelle === "Centres de table")!.total, 3 * 180);
// Dépassement
const petit = { ...c, reglages: { ...r, budget: 10000 } };
assert.equal(calculerBudget(petit).depassement, calculerBudget(petit).total - 10000);

// Placement : hors grille et chevauchement refusés
assert.equal(placeLibre(c.elements, { type: "table_ronde", x: 1, y: 0 }, 12, 10), false, "chevauchement");
assert.equal(placeLibre(c.elements, { type: "piste", x: 10, y: 8 }, 12, 10), false, "hors grille");
assert.equal(placeLibre(c.elements, { type: "table_ronde", x: 6, y: 0 }, 12, 10), true);
assert.equal(placeLibre(c.elements, { type: "table_ronde", x: 0, y: 0 }, 12, 10, "table_ronde00"), true, "se déplacer sur sa propre place");
const p = trouverPlace(c.elements, "piste", 12, 10)!;
assert.ok(placeLibre(c.elements, { type: "piste", ...p }, 12, 10));

// Missions
let m = evaluerMissions(c);
assert.deepEqual(m.map((x) => x.ok), [false, false, false]);
assert.match(m[0].aide, /Il manque 68 places/);
c.elements.push(el("guirlandes", 11, 9));
m = evaluerMissions(c);
assert.equal(m[1].ok, true, "centres de table + guirlandes = ambiance");
c.elements.push(el("dj", 6, 5));
assert.equal(evaluerMissions(c)[2].ok, true);

// Disposition proposée : assez de places, missions remplies, dans le budget, sans chevauchement
for (const [invites, budget, type] of [[120, 80000, "mariage"], [300, 150000, "mariage"], [40, 20000, "anniversaire"], [200, 90000, "pro"], [60, 8000, "babyshower"]] as const) {
  const d = proposerDisposition({ ...reglagesParDefaut(), invites, budget, type });
  const { cols, rows } = tailleGrille(invites);
  assert.ok(placesPrevues(d) >= invites, `places ${invites}`);
  d.elements.forEach((e) => assert.ok(placeLibre(d.elements, e, cols, rows, e.uid), `placement ${e.type}`));
  const bb = calculerBudget(d);
  console.log(`  ${type} ${invites} invités, budget ${budget} → ${d.elements.length} éléments, ${placesPrevues(d)} places, ${bb.total} MAD, missions ${evaluerMissions(d).filter((x) => x.ok).length}/3`);
  if (budget >= 20000) assert.equal(bb.depassement, 0, `budget ${type} ${invites}`);
}
// Partage : la création encodée dans le lien revient identique (sans coordonnée), lien abîmé → null
{
  const d = proposerDisposition({ ...reglagesParDefaut(), invites: 300, budget: 250000, type: "mariage", ambiance: "orientale", lieu: "jardin" });
  d.elements[0].couleur = "#7C2436"; d.elements[1].tourne = !d.elements[1].tourne && false;
  const code = encoderCreation(d);
  const r = decoderCreation(code)!;
  assert.deepEqual(r.reglages, d.reglages);
  assert.deepEqual(r.elements.map(({ uid, ...x }) => ({ ...x, tourne: !!x.tourne })), d.elements.map(({ uid, ...x }) => ({ ...x, tourne: !!x.tourne, couleur: x.couleur })));
  assert.deepEqual(r.centres.actif, d.centres.actif);
  assert.ok(code.length < 2000, `lien court (${code.length} caractères pour ${d.elements.length} éléments)`);
  assert.equal(decoderCreation("abc"), null); assert.equal(decoderCreation(""), null);
  console.log(`  partage : ${d.elements.length} éléments → lien de ${code.length} caractères, relu à l'identique`);
}
// Bar à parfums Nawar : 80 MAD par invité, 50 parfums minimum ; personnel au prix fixe
{
  const c = nouvelleCreation({ ...reglagesParDefaut(), invites: 30 });
  c.elements.push({ uid: "n", type: "nawar", x: 0, y: 0 }, { uid: "h1", type: "hotesse", x: 3, y: 0 }, { uid: "h2", type: "hotesse", x: 4, y: 0 }, { uid: "m", type: "maitre_hotel", x: 5, y: 0 });
  const b = calculerBudget(c);
  const nawar = b.lignes.find((l) => l.libelle.includes("Nawar"))!;
  assert.equal(nawar.total, 50 * 80, "30 invités → 50 parfums minimum");
  assert.match(nawar.detail, /minimum 50/);
  assert.equal(b.lignes.find((l) => l.libelle.includes("Hôtesse"))!.total, 2 * 900);
  assert.equal(b.total, 4000 + 1800 + 1200);
  c.reglages.invites = 120;
  assert.equal(calculerBudget(c).lignes.find((l) => l.libelle.includes("Nawar"))!.total, 120 * 80, "au-delà du minimum : 1 parfum par invité");
  assert.ok(evaluerMissions(c).find((m) => m.id === "convivial")!.ok, "le bar à parfums est une animation conviviale");
  console.log("  Nawar : 30 invités → 4 000 MAD (minimum 50 parfums), 120 invités → 9 600 MAD ; personnel au prix du catalogue");
}
// Modèles : complets (3 missions), dans leur budget, avec leurs extras
for (const m of MODELES) {
  const c = creationDepuisModele(m.id)!;
  const b = calculerBudget(c);
  assert.equal(b.depassement, 0, `${m.nom} dans son budget`);
  assert.ok(evaluerMissions(c).every((x) => x.ok), `${m.nom} : 3 missions remplies`);
  for (const t of new Set(m.extras)) assert.ok(c.elements.some((e) => e.type === t), `${m.nom} contient ${t}`);
  console.log(`  modèle ${m.nom} : ${c.elements.length} éléments, ${b.total} MAD / ${c.reglages.budget}, 3/3 missions`);
}
// Traductions : chaque phrase du jeu existe en anglais et en arabe, avec les mêmes variables
{
  const vars = (t: string) => [...t.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",");
  const cles = clesDuJeu();
  const manquantes = cles.filter((k) => !TRADUCTIONS[k]);
  assert.deepEqual(manquantes, [], "phrases sans traduction");
  for (const k of cles) assert.equal(vars(TRADUCTIONS[k].en), vars(k), `variables anglaises : ${k}`);
  definirLangue("en"); assert.equal(tr("{n} invités", { n: 120 }), "120 guests");
  const c = proposerDisposition({ ...reglagesParDefaut(), invites: 50 });
  assert.match(evaluerMissions(c)[0].titre, /Plan enough seats/);
  assert.equal(enFrancais(() => tr("Missions")), "Missions"); assert.equal(tr("Missions"), "Missions");
  definirLangue("ar"); assert.equal(tr("Annuler"), "إلغاء");
  assert.ok(calculerBudget(c).lignes.some((l) => /طاولة/.test(l.libelle)), "libellés du budget en arabe");
  definirLangue("fr"); assert.equal(tr("Annuler"), "Annuler");
  console.log(`  traductions : ${cles.length} phrases en anglais et en arabe, variables conservées`);
}
// Idées sur mesure : nommées par le visiteur, sans prix (chiffrées dans le devis), regroupées par nom, gardées dans le lien de partage
{
  const s = nouvelleCreation({ ...reglagesParDefaut(), invites: 80, budget: 50000 });
  s.elements.push(el("table_ronde", 0, 0), { ...el("objet_libre", 4, 0), nom: "Calèche dorée" }, { ...el("objet_libre", 6, 0), nom: "Calèche dorée" },
    { ...el("espace_libre", 0, 4), nom: "ركن الأطفال" }, el("objet_libre", 8, 0));
  const bs = calculerBudget(s);
  assert.equal(bs.total, 450, "les idées sur mesure n'ajoutent rien à l'estimation");
  const caleche = bs.lignes.find((l) => l.libelle === "Calèche dorée")!;
  assert.ok(caleche.surDevis && caleche.quantite === 2 && caleche.total === 0 && caleche.detail === "Prix sur devis");
  assert.ok(bs.lignes.some((l) => l.libelle === "Objet sur mesure" && l.surDevis), "objet sans nom : nom du catalogue");
  assert.equal(bs.lignes[bs.lignes.length - 1].surDevis, true, "les idées sur mesure en fin de liste");
  const relu = decoderCreation(encoderCreation(s))!;
  assert.deepEqual(relu.elements.map((e) => e.nom ?? null), [null, "Calèche dorée", "Calèche dorée", "ركن الأطفال", null], "noms conservés dans le lien (accents et arabe)");
  console.log(`  sur mesure : ${bs.lignes.filter((l) => l.surDevis).length} idées nommées, prix sur devis, gardées dans le lien de partage`);
}
// Agrandissement : la taille, le prix, le lien de partage et le placement suivent
{
  const base = nouvelleCreation({ ...reglagesParDefaut(), invites: 80, budget: 90000 });
  base.elements.push(el("piste", 0, 0), el("buffet", 0, 5), el("allee", 8, 0));
  const avant = calculerBudget(base).total;
  const g = nouvelleCreation(base.reglages);
  g.elements.push({ ...el("piste", 0, 0), plus: 1 }, { ...el("buffet", 0, 5), plus: 2 }, { ...el("allee", 8, 0), plus: 3 });
  // piste 3×3 → 4×4 : +7 cases × 650 ; buffet 3×1 → 5×1 : +2 × 700 ; allée 1×3 → 1×6 : +3 × 500
  assert.equal(calculerBudget(g).total - avant, 7 * 650 + 2 * 700 + 3 * 500, "supplément par case ajoutée");
  assert.deepEqual([emprise(g.elements[0]), emprise(g.elements[1]), emprise(g.elements[2])], [{ w: 4, h: 4 }, { w: 5, h: 1 }, { w: 1, h: 6 }], "emprises agrandies");
  assert.deepEqual(emprise({ ...g.elements[1], tourne: true }), { w: 1, h: 5 }, "rotation d'un élément agrandi");
  assert.equal(emprise({ ...el("table_ronde", 0, 0), plus: 5 }).w, 2, "une table ne s'agrandit pas");
  assert.equal(emprise({ ...el("buffet", 0, 0), plus: 99 }).w, 7, "agrandissement borné au maximum");
  assert.ok(!placeLibre([...g.elements], { ...el("dj", 3, 0) }, 30, 30), "la piste agrandie occupe 4×4");
  const relu = decoderCreation(encoderCreation(g))!;
  assert.deepEqual(relu.elements.map((e) => e.plus ?? 0), [1, 2, 3], "tailles conservées dans le lien de partage");
  assert.equal(calculerBudget(relu).total, calculerBudget(g).total, "même prix après partage");
  console.log(`  agrandissement : +${calculerBudget(g).total - avant} MAD pour 12 cases en plus, tailles gardées dans le lien`);
}
console.log("✅ logique du jeu : tous les tests passent");
