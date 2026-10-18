import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Save, Trash2 } from "lucide-react";
import { Prestation, UNITES } from "./devisUtils";

const CATEGORIES = [
  { value: "staff", label: "Staff" },
  { value: "mariage", label: "Mariage" },
  { value: "evenementiel", label: "Événementiel" },
  { value: "logistique", label: "Logistique" },
  { value: "decoration", label: "Décoration et mobilier" },
  { value: "autre", label: "Autre" },
];

const vide = { categorie: "staff", designation: "", description: "", unite: "heure", prix_unitaire: 0 };

export default function CataloguePrestations({ items, devise, onChange }: { items: Prestation[]; devise: string; onChange: () => void }) {
  const { toast } = useToast();
  const [nouveau, setNouveau] = useState({ ...vide });
  const [edits, setEdits] = useState<Record<string, Partial<Prestation>>>({});

  const ajouter = async () => {
    if (!nouveau.designation.trim()) return;
    const { error } = await supabase.from("catalogue_prestations").insert({
      ...nouveau, designation: nouveau.designation.trim(), description: nouveau.description || null, ordre: items.length,
    });
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    setNouveau({ ...vide, categorie: nouveau.categorie });
    onChange();
  };

  const maj = async (id: string, patch: Partial<Prestation>) => {
    const { error } = await supabase.from("catalogue_prestations").update(patch).eq("id", id);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    setEdits((e) => { const n = { ...e }; delete n[id]; return n; });
    onChange();
  };

  const suppr = async (p: Prestation) => {
    if (!confirm(`Supprimer « ${p.designation} » du catalogue ?`)) return;
    const { error } = await supabase.from("catalogue_prestations").delete().eq("id", p.id);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    onChange();
  };

  const val = <K extends keyof Prestation>(p: Prestation, k: K) => (edits[p.id]?.[k] ?? p[k]) as Prestation[K];
  const edit = (id: string, patch: Partial<Prestation>) => setEdits((e) => ({ ...e, [id]: { ...e[id], ...patch } }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Catalogue de prix</CardTitle>
        <p className="text-sm text-muted-foreground">
          Tes prestations habituelles et leur prix HT par défaut. Elles apparaissent en boutons dans l'éditeur de devis ;
          le prix reste modifiable sur chaque devis.
        </p>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Catégorie</TableHead><TableHead>Prestation</TableHead><TableHead>Unité</TableHead>
              <TableHead className="text-right">Prix HT ({devise})</TableHead><TableHead>Actif</TableHead><TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <Select value={val(p, "categorie")} onValueChange={(v) => maj(p.id, { categorie: v })}>
                    <SelectTrigger className="w-[130px]"><SelectValue /></SelectTrigger>
                    <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Input value={val(p, "designation")} onChange={(e) => edit(p.id, { designation: e.target.value })} />
                  {(p as any).jeu_element && <span className="mt-1 inline-block text-[10px] rounded-full bg-[#F4E9CF] text-[#7A5F1E] px-2 py-0.5" title="Ce prix est utilisé par le jeu « Crée ton événement de rêve »">Prix utilisé par le jeu</span>}
                </TableCell>
                <TableCell>
                  <Select value={val(p, "unite")} onValueChange={(v) => maj(p.id, { unite: v })}>
                    <SelectTrigger className="w-[110px]"><SelectValue /></SelectTrigger>
                    <SelectContent>{UNITES.map((u) => <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>)}</SelectContent>
                  </Select>
                </TableCell>
                <TableCell><Input className="w-28 text-right ml-auto" type="number" min={0} step="any" value={val(p, "prix_unitaire")} onChange={(e) => edit(p.id, { prix_unitaire: Number(e.target.value) })} /></TableCell>
                <TableCell><Switch checked={p.actif} onCheckedChange={(v) => maj(p.id, { actif: v })} /></TableCell>
                <TableCell className="whitespace-nowrap">
                  {edits[p.id] && <Button size="icon" variant="ghost" title="Enregistrer" onClick={() => maj(p.id, edits[p.id])}><Save className="h-4 w-4" /></Button>}
                  <Button size="icon" variant="ghost" title="Supprimer" onClick={() => suppr(p)}><Trash2 className="h-4 w-4 text-red-600" /></Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <Select value={nouveau.categorie} onValueChange={(v) => setNouveau({ ...nouveau, categorie: v })}>
                  <SelectTrigger className="w-[130px]"><SelectValue /></SelectTrigger>
                  <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
                </Select>
              </TableCell>
              <TableCell><Input placeholder="Nouvelle prestation…" value={nouveau.designation} onChange={(e) => setNouveau({ ...nouveau, designation: e.target.value })} onKeyDown={(e) => e.key === "Enter" && ajouter()} /></TableCell>
              <TableCell>
                <Select value={nouveau.unite} onValueChange={(v) => setNouveau({ ...nouveau, unite: v })}>
                  <SelectTrigger className="w-[110px]"><SelectValue /></SelectTrigger>
                  <SelectContent>{UNITES.map((u) => <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>)}</SelectContent>
                </Select>
              </TableCell>
              <TableCell><Input className="w-28 text-right ml-auto" type="number" min={0} step="any" value={nouveau.prix_unitaire} onChange={(e) => setNouveau({ ...nouveau, prix_unitaire: Number(e.target.value) })} /></TableCell>
              <TableCell />
              <TableCell><Button size="sm" onClick={ajouter}><Plus className="h-4 w-4 mr-1" /> Ajouter</Button></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
