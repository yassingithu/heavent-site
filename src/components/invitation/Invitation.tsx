import { noms_ar, nomInvite_ar, lieu_ar, heure_ar, titre_ar } from "@/lib/arabe";
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { CalendarPlus, MapPin } from "lucide-react";
import Ouverture from "./Ouverture";
import { chargerOuverturesPerso } from "@/lib/ouverturesPerso";
import RevelationGeste from "./RevelationGeste";
import Revelation from "./Revelation";
import Decor from "./Decor";
import PagesCarte, { type UnitePage } from "./PagesCarte";
import { morceauxDeTexte, phrases } from "@/lib/pagination";
import { couleursDe, formuleDe, imagesOuverture, policeDe, initiales, lienAgenda, lienMaps, modeleDe, ouvertureDe, revelationDe, revelationsPour, surCouleur, type InvitationReglages, type Langue, type Ornement } from "@/lib/invitation";
import { evenementDe, textesDe } from "@/lib/evenements";
import "@fontsource/pinyon-script/latin-400.css";
import "@fontsource/pinyon-script/latin-ext-400.css";
import "@fontsource/amiri/arabic-400.css";
import "@fontsource/amiri/arabic-700.css";
import "@/styles/invitation.css";
import "@/styles/ouvertures.css";
import "@/styles/invitation-mouvement.css";

export interface InvitationProps {
  noms: string;
  date?: string | null;
  lieu?: string | null;
  message?: string | null;
  reglages?: InvitationReglages | null;
  langue?: Langue;
  /** Prénom de l'invité (page personnelle) */
  invite?: string | null;
  /** Aperçu : la carte est déjà sortie de l'enveloppe */
  ouverte?: boolean;
  /** Aperçu de l'administration : après « Rejouer », l'ouverture se lance toute seule. */
  autoOuvrir?: boolean;
  /** Change de valeur pour rejouer l'ouverture (aperçu) */
  rejouer?: number;
  /** Cadre de page entier (invité) ou simple bloc (aperçu dans un cadre) */
  pleinePage?: boolean;
  /** Au-dessus / au-dessous de l'enveloppe ou de la carte (langues, mention) */
  haut?: ReactNode;
  bas?: ReactNode;
  children?: ReactNode;
}

const sansAnimation = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/* Plein écran au toucher de l'enveloppe (un geste est obligatoire). iPhone : Safari ne l'autorise pas pour une page ; la barre se replie d'elle-même au défilement. */
function pleinEcran() {
  try {
    const d = document as Document & { webkitFullscreenElement?: Element; webkitExitFullscreen?: () => void };
    const el = document.documentElement as HTMLElement & { webkitRequestFullscreen?: () => Promise<void> | void };
    if (d.fullscreenElement || d.webkitFullscreenElement) return;
    const r = el.requestFullscreen ? el.requestFullscreen({ navigationUI: "hide" }) : el.webkitRequestFullscreen?.();
    if (r && typeof (r as Promise<void>).catch === "function") (r as Promise<void>).catch(() => {});
  } catch { /* plein écran refusé : l'invitation reste lisible */ }
}

function useReveal<T extends HTMLElement>(marge = "0px 0px -8% 0px") {
  const ref = useRef<T>(null);
  const [vu, setVu] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setVu(true); return; }
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { setVu(true); io.disconnect(); } }, { threshold: 0, rootMargin: marge });
    io.observe(el);
    const filet = window.setTimeout(() => { setVu(true); io.disconnect(); }, 6000);
    return () => { io.disconnect(); window.clearTimeout(filet); };
  }, []);
  return [ref, vu] as const;
}

/** Une ligne du programme : son point s'allume quand elle arrive à l'écran. */
function Moment({ k, children }: { k: number; children: ReactNode }) {
  const [ref, vu] = useReveal<HTMLLIElement>("0px 0px -18% 0px");
  return <li ref={ref} className={vu ? "is-on" : ""} style={{ ["--k" as string]: k } as CSSProperties}>{children}</li>;
}

/** Calendrier du mois : la date de la fête est marquée d'un cœur qui se dessine puis bat doucement. Les chiffres viennent du CSS (compteur), le texte de la page ne change pas. */
function Calendrier({ date, locale, label, khatam }: { date: string; locale: string; label: string; khatam?: boolean }) {
  const [y, m, d] = date.split("-").map(Number);
  if (!y || !m || !d) return null;
  const decal = (new Date(Date.UTC(y, m - 1, 1)).getUTCDay() + 6) % 7;
  const nb = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const f = (o: Intl.DateTimeFormatOptions, dt: Date) => new Intl.DateTimeFormat(locale, { timeZone: "UTC", ...o }).format(dt);
  const forme = khatam ? "M20 4l4 6 7-1-1 7 6 4-6 4 1 7-7-1-4 6-4-6-7 1 1-7-6-4 6-4-1-7 7 1z" : "M20 35C8 26 4 19 4 13a8 8 0 0 1 16-3 8 8 0 0 1 16 3c0 6-4 13-16 22z";
  return (
    <div className="inv-cal" role="img" aria-label={label} data-mois={f({ month: "long", year: "numeric" }, new Date(Date.UTC(y, m - 1, 1)))} data-testid="invitation-calendrier">
      {Array.from({ length: 7 }, (_, i) => <b key={i} data-l={f({ weekday: "narrow" }, new Date(Date.UTC(2024, 0, 1 + i)))} />)}
      {Array.from({ length: decal }, (_, i) => <u key={`u${i}`} />)}
      {Array.from({ length: nb }, (_, i) => (
        <i key={i} className={i + 1 === d ? "inv-cal-date" : undefined}>
          {i + 1 === d && <svg viewBox="0 0 40 40" aria-hidden="true"><path className="o" d={forme} /><path className="p" pathLength={1} d={forme} /></svg>}
        </i>
      ))}
    </div>
  );
}

function Section({ className = "", children, titre, id, nuit }: { nuit?: boolean; className?: string; children: ReactNode; titre?: string; id?: string }) {
  const [ref, vu] = useReveal<HTMLElement>();
  return (
    <section ref={ref} id={id} className={`inv-sec ${nuit ? "inv-nuit" : ""} ${vu ? "is-in" : ""} ${className}`}>
      {titre && <h2 className="inv-sec-titre">{titre}</h2>}
      {children}
    </section>
  );
}

