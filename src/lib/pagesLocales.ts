// Pages publiques par ville et par service (référencement local) : chaque page a son propre texte,
// ses questions fréquentes et des liens vers les autres pages. Rien d'inventé : aucun client, chiffre ni avis fictif.

export interface PageLocale {
  chemin: string;
  type: "ville" | "service";
  nomCourt: string;             // pour les liens (« Casablanca », « Salons et congrès »)
  titreSeo: string;
  descriptionSeo: string;
  motsCles: string;
  h1: string;
  accroche: string;
  intro: string[];              // paragraphes
  pointsCles: { titre: string; texte: string }[];
  evenements: string[];         // types d'événements couverts
  faq: { q: string; r: string }[];
  devis: "entreprise" | "mariage";
  ville?: string;
}

const COMMUN_FONCTIONNEMENT = [
  { titre: "Devis détaillé, signé en ligne", texte: "Vous recevez un devis clair, ligne par ligne, que vous pouvez télécharger en PDF et signer depuis votre téléphone. Vous préférez en parler d'abord ? Réservez un rendez-vous en ligne." },
  { titre: "Une équipe briefée", texte: "Chaque hôtesse et chaque hôte reçoit sa fiche mission : tenue, point de rendez-vous, contact sur place et consignes de l'événement." },
  { titre: "Présence vérifiée le jour J", texte: "Notre personnel confirme sa présence avant l'événement et pointe son arrivée sur place : nous savons en temps réel que tout le monde est là." },
];

