import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Bell, BellRing, Check, Download, Share, Smartphone, X } from "lucide-react";

/**
 * L'administration comme une vraie appli sur le téléphone : manifeste, icône, service worker,
 * et notifications (signature, nouvelle demande, rendez-vous, retard d'un crew).
 */
const CLE_VAPID = "BIu9cEfrETK9nZb-CgswMH5NnogUR87EcF3acx5-v5TroLMNkzzIk6Xk5OIJ5QHxZlyK8SVNAt8C4UQTyabQW_M";

function ajouterBalise(tag: "link" | "meta", attrs: Record<string, string>) {
  const cle = attrs.rel ?? attrs.name;
  if (document.head.querySelector(`${tag}[data-app-admin="${cle}"]`)) return;
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  el.setAttribute("data-app-admin", cle);
  document.head.appendChild(el);
}

let invitationInstall: any = null;
if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); invitationInstall = e; });
}

/** À appeler une fois dans la page /admin */
export function useAppAdmin() {
  useEffect(() => {
    ajouterBalise("link", { rel: "manifest", href: "/admin.webmanifest" });
    ajouterBalise("link", { rel: "apple-touch-icon", href: "/admin-180.png" });
    ajouterBalise("meta", { name: "apple-mobile-web-app-capable", content: "yes" });
    ajouterBalise("meta", { name: "mobile-web-app-capable", content: "yes" });
    ajouterBalise("meta", { name: "apple-mobile-web-app-title", content: "Heavent" });
    ajouterBalise("meta", { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" });
    const theme = document.querySelector('meta[name="theme-color"]');
    const ancien = theme?.getAttribute("content");
    theme?.setAttribute("content", "#141414");
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/admin-sw.js", { scope: "/admin" }).catch(() => {});
    // L'appli installée reste ouverte des jours entiers : à chaque retour dessus, on vérifie si le site a été mis à jour
    // et on recharge tout seul pour ne jamais rester sur une ancienne version.
    const actuel = () => [...document.scripts].map((s) => s.src).find((s) => /\/assets\/index-[\w-]+\.js/.test(s))?.split("/assets/")[1] ?? null;
    const verifier = async () => {
      if (document.visibilityState !== "visible") return;
      try {
        const html = await fetch("/admin/index.html", { cache: "no-store" }).then((r) => r.text());
        const enLigne = html.match(/\/assets\/(index-[\w-]+\.js)/)?.[1];
        const ici = actuel();
        if (enLigne && ici && enLigne !== ici) window.location.reload();
      } catch { /* hors ligne : on réessaiera */ }
    };
    document.addEventListener("visibilitychange", verifier);
    return () => { if (theme && ancien) theme.setAttribute("content", ancien); document.removeEventListener("visibilitychange", verifier); };
  }, []);
}

const base64EnOctets = (b64: string) => {
  const s = atob((b64 + "=".repeat((4 - (b64.length % 4)) % 4)).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(s, (c) => c.charCodeAt(0));
};
const octetsEnBase64 = (buf: ArrayBuffer | null) => (buf ? btoa(String.fromCharCode(...new Uint8Array(buf))) : "");
const estIos = () => /iPhone|iPad|iPod/i.test(navigator.userAgent);
const estInstallee = () => window.matchMedia?.("(display-mode: standalone)").matches || (navigator as any).standalone === true;
const nomAppareil = () => {
  const ua = navigator.userAgent;
  return /iPhone/.test(ua) ? "iPhone" : /iPad/.test(ua) ? "iPad" : /Android/.test(ua) ? "Android" : /Mac/.test(ua) ? "Mac" : /Windows/.test(ua) ? "PC" : "Appareil";
};

type Etat = "chargement" | "impossible" | "ios-installer" | "a-activer" | "refuse" | "active";

export function CarteAppTelephone({ email }: { email: string | undefined }) {
  const [etat, setEtat] = useState<Etat>("chargement");
  const [occupe, setOccupe] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [masquee, setMasquee] = useState(false);
  const [installable, setInstallable] = useState(!!invitationInstall);

  useEffect(() => {
    const surInvitation = () => setInstallable(true);
    window.addEventListener("beforeinstallprompt", surInvitation);
    (async () => {
      const pushPossible = "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
      if (!pushPossible) { setEtat(estIos() && !estInstallee() ? "ios-installer" : "impossible"); return; }
      if (Notification.permission === "denied") { setEtat("refuse"); return; }
      const reg = await navigator.serviceWorker.getRegistration("/admin").catch(() => undefined);
      const abo = await reg?.pushManager.getSubscription().catch(() => null);
      setEtat(abo && Notification.permission === "granted" ? "active" : "a-activer");
    })();
    return () => window.removeEventListener("beforeinstallprompt", surInvitation);
  }, []);

  const activer = async () => {
    if (!email) return;
    setOccupe(true); setMessage(null);
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") { setEtat(permission === "denied" ? "refuse" : "a-activer"); return; }
      const reg = await navigator.serviceWorker.register("/admin-sw.js", { scope: "/admin" });
      await navigator.serviceWorker.ready;
      const abo = (await reg.pushManager.getSubscription()) ?? (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: base64EnOctets(CLE_VAPID) }));
      const { error } = await (supabase as any).from("abonnements_push").upsert({
        endpoint: abo.endpoint, email: email.toLowerCase(), p256dh: octetsEnBase64(abo.getKey("p256dh")), auth: octetsEnBase64(abo.getKey("auth")), appareil: nomAppareil(),
      }, { onConflict: "endpoint" });
      if (error) throw error;
      setEtat("active");
      await (supabase as any).rpc("notification_essai");
      setMessage("C'est activé ! Une notification d'essai arrive dans quelques secondes.");
    } catch {
      setMessage("Impossible d'activer les notifications sur cet appareil. Réessaie depuis l'appli installée.");
    } finally { setOccupe(false); }
  };

  const essai = async () => {
    setOccupe(true);
    await (supabase as any).rpc("notification_essai");
    setOccupe(false);
    setMessage("Notification d'essai envoyée.");
  };

  const installer = async () => {
    if (!invitationInstall) return;
    invitationInstall.prompt();
    await invitationInstall.userChoice.catch(() => null);
    invitationInstall = null; setInstallable(false);
  };

  if (etat === "chargement" || masquee) return null;

  // Déjà tout bon : une simple ligne discrète
  if (etat === "active" && !message) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#EADFC8] bg-white px-4 py-2.5 text-sm" data-testid="notifications-actives">
        <span className="flex items-center gap-2 text-[#5E554A]"><BellRing className="h-4 w-4 text-[#A8933F]" /> Notifications activées sur cet appareil</span>
        <button onClick={essai} disabled={occupe} className="text-xs underline underline-offset-2 text-muted-foreground hover:text-foreground">Tester</button>
      </div>
    );
  }

  return (
    <section className="relative rounded-3xl border border-[#EADFC8] bg-white p-5" data-testid="carte-app-telephone">
      <button onClick={() => setMasquee(true)} className="absolute top-3 right-3 h-8 w-8 rounded-full hover:bg-black/5 flex items-center justify-center" aria-label="Masquer"><X className="h-4 w-4" /></button>
      <div className="flex items-start gap-4 pr-6">
        <img src="/admin-192.png" alt="" className="h-12 w-12 rounded-2xl shrink-0" />
        <div className="space-y-2 min-w-0">
          <h3 className="font-serif text-xl">Heavent dans ta poche</h3>
          {etat === "ios-installer" && (
            <p className="text-sm text-[#5E554A]">
              Sur iPhone, ajoute d'abord l'appli à ton écran d'accueil : touche <Share className="inline h-4 w-4 -mt-0.5" /> <b>Partager</b>, puis <b>« Sur l'écran d'accueil »</b>.
              Ouvre ensuite <b>Heavent</b> depuis son icône et reviens ici pour activer les notifications.
            </p>
          )}
          {etat === "a-activer" && (
            <>
              <p className="text-sm text-[#5E554A]">Sois prévenue tout de suite quand un client signe, quand une demande arrive, quand un rendez-vous est pris ou si un crew est en retard.</p>
              <div className="flex flex-wrap gap-2">
                <button onClick={activer} disabled={occupe} data-testid="activer-notifications"
                  className="inline-flex items-center gap-2 rounded-full bg-[#141414] text-white px-4 min-h-10 text-sm disabled:opacity-60">
                  <Bell className="h-4 w-4 text-[#E4D49A]" /> {occupe ? "Activation…" : "Activer les notifications"}
                </button>
                {installable && (
                  <button onClick={installer} className="inline-flex items-center gap-2 rounded-full border border-[#DCCBA6] px-4 min-h-10 text-sm"><Download className="h-4 w-4" /> Installer l'appli</button>
                )}
              </div>
            </>
          )}
          {etat === "active" && message && <p className="text-sm text-[#3f6b2a] flex items-center gap-1.5"><Check className="h-4 w-4" /> {message}</p>}
          {etat === "refuse" && <p className="text-sm text-[#5E554A]">Les notifications sont bloquées pour ce site. Autorise-les dans les réglages du téléphone (Notifications → Heavent), puis recharge la page.</p>}
          {etat === "impossible" && <p className="text-sm text-[#5E554A] flex items-center gap-1.5"><Smartphone className="h-4 w-4" /> Ouvre cette page sur ton téléphone pour installer l'appli et recevoir les notifications.</p>}
          {etat !== "active" && message && <p className="text-sm text-[#9a3412]">{message}</p>}
        </div>
      </div>
    </section>
  );
}
