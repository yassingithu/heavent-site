import { useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Loader2, Plus } from "lucide-react";
import type { Compte } from "@/data/instagramIdees";
import { FETES, prochaineDate, textesFete } from "@/data/instagramFetes";

/** Ajouter une publication spéciale (fête oubliée…) : en plus du planning, ou intercalée en décalant les suivantes. */
interface PostMin { id: string; date_prevue: string | null; statut: string }

// Créneaux habituels, heure du Maroc (UTC+1) → stockés en UTC comme les posts générés
const CRENEAUX = [{ label: "11h30", h: 10, m: 30 }, { label: "20h30", h: 19, m: 30 }];
const versUTC = (jour: string, c: { h: number; m: number }) => { const d = new Date(`${jour}T00:00:00Z`); d.setUTCHours(c.h, c.m, 0, 0); return d; };
/** Créneau suivant (11h30 → 20h30 → lendemain 11h30) */
function creneauSuivant(iso: string) {
  const d = new Date(iso);
  const minutes = d.getUTCHours() * 60 + d.getUTCMinutes();
  const prochain = CRENEAUX.find((c) => c.h * 60 + c.m > minutes);
  const r = new Date(d);
  if (prochain) r.setUTCHours(prochain.h, prochain.m, 0, 0);
  else { r.setUTCDate(r.getUTCDate() + 1); r.setUTCHours(CRENEAUX[0].h, CRENEAUX[0].m, 0, 0); }
  return r.toISOString();
}
const demain = () => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().slice(0, 10); };

