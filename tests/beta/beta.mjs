// Agent bêta-testeur : rejoue les parcours d'un client, d'un crew et de l'administratrice comme un vrai utilisateur.
//   node tests/beta/beta.mjs http://127.0.0.1:4173            → parcours complets sur la version construite (fausse base)
//   BETA_LIVE=1 node tests/beta/beta.mjs http://127.0.0.1:4173 → + contrôles en lecture seule sur heaventagency.com
// Écrit rapport-beta.md et des captures dans beta-captures/ ; code de sortie 1 si un parcours échoue.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { nouvelleBase, contexte, connecter, creerFacture } from "./simulateur.mjs";

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
  if (process.env.SEUL && !nom.includes(process.env.SEUL)) return;
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

// 3 bis. Contrat créé à la main : heures, modification, suppression
await scenario("Admin : créer, modifier et supprimer un contrat à la main", async (notes) => {
  const base = nouvelleBase();
  const { page, ctx, erreurs } = await contexte(navigateur, base, ADMIN);
  await connecter(page, BASE, ADMIN, "/admin");
  await page.getByRole("tab", { name: /Contrats$/ }).click(); await page.waitForTimeout(1000);
  await page.getByRole("button", { name: /Nouveau contrat/ }).click(); await page.waitForTimeout(800);
  const dlg = page.getByRole("dialog");
  await dlg.getByRole("combobox").first().click(); await page.getByRole("option").first().click();
  await dlg.locator('input[placeholder^="ex. Salon"]').fill("Salon de l'Auto");
  await dlg.locator("input[type=date]").first().fill("2026-11-05");
  await dlg.locator("input[type=time]").nth(0).fill("10:00"); await dlg.locator("input[type=time]").nth(1).fill("16:00");
  await dlg.getByRole("button", { name: /Ajouter une date/ }).click();
  await dlg.getByRole("button", { name: "Enregistrer" }).click(); await page.waitForTimeout(1200);
  const c = base.contrats[0];
  verifier(c && c.total_heures === 12 && c.dates.length === 2 && c.dates[0].heure_debut === "10:00", "contrat manuel mal enregistré : " + JSON.stringify(c?.dates));
  notes.push(`contrat créé : 2 dates, ${c.total_heures} h, ${c.salaire_brut} MAD brut`);
  await page.getByRole("button", { name: /Modifier/ }).first().click(); await page.waitForTimeout(1000);
  await page.getByRole("dialog").locator("input[type=number]").first().fill("4");
  await page.getByRole("dialog").getByRole("button", { name: "Enregistrer" }).click(); await page.waitForTimeout(1200);
  verifier(base.contrats[0].total_heures === 10, `modification non prise en compte (${base.contrats[0].total_heures} h)`);
  notes.push("heures modifiées (10 h)");
  page.on("dialog", (d) => d.accept());
  await page.getByTitle("Supprimer").first().click(); await page.waitForTimeout(1000);
  verifier(base.contrats.length === 0, "contrat non supprimé");
  notes.push("contrat supprimé");
  verifier(!erreurs.length, "erreurs JavaScript : " + erreurs.join(" ; "));
  await ctx.close();
});

// 3 ter. Signature du contrat en ligne par le crew (24 h avant conseillé, jusqu'à la fin du mois au plus tard)
await scenario("Crew : signer contrat + conditions (contresignés par l'employeur)", async (notes) => {
  const base = nouvelleBase();
  const crew = base.staff[0];
  const jour = (j) => new Date(Date.now() + j * 864e5).toISOString().slice(0, 10);
  const moisDernier = (() => { const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() - 1); return d.toISOString().slice(0, 10); })();
  const c = (id, evenement, date, h) => ({ id, staff_id: crew.id, titre: "Hôtesse", type_contrat: "cdd", statut: "actif", evenement, lieu: "Rabat", date_debut: date, date_fin: date, taux_horaire: 60, total_heures: 4, salaire_brut: 240, dates: [{ date, heures: 4, heure_debut: h, heure_fin: "23:00" }] });
  base.contrats.push(c("cA", "Salon futur", jour(10), "09:00"), c("cB", "Soirée demain", jour(0.5), "00:00"), c("cC", "Gala ancien", moisDernier, "19:00"));
  const dessiner = async (page, id) => {
    const zone = page.getByTestId(id); await zone.scrollIntoViewIfNeeded(); const b = await zone.boundingBox();
    await page.mouse.move(b.x + 20, b.y + 50); await page.mouse.down();
    for (let i = 0; i < 40; i++) await page.mouse.move(b.x + 20 + i * 6, b.y + 50 + Math.sin(i / 3) * 25, { steps: 2 });
    await page.mouse.up();
  };

  // 2. Le crew signe (contrat + conditions) sur son téléphone
  const { page, ctx, erreurs } = await contexte(navigateur, base, crew.email, { mobile: true });
  await connecter(page, BASE, crew.email, "/staff-dashboard");
  verifier(await page.getByText("À signer — en retard").count(), "le contrat en retard (encore signable) n'est pas signalé");
  verifier(await page.getByText("Non signé — délai dépassé").count(), "le contrat d'un mois passé n'est pas fermé");
  verifier(await page.getByRole("button", { name: /Lire et signer/ }).count() === 2, "il faut 2 contrats signables (à temps + en retard)");
  await page.getByRole("button", { name: /Lire et signer/ }).first().click(); await page.waitForTimeout(1000);
  await page.getByTestId("conditions-mission").locator("summary").click(); await page.waitForTimeout(300);
  verifier((await page.getByTestId("conditions-mission").innerText()).includes("Confidentialité"), "les conditions ne sont pas lisibles avant de signer");
  await page.screenshot({ path: `${CAPTURES}/3-signature-fenetre.png` });
  await dessiner(page, "zone-signature");
  await page.getByRole("dialog").getByRole("checkbox").click();
  await page.getByRole("button", { name: "Signer le contrat" }).click(); await page.waitForTimeout(1500);
  const appel = base.appelsFonctions.find((a) => a.nom === "signer-contrat");
  verifier(appel && appel.corps.image?.startsWith("data:image/png") && appel.corps.accepte, "signature non envoyée");
  verifier(await page.getByText("Signé ✓").count(), "le contrat n'apparaît pas comme signé");
  const signe = base.contrats.find((x) => x.id === "cA");
  verifier(signe.conditions_acceptees_le && signe.employeur_signe_le, "conditions ou contresignature employeur manquantes");
  await page.screenshot({ path: `${CAPTURES}/3-signature.png`, fullPage: true });
  // 3. Le PDF du contrat signé porte les deux signatures
  const [dl] = await Promise.all([page.waitForEvent("download", { timeout: 30000 }), page.getByRole("button", { name: /Télécharger mon contrat/ }).first().click()]);
  await dl.saveAs(`${CAPTURES}/contrat-signe.pdf`);
  // 4. L'admin voit le contrat signé dans l'onglet Contrats
  { const a = await contexte(navigateur, base, ADMIN);
    await connecter(a.page, BASE, ADMIN, "/admin");
    await a.page.getByRole("tab", { name: /Contrats$/ }).click(); await a.page.waitForTimeout(1200);
    const suivi = a.page.getByTestId("suivi-signatures");
    verifier((await suivi.innerText()).includes("Signé le"), "l'admin ne voit pas le contrat signé");
    verifier(await a.page.getByText(/contresigné par l'employeur/).count(), "la contresignature n'est pas indiquée côté admin");
    await a.page.screenshot({ path: `${CAPTURES}/3-admin-signatures.png` });
    verifier(!a.erreurs.length, "erreurs JavaScript (admin) : " + a.erreurs.join(" ; "));
    await a.ctx.close(); }
  notes.push("contrat + conditions signés par le crew et contresignés ; PDF téléchargé");
  verifier(!erreurs.length, "erreurs JavaScript : " + erreurs.join(" ; "));
  await ctx.close();
});

// 3 quater. Remarques du crew sur son contrat (heures en plus, frais) → visibles et traitées par l'admin
await scenario("Crew : remarque « heures en plus » sur un contrat → l'admin l'accepte", async (notes) => {
  const base = nouvelleBase();
  const crew = base.staff[0];
  const date = new Date(Date.now() + 3 * 864e5).toISOString().slice(0, 10);
  base.contrats.push({ id: "cR", staff_id: crew.id, titre: "Hôtesse", type_contrat: "cdd", statut: "actif", evenement: "Soirée gala", lieu: "Rabat", date_debut: date, date_fin: date, taux_horaire: 60, total_heures: 8, salaire_brut: 480, dates: [{ date, heures: 8, heure_debut: "16:00", heure_fin: "00:00" }] });
  { const { page, ctx, erreurs } = await contexte(navigateur, base, crew.email, { mobile: true });
    await connecter(page, BASE, crew.email, "/staff-dashboard");
    await page.getByRole("button", { name: /Ajouter une remarque/ }).click();
    await page.getByRole("combobox", { name: "Jour concerné" }).selectOption(date).catch(() => {});
    await page.getByPlaceholder("Heures en plus").fill("1.5");
    await page.getByTestId("remarques-crew").locator("textarea").fill("La soirée a fini à 1 h 30 à la demande du client.");
    await page.getByRole("button", { name: "Envoyer à l'agence" }).click(); await page.waitForTimeout(1200);
    const r = base.remarques_contrat?.[0];
    verifier(r && r.type === "heures_sup" && Number(r.heures) === 1.5 && r.contrat_id === "cR", "remarque non enregistrée");
    verifier(await page.getByText("Envoyée — en attente").count(), "le crew ne voit pas sa remarque");
    // frais
    await page.getByRole("button", { name: /Ajouter une remarque/ }).click();
    await page.getByRole("button", { name: /Frais/ }).click();
    await page.getByPlaceholder("Montant (MAD)").fill("120");
    await page.getByTestId("remarques-crew").locator("textarea").fill("Taxi retour, reçu disponible.");
    await page.getByRole("button", { name: "Envoyer à l'agence" }).click(); await page.waitForTimeout(1200);
    verifier(base.remarques_contrat.length === 2 && Number(base.remarques_contrat[1].montant) === 120, "frais non enregistrés");
    await page.screenshot({ path: `${CAPTURES}/3-remarques-crew.png`, fullPage: true });
    verifier(!erreurs.length, "erreurs JavaScript (crew) : " + erreurs.join(" ; "));
    await ctx.close(); }
  { const { page, ctx, erreurs } = await contexte(navigateur, base, ADMIN);
    await connecter(page, BASE, ADMIN, "/admin");
    await page.getByRole("tab", { name: /Contrats$/ }).click(); await page.waitForTimeout(1200);
    const carte = page.getByTestId("remarques-admin");
    verifier((await carte.innerText()).includes("2 nouvelles"), "l'admin ne voit pas les 2 nouvelles remarques");
    verifier((await carte.innerText()).includes("+1.5 h") && (await carte.innerText()).includes("120 MAD"), "détail heures / montant absent côté admin");
    await carte.getByPlaceholder(/Réponse au crew/).first().fill("OK, ajouté sur ta fiche de paie.");
    await carte.getByRole("button", { name: "Accepter" }).first().click(); await page.waitForTimeout(1000);
    verifier(base.remarques_contrat.some((r) => r.statut === "acceptee" && r.reponse?.includes("fiche de paie")), "acceptation non enregistrée");
    await page.screenshot({ path: `${CAPTURES}/3-remarques-admin.png` });
    verifier(!erreurs.length, "erreurs JavaScript (admin) : " + erreurs.join(" ; "));
    await ctx.close(); }
  { const { page, ctx } = await contexte(navigateur, base, crew.email, { mobile: true });
    await connecter(page, BASE, crew.email, "/staff-dashboard");
    verifier(await page.getByText("Acceptée ✓").count() && await page.getByText(/Réponse de l'agence/).count(), "le crew ne voit pas la réponse de l'agence");
    await ctx.close(); }
  notes.push("heures en plus + frais envoyés par le crew, vus et acceptés par l'admin, réponse visible côté crew");
});

// 3 quinquies. Devis spécial Nawar Perfumes (parfums à 80 MAD, prix ajustable, personnel + transport)
await scenario("Admin : devis Nawar bar à parfums (logo Nawar, 80 MAD par parfum ajustable)", async (notes) => {
  const base = nouvelleBase();
  base.catalogue_prestations = [...base.catalogue_prestations];
  const { page, ctx, erreurs } = await contexte(navigateur, base, ADMIN);
  await connecter(page, BASE, ADMIN, "/admin");
  await page.getByRole("tab", { name: /Devis$/ }).first().click(); await page.waitForTimeout(800);
  await page.getByRole("button", { name: /Devis Nawar/ }).click(); await page.waitForTimeout(800);
  const desig = page.getByPlaceholder(/Désignation/);
  verifier((await desig.first().inputValue()) === "Parfums — bar à parfums Nawar", "la ligne parfums n'est pas en tête");
  verifier(await desig.count() >= 2, "personnel / transport non pré-ajoutés");
  const prix = page.locator("input[type=number]").filter({ has: page.locator("xpath=.") });
  const ligne1 = page.locator(".border.rounded-md.p-3").filter({ has: page.locator('input[value="Parfums — bar à parfums Nawar"]') }).first();
  const champs = ligne1.locator("input[type=number]");
  verifier((await champs.nth(2).inputValue()) === "80", "le prix par parfum n'est pas 80");
  verifier((await champs.nth(0).inputValue()) === "50", "le devis Nawar ne démarre pas au minimum de 50 parfums");
  await champs.nth(0).fill("30"); await page.waitForTimeout(200);
  verifier(await page.getByTestId("minimum-nawar").count(), "pas d'alerte sous le minimum de 50 parfums");
  await champs.nth(0).fill("250"); await champs.nth(2).fill("75");
  verifier(!(await page.getByTestId("minimum-nawar").count()), "l'alerte minimum reste affichée à 250 parfums");
  await page.waitForTimeout(300);
  verifier((await page.locator("body").innerText()).replace(/\s/g, "").includes("18750,00"), "le total des parfums (250 × 75) n'est pas recalculé");
  verifier(await page.getByText("Logo Nawar — bar à parfums").count(), "le logo Nawar n'est pas choisi");
  await page.getByText("Nom du contact").locator("..").locator("input").fill("Client test");
  const [dl] = await Promise.all([page.waitForEvent("download", { timeout: 40000 }), page.getByRole("button", { name: "Télécharger le PDF" }).click()]);
  await dl.saveAs(`${CAPTURES}/devis-nawar.pdf`);
  verifier(base.devis[0]?.marque === "nawar", "la marque Nawar n'est pas enregistrée avec le devis");
  await page.screenshot({ path: `${CAPTURES}/5-devis-nawar.png`, fullPage: true });
  notes.push("devis pré-rempli (parfums 80 MAD + personnel + transport), quantité et prix modifiés : 250 × 75 = 18 750 MAD");
  verifier(!erreurs.length, "erreurs JavaScript : " + erreurs.join(" ; "));
  await ctx.close();
});

// 3 nonies. Devis envoyé au client → il le signe en ligne sur son téléphone → acompte + RIB ; l'admin le voit signé
await scenario("Devis envoyé au client → signature en ligne sur smartphone → acompte et RIB", async (notes) => {
  const base = nouvelleBase();
  base.parametres_agence[0].rib = "011 810 0000012345678901 23";
  const { page, ctx, erreurs } = await contexte(navigateur, base, ADMIN);
  page.on("dialog", (d) => d.accept());
  await connecter(page, BASE, ADMIN, "/admin");
  await page.getByRole("tab", { name: /Devis$/ }).first().click(); await page.waitForTimeout(800);
  await page.getByRole("button", { name: /Devis Nawar/ }).click(); await page.waitForTimeout(800);
  await page.getByText("Nom du contact").locator("..").locator("input").fill("Salma Bennani");
  await page.getByTestId("envoyer-client").click(); await page.waitForTimeout(800);
  verifier(/E-mail du client manquant/.test(await toasts(page)), "l'envoi sans e-mail n'est pas refusé");
  await page.locator('input[type="email"]').first().fill("salma@example.com");
  await page.getByTestId("envoyer-client").click(); await page.waitForTimeout(1500);
  const appel = base.appelsFonctions.find((a) => a.nom === "envoyer-devis");
  verifier(appel?.corps?.devisId === base.devis[0]?.id, "la fonction d'envoi n'a pas reçu le bon devis");
  verifier(base.devis[0].statut === "envoye", "le devis n'est pas passé en « Envoyé »");
  verifier(await page.getByRole("button", { name: /Copier le lien client/ }).count(), "pas de bouton pour copier le lien client");
  notes.push("devis enregistré puis envoyé (e-mail refusé tant qu'il manque l'adresse du client)");

  // Le client ouvre son lien sur smartphone, sans compte
  const token = base.devis[0].lien_token;
  const client = await contexte(navigateur, base, "salma@example.com", { mobile: true });
  await client.page.goto(`${BASE}/mon-devis/${token}`); await client.page.evaluate(() => sessionStorage.setItem("heavent-splash-vu", "1")); await client.page.reload(); await client.page.waitForTimeout(1500);
  verifier(await client.page.getByText("Votre devis DEV-2026-0099").count(), "la page client n'affiche pas le devis");
  verifier(!(await client.page.getByText(/notes internes/i).count()), "des notes internes sont visibles");
  const largeur = await client.page.evaluate(() => document.documentElement.scrollWidth);
  verifier(largeur <= 392, `la page déborde sur smartphone (${largeur} px)`);
  await client.page.screenshot({ path: `${CAPTURES}/8-devis-client.png`, fullPage: true });
  await client.page.getByTestId("signer-devis").tap(); await client.page.waitForTimeout(300);
  verifier(await client.page.getByText("Dessinez votre signature dans le cadre.").count(), "signer sans signature n'est pas refusé");
  const zone = client.page.getByTestId("zone-signature"); await zone.scrollIntoViewIfNeeded();
  const b = await zone.boundingBox(); const cdp = await client.ctx.newCDPSession(client.page);
  await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: b.x + 30, y: b.y + b.height / 2 }] });
  for (let i = 1; i <= 30; i++) await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: b.x + 30 + i * 8, y: b.y + b.height / 2 + Math.sin(i / 2) * 25 }] });
  await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await client.page.getByText("J'ai lu le devis et les conditions").tap(); await client.page.waitForTimeout(200);
  if (!(await client.page.getByTestId("case-accord").isChecked())) await client.page.getByTestId("case-accord").check();
  verifier(await client.page.getByTestId("case-accord").isChecked(), "la case d'accord ne se coche pas");
  await client.page.getByTestId("signer-devis").tap(); await client.page.waitForTimeout(1500);
  verifier(base.devis[0].signe_le && base.devis[0].signature_nom === "Salma Bennani", "la signature n'est pas enregistrée : " + ((await client.page.locator("[role=alert]").allInnerTexts()).join(" ") || JSON.stringify(base.appelsFonctions.filter((a) => a.nom === "signer-devis").map((a) => ({ ...a.corps, image: String(a.corps.image).length })))));
  verifier(await client.page.getByTestId("confirmation-signature").isVisible(), "pas de confirmation après la signature");
  const acompte = await client.page.getByTestId("acompte").innerText();
  verifier(acompte.includes("011 810 0000012345678901 23") && acompte.includes("DEV-2026-0099"), "le RIB ou la référence n'apparaissent pas");
  verifier(base.factures?.length === 1 && base.factures[0].type === "acompte", "la facture d'acompte n'est pas créée à la signature");
  verifier(await client.page.getByTestId("mes-factures").isVisible(), "le client ne voit pas sa facture d'acompte");
  await client.page.screenshot({ path: `${CAPTURES}/9-devis-signe.png`, fullPage: true });
  const [dl] = await Promise.all([client.page.waitForEvent("download", { timeout: 40000 }), client.page.getByRole("button", { name: "Télécharger le PDF" }).tap()]);
  await dl.saveAs(`${CAPTURES}/devis-signe.pdf`);
  verifier(!client.erreurs.length, "erreurs JavaScript côté client : " + client.erreurs.join(" ; "));
  await client.ctx.close();
  notes.push("le client signe au doigt, voit son acompte et le RIB, et télécharge son devis signé en PDF");

  // Retour côté admin : devis signé dans la liste, envoi bloqué
  await page.reload(); await page.waitForTimeout(2500);
  await page.getByRole("tab", { name: /Devis/ }).first().click().catch(() => {}); await page.waitForTimeout(800);
  verifier(await page.getByText("✍️ Signé en ligne").count(), "l'admin ne voit pas que le devis est signé");
  notes.push("l'admin voit « ✍️ Signé en ligne » dans la liste");
  verifier(!erreurs.length, "erreurs JavaScript : " + erreurs.join(" ; "));
  await ctx.close();
});

