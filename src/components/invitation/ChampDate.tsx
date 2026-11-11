import { useEffect, useRef, useState } from "react";

interface Props {
  /** date au format AAAA-MM-JJ, ou vide */
  value: string;
  onChange: (iso: string) => void;
  className?: string;
  id?: string;
  "data-testid"?: string;
  invalide?: boolean;
}

const decompose = (iso: string) => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso); return m ? { j: m[3], m: m[2], a: m[1] } : { j: "", m: "", a: "" }; };

/** Date en trois cases JJ · MM · AAAA : plus claire que le sélecteur du navigateur (format américain sur certains téléphones). */
export default function ChampDate({ value, onChange, className, id, invalide, ...reste }: Props) {
  const [p, setP] = useState(() => decompose(value));
  const [faux, setFaux] = useState(false);
  const refM = useRef<HTMLInputElement>(null), refA = useRef<HTMLInputElement>(null);
  useEffect(() => { if (value && value !== composer(p)) setP(decompose(value)); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [value]);
  const composer = (q: { j: string; m: string; a: string }) => (q.j.length >= 1 && q.m.length >= 1 && q.a.length === 4) ? `${q.a}-${q.m.padStart(2, "0")}-${q.j.padStart(2, "0")}` : "";
  const maj = (suite: Partial<typeof p>) => {
    const q = { ...p, ...suite }; setP(q);
    const iso = composer(q);
    if (!iso) { setFaux(false); onChange(""); return; }
    const d = new Date(`${iso}T12:00:00`);
    const ok = !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === iso;
    setFaux(!ok); onChange(ok ? iso : "");
  };
  const chiffres = (s: string, n: number) => s.replace(/\D/g, "").slice(0, n);
  const style = (w: string) => ({ width: w, textAlign: "center" as const, paddingInline: 4 });
  return (
    <span role="group" aria-label="Date de l'événement" style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <input className={className} style={style("3.4rem")} inputMode="numeric" autoComplete="off" placeholder="JJ" aria-label="Jour" maxLength={2} value={p.j} id={id} aria-invalid={invalide || faux}
        onChange={(e) => { const v = chiffres(e.target.value, 2); maj({ j: v }); if (v.length === 2) refM.current?.focus(); }} {...reste} />
      <span aria-hidden="true">/</span>
      <input ref={refM} className={className} style={style("3.4rem")} inputMode="numeric" autoComplete="off" placeholder="MM" aria-label="Mois" maxLength={2} value={p.m} aria-invalid={invalide || faux}
        onChange={(e) => { const v = chiffres(e.target.value, 2); maj({ m: v }); if (v.length === 2) refA.current?.focus(); }} />
      <span aria-hidden="true">/</span>
      <input ref={refA} className={className} style={style("5rem")} inputMode="numeric" autoComplete="off" placeholder="AAAA" aria-label="Année" maxLength={4} value={p.a} aria-invalid={invalide || faux}
        onChange={(e) => maj({ a: chiffres(e.target.value, 4) })} />
      {faux && <span role="alert" style={{ color: "#9B2C2C", fontSize: 13 }}>Date incorrecte</span>}
    </span>
  );
}
