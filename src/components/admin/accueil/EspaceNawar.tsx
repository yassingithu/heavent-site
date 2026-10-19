import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Instagram, LogOut, TrendingUp } from "lucide-react";
import Seo from "@/components/Seo";
import StatsSite from "@/components/admin/StatsSite";
import InstagramAdmin from "@/components/admin/instagram/InstagramAdmin";
import { CarteMotPapa, SurpriseBienvenue, useAccueil } from "./Accueil";

/**
 * L'espace de Nawar : le mot de papa chaque jour, sa lettre de bienvenue, et des onglets
 * sans aucune donnée personnelle (posts Instagram, statistiques globales du site).
 */
export default function EspaceNawar({ onDeconnexion }: { onDeconnexion: () => void }) {
  const { infos } = useAccueil();
  const [surpriseFermee, setSurpriseFermee] = useState(false);
  const [onglet, setOnglet] = useState("mot");

  return (
    <div className="admin-theme min-h-screen bg-[#FAF7EE]" data-testid="espace-nawar">
      <Seo noindex />
      {infos?.surprise && !surpriseFermee && (
        <SurpriseBienvenue surprise={infos.surprise} prenom={infos.prenom ?? "Nawar"} onFermer={() => setSurpriseFermee(true)} />
      )}
      <header className="bg-[#141414] text-white">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/marque-or.png" alt="" className="h-8 w-auto" />
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#E4D49A]">Heavent</div>
              <div className="font-serif text-lg leading-none">L'espace de Nawar</div>
            </div>
          </div>
          <button onClick={async () => { await supabase.auth.signOut(); onDeconnexion(); }} className="h-10 w-10 rounded-full hover:bg-white/10 flex items-center justify-center" aria-label="Se déconnecter">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      <Tabs value={onglet} onValueChange={setOnglet} className="max-w-5xl mx-auto px-4 py-6 space-y-5">
        <TabsList className="bg-white border border-[#EADFC8] rounded-full p-1 h-auto">
          <TabsTrigger value="mot" className="rounded-full px-4 py-2 gap-1.5 data-[state=active]:bg-[#141414] data-[state=active]:text-white"><Heart className="h-4 w-4" /> Mot de papa</TabsTrigger>
          <TabsTrigger value="instagram" className="rounded-full px-4 py-2 gap-1.5 data-[state=active]:bg-[#141414] data-[state=active]:text-white"><Instagram className="h-4 w-4" /> Instagram</TabsTrigger>
          <TabsTrigger value="stats" className="rounded-full px-4 py-2 gap-1.5 data-[state=active]:bg-[#141414] data-[state=active]:text-white"><TrendingUp className="h-4 w-4" /> Le site</TabsTrigger>
        </TabsList>
        <TabsContent value="mot">{infos ? <CarteMotPapa infos={infos} /> : <p className="text-sm text-muted-foreground">Chargement…</p>}</TabsContent>
        <TabsContent value="instagram"><InstagramAdmin famille /></TabsContent>
        <TabsContent value="stats"><StatsSite /></TabsContent>
      </Tabs>
    </div>
  );
}
