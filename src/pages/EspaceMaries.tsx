import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Seo from "@/components/Seo";
import { enregistrerFichier } from "@/lib/pdf";
import {
  COTES, ECHEANCES, Echeance, Invite, Moment, PosteBudget, TableMariage, Tache,
  budgetDefaut, checklistDefaut, dateEcheance, lienRsvp, messageWhatsappInvite, programmeDefaut, uid,
} from "@/lib/mariage";
import {
  ArrowLeft, Check, CheckCircle2, Copy, Download, Heart, ListChecks, Loader2, MessageCircle,
  Plus, Printer, Trash2, Users, Wallet, Armchair, Clock,
} from "lucide-react";

interface Espace {
  noms: string | null; checklist: Tache[]; budget: PosteBudget[]; programme: Moment[]; tables: TableMariage[];
  budget_total: number | null; message_invites: string | null; date_limite_reponse: string | null; updated_at?: string;
}
interface InfosDevis { client_nom: string; date_evenement: string | null; lieu: string | null; nb_personnes: number | null; devise: string | null }

type Onglet = "checklist" | "budget" | "programme" | "invites" | "tables";
const ONGLETS: { cle: Onglet; libelle: string; icone: typeof Heart }[] = [
  { cle: "checklist", libelle: "Check-list", icone: ListChecks },
  { cle: "budget", libelle: "Budget", icone: Wallet },
  { cle: "programme", libelle: "Programme du jour J", icone: Clock },
  { cle: "invites", libelle: "Invités", icone: Users },
  { cle: "tables", libelle: "Plan de table", icone: Armchair },
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
const carte = "rounded-3xl bg-white border border-[#EADFC8] shadow-[0_20px_60px_-40px_rgba(140,109,34,0.5)]";

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
  const confirmes = invites.filter((i) => i.reponse === "oui").reduce((s, i) => s + (i.nb_confirmes ?? i.nb_prevus), 0);
  const attendus = invites.reduce((s, i) => s + personnes(i), 0);
  const absents = invites.filter((i) => i.reponse === "non").length;

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
            sous={invites.length ? `personnes attendues${absents ? ` · ${absents} invitation${absents > 1 ? "s" : ""} déclinée${absents > 1 ? "s" : ""}` : ""}` : undefined} />
        </div>

        {/* Onglets */}
        <nav className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 print:hidden" role="tablist">
          {ONGLETS.map(({ cle, libelle, icone: Icone }) => (
            <button key={cle} role="tab" aria-selected={onglet === cle} onClick={() => setOnglet(cle)} data-testid={`onglet-${cle}`}
              className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 min-h-10 text-sm font-medium border transition ${onglet === cle ? "bg-[#141414] text-white border-[#141414]" : "bg-white border-[#E3D6BA] text-[#4A4238] hover:bg-[#FAF7EE]"}`}>
              <Icone className="h-4 w-4" /> {libelle}
            </button>
          ))}
        </nav>

        {onglet === "checklist" && <Checklist espace={espace} date={devis.date_evenement} maj={maj} />}
        {onglet === "budget" && <Budget espace={espace} devise={devis.devise ?? "MAD"} maj={maj} />}
        {onglet === "programme" && <Programme espace={espace} noms={noms} date={devis.date_evenement} maj={maj} />}
        {onglet === "invites" && <Invites espace={espace} invites={invites} noms={noms} date={devis.date_evenement} maj={maj} enregistrer={enregistrerInvite} supprimer={supprimerInvite} />}
        {onglet === "tables" && <PlanDeTable espace={espace} invites={invites} maj={maj} enregistrer={enregistrerInvite} />}

        <p className="text-center text-xs text-[#8C6D22] print:hidden">Votre espace est enregistré automatiquement. L'équipe Heavent peut consulter votre programme et votre plan de table pour coordonner la soirée.</p>
      </div>
    </Cadre>
  );
}

/* ---------------- Check-list ---------------- */
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
function Invites({ espace, invites, noms, date, maj, enregistrer, supprimer }: {
  espace: Espace; invites: Invite[]; noms: string; date: string | null; maj: (m: Partial<Espace>) => void;
  enregistrer: (i: Partial<Invite> & { nom: string }) => Promise<Invite | null>; supprimer: (id: string) => void;
}) {
  const [nom, setNom] = useState(""); const [cote, setCote] = useState<Invite["cote"]>("commun"); const [nb, setNb] = useState("1");
  const [filtre, setFiltre] = useState<"tous" | Invite["reponse"]>("tous");
  const [copie, setCopie] = useState<string | null>(null);
  const [ajout, setAjout] = useState(false);
  const liste = invites.filter((i) => filtre === "tous" || i.reponse === filtre);
  const compte = (r: Invite["reponse"]) => invites.filter((i) => i.reponse === r).length;

  const ajouter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim()) return;
    setAjout(true);
    const ok = await enregistrer({ nom: nom.trim(), cote, nb_prevus: Math.min(20, Math.max(1, Number(nb) || 1)) });
    setAjout(false);
    if (ok) { setNom(""); setNb("1"); }
  };
  const copier = async (i: Invite) => {
    try { await navigator.clipboard.writeText(lienRsvp(i.jeton)); setCopie(i.id); setTimeout(() => setCopie(null), 1500); } catch { window.prompt("Lien à copier :", lienRsvp(i.jeton)); }
  };
  const exporter = () => {
    const tables = new Map(espace.tables.map((t) => [t.id, t.nom]));
    const lignes = [["Nom", "Côté", "Prévus", "Réponse", "Confirmés", "Table", "Remarque"], ...invites.map((i) => [
      i.nom, COTES[i.cote], String(i.nb_prevus), { attente: "En attente", oui: "Présent", non: "Absent" }[i.reponse], i.nb_confirmes == null ? "" : String(i.nb_confirmes), tables.get(i.table_id ?? "") ?? "", i.remarque ?? "",
    ])];
    const csv = "﻿" + lignes.map((l) => l.map((c) => `"${c.replace(/"/g, '""')}"`).join(";")).join("\n");
    enregistrerFichier(new Blob([csv], { type: "text/csv;charset=utf-8" }), "Invites-mariage.csv");
  };

  return (
    <div className="space-y-4" data-testid="invites">
      <section className={`${carte} p-5 space-y-4`}>
        <h2 className="font-serif text-xl">Ajouter des invités</h2>
        <form onSubmit={ajouter} className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto_auto] gap-2">
          <input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom (ex. Famille Benali)" className={champ} data-testid="invite-nom" />
          <select value={cote} onChange={(e) => setCote(e.target.value as Invite["cote"])} className={champ} aria-label="Côté">
            {Object.entries(COTES).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </select>
          <label className="flex items-center gap-2 text-sm"><span className="text-[#6B6155]">Personnes</span><input type="number" min={1} max={20} value={nb} onChange={(e) => setNb(e.target.value)} className={`${champ} w-20`} data-testid="invite-nb" /></label>
          <button className={boutonOr} disabled={ajout} data-testid="ajouter-invite">{ajout ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Ajouter</button>
        </form>
        <details className="text-sm">
          <summary className="cursor-pointer text-[#8C6D22]">Message et date limite de réponse</summary>
          <div className="grid sm:grid-cols-[1fr_auto] gap-3 mt-3">
            <textarea value={espace.message_invites ?? ""} onChange={(e) => maj({ message_invites: e.target.value })} rows={3} className={`${champ} py-2`} placeholder="Un petit mot affiché à vos invités sur leur page de réponse" />
            <label className="space-y-1"><span className="text-xs text-[#6B6155]">Répondre avant le</span><input type="date" value={espace.date_limite_reponse ?? ""} onChange={(e) => maj({ date_limite_reponse: e.target.value || null })} className={champ} /></label>
          </div>
        </details>
      </section>

      <section className={`${carte} p-5 space-y-3`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2 flex-wrap text-sm">
            {([["tous", `Tous (${invites.length})`], ["oui", `Présents (${compte("oui")})`], ["attente", `En attente (${compte("attente")})`], ["non", `Absents (${compte("non")})`]] as const).map(([k, l]) => (
              <button key={k} onClick={() => setFiltre(k)} className={`rounded-full px-3 min-h-9 border ${filtre === k ? "bg-[#141414] text-white border-[#141414]" : "border-[#E3D6BA] bg-white"}`}>{l}</button>
            ))}
          </div>
          {invites.length > 0 && <button className={boutonClair} onClick={exporter}><Download className="h-4 w-4" /> Exporter</button>}
        </div>
        {!invites.length ? (
          <p className="text-sm text-[#6B6155] py-6 text-center">Ajoutez vos invités : chacun reçoit un lien personnel pour confirmer sa présence, à envoyer par WhatsApp.</p>
        ) : (
          <ul className="divide-y divide-[#F1ECDD]" data-testid="liste-invites">
            {liste.map((i) => (
              <li key={i.id} className="py-3 flex flex-wrap items-center gap-3">
                <div className="flex-1 min-w-[180px]">
                  <div className="font-medium">{i.nom} <span className="text-xs text-[#8C6D22] font-normal">· {COTES[i.cote]} · {i.nb_prevus} pers.</span></div>
                  {i.remarque && <div className="text-xs text-[#6B6155]">« {i.remarque} »</div>}
                </div>
                <select value={i.reponse} onChange={(e) => enregistrer({ ...i, reponse: e.target.value as Invite["reponse"], nb_confirmes: e.target.value === "oui" ? i.nb_confirmes ?? i.nb_prevus : e.target.value === "non" ? 0 : null })}
                  className={`rounded-full border px-3 min-h-9 text-xs font-medium ${i.reponse === "oui" ? "bg-[#EEF6EA] border-[#CFE3C5] text-[#2F5A2A]" : i.reponse === "non" ? "bg-[#FBEDEB] border-[#EFC9C4] text-[#8A2E26]" : "bg-[#FFF7E6] border-[#F0D9A8] text-[#5C4512]"}`}
                  aria-label={`Réponse de ${i.nom}`} data-testid="reponse-invite">
                  <option value="attente">En attente</option>
                  <option value="oui">Présent{i.reponse === "oui" && i.nb_confirmes ? ` (${i.nb_confirmes})` : ""}</option>
                  <option value="non">Absent</option>
                </select>
                <a href={`https://wa.me/?text=${encodeURIComponent(messageWhatsappInvite(i, noms, date))}`} target="_blank" rel="noopener noreferrer" className={`${bouton} bg-[#25D366] text-white min-h-9 px-3`} aria-label={`Envoyer l'invitation à ${i.nom} par WhatsApp`}>
                  <MessageCircle className="h-4 w-4" /> <span className="hidden sm:inline">Envoyer</span>
                </a>
                <button onClick={() => copier(i)} className={`${boutonClair} min-h-9 px-3`} aria-label="Copier le lien de réponse" data-testid="copier-lien-invite">
                  {copie === i.id ? <CheckCircle2 className="h-4 w-4 text-[#2F5A2A]" /> : <Copy className="h-4 w-4" />}
                </button>
                <button onClick={() => { if (window.confirm(`Supprimer ${i.nom} de la liste ?`)) supprimer(i.id); }} className="p-2 text-[#8A2E26]" aria-label="Supprimer l'invité"><Trash2 className="h-4 w-4" /></button>
              </li>
            ))}
          </ul>
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
        <p className="text-sm text-[#5C4512] bg-[#FFF7E6] border border-[#F0D9A8] rounded-2xl px-4 py-3 print:hidden" data-testid="sans-table">
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
                    <span>{i.nom}{personnes(i) > 1 ? <span className="text-[#8C6D22]"> ×{personnes(i)}</span> : null}{i.reponse === "attente" ? <span className="text-xs text-[#9A8F80]"> (en attente)</span> : null}</span>
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
    <div className="rounded-2xl border border-[#EADFC8] bg-white px-4 py-3">
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