// 3 decies. Bilan de l'activité + réalisations en photos publiées sur le site
await scenario("Admin : bilan de l'activité, puis réalisations en photos publiées sur le site", async (notes) => {
  const base = nouvelleBase();
  const mois = new Date().toISOString().slice(0, 7);
  const ilYa = (j) => new Date(Date.now() - j * 864e5).toISOString();
  const dansJ = (j) => new Date(Date.now() + j * 864e5).toISOString().slice(0, 10);
  base.devis = [
    { id: "d1", numero: "DEV-1", client_nom: "Salma", titre: "Mariage Salma & Karim", statut: "accepte", total_ttc: 60000, date_emission: `${mois}-01`, date_envoi: ilYa(3), signe_le: new Date().toISOString(), date_evenement: dansJ(20), relances: 0 },
    { id: "d2", numero: "DEV-2", client_nom: "Société Atlas", titre: "Salon", statut: "envoye", total_ttc: 24000, date_emission: `${mois}-01`, date_envoi: ilYa(7), signe_le: null, date_evenement: dansJ(40), relances: 1 },
  ];
  base.devis_mariage = [
    { id: "m1", nom: "Nora", created_at: new Date().toISOString(), statut: "en_attente", configuration: { elements: { table_ronde: 12, dj: 1, nawar: 1 } } },
    { id: "m2", nom: "Ali", created_at: new Date().toISOString(), statut: "en_attente", configuration: { elements: { table_ronde: 8, photobooth: 1 } } },
  ];
  const { page, ctx, erreurs } = await contexte(navigateur, base, ADMIN);
  page.on("dialog", (d) => d.accept());
  await connecter(page, BASE, ADMIN, "/admin");
  await page.getByRole("tab", { name: /Bilan/ }).click(); await page.waitForTimeout(1200);
  const bilan = await page.getByTestId("tableau-de-bord").innerText();
  verifier(/Demandes ce mois-ci\s*2/i.test(bilan), "les 2 demandes du mois ne sont pas comptées");
  verifier(bilan.replace(/\s/g, "").includes("60000MAD"), "le chiffre signé du mois (60 000 MAD) n'apparaît pas");
  verifier(bilan.includes("Mariage Salma & Karim"), "l'événement confirmé à venir n'est pas listé");
  verifier(bilan.includes("Société Atlas"), "le devis sans réponse depuis 7 jours n'est pas listé");
  verifier(/Table ronde\s*2/.test(await page.getByTestId("choix-jeu").innerText()), "les choix du jeu ne sont pas comptés");
  await page.screenshot({ path: `${CAPTURES}/10-bilan.png`, fullPage: true });
  notes.push("bilan : demandes du mois, chiffre signé, événements à venir, devis sans réponse, choix du jeu");

  await page.getByRole("tab", { name: /Site$/ }).click(); await page.waitForTimeout(600);
  await page.getByRole("button", { name: "Ajouter", exact: true }).click();
  await page.getByPlaceholder("Ex. Mariage de Salma & Karim").fill("Mariage de Salma & Karim");
  await page.getByPlaceholder(/Palais des Congrès/).fill("Rabat");
  await page.getByTestId("photos-realisation").setInputFiles([new URL("../../public/lovable-uploads/df0014d7-d697-4525-a5ee-71cf8fa774ab.png", import.meta.url).pathname, new URL("../../public/lovable-uploads/8d6b5162-f9c8-419e-a6f0-2f2949d8d05f.png", import.meta.url).pathname]);
  await page.waitForTimeout(2500);
  await page.getByTestId("form-realisation").getByRole("switch").click();
  await page.getByTestId("form-realisation").getByRole("button", { name: "Enregistrer" }).click(); await page.waitForTimeout(1000);
  const r = base.realisations?.[0];
  verifier(r?.publie && r.photos.length === 2 && r.photos.every((u) => u.includes("/assets/realisations/")), "la réalisation et ses 2 photos ne sont pas enregistrées : " + JSON.stringify(r));
  notes.push("réalisation créée avec 2 photos (réduites et envoyées dans le stockage) et publiée");
  verifier(!erreurs.length, "erreurs JavaScript : " + erreurs.join(" ; "));
  await ctx.close();

  // Visiteur : le menu propose « Réalisations », la galerie s'affiche et s'ouvre en grand
  const v = await contexte(navigateur, base, "visiteur@exemple.ma", { mobile: true });
  await v.page.goto(`${BASE}/realisations`); await v.page.evaluate(() => sessionStorage.setItem("heavent-splash-vu", "1")); await v.page.reload(); await v.page.waitForTimeout(1800);
  verifier(await v.page.getByTestId("galerie").getByText("Mariage de Salma & Karim").count(), "la réalisation n'apparaît pas dans la galerie");
  await v.page.getByRole("button", { name: "Ouvrir le menu" }).tap(); await v.page.waitForTimeout(500);
  verifier(await v.page.getByRole("link", { name: "Réalisations" }).count(), "le lien « Réalisations » n'apparaît pas dans le menu");
  await v.page.keyboard.press("Escape").catch(() => {});
  await v.page.goto(`${BASE}/realisations`); await v.page.waitForTimeout(1500);
  await v.page.getByTestId("galerie").locator("button").first().tap(); await v.page.waitForTimeout(600);
  verifier(await v.page.getByText("1 / 2").count(), "la visionneuse ne montre pas les 2 photos");
  await v.page.screenshot({ path: `${CAPTURES}/11-realisations.png` });
  verifier(!v.erreurs.length, "erreurs JavaScript (visiteur) : " + v.erreurs.join(" ; "));
  await v.ctx.close();
  notes.push("visiteur : lien dans le menu, galerie et visionneuse (1 / 2)");
});

