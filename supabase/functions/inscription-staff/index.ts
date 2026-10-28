import { corsHeaders } from "../_shared/auth.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";
import { Resend } from "npm:resend@2.0.0";
import { avecOriginal, traduireChamps } from "../_shared/traduire.ts";

/**
 * Inscription d'un crew depuis le site : crée le compte de connexion (déjà confirmé, pas d'email de
 * validation à attendre), enregistre sa fiche, prévient l'agence et envoie un email de bienvenue.
 */
const ADMIN_EMAIL = "i.chaigari@heaventagency.com";
const FROM = "Heavent People Agency <noreply@heaventagency.com>";
const SITE = "https://heaventagency.com";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", ...corsHeaders } });
const e = (v: unknown) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
const txt = (v: unknown, max = 2000) => (v == null ? null : String(v).trim().slice(0, max) || null);
const int = (v: unknown) => { const n = parseInt(String(v ?? "")); return Number.isFinite(n) ? n : null; };
const date = (v: unknown) => (v && /^\d{4}-\d{2}-\d{2}/.test(String(v)) ? String(v).slice(0, 10) : null);

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Méthode non autorisée" }, 405);

  try {
    const d = await req.json();
    const email = String(d.email ?? "").trim().toLowerCase();
    const password = String(d.password ?? "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "L'adresse email n'est pas valide." }, 400);
    if (password.length < 8) return json({ error: "Le mot de passe doit contenir au moins 8 caractères." }, 400);
    if (!txt(d.nom) || !txt(d.prenom)) return json({ error: "Nom et prénom requis." }, 400);

    const admin = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { autoRefreshToken: false, persistSession: false } });

    // Anti-abus : 15 inscriptions maximum toutes les 10 minutes pour tout le site
    const depuis = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { count: recentes } = await admin.from("staff").select("id", { count: "exact", head: true }).gte("created_at", depuis);
    if ((recentes ?? 0) >= 15) return json({ error: "Beaucoup d'inscriptions en ce moment : réessayez dans quelques minutes." }, 429);

    const { data: existe } = await admin.from("staff").select("id").ilike("email", email).maybeSingle();
    if (existe) return json({ error: "Un compte avec cet email existe déjà. Connectez-vous, ou utilisez « Mot de passe oublié »." }, 409);

    // 1. Compte de connexion, directement confirmé
    const { data: cree, error: errCompte } = await admin.auth.admin.createUser({
      email, password, email_confirm: true, user_metadata: { first_name: txt(d.prenom), last_name: txt(d.nom) },
    });
    if (errCompte) {
      const deja = /already|registered|exists/i.test(errCompte.message);
      return json({ error: deja ? "Un compte avec cet email existe déjà. Connectez-vous, ou utilisez « Mot de passe oublié »." : "Création du compte impossible : " + errCompte.message }, deja ? 409 : 500);
    }

    // 2. Fiche du crew (textes libres traduits en français pour l'agence, original conservé)
    const t = await traduireChamps(d, ["competences", "langues", "experience", "couleur_cheveux", "couleur_yeux"]);
    const fr = (k: keyof typeof t, max = 2000) => txt(avecOriginal(t[k]), max);
    const fiche = {
      email, nom: txt(d.nom, 100), prenom: txt(d.prenom, 100), telephone: txt(d.telephone, 40), age: int(d.age), genre: txt(d.genre, 40),
      ville: txt(d.ville, 100), taille: int(d.taille), pointure: txt(d.pointure, 20), taille_confection: txt(d.taille_confection, 20),
      taille_pantalon: txt(d.taille_pantalon, 20), taille_haut: txt(d.taille_haut, 20), couleur_cheveux: fr("couleur_cheveux", 200),
      couleur_yeux: fr("couleur_yeux", 200), competences: fr("competences"), langues: fr("langues", 600), experience: fr("experience", 4000),
      permis: !!d.permis, disponibilites: txt(Array.isArray(d.availability) ? d.availability.join(", ") : d.availability, 300),
      photo: txt(d.photoPortrait, 300), photo_plein_pied: txt(d.photoPleinPied, 300), identite: txt(d.carteIdentite, 300),
      adresse_complete: txt(d.adresse_complete, 300), code_postal: txt(d.code_postal, 20), nationalite: txt(d.nationalite, 60),
      date_naissance: date(d.date_naissance), lieu_naissance: txt(d.lieu_naissance, 100), situation_familiale: txt(d.situation_familiale, 40),
      numero_identite: txt(d.numero_identite, 40), numero_securite_sociale: txt(d.numero_securite_sociale, 40), iban: txt(d.iban, 60),
      niveau_etudes: txt(d.niveau_etudes, 60), nom_urgence: txt(d.nom_urgence, 100), telephone_urgence: txt(d.telephone_urgence, 40),
    };
    const { error: errFiche } = await admin.from("staff").insert(fiche);
    if (errFiche) {
      await admin.auth.admin.deleteUser(cree.user!.id); // pas de compte sans fiche
      console.error(errFiche);
      return json({ error: "Erreur lors de l'enregistrement de vos informations. Veuillez réessayer." }, 500);
    }

    // 3. Emails (une panne d'email ne bloque pas l'inscription)
    const cle = Deno.env.get("RESEND_API_KEY");
    if (cle) {
      const resend = new Resend(cle);
      const ligne = (l: string, v: unknown) => `<p style="margin:2px 0"><strong>${l} :</strong> ${e(v || "—")}</p>`;
      await Promise.allSettled([
        resend.emails.send({
          from: FROM, to: [ADMIN_EMAIL], reply_to: email, subject: `Nouvelle inscription crew - ${fiche.prenom} ${fiche.nom}`,
          html: `<h2>Nouvelle inscription sur le site</h2>${ligne("Nom", `${fiche.prenom} ${fiche.nom}`)}${ligne("Email", email)}${ligne("Téléphone", fiche.telephone)}
            ${ligne("Ville", fiche.ville)}${ligne("Âge", fiche.age)}${ligne("Genre", fiche.genre)}${ligne("Langues", fiche.langues)}${ligne("Disponibilités", fiche.disponibilites)}
            <p>La fiche complète est dans l'administration, onglet Personnel.</p>`,
        }),
        resend.emails.send({
          from: FROM, to: [email], subject: "Bienvenue chez Heavent People Agency",
          html: `<div style="font-family:Arial,sans-serif;max-width:600px">
            <h2 style="color:#A8933F">Bienvenue ${e(fiche.prenom)} !</h2>
            <p>Votre inscription est bien enregistrée. Votre espace staff est déjà actif : vous pouvez y indiquer vos disponibilités, et vous y retrouverez vos contrats et fiches de paie.</p>
            <p><a href="${SITE}/auth" style="background:#C8B560;color:#141414;padding:10px 18px;border-radius:6px;text-decoration:none;font-weight:bold">Accéder à mon espace staff</a></p>
            <p>Identifiant : ${e(email)}<br>Mot de passe : celui choisi lors de l'inscription.</p>
            <p>À très bientôt,<br>L'équipe Heavent People Agency</p></div>`,
        }),
      ]);
    }

    return json({ success: true });
  } catch (err: any) {
    console.error("inscription-staff:", err);
    return json({ error: "Erreur interne, veuillez réessayer." }, 500);
  }
};

serve(handler);
