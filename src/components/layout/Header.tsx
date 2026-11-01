import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTexte } from "@/i18n/textes";

const LANGUES_SITE = [{ code: "fr", abr: "FR", nom: "Français" }, { code: "en", abr: "EN", nom: "English" }, { code: "ar", abr: "ع", nom: "العربية" }];

/** FR · EN · ع : la langue choisie est soulignée (et retenue par le navigateur). */
export function Langues() {
  const { i18n } = useTranslation();
  const actuelle = (i18n.language || "fr").slice(0, 2);
  const changer = (code: string) => {
    i18n.changeLanguage(code);
    document.documentElement.dir = code === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = code;
  };
  return (
    <div className="s-langues" role="group" aria-label={"Langue / Language / اللغة"}>
      {LANGUES_SITE.map((l, i) => (
        <span key={l.code} style={{ display: "contents" }}>
          {i > 0 && <span aria-hidden="true">·</span>}
          <button type="button" lang={l.code} aria-label={l.nom} aria-pressed={actuelle === l.code} onClick={() => changer(l.code)}>{l.abr}</button>
        </span>
      ))}
    </div>
  );
}

/** Où mène « Demander un devis » : le formulaire mariage sur les pages qui parlent de mariage, sinon celui des entreprises. */
export function lienDevis(chemin: string) {
  return /mariage|marrakech|nawar/.test(chemin) ? "/devis-mariage" : "/devis-entreprise";
}

const Header = () => {
  const [ouvert, setOuvert] = useState(false);
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const x = useTexte();
  const boutonMenu = useRef<HTMLButtonElement>(null);
  const boutonFermer = useRef<HTMLButtonElement>(null);
  // « Réalisations » n'apparaît qu'une fois au moins une réalisation publiée (jamais de page vide)
  const [realisations, setRealisations] = useState(false);
  useEffect(() => {
    let annule = false;
    supabase.from("realisations").select("id", { count: "exact", head: true }).eq("publie", true)
      .then(({ count }) => { if (!annule) setRealisations((count ?? 0) > 0); }, () => {});
    return () => { annule = true; };
  }, []);

  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.business"), href: "/devis-entreprise" },
    { name: t("nav.weddings"), href: "/devis-mariage" },
    ...(realisations ? [{ name: t("nav.realisations"), href: "/realisations" }] : []),
    { name: t("nav.about"), href: "/a-propos" },
    { name: t("nav.contact"), href: "/contact" },
  ];
  const devis = lienDevis(pathname);
  // Sur l'accueil, « Demander un devis » descend au choix mariage / entreprise (#devis) au lieu d'imposer un formulaire
  const accueil = pathname === "/";
  const versDevis = (e?: React.MouseEvent) => {
    setOuvert(false);
    if (!accueil) return;
    e?.preventDefault();
    setTimeout(() => document.getElementById("devis")?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }), 60);
  };
  const cibleDevis = accueil ? "/#devis" : devis;

  // Menu ouvert : le fond ne défile plus, Échap ferme, le focus va au bouton « Fermer » puis revient au bouton « Menu »
  useEffect(() => {
    if (!ouvert) return;
    const avant = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    boutonFermer.current?.focus({ preventScroll: true });
    const touche = (e: KeyboardEvent) => { if (e.key === "Escape") fermer(); };
    window.addEventListener("keydown", touche);
    return () => { document.body.style.overflow = avant; window.removeEventListener("keydown", touche); };
  }, [ouvert]);
  const fermer = () => { setOuvert(false); boutonMenu.current?.focus({ preventScroll: true }); };
  // Changement de page : le menu se referme
  useEffect(() => { setOuvert(false); }, [pathname]);

  return (
    <header className="s-entete">
      <div className="s-entete-in">
        <Link to="/" className="s-marque" aria-label={x("Heavent People Agency, accueil")}>
          <img src="/seuil/logo-heavent-or.png" alt="Heavent People Agency" width={726} height={214} />
        </Link>

        <nav className="s-nav" aria-label={x("Navigation principale")}>
          {navigation.map((item) => (
            <Link key={item.href} to={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.name}</Link>
          ))}
          <Langues />
          <Link to={cibleDevis} onClick={versDevis} className="s-btn s-btn-filet" data-testid="entete-devis">{x("Demander un devis")}</Link>
        </nav>

        <div className="s-entete-droite">
          <Link to={cibleDevis} onClick={versDevis} className="s-devis-court">{x("Devis")}</Link>
          <button ref={boutonMenu} type="button" className="s-menu-btn" aria-expanded={ouvert} aria-controls="menu-site" onClick={() => setOuvert(true)} data-testid="ouvrir-menu">
            {x("Menu")} <i aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id="menu-site" className={`s-panneau s-nuit${ouvert ? " ouvert" : ""}`} role="dialog" aria-modal="true" aria-label={x("Menu")} aria-hidden={!ouvert}>
        <div className="s-panneau-tete">
          <img src="/seuil/logo-heavent-or.png" alt="" width={726} height={214} />
          <button ref={boutonFermer} type="button" className="fermer" onClick={fermer} tabIndex={ouvert ? 0 : -1}>{x("Fermer")}</button>
        </div>
        <nav aria-label={x("Navigation principale")}>
          {navigation.map((item) => (
            <Link key={item.href} to={item.href} onClick={() => setOuvert(false)} aria-current={pathname === item.href ? "page" : undefined} tabIndex={ouvert ? 0 : -1}>{item.name}</Link>
          ))}
        </nav>
        <Link to={cibleDevis} onClick={versDevis} className="s-btn s-btn-plein">{x("Demander un devis")} <span className="fl" aria-hidden="true">→</span></Link>
        <div className="s-panneau-pied">
          <Link to="/inscription-staff" onClick={() => setOuvert(false)} tabIndex={ouvert ? 0 : -1}>{t("nav.joinTeam")}</Link>
          <Link to="/auth" onClick={() => setOuvert(false)} tabIndex={ouvert ? 0 : -1}>{t("nav.staffSpace")}</Link>
          <Link to="/prestataires" onClick={() => setOuvert(false)} tabIndex={ouvert ? 0 : -1} data-testid="bouton-prestataires">{x("Devenir prestataire")}</Link>
        </div>
        <Langues />
      </div>
    </header>
  );
};

export default Header;
