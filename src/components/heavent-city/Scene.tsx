/**
 * La scène : un petit diorama isométrique dessiné en calques SVG.
 * Elle ne contient AUCUNE règle de jeu : elle dessine ce que l'état lui donne (voir etat.ts → rendu()).
 */
import { useId, useMemo, useRef, useState, type PointerEvent as PE, type ReactNode } from "react";
import { PALETTES, STYLES, type LieuId } from "./donnees";
import type { Rendu } from "./etat";
import { VB, X, Y, poly, melanger, assombrir, eclaircir, hasard } from "./iso";
import {
  Acoustique, Allee, Amariya, Arche, EspaceHenne, FauteuilsMaries, Neggafa, PieceMontee, Bar, BarParfums, BarreThe, Boite, Bouquet, Brume, Buffet, Candelabre, CielLanternes, Comptoir, Dj, EnceintesAmbiance, FeuxFroids, Fontaine,
  LivreDor, MurFleurs, Orchestre, Personne, Petales, Photobooth, Photographe, PisteDanse, Plan, PosteLanterne, Porte, SalonMarocain, STYLE_CSS, TableHonneur, TableHaute, TableRect, TableRonde,
  Troupe, cheveuxDe, cintre, peauDe, type Pal,
} from "./dessins";
import { RAYON_TABLE } from "./positions";
import { tr } from "./langue";

export type EtapeFinal = null | "avant" | "arrive" | "assis";
export interface SceneProps {
  r: Rendu; nuit: number; animer?: boolean; final?: EtapeFinal; logos?: { nawar?: string; heavent?: string };
  focus?: { cle: string; n: number } | null; compact?: boolean; className?: string; cadrage?: "meet" | "slice";
  /** mode « déplacer » : le visiteur peut faire glisser les objets (onDeplacer est appelé au relâchement) */
  deplacable?: boolean; onDeplacer?: (id: string, dx: number, dy: number) => void;
}

const H_MUR = 128;

// ── Ciel ────────────────────────────────────────────────────────────────────
function Ciel({ nuit, lieu, animer }: { nuit: number; lieu: LieuId; animer?: boolean }) {
  const g = hasard(3);
  const haut = melanger("#53507A", "#0B1030", nuit), milieu = melanger("#DE8566", "#1A2050", nuit), bas = melanger("#FBC888", "#3C3057", nuit);
  const etoiles = Array.from({ length: 90 }, () => ({ x: -500 + g() * 1800, y: -300 + g() * 500, r: 0.5 + g() * 1.1, d: g() * 3 }));
  const nuages = [[60, 70, 1], [420, 40, 0.8], [640, 100, 1.2]];
  return (
    <g>
      <rect x={-2400} y={-2400} width={VB.w + 4800} height={VB.h + 5000} fill="url(#hc-ciel)" />
      <defs>
        <linearGradient id="hc-ciel" gradientUnits="userSpaceOnUse" x1="0" y1="-60" x2="0" y2="330">
          <stop offset="0" stopColor={haut} /><stop offset="0.55" stopColor={milieu} /><stop offset="0.9" stopColor={bas} /><stop offset="1" stopColor={bas} />
        </linearGradient>
      </defs>
      {nuit > 0.45 && etoiles.map((e, i) => <circle key={i} cx={e.x} cy={e.y} r={e.r} fill="#fff" opacity={(nuit - 0.45) * 1.6} className={animer ? "hc-scintille" : undefined} style={{ animationDelay: `${e.d}s` }} />)}
      <circle cx="600" cy={250 + nuit * 120} r="70" fill="#FFE2A8" opacity={0.5 * (1 - nuit)} />
      <circle cx="600" cy={250 + nuit * 120} r="30" fill="#FFF1C8" opacity={0.9 * (1 - nuit * 0.9)} />
      {nuit > 0.6 && <g opacity={(nuit - 0.6) * 2.4}><circle cx="150" cy="70" r="20" fill="#F6EFD8" /><circle cx="158" cy="64" r="18" fill={haut} /></g>}
      {nuages.map(([x, y, s], i) => (
        <g key={i} opacity={0.5 - nuit * 0.3} className={animer ? "hc-nuage" : undefined} style={{ animationDuration: `${80 + i * 25}s`, animationDelay: `${-i * 30}s` }}>
          <ellipse cx={x} cy={y} rx={46 * s} ry={9 * s} fill={melanger("#FFE6C8", "#5a4c7a", nuit)} /><ellipse cx={x + 22 * s} cy={y - 6 * s} rx={26 * s} ry={8 * s} fill={melanger("#FFE6C8", "#5a4c7a", nuit)} />
        </g>
      ))}
      {animer && nuit < 0.6 && (
        <g className="hc-oiseau" fill="none" stroke="#3a2b3a" strokeWidth="1.2" opacity="0.7">
          <path d="M0 0 q4 -4 8 0 q4 -4 8 0" transform="translate(0 120)" /><path d="M0 0 q3 -3 6 0 q3 -3 6 0" transform="translate(22 132)" />
        </g>
      )}
      <Lointain lieu={lieu} nuit={nuit} />
    </g>
  );
}

function Lointain({ lieu, nuit }: { lieu: LieuId; nuit: number }) {
  const ton = melanger("#7A5668", "#151a3a", nuit), ton2 = melanger("#9B6B6B", "#202750", nuit);
  const fen = nuit > 0.35 ? (nuit - 0.35) * 1.5 : 0;
  const g = hasard(21);
  if (lieu === "rooftop" || lieu === "salle") {
    const immeubles = Array.from({ length: 52 }, (_, i) => ({ x: i * 44 - 560, w: 26 + g() * 26, h: 40 + g() * 120 }));
    return (
      <g>
        {immeubles.map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={290 - b.h} width={b.w} height={b.h + 70} fill={i % 2 ? ton : ton2} />
            {Array.from({ length: Math.floor(b.h / 14) }, (_, k) => k).filter((k) => (k * 7 + i) % 3 !== 0).slice(0, 8).map((k) => <rect key={k} x={b.x + 5 + (k % 2) * 9} y={290 - b.h + 8 + k * 14} width="4" height="5" fill="#FFD98A" opacity={fen} />)}
          </g>
        ))}
        <rect x="470" y="150" width="14" height="150" fill={ton} /><path d="M468 150 L477 126 L486 150 Z" fill={ton} /><circle cx="477" cy="122" r="3" fill="#FFD98A" opacity={0.5 + fen / 2} />
      </g>
    );
  }
  const palmiers = [[40, 250], [140, 270], [660, 245], [760, 262]];
  return (
    <g>
      <path d="M-2000 270 L0 270 Q120 215 260 262 T520 250 T800 268 L2600 268 L2600 340 L-2000 340 Z" fill={ton2} opacity="0.85" />
      {palmiers.map(([x, y], i) => (
        <g key={i}>
          <path d={`M${x} ${y} q${i % 2 ? 6 : -6} -40 ${i % 2 ? 3 : -3} -78`} stroke={ton} strokeWidth="4" fill="none" />
          {[-60, -30, 0, 30, 60, 100, -100].map((a) => <path key={a} d={`M${x + (i % 2 ? 3 : -3)} ${y - 78} q${Math.sin((a * Math.PI) / 180) * 26} ${-14 - Math.abs(a) / 12} ${Math.sin((a * Math.PI) / 180) * 40} ${Math.abs(a) / 6 + 6}`} stroke={ton} strokeWidth="3.4" strokeLinecap="round" fill="none" />)}
        </g>
      ))}
    </g>
  );
}


