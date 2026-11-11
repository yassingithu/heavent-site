/** Types d'événement du pack invitations : textes (fr, en, ar), valeurs par défaut et questions de réponse.
 *  Le type vit dans les réglages de l'invitation (`evenement`) : sans lui, c'est un mariage, comme avant. */
import { TEXTES, type Langue } from "./invitation";

export type TypeEvenement = "mariage" | "mariage-civil" | "fiancailles" | "henne" | "anniversaire" | "anniversaire-enfant" | "baby-shower" | "naissance" | "bapteme" | "circoncision" | "iftar" | "diplome";
export type TextesInv = { [K in keyof (typeof TEXTES)["fr"]]: string };
type Tr = Record<Langue, string>;

export interface QuestionDef { id: string; genre: "texte" | "oui" | "long"; fr: string; en: string; ar: string; aide?: Tr }

/** Questions que l'hôte peut ajouter au formulaire de réponse. Aucune n'est posée par défaut ; aucune n'est obligatoire. */
export const QUESTIONS: QuestionDef[] = [
  { id: "allergies", genre: "texte", fr: "Allergies ou régime alimentaire", en: "Allergies or dietary needs", ar: "الحساسية أو النظام الغذائي", aide: { fr: "Facultatif", en: "Optional", ar: "اختياري" } },
  { id: "parent", genre: "oui", fr: "Un parent reste sur place avec l'enfant", en: "A parent will stay with the child", ar: "أحد الوالدين سيبقى مع الطفل" },
  { id: "arrivee", genre: "oui", fr: "J'arriverai avant le coucher du soleil", en: "I will arrive before sunset", ar: "سأصل قبل الغروب" },
  { id: "mot", genre: "long", fr: "Un petit mot pour les hôtes", en: "A little note for the hosts", ar: "كلمة صغيرة للمضيفين", aide: { fr: "Facultatif", en: "Optional", ar: "اختياري" } },
];
export const questionDe = (id: string) => QUESTIONS.find((q) => q.id === id);

export interface EvenementDef {
  id: TypeEvenement;
  /** carte du choix de l'occasion (administration) */
  groupe: string; groupeNom: string; /** libellé de la précision dans le groupe (adulte, enfant…) */ sous: string; nom: string; description: string; de: string;
  nomsLibelle: string; nomsExemple: string;
  /** Les alliances ne concernent que les mariages ; ailleurs, une étoile à 8 branches (khatam) */
  anneaux: boolean;
  /** valeurs posées quand on choisit l'occasion */
  modele: string; ouverture: string; programme: { heure: string; titre: string }[];
  /** questions proposées à l'hôte pour cette occasion */
  questions: string[];
  textes: Record<Langue, Partial<TextesInv>>;
  mots: Record<Langue, { hotes: string; fete: string }>;
}

const GENERIQUE_MOTS: EvenementDef["mots"] = {
  fr: { hotes: "les hôtes", fete: "cette fête" },
  en: { hotes: "the hosts", fete: "this celebration" },
  ar: { hotes: "المضيفين", fete: "هذه المناسبة" },
};

