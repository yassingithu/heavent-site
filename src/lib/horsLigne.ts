import { useEffect, useState } from "react";

/**
 * Mode hors ligne de l'espace staff (jour J).
 *
 * Gardé sur le téléphone, uniquement pour les missions d'hier à après-demain : événement, horaires, poste, lieu,
 * rendez-vous, tenue, contact sur place, consignes. JAMAIS : CIN, contrats, fiches de paie, montants, heures validées,
 * coordonnées d'autres membres. Tout est effacé : à la demande, à la déconnexion, et 48 h après la fin de la dernière mission.
 * Les pointages faits sans réseau attendent dans une file locale ; chacun porte une clé unique pour qu'un renvoi ne crée aucun doublon.
 */
const CLE_CACHE = "heavent-staff-hl-missions";
const CLE_FILE = "heavent-staff-hl-file";
const GARDE_APRES_FIN_MS = 48 * 3600e3;
const EVT = "heavent-staff-hl";

export interface FicheCache { tenue: string | null; point_rdv: string | null; heure_rdv: string | null; latitude: number | null; longitude: number | null; contact_nom: string | null; contact_telephone: string | null; consignes: string | null }
export interface MissionCache {
  id: string; date_jour: string; heure_debut: string | null; heure_fin: string | null; heures: number; poste: string;
  presence_confirmee_le: string | null; empechement_le: string | null; arrivee_le: string | null; depart_le: string | null;
  evenement: string; lieu: string | null; fiche: FicheCache | null;
}
export interface Cache { synchro: string; missions: MissionCache[] }
export interface PointageEnAttente {
  cle: string; id: string; sens: "arrivee" | "depart"; heure: string;
  position: { lat: number; lng: number; precision: number } | null; photo?: string | null;
  refus?: string | null; // message du serveur si le pointage a été refusé (il reste visible : le crew prévient l'agence)
}

const lire = <T,>(cle: string): T | null => { try { const v = localStorage.getItem(cle); return v ? (JSON.parse(v) as T) : null; } catch { return null; } };
const ecrire = (cle: string, v: unknown): boolean => { try { localStorage.setItem(cle, JSON.stringify(v)); return true; } catch { return false; } };
const prevenir = () => { try { window.dispatchEvent(new Event(EVT)); } catch { /* */ } };

const hhmm = (t?: string | null) => (t ? t.slice(0, 5) : "");
/** Fin prévue d'une mission (heure du Maroc = GMT) */
export function finPrevue(m: Pick<MissionCache, "date_jour" | "heure_debut" | "heure_fin" | "heures">) {
  const debut = new Date(`${m.date_jour}T${hhmm(m.heure_debut) || "00:00"}:00Z`);
  let fin = m.heure_fin ? new Date(`${m.date_jour}T${hhmm(m.heure_fin)}:00Z`) : new Date(debut.getTime() + Number(m.heures || 8) * 3600e3);
  if (fin <= debut) fin = new Date(fin.getTime() + 864e5);
  return fin;
}

/** Ne garde que le nécessaire : on retire tout ce qui touche à la paie ou n'est pas utile sur place. */
export function pourCache(m: any): MissionCache {
  const f = m.fiche;
  return {
    id: m.id, date_jour: m.date_jour, heure_debut: m.heure_debut ?? null, heure_fin: m.heure_fin ?? null, heures: Number(m.heures ?? 0), poste: m.poste ?? "",
    presence_confirmee_le: m.presence_confirmee_le ?? null, empechement_le: m.empechement_le ?? null, arrivee_le: m.arrivee_le ?? null, depart_le: m.depart_le ?? null,
    evenement: m.evenement ?? "Événement", lieu: m.lieu ?? null,
    fiche: f ? { tenue: f.tenue ?? null, point_rdv: f.point_rdv ?? null, heure_rdv: f.heure_rdv ?? null, latitude: f.latitude ?? null, longitude: f.longitude ?? null, contact_nom: f.contact_nom ?? null, contact_telephone: f.contact_telephone ?? null, consignes: f.consignes ?? null } : null,
  };
}

/** Garde les missions utiles sur le terrain : d'hier à après-demain. */
export function enregistrerMissions(missions: any[], maintenant = new Date()): Cache | null {
  const jour = (dec: number) => new Date(maintenant.getTime() + dec * 864e5).toISOString().slice(0, 10);
  const utiles = missions.filter((m) => m.date_jour >= jour(-1) && m.date_jour <= jour(2)).map(pourCache);
  if (!utiles.length) { try { localStorage.removeItem(CLE_CACHE); } catch { /* */ } prevenir(); return null; }
  const c: Cache = { synchro: maintenant.toISOString(), missions: utiles };
  ecrire(CLE_CACHE, c);
  prevenir();
  return c;
}

/** Cache lu, purgé s'il est périmé (48 h après la fin de la dernière mission). */
export function lireCache(maintenant = new Date()): Cache | null {
  const c = lire<Cache>(CLE_CACHE);
  if (!c || !Array.isArray(c.missions) || !c.missions.length) return null;
  const derniere = Math.max(...c.missions.map((m) => finPrevue(m).getTime()));
  if (derniere + GARDE_APRES_FIN_MS < maintenant.getTime()) {
    if (!lireFile().length) effacerCache(); // on ne jette jamais un pointage qui attend d'être envoyé
    return null;
  }
  return c;
}
export function effacerCache() { try { localStorage.removeItem(CLE_CACHE); } catch { /* */ } prevenir(); }

