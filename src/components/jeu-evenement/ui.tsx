// Petits éléments d'interface du jeu (boutons, puces de choix, confettis).
import { ButtonHTMLAttributes, ReactNode, useEffect, useState } from "react";

/** Palette de l'interface : ivoire, champagne, beige, doré, rose poudré. */
export const C = { ivoire: "#FBF8F1", champagne: "#EAD9B5", beige: "#F1E8D8", or: "#C9A74E", orFonce: "#8C6D22", rose: "#E9C3C2", texte: "#2A2420", doux: "#6B6155" };

type Variante = "principal" | "secondaire" | "discret" | "danger";
export function Bouton({ variante = "principal", className = "", children, ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { variante?: Variante }) {
  const v: Record<Variante, string> = {
    principal: "bg-[#2A2420] text-[#FBF8F1] hover:bg-[#3B322B] shadow-sm",
    secondaire: "bg-white text-[#2A2420] border border-[#DCCBA6] hover:bg-[#F6EEDC]",
    discret: "text-[#5A4B2E] hover:bg-[#F1E8D8]",
    danger: "bg-white text-[#9B2C2C] border border-[#E7C3BF] hover:bg-[#FBEDEB]",
  };
  return (
    <button {...p} className={`inline-flex items-center justify-center gap-2 rounded-full px-4 min-h-11 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A74E] focus-visible:ring-offset-2 disabled:opacity-45 disabled:cursor-not-allowed ${v[variante]} ${className}`}>
      {children}
    </button>
  );
}

/** Choix sous forme de carte cliquable (radio accessible). */
export function Puce({ actif, onClick, titre, sous, icone, nom }: { actif: boolean; onClick: () => void; titre: string; sous?: string; icone?: ReactNode; nom?: string }) {
  return (
    <button type="button" role="radio" aria-checked={actif} name={nom} onClick={onClick}
      className={`text-left rounded-2xl border px-4 py-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A74E] ${actif ? "border-[#C9A74E] bg-[#FBF3DF] shadow-[0_2px_10px_rgba(201,167,78,0.25)]" : "border-[#E8DDC6] bg-white hover:border-[#D8C391]"}`}>
      <div className="flex items-center gap-3">
        {icone}
        <div>
          <div className="font-medium text-[#2A2420]">{titre}</div>
          {sous && <div className="text-xs text-[#6B6155]">{sous}</div>}
        </div>
      </div>
    </button>
  );
}

export const preferenceMouvementReduit = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Célébration discrète : quelques confettis dorés et rosés (désactivée si l'on préfère moins d'animations). */
export function Confettis({ actif }: { actif: boolean }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!actif || preferenceMouvementReduit()) return;
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(t);
  }, [actif]);
  if (!visible) return null;
  const couleurs = ["#C9A74E", "#E9B8BC", "#EAD9B5", "#F7F1E3", "#D88E98"];
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <style>{`@keyframes heavent-chute { 0% { transform: translateY(-10vh) rotate(0); opacity: 1 } 100% { transform: translateY(105vh) rotate(540deg); opacity: .9 } }`}</style>
      {Array.from({ length: 46 }, (_, i) => (
        <span key={i} style={{
          position: "absolute", left: `${(i * 37) % 100}%`, top: 0, width: 7 + (i % 3) * 2, height: 11 + (i % 4) * 2, borderRadius: i % 2 ? 2 : 6,
          background: couleurs[i % couleurs.length], animation: `heavent-chute ${1.8 + (i % 5) * 0.18}s ${(i % 7) * 0.06}s ease-in forwards`,
        }} />
      ))}
    </div>
  );
}
