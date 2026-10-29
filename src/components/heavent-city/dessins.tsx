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

/** Table rectangulaire (banquet) : centrée en (gx, gy), 3 chaises de chaque côté */
export function TableRect({ gx, gy, pal, fleurs, bougies, invites = 0, retard = 0, animer, nbChaises = 6 }: { gx: number; gy: number; pal: Pal; fleurs?: boolean; bougies?: boolean; invites?: number; retard?: number; animer?: boolean; nbChaises?: number }) {
  const w = 1.7, d = 0.78, h = 23;
  const chaise = melanger(pal.sombre ? pal.deco : "#EFE5D0", pal.accent, 0.18);
  const parCote = Math.max(1, Math.ceil(nbChaises / 2));
  const xs = Array.from({ length: parCote }, (_, k) => gx - w / 2 + (w * (k + 0.5)) / parCote);
  const dos = (k: number) => ({ x: X(xs[k], gy - d / 2 - 0.3), y: Y(xs[k], gy - d / 2 - 0.3) });
  const face = (k: number) => ({ x: X(xs[k], gy + d / 2 + 0.3), y: Y(xs[k], gy + d / 2 + 0.3) });
  const nbDos = Math.min(parCote, Math.ceil(nbChaises / 2)), nbFace = Math.min(parCote, Math.floor(nbChaises / 2) || 1);
  return (
    <g>
      <ellipse cx={X(gx, gy)} cy={Y(gx, gy) + 2} rx={rx(1.2)} ry={ry(0.8)} fill="#2b1a10" opacity="0.18" />
      {xs.slice(0, nbDos).map((_, k) => { const p = dos(k); return <Chaise key={`d${k}`} x={p.x} y={p.y} couleur={chaise} />; })}
      {xs.slice(0, Math.min(nbDos, invites)).map((_, k) => { const p = dos(k); return <Personne key={`pd${k}`} x={p.x} y={p.y - 4} corps={k % 2 ? pal.accent : "#3d352e"} peau={peauDe(k + gx * 3)} cheveux={cheveuxDe(k + 2)} assis s={0.82} bob={animer} retard={retard + k * 0.3} robe={k % 3 === 1} />; })}
      <Boite gx={gx - w / 2} gy={gy - d / 2} w={w} d={d} h={h} haut={pal.nappe} gauche={assombrir(pal.nappe, 0.1)} droite={assombrir(pal.nappe, 0.22)} />
      <polygon points={poly([gx - w / 2, gy + d / 2, 7], [gx + w / 2, gy + d / 2, 7], [gx + w / 2, gy + d / 2, 4], [gx - w / 2, gy + d / 2, 4])} fill={pal.accent} opacity="0.8" />
      <polygon points={poly([gx - w / 2 + 0.12, gy - d / 2 + 0.12, h], [gx + w / 2 - 0.12, gy - d / 2 + 0.12, h], [gx + w / 2 - 0.12, gy + d / 2 - 0.12, h], [gx - w / 2 + 0.12, gy + d / 2 - 0.12, h])} fill="none" stroke={pal.accent} strokeWidth="0.9" opacity="0.5" />
      {fleurs && [-0.35, 0.35].map((dx, i) => <g key={i}><circle cx={X(gx + dx, gy)} cy={Y(gx + dx, gy, h + 6)} r="4.4" fill={i ? eclaircir(pal.fleurs, 0.2) : pal.fleurs} /><circle cx={X(gx + dx, gy) + 2.5} cy={Y(gx + dx, gy, h + 9)} r="2.8" fill={pal.fleurs} /></g>)}
      {bougies && [-0.55, 0.55].map((dx) => <g key={dx}><rect x={X(gx + dx, gy) - 1.5} y={Y(gx + dx, gy, h + 7)} width="3" height="7" rx="1" fill="#F7EEDC" /><ellipse cx={X(gx + dx, gy)} cy={Y(gx + dx, gy, h + 9.5)} rx="1.7" ry="3" fill="#FFD27A" className={animer ? "hc-flamme" : undefined} /></g>)}
      {xs.slice(0, nbFace).map((_, k) => { const p = face(k); return <Chaise key={`f${k}`} x={p.x} y={p.y} couleur={chaise} devant />; })}
      {xs.slice(0, Math.max(0, Math.min(nbFace, invites - nbDos))).map((_, k) => { const p = face(k); return <Personne key={`pf${k}`} x={p.x} y={p.y - 4} corps={k % 2 ? "#3d352e" : pal.accent} peau={peauDe(k + gy * 2)} cheveux={cheveuxDe(k + 5)} assis s={0.86} bob={animer} retard={retard + k * 0.4} robe={k % 2 === 0} />; })}
    </g>
  );
}

