// Faux serveur Supabase en mémoire : permet de rejouer les parcours complets (devis, équipe, contrats,
// paie, inscription, disponibilités…) sans toucher aux vraies données.
import * as F from "./fixture.mjs";

export function nouvelleBase() {
  return {
    staff: F.staff.map((s) => ({ ...s, banni: false })), disponibilites: F.dispos.map((d) => ({ ...d })),
    affectations: [], contrats: [], fiches_paie: [], devis: [], devis_lignes: [],
    catalogue_prestations: F.catalogue, parametres_agence: F.param.map((p) => ({ ...p })), devis_entreprise: [],
    devis_mariage: F.dem.map((d) => ({ ...d })), admins: [{ email: "admin@heavent.test" }],
    agenda_parametres: [{ id: 1, duree_minutes: 45, pause_minutes: 15, delai_heures: 24, horizon_jours: 30, types: ["agence", "telephone", "visio"], adresse: null, lien_visio: null, actif: true }],
    agenda_horaires: [1, 2, 3, 4, 5, 6].flatMap((jour) => [{ id: "h" + jour + "a", jour, debut: "10:00:00", fin: "13:00:00" }, { id: "h" + jour + "b", jour, debut: "15:00:00", fin: "19:00:00" }]),
    agenda_indisponibilites: [], rendez_vous: [], fiches_mission: [], evaluations_crew: [],
    vitrine: [{ id: 1, annees_experience: null, nb_evenements: null, nb_crews: null, google_note: null, google_nb_avis: null, google_lien: null,
      engagement_cnss: false, engagement_assurance: false, engagement_remplacement: false, engagement_reponse_24h: false,
      faq: [{ q: "Faut-il verser un acompte ?", r: "Oui : l'acompte indiqué sur le devis est payable à la commande." }] }],
    references_clients: [], temoignages: [],
    appelsFonctions: [],
  };
}

