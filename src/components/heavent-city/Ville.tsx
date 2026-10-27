/**
 * La mini-ville : cinq lieux d'inspiration à choisir, vus en 2,5D au coucher du soleil.
 * Un appui (ou Entrée au clavier) sur un lieu ouvre la scène avec un mouvement de caméra.
 */
import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { LIEUX, type LieuId } from "./donnees";
import { melanger, assombrir, eclaircir, hasard } from "./iso";
import { STYLE_CSS } from "./dessins";

type G = { X: (gx: number, gy: number) => number; Y: (gx: number, gy: number, z?: number) => number; p: (a: number, b: number, z?: number) => string };
const rep = (ox: number, oy: number, s: number): G => {
  const X = (gx: number, gy: number) => ox + (gx - gy) * 32 * s;
  const Y = (gx: number, gy: number, z = 0) => oy + (gx + gy) * 16 * s - z * s;
  return { X, Y, p: (a, b, z = 0) => `${X(a, b).toFixed(1)},${Y(a, b, z).toFixed(1)}` };
};

function Cube({ v, gx, gy, w, d, h, z0 = 0, haut, gauche, droite }: { v: G; gx: number; gy: number; w: number; d: number; h: number; z0?: number; haut: string; gauche?: string; droite?: string }) {
  const t = z0 + h, gch = gauche ?? assombrir(haut, 0.14), drt = droite ?? assombrir(haut, 0.28);
  return (
    <g>
      <polygon points={[v.p(gx, gy + d, t), v.p(gx + w, gy + d, t), v.p(gx + w, gy + d, z0), v.p(gx, gy + d, z0)].join(" ")} fill={gch} />
      <polygon points={[v.p(gx + w, gy, t), v.p(gx + w, gy + d, t), v.p(gx + w, gy + d, z0), v.p(gx + w, gy, z0)].join(" ")} fill={drt} />
      <polygon points={[v.p(gx, gy, t), v.p(gx + w, gy, t), v.p(gx + w, gy + d, t), v.p(gx, gy + d, t)].join(" ")} fill={haut} />
    </g>
  );
}
/** Fenêtres alignées sur la face de gauche (y = constante) */
function FenG({ v, y, x0, x1, z0, z1, nx, nz, c, lit }: { v: G; y: number; x0: number; x1: number; z0: number; z1: number; nx: number; nz: number; c: string; lit: number }) {
  const out = [];
  const dx = (x1 - x0) / nx, dz = (z1 - z0) / nz;
  for (let i = 0; i < nx; i++) for (let k = 0; k < nz; k++) {
    const a = x0 + i * dx + dx * 0.18, b = x0 + (i + 1) * dx - dx * 0.18, za = z0 + k * dz + dz * 0.2, zb = z0 + (k + 1) * dz - dz * 0.2;
    out.push(<polygon key={`${i}-${k}`} points={[v.p(a, y, zb), v.p(b, y, zb), v.p(b, y, za), v.p(a, y, za)].join(" ")} fill={(i * 3 + k * 5) % 4 === 0 ? "#FFD98A" : c} opacity={(i * 3 + k * 5) % 4 === 0 ? 0.55 + lit * 0.4 : 0.9} />);
  }
  return <g>{out}</g>;
}
function FenD({ v, x, y0, y1, z0, z1, ny, nz, c, lit }: { v: G; x: number; y0: number; y1: number; z0: number; z1: number; ny: number; nz: number; c: string; lit: number }) {
  const out = [];
  const dy = (y1 - y0) / ny, dz = (z1 - z0) / nz;
  for (let i = 0; i < ny; i++) for (let k = 0; k < nz; k++) {
    const a = y0 + i * dy + dy * 0.18, b = y0 + (i + 1) * dy - dy * 0.18, za = z0 + k * dz + dz * 0.2, zb = z0 + (k + 1) * dz - dz * 0.2;
    out.push(<polygon key={`${i}-${k}`} points={[v.p(x, a, zb), v.p(x, b, zb), v.p(x, b, za), v.p(x, a, za)].join(" ")} fill={(i * 5 + k * 3) % 4 === 1 ? "#FFD98A" : c} opacity={(i * 5 + k * 3) % 4 === 1 ? 0.55 + lit * 0.4 : 0.9} />);
  }
  return <g>{out}</g>;
}

