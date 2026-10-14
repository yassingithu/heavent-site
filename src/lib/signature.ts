/**
 * Règles de signature des contrats par le crew :
 * - à signer idéalement au plus tard 24 h avant le début de la mission ;
 * - reste signable jusqu'à la fin du mois de la mission (dernier jour, 23:59, heure du Maroc) ;
 * - tant qu'il n'est pas signé, le crew reçoit un e-mail de rappel tous les 2 jours.
 */
export type EtatSignature = "signe" | "a_signer" | "en_retard" | "ferme" | "annule";

interface ContratSignable {
  dates?: unknown; date_debut: string; date_fin?: string | null; statut?: string | null; signe_le?: string | null;
}

const lesDates = (c: ContratSignable) =>
  ((Array.isArray(c.dates) ? c.dates : []) as { date: string; heure_debut?: string | null }[]).slice().sort((a, b) => a.date.localeCompare(b.date));

/** Début de la mission (heure du Maroc, UTC+1). */
export function debutMission(c: ContratSignable): Date {
  const premiere = lesDates(c)[0];
  const jour = premiere?.date ?? c.date_debut;
  const heure = (premiere?.heure_debut ?? "00:00").slice(0, 5);
  return new Date(`${jour}T${heure}:00+01:00`);
}

/** Délai conseillé : 24 h avant la mission. */
export const limiteSignature = (c: ContratSignable) => new Date(debutMission(c).getTime() - 24 * 3600 * 1000);

/** Dernier moment pour signer : fin du mois de la (dernière) date de mission. */
export function finSignature(c: ContratSignable): Date {
  const ds = lesDates(c);
  const jour = ds[ds.length - 1]?.date ?? c.date_fin ?? c.date_debut;
  const [a, m] = jour.split("-").map(Number);
  const suivant = m === 12 ? `${a + 1}-01` : `${a}-${String(m + 1).padStart(2, "0")}`;
  return new Date(new Date(`${suivant}-01T00:00:00+01:00`).getTime() - 60 * 1000); // dernier jour 23:59
}

export function etatSignature(c: ContratSignable, maintenant = new Date()): EtatSignature {
  if (c.statut === "annule") return "annule";
  if (c.signe_le) return "signe";
  if (maintenant > finSignature(c)) return "ferme";
  return maintenant > limiteSignature(c) ? "en_retard" : "a_signer";
}

export const peutSigner = (c: ContratSignable) => ["a_signer", "en_retard"].includes(etatSignature(c));

export const dateHeureFr = (d: Date | string) =>
  new Date(d).toLocaleString("fr-FR", { timeZone: "Africa/Casablanca", weekday: "short", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });

/** Petit badge texte + couleurs pour les listes. */
export const BADGE_SIGNATURE: Record<EtatSignature, { texte: string; classe: string }> = {
  signe: { texte: "Signé ✓", classe: "bg-emerald-100 text-emerald-800" },
  a_signer: { texte: "À signer", classe: "bg-amber-100 text-amber-800" },
  en_retard: { texte: "À signer — en retard", classe: "bg-orange-100 text-orange-800" },
  ferme: { texte: "Non signé — délai dépassé", classe: "bg-red-100 text-red-700" },
  annule: { texte: "Annulé", classe: "bg-muted text-muted-foreground" },
};
