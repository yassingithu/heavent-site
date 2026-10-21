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
}

export const SECTEURS: Record<Secteur, ConfigSecteur> = {
  evenementiel: {
    nom: "Agence événementielle", libelles: {}, titres: {}, masquer: [],
    catalogue: [], demandes: [], entreprise: { societe: "", contact: "", besoin: "", quantite: 0, remarques: "" }, devis: [], postes: "Hôtesse d'accueil",
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
    site: {
      accroche: "Agence immobilière", titre: "Trouvez le bien qui vous ressemble",
      texte: "Vente, location, estimation et gestion locative : une équipe locale qui connaît chaque quartier.",
      services: [["Acheter", "Des biens sélectionnés et visités par nos agents."], ["Vendre", "Estimation offerte et diffusion sur tous les portails."], ["Louer", "Appartements, villas et bureaux, meublés ou non."], ["Gestion locative", "Nous nous occupons de tout, vous encaissez."]],
      cta: "Demander une visite", formulaire: "Votre projet immobilier", typeDemande: ["Demande de visite", "Estimation", "Recherche location", "Mise en vente"],
    },
  },
};

export const secteurDe = (s?: string | null): Secteur => (s && s in SECTEURS ? (s as Secteur) : "evenementiel");
