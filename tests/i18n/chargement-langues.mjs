const { chromium } = await import("/opt/npm-tools/node_modules/playwright/index.mjs");
// Test : anglais et arabe sont chargés à la demande (le français n'en télécharge aucun), texte et sens de lecture corrects.
// Usage : node tests/i18n/chargement-langues.mjs   (site sur http://127.0.0.1:5180)
const b = await chromium.launch();
for (const [l, attendu] of [["fr","Entreprises"],["en","Business"],["ar","الشركات"]]) {
  const c = await b.newContext({ viewport:{width:1280,height:800} });
  const p = await c.newPage(); const err=[]; p.on("pageerror",e=>err.push(e.message)); p.on("console",m=>m.type()==="error"&&err.push(m.text()));
  await p.addInitScript(v=>localStorage.setItem("i18nextLng",v), l);
  await p.goto("http://127.0.0.1:5180/", {waitUntil:"networkidle"}); await p.waitForTimeout(800);
  const t = await p.evaluate(()=>document.body.innerText);
  const reqs = await p.evaluate(()=>performance.getEntriesByType("resource").map(e=>e.name.split("/").pop()).filter(n=>/^(en|ar|textesTraduits)-/.test(n)));
  console.log(l, t.includes(attendu)?"OK":"KO texte", "dir="+await p.evaluate(()=>document.documentElement.dir||"ltr"), "chargé:", reqs.join(",")||"rien", err.filter(e=>!/supabase|gtag|Failed to load resource/.test(e)).slice(0,2));
  await c.close();
}
// changement de langue au clic
const c = await b.newContext(); const p = await c.newPage(); await p.goto("http://127.0.0.1:5180/", {waitUntil:"networkidle"});
await p.evaluate(()=>0);
await p.locator(".s-langues button:visible", { hasText: /^EN$/ }).first().click(); await p.waitForTimeout(1500);
console.log("clic EN :", (await p.evaluate(()=>document.body.innerText)).includes("Business")?"OK":"KO");
await p.locator(".s-langues button:visible", { hasText: /^ع$/ }).first().click(); await p.waitForTimeout(1500);
console.log("clic arabe :", (await p.evaluate(()=>document.body.innerText)).includes("الشركات")?"OK":"KO", "dir="+await p.evaluate(()=>document.documentElement.dir));
await b.close();
