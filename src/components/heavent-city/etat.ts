/**
 * État du jeu — structuré, sérialisable et totalement indépendant du rendu visuel.
 * Le rendu (Scene.tsx) ne fait que LIRE ce qui est calculé ici ; il ne contient aucune règle.
 * Aucun montant n'existe dans cet état.
 */
import { dimensionner, type Salle } from "./positions";
import { tr } from "./langue";
import {
  ACCUEILS, BADGES, DECORS, EXPERIENCES, INVITES, LIEUX, LUMIERES, MISSIONS, MUSIQUES, PALETTES, STYLES, TYPES, disponiblePour, infoOption, infoTable, reservable,
  type AccueilId, type LieuId, type LumiereId, type MusiqueId, type OptionId, type PaletteId, type StyleId, type TableId, type TypeEvt,
} from "./donnees";

export type Phase = "accueil" | "ville" | "scene" | "final";

/** Tout ce que le joueur a CHOISI (sert à l'annulation et à la sauvegarde) */
export interface Choix {
  type: TypeEvt | null;
  nomEvt: string;
  ville: string;
  invites: number;
  date: string;
  dateInconnue: boolean;
  lieu: LieuId | null;
  style: StyleId | null;
  palette: PaletteId | null;
  lumiere: LumiereId | null;
  /** plusieurs musiques possibles dans la même soirée (ex. orchestre + troupe folklorique) */
  musiques: MusiqueId[];
  /** plusieurs accueils possibles ensemble (ex. thé de bienvenue + hôtesses) */
  accueils: AccueilId[];
  /** options ajoutées à la main, et options retirées alors qu'une mission les avait apportées */
  manuels: OptionId[];
  retires: OptionId[];
  /** mission → identifiant de la réponse, ou « passe » */
  missions: Record<string, string>;
  /** note validée par le visiteur, transmise à l'équipe (jamais la conversation avec l'assistant) */
  note: string;
  /** type de tables voulu (rondes par défaut) */
  tables: TableId;
  /** objets déplacés par le visiteur : identifiant → décalage en cases (jamais de prix) */
  deplacements: Record<string, [number, number]>;
}

export const CHOIX_VIDE: Choix = {
  type: null, nomEvt: "", ville: "", invites: INVITES.defaut, date: "", dateInconnue: false, lieu: null,
  style: null, palette: null, lumiere: null, musiques: [], accueils: [], manuels: [], retires: [], missions: {}, note: "", tables: "rondes", deplacements: {},
};

export interface Etat {
  phase: Phase;
  onglet: string;
  choix: Choix;
  passe: Choix[];
  futur: Choix[];
  /** le téléphone a-t-il déjà reçu le message d'accueil ? */
  accueilLu: boolean;
}

export const ETAT_INITIAL: Etat = { phase: "accueil", onglet: "style", choix: CHOIX_VIDE, passe: [], futur: [], accueilLu: false };

export type Action =
  | { t: "phase"; phase: Phase }
  | { t: "onglet"; onglet: string }
  | { t: "choisir"; patch: Partial<Choix> }
  | { t: "basculer"; option: OptionId }
  | { t: "mission"; mission: string; reponse: string }
  | { t: "deplacer"; id: string; dx: number; dy: number }
  | { t: "remettre" }
  | { t: "appliquer"; patch: Partial<Choix> }
  | { t: "annuler" }
  | { t: "refaire" }
  | { t: "recommencer" }
  | { t: "restaurer"; etat: Etat }
  | { t: "accueil_lu" };

const MAX_HISTORIQUE = 60;
const memes = (a: Choix, b: Choix) => JSON.stringify(a) === JSON.stringify(b);

function avecChoix(e: Etat, suivant: Choix): Etat {
  if (memes(e.choix, suivant)) return e;
  return { ...e, choix: suivant, passe: [...e.passe, e.choix].slice(-MAX_HISTORIQUE), futur: [] };
}

