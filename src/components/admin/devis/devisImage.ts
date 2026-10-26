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
  const infos = [
    dateLongue(d.date_evenement) && `<div class="info">${esc(dateLongue(d.date_evenement))}</div>`,
    d.lieu?.trim() && `<div class="info">${esc(d.lieu.trim())}</div>`,
    d.nb_personnes?.trim() && Number(d.nb_personnes) > 0 && `<div class="info">${esc(d.nb_personnes.trim())} invités</div>`,
  ].filter(Boolean).join("");
  const validite = d.date_validite ? `Valable jusqu'au ${new Date(d.date_validite.slice(0, 10) + "T12:00:00").toLocaleDateString("fr-FR")}` : "";
  const contact = [params?.telephone, params?.site_web?.replace(/^https?:\/\//, "")].filter(Boolean).join("  ·  ");
  const tailleTitre = titreImage(d).length > 34 ? 56 : titreImage(d).length > 22 ? 66 : 78;
  return `
<style>
  .img-devis, .img-devis * { box-sizing: border-box; margin: 0; padding: 0; }
  .img-devis { width: ${L}px; height: ${H}px; position: relative; overflow: hidden; font-family: "Inter", "Helvetica Neue", Arial, sans-serif; color: ${noir};
    background: #F6EBD6 url("${fondSrc}") center / cover no-repeat; }
  .img-devis .contenu { position: absolute; inset: 0; padding: 120px 90px 96px; display: flex; flex-direction: column; align-items: center; text-align: center; }
  .img-devis .logo { height: 140px; object-fit: contain; }
  .img-devis .eyebrow { margin-top: 36px; font-size: 22px; letter-spacing: 9px; color: ${orFonce}; font-weight: 600; text-transform: uppercase; }
  .img-devis .titre { margin-top: 22px; font-family: "Playfair Display", Georgia, serif; font-size: ${tailleTitre}px; line-height: 1.12; color: #2b241b; font-weight: 600; max-width: 860px; }
  .img-devis .filet { margin: 32px 0 28px; display: flex; align-items: center; gap: 16px; width: 520px; }
  .img-devis .filet i { flex: 1; height: 1.5px; background: linear-gradient(90deg, transparent, ${or}); } .img-devis .filet i:last-child { background: linear-gradient(270deg, transparent, ${or}); }
  .img-devis .infos { display: flex; flex-direction: column; gap: 12px; align-items: center; min-height: 40px; }
  .img-devis .info { font-size: 29px; line-height: 36px; color: #5a4d3a; }
  .img-devis .prix { margin-top: auto; width: 100%; padding: 36px 30px 38px; position: relative; display: flex; flex-direction: column; align-items: center;
    background: rgba(255, 252, 244, 0.62); border: 1.5px solid ${or}; border-radius: 22px; }
  .img-devis .prix::after { content: ""; position: absolute; inset: 8px; border: 1px solid ${or}77; border-radius: 15px; }
  .img-devis .prix .lib { height: 28px; line-height: 28px; font-size: 21px; letter-spacing: 8px; color: ${orFonce}; text-transform: uppercase; font-weight: 600; }
  .img-devis .prix .val { margin: 8px 0 30px; height: 118px; line-height: 1; font-family: "Playfair Display", Georgia, serif; font-size: 118px; color: #8C6D22; font-weight: 600; white-space: nowrap; }
  .img-devis .prix .val small { font-size: 44px; line-height: 44px; letter-spacing: 3px; color: ${orFonce}; margin-left: 14px; font-weight: 500; }
  .img-devis .prix .ttc { height: 26px; line-height: 26px; font-size: 20px; letter-spacing: 6px; color: #7a6b4f; text-transform: uppercase; }
  .img-devis .val-ok { margin-top: 26px; font-size: 22px; color: ${orFonce}; font-style: italic; min-height: 28px; }
  .img-devis .pied { margin-top: 14px; font-size: 22px; letter-spacing: 1px; color: #6b5d45; }
  .img-devis .pied b { display: block; font-family: "Playfair Display", Georgia, serif; font-size: 27px; letter-spacing: 3px; color: #2b241b; font-weight: 600; margin-bottom: 6px; }
</style>
<div class="img-devis">
  <div class="contenu">
    <img class="logo" src="${esc(logoSrc)}" alt="">
    <div class="eyebrow">Votre devis</div>
    <div class="titre">${esc(titreImage(d))}</div>
    <div class="filet"><i></i>${losange(16)}<i></i></div>
    <div class="infos">${infos}</div>
    <div class="prix">
      <div class="lib">Total</div>
      <div class="val">${montant(t.ttc)}<small>${esc(devise)}</small></div>
      <div class="ttc">Toutes taxes comprises</div>
    </div>
    <div class="val-ok">${esc(validite)}</div>
    <div class="pied"><b>${esc(d.marque === "nawar" ? "Nawar · bar à parfums" : params?.raison_sociale || "Heavent People Agency")}</b>${esc(contact)}</div>
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
