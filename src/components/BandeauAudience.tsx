import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTexte } from "@/i18n/textes";
import { activerGoogle, enregistrerChoixAudience, lireChoixAudience, type ChoixAudience } from "@/lib/audience";

/** Demande le consentement avant de charger la mesure d'audience Google. Deux boutons de même poids. */
const BandeauAudience = () => {
  const x = useTexte();
  const [choix, setChoix] = useState<ChoixAudience>(() => lireChoixAudience());

  useEffect(() => { if (choix === "oui") activerGoogle(); }, [choix]);

  if (choix) return null;

  const repondre = (c: "oui" | "non") => { enregistrerChoixAudience(c); setChoix(c); };
  const bouton = "h-11 flex-1 px-4 text-[13px] tracking-[.14em] uppercase border border-[rgba(228,212,154,.55)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E4D49A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414]";

  return (
    <div
      role="region"
      aria-label={x("Mesure d'audience")}
      data-testid="bandeau-audience"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[rgba(228,212,154,.55)] bg-[#141414] text-[#F3EDDD] px-4 py-4 sm:inset-x-auto sm:left-6 sm:bottom-6 sm:max-w-[26rem] sm:border print:hidden"
      style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <p className="text-[14px] leading-relaxed">
        {x("Pour savoir d'où viennent nos visiteurs, nous utilisons un outil de mesure de Google. Il ne se charge que si vous l'acceptez.")}{" "}
        <Link to="/politique-confidentialite#mesure-audience" className="underline underline-offset-4 text-[#E4D49A]">{x("En savoir plus")}</Link>
      </p>
      <div className="mt-3 flex gap-3">
        <button type="button" data-testid="audience-refuser" onClick={() => repondre("non")} className={`${bouton} bg-transparent text-[#F3EDDD] hover:bg-white/10`}>{x("Refuser")}</button>
        <button type="button" data-testid="audience-accepter" onClick={() => repondre("oui")} className={`${bouton} bg-transparent text-[#F3EDDD] hover:bg-white/10`}>{x("Accepter")}</button>
      </div>
    </div>
  );
};

export default BandeauAudience;
