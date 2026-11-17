// Mode hors ligne de l'espace staff : missions gardées, pointage de secours, renvoi sans doublon, effacement.
// Usage : (cd dist && python3 -m http.server 4173) puis node tests/beta/hors-ligne-staff.mjs
// Base de données et fonction « pointer » SIMULÉES : aucune donnée réelle, aucun envoi.
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const BASE = process.env.BASE || "http://localhost:4173";
const REF = "mapiwnsjsluiwmnulhqk";
const ok = []; const ko = [];
const verif = (nom, cond, detail = "") => { (cond ? ok : ko).push(nom); console.log((cond ? "  ✓ " : "  ✗ ") + nom + (cond ? "" : "  → " + detail)); };

const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
const jwt = b64({ alg: "HS256", typ: "JWT" }) + "." + b64({ sub: "00000000-0000-0000-0000-000000000001", email: "crew.fictif@example.test", role: "authenticated", aud: "authenticated", exp: 4102444800 }) + ".sig";
const session = { access_token: jwt, refresh_token: "r", expires_at: 4102444800, expires_in: 99999, token_type: "bearer", user: { id: "00000000-0000-0000-0000-000000000001", aud: "authenticated", role: "authenticated", email: "crew.fictif@example.test", app_metadata: {}, user_metadata: {}, created_at: "2026-01-01T00:00:00Z" } };

const maintenant = new Date();
const auj = maintenant.toISOString().slice(0, 10);
const hh = (d) => d.toISOString().slice(11, 16);
const mission = {
  id: "11111111-1111-1111-1111-111111111111", date_jour: auj, heure_debut: hh(new Date(maintenant.getTime() - 3600e3)), heure_fin: hh(new Date(maintenant.getTime() + 6 * 3600e3)), heures: 7, poste: "Hôtesse d'accueil",
  presence_confirmee_le: null, empechement_le: null, arrivee_le: null, arrivee_verifiee: null, depart_le: null, heures_pointees: null,
  evenement: "Mariage test (fictif)", lieu: "Palais fictif, Rabat", numero: "DEV-TEST-1",
  fiche: { tenue: "Caftan crème", point_rdv: "Entrée du personnel", heure_rdv: "16:00", latitude: 34.02, longitude: -6.84, contact_nom: "Sara (cheffe d'équipe)", contact_telephone: "0600000000", consignes: "Se présenter au gardien" },
};
const cors = { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "*" };

// État du faux serveur
const serveur = { appels: [], cles: new Set(), perdreReponse: 0, mission: { ...mission } };

async function nouveauContexte(browser, { avecSession = true } = {}) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, geolocation: { latitude: 34.02, longitude: -6.84, accuracy: 20 }, permissions: ["geolocation"] });
  await ctx.addInitScript(([cle, s, avec]) => { window.__suiviTest = false; if (avec && !localStorage.getItem(cle)) localStorage.setItem(cle, JSON.stringify(s)); localStorage.setItem("heavent-ne-pas-compter", "1"); }, [`sb-${REF}-auth-token`, session, avecSession]);
  ctx.coupe = false;
  await ctx.route(/supabase\.co/, async (route) => {
    if (ctx.coupe) return route.abort("internetdisconnected"); // réseau coupé : la base ne répond pas, comme en vrai
    const r = route.request(); const u = new URL(r.url());
    if (r.method() === "OPTIONS") return route.fulfill({ status: 204, headers: cors });
    const json = (corps, status = 200) => route.fulfill({ status, headers: { ...cors, "content-type": "application/json" }, body: JSON.stringify(corps) });
    if (u.pathname.endsWith("/rpc/mes_missions")) return json([serveur.mission]);
    if (u.pathname.includes("/rest/v1/staff")) return json([{ id: "s1", prenom: "Test", nom: "Fictif", email: "crew.fictif@example.test" }]);
    if (u.pathname.includes("/rest/v1/")) return json([]);
    if (u.pathname.includes("/auth/v1/user")) return json(session.user);
    if (u.pathname.endsWith("/functions/v1/pointer")) {
      const corps = JSON.parse(r.postData() || "{}");
      serveur.appels.push(corps);
      const deja = corps.cle && serveur.cles.has(corps.cle);
      if (corps.cle) serveur.cles.add(corps.cle);
      if (serveur.perdreReponse > 0) { serveur.perdreReponse--; return route.abort("failed"); } // le serveur a reçu, mais la réponse n'arrive jamais
      return json({ success: true, heure: corps.heure_appareil || new Date().toISOString(), verifie: true, heures: 6.5, deja: !!deja });
    }
    return json({});
  });
  return ctx;
}
const reseau = async (ctx, coupe) => { ctx.coupe = coupe; await ctx.setOffline(coupe); };
const cacheLocal = (p) => p.evaluate(() => ({ cache: localStorage.getItem("heavent-staff-hl-missions"), file: localStorage.getItem("heavent-staff-hl-file") }));

