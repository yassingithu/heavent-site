/**
 * Dessins vectoriels de la scène (calques SVG légers, aucune image externe sauf les vrais logos de la marque).
 * Les coordonnées (gx, gy) sont des cases du sol ; z est une hauteur en pixels.
 */
import type { ReactNode } from "react";
import { X, Y, poly, pt, rx, ry, assombrir, eclaircir, melanger, hasard } from "./iso";

export interface Pal { nappe: string; fleurs: string; accent: string; deco: string; sombre?: boolean }

// ── Primitives ──────────────────────────────────────────────────────────────
interface BoiteProps { gx: number; gy: number; w: number; d: number; h: number; haut: string; gauche?: string; droite?: string; z0?: number; trait?: string; children?: ReactNode }
/** Pavé en perspective : la face de droite regarde vers +gx, celle de gauche vers +gy */
export function Boite({ gx, gy, w, d, h, haut, gauche, droite, z0 = 0, trait }: BoiteProps) {
  const gch = gauche ?? assombrir(haut, 0.16), drt = droite ?? assombrir(haut, 0.3);
  const t = h + z0;
  return (
    <g stroke={trait ?? "none"} strokeWidth={0.6} strokeLinejoin="round">
      <polygon points={poly([gx, gy + d, t], [gx + w, gy + d, t], [gx + w, gy + d, z0], [gx, gy + d, z0])} fill={gch} />
      <polygon points={poly([gx + w, gy, t], [gx + w, gy + d, t], [gx + w, gy + d, z0], [gx + w, gy, z0])} fill={drt} />
      <polygon points={poly([gx, gy, t], [gx + w, gy, t], [gx + w, gy + d, t], [gx, gy + d, t])} fill={haut} />
    </g>
  );
}

/** Surface dessinée dans un plan vertical. Unités locales : pixels ; y vers le haut. sens « d » : plan y = constante (gx croît vers la droite) ; « u » : plan x = constante */
export function Plan({ sens, c, u, z0 = 0, children }: { sens: "d" | "u"; c: number; u: number; z0?: number; children: ReactNode }) {
  const e = sens === "d" ? X(u, c) : X(c, u), f = sens === "d" ? Y(u, c, z0) : Y(c, u, z0);
  return <g transform={`matrix(1 ${sens === "d" ? 0.5 : -0.5} 0 -1 ${e.toFixed(1)} ${f.toFixed(1)})`}>{children}</g>;
}

/** Contour d'arc en plein cintre dans un plan (x0 = bord gauche, w = largeur, h = hauteur totale) */
export const cintre = (x0: number, w: number, h: number, z = 0) => {
  const r = w / 2, hs = h - r, k = 0.5523 * r, xc = x0 + r;
  return `M${x0} ${z} L${x0} ${hs} C${x0} ${hs + k} ${xc - k} ${hs + r} ${xc} ${hs + r} C${xc + k} ${hs + r} ${x0 + w} ${hs + k} ${x0 + w} ${hs} L${x0 + w} ${z} Z`;
};

export function Ombre({ gx, gy, r, o = 0.22 }: { gx: number; gy: number; r: number; o?: number }) {
  return <ellipse cx={X(gx, gy)} cy={Y(gx, gy)} rx={rx(r)} ry={ry(r)} fill="#2b1a10" opacity={o} />;
}

// ── Personnes ───────────────────────────────────────────────────────────────
export interface PersonneProps { x: number; y: number; corps?: string; peau?: string; cheveux?: string; echarpe?: string; s?: number; robe?: boolean; assis?: boolean; bob?: boolean; cls?: string; retard?: number }
const PEAUX = ["#E3B791", "#C99A78", "#A87556", "#8B5E43", "#EDC8A4"];
const CHEVEUX = ["#241913", "#3a281c", "#171210", "#5a3b26", "#0f0c0a"];
export const peauDe = (i: number) => PEAUX[i % PEAUX.length];
export const cheveuxDe = (i: number) => CHEVEUX[(i * 3 + 1) % CHEVEUX.length];

