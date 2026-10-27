/**
 * Carte visuelle partageable : la scène personnalisée, le titre, le style et la marque Heavent.
 * AUCUN contact, AUCUNE conversation, AUCUNE donnée privée n'y figure. Elle est créée dans le navigateur, sans envoi.
 */
import { createElement } from "react";
import { PALETTES, STYLES } from "./donnees";
import { rendu, resume, type Choix } from "./etat";
import { estRtl, tr } from "./langue";

const L = 1080, H = 1350;

async function enDonnees(url: string): Promise<string> {
  const r = await fetch(url); const b = await r.blob();
  return await new Promise((ok, ko) => { const f = new FileReader(); f.onload = () => ok(String(f.result)); f.onerror = () => ko(f.error); f.readAsDataURL(b); });
}
const charger = (src: string) => new Promise<HTMLImageElement>((ok, ko) => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => ko(new Error("image")); i.src = src; });

function coins(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
}
function lignes(c: CanvasRenderingContext2D, t: string, max: number): string[] {
  const mots = t.split(" "), out: string[] = []; let cur = "";
  for (const m of mots) { const essai = cur ? `${cur} ${m}` : m; if (c.measureText(essai).width > max && cur) { out.push(cur); cur = m; } else cur = essai; }
  if (cur) out.push(cur); return out;
}

export async function creerCarte(choix: Choix, logos: { nawar: string; heavent: string }): Promise<Blob> {
  const r = rendu(choix); if (!r) throw new Error("Rien à illustrer");
  const [{ renderToStaticMarkup }, { SceneSvg }] = await Promise.all([import("react-dom/server"), import("./Scene")]);
  const [nawar, heavent] = await Promise.all([enDonnees(logos.nawar), enDonnees(logos.heavent)]);
  let svg = renderToStaticMarkup(createElement(SceneSvg, { r, nuit: 1, animer: false, final: "assis", logos: { nawar, heavent }, cadrage: "slice" }));
  svg = svg.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="960" height="720" ');
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
  try {
    const [scene, logo] = await Promise.all([charger(url), charger(heavent)]);
    const cv = document.createElement("canvas"); cv.width = L; cv.height = H;
    const c = cv.getContext("2d")!;
    c.direction = estRtl() ? "rtl" : "ltr";
    const fond = c.createLinearGradient(0, 0, 0, H); fond.addColorStop(0, "#1f1a22"); fond.addColorStop(1, "#0f0d12");
    c.fillStyle = fond; c.fillRect(0, 0, L, H);
    // cadre de la scène
    c.save(); coins(c, 60, 150, 960, 760, 34); c.clip(); c.drawImage(scene, 60, 150, 960, 760); c.restore();
    c.strokeStyle = "#C9A74E"; c.lineWidth = 3; coins(c, 60, 150, 960, 760, 34); c.stroke();
    // marque
    const hl = 56, wl = Math.min(260, (logo.width / logo.height) * hl);
    c.drawImage(logo, (L - wl) / 2, 56, wl, hl);
    // titre
    const res = resume(choix);
    c.textAlign = "center"; c.fillStyle = "#F6EFDD"; c.font = "600 60px 'Playfair Display', Georgia, serif";
    const tl = lignes(c, res.titre, 900).slice(0, 2);
    tl.forEach((t, i) => c.fillText(t, L / 2, 990 + i * 68));
    const y0 = 990 + tl.length * 68;
    c.fillStyle = "#E4D49A"; c.font = "400 30px Georgia, serif";
    c.fillText(`${res.type} · ${res.style}`, L / 2, y0 + 10);
    // palette
    const pal = PALETTES.find((p) => p.id === (choix.palette ?? STYLES.find((s) => s.id === (choix.style ?? "beige_or"))!.palette))!;
    [pal.nappe, pal.fleurs, pal.accent, pal.deco].forEach((col, i) => { c.fillStyle = col; c.beginPath(); c.arc(L / 2 - 90 + i * 60, y0 + 56, 20, 0, Math.PI * 2); c.fill(); c.strokeStyle = "rgba(255,255,255,.35)"; c.lineWidth = 2; c.stroke(); });
    // badges
    c.font = "500 26px Georgia, serif"; c.fillStyle = "#F0E8D6";
    const b = res.badges.length ? res.badges.join("  ·  ") : `${res.lieu}`;
    c.fillText(b, L / 2, y0 + 128);
    c.fillStyle = "#B9B09C"; c.font = "400 24px Georgia, serif";
    c.fillText(tr("Créé sur Heavent City · heaventagency.com"), L / 2, H - 46);
    return await new Promise<Blob>((ok, ko) => cv.toBlob((bl) => (bl ? ok(bl) : ko(new Error("png"))), "image/png"));
  } finally { URL.revokeObjectURL(url); }
}

export async function partagerOuTelecharger(blob: Blob, titre: string): Promise<"partage" | "telecharge"> {
  const fichier = new File([blob], "mon-evenement-heavent-city.png", { type: "image/png" });
  const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
  if (nav.share && nav.canShare?.({ files: [fichier] })) {
    try { await nav.share({ files: [fichier], title: titre, text: tr("Mon événement imaginé sur Heavent City") }); return "partage"; } catch (e) { if ((e as DOMException)?.name === "AbortError") return "partage"; }
  }
  const u = URL.createObjectURL(blob); const a = document.createElement("a");
  a.href = u; a.download = "mon-evenement-heavent-city.png"; document.body.appendChild(a); a.click(); a.remove();
  window.setTimeout(() => URL.revokeObjectURL(u), 4000);
  return "telecharge";
}
