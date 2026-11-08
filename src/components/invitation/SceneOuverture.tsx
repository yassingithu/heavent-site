import type { SceneOuverture as Scene } from "@/lib/invitation";

/** Poussière d'or qui monte derrière les battants. Effet de lumière uniquement (aucun dessin) ; désactivé si l'invité réduit les animations. */
const ETINCELLES = Array.from({ length: 16 }, (_, i) => ({ x: 8 + ((i * 53) % 84), d: (i % 6) * 0.13, s: 9 + ((i * 7) % 10), t: 1.3 + ((i * 11) % 7) / 10 }));

export default function SceneOuverture({ scene }: { scene: Scene }) {
  return (
    <span className={`inv-o-revele inv-o-sc-${scene}`} aria-hidden="true">
      {ETINCELLES.map((e, i) => (
        <i key={i} className="inv-sc-etincelle" style={{ left: `${e.x}%`, width: e.s, height: e.s, animationDelay: `${0.15 + e.d}s`, animationDuration: `${e.t}s` }} />
      ))}
    </span>
  );
}
