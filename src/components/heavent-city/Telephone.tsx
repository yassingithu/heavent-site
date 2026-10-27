/**
 * Le téléphone virtuel : messages de la « Conciergerie Heavent », missions, assistant et réglages.
 * Sur petit écran il se présente comme un panneau qui monte du bas ; sur grand écran comme un téléphone flottant.
 */
import { useEffect, useRef, useState } from "react";
import { Bot, ConciergeBell, MessageCircle, Send, Settings, Target, Volume2, VolumeX, X, RotateCcw, Check, Loader2 } from "lucide-react";
import {
  ACCUEILS, LIEUX, LUMIERES, MUSIQUES, PALETTES, STYLES, disponiblePour, infoOption, reservable, type OptionId, type TypeEvt,
} from "./donnees";
import { missionsDuType, type Choix } from "./etat";
import { MissionCarte } from "./Missions";
import { MESSAGE_MAX, demanderAssistant, type Proposition } from "./assistant";
import { Pastille, btnContour, btnOr, champ } from "./ui";

export interface Message { id: string; de: "concierge" | "moi"; texte: string; mission?: string }
type Onglet = "messages" | "missions" | "assistant" | "reglages";

const heure = (nuit: number) => { const m = 19 * 60 + 30 + Math.round(nuit * 150); return `${Math.floor(m / 60) % 24}:${String(m % 60).padStart(2, "0")}`; };

const EXEMPLES = ["Un mariage marocain chic, beige et doré, festif mais pas bling-bling", "Une fête entre amis, détendue, avec de la danse", "Un événement d'entreprise élégant et sobre"];

