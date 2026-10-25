import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EtatPointage, { Pointage } from "./EtatPointage";
import { aujourdhuiMaroc, jourMarocPlus } from "@/lib/dateMaroc";

/** Bilan : qui travaille aujourd'hui et demain, avec la confirmation et le pointage de chacun (mis à jour toutes les minutes). */
interface Ligne extends Pointage { staff: { prenom: string; nom: string; telephone: string | null } | null; devis: { numero: string; titre: string | null } | null; heure_fin: string | null }

export default function MissionsDuJour() {
  const [lignes, setLignes] = useState<Ligne[]>([]);
  const charger = async () => {
    const auj = aujourdhuiMaroc();
    const dem = jourMarocPlus(1);
    const { data } = await (supabase as any).from("affectations").select("*, staff(prenom, nom, telephone), devis(numero, titre)")
      .in("date_jour", [auj, dem]).neq("statut", "annule").order("date_jour").order("heure_debut");
    setLignes((data ?? []) as Ligne[]);
  };
  useEffect(() => { charger(); const t = setInterval(charger, 60000); return () => clearInterval(t); }, []);
  if (!lignes.length) return null;
  const auj = aujourdhuiMaroc();
  const groupes = [["Aujourd'hui", lignes.filter((l) => l.date_jour === auj)], ["Demain", lignes.filter((l) => l.date_jour !== auj)]] as const;
  const aVerifier = lignes.filter((l) => l.pointage_a_verifier).length;
  return (
    <Card data-testid="missions-du-jour">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex flex-wrap items-center gap-2">Équipes sur le terrain
          {aVerifier > 0 && <span className="text-xs font-medium rounded-full bg-orange-100 text-orange-900 px-2 py-0.5">{aVerifier} pointage{aVerifier > 1 ? "s" : ""} à vérifier</span>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {groupes.map(([titre, liste]) => liste.length > 0 && (
          <div key={titre}>
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">{titre}</div>
            <div className="divide-y">
              {liste.map((l) => (
                <div key={l.id} className="py-2 flex flex-wrap items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="font-medium">{l.staff?.prenom} {l.staff?.nom}</span>
                    <span className="text-muted-foreground"> · {l.devis?.titre || l.devis?.numero}{l.heure_debut ? ` · ${l.heure_debut.slice(0, 5)}${l.heure_fin ? `–${l.heure_fin.slice(0, 5)}` : ""}` : ""}</span>
                    {l.staff?.telephone && <a className="ml-2 text-xs underline text-primary" href={`tel:${l.staff.telephone}`}>{l.staff.telephone}</a>}
                  </div>
                  <EtatPointage a={l} onChange={charger} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
