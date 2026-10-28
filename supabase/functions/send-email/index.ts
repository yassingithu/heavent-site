import { getCaller, deny, corsHeaders } from "../_shared/auth.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";
import { avecOriginal, htmlTraduit, traduireChamps, versFrancais } from "../_shared/traduire.ts";

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
/** Ligne d'e-mail pour un texte libre traduit en français (avec l'original si traduit). */
const rowT = (label: string, t: { texte: string } | undefined) => `<p><strong>${label} :</strong> ${t && t.texte ? htmlTraduit(t as any, e) : "Non renseigné"}</p>`;
const list = (v: unknown) => (Array.isArray(v) ? v.join(", ") : v);
const intOrNull = (v: unknown) => { const n = parseInt(String(v ?? "")); return Number.isFinite(n) ? n : null; };
const dateOrNull = (v: unknown) => (v && /^\d{4}-\d{2}-\d{2}/.test(String(v)) ? String(v).slice(0, 10) : null);

// Les listes du formulaire envoient des identifiants en minuscules (« marrakech », « mariage ») : on les met en forme
const cap = (v: unknown) => { const t = String(v ?? "").trim().replace(/-/g, " "); return t ? t.charAt(0).toUpperCase() + t.slice(1) : t; };

const SERVICES_MARIAGE: Record<string, string> = {
  dj: "DJ / Animation musicale", decoration: "Décoration", photo: "Photographe", video: "Vidéaste", catering: "Traiteur",
  transport: "Transport", ceremony: "Officiant de cérémonie", hostess: "Hôtes/Hôtesses d'accueil", planning: "Wedding planner",
};

