import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";
import { Resend } from "npm:resend@2.0.0";

/**
 * Le mail du matin (7 h 30, heure du Maroc) : la journée en un coup d'œil + le mot du jour de Yassin.
 * Envoyé aux admins qui reçoivent les mots (Imane). « ?essai=1 » : ne rien envoyer, renvoyer le contenu.
 */
const FROM = "Heavent People Agency <noreply@heaventagency.com>";
const esc = (s: unknown) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));
const heure = (iso: string) => new Date(iso).toLocaleTimeString("fr-FR", { timeZone: "UTC", hour: "2-digit", minute: "2-digit" });

Deno.serve(async (req) => {
  const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: secret } = await db.from("secrets_internes").select("valeur").eq("nom", "rappel_signatures").maybeSingle();
  if (!secret?.valeur || req.headers.get("x-cle-rappel") !== secret.valeur) return new Response("Accès refusé", { status: 403 });
  const essai = new URL(req.url).searchParams.get("essai") === "1";

  const jour = new Date().toISOString().slice(0, 10);
  const hier = new Date(Date.now() - 864e5).toISOString();
  const [{ data: profils }, { data: mot }, { data: rdv }, { data: evts }, { data: dm }, { data: de }, { data: equipes }, { data: signes }] = await Promise.all([
    db.from("admin_profils").select("email, prenom").eq("recoit_mots", true).eq("espace", "admin"),
    db.rpc("_mot_du_jour", { p_jour: jour, p_pour: "imane" }),
    db.from("rendez_vous").select("debut, client_nom, type").eq("statut", "confirme").gte("debut", `${jour}T00:00:00Z`).lte("debut", `${jour}T23:59:59Z`).order("debut"),
    db.from("devis").select("id, titre, client_nom, client_societe, lieu").eq("statut", "accepte").eq("date_evenement", jour),
    db.from("devis_mariage").select("nom, prenom, type_evenement, nb_invites").gte("created_at", hier),
    db.from("devis_entreprise").select("entreprise, nom, nb_personnes").gte("created_at", hier),
    db.from("affectations").select("devis_id").eq("date_jour", jour).neq("statut", "annule"),
    db.from("devis").select("client_nom, client_societe, total_ttc").gte("signe_le", hier).neq("statut", "annule"),
  ]);
  if (!profils?.length) return new Response(JSON.stringify({ envoyes: 0, raison: "personne" }));

  const crews = (id: string) => (equipes ?? []).filter((a: any) => a.devis_id === id).length;
  const demandes = [
    ...(dm ?? []).map((d: any) => `${esc(`${d.prenom ?? ""} ${d.nom ?? ""}`.trim())} · ${esc(d.type_evenement || "événement")}${d.nb_invites ? ` · ${d.nb_invites} invités` : ""}`),
    ...(de ?? []).map((d: any) => `${esc(d.entreprise || d.nom)} · entreprise${d.nb_personnes ? ` · ${d.nb_personnes} pers.` : ""}`),
  ];
  const bloc = (titre: string, lignes: string[], vide: string) => `
    <h3 style="font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#8C6D22;margin:24px 0 8px">${titre}</h3>
    ${lignes.length ? `<ul style="margin:0;padding-left:18px;line-height:1.7">${lignes.map((l) => `<li>${l}</li>`).join("")}</ul>` : `<p style="margin:0;color:#8a8070">${vide}</p>`}`;
  const calme = !(rdv?.length || evts?.length || demandes.length || signes?.length);

  const envoyes: string[] = [];
  const resend = new Resend(Deno.env.get("RESEND_API_KEY") ?? "");
  for (const p of profils as any[]) {
    const dateLongue = new Date().toLocaleDateString("fr-FR", { timeZone: "UTC", weekday: "long", day: "numeric", month: "long" });
    const html = `<div style="font-family:Georgia,serif;background:#FBF8F1;padding:24px">
      <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:24px;overflow:hidden;border:1px solid #EADFC8">
        <div style="background:#141414;color:#fff;padding:28px 28px 24px">
          <div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#E4D49A">${esc(dateLongue)}</div>
          <h1 style="font-weight:normal;font-size:30px;margin:6px 0 0">Bonjour ${esc(p.prenom)} ☀️</h1>
        </div>
        <div style="padding:24px 28px;font-family:Arial,sans-serif;color:#2A2420;font-size:15px">
          ${mot ? `<div style="background:#FBF6E9;border-left:3px solid #C8B560;border-radius:12px;padding:16px 18px;font-family:Georgia,serif;font-size:17px;line-height:1.5">${esc(mot)}<div style="text-align:right;color:#8C6D22;font-style:italic;margin-top:8px">— Yassin 💛</div></div>` : ""}
          ${signes?.length ? bloc("🎉 Signé depuis hier", (signes as any[]).map((s) => `<b>${esc(s.client_societe || s.client_nom)}</b> · ${Math.round(Number(s.total_ttc || 0)).toLocaleString("fr-FR")} MAD`), "") : ""}
          ${bloc("Aujourd'hui", (evts ?? []).map((e: any) => `<b>${esc(e.client_societe || e.client_nom)}</b> · ${esc(e.titre || "Événement")}${e.lieu ? ` · ${esc(e.lieu)}` : ""}${crews(e.id) ? ` · ${crews(e.id)} crew${crews(e.id) > 1 ? "s" : ""}` : ""}`), "Pas d'événement aujourd'hui.")}
          ${bloc("Rendez-vous", (rdv ?? []).map((r: any) => `<b>${heure(r.debut)}</b> · ${esc(r.client_nom)}${r.type ? ` · ${esc(r.type)}` : ""}`), "Aucun rendez-vous.")}
          ${bloc("Nouvelles demandes (24 h)", demandes, "Aucune nouvelle demande.")}
          ${calme ? `<p style="margin-top:20px;color:#5E554A">Une journée calme : profites-en pour souffler un peu. Tu le mérites.</p>` : ""}
          <p style="text-align:center;margin:28px 0 4px"><a href="https://heaventagency.com/admin" style="background:#141414;color:#fff;text-decoration:none;border-radius:999px;padding:12px 26px;display:inline-block">Ouvrir mon espace</a></p>
        </div>
      </div></div>`;
    if (essai) return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    const { error } = await resend.emails.send({ from: FROM, to: [p.email], subject: `☀️ Ta journée du ${dateLongue}`, html });
    if (!error) envoyes.push(p.email);
  }
  return new Response(JSON.stringify({ envoyes }), { headers: { "Content-Type": "application/json" } });
});
