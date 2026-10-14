import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { Parametres } from "./devisUtils";
import { CGV_DEFAUT, CONDITIONS_CONTRAT_DEFAUT } from "@/lib/conditions";

const CHAMPS: { key: keyof Parametres; label: string; type?: string }[] = [
  { key: "raison_sociale", label: "Raison sociale" },
  { key: "adresse", label: "Adresse" },
  { key: "ville", label: "Ville" },
  { key: "telephone", label: "Téléphone" },
  { key: "email", label: "Email" },
  { key: "site_web", label: "Site web" },
  { key: "ice", label: "ICE" },
  { key: "rc", label: "Registre de commerce (RC)" },
  { key: "if_fiscal", label: "Identifiant fiscal (IF)" },
  { key: "patente", label: "Patente" },
  { key: "rib", label: "RIB (affiché pour le paiement)" },
  { key: "taux_tva", label: "TVA par défaut (%)", type: "number" },
  { key: "validite_jours", label: "Validité d'un devis (jours)", type: "number" },
  { key: "devise", label: "Devise" },
];

export default function ParametresAgence({ value, onSaved }: { value: Parametres | null; onSaved: () => void }) {
  const { toast } = useToast();
  const [p, setP] = useState<Parametres | null>(value);
  useEffect(() => setP(value), [value]);
  if (!p) return null;

  const save = async () => {
    // La signature de l'employeur s'enregistre à part (bloc dédié) : on ne l'écrase pas ici
    const { signature_employeur, signataire_employeur, ...reste } = p as any;
    const { error } = await supabase.from("parametres_agence").update({
      ...reste, taux_tva: Number(p.taux_tva) || 0, validite_jours: Number(p.validite_jours) || 30,
    }).eq("id", 1);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Informations enregistrées" });
    onSaved();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Informations de l'agence</CardTitle>
        <p className="text-sm text-muted-foreground">Elles s'impriment en en-tête et en pied de chaque devis (mentions légales marocaines : ICE, RC, IF, patente).</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {CHAMPS.map((c) => (
            <div key={c.key}>
              <Label>{c.label}</Label>
              <Input type={c.type ?? "text"} value={(p[c.key] as string | number | null) ?? ""} onChange={(e) => setP({ ...p, [c.key]: e.target.value })} />
            </div>
          ))}
        </div>
        <div>
          <Label>Conditions par défaut (reprises sur chaque nouveau devis)</Label>
          <Textarea rows={3} value={p.conditions ?? ""} onChange={(e) => setP({ ...p, conditions: e.target.value })} />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label>Conditions générales de vente (2ᵉ page de chaque devis)</Label>
            <Button type="button" variant="ghost" size="sm" onClick={() => setP({ ...p, cgv: CGV_DEFAUT })}>Rétablir le texte par défaut</Button>
          </div>
          <Textarea rows={14} className="text-xs" value={p.cgv ?? CGV_DEFAUT} onChange={(e) => setP({ ...p, cgv: e.target.value })} />
          <p className="text-xs text-muted-foreground mt-1">Un article = un titre sur une ligne, le texte en dessous, puis une ligne vide.</p>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label>Conditions de la mission (2ᵉ page de chaque contrat)</Label>
            <Button type="button" variant="ghost" size="sm" onClick={() => setP({ ...p, conditions_contrat: CONDITIONS_CONTRAT_DEFAUT })}>Rétablir le texte par défaut</Button>
          </div>
          <Textarea rows={12} className="text-xs" value={p.conditions_contrat ?? CONDITIONS_CONTRAT_DEFAUT} onChange={(e) => setP({ ...p, conditions_contrat: e.target.value })} />
        </div>
        <Button onClick={save}><Save className="h-4 w-4 mr-1" /> Enregistrer</Button>
      </CardContent>
    </Card>
  );
}
