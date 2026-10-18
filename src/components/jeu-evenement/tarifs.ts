/**
 * Prix du jeu = prix du catalogue interne (Admin → Devis → Catalogue de prix).
 * Chaque ligne du catalogue reliée au jeu (colonne jeu_element) donne :
 *  - un coût fixe (unités « forfait », « unité », « jour »…) ;
 *  - un coût par invité (unité « personne »), compté une seule fois.
 * Sans connexion, le jeu garde les prix par défaut de config.ts.
 */
import { supabase } from "@/integrations/supabase/client";
import { CATALOGUE, CENTRES_DE_TABLE, TypeElement } from "./config";

export interface LigneTarif { jeu_element: string; unite: string; prix_unitaire: number | string }

export function appliquerTarifs(lignes: LigneTarif[]) {
  const parElement = new Map<string, { fixe: number; parInvite: number }>();
  for (const l of lignes) {
    const t = parElement.get(l.jeu_element) ?? { fixe: 0, parInvite: 0 };
    if (l.unite === "personne") t.parInvite += Number(l.prix_unitaire) || 0; else t.fixe += Number(l.prix_unitaire) || 0;
    parElement.set(l.jeu_element, t);
  }
  for (const d of CATALOGUE) {
    const t = parElement.get(d.id as TypeElement);
    if (!t) continue;
    d.prix = t.fixe;
    d.prixParInvite = t.parInvite || undefined;
  }
  const c = parElement.get("centres");
  if (c) CENTRES_DE_TABLE.prixParTable = c.fixe;
  return parElement.size;
}

/** Charge les prix du catalogue ; renvoie le nombre d'éléments mis à jour (0 si indisponible). */
export async function chargerTarifs(): Promise<number> {
  try {
    const { data, error } = await (supabase as any).rpc("tarifs_jeu");
    if (error || !Array.isArray(data)) return 0;
    return appliquerTarifs(data);
  } catch { return 0; }
}
