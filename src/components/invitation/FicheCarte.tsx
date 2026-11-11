import * as Dialog from "@radix-ui/react-dialog";
import { X, Play } from "lucide-react";
import { FORMULES, formuleDe, type OuvertureDef } from "@/lib/invitation";

interface Props {
  ouvert: boolean;
  onFermer: () => void;
  ouverture: OuvertureDef;
  rang: number;
  total: number;
  /** Libellé du bouton principal : « Ajouter à ma commande » ou « Enregistrer ». */
  action: string;
  /** Libellé court pour les petits écrans. */
  actionCourt: string;
  /** Carte à qui rendre le focus à la fermeture. */
  retour?: string;
  onAction: () => void;
  children: React.ReactNode;
}

/** Fiche d'une carte : plein écran sur téléphone, grande fenêtre sur ordinateur. Prix et bouton restent toujours visibles. */
export default function FicheCarte({ ouvert, onFermer, ouverture: o, rang, total, action, actionCourt, retour, onAction, children }: Props) {
  const f = FORMULES.find((x) => x.id === formuleDe(o));
  const versApercu = () => document.querySelector<HTMLElement>(".boutique-fiche aside[aria-label^='Aperçu']")?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  return (
    <Dialog.Root open={ouvert} onOpenChange={(v) => { if (!v) onFermer(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="boutique-voile" />
        <Dialog.Content className="cartes-page boutique-fiche" aria-describedby="fiche-desc" data-testid="fiche-carte"
          onCloseAutoFocus={(e) => { e.preventDefault(); if (retour) document.querySelector<HTMLElement>(`[data-testid="ouverture-${retour}"]`)?.focus({ preventScroll: true }); }}>
          <header className="boutique-fiche-tete">
            <div>
              <small>{f?.nom} · Nº {String(rang).padStart(2, "0")}</small>
              <Dialog.Title>{o.nom}</Dialog.Title>
            </div>
            <Dialog.Close className="boutique-fermer" aria-label="Fermer la fiche" data-testid="fiche-fermer"><X aria-hidden="true" /></Dialog.Close>
          </header>
          <Dialog.Description id="fiche-desc" className="boutique-fiche-desc">{o.description}</Dialog.Description>
          <div className="boutique-fiche-corps">{children}</div>
          <footer className="boutique-fiche-pied">
            <span className="boutique-total"><small>Total</small><b key={total} className="boutique-maj" data-testid="fiche-total">{total} DH</b></span>
            <button type="button" className="s-btn s-btn-filet boutique-apercu" onClick={versApercu} ><Play aria-hidden="true" className="h-4 w-4" /> Aperçu</button>
            <button type="button" className="s-btn s-btn-plein s-sombre boutique-ajouter" onClick={onAction} data-testid="fiche-ajouter"><span className="boutique-long">{action}</span><span className="boutique-court" aria-hidden="true">{actionCourt}</span></button>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
