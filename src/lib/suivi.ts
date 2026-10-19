import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "@/integrations/supabase/client";

/**
 * Mesure d'audience maison, sans cookie et sans donnée personnelle : pages vues, provenance, appareil,
 * clics importants et demandes envoyées. Seuls un identifiant de session aléatoire (effacé à la fermeture
 * de l'onglet) et la provenance sont gardés dans sessionStorage. Les pages privées ne sont jamais comptées.
 */
const PRIVEES = ["/admin", "/auth", "/staff", "/mon-devis", "/mon-mariage", "/rsvp", "/admin-auth"];
export const pagePrivee = (chemin: string) => PRIVEES.some((p) => chemin === p || chemin.startsWith(p + "/") || chemin.startsWith(p + "-"));

const lire = (cle: string) => { try { return sessionStorage.getItem(cle); } catch { return null; } };
const ecrire = (cle: string, v: string) => { try { sessionStorage.setItem(cle, v); } catch { /* navigation privée */ } };

/** L'équipe (admin) et les robots ne sont pas comptés */
export function suiviActif() {
  if (typeof window === "undefined") return false;
  try { if (localStorage.getItem("heavent-ne-pas-compter") === "1") return false; } catch { /* */ }
  if (navigator.userAgent.includes("HeaventAdminApp")) return false;
  if (navigator.webdriver && !(window as any).__suiviTest) return false;
  if (/bot|crawl|spider|lighthouse|headless/i.test(navigator.userAgent) && !(window as any).__suiviTest) return false;
  return true;
}
export const nePlusCompterCetAppareil = () => { try { localStorage.setItem("heavent-ne-pas-compter", "1"); } catch { /* */ } };

function session() {
  let s = lire("hv-session");
  if (!s) { s = Math.random().toString(36).slice(2, 10) + Date.now().toString(36); ecrire("hv-session", s); }
  return s;
}

/** Provenance de la visite, fixée à la première page de la session */
function source() {
  const deja = lire("hv-source");
  if (deja) return deja;
  let s = "direct";
  try {
    const p = new URLSearchParams(window.location.search);
    const utm = (p.get("utm_source") || "").toLowerCase();
    const ref = document.referrer ? new URL(document.referrer).hostname.replace(/^www\.|^m\.|^l\./, "") : "";
    if (p.get("gclid") || p.get("gad_source") || (utm.includes("google") && /cpc|ads|paid/i.test(p.get("utm_medium") || ""))) s = "google-ads";
    else if (utm) s = utm.slice(0, 30);
    else if (!ref || ref === window.location.hostname.replace(/^www\./, "")) s = "direct";
    else if (/google\./.test(ref)) s = "google";
    else if (/instagram/.test(ref)) s = "instagram";
    else if (/facebook|fb\./.test(ref)) s = "facebook";
    else if (/whatsapp|wa\.me/.test(ref)) s = "whatsapp";
    else if (/tiktok/.test(ref)) s = "tiktok";
    else if (/linkedin|lnkd/.test(ref)) s = "linkedin";
    else if (/bing|yahoo|duckduckgo|ecosia/.test(ref)) s = "autre moteur";
    else s = ref.slice(0, 30);
  } catch { /* */ }
  ecrire("hv-source", s);
  return s;
}

let file: object[] = [];
let minuteur: number | undefined;
// Envoie ce qui reste en attente quand le visiteur quitte la page ou change d'application
if (typeof window !== "undefined") {
  window.addEventListener("pagehide", () => vider());
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") vider(); });
}
function vider() {
  if (!file.length) return;
  const lot = file.splice(0, 10);
  try {
    fetch(`${SUPABASE_URL}/rest/v1/rpc/suivi_enregistrer`, {
      method: "POST", keepalive: true,
      headers: { "Content-Type": "application/json", apikey: SUPABASE_PUBLISHABLE_KEY, Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}` },
      body: JSON.stringify({ p_evenements: lot }),
    }).catch(() => { /* hors ligne : tant pis */ });
  } catch { /* */ }
  if (file.length) vider();
}

export function suivre(type: "vue" | "clic" | "demande", nom?: string | null, chemin = typeof window !== "undefined" ? window.location.pathname : "/") {
  if (!suiviActif() || pagePrivee(chemin)) return;
  file.push({
    type, nom: nom ?? null, chemin: chemin.replace(/\/+$/, "") || "/", source: source(),
    appareil: window.matchMedia?.("(max-width: 767px)").matches ? "mobile" : "ordinateur",
    session: session(), langue: (document.documentElement.lang || navigator.language || "").slice(0, 2),
  });
  window.clearTimeout(minuteur);
  // Les clics partent tout de suite (on quitte souvent la page juste après), les vues sont groupées
  if (type === "vue") minuteur = window.setTimeout(vider, 800); else vider();
}

/** Nom du clic suivi pour un lien, ou null s'il n'est pas intéressant */
export function nomDuClic(a: HTMLAnchorElement): string | null {
  const perso = a.closest("[data-suivi]")?.getAttribute("data-suivi");
  if (perso) return perso;
  const href = a.getAttribute("href") || "";
  if (/wa\.me|whatsapp\.com/.test(href)) return "whatsapp";
  if (href.startsWith("tel:")) return "telephone";
  if (href.startsWith("mailto:")) return "email";
  if (/instagram\.com/.test(href)) return "instagram";
  if (/facebook\.com/.test(href)) return "facebook";
  if (/tiktok\.com/.test(href)) return "tiktok";
  const m = href.match(/^(?:https?:\/\/(?:www\.)?heaventagency\.com)?(\/devis-entreprise|\/devis-mariage|\/cree-ton-evenement|\/inscription-staff)/);
  if (m) return { "/devis-entreprise": "bouton devis entreprise", "/devis-mariage": "bouton devis mariage", "/cree-ton-evenement": "bouton jeu", "/inscription-staff": "bouton recrutement" }[m[1]]!;
  return null;
}
