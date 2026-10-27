/**
 * La scène : un petit diorama isométrique dessiné en calques SVG.
 * Elle ne contient AUCUNE règle de jeu : elle dessine ce que l'état lui donne (voir etat.ts → rendu()).
 */
import { useId, useMemo, type ReactNode } from "react";
import { PALETTES, STYLES, type LieuId } from "./donnees";
import type { Rendu } from "./etat";
import { N, VB, X, Y, poly, melanger, assombrir, eclaircir, hasard } from "./iso";
import {
  Acoustique, Allee, Arche, Bar, BarParfums, BarreThe, Boite, Bouquet, Brume, Buffet, Candelabre, CielLanternes, Comptoir, Dj, EnceintesAmbiance, FeuxFroids, Fontaine,
  LivreDor, MurFleurs, Orchestre, Personne, Petales, Photobooth, Photographe, PisteDanse, Plan, PosteLanterne, Porte, SalonMarocain, STYLE_CSS, TableHonneur, TableRonde,
  Troupe, cheveuxDe, cintre, peauDe, type Pal,
} from "./dessins";
import {
  ALLEE, ANCRES, ARCHE, BOUQUETS, BUFFET, CANDELABRES, CANDY, COMPTOIR, DEPART_INVITES, DJ, FEUX, FONTAINE, HONNEUR, HOTESSES, LIVRE_DOR, MUR_FLEURS, NAWAR,
  PHOTOBOOTH, PHOTOGRAPHE, PISTE, RAYON_TABLE, DJ_AVEC_ORCHESTRE, POSTES_LANTERNES, SALON, SCENE_ORCHESTRE, TABLES, THE_BAR,
} from "./positions";

export type EtapeFinal = null | "avant" | "arrive" | "assis";
export interface SceneProps {
  r: Rendu; nuit: number; animer?: boolean; final?: EtapeFinal; logos?: { nawar?: string; heavent?: string };
  focus?: { cle: string; n: number } | null; compact?: boolean; className?: string; cadrage?: "meet" | "slice";
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
function Terrain({ lieu, nuit }: { lieu: LieuId; nuit: number }) {
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
      <defs><linearGradient id={`hc-terre-${lieu}`} gradientUnits="userSpaceOnUse" x1="0" y1="322" x2="0" y2="640"><stop offset="0" stopColor={melanger(a, sombre, nuit * 0.55)} /><stop offset="1" stopColor={melanger(b, sombre, nuit * 0.6)} /></linearGradient></defs>
      <path d={`M-2000 322 L0 330 Q200 308 400 322 T800 318 L2600 322 L2600 2400 L-2000 2400 Z`} fill={`url(#hc-terre-${lieu})`} />
      {lieu === "rooftop" && Array.from({ length: 120 }, (_, i) => <circle key={i} cx={-500 + g() * 1800} cy={420 + g() * 300} r={1 + g() * 2.4} fill={["#FFD98A", "#FFB86B", "#9FD2FF"][i % 3]} opacity={0.35 + nuit * 0.5} />)}
      {lieu !== "rooftop" && Array.from({ length: 50 }, (_, i) => <ellipse key={i} cx={-500 + g() * 1800} cy={430 + g() * 300} rx={10 + g() * 28} ry={3 + g() * 7} fill={melanger(a, sombre, 0.18)} opacity="0.35" />)}
      <polygon points={poly([0, N, 0], [N, N, 0], [N, N, -20], [0, N, -20])} fill={melanger(gau, sombre, nuit * 0.5)} />
      <polygon points={poly([N, 0, 0], [N, N, 0], [N, N, -20], [N, 0, -20])} fill={melanger(dro, sombre, nuit * 0.55)} />
      <polygon points={poly([0, N, -17], [N, N, -17], [N, N, -20], [0, N, -20])} fill="#00000030" />
      <polygon points={poly([N, 0, -17], [N, N, -17], [N, N, -20], [N, 0, -20])} fill="#00000040" />
      <ellipse cx="400" cy={Y(N, N, -20) + 18} rx="340" ry="16" fill="#2b1a10" opacity="0.18" />
    </g>
  );
}

