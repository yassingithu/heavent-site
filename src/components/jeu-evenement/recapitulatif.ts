// Récapitulatif : document téléchargeable (PDF), image de la scène (PNG) et texte de la demande de devis.
import { CENTRES_DE_TABLE, format, libelle, mentionEstimation, nomAmbianceEv, nomLieuEv, nomTypeEv } from "./config";
import { estRtl, localeDates, tr } from "./langue";
import { Creation, calculerBudget, evaluerMissions, nomElement, placesPrevues } from "./logique";
import { esc, logo, nomFichier, telechargerPdf } from "@/lib/pdf";

export interface OptionsRecap { scene: boolean; estimation: boolean; missions: boolean }

export const nomType = (c: Creation) => nomTypeEv(c.reglages.type);
export const nomAmbiance = (c: Creation) => nomAmbianceEv(c.reglages.ambiance);
export const nomLieu = (c: Creation) => nomLieuEv(c.reglages.lieu);

/** Liste lisible des options choisies : « 12 × Table ronde », « Centres de table »… */
export function optionsChoisies(c: Creation) {
  const n = new Map<string, number>();
  c.elements.forEach((e) => { const k = nomElement(e, c.reglages.type); n.set(k, (n.get(k) ?? 0) + 1); });
  const res = [...n].map(([nom, q]) => (q > 1 ? `${q} × ${nom}` : nom));
  if (c.centres.actif) res.push(tr(CENTRES_DE_TABLE.nom));
  return res;
}

/** Image PNG (data URL) de la scène SVG affichée à l'écran. */
export async function sceneEnPng(svg: SVGSVGElement, echelle = 2): Promise<string> {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  let [vx, vy, w, h] = (svg.getAttribute("viewBox") ?? "0 0 800 600").split(" ").map(Number);
  // Recadrage sur la scène elle-même (sans les grandes marges vides), pour qu'elle occupe bien l'image
  try {
    const g = svg.querySelector(":scope > g[transform]") as SVGGElement | null;
    const t = g?.getAttribute("transform")?.match(/translate\(\s*(-?[\d.]+)[ ,]+(-?[\d.]+)/);
    if (g && t) {
      const b = g.getBBox(), m = 16;
      const x0 = Math.max(vx, Number(t[1]) + b.x - m), y0 = Math.max(vy, Number(t[2]) + b.y - m);
      const x1 = Math.min(vx + w, Number(t[1]) + b.x + b.width + m), y1 = Math.min(vy + h, Number(t[2]) + b.y + b.height + m);
      if (x1 - x0 > 50 && y1 - y0 > 50) { vx = x0; vy = y0; w = x1 - x0; h = y1 - y0; }
    }
  } catch { /* scène non affichée : image complète */ }
  clone.setAttribute("viewBox", `${vx} ${vy} ${w} ${h}`);
  clone.setAttribute("width", String(w)); clone.setAttribute("height", String(h));
  const src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(clone));
  const img = new Image();
  await new Promise<void>((ok, ko) => { img.onload = () => ok(); img.onerror = () => ko(new Error("Image de la scène non créée")); img.src = src; });
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(w * echelle); canvas.height = Math.round(h * echelle);
  const g = canvas.getContext("2d")!;
  g.fillStyle = "#FFFFFF"; g.fillRect(0, 0, canvas.width, canvas.height);
  g.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/png");
}

/** Largeur et hauteur d'une image PNG (data URL), lues dans son en-tête. */
export function dimensionsPng(url: string): { w: number; h: number } | null {
  try {
    const o = atob(url.slice(url.indexOf(",") + 1, url.indexOf(",") + 45));
    const n = (i: number) => (o.charCodeAt(i) << 24) | (o.charCodeAt(i + 1) << 16) | (o.charCodeAt(i + 2) << 8) | o.charCodeAt(i + 3);
    const w = n(16), h = n(20);
    return w > 0 && h > 0 ? { w, h } : null;
  } catch { return null; }
}

/** Taille d'affichage de la scène dans le récapitulatif : proportions respectées, sans dépendre de « object-fit » (que la création du PDF ne gère pas : l'image était étirée). */
const LARGEUR_MAX_SCENE = 700, HAUTEUR_MAX_SCENE = 290;
export function tailleSceneRecap(url: string) {
  const d = dimensionsPng(url);
  if (!d) return null;
  const k = Math.min(LARGEUR_MAX_SCENE / d.w, HAUTEUR_MAX_SCENE / d.h);
  return { w: Math.round(d.w * k), h: Math.round(d.h * k) };
}

