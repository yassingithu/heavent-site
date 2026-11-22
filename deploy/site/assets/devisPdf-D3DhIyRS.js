const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/html2pdf-Cq9zGwjn.js","assets/react-CEfzfvak.js","assets/html2canvas-8NzuiANZ.js"])))=>i.map(i=>d[i]);
import{_ as q}from"./supabase-BLuESGw6.js";import{e as F,l as T}from"./pdf-A2GkWqlc.js";import{l as C}from"./logo-nawar-CoKiAGys.js";import{z as M,m as c,b as l,y as w,A as P,B as z}from"./devisUtils-ExGU7oK6.js";const H={acompte:"Facture d'acompte",solde:"Facture de solde",totale:"Facture"},O=["Virement","Espèces","Chèque","Carte bancaire","Effet de commerce"],m=["zéro","un","deux","trois","quatre","cinq","six","sept","huit","neuf","dix","onze","douze","treize","quatorze","quinze","seize"],u=["","dix","vingt","trente","quarante","cinquante","soixante","soixante","quatre-vingt","quatre-vingt"];function _(e){if(e<=16)return m[e];if(e<20)return"dix-"+m[e-10];const t=Math.floor(e/10),a=e%10;if(t===7||t===9){const i=10+a,n=u[t];return t===7&&a===1?"soixante et onze":`${n}-${_(i)}`}return a===0?t===8?"quatre-vingts":u[t]:a===1&&t!==8?`${u[t]} et un`:`${u[t]}-${m[a]}`}function v(e,t=!0){const a=Math.floor(e/100),i=e%100;let n="";return a===1?n="cent":a>1&&(n=`${m[a]} cent${i===0&&t?"s":""}`),i&&(n+=(n?" ":"")+(i===80&&!t?"quatre-vingt":_(i))),n||"zéro"}function b(e){if(!Number.isFinite(e)||e<0)return"";const t=Math.floor(e+1e-9);if(t===0)return"zéro";const a=[],i=Math.floor(t/1e9),n=Math.floor(t%1e9/1e6),o=Math.floor(t%1e6/1e3),d=t%1e3;return i&&a.push(`${v(i)} milliard${i>1?"s":""}`),n&&a.push(`${v(n)} million${n>1?"s":""}`),o&&a.push(o===1?"mille":`${v(o,!1)} mille`),d&&a.push(v(d)),a.join(" ")}function R(e,t="MAD"){const a=Math.round((e-Math.floor(e+1e-9))*100),i=Math.floor(e+1e-9),n=t==="MAD"?i>1?"dirhams":"dirham":t;let o=`${b(i)} ${i>=1e6&&i%1e6===0?"de ":""}${n}`;return a&&(o+=` et ${b(a)} centime${a>1?"s":""}`),o.charAt(0).toUpperCase()+o.slice(1)}const s=e=>String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),U=e=>`Facture-${e.numero}-${(e.client_societe||e.client_nom||"client").replace(/[^\p{L}\p{N}]+/gu,"-").replace(/^-|-$/g,"")}.pdf`;function L(e,t,a){const i=e.devise||(t==null?void 0:t.devise)||"MAD",n=[t==null?void 0:t.adresse,t==null?void 0:t.ville].filter(Boolean).join(", "),o='<span class="sep">◆</span>',d=[(t==null?void 0:t.rc)&&`RC ${s(t.rc)}`,(t==null?void 0:t.ice)&&`ICE ${s(t.ice)}`,(t==null?void 0:t.if_fiscal)&&`IF ${s(t.if_fiscal)}`,(t==null?void 0:t.patente)&&`Patente ${s(t.patente)}`].filter(Boolean).join(o),p=Number(e.total_ht)-Number(e.total_remise),$=(e.lignes??[]).map(r=>`<tr>
      <td><div class="des">${s(r.designation)}</div>${r.description?`<div class="desc">${s(r.description)}</div>`:""}</td>
      <td class="n">${s(Number(r.quantite))}</td>
      <td class="n">${r.unite==="forfait"?"—":`${s(Number(r.duree))} ${s(M(r.unite))}`}</td>
      <td class="n">${c(Number(r.prix_unitaire),i)}</td>
      <td class="n">${Number(r.remise_pct)?`${s(Number(r.remise_pct))} %`:""}</td>
      <td class="n">${c(Number(r.total_ht),i)}</td></tr>`).join(""),g=[["Devis",e.devis_numero??""],e.titre&&["Événement",e.titre],e.date_evenement&&["Date",`${l(e.date_evenement)}${e.date_fin_evenement?` → ${l(e.date_fin_evenement)}`:""}`],e.lieu&&["Lieu",e.lieu]].filter(Boolean),y=(e.deductions??[]).map(r=>`<div class="l"><span>Acompte ${s(r.numero)}${r.payee?" réglé":""}</span><span style="white-space:nowrap">- ${c(Number(r.ttc),i)}</span></div>`).join(""),x=e.statut==="payee"?`<div class="tampon paye">Payée${e.payee_le?` le ${l(e.payee_le)}`:""}${e.mode_paiement?` · ${s(e.mode_paiement)}`:""}</div>`:e.statut==="annulee"?'<div class="tampon annule">Facture annulée</div>':"",A=w()+`
  .devis-doc .tampon { display: inline-block; margin-top: 14px; padding: 6px 14px; border: 2px solid; border-radius: 4px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; font-size: 11px; transform: rotate(-2deg); }
  .devis-doc .tampon.paye { color: #2F7A3A; border-color: #2F7A3A; }
  .devis-doc .tampon.annule { color: #B42318; border-color: #B42318; }
  .devis-doc .lettres { margin-top: 16px; padding: 10px 14px; background: #FAF7EE; border-left: 3px solid #C8B560; font-size: 11px; color: #2a2a2a; page-break-inside: avoid; }
  .devis-doc .totaux .net { background: #141414; color: #fff; padding: 11px 14px; border-bottom: none; }
  .devis-doc .totaux .net span:first-child { color: #fff; letter-spacing: 1.5px; text-transform: uppercase; font-size: 10px; font-weight: 700; }
  .devis-doc .totaux .net span:last-child { font-family: "Playfair Display", Georgia, serif; font-size: 18px; color: #fff; }`,N=e.type==="acompte"?"FACTURE D'ACOMPTE":e.type==="solde"?"FACTURE DE SOLDE":"FACTURE",D=`<div class="devis-pages"><div class="devis-doc">
<div class="band">
  <img src="${s(a)}" alt="${e.marque==="nawar"?"Nawar — bar à parfums":"Heavent People Agency"}">
  <div class="titre">
    <div class="mot" style="${e.type==="totale"?"":"font-size:28px;letter-spacing:4px"}">${N}</div>
    <div class="num">N° ${s(e.numero)}</div>
    <div class="dates">Émise le ${l(e.date_emission)} · Payable à réception</div>
  </div>
</div>
<div class="corps">
  <div class="parties">
    <div class="partie">
      <div class="etiquette">Émise par</div>
      <div class="nom">${s((t==null?void 0:t.raison_sociale)??"Heavent Agency SARL AU")}</div>
      ${n?`<div>${s(n)}</div>`:""}
      ${t!=null&&t.telephone?`<div>${s(t.telephone)}</div>`:""}
      ${t!=null&&t.email?`<div>${s(t.email)}</div>`:""}
      ${t!=null&&t.ice?`<div>ICE : ${s(t.ice)}</div>`:""}
    </div>
    <div class="partie client">
      <div class="etiquette">Facturé à</div>
      <div class="nom">${s(e.client_societe||e.client_nom)}</div>
      ${e.client_societe?`<div>À l'attention de ${s(e.client_nom)}</div>`:""}
      ${e.client_adresse?`<div>${s(e.client_adresse)}</div>`:""}
      ${e.client_telephone?`<div>${s(e.client_telephone)}</div>`:""}
      ${e.client_email?`<div>${s(e.client_email)}</div>`:""}
      ${e.client_ice?`<div>ICE : ${s(e.client_ice)}</div>`:""}
    </div>
  </div>
  <div class="infos">${g.map(([r,E])=>`<div class="info"><div class="etiquette">${r}</div><div class="v">${s(E)}</div></div>`).join("")}</div>
  <table>
    <thead><tr><th>Désignation</th><th class="n">Qté</th><th class="n">Durée</th><th class="n">P.U. HT</th><th class="n">Remise</th><th class="n">Total HT</th></tr></thead>
    <tbody>${$}</tbody>
  </table>
  <div class="bas">
    <div class="conditions">
      <div class="etiquette">Règlement</div>
      <p>Payable à réception${t!=null&&t.rib?`, par virement bancaire — RIB ${s(t.rib)}`:""}.<br>Merci d'indiquer la référence <b>${s(e.numero)}</b> avec votre paiement.</p>
      <div class="etiquette">Retard de paiement</div>
      <p>Pour les clients professionnels, tout retard de paiement entraîne de plein droit les pénalités prévues par la loi n° 69-21 relative aux délais de paiement.</p>
      ${x}
    </div>
    <div class="totaux">
      <div class="l"><span>Total HT</span><span>${c(Number(e.total_ht),i)}</span></div>
      ${Number(e.total_remise)?`<div class="l"><span>Remise ${s(Number(e.remise_globale_pct))} %</span><span>- ${c(Number(e.total_remise),i)}</span></div><div class="l"><span>Net HT</span><span>${c(p,i)}</span></div>`:""}
      <div class="l"><span>TVA ${s(Number(e.taux_tva))} %</span><span>${c(Number(e.total_tva),i)}</span></div>
      <div class="l ttc"><span>Total TTC</span><span>${c(Number(e.total_ttc),i)}</span></div>
      ${y}
      ${e.type==="solde"?`<div class="l net"><span>Reste à payer</span><span>${c(Number(e.net_a_payer),i)}</span></div>`:""}
    </div>
  </div>
  <div class="lettres">Arrêtée la présente facture à la somme de : <b>${s(R(Number(e.net_a_payer),i))}</b> TTC.</div>
</div>
<div class="pied"><b>${s(((t==null?void 0:t.raison_sociale)??"Heavent Agency SARL AU").toUpperCase())}</b>${n?`${o}${s(n)}`:""}<br>${d}</div>
</div></div>`;return{css:A,html:D}}async function I(e){try{const t=await fetch(e).then(a=>a.blob());return await new Promise(a=>{const i=new FileReader;i.onload=()=>a(i.result),i.readAsDataURL(t)})}catch{return e}}async function h(e,t,a){var n;const i=document.createElement("div");try{i.style.cssText="position:fixed;left:-10000px;top:0;z-index:-1;",i.innerHTML=`<style>${e}</style>${t}`,document.body.appendChild(i),await((n=document.fonts)==null?void 0:n.ready);const o=(await q(async()=>{const{default:p}=await import("./html2pdf-Cq9zGwjn.js").then($=>$.h);return{default:p}},__vite__mapDeps([0,1,2]))).default,d=await o().set({margin:0,filename:a,image:{type:"jpeg",quality:.95},html2canvas:{scale:2,useCORS:!0,backgroundColor:"#ffffff"},jsPDF:{unit:"px",format:[794,1123],orientation:"portrait",hotfixes:["px_scaling"]},pagebreak:{mode:["css"],before:".suite",avoid:["tr",".art",".signature",".bas",".lettres"]}}).from(i.querySelector(".devis-pages")).outputPdf("blob");return F(new Blob([d],{type:"application/pdf"}),a),a}finally{i.remove()}}const f=e=>I(e==="nawar"?C:T);async function V(e,t){const{css:a,html:i}=P(e,t,await f(e.marque));return h(a,i,z(e))}async function G(e,t){const{css:a,html:i}=L(e,t,await f(e.marque));return h(a,i,U(e))}export{O as M,H as T,V as a,G as t};
