import { strToU8, zipSync } from "fflate";

export interface InviteLivre { nom: string; mot: string | null; photos: Blob[] }
export interface EntreeLivre { noms: string; dateTexte: string; lieu?: string | null; invites: InviteLivre[] }
export interface LivrePret { zip: Blob; nbPhotos: number; nbInvites: number; tailleMo: number }

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
const nomFichier = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 30) || "invite";

const versDataUrl = (b: Blob) => new Promise<string>((ok, ko) => { const r = new FileReader(); r.onload = () => ok(String(r.result)); r.onerror = () => ko(new Error("lecture")); r.readAsDataURL(b); });

async function reduire(b: Blob, cote: number, qualite: number): Promise<Blob> {
  const url = URL.createObjectURL(b);
  try {
    const img = await new Promise<HTMLImageElement>((ok, ko) => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => ko(new Error("image")); i.src = url; });
    const k = Math.min(1, cote / Math.max(img.naturalWidth, img.naturalHeight));
    const c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(img.naturalWidth * k)); c.height = Math.max(1, Math.round(img.naturalHeight * k));
    c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
    const r = await new Promise<Blob | null>((ok) => c.toBlob(ok, "image/jpeg", qualite));
    return r ?? b;
  } finally { URL.revokeObjectURL(url); }
}

async function police(chemin: string): Promise<string> {
  try { const r = await fetch(chemin); if (!r.ok) return ""; return await versDataUrl(await r.blob()); } catch { return ""; }
}

const CSS = (g: string, j3: string, j4: string, j5: string) => `
@font-face{font-family:'Gloock';src:url(${g}) format('woff2');font-display:swap}
@font-face{font-family:'Jost';font-weight:300;src:url(${j3}) format('woff2');font-display:swap}
@font-face{font-family:'Jost';font-weight:400;src:url(${j4}) format('woff2');font-display:swap}
@font-face{font-family:'Jost';font-weight:500;src:url(${j5}) format('woff2');font-display:swap}
:root{--noir:#141414;--or:#E4D49A;--or-fonce:#A8933F;--creme:#FBF6E9;--texte:#2A2420}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;background:var(--creme);color:var(--texte);font-family:'Jost',system-ui,sans-serif;font-weight:400;line-height:1.55}
.titre{font-family:'Gloock','Didot',Georgia,serif;font-weight:400}
.couv{min-height:100vh;min-height:100dvh;background:radial-gradient(70% 45% at 50% 40%,#2a251a,var(--noir) 72%);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px 24px}
.couv small{letter-spacing:.32em;text-transform:uppercase;font-size:12px;color:var(--or)}
.couv h1{font-size:clamp(46px,11vw,96px);line-height:1.05;margin:22px 0 14px;color:var(--or)}
.couv p{margin:0;font-weight:300;font-size:17px;opacity:.9}
.filet{width:62%;max-width:260px;height:1px;background:linear-gradient(90deg,transparent,var(--or-fonce),transparent);margin:26px auto}
.couv a{margin-top:42px;color:var(--or);text-decoration:none;letter-spacing:.2em;text-transform:uppercase;font-size:12px;border:1px solid var(--or-fonce);padding:14px 26px}
main{max-width:1100px;margin:0 auto;padding:56px 18px 80px}
.intro{text-align:center;max-width:560px;margin:0 auto 56px}
.intro h2{font-size:28px;margin:0 0 10px}
section.invite{margin:0 0 64px}
section.invite h3{font-size:26px;margin:0 0 6px}
blockquote{margin:6px 0 18px;padding:2px 0 2px 16px;border-left:2px solid var(--or-fonce);font-style:italic;color:#4A4238;max-width:620px}
.grille{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}
.grille button{padding:0;border:0;background:#EADFC8;aspect-ratio:1;overflow:hidden;cursor:zoom-in;display:block}
.grille img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s}
.grille button:hover img,.grille button:focus-visible img{transform:scale(1.04)}
.grille button:focus-visible{outline:2px solid var(--or-fonce);outline-offset:2px}
footer{text-align:center;padding:40px 20px 60px;color:#6B6155;font-size:13px;letter-spacing:.12em;text-transform:uppercase}
#vue{position:fixed;inset:0;background:rgba(10,10,10,.96);display:none;align-items:center;justify-content:center;z-index:10;touch-action:pan-y}
#vue.ouvert{display:flex}
#vue img{max-width:94vw;max-height:84vh;object-fit:contain}
#vue .barre{position:absolute;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 16px;color:#fff;font-size:14px;background:linear-gradient(transparent,rgba(0,0,0,.7))}
#vue button,#vue a{background:rgba(255,255,255,.12);color:#fff;border:0;min-width:48px;min-height:48px;font-size:22px;cursor:pointer;text-decoration:none;display:grid;place-items:center;padding:0 14px;font-family:inherit}
#vue .prec{position:absolute;left:8px;top:50%;transform:translateY(-50%)}#vue .suiv{position:absolute;right:8px;top:50%;transform:translateY(-50%)}
#vue .ferme{position:absolute;right:8px;top:8px}
#vue a{font-size:13px;letter-spacing:.1em;text-transform:uppercase}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.grille img{transition:none}}
@media print{.couv{min-height:auto;padding:60px 24px}#vue{display:none!important}}
`;

