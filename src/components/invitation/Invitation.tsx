import { noms_ar, nomInvite_ar, lieu_ar, heure_ar, titre_ar } from "@/lib/arabe";
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { MapPin } from "lucide-react";
import Ouverture from "./Ouverture";
import Revelation from "./Revelation";
import { couleursDe, initiales, lienMaps, modeleDe, ouvertureDe, revelationDe, surCouleur, TEXTES, type InvitationReglages, type Langue, type Ornement } from "@/lib/invitation";
import "@fontsource/pinyon-script/latin-400.css";
import "@fontsource/pinyon-script/latin-ext-400.css";
import "@fontsource/amiri/arabic-400.css";
import "@fontsource/amiri/arabic-700.css";
import "@/styles/invitation.css";
import "@/styles/ouvertures.css";

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

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [vu, setVu] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setVu(true); return; }
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { setVu(true); io.disconnect(); } }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, vu] as const;
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

export default function Invitation({ noms, date, lieu, message, reglages, langue = "fr", invite, ouverte = false, autoOuvrir = false, rejouer = 0, pleinePage = true, haut, bas, children }: InvitationProps) {
  const c = useMemo(() => couleursDe(reglages), [reglages]);
  const modele = reglages?.modele;
  const ornement = modeleDe(modele).ornement;
  const t = TEXTES[langue];
  const ouv = ouvertureDe(reglages?.ouverture);
  const avecRevelation = revelationDe(reglages?.revelation).id === "coeur" && !sansAnimation();
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
  useEffect(() => {
    if (phase !== "ouverture") return;
    const id = window.setTimeout(() => { depart.current = avecRevelation ? null : (emRef.current?.getBoundingClientRect() ?? null); setPhase(avecRevelation ? "revelation" : "ouverte"); }, sansAnimation() ? 0 : ouv.duree);
    return () => window.clearTimeout(id);
  }, [phase, ouv.duree, avecRevelation]);
  useEffect(() => {
    const saute = () => { if (document.visibilityState === "hidden") setPhase((p) => (p === "ouverture" ? "ouverte" : p)); };
    document.addEventListener("visibilitychange", saute);
    return () => document.removeEventListener("visibilitychange", saute);
  }, []);

  const style = {
    "--inv-fond": c.fond, "--inv-env": c.enveloppe, "--inv-papier": c.papier, "--inv-texte": c.texte, "--inv-accent": c.accent,
    "--inv-sur-env": surCouleur(c.enveloppe), "--inv-sur-fond": surCouleur(c.fond), "--inv-sur-accent": surCouleur(c.accent),
  } as CSSProperties;
  const ar = langue === "ar";
  const carte = lienMaps(reglages, lieu);
  const heureBrute = reglages?.heure?.trim();
  const heure = heureBrute && ar ? heure_ar(heureBrute) : heureBrute;
  const nomsA = ar ? (reglages?.noms_ar?.trim() || noms_ar(noms)) : noms;
  const lieuA = ar && lieu ? (reglages?.lieu_ar?.trim() || lieu_ar(lieu)) : lieu;
  const messageA = ar && message ? (reglages?.message_ar?.trim() || message) : message;
  const inviteA = ar && invite ? nomInvite_ar(invite) : invite;
  const dp = date ? new Intl.DateTimeFormat(t.locale, { timeZone: "UTC", weekday: "long", day: "numeric", month: "long", year: "numeric" }).formatToParts(new Date(date + "T00:00:00Z")) : null;
  const part = (k: string) => dp?.find((x) => x.type === k)?.value ?? "";
  const maj = (v: string) => v.charAt(0).toLocaleUpperCase(t.locale) + v.slice(1);
  const aujourdhuiISO = (() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; })();
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

  return (
    <div className={`inv ${pleinePage ? "inv-page" : "inv-bloc"}`} style={style} dir={langue === "ar" ? "rtl" : "ltr"} data-phase={phase} data-testid="invitation">
      <div className="inv-colonne">
      {haut}
      {(phase === "fermee" || phase === "ouverture") && ouv.id !== "enveloppe" && (
        <Ouverture type={ouv.id} phase={phase} libelle={t.ouvrir} nomsRef={emRef}
          noms={lignes.length === 2 ? <>{lignes[0]}<small>{langue === "ar" ? "و" : "&"}</small>{lignes[1]}</> : nomsA}
          onOuvrir={() => { if (phase !== "fermee") return; if (pleinePage) pleinEcran(); setPhase("ouverture"); }} />
      )}
      {(phase === "fermee" || phase === "ouverture") && ouv.id === "enveloppe" && (
        <div className="inv-scene">
          <span className="inv-env-ombre" aria-hidden="true" />
          <button type="button" className="inv-enveloppe" onClick={() => { if (phase !== "fermee") return; if (pleinePage) pleinEcran(); setPhase("ouverture"); }} aria-label={t.ouvrir} data-testid="invitation-ouvrir">
            <span className="inv-env-fond" />
            <span className="inv-env-carte" data-orn={ornement}><span><em ref={emRef}>{lignes.length === 2 ? <>{lignes[0]}<small>{langue === "ar" ? "و" : "&"}</small>{lignes[1]}</> : nomsA}</em></span></span>
            <span className="inv-fl inv-fl-b"><i /></span>
            <span className="inv-fl inv-fl-g"><i /></span>
            <span className="inv-fl inv-fl-d"><i /></span>
            <span className="inv-fl inv-fl-h"><i /></span>
            <span className="inv-env-cachet"><em>{initiales(nomsA)}</em></span>
          </button>
          <p className="inv-aide" aria-hidden={phase !== "fermee"}>{t.ouvrir}</p>
        </div>
      )}
      {phase === "revelation" && (
        <Revelation noms={nomsA} titre={t.gratter} bouton={t.decouvrir} onFini={() => setPhase("ouverte")}
          sous={dp ? { haut: maj(part("weekday")), jour: part("day"), bas: `${part("month")} ${part("year")}` } : { haut: "", jour: initiales(nomsA), bas: "" }} />
      )}
      {phase === "ouverte" && (<>
        <article className={`inv-carte inv-orn-${ornement}`} data-testid="invitation-carte">
          <div className="inv-etincelles" aria-hidden="true">{ETINCELLES.map((e, i) => <span key={i} style={{ left: `${e.x}%`, animationDelay: `${e.d}ms`, animationDuration: `${e.t + 900}ms`, width: e.s, height: e.s }} />)}</div>
          <div className="inv-motif" aria-hidden="true" />
          <div className="inv-ornement"><Ornement type={ornement} /></div>
          {invite && <p className="inv-petit">{t.cher} {inviteA},</p>}
          <p className="inv-petit">{invite ? t.invites : t.invite}</p>
          <h1 ref={nomsRef} className="inv-noms" data-testid="rsvp-noms" aria-label={nomsA}>
            {lignes.length === 2 ? (<><Lettres texte={lignes[0]} base={0} ar={langue === "ar"} /><span className="inv-et" aria-hidden="true">{langue === "ar" ? "و" : "&"}</span><Lettres texte={lignes[1]} base={lignes[0].length + 2} ar={langue === "ar"} /></>) : <Lettres texte={nomsA} base={0} ar={langue === "ar"} />}</h1>
          <svg className="inv-trait" viewBox="0 0 220 14" aria-hidden="true"><path pathLength="1" d="M4 8c30-9 58 6 92-1s58-6 78 0c14 4 28 3 42-2" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
          {dp && (
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
          {!pleinePage && messageA && <p className="inv-message" dir="auto">{messageA}</p>}
          {pleinePage && <p className="inv-defiler" aria-hidden="true"><span>{t.defiler}</span><i /></p>}
          {pleinePage && children && <a className="inv-repondre" href="#inv-reponse" onClick={(e) => { e.preventDefault(); document.getElementById("inv-reponse")?.scrollIntoView({ behavior: "smooth", block: "center" }); }}>{t.repondre}</a>}
          {!pleinePage && children && <div className="inv-suite">{children}</div>}
        {pleinePage && (
          <div className="inv-histoire">
            <Section nuit className="inv-sec-anneaux"><Anneaux /><p className="inv-sec-mot">{t.alliances}</p></Section>
            {cibleMs && (cibleMs > Date.now() || date === aujourdhuiISO) && <Section nuit titre={t.compte}><CompteARebours cible={cibleMs} t={t} /></Section>}
            {(lieu || carte) && (
              <Section nuit titre={t.lieuTitre}>
                {lieuA && <p className="inv-lieu" dir="auto" style={{ marginBottom: 12 }}>{lieuA}</p>}
                {lieu && <div className="inv-carte-g"><a className="inv-voile" href={carte ?? undefined} target="_blank" rel="noopener noreferrer" aria-label={t.itineraire} /><iframe title={lieuA} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://maps.google.com/maps?q=${encodeURIComponent(lieu)}&z=15&output=embed`} /></div>}
                {carte && <a className="inv-maps" href={carte} target="_blank" rel="noopener noreferrer"><MapPin className="h-4 w-4" aria-hidden="true" /> {t.itineraire}</a>}
              </Section>
            )}
            {programme.length > 0 && (
              <Section titre={t.programmeTitre}>
                <ol className="inv-programme">{programme.map((l, k) => <li key={k} style={{ ["--k" as string]: k } as CSSProperties}><b>{ar ? heure_ar(l.heure) : l.heure}</b><span dir="auto">{ar ? (l.titre_ar?.trim() || titre_ar(l.titre)) : l.titre}</span></li>)}</ol>
              </Section>
            )}
            {messageA && <Section><p className="inv-message" dir="auto" style={{ border: 0, padding: 0, margin: 0 }}>{messageA}</p></Section>}
            {children && <Section id="inv-reponse" titre={t.reponseTitre} className="inv-sec-reponse">{children}</Section>}
          </div>
        )}
        </article>
      </>)}
      {bas}
      </div>
    </div>
  );
}
