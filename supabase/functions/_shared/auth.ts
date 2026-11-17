// Vérifie qui appelle la fonction (à partir du jeton de connexion envoyé par le site).
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

export interface Caller {
  email: string;
  isAdmin: boolean;
  staffId: string | null;
}

const admin = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  { auth: { autoRefreshToken: false, persistSession: false } },
);

/** Échappe % et _ pour une comparaison ilike exacte (sans jokers). */
export const lit = (s: string) => s.replace(/[\\%_]/g, "\\$&");

export async function getCaller(req: Request): Promise<Caller | null> {
  const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (!token) return null;
  const { data, error } = await admin.auth.getUser(token);
  const email = data?.user?.email?.toLowerCase();
  if (error || !email) return null;

  const { data: adm } = await admin.from("admins").select("email").ilike("email", lit(email)).maybeSingle();
  const { data: staff } = await admin.from("staff").select("id, banni").ilike("email", lit(email)).maybeSingle();
  // Une personne bannie n'a plus aucun droit de crew, même avec une session encore ouverte
  return { email, isAdmin: !!adm, staffId: staff && !staff.banni ? staff.id : null };
}

export function deny(status = 403, message = "Accès refusé") {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}