export function reducteur(e: Etat, a: Action): Etat {
  switch (a.t) {
    case "phase": return { ...e, phase: a.phase };
    case "onglet": return { ...e, onglet: a.onglet };
    case "accueil_lu": return { ...e, accueilLu: true };
    case "choisir": {
      let suivant = { ...e.choix, ...a.patch };
      // les tables changent de nombre ou de forme : leurs déplacements n'ont plus de sens
      if ((a.patch.invites !== undefined && a.patch.invites !== e.choix.invites) || (a.patch.tables !== undefined && a.patch.tables !== e.choix.tables)) {
        suivant = { ...suivant, deplacements: Object.fromEntries(Object.entries(suivant.deplacements).filter(([k]) => !/^t\d+$/.test(k))) };
      }
      return avecChoix(e, nettoyer(suivant));
    }
    case "appliquer": return avecChoix(e, nettoyer({ ...e.choix, ...a.patch }));
    case "basculer": {
      const c = e.choix;
      const actives = new Set(optionsActives(c));
      const m = new Set(c.manuels); const r = new Set(c.retires);
      if (actives.has(a.option)) { m.delete(a.option); r.add(a.option); } else { r.delete(a.option); m.add(a.option); }
      return avecChoix(e, { ...c, manuels: [...m], retires: [...r] });
    }
    case "deplacer": {
      const dep = { ...e.choix.deplacements };
      const dx = Math.round(a.dx * 20) / 20, dy = Math.round(a.dy * 20) / 20;
      if (Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01) delete dep[a.id]; else dep[a.id] = [dx, dy];
      return avecChoix(e, { ...e.choix, deplacements: dep });
    }
    case "remettre": return avecChoix(e, { ...e.choix, deplacements: {} });
    case "mission": {
      const mission = missionsDuType(e.choix.type).find((x) => x.id === a.mission);
      if (!mission) return e;
      const rep = mission.reponses.find((x) => x.id === a.reponse);
      const c = { ...e.choix, missions: { ...e.choix.missions, [a.mission]: rep ? rep.id : "passe" } };
      if (rep) {
        // La dernière décision l'emporte : la réponse remplace un choix manuel contradictoire
        if (rep.accueil) c.retires = c.retires.filter((o) => (o as string) !== rep.accueil);
        if (rep.lumiere) c.lumiere = null;
        if (rep.musique && !c.musiques.includes(rep.musique as MusiqueId)) c.musiques = [...c.musiques, rep.musique as MusiqueId];
        c.retires = c.retires.filter((o) => !rep.ajoute.includes(o));
      }
      return avecChoix(e, c);
    }
    case "annuler": {
      if (!e.passe.length) return e;
      const precedent = e.passe[e.passe.length - 1];
      return { ...e, choix: precedent, passe: e.passe.slice(0, -1), futur: [e.choix, ...e.futur] };
    }
    case "refaire": {
      if (!e.futur.length) return e;
      return { ...e, choix: e.futur[0], passe: [...e.passe, e.choix], futur: e.futur.slice(1) };
    }
    case "recommencer": return { ...ETAT_INITIAL, accueilLu: true, phase: "accueil" };
    case "restaurer": return a.etat;
  }
}

/** Retire de l'état ce qui n'est plus valable (type changé, lieu changé…) */
function nettoyer(c: Choix): Choix {
  const type = c.type;
  if (!type) return c;
  const garde = (id: string) => { const o = infoOption(id); return !!o && disponiblePour(o, type, c.lieu); };
  const invites = Math.min(INVITES.max, Math.max(INVITES.min, Math.round(Number(c.invites) || INVITES.defaut)));
  const musiques = (Array.isArray(c.musiques) ? c.musiques : []).filter(garde);
  const accueils = (Array.isArray(c.accueils) ? c.accueils : []).filter(garde);
  const tables: TableId = c.tables === "rectangulaires" || c.tables === "hautes" || (c.tables === "conference" && type === "pro") ? c.tables : "rondes";
  const dep: Record<string, [number, number]> = {};
  for (const [k, v] of Object.entries(c.deplacements && typeof c.deplacements === "object" ? c.deplacements : {})) {
    if (/^[a-z0-9_]{1,24}$/.test(k) && Array.isArray(v) && Number.isFinite(v[0]) && Number.isFinite(v[1])) dep[k] = [Math.max(-30, Math.min(30, v[0])), Math.max(-30, Math.min(30, v[1]))];
  }
  return {
    ...c, invites, tables, deplacements: dep,
    manuels: c.manuels.filter(garde), retires: c.retires.filter(garde),
    musiques, accueils,
    missions: Object.fromEntries(Object.entries(c.missions).filter(([k]) => missionsDuType(type).some((m) => m.id === k))),
  };
}

