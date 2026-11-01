// Écran « Aujourd'hui » de l'admin + réponses WhatsApp trilingues, sur fausse base (données fictives).
//   node tests/aujourdhui.mjs http://127.0.0.1:4181 [dossier-captures]
import { mkdirSync } from "node:fs";
import { nouvelleBase, contexte, connecter } from "./beta/simulateur.mjs";
let chromium;
try { ({ chromium } = await import("playwright")); } catch { ({ chromium } = await import("/opt/npm-tools/node_modules/playwright/index.mjs")); }

const BASE = process.argv[2] || "http://127.0.0.1:4181";
const DOSSIER = process.argv[3] || "design-captures/aujourdhui";
mkdirSync(DOSSIER, { recursive: true });
const ADMIN = "admin@heavent.test";
const navigateur = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const verifs = [];
const ok = (cond, msg) => { verifs.push(!!cond); console.log(cond ? "✅" : "❌", msg); };

const jour = (n) => new Date(Date.now() + n * 864e5).toISOString().slice(0, 10);
const ilYa = (n) => new Date(Date.now() - n * 864e5).toISOString();
const dev = (id, num, nom, o = {}) => ({ id, numero: num, type: "entreprise", marque: "heavent", statut: "envoye", client_nom: nom, client_societe: null, client_email: `${id}@demo.test`, client_telephone: "+212600000001",
  titre: `Événement ${nom}`, total_ttc: 24000, devise: "MAD", taux_tva: 20, acompte_pct: 30, relances: 0, derniere_relance_le: null, signe_le: null, archive: false, lien_token: "tok-" + id,
  date_emission: jour(-12), date_validite: jour(30), created_at: ilYa(12), ...o });

function baseRiche() {
  const b = nouvelleBase();
  b.admin_profils = [{ email: ADMIN, prenom: "Yassin", espace: "admin", recoit_mots: false, records_vus: [] }];
  b.devis = [
    dev("d1", "DEV-2026-0101", "Salma Idrissi", { client_societe: "Maroc Pharma", statut: "envoye", date_envoi: ilYa(8), date_evenement: jour(40) }),
    dev("d2", "DEV-2026-0102", "Karim Bennis", { statut: "envoye", date_envoi: ilYa(4), client_telephone: null }),
    dev("d3", "DEV-2026-0103", "Atlas Expo", { statut: "accepte", signe_le: ilYa(12), date_evenement: jour(5), date_fin_evenement: jour(6), titre: "Salon Atlas Expo" }),
    dev("d4", "DEV-2026-0104", "Lina Fassi", { statut: "accepte", signe_le: ilYa(30), date_evenement: jour(-5), date_fin_evenement: jour(-4), titre: "Gala Fassi" }),
    dev("d5", "DEV-2026-0105", "Nour & Hamza", { statut: "accepte", type: "mariage", signe_le: ilYa(3), date_evenement: jour(20), titre: "Mariage Nour & Hamza" }),
    dev("d6", "DEV-2026-0106", "Récent", { statut: "envoye", date_envoi: ilYa(1) }),
  ];
  b.devis_lignes = [{ id: "l1", devis_id: "d3", designation: "Hôtesse d'accueil", quantite: 4, duree: 2, unite: "jour", prix_unitaire: 900, total_ht: 7200 }];
  b.affectations = [{ id: "a1", devis_id: "d3", staff_id: "s1", date_jour: jour(5), statut: "confirme" }];
  b.factures = [{ id: "f1", numero: "FAC-2026-0007", devis_id: "d3", type: "acompte", statut: "a_payer", client_nom: "Atlas Expo", client_societe: null, client_email: "d3@demo.test", client_telephone: "+212600000001",
    net_a_payer: 7200, devise: "MAD", date_emission: jour(-9), envoyee_le: ilYa(9), date_evenement: jour(5), titre: "Salon Atlas Expo" }];
  b.contrats = [{ id: "k1", staff_id: "s1", devis_id: "d3", titre: "Contrat — Salon Atlas Expo", evenement: "Salon Atlas Expo", statut: "envoye", date_debut: jour(1), date_fin: jour(1),
    dates: [{ date: jour(1), heures: 8, heure_debut: "00:30", heure_fin: "08:30" }], signe_le: null }];
  b.devis_entreprise = [{ id: "e1", entreprise: "Atlas Tech", prenom: "Rim", nom: "Alaoui", email: "rim@demo.test", telephone: "+212600000002", date_evenement: jour(30), lieu: "Rabat", nb_personnes: 40, nb_staff: 4, statut: "en_attente", created_at: ilYa(4) }];
  b.devis_mariage = b.devis_mariage.map((d, i) => ({ ...d, statut: i === 0 ? "en_attente" : "envoye", created_at: ilYa(1), date_mariage: jour(60) }));
  return b;
}
async function ouvrir(base, { largeur, hauteur, mobile }) {
  const c = await contexte(navigateur, base, ADMIN, { mobile });
  await c.ctx.route(/wa\.me/, (r) => r.fulfill({ status: 200, contentType: "text/html", body: "WhatsApp (simulé)" }));
  c.page.on("pageerror", (e) => console.log("ERREUR PAGE :", e.message.slice(0, 300)));
  await c.page.setViewportSize({ width: largeur, height: hauteur });
  await connecter(c.page, BASE, ADMIN, "/admin");
  await c.page.waitForSelector('[data-testid="aj-titre"]', { timeout: 15000 });
  await c.page.waitForFunction(() => document.querySelector('[data-testid="aj-titre"]')?.textContent !== "…", null, { timeout: 15000 });
  await c.page.waitForTimeout(1200);
  return c;
}
const nb = (page, genre) => page.locator(`[data-testid="aj-ligne"][data-genre="${genre}"]`).count();