export function Personne({ x, y, corps = "#4a4038", peau = "#C99A78", cheveux = "#241913", echarpe, s = 1, robe, assis, bob, cls, retard = 0 }: PersonneProps) {
  const h = assis ? 11 : 17;
  return (
    <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s})`} className={cls}>
      <g className={bob ? "hc-bob" : undefined} style={bob ? { animationDelay: `${retard}s` } : undefined}>
        <ellipse cx="0" cy="0.5" rx="7" ry="2.6" fill="#2b1a10" opacity="0.28" />
        {robe
          ? <path d={`M-4.4 ${-h} L4.4 ${-h} L7 0 L-7 0 Z`} fill={corps} />
          : <rect x="-4.2" y={-h} width="8.4" height={h} rx="3" fill={corps} />}
        {echarpe && <path d={`M-4.2 ${-h + 2} L4.2 ${-h + 6.5}`} stroke={echarpe} strokeWidth="2.2" strokeLinecap="round" />}
        <circle cx="0" cy={-h - 4.2} r="4.1" fill={peau} />
        <path d={`M-4.2 ${-h - 4.6} A4.2 4.2 0 0 1 4.2 ${-h - 4.6} L4.2 ${-h - 5.2} A4.2 4.2 0 0 0 -4.2 ${-h - 5.2} Z`} fill={cheveux} />
        <path d={`M-4.1 ${-h - 4.5} A4.2 4.3 0 0 1 4.1 ${-h - 4.5} Q0 ${-h - 6.5} -4.1 ${-h - 4.5} Z`} fill={cheveux} />
      </g>
    </g>
  );
}

// ── Tables et chaises ───────────────────────────────────────────────────────
export function Chaise({ x, y, couleur, devant }: { x: number; y: number; couleur: string; devant?: boolean }) {
  return (
    <g>
      {!devant && <rect x={x - 6} y={y - 17} width="12" height="13" rx="3" fill={assombrir(couleur, 0.12)} />}
      <ellipse cx={x} cy={y - 3} rx="7.2" ry="3.6" fill={couleur} />
      <rect x={x - 6.5} y={y - 3} width="13" height="5" rx="2" fill={assombrir(couleur, 0.22)} />
      {devant && <rect x={x - 6} y={y - 14} width="12" height="3" rx="1.5" fill={assombrir(couleur, 0.1)} opacity="0.0" />}
    </g>
  );
}

export function TableRonde({ gx, gy, r = 0.85, nbChaises = 8, pal, fleurs, bougies, invites = 0, retard = 0, animer }: { gx: number; gy: number; r?: number; nbChaises?: number; pal: Pal; fleurs?: boolean; bougies?: boolean; invites?: number; retard?: number; animer?: boolean }) {
  const cx = X(gx, gy), cy = Y(gx, gy), a = rx(r), b = ry(r);
  const nappe = pal.nappe, ch = 8, chairs = Array.from({ length: nbChaises }, (_, i) => (i / nbChaises) * Math.PI * 2 + 0.2);
  const chaise = melanger(pal.sombre ? pal.deco : "#EFE5D0", pal.accent, 0.18);
  const pos = (t: number) => ({ x: cx + Math.cos(t) * (a + 11), y: cy + Math.sin(t) * (b + 7) });
  const hauteur = 23;
  return (
    <g>
      <ellipse cx={cx} cy={cy + 2} rx={a + 12} ry={b + 7} fill="#2b1a10" opacity="0.18" />
      {chairs.filter((t) => Math.sin(t) < 0).map((t, i) => { const p = pos(t); return <Chaise key={`d${i}`} x={p.x} y={p.y} couleur={chaise} />; })}
      {chairs.filter((t) => Math.sin(t) < 0).slice(0, invites).map((t, i) => {
        const p = pos(t); return <Personne key={`pd${i}`} x={p.x} y={p.y - 4} corps={i % 2 ? pal.accent : "#3d352e"} peau={peauDe(i + gx * 3)} cheveux={cheveuxDe(i + 2)} assis s={0.82} bob={animer} retard={retard + i * 0.3} robe={i % 3 === 1} />;
      })}
      <path d={`M${cx - a} ${cy - hauteur} L${cx - a} ${cy - ch} A${a} ${b} 0 0 0 ${cx + a} ${cy - ch} L${cx + a} ${cy - hauteur} Z`} fill={assombrir(nappe, 0.14)} />
      <path d={`M${cx - a} ${cy - ch} A${a} ${b} 0 0 0 ${cx + a} ${cy - ch}`} fill="none" stroke={pal.accent} strokeWidth="1.4" opacity="0.8" />
      <ellipse cx={cx} cy={cy - hauteur} rx={a} ry={b} fill={nappe} />
      <ellipse cx={cx} cy={cy - hauteur} rx={a * 0.62} ry={b * 0.62} fill="none" stroke={pal.accent} strokeWidth="0.9" opacity="0.55" />
      {fleurs && (
        <g>
          <rect x={cx - 1.6} y={cy - hauteur - 9} width="3.2" height="8" fill={pal.deco} />
          {[[-5, -13], [5, -13], [0, -17], [-3, -10], [3, -10]].map(([dx, dy], i) => <circle key={i} cx={cx + dx} cy={cy - hauteur + dy} r="4" fill={i % 2 ? eclaircir(pal.fleurs, 0.2) : pal.fleurs} />)}
          <circle cx={cx} cy={cy - hauteur - 13} r="1.6" fill="#E7C65A" />
        </g>
      )}
      {bougies && (
        <g>
          {[-18, 18].map((dx) => <g key={dx}><rect x={cx + dx - 1.6} y={cy - hauteur - 7} width="3.2" height="7" rx="1" fill="#F7EEDC" /><ellipse cx={cx + dx} cy={cy - hauteur - 9.5} rx="1.7" ry="3" fill="#FFD27A" className={animer ? "hc-flamme" : undefined} /></g>)}
        </g>
      )}
      {chairs.filter((t) => Math.sin(t) >= 0).map((t, i) => { const p = pos(t); return <Chaise key={`f${i}`} x={p.x} y={p.y} couleur={chaise} devant />; })}
      {chairs.filter((t) => Math.sin(t) >= 0).slice(0, Math.max(0, invites - chairs.filter((t) => Math.sin(t) < 0).length)).map((t, i) => {
        const p = pos(t); return <Personne key={`pf${i}`} x={p.x} y={p.y - 4} corps={i % 2 ? "#3d352e" : pal.accent} peau={peauDe(i + gy * 2)} cheveux={cheveuxDe(i + 5)} assis s={0.86} bob={animer} retard={retard + i * 0.4} robe={i % 2 === 0} />;
      })}
    </g>
  );
}

// ── Mariés, honneur, arche ──────────────────────────────────────────────────
export function TableHonneur({ gx, gy, w, d, pal, fleurs, couple, type, animer }: { gx: number; gy: number; w: number; d: number; pal: Pal; fleurs?: boolean; couple?: boolean; type: string; animer?: boolean }) {
  const h = 22;
  return (
    <g>
      <Ombre gx={gx + w / 2} gy={gy + d / 2} r={1.9} o={0.16} />
      {type === "mariage" && [0.6, 2.4].map((dx, i) => (
        <g key={i}>
          <Boite gx={gx + dx - 0.35} gy={gy - 0.75} w={0.7} d={0.55} h={20} haut={eclaircir(pal.deco, 0.45)} />
          <Boite gx={gx + dx - 0.35} gy={gy - 0.95} w={0.7} d={0.14} h={46} haut={eclaircir(pal.deco, 0.35)} />
          {couple && <Personne x={X(gx + dx, gy - 0.5)} y={Y(gx + dx, gy - 0.5) - 14} assis robe={i === 0} corps={i === 0 ? "#FBF8F1" : "#2c2a2f"} peau={peauDe(i + 1)} cheveux={cheveuxDe(i)} s={1.05} bob={animer} />}
        </g>
      ))}
      <Boite gx={gx} gy={gy} w={w} d={d} h={h} haut={pal.nappe} gauche={assombrir(pal.nappe, 0.1)} droite={assombrir(pal.nappe, 0.22)} />
      <polygon points={poly([gx, gy + d, 6], [gx + w, gy + d, 6], [gx + w, gy + d, 3], [gx, gy + d, 3])} fill={pal.accent} opacity="0.85" />
      {fleurs && [0.4, 1.0, 1.6, 2.2, 2.7].map((dx, i) => (
        <g key={i}>
          <circle cx={X(gx + dx, gy + d / 2)} cy={Y(gx + dx, gy + d / 2, h + 5)} r={5.2} fill={i % 2 ? pal.fleurs : eclaircir(pal.fleurs, 0.25)} />
          <circle cx={X(gx + dx, gy + d / 2) + 3} cy={Y(gx + dx, gy + d / 2, h + 9)} r={3.2} fill={pal.fleurs} />
        </g>
      ))}
    </g>
  );
}

export function Arche({ gx, gy, largeur, pal, cls }: { gx: number; gy: number; largeur: number; pal: Pal; cls?: string }) {
  const g = hasard(7);
  const x1 = X(gx, gy), y1 = Y(gx, gy), x2 = X(gx + largeur, gy), y2 = Y(gx + largeur, gy);
  const H = 96, up = 44;
  const arc = (t: number) => {
    const ax = x1 + (x2 - x1) * t, ay = y1 + (y2 - y1) * t - H - Math.sin(t * Math.PI) * up;
    return { x: ax, y: ay };
  };
  const fleurs = Array.from({ length: 34 }, (_, i) => {
    const t = i / 33, p = arc(t); return { x: p.x + (g() - 0.5) * 7, y: p.y + (g() - 0.5) * 9, r: 3.4 + g() * 3.2, c: g() > 0.45 ? pal.fleurs : eclaircir(pal.fleurs, 0.3), v: g() > 0.7 };
  });
  const pilier = (x: number, y: number) => (
    <g>
      <rect x={x - 4} y={y - H} width="8" height={H} fill={eclaircir(pal.deco, 0.5)} />
      <rect x={x - 6} y={y - 6} width="12" height="6" fill={eclaircir(pal.deco, 0.3)} />
      {[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={x + (i % 2 ? 4 : -4)} cy={y - 12 - i * 14} r={4.6} fill={i % 2 ? pal.fleurs : eclaircir(pal.fleurs, 0.3)} />)}
    </g>
  );
  return (
    <g className={cls}>
      {pilier(x1, y1)}{pilier(x2, y2)}
      <path d={`M${x1} ${y1 - H} Q${(x1 + x2) / 2} ${(y1 + y2) / 2 - H - up * 2} ${x2} ${y2 - H}`} fill="none" stroke="#6E8B5A" strokeWidth="6" strokeLinecap="round" />
      {fleurs.map((f, i) => <g key={i}><circle cx={f.x} cy={f.y} r={f.r} fill={f.c} />{f.v && <circle cx={f.x + 1} cy={f.y - 1} r={1.2} fill="#E7C65A" />}</g>)}
      {Array.from({ length: 10 }, (_, i) => { const p = arc((i + 0.5) / 10); return <ellipse key={`f${i}`} cx={p.x} cy={p.y + 6} rx="3" ry="6" fill="#6E8B5A" transform={`rotate(${(i % 2 ? 18 : -18)} ${p.x} ${p.y + 6})`} />; })}
    </g>
  );
}

// ── Lumières, décors ────────────────────────────────────────────────────────
export function Lanterne({ cx, cy, s = 1, couleur, anime }: { cx: number; cy: number; s?: number; couleur: string; anime?: boolean }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${s})`}>
      <rect x="-0.9" y="-6" width="1.8" height="6" fill={assombrir(couleur, 0.3)} />
      <path d="M-5 0 L5 0 L7 10 L0 15 L-7 10 Z" fill={assombrir(couleur, 0.15)} />
      <path d="M-4 1.5 L4 1.5 L5.6 9.6 L0 13.6 L-5.6 9.6 Z" fill="#FFD98A" className={anime ? "hc-flamme" : undefined} />
      <path d="M-5 0 L5 0 L7 10 L0 15 L-7 10 Z" fill="none" stroke={couleur} strokeWidth="1.2" />
      <path d="M0 0 L0 14 M-3.5 5 L3.5 5" stroke={couleur} strokeWidth="0.9" />
      <circle cx="0" cy="-7" r="1.6" fill={couleur} />
    </g>
  );
}