// ── Terrain autour du plateau et épaisseur de la dalle ──────────────────────
function Terrain({ lieu, nuit, N }: { lieu: LieuId; nuit: number; N: number }) {
  const base: Record<LieuId, [string, string, string, string]> = {
    riad: ["#D8B98B", "#B08A58", "#C6A474", "#A98550"],
    villa: ["#C8C2B2", "#9C9586", "#D9D3C4", "#B3AC9B"],
    rooftop: ["#3B3A57", "#1E1D38", "#6B6A86", "#4B4A68"],
    jardin: ["#9DB873", "#6F9050", "#B2C98A", "#85A862"],
    salle: ["#CDB79A", "#9D8667", "#DCC9AE", "#B49E80"],
  };
  const [a, b, gau, dro] = base[lieu];
  const g = hasard(17);
  const sombre = "#0d1230";
  return (
    <g>
      <defs><linearGradient id={`hc-terre-${lieu}`} gradientUnits="userSpaceOnUse" x1="0" y1="322" x2="0" y2={Y(N, N, 0) + 80}><stop offset="0" stopColor={melanger(a, sombre, nuit * 0.55)} /><stop offset="1" stopColor={melanger(b, sombre, nuit * 0.6)} /></linearGradient></defs>
      <path d={`M-2000 322 L0 330 Q200 308 400 322 T800 318 L2600 322 L2600 2400 L-2000 2400 Z`} fill={`url(#hc-terre-${lieu})`} />
      {lieu === "rooftop" && Array.from({ length: 120 }, (_, i) => <circle key={i} cx={-500 + g() * 1800} cy={420 + g() * (300 + (N - 12) * 40)} r={1 + g() * 2.4} fill={["#FFD98A", "#FFB86B", "#9FD2FF"][i % 3]} opacity={0.35 + nuit * 0.5} />)}
      {lieu !== "rooftop" && Array.from({ length: 50 }, (_, i) => <ellipse key={i} cx={-500 + g() * 1800} cy={430 + g() * (300 + (N - 12) * 40)} rx={10 + g() * 28} ry={3 + g() * 7} fill={melanger(a, sombre, 0.18)} opacity="0.35" />)}
      <polygon points={poly([0, N, 0], [N, N, 0], [N, N, -20], [0, N, -20])} fill={melanger(gau, sombre, nuit * 0.5)} />
      <polygon points={poly([N, 0, 0], [N, N, 0], [N, N, -20], [N, 0, -20])} fill={melanger(dro, sombre, nuit * 0.55)} />
      <polygon points={poly([0, N, -17], [N, N, -17], [N, N, -20], [0, N, -20])} fill="#00000030" />
      <polygon points={poly([N, 0, -17], [N, N, -17], [N, N, -20], [N, 0, -20])} fill="#00000040" />
      <ellipse cx="400" cy={Y(N, N, -20) + 18} rx={28 * N + 4} ry="16" fill="#2b1a10" opacity="0.18" />
    </g>
  );
}

// ── Sols ────────────────────────────────────────────────────────────────────
const dalle = (i: number, j: number, z = 0) => poly([i, j, z], [i + 1, j, z], [i + 1, j + 1, z], [i, j + 1, z]);

function Sol({ lieu, pal, style, N, ax }: { lieu: LieuId; pal: Pal; style: string; N: number; ax: number }) {
  const cases = Array.from({ length: N * N }, (_, k) => ({ i: k % N, j: Math.floor(k / N) }));
  const g = hasard(14);
  if (lieu === "riad") {
    const a = "#EBDDBF", b = "#DAC59A", bord = "#2F6277";
    return (
      <g>
        <polygon points={poly([0, 0], [N, 0], [N, N], [0, N])} fill={bord} />
        {cases.map(({ i, j }) => <polygon key={`${i}-${j}`} points={dalle(i, j)} fill={(i + j) % 2 ? a : b} stroke="#00000010" strokeWidth="0.5" />)}
        {cases.filter(({ i, j }) => i % 2 === 0 && j % 2 === 0).map(({ i, j }) => {
          const cx = i + 1, cy = j + 1, p = Array.from({ length: 16 }, (_, k) => { const t = (k / 16) * Math.PI * 2, r = k % 2 ? 0.34 : 0.7; return [cx + Math.cos(t) * r, cy + Math.sin(t) * r] as [number, number]; });
          return <polygon key={`e${i}${j}`} points={poly(...p)} fill={(i + j) % 4 ? "#2F6277" : "#B65B38"} opacity="0.32" />;
        })}
        <polygon points={`${poly([0, 0], [N, 0], [N, 0.3], [0, 0.3])}`} fill={bord} opacity="0.5" />
      </g>
    );
  }
  if (lieu === "villa") {
    return (
      <g>
        {Array.from({ length: N * 2 }, (_, k) => <polygon key={k} points={poly([k / 2, 0], [(k + 1) / 2, 0], [(k + 1) / 2, N], [k / 2, N])} fill={k % 2 ? "#B98E65" : "#AA7F58"} stroke="#00000012" strokeWidth="0.5" />)}
        {Array.from({ length: Math.floor(N / 2) }, (_, k) => <polygon key={`j${k}`} points={poly([0, k * 2 + 1.2], [N, k * 2 + 1.2], [N, k * 2 + 1.25], [0, k * 2 + 1.25])} fill="#00000018" />)}
      </g>
    );
  }
  if (lieu === "rooftop") {
    return (
      <g>
        {cases.map(({ i, j }) => <polygon key={`${i}-${j}`} points={dalle(i, j)} fill={(i + j) % 2 ? "#E8E1D6" : "#DDD4C6"} stroke="#00000014" strokeWidth="0.6" />)}
        <polygon points={poly([0, N - 1.2], [N, N - 1.2], [N, N], [0, N])} fill="#9A7650" opacity="0.9" />
        {Array.from({ length: Math.ceil(N / 0.84) }, (_, k) => <polygon key={k} points={poly([k * 0.84, N - 1.2], [k * 0.84 + 0.04, N - 1.2], [k * 0.84 + 0.04, N], [k * 0.84, N])} fill="#00000025" />)}
      </g>
    );
  }
  if (lieu === "jardin") {
    return (
      <g>
        <polygon points={poly([0, 0], [N, 0], [N, N], [0, N])} fill="#BBCB8B" />
        {cases.map(({ i, j }) => <polygon key={`${i}-${j}`} points={dalle(i, j)} fill={(i + j) % 2 ? "#B3C583" : "#C0D091"} />)}
        {Array.from({ length: Math.round((34 * N * N) / 144) }, (_, k) => { const gx = g() * (N - 0.4), gy = g() * (N - 0.4); return <ellipse key={k} cx={X(gx, gy)} cy={Y(gx, gy)} rx={5 + g() * 12} ry={2 + g() * 5} fill="#9DB373" opacity="0.4" />; })}
        {Array.from({ length: Math.round((N - 2) / 0.38) - 2 }, (_, k) => <ellipse key={`p${k}`} cx={X(ax - 0.8 + (k % 2 ? 0.3 : -0.3), N - 2 - k * 0.38)} cy={Y(ax - 0.8 + (k % 2 ? 0.3 : -0.3), N - 2 - k * 0.38)} rx="11" ry="5" fill="#E7DCC0" opacity="0.8" />)}
        {Array.from({ length: Math.round((50 * N * N) / 144) }, (_, k) => { const gx = g() * (N - 0.4), gy = g() * (N - 0.4); return <circle key={`f${k}`} cx={X(gx, gy)} cy={Y(gx, gy)} r="1.5" fill={["#FFFFFF", "#F4D774", "#E8A6B0"][k % 3]} opacity="0.85" />; })}
      </g>
    );
  }
  // salle
  return (
    <g>
      {Array.from({ length: N * 2 }, (_, k) => <polygon key={k} points={poly([0, k / 2], [N, k / 2], [N, (k + 1) / 2], [0, (k + 1) / 2])} fill={k % 2 ? "#CCA675" : "#C29A68"} stroke="#00000010" strokeWidth="0.5" />)}
      <polygon points={poly([1.4, 1.4], [N - 1.4, 1.4], [N - 1.4, N - 1.4], [1.4, N - 1.4])} fill={pal.accent} opacity={style === "minimal" ? 0.12 : 0.22} />
      <polygon points={poly([1.4, 1.4], [N - 1.4, 1.4], [N - 1.4, 1.55], [1.4, 1.55])} fill={pal.deco} opacity="0.5" />
    </g>
  );
}

