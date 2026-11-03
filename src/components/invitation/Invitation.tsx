import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { MapPin } from "lucide-react";
import { couleursDe, initiales, lienMaps, modeleDe, surCouleur, TEXTES, type InvitationReglages, type Langue, type Ornement } from "@/lib/invitation";
import "@fontsource/pinyon-script/latin-400.css";
import "@fontsource/pinyon-script/latin-ext-400.css";
import "@fontsource/amiri/arabic-400.css";
import "@fontsource/amiri/arabic-700.css";
import "@/styles/invitation.css";

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

export default function Invitation({ noms, date, lieu, message, reglages, langue = "fr", invite, ouverte = false, rejouer = 0, pleinePage = true, haut, bas, children }: InvitationProps) {
  const c = useMemo(() => couleursDe(reglages), [reglages]);
  const modele = reglages?.modele;
  const ornement = modeleDe(modele).ornement;
  const t = TEXTES[langue];
  const [phase, setPhase] = useState<"fermee" | "ouverture" | "ouverte">(ouverte || sansAnimation() ? "ouverte" : "fermee");

  useEffect(() => { setPhase(ouverte || sansAnimation() ? "ouverte" : "fermee"); }, [ouverte, rejouer]);
  useEffect(() => {
    if (phase !== "ouverture") return;
    const id = window.setTimeout(() => setPhase("ouverte"), sansAnimation() ? 0 : 2450);
    return () => window.clearTimeout(id);
  }, [phase]);

  const style = {
    "--inv-fond": c.fond, "--inv-env": c.enveloppe, "--inv-papier": c.papier, "--inv-texte": c.texte, "--inv-accent": c.accent,
    "--inv-sur-env": surCouleur(c.enveloppe), "--inv-sur-fond": surCouleur(c.fond), "--inv-sur-accent": surCouleur(c.accent),
  } as CSSProperties;
  const carte = lienMaps(reglages, lieu);
  const heure = reglages?.heure?.trim();
  const dp = date ? new Intl.DateTimeFormat(t.locale, { timeZone: "UTC", weekday: "long", day: "numeric", month: "long", year: "numeric" }).formatToParts(new Date(date + "T00:00:00Z")) : null;
  const part = (k: string) => dp?.find((x) => x.type === k)?.value ?? "";
  const maj = (v: string) => v.charAt(0).toLocaleUpperCase(t.locale) + v.slice(1);
  const lignes = noms.split(/\s+(?:et|and|و)\s+|\s*&\s*/i).map((x) => x.trim()).filter(Boolean);

  return (
    <div className={`inv ${pleinePage ? "inv-page" : "inv-bloc"}`} style={style} dir={langue === "ar" ? "rtl" : "ltr"} data-phase={phase} data-testid="invitation">
      <div className="inv-colonne">
      {haut}
      {phase !== "ouverte" && (
        <div className="inv-scene">
          <span className="inv-env-ombre" aria-hidden="true" />
          <button type="button" className="inv-enveloppe" onClick={() => phase === "fermee" && setPhase("ouverture")} aria-label={t.ouvrir} data-testid="invitation-ouvrir">
            <span className="inv-env-fond" />
            <span className="inv-env-carte"><span><em>{lignes.length === 2 ? <>{lignes[0]}<small>&</small>{lignes[1]}</> : noms}</em></span></span>
            <span className="inv-fl inv-fl-b"><i /></span>
            <span className="inv-fl inv-fl-g"><i /></span>
            <span className="inv-fl inv-fl-d"><i /></span>
            <span className="inv-fl inv-fl-h"><i /></span>
            <span className="inv-env-cachet"><em>{initiales(noms)}</em></span>
          </button>
          <p className="inv-aide" aria-hidden={phase !== "fermee"}>{t.ouvrir}</p>
        </div>
      )}
      {phase === "ouverte" && (
        <article className={`inv-carte inv-orn-${ornement}`} data-testid="invitation-carte">
          <div className="inv-etincelles" aria-hidden="true">{ETINCELLES.map((e, i) => <span key={i} style={{ left: `${e.x}%`, animationDelay: `${e.d}ms`, animationDuration: `${e.t + 900}ms`, width: e.s, height: e.s }} />)}</div>
          <div className="inv-motif" aria-hidden="true" />
          <div className="inv-ornement"><Ornement type={ornement} /></div>
          {invite && <p className="inv-petit">{t.cher} {invite},</p>}
          <p className="inv-petit">{invite ? t.invites : t.invite}</p>
          <h1 className="inv-noms" data-testid="rsvp-noms" aria-label={noms}>
            {lignes.length === 2 ? (<><Lettres texte={lignes[0]} base={0} ar={langue === "ar"} /><span className="inv-et" aria-hidden="true">&</span><Lettres texte={lignes[1]} base={lignes[0].length + 2} ar={langue === "ar"} /></>) : <Lettres texte={noms} base={0} ar={langue === "ar"} />}</h1>
          <svg className="inv-trait" viewBox="0 0 220 14" aria-hidden="true"><path pathLength="1" d="M4 8c30-9 58 6 92-1s58-6 78 0c14 4 28 3 42-2" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
          {dp && (
            <div className="inv-date" data-testid="invitation-date">
              <bdi className="inv-date-cote">{maj(part("weekday"))}</bdi>
              <span className="inv-date-jour">{part("day")}</span>
              <bdi className="inv-date-cote">{part("month")} {part("year")}</bdi>
            </div>
          )}
          {heure && <p className="inv-heure" dir="auto">{heure}</p>}
          {lieu && <p className="inv-lieu" dir="auto">{lieu}</p>}
          {carte && (
            <a className="inv-maps" href={carte} target="_blank" rel="noopener noreferrer"><MapPin className="h-4 w-4" aria-hidden="true" /> {t.maps}</a>
          )}
          {message && <p className="inv-message" dir="auto">{message}</p>}
          {children && <div className="inv-suite">{children}</div>}
        </article>
      )}
      {bas}
      </div>
    </div>
  );
}