export function PosteLanterne({ gx, gy, pal, anime }: { gx: number; gy: number; pal: Pal; anime?: boolean }) {
  const x = X(gx, gy), y = Y(gx, gy);
  return (
    <g>
      <Ombre gx={gx} gy={gy} r={0.3} />
      <rect x={x - 1.6} y={y - 72} width="3.2" height="72" fill={assombrir(pal.deco, 0.25)} />
      <rect x={x - 5} y={y - 4} width="10" height="4" rx="1" fill={assombrir(pal.deco, 0.2)} />
      <Lanterne cx={x} cy={y - 78} s={1.5} couleur={pal.deco} anime={anime} />
      <Lanterne cx={x - 11} cy={y - 60} s={0.9} couleur={pal.deco} anime={anime} />
      <path d={`M${x} ${y - 66} Q${x - 6} ${y - 66} ${x - 11} ${y - 66}`} stroke={assombrir(pal.deco, 0.25)} strokeWidth="1.2" fill="none" />
    </g>
  );
}

export function Candelabre({ gx, gy, pal, anime }: { gx: number; gy: number; pal: Pal; anime?: boolean }) {
  const x = X(gx, gy), y = Y(gx, gy);
  return (
    <g>
      <Ombre gx={gx} gy={gy} r={0.28} />
      <rect x={x - 1.6} y={y - 44} width="3.2" height="44" fill={pal.deco} />
      <ellipse cx={x} cy={y - 2} rx="7" ry="3" fill={assombrir(pal.deco, 0.15)} />
      <path d={`M${x - 14} ${y - 52} Q${x - 14} ${y - 38} ${x} ${y - 38} Q${x + 14} ${y - 38} ${x + 14} ${y - 52}`} stroke={pal.deco} strokeWidth="2" fill="none" />
      {[-14, 0, 14].map((dx) => <g key={dx}><rect x={x + dx - 1.8} y={y - (dx === 0 ? 62 : 60)} width="3.6" height="10" rx="1" fill="#F7EEDC" /><ellipse cx={x + dx} cy={y - (dx === 0 ? 65 : 63)} rx="2" ry="3.6" fill="#FFD27A" className={anime ? "hc-flamme" : undefined} /></g>)}
    </g>
  );
}

export function Bouquet({ gx, gy, pal, grand }: { gx: number; gy: number; pal: Pal; grand?: boolean }) {
  const x = X(gx, gy), y = Y(gx, gy), g = hasard(Math.round(gx * 10 + gy * 31));
  const bas = grand ? 44 : 34;
  return (
    <g>
      <Ombre gx={gx} gy={gy} r={0.34} />
      <path d={`M${x - 7} ${y} L${x - 5} ${y - 18} L${x + 5} ${y - 18} L${x + 7} ${y} Z`} fill={eclaircir(pal.deco, 0.4)} />
      <ellipse cx={x} cy={y - 18} rx="6" ry="2.2" fill={assombrir(pal.deco, 0.1)} />
      {Array.from({ length: 4 }, (_, i) => <path key={i} d={`M${x} ${y - 18} Q${x + (i - 1.5) * 8} ${y - 28} ${x + (i - 1.5) * 12} ${y - bas + 8}`} stroke="#6E8B5A" strokeWidth="1.6" fill="none" />)}
      {Array.from({ length: 9 }, (_, i) => <circle key={i} cx={x + (g() - 0.5) * 30} cy={y - bas + (g() - 0.4) * 16} r={4 + g() * 3} fill={g() > 0.5 ? pal.fleurs : eclaircir(pal.fleurs, 0.3)} />)}
    </g>
  );
}

