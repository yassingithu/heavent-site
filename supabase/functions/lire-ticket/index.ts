import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { getCaller, deny, corsHeaders } from "../_shared/auth.ts";

/**
 * Lecture d'un ticket ou d'une facture (photo) pour préremplir une dépense : date, montant TTC, TVA, fournisseur, moyen de paiement.
 * - Réservé aux administrateurs connectés (getCaller) ;
 * - fournisseur : Groq, modèle de vision (secret GROQ_API_KEY ; modèle changeable avec LIRE_TICKET_MODELE) ;
 * - ne devine jamais : un champ illisible reste vide (null) ; le site marque les champs lus et demande une vérification (confirmation en plus si le montant est inhabituel) ;
 * - Groq saturé ou en panne : { disponible: false }, la saisie à la main reste possible, rien n'est bloqué.
 */
const MODELE_FORCE = Deno.env.get("LIRE_TICKET_MODELE");
const PREFERES = ["meta-llama/llama-4-scout-17b-16e-instruct", "meta-llama/llama-4-maverick-17b-128e-instruct"];
/** Modèles de vision réellement offerts par la clé Groq (la liste change : on la lit au lieu de la deviner). */
let modelesCache: { at: number; liste: string[] } | null = null;
async function modelesVision(cle: string): Promise<string[]> {
  if (modelesCache && Date.now() - modelesCache.at < 3600_000) return modelesCache.liste;
  try {
    const r = await fetch("https://api.groq.com/openai/v1/models", { headers: { Authorization: `Bearer ${cle}` } });
    if (!r.ok) return PREFERES;
    const ids: string[] = ((await r.json())?.data ?? []).map((m: any) => String(m.id));
    const vision = ids.filter((i) => /llama-4|vision|-vl|pixtral|gemma-3|qwen/i.test(i) && !/guard|whisper|tts/i.test(i));
    vision.sort((a, b) => Number(/scout/i.test(b)) - Number(/scout/i.test(a)) || Number(/maverick/i.test(b)) - Number(/maverick/i.test(a)));
    console.log("lire-ticket modèles de vision :", vision.join(", ") || "aucun", "| tous :", ids.join(", "));
    modelesCache = { at: Date.now(), liste: vision.length ? vision : PREFERES };
    return modelesCache.liste;
  } catch { return PREFERES; }
}
const MOYENS = ["especes", "carte", "virement", "cheque"];
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...corsHeaders, "Content-Type": "application/json" } });

const CONSIGNE = `Tu lis la photo d'un ticket de caisse ou d'une facture (Maroc : textes en français et/ou en arabe, montants en dirhams MAD/DH).
Réponds UNIQUEMENT avec un objet JSON de cette forme :
{"date":"AAAA-MM-JJ" ou null,"montant_ttc":nombre ou null,"tva":nombre ou null,"fournisseur":texte ou null,"ice":"15 chiffres" ou null,"identifiant_fiscal":"chiffres" ou null,"moyen_paiement":"especes"|"carte"|"virement"|"cheque"|null}
Règles :
- Les dates marocaines s'écrivent JJ/MM/AAAA : convertis-les en AAAA-MM-JJ.
- montant_ttc = le TOTAL À PAYER toutes taxes comprises (pas un sous-total, pas la monnaie rendue, pas l'espèce donnée).
- tva = le montant de TVA en dirhams s'il est écrit (pas le pourcentage), sinon null.
- fournisseur = le nom du commerce ou de la société en haut du ticket.
- ice = l'ICE (Identifiant Commun de l'Entreprise, 15 chiffres) du commerce, écrit « ICE » sur le ticket ; identifiant_fiscal = l'IF (identifiant fiscal), écrit « IF » ou « I.F. » ; ne confonds pas avec RC, patente, CNSS ou numéro de téléphone.
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

    const modeles = MODELE_FORCE ? [MODELE_FORCE] : (await modelesVision(cle)).slice(0, 3);
    let rep: Response | null = null;
    for (const modele of modeles) {
      const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 25_000);
      try {
        rep = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST", signal: ctrl.signal, headers: { Authorization: `Bearer ${cle}`, "content-type": "application/json" },
          body: JSON.stringify({
            model: modele, temperature: 0, max_completion_tokens: 400, response_format: { type: "json_object" },
            messages: [{ role: "user", content: [{ type: "text", text: CONSIGNE }, { type: "image_url", image_url: { url: img } }] }],
          }),
        });
      } finally { clearTimeout(t); }
      if (rep.ok) break;
      console.error("lire-ticket groq", modele, rep.status, (await rep.text()).slice(0, 300));
      if (rep.status !== 404 && rep.status !== 400) break; // modèle absent ou refusé : on essaie le suivant ; sinon on s'arrête
      modelesCache = null;
    }
    if (!rep || !rep.ok) return json({ disponible: false, raison: rep?.status === 429 ? "quota" : "erreur" });
    const donnees = await rep.json();
    const m = String(donnees?.choices?.[0]?.message?.content ?? "").match(/\{[\s\S]*\}/);
    const brut = m ? JSON.parse(m[0]) : null;
    if (!brut) return json({ disponible: true, champs: {} });

    // Contrôles : une valeur invraisemblable est écartée plutôt que proposée
    const aujourdhui = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Casablanca" }).format(new Date());
    const limiteBasse = `${Number(aujourdhui.slice(0, 4)) - 2}${aujourdhui.slice(4)}`;
    const date = typeof brut.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(brut.date) && brut.date <= aujourdhui && brut.date >= limiteBasse ? brut.date : null;
    let montant = nombre(brut.montant_ttc); if (montant !== null && (montant <= 0 || montant > 200_000)) montant = null;
    let tva = nombre(brut.tva); if (tva !== null && (tva < 0 || (montant !== null && tva >= montant))) tva = null;
    // TVA marocaine : 20 %, 14 %, 10 % ou 7 % du hors-taxe ; sinon la valeur lue est écartée plutôt que proposée
    if (tva !== null) {
      if (montant === null) tva = null;
      else { const taux = tva / (montant - tva); if (![0.2, 0.14, 0.1, 0.07].some((t) => Math.abs(taux - t) <= 0.01)) tva = null; }
    }
    const fournisseur = typeof brut.fournisseur === "string" ? brut.fournisseur.replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, 80) || null : null;
    const chiffres = (v: unknown) => String(v ?? "").replace(/\D/g, "");
    const ice = chiffres(brut.ice).length === 15 ? chiffres(brut.ice) : null;
    const idf = /^\d{3,12}$/.test(chiffres(brut.identifiant_fiscal)) ? chiffres(brut.identifiant_fiscal) : null;
    const moyen = typeof brut.moyen_paiement === "string" && MOYENS.includes(brut.moyen_paiement) ? brut.moyen_paiement : null;
    return json({ disponible: true, champs: { date, montant_ttc: montant, tva, fournisseur, ice, identifiant_fiscal: idf, moyen_paiement: moyen } });
  } catch (e) {
    console.error("lire-ticket:", e);
    return json({ disponible: false, raison: "erreur" });
  }
});
