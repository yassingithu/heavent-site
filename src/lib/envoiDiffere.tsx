import { ToastAction } from "@/components/ui/toast";
import type { toast as ToastFn } from "@/hooks/use-toast";

/**
 * Envoi d'un e-mail avec un court délai pour annuler, à la place d'une fenêtre « Êtes-vous sûr ? ».
 * On montre à qui part le message ; si personne n'appuie sur « Annuler » avant la fin du compte à rebours, il part.
 * `quandFini` est appelé dans les deux cas (envoi parti ou annulé) pour réactiver le bouton.
 */
export const DELAI_ANNULATION_MS = 6000;

export function envoyerAvecAnnulation(toast: typeof ToastFn, opts: { titre: string; description: string; envoyer: () => void | Promise<void>; quandAnnule?: () => void; delai?: number }) {
  const delai = opts.delai ?? DELAI_ANNULATION_MS;
  let termine = false;
  let minuterie: ReturnType<typeof setTimeout> | undefined;
  const t = toast({
    title: opts.titre,
    description: opts.description,
    duration: delai,
    action: (
      <ToastAction altText="Annuler l'envoi" onClick={() => {
        if (termine) return;
        termine = true; if (minuterie) clearTimeout(minuterie);
        t.dismiss(); opts.quandAnnule?.();
        toast({ title: "Envoi annulé", description: "Rien n'a été envoyé au client." });
      }}>Annuler</ToastAction>
    ),
  });
  minuterie = setTimeout(() => { if (termine) return; termine = true; void opts.envoyer(); }, delai);
}