export function MurFleurs({ u0, u1, gy, pal }: { u0: number; u1: number; gy: number; pal: Pal }) {
  const g = hasard(11), w = (u1 - u0) * 32, h = 72;
  return (
    <Plan sens="d" c={gy} u={u0} z0={6}>
      <rect x="0" y="0" width={w} height={h} rx="6" fill="#5F7C4D" />
      {Array.from({ length: 72 }, (_, i) => <circle key={i} cx={4 + g() * (w - 8)} cy={4 + g() * (h - 8)} r={3.4 + g() * 3.6} fill={g() > 0.5 ? pal.fleurs : eclaircir(pal.fleurs, 0.3)} />)}
      {Array.from({ length: 12 }, (_, i) => <circle key={`o${i}`} cx={4 + g() * (w - 8)} cy={4 + g() * (h - 8)} r="1.5" fill="#E7C65A" />)}
    </Plan>
  );
}

export function Fontaine({ gx, gy, pal, animer }: { gx: number; gy: number; pal: Pal; animer?: boolean }) {
  const x = X(gx, gy), y = Y(gx, gy), a = rx(0.7), b = ry(0.7);
  return (
    <g>
      <ellipse cx={x} cy={y + 3} rx={a + 5} ry={b + 3} fill="#2b1a10" opacity="0.2" />
      <path d={`M${x - a} ${y - 12} L${x - a} ${y - 2} A${a} ${b} 0 0 0 ${x + a} ${y - 2} L${x + a} ${y - 12} Z`} fill="#2E6F78" />
      <ellipse cx={x} cy={y - 12} rx={a} ry={b} fill="#3C8A92" />
      {[0, 1, 2, 3, 4, 5].map((i) => <path key={i} d={`M${x + Math.cos(i) * a * 0.85} ${y - 12 + Math.sin(i) * b * 0.85} l3 1`} stroke="#E8D6A2" strokeWidth="2" />)}
      <ellipse cx={x} cy={y - 12} rx={a * 0.78} ry={b * 0.78} fill="#7FC3C9" />
      <ellipse cx={x} cy={y - 12} rx={a * 0.5} ry={b * 0.5} fill="#A8DDE0" opacity="0.7" className={animer ? "hc-onde" : undefined} />
      <rect x={x - 2.5} y={y - 34} width="5" height="22" fill="#CDBB88" />
      <ellipse cx={x} cy={y - 34} rx="7" ry="2.6" fill={pal.deco} />
      <path d={`M${x} ${y - 36} Q${x - 10} ${y - 46} ${x - 14} ${y - 24} M${x} ${y - 36} Q${x + 10} ${y - 46} ${x + 14} ${y - 24}`} stroke="#CFEFF0" strokeWidth="1.6" fill="none" opacity="0.9" className={animer ? "hc-jet" : undefined} />
    </g>
  );
}

// ── Animations et expériences ───────────────────────────────────────────────
export function Photobooth({ gx, gy, w, d, pal, flash }: { gx: number; gy: number; w: number; d: number; pal: Pal; flash?: boolean }) {
  const h = 66;
  return (
    <g>
      <Ombre gx={gx + w / 2} gy={gy + d / 2} r={1.0} o={0.14} />
      <Boite gx={gx} gy={gy} w={w} d={d} h={h} haut={eclaircir(pal.deco, 0.5)} droite={assombrir(pal.nappe, 0.18)} gauche={assombrir(pal.nappe, 0.08)} />
      <Plan sens="u" c={gx + w} u={gy + d - 0.1} z0={0}>
        <rect x="6" y="14" width={(d - 0.2) * 32 - 12} height="46" rx="3" fill={melanger(pal.fleurs, pal.nappe, 0.35)} stroke={pal.accent} strokeWidth="2" />
        {[0.2, 0.5, 0.8].map((t) => <circle key={t} cx={6 + ((d - 0.2) * 32 - 12) * t} cy={44 - (t === 0.5 ? 0 : 8)} r="4.5" fill={pal.fleurs} />)}
        <circle cx={((d - 0.2) * 32) / 2} cy="30" r="6.5" fill="#2b2b2f" stroke={pal.accent} strokeWidth="1.5" />
        <circle cx={((d - 0.2) * 32) / 2} cy="30" r="3" fill="#6a89a8" />
        <rect x="8" y="3" width={(d - 0.2) * 32 - 16} height="8" rx="2" fill={pal.accent} />
      </Plan>
      {flash && <ellipse cx={X(gx + w + 0.6, gy + d / 2)} cy={Y(gx + w + 0.6, gy + d / 2, 36)} rx="34" ry="30" fill="#FFF7DC" className="hc-flash" />}
    </g>
  );
}

export function Flacon({ x, y, c }: { x: number; y: number; c: string }) {
  return <g><rect x={x - 2.4} y={y - 9} width="4.8" height="9" rx="1.4" fill={c} opacity="0.92" /><rect x={x - 1.2} y={y - 12} width="2.4" height="3.4" fill="#C9A74E" /></g>;
}

export function BarParfums({ gx, gy, w, d, pal, logo, brume }: { gx: number; gy: number; w: number; d: number; pal: Pal; logo?: string; brume?: boolean }) {
  const comptoir = melanger("#3a2a20", pal.deco, 0.15);
  return (
    <g>
      <Ombre gx={gx + w / 2} gy={gy + d / 2} r={1.1} o={0.14} />
      <Boite gx={gx} gy={gy} w={0.3} d={d} h={70} haut="#2f2219" droite="#3b2b20" gauche="#241912" />
      <Plan sens="u" c={gx + 0.3} u={gy + d - 0.05}>
        {[26, 44, 62].map((z) => <rect key={z} x="3" y={z - 2} width={(d - 0.1) * 32 - 6} height="2" fill="#C9A74E" opacity="0.7" />)}
        {[26, 44, 62].flatMap((z, k) => Array.from({ length: 7 }, (_, i) => <Flacon key={`${z}${i}`} x={7 + i * ((d - 0.1) * 32 - 14) / 6} y={z + 9} c={["#D9A441", "#B66A3C", "#E8D6A2", "#8A4B52", "#C9A74E", "#7C8F6B", "#E3B7A0"][(i + k * 2) % 7]} />))}
      </Plan>
      <Boite gx={gx + 0.45} gy={gy} w={w - 0.45} d={d} h={26} haut={eclaircir(comptoir, 0.18)} droite={comptoir} gauche={assombrir(comptoir, 0.1)} />
      {logo && (
        <Plan sens="u" c={gx + w} u={gy + d - 0.2} z0={2}>
          <rect x="4" y="2" width={(d - 0.4) * 32 - 8} height="20" rx="3" fill="#1B1511" opacity="0.9" />
          <image href={logo} x="8" y="3" width={(d - 0.4) * 32 - 16} height="18" preserveAspectRatio="xMidYMid meet" transform="translate(0 24) scale(1 -1)" />
        </Plan>
      )}
      {[0.5, 1.1, 1.7].map((t) => <Flacon key={t} x={X(gx + 0.8, gy + t)} y={Y(gx + 0.8, gy + t, 26)} c={["#D9A441", "#8A4B52", "#E8D6A2"][Math.round(t * 2) % 3]} />)}
      {brume && <ellipse cx={X(gx + 1.6, gy + d / 2)} cy={Y(gx + 1.6, gy + d / 2, 30)} rx="46" ry="22" fill="#F6E7C3" opacity="0.2" className="hc-brume" />}
    </g>
  );
}

