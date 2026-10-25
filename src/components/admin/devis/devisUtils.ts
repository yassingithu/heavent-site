import { SIGNATAIRE_EMPLOYEUR, signatureEmployeurHtml } from "@/lib/signatureEmployeur";
import { format } from "date-fns";
import { CGV_DEFAUT, CGV_NAWAR_DEFAUT, articlesHtml } from "@/lib/conditions";
import { fr } from "date-fns/locale";
import { aujourdhuiMaroc } from "@/lib/dateMaroc";

export type Unite = "heure" | "jour" | "forfait" | "unite" | "personne";

export const UNITES: { value: Unite; label: string; court: string }[] = [
  { value: "heure", label: "Heure", court: "h" },
  { value: "jour", label: "Jour", court: "j" },
  { value: "forfait", label: "Forfait", court: "forfait" },
  { value: "unite", label: "Unité", court: "u" },
  { value: "personne", label: "Personne", court: "pers." },
];

export const STATUTS: Record<string, { label: string; className: string }> = {
  brouillon: { label: "Brouillon", className: "bg-gray-100 text-gray-800" },
  envoye: { label: "Envoyé", className: "bg-blue-100 text-blue-800" },
  accepte: { label: "Accepté", className: "bg-green-100 text-green-800" },
  refuse: { label: "Refusé", className: "bg-red-100 text-red-800" },
  annule: { label: "Annulé", className: "bg-yellow-100 text-yellow-800" },
};

/**
 * Statuts possibles selon l'état du devis : un devis signé ou facturé ne peut plus redevenir brouillon,
 * envoyé ou refusé — il est soit accepté, soit annulé.
 */
export function statutsPermis(d: { statut: string; signe_le?: string | null; nbFactures?: number }) {
  const verrouille = !!d.signe_le || (d.nbFactures ?? 0) > 0;
  return Object.keys(STATUTS).filter((k) => !verrouille || k === "accepte" || k === "annule" || k === d.statut);
}

/** Un devis ne se supprime que s'il n'a aucune valeur légale : ni signé, ni facturé, ni contrat signé. */
export const devisSupprimable = (d: { signe_le?: string | null; nbFactures?: number; contratsSignes?: number }) =>
  !d.signe_le && !(d.nbFactures ?? 0) && !(d.contratsSignes ?? 0);

export interface Ligne {
  id?: string;
  designation: string;
  description: string;
  quantite: number;
  duree: number;
  unite: Unite;
  prix_unitaire: number;
  remise_pct: number;
}

export interface Prestation {
  id: string;
  categorie: string;
  designation: string;
  description: string | null;
  unite: string;
  prix_unitaire: number;
  actif: boolean;
  ordre: number;
}

export interface Parametres {
  raison_sociale: string;
  adresse: string | null;
  ville: string | null;
  telephone: string | null;
  email: string | null;
  site_web: string | null;
  ice: string | null;
  rc: string | null;
  if_fiscal: string | null;
  patente: string | null;
  rib: string | null;
  taux_tva: number;
  devise: string;
  validite_jours: number;
  conditions: string | null;
  cgv?: string | null;
  cgv_nawar?: string | null;
  conditions_contrat?: string | null;
  /** Lien de la fiche Google : envoyé aux clients le lendemain de leur événement pour laisser un avis */
  lien_avis_google?: string | null;
  /** N° d'affiliation CNSS de l'employeur, conservé tel que saisi */
  cnss_affiliation_employeur?: string | null;
}

export interface DevisForm {
  id?: string;
  numero?: string | null;
  type: "entreprise" | "mariage" | "evenement";
  /** Marque du devis : logo Heavent (par défaut) ou bar à parfums Nawar */
  marque?: "heavent" | "nawar";
  demande_entreprise_id?: string | null;
  demande_mariage_id?: string | null;
  client_nom: string;
  client_societe: string;
  client_email: string;
  client_telephone: string;
  client_adresse: string;
  client_ice: string;
  titre: string;
  date_evenement: string;
  date_fin_evenement: string;
  lieu: string;
  nb_personnes: string;
  remise_globale_pct: number;
  taux_tva: number;
  acompte_pct: number;
  statut: string;
  date_emission: string;
  date_validite: string;
  conditions: string;
  notes_internes: string;
  lignes: Ligne[];
  /** Lien secret de consultation / signature en ligne par le client (/mon-devis/…) */
  lien_token?: string | null;
  date_envoi?: string | null;
  relances?: number;
  /** Signature du client (« Bon pour accord » en ligne) */
  signe_le?: string | null;
  signature_nom?: string | null;
  signature_image?: string | null;
  /** Le client a préféré demander un rendez-vous avant de signer */
  rdv_demande_le?: string | null;
  rdv_message?: string | null;
}

