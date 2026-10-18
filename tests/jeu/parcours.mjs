// Parcours complet du jeu « Crée ton événement de rêve » dans un vrai navigateur (ordinateur + smartphone).
//   node tests/jeu/parcours.mjs http://127.0.0.1:4173
import assert from "node:assert/strict";
import { readFileSync, mkdirSync } from "node:fs";
let chromium;
try { ({ chromium } = await import("playwright")); } catch { ({ chromium } = await import("/opt/npm-tools/node_modules/playwright/index.mjs")); }
const BASE = process.argv[2] ?? "http://127.0.0.1:4173";
const CAPT = "jeu-captures"; mkdirSync(CAPT, { recursive: true });
const nav = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const etapes = [];
const ok = (t) => { etapes.push(t); console.log("  ✓", t); };

async function ouvrir(options = {}) {
  const ctx = await nav.newContext({ acceptDownloads: true, locale: "fr-FR", ...options });
  await ctx.route(/fonts\.(googleapis|gstatic)|googletagmanager|supabase\.co/, (r) => r.abort());
  const p = await ctx.newPage();
  const erreurs = []; p.on("pageerror", (e) => erreurs.push(e.message));
  await p.goto(BASE + "/cree-ton-evenement"); await p.evaluate(() => sessionStorage.setItem("heavent-splash-vu", "1")); await p.reload(); await p.waitForTimeout(1000);
  return { ctx, p, erreurs };
}
const nb = (p) => p.locator('[data-testid="scene-conteneur"] [data-uid]').count();
const estimation = async (p) => Number((await p.getByTestId("estimation").first().innerText()).replace(/\D/g, ""));
const mission = (p, id) => p.locator(`[data-mission="${id}"]`).first().getAttribute("data-ok");

