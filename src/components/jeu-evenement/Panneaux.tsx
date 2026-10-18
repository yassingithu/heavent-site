// Catalogue, panneau de l'élément sélectionné, budget et missions.
import { useState } from "react";
import {
  CATALOGUE, CATEGORIES, CENTRES_DE_TABLE, CleCouleur, MENTION_ESTIMATION, NUANCIER, TypeElement, defElement, format, libelle, placesDe,
} from "./config";
import { Creation, Element, EtatMission, calculerBudget, couleurDe, emprise, palette } from "./logique";
import { DessinElement, TH, TW } from "./dessins";
import { TYPE_GLISSE } from "./Scene";
import { Bouton } from "./ui";

/** Petite vignette SVG d'un élément, dessinée comme dans la scène. */
/** Hauteur visible de chaque élément au-dessus du sol (pour cadrer les vignettes). */
const HAUTEUR: Partial<Record<TypeElement, number>> = { arche: 135, guirlandes: 100, photobooth: 72, fleurs: 70, honneur: 66, gateau: 66, dj: 56, bar: 52, lounge: 32, piste: 8, nawar: 80, hotesse: 54, serveur: 54, maitre_hotel: 54 };
/** « 1 500 MAD + 50 MAD / invité », « 450 MAD / invité » ou « 12 000 MAD ». */
export const prixTexte = (prix: number, parInvite?: number, long = false) => {
  const pi = parInvite ? `${format(parInvite)} ${long ? "par invité" : "/ invité"}` : "";
  return prix || !pi ? [format(prix), pi].filter(Boolean).join(long ? " plus " : " + ") : pi;
};

export function Miniature({ type, creation, taille = 56 }: { type: TypeElement; creation: Creation; taille?: number }) {
  const { w, h } = emprise({ type });
  const ht = HAUTEUR[type] ?? 36;
  const vb = `${-h * (TW / 2) - 4} ${-ht - 4} ${(w + h) * (TW / 2) + 8} ${(w + h) * (TH / 2) + ht + 8}`;
  return (
    <svg viewBox={vb} width={taille} height={taille} aria-hidden className="shrink-0">
      <DessinElement e={{ uid: "m", type, x: 0, y: 0 }} ctx={{ palette: palette(creation.reglages.ambiance), type: creation.reglages.type, centres: creation.centres }} />
    </svg>
  );
}