export const missionsDuType = (t: TypeEvt | null) => (t ? MISSIONS[t] : []);

// ── Valeurs calculées ───────────────────────────────────────────────────────
/** Options réellement présentes dans la scène : manuelles + apportées par les missions − retirées */
export function optionsActives(c: Choix): OptionId[] {
  const set = new Set<OptionId>(c.manuels);
  for (const m of missionsDuType(c.type)) {
    const r = m.reponses.find((x) => x.id === c.missions[m.id]);
    r?.ajoute.forEach((o) => set.add(o));
  }
  c.retires.forEach((o) => set.delete(o));
  return [...set].filter((o) => { const i = infoOption(o); return !!i && !!c.type && disponiblePour(i, c.type, c.lieu); });
}

function dernierDeMission(c: Choix, cle: "lumiere") {
  let v: string | null = null;
  for (const m of missionsDuType(c.type)) {
    const r = m.reponses.find((x) => x.id === c.missions[m.id]);
    if (r?.[cle]) v = r[cle] as string;
  }
  return v;
}
/** Accueils présents : ceux choisis à la main + ceux apportés par les missions − ceux retirés (le thé et les hôtesses se cumulent) */
export function accueilsEffectifs(c: Choix): AccueilId[] {
  const set = new Set<AccueilId>(c.accueils);
  for (const m of missionsDuType(c.type)) {
    const r = m.reponses.find((x) => x.id === c.missions[m.id]);
    if (r?.accueil) set.add(r.accueil);
  }
  c.retires.forEach((o) => set.delete(o as AccueilId));
  return [...set];
}
export const lumiereEffective = (c: Choix): LumiereId | null => (c.lumiere ?? dernierDeMission(c, "lumiere")) as LumiereId | null;

/** Tout ce que la scène doit dessiner, déduit du choix */
export interface Rendu {
  type: TypeEvt; lieu: LieuId; style: StyleId; palette: PaletteId; lumiere: LumiereId | null; musiques: MusiqueId[]; accueils: AccueilId[];
  options: Set<OptionId>; invites: number; tablesTotal: number; tablesVisibles: number; titre: string;
  tables: TableId; salle: Salle; deplacements: Record<string, [number, number]>;
}
/** Nombre de tables : automatique (120 invités → 12 tables de 10, 400 invités → 40 tables) */
export const nbTables = (invites: number, tables: TableId = "rondes") => (tables === "conference" ? Math.max(1, invites) : Math.max(2, Math.ceil(invites / infoTable(tables).places)));

export function rendu(c: Choix): Rendu | null {
  if (!c.type) return null;
  const style = c.style ?? "beige_or";
  const palette = c.palette ?? STYLES.find((s) => s.id === style)!.palette;
  const tables = nbTables(c.invites, c.tables);
  const options = new Set(optionsActives(c));
  const lum = lumiereEffective(c), acc = accueilsEffectifs(c);
  const salle = dimensionner(tables, c.tables, { options, musiques: c.musiques, accueils: acc, lumiere: lum, type: c.type, tables: c.tables });
  return {
    type: c.type, lieu: c.lieu ?? "riad", style, palette, lumiere: lumiereEffective(c), musiques: c.musiques, accueils: acc,
    options, invites: c.invites, tablesTotal: tables, tablesVisibles: salle.tables.length, titre: titreEvenement(c),
    tables: c.tables, salle, deplacements: c.deplacements,
  };
}

export function titreEvenement(c: Choix): string {
  const nom = c.nomEvt.trim();
  if (nom) return nom.slice(0, 60);
  const type = TYPES.find((t) => t.id === c.type);
  const style = STYLES.find((s) => s.id === c.style);
  if (!type) return tr("Mon événement");
  const base = c.type === "mariage" ? tr("Notre mariage") : c.type === "pro" ? tr("Notre événement") : tr("Ma fête");
  return style ? `${base} · ${style.nom.toLowerCase()}` : base;
}

/** Part de la soirée atteinte (0 = coucher de soleil, 1 = pleine soirée) selon l'avancement */
export function avancement(c: Choix): number {
  const etapes = [c.style, c.palette, c.lumiere ?? dernierDeMission(c, "lumiere"), c.musiques.length ? 1 : null, accueilsEffectifs(c).length ? 1 : null]
    .filter(Boolean).length + Math.min(3, optionsActives(c).length) + Object.keys(c.missions).length;
  return Math.min(1, etapes / 10);
}

