// Agent d'audit : vérifie chaque semaine la santé du site et de l'application, et écrit un rapport.
// node tests/audit/audit.mjs   → rapport dans rapport-audit.md (+ code de sortie 1 si problème grave)
import { execSync } from "node:child_process";
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import tls from "node:tls";

const SITE = "https://heaventagency.com";
const SUPABASE = "https://mapiwnsjsluiwmnulhqk.supabase.co";
const CLE = "sb_publishable_FuR1ZTbO1AX8nVdtVz9KYQ_0pJQs7dz";
const graves = [], avertissements = [], ok = [];
const lignes = [];
const titre = (t) => lignes.push(`\n## ${t}\n`);
const note = (niveau, texte) => { (niveau === "grave" ? graves : niveau === "attention" ? avertissements : ok).push(texte); lignes.push(`- ${niveau === "grave" ? "🔴" : niveau === "attention" ? "🟠" : "🟢"} ${texte}`); };

// 1. Pages publiques : disponibles, balises SEO complètes et uniques
titre("Pages et SEO");
const sitemap = await (await fetch(`${SITE}/sitemap.xml`)).text();
const pages = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!pages.length) note("grave", "sitemap.xml vide ou illisible");
const vus = { titres: new Map(), descriptions: new Map() };
for (const url of pages) {
  const r = await fetch(url, { redirect: "manual" });
  const html = await r.text();
  const t = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  const d = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
  const canon = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? "";
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  const pb = [];
  if (r.status !== 200) pb.push(`statut ${r.status}`);
  if (t.length < 20 || t.length > 70) pb.push(`titre de ${t.length} caractères (idéal 30-65)`);
  if (d.length < 70 || d.length > 170) pb.push(`description de ${d.length} caractères (idéal 120-160)`);
  if (!canon) pb.push("pas d'adresse canonique");
  if (h1 !== 1) pb.push(`${h1} titre(s) H1 (il en faut 1)`);
  if (!/lang="fr"/.test(html)) pb.push("langue non déclarée en français");
  if (/noindex/.test(html)) pb.push("page marquée noindex");
  if (vus.titres.has(t)) pb.push(`même titre que ${vus.titres.get(t)}`); vus.titres.set(t, url);
  if (vus.descriptions.has(d)) pb.push(`même description que ${vus.descriptions.get(d)}`); vus.descriptions.set(d, url);
  note(pb.length ? (r.status !== 200 ? "grave" : "attention") : "ok", `${url} — ${pb.length ? pb.join(", ") : "complet"}`);
}
const robots = await (await fetch(`${SITE}/robots.txt`)).text();
note(robots.includes(`Sitemap: ${SITE}/sitemap.xml`) ? "ok" : "grave", "robots.txt pointe vers le bon sitemap");
const www = await fetch("https://www.heaventagency.com/", { redirect: "manual" }).catch(() => null);
note(www && [301, 308].includes(www.status) ? "ok" : "attention", `www.heaventagency.com redirige vers heaventagency.com (statut ${www?.status ?? "injoignable"})`);

