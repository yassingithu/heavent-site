import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Upload } from "lucide-react";
import { STYLES_OUVERTURE } from "@/lib/invitation";
import { chargerOuverturesPerso, controlerVideo } from "@/lib/ouverturesPerso";

const slug = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 30);

/** Ajout d'une ouverture vidéo par l'administration : contrôles (format, poids, durée), affiche automatique, aucune ligne de code. */
export default function ImportOuverture({ onAjoutee }: { onAjoutee: (id: string) => void }) {
  const [nom, setNom] = useState("");
  const [styles, setStyles] = useState<string[]>([]);
  const [fichier, setFichier] = useState<File | null>(null);
  const [etat, setEtat] = useState<{ type: "ok" | "err" | "cours"; texte: string } | null>(null);

  const envoyer = async () => {
    if (!fichier || nom.trim().length < 2) return;
    setEtat({ type: "cours", texte: "Contrôle de la vidéo…" });
    try {
      const { duree, affiche } = await controlerVideo(fichier);
      const id = `perso-${slug(nom)}-${Date.now().toString(36).slice(-3)}`;
      const ext = fichier.type === "video/webm" ? "webm" : "mp4";
      setEtat({ type: "cours", texte: "Envoi…" });
      const cache = "31536000";
      const v = await supabase.storage.from("ouvertures").upload(`${id}.${ext}`, fichier, { contentType: fichier.type, cacheControl: cache });
      if (v.error) throw new Error("L'envoi a échoué (connexion ou droits). Réessayez ; si cela continue, prévenez le développeur. — " + v.error.message);
      const a = await supabase.storage.from("ouvertures").upload(`${id}-poster.webp`, affiche, { contentType: "image/webp", cacheControl: cache });
      if (a.error) throw new Error("L'envoi de l'affiche a échoué. Réessayez. — " + a.error.message);
      const url = (p: string) => supabase.storage.from("ouvertures").getPublicUrl(p).data.publicUrl;
      const { error } = await (supabase as any).from("ouvertures_perso").insert({ id, nom: nom.trim(), styles, video_url: url(`${id}.${ext}`), poster_url: url(`${id}-poster.webp`), duree_ms: duree });
      if (error) throw new Error(error.message);
      await chargerOuverturesPerso(true);
      setEtat({ type: "ok", texte: "Ajoutée et sélectionnée : voir l'aperçu." });
      setNom(""); setFichier(null); setStyles([]); onAjoutee(id);
    } catch (e: any) { setEtat({ type: "err", texte: e.message || "Échec de l'ajout." }); }
  };

  return (
    <details className="mt-4 rounded-2xl border border-[#E3D6BA] p-3 text-sm" data-testid="import-ouverture">
      <summary className="cursor-pointer font-medium">Ajouter une ouverture vidéo</summary>
      <p className="text-xs text-[#6B6154] mt-2">MP4 ou WebM, 4 Mo maximum, 1 à 15 secondes, sans son, format vertical conseillé. L'affiche d'attente est créée automatiquement.</p>
      <div className="grid gap-2 mt-2">
        <input className="rounded-lg border border-[#E3D6BA] px-3 py-2 min-h-11" placeholder="Nom (ex. Porte du riad)" value={nom} onChange={(e) => setNom(e.target.value)} maxLength={60} aria-label="Nom de l'ouverture" />
        <input type="file" accept="video/mp4,video/webm" onChange={(e) => setFichier(e.target.files?.[0] ?? null)} aria-label="Fichier vidéo" />
        <p className="text-xs text-[#6B6154]">Styles (facultatif) : pour la retrouver dans les filtres.</p>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Styles (facultatif)">
          {STYLES_OUVERTURE.map((st) => (
            <button key={st} type="button" aria-pressed={styles.includes(st)} onClick={() => setStyles((s) => (s.includes(st) ? s.filter((x) => x !== st) : [...s, st]))}
              className={`rounded-full border px-3 py-1.5 text-xs min-h-11 ${styles.includes(st) ? "bg-[#141414] text-white border-[#141414]" : "border-[#E3D6BA]"}`}>{st}</button>
          ))}
        </div>
        <button type="button" onClick={envoyer} disabled={!fichier || nom.trim().length < 2 || etat?.type === "cours"} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#141414] text-white px-4 min-h-11 disabled:opacity-40">
          <Upload className="h-4 w-4" /> Ajouter
        </button>
        {!fichier || nom.trim().length < 2 ? <p className="text-xs text-[#6B6154]">Il manque : {[nom.trim().length < 2 && "le nom", !fichier && "la vidéo"].filter(Boolean).join(" et ")}.</p> : null}
        {etat && <p role="status" className={`text-xs ${etat.type === "err" ? "text-[#8A2E26]" : "text-[#5E554A]"}`}>{etat.texte}</p>}
      </div>
    </details>
  );
}
