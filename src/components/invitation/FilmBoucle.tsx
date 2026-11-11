import { useEffect, useRef, useState } from "react";

/** Film muet qui tourne en boucle tant qu'il est visible à l'écran (et seulement alors : pas de lecture cachée, pas de téléchargement inutile). */
/** Carte vierge du film : le texte d'exemple s'y écrit quand elle est sortie de l'enveloppe. */
export interface ZoneCarte { x: number; y: number; l: number; h: number; apres: number }

export default function FilmBoucle({ src, poster, className = "", eager = false, zone }: { src: string; poster?: string; className?: string; eager?: boolean; zone?: ZoneCarte }) {
  const [lu, setLu] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  const [charge, setCharge] = useState(eager);
  const [joue, setJoue] = useState(false);
  const reduit = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  useEffect(() => {
    const v = ref.current; if (!v || reduit) return;
    if (typeof IntersectionObserver === "undefined") { setCharge(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setCharge(true); v.play().catch(() => {}); } else v.pause();
    }, { threshold: 0.35, rootMargin: "80px 0px" });
    io.observe(v);
    return () => io.disconnect();
  }, [reduit, charge]);
  return (
    <>
      {poster && <img className={className} src={poster} alt="" loading="lazy" decoding="async" />}
      {!reduit && (
        <video ref={ref} className={`${className} cv-film${joue ? " joue" : ""}`} src={charge ? src : undefined} muted loop playsInline preload={charge ? "auto" : "none"} aria-hidden="true" tabIndex={-1}
          onPlaying={() => setJoue(true)} onTimeUpdate={zone ? (e) => setLu(e.currentTarget.currentTime >= zone.apres) : undefined} onLoadedData={(e) => { if (charge) e.currentTarget.play().catch(() => {}); }} />
      )}
      {zone && !reduit && <span className={`cv-texte-carte${lu ? " lu" : ""}`} aria-hidden="true" style={{ left: `${zone.x * 100}%`, top: `${zone.y * 100}%`, width: `${zone.l * 100}%`, height: `${zone.h * 100}%` }}><em>Lina<small>&amp;</small>Adam</em></span>}
    </>
  );
}
