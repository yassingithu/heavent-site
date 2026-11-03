import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";

/** Liens temporaires (1 h) vers les photos souvenirs d'un mariage, pour les mariés (lien de leur espace). */
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", "Content-Type": "application/json" };
const rep = (o: unknown, s = 200) => new Response(JSON.stringify(o), { status: s, headers: CORS });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });
  const { token } = await req.json().catch(() => ({}));
  if (!token || !/^[0-9a-f-]{36}$/i.test(String(token))) return rep({ error: "Lien invalide" }, 400);
  const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: devisId } = await db.rpc("_devis_mariage", { p_token: token });
  if (!devisId) return rep({ error: "Lien invalide" }, 404);
  const { data: photos } = await db.from("souvenirs_photos").select("id, chemin").eq("devis_id", devisId);
  const chemins = (photos ?? []).map((p: any) => p.chemin);
  if (!chemins.length) return rep({ urls: {} });
  const { data: signes, error } = await db.storage.from("souvenirs").createSignedUrls(chemins, 3600);
  if (error) return rep({ error: "Indisponible" }, 500);
  const { data: tele } = await db.storage.from("souvenirs").createSignedUrls(chemins, 3600, { download: "souvenir.jpg" });
  const urls: Record<string, string> = {}; const dl: Record<string, string> = {};
  for (const p of (photos ?? []) as any[]) {
    const s = (signes ?? []).find((x: any) => x.path === p.chemin); if (s?.signedUrl) urls[p.id] = s.signedUrl;
    const d = (tele ?? []).find((x: any) => x.path === p.chemin); if (d?.signedUrl) dl[p.id] = d.signedUrl;
  }
  return rep({ urls, dl });
});