const S = 0.85, T = 3.6;
function Plateforme({ v, sol, bord }: { v: G; sol: string; bord: string }) {
  return (
    <g>
      <polygon points={[v.p(0, T, -2), v.p(T, T, -2), v.p(T, T, -12), v.p(0, T, -12)].join(" ")} fill={assombrir(bord, 0.18)} />
      <polygon points={[v.p(T, 0, -2), v.p(T, T, -2), v.p(T, T, -12), v.p(T, 0, -12)].join(" ")} fill={assombrir(bord, 0.32)} />
      <polygon points={[v.p(0, 0), v.p(T, 0), v.p(T, T), v.p(0, T)].join(" ")} fill={sol} stroke={bord} strokeWidth="1" />
    </g>
  );
}

function Palmier({ x, y, s = 1, nuit }: { x: number; y: number; s?: number; nuit: number }) {
  const tr = melanger("#6B4A33", "#1a1420", nuit * 0.5), f = melanger("#5E8F4F", "#17301f", nuit * 0.5);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="1" rx="9" ry="3" fill="#2b1a10" opacity="0.25" />
      <path d="M0 0 q4 -22 1 -44" stroke={tr} strokeWidth="3.4" fill="none" />
      {[-110, -70, -30, 10, 50, 90, 130].map((a) => <path key={a} d={`M1 -44 q${Math.sin((a * Math.PI) / 180) * 14} ${-9 - Math.abs(a) / 16} ${Math.sin((a * Math.PI) / 180) * 24} ${Math.abs(a) / 9 + 2}`} stroke={f} strokeWidth="3.2" strokeLinecap="round" fill="none" />)}
    </g>
  );
}

function Riad({ nuit }: { nuit: number }) {
  const v = rep(0, 0, S);
  return (
    <g>
      <Plateforme v={v} sol="#E3CFA6" bord="#B8975F" />
      <Cube v={v} gx={0.2} gy={0.2} w={T - 0.4} d={T - 0.4} h={46} haut="#D99A6A" gauche="#C98456" droite="#A96A40" />
      <polygon points={[v.p(0.2, 0.2, 49), v.p(T - 0.2, 0.2, 49), v.p(T - 0.2, T - 0.2, 49), v.p(0.2, T - 0.2, 49)].join(" ")} fill="none" stroke="#2F6277" strokeWidth="3" />
      <polygon points={[v.p(0.9, 0.9, 46), v.p(T - 0.9, 0.9, 46), v.p(T - 0.9, T - 0.9, 46), v.p(0.9, T - 0.9, 46)].join(" ")} fill="#3E6F7B" />
      <polygon points={[v.p(1.1, 1.1, 46), v.p(T - 1.1, 1.1, 46), v.p(T - 1.1, T - 1.1, 46), v.p(1.1, T - 1.1, 46)].join(" ")} fill="#7FC3C9" />
      <circle cx={v.X(T / 2, T / 2)} cy={v.Y(T / 2, T / 2, 50)} r="4" fill="#E8D6A2" />
      <FenG v={v} y={T - 0.2} x0={0.5} x1={T - 0.5} z0={8} z1={36} nx={5} nz={1} c={melanger("#4B2E1E", "#2a2038", nuit)} lit={nuit} />
      {[0.6, 1.5, 2.4].map((a) => <path key={a} d={`M${v.X(a, T - 0.2)} ${v.Y(a, T - 0.2, 8)} l0 -22 q4 -6 8 0 l0 22 z`} fill="#4B2E1E" opacity="0.0" />)}
      <FenD v={v} x={T - 0.2} y0={0.5} y1={T - 0.5} z0={8} z1={36} ny={5} nz={1} c={melanger("#3A2214", "#241a30", nuit)} lit={nuit} />
      {[[0.3, 0.3], [T - 0.3, 0.3]].map(([a, b], i) => <g key={i}><rect x={v.X(a, b) - 1.4} y={v.Y(a, b, 62)} width="2.8" height="14" fill="#C9A74E" /><circle cx={v.X(a, b)} cy={v.Y(a, b, 64)} r="4" fill="#FFD98A" opacity={0.6 + nuit * 0.4} /></g>)}
    </g>
  );
}

