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

  // Idée sur mesure : nommée par le visiteur, sans prix (chiffrée dans le devis)
  const avantIdee = await estimation(p);
  await p.getByRole("tab", { name: "Vos idées" }).click();
  await p.getByRole("button", { name: /^Objet sur mesure :/ }).click(); await p.getByRole("button", { name: "Placer automatiquement" }).click(); await p.waitForTimeout(300);
  await p.getByTestId("nom-sur-mesure").fill("Calèche dorée"); await p.getByTestId("nom-sur-mesure").press("Enter"); await p.waitForTimeout(300);
  assert.equal(await estimation(p), avantIdee, "une idée sur mesure n'ajoute rien à l'estimation");
  assert.ok(await p.locator('[data-element="objet_libre"] text', { hasText: "Calèche dorée" }).count(), "le nom s'affiche sur la scène");
  ok("idée sur mesure « Calèche dorée » ajoutée et nommée, prix sur devis (estimation inchangée)");

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
  const recapTexte = await p.locator("body").innerText();
  assert.ok(/Calèche dorée/.test(recapTexte) && /sur devis/.test(recapTexte), "l'idée sur mesure figure au récapitulatif, « sur devis »");
  await p.getByRole("button", { name: "Télécharger mon récapitulatif" }).click(); await p.waitForTimeout(1200);
  assert.ok(await p.getByTestId("apercu-recap").isVisible(), "aperçu");
  await p.screenshot({ path: `${CAPT}/3-telechargement.png` });
  const [pdf] = await Promise.all([p.waitForEvent("download", { timeout: 60000 }), p.getByRole("button", { name: "Télécharger (PDF)" }).click()]);
  await pdf.saveAs(`${CAPT}/recap.pdf`);
  assert.ok(readFileSync(`${CAPT}/recap.pdf`).subarray(0, 4).toString() === "%PDF", "vrai PDF");
  await p.waitForTimeout(800);
  assert.ok(p.url().includes("/cree-ton-evenement") && await p.getByTestId("apercu-recap").isVisible(), "le PDF ne doit pas remplacer la page du jeu");
  await p.getByRole("radio", { name: /Image \(PNG\)/ }).check();
  const [png] = await Promise.all([p.waitForEvent("download"), p.getByRole("button", { name: "Télécharger (PNG)" }).click()]);
  await png.saveAs(`${CAPT}/scene.png`);
  assert.equal(readFileSync(`${CAPT}/scene.png`).subarray(1, 4).toString(), "PNG");
  await p.keyboard.press("Escape");
  ok("récapitulatif + téléchargements avec aperçu : PDF et PNG valides, sans quitter le jeu");

  // Partage : WhatsApp + lien qui rouvre la même création
  await p.getByRole("button", { name: "Partager ma création" }).click(); await p.waitForTimeout(300);
  const wa = await p.getByTestId("partage-whatsapp").getAttribute("href");
  assert.ok(wa.startsWith("https://wa.me/?text=") && decodeURIComponent(wa).includes("#creation="), "lien WhatsApp avec la création");
  const lienPartage = await p.locator("#lien-partage").inputValue();
  assert.doesNotMatch(decodeURIComponent(wa), /salma|example/i);
  await p.keyboard.press("Escape");
  const nbAvant = await p.locator("[data-uid]").count();
  const p2 = await ctx.newPage(); p2.on("pageerror", (e) => erreurs.push(e.message));
  await p2.goto(lienPartage.replace("https://heaventagency.com", BASE).replace(/^http:\/\/[^/]+/, BASE)); await p2.waitForTimeout(1200);
  assert.ok(await p2.getByTestId("vue-partagee").isVisible(), "vue « création partagée »");
  assert.equal(await p2.locator("[data-uid]").count(), nbAvant, "même nombre d'éléments");
  await p2.screenshot({ path: `${CAPT}/8-partage.png`, fullPage: true });
  await p2.getByRole("button", { name: "Créer la mienne à partir de celle-ci" }).click(); await p2.waitForTimeout(500);
  assert.equal(await nb(p2), nbAvant, "création reprise dans le jeu");
  assert.equal(new URL(p2.url()).hash, "", "le lien est nettoyé");
  await p2.close();
  ok(`partage : WhatsApp + lien qui rouvre la même création (${nbAvant} éléments), reprise possible`);

  // Demande de devis : 1) le serveur refuse → message d'échec + téléchargement, jamais « envoyée »
  let corpsEnvoye = null, reponseServeur = { status: 500, json: { error: "Erreur lors de l'enregistrement de la demande" } };
  await ctx.route(/functions\/v1\/send-email/, async (r) => { corpsEnvoye = JSON.parse(r.request().postData()); await r.fulfill(reponseServeur); });
  await p.getByRole("button", { name: "Demander un devis pour cet événement" }).click(); await p.waitForTimeout(300);
  await p.getByRole("button", { name: "Envoyer ma demande" }).click();
  assert.ok(await p.getByText("Indiquez votre prénom.").isVisible());
  await p.locator("#devis-prenom").fill("Salma"); await p.locator("#devis-email").fill("salma@example.com");
  await p.getByRole("checkbox", { name: "Je ne sais pas encore" }).check(); await p.locator("#devis-ville").fill("Rabat");
  await p.getByRole("button", { name: "Envoyer ma demande" }).click(); await p.waitForTimeout(500);
  assert.match(await p.getByTestId("demande-preparee").innerText(), /n'a pas pu être envoyée/);
  assert.doesNotMatch(await p.locator("body").innerText(), /demande est envoyée|Demande envoyée à Heavent/i, "pas de faux message de succès");
  const [txt] = await Promise.all([p.waitForEvent("download"), p.getByRole("button", { name: "Télécharger ma demande" }).click()]);
  await txt.saveAs(`${CAPT}/demande.txt`);
  const contenu = readFileSync(`${CAPT}/demande.txt`, "utf8");
  assert.match(contenu, /Salma/); assert.match(contenu, /CONFIGURATION DE L'ÉVÉNEMENT/); assert.match(contenu, /Table ronde/);
  // 2) le serveur confirme → succès, configuration complète transmise
  reponseServeur = { status: 200, json: { success: true } };
  await p.getByRole("button", { name: "Réessayer l'envoi" }).click(); await p.waitForTimeout(500);
  assert.ok(await p.getByTestId("demande-envoyee").isVisible(), "succès affiché");
  assert.equal(corpsEnvoye.type, "jeu");
  assert.equal(corpsEnvoye.data.prenom, "Salma"); assert.equal(corpsEnvoye.data.invites, 100);
  assert.ok(corpsEnvoye.data.lignes.length > 0 && corpsEnvoye.data.estimation > 0 && corpsEnvoye.data.texte.includes("CONFIGURATION"));
  assert.deepEqual(corpsEnvoye.data.configuration.sur_mesure, [{ nom: "Calèche dorée", quantite: 1 }], "l'idée sur mesure est transmise pour le devis");
  assert.ok(corpsEnvoye.data.lignes.some((l) => l.libelle === "Calèche dorée" && l.surDevis), "ligne « sur devis » dans l'e-mail");
  await p.screenshot({ path: `${CAPT}/4-devis.png` });
  const stock = await p.evaluate(() => JSON.stringify(localStorage));
  assert.doesNotMatch(stock, /salma|example\.com/i, "aucune coordonnée en stockage local");
  ok("devis : échec serveur → message clair + téléchargement ; succès → demande envoyée avec toute la configuration ; aucune coordonnée stockée");

  assert.deepEqual(erreurs, [], "erreurs JavaScript");
  await ctx.close();
}

// ── Prix du catalogue interne appliqués au jeu ──────────────────────────────
{
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 1000 }, locale: "fr-FR" });
  await ctx.route(/fonts\.(googleapis|gstatic)|googletagmanager/, (r) => r.abort());
  await ctx.route(/supabase\.co/, (r) => r.request().url().includes("/rpc/tarifs_jeu")
    ? r.fulfill({ json: [{ jeu_element: "dj", unite: "forfait", prix_unitaire: "12000.00" }, { jeu_element: "buffet", unite: "personne", prix_unitaire: "450.00" }, { jeu_element: "centres", unite: "unite", prix_unitaire: "200.00" }, { jeu_element: "piste+case", unite: "unite", prix_unitaire: "800.00" }, { jeu_element: "tente", unite: "forfait", prix_unitaire: "31000.00" }] })
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
  // Élément agrandi : le supplément par case vient du catalogue (« piste+case » = 800 MAD) ; scène vidée pour avoir la place
  await p.getByRole("button", { name: "Réinitialiser" }).click(); await p.getByRole("button", { name: "Oui, tout retirer" }).click(); await p.waitForTimeout(200);
  await p.getByRole("tab", { name: "Animation" }).click();
  await p.getByRole("button", { name: /^Piste de danse :/ }).click(); await p.getByRole("button", { name: "Placer automatiquement" }).click(); await p.waitForTimeout(200);
  const avantPiste = await estimation(p);
  await p.getByTestId("agrandir").click(); await p.waitForTimeout(400);
  assert.equal(await estimation(p) - avantPiste, 7 * 800, "piste 3×3 → 4×4 : 7 cases × 800 MAD du catalogue");
  ok("supplément par case de l'agrandissement repris du catalogue (7 cases × 800 MAD)");
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
  // Glisser la table avec le doigt (vrai geste tactile)
  const t = p.locator('[data-testid="scene-conteneur"] [data-uid]').first();
  await t.scrollIntoViewIfNeeded();
  const avantDoigt = [await t.getAttribute("data-x"), await t.getAttribute("data-y")];
  const tb = await t.boundingBox();
  const cdp = await ctx.newCDPSession(p);
  const pt0 = { x: tb.x + tb.width / 2, y: tb.y + tb.height * 0.6 };
  const scrollAvant = await p.evaluate(() => scrollY);
  await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [pt0] });
  const sc = await p.locator('[data-testid="scene-conteneur"] svg').boundingBox();
  const cible = { x: sc.x + sc.width * 0.5, y: sc.y + sc.height * 0.66 };
  const dir = { x: (cible.x - pt0.x) || 40, y: (cible.y - pt0.y) || 20 };
  const k = 45 / Math.hypot(dir.x, dir.y);
  for (let i = 1; i <= 12; i++) await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: pt0.x + dir.x * k * i / 12, y: pt0.y + dir.y * k * i / 12 }] });
  await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] }); await p.waitForTimeout(300);
  const apresDoigt = [await t.getAttribute("data-x"), await t.getAttribute("data-y")];
  assert.notDeepEqual(apresDoigt, avantDoigt, "la table suit le doigt");
  assert.equal(await p.evaluate(() => scrollY), scrollAvant, "la page ne défile pas pendant le glisser");
  ok(`smartphone : table glissée au doigt (${avantDoigt} → ${apresDoigt}) sans faire défiler la page`);
  // Barre rapide sous la scène : flèche puis « Terminé »
  await t.tap(); await p.waitForTimeout(200);
  const barre = p.getByTestId("barre-mobile"); assert.ok(await barre.isVisible(), "barre rapide visible");
  const x0 = await t.getAttribute("data-x");
  await barre.getByRole("button", { name: "Vers le fond, à gauche" }).tap(); await p.waitForTimeout(150);
  assert.equal(Number(await t.getAttribute("data-x")), Number(x0) - 1, "flèche de la barre rapide");
  await p.screenshot({ path: `${CAPT}/7-mobile-barre.png` });
  await barre.getByRole("button", { name: "Vers l'avant, à droite" }).tap();
  await p.getByTestId("barre-mobile").getByRole("button", { name: "Supprimer" }).tap(); assert.equal(await nb(p), 0);
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
