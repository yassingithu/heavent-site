import { useTranslation } from "react-i18next";
import { TEXTES } from "./textesTraduits";

/**
 * Textes du site écrits directement en français dans le code : la clé est la phrase française,
 * la traduction anglaise et arabe se trouve dans textesTraduits.ts (vérifié par tests/i18n).
 * Usage : const x = useTexte(); x("Nos villes") ; x("{n} invités", { n: 120 })
 */
export type Langue = "fr" | "en" | "ar";
export const langueDe = (l?: string): Langue => (l?.startsWith("ar") ? "ar" : l?.startsWith("en") ? "en" : "fr");

export function traduire(fr: string, langue: Langue, v?: Record<string, string | number>) {
  const t = langue === "fr" ? fr : TEXTES[fr]?.[langue] ?? fr;
  return v ? t.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? "")) : t;
}

export function useTexte() {
  const { i18n } = useTranslation();
  const langue = langueDe(i18n.language);
  const x = (fr: string, v?: Record<string, string | number>) => traduire(fr, langue, v);
  x.langue = langue;
  return x;
}
