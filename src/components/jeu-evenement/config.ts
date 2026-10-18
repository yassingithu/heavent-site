/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  « Crée ton événement de rêve » — CONFIGURATION
 *  Tout ce qui se modifie sans toucher au code du jeu est ici :
 *  devise, types d'événement, lieux, ambiances (couleurs), catalogue, tarifs.
 *  Les tarifs sont des valeurs de DÉMONSTRATION (fictives).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { localeNombres, tr } from "./langue";

export const DEVISE = "MAD";
export const format = (n: number) => `${new Intl.NumberFormat(localeNombres(), { maximumFractionDigits: 0 }).format(Math.round(n))} ${DEVISE}`;

export const LIMITES_INVITES = { min: 10, max: 500, defaut: 120 };
export const BUDGET_DEFAUT = 120000;

export const MENTION_ESTIMATION =
  "Estimation illustrative des éléments sélectionnés, hors prestations non incluses. Le tarif final sera confirmé sur devis.";

// ── Types d'événement ───────────────────────────────────────────────────────
export type TypeEvenement = "mariage" | "fiancailles" | "anniversaire" | "babyshower" | "pro";
export const TYPES_EVENEMENT: { id: TypeEvenement; nom: string; article: string }[] = [
  { id: "mariage", nom: "Mariage", article: "votre mariage" },
  { id: "fiancailles", nom: "Fiançailles", article: "vos fiançailles" },
  { id: "anniversaire", nom: "Anniversaire", article: "votre anniversaire" },
  { id: "babyshower", nom: "Baby shower", article: "votre baby shower" },
  { id: "pro", nom: "Événement professionnel", article: "votre événement professionnel" },
];

// ── Lieux ───────────────────────────────────────────────────────────────────
export type Lieu = "jardin" | "salle" | "terrasse";
export const LIEUX: { id: Lieu; nom: string; description: string; sol: [string, string]; bord: string }[] = [
  { id: "jardin", nom: "Jardin", description: "Pelouse, arbres et ciel ouvert", sol: ["#CFDDB0", "#C4D4A3"], bord: "#A9BE86" },
  { id: "salle", nom: "Salle de réception", description: "Parquet, murs et grandes fenêtres", sol: ["#EBDDC2", "#E3D3B5"], bord: "#CDB993" },
  { id: "terrasse", nom: "Terrasse", description: "Dalles claires et vue dégagée", sol: ["#EEE8DE", "#E4DCCF"], bord: "#CFC5B4" },
];

// ── Ambiances : couleurs par défaut des nappes, fleurs et décorations ───────
export type Ambiance = "chic" | "boheme" | "romantique" | "orientale" | "moderne";
export interface Palette { nappe: string; fleurs: string; deco: string; piste: [string, string]; accent: string }
export const AMBIANCES: { id: Ambiance; nom: string; description: string; palette: Palette }[] = [
  { id: "chic", nom: "Chic et élégante", description: "Ivoire, champagne et doré", palette: { nappe: "#F7F1E3", fleurs: "#FBF8F1", deco: "#C9A74E", piste: ["#F5EEDC", "#D9C48E"], accent: "#C9A74E" } },
  { id: "boheme", nom: "Bohème", description: "Lin, terracotta et sauge", palette: { nappe: "#E9DDC7", fleurs: "#C98261", deco: "#9DAE89", piste: ["#E9DDC7", "#C9A98A"], accent: "#B9785A" } },
  { id: "romantique", nom: "Romantique", description: "Rose poudré et champagne", palette: { nappe: "#F4DCDA", fleurs: "#E6A6AC", deco: "#E3CDA0", piste: ["#FBEFEE", "#EBC5C4"], accent: "#D88E98" } },
  { id: "orientale", nom: "Orientale", description: "Bordeaux, émeraude et or", palette: { nappe: "#7C2436", fleurs: "#C2386F", deco: "#C9A227", piste: ["#1F5E4F", "#C9A227"], accent: "#1F6B57" } },
  { id: "moderne", nom: "Moderne", description: "Blanc, noir et lignes nettes", palette: { nappe: "#FFFFFF", fleurs: "#E4EDE0", deco: "#2B2B2B", piste: ["#F4F4F4", "#2B2B2B"], accent: "#2B2B2B" } },
];

