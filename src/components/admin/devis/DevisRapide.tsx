import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import logoDevis from "@/assets/logo-devis-noir.png";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDown, ArrowUp, Copy, Download, FileText, Plus, Save, Search, Trash2, X } from "lucide-react";
import {
  DevisForm, Ligne, Parametres, Prestation, STATUTS, UNITES,
  calculerTotaux, dateFr, devisMarkup, nomFichierDevis, ligneVide, money, nouveauDevis, today, totalLigne,
} from "./devisUtils";
import CataloguePrestations from "./CataloguePrestations";
import ParametresAgence from "./ParametresAgence";
import EquipeEvenement from "@/components/admin/equipe/EquipeEvenement";
import { devisModifie } from "./DevisParStatut";

interface DemandeEntreprise {
  id: string; nom: string; prenom: string; email: string; telephone?: string | null; entreprise: string;
  date_evenement?: string | null; lieu?: string | null; nb_personnes?: number | null; nb_staff?: number | null;
  services?: string | null; remarques?: string | null; statut?: string | null; created_at?: string | null;
}
interface DemandeMariage {
  id: string; nom: string; prenom: string; email: string; telephone?: string | null; type_evenement?: string | null;
  date_mariage?: string | null; lieu?: string | null; nb_invites?: number | null; services?: string | null;
  remarques?: string | null; statut?: string | null; created_at?: string | null;
}
interface DevisRow {
  id: string; numero: string | null; type: string; client_nom: string; client_societe: string | null;
  titre: string | null; date_evenement: string | null; total_ttc: number; statut: string; date_emission: string;
  devise: string;
}

interface Props {
  demandesEntreprise: DemandeEntreprise[];
  demandesMariage: DemandeMariage[];
  onDemandesChange?: () => void;
}

const LOGO = logoDevis;
const toNum = (v: string) => (v === "" ? 0 : Number(v.replace(",", ".")));

