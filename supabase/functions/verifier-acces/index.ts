import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";
import { Resend } from "npm:resend@2.0.0";

/**
 * Vérification par code e-mail (lien transféré ≠ signataire).
 *  - action "demander" : envoie un code à 6 chiffres à l'adresse du devis (ou à l'adresse de remplacement indiquée par l'agence) ;
 *  - action "verifier" : contrôle le code et remet une « preuve » valable 30 min, exigée ensuite par signer-devis.
 * Sans connexion automatique : l'appelant est contrôlé par le jeton du devis (lien_token) et par les limites en base.
 */
const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };
const FROM = "Heavent People Agency <noreply@heaventagency.com>";
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", ...corsHeaders } });
const e = (v: unknown) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
const masque = (m: string) => m.replace(/^(.).*(@.*)$/, (_, a, b) => `${a}•••${b}`);

const TEXTES: Record<string, { objet: string; intro: string; code: string; valide: string; ignore: string; dir?: string }> = {
  fr: { objet: "Votre code de vérification Heavent", intro: "Voici votre code pour confirmer cette action sur votre devis", code: "Code", valide: "Il est valable 10 minutes.", ignore: "Si vous n'êtes pas à l'origine de cette demande, ne communiquez ce code à personne et ignorez cet e-mail." },
  en: { objet: "Your Heavent verification code", intro: "Here is your code to confirm this action on your quote", code: "Code", valide: "It is valid for 10 minutes.", ignore: "If you did not request this, do not share the code with anyone and ignore this e-mail." },
  ar: { objet: "رمز التحقق الخاص بك من Heavent", intro: "هذا هو رمزك لتأكيد هذا الإجراء على عرض الأسعار الخاص بك", code: "الرمز", valide: "صالح لمدة 10 دقائق.", ignore: "إذا لم تكن أنت من طلب ذلك، فلا تشارك الرمز مع أحد وتجاهل هذه الرسالة.", dir: "rtl" },
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { token, action, code, langue } = await req.json();
    if (!/^[0-9a-f-]{36}$/i.test(String(token ?? ""))) return json({ error: "Lien invalide." }, 400);
    const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "", { auth: { persistSession: false } });

    if (action === "demander") {
      const { data, error } = await db.rpc("_verif_demander", { p_token: token });
      if (error) return json({ error: error.message }, error.message.startsWith("Trop") ? 429 : 400);
      const r = Array.isArray(data) ? data[0] : data;
      const cle = Deno.env.get("RESEND_API_KEY");
      const annuler = async () => { // un code jamais parti ne compte pas dans la limite horaire
        const { data: l } = await db.from("verifications_devis").select("id").eq("devis_id", r.devis_id).order("cree_le", { ascending: false }).limit(1).maybeSingle();
        if (l?.id) await db.from("verifications_devis").delete().eq("id", l.id);
      };
      if (!cle) { await annuler(); return json({ error: "L'envoi d'e-mails n'est pas configuré. Contactez l'agence." }, 500); }
      const t = TEXTES[String(langue)] ?? TEXTES.fr;
      const res = await new Resend(cle).emails.send({
        from: FROM, to: [r.email], subject: t.objet,
        html: `<div dir="${t.dir ?? "ltr"}" style="font-family:Arial,sans-serif;max-width:480px;color:#2a2420">
          <p>${e(t.intro)} ${e(r.numero)}.</p>
          <p style="font-size:30px;letter-spacing:8px;font-weight:bold;background:#FAF7EE;border:1px solid #ece6d3;border-radius:8px;padding:12px 16px;text-align:center" dir="ltr">${e(r.code)}</p>
          <p>${e(t.valide)}</p><p style="color:#888;font-size:12px">${e(t.ignore)}</p></div>`,
      });
      if ((res as any)?.error) { await annuler(); return json({ error: "L'e-mail n'a pas pu être envoyé. Réessayez ou contactez l'agence." }, 502); }
      return json({ success: true, envoye_a: masque(String(r.email)) });
    }

    if (action === "verifier") {
      const { data, error } = await db.rpc("_verif_verifier", { p_token: token, p_code: String(code ?? "").slice(0, 12) });
      if (error) return json({ error: error.message }, 400);
      if (String(data).startsWith("!")) return json({ error: String(data).slice(1) }, 400);
      return json({ success: true, preuve: data });
    }
    return json({ error: "Action inconnue." }, 400);
  } catch (err: any) {
    return json({ error: "Erreur interne." }, 500);
  }
});
