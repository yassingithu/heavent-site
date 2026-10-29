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
  // une chaise (rangées face à l'estrade)
  conference: { px: 0.62, py: 0.72, dx: 0.3, dy: 0.3 },
};
export const RAYON_TABLE = 0.52;
/** Part maximale du sol occupée par les objets (hors tables) avant que la salle ne s'agrandisse */
const PART_OBJETS = 0.17;

/** Ce qui est choisi dans la scène (sert à poser les objets sans les superposer) */
export interface Actifs { options: ReadonlySet<string>; musiques: readonly string[]; accueils: readonly string[]; lumiere: string | null; type: string; tables: TableId }
export interface Rect { id: string; x0: number; y0: number; x1: number; y1: number }
export type Positions = ReturnType<typeof positions>;
export interface Salle { n: number; ax: number; tables: [number, number][]; capacite: number; pos: Positions; /** tables hautes ajoutées en plus des tables assises (mange-debout) */ hautes: [number, number][] }

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
  const accueilPersonnel = A.accueils.includes("hotesses") || A.accueils.includes("maitre_hotel");
  const HOTESSES: [number, number][] = [[ax - 0.6, n - 1.0], [ax + 0.6, n - 1.0]];
  if (accueilPersonnel) HOTESSES.forEach(([x, y], i) => placed.push(centre(`hot${i}`, x, y, 0.3)));
  const MAITRE_HOTEL: [number, number] = [ax + 0.4, n - 2.0], HOTESSE_3: [number, number] = [ax - 0.4, n - 2.0];
  if (A.accueils.includes("maitre_hotel")) { placed.push(centre("maitre", ...MAITRE_HOTEL, 0.3)); placed.push(centre("hot3", ...HOTESSE_3, 0.3)); }
  const BOUQUETS: [number, number][] = ([[ax - 1.6, n - 0.7], [ax + 1.6, n - 0.7]] as [number, number][]).filter(([x]) => x >= 2.1);
  if (o.has("fleurs")) BOUQUETS.forEach(([x, y], i) => placed.push(centre(`bq${i}`, x, y, 0.35)));
  const DEPART_INVITES: [number, number] = [ax, n + 1.9];

  // — côté du fond : honneur, arche —
  const HONNEUR = { gx: 1.3, gy: 1.8, w: 3.4, d: 1.1 };
  if (A.type !== "pro" && A.type !== "conference" && A.tables !== "hautes" && A.tables !== "conference") placed.push(boite("honneur", HONNEUR.gx, HONNEUR.gy - 0.2, HONNEUR.w, HONNEUR.d + 0.2));
  // arche florale d'accueil : juste après la porte, au-dessus de l'allée d'entrée
  const ARCHE = { gx: ax - 1.1, gy: n - 3.2, largeur: 2.2 };
  if (o.has("arche")) placed.push(boite("arche", ARCHE.gx, ARCHE.gy, ARCHE.largeur, 0.8));
  const MUR_FLEURS = { u0: 5.2, u1: 7.1, gy: 0.15 };

  // — conférence : estrade au centre du fond, table des intervenants devant, micros dans l'allée —
  const [esx, esy] = poser(o.has("podium"), [[ax - 2.4, 0.45], [ax - 2.4, 0.3]] as [number, number][], ([x, y]) => boite("estrade", x, y, 4.8, 2.0), 0);
  const ESTRADE = { gx: esx, gy: esy, w: 4.8, d: 2.0 };
  const [inx, iny] = poser(o.has("table_intervenants"), [[ESTRADE.gx + 0.4, ESTRADE.gy + 2.3], [ESTRADE.gx + 0.4, ESTRADE.gy + 2.6]] as [number, number][], ([x, y]) => boite("interv", x, y, 4.0, 0.85), 0.05);
  const INTERVENANTS = { gx: inx, gy: iny, w: 4.0, d: 0.85 };
  const MICROS: [number, number][] = [[ax, 5.6], [ax, 8.0]];
  if (o.has("micros")) MICROS.forEach(([x, y], i) => placed.push(centre(`mic${i}`, x, y, 0.3)));

  // — bande de gauche : photobooth, bar à parfums, buffet —
  const PHOTOBOOTH = { gx: 0.3, gy: 3.3, w: 0.8, d: 2.1 }, NAWAR = { gx: 0.3, gy: 5.9, w: 0.9, d: 2.3 }, BUFFET = { gx: 0.3, gy: 8.7, w: 0.9, d: 2.4 };
  if (o.has("photobooth")) placed.push(boite("photobooth", PHOTOBOOTH.gx, PHOTOBOOTH.gy, PHOTOBOOTH.w, PHOTOBOOTH.d));
  if (o.has("nawar")) placed.push(boite("nawar", NAWAR.gx, NAWAR.gy, NAWAR.w, NAWAR.d));
  if (o.has("buffet")) placed.push(boite("buffet", BUFFET.gx, BUFFET.gy, BUFFET.w, BUFFET.d));

  const pisteW = 3.8 + 0.45 * (n - 12);
  const PISTE = { gx: n - 1.6 - pisteW, gy: 2.3, w: pisteW, d: 1.7 };
  if (o.has("piste")) placed.push(boite("piste", PISTE.gx, PISTE.gy, PISTE.w, PISTE.d));
  const SCENE_ORCHESTRE = { gx: n - 4.8, gy: 0.5, w: 3.8, d: 1.5 };
  if (mus.includes("orchestre")) placed.push(boite("orch", SCENE_ORCHESTRE.gx, SCENE_ORCHESTRE.gy, SCENE_ORCHESTRE.w, SCENE_ORCHESTRE.d));
  const THE_BAR = { gx: n - 1.1, gy: 2.6, w: 0.8, d: 1.9 };
  if (o.has("the_bar")) placed.push(boite("the", THE_BAR.gx, THE_BAR.gy, THE_BAR.w, THE_BAR.d));
  const SALON = { gx: n - 3.9, gy: n - 1.45, w: 3.0, d: 1.3 };
  if (o.has("salon")) placed.push(boite("salon", SALON.gx, SALON.gy, SALON.w, SALON.d));
  const FEUX: [number, number][] = [[PISTE.gx - 0.3, 4.2], [PISTE.gx + PISTE.w - 0.3, 4.2]];
  if (o.has("feux_froids")) FEUX.forEach(([x, y], i) => placed.push(centre(`feu${i}`, x, y, 0.4)));

  // — le mariage marocain passe avant le reste : amariya, fauteuils des mariés, neggafa, pièce montée —
  const AMARIYA = poser(o.has("amariya"), [[5.0, 1.0], [5.0, 2.9], [1.0, n - 4.4]] as [number, number][], ([x, y]) => boite("amariya", x, y, 2.3, 1.4));
  const FAUTEUILS = poser(o.has("fauteuils"), [[5.0, 3.0], [n - 8.5, 3.0], [5.0, 1.0]] as [number, number][], ([x, y]) => boite("fauteuils", x, y, 2.0, 1.2));
  const NEGGAFA = poser(o.has("neggafa"), [[4.95, 2.5], [1.0, 3.3], [4.95, 3.3]] as [number, number][], ([x, y]) => centre("neggafa", x, y, 0.45));
  const GATEAU = poser(o.has("gateau"), [[3.0, 3.4], [4.4, 3.4], [3.0, 3.0]] as [number, number][], ([x, y]) => centre("gateau", x, y, 0.5));

  const REGIE = poser(o.has("regie"), [[n - 3.2, n - 1.4], [1.4, n - 1.4], [n - 3.2, n - 2.6]] as [number, number][], ([x, y]) => boite("regie", x, y, 1.8, 0.8));
  const SANDWICHS = poser(o.has("buffet_sandwichs"), [[n - 1.2, 5.0], [n - 1.2, 8.0], [1.4, n - 1.4], [n - 6.0, n - 1.4]] as [number, number][], ([x, y]) => (x > n - 2 ? boite("sandw", x, y, 0.9, 2.6) : boite("sandw", x, y, 2.6, 0.9)));

  const ENFANTS = poser(o.has("enfants"), [[n - 3.4, n - 4.4], [0.4, n - 4.2], [n - 3.4, 6.2], [0.4, 3.3], [n - 3.4, 9.0]] as [number, number][], ([x, y]) => boite("enfants", x, y, 2.4, 2.0));
  const HENNE = poser(o.has("henne"), [[n - 3.4, 6.2], [n - 3.4, 8.6], [0.4, 11.4]] as [number, number][], ([x, y]) => boite("henne", x, y, 2.2, 2.2));

  // — piste (au sol) et musique —
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
  const COMPTOIR: [number, number] = poser(A.accueils.includes("the") || A.accueils.includes("discret"), [[n - 6.7, n - 0.9], [n - 9.5, n - 0.9], [n - 12, n - 0.9]] as [number, number][], ([x, y]) => centre("comptoir", x + 0.6, y + 0.4, 0.8, 0.5));
  const FONTAINE = poser(o.has("fontaine"), [[n - 5.5, n - 0.9], [n - 9.2, n - 0.9], [n - 11.6, n - 0.9], [n - 0.9, n / 2 + 1.5]] as [number, number][], ([x, y]) => centre("fontaine", x, y, 0.9));
  const LIVRE_DOR = poser(o.has("livre_dor"), [[1.8, n - 1.0], [1.8, n - 2.2], [3.0, n - 1.0]] as [number, number][], ([x, y]) => centre("livre", x, y, 0.5));
  const PHOTOGRAPHE = poser(o.has("photographe"), [[5.2, 3.3], [3.6, 3.3], [5.2, 3.0]] as [number, number][], ([x, y]) => centre("photographe", x, y, 0.5));

  // — lumières décoratives : posées là où il reste de la place —
  const POSTES_LANTERNES = facultatifs(A.lumiere === "chaleureuse", [[1.0, 1.3], [n - 5.5, 1.5], [ax, 4.2], [n - 0.4, 4.8], [1.0, n - 2.5], [n - 0.4, n - 2.5]], "pl", 0.35);
  const CANDELABRES = facultatifs(A.lumiere === "bougies", [[5.6, 1.5], [n - 0.6, 1.3], [1.4, 4.4], [n - 0.5, n - 0.7], [1.0, n - 2.5], [n - 0.4, n - 4.5]], "cd", 0.35);

  const ALLEE = { gx: ax - 0.45, gy: 4.6, w: 0.9, d: n - 4.8 };
  const PORTE = { gauche: ax - 1.1, droite: ax + 1.1, gy: n - 0.15 };
  /** Centre de chaque option (halo de mise en avant quand un choix change la scène) */
  const ANCRES: Partial<Record<OptionId | "accueil" | "musique" | "lumiere", [number, number]>> = {
    podium: [ESTRADE.gx + ESTRADE.w / 2, ESTRADE.gy + 1], ecran: [ESTRADE.gx + ESTRADE.w / 2, 0.6], table_intervenants: [INTERVENANTS.gx + 2, INTERVENANTS.gy + 0.4], micros: MICROS[0], regie: [REGIE[0] + 0.9, REGIE[1] + 0.4], buffet_sandwichs: [SANDWICHS[0] + 0.5, SANDWICHS[1] + 0.5],
    enfants: [ENFANTS[0] + 1.2, ENFANTS[1] + 1.0], piscine_fleurs: [n / 2, -2.4], piscine_bougies: [n / 2, -2.4], piscine_lumiere: [n / 2, -2.4],
    amariya: [AMARIYA[0] + 1.1, AMARIYA[1] + 0.7], fauteuils: [FAUTEUILS[0] + 1, FAUTEUILS[1] + 0.6], neggafa: NEGGAFA, gateau: GATEAU, henne: [HENNE[0] + 1.1, HENNE[1] + 1.1],
    arche: [ax, n - 2.8], fleurs: [ax, n - 0.7], mur_fleurs: [6.1, 0.5],
    allee: [ax, n / 2 + 2], fontaine: FONTAINE, petales: [n / 2, n / 2 - 1], ciel_lanternes: [n / 2, n / 2 - 2],
    piste: [PISTE.gx + PISTE.w / 2, 3.1], photobooth: [0.7, 4.3], nawar: [0.7, 7.0], buffet: [0.7, 9.9], candy_bar: [CANDY[0] + CANDY[2] / 2, CANDY[1] + CANDY[3] / 2], livre_dor: LIVRE_DOR,
    feux_froids: [PISTE.gx + PISTE.w / 2, 3.1], photographe: PHOTOGRAPHE, salon: [SALON.gx + 1.5, SALON.gy + 0.6], the_bar: [n - 0.7, 3.5], brume: [n / 2, n / 2],
    accueil: [ax, n - 1.0], musique: [n - 3.1, 1.2], lumiere: [n / 2, n / 2 - 1],
  };
  return {
    ESTRADE, INTERVENANTS, MICROS, REGIE, SANDWICHS, ENFANTS, AMARIYA, FAUTEUILS, NEGGAFA, GATEAU, HENNE, PISTE, FONTAINE, LIVRE_DOR, COMPTOIR, PHOTOGRAPHE, SALON, HONNEUR, ARCHE, MUR_FLEURS, DJ, SCENE_ORCHESTRE, PHOTOBOOTH, NAWAR, BUFFET,
    CANDY: { gx: CANDY[0], gy: CANDY[1], w: CANDY[2], d: CANDY[3] }, THE_BAR, TROUPE, ACOUSTIQUE, ENCEINTES, ALLEE, PORTE, POSTES_LANTERNES, CANDELABRES, BOUQUETS, FEUX,
    HOTESSES, MAITRE_HOTEL, HOTESSE_3, DEPART_INVITES, ANCRES, obstacles: placed as readonly Rect[],
  };
}