export function Buffet({ gx, gy, w, d, pal }: { gx: number; gy: number; w: number; d: number; pal: Pal }) {
  const c = pal.nappe;
  return (
    <g>
      <Ombre gx={gx + w / 2} gy={gy + d / 2} r={1.1} o={0.14} />
      <Boite gx={gx} gy={gy} w={w} d={d} h={26} haut={c} gauche={assombrir(c, 0.1)} droite={assombrir(c, 0.22)} />
      <polygon points={poly([gx + w, gy, 7], [gx + w, gy + d, 7], [gx + w, gy + d, 4], [gx + w, gy, 4])} fill={pal.accent} opacity="0.85" />
      {Array.from({ length: 5 }, (_, i) => {
        const x = X(gx + w / 2, gy + 0.3 + i * (d - 0.6) / 4), y = Y(gx + w / 2, gy + 0.3 + i * (d - 0.6) / 4, 26);
        return <g key={i}><ellipse cx={x} cy={y} rx="8" ry="4" fill={assombrir(pal.deco, 0.1)} /><ellipse cx={x} cy={y - 3} rx="6" ry="3.5" fill={["#E8C06A", "#C77B4A", "#9DAE89", "#D9A28A", "#E8D6A2"][i]} /></g>;
      })}
    </g>
  );
}

export function Bar({ gx, gy, w, d, pal, couleurs }: { gx: number; gy: number; w: number; d: number; pal: Pal; couleurs: string[] }) {
  return (
    <g>
      <Ombre gx={gx + w / 2} gy={gy + d / 2} r={1.0} o={0.14} />
      <Boite gx={gx} gy={gy} w={w} d={d} h={26} haut={eclaircir(pal.nappe, 0.1)} />
      {Array.from({ length: 7 }, (_, i) => {
        const x = X(gx + w / 2, gy + 0.2 + i * (d - 0.4) / 6), y = Y(gx + w / 2, gy + 0.2 + i * (d - 0.4) / 6, 26);
        return <g key={i}><path d={`M${x - 4} ${y} L${x + 4} ${y} L${x + 2.6} ${y - 11} L${x - 2.6} ${y - 11} Z`} fill={couleurs[i % couleurs.length]} opacity="0.9" /><ellipse cx={x} cy={y - 11} rx="2.6" ry="1" fill="#FFFFFF" opacity="0.5" /></g>;
      })}
    </g>
  );
}

export function LivreDor({ gx, gy, pal }: { gx: number; gy: number; pal: Pal }) {
  const x = X(gx, gy), y = Y(gx, gy);
  return (
    <g>
      <Ombre gx={gx} gy={gy} r={0.35} />
      <rect x={x - 1.5} y={y - 26} width="3" height="26" fill={pal.deco} />
      <ellipse cx={x} cy={y - 28} rx="12" ry="6" fill={pal.nappe} stroke={pal.deco} strokeWidth="1.2" />
      <path d={`M${x - 8} ${y - 31} L${x} ${y - 29} L${x + 8} ${y - 31} L${x + 8} ${y - 36} L${x} ${y - 34} L${x - 8} ${y - 36} Z`} fill="#FBF8F1" stroke="#CDBB88" strokeWidth="0.8" />
      <circle cx={x + 10} cy={y - 40} r="3.5" fill={pal.fleurs} />
    </g>
  );
}

export function FeuxFroids({ gx, gy, actif }: { gx: number; gy: number; actif?: boolean }) {
  const x = X(gx, gy), y = Y(gx, gy), g = hasard(Math.round(gx * 7));
  return (
    <g>
      <rect x={x - 2.5} y={y - 14} width="5" height="14" rx="1.5" fill="#3b3b40" />
      <rect x={x - 3.5} y={y - 3} width="7" height="3" fill="#C9A74E" />
      {actif && Array.from({ length: 14 }, (_, i) => {
        const a = -Math.PI / 2 + (g() - 0.5) * 1.3, l = 26 + g() * 34;
        return <line key={i} x1={x} y1={y - 15} x2={x + Math.cos(a) * l} y2={y - 15 + Math.sin(a) * l} stroke={i % 3 ? "#FFE9A8" : "#FFFFFF"} strokeWidth="1.6" strokeLinecap="round" className="hc-etincelle" style={{ animationDelay: `${(i % 7) * 0.12}s` }} />;
      })}
      {actif && <circle cx={x} cy={y - 16} r="5" fill="#FFF3C4" opacity="0.9" />}
    </g>
  );
}

export function Dj({ gx, gy, w, d, pal, actif }: { gx: number; gy: number; w: number; d: number; pal: Pal; actif?: boolean }) {
  return (
    <g>
      <Ombre gx={gx + w / 2} gy={gy + d / 2} r={1.0} o={0.16} />
      <Boite gx={gx - 0.35} gy={gy} w={0.35} d={d} h={46} haut="#2b2b30" />
      <Boite gx={gx + w} gy={gy} w={0.35} d={d} h={46} haut="#2b2b30" />
      <Boite gx={gx} gy={gy + 0.05} w={w} d={d - 0.1} h={26} haut="#27272c" droite="#1c1c20" gauche="#222226" />
      <polygon points={poly([gx, gy + d, 24], [gx + w, gy + d, 24], [gx + w, gy + d, 21], [gx, gy + d, 21])} fill={pal.accent} opacity="0.95" />
      {[0.4, 1.3].map((dx) => <ellipse key={dx} cx={X(gx + dx, gy + d / 2)} cy={Y(gx + dx, gy + d / 2, 27)} rx="9" ry="4.4" fill="#4A4A52" stroke="#8a8a92" strokeWidth="0.8" className={actif ? "hc-disque" : undefined} />)}
      <Personne x={X(gx + w / 2, gy - 0.1)} y={Y(gx + w / 2, gy - 0.1) + 2} corps="#222" peau={peauDe(3)} s={1.05} bob={actif} />
      {[0.4, 1.3].map((dx) => <circle key={`l${dx}`} cx={X(gx - 0.17, gy + dx / 2 + 0.2)} cy={Y(gx - 0.17, gy + dx / 2 + 0.2, 36)} r="3.2" fill="#8a8a92" />)}
    </g>
  );
}