// ——— 1. Ordinateur : contenu, tri, filtres, actions ———
{
  const base = baseRiche();
  const { page, ctx } = await ouvrir(base, { largeur: 1280, hauteur: 900, mobile: false });
  ok(await page.getByTestId("aujourdhui").isVisible(), "l'écran Aujourd'hui s'affiche");
  const premier = await page.getByTestId("tableau-de-bord").locator("> *").first().getAttribute("data-testid");
  ok(premier === null || (await page.evaluate(() => document.querySelector('[data-testid="tableau-de-bord"] [data-testid="aujourdhui"]') !== null)), "il est dans l'accueil, en tête du tableau de bord");
  ok(await nb(page, "relance") === 2, "2 devis à relancer (8 j et 4 j), pas celui d'hier");
  ok(await nb(page, "paiement") === 3, "3 lignes de paiement : acompte envoyé impayé, solde à facturer, acompte à facturer");
  ok(await nb(page, "equipe") === 1, "1 équipe incomplète (1 affectée sur 4)");
  ok(await nb(page, "contrat") === 1, "1 groupe de contrats non signés");
  ok(await nb(page, "demande") === 2, "2 nouvelles demandes (entreprise + événement)");
  const urg = await page.locator('[data-testid="aj-ligne"]').evaluateAll((els) => els.map((e) => e.getAttribute("data-urgent")));
  const premierNon = urg.indexOf("non");
  ok(premierNon === -1 || urg.slice(premierNon).every((u) => u === "non"), "les lignes urgentes passent avant les autres");
  ok(await page.getByTestId("aj-compteur-relance").getAttribute("data-nb") === "2", "compteur Relances = 2");
  await page.screenshot({ path: `${DOSSIER}/1280-plein.png`, fullPage: false });
  await page.getByTestId("aujourdhui").screenshot({ path: `${DOSSIER}/1280-aujourdhui.png` });

  // filtre
  await page.getByTestId("aj-compteur-equipe").click();
  ok((await page.getByTestId("aj-ligne").count()) === 1, "le compteur Équipes filtre la liste");
  await page.getByTestId("aj-compteur-equipe").click();
  ok((await page.getByTestId("aj-ligne").count()) === 9, "un second clic retire le filtre");

  // relance WhatsApp : français → arabe → ouverture
  const ligneR = page.locator('[data-testid="aj-ligne"][data-genre="relance"]').first();
  await ligneR.getByTestId("reponses-whatsapp").click();
  await page.waitForSelector('[data-testid="texte-whatsapp"]');
  const fr = await page.getByTestId("texte-whatsapp").inputValue();
  ok(/Je me permets de revenir/.test(fr) && /Salma/.test(fr), "relance : message français, adressé au client");
  await page.screenshot({ path: `${DOSSIER}/1280-whatsapp-fr.png` });
  await page.locator('[data-langue="en"]').click();
  ok(/following up on the quote/.test(await page.getByTestId("texte-whatsapp").inputValue()), "relance : bascule en anglais");
  await page.locator('[data-langue="ar"]').click();
  const ar = await page.getByTestId("texte-whatsapp").inputValue();
  ok(/أعاود التواصل/.test(ar) && /[؀-ۿ]/.test(ar), "relance : bascule en arabe");
  ok(await page.getByTestId("texte-whatsapp").getAttribute("dir") === "rtl", "le message arabe s'écrit de droite à gauche");
  await page.screenshot({ path: `${DOSSIER}/1280-whatsapp-ar.png` });
  const [popup] = await Promise.all([page.context().waitForEvent("page"), page.getByTestId("ouvrir-whatsapp").click()]);
  await popup.waitForURL(/wa\.me/, { timeout: 8000 }).catch(() => {});
  ok(/wa\.me\/212600000001\?text=/.test(popup.url()), "WhatsApp s'ouvre sur la conversation du client");
  await popup.close().catch(() => {});
  await page.waitForTimeout(800);
  ok(base.devis.find((d) => d.id === "d1").derniere_relance_le, "la relance est notée sur le devis");
  ok(await nb(page, "relance") === 1, "la ligne relancée disparaît de la liste");

  // encaisser
  const ligneP = page.locator('[data-testid="aj-ligne"][data-genre="paiement"]').filter({ hasText: "FAC-2026-0007" });
  await ligneP.getByTestId("aj-encaisser").click();
  await page.getByTestId("confirmer-paiement").click();
  await page.waitForTimeout(900);
  ok(base.factures[0].statut === "payee", "Encaisser enregistre le paiement");
  ok(await page.locator('[data-testid="aj-ligne"]', { hasText: "FAC-2026-0007" }).count() === 0, "la facture payée quitte la liste");

  // composer l'équipe → ouvre le devis
  await page.locator('[data-testid="aj-ligne"][data-genre="equipe"]').getByTestId("aj-composer-equipe").click();
  await page.waitForTimeout(1200);
  ok((await page.getByTestId("titre-section").innerText()) === "Devis", "Composer l'équipe ouvre l'onglet Devis");
  await ctx.close();
}

