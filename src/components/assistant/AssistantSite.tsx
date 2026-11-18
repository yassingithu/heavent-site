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
const VER = "20261118b"; // à changer quand la vidéo ou les images de l'hôtesse changent (contourne le cache des navigateurs)
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
    t.width = 780; t.height = 540;
    const w = t.getContext("2d", { willReadFrequently: true });
    if (!w) return;
    w.drawImage(v, 0, 0, 780, 540);
    const src = w.getImageData(0, 0, 780, 540).data, out = g.createImageData(390, 540), d = out.data;
    for (let y = 0; y < 540; y++) for (let x = 0; x < 390; x++) {
      const i = (y * 780 + x) * 4, k = i + 390 * 4, j = (y * 390 + x) * 4;
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
      const img = new Image(); img.onload = () => { if (n === "assise") poser("assise"); }; img.src = `/assistant/hotesse-${n}.webp?v=${VER}`; images.current[n] = img;
    });
    return () => cancelAnimationFrame(boucle.current);
  }, [poser]);

  // Le canvas n'existe qu'après le choix d'audience : on y redépose la pose assise dès qu'il apparaît
  useEffect(() => { if (choix || ouvert) poser("assise"); }, [choix, ouvert, poser]);

  const jeton = useRef(0);
  // Lance la vidéo : l'hôtesse ne passe « debout » (et ne grandit) que quand l'image bouge vraiment. Un jeton ignore les réponses tardives.
  const jouer = (ok: () => void, ko: () => void) => {
    const v = video.current;
    if (!v) { ko(); return; }
    const id = ++jeton.current;
    v.currentTime = 0;
    v.play().then(() => { if (id !== jeton.current) return; setPose("debout"); lire_(); ok(); })
      .catch((e: unknown) => { if (id !== jeton.current || (e as { name?: string })?.name === "AbortError") return; ko(); });
  };
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
      jouer(() => apres(4300, () => { setPose("salue"); setBulle(true); }), sansVideo);
    }
    const seRassoit = () => {
      if (survol.current) { apres(3000, seRassoit); return; }
      setBulle(false);
      apres(250, () => { jeton.current++; setPose("assise"); video.current?.pause(); cancelAnimationFrame(boucle.current); poser("assise"); });
    };
    apres(reduit ? 7000 : 10500, seRassoit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduit, poser, lire_]);

  // Préchargement de la vidéo : sans lui, le clic attend son téléchargement et l'hôtesse reste figée un instant.
  const precharger = useCallback(() => {
    const v = video.current;
    if (v && !reduit && v.readyState === 0 && v.paused) { v.preload = "auto"; v.load(); }
  }, [reduit]);
  useEffect(() => {
    if (prive || formulaire || !choix || reduit) return;
    const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (c?.saveData || (c?.effectiveType && /^(slow-2g|2g|3g)$/.test(c.effectiveType))) return;
    const ric = (window as Window & { requestIdleCallback?: (f: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    if (ric) { const id = ric(precharger, { timeout: 4000 }); return () => (window as Window & { cancelIdleCallback?: (i: number) => void }).cancelIdleCallback?.(id); }
    const t = window.setTimeout(precharger, 2500);
    return () => window.clearTimeout(t);
  }, [prive, formulaire, choix, reduit, precharger]);

  useEffect(() => {
    if (prive || formulaire || !choix || ouvert) return;
    if (lire(CLE_VUE) === "1") return;
    const minuteur = window.setTimeout(inviter, 8000);
    const defiler = () => {
      const haut = document.documentElement.scrollHeight - window.innerHeight;
      if (haut > 0 && window.scrollY / haut > 0.35) inviter();
    };
    window.addEventListener("scroll", defiler, { passive: true });
    return () => { window.clearTimeout(minuteur); window.removeEventListener("scroll", defiler); };
  }, [prive, formulaire, choix, ouvert, inviter]);

  useEffect(() => () => nettoyer(), []);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (menu) menuRef.current?.querySelector<HTMLElement>("button")?.focus(); }, [menu]);
  useEffect(() => {
    if (!menu) return;
    const t = (e: KeyboardEvent) => { if (e.key === "Escape") { assoir(); bouton.current?.focus(); } };
    const hors = (e: PointerEvent) => { if (!(e.target as HTMLElement).closest?.(".hot-zone")) assoir(); };
    const sortie = (e: FocusEvent) => { const n = e.relatedTarget as HTMLElement | null; if (n && !n.closest?.(".hot-zone")) assoir(); };
    document.addEventListener("keydown", t); document.addEventListener("pointerdown", hors); document.addEventListener("focusout", sortie);
    return () => { document.removeEventListener("keydown", t); document.removeEventListener("pointerdown", hors); document.removeEventListener("focusout", sortie); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menu]);

  // Clic sur l'hôtesse : elle se lève et propose deux chemins (Salma ou WhatsApp)
  const lever = () => {
    if (menu) { assoir(); return; }
    nettoyer(); ecrire(CLE_VUE, "1");
    setBulle(false); setMenu(true);
    const v = video.current;
    if (reduit || !v) { setPose("salue"); poser("presente"); return; }
    jouer(() => apres(4300, () => setPose("salue")), () => { setPose("salue"); poser("presente"); });
    // Connexion très lente : après 8 s sans vidéo, pose fixe (le menu, lui, est déjà affiché dès le clic)
    apres(8000, () => { if (v.paused || v.readyState < 2) { jeton.current++; v.pause(); setPose("salue"); poser("presente"); } });
  };
  const assoir = () => {
    nettoyer(); jeton.current++; setMenu(false); setPose("assise");
    video.current?.pause(); cancelAnimationFrame(boucle.current); poser("assise");
    try { if (video.current) video.current.currentTime = 0; } catch { /* sans effet */ }
  };
  const whatsapp = () => {
    const msg = x("Bonjour Heavent People Agency, j'aimerais avoir des informations.");
    window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    assoir(); bouton.current?.focus();
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
    window.setTimeout(() => {
      (corps.current?.querySelector<HTMLElement>(".hot-lien") ?? titre.current)?.focus({ preventScroll: true });
      if (corps.current) corps.current.scrollTop = 0;
    }, 60);
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
      afficher({ reponse: x("Salma est indisponible pour le moment. L'équipe Heavent vous répondra sous 24 h."), liens: ["whatsapp", "contact"] });
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
        {menu && !ouvert && <button type="button" className="hot-voile" aria-hidden tabIndex={-1} onClick={assoir} />}
        {bulle && !ouvert && (
          <button type="button" className="hot-bulle" dir={dir} onClick={ouvrir} tabIndex={-1} aria-hidden>{x("Besoin d'un coup de main ?")}</button>
        )}
        <span className="sr-only" role="status">{bulle && !ouvert ? x("Besoin d'un coup de main ?") : ""}</span>
        {menu && !ouvert && (
          <div className="hot-menu" ref={menuRef} role="group" aria-label={x("Comment souhaitez-vous poser vos questions ?")}>
            <p className="hot-menu-t">{x("Comment souhaitez-vous poser vos questions ?")}</p>
            <button type="button" className="hot-menu-b hot-menu-imane" data-testid="assistant-menu-imane" onClick={ouvrir}>
              <strong>{x("Poser mes questions à Salma")}</strong><span>{x("Assistante virtuelle, réponse immédiate")}</span>
            </button>
            <button type="button" className="hot-menu-b" data-testid="assistant-menu-whatsapp" onClick={whatsapp}>
              <strong>{x("Écrire sur WhatsApp")}</strong><span>{x("L'équipe Heavent vous répond")}</span>
            </button>
          </div>
        )}
        <button ref={bouton} type="button" className="hot-btn" data-testid="bouton-assistant" aria-label={x("Parler à Salma, l'assistante virtuelle Heavent")} aria-expanded={menu || ouvert}
          tabIndex={ouvert ? -1 : 0} onClick={lever}
          onMouseEnter={() => { if (window.matchMedia?.("(hover:none)").matches) return; survol.current = true; precharger(); }} onTouchStart={precharger} onMouseLeave={() => { survol.current = false; }}
          onFocus={() => { survol.current = true; precharger(); }} onBlur={() => { survol.current = false; }}>
          <span className="hot-scene" aria-hidden>
            <canvas ref={toile} className="hot-toile" width="390" height="540" />
            <video ref={video} className="hot-video" muted playsInline preload="none" disablePictureInPicture tabIndex={-1} width="780" height="540" onEnded={() => { cancelAnimationFrame(boucle.current); composer(); }}>
              <source src={`/assistant/hotesse-paquet.mp4?v=${VER}`} type="video/mp4" />
              <source src={`/assistant/hotesse-paquet.webm?v=${VER}`} type="video/webm" />
            </video>
          </span>
          <span className="hot-etiquette" aria-hidden><span>{x("Une question ?")}</span></span>
        </button>
      </div>
      {ouvert && (
        <div className="hot-panneau" role="dialog" aria-modal="true" aria-labelledby="hot-titre" aria-describedby="hot-accueil" dir={dir} ref={panneau} data-testid="assistant-panneau" style={clavier ? { bottom: clavier } : undefined}>
          <div className="hot-panneau-int s-nuit">
            <header className="hot-tete">
              <span className="hot-tete-fig" aria-hidden><img src="/assistant/hotesse-visage.webp" alt="" width="56" height="56" /></span>
              <div className="hot-tete-txt">
                <p className="hot-surtitre">{x("Assistante virtuelle Heavent")}</p>
                <h2 id="hot-titre" ref={titre} tabIndex={-1}>{x("Salma")}</h2>
              </div>
              <button type="button" className="hot-fermer" onClick={fermer} aria-label={x("Fermer")} data-testid="assistant-fermer">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M5 5l14 14M19 5L5 19" /></svg>
              </button>
            </header>
            <div className="hot-corps" ref={corps}>
              {!reponse && !charge && (
                <>
                  <p className="hot-mot" id="hot-accueil">{x("Bonjour, je suis Salma, l'assistante virtuelle de Heavent. Qui êtes-vous ? Je vous envoie au bon endroit en un clic.")}</p>
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
            <p className="hot-notice">{x("Ne saisissez ni coordonnées, ni pièce d'identité, ni données de santé.")}</p>
          </div>
        </div>
      )}
    </>
  );
}