export default function AjouterPost({ compte, posts, famille = false, onFermer, onCree }: { compte: Compte; posts: PostMin[]; famille?: boolean; onFermer: () => void; onCree: (id: string) => void }) {
  const { toast } = useToast();
  // Par défaut : la prochaine fête à date fixe
  const [feteId, setFeteId] = useState(() => FETES.filter((f) => f.date).sort((a, b) => prochaineDate(a)!.localeCompare(prochaineDate(b)!))[0].id);
  const fete = FETES.find((f) => f.id === feteId)!;
  const [textes, setTextes] = useState(() => textesFete(fete, compte));
  const [jour, setJour] = useState(() => prochaineDate(fete) ?? demain());
  const [creneau, setCreneau] = useState(0);
  const [mode, setMode] = useState<"plus" | "intercaler">(famille ? "plus" : "intercaler");
  const [occupe, setOccupe] = useState(false);

  const choisirFete = (id: string) => {
    const f = FETES.find((x) => x.id === id)!;
    setFeteId(id); setTextes(textesFete(f, compte));
    const d = prochaineDate(f); if (d) setJour(d);
  };

  const date = versUTC(jour, CRENEAUX[creneau]).toISOString();
  // Posts non publiés à partir de ce créneau : ce sont eux qui reculent d'un cran si on intercale
  const suivants = useMemo(() => posts
    .filter((p) => p.statut !== "publie" && p.date_prevue && new Date(p.date_prevue).getTime() >= new Date(date).getTime())
    .sort((a, b) => a.date_prevue!.localeCompare(b.date_prevue!)), [posts, date]);
  const passe = new Date(date).getTime() < Date.now();

  const creer = async () => {
    if (!textes.titre.trim()) return toast({ title: "Ajoute un texte sur la photo", variant: "destructive" });
    setOccupe(true);
    try {
      if (mode === "intercaler" && suivants.length) {
        // Chaque post prend la date du suivant ; le dernier passe au créneau d'après. On part de la fin.
        const nouvelles = suivants.map((p, i) => i < suivants.length - 1 ? suivants[i + 1].date_prevue! : creneauSuivant(p.date_prevue!));
        for (let i = suivants.length - 1; i >= 0; i--) {
          const { error } = await (supabase as any).from("posts_instagram").update({ date_prevue: nouvelles[i] }).eq("id", suivants[i].id);
          if (error) throw error;
        }
      }
      const { data, error } = await (supabase as any).from("posts_instagram").insert({
        compte, theme: "fete", accroche: textes.accroche || null, titre: textes.titre, legende: textes.legende,
        recherche: textes.recherche, style: "sombre", date_prevue: date, statut: "brouillon",
      }).select("id").single();
      if (error) throw error;
      toast({ title: "Publication ajoutée ✨", description: mode === "intercaler" && suivants.length ? `${suivants.length} posts suivants décalés d'un créneau. Choisis maintenant la photo.` : "Choisis maintenant la photo." });
      onCree(data.id);
    } catch (e: any) {
      toast({ title: "Ajout impossible", description: e.message, variant: "destructive" });
    }
    setOccupe(false);
  };

  const champ = "w-full min-w-0 border border-[#DCCDAA] px-3 h-11 text-sm";
  return (
    <Dialog open onOpenChange={(o) => !o && onFermer()}>
      <DialogContent className="max-w-2xl max-h-[94vh] overflow-y-auto" data-testid="ajouter-post" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogTitle className="font-serif text-2xl font-normal" style={{ fontFamily: "var(--s-titre)" }}>Ajouter une publication</DialogTitle>
        <div className="space-y-4">
          <label className="text-sm space-y-1 block"><span className="text-muted-foreground">Occasion</span>
            <select value={feteId} onChange={(e) => choisirFete(e.target.value)} className={champ} data-testid="choix-fete">
              {FETES.map((f) => <option key={f.id} value={f.id}>{f.nom}{f.date ? ` (${f.date.split("-").reverse().join("/")})` : ""}</option>)}
            </select>
          </label>
          {!fete.date && fete.id !== "autre" && <p className="text-xs text-muted-foreground -mt-2">La date de cette fête change chaque année : choisis-la ci-dessous.</p>}

          <div className="grid sm:grid-cols-2 gap-3">
            <label className="text-sm space-y-1 block"><span className="text-muted-foreground">Jour</span>
              <input type="date" value={jour} onChange={(e) => e.target.value && setJour(e.target.value)} className={champ} data-testid="jour-post" /></label>
            <div className="text-sm space-y-1"><span className="text-muted-foreground">Heure (Maroc)</span>
              <div className="flex gap-2">
                {CRENEAUX.map((c, i) => (
                  <button key={c.label} onClick={() => setCreneau(i)} className={`flex-1 border h-11 ${creneau === i ? "bg-[#141414] text-[#FAF6EC] border-[#141414]" : "bg-white border-[#DCCDAA]"}`}>{c.label}</button>
                ))}
              </div>
            </div>
          </div>
          {passe && <p className="text-xs rounded-md bg-[#A8933F]/15 text-[#7A5F1F] px-3 py-2">Cette date est déjà passée : la publication partira dès qu'elle sera prête (au prochain passage, sous 15 min).</p>}

          {!famille && <div className="text-sm space-y-2">
            <span className="text-muted-foreground">Dans le planning</span>
            <div className="grid sm:grid-cols-2 gap-2">
              <button onClick={() => setMode("intercaler")} data-testid="mode-intercaler"
                className={`text-left rounded-xl border p-3 ${mode === "intercaler" ? "border-[#141414] ring-1 ring-[#141414]" : ""}`}>
                <div className="font-medium">Intercaler</div>
                <div className="text-xs text-muted-foreground">Elle prend ce créneau ; {suivants.length ? `les ${suivants.length} posts suivants reculent d'un cran` : "aucun post à décaler"}.</div>
              </button>
              <button onClick={() => setMode("plus")} data-testid="mode-plus"
                className={`text-left rounded-xl border p-3 ${mode === "plus" ? "border-[#141414] ring-1 ring-[#141414]" : ""}`}>
                <div className="font-medium">En plus</div>
                <div className="text-xs text-muted-foreground">Rien ne bouge{suivants[0]?.date_prevue === date ? " (deux posts partiront au même créneau)" : ""}.</div>
              </button>
            </div>
          </div>}

          <div className="grid sm:grid-cols-2 gap-3">
            <label className="text-sm space-y-1 block"><span className="text-muted-foreground">Petit texte au-dessus</span>
              <input value={textes.accroche} onChange={(e) => setTextes({ ...textes, accroche: e.target.value })} className={champ} /></label>
            <label className="text-sm space-y-1 block"><span className="text-muted-foreground">Recherche photo (anglais)</span>
              <input value={textes.recherche} onChange={(e) => setTextes({ ...textes, recherche: e.target.value })} className={champ} /></label>
          </div>
          <label className="text-sm space-y-1 block"><span className="text-muted-foreground">Texte sur la photo</span>
            <textarea value={textes.titre} onChange={(e) => setTextes({ ...textes, titre: e.target.value })} rows={2} className="w-full rounded-md border p-3 font-serif text-lg" data-testid="titre-fete" /></label>
          <label className="text-sm space-y-1 block"><span className="text-muted-foreground">Légende</span>
            <textarea value={textes.legende} onChange={(e) => setTextes({ ...textes, legende: e.target.value })} rows={7} className="w-full rounded-md border p-3 text-sm leading-relaxed" /></label>

          <div className="flex flex-wrap gap-2">
            <button onClick={creer} disabled={occupe} className="s-btn s-btn-plein s-sombre !min-h-[46px] !px-5 !text-[13px]" data-testid="creer-post-fete">
              {occupe ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Ajouter et choisir la photo
            </button>
            <button onClick={onFermer} className="rounded-full px-4 h-10 text-sm text-muted-foreground">Annuler</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
