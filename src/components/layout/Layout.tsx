import { ReactNode, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useEffect(() => {
    // Import dynamique du monitoring pour éviter d'impacter les performances
    if (import.meta.env.DEV) {
      import('@/utils/monitoring').then(({ SiteMonitor }) => {
        // Vérification de santé au chargement de chaque page
        SiteMonitor.runHealthChecks();
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;