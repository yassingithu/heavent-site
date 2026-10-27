import { chromium } from "/opt/npm-tools/node_modules/playwright/index.mjs";
const b = await chromium.launch();
for (const [lng, mob] of [["en", false], ["ar", false], ["ar", true]]) {
  const ctx = await b.newContext({ viewport: mob ? { width: 390, height: 800 } : { width: 1366, height: 800 } });
  const p = await ctx.newPage();
  const erreurs = []; p.on("pageerror", (e) => erreurs.push(e.message));
  await p.addInitScript((l) => { localStorage.setItem("i18nextLng", l); }, lng);
  await p.goto("http://127.0.0.1:5180/apercu/heavent-city");
  await p.waitForSelector('[data-testid="commencer"]');
  await p.screenshot({ path: `l-${lng}${mob ? "m" : ""}-1.png` });
  await p.click('[data-testid="commencer"]');
  await p.click('[data-testid="type-mariage"]');
  await p.click('[data-testid="q-passer"]'); await p.click('[data-testid="q-passer"]'); await p.click('[data-testid="q-passer"]'); 
  await p.waitForTimeout(300);
  await p.screenshot({ path: `l-${lng}${mob ? "m" : ""}-2.png` });
  await p.click('[data-testid="q-passer"]').catch(()=>{});
  await p.waitForSelector('[data-testid="lieu-riad"]', { timeout: 5000 }).catch(()=>{});
  await p.click('[data-testid="liste-lieu-riad"]');
  await p.waitForSelector('[data-testid="scene"]');
  await p.waitForTimeout(2600);
  await p.screenshot({ path: `l-${lng}${mob ? "m" : ""}-3.png` });
  await p.click('[data-testid="onglet-salle"]'); await p.waitForTimeout(300);
  await p.screenshot({ path: `l-${lng}${mob ? "m" : ""}-4.png` });
  console.log(lng, mob, "dir", await p.evaluate(() => document.querySelector('[data-testid="heavent-city"]').getAttribute("dir")), erreurs);
  await ctx.close();
}
await b.close();
