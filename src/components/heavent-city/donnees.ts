/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  HEAVENT CITY — Mission événement : TEXTES, MISSIONS ET OPTIONS
 *  Tout ce qui se modifie sans toucher au code du rendu est ici.
 *
 *  AUCUN PRIX dans ce dossier : jamais de montant, de total, de fourchette, de tarif ni de marge.
 *  Ce fichier n'importe rien de l'ancien jeu (config.ts / tarifs.ts), qui contient les prix par défaut.
 *
 *  « catalogue » = identifiant de la prestation correspondante dans le catalogue interne de l'agence.
 *  Une option AVEC « catalogue » existe vraiment chez Heavent et peut être réservée ;
 *  une option SANS « catalogue » est une inspiration à discuter avec l'équipe.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type TypeEvt = "mariage" | "fete" | "pro";
export type LieuId = "riad" | "villa" | "rooftop" | "jardin" | "salle";
export type StyleId = "maroc" | "beige_or" | "romantique" | "festif" | "minimal";
export type PaletteId = "sable_or" | "terracotta" | "poudre" | "emeraude" | "ivoire_noir" | "nuit_or";
export type LumiereId = "chaleureuse" | "etoilee" | "bougies" | "festive";
export type MusiqueId = "dj" | "orchestre" | "troupe" | "playlist" | "acoustique";
export type AccueilId = "discret" | "hotesses" | "maitre_hotel" | "the";
export type DecorId = "arche" | "fleurs" | "mur_fleurs" | "allee" | "fontaine" | "petales" | "ciel_lanternes";
export type ExperienceId = "piste" | "photobooth" | "nawar" | "buffet" | "candy_bar" | "livre_dor" | "feux_froids" | "photographe" | "salon" | "the_bar" | "brume";
export type OptionId = DecorId | ExperienceId;

export interface InfoType { id: TypeEvt; nom: string; court: string; emoji: string; nomPlaceholder: string; article: string }
export const TYPES: InfoType[] = [
  { id: "mariage", nom: "Mariage", court: "Mariage", emoji: "💍", nomPlaceholder: "Prénoms (facultatif)", article: "ton mariage" },
  { id: "fete", nom: "Anniversaire ou fête privée", court: "Fête privée", emoji: "🎂", nomPlaceholder: "Nom de la fête (facultatif)", article: "ta fête" },
  { id: "pro", nom: "Événement professionnel", court: "Professionnel", emoji: "🏢", nomPlaceholder: "Nom de l'événement (facultatif)", article: "ton événement" },
];

export const VILLES = ["Casablanca", "Marrakech", "Rabat", "Tanger", "Fès", "Agadir", "Autre ville"];
export const INVITES = { min: 10, max: 500, defaut: 120 };

export interface InfoLieu { id: LieuId; nom: string; phrase: string; types?: TypeEvt[] }
export const LIEUX: InfoLieu[] = [
  { id: "riad", nom: "Le riad", phrase: "Une cour intérieure, des arcades et sa fontaine" },
  { id: "villa", nom: "La villa avec piscine", phrase: "Terrasse de bois, bassin et palmiers" },
  { id: "rooftop", nom: "Le rooftop", phrase: "Au-dessus de la ville, à la tombée du jour" },
  { id: "jardin", nom: "Le jardin", phrase: "Pelouse, haies fleuries et grands arbres" },
  { id: "salle", nom: "La salle de réception", phrase: "Grandes fenêtres, lustres et parquet" },
];
export const MENTION_LIEUX = "Ces lieux sont des ambiances d'inspiration : ils ne correspondent pas à des lieux précis disponibles à la réservation. L'équipe Heavent vous aide à trouver le lieu réel qui s'en rapproche.";

export interface InfoStyle { id: StyleId; nom: string; phrase: string; palette: PaletteId }
export const STYLES: InfoStyle[] = [
  { id: "maroc", nom: "Marocain contemporain", phrase: "Zellige, laiton et lanternes", palette: "terracotta" },
  { id: "beige_or", nom: "Élégance beige et dorée", phrase: "Lin, champagne et reflets d'or", palette: "sable_or" },
  { id: "romantique", nom: "Jardin romantique", phrase: "Fleurs, poudré et lumière douce", palette: "poudre" },
  { id: "festif", nom: "Soirée festive", phrase: "Couleurs, lumières et énergie", palette: "nuit_or" },
  { id: "minimal", nom: "Minimalisme chic", phrase: "Lignes pures et matières nobles", palette: "ivoire_noir" },
];

