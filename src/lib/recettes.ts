import { cellule, nb } from "@/lib/depenses";
import { libelleStatut } from "@/lib/statuts";

/**
 * Exports « recettes » pour le comptable : les factures émises dans le mois et les paiements encaissés dans le mois.
 * Même format que l'export des dépenses : CSV pour Excel, séparateur « ; », virgule décimale (l'appelant ajoute le BOM UTF-8).
 * Une facture de solde porte le total complet du devis avec les acomptes déduits à part : les montants « facturés » ci-dessous
 * sont donc ramenés à la part réellement facturée (net à payer), pour que les totaux ne comptent jamais deux fois un acompte.
 * Une facture annulée reste dans la liste (elle garde son numéro) mais n'entre dans aucun total.
 */
export interface FactureCompta {
  numero: string; type: string; date_emission: string; client_nom: string | null; client_societe: string | null; client_ice: string | null;
  devis_numero: string | null; total_ht: number; total_tva: number; total_ttc: number; deduction_ttc: number | null; net_a_payer: number;
  statut: string; payee_le: string | null; mode_paiement: string | null; devise: string | null;
}
const TYPES: Record<string, string> = { acompte: "Acompte", solde: "Solde", totale: "Facture" };
const jour = (d: string | null) => (d ? d.slice(0, 10).split("-").reverse().join("/") : "");
const arrondi = (n: number) => Math.round(n * 100) / 100;

/** Part réellement facturée : HT, TVA et TTC (net à payer, acomptes déduits). */
export function partFacturee(f: FactureCompta) {
  const ttc = Number(f.net_a_payer) || 0;
  const total = Number(f.total_ttc) || 0;
  const r = total > 0 ? ttc / total : 1;
  const ht = arrondi((Number(f.total_ht) || 0) * r);
  return { ht, tva: arrondi(ttc - ht), ttc };
}

type Brut = { brut: string };
const assembler = (l: (string | number | Brut)[][]) => l.map((r) => r.map((c) => (typeof c === "object" ? c.brut : cellule(c))).join(";")).join("\r\n") + "\r\n";
/** ICE : 15 chiffres, souvent avec des zéros devant ; écrit en texte pour qu'Excel ne les efface pas. */
const ice = (v: string | null): string | Brut => (v && /^\d{5,}$/.test(v.trim()) ? { brut: `"=""${v.trim()}"""` } : v ?? "");
const hors = (l: FactureCompta[]) => l.filter((f) => f.statut !== "annulee");

export function csvFactures(l: FactureCompta[]): string {
  const tete = ["N° facture", "Date d'émission", "Type", "Client", "Société", "ICE", "Devis", "HT facturé", "TVA", "TTC facturé", "Total TTC du devis", "Déduit (acomptes)", "Statut", "Payée le", "Mode de paiement", "Devise", "Remarque"];
  const lignes = [...l].sort((a, b) => a.date_emission.localeCompare(b.date_emission) || a.numero.localeCompare(b.numero)).map((f) => {
    const p = partFacturee(f);
    return [
      f.numero, jour(f.date_emission), TYPES[f.type] ?? f.type, f.client_nom ?? "", f.client_societe ?? "", ice(f.client_ice), f.devis_numero ?? "",
      nb(p.ht), nb(p.tva), nb(p.ttc), nb(f.total_ttc), nb(f.deduction_ttc ?? 0), libelleStatut("facture", f.statut), jour(f.payee_le), f.mode_paiement ?? "", f.devise ?? "MAD",
      f.statut === "annulee" && f.payee_le ? "Annulée après paiement" : "",
    ];
  });
  const somme = (c: "ht" | "tva" | "ttc") => hors(l).reduce((t, f) => t + partFacturee(f)[c], 0);
  const total = ["", "", "", "", "", "", "TOTAL (hors annulées)", nb(somme("ht")), nb(somme("tva")), nb(somme("ttc")), "", "", "", "", "", "", ""];
  return assembler([tete, ...lignes, total]);
}

export function csvPaiements(l: FactureCompta[]): string {
  const payees = l.filter((f) => f.statut === "payee" && f.payee_le);
  const tete = ["Date du paiement", "N° facture", "Client", "Société", "Mode de paiement", "Montant HT", "TVA", "Montant TTC encaissé", "Devise"];
  const lignes = [...payees].sort((a, b) => String(a.payee_le).localeCompare(String(b.payee_le))).map((f) => {
    const p = partFacturee(f);
    return [jour(f.payee_le), f.numero, f.client_nom ?? "", f.client_societe ?? "", f.mode_paiement ?? "", nb(p.ht), nb(p.tva), nb(p.ttc), f.devise ?? "MAD"];
  });
  const s = (c: "ht" | "tva" | "ttc") => payees.reduce((t, f) => t + partFacturee(f)[c], 0);
  const total = ["", "", "", "", "TOTAL encaissé", nb(s("ht")), nb(s("tva")), nb(s("ttc")), ""];
  return assembler([tete, ...lignes, total]);
}

/** Factures concernées par un mois « AAAA-MM » : émises dans le mois ou payées dans le mois (sans doublon). */
export function dansLeMois(l: FactureCompta[], mois: string) {
  return l.filter((f) => f.date_emission?.slice(0, 7) === mois || f.payee_le?.slice(0, 7) === mois);
}
