import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FUNCTIONS_URL } from "@/integrations/supabase/client";
import { useTexte } from "@/i18n/textes";
import { useChoixAudience } from "@/lib/audience";
import { NUMERO_WHATSAPP } from "@/components/BoutonWhatsApp";

/**
 * « Parlez à un assistant » : une hôtesse (dessin original Heavent) assise près du bouton WhatsApp se lève,
 * puis ouvre un petit panneau. Choix du profil → réponse courte + boutons-liens (identifiants fermés,
 * jamais de lien venant du serveur). Questions libres traitées par la fonction « assistant-site » (Groq).
 */

type Pose = "assise" | "debout" | "salue";
type Profil = "maries" | "entreprise" | "crew" | "prestataire" | "nawar" | "autre";
type LienId = "devis-mariage" | "devis-entreprise" | "inscription-staff" | "espace-staff" | "prestataires" | "nawar" | "contact" | "whatsapp" | "heavent-city";

const PAGES_PRIVEES = ["/admin", "/auth", "/staff-dashboard", "/cartes", "/rsvp/", "/invitation/", "/liste/", "/reponse/", "/souvenirs/"];
const CLE_VUE = "heavent-hotesse-vue";
const CLE_APPELS = "heavent-hotesse-appels";
const CLE_BADGE = "heavent-hotesse-badge";
const MAX_APPELS = 12;
const MESSAGE_MAX = 320;
const lire = (c: string) => { try { return sessionStorage.getItem(c); } catch { return null; } };
const ecrire = (c: string, v: string) => { try { sessionStorage.setItem(c, v); } catch { /* sans mémoire : l'assistant marche quand même */ } };

const LIENS: Record<LienId, { chemin?: string; label: string; externe?: boolean }> = {
  "devis-mariage": { chemin: "/devis-mariage", label: "Demander mon devis mariage ou fête" },
  "devis-entreprise": { chemin: "/devis-entreprise", label: "Demander un devis entreprise" },
  "inscription-staff": { chemin: "/inscription-staff", label: "M'inscrire comme hôtesse ou staff" },
  "espace-staff": { chemin: "/auth", label: "Me connecter à mon espace" },
  prestataires: { chemin: "/prestataires", label: "Devenir prestataire partenaire" },
  nawar: { chemin: "/nawar", label: "Découvrir Nawar" },
  contact: { chemin: "/contact", label: "Écrire à l'équipe" },
  whatsapp: { label: "Écrire sur WhatsApp", externe: true },
  "heavent-city": { chemin: "/cree-ton-evenement", label: "Jouer à Heavent City" },
};

const PROFILS: { id: Profil; label: string }[] = [
  { id: "maries", label: "Mariage ou fête" },
  { id: "entreprise", label: "Entreprise" },
  { id: "crew", label: "Hôtesse ou staff" },
  { id: "prestataire", label: "Prestataire" },
  { id: "nawar", label: "Parfums Nawar" },
];

interface Reponse { reponse: string; liens: LienId[] }

/** Hôtesse d'accueil (dessin original Heavent) : blazer noir, chemisier crème, jupe crayon, cheveux longs ondulés, talons.
 *  Trois poses : assise sur un tabouret, debout, debout en présentant de la main. `buste` = cadrage tête et épaules (en-tête du panneau). */
