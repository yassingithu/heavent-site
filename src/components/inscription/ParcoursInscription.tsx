import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

/** Les 5 étapes de l'inscription, présentées comme un parcours à débloquer. */
export const ETAPES = [
  { emoji: "👋", titre: "Faisons connaissance", court: "Toi", minutes: 1, bravo: "C'est parti !" },
  { emoji: "🪪", titre: "Les infos pour ton contrat", court: "Contrat", minutes: 2, bravo: "Super départ, tu es lancé(e) !" },
  { emoji: "✨", titre: "Ton style et ton expérience", court: "Profil", minutes: 2, bravo: "La moitié est faite, continue !" },
  { emoji: "📅", titre: "Tes disponibilités et tes photos", court: "Dispos", minutes: 1, bravo: "Plus qu'une étape !" },
  { emoji: "🔐", titre: "Ton accès à l'espace staff", court: "Accès", minutes: 1, bravo: "Dernière ligne droite 🎉" },
];

interface Props {
  etape: number;            // 1 à 5
  remplis: number;          // champs obligatoires déjà remplis
  total: number;            // champs obligatoires au total
}

export function ParcoursInscription({ etape, remplis, total }: Props) {
  const pourcentage = Math.min(100, Math.round((remplis / Math.max(total, 1)) * 100));
  const minutesRestantes = ETAPES.slice(etape - 1).reduce((t, e) => t + e.minutes, 0);
  const [anime, setAnime] = useState(false);
  const precedente = useRef(etape);

  // Petite animation « étape débloquée » à chaque passage d'étape
  useEffect(() => {
    if (etape > precedente.current) { setAnime(true); const t = setTimeout(() => setAnime(false), 1600); precedente.current = etape; return () => clearTimeout(t); }
    precedente.current = etape;
  }, [etape]);

  const e = ETAPES[etape - 1];
  return (
    <div className="mb-8 select-none">
      {/* Les badges d'étapes */}
      <ol className="flex items-start justify-between gap-1 mb-5" aria-label="Progression de l'inscription">
        {ETAPES.map((x, i) => {
          const n = i + 1;
          const fait = n < etape, actuel = n === etape;
          return (
            <li key={x.court} className="flex-1 flex flex-col items-center relative">
              {i > 0 && <span className={`absolute top-5 right-1/2 w-full h-0.5 -z-0 ${n <= etape ? "bg-primary" : "bg-muted"}`} aria-hidden />}
              <span className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 text-lg transition-all duration-500
                ${fait ? "bg-primary border-primary text-primary-foreground" : actuel ? "bg-background border-primary shadow-[0_0_0_6px_rgba(200,181,96,0.18)] scale-110" : "bg-muted border-muted text-muted-foreground grayscale"}`}>
                {fait ? <Check className="h-5 w-5" /> : x.emoji}
              </span>
              <span className={`mt-1.5 text-[11px] sm:text-xs font-medium ${actuel ? "text-foreground" : "text-muted-foreground"}`}>{x.court}</span>
            </li>
          );
        })}
      </ol>

      {/* Message d'encouragement + barre de progression qui se remplit au fil des réponses */}
      <div className={`rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 transition-all duration-500 ${anime ? "ring-2 ring-primary/60 scale-[1.01]" : ""}`}>
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-wide text-primary font-semibold">{anime ? "Étape débloquée !" : `Étape ${etape} sur 5`} · {e.bravo}</div>
            <div className="font-serif text-lg sm:text-xl font-bold truncate">{e.emoji} {e.titre}</div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-2xl font-bold text-primary leading-none">{pourcentage}%</div>
            <div className="text-[11px] text-muted-foreground">≈ {minutesRestantes} min restante{minutesRestantes > 1 ? "s" : ""}</div>
          </div>
        </div>
        <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
          <div className="h-2.5 rounded-full bg-gradient-to-r from-primary/70 to-primary transition-all duration-700 ease-out" style={{ width: `${pourcentage}%` }} />
        </div>
      </div>
    </div>
  );
}

/** Pluie de confettis aux couleurs Heavent (sans bibliothèque). */
export function Confettis() {
  const couleurs = ["#C8B560", "#A8933F", "#141414", "#FAF7EE", "#E7D9A0"];
  const pieces = Array.from({ length: 70 }, (_, i) => ({
    gauche: Math.random() * 100, delai: Math.random() * 0.8, duree: 2.2 + Math.random() * 1.8,
    couleur: couleurs[i % couleurs.length], taille: 6 + Math.random() * 6, rotation: Math.random() * 360,
  }));
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50" aria-hidden>
      <style>{`@keyframes heavent-confetti { 0% { transform: translateY(-10vh) rotate(0deg); opacity: 1 } 100% { transform: translateY(110vh) rotate(720deg); opacity: .9 } }`}</style>
      {pieces.map((p, i) => (
        <span key={i} style={{
          position: "absolute", top: 0, left: `${p.gauche}%`, width: p.taille, height: p.taille * 0.45, background: p.couleur,
          borderRadius: 2, transform: `rotate(${p.rotation}deg)`, animation: `heavent-confetti ${p.duree}s ${p.delai}s cubic-bezier(.2,.6,.4,1) forwards`,
        }} />
      ))}
    </div>
  );
}
