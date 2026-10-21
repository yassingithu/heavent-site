import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";
import { corsHeaders, deny, getCaller } from "../_shared/auth.ts";

/**
 * Publication Instagram (API officielle « Instagram avec connexion Instagram »).
 * - Tâche planifiée (clé interne) : publie les posts prêts dont l'heure est passée, et renouvelle le jeton chaque semaine.
 * - Administration : « connecter » (enregistre le jeton après vérification), « publier » (un post tout de suite).
 */
const API_IG = "https://graph.instagram.com/v21.0";
const API_FB = "https://graph.facebook.com/v21.0";
// Deux méthodes : « instagram » (connexion Instagram) ou « facebook » (via la Page Facebook reliée au compte)
let API = API_IG;
// Deux comptes : Heavent (clés « instagram_… ») et Nawar, le bar à parfums (clés « nawar_instagram_… »)
const PREFIXE: Record<string, string> = { heavent: "", nawar: "nawar_" };
const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  { auth: { autoRefreshToken: false, persistSession: false } });
const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", ...corsHeaders } });
const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function secrets() {
  const noms = ["instagram_jeton", "instagram_compte", "instagram_jeton_le", "instagram_mode", "instagram_page_id"];
  const { data } = await db.from("secrets_internes").select("nom, valeur").in("nom", ["rappel_signatures", "instagram_secret_app", ...noms, ...noms.map((n) => "nawar_" + n)]);
  return Object.fromEntries((data ?? []).map((x: any) => [x.nom, x.valeur])) as Record<string, string>;
}
const enregistrer = (nom: string, valeur: string) => db.from("secrets_internes").upsert({ nom, valeur }, { onConflict: "nom" });
/** Les réglages d'un compte, sans préfixe (jeton, compte, mode…) */
function reglagesDe(s: Record<string, string>, compte: string) {
  const p = PREFIXE[compte] ?? "";
  return { jeton: s[p + "instagram_jeton"], compte: s[p + "instagram_compte"], mode: s[p + "instagram_mode"], page: s[p + "instagram_page_id"], jetonLe: s[p + "instagram_jeton_le"], p };
}

async function appel(url: string, init?: RequestInit) {
  const r = await fetch(url, init);
  const d = await r.json().catch(() => ({}));
  if (!r.ok || d.error) throw new Error(d.error?.message ?? `Instagram ${r.status}`);
  return d;
}

/** Abonne le compte aux notifications « commentaires » et « messages » (pour « Commentez GUIDE ») */
async function abonner(jeton: string, pageId?: string, p = "") {
  if (pageId) await appel(`${API_FB}/${pageId}/subscribed_apps?subscribed_fields=feed&access_token=${encodeURIComponent(jeton)}`, { method: "POST" });
  else await appel(`${API_IG}/me/subscribed_apps?subscribed_fields=comments,messages&access_token=${encodeURIComponent(jeton)}`, { method: "POST" });
  await enregistrer(p + "instagram_abonne_le", new Date().toISOString());
}