export interface InfoPalette { id: PaletteId; nom: string; nappe: string; fleurs: string; accent: string; deco: string; sombre?: boolean }
export const PALETTES: InfoPalette[] = [
  { id: "sable_or", nom: "Sable et or", nappe: "#F1E6CE", fleurs: "#FBF6EA", accent: "#C9A74E", deco: "#B8913A" },
  { id: "terracotta", nom: "Terracotta et laiton", nappe: "#E9D3B6", fleurs: "#C8714E", accent: "#B65B38", deco: "#C79A3F" },
  { id: "poudre", nom: "Rose poudré et champagne", nappe: "#F4DEDA", fleurs: "#E7A9B0", accent: "#D68C97", deco: "#D8BF8C" },
  { id: "emeraude", nom: "Émeraude et or", nappe: "#1F5E4F", fleurs: "#D9C27A", accent: "#2E7D68", deco: "#C9A227", sombre: true },
  { id: "ivoire_noir", nom: "Ivoire et noir", nappe: "#F8F6F1", fleurs: "#E6EDE2", accent: "#2B2B2B", deco: "#3A3A3A" },
  { id: "nuit_or", nom: "Bleu nuit et or", nappe: "#26365A", fleurs: "#E8C97E", accent: "#C9A74E", deco: "#E8C97E", sombre: true },
];

export interface InfoOption { id: string; nom: string; phrase: string; catalogue?: string; types?: TypeEvt[]; lieux?: LieuId[] }

export const LUMIERES: (InfoOption & { id: LumiereId })[] = [
  { id: "chaleureuse", nom: "Lanternes chaleureuses", phrase: "Une lumière ambrée, enveloppante", catalogue: "lanternes" },
  { id: "etoilee", nom: "Guirlandes étoilées", phrase: "Un ciel de petites ampoules", catalogue: "guirlandes" },
  { id: "bougies", nom: "Bougies et candélabres", phrase: "Une lumière douce et élégante", catalogue: "candelabre" },
  { id: "festive", nom: "Projecteurs colorés", phrase: "Des faisceaux qui dansent avec la musique" },
];

export const MUSIQUES: (InfoOption & { id: MusiqueId })[] = [
  { id: "dj", nom: "DJ", phrase: "Sets et sonorisation pour la soirée", catalogue: "dj" },
  { id: "orchestre", nom: "Orchestre marocain", phrase: "Luth, percussions et chant en direct", catalogue: "orchestre", types: ["mariage", "fete"] },
  { id: "troupe", nom: "Troupe folklorique", phrase: "Danseurs et percussionnistes", catalogue: "troupe", types: ["mariage", "fete"] },
  { id: "playlist", nom: "Playlist d'ambiance", phrase: "Une sélection douce, sans scène" },
  { id: "acoustique", nom: "Duo acoustique", phrase: "Guitare et voix, côté inspiration" },
];

export const ACCUEILS: (InfoOption & { id: AccueilId })[] = [
  { id: "discret", nom: "Accueil simple", phrase: "Un comptoir de bienvenue, sans équipe dédiée" },
  { id: "hotesses", nom: "Hôtesses d'accueil", phrase: "Accueil, placement et orientation", catalogue: "hotesse" },
  { id: "maitre_hotel", nom: "Maître d'hôtel et hôtesses", phrase: "Une équipe qui coordonne tout le service", catalogue: "maitre_hotel" },
  { id: "the", nom: "Thé de bienvenue", phrase: "Thé à la menthe et pâtisseries à l'arrivée", catalogue: "the" },
];

export const DECORS: (InfoOption & { id: DecorId })[] = [
  { id: "arche", nom: "Arche fleurie", phrase: "Pour la cérémonie ou les photos", catalogue: "arche" },
  { id: "fleurs", nom: "Compositions florales", phrase: "Des bouquets pour habiller l'espace", catalogue: "fleurs" },
  { id: "mur_fleurs", nom: "Mur de fleurs", phrase: "Un fond spectaculaire", catalogue: "mur_fleurs" },
  { id: "allee", nom: "Allée d'entrée", phrase: "Tapis, bougies et fleurs", catalogue: "allee" },
  { id: "fontaine", nom: "Fontaine zellige", phrase: "Un coin d'eau apaisant", catalogue: "fontaine" },
  { id: "petales", nom: "Pluie de pétales", phrase: "Un instant poétique — à discuter" },
  { id: "ciel_lanternes", nom: "Ciel de lanternes", phrase: "Des lumières suspendues — à discuter" },
];

