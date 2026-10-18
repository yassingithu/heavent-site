// Logique du jeu, sans affichage : grille, placement, budget, missions, disposition proposée, sauvegarde.
import {
  AMBIANCES, Ambiance, BUDGET_DEFAUT, CENTRES_DE_TABLE, CleCouleur, LIMITES_INVITES, Lieu, MISSIONS, IdMission,
  TypeElement, TypeEvenement, defElement, libelle, placesDe,
} from "./config";

// ── État ────────────────────────────────────────────────────────────────────
export interface Reglages { type: TypeEvenement; invites: number; budget: number; lieu: Lieu; ambiance: Ambiance }
export interface Element { uid: string; type: TypeElement; x: number; y: number; tourne?: boolean; couleur?: string }
export interface Centres { actif: boolean; couleur?: string }
export interface Creation { reglages: Reglages; elements: Element[]; centres: Centres }

export const reglagesParDefaut = (): Reglages => ({
  type: "mariage", invites: LIMITES_INVITES.defaut, budget: BUDGET_DEFAUT, lieu: "salle", ambiance: "chic",
});
export const nouvelleCreation = (r: Reglages = reglagesParDefaut()): Creation => ({ reglages: r, elements: [], centres: { actif: false } });

let compteur = 0;
export const nouvelId = () => `e${Date.now().toString(36)}${(compteur++).toString(36)}`;

export const palette = (a: Ambiance) => AMBIANCES.find((x) => x.id === a)!.palette;

/** Couleur effective d'un élément (choix du visiteur, sinon couleur de l'ambiance). */
export function couleurDe(e: Element, ambiance: Ambiance): string | undefined {
  const cle = defElement(e.type).couleur;
  return cle ? e.couleur ?? palette(ambiance)[cle as CleCouleur] : undefined;
}

// ── Grille ──────────────────────────────────────────────────────────────────
/** Taille de la scène en cases, proportionnelle au nombre d'invités. */
export function tailleGrille(invites: number) {
  const tables = Math.ceil(invites / 10);
  const surface = tables * 4 * 1.7 + 46;
  const cols = Math.max(10, Math.round(Math.sqrt(surface * 1.3)));
  const rows = Math.max(8, Math.ceil(surface / cols));
  return { cols, rows };
}

export function emprise(e: Pick<Element, "type" | "tourne">) {
  const d = defElement(e.type);
  return e.tourne ? { w: d.h, h: d.w } : { w: d.w, h: d.h };
}

/** Vrai si l'élément tient dans la grille sans chevaucher un autre (on ignore `ignorer`). */
export function placeLibre(elements: Element[], cand: Pick<Element, "type" | "x" | "y" | "tourne">, cols: number, rows: number, ignorer?: string) {
  const { w, h } = emprise(cand);
  if (cand.x < 0 || cand.y < 0 || cand.x + w > cols || cand.y + h > rows) return false;
  return !elements.some((o) => {
    if (o.uid === ignorer) return false;
    const eo = emprise(o);
    return cand.x < o.x + eo.w && o.x < cand.x + w && cand.y < o.y + eo.h && o.y < cand.y + h;
  });
}

/** Première place libre, la plus proche possible d'un point cible (centre de la scène par défaut). */
export function trouverPlace(elements: Element[], type: TypeElement, cols: number, rows: number, cible?: { x: number; y: number }, tourne = false) {
  const { w, h } = emprise({ type, tourne });
  const c = cible ?? { x: (cols - w) / 2, y: (rows - h) / 2 };
  const candidats: { x: number; y: number; d: number }[] = [];
  for (let y = 0; y <= rows - h; y++) for (let x = 0; x <= cols - w; x++) candidats.push({ x, y, d: (x - c.x) ** 2 + (y - c.y) ** 2 });
  candidats.sort((a, b) => a.d - b.d);
  return candidats.find((p) => placeLibre(elements, { type, x: p.x, y: p.y, tourne }, cols, rows)) ?? null;
}

