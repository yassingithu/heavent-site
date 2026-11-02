import{s as g,j as t,S as c}from"./index-CJJ90VoT.js";import{r as i}from"./react-CEfzfvak.js";import y from"./NotFound--y45VLef.js";import{e as v}from"./admin-DtBAwsDR.js";import"./supabase-BLuESGw6.js";import"./ui-BM00NQIV.js";const w=`<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Bureau Heavent (privé)</title>
<style>@font-face{font-family:Gloock;src:url(/polices/gloock-latin-400-normal.woff2)}@font-face{font-family:Jost;font-weight:400;src:url(/polices/jost-latin-400-normal.woff2)}@font-face{font-family:Jost;font-weight:500;src:url(/polices/jost-latin-500-normal.woff2)}</style>
<style>
/* Plan : un open space vu de face, 10 postes en deux rangées, une allée centrale, un couloir du bas avec la porte. Les agents marchent vraiment, un clic les arrête et ils se présentent dans une fiche collée en bas de l'écran. Palette Seuil, nuit dominante. */
:root{
  --nuit:#141414; --mur:#211d16; --sol:#17140f; --platre:#F3ECDD; --laiton:#A8933F; --or:#E4D49A;
  --gris:#BDB29C; --vert:#3E9C83; --terre:#D0764F; --majorelle:#6C8BD9; --rose:#D9A08F;
  --titre:'Gloock',Georgia,'Times New Roman',serif; --texte:'Jost',system-ui,-apple-system,'Segoe UI',sans-serif;
  color-scheme:dark;
}
*{box-sizing:border-box}
body{margin:0;background:var(--nuit);color:var(--platre);font-family:var(--texte);font-size:16px;line-height:1.5;
  padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-block:26px 40px}
.page{max-width:1180px;margin:0 auto}
header{display:flex;align-items:flex-end;gap:24px;flex-wrap:wrap;padding-bottom:18px}
.compte{font-family:var(--titre);font-size:clamp(76px,16vw,124px);line-height:.85;color:var(--or);font-variant-numeric:tabular-nums}
.intro{min-width:0;flex:1 1 280px;padding-bottom:4px}
.etiq{font-weight:500;letter-spacing:.3em;text-transform:uppercase;font-size:13px;color:var(--gris);margin:0 0 8px}
h1{font-family:var(--titre);font-weight:400;font-size:clamp(28px,5.2vw,40px);line-height:1.08;margin:0 0 8px;text-wrap:balance}
.intro p{margin:0;color:var(--gris);max-width:56ch}
.bouton{background:none;border:1px solid var(--laiton);color:var(--or);font:500 13px var(--texte);letter-spacing:.2em;text-transform:uppercase;padding:9px 14px;cursor:pointer}
.bouton:focus-visible,.puces button:focus-visible,.agent:focus-visible{outline:2px solid var(--or);outline-offset:3px}
.outils{margin-top:12px;display:flex;gap:10px;flex-wrap:wrap}
.salle{overflow-x:auto;border:1px solid #3a352b;background:#0e0d0b}
.salle svg{display:block;width:100%;min-width:900px;height:auto}
.agent{cursor:pointer}
.nom-tag{font:500 12.5px var(--texte);fill:#F3ECDD;paint-order:stroke;stroke:#141414;stroke-width:3.5px;stroke-linejoin:round;text-anchor:middle;pointer-events:none}
.bulle-t{font:500 13px var(--texte);fill:#141414;text-anchor:middle;pointer-events:none}
.anneau{animation:anneau 1.4s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 50%}
@keyframes anneau{0%,100%{transform:scale(1);opacity:.9}50%{transform:scale(1.25);opacity:.35}}
.puces{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0 0;padding:0;list-style:none}
.puces button{font:500 14px var(--texte);color:var(--platre);background:#1c1a16;border:1px solid #3a352b;padding:7px 12px;cursor:pointer;display:flex;align-items:center;gap:8px}
.puces button i{width:9px;height:9px;background:var(--c);transform:rotate(45deg);flex:none}
.puces button[aria-pressed="true"]{border-color:var(--c);background:#26221b}
.fiche{position:sticky;bottom:max(12px,env(safe-area-inset-bottom,0px));margin-top:16px;z-index:5;background:#1c1a16;border:1px solid var(--c);border-left-width:5px;
  box-shadow:0 -10px 34px rgba(0,0,0,.55);display:grid;grid-template-columns:auto 1fr;gap:18px;padding:16px 18px;max-height:min(58vh,520px);overflow:auto}
.fiche[hidden]{display:none}
.fiche .photo{width:96px;align-self:start}
.fiche h2{font-family:var(--titre);font-weight:400;font-size:clamp(24px,5vw,30px);line-height:1.1;margin:0}
.fiche .titre{margin:2px 0 8px;color:var(--c);font-weight:500;letter-spacing:.14em;text-transform:uppercase;font-size:13px}
.fiche p{margin:0 0 8px;max-width:66ch}
.fiche ul{margin:0 0 8px;padding-left:20px;color:var(--platre)}
.fiche li{margin:2px 0}
.fiche .petit{color:var(--gris);font-size:15px;font-variant-numeric:tabular-nums}
.fermer{position:absolute;top:8px;right:10px;background:none;border:1px solid #58503f;color:var(--platre);font:500 13px var(--texte);padding:5px 10px;cursor:pointer}
@media (max-width:560px){.fiche{grid-template-columns:1fr}.fiche .photo{width:70px}}
.feed{margin-top:22px;border-top:1px solid #3a352b;padding-top:14px}
.feed h2{font:400 22px var(--titre);margin:0 0 8px}
.feed ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column}
.feed li{display:grid;grid-template-columns:auto auto 1fr;gap:4px 14px;align-items:baseline;padding:8px 0;border-bottom:1px solid #26221b;font-size:15px}
.feed time{color:var(--gris);font-variant-numeric:tabular-nums;font-size:14px;min-width:11ch}
.feed b{font-weight:500;color:var(--c,var(--or))}
.feed .etat{font-size:12px;letter-spacing:.16em;text-transform:uppercase;margin-left:8px;color:var(--gris)}
.feed .etat.en_cours{color:var(--vert)}.feed .etat.erreur{color:var(--terre)}
.feed .vide{display:block;color:var(--gris)}
@media (max-width:560px){.feed li{grid-template-columns:1fr}}
footer{margin-top:22px;color:var(--gris);font-size:14px;max-width:72ch}
.creche{opacity:0;transform:translateY(10px);transition:opacity .45s ease,transform .45s ease;pointer-events:none}.creche.on{opacity:1;transform:none}.zzz{animation:zz 2.4s ease-in-out infinite}@keyframes zz{50%{transform:translateY(-5px);opacity:.5}}#porte:focus-visible rect{stroke:#E4D49A;stroke-width:2}@media (prefers-reduced-motion:reduce){.creche{transition:none}.zzz{animation:none}}
</style>

<div class="page">
<header>
  <div class="compte" id="compte" aria-label="10 agents">10</div>
  <div class="intro">
    <p class="etiq">Heavent People Agency</p>
    <h1>Les agents de Heavent au travail</h1>
    <p>Quand un agent travaille vraiment, il reste à son poste et son nom s'entoure d'un anneau. Le reste du temps, il se promène. Cliquez sur l'un d'eux pour voir sa dernière activité.</p>
    <div class="outils"><button class="bouton" id="calme" type="button">Mettre en pause</button></div>
  </div>
</header>

<div class="salle"><svg id="plan" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg" role="group" aria-label="Plan de l'open space avec les 10 agents">
  <defs>
    <pattern id="zel" width="64" height="64" patternUnits="userSpaceOnUse"><rect x="16" y="16" width="32" height="32" fill="none" stroke="#E4D49A" stroke-width="1"/><rect x="16" y="16" width="32" height="32" fill="none" stroke="#E4D49A" stroke-width="1" transform="rotate(45 32 32)"/></pattern>
    <linearGradient id="ciel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a3a1e"/><stop offset="1" stop-color="#8a6a34"/></linearGradient>
  </defs>
  <rect width="1200" height="800" fill="#0e0d0b"/>
  <rect x="30" y="30" width="1160" height="742" fill="#17140f"/>
  <rect x="30" y="30" width="1160" height="742" fill="url(#zel)" opacity=".07"/>
  <rect x="30" y="30" width="1160" height="82" fill="#211d16"/>
  <g id="statique"></g>
  <g id="monde"></g>
  <g id="bulles"></g>
</svg></div>

<ul class="puces" id="puces"></ul>
<section class="feed" aria-labelledby="feed-t"><h2 id="feed-t">En direct</h2><ul id="feed"><li class="vide">Chargement…</li></ul></section>
<section class="fiche" id="fiche" hidden aria-live="polite"></section>
<footer>Page privée, réservée aux administrateurs. Les promenades sont une animation ; les lignes « En direct » sont les vraies traces : passages des agents automatiques, appels des autres agents, et publications Instagram. Les prénoms sont des surnoms. La publication Instagram n'est pas un agent : c'est une fonction du site qui se déclenche toutes les 15 minutes.</footer>
</div>

<script>
const NS='http://www.w3.org/2000/svg';
const $=(t,a,h)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);if(h!=null)e.innerHTML=h;return e};
const reduit=matchMedia('(prefers-reduced-motion:reduce)').matches;
const PROPS={
  ergo:'<path d="M20 70 L20 48 L36 62 L28 63 L33 72 L29 74 L24 65 Z" fill="var(--c)"/><path d="M38 50 l5 5 9-10" fill="none" stroke="var(--c)" stroke-width="2.5"/>',
  design:'<path d="M22 66c-10 0-14-8-12-16 3-11 17-14 26-8 8 5 6 12-1 12-6 0-7 8-13 12z" fill="var(--c)"/><circle cx="16" cy="56" r="2.2" fill="#141414"/><circle cx="23" cy="50" r="2.2" fill="#141414"/><circle cx="31" cy="49" r="2.2" fill="#141414"/>',
  motion:'<rect x="10" y="48" width="34" height="22" rx="2" fill="none" stroke="var(--c)" stroke-width="2.5"/><path d="M22 53 L34 59 L22 65 Z" fill="var(--c)"/>',
  beta:'<ellipse cx="26" cy="60" rx="9" ry="11" fill="var(--c)"/><circle cx="26" cy="47" r="5" fill="var(--c)"/><path d="M17 56h-8M17 62h-8M17 68h-7M35 56h8M35 62h8M35 68h7M23 43l-4-5M29 43l4-5" stroke="var(--c)" stroke-width="2" fill="none"/>',
  cube:'<path d="M26 44 L42 53 L42 71 L26 80 L10 71 L10 53 Z" fill="none" stroke="var(--c)" stroke-width="2.5" stroke-linejoin="round"/><path d="M10 53 L26 62 L42 53 M26 62 V80" fill="none" stroke="var(--c)" stroke-width="2.5" stroke-linejoin="round"/>',
  audit:'<circle cx="23" cy="62" r="12" fill="none" stroke="var(--c)" stroke-width="3"/><path d="M32 71 L42 81" stroke="var(--c)" stroke-width="4" stroke-linecap="round"/>',
  event:'<rect x="12" y="44" width="30" height="38" rx="2" fill="none" stroke="var(--c)" stroke-width="2.5"/><rect x="21" y="41" width="12" height="6" fill="var(--c)"/><path d="M18 56l3 3 5-6M30 57h8M18 68l3 3 5-6M30 69h8" fill="none" stroke="var(--c)" stroke-width="2.2"/>',
  mail:'<rect x="10" y="52" width="34" height="24" rx="2" fill="none" stroke="var(--c)" stroke-width="2.5"/><path d="M10 54l17 13 17-13" fill="none" stroke="var(--c)" stroke-width="2.5"/>',
  bouclier:'<path d="M26 44 L42 50 V64 C42 74 35 80 26 84 C17 80 10 74 10 64 V50 Z" fill="none" stroke="var(--c)" stroke-width="2.5" stroke-linejoin="round"/><path d="M19 64l5 5 9-11" fill="none" stroke="var(--c)" stroke-width="2.5"/>',
  cible:'<circle cx="26" cy="63" r="16" fill="none" stroke="var(--c)" stroke-width="2.5"/><circle cx="26" cy="63" r="9" fill="none" stroke="var(--c)" stroke-width="2.5"/><circle cx="26" cy="63" r="3" fill="var(--c)"/>'
};
const A=[
 {r:0,col:0,prenom:"Salma",cle:"ergonome",nom:"L'ergonome",c:"#E4D49A",p:"ergo",f:1,peau:"#F1D3B3",cheveux:"#1b1612",
  moi:"Je m'assure que tout est simple à utiliser, même pour quelqu'un qui n'est pas à l'aise avec les écrans.",
  travail:["Je regarde chaque nouvel écran avant qu'il soit mis en ligne","Je repère les clics en trop et les phrases qui embrouillent","Je vérifie que tout se lit bien sur un téléphone"],
  appel:"On m'appelle avant de livrer une nouveauté visible.",t:["Je relis le parcours du devis","Trop de clics ici, je regroupe","Validé sur téléphone"]},
 {r:0,col:1,prenom:"Ayoub",cle:"designer",nom:"Le designer",c:"#D0764F",p:"design",f:0,peau:"#D9A77E",cheveux:"#141414",
  moi:"Je fais en sorte que Heavent et Nawar ne ressemblent à aucun autre site : noir, or, crème, élégant.",
  travail:["Je choisis les couleurs, les lettres et les ornements","Je refuse tout ce qui fait générique","Je garde le même style partout, du site aux publications"],
  appel:"On m'appelle juste après Salma, avant de livrer un écran.",t:["Je compare avec notre style","Cet or est trop terne","Trop banal, on refait"]},
 {r:0,col:2,prenom:"Soufiane",cle:"motion",nom:"Le motion designer",c:"#6C8BD9",p:"motion",f:0,peau:"#C68B5E",cheveux:"#2a1d14",
  moi:"Je donne vie aux écrans : une arche qui s'ouvre, un bouton qui respire, un texte qui apparaît au bon moment.",
  travail:["J'ajoute du mouvement élégant, jamais criard","Je règle la vitesse pour que ce soit agréable","Je prévois une version calme pour ceux que l'animation gêne"],
  appel:"On m'appelle avec Ayoub quand un écran paraît trop plat.",t:["Je règle l'entrée de l'arche","Plus vif sur le bouton","Version calme prévue"]},
 {r:0,col:3,prenom:"Hind",cle:"beta",nom:"La bêta-testeuse",c:"#3E9C83",p:"beta",f:1,peau:"#EBC49C",cheveux:"#3a2618",
  moi:"Je fais comme si j'étais une cliente, un membre de l'équipe ou Imane, et je cherche tout ce qui cloche. Depuis peu, je suis aussi maman 👶 (cliquez sur la porte).",
  travail:["Je remplis les formulaires comme un vrai client","Je teste sur téléphone et sur ordinateur","Je note chaque bug avant que quelqu'un d'autre le trouve"],
  appel:"On m'appelle en dernier, une fois les changements faits.",t:["Je remplis le formulaire","Chut, bébé dort à côté !","Retest : tout passe"]},
 {r:0,col:4,prenom:"Abdellah",cle:"3d",nom:"L'artiste 3D",c:"#D9A08F",p:"cube",f:0,peau:"#D2A07A",cheveux:"#1b1612",
  moi:"Je m'occupe du jeu Heavent City, où les clients imaginent leur événement dans une petite ville marocaine. Papa depuis peu, d'après la rumeur.",
  travail:["Je dessine les tables, l'arche, la piscine, les décors","Je règle la lumière du soir et les ombres","Je veille à ce que le jeu reste fluide sur un iPhone"],
  appel:"On m'appelle dès qu'on touche au jeu.",t:["Lumière du soir sur la scène","Table de 10 à l'échelle","Papa, et fier du rendu !"]},
 {r:1,col:0,prenom:"Amine",cle:"auditeur",nom:"L'auditeur",c:"#F3ECDD",p:"audit",f:0,peau:"#F1D3B3",cheveux:"#141414",
  moi:"Je passe le site au peigne fin : est-il bien trouvé sur Google, bien protégé, assez rapide ?",
  travail:["Je contrôle le référencement, la sécurité et les données","Je mesure la vitesse des pages","Je rends un rapport classé du plus urgent au moins urgent"],
  appel:"On m'appelle avant une grosse mise en ligne.",t:["Je vérifie les règles d'accès","Page lente repérée","Rapport en cours"]},
 {r:1,col:1,prenom:"Soukaina",cle:"event-manager",nom:"La manager d'événements",c:"#A8933F",p:"event",f:1,peau:"#E6BE98",cheveux:"#2a1d14",nouveau:1,
  moi:"Je pense comme une wedding planner expérimentée : les prestataires, les prix, le déroulé du jour J. Je viens d'arriver aujourd'hui.",
  travail:["Je conseille sur les prestataires à recruter et les prix","Je prépare les déroulés et les listes de contrôle","Je rédige les messages d'approche pour les partenaires"],
  appel:"On m'appelle pour toute décision de métier.",t:["Métiers à recruter en premier","Rétroplanning du jour J","Message pour les DJ"]},
 {r:1,col:2,auto:1,prenom:"Nada",cle:"relances",nom:"Relances devis",c:"#E4D49A",p:"mail",f:1,peau:"#C98F63",cheveux:"#141414",
  moi:"Chaque matin, je repère les devis restés sans réponse et je prépare les messages de relance pour Imane. Je n'envoie rien moi-même.",
  travail:["Je cherche les devis non signés depuis plus de 7 jours","Je prépare un message chaleureux, prêt à copier","Je signale les demandes restées sans réponse"],
  appel:"Je me lance toute seule chaque jour de semaine à 8 h 39.",prochain:"mardi 3 nov. à 8 h 39",dernier:"lundi 2 nov. : réussi",t:["Je lis les devis en attente","Relance prête à copier","Rien ne part sans Imane"]},
 {r:1,col:3,auto:1,prenom:"Younes",cle:"securite",nom:"Audit sécurité",c:"#3E9C83",p:"bouclier",f:0,peau:"#D9A77E",cheveux:"#1b1612",
  moi:"Une fois par mois, je vérifie que les portes du site sont bien fermées. Je note ce que je trouve, je ne touche à rien.",
  travail:["Je contrôle qui peut voir quoi dans les données","Je cherche les mots de passe oubliés dans le code","Je compare avec le mois précédent"],
  appel:"Je me lance tout seul le premier lundi du mois à 8 h 46.",prochain:"lundi 7 déc. à 8 h 46",dernier:"lundi 2 nov. : réussi",t:["Je compare avec le mois passé","Je propose, sans rien changer","Rapport publié"]},
 {r:1,col:4,auto:1,prenom:"Ilyas",cle:"prospection",nom:"Prospection",c:"#6C8BD9",p:"cible",f:0,peau:"#B87D52",cheveux:"#141414",
  moi:"Chaque lundi, je cherche 10 entreprises qui pourraient avoir besoin de Heavent, avec la raison et le lien qui le prouve.",
  travail:["Je cherche les salons, ouvertures et soirées d'entreprise annoncés","Je prépare un e-mail signé Imane pour chaque piste","Je ne reprends jamais deux fois la même entreprise"],
  appel:"Je me lance tout seul chaque lundi à 8 h 41.",prochain:"lundi 9 nov. à 8 h 41",dernier:"lundi 2 nov. : réussi",t:["Salons annoncés au Maroc","Chaque piste a sa source","E-mails signés Imane"]}
];
/* ---------- décor ---------- */
const st=document.getElementById('statique'),monde=document.getElementById('monde'),bul=document.getElementById('bulles');
for(let i=0;i<5;i++){const cx=140+i*225;st.appendChild($('path',{d:\`M\${cx-38} 108 V78 a38 38 0 0 1 76 0 V108 Z\`,fill:'url(#ciel)',stroke:'#58503f','stroke-width':3}));st.appendChild($('path',{d:\`M\${cx} 40 V108\`,stroke:'#2d271c','stroke-width':3}))}
st.appendChild($('text',{x:600,y:54,'text-anchor':'middle',fill:'#A8933F','font-family':'Gloock,Georgia,serif','font-size':13,'letter-spacing':6},'HEAVENT PEOPLE AGENCY'));
st.appendChild($('rect',{x:500,y:395,width:690,height:240,fill:'#3E9C83',opacity:.07}));
st.appendChild($('rect',{x:496,y:395,width:5,height:240,fill:'#6b6354'}));
st.appendChild($('text',{x:520,y:622,fill:'#BDB29C','font-family':'Jost,sans-serif','font-size':13,'font-weight':500,'letter-spacing':4},'DE GARDE · SE LANCENT SEULS'));
st.appendChild($('text',{x:60,y:622,fill:'#BDB29C','font-family':'Jost,sans-serif','font-size':13,'font-weight':500,'letter-spacing':4},'SUR DEMANDE'));
// porte
st.appendChild($('rect',{x:540,y:768,width:120,height:8,fill:'#0e0d0b'}));
st.appendChild($('text',{x:600,y:762,'text-anchor':'middle',fill:'#58503f','font-family':'Jost,sans-serif','font-size':11,'letter-spacing':3},'SORTIE'));
const porte=$('g',{id:'porte',tabindex:0,role:'button','aria-label':'Porte de sortie : cliquer pour ouvrir la crèche','aria-expanded':'false',style:'cursor:pointer'});
porte.appendChild($('rect',{x:530,y:732,width:140,height:46,fill:'transparent'}));
st.appendChild(porte);
const creche=$('g',{id:'creche',class:'creche','aria-hidden':'true'},\`
 <rect x="690" y="690" width="190" height="86" fill="#1d1812" stroke="#A8933F" stroke-width="2"/>
 <path d="M690 690 L785 668 L880 690" fill="#2a2418" stroke="#A8933F" stroke-width="2" stroke-linejoin="round"/>
 <text x="785" y="688" text-anchor="middle" font-family="Gloock,Georgia,serif" font-size="12" letter-spacing="3" fill="#E4D49A">CRÈCHE</text>
 <path d="M720 700 V712 M720 712 l-8 12 h16z" stroke="#E4D49A" stroke-width="1.4" fill="none"/>
 <path d="M742 700 V708" stroke="#E4D49A" stroke-width="1.4"/><path d="M742 708 l3 6 6 2 -5 4 1 6 -5 -3 -5 3 1 -6 -5 -4 6 -2z" fill="#E4D49A" transform="translate(0 -4) scale(.9) translate(-13 2)"/>
 <rect x="740" y="738" width="104" height="30" rx="3" fill="#6b4a2c"/>
 <rect x="744" y="728" width="96" height="14" rx="6" fill="#F3ECDD"/>
 <circle cx="770" cy="727" r="11" fill="#E6BE98"/><path d="M760 723 a11 11 0 0 1 20 0 c-5 -4 -15 -4 -20 0z" fill="#2a1d14"/>
 <path d="M765 728 q2 2 4 0 M772 728 q2 2 4 0" stroke="#141414" stroke-width="1.2" fill="none"/>
 <path d="M780 740 h40 v12 h-40z" fill="#3E9C83"/>
 <path d="M740 738 V768 M758 738 V768 M776 738 V768 M794 738 V768 M812 738 V768 M830 738 V768 M844 738 V768" stroke="#8a6a34" stroke-width="2"/>
 <text x="896" y="716" font-family="Jost,sans-serif" font-size="12" font-weight="500" fill="#F3ECDD">Malcom, bébé de Hind et d'Abdellah</text><text x="896" y="734" font-family="Jost,sans-serif" font-size="11" fill="#BDB29C">Premier mot : « bug »</text><text x="896" y="750" font-family="Jost,sans-serif" font-size="11" fill="#BDB29C">Il s'appelle Malcom</text>
 <text class="zzz" x="800" y="716" font-family="Gloock,Georgia,serif" font-size="13" fill="#BDB29C">z z z</text>\`);
st.appendChild(creche);
let crecheOuverte=false;
function basculerCreche(){
  crecheOuverte=!crecheOuverte;creche.classList.toggle('on',crecheOuverte);porte.setAttribute('aria-expanded',crecheOuverte);
  if(crecheOuverte){
    const hind=AG.find(g=>g.a.prenom==='Hind'),ab=AG.find(g=>g.a.prenom==='Abdellah');
    if(hind)dit(hind,'Chut… Malcom dort !',3.4);if(ab)setTimeout(()=>dit(ab,'Malcom a mes yeux, non ?',3.4),1800);
  }
}
porte.addEventListener('click',basculerCreche);
porte.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();basculerCreche()}});
// coin café, imprimante, tableau, plantes
st.appendChild($('g',{},\`<rect x="44" y="706" width="54" height="52" rx="3" fill="#2a2418" stroke="#58503f" stroke-width="2"/><rect x="54" y="716" width="34" height="14" fill="#141414"/><circle cx="71" cy="744" r="5" fill="#9C4A2C"/><text x="71" y="700" text-anchor="middle" font-size="11" fill="#BDB29C" font-family="Jost,sans-serif">CAFÉ</text>\`));
st.appendChild($('g',{},\`<rect x="1100" y="716" width="60" height="38" rx="3" fill="#2a2418" stroke="#58503f" stroke-width="2"/><rect x="1110" y="706" width="40" height="10" fill="#F3ECDD"/><text x="1130" y="770" text-anchor="middle" font-size="11" fill="#BDB29C" font-family="Jost,sans-serif">IMPRIMANTE</text>\`));
st.appendChild($('g',{},\`<rect x="1174" y="270" width="14" height="130" fill="#F3ECDD"/><path d="M1177 290l8 6-8 8 8 8M1177 340h8M1177 360l8 4" stroke="#A8933F" stroke-width="1.5" fill="none"/><text x="1160" y="418" text-anchor="end" font-size="11" fill="#BDB29C" font-family="Jost,sans-serif">TABLEAU</text>\`));
[[48,150],[1152,150]].forEach(([x,y])=>st.appendChild($('g',{},\`<path d="M\${x-14} \${y} h28 l-4 30 h-20z" fill="#6b4a2c"/><ellipse cx="\${x-10}" cy="\${y-10}" rx="8" ry="22" fill="#2f6b57" transform="rotate(-16 \${x-10} \${y})"/><ellipse cx="\${x}" cy="\${y-18}" rx="8" ry="26" fill="#3a7c66"/><ellipse cx="\${x+10}" cy="\${y-10}" rx="8" ry="22" fill="#2f6b57" transform="rotate(16 \${x+10} \${y})"/>\`)));
/* ---------- graphe de déplacement ---------- */
const G=[252,477,702,927],AI=335,BI=650;
const N={};const add=(id,x,y)=>N[id]={id,x,y,adj:[]};
add('aL',40,AI);G.forEach((x,i)=>add('a'+i,x,AI));add('aR',1160,AI);
add('bL',40,BI);add('b0',G[0],BI);add('b1',G[1],BI);add('door',600,BI);add('b2',G[2],BI);add('b3',G[3],BI);add('bR',1160,BI);
const lien=(a,b)=>{N[a].adj.push(b);N[b].adj.push(a)};
['aL','a0','a1','a2','a3','aR'].reduce((p,c)=>(lien(p,c),c));
['bL','b0','b1','door','b2','b3','bR'].reduce((p,c)=>(lien(p,c),c));
[['aL','bL'],['a0','b0'],['a1','b1'],['a2','b2'],['a3','b3'],['aR','bR']].forEach(([a,b])=>lien(a,b));
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
function route(from,to){ // Dijkstra, renvoie les points sans le départ
  const d={},pr={},q=new Set(Object.keys(N));Object.keys(N).forEach(k=>d[k]=1e9);d[from]=0;
  while(q.size){let u=null;q.forEach(k=>{if(u===null||d[k]<d[u])u=k});q.delete(u);if(u===to)break;
    N[u].adj.forEach(v=>{const nd=d[u]+dist(N[u],N[v]);if(nd<d[v]){d[v]=nd;pr[v]=u}})}
  const out=[];let c=to;while(c!==from&&c){out.unshift({x:N[c].x,y:N[c].y});c=pr[c]}return out}
/* ---------- agents ---------- */
const COL=i=>140+i*225;
const AG=[];
function figure(a){
  const longs=a.f?\`<path d="M-15 -62 a15 15 0 0 1 30 0 V-30 h-30z" fill="\${a.cheveux}"/>\`:'';
  return \`<ellipse cx="0" cy="2" rx="17" ry="5" fill="#000" opacity=".35"/>
  <rect class="l1" x="-9" y="-15" width="6" height="15" rx="2" fill="#2b2316"/><rect class="l2" x="3" y="-15" width="6" height="15" rx="2" fill="#2b2316"/>
  \${longs}
  <path d="M-17 -15 V-38 a17 17 0 0 1 34 0 V-15 Z" fill="\${a.c}"/>
  <path d="M-5 -52 l5 7 5 -7" fill="none" stroke="#141414" stroke-width="2" opacity=".4"/>
  <circle class="h1" cx="-19" cy="-26" r="4.5" fill="\${a.peau}"/><circle class="h2" cx="19" cy="-26" r="4.5" fill="\${a.peau}"/>
  <circle cx="0" cy="-68" r="13" fill="\${a.peau}"/>
  <path d="M-13 -70 a13 13 0 0 1 26 0 c-5 -5 -21 -5 -26 0z" fill="\${a.cheveux}"/>
  <g class="yeux"><circle cx="-4.5" cy="-67" r="1.8" fill="#141414"/><circle cx="4.5" cy="-67" r="1.8" fill="#141414"/></g>
  <path d="M-3.5 -61 q3.5 3.5 7 0" fill="none" stroke="#141414" stroke-width="1.6"/>\`;
}
A.forEach((a,i)=>{
  const cx=COL(a.col),seatY=a.r?515:215,lane=a.r?440:135,gi=Math.min(a.col,3),xg=G[gi];
  const ag={a,i,cx,seatY,lane,gi,xg,x:cx,y:seatY,mode:'sit',q:[],wait:0,dir:1,ph:Math.random()*6,timer:2+Math.random()*7+i*.6,node:'a'+gi,bub:'',bubT:0,talk:false,vis:true};
  ag.exit=a.r?[{x:cx,y:lane},{x:xg,y:lane},{x:xg,y:AI}]:[{x:cx,y:lane},{x:xg,y:lane},{x:xg,y:AI}];
  // siège + bureau
  st.appendChild($('rect',{x:cx-20,y:seatY-32,width:40,height:36,rx:12,fill:'#2a2418'}));
  const d=$('g',{style:\`--c:\${a.c}\`});
  const top=a.r?470:170;
  d.innerHTML=\`<rect x="\${cx-75}" y="\${top}" width="150" height="70" fill="#4f3f2a"/><rect x="\${cx-75}" y="\${top+52}" width="150" height="18" fill="#3a2e1d"/>
   <rect x="\${cx+22}" y="\${top+6}" width="52" height="32" rx="3" fill="#26231c" stroke="#58503f" stroke-width="2"/>
   <path d="M\${cx+48} \${top+12} l3 6 6 3 -6 3 -3 6 -3 -6 -6 -3 6 -3z" fill="\${a.c}"/>
   <rect x="\${cx-36}" y="\${top+40}" width="44" height="9" rx="2" fill="#58503f"/>
   <g transform="translate(\${cx-76} \${top-24}) scale(.62)"><g style="--c:\${a.c}">\${PROPS[a.p]}</g></g>
   <text x="\${cx}" y="\${top+65}" text-anchor="middle" font-family="Gloock,Georgia,serif" font-size="12" fill="#F3ECDD">\${a.prenom}</text>\${a.nouveau?\`<rect x="\${cx-75}" y="\${top+8}" width="50" height="13" fill="#A8933F"/><text x="\${cx-50}" y="\${top+18}" text-anchor="middle" font-size="9" font-weight="500" letter-spacing="1" fill="#141414" font-family="Jost,sans-serif">NOUVEAU</text>\`:''}"
   <circle class="mn1" cx="\${cx-24}" cy="\${top+38}" r="4.5" fill="\${a.peau}"/><circle class="mn2" cx="\${cx-6}" cy="\${top+38}" r="4.5" fill="\${a.peau}"/>\`;
  ag.desk=d;ag.deskKey=top+70;ag.mn1=d.querySelector('.mn1');ag.mn2=d.querySelector('.mn2');
  // personnage
  const g=$('g',{class:'agent',tabindex:0,role:'button','aria-label':\`\${a.prenom}, \${a.nom}\`});
  g.innerHTML=\`<circle class="anneau" cx="0" cy="-2" r="26" fill="none" stroke="\${a.c}" stroke-width="3" style="display:none"/>
   <g class="corps">\${figure(a)}</g>
   <rect x="-26" y="-88" width="52" height="92" fill="transparent"/>
   <text class="nom-tag" y="-90">\${a.prenom}</text>
\`;
  ag.g=g;ag.l1=g.querySelector('.l1');ag.l2=g.querySelector('.l2');ag.h2=g.querySelector('.h2');ag.h1=g.querySelector('.h1');ag.yeux=g.querySelector('.yeux');ag.ring=g.querySelector('.anneau');ag.corps=g.querySelector('.corps');
  g.addEventListener('click',()=>choisir(i));
  g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choisir(i)}});
  // bulle
  const b=$('g',{style:'opacity:0;transition:opacity .35s;pointer-events:none'});
  b.innerHTML='<rect rx="5" fill="#F3ECDD"/><path fill="#F3ECDD"/><text class="bulle-t" y="-1"></text>';
  bul.appendChild(b);ag.b=b;ag.bR=b.querySelector('rect');ag.bP=b.querySelector('path');ag.bT=b.querySelector('text');
  AG.push(ag);
});
const items=[];
AG.forEach(ag=>{items.push({el:ag.desk,key:()=>ag.deskKey});items.push({el:ag.g,key:()=>ag.y+(ag.mode==='sit'||ag.mode==='talkseat'?0:.1)})});
/* ---------- bulles ---------- */
function dit(ag,txt,sec){ag.bub=txt;ag.bubT=sec;ag.bT.textContent=txt;const w=Math.max(56,txt.length*6.7+22);ag.bw=w;
  ag.bR.setAttribute('x',-w/2);ag.bR.setAttribute('y',-17);ag.bR.setAttribute('width',w);ag.bR.setAttribute('height',26);ag.bP.setAttribute('d','M-6 9 h12 l-6 9z');ag.b.style.opacity=1}
/* ---------- actions ---------- */
function pt(n){return {x:N[n].x,y:N[n].y}}
function planifier(ag,cible){
  const q=[],leave=ag.exit;
  const atSeat=ag.mode==='sit';
  if(atSeat)leave.forEach(p=>q.push({...p}));
  const cur=ag.node;
  const r=route(cur,cible.node);r.forEach(p=>q.push(p));
  (cible.tail||[]).forEach(p=>q.push({...p}));
  q.push({wait:cible.wait,bubble:cible.bubble,face:cible.face,friend:cible.friend,msg:cible.msg});
  const tail=cible.tail||[];
  tail.slice(0,-1).reverse().forEach(p=>q.push({...p}));
  if(tail.length)q.push(pt(cible.node));
  route(cible.node,cur).forEach(p=>q.push(p));
  // retour à la place
  const ex=ag.exit;q.push({x:ex[1].x,y:ex[1].y});q.push({x:ex[0].x,y:ex[0].y});q.push({x:ag.cx,y:ag.seatY});q.push({sit:1});
  ag.q=q;ag.mode='walk';
}
function actionAuHasard(ag){
  if(ag.travaille){ag.timer=4;return}
  const r=Math.random(),L=AG.filter(o=>o!==ag&&o.mode==='sit'&&!o.talk);
  if(reduit||AG.filter(o=>o.mode==='walk'||o.mode==='stay').length>=3){ag.timer=3+Math.random()*3;return}
  if(r<.22)return planifier(ag,{node:'bL',tail:[{x:72,y:712}],wait:3.5,bubble:'Pause café',face:-1});
  if(r<.32)return planifier(ag,{node:'bR',tail:[{x:1128,y:704}],wait:3,bubble:"J'imprime le rapport",face:1});
  if(r<.5)return planifier(ag,{node:'aR',tail:[],wait:4,bubble:'Je note les idées',face:1});
  if(r<.58)return planifier(ag,{node:'door',tail:[{x:600,y:760},{x:600,y:840}],wait:6,bubble:'',face:1});
  if(L.length&&r<.95){const f=L[Math.floor(Math.random()*L.length)];
    return planifier(ag,{node:'a'+f.gi,tail:[{x:f.xg,y:f.lane}],wait:3.6,bubble:ag.a.t[Math.floor(Math.random()*3)],face:Math.sign(f.cx-f.xg)||1,friend:f,msg:'Bonne idée !'})}
  ag.timer=5;dit(ag,ag.a.t[Math.floor(Math.random()*3)],3);
}
function choisir(i){
  const ag=AG[i];
  AG.forEach(o=>{if(o.talk&&o!==ag)lacher(o)});
  ag.talk=true;ag.mode=ag.mode==='sit'?'talkseat':'talk';ag.q=[];if(ag.y>760){ag.y=700;ag.x=600}ag.dir=0;
  ag.ring.style.display='';dit(ag,\`Bonjour ! Moi c'est \${ag.a.prenom}.\`,999);
  montrer(ag);
}
function lacher(ag){
  ag.talk=false;ag.ring.style.display='none';ag.bubT=0;ag.b.style.opacity=0;
  if(ag.mode==='talkseat'){ag.mode='sit';ag.timer=3;return}
  // revenir à la place en passant par le nœud le plus proche
  let best=null,bd=1e9;Object.values(N).forEach(n=>{const d=Math.hypot(n.x-ag.x,n.y-ag.y);if(d<bd){bd=d;best=n}});
  const q=[{x:best.x,y:best.y}];route(best.id,ag.node).forEach(p=>q.push(p));
  const ex=ag.exit;q.push({x:ex[1].x,y:ex[1].y});q.push({x:ex[0].x,y:ex[0].y});q.push({x:ag.cx,y:ag.seatY});q.push({sit:1});
  ag.q=q;ag.mode='walk';
}
/* ---------- fiche + liste ---------- */
const fiche=document.getElementById('fiche'),puces=document.getElementById('puces');
A.forEach((a,i)=>{const li=document.createElement('li');li.innerHTML=\`<button type="button" aria-pressed="false" style="--c:\${a.c}"><i></i>\${a.prenom} · \${a.nom}</button>\`;li.firstChild.addEventListener('click',()=>choisir(i));puces.appendChild(li)});
function portrait(a){return \`<svg viewBox="-30 -96 60 110" width="100%" aria-hidden="true">\${figure(a).replace(/class="l[12]"/g,'')}</svg>\`}
function montrer(ag){
  const a=ag.a;[...puces.querySelectorAll('button')].forEach((b,k)=>b.setAttribute('aria-pressed',k===ag.i));
  fiche.hidden=false;fiche.style.setProperty('--c',a.c);
  fiche.innerHTML=\`<button class="fermer" type="button" id="fermer">Fermer</button><div class="photo">\${portrait(a)}</div><div><h2>\${a.prenom}</h2><p class="titre">\${a.nom}</p><p>\${a.moi}</p><ul>\${a.travail.map(t=>\`<li>\${t}</li>\`).join('')}</ul><p class="petit">\${a.appel}\${a.auto?\` Prochain passage : \${a.prochain}.\`:''}\${derniere(ag)}</p></div>\`;
  document.getElementById('fermer').addEventListener('click',()=>{lacher(ag);fiche.hidden=true;[...puces.querySelectorAll('button')].forEach(b=>b.setAttribute('aria-pressed','false'))});
}

/* ---------- données en direct (envoyées par la page parente) ---------- */
const FMT=new Intl.DateTimeFormat('fr-FR',{timeZone:'Africa/Casablanca',weekday:'short',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'});
const quand=d=>FMT.format(new Date(d));
const NOMS_ETAT={en_cours:'en cours',termine:'terminé',erreur:'erreur',prevu:'prévu'};
let JOURNAL=[];
const parCle=cle=>JOURNAL.filter(r=>r.agent===cle).sort((a,b)=>new Date(b.cree_le)-new Date(a.cree_le));
function derniere(ag){const r=parCle(ag.a.cle)[0];return r?\` Dernière activité (heure du Maroc) : \${quand(r.cree_le)}, \${r.action} (\${NOMS_ETAT[r.statut]||r.statut}).\`:' Aucune activité enregistrée pour l\\'instant.'}
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function majLive(){
  const maintenant=Date.now();
  AG.forEach(ag=>{const r=parCle(ag.a.cle)[0];const etaitEn=ag.travaille;
    ag.travaille=!!(r&&r.statut==='en_cours'&&maintenant-new Date(r.cree_le)<45*60e3);
    if(ag.travaille&&!etaitEn&&ag.bubT<=0)dit(ag,r.action.length>34?r.action.slice(0,32)+'…':r.action,5)});
  const nb=document.getElementById('feed');
  const rows=[...JOURNAL].sort((a,b)=>new Date(b.cree_le)-new Date(a.cree_le)).slice(0,14);
  if(!rows.length){nb.innerHTML='<li class="vide">Aucune activité enregistrée pour l\\'instant.</li>';return}
  nb.innerHTML=rows.map(r=>{const ag=AG.find(g=>g.a.cle===r.agent);const nom=ag?ag.a.prenom:(r.agent==='instagram'?'Instagram':r.agent);const col=ag?ag.a.c:'#E4D49A';
    return \`<li style="--c:\${col}"><time datetime="\${esc(r.cree_le)}">\${esc(quand(r.cree_le))}</time><b>\${esc(nom)}</b><span>\${esc(r.action)}<span class="etat \${esc(r.statut)}">\${esc(NOMS_ETAT[r.statut]||r.statut)}</span></span></li>\`}).join('');
}
window.addEventListener('message',e=>{if(e.origin!==location.origin||!e.data||e.data.type!=='journal'||!Array.isArray(e.data.rows))return;JOURNAL=e.data.rows;majLive()});
parent.postMessage({type:'pret'},location.origin);
/* ---------- boucle ---------- */
let pause=false,last=performance.now(),ordre='',t0=performance.now();
function frame(now){
  requestAnimationFrame(frame);
  let dt=Math.min(.05,(now-last)/1000);last=now;if(pause||document.hidden)return;
  const T=(now-t0)/1000;
  AG.forEach(ag=>{
    const a=ag.a;
    if(ag.bubT>0&&ag.bubT<900){ag.bubT-=dt;if(ag.bubT<=0){ag.b.style.opacity=0}}
    if(ag.mode==='sit'){
      ag.timer-=dt;ag.x=ag.cx;ag.y=ag.seatY;
      if(ag.timer<=0){ag.timer=4+Math.random()*8;if(!AG.some(o=>o.mode==='walk'&&o.q.length&&false))actionAuHasard(ag)}
      if(ag.bubT<=0&&Math.random()<dt*.05&&!AG.some(o=>o.bubT>0&&o.bubT<900))dit(ag,a.t[Math.floor(Math.random()*3)],3.4);
    }else if(ag.mode==='walk'){
      let s=70*dt;
      while(ag.q.length&&s>0){
        const n=ag.q[0];
        if(n.sit){ag.q.shift();ag.mode='sit';ag.timer=4+Math.random()*8;ag.dir=1;break}
        if(n.wait!==undefined){ag.q.shift();ag.mode='stay';ag.wait=n.wait;ag.dir=n.face||1;
          if(n.bubble)dit(ag,n.bubble,Math.min(3.2,n.wait));
          if(n.friend){const f=n.friend;if(f.mode==='sit'&&!f.talk)setTimeout(()=>dit(f,n.msg,2.4),1300)}
          break}
        const dx=n.x-ag.x,dy=n.y-ag.y,d=Math.hypot(dx,dy);
        if(Math.abs(dx)>.5)ag.dir=Math.sign(dx);
        if(d<=s){ag.x=n.x;ag.y=n.y;s-=d;ag.q.shift();ag.ph+=d*.14}else{ag.x+=dx/d*s;ag.y+=dy/d*s;ag.ph+=s*.14;s=0}
      }
    }else if(ag.mode==='stay'){ag.wait-=dt;if(ag.wait<=0){ag.mode='walk'}}
    // dessin
    const moving=ag.mode==='walk'&&ag.q.length;
    const sw=moving?Math.sin(ag.ph*2)*4:0;
    ag.l1.setAttribute('transform',\`translate(0 \${-Math.abs(sw)*.2}) rotate(\${sw*2.4} -6 -15)\`);
    ag.l2.setAttribute('transform',\`translate(0 \${-Math.abs(sw)*.2}) rotate(\${-sw*2.4} 6 -15)\`);
    const rebond=moving?Math.abs(Math.sin(ag.ph*2))*-2.2:Math.sin(T*2+ag.i)*.6;
    const parle=ag.talk;
    ag.corps.setAttribute('transform',\`translate(0 \${rebond})\`);
    ag.yeux.setAttribute('transform',\`translate(\${ag.dir*2.2} 0)\`);
    ag.h2.setAttribute('transform',parle?\`translate(3 \${-18+Math.sin(T*9)*5})\`:\`translate(0 \${moving?sw*.6:0})\`);
    ag.h1.setAttribute('transform',\`translate(0 \${moving?-sw*.6:0})\`);
    const seated=(ag.mode==='sit'||ag.mode==='talkseat');
    ag.g.setAttribute('transform',\`translate(\${ag.x.toFixed(1)} \${ag.y.toFixed(1)})\`);
    ag.g.style.display=ag.y>800?'none':'';
    ag.mn1.style.display=ag.mn2.style.display=(ag.mode==='sit')?'':'none';
    if(ag.mode==='sit'){const k=ag.a.auto?16:10;ag.mn1.setAttribute('cy',(ag.deskKey-32)+Math.sin(T*k+ag.i)*2);ag.mn2.setAttribute('cy',(ag.deskKey-32)+Math.cos(T*k+ag.i)*2)}
    // bulle position
    ag.b.setAttribute('transform',\`translate(\${Math.min(1130,Math.max(70,ag.x))} \${Math.max(30,ag.y-125)})\`);
    ag.h1.style.display='';
    ag.ring.style.display=(ag.talk||ag.travaille)?'':'none';
  });
  // ordre de profondeur
  const tri=items.map(o=>({o,k:o.key()})).sort((a,b)=>a.k-b.k);const sig=tri.map(x=>items.indexOf(x.o)).join(',');
  if(sig!==ordre){ordre=sig;tri.forEach(x=>monde.appendChild(x.o.el))}
}
AG.forEach(ag=>{ag.g.setAttribute('transform',\`translate(\${ag.x} \${ag.y})\`)});
requestAnimationFrame(frame);
document.getElementById('calme').addEventListener('click',e=>{pause=!pause;e.target.textContent=pause?'Relancer':'Mettre en pause'});
(function(){const e=document.getElementById('compte');if(reduit)return;let n=0;e.textContent='0';const t=setInterval(()=>{n++;e.textContent=n;if(n>=10)clearInterval(t)},70)})();
<\/script>
`;function C(){const[o,f]=i.useState("attente"),d=i.useRef(null),p=i.useRef([]);return i.useEffect(()=>{let r=!0;return g.auth.getSession().then(async({data:s})=>{const l=s.session?await v():!1;r&&f(l?"oui":"non")}),()=>{r=!1}},[]),i.useEffect(()=>{if(o!=="oui")return;const r=()=>{var n,a;return(a=(n=d.current)==null?void 0:n.contentWindow)==null?void 0:a.postMessage({type:"journal",rows:p.current},window.location.origin)},s=async()=>{const n=g,a=new Date(Date.now()-36*36e5).toISOString(),h=new Date(Date.now()+48*36e5).toISOString(),[m,x]=await Promise.all([n.from("journal_agents").select("agent,action,statut,cree_le").order("cree_le",{ascending:!1}).limit(80),n.from("posts_instagram").select("titre,compte,statut,date_prevue,publie_le").gte("date_prevue",a).lte("date_prevue",h).order("date_prevue",{ascending:!1}).limit(20)]),b=(x.data??[]).map(e=>({agent:"instagram",action:`${e.compte==="nawar"?"Nawar":"Heavent"} : ${e.titre??"publication"}`,statut:e.statut==="publie"?"termine":e.statut==="erreur"?"erreur":"prevu",cree_le:e.publie_le??e.date_prevue})).filter(e=>e.statut!=="prevu"||new Date(e.cree_le).getTime()>Date.now());p.current=[...m.data??[],...b],r()};s();const l=setInterval(s,15e3),u=n=>{var a;n.origin===window.location.origin&&((a=n.data)==null?void 0:a.type)==="pret"&&r()};return window.addEventListener("message",u),()=>{clearInterval(l),window.removeEventListener("message",u)}},[o]),o==="attente"?t.jsx(c,{noindex:!0}):o==="non"?t.jsxs(t.Fragment,{children:[t.jsx(c,{noindex:!0}),t.jsx(y,{})]}):t.jsxs(t.Fragment,{children:[t.jsx(c,{noindex:!0}),t.jsx("iframe",{ref:d,title:"Bureau des agents Heavent",srcDoc:w,style:{position:"fixed",inset:0,zIndex:9999,width:"100%",height:"100%",border:0,background:"#141414"}})]})}export{C as default};