/** Mention portée sur chaque devis (page client, PDF, e-mails). */
export const MENTION_MONTANT_EVOLUTIF = "Ce devis est établi d\'après les informations transmises. Son montant peut évoluer en fonction des services et des prestataires retenus lors d\'un premier rendez-vous.";

/** Ligne de la base → formulaire de devis (admin et page client). */
export function devisDepuisBase(d: any, lignes: any[]): DevisForm {
  return {
    id: d.id, numero: d.numero, type: d.type, marque: d.marque ?? "heavent",
    demande_entreprise_id: d.demande_entreprise_id ?? null, demande_mariage_id: d.demande_mariage_id ?? null,
    client_nom: d.client_nom ?? "", client_societe: d.client_societe ?? "", client_email: d.client_email ?? "",
    client_telephone: d.client_telephone ?? "", client_adresse: d.client_adresse ?? "", client_ice: d.client_ice ?? "",
    titre: d.titre ?? "", date_evenement: d.date_evenement ?? "", date_fin_evenement: d.date_fin_evenement ?? "",
    lieu: d.lieu ?? "", nb_personnes: d.nb_personnes ? String(d.nb_personnes) : "",
    remise_globale_pct: Number(d.remise_globale_pct) || 0, taux_tva: Number(d.taux_tva) || 0, acompte_pct: Number(d.acompte_pct) || 0,
    statut: d.statut, date_emission: d.date_emission ?? today(), date_validite: d.date_validite ?? "",
    conditions: d.conditions ?? "", notes_internes: d.notes_internes ?? "",
    lignes: (lignes ?? []).map((l) => ({
      designation: l.designation, description: l.description ?? "", quantite: Number(l.quantite),
      duree: Number(l.duree), unite: l.unite as Ligne["unite"], prix_unitaire: Number(l.prix_unitaire), remise_pct: Number(l.remise_pct) || 0,
    })),
    lien_token: d.lien_token ?? null, date_envoi: d.date_envoi ?? null, relances: d.relances ?? 0,
    signe_le: d.signe_le ?? null, signature_nom: d.signature_nom ?? null, signature_image: d.signature_image ?? null,
    rdv_demande_le: d.rdv_demande_le ?? null, rdv_message: d.rdv_message ?? null,
  };
}

export const lienClientDevis = (token?: string | null) => (token ? `https://heaventagency.com/mon-devis/${token}` : "");