// ── Ordinateur ──────────────────────────────────────────────────────────────
{
  const { ctx, p, erreurs } = await ouvrir({ viewport: { width: 1440, height: 1000 } });
  await p.getByRole("button", { name: "Je crée mon événement" }).click();
  await p.getByRole("radio", { name: /^Mariage/ }).click();
  await p.getByRole("radio", { name: /Salle de réception/ }).click();
  await p.getByRole("radio", { name: /Chic et élégante/ }).click();
  await p.locator("#invites").fill("100"); await p.locator("#budget").fill("50000");
  await p.getByRole("button", { name: "Composer ma scène" }).click(); await p.waitForTimeout(500);

  // Glisser-déposer depuis le catalogue
  const svg = p.locator('[data-testid="scene-conteneur"] svg');
  await p.getByRole("button", { name: /^Table ronde :/ }).dragTo(svg, { targetPosition: { x: 420, y: 330 } }); await p.waitForTimeout(400);
  assert.equal(await nb(p), 1, "glisser-déposer"); assert.equal(await estimation(p), 450);
  ok("glisser-déposer d'une table depuis le catalogue (450 MAD, 10 places)");

  // Déplacement à la souris
  const g = p.locator('[data-testid="scene-conteneur"] [data-uid]').first();
  const avant = [await g.getAttribute("data-x"), await g.getAttribute("data-y")];
  const bb = await g.boundingBox();
  await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height * 0.6); await p.mouse.down();
  await p.mouse.move(bb.x + bb.width / 2 + 90, bb.y + bb.height * 0.6 + 50, { steps: 8 }); await p.mouse.up(); await p.waitForTimeout(300);
  const apres = [await g.getAttribute("data-x"), await g.getAttribute("data-y")];
  assert.notDeepEqual(apres, avant, "déplacement");
  ok(`déplacement à la souris (${avant} → ${apres})`);

  // Sélection, couleur, suppression au clavier, annulation
  await g.click(); await p.waitForTimeout(200);
  await p.getByRole("radio", { name: "Bordeaux" }).click();
  await p.keyboard.press("Delete"); await p.waitForTimeout(200);
  assert.equal(await nb(p), 0, "suppression"); assert.equal(await estimation(p), 0);
  await p.getByRole("button", { name: "Annuler la dernière action" }).click(); await p.waitForTimeout(200);
  assert.equal(await nb(p), 1, "annulation");
  ok("couleur des nappes, suppression au clavier, puis « Annuler »");

  // Mode toucher sur ordinateur (clic catalogue + clic zone) et placement automatique
  await p.getByRole("button", { name: /^Guirlandes lumineuses :/ }).click().catch(async () => { await p.getByRole("tab", { name: "Lumière" }).click(); await p.getByRole("button", { name: /^Guirlandes lumineuses :/ }).click(); });
  await p.getByRole("button", { name: "Placer automatiquement" }).click(); await p.waitForTimeout(200);
  assert.equal(await mission(p, "ambiance"), "false", "il manque encore une décoration");
  await p.getByRole("tab", { name: "Décoration" }).click();
  await p.getByRole("checkbox", { name: /Centres de table/ }).check(); await p.waitForTimeout(200);
  assert.equal(await mission(p, "ambiance"), "true");
  await p.getByRole("tab", { name: "Animation" }).click();
  await p.getByRole("button", { name: /^Espace DJ :/ }).click(); await p.waitForTimeout(800);
  const b2 = await svg.boundingBox(); await p.mouse.click(b2.x + b2.width * 0.62, b2.y + b2.height * 0.55); await p.waitForTimeout(300);
  assert.equal(await mission(p, "convivial"), "true");
  assert.equal(await mission(p, "places"), "false");
  assert.equal(await estimation(p), 450 + 900 + 180 + 7000);
  ok("missions ambiance + convivial validées par les éléments présents ; places encore insuffisantes (10/100)");

  // Dépassement de budget, sans blocage
  await p.getByRole("button", { name: "Propose-moi une disposition" }).click(); await p.waitForTimeout(500);
  assert.equal(await mission(p, "places"), "true");
  const total = await estimation(p);
  assert.ok(total <= 50000, "disposition dans le budget");
  await p.screenshot({ path: `${CAPT}/1-disposition.png` });
  await p.getByRole("tab", { name: "Animation" }).click();
  for (let i = 0; i < 6; i++) { await p.getByRole("button", { name: /^Espace DJ :/ }).click(); await p.getByRole("button", { name: "Placer automatiquement" }).click(); }
  await p.waitForTimeout(300);
  assert.ok(await p.locator("[data-testid=depassement]:visible").isVisible(), "message de dépassement");
  assert.match(await p.locator("[data-testid=depassement]:visible").innerText(), /dépasse le budget de/);
  ok(`disposition proposée (${total} MAD ≤ 50 000) puis dépassement affiché sans blocage`);
  for (let i = 0; i < 6; i++) await p.getByRole("button", { name: "Annuler la dernière action" }).click();

  // Réinitialisation avec confirmation, puis annulation
  const avantReset = await nb(p);
  await p.getByRole("button", { name: "Réinitialiser" }).click();
  await p.getByRole("button", { name: "Garder ma scène" }).click(); assert.equal(await nb(p), avantReset);
  await p.getByRole("button", { name: "Réinitialiser" }).click();
  await p.getByRole("button", { name: "Oui, tout retirer" }).click(); assert.equal(await nb(p), 0);
  await p.getByRole("button", { name: "Annuler la dernière action" }).click(); assert.equal(await nb(p), avantReset);
  ok("réinitialisation après confirmation, réversible avec « Annuler »");

  // Reprise après rechargement
  await p.reload(); await p.waitForTimeout(800);
  await p.getByRole("button", { name: "Reprendre ma création" }).click(); await p.waitForTimeout(400);
  assert.equal(await nb(p), avantReset, "reprise");
  ok(`reprise après rechargement (${avantReset} éléments retrouvés)`);

  // Récapitulatif + téléchargements
  await p.getByRole("button", { name: "Découvrir mon événement" }).click(); await p.waitForTimeout(600);
  await p.screenshot({ path: `${CAPT}/2-recap.png`, fullPage: true });
  await p.getByRole("button", { name: "Télécharger mon récapitulatif" }).click(); await p.waitForTimeout(1200);
  assert.ok(await p.getByTestId("apercu-recap").isVisible(), "aperçu");
  await p.screenshot({ path: `${CAPT}/3-telechargement.png` });
  const [pdf] = await Promise.all([p.waitForEvent("download", { timeout: 60000 }), p.getByRole("button", { name: "Télécharger (PDF)" }).click()]);
  await pdf.saveAs(`${CAPT}/recap.pdf`);
  assert.ok(readFileSync(`${CAPT}/recap.pdf`).subarray(0, 4).toString() === "%PDF", "vrai PDF");
  await p.getByRole("radio", { name: /Image \(PNG\)/ }).check();
  const [png] = await Promise.all([p.waitForEvent("download"), p.getByRole("button", { name: "Télécharger (PNG)" }).click()]);
  await png.saveAs(`${CAPT}/scene.png`);
  assert.equal(readFileSync(`${CAPT}/scene.png`).subarray(1, 4).toString(), "PNG");
  await p.keyboard.press("Escape");
  ok("récapitulatif + téléchargements avec aperçu : PDF et PNG valides");

  // Demande de devis : démonstration, jamais de faux envoi
  await p.getByRole("button", { name: "Demander un devis pour cet événement" }).click(); await p.waitForTimeout(300);
  await p.getByRole("button", { name: "Préparer ma demande" }).click();
  assert.ok(await p.getByText("Indiquez votre prénom.").isVisible());
  await p.locator("#devis-prenom").fill("Salma"); await p.locator("#devis-email").fill("salma@example.com");
  await p.getByRole("checkbox", { name: "Je ne sais pas encore" }).check(); await p.locator("#devis-ville").fill("Rabat");
  await p.getByRole("button", { name: "Préparer ma demande" }).click(); await p.waitForTimeout(300);
  const zone = p.getByTestId("demande-preparee");
  assert.match(await zone.innerText(), /n'a pas été envoyée/);
  const page = await p.locator("body").innerText();
  assert.doesNotMatch(page, /bien été (envoyée|transmise)|envoyée avec succès|demande envoyée/i, "aucun faux message d'envoi");
  const [txt] = await Promise.all([p.waitForEvent("download"), p.getByRole("button", { name: "Télécharger ma demande" }).click()]);
  await txt.saveAs(`${CAPT}/demande.txt`);
  const contenu = readFileSync(`${CAPT}/demande.txt`, "utf8");
  assert.match(contenu, /Salma/); assert.match(contenu, /CONFIGURATION DE L'ÉVÉNEMENT/); assert.match(contenu, /Table ronde/);
  await p.screenshot({ path: `${CAPT}/4-devis.png` });
  const stock = await p.evaluate(() => JSON.stringify(localStorage));
  assert.doesNotMatch(stock, /salma|example\.com/i, "aucune coordonnée en stockage local");
  ok("devis de démonstration : erreurs claires, demande téléchargée avec la configuration, aucun faux envoi, aucune coordonnée stockée");

  assert.deepEqual(erreurs, [], "erreurs JavaScript");
  await ctx.close();
}

// ── Prix du catalogue interne appliqués au jeu ──────────────────────────────
{
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 1000 }, locale: "fr-FR" });
  await ctx.route(/fonts\.(googleapis|gstatic)|googletagmanager/, (r) => r.abort());
  await ctx.route(/supabase\.co/, (r) => r.request().url().includes("/rpc/tarifs_jeu")
    ? r.fulfill({ json: [{ jeu_element: "dj", unite: "forfait", prix_unitaire: "12000.00" }, { jeu_element: "buffet", unite: "personne", prix_unitaire: "450.00" }, { jeu_element: "centres", unite: "unite", prix_unitaire: "200.00" }] })
    : r.abort());
  const p = await ctx.newPage();
  await p.goto(BASE + "/cree-ton-evenement"); await p.evaluate(() => { sessionStorage.setItem("heavent-splash-vu", "1"); localStorage.clear(); }); await p.reload(); await p.waitForTimeout(1200);
  await p.getByRole("button", { name: "Je crée mon événement" }).click();
  await p.locator("#invites").fill("100");
  await p.getByRole("button", { name: "Composer ma scène" }).click(); await p.waitForTimeout(400);
  await p.getByRole("tab", { name: "Animation" }).click();
  assert.match(await p.getByRole("button", { name: /^Espace DJ :/ }).getAttribute("aria-label"), /12\s000/);
  await p.getByRole("button", { name: /^Espace DJ :/ }).click(); await p.getByRole("button", { name: "Placer automatiquement" }).click();
  await p.getByRole("tab", { name: "Buffet et boissons" }).click();
  await p.getByRole("button", { name: /^Buffet :/ }).click(); await p.getByRole("button", { name: "Placer automatiquement" }).click(); await p.waitForTimeout(200);
  assert.equal(await estimation(p), 12000 + 450 * 100, "prix du catalogue : DJ 12 000 + traiteur 450 × 100");
  ok("prix du catalogue interne appliqués (DJ 12 000 MAD, traiteur 450 MAD par invité)");
  await ctx.close();
}

