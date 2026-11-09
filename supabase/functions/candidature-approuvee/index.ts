import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";
import { Resend } from "npm:resend@2.0.0";

/**
 * Prévient un candidat par e-mail que sa candidature est approuvée (appelé par l'administration quand le statut passe à « Approuvé »).
 * Réservé aux administrateurs. Un seul message par personne : la date d'envoi est gardée dans staff.mail_approbation_le.
 */
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (b: unknown, status = 200) => new Response(JSON.stringify(b), { status, headers: { "Content-Type": "application/json", ...cors } });
const FROM = "Heavent Agency <noreply@heaventagency.com>";
const REPLY = "i.chaigari@heaventagency.com";
const esc = (s: unknown) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  try {
    const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { autoRefreshToken: false, persistSession: false } });
    const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
    const { data: u } = token ? await db.auth.getUser(token) : { data: null };
    const email = u?.user?.email?.toLowerCase();
    if (!email) return json({ error: "Connexion requise" }, 401);
    const { data: adm } = await db.from("admins").select("email").ilike("email", email).maybeSingle();
    if (!adm) return json({ error: "Accès réservé aux administrateurs" }, 403);

    const { staffId } = await req.json();
    const { data: s } = await db.from("staff").select("id, prenom, nom, email, statut_candidature, mail_approbation_le").eq("id", staffId).maybeSingle();
    if (!s) return json({ error: "Fiche introuvable" }, 404);
    if (s.statut_candidature !== "approuve") return json({ error: "La candidature n'est pas approuvée" }, 400);
    if (s.mail_approbation_le) return json({ dejaEnvoye: true });
    if (!s.email) return json({ error: "Aucune adresse e-mail sur la fiche" }, 400);

    const cle = Deno.env.get("RESEND_API_KEY");
    if (!cle) return json({ error: "Envoi d'e-mails non configuré" }, 500);
    const { error: errMail } = await new Resend(cle).emails.send({
      from: FROM, to: [s.email], replyTo: REPLY,
      subject: "Votre candidature est approuvée — Heavent Agency",
      html: `<div style="font-family:Arial,sans-serif;max-width:560px;color:#141414;line-height:1.55">
        <p>Bonjour ${esc(s.prenom)},</p>
        <p><strong>Bonne nouvelle : votre candidature est approuvée.</strong></p>
        <p>Vous faites désormais partie des hôtes et hôtesses de Heavent Agency. Nous vous contacterons directement lorsqu'une mission correspondra à votre profil et à vos disponibilités ; vous recevrez alors un contrat à signer avant chaque mission.</p>
        <p>Pour recevoir des propositions, pensez à garder vos disponibilités à jour dans <a href="https://heaventagency.com/staff-dashboard" style="color:#8C6D22">votre espace</a>.</p>
        <p>Vos données personnelles (photos, copie de la pièce d'identité) sont supprimées sur simple demande par e-mail à ${REPLY}.</p>
        <p>À très bientôt,<br>Heavent Agency SARL AU</p></div>`,
    });
    if (errMail) return json({ error: "Envoi impossible : " + (errMail.message ?? "erreur") }, 502);
    await db.from("staff").update({ mail_approbation_le: new Date().toISOString() }).eq("id", s.id);
    return json({ envoye: true });
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});
