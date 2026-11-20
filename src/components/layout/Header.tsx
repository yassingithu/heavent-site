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

/**
 * Menu déroulant de la barre du haut (Événement, Se connecter).
 * Safari ne donne pas le focus aux liens au clic : on ne ferme donc sur « perte de focus » que si le focus part vraiment ailleurs
 * (sinon le menu se refermait avant que le clic sur le lien n'aboutisse : « Espace Staff ne fait rien »).
 */
function MenuDeroulant({ titre, liens, actif, discret }: { titre: string; liens: { nom: string; href: string; id?: string }[]; actif?: boolean; discret?: boolean }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const { pathname } = useLocation();
  useEffect(() => { if (ref.current) ref.current.open = false; }, [pathname]);
  useEffect(() => {
    const dehors = (e: Event) => { if (ref.current?.open && !ref.current.contains(e.target as Node)) ref.current.open = false; };
    const echap = (e: KeyboardEvent) => { if (e.key === "Escape" && ref.current?.open) { ref.current.open = false; ref.current.querySelector("summary")?.focus(); } };
    document.addEventListener("pointerdown", dehors); document.addEventListener("keydown", echap);
    return () => { document.removeEventListener("pointerdown", dehors); document.removeEventListener("keydown", echap); };
  }, []);
  return (
    <details ref={ref} className={`s-nav-acces${discret ? "" : " s-nav-menu"}${actif ? " actif" : ""}`}
      onKeyDown={(e) => {
        if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
        const el = ref.current; if (!el) return;
        const liens = Array.from(el.querySelectorAll<HTMLElement>(".s-nav-acces-liste a"));
        const i = liens.indexOf(document.activeElement as HTMLElement);
        if (!el.open) { if (e.key === "ArrowDown") { e.preventDefault(); el.open = true; setTimeout(() => liens[0]?.focus(), 0); } return; }
        e.preventDefault();
        const suivant = e.key === "ArrowDown" ? liens[Math.min(liens.length - 1, i + 1)] : i <= 0 ? el.querySelector<HTMLElement>("summary") : liens[i - 1];
        suivant?.focus();
      }}
      onBlur={(e) => { const vers = e.relatedTarget as Node | null; if (ref.current?.open && vers && !ref.current.contains(vers)) ref.current.open = false; }}>
      <summary>{titre}</summary>
      <div className="s-nav-acces-liste">
        {liens.map((l) => <Link key={l.href} to={l.href} data-testid={l.id} aria-current={pathname === l.href ? "page" : undefined}>{l.nom}</Link>)}
      </div>
    </details>
  );
}

