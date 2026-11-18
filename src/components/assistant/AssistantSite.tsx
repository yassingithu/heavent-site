import { useCallback, useEffect, useRef, useState } from "react";
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

const PAGES_PRIVEES = ["/admin", "/auth", "/staff-dashboard", "/cartes", "/rsvp/", "/invitation/", "/liste/", "/reponse/", "/souvenirs/", "/mon-devis/"];
// Pages où la personne remplit déjà un formulaire : l'hôtesse reste assise, sans invitation animée
const PAGES_FORMULAIRE = ["/devis-mariage", "/devis-entreprise", "/inscription-staff", "/prestataires"];
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

/** Réponses des boutons de profil : écrites ici (aucun réseau, aucune IA) ; le serveur ne sert que pour la saisie libre. */
const LOCAL: Record<Exclude<Profil, "autre">, { liens: LienId[]; texte: Record<"fr" | "en" | "ar", string> }> = {
  maries: { liens: ["devis-mariage", "whatsapp"], texte: {
    fr: "Pour un mariage, un henné ou une fête, le plus simple est de demander votre devis : donnez la ville, la période et ce dont vous avez besoin. L'équipe répond sous 24 h.",
    en: "For a wedding, henna night or party, the simplest is to request your quote: share the city, the period and what you need. The team replies within 24 hours.",
    ar: "للأعراس والحنّاء والحفلات، الأبسط أن تطلبوا عرضكم: اذكروا المدينة والفترة وما تحتاجونه. يردّ الفريق خلال 24 ساعة." } },
  entreprise: { liens: ["devis-entreprise", "whatsapp"], texte: {
    fr: "Pour un salon, un séminaire ou un congrès, demandez un devis entreprise : hôtesses, staff ou organisation complète. L'équipe répond sous 24 h.",
    en: "For a trade show, seminar or conference, request a business quote: hostesses, staff or full organisation. The team replies within 24 hours.",
    ar: "للمعارض والندوات والمؤتمرات، اطلبوا عرضاً للشركات: مضيفات أو طاقم أو تنظيم كامل. يردّ الفريق خلال 24 ساعة." } },
  crew: { liens: ["inscription-staff", "espace-staff"], texte: {
    fr: "Pour travailler avec nous comme hôtesse ou staff, inscrivez-vous (18 ans ou plus). L'inscription ne garantit pas de mission, mais elle vous met dans notre équipe. Déjà inscrite ? Connectez-vous à votre espace.",
    en: "To work with us as a hostess or staff member, register (18 or over). Registering doesn't guarantee a mission, but it puts you in our team. Already registered? Sign in to your space.",
    ar: "للعمل معنا كمضيفة أو ضمن الطاقم، سجّلوا (18 سنة فما فوق). التسجيل لا يضمن مهمة لكنه يضعكم ضمن فريقنا. مسجّلة من قبل؟ ادخلوا إلى فضائكم." } },
  prestataire: { liens: ["prestataires"], texte: {
    fr: "Heavent recrute des partenaires (traiteurs, DJ, photographes, décorateurs…). L'inscription est gratuite et sans commission sur vos prix. L'équipe étudie votre dossier et répond sous 48 h.",
    en: "Heavent recruits partners (caterers, DJs, photographers, decorators…). Registration is free, with no commission on your prices. The team reviews your file and replies within 48 hours.",
    ar: "تبحث Heavent عن شركاء (متعهدو حفلات، دي جي، مصورون، مصممو ديكور…). التسجيل مجاني ودون عمولة على أسعاركم. يدرس الفريق ملفكم ويردّ خلال 48 ساعة." } },
  nawar: { liens: ["nawar", "whatsapp"], texte: {
    fr: "Nawar est notre bar à parfums : les mariés ou les hôtes choisissent les parfums qu'ils offrent à leurs invités, et chacun repart avec son flacon. Demandez une formule sur mesure.",
    en: "Nawar is our perfume bar: the couple or hosts choose the fragrances they offer their guests, and everyone leaves with a bottle. Ask for a tailored formula.",
    ar: "نوّار هو ركن العطور لدينا: يختار العروسان أو المضيفون العطور التي يقدّمونها لضيوفهم، ويغادر كل ضيف بقارورته. اطلبوا صيغة على مقاسكم." } },
};