/** Table haute (mange-debout) nappée : les invités restent debout autour */
export function TableHaute({ gx, gy, pal, fleurs, bougies, invites = 0, retard = 0, animer }: { gx: number; gy: number; pal: Pal; fleurs?: boolean; bougies?: boolean; invites?: number; retard?: number; animer?: boolean }) {
  const cx = X(gx, gy), cy = Y(gx, gy), a = rx(0.3), b = ry(0.3), h = 46;
  const pers = Array.from({ length: Math.min(4, invites) }, (_, i) => (i / Math.max(1, Math.min(4, invites))) * Math.PI * 2 + 0.7);
  const place = (t: number) => ({ x: cx + Math.cos(t) * (a + 17), y: cy + Math.sin(t) * (b + 9) });
  const perso = (t: number, i: number) => { const p = place(t); return <Personne key={`p${i}`} x={p.x} y={p.y} corps={i % 2 ? pal.accent : "#3d352e"} peau={peauDe(i + gx * 3)} cheveux={cheveuxDe(i + 2)} s={0.92} bob={animer} retard={retard + i * 0.3} robe={i % 3 === 1} />; };
  return (
    <g>
      <ellipse cx={cx} cy={cy + 2} rx={a + 6} ry={b + 3} fill="#2b1a10" opacity="0.2" />
      {pers.map((t, i) => (Math.sin(t) < 0 ? perso(t, i) : null))}
      {/* nappe tendue, plus large en bas qu'en haut */}
      <path d={`M${cx - a} ${cy - h} L${cx - a - 5} ${cy - 3} Q${cx} ${cy + b + 3} ${cx + a + 5} ${cy - 3} L${cx + a} ${cy - h} Z`} fill={assombrir(pal.nappe, 0.12)} />
      <path d={`M${cx - a - 5} ${cy - 3} Q${cx} ${cy + b + 3} ${cx + a + 5} ${cy - 3}`} fill="none" stroke={pal.accent} strokeWidth="1.2" opacity="0.8" />
      <ellipse cx={cx} cy={cy - h} rx={a} ry={b} fill={pal.nappe} />
      <ellipse cx={cx} cy={cy - h} rx={a * 0.6} ry={b * 0.6} fill="none" stroke={pal.accent} strokeWidth="0.8" opacity="0.55" />
      {fleurs && <g><rect x={cx - 1.2} y={cy - h - 7} width="2.4" height="6" fill={pal.deco} />{[[-3.5, -10], [3.5, -10], [0, -13]].map(([dx, dy], i) => <circle key={i} cx={cx + dx} cy={cy - h + dy} r="3.4" fill={i % 2 ? eclaircir(pal.fleurs, 0.2) : pal.fleurs} />)}</g>}
      {bougies && <g><rect x={cx - 1.4} y={cy - h - 6} width="2.8" height="6" rx="1" fill="#F7EEDC" /><ellipse cx={cx} cy={cy - h - 8.5} rx="1.6" ry="2.8" fill="#FFD27A" className={animer ? "hc-flamme" : undefined} /></g>}
      {pers.map((t, i) => (Math.sin(t) >= 0 ? perso(t, i) : null))}
    </g>
  );
}


// ── Conférences et événements professionnels ───────────────────────────────
/** Une chaise de la salle, tournée vers l'estrade (on la voit de dos) ; avec un participant assis quand la salle est pleine */
export function ChaiseConf({ gx, gy, i, pal, assis }: { gx: number; gy: number; i: number; pal: Pal; assis?: boolean }) {
  const x = X(gx, gy), y = Y(gx, gy), c = pal.sombre ? "#8a7f98" : "#5b5068";
  const corps = [pal.accent, "#3d352e", "#5b6b7a", pal.deco, "#7a5a4a"][i % 5];
  return (
    <g>
      <ellipse cx={x} cy={y + 1} rx="8" ry="3" fill="#2b1a10" opacity="0.2" />
      <ellipse cx={x} cy={y - 4} rx="6.2" ry="3" fill={c} />
      {assis && <Personne x={x} y={y - 3} assis s={0.72} corps={corps} peau={peauDe(i)} cheveux={cheveuxDe(i)} robe={i % 3 === 1} />}
      <rect x={x - 5.8} y={y - 8.5} width="11.6" height="10.8" rx="2.6" fill={assombrir(c, 0.1)} />
      <rect x={x - 5.8} y={y - 8.5} width="11.6" height="2" rx="1" fill={pal.accent} opacity="0.85" />
    </g>
  );
}

export function MicroPied({ gx, gy, haut = 34 }: { gx: number; gy: number; haut?: number }) {
  const x = X(gx, gy), y = Y(gx, gy);
  return (
    <g>
      <ellipse cx={x} cy={y + 0.5} rx="6" ry="2.4" fill="#2b1a10" opacity="0.25" />
      <ellipse cx={x} cy={y} rx="4.4" ry="1.8" fill="#2a2730" />
      <rect x={x - 0.7} y={y - haut} width="1.4" height={haut} fill="#3a3640" />
      <rect x={x - 1.6} y={y - haut - 7} width="3.2" height="7.5" rx="1.6" fill="#1f1d22" />
      <ellipse cx={x} cy={y - haut - 7} rx="2.6" ry="2.2" fill="#8d8a93" />
    </g>
  );
}

