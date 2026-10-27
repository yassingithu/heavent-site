/** Où se trouve chaque chose dans la scène (cases du sol, 10 × 10). Modifier ici déplace l'élément partout. */
import type { OptionId } from "./donnees";

export const TABLES: [number, number][] = [[2.2, 4.2], [4.2, 4.4], [2.8, 6.6], [4.8, 6.8], [6.8, 6.3], [8.7, 5.9]];
export const HONNEUR = { gx: 1.1, gy: 1.5, w: 3, d: 1 };
export const ARCHE = { gx: 1.6, gy: 0.5, largeur: 2 };
export const MUR_FLEURS = { u0: 4.3, u1: 6.0, gy: 0.15 };
export const DJ = { gx: 6.3, gy: 0.4, w: 1.9, d: 0.9 };
export const SCENE_ORCHESTRE = { gx: 6.0, gy: 0.4, w: 3.2, d: 1.5 };
export const PISTE = { gx: 5.6, gy: 2.0, w: 3.2, d: 3.0 };
export const PHOTOBOOTH = { gx: 0.3, gy: 2.8, w: 0.8, d: 2.0 };
export const NAWAR = { gx: 0.3, gy: 5.0, w: 0.9, d: 2.2 };
export const BUFFET = { gx: 0.3, gy: 7.4, w: 0.9, d: 2.2 };
export const CANDY = { gx: 8.4, gy: 0.35, w: 1.5, d: 0.8 };
export const THE_BAR = { gx: 9.0, gy: 2.1, w: 0.8, d: 1.8 };
export const LIVRE_DOR: [number, number] = [1.7, 9.0];
export const SALON = { gx: 7.0, gy: 7.5, w: 2.6, d: 1.8 };
export const FONTAINE: [number, number] = [5.9, 9.0];
export const ALLEE = { gx: 2.6, gy: 7.7, w: 1.0, d: 2.3 };
export const PORTE = { gauche: 2.2, droite: 4.0, gy: 9.85 };
export const COMPTOIR: [number, number] = [4.5, 9.0];
export const PHOTOGRAPHE: [number, number] = [4.3, 2.9];
export const POSTES_LANTERNES: [number, number][] = [[0.9, 1.1], [5.5, 1.3], [3.3, 5.4], [9.6, 5.2]];
export const CANDELABRES: [number, number][] = [[4.7, 1.3], [9.5, 1.1], [1.5, 6.0], [9.6, 9.4]];
export const BOUQUETS: [number, number][] = [[2.0, 9.3], [4.2, 9.3]];
export const FEUX: [number, number][] = [[5.4, 3.0], [8.9, 3.0]];
export const HOTESSES: [number, number][] = [[2.9, 8.9], [3.4, 8.9]];
export const DEPART_INVITES: [number, number] = [3.1, 11.6];

/** Centre de chaque option dans la scène (sert au halo de mise en avant quand un choix change la scène) */
export const ANCRES: Partial<Record<OptionId | "accueil" | "musique" | "lumiere", [number, number]>> = {
  arche: [2.6, 0.9], fleurs: [3.1, 9.3], mur_fleurs: [5.2, 0.4],
  allee: [3.1, 8.8], fontaine: FONTAINE, petales: [5, 4], ciel_lanternes: [5, 3],
  piste: [7.2, 3.5], photobooth: [0.7, 3.8], nawar: [0.7, 6.1], buffet: [0.7, 8.5], candy_bar: [9.1, 0.8], livre_dor: LIVRE_DOR,
  feux_froids: [7.2, 3.2], photographe: PHOTOGRAPHE, salon: [8.3, 8.4], the_bar: [9.4, 3.0], brume: [5, 5],
  accueil: [3.1, 9.0], musique: [7.4, 1.0], lumiere: [5, 4],
};
