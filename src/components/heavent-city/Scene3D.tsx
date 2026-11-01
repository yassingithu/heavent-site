/** Scène 3D (jalon 1, derrière ?3d=1). three.js est chargé à la demande ; en cas d'échec, SceneChoix retombe sur le SVG. */
import { useEffect, useRef } from "react";
import type { SceneProps } from "./Scene";
import type { Moteur } from "./scene3d/moteur";

interface Props extends SceneProps { reduit: boolean; onPret: () => void; onEchec: () => void }

const nuitForcee = (() => { const v = Number(new URLSearchParams(location.search).get("nuit")); return Number.isFinite(v) && new URLSearchParams(location.search).has("nuit") ? Math.max(0, Math.min(1, v)) : null; })();

export default function Scene3D({ r, nuit: nuitJeu, deplacable = false, onDeplacer, onRefus, focus, reduit, onPret, onEchec, className }: Props) {
  const nuit = nuitForcee ?? nuitJeu;
  const conteneur = useRef<HTMLDivElement>(null), canvas = useRef<HTMLCanvasElement>(null);
  const moteur = useRef<Moteur | null>(null);
  const rap = useRef({ onDeplacer, onRefus, onPret, onEchec }); rap.current = { onDeplacer, onRefus, onPret, onEchec };
  const dernier = useRef({ r, nuit, deplacable, reduit, focus }); dernier.current = { r, nuit, deplacable, reduit, focus };

  useEffect(() => {
    let mort = false, m: Moteur | null = null;
    (async () => {
      try {
        const { creerMoteur } = await import("./scene3d/moteur");
        if (mort || !canvas.current || !conteneur.current) return;
        m = creerMoteur(canvas.current, conteneur.current, { onDeplacer: (id, dx, dy) => rap.current.onDeplacer?.(id, dx, dy), onRefus: () => rap.current.onRefus?.() });
        moteur.current = m; (window as unknown as { __hc3d?: Moteur }).__hc3d = m; m.maj(dernier.current);
        requestAnimationFrame(() => requestAnimationFrame(() => { if (!mort) { conteneur.current?.setAttribute("data-pret", "1"); rap.current.onPret(); } }));
      } catch { if (!mort) rap.current.onEchec(); }
    })();
    return () => { mort = true; m?.detruire(); moteur.current = null; };
  }, []);

  useEffect(() => { moteur.current?.maj({ r, nuit, deplacable, reduit, focus }); }, [r, nuit, deplacable, reduit, focus]);

  return (
    <div ref={conteneur} className={className} data-testid="scene-3d" style={{ position: "absolute", inset: 0 }}>
      <canvas ref={canvas} role="img" aria-label={r.titre} style={{ width: "100%", height: "100%", display: "block", touchAction: "none" }} />
      <button type="button" onClick={() => moteur.current?.vueEnsemble()} data-testid="vue-ensemble" className="absolute bottom-2 end-3 rounded-full bg-black/45 px-3 text-[12px] text-[#F0E8D6]" style={{ minHeight: 44 }}>Vue d'ensemble</button>
    </div>
  );
}
