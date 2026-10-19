import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Seo from "@/components/Seo";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { TYPES_REALISATION } from "@/components/admin/RealisationsAdmin";
import { useTexte } from "@/i18n/textes";

interface Realisation { id: string; titre: string; type_evenement: string; lieu: string | null; date_evenement: string | null; description: string | null; photos: string[] }

/** Galerie publique des événements réalisés par l'agence (vraies photos, ajoutées depuis l'admin). */
export default function Realisations() {
  const x = useTexte();
  const [liste, setListe] = useState<Realisation[] | null>(null);
  const [filtre, setFiltre] = useState("tous");
  const [ouverte, setOuverte] = useState<{ r: Realisation; i: number } | null>(null);

  useEffect(() => {
    supabase.from("realisations").select("id, titre, type_evenement, lieu, date_evenement, description, photos")
      .eq("publie", true).order("ordre").order("date_evenement", { ascending: false })
      .then(({ data }) => setListe(((data ?? []) as Realisation[]).filter((r) => r.photos?.length)));
  }, []);

  const types = useMemo(() => TYPES_REALISATION.filter((t) => liste?.some((r) => r.type_evenement === t.id)), [liste]);
  const visibles = (liste ?? []).filter((r) => filtre === "tous" || r.type_evenement === filtre);
  const changer = (d: 1 | -1) => setOuverte((o) => (o ? { r: o.r, i: (o.i + d + o.r.photos.length) % o.r.photos.length } : o));

  return (
    <div className="min-h-screen bg-[#FBF8F1] text-[#2A2420]">
      {liste && liste.length ? <Seo page="realisations" /> : <Seo noindex />}
      <div className="container mx-auto px-4 py-12 sm:py-16 max-w-7xl space-y-8">
        <header className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="uppercase tracking-[0.25em] text-xs text-[#8C6D22]">{x("Nos réalisations")}</p>
          <h1 className="font-serif text-4xl sm:text-5xl">{x("Des événements qui nous ressemblent")}</h1>
          <p className="text-[#5E554A]">{x("Mariages, fêtes, soirées d'entreprise et salons : quelques moments que nous avons eu la joie d'organiser et d'accompagner.")}</p>
        </header>

        {liste === null ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{Array.from({ length: 6 }, (_, i) => <div key={i} className="aspect-[4/3] rounded-3xl bg-[#EFE7D6] animate-pulse" />)}</div>
        ) : liste.length === 0 ? (
          <div className="text-center py-10 space-y-4" data-testid="realisations-vide">
            <p className="text-[#5E554A]">{x("Nos premières réalisations en images arrivent très bientôt.")}</p>
            <Link to="/cree-ton-evenement" className="inline-flex rounded-full bg-[#141414] text-white px-6 min-h-11 items-center font-medium">{x("Imaginer mon événement")}</Link>
          </div>
        ) : (
          <>
            {types.length > 1 && (
              <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label={x("Filtrer par type d'événement")}>
                {[{ id: "tous", nom: "Tout" }, ...types].map((t) => (
                  <button key={t.id} role="tab" aria-selected={filtre === t.id} onClick={() => setFiltre(t.id)}
                    className={`rounded-full px-4 min-h-10 text-sm border transition-colors ${filtre === t.id ? "bg-[#2A2420] text-white border-[#2A2420]" : "bg-white border-[#E3D6BA] hover:bg-[#F6EEDC]"}`}>{t.nom}</button>
                ))}
              </div>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" data-testid="galerie">
              {visibles.map((r) => (
                <button key={r.id} onClick={() => setOuverte({ r, i: 0 })} className="group text-left rounded-3xl overflow-hidden bg-white border border-[#EADFC8] shadow-[0_20px_50px_-40px_rgba(140,109,34,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A74E]">
                  <div className="aspect-[4/3] overflow-hidden"><img src={r.photos[0]} alt={r.titre} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
                  <div className="p-4">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-[#8C6D22]">{TYPES_REALISATION.find((t) => t.id === r.type_evenement)?.nom}</div>
                    <div className="font-serif text-xl mt-1">{r.titre}</div>
                    {r.lieu && <div className="text-sm text-[#6B6155] flex items-center gap-1 mt-1"><MapPin className="h-3.5 w-3.5" />{r.lieu}</div>}
                  </div>
                </button>
              ))}
            </div>
            <div className="text-center pt-4">
              <Link to="/cree-ton-evenement" className="inline-flex rounded-full bg-[#141414] text-white px-6 min-h-12 items-center font-medium">{x("Créer mon événement")}</Link>
            </div>
          </>
        )}
      </div>

      <Dialog open={!!ouverte} onOpenChange={(v) => !v && setOuverte(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-black border-0" onKeyDown={(e) => { if (e.key === "ArrowRight") changer(1); if (e.key === "ArrowLeft") changer(-1); }}>
          {ouverte && (
            <div>
              <DialogTitle className="sr-only">{ouverte.r.titre}</DialogTitle>
              <div className="relative bg-black">
                <img src={ouverte.r.photos[ouverte.i]} alt={`${ouverte.r.titre} — photo ${ouverte.i + 1}`} className="w-full max-h-[75vh] object-contain" />
                {ouverte.r.photos.length > 1 && <>
                  <button onClick={() => changer(-1)} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2" aria-label={x("Photo précédente")}><ChevronLeft className="h-5 w-5" /></button>
                  <button onClick={() => changer(1)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2" aria-label={x("Photo suivante")}><ChevronRight className="h-5 w-5" /></button>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-white/90 bg-black/50 rounded-full px-2 py-0.5">{ouverte.i + 1} / {ouverte.r.photos.length}</div>
                </>}
              </div>
              <div className="bg-[#FBF8F1] p-4">
                <div className="font-serif text-xl">{ouverte.r.titre}</div>
                {ouverte.r.lieu && <div className="text-sm text-[#6B6155]">{ouverte.r.lieu}</div>}
                {ouverte.r.description && <p className="text-sm text-[#4A4238] mt-2 whitespace-pre-line">{ouverte.r.description}</p>}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
