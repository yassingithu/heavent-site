import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { idAleatoire, reduirePhoto } from "@/lib/photos";
import { ChevronDown, ImagePlus, Loader2, MapPin, Phone, Plus, Save, Trash2, Users, X } from "lucide-react";

/** Salles, palais, riads, jardins… avec leurs tarifs et leur localisation. Chaque tarif devient une ligne du catalogue des devis. */
interface Tarif { libelle: string; unite: string; prix: number }
interface Lieu {
  id: string; nom: string; type: string; ville: string | null; adresse: string | null; latitude: number | null; longitude: number | null; lien_maps: string | null;
  capacite_min: number | null; capacite_max: number | null; tarifs: Tarif[]; description: string | null; contact_nom: string | null; contact_telephone: string | null;
  contact_email: string | null; photos: string[]; notes: string | null; actif: boolean; cree_le?: string;
}
const TYPES = [["salle", "Salle des fêtes"], ["palais", "Palais"], ["riad", "Riad"], ["hotel", "Hôtel"], ["jardin", "Jardin / plein air"], ["villa", "Villa"], ["restaurant", "Restaurant"], ["autre", "Autre"]];
const UNITES = [["forfait", "Forfait"], ["jour", "Par jour"], ["personne", "Par personne"], ["heure", "Par heure"]];
const BUCKET = "prestataires";
const url = (c: string) => supabase.storage.from(BUCKET).getPublicUrl(c).data.publicUrl;
const mad = (n: number) => `${new Intl.NumberFormat("fr-FR").format(Number(n) || 0)} MAD`;

/** Coordonnées lues dans un lien Google Maps (…@33.97,-6.85… ou ?q=33.97,-6.85) */
export function coordonneesDepuisLien(lien: string): [number, number] | null {
  const m = lien.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/) ?? lien.match(/[?&](?:q|query|ll)=(-?\d+\.\d+),\s*(-?\d+\.\d+)/) ?? lien.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
  return m ? [Number(m[1]), Number(m[2])] : null;
}
const lienCarte = (l: Lieu) => l.lien_maps || (l.latitude != null && l.longitude != null ? `https://www.google.com/maps?q=${l.latitude},${l.longitude}` : l.adresse ? `https://www.google.com/maps/search/${encodeURIComponent([l.nom, l.adresse, l.ville].filter(Boolean).join(", "))}` : null);

