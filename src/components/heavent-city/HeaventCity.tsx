/**
 * HEAVENT CITY — Mission événement. Orchestrateur du parcours :
 *   titre → questions (téléphone) → ville (choix du lieu) → scène (personnalisation + missions) → grand final → demande.
 * Aucun prix n'existe dans ce jeu. Voir LISEZMOI.md.
 */
import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { ArrowLeft, Hand, Phone, Redo2, Undo2, DoorOpen } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import logoHeavent from "@/assets/logo-heavent-or.png";
import logoNawar from "@/assets/logo-nawar.png";
import { LIEUX, MESSAGE_BIENVENUE, MENTION_LIEUX, TYPES, type OptionId } from "./donnees";
import {
  ETAT_INITIAL, aUneSauvegarde, avancement, ecrireSauvegarde, effacerSauvegarde, lireSauvegarde, missionsDuType, optionsActives, reducteur, rendu, resume,
  type Action, type Choix, type Etat,
} from "./etat";
import { SceneSvg } from "./Scene";
import Ville from "./Ville";
import { Questions, Titre } from "./Accueil";
import Panneau from "./Panneau";
import Telephone, { type Message } from "./Telephone";
import Final from "./Final";
import Demande from "./Demande";
import type { Proposition } from "./assistant";
import { activerSon, couperSon, petitSon, sonActif } from "./son";
import { btnOr, btnContour } from "./ui";

const LOGOS = { nawar: logoNawar, heavent: logoHeavent };
const CSS = `.hc-fondu{animation:hc-fondu .9s ease both}@keyframes hc-fondu{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.hc-fondu{animation:none}}`;

