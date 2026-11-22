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
import { csvDepenses, moisPrecedentSuivant, nomFichierJustificatif, nombreDepuisTexte, totalDepenses, totauxEtrangers, totauxParCategorie, type Depense } from "@/lib/depenses";

const BUCKET = "depenses";
const MOYENS: Record<string, string> = { especes: "Espèces", carte: "Carte", virement: "Virement", cheque: "Chèque", autre: "Autre" };
const SYMBOLE: Record<string, string> = { MAD: "MAD", EUR: "€", USD: "$" };
const mad = (n: number, devise: string | null | undefined = "MAD") => `${new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(Number(n) || 0)} ${SYMBOLE[devise ?? "MAD"] ?? devise}`;
const jourCourt = (d: string) => new Date(d + "T12:00:00Z").toLocaleDateString("fr-FR", { timeZone: "UTC", day: "numeric", month: "short" });
const moisLong = (m: string) => new Date(m + "-15T12:00:00Z").toLocaleDateString("fr-FR", { timeZone: "UTC", month: "long", year: "numeric" });
const versDataUrl = (b: Blob) => new Promise<string>((ok, ko) => { const r = new FileReader(); r.onload = () => ok(String(r.result)); r.onerror = () => ko(r.error); r.readAsDataURL(b); });
const estPdf = (chemin: string) => chemin.toLowerCase().endsWith(".pdf");

