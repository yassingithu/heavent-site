import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";

interface Message { id: string; cree_le: string; nom: string; email: string; sujet: string | null; message: string; traite: boolean }

/** Messages du formulaire de contact, gardés en base (l'e-mail reste le canal principal : ceci évite de perdre un message). */
export default function MessagesContact({ onCompte }: { onCompte?: (aTraiter: number) => void }) {
  const { toast } = useToast();
  const [liste, setListe] = useState<Message[] | null>(null);
  const [erreur, setErreur] = useState(false);
  const [nombre, setNombre] = useState(0);
  const [filtre, setFiltre] = useState<"a_traiter" | "tous">("a_traiter");
  const [recherche, setRecherche] = useState("");
  const [deplies, setDeplies] = useState<Set<string>>(new Set());

  const charger = useCallback(async () => {
    setErreur(false);
    const base = (supabase as any).from("messages_contact").select("*");
    // « À traiter » : les plus anciens d'abord, côté serveur (rien ne disparaît au-delà de 300) ; « Tous » : les plus récents d'abord
    const { data, error } = await (filtre === "tous" ? base.order("cree_le", { ascending: false }) : base.eq("traite", false).order("cree_le", { ascending: true })).limit(300);
    if (error) { setErreur(true); setListe((l) => l ?? []); return; }
    const l = (data ?? []) as Message[];
    setListe(l);
    const { count } = await (supabase as any).from("messages_contact").select("id", { count: "exact", head: true }).eq("traite", false);
    setNombre(count ?? l.filter((m) => !m.traite).length);
    onCompte?.(count ?? l.filter((m) => !m.traite).length);
  }, [onCompte, filtre]);
  useEffect(() => { charger(); }, [charger]);
  useEffect(() => {
    const retour = () => { if (document.visibilityState === "visible") charger(); };
    document.addEventListener("visibilitychange", retour);
    return () => document.removeEventListener("visibilitychange", retour);
  }, [charger]);

  const marquer = async (m: Message, traite: boolean, avecAnnuler = true) => {
    const { error } = await (supabase as any).from("messages_contact").update({ traite }).eq("id", m.id);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    const apres = (liste ?? []).map((x) => (x.id === m.id ? { ...x, traite } : x));
    setListe(apres);
    const n = Math.max(0, nombre + (traite ? -1 : 1));
    setNombre(n); onCompte?.(n);
    toast({ title: traite ? "Message traité" : "Remis à traiter", action: avecAnnuler ? <ToastAction altText="Annuler" onClick={() => marquer(m, !traite, false)}>Annuler</ToastAction> : undefined });
  };

  const quand = (iso: string) => new Date(iso).toLocaleString("fr-FR", { timeZone: "Africa/Casablanca", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });
  const tous = liste ?? [];
  const aTraiter = tous.filter((m) => !m.traite);
  const nbATraiter = nombre;
  const q = recherche.trim().toLowerCase();
  const affiches = (filtre === "tous" ? tous : aTraiter).filter((m) => !q || [m.nom, m.email, m.sujet, m.message].some((v) => v?.toLowerCase().includes(q)));

  return (
    <section data-testid="messages-contact" aria-labelledby="t-messages">
      <p className="a-devis-date" id="t-messages">Contact · {nbATraiter} à traiter</p>
      <p className="text-[13.5px] text-[var(--s-texte-2,#5A5146)] mt-1">Chaque message arrive aussi par e-mail. Les plus anciens non traités sont en premier. Heure du Maroc.</p>
      <div className="a-filtres mt-3" role="group" aria-label="Filtrer les messages">
        <button type="button" aria-pressed={filtre === "a_traiter"} onClick={() => setFiltre("a_traiter")} data-testid="msg-filtre-a-traiter">À traiter<span className="a-filtre-n" data-zero={nbATraiter === 0 ? "oui" : "non"}>{nbATraiter}</span></button>
        <button type="button" aria-pressed={filtre === "tous"} onClick={() => setFiltre("tous")} data-testid="msg-filtre-tous">Tous<span className="a-filtre-n" style={{ display: filtre === "tous" ? undefined : "none" }}>{tous.length}</span></button>
      </div>
      {tous.length > 8 && <Input className="mt-2" placeholder="Chercher un nom, un e-mail ou un mot" aria-label="Chercher dans les messages" value={recherche} onChange={(e) => setRecherche(e.target.value)} />}

      {erreur ? (
        <div className="py-4" role="alert" data-testid="messages-erreur">
          <p className="text-sm">Impossible de charger les messages. Vérifie la connexion.</p>
          <button type="button" className="underline min-h-11 sm:min-h-8" onClick={charger}>Réessayer</button>
        </div>
      ) : liste === null ? <p className="text-sm text-muted-foreground py-4" role="status">Chargement…</p>
        : affiches.length === 0 ? <p className="font-serif text-[20px] py-4" role="status">{q ? "Aucun message ne correspond." : filtre === "tous" ? "Aucun message pour l'instant." : "Rien en attente."}</p>
        : <div className="grid gap-0 mt-2" aria-live="polite">
          {affiches.map((m) => {
            const long = m.message.length > 280, ouvert = deplies.has(m.id);
            return (
              <article key={m.id} className={`a-devis-carte ${m.traite ? "a-msg-traite" : "a-msg-neuf"}`} data-testid="message-contact">
                <p className="a-devis-date">{quand(m.cree_le)}</p>
                <h3 className="font-serif text-[24px] leading-tight break-words mt-1">{m.nom}</h3>
                <p className="text-[13.5px] text-[var(--s-texte-2,#5A5146)] break-words">{m.sujet || "(aucun sujet)"}</p>
                <p className={`a-msg-corps ${long && !ouvert ? "line-clamp-4" : ""}`}>{m.message}</p>
                {long && <button type="button" className="underline text-sm min-h-11 sm:min-h-8" onClick={() => setDeplies((d) => { const n = new Set(d); ouvert ? n.delete(m.id) : n.add(m.id); return n; })} aria-expanded={ouvert}>{ouvert ? "Réduire" : "Lire la suite"}</button>}
                <p className={`a-st mt-1 ${m.traite ? "vert vide" : ""}`}>{m.traite ? "Traité" : "À traiter"}</p>
                <p className="text-sm select-all break-all mt-1">{m.email}</p>
                <div className="a-actions">
                  <a href={`mailto:${m.email}?subject=${encodeURIComponent("Re : " + (m.sujet || "votre message"))}`} data-testid="message-repondre">Répondre</a>
                  <button type="button" onClick={() => marquer(m, !m.traite)} data-testid="message-traite">{m.traite ? "Remettre à traiter" : "Marquer comme traité"}</button>
                </div>
              </article>
            );
          })}
        </div>}
    </section>
  );
}
