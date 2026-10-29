import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import type { LucideProps } from "lucide-react";
import { useTranslation } from "react-i18next";
import { tr } from "./langue";
import {
  Camera, Sparkles, Flower2, Music, Drum, Mic2, Coffee, CandyCane, Sofa, Flame, Wind, Lamp, Utensils, PartyPopper, Users, BookHeart, Moon, Heart, Droplets, DoorOpen, Disc3, Music2,
  Speaker, ConciergeBell, Leaf, Crown, Check, Star, Guitar, Gem, Radio, SprayCan, Footprints, Store, Lightbulb, Wand2, Palette, Cake, Presentation, Projector, SlidersHorizontal, Baby, Waves,
} from "lucide-react";

type Icone = ComponentType<LucideProps>;
const ICONES: Record<string, Icone> = {
  // décor
  arche: Flower2, fleurs: Flower2, mur_fleurs: Leaf, allee: Footprints, fontaine: Droplets, petales: Sparkles, ciel_lanternes: Lamp, amariya: Crown, fauteuils: Sofa, neggafa: Gem, henne: Flower2, gateau: Cake, piscine_fleurs: Waves, piscine_bougies: Flame, piscine_lumiere: Waves,
  // conférence
  podium: Presentation, ecran: Projector, table_intervenants: Users, micros: Mic2, regie: SlidersHorizontal, buffet_sandwichs: Utensils,
  // expériences
  piste: Disc3, photobooth: Camera, nawar: SprayCan, buffet: Utensils, the_bar: Coffee, candy_bar: CandyCane, livre_dor: BookHeart, feux_froids: Flame, photographe: Camera, salon: Sofa, brume: Wind, enfants: Baby,
  // lumière
  chaleureuse: Lamp, etoilee: Star, bougies: Flame, festive: PartyPopper,
  // musique
  dj: Disc3, orchestre: Music, troupe: Drum, playlist: Speaker, acoustique: Guitar,
  // accueil
  discret: Store, hotesses: ConciergeBell, maitre_hotel: Crown, the: Coffee,
  // styles
  maroc: Gem, beige_or: Sparkles, romantique: Heart, festif: PartyPopper, minimal: Moon,
  // missions
  equipe: ConciergeBell, simple: Store, photo: Camera, livre: BookHeart, danse: Disc3, feux: Flame, candy: CandyCane, musique: Radio, micro: Mic2, groupe: Users,
};
export function Picto({ id, className = "h-5 w-5" }: { id: string; className?: string }) {
  const I = ICONES[id] ?? Wand2;
  return <I className={className} strokeWidth={1.6} />;
}
export { Check, Lightbulb, Palette, DoorOpen, Music2 };

/** Marque « disponible chez Heavent » ou « inspiration à discuter » : honnête sur ce qui est réservable */
export function Pastille({ reservable, court }: { reservable: boolean; court?: boolean }) {
  return reservable
    ? <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#E4D49A]"><span className="h-1.5 w-1.5 rounded-full bg-[#C9A74E]" />{court ? "Heavent" : tr("Proposé par Heavent")}</span>
    : <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#B9B09C]"><span className="h-1.5 w-1.5 rounded-full border border-[#B9B09C]" />{court ? tr("Idée") : tr("Inspiration à discuter")}</span>;
}

export const C = { anthracite: "#17141a", anthraciteClair: "#241f27", creme: "#F6EFDD", or: "#C9A74E", orClair: "#E4D49A", texte: "#F0E8D6", doux: "#B9B09C" };

export const btnOr = "inline-flex items-center justify-center gap-2 rounded-full bg-[#C9A74E] px-5 min-h-11 text-[15px] font-semibold text-[#17141a] shadow-[0_6px_20px_-6px_rgba(201,167,78,.7)] transition hover:bg-[#D8B95F] active:scale-[.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4D774] disabled:opacity-50 disabled:cursor-not-allowed";
export const btnContour = "inline-flex items-center justify-center gap-2 rounded-full border border-[#C9A74E]/60 px-4 min-h-11 text-sm font-medium text-[#F0E8D6] transition hover:bg-white/10 active:scale-[.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4D774] disabled:opacity-40 disabled:cursor-not-allowed";
export const champ = "w-full rounded-xl border border-white/15 bg-white/[0.06] px-3 min-h-11 text-[16px] text-[#F6EFDD] placeholder:text-[#8f8777] focus:outline-none focus:ring-2 focus:ring-[#C9A74E]";

export function Titre({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={`font-serif text-[#F6EFDD] ${className}`}>{children}</h2>;
}

/** Choix de la langue du jeu (la même que celle du site : français, anglais, arabe) */
export function SelecteurLangue({ className = "" }: { className?: string }) {
  const { i18n } = useTranslation();
  const cur = i18n.language?.startsWith("ar") ? "ar" : i18n.language?.startsWith("en") ? "en" : "fr";
  const choisir = (l: string) => { void i18n.changeLanguage(l); document.documentElement.lang = l; document.documentElement.dir = l === "ar" ? "rtl" : "ltr"; };
  return (
    <div role="group" aria-label={tr("Langue")} className={`inline-flex overflow-hidden rounded-full border border-white/25 bg-black/30 text-[12.5px] ${className}`} dir="ltr">
      {[["fr", "FR"], ["en", "EN"], ["ar", "عربي"]].map(([c, n]) => (
        <button key={c} type="button" onClick={() => choisir(c)} aria-pressed={cur === c} data-testid={`langue-${c}`} lang={c}
          className={`min-h-9 min-w-10 px-3 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F4D774] ${cur === c ? "bg-[#C9A74E] font-semibold text-[#17141a]" : "text-[#F0E8D6] hover:bg-white/10"}`}>{n}</button>
      ))}
    </div>
  );
}

/**
 * Champ numérique qui laisse taper librement (on peut effacer puis écrire « 15 ») :
 * la valeur n'est validée qu'en quittant le champ ou avec Entrée, puis ramenée entre min et max.
 */
export function ChampNombre({ id, valeur, min, max, onValider, className = "", testid, label }: { id: string; valeur: number; min: number; max: number; onValider: (v: number) => void; className?: string; testid?: string; label?: string }) {
  const [texte, setTexte] = useState(String(valeur));
  useEffect(() => { setTexte(String(valeur)); }, [valeur]);
  const valider = () => {
    const v = parseInt(texte, 10);
    if (!Number.isFinite(v)) { setTexte(String(valeur)); return; }
    const borne = Math.min(max, Math.max(min, v));
    setTexte(String(borne));
    if (borne !== valeur) onValider(borne);
  };
  return (
    <input id={id} type="text" inputMode="numeric" pattern="[0-9]*" aria-label={label} value={texte} data-testid={testid}
      onChange={(e) => setTexte(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))}
      onBlur={valider} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); valider(); (e.target as HTMLInputElement).blur(); } }}
      onFocus={(e) => e.target.select()}
      className={className} />
  );
}
