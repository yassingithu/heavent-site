import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTexte } from "@/i18n/textes";
import { supabase } from "@/integrations/supabase/client";

/**
 * Accueil : carte « Vous cherchez une mission ? » pour les candidats hôtes et hôtesses.
 * Beaucoup écrivaient un e-mail au lieu de s'inscrire : la carte les mène à l'inscription staff.
 * Elle n'arrive qu'une fois le titre de la page passé (défilement), sans voile : le client lit d'abord.
 * Sur téléphone c'est une bande compacte. Fermée : elle ne revient pas avant 90 jours ; inscription cliquée : plus jamais.
 */
const CLE = "heavent-appel-candidats";
const QUATRE_VINGT_DIX_JOURS = 90 * 24 * 3600 * 1000;
const lire = () => { try { return localStorage.getItem(CLE); } catch { return null; } };
const masquee = () => { const v = lire(); return v === "inscrit" || (!!v && Date.now() - Number(v) < QUATRE_VINGT_DIX_JOURS); };
const noter = (v: string) => { try { localStorage.setItem(CLE, v); } catch { /* sans stockage : la carte reviendra */ } };

export default function AppelCandidats() {
  const x = useTexte();
  const [etat, setEtat] = useState<"attente" | "ouverte" | "sortie" | "fermee">("attente");
  const carte = useRef<HTMLElement>(null);

  useEffect(() => {
    if (masquee()) { setEtat("fermee"); return; }
    let actif = true;
    const voir = () => {
      // téléphone : après un écran entier ; ordinateur : dès que le titre est passé
      const seuil = window.innerHeight * (window.innerWidth <= 640 ? 0.9 : 0.4);
      if (window.scrollY < seuil) return;
      window.removeEventListener("scroll", voir);
      setEtat((e) => (e === "attente" ? "ouverte" : e));
    };
    // une personne déjà connectée (crew, administratrice) n'a pas besoin de l'invitation
    supabase.auth.getSession().then(({ data }) => { if (!actif) return; if (data.session) setEtat("fermee"); else { window.addEventListener("scroll", voir, { passive: true }); voir(); } })
      .catch(() => { if (actif) { window.addEventListener("scroll", voir, { passive: true }); voir(); } });
    return () => { actif = false; window.removeEventListener("scroll", voir); };
  }, []);

  // le bouton WhatsApp remonte au-dessus de la bande tant qu'elle est là
  useEffect(() => {
    const racine = document.documentElement;
    if (etat !== "ouverte") { racine.style.removeProperty("--candidats-h"); return; }
    const poser = () => racine.style.setProperty("--candidats-h", `${carte.current?.offsetHeight ?? 0}px`);
    poser();
    window.addEventListener("resize", poser);
    const touche = (e: KeyboardEvent) => { if (e.key === "Escape") fermer(); };
    window.addEventListener("keydown", touche);
    return () => { window.removeEventListener("resize", poser); window.removeEventListener("keydown", touche); racine.style.removeProperty("--candidats-h"); };
  }, [etat]);

  const fermer = () => {
    noter(String(Date.now()));
    setEtat(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "fermee" : "sortie");
  };
  if (etat === "attente" || etat === "fermee") return null;

  return (
    <aside ref={carte} className={`s-candidats s-nuit${etat === "sortie" ? " sort" : ""}`} aria-labelledby="t-candidats" data-testid="appel-candidats" dir={x.langue === "ar" ? "rtl" : undefined}
      onAnimationEnd={(e) => { if (etat === "sortie" && e.target === e.currentTarget) setEtat("fermee"); }}>
      <button type="button" className="s-candidats-fermer" onClick={fermer} aria-label={x("Fermer")} data-testid="appel-candidats-fermer">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
      <div className="s-candidats-mots">
        <p className="s-candidats-sur">{x("Hôtes et hôtesses")}</p>
        <h2 id="t-candidats" className="s-candidats-titre">{x("Vous cherchez une mission ?")}</h2>
        <p className="s-candidats-texte">{x("L'inscription se fait ici, en quelques minutes : inutile de nous écrire par e-mail.")}</p>
      </div>
      <div className="s-candidats-actions">
        <Link to="/inscription-staff" className="s-btn s-btn-filet" onClick={() => noter("inscrit")} data-testid="appel-candidats-inscription">{x("M'inscrire")}<span className="fl" aria-hidden="true">→</span></Link>
        <button type="button" className="s-candidats-non" onClick={fermer} data-testid="appel-candidats-non">{x("Non merci")}</button>
      </div>
    </aside>
  );
}