export const EXPERIENCES: (InfoOption & { id: ExperienceId })[] = [
  { id: "piste", nom: "Piste de danse", phrase: "Posée et éclairée", catalogue: "piste" },
  { id: "photobooth", nom: "Photobooth", phrase: "Fond décoré et tirages instantanés", catalogue: "photobooth" },
  { id: "nawar", nom: "Bar à parfums Nawar", phrase: "Chacun compose son parfum et repart avec", catalogue: "nawar" },
  { id: "buffet", nom: "Buffet", phrase: "Dressé et servi", catalogue: "buffet" },
  { id: "the_bar", nom: "Service à thé", phrase: "Thé marocain et pâtisseries", catalogue: "the" },
  { id: "candy_bar", nom: "Candy bar", phrase: "Bonbons et friandises à emporter", catalogue: "candy_bar", types: ["mariage", "fete"] },
  { id: "livre_dor", nom: "Livre d'or", phrase: "Les messages de vos invités", catalogue: "livre_dor", types: ["mariage", "fete"] },
  { id: "feux_froids", nom: "Feux froids", phrase: "Étincelles sans fumée pour un moment fort", catalogue: "feux_froids", types: ["mariage", "fete"] },
  { id: "photographe", nom: "Photographe", phrase: "Reportage de la soirée", catalogue: "photographe" },
  { id: "salon", nom: "Salon marocain", phrase: "Banquettes, coussins et tapis", catalogue: "salon_marocain" },
  { id: "brume", nom: "Brume d'ambiance", phrase: "Une légère brume lumineuse — à discuter" },
];

export const toutesOptions = (): InfoOption[] => [...DECORS, ...EXPERIENCES];
export const infoOption = (id: string): InfoOption | undefined => toutesOptions().find((o) => o.id === id) ?? [...LUMIERES, ...MUSIQUES, ...ACCUEILS].find((o) => o.id === id);
export const reservable = (o: InfoOption | undefined) => !!o?.catalogue;
export const disponiblePour = (o: InfoOption, type: TypeEvt, lieu: LieuId | null) =>
  (!o.types || o.types.includes(type)) && (!o.lieux || !lieu || o.lieux.includes(lieu));

// ── Missions ────────────────────────────────────────────────────────────────
export interface ReponseMission { id: string; nom: string; phrase: string; ajoute: OptionId[]; accueil?: AccueilId; lumiere?: LumiereId; musique?: MusiqueId; effet: string }
export interface Mission { id: string; titre: string; message: string; reponses: ReponseMission[] }

const M_ACCUEIL = (message: string): Mission => ({
  id: "accueil", titre: "L'arrivée des invités", message,
  reponses: [
    { id: "equipe", nom: "Une équipe pour les guider", phrase: "Des hôtesses à l'entrée", ajoute: [], accueil: "hotesses", effet: "Deux hôtesses se placent à l'entrée." },
    { id: "the", nom: "Un thé de bienvenue", phrase: "On les accueille avec douceur", ajoute: [], accueil: "the", effet: "Un plateau de thé apparaît à l'entrée." },
    { id: "simple", nom: "Un comptoir simple", phrase: "Sobre, sans équipe dédiée", ajoute: [], accueil: "discret", effet: "Un comptoir de bienvenue sobre est installé." },
  ],
});