/* Les alliances se rapprochent au fil du défilement et s'enlacent quand elles arrivent au centre de l'écran. */
function Anneaux() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const reduit = sansAnimation();
    const gauches = svg.querySelectorAll<SVGGElement>(".inv-an-g");
    const droites = svg.querySelectorAll<SVGGElement>(".inv-an-d");
    let raf = 0;
    const maj = () => {
      raf = 0;
      const r = svg.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const centre = r.top + r.height / 2;
      const p = reduit ? 1 : Math.min(1, Math.max(0, (vh - centre) / (vh * 0.45)));
      const e = 1 - Math.pow(1 - p, 3);
      const dx = (1 - e) * 64, rot = (1 - e) * 28;
      gauches.forEach((g) => { g.style.transform = `translateX(${-dx}px) rotate(${-rot}deg)`; });
      droites.forEach((g) => { g.style.transform = `translateX(${dx}px) rotate(${rot}deg)`; });
      svg.classList.toggle("inv-joint", p > 0.97);
    };
    const onScroll = () => maj();
    maj();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <svg ref={ref} className="inv-anneaux" viewBox="0 0 200 110" aria-hidden="true">
      <defs>
        <linearGradient id="inv-or" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="currentColor" stopOpacity=".55" /><stop offset=".5" stopColor="currentColor" /><stop offset="1" stopColor="currentColor" stopOpacity=".6" /></linearGradient>
      <clipPath id="inv-bas"><rect x="84" y="62" width="32" height="60" /></clipPath></defs>
      <g className="inv-an inv-an-g"><circle cx="78" cy="62" r="32" fill="none" stroke="url(#inv-or)" strokeWidth="6" /><circle cx="78" cy="62" r="26" fill="none" stroke="currentColor" strokeOpacity=".25" strokeWidth="1" /></g>
      <g className="inv-an inv-an-d"><circle cx="122" cy="62" r="32" fill="none" stroke="url(#inv-or)" strokeWidth="6" /><circle cx="122" cy="62" r="26" fill="none" stroke="currentColor" strokeOpacity=".25" strokeWidth="1" /><g transform="translate(22 -6)"><g className="inv-gemme"><path d="M100 14l7 10-7 12-7-12z" fill="currentColor" /><path d="M100 14l7 10h-14z" fill="#fff" fillOpacity=".55" /></g>
      <g className="inv-eclat" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M100 2v6M88 8l3 4M112 8l-3 4" /></g></g></g>
      <g clipPath="url(#inv-bas)"><g className="inv-an inv-an-g inv-copie"><circle cx="78" cy="62" r="32" fill="none" stroke="url(#inv-or)" strokeWidth="6" /><circle cx="78" cy="62" r="26" fill="none" stroke="currentColor" strokeOpacity=".25" strokeWidth="1" /></g></g></svg>
  );
}

function CompteARebours({ cible, t }: { cible: number; t: { jours: string; heures: string; minutes: string; secondes: string; aujourdhui: string } }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => { const id = window.setInterval(() => setNow(Date.now()), 1000); return () => window.clearInterval(id); }, []);
  const reste = cible - now;
  if (reste <= 0) return <p className="inv-aujourdhui">{t.aujourdhui}</p>;
  const j = Math.floor(reste / 864e5), h = Math.floor(reste / 36e5) % 24, m = Math.floor(reste / 6e4) % 60, sec = Math.floor(reste / 1e3) % 60;
  return (
    <div className="inv-compte" role="timer" aria-live="off" aria-label={`${j} ${t.jours}`}>
      {([[j, t.jours], [h, t.heures], [m, t.minutes], [sec, t.secondes]] as const).map(([v, l]) => (
        <div key={l}><b>{String(v).padStart(2, "0")}</b><span>{l}</span></div>
      ))}
    </div>
  );
}

function Lettres({ texte, base, ar }: { texte: string; base: number; ar: boolean }) {
  if (ar) return <span className="inv-mot" style={{ "--i": base } as CSSProperties}>{texte}</span>;
  return (
    <span className="inv-prenom" aria-hidden="true">
      {Array.from(texte).map((c, i) => <span key={i} className="inv-lettre" style={{ "--i": base + i } as CSSProperties}>{c === " " ? "\u00A0" : c}</span>)}
    </span>
  );
}

const ETINCELLES = Array.from({ length: 16 }, (_, i) => ({ x: (i * 37) % 100, d: (i * 53) % 700, t: 700 + ((i * 91) % 900), s: 3 + (i % 4) }));

/** Filet sous les prénoms : deux vagues en miroir autour d'un losange, donc exactement centré (viewBox 220, milieu = 110). */
function Trait() {
  return (
    <svg className="inv-trait" viewBox="0 0 220 14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path pathLength="1" d="M8 7C30 0 52 14 98 7" />
      <path pathLength="1" d="M212 7C190 0 168 14 122 7" />
      <path pathLength="1" d="M110 2.5L114.5 7L110 11.5L105.5 7Z" />
    </svg>
  );
}

function Ornement({ type }: { type: Ornement }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (type) {
    case "khatam":
      return (<svg viewBox="0 0 80 80" width="64" height="64" aria-hidden="true"><g {...p}><rect x="18" y="18" width="44" height="44" /><rect x="18" y="18" width="44" height="44" transform="rotate(45 40 40)" /><circle cx="40" cy="40" r="9" /><circle cx="40" cy="40" r="2" fill="currentColor" /></g></svg>);
    case "arche":
      return (<svg viewBox="0 0 80 90" width="58" height="66" aria-hidden="true"><g {...p}><path d="M14 86V40C14 24 26 12 40 6c14 6 26 18 26 34v46" /><path d="M24 86V42c0-11 7-20 16-25 9 5 16 14 16 25v44" /><circle cx="40" cy="40" r="2.5" fill="currentColor" /></g></svg>);
    case "fleur":
      return (<svg viewBox="0 0 120 70" width="120" height="70" aria-hidden="true"><g {...p}><path d="M60 66V34" /><path d="M60 52c-14-2-24-10-30-22M60 52c14-2 24-10 30-22" /><g transform="translate(60 22)">{[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="0" cy="-9" rx="5" ry="9" transform={`rotate(${a})`} />)}<circle r="3" fill="currentColor" /></g><circle cx="30" cy="28" r="3.5" /><circle cx="90" cy="28" r="3.5" /></g></svg>);
    case "zellige":
      return (<svg viewBox="0 0 80 80" width="64" height="64" aria-hidden="true"><g {...p}><path d="M40 6l8 14 16-2-2 16 14 8-14 8 2 16-16-2-8 14-8-14-16 2 2-16-14-8 14-8-2-16 16 2z" /><circle cx="40" cy="40" r="10" /><path d="M40 30v20M30 40h20" /></g></svg>);
    case "cadre":
      return (<svg viewBox="0 0 120 20" width="120" height="20" aria-hidden="true"><g {...p}><path d="M4 10h44M72 10h44" /><path d="M60 3l7 7-7 7-7-7z" /></g></svg>);
    default:
      return (<svg viewBox="0 0 140 20" width="140" height="20" aria-hidden="true"><g {...p}><path d="M6 10h52M82 10h52" /><circle cx="70" cy="10" r="3" fill="currentColor" /><circle cx="62" cy="10" r="1.2" fill="currentColor" /><circle cx="78" cy="10" r="1.2" fill="currentColor" /></g></svg>);
  }
}