// 2. Liens internes cassés (sur les pages publiques)
titre("Liens");
const liens = new Set();
for (const url of pages) {
  const html = await (await fetch(url)).text();
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) if (!m[1].startsWith("/assets/")) liens.add(m[1]);
}
for (const l of liens) {
  const r = await fetch(SITE + l, { redirect: "follow" });
  const html = await r.text();
  const introuvable = r.status >= 400 || (/<title>Agence d'hôtesses et événementiel au Maroc/.test(html) && l !== "/" && !["/admin", "/admin-auth", "/auth", "/staff-dashboard", "/auth/callback", "/rgpd"].includes(l) && !pages.includes(SITE + l));
  note(introuvable ? "attention" : "ok", `${l} ${introuvable ? "→ page inexistante (affiche l'accueil ou une erreur)" : "→ OK"}`);
}

// 3. Sécurité et performances serveur
titre("Sécurité et serveur");
const accueil = await fetch(SITE + "/");
const html = await accueil.text();
const asset = html.match(/\/assets\/index-[^"]+\.js/)?.[0];
if (asset) {
  const a = await fetch(SITE + asset);
  note(/immutable/.test(a.headers.get("cache-control") ?? "") ? "ok" : "attention", `cache des fichiers /assets : ${a.headers.get("cache-control") ?? "absent"}`);
  note(a.headers.get("content-encoding") ? "ok" : "attention", `compression : ${a.headers.get("content-encoding") ?? "aucune"}`);
}
note(accueil.headers.get("x-content-type-options") === "nosniff" ? "ok" : "attention", "en-tête X-Content-Type-Options");
note(!/Im@ne|service_role|SUPABASE_SERVICE/i.test(html) ? "ok" : "grave", "aucun secret visible dans le code de la page");
const joursCertificat = await new Promise((ok) => {
  const s = tls.connect(443, "heaventagency.com", { servername: "heaventagency.com" }, () => { const c = s.getPeerCertificate(); s.end(); ok(Math.round((new Date(c.valid_to) - Date.now()) / 864e5)); });
  s.on("error", () => ok(-1));
});
note(joursCertificat > 20 ? "ok" : "grave", `certificat HTTPS valable encore ${joursCertificat} jours`);

// 4. Application (Supabase)
titre("Application et base de données");
const ping = await fetch(`${SUPABASE}/rest/v1/rpc/maintenir_actif`, { method: "POST", headers: { apikey: CLE, "Content-Type": "application/json" }, body: "{}" });
note(ping.ok ? "ok" : "grave", `base Supabase ${ping.ok ? "active" : `injoignable (statut ${ping.status})`}`);
for (const f of ["send-email", "inscription-staff", "admin-change-password"]) {
  const r = await fetch(`${SUPABASE}/functions/v1/${f}`, { method: "OPTIONS" });
  note(r.ok ? "ok" : "grave", `fonction serveur ${f} ${r.ok ? "en ligne" : `en erreur (${r.status})`}`);
}
const lecture = await fetch(`${SUPABASE}/rest/v1/staff?select=email&limit=1`, { headers: { apikey: CLE } });
const fuite = lecture.ok && (await lecture.json()).length > 0;
note(fuite ? "grave" : "ok", fuite ? "les fiches du personnel sont lisibles sans connexion !" : "les fiches du personnel sont protégées");
const admins = await fetch(`${SUPABASE}/rest/v1/admins?select=email`, { headers: { apikey: CLE } });
note(admins.ok && (await admins.json()).length ? "grave" : "ok", "la liste des administrateurs est protégée");

// 5. Lighthouse (mobile) sur les pages principales
titre("Lighthouse (smartphone)");
lignes.push("| Page | Performance | Accessibilité | Bonnes pratiques | SEO |\n|---|---|---|---|---|");
for (const url of pages.slice(0, 4)) {
  try {
    execSync(`npx --yes lighthouse@12 "${url}" --quiet --output=json --output-path=lh.json --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless=new --no-sandbox"`, { stdio: "ignore", timeout: 180000 });
    const c = JSON.parse(readFileSync("lh.json", "utf8")).categories;
    const s = (k) => Math.round((c[k]?.score ?? 0) * 100);
    lignes.push(`| ${url.replace(SITE, "") || "/"} | ${s("performance")} | ${s("accessibility")} | ${s("best-practices")} | ${s("seo")} |`);
    if (s("seo") < 90) avertissements.push(`SEO Lighthouse ${s("seo")} sur ${url}`);
    if (s("performance") < 50) avertissements.push(`performance mobile ${s("performance")} sur ${url}`);
  } catch { lignes.push(`| ${url} | échec de la mesure | | | |`); }
}

const entete = `# Rapport d'audit Heavent — ${new Date().toLocaleDateString("fr-FR", { dateStyle: "full" })}\n\n` +
  `**${graves.length} problème(s) grave(s)**, ${avertissements.length} point(s) d'attention, ${ok.length} contrôle(s) OK.\n` +
  (graves.length ? `\n### À corriger en priorité\n${graves.map((g) => `- ${g}`).join("\n")}\n` : "");
writeFileSync("rapport-audit.md", entete + lignes.join("\n") + "\n");
console.log(entete);
if (existsSync("lh.json")) execSync("rm -f lh.json");
process.exit(graves.length ? 1 : 0);
