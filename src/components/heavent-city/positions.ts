/** Où se trouve chaque chose dans la scène (cases du sol, 12 × 12). Modifier ici déplace l'élément partout. */
import type { OptionId } from "./donnees";

/** 12 tables en 4 colonnes × 3 rangées, avec une allée centrale ; l'ordre de la liste = l'ordre dans lequel elles apparaissent */
const COLS = [2.3, 5.5, 8.0, 10.5], RANGS = [5.0, 7.15, 9.3];
export const TABLES: [number, number][] = ([[1, 1], [2, 1], [1, 0], [2, 0], [1, 2], [2, 2], [0, 1], [3, 1], [0, 0], [3, 0], [0, 2], [3, 2]] as const).map(([c, r]) => [COLS[c], RANGS[r]]);
export const RAYON_TABLE = 0.52;
export const HONNEUR = { gx: 1.3, gy: 1.8, w: 3.4, d: 1.1 };
export const ARCHE = { gx: 1.9, gy: 0.5, largeur: 2.2 };
export const MUR_FLEURS = { u0: 5.2, u1: 7.1, gy: 0.15 };
export const DJ = { gx: 7.6, gy: 0.5, w: 2.1, d: 1.0 };
export const SCENE_ORCHESTRE = { gx: 7.2, gy: 0.5, w: 3.8, d: 1.5 };
/** Le DJ se décale quand un orchestre occupe déjà le fond de la salle */
export const DJ_AVEC_ORCHESTRE = { gx: 5.0, gy: 0.5, w: 1.8, d: 1.0 };
export const PISTE = { gx: 6.6, gy: 2.3, w: 3.8, d: 1.7 };
export const PHOTOBOOTH = { gx: 0.3, gy: 3.3, w: 0.8, d: 2.1 };
export const NAWAR = { gx: 0.3, gy: 5.9, w: 0.9, d: 2.3 };
export const BUFFET = { gx: 0.3, gy: 8.7, w: 0.9, d: 2.4 };
export const CANDY = { gx: 10.0, gy: 0.4, w: 1.6, d: 0.9 };
export const THE_BAR = { gx: 10.9, gy: 2.6, w: 0.8, d: 1.9 };
export const LIVRE_DOR: [number, number] = [1.8, 11.0];
export const SALON = { gx: 8.1, gy: 10.55, w: 3.0, d: 1.3 };
export const FONTAINE: [number, number] = [6.5, 11.1];
export const ALLEE = { gx: 3.45, gy: 4.6, w: 0.9, d: 7.2 };
export const PORTE = { gauche: 2.8, droite: 5.0, gy: 11.85 };
export const COMPTOIR: [number, number] = [5.3, 11.1];
export const PHOTOGRAPHE: [number, number] = [5.2, 3.5];
export const POSTES_LANTERNES: [number, number][] = [[1.0, 1.3], [6.5, 1.5], [3.9, 4.2], [11.6, 4.8]];
export const CANDELABRES: [number, number][] = [[5.6, 1.5], [11.4, 1.3], [1.4, 4.4], [11.5, 11.3]];
export const BOUQUETS: [number, number][] = [[2.3, 11.3], [5.5, 11.3]];
export const FEUX: [number, number][] = [[6.3, 4.2], [10.9, 4.2]];
export const HOTESSES: [number, number][] = [[3.3, 11.0], [4.5, 11.0]];
export const DEPART_INVITES: [number, number] = [3.9, 13.9];

/** Centre de chaque option dans la scène (sert au halo de mise en avant quand un choix change la scène) */
export const ANCRES: Partial<Record<OptionId | "accueil" | "musique" | "lumiere", [number, number]>> = {
  arche: [3.0, 1.0], fleurs: [3.9, 11.3], mur_fleurs: [6.1, 0.5],
  allee: [3.9, 8.5], fontaine: FONTAINE, petales: [6, 5], ciel_lanternes: [6, 4],
  piste: [8.5, 3.1], photobooth: [0.7, 4.3], nawar: [0.7, 7.0], buffet: [0.7, 9.9], candy_bar: [10.8, 0.9], livre_dor: LIVRE_DOR,
  feux_froids: [8.5, 3.1], photographe: PHOTOGRAPHE, salon: [9.6, 11.2], the_bar: [11.3, 3.5], brume: [6, 6],
  accueil: [3.9, 11.0], musique: [8.9, 1.2], lumiere: [6, 5],
};
