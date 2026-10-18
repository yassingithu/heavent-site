import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";
import { Resend } from "npm:resend@2.0.0";

/**
 * Passage quotidien (9 h, heure du Maroc), lancé par la base :
 *  1. relance des devis envoyés sans réponse : à J+5 puis J+10 (tant qu'ils sont valables) ;
 *  2. demande d'avis Google le lendemain d'un événement dont le devis est accepté (si le lien est renseigné).
 * ?essai=1 : ne rien envoyer, juste lister.
 */
const ADMIN_EMAIL = "i.chaigari@heaventagency.com";
const FROM = "Heavent People Agency <noreply@heaventagency.com>";
const e = (v: unknown) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
const mad = (n: unknown) => `${new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(n) || 0)} MAD`;
const dateFr = (d?: string | null) => (d ? new Date(d + "T12:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : "");
const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));
const JOUR = 864e5;

function emailRelance(d: any, n: number) {
  const lien = `https://heaventagency.com/mon-devis/${d.lien_token}`;
  return `<div style="font-family:Arial,sans-serif;max-width:620px;color:#2a2420">
    <p>Bonjour ${e(d.client_nom)},</p>
    <p>${n === 1 ? "Nous espérons que notre proposition vous a plu ! Avez-vous eu le temps de consulter votre devis ?" : "Petit rappel : votre devis est toujours disponible, et nous serions ravis d'organiser votre événement."}</p>
    <div style="background:#FAF7EE;border:1px solid #ece6d3;border-radius:8px;padding:12px 16px">
      <b>Devis ${e(d.numero)}</b>${d.titre ? ` — ${e(d.titre)}` : ""}<br>Total TTC : <b>${mad(d.total_ttc)}</b>
      ${d.date_validite ? `<br>Valable jusqu'au ${e(dateFr(d.date_validite))}` : ""}</div>
    <p style="margin:22px 0"><a href="${lien}" style="background:#141414;color:#fff;text-decoration:none;padding:12px 22px;border-radius:999px;display:inline-block">Consulter et signer mon devis</a></p>
    <p style="font-size:13px;color:#555">Une question, une modification ? Répondez simplement à cet e-mail ou appelez-nous au +212 6 10 93 96 55.</p>
    <p>Bien à vous,<br>Imane CHAIGARI — CEO, Heavent People Agency</p></div>`;
}
function emailAvis(d: any, lien: string) {
  return `<div style="font-family:Arial,sans-serif;max-width:620px;color:#2a2420">
    <p>Bonjour ${e(d.client_nom)},</p>
    <p>Merci de nous avoir fait confiance pour ${d.titre ? `« ${e(d.titre)} »` : "votre événement"} ! Nous espérons que tout s'est passé comme vous l'imaginiez.</p>
    <p>Votre avis compte énormément pour notre petite équipe : il aide d'autres familles et entreprises à nous découvrir. Cela ne prend qu'une minute.</p>
    <p style="margin:22px 0"><a href="${e(lien)}" style="background:#C8B560;color:#fff;text-decoration:none;padding:12px 22px;border-radius:999px;display:inline-block">⭐ Laisser un avis sur Google</a></p>
    <p>Avec toute notre gratitude,<br>Imane CHAIGARI et l'équipe Heavent People Agency</p></div>`;
}

serve(async (req) => {
  const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "", { auth: { persistSession: false } });
  const { data: secret } = await db.from("secrets_internes").select("valeur").eq("nom", "rappel_signatures").maybeSingle();
  if (!secret?.valeur || req.headers.get("x-cle-rappel") !== secret.valeur) return new Response("Accès refusé", { status: 403 });
  const essai = new URL(req.url).searchParams.get("essai") === "1";
  const resend = new Resend(Deno.env.get("RESEND_API_KEY") ?? "");
  const maintenant = Date.now();
  const aujourdhui = new Date(maintenant + 3600_000).toISOString().slice(0, 10);
  const rapport: { relances: string[]; avis: string[] } = { relances: [], avis: [] };

  // 1. Relances
  const { data: envoyes } = await db.from("devis").select("*").eq("statut", "envoye").is("signe_le", null).not("client_email", "is", null).not("date_envoi", "is", null).lt("relances", 2);
  for (const d of envoyes ?? []) {
    if (d.date_validite && d.date_validite < aujourdhui) continue;
    const depuis = (maintenant - new Date(d.date_envoi).getTime()) / JOUR;
    const n = d.relances === 0 && depuis >= 5 ? 1 : d.relances === 1 && depuis >= 10 ? 2 : 0;
    if (!n) continue;
    if (!essai) {
      const r = await resend.emails.send({ from: FROM, to: [d.client_email], reply_to: ADMIN_EMAIL, subject: n === 1 ? `Votre devis ${d.numero} — avez-vous des questions ?` : `Rappel : votre devis ${d.numero} vous attend`, html: emailRelance(d, n) });
      if ((r as any)?.error) continue;
      await db.from("devis").update({ relances: n, derniere_relance_le: new Date().toISOString() }).eq("id", d.id);
      await pause(600);
    }
    rapport.relances.push(`${d.numero} → ${d.client_email} (relance ${n})`);
  }

  // 2. Avis Google, le lendemain de l'événement (fenêtre de 14 jours, une seule fois par devis)
  const { data: ag } = await db.from("parametres_agence").select("lien_avis_google").eq("id", 1).maybeSingle();
  const lien = ag?.lien_avis_google?.trim();
  if (lien) {
    const debut = new Date(maintenant - 14 * JOUR).toISOString().slice(0, 10);
    const { data: acceptes } = await db.from("devis").select("*").eq("statut", "accepte").is("avis_demande_le", null).not("client_email", "is", null);
    for (const d of acceptes ?? []) {
      const fin = d.date_fin_evenement ?? d.date_evenement;
      if (!fin || fin >= aujourdhui || fin < debut) continue;
      if (!essai) {
        const r = await resend.emails.send({ from: FROM, to: [d.client_email], reply_to: ADMIN_EMAIL, subject: "Merci ! Votre avis compte pour nous ⭐", html: emailAvis(d, lien) });
        if ((r as any)?.error) continue;
        await db.from("devis").update({ avis_demande_le: new Date().toISOString() }).eq("id", d.id);
        await pause(600);
      }
      rapport.avis.push(`${d.numero} → ${d.client_email}`);
    }
  }
  return new Response(JSON.stringify({ essai, ...rapport }), { headers: { "Content-Type": "application/json" } });
});