interface Evenement { id: string; numero: string | null; titre: string | null; client_nom: string }
const vide = () => ({ id: "", date: aujourdhuiMaroc(), fournisseur: "", ice: "", idf: "", devise: "MAD", montant: "", tva: "", categorie: "Autres", moyen: "", devis: "", note: "", fichiers: [] as string[] });

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
  const [lecture, setLecture] = useState<"" | "cours" | "vide" | "indispo" | "limite">("");
  const [proposition, setProposition] = useState<Record<string, string> | null>(null);
  const touches = useRef<Set<string>>(new Set());
  const numeroLecture = useRef(0);
  const fRef = useRef<typeof f>(null);
  fRef.current = f;
  const luRef = useRef(lu);
  luRef.current = lu;
  useEffect(() => { touches.current = new Set(); numeroLecture.current++; setLu(new Set()); setLecture(""); setProposition(null); }, [!!f]);
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
  const etrangers = totauxEtrangers(lignes);
  const { precedent, suivant } = moisPrecedentSuivant(mois);

  const saisir = (k: string, v: Partial<NonNullable<typeof f>>) => {
    touches.current.add(k);
    setLu((a) => { if (!a.has(k)) return a; const b = new Set(a); b.delete(k); return b; });
    setF((x) => (x ? { ...x, ...v } : x));
  };

  /** Lit un ticket (image). Préremplit ce qui est vide ou déjà « lu » (sauf champ modifié à la main) ; en lecture demandée (explicite), un champ vidé à la main est aussi rempli. Le reste est proposé, jamais imposé. */
  const lireTicket = async (source: Blob, explicite = false) => {
    const n = ++numeroLecture.current;
    setLecture("cours"); setProposition(null);
    try {
      const image = await versDataUrl(await reduirePhoto(new File([source], "ticket.jpg", { type: source.type || "image/jpeg" }), 1280));
      const reponse = await Promise.race([
        supabase.functions.invoke("lire-ticket", { body: { image } }),
        new Promise<never>((_, ko) => setTimeout(() => ko(new Error("delai")), 30_000)),
      ]);
      if (n !== numeroLecture.current) return;
      const { data, error } = reponse as { data: any; error: unknown };
      if (error || !data?.disponible) { setLecture(data?.raison === "limite" || data?.raison === "quota" ? "limite" : "indispo"); return; }
      const c = data.champs ?? {};
      const x = fRef.current;
      if (!x) return;
      const lus: Record<string, string> = {};
      // Devise lue sur le ticket (MAD par défaut) : le montant est rempli tel qu'il est écrit, avec sa devise
      if (c.devise && ["MAD", "EUR", "USD"].includes(c.devise)) lus.devise = c.devise;
      if (c.montant_ttc != null) lus.montant = String(c.montant_ttc).replace(".", ",");
      if (c.tva != null) lus.tva = String(c.tva).replace(".", ",");
      if (c.date) lus.date = c.date;
      if (c.fournisseur) lus.fournisseur = c.fournisseur;
      if (c.ice) lus.ice = c.ice;
      if (c.identifiant_fiscal) lus.idf = c.identifiant_fiscal;
      if (c.moyen_paiement) lus.moyen = c.moyen_paiement;
      if (!Object.keys(lus).length) { setLecture("vide"); return; }
      const actuel: Record<string, string> = { montant: x.montant, tva: x.tva, date: x.date === aujourdhuiMaroc() ? "" : x.date, fournisseur: x.fournisseur, ice: x.ice, idf: x.idf, moyen: x.moyen, devise: x.devise === "MAD" ? "" : x.devise };
      const mis = new Set<string>(); const patch: Record<string, string> = {}; const autres: Record<string, string> = {};
      for (const [k, v] of Object.entries(lus)) {
        const vide = !actuel[k].trim(); const dejaLu = luRef.current.has(k); const touche = touches.current.has(k);
        if (vide && (!touche || explicite) || dejaLu && !touche) { patch[k] = v; mis.add(k); if (explicite) touches.current.delete(k); }
        else if (actuel[k].replace(/\s/g, "") !== v.replace(/\s/g, "")) autres[k] = v;
      }
      if (Object.keys(patch).length) setF((z) => (z ? { ...z, ...patch } : z));
      setLu((a) => new Set([...a, ...mis]));
      setProposition(Object.keys(autres).length ? autres : null);
      setLecture("");
    } catch { if (n === numeroLecture.current) setLecture("indispo"); }
  };
  const relire = async () => {
    const c = [...(f?.fichiers ?? [])].reverse().find((x) => !estPdf(x));
    if (!c) return;
    setLecture("cours"); setProposition(null);
    const { data } = await supabase.storage.from(BUCKET).download(c);
    if (data) await lireTicket(data, true); else setLecture("indispo");
  };
  const appliquerProposition = () => {
    if (!proposition) return;
    const patch = { ...proposition };
    for (const k of Object.keys(patch)) touches.current.delete(k);
    setF((z) => (z ? { ...z, ...patch } : z));
    setLu((a) => new Set([...a, ...Object.keys(patch)]));
    setProposition(null);
  };

  const ajouterFichiers = async (fichiers: FileList | null) => {
    if (!fichiers?.length || !f) return;
    setOccupe(true);
    const nouveaux: string[] = [];
    let aLire: Blob | null = null;
    try {
      for (const fi of [...fichiers].slice(0, 6)) {
        try {
          const pdf = fi.type === "application/pdf";
          const chemin = `${mois}/${idAleatoire()}.${pdf ? "pdf" : "jpg"}`;
          const corps = pdf ? fi : await reduirePhoto(fi, 1800);
          const { error } = await supabase.storage.from(BUCKET).upload(chemin, corps, { contentType: pdf ? "application/pdf" : "image/jpeg" });
          if (error) toast({ title: "Fichier non envoyé", description: error.message, variant: "destructive" }); else { nouveaux.push(chemin); if (!pdf) aLire = corps; }
        } catch { toast({ title: "Photo illisible", description: "Ce fichier n'a pas pu être ouvert (essaie une autre photo ou un PDF).", variant: "destructive" }); }
      }
    } finally {
      if (nouveaux.length) setF((x) => (x ? { ...x, fichiers: [...x.fichiers, ...nouveaux] } : x));
      setOccupe(false);
    }
    if (entree.current) entree.current.value = "";
    // Chaque nouvelle photo est lue tout de suite (un ticket coupé en deux se complète avec la seconde photo)
    if (aLire) void lireTicket(aLire);
  };

  const enregistrer = async () => {
    if (!f) return;
    const montant = nombreDepuisTexte(f.montant);
    if (!montant || montant <= 0) { toast({ title: "Montant manquant", description: "Indique le montant TTC de la dépense.", variant: "destructive" }); return; }
    if (!f.date) { toast({ title: "Date manquante", variant: "destructive" }); return; }
    const tva = f.tva.trim() ? nombreDepuisTexte(f.tva) : null;
    if (f.tva.trim() && (tva === null || tva < 0)) { toast({ title: "TVA incorrecte", variant: "destructive" }); return; }
    const iceChiffres = f.ice.replace(/\D/g, ""), ifChiffres = f.idf.replace(/\D/g, "");
    if (iceChiffres && iceChiffres.length !== 15) { toast({ title: "ICE incorrect", description: "L'ICE comporte 15 chiffres.", variant: "destructive" }); return; }
    if (ifChiffres && (ifChiffres.length < 3 || ifChiffres.length > 12)) { toast({ title: "Identifiant fiscal incorrect", description: "Entre uniquement les chiffres de l'IF.", variant: "destructive" }); return; }
    // Garde-fous : montant lu sur le ticket, jamais relu, qui sort de l'ordinaire ; dépense identique déjà saisie
    if (lu.has("montant") && montant >= 5000 && !window.confirm(`Montant inhabituel : ${mad(montant, f.devise)}, lu sur le ticket. C'est bien ça ?`)) return;
    const norme = (t: string | null) => (t ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim().toLowerCase();
    let doublon: Depense | undefined;
    if (!f.id) {
      const { data: memeJour } = await (supabase as any).from("depenses").select("*").eq("date_depense", f.date);
      doublon = ((memeJour ?? []) as Depense[]).find((l) => Math.round(Number(l.montant_ttc) * 100) === Math.round(montant * 100) && (l.devise ?? "MAD") === (f.devise || "MAD") && norme(l.fournisseur) === norme(f.fournisseur));
    }
    if (doublon && !window.confirm(`Une dépense identique existe déjà (${jourCourt(doublon.date_depense)}, ${doublon.fournisseur || "sans nom"}, ${mad(Number(doublon.montant_ttc), doublon.devise)}). Enregistrer quand même ?`)) return;
    setOccupe(true);
    const ligne = {
      date_depense: f.date, fournisseur: f.fournisseur.trim() || null, fournisseur_ice: f.ice.replace(/\D/g, "") || null, fournisseur_if: f.idf.replace(/\D/g, "") || null, montant_ttc: montant, devise: f.devise || "MAD", tva, categorie: f.categorie || "Autres",
      moyen_paiement: f.moyen || null, devis_id: f.devis || null, note: f.note.trim() || null, justificatifs: f.fichiers,
    };
    const { error } = f.id ? await (supabase as any).from("depenses").update(ligne).eq("id", f.id) : await (supabase as any).from("depenses").insert(ligne);
    setOccupe(false);
    if (error) { toast({ title: "Dépense non enregistrée", description: error.message, variant: "destructive" }); return; }
    toast({ title: f.id ? "Dépense modifiée" : "Dépense enregistrée", description: `${mad(montant, f.devise)} · ${f.categorie}` });
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
    id: l.id, date: l.date_depense, fournisseur: l.fournisseur ?? "", ice: l.fournisseur_ice ?? "", idf: l.fournisseur_if ?? "", devise: l.devise ?? "MAD", montant: String(l.montant_ttc), tva: l.tva == null ? "" : String(l.tva),
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
            <p className="text-xs text-muted-foreground">{lignes.length} dépense{lignes.length > 1 ? "s" : ""}{etrangers.length ? ` · hors total : ${etrangers.map(([d, t]) => mad(t, d)).join(", ")}` : ""}</p>
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
                <span className="font-serif text-base tabular-nums whitespace-nowrap">{mad(l.montant_ttc, l.devise)}</span>
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
                      {estPdf(c) ? <FileText className="h-7 w-7 text-[#A8933F]" /> : liens[c] ? <a href={liens[c]} target="_blank" rel="noopener noreferrer" className="block h-full w-full" aria-label="Voir le justificatif en grand"><img src={liens[c]} alt="Justificatif" className="h-full w-full object-cover" /></a> : null}
                      <button type="button" onClick={() => setF({ ...f, fichiers: f.fichiers.filter((x) => x !== c) })} className="absolute top-0 right-0 h-11 w-11 flex items-start justify-end p-1.5 text-white" aria-label="Retirer ce justificatif"><span className="h-5 w-5 rounded-full bg-black/60 flex items-center justify-center"><X className="h-3 w-3" /></span></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => entree.current?.click()} disabled={occupe} data-testid="prendre-photo"
                    className="h-20 w-20 rounded-xl border-2 border-dashed border-[#DCCBA6] text-[#8C6D22] flex flex-col items-center justify-center gap-1 text-[11px] hover:bg-[#FDFBF5]">
                    <Camera className="h-5 w-5" />{occupe ? "…" : "Photo"}
                  </button>
                  <input ref={entree} type="file" accept="image/*,application/pdf" multiple className="hidden" data-testid="champ-photo" onChange={(e) => ajouterFichiers(e.target.files)} />
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground" aria-live="polite" data-testid="lecture-ticket">
                  {lecture === "cours" ? <span className="inline-flex items-center gap-1.5 text-[#7A5C17]" data-testid="lecture-en-cours"><span aria-hidden className="h-3 w-3 animate-spin rounded-full border border-[#A8933F] border-t-transparent motion-reduce:animate-none" />Lecture du ticket…<button type="button" onClick={() => { numeroLecture.current++; setLecture(""); }} className="ml-1 min-h-11 px-2 underline underline-offset-2 sm:min-h-9" data-testid="saisir-a-la-main">Saisir à la main</button></span>
                    : lecture === "vide" ? <span>Rien de sûr n'a pu être lu : saisis les informations.</span>
                    : lecture === "limite" ? <span>Trop de lectures pour le moment : saisis les informations à la main.</span>
                    : lecture === "indispo" ? <span>Lecture indisponible pour l'instant : saisis les informations.</span>
                    : proposition ? <span className="text-xs text-foreground" data-testid="lecture-proposition">Le ticket indique {[proposition.montant && `${proposition.montant} ${SYMBOLE[proposition.devise || f?.devise || "MAD"]}`, proposition.tva && `TVA ${proposition.tva}`, proposition.date && proposition.date.split("-").reverse().join("/"), proposition.fournisseur, proposition.ice && `ICE ${proposition.ice}`, proposition.idf && `IF ${proposition.idf}`, proposition.moyen && MOYENS[proposition.moyen]].filter(Boolean).join(" · ")}. Tes champs n'ont pas été changés. <button type="button" onClick={appliquerProposition} className="font-semibold text-[#7A5C17] underline underline-offset-2 min-h-11 px-1 sm:min-h-8" data-testid="appliquer-lecture">Appliquer</button></span>
                    : lu.size ? <span className="inline-flex items-center gap-1.5 text-xs text-foreground"><i aria-hidden className="lu-losange" />Vérifie les champs marqués avant d'enregistrer.</span>
                    : f.fichiers.length > 0 && !f.fichiers.some((x) => !estPdf(x)) ? <span>PDF joint : il n'est pas lu automatiquement, saisis le montant et la date.</span>
                    : <span>Photo ou PDF. Le montant, la date et le commerce sont lus sur la photo ; tu peux toujours corriger.</span>}
                  {f.fichiers.some((x) => !estPdf(x)) && lecture !== "cours" && (
                    <button type="button" onClick={relire} className="inline-flex min-h-11 items-center border border-[#A8933F]/60 px-3 text-[13px] font-medium text-[#7A5C17] hover:bg-[#FBF6E9] active:bg-[#F4EFE3] sm:min-h-9" data-testid="relire-ticket">{lecture === "indispo" || lecture === "limite" ? "Réessayer la lecture" : lu.size || lecture || proposition ? "Relire le ticket" : "Lire le ticket"}</button>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 [&>div]:min-w-0">
                <div data-lu={lu.has("montant")} style={{ "--i": 0 } as any}><Label className="flex flex-wrap items-baseline">Montant TTC<Lu k="montant" lu={lu} /></Label>
                  <div className="flex gap-2">
                    <Input inputMode="decimal" className="min-w-0 flex-1" data-testid="depense-montant" value={f.montant} onChange={(e) => saisir("montant", { montant: e.target.value })} />
                    <select aria-label="Devise" data-testid="depense-devise" value={f.devise} onChange={(e) => saisir("devise", { devise: e.target.value })} className="h-10 w-24 shrink-0 rounded-md border border-input bg-background px-2 text-sm">
                      <option value="MAD">MAD</option><option value="EUR">€ euro</option><option value="USD">$ dollar</option>
                    </select>
                  </div>
                  {f.devise !== "MAD" && <p className="mt-1 text-xs text-muted-foreground" data-testid="aide-devise">Ticket en {f.devise === "EUR" ? "euros" : "dollars"} : ce montant n'entre pas dans le total en dirhams du mois.</p>}
                </div>
                <div data-lu={lu.has("tva")} style={{ "--i": 4 } as any}><Label className="flex flex-wrap items-baseline">TVA (facultatif)<Lu k="tva" lu={lu} /></Label><Input inputMode="decimal" value={f.tva} onChange={(e) => saisir("tva", { tva: e.target.value })} /></div>
                <div data-lu={lu.has("date")} style={{ "--i": 1 } as any}><Label className="flex flex-wrap items-baseline">Date<Lu k="date" lu={lu} /></Label><Input type="date" className="min-w-0 w-full max-w-full appearance-none text-left" data-testid="depense-date" value={f.date} onChange={(e) => saisir("date", { date: e.target.value })} /></div>
                <div className="sm:col-span-2" data-lu={lu.has("fournisseur")} style={{ "--i": 2 } as any}><Label className="flex flex-wrap items-baseline">Fournisseur / commerce<Lu k="fournisseur" lu={lu} /></Label><Input data-testid="depense-fournisseur" value={f.fournisseur} onChange={(e) => saisir("fournisseur", { fournisseur: e.target.value })} /></div>
                <div data-lu={lu.has("ice")} style={{ "--i": 3 } as any}><Label className="flex flex-wrap items-baseline">ICE du fournisseur (facultatif)<Lu k="ice" lu={lu} /></Label><Input inputMode="numeric" autoComplete="off" data-testid="depense-ice" value={f.ice} onChange={(e) => saisir("ice", { ice: e.target.value.replace(/[^\d ]/g, "").slice(0, 19) })} /></div>
                <div data-lu={lu.has("idf")} style={{ "--i": 3 } as any}><Label className="flex flex-wrap items-baseline">Identifiant fiscal, IF (facultatif)<Lu k="idf" lu={lu} /></Label><Input inputMode="numeric" autoComplete="off" data-testid="depense-if" value={f.idf} onChange={(e) => saisir("idf", { idf: e.target.value.replace(/[^\d ]/g, "").slice(0, 14) })} /></div>
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
                <div className="sm:col-span-2"><Label>Note</Label><Textarea rows={2} value={f.note} onChange={(e) => setF({ ...f, note: e.target.value })} /></div>
              </div>
              <div className="flex items-center justify-between gap-2 pt-1">
                {f.id ? <Button variant="ghost" className="text-[#9C4A2C] gap-1.5" onClick={supprimer} disabled={occupe} data-testid="supprimer-depense"><Trash2 className="h-4 w-4" /> Supprimer</Button> : <span />}
                <Button onClick={enregistrer} disabled={occupe || lecture === "cours"} data-testid="enregistrer-depense">{lecture === "cours" ? "Lecture en cours…" : nombreDepuisTexte(f.montant) ? `Enregistrer ${mad(nombreDepuisTexte(f.montant)!, f.devise)}` : "Enregistrer"}</Button>
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
