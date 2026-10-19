import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";
import { corsHeaders, deny, getCaller } from "../_shared/auth.ts";

/**
 * Newsletter Heavent.
 * - « guide » (site, sans connexion) : envoie le guide gratuit à une personne qui vient de s'inscrire
 * - « tester » (admin) : envoie la newsletter à l'adresse de l'admin connecté
 * - « envoyer » (admin) : envoie la newsletter à tous les abonnés concernés (consentement donné, non désinscrits)
 */
const SITE = "https://heaventagency.com";
const FROM = "Heavent People Agency <noreply@heaventagency.com>";
const REPONDRE = "i.chaigari@heaventagency.com";
const GUIDES: Record<string, { titre: string; points: string[] }> = {
  "10-conseils-mariage-reussi": { titre: "10 conseils pour un mariage réussi", points: ["Vos 3 priorités", "Un budget réaliste avec une marge", "Les prestataires à réserver tôt", "Le planning du jour J, minute par minute"] },
  "guide-baby-shower-naissance": { titre: "Baby shower et naissance : 10 idées pour une fête tout en douceur", points: ["Le bon moment", "Un thème et deux couleurs", "Le coin photo", "Le confort de maman"] },
  "guide-fiancailles-henne-fetes": { titre: "Fiançailles, henné, anniversaires : 10 clés pour une fête qui vous ressemble", points: ["L'esprit de la soirée", "La couleur signature", "La lumière", "Les traditions qui comptent"] },
  "guide-evenement-entreprise": { titre: "Événement d'entreprise : 10 conseils pour un salon ou un séminaire réussi", points: ["Un objectif mesurable", "Un accueil vitrine", "La collecte des contacts", "Le suivi après l'événement"] },
};
const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  { auth: { autoRefreshToken: false, persistSession: false } });
// API Resend appelée directement (envoi simple et envoi groupé par 100)
async function resendApi(chemin: string, corps: unknown): Promise<{ error: string | null }> {
  const r = await fetch(`https://api.resend.com${chemin}`, { method: "POST", headers: { Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY") ?? ""}`, "Content-Type": "application/json" }, body: JSON.stringify(corps) });
  if (r.ok) return { error: null };
  const d = await r.json().catch(() => ({}));
  return { error: d.message ?? `Resend ${r.status}` };
}
const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", ...corsHeaders } });
const esc = (s: unknown) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));
const paragraphes = (t: string) => esc(t).split(/\n\s*\n/).map((p) => `<p style="margin:0 0 16px;line-height:1.65">${p.replace(/\n/g, "<br>")}</p>`).join("");

function gabarit({ titre, corps, image, bouton, jeton }: { titre: string; corps: string; image?: string | null; bouton?: { texte: string; lien: string } | null; jeton?: string | null }) {
  const desinscription = jeton ? `${SITE}/desinscription/${jeton}` : `${SITE}/desinscription`;
  return `<!doctype html><html><body style="margin:0;background:#FBF8F1">
  <div style="font-family:Arial,sans-serif;background:#FBF8F1;padding:24px 12px">
    <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:24px;overflow:hidden;border:1px solid #EADFC8">
      <div style="background:#141414;padding:22px 28px;text-align:center">
        <div style="font-size:11px;letter-spacing:4px;color:#E4D49A">HEAVENT PEOPLE AGENCY</div>
      </div>
      ${image ? `<img src="${esc(image)}" alt="" style="display:block;width:100%;height:auto">` : ""}
      <div style="padding:28px;color:#2A2420;font-size:15px">
        <h1 style="font-family:Georgia,serif;font-weight:normal;font-size:26px;line-height:1.25;margin:0 0 18px">${esc(titre)}</h1>
        ${corps}
        ${bouton ? `<p style="text-align:center;margin:28px 0 8px"><a href="${esc(bouton.lien)}" style="background:#141414;color:#fff;text-decoration:none;border-radius:999px;padding:14px 28px;display:inline-block;font-size:15px">${esc(bouton.texte)}</a></p>` : ""}
      </div>
      <div style="border-top:1px solid #F1ECDD;padding:18px 28px;font-size:12px;color:#8a8070;line-height:1.6;text-align:center">
        Heavent People Agency · Rabat, Maroc · <a href="${SITE}" style="color:#8C6D22">heaventagency.com</a><br>
        Vous recevez cet e-mail car vous vous êtes inscrit(e) sur notre site.
        <a href="${desinscription}" style="color:#8a8070">Se désinscrire en un clic</a>
      </div>
    </div>
  </div></body></html>`;
}

function htmlNewsletter(n: any, jeton: string | null) {
  const g = n.guide_slug ? GUIDES[n.guide_slug] : null;
  return gabarit({
    titre: n.sujet, image: n.image_url, jeton,
    corps: paragraphes(n.contenu),
    bouton: g ? { texte: `Lire le guide gratuit « ${g.titre.split(":")[0]} »`, lien: `${SITE}/guides/${n.guide_slug}?offert=1` } : { texte: "Découvrir Heavent", lien: SITE },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  const corps = await req.json().catch(() => ({}));

  // Envoi du guide après l'inscription (page publique)
  if (corps.action === "guide") {
    const g = GUIDES[String(corps.slug)];
    const email = String(corps.email ?? "").trim().toLowerCase();
    if (!g || !email) return json({ error: "Demande invalide" }, 400);
    const { data: a } = await db.from("abonnes_newsletter").select("id, prenom, jeton, guides_envoyes, derniere_demande").eq("email", email).maybeSingle();
    // Uniquement juste après une inscription, et une seule fois par jour et par guide (anti-abus)
    if (!a || Date.now() - new Date(a.derniere_demande).getTime() > 10 * 60 * 1000) return json({ error: "Inscription introuvable" }, 400);
    const deja = (a.guides_envoyes ?? {})[corps.slug];
    if (deja && Date.now() - new Date(deja).getTime() < 24 * 3600 * 1000) return json({ ok: true, deja: true });
    const html = gabarit({
      titre: `${a.prenom ? `${a.prenom}, v` : "V"}otre guide est prêt 🎁`, jeton: a.jeton,
      corps: paragraphes(`Merci pour votre confiance ! Voici votre guide gratuit : « ${g.titre} ».\n\nAu programme, entre autres :\n${g.points.map((p) => `• ${p}`).join("\n")}\n\nGardez ce lien précieusement : vous pouvez relire le guide quand vous voulez, et l'imprimer en PDF.\n\nÀ très bientôt,\nL'équipe Heavent`),
      bouton: { texte: "Lire mon guide", lien: `${SITE}/guides/${corps.slug}?offert=1` },
    });
    const { error } = await resendApi("/emails", { from: FROM, to: [email], reply_to: REPONDRE, subject: `🎁 Votre guide : ${g.titre}`, html,
      headers: { "List-Unsubscribe": `<${SITE}/desinscription/${a.jeton}>` } });
    if (error) return json({ error: "Envoi impossible pour le moment" }, 502);
    await db.from("abonnes_newsletter").update({ guides_envoyes: { ...(a.guides_envoyes ?? {}), [corps.slug]: new Date().toISOString() } }).eq("id", a.id);
    return json({ ok: true });
  }

  // Administration
  const appelant = await getCaller(req);
  if (!appelant?.isAdmin) return deny();
  const { data: n } = await db.from("newsletters").select("*").eq("id", corps.newsletter_id).maybeSingle();
  if (!n) return json({ error: "Newsletter introuvable" }, 404);

  if (corps.action === "tester") {
    const { error } = await resendApi("/emails", { from: FROM, to: [appelant.email], reply_to: REPONDRE, subject: `[Test] ${n.sujet}`, html: htmlNewsletter(n, null) });
    return error ? json({ error }, 502) : json({ ok: true, a: appelant.email });
  }

  if (corps.action === "envoyer") {
    if (n.statut === "envoyee") return json({ error: "Cette newsletter a déjà été envoyée" }, 409);
    let q = db.from("abonnes_newsletter").select("email, jeton").eq("consentement", true).is("desinscrit_le", null);
    if (n.themes?.length) q = q.overlaps("themes", n.themes);
    const { data: abonnes } = await q;
    const liste = abonnes ?? [];
    let envoyes = 0; const erreurs: string[] = [];
    for (let i = 0; i < liste.length; i += 100) {
      const paquet = liste.slice(i, i + 100).map((a: any) => ({
        from: FROM, to: [a.email], reply_to: REPONDRE, subject: n.sujet, html: htmlNewsletter(n, a.jeton),
        headers: { "List-Unsubscribe": `<${SITE}/desinscription/${a.jeton}>` },
      }));
      const { error } = await resendApi("/emails/batch", paquet);
      if (error) erreurs.push(error); else envoyes += paquet.length;
    }
    if (envoyes) await db.from("newsletters").update({ statut: "envoyee", envoyee_le: new Date().toISOString(), nb_destinataires: envoyes }).eq("id", n.id);
    return json({ envoyes, total: liste.length, erreurs });
  }
  return json({ error: "Action inconnue" }, 400);
});