export const EVENEMENTS: EvenementDef[] = [
  {
    id: "mariage", groupe: "mariage", groupeNom: "Mariage", sous: "Mariage", nom: "Mariage", description: "Le faire-part des mariés", de: "de mariage",
    nomsLibelle: "Prénoms des mariés", nomsExemple: "Lina & Adam", anneaux: true, modele: "or-ivoire", ouverture: "enveloppe",
    programme: [{ heure: "19h30", titre: "Accueil des invités" }, { heure: "20h30", titre: "Entrée des mariés" }, { heure: "21h00", titre: "Dîner" }, { heure: "23h00", titre: "Soirée dansante" }],
    questions: [], textes: { fr: {}, en: {}, ar: {} },
    mots: { fr: { hotes: "les mariés", fete: "ce mariage" }, en: { hotes: "the couple", fete: "this wedding" }, ar: { hotes: "العروسين", fete: "هذا الزفاف" } },
  },
  {
    id: "anniversaire", groupe: "anniversaire", groupeNom: "Anniversaire", sous: "Adulte", nom: "Anniversaire", description: "Pour un adulte : élégant et complice", de: "d'anniversaire",
    nomsLibelle: "Prénom de la personne fêtée", nomsExemple: "Sara", anneaux: false, modele: "prune", ouverture: "rideaux",
    programme: [{ heure: "19h30", titre: "Accueil des invités" }, { heure: "20h30", titre: "Dîner" }, { heure: "22h00", titre: "Le gâteau" }, { heure: "22h30", titre: "Soirée" }],
    questions: ["allergies", "mot"],
    textes: {
      fr: { invite: "Vous êtes invité(e) à fêter l'anniversaire de", invites: "Vous êtes invité(e) à fêter l'anniversaire de", alliances: "Une soirée à partager", compte: "Bientôt la fête" },
      en: { invite: "You are invited to celebrate the birthday of", invites: "You are invited to celebrate the birthday of", alliances: "An evening to share", compte: "The party is coming" },
      ar: { invite: "يسعدنا دعوتكم للاحتفال بعيد ميلاد", invites: "يسعدنا دعوتكم للاحتفال بعيد ميلاد", alliances: "أمسية نتشاركها معاً", compte: "الحفل يقترب" },
    },
    mots: GENERIQUE_MOTS,
  },
  {
    id: "anniversaire-enfant", groupe: "anniversaire", groupeNom: "Anniversaire", sous: "Enfant", nom: "Anniversaire d'enfant", description: "Sobre et joyeux, sans photo d'enfant", de: "d'anniversaire",
    nomsLibelle: "Prénom de l'enfant", nomsExemple: "Yasmine", anneaux: false, modele: "prune", ouverture: "florale",
    programme: [{ heure: "15h00", titre: "Accueil des enfants" }, { heure: "16h00", titre: "Jeux" }, { heure: "17h00", titre: "Le gâteau" }, { heure: "18h00", titre: "Fin de la fête" }],
    questions: ["parent", "allergies", "mot"],
    textes: {
      fr: { invite: "Vous êtes invité(e) à l'anniversaire de", invites: "Vous êtes invité(e) à l'anniversaire de", alliances: "Une fête à partager en famille", compte: "Bientôt la fête" },
      en: { invite: "You are invited to the birthday of", invites: "You are invited to the birthday of", alliances: "A party to share with family", compte: "The party is coming" },
      ar: { invite: "يسعدنا دعوتكم لحضور عيد ميلاد", invites: "يسعدنا دعوتكم لحضور عيد ميلاد", alliances: "حفلة نتشاركها مع العائلة", compte: "الحفل يقترب" },
    },
    mots: { fr: { hotes: "les parents", fete: "cette fête" }, en: { hotes: "the parents", fete: "this party" }, ar: { hotes: "الوالدين", fete: "هذه الحفلة" } },
  },
  {
    id: "baby-shower", groupe: "baby-shower", groupeNom: "Baby shower", sous: "Baby shower", nom: "Baby shower", description: "Tout en douceur, sans rose ni bleu", de: "de baby shower",
    nomsLibelle: "Prénoms des futurs parents", nomsExemple: "Lina & Adam", anneaux: false, modele: "olivier", ouverture: "florale",
    programme: [{ heure: "15h00", titre: "Accueil des invités" }, { heure: "16h00", titre: "Jeux et goûter" }, { heure: "17h30", titre: "Mots pour le bébé" }],
    questions: ["allergies", "mot"],
    textes: {
      fr: { invite: "Vous êtes invité(e) à célébrer l'arrivée du bébé de", invites: "Vous êtes invité(e) à célébrer l'arrivée du bébé de", alliances: "Un moment tout en douceur", compte: "L'attente touche à sa fin", gratter: "Grattez pour découvrir" },
      en: { invite: "You are invited to celebrate the arrival of the baby of", invites: "You are invited to celebrate the arrival of the baby of", alliances: "A gentle moment together", compte: "The wait is almost over", gratter: "Scratch to reveal" },
      ar: { invite: "يسعدنا دعوتكم للاحتفال بقدوم مولود", invites: "يسعدنا دعوتكم للاحتفال بقدوم مولود", alliances: "لحظة هادئة نتشاركها", compte: "الانتظار يقترب من نهايته", gratter: "اخدشوا للاكتشاف" },
    },
    mots: { fr: { hotes: "les futurs parents", fete: "cette fête" }, en: { hotes: "the parents-to-be", fete: "this celebration" }, ar: { hotes: "الوالدين المنتظرين", fete: "هذه المناسبة" } },
  },
  {
    id: "naissance", groupe: "naissance", groupeNom: "Naissance, baptême, circoncision", sous: "Naissance · Aqîqa", nom: "Naissance · Aqîqa", description: "Sobre et reconnaissant, sans photo de bébé", de: "de naissance",
    nomsLibelle: "Prénom du bébé", nomsExemple: "Adam", anneaux: false, modele: "ivoire-vert", ouverture: "moucharabieh",
    programme: [{ heure: "12h00", titre: "Accueil des invités" }, { heure: "13h00", titre: "Repas" }, { heure: "15h00", titre: "Thé et pâtisseries" }],
    questions: ["allergies", "mot"],
    textes: {
      fr: { invite: "Vous êtes invité(e) à célébrer la naissance de", invites: "Vous êtes invité(e) à célébrer la naissance de", alliances: "Un moment de gratitude", compte: "Rendez-vous bientôt" },
      en: { invite: "You are invited to celebrate the birth of", invites: "You are invited to celebrate the birth of", alliances: "A moment of gratitude", compte: "See you soon" },
      ar: { invite: "يسعدنا دعوتكم للاحتفال بقدوم المولود", invites: "يسعدنا دعوتكم للاحتفال بقدوم المولود", alliances: "لحظة امتنان نشاركها معكم", compte: "نلتقي قريباً" },
    },
    mots: { fr: { hotes: "la famille", fete: "cette célébration" }, en: { hotes: "the family", fete: "this celebration" }, ar: { hotes: "العائلة", fete: "هذه المناسبة" } },
  },
  {
    id: "iftar", groupe: "fete", groupeNom: "Iftar, diplôme", sous: "Iftar", nom: "Iftar", description: "Une table au coucher du soleil", de: "d'iftar",
    nomsLibelle: "Prénom ou famille qui reçoit", nomsExemple: "Famille Alami", anneaux: false, modele: "nuit-lanterne", ouverture: "zellige",
    programme: [],
    questions: ["arrivee", "allergies", "mot"],
    textes: {
      fr: { invite: "Vous êtes invité(e) à l'iftar de", invites: "Vous êtes invité(e) à l'iftar de", alliances: "Une table à partager au coucher du soleil", compte: "Bientôt à table" },
      en: { invite: "You are invited to the iftar of", invites: "You are invited to the iftar of", alliances: "A table to share at sunset", compte: "Soon at the table" },
      ar: { invite: "يسعدنا دعوتكم لحضور إفطار", invites: "يسعدنا دعوتكم لحضور إفطار", alliances: "مائدة نتشاركها عند الغروب", compte: "قريباً على المائدة" },
    },
    mots: GENERIQUE_MOTS,
  },
  {
    id: "mariage-civil", groupe: "mariage", groupeNom: "Mariage", sous: "Mariage civil", nom: "Mariage civil", description: "La cérémonie civile, plus intime", de: "de mariage civil",
    nomsLibelle: "Prénoms des mariés", nomsExemple: "Lina & Adam", anneaux: true, modele: "or-ivoire", ouverture: "artdeco",
    programme: [{ heure: "11h00", titre: "Accueil des invités" }, { heure: "11h30", titre: "Cérémonie civile" }, { heure: "13h00", titre: "Déjeuner" }],
    questions: ["allergies", "mot"],
    textes: {
      fr: { invite: "Ont la joie de vous convier à la célébration civile de leur mariage", invites: "Vous êtes invité(e) à la célébration civile du mariage de" },
      en: { invite: "Joyfully invite you to the civil ceremony of their wedding", invites: "You are invited to the civil ceremony of the wedding of" },
      ar: { invite: "يتشرفان بدعوتكم لحضور حفل زواجهما المدني", invites: "يسعدنا دعوتكم لحضور حفل الزواج المدني لـ" },
    },
    mots: { fr: { hotes: "les mariés", fete: "ce mariage" }, en: { hotes: "the couple", fete: "this wedding" }, ar: { hotes: "العروسين", fete: "هذا الزفاف" } },
  },
  {
    id: "fiancailles", groupe: "fiancailles", groupeNom: "Fiançailles, henné", sous: "Fiançailles", nom: "Fiançailles", description: "Chaleureux et cérémonial", de: "de fiançailles",
    nomsLibelle: "Prénoms des fiancés", nomsExemple: "Lina & Adam", anneaux: true, modele: "grenat", ouverture: "riad",
    programme: [{ heure: "18h00", titre: "Accueil des invités" }, { heure: "19h00", titre: "Cérémonie des fiançailles" }, { heure: "20h30", titre: "Dîner" }],
    questions: ["allergies", "mot"],
    textes: {
      fr: { invite: "Ont la joie de vous convier à leurs fiançailles", invites: "Vous êtes invité(e) aux fiançailles de", alliances: "Le début d'une belle histoire" },
      en: { invite: "Joyfully invite you to their engagement", invites: "You are invited to the engagement of", alliances: "The beginning of a beautiful story" },
      ar: { invite: "يتشرفان بدعوتكم لحضور خطوبتهما", invites: "يسعدنا دعوتكم لحضور خطوبة", alliances: "بداية حكاية جميلة" },
    },
    mots: { fr: { hotes: "les fiancés", fete: "ces fiançailles" }, en: { hotes: "the couple", fete: "this engagement" }, ar: { hotes: "الخطيبين", fete: "هذه الخطوبة" } },
  },
  {
    id: "henne", groupe: "fiancailles", groupeNom: "Fiançailles, henné", sous: "Henné", nom: "Soirée henné", description: "Tradition, terre cuite et or", de: "de henné",
    nomsLibelle: "Prénom de la mariée", nomsExemple: "Lina", anneaux: false, modele: "sable", ouverture: "marocaine",
    programme: [{ heure: "19h00", titre: "Accueil des invitées" }, { heure: "20h00", titre: "Cérémonie du henné" }, { heure: "21h30", titre: "Dîner" }],
    questions: ["allergies", "mot"],
    textes: {
      fr: { invite: "Vous êtes invité(e) à la soirée henné de", invites: "Vous êtes invité(e) à la soirée henné de", alliances: "Une soirée de joie et de tradition" },
      en: { invite: "You are invited to the henna night of", invites: "You are invited to the henna night of", alliances: "An evening of joy and tradition" },
      ar: { invite: "يسعدنا دعوتكم لحضور ليلة الحناء الخاصة بـ", invites: "يسعدنا دعوتكم لحضور ليلة الحناء الخاصة بـ", alliances: "ليلة فرح وتقاليد" },
    },
    mots: { fr: { hotes: "la famille", fete: "cette soirée" }, en: { hotes: "the family", fete: "this evening" }, ar: { hotes: "العائلة", fete: "هذه الأمسية" } },
  },
  {
    id: "bapteme", groupe: "naissance", groupeNom: "Naissance, baptême, circoncision", sous: "Baptême", nom: "Baptême", description: "Recueilli, ivoire et bleu nuit", de: "de baptême",
    nomsLibelle: "Prénom de l'enfant", nomsExemple: "Adam", anneaux: false, modele: "ivoire-nuit", ouverture: "v-glasshouse",
    programme: [{ heure: "11h00", titre: "Cérémonie" }, { heure: "12h30", titre: "Déjeuner" }, { heure: "15h00", titre: "Gâteau et café" }],
    questions: ["allergies", "mot"],
    textes: {
      fr: { invite: "Vous êtes invité(e) au baptême de", invites: "Vous êtes invité(e) au baptême de", alliances: "Une célébration recueillie", compte: "Rendez-vous bientôt" },
      en: { invite: "You are invited to the baptism of", invites: "You are invited to the baptism of", alliances: "A quiet celebration", compte: "See you soon" },
      ar: { invite: "يسعدنا دعوتكم لحضور حفل تعميد", invites: "يسعدنا دعوتكم لحضور حفل تعميد", alliances: "احتفال هادئ نتشاركه", compte: "نلتقي قريباً" },
    },
    mots: { fr: { hotes: "la famille", fete: "cette célébration" }, en: { hotes: "the family", fete: "this celebration" }, ar: { hotes: "العائلة", fete: "هذه المناسبة" } },
  },
  {
    id: "circoncision", groupe: "naissance", groupeNom: "Naissance, baptême, circoncision", sous: "Circoncision", nom: "Circoncision (Khitane)", description: "Sobre, en famille, sans détail ni photo", de: "de fête familiale",
    nomsLibelle: "Prénom de l'enfant", nomsExemple: "Adam", anneaux: false, modele: "ivoire-vert", ouverture: "marocaine",
    programme: [{ heure: "17h00", titre: "Accueil des invités" }, { heure: "18h00", titre: "Thé et pâtisseries" }, { heure: "19h30", titre: "Dîner" }],
    questions: ["allergies", "mot"],
    textes: {
      fr: { invite: "Vous êtes invité(e) à la fête de", invites: "Vous êtes invité(e) à la fête de", alliances: "Un moment en famille", compte: "Rendez-vous bientôt" },
      en: { invite: "You are invited to the family celebration of", invites: "You are invited to the family celebration of", alliances: "A moment with family", compte: "See you soon" },
      ar: { invite: "يسعدنا دعوتكم لحضور حفل", invites: "يسعدنا دعوتكم لحضور حفل", alliances: "لحظة عائلية", compte: "نلتقي قريباً" },
    },
    mots: { fr: { hotes: "la famille", fete: "cette fête" }, en: { hotes: "the family", fete: "this celebration" }, ar: { hotes: "العائلة", fete: "هذه المناسبة" } },
  },
  {
    id: "diplome", groupe: "fete", groupeNom: "Iftar, diplôme", sous: "Remise de diplôme", nom: "Remise de diplôme", description: "Une réussite à partager", de: "de remise de diplôme",
    nomsLibelle: "Prénom du diplômé(e)", nomsExemple: "Sara", anneaux: false, modele: "or-ivoire", ouverture: "artdeco",
    programme: [{ heure: "18h00", titre: "Accueil des invités" }, { heure: "19h00", titre: "Mots de félicitations" }, { heure: "20h00", titre: "Dîner" }],
    questions: ["allergies", "mot"],
    textes: {
      fr: { invite: "Vous êtes invité(e) à fêter le diplôme de", invites: "Vous êtes invité(e) à fêter le diplôme de", alliances: "Une réussite à partager", compte: "Bientôt la fête" },
      en: { invite: "You are invited to celebrate the graduation of", invites: "You are invited to celebrate the graduation of", alliances: "A success to share", compte: "The party is coming" },
      ar: { invite: "يسعدنا دعوتكم للاحتفال بتخرج", invites: "يسعدنا دعوتكم للاحتفال بتخرج", alliances: "نجاح نتشاركه معاً", compte: "الحفل يقترب" },
    },
    mots: GENERIQUE_MOTS,
  },
];

