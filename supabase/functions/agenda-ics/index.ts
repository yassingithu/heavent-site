import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.5";
import { TYPES, calendrierIcs } from "../_shared/agenda.ts";

/**
 * Calendrier des rendez-vous à ajouter sur le téléphone de l'agence (abonnement : se met à jour tout seul).
 * Protégé par une clé secrète dans l'adresse (?cle=…), visible seulement dans l'admin.
 */
serve(async (req) => {
  const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "", { auth: { persistSession: false } });
  const cle = new URL(req.url).searchParams.get("cle") ?? "";
  const { data: s } = await db.from("secrets_internes").select("valeur").eq("nom", "agenda_ics").maybeSingle();
  if (!s?.valeur || cle.length < 32 || cle !== s.valeur) return new Response("Accès refusé", { status: 403 });
  const { data: p } = await db.from("agenda_parametres").select("adresse").eq("id", 1).maybeSingle();
  const { data: ag } = await db.from("parametres_agence").select("adresse, ville").eq("id", 1).maybeSingle();
  const adresse = p?.adresse?.trim() || [ag?.adresse, ag?.ville].filter(Boolean).join(", ");
  const depuis = new Date(Date.now() - 60 * 864e5).toISOString();
  const { data: rdv } = await db.from("rendez_vous").select("*, devis(numero, titre)").gte("debut", depuis).neq("statut", "annule").order("debut");
  const { data: indispos } = await db.from("agenda_indisponibilites").select("*").gte("fin", depuis);
  const evenements = [
    ...(rdv ?? []).map((r: any) => ({
      uid: r.id, debut: r.debut, fin: r.fin, titre: `RDV ${r.client_nom} (${TYPES[r.type]?.fr ?? r.type})`,
      lieu: r.type === "agence" ? adresse : r.type === "telephone" ? r.client_telephone : "Visio",
      description: [r.client_telephone && `Tél. ${r.client_telephone}`, r.client_email, r.devis && `Devis ${r.devis.numero}${r.devis.titre ? ` (${r.devis.titre})` : ""}`, r.message].filter(Boolean).join("\n"),
    })),
    ...(indispos ?? []).map((i: any) => ({ uid: "indispo-" + i.id, debut: i.debut, fin: i.fin, titre: `Indisponible${i.motif ? ` — ${i.motif}` : ""}` })),
  ];
  return new Response(calendrierIcs(evenements), {
    headers: { "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": 'inline; filename="heavent-agenda.ics"', "Cache-Control": "no-cache" },
  });
});
