/**
 * Où se trouve chaque chose dans la scène (cases du sol).
 * La salle S'AGRANDIT automatiquement (de 12 × 12 à 28 × 28 cases) et chaque objet choisi est posé dans un
 * emplacement LIBRE : `positions()` essaie les emplacements de chaque objet dans l'ordre et prend le premier
 * qui ne touche rien ; `dimensionner()` place ensuite les tables sur les cases restées libres et agrandit
 * la salle tant qu'il n'y a pas assez de place. Ainsi rien ne se superpose, quelle que soit la combinaison.
 */
import type { OptionId, TableId } from "./donnees";

export const N_MIN = 12, N_MAX = 28;
/** Encombrement d'une table avec ses chaises : pas entre deux tables (px, py) et demi-largeur / demi-profondeur */
export const GABARITS: Record<TableId, { px: number; py: number; dx: number; dy: number }> = {
  rondes: { px: 2.5, py: 2.15, dx: 0.95, dy: 0.95 },
  rectangulaires: { px: 2.6, py: 1.95, dx: 1.0, dy: 0.9 },
  hautes: { px: 1.45, py: 1.4, dx: 0.55, dy: 0.55 },
};
export const RAYON_TABLE = 0.52;

/** Ce qui est choisi dans la scène (sert à poser les objets sans les superposer) */
export interface Actifs { options: ReadonlySet<string>; musiques: readonly string[]; accueil: string | null; lumiere: string | null; type: string; tables: TableId }
export interface Rect { id: string; x0: number; y0: number; x1: number; y1: number }
export type Positions = ReturnType<typeof positions>;
export interface Salle { n: number; ax: number; tables: [number, number][]; capacite: number; pos: Positions }

const boite = (id: string, gx: number, gy: number, w: number, d: number): Rect => ({ id, x0: gx, y0: gy, x1: gx + w, y1: gy + d });
const centre = (id: string, x: number, y: number, hw: number, hd = hw): Rect => ({ id, x0: x - hw, y0: y - hd, x1: x + hw, y1: y + hd });

