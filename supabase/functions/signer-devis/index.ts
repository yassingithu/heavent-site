import { corsHeaders } from "../_shared/auth.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";
import { Resend } from "npm:resend@2.0.0";
import { avecOriginal, htmlTraduit, versFrancais } from "../_shared/traduire.ts";

/**
 * Depuis le lien reçu par e-mail, le client peut :
 *  - signer le devis en ligne (« Bon pour accord ») : le devis passe en « Accepté », la facture d'acompte est créée,
 *    e-mails avec RIB et acompte ;
 *  - ou, s'il ne souhaite pas signer tout de suite, demander d'abord un rendez-vous (action « rdv ») :
 *    l'agence est prévenue (message traduit en français si besoin) et les relances automatiques s'arrêtent.
 */
const ADMIN_EMAIL = "i.chaigari@heaventagency.com";
const FROM = "Heavent People Agency <noreply@heaventagency.com>";
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", ...corsHeaders } });
const e = (v: unknown) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
const mad = (n: unknown) => `${new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(n) || 0)} MAD`;

async function empreinte(t: string) {
  const h = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t));
  return [...new Uint8Array(h)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Le client ne signe pas tout de suite : il préfère un premier rendez-vous. */
async function demanderRendezVous(token: string, message: string, disponibilites: string) {
  const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "", { auth: { persistSession: false } });
  const { data: d } = await db.from("devis").select("*").eq("lien_token", token).maybeSingle();
  if (!d || d.statut === "annule") return json({ error: "Ce devis n'est plus disponible. Contactez-nous." }, 404);
  if (d.signe_le) return json({ error: "Ce devis a déjà été signé." }, 409);
  const [tm, td] = await Promise.all([versFrancais(message), versFrancais(disponibilites)]);
  const note = [td.texte && `Disponibilités : ${avecOriginal(td)}`, tm.texte && `Message : ${avecOriginal(tm)}`].filter(Boolean).join("\n") || null;
  const { error } = await db.from("devis").update({ rdv_demande_le: new Date().toISOString(), rdv_message: note, relances: 2 }).eq("id", d.id);
  if (error) return json({ error: "Demande non enregistrée : " + error.message }, 500);
  const cle = Deno.env.get("RESEND_API_KEY");
  if (cle) {
    const resend = new Resend(cle);
    await resend.emails.send({
      from: FROM, to: [ADMIN_EMAIL], reply_to: d.client_email || undefined,
      subject: `📅 Rendez-vous demandé avant signature — devis ${d.numero} (${d.client_nom})`,
      html: `<p><b>${e(d.client_nom)}</b>${d.client_societe ? ` (${e(d.client_societe)})` : ""} ne souhaite pas signer tout de suite le devis <b>${e(d.numero)}</b> « ${e(d.titre ?? "")} » (${mad(d.total_ttc)} TTC) : il ou elle préfère d'abord un rendez-vous.</p>
        ${td.texte ? `<p><b>Disponibilités :</b> ${htmlTraduit(td, e)}</p>` : ""}
        ${tm.texte ? `<p><b>Message :</b><br><span style="white-space:pre-line">${htmlTraduit(tm, e)}</span></p>` : ""}
        <p>Contact : ${e(d.client_email ?? "")}${d.client_telephone ? ` · ${e(d.client_telephone)}` : ""}</p>
        <p style="color:#888;font-size:12px">Les relances automatiques de ce devis sont arrêtées. Le client peut toujours le signer plus tard depuis son lien.</p>`,
    }).catch(() => {});
    if (d.client_email) await resend.emails.send({
      from: FROM, to: [d.client_email], reply_to: ADMIN_EMAIL, subject: `Votre demande de rendez-vous — devis ${d.numero}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:620px;color:#2a2420"><p>Bonjour ${e(d.client_nom)},</p>
        <p>Merci ! Nous avons bien noté que vous souhaitez d'abord un rendez-vous pour affiner votre projet. Nous vous contactons très vite pour en fixer la date.</p>
        <p>Votre devis reste consultable, et vous pourrez le signer à tout moment : <a href="https://heaventagency.com/mon-devis/${e(d.lien_token)}">voir mon devis</a>.</p>
        <p>À très vite,<br>Imane CHAIGARI — CEO, Heavent People Agency<br>+212 6 10 93 96 55 · ${ADMIN_EMAIL}</p></div>`,
    }).catch(() => {});
  }
  return json({ success: true, rdv: true });
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { token, nom, image, accepte, action, message, disponibilites } = await req.json();
    if (!/^[0-9a-f-]{36}$/i.test(String(token ?? ""))) return json({ error: "Lien invalide." }, 400);
    if (action === "rdv") return await demanderRendezVous(String(token), String(message ?? "").slice(0, 2000), String(disponibilites ?? "").slice(0, 300));
    if (!accepte) return json({ error: "Cochez « J'ai lu et j'accepte »." }, 400);
    if (!nom || String(nom).trim().length < 3) return json({ error: "Écrivez votre nom complet." }, 400);
    if (!/^data:image\/png;base64,/.test(String(image ?? "")) || String(image).length < 1500 || String(image).length > 400_000)
      return json({ error: "Dessinez votre signature dans le cadre." }, 400);

    const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "", { auth: { persistSession: false } });
    const { data: d } = await db.from("devis").select("*").eq("lien_token", token).maybeSingle();
    if (!d || d.statut === "annule") return json({ error: "Ce devis n'est plus disponible. Contactez-nous." }, 404);
    if (d.signe_le) return json({ error: "Ce devis a déjà été signé." }, 409);
    if (d.statut === "refuse") return json({ error: "Ce devis a été refusé. Contactez-nous pour une nouvelle proposition." }, 409);
    const aujourdhui = new Date(Date.now() + 3600_000).toISOString().slice(0, 10); // heure du Maroc
    if (d.date_validite && d.date_validite < aujourdhui) return json({ error: "Ce devis a expiré. Contactez-nous pour le renouveler." }, 410);

    const { data: lignes } = await db.from("devis_lignes").select("designation, quantite, duree, unite, prix_unitaire, remise_pct").eq("devis_id", d.id).order("ordre");
    const signeLe = new Date().toISOString();
    const preuve = {
      ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null, navigateur: req.headers.get("user-agent"),
      total_ttc: d.total_ttc, empreinte: await empreinte(JSON.stringify({ lignes, total: d.total_ttc, remise: d.remise_globale_pct, tva: d.taux_tva })), signe_le: signeLe,
    };
    const { error } = await db.from("devis").update({
      signe_le: signeLe, signature_nom: String(nom).trim().slice(0, 120), signature_image: image, signature_preuve: preuve, statut: "accepte",
    }).eq("id", d.id);
    if (error) return json({ error: "Signature non enregistrée : " + error.message }, 500);

    const { data: ag } = await db.from("parametres_agence").select("rib, raison_sociale").eq("id", 1).maybeSingle();
    const acompte = Math.round(Number(d.total_ttc) * Number(d.acompte_pct || 0)) / 100;
    // Facture d'acompte créée automatiquement (numéro définitif FAC-…), téléchargeable depuis la page du client
    let facture: { id: string; numero: string } | null = null;
    if (acompte > 0) {
      const { data: fa, error: errFa } = await db.rpc("facture_creer", { p_devis_id: d.id, p_type: "acompte", p_par: "signature en ligne" });
      if (errFa) console.error("facture d'acompte :", errFa.message); else facture = fa as any;
    }
    const cle = Deno.env.get("RESEND_API_KEY");
    if (cle) {
      const resend = new Resend(cle);
      await resend.emails.send({
        from: FROM, to: [ADMIN_EMAIL], reply_to: d.client_email || undefined,
        subject: `✅ Devis ${d.numero} accepté et signé — ${d.client_nom}`,
        html: `<p><b>${e(d.client_nom)}</b>${d.client_societe ? ` (${e(d.client_societe)})` : ""} a signé en ligne le devis <b>${e(d.numero)}</b> « ${e(d.titre ?? "")} »
          le ${new Date(signeLe).toLocaleString("fr-FR", { timeZone: "Africa/Casablanca" })}.</p>
          <p>Total TTC : <b>${mad(d.total_ttc)}</b>${acompte ? ` · acompte attendu : <b>${mad(acompte)}</b>` : ""}</p>
          ${facture ? `<p>🧾 La facture d'acompte <b>${e(facture.numero)}</b> a été créée et envoyée au client. Pense à la marquer « payée » à réception du virement (onglet Devis → Factures).</p>` : ""}
          <p>Le devis est passé en « Accepté » dans l'administration ; la signature figure sur le PDF.</p>`,
      }).catch(() => {});
      if (d.client_email) await resend.emails.send({
        from: FROM, to: [d.client_email], reply_to: ADMIN_EMAIL, subject: `Confirmation — devis ${d.numero} accepté`,
        html: `<div style="font-family:Arial,sans-serif;max-width:620px;color:#2a2420">
          <p>Bonjour ${e(d.client_nom)},</p>
          <p>Merci ! Votre accord sur le devis <b>${e(d.numero)}</b>${d.titre ? ` « ${e(d.titre)} »` : ""} est bien enregistré.</p>
          ${acompte ? `<div style="background:#FAF7EE;border:1px solid #ece6d3;border-radius:8px;padding:12px 16px">
            <b>Acompte à régler : ${mad(acompte)}</b> (${e(d.acompte_pct)} % du total TTC de ${mad(d.total_ttc)})<br>
            ${ag?.rib ? `Par virement — RIB : <b>${e(ag.rib)}</b><br>` : ""}Référence à indiquer : <b>${e(facture?.numero ?? d.numero)}</b></div>` : ""}
          ${facture ? `<p>Votre facture d'acompte <b>${e(facture.numero)}</b> est téléchargeable sur votre page : <a href="https://heaventagency.com/mon-devis/${e(d.lien_token)}#factures">télécharger ma facture</a>.</p>` : ""}
          <p>Votre devis signé reste consultable à tout moment : <a href="https://heaventagency.com/mon-devis/${e(d.lien_token)}">voir mon devis</a>.</p>
          <p>À très vite,<br>Imane CHAIGARI — CEO, Heavent People Agency<br>+212 6 10 93 96 55 · ${ADMIN_EMAIL}</p></div>`,
      }).then(() => facture && db.from("factures").update({ envoyee_le: new Date().toISOString() }).eq("id", facture.id)).catch(() => {});
    }
    return json({ success: true, signe_le: signeLe, acompte, rib: ag?.rib ?? null, numero: d.numero, facture: facture?.numero ?? null });
  } catch (err: any) {
    return json({ error: "Erreur interne : " + err.message }, 500);
  }
});
