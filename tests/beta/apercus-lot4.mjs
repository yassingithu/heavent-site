// Aperçus du lot 4 (navigation) : captures de l'admin sur fausse base, pour chaque support.
//   node tests/beta/apercus-lot4.mjs http://127.0.0.1:4173 [dossier]
import { mkdirSync } from "node:fs";
import { nouvelleBase, contexte, connecter } from "./simulateur.mjs";
let chromium;
try { ({ chromium } = await import("playwright")); } catch { ({ chromium } = await import("/opt/npm-tools/node_modules/playwright/index.mjs")); }

const BASE = process.argv[2] || "http://127.0.0.1:4173";
const DOSSIER = process.argv[3] || "apercus-lot4";
mkdirSync(DOSSIER, { recursive: true });
const ADMIN = "admin@heavent.test";
const navigateur = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});

async function ouvrir({ largeur, hauteur, mobile }) {
  const base = nouvelleBase();
  const c = await contexte(navigateur, base, ADMIN, { mobile });
  await c.page.setViewportSize({ width: largeur, height: hauteur });
  await connecter(c.page, BASE, ADMIN, "/admin");
  await c.page.waitForTimeout(1500);
  return c;
}
const verifs = [];
const ok = (cond, msg) => { verifs.push([!!cond, msg]); console.log(cond ? "✅" : "❌", msg); };

// 1. Ordinateur large : menu déplié
{
  const { page, ctx } = await ouvrir({ largeur: 1440, hauteur: 900, mobile: false });
  await page.evaluate(() => localStorage.setItem("heavent-menu-reduit", "0")); await page.reload(); await page.waitForTimeout(2000);
  ok(await page.getByTestId("menu-lateral").getAttribute("data-reduit") === "non", "ordinateur : menu déplié");
  ok(await page.getByTestId("barre-basse").isHidden(), "ordinateur : pas de barre du bas");
  await page.screenshot({ path: `${DOSSIER}/1-ordinateur-bilan.png` });
  // 2. Menu réduit (icônes + infobulles)
  await page.getByTestId("basculer-menu").click(); await page.waitForTimeout(400);
  ok(await page.getByTestId("menu-lateral").getAttribute("data-reduit") === "oui", "ordinateur : menu réduit après clic");
  ok((await page.getByTestId("menu-lateral").boundingBox()).width < 100, "menu réduit : colonne étroite");
  await page.screenshot({ path: `${DOSSIER}/2-ordinateur-menu-reduit.png` });
  await page.reload(); await page.waitForTimeout(2000);
  ok(await page.getByTestId("menu-lateral").getAttribute("data-reduit") === "oui", "le choix du menu réduit est mémorisé");
  await page.getByRole("tab", { name: /Paie$/ }).click(); await page.waitForTimeout(800);
  ok(await page.getByTestId("titre-section").innerText() === "Paie", "menu réduit : la rubrique Paie s'ouvre et son titre s'affiche");
  await page.screenshot({ path: `${DOSSIER}/3-ordinateur-paie-menu-reduit.png` });
  await ctx.close();
}
// 3. Fenêtre étroite (appli Mac réduite) : réduit par défaut
{
  const { page, ctx } = await ouvrir({ largeur: 1100, hauteur: 760, mobile: false });
  await page.evaluate(() => localStorage.removeItem("heavent-menu-reduit")); await page.reload(); await page.waitForTimeout(2000);
  ok(await page.getByTestId("menu-lateral").getAttribute("data-reduit") === "oui", "fenêtre étroite (1100 px) : menu réduit par défaut");
  const l = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  ok(l <= 2, "fenêtre étroite : rien ne dépasse de l'écran");
  await page.screenshot({ path: `${DOSSIER}/4-fenetre-etroite.png` });
  await ctx.close();
}
// 4. iPhone
{
  const { page, ctx } = await ouvrir({ largeur: 390, hauteur: 844, mobile: true });
  ok(await page.getByTestId("barre-basse").locator("nav").isVisible(), "iPhone : barre du bas visible");
  const noms = await page.getByTestId("barre-basse").getByRole("button").allInnerTexts();
  ok(noms.map((n) => n.trim().split("\n")[0]).join("|") === "Accueil|Événements|Équipe|Plus", "iPhone : Accueil · Événements · Équipe · Plus (" + noms.join("|") + ")");
  const l = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  ok(l <= 2, "iPhone : rien ne dépasse de l'écran");
  await page.screenshot({ path: `${DOSSIER}/5-iphone-bilan.png` });
  // le dernier contenu n'est pas masqué par la barre
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await page.waitForTimeout(400);
  const bas = await page.evaluate(() => { const m = document.querySelector('main [role="tabpanel"][data-state="active"]'); return m ? m.getBoundingClientRect().bottom : 0; });
  const haut = (await page.getByTestId("barre-basse").locator("nav").boundingBox()).y;
  ok(bas <= haut + 1, `iPhone : le bas du contenu (${Math.round(bas)}) n'est pas sous la barre (${Math.round(haut)})`);
  await page.screenshot({ path: `${DOSSIER}/6-iphone-bilan-bas-de-page.png` });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.getByTestId("bas-plus").click(); await page.waitForTimeout(500);
  await page.screenshot({ path: `${DOSSIER}/7-iphone-plus.png` });
  const rubriques = await page.getByRole("dialog").getByRole("button").allInnerTexts();
  for (const attendu of ["Bilan", "Demandes entreprise", "Demandes événement", "Devis", "Devis envoyés", "Envoyer un devis", "Personnel", "Disponibilités", "Contrats", "Paie", "Prestataires", "Salles & palais", "Instagram", "Newsletter", "Site web", "Sécurité", "Statistiques", "Agenda"])
    ok(rubriques.some((r) => r.trim().startsWith(attendu)), `Plus contient « ${attendu} »`);
  await page.getByTestId("plus-fiches").click(); await page.waitForTimeout(900);
  ok(await page.getByTestId("titre-section").innerText() === "Paie", "iPhone : Plus → Paie ouvre la rubrique");
  await page.screenshot({ path: `${DOSSIER}/8-iphone-paie.png` });
  await page.getByTestId("bas-staff").click(); await page.waitForTimeout(700);
  ok(await page.getByTestId("titre-section").innerText() === "Personnel", "iPhone : Équipe ouvre le Personnel");
  await ctx.close();
}
await navigateur.close();
const ko = verifs.filter(([v]) => !v);
console.log(`\n${verifs.length - ko.length}/${verifs.length} contrôles réussis`);
process.exit(ko.length ? 1 : 0);
