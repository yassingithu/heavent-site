import { supabase } from "@/integrations/supabase/client";
import { OUVERTURES, type OuvertureDef } from "@/lib/invitation";

/** Ouvertures vidéo ajoutées depuis l'administration : chargées une fois, puis ajoutées au registre (sans doublon). */
let chargement: Promise<void> | null = null;
export function chargerOuverturesPerso(force = false): Promise<void> {
  if (chargement && !force) return chargement;
  chargement = (async () => {
    try {
      const { data } = await (supabase as any).from("ouvertures_perso").select("id, nom, description, styles, video_url, poster_url, duree_ms").eq("actif", true).order("cree_le");
      for (const r of (data ?? []) as any[]) {
        const def: OuvertureDef = { id: r.id, nom: r.nom, description: r.description, duree: r.duree_ms, video: r.video_url, poster: r.poster_url, styles: r.styles ?? [], licence: "Ajoutée par l'administration" };
        const i = OUVERTURES.findIndex((o) => o.id === r.id);
        if (i >= 0) OUVERTURES[i] = def; else OUVERTURES.push(def);
      }
    } catch { /* table absente ou hors ligne : seules les ouvertures intégrées sont proposées */ }
  })();
  return chargement;
}

export const TAILLE_MAX = 4 * 1024 * 1024;
export const DUREE_MAX_S = 15;

/** Contrôle d'un fichier avant envoi : format, taille, durée, et extraction de l'affiche (1re image). */
export async function controlerVideo(f: File): Promise<{ duree: number; affiche: Blob }> {
  if (!["video/mp4", "video/webm"].includes(f.type)) throw new Error("Format refusé : MP4 ou WebM uniquement.");
  if (f.size > TAILLE_MAX) throw new Error(`Fichier trop lourd (${(f.size / 1048576).toFixed(1)} Mo) : 4 Mo maximum. Compressez la vidéo (540 px de large suffit).`);
  const url = URL.createObjectURL(f);
  try {
    const v = document.createElement("video");
    v.muted = true; v.playsInline = true; v.preload = "auto"; v.src = url;
    await new Promise<void>((ok, ko) => { v.onloadeddata = () => ok(); v.onerror = () => ko(new Error("Vidéo illisible dans ce navigateur.")); });
    if (!(v.duration >= 1 && v.duration <= DUREE_MAX_S)) throw new Error(`Durée de ${Math.round(v.duration)} s : entre 1 et ${DUREE_MAX_S} s attendues.`);
    if (v.videoWidth > 1100) throw new Error("Vidéo trop large : 1080 px maximum.");
    v.currentTime = 0.1;
    await new Promise<void>((ok) => { v.onseeked = () => ok(); });
    const c = document.createElement("canvas"); const k = Math.min(1, 540 / v.videoWidth);
    c.width = Math.round(v.videoWidth * k); c.height = Math.round(v.videoHeight * k);
    c.getContext("2d")!.drawImage(v, 0, 0, c.width, c.height);
    const affiche = await new Promise<Blob>((ok, ko) => c.toBlob((b) => (b ? ok(b) : ko(new Error("Affiche impossible."))), "image/webp", 0.8));
    return { duree: Math.round(v.duration * 1000), affiche };
  } finally { URL.revokeObjectURL(url); }
}
