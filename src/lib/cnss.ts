/**
 * Numéros CNSS (employeur et salarié).
 * Règle : les numéros sont conservés EXACTEMENT tels que saisis (texte). Ces fonctions ne les modifient jamais :
 * elles signalent seulement ce qui mérite une vérification. Le format officiel n'ayant pas été vérifié
 * sur une source CNSS, aucune longueur n'est imposée et rien n'est bloqué à la saisie.
 */

/** Forme utilisée UNIQUEMENT pour comparer deux numéros (détection de doublons) — jamais enregistrée. */
export const cleComparaison = (v: string | null | undefined) => String(v ?? "").replace(/[\s.\-/]/g, "").toUpperCase();

/** Avertissements non bloquants sur un numéro saisi (liste vide = rien à signaler). */
export function avertissementsNumero(v: string | null | undefined): string[] {
  const brut = String(v ?? "");
  if (!brut.trim()) return [];
  const a: string[] = [];
  if (brut !== brut.trim()) a.push("espaces en début ou en fin de numéro");
  if (/[^0-9\s]/.test(brut)) a.push("contient d'autres caractères que des chiffres");
  return a;
}

export interface PersonneCnss { id: string; prenom?: string | null; nom?: string | null; numero_securite_sociale?: string | null }

/** Groupes de personnes partageant le même numéro CNSS salarié (comparaison sans espaces ni ponctuation). */
export function doublonsCnss(personnes: PersonneCnss[]): PersonneCnss[][] {
  const groupes = new Map<string, PersonneCnss[]>();
  for (const p of personnes) {
    const k = cleComparaison(p.numero_securite_sociale);
    if (!k) continue;
    groupes.set(k, [...(groupes.get(k) ?? []), p]);
  }
  return [...groupes.values()].filter((g) => g.length > 1);
}

/** Éléments manquants pour qu'un bulletin puisse être finalisé (validé ou marqué payé). */
export function manquesBulletin(agence: { cnss_affiliation_employeur?: string | null } | null | undefined, salarie: { numero_securite_sociale?: string | null } | null | undefined): string[] {
  const m: string[] = [];
  if (!String(agence?.cnss_affiliation_employeur ?? "").trim()) m.push("N° d'affiliation CNSS de l'employeur");
  if (!String(salarie?.numero_securite_sociale ?? "").trim()) m.push("N° CNSS du salarié");
  return m;
}

/** Statuts qui présentent un bulletin comme définitif : interdits tant qu'il manque un élément. */
// « payee » apparaît dans d'anciens tests ; l'écran utilise « paye » : les deux sont traités comme définitifs.
export const STATUTS_FINAUX = ["valide", "paye", "payee"];

/** Présentation d'un bulletin : définitif seulement s'il est complet ET validé/payé ; sinon aperçu signalé comme tel. */
export function etatBulletin(agence: Parameters<typeof manquesBulletin>[0], salarie: Parameters<typeof manquesBulletin>[1], statut: string | null | undefined) {
  const manques = manquesBulletin(agence, salarie);
  const definitif = !manques.length && STATUTS_FINAUX.includes(String(statut));
  return {
    manques, definitif,
    titre: definitif ? "BULLETIN DE PAIE" : "APERÇU DE BULLETIN",
    bandeau: manques.length ? "APERÇU INCOMPLET — NE VAUT PAS BULLETIN DE PAIE" : definitif ? null : "APERÇU — BULLETIN NON VALIDÉ",
  };
}
