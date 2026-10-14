import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";
import { BADGE_SIGNATURE, EtatSignature, dateHeureFr, etatSignature, finSignature, limiteSignature } from "@/lib/signature";
import { telechargerContrats } from "./contratPdf";

const FILTRES: { id: EtatSignature | "tous"; texte: string }[] = [
  { id: "signe", texte: "Signés" }, { id: "a_signer", texte: "À signer" }, { id: "en_retard", texte: "En retard" }, { id: "ferme", texte: "Délai dépassé" },
];

/** Suivi des signatures : qui a signé (et quand), qui doit encore signer. */
export default function SuiviSignatures() {
  const { toast } = useToast();
  const [contrats, setContrats] = useState<any[]>([]);
  const [filtre, setFiltre] = useState<EtatSignature>("signe");
  const [enCours, setEnCours] = useState<string | null>(null);

  const charger = () =>
    supabase.from("contrats").select("id, titre, evenement, statut, date_debut, date_fin, dates, signe_le, signature_nom, employeur_signe_le, signature_preuve, rappels_signature, staff(prenom, nom), devis(titre, numero)")
      .neq("statut", "annule").order("date_debut", { ascending: false }).limit(300)
      .then(({ data }) => setContrats(data ?? []));
  useEffect(() => { charger(); }, []);

  const compte = (e: EtatSignature) => contrats.filter((c) => etatSignature(c) === e).length;
  const liste = contrats.filter((c) => etatSignature(c) === filtre)
    .sort((a, b) => filtre === "signe" ? String(b.signe_le).localeCompare(String(a.signe_le)) : String(a.date_debut).localeCompare(String(b.date_debut)));

  const pdf = async (id: string) => {
    setEnCours(id);
    try { await telechargerContrats([id]); } catch { toast({ title: "PDF non créé", variant: "destructive" }); } finally { setEnCours(null); }
  };

  return (
    <Card data-testid="suivi-signatures">
      <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-2 space-y-0">
        <div>
          <CardTitle className="text-base">✍️ Signatures des contrats</CardTitle>
          <p className="text-sm text-muted-foreground">Dès qu'un crew signe, son contrat passe dans « Signés », contresigné par l'employeur. Le PDF porte les deux signatures.</p>
        </div>
        <Button size="sm" variant="outline" onClick={charger}><RefreshCw className="h-4 w-4 mr-1" /> Actualiser</Button>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {FILTRES.map((f) => {
            const b = BADGE_SIGNATURE[f.id as EtatSignature];
            return (
              <button key={f.id} onClick={() => setFiltre(f.id as EtatSignature)}
                className={`rounded-md border p-2 text-left transition ${filtre === f.id ? "ring-2 ring-[#C8B560] border-[#C8B560]" : "hover:bg-muted/50"}`}>
                <div className="text-2xl font-semibold">{compte(f.id as EtatSignature)}</div>
                <span className={`text-[11px] font-medium rounded-full px-2 py-0.5 ${b.classe}`}>{f.texte}</span>
              </button>
            );
          })}
        </div>
        {liste.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aucun contrat dans cette catégorie.</p>
        ) : (
          <div className="divide-y">
            {liste.map((c) => (
              <div key={c.id} className="flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
                <div className="min-w-0">
                  <div className="font-medium">{c.staff?.prenom} {c.staff?.nom} <span className="text-muted-foreground font-normal">· {c.devis?.titre || c.evenement || c.titre}</span></div>
                  <div className="text-xs text-muted-foreground">
                    {c.signe_le
                      ? <span className="text-emerald-800">Signé le {dateHeureFr(c.signe_le)}{c.signature_nom ? ` par ${c.signature_nom}` : ""}{c.employeur_signe_le ? " · contresigné par l'employeur" : ""}{c.signature_preuve?.signe_en_retard ? " · signé en retard" : ""}</span>
                      : etatSignature(c) === "ferme"
                        ? `Non signé — fin du délai le ${dateHeureFr(finSignature(c))}`
                        : `À signer avant le ${dateHeureFr(limiteSignature(c))} · dernier délai ${dateHeureFr(finSignature(c))}${c.rappels_signature ? ` · ${c.rappels_signature} rappel(s) envoyé(s)` : ""}`}
                  </div>
                </div>
                <Button size="sm" variant="outline" disabled={enCours === c.id} onClick={() => pdf(c.id)}><Download className="h-4 w-4 mr-1" /> {c.signe_le ? "Contrat signé (PDF)" : "PDF"}</Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
