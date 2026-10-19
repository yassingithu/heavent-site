import { Parametres, cssDevis, dateFr, money, uniteCourt } from "./devisUtils";

/** Facture émise à partir d'un devis accepté (copie figée du devis au moment de l'émission). */
export interface Facture {
  id: string;
  numero: string;
  devis_id: string;
  devis_numero: string | null;
  type: "acompte" | "solde" | "totale";
  marque: string;
  date_emission: string;
  client_nom: string; client_societe: string | null; client_email: string | null; client_telephone: string | null;
  client_adresse: string | null; client_ice: string | null;
  titre: string | null; date_evenement: string | null; date_fin_evenement: string | null; lieu: string | null;
  lignes: { designation: string; description?: string | null; quantite: number; duree: number; unite: string; prix_unitaire: number; remise_pct: number; total_ht: number }[];
  remise_globale_pct: number; taux_tva: number;
  total_ht: number; total_remise: number; total_tva: number; total_ttc: number;
  acompte_pct: number | null;
  deductions: { numero: string; date: string; ht: number; tva: number; ttc: number; payee: boolean }[];
  deduction_ttc: number; net_a_payer: number; devise: string;
  statut: "a_payer" | "payee" | "annulee";
  payee_le: string | null; mode_paiement: string | null; envoyee_le: string | null; annulee_le?: string | null;
  notes?: string | null;
}

export const TYPES_FACTURE: Record<Facture["type"], string> = {
  acompte: "Facture d'acompte",
  solde: "Facture de solde",
  totale: "Facture",
};

export const STATUTS_FACTURE: Record<Facture["statut"], { label: string; className: string }> = {
  a_payer: { label: "À payer", className: "bg-amber-100 text-amber-900" },
  payee: { label: "Payée", className: "bg-green-100 text-green-800" },
  annulee: { label: "Annulée", className: "bg-gray-200 text-gray-700 line-through" },
};

export const MODES_PAIEMENT = ["Virement", "Espèces", "Chèque", "Carte bancaire", "Effet de commerce"];

