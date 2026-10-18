// Dessins SVG en vue isométrique 2D : sol, décor du lieu et chaque élément du catalogue.
import { Fragment, ReactNode } from "react";
import { Lieu, LIEUX, Palette, TypeEvenement } from "./config";
import { Element, emprise } from "./logique";

export const TW = 64; // largeur d'une case à l'écran
export const TH = 32; // hauteur d'une case à l'écran

/** Point de la grille (x, y) à la hauteur z → coordonnées écran (avant translation de la scène). */
export const pt = (x: number, y: number, z = 0): [number, number] => [((x - y) * TW) / 2, ((x + y) * TH) / 2 - z];
const pts = (l: [number, number][]) => l.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(" ");

/** Assombrit (amt > 0) ou éclaircit (amt < 0) une couleur hexadécimale. */
export function teinte(hex: string, amt: number) {
  const n = parseInt(hex.replace("#", ""), 16);
  const c = [n >> 16, (n >> 8) & 255, n & 255].map((v) => Math.round(amt >= 0 ? v * (1 - amt) : v + (255 - v) * -amt));
  return `#${c.map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0")).join("")}`;
}

// ── Formes de base ──────────────────────────────────────────────────────────
/** Parallélépipède posé sur la grille : x, y, largeur, profondeur, hauteur de départ, hauteur. */
export function Boite({ x, y, w, h, z = 0, ht, c, contour = true }: { x: number; y: number; w: number; h: number; z?: number; ht: number; c: string; contour?: boolean }) {
  const s = contour ? teinte(c, 0.35) : "none";
  return (
    <g strokeWidth={0.6} stroke={s} strokeLinejoin="round">
      <polygon points={pts([pt(x, y + h, z), pt(x + w, y + h, z), pt(x + w, y + h, z + ht), pt(x, y + h, z + ht)])} fill={teinte(c, 0.12)} />
      <polygon points={pts([pt(x + w, y, z), pt(x + w, y + h, z), pt(x + w, y + h, z + ht), pt(x + w, y, z + ht)])} fill={teinte(c, 0.24)} />
      <polygon points={pts([pt(x, y, z + ht), pt(x + w, y, z + ht), pt(x + w, y + h, z + ht), pt(x, y + h, z + ht)])} fill={c} />
    </g>
  );
}

/** Cylindre (table ronde, gâteau, colonne) centré en (cx, cy), rayon r en cases. */
export function Cylindre({ cx, cy, r, z = 0, ht, c, haut }: { cx: number; cy: number; r: number; z?: number; ht: number; c: string; haut?: string }) {
  const [sx, sy] = pt(cx, cy, z);
  const rx = (r * TW) / Math.SQRT2, ry = (r * TH) / Math.SQRT2;
  const s = teinte(c, 0.35);
  return (
    <g strokeWidth={0.6} stroke={s}>
      <path d={`M${sx - rx},${sy - ht} L${sx - rx},${sy} A${rx},${ry} 0 0 0 ${sx + rx},${sy} L${sx + rx},${sy - ht} Z`} fill={teinte(c, 0.14)} />
      <ellipse cx={sx} cy={sy - ht} rx={rx} ry={ry} fill={haut ?? c} />
    </g>
  );
}

const Rond = ({ x, y, z, r, c, o = 1 }: { x: number; y: number; z: number; r: number; c: string; o?: number }) => {
  const [sx, sy] = pt(x, y, z);
  return <circle cx={sx} cy={sy} r={r} fill={c} opacity={o} />;
};

/** Bouquet : grappe de fleurs et de feuilles centrée en (x, y, z). */
function Bouquet({ x, y, z, c, taille = 1 }: { x: number; y: number; z: number; c: string; taille?: number }) {
  const [sx, sy] = pt(x, y, z);
  const f = (dx: number, dy: number, r: number, col: string, k: number) => <circle key={k} cx={sx + dx * taille} cy={sy + dy * taille} r={r * taille} fill={col} stroke={teinte(col, 0.25)} strokeWidth={0.5} />;
  const vert = "#7E9A6A";
  return (
    <g>
      {[[-9, 2, 4.5], [9, 1, 4.5], [0, 5, 4], [-4, -6, 4], [6, -5, 4]].map(([dx, dy, r], i) => <ellipse key={`v${i}`} cx={sx + dx * taille} cy={sy + dy * taille} rx={r * taille} ry={r * 0.6 * taille} fill={vert} />)}
      {[[-5, -1, 5], [4, -2, 5.5], [0, -7, 5], [-1, 3, 4.5], [7, 3, 4], [-8, -5, 3.5]].map(([dx, dy, r], i) => f(dx, dy, r, i % 3 === 2 ? teinte(c, -0.35) : i % 2 ? teinte(c, 0.08) : c, i))}
    </g>
  );
}

function Chaise({ x, y, angle, c }: { x: number; y: number; angle: number; c: string }) {
  // Assise + dossier tourné à l'opposé de la table
  const bx = x + Math.cos(angle) * 0.13, by = y + Math.sin(angle) * 0.13;
  return (
    <g>
      <Boite x={x - 0.12} y={y - 0.12} w={0.24} h={0.24} ht={9} c={c} />
      <Boite x={bx - 0.07} y={by - 0.07} w={0.14} h={0.14} z={9} ht={11} c={teinte(c, 0.05)} />
    </g>
  );
}

