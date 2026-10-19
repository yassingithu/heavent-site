import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, MapPin, Save } from "lucide-react";

/**
 * Fiche mission d'un événement : ce que voit chaque crew dans son espace (tenue, rendez-vous, contact, consignes)
 * et la position du lieu qui sert à vérifier le pointage.
 */
interface Fiche {
  tenue: string; point_rdv: string; heure_rdv: string; latitude: number | null; longitude: number | null; rayon_m: number;
  contact_nom: string; contact_telephone: string; consignes: string;
}
const VIDE: Fiche = { tenue: "", point_rdv: "", heure_rdv: "", latitude: null, longitude: null, rayon_m: 300, contact_nom: "", contact_telephone: "", consignes: "" };

/** Coordonnées dans un lien Google Maps / OpenStreetMap, ou « 33.57, -7.59 ». */
export function coordonneesDepuisTexte(t: string): { lat: number; lng: number } | null {
  const m = t.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/) ?? t.match(/[?&](?:q|query|ll|mlat)=(-?\d+\.\d+)[,&](?:mlon=)?(-?\d+\.\d+)/) ?? t.match(/^\s*(-?\d{1,2}\.\d+)\s*[,;]\s*(-?\d{1,3}\.\d+)\s*$/);
  if (!m) return null;
  const lat = Number(m[1]), lng = Number(m[2]);
  return Math.abs(lat) <= 90 && Math.abs(lng) <= 180 ? { lat, lng } : null;
}

