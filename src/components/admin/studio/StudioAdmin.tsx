import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Check, Copy, Eye, ImagePlus, Loader2, Mail, MessageCircle, Plus, RefreshCw, Sparkles, Trash2 } from "lucide-react";
import { SECTEURS } from "@/demo/secteurs";

/** Heavent Studio : demandes de démo reçues depuis /studio, et démos personnalisées à partager en un clic. */
interface Demande { id: string; cree_le: string; nom: string; agence: string; email: string; telephone: string | null; ville: string | null; formule: string | null; message: string | null; statut: string; notes: string | null; secteur: string | null; logo_url: string | null }
interface Demo { jeton: string; demande_id: string | null; agence: string; prenom: string | null; ville: string | null; cree_le: string; expire_le: string; active: boolean; vues: number; derniere_vue: string | null; secteur: string; logo_url: string | null }
interface Choix { secteur: string; logo: File | null }

const STATUTS: Record<string, string> = { nouvelle: "Nouvelle", demo_envoyee: "Démo envoyée", en_discussion: "En discussion", client: "Client 🎉", sans_suite: "Sans suite" };
const lienDemo = (j: string) => `https://heaventagency.com/studio/demo/${j}`;
const dateFr = (d: string) => new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
const prenomDe = (nom: string) => nom.trim().split(/\s+/)[0] ?? "";
const message = (d: Demo) => `Bonjour${d.prenom ? " " + d.prenom : ""},\n\nComme promis, voici votre démo personnalisée de Heavent Studio pour ${d.agence} : ${lienDemo(d.jeton)}\n\nTout y est fictif : vous pouvez créer un devis, regarder les statistiques, l'agenda, l'équipe… sans rien casser. Le lien est valable 30 jours.\n\nJe reste disponible pour en parler quand vous voulez.\n\nHeavent Studio`;