/** Couleurs proposées pour personnaliser nappes, fleurs et décorations. */
export const NUANCIER: { nom: string; valeur: string }[] = [
  { nom: "Ivoire", valeur: "#F7F1E3" }, { nom: "Blanc", valeur: "#FFFFFF" }, { nom: "Champagne", valeur: "#E8D3A8" },
  { nom: "Doré", valeur: "#C9A74E" }, { nom: "Rose poudré", valeur: "#E9B8BC" }, { nom: "Fuchsia", valeur: "#C2386F" },
  { nom: "Terracotta", valeur: "#C98261" }, { nom: "Sauge", valeur: "#9DAE89" }, { nom: "Émeraude", valeur: "#1F6B57" },
  { nom: "Bordeaux", valeur: "#7C2436" }, { nom: "Bleu nuit", valeur: "#24324F" }, { nom: "Noir", valeur: "#2B2B2B" },
];

// ── Catalogue ───────────────────────────────────────────────────────────────
export type TypeElement =
  | "table_ronde" | "table_rect" | "honneur" | "arche" | "fleurs" | "guirlandes" | "piste"
  | "dj" | "buffet" | "bar" | "photobooth" | "lounge" | "gateau"
  | "nawar" | "hotesse" | "serveur" | "maitre_hotel";

export type Categorie = "places" | "decoration" | "lumiere" | "animation" | "gourmand" | "detente" | "personnel";
export const CATEGORIES: { id: Categorie; nom: string }[] = [
  { id: "places", nom: "Tables et places" },
  { id: "decoration", nom: "Décoration" },
  { id: "lumiere", nom: "Lumière" },
  { id: "animation", nom: "Animation" },
  { id: "gourmand", nom: "Buffet et boissons" },
  { id: "detente", nom: "Espaces conviviaux" },
  { id: "personnel", nom: "Personnel" },
];

/** Quelle couleur de l'élément le visiteur peut personnaliser. */
export type CleCouleur = "nappe" | "fleurs" | "deco";

export interface DefElement {
  id: TypeElement;
  categorie: Categorie;
  /** Nom et description (adaptables selon le type d'événement, voir LIBELLES) */
  nom: string;
  description: string;
  /** Emprise au sol en cases (largeur × profondeur) */
  w: number;
  h: number;
  /** Coût fixe par élément placé */
  prix: number;
  /** Coût par invité, compté UNE seule fois quel que soit le nombre d'éléments de ce type */
  prixParInvite?: number;
  /** Nombre minimum facturé pour le coût par invité (ex. 50 parfums minimum pour le bar Nawar) */
  minimumInvites?: number;
  /** Places assises apportées (chaises comprises dans le prix de la table) */
  places?: number | Partial<Record<TypeEvenement, number>>;
  couleur?: CleCouleur;
  /** Pour les missions */
  role?: "decoration" | "eclairage" | "convivial";
}

