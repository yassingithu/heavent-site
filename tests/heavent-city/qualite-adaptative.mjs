// Qualité adaptative de la scène 3D : processeur ralenti -> la qualité baisse par paliers (jamais l'inverse), sans repli SVG.
// Usage : node tests/heavent-city/qualite-adaptative.mjs [url-de-base]
const { chromium } = await import("/opt/npm-tools/node_modules/playwright/index.mjs");
const BASE = process.argv[2] || "http://127.0.0.1:5180";
const GL = ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"];
let echecs = 0; const ok = (c, m) => { console.log((c ? "OK   " : "ECHEC"), m); if (!c) echecs++; };
const b = await chromium.launch({ args: GL });
for (const ralenti of [0, 20]) {
  const ctx = await b.newContext({ locale: "fr-FR", viewport: { width: 390, height: 800 }, hasTouch: true, isMobile: true });
  await ctx.addInitScript(() => { try { sessionStorage.setItem("heavent-splash-vu", "1"); } catch {} });
  await ctx.route(/fonts\.(googleapis|gstatic)|googletagmanager|supabase\.co/, (r) => r.abort());
  const p = await ctx.newPage(); const err = []; p.on("pageerror", (e) => err.push(e.message)); const t = (i) => p.getByTestId(i);
  await p.goto(BASE + "/apercu/heavent-city?3d=1"); await p.waitForTimeout(800);
  for (const i of ["commencer", "type-mariage", "q-passer", "ville-Casablanca", "q-passer", "q-passer", "liste-lieu-salle"]) await t(i).tap();
  await p.waitForTimeout(2500);
  const cdp = await ctx.newCDPSession(p); if (ralenti) await cdp.send("Emulation.setCPUThrottlingRate", { rate: ralenti });
  let max = 0;
  for (let i = 0; i < 40; i++) { await p.evaluate((k) => { const m = window.__hc3d; if (m) if (k % 2) m.vers("t0", 2.4); else m.vueEnsemble(); }, i).catch(() => {}); await p.waitForTimeout(750);
    const q = await p.evaluate(() => window.__hc3d?.stats().qualite ?? -1); max = Math.max(max, q); }
  const repli = (await p.locator("canvas").count()) === 0;
  console.log(`  ralenti x${ralenti || 1} : niveau max ${max}, repli SVG ${repli}`);
  ok(!repli, "jamais de repli SVG automatique");
  ok(max <= 2, "palier maximal 2");
  if (ralenti) ok(max >= 1, "processeur ralenti : la qualité baisse (logiciel de rendu = déjà lent, palier attendu même à x1)");
  ok(!err.length, "aucune erreur JavaScript " + err.join(" ; "));
  await ctx.close();
}
await b.close(); console.log(echecs ? echecs + " échec(s)" : "Tout est OK"); process.exit(echecs ? 1 : 0);
