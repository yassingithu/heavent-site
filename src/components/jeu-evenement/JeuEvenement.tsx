/**
 * « Crée ton événement de rêve » — composant principal, intégrable dans n'importe quelle page :
 *   import JeuEvenement from "@/components/jeu-evenement/JeuEvenement";
 *   <JeuEvenement />
 */
import { KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TypeElement, defElement, libelle, nomTypeEv } from "./config";
import { useTranslation } from "react-i18next";
import { definirLangue, estRtl, tr } from "./langue";
import {
  Creation, Reglages, Sauvegarde, grilleDe, calculerBudget, effacerSauvegarde, emprise, evaluerMissions, lireSauvegarde, nouvelId, nouvelleCreation,
  nomElement, placeLibre, proposerDisposition, reglagesParDefaut, sauvegarder, tailleGrille, trouverPlace,
} from "./logique";
import Scene, { ModeScene } from "./Scene";
import { Accueil, Personnalisation } from "./Ecrans";
import { BarreSuivi, Catalogue, JaugeBudget, Missions, PanneauSelection, Tiroir } from "./Panneaux";
import { FenetreDevis, FenetrePartage, FenetreTelechargement, Recapitulatif, VuePartagee } from "./Fin";
import { creationDansLien, oublierLien } from "./partage";
import { Bouton, Confettis } from "./ui";
import { chargerTarifs } from "./tarifs";

type Etape = "accueil" | "reglages" | "jeu" | "recap" | "partage";