export function badges(c: Choix): { id: string; nom: string }[] {
  const out: { id: string; nom: string }[] = [];
  const acc = accueilsEffectifs(c); const mus = c.musiques; const lum = lumiereEffective(c);
  const opts = optionsActives(c);
  if (acc.some((a) => a !== "discret")) out.push(BADGES[0]);
  if (mus.some((m) => m === "dj" || m === "orchestre" || m === "troupe") || lum === "festive" || lum === "etoilee" || opts.includes("piste") || opts.includes("feux_froids")) out.push(BADGES[1]);
  const exp = opts.filter((o) => EXPERIENCES.some((x) => x.id === o)).length;
  if (exp >= 2 || opts.length >= 4) out.push(BADGES[2]);
  return out.map((b) => ({ id: b.id, nom: b.nom }));
}

export const missionsFaites = (c: Choix) => missionsDuType(c.type).filter((m) => c.missions[m.id]).length;

// ── Résumé (affichage, carte, demande à l'équipe) ───────────────────────────
export interface Ligne { nom: string; reservable: boolean }
export interface Resume {
  type: string; titre: string; invites: number; tables: number; typeTables: string; deplaces: number; lieu: string; style: string; palette: string;
  lumiere: string | null; musique: string | null; accueil: string | null;
  decors: Ligne[]; experiences: Ligne[]; missions: { titre: string; reponse: string }[]; badges: string[];
}
const ligne = (id: string): Ligne => { const o = infoOption(id)!; return { nom: o.nom, reservable: reservable(o) }; };

export function resume(c: Choix): Resume {
  const opts = optionsActives(c);
  const acc = accueilsEffectifs(c); const mus = c.musiques; const lum = lumiereEffective(c);
  const style = STYLES.find((s) => s.id === (c.style ?? "beige_or"))!;
  return {
    type: TYPES.find((t) => t.id === c.type)?.nom ?? tr("Événement"), titre: titreEvenement(c), invites: c.invites, tables: nbTables(c.invites, c.tables), typeTables: infoTable(c.tables).compte, deplaces: Object.keys(c.deplacements).length,
    lieu: LIEUX.find((l) => l.id === c.lieu)?.nom ?? tr("Non choisi"), style: style.nom,
    palette: PALETTES.find((p) => p.id === (c.palette ?? style.palette))!.nom,
    lumiere: lum ? LUMIERES.find((l) => l.id === lum)!.nom : null,
    musique: mus.length ? mus.map((id) => MUSIQUES.find((m) => m.id === id)!.nom).join(" + ") : null,
    accueil: acc.length ? acc.map((id) => ACCUEILS.find((a) => a.id === id)!.nom).join(" + ") : null,
    decors: opts.filter((o) => DECORS.some((d) => d.id === o)).map(ligne),
    experiences: opts.filter((o) => EXPERIENCES.some((x) => x.id === o)).map(ligne),
    missions: missionsDuType(c.type).filter((m) => c.missions[m.id]).map((m) => ({
      titre: m.titre, reponse: c.missions[m.id] === "passe" ? tr("Passée") : m.reponses.find((r) => r.id === c.missions[m.id])?.nom ?? "—",
    })),
    badges: badges(c).map((b) => b.nom),
  };
}

/** Texte clair pour l'équipe (enregistré dans l'administration) */
export function texteDemande(c: Choix): string {
  const r = resume(c);
  const l = (x: Ligne) => `${x.nom}${x.reservable ? "" : " (inspiration à discuter)"}`;
  const dateTxt = c.dateInconnue || !c.date ? "Pas encore fixée" : c.date;
  return [
    `PROJET « HEAVENT CITY » — ${r.titre}`,
    `Type : ${r.type} · ${r.invites} invités (environ ${r.tables} ${r.typeTables}) · Date : ${dateTxt}`,
    `Lieu d'inspiration : ${r.lieu} (ambiance conceptuelle, pas un lieu réservé)`,
    `Style : ${r.style} · Couleurs : ${r.palette}`,
    `Lumière : ${r.lumiere ?? "non précisée"} · Musique : ${r.musique ?? "non précisée"} · Accueil : ${r.accueil ?? "non précisé"}`,
    `Décoration : ${r.decors.map(l).join(", ") || "aucune choisie"}`,
    `Expériences : ${r.experiences.map(l).join(", ") || "aucune choisie"}`,
    `Missions : ${r.missions.map((m) => `${m.titre} → ${m.reponse}`).join(" ; ") || "aucune"}`,
    r.deplaces ? `Disposition : ${r.deplaces} élément(s) déplacé(s) par le visiteur dans la scène (à confirmer sur place)` : "",
    c.note.trim() ? `Note du visiteur : ${c.note.trim()}` : "",
  ].filter(Boolean).join("\n");
}

