import type { Ref, ReactNode } from "react";

/** Ouvertures animées de l'invitation : de vraies photos coupées en deux battants (public/ouvertures/<type>-g|d.webp),
 *  animées en CSS 3D. Chaque type partage la même structure (battants, cartouche des prénoms, lueur) pour rester interchangeable. */

interface Props {
  type: string;
  phase: "fermee" | "ouverture";
  onOuvrir: () => void;
  libelle: string;
  nomsRef: Ref<HTMLElement>;
  noms: ReactNode;
  /** Initiales des mariés, affichées dans le sceau de cire. */
  initiales: string;
  libelleBouton: string;
}

/** Ouverture de chaque décor (en proportions de l'image) : seuls les battants s'ouvrent, le cadre reste fixe. */
const OUVERTURE_PATH: Record<string, string> = {
  marocaine: "M0.0696 1V0.47C0.0696 0.30 0.27 0.075 0.5 0.075C0.73 0.075 0.9304 0.30 0.9304 0.47V1Z",
  fer: "M0.067 0.975V0.21C0.067 0.08 0.25 0.005 0.5 0.005C0.75 0.005 0.933 0.08 0.933 0.21V0.975Z",
  artdeco: "M0.068 0.885V0.06H0.932V0.885Z",
  rideaux: "M0 0.115H1V1H0Z",
};

function Defs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <defs>
        {Object.entries(OUVERTURE_PATH).map(([t, d]) => (
          <g key={t}>
            <clipPath id={`inv-in-${t}`} clipPathUnits="objectBoundingBox"><path d={d} /></clipPath>
            <clipPath id={`inv-out-${t}`} clipPathUnits="objectBoundingBox"><path clipRule="evenodd" d={`M0 0H1V1H0Z ${d}`} /></clipPath>
          </g>
        ))}
      </defs>
    </svg>
  );
}

export default function Ouverture({ type, phase, onOuvrir, libelle, nomsRef, noms, initiales, libelleBouton }: Props) {
  return (
    <div className="inv-scene">
      <Defs />
      <button type="button" className={`inv-porte inv-o-${type}`} onClick={onOuvrir} disabled={phase !== "fermee"} aria-label={libelle} data-testid="invitation-ouvrir" data-ouverture={type}>
        <span className="inv-o-monde" aria-hidden="true">
        <span className="inv-o-lueur" />
        <span className="inv-o-battants" aria-hidden="true">
          <span className="inv-o-battant inv-o-g" />
          <span className="inv-o-battant inv-o-d" />
        </span>
        {type in OUVERTURE_PATH && <span className="inv-o-cadre" aria-hidden="true"><span className="inv-o-g" /><span className="inv-o-d" /></span>}
        <span className="inv-o-rai" />
        </span>
        {/* ── CALQUE FIXE PERSONNALISABLE ───────────────────────────────────────────────
            Pour mettre VOTRE cadre (arche royale, rideaux drapés, couronne florale…) :
            1. déposez un PNG transparent dans  public/ouvertures/  (ex. mon-cadre.png)
            2. dans src/styles/ouvertures.css, règle  .inv-o-surcadre  : décommentez la ligne
               « background-image » et mettez  url("/ouvertures/mon-cadre.png").
            Ce calque reste immobile, passe au-dessus des battants et ne bloque jamais les clics. */}
        <span className="inv-o-surcadre" aria-hidden="true" />
        {/* Sceau de cire : les initiales viennent des prénoms saisis dans l'administration. */}
        <span className="inv-o-sceau" aria-hidden="true"><em ref={nomsRef}>{initiales}</em></span>
        <span className="inv-o-ouvrir">{libelleBouton}</span>
        <span className="inv-sr-seul">{noms}</span>
      </button>
      <p className="inv-aide" aria-hidden={phase !== "fermee"}>{libelle}</p>
    </div>
  );
}