// 3 undecies. Le client ne signe pas : il demande d'abord un rendez-vous (mention « montant évolutif » affichée)
await scenario("Devis : le client préfère un rendez-vous plutôt que signer", async (notes) => {
  const base = nouvelleBase();
  base.devis = [{ id: "dv1", numero: "DEV-2026-0120", type: "mariage", marque: "heavent", client_nom: "Nora Alaoui", client_email: "nora@example.com", titre: "Mariage Nora", statut: "envoye",
    total_ttc: 48000, remise_globale_pct: 0, taux_tva: 20, acompte_pct: 50, date_emission: "2026-10-18", date_validite: "2099-12-31", date_envoi: new Date().toISOString(), lien_token: "11111111-2222-3333-4444-555555555555", relances: 0 }];
  base.devis_lignes = [{ id: "l1", devis_id: "dv1", ordre: 0, designation: "Décoration complète", description: null, quantite: 1, duree: 1, unite: "forfait", prix_unitaire: 40000, remise_pct: 0 }];
  const c = await contexte(navigateur, base, "nora@example.com", { mobile: true });
  await c.page.goto(`${BASE}/mon-devis/11111111-2222-3333-4444-555555555555`); await c.page.evaluate(() => sessionStorage.setItem("heavent-splash-vu", "1")); await c.page.reload(); await c.page.waitForTimeout(1500);
  verifier(/premier rendez-vous/.test(await c.page.getByTestId("mention-montant").innerText()), "la mention « montant évolutif » n'apparaît pas");
  await c.page.getByTestId("ouvrir-rdv").tap(); await c.page.waitForTimeout(800);
  verifier(await c.page.getByTestId("choisir-rdv").isVisible(), "l'agenda des créneaux ne s'affiche pas");
  await c.page.getByTestId("rdv-texte-libre").tap();
  await c.page.locator("#rdv-dispo").fill("Samedi matin");
  await c.page.locator("#rdv-message").fill("Nous aimerions voir les options de décoration");
  await c.page.getByTestId("envoyer-rdv").tap(); await c.page.waitForTimeout(1200);
  verifier(base.devis[0].rdv_demande_le && base.devis[0].relances === 2, "la demande de rendez-vous n'est pas enregistrée (ou les relances continuent)");
  verifier(!base.devis[0].signe_le && base.devis[0].statut === "envoye", "le devis ne doit pas être signé");
  verifier(await c.page.getByTestId("rdv-envoye").isVisible(), "pas de confirmation de la demande de rendez-vous");
  verifier(await c.page.getByTestId("bloc-signature").isVisible(), "le client doit pouvoir encore signer plus tard");
  await c.page.screenshot({ path: `${CAPTURES}/12-devis-rdv.png`, fullPage: true });
  verifier(!c.erreurs.length, "erreurs JavaScript : " + c.erreurs.join(" ; "));
  await c.ctx.close();
  notes.push("mention affichée ; rendez-vous demandé sans signer, relances arrêtées, signature toujours possible");
});

// 3 duodecies. Factures : acompte payé → solde (acompte déduit) → PDF → envoi → page client
await scenario("Factures : acompte payé, solde avec acompte déduit, PDF, envoi et page client", async (notes) => {
  const base = nouvelleBase();
  base.parametres_agence[0].rib = "011 810 0000012345678901 23";
  base.devis = [{ id: "dv2", numero: "DEV-2026-0130", type: "entreprise", marque: "heavent", client_nom: "Karim Tazi", client_societe: "Atlas Events SARL", client_ice: "001234567000089",
    client_email: "karim@atlas.ma", titre: "Salon Atlas 2026", statut: "accepte", total_ttc: 10080, remise_globale_pct: 0, taux_tva: 20, acompte_pct: 30, date_emission: "2026-10-01",
    date_validite: "2099-12-31", date_evenement: "2026-10-10", lieu: "Casablanca", lien_token: "22222222-3333-4444-5555-666666666666", signe_le: "2026-10-02T10:00:00Z", signature_nom: "Karim Tazi", relances: 0 }];
  base.devis_lignes = [
    { id: "l1", devis_id: "dv2", ordre: 0, designation: "Hôtesses d'accueil", description: "Tenue fournie", quantite: 4, duree: 8, unite: "heure", prix_unitaire: 150, remise_pct: 0 },
    { id: "l2", devis_id: "dv2", ordre: 1, designation: "Coordination", description: null, quantite: 1, duree: 1, unite: "forfait", prix_unitaire: 3600, remise_pct: 0 }];
  const acompte = creerFacture(base, "dv2", "acompte", "signature en ligne"); // créée à la signature
  verifier(acompte.total_ttc === 3024 && acompte.total_ht === 2520, `acompte mal calculé (${acompte.total_ht} HT / ${acompte.total_ttc} TTC)`);

  const { page, ctx, erreurs } = await contexte(navigateur, base, ADMIN);
  page.on("dialog", (d) => d.accept());
  await connecter(page, BASE, ADMIN, "/admin");
  await page.getByRole("tab", { name: /Devis$/ }).first().click(); await page.waitForTimeout(800);
  await page.getByText("Atlas Events SARL").first().click(); await page.waitForTimeout(1500);
  const bloc = page.getByTestId("bloc-factures");
  verifier(await bloc.getByTestId("facture-ligne").count() === 1, "la facture d'acompte n'apparaît pas dans le devis");
  await bloc.getByTestId("facture-payee").click(); await page.waitForTimeout(500);
  await page.getByTestId("confirmer-paiement").click(); await page.waitForTimeout(1000);
  verifier(base.factures[0].statut === "payee" && base.factures[0].mode_paiement === "Virement", "le paiement de l'acompte n'est pas enregistré");
  notes.push("acompte FAC-2026-0001 (3 024 MAD) marqué payé par virement");

  await bloc.getByTestId("creer-facture-solde").click(); await page.waitForTimeout(2000);
  const solde = base.factures[1];
  verifier(solde?.type === "solde" && solde.total_ttc === 10080 && solde.deduction_ttc === 3024 && solde.net_a_payer === 7056, "facture de solde incorrecte : " + JSON.stringify(solde && { t: solde.type, ttc: solde.total_ttc, d: solde.deduction_ttc, n: solde.net_a_payer }) + " " + await toasts(page));
  verifier(!(await bloc.getByTestId("creer-facture-solde").count()), "on peut encore facturer un devis déjà entièrement facturé");
  notes.push("solde FAC-2026-0002 : 10 080 TTC − acompte 3 024 = 7 056 MAD à payer");

  const [dl] = await Promise.all([page.waitForEvent("download", { timeout: 40000 }), bloc.getByTestId("facture-pdf").nth(1).click()]);
  verifier(/^Facture-FAC-2026-0002-Atlas-Events-SARL\.pdf$/.test(dl.suggestedFilename()), "nom du PDF inattendu : " + dl.suggestedFilename());
  await dl.saveAs(`${CAPTURES}/facture-solde.pdf`);
  await bloc.getByTestId("facture-envoyer").nth(1).click(); await page.waitForTimeout(1000);
  verifier(base.factures[1].envoyee_le && base.appelsFonctions.some((a) => a.nom === "envoyer-facture" && a.corps.factureId === solde.id), "la facture n'est pas envoyée au client");
  await page.screenshot({ path: `${CAPTURES}/13-devis-factures.png`, fullPage: true });

  await page.getByTestId("onglet-factures").click(); await page.waitForTimeout(1000);
  const encaisser = (await page.getByTestId("factures-a-encaisser").innerText()).replace(/\s+/g, " ");
  verifier(encaisser.includes("7 056,00"), "le reste à encaisser est faux : " + encaisser);
  await page.screenshot({ path: `${CAPTURES}/14-factures.png`, fullPage: true });
  await page.getByRole("tab", { name: "Mes devis" }).click(); await page.waitForTimeout(500);
  verifier(!(await page.getByTestId("supprimer-devis").count()) && await page.getByTestId("archiver-devis").count(), "un devis facturé propose encore « Supprimer » au lieu d'« Archiver »");
  verifier(!erreurs.length, "erreurs JavaScript : " + erreurs.join(" ; "));
  await ctx.close();
  notes.push("PDF téléchargé, facture envoyée, « reste à encaisser » juste, devis facturé : « Archiver » au lieu de « Supprimer »");

  const c = await contexte(navigateur, base, "karim@atlas.ma", { mobile: true });
  await c.page.goto(`${BASE}/mon-devis/22222222-3333-4444-5555-666666666666#factures`); await c.page.evaluate(() => sessionStorage.setItem("heavent-splash-vu", "1")); await c.page.reload(); await c.page.waitForTimeout(1800);
  const liste = await c.page.getByTestId("mes-factures").innerText();
  verifier(liste.includes("FAC-2026-0001") && liste.includes("FAC-2026-0002") && /réglée/.test(liste), "la page client ne liste pas les factures : " + liste);
  const [dl2] = await Promise.all([c.page.waitForEvent("download", { timeout: 40000 }), c.page.getByTestId("telecharger-facture").first().tap()]);
  await dl2.saveAs(`${CAPTURES}/facture-acompte.pdf`);
  await c.page.screenshot({ path: `${CAPTURES}/15-client-factures.png`, fullPage: true });
  verifier(!c.erreurs.length, "erreurs JavaScript côté client : " + c.erreurs.join(" ; "));
  await c.ctx.close();
  notes.push("le client voit et télécharge ses 2 factures depuis son lien");
});

