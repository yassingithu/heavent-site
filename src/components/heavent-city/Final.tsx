import { useEffect, useRef, useState } from "react";
import { Download, Pencil, RotateCcw, Share2, Sparkles, Send, Loader2 } from "lucide-react";
import { resume, rendu, type Choix } from "./etat";
import { SceneSvg, type EtapeFinal } from "./Scene";
import { creerCarte, partagerOuTelecharger } from "./carte";
import { Pastille, btnContour, btnOr } from "./ui";
import { useReducedMotion } from "framer-motion";

/** Le grand final : les lumières s'allument, les invités arrivent, les zones s'animent, puis le bilan */
export default function Final({ choix, logos, onModifier, onDemande, onRecommencer }: {
  choix: Choix; logos: { nawar: string; heavent: string }; onModifier: () => void; onDemande: () => void; onRecommencer: () => void;
}) {
  const reduit = !!useReducedMotion();
  const r = rendu(choix)!;
  const res = resume(choix);
  const [etape, setEtape] = useState<EtapeFinal>("avant");
  const [titre, setTitre] = useState(false);
  const [bilan, setBilan] = useState(false);
  const [essai, setEssai] = useState(0);
  const blobRef = useRef<Blob | null>(null);
  const [apercu, setApercu] = useState<string | null>(null);
  const [carteMsg, setCarteMsg] = useState("");
  const [carteEnCours, setCarteEnCours] = useState(false);

  useEffect(() => {
    setEtape("avant"); setTitre(false); setBilan(false);
    const t: number[] = [];
    const d = reduit ? 0 : 1;
    t.push(window.setTimeout(() => setEtape("arrive"), 700 * d + 30));
    t.push(window.setTimeout(() => setEtape("assis"), 4200 * d + 60));
    t.push(window.setTimeout(() => setTitre(true), 4600 * d + 90));
    t.push(window.setTimeout(() => setBilan(true), 7600 * d + 120));
    return () => t.forEach(window.clearTimeout);
  }, [essai, reduit]);

  // La carte visuelle se prépare en arrière-plan une fois le bilan affiché
  useEffect(() => {
    if (!bilan) return;
    let vivant = true; let url: string | null = null;
    creerCarte(choix, logos).then((b) => { if (!vivant) return; blobRef.current = b; url = URL.createObjectURL(b); setApercu(url); }).catch(() => { if (vivant) setCarteMsg("La carte n'a pas pu être préparée sur cet appareil."); });
    return () => { vivant = false; if (url) URL.revokeObjectURL(url); };
  }, [bilan, choix, logos]);

  const partager = async () => {
    setCarteEnCours(true); setCarteMsg("");
    try {
      const b = blobRef.current ?? await creerCarte(choix, logos);
      blobRef.current = b;
      const s = await partagerOuTelecharger(b, res.titre);
      setCarteMsg(s === "telecharge" ? "Ta carte est téléchargée." : "");
    } catch { setCarteMsg("Impossible de créer la carte sur cet appareil."); }
    setCarteEnCours(false);
  };

  const lignes = [...res.decors, ...res.experiences];
  return (
    <div className="absolute inset-0 overflow-hidden bg-black" data-testid="final">
      <div className={`absolute inset-0 overflow-hidden ${bilan ? "lg:right-[420px]" : ""}`}>
        <SceneSvg r={r} nuit={1} final={etape} logos={logos} animer={!reduit} />
      </div>
      {/* bandes de cinéma */}
      <div className={`pointer-events-none absolute inset-x-0 top-0 bg-black transition-all duration-1000 ${bilan ? "h-0" : "h-[9vh]"}`} />
      <div className={`pointer-events-none absolute inset-x-0 bottom-0 bg-black transition-all duration-1000 ${bilan ? "h-0" : "h-[9vh]"}`} />
      {!bilan && (
        <div className="pointer-events-none absolute inset-x-0 bottom-[12vh] flex justify-center px-4 text-center">
          {titre
            ? <div className="hc-fondu"><p className="text-[12px] uppercase tracking-[0.3em] text-[#E4D49A]">{res.type}</p><h2 className="mt-1 font-serif text-4xl leading-tight text-[#F6EFDD] drop-shadow-[0_2px_12px_rgba(0,0,0,.9)] sm:text-5xl" data-testid="final-titre">{res.titre}</h2></div>
            : <p className="font-serif text-xl text-[#F6EFDD] drop-shadow">Les portes s'ouvrent…</p>}
        </div>
      )}
      {!bilan && <button onClick={() => { setEtape("assis"); setTitre(true); setBilan(true); }} className="absolute right-3 top-[11vh] rounded-full bg-black/50 px-3 min-h-10 text-[13px] text-[#F0E8D6]" data-testid="passer-final">Passer l'animation</button>}

      {bilan && (
        <aside className="absolute inset-x-0 bottom-0 top-[36dvh] overflow-y-auto rounded-t-3xl border-t border-white/15 bg-[#17141a]/97 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-2xl lg:inset-y-0 lg:left-auto lg:right-0 lg:top-0 lg:w-[420px] lg:rounded-none lg:border-l lg:border-t-0" aria-label="Bilan de ton événement" data-testid="bilan">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#E4D49A]">{res.type} · {res.lieu}</p>
          <h2 className="mt-1 font-serif text-3xl leading-tight text-[#F6EFDD]">{res.titre}</h2>
          <p className="mt-1 text-[14px] text-[#D9D0BC]">Style {res.style.toLowerCase()} · {res.palette.toLowerCase()} · environ {res.invites} invités</p>
          {res.badges.length > 0 && <div className="mt-3 flex flex-wrap gap-2">{res.badges.map((b) => <span key={b} className="inline-flex items-center gap-1.5 rounded-full border border-[#C9A74E]/60 bg-[#C9A74E]/10 px-3 py-1 text-[12.5px] text-[#F6EFDD]"><Sparkles className="h-3.5 w-3.5 text-[#E4D49A]" />{b}</span>)}</div>}

          <div className="mt-4 grid gap-1.5 text-[14px] text-[#F0E8D6]">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#E4D49A]">Tes envies</p>
            {[res.lumiere && `Lumière : ${res.lumiere}`, res.musique && `Musique : ${res.musique}`, res.accueil && `Accueil : ${res.accueil}`].filter(Boolean).map((t) => <p key={String(t)}>{t}</p>)}
            {lignes.map((l) => <p key={l.nom} className="flex items-center justify-between gap-2"><span>{l.nom}</span><Pastille reservable={l.reservable} court /></p>)}
            {lignes.length === 0 && <p className="text-[#B9B09C]">Aucune option choisie : une scène sobre, que l'équipe peut enrichir avec toi.</p>}
            {res.missions.length > 0 && <p className="mt-1 text-[#D9D0BC]">Missions : {res.missions.map((m) => `${m.titre} → ${m.reponse}`).join(" · ")}</p>}
          </div>

          {apercu
            ? <img src={apercu} alt={`Carte de ${res.titre}, prête à partager`} className="mt-4 w-full rounded-2xl border border-[#C9A74E]/40" data-testid="carte-apercu" />
            : <div className="mt-4 flex h-24 items-center justify-center rounded-2xl border border-dashed border-white/15 text-[13px] text-[#B9B09C]"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Ta carte se prépare…</div>}
          <p className="mt-1.5 text-[11.5px] text-[#8f8777]">La carte ne contient aucun contact ni aucune conversation.</p>
          {carteMsg && <p role="status" className="mt-1 text-[13px] text-[#E4D49A]">{carteMsg}</p>}

          <div className="mt-4 grid gap-2.5">
            <button onClick={onDemande} className={`${btnOr} min-h-12 text-base`} data-testid="confier">Confier mon projet à Heavent<Send className="h-4 w-4" /></button>
            <div className="grid grid-cols-2 gap-2.5">
              <button onClick={partager} disabled={carteEnCours} className={btnContour} data-testid="partager">{carteEnCours ? <Loader2 className="h-4 w-4 animate-spin" /> : typeof navigator !== "undefined" && "share" in navigator ? <Share2 className="h-4 w-4" /> : <Download className="h-4 w-4" />}Ma carte</button>
              <button onClick={onModifier} className={btnContour} data-testid="modifier"><Pencil className="h-4 w-4" />Modifier</button>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button onClick={() => setEssai((n) => n + 1)} className={btnContour}>Rejouer l'ouverture</button>
              <button onClick={onRecommencer} className={btnContour} data-testid="recommencer"><RotateCcw className="h-4 w-4" />Recommencer</button>
            </div>
          </div>
          <p className="mt-4 text-[12px] leading-snug text-[#8f8777]">Heavent City est une inspiration : les lieux sont des ambiances, pas des réservations. Aucun prix n'est affiché — l'équipe établit ton devis et tu reçois ton prix final dès sa validation.</p>
        </aside>
      )}
    </div>
  );
}
