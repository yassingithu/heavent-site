import { useEffect, useMemo, useRef, useState } from "react";
import { OUVERTURES, FORMULES, STYLES_OUVERTURE, formuleDe, prixDe, prixNombre, type OuvertureDef, type Formule } from "@/lib/invitation";

interface Props {
  /** Carte déjà dans la commande (repérée dans la grille). */
  dansCommande?: string | null;
  onOuvrir: (id: string) => void;
}

const TRIS = [
  { id: "selection", nom: "Notre sélection" },
  { id: "prix-asc", nom: "Prix croissant" },
  { id: "prix-desc", nom: "Prix décroissant" },
] as const;
type Tri = (typeof TRIS)[number]["id"];
const PAGE = 8;

/** Vignette d'une carte : affiche, film qui se lance au survol (souris seulement), formule et prix. */
function Fiche({ o, rang, dedans, onOuvrir, i, marquer }: { o: OuvertureDef; rang: number; dedans: boolean; onOuvrir: (id: string) => void; i: number; marquer: boolean }) {
  const [film, setFilm] = useState(false);
  const minuteur = useRef<number>();
  const f = formuleDe(o);
  const survol = () => {
    if (!o.video || matchMedia("(hover: none)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    window.clearTimeout(minuteur.current); minuteur.current = window.setTimeout(() => setFilm(true), 220);
  };
  const quitte = () => { window.clearTimeout(minuteur.current); setFilm(false); };
  useEffect(() => () => window.clearTimeout(minuteur.current), []);
  return (
    <li className="boutique-carte" style={{ "--i": Math.min(i, 8) } as React.CSSProperties}>
      <button type="button" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); const st = document.documentElement.style; st.setProperty("--fiche-x", `${r.left + r.width / 2}px`); st.setProperty("--fiche-y", `${r.top + r.height / 2}px`); onOuvrir(o.id); }} onPointerEnter={survol} onPointerLeave={quitte} onFocus={survol} onBlur={quitte} data-testid={`ouverture-${o.id}`} aria-label={`${o.nom}, formule ${FORMULES.find((x) => x.id === f)?.nom}, ${prixDe(o)}. Voir la carte`}>
        <span className="boutique-cadre" aria-hidden="true">
          {o.id === "enveloppe"
            ? <span className="boutique-vide" style={{ background: "#141414" }}><span className="boutique-monogramme">A &amp; B</span></span>
            : o.id === "rose-imperiale" && !o.poster
            ? <span className="boutique-vide" style={{ background: "#F3ECDD" }}><span className="boutique-monogramme" style={{ color: "#7A5F1F", border: 0 }}>Rose<br />Impériale</span></span>
            : o.poster
            ? <img src={o.poster} alt="" loading="lazy" decoding="async" />
            : <><span className="boutique-moitie" style={{ backgroundImage: `url(/ouvertures/${o.id}-g.webp)` }} /><span className="boutique-moitie" style={{ backgroundImage: `url(/ouvertures/${o.id}-d.webp)` }} /></>}
          {film && o.video && <video src={o.video} poster={o.poster} muted loop playsInline autoPlay preload="auto" onPlaying={(e) => e.currentTarget.classList.add("joue")} />}
          {marquer && f !== "classique" && <span className={`boutique-badge boutique-badge-${f}`}>{FORMULES.find((x) => x.id === f)?.nom}</span>}
          {dedans && <span className="boutique-dedans">Dans ma commande</span>}
          <span className="boutique-voir">Voir la carte</span>
        </span>
        <span className="boutique-num">Nº {String(rang).padStart(2, "0")}</span>
        <span className="boutique-nom">{o.nom}</span>
        <span className="boutique-ligne"><b>{prixDe(o)}</b>{o.video && <em className="boutique-film">Film</em>}</span>
      </button>
    </li>
  );
}

