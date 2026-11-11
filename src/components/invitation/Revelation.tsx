import { useCallback, useEffect, useRef, useState } from "react";

/** Cœur doré à gratter : le doigt (ou la souris) découvre la date. Bouton « Découvrir » toujours présent, et
 *  révélation d'office après quelques secondes sans geste : personne ne reste bloqué. */
const L = 260, H = 240, ROND = "M20 120A110 110 0 0 1 240 120A110 110 0 0 1 20 120Z", COEUR = "M130 225C20 150 0 90 0 62C0 26 28 2 64 2C92 2 116 18 130 44C144 18 168 2 196 2C232 2 260 26 260 62C260 90 240 150 130 225Z";
const SEUIL = 0.5;

/** `secret` : le contenu n'existe pas dans la page tant que l'invité n'a pas gratté (rien à lire dans le code ni au lecteur d'écran). */
interface Props { sous: { haut: string; jour: string; bas: string } | null; titre: string; bouton: string; noms: string; onFini: () => void; secret?: boolean; rond?: boolean; /** posé sur la carte, à la place de la date */ enLigne?: boolean }

export default function Revelation({ sous, titre, bouton, noms, onFini, secret = false, rond = false, enLigne = false }: Props) {
  const FORME = rond ? ROND : COEUR;
  const cv = useRef<HTMLCanvasElement>(null);
  const [fini, setFini] = useState(false);
  const [aGratte, setAGratte] = useState(false);
  const termine = useRef(false);
  const dernier = useRef(Date.now());

  /* onFini change à chaque rendu du parent : on le garde dans une référence, sinon le canevas serait redessiné pendant le grattage */
  const finiRef = useRef(onFini); finiRef.current = onFini;
  const reveler = useCallback(() => {
    if (termine.current) return;
    termine.current = true; setFini(true);
    window.setTimeout(() => finiRef.current(), 950);
  }, []);

  useEffect(() => {
    const c = cv.current; if (!c) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    c.width = L * dpr; c.height = H * dpr;
    const g = c.getContext("2d", { willReadFrequently: true }); if (!g) return;
    g.scale(dpr, dpr);
    const couleur = getComputedStyle(c).getPropertyValue("--inv-accent").trim() || "#B8923A";
    const d = g.createLinearGradient(0, 0, L, H);
    d.addColorStop(0, couleur); d.addColorStop(0.45, "#f3e3a8"); d.addColorStop(1, couleur);
    g.fillStyle = d; g.fillRect(0, 0, L, H);
    g.globalAlpha = rond ? 0.05 : 0.16; g.fillStyle = "#000";
    for (let i = 0; i < (rond ? 90 : 380); i++) g.fillRect(Math.random() * L, Math.random() * H, 1.4, 1.4);
    g.globalAlpha = 1;
    g.globalCompositeOperation = "destination-out"; g.lineWidth = 30; g.lineCap = "round"; g.lineJoin = "round";
    let bas = false, px = 0, py = 0;
    const pos = (e: PointerEvent) => { const r = c.getBoundingClientRect(); return [((e.clientX - r.left) / r.width) * L, ((e.clientY - r.top) / r.height) * H]; };
    const dessous = (e: PointerEvent) => { if (termine.current) return; const [x, y] = pos(e); g.beginPath(); g.moveTo(px, py); g.lineTo(x, y); g.stroke(); px = x; py = y; dernier.current = Date.now(); };
    const down = (e: PointerEvent) => { bas = true; c.setPointerCapture?.(e.pointerId); [px, py] = pos(e); setAGratte(true); dessous(e); };
    const move = (e: PointerEvent) => { if (bas) dessous(e); };
    const up = () => { bas = false; };
    c.addEventListener("pointerdown", down); c.addEventListener("pointermove", move); c.addEventListener("pointerup", up); c.addEventListener("pointercancel", up);
    /* Part grattée : on échantillonne une grille de points, pas toute l'image (forme du cœur testée sur un canevas sans échelle) */
    const test = document.createElement("canvas").getContext("2d");
    const forme = new Path2D(FORME);
    const mesure = window.setInterval(() => {
      if (termine.current) return;
      let nets = 0, total = 0;
      for (let ix = 0; ix < 22; ix++) for (let iy = 0; iy < 20; iy++) {
        const x = (ix + 0.5) * (L / 22), y = (iy + 0.5) * (H / 20);
        if (!test || !test.isPointInPath(forme, x, y)) continue;
        total++;
        if (g.getImageData(Math.floor(x * dpr), Math.floor(y * dpr), 1, 1).data[3] < 40) nets++;
      }
      if (total && nets / total >= SEUIL) reveler();
      else if (Date.now() - dernier.current > 9000) reveler();
    }, 280);
    return () => { window.clearInterval(mesure); c.removeEventListener("pointerdown", down); c.removeEventListener("pointermove", move); c.removeEventListener("pointerup", up); c.removeEventListener("pointercancel", up); };
  }, [reveler, FORME, rond]);

  return (
    <div className={`inv-rev ${fini ? "is-fini" : ""}${enLigne ? " inv-rev-ligne" : ""}`} data-testid="invitation-revelation">
      {!enLigne && <p className="inv-rev-noms">{noms}</p>}
      <div className="inv-rev-cadre"><div className="inv-rev-coeur" style={{ clipPath: `path('${FORME}')`, WebkitClipPath: `path('${FORME}')` }}>
        {sous && (!secret || fini) && <div className="inv-rev-sous" aria-hidden={!fini}><small>{sous.haut}</small><b>{sous.jour}</b><small>{sous.bas}</small></div>}
        <canvas ref={cv} className="inv-rev-gratte" aria-hidden="true" />
        {rond && <svg className="inv-rev-anneau" viewBox="0 0 260 240" aria-hidden="true"><circle cx="130" cy="120" r="104" fill="none" stroke="#8C6D22" strokeWidth="1.5" /><circle cx="130" cy="120" r="96" fill="none" stroke="#8C6D22" strokeWidth=".8" opacity=".7" /></svg>}
      </div></div>
      <p className={`inv-aide inv-rev-aide ${aGratte ? "is-vu" : ""}`}>{titre}</p>
      <button type="button" className="inv-g-passer" onClick={reveler} data-testid="invitation-decouvrir">{bouton}</button>
    </div>
  );
}
