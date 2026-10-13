import { getCaller, deny, corsHeaders } from "../_shared/auth.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";

const ADMIN_EMAIL = "i.chaigari@heaventagency.com";
const FROM = "Heavent People Agency <noreply@heaventagency.com>";
const resendKey = Deno.env.get("RESEND_API_KEY");
const resend = resendKey ? new Resend(resendKey) : null;

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

// Échappe le texte saisi par les visiteurs avant de l'insérer dans un email HTML
const e = (v: unknown) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
const row = (label: string, value: unknown) => `<p><strong>${label} :</strong> ${e(value || "Non renseigné")}</p>`;
const list = (v: unknown) => (Array.isArray(v) ? v.join(", ") : v);
const intOrNull = (v: unknown) => { const n = parseInt(String(v ?? "")); return Number.isFinite(n) ? n : null; };
const dateOrNull = (v: unknown) => (v && /^\d{4}-\d{2}-\d{2}/.test(String(v)) ? String(v).slice(0, 10) : null);

const SERVICES_MARIAGE: Record<string, string> = {
  dj: "DJ / Animation musicale", decoration: "Décoration", photo: "Photographe", video: "Vidéaste", catering: "Traiteur",
  transport: "Transport", ceremony: "Officiant de cérémonie", hostess: "Hôtes/Hôtesses d'accueil", planning: "Wedding planner",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", ...corsHeaders } });

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { type, data } = await req.json();
    let subject = "";
    let html = "";
    let to = ADMIN_EMAIL;

    switch (type) {
      case "contact":
        subject = `Nouveau message de contact - ${data.name}`;
        html = `<h2>Nouveau message de contact</h2>${row("Nom", data.name)}${row("Email", data.email)}${row("Sujet", data.subject)}<p><strong>Message :</strong></p><p style="white-space:pre-line">${e(data.message)}</p>`;
        break;

      case "wedding": {
        // Le formulaire envoie eventDate / eventLocation / eventType (anciens noms acceptés aussi)
        const date = data.eventDate ?? data.weddingDate;
        const lieu = data.eventLocation ?? data.weddingLocation ?? data.ceremonyLocation ?? data.receptionLocation;
        const services = list(Array.isArray(data.services) ? data.services.map((x: string) => SERVICES_MARIAGE[x] ?? x) : data.services);
        subject = `Nouvelle demande de devis ${data.eventType || "mariage"} - ${data.brideName}${data.groomName ? ` & ${data.groomName}` : ""}`;
        html = `<h2>Nouvelle demande de devis ${e(data.eventType || "mariage")}</h2>
          ${row("Contact", `${data.brideName}${data.groomName ? ` & ${data.groomName}` : ""}`)}${row("Email", data.contactEmail)}${row("Téléphone", data.contactPhone)}
          ${row("Type d'événement", data.eventType)}${row("Date", date)}${row("Lieu", lieu)}${row("Lieu de cérémonie", data.ceremonyLocation)}
          ${row("Lieu de réception", data.receptionLocation)}${row("Nombre d'invités", data.guestCount)}${row("Budget estimé", data.budget)}
          ${row("Prestations demandées", services)}<p><strong>Demandes spéciales :</strong></p><p style="white-space:pre-line">${e(data.specialRequests || "Aucune")}</p>`;
        const { error } = await supabase.from("devis_mariage").insert({
          nom: data.brideName, prenom: data.groomName || "", email: data.contactEmail, telephone: data.contactPhone,
          type_evenement: data.eventType || "Mariage", date_mariage: dateOrNull(date), lieu: lieu || null,
          nb_invites: intOrNull(data.guestCount), services: services || null,
          remarques: [data.specialRequests, data.budget && `Budget : ${data.budget}`, data.ceremonyLocation && `Cérémonie : ${data.ceremonyLocation}`, data.receptionLocation && `Réception : ${data.receptionLocation}`].filter(Boolean).join("\n") || null,
        });
        if (error) { console.error(error); return json({ error: "Erreur lors de l'enregistrement de la demande" }, 500); }
        break;
      }

      case "business": {
        subject = `Nouvelle demande de devis entreprise - ${data.companyName}`;
        html = `<h2>Nouvelle demande de devis entreprise</h2>
          ${row("Entreprise", data.companyName)}${row("Contact", data.contactName)}${row("Email", data.contactEmail)}${row("Téléphone", data.contactPhone)}
          ${row("Secteur", data.sector)}${row("Type d'événement", data.eventType)}${row("Date", data.eventDate)}${row("Lieu", data.eventLocation)}
          ${row("Nombre de personnes", data.staffCount)}${row("Budget estimé", data.budget)}${row("Critères spécifiques", data.requirements)}${row("Commentaires", data.comments)}`;
        const nomComplet = String(data.contactName ?? "").trim();
        const [prenom, ...reste] = nomComplet.split(/\s+/);
        const { error } = await supabase.from("devis_entreprise").insert({
          entreprise: data.companyName, prenom: prenom || "", nom: reste.join(" ") || nomComplet,
          email: data.contactEmail, telephone: data.contactPhone, date_evenement: dateOrNull(data.eventDate),
          lieu: data.eventLocation, nb_personnes: intOrNull(data.staffCount), nb_staff: intOrNull(data.staffCount),
          services: data.eventType, remarques: [data.requirements, data.comments].filter(Boolean).join("\n") || null,
        });
        if (error) { console.error(error); return json({ error: "Erreur lors de l'enregistrement de la demande" }, 500); }
        break;
      }

      case "staff":
        subject = `Nouvelle candidature staff - ${data.nom} ${data.prenom}`;
        html = `<h2>Nouvelle candidature staff</h2>${row("Nom", `${data.nom} ${data.prenom}`)}${row("Email", data.email)}${row("Téléphone", data.telephone)}
          ${row("Âge", data.age)}${row("Genre", data.genre)}${row("Ville", data.ville)}${row("Taille (cm)", data.taille)}
          ${row("Permis de conduire", data.permis ? "Oui" : "Non")}${row("Expérience", data.experience)}${row("Disponibilités", list(data.disponibilites))}`;
        break;

      case "quote": {
        // Envoi d'un devis à un client : réservé à l'administrateur
        const caller = await getCaller(req);
        if (!caller?.isAdmin) return deny();
        to = data.email;
        subject = `Votre devis - Heavent People Agency`;
        const lignes = (data.tarifs ?? []).map((t: any) =>
          `<tr><td style="padding:8px;border-bottom:1px solid #eee">${e(t.description)}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right">${Number(t.prix || 0).toFixed(2)} MAD</td></tr>`).join("");
        html = `<div style="font-family:Arial,sans-serif;max-width:700px;margin:auto">
          <h2 style="color:#b8860b">Heavent People Agency</h2>
          <p>Madame, Monsieur ${e(data.prenom)} ${e(data.nom)},</p>
          <p>Nous vous remercions pour votre demande. Voici notre proposition :</p>
          ${data.date_evenement ? row("Date", data.date_evenement) : ""}${data.lieu ? row("Lieu", data.lieu) : ""}
          <table style="width:100%;border-collapse:collapse;margin:16px 0">${lignes}
            <tr><td style="padding:8px;font-weight:bold">Total TTC</td><td style="padding:8px;text-align:right;font-weight:bold">${Number(data.total || 0).toFixed(2)} MAD</td></tr></table>
          ${data.remarques ? `<p style="white-space:pre-line">${e(data.remarques)}</p>` : ""}
          <p>Devis valable 30 jours. Acompte de 50 % à la signature.</p>
          <p>Imane CHAIGARI — CEO, Heavent People Agency<br>+212 6 10 93 96 55 · ${ADMIN_EMAIL} · www.heaventagency.com</p></div>`;
        break;
      }

      default:
        return json({ error: "Type d'email non reconnu" }, 400);
    }

    // La demande est déjà enregistrée : un problème d'email ne doit pas faire échouer le formulaire du visiteur.
    if (!resend) {
      console.warn("RESEND_API_KEY manquant : email non envoyé");
      return json({ success: true, email: "skipped" });
    }
    try {
      const r = await resend.emails.send({ from: FROM, to: [to], reply_to: data.email || data.contactEmail || undefined, subject, html });
      return json({ success: true, email: r });
    } catch (err) {
      console.error("Erreur Resend:", err);
      if (type === "quote") return json({ error: "L'email n'a pas pu être envoyé" }, 502);
      return json({ success: true, email: "failed" });
    }
  } catch (error: any) {
    console.error("Erreur send-email:", error);
    return json({ error: error.message }, 500);
  }
};

serve(handler);
