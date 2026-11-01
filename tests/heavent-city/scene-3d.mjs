// Test de la scène 3D (?3d=1) : chargement, chaises (grands côtés, dossier vers l'extérieur), déplacement, refus, annulation,
// pincement, repli SVG sans WebGL, et SVG intact sans le paramètre.
// Usage : node tests/heavent-city/scene-3d.mjs [url-de-base]   (par défaut http://127.0.0.1:5180)
const { chromium } = await import("/opt/npm-tools/node_modules/playwright/index.mjs");
const BASE = process.argv[2] || "http://127.0.0.1:5180";
const GL = ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"];
let echecs = 0; const ok = (c, m) => { console.log((c ? "OK   " : "ECHEC"), m); if (!c) echecs++; };
async function ouvrir(browser, url, tactile = false, reduit = false) {
  const ctx = await browser.newContext({ locale: "fr-FR", viewport: tactile ? { width: 390, height: 800 } : { width: 1280, height: 800 }, hasTouch: tactile, isMobile: tactile, reducedMotion: reduit ? "reduce" : "no-preference" });
  await ctx.addInitScript(() => { try { sessionStorage.setItem("heavent-splash-vu", "1"); } catch {} });
  await ctx.route(/fonts\.(googleapis|gstatic)|googletagmanager|supabase\.co/, (r) => r.abort());
  const p = await ctx.newPage(); const err = []; p.on("pageerror", (e) => err.push(e.message)); const t = (i) => p.getByTestId(i);
  const tap = (l) => (tactile ? l.tap() : l.click());
  await p.goto(BASE + "/apercu/heavent-city" + url); await p.waitForTimeout(800);
  await tap(t("commencer")); await tap(t("type-mariage")); await tap(t("q-passer")); await tap(t("ville-Casablanca")); await tap(t("q-passer")); await tap(t("q-passer"));
  await tap(t("liste-lieu-salle")); await p.waitForTimeout(2500);
  await tap(t("onglet-salle")); await tap(t("salle-invites-120")); await tap(t("tables-rectangulaires"));
  await tap(t("onglet-experiences")); await tap(t("option-piste")); await p.waitForTimeout(800);
  if (url) { await p.evaluate(() => window.__hc3d?.vueEnsemble()); await p.waitForTimeout(1200); }
  return { ctx, p, t, err, tap };
}
const b = await chromium.launch({ args: GL });

// 1. Sans le paramètre : le SVG, pas de canvas
{ const { ctx, p } = await ouvrir(b, "?3d=0"); ok((await p.locator("canvas").count()) === 0 && (await p.locator("svg[role=img]").count()) > 0, "?3d=0 : scène SVG, aucun canvas"); await ctx.close(); }

// 2. 3D : chargement, chaises, déplacement, refus, annulation
{
  const { ctx, p, t, err } = await ouvrir(b, "?3d=1");
  ok((await p.locator('[data-testid=scene-3d][data-pret="1"]').count()) === 1, "?3d=1 : scène 3D prête, SVG retiré");
  const ch = await p.evaluate(() => window.__hc3d.chaises("t0")), dim = await p.evaluate(() => window.__hc3d.dims("t0"));
  ok(ch.length === 6, `table rectangulaire : 6 chaises (${ch.length})`);
  ok(ch.every((c) => Math.abs(Math.abs(c.z) - 0.64) < 0.01), "chaises sur les deux grands côtés (pas sur les bouts)");
  ok(ch.every((c) => Math.abs(c.x) < 0.85), "aucune chaise au-delà des bouts de la table");
  ok(ch.every((c) => Math.sign(c.dos[1]) === Math.sign(c.z) && Math.abs(c.dos[1]) > 0.99), "dossiers tournés vers l'extérieur (face à la table)");
  ok(ch.filter((c) => c.z > 0).length === 3 && ch.filter((c) => c.z < 0).length === 3, "3 chaises de chaque côté");
  const h = await p.evaluate(() => window.__hc3d.chaises("honneur"));
  ok(h.length === 2 && h.every((c) => c.z < 0 && c.dos[1] < -0.99), "table d'honneur : 2 sièges côté mur, dossier vers le mur (comme le SVG)");
  void dim;
  await t("deplacer").click(); await p.waitForTimeout(300);
  const [sx, sy] = await p.evaluate(() => window.__hc3d.ecranObjet("t3")), w0 = await p.evaluate(() => window.__hc3d.position("t3"));
  const [t1x, t1y] = await p.evaluate(() => window.__hc3d.ecranObjet("t4"));
  // refus : t3 lâchée sur t4
  await p.mouse.move(sx, sy); await p.mouse.down(); await p.mouse.move((sx + t1x) / 2, (sy + t1y) / 2, { steps: 5 }); await p.mouse.move(t1x, t1y, { steps: 5 }); await p.mouse.up(); await p.waitForTimeout(500);
  ok((await t("message-deplacer").innerText()).includes("Place occupée"), "refus visible quand la place est occupée");
  const milieu = await p.evaluate(() => window.__hc3d.position("t3")); await p.waitForTimeout(1200);
  const finRefus = await p.evaluate(() => window.__hc3d.position("t3"));
  ok(Math.hypot(finRefus[0] - w0[0], finRefus[1] - w0[1]) < 0.01, "refus : retour animé vers la position de départ (" + Math.round(Math.hypot(milieu[0] - w0[0], milieu[1] - w0[1]) * 10) / 10 + " case à la fin de l'anneau → 0)");
  ok((await t("remettre").count()) === 0, "après un refus : rien n'est enregistré");
  // déplacement vers une case libre (coin avant de la salle)
  const N = await p.evaluate(() => Math.round(window.__hc3d.stats().cible[0] * 2));
  const [fx, fy] = await p.evaluate((n) => window.__hc3d.ecran(n - 1.6, n - 1.6), N);
  await p.mouse.move(sx, sy); await p.mouse.down(); await p.mouse.move((sx + fx) / 2, (sy + fy) / 2, { steps: 6 }); await p.mouse.move(fx, fy, { steps: 6 }); await p.mouse.up(); await p.waitForTimeout(600);
  ok((await t("remettre").count()) === 1, "déplacement accepté sur une place libre");
  const apres = await p.evaluate(() => window.__hc3d.position("t3"));
  ok(Math.hypot(apres[0] - w0[0], apres[1] - w0[1]) > 1, "la table a bougé à l'écran");
  await t("annuler").click(); await p.waitForTimeout(1200);
  const retour = await p.evaluate(() => window.__hc3d.position("t3"));
  ok(Math.hypot(retour[0] - w0[0], retour[1] - w0[1]) < 0.01, `annuler : la table revient à sa place (écart ${Math.hypot(retour[0] - w0[0], retour[1] - w0[1]).toFixed(2)} case)`);
  // aucun objet ne doit rester en simple pavé « générique » quand tout est activé
  await t("termine-deplacer").click();
  await t("onglet-musique").click(); for (const m of ["orchestre", "troupe", "dj", "acoustique", "playlist"]) await t("musique-" + m).click();
  for (const on of ["onglet-decor", "onglet-experiences"]) { await t(on).click(); for (const o of await p.locator('[data-testid^="option-"]').all()) if ((await o.getAttribute("aria-checked")) !== "true") await o.click(); }
  await p.waitForTimeout(800);
  const gen = await p.evaluate(() => window.__hc3d.generiques()); ok(gen.length === 0, "tous les objets ont une forme dédiée (génériques : " + gen.join(",") + ")");
  ok(err.length === 0, "aucune erreur JavaScript " + err.slice(0, 2).join(" | "));
  await ctx.close();
}

