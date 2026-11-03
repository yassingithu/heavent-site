/** Invitations digitales : modèles, couleurs (toujours modifiables) et textes. */
export type Langue = "fr" | "en" | "ar";
export type Ornement = "khatam" | "arche" | "cadre" | "fleur" | "filet" | "zellige";
export interface Couleurs { fond: string; enveloppe: string; papier: string; texte: string; accent: string }
export interface InvitationReglages { modele?: string; couleurs?: Partial<Couleurs>; lieu_maps?: string; heure?: string; programme?: { heure: string; titre: string; titre_ar?: string }[]; noms_ar?: string; lieu_ar?: string; message_ar?: string }
export interface Modele { id: string; nom: string; description: string; ornement: Ornement; couleurs: Couleurs }

export const MODELES: Modele[] = [
  { id: "fleur-oranger", nom: "Fleur d'oranger", description: "Rose poudré, doux et lumineux", ornement: "fleur",
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
];

/** Palettes toutes prêtes : un clic applique les 5 couleurs (le modèle reste le même) */
export const PALETTES: { id: string; nom: string; couleurs: Couleurs }[] = [
  { id: "poudre", nom: "Rose poudré", couleurs: MODELES[0].couleurs },
  { id: "noir-or", nom: "Noir & or", couleurs: MODELES[1].couleurs },
  { id: "vert", nom: "Vert émeraude", couleurs: MODELES[2].couleurs },
  { id: "bleu", nom: "Bleu Majorelle", couleurs: MODELES[3].couleurs },
  { id: "terre", nom: "Terre cuite", couleurs: MODELES[4].couleurs },
  { id: "grenat", nom: "Grenat & or", couleurs: MODELES[5].couleurs },
  { id: "ivoire", nom: "Ivoire & or", couleurs: { fond: "#F4EFE3", enveloppe: "#E4D49A", papier: "#FBF6E9", texte: "#2F2A20", accent: "#8C6D22" } },
  { id: "sauge", nom: "Sauge", couleurs: { fond: "#DDE3D3", enveloppe: "#BCC8AC", papier: "#FCFBF5", texte: "#2F3A2A", accent: "#7B8F5E" } },
  { id: "marine", nom: "Bleu nuit", couleurs: { fond: "#101B30", enveloppe: "#1B2E52", papier: "#F4F1EA", texte: "#16213A", accent: "#C9B27A" } },
  { id: "peche", nom: "Pêche", couleurs: { fond: "#F8E4D6", enveloppe: "#F0C7AE", papier: "#FFFAF5", texte: "#54382B", accent: "#D07C58" } },
  { id: "lavande", nom: "Lavande", couleurs: { fond: "#E7E1F0", enveloppe: "#CFC4E3", papier: "#FFFCFF", texte: "#3F3552", accent: "#8A6FB5" } },
];

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
    ouvrir: "Touchez pour ouvrir", invite: "Ont la joie de vous convier à leur mariage", invites: "Vous êtes invité(e) au mariage de",
    cher: "Bonjour", a: "à", maps: "Voir le lieu sur Google Maps", locale: "fr-FR",
    defiler: "Faites défiler", repondre: "Répondre maintenant", alliances: "Nous allons nous dire oui", compte: "Le grand jour approche", aujourdhui: "C'est aujourd'hui !", jours: "jours", heures: "heures", minutes: "minutes", secondes: "secondes",
    lieuTitre: "Le lieu", itineraire: "Itinéraire", programmeTitre: "Le programme", reponseTitre: "Votre réponse", avecVous: "Nous avons hâte de partager ce moment avec vous", pour: "Une invitation pour",
  },
  en: {
    ouvrir: "Tap to open", invite: "Joyfully invite you to their wedding", invites: "You are invited to the wedding of",
    cher: "Dear", a: "at", maps: "View the venue on Google Maps", locale: "en-GB",
    defiler: "Scroll down", repondre: "Reply now", alliances: "We are about to say yes", compte: "The big day is coming", aujourdhui: "It's today!", jours: "days", heures: "hours", minutes: "minutes", secondes: "seconds",
    lieuTitre: "The venue", itineraire: "Directions", programmeTitre: "The programme", reponseTitre: "Your reply", avecVous: "We can't wait to share this moment with you", pour: "An invitation for",
  },
  ar: {
    ouvrir: "المسوا لفتح الدعوة", invite: "يتشرفان بدعوتكم لحضور حفل زفافهما", invites: "يسعدنا دعوتكم لحضور حفل زفاف",
    cher: "مرحباً", a: "في", maps: "عرض المكان على خرائط جوجل", locale: "ar-MA-u-nu-latn-ca-gregory",
    defiler: "مرروا للأسفل", repondre: "الرد الآن", alliances: "سنقول نعم قريباً", compte: "اليوم الكبير يقترب", aujourdhui: "إنه اليوم!", jours: "أيام", heures: "ساعات", minutes: "دقائق", secondes: "ثوان",
    lieuTitre: "المكان", itineraire: "الاتجاهات", programmeTitre: "البرنامج", reponseTitre: "ردكم", avecVous: "نتطلع لمشاركتكم هذه اللحظة", pour: "دعوة إلى",
  },
} as const;

export const initiales = (noms: string) => {
  const m = noms.split(/\s+(?:et|and|و)\s+|\s*&\s*/i).map((s) => s.trim().charAt(0).toUpperCase()).filter(Boolean);
  return m.length >= 2 ? `${m[0]} & ${m[1]}` : (m[0] ?? "♥");
};
