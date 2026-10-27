const { chromium } = await import("/opt/npm-tools/node_modules/playwright/index.mjs");
const [,, mode = "desk", base = "http://127.0.0.1:5180"] = process.argv;
const b = await chromium.launch();
const opts = mode === "mob" ? { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } : { viewport: { width: 1360, height: 820 } };
const ctx = await b.newContext({ locale: "fr-FR", ...opts });
await ctx.addInitScript(() => { try { sessionStorage.setItem("heavent-splash-vu", "1"); } catch {} });
await ctx.route(/fonts\.(googleapis|gstatic)|googletagmanager/, (r) => r.abort());
const appels = []; let corps = null;
await ctx.route(/supabase\.co/, async (r) => { const u = r.request().url(); appels.push(u); if (/functions\/v1\/send-email/.test(u)) { const pd = JSON.parse(r.request().postData()); (globalThis.types ||= []).push(pd.type); if (pd.type === "jeu") corps = pd; return r.fulfill({ status: 200, json: { success: true } }); } return r.abort(); });
const p = await ctx.newPage(); const err = [];
p.on("pageerror", (e) => err.push("PAGEERR " + e.message)); p.on("console", (m) => m.type() === "error" && !/Failed to load resource/.test(m.text()) && err.push(m.text()));
const o = `/tmp/claude-0/hc/s-${mode}`;
const t = (id) => p.getByTestId(id);
await p.goto(base + "/apercu/heavent-city"); await p.waitForTimeout(1200);
await t("commencer").click(); await t("type-mariage").click(); await t("q-passer").click(); await t("ville-Casablanca").click(); await t("q-passer").click(); await t("q-passer").click();
await t("liste-lieu-villa").click(); await p.waitForTimeout(2600);
// mission 1 via panneau
await t("onglet-missions").click(); await t("reponse-accueil-equipe").click(); await p.waitForTimeout(400);
await t("reponse-accueil-the").click();
// assistant
await t("ouvrir-telephone").click(); await t("tel-assistant").click();
await t("assistant-texte").fill("Un mariage marocain chic, beige et doré, festif mais pas bling-bling");
await t("assistant-envoyer").click(); await t("proposition").waitFor();
const prop = await t("proposition").innerText();
await p.screenshot({ path: `${o}-assistant.png` });
await t("prop-musique").click(); await t("appliquer-ambiance").click(); await p.waitForTimeout(500);
await t("tel-fermer").click();
await p.screenshot({ path: `${o}-apres-ia.png` });
// annuler / refaire
const avant = await t("progression").innerText(); await t("annuler").click(); const apresAnn = await t("progression").innerText(); await t("refaire").click();
// recharger = reprise
await p.reload(); await p.waitForTimeout(1000);
const reprise = await t("reprendre").count(); await t("reprendre").click(); await p.waitForTimeout(800);
const phaseApres = await t("heavent-city").getAttribute("data-phase");
// final
await t("ouvrir-portes").click(); await p.waitForTimeout(1500); await p.screenshot({ path: `${o}-final1.png` });
await p.waitForTimeout(8500); await t("bilan").waitFor(); await p.waitForTimeout(2500);
await p.screenshot({ path: `${o}-final2.png` });
const carte = await t("carte-apercu").count();
// demande
await t("confier").click(); await t("demande-envoyer").click();
const errs = await p.locator("[role=alert]").allInnerTexts();
await t("d-nom").fill("Salma"); await t("d-email").fill("salma@example.com"); await t("d-consent").check();
await p.screenshot({ path: `${o}-demande.png` });
await t("demande-envoyer").dblclick(); await t("demande-ok").waitFor();
const nbEnvois = appels.filter((u) => /send-email/.test(u)).length;
const texte = await p.locator("body").innerText();
const PRIX = /\d[\d\s .,]*\s?(MAD|DH|dirhams?)\b|\bMAD\b\s*\d/i;
console.log(JSON.stringify({ prop: prop.slice(0, 160).replace(/\n/g, " | "), avant, apresAnn, reprise, phaseApres, carte, errsValidation: errs.length, nbEnvois, prixVisible: PRIX.test(texte) ? texte.match(PRIX)[0] : null,
  types: globalThis.types, payloadSansPrix: corps && !("estimation" in corps.data) && !JSON.stringify(corps).match(PRIX), config: corps?.data.configuration, appelsAutres: appels.filter((u) => !/send-email/.test(u)).map((u) => u.replace(/\?.*/, "").slice(-60)), err: err.slice(0, 5) }, null, 1));
await b.close();
