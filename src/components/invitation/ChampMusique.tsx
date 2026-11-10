import { useEffect, useRef, useState } from "react";
import { Loader2, Music, Pause, Play, Trash2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

/** Musique d'ouverture : un fichier audio déposé (administration) ou un lien direct vers un fichier audio. */
const AUDIO = /\.(mp3|m4a|aac|ogg|wav)(\?.*)?$/i;
const TYPES = ["audio/mpeg", "audio/mp4", "audio/x-m4a", "audio/aac"];
const MAX = 10 * 1024 * 1024;
export const lienMusiqueValide = (u: string) => /^(https:\/\/|\/(?!\/))/.test(u.trim());

interface Props { valeur: string; onChange: (v: string) => void; estAdmin?: boolean; champ: string }

export default function ChampMusique({ valeur, onChange, estAdmin, champ }: Props) {
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState("");
  const [joue, setJoue] = useState(false);
  const audio = useRef<HTMLAudioElement | null>(null);
  const fichier = useRef<HTMLInputElement>(null);
  const u = valeur.trim();
  const depose = u.includes("/storage/v1/object/public/ouvertures/musique-");

  const arreter = () => { audio.current?.pause(); audio.current = null; setJoue(false); };
  useEffect(() => arreter, []);
  useEffect(() => { arreter(); setErreur(""); }, [u]);

  const ecouter = () => {
    if (joue) { arreter(); return; }
    setErreur("");
    const a = new Audio(u); audio.current = a;
    a.onended = () => setJoue(false);
    a.onerror = () => { setJoue(false); setErreur("Ce lien ne se lit pas : ce n'est pas un fichier audio. Téléchargez le morceau (MP3) puis déposez le fichier ici."); };
    a.play().then(() => setJoue(true)).catch(() => { setJoue(false); setErreur("Ce lien ne se lit pas : ce n'est pas un fichier audio. Téléchargez le morceau (MP3) puis déposez le fichier ici."); });
  };

  const deposer = async (f: File | undefined) => {
    if (!f) return;
    setErreur("");
    const ext = (f.name.split(".").pop() ?? "").toLowerCase();
    if (!TYPES.includes(f.type) && !["mp3", "m4a", "aac"].includes(ext)) { setErreur("Choisissez un fichier audio MP3 ou M4A."); return; }
    if (f.size > MAX) { setErreur("Ce fichier dépasse 10 Mo. Exportez-le en MP3 (qualité standard) ou coupez-le à 2 ou 3 minutes."); return; }
    setEnvoi(true);
    try {
      const e = ["m4a", "aac"].includes(ext) ? ext : "mp3";
      const type = e === "mp3" ? "audio/mpeg" : e === "m4a" ? "audio/mp4" : "audio/aac";
      const chemin = `musique-${crypto.randomUUID()}.${e}`;
      const { error } = await supabase.storage.from("ouvertures").upload(chemin, f, { contentType: type, cacheControl: "31536000" });
      if (error) throw error;
      onChange(supabase.storage.from("ouvertures").getPublicUrl(chemin).data.publicUrl);
    } catch { setErreur("Le dépôt n'a pas abouti. Vérifiez votre connexion, puis réessayez."); }
    finally { setEnvoi(false); if (fichier.current) fichier.current.value = ""; }
  };

  const retirer = async () => {
    arreter();
    if (depose && estAdmin) { const nom = u.split("/ouvertures/")[1]?.split("?")[0]; if (nom) void supabase.storage.from("ouvertures").remove([nom]); }
    onChange("");
  };

  return (
    <div data-testid="invitation-musique">
      <p className="text-sm">Musique à l'ouverture (facultatif)</p>
      {u && depose ? (
        <div className="mt-1 flex flex-wrap items-center gap-2 rounded-xl border border-[#E3D6BA] bg-white px-3 py-2">
          <Music className="h-4 w-4 text-[#8E7333]" aria-hidden="true" />
          <span className="text-sm mr-auto">Musique déposée</span>
          <button type="button" onClick={ecouter} className="inline-flex items-center gap-1.5 rounded-full border border-[#DCCBA6] px-3 min-h-10 text-sm hover:bg-[#FBF6E9]">{joue ? <><Pause className="h-4 w-4" /> Arrêter</> : <><Play className="h-4 w-4" /> Écouter</>}</button>
          <button type="button" onClick={retirer} className="inline-flex items-center gap-1.5 rounded-full border border-[#DCCBA6] px-3 min-h-10 text-sm hover:bg-[#FBF6E9]"><Trash2 className="h-4 w-4" /> Retirer</button>
        </div>
      ) : (
        <>
          {estAdmin && (
            <div className="mt-1">
              <input ref={fichier} type="file" accept=".mp3,.m4a,.aac,audio/mpeg,audio/mp4,audio/aac" className="sr-only" id="inv-musique-fichier" data-testid="invitation-musique-fichier" onChange={(e) => deposer(e.target.files?.[0])} />
              <label htmlFor="inv-musique-fichier" className={`inline-flex items-center gap-2 rounded-full bg-[#141414] text-white px-4 min-h-11 text-sm cursor-pointer ${envoi ? "opacity-60 pointer-events-none" : ""}`}>
                {envoi ? <><Loader2 className="h-4 w-4 animate-spin" /> Dépôt en cours…</> : <><Upload className="h-4 w-4" /> Déposer un fichier MP3</>}
              </label>
              <p className="text-xs text-[#6B6154] mt-2">Sur Epidemic Sound : bouton « Download » du morceau, format MP3, puis déposez le fichier ici (10 Mo au plus).</p>
            </div>
          )}
          <label className="block text-sm mt-3">{estAdmin ? "Ou un lien direct vers un fichier audio" : "Lien direct vers un fichier audio (MP3)"}
            <span className="mt-1 flex gap-2">
              <input className={champ} value={valeur} maxLength={300} inputMode="url" placeholder="https://…/ma-musique.mp3" data-testid="invitation-musique-lien" onChange={(e) => onChange(e.target.value)} />
              {u && lienMusiqueValide(u) && <button type="button" onClick={ecouter} className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-[#DCCBA6] px-3 min-h-10 text-sm hover:bg-[#FBF6E9]">{joue ? <><Pause className="h-4 w-4" /> Arrêter</> : <><Play className="h-4 w-4" /> Écouter</>}</button>}
            </span>
          </label>
          {u && !lienMusiqueValide(u) && <p className="text-xs text-[#9A3B2E] mt-1" role="alert">Le lien doit commencer par https://</p>}
          {u && lienMusiqueValide(u) && !AUDIO.test(u) && !erreur && <p className="text-xs text-[#8A5A12] mt-1">Ce lien ne finit pas par .mp3 : une page de site (Epidemic Sound, YouTube, Spotify) ne peut pas être lue. Appuyez sur « Écouter » pour vérifier.</p>}
        </>
      )}
      {erreur && <p className="text-xs text-[#9A3B2E] mt-1" role="alert">{erreur}</p>}
      <p className="text-xs text-[#6B6154] mt-2">Elle démarre quand l'invité ouvre l'invitation, avec un bouton pour la couper. N'utilisez qu'un morceau dont vous avez les droits.</p>
    </div>
  );
}