// ── Murs ────────────────────────────────────────────────────────────────────
function Mur({ lieu, cote, pal, nuit, style, N }: { lieu: LieuId; cote: "g" | "d"; pal: Pal; nuit: number; style: string; N: number }) {
  const sens = cote === "g" ? "u" : "d";
  const L = 320, teinte = cote === "g" ? 0.07 : 0;
  const lampe = "#FFD98A";
  // le décor du mur est répété quand la salle s'agrandit (un motif couvre 10 cases)
  const copies = Math.max(1, Math.round(N / 10));
  const Corps = ({ children }: { children: ReactNode }) => (
    <Plan sens={sens} c={0} u={cote === "g" ? N : 0}>
      <g transform={`scale(${N / copies / 10} 1)`}>{Array.from({ length: copies }, (_, i) => <g key={i} transform={`translate(${i * L} 0)`}>{children}</g>)}</g>
    </Plan>
  );
  const ciel = melanger("#F2B58A", "#252a5a", nuit);

  if (lieu === "riad") {
    const sable = assombrir("#E6D1AB", teinte);
    return (
      <Corps>
        <rect width={L} height={H_MUR} fill={sable} />
        {Array.from({ length: 20 }, (_, i) => <rect key={i} x={i * 16} y="0" width="16" height="22" fill={i % 2 ? "#2F6277" : "#EFE6D2"} opacity="0.95" />)}
        <rect y="22" width={L} height="3" fill="#C9A74E" />
        {Array.from({ length: 5 }, (_, i) => {
          const x0 = 12 + i * 61;
          return (
            <g key={i}>
              <path d={cintre(x0, 46, 94, 25)} fill={melanger("#4C3425", "#D9A441", nuit * 0.25)} stroke="#B8913A" strokeWidth="2" />
              <path d={cintre(x0 + 7, 32, 80, 25)} fill={melanger("#6B4A33", "#2a2018", nuit * 0.5)} />
              <circle cx={x0 + 23} cy="52" r="3" fill={lampe} opacity={0.35 + nuit * 0.6} />
              <rect x={x0 + 46} y="25" width="15" height="70" fill={assombrir(sable, 0.06)} />
            </g>
          );
        })}
        <rect y="100" width={L} height="5" fill="#C9A74E" />
        {Array.from({ length: 24 }, (_, i) => <path key={i} d={`M${i * 13.4} 105 l6.7 -0 l0 12 l-6.7 11 l-6.7 -11 z`} fill={i % 2 ? "#2F6277" : "#B65B38"} opacity="0.85" />)}
        {Array.from({ length: 16 }, (_, i) => <rect key={`c${i}`} x={i * 20 + 3} y="124" width="12" height="6" fill={sable} />)}
      </Corps>
    );
  }
  if (lieu === "villa") {
    if (cote === "d") {
      return (
        <Corps>
          <rect width={L} height="30" fill="none" />
          {Array.from({ length: 8 }, (_, i) => <rect key={i} x={i * 40 + 2} y="2" width="36" height="26" fill="#CFE6EE" opacity="0.28" stroke="#fff" strokeWidth="1.4" />)}
          <rect y="0" width={L} height="3" fill="#F2F2EE" /><rect y="28" width={L} height="3" fill="#F2F2EE" />
        </Corps>
      );
    }
    return (
      <Corps>
        <rect width={L} height={H_MUR} fill="#F1EDE4" />
        <rect y={H_MUR - 12} width={L} height="12" fill="#D8D1C2" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={14 + i * 100} y="14" width="92" height="92" fill={`url(#hc-vitre${i})`} stroke="#8c8a84" strokeWidth="2" />
            <line x1={60 + i * 100} y1="14" x2={60 + i * 100} y2="106" stroke="#8c8a84" strokeWidth="2" />
            <polygon points={`${14 + i * 100},106 ${40 + i * 100},14 ${64 + i * 100},14 ${38 + i * 100},106`} fill="#fff" opacity="0.14" />
            <defs><linearGradient id={`hc-vitre${i}`} x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor={melanger("#E6B88A", "#2c3463", nuit)} /><stop offset="1" stopColor={melanger("#8FB6C9", "#171d45", nuit)} /></linearGradient></defs>
          </g>
        ))}
        <rect x="6" y="0" width="308" height="8" fill="#8A6A47" />
        {nuit > 0.3 && [0, 1, 2].map((i) => <rect key={`l${i}`} x={22 + i * 100} y="22" width="76" height="76" fill={lampe} opacity={(nuit - 0.3) * 0.28} />)}
      </Corps>
    );
  }
  if (lieu === "rooftop") {
    return (
      <Corps>
        <rect width={L} height="32" fill={assombrir("#EEE7DA", teinte)} />
        <rect y="30" width={L} height="5" fill="#CDC4B2" />
        {Array.from({ length: 10 }, (_, i) => <rect key={i} x={i * 32 + 2} y="4" width="28" height="22" rx="2" fill="#00000012" />)}
        {Array.from({ length: 6 }, (_, i) => <g key={i}><rect x={i * 56 + 12} y="35" width="26" height="14" rx="3" fill="#6F7F56" /><circle cx={i * 56 + 25} cy="52" r="9" fill="#7C9061" /><circle cx={i * 56 + 20} cy="55" r="6" fill="#8CA06F" /></g>)}
      </Corps>
    );
  }
  if (lieu === "jardin") {
    const haie = assombrir("#6F8F55", teinte);
    const g = hasard(cote === "g" ? 5 : 8);
    return (
      <Corps>
        <rect width={L} height="58" fill={haie} />
        {Array.from({ length: 22 }, (_, i) => <circle key={i} cx={i * 15 + 6} cy={58} r="13" fill={i % 2 ? haie : eclaircir(haie, 0.06)} />)}
        {Array.from({ length: 56 }, (_, i) => <circle key={`f${i}`} cx={g() * L} cy={4 + g() * 58} r={1.8 + g() * 2.2} fill={[pal.fleurs, "#FFFFFF", "#F4D774"][i % 3]} opacity="0.9" />)}
      </Corps>
    );
  }
  // salle
  const mur = assombrir("#F0E6D2", teinte), lambris = assombrir(melanger("#F0E6D2", pal.accent, 0.12), teinte);
  return (
    <Corps>
      <rect width={L} height={H_MUR} fill={mur} />
      <rect width={L} height="34" fill={lambris} />
      {Array.from({ length: 8 }, (_, i) => <rect key={i} x={i * 40 + 5} y="6" width="30" height="22" rx="2" fill="none" stroke="#C9A74E" strokeWidth="1" opacity="0.6" />)}
      <rect y="34" width={L} height="3" fill="#C9A74E" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <path d={cintre(18 + i * 100, 68, 104, 42)} fill={ciel} stroke="#C9A74E" strokeWidth="3" />
          <line x1={52 + i * 100} y1="42" x2={52 + i * 100} y2="130" stroke="#C9A74E" strokeWidth="1.4" /><line x1={18 + i * 100} y1="82" x2={86 + i * 100} y2="82" stroke="#C9A74E" strokeWidth="1.4" />
          <path d={`M${8 + i * 100} 126 L${8 + i * 100} 44 Q${24 + i * 100} 60 ${22 + i * 100} 126 Z`} fill={pal.accent} opacity={style === "minimal" ? 0.5 : 0.9} />
          <path d={`M${98 + i * 100} 126 L${98 + i * 100} 44 Q${82 + i * 100} 60 ${84 + i * 100} 126 Z`} fill={pal.accent} opacity={style === "minimal" ? 0.5 : 0.9} />
        </g>
      ))}
    </Corps>
  );
}

