/**
 * Liste des objets déplaçables de la scène, calculée comme dans Scene.tsx (mêmes identifiants, mêmes emprises).
 * Fichier pur (sans three.js, sans prix) : sert à la scène 3D et peut être testé seul.
 */
import type { Rendu } from "../etat";
import { GABARITS, RAYON_TABLE, type Rect } from "../positions";

export type Genre = "ronde" | "rect" | "haute" | "honneur" | "arche" | "piste" | "buffet" | "nawar" | "generique";
export interface Objet3D { id: string; a: [number, number]; hw: number; hd: number; genre: Genre; /** hauteur indicative des objets génériques */ h?: number }

export function objetsDeplacables(r: Rendu): Objet3D[] {
  const P = r.salle.pos, o = r.options, N = r.salle.n, L: Objet3D[] = [];
  const centre = (id: string, x: number, y: number, hw: number, hd = hw, genre: Genre = "generique", h = 0.6) => L.push({ id, a: [x, y], hw, hd, genre, h });
  const boite = (id: string, b: { gx: number; gy: number; w: number; d: number }, genre: Genre = "generique", h = 0.6) => centre(id, b.gx + b.w / 2, b.gy + b.d / 2, b.w / 2, b.d / 2, genre, h);
  const gab = GABARITS[r.tables];
  if (r.tables !== "conference") r.salle.tables.forEach(([gx, gy], i) => centre(`t${i}`, gx, gy, gab.dx, gab.dy, r.tables === "rondes" ? "ronde" : r.tables === "rectangulaires" ? "rect" : "haute"));
  r.salle.hautes.forEach(([gx, gy], i) => centre(`th${i}`, gx, gy, GABARITS.hautes.dx, GABARITS.hautes.dy, "haute"));
  if (r.type !== "pro" && r.type !== "conference" && r.tables !== "hautes") boite("honneur", P.HONNEUR, "honneur");
  if (o.has("arche")) centre("arche", P.ARCHE.gx + P.ARCHE.largeur / 2, P.ARCHE.gy + 0.4, P.ARCHE.largeur / 2, 0.4, "arche");
  if (o.has("amariya")) centre("amariya", P.AMARIYA[0] + 1.15, P.AMARIYA[1] + 0.7, 1.15, 0.7, "generique", 1.1);
  if (o.has("fauteuils")) centre("fauteuils", P.FAUTEUILS[0] + 1, P.FAUTEUILS[1] + 0.6, 1, 0.6, "generique", 0.8);
  if (o.has("neggafa")) centre("neggafa", P.NEGGAFA[0], P.NEGGAFA[1], 0.45, 0.45, "generique", 0.9);
  if (o.has("gateau")) centre("gateau", P.GATEAU[0], P.GATEAU[1], 0.5, 0.5, "generique", 0.9);
  if (o.has("enfants")) centre("enfants", P.ENFANTS[0] + 1.2, P.ENFANTS[1] + 1.0, 1.2, 1.0, "generique", 0.4);
  if (o.has("henne")) centre("henne", P.HENNE[0] + 1.1, P.HENNE[1] + 1.1, 1.1, 1.1, "generique", 0.5);
  if (o.has("podium")) boite("estrade", P.ESTRADE, "generique", 0.3);
  if (o.has("table_intervenants")) boite("interv", P.INTERVENANTS, "generique", 0.5);
  if (o.has("micros")) P.MICROS.forEach(([gx, gy], i) => centre(`mic${i}`, gx, gy, 0.3, 0.3, "generique", 1.2));
  if (o.has("regie")) centre("regie", P.REGIE[0] + 0.9, P.REGIE[1] + 0.4, 0.9, 0.4, "generique", 0.6);
  if (o.has("buffet_sandwichs")) { const B = P.SANDWICHS, long = B[0] <= N - 2, w = long ? 2.6 : 0.9, d = long ? 0.9 : 2.6; centre("sandw", B[0] + w / 2, B[1] + d / 2, w / 2, d / 2, "buffet"); }
  if (r.musiques.includes("dj")) boite("dj", P.DJ, "generique", 0.7);
  if (r.musiques.includes("orchestre")) boite("orch", P.SCENE_ORCHESTRE, "generique", 0.3);
  if (r.musiques.includes("troupe")) centre("troupe", P.TROUPE[0] + 0.5, P.TROUPE[1] + 0.5, 0.6, 0.5, "generique", 1);
  if (r.musiques.includes("playlist")) centre("enceintes", (P.ENCEINTES[0][0] + P.ENCEINTES[1][0]) / 2, 0.75, 0.25, 0.25, "generique", 1.1);
  if (r.musiques.includes("acoustique")) centre("acoustique", P.ACOUSTIQUE[0] + 0.5, P.ACOUSTIQUE[1] + 0.5, 0.5, 0.5, "generique", 0.9);
  if (o.has("photobooth")) boite("photobooth", P.PHOTOBOOTH, "generique", 1.6);
  if (o.has("nawar")) boite("nawar", P.NAWAR, "nawar");
  if (o.has("buffet")) boite("buffet", P.BUFFET, "buffet");
  if (o.has("candy_bar")) boite("candy", P.CANDY, "generique", 0.7);
  if (o.has("the_bar")) boite("the", P.THE_BAR, "generique", 0.7);
  if (o.has("livre_dor")) centre("livre", P.LIVRE_DOR[0], P.LIVRE_DOR[1], 0.5, 0.5, "generique", 0.7);
  if (o.has("salon")) boite("salon", P.SALON, "generique", 0.5);
  if (o.has("fontaine")) centre("fontaine", P.FONTAINE[0], P.FONTAINE[1], 0.9, 0.9, "generique", 0.7);
  if (o.has("photographe")) centre("photographe", P.PHOTOGRAPHE[0], P.PHOTOGRAPHE[1], 0.5, 0.5, "generique", 1);
  if (o.has("piste")) boite("piste", P.PISTE, "piste");
  return L;
}

const compatibles = (a: string, b: string) => [a, b].includes("piste") && [a, b].some((x) => x === "troupe" || x.startsWith("feu"));

/** L'objet `id`, décalé de (dx, dy) cases, toucherait-il un autre objet ? (même règle que dans Scene.tsx) */
export function chevauche(id: string, dx: number, dy: number, liste: Objet3D[], r: Rendu): boolean {
  const base = liste.find((x) => x.id === id); if (!base) return false;
  const m = 0.04;
  const a = { x0: base.a[0] - base.hw + dx, y0: base.a[1] - base.hd + dy, x1: base.a[0] + base.hw + dx, y1: base.a[1] + base.hd + dy };
  const touche = (b: { x0: number; y0: number; x1: number; y1: number }) => a.x0 < b.x1 - m && b.x0 < a.x1 - m && a.y0 < b.y1 - m && b.y0 < a.y1 - m;
  for (const e of liste) {
    if (e.id === id || compatibles(id, e.id)) continue;
    const [ox, oy] = r.deplacements[e.id] ?? [0, 0];
    if (touche({ x0: e.a[0] - e.hw + ox, y0: e.a[1] - e.hd + oy, x1: e.a[0] + e.hw + ox, y1: e.a[1] + e.hd + oy })) return true;
  }
  const mobiles = new Set(liste.map((x) => x.id));
  for (const p of r.salle.pos.obstacles as readonly Rect[]) {
    if (/^(pl|cd|enc|feu)\d/.test(p.id) || mobiles.has(p.id) || compatibles(id, p.id)) continue;
    if (touche(p)) return true;
  }
  return false;
}
export { RAYON_TABLE };