// Anti-spam des formulaires sans enregistrement en base (contact, candidature) : 5 envois par adresse IP et par 10 minutes
const envoisParIp = new Map<string, number[]>();
const autorise = (ip: string) => {
  const maintenant = Date.now(), recents = (envoisParIp.get(ip) ?? []).filter((t) => maintenant - t < 10 * 60 * 1000);
  if (recents.length >= 5) return false;
  recents.push(maintenant); envoisParIp.set(ip, recents);
  if (envoisParIp.size > 5000) envoisParIp.clear();
  return true;
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", ...corsHeaders } });

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { type, data } = await req.json();
    if (type === "contact" || type === "staff") {
      const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "inconnue";
      if (!autorise(ip)) return json({ error: "Trop d'envois en peu de temps. Réessayez dans quelques minutes." }, 429);
    }
    let subject = "";
    let html = "";
    let to = ADMIN_EMAIL;

    switch (type) {
      case "ping-traduction": {
        // Vérification du service de traduction (n'envoie rien, n'enregistre rien)
        return json(await versFrancais(String(data?.texte ?? "").slice(0, 200)));
      }

      case "contact": {
        const t = await traduireChamps(data, ["subject", "message"]);
        subject = `Nouveau message de contact - ${data.name}${t.subject.traduit ? ` — ${t.subject.texte}` : ` - ${data.subject ?? ""}`}`;
        html = `<h2>Nouveau message de contact</h2>${row("Nom", data.name)}${row("Email", data.email)}${rowT("Sujet", t.subject)}<p><strong>Message :</strong></p><p style="white-space:pre-line">${htmlTraduit(t.message, e)}</p>`;
        break;
      }

      case "wedding": {
        // Le formulaire envoie eventDate / eventLocation / eventType (anciens noms acceptés aussi)
        const date = data.eventDate ?? data.weddingDate;
        const lieu = cap(data.eventLocation ?? data.weddingLocation ?? data.ceremonyLocation ?? data.receptionLocation);
        const typeEv = cap(data.eventType) || "Mariage";
        const services = list(Array.isArray(data.services) ? data.services.map((x: string) => SERVICES_MARIAGE[x] ?? x) : data.services);
        const tw = await traduireChamps(data, ["specialRequests", "ceremonyLocation", "receptionLocation", "brideName", "groomName"]);
        subject = `Nouvelle demande de devis ${data.eventType || "mariage"} - ${data.brideName}${data.groomName ? ` & ${data.groomName}` : ""}`;
        html = `<h2>Nouvelle demande de devis ${e(data.eventType || "mariage")}</h2>
          ${row("Contact", `${data.brideName}${data.groomName ? ` & ${data.groomName}` : ""}`)}${row("Email", data.contactEmail)}${row("Téléphone", data.contactPhone)}
          ${row("Type d'événement", typeEv)}${row("Date", date)}${row("Lieu", lieu)}${rowT("Lieu de cérémonie", tw.ceremonyLocation)}
          ${rowT("Lieu de réception", tw.receptionLocation)}${row("Nombre d'invités", data.guestCount)}${row("Budget estimé", data.budget)}
          ${row("Prestations demandées", services)}<p><strong>Demandes spéciales :</strong></p><p style="white-space:pre-line">${tw.specialRequests.texte ? htmlTraduit(tw.specialRequests, e) : "Aucune"}</p>
          ${tw.brideName.traduit || tw.groomName.traduit ? `<p style="color:#888;font-size:12px">Noms en écriture d'origine : ${e(data.brideName)}${data.groomName ? ` & ${e(data.groomName)}` : ""}</p>` : ""}`;
        const { error } = await supabase.from("devis_mariage").insert({
          nom: data.brideName, prenom: data.groomName || "", email: data.contactEmail, telephone: data.contactPhone,
          type_evenement: typeEv, date_mariage: dateOrNull(date), lieu: lieu || null,
          nb_invites: intOrNull(data.guestCount), services: services || null,
          remarques: [avecOriginal(tw.specialRequests), data.budget && `Budget : ${data.budget}`, data.ceremonyLocation && `Cérémonie : ${avecOriginal(tw.ceremonyLocation)}`, data.receptionLocation && `Réception : ${avecOriginal(tw.receptionLocation)}`].filter(Boolean).join("\n") || null,
        });
        if (error) { console.error(error); return json({ error: "Erreur lors de l'enregistrement de la demande" }, 500); }
        break;
      }

      case "jeu": {
        // Demande envoyée depuis le jeu « Crée ton événement de rêve » (configuration jointe)
        const email = String(data.email ?? "").trim();
        const prenom = String(data.prenom ?? "").trim().slice(0, 80);
        if (!prenom || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || !String(data.ville ?? "").trim())
          return json({ error: "Prénom, e-mail et ville sont obligatoires." }, 400);
        const tj = await traduireChamps(data, ["message", "ville"]);
        const mad = (n: unknown) => `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Number(n) || 0)} MAD`;
        const lignes = (Array.isArray(data.lignes) ? data.lignes : []).slice(0, 40);
        // Prix cachés aux visiteurs : sans « estimation » dans la demande, on liste seulement les éléments choisis
        const sansPrix = data.estimation == null;
        const tableau = sansPrix
          ? `<ul style="margin:10px 0;padding-left:18px;font-size:14px">${lignes.map((l: any) => `<li style="padding:2px 0">${e(l.libelle)}</li>`).join("")}</ul>
          <p style="margin:6px 0;font-weight:bold;color:#8C6D22">Devis en cours d'étude</p>`
          : `<table style="width:100%;border-collapse:collapse;margin:10px 0;font-size:14px">${lignes.map((l: any) =>
          `<tr><td style="padding:6px;border-bottom:1px solid #eee">${e(l.libelle)}<br><span style="color:#888;font-size:12px">${e(l.detail)}</span></td><td style="padding:6px;border-bottom:1px solid #eee;text-align:right;white-space:nowrap">${l.surDevis ? '<span style="color:#8C6D22">Sur devis</span>' : e(mad(l.total))}</td></tr>`).join("")}
          <tr><td style="padding:6px;font-weight:bold">Estimation illustrative</td><td style="padding:6px;text-align:right;font-weight:bold">${e(mad(data.estimation))}</td></tr></table>`;
        const options = list(Array.isArray(data.options) ? data.options.slice(0, 40) : data.options);
        const dateTxt = dateOrNull(data.date) ? new Date(String(data.date) + "T12:00:00").toLocaleDateString("fr-FR") : "Pas encore fixée";
        subject = `Nouvelle demande « Crée ton événement » — ${prenom} (${data.typeEvenement ?? "événement"})`;
        html = `<h2>Nouvelle demande depuis « Crée ton événement de rêve »</h2>
          ${row("Prénom", prenom)}${row("Email", email)}${row("Téléphone", data.telephone)}${rowT("Ville ou lieu", { ...tj.ville, texte: cap(tj.ville.texte) } as any)}${row("Date souhaitée", dateTxt)}
          ${row("Type d'événement", data.typeEvenement)}${row("Ambiance", data.ambiance)}${row("Lieu choisi", data.lieu)}
          ${row("Invités", data.invites)}${row("Places prévues", data.places)}${row("Budget souhaité", mad(data.budget))}
          ${row("Options choisies", options)}${tableau}
          <p><strong>Message :</strong></p><p style="white-space:pre-line">${tj.message.texte ? htmlTraduit(tj.message, e) : "Aucun"}</p>
          <p style="color:#888;font-size:12px">La demande est aussi enregistrée dans l'administration : onglet « Événement », et dans « Devis » parmi les demandes en attente, pour créer le devis en un clic.</p>`;
        // Configuration du jeu, nettoyée : nombre d'éléments par type, pour créer le devis ligne par ligne
        const brut = data.configuration && typeof data.configuration === "object" ? data.configuration : null;
        const nombres = (o: unknown) => Object.fromEntries(Object.entries(o && typeof o === "object" ? o as Record<string, unknown> : {})
          .filter(([k, v]) => /^[a-z_]{2,20}$/.test(k) && Number.isInteger(v) && (v as number) > 0 && (v as number) <= 500).slice(0, 30));
        const configuration = brut ? {
          version: 1, type: String(brut.type ?? "").slice(0, 20), invites: intOrNull(brut.invites),
          elements: nombres(brut.elements), centres: Number.isInteger(brut.centres) && brut.centres >= 0 && brut.centres <= 500 ? brut.centres : 0,
          libelles: Object.fromEntries(Object.entries(brut.libelles && typeof brut.libelles === "object" ? brut.libelles : {})
            .filter(([k]) => /^[a-z_]{2,20}$/.test(k)).slice(0, 30).map(([k, v]) => [k, String(v).slice(0, 60)])),
          // Éléments agrandis (cases ajoutées par type) : le devis facture le supplément par case
          agrandis: (Array.isArray(brut.agrandis) ? brut.agrandis : []).slice(0, 30)
            .map((x: any) => ({ type: /^[a-z_]{2,20}$/.test(String(x?.type ?? "")) ? String(x.type) : "", cases: Number.isInteger(x?.cases) ? Math.min(200, Math.max(0, x.cases)) : 0 }))
            .filter((x: { type: string; cases: number }) => x.type && x.cases > 0),
          // Idées sur mesure nommées par le visiteur (sans prix : à chiffrer dans le devis)
          sur_mesure: (Array.isArray(brut.sur_mesure) ? brut.sur_mesure : []).slice(0, 30)
            .map((x: any) => ({ nom: String(x?.nom ?? "").replace(/\s+/g, " ").trim().slice(0, 60), quantite: Number.isInteger(x?.quantite) ? Math.min(100, Math.max(1, x.quantite)) : 1 }))
            .filter((x: { nom: string }) => x.nom),
        } : null;
        const { error } = await supabase.from("devis_mariage").insert({
          configuration,
          nom: prenom, prenom: "", email, telephone: String(data.telephone ?? "").slice(0, 40) || null,
          type_evenement: String(data.typeEvenement ?? "Événement").slice(0, 60), date_mariage: dateOrNull(data.date),
          lieu: cap(String(tj.ville.texte).slice(0, 120)) || null, nb_invites: intOrNull(data.invites),
          services: String(data.services ?? "").slice(0, 300) || null,
          remarques: [`Demande créée avec le jeu « Crée ton événement de rêve »${data.langue_visiteur && data.langue_visiteur !== "fr" ? ` (site consulté en ${data.langue_visiteur === "ar" ? "arabe" : data.langue_visiteur === "en" ? "anglais" : data.langue_visiteur})` : ""}.`,
            data.message && `Message : ${avecOriginal(tj.message)}`,
            String(data.texte ?? "").replace(/^Message : .*$/m, "").slice(0, 8000)].filter(Boolean).join("\n\n"),
        });
        if (error) { console.error(error); return json({ error: "Erreur lors de l'enregistrement de la demande" }, 500); }
        // Confirmation au visiteur avec son récapitulatif (un échec d'email ne bloque pas la demande)
        if (resend) {
          await resend.emails.send({
            from: FROM, to: [email], reply_to: ADMIN_EMAIL, subject: "Votre demande de devis — Heavent People Agency",
            html: `<div style="font-family:Arial,sans-serif;max-width:640px;color:#2a2420">
              <p>Bonjour ${e(prenom)},</p>
              <p>Merci pour votre demande ! Nous avons bien reçu la création de ${e(String(data.typeEvenement ?? "votre événement").toLowerCase())} que vous avez composée, et nous revenons vers vous sous 24 h.</p>
              <div style="background:#FAF7EE;border:1px solid #ece6d3;border-radius:8px;padding:12px 16px">
                <b>${e(data.typeEvenement)}</b> · ambiance ${e(String(data.ambiance ?? "").toLowerCase())} · ${e(String(data.lieu ?? "").toLowerCase())}<br>
                ${e(data.invites)} invités · ${e(dateTxt)} · ${e(cap(data.ville))}<br>Options : ${e(options)}
                ${tableau}
                ${sansPrix ? '<p style="font-size:12px;color:#777;margin:0">Notre équipe étudie votre devis : vous recevrez votre prix final dès sa validation.</p>' : '<p style="font-size:12px;color:#777;margin:0">Estimation illustrative des éléments sélectionnés, hors prestations non incluses. Le tarif final sera confirmé sur devis.</p>'}
              </div>
              <p>À très vite,<br>Imane CHAIGARI — CEO, Heavent People Agency<br>+212 6 10 93 96 55 · ${ADMIN_EMAIL}</p></div>`,
          }).catch((err: unknown) => console.error("Confirmation visiteur non envoyée", err));
        }
        break;
      }

      case "business": {
        const tb = await traduireChamps(data, ["sector", "requirements", "comments"]);
        subject = `Nouvelle demande de devis entreprise - ${data.companyName}`;
        html = `<h2>Nouvelle demande de devis entreprise</h2>
          ${row("Entreprise", data.companyName)}${row("Contact", data.contactName)}${row("Email", data.contactEmail)}${row("Téléphone", data.contactPhone)}
          ${rowT("Secteur", tb.sector)}${row("Type d'événement", data.eventType)}${row("Date", data.eventDate)}${row("Lieu", data.eventLocation)}
          ${row("Nombre de personnes", data.staffCount)}${row("Budget estimé", data.budget)}${rowT("Critères spécifiques", tb.requirements)}${rowT("Commentaires", tb.comments)}`;
        const nomComplet = String(data.contactName ?? "").trim();
        const [prenom, ...reste] = nomComplet.split(/\s+/);
        const { error } = await supabase.from("devis_entreprise").insert({
          entreprise: data.companyName, prenom: prenom || "", nom: reste.join(" ") || nomComplet,
          email: data.contactEmail, telephone: data.contactPhone, date_evenement: dateOrNull(data.eventDate),
          lieu: data.eventLocation, nb_personnes: intOrNull(data.staffCount), nb_staff: intOrNull(data.staffCount),
          services: data.eventType, remarques: [data.sector && `Secteur : ${avecOriginal(tb.sector)}`, avecOriginal(tb.requirements), avecOriginal(tb.comments)].filter(Boolean).join("\n") || null,
        });
        if (error) { console.error(error); return json({ error: "Erreur lors de l'enregistrement de la demande" }, 500); }
        break;
      }

      case "staff": {
        const ts = await traduireChamps(data, ["experience"]);
        subject = `Nouvelle candidature staff - ${data.nom} ${data.prenom}`;
        html = `<h2>Nouvelle candidature staff</h2>${row("Nom", `${data.nom} ${data.prenom}`)}${row("Email", data.email)}${row("Téléphone", data.telephone)}
          ${row("Âge", data.age)}${row("Genre", data.genre)}${row("Ville", data.ville)}${row("Taille (cm)", data.taille)}
          ${row("Permis de conduire", data.permis ? "Oui" : "Non")}${rowT("Expérience", ts.experience)}${row("Disponibilités", list(data.disponibilites))}`;
        break;
      }

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