export const lireFile = (): PointageEnAttente[] => lire<PointageEnAttente[]>(CLE_FILE) ?? [];
function ecrireFile(f: PointageEnAttente[]) {
  if (!f.length) { try { localStorage.removeItem(CLE_FILE); } catch { /* */ } prevenir(); return true; }
  const ok = ecrire(CLE_FILE, f);
  prevenir();
  return ok;
}
const nouvelleCle = () => (globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`).replace(/[^A-Za-z0-9_-]/g, "").slice(0, 40).padEnd(8, "0");

/** Met un pointage en attente. Retourne false si le téléphone n'a plus de place (le crew est prévenu : il doit prévenir l'agence). */
export function mettreEnAttente(p: Omit<PointageEnAttente, "cle" | "heure"> & { heure?: string }): { ok: boolean; cle: string } {
  const cle = nouvelleCle();
  const f = lireFile();
  // un seul pointage de chaque sens par mission
  if (f.some((x) => x.id === p.id && x.sens === p.sens)) return { ok: true, cle: f.find((x) => x.id === p.id && x.sens === p.sens)!.cle };
  f.push({ ...p, cle, heure: p.heure ?? new Date().toISOString() });
  return { ok: ecrireFile(f), cle };
}

/** Missions telles que le crew les voit hors ligne : le cache, complété par les pointages en attente. */
export function appliquerFile(missions: MissionCache[], file: PointageEnAttente[]): (MissionCache & { enAttente?: { arrivee?: boolean; depart?: boolean } })[] {
  return missions.map((m) => {
    const a = file.find((x) => x.id === m.id && x.sens === "arrivee" && !x.refus);
    const d = file.find((x) => x.id === m.id && x.sens === "depart" && !x.refus);
    if (!a && !d) return m;
    return { ...m, arrivee_le: m.arrivee_le ?? a?.heure ?? null, depart_le: m.depart_le ?? d?.heure ?? null, presence_confirmee_le: m.presence_confirmee_le ?? a?.heure ?? null, enAttente: { arrivee: !!a && !m.arrivee_le, depart: !!d && !m.depart_le } };
  });
}

export type Envoyeur = (corps: Record<string, unknown>) => Promise<any>;
/** Erreurs qui veulent dire « pas de réseau » : on garde le pointage et on réessaiera. */
export const estErreurReseau = (e: any) => !navigator.onLine || /FunctionsFetchError|Failed to fetch|NetworkError|Load failed|fetch failed|AbortError|timeout/i.test(`${e?.name ?? ""} ${e?.message ?? ""}`);

let enCours = false;
/**
 * Envoie les pointages en attente, dans l'ordre. Sans doublon : le serveur reconnaît la clé.
 * Réseau coupé : on s'arrête et on réessaiera. Refus du serveur (mission annulée, pointage fermé…) : le pointage reste affiché avec le message.
 */
export async function synchroniser(envoyer: Envoyeur): Promise<{ envoyes: number; restants: number }> {
  if (enCours) return { envoyes: 0, restants: lireFile().length };
  enCours = true;
  let envoyes = 0;
  try {
    for (const p of lireFile().filter((x) => !x.refus)) {
      try {
        await envoyer({ action: p.sens, id: p.id, position: p.position, photo: p.photo ?? undefined, cle: p.cle, hors_ligne: true, heure_appareil: p.heure });
        ecrireFile(lireFile().filter((x) => x.cle !== p.cle));
        envoyes++;
      } catch (e: any) {
        if (estErreurReseau(e)) break;
        ecrireFile(lireFile().map((x) => (x.cle === p.cle ? { ...x, refus: String(e?.message ?? "Refusé par l'agence").slice(0, 200) } : x)));
      }
    }
  } finally { enCours = false; }
  return { envoyes, restants: lireFile().filter((x) => !x.refus).length };
}

/** Efface tout ce que l'appli garde sur ce téléphone pour le mode hors ligne (missions et pointages en attente). */
export function toutEffacer() {
  try { localStorage.removeItem(CLE_CACHE); localStorage.removeItem(CLE_FILE); } catch { /* */ }
  prevenir();
}

/** État réactif : cache, file d'attente et connexion. */
export function useHorsLigne() {
  const [, maj] = useState(0);
  const [enLigne, setEnLigne] = useState(typeof navigator === "undefined" ? true : navigator.onLine);
  useEffect(() => {
    const r = () => maj((x) => x + 1);
    const on = () => { setEnLigne(true); r(); };
    const off = () => { setEnLigne(false); r(); };
    window.addEventListener(EVT, r); window.addEventListener("online", on); window.addEventListener("offline", off);
    window.addEventListener("storage", r);
    return () => { window.removeEventListener(EVT, r); window.removeEventListener("online", on); window.removeEventListener("offline", off); window.removeEventListener("storage", r); };
  }, []);
  return { enLigne, cache: lireCache(), file: lireFile() };
}