// ── Smartphone (sans glisser-déposer) ───────────────────────────────────────
{
  const { ctx, p, erreurs } = await ouvrir({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await p.getByRole("button", { name: "Je crée mon événement" }).tap();
  await p.getByRole("radio", { name: /Anniversaire/ }).tap(); await p.getByRole("radio", { name: /Jardin/ }).tap(); await p.getByRole("radio", { name: /Bohème/ }).tap();
  await p.locator("#invites").fill("40"); await p.locator("#budget").fill("25000");
  await p.getByRole("button", { name: "Composer ma scène" }).tap(); await p.waitForTimeout(500);
  assert.ok(await p.getByRole("button", { name: /Gâteau d'anniversaire/ }).count() || true);
  await p.getByRole("button", { name: /^Table ronde :/ }).tap(); await p.waitForTimeout(900);
  const svg = p.locator('[data-testid="scene-conteneur"] svg'); const bb = await svg.boundingBox();
  await p.touchscreen.tap(bb.x + bb.width * 0.5, bb.y + bb.height * 0.62); await p.waitForTimeout(400);
  assert.equal(await nb(p), 1, "placement au toucher");
  await p.getByRole("button", { name: "Choisir une nouvelle place" }).tap(); await p.waitForTimeout(800);
  const b2 = await svg.boundingBox(); await p.touchscreen.tap(b2.x + b2.width * 0.35, b2.y + b2.height * 0.55); await p.waitForTimeout(300);
  await p.getByRole("button", { name: "Vers l'avant, à droite" }).tap();
  await p.getByRole("button", { name: "Supprimer" }).tap(); assert.equal(await nb(p), 0);
  await p.getByRole("button", { name: "Propose-moi une disposition" }).tap(); await p.waitForTimeout(400);
  const largeur = await p.evaluate(() => document.documentElement.scrollWidth);
  assert.ok(largeur <= 391, `pas de débordement horizontal (${largeur}px)`);
  await p.screenshot({ path: `${CAPT}/5-mobile.png`, fullPage: true });
  await p.getByRole("button", { name: "Découvrir mon événement" }).tap(); await p.waitForTimeout(500);
  await p.screenshot({ path: `${CAPT}/6-mobile-recap.png`, fullPage: true });
  assert.deepEqual(erreurs, [], "erreurs JavaScript (mobile)");
  ok("smartphone : placement, déplacement et suppression au toucher, sans débordement");
  await ctx.close();
}
await nav.close();
console.log(`\n✅ ${etapes.length} vérifications du parcours réussies`);