export default function StudioAdmin() {
  const { toast } = useToast();
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [demos, setDemos] = useState<Demo[]>([]);
  const [charge, setCharge] = useState(true);
  const [occupe, setOccupe] = useState<string | null>(null);
  const [libre, setLibre] = useState({ agence: "", prenom: "", ville: "" });
  const [choix, setChoix] = useState<Record<string, Choix>>({});
  const choixDe = (id: string, defaut?: string | null): Choix => choix[id] ?? { secteur: defaut || "evenementiel", logo: null };
  const changerChoix = (id: string, c: Partial<Choix>, defaut?: string | null) => setChoix((x) => ({ ...x, [id]: { ...choixDe(id, defaut), ...c } }));

  const charger = async () => {
    setCharge(true);
    const [a, b] = await Promise.all([
      (supabase as any).from("studio_demandes").select("*").order("cree_le", { ascending: false }),
      (supabase as any).from("studio_demos").select("*").order("cree_le", { ascending: false }),
    ]);
    setDemandes(a.data ?? []); setDemos(b.data ?? []); setCharge(false);
  };
  useEffect(() => { charger(); }, []);

  const generer = async (src: { demande_id?: string | null; agence: string; prenom?: string | null; ville?: string | null; logo_url?: string | null }) => {
    const id = src.demande_id ?? "libre";
    const c = choixDe(id, demandes.find((d) => d.id === src.demande_id)?.secteur);
    setOccupe(id);
    // Logo choisi ici (sinon celui envoyé par le prospect)
    let logo = src.logo_url ?? null;
    if (c.logo) {
      const chemin = `studio/logos/${crypto.randomUUID?.() ?? Date.now()}.${(c.logo.name.split(".").pop() || "png").toLowerCase().replace(/[^a-z]/g, "") || "png"}`;
      const { error: e } = await supabase.storage.from("assets").upload(chemin, c.logo, { contentType: c.logo.type || "image/png" });
      if (!e) logo = supabase.storage.from("assets").getPublicUrl(chemin).data.publicUrl;
    }
    const { data, error } = await (supabase as any).from("studio_demos").insert({ demande_id: src.demande_id ?? null, agence: src.agence.trim(), prenom: src.prenom?.trim() || null, ville: src.ville?.trim() || null, secteur: c.secteur, logo_url: logo }).select().single();
    if (!error && src.demande_id) await (supabase as any).from("studio_demandes").update({ statut: "demo_envoyee" }).eq("id", src.demande_id).eq("statut", "nouvelle");
    setOccupe(null);
    if (error) return toast({ title: "Démo non créée", description: error.message, variant: "destructive" });
    await navigator.clipboard?.writeText(lienDemo(data.jeton)).catch(() => {});
    toast({ title: "Démo prête ✨", description: "Le lien est copié : il ne reste qu'à le partager." });
    setLibre({ agence: "", prenom: "", ville: "" }); setChoix((x) => { const y = { ...x }; delete y[id]; return y; });
    charger();
  };
  const copier = async (t: string, quoi = "Lien copié ✓") => { await navigator.clipboard?.writeText(t).catch(() => {}); toast({ title: quoi }); };
  const changerStatut = async (id: string, statut: string) => { await (supabase as any).from("studio_demandes").update({ statut }).eq("id", id); setDemandes((l) => l.map((d) => (d.id === id ? { ...d, statut } : d))); };
  const desactiver = async (j: string) => { await (supabase as any).from("studio_demos").update({ active: false }).eq("jeton", j); charger(); };
  const supprimer = async (j: string) => {
    const d = demos.find((x) => x.jeton === j);
    if (!window.confirm(`Supprimer définitivement la démo « ${d?.agence ?? ""} » ? Son lien cessera de fonctionner. La demande du prospect est conservée.`)) return;
    const { error } = await (supabase as any).from("studio_demos").delete().eq("jeton", j);
    if (error) { toast({ title: "Suppression impossible", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Démo supprimée" }); charger();
  };
  const prolonger = async (j: string) => { await (supabase as any).from("studio_demos").update({ active: true, expire_le: new Date(Date.now() + 30 * 864e5).toISOString() }).eq("jeton", j); charger(); };

  // « Voir » ouvre la démo dans le navigateur (Safari, Chrome…), exactement comme le lien envoyé au prospect.
  // Dans l'appli installée, c'est la seule façon fiable : l'aperçu intégré la renvoyait vers la connexion.
  const voir = (d: Demo) => { window.open(`/studio/demo/${d.jeton}?apercu`, "_blank", "noopener"); };
  const demosDe = (id: string) => demos.filter((d) => d.demande_id === id);

  return (
    <div className="space-y-5" data-testid="studio-admin">
      <section className="rounded-2xl border border-[#EADFC8] bg-white p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-serif text-xl">Demandes de démo</h3>
          <button onClick={charger} className="text-xs text-muted-foreground inline-flex items-center gap-1"><RefreshCw className="h-3 w-3" /> Actualiser</button>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Reçues depuis la page <a href="/studio" target="_blank" rel="noreferrer" className="underline">heaventagency.com/studio</a>. Un clic sur « Générer la démo » crée une administration fictive au nom de l'agence, et copie le lien à partager.</p>
        {charge ? <Loader2 className="h-5 w-5 animate-spin mt-4 text-[#A8933F]" /> : demandes.length === 0 ? <p className="text-sm text-muted-foreground mt-4">Aucune demande pour l'instant.</p> : (
          <div className="mt-4 space-y-3">
            {demandes.map((d) => (
              <div key={d.id} className="rounded-xl border border-[#F1ECDD] p-3 sm:p-4" data-testid="studio-demande">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="font-medium">{d.agence} <span className="text-muted-foreground font-normal">· {d.nom}{d.ville ? ` · ${d.ville}` : ""}</span></div>
                    <div className="text-xs text-muted-foreground mt-0.5">{dateFr(d.cree_le)} · {d.email}{d.telephone ? ` · ${d.telephone}` : ""}{d.formule ? ` · formule ${d.formule}` : ""}</div>
                  </div>
                  <select value={d.statut} onChange={(e) => changerStatut(d.id, e.target.value)} className="rounded-md border px-2 h-8 text-xs bg-white">
                    {Object.entries(STATUTS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
                {d.message && <p className="text-sm mt-2 whitespace-pre-line text-[#4a4239]">{d.message}</p>}
                <div className="flex flex-wrap gap-2 mt-3">
                  <OptionsDemo c={choixDe(d.id, d.secteur)} logoProspect={d.logo_url} onChange={(c) => changerChoix(d.id, c, d.secteur)} />
                  <button onClick={() => generer({ demande_id: d.id, agence: d.agence, prenom: prenomDe(d.nom), ville: d.ville, logo_url: d.logo_url })} disabled={occupe === d.id}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#141414] text-white px-4 h-9 text-sm" data-testid="generer-demo">
                    {occupe === d.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4 text-[#E4D49A]" />} {demosDe(d.id).length ? "Nouvelle démo" : "Générer la démo"}
                  </button>
                  {d.telephone && <a href={`https://wa.me/${d.telephone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border px-4 h-9 text-sm"><MessageCircle className="h-4 w-4 text-emerald-600" /> WhatsApp</a>}
                  <a href={`mailto:${d.email}?subject=${encodeURIComponent("Votre démo Heavent Studio")}`} className="inline-flex items-center gap-1.5 rounded-full border px-4 h-9 text-sm"><Mail className="h-4 w-4" /> E-mail</a>
                </div>
                {demosDe(d.id).map((x) => <LigneDemo key={x.jeton} d={x} tel={d.telephone} email={d.email} onCopier={copier} onDesactiver={desactiver} onProlonger={prolonger} onVoir={voir} onSupprimer={supprimer} />)}
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-[#EADFC8] bg-white p-4 sm:p-5">
        <h3 className="font-serif text-xl">Démo pour un prospect rencontré ailleurs</h3>
        <p className="text-sm text-muted-foreground mt-1">Salon, appel, recommandation : indiquez simplement le nom de l'agence.</p>
        <div className="grid sm:grid-cols-[1fr_1fr_1fr_auto] gap-2 mt-3 items-center">
          <input value={libre.agence} onChange={(e) => setLibre({ ...libre, agence: e.target.value })} placeholder="Nom de l'agence *" className="rounded-md border px-3 h-10 text-sm" data-testid="demo-libre-agence" />
          <input value={libre.prenom} onChange={(e) => setLibre({ ...libre, prenom: e.target.value })} placeholder="Prénom du contact" className="rounded-md border px-3 h-10 text-sm" />
          <input value={libre.ville} onChange={(e) => setLibre({ ...libre, ville: e.target.value })} placeholder="Ville" className="rounded-md border px-3 h-10 text-sm" />
          <div className="sm:col-span-4"><OptionsDemo c={choixDe("libre")} onChange={(c) => changerChoix("libre", c)} /></div>
          <button onClick={() => generer(libre)} disabled={libre.agence.trim().length < 2 || occupe === "libre"} className="inline-flex items-center justify-center gap-1.5 rounded-md bg-[#141414] text-white px-4 h-10 text-sm disabled:opacity-50" data-testid="demo-libre-generer">
            {occupe === "libre" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Générer
          </button>
        </div>
        {demos.filter((d) => !d.demande_id).map((x) => <LigneDemo key={x.jeton} d={x} onCopier={copier} onDesactiver={desactiver} onProlonger={prolonger} onVoir={voir} onSupprimer={supprimer} />)}
      </section>
    </div>
  );
}

function LigneDemo({ d, tel, email, onCopier, onDesactiver, onProlonger, onVoir, onSupprimer }: {
  d: Demo; tel?: string | null; email?: string; onCopier: (t: string, q?: string) => void; onDesactiver: (j: string) => void; onProlonger: (j: string) => void; onVoir: (d: Demo) => void; onSupprimer: (j: string) => void;
}) {
  const expiree = !d.active || new Date(d.expire_le) < new Date();
  const lien = lienDemo(d.jeton);
  return (
    <div className={`mt-3 rounded-lg px-3 py-2.5 text-sm ${expiree ? "bg-muted/50 text-muted-foreground" : "bg-[#FBF8F1]"}`} data-testid="ligne-demo">
      <div className="flex flex-wrap items-center gap-2">
        {d.logo_url && <img src={d.logo_url} alt="" className="h-6 w-auto max-w-16 object-contain" />}
        <span className="font-medium">{d.agence}</span>
        <span className="text-[11px] rounded-full bg-white border px-2 py-0.5 text-[#8C6D22]">{SECTEURS[d.secteur as keyof typeof SECTEURS]?.nom ?? "Agence événementielle"}</span>
        <span className="text-xs text-muted-foreground">créée le {dateFr(d.cree_le)} · {expiree ? "expirée" : `jusqu'au ${dateFr(d.expire_le)}`}</span>
        <span className="text-xs inline-flex items-center gap-1 ml-auto"><Eye className="h-3.5 w-3.5" /> {d.vues ? `ouverte ${d.vues} fois${d.derniere_vue ? `, dernière le ${dateFr(d.derniere_vue)}` : ""}` : "pas encore ouverte"}</span>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        <code className="flex-1 min-w-0 truncate rounded bg-white border px-2 py-1 text-xs" data-testid="lien-demo">{lien}</code>
        <button onClick={() => onCopier(lien)} className="inline-flex items-center gap-1 rounded-md border bg-white px-2 h-7 text-xs"><Copy className="h-3.5 w-3.5" /> Lien</button>
        <button onClick={() => onCopier(message(d), "Message copié ✓")} className="inline-flex items-center gap-1 rounded-md border bg-white px-2 h-7 text-xs"><Copy className="h-3.5 w-3.5" /> Message</button>
        {tel && <a href={`https://wa.me/${tel.replace(/\D/g, "")}?text=${encodeURIComponent(message(d))}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-md border bg-white px-2 h-7 text-xs"><MessageCircle className="h-3.5 w-3.5 text-emerald-600" /> Envoyer</a>}
        {email && <a href={`mailto:${email}?subject=${encodeURIComponent("Votre démo Heavent Studio")}&body=${encodeURIComponent(message(d))}`} className="inline-flex items-center gap-1 rounded-md border bg-white px-2 h-7 text-xs"><Mail className="h-3.5 w-3.5" /> E-mail</a>}
        <button onClick={() => onVoir(d)} className="inline-flex items-center gap-1 rounded-md border bg-white px-2 h-7 text-xs" data-testid="voir-demo"><Eye className="h-3.5 w-3.5" /> Voir</button>
        {expiree ? <button onClick={() => onProlonger(d.jeton)} className="inline-flex items-center gap-1 rounded-md border bg-white px-2 h-7 text-xs"><Check className="h-3.5 w-3.5" /> Réactiver 30 jours</button>
          : <button onClick={() => onDesactiver(d.jeton)} className="rounded-md px-2 h-7 text-xs text-muted-foreground hover:text-red-700">Désactiver</button>}
        <button onClick={() => onSupprimer(d.jeton)} className="inline-flex items-center gap-1 rounded-md px-2 h-7 text-xs text-red-700 hover:bg-red-50" data-testid="supprimer-demo"><Trash2 className="h-3.5 w-3.5" /> Supprimer</button>
      </div>
    </div>
  );
}

/** Métier de la démo et logo de l'agence du prospect */
function OptionsDemo({ c, logoProspect, onChange }: { c: Choix; logoProspect?: string | null; onChange: (c: Partial<Choix>) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <select value={c.secteur} onChange={(e) => onChange({ secteur: e.target.value })} className="rounded-full border px-3 h-9 text-sm bg-white" data-testid="choix-secteur" aria-label="Métier">
        {Object.entries(SECTEURS).map(([k, v]) => <option key={k} value={k}>{v.nom}</option>)}
      </select>
      <label className="inline-flex items-center gap-1.5 rounded-full border px-3 h-9 text-sm cursor-pointer bg-white" data-testid="choix-logo">
        <input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f && f.size <= 5 * 1024 * 1024) onChange({ logo: f }); }} />
        {c.logo ? <><Check className="h-3.5 w-3.5 text-emerald-600" /> {c.logo.name.slice(0, 18)}</> : logoProspect ? <><img src={logoProspect} alt="" className="h-5 w-auto max-w-10 object-contain" /> Logo reçu</> : <><ImagePlus className="h-3.5 w-3.5" /> Logo</>}
      </label>
    </div>
  );
}
