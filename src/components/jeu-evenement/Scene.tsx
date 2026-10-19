// Scène isométrique : affichage, placement (glisser-déposer ou toucher), déplacement et sélection.
import { tr } from "./langue";
import { forwardRef, useEffect, useMemo, useRef, useState, KeyboardEvent, PointerEvent as RPointerEvent, DragEvent } from "react";
import { TypeElement } from "./config";
import { Creation, Element, couleurDe, emprise, nomElement, palette, placeLibre } from "./logique";
import { DecorArriere, DessinElement, Sol, TH, TW, contourEmprise, pt } from "./dessins";

export type ModeScene = { type: "placer"; element: TypeElement } | { type: "deplacer"; uid: string } | null;

interface Props {
  creation: Creation;
  cols: number;
  rows: number;
  selection?: string | null;
  mode?: ModeScene;
  lectureSeule?: boolean;
  onPlacer?: (type: TypeElement, x: number, y: number) => void;
  onDeplacer?: (uid: string, x: number, y: number) => void;
  onSelection?: (uid: string | null) => void;
  onCaseRefusee?: () => void;
}

export const TYPE_GLISSE = "application/x-heavent-element";

const Scene = forwardRef<SVGSVGElement, Props>(function Scene(
  { creation, cols, rows, selection, mode, lectureSeule, onPlacer, onDeplacer, onSelection, onCaseRefusee }, ref,
) {
  const svgLocal = useRef<SVGSVGElement | null>(null);
  const [survol, setSurvol] = useState<{ type: TypeElement; x: number; y: number; tourne?: boolean; ignorer?: string } | null>(null);
  const glisse = useRef<{ uid: string; dx: number; dy: number; depart: [number, number]; bouge: boolean } | null>(null);
  // Au doigt : tant qu'un élément est tenu, la page ne défile pas (sinon le navigateur « vole » le geste).
  useEffect(() => {
    const svg = svgLocal.current; if (!svg) return;
    const bloquer = (ev: TouchEvent) => { if (glisse.current) ev.preventDefault(); };
    svg.addEventListener("touchmove", bloquer, { passive: false });
    return () => svg.removeEventListener("touchmove", bloquer);
  }, []);
  const { reglages, elements, centres } = creation;
  const pal = palette(reglages.ambiance);

  // Cadre : marges pour les murs / arbres derrière et la hauteur des éléments
  const marge = 70, haut = 150;
  const ox = rows * (TW / 2) + marge, oy = haut;
  const largeur = (cols + rows) * (TW / 2) + marge * 2;
  const hauteur = (cols + rows) * (TH / 2) + haut + 40;

  /** Pointeur écran → case de la grille (position fractionnaire). */
  const versGrille = (clientX: number, clientY: number) => {
    const svg = svgLocal.current; if (!svg) return null;
    const p = svg.createSVGPoint(); p.x = clientX; p.y = clientY;
    const m = svg.getScreenCTM(); if (!m) return null;
    const q = p.matrixTransform(m.inverse());
    const X = q.x - ox, Y = q.y - oy;
    return { gx: (Y / (TH / 2) + X / (TW / 2)) / 2, gy: (Y / (TH / 2) - X / (TW / 2)) / 2 };
  };
  /** Case d'ancrage pour que l'élément soit centré sous le pointeur. */
  const ancre = (g: { gx: number; gy: number }, w: number, h: number) => ({ x: Math.floor(g.gx - w / 2 + 0.5), y: Math.floor(g.gy - h / 2 + 0.5) });

  const ordre = useMemo(() => [...elements].sort((a, b) => {
    const ea = emprise(a), eb = emprise(b);
    return a.x + ea.w + a.y + ea.h - (b.x + eb.w + b.y + eb.h) || a.x - b.x;
  }), [elements]);

  const candidatMode = (clientX: number, clientY: number) => {
    const g = versGrille(clientX, clientY); if (!g || !mode) return null;
    if (mode.type === "placer") { const { w, h } = emprise({ type: mode.element }); return { type: mode.element, tourne: false, ignorer: undefined as string | undefined, ...ancre(g, w, h) }; }
    const el = elements.find((e) => e.uid === mode.uid); if (!el) return null;
    const { w, h } = emprise(el);
    return { type: el.type, tourne: el.tourne, ignorer: el.uid as string | undefined, ...ancre(g, w, h) };
  };

  // ── Souris / toucher ───────────────────────────────────────────────────────
  const surMouvement = (ev: RPointerEvent<SVGSVGElement>) => {
    if (lectureSeule) return;
    const gl = glisse.current;
    if (gl) {
      const g = versGrille(ev.clientX, ev.clientY); const el = elements.find((e) => e.uid === gl.uid);
      if (!g || !el) return;
      const x = Math.floor(g.gx - gl.dx), y = Math.floor(g.gy - gl.dy);
      if (x !== gl.depart[0] || y !== gl.depart[1]) gl.bouge = true;
      if (gl.bouge) setSurvol({ type: el.type, x, y, tourne: el.tourne, ignorer: el.uid });
      return;
    }
    if (mode && ev.pointerType === "mouse") setSurvol(candidatMode(ev.clientX, ev.clientY));
  };

  const surRelache = (ev: RPointerEvent<SVGSVGElement>) => {
    if (lectureSeule) return;
    const gl = glisse.current;
    if (gl) {
      glisse.current = null;
      if (gl.bouge && survol) {
        if (placeLibre(elements, survol, cols, rows, gl.uid)) onDeplacer?.(gl.uid, survol.x, survol.y); else onCaseRefusee?.();
      } else onSelection?.(gl.uid);
      setSurvol(null);
      return;
    }
    if (mode) {
      const c = candidatMode(ev.clientX, ev.clientY); if (!c) return;
      if (!placeLibre(elements, c, cols, rows, c.ignorer)) { setSurvol(c); onCaseRefusee?.(); return; }
      if (mode.type === "placer") onPlacer?.(mode.element, c.x, c.y); else onDeplacer?.(mode.uid, c.x, c.y);
      setSurvol(null);
    } else if (!(ev.target as SVGElement).closest?.("[data-element]")) onSelection?.(null);
  };

  const surAppuiElement = (ev: RPointerEvent, e: Element) => {
    if (lectureSeule || mode) return;
    ev.stopPropagation();
    // Souris ou doigt : on « tient » l'élément ; s'il bouge d'une case c'est un déplacement, sinon une simple sélection.
    const g = versGrille(ev.clientX, ev.clientY); if (!g) return;
    glisse.current = { uid: e.uid, dx: g.gx - e.x, dy: g.gy - e.y, depart: [e.x, e.y], bouge: false };
    (ev.currentTarget as SVGGElement).ownerSVGElement?.setPointerCapture?.(ev.pointerId);
  };

  // ── Glisser-déposer depuis le catalogue (ordinateur) ───────────────────────
  const typeGlisse = (ev: DragEvent) => (Array.from(ev.dataTransfer.types).includes(TYPE_GLISSE) ? (window as any).__heaventGlisse as TypeElement | undefined : undefined);
  const surSurvolGlisse = (ev: DragEvent<SVGSVGElement>) => {
    const t = typeGlisse(ev); if (!t || lectureSeule) return;
    ev.preventDefault(); ev.dataTransfer.dropEffect = "copy";
    const g = versGrille(ev.clientX, ev.clientY); if (!g) return;
    const { w, h } = emprise({ type: t });
    setSurvol({ type: t, ...ancre(g, w, h) });
  };
  const surDepot = (ev: DragEvent<SVGSVGElement>) => {
    ev.preventDefault();
    const t = (ev.dataTransfer.getData(TYPE_GLISSE) || typeGlisse(ev)) as TypeElement; const g = versGrille(ev.clientX, ev.clientY);
    setSurvol(null);
    if (!t || !g) return;
    const { w, h } = emprise({ type: t }); const a = ancre(g, w, h);
    if (placeLibre(elements, { type: t, ...a }, cols, rows)) onPlacer?.(t, a.x, a.y); else onCaseRefusee?.();
  };

  const clavierElement = (ev: KeyboardEvent, e: Element) => {
    if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); onSelection?.(e.uid); }
  };

  const valide = survol ? placeLibre(elements, survol, cols, rows, survol.ignorer) : false;
  const sel = elements.find((e) => e.uid === selection);
  const ctx = (e: Element) => ({ palette: pal, type: reglages.type, centres, couleur: couleurDe(e, reglages.ambiance) });

  return (
    <svg
      ref={(n) => { svgLocal.current = n; if (typeof ref === "function") ref(n); else if (ref) ref.current = n; }}
      viewBox={`0 0 ${largeur} ${hauteur}`} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label={tr(elements.length > 1 ? "Scène de l'événement : {n} éléments placés" : "Scène de l'événement : {n} élément placé", { n: elements.length })}
      className="block w-full h-auto select-none" style={{ touchAction: mode ? "none" : "manipulation", cursor: mode ? "crosshair" : "default" }}
      onPointerMove={surMouvement} onPointerUp={surRelache} onPointerLeave={() => { if (!glisse.current) setSurvol(null); }}
      onPointerCancel={() => { glisse.current = null; setSurvol(null); }}
      onDragOver={surSurvolGlisse} onDrop={surDepot} onDragLeave={() => setSurvol(null)}
    >
      <defs>
        <linearGradient id="ciel" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={reglages.lieu === "salle" ? "#FBF6EC" : "#EEF3F2"} />
          <stop offset="1" stopColor="#FBF8F1" />
        </linearGradient>
      </defs>
      <rect x={0} y={0} width={largeur} height={hauteur} fill="url(#ciel)" />
      <g transform={`translate(${ox},${oy})`}>
        <DecorArriere cols={cols} rows={rows} lieu={reglages.lieu} />
        <Sol cols={cols} rows={rows} lieu={reglages.lieu} />
        {sel && <polygon points={contourEmprise(sel.x, sel.y, emprise(sel).w, emprise(sel).h)} fill="#C9A74E" fillOpacity={0.22} stroke="#A8862F" strokeWidth={2} strokeDasharray="6 4" />}
        {mode && !survol && <text x={pt(cols / 2, rows / 2)[0]} y={pt(cols / 2, rows / 2)[1]} textAnchor="middle" fontSize={14} fill="#8A7A58" opacity={0.7} style={{ pointerEvents: "none" }}>{tr("Touchez une zone libre")}</text>}
        {ordre.map((e) => {
          const nom = nomElement(e, reglages.type);
          const enDeplacement = (survol?.ignorer === e.uid) || (mode?.type === "deplacer" && mode.uid === e.uid);
          return (
            <g key={e.uid} data-element={e.type} data-uid={e.uid} data-x={e.x} data-y={e.y} role={lectureSeule ? undefined : "button"} tabIndex={lectureSeule ? undefined : 0}
              aria-label={lectureSeule ? undefined : `${nom}${selection === e.uid ? ` ${tr("(sélectionné)")}` : ""}`}
              onPointerDown={(ev) => surAppuiElement(ev, e)} onKeyDown={(ev) => clavierElement(ev, e)}
              opacity={enDeplacement ? 0.35 : 1} style={{ cursor: lectureSeule ? "default" : mode ? "crosshair" : "grab", pointerEvents: mode ? "none" : "auto", outline: "none", touchAction: lectureSeule ? "auto" : "none" }}>
              {!lectureSeule && <title>{nom}</title>}
              <DessinElement e={e} ctx={ctx(e)} />
            </g>
          );
        })}
        {survol && (
          <g style={{ pointerEvents: "none" }}>
            <polygon points={contourEmprise(survol.x, survol.y, emprise(survol).w, emprise(survol).h)} fill={valide ? "#6FA36B" : "#C2524A"} fillOpacity={0.3} stroke={valide ? "#4E8A4A" : "#A33B33"} strokeWidth={2} strokeDasharray="5 4" />
            {valide && <g opacity={0.6}><DessinElement e={{ uid: "apercu", type: survol.type, x: survol.x, y: survol.y, tourne: survol.tourne }} ctx={{ palette: pal, type: reglages.type, centres }} /></g>}
          </g>
        )}
      </g>
    </svg>
  );
});

export default Scene;
