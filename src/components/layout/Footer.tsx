import { Link } from "react-router-dom";
import { SERVICES, VILLES } from "@/lib/pagesLocales";
import { useTranslation } from "react-i18next";
import { useTexte } from "@/i18n/textes";
import { NUMERO_WHATSAPP } from "@/components/BoutonWhatsApp";
import { PAYS_WP, VILLES_WP } from "@/lib/weddingPlannerMaroc";

const Footer = () => {
  const { t } = useTranslation();
  const x = useTexte();

  return (
    <footer className="s-pied s-nuit">
      <div className="s-pied-haut s-wrap">
        <div>
          <Link to="/" aria-label={x("Heavent People Agency, accueil")}>
            <img src="/seuil/logo-heavent-or.png" alt="Heavent People Agency" className="s-logo-pied" width={726} height={214} loading="lazy" />
          </Link>
          <p style={{ marginTop: 22, maxWidth: "38ch" }}>{x("Hôtesses, staff événementiel et mariages, de Rabat à Marrakech et partout au Maroc.")}</p>
        </div>

        <div>
          <h2>{t("nav.contact")}</h2>
          <ul>
            <li><a href="mailto:info@heaventagency.com">info@heaventagency.com</a></li>
            <li><a href="tel:+212610939655" dir="ltr">+212 6 10 93 96 55</a></li>
            <li><a href={`https://wa.me/${NUMERO_WHATSAPP}`} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            <li><a href="https://instagram.com/heaventagency" target="_blank" rel="noopener noreferrer">Instagram · @heaventagency</a></li>
            <li><span>{x("Rabat, Maroc")}</span></li>
          </ul>
        </div>

        <div>
          <h2>{x("L'agence")}</h2>
          <ul>
            <li><Link to="/devis-entreprise">{t("contact.quickActions.businessQuote")}</Link></li>
            <li><Link to="/devis-mariage">{t("contact.quickActions.weddingQuote")}</Link></li>
            <li><Link to="/a-propos">{t("nav.about")}</Link></li>
            <li><Link to="/inscription-staff">{t("nav.staffRegistration")}</Link></li>
            <li><Link to="/auth">{t("nav.staffSpace")}</Link></li>
          </ul>
        </div>

        {/* Nos villes et nos services (pages locales) */}
        <div className="s-pied-colonnes" data-testid="pied-villes-services" style={{ display: "grid", gap: 28 }}>
          <div>
            <h2>{x("Nos villes")}</h2>
            <ul className="s-pied-liens">
              {VILLES.map((v) => <li key={v.chemin}><Link to={v.chemin}>{x("Hôtesses à {ville}", { ville: x(v.nomCourt) })}</Link></li>)}
            </ul>
          </div>
          <div>
            <h2>{x("Nos services")}</h2>
            <ul className="s-pied-liens">
              {SERVICES.map((v) => <li key={v.chemin}><Link to={v.chemin}>{x(v.nomCourt)}</Link></li>)}
              <li><Link to="/realisations">{x("Réalisations")}</Link></li>
              <li><Link to="/guides">{x("Guides gratuits")}</Link></li>
              <li><Link to="/nawar" data-testid="lien-nawar">{x("Nawar — bar à parfums")}</Link></li>
              <li><Link to="/prestataires" data-testid="lien-prestataires">{x("Devenir prestataire partenaire")}</Link></li>
            </ul>
          </div>
          <div>
            {/* Offre professionnelle Heavent Studio (pour les autres agences) */}
            <Link to="/studio" data-testid="lien-studio" className="s-pied-studio">
              <img src="/marque-or.png" alt="" width={30} height={30} loading="lazy" />
              <span>{x("Vous êtes une agence ? Heavent Studio")}</span>
              <span aria-hidden="true" style={{ color: "var(--s-laiton-clair)" }}>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Wedding planner au Maroc : page de référencement, accessible uniquement d'ici */}
      <nav className="s-pied-wp s-wrap" aria-label="Wedding planner au Maroc" data-testid="pied-wedding-planner">
        <h2><Link to="/wedding-planner-maroc">Wedding planner et organisation de mariage au Maroc</Link></h2>
        <p className="s-surtitre">Villes</p>
        <ul>
          {VILLES_WP.map((v) => <li key={v.id}><Link to={`/wedding-planner-maroc#${v.id}`}>Wedding planner {v.nom}</Link></li>)}
        </ul>
        <p className="s-surtitre">Depuis l'étranger</p>
        <ul className="pays">
          {PAYS_WP.map((p) => <li key={p.id}><Link to={`/wedding-planner-maroc?pays=${p.id}`}>Mariage au Maroc depuis {p.de}</Link></li>)}
        </ul>
      </nav>

      <div className="s-pied-bas s-wrap">
        <span>&copy; {new Date().getFullYear()} Heavent People Agency. {x("Tous droits réservés.")}</span>
        <nav aria-label={x("Informations légales")}>
          <Link to="/mentions-legales">{x("Mentions légales")}</Link>
          <Link to="/politique-confidentialite">{x("Politique de confidentialité")}</Link>
          <Link to="/admin-auth" title={x("Accès Admin")}>{x("Accès Admin")}</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