// ---------- montant en toutes lettres (« Arrêtée la présente facture à la somme de … ») ----------
const UNITES_L = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize"];
const DIZAINES = ["", "dix", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante", "quatre-vingt", "quatre-vingt"];

function moinsDeCent(n: number): string {
  if (n <= 16) return UNITES_L[n];
  if (n < 20) return "dix-" + UNITES_L[n - 10];
  const d = Math.floor(n / 10), u = n % 10;
  if (d === 7 || d === 9) {
    const reste = 10 + u; // soixante-dix, quatre-vingt-dix…
    const base = DIZAINES[d];
    if (d === 7 && u === 1) return "soixante et onze";
    return `${base}-${moinsDeCent(reste)}`;
  }
  if (u === 0) return d === 8 ? "quatre-vingts" : DIZAINES[d];
  if (u === 1 && d !== 8) return `${DIZAINES[d]} et un`;
  return `${DIZAINES[d]}-${UNITES_L[u]}`;
}

function moinsDeMille(n: number, pluriel = true): string {
  const c = Math.floor(n / 100), r = n % 100;
  let t = "";
  if (c === 1) t = "cent";
  else if (c > 1) t = `${UNITES_L[c]} cent${r === 0 && pluriel ? "s" : ""}`;
  if (r) t += (t ? " " : "") + (r === 80 && !pluriel ? "quatre-vingt" : moinsDeCent(r));
  return t || "zéro";
}

/** 7128.5 → « sept mille cent vingt-huit dirhams et cinquante centimes » */
export function nombreEnLettres(n: number): string {
  if (!Number.isFinite(n) || n < 0) return "";
  const entier = Math.floor(n + 1e-9);
  if (entier === 0) return "zéro";
  const parts: string[] = [];
  const milliards = Math.floor(entier / 1e9), millions = Math.floor((entier % 1e9) / 1e6), milliers = Math.floor((entier % 1e6) / 1000), reste = entier % 1000;
  if (milliards) parts.push(`${moinsDeMille(milliards)} milliard${milliards > 1 ? "s" : ""}`);
  if (millions) parts.push(`${moinsDeMille(millions)} million${millions > 1 ? "s" : ""}`);
  if (milliers) parts.push(milliers === 1 ? "mille" : `${moinsDeMille(milliers, false)} mille`);
  if (reste) parts.push(moinsDeMille(reste));
  return parts.join(" ");
}

export function montantEnLettres(montant: number, devise = "MAD") {
  const centimes = Math.round((montant - Math.floor(montant + 1e-9)) * 100);
  const entier = Math.floor(montant + 1e-9);
  const mot = devise === "MAD" ? (entier > 1 ? "dirhams" : "dirham") : devise;
  let t = `${nombreEnLettres(entier)} ${entier >= 1e6 && entier % 1e6 === 0 ? "de " : ""}${mot}`;
  if (centimes) t += ` et ${nombreEnLettres(centimes)} centime${centimes > 1 ? "s" : ""}`;
  return t.charAt(0).toUpperCase() + t.slice(1);
}

const esc = (s: unknown) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

export const nomFichierFacture = (f: Facture) =>
  `Facture-${f.numero}-${(f.client_societe || f.client_nom || "client").replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "")}.pdf`;

/** Mise en page de la facture (même charte que le devis). */
export function factureMarkup(f: Facture, p: Parametres | null, logoUrl: string) {
  const devise = f.devise || p?.devise || "MAD";
  const adresse = [p?.adresse, p?.ville].filter(Boolean).join(", ");
  const sep = '<span class="sep">◆</span>';
  const legal = [p?.rc && `RC ${esc(p.rc)}`, p?.ice && `ICE ${esc(p.ice)}`, p?.if_fiscal && `IF ${esc(p.if_fiscal)}`, p?.patente && `Patente ${esc(p.patente)}`].filter(Boolean).join(sep);
  const net = Number(f.total_ht) - Number(f.total_remise);

  const rows = (f.lignes ?? []).map((l) => `<tr>
      <td><div class="des">${esc(l.designation)}</div>${l.description ? `<div class="desc">${esc(l.description)}</div>` : ""}</td>
      <td class="n">${esc(Number(l.quantite))}</td>
      <td class="n">${l.unite === "forfait" ? "—" : `${esc(Number(l.duree))} ${esc(uniteCourt(l.unite))}`}</td>
      <td class="n">${money(Number(l.prix_unitaire), devise)}</td>
      <td class="n">${Number(l.remise_pct) ? `${esc(Number(l.remise_pct))} %` : ""}</td>
      <td class="n">${money(Number(l.total_ht), devise)}</td></tr>`).join("");

  const infos = [
    ["Devis", f.devis_numero ?? ""],
    f.titre && ["Événement", f.titre],
    f.date_evenement && ["Date", `${dateFr(f.date_evenement)}${f.date_fin_evenement ? ` → ${dateFr(f.date_fin_evenement)}` : ""}`],
    f.lieu && ["Lieu", f.lieu],
  ].filter(Boolean) as [string, string][];

  const deductions = (f.deductions ?? []).map((a) =>
    `<div class="l"><span>Acompte ${esc(a.numero)}${a.payee ? " réglé" : ""}</span><span style="white-space:nowrap">- ${money(Number(a.ttc), devise)}</span></div>`).join("");

  const statut = f.statut === "payee"
    ? `<div class="tampon paye">Payée${f.payee_le ? ` le ${dateFr(f.payee_le)}` : ""}${f.mode_paiement ? ` · ${esc(f.mode_paiement)}` : ""}</div>`
    : f.statut === "annulee" ? `<div class="tampon annule">Facture annulée</div>` : "";

  const css = cssDevis() + `
  .devis-doc .tampon { display: inline-block; margin-top: 14px; padding: 6px 14px; border: 2px solid; border-radius: 4px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; font-size: 11px; transform: rotate(-2deg); }
  .devis-doc .tampon.paye { color: #2F7A3A; border-color: #2F7A3A; }
  .devis-doc .tampon.annule { color: #B42318; border-color: #B42318; }
  .devis-doc .lettres { margin-top: 16px; padding: 10px 14px; background: #FAF7EE; border-left: 3px solid #C8B560; font-size: 11px; color: #2a2a2a; page-break-inside: avoid; }
  .devis-doc .totaux .net { background: #141414; color: #fff; padding: 11px 14px; border-bottom: none; }
  .devis-doc .totaux .net span:first-child { color: #fff; letter-spacing: 1.5px; text-transform: uppercase; font-size: 10px; font-weight: 700; }
  .devis-doc .totaux .net span:last-child { font-family: "Playfair Display", Georgia, serif; font-size: 18px; color: #fff; }`;

  const titreDoc = f.type === "acompte" ? "FACTURE D'ACOMPTE" : f.type === "solde" ? "FACTURE DE SOLDE" : "FACTURE";
  const html = `<div class="devis-pages"><div class="devis-doc">
<div class="band">
  <img src="${esc(logoUrl)}" alt="${f.marque === "nawar" ? "Nawar — bar à parfums" : "Heavent People Agency"}">
  <div class="titre">
    <div class="mot" style="${f.type === "totale" ? "" : "font-size:28px;letter-spacing:4px"}">${titreDoc}</div>
    <div class="num">N° ${esc(f.numero)}</div>
    <div class="dates">Émise le ${dateFr(f.date_emission)} · Payable à réception</div>
  </div>
</div>
<div class="corps">
  <div class="parties">
    <div class="partie">
      <div class="etiquette">Émise par</div>
      <div class="nom">${esc(p?.raison_sociale ?? "Heavent People Agency")}</div>
      ${adresse ? `<div>${esc(adresse)}</div>` : ""}
      ${p?.telephone ? `<div>${esc(p.telephone)}</div>` : ""}
      ${p?.email ? `<div>${esc(p.email)}</div>` : ""}
      ${p?.ice ? `<div>ICE : ${esc(p.ice)}</div>` : ""}
    </div>
    <div class="partie client">
      <div class="etiquette">Facturé à</div>
      <div class="nom">${esc(f.client_societe || f.client_nom)}</div>
      ${f.client_societe ? `<div>À l'attention de ${esc(f.client_nom)}</div>` : ""}
      ${f.client_adresse ? `<div>${esc(f.client_adresse)}</div>` : ""}
      ${f.client_telephone ? `<div>${esc(f.client_telephone)}</div>` : ""}
      ${f.client_email ? `<div>${esc(f.client_email)}</div>` : ""}
      ${f.client_ice ? `<div>ICE : ${esc(f.client_ice)}</div>` : ""}
    </div>
  </div>
  <div class="infos">${infos.map(([k, v]) => `<div class="info"><div class="etiquette">${k}</div><div class="v">${esc(v)}</div></div>`).join("")}</div>
  <table>
    <thead><tr><th>Désignation</th><th class="n">Qté</th><th class="n">Durée</th><th class="n">P.U. HT</th><th class="n">Remise</th><th class="n">Total HT</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <div class="bas">
    <div class="conditions">
      <div class="etiquette">Règlement</div>
      <p>Payable à réception${p?.rib ? `, par virement bancaire — RIB ${esc(p.rib)}` : ""}.<br>Merci d'indiquer la référence <b>${esc(f.numero)}</b> avec votre paiement.</p>
      <div class="etiquette">Retard de paiement</div>
      <p>Pour les clients professionnels, tout retard de paiement entraîne de plein droit les pénalités prévues par la loi n° 69-21 relative aux délais de paiement.</p>
      ${statut}
    </div>
    <div class="totaux">
      <div class="l"><span>Total HT</span><span>${money(Number(f.total_ht), devise)}</span></div>
      ${Number(f.total_remise) ? `<div class="l"><span>Remise ${esc(Number(f.remise_globale_pct))} %</span><span>- ${money(Number(f.total_remise), devise)}</span></div><div class="l"><span>Net HT</span><span>${money(net, devise)}</span></div>` : ""}
      <div class="l"><span>TVA ${esc(Number(f.taux_tva))} %</span><span>${money(Number(f.total_tva), devise)}</span></div>
      <div class="l ttc"><span>Total TTC</span><span>${money(Number(f.total_ttc), devise)}</span></div>
      ${deductions}
      ${f.type === "solde" ? `<div class="l net"><span>Reste à payer</span><span>${money(Number(f.net_a_payer), devise)}</span></div>` : ""}
    </div>
  </div>
  <div class="lettres">Arrêtée la présente facture à la somme de : <b>${esc(montantEnLettres(Number(f.net_a_payer), devise))}</b> TTC.</div>
</div>
<div class="pied"><b>${esc((p?.raison_sociale ?? "Heavent People Agency").toUpperCase())}</b>${adresse ? `${sep}${esc(adresse)}` : ""}<br>${legal}</div>
</div></div>`;
  return { css, html };
}
