/** Panneau de personnalisation : style, couleurs, lumière, musique, accueil, décoration, expériences, missions */
import { Check } from "lucide-react";
import { useMemo, useState, type Dispatch } from "react";
import {
  ACCUEILS, DECORS, EXPERIENCES, INVITES, LUMIERES, MUSIQUES, PALETTES, STYLES, TABLES_TYPES, disponiblePour, reservable, type TableId, type AccueilId, type InfoOption, type MusiqueId, type OptionId,
} from "./donnees";
import {
  accueilsEffectifs, lumiereEffective, missionsDuType, nbTables, optionsActives, rendu, type Action, type Choix,
} from "./etat";
import { N_MIN } from "./positions";
import { MissionCarte } from "./Missions";
import { Picto, Pastille } from "./ui";
import { petitSon } from "./son";
import { tr } from "./langue";

export const ONGLETS = [
  { id: "style", nom: "Style" }, { id: "salle", nom: "Salle" }, { id: "couleurs", nom: "Couleurs" }, { id: "lumiere", nom: "Lumière" }, { id: "musique", nom: "Musique" },
  { id: "accueil", nom: "Accueil" }, { id: "decor", nom: "Décor" }, { id: "experiences", nom: "Expériences" }, { id: "missions", nom: "Missions" },
] as const;

function Carte({ id, nom, phrase, on, onClick, res, radio, testid }: { id: string; nom: string; phrase: string; on: boolean; onClick: () => void; res: boolean; radio?: boolean; testid: string }) {
  return (
    <button type="button" role={radio ? "radio" : "checkbox"} aria-checked={on} onClick={() => { petitSon("clic"); onClick(); }} data-testid={testid}
      className={`relative flex min-h-[84px] flex-col items-start gap-1 rounded-2xl border p-3 text-start transition active:scale-[.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F4D774] ${on ? "border-[#C9A74E] bg-[#C9A74E]/15" : "border-white/12 bg-white/[0.04] hover:bg-white/[0.09]"}`}>
      <span className="flex w-full items-center gap-2">
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${on ? "bg-[#C9A74E] text-[#17141a]" : "bg-white/10 text-[#E4D49A]"}`}><Picto id={id} className="h-4 w-4" /></span>
        <span className="text-[14px] font-medium leading-tight text-[#F6EFDD]">{nom}</span>
        {on && <Check className="ms-auto h-4 w-4 shrink-0 text-[#E4D49A]" aria-hidden="true" />}
      </span>
      <span className="text-[12px] leading-snug text-[#B9B09C]">{phrase}</span>
      <Pastille reservable={res} court />
    </button>
  );
}

/** Invités, tables et déplacement : le nombre de tables suit toujours les invités et la salle s'agrandit toute seule */
function Salle({ choix, dispatch }: { choix: Choix; dispatch: Dispatch<Action> }) {
  const [saisie, setSaisie] = useState<number | null>(null);
  const valeur = saisie ?? choix.invites;
  const info = TABLES_TYPES.find((t) => t.id === choix.tables)!;
  const nb = nbTables(valeur, choix.tables), n = rendu({ ...choix, invites: valeur })?.salle.n ?? N_MIN;
  const fixer = (v: number) => { setSaisie(null); dispatch({ t: "choisir", patch: { invites: Math.min(INVITES.max, Math.max(INVITES.min, Math.round(v) || INVITES.defaut)) } }); };
  const deplaces = Object.keys(choix.deplacements).length;
  return (
    <div className="grid gap-4" data-testid="onglet-salle-contenu">
      <div>
        <label htmlFor="salle-invites" className="flex items-baseline justify-between text-[14px] text-[#F6EFDD]"><span>{tr("Nombre d'invités")}</span><b className="font-serif text-xl text-[#E4D49A]" data-testid="salle-valeur">{valeur}</b></label>
        <input id="salle-invites" type="range" min={INVITES.min} max={INVITES.max} step={5} value={valeur} data-testid="salle-curseur"
          onChange={(e) => setSaisie(Number(e.target.value))} onPointerUp={() => saisie !== null && fixer(saisie)} onKeyUp={() => saisie !== null && fixer(saisie)} onBlur={() => saisie !== null && fixer(saisie)}
          className="mt-2 h-8 w-full accent-[#C9A74E]" />
        <div className="mt-1 flex flex-wrap gap-1.5">
          {[50, 120, 200, 300, 400].map((v) => <button key={v} type="button" onClick={() => fixer(v)} data-testid={`salle-invites-${v}`} className={`min-h-10 rounded-full border px-3 text-[13px] ${choix.invites === v ? "border-[#C9A74E] bg-[#C9A74E] font-semibold text-[#17141a]" : "border-white/15 bg-white/[0.05] text-[#F0E8D6]"}`}>{v}</button>)}
        </div>
        <p className="mt-2 text-[13px] leading-snug text-[#D9D0BC]" aria-live="polite" data-testid="salle-bilan">
          {tr("{nb} {type} pour {n} invités.", { nb, type: info.nom.toLowerCase(), n: valeur })}{n > N_MIN ? " " + tr("La salle s'est agrandie pour tout accueillir.") : ""}
        </p>
      </div>
      <div>
        <p className="mb-2 text-[14px] text-[#F6EFDD]">{tr("Type de tables")}</p>
        <div className="grid gap-2" role="radiogroup" aria-label={tr("Type de tables")}>
          {TABLES_TYPES.map((t) => {
            const on = choix.tables === t.id;
            return (
              <button key={t.id} type="button" role="radio" aria-checked={on} data-testid={`tables-${t.id}`} onClick={() => { petitSon("clic"); dispatch({ t: "choisir", patch: { tables: t.id as TableId } }); }}
                className={`flex min-h-[64px] items-start gap-3 rounded-2xl border p-3 text-start transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F4D774] ${on ? "border-[#C9A74E] bg-[#C9A74E]/15" : "border-white/12 bg-white/[0.04] hover:bg-white/[0.09]"}`}>
                <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${on ? "border-[#C9A74E] bg-[#C9A74E] text-[#17141a]" : "border-white/30"}`}>{on && <Check className="h-3.5 w-3.5" />}</span>
                <span><span className="block text-[14px] font-medium text-[#F6EFDD]">{t.nom}</span><span className="block text-[12px] leading-snug text-[#B9B09C]">{t.phrase}</span></span>
              </button>
            );
          })}
        </div>
        {choix.tables === "hautes" && choix.type === "mariage" && <p className="mt-2 text-[12px] leading-snug text-[#B9B09C]">{tr("Avec des tables hautes, il n'y a pas de table d'honneur : tout le monde est debout, façon cocktail.")}</p>}
      </div>
      <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-3">
        <p className="text-[14px] text-[#F6EFDD]">{tr("Déplacer des objets")}</p>
        <p className="mt-0.5 text-[12px] leading-snug text-[#B9B09C]">{tr("Touche « Déplacer » au-dessus de la scène, puis fais glisser une table, la piste, le buffet… Tu peux annuler à tout moment.")}</p>
        {deplaces > 0 && <button type="button" onClick={() => dispatch({ t: "remettre" })} data-testid="remettre-panneau" className="mt-2 min-h-10 rounded-full border border-white/20 px-3.5 text-[13px] text-[#F0E8D6] hover:bg-white/10">{tr("Tout remettre en place")} ({deplaces})</button>}
      </div>
    </div>
  );
}

