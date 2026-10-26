import logoDevis from "@/assets/logo-devis-noir.png";
import logoNawar from "@/assets/logo-nawar.png";
import fondDevis from "@/assets/fond-devis.jpg";
import { COULEURS, enregistrerFichier, esc, nomFichier, partagerFichier, peutPartagerFichier } from "@/lib/pdf";
import { DevisForm, Parametres, calculerTotaux } from "./devisUtils";

/**
 * Image du devis à partager (Instagram, TikTok, WhatsApp…) : une carte élégante avec le titre, l'essentiel de l'événement
 * et le PRIX FINAL, sans le détail des lignes. Le devis PDF complet reste inchangé.
 * Format 1080 × 1350 (4:5), au style crème / anthracite / or de l'agence.
 */
export type FormatImage = "png" | "jpg";
const L = 1080, H = 1350;

async function enDataUrl(url: string) {
  try {
    const blob = await fetch(url).then((r) => r.blob());
    return await new Promise<string>((res) => { const fr = new FileReader(); fr.onload = () => res(fr.result as string); fr.readAsDataURL(blob); });
  } catch { return url; }
}

const montant = (n: number) => {
  const entier = Math.abs(n - Math.round(n)) < 0.005;
  return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: entier ? 0 : 2, maximumFractionDigits: entier ? 0 : 2 }).format(n).replace(/[  ]/g, " ");
};
const dateLongue = (d?: string | null) => (d ? new Date(d.slice(0, 10) + "T12:00:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "");

/** Titre affiché : celui du devis, sinon déduit du type et du client. */
export function titreImage(d: DevisForm) {
  if (d.titre?.trim()) return d.titre.trim();
  const nom = (d.client_societe || d.client_nom || "").trim();
  if (d.type === "mariage") return nom ? `Mariage de ${nom}` : "Votre mariage";
  if (d.type === "entreprise") return nom || "Votre événement";
  return nom ? `Événement · ${nom}` : "Votre événement";
}

export function imageDevisHtml(d: DevisForm, params: Parametres | null, logoSrc: string, fondSrc: string) {
  const { or, orFonce, noir } = COULEURS;
  const losange = (t: number) => `<svg width="${t}" height="${t}" viewBox="0 0 10 10" style="flex:none"><path d="M5 0 L10 5 L5 10 L0 5 Z" fill="${or}"/></svg>`;
  const t = calculerTotaux(d.lignes, d.remise_globale_pct, d.taux_tva, d.acompte_pct);
  const devise = params?.devise || "MAD";
  const cols = [
    dateLongue(d.date_evenement) && ["Date", dateLongue(d.date_evenement).replace(/^\w+ /, "")],
    d.lieu?.trim() && ["Lieu", d.lieu.trim()],
    d.nb_personnes?.trim() && Number(d.nb_personnes) > 0 && ["Invités", d.nb_personnes.trim()],
  ].filter(Boolean) as string[][];
  const infos = cols.length
    ? `<div class="cols">${cols.map(([l, v], k) => `${k ? '<i class="sep"></i>' : ""}<div class="col"><div class="cl">${esc(l)}</div><div class="cv">${esc(v)}</div></div>`).join("")}</div>`
    : "";
  const inclus = [...new Set(d.lignes.map((l) => (l.designation || "").replace(/\s+/g, " ").trim()).filter(Boolean).filter((x) => x.length <= 24 && !/[()]/.test(x)))].slice(0, 4);
  const validite = d.date_validite ? `Offre valable jusqu'au ${new Date(d.date_validite.slice(0, 10) + "T12:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}` : "";
  const acompte = t.acompte > 0 ? `Réservez votre date avec un acompte de ${montant(t.acompte)} ${devise}` : "Réservez votre date dès maintenant";
  const contact = [params?.telephone, params?.site_web?.replace(/^https?:\/\//, "")].filter(Boolean).join("   ·   ");
  const prixTexte = montant(t.ttc);
  const taillePrix = prixTexte.length <= 6 ? 150 : prixTexte.length <= 8 ? 128 : prixTexte.length <= 10 ? 108 : 90;
  const tailleTitre = titreImage(d).length > 34 ? 60 : titreImage(d).length > 22 ? 72 : 86;
  const marque = d.marque === "nawar" ? "Nawar · bar à parfums" : params?.raison_sociale || "Heavent People Agency";
  return `
<style>
  .img-devis, .img-devis * { box-sizing: border-box; margin: 0; padding: 0; }
  .img-devis { width: ${L}px; height: ${H}px; position: relative; overflow: hidden; font-family: "Inter", "Helvetica Neue", Arial, sans-serif; color: ${noir};
    background: #F6EBD6 url("${fondSrc}") center / cover no-repeat; }
  .img-devis .contenu { position: absolute; inset: 0; padding: 92px 84px 70px; display: flex; flex-direction: column; align-items: center; text-align: center; }
  .img-devis .logo { height: 128px; object-fit: contain; }
  .img-devis .eyebrow { margin-top: 30px; font-size: 23px; letter-spacing: 10px; color: ${orFonce}; font-weight: 700; text-transform: uppercase; }
  .img-devis .titre { margin-top: 20px; font-family: "Playfair Display", Georgia, serif; font-size: ${tailleTitre}px; line-height: 1.1; color: #2b1f0e; font-weight: 700; max-width: 900px; }
  .img-devis .filet { margin: 28px 0 26px; display: flex; align-items: center; gap: 16px; width: 560px; }
  .img-devis .filet i { flex: 1; height: 2px; background: linear-gradient(90deg, transparent, ${or}); } .img-devis .filet i:last-child { background: linear-gradient(270deg, transparent, ${or}); }
  .img-devis .cols { display: flex; align-items: stretch; justify-content: center; gap: 0; width: 100%; }
  .img-devis .col { flex: 1; padding: 0 14px; }
  .img-devis .sep { width: 2px; background: ${or}99; margin: 6px 0; flex: none; }
  .img-devis .cl { font-size: 18px; letter-spacing: 6px; color: ${orFonce}; text-transform: uppercase; font-weight: 700; height: 24px; line-height: 24px; }
  .img-devis .cv { margin-top: 10px; font-variant-numeric: lining-nums; font-family: "Playfair Display", Georgia, serif; font-size: 33px; line-height: 40px; color: #2b1f0e; font-weight: 600; }
  .img-devis .inclus { margin-top: 26px; font-size: 22px; font-style: italic; color: #6b5a3a; line-height: 32px; max-width: 880px; }
  .img-devis .prix { margin-top: auto; align-self: center; min-width: 600px; max-width: 100%; padding: 38px 80px 40px; display: flex; flex-direction: column; align-items: center; border-radius: 30px;
    background: linear-gradient(160deg, #F5E3A1 0%, #E2C26A 38%, #C9A247 62%, #EBD48B 100%); border: 2px solid #FFF3C4; box-shadow: 0 18px 40px rgba(120, 86, 20, 0.38); }
  .img-devis .prix .lib { height: 26px; line-height: 26px; font-size: 21px; letter-spacing: 9px; color: #5a4210; text-transform: uppercase; font-weight: 700; }
  .img-devis .prix .val { margin: -${Math.round(taillePrix * 0.14)}px 0 ${Math.round(taillePrix * 0.14)}px; line-height: normal; font-variant-numeric: lining-nums; font-family: "Playfair Display", Georgia, serif; font-size: ${taillePrix}px; color: #2b1f0e; font-weight: 700; white-space: nowrap; text-shadow: 2px 3px 0 rgba(255, 244, 200, 0.7); }
  .img-devis .prix .val small { font-size: ${Math.round(taillePrix * 0.37)}px; line-height: 1; letter-spacing: 3px; color: #5a4210; margin-left: 14px; font-weight: 600; text-shadow: none; }
  .img-devis .prix .ttc { margin-top: 10px; height: 24px; line-height: 24px; font-size: 19px; letter-spacing: 6px; color: #5a4210; text-transform: uppercase; font-weight: 600; }
  .img-devis .appel { margin-top: 28px; font-family: "Playfair Display", Georgia, serif; font-size: 31px; line-height: 40px; color: #2b1f0e; font-weight: 600; max-width: 900px; }
  .img-devis .valide { margin-top: 8px; font-size: 21px; letter-spacing: 2px; color: ${orFonce}; font-weight: 700; min-height: 28px; text-transform: uppercase; }
  .img-devis .pied { margin-top: 12px; font-size: 22px; letter-spacing: 1px; color: #5f5035; }
  .img-devis .pied b { display: block; font-family: "Playfair Display", Georgia, serif; font-size: 26px; letter-spacing: 4px; color: #2b1f0e; font-weight: 700; margin-bottom: 4px; }
</style>
<div class="img-devis">
  <div class="contenu">
    <img class="logo" src="${esc(logoSrc)}" alt="">
    <div class="eyebrow">Votre devis sur mesure</div>
    <div class="titre">${esc(titreImage(d))}</div>
    <div class="filet"><i></i>${losange(18)}<i></i></div>
    ${infos}
    ${inclus.length ? `<div class="inclus">${esc(inclus.join("  ·  "))}</div>` : ""}
    <div class="prix">
      <div class="lib">Votre prix</div>
      <div class="ttc">Toutes taxes comprises</div>
      <div class="val">${prixTexte}<small>${esc(devise)}</small></div>
    </div>
    <div class="appel">${esc(acompte)}</div>
    <div class="valide">${esc(validite)}</div>
    <div class="pied"><b>${esc(marque)}</b>${esc(contact)}</div>
  </div>
</div>`;
}

export const nomImageDevis = (d: DevisForm, format: FormatImage) => nomFichier("Devis", d.numero, d.client_nom || d.client_societe).replace(/\.pdf$/, `.${format}`);

/** Fabrique l'image du devis (PNG ou JPG). */
export async function creerImageDevis(d: DevisForm, params: Parametres | null, format: FormatImage = "png") {
  const [logo, fond] = await Promise.all([enDataUrl(d.marque === "nawar" ? logoNawar : logoDevis), enDataUrl(fondDevis)]);
  const conteneur = document.createElement("div");
  conteneur.style.cssText = "position:fixed;left:-10000px;top:0;z-index:-1;";
  conteneur.innerHTML = imageDevisHtml(d, params, logo, fond);
  document.body.appendChild(conteneur);
  try {
    await document.fonts?.ready;
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(conteneur.querySelector(".img-devis") as HTMLElement, { scale: 2, useCORS: true, backgroundColor: "#F6EBD6", width: L, height: H });
    const type = format === "jpg" ? "image/jpeg" : "image/png";
    const blob: Blob = await new Promise((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error("image vide"))), type, 0.93));
    return { blob, nom: nomImageDevis(d, format) };
  } finally {
    conteneur.remove();
  }
}

/** Crée l'image puis l'enregistre (iPhone/iPad : feuille de partage pour « Enregistrer dans Photos », ailleurs : téléchargement). */
export async function telechargerImageDevis(d: DevisForm, params: Parametres | null, format: FormatImage = "png") {
  const { blob, nom } = await creerImageDevis(d, params, format);
  const mobile = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (mobile && peutPartagerFichier(blob, nom) && (await partagerFichier(blob, nom, "Devis Heavent"))) return nom;
  enregistrerFichier(blob, nom);
  return nom;
}
