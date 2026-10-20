// Faux serveur Supabase de la démo Heavent Studio : répond dans le navigateur, sur des données fictives en mémoire.
// Seuls l'ouverture de la démo (studio_demo_public) et les images publiques passent par le vrai serveur.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { creerBaseDemo, type BaseDemo, type ConfigDemo } from "./donneesDemo";

let base: BaseDemo | null = null;
const fichiers = new Map<string, Blob>();
const fetchReel: typeof fetch = typeof window !== "undefined" ? window.fetch.bind(window) : fetch;
export const vraiFetch = fetchReel;

const r2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;
const uuid = () => (crypto as any).randomUUID?.() ?? Math.random().toString(36).slice(2) + Date.now().toString(36);
const json = (data: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json", ...headers } });
const vide = (status = 204) => new Response(null, { status });

export function demarrerDemo(cfg: ConfigDemo) {
  base = creerBaseDemo(cfg);
  for (const d of base.devis) recalculer(d.id);
  try { creerFacture(base.devis[0].id, "acompte", "signature en ligne"); } catch { /* */ }
  return base;
}
export const baseDemo = () => base;

/* ---------- Requêtes PostgREST simplifiées ---------- */
function valeurComparee(c: unknown, val: string) { return String(c ?? ""); }
function correspond(ligne: any, params: [string, string][]) {
  for (const [k, v] of params) {
    if (["select", "order", "limit", "offset", "on_conflict", "columns"].includes(k)) continue;
    if (k === "or" || k === "and") continue; // filtres combinés : ignorés (la démo reste permissive)
    let op = v.split(".")[0], val = v.slice(op.length + 1), neg = false;
    if (op === "not") { neg = true; op = val.split(".")[0]; val = val.slice(op.length + 1); }
    const c = ligne[k]; const s = valeurComparee(c, val);
    let ok = true;
    if (op === "eq") ok = s === val;
    else if (op === "neq") ok = s !== val;
    else if (op === "gt") ok = s > val; else if (op === "gte") ok = s >= val;
    else if (op === "lt") ok = s < val; else if (op === "lte") ok = s <= val;
    else if (op === "is") ok = val === "null" ? c == null : val === "true" ? c === true : val === "false" ? c === false : true;
    else if (op === "like" || op === "ilike") { const re = new RegExp("^" + val.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/%/g, ".*") + "$", op === "ilike" ? "i" : ""); ok = re.test(s); }
    else if (op === "in") { const l = val.replace(/^\(|\)$/g, "").split(",").map((x) => x.replace(/"/g, "")); ok = l.includes(s); }
    else if (op === "cs") { try { const l = JSON.parse(val.replace(/^\{/, "[").replace(/\}$/, "]")); ok = Array.isArray(c) && l.every((x: unknown) => (c as unknown[]).includes(x)); } catch { ok = true; } }
    if (neg) ok = !ok;
    if (!ok) return false;
  }
  return true;
}
function trier(lignes: any[], order: string | null) {
  if (!order) return lignes;
  const cles = order.split(",").map((o) => { const [col, sens] = o.split("."); return { col, desc: sens === "desc" }; });
  return [...lignes].sort((a, b) => {
    for (const { col, desc } of cles) {
      const x = a[col], y = b[col]; if (x === y) continue;
      if (x == null) return 1; if (y == null) return -1;
      return (x > y ? 1 : -1) * (desc ? -1 : 1);
    }
    return 0;
  });
}
const CLE_ETRANGERE: Record<string, string> = { staff: "staff_id", devis: "devis_id", contrats: "contrat_id", devis_mariage: "demande_mariage_id", devis_entreprise: "demande_entreprise_id" };
function joindre(t: string, x: any, select: string | null) {
  if (!select || !base) return x;
  const y = { ...x };
  for (const m of select.matchAll(/(?:(\w+):)?(\w+)(?:!\w+)?\(/g)) {
    const alias = m[1] ?? m[2], cible = m[2]; const lignes = base[cible]; if (!lignes) continue;
    const fk = CLE_ETRANGERE[cible];
    if (fk && fk in x) y[alias] = lignes.find((l: any) => l.id === x[fk]) ?? null;
    else { const fkEnfant = CLE_ETRANGERE[t] ?? `${t.replace(/s$/, "")}_id`; y[alias] = lignes.filter((l: any) => l[fkEnfant] === x.id); }
  }
  return y;
}

function recalculer(devisId: string) {
  if (!base) return;
  const d = base.devis.find((x: any) => x.id === devisId); if (!d) return;
  const lignes = base.devis_lignes.filter((l: any) => l.devis_id === devisId);
  for (const l of lignes) l.total_ht = r2((+l.quantite || 0) * (+l.duree || 1) * (+l.prix_unitaire || 0) * (1 - (+l.remise_pct || 0) / 100));
  const ht = r2(lignes.reduce((t: number, l: any) => t + l.total_ht, 0)), remise = r2(ht * (+d.remise_globale_pct || 0) / 100);
  const tva = r2((ht - remise) * (d.taux_tva ?? 20) / 100);
  Object.assign(d, { total_ht: ht, total_remise: remise, total_tva: tva, total_ttc: r2(ht - remise + tva) });
}

function creerFacture(devisId: string, type = "auto", par: string | null = null) {
  if (!base) throw new Error("Démo non démarrée");
  const d = base.devis.find((x: any) => x.id === devisId);
  if (!d) throw new Error("Devis introuvable.");
  if (d.statut !== "accepte") throw new Error("Le devis doit être accepté avant d'être facturé.");
  recalculer(devisId);
  const lignes = base.devis_lignes.filter((l: any) => l.devis_id === d.id).sort((a: any, b: any) => a.ordre - b.ordre);
  const ttc = d.total_ttc;
  if (ttc <= 0) throw new Error("Le devis est à 0 : rien à facturer.");
  const actives = base.factures.filter((f: any) => f.devis_id === d.id && f.statut !== "annulee");
  const finale = actives.find((f: any) => f.type !== "acompte");
  if (finale) throw new Error(`Ce devis est déjà entièrement facturé (facture ${finale.numero}).`);
  const acomptes = actives.filter((f: any) => f.type === "acompte");
  if (type === "auto") type = d.acompte_pct > 0 && !acomptes.length ? "acompte" : "solde";
  if (type === "acompte" && acomptes.length) throw new Error("La facture d'acompte de ce devis existe déjà.");
  if (type !== "acompte") type = acomptes.length ? "solde" : "totale";
  const commun = { id: uuid(), numero: `FAC-2026-${String(++base._meta.compteurFactures).padStart(4, "0")}`, devis_id: d.id, devis_numero: d.numero, type, marque: "heavent",
    date_emission: new Date().toISOString().slice(0, 10), client_nom: d.client_nom, client_societe: d.client_societe ?? null, client_email: d.client_email ?? null,
    client_telephone: d.client_telephone ?? null, client_adresse: d.client_adresse ?? null, client_ice: d.client_ice ?? null, titre: d.titre ?? null,
    date_evenement: d.date_evenement ?? null, date_fin_evenement: d.date_fin_evenement ?? null, lieu: d.lieu ?? null, taux_tva: d.taux_tva ?? 20, devise: "MAD",
    statut: "a_payer", payee_le: null, mode_paiement: null, envoyee_le: null, creee_par: par, created_at: new Date().toISOString() };
  let f: any;
  if (type === "acompte") {
    const a = r2(ttc * d.acompte_pct / 100), aht = r2(a / (1 + (d.taux_tva ?? 20) / 100));
    f = { ...commun, lignes: [{ designation: `Acompte de ${d.acompte_pct} % sur le devis N° ${d.numero}`, description: d.titre, quantite: 1, duree: 1, unite: "forfait", prix_unitaire: aht, remise_pct: 0, total_ht: aht }],
      remise_globale_pct: 0, total_ht: aht, total_remise: 0, total_tva: r2(a - aht), total_ttc: a, acompte_pct: d.acompte_pct, deductions: [], deduction_ttc: 0, net_a_payer: a };
  } else {
    const ded = r2(acomptes.reduce((t: number, a: any) => t + a.total_ttc, 0));
    f = { ...commun, lignes, remise_globale_pct: d.remise_globale_pct || 0, total_ht: d.total_ht, total_remise: d.total_remise, total_tva: d.total_tva, total_ttc: ttc, acompte_pct: null,
      deductions: acomptes.map((a: any) => ({ numero: a.numero, date: a.date_emission, ht: a.total_ht, tva: a.total_tva, ttc: a.total_ttc, payee: a.statut === "payee" })), deduction_ttc: ded, net_a_payer: r2(ttc - ded) };
  }
  base.factures.push(f);
  return f;
}

function creneauxLibres() {
  if (!base) return [];
  const p = base.agenda_parametres[0]; if (!p.actif) return [];
  const res: any[] = []; const maintenant = Date.now();
  for (let k = 0; k <= p.horizon_jours; k++) {
    const jour = new Date(maintenant + k * 864e5).toISOString().slice(0, 10);
    const isodow = ((new Date(jour + "T12:00:00Z").getUTCDay() + 6) % 7) + 1;
    for (const h of base.agenda_horaires.filter((x: any) => x.jour === isodow)) {
      const d0 = Date.parse(`${jour}T${h.debut.slice(0, 5)}:00Z`), f0 = Date.parse(`${jour}T${h.fin.slice(0, 5)}:00Z`);
      for (let d = d0; d + p.duree_minutes * 6e4 <= f0; d += (p.duree_minutes + p.pause_minutes) * 6e4) {
        const f = d + p.duree_minutes * 6e4;
        if (d < maintenant + p.delai_heures * 3600e3) continue;
        const occupe = base.rendez_vous.some((r: any) => r.statut === "confirme" && Date.parse(r.debut) < f && Date.parse(r.fin) > d)
          || base.agenda_indisponibilites.some((i: any) => Date.parse(i.debut) < f && Date.parse(i.fin) > d);
        if (!occupe) res.push({ debut: new Date(d).toISOString(), fin: new Date(f).toISOString() });
      }
    }
  }
  return res;
}

function genererFiches(annee: number, mois: number) {
  if (!base) return 0;
  const groupes: Record<string, any[]> = {};
  base.affectations.filter((a: any) => a.statut !== "annule").forEach((a: any) => (groupes[a.staff_id] ??= []).push(a));
  base.fiches_paie = base.fiches_paie.filter((f: any) => !(f.annee === annee && f.mois === mois && f.statut === "en_attente"));
  for (const [sid, ls] of Object.entries(groupes)) {
    const h = ls.reduce((t, l) => t + (+l.heures || 0), 0), brut = ls.reduce((t, l) => t + (+l.heures || 0) * (+l.taux_horaire || 0), 0);
    const cnss = +(Math.min(brut, 6000) * 0.0448).toFixed(2), amo = +(brut * 0.0226).toFixed(2);
    base.fiches_paie.push({ id: uuid(), staff_id: sid, mois, annee, heures_travaillees: h, salaire_brut: brut, cnss, amo, deductions: +(cnss + amo).toFixed(2), prime: 0,
      salaire_net: +(brut - cnss - amo).toFixed(2), statut: "en_attente", generee_auto: true, created_at: new Date().toISOString(),
      details: ls.map((l) => { const d = base!.devis.find((x: any) => x.id === l.devis_id); return { date: l.date_jour, evenement: d?.titre, numero: d?.numero, poste: l.poste, heures: l.heures, taux: l.taux_horaire, montant: l.heures * l.taux_horaire }; }) });
  }
  return Object.keys(groupes).length;
}

function statistiques(jours: number) {
  const depuis = Date.now() - jours * 864e5;
  const ev = (base?.evenements_site ?? []).filter((e: any) => Date.parse(e.cree_le) >= depuis);
  const compte = (liste: any[], cle: string, distinct = false) => {
    const m = new Map<string, Set<string>>(); let i = 0;
    for (const e of liste) { const k = e[cle]; if (!m.has(k)) m.set(k, new Set()); m.get(k)!.add(distinct ? e.session : String(i++)); }
    return [...m].map(([k, s]) => ({ cle: k, valeur: s.size })).sort((a, b) => b.valeur - a.valeur);
  };
  const sessions = new Set(ev.map((e: any) => e.session)).size;
  const n = Math.min(jours, 60);
  const liste = Array.from({ length: n }, (_, i) => new Date(Date.now() - (n - 1 - i) * 864e5).toISOString().slice(0, 10));
  return {
    visites: sessions, pages_vues: ev.filter((e: any) => e.type === "vue").length, demandes: ev.filter((e: any) => e.type === "demande").length,
    clics_contact: ev.filter((e: any) => e.type === "clic").length,
    avant: { visites: Math.round(sessions * 0.8), pages_vues: Math.round(ev.length * 0.78), demandes: 66, clics_contact: 94 },
    par_jour: liste.map((j) => ({ jour: j, visites: new Set(ev.filter((e: any) => e.cree_le.slice(0, 10) === j).map((e: any) => e.session)).size })),
    pages: compte(ev.filter((e: any) => e.type === "vue"), "chemin"), sources: compte(ev, "source", true), clics: compte(ev.filter((e: any) => e.type === "clic"), "nom"),
    demandes_detail: compte(ev.filter((e: any) => e.type === "demande"), "nom"), appareils: compte(ev, "appareil", true),
  };
}

function devisPublic(token: string) {
  if (!base) return null;
  const d = base.devis.find((x: any) => x.lien_token === token); if (!d) return null;
  const { notes_internes, ...visible } = d;
  return { devis: visible, lignes: base.devis_lignes.filter((l: any) => l.devis_id === d.id).sort((a: any, b: any) => a.ordre - b.ordre), agence: base.parametres_agence[0],
    factures: base.factures.filter((f: any) => f.devis_id === d.id && f.statut !== "annulee"), equipe: [], avis_google: null };
}

async function lireCorps(init?: RequestInit): Promise<any> {
  const b = init?.body;
  if (b == null) return {};
  if (typeof b === "string") { try { return JSON.parse(b); } catch { return {}; } }
  return b;
}

/* ---------- Routeur ---------- */
async function repondre(url: URL, methode: string, init: RequestInit | undefined, accept: string): Promise<Response> {
  if (!base) return json({ message: "Démo non démarrée" }, 503);
  const p = url.pathname;
  const maintenant = new Date().toISOString();

  // Connexion fictive
  if (p.includes("/auth/v1/")) {
    const user = { id: "demo-user", email: "demo@heavent.studio", aud: "authenticated", role: "authenticated", app_metadata: {}, user_metadata: {}, created_at: maintenant };
    if (p.endsWith("/user")) return json(user);
    if (p.endsWith("/token")) return json({ access_token: "demo", refresh_token: "demo", token_type: "bearer", expires_in: 86400, expires_at: Math.floor(Date.now() / 1000) + 86400, user });
    return vide();
  }

  // Fichiers : gardés en mémoire ; les images publiques réelles (visuels) restent servies par le serveur
  if (p.includes("/storage/v1/")) {
    const m = p.match(/\/storage\/v1\/object\/(?:public\/|sign\/|authenticated\/)?(.+)$/);
    if (m && (methode === "POST" || methode === "PUT")) {
      const corps = init?.body;
      let blob: Blob | null = null;
      if (corps instanceof Blob) blob = corps;
      else if (corps instanceof FormData) { const v = [...corps.values()].find((x) => x instanceof Blob); blob = (v as Blob) ?? null; }
      else if (corps instanceof ArrayBuffer) blob = new Blob([corps]);
      if (blob) fichiers.set(decodeURIComponent(m[1]), blob);
      return json({ Key: m[1], Id: uuid() });
    }
    if (m && methode === "GET") {
      const f = fichiers.get(decodeURIComponent(m[1].split("?")[0]));
      if (f) return new Response(f, { status: 200, headers: { "content-type": f.type || "image/jpeg" } });
      return fetchReel(url.toString());
    }
    if (p.includes("/object/list/")) return json([]);
    if (p.includes("/object/sign/")) return json({ signedURL: url.pathname });
    return json([]);
  }

  // Fonctions serveur : aucune n'envoie réellement quoi que ce soit en démo
  if (p.includes("/functions/v1/")) {
    const nom = p.split("/").pop(); const c = await lireCorps(init);
    if (nom === "envoyer-devis") {
      const d = base.devis.find((x: any) => x.id === c.devisId);
      if (!d?.client_email) return json({ error: "Ajoutez l'e-mail du client dans le devis avant de l'envoyer." }, 400);
      Object.assign(d, { statut: d.statut === "brouillon" ? "envoye" : d.statut, date_envoi: maintenant, relances: 0 });
      return json({ success: true, demo: true, lien: `${location.origin}/studio` });
    }
    if (nom === "envoyer-facture") { const f = base.factures.find((x: any) => x.id === c.factureId); if (f) f.envoyee_le = maintenant; return json({ success: true }); }
    if (nom === "instagram-photos") return json({ photos: [] });
    if (nom === "instagram-publier") {
      if (c.action === "publier") { const post = base.posts_instagram.find((x: any) => x.id === c.post_id); if (post) Object.assign(post, { statut: "publie", publie_le: maintenant }); return json({ media: "demo" }); }
      return json({ ok: true });
    }
    if (nom === "newsletter") {
      if (c.action === "envoyer") { const nl = base.newsletters.find((x: any) => x.id === c.newsletter_id); const n = base.abonnes_newsletter.filter((a: any) => a.consentement).length; if (nl) Object.assign(nl, { statut: "envoyee", envoyee_le: maintenant, nb_destinataires: n }); return json({ envoyes: n, total: n, erreurs: [] }); }
      return json({ ok: true });
    }
    return json({ success: true, demo: true });
  }

  // Fonctions de la base (RPC)
  const rpc = p.match(/\/rest\/v1\/rpc\/(\w+)/)?.[1];
  if (rpc) {
    const c = await lireCorps(init);
    switch (rpc) {
      case "is_admin": return json(true);
      case "est_espace_nawar": return json(false);
      case "mon_accueil": return json({ prenom: base._meta.prenom, espace: "admin", mot: null, surprise: null, signatures_vues_jusqu_au: maintenant, records_vus: [] });
      case "statistiques_site": return json(statistiques(c.p_jours ?? 30));
      case "agenda_creneaux": return json(creneauxLibres());
      case "agenda_public": { const a = base.agenda_parametres[0]; return json({ duree_minutes: a.duree_minutes, types: a.types, actif: a.actif, adresse: null }); }
      case "agenda_cle_calendrier": return json("demo".padEnd(64, "0"));
      case "generer_fiches_paie": return json(genererFiches(c.p_annee ?? new Date().getFullYear(), c.p_mois ?? new Date().getMonth() + 1));
      case "facture_creer": try { return json(creerFacture(c.p_devis_id, c.p_type ?? "auto", c.p_par ?? null)); } catch (e) { return json({ message: (e as Error).message, code: "P0001" }, 400); }
      case "devis_public": return json(devisPublic(c.p_token));
      case "instagram_reglages": return json({ pixabay: true, instagram: true, instagram_nom: "votre_agence", secret_app: true, webhook_jeton: "demo", abonne_le: maintenant });
      case "vitrine_public": { const v = base.vitrine[0]; return json({ chiffres: { annees: v.annees_experience, evenements: v.nb_evenements, crews: v.nb_crews }, google: { note: v.google_note, nb: v.google_nb_avis, lien: null },
        engagements: { cnss: true, assurance: true, remplacement: true, reponse24h: true }, faq: v.faq, references: base.references_clients, temoignages: base.temoignages }); }
      case "staff_email_exists": return json(false);
      default: return rpc.startsWith("instagram_enregistrer") || rpc === "accueil_marquer" || rpc === "notification_essai" || rpc === "suivi_enregistrer" ? vide() : json(null);
    }
  }

  // Tables
  const m = p.match(/\/rest\/v1\/(\w+)/); if (!m) return json({});
  const t = m[1]; base[t] ??= [];
  const params = [...url.searchParams.entries()] as [string, string][];
  const select = url.searchParams.get("select");
  const unique = accept.includes("vnd.pgrst.object");
  const plage = (n: number) => ({ "content-range": `0-${Math.max(0, n - 1)}/${n}` });

  if (methode === "HEAD") { const n = base[t].filter((x: any) => correspond(x, params)).length; return new Response(null, { status: 200, headers: plage(n) }); }
  if (methode === "GET") {
    let r = trier(base[t].filter((x: any) => correspond(x, params)), url.searchParams.get("order"));
    const total = r.length;
    const off = +(url.searchParams.get("offset") ?? 0), lim = url.searchParams.get("limit");
    r = r.slice(off, lim ? off + +lim : undefined).map((x: any) => joindre(t, x, select));
    if (unique) return r[0] ? json(r[0]) : json({ code: "PGRST116", message: "Aucune ligne" }, 406);
    return json(r, 200, plage(total));
  }
  if (methode === "POST") {
    const corps = [].concat(await lireCorps(init));
    const conflit = url.searchParams.get("on_conflict")?.split(",");
    const res: any[] = [];
    for (const b of corps as any[]) {
      const existant = conflit ? base[t].find((x: any) => conflit.every((k) => x[k] === b[k])) : b.id ? base[t].find((x: any) => x.id === b.id) : null;
      if (existant) { Object.assign(existant, b); res.push(existant); continue; }
      const x: any = { id: uuid(), created_at: maintenant, cree_le: maintenant, ...b };
      if (t === "devis") Object.assign(x, { numero: `DEV-2026-${String(++base._meta.compteurDevis).padStart(4, "0")}`, lien_token: uuid(), relances: 0, statut: b.statut ?? "brouillon",
        date_emission: b.date_emission ?? maintenant.slice(0, 10), date_validite: b.date_validite ?? new Date(Date.now() + 30 * 864e5).toISOString().slice(0, 10), total_ht: 0, total_ttc: 0, total_tva: 0, total_remise: 0 });
      if (t === "affectations") x.statut ??= "confirme";
      if (t === "contrats") x.statut ??= "brouillon";
      if (t === "remarques_contrat") x.statut ??= "nouvelle";
      if (t === "fiches_paie") x.statut ??= "en_attente";
      if (t === "newsletters") x.statut ??= "brouillon";
      base[t].push(x); res.push(x);
    }
    if (t === "devis_lignes") new Set(res.map((l) => l.devis_id)).forEach((id) => recalculer(id as string));
    return json(unique ? res[0] : res, 201);
  }
  if (methode === "PATCH") {
    const b = await lireCorps(init); const r = base[t].filter((x: any) => correspond(x, params));
    if (t === "factures" && r.some((x: any) => x.statut === "annulee") && b.statut && b.statut !== "annulee") return json({ message: "Une facture annulée ne peut pas être rétablie." }, 400);
    r.forEach((x: any) => Object.assign(x, b));
    if (t === "devis") r.forEach((d: any) => recalculer(d.id));
    if (t === "devis_lignes") new Set(r.map((l: any) => l.devis_id)).forEach((id) => recalculer(id as string));
    return json(unique ? r[0] ?? null : r);
  }
  if (methode === "DELETE") {
    const cibles = base[t].filter((x: any) => correspond(x, params));
    if (t === "devis" && cibles.some((d: any) => d.signe_le)) return json({ code: "P0001", message: "Un devis signé ne peut pas être supprimé : archive-le (ou passe-le en « Annulé »)." }, 400);
    if (t === "contrats" && cibles.some((c: any) => c.signe_le)) return json({ code: "P0001", message: "Un contrat signé ne peut pas être supprimé : annule-le." }, 400);
    base[t] = base[t].filter((x: any) => !cibles.includes(x));
    if (t === "devis_lignes") new Set(cibles.map((l: any) => l.devis_id)).forEach((id) => recalculer(id as string));
    return json(unique ? cibles[0] ?? null : cibles);
  }
  return json([]);
}

/** Remplace fetch pour tout ce qui va vers Supabase pendant la démo. */
export const fetchDemo: typeof fetch = async (entree, init) => {
  const brut = typeof entree === "string" ? entree : entree instanceof URL ? entree.toString() : entree.url;
  const url = new URL(brut, location.href);
  if (!/\.supabase\.co$/.test(url.hostname) || url.pathname.includes("/rpc/studio_demo_public")) return fetchReel(entree as any, init);
  const methode = (init?.method ?? (entree instanceof Request ? entree.method : "GET")).toUpperCase();
  const entetes = new Headers(init?.headers ?? (entree instanceof Request ? entree.headers : undefined));
  if (entree instanceof Request && !init?.body && methode !== "GET" && methode !== "HEAD") init = { ...init, body: await entree.clone().text() };
  await new Promise((r) => setTimeout(r, 60)); // un léger délai, comme un vrai serveur
  try { return await repondre(url, methode, init, entetes.get("accept") ?? ""); }
  catch (e) { console.error("Démo :", e); return json({ message: "Erreur de la démo" }, 500); }
};