function Villa({ nuit }: { nuit: number }) {
  const v = rep(0, 0, S);
  const verre = melanger("#8FC6D4", "#1c2850", nuit);
  return (
    <g>
      <Plateforme v={v} sol="#CDB48C" bord="#A58A5C" />
      <polygon points={[v.p(2.0, 2.0), v.p(3.4, 2.0), v.p(3.4, 3.4), v.p(2.0, 3.4)].join(" ")} fill="#F0ECE2" />
      <polygon points={[v.p(2.15, 2.15), v.p(3.25, 2.15), v.p(3.25, 3.25), v.p(2.15, 3.25)].join(" ")} fill={melanger("#6FC3D8", "#1c3b6e", nuit)} />
      <Cube v={v} gx={0.2} gy={0.2} w={2.2} d={1.7} h={30} haut="#F5F2EA" gauche="#E8E3D6" droite="#CFC8B6" />
      <FenG v={v} y={1.9} x0={0.4} x1={2.2} z0={4} z1={26} nx={3} nz={1} c={verre} lit={nuit} />
      <FenD v={v} x={2.4} y0={0.4} y1={1.7} z0={4} z1={26} ny={2} nz={1} c={verre} lit={nuit} />
      <Cube v={v} gx={0.5} gy={0.5} w={1.6} d={1.2} h={26} z0={30} haut="#FBF9F3" gauche="#EFEADC" droite="#D8D0BC" />
      <FenG v={v} y={1.7} x0={0.7} x1={2.0} z0={34} z1={52} nx={3} nz={1} c={verre} lit={nuit} />
      <Cube v={v} gx={0.4} gy={0.4} w={1.8} d={1.4} h={3} z0={56} haut="#8A6A47" />
      <Palmier x={v.X(3.2, 0.6)} y={v.Y(3.2, 0.6)} s={0.9} nuit={nuit} />
      <Palmier x={v.X(0.5, 3.1)} y={v.Y(0.5, 3.1)} s={0.8} nuit={nuit} />
    </g>
  );
}

function Rooftop({ nuit }: { nuit: number }) {
  const v = rep(0, 0, S);
  return (
    <g>
      <Plateforme v={v} sol="#CFC6B6" bord="#9C927F" />
      <Cube v={v} gx={0.7} gy={0.7} w={2.2} d={2.2} h={150} haut="#E4DACA" gauche="#D3C8B6" droite="#B5A994" />
      <FenG v={v} y={2.9} x0={0.9} x1={2.7} z0={10} z1={140} nx={4} nz={8} c={melanger("#3E4D63", "#16203d", nuit)} lit={nuit} />
      <FenD v={v} x={2.9} y0={0.9} y1={2.7} z0={10} z1={140} ny={4} nz={8} c={melanger("#35435a", "#131b36", nuit)} lit={nuit} />
      <Cube v={v} gx={0.6} gy={0.6} w={2.4} d={2.4} h={7} z0={150} haut="#F2EBDD" />
      {Array.from({ length: 8 }, (_, i) => { const a = 0.8 + (i % 4) * 0.6, b = i < 4 ? 0.7 : 2.9; return <circle key={i} cx={v.X(a, b)} cy={v.Y(a, b, 170)} r="2.4" fill="#FFE9A8" opacity={0.6 + nuit * 0.4} />; })}
      <path d={`M${v.X(0.7, 0.7)} ${v.Y(0.7, 0.7, 168)} Q${v.X(1.8, 0.7)} ${v.Y(1.8, 0.7, 150)} ${v.X(2.9, 0.7)} ${v.Y(2.9, 0.7, 168)}`} stroke="#FFE9A8" strokeWidth="1.2" fill="none" opacity="0.8" />
      <Cube v={v} gx={1.2} gy={1.2} w={1.2} d={1.2} h={14} z0={157} haut="#C9B28A" />
    </g>
  );
}

