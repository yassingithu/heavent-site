import { useEffect, useRef, useState } from "react";
import type React from "react";

interface Props {
  /** date au format AAAA-MM-JJ, ou vide */
  value: string;
  onChange: (iso: string) => void;
  className?: string;
  id?: string;
  "data-testid"?: string;
  invalide?: boolean;
  /** vrai si les cases sont vides ou forment une date réelle */
  onValidite?: (ok: boolean) => void;
}

const decompose = (iso: string) => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso); return m ? { j: m[3], m: m[2], a: m[1] } : { j: "", m: "", a: "" }; };

/** Date en trois cases JJ · MM · AAAA : plus claire que le sélecteur du navigateur (format américain sur certains téléphones). */
export default function ChampDate({ value, onChange, className, id, invalide, onValidite, ...reste }: Props) {
  const [p, setP] = useState(() => decompose(value));
  const [faux, setFaux] = useState(false);
  const refJ = useRef<HTMLInputElement>(null), refM = useRef<HTMLInputElement>(null), refA = useRef<HTMLInputElement>(null);
  useEffect(() => { if (value && value !== composer(p)) setP(decompose(value)); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [value]);
  const composer = (q: { j: string; m: string; a: string }) => (q.j.length >= 1 && q.m.length >= 1 && q.a.length === 4) ? `${q.a}-${q.m.padStart(2, "0")}-${q.j.padStart(2, "0")}` : "";
  const maj = (suite: Partial<typeof p>) => {
    const q = { ...p, ...suite }; setP(q);
    const iso = composer(q);
    if (!iso) { setFaux(false); onChange(""); onValidite?.(!q.j && !q.m && !q.a); return; }
    const d = new Date(`${iso}T12:00:00`);
    const ok = !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === iso;
    setFaux(!ok); onChange(ok ? iso : ""); onValidite?.(ok);
  };
  const colle = (e: React.ClipboardEvent) => { const d = e.clipboardData.getData("text").replace(/\D/g, ""); if (d.length >= 6) { e.preventDefault(); maj({ j: d.slice(0, 2), m: d.slice(2, 4), a: d.slice(4, 8) }); } };
  const chiffres = (s: string, n: number) => s.replace(/\D/g, "").slice(0, n);
  const style = (f: number) => ({ flex: `${f} 1 0`, minWidth: 0, textAlign: "center" as const, paddingInline: 4 });
  return (
    <>
    <span role="group" aria-label="Date de l'événement" style={{ display: "flex", alignItems: "center", gap: 6, width: "100%" }}>
      <input ref={refJ} className={className} style={style(1)} inputMode="numeric" autoComplete="off" placeholder="JJ" aria-label="Jour" maxLength={2} value={p.j} id={id} aria-invalid={invalide || faux}
        onChange={(e) => { const v = chiffres(e.target.value, 2); maj({ j: v }); if (v.length === 2) refM.current?.focus(); }} onPaste={colle} {...reste} />
      <span aria-hidden="true">/</span>
      <input ref={refM} className={className} style={style(1)} inputMode="numeric" autoComplete="off" placeholder="MM" aria-label="Mois" maxLength={2} value={p.m} aria-invalid={invalide || faux}
        onChange={(e) => { const v = chiffres(e.target.value, 2); maj({ m: v }); if (v.length === 2) refA.current?.focus(); }} onKeyDown={(e) => { if (e.key === "Backspace" && !p.m) refJ.current?.focus(); }} />
      <span aria-hidden="true">/</span>
      <input ref={refA} className={className} style={style(1.7)} inputMode="numeric" autoComplete="off" placeholder="AAAA" aria-label="Année" maxLength={4} value={p.a} aria-invalid={invalide || faux}
        onChange={(e) => maj({ a: chiffres(e.target.value, 4) })} onKeyDown={(e) => { if (e.key === "Backspace" && !p.a) refM.current?.focus(); }} />
    </span>
    {faux && <span role="alert" style={{ display: "block", color: "#9B2C2C", fontSize: 13, marginTop: 4 }}>Date incorrecte</span>}
    </>
  );
}
