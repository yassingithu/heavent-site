// Agent bêta-testeur : rejoue les parcours d'un client, d'un crew et de l'administratrice comme un vrai utilisateur.
//   node tests/beta/beta.mjs http://127.0.0.1:4173            → parcours complets sur la version construite (fausse base)
//   BETA_LIVE=1 node tests/beta/beta.mjs http://127.0.0.1:4173 → + contrôles en lecture seule sur heaventagency.com
// Écrit rapport-beta.md et des captures dans beta-captures/ ; code de sortie 1 si un parcours échoue.
import { mkdirSync, writeFileSync } from "node:fs";
import { nouvelleBase, contexte, connecter } from "./simulateur.mjs";

let chromium;
try { ({ chromium } = await import("playwright")); } catch { ({ chromium } = await import("/opt/npm-tools/node_modules/playwright/index.mjs")); }

const BASE = process.argv[2] || "http://127.0.0.1:4173";
const LIVE = "https://heaventagency.com";
const ADMIN = "admin@heavent.test";
const CAPTURES = "beta-captures";
mkdirSync(CAPTURES, { recursive: true });
const navigateur = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const resultats = [];

function verifier(condition, message) { if (!condition) throw new Error(message); }
async function scenario(nom, fn) {
  const debut = Date.now(); const notes = [];
  try { await fn(notes); resultats.push({ nom, ok: true, notes, duree: Date.now() - debut }); console.log(`✅ ${nom}`); }
  catch (e) { resultats.push({ nom, ok: false, notes, erreur: e.message.split("\n")[0], duree: Date.now() - debut }); console.log(`❌ ${nom} — ${e.message.split("\n")[0]}`); }
}
const toasts = async (page) => (await page.locator("li[data-state]").allInnerTexts()).join(" | ");

// 1. Demande client → devis → équipe → contrats → fiches de paie → espace du crew
await scenario("Devis mariage → équipe de 5 → contrats → paie → espace crew", async (notes) => {
  const base = nouvelleBase();
  const { page, ctx, erreurs } = await contexte(navigateur, base, ADMIN);
  await connecter(page, BASE, ADMIN, "/admin");
  await page.getByRole("tab", { name: /Devis$/ }).first().click(); await page.waitForTimeout(800);
  await page.getByRole("button", { name: /Faire le devis/ }).first().click(); await page.waitForTimeout(1000);
  await page.getByRole("button", { name: /^Enregistrer$/ }).click(); await page.waitForTimeout(1500);
  verifier(base.devis.length === 1, "le devis n'a pas été enregistré");
  verifier(base.devis_lignes.length >= 5, `devis pré-rempli avec seulement ${base.devis_lignes.length} ligne(s)`);
  notes.push(`${base.devis_lignes.length} lignes pré-remplies depuis la demande`);
  await page.locator("input[type=time]").nth(0).fill("16:00"); await page.locator("input[type=time]").nth(1).fill("00:00");
  for (let i = 0; i < 5; i++) { await page.locator('button[title="Ajouter à ce jour"]').first().click(); await page.waitForTimeout(900); }
  verifier(base.contrats.length === 5, `${base.contrats.length} contrat(s) créé(s) au lieu de 5`);
  verifier(base.contrats.every((c) => c.total_heures === 8 && c.dates?.[0]?.heure_debut === "16:00"), "horaires 16:00–00:00 / 8 h absents des contrats");
  notes.push("5 contrats créés automatiquement (16:00–00:00, 8 h)");
  const [dl] = await Promise.all([page.waitForEvent("download", { timeout: 90000 }), page.getByRole("button", { name: /Contrats \(PDF\)/ }).click()]);
  verifier(/\.pdf$/.test(dl.suggestedFilename()), "le PDF des contrats n'a pas été téléchargé");
  await page.getByRole("tab", { name: /Paie$/ }).click(); await page.waitForTimeout(800);
  await page.getByRole("button", { name: /Calculer le mois/ }).click(); await page.waitForTimeout(1500);
  verifier(base.fiches_paie.length === 5, `${base.fiches_paie.length} fiche(s) de paie au lieu de 5`);
  verifier(base.fiches_paie[0].salaire_brut === 480, "salaire brut attendu : 8 h × 60 MAD = 480 MAD");
  notes.push("5 fiches de paie : 480 MAD brut, " + base.fiches_paie[0].salaire_net + " MAD net");
  await page.screenshot({ path: `${CAPTURES}/1-admin-paie.png`, fullPage: true });
  verifier(!erreurs.length, "erreurs JavaScript : " + erreurs.join(" ; "));
  await ctx.close();

  const crew = base.staff[0].email;
  const c = await contexte(navigateur, base, crew, { mobile: true });
  await connecter(c.page, BASE, crew, "/staff-dashboard");
  const [d1] = await Promise.all([c.page.waitForEvent("download", { timeout: 90000 }), c.page.getByRole("button", { name: /Télécharger mon contrat/ }).first().click()]);
  verifier(/Contrat/.test(d1.suggestedFilename()), "le crew ne peut pas télécharger son contrat");
  await c.page.getByRole("tab").nth(1).click(); await c.page.waitForTimeout(800);
  const [d2] = await Promise.all([c.page.waitForEvent("download", { timeout: 90000 }), c.page.locator("button:has(svg.lucide-download)").last().click()]);
  verifier(/paie/i.test(d2.suggestedFilename()), "le crew ne peut pas télécharger sa fiche de paie");
  await c.page.screenshot({ path: `${CAPTURES}/1-crew-paie.png`, fullPage: true });
  notes.push("le crew télécharge son contrat et sa fiche de paie");
  await c.ctx.close();
});

