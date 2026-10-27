const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/html2pdf-D0CdZyKL.js","assets/react-B4GoM43w.js","assets/html2canvas-y934Oxi-.js"])))=>i.map(i=>d[i]);
import{_ as q}from"./supabase-xAJNVyYH.js";import{e as D,l as F}from"./pdf-CWDTQcw_.js";import{w,m as l,f as d,v as C,x as M,y as P}from"./devisUtils-wcmbTKSw.js";const z="/assets/logo-nawar-BPKVqMBX.png",k={acompte:"Facture d'acompte",solde:"Facture de solde",totale:"Facture"},H={a_payer:{label:"À payer",className:"bg-amber-100 text-amber-900"},payee:{label:"Payée",className:"bg-green-100 text-green-800"},annulee:{label:"Annulée",className:"bg-gray-200 text-gray-700 line-through"}},O=["Virement","Espèces","Chèque","Carte bancaire","Effet de commerce"],m=["zéro","un","deux","trois","quatre","cinq","six","sept","huit","neuf","dix","onze","douze","treize","quatorze","quinze","seize"],u=["","dix","vingt","trente","quarante","cinquante","soixante","soixante","quatre-vingt","quatre-vingt"];function _(e){if(e<=16)return m[e];if(e<20)return"dix-"+m[e-10];const t=Math.floor(e/10),i=e%10;if(t===7||t===9){const a=10+i,n=u[t];return t===7&&i===1?"soixante et onze":`${n}-${_(a)}`}return i===0?t===8?"quatre-vingts":u[t]:i===1&&t!==8?`${u[t]} et un`:`${u[t]}-${m[i]}`}function v(e,t=!0){const i=Math.floor(e/100),a=e%100;let n="";return i===1?n="cent":i>1&&(n=`${m[i]} cent${a===0&&t?"s":""}`),a&&(n+=(n?" ":"")+(a===80&&!t?"quatre-vingt":_(a))),n||"zéro"}function b(e){if(!Number.isFinite(e)||e<0)return"";const t=Math.floor(e+1e-9);if(t===0)return"zéro";const i=[],a=Math.floor(t/1e9),n=Math.floor(t%1e9/1e6),o=Math.floor(t%1e6/1e3),c=t%1e3;return a&&i.push(`${v(a)} milliard${a>1?"s":""}`),n&&i.push(`${v(n)} million${n>1?"s":""}`),o&&i.push(o===1?"mille":`${v(o,!1)} mille`),c&&i.push(v(c)),i.join(" ")}function R(e,t="MAD"){const i=Math.round((e-Math.floor(e+1e-9))*100),a=Math.floor(e+1e-9),n=t==="MAD"?a>1?"dirhams":"dirham":t;let o=`${b(a)} ${a>=1e6&&a%1e6===0?"de ":""}${n}`;return i&&(o+=` et ${b(i)} centime${i>1?"s":""}`),o.charAt(0).toUpperCase()+o.slice(1)}const s=e=>String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),U=e=>`Facture-${e.numero}-${(e.client_societe||e.client_nom||"client").replace(/[^\p{L}\p{N}]+/gu,"-").replace(/^-|-$/g,"")}.pdf`;function S(e,t,i){const a=e.devise||(t==null?void 0:t.devise)||"MAD",n=[t==null?void 0:t.adresse,t==null?void 0:t.ville].filter(Boolean).join(", "),o='<span class="sep">◆</span>',c=[(t==null?void 0:t.rc)&&`RC ${s(t.rc)}`,(t==null?void 0:t.ice)&&`ICE ${s(t.ice)}`,(t==null?void 0:t.if_fiscal)&&`IF ${s(t.if_fiscal)}`,(t==null?void 0:t.patente)&&`Patente ${s(t.patente)}`].filter(Boolean).join(o),p=Number(e.total_ht)-Number(e.total_remise),$=(e.lignes??[]).map(r=>`<tr>
      <td><div class="des">${s(r.designation)}</div>${r.description?`<div class="desc">${s(r.description)}</div>`:""}</td>
      <td class="n">${s(Number(r.quantite))}</td>
      <td class="n">${r.unite==="forfait"?"—":`${s(Number(r.duree))} ${s(w(r.unite))}`}</td>
      <td class="n">${l(Number(r.prix_unitaire),a)}</td>
      <td class="n">${Number(r.remise_pct)?`${s(Number(r.remise_pct))} %`:""}</td>
      <td class="n">${l(Number(r.total_ht),a)}</td></tr>`).join(""),f=[["Devis",e.devis_numero??""],e.titre&&["Événement",e.titre],e.date_evenement&&["Date",`${d(e.date_evenement)}${e.date_fin_evenement?` → ${d(e.date_fin_evenement)}`:""}`],e.lieu&&["Lieu",e.lieu]].filter(Boolean),y=(e.deductions??[]).map(r=>`<div class="l"><span>Acompte ${s(r.numero)}${r.payee?" réglé":""}</span><span style="white-space:nowrap">- ${l(Number(r.ttc),a)}</span></div>`).join(""),x=e.statut==="payee"?`<div class="tampon paye">Payée${e.payee_le?` le ${d(e.payee_le)}`:""}${e.mode_paiement?` · ${s(e.mode_paiement)}`:""}</div>`:e.statut==="annulee"?'<div class="tampon annule">Facture annulée</div>':"",N=C()+`
  .devis-doc .tampon { display: inline-block; margin-top: 14px; padding: 6px 14px; border: 2px solid; border-radius: 4px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; font-size: 11px; transform: rotate(-2deg); }
  .devis-doc .tampon.paye { color: #2F7A3A; border-color: #2F7A3A; }
  .devis-doc .tampon.annule { color: #B42318; border-color: #B42318; }
  .devis-doc .lettres { margin-top: 16px; padding: 10px 14px; background: #FAF7EE; border-left: 3px solid #C8B560; font-size: 11px; color: #2a2a2a; page-break-inside: avoid; }
  .devis-doc .totaux .net { background: #141414; color: #fff; padding: 11px 14px; border-bottom: none; }
  .devis-doc .totaux .net span:first-child { color: #fff; letter-spacing: 1.5px; text-transform: uppercase; font-size: 10px; font-weight: 700; }
  .devis-doc .totaux .net span:last-child { font-family: "Playfair Display", Georgia, serif; font-size: 18px; color: #fff; }`,T=e.type==="acompte"?"FACTURE D'ACOMPTE":e.type==="solde"?"FACTURE DE SOLDE":"FACTURE",A=`<div class="devis-pages"><div class="devis-doc">
<div class="band">
  <img src="${s(i)}" alt="${e.marque==="nawar"?"Nawar — bar à parfums":"Heavent People Agency"}">
  <div class="titre">
    <div class="mot" style="${e.type==="totale"?"":"font-size:28px;letter-spacing:4px"}">${T}</div>
    <div class="num">N° ${s(e.numero)}</div>
    <div class="dates">Émise le ${d(e.date_emission)} · Payable à réception</div>
  </div>
</div>
<div class="corps">
  <div class="parties">
    <div class="partie">
      <div class="etiquette">Émise par</div>
      <div class="nom">${s((t==null?void 0:t.raison_sociale)??"Heavent People Agency")}</div>
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
  <div class="infos">${f.map(([r,E])=>`<div class="info"><div class="etiquette">${r}</div><div class="v">${s(E)}</div></div>`).join("")}</div>
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
      <div class="l"><span>Total HT</span><span>${l(Number(e.total_ht),a)}</span></div>
      ${Number(e.total_remise)?`<div class="l"><span>Remise ${s(Number(e.remise_globale_pct))} %</span><span>- ${l(Number(e.total_remise),a)}</span></div><div class="l"><span>Net HT</span><span>${l(p,a)}</span></div>`:""}
      <div class="l"><span>TVA ${s(Number(e.taux_tva))} %</span><span>${l(Number(e.total_tva),a)}</span></div>
      <div class="l ttc"><span>Total TTC</span><span>${l(Number(e.total_ttc),a)}</span></div>
      ${y}
      ${e.type==="solde"?`<div class="l net"><span>Reste à payer</span><span>${l(Number(e.net_a_payer),a)}</span></div>`:""}
    </div>
  </div>
  <div class="lettres">Arrêtée la présente facture à la somme de : <b>${s(R(Number(e.net_a_payer),a))}</b> TTC.</div>
</div>
<div class="pied"><b>${s(((t==null?void 0:t.raison_sociale)??"Heavent People Agency").toUpperCase())}</b>${n?`${o}${s(n)}`:""}<br>${c}</div>
</div></div>`;return{css:N,html:A}}async function B(e){try{const t=await fetch(e).then(i=>i.blob());return await new Promise(i=>{const a=new FileReader;a.onload=()=>i(a.result),a.readAsDataURL(t)})}catch{return e}}async function h(e,t,i){var n;const a=document.createElement("div");try{a.style.cssText="position:fixed;left:-10000px;top:0;z-index:-1;",a.innerHTML=`<style>${e}</style>${t}`,document.body.appendChild(a),await((n=document.fonts)==null?void 0:n.ready);const o=(await q(async()=>{const{default:p}=await import("./html2pdf-D0CdZyKL.js").then($=>$.h);return{default:p}},__vite__mapDeps([0,1,2]))).default,c=await o().set({margin:0,filename:i,image:{type:"jpeg",quality:.95},html2canvas:{scale:2,useCORS:!0,backgroundColor:"#ffffff"},jsPDF:{unit:"px",format:[794,1123],orientation:"portrait",hotfixes:["px_scaling"]},pagebreak:{mode:["css"],before:".suite",avoid:["tr",".art",".signature",".bas",".lettres"]}}).from(a.querySelector(".devis-pages")).outputPdf("blob");return D(new Blob([c],{type:"application/pdf"}),i),i}finally{a.remove()}}const g=e=>B(e==="nawar"?z:F);async function V(e,t){const{css:i,html:a}=M(e,t,await g(e.marque));return h(i,a,P(e))}async function G(e,t){const{css:i,html:a}=S(e,t,await g(e.marque));return h(i,a,U(e))}export{O as M,H as S,k as T,V as a,z as l,G as t};
