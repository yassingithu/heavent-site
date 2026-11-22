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
import { csvFactures, csvPaiements, dansLeMois, type FactureCompta } from "@/lib/recettes";
import { csvDepenses, moisPrecedentSuivant, nomFichierJustificatif, nombreDepuisTexte, totalDepenses, totauxParCategorie, type Depense } from "@/lib/depenses";

const BUCKET = "depenses";
const MOYENS: Record<string, string> = { especes: "Espèces", carte: "Carte", virement: "Virement", cheque: "Chèque", autre: "Autre" };
const mad = (n: number) => `${new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(Number(n) || 0)} MAD`;
const jourCourt = (d: string) => new Date(d + "T12:00:00Z").toLocaleDateString("fr-FR", { timeZone: "UTC", day: "numeric", month: "short" });
const moisLong = (m: string) => new Date(m + "-15T12:00:00Z").toLocaleDateString("fr-FR", { timeZone: "UTC", month: "long", year: "numeric" });
const versDataUrl = (b: Blob) => new Promise<string>((ok, ko) => { const r = new FileReader(); r.onload = () => ok(String(r.result)); r.onerror = () => ko(r.error); r.readAsDataURL(b); });
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
  // Lecture automatique du ticket : champs remplis par la lecture (à vérifier) et champs modifiés à la main (jamais écrasés)
  const [lu, setLu] = useState<Set<string>>(new Set());
  const [lecture, setLecture] = useState<"" | "cours" | "vide" | "indispo">("");
  const touches = useRef<Set<string>>(new Set());
  const numeroLecture = useRef(0);
  const fRef = useRef<typeof f>(null);
  fRef.current = f;
  const luRef = useRef(lu);
  luRef.current = lu;
  useEffect(() => { touches.current = new Set(); numeroLecture.current++; setLu(new Set()); setLecture(""); }, [!!f]);
  const [facturesMois, setFacturesMois] = useState<FactureCompta[] | null>(null);
  useEffect(() => {
    let annule = false;
    setFacturesMois(null);
    const debut = `${mois}-01`;
    const fin = `${moisPrecedentSuivant(mois).suivant}-01`;
    (supabase as any).from("factures")
      .select("numero, type, date_emission, client_nom, client_societe, client_ice, devis_numero, total_ht, total_tva, total_ttc, deduction_ttc, net_a_payer, statut, payee_le, mode_paiement, devise")
      .or(`and(date_emission.gte.${debut},date_emission.lt.${fin}),and(payee_le.gte.${debut},payee_le.lt.${fin})`)
      .then(({ data, error }: any) => { if (!annule) setFacturesMois(error ? [] : dansLeMois((data ?? []) as FactureCompta[], mois)); });
    return () => { annule = true; };
  }, [mois]);
  const emisesMois = (facturesMois ?? []).filter((x) => x.date_emission?.slice(0, 7) === mois);
  const payeesMois = (facturesMois ?? []).filter((x) => x.statut === "payee" && x.payee_le?.slice(0, 7) === mois);

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

  const saisir = (k: string, v: Partial<NonNullable<typeof f>>) => {
    touches.current.add(k);
    setLu((a) => { if (!a.has(k)) return a; const b = new Set(a); b.delete(k); return b; });
    setF((x) => (x ? { ...x, ...v } : x));
  };

  /** Lit un ticket (image) et préremplit seulement ce qui est vide et que tu n'as pas touché. */
  const lireTicket = async (source: Blob) => {
    const n = ++numeroLecture.current;
    setLecture("cours");
    try {
      const image = await versDataUrl(await reduirePhoto(new File([source], "ticket.jpg", { type: source.type || "image/jpeg" }), 1280));
      const { data, error } = await supabase.functions.invoke("lire-ticket", { body: { image } });
      if (n !== numeroLecture.current) return;
      if (error || !data?.disponible) { setLecture("indispo"); return; }
      const c = data.champs ?? {};
      const x = fRef.current;
      if (!x) return;
      const mis = new Set<string>(); const y = { ...x }; const libre = (k: string) => !touches.current.has(k); const videOuLu = (k: string, v: string) => !v.trim() || luRef.current.has(k);
      if (c.montant_ttc != null && libre("montant") && videOuLu("montant", x.montant)) { y.montant = String(c.montant_ttc).replace(".", ","); mis.add("montant"); }
      if (c.date && libre("date") && (x.date === aujourdhuiMaroc() || luRef.current.has("date"))) { y.date = c.date; mis.add("date"); }
      if (c.fournisseur && libre("fournisseur") && videOuLu("fournisseur", x.fournisseur)) { y.fournisseur = c.fournisseur; mis.add("fournisseur"); }
      if (c.tva != null && libre("tva") && videOuLu("tva", x.tva)) { y.tva = String(c.tva).replace(".", ","); mis.add("tva"); }
      if (c.moyen_paiement && libre("moyen") && (!x.moyen || luRef.current.has("moyen"))) { y.moyen = c.moyen_paiement; mis.add("moyen"); }
      setF((z) => (z ? { ...z, montant: y.montant, date: y.date, fournisseur: y.fournisseur, tva: y.tva, moyen: y.moyen } : z));
      setLu((a) => new Set([...a, ...mis]));
      setLecture(mis.size ? "" : "vide");
    } catch { if (n === numeroLecture.current) setLecture("indispo"); }
  };
  const relire = async () => {
    const c = f?.fichiers.find((x) => !estPdf(x));
    if (!c) return;
    const { data } = await supabase.storage.from(BUCKET).download(c);
    if (data) await lireTicket(data); else setLecture("indispo");
  };

  const ajouterFichiers = async (fichiers: FileList | null) => {
    if (!fichiers?.length || !f) return;
    setOccupe(true);
    const nouveaux: string[] = [];
    let aLire: Blob | null = null;
    for (const fi of [...fichiers].slice(0, 6)) {
      const pdf = fi.type === "application/pdf";
      const chemin = `${mois}/${idAleatoire()}.${pdf ? "pdf" : "jpg"}`;
      const corps = pdf ? fi : await reduirePhoto(fi, 1800);
      const { error } = await supabase.storage.from(BUCKET).upload(chemin, corps, { contentType: pdf ? "application/pdf" : "image/jpeg" });
      if (error) toast({ title: "Fichier non envoyé", description: error.message, variant: "destructive" }); else { nouveaux.push(chemin); if (!pdf && !aLire) aLire = corps; }
    }
    setF((x) => (x ? { ...x, fichiers: [...x.fichiers, ...nouveaux] } : x));
    setOccupe(false);
    if (entree.current) entree.current.value = "";
    // Première photo d'une nouvelle dépense sans montant : on lit le ticket tout de suite
    if (aLire && !f.fichiers.some((x) => !estPdf(x)) && !f.montant.trim()) void lireTicket(aLire);
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
  /** « Pour le comptable » : factures émises et paiements encaissés dans le mois affiché (2 tableaux Excel dans un ZIP). */
  const exporterRecettes = () => {
    if (!emisesMois.length && !payeesMois.length) return;
    telecharger(zipSync({
      [`factures-${mois}.csv`]: strToU8("\uFEFF" + csvFactures(emisesMois)),
      [`paiements-${mois}.csv`]: strToU8("\uFEFF" + csvPaiements(payeesMois)),
    }, { level: 0 }), `recettes-${mois}.zip`, "application/zip");
    toast({ title: "Export prêt", description: "Un ZIP avec 2 tableaux Excel : à envoyer à ton comptable." });
  };
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
            <Button variant="outline" size="sm" className="h-11 gap-1.5 sm:h-9" onClick={exporterCsv} disabled={!lignes.length} data-testid="export-csv"><FileText className="h-4 w-4" /> Tableau (Excel)</Button>
            <Button variant="outline" size="sm" className="h-11 gap-1.5 sm:h-9" onClick={exporterZip} disabled={!lignes.length || occupe} data-testid="export-zip"><Download className="h-4 w-4" /> Tableau + photos (ZIP)</Button>
          </div>
        </div>
        <div className="mt-4 border-t border-[#EADFC8] pt-4" data-testid="pour-le-comptable">
          <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[#8C6D22]">Pour le comptable</p>
          <Button variant="outline" className="mt-2 h-auto min-h-11 w-full justify-start gap-2 whitespace-normal py-2 text-left sm:h-9 sm:min-h-0 sm:w-auto sm:whitespace-nowrap sm:py-0" onClick={exporterRecettes} disabled={!facturesMois || (!emisesMois.length && !payeesMois.length)} data-testid="export-recettes"><Receipt className="h-4 w-4" /> Factures et paiements de {moisLong(mois)} (ZIP)</Button>
          <p className="mt-1.5 text-xs text-muted-foreground" data-testid="export-recettes-aide">{!facturesMois ? "Chargement…" : emisesMois.length || payeesMois.length ? `${emisesMois.length} facture${emisesMois.length > 1 ? "s" : ""} émise${emisesMois.length > 1 ? "s" : ""} · ${payeesMois.length} paiement${payeesMois.length > 1 ? "s" : ""} encaissé${payeesMois.length > 1 ? "s" : ""}. 2 tableaux Excel dans un ZIP.` : "Aucune facture émise ni paiement encaissé ce mois-ci. Change de mois avec les flèches."}</p>
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
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground" aria-live="polite" data-testid="lecture-ticket">
                  {lecture === "cours" ? <span className="text-[#7A5C17]" data-testid="lecture-en-cours">Lecture du ticket…</span>
                    : lecture === "vide" ? <span>Rien de sûr n'a pu être lu : saisis les informations.</span>
                    : lecture === "indispo" ? <span>Lecture indisponible pour l'instant : saisis les informations.</span>
                    : lu.size ? <span className="inline-flex items-center gap-1.5 text-xs text-foreground"><i aria-hidden className="lu-losange" />Vérifie les champs marqués avant d'enregistrer.</span>
                    : <span>Photo ou PDF. Le montant, la date et le commerce sont lus automatiquement sur la photo.</span>}
                  {f.fichiers.some((x) => !estPdf(x)) && lecture !== "cours" && (
                    <button type="button" onClick={relire} className="inline-flex min-h-11 items-center border border-[#A8933F]/60 px-3 text-xs font-medium text-[#7A5C17] hover:bg-[#FBF6E9] active:bg-[#F4EFE3] sm:min-h-9" data-testid="relire-ticket">{lu.size || lecture ? "Relire le ticket" : "Lire le ticket"}</button>
                  )}
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div data-lu={lu.has("montant")} style={{ "--i": 0 } as any}><Label className="flex flex-wrap items-baseline">Montant TTC (MAD)<Lu k="montant" lu={lu} /></Label><Input inputMode="decimal" data-testid="depense-montant" value={f.montant} onChange={(e) => saisir("montant", { montant: e.target.value })} /></div>
                <div data-lu={lu.has("date")} style={{ "--i": 1 } as any}><Label className="flex flex-wrap items-baseline">Date<Lu k="date" lu={lu} /></Label><Input type="date" data-testid="depense-date" value={f.date} onChange={(e) => saisir("date", { date: e.target.value })} /></div>
                <div className="sm:col-span-2" data-lu={lu.has("fournisseur")} style={{ "--i": 2 } as any}><Label className="flex flex-wrap items-baseline">Fournisseur / commerce<Lu k="fournisseur" lu={lu} /></Label><Input data-testid="depense-fournisseur" value={f.fournisseur} onChange={(e) => saisir("fournisseur", { fournisseur: e.target.value })} /></div>
                <div><Label>Catégorie</Label>
                  <Select value={f.categorie} onValueChange={(v) => setF({ ...f, categorie: v })}>
                    <SelectTrigger data-testid="depense-categorie"><SelectValue /></SelectTrigger>
                    <SelectContent>{listeCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div data-lu={lu.has("moyen")} style={{ "--i": 3 } as any}><Label className="flex flex-wrap items-baseline">Payé par<Lu k="moyen" lu={lu} /></Label>
                  <Select value={f.moyen || "aucun"} onValueChange={(v) => saisir("moyen", { moyen: v === "aucun" ? "" : v })}>
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
                <div data-lu={lu.has("tva")} style={{ "--i": 4 } as any}><Label className="flex flex-wrap items-baseline">TVA (facultatif)<Lu k="tva" lu={lu} /></Label><Input inputMode="decimal" value={f.tva} onChange={(e) => saisir("tva", { tva: e.target.value })} /></div>
                <div className="sm:col-span-2"><Label>Note</Label><Textarea rows={2} value={f.note} onChange={(e) => setF({ ...f, note: e.target.value })} /></div>
              </div>
              <div className="flex items-center justify-between gap-2 pt-1">
                {f.id ? <Button variant="ghost" className="text-[#9C4A2C] gap-1.5" onClick={supprimer} disabled={occupe} data-testid="supprimer-depense"><Trash2 className="h-4 w-4" /> Supprimer</Button> : <span />}
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
                <button className="text-xs text-muted-foreground hover:text-[#9C4A2C]" onClick={() => retirerCategorie(c)} aria-label={`Retirer ${c}`}><Trash2 className="h-3.5 w-3.5" /></button>
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

/** Pastille « lu sur le ticket » à côté d'un champ prérempli par la lecture : disparaît dès que le champ est modifié. */
function Lu({ k, lu }: { k: string; lu: Set<string> }) {
  return lu.has(k) ? <span className="ml-2 inline-flex items-center gap-1 text-xs font-normal text-[#7A5C17] lu-marque" data-testid={`lu-${k}`}><i aria-hidden className="lu-losange" />lu sur le ticket</span> : null;
}