// ── Budget ──────────────────────────────────────────────────────────────────
export interface LigneBudget { libelle: string; quantite: number; fixe: number; parInvite: number; total: number; detail: string }

export function calculerBudget(c: Creation) {
  const { type, invites } = c.reglages;
  const parType = new Map<TypeElement, number>();
  c.elements.forEach((e) => parType.set(e.type, (parType.get(e.type) ?? 0) + 1));
  const lignes: LigneBudget[] = [];
  for (const [id, n] of parType) {
    const d = defElement(id);
    const fixe = d.prix * n;
    // Le coût par invité (repas, boissons, parts de gâteau) ne compte qu'une fois, même avec 2 buffets.
    const parInvite = d.prixParInvite ? d.prixParInvite * invites : 0;
    lignes.push({
      libelle: libelle(id, type).nom, quantite: n, fixe, parInvite, total: fixe + parInvite,
      detail: [`${n} × ${d.prix}`, d.prixParInvite ? `+ ${d.prixParInvite} × ${invites} invités` : ""].filter(Boolean).join(" "),
    });
  }
  const nbTables = (parType.get("table_ronde") ?? 0) + (parType.get("table_rect") ?? 0);
  if (c.centres.actif && nbTables) {
    const t = CENTRES_DE_TABLE.prixParTable * nbTables;
    lignes.push({ libelle: CENTRES_DE_TABLE.nom, quantite: nbTables, fixe: t, parInvite: 0, total: t, detail: `${nbTables} × ${CENTRES_DE_TABLE.prixParTable}` });
  }
  lignes.sort((a, b) => b.total - a.total);
  const total = lignes.reduce((s, l) => s + l.total, 0);
  const totalFixe = lignes.reduce((s, l) => s + l.fixe, 0);
  const totalParInvite = lignes.reduce((s, l) => s + l.parInvite, 0);
  const budget = c.reglages.budget;
  return { lignes, total, totalFixe, totalParInvite, budget, depassement: Math.max(0, total - budget), reste: Math.max(0, budget - total) };
}

export const placesPrevues = (c: Creation) => c.elements.reduce((s, e) => s + placesDe(e.type, c.reglages.type), 0);

// ── Missions ────────────────────────────────────────────────────────────────
export interface EtatMission { id: IdMission; titre: string; ok: boolean; aide: string }

export function evaluerMissions(c: Creation): EtatMission[] {
  const places = placesPrevues(c);
  const manque = Math.max(0, c.reglages.invites - places);
  const roles = new Set(c.elements.map((e) => defElement(e.type).role).filter(Boolean));
  const deco = roles.has("decoration") || (c.centres.actif && c.elements.some((e) => e.type === "table_ronde" || e.type === "table_rect"));
  const eclairage = roles.has("eclairage");
  const convivial = roles.has("convivial");
  const etat: Record<IdMission, { ok: boolean; aide: string }> = {
    places: { ok: manque === 0, aide: manque ? `Il manque ${manque} place${manque > 1 ? "s" : ""} (${places} / ${c.reglages.invites}).` : `${places} places pour ${c.reglages.invites} invités.` },
    ambiance: { ok: deco && eclairage, aide: deco && eclairage ? "Décoration et éclairage en place." : [!deco && "ajoutez une décoration (arche, fleurs ou centres de table)", !eclairage && "ajoutez un éclairage (guirlandes)"].filter(Boolean).join(" et ").replace(/^./, (s) => s.toUpperCase()) + "." },
    convivial: { ok: convivial, aide: convivial ? "Vos invités ont de quoi se retrouver." : "Ajoutez une piste, un DJ, un bar, un photobooth ou un lounge." },
  };
  return MISSIONS.map((m) => ({ id: m.id, titre: m.titre, ...etat[m.id] }));
}

