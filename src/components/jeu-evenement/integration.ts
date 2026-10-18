/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  POINT D'INTÉGRATION — demande de devis
 *  Pour l'instant, AUCUN service n'est branché : le formulaire est une démonstration
 *  et propose seulement de télécharger la demande préparée.
 *
 *  Pour brancher un vrai système plus tard :
 *   1. mettre INTEGRATION_ACTIVE à true ;
 *   2. remplir envoyerDemandeDevis() (par ex. supabase.functions.invoke("send-email", …)
 *      ou un insert dans la table des demandes) et renvoyer { envoye: true } SEULEMENT
 *      si le service a confirmé la réception.
 *  Les coordonnées ne sont jamais enregistrées dans le navigateur (localStorage).
 * ─────────────────────────────────────────────────────────────────────────────
 */
import type { Creation } from "./logique";
import type { Coordonnees } from "./recapitulatif";

export const INTEGRATION_ACTIVE = false;

export interface DemandeDevis { coordonnees: Coordonnees; creation: Creation; texte: string }

export async function envoyerDemandeDevis(_demande: DemandeDevis): Promise<{ envoye: boolean; message?: string }> {
  return { envoye: false, message: "Aucun service de devis n'est encore connecté (démonstration)." };
}