/** Estrade surélevée avec tapis, pupitre et micro ; un orateur la rejoint quand la salle est pleine */
export function Estrade({ gx, gy, w, d, pal, orateur }: { gx: number; gy: number; w: number; d: number; pal: Pal; orateur?: boolean }) {
  const bois = "#9b7a55", h = 11;
  const px = gx + w * 0.5, py = gy + d * 0.55;
  const X0 = X(px, py), Y0 = Y(px, py, h);
  return (
    <g>
      <Ombre gx={gx + w / 2} gy={gy + d / 2} r={2.2} o={0.14} />
      <Boite gx={gx} gy={gy} w={w} d={d} h={h} haut={bois} gauche={assombrir(bois, 0.14)} droite={assombrir(bois, 0.28)} />
      <polygon points={poly([gx + 0.15, gy + 0.15, h + 0.4], [gx + w - 0.15, gy + 0.15, h + 0.4], [gx + w - 0.15, gy + d - 0.15, h + 0.4], [gx + 0.15, gy + d - 0.15, h + 0.4])} fill={pal.deco} opacity="0.9" />
      <polygon points={poly([gx + 0.15, gy + d, 5], [gx + w - 0.15, gy + d, 5], [gx + w - 0.15, gy + d, 3.5], [gx + 0.15, gy + d, 3.5])} fill={pal.accent} opacity="0.85" />
      {orateur && <Personne x={X0 + 7} y={Y0 - 3} corps="#25222b" peau={peauDe(2)} cheveux={cheveuxDe(1)} echarpe={pal.accent} s={1.12} />}
      {/* pupitre */}
      <g>
        <Boite gx={px - 0.3} gy={py - 0.25} w={0.6} d={0.5} h={22} z0={h} haut={eclaircir("#7a5a3c", 0.12)} gauche="#6b4d33" droite="#5a3f29" />
        <polygon points={poly([px - 0.3, py + 0.25, h + 22], [px + 0.3, py + 0.25, h + 22], [px + 0.3, py + 0.25, h + 17], [px - 0.3, py + 0.25, h + 17])} fill={pal.accent} opacity="0.8" />
        <rect x={X0 - 0.7} y={Y0 - 38} width="1.4" height="14" fill="#3a3640" />
        <rect x={X0 - 1.6} y={Y0 - 43} width="3.2" height="6.5" rx="1.6" fill="#1f1d22" />
        <ellipse cx={X0} cy={Y0 - 43} rx="2.6" ry="2.2" fill="#8d8a93" />
      </g>
    </g>
  );
}

/** Grand écran de projection fixé au mur du fond, centré derrière l'estrade */
export function EcranProjection({ u0, pal, anime }: { u0: number; pal: Pal; anime?: boolean }) {
  return (
    <Plan sens="d" c={0.1} u={u0} z0={26}>
      <rect width="150" height="84" rx="4" fill="#1d1b22" stroke={pal.deco} strokeWidth="3" />
      <rect x="6" y="6" width="138" height="72" rx="2" fill={melanger(pal.accent, "#1d1b22", 0.55)} />
      <rect x="16" y="14" width="86" height="9" rx="2" fill="#fff" opacity="0.93" />
      <rect x="16" y="29" width="58" height="4.5" rx="2" fill={pal.nappe} opacity="0.9" /><rect x="16" y="38" width="48" height="4.5" rx="2" fill={pal.nappe} opacity="0.75" />
      {[0, 1, 2, 3].map((k) => <rect key={k} x={84 + k * 13} y={68 - (14 + ((k * 7) % 4) * 6)} width="9" height={14 + ((k * 7) % 4) * 6} fill={k % 2 ? pal.nappe : "#fff"} opacity="0.85" className={anime ? "hc-bob" : undefined} style={anime ? { animationDelay: `${k * 0.3}s` } : undefined} />)}
    </Plan>
  );
}

/** Table des intervenants : nappe, chevalets, micros et chaises du côté du public opposé */
export function TableIntervenants({ gx, gy, w, d, pal, assis }: { gx: number; gy: number; w: number; d: number; pal: Pal; assis?: boolean }) {
  const n = 4, c = pal.nappe;
  return (
    <g>
      <Ombre gx={gx + w / 2} gy={gy + d / 2} r={1.6} o={0.12} />
      {Array.from({ length: n }, (_, i) => { const px = gx + (w / n) * (i + 0.5), x = X(px, gy - 0.25), y = Y(px, gy - 0.25);
        return <g key={`c${i}`}>{assis && <Personne x={x} y={y} assis s={0.95} corps={["#25222b", pal.accent, "#3d352e", "#5b6b7a"][i]} peau={peauDe(i + 1)} cheveux={cheveuxDe(i)} robe={i % 2 === 1} />}<ellipse cx={x} cy={y - 3} rx="6" ry="3" fill="#3a3340" /></g>; })}
      <Boite gx={gx} gy={gy} w={w} d={d} h={20} haut={c} gauche={assombrir(c, 0.1)} droite={assombrir(c, 0.22)} />
      <polygon points={poly([gx, gy + d, 6], [gx + w, gy + d, 6], [gx + w, gy + d, 4], [gx, gy + d, 4])} fill={pal.accent} opacity="0.85" />
      {Array.from({ length: n }, (_, i) => { const px = gx + (w / n) * (i + 0.5), x = X(px, gy + d * 0.5), y = Y(px, gy + d * 0.5, 20);
        return <g key={i}><rect x={x - 5} y={y - 6} width="10" height="5" rx="1" fill="#fff" opacity="0.95" /><rect x={x - 0.6} y={y - 13} width="1.2" height="8" fill="#3a3640" /><ellipse cx={x} cy={y - 14} rx="1.8" ry="1.6" fill="#1f1d22" /></g>; })}
    </g>
  );
}

