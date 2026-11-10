import type React from "react";
import { useEffect, useRef, useState, type Ref, type ReactNode, type CSSProperties } from "react";
import { ouvertureDe } from "@/lib/invitation";

/** Ouvertures animées de l'invitation : de vraies photos coupées en deux battants (public/ouvertures/<type>-g|d.webp),
 *  animées en CSS 3D. Chaque type partage la même structure (battants, cartouche des prénoms, lueur) pour rester interchangeable. */

interface Props {
  /** pas de cachet de cire : seul un petit bouton discret invite à ouvrir */
  sansCachet?: boolean;
  type: string;
  phase: "fermee" | "ouverture";
  onOuvrir: () => void;
  libelle: string;
  nomsRef: Ref<HTMLElement>;
  noms: ReactNode;
  /** Initiales des mariés, affichées dans le sceau de cire. */
  initiales: string;
  libelleBouton: string;
  /** Événements du film : la fin réelle pilote le passage à la carte. */
  onFilm?: (e: "ended" | "echec") => void;
}

/** Ouverture de chaque décor (en proportions de l'image) : seuls les battants s'ouvrent, le cadre reste fixe. */
const OUVERTURE_PATH: Record<string, string> = {
  marocaine: "M0.0696 1V0.47C0.0696 0.30 0.27 0.075 0.5 0.075C0.73 0.075 0.9304 0.30 0.9304 0.47V1Z",
  fer: "M0.067 0.975V0.21C0.067 0.08 0.25 0.005 0.5 0.005C0.75 0.005 0.933 0.08 0.933 0.21V0.975Z",
  artdeco: "M0.068 0.885V0.06H0.932V0.885Z",
  rideaux: "M0 0.115H1V1H0Z",
};

function Defs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <defs>
        {Object.entries(OUVERTURE_PATH).map(([t, d]) => (
          <g key={t}>
            <clipPath id={`inv-in-${t}`} clipPathUnits="objectBoundingBox"><path d={d} /></clipPath>
            <clipPath id={`inv-out-${t}`} clipPathUnits="objectBoundingBox"><path clipRule="evenodd" d={`M0 0H1V1H0Z ${d}`} /></clipPath>
          </g>
        ))}
      </defs>
    </svg>
  );
}

