import logoDevis from "@/assets/logo-devis-noir.png";
import logoNawar from "@/assets/logo-nawar.png";
import { DevisForm, Parametres, devisMarkup, nomFichierDevis } from "./devisUtils";

/** Image → data URL, pour que le logo apparaisse à coup sûr dans le PDF. */
async function enDataUrl(url: string) {
  try {
    const blob = await fetch(url).then((r) => r.blob());
    return await new Promise<string>((res) => { const fr = new FileReader(); fr.onload = () => res(fr.result as string); fr.readAsDataURL(blob); });
  } catch {
    return url;
  }
}

/** Génère le PDF du devis (2 pages : devis + conditions générales) et le télécharge. Utilisé par l'admin et par la page client. */
export async function telechargerDevisPdf(d: DevisForm, params: Parametres | null) {
  const conteneur = document.createElement("div");
  try {
    const logoSrc = await enDataUrl(d.marque === "nawar" ? logoNawar : logoDevis);
    const { css, html } = devisMarkup(d, params, logoSrc);
    conteneur.style.cssText = "position:fixed;left:-10000px;top:0;z-index:-1;";
    conteneur.innerHTML = `<style>${css}</style>${html}`;
    document.body.appendChild(conteneur);
    await document.fonts?.ready;
    const html2pdf = (await import("html2pdf.js")).default;
    await html2pdf()
      .set({
        margin: 0,
        filename: nomFichierDevis(d),
        image: { type: "jpeg", quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
        jsPDF: { unit: "px", format: [794, 1123], orientation: "portrait", hotfixes: ["px_scaling"] },
        pagebreak: { mode: ["css"], before: ".suite", avoid: ["tr", ".art", ".signature", ".bas"] },
      })
      .from(conteneur.querySelector(".devis-pages") as HTMLElement)
      .save();
    return nomFichierDevis(d);
  } finally {
    conteneur.remove();
  }
}
