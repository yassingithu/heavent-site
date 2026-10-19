/** Modèles de départ de l'espace mariés (modifiables par les mariés). */
export type Echeance = "12m" | "6m" | "3m" | "1m" | "1s" | "j";
export interface Tache { id: string; titre: string; echeance: Echeance; fait: boolean }
export interface PosteBudget { id: string; poste: string; prevu: number | null; reel: number | null; paye: number | null }
export interface Moment { id: string; heure: string; titre: string; details: string }
export interface TableMariage { id: string; nom: string; places: number }
export interface Invite {
  id: string; jeton: string; nom: string; cote: "mariee" | "marie" | "commun"; nb_prevus: number;
  reponse: "attente" | "oui" | "non"; nb_confirmes: number | null; remarque: string | null; table_id: string | null; repondu_le: string | null;
}

export const uid = () => Math.random().toString(36).slice(2, 10);

export const ECHEANCES: { cle: Echeance; libelle: string; jours: number }[] = [
  { cle: "12m", libelle: "12 mois avant", jours: 365 },
  { cle: "6m", libelle: "6 mois avant", jours: 182 },
  { cle: "3m", libelle: "3 mois avant", jours: 91 },
  { cle: "1m", libelle: "1 mois avant", jours: 30 },
  { cle: "1s", libelle: "La semaine du mariage", jours: 7 },
  { cle: "j", libelle: "Le jour J", jours: 0 },
];

const T: [Echeance, string][] = [
  ["12m", "Fixer la date et le budget global"],
  ["12m", "Établir une première liste d'invités"],
  ["12m", "Réserver la salle ou le lieu de réception"],
  ["12m", "Choisir le traiteur et organiser une dégustation"],
  ["6m", "Réserver la neggafa et choisir les tenues"],
  ["6m", "Réserver l'orchestre ou le DJ"],
  ["6m", "Réserver photographe et vidéaste"],
  ["6m", "Choisir la décoration et la thématique"],
  ["3m", "Envoyer les invitations"],
  ["3m", "Prévoir l'hébergement et le transport des invités venant de loin"],
  ["3m", "Réserver coiffure et maquillage (avec essai)"],
  ["3m", "Commander le gâteau et les douceurs"],
  ["1m", "Relancer les invités qui n'ont pas répondu"],
  ["1m", "Faire le plan de table"],
  ["1m", "Valider le programme de la soirée avec l'agence"],
  ["1m", "Dernier essayage des tenues"],
  ["1s", "Confirmer les horaires avec tous les prestataires"],
  ["1s", "Préparer les enveloppes pour les prestataires"],
  ["1s", "Hammam et soins"],
  ["j", "Petit-déjeuner et préparation"],
  ["j", "Profiter de la soirée !"],
];
export const checklistDefaut = (): Tache[] => T.map(([echeance, titre]) => ({ id: uid(), titre, echeance, fait: false }));

const B = ["Salle / lieu de réception", "Traiteur", "Neggafa et tenues", "Orchestre / DJ", "Photo et vidéo", "Décoration et fleurs",
  "Hôtesses et service (Heavent)", "Gâteau et douceurs", "Coiffure et maquillage", "Invitations", "Transport", "Imprévus"];
export const budgetDefaut = (): PosteBudget[] => B.map((poste) => ({ id: uid(), poste, prevu: null, reel: null, paye: null }));

const P: [string, string][] = [
  ["19:30", "Arrivée des invités, accueil par les hôtesses"],
  ["20:30", "Entrée des mariés (amariya)"],
  ["21:00", "Cocktail et animations"],
  ["22:00", "Premier changement de tenue"],
  ["23:00", "Dîner"],
  ["00:30", "Deuxième changement de tenue"],
  ["01:30", "Gâteau"],
  ["02:30", "Fin de soirée"],
];
export const programmeDefaut = (): Moment[] => P.map(([heure, titre]) => ({ id: uid(), heure, titre, details: "" }));

export const COTES = { mariee: "Côté mariée", marie: "Côté marié", commun: "Commun" } as const;

/** Date d'échéance concrète (« avant le … ») à partir de la date du mariage */
export const dateEcheance = (dateMariage: string | null, e: Echeance) => {
  if (!dateMariage) return null;
  const j = ECHEANCES.find((x) => x.cle === e)!.jours;
  const d = new Date(dateMariage + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() - j);
  return d;
};

export const lienRsvp = (jeton: string) => `${typeof window !== "undefined" ? window.location.origin : "https://heaventagency.com"}/rsvp/${jeton}`;

export const messageWhatsappInvite = (inv: Invite, noms: string, date: string | null) =>
  `Bonjour ${inv.nom},\n\n${noms} ont la joie de vous convier à leur mariage${date ? ` le ${new Date(date + "T00:00:00Z").toLocaleDateString("fr-FR", { timeZone: "UTC", weekday: "long", day: "numeric", month: "long", year: "numeric" })}` : ""}.\n\nMerci de nous confirmer votre présence ici : ${lienRsvp(inv.jeton)}`;
