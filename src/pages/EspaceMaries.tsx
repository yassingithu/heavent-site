import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Seo from "@/components/Seo";
import { enregistrerFichier } from "@/lib/pdf";
import SouvenirsMaries from "@/components/mariage/SouvenirsMaries";
import PersonnaliserInvitation from "@/components/invitation/PersonnaliserInvitation";
import type { InvitationReglages } from "@/lib/invitation";
import { lienWa } from "@/lib/whatsapp";
import {
  COTES, ECHEANCES, Echeance, Invite, Moment, PosteBudget, TableMariage, Tache,
  budgetDefaut, checklistDefaut, dateEcheance, estActive, nomsPersonnes, lienReponse, lienRsvp, lireListeInvites, messageWhatsappInvite, programmeDefaut, uid,
} from "@/lib/mariage";
import {
  ArrowLeft, Check, CheckCircle2, Copy, Download, Heart, ListChecks, Loader2, MessageCircle,
  Plus, Printer, Trash2, Users, Wallet, Armchair, Clock, Mail, Camera,
} from "lucide-react";

interface Espace {
  noms: string | null; checklist: Tache[]; budget: PosteBudget[]; programme: Moment[]; tables: TableMariage[];
  invitation?: InvitationReglages | null; budget_total: number | null; message_invites: string | null; date_limite_reponse: string | null; updated_at?: string; liste_mode?: "ouverte" | "fermee" | null;
}
interface InfosDevis { client_nom: string; date_evenement: string | null; lieu: string | null; nb_personnes: number | null; devise: string | null }

type Onglet = "checklist" | "budget" | "programme" | "invites" | "invitation" | "tables" | "souvenirs";
const ONGLETS: { cle: Onglet; libelle: string; icone: typeof Heart }[] = [
  { cle: "checklist", libelle: "Check-list", icone: ListChecks },
  { cle: "budget", libelle: "Budget", icone: Wallet },
  { cle: "programme", libelle: "Programme du jour J", icone: Clock },
  { cle: "invites", libelle: "Invités", icone: Users },
  { cle: "invitation", libelle: "Mon invitation", icone: Mail },
  { cle: "tables", libelle: "Plan de table", icone: Armchair },
  { cle: "souvenirs", libelle: "Souvenirs", icone: Camera },
];

const nf = (n: number) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n);
const num = (v: string) => (v.trim() === "" ? null : Math.max(0, Number(v.replace(/\s/g, "").replace(",", ".")) || 0));
const aujourdhui = () => new Date(new Date().toISOString().slice(0, 10) + "T00:00:00Z");
const dateLongue = (d: string | Date) => (typeof d === "string" ? new Date(d + "T00:00:00Z") : d).toLocaleDateString("fr-FR", { timeZone: "UTC", weekday: "long", day: "numeric", month: "long", year: "numeric" });
const dateCourte = (d: Date) => d.toLocaleDateString("fr-FR", { timeZone: "UTC", day: "numeric", month: "short", year: "numeric" });
/** Tri d'une soirée : 00:00–11:59 vient après 23:59 */
const cleHeure = (h: string) => { const [a, b] = (h || "99:99").split(":").map(Number); return (a < 12 ? a + 24 : a) * 60 + (b || 0); };
const personnes = (i: Invite) => (i.reponse === "oui" ? i.nb_confirmes ?? i.nb_prevus : i.reponse === "non" ? 0 : i.nb_prevus);

const champ = "w-full rounded-xl border border-[#E3D6BA] bg-white px-3 min-h-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8B560]/50";
const bouton = "inline-flex items-center justify-center gap-1.5 rounded-full px-4 min-h-10 text-sm font-medium transition disabled:opacity-60";
const boutonOr = `${bouton} bg-[#141414] text-white hover:bg-[#2a2a2a]`;
const boutonClair = `${bouton} border border-[#DCCBA6] bg-white hover:bg-[#FAF7EE]`;
const carte = "rounded-lg bg-white border border-[#EADFC8] shadow-[0_1px_0_#fff_inset,0_18px_40px_-34px_rgba(140,109,34,0.55)]";

