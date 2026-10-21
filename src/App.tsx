import { lazy, Suspense, useState } from "react";
import SuiviVisites from "./components/SuiviVisites";
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
const EspaceMaries = lazy(() => import("./pages/EspaceMaries"));
const Rsvp = lazy(() => import("./pages/Rsvp"));
const AdminAuth = lazy(() => import("./pages/AdminAuth"));
const Auth = lazy(() => import("./pages/Auth"));
const StaffDashboard = lazy(() => import("./pages/StaffDashboard"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MentionsLegales = lazy(() => import("./pages/MentionsLegales"));
const CreeTonEvenement = lazy(() => import("./pages/CreeTonEvenement"));
const ListeGuides = lazy(() => import("./pages/Guides").then((m) => ({ default: m.ListeGuides })));
const PageGuide = lazy(() => import("./pages/Guides").then((m) => ({ default: m.PageGuide })));
const Liens = lazy(() => import("./pages/Guides").then((m) => ({ default: m.Liens })));
const Desinscription = lazy(() => import("./pages/Guides").then((m) => ({ default: m.Desinscription })));
const MonDevis = lazy(() => import("./pages/MonDevis"));
const Realisations = lazy(() => import("./pages/Realisations"));
const PageLocale = lazy(() => import("./pages/PageLocale"));
const Studio = lazy(() => import("./pages/Studio"));
const Prestataires = lazy(() => import("./pages/Prestataires"));
const ConfirmerPrestataire = lazy(() => import("./pages/Prestataires").then((m) => ({ default: m.ConfirmerPrestataire })));
const StudioDemo = lazy(() => import("./pages/StudioDemo"));
import { PAGES_LOCALES } from "./lib/pagesLocales";
import RetourEnHaut from "./components/RetourEnHaut";

const queryClient = new QueryClient();

const App = () => {
  // L'écran d'accueil animé ne s'affiche qu'une fois par visite (pas à chaque changement de page ni rechargement)
  const [showSplash, setShowSplash] = useState(() => {
    try { return !(window as unknown as { __pagePregeneree?: boolean }).__pagePregeneree && !navigator.userAgent.includes("HeaventAdminApp") && !sessionStorage.getItem("heavent-splash-vu") && !window.location.pathname.startsWith("/admin") && !window.location.pathname.startsWith("/staff") && !window.location.pathname.startsWith("/rsvp/"); } catch { return false; }
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
          <SuiviVisites />
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
              <Route path="/cree-ton-evenement" element={<CreeTonEvenement />} />
              <Route path="/mon-devis/:token" element={<MonDevis />} />
              <Route path="/mon-mariage/:token" element={<EspaceMaries />} />
              <Route path="/rsvp/:jeton" element={<Rsvp />} />
              <Route path="/realisations" element={<Realisations />} />
              <Route path="/guides" element={<ListeGuides />} />
              <Route path="/guides/:slug" element={<PageGuide />} />
              <Route path="/liens" element={<Liens />} />
              <Route path="/studio" element={<Studio />} />
              <Route path="/prestataires" element={<Prestataires />} />
              <Route path="/prestataires/confirmer/:jeton" element={<ConfirmerPrestataire />} />
              <Route path="/studio/demo/:jeton" element={<StudioDemo />} />
              <Route path="/desinscription/:jeton" element={<Desinscription />} />
              {PAGES_LOCALES.map((p) => <Route key={p.chemin} path={p.chemin} element={<PageLocale page={p} />} />)}
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