export const CATALOGUE: DefElement[] = [
  { id: "table_ronde", categorie: "places", nom: "Table ronde", description: "Table ronde de 10 places, chaises et nappe comprises.", w: 2, h: 2, prix: 450, places: 10, couleur: "nappe" },
  { id: "table_rect", categorie: "places", nom: "Table rectangulaire", description: "Table de 6 places, chaises et nappe comprises.", w: 2, h: 1, prix: 320, places: 6, couleur: "nappe" },
  { id: "honneur", categorie: "places", nom: "Table d'honneur", description: "La table des mariés et de leurs proches, nappée et fleurie.", w: 3, h: 1, prix: 2500, places: { mariage: 6, fiancailles: 6, anniversaire: 6, babyshower: 4, pro: 0 }, couleur: "nappe" },
  { id: "arche", categorie: "decoration", nom: "Arche décorative", description: "Arche fleurie pour la cérémonie ou les photos.", w: 2, h: 1, prix: 4500, couleur: "fleurs", role: "decoration" },
  { id: "fleurs", categorie: "decoration", nom: "Composition florale", description: "Grand bouquet sur colonne pour habiller l'espace.", w: 1, h: 1, prix: 1200, couleur: "fleurs", role: "decoration" },
  { id: "guirlandes", categorie: "lumiere", nom: "Guirlandes lumineuses", description: "Mât et guirlandes d'ampoules pour une lumière chaleureuse.", w: 1, h: 1, prix: 900, couleur: "deco", role: "eclairage" },
  { id: "piste", categorie: "animation", nom: "Piste de danse", description: "Piste de 6 × 6 m, posée et éclairée.", w: 3, h: 3, prix: 6000, couleur: "deco", role: "convivial" },
  { id: "dj", categorie: "animation", nom: "Espace DJ", description: "Cabine, platines, sonorisation et DJ pour la soirée.", w: 2, h: 1, prix: 7000, couleur: "deco", role: "convivial" },
  { id: "photobooth", categorie: "animation", nom: "Photobooth", description: "Fond décoré, appareil et tirages instantanés.", w: 2, h: 1, prix: 3500, couleur: "fleurs", role: "convivial" },
  { id: "buffet", categorie: "gourmand", nom: "Buffet", description: "Buffet dressé et servi.", w: 3, h: 1, prix: 2500, prixParInvite: 150, couleur: "nappe" },
  { id: "bar", categorie: "gourmand", nom: "Bar à boissons", description: "Comptoir, barman, jus frais et boissons sans alcool.", w: 2, h: 1, prix: 1500, prixParInvite: 50, role: "convivial" },
  { id: "gateau", categorie: "gourmand", nom: "Pièce montée", description: "Gâteau à étages présenté sur sa table.", w: 1, h: 1, prix: 600, prixParInvite: 20, couleur: "fleurs" },
  { id: "lounge", categorie: "detente", nom: "Espace lounge", description: "Canapés, poufs et table basse pour se poser.", w: 2, h: 2, prix: 3000, couleur: "deco", role: "convivial" },
  { id: "nawar", categorie: "animation", nom: "Bar à parfums Nawar", description: "Chaque invité compose son parfum avec notre parfumeur, et repart avec son flacon. 50 parfums minimum.", w: 2, h: 1, prix: 0, prixParInvite: 80, minimumInvites: 50, role: "convivial" },
  { id: "hotesse", categorie: "personnel", nom: "Hôtesse d'accueil", description: "Accueil et placement des invités, vestiaire, orientation. Journée de 8 h.", w: 1, h: 1, prix: 900, couleur: "deco" },
  { id: "serveur", categorie: "personnel", nom: "Serveur / serveuse", description: "Service à table, cocktail et débarrassage. Journée de 8 h.", w: 1, h: 1, prix: 700, couleur: "deco" },
  { id: "maitre_hotel", categorie: "personnel", nom: "Maître d'hôtel", description: "Coordonne le service et l'équipe le jour J. Journée de 8 h.", w: 1, h: 1, prix: 1200, couleur: "deco" },
];

/** Option « centres de table » : posée sur toutes les tables, facturée par table. */
export const CENTRES_DE_TABLE = {
  nom: "Centres de table",
  description: "Un bouquet bas sur chaque table (ronde ou rectangulaire).",
  prixParTable: 180,
};

/** Intitulés adaptés au type d'événement (ce qui n'est pas listé garde le nom du catalogue). */
export const LIBELLES: Partial<Record<TypeEvenement, Partial<Record<TypeElement, { nom: string; description?: string }>>>> = {
  fiancailles: {
    honneur: { nom: "Table des fiancés", description: "La table des fiancés et de leurs familles." },
    gateau: { nom: "Gâteau des fiançailles" },
  },
  anniversaire: {
    honneur: { nom: "Table des hôtes", description: "La table de la personne fêtée et de ses proches." },
    gateau: { nom: "Gâteau d'anniversaire", description: "Gâteau à étages et bougies." },
    arche: { nom: "Arche de ballons et fleurs" },
  },
  babyshower: {
    honneur: { nom: "Table de la future maman", description: "Une table d'honneur douce pour la future maman et ses proches." },
    gateau: { nom: "Gâteau et douceurs" },
    piste: { nom: "Espace jeux", description: "Un espace dégagé pour les jeux et animations." },
    dj: { nom: "Ambiance musicale", description: "Sonorisation et playlist." },
  },
  pro: {
    honneur: { nom: "Scène et pupitre", description: "Estrade, pupitre et écran pour les prises de parole." },
    arche: { nom: "Mur photocall", description: "Mur décoré à vos couleurs pour les photos." },
    gateau: { nom: "Pause sucrée", description: "Mignardises et gâteaux présentés sur table." },
    piste: { nom: "Espace soirée", description: "Piste et éclairage pour la soirée d'entreprise." },
    buffet: { nom: "Buffet cocktail", description: "Buffet dressé pour le cocktail ou le déjeuner." },
  },
};

