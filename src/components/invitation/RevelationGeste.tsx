import { useEffect, useRef, useState } from "react";

/** Révélations « au geste » : souffler les bougies (maintenir), allumer la lanterne (toucher), crever le ballon (toucher).
 *  Chaque scène a un bouton de secours toujours visible, et sous « mouvement réduit » la date apparaît au premier geste. */
export type TypeGeste = "bougies" | "lanterne" | "ballon";
interface Props { type: TypeGeste; langue: "fr" | "en" | "ar"; noms: string; sous: { haut: string; jour: string; bas: string } | null; onFini: () => void }

const T: Record<TypeGeste, { aide: Record<string, string>; bouton: Record<string, string> }> = {
  bougies: { aide: { fr: "Maintenez le doigt sur le gâteau pour souffler les bougies", en: "Hold your finger on the cake to blow out the candles", ar: "اضغطوا مطولاً على الكعكة لإطفاء الشموع" }, bouton: { fr: "Souffler", en: "Blow", ar: "أطفئوا" } },
  lanterne: { aide: { fr: "Touchez la lanterne pour l'allumer", en: "Tap the lantern to light it", ar: "المسوا الفانوس لإضاءته" }, bouton: { fr: "Allumer", en: "Light", ar: "أضيئوا" } },
  ballon: { aide: { fr: "Touchez le ballon pour le faire éclater", en: "Tap the balloon to pop it", ar: "المسوا البالون ليفرقع" }, bouton: { fr: "Éclater", en: "Pop", ar: "فرقعوا" } },
};

function Scene({ type, etat, confettis }: { type: TypeGeste; etat: "attente" | "geste" | "fini"; confettis: number[] }) {
  const or = "#A8933F";
  if (type === "bougies") return (
    <svg viewBox="0 0 220 200" aria-hidden="true" className="inv-g-svg">
      <ellipse cx="110" cy="168" rx="86" ry="14" fill="none" stroke={or} strokeWidth="2" />
      <path d="M30 168V112c0-8 8-14 18-14h124c10 0 18 6 18 14v56" fill="none" stroke={or} strokeWidth="2.5" />
      <path d="M30 128c14 10 28-8 42 2s28-8 42 2 28-8 42 2 28-8 34 0" fill="none" stroke={or} strokeWidth="2" />
      {[70, 110, 150].map((x, i) => (
        <g key={x}>
          <rect x={x - 5} y="62" width="10" height="36" rx="2" fill="none" stroke={or} strokeWidth="2.5" />
          <path className="inv-g-flamme" style={{ animationDelay: `${i * 0.18}s` }} d={`M${x} 40c8 8 8 16 0 20c-8-4-8-12 0-20z`} fill={or} opacity=".9" />
          <path className="inv-g-fumee" d={`M${x} 38c-4-8 4-14 0-22`} fill="none" stroke={or} strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
  if (type === "lanterne") return (
    <svg viewBox="0 0 200 240" aria-hidden="true" className="inv-g-svg">
      <circle className="inv-g-halo" cx="100" cy="130" r="90" fill={or} opacity="0" />
      <path d="M100 8v34" stroke={or} strokeWidth="2.5" /><circle cx="100" cy="8" r="5" fill="none" stroke={or} strokeWidth="2" />
      <path d="M70 52h60l16 26v82l-16 26H70l-16-26V78z" fill="none" stroke={or} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M62 78h76M62 160h76M100 52v134M80 78v82M120 78v82" stroke={or} strokeWidth="1.5" opacity=".6" />
      <ellipse className="inv-g-lueur" cx="100" cy="120" rx="22" ry="34" fill={or} opacity=".25" />
      <path d="M78 186h44l-6 18H84z" fill="none" stroke={or} strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
  return (
    <svg viewBox="0 0 200 240" aria-hidden="true" className="inv-g-svg">
      <g className="inv-g-ballon">
        <ellipse cx="100" cy="88" rx="60" ry="72" fill="none" stroke={or} strokeWidth="2.5" />
        <path d="M100 160l-8 12h16z" fill={or} />
        <path d="M100 172c-10 14 10 26 0 40" fill="none" stroke={or} strokeWidth="1.8" />
        <path d="M66 52c6-14 20-22 34-22" fill="none" stroke={or} strokeWidth="2" opacity=".5" strokeLinecap="round" />
      </g>
      {etat !== "attente" && confettis.map((a, i) => (
        <rect key={i} className="inv-g-conf" x="98" y="84" width="6" height="10" rx="1" fill={or} style={{ ["--a" as string]: `${a}deg`, animationDelay: `${(i % 4) * 0.03}s`, opacity: i % 2 ? 0.55 : 0.95 }} />
      ))}
    </svg>
  );
}

export default function RevelationGeste({ type, langue, noms, sous, onFini }: Props) {
  const [etat, setEtat] = useState<"attente" | "geste" | "fini">("attente");
  const [jauge, setJauge] = useState(0);
  const fini = useRef(false);
  const depart = useRef(0);
  const trame = useRef(0);
  const finiRef = useRef(onFini); finiRef.current = onFini;
  const reduit = typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const confettis = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

  const terminer = () => {
    if (fini.current) return;
    fini.current = true; cancelAnimationFrame(trame.current); setJauge(1); setEtat("fini");
    window.setTimeout(() => finiRef.current(), reduit ? 600 : 1900);
  };
  const toucher = () => { if (type === "bougies") return; if (!fini.current) { setEtat("geste"); window.setTimeout(terminer, reduit ? 0 : 450); } };
  const appuyer = () => {
    if (type !== "bougies" || fini.current) return;
    if (reduit) { terminer(); return; }
    depart.current = performance.now(); setEtat("geste");
    const pas = () => { const p = Math.min(1, (performance.now() - depart.current) / 1200); setJauge(p); if (p >= 1) terminer(); else trame.current = requestAnimationFrame(pas); };
    trame.current = requestAnimationFrame(pas);
  };
  const relacher = () => { if (type !== "bougies" || fini.current) return; cancelAnimationFrame(trame.current); setJauge(0); setEtat("attente"); };
  useEffect(() => () => cancelAnimationFrame(trame.current), []);
  /* Rien ne bloque l'invité : sans geste après 12 s, la date apparaît d'elle-même. */
  useEffect(() => { const id = window.setTimeout(terminer, 12000); return () => window.clearTimeout(id); }, []);

  const secours = () => { if (type === "bougies") terminer(); else { setEtat("geste"); window.setTimeout(terminer, reduit ? 0 : 300); } };
  return (
    <div className={`inv-rev inv-g inv-g-${type} is-${etat}`} data-testid="invitation-revelation" data-type={type}>
      <p className="inv-rev-noms">{noms}</p>
      <div className="inv-g-scene" role="button" tabIndex={0} aria-label={T[type].aide[langue]}
        onPointerDown={appuyer} onPointerUp={relacher} onPointerLeave={relacher} onPointerCancel={relacher} onClick={toucher}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); secours(); } }}>
        <Scene type={type} etat={etat} confettis={confettis} />
        {type === "bougies" && <span className="inv-g-jauge" aria-hidden="true"><i style={{ transform: `scaleX(${jauge})` }} /></span>}
      </div>
      {sous && <div className="inv-g-date" aria-hidden={etat !== "fini"}><small>{sous.haut}</small><b>{sous.jour}</b><small>{sous.bas}</small></div>}
      <p className="inv-aide inv-rev-aide">{T[type].aide[langue]}</p>
      <button type="button" className="inv-rev-bouton" onClick={secours} data-testid="invitation-decouvrir">{T[type].bouton[langue]}</button>
    </div>
  );
}