function grille(n: number, type: TableId) {
  const g = GABARITS[type];
  if (type === "conference") {
    // deux blocs de chaises séparés par une allée centrale ; la première rangée est devant l'estrade
    const gauche = 1.6, droite = n - 0.6, allee = 1.1, cx = (gauche + droite) / 2;
    const par = Math.max(1, Math.floor(((droite - gauche - allee) / 2 - 2 * g.dx) / g.px) + 1);
    const xs = [...Array.from({ length: par }, (_, k) => cx - allee / 2 - g.dx - k * g.px).reverse(), ...Array.from({ length: par }, (_, k) => cx + allee / 2 + g.dx + k * g.px)];
    const y0 = 4.5, rows = Math.max(1, Math.floor((n - 2.05 - y0) / g.py) + 1);
    return { cols: xs.length, rows, xs, ys: Array.from({ length: rows }, (_, r) => y0 + r * g.py), ax: cx };
  }
  const cols = Math.max(1, Math.floor((n - 0.5 - 1.3 - 2 * g.dx - 0.7) / g.px) + 1);
  const rows = Math.max(1, Math.floor((n - 5.75 - 2 * g.dy) / g.py) + 1);
  const x0 = 1.3 + g.dx, y0 = 4.0 + g.dy;
  // une allée un peu plus large entre la 1re et la 2e colonne : c'est l'allée de l'entrée
  const xs = Array.from({ length: cols }, (_, c) => (c === 0 ? x0 : x0 + g.px + 0.7 + (c - 1) * g.px));
  const ys = Array.from({ length: rows }, (_, r) => y0 + r * g.py);
  return { cols, rows, xs, ys, ax: cols >= 2 ? (xs[0] + xs[1]) / 2 : 3.9 };
}

