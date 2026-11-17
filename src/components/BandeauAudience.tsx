import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTexte } from "@/i18n/textes";
import { activerGoogle, definirChoixAudience, useChoixAudience } from "@/lib/audience";

/** Demande le consentement avant de charger la mesure d'audience Google. Deux boutons de même poids. */
const BandeauAudience = () => {
  const x = useTexte();
  const choix = useChoixAudience();

  useEffect(() => { if (choix === "oui") activerGoogle(); }, [choix]);

  // Sur téléphone le bandeau couvre toute la largeur : les boutons flottants (langue, WhatsApp) montent au-dessus de lui
  const bandeau = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = bandeau.current; if (!el) return;
    const racine = document.documentElement;
    const mesurer = () => racine.style.setProperty("--bandeau-h", `${el.offsetHeight}px`);
    mesurer();
    const ro = new ResizeObserver(mesurer); ro.observe(el);
    return () => { ro.disconnect(); racine.style.removeProperty("--bandeau-h"); };
  }, [choix]);

  if (choix) return null;

  return (
    <div ref={bandeau} role="region" aria-label={x("Mesure d'audience")} data-testid="bandeau-audience" className="bandeau-audience print:hidden">
      <div className="bandeau-audience-int s-nuit">
        <p className="s-surtitre vu">{x("Mesure d'audience")} <i className="s-filet" /></p>
        <p className="bandeau-audience-texte">
          {x("Avec votre accord, nous utilisons la balise Google Ads. Elle dépose des cookies et envoie des données à Google, hors du Maroc, pour mesurer les résultats de nos annonces. Refuser ne change rien à votre visite.")}{" "}
          <Link to="/politique-confidentialite#mesure-audience">{x("En savoir plus")}</Link>
        </p>
        <div className="bandeau-audience-actions">
          <button type="button" data-testid="audience-refuser" onClick={() => definirChoixAudience("non")} className="s-btn s-btn-filet">{x("Refuser")}</button>
          <button type="button" data-testid="audience-accepter" onClick={() => definirChoixAudience("oui")} className="s-btn s-btn-filet">{x("Accepter")}</button>
        </div>
      </div>
    </div>
  );
};

export default BandeauAudience;