export function Orchestre({ gx, gy, w, d, pal, actif }: { gx: number; gy: number; w: number; d: number; pal: Pal; actif?: boolean }) {
  const t = melanger(pal.nappe, pal.deco, 0.25);
  return (
    <g>
      <Boite gx={gx} gy={gy} w={w} d={d} h={9} haut={assombrir(t, 0.1)} />
      {[0.8, 1.6, 2.4].map((dx, i) => {
        const x = X(gx + dx, gy + 0.55), y = Y(gx + dx, gy + 0.55, 9);
        return (
          <g key={i}>
            <Personne x={x} y={y} assis corps={["#7C2436", "#222", pal.accent][i]} peau={peauDe(i + 2)} cheveux={cheveuxDe(i)} s={1.05} bob={actif} retard={i * 0.25} />
            {i === 0 && <g><ellipse cx={x + 9} cy={y - 8} rx="4" ry="7" fill="#7a4a28" transform={`rotate(25 ${x + 9} ${y - 8})`} /><circle cx={x + 11} cy={y - 14} r="1.6" fill="#E7C65A" /></g>}
            {i === 1 && <ellipse cx={x} cy={y - 3} rx="8" ry="4" fill="#D9C48E" stroke="#8a6d33" />}
            {i === 2 && <path d={`M${x + 6} ${y - 4} l12 -10`} stroke="#6a4a2a" strokeWidth="2.2" />}
          </g>
        );
      })}
    </g>
  );
}

export function Troupe({ gx, gy, pal, actif }: { gx: number; gy: number; pal: Pal; actif?: boolean }) {
  return (
    <g>
      {[[-0.9, 0.2], [-0.3, -0.5], [0.4, -0.4], [1.0, 0.3], [0.1, 0.9]].map(([dx, dy], i) => {
        const x = X(gx + dx, gy + dy), y = Y(gx + dx, gy + dy);
        return <Personne key={i} x={x} y={y} robe corps={[pal.accent, "#FBF8F1", "#7C2436", pal.deco, "#1F5E4F"][i]} echarpe={pal.deco} peau={peauDe(i)} cheveux={cheveuxDe(i + 1)} s={1.1} bob={actif} retard={i * 0.18} />;
      })}
      <ellipse cx={X(gx + 1.6, gy + 1.2)} cy={Y(gx + 1.6, gy + 1.2) - 8} rx="7" ry="9" fill="#7a4a28" stroke="#C9A74E" />
    </g>
  );
}

export function EnceintesAmbiance({ pal, actif }: { pal: Pal; actif?: boolean }) {
  return (
    <g>
      {[[5.6, 0.5], [9.2, 0.5]].map(([gx, gy], i) => (
        <g key={i}>
          <Boite gx={gx} gy={gy} w={0.5} d={0.5} h={46} haut="#2b2b30" />
          <circle cx={X(gx + 0.5, gy + 0.25)} cy={Y(gx + 0.5, gy + 0.25, 30)} r="5" fill="#4a4a52" />
          <circle cx={X(gx + 0.5, gy + 0.25)} cy={Y(gx + 0.5, gy + 0.25, 30)} r="2" fill={pal.accent} />
          {actif && [10, 17].map((r, k) => <circle key={k} cx={X(gx + 0.5, gy + 0.25)} cy={Y(gx + 0.5, gy + 0.25, 30)} r={r} fill="none" stroke={pal.accent} strokeWidth="1" className="hc-ondes" style={{ animationDelay: `${k * 0.5}s` }} />)}
        </g>
      ))}
    </g>
  );
}

export function Acoustique({ gx, gy, pal, actif }: { gx: number; gy: number; pal: Pal; actif?: boolean }) {
  const x = X(gx, gy), y = Y(gx, gy);
  return (
    <g>
      <Personne x={x} y={y} assis corps={pal.accent} peau={peauDe(1)} s={1.1} bob={actif} />
      <rect x={x - 7} y={y - 14} width="3" height="20" fill="#7a4a28" transform={`rotate(-30 ${x} ${y})`} />
      <Personne x={x + 22} y={y + 5} assis corps="#3d352e" peau={peauDe(4)} s={1.1} bob={actif} retard={0.3} />
      <rect x={x + 8} y={y - 22} width="2" height="24" fill="#333" /><circle cx={x + 9} cy={y - 23} r="2.4" fill="#222" />
    </g>
  );
}

export function PisteDanse({ gx, gy, w, d, pal, actif, festif }: { gx: number; gy: number; w: number; d: number; pal: Pal; actif?: boolean; festif?: boolean }) {
  const cols = 4, rows = 4, cw = w / cols, rh = d / rows;
  const teintes = festif ? ["#E24E8B", "#F2B134", "#4BB3C1", "#7C5FD3"] : [melanger(pal.nappe, pal.accent, 0.1), melanger(pal.nappe, pal.accent, 0.4)];
  return (
    <g>
      <polygon points={poly([gx - 0.1, gy - 0.1, 0], [gx + w + 0.1, gy - 0.1, 0], [gx + w + 0.1, gy + d + 0.1, 0], [gx - 0.1, gy + d + 0.1, 0])} fill={pal.deco} opacity="0.9" />
      {Array.from({ length: cols * rows }, (_, k) => {
        const i = k % cols, j = Math.floor(k / cols);
        return <polygon key={k} points={poly([gx + i * cw, gy + j * rh, 0], [gx + (i + 1) * cw, gy + j * rh, 0], [gx + (i + 1) * cw, gy + (j + 1) * rh, 0], [gx + i * cw, gy + (j + 1) * rh, 0])} fill={teintes[(i + j) % teintes.length]} className={actif ? "hc-case" : undefined} style={actif ? { animationDelay: `${((i * 3 + j * 5) % 8) * 0.18}s` } : undefined} />;
      })}
    </g>
  );
}

