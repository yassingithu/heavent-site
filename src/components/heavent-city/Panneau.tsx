/** Panneau de personnalisation : style, couleurs, lumière, musique, accueil, décoration, expériences, missions */
import { Check } from "lucide-react";
import { useMemo, type Dispatch } from "react";
import {
  ACCUEILS, DECORS, EXPERIENCES, LUMIERES, MUSIQUES, PALETTES, STYLES, disponiblePour, reservable, type InfoOption, type OptionId,
} from "./donnees";
import {
  accueilEffectif, lumiereEffective, musiqueEffective, missionsDuType, optionsActives, type Action, type Choix,
} from "./etat";
import { MissionCarte } from "./Missions";
import { Picto, Pastille } from "./ui";
import { petitSon } from "./son";

export const ONGLETS = [
  { id: "style", nom: "Style" }, { id: "couleurs", nom: "Couleurs" }, { id: "lumiere", nom: "Lumière" }, { id: "musique", nom: "Musique" },
  { id: "accueil", nom: "Accueil" }, { id: "decor", nom: "Décor" }, { id: "experiences", nom: "Expériences" }, { id: "missions", nom: "Missions" },
] as const;

function Carte({ id, nom, phrase, on, onClick, res, radio, testid }: { id: string; nom: string; phrase: string; on: boolean; onClick: () => void; res: boolean; radio?: boolean; testid: string }) {
  return (
    <button type="button" role={radio ? "radio" : "checkbox"} aria-checked={on} onClick={() => { petitSon("clic"); onClick(); }} data-testid={testid}
      className={`relative flex min-h-[84px] flex-col items-start gap-1 rounded-2xl border p-3 text-left transition active:scale-[.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F4D774] ${on ? "border-[#C9A74E] bg-[#C9A74E]/15" : "border-white/12 bg-white/[0.04] hover:bg-white/[0.09]"}`}>
      <span className="flex w-full items-center gap-2">
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${on ? "bg-[#C9A74E] text-[#17141a]" : "bg-white/10 text-[#E4D49A]"}`}><Picto id={id} className="h-4 w-4" /></span>
        <span className="text-[14px] font-medium leading-tight text-[#F6EFDD]">{nom}</span>
        {on && <Check className="ml-auto h-4 w-4 shrink-0 text-[#E4D49A]" aria-hidden="true" />}
      </span>
      <span className="text-[12px] leading-snug text-[#B9B09C]">{phrase}</span>
      <Pastille reservable={res} court />
    </button>
  );
}

export default function Panneau({ choix, dispatch, onglet, onOnglet, onRepondre, missionsOuvertes, className = "" }: {
  choix: Choix; dispatch: Dispatch<Action>; onglet: string; onOnglet: (o: string) => void; onRepondre: (m: string, r: string) => void; missionsOuvertes: number; className?: string;
}) {
  const type = choix.type!;
  const actives = useMemo(() => new Set<OptionId>(optionsActives(choix)), [choix]);
  const lum = lumiereEffective(choix), mus = musiqueEffective(choix), acc = accueilEffectif(choix);
  const dispo = <T extends InfoOption>(l: T[]) => l.filter((o) => disponiblePour(o, type, choix.lieu));
  const missions = missionsDuType(type);
  const fait: Record<string, boolean> = {
    style: !!choix.style, couleurs: !!choix.palette, lumiere: !!lum, musique: !!mus, accueil: !!acc,
    decor: DECORS.some((d) => actives.has(d.id)), experiences: EXPERIENCES.some((d) => actives.has(d.id)), missions: missions.every((m) => !!choix.missions[m.id]),
  };

  const grille = "grid grid-cols-2 gap-2.5";
  const unique = <K extends "lumiere" | "musique" | "accueil">(cle: K, liste: InfoOption[], courant: string | null) => (
    <div className={grille} role="radiogroup">
      {dispo(liste).map((o) => <Carte key={o.id} id={o.id} nom={o.nom} phrase={o.phrase} on={courant === o.id} res={reservable(o)} radio testid={`${cle}-${o.id}`}
        onClick={() => dispatch({ t: "choisir", patch: { [cle]: courant === o.id ? null : o.id } as Partial<Choix> })} />)}
    </div>
  );
  const multiple = (liste: InfoOption[]) => (
    <div className={grille}>
      {dispo(liste).map((o) => <Carte key={o.id} id={o.id} nom={o.nom} phrase={o.phrase} on={actives.has(o.id as OptionId)} res={reservable(o)} testid={`option-${o.id}`} onClick={() => dispatch({ t: "basculer", option: o.id as OptionId })} />)}
    </div>
  );

  return (
    <div className={`flex min-h-0 flex-col ${className}`}>
      <div role="tablist" aria-label="Personnaliser l'événement" className="flex gap-1.5 overflow-x-auto px-3 pb-2 pt-1 [scrollbar-width:none]">
        {ONGLETS.map((o) => {
          const on = onglet === o.id;
          return (
            <button key={o.id} role="tab" id={`onglet-${o.id}`} aria-selected={on} aria-controls="panneau-contenu" onClick={() => onOnglet(o.id)} data-testid={`onglet-${o.id}`}
              className={`relative shrink-0 rounded-full border px-3.5 min-h-10 text-[13.5px] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F4D774] ${on ? "border-[#C9A74E] bg-[#C9A74E] font-semibold text-[#17141a]" : "border-white/15 bg-white/[0.05] text-[#F0E8D6] hover:bg-white/10"}`}>
              {o.nom}{fait[o.id] && !on && <Check className="ml-1 inline h-3.5 w-3.5 text-[#E4D49A]" aria-label="déjà choisi" />}
              {o.id === "missions" && missionsOuvertes > 0 && !fait.missions && <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-[#E24E8B]" aria-label="nouvelle mission" />}
            </button>
          );
        })}
      </div>
      <div id="panneau-contenu" role="tabpanel" aria-labelledby={`onglet-${onglet}`} className="min-h-0 flex-1 overflow-y-auto px-3 pb-4 pt-1">
        {onglet === "style" && (
          <div className={grille} role="radiogroup" aria-label="Style">
            {STYLES.map((s) => <Carte key={s.id} id={s.id} nom={s.nom} phrase={s.phrase} on={choix.style === s.id} res={false} radio testid={`style-${s.id}`} onClick={() => dispatch({ t: "choisir", patch: { style: s.id } })} />)}
          </div>
        )}
        {onglet === "couleurs" && (
          <div className="grid grid-cols-2 gap-2.5" role="radiogroup" aria-label="Palette de couleurs">
            {PALETTES.map((p) => {
              const on = (choix.palette ?? STYLES.find((s) => s.id === choix.style)?.palette) === p.id;
              return (
                <button key={p.id} type="button" role="radio" aria-checked={on} onClick={() => { petitSon("clic"); dispatch({ t: "choisir", patch: { palette: p.id } }); }} data-testid={`palette-${p.id}`}
                  className={`flex min-h-[72px] flex-col items-start gap-2 rounded-2xl border p-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F4D774] ${on ? "border-[#C9A74E] bg-[#C9A74E]/15" : "border-white/12 bg-white/[0.04] hover:bg-white/[0.09]"}`}>
                  <span className="flex gap-1.5">{[p.nappe, p.fleurs, p.accent, p.deco].map((c, i) => <span key={i} className="h-6 w-6 rounded-full border border-white/40" style={{ background: c }} />)}</span>
                  <span className="text-[13.5px] font-medium text-[#F6EFDD]">{p.nom}{on && <Check className="ml-1 inline h-3.5 w-3.5 text-[#E4D49A]" />}</span>
                </button>
              );
            })}
            {choix.palette && <button type="button" onClick={() => dispatch({ t: "choisir", patch: { palette: null } })} className="col-span-2 rounded-full px-3 min-h-10 text-[13px] text-[#B9B09C] underline-offset-4 hover:underline">Revenir aux couleurs du style</button>}
          </div>
        )}
        {onglet === "lumiere" && unique("lumiere", LUMIERES, lum)}
        {onglet === "musique" && unique("musique", MUSIQUES, mus)}
        {onglet === "accueil" && unique("accueil", ACCUEILS, acc)}
        {onglet === "decor" && multiple(DECORS)}
        {onglet === "experiences" && multiple(EXPERIENCES)}
        {onglet === "missions" && (
          <div className="grid gap-3">
            {missions.map((m, i) => i < missionsOuvertes
              ? <MissionCarte key={m.id} mission={m} numero={i + 1} reponse={choix.missions[m.id]} onRepondre={(r) => onRepondre(m.id, r)} />
              : <div key={m.id} className="rounded-2xl border border-dashed border-white/15 p-3.5 text-[13.5px] text-[#B9B09C]">Mission {i + 1} — un message arrivera sur ton téléphone quand tu auras avancé.</div>)}
          </div>
        )}
        <p className="mt-3 text-[11.5px] leading-snug text-[#8f8777]">
          <span className="text-[#E4D49A]">● Proposé par Heavent</span> : prestation que l'agence peut réserver. <span>○ Inspiration à discuter</span> : idée à étudier ensemble, sans promesse de disponibilité.
        </p>
      </div>
    </div>
  );
}
