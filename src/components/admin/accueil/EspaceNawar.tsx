import { useLayoutEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut } from "lucide-react";
import Seo from "@/components/Seo";
import StatsSite from "@/components/admin/StatsSite";
import InstagramAdmin from "@/components/admin/instagram/InstagramAdmin";
import { CarteMotPapa, SurpriseBienvenue, useAccueil } from "./Accueil";
import "@/styles/admin-seuil.css";

/** Petites lumières qui montent dans la brume (positions fixes : pas de saut au rendu) */
const LUEURS = [
  [6, 11, 0, 18], [17, 13, 4.2, -14], [28, 10, 7.5, 22], [39, 14, 1.8, -20], [51, 12, 9.1, 16],
  [62, 9.5, 3.1, -12], [71, 13.5, 6.4, 24], [80, 11, 0.9, -18], [89, 12.5, 5.2, 14], [95, 10.5, 8.3, -10],
];
const ONGLETS = [["mot", "Mot de papa"], ["instagram", "Instagram"], ["stats", "Le site"]] as const;

/**
 * L'espace de Nawar : le mot de papa chaque jour, sa lettre de bienvenue, et des onglets
 * sans aucune donnée personnelle (posts Instagram, statistiques globales du site).
 * Ambiance nuit ambrée : brume et lumières en transform/opacity, figées si « réduire les animations ».
 */
export default function EspaceNawar({ onDeconnexion }: { onDeconnexion: () => void }) {
  const { infos } = useAccueil();
  const [surpriseFermee, setSurpriseFermee] = useState(false);
  const [onglet, setOnglet] = useState("mot");
  const liste = useRef<HTMLDivElement>(null);
  const goutte = useRef<HTMLSpanElement>(null);

  // La goutte glisse sous l'onglet choisi (et s'étire à mi-chemin)
  useLayoutEffect(() => {
    const placer = () => {
      const t = liste.current?.querySelector<HTMLElement>(`[data-onglet="${onglet}"]`);
      if (t && goutte.current) goutte.current.style.setProperty("--gx", `${t.offsetLeft + t.offsetWidth / 2 - 4}px`);
    };
    placer();
    const g = goutte.current;
    if (g) { g.classList.remove("coule"); void g.offsetWidth; g.classList.add("coule"); }
    addEventListener("resize", placer);
    return () => removeEventListener("resize", placer);
  }, [onglet]);

  return (
    <div className="n-espace" data-testid="espace-nawar">
      <Seo noindex />
      <div className="n-brume" aria-hidden="true">
        <div className="n-nappe a" /><div className="n-nappe b" /><div className="n-nappe c" />
        {LUEURS.map(([x, d, r, dx], i) => (
          <span key={i} className="n-lueur" style={{ left: `${x}%`, ["--d" as string]: `${d}s`, ["--r" as string]: `${r}s`, ["--x" as string]: `${dx}px` }} />
        ))}
      </div>
      {infos?.surprise && !surpriseFermee && (
        <SurpriseBienvenue surprise={infos.surprise} prenom={infos.prenom ?? "Nawar"} onFermer={() => setSurpriseFermee(true)} />
      )}
      <header className="n-tete">
        <img src="/seuil/mono-or.png" alt="Heavent" />
        <button onClick={async () => { await supabase.auth.signOut(); onDeconnexion(); }} className="n-rond" aria-label="Se déconnecter">
          <LogOut className="h-4 w-4" />
        </button>
      </header>
      <div className="n-titre">
        <div><small>L'espace de</small><h1>Nawar</h1></div>
        <img src="/marque-nawar.png" alt="" />
      </div>

      <Tabs value={onglet} onValueChange={setOnglet}>
        <div className="max-w-5xl mx-auto">
          <TabsList ref={liste} className="n-onglets" aria-label="Rubriques">
            {ONGLETS.map(([v, nom]) => <TabsTrigger key={v} value={v} data-onglet={v}>{nom}</TabsTrigger>)}
            <span ref={goutte} className="n-goutte" aria-hidden="true" />
          </TabsList>
        </div>
        <div className="n-panneau">
          <TabsContent value="mot" className="mt-0">{infos ? <CarteMotPapa infos={infos} /> : <p className="text-sm text-[#CBBDA2]">Chargement…</p>}</TabsContent>
          <TabsContent value="instagram" className="mt-0"><InstagramAdmin famille /></TabsContent>
          <TabsContent value="stats" className="mt-0"><div className="bg-[#F3ECDD] text-[#141414] p-3 sm:p-4"><StatsSite /></div></TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
