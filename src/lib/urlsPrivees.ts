import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Liens temporaires (1 h) pour des fichiers d'un dossier de stockage PRIVÉ.
 * Usage : const url = useUrlsPrivees("prestataires", [chemin1, chemin2]); <img src={url(chemin1) ?? undefined} />
 * Tant que le lien n'est pas prêt, url() renvoie null.
 */
export function useUrlsPrivees(bucket: string, chemins: (string | null | undefined)[]) {
  const [liens, setLiens] = useState<Record<string, string>>({});
  const cle = chemins.filter(Boolean).join("|");
  useEffect(() => {
    const manquants = (cle ? cle.split("|") : []).filter((c) => !liens[c]);
    if (!manquants.length) return;
    let vivant = true;
    supabase.storage.from(bucket).createSignedUrls(manquants, 3600).then(({ data }) => {
      if (!vivant || !data) return;
      setLiens((p) => ({ ...p, ...Object.fromEntries(data.filter((d) => d.signedUrl && d.path).map((d) => [d.path as string, d.signedUrl])) }));
    });
    return () => { vivant = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bucket, cle]);
  return (c: string | null | undefined): string | null => (c ? liens[c] ?? null : null);
}
