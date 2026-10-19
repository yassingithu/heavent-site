// Guide gratuit en vrai fichier PDF (A4), aux couleurs de Heavent : couverture noire et or, pages crème, conseils numérotés.
import logoOr from "@/assets/logo-heavent-or.png";
import logoNoir from "@/assets/logo-devis-noir.png";
import { enDataUrl, enregistrerFichier, esc } from "@/lib/pdf";
import type { Guide } from "@/data/guides";

const THEME: Record<string, string> = { mariage: "Mariage", naissance: "Baby shower & naissance", fete: "Fêtes de famille", entreprise: "Événements d'entreprise" };

const css = `
.gp, .gp * { box-sizing: border-box; margin: 0; padding: 0; }
.gp { font-family: "Inter", "Helvetica Neue", Arial, sans-serif; color: #2A2420; }
.gp .page { width: 794px; height: 1120px; position: relative; overflow: hidden; background: #FBF8F1; }
.gp .serif { font-family: "Playfair Display", Georgia, serif; }
/* Couverture */
.gp .couv { background: #141414; color: #FAF7EE; display: flex; flex-direction: column; align-items: center; justify-content: space-between; padding: 90px 80px 70px; text-align: center; }
.gp .halo { position: absolute; inset: 0; background: radial-gradient(circle at 15% 10%, rgba(200,181,96,.28), transparent 45%), radial-gradient(circle at 90% 95%, rgba(168,147,63,.25), transparent 40%); }
.gp .cadre { position: absolute; inset: 28px; border: 1px solid rgba(200,181,96,.45); }
.gp .cadre2 { position: absolute; inset: 36px; border: 1px solid rgba(200,181,96,.18); }
.gp .couv .logo { width: 230px; position: relative; }
.gp .eyebrow { font-size: 12px; letter-spacing: 6px; text-transform: uppercase; color: #E4D49A; }
.gp .couv h1 { font-size: 54px; line-height: 1.15; font-weight: 600; margin: 26px 0 0; padding-bottom: 30px; }
.gp .filet { display: block; width: 70px; height: 2px; background: #C8B560; margin: 0 auto; }
.gp .couv .accroche { font-size: 17px; color: rgba(250,247,238,.75); line-height: 1.6; max-width: 520px; margin: 22px auto 0; }
.gp .couv .bas { font-size: 12px; letter-spacing: 4px; text-transform: uppercase; color: rgba(250,247,238,.6); position: relative; }
.gp .milieu { position: relative; }
/* Pages intérieures */
.gp .int { padding: 70px 78px 90px; }
.gp .entete { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #EADFC8; padding-bottom: 14px; margin-bottom: 34px; }
.gp .entete img { height: 26px; }
.gp .entete span { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #8C6D22; }
.gp .intro { font-family: "Playfair Display", Georgia, serif; font-size: 19px; line-height: 1.65; color: #3d362d; margin-bottom: 34px; padding-left: 18px; border-left: 2px solid #C8B560; }
.gp .conseil { display: flex; gap: 26px; padding: 26px 0; border-top: 1px solid #EADFC8; }
.gp .num { font-family: "Playfair Display", Georgia, serif; font-size: 46px; line-height: 1; color: #C8B560; width: 62px; flex-shrink: 0; }
.gp .conseil h2 { font-family: "Playfair Display", Georgia, serif; font-size: 23px; line-height: 1.25; font-weight: 600; color: #141414; margin-bottom: 9px; }
.gp .conseil p { font-size: 14px; line-height: 1.7; color: #4a4239; }
.gp .astuce { margin-top: 13px; background: #fff; border-left: 3px solid #C8B560; border-radius: 0 10px 10px 0; padding: 11px 15px; font-size: 13px !important; color: #5E554A !important; }
.gp .astuce b { color: #8C6D22; letter-spacing: 1px; text-transform: uppercase; font-size: 10.5px; display: block; margin-bottom: 3px; }
.gp .pied { position: absolute; left: 78px; right: 78px; bottom: 38px; display: flex; justify-content: space-between; font-size: 10px; color: #A79C88; letter-spacing: 1px; }
.gp .conclusion { margin-top: 30px; text-align: center; padding: 34px 40px; background: #fff; border: 1px solid #EADFC8; border-radius: 18px; }
.gp .conclusion p { font-family: "Playfair Display", Georgia, serif; font-size: 19px; line-height: 1.55; color: #3d362d; }
.gp .conclusion .sig { font-family: "Inter", sans-serif; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #8C6D22; margin-top: 16px; }
.gp .contact { margin-top: 26px; background: #141414; color: #FAF7EE; border-radius: 18px; padding: 30px 36px; display: flex; justify-content: space-between; align-items: center; gap: 24px; }
.gp .contact h3 { font-family: "Playfair Display", Georgia, serif; font-size: 24px; font-weight: 600; }
.gp .contact .lignes { font-size: 13px; line-height: 1.9; color: rgba(250,247,238,.8); text-align: right; }
.gp .contact .lignes b { color: #E4D49A; font-weight: 600; }
`;

