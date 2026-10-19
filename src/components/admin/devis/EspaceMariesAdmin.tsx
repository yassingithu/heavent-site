import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Heart } from "lucide-react";

interface Moment { id: string; heure: string; titre: string; details: string }
interface TableM { id: string; nom: string; places: number }
interface InviteM { id: string; nom: string; nb_prevus: number; reponse: string; nb_confirmes: number | null; remarque: string | null; table_id: string | null }

const cleHeure = (h: string) => { const [a, b] = (h || "99:99").split(":").map(Number); return (a < 12 ? a + 24 : a) * 60 + (b || 0); };

/** Vue agence de l'espace mariés : programme du jour J, réponses des invités et plan de table (lecture seule). */
export default function EspaceMariesAdmin({ devisId, token, statut }: { devisId?: string; token?: string | null; statut?: string }) {
  const [espace, setEspace] = useState<{ noms: string | null; programme: Moment[]; tables: TableM[]; checklist: { fait: boolean }[]; updated_at: string } | null>(null);
  const [invites, setInvites] = useState<InviteM[]>([]);
  const [charge, setCharge] = useState(false);

  useEffect(() => {
    if (!devisId) return;
    (async () => {
      const [e, i] = await Promise.all([
        (supabase as any).from("espace_maries").select("noms, programme, tables, checklist, updated_at").eq("devis_id", devisId).maybeSingle(),
        (supabase as any).from("invites_mariage").select("id, nom, nb_prevus, reponse, nb_confirmes, remarque, table_id").eq("devis_id", devisId).order("nom"),
      ]);
      setEspace(e.data ?? null); setInvites(i.data ?? []); setCharge(true);
    })();
  }, [devisId]);

  const programme = useMemo(() => [...(espace?.programme ?? [])].sort((a, b) => cleHeure(a.heure) - cleHeure(b.heure)), [espace]);
  if (!devisId) return null;
  const lien = token ? `/mon-mariage/${token}` : null;
  const oui = invites.filter((x) => x.reponse === "oui");
  const personnes = oui.reduce((s, x) => s + (x.nb_confirmes ?? x.nb_prevus), 0);
  const attente = invites.filter((x) => x.reponse === "attente");
  const remarques = invites.filter((x) => x.remarque && x.reponse !== "non");
  const tables = espace?.tables ?? [];

  return (
    <Card data-testid="espace-maries-admin">
      <CardHeader className="flex-row items-center justify-between space-y-0 gap-2">
        <CardTitle className="text-base flex items-center gap-2"><Heart className="h-4 w-4 text-[#A8933F]" /> Espace mariés</CardTitle>
        {lien && statut === "accepte" && <a href={lien} target="_blank" rel="noreferrer" className="text-xs text-[#8C6D22] inline-flex items-center gap-1 hover:underline">Ouvrir <ExternalLink className="h-3 w-3" /></a>}
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {statut !== "accepte" ? (
          <p className="text-muted-foreground">Les mariés accèdent à leur espace (check-list, budget, programme, invités, plan de table) depuis le lien du devis, dès qu'il est signé.</p>
        ) : !charge ? null : !espace ? (
          <p className="text-muted-foreground">Les mariés n'ont pas encore ouvert leur espace.</p>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-muted/50 p-2"><div className="text-lg font-semibold">{personnes}</div><div className="text-xs text-muted-foreground">personnes confirmées</div></div>
              <div className="rounded-lg bg-muted/50 p-2"><div className="text-lg font-semibold">{attente.length}</div><div className="text-xs text-muted-foreground">invitations sans réponse</div></div>
              <div className="rounded-lg bg-muted/50 p-2"><div className="text-lg font-semibold">{tables.length}</div><div className="text-xs text-muted-foreground">tables</div></div>
            </div>
            {programme.length > 0 && (
              <div>
                <div className="font-medium mb-1">Programme du jour J</div>
                <ol className="space-y-0.5">
                  {programme.map((m) => <li key={m.id} className="flex gap-3"><span className="w-12 shrink-0 font-mono text-[#8C6D22]">{m.heure || "—"}</span><span>{m.titre}{m.details ? <span className="text-muted-foreground"> · {m.details}</span> : null}</span></li>)}
                </ol>
              </div>
            )}
            {remarques.length > 0 && (
              <div>
                <div className="font-medium mb-1">Remarques des invités (régimes, allergies…)</div>
                <ul className="space-y-0.5 text-muted-foreground">{remarques.slice(0, 12).map((x) => <li key={x.id}><b className="text-foreground">{x.nom}</b> : {x.remarque}</li>)}</ul>
              </div>
            )}
            {tables.length > 0 && (
              <details>
                <summary className="cursor-pointer font-medium">Plan de table</summary>
                <div className="grid sm:grid-cols-2 gap-2 mt-2">
                  {tables.map((t) => {
                    const assis = invites.filter((x) => x.table_id === t.id && x.reponse !== "non");
                    return (
                      <div key={t.id} className="rounded-lg border p-2">
                        <div className="font-medium">{t.nom} <span className="text-xs text-muted-foreground">({assis.reduce((s, x) => s + (x.reponse === "oui" ? x.nb_confirmes ?? x.nb_prevus : x.nb_prevus), 0)}/{t.places})</span></div>
                        <div className="text-xs text-muted-foreground">{assis.map((x) => x.nom).join(", ") || "—"}</div>
                      </div>
                    );
                  })}
                </div>
              </details>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
