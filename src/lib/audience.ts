/**
 * Mesure d'audience Google (balise Google Ads) : elle ne se charge qu'après un « Accepter » explicite.
 * Tant que le visiteur n'a pas répondu, ou s'il refuse, aucune requête ne part vers Google.
 */
const CLE = "heavent-audience";
const ID_GOOGLE = "AW-11479101793";

export type ChoixAudience = "oui" | "non" | null;

export const lireChoixAudience = (): ChoixAudience => {
  try {
    const v = localStorage.getItem(CLE);
    return v === "oui" || v === "non" ? v : null;
  } catch {
    return null; // stockage bloqué : on redemande à chaque visite, sans rien charger
  }
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

export function enregistrerChoixAudience(choix: "oui" | "non") {
  try { localStorage.setItem(CLE, choix); } catch { /* sans mémoire : le choix vaut pour cette page seulement */ }
  if (choix === "oui") activerGoogle();
}

/** Permet de changer d'avis : efface le choix et recharge la page, le bandeau réapparaît et rien n'est chargé. */
export function reinitialiserChoixAudience() {
  try { localStorage.removeItem(CLE); } catch { /* rien à effacer */ }
  window.location.reload();
}
