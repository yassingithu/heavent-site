import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { MapPin } from "lucide-react";
import { couleursDe, initiales, lienMaps, modeleDe, surCouleur, TEXTES, type InvitationReglages, type Langue, type Ornement } from "@/lib/invitation";
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
    const id = window.setTimeout(() => setPhase("ouverte"), 1900);
    return () => window.clearTimeout(id);
  }, [phase]);

  const style = {
    "--inv-fond": c.fond, "--inv-env": c.enveloppe, "--inv-papier": c.papier, "--inv-texte": c.texte, "--inv-accent": c.accent,
    "--inv-sur-env": surCouleur(c.enveloppe), "--inv-sur-fond": surCouleur(c.fond), "--inv-sur-accent": surCouleur(c.accent),
  } as CSSProperties;
  const carte = lienMaps(reglages, lieu);
  const heure = reglages?.heure?.trim();
  const dateTxt = date ? new Date(date + "T00:00:00Z").toLocaleDateString(t.locale, { timeZone: "UTC", weekday: "long", day: "numeric", month: "long", year: "numeric" }) : null;

  return (
    <div className={`inv ${pleinePage ? "inv-page" : "inv-bloc"}`} style={style} dir={langue === "ar" ? "rtl" : "ltr"} data-phase={phase} data-testid="invitation">
      <div className="inv-colonne">
      {haut}
      {phase !== "ouverte" && (
        <div className="inv-scene">
          <button type="button" className="inv-enveloppe" onClick={() => phase === "fermee" && setPhase("ouverture")} aria-label={t.ouvrir} data-testid="invitation-ouvrir">
            <span className="inv-env-fond" />
            <span className="inv-env-carte"><span /></span>
            <span className="inv-env-poche" />
            <span className="inv-env-rabat" />
            <span className="inv-env-cachet">{initiales(noms)}</span>
          </button>
          <p className="inv-aide" aria-hidden={phase !== "fermee"}>{t.ouvrir}</p>
        </div>
      )}
      {phase === "ouverte" && (
        <article className={`inv-carte inv-orn-${ornement}`} data-testid="invitation-carte">
          <div className="inv-ornement"><Ornement type={ornement} /></div>
          {invite && <p className="inv-petit">{t.cher} {invite},</p>}
          <p className="inv-petit">{invite ? t.invites : t.invite}</p>
          <h1 className="inv-noms" data-testid="rsvp-noms">{noms}</h1>
          {dateTxt && <p className="inv-date">{dateTxt}{heure ? ` · ${heure}` : ""}</p>}
          {lieu && <p className="inv-lieu">{lieu}</p>}
          {carte && (
            <a className="inv-maps" href={carte} target="_blank" rel="noopener noreferrer"><MapPin className="h-4 w-4" aria-hidden="true" /> {t.maps}</a>
          )}
          {message && <p className="inv-message">{message}</p>}
          {children && <div className="inv-suite">{children}</div>}
        </article>
      )}
      {bas}
      </div>
    </div>
  );
}
