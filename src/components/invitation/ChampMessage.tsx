import { useRef } from "react";
import { morceauxDeTexte, SAUT_PAGE } from "@/lib/pagination";

/** Zone de texte du message : texte long accepté, avec un bouton qui insère un saut de page à l'endroit du curseur. */
export default function ChampMessage({ valeur, onChange, rtl = false, placeholder, testId, className = "", rows = 4, libelle = "Petit mot", id, pagine = true }: {
  valeur: string; onChange: (v: string) => void; rtl?: boolean; placeholder?: string; testId?: string; className?: string; rows?: number; libelle?: string; id?: string; /** vrai : le décor choisi a un cadre fixe (le texte s'y répartit en pages) */ pagine?: boolean;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const inserer = () => {
    const el = ref.current; const pos = el?.selectionStart ?? valeur.length;
    if (!valeur.slice(0, pos).trim()) return; // un saut tout au début ne ferait rien
    const avant = valeur.slice(0, pos).replace(/[ \t]*\n?$/, ""), apres = valeur.slice(pos).replace(/^\n?/, "");
    const suite = `${avant}${avant ? "\n" : ""}${SAUT_PAGE}\n${apres}`;
    if (suite.length > 1000) return;
    onChange(suite);
    requestAnimationFrame(() => { el?.focus(); const p = avant.length + (avant ? 1 : 0) + SAUT_PAGE.length + 1; el?.setSelectionRange(p, p); });
  };
  const pages = morceauxDeTexte(valeur).filter((m) => m.saut).length;
  return (
    <div>
      <textarea ref={ref} id={id} dir={rtl ? "rtl" : undefined} rows={rows} maxLength={1000} className={className} aria-label={libelle} value={valeur} placeholder={placeholder} data-testid={testId} onChange={(e) => onChange(e.target.value)} />
      <div className="mt-1 flex flex-wrap items-center justify-between gap-2 text-xs text-[#6B6154]">
        {pagine ? <button type="button" onClick={inserer} disabled={valeur.length > 990} className="rounded-full border border-[#E3D6BA] px-3 min-h-11 text-[#2A2420] hover:bg-[#F7F1E3]" data-testid="inserer-saut-page">Couper la page ici</button> : <span />}
        <span>{pages > 0 ? `${pages} coupure${pages > 1 ? "s" : ""} de page · ` : ""}{valeur.length} / 1000</span>
      </div>
      {pagine && <p className="mt-1 text-xs text-[#6B6154]">Un texte long se répartit tout seul sur plusieurs pages. Placez le curseur après un paragraphe puis « Couper la page ici » pour choisir où une page s'arrête (une ligne « {SAUT_PAGE} » apparaît : ne l'effacez pas à la main).</p>}
    </div>
  );
}
