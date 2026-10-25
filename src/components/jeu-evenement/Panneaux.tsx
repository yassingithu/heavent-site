// Catalogue, panneau de l'élément sélectionné, budget et missions.
import { useEffect, useRef, useState } from "react";
import {
  CATALOGUE, CATEGORIES, CENTRES_DE_TABLE, CleCouleur, NUANCIER, TypeElement, defElement, format, libelle, mentionEstimation, placesDe,
} from "./config";
import { tr } from "./langue";
import { Creation, Element, EtatMission, NOM_MAX, calculerBudget, couleurDe, emprise, nomElement, palette } from "./logique";
import { DessinElement, TH, TW } from "./dessins";
import { TYPE_GLISSE } from "./Scene";
import { Bouton } from "./ui";

/** Petite vignette SVG d'un élément, dessinée comme dans la scène. */
/** Hauteur visible de chaque élément au-dessus du sol (pour cadrer les vignettes). */
const HAUTEUR: Partial<Record<TypeElement, number>> = { tente: 125, arche: 135, guirlandes: 100, photobooth: 72, fleurs: 70, honneur: 66, gateau: 66, dj: 56, bar: 52, lounge: 32, piste: 8, nawar: 80, hotesse: 54, serveur: 54, maitre_hotel: 54, fauteuils: 58, table_haute: 40, amaria: 112, mur_fleurs: 94, candelabre: 82, allee: 22, the: 32, objet_libre: 62, espace_libre: 40 };
/** « 1 500 MAD + 50 MAD / invité », « 450 MAD / invité » ou « 12 000 MAD ». */
export const prixTexte = (prix: number, parInvite?: number, long = false) => {
  const pi = parInvite ? `${format(parInvite)} ${long ? tr("par invité") : tr("/ invité")}` : "";
  return prix || !pi ? [format(prix), pi].filter(Boolean).join(long ? ` ${tr("plus")} ` : " + ") : pi;
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
  // Sur ordinateur, la colonne de droite est un petit présentoir de tuiles (sans descendre dans la page) ; ailleurs, la liste détaillée.
  const [cat, setCat] = useState<string>("places");
  const t = creation.reglages.type;
  return (
    <div className="space-y-3">
      <div role="tablist" aria-label={tr("Catégories du catalogue")} className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
        {CATEGORIES.map((c) => (
          <button key={c.id} role="tab" aria-selected={cat === c.id} onClick={() => setCat(c.id)}
            className={`shrink-0 rounded-full px-3 min-h-9 text-xs font-medium border transition-colors ${cat === c.id ? "bg-[#2A2420] text-white border-[#2A2420]" : "bg-white text-[#5A4B2E] border-[#E3D6BA] hover:bg-[#F6EEDC]"}`}>
            {tr(c.nom)}
          </button>
        ))}
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2" aria-label={tr("Éléments à ajouter")}>
        {CATALOGUE.filter((d) => d.categorie === cat && (!d.types || d.types.includes(t)) && (!d.lieux || d.lieux.includes(creation.reglages.lieu))).map((d) => {
          const l = libelle(d.id, t);
          const places = placesDe(d.id, t);
          const actif = enPlacement === d.id;
          const surScene = creation.elements.filter((e) => e.type === d.id).length;
          return (
            <li key={d.id}>
              <button
                draggable
                onDragStart={(ev) => { ev.dataTransfer.setData(TYPE_GLISSE, d.id); ev.dataTransfer.effectAllowed = "copy"; (window as any).__heaventGlisse = d.id; }}
                onDragEnd={() => { (window as any).__heaventGlisse = undefined; }}
                onClick={() => onChoisir(d.id)}
                aria-pressed={actif}
                aria-label={tr("{nom} : {prix}{places}. Ajouter à la scène", { nom: l.nom, prix: d.surDevis ? tr("Prix sur devis") : prixTexte(d.prix, d.prixParInvite, true), places: places ? tr(", {n} places", { n: places }) : "" })}
                title={l.description}
                className={`w-full h-full flex items-center gap-3 lg:flex-col lg:justify-start lg:gap-1 lg:text-center rounded-2xl border p-2.5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A74E] ${actif ? "border-[#C9A74E] bg-[#FBF3DF]" : "border-[#EADFC8] bg-white hover:border-[#D8C391] hover:shadow-sm"}`}
              >
                <Miniature type={d.id} creation={creation} />
                <div className="min-w-0 flex-1 lg:flex-none lg:w-full">
                  <div className="font-medium text-sm text-[#2A2420] flex items-center gap-2 lg:flex-col lg:gap-0.5 lg:text-[13px] lg:leading-tight">
                    <span>{l.nom}</span>
                    {surScene > 0 && <span className="shrink-0 rounded-full bg-[#F1E4C2] text-[#6F5518] text-[10px] font-semibold px-1.5 py-0.5" data-sur-scene={surScene}>{tr("× {n} sur la scène", { n: surScene })}</span>}
                  </div>
                  <div className="text-xs text-[#6B6155] line-clamp-2 lg:hidden">{l.description}</div>
                  <div className="text-xs mt-0.5 text-[#8C6D22] font-medium">
                    {d.surDevis ? tr("Prix sur devis") : prixTexte(d.prix, d.prixParInvite)}{places ? ` · ${tr("{n} places", { n: places })}` : ""}
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
                <div className="font-medium text-sm">{tr(CENTRES_DE_TABLE.nom)}</div>
                <div className="text-xs text-[#6B6155]">{tr(CENTRES_DE_TABLE.description)}</div>
                <div className="text-xs mt-0.5 text-[#8C6D22] font-medium">{tr("{prix} par table", { prix: format(CENTRES_DE_TABLE.prixParTable) })}</div>
              </div>
            </label>
          </li>
        )}
      </ul>
      <p className="text-xs text-[#6B6155]">{tr("Sur ordinateur, glissez un élément sur la scène. Partout ailleurs : touchez-le, puis touchez une zone libre.")}</p>
    </div>
  );
}

// ── Tiroir du catalogue (téléphone et tablette) ───────────────────────────────
/**
 * Barre fixe en bas de l'écran : on choisit un élément SANS quitter la scène des yeux.
 * « Ajout rapide » (par défaut) : un geste = l'élément est posé au meilleur endroit libre ; on peut ensuite le déplacer au doigt.
 * Sinon : on touche l'élément, puis la zone souhaitée de la scène.
 */
export function Tiroir({ creation, enPlacement, ajoutRapide, onAjoutRapide, onAjouter, onChoisir, onCentres, onDecouvrir, onAjuster, missions }: {
  creation: Creation; enPlacement?: TypeElement | null; ajoutRapide: boolean; onAjoutRapide: (v: boolean) => void;
  onAjouter: (t: TypeElement) => void; onChoisir: (t: TypeElement) => void; onCentres: (actif: boolean) => void;
  onDecouvrir: () => void; onAjuster: () => void; missions: EtatMission[];
}) {
  const [cat, setCat] = useState<string>("places");
  const [ouvert, setOuvert] = useState(true);
  const t = creation.reglages.type;
  const b = calculerBudget(creation);
  const depasse = b.depassement > 0;
  return (
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 rounded-t-3xl border-t border-[#E3D6BA] bg-[#FFFDF8]/97 backdrop-blur shadow-[0_-12px_30px_-18px_rgba(60,40,10,0.45)] pb-[env(safe-area-inset-bottom)]" data-testid="tiroir" data-ouvert={ouvert ? "oui" : "non"}>
      <div className="flex items-center gap-2 px-3 pt-2">
        <button onClick={() => setOuvert((o) => !o)} aria-expanded={ouvert} aria-label={tr("Catalogue")} data-testid="tiroir-bascule" className="h-8 px-3 rounded-full bg-[#F6EEDC] text-xs font-medium text-[#5A4B2E] shrink-0">{ouvert ? "▾" : "▴"} {tr("Catalogue")}</button>
        <button onClick={onAjuster} className={`min-w-0 flex-1 truncate text-left text-xs ${depasse ? "text-[#8A2E26] font-medium" : "text-[#4F6B3A]"}`} data-testid="tiroir-budget">
          {depasse ? tr("Dépassement : {montant}", { montant: format(b.depassement) }) : tr("Il reste {montant}", { montant: format(b.reste) })}
        </button>
        <span className="flex gap-1 shrink-0" aria-hidden>{missions.map((m) => <span key={m.id} className={`h-2.5 w-2.5 rounded-full ${m.ok ? "bg-[#7C9A5C]" : "bg-[#E3D6BA]"}`} />)}</span>
        <Bouton onClick={onDecouvrir} aria-label={tr("Découvrir mon événement")} className="!min-h-9 !px-3 text-xs shrink-0">{tr("Découvrir")} ✨</Bouton>
      </div>
      {ouvert && (
        <div className="px-3 pb-2 pt-1.5">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5" role="tablist" aria-label={tr("Catégories du catalogue")}>
            {CATEGORIES.map((c) => (
              <button key={c.id} role="tab" aria-selected={cat === c.id} onClick={() => setCat(c.id)}
                className={`shrink-0 rounded-full px-3 min-h-8 text-xs font-medium border ${cat === c.id ? "bg-[#2A2420] text-white border-[#2A2420]" : "bg-white text-[#5A4B2E] border-[#E3D6BA]"}`}>{tr(c.nom)}</button>
            ))}
            <label className="ml-auto shrink-0 inline-flex items-center gap-1.5 text-[11px] text-[#5A4B2E] pl-2">
              <input type="checkbox" className="h-4 w-4 accent-[#C9A74E]" checked={ajoutRapide} onChange={(e) => onAjoutRapide(e.target.checked)} data-testid="ajout-rapide" />
              {tr("Ajout rapide")}
            </label>
          </div>
          <ul className="flex gap-2 overflow-x-auto pb-1 snap-x" aria-label={tr("Éléments à ajouter")} data-testid="tiroir-elements">
            {CATALOGUE.filter((d) => d.categorie === cat && (!d.types || d.types.includes(t)) && (!d.lieux || d.lieux.includes(creation.reglages.lieu))).map((d) => {
              const l = libelle(d.id, t);
              const places = placesDe(d.id, t);
              const actif = enPlacement === d.id;
              const surScene = creation.elements.filter((e) => e.type === d.id).length;
              return (
                <li key={d.id} className="snap-start shrink-0">
                  <button onClick={() => (ajoutRapide ? onAjouter(d.id) : onChoisir(d.id))} aria-pressed={actif}
                    aria-label={tr("{nom} : {prix}{places}. Ajouter à la scène", { nom: l.nom, prix: d.surDevis ? tr("Prix sur devis") : prixTexte(d.prix, d.prixParInvite, true), places: places ? tr(", {n} places", { n: places }) : "" })}
                    className={`relative w-[92px] h-full flex flex-col items-center gap-0.5 rounded-2xl border px-1.5 py-2 text-center transition-transform active:scale-95 ${actif ? "border-[#C9A74E] bg-[#FBF3DF]" : "border-[#EADFC8] bg-white"}`}>
                    <Miniature type={d.id} creation={creation} taille={48} />
                    <span className="text-[11px] font-medium leading-tight text-[#2A2420] line-clamp-2 min-h-[1.9em]">{l.nom}</span>
                    <span className="text-[10px] text-[#8C6D22] font-medium leading-tight">{d.surDevis ? tr("Prix sur devis") : prixTexte(d.prix, d.prixParInvite)}</span>
                    {surScene > 0 && <span className="absolute -top-1.5 -right-1 min-w-5 h-5 px-1 rounded-full bg-[#C9A74E] text-white text-[10px] font-semibold inline-flex items-center justify-center" data-sur-scene={surScene}>{surScene}</span>}
                  </button>
                </li>
              );
            })}
            {cat === "decoration" && (
              <li className="snap-start shrink-0">
                <button onClick={() => onCentres(!creation.centres.actif)} aria-pressed={creation.centres.actif}
                  className={`w-[92px] h-full flex flex-col items-center justify-center gap-1 rounded-2xl border px-1.5 py-2 text-center active:scale-95 ${creation.centres.actif ? "border-[#C9A74E] bg-[#FBF3DF]" : "border-[#EADFC8] bg-white"}`}>
                  <span className="text-xl" aria-hidden>🌸</span>
                  <span className="text-[11px] font-medium leading-tight">{tr(CENTRES_DE_TABLE.nom)}</span>
                  <span className="text-[10px] text-[#8C6D22] font-medium">{creation.centres.actif ? tr("Ajoutés ✓") : tr("{prix} par table", { prix: format(CENTRES_DE_TABLE.prixParTable) })}</span>
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

// ── Élément sélectionné ─────────────────────────────────────────────────────
const LIBELLE_COULEUR: Record<CleCouleur, string> = { nappe: "Couleur des nappes", fleurs: "Couleur des fleurs", deco: "Couleur de la décoration" };

export function PanneauSelection({ creation, element, enDeplacement, onCouleur, onCouleurTous, onDeplacer, onPas, onTourner, onDupliquer, onSupprimer, onFermer, onCentresCouleur, onNom }: {
  creation: Creation; element: Element; enDeplacement: boolean; onNom: (nom: string) => void;
  onCouleur: (c: string) => void; onCouleurTous: (c: string) => void; onDeplacer: () => void; onPas: (dx: number, dy: number) => void;
  onTourner: () => void; onDupliquer: () => void; onSupprimer: () => void; onFermer: () => void; onCentresCouleur: (c: string) => void;
}) {
  const d = defElement(element.type);
  const l = libelle(element.type, creation.reglages.type);
  const places = placesDe(element.type, creation.reglages.type);
  const couleur = couleurDe(element, creation.reglages.ambiance);
  const memes = creation.elements.filter((e) => e.type === element.type).length;
  const estTable = element.type === "table_ronde" || element.type === "table_rect";
  const nom = nomElement(element, creation.reglages.type);
  return (
    <section aria-label={tr("Élément sélectionné : {nom}", { nom })} className="rounded-2xl border border-[#E3D3AE] bg-white p-4 space-y-3 shadow-sm">
      <div className="flex items-start gap-3">
        <Miniature type={element.type} creation={creation} taille={52} />
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-lg leading-tight break-words">{nom}</h3>
          <p className="text-xs text-[#6B6155]">{d.surDevis ? tr("Donnez-lui le nom de votre choix : nous le chiffrons dans votre devis.") : l.description}</p>
          <p className="text-xs text-[#8C6D22] font-medium mt-1">{d.surDevis ? tr("Prix sur devis") : `${prixTexte(d.prix, d.prixParInvite, true)}${d.prixParInvite ? ` ${tr("(compté une fois)")}` : ""}`}{places ? ` · ${tr("{n} places", { n: places })}` : ""}</p>
        </div>
        <button onClick={onFermer} className="rounded-full h-9 w-9 hover:bg-[#F1E8D8] text-[#6B6155]" aria-label={tr("Fermer le panneau")}>✕</button>
      </div>

      {d.surDevis && <ChampNom key={element.uid} valeur={element.nom ?? ""} onNom={onNom} />}

      {d.couleur && (
        <div>
          <div className="text-xs font-medium mb-1.5">{tr(LIBELLE_COULEUR[d.couleur])}</div>
          <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label={tr(LIBELLE_COULEUR[d.couleur])}>
            {NUANCIER.map((n) => (
              <button key={n.valeur} role="radio" aria-checked={couleur === n.valeur} aria-label={tr(n.nom)} title={tr(n.nom)} onClick={() => onCouleur(n.valeur)}
                className={`h-8 w-8 rounded-full border-2 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A74E] ${couleur === n.valeur ? "border-[#2A2420] scale-110" : "border-white shadow-[0_0_0_1px_#DCCFB5]"}`}
                style={{ background: n.valeur }} />
            ))}
          </div>
          {memes > 1 && couleur && <button className="mt-2 text-xs underline text-[#5A4B2E]" onClick={() => onCouleurTous(couleur)}>{tr("Appliquer cette couleur aux {n} « {nom} »", { n: memes, nom: d.surDevis ? l.nom : nom })}</button>}
        </div>
      )}
      {estTable && creation.centres.actif && (
        <div>
          <div className="text-xs font-medium mb-1.5">{tr("Couleur des centres de table")}</div>
          <div className="flex flex-wrap gap-1.5">
            {NUANCIER.slice(0, 9).map((n) => (
              <button key={n.valeur} aria-label={tr("Centres de table {couleur}", { couleur: tr(n.nom) })} title={tr(n.nom)} onClick={() => onCentresCouleur(n.valeur)}
                className={`h-7 w-7 rounded-full border-2 ${(creation.centres.couleur ?? palette(creation.reglages.ambiance).fleurs) === n.valeur ? "border-[#2A2420]" : "border-white shadow-[0_0_0_1px_#DCCFB5]"}`} style={{ background: n.valeur }} />
            ))}
          </div>
        </div>
      )}

      <div className="hidden lg:block">
        <div className="text-xs font-medium mb-1.5">{tr("Déplacer")}</div>
        <div className="flex flex-wrap items-center gap-2">
          <Bouton variante={enDeplacement ? "principal" : "secondaire"} onClick={onDeplacer} aria-pressed={enDeplacement}>{enDeplacement ? tr("Touchez la nouvelle place…") : tr("Choisir une nouvelle place")}</Bouton>
          <div className="grid grid-cols-2 gap-1" aria-label={tr("Déplacer d'une case")}>
            <button className="h-9 w-9 rounded-lg border border-[#E3D6BA] bg-white hover:bg-[#F6EEDC]" aria-label={tr("Vers le fond, à gauche")} onClick={() => onPas(-1, 0)}>↖</button>
            <button className="h-9 w-9 rounded-lg border border-[#E3D6BA] bg-white hover:bg-[#F6EEDC]" aria-label={tr("Vers le fond, à droite")} onClick={() => onPas(0, -1)}>↗</button>
            <button className="h-9 w-9 rounded-lg border border-[#E3D6BA] bg-white hover:bg-[#F6EEDC]" aria-label={tr("Vers l'avant, à gauche")} onClick={() => onPas(0, 1)}>↙</button>
            <button className="h-9 w-9 rounded-lg border border-[#E3D6BA] bg-white hover:bg-[#F6EEDC]" aria-label={tr("Vers l'avant, à droite")} onClick={() => onPas(1, 0)}>↘</button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {d.w !== d.h && <Bouton variante="secondaire" onClick={onTourner}>{tr("Tourner")}</Bouton>}
        <Bouton variante="secondaire" onClick={onDupliquer}>{tr("Dupliquer")}</Bouton>
        <Bouton variante="danger" onClick={onSupprimer}>{tr("Supprimer")}</Bouton>
      </div>
      <p className="text-[11px] text-[#6B6155]">{tr("Astuce : faites glisser l'élément directement sur la scène (souris ou doigt). Au clavier : flèches pour déplacer, Suppr pour retirer, Échap pour désélectionner.")}</p>
    </section>
  );
}

/** Nom d'un élément sur mesure : enregistré pendant la saisie (après une courte pause) et en quittant le champ. */
function ChampNom({ valeur, onNom }: { valeur: string; onNom: (nom: string) => void }) {
  const [texte, setTexte] = useState(valeur);
  const minuteur = useRef<number>();
  const champ = useRef<HTMLInputElement>(null);
  const valider = (t = texte) => { window.clearTimeout(minuteur.current); if (t.trim() !== valeur.trim()) onNom(t.trim().slice(0, NOM_MAX)); };
  // Nouvel objet sans nom : le champ est prêt à être rempli
  useEffect(() => { if (!valeur) champ.current?.focus({ preventScroll: true }); return () => window.clearTimeout(minuteur.current); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <label className="block">
      <span className="text-xs font-medium">{tr("Nom de votre idée")}</span>
      <input ref={champ} value={texte} maxLength={NOM_MAX} data-testid="nom-sur-mesure"
        onChange={(e) => { const t = e.target.value; setTexte(t); window.clearTimeout(minuteur.current); minuteur.current = window.setTimeout(() => valider(t), 700); }}
        onBlur={() => valider()} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); valider(); (e.target as HTMLInputElement).blur(); } }}
        placeholder={tr("Ex. calèche, feu d'artifice, coin enfants…")}
        className="mt-1 w-full rounded-xl border border-[#E3D6BA] bg-[#FFFDF8] px-3 min-h-11 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A74E]" />
    </label>
  );
}

// ── Budget ──────────────────────────────────────────────────────────────────
export function JaugeBudget({ creation, onAjuster }: { creation: Creation; onAjuster: () => void }) {
  const b = calculerBudget(creation);
  const ratio = b.budget > 0 ? b.total / b.budget : 0;
  const couleur = ratio > 1 ? "#B5473E" : ratio > 0.9 ? "#C98A2E" : "#7C9A5C";
  return (
    <section aria-label={tr("Budget")} className="rounded-2xl border border-[#EADFC8] bg-white p-4">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-serif text-base">{tr("Budget")}</h3>
        <div className="text-sm"><span className="font-semibold" data-testid="estimation">{format(b.total)}</span> <span className="text-[#6B6155]">/ {format(b.budget)}</span></div>
      </div>
      <div className="mt-2 h-3 rounded-full bg-[#F1E8D8] overflow-hidden" role="meter" aria-valuemin={0} aria-valuemax={b.budget} aria-valuenow={Math.round(b.total)} aria-label={tr("Estimation par rapport au budget")}>
        <div className="h-full rounded-full motion-safe:transition-all motion-safe:duration-500" style={{ width: `${Math.min(100, ratio * 100)}%`, background: couleur }} />
      </div>
      <div aria-live="polite" className="mt-2 text-xs">
        {b.depassement > 0 ? (
          <div className="rounded-lg bg-[#FBEDEB] border border-[#EFC9C4] text-[#8A2E26] p-2" data-testid="depassement">
            {tr("Votre création dépasse le budget de")} <b>{format(b.depassement)}</b>. {tr("Vous pouvez retirer ou remplacer un élément, ou")} <button className="underline font-medium" onClick={onAjuster}>{tr("ajuster votre budget")}</button>.
          </div>
        ) : (
          <div className="text-[#4F6B3A]">{tr("Il vous reste {montant} sur votre budget.", { montant: format(b.reste) })}</div>
        )}
      </div>
      {b.total > 0 && <div className="mt-2 text-[11px] text-[#6B6155]">{tr("Dont {fixe} de coûts fixes et {invites} liés au nombre d'invités.", { fixe: format(b.totalFixe), invites: format(b.totalParInvite) })}</div>}
      <p className="mt-1 text-[11px] text-[#6B6155] italic">{mentionEstimation()}</p>
    </section>
  );
}

// ── Missions ────────────────────────────────────────────────────────────────
export function Missions({ missions, celebre }: { missions: EtatMission[]; celebre?: string | null }) {
  const faites = missions.filter((m) => m.ok).length;
  return (
    <section aria-label={tr("Missions")} className="rounded-2xl border border-[#EADFC8] bg-white p-4">
      <div className="flex items-baseline justify-between">
        <h3 className="font-serif text-base">{tr("Missions")}</h3>
        <span className="text-xs text-[#6B6155]">{faites} / {missions.length}</span>
      </div>
      <ol className="mt-2 space-y-2">
        {missions.map((m) => (
          <li key={m.id} data-mission={m.id} data-ok={m.ok} className={`flex gap-2.5 rounded-xl p-2 transition-colors ${m.ok ? "bg-[#F1F6EC]" : "bg-[#FBF8F1]"} ${celebre === m.id ? "motion-safe:animate-[pulse_0.6s_ease-in-out_2]" : ""}`}>
            <span aria-hidden className={`mt-0.5 h-6 w-6 shrink-0 rounded-full grid place-items-center text-xs font-bold ${m.ok ? "bg-[#7C9A5C] text-white" : "border-2 border-[#D9C9A5] text-transparent"} ${celebre === m.id ? "motion-safe:scale-125 motion-safe:transition-transform" : ""}`}>✓</span>
            <div>
              <div className="text-sm font-medium">{m.titre}<span className="sr-only">{m.ok ? tr(" : accomplie") : tr(" : à faire")}</span></div>
              <div className="text-xs text-[#6B6155]">{m.aide}</div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Résumé compact budget + missions, au-dessus de la scène (ordinateur) : on garde le catalogue en haut de la colonne de droite. */
export function BarreSuivi({ creation, missions }: { creation: Creation; missions: EtatMission[] }) {
  const b = calculerBudget(creation);
  const ratio = b.budget > 0 ? b.total / b.budget : 0;
  const couleur = ratio > 1 ? "#B5473E" : ratio > 0.9 ? "#C98A2E" : "#7C9A5C";
  return (
    <div className="hidden lg:flex items-center gap-4 rounded-2xl border border-[#EADFC8] bg-white px-4 py-2.5" data-testid="barre-suivi">
      <div className="min-w-[220px]">
        <div className="flex items-baseline justify-between text-xs"><span className="font-medium">{tr("Budget")}</span><span><b>{format(b.total)}</b> <span className="text-[#6B6155]">/ {format(b.budget)}</span></span></div>
        <div className="mt-1 h-2 rounded-full bg-[#F1E8D8] overflow-hidden"><div className="h-full rounded-full motion-safe:transition-all motion-safe:duration-500" style={{ width: `${Math.min(100, ratio * 100)}%`, background: couleur }} /></div>
      </div>
      <ul className="flex flex-1 flex-wrap items-center gap-1.5 justify-end" aria-label={tr("Missions")}>
        {missions.map((m) => (
          <li key={m.id} title={m.aide} className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] max-w-[230px] ${m.ok ? "border-[#BFD3A8] bg-[#EFF5E6] text-[#3F5A2C]" : "border-[#EADFC8] bg-[#FFFDF8] text-[#5E554A]"}`}>
            <span aria-hidden>{m.ok ? "✓" : "○"}</span><span className="truncate">{m.titre}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
