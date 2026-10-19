import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowDown, ArrowUp, Plus, Save, Star, Trash2, Upload } from "lucide-react";
import { ENGAGEMENTS, chargerVitrine } from "@/components/vitrine/Confiance";

/**
 * Site vitrine → « Pourquoi nous faire confiance » : chiffres clés, note Google, engagements, FAQ,
 * logos de clients et témoignages. Rien n'est inventé : chaque bloc n'apparaît sur le site que s'il est rempli ici.
 */
interface V {
  annees_experience: number | null; nb_evenements: number | null; nb_crews: number | null;
  google_note: number | null; google_nb_avis: number | null; google_lien: string | null;
  engagement_cnss: boolean; engagement_assurance: boolean; engagement_remplacement: boolean; engagement_reponse_24h: boolean;
  faq: { q: string; r: string }[];
}
interface Ref { id: string; nom: string; logo: string | null; site_web: string | null; ordre: number; publie: boolean }
interface Tem { id: string; auteur: string; contexte: string | null; texte: string; note: number | null; publie: boolean; ordre: number; devis_id: string | null }
interface AvisDispo { id: string; client_nom: string; titre: string | null; avis_note: number; avis_commentaire: string | null }

const CHAMP_ENGAGEMENT: Record<string, keyof V> = { cnss: "engagement_cnss", assurance: "engagement_assurance", remplacement: "engagement_remplacement", reponse24h: "engagement_reponse_24h" };
const num = (s: string) => (s.trim() === "" ? null : Number(s.replace(",", ".")));
/** « Yasmine Berrada » → « Yasmine B. » */
export const auteurAnonyme = (nom: string) => { const [p, ...r] = nom.trim().split(/\s+/); return r.length ? `${p} ${r[r.length - 1].charAt(0).toUpperCase()}.` : p; };

