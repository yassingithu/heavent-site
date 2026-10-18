import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import BoutonWhatsApp from "@/components/BoutonWhatsApp";

interface LayoutProps {
  children: ReactNode;
}

/** Vrai quand le site est affiché dans l'application Mac « Heavent Admin ». */
export const dansApplication = typeof navigator !== "undefined" && navigator.userAgent.includes("HeaventAdminApp");

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Import dynamique du monitoring pour éviter d'impacter les performances
    if (import.meta.env.DEV) {
      import('@/utils/monitoring').then(({ SiteMonitor }) => {
        // Vérification de santé au chargement de chaque page
        SiteMonitor.runHealthChecks();
      });
    }
  }, []);

  // Dans l'app, on reste dans l'administration (ex. après la déconnexion)
  useEffect(() => {
    if (dansApplication && !pathname.startsWith("/admin")) navigate("/admin-auth", { replace: true });
  }, [pathname, navigate]);

  if (dansApplication) {
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

  return (
    <div className="min-h-screen flex flex-col">
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
