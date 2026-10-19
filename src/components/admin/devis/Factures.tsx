import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Ban, CheckCircle2, Download, Mail, Receipt, RotateCcw, Search } from "lucide-react";
import { DevisForm, Parametres, dateFr, dateHeureFr, money, today } from "./devisUtils";
import { Facture, MODES_PAIEMENT, STATUTS_FACTURE, TYPES_FACTURE } from "./factureUtils";
import { telechargerFacturePdf } from "./devisPdf";

export const facturesModifiees = () => window.dispatchEvent(new Event("heavent:factures-modifiees"));

async function messageErreur(error: any, data: any) {
  let m = data?.error as string | undefined;
  if (error && !m) { try { m = (await error.context?.json())?.error; } catch { /* */ } }
  return m ?? error?.message ?? "Réessaie dans un instant.";
}

/** Actions communes sur une facture : PDF, envoi au client, paiement, annulation. */
function useActionsFacture(params: Parametres | null, apres: () => void) {
  const { toast } = useToast();
  const [occupe, setOccupe] = useState<string | null>(null);
  const [paiement, setPaiement] = useState<{ f: Facture; mode: string; date: string } | null>(null);

  const pdf = async (f: Facture) => {
    setOccupe(f.id);
    try { toast({ title: "PDF téléchargé", description: await telechargerFacturePdf(f, params) }); }
    catch (e) { console.error(e); toast({ title: "Le PDF n'a pas pu être généré", variant: "destructive" }); }
    finally { setOccupe(null); }
  };
  const envoyer = async (f: Facture) => {
    if (!f.client_email) { toast({ title: "E-mail du client manquant", description: "Ajoute l'e-mail dans le devis : il sera repris sur les prochaines factures.", variant: "destructive" }); return; }
    if (!confirm(`Envoyer la facture ${f.numero} à ${f.client_email} ?`)) return;
    setOccupe(f.id);
    const { data, error } = await supabase.functions.invoke("envoyer-facture", { body: { factureId: f.id } });
    setOccupe(null);
    if (error || data?.error) { toast({ title: "Facture non envoyée", description: await messageErreur(error, data), variant: "destructive" }); return; }
    toast({ title: "Facture envoyée ✉️", description: `${f.client_email} peut la télécharger depuis son espace devis.` });
    apres();
  };
  const changer = async (f: Facture, maj: Partial<Facture>, titre: string) => {
    const { error } = await (supabase as any).from("factures").update(maj).eq("id", f.id);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return false; }
    toast({ title: titre, description: f.numero });
    apres(); facturesModifiees();
    return true;
  };
  const enregistrerPaiement = async () => {
    if (!paiement) return;
    if (await changer(paiement.f, { statut: "payee", mode_paiement: paiement.mode, payee_le: paiement.date }, "Paiement enregistré ✅")) setPaiement(null);
  };
  const annuler = (f: Facture) => {
    if (!confirm(`Annuler la facture ${f.numero} ?\n\nElle restera dans la liste (une facture ne se supprime pas) avec la mention « annulée », et tu pourras en créer une nouvelle.`)) return;
    changer(f, { statut: "annulee" }, "Facture annulée");
  };

  const dialogue = (
    <Dialog open={!!paiement} onOpenChange={(o) => !o && setPaiement(null)}>
      <DialogContent className="max-w-sm">
        <DialogHeader><DialogTitle>Paiement de la facture {paiement?.f.numero}</DialogTitle></DialogHeader>
        {paiement && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Montant : <b className="text-foreground">{money(Number(paiement.f.net_a_payer), paiement.f.devise)}</b></p>
            <div><Label className="text-xs">Reçu le</Label><Input type="date" value={paiement.date} onChange={(e) => setPaiement({ ...paiement, date: e.target.value })} /></div>
            <div><Label className="text-xs">Mode de paiement</Label>
              <Select value={paiement.mode} onValueChange={(v) => setPaiement({ ...paiement, mode: v })}>
                <SelectTrigger data-testid="mode-paiement"><SelectValue /></SelectTrigger>
                <SelectContent>{MODES_PAIEMENT.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
        )}
        <DialogFooter><Button onClick={enregistrerPaiement} data-testid="confirmer-paiement"><CheckCircle2 className="h-4 w-4 mr-1" /> Enregistrer le paiement</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );

  const boutons = (f: Facture) => (
    <div className="flex flex-wrap justify-end gap-1">
      <Button size="icon" variant="ghost" title="Télécharger le PDF" disabled={occupe === f.id} onClick={() => pdf(f)} data-testid="facture-pdf"><Download className="h-4 w-4" /></Button>
      {f.statut !== "annulee" && <Button size="icon" variant="ghost" title={f.envoyee_le ? "Renvoyer au client" : "Envoyer au client"} disabled={occupe === f.id} onClick={() => envoyer(f)} data-testid="facture-envoyer"><Mail className="h-4 w-4" /></Button>}
      {f.statut === "a_payer" && <Button size="sm" variant="outline" className="h-8" onClick={() => setPaiement({ f, mode: "Virement", date: today() })} data-testid="facture-payee"><CheckCircle2 className="h-4 w-4 mr-1" /> Payée</Button>}
      {f.statut === "payee" && <Button size="icon" variant="ghost" title="Remettre « à payer »" onClick={() => changer(f, { statut: "a_payer" }, "Facture remise à payer")}><RotateCcw className="h-4 w-4" /></Button>}
      {f.statut !== "annulee" && <Button size="icon" variant="ghost" title="Annuler la facture" onClick={() => annuler(f)}><Ban className="h-4 w-4 text-red-600" /></Button>}
    </div>
  );
  return { dialogue, boutons };
}

