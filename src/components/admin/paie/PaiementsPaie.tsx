import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { dateFr, mad } from "@/lib/pdf";

export interface PaiementPaie {
  id: string; fiche_id: string; montant: number; date_paiement: string; mode: string;
  reference?: string | null; note?: string | null; corrige_paiement?: string | null; enregistre_par?: string; enregistre_le?: string;
}
export const MODES: Record<string, string> = { virement: "Virement", especes: "Espèces", cheque: "Chèque", autre: "Autre" };
export const totalPaye = (p: PaiementPaie[] | null | undefined) => Math.round((p ?? []).reduce((t, x) => t + Number(x.montant || 0), 0) * 100) / 100;
/** Date du jour au Maroc (le paiement est une date civile marocaine, pas un instant UTC). */
export const aujourdhuiCasablanca = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Casablanca" }).format(new Date());

/**
 * Registre des paiements d'un bulletin : enregistrer un paiement réellement effectué (ou une correction),
 * sans jamais modifier la validation du bulletin. Les lignes ne se modifient ni ne se suppriment.
 */
export default function PaiementsPaie({ fiche, onClose, onSaved }: { fiche: any | null; onClose: () => void; onSaved: () => void }) {
  const { toast } = useToast();
  const [lignes, setLignes] = useState<PaiementPaie[]>([]);
  const [f, setF] = useState({ montant: "", date: aujourdhuiCasablanca(), mode: "virement", reference: "", note: "", corrige: "" });
  const [enCours, setEnCours] = useState(false);

  const charger = async () => {
    if (!fiche) return;
    const { data } = await supabase.from("paiements_paie" as any).select("*").eq("fiche_id", fiche.id).order("enregistre_le");
    const l = (data ?? []) as unknown as PaiementPaie[];
    setLignes(l);
    const reste = Math.round((Number(fiche.salaire_net || 0) - totalPaye(l)) * 100) / 100;
    setF({ montant: reste > 0 ? String(reste) : "", date: aujourdhuiCasablanca(), mode: "virement", reference: "", note: "", corrige: "" });
  };
  useEffect(() => { charger(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [fiche?.id]);

  const corriger = (p: PaiementPaie) => setF({ montant: String(-Number(p.montant)), date: aujourdhuiCasablanca(), mode: p.mode, reference: "", note: "", corrige: p.id });

  const enregistrer = async () => {
    const montant = Number(String(f.montant).replace(",", "."));
    if (!montant || Number.isNaN(montant)) { toast({ title: "Montant manquant", variant: "destructive" }); return; }
    if (montant < 0 && (!f.corrige || !f.note.trim())) { toast({ title: "Correction incomplète", description: "Une correction doit viser un paiement et indiquer un motif.", variant: "destructive" }); return; }
    setEnCours(true);
    const { error } = await supabase.from("paiements_paie" as any).insert({
      fiche_id: fiche.id, montant, date_paiement: f.date, mode: f.mode,
      reference: f.reference.trim() || null, note: f.note.trim() || null, corrige_paiement: f.corrige || null,
    } as any);
    setEnCours(false);
    if (error) { toast({ title: "Paiement non enregistré", description: error.message, variant: "destructive" }); return; }
    toast({ title: montant < 0 ? "Correction enregistrée" : "Paiement enregistré", description: `${mad(Math.abs(montant))} le ${dateFr(f.date)} — le statut du bulletin n'a pas changé.` });
    await charger(); onSaved();
  };

  const total = totalPaye(lignes);
  return (
    <Dialog open={!!fiche} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>Paiements — {fiche?.staff?.prenom} {fiche?.staff?.nom}</DialogTitle></DialogHeader>
        {fiche && (
          <div className="space-y-4" data-testid="dialogue-paiements">
            <p className="text-sm text-muted-foreground">
              Net du bulletin : <b className="text-foreground">{mad(fiche.salaire_net)}</b> · Déjà payé : <b className="text-foreground" data-testid="total-paye">{mad(total)}</b>.
              Enregistrer un paiement ne valide pas le bulletin.
            </p>
            {lignes.length > 0 && (
              <ul className="text-sm divide-y rounded-md border">
                {lignes.map((p) => (
                  <li key={p.id} className="flex items-start justify-between gap-2 p-2">
                    <span>
                      <b className={Number(p.montant) < 0 ? "text-red-700" : ""}>{mad(p.montant)}</b> le {dateFr(p.date_paiement)} · {MODES[p.mode] ?? p.mode}
                      {p.reference ? ` · réf. ${p.reference}` : ""}{p.note ? ` · ${p.note}` : ""}
                      <span className="block text-xs text-muted-foreground">Enregistré par {p.enregistre_par} le {p.enregistre_le ? new Date(p.enregistre_le).toLocaleString("fr-FR", { timeZone: "Africa/Casablanca" }) : ""}{p.corrige_paiement ? " · correction" : ""}</span>
                    </span>
                    {Number(p.montant) > 0 && <Button size="sm" variant="ghost" onClick={() => corriger(p)}>Corriger</Button>}
                  </li>
                ))}
              </ul>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              <div><Label>Montant (MAD){f.corrige && " — correction"}</Label><Input data-testid="paiement-montant" inputMode="decimal" value={f.montant} onChange={(e) => setF({ ...f, montant: e.target.value })} /></div>
              <div><Label>Date du paiement</Label><Input type="date" data-testid="paiement-date" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} /></div>
              <div><Label>Mode</Label>
                <Select value={f.mode} onValueChange={(v) => setF({ ...f, mode: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{Object.entries(MODES).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Référence (virement, chèque…)</Label><Input value={f.reference} onChange={(e) => setF({ ...f, reference: e.target.value })} /></div>
              <div className="sm:col-span-2"><Label>{f.corrige ? "Motif de la correction (obligatoire)" : "Note"}</Label><Input data-testid="paiement-note" value={f.note} onChange={(e) => setF({ ...f, note: e.target.value })} /></div>
            </div>
            <div className="flex justify-end gap-2">
              {f.corrige && <Button variant="ghost" onClick={charger}>Annuler la correction</Button>}
              <Button onClick={enregistrer} disabled={enCours} data-testid="paiement-enregistrer">{f.corrige ? "Enregistrer la correction" : "Enregistrer le paiement"}</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