// 3. Tactile : pincement et déplacement de la vue
{
  const { ctx, p } = await ouvrir(b, "?3d=1", true);
  const cdp = await ctx.newCDPSession(p), touch = (type, pts) => cdp.send("Input.dispatchTouchEvent", { type, touchPoints: pts.map(([x, y], id) => ({ x, y, id })) });
  const z0 = await p.evaluate(() => window.__hc3d.stats().zoom);
  await touch("touchStart", [[150, 150], [240, 150]]); for (let i = 1; i <= 5; i++) await touch("touchMove", [[150 - i * 10, 150], [240 + i * 10, 150]]); await touch("touchEnd", []); await p.waitForTimeout(300);
  const z1 = await p.evaluate(() => window.__hc3d.stats().zoom); ok(z1 > z0 * 1.3, `pincement : zoom ${z0} -> ${z1}`);
  const c0 = await p.evaluate(() => window.__hc3d.stats().cible);
  await touch("touchStart", [[200, 150]]); for (let i = 1; i <= 6; i++) await touch("touchMove", [[200 - i * 15, 150]]); await touch("touchEnd", []); await p.waitForTimeout(300);
  const c1 = await p.evaluate(() => window.__hc3d.stats().cible); ok(Math.hypot(c1[0] - c0[0], c1[1] - c0[1]) > 0.5, "un doigt sur le décor déplace la vue");
  await p.getByTestId("vue-ensemble").tap(); await p.waitForTimeout(1000);
  const z2 = await p.evaluate(() => window.__hc3d.stats().zoom); ok(z2 < z1 * 0.8, `« Vue d'ensemble » recadre (zoom ${z2})`);
  await ctx.close();
}

// 3 bis. prefers-reduced-motion : « Vue d'ensemble » recadre aussitôt
{
  const { ctx, p } = await ouvrir(b, "?3d=1", false, true);
  await p.evaluate(() => window.__hc3d.vers("t3", 2.6)); await p.waitForTimeout(200);
  await p.getByTestId("vue-ensemble").click(); await p.waitForTimeout(150);
  const z = await p.evaluate(() => window.__hc3d.stats().zoom); ok(z < 1.4, "« Vue d'ensemble » ramène la vue (zoom " + z + ")");
  await ctx.close();
}

// 3 ter. Étape finale : la 3D reste (canvas, pas de SVG de scène), nuit pleine, invités qui arrivent
{
  const { ctx, p, t } = await ouvrir(b, "?3d=1");
  await t("ouvrir-portes").click(); await p.waitForTimeout(1500);
  ok((await p.locator("[data-testid=final] canvas").count()) === 1, "étape finale : un canvas 3D");
  ok((await p.locator("[data-testid=final] svg[role=img]").count()) === 0, "étape finale : aucun SVG de scène");
  await p.waitForTimeout(5500);
  const st = await p.evaluate(() => window.__hc3d.stats()); ok(st.invites > 0, "étape finale : invités présents (" + st.invites + ")");
  ok((await p.locator("[data-testid=final-titre]").count()) === 1, "titre final affiché");
  await ctx.close();
}

// 4. Sans WebGL : repli automatique sur le SVG
{
  const nb = await chromium.launch({ args: ["--disable-gpu", "--disable-3d-apis", "--disable-webgl", "--disable-webgl2"] });
  const { ctx, p } = await ouvrir(nb, "?3d=1");
  ok((await p.locator("svg[role=img]").count()) > 0 && (await p.locator('[data-testid=scene-3d]').count()) === 0, "sans WebGL : repli sur le SVG");
  await ctx.close(); await nb.close();
}
await b.close();
console.log(echecs ? `${echecs} échec(s)` : "Tout est OK");
process.exit(echecs ? 1 : 0);
