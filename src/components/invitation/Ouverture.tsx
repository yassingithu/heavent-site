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
}

export default function Ouverture({ type, phase, onOuvrir, libelle, nomsRef, noms }: Props) {
  return (
    <div className="inv-scene">
      <button type="button" className={`inv-porte inv-o-${type}`} onClick={onOuvrir} disabled={phase !== "fermee"} aria-label={libelle} data-testid="invitation-ouvrir" data-ouverture={type}>
        <span className="inv-o-lueur" aria-hidden="true" />
        <span className="inv-o-battant inv-o-g" aria-hidden="true" />
        <span className="inv-o-battant inv-o-d" aria-hidden="true" />
        <span className="inv-o-rai" aria-hidden="true" />
        <span className="inv-o-cartouche"><span><em ref={nomsRef}>{noms}</em></span></span>
      </button>
      <p className="inv-aide" aria-hidden={phase !== "fermee"}>{libelle}</p>
    </div>
  );
}
