const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/html2pdf-BbcorPip.js","assets/ui-DafRrSQf.js","assets/supabase-CQg9uRoZ.js"])))=>i.map(i=>d[i]);
import{_ as l}from"./supabase-CQg9uRoZ.js";import{l as d}from"./logo-devis-noir-Bo9XyFX9.js";import{L as p}from"./index-DRJ2YQNg.js";const f={or:"#C8B560",orFonce:"#A8933F",noir:"#141414",creme:"#FAF7EE"},n=e=>String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),v=(e,t=!1)=>e?new Date(e+(e.length===10?"T12:00:00":"")).toLocaleDateString("fr-FR",t?{weekday:"long",day:"numeric",month:"long",year:"numeric"}:void 0):"",u=e=>`${new Intl.NumberFormat("fr-FR",{minimumFractionDigits:2,maximumFractionDigits:2}).format(Number(e)||0)} MAD`,b=["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],y=d,$=e=>e?`${p}/storage/v1/object/public/photos/photos/${encodeURIComponent(e)}`:null;async function w(e){if(!e)return null;try{const t=await fetch(e).then(a=>a.ok?a.blob():Promise.reject());return await new Promise(a=>{const o=new FileReader;o.onload=()=>a(o.result),o.readAsDataURL(t)})}catch{return null}}const g=()=>{const{or:e,orFonce:t,noir:a,creme:o}=f;return`
  .doc-heavent, .doc-heavent * { box-sizing: border-box; margin: 0; }
  .doc-heavent { font-family: "Inter", "Helvetica Neue", Arial, sans-serif; color: #2a2a2a; font-size: 11.5px; width: 794px; min-height: 1118px; background: #fff; line-height: 1.45; display: flex; flex-direction: column; }
  .doc-heavent .entete { padding: 30px 44px 22px; display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid ${e}; margin: 0 44px; padding-left: 0; padding-right: 0; }
  .doc-heavent .entete img { height: 110px; }
  .doc-heavent .entete .titre { text-align: right; }
  .doc-heavent .entete .titre .mot { font-family: "Playfair Display", Georgia, serif; font-size: 30px; letter-spacing: 5px; color: ${e}; line-height: 1.05; }
  .doc-heavent .entete .titre .sous { margin-top: 6px; font-size: 11px; color: #777; }
  .doc-heavent .corps { padding: 24px 44px 10px; flex: 1; }
  .doc-heavent .etiquette { font-size: 9.5px; letter-spacing: 2px; text-transform: uppercase; color: ${t}; font-weight: 700; margin-bottom: 5px; }
  .doc-heavent .bloc { padding: 12px 14px; background: ${o}; border-left: 3px solid ${e}; }
  .doc-heavent .cadre { padding: 12px 14px; border: 1px solid #ece6d3; }
  .doc-heavent .serif { font-family: "Playfair Display", Georgia, serif; }
  .doc-heavent h2 { font-family: "Playfair Display", Georgia, serif; font-size: 17px; color: ${a}; font-weight: 600; margin: 18px 0 8px; }
  .doc-heavent table { width: 100%; border-collapse: collapse; }
  .doc-heavent thead th { background: ${e}; color: #fff; font-weight: 600; padding: 8px 10px; text-align: left; font-size: 9.5px; letter-spacing: 1.2px; text-transform: uppercase; }
  .doc-heavent tbody td { padding: 8px 10px; border-bottom: 1px solid #efe9d8; vertical-align: top; }
  .doc-heavent tbody tr:nth-child(even) td { background: ${o}; }
  .doc-heavent tr, .doc-heavent .insecable { page-break-inside: avoid; }
  .doc-heavent .n { text-align: right; white-space: nowrap; }
  .doc-heavent .grille { display: flex; flex-wrap: wrap; gap: 8px; }
  .doc-heavent .case { flex: 1 1 30%; min-width: 30%; border: 1px solid #ece6d3; padding: 7px 10px; }
  .doc-heavent .case .v { font-weight: 600; color: ${a}; margin-top: 1px; }
  .doc-heavent .pied { background: ${o}; border-top: 3px solid ${e}; color: #666; padding: 12px 44px; font-size: 9.5px; text-align: center; line-height: 1.6; margin-top: 18px; }
  .doc-heavent .pied b { color: ${t}; letter-spacing: 1px; }
  .doc-heavent .signatures { display: flex; gap: 22px; margin-top: 22px; page-break-inside: avoid; }
  .doc-heavent .signatures > div { flex: 1; min-height: 110px; padding: 12px 14px; }
  .doc-heavent .signatures .agence { background: ${o}; border-top: 3px solid ${e}; }
  .doc-heavent .signatures .autre { border: 1px dashed #cfc6a8; }
  .doc-heavent .sign { font-family: "Playfair Display", Georgia, serif; font-style: italic; font-size: 22px; color: ${a}; }
  .doc-heavent .article { margin-top: 12px; page-break-inside: avoid; }
  .doc-heavent .article h3 { font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: ${t}; margin-bottom: 3px; }
  .doc-heavent .article p { text-align: justify; }
  .doc-heavent .saut { page-break-before: always; }
  `},_=e=>{const t=[e==null?void 0:e.adresse,e==null?void 0:e.ville].filter(Boolean).join(", "),a=' <span style="color:#A8933F">◆</span> ';return`<div class="pied"><b>${n(((e==null?void 0:e.raison_sociale)??"Heavent People Agency").toUpperCase())}</b>${t?a+n(t):""}<br>${[(e==null?void 0:e.rc)&&`RC ${n(e.rc)}`,(e==null?void 0:e.ice)&&`ICE ${n(e.ice)}`,(e==null?void 0:e.if_fiscal)&&`IF ${n(e.if_fiscal)}`,(e==null?void 0:e.telephone)&&n(e.telephone),(e==null?void 0:e.email)&&n(e.email)].filter(Boolean).join(a)}</div>`},F=(e,t,a)=>`<div class="entete"><img src="${n(e)}" alt="Heavent"><div class="titre"><div class="mot">${n(t)}</div><div class="sous">${a}</div></div></div>`;async function D(e,t,a){var s;const o=document.createElement("div");o.style.cssText="position:fixed;left:-10000px;top:0;z-index:-1;",o.innerHTML=`<style>${g()}${t}</style><div class="lot">${e.map((i,r)=>r?i.replace('class="doc-heavent"','class="doc-heavent suite"'):i).join("")}</div>`,document.body.appendChild(o);try{await((s=document.fonts)==null?void 0:s.ready);const i=(await l(async()=>{const{default:r}=await import("./html2pdf-BbcorPip.js").then(c=>c.h);return{default:r}},__vite__mapDeps([0,1,2]))).default;await i().set({margin:0,filename:a,image:{type:"jpeg",quality:.95},html2canvas:{scale:2,useCORS:!0,backgroundColor:"#ffffff"},jsPDF:{unit:"px",format:[794,1123],orientation:"portrait",hotfixes:["px_scaling"]},pagebreak:{mode:["css"],before:".suite",avoid:["tr",".insecable",".article",".signatures",".art",".signature",".remun",".bas"]}}).from(o.querySelector(".lot")).save()}finally{o.remove()}}const k=(...e)=>e.filter(Boolean).join("-").normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^A-Za-z0-9]+/g,"-").replace(/^-|-$/g,"")+".pdf";export{f as C,b as M,F as a,n as b,_ as c,v as d,w as e,g as f,y as l,u as m,k as n,$ as p,D as t};
