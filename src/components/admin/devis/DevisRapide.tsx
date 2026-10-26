import { useEffect, useMemo, useState } from "react";
import { estDemo } from "@/demo/mode";
import { supabase } from "@/integrations/supabase/client";
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
import { Archive, ArchiveRestore, ArrowDown, ArrowUp, Copy, Download, FileText, Image as ImageIcon, Link2, Plus, Save, Search, Send, Trash2, X } from "lucide-react";
import {
  DevisForm, Ligne, Parametres, Prestation, STATUTS, UNITES, devisSupprimable, statutsPermis,
  calculerTotaux, dateFr, dateHeureFr, devisDepuisBase, lienClientDevis, ligneVide, money, nouveauDevis, today, totalLigne,
} from "./devisUtils";
import { telechargerDevisPdf } from "./devisPdf";
import { telechargerImageDevis, FormatImage } from "./devisImage";
import CataloguePrestations from "./CataloguePrestations";
import ParametresAgence from "./ParametresAgence";
import EspaceMariesAdmin from "./EspaceMariesAdmin";
import EquipeEvenement from "@/components/admin/equipe/EquipeEvenement";
import { devisModifie } from "./DevisParStatut";
import { FacturesDevis, ListeFactures } from "./Factures";
import ReponsesWhatsApp from "@/components/admin/ReponsesWhatsApp";

const nomEvenement = (type?: string | null) => { const t = (type || "").trim().toLowerCase(); return !t ? "votre événement" : t.startsWith("mariage") ? "votre mariage" : `votre ${t}`; };

interface DemandeEntreprise {
  id: string; nom: string; prenom: string; email: string; telephone?: string | null; entreprise: string;
  date_evenement?: string | null; lieu?: string | null; nb_personnes?: number | null; nb_staff?: number | null;
  services?: string | null; remarques?: string | null; statut?: string | null; created_at?: string | null;
}
interface DemandeMariage {
  id: string; nom: string; prenom: string; email: string; telephone?: string | null; type_evenement?: string | null;
  date_mariage?: string | null; lieu?: string | null; nb_invites?: number | null; services?: string | null;
  remarques?: string | null; statut?: string | null; created_at?: string | null;
  /** Demande venue du jeu « Crée ton événement » : nombre d'éléments par type */
  configuration?: { invites?: number | null; elements?: Record<string, number>; centres?: number; libelles?: Record<string, string>; sur_mesure?: { nom: string; quantite: number }[]; agrandis?: { type: string; cases: number }[] } | null;
}
interface DevisRow {
  id: string; numero: string | null; type: string; client_nom: string; client_societe: string | null;
  titre: string | null; date_evenement: string | null; total_ttc: number; statut: string; date_emission: string;
  devise: string; signe_le?: string | null; relances?: number | null; rdv_demande_le?: string | null;
  archive?: boolean; nbFactures?: number; contratsSignes?: number; equipe?: number;
}

