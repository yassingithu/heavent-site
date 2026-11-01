/** Scène 3D (jalon 1, derrière ?3d=1). three.js est chargé à la demande ; en cas d'échec, SceneChoix retombe sur le SVG. */
import { useEffect, useRef, useState } from "react";
import { tr } from "./langue";
import type { SceneProps } from "./Scene";
import type { Moteur } from "./scene3d/moteur";

interface Props extends SceneProps { reduit: boolean; onPret: () => void; onEchec: () => void; /** fondu SVG → 3D : visible quand le moteur est prêt */ visible: boolean; onFondu: () => void }

const CLE_PINCE = "hc3d-pince-vu";

const nuitForcee = (() => { const v = Number(new URLSearchParams(location.search).get("nuit")); return Number.isFinite(v) && new URLSearchParams(location.search).has("nuit") ? Math.max(0, Math.min(1, v)) : null; })();

export default function Scene3D({ r, nuit: nuitJeu, deplacable = false, onDeplacer, onRefus, focus, final, reduit, onPret, onEchec, visible, onFondu, className }: Props) {
  const nuit = nuitForcee ?? nuitJeu;
  const [decalee, setDecalee] = useState(false), [pince, setPince] = useState(false);
  const conteneur = useRef<HTMLDivElement>(null), canvas = useRef<HTMLCanvasElement>(null);
  const moteur = useRef<Moteur | null>(null);
  const rap = useRef({ onDeplacer, onRefus, onPret, onEchec }); rap.current = { onDeplacer, onRefus, onPret, onEchec };
  const dernier = useRef({ r, nuit, deplacable, reduit, focus, final }); dernier.current = { r, nuit, deplacable, reduit, focus, final };

  useEffect(() => {
    let mort = false, m: Moteur | null = null;
    (async () => {
      try {
        const { creerMoteur } = await import("./scene3d/moteur");
        if (mort || !canvas.current || !conteneur.current) return;
        m = creerMoteur(canvas.current, conteneur.current, { onDeplacer: (id, dx, dy) => rap.current.onDeplacer?.(id, dx, dy), onRefus: () => rap.current.onRefus?.(), onDecalee: setDecalee, onPerdu: () => rap.current.onEchec() });
        try { if (matchMedia("(pointer: coarse)").matches && !localStorage.getItem(CLE_PINCE)) { localStorage.setItem(CLE_PINCE, "1"); setPince(true); setTimeout(() => setPince(false), 4000); } } catch { /* stockage indisponible */ }
        moteur.current = m; (window as unknown as { __hc3d?: Moteur }).__hc3d = m; m.maj(dernier.current);
        requestAnimationFrame(() => requestAnimationFrame(() => { if (!mort) { conteneur.current?.setAttribute("data-pret", "1"); rap.current.onPret(); } }));
      } catch { if (!mort) rap.current.onEchec(); }
    })();
    return () => { mort = true; m?.detruire(); moteur.current = null; };
  }, []);

  useEffect(() => { moteur.current?.maj({ r, nuit, deplacable, reduit, focus, final }); }, [r, nuit, deplacable, reduit, focus, final]);

  return (
    <div ref={conteneur} className={className} data-testid="scene-3d" style={{ position: "absolute", inset: 0, opacity: visible ? 1 : 0, transition: reduit ? "none" : "opacity 300ms ease" }} onTransitionEnd={(e) => { if (e.target === e.currentTarget && visible) onFondu(); }}>
      <canvas ref={canvas} role="img" aria-label={r.titre} style={{ width: "100%", height: "100%", display: "block", touchAction: "none" }} />
      {pince && <p className="pointer-events-none absolute inset-x-0 bottom-12 mx-auto w-fit rounded-full bg-black/55 px-3 py-1 text-[12px] text-[#F0E8D6]" role="status">{tr("Pince pour zoomer")}</p>}
      {!final && <button type="button" onClick={() => moteur.current?.vueEnsemble()} data-testid="vue-ensemble" data-decalee={decalee ? "1" : "0"} aria-disabled={!decalee}
        className={`absolute bottom-2 end-3 rounded-full px-3 text-[12px] transition-colors ${decalee ? "bg-[#E8D49A] font-semibold text-[#17141a] shadow-lg" : "bg-black/35 text-[#F0E8D6]/55"}`} style={{ minHeight: 44 }}>{tr("Vue d'ensemble")}</button>}
    </div>
  );
}