export const dateHeureFr = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleString("fr-FR", { timeZone: "UTC", day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "";

export const r2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

export const totalLigne = (l: Ligne) =>
  r2((Number(l.quantite) || 0) * (Number(l.duree) || 0) * (Number(l.prix_unitaire) || 0) * (1 - (Number(l.remise_pct) || 0) / 100));

/** Même formule que la fonction SQL devis_recalculer, pour un affichage immédiat. */
export function calculerTotaux(lignes: Ligne[], remiseGlobalePct: number, tauxTva: number, acomptePct = 0) {
  const ht = r2(lignes.reduce((s, l) => s + totalLigne(l), 0));
  const remise = r2((ht * (Number(remiseGlobalePct) || 0)) / 100);
  const base = r2(ht - remise);
  const tva = r2((base * (Number(tauxTva) || 0)) / 100);
  const ttc = r2(base + tva);
  const acompte = r2((ttc * (Number(acomptePct) || 0)) / 100);
  return { ht, remise, base, tva, ttc, acompte };
}

export const money = (n: number, devise = "MAD") =>
  `${new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(n) || 0)} ${devise}`;

export const dateFr = (d?: string | null) => (d ? format(new Date(d), "dd/MM/yyyy", { locale: fr }) : "");

export const uniteCourt = (u: string) => UNITES.find((x) => x.value === u)?.court ?? u;

export const ligneVide = (): Ligne => ({
  designation: "",
  description: "",
  quantite: 1,
  duree: 1,
  unite: "heure",
  prix_unitaire: 0,
  remise_pct: 0,
});

export const today = () => aujourdhuiMaroc();

export function nouveauDevis(p?: Parametres | null): DevisForm {
  return {
    type: "evenement",
    marque: "heavent",
    client_nom: "",
    client_societe: "",
    client_email: "",
    client_telephone: "",
    client_adresse: "",
    client_ice: "",
    titre: "",
    date_evenement: "",
    date_fin_evenement: "",
    lieu: "",
    nb_personnes: "",
    remise_globale_pct: 0,
    taux_tva: p?.taux_tva ?? 20,
    acompte_pct: 50,
    statut: "brouillon",
    date_emission: today(),
    date_validite: "",
    conditions: p?.conditions ?? "",
    notes_internes: "",
    lignes: [ligneVide()],
  };
}

const esc = (s: unknown) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

export const SIGNATAIRE = SIGNATAIRE_EMPLOYEUR;

/** Contenu du devis (styles limités à .devis-doc pour pouvoir l'insérer dans la page et le convertir en PDF). */
/** Mise en page commune des documents élégants (devis, contrats) : classe .devis-doc */
export function cssDevis() {
  const or = "#C8B560", orFonce = "#A8933F", noir = "#141414", creme = "#FAF7EE";
  return `
  .devis-doc, .devis-doc * { box-sizing: border-box; margin: 0; }
  .devis-doc { font-family: "Inter", "Helvetica Neue", Arial, sans-serif; color: #2a2a2a; font-size: 11.5px; width: 794px; min-height: 1118px; background: #fff; line-height: 1.45; display: flex; flex-direction: column; }
  .devis-doc .serif { font-family: "Playfair Display", Georgia, serif; }
  .devis-doc .band { background: #fff; color: ${noir}; padding: 26px 44px 20px; display: flex; justify-content: space-between; align-items: center; position: relative; }
  .devis-doc .band::after { content: ""; position: absolute; left: 44px; right: 44px; bottom: 0; height: 3px; background: linear-gradient(90deg, ${orFonce}, ${or}, ${orFonce}); }
  .devis-doc .band img { height: 130px; display: block; }
  .devis-doc .titre { text-align: right; }
  .devis-doc .titre .mot { font-family: "Playfair Display", Georgia, serif; font-size: 44px; letter-spacing: 8px; color: ${or}; line-height: 1; }
  .devis-doc .titre .num { margin-top: 10px; font-size: 13px; letter-spacing: 1px; color: ${noir}; font-weight: 600; }
  .devis-doc .titre .dates { margin-top: 3px; font-size: 10.5px; color: #888; }
  .devis-doc .corps { padding: 30px 44px 10px; flex: 1; }
  .devis-doc .parties { display: flex; gap: 18px; }
  .devis-doc .partie { flex: 1; padding: 14px 16px; border-left: 3px solid ${or}; background: ${creme}; }
  .devis-doc .partie.client { background: #fff; border: 1px solid #ece6d3; border-left: 3px solid ${or}; }
  .devis-doc .etiquette { font-size: 9.5px; letter-spacing: 2px; text-transform: uppercase; color: ${orFonce}; font-weight: 700; margin-bottom: 6px; }
  .devis-doc .partie .nom { font-family: "Playfair Display", Georgia, serif; font-size: 15px; color: ${noir}; margin-bottom: 3px; }
  .devis-doc .partie div { margin: 1px 0; color: #4a4a4a; }
  .devis-doc .infos { display: flex; gap: 10px; margin: 18px 0 22px; }
  .devis-doc .info { flex: 1; border: 1px solid #ece6d3; border-radius: 4px; padding: 9px 12px; }
  .devis-doc .info .v { font-weight: 600; color: ${noir}; font-size: 12px; margin-top: 2px; }
  .devis-doc table { width: 100%; border-collapse: collapse; }
  .devis-doc thead th { background: ${or}; color: #fff; font-weight: 600; padding: 10px 10px; text-align: left; font-size: 9.5px; letter-spacing: 1.5px; text-transform: uppercase; }
  .devis-doc tbody td { padding: 10px; border-bottom: 1px solid #efe9d8; vertical-align: top; }
  .devis-doc tbody tr:nth-child(even) td { background: ${creme}; }
  .devis-doc tr { page-break-inside: avoid; }
  .devis-doc .n { text-align: right; white-space: nowrap; }
  .devis-doc .des { font-weight: 600; color: ${noir}; }
  .devis-doc .desc { color: #777; font-size: 10.5px; margin-top: 2px; white-space: pre-line; }
  .devis-doc .bas { display: flex; gap: 22px; margin-top: 18px; align-items: flex-start; page-break-inside: avoid; }
  .devis-doc .conditions { flex: 1; font-size: 10.5px; color: #555; white-space: pre-line; padding-top: 4px; }
  .devis-doc .conditions .etiquette { margin-bottom: 4px; }
  .devis-doc .conditions p + .etiquette { margin-top: 12px; }
  .devis-doc .totaux { width: 300px; border: 1px solid #ece6d3; }
  .devis-doc .totaux .l { display: flex; justify-content: space-between; padding: 7px 14px; border-bottom: 1px solid #f1ecdd; }
  .devis-doc .totaux .l span:first-child { color: #666; }
  .devis-doc .totaux .ttc { background: ${or}; color: #fff; padding: 12px 14px; border-bottom: none; align-items: baseline; }
  .devis-doc .totaux .ttc span:first-child { color: #fff; letter-spacing: 2px; text-transform: uppercase; font-size: 10px; font-weight: 700; }
  .devis-doc .totaux .ttc span:last-child { font-family: "Playfair Display", Georgia, serif; font-size: 20px; color: #fff; }
  .devis-doc .totaux .acompte { background: ${creme}; border-bottom: none; }
  .devis-doc .totaux .acompte span { color: ${orFonce} !important; font-weight: 600; }
  .devis-doc .signature { display: flex; gap: 22px; margin-top: 26px; page-break-inside: avoid; }
  .devis-doc .signature > div { flex: 1; padding: 14px 16px; min-height: 128px; font-size: 10.5px; color: #555; }
  .devis-doc .signature .agence { background: ${creme}; border-top: 3px solid ${or}; }
  .devis-doc .signature .client { border: 1px dashed #cfc6a8; }
  .devis-doc .signature .sign { font-family: "Playfair Display", Georgia, serif; font-style: italic; font-size: 26px; color: ${noir}; margin: 4px 0 0; }
  .devis-doc .signature .fonction { font-weight: 600; color: ${orFonce}; letter-spacing: .5px; margin-bottom: 6px; }
  .devis-doc .pied { background: ${creme}; border-top: 3px solid ${or}; color: #666; padding: 14px 44px; font-size: 9.5px; text-align: center; line-height: 1.6; margin-top: 24px; }
  .devis-doc .pied b { color: ${orFonce}; font-weight: 600; letter-spacing: 1px; }
  .devis-doc .pied .sep { color: ${orFonce}; padding: 0 6px; }
  .devis-doc.cgv .corps { padding-top: 22px; }
  .devis-doc.cgv h2 { font-family: "Playfair Display", Georgia, serif; font-size: 20px; color: ${noir}; margin-bottom: 4px; font-weight: 600; }
  .devis-doc.cgv .intro { color: #777; font-size: 10px; margin-bottom: 12px; }
  .devis-doc.cgv .cols { column-count: 2; column-gap: 26px; }
  .devis-doc.cgv .art { break-inside: avoid; margin-bottom: 9px; }
  .devis-doc.cgv .art h4 { font-size: 9.5px; letter-spacing: 1.2px; text-transform: uppercase; color: ${orFonce}; margin-bottom: 2px; }
  .devis-doc.cgv .art p { font-size: 9.6px; line-height: 1.45; text-align: justify; color: #444; }
  .devis-doc.cgv .accord { margin-top: 10px; padding: 10px 14px; border: 1px dashed #cfc6a8; font-size: 10px; color: #555; }
  `;
}

export function devisMarkup(d: DevisForm, p: Parametres | null, logoUrl: string) {
  const devise = p?.devise ?? "MAD";
  const t = calculerTotaux(d.lignes, d.remise_globale_pct, d.taux_tva, d.acompte_pct);
  const adresse = [p?.adresse, p?.ville].filter(Boolean).join(", ");
  const mentions = [
    p?.raison_sociale ?? "Heavent People Agency",
    adresse,
    p?.rc && `RC ${p.rc}`,
    p?.ice && `ICE ${p.ice}`,
    p?.if_fiscal && `IF ${p.if_fiscal}`,
    p?.patente && `Patente ${p.patente}`,
  ].filter(Boolean).map(esc).join(" · ");

  const rows = d.lignes
    .filter((l) => l.designation.trim())
    .map(
      (l) => `<tr>
        <td><div class="des">${esc(l.designation)}</div>${l.description ? `<div class="desc">${esc(l.description)}</div>` : ""}</td>
        <td class="n">${esc(l.quantite)}</td>
        <td class="n">${l.unite === "forfait" ? "—" : `${esc(l.duree)} ${esc(uniteCourt(l.unite))}`}</td>
        <td class="n">${money(l.prix_unitaire, devise)}</td>
        <td class="n">${l.remise_pct ? `${esc(l.remise_pct)} %` : ""}</td>
        <td class="n">${money(totalLigne(l), devise)}</td>
      </tr>`
    )
    .join("");

  const evenement = [
    d.titre && `<div><span>Événement</span>${esc(d.titre)}</div>`,
    d.date_evenement &&
      `<div><span>Date</span>${dateFr(d.date_evenement)}${d.date_fin_evenement ? ` au ${dateFr(d.date_fin_evenement)}` : ""}</div>`,
    d.lieu && `<div><span>Lieu</span>${esc(d.lieu)}</div>`,
    d.nb_personnes && `<div><span>Invités / participants</span>${esc(d.nb_personnes)}</div>`,
  ].filter(Boolean).join("");

  const css = cssDevis();

  const sep = '<span class="sep">◆</span>';
  const infos = [
    d.titre && ["Événement", d.titre],
    d.date_evenement && ["Date", `${dateFr(d.date_evenement)}${d.date_fin_evenement ? ` → ${dateFr(d.date_fin_evenement)}` : ""}`],
    d.lieu && ["Lieu", d.lieu],
    d.nb_personnes && ["Invités", d.nb_personnes],
  ].filter(Boolean) as [string, string][];

  const html = `<div class="devis-pages"><div class="devis-doc">
<div class="band">
  <img src="${esc(logoUrl)}" alt="${d.marque === "nawar" ? "Nawar — bar à parfums" : "Heavent People Agency"}">
  <div class="titre">
    <div class="mot">DEVIS</div>
    <div class="num">N° ${esc(d.numero ?? "brouillon")}</div>
    <div class="dates">Émis le ${dateFr(d.date_emission)}${d.date_validite ? ` · Valable jusqu'au ${dateFr(d.date_validite)}` : ""}</div>
  </div>
</div>
<div class="corps">
  <div class="parties">
    <div class="partie">
      <div class="etiquette">Émis par</div>
      <div class="nom">${esc(p?.raison_sociale ?? "Heavent People Agency")}</div>
      ${adresse ? `<div>${esc(adresse)}</div>` : ""}
      ${p?.telephone ? `<div>${esc(p.telephone)}</div>` : ""}
      ${p?.email ? `<div>${esc(p.email)}</div>` : ""}
      ${p?.site_web ? `<div>${esc(p.site_web)}</div>` : ""}
    </div>
    <div class="partie client">
      <div class="etiquette">Destinataire</div>
      <div class="nom">${esc(d.client_societe || d.client_nom)}</div>
      ${d.client_societe ? `<div>À l'attention de ${esc(d.client_nom)}</div>` : ""}
      ${d.client_adresse ? `<div>${esc(d.client_adresse)}</div>` : ""}
      ${d.client_telephone ? `<div>${esc(d.client_telephone)}</div>` : ""}
      ${d.client_email ? `<div>${esc(d.client_email)}</div>` : ""}
      ${d.client_ice ? `<div>ICE : ${esc(d.client_ice)}</div>` : ""}
    </div>
  </div>
  ${infos.length ? `<div class="infos">${infos.map(([k, v]) => `<div class="info"><div class="etiquette">${k}</div><div class="v">${esc(v)}</div></div>`).join("")}</div>` : '<div style="height:22px"></div>'}
  <table>
    <thead><tr><th>Prestation</th><th class="n">Qté</th><th class="n">Durée</th><th class="n">P.U. HT</th><th class="n">Remise</th><th class="n">Total HT</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <div class="bas">
    <div class="conditions">
      ${d.conditions ? `<div class="etiquette">Conditions</div><p>${esc(d.conditions)}</p>` : ""}
      ${p?.rib ? `<div class="etiquette">Règlement</div><p>Par virement bancaire — RIB ${esc(p.rib)}</p>` : ""}
      <div class="etiquette">Bon à savoir</div><p>${esc(MENTION_MONTANT_EVOLUTIF)}</p>
    </div>
    <div class="totaux">
      <div class="l"><span>Total HT</span><span>${money(t.ht, devise)}</span></div>
      ${t.remise ? `<div class="l"><span>Remise ${esc(d.remise_globale_pct)} %</span><span>- ${money(t.remise, devise)}</span></div><div class="l"><span>Net HT</span><span>${money(t.base, devise)}</span></div>` : ""}
      <div class="l"><span>TVA ${esc(d.taux_tva)} %</span><span>${money(t.tva, devise)}</span></div>
      <div class="l ttc"><span>Total TTC</span><span>${money(t.ttc, devise)}</span></div>
      ${d.acompte_pct ? `<div class="l acompte"><span>Acompte ${esc(d.acompte_pct)} %</span><span>${money(t.acompte, devise)}</span></div>` : ""}
    </div>
  </div>
  <div class="signature">
    <div class="agence">
      <div class="etiquette">Pour l'agence</div>
      ${signatureEmployeurHtml(54)}
      ${adresse ? `<div>${esc(adresse)}</div>` : ""}
      <div>${[p?.telephone, p?.email].filter(Boolean).map(esc).join(" · ")}</div>
    </div>
    <div class="client"${d.signe_le ? ' style="border-style:solid;border-color:#C8B560"' : ""}>
      <div class="etiquette">Bon pour accord</div>
      ${d.signe_le && d.signature_image && /^data:image\/png;base64,/.test(d.signature_image)
        ? `<img src="${d.signature_image}" alt="Signature du client" style="height:54px;display:block;margin:4px 0 2px">
           <div style="font-weight:600;color:#141414">${esc(d.signature_nom)}</div>
           <div style="font-size:9.5px;color:#777">« Bon pour accord » — signé électroniquement le ${esc(dateHeureFr(d.signe_le))}</div>`
        : `<div>Date, cachet et signature du client,<br>précédés de la mention « Bon pour accord ».</div>`}
    </div>
  </div>
</div>
<div class="pied"><b>${esc((p?.raison_sociale ?? "Heavent People Agency").toUpperCase())}</b>${adresse ? `${sep}${esc(adresse)}` : ""}<br>${[p?.rc && `RC ${esc(p.rc)}`, p?.ice && `ICE ${esc(p.ice)}`, p?.if_fiscal && `IF ${esc(p.if_fiscal)}`, p?.patente && `Patente ${esc(p.patente)}`].filter(Boolean).join(sep)}</div>
</div>
<div class="devis-doc cgv suite">
  <div class="band"><img src="${esc(logoUrl)}" alt="${d.marque === "nawar" ? "Nawar — bar à parfums" : "Heavent People Agency"}"><div class="titre"><div class="mot" style="font-size:26px;letter-spacing:4px">CONDITIONS</div><div class="num">GÉNÉRALES DE VENTE</div><div class="dates">Annexe au devis N° ${esc(d.numero ?? "brouillon")}</div></div></div>
  <div class="corps">
    <div class="intro">Les présentes conditions font partie intégrante du devis. Leur acceptation résulte de la signature du devis avec la mention « Bon pour accord ».</div>
    <div class="cols">${articlesHtml(d.marque === "nawar" ? (p?.cgv_nawar?.trim() ? p.cgv_nawar : CGV_NAWAR_DEFAUT) : (p?.cgv?.trim() ? p.cgv : CGV_DEFAUT), esc)}</div>
    <div class="accord">${d.signe_le ? `Conditions acceptées en ligne par ${esc(d.signature_nom)} le ${esc(dateHeureFr(d.signe_le))}, avec la signature du devis.` : "Paraphe du client : ……………………"}</div>
  </div>
  <div class="pied"><b>${esc((p?.raison_sociale ?? "Heavent People Agency").toUpperCase())}</b>${adresse ? `${sep}${esc(adresse)}` : ""}<br>${[p?.rc && `RC ${esc(p.rc)}`, p?.ice && `ICE ${esc(p.ice)}`, p?.if_fiscal && `IF ${esc(p.if_fiscal)}`, p?.patente && `Patente ${esc(p.patente)}`].filter(Boolean).join(sep)}</div>
</div></div>`;
  return { css, html };
}

/** Version page complète (aperçu dans un nouvel onglet). */
export function devisHtml(d: DevisForm, p: Parametres | null, logoUrl: string) {
  const { css, html } = devisMarkup(d, p, logoUrl);
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Devis ${esc(d.numero ?? "")}</title>
<style>body{margin:0;background:#f3f4f6}.devis-doc{margin:20px auto;box-shadow:0 1px 4px rgba(0,0,0,.1)}${css}</style></head><body>${html}</body></html>`;
}

export const nomFichierDevis = (d: DevisForm) =>
  `Devis-${d.numero ?? "brouillon"}-${(d.client_societe || d.client_nom || "client").replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "")}.pdf`;