/** Taille de la salle et emplacement des `nb` tables : seulement sur les cases libres, les premières posées sont celles du centre */
export function dimensionner(nb: number, type: TableId, A: Actifs, nbHautes = 0): Salle {
  const g = GABARITS[type], gh = GABARITS.hautes;
  let dernier: Salle | null = null;
  for (let n = N_MIN; n <= N_MAX; n++) {
    const gr = grille(n, type), pos = positions(n, gr.ax, A);
    const cx = (gr.xs[0] + gr.xs[gr.cols - 1]) / 2, cy = (gr.ys[0] + gr.ys[gr.rows - 1]) / 2;
    const cases: { x: number; y: number; d: number }[] = [];
    for (const y of gr.ys) for (const x of gr.xs) {
      const libre = !pos.obstacles.some((p) => !/^(pl|cd)\d/.test(p.id) &&  x - g.dx < p.x1 - 0.02 && p.x0 < x + g.dx - 0.02 && y - g.dy < p.y1 - 0.02 && p.y0 < y + g.dy - 0.02);
      if (libre) cases.push({ x, y, d: Math.hypot(x - cx, (y - cy) * 1.2) });
    }
    // conférence : on remplit d'abord les rangées de devant, en partant du centre ; sinon on part du centre de la salle
    if (type === "conference") cases.sort((a, b) => a.y - b.y || Math.abs(a.x - cx) - Math.abs(b.x - cx) || a.x - b.x);
    else cases.sort((a, b) => a.d - b.d || a.y - b.y || a.x - b.x);
    const tables = cases.slice(0, nb).map((c) => [c.x, c.y] as [number, number]);
    // les lanternes et candélabres ne s'imposent jamais aux tables : ceux qui les gêneraient sont simplement omis
    const gene = ([x, y]: [number, number]) => tables.some(([tx, ty]) => Math.abs(x - tx) < g.dx + 0.35 && Math.abs(y - ty) < g.dy + 0.35);
    pos.POSTES_LANTERNES.splice(0, pos.POSTES_LANTERNES.length, ...pos.POSTES_LANTERNES.filter((q) => !gene(q)));
    pos.CANDELABRES.splice(0, pos.CANDELABRES.length, ...pos.CANDELABRES.filter((q) => !gene(q)));
    // tables hautes en plus (cocktail) : sur la grille des mange-debout, là où il ne reste ni objet ni table assise
    const hautes: [number, number][] = [];
    if (nbHautes > 0 && type !== "hautes" && type !== "conference") {
      const libreH = (x: number, y: number) => x - gh.dx >= 0.3 && y - gh.dy >= 4.0 && x + gh.dx <= n - 0.3 && y + gh.dy <= n - 1.9
        && !pos.obstacles.some((p) => !/^(pl|cd)\d/.test(p.id) && x - gh.dx < p.x1 + 0.1 && p.x0 < x + gh.dx + 0.1 && y - gh.dy < p.y1 + 0.1 && p.y0 < y + gh.dy + 0.1)
        && !tables.some(([tx, ty]) => Math.abs(x - tx) < g.dx + gh.dx + 0.25 && Math.abs(y - ty) < g.dy + gh.dy + 0.25)
        && !hautes.some(([hx, hy]) => Math.abs(x - hx) < gh.px - 0.05 && Math.abs(y - hy) < gh.py - 0.05)
        && Math.abs(x - gr.ax) > gh.dx + 0.35; // l'allée de l'entrée reste dégagée
      const essais: { x: number; y: number }[] = [];
      for (let y = 4.0 + gh.dy; y <= n - 1.9 - gh.dy + 0.001; y += 0.35) for (let x = 0.3 + gh.dx; x <= n - 0.3 - gh.dx + 0.001; x += 0.35) essais.push({ x, y });
      // les mange-debout se regroupent d'abord vers l'entrée (espace cocktail), puis remontent
      essais.sort((a, b) => b.y - a.y || Math.abs(a.x - gr.ax) - Math.abs(b.x - gr.ax));
      for (const e of essais) { if (hautes.length >= nbHautes) break; if (libreH(e.x, e.y)) hautes.push([e.x, e.y]); }
      const gene2 = ([x, y]: [number, number]) => hautes.some(([tx, ty]) => Math.abs(x - tx) < gh.dx + 0.35 && Math.abs(y - ty) < gh.dy + 0.35);
      pos.POSTES_LANTERNES.splice(0, pos.POSTES_LANTERNES.length, ...pos.POSTES_LANTERNES.filter((q) => !gene2(q)));
      pos.CANDELABRES.splice(0, pos.CANDELABRES.length, ...pos.CANDELABRES.filter((q) => !gene2(q)));
    }
    dernier = { n, ax: gr.ax, tables, capacite: cases.length, pos, hautes };
    // la salle doit aussi rester aérée : les objets ne prennent qu'une part limitée du sol
    const aire = pos.obstacles.filter((r) => !/^(pl|cd)\d/.test(r.id)).reduce((t, r) => t + (r.x1 - r.x0) * (r.y1 - r.y0), 0);
    if (cases.length >= nb && hautes.length >= (type === "hautes" || type === "conference" ? 0 : nbHautes) && aire <= PART_OBJETS * n * n) return dernier;
  }
  return dernier!;
}
