import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { BookOpen, Loader2 } from "lucide-react";
import { construireLivre } from "@/lib/livreSouvenirs";

interface Livre { chemin: string; nb_photos: number; nb_invites: number; taille_mo: number | null; created_at: string }

/** Préparation du livre souvenir d'un mariage : livre HTML hors ligne + photos, en ZIP, mis à disposition des mariés. */
export default function LivreSouvenirsAdmin({ devisId, noms, date, lieu }: { devisId: string; noms: string; date: string; lieu: string }) {
  const [livre, setLivre] = useState<Livre | null | undefined>(undefined);
  const [nb, setNb] = useState<{ photos: number; invites: number; masquees: number; derniere: string | null } | null>(null);
  const [occupe, setOccupe] = useState(false);
  const [etape, setEtape] = useState("");
  const [erreur, setErreur] = useState("");

  const charger = useCallback(async () => {
    const [l, s, p] = await Promise.all([
      (supabase as any).from("souvenirs_livres").select("chemin, nb_photos, nb_invites, taille_mo, created_at").eq("devis_id", devisId).maybeSingle(),
      (supabase as any).from("souvenirs_invites").select("id", { count: "exact", head: true }).eq("devis_id", devisId),
      (supabase as any).from("souvenirs_photos").select("masquee, created_at").eq("devis_id", devisId),
    ]);
    setLivre(l.data ?? null);
    const ph = (p.data ?? []) as { masquee: boolean; created_at: string }[];
    setNb({ photos: ph.filter((x) => !x.masquee).length, invites: s.count ?? 0, masquees: ph.filter((x) => x.masquee).length, derniere: ph.map((x) => x.created_at).sort().pop() ?? null });
  }, [devisId]);
  useEffect(() => { void charger(); }, [charger]);

  const preparer = async () => {
    setOccupe(true); setErreur(""); setEtape("Lecture des souvenirs…");
    try {
      const { data: invs, error: e1 } = await (supabase as any).from("souvenirs_invites").select("id, nom, mot, created_at").eq("devis_id", devisId).order("created_at");
      const { data: phs, error: e2 } = await (supabase as any).from("souvenirs_photos").select("souvenir_id, chemin, masquee, created_at").eq("devis_id", devisId).eq("masquee", false).order("created_at");
      if (e1 || e2) throw new Error("lecture");
      const invites = [] as { nom: string; mot: string | null; photos: Blob[] }[];
      let k = 0; const total = (phs ?? []).length;
      for (const i of invs ?? []) {
        const photos: Blob[] = [];
        for (const p of (phs ?? []).filter((x: any) => x.souvenir_id === i.id)) {
          setEtape(`Téléchargement ${++k}/${total}…`);
          const { data, error } = await supabase.storage.from("souvenirs").download(p.chemin);
          if (error || !data) throw new Error("photo");
          photos.push(data);
        }
        invites.push({ nom: i.nom, mot: i.mot, photos });
      }
      if (total > 280) { setErreur("Trop de photos pour un seul livre (plus de 280). Contactez Yassin."); setOccupe(false); setEtape(""); return; }
      if (!invites.some((i) => i.photos.length || i.mot)) { setErreur("Aucun souvenir à mettre dans le livre pour l'instant."); setOccupe(false); setEtape(""); return; }
      const dateTexte = date ? new Date(date + "T00:00:00Z").toLocaleDateString("fr-FR", { timeZone: "UTC", day: "numeric", month: "long", year: "numeric" }) : "";
      const pret = await construireLivre({ noms, dateTexte, lieu: lieu || null, invites }, setEtape);
      if (pret.zip.size > 52428800) throw new Error("trop gros");
      setEtape("Envoi du livre…");
      const chemin = `${devisId}.zip`;
      const up = await supabase.storage.from("livres-souvenirs").upload(chemin, pret.zip, { upsert: true, contentType: "application/zip" });
      if (up.error) throw up.error;
      const { error: e3 } = await (supabase as any).from("souvenirs_livres").upsert({ devis_id: devisId, chemin, nb_photos: pret.nbPhotos, nb_invites: pret.nbInvites, taille_mo: pret.tailleMo, created_at: new Date().toISOString() });
      if (e3) throw e3;
      await charger();
    } catch (e: any) {
      setErreur(e?.message === "trop gros" ? "Le livre dépasse 50 Mo : retirez quelques photos (côté mariés) puis recommencez." : "La préparation du livre a échoué. Réessayez.");
    }
    setOccupe(false); setEtape("");
  };

  const telecharger = async () => {
    if (!livre) return;
    const { data } = await supabase.storage.from("livres-souvenirs").createSignedUrl(livre.chemin, 600, { download: `livre-souvenir.zip` });
    if (data?.signedUrl) window.location.href = data.signedUrl; else setErreur("Le téléchargement n'a pas démarré. Réessayez.");
  };

  if (livre === undefined || !nb) return null;
  const vide = nb.photos === 0 && nb.invites === 0;
  const perime = !!livre && !!nb.derniere && nb.derniere > livre.created_at;
  const finPartage = date ? new Date(new Date(date + "T00:00:00Z").getTime() + 2 * 86400e3).toISOString().slice(0, 10) : null;
  const tropTot = !!finPartage && new Date().toLocaleDateString("en-CA", { timeZone: "Africa/Casablanca" }) <= finPartage;
  return (
    <div className="rounded-lg border p-3 space-y-2" data-testid="livre-souvenirs-admin">
      <div className="font-medium flex items-center gap-2"><BookOpen className="h-4 w-4 text-[#A8933F]" /> Livre souvenir</div>
      <p className="text-xs text-muted-foreground">{vide ? "Aucun souvenir déposé pour l'instant." : `${nb.invites} invité${nb.invites > 1 ? "s" : ""} · ${nb.photos} photo${nb.photos > 1 ? "s" : ""} dans le livre${nb.masquees ? ` (${nb.masquees} retirée${nb.masquees > 1 ? "s" : ""} par les mariés)` : ""}.`}</p>
      {livre && <p className="text-xs">Livre prêt : {livre.nb_photos} photo{livre.nb_photos > 1 ? "s" : ""}, {livre.taille_mo ?? "?"} Mo, préparé le {new Date(livre.created_at).toLocaleDateString("fr-FR")}. Les mariés peuvent le télécharger depuis leur onglet Souvenirs.</p>}
      {perime && <p className="text-xs text-[#8C6D22]" role="status">Des photos ont été ajoutées depuis la préparation : refaites le livre.</p>}
      {tropTot && !vide && <p className="text-xs text-[#8C6D22]">Le partage est ouvert jusqu'au {new Date(finPartage + "T00:00:00Z").toLocaleDateString("fr-FR", { timeZone: "UTC", day: "numeric", month: "long" })} : préparez le livre après cette date pour ne rien oublier.</p>}
      {livre && <p className="text-xs text-muted-foreground">Si les mariés retirent une photo après la préparation, refaites le livre.</p>}
      {erreur && <p className="text-xs text-[#B5483C]" role="alert">{erreur}</p>}
      <div className="flex flex-wrap gap-2">
        <Button type="button" size="sm" disabled={occupe || vide} onClick={() => void preparer()} data-testid="preparer-livre">
          {occupe ? <><Loader2 className="h-4 w-4 animate-spin mr-1" /> {etape || "En cours…"}</> : livre ? "Refaire le livre" : "Préparer le livre"}
        </Button>
        {livre && <Button type="button" size="sm" variant="outline" disabled={occupe} onClick={() => void telecharger()}>Télécharger une copie</Button>}
      </div>
    </div>
  );
}