// ── Catalogue ───────────────────────────────────────────────────────────────
export function Catalogue({ creation, enPlacement, onChoisir, onCentres }: {
  creation: Creation; enPlacement?: TypeElement | null; onChoisir: (t: TypeElement) => void; onCentres: (actif: boolean) => void;
}) {
  const [cat, setCat] = useState<string>("places");
  const t = creation.reglages.type;
  return (
    <div className="space-y-3">
      <div role="tablist" aria-label="Catégories du catalogue" className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
        {CATEGORIES.map((c) => (
          <button key={c.id} role="tab" aria-selected={cat === c.id} onClick={() => setCat(c.id)}
            className={`shrink-0 rounded-full px-3 min-h-9 text-xs font-medium border transition-colors ${cat === c.id ? "bg-[#2A2420] text-white border-[#2A2420]" : "bg-white text-[#5A4B2E] border-[#E3D6BA] hover:bg-[#F6EEDC]"}`}>
            {c.nom}
          </button>
        ))}
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2" aria-label="Éléments à ajouter">
        {CATALOGUE.filter((d) => d.categorie === cat).map((d) => {
          const l = libelle(d.id, t);
          const places = placesDe(d.id, t);
          const actif = enPlacement === d.id;
          return (
            <li key={d.id}>
              <button
                draggable
                onDragStart={(ev) => { ev.dataTransfer.setData(TYPE_GLISSE, d.id); ev.dataTransfer.effectAllowed = "copy"; (window as any).__heaventGlisse = d.id; }}
                onDragEnd={() => { (window as any).__heaventGlisse = undefined; }}
                onClick={() => onChoisir(d.id)}
                aria-pressed={actif}
                aria-label={`${l.nom} : ${prixTexte(d.prix, d.prixParInvite, true)}${places ? `, ${places} places` : ""}. Ajouter à la scène`}
                className={`w-full flex items-center gap-3 rounded-2xl border p-2.5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A74E] ${actif ? "border-[#C9A74E] bg-[#FBF3DF]" : "border-[#EADFC8] bg-white hover:border-[#D8C391] hover:shadow-sm"}`}
              >
                <Miniature type={d.id} creation={creation} />
                <div className="min-w-0">
                  <div className="font-medium text-sm text-[#2A2420]">{l.nom}</div>
                  <div className="text-xs text-[#6B6155] line-clamp-2">{l.description}</div>
                  <div className="text-xs mt-0.5 text-[#8C6D22] font-medium">
                    {prixTexte(d.prix, d.prixParInvite)}{places ? ` · ${places} places` : ""}
                  </div>
                </div>
              </button>
            </li>
          );
        })}
        {cat === "decoration" && (
          <li>
            <label className="w-full flex items-center gap-3 rounded-2xl border border-[#EADFC8] bg-white p-3 cursor-pointer hover:border-[#D8C391]">
              <input type="checkbox" className="h-5 w-5 accent-[#C9A74E]" checked={creation.centres.actif} onChange={(e) => onCentres(e.target.checked)} />
              <div>
                <div className="font-medium text-sm">{CENTRES_DE_TABLE.nom}</div>
                <div className="text-xs text-[#6B6155]">{CENTRES_DE_TABLE.description}</div>
                <div className="text-xs mt-0.5 text-[#8C6D22] font-medium">{format(CENTRES_DE_TABLE.prixParTable)} par table</div>
              </div>
            </label>
          </li>
        )}
      </ul>
      <p className="text-xs text-[#6B6155]">Sur ordinateur, glissez un élément sur la scène. Partout ailleurs : touchez-le, puis touchez une zone libre.</p>
    </div>
  );
}

// ── Élément sélectionné ─────────────────────────────────────────────────────
const LIBELLE_COULEUR: Record<CleCouleur, string> = { nappe: "Couleur des nappes", fleurs: "Couleur des fleurs", deco: "Couleur de la décoration" };

