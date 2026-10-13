import { lazy, Suspense, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./i18n/index.ts";
import SplashScreen from "./components/SplashScreen";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
const StaffRegistration = lazy(() => import("./pages/StaffRegistration"));
const BusinessQuote = lazy(() => import("./pages/BusinessQuote"));
const WeddingQuote = lazy(() => import("./pages/WeddingQuote"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminAuth = lazy(() => import("./pages/AdminAuth"));
const Auth = lazy(() => import("./pages/Auth"));
const StaffDashboard = lazy(() => import("./pages/StaffDashboard"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MentionsLegales = lazy(() => import("./pages/MentionsLegales"));
import RetourEnHaut from "./components/RetourEnHaut";

const queryClient = new QueryClient();

const App = () => {
  // L'écran d'accueil animé ne s'affiche qu'une fois par visite (pas à chaque changement de page ni rechargement)
  const [showSplash, setShowSplash] = useState(() => {
    try { return !(window as unknown as { __pagePregeneree?: boolean }).__pagePregeneree && !navigator.userAgent.includes("HeaventAdminApp") && !sessionStorage.getItem("heavent-splash-vu") && !window.location.pathname.startsWith("/admin") && !window.location.pathname.startsWith("/staff"); } catch { return false; }
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
            <Suspense fallback={<div className="min-h-[60vh]" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/inscription-staff" element={<StaffRegistration />} />
              <Route path="/devis-entreprise" element={<BusinessQuote />} />
              <Route path="/devis-mariage" element={<WeddingQuote />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/politique-confidentialite" element={<PrivacyPolicy />} />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
              <Route path="/rgpd" element={<Navigate to="/politique-confidentialite" replace />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin-auth" element={<AdminAuth />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/staff-dashboard" element={<StaffDashboard />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
  );
};

export default App;