// ── « Propose-moi une disposition » ─────────────────────────────────────────
/** Construit un aménagement cohérent, puis retire les extras si le budget est dépassé. */
export function proposerDisposition(r: Reglages): Creation {
  const { cols, rows } = tailleGrille(r.invites);
  const c = nouvelleCreation(r);
  const els = c.elements;
  const poser = (type: TypeElement, cible: { x: number; y: number }, tourne = false) => {
    const p = trouverPlace(els, type, cols, rows, cible, tourne);
    if (p) els.push({ uid: nouvelId(), type, x: p.x, y: p.y, tourne });
    return !!p;
  };
  const mx = cols / 2, my = rows / 2;
  const pro = r.type === "pro";
  // Fond de scène : table d'honneur (ou scène) au milieu du fond, arche au premier plan (entrée)
  poser("honneur", { x: mx - 1.5, y: 0 });
  if (!pro) poser("gateau", { x: mx + 2, y: 0 });
  poser("piste", { x: mx - 1.5, y: 2 });
  poser("dj", { x: mx - 1, y: 1 });
  poser("arche", { x: mx - 1, y: rows - 1 });
  poser("buffet", { x: 0, y: my - 0.5 }, true);
  poser("bar", { x: cols - 1, y: my - 1 }, true);
  poser("photobooth", { x: cols - 2, y: rows - 1 });
  poser("lounge", { x: 0, y: rows - 2 });
  poser("guirlandes", { x: 0, y: 0 }); poser("guirlandes", { x: cols - 1, y: 0 });
  if (r.invites > 80) { poser("guirlandes", { x: 0, y: rows - 1 }); poser("guirlandes", { x: cols - 1, y: rows - 1 }); }
  poser("fleurs", { x: mx - 3, y: 0 }); poser("fleurs", { x: mx + 3, y: 0 });
  // Tables autour de la piste jusqu'à avoir assez de places
  const besoin = () => r.invites - els.reduce((s, e) => s + placesDe(e.type, r.type), 0);
  while (besoin() > 0) {
    const type: TypeElement = besoin() <= 6 ? "table_rect" : "table_ronde";
    if (!poser(type, { x: mx - 1, y: my + 1 })) { if (!poser("table_rect", { x: mx - 1, y: my + 1 })) break; }
  }
  c.centres.actif = true;
  // Budget dépassé ? On retire d'abord les extras, jamais les tables ni le minimum des missions.
  const retirer = (type: TypeElement, garder = 0) => {
    while (calculerBudget(c).depassement > 0 && els.filter((e) => e.type === type).length > garder) {
      els.splice(els.map((e) => e.type).lastIndexOf(type), 1);
    }
  };
  for (const [t, g] of [["lounge", 0], ["photobooth", 0], ["fleurs", 0], ["arche", 0], ["gateau", 0], ["dj", 0], ["guirlandes", 1], ["bar", 0], ["buffet", 0]] as [TypeElement, number][]) retirer(t, g);
  if (calculerBudget(c).depassement > 0) c.centres.actif = false;
  if (calculerBudget(c).depassement > 0 && els.some((e) => e.type === "piste") && els.some((e) => e.type === "bar")) retirer("piste", 0);
  return c;
}

// ── Sauvegarde (jamais de coordonnées personnelles) ─────────────────────────
export const CLE_SAUVEGARDE = "heavent-jeu-evenement-v1";
export interface Sauvegarde { creation: Creation; etape: "jeu" | "recap"; enregistreLe: string }

export function sauvegarder(s: Omit<Sauvegarde, "enregistreLe">) {
  try { localStorage.setItem(CLE_SAUVEGARDE, JSON.stringify({ ...s, enregistreLe: new Date().toISOString() })); } catch { /* stockage indisponible */ }
}
export function lireSauvegarde(): Sauvegarde | null {
  try {
    const s = JSON.parse(localStorage.getItem(CLE_SAUVEGARDE) ?? "null");
    return s?.creation?.reglages && Array.isArray(s.creation.elements) ? s : null;
  } catch { return null; }
}
export function effacerSauvegarde() { try { localStorage.removeItem(CLE_SAUVEGARDE); } catch { /* */ } }