export default function AssistantSite() {
  const x = useTexte();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const choix = useChoixAudience();
  const [pose, setPose] = useState<Pose>("assise");
  const [bulle, setBulle] = useState(false);
  const [ouvert, setOuvert] = useState(false);
  const [menu, setMenu] = useState(false);
  const [reponse, setReponse] = useState<Reponse | null>(null);
  const [charge, setCharge] = useState(false);
  const [erreur, setErreur] = useState(false);
  const [texte, setTexte] = useState("");
  const [dernier, setDernier] = useState("");
  const [clavier, setClavier] = useState(0);
  const [badge, setBadge] = useState(() => lire(CLE_BADGE) === "1");
  const survol = useRef(false);
  const bouton = useRef<HTMLButtonElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const toile = useRef<HTMLCanvasElement>(null);
  const travail = useRef<HTMLCanvasElement | null>(null);
  const images = useRef<Record<string, HTMLImageElement>>({});
  const boucle = useRef(0);
  const titre = useRef<HTMLHeadingElement>(null);
  const panneau = useRef<HTMLDivElement>(null);
  const corps = useRef<HTMLDivElement>(null);
  const minuteurs = useRef<number[]>([]);
  const prive = PAGES_PRIVEES.some((p) => pathname === p.replace(/\/$/, "") || pathname.startsWith(p));
  const formulaire = PAGES_FORMULAIRE.some((p) => pathname.startsWith(p));
  const reduit = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  // Affichage : images à fond transparent, et vidéo « paquet » (couleur à gauche, transparence à droite) recomposée sur la toile
  const poser = useCallback((nom: "assise" | "presente") => {
    const c = toile.current, g = c?.getContext("2d"), img = images.current[nom];
    if (!c || !g || !img?.complete) return;
    g.clearRect(0, 0, c.width, c.height); g.drawImage(img, 0, 0, c.width, c.height);
  }, []);
  const composer = useCallback(() => {
    const v = video.current, c = toile.current, g = c?.getContext("2d");
    if (!v || !c || !g || v.readyState < 2) return;
    const t = (travail.current ??= document.createElement("canvas"));
    t.width = 520; t.height = 360;
    const w = t.getContext("2d", { willReadFrequently: true });
    if (!w) return;
    w.drawImage(v, 0, 0, 520, 360);
    const src = w.getImageData(0, 0, 520, 360).data, out = g.createImageData(260, 360), d = out.data;
    for (let y = 0; y < 360; y++) for (let x = 0; x < 260; x++) {
      const i = (y * 520 + x) * 4, k = i + 260 * 4, j = (y * 260 + x) * 4;
      d[j] = src[i]; d[j + 1] = src[i + 1]; d[j + 2] = src[i + 2]; d[j + 3] = src[k];
    }
    g.putImageData(out, 0, 0);
  }, []);
  const lire_ = useCallback(() => {
    const v = video.current;
    if (!v) return;
    const tick = () => { composer(); if (!v.paused && !v.ended) boucle.current = requestAnimationFrame(tick); };
    cancelAnimationFrame(boucle.current); boucle.current = requestAnimationFrame(tick);
  }, [composer]);
  useEffect(() => {
    ["assise", "presente"].forEach((n) => {
      const img = new Image(); img.onload = () => { if (n === "assise") poser("assise"); }; img.src = `/assistant/hotesse-${n}.webp`; images.current[n] = img;
    });
    return () => cancelAnimationFrame(boucle.current);
  }, [poser]);

  // Le canvas n'existe qu'après le choix d'audience : on y redépose la pose assise dès qu'il apparaît
  useEffect(() => { if (choix || ouvert) poser("assise"); }, [choix, ouvert, poser]);

  const nettoyer = () => { minuteurs.current.forEach((m) => window.clearTimeout(m)); minuteurs.current = []; };
  const apres = (ms: number, f: () => void) => { minuteurs.current.push(window.setTimeout(f, ms)); };

  // Invitation : une seule fois par visite, après le choix sur le bandeau d'audience, jamais pendant l'ouverture du site,
  // jamais sur une page de formulaire ni quand la personne est en train d'écrire.
  const inviter = useCallback(() => {
    if (lire(CLE_VUE) === "1" || document.hidden) return;
    const racine = document.documentElement;
    if (racine.classList.contains("avec-ouverture") && !racine.classList.contains("ouverture-finie")) return;
    const actif = document.activeElement;
    if (actif && /^(INPUT|TEXTAREA|SELECT)$/.test(actif.tagName)) return;
    ecrire(CLE_VUE, "1");
    const v = video.current;
    const sansVideo = () => { setPose("salue"); poser("presente"); setBulle(true); };
    if (reduit || !v) sansVideo();
    else {
      setPose("debout");
      v.currentTime = 0;
      v.play().then(lire_).catch(sansVideo);
      apres(4300, () => { setPose("salue"); setBulle(true); });
    }
    const seRassoit = () => {
      if (survol.current) { apres(3000, seRassoit); return; }
      setBulle(false);
      apres(250, () => { setPose("assise"); video.current?.pause(); cancelAnimationFrame(boucle.current); poser("assise"); });
    };
    apres(reduit ? 7000 : 10500, seRassoit);
  }, [reduit, poser, lire_]);

  useEffect(() => {
    if (prive || formulaire || !choix || ouvert) return;
    if (lire(CLE_VUE) === "1") return;
    const charge3 = window.setTimeout(() => { const v = video.current; if (v && v.readyState === 0 && v.paused) v.load(); }, 3000);
    const minuteur = window.setTimeout(inviter, 8000);
    const defiler = () => {
      const haut = document.documentElement.scrollHeight - window.innerHeight;
      if (haut > 0 && window.scrollY / haut > 0.35) inviter();
    };
    window.addEventListener("scroll", defiler, { passive: true });
    return () => { window.clearTimeout(charge3); window.clearTimeout(minuteur); window.removeEventListener("scroll", defiler); };
  }, [prive, formulaire, choix, ouvert, inviter]);

  useEffect(() => () => nettoyer(), []);
  useEffect(() => {
    if (!menu) return;
    const t = (e: KeyboardEvent) => { if (e.key === "Escape") { assoir(); bouton.current?.focus(); } };
    const hors = (e: PointerEvent) => { if (!(e.target as HTMLElement).closest?.(".hot-zone")) assoir(); };
    document.addEventListener("keydown", t); document.addEventListener("pointerdown", hors);
    return () => { document.removeEventListener("keydown", t); document.removeEventListener("pointerdown", hors); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menu]);

  // Clic sur l'hôtesse : elle se lève et propose deux chemins (Imane ou WhatsApp)
  const lever = () => {
    if (menu) { assoir(); return; }
    nettoyer(); ecrire(CLE_VUE, "1");
    setBulle(false); setMenu(true);
    const v = video.current;
    if (reduit || !v) { setPose("salue"); poser("presente"); return; }
    setPose("debout"); v.currentTime = 0;
    v.play().then(lire_).catch(() => { setPose("salue"); poser("presente"); });
    apres(4300, () => setPose("salue"));
  };
  const assoir = () => {
    nettoyer(); setMenu(false); setPose("assise");
    video.current?.pause(); cancelAnimationFrame(boucle.current); poser("assise");
  };
  const whatsapp = () => {
    const msg = x("Bonjour Heavent People Agency, j'aimerais avoir des informations.");
    window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    assoir();
  };
  const ouvrir = () => {
    setMenu(false);
    nettoyer(); ecrire(CLE_VUE, "1");
    video.current?.pause(); cancelAnimationFrame(boucle.current); poser("presente");
    setBulle(false); setPose("salue"); setOuvert(true);
  };
  const fermer = useCallback(() => {
    setOuvert(false); setPose("assise"); poser("assise");
    window.setTimeout(() => bouton.current?.focus(), 0);
  }, [poser]);

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

  // Téléphone : le clavier ne doit pas cacher le champ de saisie
  useEffect(() => {
    const vv = window.visualViewport;
    if (!ouvert || !vv) return;
    const suivre = () => setClavier(Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop)));
    suivre();
    vv.addEventListener("resize", suivre); vv.addEventListener("scroll", suivre);
    return () => { vv.removeEventListener("resize", suivre); vv.removeEventListener("scroll", suivre); setClavier(0); };
  }, [ouvert]);

  // Changer de page referme le panneau
  useEffect(() => { setOuvert(false); setMenu(false); setPose("assise"); }, [pathname]);

  const afficher = (r: Reponse) => {
    setReponse(r);
    window.setTimeout(() => (corps.current?.querySelector<HTMLElement>(".hot-lien") ?? titre.current)?.focus(), 60);
  };

  // Boutons de profil : réponse immédiate, sans réseau
  const choisir = (p: Exclude<Profil, "autre">) => {
    setErreur(false);
    const l = LOCAL[p];
    afficher({ reponse: l.texte[x.langue], liens: l.liens });
  };

  const demander = async (message: string) => {
    setErreur(false); setDernier(message);
    const nb = Number(lire(CLE_APPELS) ?? 0) || 0;
    if (nb >= MAX_APPELS) { afficher({ reponse: x("Beaucoup de questions pour cette visite ! L'équipe vous répondra mieux que moi : écrivez-lui."), liens: ["contact", "whatsapp"] }); return; }
    ecrire(CLE_APPELS, String(nb + 1));
    setCharge(true);
    const ctrl = new AbortController();
    const minuteur = window.setTimeout(() => ctrl.abort(), 10000);
    try {
      const r = await fetch(`${FUNCTIONS_URL}/assistant-site`, {
        method: "POST", headers: { "Content-Type": "application/json" }, signal: ctrl.signal,
        body: JSON.stringify({ message, langue: x.langue }),
      });
      const j = await r.json().catch(() => null);
      const ids = (Array.isArray(j?.liens) ? j.liens : []).filter((l: unknown): l is LienId => typeof l === "string" && l in LIENS).slice(0, 2);
      if (j?.disponible && typeof j.reponse === "string" && j.reponse) { setTexte(""); afficher({ reponse: j.reponse, liens: ids.length ? ids : ["contact", "whatsapp"] }); }
      else throw new Error("indisponible");
    } catch {
      setErreur(true); // le texte reste dans le champ : un clic sur « Réessayer » suffit
      afficher({ reponse: x("Imane est indisponible pour le moment. L'équipe Heavent vous répondra sous 24 h."), liens: ["whatsapp", "contact"] });
    } finally {
      window.clearTimeout(minuteur); setCharge(false);
    }
  };

  const envoyer = (e: React.FormEvent) => {
    e.preventDefault();
    const m = texte.trim();
    if (!m || charge) return;
    setReponse(null);
    void demander(m);
  };

  const suivre = (id: LienId) => {
    ecrire(CLE_BADGE, "1"); setBadge(true);
    const l = LIENS[id];
    if (l.externe) {
      const msg = x("Bonjour Heavent People Agency, j'aimerais avoir des informations.");
      window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
      return;
    }
    if (l.chemin) { fermer(); navigate(l.chemin); }
  };

  const recommencer = () => { setReponse(null); setErreur(false); setTexte(""); window.setTimeout(() => titre.current?.focus(), 30); };

  if (prive) return null;
  // L'hôtesse n'apparaît qu'après le choix sur le bandeau d'audience (jamais par-dessus lui)
  if (!choix && !ouvert) return null;

  const dir = x.langue === "ar" ? "rtl" : "ltr";

  return (
    <>
      {/* La zone reste montée pendant l'ouverture du panneau : la vidéo garde sa position et se rejoue proprement */}
      <div className={"hot-zone" + (ouvert ? " cachee" : "")} data-pose={pose}>
        {bulle && !ouvert && (
          <button type="button" className="hot-bulle" dir={dir} onClick={ouvrir} tabIndex={-1} aria-hidden>{x("Besoin d'un coup de main ?")}</button>
        )}
        <span className="sr-only" role="status">{bulle && !ouvert ? x("Besoin d'un coup de main ?") : ""}</span>
        {menu && !ouvert && (
          <div className="hot-menu" role="menu" aria-label={x("Comment souhaitez-vous poser vos questions ?")}>
            <p className="hot-menu-t">{x("Comment souhaitez-vous poser vos questions ?")}</p>
            <button type="button" role="menuitem" className="hot-menu-b hot-menu-imane" data-testid="assistant-menu-imane" onClick={ouvrir}>
              <strong>{x("Poser mes questions à Imane")}</strong><span>{x("Assistante virtuelle, réponse immédiate")}</span>
            </button>
            <button type="button" role="menuitem" className="hot-menu-b" data-testid="assistant-menu-whatsapp" onClick={whatsapp}>
              <strong>{x("Écrire sur WhatsApp")}</strong><span>{x("L'équipe Heavent vous répond")}</span>
            </button>
          </div>
        )}
        <button ref={bouton} type="button" className="hot-btn" data-testid="bouton-assistant" aria-label={x("Parler à Imane, l'assistante virtuelle Heavent")} aria-haspopup="menu" aria-expanded={menu || ouvert}
          tabIndex={ouvert ? -1 : 0} onClick={lever}
          onMouseEnter={() => { survol.current = true; }} onMouseLeave={() => { survol.current = false; }}
          onFocus={() => { survol.current = true; }} onBlur={() => { survol.current = false; }}>
          <span className="hot-scene" aria-hidden>
            <svg className="hot-chaise" viewBox="0 0 520 720" preserveAspectRatio="none" focusable="false">
              <defs>
                <linearGradient id="hot-ch-a" x1="0" x2="1"><stop offset="0" stopColor="#f4f1ea" /><stop offset="1" stopColor="#d9d4c8" /></linearGradient>
                <linearGradient id="hot-ch-b" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#efebe2" /><stop offset="1" stopColor="#cfc9ba" /></linearGradient>
              </defs>
              <path d="M18 372 Q18 360 34 360 L58 360 Q74 360 74 376 L84 620 L26 610 Z" fill="url(#hot-ch-a)" />
              <path d="M8 520 Q8 514 20 514 L70 520 L76 560 L30 556 Q16 556 16 640 L26 654 L14 656 Q4 540 8 520Z" fill="#e6e1d4" />
              <path d="M36 598 Q150 586 244 654 Q252 662 238 666 L74 668 Q36 660 30 628 Z" fill="url(#hot-ch-b)" />
              <path d="M38 662 L240 668 L236 676 L44 672 Z" fill="#b9b3a3" />
              <rect x="170" y="672" width="14" height="36" rx="5" fill="#cfc9ba" />
              <path d="M82 706 Q176 692 270 706 L270 714 L82 714 Z" fill="#d6d1c3" />
            </svg>
            <canvas ref={toile} className="hot-toile" width="260" height="360" />
            <video ref={video} className="hot-video" muted playsInline preload="none" disablePictureInPicture tabIndex={-1} width="520" height="360" onEnded={() => { cancelAnimationFrame(boucle.current); composer(); }}>
              <source src="/assistant/hotesse-paquet.mp4" type="video/mp4" />
              <source src="/assistant/hotesse-paquet.webm" type="video/webm" />
            </video>
          </span>
          <span className="hot-etiquette" aria-hidden>{x("Aide")}</span>
        </button>
      </div>
      {ouvert && (
        <div className="hot-panneau" role="dialog" aria-modal="true" aria-labelledby="hot-titre" aria-describedby="hot-accueil" dir={dir} ref={panneau} data-testid="assistant-panneau" style={clavier ? { bottom: clavier } : undefined}>
          <div className="hot-panneau-int s-nuit">
            <header className="hot-tete">
              <span className="hot-tete-fig" aria-hidden><img src="/assistant/hotesse-visage.webp" alt="" width="56" height="56" /></span>
              <div className="hot-tete-txt">
                <p className="hot-surtitre">{x("Assistante virtuelle Heavent")}{badge && <span className="hot-badge">{x("Invité·e Heavent")}</span>}</p>
                <h2 id="hot-titre" ref={titre} tabIndex={-1}>Imane</h2>
              </div>
              <button type="button" className="hot-fermer" onClick={fermer} aria-label={x("Fermer")} data-testid="assistant-fermer">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M5 5l14 14M19 5L5 19" /></svg>
              </button>
            </header>
            <div className="hot-corps" ref={corps}>
              {!reponse && !charge && (
                <>
                  <p className="hot-mot" id="hot-accueil">{x("Bonjour, je suis Imane, l'assistante virtuelle de Heavent. Qui êtes-vous ? Je vous envoie au bon endroit en un clic.")}</p>
                  <div className="hot-choix">
                    {PROFILS.map((p) => (
                      <button key={p.id} type="button" className="hot-chip" data-testid={`assistant-profil-${p.id}`} onClick={() => choisir(p.id as Exclude<Profil, "autre">)}>{x(p.label)}</button>
                    ))}
                  </div>
                </>
              )}
              {charge && <p className="hot-mot hot-attente" role="status">{x("Je réfléchis…")}</p>}
              {reponse && !charge && (
                <>
                  <p className="hot-reponse" data-testid="assistant-reponse" role="status">{reponse.reponse}</p>
                  <div className="hot-liens">
                    {reponse.liens.map((id, i) => (
                      <button key={id} type="button" className={"s-btn hot-lien " + (i === 0 ? "s-btn-plein" : "s-btn-filet")} data-testid={`assistant-lien-${id}`} onClick={() => suivre(id)}>{x(LIENS[id].label)}</button>
                    ))}
                  </div>
                  {erreur && dernier && <button type="button" className="hot-retour" onClick={() => { setReponse(null); void demander(dernier); }}>{x("Réessayer")}</button>}
                  <button type="button" className="hot-retour" onClick={recommencer}>{x("Poser une autre question")}</button>
                </>
              )}
            </div>
            <form className="hot-saisie" onSubmit={envoyer}>
              <label className="sr-only" htmlFor="hot-texte">{x("Votre question")}</label>
              <input id="hot-texte" value={texte} onChange={(e) => setTexte(e.target.value.slice(0, MESSAGE_MAX))} placeholder={x("Écrivez votre question")} maxLength={MESSAGE_MAX} autoComplete="off" enterKeyHint="send" readOnly={charge} />
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
