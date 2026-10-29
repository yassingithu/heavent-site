import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ConciergeBell } from "lucide-react";
import type { Dispatch } from "react";
import { INVITES, MESSAGE_BIENVENUE, PROMESSE, TYPES, VILLES, type TypeEvt } from "./donnees";
import type { Action, Choix } from "./etat";
import { ChampNombre, btnContour, btnOr, champ } from "./ui";
import { localeDates, tr } from "./langue";

/** Écran de titre : la ville animée derrière, le nom du jeu et le bouton de départ */
export function Titre({ onCommencer, onReprendre, onRecommencer, logo, sauvegarde }: { onCommencer: () => void; onReprendre?: () => void; onRecommencer?: () => void; logo: string; sauvegarde: boolean }) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-[#17141a]/55 via-[#17141a]/35 to-[#17141a]/80 px-5">
      <div className="max-w-xl text-center">
        <img src={logo} alt="Heavent People Agency" className="mx-auto h-14 w-auto sm:h-16" />
        <p className="mt-6 text-[12px] uppercase tracking-[0.34em] text-[#E4D49A]">{tr("Mission événement")}</p>
        <h1 className="mt-2 font-serif text-5xl leading-[1.02] text-[#F6EFDD] drop-shadow-lg sm:text-6xl">Heavent City</h1>
        <p className="mx-auto mt-4 max-w-md text-[17px] leading-snug text-[#F0E8D6] drop-shadow">{tr(PROMESSE)}</p>
        <div className="mt-7 flex flex-col items-center gap-3">
          <button onClick={onCommencer} className={`${btnOr} min-h-12 px-8 text-base`} data-testid="commencer">{tr("Commencer ma mission")}</button>
          {sauvegarde && (
            <div className="flex flex-wrap justify-center gap-2.5">
              <button onClick={onReprendre} className={btnContour} data-testid="reprendre">{tr("Reprendre ma partie")}</button>
              <button onClick={onRecommencer} className={btnContour} data-testid="recommencer-titre">{tr("Recommencer")}</button>
            </div>
          )}
          <p className="text-[12.5px] text-[#D9D0BC]">{tr("Sans inscription · 3 à 5 minutes · aucun prix affiché")}</p>
          <a href="/" className="text-[12.5px] text-[#E4D49A] underline underline-offset-4" data-testid="retour-site">{tr("Retour au site Heavent")}</a>
        </div>
      </div>
    </div>
  );
}

const Q = [
  { id: "type", texte: "Quel type d'événement prépares-tu ?" },
  { id: "nom", texte: "Comment s'appelle-t-il ? Des prénoms, un nom… c'est facultatif." },
  { id: "ville", texte: "Dans quelle ville aura-t-il lieu ?" },
  { id: "invites", texte: "Combien d'invités environ ?" },
  { id: "date", texte: "As-tu déjà une date en tête ?" },
] as const;

