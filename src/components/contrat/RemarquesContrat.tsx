import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquarePlus } from "lucide-react";
import { STATUTS_REMARQUE, TYPES_REMARQUE, TypeRemarque, detailRemarque } from "@/lib/remarques";

/** Côté crew : remarques sur un contrat (heures en plus, frais, autre), visibles et traitées par l'agence. */
export default function RemarquesContrat({ contrat, staffId }: { contrat: any; staffId: string }) {
  const { toast } = useToast();
  const [remarques, setRemarques] = useState<any[]>([]);
  const [ouvert, setOuvert] = useState(false);
  const [type, setType] = useState<TypeRemarque>("heures_sup");
  const [dateJour, setDateJour] = useState("");
  const [heures, setHeures] = useState("");
  const [montant, setMontant] = useState("");
  const [message, setMessage] = useState("");
  const [enCours, setEnCours] = useState(false);
  const dates: string[] = ((contrat.dates ?? []) as any[]).map((d) => d.date).sort();

  const charger = () => (supabase as any).from("remarques_contrat").select("*").eq("contrat_id", contrat.id).order("created_at", { ascending: false })
    .then(({ data }: any) => setRemarques(data ?? []));
  useEffect(() => { charger(); }, [contrat.id]);

  const envoyer = async () => {
    if (type === "heures_sup" && !(Number(heures) > 0)) { toast({ title: "Indique le nombre d'heures en plus", variant: "destructive" }); return; }
    if (type === "frais" && !(Number(montant) > 0)) { toast({ title: "Indique le montant de la charge", variant: "destructive" }); return; }
    if (message.trim().length < 3) { toast({ title: "Explique en quelques mots", variant: "destructive" }); return; }
    setEnCours(true);
    const { error } = await (supabase as any).from("remarques_contrat").insert({
      contrat_id: contrat.id, staff_id: staffId, type, date_jour: dateJour || null,
      heures: type === "heures_sup" ? Number(heures) : null, montant: type === "frais" ? Number(montant) : null, message: message.trim(),
    });
    setEnCours(false);
    if (error) { toast({ title: "Remarque non envoyée", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Remarque envoyée ✓", description: "L'agence la voit dans son espace et te répondra ici." });
    setOuvert(false); setHeures(""); setMontant(""); setMessage(""); setDateJour("");
    charger();
  };

  return (
    <div className="mt-3 border-t pt-3 space-y-2" data-testid="remarques-crew">
      {remarques.map((r) => {
        const t = TYPES_REMARQUE[r.type as TypeRemarque] ?? TYPES_REMARQUE.autre; const s = STATUTS_REMARQUE[r.statut as keyof typeof STATUTS_REMARQUE];
        return (
          <div key={r.id} className="rounded-md bg-[#FAF7EE] border border-[#ece6d3] p-2 text-xs space-y-1">
            <div className="flex flex-wrap items-center justify-between gap-1">
              <span className="font-medium">{t.icone} {t.texte}{detailRemarque(r) ? ` · ${detailRemarque(r)}` : ""}</span>
              {s && <span className={`rounded-full px-2 py-0.5 font-medium ${s.classe}`}>{s.texte}</span>}
            </div>
            <div className="whitespace-pre-line">{r.message}</div>
            {r.reponse && <div className="text-muted-foreground border-l-2 border-[#C8B560] pl-2">Réponse de l'agence : {r.reponse}</div>}
          </div>
        );
      })}
      {!ouvert ? (
        <Button variant="ghost" size="sm" className="text-xs" onClick={() => setOuvert(true)}><MessageSquarePlus className="h-4 w-4 mr-1" /> Ajouter une remarque (heures en plus, frais…)</Button>
      ) : (
        <div className="rounded-md border p-3 space-y-2 text-sm">
          <div className="flex flex-wrap gap-1">
            {(Object.keys(TYPES_REMARQUE) as TypeRemarque[]).map((k) => (
              <Button key={k} type="button" size="sm" variant={type === k ? "default" : "outline"} onClick={() => setType(k)}>{TYPES_REMARQUE[k].icone} {TYPES_REMARQUE[k].texte}</Button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {dates.length > 0 && (
              <select className="h-10 rounded-md border bg-background px-2 text-sm" value={dateJour} onChange={(e) => setDateJour(e.target.value)} aria-label="Jour concerné">
                <option value="">Jour concerné…</option>
                {dates.map((d) => <option key={d} value={d}>{new Date(d + "T12:00:00").toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" })}</option>)}
              </select>
            )}
            {type === "heures_sup" && <Input type="number" min={0} step="0.5" placeholder="Heures en plus" value={heures} onChange={(e) => setHeures(e.target.value)} />}
            {type === "frais" && <Input type="number" min={0} step="1" placeholder="Montant (MAD)" value={montant} onChange={(e) => setMontant(e.target.value)} />}
          </div>
          <Textarea rows={3} placeholder={type === "heures_sup" ? "Ex. : la soirée a fini à 1 h au lieu de minuit, à la demande du client." : type === "frais" ? "Ex. : taxi aller-retour, j'ai le reçu." : "Ta remarque pour l'agence"} value={message} onChange={(e) => setMessage(e.target.value)} />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setOuvert(false)}>Annuler</Button>
            <Button size="sm" disabled={enCours} onClick={envoyer}>{enCours ? "Envoi…" : "Envoyer à l'agence"}</Button>
          </div>
        </div>
      )}
    </div>
  );
}