/** Personnage du personnel (vue isométrique, centré sur sa case). */
function Personne({ x, y, haut, bas, accessoire, peau = "#E2B894", cheveux = "#3B2A20", jupe = false }: {
  x: number; y: number; haut: string; bas: string; accessoire?: "plateau" | "tablette" | "noeud"; peau?: string; cheveux?: string; jupe?: boolean;
}) {
  const [sx, sy] = pt(x, y);
  const contour = teinte(haut, 0.4);
  return (
    <g>
      <ellipse cx={sx} cy={sy} rx={11} ry={5.5} fill="#000" opacity={0.12} />
      {jupe ? (
        <path d={`M${sx - 4},${sy - 22} L${sx + 4},${sy - 22} L${sx + 7},${sy - 8} L${sx - 7},${sy - 8} Z`} fill={bas} stroke={teinte(bas, 0.35)} strokeWidth={0.5} />
      ) : (
        <><rect x={sx - 4.6} y={sy - 22} width={4} height={21} rx={1.5} fill={bas} /><rect x={sx + 0.6} y={sy - 22} width={4} height={21} rx={1.5} fill={teinte(bas, 0.15)} /></>
      )}
      {jupe && <><rect x={sx - 4} y={sy - 9} width={2.6} height={8.5} rx={1} fill={peau} /><rect x={sx + 1.4} y={sy - 9} width={2.6} height={8.5} rx={1} fill={teinte(peau, 0.08)} /></>}
      <rect x={sx - 3.6} y={sy - 1.6} width={3.2} height={1.8} rx={0.8} fill="#1E1E1E" /><rect x={sx + 0.8} y={sy - 1.6} width={3.2} height={1.8} rx={0.8} fill="#1E1E1E" />
      <path d={`M${sx - 6.5},${sy - 38} Q${sx},${sy - 41} ${sx + 6.5},${sy - 38} L${sx + 5.5},${sy - 21} L${sx - 5.5},${sy - 21} Z`} fill={haut} stroke={contour} strokeWidth={0.5} />
      <rect x={sx - 9} y={sy - 37} width={3} height={13} rx={1.5} fill={teinte(haut, 0.1)} />
      <rect x={sx + 6} y={sy - 37} width={3} height={13} rx={1.5} fill={teinte(haut, 0.1)} />
      <circle cx={sx} cy={sy - 45} r={5.4} fill={peau} />
      <path d={`M${sx - 5.6},${sy - 45} Q${sx - 5},${sy - 52.5} ${sx},${sy - 51.5} Q${sx + 5.5},${sy - 52.5} ${sx + 5.6},${sy - 45} Q${sx + 2},${sy - 49} ${sx - 5.6},${sy - 45} Z`} fill={cheveux} />
      {accessoire === "noeud" && <><path d={`M${sx - 3},${sy - 38.5} L${sx},${sy - 37} L${sx - 3},${sy - 35.5} Z M${sx + 3},${sy - 38.5} L${sx},${sy - 37} L${sx + 3},${sy - 35.5} Z`} fill="#141414" /><path d={`M${sx - 2},${sy - 39.5} L${sx + 2},${sy - 39.5} L${sx},${sy - 33} Z`} fill="#FFFFFF" opacity={0.9} /></>}
      {accessoire === "plateau" && (
        <g>
          <ellipse cx={sx + 11} cy={sy - 37} rx={8} ry={3} fill="#D9D9D9" stroke="#9A9A9A" strokeWidth={0.5} />
          {[-4, 0, 4].map((dx) => <path key={dx} d={`M${sx + 11 + dx - 1.6},${sy - 44} L${sx + 11 + dx + 1.6},${sy - 44} L${sx + 11 + dx + 0.8},${sy - 38.5} L${sx + 11 + dx - 0.8},${sy - 38.5} Z`} fill="#F3E3B0" stroke="#C9B26A" strokeWidth={0.4} />)}
        </g>
      )}
      {accessoire === "tablette" && <rect x={sx - 12} y={sy - 33} width={6} height={8} rx={1} fill="#2A2A2A" stroke="#C9A74E" strokeWidth={0.6} />}
    </g>
  );
}

// ── Sol et décor du lieu ────────────────────────────────────────────────────
export function Sol({ cols, rows, lieu }: { cols: number; rows: number; lieu: Lieu }) {
  const L = LIEUX.find((l) => l.id === lieu)!;
  const cases: ReactNode[] = [];
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    const c = lieu === "salle" ? L.sol[(x + Math.floor(y / 2)) % 2] : L.sol[(x + y) % 2];
    cases.push(<polygon key={`${x}-${y}`} points={pts([pt(x, y), pt(x + 1, y), pt(x + 1, y + 1), pt(x, y + 1)])} fill={c} stroke={teinte(c, 0.06)} strokeWidth={0.5} />);
  }
  const ep = 12; // épaisseur du socle
  return (
    <g>
      <polygon points={pts([pt(0, rows), pt(cols, rows), pt(cols, rows, -ep), pt(0, rows, -ep)])} fill={teinte(L.bord, 0.1)} />
      <polygon points={pts([pt(cols, 0), pt(cols, rows), pt(cols, rows, -ep), pt(cols, 0, -ep)])} fill={teinte(L.bord, 0.25)} />
      {cases}
    </g>
  );
}

function Arbre({ x, y, k }: { x: number; y: number; k: number }) {
  const [sx, sy] = pt(x, y);
  const v = ["#8FAE77", "#7FA06A", "#9DBA84"][k % 3];
  return (
    <g>
      <rect x={sx - 3} y={sy - 40} width={6} height={40} fill="#8B6B4E" />
      <circle cx={sx} cy={sy - 58} r={24} fill={v} /><circle cx={sx - 14} cy={sy - 46} r={16} fill={teinte(v, 0.08)} /><circle cx={sx + 14} cy={sy - 48} r={17} fill={teinte(v, -0.12)} />
    </g>
  );
}

