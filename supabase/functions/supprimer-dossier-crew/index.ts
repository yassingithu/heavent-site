import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";

/**
 * Suppression du dossier d'un crew (réservé aux administrateurs), à sa demande ou par décision de l'administration.
 *  - aucun contrat signé ni fiche de paie : la fiche, les photos, la copie de la pièce d'identité et le compte sont supprimés ;
 *  - sinon (documents à conserver pour les obligations légales) : seuls les photos, la copie de la pièce d'identité,
 *    le contact d'urgence et le compte de connexion sont supprimés ; la fiche, les contrats et les fiches de paie restent.
 * Les fichiers sont rangés dans « <bucket>/<nom> » à l'intérieur du bucket (voir file-upload.tsx) ; on supprime les deux
 * écritures possibles du chemin et on vérifie ensuite qu'il ne reste rien.
 */
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (b: unknown, status = 200) => new Response(JSON.stringify(b), { status, headers: { "Content-Type": "application/json", ...cors } });
const nomFichier = (v: string | null) => (v ? decodeURIComponent(v.split("?")[0].split("/").pop() ?? "") : "");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  try {
    const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { autoRefreshToken: false, persistSession: false } });
    const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
    const { data: u } = token ? await db.auth.getUser(token) : { data: null };
    const email = u?.user?.email?.toLowerCase();
    if (!email) return json({ error: "Accès refusé" }, 403);
    const { data: adm } = await db.from("admins").select("email").ilike("email", email).maybeSingle();
    if (!adm) return json({ error: "Accès refusé" }, 403);

    const { staffId } = await req.json();
    if (!staffId) return json({ error: "Personne manquante" }, 400);
    const { data: s } = await db.from("staff").select("id, email, photo, photo_plein_pied, identite").eq("id", staffId).maybeSingle();
    if (!s) return json({ error: "Personne introuvable" }, 404);
    const emailFiche = (s.email ?? "").toLowerCase();
    if (emailFiche && emailFiche === email) return json({ error: "Tu ne peux pas supprimer ton propre dossier ici" }, 400);
    const { data: ficheEstAdmin } = emailFiche ? await db.from("admins").select("email").ilike("email", emailFiche).maybeSingle() : { data: null };
    if (ficheEstAdmin) return json({ error: "Cette fiche est celle d'un administrateur : elle ne peut pas être supprimée ici" }, 400);

    const [{ data: ctr }, { data: paie }] = await Promise.all([
      db.from("contrats").select("id").eq("staff_id", staffId).not("signe_le", "is", null).limit(1),
      db.from("fiches_paie").select("id").eq("staff_id", staffId).limit(1),
    ]);
    const aConserver = !!(ctr?.length || paie?.length);

    // fichiers d'abord : si l'un reste en place, rien d'autre n'est supprimé
    let fichiers = 0;
    for (const [bucket, noms] of [
      ["photos-crew", [nomFichier(s.photo), nomFichier(s.photo_plein_pied)].filter(Boolean)],
      ["identites", [nomFichier(s.identite)].filter(Boolean)],
    ] as [string, string[]][]) {
      if (!noms.length) continue;
      const chemins = noms.flatMap((n) => [`${bucket}/${n}`, n]);
      const r = await db.storage.from(bucket).remove(chemins);
      if (r.error) return json({ error: "Les fichiers n'ont pas pu être supprimés : " + r.error.message }, 500);
      const { data: reste } = await db.storage.from(bucket).list(bucket, { limit: 1000 });
      const encore = (reste ?? []).filter((f) => noms.includes(f.name));
      if (encore.length) return json({ error: "Des fichiers sont encore présents dans le stockage, rien d'autre n'a été supprimé" }, 500);
      fichiers += noms.length;
    }

    // compte de connexion (retrouvé par e-mail) : une erreur est signalée, jamais ignorée
    let compte = "aucun";
    if (emailFiche) {
      let trouve: any = null;
      for (let page = 1; page <= 20 && !trouve; page++) {
        const { data, error } = await db.auth.admin.listUsers({ page, perPage: 1000 });
        if (error || !data) return json({ error: "Photos et pièce d'identité supprimées, mais les comptes de connexion n'ont pas pu être lus : rien d'autre n'a été supprimé" }, 500);
        trouve = data.users.find((x) => (x.email ?? "").toLowerCase() === emailFiche);
        if (data.users.length < 1000) break;
      }
      if (trouve) {
        const { error } = await db.auth.admin.deleteUser(trouve.id);
        if (error) return json({ error: "Photos et pièce d'identité supprimées, mais le compte de connexion n'a pas pu l'être : " + error.message }, 500);
        compte = "supprime";
      }
    }

    if (aConserver) {
      const { error } = await db.from("staff").update({
        photo: null, photo_plein_pied: null, identite: null, nom_urgence: null, telephone_urgence: null,
      }).eq("id", staffId);
      if (error) return json({ error: error.message }, 500);
      return json({ mode: "donnees", fichiers, compte });
    }
    const { error } = await db.from("staff").delete().eq("id", staffId);
    if (error) return json({ error: "Photos et compte supprimés, mais la fiche n'a pas pu l'être : " + error.message }, 500);
    return json({ mode: "complet", fichiers, compte });
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});