// 2. Inscription d'un crew sur smartphone (parcours gamifié)
await scenario("Inscription d'un nouveau crew sur smartphone", async (notes) => {
  const base = nouvelleBase();
  const { page, ctx, erreurs } = await contexte(navigateur, base, "visiteur@exemple.ma", { mobile: true });
  await page.goto(BASE + "/"); await page.evaluate(() => sessionStorage.setItem("heavent-splash-vu", "1"));
  await page.goto(BASE + "/inscription-staff"); await page.waitForTimeout(1800);
  const remplir = (id, v) => page.locator("#" + id).fill(v, { timeout: 2000 }).catch(() => {});
  const listes = async () => { const n = await page.getByRole("combobox").count(); for (let i = 0; i < n; i++) { await page.getByRole("combobox").nth(i).click(); await page.getByRole("option").first().click(); } };
  const continuer = async () => { await page.getByRole("button", { name: /Continuer/ }).click(); await page.waitForTimeout(700); };
  const etape = async () => page.locator("text=/Étape \\d sur 5/i").first().innerText();
  await continuer();
  verifier(/Champs manquants/.test(await toasts(page)), "aucun message quand l'étape 1 est vide");
  await remplir("nom", "Bêta"); await remplir("prenom", "Testeuse"); await remplir("email", "Beta.Testeuse@Exemple.ma"); await remplir("telephone", "+212600000009"); await remplir("age", "24");
  await listes(); await continuer();
  verifier(/2 sur 5/i.test(await etape()), "bloqué à l'étape 1");
  for (const [id, v] of [["adresse_complete", "12 rue de la Liberté, Guéliz"], ["code_postal", "40000"], ["lieu_naissance", "Marrakech"], ["date_naissance", "2001-05-02"], ["numero_identite", "EE123456"], ["nom_urgence", "Fatima Test"], ["telephone_urgence", "+212600000010"]]) await remplir(id, v);
  await listes(); await continuer();
  verifier(/3 sur 5/i.test(await etape()), "bloqué à l'étape 2");
  for (const [id, v] of [["taille", "168"], ["competences", "Accueil VIP"], ["experience", "Salons et mariages à Marrakech"]]) await remplir(id, v);
  await listes(); await page.locator("form").getByText("Français", { exact: true }).click(); await continuer();
  verifier(/4 sur 5/i.test(await etape()), "bloqué à l'étape 3");
  await page.locator("form").getByText("Samedi", { exact: true }).click(); await continuer();
  verifier(/5 sur 5/i.test(await etape()), "bloqué à l'étape 4");
  await remplir("password", "Testeuse2026!"); await remplir("confirmPassword", "Testeuse2026!");
  await page.locator("#rgpdConsent").click();
  await page.getByRole("button", { name: /Créer mon compte/ }).click(); await page.waitForTimeout(2000);
  const appel = base.appelsFonctions.find((a) => a.nom === "inscription-staff");
  verifier(appel, "l'inscription n'a pas été envoyée au serveur");
  verifier(appel.corps.email === "beta.testeuse@exemple.ma" && appel.corps.date_naissance === "2001-05-02", "email ou date de naissance mal transmis");
  verifier(await page.getByText("Bienvenue dans l'équipe").count(), "pas d'écran de bienvenue");
  await page.screenshot({ path: `${CAPTURES}/2-inscription-fin.png` });
  notes.push("5 étapes franchies, compte envoyé, écran de bienvenue affiché");
  verifier(!erreurs.length, "erreurs JavaScript : " + erreurs.join(" ; "));
  await ctx.close();
});

