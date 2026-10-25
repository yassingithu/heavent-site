/** Logique pure des dépenses (testée à part) : totaux, mois, export pour le comptable. */
export interface Depense {
  id: string; date_depense: string; fournisseur: string | null; montant_ttc: number; tva: number | null; categorie: string;
  moyen_paiement: string | null; devis_id: string | null; note: string | null; justificatifs: string[]; cree_par?: string;
}

/** « 1 200,50 », « 12.5 », « 85 MAD » → nombre ; null si illisible. Jamais d'exception. */
export function nombreDepuisTexte(t: string | number | null | undefined): number | null {
  if (typeof t === "number") return Number.isFinite(t) ? Math.round(t * 100) / 100 : null;
  const s = String(t ?? "").replace(/mad|dh|dhs/gi, "").replace(/[\s  ]/g, "").replace(",", ".");
  if (!/^-?\d+(\.\d+)?$/.test(s)) return null;
  return Math.round(Number(s) * 100) / 100;
}

/** Somme exacte au centime (évite 0,1 + 0,2). */
export const totalDepenses = (l: Pick<Depense, "montant_ttc">[]) => Math.round(l.reduce((t, x) => t + Math.round(Number(x.montant_ttc || 0) * 100), 0)) / 100;

/** Totaux par catégorie, du plus gros au plus petit. */
export function totauxParCategorie(l: Pick<Depense, "montant_ttc" | "categorie">[]): [string, number][] {
  const m = new Map<string, number>();
  for (const x of l) m.set(x.categorie, (m.get(x.categorie) ?? 0) + Math.round(Number(x.montant_ttc || 0) * 100));
  return [...m.entries()].map(([c, v]) => [c, v / 100] as [string, number]).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "fr"));
}

export function moisPrecedentSuivant(mois: string) {
  const a = Number(mois.slice(0, 4)), m = Number(mois.slice(5, 7));
  const f = (y: number, k: number) => { const d = new Date(Date.UTC(y, k, 1)); return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`; };
  return { precedent: f(a, m - 2), suivant: f(a, m) };
}

const MOYENS: Record<string, string> = { especes: "Espèces", carte: "Carte", virement: "Virement", cheque: "Chèque", autre: "Autre" };
/** Une cellule CSV : guillemets doublés, et neutralisation des formules (=, +, -, @) que tableurs exécuteraient. */
const cellule = (v: unknown) => {
  let s = String(v ?? "");
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return /[;"\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const nb = (n: number | null | undefined) => (n == null ? "" : n.toFixed(2).replace(".", ","));

/** CSV pour Excel (séparateur « ; », virgule décimale). L'appelant ajoute le BOM UTF-8. */
export function csvDepenses(l: Depense[], nomEvenement: (id: string | null) => string = () => ""): string {
  const tete = ["Date", "Fournisseur", "Catégorie", "Montant TTC (MAD)", "TVA (MAD)", "Payé par", "Événement", "Note", "Justificatifs"];
  const lignes = [...l].sort((a, b) => a.date_depense.localeCompare(b.date_depense)).map((x) => [
    x.date_depense.split("-").reverse().join("/"), x.fournisseur ?? "", x.categorie, nb(x.montant_ttc), nb(x.tva), x.moyen_paiement ? MOYENS[x.moyen_paiement] ?? x.moyen_paiement : "",
    nomEvenement(x.devis_id), x.note ?? "", (x.justificatifs ?? []).map((c, i) => nomFichierJustificatif(x, i, c)).join(" | "),
  ]);
  const total = ["", "", "TOTAL", nb(totalDepenses(l)), "", "", "", "", ""];
  return [tete, ...lignes, total].map((r) => r.map(cellule).join(";")).join("\r\n") + "\r\n";
}

/** Nom lisible du justificatif dans le ZIP : 2026-10-25_Fournisseur_85.00_1.jpg */
export function nomFichierJustificatif(x: Pick<Depense, "date_depense" | "fournisseur" | "montant_ttc" | "categorie">, i: number, chemin: string) {
  const ext = chemin.toLowerCase().endsWith(".pdf") ? "pdf" : "jpg";
  const base = (x.fournisseur || x.categorie).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 30) || "depense";
  return `${x.date_depense}_${base}_${Number(x.montant_ttc).toFixed(2)}_${i + 1}.${ext}`;
}
