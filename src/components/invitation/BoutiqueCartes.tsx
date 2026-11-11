import { useState } from "react";
import { ouverturesBoutique, FORMULES, formuleDe, prixDe, type Formule, type OuvertureDef } from "@/lib/invitation";
import FilmBoucle from "./FilmBoucle";

/** Carte sans film (portes en images) : les deux battants s'ouvrent en boucle sur la carte. */
function Portes({ o }: { o: OuvertureDef }) {
  return (
    <span className="cv-portes" aria-hidden="true">
      {o.carte && <img className="cv-portes-fond" src={o.carte.fin} alt="" loading="lazy" decoding="async" />}
      {o.carte && <span className="cv-texte-carte cv-texte-portes" style={{ left: `${o.carte.x * 100}%`, top: `${o.carte.y * 100}%`, width: `${o.carte.l * 100}%`, height: `${o.carte.h * 100}%` }}><em>Lina<small>&amp;</small>Adam</em></span>}
      <span className="cv-battant cv-battant-g" style={{ backgroundImage: `url(/ouvertures/${o.id}-g.webp)` }} />
      <span className="cv-battant cv-battant-d" style={{ backgroundImage: `url(/ouvertures/${o.id}-d.webp)` }} />
    </span>
  );
}

function Tuile({ o, onOuvrir }: { o: OuvertureDef; onOuvrir: (id: string) => void }) {
  const f = FORMULES.find((x) => x.id === formuleDe(o));
  return (
    <li className="cv-tuile">
      <button type="button" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); const st = document.documentElement.style; st.setProperty("--fiche-x", `${r.left + r.width / 2}px`); st.setProperty("--fiche-y", `${r.top + r.height / 2}px`); onOuvrir(o.id); }}
        data-testid={`ouverture-${o.id}`} aria-label={`${o.nom}, formule ${f?.nom}, ${prixDe(o)}. Voir la carte`}>
        <span className="cv-cadre" aria-hidden="true">
          {o.video ? <FilmBoucle src={o.video} poster={o.poster} className="cv-media" zone={o.carte ? { x: o.carte.x, y: o.carte.y, l: o.carte.l, h: o.carte.h, apres: o.carte.stop ?? o.duree / 1000 * 0.55 } : undefined} /> : <Portes o={o} />}
        </span>
        <span className="cv-prix">{prixDe(o)}</span>
        <span className="cv-legende">
          <b>{o.nom}</b>
          <span>{o.styles.slice(0, 2).map((t) => <i key={t}>{t}</i>)}</span>
        </span>
      </button>
    </li>
  );
}

/** Catalogue : une seule grille, filtrée par formule. Chaque carte se joue en boucle sous les yeux du client. */
export default function BoutiqueCartes({ onOuvrir }: { onOuvrir: (id: string) => void }) {
  const cartes = ouverturesBoutique();
  const [formule, setFormule] = useState<Formule | null>(null);
  const liste = formule ? cartes.filter((o) => formuleDe(o) === formule) : cartes;
  const sel = FORMULES.find((f) => f.id === formule);
  return (
    <div className="cv-boutique" data-testid="boutique">
      <div className="cv-onglets" role="group" aria-label="Filtrer par formule">
        <button type="button" aria-pressed={!formule} onClick={() => setFormule(null)} data-testid="formule-toutes">Toutes</button>
        {FORMULES.map((f) => cartes.some((o) => formuleDe(o) === f.id) ? <button key={f.id} type="button" aria-pressed={formule === f.id} onClick={() => setFormule(formule === f.id ? null : f.id)} data-testid={`formule-${f.id}`}>{f.nom}<span>{f.id === "prestige" ? "dès 650 DH" : f.prix}</span></button> : null)}
      </div>
      <p className="cv-formule-texte" aria-live="polite">{sel ? sel.texte : "Chaque carte se joue en boucle : choisissez celle qui vous ressemble."}</p>
      <ul className="cv-grille" aria-label="Cartes d'invitation">
        {liste.map((o) => <Tuile key={o.id} o={o} onOuvrir={onOuvrir} />)}
      </ul>
    </div>
  );
}
