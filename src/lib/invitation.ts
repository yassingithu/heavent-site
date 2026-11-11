/** Invitations digitales : modèles, couleurs (toujours modifiables) et textes. */
export type Langue = "fr" | "en" | "ar";
export type Ornement = "khatam" | "arche" | "cadre" | "fleur" | "filet" | "zellige";
export interface Couleurs { fond: string; enveloppe: string; papier: string; texte: string; accent: string }
import type { TypeEvenement } from "./evenements";
export interface InvitationReglages { /** occasion : sans valeur, c'est un mariage */ evenement?: TypeEvenement; /** questions ajoutées au formulaire de réponse (identifiants de QUESTIONS) */ questions?: string[]; cachet?: boolean; /** décor du haut de la carte (voir decors.ts) */ decor?: string; /** équipe du maillot et écusson (image réduite, données) */ club?: string; club_logo?: string; /** fermeture de l'enveloppe : cachet (défaut), ruban qui glisse, ou cachet qui se brise */ fermeture?: "cachet" | "ruban" | "brise"; musique?: string; ouverture?: string; revelation?: string; modele?: string; couleurs?: Partial<Couleurs>; lieu_maps?: string; heure?: string; programme?: { heure: string; titre: string; titre_ar?: string }[]; noms_ar?: string; lieu_ar?: string; message_ar?: string; police?: string }
/** Polices des prénoms au choix (toutes déjà hébergées : aucun chargement en plus) */
export const POLICES: { id: string; nom: string; css: string }[] = [
  { id: "calligraphie", nom: "Calligraphie", css: '"Pinyon Script", "Snell Roundhand", cursive' },
  { id: "classique", nom: "Classique", css: '"Gloock", Didot, Georgia, serif' },
  { id: "elegante", nom: "Élégante", css: '"Cormorant Garamond", Georgia, serif' },
];
export const policeDe = (id?: string) => POLICES.find((p) => p.id === id) ?? POLICES[0];

/** Images à précharger pour qu'une ouverture à calques démarre sans à-coup (la carte finale comprise). */
export function imagesOuverture(o: OuvertureDef): string[] {
  if (o.video || /^perso-/.test(o.id)) return [];
  const base = `/ouvertures/${o.base ?? o.id}`;
  return [`${base}-g.webp`, `${base}-d.webp`, ...(o.cadre ? [`${base}-cadre.webp`] : []), ...(o.carte ? [o.carte.fin] : [])];
}

/** `pour` : occasions auxquelles le modèle est proposé (vide = toutes). Les teintes poudrées restent aux mariages. */
export interface Modele { id: string; nom: string; description: string; ornement: Ornement; couleurs: Couleurs; pour?: TypeEvenement[] }

