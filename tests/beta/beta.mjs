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
  await page.getByRole("button", { name: /Devis Nawar/ }).click(); await page.waitForTimeout(800);
  const desig = page.getByPlaceholder(/Désignation/);
  verifier((await desig.first().inputValue()) === "Parfums — bar à parfums Nawar", "la ligne parfums n'est pas en tête");
  verifier(await desig.count() >= 2, "personnel / transport non pré-ajoutés");
  const prix = page.locator("input[type=number]").filter({ has: page.locator("xpath=.") });
  const ligne1 = page.locator(".border.rounded-md.p-3").filter({ has: page.locator('input[value="Parfums — bar à parfums Nawar"]') }).first();
  const champs = ligne1.locator("input[type=number]");
  verifier((await champs.nth(2).inputValue()) === "80", "le prix par parfum n'est pas 80");
  await champs.nth(0).fill("250"); await champs.nth(2).fill("75");
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