/** Murs, arbres ou garde-corps derrière la scène, selon le lieu. */
export function DecorArriere({ cols, rows, lieu }: { cols: number; rows: number; lieu: Lieu }) {
  if (lieu === "salle") {
    const H = 120;
    const fenetres = (n: number, axe: "x" | "y") => Array.from({ length: Math.floor(n / 3) }, (_, i) => {
      const a = 1 + i * 3;
      const p = axe === "x" ? [pt(a, 0, 26), pt(a + 1.2, 0, 26), pt(a + 1.2, 0, 96), pt(a, 0, 96)] : [pt(0, a, 26), pt(0, a + 1.2, 26), pt(0, a + 1.2, 96), pt(0, a, 96)];
      return <polygon key={`${axe}${i}`} points={pts(p as [number, number][])} fill="#DCE8EF" stroke="#C9B48A" strokeWidth={2} />;
    });
    return (
      <g>
        <polygon points={pts([pt(0, 0), pt(cols, 0), pt(cols, 0, H), pt(0, 0, H)])} fill="#F5EEE1" stroke="#E2D5BC" />
        <polygon points={pts([pt(0, 0), pt(0, rows), pt(0, rows, H), pt(0, 0, H)])} fill="#EDE3D1" stroke="#E2D5BC" />
        {fenetres(cols, "x")}{fenetres(rows, "y")}
        <polygon points={pts([pt(0, 0, H), pt(cols, 0, H), pt(cols, 0, H - 8), pt(0, 0, H - 8)])} fill="#E3D3B1" />
        <polygon points={pts([pt(0, 0, H), pt(0, rows, H), pt(0, rows, H - 8), pt(0, 0, H - 8)])} fill="#D9C8A4" />
      </g>
    );
  }
  if (lieu === "jardin") {
    const arbres: [number, number][] = [[-1.2, -1.2], [cols * 0.35, -1.6], [cols * 0.7, -1.4], [cols + 0.2, -1.3], [-1.6, rows * 0.4], [-1.4, rows * 0.8]];
    return <g>{arbres.map(([x, y], i) => <Arbre key={i} x={x} y={y} k={i} />)}</g>;
  }
  // terrasse : garde-corps et plantes en pot
  const poteaux = (n: number, axe: "x" | "y") => Array.from({ length: n + 1 }, (_, i) => {
    const [a, b] = axe === "x" ? pt(i, 0) : pt(0, i);
    return <line key={`${axe}${i}`} x1={a} y1={b} x2={a} y2={b - 30} stroke="#BFB3A0" strokeWidth={2} />;
  });
  const pot = (x: number, y: number) => (
    <g key={`${x}${y}`}><Cylindre cx={x} cy={y} r={0.22} ht={14} c="#C98261" /><Bouquet x={x} y={y} z={22} c="#9DAE89" taille={1.2} /></g>
  );
  return (
    <g>
      {poteaux(cols, "x")}{poteaux(rows, "y")}
      <polyline points={pts([pt(0, rows, 30), pt(0, 0, 30), pt(cols, 0, 30)])} fill="none" stroke="#A89A84" strokeWidth={3} />
      {pot(0.3, 0.3)}{pot(cols - 0.3, 0.3)}{pot(0.3, rows - 0.3)}
    </g>
  );
}

// ── Les éléments ────────────────────────────────────────────────────────────
export interface ContexteDessin { palette: Palette; type: TypeEvenement; centres: { actif: boolean; couleur?: string }; couleur?: string }

/** Coordonnées locales (u le long du grand côté, v en profondeur) → grille, selon la rotation. */
function local(e: Element) {
  const { w, h } = emprise(e);
  const t = !!e.tourne;
  return {
    L: w, P: h, t,
    p: (u: number, v: number): [number, number] => (t ? [e.x + v, e.y + u] : [e.x + u, e.y + v]),
    r: (u: number, v: number, du: number, dv: number) => (t ? { x: e.x + v, y: e.y + u, w: dv, h: du } : { x: e.x + u, y: e.y + v, w: du, h: dv }),
  };
}

