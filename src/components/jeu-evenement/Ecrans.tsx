// Écran d'accueil et personnalisation initiale.
import { useMemo } from "react";
import { AMBIANCES, LIEUX, LIMITES_INVITES, TYPES_EVENEMENT, format, libelle } from "./config";
import { Creation, Reglages, Sauvegarde, nouvelleCreation, palette } from "./logique";
import Scene from "./Scene";
import { Bouton, Puce } from "./ui";

export function Accueil({ sauvegarde, onCommencer, onReprendre }: { sauvegarde: Sauvegarde | null; onCommencer: () => void; onReprendre: () => void }) {
  const apercu = useMemo<Creation>(() => ({
    ...nouvelleCreation({ type: "mariage", invites: 60, budget: 60000, lieu: "jardin", ambiance: "romantique" }),
    centres: { actif: true },
    elements: [
      { uid: "a", type: "arche", x: 2, y: 0 }, { uid: "b", type: "table_ronde", x: 0, y: 2 }, { uid: "c", type: "table_ronde", x: 4, y: 2 },
      { uid: "d", type: "guirlandes", x: 0, y: 0 }, { uid: "e", type: "guirlandes", x: 5, y: 0 }, { uid: "f", type: "gateau", x: 3, y: 3 },
    ],
  }), []);
  return (
    <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 items-center">
      <div className="space-y-5">
        <p className="uppercase tracking-[0.25em] text-xs text-[#8C6D22]">Crée ton événement de rêve</p>
        <h1 className="font-serif text-4xl sm:text-5xl leading-tight text-[#2A2420]">Et si on créait votre événement idéal ?</h1>
        <p className="text-[#5E554A] leading-relaxed max-w-xl">
          Choisissez votre type d'événement, votre lieu et votre ambiance, puis composez la scène : tables, arche, fleurs, lumières, piste de danse…
          Votre budget se met à jour à chaque ajout. En quelques minutes, vous repartez avec un récapitulatif à garder ou à nous envoyer pour un devis.
        </p>
        <p className="text-xs text-[#6B6155]">Sans inscription · 3 à 5 minutes · Vos choix sont enregistrés sur cet appareil, sans aucune coordonnée.</p>
        <div className="flex flex-wrap gap-3">
          {sauvegarde ? (
            <>
              <Bouton onClick={onReprendre}>Reprendre ma création</Bouton>
              <Bouton variante="secondaire" onClick={onCommencer}>Recommencer à zéro</Bouton>
            </>
          ) : (
            <Bouton onClick={onCommencer} className="px-6 text-base">Je crée mon événement</Bouton>
          )}
        </div>
        {sauvegarde && (
          <p className="text-xs text-[#6B6155]">
            Création enregistrée le {new Date(sauvegarde.enregistreLe).toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" })} :{" "}
            {TYPES_EVENEMENT.find((t) => t.id === sauvegarde.creation.reglages.type)?.nom}, {sauvegarde.creation.elements.length} élément(s).
          </p>
        )}
      </div>
      <div className="rounded-[2rem] bg-white/70 border border-[#EADFC8] p-3 shadow-[0_20px_60px_-30px_rgba(140,109,34,0.45)]" aria-hidden>
        <Scene creation={apercu} cols={7} rows={5} lectureSeule />
      </div>
    </div>
  );
}

const SUGGESTIONS_BUDGET = [30000, 60000, 120000, 180000, 250000];

export function Personnalisation({ reglages, onChange, onValider, onRetour, enCours }: {
  reglages: Reglages; onChange: (r: Reglages) => void; onValider: () => void; onRetour: () => void; enCours: boolean;
}) {
  const set = <K extends keyof Reglages>(k: K, v: Reglages[K]) => onChange({ ...reglages, [k]: v });
  const type = TYPES_EVENEMENT.find((t) => t.id === reglages.type)!;
  const apercu = useMemo<Creation>(() => ({
    ...nouvelleCreation(reglages), centres: { actif: true },
    elements: [
      { uid: "h", type: "honneur", x: 1, y: 0 }, { uid: "a", type: reglages.type === "pro" ? "dj" : "arche", x: 4, y: 3, tourne: reglages.type !== "pro" },
      { uid: "t", type: "table_ronde", x: 0, y: 2 }, { uid: "t2", type: "table_ronde", x: 2, y: 2 }, { uid: "g", type: "guirlandes", x: 5, y: 0 },
    ],
  }), [reglages]);
  const invitesOk = reglages.invites >= LIMITES_INVITES.min && reglages.invites <= LIMITES_INVITES.max;
  const budgetOk = reglages.budget > 0;
  return (
    <div className="grid lg:grid-cols-[1.25fr_1fr] gap-8">
      <form className="space-y-7" onSubmit={(e) => { e.preventDefault(); if (invitesOk && budgetOk) onValider(); }}>
        <div>
          <h2 className="font-serif text-3xl">Parlez-nous de {type.article}</h2>
          <p className="text-sm text-[#6B6155] mt-1">Ces choix habillent la scène et adaptent le catalogue. Vous pourrez les modifier à tout moment.</p>
        </div>

        <fieldset>
          <legend className="font-medium mb-2">Type d'événement</legend>
          <div role="radiogroup" aria-label="Type d'événement" className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {TYPES_EVENEMENT.map((t) => <Puce key={t.id} actif={reglages.type === t.id} onClick={() => set("type", t.id)} titre={t.nom} />)}
          </div>
        </fieldset>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="invites" className="font-medium">Nombre d'invités</label>
            <div className="flex items-center gap-3 mt-2">
              <input id="invites" type="number" inputMode="numeric" min={LIMITES_INVITES.min} max={LIMITES_INVITES.max} value={reglages.invites}
                onChange={(e) => set("invites", Math.round(Number(e.target.value) || 0))}
                className="w-28 rounded-xl border border-[#DCCBA6] bg-white px-3 min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A74E]" aria-describedby="aide-invites" />
              <input type="range" min={LIMITES_INVITES.min} max={LIMITES_INVITES.max} step={10} value={Math.min(LIMITES_INVITES.max, reglages.invites)} onChange={(e) => set("invites", Number(e.target.value))}
                className="flex-1 accent-[#C9A74E]" aria-label="Nombre d'invités (curseur)" />
            </div>
            <p id="aide-invites" className={`text-xs mt-1 ${invitesOk ? "text-[#6B6155]" : "text-[#9B2C2C]"}`}>Entre {LIMITES_INVITES.min} et {LIMITES_INVITES.max} invités.</p>
          </div>
          <div>
            <label htmlFor="budget" className="font-medium">Budget souhaité (MAD)</label>
            <input id="budget" type="number" inputMode="numeric" min={0} step={1000} value={reglages.budget} onChange={(e) => set("budget", Math.max(0, Math.round(Number(e.target.value) || 0)))}
              className="mt-2 w-full rounded-xl border border-[#DCCBA6] bg-white px-3 min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A74E]" />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {SUGGESTIONS_BUDGET.map((b) => (
                <button type="button" key={b} onClick={() => set("budget", b)} className={`rounded-full px-2.5 min-h-8 text-xs border ${reglages.budget === b ? "bg-[#2A2420] text-white border-[#2A2420]" : "bg-white border-[#E3D6BA] hover:bg-[#F6EEDC]"}`}>{format(b)}</button>
              ))}
            </div>
          </div>
        </div>

        <fieldset>
          <legend className="font-medium mb-2">Lieu</legend>
          <div role="radiogroup" aria-label="Lieu" className="grid sm:grid-cols-3 gap-2">
            {LIEUX.map((l) => <Puce key={l.id} actif={reglages.lieu === l.id} onClick={() => set("lieu", l.id)} titre={l.nom} sous={l.description}
              icone={<span aria-hidden className="h-8 w-8 rounded-lg shrink-0" style={{ background: `repeating-linear-gradient(135deg, ${l.sol[0]} 0 6px, ${l.sol[1]} 6px 12px)` }} />} />)}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-medium mb-2">Ambiance</legend>
          <div role="radiogroup" aria-label="Ambiance" className="grid sm:grid-cols-2 gap-2">
            {AMBIANCES.map((a) => <Puce key={a.id} actif={reglages.ambiance === a.id} onClick={() => set("ambiance", a.id)} titre={a.nom} sous={a.description}
              icone={<span aria-hidden className="flex -space-x-1.5 shrink-0">{[a.palette.nappe, a.palette.fleurs, a.palette.deco].map((c, i) => <span key={i} className="h-6 w-6 rounded-full border-2 border-white shadow-[0_0_0_1px_#DCCFB5]" style={{ background: c }} />)}</span>} />)}
          </div>
        </fieldset>

        <div className="flex flex-wrap gap-3">
          <Bouton type="submit" disabled={!invitesOk || !budgetOk} className="px-6">{enCours ? "Retour à ma scène" : "Composer ma scène"}</Bouton>
          <Bouton type="button" variante="discret" onClick={onRetour}>Retour</Bouton>
        </div>
      </form>

      <aside className="lg:sticky lg:top-24 self-start space-y-3" aria-label="Aperçu de vos choix">
        <div className="rounded-[2rem] bg-white/70 border border-[#EADFC8] p-3">
          <Scene creation={apercu} cols={7} rows={5} lectureSeule />
        </div>
        <p className="text-xs text-[#6B6155] text-center">
          Aperçu : {LIEUX.find((l) => l.id === reglages.lieu)?.nom.toLowerCase()}, ambiance {AMBIANCES.find((a) => a.id === reglages.ambiance)?.nom.toLowerCase()} —
          {" "}{libelle("honneur", reglages.type).nom.toLowerCase()}{reglages.type === "pro" ? "" : ` et ${libelle("arche", reglages.type).nom.toLowerCase()}`}.
          <span className="inline-block ml-1 h-3 w-3 rounded-full align-middle" style={{ background: palette(reglages.ambiance).accent }} aria-hidden />
        </p>
      </aside>
    </div>
  );
}
