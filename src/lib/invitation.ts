/** Invitations digitales : modèles, couleurs (toujours modifiables) et textes. */
export type Langue = "fr" | "en" | "ar";
export type Ornement = "khatam" | "arche" | "cadre" | "fleur" | "filet" | "zellige";
export interface Couleurs { fond: string; enveloppe: string; papier: string; texte: string; accent: string }
import type { TypeEvenement } from "./evenements";
export interface InvitationReglages { /** fleurs photo posées sur la carte et l'enveloppe (grenat par défaut avec le modèle Grenat) */ fleurs?: "grenat" | "aucun"; /** occasion : sans valeur, c'est un mariage */ evenement?: TypeEvenement; /** questions ajoutées au formulaire de réponse (identifiants de QUESTIONS) */ questions?: string[]; cachet?: boolean; /** décor du haut de la carte (voir decors.ts) */ decor?: string; /** équipe du maillot et écusson (image réduite, données) */ club?: string; club_logo?: string; /** fermeture de l'enveloppe : cachet (défaut), ruban qui glisse, ou cachet qui se brise */ /** matière réelle du papier de l'enveloppe et doublure du rabat */ papier?: "gaufre" | "kraft"; doublure?: "sauge"; fermeture?: "cachet" | "ruban" | "brise" | "cire" | "cire-or" | "cire-brisee" | "ficelle" | "washi" | "tissu"; musique?: string; ouverture?: string; revelation?: string; modele?: string; couleurs?: Partial<Couleurs>; lieu_maps?: string; heure?: string; /** citations ou mots des mariés, affichés après le programme */ citations?: { texte: string; auteur?: string }[]; /** photos (images réduites, données) : réservé à l'administration, la limite de 4 Ko du côté des mariés ne les permet pas */ galerie?: string[]; programme?: { heure: string; titre: string; titre_ar?: string }[]; noms_ar?: string; lieu_ar?: string; message_ar?: string; police?: string }
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
    lieuTitre: "Le lieu", itineraire: "Itinéraire", agenda: "Ajouter à mon agenda", galerieTitre: "En images", programmeTitre: "Le programme", reponseTitre: "Votre réponse", avecVous: "Nous avons hâte de partager ce moment avec vous", pour: "Une invitation pour",
  },
  en: {
    gratter: "Scratch the heart to reveal the date", decouvrir: "Reveal", ouvrir: "Tap to open", ouvrirBouton: "Open the invitation", suivant: "Next", precedent: "Back", pageSur: "Page {n} of {m}", defilable: "Scrollable text", passer: "Skip the animation", rejouer: "Replay the opening", invite: "Joyfully invite you to their wedding", invites: "You are invited to the wedding of",
    cher: "Dear", a: "at", maps: "View the venue on Google Maps", locale: "en-GB",
    defiler: "Scroll down", repondre: "Reply now", repondreCourt: "Reply", alliances: "We are about to say yes", compte: "The big day is coming", aujourdhui: "It's today!", jours: "days", heures: "hours", minutes: "minutes", secondes: "seconds",
    lieuTitre: "The venue", itineraire: "Directions", agenda: "Add to my calendar", galerieTitre: "In pictures", programmeTitre: "The programme", reponseTitre: "Your reply", avecVous: "We can't wait to share this moment with you", pour: "An invitation for",
  },
  ar: {
    gratter: "اخدشوا القلب لاكتشاف التاريخ", decouvrir: "اكتشفوا", ouvrir: "المسوا لفتح الدعوة", ouvrirBouton: "افتحوا الدعوة", suivant: "التالي", precedent: "السابق", pageSur: "الصفحة {n} من {m}", defilable: "نص قابل للتمرير", passer: "تخطّي العرض", rejouer: "إعادة الفتح", invite: "يتشرفان بدعوتكم لحضور حفل زفافهما", invites: "يسعدنا دعوتكم لحضور حفل زفاف",
    cher: "مرحباً", a: "في", maps: "عرض المكان على خرائط جوجل", locale: "ar-MA-u-nu-latn-ca-gregory",
    defiler: "مرروا للأسفل", repondre: "الرد الآن", repondreCourt: "الرد", alliances: "سنقول نعم قريباً", compte: "اليوم الكبير يقترب", aujourdhui: "إنه اليوم!", jours: "أيام", heures: "ساعات", minutes: "دقائق", secondes: "ثوان",
    lieuTitre: "المكان", itineraire: "الاتجاهات", agenda: "أضف إلى التقويم", galerieTitre: "بالصور", programmeTitre: "البرنامج", reponseTitre: "ردكم", avecVous: "نتطلع لمشاركتكم هذه اللحظة", pour: "دعوة إلى",
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
  carte?: { fin: string; x: number; y: number; l: number; h: number; fond: string; r?: number; /** secondes : la carte est posée, on passe à notre texte sans attendre la fin du film */ stop?: number };
  /** Styles pour filtrer la bibliothèque. */
  styles: string[];
}
/** Formules commerciales : le contenu de la carte (programme, RSVP, livre d'or…) se règle à part ; la formule se déduit de la carte choisie. */
export type Formule = "classique" | "interactive" | "prestige";
export const FORMULES: { id: Formule; nom: string; prix: string; texte: string }[] = [
  { id: "classique", nom: "Classique", prix: "250 DH", texte: "Une carte élégante qui s'ouvre en animation, écrite à vos prénoms, avec la date et le lieu. Partage par WhatsApp." },
  { id: "interactive", nom: "Interactive", prix: "450 DH", texte: "L'ouverture en film, puis le programme, le plan Google Maps, le compte à rebours et la confirmation de présence de vos invités." },
  { id: "prestige", nom: "Prestige", prix: "dès 650 DH", texte: "Tout l'Interactive, avec l'histoire des mariés, le livre d'or et une invitation au prénom de chaque invité." },
];
const FILMS_INTERACTIVE = ["v-porte-blanche", "v-alhambra", "v-lakeside", "v-gardenia", "v-shoreline", "v-chateau-soir", "v-palace", "v-glasshouse"];
const PRESTIGE_750 = ["v-minuit", "v-neige", "v-oliveto", "v-azure"];
/** Classique : animations dessinées · Interactive : films partenaires · Prestige : nos films photoréalistes (650 DH, 750 DH pour les paysages en mouvement de caméra). */
export const formuleDe = (o: OuvertureDef): Formule => !o.video ? "classique" : FILMS_INTERACTIVE.includes(o.id) ? "interactive" : "prestige";
/** Tarif boutique : une carte à 250 DH (350 DH pour les paysages en mouvement de caméra), puis chaque option cochée à 50 DH. */
export const PRIX_CARTE = 250;
export const PRIX_OPTION = 50;
export const prixDe = (o: OuvertureDef): string => `${PRIX_CARTE + (PRESTIGE_750.includes(o.id) ? 100 : 0)} DH`;
export interface OptionCarte { id: string; nom: string; texte: string }
export const OPTIONS_CARTE: OptionCarte[] = [
  { id: "compte", nom: "Compte à rebours", texte: "Les jours, heures et minutes avant la fête." },
  { id: "coeur", nom: "Cœur à gratter", texte: "Vos invités grattent pour découvrir la date." },
  { id: "maps", nom: "Plan Google Maps", texte: "Un bouton qui ouvre l'itinéraire vers le lieu." },
  { id: "programme", nom: "Programme de la journée", texte: "Les horaires de chaque moment." },
  { id: "rsvp", nom: "Confirmation de présence", texte: "Vos invités répondent d'un geste, vous suivez les réponses." },
  { id: "livre", nom: "Livre d'or", texte: "Vos invités laissent leurs vœux." },
  { id: "musique", nom: "Musique", texte: "Une ambiance sonore à l'ouverture." },
  { id: "histoire", nom: "Notre histoire", texte: "Quelques lignes et photos sur votre histoire." },
  { id: "prenom", nom: "Invitation au prénom de chaque invité", texte: "Chaque invité reçoit sa carte personnalisée." },
];
/** Boutique : prix en nombre, options à la carte (grille tarifaire de la formule) et total de la commande. */
export const prixNombre = (o: OuvertureDef): number => parseInt(prixDe(o), 10);
export interface Extra { id: string; nom: string; prix: number; texte: string; sauf?: Formule[] }
export const EXTRAS: Extra[] = [
  { id: "modif", nom: "Modification supplémentaire", prix: 50, texte: "Un ajustement de plus après l'aperçu." },
];
/** Cartes vendues en boutique : seulement les créations photoréalistes (films et décors illustrés finement), pas les portes dessinées. */
export const ouverturesBoutique = (): OuvertureDef[] => OUVERTURES.filter((o) => o.video || o.carte);
export const extrasPour = (o: OuvertureDef): Extra[] => EXTRAS.filter((e) => !e.sauf?.includes(formuleDe(o)));
export const totalCommande = (o: OuvertureDef, ids: string[]): number => prixNombre(o) + extrasPour(o).filter((e) => ids.includes(e.id)).reduce((t, e) => t + e.prix, 0) + OPTIONS_CARTE.filter((x) => ids.includes(x.id)).length * PRIX_OPTION;
export const STYLES_OUVERTURE = ["Marocain", "Luxe", "Floral", "Moderne"];
const LICENCE_HEAVENT = "Création Heavent";
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
  { id: "v-minuit", nom: "Salle de bal", description: "Un dessin au trait doré s'éclaire : le lustre s'allume, les fenêtres rayonnent. 6 s.", duree: 5900, video: "/ouvertures/video/minuit.mp4", poster: "/ouvertures/video/minuit-poster.webp", licence: LICENCE_HEAVENT, styles: ["Luxe", "Moderne"] },
  { id: "v-neige", nom: "Chalet sous la neige", description: "Un dessin au crayon se peint en aquarelle : la caméra avance vers un chalet illuminé sous la neige. 6 s.", duree: 5900, video: "/ouvertures/video/neige.mp4", poster: "/ouvertures/video/neige-poster.webp", licence: LICENCE_HEAVENT, styles: ["Hiver", "Moderne"] },
  { id: "v-oliveto", nom: "Oliveraie", description: "La caméra suit un chemin d'oliviers qui se colore en aquarelle méditerranéenne. 6 s.", duree: 5900, video: "/ouvertures/video/oliveto.mp4", poster: "/ouvertures/video/oliveto-poster.webp", licence: LICENCE_HEAVENT, styles: ["Champêtre", "Floral"] },
  { id: "v-azure", nom: "Côte bleue", description: "Une arche donne sur la mer turquoise et les coupoles bleues, qui se peignent en aquarelle. 6 s.", duree: 5900, video: "/ouvertures/video/azure.mp4", poster: "/ouvertures/video/azure-poster.webp", licence: LICENCE_HEAVENT, styles: ["Marocain", "Moderne"] },
  { id: "v-carte-bordeaux", nom: "Cachet bordeaux", description: "Une enveloppe ivoire gaufrée, fermée d'un cachet de cire bordeaux. Le rabat s'ouvre, la carte s'élève. 6 s.", duree: 5900, video: "/ouvertures/video/vide-bordeaux.mp4", poster: "/ouvertures/video/vide-bordeaux-poster.webp", carte: { fin: "/ouvertures/video/vide-bordeaux-fin.webp", x: 0.14, y: 0.2, l: 0.73, h: 0.6, fond: "#e6e1d3", r: 178.1, stop: 2.6 }, licence: LICENCE_HEAVENT, styles: ["Luxe", "Classique"] },
  { id: "v-carte-or", nom: "Cachet doré", description: "Une enveloppe ivoire fermée d'un cachet doré. Le rabat s'ouvre, la carte s'élève. 6 s.", duree: 5900, video: "/ouvertures/video/vide-or.mp4", poster: "/ouvertures/video/vide-or-poster.webp", carte: { fin: "/ouvertures/video/vide-or-fin.webp", x: 0.17, y: 0.24, l: 0.66, h: 0.52, fond: "#e1dacf", r: 178.1, stop: 3.0 }, licence: LICENCE_HEAVENT, styles: ["Luxe", "Moderne"] },
  { id: "v-carte-ruban", nom: "Ruban rose", description: "Une enveloppe nouée d'un ruban rose. Le nœud se défait, la carte s'élève. 6 s.", duree: 5900, video: "/ouvertures/video/vide-ruban.mp4", poster: "/ouvertures/video/vide-ruban-poster.webp", carte: { fin: "/ouvertures/video/vide-ruban-fin.webp", x: 0.14, y: 0.21, l: 0.72, h: 0.58, fond: "#e8e3d7", r: 178.1, stop: 2.0 }, licence: LICENCE_HEAVENT, styles: ["Floral", "Doux"] },
  { id: "v-carte-zellige", nom: "Zellige émeraude", description: "Une enveloppe émeraude à motif zellige, cachet doré. Le rabat s'ouvre, la carte s'élève. 6 s.", duree: 5900, video: "/ouvertures/video/vide-zellige.mp4", poster: "/ouvertures/video/vide-zellige-poster.webp", carte: { fin: "/ouvertures/video/vide-zellige-fin.webp", x: 0.18, y: 0.24, l: 0.68, h: 0.52, fond: "#e8dcc7", r: 178.1, stop: 3.4 }, licence: LICENCE_HEAVENT, styles: ["Marocain", "Luxe"] },
  { id: "v-carte-lin", nom: "Cordon de lin", description: "Une enveloppe fermée d'un cordon de lin et d'une perle. Le cordon se dénoue, la carte s'élève. 6 s.", duree: 5900, video: "/ouvertures/video/vide-lin.mp4", poster: "/ouvertures/video/vide-lin-poster.webp", carte: { fin: "/ouvertures/video/vide-lin-fin.webp", x: 0.14, y: 0.18, l: 0.72, h: 0.58, fond: "#ded8d1", r: 178.1, stop: 3.2 }, licence: LICENCE_HEAVENT, styles: ["Champêtre", "Moderne"] },
  { id: "v-carte-nuit", nom: "Art déco nuit", description: "Une enveloppe bleu nuit art déco, cachet doré. Le rabat s'ouvre, la carte s'élève. 6 s.", duree: 5900, video: "/ouvertures/video/vide-nuit.mp4", poster: "/ouvertures/video/vide-nuit-poster.webp", carte: { fin: "/ouvertures/video/vide-nuit-fin.webp", x: 0.09, y: 0.14, l: 0.82, h: 0.62, fond: "#ab9f87", r: 178.1, stop: 3.0 }, licence: LICENCE_HEAVENT, styles: ["Luxe", "Moderne"] },
  { id: "v-carte-perle", nom: "Perle et givre", description: "Une enveloppe givrée fermée d'un cachet perle et d'une branche de sapin. La carte s'élève. 6 s.", duree: 5900, video: "/ouvertures/video/vide-perle.mp4", poster: "/ouvertures/video/vide-perle-poster.webp", carte: { fin: "/ouvertures/video/vide-perle-fin.webp", x: 0.11, y: 0.22, l: 0.78, h: 0.55, fond: "#dcdde5", r: 178.1, stop: 3.2 }, licence: LICENCE_HEAVENT, styles: ["Hiver", "Luxe"] },
  { id: "v-carte-minuit", nom: "Bleu nuit et bougies", description: "Une enveloppe bleu nuit à la lueur des bougies. La carte s'illumine d'or. 6 s.", duree: 5900, video: "/ouvertures/video/vide-minuit.mp4", poster: "/ouvertures/video/vide-minuit-poster.webp", carte: { fin: "/ouvertures/video/vide-minuit-fin.webp", x: 0.16, y: 0.18, l: 0.68, h: 0.49, fond: "#fce8c6", r: 178.1, stop: 3.4 }, licence: LICENCE_HEAVENT, styles: ["Luxe", "Moderne"] },
  { id: "v-carte-sauge", nom: "Olivier et lin", description: "Une enveloppe vert sauge nouée d'un cordon, sous le soleil d'une oliveraie. 6 s.", duree: 5900, video: "/ouvertures/video/vide-sauge.mp4", poster: "/ouvertures/video/vide-sauge-poster.webp", carte: { fin: "/ouvertures/video/vide-sauge-fin.webp", x: 0.16, y: 0.2, l: 0.68, h: 0.56, fond: "#f7f1e8", r: 178.1, stop: 3.4 }, licence: LICENCE_HEAVENT, styles: ["Champêtre", "Floral"] },
  { id: "v-carte-cobalt", nom: "Cobalt et coquillage", description: "Une enveloppe blanche bordée de carreaux bleus, cachet coquillage. La carte se déplie. 6 s.", duree: 5900, video: "/ouvertures/video/vide-cobalt.mp4", poster: "/ouvertures/video/vide-cobalt-poster.webp", carte: { fin: "/ouvertures/video/vide-cobalt-fin.webp", x: 0.1, y: 0.16, l: 0.8, h: 0.58, fond: "#dcdee2", r: 178.1, stop: 3.3 }, licence: LICENCE_HEAVENT, styles: ["Marocain", "Moderne"] },
];
export const REVELATIONS: { id: string; nom: string; description: string; pour?: TypeEvenement[] }[] = [
  { id: "aucune", nom: "Aucune", description: "L'invitation s'affiche juste après l'ouverture." },
  { id: "coeur", nom: "Cœur à gratter", description: "L'invité gratte un cœur doré pour découvrir la date.", pour: ["mariage"] },
  { id: "medaillon", nom: "Médaillon à gratter", description: "L'invité gratte un médaillon doré pour découvrir la date.", pour: ["fiancailles", "henne", "naissance", "bapteme", "circoncision", "iftar", "diplome", "mariage-civil"] },
  { id: "bougies", nom: "Bougies à souffler", description: "L'invité maintient le doigt pour souffler les bougies : la date apparaît.", pour: ["anniversaire", "anniversaire-enfant"] },
  { id: "ballon", nom: "Ballon à crever", description: "L'invité touche le ballon, il éclate et dévoile la date.", pour: ["anniversaire-enfant", "baby-shower"] },
  { id: "lanterne", nom: "Lanterne à allumer", description: "L'invité touche la lanterne : elle s'allume et dévoile la date.", pour: ["iftar", "naissance", "henne"] },
];
export const revelationsPour = (ev?: TypeEvenement) => REVELATIONS.filter((r) => !r.pour || r.pour.includes(ev ?? "mariage"));
export const FERMETURES: { id: "cachet" | "ruban" | "brise" | "cire" | "cire-or" | "cire-brisee" | "ficelle" | "washi" | "tissu"; nom: string; description: string }[] = [
  { id: "cachet", nom: "Cachet de cire", description: "Il se détache quand l'invité touche l'enveloppe." },
  { id: "ruban", nom: "Ruban", description: "Un ruban noué glisse de l'enveloppe, puis le rabat s'ouvre." },
  { id: "brise", nom: "Cachet brisé", description: "Le cachet se fend en deux avant l'ouverture." },
  { id: "cire", nom: "Cire (photo)", description: "Un vrai cachet de cire bordeaux, avec l'initiale en relief, qui se détache à l'ouverture." },
  { id: "cire-or", nom: "Cire dorée (photo)", description: "Un vrai cachet doré, avec l'initiale en relief." },
  { id: "ficelle", nom: "Ficelle", description: "Une ficelle de lin nouée glisse de l'enveloppe." },
  { id: "washi", nom: "Ruban adhésif washi", description: "Un ruban adhésif décoratif se décolle du rabat." },
  { id: "tissu", nom: "Languette de tissu", description: "Une languette de lin qu'on tire pour ouvrir." },
  { id: "cire-brisee", nom: "Cire brisée (photo)", description: "Le vrai cachet se brise en deux, les moitiés tombent." },
];
export const PAPIERS: { id: "lisse" | "gaufre" | "kraft"; nom: string }[] = [{ id: "lisse", nom: "Papier lisse" }, { id: "gaufre", nom: "Gaufré feuillage" }, { id: "kraft", nom: "Kraft" }];
/** Description pour la boutique : sans la durée du film (« 6 s. »). */
export const descriptionVente = (o: { description: string }) => o.description.replace(/\s*\d+(,\d+)? s\.?$/, "");
export const ouvertureDe = (id?: string) => OUVERTURES.find((o) => o.id === id) ?? OUVERTURES[0];
export const revelationDe = (id?: string) => REVELATIONS.find((r) => r.id === id) ?? REVELATIONS[0];

/** Lien « Ajouter à Google Agenda » : avec une heure connue l'événement dure 4 h, sinon c'est une journée entière. */
export function lienAgenda({ titre, date, debutMs, lieu }: { titre: string; date: string; debutMs?: number | null; lieu?: string }): string {
  const z = (ms: number) => new Date(ms).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const jour = (iso: string, plus = 0) => { const d = new Date(`${iso}T12:00:00Z`); d.setUTCDate(d.getUTCDate() + plus); return d.toISOString().slice(0, 10).replace(/-/g, ""); };
  const dates = debutMs ? `${z(debutMs)}/${z(debutMs + 4 * 3600000)}` : `${jour(date)}/${jour(date, 1)}`;
  const q = new URLSearchParams({ action: "TEMPLATE", text: titre, dates, ...(lieu ? { location: lieu } : {}) });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}

/** Déplace un élément d'une liste (réordonner le programme, les photos, les citations). */
export function deplacer<T>(liste: T[], de: number, vers: number): T[] {
  if (de === vers || de < 0 || vers < 0 || de >= liste.length || vers >= liste.length) return liste;
  const c = liste.slice(); const [x] = c.splice(de, 1); c.splice(vers, 0, x); return c;
}