/** Prestations du catalogue interne correspondant aux choix, pour préremplir le devis dans l'administration */
export function configurationAdmin(c: Choix): { elements: Record<string, number>; libelles: Record<string, string> } {
  const el: Record<string, number> = {};
  const mettre = (k: string, n: number) => { el[k] = Math.max(el[k] ?? 0, Math.min(500, Math.max(1, Math.round(n)))); };
  const nom: Record<string, string> = {};
  const tt = infoTable(c.tables);
  if (tt.catalogue) { mettre(tt.catalogue, nbTables(c.invites, c.tables)); nom[tt.catalogue] = tt.libelle; }
  if (c.type === "mariage" && c.tables !== "hautes") { mettre("honneur", 1); nom.honneur = "Table d'honneur"; }
  const ids = [...optionsActives(c), lumiereEffective(c), ...c.musiques, ...accueilsEffectifs(c)].filter(Boolean) as string[];
  for (const id of ids) {
    const o = infoOption(id); if (!o?.catalogue) continue;
    const n = id === "hotesses" ? Math.max(2, Math.ceil(c.invites / 60))
      : id === "maitre_hotel" ? Math.max(2, Math.ceil(c.invites / 60)) : id === "lanternes" || id === "chaleureuse" || id === "guirlandes" || id === "etoilee" || id === "bougies" || id === "candelabres" ? 2 : 1;
    mettre(o.catalogue, n); nom[o.catalogue] = o.nom;
    if (id === "maitre_hotel") { mettre("hotesse", n); nom.hotesse = "Hôtesses d'accueil"; el.maitre_hotel = 1; }
  }
  return { elements: el, libelles: nom };
}

// ── Sauvegarde locale (progression NON sensible, jamais de coordonnées) ─────
export const CLE_SAUVEGARDE = "heavent-city:sauvegarde";
const VERSION = 1;
const ANCIENNES_CLES = ["heavent-city-v0", "heavent-city:sauvegarde:v0"];

export function lireSauvegarde(): Etat | null {
  try {
    ANCIENNES_CLES.forEach((k) => localStorage.removeItem(k));
    const brut = localStorage.getItem(CLE_SAUVEGARDE);
    if (!brut) return null;
    const j = JSON.parse(brut);
    if (!j || j.version !== VERSION || typeof j.choix !== "object") { localStorage.removeItem(CLE_SAUVEGARDE); return null; }
    // anciennes sauvegardes : une seule musique
    if (j.choix.musique && !j.choix.musiques) j.choix.musiques = [j.choix.musique];
    if (j.choix.accueil && !j.choix.accueils) j.choix.accueils = [j.choix.accueil];
    const choix = nettoyer({ ...CHOIX_VIDE, ...j.choix, note: "" });
    const phase: Phase = ["accueil", "ville", "scene", "final"].includes(j.phase) ? j.phase : "accueil";
    return { ...ETAT_INITIAL, accueilLu: !!j.accueilLu, phase: choix.type ? (phase === "accueil" ? "accueil" : phase) : "accueil", choix, onglet: typeof j.onglet === "string" ? j.onglet : "style" };
  } catch { return null; }
}

export function ecrireSauvegarde(e: Etat) {
  try {
    // La note libre n'est pas conservée : elle peut contenir des informations personnelles
    const { note: _note, ...choix } = e.choix;
    void _note;
    localStorage.setItem(CLE_SAUVEGARDE, JSON.stringify({ version: VERSION, enregistre: Date.now(), phase: e.phase, onglet: e.onglet, accueilLu: e.accueilLu, choix }));
  } catch { /* stockage indisponible : le jeu fonctionne quand même */ }
}
export const effacerSauvegarde = () => { try { localStorage.removeItem(CLE_SAUVEGARDE); } catch { /* ignoré */ } };
export const aUneSauvegarde = (e: Etat | null) => !!e && !!e.choix.type;
