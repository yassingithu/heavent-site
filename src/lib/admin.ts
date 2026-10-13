import { supabase } from "@/integrations/supabase/client";

/** Vrai si la personne connectée figure dans la table des administrateurs (fonction is_admin côté base). */
export async function estAdmin(): Promise<boolean> {
  const { data, error } = await supabase.rpc("is_admin");
  return !error && data === true;
}
