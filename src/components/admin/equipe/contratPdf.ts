import { supabase } from "@/integrations/supabase/client";
import { CONDITIONS_CONTRAT_DEFAUT, articlesHtml } from "@/lib/conditions";
import { dateFr, esc, mad, nomFichier, telechargerPdf, InfosAgence } from "@/lib/pdf";
import { cssDevis } from "@/components/admin/devis/devisUtils";
import logoDevis from "@/assets/logo-devis-noir.png";

interface LigneDate { date: string; heures: number; heure_debut?: string | null; heure_fin?: string | null }

// Compléments propres au contrat, sur la base de la mise en page des devis
const cssContrat = `
  .devis-doc .preambule { margin: 0 0 4px; color: #555; font-size: 11px; }
  .devis-doc .art { margin-top: 14px; page-break-inside: avoid; }
  .devis-doc h3.t { font-size: 9.5px; letter-spacing: 2px; text-transform: uppercase; color: #A8933F; font-weight: 700; margin-bottom: 5px; }
  .devis-doc .art p { color: #444; text-align: justify; }
  .devis-doc .art table { margin-top: 8px; }
  .devis-doc .remun { display: flex; gap: 22px; margin-top: 16px; align-items: flex-start; page-break-inside: avoid; }
  .devis-doc .remun .texte { flex: 1; color: #444; text-align: justify; font-size: 11px; }
  .devis-doc .remun .texte h3.t + p { margin-bottom: 12px; }
  .devis-doc .remun .totaux { width: 270px; }
  .devis-doc .mention { font-size: 10px; color: #777; margin-top: 6px; }
  /* Plus compact que le devis : le contrat tient sur une page */
  .devis-doc.contrat .band { padding: 20px 44px 14px; }
  .devis-doc.contrat .band img { height: 104px; }
  .devis-doc.contrat .titre .mot { font-size: 40px; }
  .devis-doc.contrat .corps { padding: 20px 44px 6px; }
  .devis-doc.contrat .partie { padding: 10px 14px; }
  .devis-doc.contrat .infos { margin: 12px 0 12px; }
  .devis-doc.contrat .info { padding: 7px 10px; }
  .devis-doc.contrat .art { margin-top: 10px; }
  .devis-doc.contrat tbody td { padding: 6px 10px; }
  .devis-doc.contrat thead th { padding: 7px 10px; }
  .devis-doc.contrat .remun { margin-top: 10px; }
  .devis-doc.contrat .signature { margin-top: 14px; }
  .devis-doc.contrat .signature > div { min-height: 96px; padding: 10px 14px; }
  .devis-doc.contrat .signature .sign { font-size: 22px; }
  .devis-doc.contrat .pied { margin-top: 12px; padding: 10px 44px; }
`;

function piedHtml(agence: InfosAgence | null) {
  const adresse = [agence?.adresse, agence?.ville].filter(Boolean).join(", ");
  const sep = '<span class="sep">◆</span>';
  return `<div class="pied"><b>${esc((agence?.raison_sociale ?? "Heavent People Agency").toUpperCase())}</b>${adresse ? `${sep}${esc(adresse)}` : ""}<br>${[
    agence?.rc && `RC ${esc(agence.rc)}`, agence?.ice && `ICE ${esc(agence.ice)}`, agence?.telephone && esc(agence.telephone), agence?.email && esc(agence.email),
  ].filter(Boolean).join(sep)}</div>`;
}

interface Evenement { titre: string; numero: string; lieu?: string | null }

