// Mail d'accompagnement d'un devis : texte prêt à copier-coller, modifiable, adapté au type d'événement.
import { DevisForm, Prestation, calculerTotaux, dateFr, lienClientDevis, money, sousTotalGroupe, today } from "@/components/admin/devis/devisUtils";

export type ModeleMail = "mariage" | "entreprise" | "nawar" | "evenement";

export interface OptionsMail {
  modele: ModeleMail;
  /** Demander « hôtesses seulement ou hôtes et hôtesses ? » */
  questionEquipe: boolean;
  /** Délai de confirmation (en mois) avant chaque événement, 0 = aucun */
  delaiMois: number;
  /** Rappeler la grille des frais (transport, kilomètres, repas, nuit, heure supplémentaire) */
  frais: boolean;
  /** Ajouter le lien du devis en ligne */
  lien: boolean;
}

export const modeleDuDevis = (d: Pick<DevisForm, "type" | "marque">): ModeleMail =>
  d.marque === "nawar" ? "nawar" : d.type === "mariage" ? "mariage" : d.type === "entreprise" ? "entreprise" : "evenement";

export const LIBELLES_MODELE: Record<ModeleMail, string> = {
  mariage: "Mariage", entreprise: "Entreprise", nawar: "Nawar", evenement: "Autre événement",
};

const aDesHotes = (d: DevisForm) => d.lignes.some((l) => /h[ôo]te/i.test(l.designation));
const aDesFrais = (d: DevisForm) => aDesHotes(d) || d.lignes.some((l) => /transport|d[ée]placement|h[ée]bergement/i.test(l.designation));

/** Réglages proposés au départ selon le contenu du devis. */
export function optionsParDefaut(d: DevisForm): OptionsMail {
  const hotes = aDesHotes(d);
  return {
    modele: modeleDuDevis(d),
    questionEquipe: hotes,
    delaiMois: 1,
    frais: true,
    lien: !!d.lien_token,
  };
}

const prix = (cat: Prestation[], motif: RegExp, defaut: number) => {
  const p = cat.find((c) => c.actif && motif.test(c.designation));
  return p ? Number(p.prix_unitaire) : defaut;
};
const MOTIFS_TARIFS: [string, RegExp][] = [
  ["transport du staff (même ville)", /transport.*m[êe]me ville/i], ["déplacement au km", /au km/i], ["repas", /repas/i], ["heure supplémentaire", /heure suppl/i],
];
/** Tarifs du mail introuvables dans le catalogue (un tarif de secours est alors utilisé). */
export const tarifsManquants = (cat: Prestation[]) => MOTIFS_TARIFS.filter(([, m]) => !cat.some((c) => c.actif && m.test(c.designation))).map(([l]) => l);
const n = (v: number) => new Intl.NumberFormat("fr-FR").format(v);

export function objetMail(d: DevisForm): string {
  const nb = new Set(d.lignes.map((l) => (l.groupe ?? "").trim()).filter(Boolean)).size;
  const sujet = d.titre?.trim() || (d.type === "mariage" ? "votre mariage" : "votre événement");
  return `Devis ${d.numero ?? ""} – ${sujet}${nb > 1 ? ` (${nb} événements)` : ""}`.replace("  ", " ").trim();
}