export default function Panneau({ choix, dispatch, onglet, onOnglet, onRepondre, missionsOuvertes, className = "" }: {
  choix: Choix; dispatch: Dispatch<Action>; onglet: string; onOnglet: (o: string) => void; onRepondre: (m: string, r: string) => void; missionsOuvertes: number; className?: string;
}) {
  const type = choix.type!;
  const actives = useMemo(() => new Set<OptionId>(optionsActives(choix)), [choix]);
  const lum = lumiereEffective(choix), mus = choix.musiques, acc = accueilsEffectifs(choix);
  const dispo = <T extends InfoOption>(l: T[]) => l.filter((o) => disponiblePour(o, type, choix.lieu));
  const missions = missionsDuType(type);
  const fait: Record<string, boolean> = {
    style: !!choix.style, salle: choix.tables !== "rondes" || choix.invites !== INVITES.defaut, couleurs: !!choix.palette, lumiere: !!lum, musique: mus.length > 0, accueil: acc.length > 0,
    decor: DECORS.some((d) => actives.has(d.id)), experiences: EXPERIENCES.some((d) => actives.has(d.id)), missions: missions.every((m) => !!choix.missions[m.id]),
  };

  const grille = "grid grid-cols-2 gap-2.5";
  const unique = <K extends "lumiere">(cle: K, liste: InfoOption[], courant: string | null) => (
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
      <div role="tablist" aria-label={tr("Personnaliser l'événement")} className="flex gap-1.5 overflow-x-auto px-3 pb-2 pt-1 [scrollbar-width:none]">
        {ONGLETS.map((o) => {
          const on = onglet === o.id;
          return (
            <button key={o.id} role="tab" id={`onglet-${o.id}`} aria-selected={on} aria-controls="panneau-contenu" onClick={() => onOnglet(o.id)} data-testid={`onglet-${o.id}`}
              className={`relative shrink-0 rounded-full border px-3.5 min-h-10 text-[13.5px] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F4D774] ${on ? "border-[#C9A74E] bg-[#C9A74E] font-semibold text-[#17141a]" : "border-white/15 bg-white/[0.05] text-[#F0E8D6] hover:bg-white/10"}`}>
              {tr(o.nom)}{fait[o.id] && !on && <Check className="ms-1 inline h-3.5 w-3.5 text-[#E4D49A]" aria-label={tr("déjà choisi")} />}
              {o.id === "missions" && missionsOuvertes > 0 && !fait.missions && <span className="absolute -end-0.5 -top-0.5 h-3 w-3 rounded-full bg-[#E24E8B]" aria-label={tr("nouvelle mission")} />}
            </button>
          );
        })}
      </div>
      <div id="panneau-contenu" role="tabpanel" aria-labelledby={`onglet-${onglet}`} className="min-h-0 flex-1 overflow-y-auto px-3 pb-4 pt-1">
        {onglet === "style" && (
          <div className={grille} role="radiogroup" aria-label={tr("Style")}>
            {STYLES.map((s) => <Carte key={s.id} id={s.id} nom={s.nom} phrase={s.phrase} on={choix.style === s.id} res={false} radio testid={`style-${s.id}`} onClick={() => dispatch({ t: "choisir", patch: { style: s.id } })} />)}
          </div>
        )}
        {onglet === "salle" && <Salle choix={choix} dispatch={dispatch} />}
        {onglet === "couleurs" && (
          <div className="grid grid-cols-2 gap-2.5" role="radiogroup" aria-label={tr("Palette de couleurs")}>
            {PALETTES.map((p) => {
              const on = (choix.palette ?? STYLES.find((s) => s.id === choix.style)?.palette) === p.id;
              return (
                <button key={p.id} type="button" role="radio" aria-checked={on} onClick={() => { petitSon("clic"); dispatch({ t: "choisir", patch: { palette: p.id } }); }} data-testid={`palette-${p.id}`}
                  className={`flex min-h-[72px] flex-col items-start gap-2 rounded-2xl border p-3 text-start transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F4D774] ${on ? "border-[#C9A74E] bg-[#C9A74E]/15" : "border-white/12 bg-white/[0.04] hover:bg-white/[0.09]"}`}>
                  <span className="flex gap-1.5">{[p.nappe, p.fleurs, p.accent, p.deco].map((c, i) => <span key={i} className="h-6 w-6 rounded-full border border-white/40" style={{ background: c }} />)}</span>
                  <span className="text-[13.5px] font-medium text-[#F6EFDD]">{p.nom}{on && <Check className="ms-1 inline h-3.5 w-3.5 text-[#E4D49A]" />}</span>
                </button>
              );
            })}
            {choix.palette && <button type="button" onClick={() => dispatch({ t: "choisir", patch: { palette: null } })} className="col-span-2 rounded-full px-3 min-h-10 text-[13px] text-[#B9B09C] underline-offset-4 hover:underline">{tr("Revenir aux couleurs du style")}</button>}
          </div>
        )}
        {onglet === "lumiere" && unique("lumiere", LUMIERES, lum)}
        {onglet === "musique" && (
          <>
            <p className="mb-2 text-[12.5px] text-[#B9B09C]">{tr("Tu peux en choisir plusieurs : par exemple un orchestre pour le dîner et une troupe folklorique pour l'entrée.")}</p>
            <div className={grille}>
              {dispo(MUSIQUES).map((o) => <Carte key={o.id} id={o.id} nom={o.nom} phrase={o.phrase} on={mus.includes(o.id as MusiqueId)} res={reservable(o)} testid={`musique-${o.id}`}
                onClick={() => dispatch({ t: "choisir", patch: { musiques: mus.includes(o.id as MusiqueId) ? mus.filter((m) => m !== o.id) : [...mus, o.id as MusiqueId] } })} />)}
            </div>
          </>
        )}
        {onglet === "accueil" && (
          <>
            <p className="mb-2 text-[12.5px] text-[#B9B09C]">{tr("Tu peux les cumuler : par exemple un thé de bienvenue avec des hôtesses à l'entrée.")}</p>
            <div className={grille}>
              {dispo(ACCUEILS).map((o) => {
                const on = acc.includes(o.id as AccueilId);
                return <Carte key={o.id} id={o.id} nom={o.nom} phrase={o.phrase} on={on} res={reservable(o)} testid={`accueil-${o.id}`}
                  onClick={() => dispatch({ t: "choisir", patch: on
                    ? { accueils: choix.accueils.filter((a) => a !== o.id), retires: [...new Set([...choix.retires, o.id as OptionId])] }
                    : { accueils: [...new Set([...choix.accueils, o.id as AccueilId])], retires: choix.retires.filter((r) => (r as string) !== o.id) } })} />;
              })}
            </div>
          </>
        )}
        {onglet === "decor" && multiple(DECORS)}
        {onglet === "experiences" && multiple(EXPERIENCES)}
        {onglet === "missions" && (
          <div className="grid gap-3">
            {missions.map((m, i) => i < missionsOuvertes
              ? <MissionCarte key={m.id} mission={m} numero={i + 1} reponse={choix.missions[m.id]} onRepondre={(r) => onRepondre(m.id, r)} />
              : <div key={m.id} className="rounded-2xl border border-dashed border-white/15 p-3.5 text-[13.5px] text-[#B9B09C]">{tr("Mission {n} — un message arrivera sur ton téléphone quand tu auras avancé.", { n: i + 1 })}</div>)}
          </div>
        )}
        <p className="mt-3 text-[11.5px] leading-snug text-[#8f8777]">
          <span className="text-[#E4D49A]">● {tr("Proposé par Heavent")}</span> : {tr("prestation que l'agence peut réserver.")} <span>○ {tr("Inspiration à discuter")}</span> : {tr("idée à étudier ensemble, sans promesse de disponibilité.")}
        </p>
      </div>
    </div>
  );
}