// ── Sols ────────────────────────────────────────────────────────────────────
const dalle = (i: number, j: number, z = 0) => poly([i, j, z], [i + 1, j, z], [i + 1, j + 1, z], [i, j + 1, z]);

function Sol({ lieu, pal, style }: { lieu: LieuId; pal: Pal; style: string }) {
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
        {Array.from({ length: 6 }, (_, k) => <polygon key={`j${k}`} points={poly([0, k * 2 + 1.2], [N, k * 2 + 1.2], [N, k * 2 + 1.25], [0, k * 2 + 1.25])} fill="#00000018" />)}
      </g>
    );
  }
  if (lieu === "rooftop") {
    return (
      <g>
        {cases.map(({ i, j }) => <polygon key={`${i}-${j}`} points={dalle(i, j)} fill={(i + j) % 2 ? "#E8E1D6" : "#DDD4C6"} stroke="#00000014" strokeWidth="0.6" />)}
        <polygon points={poly([0, N - 1.2], [N, N - 1.2], [N, N], [0, N])} fill="#9A7650" opacity="0.9" />
        {Array.from({ length: 15 }, (_, k) => <polygon key={k} points={poly([k * 0.84, N - 1.2], [k * 0.84 + 0.04, N - 1.2], [k * 0.84 + 0.04, N], [k * 0.84, N])} fill="#00000025" />)}
      </g>
    );
  }
  if (lieu === "jardin") {
    return (
      <g>
        <polygon points={poly([0, 0], [N, 0], [N, N], [0, N])} fill="#BBCB8B" />
        {cases.map(({ i, j }) => <polygon key={`${i}-${j}`} points={dalle(i, j)} fill={(i + j) % 2 ? "#B3C583" : "#C0D091"} />)}
        {Array.from({ length: 34 }, (_, k) => { const gx = g() * (N - 0.4), gy = g() * (N - 0.4); return <ellipse key={k} cx={X(gx, gy)} cy={Y(gx, gy)} rx={5 + g() * 12} ry={2 + g() * 5} fill="#9DB373" opacity="0.4" />; })}
        {Array.from({ length: 16 }, (_, k) => <ellipse key={`p${k}`} cx={X(3.1 + (k % 2 ? 0.3 : -0.3), 10 - k * 0.38)} cy={Y(3.1 + (k % 2 ? 0.3 : -0.3), 10 - k * 0.38)} rx="11" ry="5" fill="#E7DCC0" opacity="0.8" />)}
        {Array.from({ length: 50 }, (_, k) => { const gx = g() * (N - 0.4), gy = g() * (N - 0.4); return <circle key={`f${k}`} cx={X(gx, gy)} cy={Y(gx, gy)} r="1.5" fill={["#FFFFFF", "#F4D774", "#E8A6B0"][k % 3]} opacity="0.85" />; })}
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
function Mur({ lieu, cote, pal, nuit, style }: { lieu: LieuId; cote: "g" | "d"; pal: Pal; nuit: number; style: string }) {
  const sens = cote === "g" ? "u" : "d";
  const L = 320, teinte = cote === "g" ? 0.07 : 0;
  const lampe = "#FFD98A";
  const Corps = ({ children }: { children: ReactNode }) => <Plan sens={sens} c={0} u={cote === "g" ? N : 0}><g transform={`scale(${N / 10} 1)`}>{children}</g></Plan>;
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
function DecorLieu({ lieu, nuit, pal }: { lieu: LieuId; nuit: number; pal: Pal }) {
  if (lieu === "villa") {
    // Bassin derrière la balustrade (côté mur de droite)
    const eau = melanger("#79C2D3", "#1c3a66", nuit);
    return (
      <g>
        <polygon points={poly([-0.2, -0.3], [N + 0.2, -0.3], [N + 0.2, -4.6], [-0.2, -4.6])} fill="#EFEADF" />
        <polygon points={poly([0.1, -0.7], [N - 0.1, -0.7], [N - 0.1, -4.2], [0.1, -4.2])} fill={eau} />
        {Array.from({ length: 7 }, (_, k) => <polygon key={k} points={poly([0.5 + k * 1.4, -1.2 - (k % 3) * 0.9], [1.4 + k * 1.4, -1.2 - (k % 3) * 0.9], [1.5 + k * 1.4, -1.28 - (k % 3) * 0.9], [0.6 + k * 1.4, -1.28 - (k % 3) * 0.9])} fill="#fff" opacity="0.28" />)}
        {[1.5, 4.4, 7.8].map((u, i) => (
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
        {[[1.2, -0.8, 1.0], [8.6, -1.1, 0.9], [-0.9, 5.6, 0.95]].map(([gx, gy, s], i) => (
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

export function SceneSvg({ r, nuit, animer = true, final = null, logos, focus, className, cadrage = "meet" }: SceneProps) {
  const uid = useId().replace(/:/g, "");
  const pal: Pal = useMemo(() => {
    const p = PALETTES.find((x) => x.id === r.palette) ?? PALETTES[0];
    return { nappe: p.nappe, fleurs: p.fleurs, accent: p.accent, deco: p.deco, sombre: p.sombre };
  }, [r.palette]);
  const style = r.style, o = r.options, lieu = r.lieu;
  const actif = final !== "avant";
  const n = final ? 1 : nuit;
  const assis = final === "assis";
  const halos: Halo[] = [];
  const E: Entite[] = [];
  const add = (z: number, k: string, node: ReactNode) => E.push({ z, k, n: node });

  // Tables
  const tbl = TABLES.slice(0, r.tablesVisibles);
  // autant de chaises que d'invités par table (120 invités / 12 tables = 10), entre 4 et 10
  const parChaises = Math.max(4, Math.min(10, Math.round(r.invites / r.tablesTotal)));
  tbl.forEach(([gx, gy], i) => {
    add(gx + gy, `t${i}`, <TableRonde gx={gx} gy={gy} r={RAYON_TABLE} nbChaises={parChaises} pal={pal} fleurs={o.has("fleurs") || style === "romantique"} bougies={r.lumiere === "bougies"} invites={assis ? parChaises : 0} retard={i * 0.4} animer={animer} />);
    if (r.lumiere === "bougies") halos.push({ x: X(gx, gy), y: Y(gx, gy, 30), r: 34, a: 0.55, c: "chaud" });
  });

  // Honneur / écran / arche
  if (r.type !== "pro") add(HONNEUR.gx + HONNEUR.gy + 2, "honneur", <TableHonneur gx={HONNEUR.gx} gy={HONNEUR.gy} w={HONNEUR.w} d={HONNEUR.d} pal={pal} fleurs={o.has("fleurs") || style === "romantique"} couple={assis && r.type === "mariage"} type={r.type} animer={animer} />);
  else {
    add(2.4, "ecran", (
      <Plan sens="d" c={0.1} u={1.3} z0={14}>
        <rect width="150" height="82" rx="4" fill="#1d1b22" stroke={pal.deco} strokeWidth="3" />
        <rect x="6" y="6" width="138" height="70" rx="2" fill={melanger(pal.accent, "#1d1b22", 0.55)} />
        <rect x="18" y="52" width="70" height="6" rx="2" fill={pal.nappe} opacity="0.9" /><rect x="18" y="38" width="104" height="9" rx="2" fill="#fff" opacity="0.92" />
      </Plan>
    ));
  }
  if (o.has("arche")) add(ARCHE.gx + ARCHE.gy + 0.8, "arche", <Arche gx={ARCHE.gx} gy={ARCHE.gy} largeur={ARCHE.largeur} pal={pal} />);
  if (o.has("mur_fleurs")) add(MUR_FLEURS.u0 + 0.3, "mur", <MurFleurs u0={MUR_FLEURS.u0} u1={MUR_FLEURS.u1} gy={MUR_FLEURS.gy} pal={pal} />);

  // Musique
  const musiqueActive = actif && (final ? true : animer);
  if (r.musiques.includes("dj")) { const dj = r.musiques.includes("orchestre") ? DJ_AVEC_ORCHESTRE : DJ; add(dj.gx + dj.gy + 1, "dj", <Dj gx={dj.gx} gy={dj.gy} w={dj.w} d={dj.d} pal={pal} actif={musiqueActive} />); }
  if (r.musiques.includes("orchestre")) add(SCENE_ORCHESTRE.gx + SCENE_ORCHESTRE.gy + 1, "orch", <Orchestre gx={SCENE_ORCHESTRE.gx} gy={SCENE_ORCHESTRE.gy} w={SCENE_ORCHESTRE.w} d={SCENE_ORCHESTRE.d} pal={pal} actif={musiqueActive} />);
  if (r.musiques.includes("troupe")) add(7.4 + 3.4, "troupe", <Troupe gx={7.4} gy={3.4} pal={pal} actif={musiqueActive} />);
  if (r.musiques.includes("playlist")) add(6, "enceintes", <EnceintesAmbiance pal={pal} actif={musiqueActive} />);
  if (r.musiques.includes("acoustique")) add(8.8, "acoustique", <Acoustique gx={7.6} gy={1.3} pal={pal} actif={musiqueActive} />);

  // Expériences
  if (o.has("photobooth")) add(PHOTOBOOTH.gx + PHOTOBOOTH.gy + 1, "photobooth", <Photobooth gx={PHOTOBOOTH.gx} gy={PHOTOBOOTH.gy} w={PHOTOBOOTH.w} d={PHOTOBOOTH.d} pal={pal} flash={animer && actif} />);
  if (o.has("nawar")) {
    add(NAWAR.gx + NAWAR.gy + 1, "nawar", <BarParfums gx={NAWAR.gx} gy={NAWAR.gy} w={NAWAR.w} d={NAWAR.d} pal={pal} logo={logos?.nawar} brume={o.has("brume")} />);
    halos.push({ x: X(NAWAR.gx + 0.6, NAWAR.gy + 1.1), y: Y(NAWAR.gx + 0.6, NAWAR.gy + 1.1, 40), r: 46, a: 0.45, c: "chaud" });
  }
  if (o.has("buffet")) add(BUFFET.gx + BUFFET.gy + 1, "buffet", <Buffet gx={BUFFET.gx} gy={BUFFET.gy} w={BUFFET.w} d={BUFFET.d} pal={pal} />);
  if (o.has("candy_bar")) add(CANDY.gx + CANDY.gy + 0.5, "candy", <Bar gx={CANDY.gx} gy={CANDY.gy} w={CANDY.w} d={CANDY.d} pal={pal} couleurs={["#E8A6B0", "#F4D774", "#9DD3C8", "#C9A0DC"]} />);
  if (o.has("the_bar")) add(THE_BAR.gx + THE_BAR.gy + 1, "the", <BarreThe gx={THE_BAR.gx} gy={THE_BAR.gy} w={THE_BAR.w} d={THE_BAR.d} pal={pal} animer={animer} />);
  if (o.has("livre_dor")) add(LIVRE_DOR[0] + LIVRE_DOR[1], "livre", <LivreDor gx={LIVRE_DOR[0]} gy={LIVRE_DOR[1]} pal={pal} />);
  if (o.has("salon")) add(SALON.gx + SALON.gy + 1, "salon", <SalonMarocain gx={SALON.gx} gy={SALON.gy} w={SALON.w} d={SALON.d} pal={pal} />);
  if (o.has("fontaine")) add(FONTAINE[0] + FONTAINE[1], "fontaine", <Fontaine gx={FONTAINE[0]} gy={FONTAINE[1]} pal={pal} animer={animer} />);
  if (o.has("photographe")) add(PHOTOGRAPHE[0] + PHOTOGRAPHE[1], "photographe", <Photographe gx={PHOTOGRAPHE[0]} gy={PHOTOGRAPHE[1]} />);
  if (o.has("feux_froids")) FEUX.forEach(([gx, gy], i) => add(gx + gy, `feu${i}`, <FeuxFroids gx={gx} gy={gy} actif={animer && actif} />));
  if (o.has("fleurs")) BOUQUETS.forEach(([gx, gy], i) => add(gx + gy, `bq${i}`, <Bouquet gx={gx} gy={gy} pal={pal} grand />));

  // Accueil
  if (r.accueil === "hotesses" || r.accueil === "maitre_hotel") {
    HOTESSES.forEach(([gx, gy], i) => add(gx + gy + 0.2, `h${i}`, <Personne x={X(gx, gy)} y={Y(gx, gy)} robe corps={pal.sombre ? pal.nappe : "#2d2a30"} echarpe={pal.deco} peau={peauDe(i + 1)} cheveux={cheveuxDe(i)} s={1.15} bob={animer} retard={i * 0.5} />));
  }
  if (r.accueil === "maitre_hotel") {
    add(4.4 + 8.6, "maitre", <Personne x={X(4.0, 8.6)} y={Y(4.0, 8.6)} corps="#1f1d22" echarpe={pal.deco} peau={peauDe(3)} cheveux={cheveuxDe(2)} s={1.18} bob={animer} />);
    add(2.0 + 8.6, "h3", <Personne x={X(2.3, 8.6)} y={Y(2.3, 8.6)} robe corps={pal.sombre ? pal.nappe : "#2d2a30"} echarpe={pal.deco} peau={peauDe(0)} s={1.15} bob={animer} retard={0.9} />);
  }
  if (r.accueil === "the") add(COMPTOIR[0] + COMPTOIR[1], "comptoir", <Comptoir gx={COMPTOIR[0]} gy={COMPTOIR[1]} pal={pal} the />);
  if (r.accueil === "discret") add(COMPTOIR[0] + COMPTOIR[1], "comptoir", <Comptoir gx={COMPTOIR[0]} gy={COMPTOIR[1]} pal={pal} />);

  // Lumière
  if (r.lumiere === "chaleureuse") POSTES_LANTERNES.forEach(([gx, gy], i) => { add(gx + gy, `pl${i}`, <PosteLanterne gx={gx} gy={gy} pal={pal} anime={animer} />); halos.push({ x: X(gx, gy), y: Y(gx, gy, 78), r: 62, a: 0.7, c: "chaud" }); });
  if (r.lumiere === "bougies") CANDELABRES.forEach(([gx, gy], i) => { add(gx + gy, `cd${i}`, <Candelabre gx={gx} gy={gy} pal={pal} anime={animer} />); halos.push({ x: X(gx, gy), y: Y(gx, gy, 62), r: 50, a: 0.6, c: "chaud" }); });
  if (o.has("allee")) add(ALLEE.gx + ALLEE.gy - 0.2, "allee", <Allee gx={ALLEE.gx} gy={ALLEE.gy} w={ALLEE.w} d={ALLEE.d} pal={pal} />);

  // Invités qui arrivent
  const invites: ReactNode[] = [];
  if (final) {
    const g = hasard(31), cibles = tbl.length ? tbl : TABLES.slice(0, 4);
    for (let i = 0; i < 22; i++) {
      const [tx, ty] = cibles[i % cibles.length];
      const a = g() * Math.PI * 2, cx = tx + Math.cos(a) * 1.5, cy = ty + Math.sin(a) * 1.3 + 0.2;
      const px = Math.min(N - 0.6, Math.max(0.8, cx)), py = Math.min(N - 0.5, Math.max(1.2, cy));
      const dx = X(DEPART_INVITES[0], DEPART_INVITES[1]) - X(px, py), dy = Y(DEPART_INVITES[0], DEPART_INVITES[1]) - Y(px, py);
      const dehors = final === "avant";
      invites.push(
        <g key={i} className="hc-arrive" style={{ transform: dehors ? `translate(${dx}px ${dy}px)` : "translate(0px 0px)", opacity: dehors ? 0 : 1, transitionDelay: `${(i % 11) * 0.22}s`, ["--duree" as string]: `${2.3 + (i % 5) * 0.3}s` }}>
          <Personne x={X(px, py)} y={Y(px, py)} robe={i % 2 === 0} corps={i % 3 === 0 ? pal.accent : i % 3 === 1 ? "#3d352e" : pal.deco} peau={peauDe(i)} cheveux={cheveuxDe(i)} s={1.05} bob={animer && !dehors} retard={(i % 7) * 0.3} />
        </g>,
      );
      E.push({ z: px + py + 0.3, k: `inv${i}`, n: invites[i] });
    }
  }

  const trie = E.sort((a, b) => a.z - b.z);
  const f = focus ? ANCRES[focus.cle as keyof typeof ANCRES] : null;
  const festif = r.lumiere === "festive";
  const couleurHalo = { chaud: "url(#hc-h-chaud-" + uid + ")", froid: "url(#hc-h-froid-" + uid + ")", rose: "url(#hc-h-rose-" + uid + ")", vert: "url(#hc-h-vert-" + uid + ")", violet: "url(#hc-h-violet-" + uid + ")" };
  const intensite = 0.25 + 0.75 * n;
  const aria = `Scène « ${r.titre} » : ${r.tablesTotal} tables environ pour ${r.invites} invités, ambiance ${STYLES.find((s) => s.id === style)?.nom.toLowerCase()}.`;

  return (
    <svg viewBox="10 20 780 590" role="img" aria-label={aria} className={className} preserveAspectRatio={cadrage === "slice" ? "xMidYMid slice" : "xMidYMid meet"} style={{ display: "block", width: "100%", height: "100%", overflow: "visible" }}>
      {animer && <style>{STYLE_CSS}</style>}
      <defs>
        {([["chaud", "#FFD58A"], ["froid", "#BFE3FF"], ["rose", "#FF9FC4"], ["vert", "#9FFFD0"], ["violet", "#C8A6FF"]] as const).map(([k, c]) => (
          <radialGradient key={k} id={`hc-h-${k}-${uid}`}><stop offset="0" stopColor={c} stopOpacity="0.95" /><stop offset="0.45" stopColor={c} stopOpacity="0.35" /><stop offset="1" stopColor={c} stopOpacity="0" /></radialGradient>
        ))}
      </defs>
      <Ciel nuit={n} lieu={lieu} animer={animer} />
      <Terrain lieu={lieu} nuit={n} />
      <DecorLieu lieu={lieu} nuit={n} pal={pal} />
      <Mur lieu={lieu} cote="g" pal={pal} nuit={n} style={style} />
      <Mur lieu={lieu} cote="d" pal={pal} nuit={n} style={style} />
      <Sol lieu={lieu} pal={pal} style={style} />
      {style === "maroc" && lieu !== "riad" && <polygon points={poly([0, 0], [N, 0], [N, 0.25], [0, 0.25])} fill="#2F6277" opacity="0.5" />}
      {o.has("piste") && <PisteDanse gx={PISTE.gx} gy={PISTE.gy} w={PISTE.w} d={PISTE.d} pal={pal} actif={animer && actif} festif={festif} />}
      <g>{trie.map((e) => <g key={e.k}>{e.n}</g>)}</g>
      <Porte pal={pal} nuit={n} logo={logos?.heavent} />
      {lieu === "salle" && [3.3, 6.8].map((gx, i) => (
        <g key={i} transform={`translate(${X(gx, 4.6)} ${Y(gx, 4.6, 150)})`}>
          <line x1="0" y1="-50" x2="0" y2="0" stroke="#C9A74E" strokeWidth="1.4" />
          {[-22, -11, 0, 11, 22].map((dx, k) => <g key={k}><path d={`M${dx - 4} 0 L${dx + 4} 0 L${dx + 2} 10 L${dx - 2} 10 Z`} fill="#E8D49A" /><circle cx={dx} cy="-2" r="2.2" fill="#FFE9A8" opacity={0.5 + n * 0.5} /></g>)}
          <ellipse cx="0" cy="0" rx="28" ry="6" fill="none" stroke="#C9A74E" strokeWidth="2" />
        </g>
      ))}
      {/* Guirlandes étoilées */}
      {r.lumiere === "etoilee" && (
        <g>
          {([[[0.3, 11.5], [0.3, 0.3]], [[0.3, 0.3], [11.6, 0.3]], [[0.3, 6.1], [11.6, 6.1]], [[3.0, 11.8], [11.6, 6.1]]] as [[number, number], [number, number]][]).map(([[ax, ay], [bx, by]], i) => {
            const x1 = X(ax, ay), y1 = Y(ax, ay, 116), x2 = X(bx, by), y2 = Y(bx, by, 116), cx = (x1 + x2) / 2, cy = (y1 + y2) / 2 + 26;
            const pts = Array.from({ length: 14 }, (_, k) => { const t = (k + 0.5) / 14; return { x: (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2, y: (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2 }; });
            return (
              <g key={i}>
                <path d={`M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`} stroke="#3a3128" strokeWidth="1" fill="none" opacity="0.7" />
                {pts.map((p, k) => <g key={k}><circle cx={p.x} cy={p.y + 3} r="9" fill={couleurHalo.chaud} opacity={intensite * 0.8} /><circle cx={p.x} cy={p.y + 3} r="2.4" fill="#FFE9A8" className={animer ? "hc-scintille" : undefined} style={{ animationDelay: `${(k % 5) * 0.4}s` }} /></g>)}
              </g>
            );
          })}
          {[[0.3, 11.5], [0.3, 0.3], [11.6, 0.3], [0.3, 6.1], [11.6, 6.1]].map(([gx, gy], i) => <rect key={i} x={X(gx, gy) - 1.6} y={Y(gx, gy, 116)} width="3.2" height="116" fill="#3a3128" opacity="0.8" />)}
        </g>
      )}
      <rect x={-2400} y={-2400} width={VB.w + 4800} height={VB.h + 5000} fill="#10163f" opacity={0.4 * n} style={{ transition: "opacity 1.8s ease" }} />
      {/* Halos de lumière (au-dessus de la pénombre) */}
      <g opacity={intensite} style={{ transition: "opacity 1.8s ease" }}>
        {halos.map((h, i) => <circle key={i} cx={h.x} cy={h.y} r={h.r * 1.5} fill={couleurHalo[h.c]} opacity={h.a} className={animer ? "hc-scintille" : undefined} style={{ animationDelay: `${(i % 5) * 0.5}s` }} />)}
        {r.lumiere === "chaleureuse" && <rect width={VB.w} height={VB.h} fill="#FFB357" opacity={0.06 + 0.1 * n} />}
        {festif && [["rose", 300, 230], ["violet", 500, 210], ["vert", 400, 280], ["froid", 580, 300]].map(([c, x, y], i) => {
          const px = Number(x), py = Number(y);
          return (
            <g key={i} className={animer ? "hc-onde" : undefined} style={{ animationDelay: `${i * 0.6}s` }}>
              <polygon points={`${px - 6},40 ${px + 6},40 ${px + 70},${py + 70} ${px - 70},${py + 70}`} fill={couleurHalo[c as "rose"]} opacity="0.35" />
              <circle cx={px} cy={40} r="5" fill="#fff" />
            </g>
          );
        })}
      </g>
      {o.has("brume") && <Brume />}
      {o.has("ciel_lanternes") && <CielLanternes />}
      {o.has("petales") && <Petales pal={pal} />}
      {f && focus && (
        <g key={focus.n} className="hc-halo" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <ellipse cx={X(f[0], f[1])} cy={Y(f[0], f[1], 18)} rx="74" ry="46" fill="none" stroke="#F4D774" strokeWidth="3" />
          <ellipse cx={X(f[0], f[1])} cy={Y(f[0], f[1], 18)} rx="52" ry="30" fill="#F4D774" opacity="0.22" />
        </g>
      )}
    </svg>
  );
}