export const MODELES: Modele[] = [
  { id: "fleur-oranger", nom: "Fleur d'oranger", description: "Rose poudré, doux et lumineux", ornement: "fleur", pour: ["mariage"],
    couleurs: { fond: "#F2E2DA", enveloppe: "#E8C7BC", papier: "#FFFBF6", texte: "#4A3731", accent: "#B07A68" } },
  { id: "or-ivoire", nom: "Or & ivoire", description: "Classique, noir et or", ornement: "khatam",
    couleurs: { fond: "#141414", enveloppe: "#2A2622", papier: "#F7F1E3", texte: "#2A2420", accent: "#B5923A" } },
  { id: "emeraude", nom: "Émeraude", description: "Vert profond et zellige", ornement: "zellige",
    couleurs: { fond: "#173F36", enveloppe: "#1F5A4C", papier: "#F6F0E2", texte: "#1B2A25", accent: "#B79A45" } },
  { id: "majorelle", nom: "Bleu Majorelle", description: "Bleu intense, éclat d'or", ornement: "arche",
    couleurs: { fond: "#1E2C6B", enveloppe: "#2B3F8C", papier: "#FAF6EC", texte: "#1A2250", accent: "#C5A24A" } },
  { id: "sable", nom: "Sable & terre", description: "Beige chaud, terre cuite", ornement: "cadre",
    couleurs: { fond: "#E9DCC6", enveloppe: "#D8BFA0", papier: "#FFFBF2", texte: "#4B3A2C", accent: "#9C4A2C" } },
  { id: "grenat", nom: "Grenat & or", description: "Rouge profond, raffiné et chaleureux", ornement: "khatam",
    couleurs: { fond: "#3A1420", enveloppe: "#5A1F32", papier: "#FBF4EE", texte: "#3A1F27", accent: "#C9A25B" } },
  /* Modèles des autres occasions : un seul accent chacun, dans l'univers noir, or et crème */
  { id: "prune", nom: "Prune & champagne", description: "Velours prune, or champagne", ornement: "khatam", pour: ["anniversaire", "anniversaire-enfant"],
    couleurs: { fond: "#2A0F20", enveloppe: "#4A1F38", papier: "#FAF4EA", texte: "#2E1726", accent: "#B8975A" } },
  { id: "olivier", nom: "Olivier & sauge", description: "Sauge, ivoire et or doux", ornement: "fleur", pour: ["baby-shower"],
    couleurs: { fond: "#DDE3D3", enveloppe: "#BCC8AC", papier: "#FCFBF5", texte: "#2F3A2A", accent: "#6F8452" } },
  { id: "ivoire-vert", nom: "Ivoire & vert profond", description: "Sobre, zellige et or mat", ornement: "zellige", pour: ["naissance"],
    couleurs: { fond: "#E9E2D0", enveloppe: "#1F4A3C", papier: "#FBF8EF", texte: "#1F2A24", accent: "#8C6D22" } },
  { id: "ivoire-nuit", nom: "Ivoire & bleu nuit", description: "Recueilli, bleu nuit et or doux", ornement: "cadre", pour: ["bapteme"],
    couleurs: { fond: "#F1ECE0", enveloppe: "#101B30", papier: "#FBF8F1", texte: "#16213A", accent: "#9C8650" } },
  { id: "nuit-lanterne", nom: "Nuit & lanterne", description: "Bleu nuit, or de lanterne", ornement: "khatam", pour: ["iftar"],
    couleurs: { fond: "#0B1424", enveloppe: "#1B2E52", papier: "#F4F1EA", texte: "#16213A", accent: "#B89A4E" } },
];

/** Modèles proposés pour une occasion (les mariages gardent toute la bibliothèque d'origine) */
export const modelesPour = (ev?: TypeEvenement) => MODELES.filter((m) => !m.pour || m.pour.includes(ev ?? "mariage"));

/** Palettes toutes prêtes : un clic applique les 5 couleurs (le modèle reste le même) */
export const PALETTES: { id: string; nom: string; couleurs: Couleurs; pour?: TypeEvenement[] }[] = [
  { id: "poudre", nom: "Rose poudré", couleurs: MODELES[0].couleurs, pour: ["mariage"] },
  { id: "noir-or", nom: "Noir & or", couleurs: MODELES[1].couleurs },
  { id: "vert", nom: "Vert émeraude", couleurs: MODELES[2].couleurs },
  { id: "bleu", nom: "Bleu Majorelle", couleurs: MODELES[3].couleurs },
  { id: "terre", nom: "Terre cuite", couleurs: MODELES[4].couleurs },
  { id: "grenat", nom: "Grenat & or", couleurs: MODELES[5].couleurs },
  { id: "ivoire", nom: "Ivoire & or", couleurs: { fond: "#F4EFE3", enveloppe: "#E4D49A", papier: "#FBF6E9", texte: "#2F2A20", accent: "#8C6D22" } },
  { id: "sauge", nom: "Sauge", couleurs: { fond: "#DDE3D3", enveloppe: "#BCC8AC", papier: "#FCFBF5", texte: "#2F3A2A", accent: "#7B8F5E" } },
  { id: "marine", nom: "Bleu nuit", couleurs: { fond: "#101B30", enveloppe: "#1B2E52", papier: "#F4F1EA", texte: "#16213A", accent: "#C9B27A" } },
  { id: "peche", nom: "Pêche", couleurs: { fond: "#F8E4D6", enveloppe: "#F0C7AE", papier: "#FFFAF5", texte: "#54382B", accent: "#D07C58" }, pour: ["mariage"] },
  { id: "lavande", nom: "Lavande", couleurs: { fond: "#E7E1F0", enveloppe: "#CFC4E3", papier: "#FFFCFF", texte: "#3F3552", accent: "#8A6FB5" }, pour: ["mariage"] },
  { id: "prune", nom: "Prune & champagne", couleurs: MODELES[6].couleurs, pour: ["anniversaire", "anniversaire-enfant"] },
];
export const palettesPour = (ev?: TypeEvenement) => PALETTES.filter((p) => !p.pour || p.pour.includes(ev ?? "mariage"));

