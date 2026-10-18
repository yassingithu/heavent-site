import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";
import { Resend } from "npm:resend@2.0.0";
import { avecOriginal, htmlTraduit, versFrancais } from "../_shared/traduire.ts";

/** Prévient l'agence par e-mail quand un crew laisse une remarque sur son contrat (appelé par la base). */
const ADMIN_EMAIL = "i.chaigari@heaventagency.com";
const FROM = "Heavent People Agency <noreply@heaventagency.com>";
const TYPES: Record<string, string> = { heures_sup: "⏱️ Heures en plus", frais: "🧾 Frais / charge", autre: "💬 Remarque" };
const esc = (s: unknown) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));

serve(async (req) => {
  const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: secret } = await db.from("secrets_internes").select("valeur").eq("nom", "rappel_signatures").maybeSingle();
  if (!secret?.valeur || req.headers.get("x-cle-rappel") !== secret.valeur) return new Response("Accès refusé", { status: 403 });
  const { id } = await req.json();
  const { data: r } = await db.from("remarques_contrat").select("*, staff(prenom, nom), contrats(titre, evenement, devis(titre, numero))").eq("id", id).maybeSingle();
  if (!r) return new Response("Introuvable", { status: 404 });

  // Remarque écrite en arabe ou en anglais : traduite en français pour l'agence (l'original reste visible)
  const t = await versFrancais(r.message);
  if (t.traduit) await db.from("remarques_contrat").update({ message: avecOriginal(t) }).eq("id", id);

  const quoi = r.contrats?.devis?.titre || r.contrats?.evenement || r.contrats?.titre || "contrat";
  const details = [
    r.date_jour ? new Date(r.date_jour + "T12:00:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }) : null,
    r.heures ? `+${r.heures} h` : null, r.montant ? `${r.montant} MAD` : null,
  ].filter(Boolean).join(" · ");
  await new Resend(Deno.env.get("RESEND_API_KEY") ?? "").emails.send({
    from: FROM, to: [ADMIN_EMAIL],
    subject: `${TYPES[r.type] ?? "Remarque"} — ${r.staff?.prenom} ${r.staff?.nom} (${quoi})`,
    html: `<div style="font-family:Arial,sans-serif;max-width:600px">
      <p><b>${esc(r.staff?.prenom)} ${esc(r.staff?.nom)}</b> a laissé une remarque sur son contrat « ${esc(quoi)} » :</p>
      <div style="background:#FAF7EE;border:1px solid #ece6d3;border-radius:8px;padding:12px 16px">
        <b>${TYPES[r.type] ?? "Remarque"}</b>${details ? ` — ${esc(details)}` : ""}<p style="white-space:pre-line;margin:8px 0 0">${htmlTraduit(t, esc)}</p></div>
      <p><a href="https://heaventagency.com/admin">Répondre depuis l'administration</a> (onglet Contrats → Remarques des crews).</p></div>`,
  });
  return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" } });
});