(async () => {
  const browser = await chromium.launch();
  console.log("1. Première visite en ligne");
  let ctx = await nouveauContexte(browser);
  let p = await ctx.newPage();
  const erreursPage = []; p.on("pageerror", (e) => erreursPage.push(e.message));
  await p.goto(BASE + "/staff-dashboard/", { waitUntil: "networkidle" });
  await p.waitForSelector('[data-testid="mission"]', { timeout: 15000 });
  verif("la mission du jour s'affiche", await p.getByTestId("mission").count() === 1);
  verif("pas de bandeau « pas de réseau » en ligne", await p.getByTestId("bandeau-hors-ligne").count() === 0);
  const c1 = await cacheLocal(p);
  verif("une copie est gardée sur le téléphone", !!c1.cache);
  const cache = JSON.parse(c1.cache || "{}");
  verif("la copie ne contient ni numéro de devis ni heures pointées ni état de vérification", !/DEV-TEST-1|heures_pointees|arrivee_verifiee|numero/.test(c1.cache || ""), c1.cache);
  verif("la copie contient tenue, rendez-vous, contact et consignes", /Caftan crème/.test(c1.cache) && /Entrée du personnel/.test(c1.cache) && /Sara/.test(c1.cache) && /gardien/.test(c1.cache));
  verif("date de dernière mise à jour enregistrée", !!cache.synchro);
  await p.evaluate(() => navigator.serviceWorker.ready);
  await p.waitForTimeout(4500); // la page confie ses fichiers au service worker (sans rechargement : première visite)
  const clesCache = await p.evaluate(async () => (await caches.keys()).join(","));
  verif("le service worker a gardé l'appli (cache hv-staff-v2)", /hv-staff-v2/.test(clesCache), clesCache);

  console.log("2. Réseau coupé : ouverture de l'appli");
  await reseau(ctx, true);
  await p.reload({ waitUntil: "domcontentloaded" });
  await p.waitForSelector('[data-testid="mission"]', { timeout: 15000 });
  verif("l'appli s'ouvre sans réseau", true);
  verif("bandeau « Pas de réseau : tu peux quand même pointer »", await p.getByTestId("bandeau-hors-ligne").count() === 1);
  const txt = await p.locator("body").innerText();
  verif("date de mise à jour visible", /mises à jour (aujourd'hui|hier)/.test(txt), txt.slice(0, 300));
  verif("tenue, contact et consignes visibles sans réseau", /Caftan crème/.test(txt) && /Sara/.test(txt) && /gardien/.test(txt));
  verif("aucune fiche de paie ni contrat affichés sans réseau", !/fiche de paie|Contrats?\b/i.test(await p.getByTestId("mes-missions").innerText()));
  verif("« confirmer ma présence » grisé sans réseau", await p.getByTestId("confirmer-presence").isDisabled());

  console.log("3. Pointage d'arrivée sans réseau");
  await p.getByTestId("pointer-arrivee").click();
  await p.getByTestId("valider-pointage").click();
  await p.waitForSelector('[data-testid="pointages-a-envoyer"]', { timeout: 15000 });
  verif("« 1 pointage à envoyer » s'affiche", /1 pointage à envoyer/.test(await p.getByTestId("pointages-a-envoyer").innerText()));
  verif("badge « en attente d'envoi » sur la mission", /en attente d'envoi/.test(await p.getByTestId("mission").innerText()));
  verif("aucun appel serveur pendant la coupure", serveur.appels.length === 0);
  verif("le bouton « J'ai terminé » apparaît", await p.getByTestId("pointer-depart").count() === 1);

  console.log("4. Pointage de départ, puis redémarrage de l'appli");
  await p.getByTestId("pointer-depart").click();
  await p.getByTestId("valider-pointage").click();
  await p.waitForFunction(() => /2 pointages à envoyer/.test(document.querySelector('[data-testid="pointages-a-envoyer"]')?.textContent || ""));
  verif("2 pointages en attente", true);
  await p.reload({ waitUntil: "domcontentloaded" });
  await p.waitForSelector('[data-testid="pointages-a-envoyer"]');
  verif("les pointages survivent au redémarrage", /2 pointages à envoyer/.test(await p.getByTestId("pointages-a-envoyer").innerText()));
  const f = JSON.parse((await cacheLocal(p)).file);
  verif("chaque pointage a une clé unique et l'heure du téléphone", f.length === 2 && f[0].cle !== f[1].cle && f.every((x) => x.heure && x.cle.length >= 8));
  verif("la position est gardée avec le pointage", f[0].position && Math.abs(f[0].position.lat - 34.02) < 0.01);

  console.log("5. Retour du réseau : envoi sans doublon (la 1re réponse est perdue)");
  serveur.perdreReponse = 1;
  await reseau(ctx, false);
  await p.evaluate(() => window.dispatchEvent(new Event("online")));
  await p.waitForFunction(() => !document.querySelector('[data-testid="pointages-a-envoyer"]'), null, { timeout: 90000 });
  const uniques = new Set(serveur.appels.map((a) => a.cle));
  verif("tout est envoyé automatiquement", true);
  verif("la clé du pointage perdu a été renvoyée (au moins 3 appels pour 2 pointages)", serveur.appels.length >= 3, String(serveur.appels.length));
  verif("le serveur n'a vu que 2 pointages distincts (pas de doublon)", uniques.size === 2, String(uniques.size));
  verif("chaque envoi est marqué hors ligne avec l'heure du téléphone", serveur.appels.every((a) => a.hors_ligne === true && a.heure_appareil && a.cle));
  verif("l'arrivée est partie avant le départ", serveur.appels[0].action === "arrivee");
  verif("file locale vide après envoi", !(await cacheLocal(p)).file);
  await ctx.close();

  console.log("6. Jeton expiré et sans réseau : l'accès aux missions reste ouvert");
  ctx = await nouveauContexte(browser);
  p = await ctx.newPage();
  await p.goto(BASE + "/staff-dashboard/", { waitUntil: "networkidle" });
  await p.waitForSelector('[data-testid="mission"]');
  await p.evaluate(() => navigator.serviceWorker.ready); await p.waitForTimeout(4500);
  await p.evaluate((cle) => localStorage.removeItem(cle), `sb-${REF}-auth-token`); // session perdue
  await ctx.addInitScript(() => localStorage.removeItem("sb-mapiwnsjsluiwmnulhqk-auth-token"));
  await reseau(ctx, true);
  await p.reload({ waitUntil: "domcontentloaded" });
  await p.waitForSelector('[data-testid="mission"]', { timeout: 15000 });
  verif("écran « Mode sans réseau » avec la mission, sans redirection vers la connexion", /Mode sans réseau/.test(await p.locator("body").innerText()) && !p.url().includes("/auth"), p.url());
  await ctx.close();

  console.log("7. Effacement des données du téléphone");
  serveur.cles.clear(); serveur.appels.length = 0;
  ctx = await nouveauContexte(browser); p = await ctx.newPage();
  await p.goto(BASE + "/staff-dashboard/", { waitUntil: "networkidle" });
  await p.waitForSelector('[data-testid="mission"]');
  await reseau(ctx, true);
  await p.getByTestId("pointer-arrivee").click(); await p.getByTestId("valider-pointage").click();
  await p.waitForSelector('[data-testid="pointages-a-envoyer"]');
  await p.getByTestId("effacer-donnees").click();
  verif("l'effacement prévient qu'un pointage serait perdu", /ne sont pas encore envoyés|n'est pas encore envoyé/.test(await p.getByRole("dialog").innerText()));
  await p.getByTestId("confirmer-effacement").click();
  await p.waitForTimeout(500);
  const apres = await cacheLocal(p);
  verif("missions et pointages effacés du téléphone", !apres.cache && !apres.file, JSON.stringify(apres).slice(0, 120));
  await ctx.close();

  console.log("8. Péremption : 48 h après la fin de la dernière mission");
  ctx = await nouveauContexte(browser); p = await ctx.newPage();
  await p.goto(BASE + "/staff-dashboard/", { waitUntil: "networkidle" });
  await p.waitForSelector('[data-testid="mission"]');
  await p.evaluate(() => navigator.serviceWorker.ready); await p.waitForTimeout(4500);
  await p.evaluate(() => { const c = JSON.parse(localStorage.getItem("heavent-staff-hl-missions")); const vieux = new Date(Date.now() - 4 * 864e5).toISOString().slice(0, 10); c.missions.forEach((m) => { m.date_jour = vieux; }); localStorage.setItem("heavent-staff-hl-missions", JSON.stringify(c)); });
  await reseau(ctx, true);
  await p.reload({ waitUntil: "domcontentloaded" }).catch(() => {});
  await p.waitForTimeout(2500);
  verif("la copie périmée est supprimée et plus affichée", !(await cacheLocal(p)).cache && await p.getByTestId("mission").count() === 0);
  await ctx.close();

  console.log("9. Signal faible : le téléphone se croit en ligne mais rien ne passe");
  serveur.cles.clear(); serveur.appels.length = 0; serveur.mission = { ...mission };
  ctx = await nouveauContexte(browser); p = await ctx.newPage();
  await p.goto(BASE + "/staff-dashboard/", { waitUntil: "networkidle" });
  await p.waitForSelector('[data-testid="mission"]');
  ctx.coupe = true; // navigator.onLine reste vrai
  await p.getByTestId("pointer-arrivee").click(); await p.getByTestId("valider-pointage").click();
  await p.waitForSelector('[data-testid="pointages-a-envoyer"]', { timeout: 30000 });
  verif("le pointage est gardé (et non perdu) malgré un réseau qui ne répond pas", /1 pointage à envoyer/.test(await p.getByTestId("pointages-a-envoyer").innerText()));
  verif("aucune erreur « pointage impossible » affichée", !/Pointage impossible/.test(await p.locator("body").innerText()));
  ctx.coupe = false;
  await p.getByTestId("envoyer-maintenant").click();
  await p.waitForFunction(() => !document.querySelector('[data-testid="pointages-a-envoyer"]'), null, { timeout: 30000 });
  verif("« Envoyer maintenant » envoie le pointage au retour du signal", serveur.appels.length === 1 && serveur.appels[0].hors_ligne === true);
  await ctx.close();

  verif("aucune erreur JavaScript dans la page", erreursPage.length === 0, erreursPage.join(" | "));
  await browser.close();
  console.log(`\n${ok.length} contrôles réussis, ${ko.length} échec(s)`);
  process.exit(ko.length ? 1 : 0);
})();
