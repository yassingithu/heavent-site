import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ToastAction } from "@/components/ui/toast";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useTexte } from "@/i18n/textes";
import { aujourdhuiMaroc, jourMarocPlus } from "@/lib/dateMaroc";
import { etatSignature } from "@/lib/signature";
import { lienClientDevis, money } from "@/components/admin/devis/devisUtils";
import { useActionsFacture, facturesModifiees } from "@/components/admin/devis/Factures";
import ReponsesWhatsApp from "@/components/admin/ReponsesWhatsApp";

/**
 * « Aujourd'hui » : un seul écran pour Imane et Yassin, tout ce qui attend une action, classé par urgence.
 * Cinq familles : devis à relancer, paiements, équipes incomplètes, contrats à signer, nouvelles demandes.
 * Les règles réutilisent celles de l'admin : factures « à payer » (acompte / solde, net_a_payer), équipe = personnes
 * distinctes affectées (hors annulées) comparées aux lignes « staff » du devis, états de signature de lib/signature.
 */
type Genre = "relance" | "paiement" | "equipe" | "contrat" | "demande";
const GENRES: Genre[] = ["relance", "paiement", "equipe", "contrat", "demande"];
const MS_JOUR = 864e5;
/** Un devis envoyé sans réponse apparaît après 3 jours (les relances automatiques partent à J+5 et J+10). */
const SEUIL_RELANCE = 3;
const HORIZON_EQUIPE = 30;
const CLE_RAPPELS = "heavent-aj-rappels";
const lireRappels = (): Record<string, string> => { try { return JSON.parse(localStorage.getItem(CLE_RAPPELS) || "{}"); } catch { return {}; } };

interface Demande { id: string; created_at?: string | null; statut?: string | null; nom?: string; prenom?: string; entreprise?: string; telephone?: string | null; type_evenement?: string | null; date_mariage?: string | null; date_evenement?: string | null; lieu?: string | null }
interface Ligne { sort?: boolean; cle: string; genre: Genre; urgent: boolean; score: number; chiffre: string; unite: string; ruban: string; titre: string; detail: string; actions: ReactNode }
interface Donnees { devis: any[]; lignes: any[]; factures: any[]; contrats: any[]; catalogue: any[] }

const joursDepuis = (iso?: string | null) => (iso ? Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / MS_JOUR)) : 0);
const joursJusque = (jour: string) => Math.round((Date.parse(jour.slice(0, 10) + "T12:00:00Z") - Date.parse(aujourdhuiMaroc() + "T12:00:00Z")) / MS_JOUR);
const premierMot = (s?: string | null) => (s ?? "").trim().split(/\s+/)[0] || null;

