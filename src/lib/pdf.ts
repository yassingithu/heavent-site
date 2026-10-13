// Outils communs pour produire des PDF (devis, fiches, contrats, paie) directement dans le navigateur.
import logoNoir from "@/assets/logo-devis-noir.png";
import { SUPABASE_URL } from "@/integrations/supabase/client";

export const COULEURS = { or: "#C8B560", orFonce: "#A8933F", noir: "#141414", creme: "#FAF7EE" };

export const esc = (s: unknown) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

export const dateFr = (d?: string | null, long = false) =>
  d ? new Date(d + (d.length === 10 ? "T12:00:00" : "")).toLocaleDateString("fr-FR", long ? { weekday: "long", day: "numeric", month: "long", year: "numeric" } : undefined) : "";

export const mad = (n: number | null | undefined) =>
  `${new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(n) || 0)} MAD`;

export const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

export const logo = logoNoir;

/** URL publique d'une photo du staff (bucket photos). */
export const photoUrl = (fichier?: string | null) =>
  fichier ? `${SUPABASE_URL}/storage/v1/object/public/photos/photos/${encodeURIComponent(fichier)}` : null;

/** Convertit une image distante en data URL pour qu'elle apparaisse à coup sûr dans le PDF. */
export async function enDataUrl(url: string | null): Promise<string | null> {
  if (!url) return null;
  try {
    const blob = await fetch(url).then((r) => (r.ok ? r.blob() : Promise.reject()));
    return await new Promise((res) => { const fr = new FileReader(); fr.onload = () => res(fr.result as string); fr.readAsDataURL(blob); });
  } catch {
    return null;
  }
}

/** Styles de base communs à tous les documents (classe .doc-heavent). */
export const cssBase = () => {
  const { or, orFonce, noir, creme } = COULEURS;
  return `
  .doc-heavent, .doc-heavent * { box-sizing: border-box; margin: 0; }
  .doc-heavent { font-family: "Inter", "Helvetica Neue", Arial, sans-serif; color: #2a2a2a; font-size: 11.5px; width: 794px; min-height: 1118px; background: #fff; line-height: 1.45; display: flex; flex-direction: column; }
  .doc-heavent .entete { padding: 30px 44px 22px; display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid ${or}; margin: 0 44px; padding-left: 0; padding-right: 0; }
  .doc-heavent .entete img { height: 70px; }
  .doc-heavent .entete .titre { text-align: right; }
  .doc-heavent .entete .titre .mot { font-family: "Playfair Display", Georgia, serif; font-size: 30px; letter-spacing: 5px; color: ${or}; line-height: 1.05; }
  .doc-heavent .entete .titre .sous { margin-top: 6px; font-size: 11px; color: #777; }
  .doc-heavent .corps { padding: 24px 44px 10px; flex: 1; }
  .doc-heavent .etiquette { font-size: 9.5px; letter-spacing: 2px; text-transform: uppercase; color: ${orFonce}; font-weight: 700; margin-bottom: 5px; }
  .doc-heavent .bloc { padding: 12px 14px; background: ${creme}; border-left: 3px solid ${or}; }
  .doc-heavent .cadre { padding: 12px 14px; border: 1px solid #ece6d3; }
  .doc-heavent .serif { font-family: "Playfair Display", Georgia, serif; }
  .doc-heavent h2 { font-family: "Playfair Display", Georgia, serif; font-size: 17px; color: ${noir}; font-weight: 600; margin: 18px 0 8px; }
  .doc-heavent table { width: 100%; border-collapse: collapse; }
  .doc-heavent thead th { background: ${or}; color: #fff; font-weight: 600; padding: 8px 10px; text-align: left; font-size: 9.5px; letter-spacing: 1.2px; text-transform: uppercase; }
  .doc-heavent tbody td { padding: 8px 10px; border-bottom: 1px solid #efe9d8; vertical-align: top; }
  .doc-heavent tbody tr:nth-child(even) td { background: ${creme}; }
  .doc-heavent tr, .doc-heavent .insecable { page-break-inside: avoid; }
  .doc-heavent .n { text-align: right; white-space: nowrap; }
  .doc-heavent .grille { display: flex; flex-wrap: wrap; gap: 8px; }
  .doc-heavent .case { flex: 1 1 30%; min-width: 30%; border: 1px solid #ece6d3; padding: 7px 10px; }
  .doc-heavent .case .v { font-weight: 600; color: ${noir}; margin-top: 1px; }
  .doc-heavent .pied { background: ${creme}; border-top: 3px solid ${or}; color: #666; padding: 12px 44px; font-size: 9.5px; text-align: center; line-height: 1.6; margin-top: 18px; }
  .doc-heavent .pied b { color: ${orFonce}; letter-spacing: 1px; }
  .doc-heavent .signatures { display: flex; gap: 22px; margin-top: 22px; page-break-inside: avoid; }
  .doc-heavent .signatures > div { flex: 1; min-height: 110px; padding: 12px 14px; }
  .doc-heavent .signatures .agence { background: ${creme}; border-top: 3px solid ${or}; }
  .doc-heavent .signatures .autre { border: 1px dashed #cfc6a8; }
  .doc-heavent .sign { font-family: "Playfair Display", Georgia, serif; font-style: italic; font-size: 22px; color: ${noir}; }
  .doc-heavent .article { margin-top: 12px; page-break-inside: avoid; }
  .doc-heavent .article h3 { font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: ${orFonce}; margin-bottom: 3px; }
  .doc-heavent .article p { text-align: justify; }
  .doc-heavent .saut { page-break-before: always; }
  `;
};