const JS = `
(function(){
var imgs=[].slice.call(document.querySelectorAll('.grille img')),vue=document.getElementById('vue'),im=vue.querySelector('img'),cpt=vue.querySelector('.cpt'),dl=vue.querySelector('.tele'),i=0;
function aff(){var s=imgs[i];im.src=s.src;im.alt=s.alt;cpt.textContent=(i+1)+' / '+imgs.length+' · '+s.alt;dl.href=s.src;dl.setAttribute('download','souvenir-'+(i+1)+'.jpg');}
function ouvrir(n){i=n;aff();vue.classList.add('ouvert');document.body.style.overflow='hidden';vue.querySelector('.ferme').focus();}
function fermer(){vue.classList.remove('ouvert');document.body.style.overflow='';}
function va(d){i=(i+d+imgs.length)%imgs.length;aff();}
imgs.forEach(function(s,n){s.parentNode.addEventListener('click',function(){ouvrir(n);});});
vue.querySelector('.ferme').onclick=fermer;vue.querySelector('.prec').onclick=function(){va(-1)};vue.querySelector('.suiv').onclick=function(){va(1)};
vue.addEventListener('click',function(e){if(e.target===vue)fermer();});
document.addEventListener('keydown',function(e){if(!vue.classList.contains('ouvert'))return;if(e.key==='Escape')fermer();if(e.key==='ArrowLeft')va(-1);if(e.key==='ArrowRight')va(1);});
var x0=null;vue.addEventListener('touchstart',function(e){x0=e.touches[0].clientX;},{passive:true});
vue.addEventListener('touchend',function(e){if(x0===null)return;var d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>50)va(d<0?1:-1);x0=null;});
})();
`;

