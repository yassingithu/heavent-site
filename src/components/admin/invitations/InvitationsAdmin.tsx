import { useCallback, useEffect, useState } from "react";
import { Copy, Loader2, MessageCircle, Plus, Trash2, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import PersonnaliserInvitation from "@/components/invitation/PersonnaliserInvitation";
import type { InvitationReglages } from "@/lib/invitation";

interface Apercu { id: string; jeton: string; noms: string; date_evenement: string | null; lieu: string | null; message: string | null; invitation: InvitationReglages; prospect: string | null; expire_le: string; created_at: string }
interface Reponse { nom: string; reponse: string; nb_confirmes: number | null; repondu_le: string; couple: string }
interface Lieu { nom: string; ville: string | null; lien_maps: string | null }

const champ = "w-full rounded-xl border border-[#E3D6BA] bg-white px-3 min-h-10 text-sm";
const btn = "inline-flex items-center justify-center gap-1.5 rounded-full px-4 min-h-10 text-sm font-medium transition disabled:opacity-60";
const lien = (j: string) => `${window.location.origin}/invitation/${j}`;
const db = supabase as any;

export default function InvitationsAdmin() {
  const [liste, setListe] = useState<Apercu[] | null>(null);
  const [lieux, setLieux] = useState<Lieu[]>([]);
  const [reponses, setReponses] = useState<Reponse[]>([]);
  const [edit, setEdit] = useState<Apercu | null>(null);
  const [envoi, setEnvoi] = useState(false);
  const { toast: t } = useToast();
  const toast = { success: (title: string) => t({ title }), error: (title: string) => t({ title, variant: "destructive" }) };

  const charger = useCallback(async () => {
    const [a, l] = await Promise.all([
      db.from("invitations_apercu").select("*").order("created_at", { ascending: false }),
      db.from("lieux").select("nom,ville,lien_maps").eq("actif", true).order("ville").order("nom"),
    ]);
    setListe(a.data ?? []); setLieux(l.data ?? []);
    const r = await db.from("invites_mariage").select("nom,reponse,nb_confirmes,repondu_le,devis_id").not("repondu_le", "is", null).order("repondu_le", { ascending: false }).limit(15);
    const ids = [...new Set((r.data ?? []).map((x: any) => x.devis_id))];
    const dv = ids.length ? await db.from("devis").select("id,client_nom").in("id", ids) : { data: [] };
    const noms: Record<string, string> = Object.fromEntries((dv.data ?? []).map((x: any) => [x.id, x.client_nom]));
    setReponses((r.data ?? []).map((x: any) => ({ nom: x.nom, reponse: x.reponse, nb_confirmes: x.nb_confirmes, repondu_le: x.repondu_le, couple: noms[x.devis_id] ?? "" })));
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
    const t = `Bonjour ! Voici à quoi pourrait ressembler votre invitation de mariage numérique, avec vos prénoms. Touchez l'enveloppe pour l'ouvrir :\n${lien(a.jeton)}\n\nLes couleurs se changent à votre goût, et vos invités répondent en un clic. — Heavent People Agency`;
    const url = `https://wa.me/?text=${encodeURIComponent(t)}`;
    if (fenetre) fenetre.location.href = url; else window.location.href = url;
  };
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
          <PersonnaliserInvitation noms={edit.noms || "Prénom & Prénom"} date={edit.date_evenement} lieu={edit.lieu} message={edit.message} valeur={edit.invitation} onChange={(v) => setEdit({ ...edit, invitation: v })} />
        </div>
        <div className="flex flex-wrap gap-2 sticky bottom-3">
          <button type="button" className={`${btn} bg-[#141414] text-white`} onClick={enregistrer} disabled={envoi} data-testid="apercu-enregistrer">{envoi && <Loader2 className="h-4 w-4 animate-spin" />} Enregistrer</button>
          <button type="button" className={`${btn} border border-[#DCCBA6] bg-white`} onClick={() => copier(edit)}><Copy className="h-4 w-4" /> Copier le lien</button>
          <button type="button" className={`${btn} border border-[#DCCBA6] bg-white`} onClick={() => whatsapp(edit)}><MessageCircle className="h-4 w-4" /> Envoyer par WhatsApp</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4" data-testid="invitations-admin">
      <div className="rounded-3xl bg-white border border-[#EADFC8] p-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[#5E554A] max-w-xl">Créez en 1 minute un aperçu avec les prénoms d'un couple et envoyez-lui le lien : l'enveloppe s'ouvre, la salle s'affiche sur Google Maps. Les liens restent valables 30 jours. Pour un couple client, l'invitation se règle dans son espace mariés (onglet « Mon invitation »).</p>
        <button type="button" className={`${btn} bg-[#141414] text-white`} onClick={creer} data-testid="apercu-nouveau"><Plus className="h-4 w-4" /> Nouvel aperçu</button>
      </div>
      {liste.length === 0 && <p className="text-sm text-[#5E554A] text-center py-10">Aucun aperçu pour le moment.</p>}
      <section className="rounded-3xl bg-white border border-[#EADFC8] p-4" data-testid="dernieres-reponses">
        <h3 className="font-serif text-lg mb-2">Dernières réponses des invités</h3>
        {reponses.length === 0 ? <p className="text-sm text-[#5E554A]">Aucune réponse pour l'instant.</p> : (
          <ul className="divide-y divide-[#EFE6D2] text-sm">
            {reponses.map((r, i) => (
              <li key={i} className="py-2 flex flex-wrap items-center justify-between gap-x-3">
                <span><b>{r.nom}</b> <span className="text-[#6B6154]">· {r.couple}</span></span>
                <span className={r.reponse === "oui" ? "text-[#1F5A4C]" : "text-[#9B2C23]"}>{r.reponse === "oui" ? `Présent${(r.nb_confirmes ?? 1) > 1 ? ` (${r.nb_confirmes})` : ""}` : "Absent"} · {new Date(r.repondu_le).toLocaleString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
      <ul className="space-y-2">
        {liste.map((a) => (
          <li key={a.id} className="rounded-2xl bg-white border border-[#EADFC8] p-3 flex flex-wrap items-center gap-2 justify-between">
            <button type="button" className="text-left min-w-0 flex-1" onClick={() => setEdit(a)}>
              <span className="block font-medium truncate">{a.noms}</span>
              <span className="block text-xs text-[#6B6154] truncate">{[a.prospect, a.lieu, `expire le ${new Date(a.expire_le).toLocaleDateString("fr-FR")}`].filter(Boolean).join(" · ")}</span>
            </button>
            <div className="flex gap-1.5">
              <button type="button" className={`${btn} border border-[#DCCBA6] bg-white`} onClick={() => copier(a)} aria-label="Copier le lien"><Copy className="h-4 w-4" /></button>
              <button type="button" className={`${btn} border border-[#DCCBA6] bg-white`} onClick={() => whatsapp(a)} aria-label="Envoyer par WhatsApp"><MessageCircle className="h-4 w-4" /></button>
              <button type="button" className={`${btn} border border-[#DCCBA6] bg-white text-[#9B2C23]`} onClick={() => supprimer(a)} aria-label="Supprimer"><Trash2 className="h-4 w-4" /></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
