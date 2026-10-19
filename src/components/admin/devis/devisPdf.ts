import logoDevis from "@/assets/logo-devis-noir.png";
import logoNawar from "@/assets/logo-nawar.png";
import { DevisForm, Parametres, devisMarkup, nomFichierDevis } from "./devisUtils";
import { Facture, factureMarkup, nomFichierFacture } from "./factureUtils";
import { enregistrerFichier } from "@/lib/pdf";

/** Image → data URL, pour que le logo apparaisse à coup sûr dans le PDF. */
async function enDataUrl(url: string) {
  try {
    const blob = await fetch(url).then((r) => r.blob());
    return await new Promise<string>((res) => { const fr = new FileReader(); fr.onload = () => res(fr.result as string); fr.readAsDataURL(blob); });
  } catch {
    return url;
  }
}

/** Transforme un document .devis-doc (devis, facture) en PDF A4 et le télécharge. */
async function telechargerDocument(css: string, html: string, nom: string) {
  const conteneur = document.createElement("div");
  try {
    conteneur.style.cssText = "position:fixed;left:-10000px;top:0;z-index:-1;";
    conteneur.innerHTML = `<style>${css}</style>${html}`;
    document.body.appendChild(conteneur);
    await document.fonts?.ready;
    const html2pdf = (await import("html2pdf.js")).default;
    const blob = await html2pdf()
      .set({
        margin: 0,
        filename: nom,
        image: { type: "jpeg", quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
        jsPDF: { unit: "px", format: [794, 1123], orientation: "portrait", hotfixes: ["px_scaling"] },
        pagebreak: { mode: ["css"], before: ".suite", avoid: ["tr", ".art", ".signature", ".bas", ".lettres"] },
      })
      .from(conteneur.querySelector(".devis-pages") as HTMLElement)
      .outputPdf("blob");
    enregistrerFichier(new Blob([blob], { type: "application/pdf" }), nom);
    return nom;
  } finally {
    conteneur.remove();
  }
}

const logoDe = (marque?: string | null) => enDataUrl(marque === "nawar" ? logoNawar : logoDevis);

/** Génère le PDF du devis (2 pages : devis + conditions générales) et le télécharge. Utilisé par l'admin et par la page client. */
export async function telechargerDevisPdf(d: DevisForm, params: Parametres | null) {
  const { css, html } = devisMarkup(d, params, await logoDe(d.marque));
  return telechargerDocument(css, html, nomFichierDevis(d));
}

/** PDF d'une facture (admin et page client). */
export async function telechargerFacturePdf(f: Facture, params: Parametres | null) {
  const { css, html } = factureMarkup(f, params, await logoDe(f.marque));
  return telechargerDocument(css, html, nomFichierFacture(f));
}

/** Aperçu HTML d'une facture (pour les tests et l'aperçu à l'écran). */
export async function htmlFacture(f: Facture, params: Parametres | null) {
  const { css, html } = factureMarkup(f, params, await logoDe(f.marque));
  return `<style>${css}</style>${html}`;
}
