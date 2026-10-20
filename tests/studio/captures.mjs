// Captures d'écran de démonstration pour la page Heavent Studio, avec des données entièrement fictives.
// CHROMIUM_PATH=/opt/pw-browsers/chromium node tests/studio/captures.mjs http://127.0.0.1:4311 <dossier>
import { chromium } from "/opt/npm-tools/node_modules/playwright/index.mjs";
import { readFileSync, mkdirSync } from "node:fs";
import { nouvelleBase, contexte, connecter } from "../beta/simulateur.mjs";

const BASE = process.argv[2] ?? "http://127.0.0.1:4311";
const OUT = process.argv[3] ?? "captures-studio";
mkdirSync(OUT, { recursive: true });
const ADMIN = "admin@heavent.test";
const nav = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
const photo = readFileSync(new URL("../beta/photo-test.jpg", import.meta.url));

function demo() {
  const b = nouvelleBase();
  const crews = [["Lina", "Amrani", "Femme", "Casablanca", "Arabe, Français, Anglais"], ["Sara", "El Fassi", "Femme", "Rabat", "Arabe, Français"],
    ["Yasmine", "Berrada", "Femme", "Marrakech", "Arabe, Français, Espagnol"], ["Mehdi", "Alaoui", "Homme", "Casablanca", "Arabe, Français, Anglais"],
    ["Rania", "Saidi", "Femme", "Tanger", "Arabe, Français, Anglais"], ["Omar", "Kettani", "Homme", "Rabat", "Arabe, Français"]];
  b.staff = crews.map(([prenom, nom, genre, ville, langues], i) => ({ id: "s" + (i + 1), prenom, nom, genre, ville, langues, email: `${prenom.toLowerCase()}@demo.test`, taux_horaire: 60 + (i % 3) * 10, telephone: "+212600000000", banni: false }));
  const j = (n) => new Date(Date.now() + n * 864e5).toISOString().slice(0, 10);
  b.disponibilites = b.staff.flatMap((s, i) => [0, 1, 2].map((k) => ({ id: `d${i}${k}`, staff_id: s.id, date_jour: j(10 + k), creneau: "soir", disponible: true })));
  const ilYa = (h) => new Date(Date.now() - h * 36e5).toISOString();
  b.devis_mariage = [
    { id: "dm1", nom: "Sofia", prenom: "Adam", email: "sofia@demo.test", telephone: "+212600000000", type_evenement: "Mariage", date_mariage: j(10), lieu: "Marrakech", nb_invites: 250,
      services: "DJ / Animation musicale, Décoration, Photographe, Traiteur, Hôtes/Hôtesses d'accueil", remarques: "Mariage en plein air dans un riad, ambiance blanc et or.\nBudget : 250 000 MAD - 350 000 MAD", statut: "en_attente", created_at: ilYa(2) },
    { id: "dm2", nom: "Leila", prenom: "", email: "leila@demo.test", telephone: "+212600000000", type_evenement: "Fiançailles", date_mariage: j(24), lieu: "Casablanca", nb_invites: 120,
      services: "Décoration, Photographe, Hôtes/Hôtesses d'accueil", remarques: "Fiançailles traditionnelles, tenue négafa.", statut: "en_attente", created_at: ilYa(20) },
    { id: "dm3", nom: "Nadia", prenom: "", email: "nadia@demo.test", telephone: "+212600000000", type_evenement: "Baby shower", date_mariage: j(15), lieu: "Rabat", nb_invites: 40,
      services: "Décoration", remarques: "Thème pastel, ballons et bar à desserts.", statut: "en_attente", created_at: ilYa(30) },
  ];
  b.devis_entreprise = [{ id: "de1", entreprise: "Atlas Tech Expo", prenom: "Karim", nom: "Bennis", email: "karim@demo.test", telephone: "+212600000000", date_evenement: j(18), lieu: "Casablanca", nb_personnes: 8, nb_staff: 8, services: "Salon professionnel", remarques: "8 hôtesses bilingues pendant 3 jours de salon.", statut: "en_attente", created_at: ilYa(5) }];
  b.parametres_agence = b.parametres_agence.map((p) => ({ ...p, raison_sociale: "Votre Agence", adresse: "Boulevard d'Anfa", ville: "Casablanca", ice: "000000000000000", rc: "000000", email: "contact@votre-agence.ma", site_web: "www.votre-agence.ma", telephone: "+212 6 00 00 00 00" }));
  // Statistiques de visite fictives sur 30 jours
  b.evenements_site = [];
  const pages = ["/", "/devis-mariage", "/cree-ton-evenement", "/a-propos", "/realisations", "/hotesses-casablanca", "/guides"];
  const sources = ["Google", "Instagram", "Direct", "WhatsApp", "Facebook"];
  let n = 0;
  for (let d = 29; d >= 0; d--) {
    const nb = 18 + Math.round(12 * Math.sin(d / 3) + (29 - d) * 0.8);
    for (let s = 0; s < nb; s++) {
      const session = "s" + n++; const cree_le = new Date(Date.now() - d * 864e5).toISOString();
      const source = sources[(s * 7 + d) % 5 === 0 ? 1 : (s + d) % 5]; const appareil = s % 3 ? "mobile" : "ordinateur";
      for (let v = 0; v < 1 + (s % 3); v++) b.evenements_site.push({ type: "vue", chemin: pages[(s + v * 2 + d) % pages.length], session, source, appareil, cree_le });
      if (s % 9 === 0) b.evenements_site.push({ type: "clic", nom: "whatsapp", session, source, appareil, cree_le });
      if (s % 14 === 0) b.evenements_site.push({ type: "demande", nom: s % 28 ? "devis-mariage" : "jeu", session, source, appareil, cree_le });
    }
  }
  b.posts_instagram = [
    ["mariage", "Conseil mariage", "Les 5 détails que vos invités retiendront", "sombre"], ["naissance", "Baby shower", "Une baby shower inoubliable, sans stress", "clair"],
    ["entreprise", "Événement d'entreprise", "Réussir l'accueil de votre salon professionnel", "sombre"], ["fete", "Fiançailles", "Le guide d'une soirée de henné réussie", "clair"],
  ].map(([theme, accroche, titre, style], i) => ({ id: "p" + (i + 1), date_prevue: new Date(Date.now() + (i + 1) * 2 * 864e5).toISOString(), theme, accroche, titre, legende: titre, recherche: "event", style, photo_url: null, visuel_url: null, statut: "brouillon" }));
  b.photoTest = photo; b.cle_pixabay = "demo";
  b.stats_avant = { visites: 772, pages_vues: 1530, demandes: 66, clics_contact: 94 };
  return b;
}

