// Démos Heavent Studio par métier : vocabulaire, catalogue, demandes et site vitrine adaptés au secteur du prospect.
export type Secteur = "evenementiel" | "automobile" | "ecommerce" | "immobilier";

export interface DemandeType { nom: string; prenom?: string; type: string; jours: number; quantite: number; services: string; remarques: string }
export interface LigneType { designation: string; unite: string; quantite: number; duree: number; prix: number; description?: string }
export interface ConfigSecteur {
  nom: string;                       // libellé du secteur (choix dans l'admin)
  libelles: Record<string, string>;  // onglets de l'admin renommés
  titres: Record<string, [string, string]>;
  masquer: string[];                 // onglets cachés dans la démo
  catalogue: [string, string, string, number, string][]; // catégorie, désignation, unité, prix, description
  demandes: DemandeType[];
  entreprise: { societe: string; contact: string; besoin: string; quantite: number; remarques: string };
  devis: { client: string; societe?: string; titre: string; lignes: LigneType[] }[];
  postes: string;                    // métier des membres de l'équipe
  site: { accroche: string; titre: string; texte: string; services: [string, string][]; cta: string; formulaire: string; typeDemande: string[] };
  /** Habillage du site de démo : couleurs propres au métier (pas celles de Heavent), mise en avant, chiffres, avis */
  theme: { fond: string; accent: string; surAccent: string; clair: string; texteClair: string };
  /** Photos du métier (assets/studio/demo/<métier>/<n>.jpg) : grande image, cartes mises en avant, services */
  images: { hero: number; cartes: number[]; services: number[] };
  vedette: { titre: string; cartes: [string, string, string][] }; // titre, détail, prix/étiquette (image n° = index + 2)
  chiffres: [string, string][];
  avis: [string, string][];
}

