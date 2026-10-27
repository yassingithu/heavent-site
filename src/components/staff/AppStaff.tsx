import { useEffect, useState } from "react";
import { Download, Share, X } from "lucide-react";

/**
 * L'espace staff comme une vraie appli sur le téléphone (Android et iPhone) : manifeste, icône, plein écran.
 * Pas d'APK : l'appli est la même page web, toujours à jour, installée depuis le navigateur.
 */
function ajouterBalise(tag: "link" | "meta", attrs: Record<string, string>) {
  const cle = attrs.rel ?? attrs.name;
  if (document.head.querySelector(`${tag}[data-app-staff="${cle}"]`)) return;
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  el.setAttribute("data-app-staff", cle);
  document.head.appendChild(el);
}

let invitationInstall: any = null;
if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); invitationInstall = e; });
}

/** À appeler une fois dans la page /staff-dashboard */
export function useAppStaff() {
  useEffect(() => {
    ajouterBalise("link", { rel: "manifest", href: "/staff.webmanifest" });
    // iPhone : une seule icône d'écran d'accueil possible. On remplace celle d'index.html (sinon Safari prend l'ancienne).
    const anciennes = [...document.head.querySelectorAll('link[rel="apple-touch-icon"]')] as HTMLLinkElement[];
    const memoire = anciennes.map((l) => [l, l.getAttribute("href")] as const);
    if (anciennes.length) anciennes.forEach((l) => l.setAttribute("href", "/staff-180.png"));
    else ajouterBalise("link", { rel: "apple-touch-icon", href: "/staff-180.png" });
    ajouterBalise("meta", { name: "apple-mobile-web-app-capable", content: "yes" });
    ajouterBalise("meta", { name: "mobile-web-app-capable", content: "yes" });
    ajouterBalise("meta", { name: "apple-mobile-web-app-title", content: "Heavent Staff" });
    ajouterBalise("meta", { name: "apple-mobile-web-app-status-bar-style", content: "default" });
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/staff-sw.js", { scope: "/staff-dashboard" }).catch(() => {});
    return () => memoire.forEach(([l, h]) => h && l.setAttribute("href", h));
  }, []);
}

const estIos = () => /iPhone|iPad|iPod/i.test(navigator.userAgent);
const estAndroid = () => /Android/i.test(navigator.userAgent);
const estInstallee = () => window.matchMedia?.("(display-mode: standalone)").matches || (navigator as any).standalone === true;
const CLE = "heavent-staff-invitation-masquee";
const lireMasquee = () => { try { return localStorage.getItem(CLE) === "1"; } catch { return false; } };
const noterMasquee = () => { try { localStorage.setItem(CLE, "1"); } catch { /* sans stockage : la carte reviendra */ } };

/** Invitation à installer l'appli : seulement sur téléphone, jamais une fois installée ou masquée. */
export function CarteInstallerStaff() {
  const [installable, setInstallable] = useState(!!invitationInstall);
  const [masquee, setMasquee] = useState(lireMasquee());

  useEffect(() => {
    const surInvitation = () => setInstallable(true);
    window.addEventListener("beforeinstallprompt", surInvitation);
    return () => window.removeEventListener("beforeinstallprompt", surInvitation);
  }, []);

  if (masquee || estInstallee()) return null;
  const ios = estIos();
  if (!ios && !estAndroid()) return null;

  const masquer = () => { noterMasquee(); setMasquee(true); };
  const installer = async () => {
    if (!invitationInstall) return;
    invitationInstall.prompt();
    await invitationInstall.userChoice.catch(() => null);
    invitationInstall = null; setInstallable(false);
  };

  return (
    <section className="relative rounded-2xl border border-[#EADFC8] bg-white p-4 shadow-sm" data-testid="carte-installer-staff">
      <button onClick={masquer} className="absolute top-2 right-2 h-8 w-8 rounded-full hover:bg-black/5 flex items-center justify-center" aria-label="Masquer"><X className="h-4 w-4" /></button>
      <div className="flex items-start gap-3 pr-6">
        <img src="/staff-192.png" alt="" className="h-12 w-12 rounded-2xl shrink-0" />
        <div className="space-y-2 min-w-0">
          <h3 className="font-serif text-lg leading-tight">Heavent Staff sur ton téléphone</h3>
          {ios ? (
            <p className="text-sm text-[#5E554A]">
              Touche <Share className="inline h-4 w-4 -mt-0.5" /> <b>Partager</b>, puis <b>« Sur l'écran d'accueil »</b>. Tu retrouveras tes missions, contrats et fiches de paie d'une seule touche.
            </p>
          ) : installable ? (
            <>
              <p className="text-sm text-[#5E554A]">Ajoute l'appli à ton écran d'accueil pour retrouver tes missions, contrats et fiches de paie d'une seule touche.</p>
              <button onClick={installer} data-testid="installer-staff" className="inline-flex items-center gap-2 rounded-full bg-[#141414] text-white px-4 min-h-10 text-sm">
                <Download className="h-4 w-4 text-[#E4D49A]" /> Installer l'appli
              </button>
            </>
          ) : (
            <p className="text-sm text-[#5E554A]">Dans le menu du navigateur (⋮), choisis <b>« Installer l'application »</b> ou <b>« Ajouter à l'écran d'accueil »</b>.</p>
          )}
        </div>
      </div>
    </section>
  );
}
