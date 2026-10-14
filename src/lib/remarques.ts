/** Remarques laissées par le crew sur un contrat (heures en plus, frais, autre), traitées par l'admin. */
export type TypeRemarque = "heures_sup" | "frais" | "autre";
export type StatutRemarque = "nouvelle" | "vue" | "acceptee" | "refusee";

export const TYPES_REMARQUE: Record<TypeRemarque, { texte: string; icone: string }> = {
  heures_sup: { texte: "Heures en plus", icone: "⏱️" },
  frais: { texte: "Frais / charge", icone: "🧾" },
  autre: { texte: "Autre remarque", icone: "💬" },
};

export const STATUTS_REMARQUE: Record<StatutRemarque, { texte: string; classe: string }> = {
  nouvelle: { texte: "Envoyée — en attente", classe: "bg-sky-100 text-sky-800" },
  vue: { texte: "Vue par l'agence", classe: "bg-muted text-muted-foreground" },
  acceptee: { texte: "Acceptée ✓", classe: "bg-emerald-100 text-emerald-800" },
  refusee: { texte: "Refusée", classe: "bg-red-100 text-red-700" },
};

export const detailRemarque = (r: { type: string; heures?: number | null; montant?: number | null; date_jour?: string | null }) =>
  [
    r.date_jour ? new Date(r.date_jour + "T12:00:00").toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" }) : null,
    r.type === "heures_sup" && r.heures ? `+${r.heures} h` : null,
    r.type === "frais" && r.montant ? `${r.montant} MAD` : null,
  ].filter(Boolean).join(" · ");
