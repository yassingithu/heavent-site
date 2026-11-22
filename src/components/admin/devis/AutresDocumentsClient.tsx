import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dateFr, money } from "./devisUtils";
import { libelleStatut } from "@/lib/statuts";

interface Doc { id: string; numero: string; titre: string | null; statut: string; total_ttc: number; devise: string | null; date_evenement: string | null; archive?: boolean }
interface Fac { numero: string; type: string; statut: string; total_ttc: number; devis_numero: string | null }

/** Les autres devis (et leurs factures) de la même personne, retrouvés par son e-mail : évite de refaire un devis pour un client déjà connu. */
export default function AutresDocumentsClient({ devisId, email, ouvrir }: { devisId?: string | null; email: string; ouvrir: (id: string) => void }) {
  const [devis, setDevis] = useState<Doc[] | null>(null);
  const [factures, setFactures] = useState<Fac[]>([]);
  const mail = email.trim().toLowerCase();

  useEffect(() => {
    let annule = false;
    setDevis(null); setFactures([]);
    if (!mail || !mail.includes("@")) { setDevis([]); return; }
    (async () => {
      // ilike sans joker : égalité sans tenir compte des majuscules (les % et _ de l'adresse sont neutralisés)
      const motif = mail.replace(/[\\%_]/g, "\\$&");
      let q = (supabase as any).from("devis").select("id, numero, titre, statut, total_ttc, devise, date_evenement, archive").ilike("client_email", motif).order("date_emission", { ascending: false }).limit(20);
      if (devisId) q = q.neq("id", devisId);
      const { data } = await q;
      const liste = (data ?? []) as Doc[];
      let fac: Fac[] = [];
      if (liste.length) {
        const { data: f } = await (supabase as any).from("factures").select("numero, type, statut, total_ttc, devis_numero").in("devis_numero", liste.map((d) => d.numero));
        fac = (f ?? []) as Fac[];
      }
      if (!annule) { setDevis(liste); setFactures(fac); }
    })().catch(() => { if (!annule) setDevis([]); });
    return () => { annule = true; };
  }, [mail, devisId]);

  if (!devis || devis.length === 0) return null;
  return (
    <Card data-testid="autres-documents-client">
      <CardHeader><CardTitle className="text-base">Autres documents de ce client ({devis.length})</CardTitle></CardHeader>
      <CardContent className="grid gap-0">
        {devis.map((d) => {
          const fs = factures.filter((f) => f.devis_numero === d.numero);
          return (
            <button key={d.id} type="button" onClick={() => ouvrir(d.id)} className="text-left border-t border-[#DCCDAA] first:border-t-0 py-3 min-h-11 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7A5F1F]" data-testid="autre-devis">
              <span className="flex justify-between items-baseline gap-3">
                <span className="font-serif text-[18px] leading-tight break-words min-w-0">{d.titre || d.numero}</span>
                <span className="tabular-nums whitespace-nowrap text-[#7A5F1F]">{money(d.total_ttc, d.devise ?? undefined)}</span>
              </span>
              <span className="block text-[12.5px] text-[#5A5146] mt-0.5">{d.numero} · {libelleStatut("devis", d.statut)}{d.date_evenement ? ` · ${dateFr(d.date_evenement)}` : ""}{d.archive ? " · archivé" : ""}</span>
              {fs.length > 0 && <span className="block text-[12.5px] text-[#5A5146]">{fs.map((f) => `${f.numero} (${f.statut === "payee" ? "payée" : f.statut === "annulee" ? "annulée" : "à payer"})`).join(" · ")}</span>}
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
}
