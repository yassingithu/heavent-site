import { lazy, Suspense, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader2, Sparkles, X } from "lucide-react";
import Seo from "@/components/Seo";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "@/integrations/supabase/client";
import { demarrerDemo, vraiFetch } from "@/demo/serveurDemo";
import type { ConfigDemo } from "@/demo/donneesDemo";

const Admin = lazy(() => import("./Admin"));

/** Démo personnalisée Heavent Studio : la vraie administration, sur des données fictives au nom de l'agence du prospect. */
export default function StudioDemo() {
  const { jeton } = useParams();
  const [cfg, setCfg] = useState<ConfigDemo | null | undefined>(undefined);
  const [bandeau, setBandeau] = useState(true);

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
      {bandeau && (
        <div className="sticky top-0 z-[60] bg-[#C8B560] text-[#141414] text-sm" data-testid="bandeau-demo">
          <div className="max-w-6xl mx-auto px-3 py-2 flex items-center gap-3">
            <Sparkles className="h-4 w-4 shrink-0" />
            <p className="flex-1 leading-snug"><b>Démo personnalisée pour {cfg.agence}</b><span className="hidden sm:inline"> · données fictives : explorez librement, créez un devis, rien n'est envoyé.</span></p>
            <Link to="/studio#demo" className="hidden sm:inline-flex rounded-full bg-[#141414] text-white px-4 h-8 items-center text-xs font-medium shrink-0">Je veux cet outil</Link>
            <button onClick={() => setBandeau(false)} aria-label="Masquer" className="shrink-0"><X className="h-4 w-4" /></button>
          </div>
        </div>
      )}
      <Suspense fallback={<div className="min-h-screen grid place-items-center"><Loader2 className="h-8 w-8 animate-spin text-[#A8933F]" /></div>}>
        <Admin />
      </Suspense>
    </>
  );
}
