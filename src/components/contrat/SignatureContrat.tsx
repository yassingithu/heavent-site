import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Download } from "lucide-react";
import { dateHeureFr, etatSignature, finSignature, limiteSignature } from "@/lib/signature";
import { telechargerContrats } from "@/components/admin/equipe/contratPdf";
import { CONDITIONS_CONTRAT_DEFAUT } from "@/lib/conditions";
import ZoneSignature, { ZoneSignatureRef } from "./ZoneSignature";

interface Props { contrat: any | null; nomStaff: string; onClose: () => void; onSigne: () => void }

/** Lecture + signature électronique d'un contrat et de ses conditions par le crew (doigt ou souris). */
export default function SignatureContrat({ contrat, nomStaff, onClose, onSigne }: Props) {
  const { toast } = useToast();
  const zone = useRef<ZoneSignatureRef>(null);
  const [traits, setTraits] = useState(0);
  const [nom, setNom] = useState(nomStaff);
  const [lu, setLu] = useState(false);
  const [enCours, setEnCours] = useState(false);
  const [pdf, setPdf] = useState(false);
  const [conditions, setConditions] = useState("");

  useEffect(() => { setNom(nomStaff); setLu(false); setTraits(0); }, [contrat, nomStaff]);
  useEffect(() => {
    if (!contrat) return;
    supabase.from("parametres_agence").select("conditions_contrat").eq("id", 1).maybeSingle()
      .then(({ data }) => setConditions(data?.conditions_contrat?.trim() || CONDITIONS_CONTRAT_DEFAUT));
  }, [contrat]);

  const lirePdf = async () => {
    setPdf(true);
    try { await telechargerContrats([contrat.id]); } catch { toast({ title: "PDF non créé", variant: "destructive" }); } finally { setPdf(false); }
  };

  const signer = async () => {
    if (!lu) { toast({ title: "Coche « J'ai lu et j'accepte »", variant: "destructive" }); return; }
    if (traits < 15) { toast({ title: "Dessine ta signature dans le cadre", variant: "destructive" }); return; }
    setEnCours(true);
    const image = zone.current!.image();
    const { data, error } = await supabase.functions.invoke("signer-contrat", { body: { contratId: contrat.id, nom, image, accepte: lu, conditions: true } });
    let message = data?.error as string | undefined;
    if (error && !message) { try { message = (await (error as any).context?.json())?.error; } catch { /* */ } }
    setEnCours(false);
    if (error || data?.error) { toast({ title: "Signature non enregistrée", description: message ?? "Réessaie dans un instant.", variant: "destructive" }); return; }
    toast({ title: "Contrat signé ✍️", description: "Merci ! L'agence a été prévenue." });
    onSigne(); onClose();
  };

  if (!contrat) return null;
  const dates = (Array.isArray(contrat.dates) ? contrat.dates : []) as any[];
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg max-h-[92vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Signer mon contrat</DialogTitle></DialogHeader>
        <div className="space-y-4 text-sm">
          <div className="rounded-md border border-[#ece6d3] bg-[#FAF7EE] p-3 space-y-1">
            <div className="font-semibold">{contrat.evenement || contrat.titre}</div>
            <div className="text-muted-foreground">{contrat.titre}{contrat.lieu ? ` · ${contrat.lieu}` : ""}</div>
            {dates.map((d) => (
              <div key={d.date}>{new Date(d.date + "T12:00:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                {d.heure_debut && d.heure_fin ? ` · ${d.heure_debut.slice(0, 5)} – ${d.heure_fin.slice(0, 5)}` : ""} · {d.heures} h</div>
            ))}
            <div className="font-medium pt-1">{contrat.total_heures} h × {contrat.taux_horaire} MAD = {contrat.salaire_brut} MAD brut</div>
            <div className="text-xs text-amber-800">{etatSignature(contrat) === "en_retard"
              ? `En retard — encore signable jusqu'au ${dateHeureFr(finSignature(contrat))}`
              : `À signer avant le ${dateHeureFr(limiteSignature(contrat))} (24 h avant la mission)`}</div>
          </div>
          <Button variant="outline" size="sm" onClick={lirePdf} disabled={pdf}><Download className="h-4 w-4 mr-1" /> {pdf ? "Création…" : "Lire le contrat complet (PDF)"}</Button>

          <details className="rounded-md border p-3" data-testid="conditions-mission">
            <summary className="cursor-pointer font-medium">Conditions de la mission (annexe au contrat)</summary>
            <div className="mt-2 max-h-56 overflow-y-auto whitespace-pre-line text-xs text-muted-foreground">{conditions}</div>
          </details>

          <label className="flex items-start gap-2">
            <Checkbox checked={lu} onCheckedChange={(v) => setLu(!!v)} className="mt-0.5" />
            <span>J'ai lu le contrat <b>et les conditions de la mission</b>, et je les accepte.</span>
          </label>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Nom complet</div>
            <Input value={nom} onChange={(e) => setNom(e.target.value)} />
          </div>
          <ZoneSignature ref={zone} onTraits={setTraits} />
          <p className="text-xs text-muted-foreground">Ta signature est apposée sur le contrat et sur ses conditions. L'agence (Imane CHAIGARI, CEO) contresigne automatiquement à ce moment-là. La date, l'heure et l'appareil utilisé sont enregistrés comme preuve.</p>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>Plus tard</Button>
            <Button onClick={signer} disabled={enCours}>{enCours ? "Signature…" : "Signer le contrat"}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