export function DessinElement({ e, ctx }: { e: Element; ctx: ContexteDessin }) {
  const { palette } = ctx;
  const coul = ctx.couleur ?? palette.nappe;
  const chaise = ctx.palette.accent === "#2B2B2B" ? "#F2F2F2" : teinte(palette.deco, -0.45);
  const { w, h } = emprise(e);
  const cx = e.x + w / 2, cy = e.y + h / 2;

  switch (e.type) {
    case "table_ronde": {
      const n = 10, R = 0.8;
      const chaises = Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2;
        return { x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R, a, avant: Math.cos(a) + Math.sin(a) > 0 };
      });
      const centre = ctx.centres.actif;
      return (
        <g>
          {chaises.filter((c) => !c.avant).map((c, i) => <Chaise key={`a${i}`} x={c.x} y={c.y} angle={c.a} c={chaise} />)}
          <Cylindre cx={cx} cy={cy} r={0.56} ht={17} c={coul} haut={teinte(coul, -0.15)} />
          {Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2; return <Rond key={`p${i}`} x={cx + Math.cos(a) * 0.38} y={cy + Math.sin(a) * 0.38} z={17} r={2.2} c="#FFFFFF" o={0.9} />; })}
          {centre && <><Cylindre cx={cx} cy={cy} r={0.07} z={17} ht={5} c="#E9E4D8" /><Bouquet x={cx} y={cy} z={27} c={ctx.centres.couleur ?? palette.fleurs} taille={0.85} /></>}
          {chaises.filter((c) => c.avant).map((c, i) => <Chaise key={`b${i}`} x={c.x} y={c.y} angle={c.a} c={chaise} />)}
        </g>
      );
    }
    case "table_rect": {
      const l = local(e);
      const arriere = [0.4, 1.0, 1.6].map((u) => l.p(u, 0.08));
      const avant = [0.4, 1.0, 1.6].map((u) => l.p(u, 0.92));
      const ang = (dir: number) => (l.t ? (dir < 0 ? Math.PI : 0) : dir < 0 ? -Math.PI / 2 : Math.PI / 2);
      const t = l.r(0.1, 0.24, 1.8, 0.52);
      const [mx, my] = l.p(1, 0.5);
      return (
        <g>
          {arriere.map(([x, y], i) => <Chaise key={`a${i}`} x={x} y={y} angle={ang(-1)} c={chaise} />)}
          <Boite {...t} ht={16} c={coul} />
          {ctx.centres.actif && <Bouquet x={mx} y={my} z={22} c={ctx.centres.couleur ?? palette.fleurs} taille={0.75} />}
          {avant.map(([x, y], i) => <Chaise key={`b${i}`} x={x} y={y} angle={ang(1)} c={chaise} />)}
        </g>
      );
    }
    case "honneur": {
      const l = local(e);
      if (ctx.type === "pro") {
        const [px, py] = l.p(2.5, 0.75);
        return (
          <g>
            <Boite {...l.r(0, 0, l.L, l.P)} ht={8} c="#6E5B48" />
            <Boite {...l.r(0.3, 0.05, 2.4, 0.08)} z={8} ht={64} c="#2F3540" />
            <Boite {...l.r(0.38, 0.13, 2.24, 0.01)} z={16} ht={48} c="#9CC3DA" contour={false} />
            <Boite x={px - 0.15} y={py - 0.12} w={0.3} h={0.24} z={8} ht={30} c={palette.deco} />
          </g>
        );
      }
      const nb = ctx.type === "babyshower" ? 4 : 6;
      const sieges = Array.from({ length: nb }, (_, i) => l.p(0.3 + (2.4 / (nb - 1)) * i, 0.22));
      const fleurs = Array.from({ length: 7 }, (_, i) => l.p(0.2 + i * 0.43, 0.92));
      return (
        <g>
          <Boite {...l.r(0.05, 0, 2.9, 0.06)} ht={52} c={teinte(palette.deco, -0.55)} />
          {sieges.map(([x, y], i) => <Chaise key={i} x={x} y={y} angle={l.t ? Math.PI : -Math.PI / 2} c={teinte(chaise, -0.2)} />)}
          <Boite {...l.r(0.1, 0.42, 2.8, 0.5)} ht={19} c={coul} />
          {fleurs.map(([x, y], i) => <Bouquet key={i} x={x} y={y} z={19} c={ctx.couleur && e.type === "honneur" ? palette.fleurs : palette.fleurs} taille={0.55} />)}
        </g>
      );
    }
    case "arche": {
      const l = local(e);
      const fl = ctx.couleur ?? palette.fleurs;
      if (ctx.type === "pro") {
        return (
          <g>
            <Boite {...l.r(0.1, 0.4, 1.8, 0.12)} ht={72} c={teinte(palette.deco, -0.3)} />
            {Array.from({ length: 4 }, (_, i) => Array.from({ length: 3 }, (_, j) => { const [x, y] = l.p(0.4 + i * 0.4, 0.52); return <Rond key={`${i}${j}`} x={x} y={y} z={18 + j * 18} r={3} c={teinte(palette.deco, 0.3)} o={0.8} />; }))}
            <Bouquet x={l.p(0.15, 0.6)[0]} y={l.p(0.15, 0.6)[1]} z={10} c={fl} /><Bouquet x={l.p(1.85, 0.6)[0]} y={l.p(1.85, 0.6)[1]} z={10} c={fl} />
          </g>
        );
      }
      const [ax, ay] = l.p(0.25, 0.5), [bx, by] = l.p(1.75, 0.5);
      const A = pt(ax, ay, 78), B = pt(bx, by, 78);
      const C: [number, number] = [(A[0] + B[0]) / 2, Math.min(A[1], B[1]) - 52];
      const bez = (t: number): [number, number] => [(1 - t) ** 2 * A[0] + 2 * (1 - t) * t * C[0] + t * t * B[0], (1 - t) ** 2 * A[1] + 2 * (1 - t) * t * C[1] + t * t * B[1]];
      const poteau = palette.accent === "#2B2B2B" ? "#2B2B2B" : "#F4EFE6";
      return (
        <g>
          <Boite x={ax - 0.06} y={ay - 0.06} w={0.12} h={0.12} ht={78} c={poteau} />
          <Boite x={bx - 0.06} y={by - 0.06} w={0.12} h={0.12} ht={78} c={poteau} />
          <path d={`M${A[0]},${A[1]} Q${C[0]},${C[1]} ${B[0]},${B[1]}`} fill="none" stroke={poteau} strokeWidth={6} strokeLinecap="round" />
          {Array.from({ length: 11 }, (_, i) => { const [x, y] = bez(i / 10); return <g key={i}><circle cx={x} cy={y} r={i % 2 ? 5 : 7} fill={i % 3 === 1 ? teinte(fl, -0.35) : fl} stroke={teinte(fl, 0.25)} strokeWidth={0.5} /><ellipse cx={x + 5} cy={y + 4} rx={4} ry={2.5} fill="#7E9A6A" /></g>; })}
          <Bouquet x={ax} y={ay} z={6} c={fl} taille={1.1} /><Bouquet x={bx} y={by} z={6} c={fl} taille={1.1} />
        </g>
      );
    }
    case "fleurs": {
      const col = palette.accent === "#2B2B2B" ? "#2B2B2B" : "#F4EFE6";
      return <g><Cylindre cx={cx} cy={cy} r={0.16} ht={36} c={col} /><Bouquet x={cx} y={cy} z={46} c={ctx.couleur ?? palette.fleurs} taille={1.35} /></g>;
    }
    case "guirlandes": {
      const poteau = ctx.couleur ?? palette.deco;
      const [sx, sy] = pt(cx, cy, 92);
      const fils = [[-46, 30], [46, 30], [-6, 52]];
      return (
        <g>
          <ellipse cx={pt(cx, cy)[0]} cy={pt(cx, cy)[1]} rx={40} ry={20} fill="#FFE7A3" opacity={0.35} />
          <Boite x={cx - 0.04} y={cy - 0.04} w={0.08} h={0.08} ht={92} c={poteau} />
          {fils.map(([dx, dy], i) => {
            const ex = sx + dx, ey = sy + dy, mxx = sx + dx / 2, myy = sy + dy / 2 + 14;
            return (
              <g key={i}>
                <path d={`M${sx},${sy} Q${mxx},${myy} ${ex},${ey}`} fill="none" stroke="#5B4B3A" strokeWidth={0.8} />
                {Array.from({ length: 6 }, (_, k) => { const t = (k + 1) / 7; const x = (1 - t) ** 2 * sx + 2 * (1 - t) * t * mxx + t * t * ex; const y = (1 - t) ** 2 * sy + 2 * (1 - t) * t * myy + t * t * ey; return <g key={k}><circle cx={x} cy={y + 2} r={4.5} fill="#FFE7A3" opacity={0.45} /><circle cx={x} cy={y + 2} r={2.2} fill="#FFF3C9" stroke="#E6B84E" strokeWidth={0.5} /></g>; })}
              </g>
            );
          })}
        </g>
      );
    }
    case "piste": {
      const [a, b] = ctx.couleur ? [teinte(ctx.couleur, -0.6), ctx.couleur] : palette.piste;
      const n = 6, s = w / n;
      const dalles: ReactNode[] = [];
      for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
        const x = e.x + i * s, y = e.y + j * s;
        dalles.push(<polygon key={`${i}-${j}`} points={pts([pt(x, y, 4), pt(x + s, y, 4), pt(x + s, y + s, 4), pt(x, y + s, 4)])} fill={(i + j) % 2 ? b : a} stroke={teinte(b, 0.2)} strokeWidth={0.4} />);
      }
      return (
        <g>
          <Boite x={e.x} y={e.y} w={w} h={h} ht={4} c={teinte(b, 0.15)} />
          {dalles}
          {[[0.7, 0.8], [2.1, 1.3], [1.4, 2.3]].map(([u, v], i) => { const [x, y] = pt(e.x + u, e.y + v, 4); return <path key={i} d={`M${x},${y - 5} L${x + 1.6},${y - 1.6} L${x + 5},${y} L${x + 1.6},${y + 1.6} L${x},${y + 5} L${x - 1.6},${y + 1.6} L${x - 5},${y} L${x - 1.6},${y - 1.6} Z`} fill="#FFFFFF" opacity={0.85} />; })}
        </g>
      );
    }
    case "dj": {
      const l = local(e);
      const accent = ctx.couleur ?? palette.deco;
      const [d1x, d1y] = l.p(0.75, 0.6), [d2x, d2y] = l.p(1.25, 0.6);
      return (
        <g>
          <Boite {...l.r(0.02, 0.05, 0.32, 0.32)} ht={50} c="#2A2A2A" />
          <Boite {...l.r(1.66, 0.05, 0.32, 0.32)} ht={50} c="#2A2A2A" />
          <Boite {...l.r(0.38, 0.35, 1.24, 0.55)} ht={30} c="#333333" />
          <Boite {...l.r(0.38, 0.86, 1.24, 0.04)} z={8} ht={10} c={accent} contour={false} />
          <Cylindre cx={d1x} cy={d1y} r={0.17} z={30} ht={2} c="#1B1B1B" haut="#555" />
          <Cylindre cx={d2x} cy={d2y} r={0.17} z={30} ht={2} c="#1B1B1B" haut="#555" />
          <Rond x={d1x} y={d1y} z={32} r={2} c="#D9D9D9" /><Rond x={d2x} y={d2y} z={32} r={2} c="#D9D9D9" />
        </g>
      );
    }
    case "buffet": {
      const l = local(e);
      const plats = [0.5, 1.5, 2.5].map((u) => l.p(u, 0.55));
      const mets = ["#D9A441", "#9DAE89", "#C9705A"];
      return (
        <g>
          <Boite {...l.r(0.06, 0.22, 2.88, 0.62)} ht={17} c={coul} />
          {plats.map(([x, y], i) => <g key={i}><Cylindre cx={x} cy={y} r={0.2} z={17} ht={6} c="#CFCFCF" haut="#EDEDED" /><Rond x={x} y={y} z={24} r={5} c={mets[i]} o={0.9} /></g>)}
        </g>
      );
    }
    case "bar": {
      const l = local(e);
      const bouteilles = Array.from({ length: 7 }, (_, i) => l.p(0.25 + i * 0.25, 0.18));
      const verres = Array.from({ length: 4 }, (_, i) => l.p(0.4 + i * 0.4, 0.78));
      const cb = ["#7A9A6A", "#C98261", "#D9A441", "#9CC3DA", "#B05A6A", "#7A9A6A", "#D9A441"];
      return (
        <g>
          <Boite {...l.r(0.05, 0.04, 1.9, 0.18)} ht={44} c="#7A5C43" />
          {bouteilles.map(([x, y], i) => { const [sx, sy] = pt(x, y, 44); return <rect key={i} x={sx - 2} y={sy - 13} width={4} height={13} rx={1.5} fill={cb[i]} />; })}
          <Boite {...l.r(0.05, 0.42, 1.9, 0.5)} ht={30} c="#8A6A4F" />
          <Boite {...l.r(0.02, 0.4, 1.96, 0.54)} z={30} ht={2} c="#D8C3A1" />
          {verres.map(([x, y], i) => { const [sx, sy] = pt(x, y, 32); return <path key={i} d={`M${sx - 2.5},${sy - 7} L${sx + 2.5},${sy - 7} L${sx + 1.5},${sy} L${sx - 1.5},${sy} Z`} fill="#E8F1F5" stroke="#9FB7C4" strokeWidth={0.5} />; })}
        </g>
      );
    }
    case "photobooth": {
      const l = local(e);
      const fond = ctx.couleur ?? palette.fleurs;
      const [tx, ty] = l.p(1, 0.85);
      const [hx, hy] = pt(tx, ty, 34);
      return (
        <g>
          <Boite {...l.r(0.1, 0.05, 1.8, 0.1)} ht={66} c={teinte(fond, -0.25)} />
          {Array.from({ length: 5 }, (_, i) => { const [x, y] = l.p(0.3 + i * 0.35, 0.16); return <Bouquet key={i} x={x} y={y} z={46 + (i % 2) * 10} c={fond} taille={0.6} />; })}
          {[-7, 0, 7].map((dx, i) => { const [bx, by] = pt(tx, ty); return <line key={i} x1={hx} y1={hy} x2={bx + dx} y2={by + (i === 1 ? -3 : 3)} stroke="#3A3A3A" strokeWidth={1.2} />; })}
          <rect x={hx - 7} y={hy - 9} width={14} height={9} rx={2} fill="#2A2A2A" /><circle cx={hx} cy={hy - 4.5} r={2.6} fill="#8FB3C9" />
        </g>
      );
    }
    case "lounge": {
      const c = ctx.couleur ?? palette.deco;
      const tissu = teinte(c, -0.25);
      return (
        <g>
          <Boite x={e.x + 0.1} y={e.y + 0.08} w={1.8} h={0.14} ht={26} c={tissu} />
          <Boite x={e.x + 0.1} y={e.y + 0.08} w={0.14} h={1.5} ht={26} c={tissu} />
          <Boite x={e.x + 0.24} y={e.y + 0.22} w={1.66} h={0.42} ht={12} c={teinte(tissu, -0.15)} />
          <Boite x={e.x + 0.24} y={e.y + 0.64} w={0.42} h={0.94} ht={12} c={teinte(tissu, -0.15)} />
          {[[0.55, 0.3], [1.1, 0.3], [0.32, 1.0]].map(([u, v], i) => <Boite key={i} x={e.x + u} y={e.y + v} w={0.28} h={0.18} z={12} ht={9} c={teinte(palette.fleurs, -0.1)} />)}
          <Cylindre cx={e.x + 1.25} cy={e.y + 1.2} r={0.3} ht={10} c="#B08E6A" />
          <Cylindre cx={e.x + 1.75} cy={e.y + 1.75} r={0.17} ht={10} c={tissu} />
        </g>
      );
    }
    case "hotesse": {
      const tenue = ctx.couleur ?? (palette.accent === "#2B2B2B" ? "#2B2B2B" : teinte(palette.deco, 0.15));
      return <Personne x={cx} y={cy} haut={tenue} bas={teinte(tenue, 0.25)} jupe accessoire="tablette" cheveux="#2E1F17" />;
    }
    case "serveur": {
      const tablier = ctx.couleur ?? "#2B2B2B";
      return <Personne x={cx} y={cy} haut="#F7F5F0" bas={tablier} accessoire="plateau" cheveux="#1F1A17" peau="#D9A882" />;
    }
    case "maitre_hotel": {
      const costume = ctx.couleur ?? "#232733";
      return <Personne x={cx} y={cy} haut={costume} bas={teinte(costume, 0.1)} accessoire="noeud" cheveux="#6B5A4C" peau="#E7C3A0" />;
    }
    case "nawar": {
      const l = local(e);
      const or = "#C9A74E";
      const flacons = Array.from({ length: 8 }, (_, i) => l.p(0.2 + i * 0.22, 0.2));
      const teintes = ["#E9B8BC", "#F3E3B0", "#C7DCE6", "#E8D3A8", "#D9B6D6", "#BFD8C2", "#F2C9A0", "#E9B8BC"];
      const essais = Array.from({ length: 5 }, (_, i) => l.p(0.35 + i * 0.32, 0.7));
      const [ex, ey] = l.p(1, 0.08);
      const [esx, esy] = pt(ex, ey, 78);
      return (
        <g>
          <Boite {...l.r(0.05, 0.04, 1.9, 0.16)} ht={40} c="#F4EFE6" />
          <Boite {...l.r(0.05, 0.04, 1.9, 0.16)} z={40} ht={2} c={or} />
          {flacons.map(([x, y], i) => { const [fx, fy] = pt(x, y, 42); return <g key={i}><rect x={fx - 2.6} y={fy - 9} width={5.2} height={9} rx={2} fill={teintes[i]} stroke={teinte(teintes[i], 0.3)} strokeWidth={0.4} opacity={0.95} /><rect x={fx - 1.3} y={fy - 12} width={2.6} height={3} rx={0.6} fill={or} /></g>; })}
          <Boite {...l.r(0.05, 0.42, 1.9, 0.5)} ht={28} c="#FBF8F1" />
          <Boite {...l.r(0.02, 0.4, 1.96, 0.54)} z={28} ht={2} c={or} />
          {essais.map(([x, y], i) => { const [fx, fy] = pt(x, y, 30); return <g key={i}><path d={`M${fx - 2.4},${fy} L${fx + 2.4},${fy} L${fx + 2},${fy - 6} Q${fx},${fy - 8} ${fx - 2},${fy - 6} Z`} fill={teintes[(i * 3) % 8]} stroke={teinte(teintes[(i * 3) % 8], 0.3)} strokeWidth={0.4} /><circle cx={fx} cy={fy - 8.5} r={1.4} fill={or} /></g>; })}
          <rect x={esx - 16} y={esy - 12} width={32} height={12} rx={2} fill="#141414" />
          <text x={esx} y={esy - 3.5} textAnchor="middle" fontSize={7} fontFamily="Georgia, serif" letterSpacing={1.2} fill={or}>NAWAR</text>
          <line x1={esx} y1={esy} x2={pt(ex, ey, 42)[0]} y2={pt(ex, ey, 42)[1]} stroke={or} strokeWidth={1} />
        </g>
      );
    }
    case "fauteuils": {
      const l = local(e);
      const tissu = ctx.couleur ?? (palette.accent === "#2B2B2B" ? "#F4EFE6" : teinte(palette.deco, -0.15));
      const or = "#C9A74E";
      const fauteuil = (u: number) => {
        const [fx, fy] = l.p(u, 0.55);
        const dos = l.r(u - 0.24, 0.16, 0.48, 0.08);
        const [tx, ty] = pt(...l.p(u, 0.2), 54);
        return (
          <g key={u}>
            <Boite {...dos} z={6} ht={44} c={or} />
            <Boite {...l.r(u - 0.2, 0.17, 0.4, 0.06)} z={20} ht={28} c={tissu} contour={false} />
            <ellipse cx={tx} cy={ty} rx={11} ry={6} fill={or} stroke={teinte(or, 0.3)} strokeWidth={0.6} />
            <Boite {...l.r(u - 0.26, 0.22, 0.08, 0.56)} z={6} ht={22} c={or} />
            <Boite {...l.r(u + 0.18, 0.22, 0.08, 0.56)} z={6} ht={22} c={or} />
            <Boite x={fx - 0.18} y={fy - 0.2} w={0.36} h={0.4} z={6} ht={12} c={tissu} />
          </g>
        );
      };
      const [b1x, b1y] = l.p(0.08, 0.85), [b2x, b2y] = l.p(1.92, 0.85);
      return (
        <g>
          <Boite {...l.r(0, 0, l.L, l.P)} ht={6} c={palette.accent === "#2B2B2B" ? "#EDEDED" : "#F4EFE6"} />
          {fauteuil(0.52)}{fauteuil(1.48)}
          <Bouquet x={b1x} y={b1y} z={8} c={palette.fleurs} taille={0.7} />
          <Bouquet x={b2x} y={b2y} z={8} c={palette.fleurs} taille={0.7} />
        </g>
      );
    }
    case "table_haute": {
      const [sx, sy] = pt(cx, cy);
      const rub = palette.accent;
      return (
        <g>
          <ellipse cx={sx} cy={sy} rx={14} ry={7} fill="#000" opacity={0.08} />
          <path d={`M${sx - 9},${sy} L${sx - 4},${sy - 26} L${sx + 4},${sy - 26} L${sx + 9},${sy} Z`} fill={teinte(coul, 0.08)} stroke={teinte(coul, 0.3)} strokeWidth={0.6} />
          <path d={`M${sx - 4.6},${sy - 15} Q${sx},${sy - 12.5} ${sx + 4.6},${sy - 15}`} stroke={rub} strokeWidth={2.2} fill="none" />
          <Cylindre cx={cx} cy={cy} r={0.3} z={26} ht={4} c={coul} haut={teinte(coul, -0.15)} />
          {[[-5, -1], [4, 1]].map(([dx, dy], i) => { const [gx, gy] = pt(cx, cy, 31); return <path key={i} d={`M${gx + dx - 1.8},${gy + dy - 7} L${gx + dx + 1.8},${gy + dy - 7} L${gx + dx + 0.6},${gy + dy} L${gx + dx - 0.6},${gy + dy} Z`} fill="#F3E3B0" stroke="#C9B26A" strokeWidth={0.4} />; })}
        </g>
      );
    }
    case "amaria": {
      const or = ctx.couleur ?? "#C9A74E";
      const rideau = palette.accent === "#2B2B2B" ? "#F7F5F0" : palette.fleurs === "#FBF8F1" ? "#E8D3A8" : teinte(palette.fleurs, 0.1);
      const porteurs = [[0.35, 0.45], [1.65, 0.45], [0.35, 1.55], [1.65, 1.55]] as const;
      const derriere = porteurs.filter(([u, v]) => u + v < 2), devant = porteurs.filter(([u, v]) => u + v >= 2);
      const porteur = ([u, v]: readonly [number, number], i: number) => <Personne key={`${u}${v}`} x={e.x + u} y={e.y + v} haut="#F7F5F0" bas="#F7F5F0" cheveux="#2E1F17" peau={i % 2 ? "#C99A72" : "#D9A882"} />;
      const [dx, dy] = pt(cx, cy, 98);
      return (
        <g>
          {derriere.map(porteur)}
          {/* Deux brancards posés sur les épaules des porteurs */}
          <Boite x={e.x + 0.05} y={e.y + 0.42} w={1.9} h={0.06} z={38} ht={3} c="#8B6B4E" />
          <Boite x={e.x + 0.05} y={e.y + 1.52} w={1.9} h={0.06} z={38} ht={3} c="#8B6B4E" />
          <Boite x={e.x + 0.55} y={e.y + 0.48} w={0.9} h={1.04} z={41} ht={6} c={or} />
          <Cylindre cx={cx} cy={cy} r={0.4} z={47} ht={34} c={rideau} haut={or} />
          {[-0.28, 0, 0.28].map((k, i) => { const [ax, ay] = pt(cx + k, cy + 0.35, 47); return <rect key={i} x={ax - 1} y={ay - 34} width={2} height={34} fill={or} opacity={0.85} />; })}
          <path d={`M${dx - 26},${dy + 17} Q${dx},${dy - 20} ${dx + 26},${dy + 17} Z`} fill={or} stroke={teinte(or, 0.3)} strokeWidth={0.6} />
          <circle cx={dx} cy={dy - 4} r={3.2} fill={teinte(or, -0.3)} />
          {devant.map(porteur)}
        </g>
      );
    }
    case "mur_fleurs": {
      const l = local(e);
      const fl = ctx.couleur ?? palette.fleurs;
      const fleurs: ReactNode[] = [];
      for (let j = 0; j < 7; j++) for (let i = 0; i < 13; i++) {
        const u = 0.18 + i * 0.22 + (j % 2) * 0.1, z = 10 + j * 11;
        if (u > 2.85) continue;
        const [x, y] = pt(...l.p(u, 0.52), z);
        const c = (i + j) % 4 === 0 ? teinte(fl, -0.35) : (i * 3 + j) % 5 === 0 ? "#FBF8F1" : (i + 2 * j) % 3 === 0 ? teinte(fl, 0.1) : fl;
        fleurs.push(<g key={`${i}-${j}`}><ellipse cx={x + 4} cy={y + 3} rx={4} ry={2.4} fill="#7E9A6A" /><circle cx={x} cy={y} r={5.2} fill={c} stroke={teinte(c, 0.25)} strokeWidth={0.5} /></g>);
      }
      return (
        <g>
          <Boite {...l.r(0.05, 0.3, 2.9, 0.2)} ht={88} c="#6F8A5E" />
          {fleurs}
          <Boite {...l.r(0, 0.25, 2.98, 0.3)} ht={6} c={palette.accent === "#2B2B2B" ? "#2B2B2B" : "#F4EFE6"} />
        </g>
      );
    }
    case "candelabre": {
      const or = ctx.couleur ?? (palette.accent === "#2B2B2B" ? "#2B2B2B" : "#C9A74E");
      const [sx, sy] = pt(cx, cy);
      const [hx, hy] = pt(cx, cy, 62);
      const bras = [-16, -8, 0, 8, 16];
      return (
        <g>
          <ellipse cx={sx} cy={sy} rx={26} ry={13} fill="#FFE7A3" opacity={0.3} />
          <Cylindre cx={cx} cy={cy} r={0.17} ht={4} c={or} />
          <rect x={sx - 1.6} y={hy} width={3.2} height={sy - hy - 4} fill={or} />
          <path d={`M${hx - 16},${hy - 2} Q${hx},${hy + 12} ${hx + 16},${hy - 2}`} fill="none" stroke={or} strokeWidth={2.4} />
          {bras.map((dx, i) => {
            const y = hy - 2 - (i === 2 ? 10 : 0);
            return (
              <g key={i}>
                <rect x={hx + dx - 2.2} y={y - 9} width={4.4} height={9} rx={1} fill="#FFFDF7" stroke="#E5D9BC" strokeWidth={0.4} />
                <circle cx={hx + dx} cy={y - 12} r={5} fill="#FFE7A3" opacity={0.55} />
                <path d={`M${hx + dx},${y - 16} Q${hx + dx + 2.2},${y - 11.5} ${hx + dx},${y - 9.5} Q${hx + dx - 2.2},${y - 11.5} ${hx + dx},${y - 16} Z`} fill="#F4B740" />
              </g>
            );
          })}
        </g>
      );
    }
    case "allee": {
      const l = local(e);
      const fl = ctx.couleur ?? palette.fleurs;
      const tapis = palette.accent === "#2B2B2B" ? "#F4F4F4" : (palette.nappe === "#7C2436" ? "#7C2436" : "#F4EFE6");
      const bords = Array.from({ length: 4 }, (_, i) => 0.35 + i * 0.77);
      const petales = Array.from({ length: 16 }, (_, i) => l.p(0.3 + ((i * 37) % 40) / 100, 0.15 + i * 0.17));
      return (
        <g>
          <Boite {...l.r(0.2, 0, 0.6, l.P)} ht={1.5} c={tapis} />
          {petales.map(([x, y], i) => { const [px, py] = pt(x, y, 2); return <ellipse key={i} cx={px} cy={py} rx={1.8} ry={1.1} fill={i % 3 ? fl : teinte(fl, -0.3)} />; })}
          {bords.flatMap((v) => [0.07, 0.93].map((u) => {
            const [x, y] = l.p(u, v);
            return (
              <g key={`${u}-${v}`}>
                <Cylindre cx={x} cy={y} r={0.06} ht={13} c="#FFFDF7" />
                <circle cx={pt(x, y, 17)[0]} cy={pt(x, y, 17)[1]} r={4} fill="#FFE7A3" opacity={0.6} />
                <circle cx={pt(x, y, 16)[0]} cy={pt(x, y, 16)[1]} r={1.6} fill="#F4B740" />
              </g>
            );
          }))}
          <Bouquet x={l.p(0.07, 2.92)[0]} y={l.p(0.07, 2.92)[1]} z={4} c={fl} taille={0.75} />
          <Bouquet x={l.p(0.93, 2.92)[0]} y={l.p(0.93, 2.92)[1]} z={4} c={fl} taille={0.75} />
        </g>
      );
    }
    case "the": {
      const l = local(e);
      const or = "#C9A74E";
      const [tx, ty] = l.p(1, 0.45);
      const verres = [0.62, 0.82, 1.18, 1.38].map((u) => l.p(u, 0.62));
      const [px, py] = l.p(0.45, 0.42), [p2x, p2y] = l.p(1.55, 0.42);
      const poufs = [l.p(0.5, 0.92), l.p(1.5, 0.92)];
      const cuir = ["#B9785A", "#9C6B3C"];
      return (
        <g>
          <Boite {...l.r(0.1, 0.12, 1.8, 0.6)} ht={13} c={coul} />
          <Cylindre cx={tx} cy={ty} r={0.34} z={13} ht={1.5} c={or} haut={teinte(or, -0.25)} />
          <Cylindre cx={tx} cy={ty} r={0.08} z={15} ht={8} c="#D7D7D7" haut="#EEEEEE" />
          <path d={`M${pt(tx, ty, 21)[0] + 4},${pt(tx, ty, 21)[1]} q6,-3 8,-7`} stroke="#BFBFBF" strokeWidth={1.4} fill="none" />
          <circle cx={pt(tx, ty, 25)[0]} cy={pt(tx, ty, 25)[1]} r={1.6} fill="#BFBFBF" />
          {verres.map(([x, y], i) => { const [gx, gy] = pt(x, y, 15); return <rect key={i} x={gx - 1.5} y={gy - 5} width={3} height={5} rx={0.6} fill={["#C0392B", "#2E86AB", "#C9A74E", "#1F6B57"][i]} opacity={0.85} />; })}
          {[[px, py], [p2x, p2y]].map(([x, y], i) => <g key={i}><Cylindre cx={x} cy={y} r={0.15} z={13} ht={2} c="#F4EFE6" />{[[-3, 0], [3, 0], [0, -2]].map(([dx, dy], k) => { const [qx, qy] = pt(x, y, 16); return <circle key={k} cx={qx + dx} cy={qy + dy} r={1.8} fill={k === 2 ? "#E8C07A" : "#D9A441"} />; })}</g>)}
          {poufs.map(([x, y], i) => <Cylindre key={i} cx={x} cy={y} r={0.16} ht={9} c={cuir[i]} />)}
        </g>
      );
    }
    case "gateau": {
      const ruban = ctx.couleur ?? palette.fleurs;
      const blanc = "#FFFDF7";
      return (
        <g>
          <Cylindre cx={cx} cy={cy} r={0.42} ht={16} c={palette.nappe} haut={teinte(palette.nappe, -0.15)} />
          <Cylindre cx={cx} cy={cy} r={0.27} z={16} ht={13} c={blanc} />
          <Cylindre cx={cx} cy={cy} r={0.27} z={17} ht={2} c={ruban} haut={blanc} />
          <Cylindre cx={cx} cy={cy} r={0.2} z={29} ht={12} c={blanc} />
          <Cylindre cx={cx} cy={cy} r={0.2} z={30} ht={2} c={ruban} haut={blanc} />
          <Cylindre cx={cx} cy={cy} r={0.13} z={41} ht={10} c={blanc} />
          <Bouquet x={cx} y={cy} z={55} c={ruban} taille={0.55} />
        </g>
      );
    }
  }
  return <Fragment />;
}

/** Contour de l'emprise au sol (sélection, aperçu de placement). */
export const contourEmprise = (x: number, y: number, w: number, h: number) => pts([pt(x, y), pt(x + w, y), pt(x + w, y + h), pt(x, y + h)]);
