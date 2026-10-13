import { useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./i18n/index.ts";
import SplashScreen from "./components/SplashScreen";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import StaffRegistration from "./pages/StaffRegistration";
import BusinessQuote from "./pages/BusinessQuote";
import WeddingQuote from "./pages/WeddingQuote";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Admin from "./pages/Admin";
import AdminAuth from "./pages/AdminAuth";
import Auth from "./pages/Auth";
import StaffDashboard from "./pages/StaffDashboard";
import AuthCallback from "./pages/AuthCallback";
import NotFound from "./pages/NotFound";
import RetourEnHaut from "./components/RetourEnHaut";

const queryClient = new QueryClient();

const App = () => {
  // L'écran d'accueil animé ne s'affiche qu'une fois par visite (pas à chaque changement de page ni rechargement)
  const [showSplash, setShowSplash] = useState(() => {
    try { return !sessionStorage.getItem("heavent-splash-vu") && !window.location.pathname.startsWith("/admin") && !window.location.pathname.startsWith("/staff"); } catch { return false; }
  });
  const finSplash = () => { try { sessionStorage.setItem("heavent-splash-vu", "1"); } catch { /* navigation privée */ } setShowSplash(false); };

  if (showSplash) {
    return <SplashScreen onComplete={finSplash} />;
  }

  return (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RetourEnHaut />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/inscription-staff" element={<StaffRegistration />} />
              <Route path="/devis-entreprise" element={<BusinessQuote />} />
              <Route path="/devis-mariage" element={<WeddingQuote />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/politique-confidentialite" element={<PrivacyPolicy />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin-auth" element={<AdminAuth />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/staff-dashboard" element={<StaffDashboard />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
  );
};

export default App;