const base = demo();
// Retouches d'affichage : rien de personnel à Heavent, pas de pourcentages absurdes dus aux données fictives
const nettoyer = (page) => page.evaluate(() => {
  for (const el of document.querySelectorAll("button, a")) if (/Nawar/.test(el.textContent ?? "")) el.style.display = "none";
  for (const el of document.querySelectorAll("li, [role=status], [data-sonner-toast]")) if (/visuels sont prêts/.test(el.textContent ?? "")) el.style.display = "none";
  for (const el of document.querySelectorAll("*")) if (!el.children.length && /\d{4,}\s*%/.test(el.textContent ?? "")) el.textContent = el.textContent.replace(/\d{4,}\s*%/, "24 %");
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n; (n = w.nextNode());) {
    if (/↗\s*\d{3,}\s*%/.test(n.textContent)) n.textContent = n.textContent.replace(/↗\s*\d{3,}\s*%/, "↗ 24 %");
    if (/\d{3,} %|\d{4,}%/.test(n.textContent) && n.parentElement?.closest("[class*=rounded]")) n.textContent = n.textContent.replace(/\d{3,}\s*%/, "24 %");
    n.textContent = n.textContent.replace("2099", "2026");
  }
});
const shot = async (page, nom) => { await page.waitForTimeout(900); await nettoyer(page); await page.screenshot({ path: `${OUT}/${nom}.png` }); console.log("✓", nom); };
{
  const { page, ctx } = await contexte(nav, base, ADMIN);
  await ctx.route("https://pixabay.com/**", (r) => r.fulfill({ status: 200, body: photo, contentType: "image/jpeg", headers: { "access-control-allow-origin": "*" } }));
  await connecter(page, BASE, ADMIN, "/admin");
  await page.getByRole("tab", { name: /Statistiques$/ }).first().click(); await shot(page, "stats");
  await page.getByRole("tab", { name: /Événement$/ }).first().click(); await shot(page, "demandes");
  await page.getByRole("tab", { name: /Personnel$/ }).first().click(); await shot(page, "equipe");
  await page.getByRole("tab", { name: /Agenda$/ }).first().click(); await shot(page, "agenda");
  await page.getByRole("tab", { name: /Instagram$/ }).first().click(); await page.waitForTimeout(800);
  await page.getByTestId("preparer-visuels").click().catch(() => {});
  await page.waitForFunction(() => !document.querySelector('[data-testid="preparer-visuels"]'), null, { timeout: 30000 }).catch(() => {});
  await page.evaluate(() => document.querySelector('[data-testid="carte-post"]')?.scrollIntoView({ block: "center" }));
  await shot(page, "instagram");
  await page.getByRole("tab", { name: /Devis$/ }).first().click(); await page.waitForTimeout(800);
  await page.getByRole("button", { name: /Faire le devis/ }).first().click(); await page.waitForTimeout(1200);
  await shot(page, "devis");
  await page.getByRole("button", { name: /^Enregistrer$/ }).click(); await page.waitForTimeout(1500);
  await ctx.close();
}
{
  const { page, ctx } = await contexte(nav, base, ADMIN, { mobile: true });
  await connecter(page, BASE, ADMIN, "/admin");
  await page.getByRole("tab", { name: /Devis$/ }).first().click(); await shot(page, "mobile-admin");
  const d = base.devis[0];
  if (d?.lien_token) { await page.goto(`${BASE}/mon-devis/${d.lien_token}`); await page.waitForTimeout(2500); await shot(page, "mobile-client"); }
  else console.log("pas de lien client", Object.keys(d ?? {}));
  await ctx.close();
}
await nav.close();