// 3. Correction des disponibilités, mot de passe et bannissement par l'admin
await scenario("Admin : corriger les dispos, changer un mot de passe, bannir un crew", async (notes) => {
  const base = nouvelleBase();
  const { page, ctx, erreurs } = await contexte(navigateur, base, ADMIN);
  await connecter(page, BASE, ADMIN, "/admin");
  await page.getByRole("tab", { name: /Dispo$/ }).click(); await page.waitForTimeout(1000);
  await page.getByPlaceholder("Rechercher…").fill(base.staff[1].prenom);
  await page.locator('button[title="Modifier les disponibilités de ce jour"]').nth(1).click(); await page.waitForTimeout(800);
  const dlg = page.getByRole("dialog");
  await dlg.getByRole("button", { name: "Disponible toute la journée" }).click();
  await dlg.getByRole("button", { name: "Enregistrer" }).click(); await page.waitForTimeout(1200);
  verifier(base.disponibilites.filter((d) => d.staff_id === base.staff[1].id && d.disponible && d.creneau).length >= 3, "les disponibilités corrigées n'ont pas été enregistrées");
  notes.push("disponibilités d'une journée corrigées");
  await page.getByRole("tab", { name: /Personnel$/ }).click(); await page.waitForTimeout(800);
  await page.locator('button[title="Modifier la fiche / mot de passe"]').first().click(); await page.waitForTimeout(800);
  await page.getByPlaceholder("Nouveau mot de passe").fill("Heavent2026!"); await page.getByPlaceholder("Confirmer").fill("Heavent2026!");
  await page.getByRole("button", { name: "Changer le mot de passe" }).click(); await page.waitForTimeout(1000);
  verifier(base.appelsFonctions.some((a) => a.nom === "admin-change-password" && a.corps.newPassword), "le changement de mot de passe n'est pas parti");
  page.on("dialog", (d) => d.accept());
  await page.getByRole("button", { name: "Bannir" }).click(); await page.waitForTimeout(1200);
  verifier(base.appelsFonctions.some((a) => a.corps.action === "ban"), "le bannissement n'est pas parti");
  notes.push("mot de passe changé et crew banni");
  verifier(!erreurs.length, "erreurs JavaScript : " + erreurs.join(" ; "));
  await ctx.close();
});

// 4. Affichage smartphone : rien ne dépasse de l'écran
await scenario("Affichage smartphone (pages publiques et admin)", async (notes) => {
  const base = nouvelleBase();
  const { page, ctx } = await contexte(navigateur, base, ADMIN, { mobile: true });
  const largeur = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  await page.goto(BASE + "/"); await page.evaluate(() => sessionStorage.setItem("heavent-splash-vu", "1"));
  const trop = [];
  for (const p of ["/", "/devis-entreprise", "/devis-mariage", "/inscription-staff", "/a-propos", "/contact", "/mentions-legales"]) {
    await page.goto(BASE + p); await page.waitForTimeout(1200);
    if ((await largeur()) > 2) trop.push(p);
  }
  await connecter(page, BASE, ADMIN, "/admin");
  for (const t of ["Devis", "Personnel", "Dispo", "Contrats", "Paie", "Événement", "Envoyés"]) {
    await page.getByRole("tab", { name: new RegExp(t + "$") }).first().click(); await page.waitForTimeout(700);
    if ((await largeur()) > 2) trop.push("admin › " + t);
  }
  verifier(!trop.length, "dépasse de l'écran sur : " + trop.join(", "));
  notes.push("7 pages publiques et 7 onglets admin tiennent dans un écran de 390 px");
  await ctx.close();
});

// 5. Site en ligne (lecture seule : aucune donnée envoyée)
if (process.env.BETA_LIVE) {
  await scenario("Site en ligne : pages, erreurs, formulaires vides refusés", async (notes) => {
    const ctx = await navigateur.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, locale: "fr-FR" });
    const page = await ctx.newPage(); const erreurs = []; page.on("pageerror", (e) => erreurs.push(e.message));
    const pages = ["/", "/devis-entreprise", "/devis-mariage", "/inscription-staff", "/a-propos", "/contact", "/politique-confidentialite", "/mentions-legales", "/auth", "/admin-auth"];
    for (const p of pages) {
      const r = await page.goto(LIVE + p, { waitUntil: "domcontentloaded" });
      verifier(r && r.status() === 200, `${p} répond ${r?.status()}`);
      await page.waitForTimeout(p === "/" ? 4500 : 1500);
      verifier(await page.locator("h1, h2").count(), `${p} : page vide`);
    }
    await page.goto(LIVE + "/devis-mariage"); await page.waitForTimeout(2000);
    await page.getByRole("button", { name: /Envoyer ma demande/ }).click(); await page.waitForTimeout(800);
    verifier(await page.locator(".text-destructive").count(), "le formulaire mariage vide n'affiche pas d'erreurs");
    verifier(!erreurs.length, "erreurs JavaScript en ligne : " + erreurs.slice(0, 3).join(" ; "));
    notes.push(`${pages.length} pages en ligne OK, formulaire vide bien refusé`);
    await page.screenshot({ path: `${CAPTURES}/5-en-ligne.png` });
    await ctx.close();
  });
}

await navigateur.close();
const ko = resultats.filter((r) => !r.ok);
const rapport = `# Rapport du bêta-testeur Heavent — ${new Date().toLocaleDateString("fr-FR", { dateStyle: "full" })}

**${resultats.length - ko.length}/${resultats.length} parcours réussis.**

${resultats.map((r) => `### ${r.ok ? "✅" : "❌"} ${r.nom} (${Math.round(r.duree / 1000)} s)\n${r.notes.map((n) => `- ${n}`).join("\n")}${r.ok ? "" : `\n- **Problème : ${r.erreur}**`}`).join("\n\n")}
`;
writeFileSync("rapport-beta.md", rapport);
console.log("\n" + rapport);
process.exit(ko.length ? 1 : 0);
