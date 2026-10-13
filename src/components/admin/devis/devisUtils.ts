import { format } from "date-fns";
import { fr } from "date-fns/locale";

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
}

export interface DevisForm {
  id?: string;
  numero?: string | null;
  type: "entreprise" | "mariage" | "evenement";
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
}

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

export const today = () => new Date().toISOString().slice(0, 10);

export function nouveauDevis(p?: Parametres | null): DevisForm {
  return {
    type: "evenement",
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

export const SIGNATAIRE = { nom: "Imane CHAIGARI", fonction: "CEO — Heavent People Agency" };

/** Contenu du devis (styles limités à .devis-doc pour pouvoir l'insérer dans la page et le convertir en PDF). */
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
        <td><strong>${esc(l.designation)}</strong>${l.description ? `<div class="desc">${esc(l.description)}</div>` : ""}</td>
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

  const css = `
  .devis-doc, .devis-doc * { box-sizing: border-box; }
  .devis-doc { font-family: "Helvetica Neue", Arial, sans-serif; color: #1f2937; font-size: 12px; width: 794px; padding: 40px 44px; background: #fff; line-height: 1.4; }
  .devis-doc .head { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #b8860b; padding-bottom: 14px; }
  .devis-doc .head img { height: 60px; }
  .devis-doc .agence { text-align: right; font-size: 11px; line-height: 1.55; color: #4b5563; }
  .devis-doc .agence strong { font-size: 14px; color: #111827; }
  .devis-doc h1 { font-size: 26px; letter-spacing: 2px; color: #b8860b; margin: 18px 0 2px; font-weight: 700; }
  .devis-doc .meta { color: #6b7280; }
  .devis-doc .grid { display: flex; gap: 16px; margin: 18px 0; }
  .devis-doc .box { flex: 1; border: 1px solid #e5e7eb; border-radius: 6px; padding: 12px; }
  .devis-doc .box h3 { margin: 0 0 6px; font-size: 11px; text-transform: uppercase; color: #b8860b; letter-spacing: 1px; }
  .devis-doc .box div { margin: 2px 0; }
  .devis-doc .box span { display: inline-block; min-width: 130px; color: #6b7280; }
  .devis-doc table { width: 100%; border-collapse: collapse; margin-top: 6px; }
  .devis-doc th { background: #111827; color: #fff; font-weight: 600; padding: 8px; text-align: left; font-size: 11px; }
  .devis-doc td { padding: 8px; border-bottom: 1px solid #e5e7eb; vertical-align: top; }
  .devis-doc tr { page-break-inside: avoid; }
  .devis-doc .n { text-align: right; white-space: nowrap; }
  .devis-doc .desc { color: #6b7280; font-size: 11px; margin-top: 2px; white-space: pre-line; }
  .devis-doc .totaux { margin-left: auto; width: 330px; margin-top: 12px; page-break-inside: avoid; }
  .devis-doc .totaux div { display: flex; justify-content: space-between; padding: 4px 0; }
  .devis-doc .totaux .ttc { border-top: 2px solid #111827; margin-top: 4px; padding-top: 8px; font-size: 15px; font-weight: 700; }
  .devis-doc .totaux .acompte { color: #b8860b; font-weight: 600; }
  .devis-doc .conditions { margin-top: 20px; font-size: 11px; color: #4b5563; white-space: pre-line; page-break-inside: avoid; }
  .devis-doc .signature { display: flex; gap: 24px; margin-top: 28px; page-break-inside: avoid; }
  .devis-doc .signature > div { flex: 1; border: 1px solid #e5e7eb; border-radius: 6px; padding: 12px; min-height: 130px; font-size: 11px; color: #4b5563; }
  .devis-doc .signature .label { text-transform: uppercase; letter-spacing: 1px; font-size: 10px; color: #b8860b; font-weight: 600; margin-bottom: 6px; }
  .devis-doc .signature .sign { font-family: "Playfair Display", Georgia, serif; font-style: italic; font-size: 24px; color: #111827; margin: 6px 0 2px; }
  .devis-doc .signature .fonction { font-weight: 600; color: #111827; }
  .devis-doc .foot { margin-top: 26px; border-top: 1px solid #e5e7eb; padding-top: 8px; text-align: center; font-size: 9.5px; color: #6b7280; line-height: 1.5; }
  `;

  const html = `<div class="devis-doc">
<div class="head">
  <img src="${esc(logoUrl)}" alt="Heavent People Agency" crossorigin="anonymous">
  <div class="agence">
    <strong>${esc(p?.raison_sociale ?? "Heavent People Agency")}</strong><br>
    ${adresse ? `${esc(adresse)}<br>` : ""}
    ${p?.telephone ? `${esc(p.telephone)}<br>` : ""}
    ${p?.email ? `${esc(p.email)}<br>` : ""}
    ${p?.site_web ? esc(p.site_web) : ""}
  </div>
</div>
<h1>DEVIS</h1>
<div class="meta">N° <strong>${esc(d.numero ?? "(non enregistré)")}</strong> · Émis le ${dateFr(d.date_emission)}${d.date_validite ? ` · Valable jusqu'au ${dateFr(d.date_validite)}` : ""}</div>
<div class="grid">
  <div class="box"><h3>Client</h3>
    ${d.client_societe ? `<div><strong>${esc(d.client_societe)}</strong></div>` : ""}
    <div>${esc(d.client_nom)}</div>
    ${d.client_adresse ? `<div>${esc(d.client_adresse)}</div>` : ""}
    ${d.client_telephone ? `<div>${esc(d.client_telephone)}</div>` : ""}
    ${d.client_email ? `<div>${esc(d.client_email)}</div>` : ""}
    ${d.client_ice ? `<div>ICE : ${esc(d.client_ice)}</div>` : ""}
  </div>
  <div class="box"><h3>Prestation</h3>${evenement || "<div>—</div>"}</div>
</div>
<table>
  <thead><tr><th>Désignation</th><th class="n">Qté</th><th class="n">Durée</th><th class="n">Prix unitaire HT</th><th class="n">Remise</th><th class="n">Total HT</th></tr></thead>
  <tbody>${rows}</tbody>
</table>
<div class="totaux">
  <div><span>Total HT</span><span>${money(t.ht, devise)}</span></div>
  ${t.remise ? `<div><span>Remise (${esc(d.remise_globale_pct)} %)</span><span>- ${money(t.remise, devise)}</span></div><div><span>Net HT</span><span>${money(t.base, devise)}</span></div>` : ""}
  <div><span>TVA (${esc(d.taux_tva)} %)</span><span>${money(t.tva, devise)}</span></div>
  <div class="ttc"><span>Total TTC</span><span>${money(t.ttc, devise)}</span></div>
  ${d.acompte_pct ? `<div class="acompte"><span>Acompte à la commande (${esc(d.acompte_pct)} %)</span><span>${money(t.acompte, devise)}</span></div>` : ""}
</div>
${d.conditions ? `<div class="conditions"><strong>Conditions :</strong>\n${esc(d.conditions)}</div>` : ""}
${p?.rib ? `<div class="conditions"><strong>Règlement par virement :</strong> RIB ${esc(p.rib)}</div>` : ""}
<div class="signature">
  <div>
    <div class="label">Pour l'agence</div>
    <div class="sign">${esc(SIGNATAIRE.nom)}</div>
    <div class="fonction">${esc(SIGNATAIRE.fonction)}</div>
    ${adresse ? `<div>${esc(adresse)}</div>` : ""}
    <div>${[p?.telephone, p?.email].filter(Boolean).map(esc).join(" · ")}</div>
  </div>
  <div>
    <div class="label">Bon pour accord</div>
    <div>Date, cachet et signature du client,<br>précédés de la mention « Bon pour accord ».</div>
  </div>
</div>
<div class="foot">${mentions}</div>
</div>`;
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