export default function FicheMission({ devisId, lieu }: { devisId: string; lieu: string }) {
  const { toast } = useToast();
  const [f, setF] = useState<Fiche>(VIDE);
  const [existe, setExiste] = useState(false);
  const [recherche, setRecherche] = useState(false);
  const [lien, setLien] = useState("");

  useEffect(() => {
    (supabase as any).from("fiches_mission").select("*").eq("devis_id", devisId).maybeSingle().then(({ data }: any) => {
      if (data) {
        setExiste(true);
        setF({ ...VIDE, ...Object.fromEntries(Object.entries(data).map(([k, v]) => [k, v ?? (k === "latitude" || k === "longitude" ? null : "")])), heure_rdv: data.heure_rdv?.slice(0, 5) ?? "", rayon_m: data.rayon_m ?? 300 } as Fiche);
      } else { setExiste(false); setF(VIDE); }
    });
  }, [devisId]);

  const set = <K extends keyof Fiche>(k: K, v: Fiche[K]) => setF((x) => ({ ...x, [k]: v }));

  const localiser = async () => {
    const adresse = (f.point_rdv || lieu || "").trim();
    if (!adresse) { toast({ title: "Indique d'abord l'adresse ou le lieu", variant: "destructive" }); return; }
    setRecherche(true);
    try {
      const r = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=ma&q=${encodeURIComponent(adresse)}`, { headers: { "Accept-Language": "fr" } });
      const [res] = await r.json();
      if (!res) { toast({ title: "Adresse introuvable", description: "Colle plutôt le lien Google Maps du lieu ci-dessous.", variant: "destructive" }); return; }
      setF((x) => ({ ...x, latitude: Number(res.lat), longitude: Number(res.lon) }));
      toast({ title: "Lieu trouvé 📍", description: res.display_name });
    } catch { toast({ title: "Recherche impossible", description: "Colle le lien Google Maps du lieu ci-dessous.", variant: "destructive" }); }
    finally { setRecherche(false); }
  };
  const depuisLien = (t: string) => {
    setLien(t);
    const c = coordonneesDepuisTexte(t);
    if (c) { setF((x) => ({ ...x, latitude: c.lat, longitude: c.lng })); toast({ title: "Position enregistrée depuis le lien 📍" }); }
  };

  const enregistrer = async () => {
    const ligne = {
      devis_id: devisId, tenue: f.tenue || null, point_rdv: f.point_rdv || null, heure_rdv: f.heure_rdv || null,
      latitude: f.latitude, longitude: f.longitude, rayon_m: Math.min(5000, Math.max(50, Number(f.rayon_m) || 300)),
      contact_nom: f.contact_nom || null, contact_telephone: f.contact_telephone || null, consignes: f.consignes || null,
    };
    const { error } = await (supabase as any).from("fiches_mission").upsert(ligne, { onConflict: "devis_id" });
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    setExiste(true);
    toast({ title: "Fiche mission enregistrée ✅", description: "Chaque crew de l'équipe la voit dans son espace staff." });
  };

  const d = 0.004;
  const carte = f.latitude != null && f.longitude != null
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${f.longitude - d},${f.latitude - d},${f.longitude + d},${f.latitude + d}&layer=mapnik&marker=${f.latitude},${f.longitude}`
    : null;

  return (
    <Card data-testid="fiche-mission-admin">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Fiche mission {existe ? "" : <span className="text-xs font-normal text-amber-700">(à compléter)</span>}</CardTitle>
        <p className="text-xs text-muted-foreground">Visible par chaque crew de l'équipe dans son espace staff, avec le bouton de pointage le jour J.</p>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="grid gap-3 sm:grid-cols-2">
          <div><Label className="text-xs">Tenue</Label><Textarea rows={2} value={f.tenue} onChange={(e) => set("tenue", e.target.value)} placeholder="Ex. robe noire, chignon, talons noirs (fournis : foulard doré)" data-testid="fiche-tenue" /></div>
          <div><Label className="text-xs">Consignes</Label><Textarea rows={2} value={f.consignes} onChange={(e) => set("consignes", e.target.value)} placeholder="Ex. accueil des invités, vestiaire, pas de téléphone en service" /></div>
          <div><Label className="text-xs">Point de rendez-vous (adresse précise)</Label><Input value={f.point_rdv} onChange={(e) => set("point_rdv", e.target.value)} placeholder={lieu || "Ex. Sofitel Rabat, entrée du personnel"} data-testid="fiche-rdv" /></div>
          <div><Label className="text-xs">Heure de rendez-vous</Label><Input type="time" value={f.heure_rdv} onChange={(e) => set("heure_rdv", e.target.value)} /></div>
          <div><Label className="text-xs">Contact sur place (nom)</Label><Input value={f.contact_nom} onChange={(e) => set("contact_nom", e.target.value)} placeholder="Ex. Imane" /></div>
          <div><Label className="text-xs">Téléphone du contact</Label><Input type="tel" value={f.contact_telephone} onChange={(e) => set("contact_telephone", e.target.value)} placeholder="06…" /></div>
        </div>
        <div className="rounded-md border bg-muted/30 p-3 space-y-2">
          <div className="font-medium flex items-center gap-1"><MapPin className="h-4 w-4" /> Position du lieu (pour vérifier le pointage)</div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={localiser} disabled={recherche} data-testid="localiser">{recherche ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <MapPin className="h-4 w-4 mr-1" />} Trouver l'adresse</Button>
            <Input className="flex-1 min-w-[220px] h-9" value={lien} onChange={(e) => depuisLien(e.target.value)} placeholder="…ou colle le lien Google Maps du lieu" data-testid="lien-maps" />
          </div>
          {carte ? (
            <div className="space-y-1">
              <iframe title="Lieu de la mission" src={carte} className="w-full h-48 rounded border" loading="lazy" />
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                {f.latitude?.toFixed(5)}, {f.longitude?.toFixed(5)} · pointage accepté à
                <Input type="number" min={50} max={5000} step={50} className="h-7 w-20" value={f.rayon_m} onChange={(e) => set("rayon_m", Number(e.target.value))} /> m autour
              </div>
            </div>
          ) : <p className="text-xs text-muted-foreground">Sans position, les pointages sont enregistrés mais pas vérifiés automatiquement.</p>}
        </div>
        <Button onClick={enregistrer} className="w-full sm:w-auto" data-testid="enregistrer-fiche"><Save className="h-4 w-4 mr-1" /> Enregistrer la fiche mission</Button>
      </CardContent>
    </Card>
  );
}
