/* Heavent Staff : installable, et utilisable sans réseau le jour J.
 * - Pages de l'espace staff : réseau d'abord (toujours à jour) ; si le réseau manque, la dernière copie de la page.
 * - Fichiers de l'appli (/assets/, images, polices) : gardés après la première visite, pour pouvoir ouvrir l'appli sans réseau.
 * Aucune donnée personnelle n'est mise en cache ici : les missions sont gardées par l'appli elle-même (effaçables), les requêtes vers la base ne passent jamais par ce fichier. */
const VERSION = "hv-staff-v2";
const PAGE = "/staff-dashboard/__page";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k.startsWith("hv-staff-") && k !== VERSION) await caches.delete(k);
  await self.clients.claim();
})()));

// La page confie au service worker la liste des fichiers qu'elle vient de charger : l'appli est utilisable sans réseau dès la première visite.
self.addEventListener("message", (event) => {
  if (!event.data || event.data.type !== "garder") return;
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    const urls = (event.data.urls || []).filter((u) => { try { return new URL(u, self.location.origin).origin === self.location.origin; } catch (e) { return false; } }).slice(0, 200);
    for (const u of urls) {
      try {
        if (await cache.match(u)) continue;
        const rep = await fetch(u);
        if (rep.ok && rep.type === "basic") await cache.put(u, rep);
      } catch (e) { /* hors ligne : on réessaiera à la prochaine visite */ }
    }
    if (event.data.page) {
      try { const rep = await fetch(event.data.page, { cache: "no-store" }); if (rep.ok && !rep.redirected && rep.type === "basic") await cache.put(PAGE, rep); } catch (e) { /* */ }
    }
  })());
});

const delai = (ms) => new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms));

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // base de données, Google, etc. : jamais touchés

  // Page de l'espace staff
  if (req.mode === "navigate") {
    event.respondWith((async () => {
      const cache = await caches.open(VERSION);
      try {
        const rep = await Promise.race([fetch(req), delai(4000)]); // réseau faible : au bout de 4 s on prend la copie
        if (rep && rep.ok && !rep.redirected && rep.type === "basic") cache.put(PAGE, rep.clone());
        return rep;
      } catch (e) {
        const copie = await cache.match(PAGE);
        if (copie) return copie;
        throw e;
      }
    })());
    return;
  }

  // Fichiers de l'appli : noms uniques (/assets/…) => copie gardée pour toujours ; autres (images, polices) => on rafraîchit en tâche de fond
  const fichier = url.pathname.startsWith("/assets/") || url.pathname.startsWith("/seuil/") || url.pathname.startsWith("/polices/") || /^\/(staff|admin)-?[\w-]*\.(png|webmanifest)$/.test(url.pathname) || url.pathname.startsWith("/lovable-uploads/");
  if (!fichier) return;
  event.respondWith((async () => {
    const cache = await caches.open(VERSION);
    const copie = await cache.match(req);
    const immuable = url.pathname.startsWith("/assets/");
    if (copie && immuable) return copie;
    const reseau = fetch(req).then((rep) => { if (rep && rep.ok && rep.type === "basic") cache.put(req, rep.clone()); return rep; });
    if (copie) { reseau.catch(() => {}); return copie; }
    return reseau;
  })());
});