interface Props {
  demandesEntreprise: DemandeEntreprise[];
  demandesMariage: DemandeMariage[];
  onDemandesChange?: () => void;
}

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
      supabase.from("devis").select("id, numero, type, marque, client_nom, client_societe, titre, date_evenement, total_ttc, statut, date_emission, devise, signe_le, relances, rdv_demande_le, archive, factures(id), contrats(signe_le), affectations(staff_id, statut)").order("created_at", { ascending: false }),
      supabase.from("catalogue_prestations").select("*").order("categorie").order("ordre").order("designation"),
      supabase.from("parametres_agence").select("*").eq("id", 1).maybeSingle(),
    ]);
    if (d.error || c.error || p.error) {
      toast({ title: "Erreur", description: "Impossible de charger les devis", variant: "destructive" });
      return;
    }
    setDevisList(((d.data ?? []) as any[]).map(({ factures, contrats, affectations, ...x }) => ({
      ...x, nbFactures: (factures ?? []).length, contratsSignes: (contrats ?? []).filter((c: any) => c.signe_le).length,
      equipe: new Set((affectations ?? []).filter((a: any) => a.statut !== "annule").map((a: any) => a.staff_id)).size,
    })) as DevisRow[]);
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
   * Devis bar à parfums Nawar (logo Nawar) : parfums à 80 MAD l'unité (prix et quantité modifiables),
   * avec le personnel et le transport pré-ajoutés — tout reste modifiable / supprimable.
   */
  const nouveauNawar = () => {
    const f = nouveauDevis(params);
    const cat = (designation: string, quantite: number, duree = 1): Ligne | null => {
      const c = catalogue.find((x) => x.actif && x.designation === designation);
      return c ? { ...ligneVide(), designation: c.designation, description: c.description ?? "", quantite, duree,
        unite: c.unite as Ligne["unite"], prix_unitaire: Number(c.prix_unitaire) } : null;
    };
    const parfums: Ligne = { ...ligneVide(), designation: "Parfums — bar à parfums Nawar", description: "Prix par parfum",
      quantite: 50, duree: 1, unite: "unite", prix_unitaire: 80 };
    setForm({
      ...f, type: "evenement", marque: "nawar", titre: "Bar à parfums Nawar", acompte_pct: 50,
      lignes: [parfums, cat("Animateur / animatrice promotionnel(le)", 2) ?? cat("Hôtesse d'accueil", 2), cat("Transport du staff (même ville)", 2)]
        .filter(Boolean) as Ligne[],
    });
    setOnglet("editeur");
    toast({ title: "Devis Nawar prêt (logo Nawar)", description: "Indique le client. Minimum 50 parfums : ajuste la quantité et le prix (80 MAD par défaut), puis le personnel et le transport." });
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

  /**
   * Demande venue du jeu : une ligne de devis par prestation du catalogue reliée au jeu,
   * avec les prix ACTUELS du catalogue (fixe × nombre d'éléments, « personne » × nombre d'invités).
   */
  const lignesDepuisConfiguration = (dem: DemandeMariage): Ligne[] | null => {
    const conf = dem.configuration;
    if (!conf?.elements || !Object.keys(conf.elements).length) return null;
    const invites = Number(conf.invites ?? dem.nb_invites ?? 0) || 0;
    const quantites: Record<string, number> = { ...conf.elements, ...(conf.centres ? { centres: conf.centres } : {}) };
    const res: Ligne[] = [];
    const sansPrix: string[] = [];
    for (const [type, n] of Object.entries(quantites)) {
      if (type === "objet_libre" || type === "espace_libre") continue; // idées sur mesure : lignes à part, ci-dessous
      const lignesCat = catalogue.filter((c) => c.actif && (c as any).jeu_element === type).sort((a, b) => a.ordre - b.ordre);
      if (!lignesCat.length) { sansPrix.push(conf.libelles?.[type] ?? type); continue; }
      for (const c of lignesCat) {
        // Parfums Nawar : un par invité, 50 minimum
        const parPersonne = c.unite === "personne" || type === "nawar";
        const qte = type === "nawar" ? Math.max(invites, 50) : invites;
        res.push({ ...ligneVide(), designation: type === "honneur" && conf.libelles?.honneur ? conf.libelles.honneur : c.designation,
          description: c.description ?? "", quantite: parPersonne ? qte : n, duree: 1, unite: c.unite as Ligne["unite"], prix_unitaire: Number(c.prix_unitaire) });
      }
    }
    // Éléments agrandis : une ligne de supplément par type (cases ajoutées × prix de la case du catalogue)
    const casesParType: Record<string, number> = {};
    for (const a of conf.agrandis ?? []) casesParType[a.type] = (casesParType[a.type] ?? 0) + (Number(a.cases) || 0);
    for (const [type, cases] of Object.entries(casesParType)) {
      if (cases <= 0) continue;
      const c = catalogue.find((x) => x.actif && (x as any).jeu_element === `${type}+case`);
      if (c) res.push({ ...ligneVide(), designation: c.designation, description: c.description ?? "", quantite: cases, duree: 1, unite: c.unite as Ligne["unite"], prix_unitaire: Number(c.prix_unitaire) });
      else sansPrix.push(`${conf.libelles?.[type] ?? type} : ${cases} case(s) en plus`);
    }
    if (sansPrix.length) res.push({ ...ligneVide(), designation: sansPrix.join(", "), description: "Élément(s) du jeu sans prix au catalogue : à chiffrer", quantite: 1, unite: "forfait" });
    // Idées sur mesure nommées par le client dans le jeu : une ligne chacune, prix à renseigner
    for (const x of conf.sur_mesure ?? []) {
      res.push({ ...ligneVide(), designation: x.nom, description: "Idée sur mesure du client (jeu) : prix à renseigner", quantite: x.quantite || 1, duree: 1, unite: "forfait", prix_unitaire: 0 });
    }
    return res.length ? res : null;
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
      lignes: lignesDepuisConfiguration(dem) ?? lignesDepuisDemandeMariage(dem),
    });
    if (dem.configuration?.elements) toast({ title: "Devis créé depuis le jeu", description: "Une ligne par élément choisi, aux prix actuels de ton catalogue. Ajuste ce qu'il faut puis enregistre." });
    setOnglet("editeur");
  };

  const chargerDevis = async (id: string, dupliquer = false): Promise<DevisForm | null> => {
    const [{ data: d, error }, { data: lignes }] = await Promise.all([
      supabase.from("devis").select("*").eq("id", id).single(),
      supabase.from("devis_lignes").select("*").eq("devis_id", id).order("ordre"),
    ]);
    if (error || !d) { toast({ title: "Erreur", description: "Devis introuvable", variant: "destructive" }); return null; }
    const base = devisDepuisBase(d, lignes ?? []);
    const f: DevisForm = dupliquer
      ? { ...base, id: undefined, numero: null, demande_entreprise_id: null, demande_mariage_id: null, statut: "brouillon",
          date_emission: today(), date_validite: "", lien_token: null, date_envoi: null, relances: 0, signe_le: null, signature_nom: null, signature_image: null }
      : base;
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

    // Devis déjà facturé (acompte) : on peut encore l'ajuster (heures en plus…), la signature reste valable
    // et la facture de solde tiendra compte du nouveau montant.
    let dejaFacture = false;
    if (form.id) {
      const { count } = await (supabase as any).from("factures").select("id", { count: "exact", head: true }).eq("devis_id", form.id).neq("statut", "annulee");
      dejaFacture = (count ?? 0) > 0;
    }
    if (form.signe_le && form.id && !dejaFacture) {
      const { data: avant } = await supabase.from("devis").select("total_ttc").eq("id", form.id).single();
      const t = calculerTotaux(lignes, form.remise_globale_pct, form.taux_tva);
      if (avant && Math.abs(Number(avant.total_ttc) - t.ttc) > 0.009 &&
        !confirm("Ce devis a été signé par le client. Le modifier annule sa signature : il faudra le lui renvoyer pour qu'il signe la nouvelle version. Continuer ?")) return null;
    }

    setSaving(true);
    try {
      const payload = {
        type: form.type, marque: form.marque ?? "heavent",
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

      // Signature invalidée si le montant signé a changé
      let signatureAnnulee = false;
      if (form.signe_le && form.id && !dejaFacture) {
        const { data: avant } = await supabase.from("devis").select("total_ttc").eq("id", form.id).single();
        const t = calculerTotaux(lignes, form.remise_globale_pct, form.taux_tva);
        if (avant && Math.abs(Number(avant.total_ttc) - t.ttc) > 0.009) {
          Object.assign(payload, { signe_le: null, signature_nom: null, signature_image: null, signature_preuve: null, statut: "envoye" });
          signatureAnnulee = true;
        }
      }

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

      const { data: saved } = await supabase.from("devis").select("numero, date_validite, statut, lien_token, signe_le, signature_nom, signature_image, date_envoi").eq("id", id!).single();
      const next: DevisForm = {
        ...form, id, lignes, numero: saved?.numero ?? form.numero,
        date_validite: saved?.date_validite ?? form.date_validite, statut: saved?.statut ?? form.statut,
        lien_token: saved?.lien_token ?? form.lien_token, date_envoi: saved?.date_envoi ?? form.date_envoi,
        signe_le: saved?.signe_le ?? null, signature_nom: saved?.signature_nom ?? null, signature_image: saved?.signature_image ?? null,
      };
      if (signatureAnnulee) toast({ title: "Signature du client annulée", description: "Le montant a changé : renvoie le devis au client pour qu'il signe la nouvelle version." });
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
    try {
      const nom = await telechargerDevisPdf(d, params);
      toast({ title: "PDF téléchargé", description: nom });
    } catch (e: any) {
      console.error(e);
      toast({ title: "Erreur", description: "Le PDF n'a pas pu être généré", variant: "destructive" });
    } finally {
      setPdfEnCours(false);
    }
  };

  /** Image du devis à partager sur les réseaux (titre, essentiel et prix final seulement). */
  const [imageEnCours, setImageEnCours] = useState(false);
  const genererImage = async (d: DevisForm, format: FormatImage) => {
    setImageEnCours(true);
    try {
      const nom = await telechargerImageDevis(d, params, format);
      toast({ title: "Image créée", description: nom });
    } catch (e: any) {
      console.error(e);
      toast({ title: "Erreur", description: "L'image n'a pas pu être créée", variant: "destructive" });
    } finally {
      setImageEnCours(false);
    }
  };
  const imageDepuisEditeur = async (format: FormatImage) => {
    const saved = await enregistrer();
    if (saved) await genererImage(saved, format);
  };
  const imageDepuisListe = async (id: string, format: FormatImage) => {
    const d = await chargerDevis(id);
    if (d) await genererImage(d, format);
  };

  // ---------- envoi au client avec lien de signature ----------
  const [envoiEnCours, setEnvoiEnCours] = useState(false);
  const envoyerAuClient = async () => {
    if (!form) return;
    if (!form.client_email.trim()) { toast({ title: "E-mail du client manquant", description: "Ajoute l'e-mail du client pour lui envoyer le devis.", variant: "destructive" }); return; }
    if (form.signe_le) { toast({ title: "Devis déjà signé", description: `Signé par ${form.signature_nom} le ${dateHeureFr(form.signe_le)}.` }); return; }
    const saved = await enregistrer();
    if (!saved?.id) return;
    if (!confirm(`Envoyer le devis ${saved.numero ?? ""} à ${saved.client_email} ? Il recevra un lien pour le consulter et le signer en ligne.`)) return;
    setEnvoiEnCours(true);
    const { data, error } = await supabase.functions.invoke("envoyer-devis", { body: { devisId: saved.id } });
    let message = data?.error as string | undefined;
    if (error && !message) { try { message = (await (error as any).context?.json())?.error; } catch { /* */ } }
    setEnvoiEnCours(false);
    if (error || data?.error) { toast({ title: "Devis non envoyé", description: message ?? "Réessaie dans un instant.", variant: "destructive" }); return; }
    setForm({ ...saved, statut: saved.statut === "brouillon" ? "envoye" : saved.statut, date_envoi: new Date().toISOString(), relances: 0 });
    toast({ title: "Devis envoyé ✉️", description: "Le client a reçu son lien de signature. Relances automatiques à J+5 et J+10 s'il ne répond pas." });
    devisModifie(); charger();
  };
  const copierLien = async () => {
    const lien = lienClientDevis(form?.lien_token);
    if (!lien) return;
    try { await navigator.clipboard.writeText(lien); toast({ title: "Lien copié", description: "Tu peux le coller dans WhatsApp ou un e-mail." }); }
    catch { prompt("Lien du devis pour le client :", lien); }
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
    const d = devisList.find((x) => x.id === id);
    if (d && (statut === "annule" || statut === "refuse") && d.statut !== "annule" && d.statut !== "refuse") {
      const consequences = [
        d.equipe ? `• ${d.equipe} personne${d.equipe > 1 ? "s" : ""} de l'équipe ser${d.equipe > 1 ? "ont libérées" : "a libérée"} (plus de mission, de pointage ni de paie pour cet événement)` : "",
        d.equipe || d.contratsSignes ? `• leurs contrats passeront « annulé » (les contrats signés restent archivés)` : "",
        d.nbFactures ? `• les factures existantes restent valables : annule-les ou encaisse-les dans le devis si besoin` : "",
      ].filter(Boolean);
      if (consequences.length && !confirm(`Passer le devis ${d.numero ?? ""} en « ${STATUTS[statut].label} » ?\n\n${consequences.join("\n")}`)) return;
    }
    const { error } = await supabase.from("devis").update({ statut, ...(statut === "envoye" ? { date_envoi: new Date().toISOString() } : {}) }).eq("id", id);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    devisModifie();
  };

  const supprimer = async (id: string, numero: string | null) => {
    if (!confirm(`Supprimer définitivement le devis ${numero ?? ""} ?`)) return;
    // Ses contrats non signés partent avec lui (sinon ils resteraient orphelins dans « Contrats »)
    await supabase.from("contrats").delete().eq("devis_id", id).is("signe_le", null);
    const { error } = await supabase.from("devis").delete().eq("id", id);
    if (error) { toast({ title: "Suppression impossible", description: error.message, variant: "destructive" }); charger(); return; }
    if (form?.id === id) setForm(null);
    charger();
  };

  /** Suppression volontaire d'un devis de TEST, même signé ou facturé : il faut retaper son numéro. */
  const supprimerTest = async (d: { id: string; numero: string | null; nbFactures?: number }) => {
    const num = d.numero ?? "";
    const avertissement = `ATTENTION — suppression définitive du devis ${num}.\n\nÀ n'utiliser que pour un devis de TEST. Le devis, ses factures (${d.nbFactures ?? 0}) et ses contrats seront effacés, sans retour possible. Une trace (numéro, date) est conservée dans le journal.\n\nPour confirmer, retape le numéro du devis :`;
    const saisie = window.prompt(avertissement, "");
    if (saisie === null) return;
    const { error } = await (supabase as any).rpc("supprimer_devis_test", { p_devis: d.id, p_confirmation: saisie.trim() });
    if (error) { toast({ title: "Suppression impossible", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Devis de test supprimé", description: num });
    if (form?.id === d.id) setForm(null);
    charger();
  };

  /** Archiver : retire un devis de la liste sans rien effacer (devis signés, facturés, annulés…). */
  const archiver = async (id: string, archive: boolean) => {
    const { error } = await (supabase as any).from("devis").update({ archive }).eq("id", id);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    toast({ title: archive ? "Devis archivé" : "Devis ressorti des archives", description: archive ? "Il reste consultable dans le filtre « Archivés »." : undefined });
    charger();
  };

  // ---------- rendu ----------
  const filtres = devisList.filter((d) => {
    const q = recherche.trim().toLowerCase();
    const okQ = !q || [d.numero, d.client_nom, d.client_societe, d.titre].some((v) => v?.toLowerCase().includes(q));
    if (filtreStatut === "archives") return okQ && !!d.archive;
    return okQ && !d.archive && (filtreStatut === "tous" || d.statut === filtreStatut);
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
          <TabsTrigger value="factures" data-testid="onglet-factures">Factures</TabsTrigger>
          <TabsTrigger value="catalogue">Catalogue de prix</TabsTrigger>
          <TabsTrigger value="parametres">Infos agence</TabsTrigger>
        </TabsList>
        <div className="flex flex-wrap gap-2">
          {!estDemo() && <Button variant="outline" onClick={nouveauNawar}><Plus className="h-4 w-4 mr-1" /> Devis Nawar — bar à parfums</Button>}
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
                    {kind === "mariage" && (d as DemandeMariage).configuration?.elements && <span className="ml-2 rounded-full bg-[#F4E9CF] text-[#7A5F1E] px-2 py-0.5 text-[11px]">✨ Créé avec le jeu · devis prérempli</span>}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <ReponsesWhatsApp compact contexte={{ telephone: d.telephone, prenom: kind === "entreprise" ? d.prenom : d.prenom || d.nom,
                      evenement: kind === "entreprise" ? "votre événement" : nomEvenement((d as DemandeMariage).type_evenement),
                      date: dateFr(kind === "entreprise" ? (d as DemandeEntreprise).date_evenement : (d as DemandeMariage).date_mariage) }} />
                    <Button size="sm" variant="outline" onClick={() => kind === "entreprise" ? depuisDemandeEntreprise(d as DemandeEntreprise) : depuisDemandeMariage(d as DemandeMariage)}>
                      <FileText className="h-4 w-4 mr-1" /> Faire le devis
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="space-y-3">
            <CardTitle className="text-base">Devis ({devisList.filter((d) => !d.archive).length})</CardTitle>
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
                  <SelectItem value="archives">🗄️ Archivés ({devisList.filter((d) => d.archive).length})</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            {filtres.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">
                {filtreStatut === "archives" ? "Aucun devis archivé." : devisList.length ? "Aucun devis ne correspond à ta recherche." : "Aucun devis pour l'instant. Clique sur « Nouveau devis » pour commencer."}
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
                      <TableCell className="font-mono text-xs">{d.numero}{(d as any).marque === "nawar" && <span className="ml-1 font-sans rounded bg-[#f5ecd2] text-[#8a6d1f] px-1.5 py-0.5 text-[10px]">Nawar</span>}<div className="text-muted-foreground">{dateFr(d.date_emission)}</div></TableCell>
                      <TableCell>{d.client_societe || d.client_nom}{d.client_societe && <div className="text-xs text-muted-foreground">{d.client_nom}</div>}</TableCell>
                      <TableCell>{d.titre || "—"}<div className="text-xs text-muted-foreground">{dateFr(d.date_evenement)}</div></TableCell>
                      <TableCell className="text-right font-medium whitespace-nowrap">{money(d.total_ttc, d.devise)}
                        {d.signe_le ? <div className="text-[11px] font-normal text-green-700">✍️ Signé en ligne</div>
                          : d.rdv_demande_le ? <div className="text-[11px] font-normal text-amber-700">📅 RDV demandé avant signature</div>
                          : d.statut === "envoye" && d.relances ? <div className="text-[11px] font-normal text-muted-foreground">{d.relances} relance{d.relances > 1 ? "s" : ""} auto</div> : null}
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Select value={d.statut} onValueChange={(v) => changerStatut(d.id, v)}>
                          <SelectTrigger className="h-8 w-[120px] border-0 p-0 shadow-none">
                            <Badge className={STATUTS[d.statut]?.className}>{STATUTS[d.statut]?.label ?? d.statut}</Badge>
                          </SelectTrigger>
                          <SelectContent>{statutsPermis(d).map((k) => <SelectItem key={k} value={k}>{STATUTS[k].label}</SelectItem>)}</SelectContent>
                        </Select>
                        {d.archive && <div className="text-[11px] text-muted-foreground mt-0.5">🗄️ archivé</div>}
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <Button size="icon" variant="ghost" title="Télécharger le PDF" disabled={pdfEnCours} onClick={() => telechargerPdfDepuisListe(d.id)}><Download className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" title="Image à partager (PNG)" disabled={imageEnCours} onClick={() => imageDepuisListe(d.id, "png")} data-testid="image-devis-liste"><ImageIcon className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" title="Dupliquer" onClick={() => ouvrir(d.id, true)}><Copy className="h-4 w-4" /></Button>
                        {devisSupprimable(d)
                          ? <Button size="icon" variant="ghost" title="Supprimer" onClick={() => supprimer(d.id, d.numero)} data-testid="supprimer-devis"><Trash2 className="h-4 w-4 text-red-600" /></Button>
                          : <Button size="icon" variant="ghost" data-testid="archiver-devis"
                              title={d.archive ? "Ressortir des archives" : `Archiver (${d.signe_le ? "devis signé" : d.nbFactures ? "devis facturé" : "contrats signés"} : il ne peut pas être supprimé, mais tu peux le retirer de la liste)`}
                              onClick={() => archiver(d.id, !d.archive)}>{d.archive ? <ArchiveRestore className="h-4 w-4" /> : <Archive className="h-4 w-4" />}</Button>}
                        {!devisSupprimable(d) && (
                          <Button size="icon" variant="ghost" title="Supprimer définitivement (devis de test)" onClick={() => supprimerTest(d)} data-testid="supprimer-devis-test"><Trash2 className="h-4 w-4 text-red-600" /></Button>
                        )}
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
                  <div className="flex flex-wrap gap-2">
                    <Select value={form.marque ?? "heavent"} onValueChange={(v) => set("marque", v as DevisForm["marque"])}>
                      <SelectTrigger className="w-[190px]" aria-label="Logo du devis"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="heavent">Logo Heavent</SelectItem>
                        {!estDemo() && <SelectItem value="nawar">Logo Nawar — bar à parfums</SelectItem>}
                      </SelectContent>
                    </Select>
                    <Select value={form.type} onValueChange={(v) => set("type", v as DevisForm["type"])}>
                      <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="evenement">Événement</SelectItem>
                        <SelectItem value="entreprise">Entreprise</SelectItem>
                        <SelectItem value="mariage">Mariage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                statutDevis={devisList.find((x) => x.id === form.id)?.statut}
                devisId={form.id}
                titre={form.titre}
                lieu={form.lieu}
                dateDebut={form.date_evenement}
                dateFin={form.date_fin_evenement}
                clientEmail={form.client_email}
                clientNom={form.client_societe || form.client_nom}
              />

              {form.type === "mariage" && <EspaceMariesAdmin devisId={form.id} token={form.lien_token} statut={form.statut} />}

              <Card>
                <CardHeader className="space-y-3">
                  <CardTitle className="text-base">Prestations</CardTitle>
                  {form.marque === "nawar" && (() => {
                    const nb = form.lignes.filter((l) => /parfum/i.test(l.designation)).reduce((t, l) => t + (Number(l.quantite) || 0), 0);
                    return nb < 50 ? <p className="text-xs rounded-md border border-amber-300 bg-amber-50 text-amber-900 p-2" data-testid="minimum-nawar">⚠️ {nb} parfum(s) au devis : le minimum facturé est de 50 parfums (conditions Nawar, article 2).</p> : null;
                  })()}
                  {Object.keys(parCategorie).length > 0 ? (
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Ajout rapide depuis ton catalogue :</p>
                      {Object.entries(parCategorie).map(([cat, items]) => ["prestataires", "lieux"].includes(cat) ? (
                        // Prestataires et lieux : potentiellement nombreux, donc une liste déroulante avec recherche du navigateur
                        <div key={cat} className="flex flex-wrap gap-2 items-center">
                          <span className="text-xs uppercase tracking-wide text-muted-foreground w-24">{cat === "lieux" ? "Lieux" : "Prestataires"}</span>
                          <select className="flex-1 min-w-[220px] rounded-md border bg-white px-3 h-9 text-sm" value="" data-testid={`ajout-${cat}`}
                            onChange={(e) => { const p = items.find((x) => x.id === e.target.value); if (p) ajouterDuCatalogue(p); }}>
                            <option value="">{cat === "lieux" ? "+ Ajouter une salle ou un lieu…" : "+ Ajouter un prestataire partenaire…"}</option>
                            {items.map((p) => <option key={p.id} value={p.id}>{p.designation} — {money(p.prix_unitaire, devise)}</option>)}
                          </select>
                        </div>
                      ) : (
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
                    <Select value={form.statut} onValueChange={(v) => {
                      const ligne = devisList.find((x) => x.id === form.id);
                      if ((v === "annule" || v === "refuse") && ligne?.equipe && !["annule", "refuse"].includes(ligne.statut)
                        && !confirm(`En enregistrant ce devis « ${STATUTS[v].label} », l'équipe prévue (${ligne.equipe} personne${ligne.equipe > 1 ? "s" : ""}) sera libérée : plus de mission, de pointage ni de paie pour cet événement. Continuer ?`)) return;
                      set("statut", v);
                    }}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{statutsPermis({ statut: form.statut, signe_le: form.signe_le, nbFactures: devisList.find((x) => x.id === form.id)?.nbFactures }).map((k) => <SelectItem key={k} value={k}>{STATUTS[k].label}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
              <div className="grid gap-2">
                <Button onClick={() => enregistrer()} disabled={saving}><Save className="h-4 w-4 mr-1" /> Enregistrer</Button>
                <Button variant="outline" onClick={telechargerPdf} disabled={saving || pdfEnCours}><Download className="h-4 w-4 mr-1" /> {pdfEnCours ? "Création du PDF…" : "Télécharger le PDF"}</Button>
                <div className="grid grid-cols-2 gap-2" title="Belle image avec le prix final seulement, à envoyer sur Instagram, TikTok, WhatsApp…">
                  <Button variant="outline" onClick={() => imageDepuisEditeur("png")} disabled={saving || imageEnCours} data-testid="image-devis-png"><ImageIcon className="h-4 w-4 mr-1" /> {imageEnCours ? "Création…" : "Image PNG"}</Button>
                  <Button variant="outline" onClick={() => imageDepuisEditeur("jpg")} disabled={saving || imageEnCours} data-testid="image-devis-jpg"><ImageIcon className="h-4 w-4 mr-1" /> Image JPG</Button>
                </div>
                <p className="text-[11px] text-muted-foreground -mt-1">L'image n'affiche que le titre, la date, le lieu et le prix final : pour les clients qui te contactent sur Instagram, TikTok…</p>
                {form.rdv_demande_le && !form.signe_le && (
                  <div className="rounded-md border border-amber-200 bg-amber-50 p-2 text-xs text-amber-900" data-testid="rdv-demande">
                    📅 Le client a demandé un rendez-vous avant de signer ({dateHeureFr(form.rdv_demande_le)}).
                    {form.rdv_message && <div className="mt-1 whitespace-pre-line">{form.rdv_message}</div>}
                  </div>
                )}
                <Button variant="outline" onClick={envoyerAuClient} disabled={saving || envoiEnCours || !!form.signe_le} data-testid="envoyer-client">
                  <Send className="h-4 w-4 mr-1" /> {envoiEnCours ? "Envoi…" : form.date_envoi ? "Renvoyer au client pour signature" : "Envoyer au client pour signature"}
                </Button>
                {form.lien_token && <Button variant="ghost" size="sm" onClick={copierLien}><Link2 className="h-4 w-4 mr-1" /> Copier le lien client</Button>}
                <ReponsesWhatsApp contexte={{ telephone: form.client_telephone, prenom: (form.client_nom || "").trim().split(/\s+/)[0],
                  evenement: form.type === "mariage" ? "votre mariage" : form.titre ? `« ${form.titre} »` : "votre événement",
                  date: dateFr(form.date_evenement), lienDevis: lienClientDevis(form.lien_token) || null }} />
                <Button variant="ghost" size="sm" onClick={() => enregistrer("envoye")} disabled={saving}>Marquer comme envoyé (sans e-mail)</Button>
                <Button variant="ghost" onClick={() => { setForm(null); setOnglet("liste"); }}>Fermer</Button>
              </div>
              <FacturesDevis devis={form} params={params} avantCreation={() => enregistrer()} />
            </div>
          </div>
        )}
      </TabsContent>

      <TabsContent value="factures">
        <ListeFactures params={params} onOuvrirDevis={(id) => ouvrir(id)} />
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
