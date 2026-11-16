import { useEffect, useState } from "react";

/**
 * Mesure d'audience Google (balise Google Ads) : elle ne se charge qu'après un « Accepter » explicite.
 * Tant que le visiteur n'a pas répondu, ou s'il refuse, aucune requête ne part vers Google.
 */
const CLE = "heavent-audience";
const ID_GOOGLE = "AW-11479101793";
const EVENEMENT = "heavent-audience";
const VALIDITE_MS = 395 * 24 * 3600 * 1000; // 13 mois, puis on redemande

export type ChoixAudience = "oui" | "non" | null;

// Si le navigateur bloque le stockage, le choix est gardé en mémoire tant que l'onglet reste ouvert
let memoire: ChoixAudience = null;

export const lireChoixAudience = (): ChoixAudience => {
  try {
    const brut = localStorage.getItem(CLE);
    if (brut) {
      const v = JSON.parse(brut) as { c?: string; t?: number };
      if ((v.c === "oui" || v.c === "non") && typeof v.t === "number" && Date.now() - v.t < VALIDITE_MS) return v.c;
    }
  } catch { /* stockage bloqué ou illisible */ }
  return memoire;
};

export function activerGoogle() {
  if (typeof document === "undefined" || document.getElementById("balise-google")) return;
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.gtag = function () { w.dataLayer.push(arguments); };
  w.gtag("js", new Date());
  w.gtag("config", ID_GOOGLE);
  const s = document.createElement("script");
  s.id = "balise-google";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${ID_GOOGLE}`;
  document.head.appendChild(s);
}

/** Supprime les cookies que la balise Google a pu déposer sur ce site. */
function effacerCookiesGoogle() {
  const hote = window.location.hostname;
  const domaines = [hote, `.${hote}`, `.${hote.replace(/^www\./, "")}`];
  document.cookie.split(";").map((c) => c.split("=")[0].trim()).filter((n) => /^(_gcl_.*|_gac_.*|_ga.*|_gid)$/.test(n)).forEach((nom) => {
    domaines.forEach((d) => { document.cookie = `${nom}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${d}`; });
    document.cookie = `${nom}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  });
}

/** Enregistre le choix. Refuser après avoir accepté efface les cookies Google et recharge la page. */
export function definirChoixAudience(choix: "oui" | "non") {
  const dejaCharge = !!document.getElementById("balise-google");
  memoire = choix;
  try { localStorage.setItem(CLE, JSON.stringify({ c: choix, t: Date.now() })); } catch { /* gardé en mémoire */ }
  if (choix === "oui") activerGoogle();
  else {
    effacerCookiesGoogle();
    if (dejaCharge) { window.location.reload(); return; }
  }
  window.dispatchEvent(new Event(EVENEMENT));
}

/** Choix en cours, mis à jour partout (bandeau, politique de confidentialité) dès qu'il change. */
export function useChoixAudience(): ChoixAudience {
  const [choix, setChoix] = useState<ChoixAudience>(lireChoixAudience);
  useEffect(() => {
    const maj = () => setChoix(lireChoixAudience());
    window.addEventListener(EVENEMENT, maj);
    return () => window.removeEventListener(EVENEMENT, maj);
  }, []);
  return choix;
}
