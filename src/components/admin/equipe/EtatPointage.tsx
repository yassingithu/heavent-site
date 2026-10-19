import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";

/** État d'une journée de mission côté admin : confirmation, arrivée, départ, heures à valider. */
export interface Pointage {
  id: string; date_jour: string; heures: number; heure_debut: string | null;
  presence_confirmee_le?: string | null; empechement_le?: string | null; empechement_motif?: string | null;
  arrivee_le?: string | null; arrivee_verifiee?: boolean | null; arrivee_position?: any; arrivee_photo?: string | null;
  depart_le?: string | null; depart_verifie?: boolean | null; heures_pointees?: number | null; heures_validees?: number | null; pointage_a_verifier?: boolean;
}
const heure = (iso: string) => new Date(iso).toLocaleTimeString("fr-FR", { timeZone: "UTC", hour: "2-digit", minute: "2-digit" });
const jourFr = (s: string) => new Date(s + "T12:00:00Z").toLocaleDateString("fr-FR", { timeZone: "UTC", weekday: "short", day: "numeric", month: "short" });
const puce = (classe: string, texte: string, titre?: string) => <span title={titre} className={`text-[11px] font-medium rounded-full px-2 py-0.5 ${classe}`}>{texte}</span>;

export function retardMinutes(a: Pointage) {
  if (!a.arrivee_le || !a.heure_debut) return 0;
  return Math.max(0, Math.round((new Date(a.arrivee_le).getTime() - new Date(`${a.date_jour}T${a.heure_debut.slice(0, 5)}:00Z`).getTime()) / 60000));
}

export default function EtatPointage({ a, plusieursJours, onChange }: { a: Pointage; plusieursJours?: boolean; onChange: () => void }) {
  const { toast } = useToast();
  const [saisie, setSaisie] = useState("");
  const valider = async (heures: number) => {
    const { error } = await (supabase as any).from("affectations").update({ heures_validees: heures, pointage_a_verifier: false }).eq("id", a.id);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    toast({ title: `${heures} h validées`, description: "Elles seront reprises dans la fiche de paie du mois." });
    setSaisie(""); onChange();
  };
  const voirPhoto = async () => {
    if (!a.arrivee_photo) return;
    const { data } = await supabase.storage.from("pointages").createSignedUrl(a.arrivee_photo, 300);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank", "noopener");
  };
  const retard = retardMinutes(a);
  const dist = a.arrivee_position?.distance;
  const passe = new Date(a.date_jour + "T23:59:59Z") < new Date();

  return (
    <div className="flex flex-wrap items-center gap-1.5 text-xs" data-testid="etat-pointage">
      {plusieursJours && <span className="text-muted-foreground w-20">{jourFr(a.date_jour)}</span>}
      {a.empechement_le ? puce("bg-red-100 text-red-800", "Empêchement", a.empechement_motif ?? undefined)
        : a.presence_confirmee_le ? puce("bg-emerald-100 text-emerald-800", "Présence confirmée")
        : !a.arrivee_le && !passe ? puce("bg-amber-100 text-amber-900", "Pas encore confirmé") : null}
      {a.arrivee_le ? puce(a.arrivee_verifiee === false ? "bg-orange-100 text-orange-900" : "bg-emerald-100 text-emerald-800",
        `Arrivée ${heure(a.arrivee_le)}${retard > 5 ? ` (+${retard} min)` : ""}${a.arrivee_verifiee === true ? " ✓" : a.arrivee_verifiee === false ? " hors lieu" : ""}`,
        dist != null ? `À ${dist} m du lieu` : a.arrivee_position ? "Position enregistrée (lieu non localisé)" : "Sans position")
        : passe && !a.empechement_le ? puce("bg-gray-100 text-gray-700", "Pas de pointage") : null}
      {a.arrivee_photo && <button onClick={voirPhoto} className="inline-flex items-center gap-0.5 text-[#8C6D22] underline" title="Voir le selfie"><Camera className="h-3 w-3" /> photo</button>}
      {a.depart_le && puce("bg-emerald-100 text-emerald-800", `Départ ${heure(a.depart_le)} · ${a.heures_pointees} h`)}
      {a.heures_validees != null && !a.pointage_a_verifier && puce("bg-[#F4E9CF] text-[#7A5F1E]", `Payé : ${a.heures_validees} h`)}
      {a.pointage_a_verifier && (
        <span className="inline-flex flex-wrap items-center gap-1 rounded-md border border-orange-300 bg-orange-50 px-2 py-1" data-testid="pointage-a-verifier">
          <b className="text-orange-900">À vérifier :</b>
          {a.heures_pointees != null && <Button size="sm" variant="outline" className="h-6 px-2 text-[11px]" onClick={() => valider(Number(a.heures_pointees))} data-testid="valider-pointees">Valider {a.heures_pointees} h pointées</Button>}
          <Button size="sm" variant="ghost" className="h-6 px-2 text-[11px]" onClick={() => valider(Number(a.heures))}>Garder {a.heures} h prévues</Button>
          <Input className="h-6 w-14 text-[11px]" type="number" min={0} step="0.25" value={saisie} placeholder="h" onChange={(e) => setSaisie(e.target.value)} />
          {saisie && <Button size="sm" className="h-6 px-2 text-[11px]" onClick={() => valider(Number(saisie))}>OK</Button>}
        </span>
      )}
      {passe && !a.arrivee_le && !a.empechement_le && a.heures_validees == null && (
        <span className="inline-flex items-center gap-1">
          <Input className="h-6 w-14 text-[11px]" type="number" min={0} step="0.25" value={saisie} placeholder="h" onChange={(e) => setSaisie(e.target.value)} title="Saisir les heures à la main" />
          {saisie && <Button size="sm" className="h-6 px-2 text-[11px]" onClick={() => valider(Number(saisie))}>Saisir</Button>}
        </span>
      )}
    </div>
  );
}