export default function EspaceMaries() {
  const { token = "" } = useParams();
  const [etat, setEtat] = useState<"chargement" | "introuvable" | "pret">("chargement");
  const [devis, setDevis] = useState<InfosDevis | null>(null);
  const [espace, setEspace] = useState<Espace | null>(null);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [onglet, setOnglet] = useState<Onglet>("checklist");
  const [sauvegarde, setSauvegarde] = useState<"" | "encours" | "ok" | "erreur">("");
  const enAttente = useRef<Partial<Espace>>({});
  const minuteur = useRef<number>();

  useEffect(() => {
    (async () => {
      if (!/^[0-9a-f-]{36}$/i.test(token)) { setEtat("introuvable"); return; }
      const { data, error } = await (supabase as any).rpc("espace_maries_public", { p_token: token });
      if (error || !data?.espace) { setEtat("introuvable"); return; }
      const e = data.espace as Espace;
      // Premier passage : modèles de départ
      const init: Partial<Espace> = {};
      if (!e.checklist?.length) init.checklist = checklistDefaut();
      if (!e.budget?.length) init.budget = budgetDefaut();
      if (!e.programme?.length) init.programme = programmeDefaut();
      setEspace({ ...e, ...init });
      setDevis(data.devis);
      setInvites(data.invites ?? []);
      setEtat("pret");
      if (Object.keys(init).length) planifier(init);
    })();
    const avantDepart = (ev: BeforeUnloadEvent) => { if (Object.keys(enAttente.current).length) { envoyer(); ev.preventDefault(); } };
    window.addEventListener("beforeunload", avantDepart);
    return () => window.removeEventListener("beforeunload", avantDepart);
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const envoyer = async () => {
    const donnees = enAttente.current;
    if (!Object.keys(donnees).length) return;
    enAttente.current = {};
    setSauvegarde("encours");
    const { error } = await (supabase as any).rpc("espace_maries_enregistrer", { p_token: token, p_donnees: donnees });
    if (error) { enAttente.current = { ...donnees, ...enAttente.current }; setSauvegarde("erreur"); }
    else setSauvegarde(Object.keys(enAttente.current).length ? "encours" : "ok");
  };
  const planifier = (modif: Partial<Espace>) => {
    enAttente.current = { ...enAttente.current, ...modif };
    setSauvegarde("encours");
    window.clearTimeout(minuteur.current);
    minuteur.current = window.setTimeout(envoyer, 700);
  };
  const maj = (modif: Partial<Espace>) => { setEspace((e) => (e ? { ...e, ...modif } : e)); planifier(modif); };

  const enregistrerInvite = async (inv: Partial<Invite> & { nom: string }) => {
    setSauvegarde("encours");
    const { data, error } = await (supabase as any).rpc("invite_enregistrer", { p_token: token, p_invite: inv });
    if (error || !data) { setSauvegarde("erreur"); return null; }
    setInvites((l) => (l.some((x) => x.id === data.id) ? l.map((x) => (x.id === data.id ? data : x)) : [...l, data]));
    setSauvegarde("ok");
    return data as Invite;
  };
  const supprimerInvite = async (id: string) => {
    setInvites((l) => l.filter((x) => x.id !== id));
    const { error } = await (supabase as any).rpc("invite_supprimer", { p_token: token, p_id: id });
    setSauvegarde(error ? "erreur" : "ok");
  };

  if (etat === "chargement") return <Cadre><div className="flex justify-center py-24 text-[#8C6D22]"><Loader2 className="h-6 w-6 animate-spin" /></div></Cadre>;
  if (etat === "introuvable" || !espace || !devis) {
    return (
      <Cadre>
        <div className="max-w-lg mx-auto text-center py-16 space-y-4">
          <h1 className="font-serif text-3xl">Espace mariés indisponible</h1>
          <p className="text-[#5E554A]">L'espace mariés s'ouvre dès que votre devis de mariage est signé. Revenez sur la page de votre devis ou contactez-nous.</p>
          <Link to={`/mon-devis/${token}`} className={boutonClair}><ArrowLeft className="h-4 w-4" /> Retour au devis</Link>
        </div>
      </Cadre>
    );
  }

  const noms = espace.noms?.trim() || devis.client_nom;
  const joursRestants = devis.date_evenement ? Math.round((new Date(devis.date_evenement + "T00:00:00Z").getTime() - aujourdhui().getTime()) / 86400000) : null;
  const faits = espace.checklist.filter((t) => t.fait).length;
  const depense = espace.budget.reduce((s, b) => s + (b.reel ?? b.prevu ?? 0), 0);
  const actives = invites.filter(estActive);
  const confirmes = actives.filter((i) => i.reponse === "oui").reduce((s, i) => s + (i.nb_confirmes ?? i.nb_prevus), 0);
  const attendus = actives.reduce((s, i) => s + personnes(i), 0);
  const absents = actives.filter((i) => i.reponse === "non").length;
  const aValider = invites.filter((i) => i.liste_statut === "a_valider").length;

  return (
    <Cadre>
      <div className="max-w-5xl mx-auto space-y-6" data-testid="espace-maries">
        <div className="flex items-center justify-between gap-3 print:hidden">
          <Link to={`/mon-devis/${token}`} className="inline-flex items-center gap-1.5 text-sm text-[#8C6D22] hover:underline"><ArrowLeft className="h-4 w-4" /> Mon devis</Link>
          <span className="text-xs text-[#8C6D22] min-h-5" data-testid="etat-sauvegarde">
            {sauvegarde === "encours" ? "Enregistrement…" : sauvegarde === "ok" ? "✓ Enregistré" : sauvegarde === "erreur" ? "⚠️ Non enregistré, vérifiez votre connexion" : ""}
          </span>
        </div>

        {/* En-tête */}
        <header className="relative overflow-hidden rounded-[2rem] bg-[#141414] text-white px-6 sm:px-10 py-10 text-center">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,#C8B560_0,transparent_45%),radial-gradient(circle_at_80%_80%,#A8933F_0,transparent_40%)]" />
          <div className="relative space-y-3">
            <p className="uppercase tracking-[0.3em] text-[11px] text-[#E4D49A]">Espace mariés</p>
            <input
              value={espace.noms ?? ""} onChange={(e) => maj({ noms: e.target.value })} placeholder={devis.client_nom} aria-label="Vos prénoms"
              className="w-full bg-transparent text-center font-serif text-3xl sm:text-5xl placeholder:text-white/60 focus:outline-none focus:ring-0"
              data-testid="noms-maries"
            />
            <p className="text-white/80 text-sm sm:text-base">
              {devis.date_evenement ? dateLongue(devis.date_evenement) : "Date à confirmer"}{devis.lieu ? ` · ${devis.lieu}` : ""}
            </p>
            {joursRestants !== null && joursRestants >= 0 && (
              <div className="inline-flex items-baseline gap-2 rounded-full bg-white/10 px-5 py-2" data-testid="compte-a-rebours">
                <span className="font-serif text-3xl text-[#E4D49A]">{joursRestants === 0 ? "C'est aujourd'hui !" : nf(joursRestants)}</span>
                {joursRestants > 0 && <span className="text-sm text-white/80">jour{joursRestants > 1 ? "s" : ""} avant le grand jour</span>}
              </div>
            )}
          </div>
        </header>

        {/* Résumé */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Resume icone={ListChecks} titre="Check-list" valeur={`${faits} / ${espace.checklist.length}`} progression={espace.checklist.length ? faits / espace.checklist.length : 0} />
          <Resume icone={Wallet} titre="Budget engagé" valeur={`${nf(depense)} ${devis.devise ?? "MAD"}`} progression={espace.budget_total ? depense / espace.budget_total : null}
            sous={espace.budget_total ? `sur ${nf(espace.budget_total)} prévus` : undefined} />
          <Resume icone={Users} titre="Invités confirmés" valeur={`${confirmes} / ${attendus}`} progression={attendus ? confirmes / attendus : 0}
            sous={actives.length ? `personnes attendues${absents ? ` · ${absents} invitation${absents > 1 ? "s" : ""} déclinée${absents > 1 ? "s" : ""}` : ""}` : undefined} />
        </div>

        {/* Onglets */}
        <nav className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 print:hidden" role="tablist">
          {ONGLETS.map(({ cle, libelle, icone: Icone }) => (
            <button key={cle} role="tab" aria-selected={onglet === cle} onClick={() => setOnglet(cle)} data-testid={`onglet-${cle}`}
              className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 min-h-10 text-sm font-medium border transition ${onglet === cle ? "bg-[#141414] text-white border-[#141414]" : "bg-white border-[#E3D6BA] text-[#4A4238] hover:bg-[#FAF7EE]"}`}>
              <Icone className="h-4 w-4" /> {libelle}{cle === "invites" && aValider > 0 && <span className="ml-1 rounded-full bg-[#B5483C] text-white text-xs min-w-5 h-5 px-1.5 inline-flex items-center justify-center" aria-label={`${aValider} à valider`}>{aValider}</span>}
            </button>
          ))}
        </nav>

        {onglet === "checklist" && <Checklist espace={espace} date={devis.date_evenement} maj={maj} />}
        {onglet === "budget" && <Budget espace={espace} devise={devis.devise ?? "MAD"} maj={maj} />}
        {onglet === "programme" && <Programme espace={espace} noms={noms} date={devis.date_evenement} maj={maj} />}
        {onglet === "invites" && <Invites token={token} espace={espace} invites={invites} noms={noms} date={devis.date_evenement} maj={maj} enregistrer={enregistrerInvite} supprimer={supprimerInvite} />}
        {onglet === "invitation" && (
          <div className={`${carte} p-4 sm:p-6`}>
            <LienInvitation lien={lienReponse(token)} noms={noms} onInvites={() => setOnglet("invites")} />
            <PersonnaliserInvitation noms={noms} date={devis.date_evenement} lieu={devis.lieu} message={espace.message_invites} valeur={espace.invitation ?? {}} onChange={(v) => maj({ invitation: v })} />
            <p className="text-xs text-[#8C6D22] mt-4">Cette invitation s'affiche à vos invités quand ils ouvrent leur lien (onglet Invités).</p>
          </div>
        )}
        {onglet === "souvenirs" && <SouvenirsMaries token={token} date={devis.date_evenement} noms={noms} />}
        {onglet === "tables" && <PlanDeTable espace={espace} invites={actives} maj={maj} enregistrer={enregistrerInvite} />}

        <p className="text-center text-xs text-[#8C6D22] print:hidden">Votre espace est enregistré automatiquement. L'équipe Heavent peut consulter votre programme et votre plan de table pour coordonner la soirée.</p>
      </div>
    </Cadre>
  );
}

/* ---------------- Check-list ---------------- */
function LienInvitation({ lien, noms, onInvites }: { lien: string; noms: string; onInvites: () => void }) {
  const [copie, setCopie] = useState(false);
  const copier = async () => { try { await navigator.clipboard.writeText(lien); setCopie(true); setTimeout(() => setCopie(false), 1500); } catch { window.prompt("Lien à copier :", lien); } };
  return (
    <div className="mb-6 rounded-lg border border-[#E3D6BA] bg-[#FAF7EE] p-4" data-testid="lien-invitation">
      <p className="text-sm font-medium">Le lien de votre invitation</p>
      <p className="text-xs text-[#8C6D22] mt-1">Un seul lien pour tous vos invités : ils ouvrent l'enveloppe, tapent leur nom et répondent. Vous pouvez aussi envoyer un lien personnel à chacun depuis l'onglet Invités.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <input readOnly value={lien} onFocus={(e) => e.currentTarget.select()} className={`${champ} flex-1 min-w-[220px]`} aria-label="Lien de l'invitation" />
        <button type="button" onClick={copier} className={boutonOr}>{copie ? "Copié ✓" : "Copier le lien"}</button>
        <a className={boutonClair} target="_blank" rel="noopener noreferrer" href={`https://wa.me/?text=${encodeURIComponent(`💌 ${noms} vous invitent à leur mariage.\nOuvrez l'enveloppe et confirmez votre présence ici :\n${lien}`)}`}>WhatsApp</a>
        <a className={boutonClair} target="_blank" rel="noopener noreferrer" href={lien}>Voir comme un invité</a>
        <button type="button" onClick={onInvites} className={boutonClair}>Liens personnels</button>
      </div>
    </div>
  );
}

function Checklist({ espace, date, maj }: { espace: Espace; date: string | null; maj: (m: Partial<Espace>) => void }) {
  const [nouveau, setNouveau] = useState<Record<string, string>>({});
  const set = (l: Tache[]) => maj({ checklist: l });
  const auj = aujourdhui();
  return (
    <div className="space-y-4" data-testid="checklist">
      {ECHEANCES.map(({ cle, libelle }) => {
        const taches = espace.checklist.filter((t) => t.echeance === cle);
        const limite = dateEcheance(date, cle);
        const enRetard = limite && limite < auj;
        return (
          <section key={cle} className={`${carte} p-5`}>
            <div className="flex items-baseline justify-between gap-3 mb-3">
              <h2 className="font-serif text-xl">{libelle}</h2>
              {limite && cle !== "j" && <span className={`text-xs ${enRetard && taches.some((t) => !t.fait) ? "text-[#8A2E26]" : "text-[#8C6D22]"}`}>avant le {dateCourte(limite)}</span>}
            </div>
            <ul className="space-y-1">
              {taches.map((t) => (
                <li key={t.id} className="group flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-[#FAF7EE]">
                  <button onClick={() => set(espace.checklist.map((x) => (x.id === t.id ? { ...x, fait: !x.fait } : x)))} aria-label={t.fait ? "Marquer à faire" : "Marquer comme fait"}
                    className={`h-6 w-6 shrink-0 rounded-full border flex items-center justify-center ${t.fait ? "bg-[#A8933F] border-[#A8933F] text-white" : "border-[#CDBB8E] bg-white"}`}>
                    {t.fait && <Check className="h-4 w-4" />}
                  </button>
                  <input value={t.titre} onChange={(e) => set(espace.checklist.map((x) => (x.id === t.id ? { ...x, titre: e.target.value } : x)))}
                    className={`flex-1 min-w-0 bg-transparent text-sm focus:outline-none ${t.fait ? "line-through text-[#9A8F80]" : ""}`} />
                  <button onClick={() => set(espace.checklist.filter((x) => x.id !== t.id))} className="opacity-40 group-hover:opacity-100 p-1 text-[#8A2E26]" aria-label="Supprimer"><Trash2 className="h-4 w-4" /></button>
                </li>
              ))}
            </ul>
            <form className="flex gap-2 mt-2" onSubmit={(e) => {
              e.preventDefault(); const titre = (nouveau[cle] ?? "").trim(); if (!titre) return;
              set([...espace.checklist, { id: uid(), titre, echeance: cle as Echeance, fait: false }]); setNouveau({ ...nouveau, [cle]: "" });
            }}>
              <input value={nouveau[cle] ?? ""} onChange={(e) => setNouveau({ ...nouveau, [cle]: e.target.value })} placeholder="Ajouter une tâche…" className={champ} data-testid={`nouvelle-tache-${cle}`} />
              <button className={boutonClair} aria-label="Ajouter"><Plus className="h-4 w-4" /></button>
            </form>
          </section>
        );
      })}
    </div>
  );
}

/* ---------------- Budget ---------------- */
function Budget({ espace, devise, maj }: { espace: Espace; devise: string; maj: (m: Partial<Espace>) => void }) {
  const set = (l: PosteBudget[]) => maj({ budget: l });
  const ch = (id: string, k: keyof PosteBudget, v: string) => set(espace.budget.map((b) => (b.id === id ? { ...b, [k]: k === "poste" ? v : num(v) } : b)));
  const tot = espace.budget.reduce((s, b) => ({ prevu: s.prevu + (b.prevu ?? 0), reel: s.reel + (b.reel ?? 0), paye: s.paye + (b.paye ?? 0) }), { prevu: 0, reel: 0, paye: 0 });
  const engage = espace.budget.reduce((s, b) => s + (b.reel ?? b.prevu ?? 0), 0);
  const resteAPayer = espace.budget.reduce((s, b) => s + Math.max(0, (b.reel ?? b.prevu ?? 0) - (b.paye ?? 0)), 0);
  const depassement = espace.budget_total ? engage - espace.budget_total : 0;
  const v = (n: number | null) => (n === null ? "" : String(n));
  return (
    <section className={`${carte} p-5 space-y-4`} data-testid="budget">
      <div className="flex flex-wrap items-end gap-4 justify-between">
        <label className="space-y-1">
          <span className="text-xs uppercase tracking-[0.15em] text-[#8C6D22] font-semibold">Budget global</span>
          <div className="flex items-center gap-2">
            <input inputMode="decimal" value={v(espace.budget_total)} onChange={(e) => maj({ budget_total: num(e.target.value) })} className={`${champ} w-40`} placeholder="ex. 150000" data-testid="budget-total" />
            <span className="text-sm text-[#8C6D22]">{devise}</span>
          </div>
        </label>
        <div className="grid grid-cols-3 gap-4 text-right text-sm">
          <div><div className="text-xs text-[#8C6D22]">Engagé</div><div className="font-serif text-xl" data-testid="budget-engage">{nf(engage)}</div></div>
          <div><div className="text-xs text-[#8C6D22]">Déjà payé</div><div className="font-serif text-xl">{nf(tot.paye)}</div></div>
          <div><div className="text-xs text-[#8C6D22]">Reste à payer</div><div className="font-serif text-xl">{nf(resteAPayer)}</div></div>
        </div>
      </div>
      {espace.budget_total ? (
        <div>
          <div className="h-2 rounded-full bg-[#F1ECDD] overflow-hidden"><div className={`h-full ${depassement > 0 ? "bg-[#B5483C]" : "bg-[#A8933F]"}`} style={{ width: `${Math.min(100, (engage / espace.budget_total) * 100)}%` }} /></div>
          <p className={`text-xs mt-1 ${depassement > 0 ? "text-[#8A2E26]" : "text-[#8C6D22]"}`}>
            {depassement > 0 ? `Dépassement de ${nf(depassement)} ${devise}` : `Encore ${nf(-depassement)} ${devise} disponibles`}
          </p>
        </div>
      ) : null}
      <div className="overflow-x-auto -mx-5 px-5">
        <table className="w-full text-sm min-w-[560px]">
          <thead><tr className="text-left text-xs uppercase tracking-[0.12em] text-[#8C6D22]"><th className="py-2 font-semibold">Poste</th><th className="font-semibold">Prévu</th><th className="font-semibold">Coût réel</th><th className="font-semibold">Payé</th><th /></tr></thead>
          <tbody className="divide-y divide-[#F1ECDD]">
            {espace.budget.map((b) => (
              <tr key={b.id}>
                <td className="py-1.5 pr-2"><input value={b.poste} onChange={(e) => ch(b.id, "poste", e.target.value)} className={champ} /></td>
                {(["prevu", "reel", "paye"] as const).map((k) => (
                  <td key={k} className="pr-2"><input inputMode="decimal" value={v(b[k])} onChange={(e) => ch(b.id, k, e.target.value)} className={`${champ} w-28 text-right`} /></td>
                ))}
                <td><button onClick={() => set(espace.budget.filter((x) => x.id !== b.id))} className="p-2 text-[#8A2E26]" aria-label="Supprimer le poste"><Trash2 className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
          <tfoot><tr className="font-semibold border-t border-[#E3D6BA]"><td className="py-2">Total</td><td>{nf(tot.prevu)}</td><td>{nf(tot.reel)}</td><td>{nf(tot.paye)}</td><td /></tr></tfoot>
        </table>
      </div>
      <button className={boutonClair} onClick={() => set([...espace.budget, { id: uid(), poste: "Nouveau poste", prevu: null, reel: null, paye: null }])} data-testid="ajouter-poste"><Plus className="h-4 w-4" /> Ajouter un poste</button>
    </section>
  );
}

/* ---------------- Programme ---------------- */
function Programme({ espace, noms, date, maj }: { espace: Espace; noms: string; date: string | null; maj: (m: Partial<Espace>) => void }) {
  const tries = useMemo(() => [...espace.programme].sort((a, b) => cleHeure(a.heure) - cleHeure(b.heure)), [espace.programme]);
  const set = (l: Moment[]) => maj({ programme: l });
  const ch = (id: string, k: keyof Moment, v: string) => set(espace.programme.map((m) => (m.id === id ? { ...m, [k]: v } : m)));
  return (
    <section className={`${carte} p-5 sm:p-7`} data-testid="programme">
      <div className="flex items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="font-serif text-2xl">Programme de la soirée</h2>
          <p className="text-sm text-[#6B6155] print:hidden">Partagé avec l'agence pour coordonner hôtesses et prestataires.</p>
          <p className="hidden print:block text-sm">{noms}{date ? ` · ${dateLongue(date)}` : ""}</p>
        </div>
        <button className={`${boutonClair} print:hidden`} onClick={() => window.print()}><Printer className="h-4 w-4" /> Imprimer</button>
      </div>
      <ol className="relative border-l-2 border-[#E4D49A] ml-3 space-y-4">
        {tries.map((m) => (
          <li key={m.id} className="relative pl-6 group">
            <span className="absolute -left-[9px] top-3 h-4 w-4 rounded-full bg-[#C8B560] ring-4 ring-white" />
            <div className="flex flex-wrap sm:flex-nowrap items-start gap-2">
              <input type="time" value={m.heure} onChange={(e) => ch(m.id, "heure", e.target.value)} className={`${champ} w-28 font-semibold text-[#8C6D22]`} aria-label="Heure" />
              <div className="flex-1 min-w-[200px] space-y-1">
                <input value={m.titre} onChange={(e) => ch(m.id, "titre", e.target.value)} className={`${champ} font-medium`} aria-label="Moment" />
                <input value={m.details} onChange={(e) => ch(m.id, "details", e.target.value)} className={`${champ} text-[#6B6155]`} placeholder="Détails (musique, personnes concernées…)" aria-label="Détails" />
              </div>
              <button onClick={() => set(espace.programme.filter((x) => x.id !== m.id))} className="p-2 text-[#8A2E26] opacity-50 group-hover:opacity-100 print:hidden" aria-label="Supprimer"><Trash2 className="h-4 w-4" /></button>
            </div>
          </li>
        ))}
      </ol>
      <button className={`${boutonClair} mt-5 print:hidden`} onClick={() => set([...espace.programme, { id: uid(), heure: "", titre: "Nouveau moment", details: "" }])} data-testid="ajouter-moment"><Plus className="h-4 w-4" /> Ajouter un moment</button>
    </section>
  );
}

/* ---------------- Invités ---------------- */
function Invites({ token, espace, invites, noms, date, maj, enregistrer, supprimer }: {
  token: string; espace: Espace; invites: Invite[]; noms: string; date: string | null; maj: (m: Partial<Espace>) => void;
  enregistrer: (i: Partial<Invite> & { nom: string }) => Promise<Invite | null>; supprimer: (id: string) => void;
}) {
  const [nom, setNom] = useState(""); const [tel, setTel] = useState(""); const [cote, setCote] = useState<Invite["cote"]>("commun"); const [nb, setNb] = useState("1");
  const [filtre, setFiltre] = useState<"tous" | Invite["reponse"]>("tous");
  const [copie, setCopie] = useState<string | null>(null);
  const [ajout, setAjout] = useState(false);
  const [annul, setAnnul] = useState<Invite | null>(null);
  const [colle, setColle] = useState(""); const [import_, setImport] = useState<string>("");
  const cleEnvoyes = `heavent-envoyes-${token}`;
  const [envoyes, setEnvoyes] = useState<string[]>(() => { try { return JSON.parse(localStorage.getItem(cleEnvoyes) ?? "[]"); } catch { return []; } });
  const marquerEnvoye = (id: string) => setEnvoyes((l) => { const n = l.includes(id) ? l : [...l, id]; try { localStorage.setItem(cleEnvoyes, JSON.stringify(n)); } catch { /* sans stockage : la coche reste le temps de la page */ } return n; });
  const importer = async () => {
    const { lignes, ignorees } = lireListeInvites(colle);
    const connus = new Set(invites.map((i) => i.nom.trim().toLowerCase()));
    const nouvelles = lignes.filter((l) => { const k = l.nom.toLowerCase(); if (connus.has(k)) return false; connus.add(k); return true; });
    if (!nouvelles.length) { setImport("Rien à ajouter : aucune ligne nouvelle n'a été reconnue."); return; }
    setAjout(true); let ok = 0;
    for (const l of nouvelles) { setImport(`Ajout en cours… ${ok}/${nouvelles.length}`); if (await enregistrer({ nom: l.nom, cote: "commun", nb_prevus: l.nb_prevus, telephone: l.telephone })) ok++; else break; }
    setAjout(false);
    const doublons = lignes.length - nouvelles.length;
    setImport(`${ok} invité${ok > 1 ? "s" : ""} ajouté${ok > 1 ? "s" : ""}${doublons ? ` · ${doublons} déjà dans la liste` : ""}${ignorees ? ` · ${ignorees} ligne${ignorees > 1 ? "s" : ""} sans nom ignorée${ignorees > 1 ? "s" : ""}` : ""}${ok < nouvelles.length ? " · l'import s'est arrêté, réessayez" : ""}.`);
    if (ok === nouvelles.length) setColle("");
  };
  const minuteur = useRef<number>();
  useEffect(() => () => window.clearTimeout(minuteur.current), []);
  const actives = invites.filter(estActive);
  const aEnvoyer = actives.filter((i) => i.telephone && i.reponse === "attente" && !envoyes.includes(i.id));
  const avecNumero = actives.filter((i) => i.telephone).length;
  const enAttenteValidation = invites.filter((i) => i.liste_statut === "a_valider");
  const refuses = invites.filter((i) => i.liste_statut === "refuse");
  const liste = actives.filter((i) => filtre === "tous" || i.reponse === filtre);
  const manquants = actives.filter((i) => i.reponse !== "non").reduce((s, i) => s + Math.max(0, (i.reponse === "oui" ? i.nb_confirmes ?? i.nb_prevus : i.nb_prevus) - 1 - (i.accompagnants ?? []).filter((n) => n.trim().split(/\s+/).length >= 2).length), 0);
  const mode: "ouverte" | "fermee" = espace.liste_mode ?? (actives.length ? "fermee" : "ouverte");
  const compte = (r: Invite["reponse"]) => actives.filter((i) => i.reponse === r).length;

  const ajouter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim()) return;
    if (/^\s*(famille|family|les)\b|&|\bet\b/i.test(nom) && !window.confirm("Ce nom ressemble à une famille ou à un couple. Pour les tables, mieux vaut un prénom et un nom (ex. Samir Benali) avec 3 places, puis les prénoms des autres dans « Noms des accompagnants ». Ajouter quand même ?")) return;
    setAjout(true);
    const ok = await enregistrer({ nom: nom.trim(), cote, nb_prevus: Math.min(20, Math.max(1, Number(nb) || 1)), telephone: tel.trim() || null });
    setAjout(false);
    if (ok) { setNom(""); setNb("1"); setTel(""); }
  };
  const copier = async (i: Invite) => {
    try { await navigator.clipboard.writeText(lienRsvp(i.jeton)); setCopie(i.id); setTimeout(() => setCopie(null), 1500); } catch { window.prompt("Lien à copier :", lienRsvp(i.jeton)); }
  };
  const exporter = () => {
    if (manquants > 0 && !window.confirm(`${manquants} nom${manquants > 1 ? "s" : ""} d'accompagnant manque${manquants > 1 ? "nt" : ""} encore. Exporter quand même ?`)) return;
    const tables = new Map(espace.tables.map((t) => [t.id, t.nom]));
    // une ligne par personne (invité puis accompagnants) : utile pour imprimer le plan de table
    const lignes = [["Nom et prénom", "Invité principal", "Côté", "Réponse", "Table", "Remarque"], ...actives.flatMap((i) => {
      const n = i.reponse === "non" ? 1 : i.reponse === "oui" ? i.nb_confirmes ?? i.nb_prevus : i.nb_prevus;
      return nomsPersonnes(i, n).map((nomP, k) => [
        nomP || `(accompagnant de ${i.nom}, nom à renseigner)`, k === 0 ? "Oui" : `Accompagnant de ${i.nom}`, COTES[i.cote],
        { attente: "En attente", oui: "Présent", non: "Absent" }[i.reponse], tables.get(i.table_id ?? "") ?? "", k === 0 ? i.remarque ?? "" : "",
      ]);
    })];
    const csv = "﻿" + lignes.map((l) => l.map((c) => `"${(/^[=+\-@\t\r]/.test(c) ? "'" + c : c).replace(/"/g, '""')}"`).join(";")).join("\n");
    enregistrerFichier(new Blob([csv], { type: "text/csv;charset=utf-8" }), "Invites-mariage.csv");
  };

  const lienGeneral = lienReponse(token);
  const copierGeneral = async () => {
    try { await navigator.clipboard.writeText(lienGeneral); setCopie("general"); setTimeout(() => setCopie(null), 1500); } catch { window.prompt("Lien à copier :", lienGeneral); }
  };
  return (
    <div className="space-y-4" data-testid="invites">
      {enAttenteValidation.length > 0 && (
        <section className={`${carte} p-5 space-y-3 border-[#C8B560]`} data-testid="a-valider">
          <h2 className="font-titre text-xl">À valider ({enAttenteValidation.length})</h2>
          <p className="text-xs text-[#6B6155]">Ces personnes ne sont pas dans votre liste et ont répondu avec le lien. Elles ne comptent pas tant que vous ne les avez pas acceptées.</p>
          <ul className="divide-y divide-[#F1ECDD]">
            {enAttenteValidation.map((i) => (
              <li key={i.id} className="py-3 flex flex-wrap items-center gap-3">
                <div className="flex-1 min-w-[180px]">
                  <div className="font-medium">{i.nom} <span className="text-xs font-normal text-[#8C6D22]">· {i.reponse === "non" ? "ne viendra pas" : `${i.nb_confirmes ?? i.nb_prevus} pers.`}</span></div>
                  {!!i.accompagnants?.length && <div className="text-xs text-[#6B6155]">Avec : {i.accompagnants.join(", ")}</div>}
                </div>
                <button className={`${boutonOr} min-h-11`} onClick={() => enregistrer({ ...i, liste_statut: "valide" })} data-testid="accepter-invite"><Check className="h-4 w-4" /> Accepter</button>
                <button className={`${boutonClair} min-h-11`} onClick={async () => { const ok = await enregistrer({ ...i, liste_statut: "refuse" }); if (!ok) return; setAnnul(i); window.clearTimeout(minuteur.current); minuteur.current = window.setTimeout(() => setAnnul(null), 8000); }} data-testid="refuser-invite">Refuser</button>
              </li>
            ))}
          </ul>
        </section>
      )}
      {annul && (
        <div role="status" className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-[#141414] text-white px-4 py-3 text-sm" data-testid="annuler-refus">
          <span>{annul.nom} a été refusé(e).</span>
          <button className="underline underline-offset-2 min-h-11 px-2" onClick={async () => { const ok = await enregistrer({ ...annul, liste_statut: "a_valider" }); if (ok) { window.clearTimeout(minuteur.current); setAnnul(null); } }}>Annuler</button>
        </div>
      )}

      <section className={`${carte} p-5 space-y-3`} data-testid="lien-general">
        <h2 className="font-titre text-xl">Un seul lien pour tous vos invités</h2>
        <p className="text-sm text-[#5E554A]">Envoyez ce lien dans votre groupe WhatsApp : chaque invité écrit son prénom et son nom, retrouve son invitation et répond. Sa réponse se coche toute seule dans la liste ci-dessous. Pensez à bien écrire les noms de vos invités dans la liste.</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={boutonOr} onClick={copierGeneral} data-testid="copier-lien-general">{copie === "general" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copie === "general" ? "Lien copié" : "Copier le lien"}</button>
          <a className={boutonClair} target="_blank" rel="noopener noreferrer" href={`https://wa.me/?text=${encodeURIComponent(`💌 ${noms} vous invitent à leur mariage.\nOuvrez l'enveloppe et confirmez votre présence ici :\n${lienGeneral}`)}`}><MessageCircle className="h-4 w-4" /> Envoyer par WhatsApp</a>
        </div>
      </section>
      <section className={`${carte} p-5 space-y-3`} data-testid="mode-liste">
        <h2 className="font-titre text-xl">Qui peut répondre avec le lien ?</h2>
        <div className="grid sm:grid-cols-2 gap-2" role="radiogroup" aria-label="Mode de la liste d'invités">
          {([
            ["fermee", "Seulement ma liste", "Chaque invité doit retrouver son nom dans votre liste. Un inconnu ne peut pas répondre."],
            ["ouverte", "Ouverte à tous", "N'importe qui peut écrire son nom et répondre. Vous acceptez ou refusez chaque demande."],
          ] as const).map(([k, titre, texte]) => (
            <button key={k} type="button" role="radio" aria-checked={mode === k} onClick={() => maj({ liste_mode: k })} data-testid={`mode-${k}`}
              className={`text-left rounded-lg border p-4 transition ${mode === k ? "border-[#141414] bg-[#FAF7EE] ring-1 ring-[#141414]" : "border-[#E3D6BA] bg-white hover:bg-[#FAF7EE]"}`}>
              <span className="font-medium block"><span aria-hidden="true" className={`inline-block h-3.5 w-3.5 rounded-full border mr-2 align-[-1px] ${mode === k ? "bg-[#141414] border-[#141414]" : "border-[#B9A978]"}`} />{titre}</span>
              <span className="text-xs text-[#6B6155] block mt-1">{texte}</span>
            </button>
          ))}
        </div>
        <p className="text-xs text-[#6B6155]">Dans les deux cas, chaque invité qui vient accompagné doit écrire le prénom et le nom de ses accompagnants : vous avez ainsi la liste complète pour les tables.</p>
      </section>

      <section className={`${carte} p-5 space-y-4`}>
        <h2 className="font-titre text-xl">Ajouter des invités</h2>
        <form onSubmit={ajouter} className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto_auto_auto] gap-2">
          <input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Prénom et nom (ex. Samir Benali)" className={champ} data-testid="invite-nom" />
          <input value={tel} onChange={(e) => setTel(e.target.value)} type="tel" inputMode="tel" placeholder="WhatsApp (facultatif)" aria-label="Numéro WhatsApp de l'invité" className={`${champ} sm:w-44`} data-testid="invite-tel" />
          <select value={cote} onChange={(e) => setCote(e.target.value as Invite["cote"])} className={champ} aria-label="Côté">
            {Object.entries(COTES).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </select>
          <label className="flex items-center gap-2 text-sm"><span className="text-[#6B6155]" title="1 = l'invité seul, 2 = il peut venir avec une personne (+1), 3 = avec deux (+2)…">Personnes (+1, +2…)</span><input type="number" min={1} max={20} value={nb} onChange={(e) => setNb(e.target.value)} className={`${champ} w-20`} data-testid="invite-nb" /></label>
          <button className={boutonOr} disabled={ajout} data-testid="ajouter-invite">{ajout ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Ajouter</button>
        </form>
        <details className="text-sm" data-testid="import-liste">
          <summary className="cursor-pointer text-[#8C6D22]">Importer toute ma liste d'un coup</summary>
          <div className="mt-3 space-y-2">
            <p className="text-xs text-[#6B6155]">Collez votre liste (depuis Excel, Notes ou WhatsApp) : une ligne par invité, avec le nom puis le numéro WhatsApp, et si besoin le nombre de places. Exemple : <i>Samir Benali ; 0612345678 ; 3</i></p>
            <textarea value={colle} onChange={(e) => { setColle(e.target.value); setImport(""); }} rows={6} className={`${champ} py-2 font-mono`} placeholder={"Samir Benali ; 0612345678 ; 3\nLeila Idrissi ; 0698765432"} aria-label="Liste d'invités à importer" data-testid="import-texte" />
            {colle.trim() && <p className="text-xs text-[#5E554A]">{lireListeInvites(colle).lignes.length} invité{lireListeInvites(colle).lignes.length > 1 ? "s" : ""} reconnu{lireListeInvites(colle).lignes.length > 1 ? "s" : ""}, dont {lireListeInvites(colle).lignes.filter((l) => l.telephone).length} avec un numéro.</p>}
            <button type="button" className={boutonOr} disabled={ajout || !colle.trim()} onClick={() => void importer()} data-testid="import-valider">Importer ces invités</button>
            {import_ && <p className="text-sm" role="status" data-testid="import-resultat">{import_}</p>}
          </div>
        </details>
        <p className="text-xs text-[#6B6155]">Une famille ? Ajoutez une personne (ex. Samir Benali) avec 3 places, puis écrivez le prénom et le nom des autres dans « Noms des accompagnants ». « Personnes » = nombre de places pour cet invité, lui compris : 1 = seul, 2 = il peut venir avec une personne (+1), 3 = avec deux (+2). Un invité ne peut pas confirmer plus de places que celles que vous lui avez accordées.</p>
        <details className="text-sm">
          <summary className="cursor-pointer text-[#8C6D22]">Message et date limite de réponse</summary>
          <div className="grid sm:grid-cols-[1fr_auto] gap-3 mt-3">
            <textarea value={espace.message_invites ?? ""} onChange={(e) => maj({ message_invites: e.target.value })} rows={3} className={`${champ} py-2`} placeholder="Un petit mot affiché à vos invités sur leur page de réponse" />
            <label className="space-y-1"><span className="text-xs text-[#6B6155]">Répondre avant le</span><input type="date" value={espace.date_limite_reponse ?? ""} onChange={(e) => maj({ date_limite_reponse: e.target.value || null })} className={champ} /></label>
          </div>
        </details>
      </section>

      {avecNumero > 0 && (
        <section className={`${carte} p-5 space-y-3`} data-testid="envoi-cartes">
          <h2 className="font-titre text-xl">Envoyer les cartes une par une</h2>
          <p className="text-sm text-[#5E554A]">Chaque invité reçoit sa propre carte, à son nom, directement sur son WhatsApp. Un appui par invité : WhatsApp s'ouvre avec le message prêt, il ne reste qu'à envoyer.</p>
          <p className="text-sm"><b>{actives.filter((i) => i.telephone && envoyes.includes(i.id)).length}</b> envoyée{actives.filter((i) => i.telephone && envoyes.includes(i.id)).length > 1 ? "s" : ""} sur {avecNumero}</p>
          {aEnvoyer[0] ? (
            <a href={lienWa(messageWhatsappInvite(aEnvoyer[0], noms, date), aEnvoyer[0].telephone)} target="_blank" rel="noopener noreferrer" onClick={() => marquerEnvoye(aEnvoyer[0].id)} className={`${bouton} bg-[#25D366] text-white min-h-12 px-5 w-full sm:w-auto`} data-testid="envoyer-suivant">
              <MessageCircle className="h-5 w-5" /> Envoyer à {aEnvoyer[0].nom}{aEnvoyer.length > 1 ? ` (${aEnvoyer.length - 1} ensuite)` : ""}
            </a>
          ) : <p className="text-sm text-[#2F5A2A]" data-testid="envoi-termine">Toutes les cartes avec un numéro ont été envoyées.</p>}
        </section>
      )}

      <section className={`${carte} p-5 space-y-3`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2 flex-wrap text-sm">
            {([["tous", `Tous (${actives.length})`], ["oui", `Présents (${compte("oui")})`], ["attente", `En attente (${compte("attente")})`], ["non", `Absents (${compte("non")})`]] as const).map(([k, l]) => (
              <button key={k} onClick={() => setFiltre(k)} className={`rounded-full px-3 min-h-9 border ${filtre === k ? "bg-[#141414] text-white border-[#141414]" : "border-[#E3D6BA] bg-white"}`}>{l}</button>
            ))}
          </div>
          {actives.length > 0 && <button className={boutonClair} onClick={exporter}><Download className="h-4 w-4" /> Exporter</button>}
        </div>
        {manquants > 0 && <p className="text-sm text-[#5C4512] bg-[#FFF7E6] border border-[#F0D9A8] rounded-lg px-4 py-3" data-testid="noms-manquants">{manquants} nom{manquants > 1 ? "s" : ""} d'accompagnant manque{manquants > 1 ? "nt" : ""} pour vos tables : ouvrez « Noms des accompagnants » sous l'invité concerné.</p>}
        {!actives.length ? (
          <p className="text-sm text-[#6B6155] py-6 text-center">Ajoutez vos invités : chacun reçoit un lien personnel pour confirmer sa présence, à envoyer par WhatsApp.</p>
        ) : (
          <ul className="divide-y divide-[#F1ECDD]" data-testid="liste-invites">
            {liste.map((i) => (
              <li key={i.id} className="py-3 flex flex-wrap items-center gap-3">
                <div className="flex-1 min-w-[180px]">
                  <div className="font-medium">{i.nom} <span className="text-xs text-[#8C6D22] font-normal">· {COTES[i.cote]} · {i.nb_prevus} pers.</span></div>
                  <input key={`${i.id}-tel-${i.telephone ?? ""}`} defaultValue={i.telephone ?? ""} type="tel" inputMode="tel" maxLength={20} placeholder="N° WhatsApp pour envoi direct" aria-label={`Numéro WhatsApp de ${i.nom}`} className="mt-1 w-full max-w-[220px] rounded-lg border border-[#E3D6BA] bg-white px-2 min-h-9 text-xs"
                    onBlur={(e) => { const v = e.target.value.trim(); if (v !== (i.telephone ?? "")) enregistrer({ ...i, telephone: v || null }); }} />
                  {i.remarque && <div className="text-xs text-[#6B6155]">« {i.remarque} »</div>}
                  {i.nb_prevus > 1 && (
                    <details className="text-xs mt-1" data-testid="accompagnants-invite">
                      <summary className={`cursor-pointer ${i.reponse === "oui" && (i.accompagnants ?? []).filter(Boolean).length < (i.nb_confirmes ?? i.nb_prevus) - 1 ? "text-[#8A2E26]" : "text-[#8C6D22]"}`}>
                        Noms des accompagnants ({(i.accompagnants ?? []).filter(Boolean).length}/{i.nb_prevus - 1})
                      </summary>
                      <div className="mt-2 grid gap-1.5 max-w-sm">
                        {Array.from({ length: i.nb_prevus - 1 }, (_, k) => (
                          <input key={`${i.id}-${k}-${(i.accompagnants ?? [])[k] ?? ""}`} defaultValue={(i.accompagnants ?? [])[k] ?? ""} maxLength={80} placeholder={`Prénom et nom de l'accompagnant ${k + 1}`} className={champ}
                            onBlur={(e) => { const v = e.target.value.trim(); if (v === ((i.accompagnants ?? [])[k] ?? "")) return; const a = Array.from({ length: i.nb_prevus - 1 }, (_, j) => (j === k ? v : (i.accompagnants ?? [])[j] ?? "")); enregistrer({ ...i, accompagnants: a }); }} />
                        ))}
                      </div>
                    </details>
                  )}
                </div>
                <select value={i.nb_prevus} onChange={(e) => { const n = Number(e.target.value); enregistrer({ ...i, nb_prevus: n, nb_confirmes: i.nb_confirmes != null ? Math.min(i.nb_confirmes, n) : i.nb_confirmes }); }}
                  className="rounded-full border border-[#E3D6BA] bg-white px-3 min-h-9 text-xs" aria-label={`Places accordées à ${i.nom}`} title="Places accordées, invité compris" data-testid="places-invite">
                  {Array.from({ length: 10 }, (_, k) => k + 1).map((n) => <option key={n} value={n}>{n === 1 ? "Seul(e)" : `+${n - 1} (${n} places)`}</option>)}
                </select>
                <select value={i.reponse} onChange={(e) => enregistrer({ ...i, reponse: e.target.value as Invite["reponse"], nb_confirmes: e.target.value === "oui" ? i.nb_confirmes ?? i.nb_prevus : e.target.value === "non" ? 0 : null })}
                  className={`rounded-full border px-3 min-h-9 text-xs font-medium ${i.reponse === "oui" ? "bg-[#EEF6EA] border-[#CFE3C5] text-[#2F5A2A]" : i.reponse === "non" ? "bg-[#FBEDEB] border-[#EFC9C4] text-[#8A2E26]" : "bg-[#FFF7E6] border-[#F0D9A8] text-[#5C4512]"}`}
                  aria-label={`Réponse de ${i.nom}`} data-testid="reponse-invite">
                  <option value="attente">En attente</option>
                  <option value="oui">Présent{i.reponse === "oui" && i.nb_confirmes ? ` (${i.nb_confirmes})` : ""}</option>
                  <option value="non">Absent</option>
                </select>
                <a href={lienWa(messageWhatsappInvite(i, noms, date), i.telephone)} target="_blank" rel="noopener noreferrer" onClick={() => marquerEnvoye(i.id)} className={`${bouton} bg-[#25D366] text-white min-h-9 px-3`} aria-label={`Envoyer l'invitation à ${i.nom} par WhatsApp`}>
                  {envoyes.includes(i.id) ? <CheckCircle2 className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />} <span className="hidden sm:inline">{envoyes.includes(i.id) ? "Envoyée" : "Envoyer"}</span>
                </a>
                <button onClick={() => copier(i)} className={`${boutonClair} min-h-9 px-3`} aria-label="Copier le lien de réponse" data-testid="copier-lien-invite">
                  {copie === i.id ? <CheckCircle2 className="h-4 w-4 text-[#2F5A2A]" /> : <Copy className="h-4 w-4" />}
                </button>
                <button onClick={() => { if (window.confirm(`Supprimer ${i.nom} de la liste ?`)) supprimer(i.id); }} className="p-2 text-[#8A2E26]" aria-label="Supprimer l'invité"><Trash2 className="h-4 w-4" /></button>
              </li>
            ))}
          </ul>
        )}
        {refuses.length > 0 && (
          <details className="text-sm" data-testid="refuses">
            <summary className="cursor-pointer text-[#6B6155]">Demandes refusées ({refuses.length})</summary>
            <ul className="mt-2 space-y-1">
              {refuses.map((i) => <li key={i.id} className="flex items-center justify-between gap-2"><span>{i.nom}</span><button className="text-xs text-[#8C6D22] underline" onClick={() => { setAnnul(null); enregistrer({ ...i, liste_statut: "a_valider" }); }}>Remettre à valider</button></li>)}
            </ul>
          </details>
        )}
      </section>
    </div>
  );
}

/* ---------------- Plan de table ---------------- */
function PlanDeTable({ espace, invites, maj, enregistrer }: {
  espace: Espace; invites: Invite[]; maj: (m: Partial<Espace>) => void; enregistrer: (i: Partial<Invite> & { nom: string }) => Promise<Invite | null>;
}) {
  const [nomTable, setNomTable] = useState(""); const [places, setPlaces] = useState("10");
  const presents = invites.filter((i) => i.reponse !== "non");
  const sansTable = presents.filter((i) => !i.table_id || !espace.tables.some((t) => t.id === i.table_id));
  const set = (l: TableMariage[]) => maj({ tables: l });
  const ajouterTable = (e: React.FormEvent) => {
    e.preventDefault();
    set([...espace.tables, { id: uid(), nom: nomTable.trim() || `Table ${espace.tables.length + 1}`, places: Math.max(1, Number(places) || 10) }]);
    setNomTable("");
  };
  const supprimerTable = (t: TableMariage) => {
    if (!window.confirm(`Supprimer « ${t.nom} » ? Les invités assis repasseront « sans table ».`)) return;
    set(espace.tables.filter((x) => x.id !== t.id));
    invites.filter((i) => i.table_id === t.id).forEach((i) => enregistrer({ ...i, table_id: null }));
  };
  const totalPlaces = espace.tables.reduce((s, t) => s + t.places, 0);
  const totalPersonnes = presents.reduce((s, i) => s + personnes(i), 0);

  return (
    <div className="space-y-4" data-testid="plan-table">
      <section className={`${carte} p-5 space-y-3 print:hidden`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-serif text-xl">Vos tables</h2>
          <div className="flex items-center gap-3 text-sm text-[#6B6155]">
            <span>{nf(totalPersonnes)} personnes · {nf(totalPlaces)} places</span>
            {espace.tables.length > 0 && <button className={boutonClair} onClick={() => window.print()}><Printer className="h-4 w-4" /> Imprimer</button>}
          </div>
        </div>
        <form onSubmit={ajouterTable} className="flex flex-wrap gap-2">
          <input value={nomTable} onChange={(e) => setNomTable(e.target.value)} placeholder={`Table ${espace.tables.length + 1} (ou « Famille de la mariée »)`} className={`${champ} flex-1 min-w-[200px]`} data-testid="table-nom" />
          <label className="flex items-center gap-2 text-sm"><span className="text-[#6B6155]">Places</span><input type="number" min={1} max={40} value={places} onChange={(e) => setPlaces(e.target.value)} className={`${champ} w-20`} /></label>
          <button className={boutonOr} data-testid="ajouter-table"><Plus className="h-4 w-4" /> Ajouter la table</button>
        </form>
      </section>

      {sansTable.length > 0 && espace.tables.length > 0 && (
        <p className="text-sm text-[#5C4512] bg-[#FFF7E6] border border-[#F0D9A8] rounded-lg px-4 py-3 print:hidden" data-testid="sans-table">
          {sansTable.length} invitation{sansTable.length > 1 ? "s" : ""} sans table : {sansTable.slice(0, 6).map((i) => i.nom).join(", ")}{sansTable.length > 6 ? "…" : ""}
        </p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {espace.tables.map((t) => {
          const assis = presents.filter((i) => i.table_id === t.id);
          const occupe = assis.reduce((s, i) => s + personnes(i), 0);
          const plein = occupe > t.places;
          return (
            <section key={t.id} className={`${carte} p-5 break-inside-avoid`} data-testid="table-carte">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className={`h-12 w-12 rounded-full border-2 flex items-center justify-center font-serif text-sm ${plein ? "border-[#B5483C] text-[#8A2E26]" : "border-[#C8B560] text-[#8C6D22]"}`}>{occupe}/{t.places}</div>
                  <input value={t.nom} onChange={(e) => set(espace.tables.map((x) => (x.id === t.id ? { ...x, nom: e.target.value } : x)))} className="font-serif text-lg bg-transparent focus:outline-none min-w-0 w-full" aria-label="Nom de la table" />
                </div>
                <button onClick={() => supprimerTable(t)} className="p-1 text-[#8A2E26] print:hidden" aria-label="Supprimer la table"><Trash2 className="h-4 w-4" /></button>
              </div>
              <ul className="mt-3 space-y-1 text-sm">
                {assis.map((i) => (
                  <li key={i.id} className="flex items-center justify-between gap-2 rounded-lg px-2 py-1 bg-[#FAF7EE]">
                    <span>
                      {nomsPersonnes(i, personnes(i)).map((n, k) => <span key={k} className="block">{n || <span className="text-xs text-[#8A2E26]">accompagnant de {i.nom} : nom à renseigner</span>}</span>)}
                      {i.reponse === "attente" ? <span className="text-xs text-[#9A8F80]"> (en attente)</span> : null}
                    </span>
                    <button onClick={() => enregistrer({ ...i, table_id: null })} className="text-xs text-[#8A2E26] print:hidden" aria-label={`Retirer ${i.nom}`}>Retirer</button>
                  </li>
                ))}
              </ul>
              {sansTable.length > 0 && (
                <select value="" onChange={(e) => { const i = invites.find((x) => x.id === e.target.value); if (i) enregistrer({ ...i, table_id: t.id }); }}
                  className={`${champ} mt-3 print:hidden`} aria-label={`Placer un invité à ${t.nom}`} data-testid="placer-invite">
                  <option value="">+ Placer un invité…</option>
                  {sansTable.map((i) => <option key={i.id} value={i.id}>{i.nom} ({personnes(i)})</option>)}
                </select>
              )}
            </section>
          );
        })}
      </div>
      {!espace.tables.length && <p className="text-center text-sm text-[#6B6155] py-6">Créez vos tables, puis placez vos invités. Les invités qui ont répondu « absent » ne sont pas proposés.</p>}
    </div>
  );
}

function Resume({ icone: Icone, titre, valeur, progression, sous }: { icone: typeof Heart; titre: string; valeur: string; progression: number | null; sous?: string }) {
  return (
    <div className="rounded-lg border border-[#EADFC8] bg-white px-4 py-3">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#8C6D22] font-semibold"><Icone className="h-4 w-4" /> {titre}</div>
      <div className="font-serif text-2xl mt-1">{valeur}</div>
      {sous && <div className="text-xs text-[#6B6155]">{sous}</div>}
      {progression !== null && <div className="h-1.5 rounded-full bg-[#F1ECDD] mt-2 overflow-hidden"><div className={`h-full ${progression > 1 ? "bg-[#B5483C]" : "bg-[#C8B560]"}`} style={{ width: `${Math.min(100, progression * 100)}%` }} /></div>}
    </div>
  );
}

function Cadre({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FBF8F1] text-[#2A2420]">
      <Seo noindex />
      <div className="container mx-auto px-4 py-8 sm:py-12">{children}</div>
    </div>
  );
}

