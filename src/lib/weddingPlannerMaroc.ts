// Contenu de la page de référencement « Wedding planner au Maroc » (/wedding-planner-maroc).
// Les mots-clés viennent des volumes réels de Google Ads (novembre 2026) :
//   Maroc  : « mariage au Maroc » / « mariage marocain » 880, « wedding planner Marrakech » 590, « wedding planner » 260, « agence événementielle Maroc » 170
//   France : « mariage au Maroc » / « mariage marocain » 1 900, « mariage à Marrakech » 320, « traiteur mariage marocain » 110, « décoration mariage marocain » 110
// Rien d'inventé : pas de prix, de chiffre ni d'avis fictif. Les descriptions de villes restent générales et vraies.

export interface VilleWp { id: string; nom: string; texte: string; page?: string }
export interface PaysWp { id: string; nom: string; de: string }

export const VILLES_WP: VilleWp[] = [
  { id: "marrakech", nom: "Marrakech", page: "/hotesses-marrakech", texte: "Riads de la médina, palaces de l'Hivernage, domaines de la Palmeraie et de la route de l'Ourika : Marrakech est la grande destination des mariages de prestige. Nous coordonnons le décor, les prestataires et le jour J." },
  { id: "casablanca", nom: "Casablanca", page: "/hotesses-casablanca", texte: "Salles de réception, hôtels et domaines d'Anfa, d'Aïn Diab et de la périphérie : nous organisons votre mariage de la première idée jusqu'à la dernière danse." },
  { id: "rabat", nom: "Rabat", page: "/hotesses-rabat", texte: "Notre agence est installée à Rabat, dans le quartier Océan. Mariages, fiançailles et henné à Rabat, Salé et Témara : nous connaissons les lieux et leurs contraintes." },
  { id: "tanger", nom: "Tanger", page: "/hotesses-tanger", texte: "Entre détroit et Méditerranée, en ville, à Malabata ou sur la côte : nous coordonnons vos prestataires dans toute la région du Nord." },
  { id: "fes", nom: "Fès", page: "/hotesses-fes", texte: "Palais de la médina, riads et hôtels de la Ville Nouvelle : un cadre historique pour un mariage traditionnel comme pour une célébration plus contemporaine." },
  { id: "agadir", nom: "Agadir", page: "/hotesses-agadir", texte: "Un mariage face à l'Atlantique, dans un hôtel ou un domaine de la région : nous organisons et coordonnons chaque moment, du henné à la soirée." },
  { id: "meknes", nom: "Meknès", texte: "Ville impériale aux portes de Volubilis : un décor chargé d'histoire pour des fiançailles, un henné ou un mariage traditionnel." },
  { id: "kenitra", nom: "Kénitra", texte: "Mariages et fiançailles à Kénitra et dans le Gharb, à côté de Rabat : nous nous déplaçons, les frais sont précisés ligne par ligne dans le devis." },
  { id: "oujda", nom: "Oujda", texte: "Mariages dans l'Oriental, à Oujda, Saïdia et dans toute la région : une organisation pensée à l'avance, même à distance." },
  { id: "tetouan", nom: "Tétouan", texte: "Médina classée à l'UNESCO, montagne et mer : mariages et fiançailles à Tétouan, Martil et dans le Nord." },
  { id: "el-jadida", nom: "El Jadida", texte: "Cité portugaise classée à l'UNESCO et plages de la côte atlantique : un mariage à El Jadida avec une coordination complète le jour J." },
  { id: "essaouira", nom: "Essaouira", texte: "Remparts, médina classée à l'UNESCO et océan : un mariage ou un henné à Essaouira, pensé pour un petit comité comme pour une grande fête." },
  { id: "mohammedia", nom: "Mohammedia", texte: "Entre Casablanca et Rabat, la ville des fleurs et ses plages : organisation de mariage et coordination des prestataires." },
  { id: "sale", nom: "Salé", texte: "Mariages, fiançailles et henné à Salé, de l'autre côté du Bouregreg : l'équipe de Rabat se déplace pour vous." },
  { id: "temara", nom: "Témara", texte: "Mariages à Témara et sur la côte entre Rabat et Skhirat : décor, prestataires et jour J coordonnés par la même équipe." },
  { id: "nador", nom: "Nador", texte: "Mariages dans le Rif oriental, à Nador et autour de la lagune de Marchica : nous préparons tout avec vous, à distance si besoin." },
  { id: "ifrane", nom: "Ifrane", texte: "Cèdres, chalets et air de montagne dans le Moyen Atlas : un mariage hors du commun, à organiser longtemps à l'avance." },
  { id: "ouarzazate", nom: "Ouarzazate", texte: "Kasbahs, palmeraies et paysages du Sud autour d'Ouarzazate et d'Aït Benhaddou : un mariage dans un décor unique." },
];