export default function Telephone({
  ouvert, onFermer, messages, choix, missionsOuvertes, onRepondre, onAppliquer, nuit, son, onSon, onRecommencer, ongletInitial, className = "",
}: {
  ouvert: boolean; onFermer: () => void; messages: Message[]; choix: Choix; missionsOuvertes: number; onRepondre: (m: string, r: string) => void;
  onAppliquer: (p: Proposition, exclus: string[]) => void; nuit: number; son: boolean; onSon: () => void; onRecommencer: () => void; ongletInitial?: Onglet; className?: string;
}) {
  const [onglet, setOnglet] = useState<Onglet>(ongletInitial ?? "messages");
  const fin = useRef<HTMLDivElement>(null);
  const type = choix.type as TypeEvt | null;
  const missions = missionsDuType(type);

  useEffect(() => { if (ongletInitial) setOnglet(ongletInitial); }, [ongletInitial, ouvert]);
  useEffect(() => { if (ouvert) fin.current?.scrollIntoView({ block: "end" }); }, [ouvert, messages.length, onglet]);
  useEffect(() => {
    if (!ouvert) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onFermer();
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, [ouvert, onFermer]);
  if (!ouvert) return null;

  const T = ({ id, nom, Ic, badge }: { id: Onglet; nom: string; Ic: typeof Bot; badge?: boolean }) => (
    <button role="tab" aria-selected={onglet === id} onClick={() => setOnglet(id)} data-testid={`tel-${id}`}
      className={`relative flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 text-[11px] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F4D774] ${onglet === id ? "text-[#E4D49A]" : "text-[#9d9585]"}`}>
      <Ic className="h-[18px] w-[18px]" />{nom}
      {badge && <span className="absolute right-[26%] top-1.5 h-2.5 w-2.5 rounded-full bg-[#E24E8B]" aria-label="nouveau" />}
    </button>
  );

  return (
    <div className={`fixed inset-0 z-[70] lg:pointer-events-none ${className}`} data-testid="telephone">
      <button className="absolute inset-0 bg-black/55 lg:hidden" aria-label="Fermer le téléphone" onClick={onFermer} />
      <div role="dialog" aria-label="Téléphone Heavent" className="pointer-events-auto absolute inset-x-0 bottom-0 flex h-[88dvh] flex-col overflow-hidden rounded-t-[28px] border border-white/15 bg-[#17141a] shadow-2xl lg:inset-x-auto lg:bottom-6 lg:right-6 lg:h-[680px] lg:w-[370px] lg:rounded-[40px] lg:border-[7px] lg:border-[#0b0a0d]">
        <div className="flex shrink-0 items-center justify-between px-6 pt-3 text-[12px] text-[#d8cfbb]">
          <span className="font-medium tabular-nums">{heure(nuit)}</span>
          <span className="hidden h-5 w-24 rounded-full bg-[#0b0a0d] lg:block" aria-hidden="true" />
          <span className="flex items-center gap-1.5" aria-hidden="true"><span className="flex items-end gap-0.5">{[4, 7, 10, 13].map((h) => <i key={h} className="w-[3px] rounded-sm bg-[#d8cfbb]" style={{ height: h }} />)}</span><span className="h-3 w-5 rounded-[3px] border border-[#d8cfbb] p-[1px]"><i className="block h-full w-3/4 rounded-[1px] bg-[#C9A74E]" /></span></span>
        </div>
        <div className="flex shrink-0 items-center justify-between px-4 pb-2 pt-1">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C9A74E] text-[#17141a]"><ConciergeBell className="h-[18px] w-[18px]" /></span>
            <div><p className="font-serif text-[16px] leading-none text-[#F6EFDD]">Conciergerie Heavent</p><p className="mt-0.5 text-[11px] text-[#9d9585]">en ligne</p></div>
          </div>
          <button onClick={onFermer} aria-label="Fermer le téléphone" data-testid="tel-fermer" className="flex h-10 w-10 items-center justify-center rounded-full text-[#d8cfbb] hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F4D774]"><X className="h-5 w-5" /></button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto border-y border-white/10 bg-[#1d1920] px-3 py-3">
          {onglet === "messages" && (
            <div className="grid gap-2.5" aria-live="polite">
              {messages.map((m) => (
                <div key={m.id} className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 text-[14px] leading-snug ${m.de === "moi" ? "ml-auto rounded-br-md bg-[#C9A74E] text-[#17141a]" : "rounded-bl-md bg-white/10 text-[#F0E8D6]"}`}>
                  {m.texte}
                  {m.mission && <button onClick={() => setOnglet("missions")} className="mt-2 block rounded-full bg-[#C9A74E] px-3 py-1.5 text-[12.5px] font-semibold text-[#17141a]">Voir la mission</button>}
                </div>
              ))}
              <div ref={fin} />
            </div>
          )}
          {onglet === "missions" && (
            <div className="grid gap-3">
              {!type && <p className="text-sm text-[#B9B09C]">Choisis d'abord ton type d'événement : les missions s'adaptent.</p>}
              {missions.map((m, i) => i < missionsOuvertes
                ? <MissionCarte key={m.id} mission={m} numero={i + 1} reponse={choix.missions[m.id]} onRepondre={(r) => onRepondre(m.id, r)} />
                : <div key={m.id} className="rounded-2xl border border-dashed border-white/15 p-3.5 text-[13.5px] text-[#B9B09C]">Mission {i + 1} — verrouillée pour l'instant. Avance dans ta scène : un message t'avertira.</div>)}
            </div>
          )}
          {onglet === "assistant" && <Assistant choix={choix} onAppliquer={onAppliquer} />}
          {onglet === "reglages" && (
            <div className="grid gap-3 text-[14px] text-[#F0E8D6]">
              <button onClick={onSon} role="switch" aria-checked={son} data-testid="reglage-son" className="flex min-h-14 items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.05] px-3.5 text-left">
                {son ? <Volume2 className="h-5 w-5 text-[#E4D49A]" /> : <VolumeX className="h-5 w-5 text-[#B9B09C]" />}
                <span className="flex-1"><span className="block font-medium">Ambiance sonore</span><span className="block text-[12.5px] text-[#B9B09C]">{son ? "Activée — touche pour couper" : "Désactivée par défaut — touche pour l'activer"}</span></span>
                <span className={`h-6 w-11 rounded-full p-0.5 transition ${son ? "bg-[#C9A74E]" : "bg-white/20"}`}><span className={`block h-5 w-5 rounded-full bg-white transition ${son ? "translate-x-5" : ""}`} /></span>
              </button>
              <button onClick={onRecommencer} data-testid="reglage-recommencer" className="flex min-h-14 items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.05] px-3.5 text-left"><RotateCcw className="h-5 w-5 text-[#E4D49A]" /><span><span className="block font-medium">Recommencer</span><span className="block text-[12.5px] text-[#B9B09C]">Efface ta création sur cet appareil</span></span></button>
              <p className="text-[12px] leading-snug text-[#8f8777]">Ta progression est sauvegardée uniquement sur cet appareil. Tes coordonnées ne sont jamais conservées dans le navigateur.</p>
            </div>
          )}
        </div>

        <div role="tablist" aria-label="Applications du téléphone" className="flex shrink-0 bg-[#141116] pb-[max(0.25rem,env(safe-area-inset-bottom))]">
          <T id="messages" nom="Messages" Ic={MessageCircle} />
          <T id="missions" nom="Missions" Ic={Target} badge={missionsOuvertes > 0 && !missions.every((m) => choix.missions[m.id])} />
          <T id="assistant" nom="Assistant" Ic={Bot} />
          <T id="reglages" nom="Réglages" Ic={Settings} />
        </div>
      </div>
    </div>
  );
}

function Assistant({ choix, onAppliquer }: { choix: Choix; onAppliquer: (p: Proposition, exclus: string[]) => void }) {
  const [texte, setTexte] = useState("");
  const [charge, setCharge] = useState(false);
  const [erreur, setErreur] = useState("");
  const [res, setRes] = useState<{ p: Proposition; note?: string } | null>(null);
  const [exclus, setExclus] = useState<string[]>([]);
  const [applique, setApplique] = useState(false);
  const type = choix.type!;

  const envoyer = async () => {
    if (charge) return;
    setErreur(""); setApplique(false); setExclus([]); setCharge(true);
    try { const r = await demanderAssistant(texte, type, choix.lieu); setRes({ p: r.proposition, note: r.note }); }
    catch (e) { setErreur((e as Error).message || "Impossible pour le moment."); }
    finally { setCharge(false); }
  };
  const basc = (k: string) => setExclus((x) => (x.includes(k) ? x.filter((y) => y !== k) : [...x, k]));
  const Ligne = ({ k, label, valeur, res: r }: { k: string; label: string; valeur: string; res?: boolean }) => (
    <li>
      <button type="button" role="checkbox" aria-checked={!exclus.includes(k)} onClick={() => basc(k)} data-testid={`prop-${k}`}
        className={`flex w-full items-center gap-2.5 rounded-xl border px-3 min-h-11 text-left text-[13.5px] ${exclus.includes(k) ? "border-white/10 bg-white/[0.02] text-[#8f8777] line-through" : "border-[#C9A74E]/50 bg-[#C9A74E]/10 text-[#F6EFDD]"}`}>
        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${exclus.includes(k) ? "border-white/25" : "border-[#C9A74E] bg-[#C9A74E] text-[#17141a]"}`}>{!exclus.includes(k) && <Check className="h-3.5 w-3.5" />}</span>
        <span className="flex-1"><span className="text-[11px] uppercase tracking-wider text-[#E4D49A]">{label}</span><br />{valeur}</span>
        {r !== undefined && <Pastille reservable={r} court />}
      </button>
    </li>
  );

  const p = res?.p;
  return (
    <div className="grid gap-3">
      <p className="text-[13.5px] leading-snug text-[#D9D0BC]">Décris l'ambiance que tu imagines : je te propose une combinaison que tu peux accepter ou modifier. Aucun prix ici — l'équipe Heavent établit le devis.</p>
      <label htmlFor="assistant-texte" className="sr-only">Décris ton ambiance</label>
      <textarea id="assistant-texte" value={texte} maxLength={MESSAGE_MAX} onChange={(e) => setTexte(e.target.value)} rows={3} placeholder="Ex. un mariage marocain chic, beige et doré, festif mais pas bling-bling" className={`${champ} py-2 leading-snug`} data-testid="assistant-texte" />
      <div className="flex flex-wrap gap-1.5">
        {EXEMPLES.map((e) => <button key={e} type="button" onClick={() => setTexte(e)} className="rounded-full border border-white/15 px-2.5 py-1 text-left text-[12px] text-[#D9D0BC] hover:bg-white/10">{e}</button>)}
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11.5px] text-[#8f8777]">{texte.length}/{MESSAGE_MAX}</span>
        <button onClick={envoyer} disabled={charge || !texte.trim()} className={btnOr} data-testid="assistant-envoyer">{charge ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}{charge ? "Je réfléchis…" : "Proposer une ambiance"}</button>
      </div>
      {erreur && <p role="alert" className="text-[13px] text-[#F2A8A0]">{erreur}</p>}
      {p && (
        <section aria-label="Proposition" className="grid gap-2.5 rounded-2xl border border-[#C9A74E]/40 bg-white/[0.04] p-3" data-testid="proposition">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#E4D49A]">{p.source === "ia" ? "Proposition de l'assistant IA" : "Suggestion automatique (sans IA)"}</p>
          {res?.note && <p className="text-[12px] text-[#B9B09C]">{res.note}</p>}
          <p className="text-[14px] leading-snug text-[#F0E8D6]">{p.explication}</p>
          <ul className="grid gap-1.5">
            {p.lieu && p.lieu !== choix.lieu && <Ligne k="lieu" label="Lieu d'inspiration" valeur={LIEUX.find((l) => l.id === p.lieu)!.nom} />}
            <Ligne k="style" label="Style" valeur={STYLES.find((s) => s.id === p.style)!.nom} />
            <Ligne k="palette" label="Couleurs" valeur={PALETTES.find((x) => x.id === p.palette)!.nom} />
            {p.lumiere && <Ligne k="lumiere" label="Lumière" valeur={LUMIERES.find((x) => x.id === p.lumiere)!.nom} res={reservable(infoOption(p.lumiere))} />}
            {p.musique && <Ligne k="musique" label="Musique" valeur={MUSIQUES.find((x) => x.id === p.musique)!.nom} res={reservable(infoOption(p.musique))} />}
            {p.accueil && <Ligne k="accueil" label="Accueil" valeur={ACCUEILS.find((x) => x.id === p.accueil)!.nom} res={reservable(infoOption(p.accueil))} />}
            {p.options.filter((o) => { const i = infoOption(o); return i && disponiblePour(i, type, choix.lieu); }).map((o) => <Ligne key={o} k={`o:${o}`} label="Idée" valeur={infoOption(o)!.nom} res={reservable(infoOption(o))} />)}
          </ul>
          <p className="text-[11.5px] text-[#8f8777]">Décoche ce que tu ne veux pas avant d'appliquer.</p>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => { onAppliquer(p, exclus); setApplique(true); }} className={btnOr} data-testid="appliquer-ambiance">{applique ? <Check className="h-4 w-4" /> : null}Appliquer cette ambiance</button>
            <button onClick={() => { setRes(null); setApplique(false); }} className={btnContour}>Autre idée</button>
          </div>
          {applique && <p className="text-[13px] text-[#E4D49A]" role="status">C'est appliqué : regarde ta scène. Tu peux encore tout modifier.</p>}
        </section>
      )}
    </div>
  );
}

export type { OptionId };
