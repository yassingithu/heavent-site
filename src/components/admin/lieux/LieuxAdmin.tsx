import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { idAleatoire, reduirePhoto } from "@/lib/photos";
import { useUrlsPrivees } from "@/lib/urlsPrivees";
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
  const [recherche, setRecherche] = useState("");
  const [repliees, setRepliees] = useState<string[]>([]);
  const [creation, setCreation] = useState(false);
  const [aMontrer, setAMontrer] = useState<string | null>(null);

  // La roue d'attente ne s'affiche qu'au premier chargement : après un enregistrement, la liste reste en place.
  const charger = async () => {
    const { data } = await (supabase as any).from("lieux").select("*").order("ville").order("nom");
    setLieux((data ?? []).map((l: Lieu) => ({ ...l, photos: l.photos ?? [], tarifs: l.tarifs ?? [], actif: l.actif !== false }))); setCharge(false);
  };
  useEffect(() => { charger(); }, []);

  const SANS_VILLE = "Sans ville";
  const sansAccent = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  // « Marrakech », « marrakech » et « Marrakech  » forment une seule ville.
  const SANS = "__sans";
  const cleDe = (v: string | null) => (v?.trim() ? sansAccent(v.trim().replace(/\s+/g, " ")) : SANS);
  const cleVille = (l: Lieu) => cleDe(l.ville);
  const nomVille: Record<string, string> = {};
  const nb: Record<string, number> = {};
  lieux.forEach((l) => { const k = cleVille(l); nomVille[k] ??= k !== SANS ? l.ville!.trim().replace(/\s+/g, " ") : SANS_VILLE; nb[k] = (nb[k] ?? 0) + 1; });
  // Les villes les plus fournies d'abord, « Sans ville » toujours en dernier.
  const cles = Object.keys(nb).sort((a, b) => (a === SANS ? 1 : b === SANS ? -1 : nb[b] - nb[a] || nomVille[a].localeCompare(nomVille[b], "fr")));
  const q = sansAccent(recherche.trim());
  const chiffres = recherche.replace(/\D/g, "");
  const numero = (v: string) => v.replace(/\D/g, "").replace(/^(00)?212/, "").replace(/^0/, "");
  const correspond = (l: Lieu) => {
    if (!q) return true;
    const texte = sansAccent([l.nom, l.adresse, l.ville, l.contact_nom, l.contact_email, l.contact_telephone, TYPES.find((t) => t[0] === l.type)?.[1]].filter(Boolean).join(" "));
    return texte.includes(q) || (chiffres.length >= 3 && numero(l.contact_telephone ?? "").includes(numero(chiffres)));
  };
  const visibles = lieux.filter((l) => (!ville || cleVille(l) === ville) && correspond(l));
  const groupes = cles.map((k) => ({ cle: k, ville: nomVille[k], items: visibles.filter((l) => cleVille(l) === k).sort((a, b) => a.nom.localeCompare(b.nom, "fr")) })).filter((g) => g.items.length);
  const basculer = (k: string) => q ? undefined : setRepliees((r) => (r.includes(k) ? r.filter((x) => x !== k) : [...r, k]));
  const villesConnues = Object.entries(nomVille).filter(([k]) => k !== SANS).map(([, v]) => v).sort((a, b) => a.localeCompare(b, "fr"));

  const ajouter = async () => {
    setCreation(true);
    // La nouvelle fiche prend la ville filtrée, pour qu'on la retrouve tout de suite.
    const villeActive = ville && ville !== SANS ? nomVille[ville] : null;
    const { data, error } = await (supabase as any).from("lieux").insert({ nom: "Nouveau lieu", type: "salle", ville: villeActive, photos: [], actif: true, tarifs: [{ libelle: "Location de la salle", unite: "jour", prix: 0 }] }).select().single();
    setCreation(false);
    if (error) return toast({ title: "Impossible d'ajouter", description: error.message, variant: "destructive" });
    setRecherche(""); setRepliees((r) => r.filter((x) => x !== cleDe(villeActive)));
    await charger(); setOuvert(data.id); setAMontrer(data.id);
  };
  // Quand une fiche change de place (nouveau lieu, ville modifiée), on déplie son groupe et on y va.
  const apresEnregistrement = async (id: string, villeFiche: string | null) => {
    const avant = lieux.find((x) => x.id === id);
    const cle = cleDe(villeFiche);
    const aBouge = !!avant && cleDe(avant.ville) !== cle;
    setRepliees((r) => r.filter((x) => x !== cle));
    if (aBouge && ville) setVille(cle);
    await charger(); if (aBouge) setAMontrer(id);
  };
  useEffect(() => {
    if (!aMontrer) return;
    const t = setTimeout(() => { document.getElementById(`lieu-${aMontrer}`)?.scrollIntoView({ behavior: "smooth", block: "start" }); setAMontrer(null); }, 80);
    return () => clearTimeout(t);
  }, [aMontrer, lieux]);

  return (
    <div className="space-y-4" data-testid="lieux-admin">
      <div className="flex flex-wrap items-center gap-2 ig">
        <div className="relative flex-1 min-w-[220px]">
          <input value={recherche} onChange={(e) => setRecherche(e.target.value)} placeholder="Chercher un lieu, une adresse, un numéro…" className="w-full border pl-4 pr-10 h-11 text-base sm:text-sm" data-testid="lieux-recherche" />
          {recherche && <button onClick={() => setRecherche("")} aria-label="Effacer la recherche" className="absolute right-1 top-1 h-9 w-9 grid place-items-center text-muted-foreground"><X className="h-4 w-4" /></button>}
        </div>
        <select value={ville} onChange={(e) => setVille(e.target.value)} aria-label="Ville" className="border px-3 h-11 text-base sm:text-sm min-w-[150px]" data-testid="lieux-ville-filtre">
          <option value="">Toutes les villes ({lieux.length})</option>
          {cles.map((k) => <option key={k} value={k}>{nomVille[k]} ({nb[k]})</option>)}
        </select>
        <button onClick={ajouter} disabled={creation} className="s-btn disabled:opacity-60" data-testid="ajouter-lieu"><Plus className="h-4 w-4 mr-1" /> Ajouter un lieu</button>
      </div>
      <div className="flex items-center gap-5 text-xs">
        <span className="a-st">{q || ville ? `${visibles.length} lieu${visibles.length > 1 ? "x" : ""}` : `${lieux.length} lieux`}</span>
        <button onClick={() => setRepliees(cles)} disabled={!!q} className="disabled:opacity-40 uppercase tracking-[.2em] text-[10.5px] font-medium text-[#7A5F1F] min-h-11">Tout replier</button>
        <button onClick={() => setRepliees([])} disabled={!!q} className="disabled:opacity-40 uppercase tracking-[.2em] text-[10.5px] font-medium text-[#7A5F1F] min-h-11">Tout déplier</button>
      </div>
      <p className="text-xs text-[#5b5547]">Chaque tarif d'un lieu actif apparaît dans le catalogue des devis (catégorie « lieux »). Collez un lien Google Maps : la position est reprise automatiquement.</p>
      {charge ? <Loader2 className="h-6 w-6 animate-spin text-[#A8933F]" /> : visibles.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#DCCBA6] bg-white p-8 text-center text-sm text-muted-foreground space-y-3">
          {!lieux.length ? <p>Aucun lieu pour l'instant. Ajoutez vos salles, palais et riads partenaires.</p>
            : ville && lieux.some((l) => correspond(l)) ? <><p>Rien {ville === SANS ? "sans ville" : `à ${nomVille[ville] ?? "cette ville"}`} pour cette recherche.</p><button onClick={() => setVille("")} className="rounded-full border px-4 h-10 bg-white text-[#141414]">Chercher dans toutes les villes</button></>
            : <p>Aucun lieu ne correspond à cette recherche.</p>}
        </div>
      ) : (
        <div className="flex flex-col">{groupes.map((g) => {
          const ferme = !q && repliees.includes(g.cle);
          return (
            <section key={g.cle} data-testid="groupe-ville" style={{ marginBottom: ferme ? 12 : 36 }}>
              <button onClick={() => basculer(g.cle)} className="w-full min-h-12 flex items-center gap-3 mb-2 text-left" aria-expanded={!ferme}>
                <span className="font-serif text-[22px] sm:text-[26px] leading-none text-[#141414]">{g.ville}</span>
                <span className="font-serif text-lg text-[#7A5F1F] tabular-nums">{String(g.items.length).padStart(2, "0")}</span>
                <span className="text-[11px] text-[#5b5547]">lieu{g.items.length > 1 ? "x" : ""}</span>
                <span className="flex-1 h-px" style={{ background: "linear-gradient(90deg,#DCCDAA,transparent)" }} />
                <span className="lx-signe" data-ferme={ferme} aria-hidden />
              </button>
              <div className="lx-corps" data-ferme={ferme} {...(ferme ? { inert: "" as any } : {})}><div className="grid gap-3">{g.items.map((l) => <FicheLieu key={l.id} l={l} villes={villesConnues} recherche={!!q} ouvert={ouvert === l.id} onOuvrir={() => setOuvert(ouvert === l.id ? null : l.id)} onChange={(v) => apresEnregistrement(l.id, v)} onSupprime={() => { setOuvert(null); charger(); }} />)}</div></div>
            </section>
          );
        })}</div>
      )}
    </div>
  );
}