function Jardin({ nuit }: { nuit: number }) {
  const v = rep(0, 0, S);
  const g = hasard(4);
  const haie = melanger("#6E9254", "#14281c", nuit * 0.5);
  return (
    <g>
      <Plateforme v={v} sol="#B8CC8A" bord="#8AA562" />
      {[[0.2, 0.2, T - 0.4, 0.4], [0.2, 0.2, 0.4, T - 0.4]].map(([gx, gy, w, d], i) => <Cube key={i} v={v} gx={gx} gy={gy} w={w} d={d} h={20} haut={eclaircir(haie, 0.05)} gauche={assombrir(haie, 0.1)} droite={assombrir(haie, 0.25)} />)}
      <ellipse cx={v.X(T / 2 + 0.4, T / 2 + 0.4)} cy={v.Y(T / 2 + 0.4, T / 2 + 0.4)} rx="46" ry="22" fill="#E8DDC0" />
      {[[1.3, 1.3], [2.5, 2.3], [1.5, 2.6]].map(([a, b], i) => (
        <g key={i}><ellipse cx={v.X(a, b)} cy={v.Y(a, b, 12)} rx="11" ry="5" fill="#FBF6EA" /><rect x={v.X(a, b) - 1} y={v.Y(a, b, 12)} width="2" height="12" fill="#C9A74E" /></g>
      ))}
      {[[0.8, 0.9], [3.0, 1.0], [0.9, 3.0]].map(([a, b], i) => (
        <g key={i} transform={`translate(${v.X(a, b)} ${v.Y(a, b)})`}>
          <rect x="-3" y="-34" width="6" height="34" fill="#6B4A33" />
          {[[-14, -50, 20], [12, -52, 20], [0, -66, 22]].map(([x, y, r], k) => <circle key={k} cx={x} cy={y} r={r} fill={k % 2 ? "#6E9254" : "#5F8647"} />)}
        </g>
      ))}
      {Array.from({ length: 16 }, (_, i) => <circle key={i} cx={v.X(0.4 + g() * 3, 0.4 + g() * 3)} cy={v.Y(0.4 + g() * 3, 0.4 + g() * 3, 4)} r="1.8" fill={["#fff", "#F4D774", "#E8A6B0"][i % 3]} />)}
      {[[1.2, 3.1], [3.1, 1.2]].map(([a, b], i) => <g key={i}><rect x={v.X(a, b) - 1.2} y={v.Y(a, b, 40)} width="2.4" height="40" fill="#3a3128" /><circle cx={v.X(a, b)} cy={v.Y(a, b, 42)} r="3.6" fill="#FFE9A8" opacity={0.6 + nuit * 0.4} /></g>)}
    </g>
  );
}

function Salle({ nuit }: { nuit: number }) {
  const v = rep(0, 0, S);
  const verre = melanger("#E9C27A", "#3a3060", nuit * 0.3);
  return (
    <g>
      <Plateforme v={v} sol="#E6DCC8" bord="#BBAE92" />
      <Cube v={v} gx={0.3} gy={0.5} w={3.0} d={2.6} h={52} haut="#F4EBD6" gauche="#E9DDC0" droite="#CDBE9C" />
      {[0.7, 1.2, 1.7, 2.2, 2.7].map((a) => <path key={a} d={`M${v.X(a, 3.1)} ${v.Y(a, 3.1, 4)} L${v.X(a, 3.1)} ${v.Y(a, 3.1, 40)}`} stroke="#fff" strokeWidth="3" opacity="0.8" />)}
      <FenG v={v} y={3.1} x0={0.5} x1={3.1} z0={8} z1={38} nx={5} nz={1} c={verre} lit={nuit} />
      <FenD v={v} x={3.3} y0={0.7} y1={3.0} z0={8} z1={38} ny={4} nz={1} c={verre} lit={nuit} />
      <polygon points={[v.p(0.2, 3.1, 52), v.p(3.4, 3.1, 52), v.p(1.8, 3.1, 70)].join(" ")} fill="#EBDDBF" stroke="#C9A74E" strokeWidth="1.5" />
      <ellipse cx={v.X(1.9, 1.7)} cy={v.Y(1.9, 1.7, 62)} rx="30" ry="16" fill="#C9A74E" /><path d={`M${v.X(1.9, 1.7) - 30} ${v.Y(1.9, 1.7, 62)} A30 26 0 0 1 ${v.X(1.9, 1.7) + 30} ${v.Y(1.9, 1.7, 62)}`} fill="#E8D49A" />
      <rect x={v.X(1.9, 1.7) - 1} y={v.Y(1.9, 1.7, 62) - 40} width="2" height="12" fill="#C9A74E" />
      {[0.1, 0.1].map((_, i) => <circle key={i} cx={v.X(0.2 + i * 3.1, 3.2)} cy={v.Y(0.2 + i * 3.1, 3.2, 50)} r="3.4" fill="#FFE9A8" opacity={0.6 + nuit * 0.4} />)}
    </g>
  );
}