/** Le téléphone reçoit un message de la Conciergerie, puis pose quelques questions, une à la fois. Tout peut être passé. */
export function Questions({ choix, dispatch, onTermine }: { choix: Choix; dispatch: Dispatch<Action>; onTermine: () => void }) {
  const [etape, setEtape] = useState(choix.type ? 1 : 0);
  const [nom, setNom] = useState(choix.nomEvt);
  const [autre, setAutre] = useState(false);
  const [villeLibre, setVilleLibre] = useState(choix.ville && !VILLES.includes(choix.ville) ? choix.ville : "");
  const fin = useRef<HTMLDivElement>(null);
  useEffect(() => { fin.current?.scrollIntoView({ block: "end", behavior: "smooth" }); }, [etape, autre]);
  const choisir = (patch: Partial<Choix>) => dispatch({ t: "choisir", patch });
  const suite = () => (etape >= Q.length - 1 ? onTermine() : setEtape(etape + 1));

  const reponse = (id: string): string | null => {
    if (id === "type") return TYPES.find((t) => t.id === choix.type)?.nom ?? null;
    if (id === "nom") return choix.nomEvt || tr("Je passe");
    if (id === "ville") return choix.ville ? tr(choix.ville) : tr("Je passe");
    if (id === "invites") return tr("Environ {n}", { n: choix.invites });
    if (id === "date") return choix.dateInconnue ? tr("Je ne sais pas encore") : choix.date ? new Date(choix.date + "T12:00:00").toLocaleDateString(localeDates(), { day: "numeric", month: "long", year: "numeric" }) : tr("Je passe");
    return null;
  };
  const type = TYPES.find((t) => t.id === choix.type);
  const Bulle = ({ moi, children }: { moi?: boolean; children: React.ReactNode }) => (
    <div className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[14.5px] leading-snug ${moi ? "ms-auto rounded-ee-md bg-[#C9A74E] text-[#17141a]" : "rounded-es-md bg-white/10 text-[#F0E8D6]"}`}>{children}</div>
  );

  return (
    <div className="absolute inset-0 z-10 flex items-end justify-center bg-gradient-to-b from-[#17141a]/40 to-[#17141a]/85 sm:items-center" data-testid="questions">
      <div className="flex h-[86dvh] w-full max-w-md flex-col overflow-hidden rounded-t-[28px] border border-white/15 bg-[#17141a] shadow-2xl sm:h-[640px] sm:rounded-[36px] sm:border-[7px] sm:border-[#0b0a0d]">
        <div className="flex shrink-0 items-center gap-2.5 border-b border-white/10 px-4 py-3">
          {etape > 0 && <button onClick={() => setEtape(etape - 1)} aria-label={tr("Question précédente")} className="flex h-9 w-9 items-center justify-center rounded-full text-[#d8cfbb] hover:bg-white/10"><ChevronLeft className="h-5 w-5" /></button>}
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C9A74E] text-[#17141a]"><ConciergeBell className="h-[18px] w-[18px]" /></span>
          <div className="flex-1"><p className="font-serif text-[16px] leading-none text-[#F6EFDD]">{tr("Conciergerie Heavent")}</p><p className="mt-0.5 text-[11px] text-[#9d9585]">{tr("Question {n} sur {total}", { n: etape + 1, total: Q.length })}</p></div>
        </div>
        <div className="min-h-0 flex-1 space-y-2.5 overflow-y-auto bg-[#1d1920] px-3 py-3" aria-live="polite">
          <Bulle>{tr(MESSAGE_BIENVENUE)}</Bulle>
          {Q.slice(0, etape + 1).map((q, i) => (
            <div key={q.id} className="space-y-2.5">
              <Bulle>{i === 1 && type ? tr("Parfait : {type}.", { type: type.nom.toLowerCase() }) + " " + tr(q.texte) : tr(q.texte)}</Bulle>
              {i < etape && <Bulle moi>{reponse(q.id)}</Bulle>}
            </div>
          ))}
          <div ref={fin} />
        </div>
        <div className="shrink-0 border-t border-white/10 bg-[#141116] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          {etape === 0 && (
            <div className="grid gap-2" role="radiogroup" aria-label={tr("Type d'événement")}>
              {TYPES.map((t) => (
                <button key={t.id} role="radio" aria-checked={choix.type === t.id} data-testid={`type-${t.id}`} onClick={() => { choisir({ type: t.id as TypeEvt }); setEtape(1); }}
                  className="flex min-h-14 items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.05] px-3.5 text-start text-[15px] text-[#F6EFDD] transition hover:bg-white/10 active:scale-[.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F4D774]">
                  <span className="text-xl" aria-hidden="true">{t.emoji}</span>{t.nom}
                </button>
              ))}
            </div>
          )}
          {etape === 1 && (
            <div className="grid gap-2">
              <label htmlFor="q-nom" className="sr-only">{tr("Nom de l'événement")}</label>
              <input id="q-nom" value={nom} maxLength={60} onChange={(e) => setNom(e.target.value)} placeholder={type?.nomPlaceholder ?? tr("Facultatif")} className={champ} data-testid="q-nom" onKeyDown={(e) => { if (e.key === "Enter") { choisir({ nomEvt: nom }); suite(); } }} />
              <div className="flex gap-2"><button className={`${btnOr} flex-1`} onClick={() => { choisir({ nomEvt: nom }); suite(); }} data-testid="q-suite">{tr("Continuer")}</button><button className={btnContour} onClick={() => { choisir({ nomEvt: "" }); setNom(""); suite(); }} data-testid="q-passer">{tr("Passer")}</button></div>
            </div>
          )}
          {etape === 2 && (
            <div className="grid gap-2">
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={tr("Ville")}>
                {VILLES.map((v) => (
                  <button key={v} role="radio" aria-checked={choix.ville === v} onClick={() => { if (v === "Autre ville") { setAutre(true); return; } choisir({ ville: v }); setAutre(false); suite(); }} data-testid={`ville-${v}`}
                    className="min-h-10 rounded-full border border-white/15 bg-white/[0.05] px-3.5 text-[14px] text-[#F6EFDD] hover:bg-white/10">{tr(v)}</button>
                ))}
              </div>
              {autre && (
                <div className="flex gap-2"><label htmlFor="q-ville" className="sr-only">{tr("Ville")}</label><input id="q-ville" value={villeLibre} onChange={(e) => setVilleLibre(e.target.value)} placeholder={tr("Ta ville")} className={champ} autoFocus data-testid="q-ville" /><button className={btnOr} onClick={() => { choisir({ ville: villeLibre.trim() }); setAutre(false); suite(); }}>OK</button></div>
              )}
              <button className={btnContour} onClick={() => { choisir({ ville: "" }); suite(); }} data-testid="q-passer">{tr("Passer")}</button>
            </div>
          )}
          {etape === 3 && (
            <div className="grid gap-3">
              <div className="flex items-center gap-3">
                <button aria-label={tr("Moins d'invités")} className={`${btnContour} !px-0 w-11`} onClick={() => choisir({ invites: Math.max(INVITES.min, choix.invites - 10) })}>−</button>
                <label htmlFor="q-invites" className="sr-only">{tr("Nombre d'invités")}</label>
                <ChampNombre id="q-invites" valeur={choix.invites} min={INVITES.min} max={INVITES.max} onValider={(v) => choisir({ invites: v })} className={`${champ} text-center`} testid="q-invites" />
                <button aria-label={tr("Plus d'invités")} className={`${btnContour} !px-0 w-11`} onClick={() => choisir({ invites: Math.min(INVITES.max, choix.invites + 10) })}>+</button>
              </div>
              <div className="flex flex-wrap justify-center gap-2">{[30, 60, 100, 150, 250, 400].map((n) => <button key={n} onClick={() => choisir({ invites: n })} className={`min-h-9 rounded-full border px-3 text-[13px] ${choix.invites === n ? "border-[#C9A74E] bg-[#C9A74E]/20 text-[#F6EFDD]" : "border-white/15 text-[#D9D0BC]"}`}>{n}</button>)}</div>
              <div className="flex gap-2"><button className={`${btnOr} flex-1`} onClick={suite} data-testid="q-suite">{tr("Continuer")}</button><button className={btnContour} onClick={suite} data-testid="q-passer">{tr("Passer")}</button></div>
            </div>
          )}
          {etape === 4 && (
            <div className="grid gap-2">
              <label htmlFor="q-date" className="sr-only">{tr("Date de l'événement")}</label>
              <input id="q-date" type="date" value={choix.dateInconnue ? "" : choix.date} disabled={choix.dateInconnue} onChange={(e) => choisir({ date: e.target.value, dateInconnue: false })} className={champ} data-testid="q-date" />
              <div className="flex flex-wrap gap-2"><button className={`${btnOr} flex-1`} onClick={onTermine} data-testid="q-suite">{tr("Entrer dans Heavent City")}</button><button className={btnContour} onClick={() => { choisir({ date: "", dateInconnue: true }); onTermine(); }} data-testid="q-inconnue">{tr("Je ne sais pas encore")}</button></div>
              <button className="min-h-9 text-[13px] text-[#B9B09C] underline-offset-4 hover:underline" onClick={onTermine} data-testid="q-passer">{tr("Passer")}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
