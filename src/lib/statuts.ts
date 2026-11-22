/**
 * Statuts de l'admin : un seul endroit pour les libellés, les couleurs et l'ordre.
 * Pour ajouter ou renommer un statut, on change uniquement ce fichier.
 * Les fonctions libelleStatut / classeStatut / clesStatut ne plantent jamais, même pour un statut inconnu
 * (on affiche alors la clé brute) : un statut oublié ne doit pas pouvoir vider une page.
 */
export interface StatutDef { label: string; className: string }

export const STATUTS_DEVIS: Record<string, StatutDef> = {
  brouillon: { label: "Brouillon", className: "border-transparent bg-transparent text-[#5A5146]" },
  envoye: { label: "Envoyé", className: "border-transparent bg-transparent text-[#7A5F1F]" },
  accepte: { label: "Accepté", className: "border-transparent bg-transparent text-[#1F5A4C]" },
  refuse: { label: "Refusé", className: "border-transparent bg-transparent text-[#9C4A2C]" },
  annule: { label: "Annulé", className: "border-transparent bg-transparent text-[#5A5146]" },
};

/** Demandes « réponse rapide » (devis_mariage / devis_entreprise) : contrainte de la base = ces quatre valeurs. */
export const STATUTS_REPONSE_RAPIDE: Record<string, StatutDef> = {
  en_attente: { label: "En attente", className: "border-transparent bg-transparent text-[#5A5146]" },
  envoye: { label: "Envoyé", className: "border-transparent bg-transparent text-[#7A5F1F]" },
  accepte: { label: "Accepté", className: "border-transparent bg-transparent text-[#1F5A4C]" },
  refuse: { label: "Refusé / annulé", className: "border-transparent bg-transparent text-[#9C4A2C]" },
};

export const STATUTS_FACTURE: Record<"a_payer" | "payee" | "annulee", StatutDef> = {
  a_payer: { label: "À payer", className: "bg-[#A8933F]/15 text-[#7A5F1F]" },
  payee: { label: "Payée", className: "bg-[#1F5A4C]/10 text-[#1F5A4C]" },
  annulee: { label: "Annulée", className: "bg-[#DCCDAA]/40 text-[#5A5146] line-through" },
};

export const REGISTRE_STATUTS = {
  devis: STATUTS_DEVIS,
  reponse_rapide: STATUTS_REPONSE_RAPIDE,
  facture: STATUTS_FACTURE as Record<string, StatutDef>,
} as const;

export type DomaineStatut = keyof typeof REGISTRE_STATUTS;

/** Libellé lisible ; la clé brute si le statut est inconnu. */
export const libelleStatut = (domaine: DomaineStatut, cle?: string | null): string =>
  (cle && REGISTRE_STATUTS[domaine][cle]?.label) || cle || "—";

/** Classes de couleur du badge ; chaîne vide si le statut est inconnu. */
export const classeStatut = (domaine: DomaineStatut, cle?: string | null): string =>
  (cle && REGISTRE_STATUTS[domaine][cle]?.className) || "";

/** Les statuts d'un domaine, dans l'ordre d'affichage. */
export const clesStatut = (domaine: DomaineStatut): string[] => Object.keys(REGISTRE_STATUTS[domaine]);
