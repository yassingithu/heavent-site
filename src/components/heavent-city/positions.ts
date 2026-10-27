/**
 * Où se trouve chaque chose dans la scène (cases du sol). La salle S'AGRANDIT automatiquement avec le nombre de
 * tables : `dimensionner()` choisit la taille (de 12 × 12 à 26 × 26 cases) et la place des tables ;
 * `positions(n, ax)` place tout le reste (ce qui touche le mur du fond ou le mur de gauche ne bouge pas,
 * ce qui touche la droite ou l'avant suit la taille de la salle).
 */
import type { OptionId, TableId } from "./donnees";

export const N_MIN = 12, N_MAX = 26;
/** Encombrement d'une table avec ses chaises : pas entre deux tables (px, py) et demi-largeur / demi-profondeur */
export const GABARITS: Record<TableId, { px: number; py: number; dx: number; dy: number }> = {
  rondes: { px: 2.5, py: 2.15, dx: 0.95, dy: 0.95 },
  rectangulaires: { px: 2.6, py: 1.95, dx: 1.0, dy: 0.9 },
  hautes: { px: 1.45, py: 1.4, dx: 0.55, dy: 0.55 },
};
export const RAYON_TABLE = 0.52;

export interface Salle { n: number; ax: number; tables: [number, number][]; capacite: number }

function grille(n: number, type: TableId) {
  const g = GABARITS[type];
  const cols = Math.max(1, Math.floor((n - 0.5 - 1.3 - 2 * g.dx - 0.7) / g.px) + 1);
  const rows = Math.max(1, Math.floor((n - 5.75 - 2 * g.dy) / g.py) + 1);
  const x0 = 1.3 + g.dx, y0 = 4.0 + g.dy;
  // une allée un peu plus large entre la 1re et la 2e colonne : c'est l'allée de l'entrée
  const xs = Array.from({ length: cols }, (_, c) => (c === 0 ? x0 : x0 + g.px + 0.7 + (c - 1) * g.px));
  const ys = Array.from({ length: rows }, (_, r) => y0 + r * g.py);
  return { cols, rows, xs, ys };
}

/** Taille de la salle et emplacement des `nb` tables (les premières posées sont celles du centre) */
export function dimensionner(nb: number, type: TableId): Salle {
  let n = N_MIN, gr = grille(n, type);
  while (gr.cols * gr.rows < nb && n < N_MAX) { n += 1; gr = grille(n, type); }
  const cx = (gr.xs[0] + gr.xs[gr.cols - 1]) / 2, cy = (gr.ys[0] + gr.ys[gr.rows - 1]) / 2;
  const cases: { x: number; y: number; d: number }[] = [];
  for (const y of gr.ys) for (const x of gr.xs) cases.push({ x, y, d: Math.hypot(x - cx, (y - cy) * 1.2) });
  cases.sort((a, b) => a.d - b.d || a.y - b.y || a.x - b.x);
  const ax = gr.cols >= 2 ? (gr.xs[0] + gr.xs[1]) / 2 : 3.9;
  return { n, ax, tables: cases.slice(0, nb).map((c) => [c.x, c.y] as [number, number]), capacite: gr.cols * gr.rows };
}