function entete(logo: string, g: Guide) {
  return `<div class="entete"><img src="${logo}" alt=""><span>${esc(THEME[g.theme] ?? "Guide")} · Guide gratuit</span></div>`;
}
function pied(n: number) {
  return `<div class="pied"><span>HEAVENT PEOPLE AGENCY · heaventagency.com</span><span>${n}</span></div>`;
}
function conseil(c: Guide["conseils"][number], i: number) {
  return `<div class="conseil"><div class="num">${String(i + 1).padStart(2, "0")}</div><div>
    <h2>${esc(c.titre)}</h2><p>${esc(c.texte)}</p>
    ${c.astuce ? `<p class="astuce"><b>L'astuce Heavent</b>${esc(c.astuce)}</p>` : ""}
  </div></div>`;
}

/** Répartit les conseils sur les pages (2 avec l'introduction, puis 3 par page) */
function pages(g: Guide) {
  const r: { intro: boolean; idx: number[] }[] = [{ intro: true, idx: [0, 1] }];
  for (let i = 2; i < g.conseils.length; i += 3) r.push({ intro: false, idx: [i, i + 1, i + 2].filter((k) => k < g.conseils.length) });
  return r;
}

export async function telechargerGuidePdf(g: Guide) {
  const [or, noir] = await Promise.all([enDataUrl(logoOr), enDataUrl(logoNoir)]);
  const decoupe = pages(g);
  const html = `<div class="gp">
    <div class="page couv">
      <div class="halo"></div><div class="cadre"></div><div class="cadre2"></div>
      <img class="logo" src="${or ?? logoOr}" alt="Heavent">
      <div class="milieu">
        <div class="eyebrow">Guide gratuit · ${esc(THEME[g.theme] ?? "")}</div>
        <h1 class="serif">${esc(g.titre)}</h1>
        <div class="filet"></div>
        <p class="accroche">${esc(g.accroche)}</p>
      </div>
      <div class="bas">heaventagency.com · Rabat · Casablanca · Marrakech</div>
    </div>
    ${decoupe.map((p, n) => `<div class="page int" style="page-break-before:always">
      ${entete(noir ?? logoNoir, g)}
      ${p.intro ? `<p class="intro">${esc(g.intro)}</p>` : ""}
      ${p.idx.map((i) => conseil(g.conseils[i], i)).join("")}
      ${n === decoupe.length - 1 ? `
        <div class="conclusion"><p>${esc(g.conclusion)}</p><div class="sig">L'équipe Heavent</div></div>
        <div class="contact"><h3>Parlons de votre événement</h3>
          <div class="lignes"><b>heaventagency.com</b><br>WhatsApp +212 6 10 93 96 55<br>Instagram @heaventagency</div></div>` : ""}
      ${pied(n + 2)}
    </div>`).join("")}
  </div>`;

  const conteneur = document.createElement("div");
  conteneur.style.cssText = "position:fixed;left:-10000px;top:0;z-index:-1;";
  conteneur.innerHTML = `<style>${css}</style>${html}`;
  document.body.appendChild(conteneur);
  try {
    await document.fonts?.ready;
    const html2pdf = (await import("html2pdf.js")).default;
    const nom = `Heavent - ${g.titre.split(":")[0].trim()}.pdf`;
    const blob = await html2pdf()
      .set({
        margin: 0, filename: nom,
        image: { type: "jpeg", quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: "#FBF8F1" },
        jsPDF: { unit: "px", format: [794, 1123], orientation: "portrait", hotfixes: ["px_scaling"] },
        pagebreak: { mode: ["css"] },
      })
      .from(conteneur.querySelector(".gp") as HTMLElement)
      .outputPdf("blob");
    enregistrerFichier(new Blob([blob], { type: "application/pdf" }), nom);
    return nom;
  } finally {
    conteneur.remove();
  }
}