/** Régie son et lumière : console, écrans et technicien */
export function Regie({ gx, gy, w, d, pal, assis }: { gx: number; gy: number; w: number; d: number; pal: Pal; assis?: boolean }) {
  const noir = "#2b2830";
  return (
    <g>
      <Ombre gx={gx + w / 2} gy={gy + d / 2} r={1.2} o={0.14} />
      {assis && <Personne x={X(gx + w * 0.4, gy - 0.2)} y={Y(gx + w * 0.4, gy - 0.2)} corps="#1f1d22" peau={peauDe(3)} cheveux={cheveuxDe(2)} s={1.05} />}
      <Boite gx={gx} gy={gy} w={w} d={d} h={15} haut={noir} gauche={assombrir(noir, 0.2)} droite={assombrir(noir, 0.35)} />
      {[0.25, 0.55].map((u, i) => { const x = X(gx + w * u, gy + d * 0.4), y = Y(gx + w * u, gy + d * 0.4, 15); return <g key={i}><rect x={x - 7} y={y - 12} width="14" height="9" rx="1.5" fill="#15131a" /><rect x={x - 5.5} y={y - 10.5} width="11" height="6" fill={pal.accent} opacity="0.55" /></g>; })}
      {Array.from({ length: 7 }, (_, k) => { const x = X(gx + w * (0.1 + k * 0.12), gy + d * 0.75), y = Y(gx + w * (0.1 + k * 0.12), gy + d * 0.75, 15); return <rect key={k} x={x - 1} y={y - 4 - (k % 3)} width="2" height={3 + (k % 3)} fill={k % 2 ? "#F4D774" : "#9DD3C8"} />; })}
    </g>
  );
}

