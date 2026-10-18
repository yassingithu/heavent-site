// Partage d'une création par lien : la création (sans aucune coordonnée) est encodée dans l'adresse,
// après le « # » — elle n'est donc jamais envoyée au serveur.
import { AMBIANCES, CATALOGUE, LIEUX, LIMITES_INVITES, TYPES_EVENEMENT, TypeElement } from "./config";
import { Creation, Element, nouvelId, nouvelleCreation, tailleGrille, placeLibre } from "./logique";

const TYPES_EL = CATALOGUE.map((d) => d.id);
const hex = (c?: string) => (c && /^#[0-9a-f]{6}$/i.test(c) ? c.slice(1) : 0);
const deHex = (h: unknown) => (typeof h === "string" && /^[0-9a-f]{6}$/i.test(h) ? `#${h}` : undefined);

const b64 = (s: string) => btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const deB64 = (s: string) => atob(s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4));

export function encoderCreation(c: Creation): string {
  const r = c.reglages;
  const donnees = {
    v: 1,
    r: [TYPES_EVENEMENT.findIndex((t) => t.id === r.type), r.invites, r.budget, LIEUX.findIndex((l) => l.id === r.lieu), AMBIANCES.findIndex((a) => a.id === r.ambiance)],
    e: c.elements.map((e) => [TYPES_EL.indexOf(e.type), e.x, e.y, e.tourne ? 1 : 0, hex(e.couleur)]),
    c: [c.centres.actif ? 1 : 0, hex(c.centres.couleur)],
  };
  return b64(JSON.stringify(donnees));
}

/** Relit une création partagée ; renvoie null si le lien est abîmé ou invalide. */
export function decoderCreation(code: string): Creation | null {
  try {
    const d = JSON.parse(deB64(code));
    if (d?.v !== 1 || !Array.isArray(d.r) || !Array.isArray(d.e) || d.e.length > 400) return null;
    const [t, invites, budget, l, a] = d.r.map(Number);
    if (!TYPES_EVENEMENT[t] || !LIEUX[l] || !AMBIANCES[a]) return null;
    const c = nouvelleCreation({
      type: TYPES_EVENEMENT[t].id, lieu: LIEUX[l].id, ambiance: AMBIANCES[a].id,
      invites: Math.min(LIMITES_INVITES.max, Math.max(LIMITES_INVITES.min, Math.round(invites) || LIMITES_INVITES.defaut)),
      budget: Math.max(0, Math.round(budget) || 0),
    });
    const g = tailleGrille(c.reglages.invites);
    const cols = g.cols + 20, rows = g.rows + 20; // marge : la grille s'adapte ensuite aux éléments
    for (const x of d.e) {
      const type = TYPES_EL[Number(x[0])] as TypeElement | undefined;
      if (!type) continue;
      const el: Element = { uid: nouvelId(), type, x: Math.round(Number(x[1])), y: Math.round(Number(x[2])), tourne: x[3] === 1, couleur: deHex(x[4]) };
      if (el.x >= 0 && el.y >= 0 && placeLibre(c.elements, el, cols, rows)) c.elements.push(el);
    }
    c.centres = { actif: d.c?.[0] === 1, couleur: deHex(d.c?.[1]) };
    return c;
  } catch {
    return null;
  }
}

export const CLE_LIEN = "creation";
export const lienPartage = (c: Creation) => `${window.location.origin}/cree-ton-evenement#${CLE_LIEN}=${encoderCreation(c)}`;

/** Création présente dans l'adresse actuelle (#creation=…), sinon null. */
export function creationDansLien(): Creation | null {
  const m = window.location.hash.match(new RegExp(`${CLE_LIEN}=([A-Za-z0-9_-]+)`));
  return m ? decoderCreation(m[1]) : null;
}
export function oublierLien() {
  if (window.location.hash) history.replaceState(null, "", window.location.pathname + window.location.search);
}