export function texteMail(d: DevisForm, catalogue: Prestation[], tauxTvaDefaut: number, devise: string, o: OptionsMail): string {
  const t = calculerTotaux(d.lignes, d.remise_globale_pct, d.taux_tva ?? tauxTvaDefaut, d.acompte_pct);
  const prenom = (d.client_nom || "").trim().split(/\s+/)[0];
  const groupes: { nom: string; total: number }[] = [];
  d.lignes.forEach((l, i) => {
    const g = (l.groupe ?? "").trim();
    if (g && !groupes.some((x) => x.nom === g)) groupes.push({ nom: g, total: sousTotalGroupe(d.lignes, i) });
  });
  const multi = groupes.length > 1;
  const numero = d.numero ? ` ${d.numero}` : "";
  const sujet = d.titre?.trim();
  const dateTxt = d.date_evenement ? ` du ${dateFr(d.date_evenement)}` : "";
  const invites = Number(d.nb_personnes) > 0 ? `${d.nb_personnes} ` : "";

  const p: string[] = [];
  p.push(prenom ? `Bonjour ${prenom},` : "Bonjour,");

  // Introduction selon le type
  if (o.modele === "mariage") {
    p.push(`Merci de nous faire confiance pour votre mariage${dateTxt}. Vous trouverez ci-joint notre devis${numero}${invites ? `, pour ${invites}invités` : ""}.`);
  } else if (o.modele === "nawar") {
    p.push(`Merci pour votre intérêt pour Nawar. Vous trouverez ci-joint notre devis${numero}${sujet ? ` pour « ${sujet} »` : ""}. Les parfums sont choisis par vous, ou avec nos hôtes, pour ${invites ? `vos ${invites}invités` : "vos invités"} : une sélection pensée pour votre événement${dateTxt}.`);
  } else if (o.modele === "entreprise") {
    p.push(`Merci pour votre confiance. Vous trouverez ci-joint notre devis${numero}${sujet ? ` pour « ${sujet} »` : ""}${invites ? `, pour ${invites}participants` : ""}${multi ? `, sur ${groupes.length} événements` : ""}.`);
  } else {
    p.push(`Merci pour votre demande. Vous trouverez ci-joint notre devis${numero}${sujet ? ` pour « ${sujet} »` : ""}${multi ? `, sur ${groupes.length} événements` : ""}.`);
  }

  // Montants
  let montant = `Montant : ${money(t.base, devise)} HT, soit ${money(t.ttc, devise)} TTC.`;
  if (multi) {
    montant += `\n${groupes.map((g) => `• ${g.nom.replace(/\s+—.*$/, "")} : ${money(g.total, devise)} HT`).join("\n")}`;
    montant += `\nChaque événement a son sous-total : vous pouvez en retirer ou en ajouter facilement.`;
  }
  p.push(montant);

  if (o.questionEquipe) {
    p.push("Une question pour composer l'équipe : souhaitez-vous uniquement des hôtesses, ou un mélange d'hôtes et d'hôtesses ? Le tarif reste le même dans les deux cas.");
  }
  if (o.delaiMois > 0) {
    const qui = aDesHotes(d) ? "nos hôtes" : "notre équipe et nos partenaires";
    const duree = o.delaiMois === 1 ? "un mois" : `${o.delaiMois} mois`;
    let quand = `au plus tard ${duree} avant ${multi ? "chaque événement" : "l'événement"}`;
    if (!multi && d.date_evenement) {
      const lim = new Date(`${d.date_evenement}T12:00:00Z`);
      lim.setUTCMonth(lim.getUTCMonth() - o.delaiMois);
      const limIso = lim.toISOString().slice(0, 10);
      quand = limIso < today() ? "dès que possible" : `au plus tard le ${dateFr(limIso)}`;
    }
    p.push(`Délai de confirmation : pour garantir la disponibilité de ${qui}, nous avons besoin de votre confirmation ${quand}.`);
  }
  if (o.frais) {
    const transport = prix(catalogue, /transport.*m[êe]me ville/i, 50);
    const km = prix(catalogue, /au km/i, 3);
    const repas = prix(catalogue, /repas/i, 50);
    const hs = prix(catalogue, /heure suppl/i, 100);
    const hotes = aDesHotes(d);
    const pers = hotes ? "par hôte" : "par personne de l'équipe";
    const dejaTransport = d.lignes.some((l) => /transport/i.test(l.designation));
    const dejaKm = d.lignes.some((l) => /d[ée]placement|au km/i.test(l.designation));
    const dejaRepas = d.lignes.some((l) => /repas/i.test(l.designation));
    const dejaNuit = d.lignes.some((l) => /h[ée]bergement/i.test(l.designation));
    const lignes = [dejaTransport || dejaKm || dejaRepas || dejaNuit
      ? "Déplacements, repas et hébergement : ce qui est déjà chiffré est dans le total. Le reste n'est pas inclus et dépend du lieu :"
      : "Ce qui n'est pas inclus dans le total, selon le lieu :"];
    if (!dejaTransport) lignes.push(`• Même ville que notre équipe : transport de ${n(transport)} ${devise} HT ${pers} et par jour.`);
    if (!dejaKm) lignes.push(`• Autre ville : ${n(km)} ${devise} HT par kilomètre, aller-retour et par véhicule. Notre équipe rentre chez elle chaque jour.`);
    if (!dejaRepas) lignes.push(`• Repas : ${n(repas)} ${devise} HT ${pers} et par jour. Si vous fournissez les repas à l'équipe, rien n'est facturé.`);
    if (!dejaNuit) lignes.push("• Hébergement : uniquement si deux de vos événements ont lieu sur des jours consécutifs dans une ville éloignée. La nuit est alors facturée sur justificatif, et nous vous la confirmons avant toute réservation.");
    if (hotes || d.lignes.some((l) => /heure suppl/i.test(l.designation)))
      lignes.push(`• Heure supplémentaire au-delà de 8 h : ${n(hs)} ${devise} HT ${hotes ? "par hôte" : "par personne"} et par heure.`);
    if (lignes.length > 1) p.push(lignes.join("\n"));
  }

  const fin: string[] = [];
  if (d.acompte_pct > 0) fin.push(`Un acompte de ${d.acompte_pct} % (${money(t.acompte, devise)}) confirme la réservation.`);
  if (d.date_validite) fin.push(`Le devis est valable jusqu'au ${dateFr(d.date_validite)}.`);
  if (fin.length) p.push(fin.join(" "));

  if (o.lien) {
    const lien = lienClientDevis(d.lien_token);
    if (lien) p.push(`Vous pouvez aussi le consulter et le signer en ligne : ${lien}`);
  }

  p.push(multi || !d.lieu?.trim() ? "Dès que vous me communiquez les villes, les dates et le détail de votre besoin, je vous envoie le chiffrage exact." : "Je reste à votre disposition pour toute question ou ajustement.");
  p.push("Cordialement,\n\nHeavent People Agency\ninfo@heaventagency.com");
  return p.join("\n\n");
}
