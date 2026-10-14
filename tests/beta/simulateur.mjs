// Faux serveur Supabase en mémoire : permet de rejouer les parcours complets (devis, équipe, contrats,
// paie, inscription, disponibilités…) sans toucher aux vraies données.
import * as F from "./fixture.mjs";

export function nouvelleBase() {
  return {
    staff: F.staff.map((s) => ({ ...s, banni: false })), disponibilites: F.dispos.map((d) => ({ ...d })),
    affectations: [], contrats: [], fiches_paie: [], devis: [], devis_lignes: [],
    catalogue_prestations: F.catalogue, parametres_agence: F.param, devis_entreprise: [],
    devis_mariage: F.dem.map((d) => ({ ...d })), admins: [{ email: "admin@heavent.test" }],
    appelsFonctions: [],
  };
}

function correspond(ligne, params) {
  for (const [k, v] of params) {
    if (["select", "order", "limit", "offset", "on_conflict", "columns"].includes(k)) continue;
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
    if (url.pathname.includes("/storage/")) return route.fulfill({ status: 404, body: "" });
    if (url.pathname.includes("/functions/v1/")) {
      const nom = url.pathname.split("/").pop(); const corps = req.postData() ? JSON.parse(req.postData()) : {};
      base.appelsFonctions.push({ nom, corps });
      if (nom === "admin-change-password" && corps.action === "ban") base.staff.filter((s) => s.email === corps.userEmail).forEach((s) => { s.banni = true; });
      return route.fulfill({ json: { success: true, cree: !corps.action } });
    }
    if (url.pathname.includes("/rpc/is_admin")) return route.fulfill({ json: admin });
    if (url.pathname.includes("/rpc/generer_fiches_paie")) return route.fulfill({ json: genererFiches(base) });
    if (url.pathname.includes("/rpc/")) return route.fulfill({ json: null });
    const m = url.pathname.match(/\/rest\/v1\/(\w+)/); if (!m) return route.fulfill({ json: {} });
    const t = m[1]; base[t] ??= []; const params = [...url.searchParams.entries()]; const select = url.searchParams.get("select");
    const unique = (req.headers()["accept"] || "").includes("vnd.pgrst.object");
    if (req.method() === "GET") {
      let lignes = base[t];
      if (!admin) {
        if (["contrats", "fiches_paie", "affectations", "disponibilites"].includes(t)) lignes = lignes.filter((r) => r.staff_id === moi()?.id);
        if (t === "staff") lignes = lignes.filter((r) => r.email === email);
        if (["devis", "devis_lignes", "devis_mariage", "devis_entreprise", "admins"].includes(t)) lignes = [];
      }
      const r = lignes.filter((x) => correspond(x, params)).map((x) => {
        const y = { ...x };
        if (select?.includes("staff(")) y.staff = base.staff.find((s) => s.id === x.staff_id) ?? null;
        if (select?.includes("devis(")) y.devis = admin ? base.devis.find((s) => s.id === x.devis_id) ?? null : null;
        return y;
      });
      return route.fulfill({ json: unique ? r[0] ?? null : r });
    }
    if (req.method() === "POST") {
      const corps = [].concat(JSON.parse(req.postData()));
      const ins = corps.map((b) => ({ id: t + Math.random().toString(36).slice(2), statut: t === "affectations" ? "confirme" : b.statut ?? "brouillon", ...b }));
      if (t === "devis") ins.forEach((d) => { d.numero = "DEV-2026-0099"; d.date_validite = "2026-11-12"; d.total_ttc = 0; });
      base[t].push(...ins);
      return route.fulfill({ status: 201, json: unique ? ins[0] : ins });
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
