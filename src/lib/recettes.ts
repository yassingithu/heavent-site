import { cellule, nb } from "@/lib/depenses";
import { libelleStatut } from "@/lib/statuts";

/**
 * Exports « recettes » pour le comptable : les factures émises dans le mois et les paiements encaissés dans le mois.
 * Même format que l'export des dépenses : CSV pour Excel, séparateur « ; », virgule décimale (l'appelant ajoute le BOM UTF-8).
 * Une facture annulée reste dans la liste (elle garde son numéro) mais n'entre dans aucun total.
 */
export interface FactureCompta {
  numero: string; type: string; date_emission: string; client_nom: string | null; client_societe: string | null; client_ice: string | null;
  devis_numero: string | null; total_ht: number; total_tva: number; total_ttc: number; deduction_ttc: number | null; net_a_payer: number;
  statut: string; payee_le: string | null; mode_paiement: string | null; devise: string | null;
}
const TYPES: Record<string, string> = { acompte: "Acompte", solde: "Solde", totale: "Facture" };
const jour = (d: string | null) => (d ? d.slice(0, 10).split("-").reverse().join("/") : "");
const somme = (l: FactureCompta[], c: (f: FactureCompta) => number) => l.filter((f) => f.statut !== "annulee").reduce((t, f) => t + (Number(c(f)) || 0), 0);
const assembler = (l: (string | number)[][]) => l.map((r) => r.map(cellule).join(";")).join("\r\n") + "\r\n";

export function csvFactures(l: FactureCompta[]): string {
  const tete = ["N° facture", "Date d'émission", "Type", "Client", "Société", "ICE", "Devis", "Total HT", "TVA", "Total TTC", "Déduit (acomptes)", "Net à payer", "Statut", "Payée le", "Mode de paiement", "Devise"];
  const lignes = [...l].sort((a, b) => a.date_emission.localeCompare(b.date_emission) || a.numero.localeCompare(b.numero)).map((f) => [
    f.numero, jour(f.date_emission), TYPES[f.type] ?? f.type, f.client_nom ?? "", f.client_societe ?? "", f.client_ice ?? "", f.devis_numero ?? "",
    nb(f.total_ht), nb(f.total_tva), nb(f.total_ttc), nb(f.deduction_ttc ?? 0), nb(f.net_a_payer), libelleStatut("facture", f.statut), jour(f.payee_le), f.mode_paiement ?? "", f.devise ?? "MAD",
  ]);
  const total = ["", "", "", "", "", "", "TOTAL (hors annulées)", nb(somme(l, (f) => f.total_ht)), nb(somme(l, (f) => f.total_tva)), nb(somme(l, (f) => f.total_ttc)), nb(somme(l, (f) => f.deduction_ttc ?? 0)), nb(somme(l, (f) => f.net_a_payer)), "", "", "", ""];
  return assembler([tete, ...lignes, total]);
}

export function csvPaiements(l: FactureCompta[]): string {
  const payees = l.filter((f) => f.statut === "payee" && f.payee_le);
  const tete = ["Date du paiement", "N° facture", "Client", "Société", "Mode de paiement", "Montant encaissé", "Devise"];
  const lignes = [...payees].sort((a, b) => String(a.payee_le).localeCompare(String(b.payee_le))).map((f) => [
    jour(f.payee_le), f.numero, f.client_nom ?? "", f.client_societe ?? "", f.mode_paiement ?? "", nb(f.net_a_payer), f.devise ?? "MAD",
  ]);
  const total = ["", "", "", "", "TOTAL encaissé", nb(payees.reduce((t, f) => t + (Number(f.net_a_payer) || 0), 0)), ""];
  return assembler([tete, ...lignes, total]);
}

/** Factures concernées par un mois « AAAA-MM » : émises dans le mois ou payées dans le mois (sans doublon). */
export function dansLeMois(l: FactureCompta[], mois: string) {
  return l.filter((f) => f.date_emission?.slice(0, 7) === mois || f.payee_le?.slice(0, 7) === mois);
}
