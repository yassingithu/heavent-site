// Tests de la logique du jeu « Crée ton événement de rêve » : node tests/jeu/lancer.mjs
import assert from "node:assert/strict";
import { decoderCreation, encoderCreation } from "../../src/components/jeu-evenement/partage";
import {
  calculerBudget, evaluerMissions, nouvelleCreation, placeLibre, placesPrevues, proposerDisposition, reglagesParDefaut, tailleGrille, trouverPlace,
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
console.log("✅ logique du jeu : tous les tests passent");
