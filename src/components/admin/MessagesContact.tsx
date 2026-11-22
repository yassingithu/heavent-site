import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Message { id: string; cree_le: string; nom: string; email: string; sujet: string | null; message: string; traite: boolean }

/** Messages du formulaire de contact, gardés en base (l'e-mail reste le canal principal : ceci évite de perdre un message). */
export default function MessagesContact({ onCompte }: { onCompte?: (aTraiter: number) => void }) {
  const { toast } = useToast();
  const [liste, setListe] = useState<Message[] | null>(null);
  const [voirTraites, setVoirTraites] = useState(false);

  const charger = useCallback(async () => {
    const { data, error } = await (supabase as any).from("messages_contact").select("*").order("cree_le", { ascending: false }).limit(200);
    if (error) { toast({ title: "Messages non chargés", description: error.message, variant: "destructive" }); setListe([]); return; }
    setListe((data ?? []) as Message[]);
    onCompte?.(((data ?? []) as Message[]).filter((m) => !m.traite).length);
  }, [toast, onCompte]);
  useEffect(() => { charger(); }, [charger]);

  const basculer = async (m: Message) => {
    const { error } = await (supabase as any).from("messages_contact").update({ traite: !m.traite }).eq("id", m.id);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    charger();
  };

  const quand = (iso: string) => new Date(iso).toLocaleString("fr-FR", { timeZone: "Africa/Casablanca", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });
  const aTraiter = (liste ?? []).filter((m) => !m.traite);
  const affiches = voirTraites ? (liste ?? []) : aTraiter;

  return (
    <Card data-testid="messages-contact">
      <CardHeader className="space-y-1">
        <CardTitle className="text-base">Messages du formulaire de contact ({aTraiter.length} à traiter)</CardTitle>
        <p className="text-sm text-muted-foreground">Chaque message arrive aussi par e-mail. Heure du Maroc.</p>
        {(liste ?? []).length > aTraiter.length && (
          <button type="button" className="text-sm underline self-start min-h-11 sm:min-h-8" onClick={() => setVoirTraites((v) => !v)} aria-pressed={voirTraites}>{voirTraites ? "Masquer les messages traités" : "Voir aussi les messages traités"}</button>
        )}
      </CardHeader>
      <CardContent className="grid gap-0">
        {liste === null ? <p className="text-sm text-muted-foreground py-3">Chargement…</p>
          : affiches.length === 0 ? <p className="text-sm text-muted-foreground py-3">Aucun message à traiter.</p>
          : affiches.map((m) => (
            <article key={m.id} className="border-t border-[#DCCDAA] py-4 first:border-t-0" data-testid="message-contact">
              <p className="text-[11px] tracking-[0.18em] uppercase text-[#7A5F1F]">{quand(m.cree_le)}{m.traite ? " · traité" : ""}</p>
              <h3 className="font-serif text-[20px] leading-tight mt-1 break-words">{m.nom}</h3>
              <p className="text-sm text-[#5A5146] break-words">{m.sujet || "Sans sujet"}</p>
              <p className="text-[15px] mt-2 whitespace-pre-line break-words">{m.message}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                <span className="text-sm select-all break-all">{m.email}</span>
                <button type="button" className="text-sm underline min-h-11 sm:min-h-8" onClick={() => basculer(m)} data-testid="message-traite">{m.traite ? "Remettre à traiter" : "Marquer comme traité"}</button>
              </div>
            </article>
          ))}
      </CardContent>
    </Card>
  );
}
