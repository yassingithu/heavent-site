import logoDevis from "@/assets/logo-devis-noir.png";
import logoNawar from "@/assets/logo-nawar.png";
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

export function imageDevisHtml(d: DevisForm, params: Parametres | null, logoSrc: string) {
  const { or, orFonce, noir, creme } = COULEURS;
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
  const etoile = `<svg width="46" height="46" viewBox="0 0 46 46"><g fill="none" stroke="${or}" stroke-width="1.6"><rect x="9" y="9" width="28" height="28"/><rect x="9" y="9" width="28" height="28" transform="rotate(45 23 23)"/><circle cx="23" cy="23" r="4" fill="${or}"/></g></svg>`;
  return `
<style>
  .img-devis, .img-devis * { box-sizing: border-box; margin: 0; padding: 0; }
  .img-devis { width: ${L}px; height: ${H}px; position: relative; overflow: hidden; font-family: "Inter", "Helvetica Neue", Arial, sans-serif; color: ${noir};
    background: radial-gradient(ellipse at 50% 0%, #FFFDF6 0%, ${creme} 45%, #F1E8CC 100%); }
  .img-devis .cadre { position: absolute; inset: 34px; border: 2px solid ${or}; }
  .img-devis .cadre2 { position: absolute; inset: 48px; border: 1px solid ${or}88; }
  .img-devis .coin { position: absolute; width: 46px; height: 46px; background: ${creme}; display: flex; align-items: center; justify-content: center; }
  .img-devis .c1 { left: 11px; top: 11px; } .img-devis .c2 { right: 11px; top: 11px; } .img-devis .c3 { left: 11px; bottom: 11px; } .img-devis .c4 { right: 11px; bottom: 11px; }
  .img-devis .contenu { position: absolute; inset: 48px; padding: 56px 70px 52px; display: flex; flex-direction: column; align-items: center; text-align: center; }
  .img-devis .logo { height: 150px; object-fit: contain; }
  .img-devis .eyebrow { margin-top: 38px; font-size: 22px; letter-spacing: 9px; color: ${orFonce}; font-weight: 600; text-transform: uppercase; }
  .img-devis .titre { margin-top: 22px; font-family: "Playfair Display", Georgia, serif; font-size: ${titreImage(d).length > 34 ? 56 : titreImage(d).length > 22 ? 66 : 78}px; line-height: 1.12; color: ${noir}; font-weight: 600; max-width: 860px; }
  .img-devis .filet { margin: 34px 0 30px; display: flex; align-items: center; gap: 16px; width: 520px; }
  .img-devis .filet i { flex: 1; height: 1.5px; background: linear-gradient(90deg, transparent, ${or}); } .img-devis .filet i:last-child { background: linear-gradient(270deg, transparent, ${or}); }
  .img-devis .infos { display: flex; flex-direction: column; gap: 14px; align-items: center; min-height: 40px; }
  .img-devis .info { font-size: 29px; line-height: 36px; color: #4a4338; display: flex; align-items: center; justify-content: center; gap: 14px; }
  .img-devis .prix { margin-top: auto; width: 100%; background: ${noir}; border-radius: 26px; padding: 44px 30px 44px; position: relative; display: flex; flex-direction: column; align-items: center; }
  .img-devis .prix::after { content: ""; position: absolute; inset: 10px; border: 1px solid ${or}66; border-radius: 18px; }
  .img-devis .prix .lib { height: 28px; line-height: 28px; font-size: 21px; letter-spacing: 8px; color: ${or}; text-transform: uppercase; font-weight: 600; }
  .img-devis .prix .val { margin: 8px 0 34px; height: 118px; line-height: 1; font-family: "Playfair Display", Georgia, serif; font-size: 118px; color: #F4EAC2; font-weight: 600; white-space: nowrap; }
  .img-devis .prix .val small { font-size: 44px; line-height: 44px; letter-spacing: 3px; color: ${or}; margin-left: 14px; font-weight: 500; }
  .img-devis .prix .ttc { height: 26px; line-height: 26px; font-size: 20px; letter-spacing: 6px; color: #cfc59a; text-transform: uppercase; }
  .img-devis .val-ok { margin-top: 26px; font-size: 22px; color: ${orFonce}; font-style: italic; min-height: 28px; }
  .img-devis .pied { margin-top: 14px; font-size: 22px; letter-spacing: 1px; color: #6b6354; }
  .img-devis .pied b { display: block; font-family: "Playfair Display", Georgia, serif; font-size: 27px; letter-spacing: 3px; color: ${noir}; font-weight: 600; margin-bottom: 6px; }
</style>
<div class="img-devis">
  <div class="cadre"></div><div class="cadre2"></div>
  <div class="coin c1">${etoile}</div><div class="coin c2">${etoile}</div><div class="coin c3">${etoile}</div><div class="coin c4">${etoile}</div>
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
  const logo = await enDataUrl(d.marque === "nawar" ? logoNawar : logoDevis);
  const conteneur = document.createElement("div");
  conteneur.style.cssText = "position:fixed;left:-10000px;top:0;z-index:-1;";
  conteneur.innerHTML = imageDevisHtml(d, params, logo);
  document.body.appendChild(conteneur);
  try {
    await document.fonts?.ready;
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(conteneur.querySelector(".img-devis") as HTMLElement, { scale: 2, useCORS: true, backgroundColor: COULEURS.creme, width: L, height: H });
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
