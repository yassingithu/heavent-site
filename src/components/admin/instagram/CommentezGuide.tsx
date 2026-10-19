import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Check, Copy, MessageCircle, RefreshCw } from "lucide-react";

/** « Commentez GUIDE » : réglages du webhook Meta et suivi des messages privés envoyés automatiquement. */
const URL_WEBHOOK = "https://mapiwnsjsluiwmnulhqk.supabase.co/functions/v1/instagram-webhook";
interface Commentaire { commentaire_id: string; auteur: string | null; texte: string | null; guide_slug: string | null; statut: string; erreur: string | null; cree_le: string }
const STATUTS: Record<string, [string, string]> = {
  envoye: ["Guide envoyé", "text-emerald-700"], ignore: ["Déjà reçu aujourd'hui", "text-muted-foreground"],
  erreur: ["Erreur", "text-red-700"], recu: ["Reçu", "text-muted-foreground"],
};

export default function CommentezGuide({ reglages, onChange }: {
  reglages: { instagram: boolean; secret_app?: boolean; webhook_jeton?: string | null; abonne_le?: string | null }; onChange: () => void;
}) {
  const { toast } = useToast();
  const [secret, setSecret] = useState("");
  const [liste, setListe] = useState<Commentaire[]>([]);
  const [occupe, setOccupe] = useState(false);

  const charger = () => (supabase as any).from("instagram_commentaires").select("*").order("cree_le", { ascending: false }).limit(20).then(({ data }: any) => setListe(data ?? []));
  useEffect(() => { charger(); }, []);

  const copier = async (t: string) => { await navigator.clipboard.writeText(t).catch(() => {}); toast({ title: "Copié ✓" }); };
  const enregistrerSecret = async () => {
    const { error } = await (supabase as any).rpc("instagram_enregistrer_cle", { p_nom: "instagram_secret_app", p_valeur: secret });
    if (error) return toast({ title: "Non enregistrée", description: error.message, variant: "destructive" });
    setSecret(""); toast({ title: "Clé secrète enregistrée ✓" }); onChange();
  };
  const activer = async () => {
    setOccupe(true);
    const { error } = await supabase.functions.invoke("instagram-publier", { body: { action: "abonner" } });
    setOccupe(false);
    if (error) { let m = error.message; try { m = (await (error as any).context?.json())?.error ?? m; } catch { /* rien */ } return toast({ title: "Activation impossible", description: m, variant: "destructive" }); }
    toast({ title: "« Commentez GUIDE » activé ✓" }); onChange();
  };

  return (
    <section className="rounded-2xl border border-[#EADFC8] bg-white p-4 space-y-3" data-testid="commentez-guide">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-medium flex items-center gap-2"><MessageCircle className="h-4 w-4 text-[#A8933F]" /> « Commentez GUIDE » → message privé automatique</h3>
        {reglages.abonne_le ? <span className="text-xs text-emerald-700 flex items-center gap-1"><Check className="h-3.5 w-3.5" /> Actif sur le compte</span>
          : reglages.instagram && <button onClick={activer} disabled={occupe} className="rounded-full bg-[#141414] text-white px-4 h-9 text-sm">{occupe ? "…" : "Activer sur le compte"}</button>}
      </div>
      <details className="text-sm">
        <summary className="cursor-pointer text-muted-foreground">Réglages à coller dans Meta (Webhooks)</summary>
        <div className="mt-2 space-y-2">
          <Ligne libelle="URL de rappel" valeur={URL_WEBHOOK} onCopier={copier} />
          {reglages.webhook_jeton && <Ligne libelle="Vérifier le token" valeur={reglages.webhook_jeton} onCopier={copier} />}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground w-32 shrink-0">Clé secrète de l'app</span>
            {reglages.secret_app ? <span className="text-xs text-emerald-700 flex items-center gap-1"><Check className="h-3.5 w-3.5" /> enregistrée</span> : (
              <>
                <input type="password" autoComplete="off" value={secret} onChange={(e) => setSecret(e.target.value)} placeholder="Paramètres de l'app → Général → Clé secrète" className="flex-1 min-w-0 rounded-md border px-3 h-9 text-sm" data-testid="secret-app" />
                <button onClick={enregistrerSecret} disabled={secret.trim().length < 10} className="rounded-md bg-[#141414] text-white px-3 h-9 text-sm disabled:opacity-50">Enregistrer</button>
              </>
            )}
          </div>
        </div>
      </details>
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Derniers « GUIDE » reçus</span>
          <button onClick={charger} className="text-xs text-muted-foreground inline-flex items-center gap-1"><RefreshCw className="h-3 w-3" /> Actualiser</button>
        </div>
        {liste.length === 0 ? <p className="text-sm text-muted-foreground mt-1">Aucun pour l'instant.</p> : (
          <ul className="divide-y divide-[#F1ECDD] text-sm mt-1" data-testid="liste-commentaires">
            {liste.map((c) => (
              <li key={c.commentaire_id} className="py-1.5 flex flex-wrap justify-between gap-2">
                <span><b>{c.auteur ? `@${c.auteur}` : c.commentaire_id.startsWith("dm:") ? "Message privé" : "Quelqu'un"}</b> · « {c.texte} »</span>
                <span className={`text-xs ${STATUTS[c.statut]?.[1] ?? ""}`} title={c.erreur ?? undefined}>{STATUTS[c.statut]?.[0] ?? c.statut} · {new Date(c.cree_le).toLocaleString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function Ligne({ libelle, valeur, onCopier }: { libelle: string; valeur: string; onCopier: (t: string) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-muted-foreground w-32 shrink-0">{libelle}</span>
      <code className="flex-1 min-w-0 truncate rounded bg-[#F4EFE3] px-2 py-1 text-xs">{valeur}</code>
      <button onClick={() => onCopier(valeur)} className="inline-flex items-center gap-1 rounded-md border px-2 h-8 text-xs"><Copy className="h-3.5 w-3.5" /> Copier</button>
    </div>
  );
}