export function SalonMarocain({ gx, gy, w, d, pal }: { gx: number; gy: number; w: number; d: number; pal: Pal }) {
  const tissu = melanger(pal.fleurs, pal.deco, 0.35);
  return (
    <g>
      <polygon points={poly([gx - 0.1, gy - 0.1, 0], [gx + w + 0.1, gy - 0.1, 0], [gx + w + 0.1, gy + d + 0.1, 0], [gx - 0.1, gy + d + 0.1, 0])} fill={assombrir(pal.accent, 0.1)} opacity="0.55" />
      <Boite gx={gx} gy={gy} w={w} d={0.6} h={16} haut={tissu} />
      <Boite gx={gx} gy={gy} w={0.6} d={d} h={16} haut={tissu} />
      <Boite gx={gx} gy={gy} w={w} d={0.18} h={34} haut={assombrir(tissu, 0.1)} />
      <Boite gx={gx} gy={gy} w={0.18} d={d} h={34} haut={assombrir(tissu, 0.1)} />
      {Array.from({ length: 6 }, (_, i) => <ellipse key={i} cx={X(gx + 0.4 + i * (w - 0.8) / 5, gy + 0.4)} cy={Y(gx + 0.4 + i * (w - 0.8) / 5, gy + 0.4, 22)} rx="6" ry="4.6" fill={[pal.accent, "#F7EEDC", pal.deco][i % 3]} stroke="#00000020" />)}
      <ellipse cx={X(gx + w / 2 + 0.3, gy + d / 2 + 0.3)} cy={Y(gx + w / 2 + 0.3, gy + d / 2 + 0.3, 12)} rx="17" ry="8" fill={pal.deco} />
      <ellipse cx={X(gx + w / 2 + 0.3, gy + d / 2 + 0.3)} cy={Y(gx + w / 2 + 0.3, gy + d / 2 + 0.3, 14)} rx="14" ry="6.6" fill={eclaircir(pal.deco, 0.45)} />
    </g>
  );
}

export function BarreThe({ gx, gy, w, d, pal, animer }: { gx: number; gy: number; w: number; d: number; pal: Pal; animer?: boolean }) {
  const x = X(gx + w / 2, gy + d / 2), y = Y(gx + w / 2, gy + d / 2, 26);
  return (
    <g>
      <Ombre gx={gx + w / 2} gy={gy + d / 2} r={0.9} o={0.14} />
      <Boite gx={gx} gy={gy} w={w} d={d} h={26} haut={pal.nappe} />
      <ellipse cx={x} cy={y - 7} rx="6" ry="3" fill="#C9A74E" /><path d={`M${x - 6} ${y - 7} L${x - 4} ${y - 17} L${x + 4} ${y - 17} L${x + 6} ${y - 7} Z`} fill="#D9BE69" /><rect x={x - 1} y={y - 21} width="2" height="4" fill="#C9A74E" />
      {[-16, 14, 22, -24].map((dx, i) => <rect key={i} x={x + dx} y={y - 5 - (i % 2) * 3} width="4" height="5" rx="1" fill="#F4E3B6" stroke="#C9A74E" strokeWidth="0.6" />)}
      {animer && <path d={`M${x} ${y - 24} q-3 -6 0 -10 q3 -4 0 -9`} stroke="#fff" strokeWidth="1.4" fill="none" opacity="0.6" className="hc-vapeur" />}
    </g>
  );
}

export function Comptoir({ gx, gy, pal, the }: { gx: number; gy: number; pal: Pal; the?: boolean }) {
  const x = X(gx + 0.45, gy + 0.3), y = Y(gx + 0.45, gy + 0.3, 24);
  return (
    <g>
      <Ombre gx={gx + 0.45} gy={gy + 0.3} r={0.6} o={0.14} />
      <Boite gx={gx} gy={gy} w={0.9} d={0.6} h={24} haut={pal.nappe} />
      {the
        ? <g><ellipse cx={x} cy={y - 5} rx="6" ry="3" fill="#C9A74E" /><path d={`M${x - 6} ${y - 5} L${x - 4} ${y - 14} L${x + 4} ${y - 14} L${x + 6} ${y - 5} Z`} fill="#D9BE69" />{[-14, 12, 18].map((dx, i) => <rect key={i} x={x + dx} y={y - 4} width="4" height="5" rx="1" fill="#F4E3B6" stroke="#C9A74E" strokeWidth="0.6" />)}</g>
        : <g><rect x={x - 10} y={y - 14} width="20" height="10" rx="2" fill={pal.accent} /><rect x={x - 8} y={y - 12} width="16" height="1.6" fill="#fff" opacity="0.7" /><rect x={x - 8} y={y - 8.5} width="10" height="1.6" fill="#fff" opacity="0.5" /></g>}
    </g>
  );
}

export function Porte({ pal, nuit, logo }: { pal: Pal; nuit: number; logo?: string }) {
  const g = (a: number) => X(a, 9.85), gy = (a: number, z = 0) => Y(a, 9.85, z);
  const x1 = g(2.2), y1 = gy(2.2), x2 = g(4.0), y2 = gy(4.0);
  return (
    <g>
      {[[x1, y1], [x2, y2]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 6} y={y - 92} width="12" height="92" fill={eclaircir(pal.deco, 0.55)} />
          <rect x={x - 8} y={y - 98} width="16" height="8" fill={pal.deco} />
          <rect x={x - 8} y={y - 6} width="16" height="6" fill={assombrir(pal.deco, 0.1)} />
          <Lanterne cx={x} cy={y - 64} s={1.2} couleur={pal.deco} />
        </g>
      ))}
      <path d={`M${x1} ${y1 - 94} Q${(x1 + x2) / 2} ${(y1 + y2) / 2 - 126} ${x2} ${y2 - 94}`} stroke={pal.deco} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d={`M${x1} ${y1 - 94} Q${(x1 + x2) / 2} ${(y1 + y2) / 2 - 126} ${x2} ${y2 - 94}`} stroke="#fff" strokeWidth="1" fill="none" opacity="0.4" />
      {logo && (
        // enseigne suspendue au milieu de l'arche, inclinée comme le mur de la porte
        <g transform={`translate(${(x1 + x2) / 2} ${(y1 + y2) / 2 - 108}) matrix(1 0.5 0 1 0 0)`}>
          <line x1="-18" y1="0" x2="-18" y2="8" stroke={pal.deco} strokeWidth="1.6" /><line x1="18" y1="0" x2="18" y2="8" stroke={pal.deco} strokeWidth="1.6" />
          <rect x="-36" y="8" width="72" height="28" rx="5" fill="#1B1511" stroke={pal.deco} strokeWidth="1.4" />
          <image href={logo} x="-31" y="10" width="62" height="24" preserveAspectRatio="xMidYMid meet" />
        </g>
      )}
      <ellipse cx={(x1 + x2) / 2} cy={(y1 + y2) / 2 - 20} rx="40" ry="12" fill="#FFD98A" opacity={0.12 + nuit * 0.2} />
    </g>
  );
}