function correspond(ligne, params) {
  for (const [k, v] of params) {
    if (["select", "order", "limit", "offset", "on_conflict", "columns", "or"].includes(k)) continue;
    const [op, ...reste] = v.split("."); const val = reste.join("."); const c = ligne[k];
    if (op === "eq" && String(c) !== val) return false;
    if (op === "neq" && String(c) === val) return false;
    if (op === "gte" && !(String(c) >= val)) return false;
    if (op === "lte" && !(String(c) <= val)) return false;
    if (op === "ilike" && String(c).toLowerCase() !== val.toLowerCase()) return false;
    if (op === "is" && val === "null" && c != null) return false;
    if (op === "not" && val === "is.null" && c == null) return false;
    if (op === "in") { const l = val.replace(/^\(|\)$/g, "").split(",").map((x) => x.replace(/"/g, "")); if (!l.includes(String(c))) return false; }
  }
  return true;
}

const r2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
/** Même règles que la fonction SQL facture_creer (acompte, solde avec acomptes déduits, ou facture unique). */
export function creerFacture(base, devisId, type = "auto", par = null) {
  base.factures ??= []; base.compteurFactures ??= 0;
  const d = base.devis.find((x) => x.id === devisId);
  if (!d) throw new Error("Devis introuvable.");
  if (d.statut !== "accepte") throw new Error("Le devis doit être accepté avant d'être facturé.");
  const lignes = base.devis_lignes.filter((l) => l.devis_id === d.id).sort((a, b) => a.ordre - b.ordre)
    .map((l) => ({ ...l, total_ht: r2(l.quantite * l.duree * l.prix_unitaire * (1 - (l.remise_pct || 0) / 100)) }));
  const ht = r2(lignes.reduce((t, l) => t + l.total_ht, 0)), remise = r2(ht * (d.remise_globale_pct || 0) / 100);
  const tva = r2((ht - remise) * (d.taux_tva ?? 20) / 100), ttc = r2(ht - remise + tva);
  if (ttc <= 0) throw new Error("Le devis est à 0 : rien à facturer.");
  const actives = base.factures.filter((f) => f.devis_id === d.id && f.statut !== "annulee");
  const finale = actives.find((f) => f.type !== "acompte");
  if (finale) throw new Error(`Ce devis est déjà entièrement facturé (facture ${finale.numero}).`);
  const acomptes = actives.filter((f) => f.type === "acompte");
  if (type === "auto") type = d.acompte_pct > 0 && !acomptes.length ? "acompte" : "solde";
  if (type === "acompte" && acomptes.length) throw new Error("La facture d'acompte de ce devis existe déjà.");
  if (type !== "acompte") type = acomptes.length ? "solde" : "totale";
  const commun = { id: "fac" + Math.random().toString(36).slice(2), numero: `FAC-2026-${String(++base.compteurFactures).padStart(4, "0")}`, devis_id: d.id, devis_numero: d.numero,
    type, marque: d.marque ?? "heavent", date_emission: new Date().toISOString().slice(0, 10), client_nom: d.client_nom, client_societe: d.client_societe ?? null,
    client_email: d.client_email ?? null, client_telephone: d.client_telephone ?? null, client_adresse: d.client_adresse ?? null, client_ice: d.client_ice ?? null,
    titre: d.titre ?? null, date_evenement: d.date_evenement ?? null, date_fin_evenement: d.date_fin_evenement ?? null, lieu: d.lieu ?? null, taux_tva: d.taux_tva ?? 20,
    devise: "MAD", statut: "a_payer", payee_le: null, mode_paiement: null, envoyee_le: null, creee_par: par };
  let f;
  if (type === "acompte") {
    const a = r2(ttc * d.acompte_pct / 100), aht = r2(a / (1 + (d.taux_tva ?? 20) / 100));
    f = { ...commun, lignes: [{ designation: `Acompte de ${d.acompte_pct} % sur le devis N° ${d.numero}`, description: d.titre, quantite: 1, duree: 1, unite: "forfait", prix_unitaire: aht, remise_pct: 0, total_ht: aht }],
      remise_globale_pct: 0, total_ht: aht, total_remise: 0, total_tva: r2(a - aht), total_ttc: a, acompte_pct: d.acompte_pct, deductions: [], deduction_ttc: 0, net_a_payer: a };
  } else {
    const ded = r2(acomptes.reduce((t, a) => t + a.total_ttc, 0));
    f = { ...commun, lignes, remise_globale_pct: d.remise_globale_pct || 0, total_ht: ht, total_remise: remise, total_tva: tva, total_ttc: ttc, acompte_pct: null,
      deductions: acomptes.map((a) => ({ numero: a.numero, date: a.date_emission, ht: a.total_ht, tva: a.total_tva, ttc: a.total_ttc, payee: a.statut === "payee" })), deduction_ttc: ded, net_a_payer: r2(ttc - ded) };
  }
  base.factures.push(f);
  return f;
}

/** Créneaux libres (même logique que la fonction SQL agenda_creneaux, heure du Maroc = UTC+1). */
export function creneauxLibres(base) {
  const p = base.agenda_parametres[0]; if (!p.actif) return [];
  const res = []; const maintenant = Date.now();
  for (let k = 0; k <= p.horizon_jours; k++) {
    const jour = new Date(maintenant + k * 864e5).toISOString().slice(0, 10);
    const isodow = ((new Date(jour + "T12:00:00Z").getUTCDay() + 6) % 7) + 1;
    for (const h of base.agenda_horaires.filter((x) => x.jour === isodow)) {
      const d0 = Date.parse(`${jour}T${h.debut.slice(0, 5)}:00Z`), f0 = Date.parse(`${jour}T${h.fin.slice(0, 5)}:00Z`);
      for (let d = d0; d + p.duree_minutes * 6e4 <= f0; d += (p.duree_minutes + p.pause_minutes) * 6e4) {
        const f = d + p.duree_minutes * 6e4;
        if (d < maintenant + p.delai_heures * 3600e3) continue;
        const occupe = base.rendez_vous.some((r) => r.statut === "confirme" && Date.parse(r.debut) < f && Date.parse(r.fin) > d)
          || base.agenda_indisponibilites.some((i) => Date.parse(i.debut) < f && Date.parse(i.fin) > d);
        if (!occupe) res.push({ debut: new Date(d).toISOString(), fin: new Date(f).toISOString() });
      }
    }
  }
  return res;
}

export function genererFiches(base) {
  const groupes = {};
  base.affectations.filter((a) => a.statut !== "annule").forEach((a) => (groupes[a.staff_id] ??= []).push(a));
  for (const [sid, ls] of Object.entries(groupes)) {
    const h = ls.reduce((t, l) => t + l.heures, 0), brut = ls.reduce((t, l) => t + l.heures * l.taux_horaire, 0);
    const cnss = +(Math.min(brut, 6000) * 0.0448).toFixed(2), amo = +(brut * 0.0226).toFixed(2);
    const d = base.devis.find((x) => x.id === ls[0].devis_id);
    base.fiches_paie.push({ id: "f" + Math.random().toString(36).slice(2), staff_id: sid, mois: 10, annee: 2026, heures_travaillees: h, salaire_brut: brut, cnss, amo,
      deductions: +(cnss + amo).toFixed(2), prime: 0, salaire_net: +(brut - cnss - amo).toFixed(2), statut: "en_attente", generee_auto: true,
      details: ls.map((l) => ({ date: l.date_jour, evenement: d?.titre, numero: d?.numero, poste: l.poste, heures: l.heures, taux: l.taux_horaire, montant: l.heures * l.taux_horaire })) });
  }
  return Object.keys(groupes).length;
}

/** Ouvre un navigateur connecté avec l'email donné (admin ou crew) branché sur la fausse base. */
export async function contexte(navigateur, base, email, { mobile = false } = {}) {
  const ctx = await navigateur.newContext({ viewport: mobile ? { width: 390, height: 844 } : { width: 1400, height: 1000 }, isMobile: mobile, hasTouch: mobile, acceptDownloads: true, locale: "fr-FR" });
  await ctx.route(/fonts\.(googleapis|gstatic)|googletagmanager/, (r) => r.abort());
  const admin = base.admins.some((a) => a.email === email);
  const moi = () => base.staff.find((s) => s.email === email);
  await ctx.route("**/*.supabase.co/**", async (route) => {
    const req = route.request(); const url = new URL(req.url());
    if (url.pathname.includes("/auth/v1/user")) return route.fulfill({ json: { id: "u-" + email, email, aud: "authenticated", role: "authenticated" } });
    if (url.pathname.includes("/auth/v1/token")) { const b = JSON.parse(req.postData() || "{}"); return route.fulfill({ json: { access_token: "x", refresh_token: "y", token_type: "bearer", expires_in: 3600, user: { id: "u", email: b.email, aud: "authenticated", role: "authenticated" } } }); }
    if (url.pathname.includes("/storage/")) {
      // Stockage simulé : on garde les fichiers envoyés et on les resservit
      base.fichiers ??= {};
      const m = url.pathname.match(/\/storage\/v1\/object\/(?:public\/)?(.+)$/);
      if (m && req.method() === "POST") { base.fichiers[m[1]] = req.postDataBuffer(); return route.fulfill({ json: { Key: m[1] } }); }
      if (m && req.method() === "GET" && base.fichiers[m[1]]) return route.fulfill({ status: 200, body: base.fichiers[m[1]], contentType: "image/jpeg", headers: { "access-control-allow-origin": "*" } });
      if (req.method() === "DELETE") return route.fulfill({ json: [] });
      return route.fulfill({ status: 404, body: "" });
    }
    if (url.pathname.includes("/functions/v1/")) {
      const nom = url.pathname.split("/").pop(); const corps = req.postData() ? JSON.parse(req.postData()) : {};
      base.appelsFonctions.push({ nom, corps });
      if (nom === "instagram-publier") {
        if (!admin) return route.fulfill({ status: 403, json: { error: "Accès refusé" } });
        if (corps.action === "connecter") { if (corps.jeton !== "IGJETON-TEST-1234567890") return route.fulfill({ status: 400, json: { error: "Instagram refuse ce jeton" } }); base.instagram = "heavent.agency"; return route.fulfill({ json: { nom: "heavent.agency" } }); }
        if (corps.action === "publier") { const p = base.posts_instagram.find((x) => x.id === corps.post_id); Object.assign(p, { statut: "publie", publie_le: new Date().toISOString(), ig_media_id: "ig123" }); return route.fulfill({ json: { media: "ig123" } }); }
      }
      if (nom === "instagram-photos") {
        if (!admin && !(base.admin_profils ?? []).some((x) => x.email === email && x.espace === "nawar")) return route.fulfill({ status: 403, json: { error: "Accès refusé" } });
        if (!base.cle_pixabay) return route.fulfill({ status: 400, json: { error: "Clé Pixabay manquante" } });
        if (corps.action === "chercher") return route.fulfill({ json: { total: 3, photos: [1, 2, 3].map((i) => ({ id: 100 + i, apercu: `https://pixabay.com/get/apercu-${i}.jpg`, grande: `https://pixabay.com/get/grande-${i}.jpg`, page: `https://pixabay.com/photos/${i}`, auteur: "Photographe" + i, largeur: 800, hauteur: 1000 })) } });
        if (corps.action === "choisir") {
          const chemin = `assets/instagram/photos/${corps.post_id}-${corps.photo.id}.jpg`;
          base.fichiers ??= {}; base.fichiers[chemin] = base.photoTest;
          const photo_url = `https://mapiwnsjsluiwmnulhqk.supabase.co/storage/v1/object/public/${chemin}`;
          Object.assign(base.posts_instagram.find((x) => x.id === corps.post_id) ?? {}, { photo_url, photo_auteur: corps.photo.auteur, photo_page: corps.photo.page, statut: "brouillon", visuel_url: null });
          return route.fulfill({ json: { photo_url } });
        }
      }
      if (nom === "signer-contrat") {
        const c = base.contrats.find((x) => x.id === corps.contratId);
        const t = new Date().toISOString();
        if (c) Object.assign(c, { signe_le: t, signature_nom: corps.nom, signature_image: corps.image, conditions_acceptees_le: t,
          employeur_signe_le: t, employeur_signataire: "Imane CHAIGARI, CEO — Heavent Agency SARL" });
        return route.fulfill({ json: { success: true } });
      }
      if (nom === "envoyer-devis") {
        const d = base.devis.find((x) => x.id === corps.devisId);
        if (!d?.client_email) return route.fulfill({ status: 400, json: { error: "Ajoutez l'e-mail du client dans le devis avant de l'envoyer." } });
        Object.assign(d, { statut: d.statut === "brouillon" ? "envoye" : d.statut, date_envoi: new Date().toISOString(), relances: 0 });
        return route.fulfill({ json: { success: true, lien: `https://heaventagency.com/mon-devis/${d.lien_token}` } });
      }
      if (nom === "signer-devis") {
        const d = base.devis.find((x) => x.lien_token === corps.token);
        if (!d) return route.fulfill({ status: 404, json: { error: "Ce devis n'est plus disponible." } });
        if (d.signe_le) return route.fulfill({ status: 409, json: { error: "Ce devis a déjà été signé." } });
        if (corps.action === "rdv") {
          Object.assign(d, { rdv_demande_le: new Date().toISOString(), rdv_message: [corps.disponibilites && `Disponibilités : ${corps.disponibilites}`, corps.message && `Message : ${corps.message}`].filter(Boolean).join("\n"), relances: 2 });
          return route.fulfill({ json: { success: true, rdv: true } });
        }
        if (!corps.accepte || String(corps.nom ?? "").trim().length < 3 || String(corps.image ?? "").length < 1500)
          return route.fulfill({ status: 400, json: { error: "Signature incomplète." } });
        Object.assign(d, { signe_le: new Date().toISOString(), signature_nom: corps.nom, signature_image: corps.image, statut: "accepte" });
        let facture = null;
        if (d.acompte_pct > 0) { try { facture = creerFacture(base, d.id, "acompte", "signature en ligne"); facture.envoyee_le = new Date().toISOString(); } catch { /* devis à 0 */ } }
        return route.fulfill({ json: { success: true, facture: facture?.numero ?? null } });
      }
      if (nom === "evaluer-equipe") {
        const d = base.devis.find((x) => x.lien_token === corps.token);
        if (!d || d.statut !== "accepte") return route.fulfill({ status: 404, json: { error: "Ce devis n'est pas disponible." } });
        if (!(corps.note >= 1 && corps.note <= 5)) return route.fulfill({ status: 400, json: { error: "Choisissez une note de 1 à 5 étoiles." } });
        Object.assign(d, { avis_note: corps.note, avis_commentaire: corps.commentaire || null, avis_le: new Date().toISOString(), reprendre_equipe: !!corps.reprendre, avis_publiable: !!corps.publiable && !!corps.commentaire });
        for (const c of corps.crews ?? []) {
          base.evaluations_crew = base.evaluations_crew.filter((v) => !(v.devis_id === d.id && v.staff_id === c.id));
          base.evaluations_crew.push({ id: "ev" + Math.random().toString(36).slice(2), devis_id: d.id, staff_id: c.id, note: c.note });
        }
        return route.fulfill({ json: { success: true, avis_google: corps.note >= 4 ? base.parametres_agence[0].lien_avis_google ?? null : null } });
      }
      if (nom === "pointer") {
        const a = base.affectations.find((x) => x.id === corps.id);
        if (!a || a.staff_id !== moi()?.id) return route.fulfill({ status: 403, json: { error: "Cette mission n'est pas la tienne." } });
        const t = new Date().toISOString();
        if (corps.action === "confirmer") { Object.assign(a, { presence_confirmee_le: t, empechement_le: null }); return route.fulfill({ json: { success: true } }); }
        if (corps.action === "empechement") { Object.assign(a, { empechement_le: t, empechement_motif: corps.motif || null, presence_confirmee_le: null }); return route.fulfill({ json: { success: true } }); }
        const f = base.fiches_mission.find((x) => x.devis_id === a.devis_id);
        const p = corps.position;
        let distance = null, verifie = p ? null : false;
        if (p && f?.latitude != null) {
          const r = Math.PI / 180, dLat = (f.latitude - p.lat) * r, dLng = (f.longitude - p.lng) * r;
          const x = Math.sin(dLat / 2) ** 2 + Math.cos(p.lat * r) * Math.cos(f.latitude * r) * Math.sin(dLng / 2) ** 2;
          distance = Math.round(2 * 6371000 * Math.asin(Math.sqrt(x))); verifie = distance <= (f.rayon_m ?? 300) + Math.min(p.precision ?? 0, 500);
        }
        if (corps.action === "arrivee") {
          Object.assign(a, { arrivee_le: t, arrivee_position: p ? { ...p, distance } : null, arrivee_verifiee: verifie, arrivee_photo: corps.photo ? `${a.devis_id}/${a.id}-arrivee.jpg` : null, pointage_a_verifier: verifie === false });
          base.photosPointage = (base.photosPointage ?? 0) + (corps.photo ? 1 : 0);
          return route.fulfill({ json: { success: true, heure: t, verifie, distance, retard: 0 } });
        }
        if (!a.arrivee_le) return route.fulfill({ status: 409, json: { error: "Pointe d'abord ton arrivée." } });
        const h = Math.round(Math.max(0, (Date.now() - Date.parse(a.arrivee_le)) / 3600e3) * 4) / 4;
        Object.assign(a, { depart_le: t, depart_verifie: verifie, heures_pointees: h, heures_validees: verifie === false ? null : Math.min(h, a.heures), pointage_a_verifier: verifie === false || h > a.heures + 0.25 });
        return route.fulfill({ json: { success: true, heure: t, heures: h, verifie, distance, aVerifier: a.pointage_a_verifier } });
      }
      if (nom === "prendre-rdv") {
        if (corps.action === "annuler") {
          if (!admin) return route.fulfill({ status: 403, json: { error: "Accès refusé" } });
          const r = base.rendez_vous.find((x) => x.id === corps.id); if (r) r.statut = "annule";
          return route.fulfill({ json: { success: true } });
        }
        const c = creneauxLibres(base).find((x) => Date.parse(x.debut) === Date.parse(corps.debut));
        if (!c) return route.fulfill({ status: 409, json: { error: "pris" } });
        if (corps.type === "telephone" && String(corps.telephone ?? "").replace(/\D/g, "").length < 8) return route.fulfill({ status: 400, json: { error: "telephone" } });
        const d = corps.devisToken ? base.devis.find((x) => x.lien_token === corps.devisToken) : null;
        const r = { id: "rdv" + Math.random().toString(36).slice(2), ...c, type: corps.type, statut: "confirme", client_nom: corps.nom, client_email: corps.email,
          client_telephone: corps.telephone || null, message: corps.message || null, langue: corps.langue ?? "fr", source: d ? "devis" : corps.source, devis_id: d?.id ?? null };
        base.rendez_vous.push(r);
        if (d) Object.assign(d, { rdv_demande_le: new Date().toISOString(), relances: 2, rdv_message: `Rendez-vous réservé : ${c.debut}` });
        return route.fulfill({ json: { success: true, debut: r.debut, fin: r.fin, type: r.type } });
      }
      if (nom === "envoyer-facture") {
        const f = (base.factures ?? []).find((x) => x.id === corps.factureId);
        if (!f?.client_email) return route.fulfill({ status: 400, json: { error: "Ajoutez l'e-mail du client dans le devis." } });
        f.envoyee_le = new Date().toISOString();
        return route.fulfill({ json: { success: true } });
      }
      if (nom === "admin-change-password" && corps.action === "ban") base.staff.filter((s) => s.email === corps.userEmail).forEach((s) => { s.banni = true; });
      return route.fulfill({ json: { success: true, cree: !corps.action } });
    }
    if (url.pathname.includes("/rpc/is_admin")) return route.fulfill({ json: admin });
    const nawar = (base.admin_profils ?? []).some((x) => x.email === email && x.espace === "nawar");
    if (url.pathname.includes("/rpc/est_espace_nawar")) return route.fulfill({ json: nawar });
    if (url.pathname.includes("/rpc/generer_fiches_paie")) return route.fulfill({ json: genererFiches(base) });
    if (url.pathname.includes("/rpc/vitrine_public")) {
      const v = base.vitrine[0];
      return route.fulfill({ json: {
        chiffres: { annees: v.annees_experience, evenements: v.nb_evenements, crews: v.nb_crews },
        google: v.google_note ? { note: v.google_note, nb: v.google_nb_avis, lien: v.google_lien } : null,
        engagements: { cnss: v.engagement_cnss, assurance: v.engagement_assurance, remplacement: v.engagement_remplacement, reponse24h: v.engagement_reponse_24h },
        faq: v.faq, references: base.references_clients.filter((r) => r.publie !== false), temoignages: base.temoignages.filter((t) => t.publie),
      } });
    }
    if (url.pathname.includes("/rpc/mes_missions")) {
      const m = moi();
      return route.fulfill({ json: base.affectations.filter((a) => m && a.staff_id === m.id && a.statut !== "annule").map((a) => {
        const d = base.devis.find((x) => x.id === a.devis_id) ?? {};
        const f = base.fiches_mission.find((x) => x.devis_id === a.devis_id) ?? null;
        return { ...a, evenement: d.titre || "Événement", lieu: d.lieu ?? null, numero: d.numero ?? null, fiche: f };
      }) });
    }
    if (url.pathname.includes("/rpc/agenda_creneaux")) return route.fulfill({ json: creneauxLibres(base) });
    if (url.pathname.includes("/rpc/agenda_public")) {
      const p = base.agenda_parametres[0];
      return route.fulfill({ json: { duree_minutes: p.duree_minutes, types: p.types, actif: p.actif, adresse: p.afficher_adresse ? p.adresse || "Rue Dakar, Rabat" : null } });
    }
    if (url.pathname.includes("/rpc/agenda_cle_calendrier")) return route.fulfill({ json: admin ? "c".repeat(64) : null });
    if (url.pathname.includes("/rpc/facture_creer")) {
      if (!admin) return route.fulfill({ status: 403, json: { message: "Accès refusé" } });
      const { p_devis_id, p_type } = JSON.parse(req.postData() || "{}");
      try { return route.fulfill({ json: creerFacture(base, p_devis_id, p_type) }); }
      catch (e) { return route.fulfill({ status: 400, json: { message: e.message, code: "P0001" } }); }
    }
    if (url.pathname.includes("/rpc/devis_public")) {
      const { p_token } = JSON.parse(req.postData() || "{}");
      const d = base.devis.find((x) => x.lien_token === p_token);
      if (!d) return route.fulfill({ json: null });
      const { notes_internes, ...visible } = d;
      return route.fulfill({ json: { devis: visible, lignes: base.devis_lignes.filter((l) => l.devis_id === d.id).sort((a, b) => a.ordre - b.ordre), agence: base.parametres_agence[0],
        factures: (base.factures ?? []).filter((f) => f.devis_id === d.id && f.statut !== "annulee").map(({ notes, creee_par, ...f }) => f),
        ...(() => {
          const passe = d.statut === "accepte" && (d.date_evenement ?? "9999") <= new Date().toISOString().slice(0, 10);
          const ids = [...new Set(base.affectations.filter((a) => a.devis_id === d.id && a.statut !== "annule").map((a) => a.staff_id))];
          return {
            equipe: passe ? ids.map((id) => { const s = base.staff.find((x) => x.id === id); return { id, prenom: s.prenom, initiale: s.nom.charAt(0), photo: null, poste: "Hôtesse d'accueil", note: base.evaluations_crew.find((v) => v.devis_id === d.id && v.staff_id === id)?.note ?? null }; }) : [],
            avis_google: passe ? base.parametres_agence[0].lien_avis_google ?? null : null,
          };
        })() } });
    }
    // Instagram : clé Pixabay (jamais relisible)
    if (url.pathname.includes("/rpc/instagram_reglages")) return route.fulfill({ json: { pixabay: !!base.cle_pixabay, instagram: !!base.instagram, instagram_nom: base.instagram ?? null } });
    if (url.pathname.includes("/rpc/instagram_enregistrer_cle")) { base.cle_pixabay = JSON.parse(req.postData() || "{}").p_valeur; return route.fulfill({ status: 204, body: "" }); }
    // Accueil personnalisé de l'administration
    if (url.pathname.includes("/rpc/mon_accueil")) {
      const p = (base.admin_profils ?? []).find((x) => x.email === email);
      if (!p) return route.fulfill({ json: { prenom: null } });
      const n = p.espace === "nawar";
      return route.fulfill({ json: { prenom: p.prenom, espace: p.espace ?? "admin", mot: p.recoit_mots ? (n ? base.mot_nawar : base.mot_du_jour) ?? null : null,
        surprise: p.recoit_mots && !p.surprise_vue_le ? (n ? base.surprise_nawar : base.surprise) ?? null : null, signatures_vues_jusqu_au: p.signatures_vues_jusqu_au, records_vus: p.records_vus ?? [] } });
    }
    if (url.pathname.includes("/rpc/accueil_marquer")) {
      const { p_quoi } = JSON.parse(req.postData() || "{}");
      const p = (base.admin_profils ?? []).find((x) => x.email === email);
      if (p && p_quoi === "surprise") p.surprise_vue_le = new Date().toISOString();
      if (p && p_quoi === "signatures") p.signatures_vues_jusqu_au = new Date().toISOString();
      if (p && p_quoi?.startsWith("record:")) (p.records_vus ??= []).push(p_quoi.slice(7));
      return route.fulfill({ status: 204, body: "" });
    }
    // Statistiques de fréquentation
    if (url.pathname.includes("/rpc/suivi_enregistrer")) {
      base.evenements_site ??= [];
      for (const e of JSON.parse(req.postData() || "{}").p_evenements ?? []) base.evenements_site.push({ ...e, cree_le: new Date().toISOString() });
      return route.fulfill({ status: 204, body: "" });
    }
    if (url.pathname.includes("/rpc/statistiques_site")) {
      if (!admin && !nawar) return route.fulfill({ status: 400, json: { message: "Accès refusé" } });
      const ev = base.evenements_site ?? [];
      const compte = (liste, cle, distinct) => { const m = new Map(); for (const e of liste) { const k = e[cle]; if (!m.has(k)) m.set(k, new Set()); m.get(k).add(distinct ? e.session : Math.random()); } return [...m].map(([k, s]) => ({ cle: k, valeur: s.size })).sort((a, b) => b.valeur - a.valeur); };
      const sessions = new Set(ev.map((e) => e.session)).size;
      const jours = Array.from({ length: 30 }, (_, i) => new Date(Date.now() - (29 - i) * 864e5).toISOString().slice(0, 10));
      return route.fulfill({ json: {
        visites: sessions, pages_vues: ev.filter((e) => e.type === "vue").length, demandes: ev.filter((e) => e.type === "demande").length,
        clics_contact: ev.filter((e) => e.type === "clic" && ["whatsapp", "telephone", "email"].includes(e.nom)).length,
        avant: { visites: 1, pages_vues: 2, demandes: 0, clics_contact: 0 },
        par_jour: jours.map((j) => ({ jour: j, visites: new Set(ev.filter((e) => e.cree_le.slice(0, 10) === j).map((e) => e.session)).size })),
        pages: compte(ev.filter((e) => e.type === "vue"), "chemin"), sources: compte(ev, "source", true), clics: compte(ev.filter((e) => e.type === "clic"), "nom"),
        demandes_detail: compte(ev.filter((e) => e.type === "demande"), "nom"), appareils: compte(ev, "appareil", true),
      } });
    }
    // Espace mariés et réponses des invités
    const rpcMariage = url.pathname.match(/\/rpc\/(espace_maries_public|espace_maries_enregistrer|invite_enregistrer|invite_supprimer|rsvp_public|rsvp_repondre)$/);
    if (rpcMariage) {
      const corps = JSON.parse(req.postData() || "{}");
      base.espace_maries ??= []; base.invites_mariage ??= [];
      const d = corps.p_token ? base.devis.find((x) => x.lien_token === corps.p_token && x.type === "mariage" && x.statut === "accepte") : null;
      const sans = ({ devis_id, ...x }) => x;
      switch (rpcMariage[1]) {
        case "espace_maries_public": {
          if (!d) return route.fulfill({ json: null });
          if (!base.espace_maries.some((e) => e.devis_id === d.id)) base.espace_maries.push({ devis_id: d.id, noms: d.client_nom, checklist: [], budget: [], programme: [], tables: [], budget_total: null, message_invites: null, date_limite_reponse: null });
          return route.fulfill({ json: { devis: { client_nom: d.client_nom, date_evenement: d.date_evenement, lieu: d.lieu, nb_personnes: d.nb_personnes, devise: "MAD" },
            espace: sans(base.espace_maries.find((e) => e.devis_id === d.id)), invites: base.invites_mariage.filter((i) => i.devis_id === d.id).map(sans) } });
        }
        case "espace_maries_enregistrer": {
          if (!d) return route.fulfill({ status: 400, json: { message: "Espace introuvable" } });
          Object.assign(base.espace_maries.find((e) => e.devis_id === d.id), corps.p_donnees);
          return route.fulfill({ status: 204, body: "" });
        }
        case "invite_enregistrer": {
          if (!d) return route.fulfill({ status: 400, json: { message: "Espace introuvable" } });
          const p = corps.p_invite;
          let i = p.id && base.invites_mariage.find((x) => x.id === p.id && x.devis_id === d.id);
          if (i) Object.assign(i, p, { table_id: p.table_id || null });
          else { i = { id: crypto.randomUUID(), jeton: crypto.randomUUID(), devis_id: d.id, reponse: "attente", nb_confirmes: null, remarque: null, table_id: null, repondu_le: null, cote: "commun", nb_prevus: 1, ...p }; base.invites_mariage.push(i); }
          return route.fulfill({ json: sans(i) });
        }
        case "invite_supprimer":
          base.invites_mariage = base.invites_mariage.filter((x) => !(x.id === corps.p_id && d && x.devis_id === d.id));
          return route.fulfill({ status: 204, body: "" });
        case "rsvp_public": {
          const i = base.invites_mariage.find((x) => x.jeton === corps.p_jeton); if (!i) return route.fulfill({ json: null });
          const dv = base.devis.find((x) => x.id === i.devis_id); const e = base.espace_maries.find((x) => x.devis_id === i.devis_id) ?? {};
          return route.fulfill({ json: { nom: i.nom, nb_prevus: i.nb_prevus, reponse: i.reponse, nb_confirmes: i.nb_confirmes, remarque: i.remarque, noms: e.noms || dv.client_nom,
            date_evenement: dv.date_evenement, lieu: dv.lieu, message: e.message_invites ?? null, date_limite: e.date_limite_reponse ?? null } });
        }
        case "rsvp_repondre": {
          const i = base.invites_mariage.find((x) => x.jeton === corps.p_jeton); if (!i) return route.fulfill({ status: 400, json: { message: "Invitation introuvable" } });
          Object.assign(i, { reponse: corps.p_reponse, nb_confirmes: corps.p_reponse === "oui" ? Math.max(1, Math.min(corps.p_nb ?? i.nb_prevus, i.nb_prevus)) : 0, remarque: corps.p_remarque || null, repondu_le: new Date().toISOString() });
          return route.fulfill({ status: 204, body: "" });
        }
      }
    }
    if (url.pathname.includes("/rpc/")) return route.fulfill({ json: null });
    const m = url.pathname.match(/\/rest\/v1\/(\w+)/); if (!m) return route.fulfill({ json: {} });
    const t = m[1]; base[t] ??= []; const params = [...url.searchParams.entries()]; const select = url.searchParams.get("select");
    const unique = (req.headers()["accept"] || "").includes("vnd.pgrst.object");
    if (req.method() === "HEAD") {
      let lignes = base[t].filter((x) => correspond(x, params));
      if (!admin && t === "realisations") lignes = lignes.filter((r) => r.publie);
      return route.fulfill({ status: 200, headers: { "content-range": `0-${Math.max(0, lignes.length - 1)}/${lignes.length}`, "access-control-expose-headers": "content-range" }, body: "" });
    }
    if (req.method() === "GET") {
      let lignes = base[t];
      if (!admin) {
        if (["fiches_mission", "vitrine", "references_clients", "temoignages"].includes(t)) lignes = [];
        if (["contrats", "fiches_paie", "affectations", "disponibilites", "remarques_contrat"].includes(t)) lignes = lignes.filter((r) => r.staff_id === moi()?.id);
        if (t === "staff") lignes = lignes.filter((r) => r.email === email);
        if (["devis", "devis_lignes", "devis_mariage", "devis_entreprise", "admins", "factures", "rendez_vous", "agenda_parametres", "agenda_horaires", "agenda_indisponibilites"].includes(t)) lignes = [];
      }
      const r = lignes.filter((x) => correspond(x, params)).map((x) => {
        const y = { ...x };
        if (select?.includes("staff(")) y.staff = base.staff.find((s) => s.id === x.staff_id) ?? null;
        if (select?.includes("contrats(")) { const c = base.contrats.find((s) => s.id === x.contrat_id); y.contrats = c ? { ...c, devis: admin ? base.devis.find((d) => d.id === c.devis_id) ?? null : null } : null; }
        if (select?.includes("devis(")) y.devis = admin ? base.devis.find((s) => s.id === x.devis_id) ?? null : null;
        if (select?.includes("affectations(") && t === "devis") y.affectations = base.affectations.filter((af) => af.devis_id === x.id);
        if (t === "devis" && select?.includes("factures(")) y.factures = (base.factures ?? []).filter((f) => f.devis_id === x.id);
        if (t === "devis" && select?.includes("contrats(")) y.contrats = base.contrats.filter((c) => c.devis_id === x.id);
        return y;
      });
      return route.fulfill({ json: unique ? r[0] ?? null : r });
    }
    if (req.method() === "POST") {
      const corps = [].concat(JSON.parse(req.postData()));
      const ins = corps.map((b) => ({ id: t + Math.random().toString(36).slice(2), statut: t === "affectations" ? "confirme" : t === "remarques_contrat" ? "nouvelle" : b.statut ?? "brouillon", created_at: new Date().toISOString(), ...b }));
      if (t === "devis") ins.forEach((d) => { d.numero = "DEV-2026-0099"; d.date_validite = "2099-11-12"; d.total_ttc = 0; d.lien_token = crypto.randomUUID(); d.relances = 0; });
      base[t].push(...ins);
      return route.fulfill({ status: 201, json: unique ? ins[0] : ins });
    }
    if (req.method() === "PATCH" && t === "factures") {
      const b = JSON.parse(req.postData()); const r = base[t].filter((x) => correspond(x, params));
      for (const x of r) {
        if (x.statut === "annulee" && b.statut && b.statut !== "annulee") return route.fulfill({ status: 400, json: { message: "Une facture annulée ne peut pas être rétablie." } });
        Object.assign(x, b); if (b.statut === "a_payer") Object.assign(x, { payee_le: null, mode_paiement: null });
      }
      return route.fulfill({ status: 200, json: r });
    }
    if (req.method() === "DELETE" && t === "devis") {
      const cibles = base.devis.filter((x) => correspond(x, params));
      if (cibles.some((d) => d.signe_le)) return route.fulfill({ status: 400, json: { code: "P0001", message: "Un devis signé ne peut pas être supprimé : archive-le (ou passe-le en « Annulé »)." } });
      if (cibles.some((d) => (base.factures ?? []).some((f) => f.devis_id === d.id))) return route.fulfill({ status: 400, json: { code: "P0001", message: "Un devis facturé ne peut pas être supprimé : archive-le pour le retirer de la liste." } });
    }
    if (req.method() === "DELETE" && t === "contrats" && base.contrats.some((c) => correspond(c, params) && c.signe_le))
      return route.fulfill({ status: 400, json: { code: "P0001", message: "Un contrat signé ne peut pas être supprimé : annule-le." } });
    if (req.method() === "DELETE" && t === "staff" && base.staff.some((x) => correspond(x, params) && (base.contrats.some((c) => c.staff_id === x.id && c.signe_le) || base.fiches_paie.some((f) => f.staff_id === x.id))))
      return route.fulfill({ status: 400, json: { code: "P0001", message: "Cette personne a des contrats signés ou des fiches de paie : ces documents doivent être conservés. Bannis-la plutôt que de la supprimer." } });
    if (req.method() === "PATCH" && t === "devis") {
      const b = JSON.parse(req.postData());
      for (const d of base.devis.filter((x) => correspond(x, params))) {
        if (["annule", "refuse"].includes(b.statut) && !["annule", "refuse"].includes(d.statut)) {
          base.affectations.filter((a) => a.devis_id === d.id).forEach((a) => { a.statut = "annule"; });
          base.contrats.filter((c) => c.devis_id === d.id).forEach((c) => { c.statut = "annule"; });
        }
      }
    }
    if (req.method() === "PATCH") { const b = JSON.parse(req.postData()); const r = base[t].filter((x) => correspond(x, params)); r.forEach((x) => Object.assign(x, b)); return route.fulfill({ status: 200, json: unique ? r[0] : r }); }
    if (req.method() === "DELETE") { base[t] = base[t].filter((x) => !correspond(x, params)); return route.fulfill({ status: 204, body: "" }); }
    return route.fulfill({ json: [] });
  });
  const page = await ctx.newPage();
  const erreurs = []; page.on("pageerror", (e) => erreurs.push(e.message));
  return { ctx, page, erreurs };
}

/** Se connecte (session simulée) avant d'ouvrir une page. */
export async function connecter(page, base, email, chemin) {
  await page.goto(base + "/mentions-legales");
  await page.evaluate((email) => {
    sessionStorage.setItem("heavent-splash-vu", "1");
    localStorage.setItem("sb-mapiwnsjsluiwmnulhqk-auth-token", JSON.stringify({ access_token: "x", refresh_token: "y", token_type: "bearer", expires_in: 3600, expires_at: Math.floor(Date.now() / 1000) + 3600, user: { id: "u-" + email, email, aud: "authenticated", role: "authenticated" } }));
  }, email);
  await page.goto(base + chemin);
  await page.waitForTimeout(2500);
}