export function positions(n: number, ax: number) {
  const pisteW = 3.8 + 0.45 * (n - 12);
  const PISTE = { gx: n - 1.6 - pisteW, gy: 2.3, w: pisteW, d: 1.7 };
  const FONTAINE: [number, number] = [n - 5.5, n - 0.9];
  const LIVRE_DOR: [number, number] = [1.8, n - 1.0];
  const COMPTOIR: [number, number] = [n - 6.7, n - 0.9];
  const PHOTOGRAPHE: [number, number] = [5.2, 3.5];
  const SALON = { gx: n - 3.9, gy: n - 1.45, w: 3.0, d: 1.3 };
  const HONNEUR = { gx: 1.3, gy: 1.8, w: 3.4, d: 1.1 };
  const ARCHE = { gx: 1.9, gy: 0.5, largeur: 2.2 };
  const MUR_FLEURS = { u0: 5.2, u1: 7.1, gy: 0.15 };
  const DJ = { gx: n - 4.4, gy: 0.5, w: 2.1, d: 1.0 };
  const SCENE_ORCHESTRE = { gx: n - 4.8, gy: 0.5, w: 3.8, d: 1.5 };
  const DJ_AVEC_ORCHESTRE = { gx: 5.0, gy: 0.5, w: 1.8, d: 1.0 };
  const PHOTOBOOTH = { gx: 0.3, gy: 3.3, w: 0.8, d: 2.1 };
  const NAWAR = { gx: 0.3, gy: 5.9, w: 0.9, d: 2.3 };
  const BUFFET = { gx: 0.3, gy: 8.7, w: 0.9, d: 2.4 };
  const CANDY = { gx: n - 2.0, gy: 0.4, w: 1.6, d: 0.9 };
  const THE_BAR = { gx: n - 1.1, gy: 2.6, w: 0.8, d: 1.9 };
  const TROUPE: [number, number] = [PISTE.gx + 0.8, 3.4];
  const ACOUSTIQUE: [number, number] = [n - 4.4, 1.3];
  const ENCEINTES: [number, number][] = [[n - 5.2, 0.5], [n - 1.0, 0.5]];
  const ALLEE = { gx: ax - 0.45, gy: 4.6, w: 0.9, d: n - 4.8 };
  const PORTE = { gauche: ax - 1.1, droite: ax + 1.1, gy: n - 0.15 };
  const POSTES_LANTERNES: [number, number][] = [[1.0, 1.3], [n - 5.5, 1.5], [ax, 4.2], [n - 0.4, 4.8]];
  const CANDELABRES: [number, number][] = [[5.6, 1.5], [n - 0.6, 1.3], [1.4, 4.4], [n - 0.5, n - 0.7]];
  const BOUQUETS: [number, number][] = [[ax - 1.6, n - 0.7], [ax + 1.6, n - 0.7]];
  const FEUX: [number, number][] = [[PISTE.gx - 0.3, 4.2], [PISTE.gx + PISTE.w + 0.5, 4.2]];
  const HOTESSES: [number, number][] = [[ax - 0.6, n - 1.0], [ax + 0.6, n - 1.0]];
  const MAITRE_HOTEL: [number, number] = [ax + 0.1, n - 3.4], HOTESSE_3: [number, number] = [ax - 1.6, n - 3.4];
  const DEPART_INVITES: [number, number] = [ax, n + 1.9];
  /** Centre de chaque option (halo de mise en avant quand un choix change la scène) */
  const ANCRES: Partial<Record<OptionId | "accueil" | "musique" | "lumiere", [number, number]>> = {
    arche: [3.0, 1.0], fleurs: [ax, n - 0.7], mur_fleurs: [6.1, 0.5],
    allee: [ax, n / 2 + 2], fontaine: FONTAINE, petales: [n / 2, n / 2 - 1], ciel_lanternes: [n / 2, n / 2 - 2],
    piste: [PISTE.gx + PISTE.w / 2, 3.1], photobooth: [0.7, 4.3], nawar: [0.7, 7.0], buffet: [0.7, 9.9], candy_bar: [n - 1.2, 0.9], livre_dor: LIVRE_DOR,
    feux_froids: [PISTE.gx + PISTE.w / 2, 3.1], photographe: PHOTOGRAPHE, salon: [SALON.gx + 1.5, SALON.gy + 0.6], the_bar: [n - 0.7, 3.5], brume: [n / 2, n / 2],
    accueil: [ax, n - 1.0], musique: [n - 3.1, 1.2], lumiere: [n / 2, n / 2 - 1],
  };
  return {
    PISTE, FONTAINE, LIVRE_DOR, COMPTOIR, PHOTOGRAPHE, SALON, HONNEUR, ARCHE, MUR_FLEURS, DJ, SCENE_ORCHESTRE, DJ_AVEC_ORCHESTRE, PHOTOBOOTH, NAWAR, BUFFET,
    CANDY, THE_BAR, TROUPE, ACOUSTIQUE, ENCEINTES, ALLEE, PORTE, POSTES_LANTERNES, CANDELABRES, BOUQUETS, FEUX, HOTESSES, MAITRE_HOTEL, HOTESSE_3, DEPART_INVITES, ANCRES,
  };
}