export const evenementDe = (id?: string | null): EvenementDef => EVENEMENTS.find((e) => e.id === id) ?? EVENEMENTS[0];
/** Cartes du choix : une par groupe (l'anniversaire se précise ensuite : adulte ou enfant) */
export const GROUPES = EVENEMENTS.filter((e, i, l) => l.findIndex((x) => x.groupe === e.groupe) === i).map((e) => ({ groupe: e.groupe, evenements: EVENEMENTS.filter((x) => x.groupe === e.groupe) }));

/** Textes de la carte : ceux du mariage, remplacés par ceux de l'occasion quand elle en a. */
export function textesDe(langue: Langue, id?: string | null): TextesInv {
  return { ...(TEXTES[langue] as TextesInv), ...(evenementDe(id).textes[langue] ?? {}) };
}

/** Questions réellement posées aux invités : celles que l'hôte a cochées parmi celles de l'occasion. */
export function questionsActives(id: string | null | undefined, choisies?: string[] | null): QuestionDef[] {
  const ev = evenementDe(id);
  return (choisies ?? []).filter((q) => ev.questions.includes(q)).map(questionDe).filter((q): q is QuestionDef => !!q);
}

/** Réponses des invités rangées en une ligne lisible par l'administration (libellés français, 300 caractères au plus). */
export function composerPrecisions(qs: QuestionDef[], valeurs: Record<string, string>): string {
  return qs.map((q) => {
    const v = (valeurs[q.id] ?? "").trim().replace(/\s+/g, " ");
    if (!v) return "";
    return q.genre === "oui" ? (v === "oui" ? q.fr : "") : q.genre === "long" ? `« ${v} »` : `${q.fr} : ${v}`;
  }).filter(Boolean).join(" | ").slice(0, 300);
}