export default function Aujourdhui({ demandesMariage, demandesEntreprise, bulletins = 0, onAller, onChiffrer, onOuvrirDevis }: {
  demandesMariage: Demande[]; demandesEntreprise: Demande[]; bulletins?: number;
  onAller: (onglet: string) => void; onChiffrer: (kind: "entreprise" | "mariage", id: string) => void; onOuvrirDevis: (id: string) => void;
}) {
  const x = useTexte();
  const { toast } = useToast();
  const [donnees, setDonnees] = useState<Donnees | null>(null);
  const [erreur, setErreur] = useState(false);
  const [rappels, setRappels] = useState<Record<string, string>>(lireRappels);
  const [filtre, setFiltre] = useState<Genre | null>(null);
  const [occupe, setOccupe] = useState<string | null>(null);
  const loc = x.langue === "ar" ? "ar-MA-u-nu-latn" : x.langue === "en" ? "en-GB" : "fr-FR";
  const dateCourte = (iso?: string | null) => (iso ? new Date(iso.slice(0, 10) + "T12:00:00Z").toLocaleDateString(loc, { day: "numeric", month: "short", timeZone: "UTC" }) : "");

  const charger = useCallback(async () => {
    const sb = supabase as any;
    try {
      const [d, f, c, cat] = await Promise.all([
        sb.from("devis").select("id, numero, type, client_nom, client_societe, client_email, client_telephone, titre, statut, total_ttc, devise, acompte_pct, date_envoi, derniere_relance_le, relances, signe_le, date_evenement, date_fin_evenement, date_validite, rdv_demande_le, archive, lien_token, factures(id, type, statut, net_a_payer), affectations(staff_id, statut)").in("statut", ["envoye", "accepte"]),
        sb.from("factures").select("id, numero, devis_id, type, client_nom, client_societe, client_email, client_telephone, net_a_payer, devise, statut, date_emission, envoyee_le, date_evenement, titre").eq("statut", "a_payer"),
        sb.from("contrats").select("id, titre, evenement, statut, date_debut, date_fin, dates, signe_le, devis_id").is("signe_le", null).neq("statut", "annule"),
        sb.from("catalogue_prestations").select("designation, categorie").eq("categorie", "staff"),
      ]);
      if (d.error || f.error || c.error) throw new Error("chargement");
      const devis = ((d.data ?? []) as any[]).filter((v) => !v.archive);
      const demain = aujourdhuiMaroc();
      const proches = devis.filter((v) => v.statut === "accepte" && v.date_evenement && v.date_evenement >= demain).map((v) => v.id);
      const l = proches.length ? await sb.from("devis_lignes").select("devis_id, designation, quantite").in("devis_id", proches) : { data: [] };
      setDonnees({ devis, lignes: l.data ?? [], factures: f.data ?? [], contrats: c.data ?? [], catalogue: cat.data ?? [] });
      setErreur(false);
    } catch { setErreur(true); }
  }, []);
  useEffect(() => {
    charger();
    const r = () => charger();
    window.addEventListener("heavent:factures-modifiees", r); window.addEventListener("heavent:devis-modifie", r);
    return () => { window.removeEventListener("heavent:factures-modifiees", r); window.removeEventListener("heavent:devis-modifie", r); };
  }, [charger]);

  const { dialogue, envoyer: envoyerFacture, demanderPaiement } = useActionsFacture(null, () => { charger(); });
  const quand = (iso: string) => { const n = joursDepuis(iso); return n === 0 ? x("aujourd'hui") : n === 1 ? x("hier") : x("il y a {n} jours", { n }); };
  const noterRappel = (cle: string) => { const n = { ...rappels, [cle]: new Date().toISOString() }; setRappels(n); try { localStorage.setItem(CLE_RAPPELS, JSON.stringify(n)); } catch { /* */ } };

  const soumettre = async (cle: string, travail: () => Promise<void>) => { setOccupe(cle); try { await travail(); } finally { setOccupe(null); } };
  const nom = (v: any) => v.client_societe || v.client_nom;

  const relancerParEmail = (v: any) => soumettre("m" + v.id, async () => {
    if (!v.client_email) { toast({ title: x("E-mail du client manquant"), description: x("Ajoute-le dans le devis."), variant: "destructive" }); return; }
    if (!confirm(x("Renvoyer le devis {numero} à {email} ?\n\nLes relances automatiques repartent de zéro (J+5, J+10).", { numero: v.numero ?? "", email: v.client_email }))) return;
    const { data, error } = await supabase.functions.invoke("envoyer-devis", { body: { devisId: v.id } });
    if (error || (data as any)?.error) { toast({ title: x("Devis non renvoyé"), description: x("Réessaie dans un instant."), variant: "destructive" }); return; }
    toast({ title: x("Devis renvoyé"), description: v.client_email }); charger();
  });
  const noterRelance = async (v: any) => {
    const avant = v.derniere_relance_le ?? null;
    const { error } = await (supabase as any).from("devis").update({ derniere_relance_le: new Date().toISOString() }).eq("id", v.id);
    if (error) { toast({ title: x("Relance non notée"), description: x("Le message est parti, mais le devis restera dans la liste."), variant: "destructive" }); return; }
    charger();
    toast({ title: x("Relance notée. Le devis reviendra dans 3 jours."), action: (
      <ToastAction altText={x("Annuler")} onClick={async () => { await (supabase as any).from("devis").update({ derniere_relance_le: avant }).eq("id", v.id); charger(); }}>{x("Annuler")}</ToastAction>) });
  };
  const prolonger = (v: any) => soumettre("p" + v.id, async () => {
    const jour = jourMarocPlus(30);
    const { error } = await (supabase as any).from("devis").update({ date_validite: jour }).eq("id", v.id);
    if (error) { toast({ title: x("Validité non prolongée"), description: error.message, variant: "destructive" }); return; }
    toast({ title: x("Validité prolongée jusqu'au {date}", { date: dateCourte(jour) }), description: x("Tu peux maintenant relancer le client.") }); charger();
  });
  const creerFacture = (v: any, type: "acompte" | "solde") => soumettre("c" + v.id, async () => {
    const acomptes = (v.factures ?? []).filter((f: any) => f.type === "acompte" && f.statut !== "annulee").reduce((t: number, f: any) => t + Number(f.net_a_payer || 0), 0);
    const montant = money(type === "acompte" ? Math.round(Number(v.total_ttc) * Number(v.acompte_pct) ) / 100 : Number(v.total_ttc) - acomptes, v.devise);
    if (!confirm(x("Créer la facture {type} de {client} ({montant}) ?\n\nElle ne sera envoyée au client que si tu le décides.", { type: type === "acompte" ? x("d'acompte") : x("de solde"), client: nom(v), montant }))) return;
    const { data, error } = await (supabase as any).rpc("facture_creer", { p_devis_id: v.id, p_type: type });
    if (error) { toast({ title: x("Facture non créée"), description: error.message, variant: "destructive" }); return; }
    toast({ title: x("Facture {numero} créée. Il reste à l'envoyer.", { numero: data?.numero ?? "" }), action: data?.id ? (
      <ToastAction altText={x("Envoyer maintenant")} onClick={() => envoyerFacture(data)}>{x("Envoyer maintenant")}</ToastAction>) : undefined });
    charger(); facturesModifiees();
  });

  const btn = (cle: string, libelle: string, onClick: () => void, plein = false, test = "action") => (
    <button key={cle} type="button" onClick={onClick} disabled={occupe === cle} data-testid={`aj-${test}`}
      className={`s-btn ${plein ? "s-btn-plein s-sombre" : "s-btn-filet"} aj-btn`}>{libelle}</button>
  );
  const lienOuvrir = (id: string) => btn("ouvrir-" + id, x("Ouvrir le devis"), () => onOuvrirDevis(id), false, "ouvrir-devis");
  const wa = (cle: string, contexte: Parameters<typeof ReponsesWhatsApp>[0]["contexte"], modele: "relance" | "paiement" | "recu", libelle: string, plein: boolean, onEnvoye?: () => void) => (
    <span key={cle} className="contents" data-testid={`aj-wa-${cle}`}>
      <ReponsesWhatsApp contexte={contexte} modeleDirect={modele} libelle={libelle} onEnvoye={onEnvoye}
        classe={`s-btn ${plein ? "s-btn-plein s-sombre" : "s-btn-filet"} aj-btn`} />
    </span>
  );

  const lignes = useMemo<Ligne[]>(() => {
    if (!donnees) return [];
    const L: Ligne[] = [];
    const stampAttente = (n: number) => ({ chiffre: String(n), unite: n === 0 ? x("aujourd'hui") : n === 1 ? x("jour d'attente") : x("jours d'attente") });
    const stampRestant = (n: number) => ({ chiffre: String(Math.max(0, n)), unite: n <= 0 ? x("aujourd'hui") : n === 1 ? x("jour restant") : x("jours restants") });
    const aujourdhui = aujourdhuiMaroc();

    // 1. Devis envoyés sans réponse
    for (const v of donnees.devis) {
      if (v.statut !== "envoye" || v.signe_le || v.rdv_demande_le) continue;
      const age = joursDepuis(v.derniere_relance_le ?? v.date_envoi);
      if (!v.date_envoi || age < SEUIL_RELANCE) continue;
      const bientot = !!v.date_evenement && joursJusque(v.date_evenement) < 21;
      const expire = !!v.date_validite && v.date_validite < aujourdhui;
      const urg = age > 7 || bientot;
      const morceaux = [x("Devis {numero} envoyé le {date}", { numero: v.numero ?? "", date: dateCourte(v.date_envoi) })];
      if (v.relances) morceaux.push(x("relancé le {date}", { date: dateCourte(v.derniere_relance_le) }));
      morceaux.push(money(Number(v.total_ttc || 0), v.devise));
      if (expire) morceaux.push(x("validité dépassée"));
      else if (v.date_evenement) morceaux.push(x("événement le {date}", { date: dateCourte(v.date_evenement) }));
      const ctx = { telephone: v.client_telephone, prenom: premierMot(v.client_nom), evenement: v.type === "mariage" ? "votre mariage" : "votre événement", dateIso: v.date_evenement, lienDevis: lienClientDevis(v.lien_token) || null };
      L.push({ cle: "r" + v.id, genre: "relance", urgent: urg, score: age + (bientot ? 5 : 0), ...stampAttente(age),
        ruban: x("Devis à relancer"), titre: nom(v), detail: morceaux.join(" · "),
        actions: expire
          ? <>{btn("p" + v.id, x("Prolonger la validité"), () => prolonger(v), urg, "prolonger")}{lienOuvrir(v.id)}</>
          : <>
          {v.client_telephone
            ? <>{wa("relance-" + v.id, ctx, "relance", x("Relancer sur WhatsApp"), urg, () => noterRelance(v))}
                {v.client_email && btn("m" + v.id, x("Renvoyer par e-mail"), () => relancerParEmail(v), false, "relancer-email")}</>
            : v.client_email ? btn("m" + v.id, x("Relancer par e-mail"), () => relancerParEmail(v), urg, "relancer-email") : null}
          {lienOuvrir(v.id)}
        </> });
    }

    // 2a. Factures à payer (acompte, solde ou facture unique)
    for (const f of donnees.factures) {
      const envoyee = !!f.envoyee_le;
      const age = joursDepuis(f.envoyee_le ?? f.date_emission);
      const urg = envoyee ? age >= 10 : age >= 2;
      const type = f.type === "acompte" ? x("Acompte à encaisser") : f.type === "solde" ? x("Solde à encaisser") : x("Facture à encaisser");
      const montant = money(Number(f.net_a_payer || 0), f.devise);
      const rap = rappels["p" + f.id];
      const ctx = { telephone: f.client_telephone, prenom: premierMot(f.client_nom), evenement: "votre événement", dateIso: f.date_evenement, facture: f.numero, montant };
      L.push({ cle: "f" + f.id, genre: "paiement", urgent: urg, score: age + 2, ...stampAttente(age),
        ruban: type, titre: nom(f), detail: [`${f.numero} · ${montant}`, envoyee ? x("envoyée le {date}", { date: dateCourte(f.envoyee_le) }) : x("pas encore envoyée au client"), rap ? x("rappel envoyé {quand}", { quand: quand(rap) }) : null].filter(Boolean).join(" · "),
        actions: <>
          {envoyee ? btn("e" + f.id, x("Encaisser"), () => demanderPaiement(f), urg, "encaisser") : btn("s" + f.id, x("Envoyer au client"), () => envoyerFacture(f), urg, "envoyer-facture")}
          {envoyee ? wa("paiement-" + f.id, ctx, "paiement", rap ? x("Renvoyer le rappel") : x("Rappel sur WhatsApp"), false, () => noterRappel("p" + f.id)) : btn("e" + f.id, x("Encaisser"), () => demanderPaiement(f), false, "encaisser")}
        </> });
    }
    // 2b. Devis accepté dont la facture d'acompte ou de solde n'existe pas encore (mêmes règles que l'automatisation)
    const ilYa2j = new Date(Date.now() - 2 * MS_JOUR).toISOString().slice(0, 10);
    for (const v of donnees.devis) {
      if (v.statut !== "accepte" || !(Number(v.total_ttc) > 0)) continue;
      const actives = (v.factures ?? []).filter((f: any) => f.statut !== "annulee");
      const finale = actives.some((f: any) => f.type !== "acompte");
      const fin = v.date_fin_evenement ?? v.date_evenement;
      if (finale) continue;
      if (fin && fin <= ilYa2j && joursJusque(fin) >= -60) {
        const n = -joursJusque(fin);
        L.push({ cle: "fs" + v.id, genre: "paiement", urgent: true, score: n + 6, chiffre: String(n), unite: n === 1 ? x("jour passé") : x("jours passés"),
          ruban: x("Solde à facturer"), titre: nom(v), detail: x("Devis {numero} · événement terminé le {date}", { numero: v.numero ?? "", date: dateCourte(fin) }),
          actions: <>{btn("c" + v.id, x("Créer la facture de solde"), () => creerFacture(v, "solde"), true, "creer-facture")}{lienOuvrir(v.id)}</> });
      } else if (Number(v.acompte_pct) > 0 && actives.length === 0 && v.date_evenement && v.date_evenement >= aujourdhui) {
        const d = joursJusque(v.date_evenement);
        const urg = d <= 14;
        L.push({ cle: "fa" + v.id, genre: "paiement", urgent: urg, score: Math.max(0, 30 - d), ...stampRestant(d),
          ruban: x("Acompte à facturer"), titre: nom(v), detail: x("Devis {numero} · acompte {pct} % · événement le {date}", { numero: v.numero ?? "", pct: Number(v.acompte_pct), date: dateCourte(v.date_evenement) }),
          actions: <>{btn("c" + v.id, x("Créer la facture d'acompte"), () => creerFacture(v, "acompte"), urg, "creer-facture")}{lienOuvrir(v.id)}</> });
      }
    }

    // 3. Événements à venir dont l'équipe est incomplète
    const designationsStaff = new Set(donnees.catalogue.map((c: any) => String(c.designation).trim().toLowerCase()));
    for (const v of donnees.devis) {
      if (v.statut !== "accepte" || !v.date_evenement || v.date_evenement < aujourdhui) continue;
      const d = joursJusque(v.date_evenement);
      if (d > HORIZON_EQUIPE) continue;
      const prevus = donnees.lignes.filter((l: any) => l.devis_id === v.id && designationsStaff.has(String(l.designation).trim().toLowerCase()))
        .reduce((t: number, l: any) => t + (Number(l.quantite) || 0), 0);
      const affectes = new Set((v.affectations ?? []).filter((a: any) => a.statut !== "annule").map((a: any) => a.staff_id)).size;
      if (prevus <= 0 || affectes >= prevus) continue;
      const urg = d <= 7;
      L.push({ cle: "e" + v.id, genre: "equipe", urgent: urg, score: 30 - d + (affectes === 0 ? 3 : 0), ...stampRestant(d),
        ruban: x("Équipe incomplète"), titre: v.titre || nom(v),
        detail: [affectes === 0 ? x("Personne d'affecté sur {prevus} prévues", { prevus }) : x("{affectes} sur {prevus} personnes affectées", { affectes, prevus }), nom(v), dateCourte(v.date_evenement)].join(" · "),
        actions: <>{btn("eq" + v.id, x("Ouvrir le devis"), () => onOuvrirDevis(v.id), urg, "composer-equipe")}</> });
    }

    // 4. Contrats à signer, regroupés par événement
    const groupes = new Map<string, any[]>();
    for (const c of donnees.contrats) {
      const e = etatSignature(c);
      if (e !== "a_signer" && e !== "en_retard") continue;
      const k = c.devis_id ?? c.evenement ?? c.titre; groupes.set(k, [...(groupes.get(k) ?? []), { ...c, _etat: e }]);
    }
    for (const [k, cs] of groupes) {
      const retard = cs.filter((c) => c._etat === "en_retard").length;
      const debut = cs.map((c) => c.date_debut as string).sort()[0];
      const d = joursJusque(debut);
      const detail = [cs.length === 1 ? x("1 contrat non signé") : x("{n} contrats non signés", { n: cs.length })];
      if (retard) detail.push(retard === 1 ? x("1 en retard") : x("{n} en retard", { n: retard }));
      detail.push(x("mission le {date}", { date: dateCourte(debut) }));
      L.push({ cle: "k" + k, genre: "contrat", urgent: retard > 0, score: retard ? 25 : 8, ...(d < 0 ? { chiffre: String(-d), unite: -d === 1 ? x("jour passé") : x("jours passés") } : stampRestant(d)),
        ruban: x("Contrats à signer"), titre: cs[0].evenement || cs[0].titre, detail: detail.join(" · "),
        actions: <>{btn("ct" + k, x("Voir les contrats"), () => onAller("contrats"), retard > 0, "voir-signatures")}</> });
    }

    // 5. Nouvelles demandes de devis
    const demandes: [Demande, "entreprise" | "mariage"][] = [...demandesEntreprise.map((d) => [d, "entreprise"] as [Demande, "entreprise"]), ...demandesMariage.map((d) => [d, "mariage"] as [Demande, "mariage"])];
    for (const [dm, kind] of demandes) {
      if (dm.statut && dm.statut !== "en_attente") continue;
      const age = joursDepuis(dm.created_at);
      const urg = age >= 5;
      const jour = kind === "entreprise" ? dm.date_evenement : dm.date_mariage;
      const qui = kind === "entreprise" ? dm.entreprise || `${dm.prenom ?? ""} ${dm.nom ?? ""}`.trim() : `${dm.prenom ?? ""} ${dm.nom ?? ""}`.trim();
      const quoi = kind === "entreprise" ? x("Entreprise") : dm.type_evenement || x("Événement");
      const rap = rappels["q" + dm.id];
      L.push({ cle: "d" + dm.id, genre: "demande", urgent: urg, score: age + 3, ...stampAttente(age),
        ruban: x("Nouvelle demande"), titre: qui, detail: [quoi, jour ? dateCourte(jour) : null, dm.lieu, rap ? x("accusé envoyé {quand}", { quand: quand(rap) }) : null].filter(Boolean).join(" · "),
        actions: <>
          {btn("q" + dm.id, x("Faire le devis"), () => onChiffrer(kind, dm.id), urg, "faire-devis")}
          {wa("recu-" + dm.id, { telephone: dm.telephone, prenom: kind === "entreprise" ? dm.prenom : dm.prenom || dm.nom, evenement: kind === "entreprise" ? "votre événement" : dm.type_evenement ? `votre ${dm.type_evenement.toLowerCase()}` : "votre événement", dateIso: jour }, "recu", rap ? x("Renvoyer l'accusé") : x("Accuser réception"), false, () => noterRappel("q" + dm.id))}
        </> });
    }
    return L.sort((a, b) => Number(b.urgent) - Number(a.urgent) || b.score - a.score);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donnees, demandesMariage, demandesEntreprise, x.langue, occupe, rappels]);

  // Une ligne traitée ne disparaît pas d'un coup : elle se retire en douceur (0,26 s)
  const precedentes = useRef<Ligne[]>([]);
  const [sortantes, setSortantes] = useState<{ ligne: Ligne; rang: number }[]>([]);
  useEffect(() => {
    const cles = new Set(lignes.map((l) => l.cle));
    const parties = precedentes.current.map((l, rang) => ({ ligne: l, rang })).filter((p) => !cles.has(p.ligne.cle));
    precedentes.current = lignes;
    if (!parties.length) return;
    setSortantes((s) => [...s, ...parties]);
    window.setTimeout(() => setSortantes((s) => s.filter((p) => !parties.includes(p))), 300);
  }, [lignes]);
  const affichees = useMemo(() => {
    const a = [...lignes];
    for (const p of sortantes) a.splice(Math.min(p.rang, a.length), 0, { ...p.ligne, sort: true });
    return a;
  }, [lignes, sortantes]);

  const charge = donnees !== null;
  const echec = erreur && !charge;
  const nb = (g: Genre) => lignes.filter((l) => l.genre === g).length;
  const visibles = filtre ? affichees.filter((l) => l.genre === filtre) : affichees;
  const urgentes = visibles.filter((l) => l.urgent), suite = visibles.filter((l) => !l.urgent);
  const NOMS: Record<Genre, string> = { relance: x("Relances"), paiement: x("Paiements"), equipe: x("Équipes"), contrat: x("Contrats"), demande: x("Demandes") };
  const nbUrgentes = lignes.filter((l) => l.urgent).length;

  const titre = echec ? x("Impossible de charger tes tâches") : !charge ? null : lignes.length === 0 ? x("Rien d’urgent aujourd’hui") : lignes.length === 1 ? x("1 chose à faire") : x("{n} choses à faire", { n: lignes.length });
  const sousTitre = charge && lignes.length > 0
    ? (nbUrgentes ? (nbUrgentes === 1 ? x("dont 1 urgente") : x("dont {n} urgentes", { n: nbUrgentes })) : x("rien de pressé, mais à ne pas oublier"))
    : null;

  let rang = 0;
  const rendu = (liste: Ligne[], tier: "urgent" | "suite") => (
    <ul>
      {liste.map((l, i) => {
        const r = rang++;
        return (
          <li key={l.cle} className={`aj-ligne a-entre ${l.urgent ? "urgent" : ""} ${l.sort ? "sort" : ""}`} style={{ ["--r" as string]: `${Math.min(r, 6) * 0.03}s` }} data-testid="aj-ligne" data-genre={l.genre} data-urgent={l.urgent ? "oui" : "non"}>
            <div className="aj-stamp" aria-hidden><b>{l.chiffre}</b><small>{l.unite}</small></div>
            <div className="aj-corps min-w-0">
              <span className={`a-ruban ${tier === "urgent" && i < 3 ? "terre" : ""}`}><img src="/seuil/mono-or.png" alt="" />{l.ruban}</span>
              <h3 className="font-serif break-words">{l.titre}</h3>
              <p>{l.detail}</p>
            </div>
            <div className="aj-actions">{l.actions}</div>
          </li>
        );
      })}
    </ul>
  );

  return (
    <section className="a-carte aj" data-testid="aujourdhui" aria-labelledby="t-aujourdhui" aria-busy={!charge && !echec}>
      <p className="a-surtitre">{x("Aujourd'hui")}</p>
      <h2 id="t-aujourdhui" className={`aj-titre font-serif ${charge && lignes.length === 0 && !erreur ? "vide" : ""}`} data-testid="aj-titre">
        {titre ?? <i className="aj-filet" role="status" aria-label={x("Chargement")} />}{sousTitre && <span className="aj-sous">{sousTitre}</span>}
      </h2>

      {bulletins > 0 && (
        <button type="button" onClick={() => onAller("fiches")} className="a-ligne aj-pied aj-haut" data-testid="aj-bulletins">
          <span>{bulletins > 1 ? x("{n} bulletins de paie à valider", { n: bulletins }) : x("1 bulletin de paie à valider")}</span>
          <svg className="a-fl shrink-0" width="18" height="12" viewBox="0 0 18 12" aria-hidden><path d="M0 6h16M11 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>
        </button>
      )}

      {!(charge && lignes.length === 0 && !erreur) && (
        <div className="aj-compteurs" role="group" aria-label={x("Filtrer par famille")}>
          {GENRES.map((g) => (
            <button key={g} type="button" disabled={!charge || nb(g) === 0 && filtre !== g} aria-pressed={filtre === g} onClick={() => setFiltre(filtre === g ? null : g)} data-testid={`aj-compteur-${g}`} data-nb={charge ? nb(g) : ""} data-zero={charge && nb(g) === 0 ? "oui" : "non"}>
              <b key={charge ? nb(g) : "-"}>{charge ? nb(g) : "–"}</b><span>{NOMS[g]}</span>
            </button>
          ))}
        </div>
      )}
      {filtre && <button type="button" className="aj-toutvoir" onClick={() => setFiltre(null)} data-testid="aj-tout-voir">{x("Tout voir")}</button>}

      {erreur && (
        <div className="aj-alerte" role="alert" data-testid="aj-erreur">
          <p>{echec ? x("La connexion n'a pas abouti. Tes tâches sont toujours là : réessaie dans un instant.") : x("Certaines données n'ont pas pu être chargées.")}</p>
          <button type="button" onClick={charger} className={echec ? "s-btn s-btn-plein s-sombre aj-btn aj-reessayer" : "aj-lien"} data-testid="aj-reessayer">{x("Réessayer")}</button>
        </div>
      )}

      {charge && lignes.length === 0 && !erreur && (
        <div className="aj-vide" data-testid="aj-vide">
          <p>{x("Devis, paiements, équipes, contrats et demandes sont à jour.")}</p>
        </div>
      )}

      {urgentes.length > 0 && (<div data-testid="aj-urgent"><h3 className="a-surtitre aj-tier terre">{x("Urgent")}</h3>{rendu(urgentes, "urgent")}</div>)}
      {suite.length > 0 && (<div data-testid="aj-suite"><h3 className="a-surtitre aj-tier">{x("À suivre")}</h3>{rendu(suite, "suite")}</div>)}
      {dialogue}
    </section>
  );
}
