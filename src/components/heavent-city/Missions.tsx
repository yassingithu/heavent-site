import { Check } from "lucide-react";
import type { Mission } from "./donnees";
import { Picto } from "./ui";

/** Une mission : deux ou trois réponses visuelles, une conséquence visible dans la scène, et la possibilité de passer */
export function MissionCarte({ mission, numero, reponse, onRepondre }: { mission: Mission; numero: number; reponse?: string; onRepondre: (reponse: string) => void }) {
  const faite = !!reponse;
  const eff = mission.reponses.find((r) => r.id === reponse)?.effet;
  return (
    <section className={`rounded-2xl border p-3.5 ${faite ? "border-[#C9A74E]/60 bg-[#C9A74E]/10" : "border-white/15 bg-white/[0.05]"}`} aria-label={`Mission ${numero} : ${mission.titre}`} data-testid={`mission-${mission.id}`}>
      <div className="flex items-center gap-2">
        <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${faite ? "bg-[#C9A74E] text-[#17141a]" : "bg-white/15 text-[#F0E8D6]"}`}>{faite ? <Check className="h-3.5 w-3.5" /> : numero}</span>
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#E4D49A]">Mission {numero}</p>
      </div>
      <h3 className="mt-1.5 font-serif text-[17px] leading-snug text-[#F6EFDD]">{mission.titre}</h3>
      <p className="mt-1 text-[14px] leading-snug text-[#D9D0BC]">{mission.message}</p>
      <div className="mt-3 grid gap-2" role="radiogroup" aria-label={mission.titre}>
        {mission.reponses.map((r) => {
          const on = reponse === r.id;
          return (
            <button key={r.id} type="button" role="radio" aria-checked={on} onClick={() => onRepondre(r.id)} data-testid={`reponse-${mission.id}-${r.id}`}
              className={`flex items-center gap-3 rounded-xl border px-3 min-h-14 text-left transition active:scale-[.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F4D774] ${on ? "border-[#C9A74E] bg-[#C9A74E]/20" : "border-white/15 bg-white/[0.04] hover:bg-white/10"}`}>
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${on ? "bg-[#C9A74E] text-[#17141a]" : "bg-white/10 text-[#E4D49A]"}`}><Picto id={r.id === "equipe" || r.id === "simple" || r.id === "the" ? r.id : r.ajoute[0] ?? r.musique ?? r.id} className="h-[18px] w-[18px]" /></span>
              <span className="min-w-0"><span className="block text-[14.5px] font-medium text-[#F6EFDD]">{r.nom}</span><span className="block text-[12.5px] text-[#B9B09C]">{r.phrase}</span></span>
            </button>
          );
        })}
        <button type="button" onClick={() => onRepondre("passe")} data-testid={`passer-${mission.id}`} aria-pressed={reponse === "passe"}
          className={`rounded-xl px-3 min-h-10 text-[13px] ${reponse === "passe" ? "text-[#E4D49A]" : "text-[#B9B09C] hover:text-[#F0E8D6]"} underline-offset-4 hover:underline`}>
          {reponse === "passe" ? "Mission passée — tu peux encore répondre" : "Passer cette mission"}
        </button>
      </div>
      {eff && <p className="mt-1 text-[13px] text-[#E4D49A]" aria-live="polite">✨ {eff}</p>}
    </section>
  );
}