// ── Éléments propres au lieu, devant les murs ───────────────────────────────
function DecorLieu({ lieu, nuit, pal, N }: { lieu: LieuId; nuit: number; pal: Pal; N: number }) {
  if (lieu === "villa") {
    // Bassin derrière la balustrade (côté mur de droite)
    const eau = melanger("#79C2D3", "#1c3a66", nuit);
    return (
      <g>
        <polygon points={poly([-0.2, -0.3], [N + 0.2, -0.3], [N + 0.2, -4.6], [-0.2, -4.6])} fill="#EFEADF" />
        <polygon points={poly([0.1, -0.7], [N - 0.1, -0.7], [N - 0.1, -4.2], [0.1, -4.2])} fill={eau} />
        {Array.from({ length: Math.round(N / 1.7) }, (_, k) => <polygon key={k} points={poly([0.5 + k * 1.4, -1.2 - (k % 3) * 0.9], [1.4 + k * 1.4, -1.2 - (k % 3) * 0.9], [1.5 + k * 1.4, -1.28 - (k % 3) * 0.9], [0.6 + k * 1.4, -1.28 - (k % 3) * 0.9])} fill="#fff" opacity="0.28" />)}
        {[N * 0.12, N * 0.37, N * 0.65].map((u, i) => (
          <g key={i} transform={`translate(${X(u, -3.2)} ${Y(u, -3.2)})`}>
            <path d="M0 0 q4 -30 1 -70" stroke={melanger("#5c4630", "#15131c", nuit)} strokeWidth="4.5" fill="none" />
            {[-120, -80, -40, 0, 40, 80, 120].map((a) => <path key={a} d={`M1 -70 q${Math.sin((a * Math.PI) / 180) * 24} ${-14 - Math.abs(a) / 12} ${Math.sin((a * Math.PI) / 180) * 40} ${Math.abs(a) / 5 + 4}`} stroke={melanger("#4F7A4A", "#10231a", nuit)} strokeWidth="4" strokeLinecap="round" fill="none" />)}
          </g>
        ))}
      </g>
    );
  }
  if (lieu === "jardin") {
    const tronc = "#6B4A33";
    return (
      <g>
        {[[1.2, -0.8, 1.0], [N - 3.4, -1.1, 0.9], [-0.9, N * 0.47, 0.95], [N * 0.6, -1.0, 0.95], [-1.0, N - 2.5, 1.0]].map(([gx, gy, s], i) => (
          <g key={i} transform={`translate(${X(gx, gy)} ${Y(gx, gy)}) scale(${s})`}>
            <rect x="-5" y="-60" width="10" height="60" fill={tronc} />
            {[[-26, -92, 34], [20, -98, 36], [0, -120, 40], [-6, -84, 38]].map(([x, y, r], k) => <circle key={k} cx={x} cy={y} r={r} fill={k % 2 ? "#6E9254" : "#5F8647"} />)}
            {nuit > 0.3 && <circle cx="0" cy="-90" r="42" fill="#0e1830" opacity={nuit * 0.25} />}
          </g>
        ))}
      </g>
    );
  }
  if (lieu === "rooftop") {
    return (
      <g>
        {[[4.5, 1.1], [6.4, 1.1]].map(([gx, gy], i) => (
          <g key={i} transform={`translate(${X(gx, gy)} ${Y(gx, gy)})`}>
            <rect x="-30" y="-6" width="60" height="6" fill={pal.deco} opacity="0.0" />
          </g>
        ))}
      </g>
    );
  }
  return null;
}

// ── Composition ─────────────────────────────────────────────────────────────
interface Halo { x: number; y: number; r: number; a: number; c: "chaud" | "froid" | "rose" | "vert" | "violet" }
interface Entite { z: number; k: string; n: ReactNode }

interface Mobile { id: string; a: [number, number] }

