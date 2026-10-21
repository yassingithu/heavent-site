import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { idAleatoire, reduirePhoto } from "@/lib/photos";
import { METIERS } from "@/pages/Prestataires";
import { Ban, Check, ChevronDown, Copy, ImagePlus, Loader2, Mail, MessageCircle, Plus, RefreshCw, Save, Trash2, X } from "lucide-react";

/**
 * Prestataires partenaires : candidatures reçues depuis /prestataires, validation, tarifs de vente.
 * Un prestataire validé apparaît automatiquement dans le catalogue des devis (catégorie « prestataires »).
 */
export interface Prestation { fonction: string; unite: string; prix: number; prix_vente?: number | null; description?: string }
export interface Prestataire {
  id: string; cree_le: string; societe: string; contact: string; email: string; telephone: string | null; ville: string | null; zones: string | null;
  categories: string[]; description: string | null; site_web: string | null; instagram: string | null; logo: string | null; photos: string[];
  prestations: Prestation[]; statut: string; email_confirme_le: string | null; valide_le: string | null; notes: string | null;
}
const BUCKET = "prestataires";
const url = (chemin: string | null) => (chemin ? supabase.storage.from(BUCKET).getPublicUrl(chemin).data.publicUrl : null);
const STATUTS: Record<string, [string, string]> = {
  en_attente: ["À valider", "bg-amber-100 text-amber-900"], valide: ["Validé", "bg-emerald-100 text-emerald-800"],
  email_a_confirmer: ["E-mail non confirmé", "bg-slate-100 text-slate-700"], refuse: ["Refusé", "bg-red-100 text-red-800"], suspendu: ["Suspendu", "bg-zinc-200 text-zinc-700"],
};
const FILTRES: [string, string, string[]][] = [["a_valider", "À valider", ["en_attente"]], ["valides", "Validés", ["valide"]], ["attente_mail", "E-mail non confirmé", ["email_a_confirmer"]], ["autres", "Refusés / suspendus", ["refuse", "suspendu"]]];
const UNITES: Record<string, string> = { forfait: "forfait", jour: "/ jour", heure: "/ heure", personne: "/ personne", unite: "/ unité" };
const mad = (n: number | null | undefined) => `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2 }).format(Number(n) || 0)} MAD`;

