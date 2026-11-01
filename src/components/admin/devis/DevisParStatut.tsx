import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { ExternalLink } from "lucide-react";
import { STATUTS, dateFr, money } from "./devisUtils";

interface Props {
  titre: string;
  types?: string[];
  statuts?: string[];
  vide?: string;
}

const TYPES: Record<string, string> = { entreprise: "Entreprise", mariage: "Mariage", evenement: "Événement" };

/** Ouvre un devis dans l'onglet Devis (écouté par DevisRapide et la page Admin). */
export const ouvrirDevis = (id: string) => {
  (window as any).__heaventDevisAOuvrir = id; // l'onglet Devis n'est peut-être pas encore affiché
  window.dispatchEvent(new CustomEvent("heavent:ouvrir-devis", { detail: id }));
};
/** Prévient les autres listes qu'un devis a changé. */
export const devisModifie = () => window.dispatchEvent(new CustomEvent("heavent:devis-modifie"));

export default function DevisParStatut({ titre, types, statuts, vide }: Props) {
  const { toast } = useToast();
  const [liste, setListe] = useState<any[]>([]);

  const charger = useCallback(async () => {
    let q = supabase.from("devis").select("id, numero, type, client_nom, client_societe, titre, date_evenement, total_ttc, statut, date_envoi, date_emission, devise, demande_entreprise_id, demande_mariage_id")
      .order("date_emission", { ascending: false });
    if (types?.length) q = q.in("type", types);
    if (statuts?.length) q = q.in("statut", statuts);
    const { data } = await q;
    setListe(data ?? []);
  }, [types?.join(), statuts?.join()]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    charger();
    const f = () => charger();
    window.addEventListener("heavent:devis-modifie", f);
    return () => window.removeEventListener("heavent:devis-modifie", f);
  }, [charger]);

  const changerStatut = async (d: any, statut: string) => {
    const maj: any = { statut };
    if (statut === "envoye" && !d.date_envoi) maj.date_envoi = new Date().toISOString();
    const { error } = await supabase.from("devis").update(maj).eq("id", d.id);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    // La demande reçue sur le site suit le même statut
    if (["envoye", "accepte", "refuse"].includes(statut)) {
      const dem = { statut, montant_total: d.total_ttc, date_envoi_devis: maj.date_envoi ?? d.date_envoi ?? new Date().toISOString() };
      if (d.demande_entreprise_id) await supabase.from("devis_entreprise").update(dem).eq("id", d.demande_entreprise_id);
      if (d.demande_mariage_id) await supabase.from("devis_mariage").update(dem).eq("id", d.demande_mariage_id);
    }
    devisModifie();
  };

  const total = liste.reduce((t, d) => t + Number(d.total_ttc || 0), 0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">{titre} ({liste.length})</CardTitle>
        {liste.length > 0 && <span className="text-sm text-muted-foreground">Total TTC : <b className="text-foreground">{money(total)}</b></span>}
      </CardHeader>
      <CardContent className="overflow-x-auto">
        {liste.length === 0 ? (
          <p className="text-sm text-muted-foreground py-3">{vide ?? "Aucun devis."}</p>
        ) : (<>
          <div className="sm:hidden grid gap-3.5">
            {liste.map((d) => (
              <article key={d.id} className="border-t border-[#DCCDAA] pt-3.5">
                <div className="flex justify-between items-baseline gap-3">
                  <h3 className="font-serif text-[21px] leading-tight break-words min-w-0">{d.client_societe || d.client_nom}</h3>
                  <span className="text-[10.5px] font-medium tracking-[0.14em] text-[#5A5146] whitespace-nowrap">{d.numero}</span>
                </div>
                <p className="text-[13.5px] text-[#5A5146] mt-0.5 break-words">{TYPES[d.type] ?? d.type}{d.titre ? ` · ${d.titre}` : ""}{d.date_evenement ? ` · ${dateFr(d.date_evenement)}` : ""}</p>
                <div className="flex items-center justify-between gap-3 mt-2">
                  <Select value={d.statut} onValueChange={(v) => changerStatut(d, v)}>
                    <SelectTrigger className="h-11 w-auto border-0 p-0 shadow-none bg-transparent" aria-label="Changer le statut"><span className={d.statut === "accepte" || d.statut === "facture" ? "a-st vert" : d.statut === "refuse" ? "a-st terre" : "a-st vide"}>{STATUTS[d.statut]?.label ?? d.statut}</span></SelectTrigger>
                    <SelectContent>{Object.entries(STATUTS).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}</SelectContent>
                  </Select>
                  <span className="font-serif text-[22px] tabular-nums whitespace-nowrap">{money(d.total_ttc, d.devise)}</span>
                </div>
                <button onClick={() => ouvrirDevis(d.id)} className="s-btn s-btn-plein s-sombre a-btn-grand mt-2.5"><ExternalLink className="h-4 w-4" /> Ouvrir</button>
              </article>
            ))}
          </div>
          <Table className="hidden sm:table">
            <TableHeader><TableRow>
              <TableHead>N°</TableHead><TableHead>Type</TableHead><TableHead>Client</TableHead><TableHead>Événement</TableHead>
              <TableHead className="text-right">Total TTC</TableHead><TableHead>Statut</TableHead><TableHead />
            </TableRow></TableHeader>
            <TableBody>
              {liste.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-mono text-xs">{d.numero}<div className="text-muted-foreground">{dateFr(d.date_envoi ?? d.date_emission)}</div></TableCell>
                  <TableCell><Badge variant="outline">{TYPES[d.type] ?? d.type}</Badge></TableCell>
                  <TableCell>{d.client_societe || d.client_nom}{d.client_societe && <div className="text-xs text-muted-foreground">{d.client_nom}</div>}</TableCell>
                  <TableCell>{d.titre || "—"}<div className="text-xs text-muted-foreground">{dateFr(d.date_evenement)}</div></TableCell>
                  <TableCell className="text-right whitespace-nowrap font-medium">{money(d.total_ttc, d.devise)}</TableCell>
                  <TableCell>
                    <Select value={d.statut} onValueChange={(v) => changerStatut(d, v)}>
                      <SelectTrigger className="h-8 w-[120px] border-0 p-0 shadow-none"><Badge className={STATUTS[d.statut]?.className}>{STATUTS[d.statut]?.label ?? d.statut}</Badge></SelectTrigger>
                      <SelectContent>{Object.entries(STATUTS).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}</SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right"><Button size="sm" variant="ghost" onClick={() => ouvrirDevis(d.id)}><ExternalLink className="h-4 w-4 mr-1" /> Ouvrir</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>)}
      </CardContent>
    </Card>
  );
}