const PLOTS: { id: LieuId; ox: number; oy: number; Comp: typeof Riad; etiquette: [number, number] }[] = [
  { id: "rooftop", ox: 400, oy: 92, Comp: Rooftop, etiquette: [400, 70] },
  { id: "riad", ox: 215, oy: 198, Comp: Riad, etiquette: [215, 178] },
  { id: "villa", ox: 585, oy: 198, Comp: Villa, etiquette: [585, 160] },
  { id: "jardin", ox: 305, oy: 322, Comp: Jardin, etiquette: [305, 300] },
  { id: "salle", ox: 497, oy: 322, Comp: Salle, etiquette: [497, 296] },
];

export function MiniCarte({ choisi, survol }: { choisi?: LieuId | null; survol?: LieuId | null }) {
  const pts: Record<LieuId, [number, number]> = { rooftop: [50, 12], riad: [22, 34], villa: [78, 34], jardin: [34, 60], salle: [66, 60] };
  return (
    <svg viewBox="0 0 100 80" aria-hidden="true" className="w-full h-full">
      <rect width="100" height="80" rx="10" fill="#17141a" />
      <polygon points="50,6 96,40 50,74 4,40" fill="#2a2430" stroke="#C9A74E" strokeWidth="1" opacity="0.9" />
      <path d="M50 6 L50 74 M4 40 L96 40" stroke="#C9A74E" strokeWidth="0.8" opacity="0.35" />
      {(Object.keys(pts) as LieuId[]).map((k) => (
        <g key={k}>
          <circle cx={pts[k][0]} cy={pts[k][1]} r={choisi === k || survol === k ? 5.2 : 3.4} fill={choisi === k || survol === k ? "#F4D774" : "#C9A74E"} stroke="#17141a" strokeWidth="1.2" />
        </g>
      ))}
    </svg>
  );
}