export default function PrestatairesAdmin() {
  const { toast } = useToast();
  const [liste, setListe] = useState<Prestataire[]>([]);
  const [charge, setCharge] = useState(true);
  const [filtre, setFiltre] = useState("a_valider");
  const [ouvert, setOuvert] = useState<string | null>(null);
  const [recherche, setRecherche] = useState("");

  const charger = async () => {
    setCharge(true);
    const { data } = await (supabase as any).from("prestataires").select("*").order("cree_le", { ascending: false });
    setListe((data ?? []).map((p: Prestataire) => ({ ...p, photos: p.photos ?? [], categories: p.categories ?? [], prestations: p.prestations ?? [] }))); setCharge(false);
  };
  useEffect(() => { charger(); }, []);

  const compte = (s: string[]) => liste.filter((p) => s.includes(p.statut)).length;
  const visibles = useMemo(() => {
    const st = FILTRES.find((x) => x[0] === filtre)?.[2] ?? [];
    const q = recherche.trim().toLowerCase();
    return liste.filter((p) => st.includes(p.statut) && (!q || [p.societe, p.contact, p.ville, ...(p.categories ?? []), ...p.prestations.map((x) => x.fonction)].join(" ").toLowerCase().includes(q)));
  }, [liste, filtre, recherche]);

  const ajouterManuel = async () => {
    const { data, error } = await (supabase as any).from("prestataires").insert({ photos: [], categories: [], societe: "Nouveau prestataire", contact: "—", email: "a-completer@heaventagency.com", statut: "en_attente", email_confirme_le: new Date().toISOString(),
      prestations: [{ fonction: "Prestation", unite: "forfait", prix: 0, prix_vente: 0 }] }).select().single();
    if (error) return toast({ title: "Impossible d'ajouter", description: error.message, variant: "destructive" });
    setFiltre("a_valider"); await charger(); setOuvert(data.id);
  };

  return (
    <div className="space-y-4" data-testid="prestataires-admin">
      <div className="flex flex-wrap items-center gap-2">
        {FILTRES.map(([k, t, s]) => (
          <button key={k} onClick={() => setFiltre(k)} className={`rounded-full px-4 h-9 text-sm border ${filtre === k ? "bg-[#141414] text-white border-[#141414]" : "bg-white border-[#EADFC8]"}`} data-testid={`filtre-${k}`}>
            {t} <span className="opacity-60">{compte(s)}</span>
          </button>
        ))}
        <input value={recherche} onChange={(e) => setRecherche(e.target.value)} placeholder="Rechercher (métier, ville…)" className="rounded-full border border-[#EADFC8] px-4 h-9 text-sm bg-white flex-1 min-w-[180px]" />
        <button onClick={charger} className="h-9 w-9 grid place-items-center rounded-full border bg-white" aria-label="Actualiser"><RefreshCw className="h-4 w-4" /></button>
        <button onClick={ajouterManuel} className="inline-flex items-center gap-1.5 rounded-full bg-[#C8B560] text-[#141414] px-4 h-9 text-sm font-medium" data-testid="ajouter-prestataire"><Plus className="h-4 w-4" /> Ajouter</button>
      </div>
      <p className="text-xs text-muted-foreground">Formulaire d'inscription à partager : <button className="underline" onClick={() => { navigator.clipboard?.writeText("https://heaventagency.com/prestataires"); toast({ title: "Lien copié ✓" }); }}>heaventagency.com/prestataires</button> · Un prestataire validé apparaît dans le catalogue des devis, au prix de vente que vous fixez.</p>

      {charge ? <Loader2 className="h-6 w-6 animate-spin text-[#A8933F]" /> : visibles.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-[#DCCBA6] bg-white p-8 text-center text-sm text-muted-foreground">Aucun prestataire dans cette liste.</p>
      ) : (
        <div className="space-y-3">
          {visibles.map((p) => <Fiche key={p.id} p={p} ouvert={ouvert === p.id} onOuvrir={() => setOuvert(ouvert === p.id ? null : p.id)} onChange={charger} />)}
        </div>
      )}
    </div>
  );
}

