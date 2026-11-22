import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { getCaller, deny, corsHeaders } from "../_shared/auth.ts";

/**
 * Lecture d'un ticket ou d'une facture (photo) pour préremplir une dépense : date, montant TTC, TVA, fournisseur, moyen de paiement.
 * - Réservé aux administrateurs connectés (getCaller) ;
 * - fournisseur : Groq, modèle de vision (secret GROQ_API_KEY ; modèle changeable avec LIRE_TICKET_MODELE) ;
 * - ne devine jamais : un champ illisible reste vide (null) et le site demande toujours une vérification avant d'enregistrer ;
 * - Groq saturé ou en panne : { disponible: false }, la saisie à la main reste possible, rien n'est bloqué.
 */
const MODELE = Deno.env.get("LIRE_TICKET_MODELE") ?? "meta-llama/llama-4-scout-17b-16e-instruct";
const MOYENS = ["especes", "carte", "virement", "cheque"];
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...corsHeaders, "Content-Type": "application/json" } });

const CONSIGNE = `Tu lis la photo d'un ticket de caisse ou d'une facture (Maroc : textes en français et/ou en arabe, montants en dirhams MAD/DH).
Réponds UNIQUEMENT avec un objet JSON de cette forme :
{"date":"AAAA-MM-JJ" ou null,"montant_ttc":nombre ou null,"tva":nombre ou null,"fournisseur":texte ou null,"moyen_paiement":"especes"|"carte"|"virement"|"cheque"|null}
Règles :
- Les dates marocaines s'écrivent JJ/MM/AAAA : convertis-les en AAAA-MM-JJ.
- montant_ttc = le TOTAL À PAYER toutes taxes comprises (pas un sous-total, pas la monnaie rendue, pas l'espèce donnée).
- tva = le montant de TVA en dirhams s'il est écrit (pas le pourcentage), sinon null.
- fournisseur = le nom du commerce ou de la société en haut du ticket.
- moyen_paiement seulement s'il est écrit (ESPECES, CB, CARTE, CHEQUE, VIREMENT), sinon null.
- Si une information est illisible ou absente, mets null. Ne devine jamais, n'invente jamais.`;

const limites = new Map<string, number[]>();
const autorise = (email: string) => {
  const maintenant = Date.now(), l = (limites.get(email) ?? []).filter((t) => maintenant - t < 3600_000);
  if (l.length >= 60) { limites.set(email, l); return false; }
  l.push(maintenant); limites.set(email, l); return true;
};

const nombre = (v: unknown) => {
  const n = typeof v === "number" ? v : Number(String(v ?? "").replace(/[^\d.,-]/g, "").replace(",", "."));
  return Number.isFinite(n) ? Math.round(n * 100) / 100 : null;
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const caller = await getCaller(req);
    if (!caller?.isAdmin) return deny(401, "Réservé à l'administration.");
    if (!autorise(caller.email)) return json({ disponible: false, raison: "limite" });
    const { image } = await req.json();
    const img = String(image ?? "");
    if (!/^data:image\/(jpeg|png|webp);base64,/.test(img) || img.length > 3_000_000) return json({ error: "Image non valide ou trop lourde." }, 400);
    const cle = Deno.env.get("GROQ_API_KEY");
    if (!cle) return json({ disponible: false, raison: "cle" });

    const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 25_000);
    let rep: Response;
    try {
      rep = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST", signal: ctrl.signal, headers: { Authorization: `Bearer ${cle}`, "content-type": "application/json" },
        body: JSON.stringify({
          model: MODELE, temperature: 0, max_completion_tokens: 300, response_format: { type: "json_object" },
          messages: [{ role: "user", content: [{ type: "text", text: CONSIGNE }, { type: "image_url", image_url: { url: img } }] }],
        }),
      });
    } finally { clearTimeout(t); }
    if (!rep.ok) { console.error("lire-ticket groq", rep.status, (await rep.text()).slice(0, 300)); return json({ disponible: false, raison: rep.status === 429 ? "quota" : "erreur" }); }
    const donnees = await rep.json();
    const m = String(donnees?.choices?.[0]?.message?.content ?? "").match(/\{[\s\S]*\}/);
    const brut = m ? JSON.parse(m[0]) : null;
    if (!brut) return json({ disponible: true, champs: {} });

    // Contrôles : une valeur invraisemblable est écartée plutôt que proposée
    const aujourdhui = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Casablanca" }).format(new Date());
    const limiteBasse = `${Number(aujourdhui.slice(0, 4)) - 2}${aujourdhui.slice(4)}`;
    const date = typeof brut.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(brut.date) && brut.date <= aujourdhui && brut.date >= limiteBasse ? brut.date : null;
    let montant = nombre(brut.montant_ttc); if (montant !== null && (montant <= 0 || montant > 1_000_000)) montant = null;
    let tva = nombre(brut.tva); if (tva !== null && (tva < 0 || (montant !== null && tva >= montant))) tva = null;
    const fournisseur = typeof brut.fournisseur === "string" ? brut.fournisseur.replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, 80) || null : null;
    const moyen = typeof brut.moyen_paiement === "string" && MOYENS.includes(brut.moyen_paiement) ? brut.moyen_paiement : null;
    return json({ disponible: true, champs: { date, montant_ttc: montant, tva, fournisseur, moyen_paiement: moyen } });
  } catch (e) {
    console.error("lire-ticket:", e);
    return json({ disponible: false, raison: "erreur" });
  }
});