export const PAYS_WP: PaysWp[] = [
  { id: "france", nom: "France", de: "la France" },
  { id: "belgique", nom: "Belgique", de: "la Belgique" },
  { id: "pays-bas", nom: "Pays-Bas", de: "les Pays-Bas" },
  { id: "espagne", nom: "Espagne", de: "l'Espagne" },
  { id: "italie", nom: "Italie", de: "l'Italie" },
  { id: "allemagne", nom: "Allemagne", de: "l'Allemagne" },
  { id: "suisse", nom: "Suisse", de: "la Suisse" },
  { id: "royaume-uni", nom: "Royaume-Uni", de: "le Royaume-Uni" },
  { id: "canada", nom: "Canada", de: "le Canada" },
  { id: "etats-unis", nom: "États-Unis", de: "les États-Unis" },
  { id: "emirats", nom: "Émirats arabes unis", de: "les Émirats arabes unis" },
];

export const FORMULES_WP = [
  { titre: "Organisation complète", texte: "Nous prenons le mariage en main de A à Z : style et décoration, sélection des prestataires, budget, planning, coordination et présence le jour J. Vous décidez, nous nous occupons du reste." },
  { titre: "Organisation partielle", texte: "Vous avez déjà la salle ou certains prestataires ? Nous complétons : les postes qu'il vous manque, le suivi du budget et le planning, pour avancer sans vous épuiser." },
  { titre: "Coordination du jour J", texte: "Vous avez tout préparé et vous voulez être sûrs que tout se déroule comme prévu : nous coordonnons l'installation, les prestataires et le déroulé minute par minute, et nous accueillons vos invités." },
  { titre: "Décoration et scénographie", texte: "Table d'honneur, arche, fleurs, éclairages, entrée des mariés : nous imaginons un décor à votre image, que vous pouvez visualiser avant de décider avec notre simulateur." },
];

export const MOMENTS_WP = [
  "Fiançailles et demande en mariage",
  "Soirée de henné",
  "Entrée des mariés et amariya",
  "Négafa et changements de tenues",
  "Dîner, soirée dansante et orchestre ou DJ",
  "Cortège et zaffa",
  "Mariage civil, religieux ou laïc selon vos souhaits",
  "Brunch du lendemain et retour des familles",
];

export const ETAPES_WP = [
  { titre: "Imaginez votre mariage", texte: "Avec notre simulateur « Crée ton événement », composez les tables, l'arche, les fleurs et les éclairages et suivez le budget estimé. Vous nous envoyez votre projet en un clic." },
  { titre: "Parlons-en", texte: "Réservez un rendez-vous en ligne (visio, téléphone ou WhatsApp) : nous affinons ensemble le style, le nombre d'invités, la ville et le budget." },
  { titre: "Un devis clair, signé en ligne", texte: "Vous recevez un devis détaillé ligne par ligne, sous 24 h, à consulter et signer depuis votre téléphone, où que vous soyez." },
  { titre: "Nous coordonnons, vous profitez", texte: "Notre équipe est briefée, confirme sa présence et pointe son arrivée sur place, et chaque prestataire reçoit son planning. Le jour J, vous n'avez qu'à vivre votre mariage." },
];

