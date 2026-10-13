import { getCaller, deny, corsHeaders } from "../_shared/auth.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", ...corsHeaders } });

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { userEmail, newPassword } = await req.json();
    const caller = await getCaller(req);
    if (!caller?.isAdmin) return deny();
    if (!userEmail || !newPassword) return json({ error: "Email et mot de passe requis" }, 400);
    if (String(newPassword).length < 8) return json({ error: "Le mot de passe doit faire au moins 8 caractères" }, 400);

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { autoRefreshToken: false, persistSession: false } },
    );

    const cible = String(userEmail).toLowerCase();
    let targetUser: any = null;
    for (let page = 1; page <= 20 && !targetUser; page++) {
      const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 1000 });
      if (error) return json({ error: "Impossible de lire les comptes" }, 500);
      targetUser = data.users.find((u) => (u.email ?? "").toLowerCase() === cible);
      if (data.users.length < 1000) break;
    }
    if (!targetUser) return json({ error: "Cette personne n'a pas encore de compte de connexion" }, 404);

    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(targetUser.id, { password: newPassword, email_confirm: true });
    if (updateError) return json({ error: "Erreur : " + updateError.message }, 500);
    return json({ success: true });
  } catch (error: any) {
    return json({ error: "Erreur interne : " + error.message }, 500);
  }
};

serve(handler);
