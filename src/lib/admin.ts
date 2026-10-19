import { supabase } from "@/integrations/supabase/client";

/** Vrai si la personne connectée figure dans la table des administrateurs (fonction is_admin côté base). */
export async function estAdmin(): Promise<boolean> {
  const { data, error } = await supabase.rpc("is_admin");
  return !error && data === true;
}

/** Vrai si la personne connectée a l'espace famille de Nawar (accès limité, sans données personnelles). */
export async function estEspaceNawar(): Promise<boolean> {
  const { data, error } = await (supabase as any).rpc("est_espace_nawar");
  return !error && data === true;
}