export interface InfosAgence {
  raison_sociale?: string | null; adresse?: string | null; ville?: string | null; telephone?: string | null;
  email?: string | null; site_web?: string | null; rc?: string | null; ice?: string | null; if_fiscal?: string | null; patente?: string | null;
}

export const piedAgence = (p: InfosAgence | null) => {
  const adresse = [p?.adresse, p?.ville].filter(Boolean).join(", ");
  const sep = ' <span style="color:#A8933F">◆</span> ';
  return `<div class="pied"><b>${esc((p?.raison_sociale ?? "Heavent People Agency").toUpperCase())}</b>${adresse ? sep + esc(adresse) : ""}<br>${[
    p?.rc && `RC ${esc(p.rc)}`, p?.ice && `ICE ${esc(p.ice)}`, p?.if_fiscal && `IF ${esc(p.if_fiscal)}`,
    p?.telephone && esc(p.telephone), p?.email && esc(p.email),
  ].filter(Boolean).join(sep)}</div>`;
};

export const enteteDoc = (logoSrc: string, mot: string, sous: string) =>
  `<div class="entete"><img src="${esc(logoSrc)}" alt="Heavent"><div class="titre"><div class="mot">${esc(mot)}</div><div class="sous">${sous}</div></div></div>`;

/**
 * Transforme une ou plusieurs pages HTML (chacune un <div class="doc-heavent">) en un seul PDF téléchargé.
 */
export async function telechargerPdf(pages: string[], css: string, nomFichier: string) {
  const conteneur = document.createElement("div");
  conteneur.style.cssText = "position:fixed;left:-10000px;top:0;z-index:-1;";
  conteneur.innerHTML = `<style>${cssBase()}${css}</style><div class="lot">${pages.map((p, i) => (i ? p.replace('class="doc-heavent"', 'class="doc-heavent suite"') : p)).join("")}</div>`;
  document.body.appendChild(conteneur);
  try {
    await document.fonts?.ready;
    const html2pdf = (await import("html2pdf.js")).default;
    await html2pdf()
      .set({
        margin: 0,
        filename: nomFichier,
        image: { type: "jpeg", quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
        jsPDF: { unit: "px", format: [794, 1123], orientation: "portrait", hotfixes: ["px_scaling"] },
        pagebreak: { mode: ["css"], before: ".suite", avoid: ["tr", ".insecable", ".article", ".signatures"] },
      })
      .from(conteneur.querySelector(".lot") as HTMLElement)
      .save();
  } finally {
    conteneur.remove();
  }
}

export const nomFichier = (...parts: (string | null | undefined)[]) =>
  parts.filter(Boolean).join("-").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "") + ".pdf";