export default function HeaventCity() {
  const reduit = !!useReducedMotion();
  const sauvegarde = useRef<Etat | null | undefined>(undefined);
  if (sauvegarde.current === undefined) sauvegarde.current = lireSauvegarde();
  const [etat, dispatch] = useReducer(reducteur, ETAT_INITIAL);
  const [ecran, setEcran] = useState<"titre" | "questions">("titre");
  const [telOuvert, setTelOuvert] = useState(false);
  const [telOnglet, setTelOnglet] = useState<"messages" | "missions" | "assistant" | "reglages">("messages");
  const [son, setSon] = useState(false);
  const [cine, setCine] = useState<string | null>(null);
  const [focus, setFocus] = useState<{ cle: string; n: number } | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [demande, setDemande] = useState(false);
  const [deplacer, setDeplacer] = useState(false);
  const { choix, phase } = etat;

  // Sauvegarde locale (jamais de coordonnées : voir etat.ts)
  useEffect(() => { if (choix.type) ecrireSauvegarde(etat); }, [etat, choix.type]);

  const progression = avancement(choix);
  const nuit = phase === "scene" ? 0.06 + 0.5 * progression : 0.2;
  const touches = [choix.style, choix.palette, choix.lumiere, choix.musiques.length ? 1 : null, choix.accueils.length ? 1 : null].filter(Boolean).length + (choix.manuels.length ? 1 : 0);
  const missions = missionsDuType(choix.type);
  const repondues = missions.filter((m) => choix.missions[m.id]).length;
  const missionsOuvertes = Math.min(missions.length, Math.max(1 + (touches >= 2 ? 1 : 0) + (touches >= 4 ? 1 : 0), repondues + (repondues < missions.length ? 1 : 0)));

  // Message sur le téléphone quand une nouvelle mission arrive
  const vues = useRef(0);
  useEffect(() => {
    if (phase !== "scene") return;
    if (missionsOuvertes > vues.current) {
      const nouvelle = missions[missionsOuvertes - 1];
      vues.current = missionsOuvertes;
      if (nouvelle) { setToast(`Mission ${missionsOuvertes} — ${nouvelle.titre}`); const t = window.setTimeout(() => setToast(null), 7000); return () => window.clearTimeout(t); }
    }
  }, [missionsOuvertes, phase, missions]);
  useEffect(() => { if (phase === "accueil") vues.current = 0; }, [phase]);

  // Halo sur la zone modifiée
  const montrer = useCallback((cle: string) => {
    setFocus({ cle, n: Date.now() });
  }, []);
  useEffect(() => { if (!focus) return; const t = window.setTimeout(() => setFocus(null), 2800); return () => window.clearTimeout(t); }, [focus]);

  const agir = useCallback((a: Action) => {
    dispatch(a);
    if (a.t === "basculer" && !optionsActives(choix).includes(a.option)) montrer(a.option);
    if (a.t === "choisir") { if (a.patch.lumiere) montrer("lumiere"); if (a.patch.accueils) montrer("accueil"); if (a.patch.musiques) montrer("musique"); }
  }, [choix, montrer]);

  const repondre = useCallback((m: string, r: string) => {
    const mission = missions.find((x) => x.id === m); const rep = mission?.reponses.find((x) => x.id === r);
    dispatch({ t: "mission", mission: m, reponse: r });
    petitSon("ok");
    if (rep) montrer(rep.ajoute[0] ?? (rep.accueil ? "accueil" : rep.musique ? "musique" : "lumiere"));
  }, [missions, montrer]);

  const appliquer = useCallback((p: Proposition, exclus: string[]) => {
    const patch: Partial<Choix> = {};
    if (p.lieu && !exclus.includes("lieu") && p.lieu !== choix.lieu) patch.lieu = p.lieu;
    if (!exclus.includes("style")) patch.style = p.style;
    if (!exclus.includes("palette")) patch.palette = p.palette;
    if (p.lumiere && !exclus.includes("lumiere")) patch.lumiere = p.lumiere;
    const mus = p.musiques.filter((m) => !exclus.includes(`m:${m}`));
    if (mus.length) patch.musiques = [...new Set([...choix.musiques, ...mus])];
    if (p.accueil && !exclus.includes("accueil")) { patch.accueils = [...new Set([...choix.accueils, p.accueil])]; patch.retires = (patch.retires ?? choix.retires).filter((o) => (o as string) !== p.accueil); }
    const ajout = p.options.filter((o) => !exclus.includes(`o:${o}`));
    patch.manuels = [...new Set([...choix.manuels, ...ajout])] as OptionId[];
    patch.retires = (patch.retires ?? choix.retires).filter((o) => !ajout.includes(o));
    dispatch({ t: "appliquer", patch });
    petitSon("ok");
    montrer("lumiere");
  }, [choix, montrer]);

  const basculerSon = () => { if (sonActif()) { couperSon(); setSon(false); } else setSon(activerSon()); };
  useEffect(() => () => couperSon(), []);

  const commencer = () => { effacerSauvegarde(); dispatch({ t: "recommencer" }); setEcran("questions"); };
  const reprendre = () => {
    const s = sauvegarde.current; if (!s) return;
    dispatch({ t: "restaurer", etat: { ...s, phase: s.phase === "accueil" ? "ville" : s.phase === "final" ? "scene" : s.phase } });
  };
  const recommencer = () => { effacerSauvegarde(); sauvegarde.current = null; setTelOuvert(false); setDemande(false); setCine(null); dispatch({ t: "recommencer" }); setEcran("titre"); };

  const choisirLieu = (l: (typeof LIEUX)[number]["id"]) => {
    dispatch({ t: "choisir", patch: { lieu: l } });
    dispatch({ t: "phase", phase: "scene" });
    dispatch({ t: "onglet", onglet: "style" });
    setCine(LIEUX.find((x) => x.id === l)!.nom);
    window.setTimeout(() => setCine(null), reduit ? 600 : 2100);
  };

  const messages: Message[] = useMemo(() => {
    const m: Message[] = [{ id: "m0", de: "concierge", texte: MESSAGE_BIENVENUE }];
    const t = TYPES.find((x) => x.id === choix.type);
    if (t) { m.push({ id: "m1", de: "moi", texte: t.nom }); m.push({ id: "m2", de: "concierge", texte: `Parfait : ${t.nom.toLowerCase()}. Choisis ton lieu d'inspiration dans la ville.` }); }
    const l = LIEUX.find((x) => x.id === choix.lieu);
    if (l) m.push({ id: "m3", de: "concierge", texte: `${l.nom} : excellent choix. Compose ton ambiance ; je te préviens dès qu'une mission t'attend.` });
    missions.forEach((mi, i) => {
      if (i >= missionsOuvertes) return;
      m.push({ id: `mis${i}`, de: "concierge", texte: `Mission ${i + 1} — ${mi.message}`, mission: mi.id });
      const r = choix.missions[mi.id];
      if (r) m.push({ id: `rep${i}`, de: "moi", texte: r === "passe" ? "Je passe." : mi.reponses.find((x) => x.id === r)?.nom ?? "" });
    });
    if (phase === "final") m.push({ id: "fin", de: "concierge", texte: "Bravo, les portes sont ouvertes ! Tu peux confier ton projet à l'équipe Heavent quand tu veux." });
    return m;
  }, [choix, missions, missionsOuvertes, phase]);

  const r = rendu(choix);
  const nbEtapes = (choix.style ? 1 : 0) + (choix.palette ? 1 : 0) + (choix.lumiere ? 1 : 0) + (choix.musiques.length ? 1 : 0) + (choix.accueils.length ? 1 : 0) + (choix.manuels.length ? 1 : 0) + repondues;

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#17141a] text-[#F0E8D6]" data-testid="heavent-city" data-phase={phase}>
      <style>{CSS}</style>

      {(phase === "accueil" || phase === "ville") && (
        <div className="absolute inset-0">
          <Ville nuit={0.22} logo={logoHeavent} bloque={phase === "accueil"} choisi={choix.lieu} onChoisir={choisirLieu} />
        </div>
      )}

      {phase === "accueil" && ecran === "titre" && <Titre onCommencer={commencer} onReprendre={reprendre} onRecommencer={recommencer} logo={logoHeavent} sauvegarde={aUneSauvegarde(sauvegarde.current ?? null)} />}
      {phase === "accueil" && ecran === "questions" && <Questions choix={choix} dispatch={dispatch} onTermine={() => dispatch({ t: "phase", phase: "ville" })} />}

      {phase === "ville" && (
        <>
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-[#17141a]/85 to-transparent px-4 pb-10 pt-4">
            <div className="pointer-events-auto flex items-start justify-between gap-3">
              <button onClick={() => { dispatch({ t: "phase", phase: "accueil" }); setEcran("questions"); }} className={`${btnContour} bg-black/30`}><ArrowLeft className="h-4 w-4" />Retour</button>
              <button onClick={() => { setTelOnglet("messages"); setTelOuvert(true); }} aria-label="Ouvrir le téléphone" className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C9A74E] text-[#17141a] shadow-lg"><Phone className="h-5 w-5" /></button>
            </div>
            <h2 className="mt-3 text-center font-serif text-2xl text-[#F6EFDD] drop-shadow sm:text-3xl">Choisis ton décor</h2>
            <p className="mt-1 text-center text-[14px] text-[#F0E8D6] drop-shadow">Touche un lieu pour l'explorer.</p>
          </div>
          <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#17141a] via-[#17141a]/90 to-transparent px-3 pb-3 pt-10">
            <nav aria-label="Lieux d'inspiration" className="mx-auto flex max-w-3xl gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:justify-center">
              {LIEUX.map((l) => <button key={l.id} onClick={() => choisirLieu(l.id)} data-testid={`liste-lieu-${l.id}`} className="shrink-0 rounded-full border border-[#C9A74E]/60 bg-[#17141a]/80 px-4 min-h-11 text-[14px] text-[#F6EFDD] hover:bg-[#C9A74E] hover:text-[#17141a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F4D774]">{l.nom}</button>)}
            </nav>
            <p className="mx-auto mt-1.5 max-w-xl text-center text-[11px] leading-snug text-[#B9B09C]">{MENTION_LIEUX}</p>
          </div>
        </>
      )}

      {phase === "scene" && r && (
        <div className="absolute inset-0 flex flex-col lg:flex-row" data-testid="scene">
          <div className="relative h-[40dvh] shrink-0 overflow-hidden lg:h-auto lg:flex-1">
            <SceneSvg r={r} nuit={nuit} focus={focus} logos={LOGOS} animer={!reduit} deplacable={deplacer} onDeplacer={(id, dx, dy) => dispatch({ t: "deplacer", id, dx, dy })} />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-2 bg-gradient-to-b from-black/55 to-transparent px-3 pb-6 pt-3">
              <button onClick={() => dispatch({ t: "phase", phase: "ville" })} className={`${btnContour} bg-black/35 !px-3`} data-testid="changer-lieu"><ArrowLeft className="h-4 w-4" /><span className="hidden sm:inline">Changer de lieu</span><span className="sm:hidden">Lieu</span></button>
              <div className="flex items-center gap-1.5">
                <button onClick={() => setDeplacer((v) => !v)} aria-pressed={deplacer} data-testid="deplacer" className={`flex min-h-11 items-center gap-1.5 rounded-full px-3.5 text-[13.5px] font-medium ${deplacer ? "bg-[#F4D774] text-[#17141a]" : "bg-black/40 text-[#F0E8D6]"}`}><Hand className="h-4 w-4" />Déplacer</button>
                <button onClick={() => dispatch({ t: "annuler" })} disabled={!etat.passe.length} aria-label="Annuler le dernier choix" data-testid="annuler" className="flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-[#F0E8D6] disabled:opacity-35"><Undo2 className="h-5 w-5" /></button>
                <button onClick={() => dispatch({ t: "refaire" })} disabled={!etat.futur.length} aria-label="Rétablir" data-testid="refaire" className="flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-[#F0E8D6] disabled:opacity-35"><Redo2 className="h-5 w-5" /></button>
                <button onClick={() => { setToast(null); setTelOnglet("messages"); setTelOuvert(true); }} aria-label="Ouvrir le téléphone" data-testid="ouvrir-telephone" className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#C9A74E] text-[#17141a] shadow-lg">
                  <Phone className="h-5 w-5" />{toast && <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 animate-ping rounded-full bg-[#E24E8B]" />}
                </button>
              </div>
            </div>
            <div className="pointer-events-none absolute bottom-2 left-3 rounded-full bg-black/45 px-3 py-1 text-[12px] text-[#F0E8D6]" aria-live="polite">{r.tablesTotal} {r.tables === "hautes" ? "tables hautes" : r.tables === "rectangulaires" ? "tables rectangulaires" : "tables rondes"} · {r.invites} invités</div>
            {deplacer && (
              <div className="absolute inset-x-3 bottom-10 z-10 mx-auto flex max-w-md flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#F4D774]/60 bg-[#17141a]/95 px-3.5 py-2.5 shadow-xl" data-testid="bandeau-deplacer" role="status">
                <span className="text-[13px] leading-snug text-[#F6EFDD]">Fais glisser un objet pour le déplacer.</span>
                <span className="flex gap-2">
                  {Object.keys(choix.deplacements).length > 0 && <button onClick={() => dispatch({ t: "remettre" })} data-testid="remettre" className="min-h-10 rounded-full border border-white/25 px-3 text-[13px] text-[#F0E8D6]">Tout remettre</button>}
                  <button onClick={() => setDeplacer(false)} data-testid="termine-deplacer" className="min-h-10 rounded-full bg-[#C9A74E] px-4 text-[13px] font-semibold text-[#17141a]">Terminé</button>
                </span>
              </div>
            )}
            {toast && !deplacer && (
              <button onClick={() => { setToast(null); setTelOnglet("missions"); setTelOuvert(true); }} data-testid="toast-mission" className="hc-fondu absolute inset-x-3 bottom-10 z-10 mx-auto flex max-w-sm items-center gap-3 rounded-2xl border border-[#C9A74E]/60 bg-[#17141a]/95 px-3.5 py-3 text-left shadow-xl">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C9A74E] text-[#17141a]"><Phone className="h-4 w-4" /></span>
                <span className="min-w-0"><span className="block text-[11px] uppercase tracking-wider text-[#E4D49A]">Nouveau message</span><span className="block truncate text-[14px] text-[#F6EFDD]">{toast}</span></span>
              </button>
            )}
            {cine && (
              <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-black/55 hc-fondu" data-testid="cine">
                <div className="absolute inset-x-0 top-0 h-[10%] bg-black" /><div className="absolute inset-x-0 bottom-0 h-[10%] bg-black" />
                <div className="text-center"><p className="text-[12px] uppercase tracking-[0.3em] text-[#E4D49A]">Ambiance d'inspiration</p><p className="mt-1 font-serif text-4xl text-[#F6EFDD]">{cine}</p></div>
              </div>
            )}
          </div>
          <aside className="flex min-h-0 flex-1 flex-col border-t border-white/10 bg-[#17141a] lg:w-[410px] lg:flex-none lg:border-l lg:border-t-0" aria-label="Personnalisation">
            <div className="flex items-center justify-between px-4 pb-1 pt-3"><p className="font-serif text-[18px] text-[#F6EFDD]">Donne vie à ton événement</p><p className="text-[12px] text-[#B9B09C]" data-testid="progression">{nbEtapes} choix · {repondues}/{missions.length} missions</p></div>
            <Panneau choix={choix} dispatch={agir as never} onglet={etat.onglet} onOnglet={(o) => dispatch({ t: "onglet", onglet: o })} onRepondre={repondre} missionsOuvertes={missionsOuvertes} className="min-h-0 flex-1" />
            <div className="border-t border-white/10 bg-[#141116] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <button onClick={() => { setDeplacer(false); dispatch({ t: "phase", phase: "final" }); }} className={`${btnOr} w-full min-h-12 text-base`} data-testid="ouvrir-portes"><DoorOpen className="h-5 w-5" />Ouvrir les portes</button>
            </div>
          </aside>
        </div>
      )}

      {phase === "final" && <Final choix={choix} logos={LOGOS} onModifier={() => dispatch({ t: "phase", phase: "scene" })} onDemande={() => setDemande(true)} onRecommencer={recommencer} />}

      {phase !== "accueil" && (
        <Telephone ouvert={telOuvert} onFermer={() => setTelOuvert(false)} messages={messages} choix={choix} missionsOuvertes={missionsOuvertes} onRepondre={repondre} onAppliquer={appliquer}
          nuit={nuit} son={son} onSon={basculerSon} onRecommencer={recommencer} ongletInitial={telOnglet} />
      )}
      <Demande ouvert={demande} onFermer={() => setDemande(false)} choix={choix} onNote={(n) => dispatch({ t: "choisir", patch: { note: n } })} />
      {phase === "final" && !demande && <span className="sr-only" aria-live="polite">{resume(choix).titre}</span>}
    </div>
  );
}
