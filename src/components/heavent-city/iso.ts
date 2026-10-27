/** Géométrie isométrique 2:1 et petites fonctions de couleur. Le sol est une grille de 10 × 10 cases. */
export const N = 10;
export const VB = { w: 800, h: 600 };
const CX = 400, CY = 190, DX = 32, DY = 16;

/** Point du sol (gx, gy) à la hauteur gz (en pixels) → coordonnées dans l'image */
export const X = (gx: number, gy: number) => CX + (gx - gy) * DX;
export const Y = (gx: number, gy: number, gz = 0) => CY + (gx + gy) * DY - gz;
export const pt = (gx: number, gy: number, gz = 0) => `${X(gx, gy).toFixed(1)},${Y(gx, gy, gz).toFixed(1)}`;
export const poly = (...p: [number, number, number?][]) => p.map(([a, b, c]) => pt(a, b, c ?? 0)).join(" ");
/** Profondeur pour l'ordre d'affichage : plus c'est grand, plus c'est devant */
export const prof = (gx: number, gy: number) => gx + gy;

/** Une ellipse au sol de rayon r (en cases) */
export const rx = (r: number) => r * DX * Math.SQRT2;
export const ry = (r: number) => r * DY * Math.SQRT2;

// ── Couleurs ────────────────────────────────────────────────────────────────
const hex = (c: string) => {
  const h = c.replace("#", "");
  const f = h.length === 3 ? h.split("").map((x) => x + x).join("") : h;
  return [parseInt(f.slice(0, 2), 16), parseInt(f.slice(2, 4), 16), parseInt(f.slice(4, 6), 16)];
};
export const rgb = (r: number, g: number, b: number) => `#${[r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("")}`;
export const melanger = (a: string, b: string, t: number) => {
  const [r1, g1, b1] = hex(a), [r2, g2, b2] = hex(b);
  return rgb(r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t);
};
export const assombrir = (c: string, t: number) => melanger(c, "#1d1410", t);
export const eclaircir = (c: string, t: number) => melanger(c, "#ffffff", t);
/** Luminosité perçue 0..1 */
export const clarte = (c: string) => { const [r, g, b] = hex(c); return (0.299 * r + 0.587 * g + 0.114 * b) / 255; };

/** Petit générateur pseudo-aléatoire reproductible (pour que la scène soit identique à chaque affichage) */
export function hasard(graine: number) {
  let s = graine >>> 0 || 1;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}
