import { useRef } from "react";
import { SAUT_PAGE } from "@/lib/pagination";

/** Zone de texte du message : texte long accepté, avec un bouton qui insère un saut de page à l'endroit du curseur. */
export default function ChampMessage({ valeur, onChange, rtl = false, placeholder, testId, className = "", rows = 4, libelle = "Petit mot" }: {
  valeur: string; onChange: (v: string) => void; rtl?: boolean; placeholder?: string; testId?: string; className?: string; rows?: number; libelle?: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const inserer = () => {
    const el = ref.current; const pos = el?.selectionStart ?? valeur.length;
    const avant = valeur.slice(0, pos).replace(/[ \t]*\n?$/, ""), apres = valeur.slice(el?.selectionEnd ?? pos).replace(/^\n?/, "");
    const suite = `${avant}${avant ? "\n" : ""}${SAUT_PAGE}\n${apres}`;
    if (suite.length > 1500) return;
    onChange(suite);
    requestAnimationFrame(() => { el?.focus(); const p = avant.length + (avant ? 1 : 0) + SAUT_PAGE.length + 1; el?.setSelectionRange(p, p); });
  };
  const pages = valeur.split("\n").filter((l) => /^\s*-{3,}\s*$/.test(l)).length;
  return (
    <div>
      <textarea ref={ref} dir={rtl ? "rtl" : undefined} rows={rows} maxLength={1500} className={className} aria-label={libelle} value={valeur} placeholder={placeholder} data-testid={testId} onChange={(e) => onChange(e.target.value)} />
      <div className="mt-1 flex flex-wrap items-center justify-between gap-2 text-xs text-[#6B6154]">
        <button type="button" onClick={inserer} className="rounded-full border border-[#E3D6BA] px-3 min-h-11 text-[#2A2420] hover:bg-[#F7F1E3]" data-testid="inserer-saut-page">Insérer un saut de page ici</button>
        <span>{pages > 0 ? `${pages} saut${pages > 1 ? "s" : ""} manuel${pages > 1 ? "s" : ""} · ` : ""}{valeur.length} / 1500</span>
      </div>
      <p className="mt-1 text-xs text-[#6B6154]">Le texte se répartit tout seul sur plusieurs pages s'il est long. Pour choisir où une page s'arrête, utilisez le bouton (une ligne « {SAUT_PAGE} »).</p>
    </div>
  );
}