/** Buffet de sandwichs et de pause café (long axe selon w ou d) */
export function BuffetSandwichs({ gx, gy, w, d, pal }: { gx: number; gy: number; w: number; d: number; pal: Pal }) {
  const c = pal.nappe, long = w >= d, n = 6;
  const pt2 = (t: number, z: number) => long ? [X(gx + 0.35 + t * (w - 1.1), gy + d / 2), Y(gx + 0.35 + t * (w - 1.1), gy + d / 2, z)] : [X(gx + w / 2, gy + 0.35 + t * (d - 1.1)), Y(gx + w / 2, gy + 0.35 + t * (d - 1.1), z)];
  return (
    <g>
      <Ombre gx={gx + w / 2} gy={gy + d / 2} r={1.2} o={0.14} />
      <Boite gx={gx} gy={gy} w={w} d={d} h={26} haut={c} gauche={assombrir(c, 0.1)} droite={assombrir(c, 0.22)} />
      <polygon points={poly([gx + w, gy, 7], [gx + w, gy + d, 7], [gx + w, gy + d, 4], [gx + w, gy, 4])} fill={pal.accent} opacity="0.85" />
      {Array.from({ length: n }, (_, i) => { const [x, y] = pt2(i / (n - 1), 26); return <g key={i}><ellipse cx={x} cy={y} rx="7" ry="3.6" fill="#f3efe6" stroke="#d8cfbb" strokeWidth="0.5" /><path d={`M${x - 4.5} ${y - 1} L${x + 4.5} ${y - 1} L${x + 3} ${y - 5} L${x - 3} ${y - 5} Z`} fill={["#E8C06A", "#C77B4A", "#9DAE89", "#D9A28A", "#E8D6A2", "#C9A0A0"][i]} /><rect x={x - 4.5} y={y - 3.2} width="9" height="1.6" fill="#7a5a3c" opacity="0.7" /></g>; })}
      {[0, 1].map((k) => { const [x, y] = pt2(0.97 - k * 0.1, 26); return <g key={`u${k}`}><rect x={x - 3.5} y={y - 15} width="7" height="14" rx="2" fill="#b9b2a4" /><rect x={x - 4.2} y={y - 17} width="8.4" height="3" rx="1.5" fill="#8d877b" /><circle cx={x + 4.6} cy={y - 8} r="1" fill="#E24E8B" /></g>; })}
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

export function EnceintesAmbiance({ pal, actif, pos }: { pal: Pal; actif?: boolean; pos: [number, number][] }) {
  return (
    <g>
      {pos.map(([gx, gy], i) => (
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

export function Porte({ pal, nuit, logo, porte }: { pal: Pal; nuit: number; logo?: string; porte: { gauche: number; droite: number; gy: number } }) {
  const g = (a: number) => X(a, porte.gy), gy = (a: number, z = 0) => Y(a, porte.gy, z);
  const x1 = g(porte.gauche), y1 = gy(porte.gauche), x2 = g(porte.droite), y2 = gy(porte.droite);
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

// ── Mariage marocain : amariya, fauteuils des mariés, neggafa, henné, pièce montée ──────────────
/** Amariya : le palanquin doré porté par quatre porteurs. (gx, gy) = angle de l'ensemble, qui occupe 2,3 × 1,4 cases */
export function Amariya({ gx, gy, pal, animer }: { gx: number; gy: number; pal: Pal; animer?: boolean }) {
  const px = gx + 0.45, w = 1.4, d = 1.4, or = pal.deco, tissu = pal.nappe, haut = 66;
  const poteaux: [number, number][] = [[px + 0.06, gy + 0.06], [px + w - 0.18, gy + 0.06], [px + 0.06, gy + d - 0.18], [px + w - 0.18, gy + d - 0.18]];
  const porteurs: [number, number, number][] = [[gx + 0.15, gy + 0.3, 0], [gx + 0.15, gy + d - 0.3, 1], [gx + w + 0.75, gy + 0.3, 2], [gx + w + 0.75, gy + d - 0.3, 3]];
  return (
    <g>
      <Ombre gx={px + w / 2} gy={gy + d / 2} r={1.1} o={0.18} />
      <Boite gx={px} gy={gy} w={w} d={d} h={9} z0={20} haut={eclaircir(or, 0.25)} gauche={assombrir(or, 0.05)} droite={assombrir(or, 0.2)} />
      <Boite gx={px + 0.2} gy={gy + 0.2} w={w - 0.4} d={d - 0.4} h={5} z0={29} haut={tissu} />
      {poteaux.filter((_, i) => i < 2).map(([x, y], i) => <Boite key={`a${i}`} gx={x} gy={y} w={0.12} d={0.12} h={haut - 29} z0={29} haut={or} />)}
      {/* rideaux brodés */}
      <polygon points={poly([px, gy + d, haut], [px + w, gy + d, haut], [px + w, gy + d, 38], [px, gy + d, 38])} fill={pal.fleurs} opacity="0.35" />
      <polygon points={poly([px + w, gy, haut], [px + w, gy + d, haut], [px + w, gy + d, 38], [px + w, gy, 38])} fill={pal.fleurs} opacity="0.3" />
      <Boite gx={px - 0.1} gy={gy - 0.1} w={w + 0.2} d={d + 0.2} h={7} z0={haut} haut={eclaircir(or, 0.3)} gauche={or} droite={assombrir(or, 0.15)} />
      <Boite gx={px + 0.25} gy={gy + 0.25} w={w - 0.5} d={d - 0.5} h={9} z0={haut + 7} haut={or} />
      <circle cx={X(px + w / 2, gy + d / 2)} cy={Y(px + w / 2, gy + d / 2, haut + 20)} r="3.4" fill={eclaircir(or, 0.5)} />
      {poteaux.filter((_, i) => i >= 2).map(([x, y], i) => <Boite key={`b${i}`} gx={x} gy={y} w={0.12} d={0.12} h={haut - 29} z0={29} haut={or} />)}
      {[[px, gy + d], [px + w, gy + d], [px + w, gy]].map(([x, y], i) => <g key={i}><line x1={X(x, y)} y1={Y(x, y, haut)} x2={X(x, y)} y2={Y(x, y, haut - 12)} stroke={or} strokeWidth="1.2" /><circle cx={X(x, y)} cy={Y(x, y, haut - 13)} r="2" fill={pal.accent} /></g>)}
      {/* brancards et porteurs */}
      {[0.3, d - 0.3].map((dy, i) => <polygon key={i} points={poly([gx + 0.2, gy + dy, 20], [gx + w + 0.7, gy + dy, 20], [gx + w + 0.7, gy + dy, 17], [gx + 0.2, gy + dy, 17])} fill={assombrir(or, 0.3)} />)}
      {porteurs.map(([x, y, i]) => <Personne key={i} x={X(x, y)} y={Y(x, y)} corps={i % 2 ? "#F4EEE0" : pal.accent} echarpe={or} peau={peauDe(i + 1)} cheveux={cheveuxDe(i)} s={1.08} bob={animer} retard={i * 0.25} />)}
    </g>
  );
}

/** Deux fauteuils d'apparat sur une petite estrade fleurie */
export function FauteuilsMaries({ gx, gy, w = 2.0, d = 1.2, pal, couple, animer }: { gx: number; gy: number; w?: number; d?: number; pal: Pal; couple?: boolean; animer?: boolean }) {
  const or = pal.deco;
  return (
    <g>
      <Ombre gx={gx + w / 2} gy={gy + d / 2} r={1.2} o={0.14} />
      <Boite gx={gx} gy={gy} w={w} d={d} h={7} haut={pal.nappe} gauche={assombrir(pal.nappe, 0.1)} droite={assombrir(pal.nappe, 0.22)} />
      <polygon points={poly([gx, gy + d, 5], [gx + w, gy + d, 5], [gx + w, gy + d, 3], [gx, gy + d, 3])} fill={or} opacity="0.9" />
      {[0.25, 1.05].map((dx, i) => (
        <g key={i}>
          <Boite gx={gx + dx} gy={gy + 0.15} w={0.7} d={0.12} h={46} z0={7} haut={eclaircir(or, 0.2)} gauche={or} droite={assombrir(or, 0.2)} />
          <Boite gx={gx + dx} gy={gy + 0.15} w={0.7} d={0.7} h={12} z0={7} haut={pal.accent} gauche={assombrir(pal.accent, 0.12)} droite={assombrir(pal.accent, 0.25)} />
          {couple && <Personne x={X(gx + dx + 0.35, gy + 0.55)} y={Y(gx + dx + 0.35, gy + 0.55, 12)} assis robe={i === 0} corps={i === 0 ? "#FBF8F1" : "#2c2a2f"} peau={peauDe(i + 1)} cheveux={cheveuxDe(i)} s={0.95} bob={animer} />}
        </g>
      ))}
      {[0.1, 0.55, 1.0, 1.45, 1.9].map((dx, i) => <circle key={i} cx={X(gx + dx, gy + d + 0.05)} cy={Y(gx + dx, gy + d + 0.05, 9)} r="4.2" fill={i % 2 ? pal.fleurs : eclaircir(pal.fleurs, 0.25)} />)}
    </g>
  );
}

/** Neggafa : elle prépare la mariée ; sa malle de tenues est posée à côté */
export function Neggafa({ gx, gy, pal, animer }: { gx: number; gy: number; pal: Pal; animer?: boolean }) {
  return (
    <g>
      <Boite gx={gx + 0.35} gy={gy - 0.1} w={0.55} d={0.4} h={14} haut={eclaircir(pal.deco, 0.1)} gauche={assombrir(pal.deco, 0.1)} droite={assombrir(pal.deco, 0.3)} />
      <path d={`M${X(gx + 0.5, gy + 0.1) - 5} ${Y(gx + 0.5, gy + 0.1, 14)} q5 -22 10 0 z`} fill={pal.accent} />
      <Personne x={X(gx, gy)} y={Y(gx, gy)} robe corps={pal.deco} echarpe={pal.fleurs} peau={peauDe(2)} cheveux={cheveuxDe(1)} s={1.28} bob={animer} />
    </g>
  );
}

/** Pièce montée à trois étages sur sa petite table */
export function PieceMontee({ gx, gy, pal }: { gx: number; gy: number; pal: Pal }) {
  const cx = X(gx, gy), cy = Y(gx, gy), a = rx(0.38), b = ry(0.38), h = 20;
  const etage = (r: number, z: number, hh: number, c: string) => (
    <g>
      <path d={`M${cx - rx(r)} ${cy - z - hh} L${cx - rx(r)} ${cy - z} A${rx(r)} ${ry(r)} 0 0 0 ${cx + rx(r)} ${cy - z} L${cx + rx(r)} ${cy - z - hh} Z`} fill={assombrir(c, 0.1)} />
      <ellipse cx={cx} cy={cy - z - hh} rx={rx(r)} ry={ry(r)} fill={c} />
      <path d={`M${cx - rx(r)} ${cy - z - 3} A${rx(r)} ${ry(r)} 0 0 0 ${cx + rx(r)} ${cy - z - 3}`} fill="none" stroke={pal.deco} strokeWidth="1.2" />
    </g>
  );
  return (
    <g>
      <ellipse cx={cx} cy={cy + 2} rx={a + 6} ry={b + 3} fill="#2b1a10" opacity="0.18" />
      <path d={`M${cx - a} ${cy - h} L${cx - a} ${cy - 4} A${a} ${b} 0 0 0 ${cx + a} ${cy - 4} L${cx + a} ${cy - h} Z`} fill={assombrir(pal.nappe, 0.14)} />
      <ellipse cx={cx} cy={cy - h} rx={a} ry={b} fill={pal.nappe} />
      {etage(0.3, h, 9, "#FBF6EA")}{etage(0.22, h + 9, 8, "#F7EEDC")}{etage(0.14, h + 17, 7, "#FBF6EA")}
      <circle cx={cx} cy={cy - h - 28} r="2.4" fill={pal.fleurs} /><circle cx={cx + 3} cy={cy - h - 26} r="1.8" fill={eclaircir(pal.fleurs, 0.3)} />
    </g>
  );
}

/** Espace henné : tapis, coussins, table basse, cônes de henné et bougies */
export function EspaceHenne({ gx, gy, w = 2.2, d = 2.2, pal }: { gx: number; gy: number; w?: number; d?: number; pal: Pal }) {
  const cx = gx + w / 2, cy = gy + d / 2;
  const coussins: [number, number, string][] = [[gx + 0.3, gy + 0.4, pal.accent], [gx + 0.3, gy + d - 0.5, pal.fleurs], [gx + w - 0.4, gy + 0.4, pal.fleurs], [gx + w - 0.4, gy + d - 0.5, pal.accent], [cx, gy + 0.2, pal.deco], [cx, gy + d - 0.2, pal.deco]];
  return (
    <g>
      <polygon points={poly([gx, gy], [gx + w, gy], [gx + w, gy + d], [gx, gy + d])} fill={assombrir(pal.accent, 0.1)} opacity="0.92" />
      <polygon points={poly([gx + 0.15, gy + 0.15], [gx + w - 0.15, gy + 0.15], [gx + w - 0.15, gy + d - 0.15], [gx + 0.15, gy + d - 0.15])} fill="none" stroke={pal.deco} strokeWidth="1.4" />
      <polygon points={poly([gx + 0.4, gy + 0.4], [gx + w - 0.4, gy + 0.4], [gx + w - 0.4, gy + d - 0.4], [gx + 0.4, gy + d - 0.4])} fill={pal.fleurs} opacity="0.22" />
      <Boite gx={cx - 0.45} gy={cy - 0.45} w={0.9} d={0.9} h={9} haut={eclaircir(pal.deco, 0.15)} />
      {[[-0.25, -0.1], [0.05, 0.15], [0.25, -0.2]].map(([dx, dy], i) => <path key={i} d={`M${X(cx + dx, cy + dy) - 2.4} ${Y(cx + dx, cy + dy, 9)} L${X(cx + dx, cy + dy)} ${Y(cx + dx, cy + dy, 19)} L${X(cx + dx, cy + dy) + 2.4} ${Y(cx + dx, cy + dy, 9)} Z`} fill="#6B3B1E" />)}
      {[[cx - 0.3, cy + 0.3], [cx + 0.3, cy - 0.3]].map(([x, y], i) => <g key={i}><rect x={X(x, y) - 1.3} y={Y(x, y, 15)} width="2.6" height="6" rx="1" fill="#F7EEDC" /><ellipse cx={X(x, y)} cy={Y(x, y, 17.5)} rx="1.5" ry="2.6" fill="#FFD27A" /></g>)}
      {coussins.map(([x, y, c], i) => <ellipse key={i} cx={X(x, y)} cy={Y(x, y, 4)} rx="12" ry="6" fill={c} stroke={assombrir(c, 0.25)} strokeWidth="0.8" />)}
    </g>
  );
}

/** Espace enfants : tapis de jeu, petite barrière, toboggan, cubes et ballons (aucun visage réaliste) */
export function EspaceEnfants({ gx, gy, w = 2.4, d = 2.0, pal, animer }: { gx: number; gy: number; w?: number; d?: number; pal: Pal; animer?: boolean }) {
  const couleurs = ["#F28C8C", "#F4D774", "#8CC9E8", "#9DD3A0", "#C9A0DC"];
  const cases: [number, number][] = [];
  for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) cases.push([i, j]);
  const cw = (w - 0.3) / 4, cd = (d - 0.3) / 3;
  const barriere: [number, number][] = [];
  for (let k = 0; k <= 8; k++) barriere.push([gx + 0.05 + (k * (w - 0.1)) / 8, gy + d - 0.05]);
  for (let k = 0; k <= 6; k++) barriere.push([gx + w - 0.05, gy + 0.05 + (k * (d - 0.1)) / 6]);
  return (
    <g>
      <polygon points={poly([gx, gy], [gx + w, gy], [gx + w, gy + d], [gx, gy + d])} fill="#FFF6E8" opacity="0.95" />
      {cases.map(([i, j]) => <polygon key={`${i}${j}`} points={poly([gx + 0.15 + i * cw, gy + 0.15 + j * cd], [gx + 0.15 + (i + 1) * cw, gy + 0.15 + j * cd], [gx + 0.15 + (i + 1) * cw, gy + 0.15 + (j + 1) * cd], [gx + 0.15 + i * cw, gy + 0.15 + (j + 1) * cd])} fill={couleurs[(i + j * 2) % couleurs.length]} opacity="0.85" stroke="#ffffff" strokeWidth="0.8" />)}
      {/* toboggan */}
      <Boite gx={gx + 0.25} gy={gy + 0.2} w={0.45} d={0.45} h={30} haut="#8CC9E8" />
      <polygon points={poly([gx + 0.7, gy + 0.25, 30], [gx + 1.45, gy + 0.25, 3], [gx + 1.45, gy + 0.6, 3], [gx + 0.7, gy + 0.6, 30])} fill="#F28C8C" />
      {/* cubes de jeu */}
      {([[1.6, 1.2, "#F4D774"], [1.85, 1.35, "#9DD3A0"], [1.7, 1.25, "#C9A0DC"]] as [number, number, string][]).map(([x, y, c], i) => <Boite key={i} gx={gx + x} gy={gy + y} w={0.22} d={0.22} h={9} z0={i === 2 ? 9 : 0} haut={c} />)}
      {/* petite table à colorier */}
      <Boite gx={gx + 0.35} gy={gy + 1.1} w={0.7} d={0.45} h={12} haut={eclaircir(pal.deco, 0.4)} />
      <rect x={X(gx + 0.6, gy + 1.3) - 5} y={Y(gx + 0.6, gy + 1.3, 13)} width="10" height="3" fill="#ffffff" />
      {/* deux enfants (petits personnages) */}
      <Personne x={X(gx + 1.3, gy + 0.9)} y={Y(gx + 1.3, gy + 0.9)} corps="#F28C8C" peau={peauDe(1)} cheveux={cheveuxDe(1)} s={0.62} bob={animer} />
      <Personne x={X(gx + 0.5, gy + 1.75)} y={Y(gx + 0.5, gy + 1.75)} corps="#8CC9E8" peau={peauDe(3)} cheveux={cheveuxDe(3)} s={0.6} robe bob={animer} retard={0.6} />
      {/* barrière basse */}
      {barriere.map(([x, y], i) => <rect key={i} x={X(x, y) - 1} y={Y(x, y, 10)} width="2" height="10" fill="#FFFFFF" stroke="#d8cbb4" strokeWidth="0.4" />)}
      <polyline points={barriere.slice(0, 9).map(([x, y]) => pt(x, y, 9)).join(" ")} fill="none" stroke="#FFFFFF" strokeWidth="2" />
      <polyline points={barriere.slice(9).map(([x, y]) => pt(x, y, 9)).join(" ")} fill="none" stroke="#FFFFFF" strokeWidth="2" />
      {/* ballons */}
      {([["#F28C8C", 0], ["#F4D774", 1], ["#8CC9E8", 2]] as [string, number][]).map(([c, i]) => {
        const bx = X(gx + w - 0.2, gy + 0.3) + i * 7 - 7, by = Y(gx + w - 0.2, gy + 0.3, 62 + (i % 2) * 8);
        return <g key={i} className={animer ? "hc-flotte" : undefined} style={{ animationDelay: `${i * 0.5}s` }}><line x1={bx} y1={by + 8} x2={X(gx + w - 0.2, gy + 0.3)} y2={Y(gx + w - 0.2, gy + 0.3, 10)} stroke="#ffffff" strokeWidth="0.6" /><ellipse cx={bx} cy={by} rx="6" ry="7.5" fill={c} /><ellipse cx={bx - 2} cy={by - 3} rx="1.6" ry="2.2" fill="#ffffff" opacity="0.6" /></g>;
      })}
    </g>
  );
}

/** Décor de la piscine de la villa : fleurs flottantes, bougies flottantes, éclairage du bassin. Le bassin va de gy -0.7 à -4.2. */
export function DecorPiscine({ N, pal, nuit, fleurs, bougies, lumiere, animer }: { N: number; pal: Pal; nuit: number; fleurs?: boolean; bougies?: boolean; lumiere?: boolean; animer?: boolean }) {
  const g = hasard(41);
  const pts = (k: number) => Array.from({ length: k }, () => [0.4 + g() * (N - 0.8), -0.95 - g() * 3.0] as [number, number]);
  const pf = fleurs ? pts(Math.round(N * 2.4)) : [], pb = bougies ? pts(Math.round(N * 1.5)) : [];
  return (
    <g>
      {lumiere && (
        <g>
          <polygon points={poly([0.1, -0.7], [N - 0.1, -0.7], [N - 0.1, -4.2], [0.1, -4.2])} fill={pal.sombre ? pal.deco : "#5FE3F0"} opacity={0.18 + 0.45 * nuit} />
          {Array.from({ length: Math.round(N / 2) }, (_, k) => <ellipse key={k} cx={X(0.8 + k * 2, -0.85)} cy={Y(0.8 + k * 2, -0.85)} rx="14" ry="6" fill="#FFFFFF" opacity={0.25 + 0.5 * nuit} className={animer ? "hc-scintille" : undefined} style={{ animationDelay: `${(k % 4) * 0.5}s` }} />)}
        </g>
      )}
      {pf.map(([x, y], i) => (
        <g key={`f${i}`}>
          <ellipse cx={X(x, y)} cy={Y(x, y)} rx="7" ry="3.4" fill="#4F7A4A" opacity="0.85" />
          {[[-2.5, -1], [2.5, -1], [0, -2.6], [0, 0.4]].map(([dx, dy], k) => <circle key={k} cx={X(x, y) + dx} cy={Y(x, y) + dy - 1} r="2.6" fill={k % 2 ? eclaircir(pal.fleurs, 0.25) : pal.fleurs} />)}
          <circle cx={X(x, y)} cy={Y(x, y) - 1.4} r="1.2" fill="#E7C65A" />
        </g>
      ))}
      {pb.map(([x, y], i) => (
        <g key={`b${i}`}>
          <ellipse cx={X(x, y)} cy={Y(x, y) - 2} rx="12" ry="6" fill="#FFD58A" opacity={0.15 + 0.35 * nuit} />
          <ellipse cx={X(x, y)} cy={Y(x, y)} rx="4.4" ry="2" fill="#F7EEDC" />
          <rect x={X(x, y) - 3} y={Y(x, y) - 4} width="6" height="4" rx="1" fill="#F7EEDC" />
          <ellipse cx={X(x, y)} cy={Y(x, y) - 6.5} rx="1.4" ry="2.6" fill="#FFD27A" className={animer ? "hc-flamme" : undefined} />
        </g>
      ))}
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
