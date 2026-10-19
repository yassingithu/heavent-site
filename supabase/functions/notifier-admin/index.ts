import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";
import webpush from "npm:web-push@3.6.7";

/**
 * Notifications sur le téléphone de l'administration (appli installée).
 * Appelée par la base (signature, nouvelle demande, rendez-vous, retard) avec la clé interne.
 */
Deno.serve(async (req) => {
  const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: secrets } = await db.from("secrets_internes").select("nom, valeur").in("nom", ["rappel_signatures", "vapid_public", "vapid_prive"]);
  const s = Object.fromEntries((secrets ?? []).map((x: any) => [x.nom, x.valeur]));
  if (!s.rappel_signatures || req.headers.get("x-cle-rappel") !== s.rappel_signatures) return new Response("Accès refusé", { status: 403 });

  const { titre, corps, lien, email } = await req.json().catch(() => ({}));
  if (!titre) return new Response(JSON.stringify({ error: "titre manquant" }), { status: 400 });
  webpush.setVapidDetails("mailto:contact@heaventagency.com", s.vapid_public, s.vapid_prive);

  let q = db.from("abonnements_push").select("endpoint, p256dh, auth, email");
  if (email) q = q.eq("email", String(email).toLowerCase());
  const { data: abonnes } = await q;
  const charge = JSON.stringify({ titre, corps: corps ?? "", lien: lien ?? "/admin" });
  let envoyes = 0; const expires: string[] = []; const erreurs: string[] = [];
  await Promise.all((abonnes ?? []).map(async (a: any) => {
    try {
      await webpush.sendNotification({ endpoint: a.endpoint, keys: { p256dh: a.p256dh, auth: a.auth } }, charge, { TTL: 24 * 3600, urgency: "high" });
      envoyes++;
    } catch (e: any) {
      if (e?.statusCode === 404 || e?.statusCode === 410) expires.push(a.endpoint);
      else erreurs.push(String(e?.statusCode ?? e?.message ?? e));
    }
  }));
  if (expires.length) await db.from("abonnements_push").delete().in("endpoint", expires);
  return new Response(JSON.stringify({ envoyes, expires: expires.length, erreurs }), { headers: { "Content-Type": "application/json" } });
});