function Fiche({ p, ouvert, onOuvrir, onChange }: { p: Prestataire; ouvert: boolean; onOuvrir: () => void; onChange: () => void }) {
  const { toast } = useToast();
  const [f, setF] = useState<Prestataire>(p);
  const [occupe, setOccupe] = useState(false);
  const [prevenir, setPrevenir] = useState(true);
  const [marge, setMarge] = useState(20);
  useEffect(() => { setF(p); }, [p]);
  const modifie = JSON.stringify(f) !== JSON.stringify(p);
  const logo = url(f.logo);

  const enregistrer = async (extra: Partial<Prestataire> = {}) => {
    setOccupe(true);
    const { id, cree_le, ...reste } = { ...f, ...extra };
    const { error } = await (supabase as any).from("prestataires").update(reste).eq("id", id);
    setOccupe(false);
    if (error) { toast({ title: "Non enregistré", description: error.message, variant: "destructive" }); return false; }
    return true;
  };
  const decider = async (statut: "valide" | "refuse" | "suspendu") => {
    const prestations = statut === "valide" ? f.prestations.map((x) => ({ ...x, prix_vente: x.prix_vente ?? Math.round(x.prix * (1 + marge / 100)) })) : f.prestations;
    if (!(await enregistrer({ statut, prestations, valide_le: statut === "valide" ? new Date().toISOString() : f.valide_le }))) return;
    if (prevenir && !/a-completer@/.test(f.email)) {
      const { error } = await supabase.functions.invoke("prestataires", { body: { action: "decision", id: f.id, statut } });
      toast({ title: statut === "valide" ? "Prestataire validé ✓" : "Décision enregistrée", description: error ? "L'e-mail n'a pas pu partir." : "Le prestataire est prévenu par e-mail." });
    } else toast({ title: statut === "valide" ? "Prestataire validé ✓" : "Décision enregistrée" });
    onChange();
  };
  const ajouterPhotos = async (fichiers: FileList | null) => {
    if (!fichiers?.length) return;
    setOccupe(true);
    const chemins: string[] = [];
    for (const fi of [...fichiers].slice(0, 8)) {
      const chemin = `admin/${f.id}/${idAleatoire()}.jpg`;
      const { error } = await supabase.storage.from(BUCKET).upload(chemin, await reduirePhoto(fi), { contentType: "image/jpeg" });
      if (!error) chemins.push(chemin);
    }
    setF({ ...f, photos: [...f.photos, ...chemins] }); setOccupe(false);
  };
  const changerLogo = async (fi: File | undefined) => {
    if (!fi) return;
    const chemin = `admin/${f.id}/logo-${idAleatoire()}.png`;
    const { error } = await supabase.storage.from(BUCKET).upload(chemin, await reduirePhoto(fi, 800, "image/png"), { contentType: "image/png" });
    if (!error) setF({ ...f, logo: chemin });
  };
  const setPrest = (i: number, v: Partial<Prestation>) => setF({ ...f, prestations: f.prestations.map((x, k) => (k === i ? { ...x, ...v } : x)) });
  const champ = "w-full rounded-md border px-3 h-9 text-sm bg-white";

  return (
    <div className="rounded-2xl border border-[#EADFC8] bg-white overflow-hidden" data-testid="fiche-prestataire">
      <button onClick={onOuvrir} className="w-full flex items-center gap-3 p-3 sm:p-4 text-left">
        <div className="h-12 w-12 rounded-xl border border-[#F1ECDD] bg-[#FBF8F1] grid place-items-center overflow-hidden shrink-0">
          {logo ? <img src={logo} alt="" className="h-full w-full object-contain p-1" /> : <span className="font-serif text-lg text-[#A8933F]">{p.societe.charAt(0)}</span>}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium truncate">{p.societe} <span className={`ml-1 rounded-full px-2 py-0.5 text-[11px] ${STATUTS[p.statut]?.[1]}`}>{STATUTS[p.statut]?.[0]}</span></div>
          <div className="text-xs text-muted-foreground truncate">{[p.contact, p.ville, (p.categories ?? []).join(", ")].filter(Boolean).join(" · ")} · {p.prestations.length} prestation(s)</div>
        </div>
        <ChevronDown className={`h-5 w-5 text-[#A8933F] transition ${ouvert ? "rotate-180" : ""}`} />
      </button>

      {ouvert && (
        <div className="border-t border-[#F1ECDD] p-3 sm:p-4 space-y-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            <Champ l="Entreprise"><input className={champ} value={f.societe} onChange={(e) => setF({ ...f, societe: e.target.value })} /></Champ>
            <Champ l="Contact"><input className={champ} value={f.contact} onChange={(e) => setF({ ...f, contact: e.target.value })} /></Champ>
            <Champ l="E-mail"><input className={champ} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></Champ>
            <Champ l="Téléphone"><input className={champ} value={f.telephone ?? ""} onChange={(e) => setF({ ...f, telephone: e.target.value })} /></Champ>
            <Champ l="Ville"><input className={champ} value={f.ville ?? ""} onChange={(e) => setF({ ...f, ville: e.target.value })} /></Champ>
            <Champ l="Zones d'intervention"><input className={champ} value={f.zones ?? ""} onChange={(e) => setF({ ...f, zones: e.target.value })} /></Champ>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {METIERS.map((m) => { const a = (f.categories ?? []).includes(m); return <button key={m} onClick={() => setF({ ...f, categories: a ? f.categories.filter((x) => x !== m) : [...(f.categories ?? []), m] })} className={`rounded-full px-3 h-7 text-xs border ${a ? "bg-[#141414] text-white" : "bg-white"}`}>{m}</button>; })}
          </div>
          {f.description && <p className="text-sm whitespace-pre-line rounded-lg bg-[#FBF8F1] p-3">{f.description}</p>}
          <div className="flex flex-wrap gap-2 text-sm">
            {f.telephone && <a className="inline-flex items-center gap-1 rounded-full border px-3 h-8" href={`https://wa.me/${f.telephone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4 text-emerald-600" /> WhatsApp</a>}
            <a className="inline-flex items-center gap-1 rounded-full border px-3 h-8" href={`mailto:${f.email}`}><Mail className="h-4 w-4" /> E-mail</a>
            {f.instagram && <a className="inline-flex items-center gap-1 rounded-full border px-3 h-8" href={`https://instagram.com/${f.instagram.replace(/^@/, "")}`} target="_blank" rel="noreferrer">Instagram</a>}
            {f.site_web && <a className="inline-flex items-center gap-1 rounded-full border px-3 h-8" href={/^https?:/.test(f.site_web) ? f.site_web : `https://${f.site_web}`} target="_blank" rel="noreferrer">Site web</a>}
            <span className="text-xs text-muted-foreground self-center">Inscrit le {new Date(f.cree_le).toLocaleDateString("fr-FR")}{f.email_confirme_le ? " · e-mail confirmé" : " · e-mail non confirmé"}</span>
          </div>

          {/* Photos */}
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Logo et photos du matériel</div>
            <div className="flex flex-wrap gap-2">
              <label className="cursor-pointer h-24 w-24 rounded-xl border-2 border-dashed border-[#DCCBA6] grid place-items-center overflow-hidden bg-[#FBF8F1]" title="Changer le logo">
                <input type="file" accept="image/*" className="hidden" onChange={(e) => { changerLogo(e.target.files?.[0]); e.target.value = ""; }} />
                {logo ? <img src={logo} alt="logo" className="h-full w-full object-contain p-1" /> : <span className="text-[11px] text-muted-foreground">Logo</span>}
              </label>
              {f.photos.map((ph) => (
                <div key={ph} className="relative h-24 w-24 rounded-xl overflow-hidden border">
                  <a href={url(ph)!} target="_blank" rel="noreferrer"><img src={url(ph)!} alt="" className="h-full w-full object-cover" loading="lazy" /></a>
                  <button onClick={() => setF({ ...f, photos: f.photos.filter((x) => x !== ph) })} className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/60 text-white grid place-items-center" aria-label="Retirer"><X className="h-3.5 w-3.5" /></button>
                </div>
              ))}
              <label className="cursor-pointer h-24 w-24 rounded-xl border-2 border-dashed border-[#DCCBA6] grid place-items-center bg-[#FBF8F1]">
                <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => { ajouterPhotos(e.target.files); e.target.value = ""; }} />
                <ImagePlus className="h-5 w-5 text-[#A8933F]" />
              </label>
            </div>
          </div>

          {/* Prestations et tarifs */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Prestations · prix proposé → prix de vente au client</div>
              <label className="text-xs flex items-center gap-1.5">Marge par défaut <input type="number" value={marge} onChange={(e) => setMarge(Number(e.target.value) || 0)} className="w-14 rounded border px-1 h-7" /> %
                <button className="underline ml-1" onClick={() => setF({ ...f, prestations: f.prestations.map((x) => ({ ...x, prix_vente: Math.round(x.prix * (1 + marge / 100)) })) })}>appliquer</button></label>
            </div>
            <div className="space-y-2">
              {f.prestations.map((x, i) => (
                <div key={i} className="grid grid-cols-2 sm:grid-cols-[1.6fr_0.8fr_0.8fr_0.8fr_auto] gap-2 items-center rounded-lg bg-[#FBF8F1] p-2" data-testid="ligne-prestation">
                  <input className={`${champ} col-span-2 sm:col-span-1`} value={x.fonction} onChange={(e) => setPrest(i, { fonction: e.target.value })} />
                  <select className={champ} value={x.unite} onChange={(e) => setPrest(i, { unite: e.target.value })}>{Object.entries(UNITES).map(([k, v]) => <option key={k} value={k}>{k === "forfait" ? "Forfait" : v.replace("/ ", "par ")}</option>)}</select>
                  <label className="text-[11px] text-muted-foreground">Proposé<input className={champ} type="number" value={x.prix} onChange={(e) => setPrest(i, { prix: Number(e.target.value) })} /></label>
                  <label className="text-[11px] text-muted-foreground">Vente<input className={champ} type="number" value={x.prix_vente ?? ""} placeholder={String(Math.round(x.prix * (1 + marge / 100)))} onChange={(e) => setPrest(i, { prix_vente: e.target.value === "" ? null : Number(e.target.value) })} data-testid="prix-vente" /></label>
                  <button onClick={() => setF({ ...f, prestations: f.prestations.filter((_, k) => k !== i) })} className="h-9 w-9 grid place-items-center text-muted-foreground hover:text-red-700" aria-label="Retirer"><Trash2 className="h-4 w-4" /></button>
                  {x.description ? <p className="col-span-2 sm:col-span-5 text-xs text-muted-foreground">{x.description}</p> : null}
                </div>
              ))}
              <button onClick={() => setF({ ...f, prestations: [...f.prestations, { fonction: "", unite: "forfait", prix: 0 }] })} className="text-sm text-[#8C6D22] inline-flex items-center gap-1"><Plus className="h-4 w-4" /> Ajouter une prestation</button>
            </div>
          </div>
          <Champ l="Notes internes"><textarea className={`${champ} h-20 py-2`} value={f.notes ?? ""} onChange={(e) => setF({ ...f, notes: e.target.value })} /></Champ>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button disabled={!modifie || occupe} onClick={async () => { if (await enregistrer()) { toast({ title: "Enregistré ✓", description: f.statut === "valide" ? "Le catalogue des devis est à jour." : undefined }); onChange(); } }}
              className="inline-flex items-center gap-1.5 rounded-full border px-4 h-9 text-sm disabled:opacity-40"><Save className="h-4 w-4" /> Enregistrer</button>
            {f.statut !== "valide" && <button disabled={occupe} onClick={() => decider("valide")} className="inline-flex items-center gap-1.5 rounded-full bg-[#141414] text-white px-4 h-9 text-sm" data-testid="valider-prestataire"><Check className="h-4 w-4 text-[#E4D49A]" /> Valider et ajouter aux devis</button>}
            {f.statut === "valide" && <button disabled={occupe} onClick={() => decider("suspendu")} className="inline-flex items-center gap-1.5 rounded-full border px-4 h-9 text-sm"><Ban className="h-4 w-4" /> Suspendre</button>}
            {["en_attente", "email_a_confirmer"].includes(f.statut) && <button disabled={occupe} onClick={() => decider("refuse")} className="inline-flex items-center gap-1.5 rounded-full border px-4 h-9 text-sm text-red-700"><X className="h-4 w-4" /> Refuser</button>}
            <label className="text-xs flex items-center gap-1.5 ml-auto"><input type="checkbox" checked={prevenir} onChange={(e) => setPrevenir(e.target.checked)} /> Prévenir le prestataire par e-mail</label>
            {occupe && <Loader2 className="h-4 w-4 animate-spin" />}
          </div>
          {f.statut === "valide" && <p className="text-xs text-emerald-700 flex items-center gap-1"><Copy className="h-3.5 w-3.5" /> Dans le catalogue des devis : {f.prestations.map((x) => `${x.fonction} (${mad(x.prix_vente ?? x.prix)} ${UNITES[x.unite] ?? ""})`).join(" · ")}</p>}
        </div>
      )}
    </div>
  );
}

const Champ = ({ l, children }: { l: string; children: React.ReactNode }) => <label className="block text-[11px] text-muted-foreground space-y-1"><span>{l}</span>{children}</label>;
