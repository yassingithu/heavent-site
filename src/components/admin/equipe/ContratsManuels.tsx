import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Pencil, Plus, Trash2 } from "lucide-react";
import { dateFr, mad } from "@/lib/pdf";
import { BADGE_SIGNATURE, etatSignature } from "@/lib/signature";
import { telechargerContrats } from "./contratPdf";
import EditionContrat from "./EditionContrat";

/** Contrats créés à la main (hors devis) : création, modification, suppression, PDF. */
export default function ContratsManuels() {
  const { toast } = useToast();
  const [contrats, setContrats] = useState<any[]>([]);
  const [edition, setEdition] = useState<string | null>(null);
  const [enCours, setEnCours] = useState(false);

  const charger = () =>
    supabase.from("contrats").select("id, titre, evenement, lieu, statut, date_debut, date_fin, total_heures, heures_prestations, salaire_brut, taux_horaire, dates, signe_le, staff(nom, prenom)")
      .is("devis_id", null).order("date_debut", { ascending: false })
      .then(({ data }) => setContrats(data ?? []));
  useEffect(() => { charger(); }, []);

  const supprimer = async (c: any) => {
    if (!window.confirm(`Supprimer le contrat de ${c.staff?.prenom ?? ""} ${c.staff?.nom ?? ""} (${c.evenement || c.titre}) ? Il disparaîtra aussi de son espace staff.`)) return;
    const { error } = await supabase.from("contrats").delete().eq("id", c.id);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Contrat supprimé", description: "Pense à recalculer les fiches de paie du mois concerné (onglet Paie)." });
    charger();
  };

  const telecharger = async (id: string) => {
    setEnCours(true);
    try { await telechargerContrats([id]); } catch (e) { console.error(e); toast({ title: "Erreur", description: "PDF non créé", variant: "destructive" }); }
    finally { setEnCours(false); }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2 space-y-0">
        <div>
          <CardTitle className="text-base">Contrats créés à la main</CardTitle>
          <p className="text-sm text-muted-foreground">Pour une mission sans devis. Ils apparaissent dans l'espace du crew et comptent dans sa fiche de paie.</p>
        </div>
        <Button onClick={() => setEdition("nouveau")}><Plus className="h-4 w-4 mr-1" /> Nouveau contrat</Button>
      </CardHeader>
      <CardContent>
        {contrats.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aucun contrat créé à la main.</p>
        ) : (
          <div className="divide-y">
            {contrats.map((c) => {
              const heures = c.total_heures ?? c.heures_prestations;
              return (
                <div key={c.id} className="flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
                  <div className="min-w-0">
                    <div className="font-medium">
                      {c.staff?.prenom} {c.staff?.nom} <span className="text-muted-foreground font-normal">· {c.titre}</span>
                      {c.statut === "termine" && <Badge variant="secondary" className="ml-2">Terminé</Badge>}
                      {(() => { const b = BADGE_SIGNATURE[etatSignature(c)]; return <span className={`ml-2 text-[11px] font-medium rounded-full px-2 py-0.5 ${b.classe}`}>{b.texte}</span>; })()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {c.evenement ? `${c.evenement} · ` : ""}{dateFr(c.date_debut)}{c.date_fin && c.date_fin !== c.date_debut ? ` → ${dateFr(c.date_fin)}` : ""}
                      {" · "}{(c.dates ?? []).length || 1} date(s) · {heures != null ? `${heures} h` : "heures non indiquées"} · {mad(c.salaire_brut)}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" onClick={() => setEdition(c.id)}><Pencil className="h-4 w-4 mr-1" /> Modifier</Button>
                    <Button size="icon" variant="ghost" title="Contrat PDF" disabled={enCours} onClick={() => telecharger(c.id)}><Download className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" title="Supprimer" className="text-red-600 hover:text-red-700" onClick={() => supprimer(c)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
      <EditionContrat contratId={edition} onClose={() => setEdition(null)} onSaved={charger} />
    </Card>
  );
}
