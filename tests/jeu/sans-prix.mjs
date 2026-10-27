// Le visiteur ne voit AUCUN prix dans le jeu, et rien n'en est transmis ni chargé.
//   node tests/jeu/sans-prix.mjs http://127.0.0.1:4173   (version construite normalement, sans VITE_PRIX_VISIBLES)
import assert from "node:assert/strict";
let chromium;
try { ({ chromium } = await import("playwright")); } catch { ({ chromium } = await import("/opt/npm-tools/node_modules/playwright/index.mjs")); }
const BASE = process.argv[2] ?? "http://127.0.0.1:4173";
const nav = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const PRIX = /\d[\d\s  .,]*\s?(MAD|DH|dirhams?)\b|\bMAD\b\s*\d/i;
const ok = (t) => console.log("  ✓", t);

for (const [nom, options] of [["ordinateur", { viewport: { width: 1440, height: 1000 } }], ["smartphone", { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }]]) {
  const ctx = await nav.newContext({ locale: "fr-FR", ...options });
  await ctx.addInitScript(() => { try { sessionStorage.setItem("heavent-splash-vu", "1"); } catch { /* ignoré */ } });
  await ctx.route(/fonts\.(googleapis|gstatic)|googletagmanager/, (r) => r.abort());
  const appels = [];
  let corps = null;
  await ctx.route(/supabase\.co/, async (r) => {
    const u = r.request().url(); appels.push(u);
    if (/functions\/v1\/send-email/.test(u)) { corps = JSON.parse(r.request().postData()); return r.fulfill({ status: 200, json: { success: true } }); }
    return r.abort();
  });
  const p = await ctx.newPage(); const erreurs = []; p.on("pageerror", (e) => erreurs.push(e.message));
  await p.goto(BASE + "/cree-ton-evenement"); await p.waitForTimeout(1000);

  // Écran d'accueil : modèles sans « Environ … MAD »
  await p.getByRole("button", { name: "Je crée mon événement" }).click(); await p.waitForTimeout(400);
  await p.locator("#invites").fill("100");
  await p.getByRole("button", { name: "Composer ma scène" }).click(); await p.waitForTimeout(600);

  // Catalogue : aucun prix, quelle que soit la catégorie
  const listeOnglets = p.locator("[role=tablist]:visible").first();
  const nbOnglets = await listeOnglets.getByRole("tab").count();
  for (let i = 0; i < nbOnglets; i++) {
    const onglet = listeOnglets.getByRole("tab").nth(i);
    if (!(await onglet.isVisible().catch(() => false))) continue;
    await onglet.click({ timeout: 3000 }).catch(() => {}); await p.waitForTimeout(150);
    const texte = await p.locator("body").innerText();
    assert.doesNotMatch(texte, PRIX, `${nom} : un prix est visible dans le catalogue (onglet ${i}) → ${texte.match(PRIX)?.[0]}`);
    const etiquettes = (await p.locator("[aria-label]").evaluateAll((els) => els.map((e) => e.getAttribute("aria-label")))).join(" | ");
    assert.doesNotMatch(etiquettes, PRIX, `${nom} : un prix dans une étiquette d'accessibilité`);
  }
  ok(`${nom} : catalogue sans aucun prix (texte et étiquettes d'accessibilité)`);

  // Disposition proposée + suivi : « devis en cours d'étude », pas de jauge
  await p.getByRole("button", { name: /propose-moi une disposition/i }).first().click().catch(() => {}); await p.waitForTimeout(700);
  assert.equal(await p.getByTestId("estimation").count(), 0, "plus de jauge d'estimation");
  assert.equal(await p.getByTestId("depassement").count(), 0, "plus de message de dépassement");
  assert.doesNotMatch(await p.locator("body").innerText(), PRIX, `${nom} : un prix visible dans la scène`);
  const indications = await p.locator("[data-testid=devis-en-etude], [data-testid=tiroir-budget]").evaluateAll((els) => els.filter((e) => e.getClientRects().length > 0).length);
  if (!indications) console.log("ERREURS PAGE:", erreurs.slice(0,3));
  if (!indications) await p.screenshot({ path: "/tmp/claude-0/sp-fail.png", fullPage: true });
  assert.ok(indications > 0, `${nom} : indication « devis » / éléments placés introuvable`);
  ok(`${nom} : plus de jauge ni de dépassement, indication « devis en cours d'étude »`);

  // Récapitulatif
  await p.getByRole("button", { name: "Découvrir mon événement" }).click(); await p.waitForTimeout(700);
  const recap = await p.locator("body").innerText();
  assert.match(recap, /Devis en cours d.étude/); assert.ok(await p.getByTestId("recap-sans-prix").isVisible());
  assert.doesNotMatch(recap.replace(/Budget souhaité[^\n]*\n?[^\n]*/i, ""), PRIX, `${nom} : un prix dans le récapitulatif`);
  assert.equal(await p.getByTestId("recap-total").count(), 0);
  ok(`${nom} : récapitulatif « devis en cours d'étude », sans montant`);

  // Demande de devis : rien de chiffré n'est transmis
  await p.getByRole("button", { name: "Demander un devis pour cet événement" }).click(); await p.waitForTimeout(300);
  await p.locator("#devis-prenom").fill("Salma"); await p.locator("#devis-email").fill("salma@example.com");
  await p.getByRole("checkbox", { name: "Je ne sais pas encore" }).check(); await p.locator("#devis-ville").fill("Rabat");
  await p.getByRole("button", { name: "Envoyer ma demande" }).click(); await p.waitForTimeout(600);
  assert.ok(corps, "demande envoyée");
  assert.equal(corps.data.estimation, undefined, "aucune estimation transmise");
  assert.ok(corps.data.lignes.length > 0 && corps.data.lignes.every((l) => l.total === undefined && !/\d\s?×?\s?\d{3}/.test(l.detail)), "lignes sans prix");
  assert.doesNotMatch(corps.data.texte.replace(/Budget souhaité[^\n]*/g, "Budget souhaité"), PRIX, "le texte de la demande ne contient aucun prix");
  assert.ok(corps.data.configuration && Object.keys(corps.data.configuration.elements).length > 0, "la configuration (éléments) reste transmise pour que l'agence chiffre");
  ok(`${nom} : demande envoyée sans estimation ni prix, configuration complète transmise`);

  // Aucun prix chargé depuis le serveur
  assert.ok(!appels.some((u) => /tarifs_jeu|catalogue_prestations/.test(u)), `${nom} : le catalogue de prix ne doit pas être chargé (${appels.join(", ")})`);
  ok(`${nom} : aucun appel au catalogue de prix`);
  assert.deepEqual(erreurs, [], "erreurs JavaScript");
  await ctx.close();
}
await nav.close();
console.log("\n✅ le jeu ne montre, ne charge et ne transmet aucun prix");
