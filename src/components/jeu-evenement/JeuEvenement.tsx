/**
 * « Crée ton événement de rêve » — composant principal, intégrable dans n'importe quelle page :
 *   import JeuEvenement from "@/components/jeu-evenement/JeuEvenement";
 *   <JeuEvenement />
 */
import { KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TypeElement, libelle, TYPES_EVENEMENT } from "./config";
import {
  Creation, Reglages, Sauvegarde, calculerBudget, effacerSauvegarde, emprise, evaluerMissions, lireSauvegarde, nouvelId, nouvelleCreation,
  placeLibre, proposerDisposition, reglagesParDefaut, sauvegarder, tailleGrille, trouverPlace,
} from "./logique";
import Scene, { ModeScene } from "./Scene";
import { Accueil, Personnalisation } from "./Ecrans";
import { Catalogue, JaugeBudget, Missions, PanneauSelection } from "./Panneaux";
import { FenetreDevis, FenetreTelechargement, Recapitulatif } from "./Fin";
import { Bouton, Confettis } from "./ui";
import { chargerTarifs } from "./tarifs";

type Etape = "accueil" | "reglages" | "jeu" | "recap";

export default function JeuEvenement() {
  const [sauvegarde, setSauvegarde] = useState<Sauvegarde | null>(() => lireSauvegarde());
  const [etape, setEtape] = useState<Etape>("accueil");
  const [creation, setCreation] = useState<Creation>(() => nouvelleCreation());
  const [historique, setHistorique] = useState<Creation[]>([]);
  const [selection, setSelection] = useState<string | null>(null);
  const [mode, setMode] = useState<ModeScene>(null);
  const [annonce, setAnnonce] = useState("");
  const [celebre, setCelebre] = useState<string | null>(null);
  const [fete, setFete] = useState(false);
  const [confirmerReset, setConfirmerReset] = useState(false);
  const [telechargement, setTelechargement] = useState(false);
  const [devis, setDevis] = useState(false);
  const [zoom, setZoom] = useState(1);
  const svgRecap = useRef<SVGSVGElement | null>(null);
  const zoneScene = useRef<HTMLDivElement>(null);
  /** Sur petit écran, le catalogue est sous la scène : on y remonte pour choisir la place. */
  const montrerScene = () => {
    const z = zoneScene.current; if (!z) return;
    const r = z.getBoundingClientRect();
    if (r.top < 60 || r.bottom > window.innerHeight) z.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
  };
  const haut = useRef<HTMLDivElement>(null);

  // La grille s'agrandit avec le nombre d'invités, sans jamais couper un élément déjà posé.
  const { cols, rows } = useMemo(() => {
    const g = tailleGrille(creation.reglages.invites);
    creation.elements.forEach((e) => { const { w, h } = emprise(e); g.cols = Math.max(g.cols, e.x + w); g.rows = Math.max(g.rows, e.y + h); });
    return g;
  }, [creation]);

  const missions = useMemo(() => evaluerMissions(creation), [creation]);
  const budget = useMemo(() => calculerBudget(creation), [creation]);

  // Prix du catalogue interne (Admin → Devis → Catalogue de prix) : on recalcule dès qu'ils arrivent
  useEffect(() => { chargerTarifs().then((n) => { if (n) setCreation((c) => ({ ...c })); }); }, []);

  // Sauvegarde automatique (aucune coordonnée personnelle)
  useEffect(() => { if (etape === "jeu" || etape === "recap") sauvegarder({ creation, etape }); }, [creation, etape]);

  // Mission accomplie → petite animation ; les 3 dans le budget → célébration
  const precedentes = useRef<Record<string, boolean>>({});
  useEffect(() => {
    if (etape !== "jeu") { precedentes.current = Object.fromEntries(missions.map((m) => [m.id, m.ok])); return; }
    const nouvelle = missions.find((m) => m.ok && precedentes.current[m.id] === false);
    precedentes.current = Object.fromEntries(missions.map((m) => [m.id, m.ok]));
    if (nouvelle) {
      setCelebre(nouvelle.id); setAnnonce(`Mission accomplie : ${nouvelle.titre}`);
      const t = setTimeout(() => setCelebre(null), 1400);
      return () => clearTimeout(t);
    }
  }, [missions, etape]);
  const toutReussi = missions.every((m) => m.ok) && budget.depassement === 0;
  const dejaFete = useRef(false);
  useEffect(() => {
    if (etape === "jeu" && toutReussi && !dejaFete.current) { dejaFete.current = true; setFete(true); setAnnonce("Bravo, les trois missions sont remplies dans votre budget !"); setTimeout(() => setFete(false), 3000); }
    if (!toutReussi) dejaFete.current = false;
  }, [toutReussi, etape]);

  const dire = (t: string) => { setAnnonce(""); setTimeout(() => setAnnonce(t), 10); };

  /** Toute modification passe ici pour pouvoir être annulée. */
  const modifier = useCallback((fn: (c: Creation) => Creation) => {
    setCreation((c) => { setHistorique((h) => [...h.slice(-49), c]); return fn(c); });
  }, []);
  const annuler = () => {
    setHistorique((h) => {
      if (!h.length) return h;
      setCreation(h[h.length - 1]); setSelection(null); setMode(null); dire("Dernière action annulée.");
      return h.slice(0, -1);
    });
  };

  // ── Actions sur la scène ──────────────────────────────────────────────────
  const placer = (type: TypeElement, x: number, y: number) => {
    const uid = nouvelId();
    modifier((c) => ({ ...c, elements: [...c.elements, { uid, type, x, y }] }));
    setMode(null); setSelection(uid); dire(`${libelle(type, creation.reglages.type).nom} ajouté(e) à la scène.`);
  };
  const placerAuto = (type: TypeElement) => {
    const p = trouverPlace(creation.elements, type, cols, rows) ?? trouverPlace(creation.elements, type, cols, rows, undefined, true);
    if (!p) { dire("Plus de place libre pour cet élément : retirez ou déplacez un autre élément."); return; }
    const tourne = !placeLibre(creation.elements, { type, ...p }, cols, rows);
    const uid = nouvelId();
    modifier((c) => ({ ...c, elements: [...c.elements, { uid, type, x: p.x, y: p.y, tourne }] }));
    setMode(null); setSelection(uid); dire(`${libelle(type, creation.reglages.type).nom} ajouté(e) à la scène.`);
  };
  const deplacer = (uid: string, x: number, y: number) => {
    modifier((c) => ({ ...c, elements: c.elements.map((e) => (e.uid === uid ? { ...e, x, y } : e)) }));
    setMode(null); setSelection(uid);
  };
  const pas = (dx: number, dy: number) => {
    const e = creation.elements.find((x) => x.uid === selection); if (!e) return;
    const cand = { ...e, x: e.x + dx, y: e.y + dy };
    if (placeLibre(creation.elements, cand, cols, rows, e.uid)) deplacer(e.uid, cand.x, cand.y); else dire("Cette place est occupée ou hors de la scène.");
  };
  const tourner = () => {
    const e = creation.elements.find((x) => x.uid === selection); if (!e) return;
    const cand = { ...e, tourne: !e.tourne };
    if (placeLibre(creation.elements, cand, cols, rows, e.uid)) modifier((c) => ({ ...c, elements: c.elements.map((x) => (x.uid === e.uid ? cand : x)) }));
    else dire("Pas assez de place pour tourner cet élément ici : déplacez-le d'abord.");
  };
  const dupliquer = () => {
    const e = creation.elements.find((x) => x.uid === selection); if (!e) return;
    const p = trouverPlace(creation.elements, e.type, cols, rows, { x: e.x + 1, y: e.y + 1 }, e.tourne);
    if (!p) { dire("Plus de place libre pour dupliquer cet élément."); return; }
    const uid = nouvelId();
    modifier((c) => ({ ...c, elements: [...c.elements, { ...e, uid, x: p.x, y: p.y }] }));
    setSelection(uid);
  };
  const supprimer = () => {
    const e = creation.elements.find((x) => x.uid === selection); if (!e) return;
    modifier((c) => ({ ...c, elements: c.elements.filter((x) => x.uid !== e.uid) }));
    setSelection(null); setMode(null); dire(`${libelle(e.type, creation.reglages.type).nom} retiré(e). Vous pouvez annuler.`);
  };
  const couleur = (col: string, tous = false) => {
    const e = creation.elements.find((x) => x.uid === selection); if (!e) return;
    modifier((c) => ({ ...c, elements: c.elements.map((x) => (x.uid === e.uid || (tous && x.type === e.type) ? { ...x, couleur: col } : x)) }));
  };

  const surClavier = (ev: KeyboardEvent<HTMLDivElement>) => {
    const t = ev.target as HTMLElement;
    if (["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName)) return;
    if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === "z") { ev.preventDefault(); annuler(); return; }
    if (ev.key === "Escape") { setMode(null); setSelection(null); return; }
    if (!selection) return;
    const d: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    if (d[ev.key]) { ev.preventDefault(); pas(...d[ev.key]); }
    if (ev.key === "Delete" || ev.key === "Backspace") { ev.preventDefault(); supprimer(); }
  };

  // ── Navigation ────────────────────────────────────────────────────────────
  const aller = (e: Etape) => { setEtape(e); setMode(null); setSelection(null); requestAnimationFrame(() => haut.current?.scrollIntoView({ behavior: "smooth", block: "start" })); };
  const commencer = () => { effacerSauvegarde(); setSauvegarde(null); setCreation(nouvelleCreation(reglagesParDefaut())); setHistorique([]); aller("reglages"); };
  const reprendre = () => { if (!sauvegarde) return; setCreation(sauvegarde.creation); setHistorique([]); aller(sauvegarde.etape); };
  const reinitialiser = () => {
    modifier((c) => ({ ...c, elements: [], centres: { actif: false } }));
    setConfirmerReset(false); setSelection(null); dire("La scène a été vidée. Vous pouvez annuler.");
  };
  const proposer = () => {
    const p = proposerDisposition(creation.reglages);
    modifier(() => p); setSelection(null); setMode(null);
    dire("Voici une disposition adaptée à vos choix : modifiez-la librement.");
  };

  const sel = creation.elements.find((e) => e.uid === selection) ?? null;
  const typeNom = TYPES_EVENEMENT.find((t) => t.id === creation.reglages.type)!.nom;

  return (
    <div ref={haut} className="text-[#2A2420] scroll-mt-24" onKeyDown={surClavier}>
      <div aria-live="polite" className="sr-only" data-testid="annonce">{annonce}</div>
      <Confettis actif={fete} />

      {etape === "accueil" && <Accueil sauvegarde={sauvegarde} onCommencer={commencer} onReprendre={reprendre} />}

      {etape === "reglages" && (
        <Personnalisation reglages={creation.reglages} enCours={creation.elements.length > 0}
          onChange={(r: Reglages) => setCreation((c) => ({ ...c, reglages: r }))}
          onValider={() => aller("jeu")} onRetour={() => aller(creation.elements.length ? "jeu" : "accueil")} />
      )}

      {etape === "jeu" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="uppercase tracking-[0.2em] text-[11px] text-[#8C6D22]">{typeNom} · {creation.reglages.invites} invités</p>
              <h2 className="font-serif text-2xl sm:text-3xl">Composez votre scène</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <Bouton variante="secondaire" onClick={proposer}>Propose-moi une disposition</Bouton>
              <Bouton variante="secondaire" onClick={annuler} disabled={!historique.length} aria-label="Annuler la dernière action">↶ Annuler</Bouton>
              <Bouton variante="discret" onClick={() => setConfirmerReset(true)} disabled={!creation.elements.length && !creation.centres.actif}>Réinitialiser</Bouton>
              <Bouton variante="discret" onClick={() => aller("reglages")}>Mes choix</Bouton>
            </div>
          </div>

          {fete && (
            <div role="status" className="rounded-2xl border border-[#E3C98A] bg-gradient-to-r from-[#FBF3DF] to-[#F8E6E6] px-4 py-3 text-sm motion-safe:animate-in motion-safe:fade-in">
              ✨ <b>Bravo !</b> Vos trois missions sont remplies, dans votre budget. Découvrez votre événement quand vous voulez.
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-4 items-start">
            <div className="space-y-3 min-w-0 scroll-mt-20" ref={zoneScene}>
              {mode && (
                <div className="rounded-2xl bg-[#2A2420] text-[#FBF8F1] px-4 py-2.5 flex flex-wrap items-center gap-2 text-sm" role="status">
                  <span className="flex-1 min-w-[200px]">
                    {mode.type === "placer" ? <>Touchez une zone libre de la scène pour placer « {libelle(mode.element, creation.reglages.type).nom} ».</> : <>Touchez la nouvelle place de l'élément.</>}
                  </span>
                  {mode.type === "placer" && <button className="rounded-full bg-[#C9A74E] text-[#2A2420] px-3 min-h-9 font-medium" onClick={() => placerAuto(mode.element)}>Placer automatiquement</button>}
                  <button className="rounded-full border border-white/40 px-3 min-h-9" onClick={() => setMode(null)}>Annuler</button>
                </div>
              )}
              <div className="relative rounded-[1.75rem] bg-white border border-[#EADFC8] shadow-[0_20px_60px_-35px_rgba(140,109,34,0.5)] overflow-hidden">
                <div className="overflow-auto max-h-[70vh]" data-testid="scene-conteneur">
                  <div style={{ width: `${zoom * 100}%` }}>
                    <Scene creation={creation} cols={cols} rows={rows} selection={selection} mode={mode}
                      onPlacer={placer} onDeplacer={deplacer} onSelection={(u) => { setSelection(u); }} onCaseRefusee={() => dire("Cette zone est occupée ou trop petite : choisissez une zone en vert.")} />
                  </div>
                </div>
                <div className="absolute right-2 bottom-2 flex gap-1">
                  <button className="h-9 w-9 rounded-full bg-white/90 border border-[#E3D6BA] shadow-sm" aria-label="Zoom avant" onClick={() => setZoom((z) => Math.min(2.5, z + 0.5))}>+</button>
                  <button className="h-9 w-9 rounded-full bg-white/90 border border-[#E3D6BA] shadow-sm" aria-label="Zoom arrière" onClick={() => setZoom((z) => Math.max(1, z - 0.5))} disabled={zoom === 1}>−</button>
                </div>
                {!creation.elements.length && !mode && (
                  <div className="absolute inset-x-0 top-3 mx-auto w-fit max-w-[90%] rounded-full bg-white/90 border border-[#EADFC8] px-4 py-1.5 text-xs text-[#5E554A] text-center">
                    Choisissez un élément dans le catalogue, ou laissez-nous « proposer une disposition ».
                  </div>
                )}
              </div>
              {sel && (
                <PanneauSelection creation={creation} element={sel} enDeplacement={mode?.type === "deplacer"}
                  onCouleur={(c) => couleur(c)} onCouleurTous={(c) => couleur(c, true)} onDeplacer={() => { const actif = mode?.type !== "deplacer"; setMode(actif ? { type: "deplacer", uid: sel.uid } : null); if (actif) requestAnimationFrame(montrerScene); }}
                  onPas={pas} onTourner={tourner} onDupliquer={dupliquer} onSupprimer={supprimer} onFermer={() => { setSelection(null); setMode(null); }}
                  onCentresCouleur={(c) => modifier((x) => ({ ...x, centres: { ...x.centres, couleur: c } }))} />
              )}
              <div className="grid sm:grid-cols-2 gap-3 lg:hidden">
                <JaugeBudget creation={creation} onAjuster={() => aller("reglages")} />
                <Missions missions={missions} celebre={celebre} />
              </div>
            </div>

            <aside className="space-y-3 lg:sticky lg:top-20 min-w-0" aria-label="Catalogue et suivi">
              <div className="hidden lg:block space-y-3">
                <JaugeBudget creation={creation} onAjuster={() => aller("reglages")} />
                <Missions missions={missions} celebre={celebre} />
              </div>
              <div className="rounded-2xl border border-[#EADFC8] bg-[#FFFDF8] p-3">
                <h3 className="font-serif text-base mb-2 px-1">Catalogue</h3>
                <Catalogue creation={creation} enPlacement={mode?.type === "placer" ? mode.element : null}
                  onChoisir={(t) => {
                    setSelection(null);
                    const actif = !(mode?.type === "placer" && mode.element === t);
                    setMode(actif ? { type: "placer", element: t } : null);
                    if (actif) requestAnimationFrame(montrerScene);
                  }}
                  onCentres={(actif) => modifier((c) => ({ ...c, centres: { ...c.centres, actif } }))} />
              </div>
            </aside>
          </div>

          <div className="sticky bottom-3 z-10 flex justify-center">
            <Bouton onClick={() => aller("recap")} className="px-6 shadow-lg">Découvrir mon événement</Bouton>
          </div>
        </div>
      )}

      {etape === "recap" && (
        <Recapitulatif creation={creation} cols={cols} rows={rows} onModifier={() => aller("jeu")}
          onTelecharger={(svg) => { svgRecap.current = svg; setTelechargement(true); }} onDevis={() => setDevis(true)} />
      )}

      <FenetreTelechargement ouvert={telechargement} onFermer={() => setTelechargement(false)} creation={creation} svg={svgRecap} />
      <FenetreDevis ouvert={devis} onFermer={() => setDevis(false)} creation={creation} />

      <Dialog open={confirmerReset} onOpenChange={setConfirmerReset}>
        <DialogContent className="max-w-md bg-[#FBF8F1]">
          <DialogHeader>
            <DialogTitle className="font-serif">Réinitialiser la scène ?</DialogTitle>
            <DialogDescription>Tous les éléments placés seront retirés. Vos choix (type, invités, budget, lieu, ambiance) sont conservés, et vous pourrez annuler juste après.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Bouton variante="discret" onClick={() => setConfirmerReset(false)}>Garder ma scène</Bouton>
            <Bouton variante="danger" onClick={reinitialiser}>Oui, tout retirer</Bouton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