export const VILLES: PageLocale[] = [
  {
    chemin: "/hotesses-rabat", type: "ville", ville: "Rabat", nomCourt: "Rabat", devis: "entreprise",
    titreSeo: "Hôtesses d'accueil à Rabat | Agence événementielle Heavent",
    descriptionSeo: "Agence d'hôtesses basée à Rabat : accueil protocolaire, congrès, séminaires, institutions et mariages. Profils bilingues, devis détaillé signé en ligne.",
    motsCles: "hôtesse d'accueil Rabat, agence hôtesses Rabat, hôtesse congrès Rabat, accueil protocolaire Rabat, staff événementiel Rabat",
    h1: "Hôtesses et hôtes d'accueil à Rabat",
    accroche: "Notre agence est basée à Rabat : nous connaissons ses lieux, ses institutions et ses exigences protocolaires.",
    intro: [
      "Capitale administrative et diplomatique, Rabat accueille chaque année congrès, conférences, réceptions officielles et événements d'entreprise qui demandent un accueil irréprochable. Heavent People Agency y met à votre disposition des hôtesses et des hôtes d'accueil bilingues, à l'aise avec le protocole et formés à l'accueil haut de gamme.",
      "De l'Agdal à Souissi, de Hay Riad au centre-ville, nous intervenons pour l'accueil des invités, l'enregistrement et le badging, l'orientation, le vestiaire ou l'accompagnement de délégations. Pour les mariages, nos équipes assurent l'accueil des invités et la coordination le jour J.",
    ],
    pointsCles: COMMUN_FONCTIONNEMENT,
    evenements: ["Congrès et conférences", "Réceptions officielles et ambassades", "Séminaires d'entreprise", "Inaugurations", "Salons professionnels", "Mariages et fiançailles"],
    faq: [
      { q: "Êtes-vous basés à Rabat ?", r: "Oui, le siège de Heavent People Agency se trouve à Rabat (quartier Océan). Nous intervenons dans toute la ville et aux alentours, et nos équipes se déplacent partout au Maroc." },
      { q: "Vos hôtesses parlent-elles plusieurs langues ?", r: "Nous sélectionnons des profils bilingues (français, arabe, anglais). Indiquez les langues souhaitées dans votre demande : nous composons l'équipe en conséquence." },
    ],
  },
  {
    chemin: "/hotesses-casablanca", type: "ville", ville: "Casablanca", nomCourt: "Casablanca", devis: "entreprise",
    titreSeo: "Hôtesses d'accueil à Casablanca | Salons et événements | Heavent",
    descriptionSeo: "Hôtesses et stewards à Casablanca pour salons professionnels, lancements de marque, séminaires et soirées d'entreprise. Devis détaillé, signature en ligne.",
    motsCles: "hôtesse d'accueil Casablanca, agence hôtesses Casablanca, hôtesse salon Casablanca, staff événementiel Casablanca, steward Casablanca",
    h1: "Hôtesses et stewards à Casablanca",
    accroche: "Salons, lancements de produit, séminaires, soirées d'entreprise : un personnel d'accueil à la hauteur de votre marque.",
    intro: [
      "Capitale économique du Maroc, Casablanca concentre les grands salons professionnels, les lancements de marque et les événements corporate. Une marque s'y juge souvent dès l'accueil : nos hôtesses et stewards présentent votre stand, orientent les visiteurs, gèrent l'enregistrement et assurent un accueil soigné du premier au dernier visiteur.",
      "Que votre événement ait lieu à Anfa, Aïn Diab, Sidi Maârouf ou au centre-ville, nous constituons une équipe adaptée à votre activité, avec une coordination sur place et des horaires précis pour chacun.",
    ],
    pointsCles: COMMUN_FONCTIONNEMENT,
    evenements: ["Salons professionnels et foires", "Lancements de produit", "Animation de stand", "Séminaires et conventions", "Soirées d'entreprise", "Street marketing et dégustations"],
    faq: [
      { q: "Pouvez-vous fournir une équipe pour plusieurs jours de salon ?", r: "Oui : nous planifions l'équipe jour par jour, avec les mêmes personnes si vous le souhaitez, et chacune reçoit un contrat avec toutes ses dates." },
      { q: "Les tenues sont-elles fournies ?", r: "La tenue est précisée pour chaque mission (votre tenue de marque ou une tenue de l'agence). Elle figure sur la fiche mission de chaque hôtesse." },
    ],
  },
  {
    chemin: "/hotesses-marrakech", type: "ville", ville: "Marrakech", nomCourt: "Marrakech", devis: "mariage",
    titreSeo: "Hôtesses et organisation de mariage à Marrakech | Heavent",
    descriptionSeo: "Mariages, événements de prestige, incentives et accueil VIP à Marrakech : hôtesses bilingues, coordination jour J, devis personnalisé signé en ligne.",
    motsCles: "hôtesse Marrakech, mariage Marrakech, wedding planner Marrakech, accueil VIP Marrakech, événement prestige Marrakech",
    h1: "Hôtesses, mariages et événements de prestige à Marrakech",
    accroche: "Mariages, incentives, soirées de gala : à Marrakech, chaque détail de l'accueil compte.",
    intro: [
      "Marrakech est la destination des grands mariages, des incentives et des événements de prestige, dans les riads, les palaces de l'Hivernage ou les domaines de la Palmeraie et de la route de l'Ourika. Nos hôtesses et hôtes d'accueil y assurent l'accueil des invités, le placement, le vestiaire et l'accompagnement VIP.",
      "Pour les mariages, nous proposons aussi l'organisation complète ou partielle et la coordination le jour J. Vous pouvez même imaginer votre décoration et votre budget avec notre simulateur « Crée ton événement », puis nous envoyer votre projet pour un devis.",
    ],
    pointsCles: COMMUN_FONCTIONNEMENT,
    evenements: ["Mariages et henné", "Événements de prestige et galas", "Incentives et séminaires", "Accueil VIP et conciergerie événementielle", "Lancements de marque", "Fêtes privées"],
    faq: [
      { q: "Intervenez-vous pour des mariages hors de Marrakech-ville ?", r: "Oui, dans la Palmeraie, sur la route de l'Ourika, dans la région et partout au Maroc : les déplacements sont précisés dans le devis." },
      { q: "Peut-on prévoir un rendez-vous avant de s'engager ?", r: "Bien sûr : vous pouvez réserver un rendez-vous (à l'agence, par téléphone ou en visio) directement en ligne, et signer votre devis seulement ensuite." },
    ],
  },
  {
    chemin: "/hotesses-tanger", type: "ville", ville: "Tanger", nomCourt: "Tanger", devis: "entreprise",
    titreSeo: "Hôtesses d'accueil à Tanger | Congrès et événements | Heavent",
    descriptionSeo: "Hôtesses et hôtes d'accueil à Tanger pour congrès, inaugurations, salons et événements d'entreprise dans la région du Nord. Devis détaillé en ligne.",
    motsCles: "hôtesse d'accueil Tanger, agence hôtesses Tanger, hôtesse congrès Tanger, événementiel Tanger, staff événement Tanger",
    h1: "Hôtesses et hôtes d'accueil à Tanger",
    accroche: "Congrès, inaugurations et événements d'entreprise dans la région du Nord.",
    intro: [
      "Ville portuaire et industrielle en plein essor, Tanger accueille de plus en plus de congrès, d'inaugurations de sites et d'événements d'entreprise. Nous y envoyons des équipes d'accueil bilingues, avec un coordinateur et une organisation pensée à l'avance : contrats, fiches mission, horaires et contact sur place.",
      "Du centre-ville à Malabata, nous assurons l'accueil, l'enregistrement, l'orientation et l'accompagnement de vos invités, et nos équipes peuvent intervenir dans toute la région du Nord.",
    ],
    pointsCles: COMMUN_FONCTIONNEMENT,
    evenements: ["Congrès et forums", "Inaugurations de sites", "Événements d'entreprise", "Salons professionnels", "Réceptions", "Mariages"],
    faq: [
      { q: "Faites-vous venir des équipes d'une autre ville ?", r: "Nous constituons l'équipe en fonction de l'événement ; lorsque des déplacements sont nécessaires, ils sont indiqués clairement dans le devis." },
      { q: "Combien de temps à l'avance faut-il réserver ?", r: "Le plus tôt est le mieux pour réunir les meilleurs profils, mais n'hésitez pas à nous contacter même pour un délai court." },
    ],
  },
  {
    chemin: "/hotesses-agadir", type: "ville", ville: "Agadir", nomCourt: "Agadir", devis: "entreprise",
    titreSeo: "Hôtesses d'accueil à Agadir | Séminaires et événements | Heavent",
    descriptionSeo: "Hôtesses et hôtes à Agadir pour séminaires, événements hôteliers, animations commerciales et mariages. Équipe briefée, devis détaillé signé en ligne.",
    motsCles: "hôtesse Agadir, agence hôtesses Agadir, séminaire Agadir, événement hôtel Agadir, animation commerciale Agadir",
    h1: "Hôtesses et hôtes d'accueil à Agadir",
    accroche: "Séminaires, événements hôteliers et animations commerciales sur la baie d'Agadir.",
    intro: [
      "Avec ses hôtels et sa baie, Agadir est une destination appréciée pour les séminaires, les conventions et les événements d'entreprise. Nos hôtesses et hôtes y assurent l'accueil des participants, l'enregistrement, l'orientation et l'animation commerciale.",
      "Nous préparons chaque mission en amont : chaque membre de l'équipe connaît sa tenue, son point de rendez-vous, son contact sur place et ses horaires, et confirme sa présence avant l'événement.",
    ],
    pointsCles: COMMUN_FONCTIONNEMENT,
    evenements: ["Séminaires et conventions", "Événements hôteliers", "Animations commerciales", "Incentives", "Mariages", "Salons"],
    faq: [
      { q: "Proposez-vous des équipes pour les événements à l'hôtel ?", r: "Oui : accueil des participants, enregistrement, orientation entre les salles, vestiaire et accompagnement, en lien avec l'équipe de l'hôtel." },
      { q: "Comment est calculé le prix ?", r: "Le devis détaille chaque prestation (nombre de personnes, durée, tarif), avec la TVA et l'acompte. Son montant peut évoluer selon les services retenus lors d'un premier rendez-vous." },
    ],
  },
  {
    chemin: "/hotesses-fes", type: "ville", ville: "Fès", nomCourt: "Fès", devis: "entreprise",
    titreSeo: "Hôtesses d'accueil à Fès | Congrès et événements culturels | Heavent",
    descriptionSeo: "Hôtesses et hôtes d'accueil à Fès pour congrès, événements culturels, réceptions et mariages. Profils bilingues, devis détaillé signé en ligne.",
    motsCles: "hôtesse d'accueil Fès, agence hôtesses Fès, congrès Fès, événement culturel Fès, mariage Fès",
    h1: "Hôtesses et hôtes d'accueil à Fès",
    accroche: "Congrès, événements culturels et réceptions, de la médina à la Ville Nouvelle.",
    intro: [
      "Ville d'histoire et de culture, Fès accueille congrès, festivals, réceptions et mariages dans des cadres d'exception, des palais de la médina aux hôtels de la Ville Nouvelle. Nos hôtesses et hôtes assurent un accueil chaleureux et professionnel, en plusieurs langues.",
      "Nous organisons chaque mission avec soin : brief de l'équipe, horaires précis, contact sur place et suivi de la présence de chacun le jour J.",
    ],
    pointsCles: COMMUN_FONCTIONNEMENT,
    evenements: ["Congrès et colloques", "Événements culturels et festivals", "Réceptions", "Mariages", "Séminaires", "Visites de délégations"],
    faq: [
      { q: "Pouvez-vous accompagner des délégations ?", r: "Oui : accueil, accompagnement et orientation des invités, avec des profils bilingues adaptés aux langues de vos participants." },
      { q: "Comment réserver ?", r: "Faites une demande de devis en ligne ou réservez un rendez-vous : vous recevez un devis détaillé à signer en ligne." },
    ],
  },
];

