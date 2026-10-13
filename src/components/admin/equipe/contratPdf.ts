import { supabase } from "@/integrations/supabase/client";
import { CONDITIONS_CONTRAT_DEFAUT, articlesHtml } from "@/lib/conditions";
import { dateFr, enteteDoc, esc, logo, mad, nomFichier, piedAgence, telechargerPdf, InfosAgence } from "@/lib/pdf";

interface LigneDate { date: string; heures: number; heure_debut?: string | null; heure_fin?: string | null }

const cssContrat = `
  .doc-heavent .parties { display: flex; gap: 16px; }
  .doc-heavent .parties > div { flex: 1; }
  .doc-heavent .parties .nom { font-family: "Playfair Display", Georgia, serif; font-size: 14px; color: #141414; margin-bottom: 2px; }
  .doc-heavent .intro { margin: 14px 0 4px; color: #555; }
  .doc-heavent .cols { column-count: 2; column-gap: 26px; }
  .doc-heavent .art { break-inside: avoid; margin-bottom: 10px; }
  .doc-heavent .art h4 { font-size: 9.5px; letter-spacing: 1.2px; text-transform: uppercase; color: #A8933F; margin-bottom: 2px; }
  .doc-heavent .art p { font-size: 10px; line-height: 1.5; text-align: justify; color: #444; }
`;

function pageConditions(c: any, s: any, devis: any, agence: any) {
  const texte = agence?.conditions_contrat?.trim() ? agence.conditions_contrat : CONDITIONS_CONTRAT_DEFAUT;
  return `<div class="doc-heavent">
  ${enteteDoc(logo, "CONDITIONS", `Conditions de la mission · annexe au contrat de ${esc(s.prenom)} ${esc(s.nom)}`)}
  <div class="corps">
    <p class="intro" style="margin-top:0">Les conditions ci-dessous font partie intégrante du contrat de mission pour l'événement « ${esc(devis?.titre ?? "")} ».</p>
    <div class="cols" style="margin-top:10px">${articlesHtml(texte, esc)}</div>
    <div class="signatures">
      <div class="agence"><div class="etiquette">Pour l'employeur</div><div class="sign">Imane CHAIGARI</div><div>CEO — Heavent People Agency</div></div>
      <div class="autre"><div class="etiquette">Le / la salarié(e)</div><div>${esc(s.prenom)} ${esc(s.nom)}</div><div style="margin-top:4px;color:#888">Paraphe et mention « Lu et approuvé »</div></div>
    </div>
  </div>
  ${piedAgence(agence)}
</div>`;
}