export const defElement = (id: TypeElement) => CATALOGUE.find((d) => d.id === id)!;

/** Nom et description d'un élément, adaptés au type d'événement et traduits dans la langue du site. */
export function libelle(id: TypeElement, type: TypeEvenement) {
  const d = defElement(id);
  const l = LIBELLES[type]?.[id];
  return { nom: tr(l?.nom ?? d.nom), description: tr(l?.description ?? d.description) };
}

// Textes de configuration traduits (le français reste la référence dans ce fichier)
export const nomTypeEv = (id: TypeEvenement) => tr(TYPES_EVENEMENT.find((t) => t.id === id)!.nom);
export const nomLieuEv = (id: Lieu) => tr(LIEUX.find((l) => l.id === id)!.nom);
export const nomAmbianceEv = (id: Ambiance) => tr(AMBIANCES.find((a) => a.id === id)!.nom);
export const mentionEstimation = () => tr(MENTION_ESTIMATION);

export function placesDe(id: TypeElement, type: TypeEvenement): number {
  const p = defElement(id).places;
  if (p == null) return 0;
  return typeof p === "number" ? p : p[type] ?? 0;
}

// ── Missions (complétude de la préparation, jamais les goûts) ───────────────
export const MISSIONS = [
  { id: "places", titre: "Prévoir assez de places pour vos invités" },
  { id: "ambiance", titre: "Créer une ambiance : au moins une décoration et un éclairage" },
  { id: "convivial", titre: "Ajouter une animation ou un espace convivial" },
] as const;
export type IdMission = (typeof MISSIONS)[number]["id"];

// ── Modèles prêts à l'emploi (point de départ modifiable) ──────────────────
export interface Modele {
  id: string; nom: string; description: string;
  reglages: { type: TypeEvenement; invites: number; budget: number; lieu: Lieu; ambiance: Ambiance };
  /** Éléments ajoutés à la disposition proposée */
  extras: TypeElement[];
}
export const MODELES: Modele[] = [
  { id: "mariage-oriental", nom: "Mariage oriental", description: "200 invités en salle, bordeaux et or, bar à parfums et équipe de service.",
    reglages: { type: "mariage", invites: 200, budget: 250000, lieu: "salle", ambiance: "orientale" },
    extras: ["nawar", "maitre_hotel", "serveur", "serveur", "serveur", "hotesse", "hotesse"] },
  { id: "mariage-jardin", nom: "Mariage champêtre", description: "120 invités en jardin, ambiance romantique et guirlandes lumineuses.",
    reglages: { type: "mariage", invites: 120, budget: 160000, lieu: "jardin", ambiance: "romantique" },
    extras: ["hotesse", "serveur", "serveur"] },
  { id: "anniversaire-boheme", nom: "Anniversaire bohème", description: "40 invités sur une terrasse, lounge et photobooth.",
    reglages: { type: "anniversaire", invites: 40, budget: 50000, lieu: "terrasse", ambiance: "boheme" },
    extras: ["hotesse"] },
  { id: "soiree-entreprise", nom: "Soirée d'entreprise", description: "150 invités, scène, cocktail, hôtesses d'accueil et bar à parfums.",
    reglages: { type: "pro", invites: 150, budget: 200000, lieu: "salle", ambiance: "moderne" },
    extras: ["nawar", "hotesse", "hotesse", "hotesse", "serveur", "serveur", "maitre_hotel"] },
];
