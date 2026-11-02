import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";

/**
 * Bureau des agents — version « lien secret » (vitrine).
 * GET ?cle=... : si la clé correspond à secrets_internes.bureau_lien, renvoie l'activité récente des agents
 * en version générique (état + libellé général), sans aucun détail sur les clients ni les chiffres.
 * Pour couper le lien : changer ou supprimer la valeur 'bureau_lien' dans secrets_internes.
 */
const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  { auth: { autoRefreshToken: false, persistSession: false } });

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "content-type, authorization, apikey, x-client-info", "Cache-Control": "no-store" };
const LIBELLES: Record<string, string> = {
  ergonome: "Relit la facilité d'utilisation",
  designer: "Travaille l'esthétique",
  motion: "Anime les écrans",
  beta: "Teste comme un vrai client",
  "3d": "Travaille le jeu en 3D",
  auditeur: "Audite le site",
  "event-manager": "Conseille sur le terrain",
  relances: "Relances du matin",
  securite: "Audit de sécurité",
  prospection: "Recherche de nouveaux clients",
};
const json = (corps: unknown, status = 200) => new Response(JSON.stringify(corps), { status, headers: { ...CORS, "Content-Type": "application/json" } });

function egal(a: string, b: string) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });
  const cle = new URL(req.url).searchParams.get("cle") ?? "";
  const { data: ref } = await db.from("secrets_internes").select("valeur").eq("nom", "bureau_lien").maybeSingle();
  if (!ref?.valeur || cle.length < 20 || !egal(cle, ref.valeur)) return json({ erreur: "introuvable" }, 404);

  const debut = new Date(Date.now() - 36 * 3600e3).toISOString();
  const fin = new Date(Date.now() + 48 * 3600e3).toISOString();
  const [j, ig] = await Promise.all([
    db.from("journal_agents").select("agent,statut,cree_le").order("cree_le", { ascending: false }).limit(80),
    db.from("posts_instagram").select("compte,statut,date_prevue,publie_le").gte("date_prevue", debut).lte("date_prevue", fin).order("date_prevue", { ascending: false }).limit(20),
  ]);
  const agents = (j.data ?? []).map((r: any) => ({ agent: r.agent, action: LIBELLES[r.agent] ?? "Au travail", statut: r.statut, cree_le: r.cree_le }));
  const insta = (ig.data ?? []).map((p: any) => ({
    agent: "instagram",
    action: `Publication ${p.compte === "nawar" ? "Nawar" : "Heavent"}`,
    statut: p.statut === "publie" ? "termine" : p.statut === "erreur" ? "erreur" : "prevu",
    cree_le: p.publie_le ?? p.date_prevue,
  })).filter((p: any) => p.statut !== "prevu" || new Date(p.cree_le).getTime() > Date.now());
  return json({ rows: [...agents, ...insta] });
});