function pageContrat(c: any, s: any, devis: any, agence: InfosAgence | null) {
  const dates: LigneDate[] = (c.dates ?? []).slice().sort((a: LigneDate, b: LigneDate) => a.date.localeCompare(b.date));
  const total = dates.reduce((t, d) => t + Number(d.heures || 0), 0);
  const adresseAgence = [agence?.adresse, agence?.ville].filter(Boolean).join(", ");
  const evenement = devis?.titre || "l'événement";
  const lieu = c.lieu || devis?.lieu;
  const identite = [
    s.date_naissance && `né(e) le ${dateFr(s.date_naissance)}${s.lieu_naissance ? ` à ${esc(s.lieu_naissance)}` : ""}`,
    s.numero_identite && `CIN n° ${esc(s.numero_identite)}`,
    s.numero_securite_sociale && `CNSS n° ${esc(s.numero_securite_sociale)}`,
  ].filter(Boolean).join(", ");

  return `<div class="doc-heavent">
  ${enteteDoc(logo, "CONTRAT", `Mission événementielle · ${esc(devis?.numero ?? "")}`)}
  <div class="corps">
    <div class="parties">
      <div class="bloc"><div class="etiquette">L'employeur</div>
        <div class="nom">${esc(agence?.raison_sociale ?? "Heavent People Agency")}</div>
        ${adresseAgence ? `<div>${esc(adresseAgence)}</div>` : ""}
        <div>${[agence?.rc && `RC ${esc(agence.rc)}`, agence?.ice && `ICE ${esc(agence.ice)}`].filter(Boolean).join(" · ")}</div>
        <div>Représentée par Mme Imane CHAIGARI, CEO</div>
      </div>
      <div class="cadre"><div class="etiquette">Le / la salarié(e)</div>
        <div class="nom">${esc(s.prenom)} ${esc(s.nom)}</div>
        ${identite ? `<div>${identite}</div>` : ""}
        ${s.adresse_complete || s.ville ? `<div>${esc([s.adresse_complete, s.code_postal, s.ville].filter(Boolean).join(", "))}</div>` : ""}
        ${s.telephone ? `<div>${esc(s.telephone)}</div>` : ""}
      </div>
    </div>
    <p class="intro">Il a été convenu un contrat de travail à durée déterminée, conclu pour l'exécution d'une mission ponctuelle liée à un événement, conformément à l'article 16 du Code du travail marocain.</p>

    <div class="article"><h3>Article 1 — Objet de la mission</h3>
      <p>Le / la salarié(e) est engagé(e) en qualité de <b>${esc(c.poste ?? c.titre)}</b> pour l'événement « <b>${esc(evenement)}</b> »${lieu ? `, à <b>${esc(lieu)}</b>` : ""}. Il / elle exercera ses fonctions selon les consignes de l'agence et de son responsable sur place.</p></div>

    <div class="article"><h3>Article 2 — Dates et horaires</h3>
      <p>La mission est effectuée ${dates.length > 1 ? `sur les ${dates.length} dates suivantes` : "à la date suivante"} :</p>
      <table style="margin-top:6px"><thead><tr><th>Date</th><th>Horaires</th><th class="n">Heures</th></tr></thead><tbody>
        ${dates.map((d) => `<tr><td>${dateFr(d.date, true)}</td><td>${d.heure_debut && d.heure_fin ? `${d.heure_debut.slice(0, 5)} – ${d.heure_fin.slice(0, 5)}` : "Selon planning communiqué"}</td><td class="n">${d.heures} h</td></tr>`).join("")}
        <tr><td colspan="2"><b>Total</b></td><td class="n"><b>${total} h</b></td></tr>
      </tbody></table>
      <p style="margin-top:6px">Le contrat prend fin de plein droit à l'issue de la dernière date, sans préavis ni indemnité.</p></div>

    <div class="article"><h3>Article 3 — Rémunération</h3>
      <p>Le / la salarié(e) percevra une rémunération brute de <b>${mad(c.taux_horaire)}</b> par heure travaillée, soit <b>${mad(c.salaire_brut)}</b> brut pour ${total} heures. La rémunération est versée à la fin du mois concerné, déduction faite des cotisations sociales légales (CNSS, AMO), et figure sur la fiche de paie mensuelle.</p></div>

    <div class="article"><h3>Article 4 — Obligations</h3>
      <p>Le / la salarié(e) s'engage à être ponctuel(le), à porter la tenue fournie ou indiquée par l'agence, à adopter une présentation et un comportement irréprochables, et à respecter la confidentialité des informations du client. Toute absence doit être signalée à l'agence au moins 48 heures à l'avance, sauf cas de force majeure.</p></div>

    <div class="article"><h3>Article 5 — Dispositions générales</h3>
      <p>Le présent contrat est régi par le Code du travail marocain. Tout litige relève de la compétence des tribunaux de Rabat. Les conditions de la mission figurant en annexe font partie intégrante du présent contrat. Fait en deux exemplaires originaux.</p></div>

    <div class="signatures">
      <div class="agence"><div class="etiquette">Pour l'employeur</div><div class="sign">Imane CHAIGARI</div><div>CEO — Heavent People Agency</div><div style="margin-top:6px">Fait à Rabat, le ${dateFr(new Date().toISOString().slice(0, 10))}</div></div>
      <div class="autre"><div class="etiquette">Le / la salarié(e)</div><div>${esc(s.prenom)} ${esc(s.nom)}</div><div style="margin-top:4px;color:#888">Signature précédée de la mention « Lu et approuvé »</div></div>
    </div>
  </div>
  ${piedAgence(agence)}
</div>`;
}

/** Télécharge un ou plusieurs contrats dans un seul PDF. */
export async function telechargerContrats(contratIds: string[], nom?: string) {
  const { data: contrats, error } = await supabase.from("contrats").select("*, staff(*), devis(titre, numero, lieu)").in("id", contratIds);
  if (error) throw error;
  const { data: agence } = await supabase.from("parametres_agence").select("*").eq("id", 1).maybeSingle();
  const liste = (contrats ?? []) as any[];
  liste.sort((a, b) => `${a.staff?.nom}${a.staff?.prenom}`.localeCompare(`${b.staff?.nom}${b.staff?.prenom}`));
  const pages = liste.flatMap((c) => [pageContrat(c, c.staff ?? {}, c.devis, agence), pageConditions(c, c.staff ?? {}, c.devis, agence)]);
  const fichier = nom ?? (liste.length === 1
    ? nomFichier("Contrat", liste[0].staff?.prenom, liste[0].staff?.nom, liste[0].devis?.numero)
    : nomFichier("Contrats", liste[0]?.devis?.numero, `${liste.length}`));
  await telechargerPdf(pages, cssContrat, fichier);
}
