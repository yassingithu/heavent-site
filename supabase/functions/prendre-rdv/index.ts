import { corsHeaders, getCaller } from "../_shared/auth.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";
import { Resend } from "npm:resend@2.0.0";
import { avecOriginal, htmlTraduit, versFrancais } from "../_shared/traduire.ts";
import { TYPES, base64, calendrierIcs, emailClient, infosPratiques, langueDe, quand, t } from "../_shared/agenda.ts";

/**
 * Agenda de rendez-vous.
 *  - (public) réserver un créneau libre : depuis la page d'un devis (lien secret) ou la page Contact ;
 *    e-mail de confirmation au client dans sa langue (+ fichier calendrier), e-mail en français à l'agence.
 *  - action « annuler » (admin) : annule un rendez-vous et prévient le client.
 */
const ADMIN_EMAIL = "i.chaigari@heaventagency.com";
const FROM = "Heavent People Agency <noreply@heaventagency.com>";
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", ...corsHeaders } });
const e = (v: unknown) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
const txt = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);
const SOURCES: Record<string, string> = { devis: "page de son devis", contact: "page Contact", jeu: "jeu « Crée ton événement »", site: "site" };

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const corps = await req.json();
    const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "", { auth: { persistSession: false } });
    const { data: p } = await db.from("agenda_parametres").select("*").eq("id", 1).maybeSingle();
    const { data: ag } = await db.from("parametres_agence").select("adresse, ville").eq("id", 1).maybeSingle();
    const adresse = p?.adresse?.trim() || [ag?.adresse, ag?.ville].filter(Boolean).join(", ") || null;
    const cle = Deno.env.get("RESEND_API_KEY");
    const resend = cle ? new Resend(cle) : null;

    // ---------- annulation par l'agence ----------
    if (corps.action === "annuler") {
      const caller = await getCaller(req);
      if (!caller?.isAdmin) return json({ error: "Accès refusé" }, 403);
      const { data: r } = await db.from("rendez_vous").select("*").eq("id", corps.id).maybeSingle();
      if (!r) return json({ error: "Rendez-vous introuvable" }, 404);
      await db.from("rendez_vous").update({ statut: "annule", annule_le: new Date().toISOString() }).eq("id", r.id);
      if (corps.prevenir !== false && r.client_email && resend) {
        const l = langueDe(r.langue); const dir = l === "ar" ? ' dir="rtl"' : "";
        await resend.emails.send({
          from: FROM, to: [r.client_email], reply_to: ADMIN_EMAIL, subject: t("sujetAnnulation", l),
          html: `<div${dir} style="font-family:Arial,sans-serif;max-width:620px;color:#2a2420"><p>${t("bonjour", l)} ${e(r.client_nom)},</p>
            <p>${t("annule", l)} <b>${e(quand(r.debut, l))}</b>.</p>${corps.motif ? `<p>${e(corps.motif)}</p>` : ""}
            <p>${t("reprendre", l)}</p><p>${t("aBientot", l)}<br>Imane CHAIGARI — Heavent People Agency</p></div>`,
          attachments: [{ filename: "rendez-vous.ics", content: base64(calendrierIcs([{ uid: r.id, debut: r.debut, fin: r.fin, titre: t("titreEvenement", l), annule: true }], "Heavent", "CANCEL")) }],
        }).catch(() => {});
      }
      return json({ success: true });
    }

    // ---------- réservation par le client ----------
    if (corps.site) return json({ success: true }); // champ piège anti-robots
    if (!p?.actif) return json({ error: "La prise de rendez-vous en ligne est momentanément fermée. Contactez-nous." }, 409);
    const l = langueDe(corps.langue);
    const nom = txt(corps.nom, 120), email = txt(corps.email, 200).toLowerCase(), tel = txt(corps.telephone, 40);
    const type = String(corps.type ?? "");
    if (nom.length < 2) return json({ error: "nom" }, 400);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "email" }, 400);
    if (!(p.types ?? []).includes(type)) return json({ error: "type" }, 400);
    if (type === "telephone" && tel.replace(/\D/g, "").length < 8) return json({ error: "telephone" }, 400);

    const debut = new Date(String(corps.debut ?? ""));
    if (isNaN(debut.getTime())) return json({ error: "creneau" }, 400);
    const { data: libres } = await db.rpc("agenda_creneaux");
    const creneau = (libres ?? []).find((c: any) => new Date(c.debut).getTime() === debut.getTime());
    if (!creneau) return json({ error: "pris" }, 409);

    const { count } = await db.from("rendez_vous").select("id", { count: "exact", head: true })
      .ilike("client_email", email).eq("statut", "confirme").gte("debut", new Date().toISOString());
    if ((count ?? 0) >= 2) return json({ error: "limite" }, 429);

    // Devis concerné (lien secret de la page du client)
    let devis: any = null;
    if (/^[0-9a-f-]{36}$/i.test(String(corps.devisToken ?? ""))) {
      const { data } = await db.from("devis").select("id, numero, titre, total_ttc, client_societe, signe_le, rdv_message").eq("lien_token", corps.devisToken).maybeSingle();
      devis = data;
    }
    const tm = await versFrancais(txt(corps.message, 2000));
    const source = devis ? "devis" : SOURCES[String(corps.source)] ? String(corps.source) : "site";

    const { data: r, error } = await db.from("rendez_vous").insert({
      debut: creneau.debut, fin: creneau.fin, type, client_nom: nom, client_email: email, client_telephone: tel || null,
      message: avecOriginal(tm) || null, langue: l, source, devis_id: devis?.id ?? null,
    }).select("*").single();
    if (error) return json({ error: /chevauchement|exclusion|conflict/i.test(error.message + error.code) || error.code === "23P01" ? "pris" : "erreur" }, error.code === "23P01" ? 409 : 500);

    if (devis && !devis.signe_le) {
      await db.from("devis").update({
        rdv_demande_le: new Date().toISOString(), relances: 2,
        rdv_message: [`Rendez-vous réservé : ${quand(r.debut)} (${TYPES[type].fr})`, tm.texte && `Message : ${avecOriginal(tm)}`].filter(Boolean).join("\n"),
      }).eq("id", devis.id);
    }

    if (resend) {
      const description = [`${nom} — ${TYPES[type].fr}`, tel && `Tél. ${tel}`, email, devis && `Devis ${devis.numero}${devis.titre ? ` (${devis.titre})` : ""}`, tm.texte && `Message : ${tm.texte}`].filter(Boolean).join("\n");
      await resend.emails.send({
        from: FROM, to: [ADMIN_EMAIL], reply_to: email,
        subject: `📅 Rendez-vous ${quand(r.debut)} — ${nom}${devis ? ` (devis ${devis.numero})` : ""}`,
        html: `<div style="font-family:Arial,sans-serif;max-width:620px;color:#2a2420">
          <p><b>${e(nom)}</b> a réservé un rendez-vous <b>${e(TYPES[type].fr)}</b> depuis la ${e(SOURCES[source])} :</p>
          <div style="background:#FAF7EE;border:1px solid #ece6d3;border-radius:8px;padding:12px 16px"><b style="font-size:16px">📅 ${e(quand(r.debut))}</b> (${p.duree_minutes} min)</div>
          <p>Contact : ${e(email)}${tel ? ` · ${e(tel)}` : ""}</p>
          ${devis ? `<p>Devis <b>${e(devis.numero)}</b>${devis.titre ? ` « ${e(devis.titre)} »` : ""}${devis.signe_le ? "" : " — non signé : les relances automatiques sont arrêtées."}</p>` : ""}
          ${tm.texte ? `<p><b>Message :</b><br><span style="white-space:pre-line">${htmlTraduit(tm, e)}</span></p>` : ""}
          <p style="color:#888;font-size:12px">Retrouve tous tes rendez-vous dans l'administration, onglet Agenda.</p></div>`,
        attachments: [{ filename: "rendez-vous.ics", content: base64(calendrierIcs([{ uid: r.id, debut: r.debut, fin: r.fin, titre: `RDV ${nom} (${TYPES[type].fr})`, lieu: type === "agence" ? adresse : type === "telephone" ? tel : "Visio", description }], "Heavent")) }],
      }).catch(() => {});
      await resend.emails.send({
        from: FROM, to: [email], reply_to: ADMIN_EMAIL, subject: t("sujetConfirmation", l),
        html: emailClient(r, l, t("confirme", l), infosPratiques(r, l, adresse, p.lien_visio), true),
        attachments: [{ filename: "rendez-vous-heavent.ics", content: base64(calendrierIcs([{ uid: r.id, debut: r.debut, fin: r.fin, titre: t("titreEvenement", l),
          lieu: type === "agence" ? adresse : TYPES[type][l], description: "Heavent People Agency · +212 6 10 93 96 55" }], "Heavent")) }],
      }).catch(() => {});
    }
    return json({ success: true, debut: r.debut, fin: r.fin, type });
  } catch (err: any) {
    console.error("prendre-rdv:", err);
    return json({ error: "erreur" }, 500);
  }
});