/** Particules dorées en suspension (légères : 14 points, transform/opacity seulement). */
const PARTICULES = Array.from({ length: 14 }, (_, i) => ({ x: (i * 37 + 11) % 100, s: 2 + ((i * 5) % 4), d: (i * 913) % 9000, t: 9000 + ((i * 577) % 7000) }));

export default function Invitation({ noms, date, lieu, message, reglages, langue = "fr", invite, ouverte = false, autoOuvrir = false, rejouer = 0, pleinePage = true, haut, bas, children }: InvitationProps) {
  const c = useMemo(() => couleursDe(reglages), [reglages]);
  const fleurs = reglages?.fleurs === "grenat" || (reglages?.fleurs !== "aucun" && (reglages?.modele ?? "") === "grenat");
  const modele = reglages?.modele;
  const ornement = modeleDe(modele).ornement;
  const ev = evenementDe(reglages?.evenement);
  const t = textesDe(langue, ev.id);
  const [, majOuv] = useState(0);
  useEffect(() => { if (String(reglages?.ouverture ?? "").startsWith("perso-")) chargerOuverturesPerso().then(() => majOuv((n) => n + 1)); }, [reglages?.ouverture]);
  // préchargement des images de l'ouverture choisie ; si l'une échoue (réseau, fichier absent), on bascule sur l'ouverture de secours sans animation d'images
  const [secours, setSecours] = useState(false);
  const ouvChoisie = ouvertureDe(reglages?.ouverture);
  useEffect(() => {
    setSecours(false);
    const liste = imagesOuverture(ouvChoisie); if (!liste.length) return;
    let vivant = true;
    const t = window.setTimeout(() => { /* connexion très lente : on laisse l'animation démarrer quand même */ }, 8000);
    liste.forEach((u) => { const im = new Image(); im.onerror = () => { if (vivant) setSecours(true); }; im.decoding = "async"; im.src = u; });
    return () => { vivant = false; window.clearTimeout(t); };
  }, [ouvChoisie.id]);
  const ouv = secours ? ouvertureDe(undefined) : ouvChoisie;
  const revId = revelationDe(reglages?.revelation).id;
  const revEnLigne = !ouv.carte && (revId === "coeur" || revId === "medaillon");
  const avecRevelation = !revEnLigne && revId !== "aucune" && revelationsPour(ev.id).some((r) => r.id === revId) && !sansAnimation();
  const [phase, setPhase] = useState<"fermee" | "ouverture" | "revelation" | "ouverte">(ouverte || sansAnimation() ? "ouverte" : "fermee");

  useEffect(() => () => {
    try { const d = document as Document & { webkitFullscreenElement?: Element; webkitExitFullscreen?: () => void }; if (d.fullscreenElement) void d.exitFullscreen(); else if (d.webkitFullscreenElement) d.webkitExitFullscreen?.(); } catch { /* ignoré */ }
  }, []);
  useEffect(() => {
    setPhase(ouverte || sansAnimation() ? "ouverte" : "fermee");
    if (!autoOuvrir || ouverte || sansAnimation()) return;
    const id = window.setTimeout(() => setPhase((p) => (p === "fermee" ? "ouverture" : p)), 700);
    return () => window.clearTimeout(id);
  }, [ouverte, rejouer, autoOuvrir]);
  const emRef = useRef<HTMLElement>(null);
  /* Fondu de sortie : la dernière image du film reste à sa place et s'estompe pendant que la carte apparaît (aucune coupure). */
  const [sortie, setSortie] = useState<{ canvas: HTMLElement; r: { top: number; left: number; width: number; height: number } } | null>(null);
  useEffect(() => { if (phase === "fermee") setSortie(null); }, [phase, rejouer]);
  useEffect(() => { if (!sortie) return; const id = window.setTimeout(() => setSortie(null), 2500); return () => window.clearTimeout(id); }, [sortie]);
  const capturerFilm = () => {
    if (sansAnimation()) return;
    try {
      const f = document.querySelector<HTMLVideoElement>(".inv-o-video:not(.inv-o-video-secours) .inv-ov-film");
      if (f && f.readyState >= 2 && f.videoWidth) {
        const b = (f.parentElement ?? f).getBoundingClientRect(); // le cadre du film, hors zoom
        const cv = document.createElement("canvas"); const ech = Math.min(1, 1280 / f.videoHeight); cv.width = Math.round(f.videoWidth * ech); cv.height = Math.round(f.videoHeight * ech);
        cv.getContext("2d")!.drawImage(f, 0, 0, cv.width, cv.height);
        const tr = getComputedStyle(f).transform; if (tr && tr !== "none") cv.style.transform = tr; // zoom en cours : l'image figée reprend exactement le cadrage
        setSortie({ canvas: cv, r: { top: b.top, left: b.left, width: b.width, height: b.height } });
      } else if (ouv.carte && !fondCarte) {
        /* décors à carte intégrée : la scène intérieure reste en place puis glisse sur la carte */
        const porte = document.querySelector<HTMLElement>(".inv-porte"); if (!porte) return;
        const b = porte.getBoundingClientRect(); const im = new Image(); im.src = ouv.carte.fin; im.alt = "";
        setSortie({ canvas: im, r: { top: b.top, left: b.left, width: b.width, height: b.height } });
      }
    } catch { /* sans fondu : la carte apparaît directement */ }
  };
  /* Musique d'ouverture (facultative) : démarre au toucher, avec un bouton pour la couper. */
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [son, setSon] = useState(false);
  const [aMusique, setAMusique] = useState(false);
  const lancerMusique = () => {
    const u = reglages?.musique?.trim();
    if (!u || !/^(https:\/\/|\/(?!\/))/.test(u) || audioRef.current) return;
    try {
      const a = new Audio(u); a.loop = true; a.volume = 0.6; a.preload = "auto"; audioRef.current = a;
      // un lien illisible (page de site, fichier supprimé) : pas de bouton fantôme
      a.onerror = () => { if (audioRef.current === a) { audioRef.current = null; setAMusique(false); setSon(false); } };
      setAMusique(true);
      void a.play().then(() => setSon(true)).catch(() => setSon(false));
    } catch { /* sans musique */ }
  };
  useEffect(() => () => { audioRef.current?.pause(); audioRef.current = null; }, []);
  useEffect(() => { audioRef.current?.pause(); audioRef.current = null; setSon(false); setAMusique(false); }, [rejouer, reglages?.musique]);
  // l'invité quitte l'onglet ou verrouille le téléphone : la musique se tait, et reprend à son retour si elle jouait
  useEffect(() => {
    const voir = () => { const a = audioRef.current; if (!a) return; if (document.hidden) a.pause(); else if (son) void a.play().catch(() => setSon(false)); };
    document.addEventListener("visibilitychange", voir);
    return () => document.removeEventListener("visibilitychange", voir);
  }, [son]);
  const basculerSon = () => { const a = audioRef.current; if (!a) return; if (a.paused) { void a.play().then(() => setSon(true)).catch(() => setSon(false)); } else { a.pause(); setSon(false); } };
  const nomsRef = useRef<HTMLHeadingElement>(null);
  const depart = useRef<DOMRect | null>(null);
  /* Les prénoms restent au centre de la carte qui sort de l'enveloppe, puis glissent à leur place pendant que le reste apparaît. */
  useLayoutEffect(() => {
    if (phase !== "ouverte") return;
    const d = depart.current; depart.current = null;
    const h = nomsRef.current;
    if (!d || !h || sansAnimation() || typeof h.animate !== "function") return;
    const n = h.getBoundingClientRect();
    const dy = (d.top + d.height / 2) - (n.top + n.height / 2);
    if (Math.abs(dy) < 2) return;
    h.classList.add("inv-glisse");
    h.animate([{ transform: `translateY(${dy}px)` }, { transform: "translateY(0)" }], { duration: 1000, delay: 250, easing: "cubic-bezier(.2,.7,.2,1)", fill: "backwards" });
  }, [phase]);
  const phaseRef = useRef(phase); phaseRef.current = phase;
  const porteRect = useRef<DOMRect | null>(null);
  /* La carte prend le relais de la porte à la même échelle, puis grandit : le texte ne saute pas. */
  useLayoutEffect(() => {
    const r = porteRect.current; if (phase !== "ouverte" || !r) return; porteRect.current = null;
    const el = document.querySelector<HTMLElement>("[data-testid=invitation-carte]"); if (!el || typeof el.animate !== "function") return;
    const c = el.getBoundingClientRect(); if (!c.width || !r.width) return;
    const k = r.width / c.width; const rogne = Math.max(0, c.height - r.height / k);
    el.animate([
      { transformOrigin: "top left", transform: `translate(${r.left - c.left}px, ${r.top - c.top}px) scale(${k})`, clipPath: `inset(0 0 ${rogne}px 0)` },
      { transformOrigin: "top left", transform: "translate(0, 0) scale(1)", clipPath: "inset(0 0 0 0)" },
    ], { duration: 650, easing: "cubic-bezier(.2,.7,.2,1)" });
  }, [phase]);
  /* Passage à la carte : à la fin réelle du film (ou au minuteur de secours), jamais avant. */
  const terminer = () => {
    if (phaseRef.current !== "ouverture") return;
    depart.current = avecRevelation || ouv.video || fondCarte ? null : (emRef.current?.getBoundingClientRect() ?? null);
    { const st = fondCarte && !avecRevelation ? document.querySelector<HTMLElement>(".inv-fond-statique") : null; const po = document.querySelector<HTMLElement>(".inv-porte")?.getBoundingClientRect(); const sr = st?.getBoundingClientRect(); porteRect.current = sr && po ? new DOMRect(sr.left, sr.top, sr.width, Math.min(sr.height, po.bottom - sr.top)) : null; }
    if (!avecRevelation) capturerFilm();
    if (ouv.carte && !avecRevelation && !sansAnimation()) { const inv = document.querySelector<HTMLElement>(".inv"); if (inv) { inv.style.minHeight = `${inv.getBoundingClientRect().height}px`; window.setTimeout(() => { inv.style.minHeight = ""; }, 2600); } }
    setPhase(avecRevelation ? "revelation" : "ouverte");
  };
  const terminerRef = useRef(terminer); terminerRef.current = terminer;
  useEffect(() => {
    if (phase !== "ouverture") return;
    const court = ["ruban", "ficelle", "washi", "tissu"].includes(reglages?.fermeture ?? "") ? 1850 : reglages?.fermeture === "cire-brisee" ? 2100 : Infinity;
    const id = window.setTimeout(() => terminerRef.current(), sansAnimation() ? 0 : Math.min(ouv.duree, court) + (ouv.video ? 3000 : 0));
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const surChangement = () => { if (mq?.matches) terminerRef.current(); };
    mq?.addEventListener?.("change", surChangement);
    return () => { window.clearTimeout(id); mq?.removeEventListener?.("change", surChangement); };
  }, [phase, ouv.duree, ouv.video, reglages?.fermeture]);
  /* La carte écrite sur le film : l'image finale glisse et s'ajuste sur la carte (FLIP) pendant qu'elle s'estompe. */
  useEffect(() => { if (phase === "ouverte" && pleinePage && !sansAnimation()) window.setTimeout(() => nomsRef.current?.focus({ preventScroll: true }), 50); }, [phase, pleinePage]);
  useLayoutEffect(() => {
    if (phase !== "ouverte" || !sortie || !ouv.carte) return;
    const carte = document.querySelector(".inv-carte-film"); const el = document.querySelector<HTMLElement>(".inv-film-sortie");
    if (!carte || !el || typeof el.animate !== "function") return;
    const c = carte.getBoundingClientRect(), r = sortie.r;
    el.animate([{ transform: "none" }, { transform: `translate(${c.left - r.left}px,${c.top - r.top}px) scale(${c.width / r.width})` }], { duration: 700, easing: "cubic-bezier(.2,.7,.2,1)", fill: "forwards" });
  }, [phase, sortie, ouv.carte]);
  useEffect(() => {
    const saute = () => { if (document.visibilityState === "hidden") setPhase((p) => (p === "ouverture" ? "ouverte" : p)); };
    document.addEventListener("visibilitychange", saute);
    return () => document.removeEventListener("visibilitychange", saute);
  }, []);

  const style = {
    "--inv-fond": c.fond, "--inv-env": c.enveloppe, "--inv-papier": c.papier, "--inv-texte": c.texte, "--inv-accent": c.accent, ...(reglages?.police ? { "--inv-police-noms": policeDe(reglages.police).css } : {}),
    "--inv-sur-env": surCouleur(c.enveloppe), "--inv-sur-fond": surCouleur(c.fond), "--inv-sur-accent": surCouleur(c.accent),
  } as CSSProperties;
  const ar = langue === "ar";
  /** Formule Classique : l'adresse reste écrite sur la carte, mais le plan Google Maps cliquable n'est inclus qu'avec les films (Interactive, Prestige) ou si le lien a été ajouté en option. */
  const avecPlan = formuleDe(ouv) !== "classique" || !!reglages?.lieu_maps?.trim();
  const carte = avecPlan ? lienMaps(reglages, lieu) : null;
  const heureBrute = reglages?.heure?.trim();
  const heure = heureBrute && ar ? heure_ar(heureBrute) : heureBrute;
  const nomsA = ar ? (reglages?.noms_ar?.trim() || noms_ar(noms)) : noms;
  const lieuA = ar && lieu ? (reglages?.lieu_ar?.trim() || lieu_ar(lieu)) : lieu;
  const messageA = ar && message ? (reglages?.message_ar?.trim() || message) : message;
  const messageSimple = messageA ? morceauxDeTexte(messageA).map((m) => m.texte).join("\n") : messageA; // hors cadre fixe : les lignes --- ne s'affichent pas
  const inviteA = ar && invite ? nomInvite_ar(invite) : invite;
  const dp = date ? new Intl.DateTimeFormat(t.locale, { timeZone: "UTC", weekday: "long", day: "numeric", month: "long", year: "numeric" }).formatToParts(new Date(date + "T00:00:00Z")) : null;
  const part = (k: string) => dp?.find((x) => x.type === k)?.value ?? "";
  const maj = (v: string) => v.charAt(0).toLocaleUpperCase(t.locale) + v.slice(1);
  const aujourdhuiISO = (() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; })();
  const citations = (reglages?.citations ?? []).filter((c) => c && c.texte?.trim()).slice(0, 3);
  const galerie = (reglages?.galerie ?? []).filter((x) => typeof x === "string" && x.startsWith("data:image/")).slice(0, 6);
  const programme = (reglages?.programme ?? []).filter((l) => l && (l.heure || l.titre)).slice(0, 8);
  const cibleMs = (() => {
    if (!date) return null;
    const m = (heureBrute ?? "").match(/(\d{1,2})\s*(?:h|:)\s*(\d{2})?/i);
    const hh = m ? String(Math.min(23, Number(m[1]))).padStart(2, "0") : "18";
    const mm = m?.[2] ?? "00";
    const v = new Date(`${date}T${hh}:${mm}:00+01:00`).getTime();
    return Number.isNaN(v) ? null : v;
  })();
  const lignes = nomsA.split(/\s+(?:et|and|و)\s+|\s*&\s*/i).map((x) => x.trim()).filter(Boolean);

  /* Carte à cadre fixe : le contenu est réparti en pages d'après la hauteur mesurée (voir PagesCarte). */
  const unitesCarte: UnitePage[] = [];
  if (ouv.carte) {
    const accueil = (m: boolean) => (<>
      {invite && <p className="inv-petit">{t.cher} {inviteA},</p>}
      <p className="inv-petit">{invite ? t.invites : t.invite}</p>
    </>);
    unitesCarte.push({ cle: "accueil", avecSuivante: true, rendre: accueil });
    unitesCarte.push({ cle: "noms", avecSuivante: true, rendre: (m) => (
      <h1 {...(m ? {} : { ref: nomsRef, tabIndex: -1, "data-testid": "rsvp-noms" })} className="inv-noms" aria-label={nomsA} style={{ "--nl": Math.max(6, ...lignes.map((l) => l.length * (l.length > 12 ? 1.3 : 1))) } as CSSProperties}>
        {lignes.length === 2 ? (<><Lettres texte={lignes[0]} base={0} ar={ar} /><span className="inv-et" aria-hidden="true">{ar ? "و" : "&"}</span><Lettres texte={lignes[1]} base={lignes[0].length + 2} ar={ar} /></>) : <Lettres texte={nomsA} base={0} ar={ar} />}
      </h1>) });
    unitesCarte.push({ cle: "trait", avecSuivante: true, rendre: () => <Trait /> });
    if (dp) unitesCarte.push({ cle: "date", rendre: (m) => (
      <div className="inv-date" {...(m ? {} : { "data-testid": "invitation-date" })}>
        <bdi className="inv-date-cote">{maj(part("weekday"))}</bdi><span className="inv-date-jour">{part("day")}</span><bdi className="inv-date-cote">{part("month")} {part("year")}</bdi>
      </div>) });
    if (heure) unitesCarte.push({ cle: "heure", rendre: () => <p className="inv-heure" dir="auto">{heure}</p> });
    if (lieuA) unitesCarte.push({ cle: "lieu", rendre: () => <p className="inv-lieu" dir="auto">{lieuA}</p> });
    if (carte) unitesCarte.push({ cle: "maps", rendre: () => <a className="inv-maps" href={carte} target="_blank" rel="noopener noreferrer"><MapPin className="h-4 w-4" aria-hidden="true" /> {t.itineraire}</a> });
    // texte libre : un paragraphe par unité ; trop long pour une page, il se répartit par phrases entières (jamais au milieu d'un verset)
    morceauxDeTexte(messageA).forEach((mo, k) => {
      const ph = phrases(mo.texte);
      const classe = (debut: boolean) => `inv-message inv-pag-msg${k === 0 && debut ? " inv-pag-msg-tete" : ""}`;
      unitesCarte.push({ cle: `msg-${k}`, saut: mo.saut, rendre: () => <p className={classe(true)} dir="auto">{mo.texte}</p>,
        ...(ph.length > 1 ? {
          fusion: (rendus, debut) => <p className={classe(debut)} dir="auto">{rendus}</p>,
          parties: ph.map((tx, j) => ({ cle: `msg-${k}-${j}`, rendre: (m: boolean) => (m ? <p className={classe(j === 0)} dir="auto">{tx}</p> : <span>{tx}</span>) })),
        } : {}) });
    });
    if (!pleinePage && children) unitesCarte.push({ cle: "suite", rendre: () => <div className="inv-suite">{children}</div> });
  }
  const repondreCarte = pleinePage && children ? <a className="inv-repondre" href="#inv-reponse" onClick={(e) => { e.preventDefault(); document.getElementById("inv-reponse")?.scrollIntoView({ behavior: "smooth", block: "center" }); }}>{t.repondreCourt}</a> : undefined;

  /* La carte déjà écrite, visible derrière les portes qui s'ouvrent : jamais de page vide. */
  const fondCarte = (!ouv.video && !sansAnimation()) ? (ouv.carte ? (
    <div className={`inv-carte inv-carte-film inv-cf-${ouv.id} inv-fond-statique`} style={{ "--film-r": ouv.carte.r ?? 180, "--film-fin": `url(${ouv.carte.fin})`, "--film-x": ouv.carte.x, "--film-y": ouv.carte.y, "--film-l": ouv.carte.l, "--film-h": ouv.carte.h, "--film-fond": ouv.carte.fond } as CSSProperties}>
      <div className="inv-film-zone"><PagesCarte unites={avecRevelation ? unitesCarte.filter((u) => u.cle !== "date") : unitesCarte} ar={ar} textes={t} repondre={false} signature={[langue, noms, date, lieu, heure, messageA, invite, reglages?.noms_ar, reglages?.lieu_ar, !!carte, "fond"].join("¤")} /></div>
    </div>
  ) : (
    <div className={`inv-carte inv-orn-${ornement} inv-fond-statique`}>
      {invite && <p className="inv-petit">{t.cher} {inviteA},</p>}
      <p className="inv-petit">{invite ? t.invites : t.invite}</p>
      <h2 className="inv-noms">
        {lignes.length === 2 ? (<><Lettres texte={lignes[0]} base={0} ar={langue === "ar"} /><span className="inv-et" aria-hidden="true">{langue === "ar" ? "و" : "&"}</span><Lettres texte={lignes[1]} base={lignes[0].length + 2} ar={langue === "ar"} /></>) : <Lettres texte={nomsA} base={0} ar={langue === "ar"} />}
      </h2>
      <Trait />
      {dp && !revEnLigne && !avecRevelation && (
        <div className="inv-date"><bdi className="inv-date-cote">{maj(part("weekday"))}</bdi><span className="inv-date-jour">{part("day")}</span><bdi className="inv-date-cote">{part("month")} {part("year")}</bdi></div>
      )}
      {heure && <p className="inv-heure" dir="auto">{heure}</p>}
      {lieuA && <p className="inv-lieu" dir="auto">{lieuA}</p>}
    </div>
  )) : null;
  return (
    <div className={`inv ${pleinePage ? "inv-page" : "inv-bloc"}`} style={style} dir={langue === "ar" ? "rtl" : "ltr"} lang={langue} data-phase={phase} data-testid="invitation">
      <div className="inv-particules" aria-hidden="true">{PARTICULES.map((q, i) => <span key={i} style={{ left: `${q.x}%`, width: q.s, height: q.s, animationDelay: `-${q.d}ms`, animationDuration: `${q.t}ms` }} />)}</div>
      <div className="inv-colonne">
      {haut}
      {(phase === "fermee" || phase === "ouverture") && ouv.id !== "enveloppe" && (
        <Ouverture key={ouv.id} nomsTexte={nomsA} sansCachet={reglages?.cachet !== true} type={ouv.id} phase={phase} libelle={t.ouvrir} libelleBouton={t.ouvrirBouton} initiales={initiales(nomsA)} nomsRef={emRef} onFilm={(e) => { if (e === "ended") terminerRef.current(); else window.setTimeout(() => terminerRef.current(), 400); }}
          fond={fondCarte} noms={lignes.length === 2 ? <>{lignes[0]}<small>{langue === "ar" ? "و" : "&"}</small>{lignes[1]}</> : nomsA}
          onOuvrir={() => { if (phase !== "fermee") return; if (pleinePage) pleinEcran(); lancerMusique(); setPhase("ouverture"); }} />
      )}
      {(phase === "fermee" || phase === "ouverture") && ouv.id === "enveloppe" && (
        <div className="inv-scene">
          <span className="inv-env-ombre" aria-hidden="true" />
          {fleurs && <><img className="inv-fleur inv-fleur-env-a" src="/fleurs/grenat-bouquet.webp" alt="" aria-hidden="true" decoding="async" draggable={false} /></>}
          <button type="button" className="inv-enveloppe" data-fermeture={["ficelle", "washi", "tissu"].includes(reglages?.fermeture ?? "") ? "ruban" : (reglages?.fermeture ?? "cachet")} data-fixation={reglages?.fermeture} data-papier={reglages?.papier} data-doublure={reglages?.doublure} onClick={() => { if (phase !== "fermee") return; if (pleinePage) pleinEcran(); lancerMusique(); setPhase("ouverture"); }} aria-label={t.ouvrir} data-testid="invitation-ouvrir">
            <span className="inv-env-fond" />
            <span className="inv-env-carte" data-orn={ornement}><span><em ref={emRef}>{lignes.length === 2 ? <>{lignes[0]}<small>{langue === "ar" ? "و" : "&"}</small>{lignes[1]}</> : nomsA}</em></span></span>
            <span className="inv-fl inv-fl-b"><i /></span>
            <span className="inv-fl inv-fl-g"><i /></span>
            <span className="inv-fl inv-fl-d"><i /></span>
            <span className="inv-fl inv-fl-h"><i /></span>
            <span className="inv-env-cachet"><em style={{ ["--n" as string]: initiales(nomsA).length } as CSSProperties}>{initiales(nomsA)}</em></span>
            <span className="inv-env-cachet inv-env-cachet-g" aria-hidden="true"><em style={{ ["--n" as string]: initiales(nomsA).length } as CSSProperties}>{initiales(nomsA)}</em></span>
            <span className="inv-env-cachet inv-env-cachet-d" aria-hidden="true"><em style={{ ["--n" as string]: initiales(nomsA).length } as CSSProperties}>{initiales(nomsA)}</em></span>
            <span className="inv-env-ruban" aria-hidden="true"><i /><b /><u /></span>
          </button>
          <p className="inv-aide" aria-hidden={phase !== "fermee"}>{t.ouvrir}</p>
        </div>
      )}
      {sortie && phase === "ouverte" && (
        <div className={`inv-film-sortie${ouv.carte ? " inv-fs-carte" : ""}${ouv.video ? " inv-fs-film" : ""}`} aria-hidden="true" style={sortie.r} onAnimationEnd={() => setSortie(null)}
          ref={(el) => { if (el && !el.firstChild) { sortie.canvas.className = "inv-film-img"; el.appendChild(sortie.canvas); } }} />
      )}
      {phase === "revelation" && (() => {
        const enCarte = (n: ReactNode) => ouv.carte ? (
          <div className={`inv-carte inv-carte-film inv-cf-${ouv.id} inv-rev-sur-carte`} style={{ "--film-r": ouv.carte.r ?? 180, "--film-fin": `url(${ouv.carte.fin})`, "--film-x": ouv.carte.x, "--film-y": ouv.carte.y, "--film-l": ouv.carte.l, "--film-h": ouv.carte.h, "--film-fond": ouv.carte.fond } as CSSProperties}>{n}</div>
        ) : n;
        const sousDate = dp ? { haut: maj(part("weekday")), jour: part("day"), bas: `${part("month")} ${part("year")}` } : { haut: "", jour: initiales(nomsA), bas: "" };
        return enCarte(revId === "bougies" || revId === "lanterne" || revId === "ballon"
          ? <RevelationGeste type={revId} langue={langue} noms={nomsA} sous={sousDate} onFini={() => setPhase("ouverte")} />
          : <Revelation rond={revId === "medaillon"} noms={nomsA} titre={revId === "medaillon" ? ({ fr: "Grattez le médaillon pour découvrir la date", en: "Scratch the medallion to reveal the date", ar: "اخدشوا الميدالية لاكتشاف التاريخ" } as Record<string, string>)[langue] : t.gratter} bouton={({ fr: "Passer · voir la date", en: "Skip · show the date", ar: "تخطي · عرض التاريخ" } as Record<string, string>)[langue]} onFini={() => setPhase("ouverte")} sous={sousDate} />);
      })()}
      {aMusique && phase !== "fermee" && (<button type="button" className="inv-musique" onClick={basculerSon} aria-pressed={son} aria-label={son ? "Couper la musique" : "Activer la musique"} data-testid="invitation-musique">{son ? "♪" : "♪̸"}</button>)}
      {phase === "ouverte" && (<>
        <article className={`inv-carte inv-orn-${ornement}${ouv.carte ? ` inv-carte-film inv-cf-${ouv.id}` : ""}${fondCarte || (ouv.video && !ouv.carte) ? " inv-sans-entree" : ""}`} data-testid="invitation-carte"
          style={ouv.carte ? ({ "--film-r": ouv.carte.r ?? 180, "--film-fin": `url(${ouv.carte.fin})`, "--film-x": ouv.carte.x, "--film-y": ouv.carte.y, "--film-l": ouv.carte.l, "--film-h": ouv.carte.h, "--film-fond": ouv.carte.fond } as CSSProperties) : undefined}>
          <div className="inv-etincelles" aria-hidden="true">{ETINCELLES.map((e, i) => <span key={i} style={{ left: `${e.x}%`, animationDelay: `${e.d}ms`, animationDuration: `${e.t + 900}ms`, width: e.s, height: e.s }} />)}</div>
          <div className="inv-motif" aria-hidden="true" />
          {fleurs && <img className="inv-fleur inv-fleur-carte" src="/fleurs/grenat-bouquet.webp" alt="" aria-hidden="true" decoding="async" draggable={false} />}
          <div className="inv-ornement">{reglages?.decor && reglages.decor !== "aucun" ? <Decor id={reglages.decor} club={reglages.club} logo={reglages.club_logo} prenom={lignes[0]} /> : <Ornement type={ornement} />}</div>
          {ouv.carte ? (
            <div className="inv-film-zone"><PagesCarte unites={unitesCarte} ar={ar} textes={t} repondre={repondreCarte}
              signature={[langue, noms, date, lieu, heure, messageA, invite, reglages?.noms_ar, reglages?.lieu_ar, !!carte].join("¤")} /></div>
          ) : <>
          {invite && <p className="inv-petit">{t.cher} {inviteA},</p>}
          <p className="inv-petit">{invite ? t.invites : t.invite}</p>
          <h1 ref={nomsRef} tabIndex={-1} className="inv-noms" data-testid="rsvp-noms" aria-label={nomsA}>
            {lignes.length === 2 ? (<><Lettres texte={lignes[0]} base={0} ar={langue === "ar"} /><span className="inv-et" aria-hidden="true">{langue === "ar" ? "و" : "&"}</span><Lettres texte={lignes[1]} base={lignes[0].length + 2} ar={langue === "ar"} /></>) : <Lettres texte={nomsA} base={0} ar={langue === "ar"} />}</h1>
          <Trait />
          {dp && revEnLigne && !sansAnimation() && (<>
            <Revelation enLigne rond={revId === "medaillon"} noms={nomsA} titre={revId === "medaillon" ? ({ fr: "Grattez le médaillon pour découvrir la date", en: "Scratch the medallion to reveal the date", ar: "اخدشوا الميدالية لاكتشاف التاريخ" } as Record<string, string>)[langue] : t.gratter} bouton={({ fr: "Passer · voir la date", en: "Skip · show the date", ar: "تخطي · عرض التاريخ" } as Record<string, string>)[langue]} onFini={() => {}} sous={{ haut: maj(part("weekday")), jour: part("day"), bas: `${part("month")} ${part("year")}` }} />
            <span className="inv-sr-seul" data-testid="invitation-date">{maj(part("weekday"))} {part("day")} {part("month")} {part("year")}</span>
          </>)}
          {dp && !(revEnLigne && !sansAnimation()) && (
            <div className="inv-date" data-testid="invitation-date">
              <bdi className="inv-date-cote">{maj(part("weekday"))}</bdi>
              <span className="inv-date-jour">{part("day")}</span>
              <bdi className="inv-date-cote">{part("month")} {part("year")}</bdi>
            </div>
          )}
          {heure && <p className="inv-heure" dir="auto">{heure}</p>}
          {lieuA && <p className="inv-lieu" dir="auto">{lieuA}</p>}
          {!pleinePage && carte && (
            <a className="inv-maps" href={carte} target="_blank" rel="noopener noreferrer"><MapPin className="h-4 w-4" aria-hidden="true" /> {t.maps}</a>
          )}
          {!pleinePage && messageSimple && <p className="inv-message" dir="auto">{messageSimple}</p>}
          {pleinePage && <p className="inv-defiler" aria-hidden="true"><span>{t.defiler}</span><i /></p>}
          {pleinePage && children && <a className="inv-repondre" href="#inv-reponse" onClick={(e) => { e.preventDefault(); document.getElementById("inv-reponse")?.scrollIntoView({ behavior: "smooth", block: "center" }); }}>{t.repondre}</a>}
          {!pleinePage && children && <div className="inv-suite">{children}</div>}
          </>}
        {pleinePage && (
          <div className="inv-histoire">
            <Section nuit className="inv-sec-anneaux">{ev.anneaux ? <Anneaux /> : <div className="inv-etoile" aria-hidden="true"><Ornement type="khatam" /></div>}<p className="inv-sec-mot">{t.alliances}</p></Section>
            {cibleMs && (cibleMs > Date.now() || date === aujourdhuiISO) && <Section nuit titre={t.compte}><CompteARebours cible={cibleMs} t={t} />{date && <Calendrier date={date} locale={t.locale} label={`${maj(part("weekday"))} ${part("day")} ${part("month")} ${part("year")}`} khatam={!!reglages?.evenement && reglages.evenement !== "mariage"} />}</Section>}
            {cibleMs && cibleMs > Date.now() && (
              <Section nuit><a className="inv-maps" href={lienAgenda({ titre: noms, date, debutMs: heureBrute ? cibleMs : null, lieu: lieu ?? undefined })} target="_blank" rel="noopener noreferrer" data-testid="invitation-agenda"><CalendarPlus className="h-4 w-4" aria-hidden="true" /> {t.agenda}</a></Section>
            )}
            {(lieu || carte) && (
              <Section nuit titre={t.lieuTitre}>
                {lieuA && <p className="inv-lieu" dir="auto" style={{ marginBottom: 12 }}>{lieuA}</p>}
                {lieu && avecPlan && <div className="inv-carte-g"><a className="inv-voile" href={carte ?? undefined} target="_blank" rel="noopener noreferrer" aria-label={t.itineraire} /><iframe title={lieuA} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://maps.google.com/maps?q=${encodeURIComponent(lieu)}&z=15&output=embed`} /></div>}
                {carte && <a className="inv-maps" href={carte} target="_blank" rel="noopener noreferrer"><MapPin className="h-4 w-4" aria-hidden="true" /> {t.itineraire}</a>}
              </Section>
            )}
            {programme.length > 0 && (
              <Section titre={t.programmeTitre}>
                <ol className="inv-programme">{programme.map((l, k) => <Moment key={k} k={k}><b>{ar ? heure_ar(l.heure) : l.heure}</b><span dir="auto">{ar ? (l.titre_ar?.trim() || titre_ar(l.titre)) : l.titre}</span></Moment>)}</ol>
              </Section>
            )}
            {citations.length > 0 && (
              <Section nuit>{citations.map((c, k) => <figure key={k} className="inv-citation"><blockquote dir="auto">« {c.texte} »</blockquote>{c.auteur && <figcaption>{c.auteur}</figcaption>}</figure>)}</Section>
            )}
            {galerie.length > 0 && (
              <Section titre={t.galerieTitre}>{galerie.length >= 2
                ? <div className="inv-carrousel" data-testid="invitation-carrousel" onPointerDown={(e) => { e.currentTarget.dataset.pause = "1"; }} onPointerUp={(e) => { delete e.currentTarget.dataset.pause; }} onPointerCancel={(e) => { delete e.currentTarget.dataset.pause; }} onPointerLeave={(e) => { delete e.currentTarget.dataset.pause; }}>
                    <div className="inv-car-piste">{[...galerie, ...galerie].map((src, k) => <img key={k} src={src} alt="" aria-hidden={k >= galerie.length || undefined} loading="lazy" decoding="async" />)}</div>
                  </div>
                : <div className="inv-galerie">{galerie.map((src, k) => <img key={k} src={src} alt="" loading="lazy" decoding="async" />)}</div>}</Section>
            )}
            {messageSimple && !ouv.carte && <Section><p className="inv-message" dir="auto" style={{ border: 0, padding: 0, margin: 0 }}>{messageSimple}</p></Section>}
            {children && <Section id="inv-reponse" titre={t.reponseTitre} className="inv-sec-reponse">{children}</Section>}
          </div>
        )}
        </article>
        {pleinePage && !sansAnimation() && <button type="button" className="inv-rejouer" onClick={() => { setSortie(null); setPhase("fermee"); window.scrollTo({ top: 0 }); }} data-testid="invitation-rejouer">↺ {t.rejouer}</button>}
      </>)}
      {phase === "ouverture" && pleinePage && <button type="button" className="inv-passer" onClick={() => terminerRef.current()} data-testid="invitation-passer">{t.passer}</button>}
      {bas}
      </div>
    </div>
  );
}
