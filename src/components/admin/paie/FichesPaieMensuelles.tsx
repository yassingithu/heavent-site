import { signatureEmployeurHtml } from "@/lib/signatureEmployeur";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Banknote, Download, RefreshCw } from "lucide-react";
import PaiementsPaie, { MODES, totalPaye } from "./PaiementsPaie";
import { STATUTS_FINAUX, doublonsCnss, etatBulletin, manquesBulletin } from "@/lib/cnss";
import { MOIS, dateFr, enteteDoc, esc, logo, mad, nomFichier, piedAgence, telechargerPdf, InfosAgence } from "@/lib/pdf";

const STATUTS: Record<string, { label: string; className: string }> = {
  en_attente: { label: "À valider", className: "bg-yellow-100 text-yellow-800" },
  valide: { label: "Validée", className: "bg-blue-100 text-blue-800" },
  paye: { label: "Payée", className: "bg-green-100 text-green-800" },
};

const cssPaie = `
  .doc-heavent .ident { display: flex; gap: 16px; }
  .doc-heavent .ident > div { flex: 1; }
  .doc-heavent .ident .nom { font-family: "Playfair Display", Georgia, serif; font-size: 15px; color: #141414; }
  .doc-heavent .recap { width: 340px; margin-left: auto; margin-top: 14px; border: 1px solid #ece6d3; }
  .doc-heavent .recap div { display: flex; justify-content: space-between; padding: 6px 12px; border-bottom: 1px solid #f1ecdd; }
  .doc-heavent .recap .net { background: #C8B560; color: #fff; font-weight: 700; font-size: 14px; border-bottom: none; }
  .doc-heavent .apercu { border: 2px solid #b45309; color: #92400e; background: #fffbeb; padding: 8px 12px; margin-bottom: 12px; font-size: 11px; }
  .doc-heavent .apercu b { display: block; font-size: 13px; letter-spacing: .04em; }
`;

function pagePaie(f: any, agence: InfosAgence | null) {
  const s = f.staff ?? {};
  const lignes: any[] = f.details ?? [];
  const periode = `${MOIS[f.mois - 1]} ${f.annee}`;
  // Un bulletin n'est présenté comme définitif que s'il est complet ET validé (ou payé) ; sinon c'est un aperçu, et il le dit.
  const e = etatBulletin(agence, s, f.statut);
  const bandeau = !e.bandeau ? "" : `<div class="apercu"><b>${esc(e.bandeau)}</b>${e.manques.length
    ? `Éléments manquants : ${e.manques.map(esc).join(", ")}.`
    : "Ce document sera définitif une fois le bulletin validé par l'employeur."}</div>`;
  return `<div class="doc-heavent">
  ${enteteDoc(logo, e.titre, `Période : ${esc(periode)}`)}
  <div class="corps">
    ${bandeau}
    <div class="ident">
      <div class="bloc"><div class="etiquette">Employeur</div><div class="nom">${esc(agence?.raison_sociale ?? "Heavent People Agency")}</div>
        <div>${esc([agence?.adresse, agence?.ville].filter(Boolean).join(", "))}</div>
        <div>${[agence?.rc && `RC ${esc(agence.rc)}`, agence?.ice && `ICE ${esc(agence.ice)}`].filter(Boolean).join(" · ")}</div>
        <div>Affiliation CNSS : ${agence?.cnss_affiliation_employeur?.trim() ? esc(agence.cnss_affiliation_employeur) : "<i>non renseignée</i>"}</div></div>
      <div class="cadre"><div class="etiquette">Salarié(e)</div><div class="nom">${esc(s.prenom)} ${esc(s.nom)}</div>
        ${s.numero_identite ? `<div>CIN : ${esc(s.numero_identite)}</div>` : ""}
        <div>CNSS : ${s.numero_securite_sociale?.trim() ? esc(s.numero_securite_sociale) : "<i>non renseigné</i>"}</div>
        ${s.adresse_complete || s.ville ? `<div>${esc([s.adresse_complete, s.ville].filter(Boolean).join(", "))}</div>` : ""}</div>
    </div>
    <h2>Détail des prestations</h2>
    ${lignes.length ? `<table><thead><tr><th>Date</th><th>Événement</th><th>Poste</th><th class="n">Heures</th><th class="n">Taux</th><th class="n">Montant</th></tr></thead><tbody>
      ${lignes.map((l) => `<tr><td>${dateFr(l.date)}</td><td>${esc(l.evenement ?? "")}${l.numero ? `<div style="color:#999;font-size:10px">${esc(l.numero)}</div>` : ""}</td><td>${esc(l.poste ?? "")}</td><td class="n">${l.heures}</td><td class="n">${mad(l.taux)}</td><td class="n">${mad(l.montant)}</td></tr>`).join("")}
    </tbody></table>` : `<p>${f.heures_travaillees ?? 0} heures travaillées sur la période.</p>`}
    <div class="recap insecable">
      <div><span>Heures travaillées</span><span>${f.heures_travaillees ?? 0} h</span></div>
      <div><span>Salaire brut</span><span>${mad(f.salaire_brut)}</span></div>
      ${Number(f.prime) ? `<div><span>Prime</span><span>+ ${mad(f.prime)}</span></div>` : ""}
      <div><span>CNSS salarié (4,48 %)</span><span>- ${mad(f.cnss)}</span></div>
      <div><span>AMO salarié (2,26 %)</span><span>- ${mad(f.amo)}</span></div>
      ${Number(f.deductions) > Number(f.cnss || 0) + Number(f.amo || 0) + 0.01 ? `<div><span>Autres retenues</span><span>- ${mad(Number(f.deductions) - Number(f.cnss || 0) - Number(f.amo || 0))}</span></div>` : ""}
      <div class="net"><span>NET À PAYER</span><span>${mad(f.salaire_net)}</span></div>
      ${(f.paiements_paie ?? []).length ? `<div><span>Payé${(f.paiements_paie as any[]).filter((p) => Number(p.montant) > 0).map((p) => ` le ${dateFr(p.date_paiement)} (${esc(MODES[p.mode] ?? p.mode)})`).join(",")}</span><span>${mad(totalPaye(f.paiements_paie))}</span></div>` : ""}
    </div>
    <div class="insecable" style="display:flex;justify-content:space-between;align-items:flex-end;gap:20px;margin-top:18px">
      <p style="color:#888;font-size:10px;margin:0">Bulletin établi à Rabat le ${dateFr(new Date().toISOString().slice(0, 10))}.<br>À conserver sans limitation de durée.</p>
      <div style="min-width:200px"><div style="font-size:10px;color:#777">Pour l'employeur</div>${e.definitif ? signatureEmployeurHtml(48) : `<div style="font-size:10px;color:#b45309;margin-top:8px">Signature apposée à la validation</div>`}</div>
    </div>
  </div>
  ${piedAgence(agence)}
</div>`;
}