export default function JeuEvenement() {
  // Langue du site (fr / en / ar) : le jeu suit le sélecteur de langue
  const { i18n } = useTranslation();
  definirLangue(i18n.language);
  const lng = i18n.language;
  const [sauvegarde, setSauvegarde] = useState<Sauvegarde | null>(() => lireSauvegarde());
  // Lien partagé (#creation=…) : on montre d'abord la création reçue
  const [partagee] = useState<Creation | null>(() => (typeof window !== "undefined" ? creationDansLien() : null));
  const [etape, setEtape] = useState<Etape>(() => (partagee ? "partage" : "accueil"));
  const [partage, setPartage] = useState(false);
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
  // Téléphone / tablette : « ajout rapide » = un geste pose l'élément au meilleur endroit libre (réglage mémorisé)
  const [ajoutRapide, setAjoutRapideEtat] = useState<boolean>(() => { try { return localStorage.getItem("heavent-jeu-ajout-rapide") !== "non"; } catch { return true; } });
  const setAjoutRapide = (v: boolean) => { setAjoutRapideEtat(v); try { localStorage.setItem("heavent-jeu-ajout-rapide", v ? "oui" : "non"); } catch { /* sans mémoire */ } };
  const [dernierAjout, setDernierAjout] = useState<{ nom: string; n: number } | null>(null);
  // Mode « 2030 » (décor holographique, éléments qui tombent, halos) : activé par défaut, désactivable
  const [futur, setFuturEtat] = useState<boolean>(() => { try { return localStorage.getItem("heavent-jeu-futur") !== "non"; } catch { return true; } });
  const setFutur = (v: boolean) => { setFuturEtat(v); try { localStorage.setItem("heavent-jeu-futur", v ? "oui" : "non"); } catch { /* sans mémoire */ } };
  const fondFutur = useRef<HTMLDivElement>(null);
  /** Parallaxe : le fond bouge doucement à l'opposé du pointeur, la scène reste nette (le placement reste précis). */
  const bougerFond = (ev: React.PointerEvent<HTMLDivElement>) => {
    const f = fondFutur.current; if (!f || ev.pointerType !== "mouse") return;
    const r = ev.currentTarget.getBoundingClientRect();
    f.style.setProperty("--px", String((ev.clientX - r.left) / r.width - 0.5));
    f.style.setProperty("--py", String((ev.clientY - r.top) / r.height - 0.5));
  };
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
    const g = tailleGrille(creation.reglages.invites, creation.reglages.lieu);
    creation.elements.forEach((e) => { const { w, h } = emprise(e); g.cols = Math.max(g.cols, e.x + w); g.rows = Math.max(g.rows, e.y + h); });
    return g;
  }, [creation]);

  const missions = useMemo(() => evaluerMissions(creation), [creation, lng]); // eslint-disable-line react-hooks/exhaustive-deps
  const budget = useMemo(() => calculerBudget(creation), [creation, lng]); // eslint-disable-line react-hooks/exhaustive-deps

  // Prix du catalogue interne (Admin → Devis → Catalogue de prix) : on recalcule dès qu'ils arrivent
  const [tarifs, setTarifs] = useState(0);
  useEffect(() => { chargerTarifs().then((n) => { if (n) { setTarifs(n); setCreation((c) => ({ ...c })); } }); }, []);

  // Sauvegarde automatique (aucune coordonnée personnelle)
  useEffect(() => { if (etape === "jeu" || etape === "recap") sauvegarder({ creation, etape }); }, [creation, etape]);

  // Mission accomplie → petite animation ; les 3 dans le budget → célébration
  const precedentes = useRef<Record<string, boolean>>({});
  useEffect(() => {
    if (etape !== "jeu") { precedentes.current = Object.fromEntries(missions.map((m) => [m.id, m.ok])); return; }
    const nouvelle = missions.find((m) => m.ok && precedentes.current[m.id] === false);
    precedentes.current = Object.fromEntries(missions.map((m) => [m.id, m.ok]));
    if (nouvelle) {
      setCelebre(nouvelle.id); setAnnonce(tr("Mission accomplie : {m}", { m: nouvelle.titre }));
      const t = setTimeout(() => setCelebre(null), 1400);
      return () => clearTimeout(t);
    }
  }, [missions, etape]);
  const toutReussi = missions.every((m) => m.ok) && budget.depassement === 0;
  const dejaFete = useRef(false);
  useEffect(() => {
    if (etape === "jeu" && toutReussi && !dejaFete.current) { dejaFete.current = true; setFete(true); setAnnonce(tr("Bravo, les trois missions sont remplies dans votre budget !")); setTimeout(() => setFete(false), 3000); }
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
      setCreation(h[h.length - 1]); setSelection(null); setMode(null); dire(tr("Dernière action annulée."));
      return h.slice(0, -1);
    });
  };

  // ── Actions sur la scène ──────────────────────────────────────────────────
  const placer = (type: TypeElement, x: number, y: number) => {
    const uid = nouvelId();
    modifier((c) => ({ ...c, elements: [...c.elements, { uid, type, x, y }] }));
    setMode(null); setSelection(uid); dire(tr("{nom} ajouté(e) à la scène.", { nom: libelle(type, creation.reglages.type).nom }));
  };
  const placerAuto = (type: TypeElement) => {
    const p = trouverPlace(creation.elements, type, cols, rows) ?? trouverPlace(creation.elements, type, cols, rows, undefined, true);
    if (!p) { dire(tr("Plus de place libre pour cet élément : retirez ou déplacez un autre élément.")); return; }
    const tourne = !placeLibre(creation.elements, { type, ...p }, cols, rows);
    const uid = nouvelId();
    modifier((c) => ({ ...c, elements: [...c.elements, { uid, type, x: p.x, y: p.y, tourne }] }));
    setMode(null); setSelection(uid); dire(tr("{nom} ajouté(e) à la scène.", { nom: libelle(type, creation.reglages.type).nom }));
  };
  /** Ajout rapide depuis le tiroir : pose l'élément, signale-le et permet d'annuler en un geste. */
  const ajouterRapide = (type: TypeElement) => {
    const avant = creation.elements.length;
    placerAuto(type);
    const nom = libelle(type, creation.reglages.type).nom;
    setDernierAjout({ nom, n: avant + 1 });
  };
  useEffect(() => {
    if (!dernierAjout) return;
    const t = setTimeout(() => setDernierAjout(null), 3500);
    return () => clearTimeout(t);
  }, [dernierAjout]);
  // Le tiroir occupe le bas de l'écran : on masque le bouton WhatsApp flottant pendant le jeu (téléphone)
  useEffect(() => {
    if (etape !== "jeu") return;
    document.body.classList.add("jeu-tiroir");
    return () => document.body.classList.remove("jeu-tiroir");
  }, [etape]);
  const deplacer = (uid: string, x: number, y: number) => {
    modifier((c) => ({ ...c, elements: c.elements.map((e) => (e.uid === uid ? { ...e, x, y } : e)) }));
    setMode(null); setSelection(uid);
  };
  const pas = (dx: number, dy: number) => {
    const e = creation.elements.find((x) => x.uid === selection); if (!e) return;
    const cand = { ...e, x: e.x + dx, y: e.y + dy };
    if (placeLibre(creation.elements, cand, cols, rows, e.uid)) deplacer(e.uid, cand.x, cand.y); else dire(tr("Cette place est occupée ou hors de la scène."));
  };
  const tourner = () => {
    const e = creation.elements.find((x) => x.uid === selection); if (!e) return;
    const cand = { ...e, tourne: !e.tourne };
    if (placeLibre(creation.elements, cand, cols, rows, e.uid)) modifier((c) => ({ ...c, elements: c.elements.map((x) => (x.uid === e.uid ? cand : x)) }));
    else dire(tr("Pas assez de place pour tourner cet élément ici : déplacez-le d'abord."));
  };
  /** Agrandit (+1) ou réduit (−1) l'élément sélectionné, si la place le permet. */
  const agrandir = (delta: number) => {
    const e = creation.elements.find((x) => x.uid === selection); if (!e) return;
    const max = defElement(e.type).etire?.max ?? 0;
    const plus = Math.max(0, Math.min(max, (e.plus ?? 0) + delta));
    if (plus === (e.plus ?? 0)) return;
    const cand = { ...e, plus: plus || undefined };
    const g = grilleDe({ ...creation, elements: creation.elements.map((x) => (x.uid === e.uid ? cand : x)) });
    if (!placeLibre(creation.elements, cand, g.cols, g.rows, e.uid)) { dire(tr("Pas assez de place pour agrandir ici : déplacez les éléments voisins.")); return; }
    modifier((c) => ({ ...c, elements: c.elements.map((x) => (x.uid === e.uid ? cand : x)) }));
  };
  const dupliquer = () => {
    const e = creation.elements.find((x) => x.uid === selection); if (!e) return;
    const p = trouverPlace(creation.elements, e.type, cols, rows, { x: e.x + 1, y: e.y + 1 }, e.tourne, e.plus);
    if (!p) { dire(tr("Plus de place libre pour dupliquer cet élément.")); return; }
    const uid = nouvelId();
    modifier((c) => ({ ...c, elements: [...c.elements, { ...e, uid, x: p.x, y: p.y }] }));
    setSelection(uid);
  };
  const supprimer = () => {
    const e = creation.elements.find((x) => x.uid === selection); if (!e) return;
    modifier((c) => ({ ...c, elements: c.elements.filter((x) => x.uid !== e.uid) }));
    setSelection(null); setMode(null); dire(tr("{nom} retiré(e). Vous pouvez annuler.", { nom: nomElement(e, creation.reglages.type) }));
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
  const reprendrePartagee = () => { if (!partagee) return; oublierLien(); setCreation(partagee); setHistorique([]); aller("jeu"); };
  const reinitialiser = () => {
    modifier((c) => ({ ...c, elements: [], centres: { actif: false } }));
    setConfirmerReset(false); setSelection(null); dire(tr("La scène a été vidée. Vous pouvez annuler."));
  };
  const proposer = () => {
    const p = proposerDisposition(creation.reglages);
    modifier(() => p); setSelection(null); setMode(null);
    dire(tr("Voici une disposition adaptée à vos choix : modifiez-la librement."));
  };

  const sel = creation.elements.find((e) => e.uid === selection) ?? null;
  const typeNom = nomTypeEv(creation.reglages.type);

  return (
    <div ref={haut} className={`text-[#2A2420] scroll-mt-24 ${futur ? "jeu-futur" : ""}`} onKeyDown={surClavier} dir={estRtl() ? "rtl" : "ltr"} lang={lng}>
      <div aria-live="polite" className="sr-only" data-testid="annonce">{annonce}</div>
      <Confettis actif={fete} />

      {etape === "partage" && partagee && (
        <VuePartagee creation={partagee} cols={grilleDe(partagee).cols} rows={grilleDe(partagee).rows} onReprendre={reprendrePartagee} onZero={() => { oublierLien(); commencer(); }} />
      )}

      {etape === "accueil" && <Accueil sauvegarde={sauvegarde} onCommencer={commencer} onReprendre={reprendre} tarifs={tarifs}
        onModele={(c) => { effacerSauvegarde(); setSauvegarde(null); setCreation(c); setHistorique([]); aller("jeu"); }} />}

      {etape === "reglages" && (
        <Personnalisation reglages={creation.reglages} enCours={creation.elements.length > 0}
          onChange={(r: Reglages) => setCreation((c) => ({ ...c, reglages: r }))}
          onValider={() => aller("jeu")} onRetour={() => aller(creation.elements.length ? "jeu" : "accueil")} />
      )}

      {etape === "jeu" && (
        <div className="space-y-4 pb-56 lg:pb-0">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="uppercase tracking-[0.2em] text-[11px] text-[#8C6D22]">{typeNom} · {tr("{n} invités", { n: creation.reglages.invites })}</p>
              <h2 className="font-serif text-2xl sm:text-3xl">{tr("Composez votre scène")}</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <Bouton variante="secondaire" onClick={proposer}>{tr("Propose-moi une disposition")}</Bouton>
              <Bouton variante="secondaire" onClick={annuler} disabled={!historique.length} aria-label={tr("Annuler la dernière action")}>↶ {tr("Annuler")}</Bouton>
              <Bouton variante="discret" onClick={() => setConfirmerReset(true)} disabled={!creation.elements.length && !creation.centres.actif}>{tr("Réinitialiser")}</Bouton>
              <Bouton variante="discret" onClick={() => aller("reglages")}>{tr("Mes choix")}</Bouton>
              <Bouton variante="discret" onClick={() => setFutur(!futur)} aria-pressed={futur} data-testid="effets">✨ {tr("Effets")}</Bouton>
              <Bouton variante="discret" onClick={() => setPartage(true)} disabled={!creation.elements.length}>{tr("Partager")}</Bouton>
            </div>
          </div>

          {fete && (
            <div role="status" className="rounded-2xl border border-[#E3C98A] bg-gradient-to-r from-[#FBF3DF] to-[#F8E6E6] px-4 py-3 text-sm motion-safe:animate-in motion-safe:fade-in">
              ✨ <b>{tr("Bravo !")}</b> {tr("Vos trois missions sont remplies, dans votre budget. Découvrez votre événement quand vous voulez.")}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-4 items-start">
            <div className="space-y-3 min-w-0 scroll-mt-20" ref={zoneScene}>
              {mode && (
                <div className="rounded-2xl bg-[#2A2420] text-[#FBF8F1] px-4 py-2.5 flex flex-wrap items-center gap-2 text-sm" role="status">
                  <span className="flex-1 min-w-[200px]">
                    {mode.type === "placer" ? tr("Touchez une zone libre de la scène pour placer « {nom} ».", { nom: libelle(mode.element, creation.reglages.type).nom }) : tr("Touchez la nouvelle place de l'élément.")}
                  </span>
                  {mode.type === "placer" && <button className="rounded-full bg-[#C9A74E] text-[#2A2420] px-3 min-h-9 font-medium" onClick={() => placerAuto(mode.element)}>{tr("Placer automatiquement")}</button>}
                  <button className="rounded-full border border-white/40 px-3 min-h-9" onClick={() => setMode(null)}>{tr("Annuler")}</button>
                </div>
              )}
              <BarreSuivi creation={creation} missions={missions} />
              <div onPointerMove={futur ? bougerFond : undefined} className={`relative rounded-[1.75rem] border overflow-hidden ${futur ? `bg-[#171310] border-[#5b4a24] shadow-[0_0_0_1px_rgba(228,212,154,0.18),0_30px_80px_-30px_rgba(201,167,78,0.55)] ${celebre ? "jeu-fete-anneau" : ""}` : "bg-white border-[#EADFC8] shadow-[0_20px_60px_-35px_rgba(140,109,34,0.5)]"}`} data-futur={futur ? "oui" : "non"}>
                {futur && <div ref={fondFutur} className="jeu-fond" aria-hidden><span className="jeu-grille" /><span className="jeu-aurore" /></div>}
                <div className="overflow-auto max-h-[max(18rem,min(70vh,calc(100dvh-19rem)))] lg:max-h-[70vh]" data-testid="scene-conteneur">
                  <div style={{ width: `${zoom * 100}%` }}>
                    <Scene creation={creation} cols={cols} rows={rows} selection={selection} mode={mode} futur={futur}
                      onPlacer={placer} onDeplacer={deplacer} onSelection={(u) => { setSelection(u); }} onCaseRefusee={() => dire(tr("Cette zone est occupée ou trop petite : choisissez une zone en vert."))} />
                  </div>
                </div>
                <div className="absolute right-2 top-2 flex gap-1">
                  <button className="h-9 w-9 rounded-full bg-white/90 border border-[#E3D6BA] shadow-sm" aria-label={tr("Zoom avant")} onClick={() => setZoom((z) => Math.min(2.5, z + 0.5))}>+</button>
                  <button className="h-9 w-9 rounded-full bg-white/90 border border-[#E3D6BA] shadow-sm" aria-label={tr("Zoom arrière")} onClick={() => setZoom((z) => Math.max(1, z - 0.5))} disabled={zoom === 1}>−</button>
                </div>
                {sel && !mode && (
                  <div className="lg:hidden border-t border-[#EFE5CF] bg-[#FFFDF8] px-3 py-2.5" data-testid="barre-mobile">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm font-medium truncate">{nomElement(sel, creation.reglages.type)}</div>
                      <button className="text-xs text-[#6B6155] underline shrink-0" onClick={() => setSelection(null)}>{tr("Terminé")}</button>
                    </div>
                    <p className="text-[11px] text-[#6B6155] mb-2">{tr("Faites-la glisser avec le doigt, ou utilisez les flèches.")}</p>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {([["↖", -1, 0, "Vers le fond, à gauche"], ["↗", 0, -1, "Vers le fond, à droite"], ["↙", 0, 1, "Vers l'avant, à gauche"], ["↘", 1, 0, "Vers l'avant, à droite"]] as const).map(([f, dx, dy, nom]) => (
                        <button key={f} className="h-11 w-11 rounded-xl border border-[#E3D6BA] bg-white text-lg active:bg-[#F6EEDC]" aria-label={tr(nom)} onClick={() => pas(dx, dy)}>{f}</button>
                      ))}
                      {defElement(sel.type).etire && (
                        <>
                          <button className="h-11 px-3 rounded-xl border border-[#E3D6BA] bg-white text-sm disabled:opacity-40" aria-label={tr("Réduire")} disabled={!(sel.plus ?? 0)} onClick={() => agrandir(-1)} data-testid="reduire-mobile">− {tr("Réduire")}</button>
                          <button className="h-11 px-3 rounded-xl border border-[#E3D6BA] bg-white text-sm disabled:opacity-40" aria-label={tr("Agrandir")} disabled={(sel.plus ?? 0) >= (defElement(sel.type).etire?.max ?? 0)} onClick={() => agrandir(1)} data-testid="agrandir-mobile">+ {tr("Agrandir")}</button>
                        </>
                      )}
                      {(defElement(sel.type).w !== defElement(sel.type).h || (sel.plus ?? 0) > 0 && emprise(sel).w !== emprise(sel).h) && <button className="h-11 px-3 rounded-xl border border-[#E3D6BA] bg-white text-sm" onClick={tourner}>{tr("Tourner")}</button>}
                      <button className="h-11 px-3 rounded-xl border border-[#E7C3BF] bg-white text-sm text-[#9B2C2C]" onClick={supprimer}>{tr("Supprimer")}</button>
                    </div>
                  </div>
                )}
                {dernierAjout && (
                  <div role="status" className="lg:hidden absolute left-2 top-2 right-24 z-10 flex items-center gap-2 rounded-full bg-[#2A2420]/95 text-white text-xs pl-3 pr-1 py-1 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2" data-testid="toast-ajout">
                    <span className="truncate">✓ {tr("{nom} ajouté(e)", { nom: dernierAjout.nom })}</span>
                    <button className="ml-auto shrink-0 rounded-full bg-white/15 px-3 min-h-8 font-medium" onClick={() => { annuler(); setDernierAjout(null); }}>↶ {tr("Annuler")}</button>
                  </div>
                )}
                {!creation.elements.length && !mode && (
                  <div className="absolute inset-x-0 top-3 mx-auto w-fit max-w-[90%] rounded-full bg-white/90 border border-[#EADFC8] px-4 py-1.5 text-xs text-[#5E554A] text-center">
                    {tr("Choisissez un élément dans le catalogue, ou laissez-nous « proposer une disposition ».")}
                  </div>
                )}
              </div>
              {sel && (
                <PanneauSelection creation={creation} element={sel} enDeplacement={mode?.type === "deplacer"}
                  onCouleur={(c) => couleur(c)} onCouleurTous={(c) => couleur(c, true)} onDeplacer={() => { const actif = mode?.type !== "deplacer"; setMode(actif ? { type: "deplacer", uid: sel.uid } : null); if (actif) requestAnimationFrame(montrerScene); }}
                  onPas={pas} onAgrandir={agrandir} onTourner={tourner} onDupliquer={dupliquer} onSupprimer={supprimer} onFermer={() => { setSelection(null); setMode(null); }}
                  onCentresCouleur={(c) => modifier((x) => ({ ...x, centres: { ...x.centres, couleur: c } }))}
                  onNom={(nom) => modifier((x) => ({ ...x, elements: x.elements.map((e) => (e.uid === sel.uid ? { ...e, nom: nom || undefined } : e)) }))} />
              )}
              <div className="grid sm:grid-cols-2 gap-3 lg:hidden">
                <JaugeBudget creation={creation} onAjuster={() => aller("reglages")} />
                <Missions missions={missions} celebre={celebre} />
              </div>
            </div>

            <aside className="space-y-3 lg:sticky lg:top-20 min-w-0 lg:max-h-[calc(100dvh-6rem)] lg:overflow-y-auto lg:pr-1" aria-label={tr("Catalogue et suivi")}>
              <div className="hidden lg:block rounded-2xl border border-[#EADFC8] bg-[#FFFDF8] p-3">
                <h3 className="font-serif text-base mb-2 px-1">{tr("Catalogue")}</h3>
                <Catalogue creation={creation} enPlacement={mode?.type === "placer" ? mode.element : null}
                  onChoisir={(t) => {
                    setSelection(null);
                    const actif = !(mode?.type === "placer" && mode.element === t);
                    setMode(actif ? { type: "placer", element: t } : null);
                    if (actif) requestAnimationFrame(montrerScene);
                  }}
                  onCentres={(actif) => modifier((c) => ({ ...c, centres: { ...c.centres, actif } }))} />
              </div>
              <div className="hidden lg:block space-y-3">
                <JaugeBudget creation={creation} onAjuster={() => aller("reglages")} />
                <Missions missions={missions} celebre={celebre} />
              </div>
            </aside>
          </div>

          <Tiroir creation={creation} enPlacement={mode?.type === "placer" ? mode.element : null} ajoutRapide={ajoutRapide} onAjoutRapide={setAjoutRapide}
            onAjouter={ajouterRapide} missions={missions} onDecouvrir={() => aller("recap")} onAjuster={() => aller("reglages")}
            onChoisir={(t) => { setSelection(null); const actif = !(mode?.type === "placer" && mode.element === t); setMode(actif ? { type: "placer", element: t } : null); }}
            onCentres={(actif) => modifier((c) => ({ ...c, centres: { ...c.centres, actif } }))} />

          <div className="hidden lg:flex sticky bottom-3 z-10 justify-center">
            <Bouton onClick={() => aller("recap")} className="px-6 shadow-lg">{tr("Découvrir mon événement")}</Bouton>
          </div>
        </div>
      )}

      {etape === "recap" && (
        <Recapitulatif creation={creation} cols={cols} rows={rows} onModifier={() => aller("jeu")}
          onTelecharger={(svg) => { svgRecap.current = svg; setTelechargement(true); }} onDevis={() => setDevis(true)} onPartager={() => setPartage(true)} />
      )}

      <FenetreTelechargement ouvert={telechargement} onFermer={() => setTelechargement(false)} creation={creation} svg={svgRecap} />
      <FenetreDevis ouvert={devis} onFermer={() => setDevis(false)} creation={creation} />
      <FenetrePartage ouvert={partage} onFermer={() => setPartage(false)} creation={creation} />

      <Dialog open={confirmerReset} onOpenChange={setConfirmerReset}>
        <DialogContent className="max-w-md bg-[#FBF8F1]">
          <DialogHeader>
            <DialogTitle className="font-serif">{tr("Réinitialiser la scène ?")}</DialogTitle>
            <DialogDescription>{tr("Tous les éléments placés seront retirés. Vos choix (type, invités, budget, lieu, ambiance) sont conservés, et vous pourrez annuler juste après.")}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Bouton variante="discret" onClick={() => setConfirmerReset(false)}>{tr("Garder ma scène")}</Bouton>
            <Bouton variante="danger" onClick={reinitialiser}>{tr("Oui, tout retirer")}</Bouton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
