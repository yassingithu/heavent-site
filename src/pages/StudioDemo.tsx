import { lazy, Suspense, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Globe, LayoutDashboard, Loader2, Smartphone, Sparkles } from "lucide-react";
import Seo from "@/components/Seo";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL, changerSessionDemo } from "@/integrations/supabase/client";
import { baseDemo, definirUtilisateurDemo, demarrerDemo, vraiFetch } from "@/demo/serveurDemo";
import DemoSite from "@/demo/DemoSite";
import type { ConfigDemo } from "@/demo/donneesDemo";

const Admin = lazy(() => import("./Admin"));
const StaffDashboard = lazy(() => import("./StaffDashboard"));
type Vue = "site" | "admin" | "crew";
const VUES: [Vue, string, string, typeof Globe][] = [["site", "Le site", "Le site", Globe], ["admin", "L'administration", "Admin", LayoutDashboard], ["crew", "L'espace équipe", "Équipe", Smartphone]];

/** Démo personnalisée Heavent Studio : la vraie administration, sur des données fictives au nom de l'agence du prospect. */
export default function StudioDemo() {
  const { jeton } = useParams();
  const [cfg, setCfg] = useState<ConfigDemo | null | undefined>(undefined);
  const [vue, setVue] = useState<Vue>("admin");
  const [cle, setCle] = useState(0);
  const changerVue = (v: Vue) => {
    // L'espace équipe s'ouvre « connecté » comme un membre de l'équipe ; le site et l'admin comme l'agence
    const email = v === "crew" ? baseDemo()?._meta.crew : "demo@heavent.studio";
    definirUtilisateurDemo(email); changerSessionDemo(email);
    setVue(v); setCle((k) => k + 1); window.scrollTo(0, 0);
  };

  useEffect(() => {
    // Seul appel au vrai serveur : vérifier le lien (et compter l'ouverture)
    vraiFetch(`${SUPABASE_URL}/rest/v1/rpc/studio_demo_public`, {
      method: "POST", headers: { "Content-Type": "application/json", apikey: SUPABASE_PUBLISHABLE_KEY, Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}` },
      body: JSON.stringify({ p_jeton: jeton, p_compter: !new URLSearchParams(window.location.search).has("apercu") }),
    }).then((r) => (r.ok ? r.json() : null)).then((d: ConfigDemo | null) => {
      if (d?.agence) { demarrerDemo(d); document.title = `Démo ${d.agence} — Heavent Studio`; }
      setCfg(d?.agence ? d : null);
    }).catch(() => setCfg(null));
  }, [jeton]);

  if (cfg === undefined) return <div className="min-h-screen grid place-items-center bg-[#141414] text-[#E4D49A]"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  if (cfg === null) return (
    <div className="min-h-screen grid place-items-center bg-[#141414] text-white px-4 text-center">
      <Seo noindex />
      <div className="max-w-md">
        <img src="/marque-or.png" alt="" className="h-12 mx-auto" />
        <h1 className="font-serif text-3xl mt-6">Cette démo n'est plus disponible</h1>
        <p className="text-white/65 mt-3">Le lien a expiré ou a été désactivé. Demandez-en un nouveau, c'est gratuit.</p>
        <Link to="/studio#demo" className="inline-flex mt-6 rounded-full bg-[#C8B560] text-[#141414] font-medium px-6 h-11 items-center">Demander une démo</Link>
      </div>
    </div>
  );

  return (
    <>
      <Seo noindex />
      <div className="sticky top-0 z-[60] bg-[#141414] text-white border-b border-white/10" data-testid="bandeau-demo">
        <div className="max-w-6xl mx-auto px-2 sm:px-3 h-12 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#E4D49A] shrink-0 hidden sm:block" />
          <p className="hidden lg:block text-xs text-white/70 truncate max-w-[220px]">Démo personnalisée pour <b className="text-white">{cfg.agence}</b></p>
          <div className="flex-1 flex justify-center gap-1">
            {VUES.map(([v, long, court, I]) => (
              <button key={v} onClick={() => changerVue(v)} data-testid={`vue-${v}`}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 sm:px-4 h-8 text-xs sm:text-sm ${vue === v ? "bg-[#C8B560] text-[#141414] font-medium" : "text-white/75 hover:bg-white/10"}`}>
                <I className="h-3.5 w-3.5" /><span className="hidden sm:inline">{long}</span><span className="sm:hidden">{court}</span>
              </button>
            ))}
          </div>
          <Link to="/studio#demo" className="hidden md:inline-flex rounded-full bg-white text-[#141414] px-4 h-8 items-center text-xs font-medium shrink-0">Je veux cet outil</Link>
        </div>
      </div>
      <Suspense fallback={<div className="min-h-screen grid place-items-center"><Loader2 className="h-8 w-8 animate-spin text-[#A8933F]" /></div>}>
        {vue === "site" ? <DemoSite key={cle} cfg={cfg} versAdmin={() => changerVue("admin")} /> : vue === "crew" ? <StaffDashboard key={cle} /> : <Admin key={cle} />}
      </Suspense>
    </>
  );
}
