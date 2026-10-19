import { getCaller, deny, corsHeaders } from "../_shared/auth.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";
import { Resend } from "npm:resend@2.0.0";
import { avecOriginal, htmlTraduit, versFrancais } from "../_shared/traduire.ts";
import { distanceM, heuresPointees, horairesMission } from "../_shared/pointage.ts";

/**
 * Espace staff : le crew confirme sa présence, signale un empêchement, pointe son arrivée (position + selfie)
 * et son départ. Les heures pointées passent dans la paie (au-delà des heures prévues : à valider par l'agence).
 */
const ADMIN_EMAIL = "i.chaigari@heaventagency.com";
const FROM = "Heavent People Agency <noreply@heaventagency.com>";
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "Content-Type": "application/json", ...corsHeaders } });
const e = (v: unknown) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
const heure = (d: string | Date) => new Date(d).toLocaleTimeString("fr-FR", { timeZone: "UTC", hour: "2-digit", minute: "2-digit" });
const jour = (d: string) => new Date(d + "T12:00:00Z").toLocaleDateString("fr-FR", { timeZone: "UTC", weekday: "long", day: "numeric", month: "long" });

function position(p: any) {
  const lat = Number(p?.lat), lng = Number(p?.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) return null;
  return { lat, lng, precision: Number.isFinite(Number(p?.precision)) ? Math.round(Number(p.precision)) : null };
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const caller = await getCaller(req);
    if (!caller?.staffId) return deny(401, "Connecte-toi à ton espace staff.");
    const corps = await req.json();
    const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "", { auth: { persistSession: false } });
    const { data: a } = await db.from("affectations").select("*, devis(numero, titre, lieu), staff(prenom, nom, telephone)").eq("id", corps.id).maybeSingle();
    if (!a || a.staff_id !== caller.staffId) return deny(403, "Cette mission n'est pas la tienne.");
    if (a.statut === "annule") return json({ error: "Cette mission a été annulée." }, 409);
    const { debut, fin, horaireConnu } = horairesMission(a);
    const maintenant = new Date();
    const qui = `${a.staff?.prenom ?? ""} ${a.staff?.nom ?? ""}`.trim();
    const quoi = a.devis?.titre || a.devis?.numero || "événement";
    const resend = Deno.env.get("RESEND_API_KEY") ? new Resend(Deno.env.get("RESEND_API_KEY")!) : null;
    const alerter = (sujet: string, html: string) => resend?.emails.send({ from: FROM, to: [ADMIN_EMAIL], subject: sujet, html }).catch(() => {});

    // ---------- confirmation de présence ----------
    if (corps.action === "confirmer") {
      if (maintenant > fin) return json({ error: "Cette mission est terminée." }, 409);
      await db.from("affectations").update({ presence_confirmee_le: maintenant.toISOString(), empechement_le: null, empechement_motif: null }).eq("id", a.id);
      if (a.empechement_le) await alerter(`✅ ${qui} est finalement disponible — ${quoi}`, `<p><b>${e(qui)}</b> confirme finalement sa présence le ${e(jour(a.date_jour))} (${e(quoi)}).</p>`);
      return json({ success: true });
    }

    // ---------- empêchement ----------
    if (corps.action === "empechement") {
      if (maintenant > fin) return json({ error: "Cette mission est terminée." }, 409);
      const motif = await versFrancais(String(corps.motif ?? "").slice(0, 500));
      await db.from("affectations").update({ empechement_le: maintenant.toISOString(), empechement_motif: avecOriginal(motif) || null, presence_confirmee_le: null }).eq("id", a.id);
      await alerter(`⚠️ ${qui} ne pourra pas venir — ${quoi} (${jour(a.date_jour)})`,
        `<div style="font-family:Arial,sans-serif"><p><b>${e(qui)}</b> a signalé un empêchement pour <b>${e(quoi)}</b>, le <b>${e(jour(a.date_jour))}</b>${horaireConnu ? ` à ${heure(debut)}` : ""}.</p>
         ${motif.texte ? `<p>Motif : ${htmlTraduit(motif, e)}</p>` : ""}${a.staff?.telephone ? `<p>Téléphone : ${e(a.staff.telephone)}</p>` : ""}
         <p>Pense à prévoir un remplacement : <a href="https://heaventagency.com/admin">administration</a> → devis ${e(a.devis?.numero ?? "")} → Équipe.</p></div>`);
      return json({ success: true });
    }

    // ---------- arrivée / départ ----------
    if (corps.action !== "arrivee" && corps.action !== "depart") return json({ error: "Action inconnue" }, 400);
    const ouverture = new Date(debut.getTime() - 3 * 3600_000);
    const fermeture = new Date(fin.getTime() + 4 * 3600_000);
    if (maintenant < ouverture) return json({ error: `Le pointage ouvre 3 h avant le début de la mission (${heure(debut)}).` }, 409);
    if (maintenant > fermeture) return json({ error: "Le pointage de cette journée est fermé. Signale tes heures à l'agence avec une remarque sur ton contrat." }, 409);

    const { data: f } = await db.from("fiches_mission").select("latitude, longitude, rayon_m").eq("devis_id", a.devis_id).maybeSingle();
    const pos = position(corps.position);
    let verifie: boolean | null = null;
    let distance: number | null = null;
    if (pos && f?.latitude != null && f?.longitude != null) {
      distance = distanceM(pos.lat, pos.lng, f.latitude, f.longitude);
      // tolérance : rayon du lieu + imprécision du téléphone (plafonnée à 500 m)
      verifie = distance <= (f.rayon_m ?? 300) + Math.min(pos.precision ?? 0, 500);
    } else if (!pos) verifie = false;
    const posJson = pos ? { ...pos, distance } : null;

    if (corps.action === "arrivee") {
      if (a.arrivee_le) return json({ error: `Arrivée déjà pointée à ${heure(a.arrivee_le)}.` }, 409);
      let photo: string | null = null;
      const img = String(corps.photo ?? "");
      if (/^data:image\/(jpeg|png|webp);base64,/.test(img) && img.length < 1_400_000) {
        const [, type, b64] = img.match(/^data:image\/(jpeg|png|webp);base64,(.*)$/)!;
        const octets = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
        const chemin = `${a.devis_id}/${a.id}-arrivee.${type === "jpeg" ? "jpg" : type}`;
        const { error: errPhoto } = await db.storage.from("pointages").upload(chemin, octets, { contentType: `image/${type}`, upsert: true });
        if (!errPhoto) photo = chemin;
      }
      const retardMin = Math.round((maintenant.getTime() - debut.getTime()) / 60000);
      await db.from("affectations").update({
        arrivee_le: maintenant.toISOString(), arrivee_position: posJson, arrivee_verifiee: verifie, arrivee_photo: photo,
        presence_confirmee_le: a.presence_confirmee_le ?? maintenant.toISOString(),
        pointage_a_verifier: verifie === false,
      }).eq("id", a.id);
      if (a.alerte_retard_le) await alerter(`🟢 ${qui} est arrivé(e) — ${quoi}`, `<p><b>${e(qui)}</b> a pointé son arrivée à <b>${heure(maintenant)}</b>${horaireConnu && retardMin > 0 ? ` (${retardMin} min de retard)` : ""}.</p>`);
      return json({ success: true, heure: maintenant.toISOString(), verifie, distance, retard: horaireConnu ? Math.max(0, retardMin) : 0 });
    }

    // départ
    if (!a.arrivee_le) return json({ error: "Pointe d'abord ton arrivée." }, 409);
    if (a.depart_le) return json({ error: `Départ déjà pointé à ${heure(a.depart_le)}.` }, 409);
    const h = heuresPointees(new Date(a.arrivee_le), maintenant, debut);
    const prevues = Number(a.heures ?? 0);
    const fiable = a.arrivee_verifiee !== false && verifie !== false;
    // Heures payées : les heures pointées, dans la limite des heures prévues (+ 15 min) ; au-delà, l'agence valide.
    const depasse = h > prevues + 0.25;
    const patch: Record<string, unknown> = {
      depart_le: maintenant.toISOString(), depart_position: posJson, depart_verifie: verifie, heures_pointees: h,
      heures_validees: fiable ? (depasse ? prevues : h) : null,
      pointage_a_verifier: !fiable || depasse,
    };
    await db.from("affectations").update(patch).eq("id", a.id);
    if (depasse || !fiable) {
      await alerter(`🕒 Pointage à vérifier — ${qui} (${quoi})`,
        `<p><b>${e(qui)}</b> a pointé <b>${h} h</b> le ${e(jour(a.date_jour))} pour ${prevues} h prévues${!fiable ? " — position hors du lieu ou non partagée" : ""}.</p>
         <p>Valide ou corrige les heures dans l'administration (devis ${e(a.devis?.numero ?? "")} → Équipe). En attendant, ${fiable ? `${prevues} h` : "les heures prévues"} sont comptées dans la paie.</p>`);
    }
    return json({ success: true, heure: maintenant.toISOString(), heures: h, verifie, distance, aVerifier: depasse || !fiable });
  } catch (err: any) {
    console.error("pointer:", err);
    return json({ error: "Erreur interne : " + err.message }, 500);
  }
});