// 3 terdecies. Agenda : le client réserve un créneau, l'admin règle ses dispos, bloque un jour, annule
await scenario("Agenda : réservation d'un créneau (devis + Contact), dispos et jours bloqués dans l'admin", async (notes) => {
  const base = nouvelleBase();
  base.devis = [{ id: "dv3", numero: "DEV-2026-0140", type: "mariage", marque: "heavent", client_nom: "Leila Idrissi", client_email: "leila@example.com", client_telephone: "0612345678", titre: "Mariage Leila",
    statut: "envoye", total_ttc: 30000, remise_globale_pct: 0, taux_tva: 20, acompte_pct: 50, date_emission: "2026-10-18", date_validite: "2099-12-31", date_envoi: new Date().toISOString(), lien_token: "33333333-4444-5555-6666-777777777777", relances: 0 }];
  base.devis_lignes = [{ id: "l1", devis_id: "dv3", ordre: 0, designation: "Décoration", description: null, quantite: 1, duree: 1, unite: "forfait", prix_unitaire: 25000, remise_pct: 0 }];
  const c = await contexte(navigateur, base, "leila@example.com", { mobile: true });
  await c.page.goto(`${BASE}/mon-devis/33333333-4444-5555-6666-777777777777`); await c.page.evaluate(() => sessionStorage.setItem("heavent-splash-vu", "1")); await c.page.reload(); await c.page.waitForTimeout(1500);
  await c.page.getByTestId("ouvrir-rdv").tap(); await c.page.waitForTimeout(800);
  await c.page.getByTestId("rdv-type-telephone").tap();
  await c.page.getByTestId("rdv-jour").nth(1).tap();
  const nbHeures = await c.page.getByTestId("rdv-heure").count();
  verifier(nbHeures >= 4, `trop peu de créneaux proposés (${nbHeures})`);
  await c.page.getByTestId("rdv-heure").nth(2).tap();
  verifier(await c.page.getByTestId("rdv-nom").inputValue() === "Leila Idrissi", "le nom du devis n'est pas prérempli");
  await c.page.getByTestId("rdv-tel").fill("");
  await c.page.getByTestId("rdv-confirmer").tap(); await c.page.waitForTimeout(500);
  verifier(/numéro de téléphone/.test(await c.page.locator("[role=alert]").first().innerText()), "un rendez-vous par téléphone sans numéro n'est pas refusé");
  await c.page.getByTestId("rdv-tel").fill("0612345678");
  await c.page.getByTestId("rdv-confirmer").tap(); await c.page.waitForTimeout(1200);
  verifier(await c.page.getByTestId("rdv-confirme").isVisible(), "pas de confirmation du rendez-vous");
  const r = base.rendez_vous[0];
  verifier(r?.type === "telephone" && r.devis_id === "dv3" && base.devis[0].rdv_demande_le && base.devis[0].relances === 2, "le rendez-vous n'est pas relié au devis");
  const largeur = await c.page.evaluate(() => document.documentElement.scrollWidth);
  verifier(largeur <= 392, `la page déborde sur smartphone (${largeur} px)`);
  await c.page.screenshot({ path: `${CAPTURES}/16-rdv-client.png`, fullPage: true });
  verifier(!c.erreurs.length, "erreurs JavaScript côté client : " + c.erreurs.join(" ; "));
  await c.ctx.close();
  notes.push("depuis son devis, la cliente choisit téléphone, un jour, une heure : rendez-vous confirmé, relié au devis, relances arrêtées");

  // Page Contact : le créneau pris n'est plus proposé
  const v = await contexte(navigateur, base, "visiteur@example.com");
  await v.page.goto(`${BASE}/contact`); await v.page.evaluate(() => sessionStorage.setItem("heavent-splash-vu", "1")); await v.page.reload(); await v.page.waitForTimeout(1500);
  verifier(await v.page.getByTestId("choisir-rdv").isVisible(), "pas d'agenda sur la page Contact");
  await v.page.getByTestId("rdv-jour").nth(1).click();
  verifier(await v.page.getByTestId("rdv-heure").count() === nbHeures - 1, "le créneau déjà réservé est encore proposé");
  await v.ctx.close();
  notes.push("page Contact : agenda affiché, le créneau déjà pris a disparu");

  const { page, ctx, erreurs } = await contexte(navigateur, base, ADMIN);
  page.on("dialog", (d) => d.accept("Imprévu, désolée"));
  await connecter(page, BASE, ADMIN, "/admin");
  await page.getByTestId("onglet-agenda").click(); await page.waitForTimeout(1200);
  verifier(await page.getByTestId("rdv-ligne").count() === 1 && /Leila Idrissi/.test(await page.getByTestId("liste-rdv").innerText()), "le rendez-vous n'apparaît pas dans l'agenda admin");
  const avant = base.agenda_horaires.length;
  await page.getByTestId("ajouter-plage-7").click();
  await page.getByTestId("enregistrer-dispos").click(); await page.waitForTimeout(1200);
  verifier(base.agenda_horaires.length === avant + 1 && base.agenda_horaires.some((h) => h.jour === 7), "la plage du dimanche n'est pas enregistrée");
  const demain = new Date(Date.now() + 3 * 864e5).toISOString().slice(0, 10);
  await page.getByTestId("bloquer-du").fill(demain);
  await page.getByTestId("bloquer").click(); await page.waitForTimeout(1000);
  verifier(base.agenda_indisponibilites.length === 1 && base.agenda_indisponibilites[0].debut.endsWith("T00:00:00.000Z"), "le jour bloqué est mal enregistré : " + JSON.stringify(base.agenda_indisponibilites[0]));
  await page.getByTestId("lien-calendrier").click(); await page.waitForTimeout(600);
  verifier(await page.getByText("s'abonner en un clic").count(), "pas de lien d'abonnement au calendrier");
  await page.screenshot({ path: `${CAPTURES}/17-agenda-admin.png`, fullPage: true });
  await page.getByTestId("rdv-annuler").click(); await page.waitForTimeout(1200);
  verifier(base.rendez_vous[0].statut === "annule" && base.appelsFonctions.some((a) => a.nom === "prendre-rdv" && a.corps.action === "annuler" && a.corps.motif === "Imprévu, désolée"), "l'annulation n'est pas faite");
  verifier(!erreurs.length, "erreurs JavaScript : " + erreurs.join(" ; "));
  await ctx.close();
  notes.push("admin : rendez-vous visible, plage du dimanche ajoutée, jour bloqué (minuit heure du Maroc, GMT), lien calendrier, annulation avec message au client");
});

// 3 quaterdecies. Pointage : le crew confirme, consulte sa fiche mission, pointe arrivée (position + selfie) et départ
await scenario("Pointage : confirmation, fiche mission, arrivée sur le lieu avec selfie, départ, suivi admin", async (notes) => {
  const base = nouvelleBase();
  const crew = base.staff[0];
  const maintenant = new Date();
  const debut = `${String(maintenant.getUTCHours()).padStart(2, "0")}:00:00`;
  const fin = `${String((maintenant.getUTCHours() + 4) % 24).padStart(2, "0")}:00:00`;
  base.devis = [{ id: "dv5", numero: "DEV-2026-0150", type: "entreprise", marque: "heavent", client_nom: "Atlas", titre: "Salon de l'Auto", lieu: "Office des Changes, Casablanca", statut: "accepte", total_ttc: 5000, date_evenement: maintenant.toISOString().slice(0, 10), lien_token: crypto.randomUUID() }];
  base.fiches_mission = [{ devis_id: "dv5", tenue: "Tailleur noir, chignon", point_rdv: "Hall 2, entrée du personnel", heure_rdv: "08:30:00", latitude: 33.5731, longitude: -7.5898, rayon_m: 300, contact_nom: "Imane", contact_telephone: "0610939655", consignes: "Accueil des visiteurs" }];
  base.affectations = [{ id: "af1", devis_id: "dv5", staff_id: crew.id, date_jour: maintenant.toISOString().slice(0, 10), heure_debut: debut, heure_fin: fin, heures: 4, poste: "Hôtesse d'accueil", taux_horaire: 60, statut: "confirme" }];

  const c = await contexte(navigateur, base, crew.email, { mobile: true });
  await c.ctx.grantPermissions(["geolocation"], { origin: BASE });
  await c.ctx.setGeolocation({ latitude: 33.5735, longitude: -7.5893, accuracy: 25 });
  await connecter(c.page, BASE, crew.email, "/staff-dashboard");
  verifier(await c.page.getByTestId("mes-missions").isVisible(), "pas de section « Mes prochaines missions »");
  const fiche = await c.page.getByTestId("fiche-mission").innerText();
  verifier(/Tailleur noir/.test(fiche) && /Hall 2/.test(fiche) && /Imane/.test(fiche), "la fiche mission n'est pas affichée : " + fiche);
  await c.page.getByTestId("confirmer-presence").tap(); await c.page.waitForTimeout(800);
  verifier(base.affectations[0].presence_confirmee_le, "la confirmation de présence n'est pas enregistrée");
  await c.page.getByTestId("pointer-arrivee").tap(); await c.page.waitForTimeout(500);
  const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAHElEQVR4nGP8z8Dwn4EIwESMolGFowpHFQ4uhQBGhgIeb6zKqQAAAABJRU5ErkJggg==", "base64");
  await c.page.getByTestId("selfie").setInputFiles({ name: "selfie.png", mimeType: "image/png", buffer: png }); await c.page.waitForTimeout(600);
  await c.page.getByTestId("valider-pointage").tap(); await c.page.waitForTimeout(1500);
  const a = base.affectations[0];
  verifier(a.arrivee_le && a.arrivee_verifiee === true && a.arrivee_position?.distance < 100 && a.arrivee_photo, "arrivée mal pointée : " + JSON.stringify({ v: a.arrivee_verifiee, p: a.arrivee_position, ph: a.arrivee_photo }));
  verifier(/Arrivée pointée/.test(await toasts(c.page)), "pas de confirmation du pointage d'arrivée");
  await c.page.screenshot({ path: `${CAPTURES}/18-pointage-crew.png`, fullPage: true });
  await c.page.getByTestId("pointer-depart").tap(); await c.page.waitForTimeout(400);
  await c.page.getByTestId("valider-pointage").tap(); await c.page.waitForTimeout(1500);
  verifier(a.depart_le && a.heures_pointees != null, "le départ n'est pas pointé");
  verifier(!c.erreurs.length, "erreurs JavaScript côté crew : " + c.erreurs.join(" ; "));
  await c.ctx.close();
  notes.push("le crew confirme, voit tenue / rendez-vous / contact, pointe son arrivée sur le lieu (≈ 50 m, selfie) puis son départ");

  // Un 2e crew pointe loin du lieu : à vérifier par l'admin
  const crew2 = base.staff[1];
  base.affectations.push({ id: "af2", devis_id: "dv5", staff_id: crew2.id, date_jour: maintenant.toISOString().slice(0, 10), heure_debut: debut, heure_fin: fin, heures: 4, poste: "Hôtesse d'accueil", taux_horaire: 60, statut: "confirme" });
  const c2 = await contexte(navigateur, base, crew2.email, { mobile: true });
  await c2.ctx.grantPermissions(["geolocation"], { origin: BASE });
  await c2.ctx.setGeolocation({ latitude: 34.0209, longitude: -6.8416, accuracy: 20 }); // Rabat
  await connecter(c2.page, BASE, crew2.email, "/staff-dashboard");
  await c2.page.getByTestId("pointer-arrivee").tap(); await c2.page.waitForTimeout(400);
  await c2.page.getByTestId("valider-pointage").tap(); await c2.page.waitForTimeout(1500);
  verifier(base.affectations[1].arrivee_verifiee === false && base.affectations[1].pointage_a_verifier, "un pointage hors du lieu n'est pas signalé");
  verifier(/hors du lieu/.test(await toasts(c2.page)), "le crew n'est pas informé que son pointage sera vérifié");
  await c2.ctx.close();

  const { page, ctx, erreurs } = await contexte(navigateur, base, ADMIN);
  await connecter(page, BASE, ADMIN, "/admin");
  await page.getByRole("tab", { name: /Bilan/ }).first().click().catch(() => {}); await page.waitForTimeout(1200);
  const suivi = await page.getByTestId("missions-du-jour").innerText();
  verifier(/Arrivée/.test(suivi) && /hors lieu/.test(suivi) && /1 pointage à vérifier/.test(suivi), "le suivi du jour est incomplet : " + suivi);
  await page.screenshot({ path: `${CAPTURES}/19-suivi-pointage.png`, fullPage: true });
  await page.getByTestId("pointage-a-verifier").getByRole("button", { name: /Garder 4 h prévues/ }).click(); await page.waitForTimeout(1000);
  verifier(base.affectations[1].heures_validees === 4 && !base.affectations[1].pointage_a_verifier, "la validation des heures par l'admin ne fonctionne pas");
  verifier(!erreurs.length, "erreurs JavaScript : " + erreurs.join(" ; "));
  await ctx.close();
  notes.push("admin : « Équipes sur le terrain » dans le Bilan, pointage hors lieu signalé puis validé (4 h)");
});

