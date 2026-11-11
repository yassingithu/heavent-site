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

const IMGS = import.meta.glob("../../assets/enfants/revelation-*.webp", { eager: true, query: "?url", import: "default" }) as Record<string, string>;
const img = (n: string) => Object.entries(IMGS).find(([k]) => k.endsWith(`revelation-${n}.webp`))?.[1] ?? "";

/** Trois objets gouache (même univers que les personnages) : le gâteau, la lanterne et le ballon se superposent à de simples calques animés. */
function Scene({ type, etat, reduit }: { type: TypeGeste; etat: "attente" | "geste" | "fini"; reduit: boolean }) {
  if (type === "bougies") return (
    <div className="inv-g-objet inv-g-gateau">
      <img className="inv-g-img" src={img("gateau")} alt="" decoding="async" draggable={false} />
      <svg className="inv-g-flammes" viewBox="0 0 100 22" aria-hidden="true">
        {[34.5, 50.5, 65].map((x, i) => (
          <g key={x}>
            <path className="inv-g-flamme" style={{ animationDelay: `${i * 0.18}s` }} d={`M${x} 3c3.6 3.6 3.6 8 0 10.4c-3.6-2.4-3.6-6.8 0-10.4z`} fill="#E2A93B" stroke="#A8933F" strokeWidth=".6" />
            <path className="inv-g-fumee" style={{ animationDelay: `${i * 0.08}s` }} d={`M${x} 12c-2-4 2-7 0-11`} fill="none" stroke="#8C6D22" strokeWidth=".8" strokeLinecap="round" />
          </g>
        ))}
      </svg>
    </div>
  );
  if (type === "lanterne") return (
    <div className="inv-g-objet inv-g-lant">
      <span className="inv-g-lueur" aria-hidden="true" />
      <img className="inv-g-img" src={img("lanterne")} alt="" decoding="async" draggable={false} />
    </div>
  );
  return (
    <div className="inv-g-objet inv-g-bal">
      <img className="inv-g-img inv-g-ballon" src={img("ballon")} alt="" decoding="async" draggable={false} />
      <svg className="inv-g-conf-svg" viewBox="0 0 100 100" aria-hidden="true">
        {etat !== "attente" && !reduit && CONFETTIS.map((c, i) => (
          <rect key={i} className="inv-g-conf" x="48" y="30" width={c.t === 0 ? 3 : 4.5} height={c.t === 2 ? 3.5 : 6} rx=".6" fill={i % 3 ? "#A8933F" : "#A3362B"} style={{ ["--a" as string]: `${c.a}deg`, ["--d" as string]: `${c.d}px`, ["--r" as string]: `${c.r}deg`, animationDelay: `${(i % 4) * 0.03}s` }} />
        ))}
      </svg>
    </div>
  );
}

const CONFETTIS = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => ({ a, d: 70 + ((i * 37) % 50), r: 120 + ((i * 53) % 160), t: i % 3 }));
const PASSER: Record<string, string> = { fr: "Passer · voir la date", en: "Skip · show the date", ar: "تخطي · عرض التاريخ" };
const AIDE_REDUIT: Record<string, string> = { fr: "Touchez le gâteau pour souffler les bougies", en: "Tap the cake to blow out the candles", ar: "المسوا الكعكة لإطفاء الشموع" };

export default function RevelationGeste({ type, langue, noms, sous, onFini }: Props) {
  const [etat, setEtat] = useState<"attente" | "geste" | "fini">("attente");
  const [indice, setIndice] = useState(false);
  const [sortie, setSortie] = useState(false);
  const fini = useRef(false);
  const minuteurs = useRef<number[]>([]);
  const maintien = useRef(0);
  const auto = useRef(0);
  const finiRef = useRef(onFini); finiRef.current = onFini;
  const reduit = typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const later = (f: () => void, ms: number) => { const id = window.setTimeout(f, ms); minuteurs.current.push(id); return id; };

  const terminer = () => {
    if (fini.current) return;
    fini.current = true; window.clearTimeout(maintien.current); window.clearTimeout(auto.current); setEtat("fini");
    later(() => setSortie(true), reduit ? 300 : 2300);
    later(() => finiRef.current(), reduit ? 600 : 2650);
  };
  const armerAuto = () => { window.clearTimeout(auto.current); auto.current = window.setTimeout(terminer, 12000); };
  const toucher = () => {
    if (fini.current) return;
    if (type === "bougies") return;
    setEtat("geste"); later(terminer, reduit ? 0 : 450);
  };
  const depart = useRef(0);
  const appuyer = () => {
    if (type !== "bougies" || fini.current) return;
    depart.current = Date.now();
    if (reduit) { terminer(); return; }
    setEtat("geste"); window.clearTimeout(auto.current);
    maintien.current = window.setTimeout(terminer, 1200);
  };
  const relacher = () => {
    if (type !== "bougies" || fini.current) return;
    window.clearTimeout(maintien.current); setEtat("attente"); armerAuto();
    if (Date.now() - depart.current < 300) { setIndice(true); later(() => setIndice(false), 1400); }
  };
  useEffect(() => { armerAuto(); return () => { window.clearTimeout(auto.current); window.clearTimeout(maintien.current); minuteurs.current.forEach((id) => window.clearTimeout(id)); }; }, []);

  const secours = () => { if (type === "bougies") terminer(); else { setEtat("geste"); later(terminer, reduit ? 0 : 300); } };
  const aide = type === "bougies" && reduit ? AIDE_REDUIT[langue] : T[type].aide[langue];
  return (
    <div className={`inv-rev inv-g inv-g-${type} is-${etat}${indice ? " is-indice" : ""}${sortie ? " is-sortie" : ""}`} data-testid="invitation-revelation" data-type={type}>
      <p className="inv-rev-noms">{noms}</p>
      <div className="inv-g-scene" role="button" tabIndex={0} aria-label={aide} onContextMenu={(e) => e.preventDefault()}
        onPointerDown={appuyer} onPointerUp={relacher} onPointerLeave={relacher} onPointerCancel={relacher} onClick={toucher}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); secours(); } }}>
        <Scene type={type} etat={etat === "fini" ? "fini" : etat === "geste" ? "geste" : "attente"} reduit={reduit} />
        {type === "bougies" && <span className="inv-g-jauge" aria-hidden="true"><i /></span>}
      </div>
      {sous && <div className="inv-g-date" aria-live="polite" aria-hidden={etat !== "fini"}><small>{sous.haut}</small><b>{sous.jour}</b><small>{sous.bas}</small></div>}
      <p className="inv-aide inv-rev-aide">{aide}</p>
      <button type="button" className="inv-g-passer" onClick={secours} data-testid="invitation-decouvrir">{PASSER[langue]}</button>
    </div>
  );
}
