import { clientEnModeDemo } from "@/integrations/supabase/client";
import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import BoutonWhatsApp from "@/components/BoutonWhatsApp";
import { AnimationsSeuil } from "@/components/seuil/Seuil";
import { PAGES_LOCALES } from "@/lib/pagesLocales";

/** Pages publiques habillées avec la direction « Seuil » (polices Gloock et Jost sur toute la page). */
const PAGES_SEUIL = ["/", "/devis-entreprise", "/devis-mariage", "/a-propos", "/contact", "/nawar", "/mentions-legales", "/politique-confidentialite", "/realisations", "/liens", "/wedding-planner-maroc", ...PAGES_LOCALES.map((p) => p.chemin)];
export const estPageSeuil = (chemin: string) => {
  const c = chemin.replace(/\/+$/, "") || "/";
  return PAGES_SEUIL.includes(c) || c.startsWith("/guides") || c.startsWith("/prestataires");
};

interface LayoutProps {
  children: ReactNode;
}

/** Vrai quand le site est affiché dans l'application Mac « Heavent Admin ». */
export const dansApplication = typeof navigator !== "undefined" && navigator.userAgent.includes("HeaventAdminApp");

const CLE_VUE_SITE = "heavent-vue-site";
const lireVueSite = () => { try { return sessionStorage.getItem(CLE_VUE_SITE) === "1"; } catch { return false; } };

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // « Voir le site » depuis l'administration (appli Mac) : on affiche le vrai site public, avec un bouton pour revenir
  if (dansApplication && typeof window !== "undefined" && new URLSearchParams(window.location.search).has("depuis-admin")) {
    try { sessionStorage.setItem(CLE_VUE_SITE, "1"); } catch { /* sans mémoire : le site s'affiche quand même */ }
  }
  const vueSite = dansApplication && lireVueSite() && !pathname.startsWith("/admin");

  // Typographie « Seuil » sur les pages publiques (posée sur <body> pour couvrir aussi les menus déroulants)
  const seuil = estPageSeuil(pathname) && !(dansApplication && !vueSite);
  useEffect(() => {
    document.body.classList.toggle("seuil", seuil);
    // Les pages publiques « Seuil » utilisent leurs polices hébergées ; Inter et Playfair (Google) ne servent qu'ailleurs (admin, espaces)
    if (!seuil && !document.getElementById("polices-google")) {
      const l = document.createElement("link");
      l.id = "polices-google"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap";
      document.head.appendChild(l);
    }
  }, [seuil]);

  useEffect(() => {
    // Import dynamique du monitoring pour éviter d'impacter les performances
    if (import.meta.env.DEV) {
      import('@/utils/monitoring').then(({ SiteMonitor }) => {
        // Vérification de santé au chargement de chaque page
        SiteMonitor.runHealthChecks();
      });
    }
  }, []);

  // Démo Heavent Studio : en quittant la démo, on recharge la page pour retrouver le vrai serveur et la vraie connexion
  useEffect(() => {
    if (clientEnModeDemo && !pathname.startsWith("/studio/demo/")) window.location.replace(pathname + window.location.search);
  }, [pathname]);

  // Dans l'app, on reste dans l'administration (ex. après la déconnexion) ; les démos Heavent Studio s'y affichent aussi
  useEffect(() => {
    if (pathname.startsWith("/admin")) { try { sessionStorage.removeItem(CLE_VUE_SITE); } catch { /* ignoré */ } }
    if (dansApplication && !vueSite && !pathname.startsWith("/admin") && !pathname.startsWith("/studio/demo/")) navigate("/admin-auth", { replace: true });
  }, [pathname, navigate, vueSite]);

  if (vueSite) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="sticky top-0 z-[60] h-10 shrink-0 flex items-center justify-between gap-3 px-3 bg-[#141414] text-white text-xs select-none pl-20" style={{ WebkitAppRegion: "drag" } as React.CSSProperties}>
          <span className="tracking-widest text-[#E4D49A]">APERÇU DU SITE</span>
          <a href="/admin" data-testid="retour-admin" className="rounded-full border border-white/25 px-3 py-1 hover:bg-white/10" style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}>← Retour à l'administration</a>
        </div>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    );
  }

  if (dansApplication) {
    // L'administration gère elle-même sa barre de titre (menu latéral)
    if (pathname === "/admin") return <main className="min-h-screen">{children}</main>;
    return (
      <div className="min-h-screen flex flex-col bg-background">
        {/* Barre de titre de l'app : permet de déplacer la fenêtre */}
        <div
          className="sticky top-0 z-50 h-10 shrink-0 flex items-center justify-center border-b border-[#ece6d3] bg-[#FAF7EE]/95 backdrop-blur text-xs font-medium tracking-wide text-[#A8933F] select-none"
          style={{ WebkitAppRegion: "drag" } as React.CSSProperties}
        >
          HEAVENT ADMIN
        </div>
        <main className="flex-1">{children}</main>
      </div>
    );
  }

  // Page de réponse d'un invité : une carte d'invitation, sans menu du site
  // L'administration a son propre en-tête (pas de menu ni de pied de page du site)
  if (pathname.startsWith("/rsvp/") || pathname === "/liens" || pathname.startsWith("/studio") || pathname === "/nawar" || pathname === "/nawar/" || pathname === "/admin" || pathname === "/admin/" || pathname.startsWith("/staff-dashboard")) return <main>{seuil && <AnimationsSeuil />}{children}</main>;

  return (
    <div className="min-h-screen flex flex-col">
      {seuil && <AnimationsSeuil />}
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <BoutonWhatsApp />
    </div>
  );
};

export default Layout;