export function positions(n: number, ax: number, A: Actifs) {
  const placed: Rect[] = [];
  const o = A.options, mus = A.musiques;
  const dedans = (r: Rect) => r.x0 >= 0.1 && r.y0 >= 0.1 && r.x1 <= n + 0.05 && r.y1 <= n + 0.05;
  const choque = (r: Rect, m: number, ignorer: string[] = []) => placed.some((p) => !ignorer.includes(p.id) && r.x0 < p.x1 + m && p.x0 < r.x1 + m && r.y0 < p.y1 + m && p.y0 < r.y1 + m);
  /** pose l'objet sur le premier emplacement libre (sinon le premier, la salle s'agrandira) */
  function poser<T extends number[]>(actif: boolean, cands: T[], rect: (c: T) => Rect, m = 0.25, ignorer: string[] = []): T {
    if (!actif) return cands[0];
    for (const c of cands) { const r = rect(c); if (dedans(r) && !choque(r, m, ignorer)) { placed.push(r); return c; } }
    // aucun emplacement prévu n'est libre : on cherche la place libre la plus proche du premier choix
    const [px, py, ...reste] = cands[0];
    const essais: [number, number][] = [];
    for (let x = 0.3; x <= n; x += 0.5) for (let y = 0.3; y <= n; y += 0.5) essais.push([x, y]);
    essais.sort((a, b) => Math.hypot(a[0] - px, a[1] - py) - Math.hypot(b[0] - px, b[1] - py));
    for (const [x, y] of essais) { const c = [x, y, ...reste] as T, r = rect(c); if (dedans(r) && !choque(r, m, ignorer)) { placed.push(r); return c; } }
    placed.push(rect(cands[0]));
    return cands[0];
  }
  /** pose de petits éléments décoratifs : ceux qui ne trouvent pas de place sont simplement omis */
  const facultatifs = (actif: boolean, pts: [number, number][], id: string, hw: number): [number, number][] => {
    if (!actif) return pts;
    const out: [number, number][] = [];
    pts.forEach(([x, y], i) => { const r = centre(`${id}${i}`, x, y, hw); if (dedans(r) && !choque(r, 0.05)) { placed.push(r); out.push([x, y]); } });
    return out;
  };

  // — accueil, près de la porte —
  const accueilPersonnel = A.accueil === "hotesses" || A.accueil === "maitre_hotel";
  const HOTESSES: [number, number][] = [[ax - 0.6, n - 1.0], [ax + 0.6, n - 1.0]];
  if (accueilPersonnel) HOTESSES.forEach(([x, y], i) => placed.push(centre(`hot${i}`, x, y, 0.3)));
  const MAITRE_HOTEL: [number, number] = [ax + 0.4, n - 2.0], HOTESSE_3: [number, number] = [ax - 0.4, n - 2.0];
  if (A.accueil === "maitre_hotel") { placed.push(centre("maitre", ...MAITRE_HOTEL, 0.3)); placed.push(centre("hot3", ...HOTESSE_3, 0.3)); }
  const BOUQUETS: [number, number][] = ([[ax - 1.6, n - 0.7], [ax + 1.6, n - 0.7]] as [number, number][]).filter(([x]) => x >= 2.1);
  if (o.has("fleurs")) BOUQUETS.forEach(([x, y], i) => placed.push(centre(`bq${i}`, x, y, 0.35)));
  const DEPART_INVITES: [number, number] = [ax, n + 1.9];

  // — côté du fond : honneur, arche —
  const HONNEUR = { gx: 1.3, gy: 1.8, w: 3.4, d: 1.1 };
  if (A.type !== "pro" && A.tables !== "hautes") placed.push(boite("honneur", HONNEUR.gx, HONNEUR.gy - 0.2, HONNEUR.w, HONNEUR.d + 0.2));
  const ARCHE = { gx: 1.9, gy: 0.5, largeur: 2.2 };
  if (o.has("arche")) placed.push(boite("arche", ARCHE.gx, ARCHE.gy, ARCHE.largeur, 0.8));
  const MUR_FLEURS = { u0: 5.2, u1: 7.1, gy: 0.15 };

  // — bande de gauche : photobooth, bar à parfums, buffet —
  const PHOTOBOOTH = { gx: 0.3, gy: 3.3, w: 0.8, d: 2.1 }, NAWAR = { gx: 0.3, gy: 5.9, w: 0.9, d: 2.3 }, BUFFET = { gx: 0.3, gy: 8.7, w: 0.9, d: 2.4 };
  if (o.has("photobooth")) placed.push(boite("photobooth", PHOTOBOOTH.gx, PHOTOBOOTH.gy, PHOTOBOOTH.w, PHOTOBOOTH.d));
  if (o.has("nawar")) placed.push(boite("nawar", NAWAR.gx, NAWAR.gy, NAWAR.w, NAWAR.d));
  if (o.has("buffet")) placed.push(boite("buffet", BUFFET.gx, BUFFET.gy, BUFFET.w, BUFFET.d));

  // — piste (au sol) et musique —
  const pisteW = 3.8 + 0.45 * (n - 12);
  const PISTE = { gx: n - 1.6 - pisteW, gy: 2.3, w: pisteW, d: 1.7 };
  if (o.has("piste")) placed.push(boite("piste", PISTE.gx, PISTE.gy, PISTE.w, PISTE.d));
  const SCENE_ORCHESTRE = { gx: n - 4.8, gy: 0.5, w: 3.8, d: 1.5 };
  if (mus.includes("orchestre")) placed.push(boite("orch", SCENE_ORCHESTRE.gx, SCENE_ORCHESTRE.gy, SCENE_ORCHESTRE.w, SCENE_ORCHESTRE.d));
  const djW = mus.includes("orchestre") ? 1.8 : 2.1;
  const [djX, djY] = poser(mus.includes("dj"), [[mus.includes("orchestre") ? 5.0 : n - 4.4, 0.5], [5.0, 0.5], [n - 8.2, 0.5]] as [number, number][], ([x, y]) => boite("dj", x, y, djW, 1.0));
  const DJ = { gx: djX, gy: djY, w: djW, d: 1.0 };
  const ACOUSTIQUE = poser(mus.includes("acoustique"), [[n - 4.4, 1.3], [5.6, 1.3], [n - 7.2, 1.3], [n - 9.4, 1.3]] as [number, number][], ([x, y]) => boite("acoustique", x, y, 1.0, 1.0));
  const baffles: [number, number][] = [];
  for (let k = 0; k < 2; k++) baffles.push(poser(mus.includes("playlist"), [[n - 1.0, 0.5], [n - 5.2, 0.5], [n - 7.4, 0.5], [n - 9.6, 0.5], [8.0, 0.5], [6.0, 0.5]] as [number, number][], ([x, y]) => boite(`enc${k}`, x, y, 0.5, 0.5)));
  const ENCEINTES: [number, number][] = baffles;
  const TROUPE = poser(mus.includes("troupe"), [[PISTE.gx + 0.8, 3.4], [n - 9.0, 3.4], [n - 7.0, 4.4]] as [number, number][], ([x, y]) => boite("troupe", x, y, 1.6, 1.0), 0.2, ["piste"]);

  // — bars et expériences : première place libre parmi plusieurs —
  const CANDY = poser(o.has("candy_bar"), [[n - 2.0, 0.4, 1.6, 0.9], [n - 1.2, 5.0, 0.9, 1.6], [n - 1.2, 7.0, 0.9, 1.6], [n - 1.2, 9.0, 0.9, 1.6], [n - 6.4, 0.4, 1.6, 0.9]] as [number, number, number, number][], ([x, y, w, d]) => boite("candy", x, y, w, d));
  const THE_BAR = { gx: n - 1.1, gy: 2.6, w: 0.8, d: 1.9 };
  if (o.has("the_bar")) placed.push(boite("the", THE_BAR.gx, THE_BAR.gy, THE_BAR.w, THE_BAR.d));
  const SALON = { gx: n - 3.9, gy: n - 1.45, w: 3.0, d: 1.3 };
  if (o.has("salon")) placed.push(boite("salon", SALON.gx, SALON.gy, SALON.w, SALON.d));
  const COMPTOIR: [number, number] = poser(!!A.accueil && (A.accueil === "the" || A.accueil === "discret"), [[n - 6.7, n - 0.9], [n - 9.5, n - 0.9], [n - 12, n - 0.9]] as [number, number][], ([x, y]) => centre("comptoir", x + 0.6, y + 0.4, 0.8, 0.5));
  const FONTAINE = poser(o.has("fontaine"), [[n - 5.5, n - 0.9], [n - 9.2, n - 0.9], [n - 11.6, n - 0.9], [n - 0.9, n / 2 + 1.5]] as [number, number][], ([x, y]) => centre("fontaine", x, y, 0.9));
  const LIVRE_DOR = poser(o.has("livre_dor"), [[1.8, n - 1.0], [1.8, n - 2.2], [3.0, n - 1.0]] as [number, number][], ([x, y]) => centre("livre", x, y, 0.5));
  const PHOTOGRAPHE = poser(o.has("photographe"), [[5.2, 3.3], [3.6, 3.3], [5.2, 3.0]] as [number, number][], ([x, y]) => centre("photographe", x, y, 0.5));
  const FEUX: [number, number][] = [[PISTE.gx - 0.3, 4.2], [PISTE.gx + PISTE.w - 0.3, 4.2]];
  if (o.has("feux_froids")) FEUX.forEach(([x, y], i) => placed.push(centre(`feu${i}`, x, y, 0.4)));

  // — lumières décoratives : posées là où il reste de la place —
  const POSTES_LANTERNES = facultatifs(A.lumiere === "chaleureuse", [[1.0, 1.3], [n - 5.5, 1.5], [ax, 4.2], [n - 0.4, 4.8], [1.0, n - 2.5], [n - 0.4, n - 2.5]], "pl", 0.35);
  const CANDELABRES = facultatifs(A.lumiere === "bougies", [[5.6, 1.5], [n - 0.6, 1.3], [1.4, 4.4], [n - 0.5, n - 0.7], [1.0, n - 2.5], [n - 0.4, n - 4.5]], "cd", 0.35);

  const ALLEE = { gx: ax - 0.45, gy: 4.6, w: 0.9, d: n - 4.8 };
  const PORTE = { gauche: ax - 1.1, droite: ax + 1.1, gy: n - 0.15 };
  /** Centre de chaque option (halo de mise en avant quand un choix change la scène) */
  const ANCRES: Partial<Record<OptionId | "accueil" | "musique" | "lumiere", [number, number]>> = {
    arche: [3.0, 1.0], fleurs: [ax, n - 0.7], mur_fleurs: [6.1, 0.5],
    allee: [ax, n / 2 + 2], fontaine: FONTAINE, petales: [n / 2, n / 2 - 1], ciel_lanternes: [n / 2, n / 2 - 2],
    piste: [PISTE.gx + PISTE.w / 2, 3.1], photobooth: [0.7, 4.3], nawar: [0.7, 7.0], buffet: [0.7, 9.9], candy_bar: [CANDY[0] + CANDY[2] / 2, CANDY[1] + CANDY[3] / 2], livre_dor: LIVRE_DOR,
    feux_froids: [PISTE.gx + PISTE.w / 2, 3.1], photographe: PHOTOGRAPHE, salon: [SALON.gx + 1.5, SALON.gy + 0.6], the_bar: [n - 0.7, 3.5], brume: [n / 2, n / 2],
    accueil: [ax, n - 1.0], musique: [n - 3.1, 1.2], lumiere: [n / 2, n / 2 - 1],
  };
  return {
    PISTE, FONTAINE, LIVRE_DOR, COMPTOIR, PHOTOGRAPHE, SALON, HONNEUR, ARCHE, MUR_FLEURS, DJ, SCENE_ORCHESTRE, PHOTOBOOTH, NAWAR, BUFFET,
    CANDY: { gx: CANDY[0], gy: CANDY[1], w: CANDY[2], d: CANDY[3] }, THE_BAR, TROUPE, ACOUSTIQUE, ENCEINTES, ALLEE, PORTE, POSTES_LANTERNES, CANDELABRES, BOUQUETS, FEUX,
    HOTESSES, MAITRE_HOTEL, HOTESSE_3, DEPART_INVITES, ANCRES, obstacles: placed as readonly Rect[],
  };
}

