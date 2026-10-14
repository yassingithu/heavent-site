import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, RefreshCw, X } from "lucide-react";
import { STATUTS_REMARQUE, StatutRemarque, TYPES_REMARQUE, TypeRemarque, detailRemarque } from "@/lib/remarques";
import { dateHeureFr } from "@/lib/signature";

/** Côté admin : remarques laissées par les crews sur leurs contrats (heures en plus, frais…). */
export default function RemarquesCrews() {
  const { toast } = useToast();
  const [remarques, setRemarques] = useState<any[]>([]);
  const [toutes, setToutes] = useState(false);
  const [reponses, setReponses] = useState<Record<string, string>>({});

  const charger = () => (supabase as any).from("remarques_contrat")
    .select("*, staff(prenom, nom), contrats(titre, evenement, devis(titre, numero))").order("created_at", { ascending: false }).limit(200)
    .then(({ data }: any) => setRemarques(data ?? []));
  useEffect(() => { charger(); }, []);

  const traiter = async (r: any, statut: StatutRemarque) => {
    const { error } = await (supabase as any).from("remarques_contrat").update({ statut, reponse: reponses[r.id]?.trim() || r.reponse || null, traitee_le: new Date().toISOString() }).eq("id", r.id);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    toast({ title: STATUTS_REMARQUE[statut].texte, description: statut === "acceptee" && r.type !== "autre" ? "Pense à l'ajouter sur sa fiche de paie (onglet Paie, prime ou heures)." : "Le crew voit ta réponse dans son espace." });
    charger();
  };

  const nouvelles = remarques.filter((r) => r.statut === "nouvelle");
  const liste = toutes ? remarques : nouvelles;
  return (
    <Card data-testid="remarques-admin">
      <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-2 space-y-0">
        <div>
          <CardTitle className="text-base">💬 Remarques des crews {nouvelles.length > 0 && <span className="ml-1 rounded-full bg-sky-600 text-white text-xs px-2 py-0.5">{nouvelles.length} nouvelle{nouvelles.length > 1 ? "s" : ""}</span>}</CardTitle>
          <p className="text-sm text-muted-foreground">Heures en plus, frais engagés ou autre remarque laissés par un crew sur son contrat.</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setToutes(!toutes)}>{toutes ? "Seulement les nouvelles" : `Tout l'historique (${remarques.length})`}</Button>
          <Button size="sm" variant="outline" onClick={charger}><RefreshCw className="h-4 w-4" /></Button>
        </div>
      </CardHeader>
      <CardContent>
        {liste.length === 0 ? (
          <p className="text-sm text-muted-foreground">{toutes ? "Aucune remarque pour l'instant." : "Aucune nouvelle remarque."}</p>
        ) : (
          <div className="space-y-2">
            {liste.map((r) => {
              const t = TYPES_REMARQUE[r.type as TypeRemarque] ?? TYPES_REMARQUE.autre; const s = STATUTS_REMARQUE[r.statut as StatutRemarque];
              return (
                <div key={r.id} className="rounded-md border p-3 text-sm space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="font-medium">{r.staff?.prenom} {r.staff?.nom}</span>
                      <span className="text-muted-foreground"> · {r.contrats?.devis?.titre || r.contrats?.evenement || r.contrats?.titre}</span>
                      <div className="text-xs text-muted-foreground">Envoyée le {dateHeureFr(r.created_at)}</div>
                    </div>
                    <span className={`text-[11px] font-medium rounded-full px-2 py-0.5 ${s?.classe}`}>{s?.texte}</span>
                  </div>
                  <div className="font-medium">{t.icone} {t.texte}{detailRemarque(r) ? ` · ${detailRemarque(r)}` : ""}</div>
                  <div className="whitespace-pre-line bg-[#FAF7EE] border border-[#ece6d3] rounded p-2">{r.message}</div>
                  {r.statut === "nouvelle" ? (
                    <div className="flex flex-wrap items-center gap-2">
                      <Input className="flex-1 min-w-[200px]" placeholder="Réponse au crew (facultatif)" value={reponses[r.id] ?? ""} onChange={(e) => setReponses({ ...reponses, [r.id]: e.target.value })} />
                      <Button size="sm" onClick={() => traiter(r, "acceptee")}><Check className="h-4 w-4 mr-1" /> Accepter</Button>
                      <Button size="sm" variant="outline" className="text-red-700" onClick={() => traiter(r, "refusee")}><X className="h-4 w-4 mr-1" /> Refuser</Button>
                      <Button size="sm" variant="ghost" onClick={() => traiter(r, "vue")}>Marquer comme vue</Button>
                    </div>
                  ) : r.reponse ? <div className="text-xs text-muted-foreground border-l-2 border-[#C8B560] pl-2">Ta réponse : {r.reponse}</div> : null}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
