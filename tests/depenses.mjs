// Tests unitaires de la logique des dépenses : node --experimental-strip-types tests/depenses.mjs
import assert from "node:assert/strict";
import { totauxEtrangers, nombreDepuisTexte, totalDepenses, totauxParCategorie, moisPrecedentSuivant, csvDepenses, nomFichierJustificatif } from "../src/lib/depenses.ts";
assert.equal(nombreDepuisTexte("1 200,50"), 1200.5);
assert.equal(nombreDepuisTexte("85 MAD"), 85);
assert.equal(nombreDepuisTexte("12.5dh"), 12.5);
assert.equal(nombreDepuisTexte("abc"), null);
assert.equal(nombreDepuisTexte(""), null);
assert.equal(totalDepenses([{ montant_ttc: 0.1 }, { montant_ttc: 0.2 }]), 0.3);
assert.deepEqual(totauxParCategorie([{ categorie: "Repas", montant_ttc: 10 }, { categorie: "Transport", montant_ttc: 50 }, { categorie: "Repas", montant_ttc: 5.5 }]), [["Transport", 50], ["Repas", 15.5]]);
assert.deepEqual(moisPrecedentSuivant("2026-01"), { precedent: "2025-12", suivant: "2026-02" });
assert.deepEqual(moisPrecedentSuivant("2026-12"), { precedent: "2026-11", suivant: "2027-01" });
const d = [{ id: "1", date_depense: "2026-10-25", fournisseur: "Café \"Le Rif\"; Rabat", montant_ttc: 85, tva: 7.73, categorie: "Repas", moyen_paiement: "especes", devis_id: null, note: "=1+1", justificatifs: ["2026-10/a.jpg"] }];
const csv = csvDepenses(d);
assert.ok(csv.startsWith("Date;Fournisseur;ICE fournisseur;IF fournisseur;Catégorie;Montant TTC;Devise;TVA"));
assert.ok(csv.includes('"Café ""Le Rif""; Rabat"'), "guillemets et point-virgule protégés");
assert.ok(csv.includes("'=1+1"), "formule neutralisée");
assert.ok(csv.includes("25/10/2026;") && csv.includes("85,00;MAD;7,73;Espèces"), csv);
assert.ok(csv.includes(";TOTAL;85,00;MAD;"), "total");
const avecIce = csvDepenses([{ ...d[0], fournisseur_ice: "001234567000089", fournisseur_if: "12345678" }]);
assert.ok(avecIce.includes(';"=""001234567000089""";"=""12345678""";Repas;'), "ICE et IF exportés en texte pour le comptable");
assert.equal(nomFichierJustificatif(d[0], 0, "x/a.jpg"), "2026-10-25_Cafe-Le-Rif-Rabat_85.00_1.jpg");
console.log("TOUT EST BON : dépenses (11 contrôles)");

assert.equal(totalDepenses([{ montant_ttc: 100, devise: "MAD" }, { montant_ttc: 20, devise: "EUR" }, { montant_ttc: 5 }]), 105, "les euros ne comptent pas dans le total en MAD");
assert.deepEqual(totauxEtrangers([{ montant_ttc: 20, devise: "EUR" }, { montant_ttc: 5.5, devise: "EUR" }, { montant_ttc: 9, devise: "MAD" }]), [["EUR", 25.5]]);
assert.deepEqual(totauxParCategorie([{ categorie: "Repas", montant_ttc: 10, devise: "MAD" }, { categorie: "Repas", montant_ttc: 99, devise: "EUR" }]), [["Repas", 10]]);
console.log("TOUT EST BON : devises");