const Header = () => {
  const [ouvert, setOuvert] = useState(false);
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const x = useTexte();
  const boutonMenu = useRef<HTMLButtonElement>(null);
  const boutonFermer = useRef<HTMLButtonElement>(null);
  // « Réalisations » reste cachée tant que la galerie n'est pas assez fournie (la page existe toujours, mais n'est plus proposée).
  const evenements = [
    { nom: x("Mariage"), href: "/devis-mariage", id: "menu-evenement-mariage" },
    { nom: x("Entreprise"), href: "/devis-entreprise", id: "menu-evenement-entreprise" },
  ];
  const connexion = [
    { nom: x("Espace crew"), href: "/auth", id: "menu-connexion-crew" },
  ];
  const evenementActif = evenements.some((e) => e.href === pathname);
  const navigation = [
    { name: t("nav.home"), href: "/" },
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
          <img src="/seuil/logo-heavent-or.webp" alt="Heavent People Agency" width={520} height={153} />
        </Link>

        <nav className="s-nav" aria-label={x("Navigation principale")}>
          <Link to="/" aria-current={pathname === "/" ? "page" : undefined}>{t("nav.home")}</Link>
          <MenuDeroulant titre={x("Événement")} liens={evenements} actif={evenementActif} />
          {navigation.slice(1).map((item) => (
            <Link key={item.href} to={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.name}</Link>
          ))}
          <span className="s-nav-sep" aria-hidden="true" />
          <Link to="/prestataires" className="s-nav-sec" aria-current={pathname === "/prestataires" ? "page" : undefined} data-testid="bouton-prestataires-ordi">{x("Devenir prestataire")}</Link>
          <Link to="/inscription-staff" className="s-nav-sec" aria-current={pathname === "/inscription-staff" ? "page" : undefined} data-testid="bouton-staff-ordi">{x("Devenir hôtesse / staff")}</Link>
          <Link to="/auth" className="s-nav-sec" aria-current={pathname === "/auth" ? "page" : undefined} data-testid="menu-connexion-crew">{x("Espace crew")}</Link>
          <Langues />
          <Link to={cibleDevis} onClick={versDevis} className="s-btn s-btn-filet" data-testid="entete-devis">{x("Demander un devis")}</Link>
        </nav>

        <div className="s-entete-droite">
          <Link to={cibleDevis} onClick={versDevis} className="s-devis-court">{x("Devis")}</Link>
          <button ref={boutonMenu} type="button" className="s-menu-btn" aria-label={x("Ouvrir le menu")} aria-expanded={ouvert} aria-controls="menu-site" onClick={() => setOuvert(true)} data-testid="ouvrir-menu">
            {x("Menu")} <i aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id="menu-site" className={`s-panneau s-nuit${ouvert ? " ouvert" : ""}`} role="dialog" aria-modal="true" aria-label={x("Menu")} aria-hidden={!ouvert}>
        <div className="s-panneau-tete">
          <img src="/seuil/logo-heavent-or.webp" alt="" width={520} height={153} />
          <button ref={boutonFermer} type="button" className="fermer" onClick={fermer} tabIndex={ouvert ? 0 : -1}>{x("Fermer")}</button>
        </div>
        <nav aria-label={x("Navigation principale")}>
          <Link to="/" onClick={() => setOuvert(false)} aria-current={pathname === "/" ? "page" : undefined} tabIndex={ouvert ? 0 : -1}>{t("nav.home")}</Link>
          <p className="s-panneau-groupe">{x("Événement")}</p>
          {evenements.map((item) => (
            <Link key={item.href} to={item.href} onClick={() => setOuvert(false)} aria-current={pathname === item.href ? "page" : undefined} tabIndex={ouvert ? 0 : -1}>{item.nom}</Link>
          ))}
          <span className="s-panneau-sep" aria-hidden="true" />
          {navigation.slice(1).map((item) => (
            <Link key={item.href} to={item.href} onClick={() => setOuvert(false)} aria-current={pathname === item.href ? "page" : undefined} tabIndex={ouvert ? 0 : -1}>{item.name}</Link>
          ))}
          <span className="s-panneau-sep" aria-hidden="true" />
          <p className="s-panneau-groupe">{x("Travailler avec nous")}</p>
          <Link to="/inscription-staff" onClick={() => setOuvert(false)} aria-current={pathname === "/inscription-staff" ? "page" : undefined} tabIndex={ouvert ? 0 : -1} data-testid="bouton-staff">{x("Devenir hôtesse / staff")}</Link>
          <Link to="/prestataires" onClick={() => setOuvert(false)} aria-current={pathname === "/prestataires" ? "page" : undefined} tabIndex={ouvert ? 0 : -1} data-testid="bouton-prestataires">{x("Devenir prestataire")}</Link>
        </nav>
        <Link to={cibleDevis} onClick={versDevis} className="s-btn s-btn-plein">{x("Demander un devis")} <span className="fl" aria-hidden="true">→</span></Link>
        <div className="s-panneau-pied">
          <p className="s-panneau-groupe">{x("Se connecter")}</p>
          {connexion.map((l) => <Link key={l.href} to={l.href} onClick={() => setOuvert(false)} tabIndex={ouvert ? 0 : -1}>{l.nom}</Link>)}
        </div>
        <Langues />
      </div>
    </header>
  );
};

export default Header;