export default function DevisRapide({ demandesEntreprise, demandesMariage, onDemandesChange }: Props) {
  const { toast } = useToast();
  const [onglet, setOnglet] = useState("liste");
  const [devisList, setDevisList] = useState<DevisRow[]>([]);
  const [catalogue, setCatalogue] = useState<Prestation[]>([]);
  const [params, setParams] = useState<Parametres | null>(null);
  const [form, setForm] = useState<DevisForm | null>(null);
  const [saving, setSaving] = useState(false);
  const [recherche, setRecherche] = useState("");
  const [filtreStatut, setFiltreStatut] = useState("tous");

  const charger = async () => {
    const [d, c, p] = await Promise.all([
      supabase.from("devis").select("id, numero, type, client_nom, client_societe, titre, date_evenement, total_ttc, statut, date_emission, devise").order("created_at", { ascending: false }),
      supabase.from("catalogue_prestations").select("*").order("categorie").order("ordre").order("designation"),
      supabase.from("parametres_agence").select("*").eq("id", 1).maybeSingle(),
    ]);
    if (d.error || c.error || p.error) {
      toast({ title: "Erreur", description: "Impossible de charger les devis", variant: "destructive" });
      return;
    }
    setDevisList((d.data ?? []) as DevisRow[]);
    setCatalogue((c.data ?? []) as Prestation[]);
    setParams(p.data as Parametres | null);
  };

  useEffect(() => {
    charger();
    const rafraichir = () => charger();
    window.addEventListener("heavent:devis-modifie", rafraichir);
    return () => window.removeEventListener("heavent:devis-modifie", rafraichir);
  }, []);

  const totaux = useMemo(
    () => (form ? calculerTotaux(form.lignes, form.remise_globale_pct, form.taux_tva, form.acompte_pct) : null),
    [form],
  );
  const devise = params?.devise ?? "MAD";

  // ---------- ouverture d'un devis ----------
  const nouveau = () => { setForm(nouveauDevis(params)); setOnglet("editeur"); };

  /**
   * Devis spécial Nawar Perfumes : parfums à 80 MAD l'unité (prix et quantité modifiables),
   * avec le personnel et le transport pré-ajoutés — tout reste modifiable / supprimable.
   */
  const nouveauNawar = () => {
    const f = nouveauDevis(params);
    const cat = (designation: string, quantite: number, duree = 1): Ligne | null => {
      const c = catalogue.find((x) => x.actif && x.designation === designation);
      return c ? { ...ligneVide(), designation: c.designation, description: c.description ?? "", quantite, duree,
        unite: c.unite as Ligne["unite"], prix_unitaire: Number(c.prix_unitaire) } : null;
    };
    const parfums: Ligne = { ...ligneVide(), designation: "Parfums Nawar Perfumes", description: "Prix par parfum",
      quantite: 100, duree: 1, unite: "unite", prix_unitaire: 80 };
    setForm({
      ...f, type: "entreprise", client_societe: "Nawar Perfumes", titre: "Prestation Nawar Perfumes",
      lignes: [parfums, cat("Animateur / animatrice promotionnel(le)", 2) ?? cat("Hôtesse d'accueil", 2), cat("Transport du staff (même ville)", 2)]
        .filter(Boolean) as Ligne[],
    });
    setOnglet("editeur");
    toast({ title: "Devis Nawar Perfumes prêt", description: "Ajuste le nombre de parfums et le prix (80 MAD par défaut), puis le personnel et le transport." });
  };

  const depuisDemandeEntreprise = (dem: DemandeEntreprise) => {
    const f = nouveauDevis(params);
    setForm({
      ...f, type: "entreprise", demande_entreprise_id: dem.id,
      client_nom: `${dem.prenom} ${dem.nom}`.trim(), client_societe: dem.entreprise ?? "",
      client_email: dem.email ?? "", client_telephone: dem.telephone ?? "",
      titre: dem.services ? `Prestation : ${dem.services}` : "Événement entreprise",
      date_evenement: dem.date_evenement ?? "", lieu: dem.lieu ?? "",
      nb_personnes: dem.nb_personnes ? String(dem.nb_personnes) : "",
      notes_internes: dem.remarques ? `Demande du client : ${dem.remarques}` : "",
      lignes: dem.nb_staff ? [(() => {
        const h = catalogue.find((c) => c.actif && c.categorie === "staff" && c.unite === "jour");
        return { ...ligneVide(), designation: h?.designation ?? "Hôte / hôtesse d'accueil", description: h?.description ?? "",
          quantite: dem.nb_staff!, duree: 1, unite: "jour" as const, prix_unitaire: Number(h?.prix_unitaire ?? 0) };
      })()] : [ligneVide()],
    });
    setOnglet("editeur");
  };

  /** Pré-remplit le devis avec les prestations du catalogue correspondant aux services cochés par le client. */
  const lignesDepuisDemandeMariage = (dem: DemandeMariage): Ligne[] => {
    const services = (dem.services ?? "").toLowerCase();
    const texte = `${dem.remarques ?? ""}`.toLowerCase();
    const invites = Number(dem.nb_invites || 0);
    const res: Ligne[] = [];
    const ajouter = (designation: string, quantite = 1, duree = 1, description?: string) => {
      const c = catalogue.find((x) => x.actif && x.designation === designation);
      if (!c) return;
      res.push({ ...ligneVide(), designation: c.designation, description: description ?? c.description ?? "", quantite, duree,
        unite: c.unite as Ligne["unite"], prix_unitaire: Number(c.prix_unitaire) });
    };
    if (services.includes("wedding planner")) ajouter("Organisation complète du mariage");
    if (services.includes("hôtesse")) {
      // Le client précise souvent le nombre dans ses remarques : « 3 hôtesses et 2 stewards »
      const nb = (re: RegExp) => Number(texte.match(re)?.[1] ?? 0);
      const hotesses = nb(/(\d+)\s*h[oô]tesses?/), hotes = nb(/(\d+)\s*(?:stewards?|h[oô]tes\b)/);
      const bilingue = /bilingue|trilingue|fran[cç]ais.*arabe|arabe.*fran[cç]ais|anglais/.test(texte);
      const modele = bilingue ? "Hôtesse bilingue" : "Hôtesses d'accueil invités (mariage)";
      if (hotesses || hotes) {
        if (hotesses) ajouter(modele, hotesses, 1, bilingue ? "Hôtesses d'accueil bilingues pour l'accueil et le placement des invités" : undefined);
        if (hotes) { ajouter(modele, hotes, 1, `Stewards${bilingue ? " bilingues" : ""} — accueil, orientation et placement des invités`); res[res.length - 1].designation = `Steward${bilingue ? " bilingue" : ""}`; }
      } else ajouter(modele, Math.max(2, Math.ceil(invites / 50)));
    }
    if (services.includes("traiteur")) ajouter("Traiteur mariage (menu complet)", invites || 1);
    if (services.includes("dj")) ajouter("DJ / animation musicale");
    if (services.includes("décoration")) ajouter("Décoration et art floral");
    if (services.includes("photographe")) ajouter("Photographe mariage");
    if (services.includes("vidéaste")) ajouter("Vidéaste mariage");
    if (services.includes("transport")) ajouter("Transport des invités (navette)", Math.max(1, Math.ceil(invites / 50)));
    if (services.includes("cérémonie")) res.push({ ...ligneVide(), designation: "Officiant / maître de cérémonie", description: "Cérémonie personnalisée", unite: "forfait", prix_unitaire: 6000 });
    return res.length ? res : [ligneVide()];
  };

  const depuisDemandeMariage = (dem: DemandeMariage) => {
    const f = nouveauDevis(params);
    setForm({
      ...f, type: "mariage", demande_mariage_id: dem.id,
      client_nom: `${dem.prenom} ${dem.nom}`.trim(), client_email: dem.email ?? "", client_telephone: dem.telephone ?? "",
      titre: `${dem.type_evenement || "Mariage"} ${[dem.nom, dem.prenom].filter(Boolean).join(" & ")}`.trim(),
      date_evenement: dem.date_mariage ?? "", lieu: dem.lieu ?? "",
      nb_personnes: dem.nb_invites ? String(dem.nb_invites) : "",
      notes_internes: [dem.services && `Services demandés : ${dem.services}`, dem.remarques && `Remarques : ${dem.remarques}`].filter(Boolean).join("\n"),
      lignes: lignesDepuisDemandeMariage(dem),
    });
    setOnglet("editeur");
  };

  const chargerDevis = async (id: string, dupliquer = false): Promise<DevisForm | null> => {
    const [{ data: d, error }, { data: lignes }] = await Promise.all([
      supabase.from("devis").select("*").eq("id", id).single(),
      supabase.from("devis_lignes").select("*").eq("devis_id", id).order("ordre"),
    ]);
    if (error || !d) { toast({ title: "Erreur", description: "Devis introuvable", variant: "destructive" }); return null; }
    const f: DevisForm = {
      id: dupliquer ? undefined : d.id,
      numero: dupliquer ? null : d.numero,
      type: d.type as DevisForm["type"],
      demande_entreprise_id: dupliquer ? null : d.demande_entreprise_id,
      demande_mariage_id: dupliquer ? null : d.demande_mariage_id,
      client_nom: d.client_nom, client_societe: d.client_societe ?? "", client_email: d.client_email ?? "",
      client_telephone: d.client_telephone ?? "", client_adresse: d.client_adresse ?? "", client_ice: d.client_ice ?? "",
      titre: d.titre ?? "", date_evenement: d.date_evenement ?? "", date_fin_evenement: d.date_fin_evenement ?? "",
      lieu: d.lieu ?? "", nb_personnes: d.nb_personnes ? String(d.nb_personnes) : "",
      remise_globale_pct: Number(d.remise_globale_pct), taux_tva: Number(d.taux_tva), acompte_pct: Number(d.acompte_pct),
      statut: dupliquer ? "brouillon" : d.statut,
      date_emission: dupliquer ? today() : d.date_emission,
      date_validite: dupliquer ? "" : d.date_validite ?? "",
      conditions: d.conditions ?? "", notes_internes: d.notes_internes ?? "",
      lignes: (lignes ?? []).map((l) => ({
        designation: l.designation, description: l.description ?? "", quantite: Number(l.quantite),
        duree: Number(l.duree), unite: l.unite as Ligne["unite"], prix_unitaire: Number(l.prix_unitaire), remise_pct: Number(l.remise_pct),
      })),
    };
    if (f.lignes.length === 0) f.lignes = [ligneVide()];
    return f;
  };

  const ouvrir = async (id: string, dupliquer = false) => {
    const f = await chargerDevis(id, dupliquer);
    if (!f) return;
    setForm(f);
    setOnglet("editeur");
  };

  useEffect(() => {
    const enAttente = (window as any).__heaventDevisAOuvrir;
    if (enAttente) { (window as any).__heaventDevisAOuvrir = null; ouvrir(enAttente); }
    const f = (e: Event) => { (window as any).__heaventDevisAOuvrir = null; ouvrir((e as CustomEvent<string>).detail); };
    window.addEventListener("heavent:ouvrir-devis", f);
    return () => window.removeEventListener("heavent:ouvrir-devis", f);
  });

  // ---------- édition ----------
  const set = <K extends keyof DevisForm>(k: K, v: DevisForm[K]) => setForm((f) => (f ? { ...f, [k]: v } : f));
  const setLigne = (i: number, patch: Partial<Ligne>) =>
    setForm((f) => (f ? { ...f, lignes: f.lignes.map((l, j) => (j === i ? { ...l, ...patch } : l)) } : f));
  const ajouterLigne = (l: Ligne = ligneVide()) =>
    setForm((f) => {
      if (!f) return f;
      // remplace la première ligne si elle est encore vide
      const lignes = f.lignes.length === 1 && !f.lignes[0].designation.trim() ? [l] : [...f.lignes, l];
      return { ...f, lignes };
    });
  const supprimerLigne = (i: number) =>
    setForm((f) => (f ? { ...f, lignes: f.lignes.length > 1 ? f.lignes.filter((_, j) => j !== i) : [ligneVide()] } : f));
  const deplacer = (i: number, dir: -1 | 1) =>
    setForm((f) => {
      if (!f) return f;
      const j = i + dir;
      if (j < 0 || j >= f.lignes.length) return f;
      const lignes = [...f.lignes];
      [lignes[i], lignes[j]] = [lignes[j], lignes[i]];
      return { ...f, lignes };
    });
  const joursEvenement = () => {
    if (!form?.date_evenement || !form.date_fin_evenement) return 1;
    const n = Math.round((new Date(form.date_fin_evenement).getTime() - new Date(form.date_evenement).getTime()) / 86400000) + 1;
    return n > 0 ? n : 1;
  };
  const ajouterDuCatalogue = (p: Prestation) =>
    ajouterLigne({
      designation: p.designation, description: p.description ?? "",
      // quantité = nombre de personnes de la ligne précédente, durée = nombre de jours de l'événement
      quantite: p.unite === "forfait" ? 1 : (form?.lignes.filter((l) => l.designation.trim()).slice(-1)[0]?.quantite || 1),
      duree: p.unite === "jour" || p.unite === "personne" ? joursEvenement() : 1,
      unite: p.unite as Ligne["unite"], prix_unitaire: Number(p.prix_unitaire), remise_pct: 0,
    });

  // ---------- enregistrement ----------
  const enregistrer = async (statut?: string): Promise<DevisForm | null> => {
    if (!form) return null;
    if (!form.client_nom.trim()) { toast({ title: "Nom du client manquant", variant: "destructive" }); return null; }
    const lignes = form.lignes.filter((l) => l.designation.trim());
    if (lignes.length === 0) { toast({ title: "Ajoute au moins une ligne", variant: "destructive" }); return null; }

    setSaving(true);
    try {
      const payload = {
        type: form.type,
        demande_entreprise_id: form.demande_entreprise_id ?? null,
        demande_mariage_id: form.demande_mariage_id ?? null,
        client_nom: form.client_nom.trim(),
        client_societe: form.client_societe || null, client_email: form.client_email || null,
        client_telephone: form.client_telephone || null, client_adresse: form.client_adresse || null,
        client_ice: form.client_ice || null, titre: form.titre || null,
        date_evenement: form.date_evenement || null, date_fin_evenement: form.date_fin_evenement || null,
        lieu: form.lieu || null, nb_personnes: form.nb_personnes ? parseInt(form.nb_personnes) : null,
        remise_globale_pct: form.remise_globale_pct || 0, taux_tva: form.taux_tva ?? 20, acompte_pct: form.acompte_pct || 0,
        devise, statut: statut ?? form.statut, date_emission: form.date_emission || today(),
        date_validite: form.date_validite || null, conditions: form.conditions || null, notes_internes: form.notes_internes || null,
        ...(statut === "envoye" ? { date_envoi: new Date().toISOString() } : {}),
      };

      let id = form.id;
      if (id) {
        const { error } = await supabase.from("devis").update(payload).eq("id", id);
        if (error) throw error;
        const { error: delErr } = await supabase.from("devis_lignes").delete().eq("devis_id", id);
        if (delErr) throw delErr;
      } else {
        const { data, error } = await supabase.from("devis").insert(payload).select("id").single();
        if (error) throw error;
        id = data.id;
      }
      const { error: lErr } = await supabase.from("devis_lignes").insert(
        lignes.map((l, i) => ({
          devis_id: id!, ordre: i, designation: l.designation.trim(), description: l.description || null,
          quantite: l.quantite || 0, duree: l.duree || 0, unite: l.unite, prix_unitaire: l.prix_unitaire || 0, remise_pct: l.remise_pct || 0,
        })),
      );
      if (lErr) throw lErr;

      // Suivi de la demande d'origine
      if (statut === "envoye" || statut === "accepte" || statut === "refuse") {
        const t = calculerTotaux(lignes, form.remise_globale_pct, form.taux_tva);
        const maj = { statut, montant_total: t.ttc, date_envoi_devis: new Date().toISOString() };
        if (form.demande_entreprise_id) await supabase.from("devis_entreprise").update(maj).eq("id", form.demande_entreprise_id);
        if (form.demande_mariage_id) await supabase.from("devis_mariage").update(maj).eq("id", form.demande_mariage_id);
        onDemandesChange?.();
      }

      const { data: saved } = await supabase.from("devis").select("numero, date_validite, statut").eq("id", id!).single();
      const next: DevisForm = {
        ...form, id, lignes, numero: saved?.numero ?? form.numero,
        date_validite: saved?.date_validite ?? form.date_validite, statut: saved?.statut ?? form.statut,
      };
      setForm(next);
      toast({ title: "Devis enregistré", description: next.numero ?? "" });
      devisModifie();
      return next;
    } catch (e: any) {
      console.error(e);
      toast({ title: "Erreur", description: e.message ?? "Enregistrement impossible", variant: "destructive" });
      return null;
    } finally {
      setSaving(false);
    }
  };

  const [pdfEnCours, setPdfEnCours] = useState(false);

  /** Génère le PDF du devis et le télécharge directement (sans fenêtre d'impression). */
  const genererPdf = async (d: DevisForm) => {
    setPdfEnCours(true);
    const conteneur = document.createElement("div");
    try {
      // Logo intégré au document pour qu'il apparaisse à coup sûr dans le PDF
      let logoSrc = LOGO;
      try {
        const blob = await fetch(LOGO).then((r) => r.blob());
        logoSrc = await new Promise<string>((res) => { const fr = new FileReader(); fr.onload = () => res(fr.result as string); fr.readAsDataURL(blob); });
      } catch { /* on garde l'URL */ }

      const { css, html } = devisMarkup(d, params, logoSrc);
      conteneur.style.cssText = "position:fixed;left:-10000px;top:0;z-index:-1;";
      conteneur.innerHTML = `<style>${css}</style>${html}`;
      document.body.appendChild(conteneur);
      await document.fonts?.ready;

      const html2pdf = (await import("html2pdf.js")).default;
      await html2pdf()
        .set({
          margin: 0,
          filename: nomFichierDevis(d),
          image: { type: "jpeg", quality: 0.95 },
          html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
          jsPDF: { unit: "px", format: [794, 1123], orientation: "portrait", hotfixes: ["px_scaling"] },
          pagebreak: { mode: ["css"], before: ".suite", avoid: ["tr", ".art", ".signature", ".bas"] },
        })
        .from(conteneur.querySelector(".devis-pages") as HTMLElement)
        .save();
      toast({ title: "PDF téléchargé", description: nomFichierDevis(d) });
    } catch (e: any) {
      console.error(e);
      toast({ title: "Erreur", description: "Le PDF n'a pas pu être généré", variant: "destructive" });
    } finally {
      conteneur.remove();
      setPdfEnCours(false);
    }
  };

  const telechargerPdf = async () => {
    const saved = await enregistrer();
    if (saved) await genererPdf(saved);
  };

  const telechargerPdfDepuisListe = async (id: string) => {
    const d = await chargerDevis(id);
    if (d) await genererPdf(d);
  };

  const changerStatut = async (id: string, statut: string) => {
    const { error } = await supabase.from("devis").update({ statut, ...(statut === "envoye" ? { date_envoi: new Date().toISOString() } : {}) }).eq("id", id);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    devisModifie();
  };

  const supprimer = async (id: string, numero: string | null) => {
    if (!confirm(`Supprimer définitivement le devis ${numero ?? ""} ?`)) return;
    const { error } = await supabase.from("devis").delete().eq("id", id);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    if (form?.id === id) setForm(null);
    charger();
  };

  // ---------- rendu ----------
  const filtres = devisList.filter((d) => {
    const q = recherche.trim().toLowerCase();
    const okQ = !q || [d.numero, d.client_nom, d.client_societe, d.titre].some((v) => v?.toLowerCase().includes(q));
    return okQ && (filtreStatut === "tous" || d.statut === filtreStatut);
  });
  const demandesEnAttente = [
    ...demandesEntreprise.filter((d) => !d.statut || d.statut === "en_attente").map((d) => ({ kind: "entreprise" as const, d })),
    ...demandesMariage.filter((d) => !d.statut || d.statut === "en_attente").map((d) => ({ kind: "mariage" as const, d })),
  ];
  const parCategorie = catalogue.filter((p) => p.actif).reduce<Record<string, Prestation[]>>((acc, p) => {
    (acc[p.categorie] ??= []).push(p);
    return acc;
  }, {});

  return (
    <Tabs value={onglet} onValueChange={setOnglet} className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <TabsList className="h-auto flex-wrap justify-start">
          <TabsTrigger value="liste">Mes devis</TabsTrigger>
          <TabsTrigger value="editeur" disabled={!form}>{form?.numero ?? (form ? "Nouveau devis" : "Éditeur")}</TabsTrigger>
          <TabsTrigger value="catalogue">Catalogue de prix</TabsTrigger>
          <TabsTrigger value="parametres">Infos agence</TabsTrigger>
        </TabsList>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={nouveauNawar}><Plus className="h-4 w-4 mr-1" /> Devis Nawar Perfumes</Button>
          <Button onClick={nouveau}><Plus className="h-4 w-4 mr-1" /> Nouveau devis</Button>
        </div>
      </div>

      {/* ------------------------- LISTE ------------------------- */}
      <TabsContent value="liste" className="space-y-4">
        {demandesEnAttente.length > 0 && (
          <Card>
            <CardHeader><CardTitle className="text-base">Demandes reçues sur le site, à chiffrer ({demandesEnAttente.length})</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {demandesEnAttente.slice(0, 8).map(({ kind, d }) => (
                <div key={d.id} className="flex flex-wrap items-center justify-between gap-2 border rounded-md p-3">
                  <div className="text-sm">
                    <span className="font-medium">{kind === "entreprise" ? (d as DemandeEntreprise).entreprise : `${d.prenom} ${d.nom}`}</span>
                    <span className="text-muted-foreground">
                      {" · "}{kind === "entreprise" ? "Entreprise" : (d as DemandeMariage).type_evenement || "Mariage"}
                      {" · "}{dateFr(kind === "entreprise" ? (d as DemandeEntreprise).date_evenement : (d as DemandeMariage).date_mariage) || "date à définir"}
                      {d.lieu ? ` · ${d.lieu}` : ""}
                    </span>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => kind === "entreprise" ? depuisDemandeEntreprise(d as DemandeEntreprise) : depuisDemandeMariage(d as DemandeMariage)}>
                    <FileText className="h-4 w-4 mr-1" /> Faire le devis
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="space-y-3">
            <CardTitle className="text-base">Devis ({devisList.length})</CardTitle>
            <div className="flex flex-wrap gap-2">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="h-4 w-4 absolute left-2 top-3 text-muted-foreground" />
                <Input className="pl-8" placeholder="Rechercher un client, un numéro…" value={recherche} onChange={(e) => setRecherche(e.target.value)} />
              </div>
              <Select value={filtreStatut} onValueChange={setFiltreStatut}>
                <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Tous les statuts</SelectItem>
                  {Object.entries(STATUTS).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            {filtres.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">
                Aucun devis pour l'instant. Clique sur « Nouveau devis » pour commencer.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>N°</TableHead><TableHead>Client</TableHead><TableHead>Événement</TableHead>
                    <TableHead className="text-right">Total TTC</TableHead><TableHead>Statut</TableHead><TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtres.map((d) => (
                    <TableRow key={d.id} className="cursor-pointer" onClick={() => ouvrir(d.id)}>
                      <TableCell className="font-mono text-xs">{d.numero}<div className="text-muted-foreground">{dateFr(d.date_emission)}</div></TableCell>
                      <TableCell>{d.client_societe || d.client_nom}{d.client_societe && <div className="text-xs text-muted-foreground">{d.client_nom}</div>}</TableCell>
                      <TableCell>{d.titre || "—"}<div className="text-xs text-muted-foreground">{dateFr(d.date_evenement)}</div></TableCell>
                      <TableCell className="text-right font-medium whitespace-nowrap">{money(d.total_ttc, d.devise)}</TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Select value={d.statut} onValueChange={(v) => changerStatut(d.id, v)}>
                          <SelectTrigger className="h-8 w-[120px] border-0 p-0 shadow-none">
                            <Badge className={STATUTS[d.statut]?.className}>{STATUTS[d.statut]?.label ?? d.statut}</Badge>
                          </SelectTrigger>
                          <SelectContent>{Object.entries(STATUTS).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}</SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <Button size="icon" variant="ghost" title="Télécharger le PDF" disabled={pdfEnCours} onClick={() => telechargerPdfDepuisListe(d.id)}><Download className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" title="Dupliquer" onClick={() => ouvrir(d.id, true)}><Copy className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" title="Supprimer" onClick={() => supprimer(d.id, d.numero)}><Trash2 className="h-4 w-4 text-red-600" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* ------------------------- ÉDITEUR ------------------------- */}
      <TabsContent value="editeur">
        {form && totaux && (
          <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
            <div className="space-y-4 min-w-0">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-base">{form.numero ? `Devis ${form.numero}` : "Nouveau devis"}</CardTitle>
                  <Select value={form.type} onValueChange={(v) => set("type", v as DevisForm["type"])}>
                    <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="evenement">Événement</SelectItem>
                      <SelectItem value="entreprise">Entreprise</SelectItem>
                      <SelectItem value="mariage">Mariage</SelectItem>
                    </SelectContent>
                  </Select>
                </CardHeader>
                <CardContent className="grid gap-3 sm:grid-cols-2">
                  <div><Label>Nom du contact *</Label><Input value={form.client_nom} onChange={(e) => set("client_nom", e.target.value)} /></div>
                  <div><Label>Société</Label><Input value={form.client_societe} onChange={(e) => set("client_societe", e.target.value)} /></div>
                  <div><Label>Email</Label><Input type="email" value={form.client_email} onChange={(e) => set("client_email", e.target.value)} /></div>
                  <div><Label>Téléphone</Label><Input value={form.client_telephone} onChange={(e) => set("client_telephone", e.target.value)} /></div>
                  <div><Label>Adresse</Label><Input value={form.client_adresse} onChange={(e) => set("client_adresse", e.target.value)} /></div>
                  <div><Label>ICE du client</Label><Input value={form.client_ice} onChange={(e) => set("client_ice", e.target.value)} /></div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Événement</CardTitle></CardHeader>
                <CardContent className="grid gap-3 sm:grid-cols-2">
                  <div className="sm:col-span-2"><Label>Intitulé</Label><Input placeholder="Ex. Salon Auto Expo — accueil stand" value={form.titre} onChange={(e) => set("titre", e.target.value)} /></div>
                  <div><Label>Date de début</Label><Input type="date" value={form.date_evenement} onChange={(e) => set("date_evenement", e.target.value)} /></div>
                  <div><Label>Date de fin (si plusieurs jours)</Label><Input type="date" value={form.date_fin_evenement} onChange={(e) => set("date_fin_evenement", e.target.value)} /></div>
                  <div><Label>Lieu</Label><Input value={form.lieu} onChange={(e) => set("lieu", e.target.value)} /></div>
                  <div><Label>Nombre d'invités / participants</Label><Input type="number" min={0} value={form.nb_personnes} onChange={(e) => set("nb_personnes", e.target.value)} /></div>
                </CardContent>
              </Card>

              <EquipeEvenement
                devisId={form.id}
                titre={form.titre}
                lieu={form.lieu}
                dateDebut={form.date_evenement}
                dateFin={form.date_fin_evenement}
              />

              <Card>
                <CardHeader className="space-y-3">
                  <CardTitle className="text-base">Prestations</CardTitle>
                  {Object.keys(parCategorie).length > 0 ? (
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Ajout rapide depuis ton catalogue :</p>
                      {Object.entries(parCategorie).map(([cat, items]) => (
                        <div key={cat} className="flex flex-wrap gap-2 items-center">
                          <span className="text-xs uppercase tracking-wide text-muted-foreground w-24">{cat}</span>
                          {items.map((p) => (
                            <Button key={p.id} size="sm" variant="secondary" className="h-auto min-h-9 max-w-full whitespace-normal text-left py-1.5" onClick={() => ajouterDuCatalogue(p)}>
                              + {p.designation} <span className="ml-1 text-muted-foreground">{money(p.prix_unitaire, devise)}</span>
                            </Button>
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Astuce : remplis l'onglet « Catalogue de prix » pour ajouter tes prestations en un clic.
                    </p>
                  )}
                </CardHeader>
                <CardContent className="space-y-3">
                  {form.lignes.map((l, i) => (
                    <div key={i} className="border rounded-md p-3 space-y-2">
                      <div className="flex gap-2">
                        <Input className="font-medium" placeholder="Désignation (ex. Hôtesse d'accueil bilingue)" value={l.designation} onChange={(e) => setLigne(i, { designation: e.target.value })} />
                        <Button size="icon" variant="ghost" onClick={() => deplacer(i, -1)} disabled={i === 0}><ArrowUp className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => deplacer(i, 1)} disabled={i === form.lignes.length - 1}><ArrowDown className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => supprimerLigne(i)}><X className="h-4 w-4" /></Button>
                      </div>
                      <Textarea rows={1} className="min-h-[38px]" placeholder="Détail (facultatif)" value={l.description} onChange={(e) => setLigne(i, { description: e.target.value })} />
                      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 items-end">
                        <div><Label className="text-xs">Quantité</Label><Input type="number" min={0} step="any" value={l.quantite} onChange={(e) => setLigne(i, { quantite: toNum(e.target.value) })} /></div>
                        <div><Label className="text-xs">Durée</Label><Input type="number" min={0} step="any" value={l.duree} disabled={l.unite === "forfait"} onChange={(e) => setLigne(i, { duree: toNum(e.target.value) })} /></div>
                        <div><Label className="text-xs">Unité</Label>
                          <Select value={l.unite} onValueChange={(v) => setLigne(i, { unite: v as Ligne["unite"], ...(v === "forfait" ? { duree: 1 } : {}) })}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>{UNITES.map((u) => <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>)}</SelectContent>
                          </Select>
                        </div>
                        <div><Label className="text-xs">Prix unitaire HT</Label><Input type="number" min={0} step="any" value={l.prix_unitaire} onChange={(e) => setLigne(i, { prix_unitaire: toNum(e.target.value) })} /></div>
                        <div><Label className="text-xs">Remise %</Label><Input type="number" min={0} max={100} step="any" value={l.remise_pct} onChange={(e) => setLigne(i, { remise_pct: toNum(e.target.value) })} /></div>
                        <div className="text-right text-sm font-semibold pb-2 whitespace-nowrap">{money(totalLigne(l), devise)}</div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" onClick={() => ajouterLigne()}><Plus className="h-4 w-4 mr-1" /> Ajouter une ligne</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Conditions et notes</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div><Label>Conditions (imprimées sur le devis)</Label><Textarea rows={3} value={form.conditions} onChange={(e) => set("conditions", e.target.value)} /></div>
                  <div><Label>Notes internes (non imprimées)</Label><Textarea rows={3} value={form.notes_internes} onChange={(e) => set("notes_internes", e.target.value)} /></div>
                </CardContent>
              </Card>
            </div>

            {/* Récapitulatif */}
            <div className="space-y-4 lg:sticky lg:top-4 h-fit">
              <Card>
                <CardHeader><CardTitle className="text-base">Récapitulatif</CardTitle></CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between"><span>Total HT</span><span>{money(totaux.ht, devise)}</span></div>
                  <div className="flex items-center justify-between gap-2">
                    <span>Remise globale %</span>
                    <Input className="w-20 h-8 text-right" type="number" min={0} max={100} step="any" value={form.remise_globale_pct} onChange={(e) => set("remise_globale_pct", toNum(e.target.value))} />
                  </div>
                  {totaux.remise > 0 && <div className="flex justify-between text-muted-foreground"><span>Net HT</span><span>{money(totaux.base, devise)}</span></div>}
                  <div className="flex items-center justify-between gap-2">
                    <span>TVA %</span>
                    <Input className="w-20 h-8 text-right" type="number" min={0} step="any" value={form.taux_tva} onChange={(e) => set("taux_tva", toNum(e.target.value))} />
                  </div>
                  <div className="flex justify-between text-muted-foreground"><span>Montant TVA</span><span>{money(totaux.tva, devise)}</span></div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2"><span>Total TTC</span><span>{money(totaux.ttc, devise)}</span></div>
                  <div className="flex items-center justify-between gap-2">
                    <span>Acompte %</span>
                    <Input className="w-20 h-8 text-right" type="number" min={0} max={100} step="any" value={form.acompte_pct} onChange={(e) => set("acompte_pct", toNum(e.target.value))} />
                  </div>
                  <div className="flex justify-between text-muted-foreground"><span>Acompte demandé</span><span>{money(totaux.acompte, devise)}</span></div>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div><Label className="text-xs">Émis le</Label><Input type="date" value={form.date_emission} onChange={(e) => set("date_emission", e.target.value)} /></div>
                    <div><Label className="text-xs">Valable jusqu'au</Label><Input type="date" value={form.date_validite} placeholder="auto" onChange={(e) => set("date_validite", e.target.value)} /></div>
                  </div>
                  <div>
                    <Label className="text-xs">Statut</Label>
                    <Select value={form.statut} onValueChange={(v) => set("statut", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{Object.entries(STATUTS).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
              <div className="grid gap-2">
                <Button onClick={() => enregistrer()} disabled={saving}><Save className="h-4 w-4 mr-1" /> Enregistrer</Button>
                <Button variant="outline" onClick={telechargerPdf} disabled={saving || pdfEnCours}><Download className="h-4 w-4 mr-1" /> {pdfEnCours ? "Création du PDF…" : "Télécharger le PDF"}</Button>
                <Button variant="outline" onClick={() => enregistrer("envoye")} disabled={saving}>Marquer comme envoyé</Button>
                <Button variant="ghost" onClick={() => { setForm(null); setOnglet("liste"); }}>Fermer</Button>
              </div>
            </div>
          </div>
        )}
      </TabsContent>

      <TabsContent value="catalogue">
        <CataloguePrestations items={catalogue} devise={devise} onChange={charger} />
      </TabsContent>
      <TabsContent value="parametres">
        <ParametresAgence value={params} onSaved={charger} />
      </TabsContent>
    </Tabs>
  );
}
