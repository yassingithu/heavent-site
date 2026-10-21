// Données fictives d'une agence événementielle, personnalisées avec le nom et la ville du prospect.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SECTEURS, secteurDe } from "./secteurs";
export interface ConfigDemo { agence: string; prenom?: string | null; ville?: string | null; secteur?: string | null; logo_url?: string | null }
export type BaseDemo = Record<string, any[]> & { _meta: any };

const VISUELS = "https://mapiwnsjsluiwmnulhqk.supabase.co/storage/v1/object/public/assets/instagram/visuels/";
const uuid = () => (crypto as any).randomUUID?.() ?? "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c: any) => (c ^ (Math.random() * 16) >> c / 4).toString(16));
const jour = (n: number) => new Date(Date.now() + n * 864e5).toISOString().slice(0, 10);
const ilYa = (h: number) => new Date(Date.now() - h * 36e5).toISOString();
const r2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

const cat = (categorie: string, designation: string, unite: string, prix_unitaire: number, description = "") =>
  ({ id: "c_" + designation.replace(/\W+/g, "_"), categorie, designation, unite, prix_unitaire, actif: true, ordre: 0, description });

export function creerBaseDemo(cfg: ConfigDemo): BaseDemo {
  const ville = (cfg.ville || "Casablanca").trim();
  const agence = cfg.agence.trim() || "Votre agence";
  const crews = [["Lina", "Amrani", "Femme", "Arabe, Français, Anglais"], ["Sara", "El Fassi", "Femme", "Arabe, Français"], ["Yasmine", "Berrada", "Femme", "Arabe, Français, Espagnol"],
    ["Mehdi", "Alaoui", "Homme", "Arabe, Français, Anglais"], ["Rania", "Saidi", "Femme", "Arabe, Français, Anglais"], ["Omar", "Kettani", "Homme", "Arabe, Français"]];
  const staff = crews.map(([prenom, nom, genre, langues], i) => ({
    id: "s" + (i + 1), prenom, nom, genre, langues, ville, email: `${prenom.toLowerCase()}@demo.test`, telephone: "+212600000000", taux_horaire: 60 + (i % 3) * 10,
    age: 22 + i, taille: genre === "Femme" ? 168 + i : 180 + i, permis: i % 2 === 0, experience: "Accueil en salons, mariages et galas.", created_at: ilYa(200 + i * 30), banni: false,
  }));
  const disponibilites = staff.flatMap((s, i) => [8, 9, 10, 15, 16].map((k) => ({ id: `d${i}${k}`, staff_id: s.id, date_jour: jour(k), creneau: (i + k) % 2 ? "soir" : "journee", disponible: true })));

  const catalogue_prestations = [
    cat("mariage", "Organisation complète du mariage", "forfait", 25000, "Wedding planning de A à Z"),
    cat("mariage", "Hôtesses d'accueil invités (mariage)", "jour", 900, "Accueil, vestiaire, placement"),
    cat("mariage", "Traiteur mariage (menu complet)", "personne", 450, "Cocktail, entrées, plats, pâtisseries, service à table"),
    cat("mariage", "DJ / animation musicale", "forfait", 12000, "DJ, sonorisation et éclairage de piste"),
    cat("mariage", "Décoration et art floral", "forfait", 30000, "Scénographie, fleurs, centres de table"),
    cat("mariage", "Photographe", "forfait", 8000, "Couverture complète, retouches, galerie en ligne"),
    cat("mariage", "Vidéaste", "forfait", 10000, "Film de la soirée, teaser, drone"),
    cat("staff", "Hôtesse d'accueil", "jour", 900, "Journée de 8 h — français / arabe"),
    cat("staff", "Hôtesse bilingue", "jour", 1200, "Journée de 8 h — français / anglais / arabe"),
    cat("staff", "Steward / agent d'accueil", "jour", 900, "Journée de 8 h"),
  ];

  const devis_mariage = [
    { id: uuid(), nom: "Sofia", prenom: "Adam", email: "sofia@demo.test", telephone: "+212600000000", type_evenement: "Mariage", date_mariage: jour(40), lieu: ville, nb_invites: 250,
      services: "DJ / Animation musicale, Décoration, Photographe, Traiteur, Hôtes/Hôtesses d'accueil", remarques: "Mariage en plein air, ambiance blanc et or.\nBudget : 250 000 MAD - 350 000 MAD", statut: "en_attente", created_at: ilYa(2) },
    { id: uuid(), nom: "Leila", prenom: "", email: "leila@demo.test", telephone: "+212600000000", type_evenement: "Fiançailles", date_mariage: jour(55), lieu: ville, nb_invites: 120,
      services: "Décoration, Photographe, Hôtes/Hôtesses d'accueil", remarques: "Fiançailles traditionnelles.", statut: "en_attente", created_at: ilYa(20) },
    { id: uuid(), nom: "Nadia", prenom: "", email: "nadia@demo.test", telephone: "+212600000000", type_evenement: "Baby shower", date_mariage: jour(25), lieu: ville, nb_invites: 40,
      services: "Décoration", remarques: "Thème pastel, ballons et bar à desserts.", statut: "en_attente", created_at: ilYa(30) },
  ];
  const devis_entreprise = [{ id: uuid(), entreprise: "Atlas Tech Expo", prenom: "Karim", nom: "Bennis", email: "karim@demo.test", telephone: "+212600000000", date_evenement: jour(18), lieu: ville,
    nb_personnes: 8, nb_staff: 8, services: "Salon professionnel", remarques: "8 hôtesses bilingues pendant 3 jours de salon.", statut: "en_attente", created_at: ilYa(5) }];

  // Devis déjà traités : un signé (avec facture d'acompte), un envoyé en attente de réponse
  const d1 = uuid(), d2 = uuid();
  const devis: any[] = [
    { id: d1, numero: "DEV-2026-0041", type: "entreprise", marque: "heavent", statut: "accepte", client_nom: "Salma Idrissi", client_societe: "Maroc Pharma Congrès", client_email: "salma@demo.test",
      client_telephone: "+212600000000", titre: "Congrès médical — accueil et orientation", date_evenement: jour(12), date_fin_evenement: jour(13), lieu: ville, nb_personnes: 6,
      taux_tva: 20, acompte_pct: 50, remise_globale_pct: 0, devise: "MAD", date_emission: jour(-9), date_validite: jour(21), date_envoi: ilYa(200), signe_le: ilYa(150), signature_nom: "Salma Idrissi",
      lien_token: uuid(), relances: 0, created_at: ilYa(216) },
    { id: d2, numero: "DEV-2026-0042", type: "mariage", marque: "heavent", statut: "envoye", client_nom: "Ines & Youssef", client_email: "ines@demo.test", client_telephone: "+212600000000",
      titre: "Mariage — soirée et accueil des invités", date_evenement: jour(60), lieu: ville, nb_personnes: 300, taux_tva: 20, acompte_pct: 30, remise_globale_pct: 5, devise: "MAD",
      date_emission: jour(-3), date_validite: jour(27), date_envoi: ilYa(70), lien_token: uuid(), relances: 0, created_at: ilYa(72) },
  ];
  const ligne = (devis_id: string, ordre: number, designation: string, unite: string, quantite: number, duree: number, prix_unitaire: number, description = "") =>
    ({ id: uuid(), devis_id, ordre, designation, description, unite, quantite, duree, prix_unitaire, remise_pct: 0, total_ht: r2(quantite * duree * prix_unitaire), created_at: ilYa(100) });
  const devis_lignes = [
    ligne(d1, 0, "Hôtesse bilingue", "jour", 6, 2, 1200, "Journée de 8 h — français / anglais / arabe"),
    ligne(d1, 1, "Coordination sur place", "forfait", 1, 1, 3500),
    ligne(d2, 0, "Décoration et art floral", "forfait", 1, 1, 30000), ligne(d2, 1, "DJ / animation musicale", "forfait", 1, 1, 12000),
    ligne(d2, 2, "Hôtesses d'accueil invités (mariage)", "jour", 4, 1, 900), ligne(d2, 3, "Traiteur mariage (menu complet)", "personne", 300, 1, 450),
  ];

  const parametres_agence = [{ id: 1, raison_sociale: agence, adresse: "Boulevard principal", ville, telephone: "+212 6 00 00 00 00", email: "contact@votre-agence.ma",
    site_web: "www.votre-agence.ma", ice: "000000000000000", rc: "000000", taux_tva: 20, devise: "MAD", validite_jours: 30,
    conditions: "Acompte à la signature, solde à la fin de la prestation.", cgv: null, conditions_contrat: null, lien_avis_google: null }];

  // Statistiques de visite des 30 derniers jours
  const evenements_site: any[] = [];
  const pages = ["/", "/devis-mariage", "/cree-ton-evenement", "/a-propos", "/realisations", "/contact", "/guides"];
  const sources = ["Google", "Instagram", "Direct", "WhatsApp", "Facebook"];
  let n = 0;
  for (let d = 29; d >= 0; d--) {
    const nb = 18 + Math.round(12 * Math.sin(d / 3) + (29 - d) * 0.8);
    for (let s = 0; s < nb; s++) {
      const session = "v" + n++; const cree_le = new Date(Date.now() - d * 864e5).toISOString();
      const source = sources[(s + d) % 5]; const appareil = s % 3 ? "mobile" : "ordinateur";
      for (let v = 0; v < 1 + (s % 3); v++) evenements_site.push({ type: "vue", chemin: pages[(s + v * 2 + d) % pages.length], session, source, appareil, cree_le });
      if (s % 9 === 0) evenements_site.push({ type: "clic", nom: "whatsapp", session, source, appareil, cree_le });
      if (s % 14 === 0) evenements_site.push({ type: "demande", nom: s % 28 ? "devis-mariage" : "jeu", session, source, appareil, cree_le });
    }
  }

  const rdv = (k: number, h: number, nom: string, type: string, message: string) => {
    const debut = new Date(`${jour(k)}T${String(h).padStart(2, "0")}:00:00Z`);
    return { id: uuid(), debut: debut.toISOString(), fin: new Date(+debut + 45 * 6e4).toISOString(), type, statut: "confirme", client_nom: nom, client_email: "rdv@demo.test",
      client_telephone: "+212600000000", message, langue: "fr", source: "site", created_at: ilYa(10) };
  };

  // Espace crew : une mission à venir, un contrat à signer, une fiche de paie du mois dernier (pour le premier membre de l'équipe)
  const s1 = staff[0];
  const moisDernier = new Date(); moisDernier.setMonth(moisDernier.getMonth() - 1);
  const affectations = [1, 2].map((k) => ({ id: uuid(), devis_id: d1, staff_id: s1.id, date_jour: jour(11 + k), heure_debut: "09:00", heure_fin: "17:00", heures: 8, taux_horaire: s1.taux_horaire,
    poste: "Hôtesse bilingue", statut: "confirme", presence_confirmee_le: null, arrivee_le: null, depart_le: null, created_at: ilYa(140) }));
  const contrats = [{ id: uuid(), staff_id: s1.id, devis_id: d1, titre: "Contrat de prestation — Congrès médical", type_contrat: "CDD d'usage", evenement: "Congrès médical — accueil et orientation",
    devis_numero: "DEV-2026-0041", lieu: ville, date_debut: jour(12), date_fin: jour(13), taux_horaire: s1.taux_horaire, total_heures: 16, salaire_brut: 16 * s1.taux_horaire,
    dates: [{ date: jour(12), heures: 8, heure_debut: "09:00", heure_fin: "17:00" }, { date: jour(13), heures: 8, heure_debut: "09:00", heure_fin: "17:00" }],
    statut: "envoye", signe_le: null, created_at: ilYa(140) }];
  const fiches_paie = [{ id: uuid(), staff_id: s1.id, mois: moisDernier.getMonth() + 1, annee: moisDernier.getFullYear(), heures_travaillees: 24, salaire_brut: 24 * s1.taux_horaire,
    cnss: r2(24 * s1.taux_horaire * 0.0448), amo: r2(24 * s1.taux_horaire * 0.0226), deductions: r2(24 * s1.taux_horaire * 0.0674), prime: 100,
    salaire_net: r2(24 * s1.taux_horaire * (1 - 0.0674) + 100), statut: "payee", generee_auto: true, created_at: ilYa(400),
    details: [{ date: moisDernier.toISOString().slice(0, 10), evenement: "Salon de l'immobilier", numero: "DEV-2026-0031", poste: "Hôtesse d'accueil", heures: 24, taux: s1.taux_horaire, montant: 24 * s1.taux_horaire }] }];
  const fiches_mission = [{ id: uuid(), devis_id: d1, adresse: `Palais des congrès, ${ville}`, latitude: null, longitude: null, rayon_m: 300,
    tenue: "Tailleur noir, chaussures fermées, chignon", consignes: "Arrivée 30 min avant l'ouverture pour le briefing. Accueil des participants, remise des badges, orientation vers les salles.",
    contact_sur_place: "Salma Idrissi — +212 6 00 00 00 00", created_at: ilYa(130) }];

  const base: any = {
    _meta: { agence, prenom: cfg.prenom || null, ville, compteurDevis: 42, compteurFactures: 1, secteur: secteurDe(cfg.secteur), logo: cfg.logo_url || null, crew: s1.email },
    staff, disponibilites, catalogue_prestations, devis_mariage, devis_entreprise, devis, devis_lignes, parametres_agence, evenements_site,
    affectations, contrats, fiches_paie, fiches_mission, evaluations_crew: [], remarques_contrat: [],
    factures: [], admins: [{ email: "demo@heavent.studio" }],
    agenda_parametres: [{ id: 1, duree_minutes: 45, pause_minutes: 15, delai_heures: 24, horizon_jours: 30, types: ["agence", "telephone", "visio"], adresse: null, lien_visio: null, actif: true }],
    agenda_horaires: [1, 2, 3, 4, 5, 6].flatMap((j) => [{ id: "h" + j + "a", jour: j, debut: "10:00:00", fin: "13:00:00" }, { id: "h" + j + "b", jour: j, debut: "15:00:00", fin: "19:00:00" }]),
    agenda_indisponibilites: [],
    rendez_vous: [rdv(2, 10, "Ines & Youssef", "agence", "Choix de la décoration"), rdv(4, 15, "Atlas Tech Expo", "visio", "Briefing des hôtesses")],
    vitrine: [{ id: 1, annees_experience: 8, nb_evenements: 350, nb_crews: 120, google_note: 4.9, google_nb_avis: 87, google_lien: null, engagement_cnss: true, engagement_assurance: true,
      engagement_remplacement: true, engagement_reponse_24h: true, faq: [{ q: "Faut-il verser un acompte ?", r: "Oui : l'acompte indiqué sur le devis est payable à la commande." }] }],
    references_clients: [], temoignages: [], realisations: [],
    posts_instagram: [
      ["6d4fb285-2828-4278-97b6-8c79a45448aa", "mariage", "Conseil mariage", "Les 5 détails que vos invités retiendront", "publie"],
      ["ec37691c-ad68-4803-b50b-f0f48a5d01be", "naissance", "Baby shower", "Une baby shower inoubliable, sans stress", "pret"],
      ["945d232d-9c51-4915-bfea-28211318488d", "entreprise", "Événement d'entreprise", "Réussir l'accueil de votre salon", "pret"],
      ["661a8407-d086-49ab-a169-762af6be1870", "naissance", "Naissance", "Les essentiels d'une fête de naissance réussie", "pret"],
    ].map(([id, theme, accroche, titre, statut], i) => ({ id, theme, accroche, titre, statut, style: i % 2 ? "clair" : "sombre", legende: `${titre}\n\nCommentez « GUIDE » pour recevoir notre guide gratuit.`,
      recherche: theme, photo_url: `${VISUELS}${id}.jpg`, visuel_url: `${VISUELS}${id}.jpg`, date_prevue: new Date(Date.now() + (i - 1) * 2 * 864e5).toISOString(), publie_le: statut === "publie" ? ilYa(48) : null })),
    instagram_commentaires: [], newsletters: [],
    abonnes_newsletter: ["amal", "hind", "rachid", "zineb", "samir"].map((p, i) => ({ id: uuid(), email: `${p}@demo.test`, prenom: p[0].toUpperCase() + p.slice(1), themes: [["mariage"], ["naissance"], ["entreprise"], ["mariage", "fete"], ["mariage"]][i],
      source: "guide", consentement: true, desinscrit_le: null, jeton: uuid(), cree_le: ilYa(24 * (i + 1) * 3) })),
    admin_profils: [], abonnements_push: [],
  };
  adapterAuSecteur(base, ville);
  return base as BaseDemo;
}

