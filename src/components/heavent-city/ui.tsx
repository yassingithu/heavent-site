import type { ComponentType, ReactNode } from "react";
import type { LucideProps } from "lucide-react";
import {
  Camera, Sparkles, Flower2, Music, Drum, Mic2, Coffee, CandyCane, Sofa, Flame, Wind, Lamp, Utensils, PartyPopper, Users, BookHeart, Moon, Heart, Droplets, DoorOpen, Disc3, Music2,
  Speaker, ConciergeBell, Leaf, Crown, Check, Star, Guitar, Gem, Radio, SprayCan, Footprints, Store, Lightbulb, Wand2, Palette, Cake,
} from "lucide-react";

type Icone = ComponentType<LucideProps>;
const ICONES: Record<string, Icone> = {
  // décor
  arche: Flower2, fleurs: Flower2, mur_fleurs: Leaf, allee: Footprints, fontaine: Droplets, petales: Sparkles, ciel_lanternes: Lamp, amariya: Crown, fauteuils: Sofa, neggafa: Gem, henne: Flower2, gateau: Cake,
  // expériences
  piste: Disc3, photobooth: Camera, nawar: SprayCan, buffet: Utensils, the_bar: Coffee, candy_bar: CandyCane, livre_dor: BookHeart, feux_froids: Flame, photographe: Camera, salon: Sofa, brume: Wind,
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
    ? <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#E4D49A]"><span className="h-1.5 w-1.5 rounded-full bg-[#C9A74E]" />{court ? "Heavent" : "Proposé par Heavent"}</span>
    : <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#B9B09C]"><span className="h-1.5 w-1.5 rounded-full border border-[#B9B09C]" />{court ? "Idée" : "Inspiration à discuter"}</span>;
}

export const C = { anthracite: "#17141a", anthraciteClair: "#241f27", creme: "#F6EFDD", or: "#C9A74E", orClair: "#E4D49A", texte: "#F0E8D6", doux: "#B9B09C" };

export const btnOr = "inline-flex items-center justify-center gap-2 rounded-full bg-[#C9A74E] px-5 min-h-11 text-[15px] font-semibold text-[#17141a] shadow-[0_6px_20px_-6px_rgba(201,167,78,.7)] transition hover:bg-[#D8B95F] active:scale-[.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4D774] disabled:opacity-50 disabled:cursor-not-allowed";
export const btnContour = "inline-flex items-center justify-center gap-2 rounded-full border border-[#C9A74E]/60 px-4 min-h-11 text-sm font-medium text-[#F0E8D6] transition hover:bg-white/10 active:scale-[.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4D774] disabled:opacity-40 disabled:cursor-not-allowed";
export const champ = "w-full rounded-xl border border-white/15 bg-white/[0.06] px-3 min-h-11 text-[16px] text-[#F6EFDD] placeholder:text-[#8f8777] focus:outline-none focus:ring-2 focus:ring-[#C9A74E]";

export function Titre({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={`font-serif text-[#F6EFDD] ${className}`}>{children}</h2>;
}
