import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Pencil, Trash2 } from "lucide-react";
import { ouvrirDevis } from "@/components/admin/devis/DevisParStatut";
import { dateFr, mad } from "@/lib/pdf";
import { BADGE_SIGNATURE, dateHeureFr, etatSignature } from "@/lib/signature";
import { telechargerContrats } from "./contratPdf";

/** Contrats générés depuis les devis, regroupés par événement. */
export default function ContratsEvenements() {
  const { toast } = useToast();
  const [contrats, setContrats] = useState<any[]>([]);
  const [enCours, setEnCours] = useState(false);

  const charger = () =>
    supabase.from("contrats").select("id, titre, date_debut, date_fin, total_heures, salaire_brut, dates, statut, signe_le, signature_nom, devis_id, staff_id, staff(nom, prenom), devis(numero, titre, date_evenement)")
      .not("devis_id", "is", null).order("date_debut", { ascending: false })
      .then(({ data }) => setContrats(data ?? []));
  useEffect(() => { charger(); }, []);

  // Supprime la personne de l'équipe de cet événement (sinon le contrat serait recréé) puis le contrat
  const supprimer = async (c: any) => {
    if (!window.confirm(`Retirer ${c.staff?.prenom ?? ""} ${c.staff?.nom ?? ""} de l'événement « ${c.devis?.titre ?? ""} » et supprimer son contrat ?`)) return;
    const a = await supabase.from("affectations").delete().eq("devis_id", c.devis_id).eq("staff_id", c.staff_id);
    const r = a.error ? a : await supabase.from("contrats").delete().eq("id", c.id);
    if (r.error) { toast({ title: "Erreur", description: r.error.message, variant: "destructive" }); return; }
    toast({ title: "Contrat supprimé", description: "La personne est retirée de l'équipe. Pense à recalculer la paie du mois si elle était déjà calculée." });
    charger();
  };

  const groupes = contrats.reduce<Record<string, any[]>>((acc, c) => { (acc[c.devis_id] ??= []).push(c); return acc; }, {});

  const telecharger = async (ids: string[]) => {
    setEnCours(true);
    try { await telechargerContrats(ids); } catch (e) { console.error(e); toast({ title: "Erreur", description: "PDF non créé", variant: "destructive" }); }
    finally { setEnCours(false); }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Contrats par événement</CardTitle>
        <p className="text-sm text-muted-foreground">Ils se créent depuis un devis, rubrique « Équipe de l'événement » : un contrat par personne et par événement, avec toutes ses dates. Le crayon ouvre le devis pour changer les dates, horaires ou heures.</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {Object.keys(groupes).length === 0 && <p className="text-sm text-muted-foreground">Aucun contrat d'événement pour l'instant.</p>}
        {Object.entries(groupes).map(([devisId, liste]) => (
          <div key={devisId} className="border rounded-md p-3">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div>
                <div className="font-medium">{liste[0].devis?.titre || "Événement"} <span className="text-xs text-muted-foreground font-mono">{liste[0].devis?.numero}</span></div>
                <div className="text-xs text-muted-foreground">{liste.length} contrat(s) · <span className="text-emerald-800 font-medium">{liste.filter((c) => c.signe_le).length}/{liste.length} signé(s)</span></div>
              </div>
              <Button size="sm" disabled={enCours} onClick={() => telecharger(liste.map((c) => c.id))}><Download className="h-4 w-4 mr-1" /> Tous (PDF)</Button>
            </div>
            <div className="divide-y">
              {liste.map((c) => (
                <div key={c.id} className="flex items-center justify-between gap-2 py-1.5 text-sm">
                  <div>{c.staff?.prenom} {c.staff?.nom} {(() => { const b = BADGE_SIGNATURE[etatSignature(c)]; return <span className={`text-[11px] font-medium rounded-full px-2 py-0.5 ${b.classe}`}>{b.texte}</span>; })()} <span className="text-muted-foreground">· {(c.dates ?? []).length} date(s) · {dateFr(c.date_debut)}{c.date_fin && c.date_fin !== c.date_debut ? ` → ${dateFr(c.date_fin)}` : ""} · {c.total_heures} h · {mad(c.salaire_brut)}</span>
                    {c.signe_le && <div className="text-xs text-emerald-800">Signé le {dateHeureFr(c.signe_le)}{c.signature_nom ? ` par ${c.signature_nom}` : ""} · contresigné par l'employeur</div>}</div>
                  <div className="flex gap-1 shrink-0">
                    <Button size="icon" variant="ghost" title="Modifier les dates, horaires et heures (dans le devis)" onClick={() => ouvrirDevis(c.devis_id)}><Pencil className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" title="Contrat PDF" disabled={enCours} onClick={() => telecharger([c.id])}><Download className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" title="Supprimer" className="text-red-600 hover:text-red-700" onClick={() => supprimer(c)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
