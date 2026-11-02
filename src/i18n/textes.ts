import { useTranslation } from "react-i18next";

/**
 * Textes du site écrits directement en français dans le code : la clé est la phrase française,
 * la traduction anglaise et arabe se trouve dans textesTraduits.ts (vérifié par tests/i18n).
 * Usage : const x = useTexte(); x("Nos villes") ; x("{n} invités", { n: 120 })
 */
/** Traductions EN/AR des textes du code : chargées à la demande (le français, langue d'origine, n'en a pas besoin). */
let TEXTES: Record<string, { en: string; ar: string }> = {};
export async function chargerTextes() { if (!Object.keys(TEXTES).length) TEXTES = (await import("./textesTraduits")).TEXTES; }

export type Langue = "fr" | "en" | "ar";
export const langueDe = (l?: string): Langue => (l?.startsWith("ar") ? "ar" : l?.startsWith("en") ? "en" : "fr");

/** Typographie française : espace insécable avant « : ; ! ? » et à l'intérieur des guillemets (jamais de ponctuation seule en début de ligne). */
const insecables = (t: string) => t.replace(/ ([:;!?»])/g, " $1").replace(/« /g, "« ");

export function traduire(fr: string, langue: Langue, v?: Record<string, string | number>) {
  const t = langue === "fr" ? insecables(fr) : TEXTES[fr]?.[langue] ?? fr;
  return v ? t.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? "")) : t;
}

export function useTexte(forcer?: "fr" | "en" | "ar") {
  const { i18n } = useTranslation();
  const langue = forcer ?? langueDe(i18n.language);
  const x = (fr: string, v?: Record<string, string | number>) => traduire(fr, langue, v);
  x.langue = langue;
  return x;
}