export default function LieuxAdmin() {
  const { toast } = useToast();
  const [lieux, setLieux] = useState<Lieu[]>([]);
  const [charge, setCharge] = useState(true);
  const [ouvert, setOuvert] = useState<string | null>(null);
  const [ville, setVille] = useState("");

  const charger = async () => {
    setCharge(true);
    const { data } = await (supabase as any).from("lieux").select("*").order("ville").order("nom");
    setLieux((data ?? []).map((l: Lieu) => ({ ...l, photos: l.photos ?? [], tarifs: l.tarifs ?? [], actif: l.actif !== false }))); setCharge(false);
  };
  useEffect(() => { charger(); }, []);
  const ajouter = async () => {
    const { data, error } = await (supabase as any).from("lieux").insert({ nom: "Nouveau lieu", type: "salle", photos: [], actif: true, tarifs: [{ libelle: "Location de la salle", unite: "jour", prix: 0 }] }).select().single();
    if (error) return toast({ title: "Impossible d'ajouter", description: error.message, variant: "destructive" });
    await charger(); setOuvert(data.id);
  };
  const villes = [...new Set(lieux.map((l) => l.ville).filter(Boolean))] as string[];
  const visibles = lieux.filter((l) => !ville || l.ville === ville);

  return (
    <div className="space-y-4" data-testid="lieux-admin">
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={() => setVille("")} className={`rounded-full px-4 h-9 text-sm border ${!ville ? "bg-[#141414] text-white" : "bg-white"}`}>Toutes les villes <span className="opacity-60">{lieux.length}</span></button>
        {villes.map((v) => <button key={v} onClick={() => setVille(v)} className={`rounded-full px-4 h-9 text-sm border ${ville === v ? "bg-[#141414] text-white" : "bg-white"}`}>{v}</button>)}
        <button onClick={ajouter} className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-[#C8B560] text-[#141414] px-4 h-9 text-sm font-medium" data-testid="ajouter-lieu"><Plus className="h-4 w-4" /> Ajouter un lieu</button>
      </div>
      <p className="text-xs text-muted-foreground">Chaque tarif d'un lieu actif apparaît dans le catalogue des devis (catégorie « lieux »). Collez un lien Google Maps : la position est reprise automatiquement.</p>
      {charge ? <Loader2 className="h-6 w-6 animate-spin text-[#A8933F]" /> : visibles.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-[#DCCBA6] bg-white p-8 text-center text-sm text-muted-foreground">Aucun lieu pour l'instant. Ajoutez vos salles, palais et riads partenaires.</p>
      ) : <div className="grid gap-3">{visibles.map((l) => <FicheLieu key={l.id} l={l} ouvert={ouvert === l.id} onOuvrir={() => setOuvert(ouvert === l.id ? null : l.id)} onChange={charger} />)}</div>}
    </div>
  );
}

function FicheLieu({ l, ouvert, onOuvrir, onChange }: { l: Lieu; ouvert: boolean; onOuvrir: () => void; onChange: () => void }) {
  const { toast } = useToast();
  const [f, setF] = useState<Lieu>(l);
  const [occupe, setOccupe] = useState(false);
  useEffect(() => { setF(l); }, [l]);
  const modifie = JSON.stringify(f) !== JSON.stringify(l);
  const champ = "w-full rounded-md border px-3 h-9 text-sm bg-white";
  const carte = lienCarte(f);
  const num = (v: string) => (v === "" ? null : Number(v));

  const enregistrer = async (extra: Partial<Lieu> = {}) => {
    setOccupe(true);
    const { id, cree_le, ...reste } = { ...f, ...extra };
    const { error } = await (supabase as any).from("lieux").update(reste).eq("id", id);
    setOccupe(false);
    if (error) return toast({ title: "Non enregistré", description: error.message, variant: "destructive" });
    toast({ title: "Lieu enregistré ✓", description: (extra.actif ?? f.actif) ? "Ses tarifs sont dans le catalogue des devis." : "Retiré du catalogue des devis." });
    onChange();
  };
  const ajouterPhotos = async (fichiers: FileList | null) => {
    if (!fichiers?.length) return;
    setOccupe(true);
    const nouvelles: string[] = [];
    for (const fi of [...fichiers].slice(0, 10)) {
      const c = `lieux/${f.id}/${idAleatoire()}.jpg`;
      const { error } = await supabase.storage.from(BUCKET).upload(c, await reduirePhoto(fi), { contentType: "image/jpeg" });
      if (!error) nouvelles.push(c);
    }
    setF({ ...f, photos: [...f.photos, ...nouvelles] }); setOccupe(false);
  };
  const setTarif = (i: number, v: Partial<Tarif>) => setF({ ...f, tarifs: f.tarifs.map((t, k) => (k === i ? { ...t, ...v } : t)) });

  return (
    <div className={`rounded-2xl border bg-white overflow-hidden ${f.actif ? "border-[#EADFC8]" : "border-dashed opacity-75"}`} data-testid="fiche-lieu">
      <button onClick={onOuvrir} className="w-full flex items-center gap-3 p-3 sm:p-4 text-left">
        <div className="h-14 w-20 rounded-lg bg-[#FBF8F1] overflow-hidden shrink-0 grid place-items-center">{l.photos[0] ? <img src={url(l.photos[0])} alt="" className="h-full w-full object-cover" /> : <MapPin className="h-5 w-5 text-[#A8933F]" />}</div>
        <div className="flex-1 min-w-0">
          <div className="font-medium truncate">{l.nom} <span className="text-xs text-muted-foreground font-normal">· {TYPES.find((t) => t[0] === l.type)?.[1] ?? l.type}{l.ville ? ` · ${l.ville}` : ""}</span>{!l.actif && <span className="ml-2 text-[11px] rounded-full bg-zinc-200 px-2">inactif</span>}</div>
          <div className="text-xs text-muted-foreground truncate">{l.capacite_max ? `${l.capacite_min ? l.capacite_min + "–" : "jusqu'à "}${l.capacite_max} pers. · ` : ""}{l.tarifs.map((t) => `${t.libelle} ${mad(t.prix)}`).join(" · ")}</div>
        </div>
        <ChevronDown className={`h-5 w-5 text-[#A8933F] transition ${ouvert ? "rotate-180" : ""}`} />
      </button>
      {ouvert && (
        <div className="border-t border-[#F1ECDD] p-3 sm:p-4 space-y-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
            <label className="text-[11px] text-muted-foreground lg:col-span-2">Nom<input className={champ} value={f.nom} onChange={(e) => setF({ ...f, nom: e.target.value })} data-testid="lieu-nom" /></label>
            <label className="text-[11px] text-muted-foreground">Type<select className={champ} value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })}>{TYPES.map(([v, t]) => <option key={v} value={v}>{t}</option>)}</select></label>
            <label className="text-[11px] text-muted-foreground">Ville<input className={champ} value={f.ville ?? ""} onChange={(e) => setF({ ...f, ville: e.target.value })} data-testid="lieu-ville" /></label>
            <label className="text-[11px] text-muted-foreground lg:col-span-2">Adresse<input className={champ} value={f.adresse ?? ""} onChange={(e) => setF({ ...f, adresse: e.target.value })} /></label>
            <label className="text-[11px] text-muted-foreground lg:col-span-2">Lien Google Maps<input className={champ} value={f.lien_maps ?? ""} placeholder="Collez le lien « Partager » de Google Maps"
              onChange={(e) => { const c = coordonneesDepuisLien(e.target.value); setF({ ...f, lien_maps: e.target.value, ...(c ? { latitude: c[0], longitude: c[1] } : {}) }); }} data-testid="lieu-maps" /></label>
            <label className="text-[11px] text-muted-foreground">Latitude<input className={champ} type="number" step="any" value={f.latitude ?? ""} onChange={(e) => setF({ ...f, latitude: num(e.target.value) })} /></label>
            <label className="text-[11px] text-muted-foreground">Longitude<input className={champ} type="number" step="any" value={f.longitude ?? ""} onChange={(e) => setF({ ...f, longitude: num(e.target.value) })} /></label>
            <label className="text-[11px] text-muted-foreground">Capacité min<input className={champ} type="number" value={f.capacite_min ?? ""} onChange={(e) => setF({ ...f, capacite_min: num(e.target.value) })} /></label>
            <label className="text-[11px] text-muted-foreground">Capacité max<input className={champ} type="number" value={f.capacite_max ?? ""} onChange={(e) => setF({ ...f, capacite_max: num(e.target.value) })} /></label>
          </div>
          {f.latitude != null && f.longitude != null && (
            <iframe title="Carte" className="w-full h-56 rounded-xl border" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${f.longitude - 0.01}%2C${f.latitude - 0.006}%2C${f.longitude + 0.01}%2C${f.latitude + 0.006}&layer=mapnik&marker=${f.latitude}%2C${f.longitude}`} />
          )}
          {carte && <a href={carte} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-[#8C6D22]"><MapPin className="h-4 w-4" /> Ouvrir dans Google Maps</a>}

          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Tarifs (deviennent des lignes de devis)</div>
            <div className="space-y-2">
              {f.tarifs.map((t, i) => (
                <div key={i} className="grid grid-cols-[1fr_auto] sm:grid-cols-[1.6fr_0.8fr_0.8fr_auto] gap-2 items-center rounded-lg bg-[#FBF8F1] p-2" data-testid="lieu-tarif">
                  <input className={`${champ} col-span-2 sm:col-span-1`} value={t.libelle} placeholder="Ex. Location samedi soir" onChange={(e) => setTarif(i, { libelle: e.target.value })} />
                  <select className={champ} value={t.unite} onChange={(e) => setTarif(i, { unite: e.target.value })}>{UNITES.map(([v, x]) => <option key={v} value={v}>{x}</option>)}</select>
                  <input className={champ} type="number" value={t.prix} onChange={(e) => setTarif(i, { prix: Number(e.target.value) })} placeholder="MAD" data-testid="lieu-prix" />
                  <button onClick={() => setF({ ...f, tarifs: f.tarifs.filter((_, k) => k !== i) })} className="h-9 w-9 grid place-items-center text-muted-foreground hover:text-red-700" aria-label="Retirer"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
              <button onClick={() => setF({ ...f, tarifs: [...f.tarifs, { libelle: "", unite: "forfait", prix: 0 }] })} className="text-sm text-[#8C6D22] inline-flex items-center gap-1"><Plus className="h-4 w-4" /> Ajouter un tarif</button>
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Photos</div>
            <div className="flex flex-wrap gap-2">
              {f.photos.map((ph) => (
                <div key={ph} className="relative h-24 w-32 rounded-xl overflow-hidden border">
                  <img src={url(ph)} alt="" className="h-full w-full object-cover" loading="lazy" />
                  <button onClick={() => setF({ ...f, photos: f.photos.filter((x) => x !== ph) })} className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/60 text-white grid place-items-center" aria-label="Retirer"><X className="h-3.5 w-3.5" /></button>
                </div>
              ))}
              <label className="cursor-pointer h-24 w-32 rounded-xl border-2 border-dashed border-[#DCCBA6] grid place-items-center bg-[#FBF8F1]">
                <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => { ajouterPhotos(e.target.files); e.target.value = ""; }} />
                <ImagePlus className="h-5 w-5 text-[#A8933F]" />
              </label>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-2">
            <label className="text-[11px] text-muted-foreground"><Users className="inline h-3 w-3" /> Contact<input className={champ} value={f.contact_nom ?? ""} onChange={(e) => setF({ ...f, contact_nom: e.target.value })} /></label>
            <label className="text-[11px] text-muted-foreground"><Phone className="inline h-3 w-3" /> Téléphone<input className={champ} value={f.contact_telephone ?? ""} onChange={(e) => setF({ ...f, contact_telephone: e.target.value })} /></label>
            <label className="text-[11px] text-muted-foreground">E-mail<input className={champ} value={f.contact_email ?? ""} onChange={(e) => setF({ ...f, contact_email: e.target.value })} /></label>
          </div>
          <label className="block text-[11px] text-muted-foreground">Description (visible dans le devis)<textarea className={`${champ} h-20 py-2`} value={f.description ?? ""} onChange={(e) => setF({ ...f, description: e.target.value })} /></label>
          <label className="block text-[11px] text-muted-foreground">Notes internes<textarea className={`${champ} h-16 py-2`} value={f.notes ?? ""} onChange={(e) => setF({ ...f, notes: e.target.value })} /></label>

          <div className="flex flex-wrap items-center gap-2">
            <button disabled={!modifie || occupe} onClick={() => enregistrer()} className="inline-flex items-center gap-1.5 rounded-full bg-[#141414] text-white px-4 h-9 text-sm disabled:opacity-40" data-testid="enregistrer-lieu"><Save className="h-4 w-4" /> Enregistrer</button>
            <button disabled={occupe} onClick={() => enregistrer({ actif: !f.actif })} className="inline-flex items-center gap-1.5 rounded-full border px-4 h-9 text-sm">{f.actif ? "Désactiver (retirer des devis)" : "Réactiver"}</button>
            {occupe && <Loader2 className="h-4 w-4 animate-spin" />}
          </div>
        </div>
      )}
    </div>
  );
}