export default function VitrineAdmin() {
  const { toast } = useToast();
  const sb = supabase as any;
  const [v, setV] = useState<V | null>(null);
  const [refs, setRefs] = useState<Ref[]>([]);
  const [tems, setTems] = useState<Tem[]>([]);
  const [avis, setAvis] = useState<AvisDispo[]>([]);
  const [nouveauRef, setNouveauRef] = useState({ nom: "", site: "" });

  const charger = async () => {
    const [a, b, c, d] = await Promise.all([
      sb.from("vitrine").select("*").eq("id", 1).maybeSingle(),
      sb.from("references_clients").select("*").order("ordre").order("nom"),
      sb.from("temoignages").select("*").order("ordre").order("created_at", { ascending: false }),
      sb.from("devis").select("id, client_nom, titre, avis_note, avis_commentaire").eq("avis_publiable", true).not("avis_commentaire", "is", null).gte("avis_note", 4),
    ]);
    setV(a.data ? { ...a.data, faq: a.data.faq ?? [] } : null);
    setRefs(b.data ?? []);
    setTems(c.data ?? []);
    const dejaPublies = new Set((c.data ?? []).map((t: Tem) => t.devis_id));
    setAvis((d.data ?? []).filter((x: AvisDispo) => !dejaPublies.has(x.id)));
  };
  useEffect(() => { charger(); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const ok = (titre: string) => { toast({ title: titre }); chargerVitrine(true); };
  const ko = (e: any) => toast({ title: "Erreur", description: e?.message ?? String(e), variant: "destructive" });

  const enregistrer = async () => {
    if (!v) return;
    if (v.google_note != null && (v.google_note < 1 || v.google_note > 5)) { toast({ title: "La note Google doit être entre 1 et 5", variant: "destructive" }); return; }
    const { error } = await sb.from("vitrine").update({ ...v, faq: v.faq.filter((x) => x.q.trim() && x.r.trim()), updated_at: new Date().toISOString() }).eq("id", 1);
    error ? ko(error) : ok("Enregistré ✅ — visible tout de suite sur le site");
  };

  const ajouterRef = async (fichier?: File) => {
    if (!nouveauRef.nom.trim()) { toast({ title: "Indique le nom du client", variant: "destructive" }); return; }
    let logo: string | null = null;
    if (fichier) {
      const ext = (fichier.name.split(".").pop() || "png").toLowerCase();
      logo = `references/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("assets").upload(logo, fichier, { contentType: fichier.type, cacheControl: "31536000" });
      if (error) return ko(error);
    }
    const { error } = await sb.from("references_clients").insert({ nom: nouveauRef.nom.trim(), site_web: nouveauRef.site.trim() || null, logo, ordre: refs.length });
    if (error) return ko(error);
    setNouveauRef({ nom: "", site: "" }); ok("Client ajouté"); charger();
  };
  const supprimerRef = async (r: Ref) => {
    if (!confirm(`Retirer ${r.nom} des références ?`)) return;
    if (r.logo) await supabase.storage.from("assets").remove([r.logo]);
    await sb.from("references_clients").delete().eq("id", r.id); ok("Référence retirée"); charger();
  };
  const majRef = async (r: Ref, patch: Partial<Ref>) => { await sb.from("references_clients").update(patch).eq("id", r.id); chargerVitrine(true); charger(); };

  const publierAvis = async (a: AvisDispo) => {
    const { error } = await sb.from("temoignages").insert({ auteur: auteurAnonyme(a.client_nom), contexte: a.titre, texte: (a.avis_commentaire ?? "").split("\n(Traduit automatiquement")[0], note: a.avis_note, devis_id: a.id, publie: true, ordre: 0 });
    error ? ko(error) : (ok("Témoignage publié sur le site"), charger());
  };
  const majTem = async (t: Tem, patch: Partial<Tem>) => { await sb.from("temoignages").update(patch).eq("id", t.id); chargerVitrine(true); charger(); };
  const ajouterTem = async () => {
    const { error } = await sb.from("temoignages").insert({ auteur: "Prénom N.", texte: "Texte du témoignage (avec l'accord du client)", publie: false, ordre: tems.length });
    error ? ko(error) : charger();
  };

  if (!v) return null;
  const set = <K extends keyof V>(k: K, val: V[K]) => setV({ ...v, [k]: val });
  const majFaq = (i: number, patch: Partial<{ q: string; r: string }>) => set("faq", v.faq.map((x, j) => (j === i ? { ...x, ...patch } : x)));
  const deplacerFaq = (i: number, d: -1 | 1) => { const f = [...v.faq]; const j = i + d; if (j < 0 || j >= f.length) return; [f[i], f[j]] = [f[j], f[i]]; set("faq", f); };

  return (
    <div className="space-y-4" data-testid="vitrine-admin">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">« Pourquoi nous faire confiance » sur le site</CardTitle>
          <p className="text-xs text-muted-foreground">Affiché sur l'accueil et sur les pages villes / services. Chaque élément n'apparaît que s'il est rempli ou coché : n'indique que ce qui est vrai et vérifiable.</p>
        </CardHeader>
        <CardContent className="space-y-5 text-sm">
          <div className="grid gap-3 sm:grid-cols-3">
            <div><Label className="text-xs">Années d'expérience</Label><Input type="number" min={0} value={v.annees_experience ?? ""} onChange={(e) => set("annees_experience", num(e.target.value))} data-testid="vitrine-annees" /></div>
            <div><Label className="text-xs">Événements réalisés (environ)</Label><Input type="number" min={0} value={v.nb_evenements ?? ""} onChange={(e) => set("nb_evenements", num(e.target.value))} /></div>
            <div><Label className="text-xs">Hôtesses et hôtes dans l'équipe</Label><Input type="number" min={0} value={v.nb_crews ?? ""} onChange={(e) => set("nb_crews", num(e.target.value))} /></div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div><Label className="text-xs">Note Google (ex. 4,9)</Label><Input inputMode="decimal" value={v.google_note ?? ""} onChange={(e) => set("google_note", num(e.target.value))} data-testid="vitrine-google-note" /></div>
            <div><Label className="text-xs">Nombre d'avis Google</Label><Input type="number" min={0} value={v.google_nb_avis ?? ""} onChange={(e) => set("google_nb_avis", num(e.target.value))} /></div>
            <div><Label className="text-xs">Lien vers vos avis Google</Label><Input value={v.google_lien ?? ""} onChange={(e) => set("google_lien", e.target.value || null)} placeholder="https://maps.app.goo.gl/…" /></div>
          </div>
          <div>
            <Label className="text-xs">Engagements à afficher (coche seulement ceux qui sont vrais)</Label>
            <div className="grid gap-2 sm:grid-cols-2 mt-1">
              {ENGAGEMENTS.map((e) => (
                <label key={e.cle} className="flex items-start gap-2 rounded-md border p-2 cursor-pointer">
                  <Switch checked={!!v[CHAMP_ENGAGEMENT[e.cle]]} onCheckedChange={(c) => set(CHAMP_ENGAGEMENT[e.cle], c as never)} data-testid={`engagement-${e.cle}`} />
                  <span><b>{e.titre}</b><br /><span className="text-xs text-muted-foreground">{e.texte}</span></span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Questions fréquentes (FAQ)</Label>
            {v.faq.map((x, i) => (
              <div key={i} className="rounded-md border p-2 space-y-1">
                <div className="flex gap-1">
                  <Input value={x.q} onChange={(e) => majFaq(i, { q: e.target.value })} placeholder="Question" className="font-medium" />
                  <Button size="icon" variant="ghost" onClick={() => deplacerFaq(i, -1)} title="Monter"><ArrowUp className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => deplacerFaq(i, 1)} title="Descendre"><ArrowDown className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => set("faq", v.faq.filter((_, j) => j !== i))} title="Supprimer"><Trash2 className="h-4 w-4 text-red-600" /></Button>
                </div>
                <Textarea rows={2} value={x.r} onChange={(e) => majFaq(i, { r: e.target.value })} placeholder="Réponse" />
              </div>
            ))}
            <Button size="sm" variant="outline" onClick={() => set("faq", [...v.faq, { q: "", r: "" }])}><Plus className="h-4 w-4 mr-1" /> Ajouter une question</Button>
          </div>
          <Button onClick={enregistrer} data-testid="enregistrer-vitrine"><Save className="h-4 w-4 mr-1" /> Enregistrer</Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Logos de clients (« Ils nous ont fait confiance »)</CardTitle>
            <p className="text-xs text-muted-foreground">Uniquement des clients réels, avec leur accord pour afficher leur logo.</p></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="grid gap-2 sm:grid-cols-2">
              <Input placeholder="Nom du client" value={nouveauRef.nom} onChange={(e) => setNouveauRef({ ...nouveauRef, nom: e.target.value })} data-testid="ref-nom" />
              <Input placeholder="Site web (facultatif)" value={nouveauRef.site} onChange={(e) => setNouveauRef({ ...nouveauRef, site: e.target.value })} />
            </div>
            <label className="inline-flex items-center gap-2 rounded-md border px-3 py-2 cursor-pointer hover:bg-muted/50">
              <Upload className="h-4 w-4" /> Choisir le logo et ajouter
              <input type="file" accept="image/png,image/svg+xml,image/jpeg,image/webp" className="hidden" data-testid="ref-logo" onChange={(e) => { const f = e.target.files?.[0]; if (f) ajouterRef(f); e.target.value = ""; }} />
            </label>
            {refs.map((r) => (
              <div key={r.id} className="flex items-center justify-between gap-2 border rounded-md p-2" data-testid="ref-ligne">
                <div className="flex items-center gap-3 min-w-0">
                  {r.logo ? <img src={supabase.storage.from("assets").getPublicUrl(r.logo).data.publicUrl} alt="" className="h-8 w-16 object-contain" /> : <span className="text-xs text-muted-foreground w-16">sans logo</span>}
                  <span className="truncate">{r.nom}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={r.publie} onCheckedChange={(c) => majRef(r, { publie: c })} title="Affiché sur le site" />
                  <Button size="icon" variant="ghost" onClick={() => supprimerRef(r)}><Trash2 className="h-4 w-4 text-red-600" /></Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Témoignages</CardTitle>
            <p className="text-xs text-muted-foreground">Les avis 4★ et 5★ que les clients ont accepté de publier apparaissent ici : un clic suffit pour les mettre sur le site (prénom + initiale).</p></CardHeader>
          <CardContent className="space-y-3 text-sm">
            {avis.map((a) => (
              <div key={a.id} className="rounded-md border border-[#ece6d3] bg-[#FAF7EE] p-2 space-y-1" data-testid="avis-publiable">
                <div className="flex items-center justify-between gap-2"><span><b>{auteurAnonyme(a.client_nom)}</b> · {a.titre} · <span className="text-[#A8933F]">{"★".repeat(a.avis_note)}</span></span>
                  <Button size="sm" onClick={() => publierAvis(a)} data-testid="publier-avis"><Star className="h-4 w-4 mr-1" /> Publier</Button></div>
                <div className="text-xs italic whitespace-pre-line">« {a.avis_commentaire} »</div>
              </div>
            ))}
            {tems.map((t) => (
              <div key={t.id} className="rounded-md border p-2 space-y-1" data-testid="temoignage-ligne">
                <div className="flex gap-2">
                  <Input defaultValue={t.auteur} onBlur={(e) => e.target.value !== t.auteur && majTem(t, { auteur: e.target.value })} className="h-8" />
                  <Input defaultValue={t.contexte ?? ""} placeholder="Contexte (ex. Mariage à Rabat)" onBlur={(e) => e.target.value !== (t.contexte ?? "") && majTem(t, { contexte: e.target.value || null })} className="h-8" />
                </div>
                <Textarea rows={2} defaultValue={t.texte} onBlur={(e) => e.target.value !== t.texte && majTem(t, { texte: e.target.value })} />
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs"><Switch checked={t.publie} onCheckedChange={(c) => majTem(t, { publie: c })} /> {t.publie ? "Publié sur le site" : "Non publié"}</label>
                  <Button size="icon" variant="ghost" onClick={async () => { if (confirm("Supprimer ce témoignage ?")) { await sb.from("temoignages").delete().eq("id", t.id); chargerVitrine(true); charger(); } }}><Trash2 className="h-4 w-4 text-red-600" /></Button>
                </div>
              </div>
            ))}
            <Button size="sm" variant="outline" onClick={ajouterTem}><Plus className="h-4 w-4 mr-1" /> Ajouter un témoignage reçu ailleurs</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