export function PanneauSelection({ creation, element, enDeplacement, onCouleur, onCouleurTous, onDeplacer, onPas, onTourner, onDupliquer, onSupprimer, onFermer, onCentresCouleur }: {
  creation: Creation; element: Element; enDeplacement: boolean;
  onCouleur: (c: string) => void; onCouleurTous: (c: string) => void; onDeplacer: () => void; onPas: (dx: number, dy: number) => void;
  onTourner: () => void; onDupliquer: () => void; onSupprimer: () => void; onFermer: () => void; onCentresCouleur: (c: string) => void;
}) {
  const d = defElement(element.type);
  const l = libelle(element.type, creation.reglages.type);
  const places = placesDe(element.type, creation.reglages.type);
  const couleur = couleurDe(element, creation.reglages.ambiance);
  const memes = creation.elements.filter((e) => e.type === element.type).length;
  const estTable = element.type === "table_ronde" || element.type === "table_rect";
  return (
    <section aria-label={`Élément sélectionné : ${l.nom}`} className="rounded-2xl border border-[#E3D3AE] bg-white p-4 space-y-3 shadow-sm">
      <div className="flex items-start gap-3">
        <Miniature type={element.type} creation={creation} taille={52} />
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-lg leading-tight">{l.nom}</h3>
          <p className="text-xs text-[#6B6155]">{l.description}</p>
          <p className="text-xs text-[#8C6D22] font-medium mt-1">{prixTexte(d.prix, d.prixParInvite, true)}{d.prixParInvite ? " (compté une fois)" : ""}{places ? ` · ${places} places` : ""}</p>
        </div>
        <button onClick={onFermer} className="rounded-full h-9 w-9 hover:bg-[#F1E8D8] text-[#6B6155]" aria-label="Fermer le panneau">✕</button>
      </div>

      {d.couleur && (
        <div>
          <div className="text-xs font-medium mb-1.5">{LIBELLE_COULEUR[d.couleur]}</div>
          <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label={LIBELLE_COULEUR[d.couleur]}>
            {NUANCIER.map((n) => (
              <button key={n.valeur} role="radio" aria-checked={couleur === n.valeur} aria-label={n.nom} title={n.nom} onClick={() => onCouleur(n.valeur)}
                className={`h-8 w-8 rounded-full border-2 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A74E] ${couleur === n.valeur ? "border-[#2A2420] scale-110" : "border-white shadow-[0_0_0_1px_#DCCFB5]"}`}
                style={{ background: n.valeur }} />
            ))}
          </div>
          {memes > 1 && couleur && <button className="mt-2 text-xs underline text-[#5A4B2E]" onClick={() => onCouleurTous(couleur)}>Appliquer cette couleur aux {memes} « {l.nom} »</button>}
        </div>
      )}
      {estTable && creation.centres.actif && (
        <div>
          <div className="text-xs font-medium mb-1.5">Couleur des centres de table</div>
          <div className="flex flex-wrap gap-1.5">
            {NUANCIER.slice(0, 9).map((n) => (
              <button key={n.valeur} aria-label={`Centres de table ${n.nom}`} title={n.nom} onClick={() => onCentresCouleur(n.valeur)}
                className={`h-7 w-7 rounded-full border-2 ${(creation.centres.couleur ?? palette(creation.reglages.ambiance).fleurs) === n.valeur ? "border-[#2A2420]" : "border-white shadow-[0_0_0_1px_#DCCFB5]"}`} style={{ background: n.valeur }} />
            ))}
          </div>
        </div>
      )}

      <div className="hidden lg:block">
        <div className="text-xs font-medium mb-1.5">Déplacer</div>
        <div className="flex flex-wrap items-center gap-2">
          <Bouton variante={enDeplacement ? "principal" : "secondaire"} onClick={onDeplacer} aria-pressed={enDeplacement}>{enDeplacement ? "Touchez la nouvelle place…" : "Choisir une nouvelle place"}</Bouton>
          <div className="grid grid-cols-2 gap-1" aria-label="Déplacer d'une case">
            <button className="h-9 w-9 rounded-lg border border-[#E3D6BA] bg-white hover:bg-[#F6EEDC]" aria-label="Vers le fond, à gauche" onClick={() => onPas(-1, 0)}>↖</button>
            <button className="h-9 w-9 rounded-lg border border-[#E3D6BA] bg-white hover:bg-[#F6EEDC]" aria-label="Vers le fond, à droite" onClick={() => onPas(0, -1)}>↗</button>
            <button className="h-9 w-9 rounded-lg border border-[#E3D6BA] bg-white hover:bg-[#F6EEDC]" aria-label="Vers l'avant, à gauche" onClick={() => onPas(0, 1)}>↙</button>
            <button className="h-9 w-9 rounded-lg border border-[#E3D6BA] bg-white hover:bg-[#F6EEDC]" aria-label="Vers l'avant, à droite" onClick={() => onPas(1, 0)}>↘</button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {d.w !== d.h && <Bouton variante="secondaire" onClick={onTourner}>Tourner</Bouton>}
        <Bouton variante="secondaire" onClick={onDupliquer}>Dupliquer</Bouton>
        <Bouton variante="danger" onClick={onSupprimer}>Supprimer</Bouton>
      </div>
      <p className="text-[11px] text-[#6B6155]">Astuce : faites glisser l'élément directement sur la scène (souris ou doigt). Au clavier : flèches pour déplacer, Suppr pour retirer, Échap pour désélectionner.</p>
    </section>
  );
}

