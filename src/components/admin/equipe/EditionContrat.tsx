import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { dureeHeures } from "./EquipeEvenement";
import { mad } from "@/lib/pdf";

interface LigneDate { date: string; heure_debut: string; heure_fin: string; heures: string }
interface StaffMini { id: string; nom: string; prenom: string; taux_horaire: number | null }

const iso = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const ligneVide = (date = iso()): LigneDate => ({ date, heure_debut: "", heure_fin: "", heures: "8" });

interface Props {
  /** null = fermé ; "nouveau" = création ; sinon l'identifiant du contrat à modifier */
  contratId: string | null;
  onClose: () => void;
  onSaved: () => void;
}

/** Création / modification d'un contrat à la main (dates, horaires, heures, taux). */
export default function EditionContrat({ contratId, onClose, onSaved }: Props) {
  const { toast } = useToast();
  const [staff, setStaff] = useState<StaffMini[]>([]);
  const [f, setF] = useState({ staff_id: "", titre: "Hôte / hôtesse d'accueil", evenement: "", lieu: "", type_contrat: "cdd", taux_horaire: "60", description: "", statut: "actif" });
  const [lignes, setLignes] = useState<LigneDate[]>([ligneVide()]);
  const [enCours, setEnCours] = useState(false);

  useEffect(() => {
    if (!contratId) return;
    supabase.from("staff").select("id, nom, prenom, taux_horaire").eq("banni", false).order("nom").then(({ data }) => setStaff((data ?? []) as StaffMini[]));
    if (contratId === "nouveau") {
      setF({ staff_id: "", titre: "Hôte / hôtesse d'accueil", evenement: "", lieu: "", type_contrat: "cdd", taux_horaire: "60", description: "", statut: "actif" });
      setLignes([ligneVide()]);
      return;
    }
    supabase.from("contrats").select("*").eq("id", contratId).single().then(({ data: c }) => {
      if (!c) return;
      setF({
        staff_id: c.staff_id, titre: c.titre ?? "", evenement: c.evenement ?? "", lieu: c.lieu ?? "", type_contrat: c.type_contrat ?? "cdd",
        taux_horaire: String(c.taux_horaire ?? 60), description: c.description ?? "", statut: c.statut ?? "actif",
      });
      const dates = Array.isArray(c.dates) ? (c.dates as any[]) : [];
      setLignes(dates.length
        ? dates.map((d) => ({ date: d.date, heure_debut: d.heure_debut?.slice(0, 5) ?? "", heure_fin: d.heure_fin?.slice(0, 5) ?? "", heures: String(d.heures ?? "") }))
        : [{ date: c.date_debut, heure_debut: "", heure_fin: "", heures: String(c.heures_prestations ?? c.total_heures ?? 8) }]);
    });
  }, [contratId]);

  const totalHeures = useMemo(() => lignes.reduce((t, l) => t + (Number(l.heures) || 0), 0), [lignes]);
  const brut = Math.round(totalHeures * (Number(f.taux_horaire) || 0) * 100) / 100;

  const majLigne = (i: number, patch: Partial<LigneDate>) => setLignes((ls) => ls.map((l, j) => {
    if (j !== i) return l;
    const n = { ...l, ...patch };
    // Horaires renseignés → heures calculées automatiquement (16:00 → 00:00 = 8 h)
    if ((patch.heure_debut !== undefined || patch.heure_fin !== undefined) && n.heure_debut && n.heure_fin) n.heures = String(dureeHeures(n.heure_debut, n.heure_fin));
    return n;
  }));

  const choisirStaff = (id: string) => {
    const s = staff.find((x) => x.id === id);
    setF((x) => ({ ...x, staff_id: id, taux_horaire: contratId === "nouveau" && s?.taux_horaire ? String(s.taux_horaire) : x.taux_horaire }));
  };

  const enregistrer = async () => {
    const ok = lignes.filter((l) => l.date && Number(l.heures) > 0).sort((a, b) => a.date.localeCompare(b.date));
    if (!f.staff_id) { toast({ title: "Choisis la personne", variant: "destructive" }); return; }
    if (!ok.length) { toast({ title: "Ajoute au moins une date avec des heures", variant: "destructive" }); return; }
    setEnCours(true);
    const taux = Number(f.taux_horaire) || 0;
    const contrat = {
      staff_id: f.staff_id, titre: f.titre.trim() || "Mission", type_contrat: f.type_contrat, statut: f.statut,
      evenement: f.evenement.trim() || null, lieu: f.lieu.trim() || null, description: f.description.trim() || null,
      date_debut: ok[0].date, date_fin: ok[ok.length - 1].date,
      dates: ok.map((l) => ({ date: l.date, heures: Number(l.heures), heure_debut: l.heure_debut || null, heure_fin: l.heure_fin || null })),
      total_heures: totalHeures, heures_prestations: Math.round(totalHeures), taux_horaire: taux, salaire_brut: brut,
    };
    const { error } = contratId === "nouveau"
      ? await supabase.from("contrats").insert(contrat)
      : await supabase.from("contrats").update(contrat).eq("id", contratId!);
    setEnCours(false);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    toast({ title: contratId === "nouveau" ? "Contrat créé" : "Contrat modifié", description: `${totalHeures} h · ${mad(brut)} brut — visible dans l'espace staff, compté dans la fiche de paie du mois` });
    onSaved(); onClose();
  };

  return (
    <Dialog open={!!contratId} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{contratId === "nouveau" ? "Nouveau contrat" : "Modifier le contrat"}</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label className="text-xs">Personne</Label>
              <Select value={f.staff_id} onValueChange={choisirStaff}>
                <SelectTrigger><SelectValue placeholder="Choisir…" /></SelectTrigger>
                <SelectContent>{staff.map((s) => <SelectItem key={s.id} value={s.id}>{s.prenom} {s.nom}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label className="text-xs">Poste</Label><Input value={f.titre} onChange={(e) => setF({ ...f, titre: e.target.value })} placeholder="Hôtesse, steward…" /></div>
            <div><Label className="text-xs">Événement</Label><Input value={f.evenement} onChange={(e) => setF({ ...f, evenement: e.target.value })} placeholder="ex. Salon de l'Auto Casablanca" /></div>
            <div><Label className="text-xs">Lieu</Label><Input value={f.lieu} onChange={(e) => setF({ ...f, lieu: e.target.value })} placeholder="ex. Casablanca" /></div>
          </div>

          <div>
            <Label className="text-xs">Dates, horaires et heures</Label>
            <div className="space-y-2 mt-1">
              {lignes.map((l, i) => (
                <div key={i} className="grid grid-cols-[1fr_auto_auto_auto_auto] sm:grid-cols-[160px_110px_110px_90px_auto] gap-2 items-center">
                  <Input type="date" value={l.date} onChange={(e) => majLigne(i, { date: e.target.value })} className="col-span-5 sm:col-span-1" />
                  <Input type="time" value={l.heure_debut} onChange={(e) => majLigne(i, { heure_debut: e.target.value })} title="Début" />
                  <Input type="time" value={l.heure_fin} onChange={(e) => majLigne(i, { heure_fin: e.target.value })} title="Fin" />
                  <div className="flex items-center gap-1 text-xs"><Input type="number" min={0} step="0.5" value={l.heures} onChange={(e) => majLigne(i, { heures: e.target.value })} className="w-20" /> h</div>
                  <Button size="icon" variant="ghost" disabled={lignes.length === 1} onClick={() => setLignes((ls) => ls.filter((_, j) => j !== i))} title="Retirer cette date"><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
              <Button size="sm" variant="outline" onClick={() => {
                const der = lignes[lignes.length - 1]; const d = new Date((der?.date || iso()) + "T12:00:00"); d.setDate(d.getDate() + 1);
                setLignes((ls) => [...ls, { ...ligneVide(iso(d)), heure_debut: der?.heure_debut ?? "", heure_fin: der?.heure_fin ?? "", heures: der?.heures ?? "8" }]);
              }}><Plus className="h-4 w-4 mr-1" /> Ajouter une date</Button>
              <p className="text-xs text-muted-foreground">Les heures se calculent seules quand tu indiques le début et la fin ; tu peux aussi les taper directement.</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 items-end">
            <div><Label className="text-xs">Taux horaire payé (MAD/h)</Label><Input type="number" min={0} step="1" value={f.taux_horaire} onChange={(e) => setF({ ...f, taux_horaire: e.target.value })} /></div>
            <div>
              <Label className="text-xs">Statut</Label>
              <Select value={f.statut} onValueChange={(v) => setF({ ...f, statut: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="actif">Actif</SelectItem><SelectItem value="termine">Terminé</SelectItem><SelectItem value="annule">Annulé (non payé)</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="rounded-md bg-[#FAF7EE] border border-[#ece6d3] p-2 text-sm">
              <div className="text-xs text-muted-foreground">Total</div>
              <div className="font-semibold">{totalHeures} h · {mad(brut)} brut</div>
            </div>
          </div>
          <div><Label className="text-xs">Remarques (optionnel)</Label><Textarea rows={2} value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} /></div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>Annuler</Button>
            <Button onClick={enregistrer} disabled={enCours}>{enCours ? "Enregistrement…" : "Enregistrer"}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