function pageContrat(c: any, s: any, ev: Evenement, agence: InfosAgence | null, suite: boolean) {
  const dates: LigneDate[] = (Array.isArray(c.dates) && c.dates.length ? c.dates : [{ date: c.date_debut, heures: c.total_heures ?? c.heures_prestations ?? 0 }])
    .slice().sort((a: LigneDate, b: LigneDate) => a.date.localeCompare(b.date));
  const total = dates.reduce((t, d) => t + Number(d.heures || 0), 0);
  const taux = Number(c.taux_horaire || 0);
  const brut = c.salaire_brut != null ? Number(c.salaire_brut) : total * taux;
  const adresse = [agence?.adresse, agence?.ville].filter(Boolean).join(", ");
  const evenement = ev.titre || c.evenement || "la mission";
  const lieu = c.lieu || ev.lieu;
  const aujourdhui = dateFr(new Date().toISOString().slice(0, 10));
  const periode = `${dateFr(dates[0]?.date)}${dates.length > 1 ? ` → ${dateFr(dates[dates.length - 1].date)}` : ""}`;
  const identite = [
    s.date_naissance && `Né(e) le ${dateFr(s.date_naissance)}${s.lieu_naissance ? ` à ${esc(s.lieu_naissance)}` : ""}`,
    s.numero_identite && `CIN n° ${esc(s.numero_identite)}`,
    s.numero_securite_sociale && `CNSS n° ${esc(s.numero_securite_sociale)}`,
  ].filter(Boolean);
  const infos: [string, string][] = [
    ["Poste", c.titre || "Hôte / hôtesse d'accueil"],
    ["Événement", evenement],
    ...(lieu ? [["Lieu", lieu] as [string, string]] : []),
    ["Période", periode],
  ];

  return `<div class="devis-doc contrat${suite ? " suite" : ""}">
<div class="band">
  <img src="${esc(logoDevis)}" alt="Heavent People Agency">
  <div class="titre">
    <div class="mot">CONTRAT</div>
    <div class="num">Mission événementielle${ev.numero ? ` · ${esc(ev.numero)}` : ""}</div>
    <div class="dates">Contrat à durée déterminée · Fait à Rabat, le ${aujourdhui}</div>
  </div>
</div>
<div class="corps">
  <div class="parties">
    <div class="partie">
      <div class="etiquette">L'employeur</div>
      <div class="nom">${esc(agence?.raison_sociale ?? "Heavent People Agency")}</div>
      ${adresse ? `<div>${esc(adresse)}</div>` : ""}
      <div>${[agence?.rc && `RC ${esc(agence.rc)}`, agence?.ice && `ICE ${esc(agence.ice)}`].filter(Boolean).join(" · ")}</div>
      <div>Représentée par Mme Imane CHAIGARI, CEO</div>
    </div>
    <div class="partie client">
      <div class="etiquette">Le / la salarié(e)</div>
      <div class="nom">${esc(s.prenom ?? "")} ${esc(s.nom ?? "")}</div>
      ${identite.map((x) => `<div>${x}</div>`).join("")}
      ${s.adresse_complete || s.ville ? `<div>${esc([s.adresse_complete, s.code_postal, s.ville].filter(Boolean).join(", "))}</div>` : ""}
      ${s.telephone ? `<div>${esc(s.telephone)}</div>` : ""}
    </div>
  </div>

  <div class="infos">${infos.map(([k, v]) => `<div class="info"><div class="etiquette">${k}</div><div class="v">${esc(v)}</div></div>`).join("")}</div>

  <p class="preambule">Il a été convenu un contrat de travail à durée déterminée, conclu pour l'exécution d'une mission ponctuelle liée à un événement, conformément à l'article 16 du Code du travail marocain (loi n° 65-99).</p>

  <div class="art"><h3 class="t">Article 1 — Objet de la mission</h3>
    <p>Le / la salarié(e) est engagé(e) en qualité de <b>${esc(c.titre || "hôte / hôtesse d'accueil")}</b> pour « <b>${esc(evenement)}</b> »${lieu ? `, à <b>${esc(lieu)}</b>` : ""}. Il / elle exercera ses fonctions selon les consignes de l'agence et de son responsable sur place.</p></div>

  <div class="art"><h3 class="t">Article 2 — Dates et horaires</h3>
    <table>
      <thead><tr><th>Date</th><th>Horaires</th><th class="n">Heures</th></tr></thead>
      <tbody>
        ${dates.map((d) => `<tr><td>${dateFr(d.date, true)}</td><td>${d.heure_debut && d.heure_fin ? `${d.heure_debut.slice(0, 5)} – ${d.heure_fin.slice(0, 5)}` : "Selon le planning communiqué"}</td><td class="n">${d.heures} h</td></tr>`).join("")}
      </tbody>
    </table>
    <p class="mention">Le contrat prend fin de plein droit à l'issue de la dernière date, sans préavis ni indemnité.</p></div>

  <div class="remun">
    <div class="texte">
      <h3 class="t">Article 3 — Rémunération</h3>
      <p>La rémunération est versée à la fin du mois concerné, déduction faite des cotisations sociales légales (CNSS, AMO), et figure sur la fiche de paie mensuelle.</p>
      <h3 class="t">Article 4 — Obligations</h3>
      <p>Ponctualité, tenue fournie ou indiquée par l'agence, présentation et comportement irréprochables, confidentialité des informations du client. Toute absence doit être signalée au moins 48 heures à l'avance, sauf cas de force majeure.</p>
    </div>
    <div class="totaux">
      <div class="l"><span>Heures prévues</span><span>${total} h</span></div>
      <div class="l"><span>Taux horaire brut</span><span>${mad(taux)}</span></div>
      <div class="l ttc"><span>Salaire brut</span><span>${mad(brut)}</span></div>
    </div>
  </div>

  <div class="art"><h3 class="t">Article 5 — Dispositions générales</h3>
    <p>Le présent contrat est régi par le Code du travail marocain. Tout litige relève de la compétence des tribunaux de Rabat. Les conditions de la mission figurant en annexe font partie intégrante du contrat. Fait en deux exemplaires originaux.</p></div>

  <div class="signature">
    <div class="agence">
      <div class="etiquette">Pour l'employeur</div>
      <div class="sign">Imane CHAIGARI</div>
      <div class="fonction">CEO — Heavent People Agency</div>
      <div>Fait à Rabat, le ${aujourdhui}</div>
    </div>
    <div class="client">
      <div class="etiquette">Le / la salarié(e)</div>
      <div>${esc(s.prenom ?? "")} ${esc(s.nom ?? "")}</div>
      <div style="margin-top:6px">Signature précédée de la mention<br>« Lu et approuvé ».</div>
    </div>
  </div>
</div>
${piedHtml(agence)}
</div>`;
}

