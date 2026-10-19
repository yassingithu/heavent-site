import { suivre } from "@/lib/suivi";
/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  POINT D'INTÉGRATION — demande de devis
 *  La demande part vers la fonction « send-email » (type « jeu ») :
 *   - elle est enregistrée dans l'admin, onglet Événement (table devis_mariage) ;
 *   - l'agence reçoit un e-mail avec toute la configuration ;
 *   - le visiteur reçoit une confirmation avec son récapitulatif.
 *  { envoye: true } n'est renvoyé QUE si le serveur a confirmé l'enregistrement.
 *  Les coordonnées ne sont jamais enregistrées dans le navigateur (localStorage).
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { FUNCTIONS_URL } from "@/integrations/supabase/client";
import { CENTRES_DE_TABLE, libelle } from "./config";
import { Creation, calculerBudget, placesPrevues } from "./logique";
import type { Coordonnees } from "./recapitulatif";
import { nomAmbiance, nomLieu, nomType, optionsChoisies, texteDemande } from "./recapitulatif";
import { enFrancais, tr } from "./langue";

export const INTEGRATION_ACTIVE = true;

export interface DemandeDevis { coordonnees: Coordonnees; creation: Creation; texte: string }

/** Prestations au format des demandes du site, pour pré-remplir le devis dans l'admin. */
function services(c: Creation) {
  const t = new Set(c.elements.map((e) => e.type));
  const s: string[] = [];
  if (t.has("dj")) s.push("DJ / Animation musicale");
  if (t.has("arche") || t.has("fleurs") || t.has("guirlandes") || c.centres.actif) s.push("Décoration");
  if (t.has("buffet")) s.push("Traiteur");
  if (t.has("photobooth")) s.push("Photobooth");
  if (t.has("nawar")) s.push("Bar à parfums Nawar");
  if (t.has("hotesse") || t.has("serveur") || t.has("maitre_hotel")) s.push("Hôtes/Hôtesses et service");
  return s.join(", ");
}

export async function envoyerDemandeDevis(d: DemandeDevis): Promise<{ envoye: boolean; message?: string }> {
  try {
    // La demande part toujours en français vers l'agence, quelle que soit la langue du visiteur
    const corps = enFrancais(() => {
      const c = d.creation; const k = d.coordonnees; const b = calculerBudget(c);
      return JSON.stringify({
        type: "jeu",
        data: {
          prenom: k.prenom.trim(), email: k.email.trim(), telephone: k.telephone.trim(), ville: k.ville.trim(), message: k.message.trim(),
          date: k.dateInconnue ? null : k.date || null,
          typeEvenement: nomType(c), ambiance: nomAmbiance(c), lieu: nomLieu(c),
          invites: c.reglages.invites, places: placesPrevues(c), budget: c.reglages.budget, estimation: b.total,
          options: optionsChoisies(c), services: services(c),
          lignes: b.lignes.map((l) => ({ libelle: l.surDevis && l.quantite > 1 ? `${l.quantite} × ${l.libelle}` : l.libelle, detail: l.detail, total: l.total, surDevis: !!l.surDevis })),
          centres: c.centres.actif ? CENTRES_DE_TABLE.nom : null,
          honneur: libelle("honneur", c.reglages.type).nom,
          texte: texteDemande(c, k),
          langue_visiteur: document.documentElement.lang || "fr",
          // Pour créer le devis ligne par ligne dans l'admin (prix repris du catalogue au moment du devis)
          configuration: {
            version: 1, type: c.reglages.type, invites: c.reglages.invites,
            elements: c.elements.reduce<Record<string, number>>((acc, e) => { acc[e.type] = (acc[e.type] ?? 0) + 1; return acc; }, {}),
            centres: c.centres.actif ? c.elements.filter((e) => e.type === "table_ronde" || e.type === "table_rect").length : 0,
            libelles: Object.fromEntries([...new Set(c.elements.map((e) => e.type))].map((t) => [t, libelle(t, c.reglages.type).nom])),
            // Idées sur mesure nommées par le visiteur : l'agence fixe leur prix dans le devis
            sur_mesure: b.lignes.filter((l) => l.surDevis).map((l) => ({ nom: l.libelle, quantite: l.quantite })),
          },
        },
      });
    });
    const r = await fetch(`${FUNCTIONS_URL}/send-email`, { method: "POST", headers: { "Content-Type": "application/json" }, body: corps });
    const j = await r.json().catch(() => ({}));
    if (r.ok && j?.success) { suivre("demande", "jeu"); return { envoye: true }; }
    return { envoye: false, message: j?.error ?? tr("Le serveur n'a pas pu enregistrer la demande.") };
  } catch {
    return { envoye: false, message: tr("Connexion impossible pour le moment.") };
  }
}
