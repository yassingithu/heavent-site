import { useEffect, useRef, useState } from "react";
import { ouverturesBoutique, FORMULES, formuleDe, prixDe, type OuvertureDef } from "@/lib/invitation";

interface Props {
  /** Carte déjà dans la commande (repérée dans la grille). */
  dansCommande?: string | null;
  onOuvrir: (id: string) => void;
}


/** Vignette d'une carte : affiche, film qui se lance au survol (souris seulement), formule et prix. */
function Fiche({ o, rang, dedans, onOuvrir, i }: { o: OuvertureDef; rang: number; dedans: boolean; onOuvrir: (id: string) => void; i: number }) {
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
    <li className="boutique-carte" style={{ "--i": Math.min(i, 6) } as React.CSSProperties}>
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

/** Catalogue de la boutique de cartes : trois rayons (Classique, Interactive, Prestige), tout se voit en descendant. */
export default function BoutiqueCartes({ dansCommande, onOuvrir }: Props) {
  const cartes = ouverturesBoutique();
  const aller = (id: string) => { const el = document.getElementById(`rayon-${id}`); if (el) el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }); };
  return (
    <div className="boutique" data-testid="boutique">
      <div className="boutique-barre">
        <div className="cartes-formules" role="group" aria-label="Aller à une formule">
          {FORMULES.map((f) => {
            const n = cartes.filter((o) => formuleDe(o) === f.id).length;
            return n ? <button key={f.id} type="button" onClick={() => aller(f.id)} data-testid={`formule-${f.id}`}><small>{f.nom}</small><b>{f.prix}</b></button> : null;
          })}
        </div>
      </div>
      {FORMULES.map((f) => {
        const liste = cartes.filter((o) => formuleDe(o) === f.id);
        if (!liste.length) return null;
        return (
          <section key={f.id} id={`rayon-${f.id}`} className="boutique-rayon" aria-labelledby={`rayon-titre-${f.id}`}>
            <header className="boutique-rayon-tete">
              <h3 id={`rayon-titre-${f.id}`}>{f.nom}<span> · {f.prix}</span></h3>
              <p>{f.texte}{f.id === "prestige" ? " 650 DH, ou 750 DH pour les paysages animés." : ""}</p>
            </header>
            <ul className="boutique-grille vu" aria-label={`Cartes ${f.nom}`}>
              {liste.map((o, i) => <Fiche key={o.id} o={o} i={i} rang={cartes.findIndex((x) => x.id === o.id) + 1} dedans={dansCommande === o.id} onOuvrir={onOuvrir} />)}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
