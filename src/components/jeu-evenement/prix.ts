/**
 * Prix cachés aux visiteurs : le client ne voit AUCUN prix dans le jeu (ni catalogue, ni jauge, ni récapitulatif,
 * ni e-mail). Il voit « devis en cours d'étude » et reçoit son prix final seulement quand l'agence valide son devis.
 * Raison : les prestataires partenaires ne doivent jamais deviner à combien leurs prestations sont revendues.
 * Les prix du catalogue ne sont même plus chargés dans le navigateur du visiteur (voir JeuEvenement.tsx / tarifs.ts).
 *
 * Exceptions : la démonstration Studio (tarifs fictifs) et une version construite expressément avec
 * VITE_PRIX_VISIBLES=1 (tests automatiques des calculs de prix, ou site d'une autre agence qui les veut visibles).
 */
import { estDemo } from "@/demo/mode";

export const prixVisibles = () => estDemo() || import.meta.env.VITE_PRIX_VISIBLES === "1";