export const MISSIONS: Record<TypeEvt, Mission[]> = {
  mariage: [
    M_ACCUEIL("Tes invités arrivent presque tous en même temps : prépare leur accueil."),
    {
      id: "partage", titre: "Un premier moment de partage", message: "Tout le monde ne se connaît pas : crée un premier moment de partage.",
      reponses: [
        { id: "photo", nom: "Un photobooth", phrase: "Des souvenirs à rire ensemble", ajoute: ["photobooth"], effet: "Un photobooth s'installe près de l'entrée." },
        { id: "livre", nom: "Un livre d'or", phrase: "Des mots pour les mariés", ajoute: ["livre_dor"], effet: "Un livre d'or fleuri apparaît." },
        { id: "salon", nom: "Un salon pour discuter", phrase: "Banquettes et coussins", ajoute: ["salon"], effet: "Un salon marocain prend place." },
      ],
    },
    {
      id: "surprise", titre: "La surprise dont on se souviendra", message: "Il manque le moment dont on se souviendra : choisis ta surprise.",
      reponses: [
        { id: "feux", nom: "Des feux froids", phrase: "Pour l'entrée des mariés", ajoute: ["feux_froids"], effet: "Des étincelles jaillissent près de la piste." },
        { id: "nawar", nom: "Un parfum à soi", phrase: "Chaque invité compose le sien", ajoute: ["nawar"], effet: "Le bar à parfums Nawar s'installe." },
        { id: "petales", nom: "Une pluie de pétales", phrase: "Un instant suspendu", ajoute: ["petales"], effet: "Des pétales tombent doucement sur la scène." },
      ],
    },
  ],
  fete: [
    M_ACCUEIL("Tes invités arrivent par petits groupes : comment veux-tu les accueillir ?"),
    {
      id: "partage", titre: "Briser la glace", message: "Tout le monde ne se connaît pas : crée un premier moment de partage.",
      reponses: [
        { id: "photo", nom: "Un photobooth", phrase: "Des photos pleines de rires", ajoute: ["photobooth"], effet: "Un photobooth s'installe." },
        { id: "candy", nom: "Un candy bar", phrase: "Des friandises à partager", ajoute: ["candy_bar"], effet: "Un candy bar coloré apparaît." },
        { id: "salon", nom: "Un coin pour discuter", phrase: "Banquettes et coussins", ajoute: ["salon"], effet: "Un salon marocain prend place." },
      ],
    },
    {
      id: "surprise", titre: "Le moment dont on se souviendra", message: "Il manque le moment dont on se souviendra : choisis ta surprise.",
      reponses: [
        { id: "danse", nom: "Une grande piste", phrase: "Tout le monde danse", ajoute: ["piste"], musique: "dj", effet: "La piste s'allume et le DJ s'installe." },
        { id: "nawar", nom: "Un parfum à soi", phrase: "Chacun repart avec son flacon", ajoute: ["nawar"], effet: "Le bar à parfums Nawar s'installe." },
        { id: "feux", nom: "Des feux froids", phrase: "Pour le gâteau ou l'entrée", ajoute: ["feux_froids"], effet: "Des étincelles jaillissent près de la piste." },
      ],
    },
  ],
  pro: [
    M_ACCUEIL("Tes invités arrivent en même temps, badge en main : prépare leur accueil."),
    {
      id: "partage", titre: "Faire se rencontrer", message: "Tout le monde ne se connaît pas : crée un premier moment d'échange.",
      reponses: [
        { id: "salon", nom: "Un espace d'échange", phrase: "Banquettes, café et conversation", ajoute: ["salon"], effet: "Un salon prend place au centre." },
        { id: "the", nom: "Une pause thé", phrase: "Un rituel simple et convivial", ajoute: ["the_bar"], effet: "Un service à thé s'installe." },
        { id: "photo", nom: "Un photobooth de marque", phrase: "Un souvenir à partager", ajoute: ["photobooth"], effet: "Un photobooth s'installe." },
      ],
    },
    {
      id: "surprise", titre: "L'expérience qu'on retient", message: "Il manque le moment dont on se souviendra : choisis ton expérience.",
      reponses: [
        { id: "nawar", nom: "Un parfum signature", phrase: "Un cadeau personnalisé", ajoute: ["nawar"], effet: "Le bar à parfums Nawar s'installe." },
        { id: "photographe", nom: "Un reportage photo", phrase: "Garder la trace de la soirée", ajoute: ["photographe"], effet: "Un photographe circule dans la salle." },
        { id: "musique", nom: "Une ambiance musicale", phrase: "Discrète et élégante", ajoute: [], musique: "playlist", effet: "Une enceinte d'ambiance s'allume." },
      ],
    },
  ],
};

export const BADGES: { id: string; nom: string; test: string }[] = [
  { id: "accueil", nom: "Accueil soigné", test: "accueil" },
  { id: "ambiance", nom: "Ambiance festive", test: "ambiance" },
  { id: "perso", nom: "Expérience personnalisée", test: "perso" },
];

export const MESSAGE_BIENVENUE = "Un événement exceptionnel se prépare. Et c'est toi qui prends les commandes.";
export const PROMESSE = "Tu as les clés. Crée l'événement dont tout le monde parlera.";

// ── Tables (types réellement proposés par Heavent : table ronde, table rectangulaire, table haute) ─────────
export type TableId = "rondes" | "rectangulaires" | "hautes";
export interface InfoTable { id: TableId; nom: string; phrase: string; places: number; catalogue: "table_ronde" | "table_rect" | "table_haute"; libelle: string }
export const TABLES_TYPES: InfoTable[] = [
  { id: "rondes", nom: "Tables rondes", phrase: "10 convives, chaises et nappe : le classique des mariages", places: 10, catalogue: "table_ronde", libelle: "Tables rondes" },
  { id: "rectangulaires", nom: "Tables rectangulaires", phrase: "6 places, façon banquet : une allure plus sobre", places: 6, catalogue: "table_rect", libelle: "Tables rectangulaires" },
  { id: "hautes", nom: "Tables hautes", phrase: "Mange-debout nappés, invités debout : idéal pour un cocktail", places: 6, catalogue: "table_haute", libelle: "Tables hautes (mange-debout)" },
];
export const infoTable = (id: TableId) => TABLES_TYPES.find((t) => t.id === id)!;
