// Règles communes du pointage des crews (heure du Maroc = GMT).

/** Début et fin prévus d'une journée de mission (une fin avant le début = le lendemain). */
export function horairesMission(a: { date_jour: string; heure_debut?: string | null; heure_fin?: string | null; heures?: number | null }) {
  const hd = (a.heure_debut ?? "").slice(0, 5);
  const hf = (a.heure_fin ?? "").slice(0, 5);
  const debut = new Date(`${a.date_jour}T${hd || "00:00"}:00Z`);
  let fin = hf ? new Date(`${a.date_jour}T${hf}:00Z`) : new Date(debut.getTime() + Number(a.heures ?? 8) * 3600_000);
  if (fin <= debut) fin = new Date(fin.getTime() + 86400_000);
  return { debut, fin, horaireConnu: !!hd };
}

/** Distance en mètres entre deux points GPS. */
export function distanceM(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371000, rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad, dLng = (lng2 - lng1) * rad;
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLng / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(x)));
}

/** Heures pointées : du plus tard entre l'arrivée et le début prévu, jusqu'au départ ; au quart d'heure le plus proche. */
export function heuresPointees(arrivee: Date, depart: Date, debutPrevu: Date) {
  const depuis = Math.max(arrivee.getTime(), debutPrevu.getTime());
  const h = Math.max(0, (depart.getTime() - depuis) / 3600_000);
  return Math.round(h * 4) / 4;
}

/**
 * Heure retenue pour un pointage. En ligne : l'heure du serveur. Hors ligne (envoi différé) : l'heure relevée par le téléphone,
 * à condition qu'elle soit plausible ; l'agence vérifie toujours ces pointages, car l'horloge d'un téléphone se modifie.
 * - jamais dans le futur (5 min de tolérance) ; une heure future est ramenée à l'heure de réception ;
 * - reçu plus de 24 h après : accepté mais marqué « tardif » ; au-delà de 7 jours : refusé (l'agence saisit les heures à la main).
 */
export const DELAI_TARDIF_MS = 24 * 3600_000;
export const DELAI_MAX_MS = 7 * 86400_000;
export function instantPointage(corps: { hors_ligne?: unknown; heure_appareil?: unknown }, maintenant: Date) {
  if (corps.hors_ligne !== true) return { instant: maintenant, horsLigne: false, tardif: false, refus: null as string | null };
  const t = Date.parse(String(corps.heure_appareil ?? ""));
  if (!Number.isFinite(t)) return { instant: maintenant, horsLigne: true, tardif: false, refus: null };
  const retard = maintenant.getTime() - t;
  if (retard > DELAI_MAX_MS) return { instant: maintenant, horsLigne: true, tardif: true, refus: "Ce pointage date de plus de 7 jours : prévenez l'agence, elle saisira vos heures." };
  const instant = t > maintenant.getTime() + 5 * 60_000 ? maintenant : new Date(Math.min(t, maintenant.getTime()));
  return { instant, horsLigne: true, tardif: retard > DELAI_TARDIF_MS, refus: null };
}
