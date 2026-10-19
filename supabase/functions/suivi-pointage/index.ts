import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";
import { Resend } from "npm:resend@2.0.0";
import { horairesMission } from "../_shared/pointage.ts";

/**
 * Suivi des missions, lancé toutes les 10 minutes par la base :
 *  1. demande de confirmation de présence aux crews (missions dans les 3 jours), de 8 h à 20 h ;
 *  2. à 17 h : liste à l'agence des crews qui n'ont pas confirmé pour le lendemain ;
 *  3. alerte à l'agence quand un crew n'a pas pointé 15 minutes après le début.
 * ?essai=1 : ne rien envoyer, juste lister.
 */
const ADMIN_EMAIL = "i.chaigari@heaventagency.com";
const FROM = "Heavent People Agency <noreply@heaventagency.com>";
const ESPACE = "https://heaventagency.com/staff-dashboard";
const e = (v: unknown) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
const heure = (d: Date | string) => new Date(d).toLocaleTimeString("fr-FR", { timeZone: "UTC", hour: "2-digit", minute: "2-digit" });
const jour = (d: string) => new Date(d + "T12:00:00Z").toLocaleDateString("fr-FR", { timeZone: "UTC", weekday: "long", day: "numeric", month: "long" });
const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));
const JOUR = 864e5;