export function Allee({ gx, gy, w, d, pal }: { gx: number; gy: number; w: number; d: number; pal: Pal }) {
  return (
    <g>
      <polygon points={poly([gx, gy, 0], [gx + w, gy, 0], [gx + w, gy + d, 0], [gx, gy + d, 0])} fill={assombrir(pal.accent, 0.05)} />
      <polygon points={poly([gx + 0.08, gy, 0], [gx + w - 0.08, gy, 0], [gx + w - 0.08, gy + d, 0], [gx + 0.08, gy + d, 0])} fill={melanger(pal.accent, pal.nappe, 0.55)} />
      {Array.from({ length: 5 }, (_, i) => [<circle key={`a${i}`} cx={X(gx - 0.12, gy + 0.25 + i * 0.5)} cy={Y(gx - 0.12, gy + 0.25 + i * 0.5, 3)} r="2.4" fill="#FFD98A" />, <circle key={`b${i}`} cx={X(gx + w + 0.12, gy + 0.25 + i * 0.5)} cy={Y(gx + w + 0.12, gy + 0.25 + i * 0.5, 3)} r="2.4" fill="#FFD98A" />])}
    </g>
  );
}

export function Photographe({ gx, gy }: { gx: number; gy: number }) {
  const x = X(gx, gy), y = Y(gx, gy);
  return <g><Personne x={x} y={y} corps="#2c2a2f" peau={peauDe(2)} s={1.1} bob /><rect x={x + 2} y={y - 22} width="9" height="6.4" rx="1.4" fill="#222" /><circle cx={x + 6.5} cy={y - 19} r="2" fill="#7da0be" /></g>;
}

// ── Effets ──────────────────────────────────────────────────────────────────
export function Petales({ pal }: { pal: Pal }) {
  const g = hasard(5);
  return (
    <g>
      {Array.from({ length: 26 }, (_, i) => {
        const x = 150 + g() * 500, d = 4 + g() * 5, c = g() > 0.5 ? pal.fleurs : eclaircir(pal.fleurs, 0.35);
        return <ellipse key={i} cx={x} cy={90} rx="3.6" ry="2.2" fill={c} opacity="0.92" className="hc-petale" style={{ animationDelay: `${g() * d}s`, animationDuration: `${d}s`, ["--dx" as string]: `${(g() - 0.5) * 80}px` }} />;
      })}
    </g>
  );
}

export function CielLanternes() {
  const g = hasard(9);
  return (
    <g>
      {Array.from({ length: 16 }, (_, i) => {
        const x = 130 + g() * 540, y = 40 + g() * 130, s = 0.7 + g() * 0.7;
        return <g key={i} className="hc-flotte" style={{ animationDelay: `${g() * 4}s` }}><ellipse cx={x} cy={y} rx={9 * s} ry={11 * s} fill="#FFC970" opacity="0.92" /><ellipse cx={x} cy={y} rx={24 * s} ry={26 * s} fill="#FFD98A" opacity="0.18" /></g>;
      })}
    </g>
  );
}

export function Brume() {
  return (
    <g opacity="0.55">
      {[[300, 450, 190], [520, 430, 210], [420, 500, 240], [220, 380, 150], [610, 390, 150]].map(([x, y, r], i) => <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.22} fill="#F3E7CD" opacity="0.35" className="hc-brume" style={{ animationDelay: `${i * 1.3}s` }} />)}
    </g>
  );
}

export const STYLE_CSS = `
.hc-bob{animation:hc-bob 2.4s ease-in-out infinite}
@keyframes hc-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-1.4px)}}
.hc-flamme{animation:hc-flamme 1.6s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
@keyframes hc-flamme{0%,100%{opacity:.92}40%{opacity:.7}70%{opacity:1}}
.hc-case{animation:hc-case 1.6s ease-in-out infinite alternate}
@keyframes hc-case{from{opacity:.55}to{opacity:1}}
.hc-etincelle{animation:hc-etincelle .9s ease-out infinite;transform-box:fill-box;transform-origin:bottom}
@keyframes hc-etincelle{0%{opacity:0;transform:scale(.2)}30%{opacity:1}100%{opacity:0;transform:scale(1.15)}}
.hc-disque{animation:hc-disque 1.2s linear infinite;transform-box:fill-box;transform-origin:center}
@keyframes hc-disque{to{transform:rotate(360deg)}}
.hc-ondes{animation:hc-ondes 1.8s ease-out infinite;transform-box:fill-box;transform-origin:center}
@keyframes hc-ondes{0%{opacity:.8;transform:scale(.5)}100%{opacity:0;transform:scale(1.7)}}
.hc-onde{animation:hc-onde 2.6s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:center}
@keyframes hc-onde{from{transform:scale(.9);opacity:.5}to{transform:scale(1.08);opacity:.85}}
.hc-jet{animation:hc-jet 1.4s ease-in-out infinite alternate}
@keyframes hc-jet{from{opacity:.55}to{opacity:1}}
.hc-flash{animation:hc-flash 3.2s ease-out infinite;opacity:0}
@keyframes hc-flash{0%,86%{opacity:0}90%{opacity:.85}100%{opacity:0}}
.hc-vapeur{animation:hc-vapeur 2.8s ease-out infinite}
@keyframes hc-vapeur{0%{opacity:0;transform:translateY(4px)}40%{opacity:.7}100%{opacity:0;transform:translateY(-8px)}}
.hc-petale{animation:hc-petale 6s linear infinite}
@keyframes hc-petale{0%{transform:translate(0,0) rotate(0);opacity:0}10%{opacity:1}100%{transform:translate(var(--dx,20px),420px) rotate(260deg);opacity:0}}
.hc-flotte{animation:hc-flotte 6s ease-in-out infinite alternate}
@keyframes hc-flotte{from{transform:translateY(0)}to{transform:translateY(-14px)}}
.hc-brume{animation:hc-brume 9s ease-in-out infinite alternate}
@keyframes hc-brume{from{transform:translateX(-26px)}to{transform:translateX(26px)}}
.hc-nuage{animation:hc-nuage 90s linear infinite}
@keyframes hc-nuage{from{transform:translateX(-120px)}to{transform:translateX(900px)}}
.hc-oiseau{animation:hc-oiseau 26s linear infinite}
@keyframes hc-oiseau{from{transform:translate(-60px,0)}to{transform:translate(900px,-40px)}}
.hc-halo{animation:hc-halo 1.4s ease-out 3}
@keyframes hc-halo{0%{opacity:0;transform:scale(.4)}25%{opacity:.95}100%{opacity:0;transform:scale(1.5)}}
.hc-scintille{animation:hc-scint 3.2s ease-in-out infinite}
@keyframes hc-scint{0%,100%{opacity:.35}50%{opacity:1}}
.hc-arrive{transition:transform var(--duree,2.6s) cubic-bezier(.3,.7,.3,1),opacity .8s}
@media (prefers-reduced-motion:reduce){
 .hc-bob,.hc-flamme,.hc-case,.hc-etincelle,.hc-disque,.hc-ondes,.hc-onde,.hc-jet,.hc-flash,.hc-vapeur,.hc-petale,.hc-flotte,.hc-brume,.hc-nuage,.hc-oiseau,.hc-halo,.hc-scintille{animation:none!important}
 .hc-arrive{transition:none!important}
}
`;