function FicheLieu({ l, villes, recherche, ouvert, onOuvrir, onChange, onSupprime }: { l: Lieu; villes: string[]; recherche: boolean; ouvert: boolean; onOuvrir: () => void; onChange: (ville: string | null) => void; onSupprime: () => void }) {
  const { toast } = useToast();
  const [f, setF] = useState<Lieu>(l);
  const [occupe, setOccupe] = useState(false);
  const [confirmer, setConfirmer] = useState(false);
  const url = useUrlsPrivees(BUCKET, ouvert ? f.photos : l.photos.slice(0, 1));
  useEffect(() => { if (!ouvert) setConfirmer(false); }, [ouvert]);
  const blocConfirmation = (el: HTMLDivElement | null) => { el?.scrollIntoView({ block: "center", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); };
  const supprimer = async () => {
    setOccupe(true);
    const { error } = await (supabase as any).from("lieux").delete().eq("id", l.id);
    setOccupe(false);
    if (error) return toast({ title: "Suppression impossible", description: error.message, variant: "destructive" });
    // Les photos envoyées pour ce lieu sont retirées aussi (sans bloquer si elles n'existent plus).
    const chemins = (l.photos ?? []).filter((c) => c && !c.startsWith("http"));
    if (chemins.length) await supabase.storage.from(BUCKET).remove(chemins).catch(() => undefined);
    toast({ title: "Lieu supprimé", description: l.nom });
    onSupprime();
  };
  const vue = useRef(JSON.stringify(l));
  useEffect(() => { const j = JSON.stringify(l); if (j !== vue.current) { vue.current = j; setF(l); } }, [l]);
  const modifie = JSON.stringify(f) !== JSON.stringify(l);
  const champ = "w-full !rounded-none border border-[#DCCDAA] px-3 h-11 sm:h-9 text-base sm:text-sm bg-white";
  const carte = lienCarte(f);
  const num = (v: string) => (v === "" ? null : Number(v));

  const enregistrer = async (extra: Partial<Lieu> = {}) => {
    setOccupe(true);
    const { id, cree_le, ...reste } = { ...f, ...extra };
    const { error } = await (supabase as any).from("lieux").update(reste).eq("id", id);
    setOccupe(false);
    if (error) return toast({ title: "Non enregistré", description: error.message, variant: "destructive" });
    toast({ title: "Lieu enregistré", description: (extra.actif ?? f.actif) ? "Ses tarifs sont dans le catalogue des devis." : "Retiré du catalogue des devis." });
    onChange(f.ville);
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
    <div id={`lieu-${l.id}`} className={`scroll-mt-4 a-carte overflow-hidden ${f.actif ? "" : "border-l-[3px] !border-l-[#9C4A2C]"}`} data-testid="fiche-lieu">
      <button onClick={onOuvrir} className="w-full flex items-center gap-3 p-3 sm:p-4 text-left">
        {l.photos[0] && <div className="h-14 w-20 bg-[#FBF8F1] overflow-hidden shrink-0"><img src={url(l.photos[0]) ?? undefined} alt="" className="h-full w-full object-cover" /></div>}
        <div className="flex-1 min-w-0">
          <div className="font-medium text-base leading-snug line-clamp-2">{l.nom}{!l.actif && <span className="ml-2 a-st terre align-middle">inactif</span>}{modifie && <span className="ml-2 a-st align-middle">modifié</span>}</div>
          <div className="text-[10.5px] uppercase tracking-[.22em] text-[#7A5F1F] mt-0.5">{TYPES.find((t) => t[0] === l.type)?.[1] ?? l.type}</div>
          <div className="text-xs text-muted-foreground truncate">{l.capacite_max ? `${l.capacite_min ? l.capacite_min + "–" : "jusqu'à "}${l.capacite_max} pers. · ` : ""}{l.tarifs.map((t) => `${t.libelle} ${mad(t.prix)}`).join(" · ")}{(!l.tarifs.length || recherche) && (l.contact_telephone || l.contact_email || (!l.tarifs.length ? "Coordonnées à compléter" : ""))}</div>
        </div>
        <ChevronDown className={`h-5 w-5 text-[#A8933F] transition ${ouvert ? "rotate-180" : ""}`} aria-hidden />
      </button>
      {ouvert && (
        <div className="border-t border-[#F1ECDD] p-3 sm:p-4 space-y-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
            <label className="text-[11px] text-muted-foreground lg:col-span-2">Nom<input className={champ} value={f.nom} onChange={(e) => setF({ ...f, nom: e.target.value })} data-testid="lieu-nom" /></label>
            <label className="text-[11px] text-muted-foreground">Type<select className={champ} value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })}>{TYPES.map(([v, t]) => <option key={v} value={v}>{t}</option>)}</select></label>
            <label className="text-[11px] text-muted-foreground">Ville<input className={champ} list="lieux-villes" value={f.ville ?? ""} onChange={(e) => setF({ ...f, ville: e.target.value })} data-testid="lieu-ville" /><datalist id="lieux-villes">{villes.map((v) => <option key={v} value={v} />)}</datalist></label>
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
          {carte && <a href={carte} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-[#8C6D22] min-h-11"><MapPin className="h-4 w-4" /> Ouvrir dans Google Maps</a>}

          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Tarifs (deviennent des lignes de devis)</div>
            <div className="space-y-2">
              {f.tarifs.map((t, i) => (
                <div key={i} className="grid grid-cols-[1fr_auto] sm:grid-cols-[1.6fr_0.8fr_0.8fr_auto] gap-2 items-center rounded-lg bg-[#FBF8F1] p-2" data-testid="lieu-tarif">
                  <input className={`${champ} col-span-2 sm:col-span-1`} value={t.libelle} placeholder="Ex. Location samedi soir" onChange={(e) => setTarif(i, { libelle: e.target.value })} />
                  <select className={champ} value={t.unite} onChange={(e) => setTarif(i, { unite: e.target.value })}>{UNITES.map(([v, x]) => <option key={v} value={v}>{x}</option>)}</select>
                  <input className={champ} type="number" value={t.prix} onChange={(e) => setTarif(i, { prix: Number(e.target.value) })} placeholder="MAD" data-testid="lieu-prix" />
                  <button onClick={() => setF({ ...f, tarifs: f.tarifs.filter((_, k) => k !== i) })} className="h-11 w-11 sm:h-9 sm:w-9 grid place-items-center text-muted-foreground hover:text-red-700" aria-label="Retirer"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
              <button onClick={() => setF({ ...f, tarifs: [...f.tarifs, { libelle: "", unite: "forfait", prix: 0 }] })} className="text-sm text-[#8C6D22] inline-flex items-center gap-1 min-h-11"><Plus className="h-4 w-4" /> Ajouter un tarif</button>
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Photos</div>
            <div className="flex flex-wrap gap-2">
              {f.photos.map((ph) => (
                <div key={ph} className="relative h-24 w-32 rounded-xl overflow-hidden border">
                  <img src={url(ph) ?? undefined} alt="" className="h-full w-full object-cover" loading="lazy" />
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

          {confirmer ? (
            <div ref={blocConfirmation} className="flex flex-col gap-3 border border-[#9C4A2C]/40 bg-[#9C4A2C]/5 p-3" role="alertdialog" aria-label="Confirmer la suppression">
              <p className="text-sm text-[#9C4A2C]">
                Supprimer « {l.nom} » pour de bon ? Elle disparaît aussi des devis{(l.photos ?? []).length ? ` et ses ${(l.photos ?? []).length} photo(s) sont effacées` : ""}. Pour seulement la retirer des devis, utilisez « Désactiver ».
              </p>
              <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-3">
                <button disabled={occupe} onClick={supprimer} className="rounded-full bg-[#9C4A2C] text-white px-4 h-11 sm:h-9 text-sm disabled:opacity-40" data-testid="confirmer-suppression-lieu">Oui, supprimer</button>
                <button disabled={occupe} onClick={() => setConfirmer(false)} className="rounded-full border border-[#DCCDAA] bg-white px-4 h-11 sm:h-9 text-sm" autoFocus>Garder</button>
                {occupe && <Loader2 className="h-4 w-4 animate-spin" />}
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <button disabled={!modifie || occupe} onClick={() => enregistrer()} className="inline-flex items-center gap-1.5 rounded-full bg-[#141414] text-white px-4 h-11 sm:h-9 text-sm disabled:opacity-40" data-testid="enregistrer-lieu"><Save className="h-4 w-4" /> Enregistrer</button>
              <button disabled={occupe} onClick={() => enregistrer({ actif: !f.actif })} className="inline-flex items-center gap-1.5 rounded-full border px-4 h-11 sm:h-9 text-sm">{f.actif ? "Désactiver (retirer des devis)" : "Réactiver"}</button>
              {occupe && <Loader2 className="h-4 w-4 animate-spin" />}
              <button disabled={occupe} onClick={() => setConfirmer(true)} className="sm:ml-auto inline-flex items-center gap-1.5 rounded-full border border-[#9C4A2C]/60 text-[#9C4A2C] px-4 h-11 sm:h-9 text-sm" data-testid="supprimer-lieu"><Trash2 className="h-4 w-4" /> Supprimer</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