async function publier(post: any, jeton: string, compte: string, mode?: string) {
  API = mode === "facebook" ? API_FB : API_IG;
  const corps = new URLSearchParams({ image_url: post.visuel_url, caption: post.legende ?? "", access_token: jeton });
  const conteneur = await appel(`${API}/${compte}/media`, { method: "POST", body: corps });
  // On attend que l'image soit prête chez Instagram (quelques secondes au plus)
  for (let i = 0; i < 10; i++) {
    const s = await appel(`${API}/${conteneur.id}?fields=status_code&access_token=${encodeURIComponent(jeton)}`);
    if (s.status_code === "FINISHED") break;
    if (s.status_code === "ERROR") throw new Error("Instagram a refusé l'image");
    await pause(2000);
  }
  const media = await appel(`${API}/${compte}/media_publish`, { method: "POST", body: new URLSearchParams({ creation_id: conteneur.id, access_token: jeton }) });
  await db.from("posts_instagram").update({ statut: "publie", publie_le: new Date().toISOString(), ig_media_id: media.id, erreur: null }).eq("id", post.id);
  return media.id as string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  const s = await secrets();

  // Tâche planifiée
  if (req.headers.get("x-cle-rappel")) {
    if (req.headers.get("x-cle-rappel") !== s.rappel_signatures) return new Response("Accès refusé", { status: 403 });
    const resultats: unknown[] = [];
    for (const nomCompte of Object.keys(PREFIXE)) {
      const r = reglagesDe(s, nomCompte);
      if (!r.jeton || !r.compte) continue;
      let jeton = r.jeton;
      // Renouvellement du jeton Instagram (valable 60 jours) une fois par semaine ; le jeton de Page Facebook n'expire pas
      if (r.mode !== "facebook" && (!r.jetonLe || Date.now() - new Date(r.jetonLe).getTime() > 7 * 864e5)) {
        try {
          const n = await appel(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(jeton)}`);
          if (n.access_token) { jeton = n.access_token; await enregistrer(r.p + "instagram_jeton", jeton); await enregistrer(r.p + "instagram_jeton_le", new Date().toISOString()); }
        } catch { /* on réessaiera au prochain passage */ }
      }
      const { data: posts } = await db.from("posts_instagram").select("*").eq("compte", nomCompte).eq("statut", "pret").not("visuel_url", "is", null)
        .lte("date_prevue", new Date().toISOString()).order("date_prevue").limit(2);
      for (const p of posts ?? []) {
        try { resultats.push({ compte: nomCompte, id: p.id, media: await publier(p, jeton, r.compte, r.mode) }); }
        catch (e) { await db.from("posts_instagram").update({ statut: "erreur", erreur: String((e as Error).message) }).eq("id", p.id); resultats.push({ compte: nomCompte, id: p.id, erreur: String(e) }); }
      }
    }
    return json({ publies: resultats });
  }

  // Administration
  const appelant = await getCaller(req);
  if (!appelant?.isAdmin) return deny();
  const { action, jeton, post_id, app_id, secret, compte: nomCompte = "heavent" } = await req.json().catch(() => ({}));
  const P = PREFIXE[nomCompte] ?? "";

  if (action === "connecter") {
    const t = String(jeton ?? "").trim();
    if (t.length < 20) return json({ error: "Jeton invalide" }, 400);
    // Jeton Facebook (commence par « EA ») : méthode via la Page Facebook reliée au compte Instagram
    if (t.startsWith("EA")) {
      const cle = String(secret ?? "").trim() || s.instagram_secret_app;
      const app = String(app_id ?? "").trim();
      if (!app || !cle) return json({ error: "Ajoute l'App ID et la clé secrète de l'app (App settings → Basic)" }, 400);
      try {
        const long = await appel(`${API_FB}/oauth/access_token?grant_type=fb_exchange_token&client_id=${encodeURIComponent(app)}&client_secret=${encodeURIComponent(cle)}&fb_exchange_token=${encodeURIComponent(t)}`);
        const pages = await appel(`${API_FB}/me/accounts?fields=id,name,access_token,instagram_business_account{id,username}&limit=100&access_token=${encodeURIComponent(long.access_token)}`);
        // Heavent : la Page Heavent ; Nawar : la Page dont le nom contient « Nawar »
        const reliees = (pages.data ?? []).filter((p: any) => p.instagram_business_account?.id);
        const page = P ? reliees.find((p: any) => /nawar/i.test(`${p.name} ${p.instagram_business_account?.username}`)) : (reliees.find((p: any) => !/nawar/i.test(`${p.name} ${p.instagram_business_account?.username}`)) ?? reliees[0]);
        if (!page) return json({ error: "Aucune Page Facebook reliée à un compte Instagram professionnel n'a été trouvée avec ce jeton (coche bien la Page Heavent et le compte Instagram lors de l'autorisation)." }, 400);
        await enregistrer(P + "instagram_mode", "facebook");
        await enregistrer(P + "instagram_jeton", page.access_token);  // jeton de Page : n'expire pas
        await enregistrer(P + "instagram_page_id", page.id);
        await enregistrer(P + "instagram_compte", page.instagram_business_account.id);
        await enregistrer(P + "instagram_nom", page.instagram_business_account.username ?? page.name);
        await enregistrer("instagram_app_id", app);
        if (String(secret ?? "").trim()) await enregistrer("instagram_secret_app", cle);
        await enregistrer(P + "instagram_jeton_le", new Date().toISOString());
        let abonnement: string | null = null;
        try { if (!P) await abonner(page.access_token, page.id); } catch (e) { abonnement = (e as Error).message; }
        return json({ nom: page.instagram_business_account.username ?? page.name, abonnement });
      } catch (e) { return json({ error: `Facebook refuse ce jeton : ${(e as Error).message}` }, 400); }
    }
    try {
      API = API_IG;
      const moi = await appel(`${API}/me?fields=user_id,username&access_token=${encodeURIComponent(t)}`);
      await enregistrer(P + "instagram_mode", "instagram");
      await enregistrer(P + "instagram_jeton", t);
      await enregistrer(P + "instagram_compte", String(moi.user_id ?? moi.id));
      await enregistrer(P + "instagram_nom", String(moi.username ?? ""));
      await enregistrer(P + "instagram_jeton_le", new Date().toISOString());
      let abonnement: string | null = null;
      try { if (!P) await abonner(t); } catch (e) { abonnement = (e as Error).message; }
      return json({ nom: moi.username, abonnement });
    } catch (e) { return json({ error: `Instagram refuse ce jeton : ${(e as Error).message}` }, 400); }
  }

  if (action === "abonner") {
    if (!s.instagram_jeton) return json({ error: "Instagram n'est pas connecté" }, 400);
    try { await abonner(s.instagram_jeton, s.instagram_mode === "facebook" ? s.instagram_page_id : undefined); return json({ ok: true }); }
    catch (e) { return json({ error: (e as Error).message }, 502); }
  }

  if (action === "publier") {
    const { data: p } = await db.from("posts_instagram").select("*").eq("id", post_id).maybeSingle();
    if (!p?.visuel_url) return json({ error: "Le visuel n'est pas prêt" }, 400);
    if (p.statut === "publie") return json({ error: "Ce post est déjà publié" }, 409);
    const r = reglagesDe(s, p.compte ?? "heavent");
    if (!r.jeton || !r.compte) return json({ error: `Le compte Instagram ${p.compte === "nawar" ? "Nawar" : "Heavent"} n'est pas connecté` }, 400);
    try { return json({ media: await publier(p, r.jeton, r.compte, r.mode) }); }
    catch (e) {
      await db.from("posts_instagram").update({ statut: "erreur", erreur: String((e as Error).message) }).eq("id", p.id);
      return json({ error: (e as Error).message }, 502);
    }
  }
  return json({ error: "Action inconnue" }, 400);
});