/** Catalogue de la boutique de cartes : filtres par formule et par style, tri, grille de fiches. */
export default function BoutiqueCartes({ dansCommande, onOuvrir }: Props) {
  const [formule, setFormule] = useState<Formule | null>(null);
  const [style, setStyle] = useState<string | null>(null);
  const [tri, setTri] = useState<Tri>("selection");
  const [toutes, setToutes] = useState(false);
  const sentinelle = useRef<HTMLDivElement>(null);
  const [vu, setVu] = useState(false);
  useEffect(() => {
    const el = sentinelle.current;
    if (!el || typeof IntersectionObserver === "undefined") { setVu(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVu(true); io.disconnect(); } }, { rootMargin: "0px 0px -12% 0px" });
    io.observe(el); return () => io.disconnect();
  }, []);

  const liste = useMemo(() => {
    const l = OUVERTURES.filter((o) => (!style || o.styles.includes(style)) && (!formule || formuleDe(o) === formule));
    if (tri === "prix-asc") return [...l].sort((a, b) => prixNombre(a) - prixNombre(b));
    if (tri === "prix-desc") return [...l].sort((a, b) => prixNombre(b) - prixNombre(a));
    return l;
  }, [formule, style, tri]);
  const filtre = !!(formule || style);
  const visibles = toutes || filtre ? liste : liste.slice(0, PAGE);
  const reste = liste.length - visibles.length;
  const prix = OUVERTURES.map(prixNombre);

  return (
    <div className="boutique" data-testid="boutique">
      <div className="boutique-barre">
        <div className="cartes-formules" role="group" aria-label="Choisir une formule">
          {FORMULES.map((f) => (
            <button key={f.id} type="button" onClick={() => setFormule(formule === f.id ? null : f.id)} aria-pressed={formule === f.id} data-testid={`formule-${f.id}`}>
              <small>{f.nom}</small><b>{f.prix}</b>
            </button>
          ))}
          <p className={formule ? "" : "boutique-aide"}>{formule ? (FORMULES.find((f) => f.id === formule)?.texte ?? "") + (formule === "prestige" ? " 650 DH, ou 750 DH pour les paysages animés." : "") : `Touchez une formule pour voir ses cartes. Le prix dépend de la carte : de ${Math.min(...prix)} à ${Math.max(...prix)} DH.`}</p>
        </div>
        <div className="boutique-outils">
          <div className="boutique-styles" role="group" aria-label="Filtrer par style">
            {[null, ...STYLES_OUVERTURE].map((st) => (
              <button key={st ?? "tous"} type="button" onClick={() => setStyle(st)} aria-pressed={style === st}>{st ?? "Tous les styles"}</button>
            ))}
          </div>
        </div>
        <div className="boutique-rangee">
          <p className="boutique-compte" role="status" aria-live="polite"><span key={`${liste.length}-${formule}-${style}`} className="boutique-maj boutique-maj-inline">{liste.length} carte{liste.length > 1 ? "s" : ""}</span><span className="boutique-compte-suite"> · adaptées à toutes les occasions</span></p>
          <label className="boutique-tri">
            <span>Trier</span>
            <select value={tri} onChange={(e) => setTri(e.target.value as Tri)} data-testid="boutique-tri">
              {TRIS.map((t) => <option key={t.id} value={t.id}>{t.nom}</option>)}
            </select>
          </label>
        </div>
      </div>

      {liste.length === 0 ? (
        <div className="boutique-vide-liste" data-testid="boutique-aucune">
          <p>Aucune carte ne correspond à ce choix.</p>
          <button type="button" className="boutique-lien" onClick={() => { setFormule(null); setStyle(null); }}>Voir toutes les cartes</button>
        </div>
      ) : (
        <><div ref={sentinelle} aria-hidden="true" />
        <ul className={`boutique-grille${vu ? " vu" : ""}`} aria-label="Cartes d'invitation" key={`${formule}|${style}|${tri}`}>
          {visibles.map((o, i) => <Fiche key={o.id} o={o} i={i % PAGE} marquer={!formule} rang={OUVERTURES.findIndex((x) => x.id === o.id) + 1} dedans={dansCommande === o.id} onOuvrir={onOuvrir} />)}
        </ul></>
      )}
      {reste > 0 && <button type="button" onClick={() => setToutes(true)} className="cartes-plus-cartes" data-testid="cartes-voir-plus">Voir les {reste} autres cartes</button>}
    </div>
  );
}
