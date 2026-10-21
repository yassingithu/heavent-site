import { Link, useNavigate } from "react-router-dom";
import { SERVICES, VILLES } from "@/lib/pagesLocales";
import { Instagram, Phone, Mail, MapPin, Key } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { useTexte } from "@/i18n/textes";

const Footer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const x = useTexte();
  
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img 
                src="/lovable-uploads/df0014d7-d697-4525-a5ee-71cf8fa774ab.png" 
                alt="Heavent People Agency" 
                className="h-18 w-auto md:h-20"
                style={{
                  filter: 'brightness(0) invert(1)'
                }}
              />
            </Link>
            <p className="text-muted-foreground max-w-md mb-4">
              {x("Spécialisée dans l'événementiel, le staffing d'hôtes et hôtesses, et les prestations d'événements. Service professionnel et haut de gamme pour tous vos événements.")}
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/heaventagency" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">{t('nav.home')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/inscription-staff" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.staffRegistration')}
                </Link>
              </li>
              <li>
                <Link to="/devis-entreprise" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('contact.quickActions.businessQuote')}
                </Link>
              </li>
              <li>
                <Link to="/devis-mariage" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('contact.quickActions.weddingQuote')}
                </Link>
              </li>
              <li>
                <Link to="/a-propos" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">{t('nav.contact')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+212 6 10 93 96 55</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span>info@heaventagency.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>{x("Rabat, Maroc")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Nos villes et nos services (pages locales) */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 text-sm" data-testid="pied-villes-services">
          <div>
            <h3 className="font-semibold mb-3">{x("Nos villes")}</h3>
            <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
              {VILLES.map((v) => <li key={v.chemin}><Link to={v.chemin} className="text-muted-foreground hover:text-primary transition-colors">{x("Hôtesses à {ville}", { ville: x(v.nomCourt) })}</Link></li>)}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">{x("Nos services")}</h3>
            <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
              {SERVICES.map((v) => <li key={v.chemin}><Link to={v.chemin} className="text-muted-foreground hover:text-primary transition-colors">{x(v.nomCourt)}</Link></li>)}
              <li><Link to="/realisations" className="text-muted-foreground hover:text-primary transition-colors">{x("Réalisations")}</Link></li>
              <li><Link to="/guides" className="text-muted-foreground hover:text-primary transition-colors">{x("Guides gratuits")}</Link></li>
              <li><Link to="/prestataires" className="text-muted-foreground hover:text-primary transition-colors" data-testid="lien-prestataires">{x("Devenir prestataire partenaire")}</Link></li>
            </ul>
          </div>
        </div>

        {/* Offre professionnelle Heavent Studio (pour les autres agences) */}
        <div className="mt-8 flex justify-center">
          <Link to="/studio" data-testid="lien-studio"
            className="group inline-flex items-center gap-2.5 rounded-full bg-[#141414] text-white pl-2 pr-5 h-11 text-sm shadow-sm hover:bg-black transition">
            <img src="/marque-or.png" alt="" className="h-7 w-7 rounded-full bg-white/5 p-1" />
            <span>{x("Vous êtes une agence ? Heavent Studio")}</span>
            <span className="text-[#E4D49A] transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        <hr className="my-8 border-muted" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Heavent People Agency. {x("Tous droits réservés.")}</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/mentions-legales" className="hover:text-primary transition-colors">
              {x("Mentions légales")}
            </Link>
            <Link to="/politique-confidentialite" className="hover:text-primary transition-colors">
              {x("Politique de confidentialité")}
            </Link>
            <button 
              onClick={() => navigate("/admin-auth")}
              className="hover:text-primary transition-colors opacity-60 hover:opacity-100"
              title={x("Accès Admin")}
            >
              <Key size={16} />
            </button>
            <Link to="/rgpd" className="hover:text-primary transition-colors">
              {x("RGPD")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;