function pageConditions(s: any, ev: Evenement, agence: any) {
  const texte = agence?.conditions_contrat?.trim() ? agence.conditions_contrat : CONDITIONS_CONTRAT_DEFAUT;
  return `<div class="devis-doc cgv suite">
  <div class="band"><img src="${esc(logoDevis)}" alt="Heavent People Agency"><div class="titre"><div class="mot" style="font-size:26px;letter-spacing:4px">CONDITIONS</div><div class="num">DE LA MISSION</div><div class="dates">Annexe au contrat de ${esc(s.prenom ?? "")} ${esc(s.nom ?? "")}${ev.numero ? ` · ${esc(ev.numero)}` : ""}</div></div></div>
  <div class="corps">
    <div class="intro">Les conditions ci-dessous font partie intégrante du contrat de mission${ev.titre ? ` pour « ${esc(ev.titre)} »` : ""}.</div>
    <div class="cols">${articlesHtml(texte, esc)}</div>
    <div class="accord">Paraphe du / de la salarié(e) : ……………………&nbsp;&nbsp;&nbsp;&nbsp;Paraphe de l'employeur : ……………………</div>
  </div>
  ${piedHtml(agence)}
</div>`;
}

/** Télécharge un ou plusieurs contrats (avec leurs conditions) dans un seul PDF, au style des devis. */
export async function telechargerContrats(contratIds: string[], nom?: string) {
  const { data: contrats, error } = await supabase.from("contrats").select("*, staff(*), devis(titre, numero, lieu)").in("id", contratIds);
  if (error) throw error;
  const { data: agence } = await supabase.from("parametres_agence").select("*").eq("id", 1).maybeSingle();
  const liste = (contrats ?? []) as any[];
  if (!liste.length) throw new Error("Contrat introuvable");
  liste.sort((a, b) => `${a.staff?.nom}${a.staff?.prenom}`.localeCompare(`${b.staff?.nom}${b.staff?.prenom}`));
  // Le staff n'a pas accès à la table devis : on retombe sur les infos copiées dans le contrat
  const pages = liste.flatMap((c, i) => {
    const ev: Evenement = { titre: c.devis?.titre ?? c.evenement ?? "", numero: c.devis?.numero ?? c.devis_numero ?? "", lieu: c.devis?.lieu ?? c.lieu };
    return [pageContrat(c, c.staff ?? {}, ev, agence, i > 0), pageConditions(c.staff ?? {}, ev, agence)];
  });
  const ref = liste[0].devis?.numero ?? liste[0].devis_numero ?? liste[0].evenement;
  const fichier = nom ?? (liste.length === 1
    ? nomFichier("Contrat", liste[0].staff?.prenom, liste[0].staff?.nom, ref)
    : nomFichier("Contrats", ref, `${liste.length}`));
  await telechargerPdf(pages, cssDevis() + cssContrat, fichier);
}
