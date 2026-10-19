/* Heavent Admin : notifications sur le téléphone (aucune mise en cache, le site reste toujours à jour). */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("push", (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch { d = { titre: e.data ? e.data.text() : "Heavent" }; }
  e.waitUntil(self.registration.showNotification(d.titre || "Heavent", {
    body: d.corps || "",
    icon: "/admin-192.png",
    badge: "/admin-192.png",
    data: { lien: d.lien || "/admin" },
    vibrate: [80, 40, 80],
  }));
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const lien = new URL((e.notification.data && e.notification.data.lien) || "/admin", self.location.origin).href;
  e.waitUntil((async () => {
    const fenetres = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const f of fenetres) {
      if (new URL(f.url).pathname.startsWith("/admin")) { await f.focus(); if ("navigate" in f) await f.navigate(lien).catch(() => {}); return; }
    }
    await self.clients.openWindow(lien);
  })());
});