export default function Ouverture({ type, phase, onOuvrir, libelle, nomsRef, noms, initiales, libelleBouton, onFilm, sansCachet }: Props) {
  const def = ouvertureDe(type);
  const [echec, setEchec] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (phase !== "ouverture" || !def.video) return;
    // Lecture au toucher (autorisée car déclenchée par le geste) ; si le navigateur la refuse, l'affiche s'estompe simplement.
    const v = video.current;
    v?.play().catch(() => { setEchec(true); onFilm?.("echec"); });
    // fin anticipée : on passe à la carte ~0,4 s avant la dernière image (fondu rapide, la carte du film ne se remarque pas) ; zoom des films qui finissent sur une carte vierge
    let fini = false, raf = 0;
    const suivre = () => {
      if (v && !fini) {
        const t = v.currentTime, d = v.duration;
        if (def.zoom && t >= def.zoom.de && !v.dataset.zoom) v.dataset.zoom = "1";
        if ((def.zoom && t >= def.zoom.fin) || (d && isFinite(d) && t > 0.5 && d - t < 0.4)) { fini = true; onFilm?.("ended"); return; }
      }
      raf = requestAnimationFrame(suivre);
    };
    raf = requestAnimationFrame(suivre);
    return () => { cancelAnimationFrame(raf); };
  }, [phase, def.video]);
  useEffect(() => { if (phase === "fermee" && video.current) delete video.current.dataset.zoom; }, [phase]);
  if (def.video) {
    return (
      <div className="inv-scene">
        <button type="button" className={`inv-porte inv-o-video${echec ? " inv-o-video-secours" : ""}${sansCachet ? " inv-o-sans-cachet" : ""}`} onClick={onOuvrir} disabled={phase !== "fermee"} aria-label={`${libelleBouton}. ${libelle}`} data-testid="invitation-ouvrir" data-ouverture={type} style={def.sceauY ? ({ "--ov-y": `${def.sceauY}%` } as React.CSSProperties) : undefined}
          onPointerMove={(e) => { if (phase !== "fermee" || e.pointerType === "mouse") return; const b = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--px", `${((e.clientX - b.left) / b.width - .5) * -12}px`); e.currentTarget.style.setProperty("--py", `${((e.clientY - b.top) / b.height - .5) * -12}px`); }}>
          <span className="inv-ov-cadre">
          <img className="inv-ov-affiche" src={def.poster} alt="" decoding="async" />
          <video ref={video} className="inv-ov-film" src={def.video} poster={def.poster} muted playsInline preload="auto" aria-hidden="true" style={def.zoom ? ({ "--zs": def.zoom.s, "--zx": `${(0.5 - def.zoom.x) * 100}%`, "--zy": `${(0.5 - def.zoom.y) * 100}%` } as CSSProperties) : undefined} onEnded={() => onFilm?.("ended")} onError={() => { setEchec(true); onFilm?.("echec"); }} />
          </span>
          <span className="inv-o-sceau" aria-hidden="true"><em ref={nomsRef}>{initiales}</em></span>
          <span className="inv-o-ouvrir">{libelleBouton}</span>
          <span className="inv-sr-seul">{noms}</span>
        </button>
        <p className="inv-aide" aria-hidden={phase !== "fermee"}>{libelle}</p>
      </div>
    );
  }
  return (
    <div className="inv-scene">
      <Defs />
      <button type="button" className={`inv-porte inv-o-${type}${sansCachet ? " inv-o-sans-cachet" : ""}`} onClick={onOuvrir} disabled={phase !== "fermee"} aria-label={`${libelleBouton}. ${libelle}`} data-testid="invitation-ouvrir" data-ouverture={type}
        onPointerMove={(e) => { if (phase !== "fermee" || e.pointerType === "mouse") return; const b = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--px", `${((e.clientX - b.left) / b.width - .5) * -12}px`); e.currentTarget.style.setProperty("--py", `${((e.clientY - b.top) / b.height - .5) * -12}px`); }}>
        <span className="inv-o-monde" aria-hidden="true">
        <span className="inv-o-lueur" />
        <span className="inv-o-battants" aria-hidden="true">
          <span className="inv-o-battant inv-o-g" />
          <span className="inv-o-battant inv-o-d" />
        </span>
        {type in OUVERTURE_PATH && <span className="inv-o-cadre" aria-hidden="true"><span className="inv-o-g" /><span className="inv-o-d" /></span>}
        <span className="inv-o-rai" />
        </span>
        {/* ── CALQUE FIXE PERSONNALISABLE ───────────────────────────────────────────────
            Pour mettre VOTRE cadre (arche royale, rideaux drapés, couronne florale…) :
            1. déposez un PNG transparent dans  public/ouvertures/  (ex. mon-cadre.png)
            2. dans src/styles/ouvertures.css, règle  .inv-o-surcadre  : décommentez la ligne
               « background-image » et mettez  url("/ouvertures/mon-cadre.png").
            Ce calque reste immobile, passe au-dessus des battants et ne bloque jamais les clics. */}
        <span className="inv-o-surcadre" aria-hidden="true" />
        {/* Sceau de cire : les initiales viennent des prénoms saisis dans l'administration. */}
        <span className="inv-o-sceau" aria-hidden="true"><em ref={nomsRef}>{initiales}</em></span>
        <span className="inv-o-ouvrir">{libelleBouton}</span>
        <span className="inv-sr-seul">{noms}</span>
      </button>
      <p className="inv-aide" aria-hidden={phase !== "fermee"}>{libelle}</p>
    </div>
  );
}
