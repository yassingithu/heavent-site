import { useCallback, useEffect, useState } from "react";
import { Copy, Loader2, MessageCircle, Plus, Trash2, ArrowLeft, BadgeCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import PersonnaliserInvitation from "@/components/invitation/PersonnaliserInvitation";
import type { InvitationReglages } from "@/lib/invitation";

interface Apercu { id: string; jeton: string; noms: string; date_evenement: string | null; lieu: string | null; message: string | null; invitation: InvitationReglages; prospect: string | null; expire_le: string; created_at: string; mode: "test" | "final"; avec_reponse: boolean }
interface Confirme { apercu_id: string; nom: string; reponse: "oui" | "non"; nb_confirmes: number; accompagnants: string[]; created_at: string }
interface Lieu { nom: string; ville: string | null; lien_maps: string | null }

const champ = "w-full rounded-xl border border-[#E3D6BA] bg-white px-3 min-h-10 text-sm";
const btn = "inline-flex items-center justify-center gap-1.5 rounded-full px-4 min-h-10 text-sm font-medium transition disabled:opacity-60";
const lien = (j: string) => `${window.location.origin}/invitation/${j}`;
const db = supabase as any;

export default function InvitationsAdmin() {
  const [liste, setListe] = useState<Apercu[] | null>(null);
  const [lieux, setLieux] = useState<Lieu[]>([]);
  const [edit, setEdit] = useState<Apercu | null>(null);
  const [envoi, setEnvoi] = useState(false);
  const [onglet, setOnglet] = useState<"apercus" | "confirmes">("apercus");
  const [confirmes, setConfirmes] = useState<Confirme[]>([]);
  const [finaliser, setFinaliser] = useState(false);
  const [choisie, setChoisie] = useState<string>("");
  const { toast: t } = useToast();
  const toast = { success: (title: string) => t({ title }), error: (title: string) => t({ title, variant: "destructive" }) };

  const charger = useCallback(async () => {
    const [a, l] = await Promise.all([
      db.from("invitations_apercu").select("*").order("created_at", { ascending: false }),
      db.from("lieux").select("nom,ville,lien_maps").eq("actif", true).order("ville").order("nom"),
    ]);
    setListe(a.data ?? []); setLieux(l.data ?? []);
    const c = await db.from("reponses_invitation").select("apercu_id,nom,reponse,nb_confirmes,accompagnants,created_at").order("created_at", { ascending: true });
    setConfirmes(c.data ?? []);
  }, []);
  useEffect(() => { charger(); }, [charger]);

  const creer = async () => {
    const { data, error } = await db.from("invitations_apercu").insert({ noms: "", invitation: { modele: "fleur-oranger" } }).select().single();
    if (error) { toast.error("Création impossible"); return; }
    setListe((l) => [data, ...(l ?? [])]); setEdit(data);
  };
  const enregistrer = async () => {
    if (!edit) return;
    if (!edit.noms.trim()) { toast.error("Saisissez les prénoms des mariés"); return; }
    setEnvoi(true);
    const { error } = await db.from("invitations_apercu").update({ noms: edit.noms.trim(), date_evenement: edit.date_evenement || null, lieu: edit.lieu?.trim() || null, message: edit.message?.trim() || null, invitation: edit.invitation, prospect: edit.prospect?.trim() || null }).eq("id", edit.id);
    setEnvoi(false);
    if (error) { toast.error("Enregistrement impossible"); return; }
    toast.success("Aperçu enregistré");
    setListe((l) => (l ?? []).map((x) => (x.id === edit.id ? edit : x)));
  };
  const supprimer = async (a: Apercu) => {
    if (!window.confirm(`Supprimer l'aperçu « ${a.noms} » ? Le lien cessera de fonctionner.`)) return;
    await db.from("invitations_apercu").delete().eq("id", a.id);
    setListe((l) => (l ?? []).filter((x) => x.id !== a.id)); if (edit?.id === a.id) setEdit(null);
  };
  const copier = async (a: Apercu) => { try { await navigator.clipboard.writeText(lien(a.jeton)); toast.success("Lien copié"); } catch { toast.error(lien(a.jeton)); } };
  const whatsapp = async (a: Apercu) => {
    if (!a.noms.trim()) { toast.error("Saisissez d'abord les prénoms des mariés"); return; }
    const fenetre = window.open("about:blank", "_blank");
    if (edit?.id === a.id) await enregistrer();
    const t = `💌 Votre invitation de mariage numérique\n\nBonjour ! Voici à quoi pourrait ressembler votre invitation, avec vos prénoms. Touchez l'enveloppe pour l'ouvrir :\n${lien(a.jeton)}\n\nLes couleurs se changent à votre goût, et vos invités répondent en un clic. — Heavent People Agency`;
    const url = `https://wa.me/?text=${encodeURIComponent(t)}`;
    if (fenetre) fenetre.location.href = url; else window.location.href = url;
  };
  const manque = (a: Apercu) => !a.noms.trim() ? "Saisissez les prénoms des mariés" : !a.date_evenement ? "Ajoutez la date avant de passer en finale" : a.date_evenement < new Date().toISOString().slice(0, 10) ? "La date est déjà passée : corrigez-la avant de passer en finale" : !a.lieu?.trim() ? "Ajoutez la salle avant de passer en finale" : null;
  const passerFinale = async () => {
    if (!edit) return;
    if (!manque(edit)) { /* ok */ } else { toast.error(manque(edit)!); setFinaliser(false); return; }
    setEnvoi(true);
    const fin = edit.date_evenement ? new Date(`${edit.date_evenement}T12:00:00`) : new Date();
    if (edit.date_evenement) fin.setDate(fin.getDate() + 30); else fin.setFullYear(fin.getFullYear() + 1);
    const { error } = await db.from("invitations_apercu").update({ noms: edit.noms.trim(), date_evenement: edit.date_evenement || null, lieu: edit.lieu?.trim() || null, message: edit.message?.trim() || null, invitation: edit.invitation, prospect: edit.prospect?.trim() || null, mode: "final", finale_le: new Date().toISOString(), expire_le: fin.toISOString() }).eq("id", edit.id);
    setEnvoi(false); setFinaliser(false);
    if (error) { toast.error("Passage en version finale impossible"); return; }
    const maj = { ...edit, mode: "final" as const, expire_le: fin.toISOString() };
    setEdit(maj); setListe((l) => (l ?? []).map((x) => (x.id === edit.id ? maj : x)));
    toast.success("Version finale prête : le filigrane a disparu");
  };
  const basculerReponses = async (a: Apercu, v: boolean) => {
    const maj = { ...a, avec_reponse: v };
    setEdit(maj); setListe((l) => (l ?? []).map((x) => (x.id === a.id ? maj : x)));
    await db.from("invitations_apercu").update({ avec_reponse: v }).eq("id", a.id);
  };
  const whatsappClient = async (a: Apercu) => {
    const fenetre = window.open("about:blank", "_blank");
    if (edit?.id === a.id) await enregistrer();
    const t = `💌 Voici votre invitation de mariage numérique, prête à envoyer à vos invités :\n${lien(a.jeton)}\n\n${a.avec_reponse ? "Vos invités peuvent y confirmer leur présence ; nous vous enverrons la liste des personnes qui ont confirmé." : "Vous pouvez l'envoyer à qui vous voulez (WhatsApp, SMS, e-mail)."}\n\nHeavent People Agency`;
    const url = `https://wa.me/?text=${encodeURIComponent(t)}`;
    if (fenetre) fenetre.location.href = url; else window.location.href = url;
  };
  const texteListe = (a: Apercu) => {
    const oui = confirmes.filter((c) => c.apercu_id === a.id && c.reponse === "oui");
    const non = confirmes.filter((c) => c.apercu_id === a.id && c.reponse === "non");
    const total = oui.reduce((n, c) => n + c.nb_confirmes, 0);
    return `✅ Invités confirmés — ${a.noms}\n${total} personne${total > 1 ? "s" : ""} (${oui.length} réponse${oui.length > 1 ? "s" : ""})\n\n${oui.map((c) => `• ${c.nom}${c.accompagnants.length ? ` + ${c.accompagnants.join(", ")}` : ""}`).join("\n") || "Aucune confirmation pour l'instant."}${non.length ? `\n\nNe viendront pas : ${non.map((c) => c.nom).join(", ")}` : ""}`;
  };
  const copierListe = async (a: Apercu) => { try { await navigator.clipboard.writeText(texteListe(a)); toast.success("Liste copiée"); } catch { toast.error("Copie impossible"); } };
  const envoyerListe = (a: Apercu) => { window.open(`https://wa.me/?text=${encodeURIComponent(texteListe(a))}`, "_blank"); };
  const choisirLieu = (nom: string) => {
    const l = lieux.find((x) => x.nom === nom);
    if (!edit) return;
    setEdit({ ...edit, lieu: l ? [l.nom, l.ville].filter(Boolean).join(", ") : edit.lieu, invitation: { ...edit.invitation, lieu_maps: l?.lien_maps ?? edit.invitation.lieu_maps } });
  };

  if (liste === null) return <div className="py-16 flex justify-center"><Loader2 className="h-6 w-6 animate-spin" /></div>;

  if (edit) {
    return (
      <div className="space-y-5" data-testid="invitation-edition">
        <button type="button" className={`${btn} border border-[#DCCBA6] bg-white`} onClick={() => setEdit(null)}><ArrowLeft className="h-4 w-4" /> Tous les aperçus</button>
        <div className="grid sm:grid-cols-2 gap-3 rounded-3xl bg-white border border-[#EADFC8] p-4">
          <label className="text-sm">Prénoms des mariés<input className={`${champ} mt-1`} value={edit.noms} placeholder="Sara & Yassine" onChange={(e) => setEdit({ ...edit, noms: e.target.value })} data-testid="apercu-noms" /></label>
          <label className="text-sm">Pour qui (note interne)<input className={`${champ} mt-1`} value={edit.prospect ?? ""} placeholder="Ex. couple rencontré au salon" onChange={(e) => setEdit({ ...edit, prospect: e.target.value })} /></label>
          <label className="text-sm">Date<input type="date" className={`${champ} mt-1`} value={edit.date_evenement ?? ""} onChange={(e) => setEdit({ ...edit, date_evenement: e.target.value })} /></label>
          <label className="text-sm">Salle (liste Heavent)
            <select className={`${champ} mt-1`} value="" onChange={(e) => choisirLieu(e.target.value)}>
              <option value="">Choisir dans les lieux…</option>
              {lieux.map((l) => <option key={l.nom + l.ville} value={l.nom}>{l.nom}{l.ville ? ` — ${l.ville}` : ""}</option>)}
            </select>
          </label>
          <label className="text-sm sm:col-span-2">Lieu affiché<input className={`${champ} mt-1`} value={edit.lieu ?? ""} onChange={(e) => setEdit({ ...edit, lieu: e.target.value })} /></label>
          <label className="text-sm sm:col-span-2">Petit mot (facultatif)<textarea rows={2} maxLength={300} className={`${champ} mt-1 py-2`} value={edit.message ?? ""} onChange={(e) => setEdit({ ...edit, message: e.target.value })} /></label>
        </div>
        <div className="rounded-3xl bg-white border border-[#EADFC8] p-4 sm:p-6">
          <PersonnaliserInvitation estAdmin noms={edit.noms || "Prénom & Prénom"} date={edit.date_evenement} lieu={edit.lieu} message={edit.message} valeur={edit.invitation} onChange={(v) => setEdit({ ...edit, invitation: v })} />
        </div>
        <div className="rounded-3xl bg-white border border-[#EADFC8] p-4 space-y-3" data-testid="invitation-etat">
          <p className="text-sm flex items-center gap-2">{edit.mode === "final" ? <><BadgeCheck className="h-4 w-4 text-[#1F5A4C]" /> <b>Version finale</b> : sans filigrane, le lien peut être utilisé par le client.</> : <><b>Version test</b> : un filigrane « Aperçu » recouvre la page, la réponse est une démonstration.</>}</p>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={edit.avec_reponse} onChange={(e) => basculerReponses(edit, e.target.checked)} data-testid="avec-reponse" /> Les invités confirment leur présence sur la carte <span className="text-[#6B6154]">(décochez si le client envoie la carte sans réponse)</span></label>
        </div>
        <div className="flex flex-wrap gap-2 sticky bottom-3">
          <button type="button" className={`${btn} bg-[#141414] text-white`} onClick={enregistrer} disabled={envoi} data-testid="apercu-enregistrer">{envoi && <Loader2 className="h-4 w-4 animate-spin" />} Enregistrer</button>
          <button type="button" className={`${btn} border border-[#DCCBA6] bg-white`} onClick={() => copier(edit)}><Copy className="h-4 w-4" /> Copier le lien</button>
          {edit.mode === "test" ? (<>
            <button type="button" className={`${btn} border border-[#DCCBA6] bg-white`} onClick={() => whatsapp(edit)}><MessageCircle className="h-4 w-4" /> Envoyer le test par WhatsApp</button>
            {finaliser ? (
              <span className="flex flex-wrap items-center gap-x-3 gap-y-1 bg-[#141414] text-[#FBF6E9] border-t border-[#A8933F] px-4 py-2 text-sm max-w-xl">Le lien déjà envoyé deviendra la vraie carte ({new Date(`${edit.date_evenement}T12:00:00`).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} · {edit.lieu}). Réponses des invités : {edit.avec_reponse ? "activées" : "désactivées"}. Retour au test impossible. <button type="button" className="font-semibold rounded bg-[#E4D49A] text-[#141414] px-3 min-h-10" onClick={passerFinale} disabled={envoi} data-testid="finale-confirmer">Oui, version finale</button> <button type="button" className="underline min-h-10" onClick={() => setFinaliser(false)}>Annuler</button></span>
            ) : <button type="button" className={`${btn} bg-[#B8923A] text-[#141414] hover:bg-[#C9A44A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141414]`} onClick={() => { const m = manque(edit); if (m) toast.error(m); else setFinaliser(true); }} data-testid="finale-passer"><BadgeCheck className="h-4 w-4" /> Passer en version finale</button>}
          </>) : (
            <button type="button" className={`${btn} bg-[#B8923A] text-[#141414] hover:bg-[#C9A44A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141414]`} onClick={() => whatsappClient(edit)} data-testid="finale-envoyer"><MessageCircle className="h-4 w-4" /> Envoyer la version finale au client</button>
          )}
        </div>
      </div>
    );
  }

  const finales = liste.filter((a) => a.mode === "final" && a.avec_reponse);
  return (
    <div className="space-y-4" data-testid="invitations-admin">
      <div className="flex gap-2" role="tablist">
        {([["apercus", "Aperçus et cartes"], ["confirmes", `Confirmés${finales.length ? ` (${confirmes.filter((c) => c.reponse === "oui").length})` : ""}`]] as const).map(([k, l]) => (
          <button key={k} type="button" role="tab" aria-selected={onglet === k} onClick={() => setOnglet(k)} data-testid={`onglet-${k}`} className={`${btn} border ${onglet === k ? "bg-[#141414] text-white border-[#141414]" : "bg-white border-[#DCCBA6]"}`}>{l}</button>
        ))}
      </div>
      {onglet === "confirmes" ? (
        <div className="space-y-3" data-testid="invitations-confirmes">
          {finales.length === 0 && <p className="text-sm text-[#5E554A] text-center py-10">Aucune carte finale avec réponses pour le moment. Passez un aperçu en « version finale » pour recevoir les confirmations ici.</p>}
          {finales.length > 0 && (() => {
            const a = finales.find((x) => x.id === choisie) ?? finales[0];
            const oui = confirmes.filter((c) => c.apercu_id === a.id && c.reponse === "oui");
            const non = confirmes.filter((c) => c.apercu_id === a.id && c.reponse === "non");
            const total = oui.reduce((n, c) => n + c.nb_confirmes, 0);
            return (<>
              <label className="block text-sm">Carte d'invitation
                <select className={`${champ} mt-1`} value={a.id} onChange={(e) => setChoisie(e.target.value)} data-testid="choix-carte">
                  {finales.map((x) => { const n = confirmes.filter((c) => c.apercu_id === x.id && c.reponse === "oui").reduce((s, c) => s + c.nb_confirmes, 0); return <option key={x.id} value={x.id}>{x.noms}{x.date_evenement ? ` · ${new Date(`${x.date_evenement}T12:00:00`).toLocaleDateString("fr-FR")}` : ""} — {n} confirmé{n > 1 ? "s" : ""}</option>; })}
                </select>
              </label>
              <section className="rounded-3xl bg-white border border-[#EADFC8] p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div><h3 className="font-serif text-lg">{a.noms}</h3><p className="text-xs text-[#6B6154]">{total} personne{total > 1 ? "s" : ""} confirmée{total > 1 ? "s" : ""} · {non.length} absent{non.length > 1 ? "s" : ""}</p></div>
                  <div className="flex gap-1.5">
                    <button type="button" className={`${btn} border border-[#DCCBA6] bg-white`} onClick={() => copierListe(a)}><Copy className="h-4 w-4" /> Copier la liste</button>
                    <button type="button" className={`${btn} bg-[#141414] text-white`} onClick={() => envoyerListe(a)}><MessageCircle className="h-4 w-4" /> Envoyer au client</button>
                  </div>
                </div>
                {oui.length === 0 ? <p className="text-sm text-[#5E554A] mt-3">Personne n'a encore confirmé.</p> : (
                  <ul className="divide-y divide-[#EFE6D2] text-sm mt-2">
                    {oui.map((c, i) => <li key={i} className="py-2"><b>{c.nom}</b>{c.accompagnants.length ? <span className="text-[#6B6154]"> + {c.accompagnants.join(", ")}</span> : null}</li>)}
                  </ul>
                )}
                {non.length > 0 && <p className="text-sm text-[#6B6154] mt-3">Ne viendront pas : {non.map((c) => c.nom).join(", ")}</p>}
              </section>
            </>);
          })()}
        </div>
      ) : (<>
      <div className="rounded-3xl bg-white border border-[#EADFC8] p-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[#5E554A] max-w-xl">Créez en 1 minute un aperçu avec les prénoms d'un couple et envoyez-lui le lien : l'enveloppe s'ouvre, la salle s'affiche sur Google Maps. Les aperçus restent valables 30 jours ; une carte finale reste valable jusqu'à 30 jours après le mariage. Pour un couple client, l'invitation se règle dans son espace mariés (onglet « Mon invitation »).</p>
        <button type="button" className={`${btn} bg-[#141414] text-white`} onClick={creer} data-testid="apercu-nouveau"><Plus className="h-4 w-4" /> Nouvel aperçu</button>
      </div>
      {liste.length === 0 && <p className="text-sm text-[#5E554A] text-center py-10">Aucun aperçu pour le moment.</p>}
      <ul className="space-y-2">
        {liste.map((a) => (
          <li key={a.id} className="rounded-2xl bg-white border border-[#EADFC8] p-3 flex flex-wrap items-center gap-2 justify-between">
            <button type="button" className="text-left min-w-0 flex-1" onClick={() => setEdit(a)}>
              <span className="block font-medium truncate">{a.noms} <span className={`ml-1 align-middle text-[10px] uppercase tracking-widest rounded-full px-2 py-0.5 ${a.mode === "final" ? "bg-[#E6F2EC] text-[#1F5A4C]" : "bg-[#F4ECD8] text-[#7A5A12]"}`}>{a.mode === "final" ? "Finale" : "Test"}</span></span>
              <span className="block text-xs text-[#6B6154] truncate">{[a.prospect, a.lieu, `${a.mode === "final" ? "valable jusqu'au" : "expire le"} ${new Date(a.expire_le).toLocaleDateString("fr-FR")}`].filter(Boolean).join(" · ")}</span>
            </button>
            <div className="w-full flex flex-wrap items-center gap-2 text-xs">
              <label className="inline-flex items-center gap-1.5 rounded-full border border-[#DCCBA6] bg-white px-3 min-h-9 cursor-pointer"><input type="checkbox" checked={a.avec_reponse} onChange={(e) => basculerReponses(a, e.target.checked)} data-testid="liste-avec-reponse" /> {a.avec_reponse ? "Demande de confirmation" : "Sans confirmation"}</label>
              {a.mode === "final" && a.avec_reponse && <button type="button" className="rounded-full bg-[#E4D49A] text-[#141414] px-3 min-h-9 font-medium" onClick={() => { setChoisie(a.id); setOnglet("confirmes"); }}>{confirmes.filter((c) => c.apercu_id === a.id && c.reponse === "oui").reduce((s, c) => s + c.nb_confirmes, 0)} confirmé(s) →</button>}
            </div>
            <div className="flex gap-1.5">
              <button type="button" className={`${btn} border border-[#DCCBA6] bg-white`} onClick={() => copier(a)} aria-label="Copier le lien"><Copy className="h-4 w-4" /></button>
              <button type="button" className={`${btn} border border-[#DCCBA6] bg-white`} onClick={() => whatsapp(a)} aria-label="Envoyer par WhatsApp"><MessageCircle className="h-4 w-4" /></button>
              <button type="button" className={`${btn} border border-[#DCCBA6] bg-white text-[#9B2C23]`} onClick={() => supprimer(a)} aria-label="Supprimer"><Trash2 className="h-4 w-4" /></button>
            </div>
          </li>
        ))}
      </ul>
      </>)}
    </div>
  );
}