// ── Budget ──────────────────────────────────────────────────────────────────
export function JaugeBudget({ creation, onAjuster }: { creation: Creation; onAjuster: () => void }) {
  const b = calculerBudget(creation);
  const ratio = b.budget > 0 ? b.total / b.budget : 0;
  const couleur = ratio > 1 ? "#B5473E" : ratio > 0.9 ? "#C98A2E" : "#7C9A5C";
  return (
    <section aria-label="Budget" className="rounded-2xl border border-[#EADFC8] bg-white p-4">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-serif text-base">Budget</h3>
        <div className="text-sm"><span className="font-semibold" data-testid="estimation">{format(b.total)}</span> <span className="text-[#6B6155]">/ {format(b.budget)}</span></div>
      </div>
      <div className="mt-2 h-3 rounded-full bg-[#F1E8D8] overflow-hidden" role="meter" aria-valuemin={0} aria-valuemax={b.budget} aria-valuenow={Math.round(b.total)} aria-label="Estimation par rapport au budget">
        <div className="h-full rounded-full motion-safe:transition-all motion-safe:duration-500" style={{ width: `${Math.min(100, ratio * 100)}%`, background: couleur }} />
      </div>
      <div aria-live="polite" className="mt-2 text-xs">
        {b.depassement > 0 ? (
          <div className="rounded-lg bg-[#FBEDEB] border border-[#EFC9C4] text-[#8A2E26] p-2" data-testid="depassement">
            Votre création dépasse le budget de <b>{format(b.depassement)}</b>. Vous pouvez retirer ou remplacer un élément, ou <button className="underline font-medium" onClick={onAjuster}>ajuster votre budget</button>.
          </div>
        ) : (
          <div className="text-[#4F6B3A]">Il vous reste {format(b.reste)} sur votre budget.</div>
        )}
      </div>
      {b.total > 0 && <div className="mt-2 text-[11px] text-[#6B6155]">Dont {format(b.totalFixe)} de coûts fixes et {format(b.totalParInvite)} liés au nombre d'invités.</div>}
      <p className="mt-1 text-[11px] text-[#6B6155] italic">{MENTION_ESTIMATION}</p>
    </section>
  );
}

// ── Missions ────────────────────────────────────────────────────────────────
export function Missions({ missions, celebre }: { missions: EtatMission[]; celebre?: string | null }) {
  const faites = missions.filter((m) => m.ok).length;
  return (
    <section aria-label="Missions" className="rounded-2xl border border-[#EADFC8] bg-white p-4">
      <div className="flex items-baseline justify-between">
        <h3 className="font-serif text-base">Missions</h3>
        <span className="text-xs text-[#6B6155]">{faites} / {missions.length}</span>
      </div>
      <ol className="mt-2 space-y-2">
        {missions.map((m) => (
          <li key={m.id} data-mission={m.id} data-ok={m.ok} className={`flex gap-2.5 rounded-xl p-2 transition-colors ${m.ok ? "bg-[#F1F6EC]" : "bg-[#FBF8F1]"} ${celebre === m.id ? "motion-safe:animate-[pulse_0.6s_ease-in-out_2]" : ""}`}>
            <span aria-hidden className={`mt-0.5 h-6 w-6 shrink-0 rounded-full grid place-items-center text-xs font-bold ${m.ok ? "bg-[#7C9A5C] text-white" : "border-2 border-[#D9C9A5] text-transparent"} ${celebre === m.id ? "motion-safe:scale-125 motion-safe:transition-transform" : ""}`}>✓</span>
            <div>
              <div className="text-sm font-medium">{m.titre}<span className="sr-only">{m.ok ? " : accomplie" : " : à faire"}</span></div>
              <div className="text-xs text-[#6B6155]">{m.aide}</div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
