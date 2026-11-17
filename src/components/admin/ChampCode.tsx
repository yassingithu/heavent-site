import { forwardRef } from "react";

/** Chiffres arabes (٠-٩, ۰-۹) → 0-9, puis uniquement les chiffres : un iPhone en arabe peut dicter ces chiffres. */
export const chiffres = (v: string) =>
  v.replace(/[٠-٩]/g, (c) => String(c.charCodeAt(0) - 0x0660)).replace(/[۰-۹]/g, (c) => String(c.charCodeAt(0) - 0x06f0)).replace(/\D/g, "");

/**
 * Champ du code à 6 chiffres (double authentification), même gravure que le code de vérification des devis :
 * une seule case, pour que l'autofill de l'iPhone (code proposé au-dessus du clavier) et le collage fonctionnent.
 */
export const ChampCode = forwardRef<HTMLInputElement, {
  id: string; value: string; onChange: (v: string) => void; erreur?: string | null; autoFocus?: boolean;
}>(({ id, value, onChange, erreur, autoFocus }, ref) => (
  <div>
    <label htmlFor={id} className="text-xs uppercase tracking-[0.18em] text-[#6B6155]">Code à 6 chiffres</label>
    <input ref={ref} id={id} name="code" type="text" value={value} autoFocus={autoFocus}
      onChange={(e) => onChange(chiffres(e.target.value).slice(0, 6))}
      inputMode="numeric" autoComplete="one-time-code" enterKeyHint="go" maxLength={12} dir="ltr" placeholder="······"
      aria-invalid={!!erreur}
      className={`mt-1 block w-full max-w-[16rem] rounded-none border-0 border-b-2 ${erreur ? "border-[#8A2E26]" : "border-[#A8933F]"} bg-transparent px-1 min-h-14 !font-serif !text-3xl tabular-nums tracking-[0.4em] text-[#141414] placeholder:text-[#C9BFA8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8C6D22]`} />
    <p className="min-h-5 pt-2 text-sm" aria-live="polite">
      {erreur && <span className="block border-l-2 border-[#8A2E26] pl-2 text-[#8A2E26]">{erreur}</span>}
    </p>
  </div>
));
ChampCode.displayName = "ChampCode";

/** Message précis selon la cause : code faux, réseau, ou trop d'essais. */
export function messageCode(error: { code?: string; message?: string; status?: number } | null | undefined): string {
  if (!error) return "";
  const c = String(error.code ?? "");
  if (c === "mfa_verification_failed" || /invalid|expired/i.test(error.message ?? "")) return "Code refusé. Il change toutes les 30 secondes : attendez le suivant et tapez-le.";
  if (c.includes("rate_limit") || error.status === 429) return "Trop d'essais. Patientez une minute avant de réessayer.";
  return "Pas de connexion : votre code n'a pas été envoyé. Réessayez.";
}
