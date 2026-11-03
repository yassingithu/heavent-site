import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";

/**
 * Nettoyage quotidien des souvenirs :
 *  1. mariages de plus d'un an : photos, mots et livre supprimés des serveurs ;
 *  2. photos envoyées mais jamais enregistrées (plus de 3 jours) : supprimées.
 * « ?essai=1 » : ne rien supprimer, renvoyer ce qui le serait.
 */
Deno.serve(async (req) => {
  const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: secret } = await db.from("secrets_internes").select("valeur").eq("nom", "rappel_signatures").maybeSingle();
  if (!secret?.valeur || req.headers.get("x-cle-rappel") !== secret.valeur) return new Response("Accès refusé", { status: 403 });
  const essai = new URL(req.url).searchParams.get("essai") === "1";
  const limite = new Date(Date.now() - 365 * 86400e3).toISOString().slice(0, 10);
  const res = { mariages: 0, photos: 0, livres: 0, orphelins: 0, essai };

  const { data: vieux } = await db.from("devis").select("id").eq("type", "mariage").lt("date_evenement", limite);
  const limiteTs = new Date(Date.now() - 365 * 86400e3).toISOString();
  for (const d of (vieux ?? []) as { id: string }[]) {
    const [{ data: ph }, { data: lv }, { data: inv }] = await Promise.all([
      db.from("souvenirs_photos").select("chemin, created_at").eq("devis_id", d.id),
      db.from("souvenirs_livres").select("chemin, created_at").eq("devis_id", d.id),
      db.from("souvenirs_invites").select("id, created_at").eq("devis_id", d.id),
    ]);
    if (!ph?.length && !lv?.length && !inv?.length) continue;
    // garde-fou : si un souvenir ou le livre date de moins d'un an, la date du mariage a sans doute été mal saisie → on ne supprime rien
    const recents = [...(ph ?? []), ...(lv ?? []), ...(inv ?? [])].some((x: any) => x.created_at > limiteTs);
    if (recents) continue;
    res.mariages++; res.photos += ph?.length ?? 0; res.livres += lv?.length ?? 0;
    if (essai) continue;
    if (ph?.length) { const r = await db.storage.from("souvenirs").remove(ph.map((p: any) => p.chemin)); if (r.error) continue; }
    if (lv?.length) { const r = await db.storage.from("livres-souvenirs").remove(lv.map((l: any) => l.chemin)); if (r.error) continue; }
    await db.from("souvenirs_photos").delete().eq("devis_id", d.id);
    await db.from("souvenirs_invites").delete().eq("devis_id", d.id);
    await db.from("souvenirs_livres").delete().eq("devis_id", d.id);
  }

  // livres (ZIP) sans ligne en base : supprimés
  const { data: zips } = await db.storage.from("livres-souvenirs").list("", { limit: 1000 });
  const { data: lignes } = await db.from("souvenirs_livres").select("chemin");
  const connus = new Set((lignes ?? []).map((l: any) => l.chemin));
  const zipOrph = (zips ?? []).filter((z: any) => z.name?.endsWith(".zip") && !connus.has(z.name)).map((z: any) => z.name);
  res.livres += zipOrph.length;
  if (!essai && zipOrph.length) await db.storage.from("livres-souvenirs").remove(zipOrph);

  const { data: orph } = await db.rpc("souvenirs_orphelins");
  const noms = ((orph ?? []) as { nom: string }[]).map((o) => o.nom);
  res.orphelins = noms.length;
  if (!essai && noms.length) await db.storage.from("souvenirs").remove(noms);
  return new Response(JSON.stringify(res), { headers: { "Content-Type": "application/json" } });
});
