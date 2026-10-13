import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, RefreshCw } from "lucide-react";
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
`;

function pagePaie(f: any, agence: InfosAgence | null) {
  const s = f.staff ?? {};
  const lignes: any[] = f.details ?? [];
  const periode = `${MOIS[f.mois - 1]} ${f.annee}`;
  return `<div class="doc-heavent">
  ${enteteDoc(logo, "BULLETIN DE PAIE", `Période : ${esc(periode)}`)}
  <div class="corps">
    <div class="ident">
      <div class="bloc"><div class="etiquette">Employeur</div><div class="nom">${esc(agence?.raison_sociale ?? "Heavent People Agency")}</div>
        <div>${esc([agence?.adresse, agence?.ville].filter(Boolean).join(", "))}</div>
        <div>${[agence?.rc && `RC ${esc(agence.rc)}`, agence?.ice && `ICE ${esc(agence.ice)}`].filter(Boolean).join(" · ")}</div></div>
      <div class="cadre"><div class="etiquette">Salarié(e)</div><div class="nom">${esc(s.prenom)} ${esc(s.nom)}</div>
        ${s.numero_identite ? `<div>CIN : ${esc(s.numero_identite)}</div>` : ""}
        ${s.numero_securite_sociale ? `<div>CNSS : ${esc(s.numero_securite_sociale)}</div>` : ""}
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
    </div>
    <p style="margin-top:18px;color:#888;font-size:10px">Bulletin établi le ${dateFr(new Date().toISOString().slice(0, 10))}. À conserver sans limitation de durée.</p>
  </div>
  ${piedAgence(agence)}
</div>`;
}

export async function telechargerFichesPaie(ids: string[]) {
  const [{ data, error }, { data: agence }] = await Promise.all([
    supabase.from("fiches_paie").select("*, staff(*)").in("id", ids),
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
  const [annee, mois] = periode.split("-").map(Number);

  const periodes = Array.from({ length: 13 }, (_, i) => { const d = new Date(maintenant.getFullYear(), maintenant.getMonth() - 6 + i, 1); return `${d.getFullYear()}-${d.getMonth() + 1}`; });

  const charger = useCallback(async () => {
    const { data } = await supabase.from("fiches_paie").select("*, staff(nom, prenom)").eq("annee", annee).eq("mois", mois);
    setFiches(((data ?? []) as any[]).sort((a, b) => `${a.staff?.nom}`.localeCompare(`${b.staff?.nom}`)));
  }, [annee, mois]);
  useEffect(() => { charger(); }, [charger]);

  const generer = async () => {
    setEnCours(true);
    const { data, error } = await supabase.rpc("generer_fiches_paie" as any, { p_annee: annee, p_mois: mois });
    setEnCours(false);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Fiches à jour", description: `${data ?? 0} fiche(s) calculée(s) à partir des événements du mois` });
    charger();
  };

  const changerStatut = async (id: string, statut: string) => {
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
      <CardContent className="overflow-x-auto">
        {fiches.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">Aucune fiche pour {MOIS[mois - 1]} {annee}.</p>
        ) : (
          <Table>
            <TableHeader><TableRow>
              <TableHead>Personne</TableHead><TableHead className="text-right">Heures</TableHead><TableHead className="text-right">Brut</TableHead>
              <TableHead className="text-right">Net</TableHead><TableHead>Statut</TableHead><TableHead />
            </TableRow></TableHeader>
            <TableBody>
              {fiches.map((f) => (
                <TableRow key={f.id}>
                  <TableCell>{f.staff?.prenom} {f.staff?.nom}{f.generee_auto && <span className="ml-2 text-xs text-muted-foreground">auto</span>}</TableCell>
                  <TableCell className="text-right">{f.heures_travaillees ?? 0}</TableCell>
                  <TableCell className="text-right whitespace-nowrap">{mad(f.salaire_brut)}</TableCell>
                  <TableCell className="text-right whitespace-nowrap font-medium">{mad(f.salaire_net)}</TableCell>
                  <TableCell>
                    <Select value={f.statut} onValueChange={(v) => changerStatut(f.id, v)}>
                      <SelectTrigger className="h-8 w-[120px] border-0 p-0 shadow-none"><Badge className={STATUTS[f.statut]?.className}>{STATUTS[f.statut]?.label ?? f.statut}</Badge></SelectTrigger>
                      <SelectContent>{Object.entries(STATUTS).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}</SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right"><Button size="icon" variant="ghost" disabled={enCours} onClick={() => telecharger([f.id])}><Download className="h-4 w-4" /></Button></TableCell>
                </TableRow>
              ))}
              <TableRow><TableCell colSpan={3} className="font-medium">Total net du mois</TableCell><TableCell className="text-right font-bold whitespace-nowrap">{mad(total)}</TableCell><TableCell colSpan={2} /></TableRow>
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