export const SECTEURS: Record<Secteur, ConfigSecteur> = {
  evenementiel: {
    nom: "Agence événementielle", libelles: {}, titres: {}, masquer: [],
    catalogue: [], demandes: [], entreprise: { societe: "", contact: "", besoin: "", quantite: 0, remarques: "" }, devis: [], postes: "Hôtesse d'accueil",
    images: { hero: 0, cartes: [7, 2, 3], services: [3, 1, 4, 5] },
    theme: { fond: "#3B1F33", accent: "#E8A9B5", surAccent: "#3B1F33", clair: "#FBF3F4", texteClair: "#4A2E40" },
    vedette: { titre: "Nos dernières réalisations", cartes: [["Mariage au bord de la piscine", "250 invités · décoration florale", "Mariage"], ["Gala d'entreprise", "400 invités · scène et lumières", "Entreprise"], ["Fiançailles traditionnelles", "120 invités · négafa et henné", "Fiançailles"]] },
    chiffres: [["350+", "événements organisés"], ["120", "professionnels mobilisés"], ["4,9/5", "note de nos clients"]],
    avis: [["Sofia & Adam", "Une organisation parfaite, nos invités en parlent encore !"], ["Atlas Tech", "Équipe réactive et hôtesses impeccables pendant 3 jours de salon."], ["Leila", "Ils ont tout géré, nous avons juste profité."]],
    site: {
      accroche: "Agence événementielle", titre: "Des événements inoubliables, organisés dans les moindres détails",
      texte: "Mariages, fiançailles, baby showers, séminaires et salons : une équipe passionnée pour faire de chaque moment un souvenir.",
      services: [["Mariages", "Organisation complète ou partielle, coordination du jour J."], ["Hôtesses & accueil", "Des équipes formées, bilingues, pour vos invités."], ["Événements d'entreprise", "Séminaires, salons, lancements et galas."], ["Décoration", "Scénographie, fleurs et mise en lumière sur mesure."]],
      cta: "Demander un devis gratuit", formulaire: "Parlez-nous de votre événement", typeDemande: ["Mariage", "Fiançailles", "Baby shower", "Anniversaire", "Événement d'entreprise"],
    },
  },
  automobile: {
    nom: "Concession automobile",
    libelles: { mariage: "Demandes clients", entreprise: "Flottes", "devis-rapide": "Offres", "devis-envoyes": "Envoyées", "envoyer-devis": "Envoyer", staff: "Équipe", disponibilites: "Planning", realisations: "Site" },
    titres: { mariage: ["Demandes clients", "Essais, reprises et demandes d'offre reçues sur le site"], entreprise: ["Flottes entreprises", "Demandes des professionnels"], "devis-rapide": ["Offres", "Créer, envoyer et suivre les offres et factures"], staff: ["Équipe", "Conseillers commerciaux et techniciens"] },
    masquer: ["instagram", "lieux"],
    catalogue: [
      ["vehicule", "Citadine — finition Confort", "unite", 165000, "Boîte manuelle, 5 places, garantie 3 ans"],
      ["vehicule", "SUV compact — finition Premium", "unite", 289000, "Boîte automatique, toit panoramique"],
      ["vehicule", "Berline hybride", "unite", 345000, "Hybride rechargeable, 50 km en électrique"],
      ["option", "Pack sécurité (caméra 360°, aide au stationnement)", "forfait", 9500, ""],
      ["option", "Peinture métallisée", "forfait", 6000, ""],
      ["service", "Contrat d'entretien 3 ans", "forfait", 12500, "Révisions et pièces d'usure incluses"],
      ["service", "Extension de garantie 2 ans", "forfait", 7900, ""],
      ["service", "Frais d'immatriculation et mise à la route", "forfait", 3500, ""],
    ],
    demandes: [
      { nom: "Youssef", prenom: "Alami", type: "Essai routier", jours: 2, quantite: 1, services: "SUV compact — finition Premium", remarques: "Disponible samedi matin. Possède une berline 2018 à reprendre." },
      { nom: "Meryem", type: "Demande d'offre", jours: 5, quantite: 1, services: "Berline hybride", remarques: "Souhaite un financement sur 48 mois." },
      { nom: "Hamza", type: "Reprise de véhicule", jours: 3, quantite: 1, services: "Estimation reprise", remarques: "Citadine 2019, 62 000 km, carnet d'entretien complet." },
    ],
    entreprise: { societe: "Atlas Logistique", contact: "Karim Bennis", besoin: "Flotte de véhicules utilitaires", quantite: 6, remarques: "6 citadines pour les commerciaux, livraison sous 2 mois, contrat d'entretien souhaité." },
    devis: [
      { client: "Nadia Berrada", titre: "SUV compact — finition Premium", lignes: [{ designation: "SUV compact — finition Premium", unite: "unite", quantite: 1, duree: 1, prix: 289000 }, { designation: "Pack sécurité (caméra 360°, aide au stationnement)", unite: "forfait", quantite: 1, duree: 1, prix: 9500 }, { designation: "Frais d'immatriculation et mise à la route", unite: "forfait", quantite: 1, duree: 1, prix: 3500 }] },
      { client: "Omar Tazi", societe: "Tazi & Fils", titre: "Flotte — 3 citadines", lignes: [{ designation: "Citadine — finition Confort", unite: "unite", quantite: 3, duree: 1, prix: 165000 }, { designation: "Contrat d'entretien 3 ans", unite: "forfait", quantite: 3, duree: 1, prix: 12500 }] },
    ],
    postes: "Conseiller commercial",
    images: { hero: 7, cartes: [1, 2, 6], services: [0, 4, 3, 5] },
    theme: { fond: "#0B1A2E", accent: "#3D8BFF", surAccent: "#FFFFFF", clair: "#F2F5F9", texteClair: "#1B2A40" },
    vedette: { titre: "Les modèles du moment", cartes: [["SUV compact Premium", "Automatique · toit panoramique", "289 000 MAD"], ["Berline hybride", "50 km en électrique · 4,2 L/100", "345 000 MAD"], ["Citadine Confort", "Idéale en ville · garantie 3 ans", "165 000 MAD"]] },
    chiffres: [["1 200+", "véhicules livrés"], ["48 h", "pour une reprise estimée"], ["24 mois", "de garantie sur l'occasion"]],
    avis: [["Nadia B.", "Essai réservé en ligne, voiture livrée en 10 jours. Parfait."], ["Omar T.", "Reprise de mon ancien véhicule au juste prix, sans prise de tête."], ["Atlas Logistique", "Flotte de 6 véhicules livrée dans les délais, suivi impeccable."]],
    site: {
      accroche: "Concession automobile", titre: "Votre prochaine voiture vous attend",
      texte: "Véhicules neufs et d'occasion, reprise de votre ancien véhicule, financement sur mesure et atelier agréé : tout au même endroit.",
      services: [["Véhicules neufs", "Toute la gamme, disponible à l'essai sur rendez-vous."], ["Occasions garanties", "Véhicules contrôlés, garantie jusqu'à 24 mois."], ["Reprise & financement", "Estimation gratuite et solutions de financement."], ["Atelier & entretien", "Révisions, pneus, carrosserie : prise de rendez-vous en ligne."]],
      cta: "Réserver un essai", formulaire: "Votre demande", typeDemande: ["Essai routier", "Demande d'offre", "Reprise de véhicule", "Entretien", "Flotte entreprise"],
    },
  },
  ecommerce: {
    nom: "E-commerce",
    libelles: { mariage: "Commandes", entreprise: "Clients pro", "devis-rapide": "Devis", staff: "Équipe", disponibilites: "Planning", realisations: "Boutique" },
    titres: { mariage: ["Commandes et demandes", "Commandes spéciales, retours et demandes clients"], entreprise: ["Clients professionnels", "Demandes de prix en gros et revendeurs"], staff: ["Équipe", "Préparateurs, livreurs et service client"] },
    masquer: ["lieux"],
    catalogue: [
      ["produit", "Coffret cadeau Prestige", "unite", 450, "Assortiment de 6 produits, emballage premium"],
      ["produit", "Bougie parfumée artisanale", "unite", 120, "Cire végétale, 40 h de combustion"],
      ["produit", "Savon naturel à l'huile d'argan", "unite", 45, ""],
      ["produit", "Huile d'argan cosmétique 100 ml", "unite", 180, "Bio, pressée à froid"],
      ["service", "Personnalisation (gravure, carte, logo)", "unite", 25, ""],
      ["service", "Livraison express 24 h", "forfait", 60, ""],
      ["service", "Emballage cadeau", "unite", 20, ""],
    ],
    demandes: [
      { nom: "Salma", prenom: "Idrissi", type: "Commande spéciale", jours: 4, quantite: 30, services: "Coffret cadeau Prestige", remarques: "Pour des cadeaux d'invités, avec cartes personnalisées." },
      { nom: "Rachid", type: "Retour produit", jours: 1, quantite: 1, services: "Bougie parfumée artisanale", remarques: "Colis abîmé à la livraison, souhaite un échange." },
      { nom: "Imane", type: "Question produit", jours: 2, quantite: 1, services: "Huile d'argan cosmétique 100 ml", remarques: "Convient-elle aux peaux sensibles ?" },
    ],
    entreprise: { societe: "Hôtel Riad Atlas", contact: "Karim Bennis", besoin: "Achat en gros", quantite: 200, remarques: "200 savons et 50 huiles d'argan par mois pour les chambres." },
    devis: [
      { client: "Salma Idrissi", titre: "30 coffrets cadeaux personnalisés", lignes: [{ designation: "Coffret cadeau Prestige", unite: "unite", quantite: 30, duree: 1, prix: 450 }, { designation: "Personnalisation (gravure, carte, logo)", unite: "unite", quantite: 30, duree: 1, prix: 25 }] },
      { client: "Karim Bennis", societe: "Hôtel Riad Atlas", titre: "Approvisionnement mensuel", lignes: [{ designation: "Savon naturel à l'huile d'argan", unite: "unite", quantite: 200, duree: 1, prix: 38 }, { designation: "Huile d'argan cosmétique 100 ml", unite: "unite", quantite: 50, duree: 1, prix: 150 }] },
    ],
    postes: "Préparateur de commandes",
    images: { hero: 0, cartes: [4, 1, 7], services: [5, 4, 6, 0] },
    theme: { fond: "#3E2A21", accent: "#D9825B", surAccent: "#FFFFFF", clair: "#FBF5EE", texteClair: "#4B362B" },
    vedette: { titre: "Nos best-sellers", cartes: [["Coffret Prestige", "6 produits · emballage premium", "450 MAD"], ["Bougie artisanale", "Cire végétale · 40 h", "120 MAD"], ["Huile d'argan 100 ml", "Bio · pressée à froid", "180 MAD"]] },
    chiffres: [["15 000+", "colis expédiés"], ["24-48 h", "livraison partout au Maroc"], ["4,8/5", "avis clients"]],
    avis: [["Salma I.", "Coffrets magnifiques pour mes invités, livrés à temps !"], ["Rachid", "Échange fait en 48 h, service client au top."], ["Riad Atlas", "Nos commandes mensuelles arrivent toujours à l'heure."]],
    site: {
      accroche: "Boutique en ligne", titre: "Des produits naturels, livrés partout au Maroc",
      texte: "Cosmétiques, bougies et coffrets cadeaux fabriqués avec soin. Livraison en 24 à 48 h, paiement à la livraison.",
      services: [["Coffrets cadeaux", "Pour offrir ou pour vos événements, personnalisables."], ["Cosmétiques naturels", "Huile d'argan, savons et soins artisanaux."], ["Commandes pro", "Prix dégressifs pour hôtels, spas et revendeurs."], ["Livraison rapide", "Partout au Maroc, suivi de colis par WhatsApp."]],
      cta: "Passer une commande", formulaire: "Votre commande ou question", typeDemande: ["Commande spéciale", "Question produit", "Retour produit", "Achat en gros"],
    },
  },
  immobilier: {
    nom: "Agence immobilière",
    libelles: { mariage: "Demandes", entreprise: "Propriétaires", "devis-rapide": "Mandats", staff: "Agents", disponibilites: "Planning", realisations: "Annonces" },
    titres: { mariage: ["Demandes des clients", "Visites, estimations et recherches de biens"], entreprise: ["Propriétaires", "Biens confiés à la vente ou à la location"], "devis-rapide": ["Mandats & honoraires", "Créer, envoyer et suivre les mandats et factures"], staff: ["Agents", "Votre équipe d'agents immobiliers"] },
    masquer: ["instagram", "lieux"],
    catalogue: [
      ["honoraires", "Honoraires de transaction", "forfait", 25000, "2,5 % du prix de vente"],
      ["honoraires", "Honoraires de location (1 mois de loyer)", "forfait", 8000, ""],
      ["service", "Estimation détaillée du bien", "forfait", 1500, "Visite, étude de marché, rapport"],
      ["service", "Reportage photo et visite virtuelle", "forfait", 2500, ""],
      ["service", "Gestion locative mensuelle", "forfait", 800, "Encaissement, suivi, état des lieux"],
    ],
    demandes: [
      { nom: "Leila", prenom: "Chraibi", type: "Demande de visite", jours: 2, quantite: 1, services: "Appartement 3 pièces, centre-ville", remarques: "Disponible en fin de journée, budget 1,6 M MAD." },
      { nom: "Hicham", type: "Estimation", jours: 4, quantite: 1, services: "Villa 4 chambres", remarques: "Souhaite vendre d'ici 6 mois." },
      { nom: "Sara", type: "Recherche location", jours: 1, quantite: 1, services: "Studio meublé", remarques: "Pour une mutation, entrée au 1er du mois." },
    ],
    entreprise: { societe: "Résidence Les Jardins", contact: "Karim Bennis", besoin: "Mise en location", quantite: 12, remarques: "12 appartements neufs à louer, gestion locative souhaitée." },
    devis: [
      { client: "Hicham Fassi", titre: "Mandat de vente — villa 4 chambres", lignes: [{ designation: "Honoraires de transaction", unite: "forfait", quantite: 1, duree: 1, prix: 25000 }, { designation: "Reportage photo et visite virtuelle", unite: "forfait", quantite: 1, duree: 1, prix: 2500 }] },
      { client: "Karim Bennis", societe: "Résidence Les Jardins", titre: "Gestion locative — 12 appartements", lignes: [{ designation: "Gestion locative mensuelle", unite: "forfait", quantite: 12, duree: 1, prix: 800 }] },
    ],
    postes: "Agent immobilier",
    images: { hero: 0, cartes: [2, 1, 7], services: [3, 0, 6, 4] },
    theme: { fond: "#16332A", accent: "#C9A46A", surAccent: "#16332A", clair: "#F5F1E8", texteClair: "#24423A" },
    vedette: { titre: "Biens à la une", cartes: [["Villa avec piscine", "4 chambres · 420 m² · jardin", "4 200 000 MAD"], ["Appartement lumineux", "3 pièces · 110 m² · terrasse", "1 650 000 MAD"], ["Penthouse vue mer", "180 m² · 2 terrasses", "3 900 000 MAD"]] },
    chiffres: [["600+", "biens vendus ou loués"], ["30 jours", "délai moyen de vente"], ["98 %", "propriétaires satisfaits"]],
    avis: [["Hicham F.", "Villa vendue en 5 semaines, au prix estimé."], ["Leila C.", "Des visites bien préparées, un vrai accompagnement."], ["Résidence Les Jardins", "Gestion locative sérieuse, loyers toujours à l'heure."]],
    site: {
      accroche: "Agence immobilière", titre: "Trouvez le bien qui vous ressemble",
      texte: "Vente, location, estimation et gestion locative : une équipe locale qui connaît chaque quartier.",
      services: [["Acheter", "Des biens sélectionnés et visités par nos agents."], ["Vendre", "Estimation offerte et diffusion sur tous les portails."], ["Louer", "Appartements, villas et bureaux, meublés ou non."], ["Gestion locative", "Nous nous occupons de tout, vous encaissez."]],
      cta: "Demander une visite", formulaire: "Votre projet immobilier", typeDemande: ["Demande de visite", "Estimation", "Recherche location", "Mise en vente"],
    },
  },
};

export const secteurDe = (s?: string | null): Secteur => (s && s in SECTEURS ? (s as Secteur) : "evenementiel");

export const imageDemo = (secteur: Secteur, n: number) => `https://mapiwnsjsluiwmnulhqk.supabase.co/storage/v1/object/public/assets/studio/demo/${secteur}/${n}.jpg`;
