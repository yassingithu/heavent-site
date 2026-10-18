import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDown, ArrowUp, ImagePlus, Plus, Save, Trash2, X } from "lucide-react";

export const TYPES_REALISATION = [
  { id: "mariage", nom: "Mariages" },
  { id: "fiancailles", nom: "Fiançailles" },
  { id: "anniversaire", nom: "Anniversaires et fêtes" },
  { id: "entreprise", nom: "Événements d'entreprise" },
  { id: "salon", nom: "Salons et congrès" },
  { id: "nawar", nom: "Bar à parfums Nawar" },
] as const;

interface Realisation {
  id?: string; titre: string; type_evenement: string; lieu: string; date_evenement: string; description: string;
  photos: string[]; publie: boolean; ordre: number;
}
const vide = (): Realisation => ({ titre: "", type_evenement: "mariage", lieu: "", date_evenement: "", description: "", photos: [], publie: false, ordre: 0 });

/** Photo réduite à 1800 px de large maximum, en JPEG, pour un site rapide. */
async function preparerPhoto(f: File): Promise<Blob> {
  const img = await createImageBitmap(f);
  const k = Math.min(1, 1800 / Math.max(img.width, img.height));
  const c = document.createElement("canvas");
  c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
  c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
  return await new Promise<Blob>((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error("Image illisible"))), "image/jpeg", 0.82));
}