export const SERVICES: PageLocale[] = [
  {
    chemin: "/hotesses-salons-congres", type: "service", nomCourt: "Salons et congrès", devis: "entreprise",
    titreSeo: "Hôtesses pour salons et congrès au Maroc | Heavent",
    descriptionSeo: "Hôtesses et stewards pour salons, congrès et conférences au Maroc : accueil, badging, animation de stand, orientation. Devis détaillé signé en ligne.",
    motsCles: "hôtesse salon Maroc, hôtesse congrès, hôtesse stand, badging congrès, hôtesse conférence Casablanca Rabat",
    h1: "Hôtesses et stewards pour salons et congrès",
    accroche: "Un stand qui attire, un congrès qui s'enchaîne sans accroc : l'accueil fait la différence.",
    intro: [
      "Sur un salon, vos hôtesses sont la première image de votre marque. Nous composons des équipes souriantes, bilingues et briefées sur votre activité pour accueillir les visiteurs, qualifier les contacts, distribuer vos documents et animer votre stand.",
      "Pour les congrès et conférences, nous prenons en charge l'enregistrement et le badging, l'orientation entre les salles, la gestion des micros pendant les questions, le vestiaire et l'accompagnement des intervenants.",
    ],
    pointsCles: COMMUN_FONCTIONNEMENT,
    evenements: ["Accueil et animation de stand", "Enregistrement et badging", "Orientation des participants", "Gestion des micros et des salles", "Accompagnement des intervenants", "Distribution de documents"],
    faq: [
      { q: "Pouvez-vous gérer plusieurs jours et plusieurs équipes ?", r: "Oui, nous planifions jour par jour, avec des horaires par personne, et chaque membre reçoit un contrat et une fiche mission." },
      { q: "Comment savoir si l'équipe est bien arrivée ?", r: "Nos hôtesses confirment leur présence avant l'événement puis pointent leur arrivée sur place depuis leur espace : l'agence est alertée immédiatement en cas de retard." },
    ],
  },
  {
    chemin: "/staff-evenementiel", type: "service", nomCourt: "Soirées et événements d'entreprise", devis: "entreprise",
    titreSeo: "Staff événementiel pour soirées et événements d'entreprise | Heavent",
    descriptionSeo: "Hôtesses, hôtes, stewards et coordination pour soirées d'entreprise, lancements de produit, galas et inaugurations au Maroc. Devis signé en ligne.",
    motsCles: "staff événementiel Maroc, hôtesse soirée entreprise, steward événement, hôtesse gala, lancement produit Maroc",
    h1: "Staff événementiel pour vos soirées et événements d'entreprise",
    accroche: "Galas, lancements, inaugurations, séminaires : une équipe qui accueille, oriente et coordonne.",
    intro: [
      "Une soirée réussie, c'est un accueil fluide, un vestiaire organisé, des invités bien placés et une équipe qui anticipe. Nos hôtesses, hôtes et stewards prennent en charge l'accueil, le contrôle des invitations, le placement, le vestiaire et l'orientation.",
      "Pour les lancements de produit et les inaugurations, nous adaptons la tenue et le discours à votre marque, et un contact unique coordonne l'équipe sur place.",
    ],
    pointsCles: COMMUN_FONCTIONNEMENT,
    evenements: ["Soirées d'entreprise et galas", "Lancements de produit", "Inaugurations", "Séminaires", "Remises de prix", "Événements privés"],
    faq: [
      { q: "Proposez-vous aussi la décoration et l'organisation ?", r: "Oui, nous pouvons organiser tout ou partie de l'événement. Dites-nous ce dont vous avez besoin : le devis détaillera chaque prestation." },
      { q: "Peut-on réserver la même équipe pour un prochain événement ?", r: "Oui, il suffit de nous le demander : nous gardons l'historique de chaque événement et pouvons reconstituer la même équipe selon les disponibilités." },
    ],
  },
  {
    chemin: "/hotesses-mariage", type: "service", nomCourt: "Hôtesses de mariage", devis: "mariage",
    titreSeo: "Hôtesses de mariage au Maroc | Accueil des invités | Heavent",
    descriptionSeo: "Hôtesses et hôtes pour mariages, fiançailles et henné : accueil des invités, placement, vestiaire, coordination jour J. Rabat, Casablanca, Marrakech.",
    motsCles: "hôtesse mariage Maroc, accueil invités mariage, hôtesse mariage Rabat, hôtesse mariage Casablanca, hôtesse mariage Marrakech",
    h1: "Hôtesses et hôtes pour votre mariage",
    accroche: "Pour que vous profitiez de chaque instant pendant que l'on s'occupe de vos invités.",
    intro: [
      "Le jour du mariage, l'accueil donne le ton. Nos hôtesses accueillent vos invités, les orientent vers leur table, gèrent le vestiaire, veillent au bon déroulement des moments clés et restent attentives aux besoins des familles.",
      "Nous intervenons pour les mariages, les fiançailles et le henné, à Rabat, Casablanca, Marrakech et partout au Maroc, et nous pouvons coordonner l'ensemble du jour J avec vos prestataires.",
    ],
    pointsCles: COMMUN_FONCTIONNEMENT,
    evenements: ["Accueil et placement des invités", "Vestiaire", "Coordination des moments clés", "Accompagnement des familles", "Henné et fiançailles", "Coordination jour J"],
    faq: [
      { q: "Combien d'hôtesses prévoir pour un mariage ?", r: "Cela dépend du nombre d'invités, du lieu et des services souhaités (accueil, vestiaire, placement…). Décrivez votre mariage : nous vous proposons une équipe adaptée dans le devis." },
      { q: "Pouvons-nous visualiser notre mariage avant de demander un devis ?", r: "Oui, avec notre simulateur « Crée ton événement » : composez votre décoration, suivez le budget estimé et envoyez votre projet en un clic." },
    ],
  },
  {
    chemin: "/organisation-mariage", type: "service", nomCourt: "Organisation de mariage", devis: "mariage",
    titreSeo: "Organisation de mariage au Maroc | Wedding planner | Heavent",
    descriptionSeo: "Organisation complète ou partielle de votre mariage au Maroc : décoration, prestataires, coordination jour J. Simulateur en ligne et devis détaillé signé en ligne.",
    motsCles: "organisation mariage Maroc, wedding planner Maroc, wedding planner Rabat, organisation mariage Marrakech, décoration mariage Maroc",
    h1: "Organisation de votre mariage, de l'idée au jour J",
    accroche: "Décoration, prestataires, planning, coordination : nous vous accompagnons à chaque étape.",
    intro: [
      "Organiser un mariage, c'est des dizaines de décisions et de prestataires à coordonner. Nous vous accompagnons en organisation complète ou partielle : choix de l'ambiance et de la décoration, sélection des prestataires, planning, et coordination le jour J pour que vous n'ayez à penser qu'à profiter.",
      "Commencez par imaginer votre mariage avec notre simulateur « Crée ton événement » (tables, arche, fleurs, éclairages, fauteuils des mariés…), puis réservez un rendez-vous : nous affinons ensemble le projet et le budget.",
    ],
    pointsCles: [
      { titre: "Un simulateur pour imaginer", texte: "Composez votre décoration et suivez le budget estimé en temps réel, puis envoyez-nous votre projet." },
      { titre: "Un rendez-vous pour affiner", texte: "Réservez un rendez-vous en ligne (agence, téléphone ou visio) pour préciser vos envies et vos prestataires." },
      { titre: "Un devis clair, signé en ligne", texte: "Chaque prestation est détaillée ; vous signez en ligne quand tout vous convient, et vos factures restent disponibles sur votre page." },
    ],
    evenements: ["Organisation complète", "Organisation partielle", "Coordination jour J", "Décoration et scénographie", "Fiançailles et henné", "Mariages à Marrakech, Rabat, Casablanca"],
    faq: [
      { q: "Le devis peut-il évoluer ?", r: "Oui : il est établi d'après vos premières informations, et son montant peut évoluer selon les services et les prestataires retenus lors d'un premier rendez-vous." },
      { q: "Comment se passe le paiement ?", r: "Un acompte est versé à la commande et le solde à la fin de la prestation, sur facture. Vos factures sont téléchargeables depuis la page de votre devis." },
    ],
  },
];

export const PAGES_LOCALES = [...VILLES, ...SERVICES];