function Hotesse({ pose, buste }: { pose: Pose; buste?: boolean }) {
  const or = "#A8933F", orC = "#E4D49A", nuit = "#141414", peau = "#D8AE88", cheveux = "#3a2417", creme = "#F3ECDD";
  const manche = (d: string) => (<><path d={d} fill="none" stroke={or} strokeWidth="8.6" strokeLinecap="round" strokeLinejoin="round" /><path d={d} fill="none" stroke={nuit} strokeWidth="6.8" strokeLinecap="round" strokeLinejoin="round" /></>);
  const jambe = (d: string) => <path d={d} fill="none" stroke={peau} strokeWidth="6" strokeLinecap="round" />;
  const talon = (x: number, y: number) => <path d={`M${x} ${y} h9 l-1 5 h-9 z M${x} ${y + 5} v3`} fill={nuit} stroke={nuit} strokeWidth="1.6" strokeLinejoin="round" />;
  return (
    <svg className="hot-svg" data-pose={pose} viewBox={buste ? "14 6 72 66" : "0 0 100 190"} aria-hidden focusable="false">
      {!buste && <ellipse cx="50" cy="185" rx="26" ry="3.2" fill="#000" opacity=".28" />}
      {!buste && (
        <g className="hot-tabouret" fill="none" stroke={or} strokeWidth="1.4" strokeLinecap="round">
          <ellipse cx="50" cy="118" rx="19" ry="4" fill="#26211a" />
          <path d="M36 121 L30 184 M64 121 L70 184 M50 122 V184 M33 160 H67" />
        </g>
      )}
      <g className="hot-fig">
        {/* cheveux longs ondulés (derrière) */}
        <path d="M37 29 C33 6 67 6 63 29 C69 42 66 58 70 76 C65 70 62 79 58 68 L42 68 C38 79 35 70 30 76 C34 58 31 42 37 29 Z" fill={cheveux} />
        {!buste && <g className="hot-assise">
          {jambe("M44 128 L40 172")}{jambe("M57 128 L52 172")}
          {talon(33, 172)}{talon(46, 172)}
          <path d="M35 98 L65 98 L69 124 L31 124 Z" fill={nuit} stroke={or} strokeWidth="1.1" strokeLinejoin="round" />
        </g>}
        {!buste && <g className="hot-debout">
          {jambe("M43 135 L43 176")}{jambe("M57 135 L57 176")}
          {talon(36, 176)}{talon(56, 176)}
          <path d="M35 98 L65 98 L63 138 L37 138 Z" fill={nuit} stroke={or} strokeWidth="1.1" strokeLinejoin="round" />
        </g>}
        {/* buste */}
        <rect x="45" y="39" width="10" height="11" fill={peau} />
        <path d="M45 44 L50 62 L55 44 Z" fill={creme} />
        <path d="M36 52 Q36 45 45 44 L50 66 L49 100 L34 100 Z M64 52 Q64 45 55 44 L50 66 L51 100 L66 100 Z" fill={nuit} stroke={or} strokeWidth="1.1" strokeLinejoin="round" />
        <path d="M45 44 L50 66 L55 44" fill="none" stroke={orC} strokeWidth="1.1" strokeLinejoin="round" />
        <rect x="55.5" y="63" width="7" height="4.6" rx=".6" fill={orC} /><path d="M57.6 64.4v1.8M60.4 64.4v1.8M57.6 65.3h2.8" stroke={nuit} strokeWidth=".9" fill="none" />
        {/* bras */}
        {!buste && <g className="hot-assise">{manche("M38 51 L35 78 L44 112")}{manche("M62 51 L65 78 L56 112")}<circle cx="44" cy="115" r="3.4" fill={peau} /><circle cx="56" cy="115" r="3.4" fill={peau} /></g>}
        {!buste && <g className="hot-debout">{manche("M38 51 L34 76 L37 97")}<circle cx="37.5" cy="100" r="3.4" fill={peau} />
          <g className="hot-bras-d">{manche("M62 51 L66 76 L63 97")}<circle cx="62.5" cy="100" r="3.4" fill={peau} /></g>
          <g className="hot-presente"><g className="hot-main">{manche("M62 51 L74 66 L87 60")}<ellipse cx="90" cy="58.5" rx="4.6" ry="3" fill={peau} transform="rotate(-18 90 58.5)" /></g></g>
        </g>}
        {buste && <>{manche("M38 51 L34 76")}{manche("M62 51 L66 76")}</>}
        {/* tête */}
        <ellipse cx="50" cy="30" rx="9.6" ry="11.6" fill={peau} />
        <path d="M40 30 C39 14 61 14 60 30 C58 22 53 20 48 20.5 C44 21 41 24 40 30 Z" fill={cheveux} />
        <circle cx="45.2" cy="34" r="1.2" fill={orC} /><circle cx="54.8" cy="34" r="1.2" fill={orC} />
        <circle cx="46.6" cy="30.5" r="1.15" fill={nuit} /><circle cx="53.4" cy="30.5" r="1.15" fill={nuit} />
        <path d="M46.8 36.4 Q50 39.4 53.2 36.4" fill="none" stroke="#7a2e2a" strokeWidth="1.3" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default function AssistantSite() {
  const x = useTexte();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const choix = useChoixAudience();
  const [pose, setPose] = useState<Pose>("assise");
  const [bulle, setBulle] = useState(false);
  const [ouvert, setOuvert] = useState(false);
  const [reponse, setReponse] = useState<Reponse | null>(null);
  const [charge, setCharge] = useState(false);
  const [erreur, setErreur] = useState(false);
  const [texte, setTexte] = useState("");
  const [clique, setClique] = useState(false);
  const [badge, setBadge] = useState(() => lire(CLE_BADGE) === "1");
  const survol = useRef(false);
  const bouton = useRef<HTMLButtonElement>(null);
  const titre = useRef<HTMLHeadingElement>(null);
  const panneau = useRef<HTMLDivElement>(null);
  const minuteurs = useRef<number[]>([]);
  const prive = PAGES_PRIVEES.some((p) => pathname === p.replace(/\/$/, "") || pathname.startsWith(p));
  const reduit = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const nettoyer = () => { minuteurs.current.forEach((m) => window.clearTimeout(m)); minuteurs.current = []; };
  const apres = (ms: number, f: () => void) => { minuteurs.current.push(window.setTimeout(f, ms)); };

  // Invitation : une seule fois par visite, après le choix sur le bandeau d'audience, jamais pendant l'ouverture du site
  const inviter = useCallback(() => {
    if (lire(CLE_VUE) === "1") return;
    const racine = document.documentElement;
    if (racine.classList.contains("avec-ouverture") && !racine.classList.contains("ouverture-finie")) return;
    ecrire(CLE_VUE, "1");
    setPose(reduit ? "salue" : "debout");
    if (!reduit) apres(350, () => setPose("salue"));
    apres(reduit ? 0 : 1300, () => setBulle(true));
    const seRassoit = () => {
      if (survol.current) { apres(3000, seRassoit); return; }
      setBulle(false);
      apres(250, () => setPose("assise"));
    };
    apres(7000 + (reduit ? 0 : 1300), seRassoit);
  }, [reduit]);

  useEffect(() => {
    if (prive || !choix || ouvert) return;
    if (lire(CLE_VUE) === "1") return;
    const minuteur = window.setTimeout(inviter, 8000);
    const defiler = () => {
      const haut = document.documentElement.scrollHeight - window.innerHeight;
      if (haut > 0 && window.scrollY / haut > 0.35) inviter();
    };
    window.addEventListener("scroll", defiler, { passive: true });
    return () => { window.clearTimeout(minuteur); window.removeEventListener("scroll", defiler); };
  }, [prive, choix, ouvert, inviter]);

  useEffect(() => () => nettoyer(), []);

  const ouvrir = () => {
    nettoyer(); ecrire(CLE_VUE, "1");
    setBulle(false); setPose("debout"); setOuvert(true);
  };
  const fermer = useCallback(() => {
    setOuvert(false); setPose("assise");
    window.setTimeout(() => bouton.current?.focus(), 0);
  }, []);

  useEffect(() => {
    if (!ouvert) return;
    titre.current?.focus();
    const touche = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); fermer(); return; }
      if (e.key !== "Tab" || !panneau.current) return;
      const cibles = Array.from(panneau.current.querySelectorAll<HTMLElement>("button:not([disabled]), a[href], textarea, input, [tabindex='0']"));
      if (!cibles.length) return;
      const premier = cibles[0], dernier = cibles[cibles.length - 1];
      if (e.shiftKey && (document.activeElement === premier || document.activeElement === titre.current)) { e.preventDefault(); dernier.focus(); }
      else if (!e.shiftKey && document.activeElement === dernier) { e.preventDefault(); premier.focus(); }
    };
    document.addEventListener("keydown", touche);
    return () => document.removeEventListener("keydown", touche);
  }, [ouvert, fermer]);

  // Changer de page referme le panneau
  useEffect(() => { setOuvert(false); setPose("assise"); }, [pathname]);

  const demander = async (corps: { profil?: Profil; message?: string }) => {
    setErreur(false); setClique(false);
    const nb = Number(lire(CLE_APPELS) ?? 0) || 0;
    // Les boutons de profil n'appellent aucun modèle : ils ne comptent pas dans la limite de la visite
    if (corps.message) {
      if (nb >= MAX_APPELS) { setReponse({ reponse: x("Beaucoup de questions pour cette visite ! L'équipe vous répondra mieux que moi : écrivez-lui."), liens: ["contact", "whatsapp"] }); return; }
      ecrire(CLE_APPELS, String(nb + 1));
    }
    setCharge(true);
    const ctrl = new AbortController();
    const minuteur = window.setTimeout(() => ctrl.abort(), 10000);
    try {
      const r = await fetch(`${FUNCTIONS_URL}/assistant-site`, {
        method: "POST", headers: { "Content-Type": "application/json" }, signal: ctrl.signal,
        body: JSON.stringify({ ...corps, langue: x.langue }),
      });
      const j = await r.json().catch(() => null);
      const ids = (Array.isArray(j?.liens) ? j.liens : []).filter((l: unknown): l is LienId => typeof l === "string" && l in LIENS).slice(0, 2);
      if (j?.disponible && typeof j.reponse === "string" && j.reponse) setReponse({ reponse: j.reponse, liens: ids.length ? ids : ["contact", "whatsapp"] });
      else throw new Error("indisponible");
    } catch {
      setErreur(true);
      setReponse({ reponse: x("Imane est indisponible pour le moment. L'équipe Heavent vous répondra sous 24 h."), liens: ["whatsapp", "contact"] });
    } finally {
      window.clearTimeout(minuteur); setCharge(false);
    }
  };

  const envoyer = (e: React.FormEvent) => {
    e.preventDefault();
    const m = texte.trim();
    if (!m || charge) return;
    setTexte(""); setReponse(null);
    void demander({ message: m });
  };

  const suivre = (id: LienId) => {
    ecrire(CLE_BADGE, "1"); setBadge(true); setClique(true);
    const l = LIENS[id];
    if (l.externe) {
      const msg = x("Bonjour Heavent People Agency, j'aimerais avoir des informations.");
      window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
      return;
    }
    if (l.chemin) { fermer(); navigate(l.chemin); }
  };

  const recommencer = () => { setReponse(null); setErreur(false); setClique(false); setTexte(""); titre.current?.focus(); };

  if (prive) return null;
  // L'hôtesse n'apparaît qu'après le choix sur le bandeau d'audience (jamais par-dessus lui)
  if (!choix && !ouvert) return null;

  const etape = clique ? 3 : reponse ? 2 : 1;
  const dir = x.langue === "ar" ? "rtl" : "ltr";

  return (
    <>
      {!ouvert && (
        <div className="hot-zone" data-pose={pose}>
          {bulle && (
            <p className="hot-bulle" role="status" dir={dir}>{x("Besoin d'un coup de main ?")}</p>
          )}
          <button ref={bouton} type="button" className="hot-btn" data-testid="bouton-assistant" aria-label={x("Parler à Imane, l'assistante virtuelle Heavent")} aria-haspopup="dialog" aria-expanded={false}
            onClick={ouvrir}
            onMouseEnter={() => { survol.current = true; }} onMouseLeave={() => { survol.current = false; }}
            onFocus={() => { survol.current = true; }} onBlur={() => { survol.current = false; }}>
            <Hotesse pose={pose} />
          </button>
        </div>
      )}
      {ouvert && (
        <div className="hot-panneau" role="dialog" aria-modal="true" aria-labelledby="hot-titre" dir={dir} ref={panneau} data-testid="assistant-panneau">
          <div className="hot-panneau-int">
            <header className="hot-tete">
              <span className="hot-tete-fig" aria-hidden><Hotesse pose="debout" buste /></span>
              <div className="hot-tete-txt">
                <p className="hot-surtitre">{x("Assistante virtuelle Heavent")}{badge && <span className="hot-badge">{x("Invité·e Heavent")}</span>}</p>
                <h2 id="hot-titre" ref={titre} tabIndex={-1}>Imane</h2>
              </div>
              <button type="button" className="hot-fermer" onClick={fermer} aria-label={x("Fermer")} data-testid="assistant-fermer">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M5 5l14 14M19 5L5 19" /></svg>
              </button>
            </header>
            <ol className="hot-etapes" aria-label={x("Progression")}>
              {[x("Votre profil"), x("Ma réponse"), x("C'est parti")].map((t, i) => (
                <li key={t} className={i < etape ? "ok" : ""} aria-current={i + 1 === etape ? "step" : undefined}><span>{t}</span></li>
              ))}
            </ol>
            <div className="hot-corps" aria-live="polite">
              {!reponse && !charge && (
                <>
                  <p className="hot-mot">{x("Bonjour, je suis Imane, l'assistante virtuelle de Heavent. Qui êtes-vous ? Je vous envoie au bon endroit en un clic.")}</p>
                  <div className="hot-choix">
                    {PROFILS.map((p) => (
                      <button key={p.id} type="button" className="hot-chip" data-testid={`assistant-profil-${p.id}`} onClick={() => void demander({ profil: p.id })}>{x(p.label)}</button>
                    ))}
                  </div>
                </>
              )}
              {charge && <p className="hot-mot hot-attente">{x("Je réfléchis…")}</p>}
              {reponse && !charge && (
                <>
                  <p className="hot-reponse" data-testid="assistant-reponse">{reponse.reponse}</p>
                  <div className="hot-liens">
                    {reponse.liens.map((id) => (
                      <button key={id} type="button" className="s-btn s-btn-filet hot-lien" data-testid={`assistant-lien-${id}`} onClick={() => suivre(id)}>{x(LIENS[id].label)}</button>
                    ))}
                  </div>
                  {clique && <p className="hot-merci">{x("Merci ! L'équipe Heavent est là si besoin.")}</p>}
                  <button type="button" className="hot-retour" onClick={recommencer}>{x("Poser une autre question")}</button>
                </>
              )}
            </div>
            <form className="hot-saisie" onSubmit={envoyer}>
              <label className="sr-only" htmlFor="hot-texte">{x("Votre question")}</label>
              <input id="hot-texte" value={texte} onChange={(e) => setTexte(e.target.value.slice(0, MESSAGE_MAX))} placeholder={x("Écrivez votre question")} maxLength={MESSAGE_MAX} autoComplete="off" enterKeyHint="send" disabled={charge && !erreur} />
              <button type="submit" disabled={!texte.trim() || charge} aria-label={x("Envoyer")}>
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
              </button>
            </form>
            <p className="hot-notice">{x("Ne saisissez ni coordonnées, ni pièce d'identité, ni données de santé. Vos questions libres sont traitées par un service d'IA hors du Maroc ; les boutons ne le sont pas.")}</p>
          </div>
        </div>
      )}
    </>
  );
}