export function SceneSvg({ r, nuit, animer = true, final = null, logos, focus, className, cadrage = "meet", deplacable = false, onDeplacer }: SceneProps) {
  const uid = useId().replace(/:/g, "");
  const pal: Pal = useMemo(() => {
    const p = PALETTES.find((x) => x.id === r.palette) ?? PALETTES[0];
    return { nappe: p.nappe, fleurs: p.fleurs, accent: p.accent, deco: p.deco, sombre: p.sombre };
  }, [r.palette]);
  const style = r.style, o = r.options, lieu = r.lieu;
  const actif = final !== "avant";
  const n = final ? 1 : nuit;
  const assis = final === "assis";
  const N = r.salle.n, ax = r.salle.ax;
  const P = r.salle.pos;
  const halos: Halo[] = [];
  const E: Entite[] = [];

  // ── Déplacement des objets : décalage en cases, appliqué à tout le dessin de l'objet ──
  const svgRef = useRef<SVGSVGElement>(null);
  const [vif, setVif] = useState<{ id: string; off: [number, number] } | null>(null);
  const prise = useRef<{ id: string; a: [number, number]; depart: [number, number]; p0: [number, number]; dernier: [number, number] } | null>(null);
  const dep = (id: string): [number, number] => (vif && vif.id === id ? vif.off : r.deplacements[id] ?? [0, 0]);
  const enveloppe = (id: string, a: [number, number], node: ReactNode) => {
    const [dx, dy] = dep(id);
    return (
      <g data-objet={id} transform={dx || dy ? `translate(${(dx - dy) * 32} ${(dx + dy) * 16})` : undefined} style={deplacable ? { cursor: vif?.id === id ? "grabbing" : "grab" } : undefined}>
        {node}
        {deplacable && <ellipse cx={X(a[0], a[1])} cy={Y(a[0], a[1])} rx="24" ry="12" fill="#F4D774" fillOpacity="0.22" stroke="#F4D774" strokeWidth="1.6" strokeDasharray="5 4" />}
      </g>
    );
  };
  const add = (z: number, k: string, node: ReactNode, mv?: Mobile) => {
    if (!mv) { E.push({ z, k, n: node }); return; }
    const [dx, dy] = dep(mv.id);
    E.push({ z: z + dx + dy, k, n: enveloppe(mv.id, mv.a, node) });
  };
  const decale = (id: string, gx: number, gy: number): [number, number] => { const [dx, dy] = dep(id); return [gx + dx, gy + dy]; };

  const point = (e: PE<SVGSVGElement>): [number, number] | null => {
    const svg = svgRef.current, m = svg?.getScreenCTM();
    if (!svg || !m) return null;
    const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY;
    const q = p.matrixTransform(m.inverse());
    return [q.x, q.y];
  };
  const bas = (e: PE<SVGSVGElement>) => {
    if (!deplacable) return;
    const cible = (e.target as Element).closest?.("[data-objet]") as SVGGElement | null;
    const id = cible?.getAttribute("data-objet");
    const p = point(e);
    if (!id || !p) return;
    const mv = ancres.get(id);
    if (!mv) return;
    e.preventDefault();
    svgRef.current?.setPointerCapture(e.pointerId);
    const depart = dep(id);
    prise.current = { id, a: mv, depart, p0: p, dernier: depart };
    setVif({ id, off: depart });
  };
  const bouge = (e: PE<SVGSVGElement>) => {
    const t = prise.current, p = point(e);
    if (!t || !p) return;
    const sx = p[0] - t.p0[0], sy = p[1] - t.p0[1];
    // projection inverse de l'isométrique 2:1
    let dgx = t.depart[0] + (sx / 32 + sy / 16) / 2, dgy = t.depart[1] + (sy / 16 - sx / 32) / 2;
    dgx = Math.round(dgx * 4) / 4; dgy = Math.round(dgy * 4) / 4;
    // l'objet reste dans la salle
    dgx = Math.max(0.6 - t.a[0], Math.min(N - 0.6 - t.a[0], dgx)); dgy = Math.max(0.6 - t.a[1], Math.min(N - 0.6 - t.a[1], dgy));
    if (dgx !== t.dernier[0] || dgy !== t.dernier[1]) { t.dernier = [dgx, dgy]; setVif({ id: t.id, off: [dgx, dgy] }); }
  };
  const haut = (e: PE<SVGSVGElement>) => {
    const t = prise.current;
    prise.current = null;
    if (!t) return;
    try { svgRef.current?.releasePointerCapture(e.pointerId); } catch { /* déjà relâché */ }
    setVif(null);
    if (t.dernier[0] !== t.depart[0] || t.dernier[1] !== t.depart[1]) onDeplacer?.(t.id, t.dernier[0], t.dernier[1]);
  };
  const ancres = new Map<string, [number, number]>();
  const mob = (id: string, gx: number, gy: number): Mobile => { ancres.set(id, [gx, gy]); return { id, a: [gx, gy] }; };

  // Tables : autant que nécessaire (une pour 10 invités en rondes), la salle s'agrandit pour toutes les contenir
  const tbl = r.salle.tables;
  const nb = Math.max(1, r.tablesTotal);
  const parChaises = r.tables === "rondes" ? Math.max(4, Math.min(10, Math.round(r.invites / nb))) : r.tables === "rectangulaires" ? Math.max(2, Math.min(6, Math.round(r.invites / nb))) : Math.max(2, Math.min(4, Math.round(r.invites / nb)));
  const fleursTable = o.has("fleurs") || style === "romantique";
  tbl.forEach(([gx, gy], i) => {
    const c = { pal, fleurs: fleursTable, bougies: r.lumiere === "bougies", retard: i * 0.4, animer };
    const node = r.tables === "rondes" ? <TableRonde gx={gx} gy={gy} r={RAYON_TABLE} nbChaises={parChaises} invites={assis ? parChaises : 0} {...c} />
      : r.tables === "rectangulaires" ? <TableRect gx={gx} gy={gy} nbChaises={parChaises} invites={assis ? parChaises : 0} {...c} />
      : <TableHaute gx={gx} gy={gy} invites={assis ? parChaises : 0} {...c} />;
    add(gx + gy, `t${i}`, node, mob(`t${i}`, gx, gy));
    if (r.lumiere === "bougies") { const [hx, hy] = decale(`t${i}`, gx, gy); halos.push({ x: X(hx, hy), y: Y(hx, hy, r.tables === "hautes" ? 54 : 30), r: 34, a: 0.55, c: "chaud" }); }
  });

  // Honneur / écran / arche (pas de table d'honneur quand tout le monde est autour de tables hautes)
  if (r.type !== "pro") {
    if (r.tables !== "hautes") { const H = P.HONNEUR; add(H.gx + H.gy + 2, "honneur", <TableHonneur gx={H.gx} gy={H.gy} w={H.w} d={H.d} pal={pal} fleurs={fleursTable} couple={assis && r.type === "mariage"} type={r.type} animer={animer} />, mob("honneur", H.gx + H.w / 2, H.gy + H.d / 2)); }
  } else {
    add(2.4, "ecran", (
      <Plan sens="d" c={0.1} u={1.3} z0={14}>
        <rect width="150" height="82" rx="4" fill="#1d1b22" stroke={pal.deco} strokeWidth="3" />
        <rect x="6" y="6" width="138" height="70" rx="2" fill={melanger(pal.accent, "#1d1b22", 0.55)} />
        <rect x="18" y="52" width="70" height="6" rx="2" fill={pal.nappe} opacity="0.9" /><rect x="18" y="38" width="104" height="9" rx="2" fill="#fff" opacity="0.92" />
      </Plan>
    ));
  }
  const AR = P.ARCHE, MF = P.MUR_FLEURS;
  if (o.has("arche")) add(AR.gx + AR.gy + 0.8, "arche", <Arche gx={AR.gx} gy={AR.gy} largeur={AR.largeur} pal={pal} />, mob("arche", AR.gx + AR.largeur / 2, AR.gy + 0.5));
  if (o.has("amariya")) { const [x, y] = P.AMARIYA; add(x + y + 1.2, "amariya", <Amariya gx={x} gy={y} pal={pal} animer={animer} />, mob("amariya", x + 1.15, y + 0.7)); }
  if (o.has("fauteuils")) { const [x, y] = P.FAUTEUILS; add(x + y + 1, "fauteuils", <FauteuilsMaries gx={x} gy={y} pal={pal} couple={assis && r.type === "mariage"} animer={animer} />, mob("fauteuils", x + 1, y + 0.6)); }
  if (o.has("neggafa")) { const [x, y] = P.NEGGAFA; add(x + y + 0.3, "neggafa", <Neggafa gx={x} gy={y} pal={pal} animer={animer} />, mob("neggafa", x, y)); }
  if (o.has("gateau")) { const [x, y] = P.GATEAU; add(x + y + 0.3, "gateau", <PieceMontee gx={x} gy={y} pal={pal} />, mob("gateau", x, y)); }
  if (o.has("henne")) { const [x, y] = P.HENNE; add(x + y + 1, "henne", <EspaceHenne gx={x} gy={y} pal={pal} />, mob("henne", x + 1.1, y + 1.1)); }
  if (o.has("mur_fleurs")) add(MF.u0 + 0.3, "mur", <MurFleurs u0={MF.u0} u1={MF.u1} gy={MF.gy} pal={pal} />);

  // Musique
  const musiqueActive = actif && (final ? true : animer);
  if (r.musiques.includes("dj")) { const dj = P.DJ; add(dj.gx + dj.gy + 1, "dj", <Dj gx={dj.gx} gy={dj.gy} w={dj.w} d={dj.d} pal={pal} actif={musiqueActive} />, mob("dj", dj.gx + dj.w / 2, dj.gy + dj.d / 2)); }
  if (r.musiques.includes("orchestre")) { const so = P.SCENE_ORCHESTRE; add(so.gx + so.gy + 1, "orch", <Orchestre gx={so.gx} gy={so.gy} w={so.w} d={so.d} pal={pal} actif={musiqueActive} />, mob("orch", so.gx + so.w / 2, so.gy + so.d / 2)); }
  if (r.musiques.includes("troupe")) { const [tx, ty] = P.TROUPE; add(tx + ty, "troupe", <Troupe gx={tx} gy={ty} pal={pal} actif={musiqueActive} />, mob("troupe", tx + 0.5, ty + 0.5)); }
  if (r.musiques.includes("playlist")) add(6, "enceintes", <EnceintesAmbiance pal={pal} actif={musiqueActive} pos={P.ENCEINTES} />, mob("enceintes", (P.ENCEINTES[0][0] + P.ENCEINTES[1][0]) / 2, 0.75));
  if (r.musiques.includes("acoustique")) { const [qx, qy] = P.ACOUSTIQUE; add(qx + qy, "acoustique", <Acoustique gx={qx} gy={qy} pal={pal} actif={musiqueActive} />, mob("acoustique", qx + 0.5, qy + 0.5)); }

  // Expériences
  const PB = P.PHOTOBOOTH, NA = P.NAWAR, BU = P.BUFFET, CA = P.CANDY, TH = P.THE_BAR, SA = P.SALON, CO = P.COMPTOIR;
  if (o.has("photobooth")) add(PB.gx + PB.gy + 1, "photobooth", <Photobooth gx={PB.gx} gy={PB.gy} w={PB.w} d={PB.d} pal={pal} flash={animer && actif} />, mob("photobooth", PB.gx + PB.w / 2, PB.gy + PB.d / 2));
  if (o.has("nawar")) {
    add(NA.gx + NA.gy + 1, "nawar", <BarParfums gx={NA.gx} gy={NA.gy} w={NA.w} d={NA.d} pal={pal} logo={logos?.nawar} brume={o.has("brume")} />, mob("nawar", NA.gx + NA.w / 2, NA.gy + NA.d / 2));
    const [hx, hy] = decale("nawar", NA.gx + 0.6, NA.gy + 1.1);
    halos.push({ x: X(hx, hy), y: Y(hx, hy, 40), r: 46, a: 0.45, c: "chaud" });
  }
  if (o.has("buffet")) add(BU.gx + BU.gy + 1, "buffet", <Buffet gx={BU.gx} gy={BU.gy} w={BU.w} d={BU.d} pal={pal} />, mob("buffet", BU.gx + BU.w / 2, BU.gy + BU.d / 2));
  if (o.has("candy_bar")) add(CA.gx + CA.gy + 0.5, "candy", <Bar gx={CA.gx} gy={CA.gy} w={CA.w} d={CA.d} pal={pal} couleurs={["#E8A6B0", "#F4D774", "#9DD3C8", "#C9A0DC"]} />, mob("candy", CA.gx + CA.w / 2, CA.gy + CA.d / 2));
  if (o.has("the_bar")) add(TH.gx + TH.gy + 1, "the", <BarreThe gx={TH.gx} gy={TH.gy} w={TH.w} d={TH.d} pal={pal} animer={animer} />, mob("the", TH.gx + TH.w / 2, TH.gy + TH.d / 2));
  if (o.has("livre_dor")) add(P.LIVRE_DOR[0] + P.LIVRE_DOR[1], "livre", <LivreDor gx={P.LIVRE_DOR[0]} gy={P.LIVRE_DOR[1]} pal={pal} />, mob("livre", P.LIVRE_DOR[0], P.LIVRE_DOR[1]));
  if (o.has("salon")) add(SA.gx + SA.gy + 1, "salon", <SalonMarocain gx={SA.gx} gy={SA.gy} w={SA.w} d={SA.d} pal={pal} />, mob("salon", SA.gx + SA.w / 2, SA.gy + SA.d / 2));
  if (o.has("fontaine")) add(P.FONTAINE[0] + P.FONTAINE[1], "fontaine", <Fontaine gx={P.FONTAINE[0]} gy={P.FONTAINE[1]} pal={pal} animer={animer} />, mob("fontaine", P.FONTAINE[0], P.FONTAINE[1]));
  if (o.has("photographe")) add(P.PHOTOGRAPHE[0] + P.PHOTOGRAPHE[1], "photographe", <Photographe gx={P.PHOTOGRAPHE[0]} gy={P.PHOTOGRAPHE[1]} />, mob("photographe", P.PHOTOGRAPHE[0], P.PHOTOGRAPHE[1]));
  if (o.has("feux_froids")) P.FEUX.forEach(([gx, gy], i) => add(gx + gy, `feu${i}`, <FeuxFroids gx={gx} gy={gy} actif={animer && actif} />));
  if (o.has("fleurs")) P.BOUQUETS.forEach(([gx, gy], i) => add(gx + gy, `bq${i}`, <Bouquet gx={gx} gy={gy} pal={pal} grand />));

  // Accueil
  if (r.accueils.includes("hotesses") || r.accueils.includes("maitre_hotel")) {
    P.HOTESSES.forEach(([gx, gy], i) => add(gx + gy + 0.2, `h${i}`, <Personne x={X(gx, gy)} y={Y(gx, gy)} robe corps={pal.sombre ? pal.nappe : "#2d2a30"} echarpe={pal.deco} peau={peauDe(i + 1)} cheveux={cheveuxDe(i)} s={1.15} bob={animer} retard={i * 0.5} />));
  }
  if (r.accueils.includes("maitre_hotel")) {
    const [mx, my] = P.MAITRE_HOTEL, [hx, hy] = P.HOTESSE_3;
    add(mx + my, "maitre", <Personne x={X(mx, my)} y={Y(mx, my)} corps="#1f1d22" echarpe={pal.deco} peau={peauDe(3)} cheveux={cheveuxDe(2)} s={1.18} bob={animer} />);
    add(hx + hy, "h3", <Personne x={X(hx, hy)} y={Y(hx, hy)} robe corps={pal.sombre ? pal.nappe : "#2d2a30"} echarpe={pal.deco} peau={peauDe(0)} s={1.15} bob={animer} retard={0.9} />);
  }
  if (r.accueils.includes("the")) add(CO[0] + CO[1], "comptoir", <Comptoir gx={CO[0]} gy={CO[1]} pal={pal} the />);
  if (r.accueils.includes("discret") && !r.accueils.includes("the")) add(CO[0] + CO[1], "comptoir", <Comptoir gx={CO[0]} gy={CO[1]} pal={pal} />);

  // Lumière
  if (r.lumiere === "chaleureuse") P.POSTES_LANTERNES.forEach(([gx, gy], i) => { add(gx + gy, `pl${i}`, <PosteLanterne gx={gx} gy={gy} pal={pal} anime={animer} />); halos.push({ x: X(gx, gy), y: Y(gx, gy, 78), r: 62, a: 0.7, c: "chaud" }); });
  if (r.lumiere === "bougies") P.CANDELABRES.forEach(([gx, gy], i) => { add(gx + gy, `cd${i}`, <Candelabre gx={gx} gy={gy} pal={pal} anime={animer} />); halos.push({ x: X(gx, gy), y: Y(gx, gy, 62), r: 50, a: 0.6, c: "chaud" }); });
  if (o.has("allee")) add(P.ALLEE.gx + P.ALLEE.gy - 0.2, "allee", <Allee gx={P.ALLEE.gx} gy={P.ALLEE.gy} w={P.ALLEE.w} d={P.ALLEE.d} pal={pal} />);

  // Invités qui arrivent (on en montre une vingtaine : assez pour l'ambiance, sans alourdir l'image)
  if (final) {
    const g = hasard(31), cibles = tbl.length ? tbl : [[ax, N / 2] as [number, number]];
    const total = Math.min(40, 14 + Math.round(tbl.length / 2));
    for (let i = 0; i < total; i++) {
      const [tx, ty] = cibles[i % cibles.length];
      const a = g() * Math.PI * 2, cx = tx + Math.cos(a) * 1.5, cy = ty + Math.sin(a) * 1.3 + 0.2;
      const px = Math.min(N - 0.6, Math.max(0.8, cx)), py = Math.min(N - 0.5, Math.max(1.2, cy));
      const dx = X(P.DEPART_INVITES[0], P.DEPART_INVITES[1]) - X(px, py), dy = Y(P.DEPART_INVITES[0], P.DEPART_INVITES[1]) - Y(px, py);
      const dehors = final === "avant";
      E.push({
        z: px + py + 0.3, k: `inv${i}`,
        n: (
          <g className="hc-arrive" style={{ transform: dehors ? `translate(${dx}px ${dy}px)` : "translate(0px 0px)", opacity: dehors ? 0 : 1, transitionDelay: `${(i % 11) * 0.22}s`, ["--duree" as string]: `${2.3 + (i % 5) * 0.3}s` }}>
            <Personne x={X(px, py)} y={Y(px, py)} robe={i % 2 === 0} corps={i % 3 === 0 ? pal.accent : i % 3 === 1 ? "#3d352e" : pal.deco} peau={peauDe(i)} cheveux={cheveuxDe(i)} s={1.05} bob={animer && !dehors} retard={(i % 7) * 0.3} />
          </g>
        ),
      });
    }
  }

  const trie = E.sort((a, b) => a.z - b.z);
  const f = focus ? P.ANCRES[focus.cle as keyof typeof P.ANCRES] : null;
  const festif = r.lumiere === "festive";
  const couleurHalo = { chaud: "url(#hc-h-chaud-" + uid + ")", froid: "url(#hc-h-froid-" + uid + ")", rose: "url(#hc-h-rose-" + uid + ")", vert: "url(#hc-h-vert-" + uid + ")", violet: "url(#hc-h-violet-" + uid + ")" };
  const intensite = 0.25 + 0.75 * n;
  const aria = tr("Scène « {titre} » : {nb} tables environ pour {n} invités, ambiance {style}.", { titre: r.titre, nb: r.tablesTotal, n: r.invites, style: STYLES.find((s) => s.id === style)?.nom.toLowerCase() ?? "" });
  const larg = 64 * N + 12, haute = 32 * N + 206;
  const PI = P.PISTE;
  const cordes: [[number, number], [number, number]][] = [[[0.3, N - 0.5], [0.3, 0.3]], [[0.3, 0.3], [N - 0.4, 0.3]], [[0.3, N / 2 + 0.1], [N - 0.4, N / 2 + 0.1]], [[ax - 0.9, N - 0.2], [N - 0.4, N / 2 + 0.1]]];
  const poteaux: [number, number][] = [[0.3, N - 0.5], [0.3, 0.3], [N - 0.4, 0.3], [0.3, N / 2 + 0.1], [N - 0.4, N / 2 + 0.1]];

  return (
    <svg
      ref={svgRef} viewBox={`${400 - larg / 2} 20 ${larg} ${haute}`} role="img" aria-label={aria} className={className}
      onPointerDown={bas} onPointerMove={bouge} onPointerUp={haut} onPointerCancel={haut}
      preserveAspectRatio={cadrage === "slice" ? "xMidYMid slice" : "xMidYMid meet"}
      style={{ direction: "ltr", display: "block", width: "100%", height: "100%", overflow: "visible", touchAction: deplacable ? "none" : undefined, userSelect: deplacable ? "none" : undefined }}
    >
      {animer && <style>{STYLE_CSS}</style>}
      <defs>
        {([["chaud", "#FFD58A"], ["froid", "#BFE3FF"], ["rose", "#FF9FC4"], ["vert", "#9FFFD0"], ["violet", "#C8A6FF"]] as const).map(([k, c]) => (
          <radialGradient key={k} id={`hc-h-${k}-${uid}`}><stop offset="0" stopColor={c} stopOpacity="0.95" /><stop offset="0.45" stopColor={c} stopOpacity="0.35" /><stop offset="1" stopColor={c} stopOpacity="0" /></radialGradient>
        ))}
      </defs>
      <Ciel nuit={n} lieu={lieu} animer={animer} />
      <Terrain lieu={lieu} nuit={n} N={N} />
      <DecorLieu lieu={lieu} nuit={n} pal={pal} N={N} />
      <Mur lieu={lieu} cote="g" pal={pal} nuit={n} style={style} N={N} />
      <Mur lieu={lieu} cote="d" pal={pal} nuit={n} style={style} N={N} />
      <Sol lieu={lieu} pal={pal} style={style} N={N} ax={ax} />
      {style === "maroc" && lieu !== "riad" && <polygon points={poly([0, 0], [N, 0], [N, 0.25], [0, 0.25])} fill="#2F6277" opacity="0.5" />}
      {o.has("piste") && enveloppe("piste", mob("piste", PI.gx + PI.w / 2, PI.gy + PI.d / 2).a, <PisteDanse gx={PI.gx} gy={PI.gy} w={PI.w} d={PI.d} pal={pal} actif={animer && actif} festif={festif} />)}
      <g>{trie.map((e) => <g key={e.k}>{e.n}</g>)}</g>
      <g pointerEvents="none"><Porte pal={pal} nuit={n} logo={logos?.heavent} porte={P.PORTE} /></g>
      {lieu === "salle" && (
        <g pointerEvents="none">
          {[ax - 0.6, N - 5.2].flatMap((gx) => (N >= 18 ? [4.6, N / 2 + 3.2] : [4.6]).map((gy) => [gx, gy] as [number, number])).map(([gx, gy], i) => (
            <g key={i} transform={`translate(${X(gx, gy)} ${Y(gx, gy, 150)})`}>
              <line x1="0" y1="-50" x2="0" y2="0" stroke="#C9A74E" strokeWidth="1.4" />
              {[-22, -11, 0, 11, 22].map((dx, k) => <g key={k}><path d={`M${dx - 4} 0 L${dx + 4} 0 L${dx + 2} 10 L${dx - 2} 10 Z`} fill="#E8D49A" /><circle cx={dx} cy="-2" r="2.2" fill="#FFE9A8" opacity={0.5 + n * 0.5} /></g>)}
              <ellipse cx="0" cy="0" rx="28" ry="6" fill="none" stroke="#C9A74E" strokeWidth="2" />
            </g>
          ))}
        </g>
      )}
      {/* Guirlandes étoilées */}
      {r.lumiere === "etoilee" && (
        <g pointerEvents="none">
          {cordes.map(([[ax2, ay], [bx, by]], i) => {
            const x1 = X(ax2, ay), y1 = Y(ax2, ay, 116), x2 = X(bx, by), y2 = Y(bx, by, 116), cx = (x1 + x2) / 2, cy = (y1 + y2) / 2 + 26;
            const nbp = Math.round(1.2 * N + 0.4);
            const pts = Array.from({ length: nbp }, (_, k) => { const t = (k + 0.5) / nbp; return { x: (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2, y: (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2 }; });
            return (
              <g key={i}>
                <path d={`M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`} stroke="#3a3128" strokeWidth="1" fill="none" opacity="0.7" />
                {pts.map((p, k) => <g key={k}><circle cx={p.x} cy={p.y + 3} r="9" fill={couleurHalo.chaud} opacity={intensite * 0.8} /><circle cx={p.x} cy={p.y + 3} r="2.4" fill="#FFE9A8" className={animer ? "hc-scintille" : undefined} style={{ animationDelay: `${(k % 5) * 0.4}s` }} /></g>)}
              </g>
            );
          })}
          {poteaux.map(([gx, gy], i) => <rect key={i} x={X(gx, gy) - 1.6} y={Y(gx, gy, 116)} width="3.2" height="116" fill="#3a3128" opacity="0.8" />)}
        </g>
      )}
      <rect x={-2400} y={-2400} width={VB.w + 4800 + larg} height={VB.h + 5000 + haute} fill="#10163f" opacity={0.4 * n} style={{ transition: "opacity 1.8s ease" }} pointerEvents="none" />
      {/* Halos de lumière (au-dessus de la pénombre) */}
      <g opacity={intensite} style={{ transition: "opacity 1.8s ease" }} pointerEvents="none">
        {halos.map((h, i) => <circle key={i} cx={h.x} cy={h.y} r={h.r * 1.5} fill={couleurHalo[h.c]} opacity={h.a} className={animer ? "hc-scintille" : undefined} style={{ animationDelay: `${(i % 5) * 0.5}s` }} />)}
        {r.lumiere === "chaleureuse" && <rect x={-2400} y={-2400} width={VB.w + 4800 + larg} height={VB.h + 5000 + haute} fill="#FFB357" opacity={0.06 + 0.1 * n} />}
        {festif && [["rose", 300, 230], ["violet", 500, 210], ["vert", 400, 280], ["froid", 580, 300]].map(([c, x, y], i) => {
          const px = Number(x) + (i % 2 ? 1 : -1) * (N - 12) * 20, py = Number(y) + (N - 12) * 12;
          return (
            <g key={i} className={animer ? "hc-onde" : undefined} style={{ animationDelay: `${i * 0.6}s` }}>
              <polygon points={`${px - 6},40 ${px + 6},40 ${px + 70},${py + 70} ${px - 70},${py + 70}`} fill={couleurHalo[c as "rose"]} opacity="0.35" />
              <circle cx={px} cy={40} r="5" fill="#fff" />
            </g>
          );
        })}
      </g>
      <g pointerEvents="none">
        {o.has("brume") && <Brume />}
        {o.has("ciel_lanternes") && <CielLanternes />}
        {o.has("petales") && <Petales pal={pal} />}
        {f && focus && (
          <g key={focus.n} className="hc-halo" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
            <ellipse cx={X(f[0], f[1])} cy={Y(f[0], f[1], 18)} rx="74" ry="46" fill="none" stroke="#F4D774" strokeWidth="3" />
            <ellipse cx={X(f[0], f[1])} cy={Y(f[0], f[1], 18)} rx="52" ry="30" fill="#F4D774" opacity="0.22" />
          </g>
        )}
      </g>
    </svg>
  );
}
