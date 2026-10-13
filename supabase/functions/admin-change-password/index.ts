import { getCaller, deny, corsHeaders } from "../_shared/auth.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";

/**
 * Gestion du compte de connexion d'un crew (réservé aux administrateurs).
 * action = "password" (défaut) : change le mot de passe — et crée le compte s'il n'existe pas encore
 * action = "ban"               : bloque la connexion (et marque la fiche « banni »)
 * action = "unban"             : réautorise la connexion
 */
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", ...corsHeaders } });

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { userEmail, newPassword, action = "password", motif } = await req.json();
    const caller = await getCaller(req);
    if (!caller?.isAdmin) return deny();
    if (!userEmail) return json({ error: "Email requis" }, 400);

    const admin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { autoRefreshToken: false, persistSession: false } },
    );

    const cible = String(userEmail).trim().toLowerCase();
    if (cible === caller.email) return json({ error: "Tu ne peux pas modifier ton propre compte ici" }, 400);

    // Le compte de connexion de cette personne (s'il existe)
    let compte: any = null;
    for (let page = 1; page <= 20 && !compte; page++) {
      const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
      if (error) return json({ error: "Impossible de lire les comptes" }, 500);
      compte = data.users.find((u) => (u.email ?? "").toLowerCase() === cible);
      if (data.users.length < 1000) break;
    }

    if (action === "password") {
      if (!newPassword || String(newPassword).length < 8) return json({ error: "Le mot de passe doit faire au moins 8 caractères" }, 400);
      if (compte) {
        const { error } = await admin.auth.admin.updateUserById(compte.id, { password: newPassword, email_confirm: true });
        if (error) return json({ error: "Erreur : " + error.message }, 500);
        return json({ success: true, cree: false });
      }
      // Pas encore de compte : on le crée directement avec ce mot de passe (email considéré comme confirmé)
      const { error } = await admin.auth.admin.createUser({ email: cible, password: newPassword, email_confirm: true });
      if (error) return json({ error: "Erreur à la création du compte : " + error.message }, 500);
      return json({ success: true, cree: true });
    }

    if (action === "ban" || action === "unban") {
      const banni = action === "ban";
      if (compte) {
        const { error } = await admin.auth.admin.updateUserById(compte.id, { ban_duration: banni ? "876000h" : "none" });
        if (error) return json({ error: "Erreur : " + error.message }, 500);
      }
      const { error } = await admin.from("staff").update({
        banni, banni_le: banni ? new Date().toISOString() : null, motif_bannissement: banni ? (motif || null) : null,
      }).ilike("email", cible);
      if (error) return json({ error: "Erreur : " + error.message }, 500);
      return json({ success: true, compte: !!compte });
    }

    return json({ error: "Action inconnue" }, 400);
  } catch (error: any) {
    return json({ error: "Erreur interne : " + error.message }, 500);
  }
};

serve(handler);
