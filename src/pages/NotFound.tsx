import Seo from "@/components/Seo";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Bouton, Etoile } from "@/components/seuil/Seuil";
import { useTexte } from "@/i18n/textes";

const NotFound = () => {
  const x = useTexte();
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <section className="s-platre" style={{ fontFamily: "var(--s-texte)" }}>
      <Seo noindex />
      <div className="s-section s-wrap">
        <div className="s-fairepart s-merci">
          <Etoile /><Etoile className="bas" />
          <div className="s-fp-tete">404</div>
          <h1 className="s-h3" style={{ marginTop: 10 }}>{x("Page non trouvée")}</h1>
          <p className="s-texte" style={{ marginTop: 14 }}>{x("Désolé, la page que vous recherchez n'existe pas ou a été déplacée.")}</p>
          <div className="s-actions" style={{ justifyContent: "center", marginTop: 24 }}>
            <Bouton to="/" variante="plein" sombre>{x("Retour à l'accueil")}</Bouton>
          </div>
          <p className="s-note" style={{ marginTop: 18 }}>
            <Link to="/contact" className="s-lien" style={{ marginInlineEnd: 18 }}>Contact</Link>
            <Link to="/a-propos" className="s-lien">{x("À propos")}</Link>
          </p>
          <p className="s-note" style={{ marginTop: 10 }}>{x("Route demandée :")} <code>{location.pathname}</code></p>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