/** Fabrique le livre souvenir : un fichier HTML autonome (lisible hors ligne) + les photos, dans un ZIP. */
export async function construireLivre(e: EntreeLivre, progres?: (m: string) => void): Promise<LivrePret> {
  const invites = e.invites.filter((i) => i.photos.length || i.mot);
  const nbPhotos = invites.reduce((s, i) => s + i.photos.length, 0);
  progres?.("Préparation des polices…");
  const [g, j3, j4, j5] = await Promise.all(["gloock-latin-400-normal", "jost-latin-300-normal", "jost-latin-400-normal", "jost-latin-500-normal"].map((n) => police(`/polices/${n}.woff2`)));

  // le ZIP contient le livre (photos en base64) ET les photos : on choisit la taille de photo pour rester sous ≈ 45 Mo (limite d'envoi 50 Mo)
  const niveaux: [number, number, number][] = [[1600, 0.8, 350], [1200, 0.72, 170], [1000, 0.65, 110], [800, 0.6, 70], [640, 0.55, 45], [520, 0.5, 30]];
  const [cote, qualite] = (niveaux.find(([, , ko]) => (nbPhotos * ko * 2.4) / 1024 <= 45) ?? niveaux[niveaux.length - 1]).slice(0, 2) as [number, number];
  const dans: { nom: string; urls: string[] }[] = [];
  const fichiers: Record<string, Uint8Array> = {};
  let n = 0;
  for (const inv of invites) {
    const urls: string[] = [];
    let k = 0;
    for (const p of inv.photos) {
      n++; k++;
      progres?.(`Photos ${n}/${nbPhotos}…`);
      const petite = await reduire(p, cote, qualite);
      urls.push(await versDataUrl(petite));
      fichiers[`photos/${String(n).padStart(3, "0")}-${nomFichier(inv.nom)}-${k}.jpg`] = new Uint8Array(await petite.arrayBuffer());
    }
    dans.push({ nom: inv.nom, urls });
  }

  progres?.("Assemblage du livre…");
  const bloc = invites.map((inv, idx) => `
<section class="invite"><h3 class="titre">${esc(inv.nom)}</h3>${inv.mot ? `<blockquote>« ${esc(inv.mot)} »</blockquote>` : ""}
${dans[idx].urls.length ? `<div class="grille">${dans[idx].urls.map((u, k) => `<button type="button" aria-label="Agrandir la photo ${k + 1} de ${esc(inv.nom)}"><img src="${u}" alt="${esc(inv.nom)}" loading="lazy"></button>`).join("")}</div>` : ""}</section>`).join("");
  const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Livre souvenir · ${esc(e.noms)}</title><style>${CSS(g, j3, j4, j5)}</style></head><body>
<header class="couv"><small>Livre souvenir</small><h1 class="titre">${esc(e.noms)}</h1><div class="filet"></div><p>${esc(e.dateTexte)}${e.lieu ? ` · ${esc(e.lieu)}` : ""}</p><a href="#souvenirs">Ouvrir le livre</a></header>
<main id="souvenirs"><div class="intro"><h2 class="titre">Merci d'avoir été là</h2><p>${invites.length} invité${invites.length > 1 ? "s" : ""} ont partagé ${nbPhotos} photo${nbPhotos > 1 ? "s" : ""} et leurs mots pour ce jour. Touchez une photo pour l'agrandir.</p></div>${bloc}</main>
<footer>Heavent People Agency</footer>
<div id="vue" role="dialog" aria-modal="true" aria-label="Photo agrandie"><button class="ferme" type="button" aria-label="Fermer">×</button><button class="prec" type="button" aria-label="Photo précédente">‹</button><img alt=""><button class="suiv" type="button" aria-label="Photo suivante">›</button><div class="barre"><span class="cpt"></span><a class="tele" download="souvenir.jpg">Enregistrer</a></div></div>
<script>${JS}</script></body></html>`;

  fichiers["livre-souvenir.html"] = strToU8(html);
  fichiers["LISEZ-MOI.txt"] = strToU8(`Livre souvenir de ${e.noms}\n\n1. Ouvrez « livre-souvenir.html » (double-clic) : il s'ouvre dans votre navigateur, sans internet.\n2. Le dossier « photos » contient toutes les photos.\n\nGardez ce fichier : il n'est conservé en ligne qu'une durée limitée.\nHeavent People Agency`);
  progres?.("Compression…");
  const zip = new Blob([zipSync(fichiers, { level: 0 })], { type: "application/zip" });
  return { zip, nbPhotos, nbInvites: invites.length, tailleMo: Math.round((zip.size / 1048576) * 10) / 10 };
}