export async function telechargerFichesPaie(ids: string[]) {
  const [{ data, error }, { data: agence }] = await Promise.all([
    supabase.from("fiches_paie").select("*, staff(*), paiements_paie(montant, date_paiement, mode)").in("id", ids),
    supabase.from("parametres_agence").select("*").eq("id", 1).maybeSingle(),
  ]);
  if (error) throw error;
  const liste = (data ?? []) as any[];
  liste.sort((a, b) => `${a.staff?.nom}${a.staff?.prenom}`.localeCompare(`${b.staff?.nom}${b.staff?.prenom}`));
  const f0 = liste[0];
  const nom = liste.length === 1
    ? nomFichier("Fiche-de-paie", f0.staff?.prenom, f0.staff?.nom, `${f0.annee}-${String(f0.mois).padStart(2, "0")}`)
    : nomFichier("Fiches-de-paie", `${f0.annee}-${String(f0.mois).padStart(2, "0")}`);
  await telechargerPdf(liste.map((f) => pagePaie(f, agence)), cssPaie, nom);
}

export default function FichesPaieMensuelles() {
  const { toast } = useToast();
  const maintenant = new Date();
  const [periode, setPeriode] = useState(`${maintenant.getFullYear()}-${maintenant.getMonth() + 1}`);
  const [fiches, setFiches] = useState<any[]>([]);
  const [enCours, setEnCours] = useState(false);
  const [agence, setAgence] = useState<{ cnss_affiliation_employeur?: string | null } | null>(null);
  const [doublons, setDoublons] = useState<any[][]>([]);
  const [fichePaiement, setFichePaiement] = useState<any | null>(null);
  const [annee, mois] = periode.split("-").map(Number);

  const periodes = Array.from({ length: 13 }, (_, i) => { const d = new Date(maintenant.getFullYear(), maintenant.getMonth() - 6 + i, 1); return `${d.getFullYear()}-${d.getMonth() + 1}`; });

  const charger = useCallback(async () => {
    const [{ data }, { data: ag }, { data: equipe }] = await Promise.all([
      supabase.from("fiches_paie").select("*, staff(nom, prenom, numero_securite_sociale), paiements_paie(montant, date_paiement, mode)").eq("annee", annee).eq("mois", mois),
      supabase.from("parametres_agence").select("*").eq("id", 1).maybeSingle(),
      supabase.from("staff").select("id, prenom, nom, numero_securite_sociale").not("numero_securite_sociale", "is", null),
    ]);
    setFiches(((data ?? []) as any[]).sort((a, b) => `${a.staff?.nom}`.localeCompare(`${b.staff?.nom}`)));
    setAgence((ag as any) ?? null);
    setDoublons(doublonsCnss((equipe ?? []) as any[]));
  }, [annee, mois]);
  useEffect(() => { charger(); }, [charger]);

  /**
   * Retire les fiches calculées automatiquement, encore « en attente », dont toutes les missions du mois
   * ont été supprimées. Une fiche validée, payée ou saisie à la main n'est jamais touchée.
   */
  const retirerFichesSansMission = async (): Promise<number> => {
    const debut = `${annee}-${String(mois).padStart(2, "0")}-01`;
    const fin = new Date(Date.UTC(annee, mois, 0)).toISOString().slice(0, 10);
    const [{ data: fichesMois }, { data: aff }, { data: manuels }] = await Promise.all([
      supabase.from("fiches_paie").select("id, staff_id").eq("annee", annee).eq("mois", mois).eq("statut", "en_attente").eq("generee_auto", true),
      supabase.from("affectations").select("staff_id").eq("statut", "confirme").not("devis_id", "is", null).gte("date_jour", debut).lte("date_jour", fin),
      supabase.from("contrats").select("staff_id, dates").is("devis_id", null).neq("statut", "annule"),
    ]);
    const avecTravail = new Set<string>((aff ?? []).map((a: any) => a.staff_id));
    (manuels ?? []).forEach((c: any) => {
      if (((c.dates ?? []) as any[]).some((d) => d?.date >= debut && d?.date <= fin && Number(d?.heures) > 0)) avecTravail.add(c.staff_id);
    });
    const orphelines = (fichesMois ?? []).filter((f: any) => !avecTravail.has(f.staff_id)).map((f: any) => f.id);
    if (!orphelines.length) return 0;
    const { error } = await supabase.from("fiches_paie").delete().in("id", orphelines);
    return error ? 0 : orphelines.length;
  };

  const generer = async () => {
    setEnCours(true);
    const { data, error } = await supabase.rpc("generer_fiches_paie" as any, { p_annee: annee, p_mois: mois });
    const retirees = error ? 0 : await retirerFichesSansMission();
    setEnCours(false);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Fiches à jour", description: `${data ?? 0} fiche(s) calculée(s) à partir des événements du mois${retirees ? ` · ${retirees} fiche(s) sans mission retirée(s)` : ""}` });
    charger();
  };

  const changerStatut = async (id: string, statut: string) => {
    const f = fiches.find((x) => x.id === id);
    const manques = manquesBulletin(agence, f?.staff);
    // Seule la VALIDATION est bloquée. Un paiement réellement effectué doit toujours pouvoir être enregistré ;
    // le PDF d'un bulletin incomplet reste un « aperçu incomplet » même s'il est marqué payé.
    if (statut === "valide" && manques.length) {
      toast({ title: "Bulletin incomplet", description: `Impossible de le valider : il manque ${manques.join(" et ")}. Un paiement déjà effectué peut tout de même être enregistré (bouton « Paiement »).`, variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("fiches_paie").update({ statut }).eq("id", id);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    charger();
  };

  const telecharger = async (ids: string[]) => {
    if (!ids.length) return;
    setEnCours(true);
    try { await telechargerFichesPaie(ids); } catch (e) { console.error(e); toast({ title: "Erreur", description: "PDF non créé", variant: "destructive" }); }
    finally { setEnCours(false); }
  };

  const total = fiches.reduce((t, f) => t + Number(f.salaire_net || 0), 0);

  return (
    <Card>
      <CardHeader className="space-y-3">
        <CardTitle className="text-base">Fiches de paie du mois</CardTitle>
        <p className="text-sm text-muted-foreground">
          Calculées automatiquement le dernier jour de chaque mois à partir des affectations confirmées (heures × taux). Tu peux aussi les recalculer à tout moment tant qu'elles sont « À valider ».
        </p>
        <div className="flex flex-wrap gap-2 items-center">
          <Select value={periode} onValueChange={setPeriode}>
            <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
            <SelectContent>{periodes.map((p) => { const [a, m] = p.split("-").map(Number); return <SelectItem key={p} value={p}>{MOIS[m - 1]} {a}</SelectItem>; })}</SelectContent>
          </Select>
          <Button variant="outline" disabled={enCours} onClick={generer}><RefreshCw className="h-4 w-4 mr-1" /> Calculer le mois</Button>
          <Button disabled={enCours || !fiches.length} onClick={() => telecharger(fiches.map((f) => f.id))}><Download className="h-4 w-4 mr-1" /> Toutes les fiches (PDF)</Button>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto space-y-3">
        {!String(agence?.cnss_affiliation_employeur ?? "").trim() && (
          <div className="flex gap-2 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900" data-testid="alerte-cnss-employeur">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>N° d'affiliation CNSS de l'employeur non renseigné (Devis → Infos agence). Les PDF sont des aperçus incomplets et aucun bulletin ne peut être validé. Un paiement réellement effectué peut toujours être enregistré (bouton « Paiement »).</span>
          </div>
        )}
        {doublons.map((g) => (
          <div key={g.map((p) => p.id).join()} className="flex gap-2 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-900" data-testid="alerte-cnss-doublon">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>Même N° CNSS saisi pour {g.map((p) => `${p.prenom ?? ""} ${p.nom ?? ""}`.trim()).join(", ")} : à vérifier.</span>
          </div>
        ))}
        {fiches.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">Aucune fiche pour {MOIS[mois - 1]} {annee}.</p>
        ) : (
          <Table>
            <TableHeader><TableRow>
              <TableHead>Personne</TableHead><TableHead className="text-right">Heures</TableHead><TableHead className="text-right">Brut</TableHead>
              <TableHead className="text-right">Net</TableHead><TableHead className="text-right">Payé</TableHead><TableHead>Statut</TableHead><TableHead />
            </TableRow></TableHeader>
            <TableBody>
              {fiches.map((f) => (
                <TableRow key={f.id}>
                  <TableCell>{f.staff?.prenom} {f.staff?.nom}{f.generee_auto && <span className="ml-2 text-xs text-muted-foreground">auto</span>}
                    {!String(f.staff?.numero_securite_sociale ?? "").trim() && <span className="ml-2 text-xs text-amber-700" data-testid="cnss-salarie-manquant">N° CNSS manquant</span>}</TableCell>
                  <TableCell className="text-right">{f.heures_travaillees ?? 0}</TableCell>
                  <TableCell className="text-right whitespace-nowrap">{mad(f.salaire_brut)}</TableCell>
                  <TableCell className="text-right whitespace-nowrap font-medium">{mad(f.salaire_net)}</TableCell>
                  <TableCell className="text-right whitespace-nowrap">
                    <Button size="sm" variant="ghost" className="h-8 px-2" onClick={() => setFichePaiement(f)} data-testid="bouton-paiement">
                      <Banknote className="h-4 w-4 mr-1" />{(f.paiements_paie ?? []).length ? mad(totalPaye(f.paiements_paie)) : "Paiement"}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Select value={f.statut} onValueChange={(v) => changerStatut(f.id, v)}>
                      <SelectTrigger className="h-8 w-[120px] border-0 p-0 shadow-none"><Badge className={STATUTS[f.statut]?.className}>{STATUTS[f.statut]?.label ?? f.statut}</Badge></SelectTrigger>
                      <SelectContent>{Object.entries(STATUTS).filter(([k]) => k !== "paye" || f.statut === "paye").map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}</SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right"><Button size="icon" variant="ghost" disabled={enCours} onClick={() => telecharger([f.id])}><Download className="h-4 w-4" /></Button></TableCell>
                </TableRow>
              ))}
              <TableRow><TableCell colSpan={3} className="font-medium">Total net du mois</TableCell><TableCell className="text-right font-bold whitespace-nowrap">{mad(total)}</TableCell><TableCell className="text-right whitespace-nowrap">{mad(fiches.reduce((t, f) => t + totalPaye(f.paiements_paie), 0))}</TableCell><TableCell colSpan={2} /></TableRow>
            </TableBody>
          </Table>
        )}
      </CardContent>
      <PaiementsPaie fiche={fichePaiement} onClose={() => setFichePaiement(null)} onSaved={charger} />
    </Card>
  );
}