export const CHAMPS_COULEUR: { cle: keyof Couleurs; libelle: string; aide: string }[] = [
  { cle: "fond", libelle: "Fond de la page", aide: "Derrière l'enveloppe" },
  { cle: "enveloppe", libelle: "Enveloppe", aide: "Couleur de l'enveloppe" },
  { cle: "papier", libelle: "Papier du faire-part", aide: "La carte qui sort de l'enveloppe" },
  { cle: "texte", libelle: "Texte", aide: "Noms, date et lieu" },
  { cle: "accent", libelle: "Détails (or, fleurs, boutons)", aide: "Cachet, ornements, bouton" },
];

export const modeleDe = (id?: string) => MODELES.find((m) => m.id === id) ?? MODELES[1];

const HEX = /^#[0-9a-f]{6}$/i;

const lum = (hex: string) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
export const contraste = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};
/** Texte noir ou blanc, le plus lisible sur la couleur donnée */
export const surCouleur = (fond: string) => (contraste("#141414", fond) >= contraste("#FFFFFF", fond) ? "#141414" : "#FFFFFF");

/** Couleurs finales : valeurs invalides remplacées par celles du modèle, et texte toujours lisible sur le papier */
export function couleursDe(r?: InvitationReglages | null): Couleurs {
  const base = modeleDe(r?.modele).couleurs;
  const c = { ...base };
  (Object.keys(base) as (keyof Couleurs)[]).forEach((k) => {
    const v = r?.couleurs?.[k];
    if (typeof v === "string" && HEX.test(v)) c[k] = v;
  });
  if (contraste(c.texte, c.papier) < 4.5) c.texte = surCouleur(c.papier);
  if (contraste(c.accent, c.papier) < 2) c.accent = c.texte;
  return c;
}

