// Consentement : /nawar et /studio ne chargent jamais Google ; parcours Refuser / Accepter / Retirer sur /contact.
// Usage : servir dist/ sur le port 4173 (cd dist && python3 -m http.server 4173), puis : node tests/beta/consentement-nawar-studio.mjs
// Les requêtes vers Google et Supabase sont bloquées : on observe seulement les tentatives.
const { chromium } = require('playwright');
const base='http://localhost:4173';
const tiers=u=>!u.startsWith(base)&&!u.startsWith('data:')&&!u.startsWith('blob:');
async function ouvrir(browser,ctx,chemin,log){
  const p=await ctx.newPage();
  p.on('request',r=>{ if(tiers(r.url())) log.push(r.method()+' '+r.url().replace(/\?.*/,'').slice(0,110)); });
  await p.route(/googletagmanager|google-analytics|doubleclick|googleadservices/,r=>r.abort()); // on observe la tentative sans toucher à Google
  await p.route(/supabase\.co/,r=>r.abort());
  await p.goto(base+chemin,{waitUntil:'networkidle'}).catch(()=>{});
  await p.waitForTimeout(1500);
  return p;
}
const etat=async p=>({banniere:await p.locator('[data-testid=bandeau-audience]').count(), choix:await p.evaluate(()=>localStorage.getItem('heavent-audience')), cookies:await p.evaluate(()=>document.cookie), balise:await p.evaluate(()=>!!document.getElementById('balise-google'))});
const google=l=>l.filter(x=>/google|doubleclick/.test(x));
(async()=>{
 const browser=await chromium.launch();
 const nv=()=>({viewport:{width:390,height:844}});
 // 1. /nawar et /studio : jamais de requête Google, quel que soit le choix déjà enregistré
 for(const chemin of ['/nawar','/studio']){
  for(const pre of [null,'oui','non']){
   const ctx=await browser.newContext(nv()); await ctx.addInitScript((pre)=>{window.__suiviTest=true; if(pre) localStorage.setItem('heavent-audience',JSON.stringify({c:pre,t:Date.now()}));},pre);
   const log=[]; const p=await ouvrir(browser,ctx,chemin,log);
   const e=await etat(p);
   console.log(chemin,'choix préenregistré=',pre,'| bandeau:',e.banniere,'| balise Google:',e.balise,'| cookies:',JSON.stringify(e.cookies),'| requêtes Google:',google(log).length,'| tierces:',[...new Set(log.map(x=>x.replace(/^\w+ https?:\/\//,'').split('/')[0]))].join(','));
   await ctx.close();
  }
 }
 // 2. parcours de consentement sur une page à bandeau
 const chemin='/contact';
 let ctx=await browser.newContext(nv()); await ctx.addInitScript(()=>{window.__suiviTest=true});
 let log=[]; let p=await ouvrir(browser,ctx,chemin,log);
 console.log('A première visite',JSON.stringify(await etat(p)),'| Google:',google(log).length);
 log.length=0; await p.getByTestId('audience-refuser').click(); await p.waitForTimeout(800);
 console.log('B refus',JSON.stringify(await etat(p)),'| Google:',google(log).length);
 log.length=0; await p.reload({waitUntil:'networkidle'}).catch(()=>{}); await p.waitForTimeout(1000);
 console.log('B refus+rechargement',JSON.stringify(await etat(p)),'| Google:',google(log).length);
 await ctx.close();
 ctx=await browser.newContext(nv()); await ctx.addInitScript(()=>{window.__suiviTest=true});
 log=[]; p=await ouvrir(browser,ctx,chemin,log); log.length=0;
 await p.getByTestId('audience-accepter').click(); await p.waitForTimeout(1200);
 console.log('C accord',JSON.stringify(await etat(p)),'| Google:',JSON.stringify(google(log)));
 await p.evaluate(()=>{ document.cookie='_ga=x; path=/'; document.cookie='_gcl_au=y; path=/'; });
 await p.goto(base+'/politique-confidentialite',{waitUntil:'networkidle'}).catch(()=>{}); await p.waitForTimeout(800);
 const btn=p.getByRole('button',{name:/refuser|retirer|ne plus/i});
 console.log('D boutons dans la politique:',await btn.count(), await p.evaluate(()=>[...document.querySelectorAll('button')].map(b=>b.textContent.trim()).filter(t=>/accept|refus|retir|plus/i.test(t)).join(' | ')));
 if(await btn.count()){ log.length=0; await Promise.all([p.waitForNavigation().catch(()=>{}),btn.first().click()]); await p.waitForTimeout(1200); console.log('D après retrait',JSON.stringify(await etat(p)),'| Google:',google(log).length); }
 await ctx.close(); await browser.close();
})();