function grille(n: number, type: TableId) {
  const g = GABARITS[type];
  const cols = Math.max(1, Math.floor((n - 0.5 - 1.3 - 2 * g.dx - 0.7) / g.px) + 1);
  const rows = Math.max(1, Math.floor((n - 5.75 - 2 * g.dy) / g.py) + 1);
  const x0 = 1.3 + g.dx, y0 = 4.0 + g.dy;
  // une allée un peu plus large entre la 1re et la 2e colonne : c'est l'allée de l'entrée
  const xs = Array.from({ length: cols }, (_, c) => (c === 0 ? x0 : x0 + g.px + 0.7 + (c - 1) * g.px));
  const ys = Array.from({ length: rows }, (_, r) => y0 + r * g.py);
  return { cols, rows, xs, ys, ax: cols >= 2 ? (xs[0] + xs[1]) / 2 : 3.9 };
}

/** Taille de la salle et emplacement des `nb` tables : seulement sur les cases libres, les premières posées sont celles du centre */
export function dimensionner(nb: number, type: TableId, A: Actifs): Salle {
  const g = GABARITS[type];
  let dernier: Salle | null = null;
  for (let n = N_MIN; n <= N_MAX; n++) {
    const gr = grille(n, type), pos = positions(n, gr.ax, A);
    const cx = (gr.xs[0] + gr.xs[gr.cols - 1]) / 2, cy = (gr.ys[0] + gr.ys[gr.rows - 1]) / 2;
    const cases: { x: number; y: number; d: number }[] = [];
    for (const y of gr.ys) for (const x of gr.xs) {
      const libre = !pos.obstacles.some((p) => x - g.dx < p.x1 + 0.1 && p.x0 < x + g.dx + 0.1 && y - g.dy < p.y1 + 0.1 && p.y0 < y + g.dy + 0.1);
      if (libre) cases.push({ x, y, d: Math.hypot(x - cx, (y - cy) * 1.2) });
    }
    cases.sort((a, b) => a.d - b.d || a.y - b.y || a.x - b.x);
    dernier = { n, ax: gr.ax, tables: cases.slice(0, nb).map((c) => [c.x, c.y] as [number, number]), capacite: cases.length, pos };
    if (cases.length >= nb) return dernier;
  }
  return dernier!;
}