// 3 quindecies. Avis : le client note l'événement et chaque crew, l'admin voit les notes et reprend l'équipe
await scenario("Avis client : notes du service et des crews, avis Google, notes dans l'admin, reprendre la même équipe", async (notes) => {
  const base = nouvelleBase();
  base.parametres_agence[0].lien_avis_google = "https://g.page/r/heavent-test/review";
  const hier = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
  const [s1, s2] = base.staff;
  base.devis = [
    { id: "dv6", numero: "DEV-2026-0160", type: "mariage", marque: "heavent", client_nom: "Yasmine Berrada", client_email: "yasmine@example.com", titre: "Mariage Yasmine", statut: "accepte", total_ttc: 20000, remise_globale_pct: 0, taux_tva: 20, acompte_pct: 50, date_emission: "2026-09-01", date_validite: "2099-12-31", date_evenement: hier, lien_token: "66666666-7777-8888-9999-000000000000", signe_le: "2026-09-02T10:00:00Z", relances: 0 },
    { id: "dv7", numero: "DEV-2026-0170", type: "mariage", marque: "heavent", client_nom: "Yasmine Berrada", client_email: "yasmine@example.com", titre: "Henné Yasmine", statut: "brouillon", total_ttc: 0, remise_globale_pct: 0, taux_tva: 20, acompte_pct: 50, date_emission: "2026-10-19", date_validite: "2099-12-31", date_evenement: "2026-12-12", lien_token: crypto.randomUUID(), relances: 0 },
  ];
  base.devis_lignes = [{ id: "l1", devis_id: "dv6", ordre: 0, designation: "Hôtesses", description: null, quantite: 2, duree: 6, unite: "heure", prix_unitaire: 150, remise_pct: 0 }];
  base.affectations = [s1, s2].map((s, i) => ({ id: "afv" + i, devis_id: "dv6", staff_id: s.id, date_jour: hier, heure_debut: "18:00:00", heure_fin: "23:00:00", heures: 5, poste: "Hôtesse d'accueil", taux_horaire: 60, statut: "confirme" }));

  const c = await contexte(navigateur, base, "yasmine@example.com", { mobile: true });
  await c.page.goto(`${BASE}/mon-devis/66666666-7777-8888-9999-000000000000#avis`); await c.page.evaluate(() => sessionStorage.setItem("heavent-splash-vu", "1")); await c.page.reload(); await c.page.waitForTimeout(1800);
  const bloc = c.page.getByTestId("avis-evenement");
  verifier(await bloc.isVisible() && await bloc.getByTestId("membre-equipe").count() === 2, "le client ne voit pas son équipe à noter");
  await bloc.getByTestId("envoyer-avis").tap(); await c.page.waitForTimeout(300);
  verifier(/note pour l'événement/.test(await bloc.innerText()), "un avis sans note n'est pas refusé");
  await bloc.getByRole("radiogroup", { name: "Note globale" }).getByTestId("etoile-5").tap();
  await bloc.getByTestId("membre-equipe").nth(0).getByTestId("etoile-5").tap();
  await bloc.getByTestId("membre-equipe").nth(1).getByTestId("etoile-4").tap();
  await c.page.locator("#avis-commentaire").fill("Équipe souriante et très professionnelle");
  await bloc.getByTestId("reprendre-equipe").check();
  await bloc.getByTestId("envoyer-avis").tap(); await c.page.waitForTimeout(1200);
  verifier(await c.page.getByTestId("avis-merci").isVisible() && await c.page.getByTestId("avis-google").getAttribute("href") === "https://g.page/r/heavent-test/review", "pas de remerciement ni de lien vers Google après une bonne note");
  verifier(base.devis[0].avis_note === 5 && base.devis[0].reprendre_equipe && base.evaluations_crew.length === 2, "l'avis n'est pas enregistré");
  await c.page.screenshot({ path: `${CAPTURES}/20-avis-client.png`, fullPage: true });
  verifier(!c.erreurs.length, "erreurs JavaScript côté client : " + c.erreurs.join(" ; "));
  await c.ctx.close();
  notes.push("la cliente note l'événement (5/5) et ses 2 hôtesses (5 et 4), demande la même équipe, puis on lui propose Google");

  const { page, ctx, erreurs } = await contexte(navigateur, base, ADMIN);
  page.on("dialog", (d) => d.accept());
  await connecter(page, BASE, ADMIN, "/admin");
  await page.getByRole("tab", { name: /Devis$/ }).first().click(); await page.waitForTimeout(800);
  await page.getByText("Henné Yasmine").first().click(); await page.waitForTimeout(1800);
  await page.getByTestId("reprendre-equipe-admin").click(); await page.getByRole("option", { name: /DEV-2026-0160/ }).click(); await page.waitForTimeout(2500);
  const nouvelles = base.affectations.filter((a) => a.devis_id === "dv7").map((a) => a.staff_id).sort();
  verifier(nouvelles.length === 2 && nouvelles.join() === [s1.id, s2.id].sort().join(), "l'équipe précédente n'est pas reprise : " + JSON.stringify(nouvelles));
  verifier(await page.getByText("5.0").count() && await page.getByText("4.0").count(), "les notes des crews ne s'affichent pas dans l'équipe");
  await page.getByRole("tab", { name: "Mes devis" }).click(); await page.waitForTimeout(500);
  await page.getByText("Mariage Yasmine").first().click(); await page.waitForTimeout(1500);
  verifier(/5\/5/.test(await page.getByTestId("avis-client-admin").innerText()) && /même équipe/.test(await page.getByTestId("avis-client-admin").innerText()), "l'avis du client n'apparaît pas dans le devis");
  verifier(!erreurs.length, "erreurs JavaScript : " + erreurs.join(" ; "));
  await ctx.close();
  notes.push("admin : avis 5/5 visible dans le devis, notes ★ des crews, équipe reprise en 1 clic sur le nouveau devis du même client");
});

// 3 septendecies. Espace mariés
await scenario("Espace mariés : check-list, budget, programme, invités qui répondent en ligne, plan de table, vue agence", async (notes) => {
  const base = nouvelleBase();
  const dans60 = new Date(Date.now() + 60 * 864e5).toISOString().slice(0, 10);
  const TOKEN = "77777777-8888-9999-aaaa-bbbbbbbbbbbb";
  base.devis = [
    { id: "dvm", numero: "DEV-2026-0180", type: "mariage", marque: "heavent", client_nom: "Salma Idrissi", client_email: "salma@example.com", titre: "Mariage Salma", statut: "accepte", total_ttc: 30000, remise_globale_pct: 0, taux_tva: 20, acompte_pct: 50, date_emission: "2026-10-01", date_validite: "2099-12-31", date_evenement: dans60, lieu: "Palais Rabat", lien_token: TOKEN, signe_le: "2026-10-02T10:00:00Z", relances: 0 },
  ];
  base.devis_lignes = [{ id: "lm", devis_id: "dvm", ordre: 0, designation: "Hôtesses", description: null, quantite: 4, duree: 6, unite: "heure", prix_unitaire: 150, remise_pct: 0 }];

  const c = await contexte(navigateur, base, "salma@example.com", { mobile: true });
  c.page.on("dialog", (d) => d.accept());
  await c.page.goto(`${BASE}/mon-devis/${TOKEN}`); await c.page.evaluate(() => sessionStorage.setItem("heavent-splash-vu", "1")); await c.page.reload(); await c.page.waitForTimeout(1500);
  await c.page.getByTestId("lien-espace-maries").tap(); await c.page.waitForTimeout(1800);
  verifier(await c.page.getByTestId("espace-maries").isVisible(), "l'espace mariés ne s'ouvre pas depuis le devis");
  verifier(/\b(59|60)\b/.test(await c.page.getByTestId("compte-a-rebours").innerText()), "le compte à rebours est faux");
  await c.page.getByTestId("noms-maries").fill("Salma & Youssef");
  // Check-list : modèle pré-rempli, cocher une tâche, en ajouter une
  const taches = c.page.getByTestId("checklist").getByRole("button", { name: "Marquer comme fait" });
  verifier(await taches.count() >= 15, "la check-list n'est pas pré-remplie");
  await taches.first().tap();
  await c.page.getByTestId("nouvelle-tache-1m").fill("Choisir les dragées"); await c.page.getByTestId("nouvelle-tache-1m").press("Enter");
  // Budget
  await c.page.getByTestId("onglet-budget").tap();
  await c.page.getByTestId("budget-total").fill("100000");
  const montants = c.page.getByTestId("budget").locator("tbody tr").first().locator("input[inputmode=decimal]");
  await montants.nth(0).fill("40000"); await montants.nth(2).fill("10000");
  verifier(/40\s000/.test(await c.page.getByTestId("budget-engage").innerText()), "le budget engagé n'est pas calculé");
  // Programme
  await c.page.getByTestId("onglet-programme").tap();
  verifier(await c.page.getByTestId("programme").locator("li").count() >= 6, "le programme du jour J n'est pas pré-rempli");
  // Invités
  await c.page.getByTestId("onglet-invites").tap();
  for (const [nom, nb] of [["Famille Benali", "4"], ["Karim Alaoui", "2"], ["Nadia Tazi", "1"]]) {
    await c.page.getByTestId("invite-nom").fill(nom); await c.page.getByTestId("invite-nb").fill(nb); await c.page.getByTestId("ajouter-invite").tap(); await c.page.waitForTimeout(400);
  }
  verifier(base.invites_mariage.length === 3, "les invités ne sont pas enregistrés");
  const wa = await c.page.getByRole("link", { name: /Envoyer l'invitation à Famille Benali/ }).getAttribute("href");
  verifier(decodeURIComponent(wa).includes(`/rsvp/${base.invites_mariage[0].jeton}`) && decodeURIComponent(wa).includes("Salma & Youssef"), "le message WhatsApp ne contient pas le lien personnel");
  await c.page.waitForTimeout(1200);
  const e = base.espace_maries[0];
  verifier(e.noms === "Salma & Youssef" && e.budget_total === 100000 && e.checklist.some((t) => t.titre === "Choisir les dragées") && e.checklist.filter((t) => t.fait).length === 1, "l'espace n'est pas enregistré automatiquement : " + JSON.stringify({ noms: e.noms, total: e.budget_total }));
  await c.ctx.close();

  // L'invité répond depuis son lien
  const g = await contexte(navigateur, base, null, { mobile: true });
  await g.page.goto(`${BASE}/rsvp/${base.invites_mariage[0].jeton}`); await g.page.waitForTimeout(1500);
  verifier(/Salma & Youssef/.test(await g.page.getByTestId("rsvp-noms").innerText()), "la page invité n'affiche pas les mariés");
  verifier(!(await g.page.locator("header").count()), "la page invité affiche le menu du site");
  await g.page.getByTestId("rsvp-oui").tap();
  await g.page.getByRole("button", { name: "-" }).tap();
  await g.page.locator("textarea").fill("Un enfant allergique aux fruits à coque");
  await g.page.getByTestId("rsvp-envoyer").tap(); await g.page.waitForTimeout(800);
  verifier(await g.page.getByTestId("rsvp-merci").isVisible(), "pas de confirmation pour l'invité");
  verifier(base.invites_mariage[0].reponse === "oui" && base.invites_mariage[0].nb_confirmes === 3, "la réponse de l'invité n'est pas enregistrée");
  await g.page.screenshot({ path: `${CAPTURES}/22-rsvp-invite.png`, fullPage: true });
  await g.page.goto(`${BASE}/rsvp/${base.invites_mariage[1].jeton}`); await g.page.waitForTimeout(1200);
  await g.page.getByTestId("rsvp-non").tap(); await g.page.getByTestId("rsvp-envoyer").tap(); await g.page.waitForTimeout(600);
  verifier(!g.erreurs.length, "erreurs JavaScript (invité) : " + g.erreurs.join(" ; "));
  await g.ctx.close();

  // Plan de table
  const c2 = await contexte(navigateur, base, "salma@example.com");
  await c2.page.goto(`${BASE}/mon-mariage/${TOKEN}`); await c2.page.evaluate(() => sessionStorage.setItem("heavent-splash-vu", "1")); await c2.page.reload(); await c2.page.waitForTimeout(1500);
  verifier(/3 \/ 4/.test(await c2.page.getByText("Invités confirmés").locator("..").innerText()), "le résumé des invités confirmés est faux");
  await c2.page.getByTestId("onglet-tables").click();
  await c2.page.getByTestId("table-nom").fill("Table d'honneur"); await c2.page.getByTestId("ajouter-table").click(); await c2.page.waitForTimeout(900);
  const options = await c2.page.getByTestId("placer-invite").locator("option").allInnerTexts();
  verifier(!options.some((o) => o.includes("Karim")), "un invité absent est proposé au plan de table");
  await c2.page.getByTestId("placer-invite").selectOption({ label: "Famille Benali (3)" }); await c2.page.waitForTimeout(800);
  verifier(/3\/10/.test(await c2.page.getByTestId("table-carte").innerText()) && base.invites_mariage[0].table_id === base.espace_maries[0].tables[0].id, "l'invité n'est pas placé à la table");
  await c2.page.screenshot({ path: `${CAPTURES}/23-plan-de-table.png`, fullPage: true });
  verifier(!c2.erreurs.length, "erreurs JavaScript (mariés) : " + c2.erreurs.join(" ; "));
  await c2.ctx.close();

  // Vue agence
  const { page, ctx, erreurs } = await contexte(navigateur, base, ADMIN);
  await connecter(page, BASE, ADMIN, "/admin");
  await page.getByRole("tab", { name: /Devis$/ }).first().click(); await page.waitForTimeout(800);
  await page.getByText("Mariage Salma").first().click(); await page.waitForTimeout(1800);
  const vue = await page.getByTestId("espace-maries-admin").innerText();
  verifier(/3\s*personnes confirmées/.test(vue) && /Entrée des mariés/.test(vue) && /allergique/.test(vue), "l'agence ne voit pas l'espace mariés : " + vue.slice(0, 200));
  verifier(!erreurs.length, "erreurs JavaScript (admin) : " + erreurs.join(" ; "));
  await ctx.close();
  notes.push("mariés : check-list pré-remplie, budget 40 000 / 100 000, programme, 3 invités avec lien WhatsApp personnel ; invité : réponse « oui, 3 personnes » + allergie, un autre « non » ; plan de table sans les absents ; agence : résumé, programme et remarques dans le devis");
});

// 3 duodevicies. Statistiques de fréquentation
await scenario("Statistiques : visites, provenance, clics WhatsApp et demandes comptés sans cookie, visibles dans le Bilan", async (notes) => {
  const base = nouvelleBase();
  const v = await contexte(navigateur, base, null, { mobile: true });
  await v.page.addInitScript(() => { window.__suiviTest = true; sessionStorage.setItem("heavent-splash-vu", "1"); });
  await v.page.goto(`${BASE}/?utm_source=instagram`); await v.page.waitForTimeout(1500);
  await v.page.goto(`${BASE}/hotesses-casablanca`); await v.page.waitForTimeout(2200);
  const wa = v.page.locator('a[href*="wa.me"]').first();
  await wa.evaluate((a) => { a.removeAttribute("target"); a.setAttribute("href", "#whatsapp-test-wa.me"); });
  await wa.click(); await v.page.waitForTimeout(800);
  const cookies = await v.ctx.cookies();
  const ev = base.evenements_site ?? [];
  verifier(ev.filter((e) => e.type === "vue").length >= 2 && ev.every((e) => e.source === "instagram" && e.appareil === "mobile"), "les visites ne sont pas comptées avec la bonne provenance : " + JSON.stringify(ev.slice(0, 3)));
  verifier(ev.some((e) => e.type === "clic" && e.nom === "whatsapp" && e.chemin === "/hotesses-casablanca"), "le clic WhatsApp n'est pas compté");
  verifier(!cookies.some((c) => /heavent|hv-/.test(c.name)), "un cookie de suivi a été posé");
  const avant = ev.length;
  await v.page.goto(`${BASE}/mon-devis/00000000-0000-0000-0000-000000000000`); await v.page.waitForTimeout(1200);
  verifier((base.evenements_site ?? []).length === avant, "une page privée (devis client) a été comptée");
  await v.ctx.close();

  const { page, ctx, erreurs } = await contexte(navigateur, base, ADMIN);
  await page.addInitScript(() => { window.__suiviTest = true; });
  await connecter(page, BASE, ADMIN, "/admin");
  await page.getByRole("tab", { name: /Statistiques$/ }).click();
  await page.getByTestId("stat-visites").waitFor({ timeout: 8000 }).catch(() => {});
  if (!(await page.getByTestId("stat-visites").count())) { // relance (premier chargement de l'admin parfois lent)
    await page.getByRole("tab", { name: /Bilan$/ }).click(); await page.getByRole("tab", { name: /Statistiques$/ }).click();
    await page.getByTestId("stat-visites").waitFor({ timeout: 10000 }).catch(() => {});
  }
  const bloc = await page.getByTestId("stats-site").innerText();
  verifier(/Visites\s*1/i.test(bloc) && /Instagram/.test(bloc) && /WhatsApp/.test(bloc) && /Hôtesses à Casablanca/.test(bloc), "le Bilan n'affiche pas les statistiques : " + bloc.slice(0, 300));
  const nAvant = base.evenements_site.length;
  await page.goto(`${BASE}/`); await page.waitForTimeout(1500);
  verifier(base.evenements_site.length === nAvant, "les visites de l'administratrice sont comptées");
  await page.goto(`${BASE}/admin`); await page.waitForTimeout(2000);
  await page.getByRole("tab", { name: /Statistiques$/ }).click(); await page.waitForTimeout(1200);
  await page.getByTestId("stats-site").screenshot({ path: `${CAPTURES}/24-statistiques.png` });
  verifier(!erreurs.length, "erreurs JavaScript : " + erreurs.join(" ; "));
  await ctx.close();
  notes.push("visite venue d'Instagram sur smartphone : 2 pages + clic WhatsApp comptés, aucun cookie, page devis privée ignorée ; Bilan admin : visites, provenance, pages, clics ; visites de l'admin non comptées");
});

// 3 undevicies. Cohérence des boutons : rien de légal ne se supprime, l'annulation libère l'équipe
await scenario("Cohérence : devis signé/facturé archivable (pas supprimable), annulation qui libère l'équipe, contrat signé annulé, crew avec paie non supprimable", async (notes) => {
  const base = nouvelleBase();
  const [s1, s2] = base.staff;
  const dans10 = new Date(Date.now() + 10 * 864e5).toISOString().slice(0, 10);
  const L = (x) => ({ type: "entreprise", marque: "heavent", remise_globale_pct: 0, taux_tva: 20, acompte_pct: 50, date_emission: "2026-10-01", date_validite: "2099-12-31", relances: 0, devise: "MAD", ...x });
  base.devis = [
    L({ id: "dvA", numero: "DEV-2026-0012", client_nom: "nadir nadir", client_societe: "BARAKA motor", titre: "Prestation : Autre", statut: "annule", total_ttc: 10800, signe_le: "2026-10-19T09:00:00Z", lien_token: "aaaaaaaa-1111-2222-3333-444444444444", date_evenement: "2026-10-19" }),
    L({ id: "dvB", numero: "DEV-2026-0013", client_nom: "Brouillon Test", titre: "Brouillon", statut: "brouillon", total_ttc: 1000, lien_token: crypto.randomUUID() }),
    L({ id: "dvC", numero: "DEV-2026-0014", client_nom: "Salon Atlas", titre: "Salon Atlas", statut: "accepte", total_ttc: 9000, signe_le: "2026-10-10T09:00:00Z", lien_token: crypto.randomUUID(), date_evenement: dans10 }),
  ];
  base.factures = [{ id: "fA", devis_id: "dvA", numero: "FAC-2026-0001", type: "acompte", statut: "payee", net_a_payer: 5400, total_ttc: 5400, devise: "MAD", date_emission: "2026-10-19", client_nom: "BARAKA motor" }];
  base.affectations = [s1, s2].map((s, i) => ({ id: "afC" + i, devis_id: "dvC", staff_id: s.id, date_jour: dans10, heure_debut: "09:00:00", heure_fin: "17:00:00", heures: 8, poste: "Hôtesse", taux_horaire: 60, statut: "confirme" }));
  base.contrats = [
    { id: "ctC0", devis_id: "dvC", staff_id: s1.id, titre: "Hôtesse", statut: "actif", signe_le: "2026-10-11T10:00:00Z", date_debut: dans10, date_fin: dans10, dates: [{ date: dans10, heures: 8 }], total_heures: 8, salaire_brut: 480 },
    { id: "ctC1", devis_id: "dvC", staff_id: s2.id, titre: "Hôtesse", statut: "actif", signe_le: null, date_debut: dans10, date_fin: dans10, dates: [{ date: dans10, heures: 8 }], total_heures: 8, salaire_brut: 480 },
  ];
  base.fiches_paie = [{ id: "fp1", staff_id: s1.id, annee: 2026, mois: 9, statut: "payee", salaire_brut: 480, salaire_net: 450, heures_travaillees: 8, generee_auto: true }];

  const { page, ctx, erreurs } = await contexte(navigateur, base, ADMIN);
  const dialogues = []; page.on("dialog", (d) => { dialogues.push(d.message()); d.accept(); });
  await connecter(page, BASE, ADMIN, "/admin");
  await page.getByRole("tab", { name: /Devis$/ }).first().click(); await page.waitForTimeout(1000);
  const ligne = (t) => page.locator("tr", { hasText: t });
  verifier(!(await ligne("BARAKA motor").getByTestId("supprimer-devis").count()) && await ligne("BARAKA motor").getByTestId("archiver-devis").count(), "le devis signé et facturé propose encore « Supprimer »");
  verifier(await ligne("Brouillon Test").getByTestId("supprimer-devis").count(), "le brouillon ne peut pas être supprimé");
  // Statuts proposés pour un devis signé : seulement Accepté / Annulé
  await ligne("Salon Atlas").getByRole("combobox").click(); await page.waitForTimeout(200);
  const options = (await page.getByRole("option").allInnerTexts()).map((x) => x.trim());
  verifier(options.join() === "Accepté,Annulé", "statuts proposés pour un devis signé : " + options.join());
  // Annulation : l'équipe est libérée, le contrat non signé disparaît, le contrat signé est annulé
  await page.getByRole("option", { name: "Annulé" }).click(); await page.waitForTimeout(800);
  verifier(dialogues.some((m) => /2 personnes de l'équipe seront libérées/.test(m)), "pas d'avertissement avant d'annuler un devis avec une équipe : " + dialogues.join(" | "));
  verifier(base.affectations.every((a) => a.statut === "annule") && base.contrats.every((c) => c.statut === "annule"), "l'annulation n'a pas libéré l'équipe");
  await ligne("Salon Atlas").click(); await page.waitForTimeout(1500);
  verifier(await page.getByTestId("equipe-liberee").isVisible(), "le devis annulé propose encore de constituer une équipe");
  // Archiver le devis BARAKA
  await page.getByRole("tab", { name: "Mes devis" }).click(); await page.waitForTimeout(500);
  await ligne("BARAKA motor").getByTestId("archiver-devis").click(); await page.waitForTimeout(800);
  verifier(base.devis.find((d) => d.id === "dvA").archive === true && !(await ligne("BARAKA motor").count()), "le devis archivé reste dans la liste");
  // Supprimer le brouillon
  await ligne("Brouillon Test").getByTestId("supprimer-devis").click(); await page.waitForTimeout(800);
  verifier(!base.devis.some((d) => d.id === "dvB"), "le brouillon n'est pas supprimé");
  // Crew avec fiche de paie : bouton supprimer désactivé
  await page.getByRole("tab", { name: /Personnel$/ }).click(); await page.waitForTimeout(1000);
  const btn = page.locator("tr", { hasText: s1.nom }).locator("button[title*='Contrats signés']");
  verifier(await btn.count() && await btn.first().isDisabled(), "on peut encore supprimer un crew qui a des fiches de paie");
  verifier(!erreurs.length, "erreurs JavaScript : " + erreurs.join(" ; "));
  await ctx.close();

  // Page client d'un devis annulé : consultable, mention « annulé », factures disponibles, pas de signature
  const c = await contexte(navigateur, base, null);
  await c.page.goto(`${BASE}/mon-devis/aaaaaaaa-1111-2222-3333-444444444444`); await c.page.evaluate(() => sessionStorage.setItem("heavent-splash-vu", "1")); await c.page.reload(); await c.page.waitForTimeout(1500);
  verifier(await c.page.getByTestId("statut-annule").isVisible() && await c.page.getByTestId("devis-annule").isVisible() && await c.page.getByTestId("mes-factures").isVisible(), "la page client d'un devis annulé n'affiche pas l'annulation et les factures");
  verifier(!(await c.page.getByTestId("bloc-signature").count()), "un devis annulé peut encore être signé");
  await c.ctx.close();
  notes.push("devis signé+facturé : « Archiver » au lieu de « Supprimer » ; signé : statuts Accepté/Annulé seulement ; annulation avec avertissement → équipe libérée, contrat signé annulé ; crew avec paie non supprimable ; page client « annulé » avec ses factures");
});

// 3 sexdecies. Confiance + pages villes / services
await scenario("Site : éléments de confiance réglés dans l'admin, témoignage publié, pages villes et services", async (notes) => {
  const base = nouvelleBase();
  base.devis = [{ id: "dv8", numero: "DEV-2026-0180", type: "mariage", client_nom: "Salma Idrissi", titre: "Mariage à Rabat", statut: "accepte", total_ttc: 1000, avis_note: 5,
    avis_commentaire: "Une équipe adorable et très professionnelle", avis_publiable: true, lien_token: crypto.randomUUID(), date_emission: "2026-09-01" }];
  const { page, ctx, erreurs } = await contexte(navigateur, base, ADMIN);
  await connecter(page, BASE, ADMIN, "/admin");
  await page.getByRole("tab", { name: /Site$/ }).click(); await page.waitForTimeout(1200);
  await page.getByTestId("vitrine-annees").fill("10");
  await page.getByTestId("vitrine-google-note").fill("4,9");
  await page.getByTestId("engagement-remplacement").click();
  await page.getByTestId("enregistrer-vitrine").click(); await page.waitForTimeout(1000);
  verifier(base.vitrine[0].annees_experience === 10 && base.vitrine[0].google_note === 4.9 && base.vitrine[0].engagement_remplacement && !base.vitrine[0].engagement_cnss, "les éléments de confiance ne sont pas enregistrés : " + JSON.stringify(base.vitrine[0]));
  await page.getByTestId("publier-avis").click(); await page.waitForTimeout(1000);
  verifier(base.temoignages.length === 1 && base.temoignages[0].auteur === "Salma I." && base.temoignages[0].publie, "l'avis du client n'est pas publié en témoignage : " + JSON.stringify(base.temoignages));
  verifier(!erreurs.length, "erreurs JavaScript : " + erreurs.join(" ; "));
  await ctx.close();
  notes.push("admin → Site : 10 ans, 4,9 sur Google, « remplacement garanti » coché ; l'avis 5★ de Salma publié en un clic (« Salma I. »)");

  const c = await contexte(navigateur, base, "visiteur@example.com", { mobile: true });
  await c.page.goto(`${BASE}/`); await c.page.evaluate(() => sessionStorage.setItem("heavent-splash-vu", "1")); await c.page.reload(); await c.page.waitForTimeout(1500);
  await c.page.getByRole("link", { name: /Hôtesses à Casablanca/ }).first().click(); await c.page.waitForTimeout(1500);
  verifier(c.page.url().endsWith("/hotesses-casablanca") && /Hôtesses et stewards à Casablanca/.test(await c.page.locator("h1").innerText()), "la page Casablanca ne s'ouvre pas depuis l'accueil");
  verifier(/4,9\/5/.test(await c.page.getByTestId("note-google").first().innerText()), "la note Google n'apparaît pas");
  const eng = await c.page.getByTestId("engagements").innerText();
  verifier(/Remplacement garanti/.test(eng) && !/CNSS/.test(eng), "les engagements affichés ne correspondent pas aux cases cochées");
  verifier(/Salma I\./.test(await c.page.getByTestId("temoignages").innerText()), "le témoignage n'apparaît pas");
  const faq = await c.page.getByTestId("faq").innerText();
  verifier(/plusieurs jours de salon/.test(faq) && /acompte/.test(faq), "la FAQ (page + agence) est incomplète");
  verifier(await c.page.locator('script[type="application/ld+json"]').count() >= 3, "les données structurées (service, FAQ, fil d'Ariane) manquent");
  const largeur = await c.page.evaluate(() => document.documentElement.scrollWidth);
  verifier(largeur <= 392, `la page déborde sur smartphone (${largeur} px)`);
  await c.page.screenshot({ path: `${CAPTURES}/21-page-casablanca.png`, fullPage: true });
  await c.page.goto(`${BASE}/organisation-mariage`); await c.page.waitForTimeout(1500);
  verifier(/Organisation de votre mariage/.test(await c.page.locator("h1").innerText()) && await c.page.getByTestId("pied-villes-services").count(), "la page service ou les liens du pied de page manquent");
  verifier(!c.erreurs.length, "erreurs JavaScript : " + c.erreurs.join(" ; "));
  await c.ctx.close();
  notes.push("accueil → « Hôtesses à Casablanca » : note Google, engagement coché, témoignage, FAQ, données Google ; page « Organisation de mariage » et liens du pied de page");
});

// 3 sexies. Paie : une fiche dont toutes les missions ont été supprimées disparaît au recalcul
await scenario("Paie : « Calculer le mois » retire les fiches sans mission (jamais les fiches payées)", async (notes) => {
  const base = nouvelleBase();
  const [a, b, c] = base.staff;
  const m = new Date(); const annee = m.getFullYear(), mois = m.getMonth() + 1;
  const jour = `${annee}-${String(mois).padStart(2, "0")}-10`;
  const fiche = (id, staff_id, statut) => ({ id, staff_id, mois, annee, heures_travaillees: 7, salaire_brut: 420, cnss: 18.82, amo: 9.49, deductions: 28.31, prime: 0, salaire_net: 391.69, statut, generee_auto: true, details: [] });
  base.fiches_paie.push(fiche("orpheline", a.id, "en_attente"), fiche("payee", b.id, "payee"), fiche("avec-contrat", c.id, "en_attente"));
  base.contrats.push({ id: "cm", staff_id: c.id, devis_id: null, titre: "Hôtesse", statut: "actif", date_debut: jour, date_fin: jour, taux_horaire: 60, total_heures: 7, salaire_brut: 420, dates: [{ date: jour, heures: 7 }] });
  const { page, ctx, erreurs } = await contexte(navigateur, base, ADMIN);
  await connecter(page, BASE, ADMIN, "/admin");
  await page.getByRole("tab", { name: /Paie$/ }).click(); await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Calculer le mois" }).click(); await page.waitForTimeout(1500);
  const ids = base.fiches_paie.map((f) => f.id);
  verifier(!ids.includes("orpheline"), "la fiche sans mission est toujours là");
  verifier(ids.includes("payee"), "une fiche payée a été supprimée !");
  verifier(ids.includes("avec-contrat"), "une fiche avec un contrat du mois a été supprimée !");
  notes.push("fiche sans mission retirée ; fiche payée et fiche avec contrat conservées");
  verifier(!erreurs.length, "erreurs JavaScript : " + erreurs.join(" ; "));
  await ctx.close();
});

// 3 septies. Demande venue du jeu → devis complet en un clic, aux prix du catalogue
await scenario("Admin : demande du jeu → devis ligne par ligne aux prix du catalogue", async (notes) => {
  const base = nouvelleBase();
  base.devis_mariage = [{ id: "jeu1", nom: "Salma", prenom: "", email: "salma@example.com", type_evenement: "Mariage", date_mariage: "2026-12-12", lieu: "Rabat", nb_invites: 100,
    services: "DJ / Animation musicale, Décoration, Traiteur", remarques: "Demande créée avec le jeu", statut: "en_attente", created_at: "2026-10-18T12:00:00Z",
    configuration: { version: 1, type: "mariage", invites: 100, elements: { table_ronde: 10, dj: 1, buffet: 1, arche: 1, objet_libre: 2 }, centres: 10, libelles: { honneur: "Table d'honneur", objet_libre: "Objet sur mesure" },
      sur_mesure: [{ nom: "Calèche dorée", quantite: 1 }, { nom: "Feu d'artifice", quantite: 1 }] } }];
  base.catalogue_prestations = [...base.catalogue_prestations,
    { id: "j1", categorie: "decoration", designation: "Table ronde 10 places", description: "Chaises et nappe comprises", unite: "unite", prix_unitaire: 450, actif: true, ordre: 40, jeu_element: "table_ronde" },
    { id: "j2", categorie: "mariage", designation: "DJ / animation musicale", description: null, unite: "forfait", prix_unitaire: 12000, actif: true, ordre: 22, jeu_element: "dj" },
    { id: "j3", categorie: "mariage", designation: "Traiteur mariage (menu complet)", description: null, unite: "personne", prix_unitaire: 450, actif: true, ordre: 20, jeu_element: "buffet" },
    { id: "j4", categorie: "decoration", designation: "Arche décorative", description: null, unite: "forfait", prix_unitaire: 4500, actif: true, ordre: 43, jeu_element: "arche" },
    { id: "j5", categorie: "decoration", designation: "Centre de table", description: null, unite: "unite", prix_unitaire: 180, actif: true, ordre: 45, jeu_element: "centres" }];
  const { page, ctx, erreurs } = await contexte(navigateur, base, ADMIN);
  await connecter(page, BASE, ADMIN, "/admin");
  await page.getByRole("tab", { name: /Devis$/ }).first().click(); await page.waitForTimeout(800);
  verifier(await page.getByText(/Créé avec le jeu/).count(), "la demande du jeu n'est pas signalée");
  await page.getByRole("button", { name: /Faire le devis/ }).first().click(); await page.waitForTimeout(1000);
  const valeurs = await page.getByPlaceholder(/Désignation/).evaluateAll((els) => els.map((e) => e.value));
  for (const d of ["Table ronde 10 places", "DJ / animation musicale", "Traiteur mariage (menu complet)", "Arche décorative", "Centre de table", "Calèche dorée", "Feu d'artifice"]) verifier(valeurs.includes(d), `ligne manquante : ${d}`);
  verifier(!valeurs.some((v) => /Objet sur mesure/.test(v)), "l'objet sur mesure apparaît aussi comme « sans prix au catalogue »");
  const texte = (await page.locator("body").innerText()).replace(/\s/g, "");
  // 10×450 + 12000 + 100×450 + 4500 + 10×180 = 67 800 HT
  verifier(texte.includes("67800,00"), "total HT attendu 67 800 MAD (prix du catalogue × quantités)");
  await page.screenshot({ path: `${CAPTURES}/7-devis-depuis-jeu.png`, fullPage: true });
  notes.push("5 lignes au prix du catalogue (total HT 67 800 MAD) + 2 idées sur mesure du client (« Calèche dorée », « Feu d'artifice ») à 0, prix à renseigner");
  verifier(!erreurs.length, "erreurs JavaScript : " + erreurs.join(" ; "));
  await ctx.close();
});

// 3 octies. Bouton WhatsApp : sur les pages publiques, jamais dans l'admin
// Cadeau : accueil personnel d'Imane (surprise une seule fois, mot du jour, célébration, bilan du mois, réponses WhatsApp)
await scenario("Cadeau : surprise de bienvenue, mot du jour de Yassin, célébration d'une signature, bilan du mois, réponses WhatsApp", async (notes) => {
  const IMANE = "i.chaigari@heaventagency.com";
  const base = nouvelleBase();
  base.admins.push({ email: IMANE });
  const hier = new Date(Date.now() - 864e5).toISOString();
  base.admin_profils = [{ email: IMANE, prenom: "Imane", recoit_mots: true, surprise_vue_le: null, signatures_vues_jusqu_au: hier, records_vus: [] },
    { email: ADMIN, prenom: "Yassin", recoit_mots: false, surprise_vue_le: null, signatures_vues_jusqu_au: hier, records_vus: [] }];
  base.mot_du_jour = "Rien n'est impossible pour une femme qui a réussi à me rendre patient. 😄";
  base.surprise = { titre: "Pour toi, Imane", texte: "Premier paragraphe.\n\nDeuxième paragraphe.", signature: "Yassin" };
  base.devis.push({ id: "sg1", numero: "DEV-77", client_nom: "Salma Bennani", client_societe: null, titre: "Mariage Salma & Karim", statut: "accepte", total_ttc: 48000,
    date_emission: new Date().toISOString().slice(0, 10), signe_le: new Date().toISOString(), date_evenement: "2026-12-12", relances: 0, archive: false });
  const { page, ctx, erreurs } = await contexte(navigateur, base, IMANE, { mobile: true });
  await connecter(page, BASE, IMANE, "/admin");
  const surprise = page.getByTestId("surprise-bienvenue");
  verifier(await surprise.count(), "la surprise de bienvenue ne s'affiche pas");
  await page.getByTestId("ouvrir-surprise").click(); await page.waitForTimeout(800);
  verifier(/Pour toi, Imane/.test(await surprise.innerText()) && /Deuxième paragraphe/.test(await surprise.innerText()), "la lettre n'apparaît pas");
  await page.getByTestId("fermer-surprise").click({ timeout: 15000 }); await page.waitForTimeout(4500);
  verifier(!(await surprise.count()) && base.admin_profils[0].surprise_vue_le, "la surprise ne se ferme pas ou n'est pas marquée comme vue");
  const carte = await page.getByTestId("carte-accueil").innerText();
  verifier(/Imane/.test(carte) && /me rendre patient/.test(carte) && /Yassin/.test(carte), "accueil au prénom ou mot du jour manquant : " + carte.slice(0, 200));
  const celeb = page.getByTestId("celebration");
  verifier(/Salma Bennani a signé/.test(await celeb.innerText()), "la signature n'est pas célébrée");
  await celeb.getByRole("button", { name: /Bravo à moi/ }).click(); await page.waitForTimeout(600);
  verifier(!(await celeb.count()) && base.admin_profils[0].signatures_vues_jusqu_au > hier, "la célébration ne se ferme pas");
  await page.getByTestId("ouvrir-bilan-mois").click(); await page.waitForTimeout(1500);
  const bilan = await page.getByTestId("bilan-mois").innerText();
  verifier(/Ton mois en chiffres/.test(bilan) && /48\s000 MAD/.test(bilan.replace(/\u202f|\u00a0/g, " ")), "bilan du mois incomplet : " + bilan.slice(0, 300));
  await page.keyboard.press("Escape"); await page.waitForTimeout(400);
  notes.push("1re connexion d'Imane : enveloppe → lettre signée Yassin → merci ; accueil « Imane » + mot du jour ; « Salma Bennani a signé ! » avec confettis ; bilan du mois 48 000 MAD");
  // Rechargement : plus de surprise ni de célébration déjà vue
  await page.reload(); await page.waitForTimeout(2500);
  verifier(!(await page.getByTestId("surprise-bienvenue").count()) && !(await page.getByTestId("celebration").count()), "la surprise ou la célébration revient après rechargement");
  // Réponses WhatsApp prêtes sur une demande
  await page.getByRole("tab", { name: /Devis$/ }).first().click(); await page.waitForTimeout(1000);
  await page.getByTestId("reponses-whatsapp").first().click(); await page.waitForTimeout(400);
  verifier(await page.getByTestId("modeles-whatsapp").count(), "les réponses WhatsApp ne s'ouvrent pas");
  await page.getByText("Bien reçu").click(); await page.waitForTimeout(300);
  const texte = await page.getByTestId("texte-whatsapp").inputValue();
  verifier(/^Bonjour .+,/.test(texte) && /Imane — Heavent People Agency/.test(texte), "message WhatsApp mal rempli : " + texte);
  await page.evaluate(() => { window.open = (u) => { window.__ouvert = u; return null; }; });
  await page.getByTestId("ouvrir-whatsapp").click(); await page.waitForTimeout(300);
  const lienWa = await page.evaluate(() => window.__ouvert);
  verifier(/^https:\/\/wa\.me\/212\d+\?text=Bonjour/.test(lienWa || ""), "WhatsApp ne s'ouvre pas sur le bon numéro : " + lienWa);
  notes.push("rechargement : rien ne réapparaît ; « Répondre sur WhatsApp » → « Bien reçu » signé Imane, ouvert sur wa.me/212…");
  verifier(!erreurs.length, "erreurs JavaScript : " + erreurs.join(" ; "));
  await ctx.close();
  // Yassin : accueil au prénom, sans mot du jour ni surprise
  const y = await contexte(navigateur, base, ADMIN);
  await connecter(y.page, BASE, ADMIN, "/admin");
  verifier(!(await y.page.getByTestId("surprise-bienvenue").count()) && !(await y.page.getByTestId("mot-du-jour").count()) && /Yassin/.test(await y.page.getByTestId("carte-accueil").innerText()), "Yassin ne doit voir ni la surprise ni les mots");
  notes.push("Yassin : simple accueil à son prénom, ni surprise ni mot du jour");
  await y.ctx.close();
});

// Instagram : clé Pixabay, visuels préparés automatiquement, changement de photo et de texte
await scenario("Instagram : clé Pixabay cachée, visuels montés automatiquement (photo + texte + logo), changer de photo", async (notes) => {
  const base = nouvelleBase();
  base.photoTest = readFileSync(new URL("./photo-test.jpg", import.meta.url));
  base.posts_instagram = [
    { id: "p1", date_prevue: "2026-10-21T18:30:00Z", theme: "mariage", accroche: "Conseil mariage", titre: "Les 5 détails que vos invités retiendront (et ce n'est pas le menu)", legende: "Légende 1 #mariage", recherche: "wedding cake", style: "sombre", photo_url: null, visuel_url: null, statut: "brouillon" },
    { id: "p2", date_prevue: "2026-10-23T18:30:00Z", theme: "naissance", accroche: "Baby shower", titre: "Une baby shower inoubliable, sans aucun stress", legende: "Légende 2", recherche: "baby shower balloons", style: "clair", photo_url: null, visuel_url: null, statut: "brouillon" },
  ];
  const { page, ctx, erreurs } = await contexte(navigateur, base, ADMIN);
  await ctx.route("https://pixabay.com/**", (r) => r.fulfill({ status: 200, body: base.photoTest, contentType: "image/jpeg", headers: { "access-control-allow-origin": "*" } }));
  await connecter(page, BASE, ADMIN, "/admin");
  await page.getByRole("tab", { name: /Instagram$/ }).click(); await page.waitForTimeout(1000);
  verifier(await page.getByTestId("carte-post").count() === 2, "les posts ne s'affichent pas");
  await page.getByTestId("cle-pixabay").fill("cle-de-test-123");
  await page.getByRole("button", { name: "Enregistrer" }).click(); await page.waitForTimeout(1200);
  verifier(base.cle_pixabay === "cle-de-test-123" && await page.getByTestId("pixabay-ok").count(), "la clé n'est pas enregistrée");
  verifier(!(await page.getByTestId("cle-pixabay").count()), "la clé ne doit plus être affichée");
  await page.getByTestId("preparer-visuels").click();
  await page.waitForFunction(() => !document.querySelector('[data-testid="preparer-visuels"]'), null, { timeout: 20000 }).catch(() => {});
  await page.waitForTimeout(800);
  verifier(base.posts_instagram.every((p) => p.statut === "pret" && p.visuel_url && p.photo_url), "visuels non préparés : " + JSON.stringify(base.posts_instagram.map((p) => [p.statut, !!p.visuel_url])));
  const visuel = base.fichiers["assets/instagram/visuels/p1.jpg"];
  verifier(visuel && visuel.length > 20000, "le visuel monté n'a pas été enregistré");
  if (process.env.SORTIE) { writeFileSync(process.env.SORTIE + "/visuel-sombre.jpg", visuel); writeFileSync(process.env.SORTIE + "/visuel-clair.jpg", base.fichiers["assets/instagram/visuels/p2.jpg"]); }
  notes.push("clé Pixabay enregistrée puis masquée ; « Préparer les 2 visuels » : photo choisie + montage 1080×1350 enregistré pour chaque post");
  // Modifier un post : nouvelle photo + nouveau texte
  await page.getByTestId("carte-post").first().click(); await page.waitForTimeout(800);
  await page.getByTestId("titre-post").fill("Le plan de table sans stress");
  await page.getByTestId("chercher-photo").click(); await page.waitForTimeout(800);
  verifier(await page.getByTestId("resultats-photos").locator("button").count() === 3, "pas de résultats de recherche");
  await page.getByTestId("resultats-photos").locator("button").nth(1).click(); await page.waitForTimeout(1200);
  verifier(await page.getByTestId("apercu-visuel").count(), "pas d'aperçu du visuel");
  await page.getByTestId("enregistrer-post").click(); await page.waitForTimeout(1500);
  const p1 = base.posts_instagram[0];
  verifier(p1.titre === "Le plan de table sans stress" && /p1-102\.jpg/.test(p1.photo_url) && p1.statut === "pret" && p1.visuel_url, "modification non enregistrée : " + JSON.stringify(p1));
  notes.push("post modifié : texte changé, 2e photo choisie, aperçu en direct, visuel ré-enregistré");
  // Connexion Instagram puis publication immédiate
  await page.getByTestId("editeur-post").getByRole("button", { name: "Fermer" }).last().click(); await page.waitForTimeout(800);
  await page.getByTestId("jeton-instagram").fill("IGJETON-TEST-1234567890");
  await page.getByRole("button", { name: "Connecter" }).click(); await page.waitForTimeout(1200);
  verifier(/@heavent\.agency/.test(await page.getByTestId("instagram-connecte").innerText()), "Instagram non connecté");
  await page.getByTestId("carte-post").nth(1).click(); await page.waitForTimeout(800);
  await page.getByTestId("publier-maintenant").click(); await page.waitForTimeout(1200);
  verifier(base.posts_instagram[1].statut === "publie", "le post n'est pas publié");
  notes.push("Instagram connecté (@heavent.agency), « Publier maintenant » → post publié");
  verifier(!erreurs.length, "erreurs JavaScript : " + erreurs.join(" ; "));
  await ctx.close();
});

// Espace de Nawar : ses mots de papa, sa lettre, et rien des données de l'agence
await scenario("Espace de Nawar : lettre de papa, mot du jour signé Papa, Instagram et statistiques, aucune donnée client", async (notes) => {
  const NAWAR = "nawar@heaventagency.com";
  const base = nouvelleBase();
  base.admin_profils = [{ email: NAWAR, prenom: "Nawar", recoit_mots: true, espace: "nawar", surprise_vue_le: null, signatures_vues_jusqu_au: new Date().toISOString(), records_vus: [] }];
  base.mot_nawar = "Je t'aime plus que les frites. Et tu sais à quel point j'aime les frites. 🍟";
  base.surprise_nawar = { titre: "Pour toi, mon bébé d'amour", texte: "Ma Nawar,\n\nC'est ton espace à toi.", signature: "Papa" };
  base.posts_instagram = [{ id: "p1", date_prevue: "2026-10-21T18:30:00Z", theme: "mariage", accroche: "Conseil", titre: "Titre", legende: "L", recherche: "cake", style: "sombre", photo_url: null, visuel_url: null, statut: "brouillon" }];
  const { page, ctx, erreurs } = await contexte(navigateur, base, NAWAR, { mobile: true });
  await connecter(page, BASE, NAWAR, "/admin");
  verifier(await page.getByTestId("espace-nawar").count(), "l'espace de Nawar ne s'affiche pas (redirection ?) : " + page.url());
  await page.getByTestId("ouvrir-surprise").click(); await page.waitForTimeout(600);
  verifier(/mon bébé d'amour/.test(await page.getByTestId("surprise-bienvenue").innerText()), "la lettre de papa n'apparaît pas");
  await page.getByRole("button", { name: /Merci papa/ }).click({ timeout: 15000 }); await page.waitForTimeout(4500);
  verifier(base.admin_profils[0].surprise_vue_le, "la lettre n'est pas marquée comme lue");
  const carte = await page.getByTestId("carte-mot-papa").innerText();
  verifier(/Nawar/.test(carte) && /frites/.test(carte) && /Papa/.test(carte), "mot du jour manquant : " + carte);
  verifier(!(await page.getByRole("tab", { name: /Devis|Personnel|Paie|Contrats/ }).count()), "Nawar ne doit pas voir les onglets de l'agence");
  await page.getByRole("tab", { name: /Instagram/ }).click(); await page.waitForTimeout(800);
  verifier(await page.getByTestId("carte-post").count() === 1 && !(await page.getByTestId("cle-pixabay").count()) && !(await page.getByTestId("jeton-instagram").count()), "onglet Instagram incorrect pour Nawar");
  await page.getByRole("tab", { name: /Le site/ }).click(); await page.waitForTimeout(1200);
  verifier(await page.getByTestId("stat-visites").count(), "statistiques non visibles");
  notes.push("lettre « Pour toi, mon bébé d'amour » → « Merci papa » ; mot du jour signé Papa ; onglets Mot de papa, Instagram (sans clés), Le site ; aucun onglet client/crew/paie");
  verifier(!erreurs.length, "erreurs JavaScript : " + erreurs.join(" ; "));
  await ctx.close();
});

await scenario("Bouton WhatsApp (pages publiques uniquement, message adapté)", async (notes) => {
  const base = nouvelleBase();
  const { page, ctx } = await contexte(navigateur, base, ADMIN, { mobile: true });
  await page.goto(BASE + "/devis-mariage"); await page.evaluate(() => sessionStorage.setItem("heavent-splash-vu", "1")); await page.reload(); await page.waitForTimeout(800);
  const lien = await page.getByTestId("bouton-whatsapp").getAttribute("href");
  verifier(lien?.startsWith("https://wa.me/212610939655?text=") && decodeURIComponent(lien).includes("mariage"), "lien WhatsApp incorrect : " + lien);
  await connecter(page, BASE, ADMIN, "/admin");
  verifier(!(await page.getByTestId("bouton-whatsapp").count()), "le bouton WhatsApp ne doit pas apparaître dans l'admin");
  notes.push("présent sur /devis-mariage avec message « mariage », absent de l'admin");
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
      const texte = (await page.locator("main").innerText().catch(() => "")).trim();
      verifier(texte.length > 40, `${p} : page vide`);
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