/** Remplace les données événementielles par celles du métier choisi (concession, e-commerce, immobilier…) */
function adapterAuSecteur(base: any, ville: string) {
  const sec = SECTEURS[secteurDe(base._meta.secteur)];
  if (base._meta.secteur === "evenementiel") return;
  base.catalogue_prestations = sec.catalogue.map(([categorie, designation, unite, prix_unitaire, description]) => cat(categorie, designation, unite, prix_unitaire, description));
  base.devis_mariage = sec.demandes.map((d, i) => ({ id: uuid(), nom: d.nom, prenom: d.prenom ?? "", email: `${d.nom.toLowerCase()}@demo.test`, telephone: "+212600000000",
    type_evenement: d.type, date_mariage: jour(d.jours + 3), lieu: ville, nb_invites: d.quantite, services: d.services, remarques: d.remarques, statut: "en_attente", created_at: ilYa(3 + i * 9) }));
  const e = sec.entreprise;
  const [prenom, ...nom] = e.contact.split(" ");
  base.devis_entreprise = [{ id: uuid(), entreprise: e.societe, prenom, nom: nom.join(" "), email: "pro@demo.test", telephone: "+212600000000", date_evenement: jour(20), lieu: ville,
    nb_personnes: e.quantite, nb_staff: e.quantite, services: e.besoin, remarques: e.remarques, statut: "en_attente", created_at: ilYa(6) }];
  const [a, b] = base.devis;
  sec.devis.forEach((d, i) => {
    const cible = i === 0 ? a : b;
    Object.assign(cible, { client_nom: d.client, client_societe: d.societe ?? null, titre: d.titre, type: d.societe ? "entreprise" : "mariage", nb_personnes: null });
    base.devis_lignes = base.devis_lignes.filter((l: any) => l.devis_id !== cible.id);
    d.lignes.forEach((l, o) => base.devis_lignes.push({ id: uuid(), devis_id: cible.id, ordre: o, designation: l.designation, description: l.description ?? "", unite: l.unite,
      quantite: l.quantite, duree: l.duree, prix_unitaire: l.prix, remise_pct: 0, total_ht: r2(l.quantite * l.duree * l.prix), created_at: ilYa(100) }));
  });
  base.staff.forEach((s: any) => { s.experience = `${sec.postes} — 3 ans d'expérience.`; });
  base.affectations.forEach((x: any) => { x.poste = sec.postes; });
  base.contrats.forEach((c: any) => { c.titre = `Contrat — ${a.titre}`; c.evenement = a.titre; });
  base.fiches_paie.forEach((f: any) => f.details.forEach((d: any) => { d.poste = sec.postes; d.evenement = "Mission du mois"; }));
  base.fiches_mission.forEach((f: any) => { f.adresse = `${base._meta.agence}, ${ville}`; f.tenue = "Tenue professionnelle"; f.consignes = "Arrivée 15 min avant, point avec le responsable, puis prise de poste."; });
  base.posts_instagram = sec.masquer.includes("instagram") ? [] : base.posts_instagram;
  base.evenements_site.forEach((ev: any) => { if (ev.chemin === "/devis-mariage" || ev.chemin === "/cree-ton-evenement") ev.chemin = "/demande"; if (ev.nom === "jeu" || ev.nom === "devis-mariage") ev.nom = "demande"; });
}