/** Admin : les réalisations affichées sur la page publique « Réalisations » (vraies photos uniquement). */
export default function RealisationsAdmin() {
  const { toast } = useToast();
  const [liste, setListe] = useState<(Realisation & { id: string })[]>([]);
  const [form, setForm] = useState<Realisation | null>(null);
  const [envoi, setEnvoi] = useState(false);
  const fichier = useRef<HTMLInputElement>(null);

  const charger = async () => {
    const { data } = await supabase.from("realisations").select("*").order("ordre").order("created_at", { ascending: false });
    setListe((data ?? []).map((r: any) => ({ ...r, lieu: r.lieu ?? "", date_evenement: r.date_evenement ?? "", description: r.description ?? "" })));
  };
  useEffect(() => { charger(); }, []);

  const ajouterPhotos = async (fichiers: FileList | null) => {
    if (!fichiers?.length || !form) return;
    setEnvoi(true);
    const urls: string[] = [];
    for (const f of Array.from(fichiers).slice(0, 20)) {
      if (!f.type.startsWith("image/")) continue;
      try {
        const blob = await preparerPhoto(f);
        const chemin = `realisations/${crypto.randomUUID()}.jpg`;
        const { error } = await supabase.storage.from("assets").upload(chemin, blob, { contentType: "image/jpeg", cacheControl: "31536000" });
        if (error) throw error;
        urls.push(supabase.storage.from("assets").getPublicUrl(chemin).data.publicUrl);
      } catch (e: any) {
        toast({ title: `Photo non ajoutée : ${f.name}`, description: e.message, variant: "destructive" });
      }
    }
    setForm((x) => (x ? { ...x, photos: [...x.photos, ...urls] } : x));
    setEnvoi(false);
    if (fichier.current) fichier.current.value = "";
  };

  const deplacerPhoto = (i: number, d: -1 | 1) => setForm((x) => {
    if (!x) return x; const p = [...x.photos]; const j = i + d; if (j < 0 || j >= p.length) return x;
    [p[i], p[j]] = [p[j], p[i]]; return { ...x, photos: p };
  });

  const enregistrer = async () => {
    if (!form) return;
    if (!form.titre.trim()) { toast({ title: "Ajoute un titre", variant: "destructive" }); return; }
    if (form.publie && form.photos.length === 0) { toast({ title: "Ajoute au moins une photo avant de publier", variant: "destructive" }); return; }
    const payload = { titre: form.titre.trim(), type_evenement: form.type_evenement, lieu: form.lieu.trim() || null, date_evenement: form.date_evenement || null,
      description: form.description.trim() || null, photos: form.photos, publie: form.publie, ordre: form.ordre || 0 };
    const { error } = form.id ? await supabase.from("realisations").update(payload).eq("id", form.id) : await supabase.from("realisations").insert(payload);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    toast({ title: form.publie ? "Réalisation publiée sur le site" : "Réalisation enregistrée (non publiée)" });
    setForm(null); charger();
  };

  const supprimer = async (r: Realisation & { id: string }) => {
    if (!confirm(`Supprimer « ${r.titre} » et ses photos ?`)) return;
    const { error } = await supabase.from("realisations").delete().eq("id", r.id);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    const chemins = r.photos.map((u) => u.split("/assets/")[1]).filter(Boolean);
    if (chemins.length) await supabase.storage.from("assets").remove(chemins);
    charger();
  };

  if (form) {
    return (
      <Card data-testid="form-realisation">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">{form.id ? "Modifier la réalisation" : "Nouvelle réalisation"}</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setForm(null)} aria-label="Fermer"><X className="h-4 w-4" /></Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2"><Label>Titre</Label><Input value={form.titre} placeholder="Ex. Mariage de Salma & Karim" onChange={(e) => setForm({ ...form, titre: e.target.value })} /></div>
            <div>
              <Label>Type</Label>
              <Select value={form.type_evenement} onValueChange={(v) => setForm({ ...form, type_evenement: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{TYPES_REALISATION.map((t) => <SelectItem key={t.id} value={t.id}>{t.nom}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Lieu</Label><Input value={form.lieu} placeholder="Ex. Palais des Congrès, Marrakech" onChange={(e) => setForm({ ...form, lieu: e.target.value })} /></div>
            <div><Label>Date</Label><Input type="date" value={form.date_evenement} onChange={(e) => setForm({ ...form, date_evenement: e.target.value })} /></div>
            <div><Label>Ordre d'affichage</Label><Input type="number" value={form.ordre} onChange={(e) => setForm({ ...form, ordre: Number(e.target.value) || 0 })} /></div>
            <div className="sm:col-span-2"><Label>Quelques mots (facultatif)</Label><Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Photos ({form.photos.length}) — la première sert de couverture</Label>
              <Button variant="outline" size="sm" onClick={() => fichier.current?.click()} disabled={envoi}><ImagePlus className="h-4 w-4 mr-1" /> {envoi ? "Envoi…" : "Ajouter des photos"}</Button>
              <input ref={fichier} type="file" accept="image/*" multiple className="hidden" data-testid="photos-realisation" onChange={(e) => ajouterPhotos(e.target.files)} />
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {form.photos.map((u, i) => (
                <div key={u} className="relative group rounded-md overflow-hidden border">
                  <img src={u} alt="" className="aspect-square w-full object-cover" loading="lazy" />
                  {i === 0 && <span className="absolute top-1 left-1 rounded bg-black/70 text-white text-[10px] px-1.5">Couverture</span>}
                  <div className="absolute inset-x-0 bottom-0 flex justify-between bg-black/50 p-0.5">
                    <button className="text-white p-1" onClick={() => deplacerPhoto(i, -1)} aria-label="Avancer"><ArrowUp className="h-3.5 w-3.5 -rotate-90" /></button>
                    <button className="text-white p-1" onClick={() => setForm({ ...form, photos: form.photos.filter((x) => x !== u) })} aria-label="Retirer"><Trash2 className="h-3.5 w-3.5" /></button>
                    <button className="text-white p-1" onClick={() => deplacerPhoto(i, 1)} aria-label="Reculer"><ArrowDown className="h-3.5 w-3.5 -rotate-90" /></button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Uniquement vos vraies photos d'événements. Elles sont réduites automatiquement pour que le site reste rapide.</p>
          </div>
          <label className="flex items-center gap-3"><Switch checked={form.publie} onCheckedChange={(v) => setForm({ ...form, publie: v })} /> <span className="text-sm">Publier sur la page « Réalisations »</span></label>
          <Button onClick={enregistrer} disabled={envoi}><Save className="h-4 w-4 mr-1" /> Enregistrer</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <div>
          <CardTitle className="text-base">Réalisations</CardTitle>
          <p className="text-sm text-muted-foreground">Vos événements en photos, visibles sur la page publique « Réalisations ». Le lien apparaît dans le menu du site dès qu'une réalisation est publiée.</p>
        </div>
        <Button onClick={() => setForm(vide())}><Plus className="h-4 w-4 mr-1" /> Ajouter</Button>
      </CardHeader>
      <CardContent>
        {liste.length === 0 ? <p className="text-sm text-muted-foreground py-6 text-center">Aucune réalisation pour l'instant.</p> : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {liste.map((r) => (
              <div key={r.id} className="rounded-lg border overflow-hidden">
                <button className="block w-full text-left" onClick={() => setForm(r)}>
                  {r.photos[0] ? <img src={r.photos[0]} alt="" className="aspect-[4/3] w-full object-cover" loading="lazy" /> : <div className="aspect-[4/3] bg-muted grid place-items-center text-xs text-muted-foreground">Sans photo</div>}
                  <div className="p-3">
                    <div className="font-medium">{r.titre}</div>
                    <div className="text-xs text-muted-foreground">{TYPES_REALISATION.find((t) => t.id === r.type_evenement)?.nom} · {r.photos.length} photo{r.photos.length > 1 ? "s" : ""}</div>
                  </div>
                </button>
                <div className="flex items-center justify-between px-3 pb-3">
                  <span className={`text-xs rounded-full px-2 py-0.5 ${r.publie ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700"}`}>{r.publie ? "Publiée" : "Brouillon"}</span>
                  <Button variant="ghost" size="icon" onClick={() => supprimer(r)} aria-label="Supprimer"><Trash2 className="h-4 w-4 text-red-600" /></Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
