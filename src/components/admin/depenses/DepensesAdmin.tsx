import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { zipSync, strToU8 } from "fflate";
import { Camera, ChevronLeft, ChevronRight, Download, FileText, Plus, Receipt, Trash2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { idAleatoire, reduirePhoto } from "@/lib/photos";
import { aujourdhuiMaroc } from "@/lib/dateMaroc";
import { csvDepenses, moisPrecedentSuivant, nomFichierJustificatif, nombreDepuisTexte, totalDepenses, totauxParCategorie, type Depense } from "@/lib/depenses";

const BUCKET = "depenses";
const MOYENS: Record<string, string> = { especes: "Espèces", carte: "Carte", virement: "Virement", cheque: "Chèque", autre: "Autre" };
const mad = (n: number) => `${new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(Number(n) || 0)} MAD`;
const jourCourt = (d: string) => new Date(d + "T12:00:00Z").toLocaleDateString("fr-FR", { timeZone: "UTC", day: "numeric", month: "short" });
const moisLong = (m: string) => new Date(m + "-15T12:00:00Z").toLocaleDateString("fr-FR", { timeZone: "UTC", month: "long", year: "numeric" });
const estPdf = (chemin: string) => chemin.toLowerCase().endsWith(".pdf");

interface Evenement { id: string; numero: string | null; titre: string | null; client_nom: string }
const vide = () => ({ id: "", date: aujourdhuiMaroc(), fournisseur: "", montant: "", tva: "", categorie: "Autres", moyen: "", devis: "", note: "", fichiers: [] as string[] });

/** Dépenses de l'agence : photo du ticket ou de la facture, classement par mois et catégorie, export pour le comptable. */
export default function DepensesAdmin() {
  const { toast } = useToast();
  const [mois, setMois] = useState(() => aujourdhuiMaroc().slice(0, 7));
  const [lignes, setLignes] = useState<Depense[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [evenements, setEvenements] = useState<Evenement[]>([]);
  const [chargement, setChargement] = useState(true);
  const [f, setF] = useState<ReturnType<typeof vide> | null>(null);
  const [occupe, setOccupe] = useState(false);
  const [liens, setLiens] = useState<Record<string, string>>({});
  const [nouvelleCategorie, setNouvelleCategorie] = useState("");
  const [gererCategories, setGererCategories] = useState(false);
  const entree = useRef<HTMLInputElement>(null);

  const charger = useCallback(async () => {
    setChargement(true);
    const debut = `${mois}-01`;
    const fin = new Date(Date.UTC(Number(mois.slice(0, 4)), Number(mois.slice(5, 7)), 0)).toISOString().slice(0, 10);
    const { data, error } = await (supabase as any).from("depenses").select("*").gte("date_depense", debut).lte("date_depense", fin).order("date_depense", { ascending: false }).order("cree_le", { ascending: false });
    if (error) toast({ title: "Dépenses non chargées", description: error.message, variant: "destructive" });
    setLignes((data ?? []) as Depense[]);
    setChargement(false);
  }, [mois, toast]);
  useEffect(() => { charger(); }, [charger]);

  useEffect(() => {
    (supabase as any).from("categories_depenses").select("nom").order("ordre").order("nom").then(({ data }: any) => setCategories((data ?? []).map((c: any) => c.nom)));
    supabase.from("devis").select("id, numero, titre, client_nom").not("date_evenement", "is", null).order("date_evenement", { ascending: false }).limit(60).then(({ data }) => setEvenements((data ?? []) as any));
  }, []);

  // Liens temporaires (privés) pour afficher les justificatifs de la liste et du formulaire
  const tous = useMemo(() => [...new Set([...lignes.flatMap((l) => l.justificatifs ?? []), ...(f?.fichiers ?? [])])], [lignes, f?.fichiers]);
  useEffect(() => {
    const manquants = tous.filter((c) => !liens[c]);
    if (!manquants.length) return;
    supabase.storage.from(BUCKET).createSignedUrls(manquants, 3600).then(({ data }) => {
      if (!data) return;
      setLiens((a) => ({ ...a, ...Object.fromEntries(data.filter((d) => d.signedUrl && d.path).map((d) => [d.path as string, d.signedUrl])) }));
    });
  }, [tous, liens]);

  const total = totalDepenses(lignes);
  const parCategorie = totauxParCategorie(lignes);
  const { precedent, suivant } = moisPrecedentSuivant(mois);

  const ajouterFichiers = async (fichiers: FileList | null) => {
    if (!fichiers?.length || !f) return;
    setOccupe(true);
    const nouveaux: string[] = [];
    for (const fi of [...fichiers].slice(0, 6)) {
      const pdf = fi.type === "application/pdf";
      const chemin = `${mois}/${idAleatoire()}.${pdf ? "pdf" : "jpg"}`;
      const corps = pdf ? fi : await reduirePhoto(fi, 1800);
      const { error } = await supabase.storage.from(BUCKET).upload(chemin, corps, { contentType: pdf ? "application/pdf" : "image/jpeg" });
      if (error) toast({ title: "Fichier non envoyé", description: error.message, variant: "destructive" }); else nouveaux.push(chemin);
    }
    setF((x) => (x ? { ...x, fichiers: [...x.fichiers, ...nouveaux] } : x));
    setOccupe(false);
    if (entree.current) entree.current.value = "";
  };

  const enregistrer = async () => {
    if (!f) return;
    const montant = nombreDepuisTexte(f.montant);
    if (!montant || montant <= 0) { toast({ title: "Montant manquant", description: "Indique le montant TTC de la dépense.", variant: "destructive" }); return; }
    if (!f.date) { toast({ title: "Date manquante", variant: "destructive" }); return; }
    const tva = f.tva.trim() ? nombreDepuisTexte(f.tva) : null;
    if (f.tva.trim() && (tva === null || tva < 0)) { toast({ title: "TVA incorrecte", variant: "destructive" }); return; }
    setOccupe(true);
    const ligne = {
      date_depense: f.date, fournisseur: f.fournisseur.trim() || null, montant_ttc: montant, tva, categorie: f.categorie || "Autres",
      moyen_paiement: f.moyen || null, devis_id: f.devis || null, note: f.note.trim() || null, justificatifs: f.fichiers,
    };
    const { error } = f.id ? await (supabase as any).from("depenses").update(ligne).eq("id", f.id) : await (supabase as any).from("depenses").insert(ligne);
    setOccupe(false);
    if (error) { toast({ title: "Dépense non enregistrée", description: error.message, variant: "destructive" }); return; }
    toast({ title: f.id ? "Dépense modifiée" : "Dépense enregistrée", description: `${mad(montant)} · ${f.categorie}` });
    const moisLigne = f.date.slice(0, 7);
    setF(null);
    if (moisLigne !== mois) setMois(moisLigne); else charger();
  };

  const supprimer = async () => {
    if (!f?.id) return;
    if (!window.confirm("Supprimer cette dépense et ses photos ? Cette action est définitive.")) return;
    setOccupe(true);
    const { error } = await (supabase as any).from("depenses").delete().eq("id", f.id);
    if (!error && f.fichiers.length) await supabase.storage.from(BUCKET).remove(f.fichiers);
    setOccupe(false);
    if (error) { toast({ title: "Suppression impossible", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Dépense supprimée" });
    setF(null); charger();
  };

  const ouvrir = (l: Depense) => setF({
    id: l.id, date: l.date_depense, fournisseur: l.fournisseur ?? "", montant: String(l.montant_ttc), tva: l.tva == null ? "" : String(l.tva),
    categorie: l.categorie, moyen: l.moyen_paiement ?? "", devis: l.devis_id ?? "", note: l.note ?? "", fichiers: l.justificatifs ?? [],
  });

  const nomEvenement = (id: string | null) => { const e = evenements.find((x) => x.id === id); return e ? `${e.titre || e.client_nom}${e.numero ? ` · ${e.numero}` : ""}` : ""; };
  const telecharger = (octets: Uint8Array | string, nom: string, type: string) => {
    const url = URL.createObjectURL(new Blob([octets as BlobPart], { type }));
    const a = document.createElement("a"); a.href = url; a.download = nom; a.click(); setTimeout(() => URL.revokeObjectURL(url), 2000);
  };
  const exporterCsv = () => telecharger("﻿" + csvDepenses(lignes, nomEvenement), `depenses-${mois}.csv`, "text/csv;charset=utf-8");
  const exporterZip = async () => {
    setOccupe(true);
    try {
      const fichiers: Record<string, Uint8Array> = { [`depenses-${mois}.csv`]: strToU8("﻿" + csvDepenses(lignes, nomEvenement)) };
      let manquants = 0;
      for (const l of lignes) {
        for (let i = 0; i < (l.justificatifs ?? []).length; i++) {
          const c = l.justificatifs[i];
          const { data, error } = await supabase.storage.from(BUCKET).download(c);
          if (error || !data) { manquants++; continue; }
          fichiers[`justificatifs/${nomFichierJustificatif(l, i, c)}`] = new Uint8Array(await data.arrayBuffer());
        }
      }
      telecharger(zipSync(fichiers, { level: 0 }), `depenses-${mois}.zip`, "application/zip");
      toast({ title: "Export prêt", description: manquants ? `${manquants} justificatif(s) introuvable(s) n'ont pas pu être ajoutés.` : "Tableau + photos dans un seul fichier ZIP." });
    } catch (e: any) { toast({ title: "Export impossible", description: e?.message, variant: "destructive" }); }
    setOccupe(false);
  };

  const ajouterCategorie = async () => {
    const nom = nouvelleCategorie.trim();
    if (!nom) return;
    const { error } = await (supabase as any).from("categories_depenses").insert({ nom, ordre: 50 });
    if (error) { toast({ title: "Catégorie non ajoutée", description: error.message, variant: "destructive" }); return; }
    setCategories((c) => [...c, nom]); setNouvelleCategorie("");
  };
  const retirerCategorie = async (nom: string) => {
    if (!window.confirm(`Retirer « ${nom} » de la liste ? Les dépenses déjà classées dedans la gardent.`)) return;
    const { error } = await (supabase as any).from("categories_depenses").delete().eq("nom", nom);
    if (!error) setCategories((c) => c.filter((x) => x !== nom));
  };

  const listeCategories = f && !categories.includes(f.categorie) ? [...categories, f.categorie] : categories;

  return (
    <div className="space-y-4" data-testid="depenses">
      {/* Mois + total + ajout */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => setMois(precedent)} aria-label="Mois précédent"><ChevronLeft className="h-4 w-4" /></Button>
          <p className="font-serif text-xl capitalize min-w-[9.5rem] text-center" data-testid="depenses-mois">{moisLong(mois)}</p>
          <Button variant="ghost" size="icon" onClick={() => setMois(suivant)} aria-label="Mois suivant"><ChevronRight className="h-4 w-4" /></Button>
        </div>
        <Button onClick={() => setF(vide())} data-testid="ajouter-depense" className="gap-2"><Plus className="h-4 w-4" /> Ajouter une dépense</Button>
      </div>

      <div className="rounded-3xl border border-[#EADFC8] bg-white p-4 sm:p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[#8C6D22]">Total du mois (TTC)</p>
            <p className="font-serif text-3xl" data-testid="depenses-total">{mad(total)}</p>
            <p className="text-xs text-muted-foreground">{lignes.length} dépense{lignes.length > 1 ? "s" : ""}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-1.5" onClick={exporterCsv} disabled={!lignes.length} data-testid="export-csv"><FileText className="h-4 w-4" /> Tableau (Excel)</Button>
            <Button variant="outline" size="sm" className="gap-1.5" onClick={exporterZip} disabled={!lignes.length || occupe} data-testid="export-zip"><Download className="h-4 w-4" /> Tableau + photos (ZIP)</Button>
          </div>
        </div>
        {parCategorie.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2" data-testid="depenses-categories">
            {parCategorie.map(([cat, t]) => <span key={cat} className="rounded-full border border-[#EADFC8] bg-[#FDFBF5] px-3 py-1 text-xs">{cat} · <b>{mad(t)}</b></span>)}
          </div>
        )}
      </div>

      {/* Liste */}
      <div className="rounded-3xl border border-[#EADFC8] bg-white overflow-hidden">
        {chargement && <p className="p-5 text-sm text-muted-foreground">Chargement…</p>}
        {!chargement && lignes.length === 0 && (
          <div className="p-8 text-center text-sm text-muted-foreground space-y-2">
            <Receipt className="h-8 w-8 mx-auto text-[#C8B560]" />
            <p>Aucune dépense ce mois-ci.</p>
            <p>Touche « Ajouter une dépense », prends le ticket en photo et enregistre.</p>
          </div>
        )}
        <ul className="divide-y divide-[#EFE6D2]">
          {lignes.map((l) => (
            <li key={l.id}>
              <button onClick={() => ouvrir(l)} className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#FDFBF5]" data-testid="ligne-depense">
                <span className="w-12 shrink-0 text-xs text-muted-foreground capitalize">{jourCourt(l.date_depense)}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium truncate">{l.fournisseur || l.categorie}</span>
                  <span className="block text-xs text-muted-foreground truncate">{l.categorie}{l.devis_id && nomEvenement(l.devis_id) ? ` · ${nomEvenement(l.devis_id)}` : ""}{l.note ? ` · ${l.note}` : ""}</span>
                </span>
                {(l.justificatifs ?? []).length > 0 && <Camera className="h-4 w-4 text-[#A8933F] shrink-0" aria-label="Justificatif joint" />}
                <span className="font-serif text-base tabular-nums whitespace-nowrap">{mad(l.montant_ttc)}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button className="text-xs underline text-muted-foreground" onClick={() => setGererCategories(true)} data-testid="gerer-categories">Gérer les catégories</button>

      {/* Formulaire */}
      <Dialog open={!!f} onOpenChange={(o) => !o && setF(null)}>
        <DialogContent className="max-w-lg max-h-[92vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{f?.id ? "Modifier la dépense" : "Nouvelle dépense"}</DialogTitle></DialogHeader>
          {f && (
            <div className="space-y-4" data-testid="formulaire-depense">
              <div>
                <Label>Ticket ou facture</Label>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {f.fichiers.map((c) => (
                    <div key={c} className="relative h-20 w-20 rounded-xl border border-[#EADFC8] overflow-hidden bg-[#FDFBF5] flex items-center justify-center" data-testid="justificatif">
                      {estPdf(c) ? <FileText className="h-7 w-7 text-[#A8933F]" /> : liens[c] ? <img src={liens[c]} alt="Justificatif" className="h-full w-full object-cover" /> : null}
                      <button type="button" onClick={() => setF({ ...f, fichiers: f.fichiers.filter((x) => x !== c) })} className="absolute top-0.5 right-0.5 h-5 w-5 rounded-full bg-black/60 text-white flex items-center justify-center" aria-label="Retirer ce justificatif"><X className="h-3 w-3" /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => entree.current?.click()} disabled={occupe} data-testid="prendre-photo"
                    className="h-20 w-20 rounded-xl border-2 border-dashed border-[#DCCBA6] text-[#8C6D22] flex flex-col items-center justify-center gap-1 text-[11px] hover:bg-[#FDFBF5]">
                    <Camera className="h-5 w-5" />{occupe ? "…" : "Photo"}
                  </button>
                  <input ref={entree} type="file" accept="image/*,application/pdf" capture="environment" multiple className="hidden" data-testid="champ-photo" onChange={(e) => ajouterFichiers(e.target.files)} />
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">Photo (appareil de l'iPhone) ou PDF. La lecture automatique du montant n'est pas encore active : tu saisis les informations.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div><Label>Montant TTC (MAD)</Label><Input inputMode="decimal" data-testid="depense-montant" value={f.montant} onChange={(e) => setF({ ...f, montant: e.target.value })} /></div>
                <div><Label>Date</Label><Input type="date" data-testid="depense-date" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} /></div>
                <div className="sm:col-span-2"><Label>Fournisseur / commerce</Label><Input data-testid="depense-fournisseur" value={f.fournisseur} onChange={(e) => setF({ ...f, fournisseur: e.target.value })} /></div>
                <div><Label>Catégorie</Label>
                  <Select value={f.categorie} onValueChange={(v) => setF({ ...f, categorie: v })}>
                    <SelectTrigger data-testid="depense-categorie"><SelectValue /></SelectTrigger>
                    <SelectContent>{listeCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>Payé par</Label>
                  <Select value={f.moyen || "aucun"} onValueChange={(v) => setF({ ...f, moyen: v === "aucun" ? "" : v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="aucun">Non précisé</SelectItem>{Object.entries(MOYENS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-2"><Label>Événement (facultatif)</Label>
                  <Select value={f.devis || "aucun"} onValueChange={(v) => setF({ ...f, devis: v === "aucun" ? "" : v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="aucun">Aucun (dépense générale)</SelectItem>{evenements.map((e) => <SelectItem key={e.id} value={e.id}>{e.titre || e.client_nom}{e.numero ? ` · ${e.numero}` : ""}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>TVA lue sur le ticket (facultatif)</Label><Input inputMode="decimal" value={f.tva} onChange={(e) => setF({ ...f, tva: e.target.value })} /></div>
                <div className="sm:col-span-2"><Label>Note</Label><Textarea rows={2} value={f.note} onChange={(e) => setF({ ...f, note: e.target.value })} /></div>
              </div>
              <div className="flex items-center justify-between gap-2 pt-1">
                {f.id ? <Button variant="ghost" className="text-red-700 gap-1.5" onClick={supprimer} disabled={occupe} data-testid="supprimer-depense"><Trash2 className="h-4 w-4" /> Supprimer</Button> : <span />}
                <Button onClick={enregistrer} disabled={occupe} data-testid="enregistrer-depense">Enregistrer</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Catégories */}
      <Dialog open={gererCategories} onOpenChange={setGererCategories}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Catégories de dépenses</DialogTitle></DialogHeader>
          <ul className="divide-y rounded-md border text-sm">
            {categories.map((c) => (
              <li key={c} className="flex items-center justify-between px-3 py-2">{c}
                <button className="text-xs text-muted-foreground hover:text-red-700" onClick={() => retirerCategorie(c)} aria-label={`Retirer ${c}`}><Trash2 className="h-3.5 w-3.5" /></button>
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            <Input placeholder="Nouvelle catégorie" value={nouvelleCategorie} onChange={(e) => setNouvelleCategorie(e.target.value)} onKeyDown={(e) => e.key === "Enter" && ajouterCategorie()} data-testid="nouvelle-categorie" />
            <Button onClick={ajouterCategorie}>Ajouter</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