// ——— 2. iPhone 390 px ———
{
  const { page, ctx } = await ouvrir(baseRiche(), { largeur: 390, hauteur: 844, mobile: true });
  const l = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  ok(l <= 2, "390 px : aucun défilement horizontal");
  const petits = await page.locator('[data-testid="aujourdhui"] button.aj-btn').evaluateAll((bs) => bs.filter((b) => b.getBoundingClientRect().height < 44).length);
  ok(petits === 0, "390 px : tous les boutons d'action font au moins 44 px de haut");
  await page.getByTestId("aujourdhui").scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${DOSSIER}/390-haut.png` });
  await page.getByTestId("aujourdhui").screenshot({ path: `${DOSSIER}/390-aujourdhui.png` });
  await ctx.close();
}

// ——— 3. Rien à faire : message rassurant ———
{
  const b = nouvelleBase(); b.admin_profils = [{ email: ADMIN, prenom: "Yassin", espace: "admin", recoit_mots: false, records_vus: [] }]; b.devis_mariage = [];
  for (const [mobile, l, h, nom] of [[false, 1280, 900, "1280"], [true, 390, 844, "390"]]) {
    const { page, ctx } = await ouvrir(b, { largeur: l, hauteur: h, mobile });
    ok((await page.getByTestId("aj-titre").innerText()).includes("Rien d'urgent aujourd'hui"), `${nom} px : « Rien d'urgent aujourd'hui »`);
    ok(await page.getByTestId("aj-vide").isVisible(), `${nom} px : message rassurant`);
    await page.getByTestId("aujourdhui").screenshot({ path: `${DOSSIER}/${nom}-vide.png` });
    await ctx.close();
  }
}

// ——— 4. Modèles WhatsApp des demandes (3 langues) ———
{
  const base = baseRiche();
  const { page, ctx } = await ouvrir(base, { largeur: 1280, hauteur: 900, mobile: false });
  await page.getByTestId("tableau-de-bord").waitFor();
  await page.getByTestId("aj-compteur-demande").click();
  const w = page.locator('[data-testid="aj-ligne"][data-genre="demande"]').first();
  await w.getByTestId("reponses-whatsapp").click();
  for (const [lg, motif] of [["fr", /Merci beaucoup pour votre demande/], ["en", /Thank you so much for your request/], ["ar", /شكرًا جزيلًا على طلبكم/]]) {
    await page.locator(`[data-langue="${lg}"]`).click();
    ok(motif.test(await page.getByTestId("texte-whatsapp").inputValue()), `accusé de réception en ${lg}`);
  }
  await ctx.close();
}
await navigateur.close();
const echecs = verifs.filter((v) => !v).length;
console.log(echecs ? `\n❌ ${echecs} vérification(s) en échec sur ${verifs.length}` : `\n✅ ${verifs.length} vérifications réussies`);
process.exit(echecs ? 1 : 0);
