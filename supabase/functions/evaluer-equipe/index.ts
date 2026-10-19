import { corsHeaders } from "../_shared/auth.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";
import { Resend } from "npm:resend@2.0.0";
import { avecOriginal, htmlTraduit, versFrancais } from "../_shared/traduire.ts";

/**
 * Après l'événement, le client note le service et chaque crew depuis son lien de devis,
 * et peut demander à retravailler avec la même équipe. L'agence reçoit le résumé (en français).
 */
const ADMIN_EMAIL = "i.chaigari@heaventagency.com";
const FROM = "Heavent People Agency <noreply@heaventagency.com>";
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", ...corsHeaders } });
const e = (v: unknown) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
const etoiles = (n: number) => "★".repeat(n) + "☆".repeat(5 - n);
const note = (v: unknown) => { const n = Math.round(Number(v)); return n >= 1 && n <= 5 ? n : null; };

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { token, note: noteGlobale, commentaire, crews, reprendre, publiable } = await req.json();
    if (!/^[0-9a-f-]{36}$/i.test(String(token ?? ""))) return json({ error: "Lien invalide." }, 400);
    const ng = note(noteGlobale);
    if (!ng) return json({ error: "Choisissez une note de 1 à 5 étoiles." }, 400);
    const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "", { auth: { persistSession: false } });
    const { data: d } = await db.from("devis").select("id, numero, titre, client_nom, client_societe, client_email, statut, date_evenement, avis_le").eq("lien_token", token).maybeSingle();
    if (!d || d.statut !== "accepte") return json({ error: "Ce devis n'est pas disponible." }, 404);
    if (d.date_evenement && d.date_evenement > new Date().toISOString().slice(0, 10)) return json({ error: "Vous pourrez donner votre avis après l'événement." }, 409);

    const { data: equipe } = await db.from("affectations").select("staff_id, staff(prenom, nom)").eq("devis_id", d.id).neq("statut", "annule");
    const membres = new Map((equipe ?? []).map((a: any) => [a.staff_id, a.staff]));
    const tg = await versFrancais(String(commentaire ?? "").slice(0, 2000));
    const notesCrew: { staff_id: string; note: number; commentaire: string | null; t: any }[] = [];
    for (const c of Array.isArray(crews) ? crews : []) {
      const n = note(c?.note);
      if (!n || !membres.has(c?.id)) continue;
      const tc = await versFrancais(String(c?.commentaire ?? "").slice(0, 500));
      notesCrew.push({ staff_id: c.id, note: n, commentaire: avecOriginal(tc) || null, t: tc });
    }
    await db.from("devis").update({ avis_note: ng, avis_commentaire: avecOriginal(tg) || null, avis_le: new Date().toISOString(), reprendre_equipe: !!reprendre, avis_publiable: !!publiable && !!tg.texte }).eq("id", d.id);
    if (notesCrew.length) {
      await db.from("evaluations_crew").upsert(notesCrew.map(({ t: _t, ...x }) => ({ ...x, devis_id: d.id })), { onConflict: "devis_id,staff_id" });
    }

    const cle = Deno.env.get("RESEND_API_KEY");
    if (cle && !d.avis_le) {
      await new Resend(cle).emails.send({
        from: FROM, to: [ADMIN_EMAIL], reply_to: d.client_email || undefined,
        subject: `${ng >= 4 ? "⭐" : "⚠️"} Avis client ${ng}/5 — ${d.client_societe || d.client_nom} (${d.titre || d.numero})`,
        html: `<div style="font-family:Arial,sans-serif;max-width:620px">
          <p><b>${e(d.client_societe || d.client_nom)}</b> a donné son avis sur « ${e(d.titre || d.numero)} » :</p>
          <p style="font-size:20px;color:#A8933F">${etoiles(ng)} <span style="color:#333;font-size:14px">${ng}/5</span></p>
          ${tg.texte ? `<p style="white-space:pre-line">${htmlTraduit(tg, e)}</p>` : ""}
          ${notesCrew.length ? `<p><b>L'équipe :</b></p><ul>${notesCrew.map((c) => { const s: any = membres.get(c.staff_id); return `<li>${e(s?.prenom)} ${e(s?.nom)} — <span style="color:#A8933F">${etoiles(c.note)}</span>${c.t.texte ? ` : ${htmlTraduit(c.t, e)}` : ""}</li>`; }).join("")}</ul>` : ""}
          ${publiable && tg.texte ? `<p>✅ Le client accepte que son avis soit publié sur le site : un clic dans l'admin (onglet Site → Témoignages) pour l'afficher.</p>` : ""}
          ${reprendre ? `<p>🔁 <b>Le client souhaite retravailler avec la même équipe</b> pour son prochain événement.</p>` : ""}
          ${ng <= 3 ? `<p style="color:#b42318">Note basse : un petit appel au client peut aider.</p>` : ""}
        </div>`,
      }).catch(() => {});
    }
    const { data: ag } = await db.from("parametres_agence").select("lien_avis_google").eq("id", 1).maybeSingle();
    return json({ success: true, avis_google: ng >= 4 ? (ag?.lien_avis_google?.trim() || null) : null });
  } catch (err: any) {
    console.error("evaluer-equipe:", err);
    return json({ error: "Erreur interne : " + err.message }, 500);
  }
});