export function telechargerFichier(nom: string, contenu: string | Blob, type = "text/plain;charset=utf-8") {
  const blob = typeof contenu === "string" ? new Blob([contenu], { type }) : contenu;
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = nom;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

export const CSS_RECAP = `
  .recap .entete { display:flex; justify-content:space-between; align-items:center; padding: 22px 44px 12px; border-bottom: 3px solid #C9A74E; }
  .recap .entete img { height: 70px; }
  .recap .entete .t { text-align:right; } .recap .entete .t .m { font-family: "Playfair Display", Georgia, serif; font-size: 26px; color:#A8862F; letter-spacing: 2px; }
  .recap .entete .t .s { font-size: 11px; color:#777; }
  .recap .corps { padding: 12px 44px; flex: 1; }
  .recap h2 { font-family: "Playfair Display", Georgia, serif; font-size: 15px; color:#141414; margin: 10px 0 5px; }
  .recap .tuiles { display:grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
  .recap .tuile { background:#FAF7EE; border:1px solid #ECE3CC; padding: 7px 10px; }
  .recap .tuile .e { font-size: 9px; text-transform: uppercase; letter-spacing: 1px; color:#A8862F; } .recap .tuile .v { font-size: 12.5px; color:#141414; font-weight: 600; }
  .recap .scene-cadre { text-align:center; border:1px solid #ECE3CC; margin-top: 4px; background:#FBF8F1; padding: 3px 0; }
  .recap .scene { display:inline-block; vertical-align:top; }
  .recap table { width:100%; border-collapse: collapse; font-size: 10.5px; } .recap th { text-align:left; background:#F3EAD3; padding:5px 8px; font-weight:600; }
  .recap td { padding: 3.5px 8px; border-bottom: 1px solid #F0E9D8; } .recap td.n, .recap th.n { text-align:right; white-space:nowrap; }
  .recap .total td { font-weight: 700; background:#FAF7EE; }
  .recap .mention { font-size: 9.5px; color:#777; margin-top: 6px; font-style: italic; }
  .recap .mission { padding: 3px 0; font-size: 11px; } .recap .ok { color:#2F6B3D; } .recap .ko { color:#9A4B12; }
  .recap .pied { padding: 8px 44px; font-size: 9.5px; color:#8A7A58; border-top: 1px solid #ECE3CC; text-align:center; }
`;

/** Document HTML du récapitulatif (une page A4), utilisé pour l'aperçu et le PDF. */
export function documentRecap(c: Creation, o: OptionsRecap, imageScene?: string | null) {
  const b = calculerBudget(c);
  const m = evaluerMissions(c);
  const r = c.reglages;
  const tuile = (e: string, v: string) => `<div class="tuile"><div class="e">${esc(e)}</div><div class="v">${esc(v)}</div></div>`;
  return `<div class="doc-heavent recap"${estRtl() ? ' dir="rtl"' : ""}>
  <div class="entete"><img src="${esc(logo)}" alt="Heavent"><div class="t"><div class="m">${esc(tr("MON ÉVÉNEMENT"))}</div><div class="s">${esc(tr("Création du {date}", { date: new Date().toLocaleDateString(localeDates()) }))}</div></div></div>
  <div class="corps">
    <div class="tuiles">
      ${tuile(tr("Événement"), nomType(c))}${tuile(tr("Ambiance"), nomAmbiance(c))}${tuile(tr("Lieu"), nomLieu(c))}
      ${tuile(tr("Invités"), String(r.invites))}${tuile(tr("Places prévues"), String(placesPrevues(c)))}${tuile(tr("Budget souhaité"), format(r.budget))}
    </div>
    ${o.scene && imageScene ? `<h2>${esc(tr("Aperçu de la scène"))}</h2><div class="scene-cadre"><img class="scene" src="${imageScene}"${(() => { const t = tailleSceneRecap(imageScene); return t ? ` width="${t.w}" height="${t.h}" style="width:${t.w}px;height:${t.h}px"` : ""; })()} alt="${esc(tr("Aperçu de la scène"))}"></div>` : ""}
    <h2>${esc(tr("Options choisies"))}</h2><div style="font-size:11px">${esc(optionsChoisies(c).join(" · ") || tr("Aucun élément pour l'instant."))}</div>
    ${o.estimation ? `<h2>${esc(tr("Estimation : {montant}", { montant: format(b.total) }))}</h2>
      <table><thead><tr><th>${esc(tr("Élément"))}</th><th>${esc(tr("Calcul"))}</th><th class="n">${esc(tr("Fixe"))}</th><th class="n">${esc(tr("Par invité"))}</th><th class="n">${esc(tr("Total"))}</th></tr></thead><tbody>
      ${b.lignes.map((l) => l.surDevis
        ? `<tr><td>${esc(l.quantite > 1 ? `${l.quantite} × ${l.libelle}` : l.libelle)}</td><td colspan="3">${esc(l.detail)}</td><td class="n">—</td></tr>`
        : `<tr><td>${esc(l.libelle)}</td><td>${esc(l.detail)}</td><td class="n">${esc(format(l.fixe))}</td><td class="n">${l.parInvite ? esc(format(l.parInvite)) : "—"}</td><td class="n">${esc(format(l.total))}</td></tr>`).join("")}
      <tr class="total"><td colspan="4">${esc(tr("Estimation totale"))}${b.depassement ? ` — ${esc(tr("dépasse le budget de {montant}", { montant: format(b.depassement) }))}` : ` — ${esc(tr("reste {montant} sur le budget", { montant: format(b.reste) }))}`}</td><td class="n">${esc(format(b.total))}</td></tr>
      </tbody></table><div class="mention">${esc(mentionEstimation())}${b.lignes.some((l) => l.surDevis) ? ` ${esc(tr("Vos idées sur mesure seront chiffrées dans votre devis."))}` : ""}</div>` : ""}
    ${o.missions ? `<h2>${esc(tr("Missions"))}</h2>${m.map((x) => `<div class="mission ${x.ok ? "ok" : "ko"}">${x.ok ? "✓" : "○"} ${esc(x.titre)} — ${esc(x.aide)}</div>`).join("")}` : ""}
  </div>
  <div class="pied">${esc(tr("Heavent People Agency · organisation et décoration de mariages et d'événements · heaventagency.com"))}</div>
</div>`;
}

export async function telechargerRecapPdf(c: Creation, o: OptionsRecap, imageScene?: string | null) {
  const nom = nomFichier(tr("Mon-evenement"), nomType(c), new Date().toISOString().slice(0, 10));
  return { blob: await telechargerPdf([documentRecap(c, o, imageScene)], CSS_RECAP, nom), nom };
}

// ── Demande de devis (texte joint) ──────────────────────────────────────────
export interface Coordonnees { prenom: string; email: string; telephone: string; date: string; dateInconnue: boolean; ville: string; message: string }

export function texteDemande(c: Creation, k: Coordonnees) {
  const b = calculerBudget(c);
  const titres = [tr("CONFIGURATION DE L'ÉVÉNEMENT"), tr("ESTIMATION ILLUSTRATIVE"), tr("MISSIONS")];
  return [
    tr("DEMANDE DE DEVIS — préparée avec « Crée ton événement de rêve »"),
    "",
    `${tr("Prénom")} : ${k.prenom}`, `${tr("E-mail")} : ${k.email}`, `${tr("Téléphone")} : ${k.telephone || "—"}`,
    `${tr("Date souhaitée")} : ${k.dateInconnue || !k.date ? tr("Je ne sais pas encore") : new Date(k.date + "T12:00:00").toLocaleDateString(localeDates())}`,
    `${tr("Ville ou lieu")} : ${k.ville}`, k.message ? `${tr("Message")} : ${k.message}` : "",
    "",
    titres[0],
    `${tr("Type")} : ${nomType(c)} · ${tr("Ambiance")} : ${nomAmbiance(c)} · ${tr("Lieu")} : ${nomLieu(c)}`,
    `${tr("Invités")} : ${c.reglages.invites} · ${tr("Places prévues")} : ${placesPrevues(c)} · ${tr("Budget souhaité")} : ${format(c.reglages.budget)}`,
    `${tr("Options")} : ${optionsChoisies(c).join(", ") || tr("aucune")}`,
    "",
    titres[1],
    ...b.lignes.map((l) => (l.surDevis ? `- ${l.quantite > 1 ? `${l.quantite} × ` : ""}${l.libelle} : ${l.detail}` : `- ${l.libelle} : ${l.detail} = ${format(l.total)}`)),
    `${tr("Total")} : ${format(b.total)}`,
    mentionEstimation(),
    "",
    titres[2],
    ...evaluerMissions(c).map((m) => `${m.ok ? "[x]" : "[ ]"} ${m.titre} — ${m.aide}`),
  ].filter((l) => l !== "").map((l) => (titres.includes(l) ? `\n${l}` : l)).join("\n");
}
