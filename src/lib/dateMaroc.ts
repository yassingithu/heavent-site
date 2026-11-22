/**
 * Dates « du jour » pour l'agence : toujours à l'heure du Maroc (Africa/Casablanca), quel que soit le fuseau
 * de l'appareil (Mac en Belgique, iPhone en voyage…). Le stockage reste en UTC ; seul l'AFFICHAGE et le calcul
 * de « aujourd'hui » passent par ici.
 */
const FUSEAU = "Africa/Casablanca";

/** AAAA-MM-JJ du jour au Maroc. */
export const aujourdhuiMaroc = (d: Date = new Date()) => new Intl.DateTimeFormat("en-CA", { timeZone: FUSEAU }).format(d);

/** Heure (0-23) au Maroc. */
export const heureMaroc = (d: Date = new Date()) => Number(new Intl.DateTimeFormat("en-GB", { timeZone: FUSEAU, hour: "2-digit", hour12: false }).format(d)) % 24;

/** « lundi 26 octobre » au Maroc. */
export const dateLongueMaroc = (d: Date = new Date()) => new Intl.DateTimeFormat("fr-FR", { timeZone: FUSEAU, weekday: "long", day: "numeric", month: "long" }).format(d);

/** AAAA-MM-JJ du jour au Maroc, décalé de n jours. */
export const jourMarocPlus = (n: number) => aujourdhuiMaroc(new Date(Date.now() + n * 864e5));

/** Instant réel d'une date + heure saisies à l'heure du Maroc (+01 la plupart de l'année, +00 pendant le Ramadan). */
export const instantMaroc = (date: string, hhmm = "00:00"): Date => {
  const base = new Date(`${date}T${hhmm.slice(0, 5)}:00Z`);
  const p = new Intl.DateTimeFormat("en-GB", { timeZone: FUSEAU, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).formatToParts(base);
  const g = (t: string) => Number(p.find((x) => x.type === t)!.value);
  const local = Date.UTC(g("year"), g("month") - 1, g("day"), g("hour"), g("minute"), g("second"));
  return new Date(base.getTime() - (local - base.getTime()));
};

/** « 14:30 » au Maroc. */
export const heureMarocTexte = (d: Date | string) => new Intl.DateTimeFormat("fr-FR", { timeZone: FUSEAU, hour: "2-digit", minute: "2-digit" }).format(new Date(d));
