import type { Ref, ReactNode } from "react";

/** Ouvertures animées de l'invitation : la porte marocaine est une photo (deux moitiés WebP), les autres sont encore dessinées en SVG/CSS, chacune sur le même principe
 *  — deux battants, un cartouche avec les prénoms, une lueur derrière — pour rester interchangeables. */

const clous = (x: number) => [18, 34, 50, 66, 82, 98, 114, 130, 146, 162, 178].map((y) => <circle key={`${x}${y}`} cx={x} cy={y} r="1.15" fill="currentColor" />);

/* Battant gauche (le droit en est le reflet) : viewBox 50 × 200 */
function Battant({ type }: { type: string }) {
  const trait = { fill: "none", stroke: "currentColor", strokeWidth: 0.7, vectorEffect: "non-scaling-stroke" as const };
  switch (type) {
    case "marocaine":
      return null; /* photo réaliste : voir ouvertures.css */
    case "fer":
      return (
        <svg viewBox="0 0 50 200" preserveAspectRatio="none" aria-hidden="true">
          <g {...trait} strokeWidth={1.1}>
            {[6, 14, 22, 30, 38].map((x) => <path key={x} d={`M${x} 14V200`} />)}
            <path d="M0 40H50M0 108H50M0 176H50" />
            {[6, 14, 22, 30, 38].map((x) => <path key={`l${x}`} d={`M${x} 14l-2.6 -7 2.6 -6 2.6 6z`} />)}
            <path d="M6 40c8 10 8 24 16 28s16-8 16-18M6 108c8 10 8 24 16 28s16-8 16-18" />
            <path d="M14 176c4-12 12-12 16-4s10 8 14-2" />
            <circle cx="50" cy="108" r="13" /><circle cx="50" cy="108" r="8" strokeOpacity=".6" />
          </g>
        </svg>
      );
    case "artdeco":
      return (
        <svg viewBox="0 0 50 200" preserveAspectRatio="none" aria-hidden="true">
          <g {...trait}>
            <rect x="3" y="3" width="44" height="194" /><rect x="7" y="7" width="40" height="186" strokeOpacity=".55" />
            {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M50 122L${(i * 50) / 8} 28`} />)}
            <path d="M50 122m-30 0a30 30 0 0 1 30-30M50 122m-18 0a18 18 0 0 1 18-18M50 122m-42 0a42 42 0 0 1 42-42" strokeOpacity=".65" />
            <path d="M7 150H47M7 158H47" strokeOpacity=".5" />
          </g>
          <circle cx="44" cy="108" r="3.4" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

interface Props {
  type: string;
  phase: "fermee" | "ouverture";
  onOuvrir: () => void;
  libelle: string;
  nomsRef: Ref<HTMLElement>;
  noms: ReactNode;
}

export default function Ouverture({ type, phase, onOuvrir, libelle, nomsRef, noms }: Props) {
  return (
    <div className="inv-scene">
      <button type="button" className={`inv-porte inv-o-${type}`} onClick={onOuvrir} disabled={phase !== "fermee"} aria-label={libelle} data-testid="invitation-ouvrir" data-ouverture={type}>
        <span className="inv-o-lueur" aria-hidden="true" />
        <span className="inv-o-battant inv-o-g" aria-hidden="true"><Battant type={type} /></span>
        <span className="inv-o-battant inv-o-d" aria-hidden="true"><Battant type={type} /></span>
        <span className="inv-o-rai" aria-hidden="true" />
        <span className="inv-o-cartouche"><span><em ref={nomsRef}>{noms}</em></span></span>
      </button>
      <p className="inv-aide" aria-hidden={phase !== "fermee"}>{libelle}</p>
    </div>
  );
}
