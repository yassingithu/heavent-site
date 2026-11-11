import type { TypeEvenement } from "./evenements";

/** Décor de la carte : un dessin qui remplace l'ornement du haut. Se combine librement avec ouverture, modèle, police. */
export interface DecorDef { id: string; nom: string; pour?: TypeEvenement[] }

export const DECORS: DecorDef[] = [
  { id: "aucun", nom: "Ornement du modèle" },
  { id: "lanterne", nom: "Lanterne", pour: ["iftar", "henne", "fiancailles", "naissance", "anniversaire", "mariage-civil", "mariage"] },
  { id: "croissant-etoiles", nom: "Croissant et étoiles", pour: ["iftar"] },
  { id: "khatam", nom: "Étoile khatam", pour: ["iftar", "henne", "naissance", "circoncision", "fiancailles", "mariage", "mariage-civil", "diplome"] },
  { id: "olivier", nom: "Branche d'olivier", pour: ["baby-shower", "naissance", "bapteme", "fiancailles", "mariage", "mariage-civil", "anniversaire", "anniversaire-enfant", "diplome"] },
  { id: "bougies", nom: "Bougies", pour: ["anniversaire", "anniversaire-enfant"] },
  { id: "maillot", nom: "Maillot de foot", pour: ["anniversaire-enfant"] },
  { id: "enfant-foot", nom: "Petit footballeur", pour: ["anniversaire-enfant"] },
  { id: "enfant-medecin", nom: "Petit médecin", pour: ["anniversaire-enfant"] },
  { id: "enfant-police", nom: "Petit policier", pour: ["anniversaire-enfant"] },
  { id: "enfant-avion", nom: "Petit pilote", pour: ["anniversaire-enfant"] },
  { id: "enfant-safari", nom: "Safari", pour: ["anniversaire-enfant", "baby-shower"] },
  { id: "enfant-dino", nom: "Dinosaure", pour: ["anniversaire-enfant"] },
  { id: "enfant-princesse", nom: "Petite princesse", pour: ["anniversaire-enfant"] },
];
export const decorsPour = (ev?: TypeEvenement) => DECORS.filter((d) => !d.pour || d.pour.includes(ev ?? "mariage"));
export const decorDe = (id?: string) => DECORS.find((d) => d.id === id) ?? DECORS[0];

/** Équipes proposées pour le maillot : couleurs seulement, jamais d'écusson dessiné par nous.
 *  L'écusson officiel s'ajoute via `logo` une fois la licence obtenue, ou par le parent (téléversement dans l'éditeur). */
export interface ClubDef { id: string; nom: string; rayures: "verticales" | "horizontales" | "unie"; c1: string; c2: string; texte: string; logo?: string }
export const CLUBS: ClubDef[] = [
  { id: "libre", nom: "Maillot libre", rayures: "verticales", c1: "#1E3A8A", c2: "#9F1239", texte: "#FFFFFF" },
  { id: "barca", nom: "FC Barcelone", rayures: "verticales", c1: "#A50044", c2: "#004D98", texte: "#EDBB00" },
  { id: "real", nom: "Real Madrid", rayures: "unie", c1: "#FFFFFF", c2: "#FFFFFF", texte: "#00529F" },
  { id: "psg", nom: "Paris Saint-Germain", rayures: "unie", c1: "#004170", c2: "#DA291C", texte: "#FFFFFF" },
  { id: "maroc", nom: "Équipe du Maroc", rayures: "unie", c1: "#C1272D", c2: "#006233", texte: "#006233" },
  { id: "raja", nom: "Raja Casablanca", rayures: "unie", c1: "#0B7A3B", c2: "#FFFFFF", texte: "#FFFFFF" },
  { id: "wydad", nom: "Wydad Casablanca", rayures: "unie", c1: "#D71920", c2: "#FFFFFF", texte: "#FFFFFF" },
  { id: "liverpool", nom: "Liverpool", rayures: "unie", c1: "#C8102E", c2: "#00B2A9", texte: "#FFFFFF" },
  { id: "city", nom: "Manchester City", rayures: "unie", c1: "#6CABDD", c2: "#1C2C5B", texte: "#1C2C5B" },
  { id: "bayern", nom: "Bayern Munich", rayures: "unie", c1: "#DC052D", c2: "#0066B2", texte: "#FFFFFF" },
];
export const clubDe = (id?: string) => CLUBS.find((c) => c.id === id) ?? CLUBS[0];