export default function Ville({ onChoisir, choisi, bloque, logo, nuit = 0.22 }: { onChoisir: (l: LieuId) => void; choisi?: LieuId | null; bloque?: boolean; logo?: string; nuit?: number }) {
  const uid = useId().replace(/:/g, "");
  const reduit = useReducedMotion();
  const [survol, setSurvol] = useState<LieuId | null>(null);
  const [zoom, setZoom] = useState<LieuId | null>(null);
  const haut = melanger("#53507A", "#0B1030", nuit), milieu = melanger("#E08A62", "#1A2050", nuit), bas = melanger("#FBC888", "#3C3057", nuit);
  const g = hasard(12);

  const ouvrir = (id: LieuId) => {
    if (bloque || zoom) return;
    setZoom(id);
    if (reduit) { onChoisir(id); return; }
    window.setTimeout(() => onChoisir(id), 1150);
  };
  const cible = zoom ? PLOTS.find((p) => p.id === zoom)! : null;
  const k = 2.7;

  return (
    <div className="relative w-full h-full overflow-hidden">
      <svg viewBox="0 -40 800 580" preserveAspectRatio="xMidYMid meet" style={{ overflow: "visible" }} className="w-full h-full block" role="group" aria-label="Heavent City, une petite ville marocaine au coucher du soleil. Choisis un lieu.">
        <style>{STYLE_CSS}</style>
        <defs>
          <linearGradient id={`ciel${uid}`} gradientUnits="userSpaceOnUse" x1="0" y1="-120" x2="0" y2="330"><stop offset="0" stopColor={haut} /><stop offset="0.55" stopColor={milieu} /><stop offset="0.9" stopColor={bas} /></linearGradient>
          <linearGradient id={`sol${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={melanger("#E2C899", "#2a2440", nuit * 0.5)} /><stop offset="1" stopColor={melanger("#B8935F", "#1a1830", nuit * 0.6)} /></linearGradient>
        </defs>
        <rect x="-2400" y="-2400" width="5600" height="5000" fill={`url(#ciel${uid})`} />
        <circle cx="560" cy="120" r="90" fill="#FFE2A8" opacity="0.4" /><circle cx="560" cy="120" r="38" fill="#FFF1C8" opacity="0.95" />
        {[[70, 60, 1], [330, 36, 0.8], [650, 70, 1.1]].map(([x, y, s], i) => <g key={i} opacity="0.5" className="hc-nuage" style={{ animationDuration: `${90 + i * 20}s`, animationDelay: `${-i * 25}s` }}><ellipse cx={x} cy={y} rx={46 * s} ry={9 * s} fill="#FFE6C8" /><ellipse cx={x + 22 * s} cy={y - 6 * s} rx={26 * s} ry={8 * s} fill="#FFE6C8" /></g>)}
        <g className="hc-oiseau" fill="none" stroke="#3a2b3a" strokeWidth="1.2" opacity="0.7"><path d="M0 0 q4 -4 8 0 q4 -4 8 0" transform="translate(0 110)" /><path d="M0 0 q3 -3 6 0 q3 -3 6 0" transform="translate(24 124)" /></g>
        {/* silhouette lointaine */}
        <path d="M-2000 250 L0 250 Q80 205 170 240 T340 235 T520 225 T700 240 T800 230 L2600 235 L2600 340 L-2000 340 Z" fill={melanger("#9B6B6B", "#202750", nuit)} opacity="0.7" />
        <rect x="-2400" y="330" width="5600" height="3000" fill={melanger("#D2B07C", "#1c1a30", nuit * 0.6)} />
        <rect x="705" y="160" width="12" height="90" fill={melanger("#8A5C60", "#1c2250", nuit)} /><path d="M703 160 L711 138 L719 160 Z" fill={melanger("#8A5C60", "#1c2250", nuit)} />

        <motion.g
          style={{ transformOrigin: "0px 0px" }}
          animate={cible ? { scale: k, x: 400 - cible.ox * k, y: 300 - (cible.oy + 40) * k } : { scale: 1, x: 0, y: 0 }}
          transition={{ duration: reduit ? 0 : 1.1, ease: [0.5, 0, 0.2, 1] }}
        >
          {/* socle de la ville */}
          <polygon points="400,46 790,250 400,470 10,250" fill={`url(#sol${uid})`} />
          <polygon points="400,470 790,250 790,268 400,490 10,268 10,250" fill={melanger("#9C7A4A", "#1a1830", nuit * 0.5)} />
          {/* avenues */}
          <polygon points="388,150 412,150 600,340 576,350" fill="#C7AE82" opacity="0.0" />
          <path d="M400 46 L400 470 M10 250 L790 250" stroke={melanger("#C9AE7C", "#2a2440", nuit * 0.4)} strokeWidth="26" opacity="0.55" />
          <path d="M400 46 L400 470 M10 250 L790 250" stroke="#E8D6A2" strokeWidth="1.5" strokeDasharray="10 12" opacity="0.7" />
          {Array.from({ length: 22 }, (_, i) => <ellipse key={i} cx={40 + g() * 720} cy={270 + g() * 200} rx={8 + g() * 22} ry={2 + g() * 6} fill={melanger("#B8935F", "#1a1830", 0.2)} opacity="0.3" />)}
          {[[130, 330], [680, 330], [100, 400], [700, 410], [250, 440], [560, 450]].map(([x, y], i) => <Palmier key={i} x={x} y={y} s={0.95} nuit={nuit} />)}
          {/* promeneurs */}
          {!reduit && (
            <g>
              {[0, 1, 2, 3].map((i) => {
                const chemins = ["M60 252 L740 252", "M740 249 L60 249", "M402 70 L402 440", "M398 440 L398 70"];
                return (
                  <g key={i}>
                    <circle r="3.2" fill={["#7C2436", "#2F6277", "#C9A74E", "#4a4038"][i]}>
                      <animateMotion dur={`${34 + i * 6}s`} repeatCount="indefinite" path={chemins[i]} begin={`${-i * 7}s`} />
                    </circle>
                  </g>
                );
              })}
            </g>
          )}
          {PLOTS.map(({ id, ox, oy, Comp }) => {
            const actif = survol === id || choisi === id || zoom === id;
            const info = LIEUX.find((l) => l.id === id)!;
            const bascule = (v: boolean) => setSurvol(v ? id : (s) => (s === id ? null : s));
            return (
              <g
                key={id} role="button" tabIndex={0} aria-label={`${info.nom} — ${info.phrase}. Appuyer pour choisir ce lieu.`} data-testid={`lieu-${id}`} style={{ cursor: bloque ? "default" : "pointer", outline: "none" }}
                onClick={() => ouvrir(id)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); ouvrir(id); } }}
                onPointerEnter={() => bascule(true)} onPointerLeave={() => bascule(false)} onFocus={() => bascule(true)} onBlur={() => bascule(false)}
              >
                <g transform={`translate(${ox} ${oy})`} style={{ transition: "transform .25s ease" }}>
                  <g style={{ transform: actif ? "translateY(-4px)" : "none", transition: "transform .25s ease" }}>
                    <Comp nuit={nuit} />
                  </g>
                  <polygon points={`0,0 ${T * 32 * S},${T * 16 * S} 0,${T * 32 * S} ${-T * 32 * S},${T * 16 * S}`} fill="transparent" />
                  {actif && <polygon points={`0,-2 ${T * 32 * S + 3},${T * 16 * S} 0,${T * 32 * S + 3} ${-T * 32 * S - 3},${T * 16 * S}`} fill="none" stroke="#F4D774" strokeWidth="2.5" strokeLinejoin="round" />}
                </g>
                <rect x={ox - 200} y={oy - 170} width="400" height="330" fill="transparent" style={{ pointerEvents: "none" }} />
              </g>
            );
          })}
          {/* portail Heavent City avec le vrai logo : dessiné après les terrains (devant eux) mais sous les étiquettes */}
          <g transform="translate(400 476)" style={{ pointerEvents: "none" }}>
            {[-70, 70].map((x) => <g key={x}><rect x={x - 7} y="-62" width="14" height="62" fill="#EBDDBF" /><rect x={x - 10} y="-68" width="20" height="8" fill="#C9A74E" /><circle cx={x} cy="-76" r="5" fill="#FFD98A" opacity={0.6 + nuit} /></g>)}
            <rect x="-70" y="-76" width="140" height="26" rx="5" fill="#17141a" stroke="#C9A74E" strokeWidth="1.5" />
            {logo ? <image href={logo} x="-56" y="-74" width="112" height="22" preserveAspectRatio="xMidYMid meet" /> : <text x="0" y="-58" textAnchor="middle" fill="#E4D49A" fontSize="12" fontFamily="serif" letterSpacing="3">HEAVENT CITY</text>}
          </g>
          {PLOTS.map(({ id, ox, oy }) => {
            const info = LIEUX.find((l) => l.id === id)!;
            const actif = survol === id || choisi === id;
            const ty = oy + T * 16 * S * 2 + 26;
            return (
              <g key={`e${id}`} style={{ pointerEvents: "none", transition: "opacity .3s" }} opacity={(zoom && zoom !== id) || bloque ? 0 : 1}>
                <rect x={ox - 62} y={ty - 13} width="124" height="22" rx="11" fill={actif ? "#F4D774" : "#17141a"} opacity={actif ? 1 : 0.82} />
                <text x={ox} y={ty + 2} textAnchor="middle" fontSize="11.5" fontFamily="'Playfair Display', Georgia, serif" fill={actif ? "#17141a" : "#F0E3B8"}>{info.nom}</text>
              </g>
            );
          })}
        </motion.g>
              </svg>
      {/* Mini-carte, à la manière d'un jeu en monde ouvert (dessin original Heavent) */}
      <div className="absolute left-3 bottom-3 w-24 h-20 sm:w-32 sm:h-24 rounded-xl border border-[#C9A74E]/60 shadow-lg overflow-hidden pointer-events-none" aria-hidden="true"><MiniCarte choisi={choisi} survol={survol} /></div>
    </div>
  );
}
