/**
 * Langue du jeu : le français est le texte de référence ; l'anglais et l'arabe viennent de traductions.ts.
 *   tr("Texte en français avec {variable}", { variable: 3 })  → texte dans la langue du site.
 *   traduit([...])  → liste de données dont les textes affichés (nom, phrase, titre…) se traduisent à la lecture.
 * Les demandes envoyées à l'agence restent TOUJOURS en français (voir enFrancais).
 */
import { TRADUCTIONS } from "./traductions";

export type Langue = "fr" | "en" | "ar";
let courante: Langue = "fr";

export const definirLangue = (l?: string | null) => {
  courante = l?.startsWith("ar") ? "ar" : l?.startsWith("en") ? "en" : "fr";
};
export const langue = () => courante;
export const estRtl = () => courante === "ar";

/** Locale pour les dates ; les nombres gardent des chiffres latins. */
export const localeDates = () => (courante === "ar" ? "ar-MA" : courante === "en" ? "en-GB" : "fr-FR");

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

/** Champs de texte affiché (les identifiants, catalogues et libellés destinés à l'agence ne sont jamais traduits) */
const CHAMPS = new Set(["nom", "phrase", "court", "titre", "message", "effet", "article", "nomPlaceholder"]);
/** Enveloppe chaque objet d'une liste (ou d'un dictionnaire de listes) : ses champs de texte sont traduits au moment où on les lit. */
export function traduit<T>(donnees: T): T {
  if (Array.isArray(donnees)) {
    return donnees.map((o) => (o && typeof o === "object" ? new Proxy(o as object, {
      get: (cible, prop, recu) => {
        const v = Reflect.get(cible, prop, recu);
        if (typeof prop !== "string") return v;
        if (CHAMPS.has(prop) && typeof v === "string") return tr(v);
        if (prop === "reponses" && Array.isArray(v)) return traduit(v);
        return v;
      },
    }) : o)) as unknown as T;
  }
  if (donnees && typeof donnees === "object") return Object.fromEntries(Object.entries(donnees).map(([k, v]) => [k, traduit(v)])) as T;
  return donnees;
}
