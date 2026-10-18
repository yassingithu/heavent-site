/**
 * Langue du jeu : le français est le texte de référence ; l'anglais et l'arabe viennent de traductions.ts.
 * tr("Texte en français avec {variable}", { variable: 3 }) → texte dans la langue du site.
 * Les demandes envoyées à l'agence restent toujours en français (voir enFrancais).
 */
import { TRADUCTIONS } from "./traductions";

export type Langue = "fr" | "en" | "ar";
let courante: Langue = "fr";

export const definirLangue = (l?: string | null) => {
  courante = l?.startsWith("ar") ? "ar" : l?.startsWith("en") ? "en" : "fr";
};
export const langue = () => courante;
export const estRtl = () => courante === "ar";

/** Locale pour les dates ; les nombres gardent des chiffres latins (usage au Maroc). */
export const localeDates = () => (courante === "ar" ? "ar-MA" : courante === "en" ? "en-GB" : "fr-FR");
export const localeNombres = () => (courante === "en" ? "en-US" : "fr-FR");

export function tr(fr: string, v?: Record<string, string | number>): string {
  const t = courante === "fr" ? fr : TRADUCTIONS[fr]?.[courante] ?? fr;
  return v ? t.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? "")) : t;
}

/** Exécute fn en français (texte destiné à l'agence), puis revient à la langue du visiteur. */
export function enFrancais<T>(fn: () => T): T {
  const avant = courante;
  courante = "fr";
  try { return fn(); } finally { courante = avant; }
}