serve(async (req) => {
  const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "", { auth: { persistSession: false } });
  const { data: secret } = await db.from("secrets_internes").select("valeur").eq("nom", "rappel_signatures").maybeSingle();
  if (!secret?.valeur || req.headers.get("x-cle-rappel") !== secret.valeur) return new Response("Accès refusé", { status: 403 });
  const essai = new URL(req.url).searchParams.get("essai") === "1";
  const resend = new Resend(Deno.env.get("RESEND_API_KEY") ?? "");
  const maintenant = new Date();
  const h = maintenant.getUTCHours(), mn = maintenant.getUTCMinutes();
  const aujourdhui = maintenant.toISOString().slice(0, 10);
  const demain = new Date(maintenant.getTime() + JOUR).toISOString().slice(0, 10);
  const dans3 = new Date(maintenant.getTime() + 3 * JOUR).toISOString().slice(0, 10);
  const rapport = { confirmations: [] as string[], nonConfirmes: [] as string[], retards: [] as string[] };

  const { data: missions } = await db.from("affectations")
    .select("*, devis(numero, titre, lieu), staff(prenom, nom, email, telephone, banni)")
    .eq("statut", "confirme").gte("date_jour", new Date(maintenant.getTime() - JOUR).toISOString().slice(0, 10)).lte("date_jour", dans3);

  // 1. Confirmation de présence (une seule demande par journée de mission)
  if (h >= 8 && h < 20) {
    const parCrew = new Map<string, any[]>();
    for (const a of missions ?? []) {
      if (a.presence_demandee_le || a.presence_confirmee_le || a.empechement_le || a.arrivee_le || !a.staff?.email || a.staff?.banni) continue;
      if (a.date_jour < aujourdhui) continue;
      parCrew.set(a.staff_id, [...(parCrew.get(a.staff_id) ?? []), a]);
    }
    for (const liste of parCrew.values()) {
      const s = liste[0].staff;
      const lignes = liste.sort((x, y) => x.date_jour.localeCompare(y.date_jour)).map((a) =>
        `<li><b>${e(jour(a.date_jour))}</b>${a.heure_debut ? ` · ${a.heure_debut.slice(0, 5)}${a.heure_fin ? ` – ${a.heure_fin.slice(0, 5)}` : ""}` : ""} — ${e(a.devis?.titre || a.devis?.numero || "événement")}${a.devis?.lieu ? ` (${e(a.devis.lieu)})` : ""}</li>`).join("");
      if (!essai) {
        const r = await resend.emails.send({ from: FROM, to: [s.email], subject: "Confirme ta présence pour ta prochaine mission",
          html: `<div style="font-family:Arial,sans-serif;max-width:600px;color:#1a1a1a"><p>Bonjour ${e(s.prenom)},</p>
            <p>Ta prochaine mission approche :</p><ul>${lignes}</ul>
            <p>Merci de <b>confirmer ta présence</b> (ou de nous prévenir si tu as un empêchement) depuis ton espace staff. Tu y trouveras aussi ta fiche mission : tenue, point de rendez-vous et contact sur place.</p>
            <p><a href="${ESPACE}" style="display:inline-block;background:#141414;color:#fff;text-decoration:none;padding:10px 18px;border-radius:6px">Confirmer ma présence</a></p>
            <p style="font-size:12px;color:#666">Le jour J, pointe ton arrivée et ton départ depuis ton espace staff.</p>
            <p>À bientôt,<br>L'équipe Heavent People Agency</p></div>` });
        if ((r as any)?.error) continue;
        await db.from("affectations").update({ presence_demandee_le: maintenant.toISOString() }).in("id", liste.map((a) => a.id));
        await pause(600);
      }
      rapport.confirmations.push(`${s.prenom} ${s.nom} (${liste.length} jour${liste.length > 1 ? "s" : ""})`);
    }
  }

  // 2. À 17 h : crews pas encore confirmés pour demain
  if (h === 17 && mn < 10) {
    const manquants = (missions ?? []).filter((a) => a.date_jour === demain && !a.presence_confirmee_le && !a.arrivee_le);
    for (const a of manquants) rapport.nonConfirmes.push(`${a.staff?.prenom} ${a.staff?.nom}${a.empechement_le ? " (empêchement signalé)" : ""} — ${a.devis?.titre || a.devis?.numero}`);
    if (manquants.length && !essai) {
      await resend.emails.send({ from: FROM, to: [ADMIN_EMAIL], subject: `⏳ ${manquants.length} crew${manquants.length > 1 ? "s" : ""} sans confirmation pour demain`,
        html: `<div style="font-family:Arial,sans-serif"><p>Pour demain (${e(jour(demain))}), ces personnes n'ont pas confirmé leur présence :</p>
          <ul>${manquants.map((a) => `<li><b>${e(a.staff?.prenom)} ${e(a.staff?.nom)}</b>${a.staff?.telephone ? ` · ${e(a.staff.telephone)}` : ""} — ${e(a.devis?.titre || a.devis?.numero)}${a.heure_debut ? ` à ${a.heure_debut.slice(0, 5)}` : ""}${a.empechement_le ? ` <b style="color:#b42318">— empêchement signalé${a.empechement_motif ? ` : ${e(a.empechement_motif)}` : ""}</b>` : ""}</li>`).join("")}</ul>
          <p>Un petit appel ou un WhatsApp pour vérifier ? <a href="https://heaventagency.com/admin">Administration</a></p></div>` }).catch(() => {});
    }
  }

  // 3. Retards : pas de pointage 15 minutes après le début
  const retards = (missions ?? []).filter((a) => {
    if (a.arrivee_le || a.alerte_retard_le || !a.heure_debut || a.empechement_le) return false;
    const { debut, fin } = horairesMission(a);
    return maintenant.getTime() >= debut.getTime() + 15 * 60000 && maintenant < fin;
  });
  for (const a of retards) {
    const { debut } = horairesMission(a);
    rapport.retards.push(`${a.staff?.prenom} ${a.staff?.nom} — ${a.devis?.titre || a.devis?.numero}`);
    if (essai) continue;
    await db.from("affectations").update({ alerte_retard_le: maintenant.toISOString() }).eq("id", a.id);
    await resend.emails.send({ from: FROM, to: [ADMIN_EMAIL], subject: `🔴 ${a.staff?.prenom} ${a.staff?.nom} n'a pas pointé — ${a.devis?.titre || a.devis?.numero}`,
      html: `<div style="font-family:Arial,sans-serif"><p><b>${e(a.staff?.prenom)} ${e(a.staff?.nom)}</b> devait commencer à <b>${heure(debut)}</b> (${e(a.devis?.titre || a.devis?.numero)}${a.devis?.lieu ? `, ${e(a.devis.lieu)}` : ""}) et n'a pas encore pointé son arrivée.</p>
        ${a.staff?.telephone ? `<p>📞 <a href="tel:${e(a.staff.telephone)}">${e(a.staff.telephone)}</a> · <a href="https://wa.me/${e(String(a.staff.telephone).replace(/\D/g, "").replace(/^0/, "212"))}">WhatsApp</a></p>` : ""}
        <p style="color:#888;font-size:12px">Tu recevras un message dès qu'il ou elle pointe.</p></div>` }).catch(() => {});
    await pause(600);
  }

  return new Response(JSON.stringify({ essai, heure: maintenant.toISOString(), ...rapport }), { headers: { "Content-Type": "application/json" } });
});