const ligneStatut = (f: Facture) => (
  <>
    <Badge className={STATUTS_FACTURE[f.statut].className}>{STATUTS_FACTURE[f.statut].label}</Badge>
    <div className="text-[11px] text-muted-foreground mt-0.5">
      {f.statut === "payee" ? `${dateFr(f.payee_le)}${f.mode_paiement ? ` · ${f.mode_paiement}` : ""}` : f.envoyee_le ? `Envoyée le ${dateHeureFr(f.envoyee_le)}` : "Pas encore envoyée"}
    </div>
  </>
);

/** Bloc « Factures » dans l'éditeur d'un devis accepté. */
export function FacturesDevis({ devis, params, avantCreation }: { devis: DevisForm; params: Parametres | null; avantCreation: () => Promise<DevisForm | null> }) {
  const { toast } = useToast();
  const [factures, setFactures] = useState<Facture[]>([]);
  const [creation, setCreation] = useState(false);
  const charger = async () => {
    if (!devis.id) return;
    const { data } = await (supabase as any).from("factures").select("*").eq("devis_id", devis.id).order("numero");
    setFactures((data ?? []) as Facture[]);
  };
  useEffect(() => { charger(); }, [devis.id]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    window.addEventListener("heavent:factures-modifiees", charger);
    return () => window.removeEventListener("heavent:factures-modifiees", charger);
  }); // eslint-disable-line react-hooks/exhaustive-deps
  const { dialogue, boutons } = useActionsFacture(params, charger);

  const actives = factures.filter((f) => f.statut !== "annulee");
  const acompte = actives.find((f) => f.type === "acompte");
  const finale = actives.find((f) => f.type !== "acompte");

  const creer = async (type: "acompte" | "solde") => {
    const libelle = type === "acompte" ? "la facture d'acompte" : acompte ? "la facture de solde" : "la facture";
    if (!confirm(`Créer ${libelle} du devis ${devis.numero} ?\n\nUne facture reçoit un numéro définitif (FAC-…) : elle pourra être annulée, mais pas supprimée ni modifiée.`)) return;
    setCreation(true);
    try {
      const saved = await avantCreation();
      if (!saved?.id) return;
      const { data, error } = await (supabase as any).rpc("facture_creer", { p_devis_id: saved.id, p_type: type });
      if (error) { toast({ title: "Facture non créée", description: error.message, variant: "destructive" }); return; }
      toast({ title: `Facture ${data?.numero} créée 🧾`, description: "Tu peux la télécharger ou l'envoyer au client." });
      charger(); facturesModifiees();
    } finally { setCreation(false); }
  };

  if (!devis.id) return null;
  const accepte = devis.statut === "accepte";
  return (
    <Card data-testid="bloc-factures">
      <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Receipt className="h-4 w-4" /> Factures</CardTitle></CardHeader>
      <CardContent className="space-y-3 text-sm">
        {!accepte && factures.length === 0 && <p className="text-muted-foreground text-xs">Les factures se créent quand le devis est accepté (signé en ligne ou statut « Accepté »).</p>}
        {factures.map((f) => (
          <div key={f.id} className={`rounded-md border p-2 space-y-1 ${f.statut === "annulee" ? "opacity-60" : ""}`} data-testid="facture-ligne">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-medium">{TYPES_FACTURE[f.type]} <span className="font-mono text-xs">{f.numero}</span></div>
                <div className="text-xs text-muted-foreground">Émise le {dateFr(f.date_emission)} · <b className="text-foreground">{money(Number(f.net_a_payer), f.devise)}</b></div>
              </div>
              <div className="text-right">{ligneStatut(f)}</div>
            </div>
            {boutons(f)}
          </div>
        ))}
        {accepte && (
          <div className="grid gap-2">
            {Number(devis.acompte_pct) > 0 && !acompte && !finale && (
              <Button variant="outline" onClick={() => creer("acompte")} disabled={creation} data-testid="creer-facture-acompte">
                <Receipt className="h-4 w-4 mr-1" /> Facture d'acompte ({devis.acompte_pct} %)
              </Button>
            )}
            {!finale && (
              <Button variant={acompte ? "default" : "outline"} onClick={() => creer("solde")} disabled={creation} data-testid="creer-facture-solde">
                <Receipt className="h-4 w-4 mr-1" /> {acompte ? "Facturer le solde" : Number(devis.acompte_pct) > 0 ? "Facturer la totalité (sans acompte)" : "Créer la facture"}
              </Button>
            )}
            {finale && <p className="text-xs text-green-700">✅ Devis entièrement facturé.</p>}
            {!finale && <p className="text-[11px] text-muted-foreground">La facture d'acompte est créée automatiquement à la signature en ligne, et celle du solde 2 jours après l'événement (tu as la veille pour ajouter d'éventuelles heures en plus au devis).</p>}
          </div>
        )}
      </CardContent>
      {dialogue}
    </Card>
  );
}

/** Onglet « Factures » : toutes les factures, ce qui reste à encaisser. */
export function ListeFactures({ params, onOuvrirDevis }: { params: Parametres | null; onOuvrirDevis: (devisId: string) => void }) {
  const [factures, setFactures] = useState<Facture[]>([]);
  const [recherche, setRecherche] = useState("");
  const [filtre, setFiltre] = useState("tous");
  const charger = async () => {
    const { data } = await (supabase as any).from("factures").select("*").order("numero", { ascending: false });
    setFactures((data ?? []) as Facture[]);
  };
  useEffect(() => {
    charger();
    window.addEventListener("heavent:factures-modifiees", charger);
    return () => window.removeEventListener("heavent:factures-modifiees", charger);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const { dialogue, boutons } = useActionsFacture(params, charger);

  const devise = params?.devise ?? "MAD";
  const stats = useMemo(() => {
    const annee = String(new Date().getFullYear());
    const actives = factures.filter((f) => f.statut !== "annulee");
    return {
      aEncaisser: actives.filter((f) => f.statut === "a_payer").reduce((s, f) => s + Number(f.net_a_payer), 0),
      nbAEncaisser: actives.filter((f) => f.statut === "a_payer").length,
      encaisseAnnee: actives.filter((f) => f.statut === "payee" && (f.payee_le ?? "").startsWith(annee)).reduce((s, f) => s + Number(f.net_a_payer), 0),
      factureAnnee: actives.filter((f) => f.date_emission.startsWith(annee)).reduce((s, f) => s + Number(f.net_a_payer), 0),
    };
  }, [factures]);
  const filtrees = factures.filter((f) => {
    const q = recherche.trim().toLowerCase();
    const okQ = !q || [f.numero, f.devis_numero, f.client_nom, f.client_societe, f.titre].some((v) => v?.toLowerCase().includes(q));
    return okQ && (filtre === "tous" || f.statut === filtre);
  });

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Card data-testid="factures-a-encaisser"><CardContent className="p-4"><div className="text-xs text-muted-foreground">Reste à encaisser</div><div className="text-2xl font-semibold mt-1">{money(stats.aEncaisser, devise)}</div><div className="text-xs text-muted-foreground">{stats.nbAEncaisser} facture{stats.nbAEncaisser > 1 ? "s" : ""} à payer</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Encaissé cette année</div><div className="text-2xl font-semibold mt-1">{money(stats.encaisseAnnee, devise)}</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Facturé cette année (TTC)</div><div className="text-2xl font-semibold mt-1">{money(stats.factureAnnee, devise)}</div></CardContent></Card>
      </div>
      <Card>
        <CardHeader className="space-y-3">
          <CardTitle className="text-base">Factures ({factures.length})</CardTitle>
          <div className="flex flex-wrap gap-2">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="h-4 w-4 absolute left-2 top-3 text-muted-foreground" />
              <Input className="pl-8" placeholder="Rechercher un client, un numéro…" value={recherche} onChange={(e) => setRecherche(e.target.value)} />
            </div>
            <Select value={filtre} onValueChange={setFiltre}>
              <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="tous">Toutes</SelectItem>
                {Object.entries(STATUTS_FACTURE).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {filtrees.length === 0 ? (
            <p className="text-sm text-muted-foreground py-6 text-center">
              {factures.length ? "Aucune facture ne correspond." : "Aucune facture pour l'instant. Elles se créent depuis un devis accepté (et automatiquement à la signature en ligne)."}
            </p>
          ) : (
            <Table>
              <TableHeader><TableRow>
                <TableHead>N°</TableHead><TableHead>Client</TableHead><TableHead>Type</TableHead>
                <TableHead className="text-right">Montant</TableHead><TableHead>Statut</TableHead><TableHead className="text-right">Actions</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {filtrees.map((f) => (
                  <TableRow key={f.id} className={`cursor-pointer ${f.statut === "annulee" ? "opacity-60" : ""}`} onClick={() => onOuvrirDevis(f.devis_id)} data-testid="facture-ligne">
                    <TableCell className="font-mono text-xs">{f.numero}<div className="text-muted-foreground">{dateFr(f.date_emission)}</div></TableCell>
                    <TableCell>{f.client_societe || f.client_nom}<div className="text-xs text-muted-foreground">{f.titre || f.devis_numero}</div></TableCell>
                    <TableCell className="text-sm">{TYPES_FACTURE[f.type]}<div className="text-xs text-muted-foreground font-mono">{f.devis_numero}</div></TableCell>
                    <TableCell className="text-right font-medium whitespace-nowrap">{money(Number(f.net_a_payer), f.devise)}</TableCell>
                    <TableCell>{ligneStatut(f)}</TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>{boutons(f)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      {dialogue}
    </div>
  );
}
