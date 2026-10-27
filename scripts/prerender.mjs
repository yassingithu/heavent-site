// Pré-génère une page HTML complète par adresse publique (contenu + balises SEO lisibles par Google
// sans exécuter le JavaScript), crée les pages des espaces privés, le sitemap et la liste des fichiers à envoyer.
// Usage : npm run build  (vite build puis ce script)
import { preview } from "vite";
import { mkdirSync, writeFileSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const SITE = "https://heaventagency.com";
const PUBLIQUES = [
  { chemin: "/", priorite: "1.0", frequence: "weekly" },
  { chemin: "/devis-entreprise", priorite: "0.9", frequence: "monthly" },
  { chemin: "/devis-mariage", priorite: "0.9", frequence: "monthly" },
  { chemin: "/inscription-staff", priorite: "0.8", frequence: "monthly" },
  { chemin: "/a-propos", priorite: "0.7", frequence: "monthly" },
  { chemin: "/contact", priorite: "0.7", frequence: "monthly" },
  { chemin: "/cree-ton-evenement", priorite: "0.8", frequence: "monthly" },
  { chemin: "/guides", priorite: "0.7", frequence: "monthly" },
  { chemin: "/liens", priorite: "0.4", frequence: "monthly" },
  { chemin: "/studio", priorite: "0.6", frequence: "monthly" },
  { chemin: "/nawar", priorite: "0.7", frequence: "monthly" },
  { chemin: "/prestataires", priorite: "0.5", frequence: "monthly" },
  // Guides gratuits (src/data/guides.ts)
  ...[...readFileSync("src/data/guides.ts", "utf8").matchAll(/slug: "([a-z0-9-]+)"/g)].map((m) => ({ chemin: `/guides/${m[1]}`, priorite: "0.7", frequence: "monthly" })),
  { chemin: "/politique-confidentialite", priorite: "0.3", frequence: "yearly" },
  { chemin: "/mentions-legales", priorite: "0.2", frequence: "yearly" },
  // Pages villes et services (src/lib/pagesLocales.ts)
  ...[...readFileSync("src/lib/pagesLocales.ts", "utf8").matchAll(/chemin: "(\/[a-z0-9-]+)"/g)].map((m) => ({ chemin: m[1], priorite: "0.8", frequence: "monthly" })),
];
// Espaces privés et anciennes adresses : l'application seule, jamais indexée
const PRIVEES = ["admin", "admin-auth", "auth", "auth/callback", "staff-dashboard", "rgpd", "desinscription", "apercu/heavent-city"];

const shell = readFileSync("dist/index.html", "utf8");
const shellPrive = shell.replace("<head>", '<head>\n    <meta name="robots" content="noindex, nofollow" />');
for (const r of PRIVEES) { mkdirSync(`dist/${r}`, { recursive: true }); writeFileSync(`dist/${r}/index.html`, shellPrive); }
// Page d'erreur 404 du serveur (ErrorDocument) : l'application affiche « Page non trouvée », jamais indexée
writeFileSync("dist/404.html", shellPrive);

let chromium;
try { ({ chromium } = await import("/opt/npm-tools/node_modules/playwright/index.mjs")); }
catch { ({ chromium } = await import("playwright")); }

const serveur = await preview({ preview: { port: 4517, host: "127.0.0.1", strictPort: false }, logLevel: "silent" });
const base = serveur.resolvedUrls.local[0].replace(/\/$/, "");
const navigateur = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || (statSafe("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined) });
const ctx = await navigateur.newContext({ locale: "fr-FR", viewport: { width: 1280, height: 900 } });
await ctx.route(/googletagmanager|google-analytics|supabase\.co|fonts\.(googleapis|gstatic)/, (r) => r.abort());
await ctx.addInitScript(() => { try { sessionStorage.setItem("heavent-splash-vu", "1"); localStorage.setItem("i18nextLng", "fr"); } catch { /* */ } });

for (const { chemin } of PUBLIQUES) {
  const page = await ctx.newPage();
  await page.goto(base + chemin, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  let html = await page.evaluate(() => "<!DOCTYPE html>\n" + document.documentElement.outerHTML);
  // Ne garder qu'une seule balise de chaque (celles de la page remplacent celles par défaut)
  html = dedoublonner(html);
  const dossier = chemin === "/" ? "dist" : `dist${chemin}`;
  mkdirSync(dossier, { recursive: true });
  writeFileSync(`${dossier}/index.html`, html);
  console.log(`page pré-générée : ${chemin} (${Math.round(html.length / 1024)} Ko)`);
  await page.close();
}
await navigateur.close();
await new Promise((ok) => serveur.httpServer.close(ok));

// Sitemap
const jour = new Date().toISOString().slice(0, 10);
writeFileSync("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PUBLIQUES.map((p) => `  <url><loc>${SITE}${p.chemin === "/" ? "/" : p.chemin}</loc><lastmod>${jour}</lastmod><changefreq>${p.frequence}</changefreq><priority>${p.priorite}</priority></url>`).join("\n")}
</urlset>
`);

// Liste des fichiers à envoyer chez one.com
const fichiers = [];
(function parcourir(d) {
  for (const n of readdirSync(d)) { const p = join(d, n); statSync(p).isDirectory() ? parcourir(p) : fichiers.push(relative("dist", p)); }
})("dist");
writeFileSync("dist/fichiers.json", JSON.stringify(fichiers.filter((f) => f !== "fichiers.json").sort(), null, 1));
console.log(`${fichiers.length} fichiers prêts`);

function statSafe(p) { try { return statSync(p); } catch { return null; } }
function dedoublonner(html) {
  const garder = (re) => {
    const toutes = [...html.matchAll(re)];
    if (toutes.length < 2) return;
    // la dernière (posée par la page) gagne
    for (const m of toutes.slice(0, -1)) html = html.replace(m[0], "");
  };
  garder(/<title>[\s\S]*?<\/title>/g);
  for (const nom of ["description", "keywords", "twitter:card", "twitter:title", "twitter:description", "twitter:image"])
    garder(new RegExp(`<meta name="${nom}"[^>]*>`, "g"));
  for (const prop of ["og:title", "og:description", "og:type", "og:image", "og:url"])
    garder(new RegExp(`<meta property="${prop}"[^>]*>`, "g"));
  return html;
}
