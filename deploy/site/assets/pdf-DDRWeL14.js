const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/html2pdf-BRj7rS28.js","assets/react-B4GoM43w.js"])))=>i.map(i=>d[i]);
import{_ as p}from"./supabase-xAJNVyYH.js";import{a1 as f}from"./index-CoYkDQM_.js";const g="/assets/logo-devis-noir-D6Vn_ZQ8.png",h={or:"#C8B560",orFonce:"#A8933F",noir:"#141414",creme:"#FAF7EE"},n=e=>String(e??"").replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a]),b=(e,a=!1)=>e?new Date(e+(e.length===10?"T12:00:00":"")).toLocaleDateString("fr-FR",a?{weekday:"long",day:"numeric",month:"long",year:"numeric"}:void 0):"",y=e=>`${new Intl.NumberFormat("fr-FR",{minimumFractionDigits:2,maximumFractionDigits:2}).format(Number(e)||0)} MAD`,$=["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],w=g,F=e=>e?`${f}/storage/v1/object/public/photos/photos/${encodeURIComponent(e)}`:null;async function _(e){if(!e)return null;try{const a=await fetch(e).then(o=>o.ok?o.blob():Promise.reject());return await new Promise(o=>{const t=new FileReader;t.onload=()=>o(t.result),t.readAsDataURL(a)})}catch{return null}}const x=()=>{const{or:e,orFonce:a,noir:o,creme:t}=h;return`
  .doc-heavent, .doc-heavent * { box-sizing: border-box; margin: 0; }
  .doc-heavent { font-family: "Inter", "Helvetica Neue", Arial, sans-serif; color: #2a2a2a; font-size: 11.5px; width: 794px; min-height: 1118px; background: #fff; line-height: 1.45; display: flex; flex-direction: column; }
  .doc-heavent .entete { padding: 30px 44px 22px; display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid ${e}; margin: 0 44px; padding-left: 0; padding-right: 0; }
  .doc-heavent .entete img { height: 110px; }
  .doc-heavent .entete .titre { text-align: right; }
  .doc-heavent .entete .titre .mot { font-family: "Playfair Display", Georgia, serif; font-size: 30px; letter-spacing: 5px; color: ${e}; line-height: 1.05; }
  .doc-heavent .entete .titre .sous { margin-top: 6px; font-size: 11px; color: #777; }
  .doc-heavent .corps { padding: 24px 44px 10px; flex: 1; }
  .doc-heavent .etiquette { font-size: 9.5px; letter-spacing: 2px; text-transform: uppercase; color: ${a}; font-weight: 700; margin-bottom: 5px; }
  .doc-heavent .bloc { padding: 12px 14px; background: ${t}; border-left: 3px solid ${e}; }
  .doc-heavent .cadre { padding: 12px 14px; border: 1px solid #ece6d3; }
  .doc-heavent .serif { font-family: "Playfair Display", Georgia, serif; }
  .doc-heavent h2 { font-family: "Playfair Display", Georgia, serif; font-size: 17px; color: ${o}; font-weight: 600; margin: 18px 0 8px; }
  .doc-heavent table { width: 100%; border-collapse: collapse; }
  .doc-heavent thead th { background: ${e}; color: #fff; font-weight: 600; padding: 8px 10px; text-align: left; font-size: 9.5px; letter-spacing: 1.2px; text-transform: uppercase; }
  .doc-heavent tbody td { padding: 8px 10px; border-bottom: 1px solid #efe9d8; vertical-align: top; }
  .doc-heavent tbody tr:nth-child(even) td { background: ${t}; }
  .doc-heavent tr, .doc-heavent .insecable { page-break-inside: avoid; }
  .doc-heavent .n { text-align: right; white-space: nowrap; }
  .doc-heavent .grille { display: flex; flex-wrap: wrap; gap: 8px; }
  .doc-heavent .case { flex: 1 1 30%; min-width: 30%; border: 1px solid #ece6d3; padding: 7px 10px; }
  .doc-heavent .case .v { font-weight: 600; color: ${o}; margin-top: 1px; }
  .doc-heavent .pied { background: ${t}; border-top: 3px solid ${e}; color: #666; padding: 12px 44px; font-size: 9.5px; text-align: center; line-height: 1.6; margin-top: 18px; }
  .doc-heavent .pied b { color: ${a}; letter-spacing: 1px; }
  .doc-heavent .signatures { display: flex; gap: 22px; margin-top: 22px; page-break-inside: avoid; }
  .doc-heavent .signatures > div { flex: 1; min-height: 110px; padding: 12px 14px; }
  .doc-heavent .signatures .agence { background: ${t}; border-top: 3px solid ${e}; }
  .doc-heavent .signatures .autre { border: 1px dashed #cfc6a8; }
  .doc-heavent .sign { font-family: "Playfair Display", Georgia, serif; font-style: italic; font-size: 22px; color: ${o}; }
  .doc-heavent .article { margin-top: 12px; page-break-inside: avoid; }
  .doc-heavent .article h3 { font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: ${a}; margin-bottom: 3px; }
  .doc-heavent .article p { text-align: justify; }
  .doc-heavent .saut { page-break-before: always; }
  `},j=e=>{const a=[e==null?void 0:e.adresse,e==null?void 0:e.ville].filter(Boolean).join(", "),o=' <span style="color:#A8933F">◆</span> ';return`<div class="pied"><b>${n(((e==null?void 0:e.raison_sociale)??"Heavent People Agency").toUpperCase())}</b>${a?o+n(a):""}<br>${[(e==null?void 0:e.rc)&&`RC ${n(e.rc)}`,(e==null?void 0:e.ice)&&`ICE ${n(e.ice)}`,(e==null?void 0:e.if_fiscal)&&`IF ${n(e.if_fiscal)}`,(e==null?void 0:e.telephone)&&n(e.telephone),(e==null?void 0:e.email)&&n(e.email)].filter(Boolean).join(o)}</div>`},k=(e,a,o)=>`<div class="entete"><img src="${n(e)}" alt="Heavent"><div class="titre"><div class="mot">${n(a)}</div><div class="sous">${o}</div></div></div>`;async function D(e,a,o){var s;const t=document.createElement("div");t.style.cssText="position:fixed;left:-10000px;top:0;z-index:-1;",t.innerHTML=`<style>${x()}${a}</style><div class="lot">${e.map((i,r)=>r?i.replace('class="doc-heavent"','class="doc-heavent suite"'):i).join("")}</div>`,document.body.appendChild(t);try{await((s=document.fonts)==null?void 0:s.ready);const i=(await p(async()=>{const{default:l}=await import("./html2pdf-BRj7rS28.js").then(d=>d.h);return{default:l}},__vite__mapDeps([0,1]))).default,r=await i().set({margin:0,filename:o,image:{type:"jpeg",quality:.95},html2canvas:{scale:2,useCORS:!0,backgroundColor:"#ffffff"},jsPDF:{unit:"px",format:[794,1123],orientation:"portrait",hotfixes:["px_scaling"]},pagebreak:{mode:["css"],before:".suite",avoid:["tr",".insecable",".article",".signatures",".art",".signature",".remun",".bas"]}}).from(t.querySelector(".lot")).outputPdf("blob"),c=new Blob([r],{type:"application/pdf"});return m(c,o),c}finally{t.remove()}}function m(e,a){const o=URL.createObjectURL(e),t=document.createElement("a");t.href=o,t.download=a,t.rel="noopener",document.body.appendChild(t),t.click(),t.remove(),setTimeout(()=>URL.revokeObjectURL(o),6e4)}function P(e,a){if(!e||typeof navigator>"u"||!navigator.canShare)return!1;try{return navigator.canShare({files:[new File([e],a,{type:e.type})]})}catch{return!1}}async function R(e,a,o){try{return await navigator.share({files:[new File([e],a,{type:e.type})],title:o??a}),!0}catch(t){return(t==null?void 0:t.name)==="AbortError"}}const z=(...e)=>e.filter(Boolean).join("-").normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^A-Za-z0-9]+/g,"-").replace(/^-|-$/g,"")+".pdf";export{h as C,$ as M,k as a,n as b,j as c,b as d,_ as e,m as f,g,P as h,R as i,x as j,w as l,y as m,z as n,F as p,D as t};
