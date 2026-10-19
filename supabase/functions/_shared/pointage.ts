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