const MAPS_OK = /^https:\/\/(maps\.app\.goo\.gl|goo\.gl\/maps|www\.google\.[a-z.]+\/maps|maps\.google\.[a-z.]+|google\.[a-z.]+\/maps)(\/|\?|$)/i;
/** Lien Google Maps : celui des mariés s'il est sûr, sinon une recherche à partir du nom du lieu */
export function lienMaps(r: InvitationReglages | null | undefined, lieu?: string | null): string | null {
  const l = r?.lieu_maps?.trim();
  if (l && MAPS_OK.test(l)) return l;
  if (lieu?.trim()) return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lieu.trim())}`;
  return null;
}

export const TEXTES = {
  fr: {
    gratter: "Grattez le cœur pour découvrir la date", decouvrir: "Découvrir", ouvrir: "Touchez pour ouvrir", ouvrirBouton: "Ouvrir l'invitation", suivant: "Suivant", precedent: "Précédent", pageSur: "Page {n} sur {m}", defilable: "Texte à faire défiler", passer: "Passer l'animation", rejouer: "Revoir l'ouverture", invite: "Ont la joie de vous convier à leur mariage", invites: "Vous êtes invité(e) au mariage de",
    cher: "Bonjour", a: "à", maps: "Voir le lieu sur Google Maps", locale: "fr-FR",
    defiler: "Faites défiler", repondre: "Répondre maintenant", repondreCourt: "Répondre", alliances: "Nous allons nous dire oui", compte: "Le grand jour approche", aujourdhui: "C'est aujourd'hui !", jours: "jours", heures: "heures", minutes: "minutes", secondes: "secondes",
    lieuTitre: "Le lieu", itineraire: "Itinéraire", programmeTitre: "Le programme", reponseTitre: "Votre réponse", avecVous: "Nous avons hâte de partager ce moment avec vous", pour: "Une invitation pour",
  },
  en: {
    gratter: "Scratch the heart to reveal the date", decouvrir: "Reveal", ouvrir: "Tap to open", ouvrirBouton: "Open the invitation", suivant: "Next", precedent: "Back", pageSur: "Page {n} of {m}", defilable: "Scrollable text", passer: "Skip the animation", rejouer: "Replay the opening", invite: "Joyfully invite you to their wedding", invites: "You are invited to the wedding of",
    cher: "Dear", a: "at", maps: "View the venue on Google Maps", locale: "en-GB",
    defiler: "Scroll down", repondre: "Reply now", repondreCourt: "Reply", alliances: "We are about to say yes", compte: "The big day is coming", aujourdhui: "It's today!", jours: "days", heures: "hours", minutes: "minutes", secondes: "seconds",
    lieuTitre: "The venue", itineraire: "Directions", programmeTitre: "The programme", reponseTitre: "Your reply", avecVous: "We can't wait to share this moment with you", pour: "An invitation for",
  },
  ar: {
    gratter: "اخدشوا القلب لاكتشاف التاريخ", decouvrir: "اكتشفوا", ouvrir: "المسوا لفتح الدعوة", ouvrirBouton: "افتحوا الدعوة", suivant: "التالي", precedent: "السابق", pageSur: "الصفحة {n} من {m}", defilable: "نص قابل للتمرير", passer: "تخطّي العرض", rejouer: "إعادة الفتح", invite: "يتشرفان بدعوتكم لحضور حفل زفافهما", invites: "يسعدنا دعوتكم لحضور حفل زفاف",
    cher: "مرحباً", a: "في", maps: "عرض المكان على خرائط جوجل", locale: "ar-MA-u-nu-latn-ca-gregory",
    defiler: "مرروا للأسفل", repondre: "الرد الآن", repondreCourt: "الرد", alliances: "سنقول نعم قريباً", compte: "اليوم الكبير يقترب", aujourdhui: "إنه اليوم!", jours: "أيام", heures: "ساعات", minutes: "دقائق", secondes: "ثوان",
    lieuTitre: "المكان", itineraire: "الاتجاهات", programmeTitre: "البرنامج", reponseTitre: "ردكم", avecVous: "نتطلع لمشاركتكم هذه اللحظة", pour: "دعوة إلى",
  },
} as const;

export const initiales = (noms: string) => {
  const m = noms.split(/\s+(?:et|and|و)\s+|\s*&\s*/i).map((s) => s.trim().charAt(0).toUpperCase()).filter(Boolean);
  return m.length >= 2 ? `${m[0]} & ${m[1]}` : (m[0] ?? "✦");
};

/** Ouvertures et révélations : chacune se combine librement avec n'importe quel modèle de couleurs. */
export interface OuvertureDef {
  id: string; nom: string; description: string; duree: number;
  /** Ouverture vidéo : fichier, affiche d'attente (1re image) et licence. Ajouter une entrée ici suffit : elle apparaît dans l'éditeur. */
  video?: string; poster?: string; licence?: string;
  /** Vidéos qui finissent sur une carte vierge : la dernière image devient la carte et le texte s'écrit directement dessus (zone du texte en fractions de l'image). */
  /** Position verticale du sceau et du bouton sur un film, en % de la hauteur (50 par défaut). */
  sceauY?: number;
  /** décor à cadre fixe : image `<id>-cadre.webp` posée devant les battants */
  cadre?: boolean;
  /** préfixe des fichiers d'images quand il diffère de l'identifiant (ex. `rose` pour rose-g.webp) */
  base?: string;
  /** film qui finit sur une carte vierge : zoom progressif (centre x,y en fractions, échelle s, début `de` en secondes) avant le fondu vers notre carte */
  zoom?: { x: number; y: number; s: number; de: number; /** secondes : on passe à la carte à ce moment du film (sans attendre la fin) */ fin: number };
  carte?: { fin: string; x: number; y: number; l: number; h: number; fond: string; r?: number };
  /** Styles pour filtrer la bibliothèque. */
  styles: string[];
}
export const STYLES_OUVERTURE = ["Marocain", "Luxe", "Floral", "Moderne"];
const LICENCE_PARTENAIRE = "Ressource tierce, utilisée avec l'accord de son propriétaire";
export const OUVERTURES: OuvertureDef[] = [
  { id: "enveloppe", nom: "Enveloppe", description: "Le faire-part sort de son enveloppe cachetée.", duree: 2450, styles: ["Marocain", "Moderne"] },
  { id: "marocaine", nom: "Porte marocaine", description: "Deux battants en bois sculpté sous un arc, cloutés de laiton.", duree: 1750, styles: ["Marocain"] },
  { id: "fer", nom: "Portail en fer forgé", description: "Un portail ajouré à arabesques : on devine déjà la fête derrière.", duree: 1750, styles: ["Marocain", "Luxe"] },
  { id: "artdeco", nom: "Portes Art déco", description: "Portes noires et or, éventail rayonnant, un rai de lumière entre les battants.", duree: 1800, styles: ["Luxe", "Moderne"] },
  { id: "florale", nom: "Couverture florale", description: "Deux volets en papier aquarellé, scellés d'un cachet de cire, qui s'ouvrent en livre.", duree: 1750, styles: ["Floral", "Moderne"] },
  { id: "moucharabieh", nom: "Moucharabieh", description: "Deux panneaux de bois ajouré aux étoiles de laiton coulissent et laissent passer la lumière.", duree: 1800, styles: ["Marocain", "Luxe"] },
  { id: "zellige", nom: "Zellige", description: "Deux panneaux de zellige bleu, vert et terre cuite s'écartent sur une lumière dorée.", duree: 1800, styles: ["Marocain", "Moderne"] },
  { id: "riad", nom: "Riad", description: "Une porte de cèdre sculpté aux clous de laiton s'ouvre sur le patio du riad : fontaine, orangers et lanternes au crépuscule.", duree: 2200, styles: ["Marocain", "Luxe"] },
  { id: "rose-imperiale", base: "rose", nom: "Rose Impériale", description: "Deux battants de nacre rose poudré, brodés de fleurs, s'ouvrent sur le cadre intérieur où s'écrit votre invitation.", duree: 2600, styles: ["Floral", "Luxe"], carte: { fin: "/ouvertures/rose-fond.webp", x: 0.315, y: 0.23, l: 0.37, h: 0.515, fond: "#f4e3e2", r: 177.7 } },
  { id: "riad-cedre", cadre: true, nom: "Porte du riad de cèdre", description: "Deux battants de cèdre sculpté s'ouvrent sous l'arche de zellige, puis la caméra avance jusqu'à la carte.", duree: 3500, styles: ["Marocain","Floral"], carte: { fin: "/ouvertures/riad-cedre-fond.webp", x: 0.14, y: 0.16, l: 0.72, h: 0.68, fond: "#f8eddd", r: 150 } },
  { id: "palais-fer", cadre: true, nom: "Palais de fer forgé", description: "Un portail de fer noir et d'or s'ouvre entre les colonnes de marbre ; la caméra avance jusqu'à la carte.", duree: 3500, styles: ["Luxe","Floral"], carte: { fin: "/ouvertures/palais-fer-fond.webp", x: 0.14, y: 0.16, l: 0.72, h: 0.68, fond: "#f9f4ed", r: 150 } },
  { id: "rideaux", nom: "Rideaux", description: "Deux pans de tissu drapé qui s'écartent comme au théâtre.", duree: 1800, styles: ["Luxe", "Marocain"] },
  { id: "v-porte-blanche", nom: "Portes blanches", description: "Deux portes de dentelle et de roses en relief, nouées d'un ruban, qui s'ouvrent sur un décor de fête. 6 s.", duree: 5700, zoom: { x: 0.51, y: 0.56, s: 2.6, de: 2.9, fin: 4.7 }, video: "/ouvertures/video/porte-blanche.mp4", poster: "/ouvertures/video/porte-blanche-poster.webp", licence: LICENCE_PARTENAIRE, styles: ["Luxe", "Floral"] },
  { id: "v-alhambra", nom: "Porte andalouse", description: "Une porte cloutée sous un arc en fer à cheval s'ouvre sur un patio et son bassin. 8 s.", duree: 8000, video: "/ouvertures/video/alhambra.mp4", poster: "/ouvertures/video/alhambra-poster.webp", licence: LICENCE_PARTENAIRE, styles: ["Marocain", "Luxe"] },
  { id: "v-lakeside", nom: "Grille sur le lac", description: "Une grille en fer sous une glycine s'ouvre sur un jardin et le lac. 8 s.", duree: 8000, video: "/ouvertures/video/lakeside.mp4", poster: "/ouvertures/video/lakeside-poster.webp", licence: LICENCE_PARTENAIRE, styles: ["Moderne", "Luxe"] },
  { id: "v-gardenia", nom: "Pétales de papier", description: "Des pétales blancs en relief s'écartent sur un fond crème. 5 s.", duree: 5100, zoom: { x: 0.48, y: 0.5, s: 1, de: 2.2, fin: 3.7 }, video: "/ouvertures/video/gardenia.mp4", poster: "/ouvertures/video/gardenia-poster.webp", licence: LICENCE_PARTENAIRE, styles: ["Floral", "Moderne"] },
  { id: "v-shoreline", nom: "Étoile de mer", description: "Le cachet étoile de mer se détache et l'enveloppe s'ouvre. 2,5 s.", duree: 2500, video: "/ouvertures/video/shoreline.mp4", poster: "/ouvertures/video/shoreline-poster.webp", licence: LICENCE_PARTENAIRE, styles: ["Moderne"] },
  { id: "v-chateau-soir", nom: "Château au crépuscule", description: "Une grille en fer s'ouvre sur les jardins d'un château illuminé. 8 s.", duree: 8000, video: "/ouvertures/video/chateau-soir.mp4", poster: "/ouvertures/video/chateau-soir-poster.webp", licence: LICENCE_PARTENAIRE, styles: ["Luxe", "Moderne"] },
  { id: "v-palace", nom: "Portail du palais", description: "Un portail doré s'ouvre sur un château et son miroir d'eau. 4 s.", duree: 4100, video: "/ouvertures/video/palace.mp4", poster: "/ouvertures/video/palace-poster.webp", licence: LICENCE_PARTENAIRE, styles: ["Luxe", "Moderne"] },
  { id: "v-glasshouse", nom: "Verrière embuée", description: "La buée d'une verrière se dissipe sur un jardin lumineux. 8 s.", duree: 8000, video: "/ouvertures/video/glasshouse.mp4", poster: "/ouvertures/video/glasshouse-poster.webp", licence: LICENCE_PARTENAIRE, styles: ["Moderne", "Floral"] },
  { id: "v-minuit", nom: "Salle de bal", description: "Un dessin au trait doré s'éclaire : lustre, escaliers, lumières. 5 s.", duree: 5000, video: "/ouvertures/video/minuit.mp4", poster: "/ouvertures/video/minuit-poster.webp", licence: LICENCE_PARTENAIRE, styles: ["Luxe", "Moderne"] },
  { id: "v-neige", nom: "Chalet sous la neige", description: "Une aquarelle d'hiver se peint sous vos yeux. 5 s.", duree: 5000, video: "/ouvertures/video/neige.mp4", poster: "/ouvertures/video/neige-poster.webp", licence: LICENCE_PARTENAIRE, styles: ["Moderne"] },
  { id: "v-oliveto", nom: "Oliveraie", description: "Un chemin d'oliviers se colore, aquarelle méditerranéenne. 5 s.", duree: 5000, video: "/ouvertures/video/oliveto.mp4", poster: "/ouvertures/video/oliveto-poster.webp", licence: LICENCE_PARTENAIRE, styles: ["Moderne", "Floral"] },
  { id: "v-azure", nom: "Côte bleue", description: "Une arche donne sur la mer et les coupoles bleues. 5 s.", duree: 5000, video: "/ouvertures/video/azure.mp4", poster: "/ouvertures/video/azure-poster.webp", licence: LICENCE_PARTENAIRE, styles: ["Moderne"] },
];
export const REVELATIONS: { id: string; nom: string; description: string; pour?: TypeEvenement[] }[] = [
  { id: "aucune", nom: "Aucune", description: "L'invitation s'affiche juste après l'ouverture." },
  { id: "coeur", nom: "Cœur à gratter", description: "L'invité gratte un cœur doré pour découvrir la date.", pour: ["mariage"] },
];
export const revelationsPour = (ev?: TypeEvenement) => REVELATIONS.filter((r) => !r.pour || r.pour.includes(ev ?? "mariage"));
export const FERMETURES: { id: "cachet" | "ruban" | "brise"; nom: string; description: string }[] = [
  { id: "cachet", nom: "Cachet de cire", description: "Il se détache quand l'invité touche l'enveloppe." },
  { id: "ruban", nom: "Ruban", description: "Un ruban noué glisse de l'enveloppe, puis le rabat s'ouvre." },
  { id: "brise", nom: "Cachet brisé", description: "Le cachet se fend en deux avant l'ouverture." },
];
export const ouvertureDe = (id?: string) => OUVERTURES.find((o) => o.id === id) ?? OUVERTURES[0];
export const revelationDe = (id?: string) => REVELATIONS.find((r) => r.id === id) ?? REVELATIONS[0];