export const FAQ_WP = [
  { q: "Qu'est-ce qu'un wedding planner et que fait-il ?", r: "Un wedding planner (ou organisateur, organisatrice de mariage) conçoit et coordonne votre mariage avec vous : il définit le style, sélectionne et coordonne les prestataires (salle, traiteur, négafa, orchestre ou DJ, photographe, décorateur), suit le budget et le planning, puis s'assure que le jour J se déroule comme prévu." },
  { q: "Combien coûte un wedding planner au Maroc ?", r: "Le budget dépend du nombre d'invités, de la ville, du style et de la formule choisie (organisation complète, partielle ou coordination du jour J). Chez Heavent, vous recevez gratuitement un devis détaillé ligne par ligne sous 24 h : vous savez exactement ce que vous payez, et pour quoi." },
  { q: "Quelle est la différence entre organisation complète, partielle et coordination du jour J ?", r: "L'organisation complète couvre tout le mariage, de l'idée au jour J. L'organisation partielle complète ce que vous avez déjà : certains prestataires, le budget, le planning. La coordination du jour J s'occupe uniquement de l'installation, des prestataires et du déroulé le jour même." },
  { q: "Combien de temps à l'avance faut-il réserver son wedding planner ?", r: "Le plus tôt possible : idéalement 6 à 12 mois avant la date, surtout pour Marrakech et pour les périodes très demandées comme l'été et les vacances des familles installées à l'étranger. Plus court est possible selon nos disponibilités : écrivez-nous avec votre date." },
  { q: "Organisez-vous des mariages à Marrakech, Casablanca, Rabat, Tanger, Fès et Agadir ?", r: "Oui, dans ces villes et dans tout le Maroc : Meknès, Kénitra, Oujda, Tétouan, El Jadida, Essaouira, Mohammedia, Salé, Témara, Nador, Ifrane, Ouarzazate et partout ailleurs. Les déplacements éventuels sont précisés ligne par ligne dans le devis." },
  { q: "Je vis à l'étranger : puis-je organiser mon mariage au Maroc à distance ?", r: "Oui, que vous viviez en France, en Belgique, aux Pays-Bas, en Espagne, en Italie, en Allemagne, au Canada ou ailleurs. Rendez-vous en visio ou par WhatsApp, devis signé en ligne, suivi à distance, puis coordination sur place par notre équipe : vous arrivez, tout est prêt." },
  { q: "Organisez-vous aussi les fiançailles et la soirée de henné ?", r: "Oui. Nous organisons les fiançailles, le henné et le mariage, ensemble ou séparément, avec la décoration et la coordination adaptées à chaque moment." },
  { q: "Travaillez-vous avec une négafa, un traiteur, un orchestre et un photographe ?", r: "Nous sélectionnons et coordonnons les prestataires adaptés à votre style et à votre budget : négafa, traiteur, orchestre ou DJ, photographe, vidéaste, décorateur, fleuriste, salle. Vous pouvez aussi garder vos prestataires : nous les intégrons au planning." },
  { q: "Puis-je visualiser mon mariage avant de demander un devis ?", r: "Oui, avec notre simulateur gratuit « Crée ton événement » : vous composez la décoration, vous suivez le budget estimé et vous nous envoyez votre projet en un clic." },
  { q: "Comment se passent le devis et la signature ?", r: "Vous recevez un devis détaillé que vous pouvez télécharger en PDF et signer en ligne depuis votre téléphone. Vous préférez d'abord en parler ? Réservez un rendez-vous en ligne." },
  { q: "Pouvez-vous gérer les réponses de mes invités ?", r: "Oui. Nous mettons à votre disposition un espace en ligne pour les mariés et un lien de réponse (RSVP) à envoyer à vos invités, pour suivre qui vient." },
  { q: "Dans quelles langues travaillez-vous ?", r: "En français, en arabe et en anglais. Précisez votre langue de préférence dans votre demande." },
  { q: "Où se trouve votre agence ?", r: "Heavent People Agency est basée à Rabat (quartier Océan). Nos équipes se déplacent partout au Maroc pour organiser votre mariage." },
];
