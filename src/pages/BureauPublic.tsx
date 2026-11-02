import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Seo from "@/components/Seo";
import NotFound from "@/pages/NotFound";
import { FUNCTIONS_URL } from "@/integrations/supabase/client";
import page from "./bureauAgents.html?raw";

/**
 * Bureau des agents — version « lien secret » (vitrine) : /bureau/<clé>.
 * Pas de compte nécessaire. Sans la bonne clé : page introuvable. Non indexée, absente du plan du site.
 * Les données viennent de la fonction bureau-public (libellés généraux, aucun détail client).
 */
export default function BureauPublic() {
  const { cle = "" } = useParams();
  const [acces, setAcces] = useState<"attente" | "oui" | "non">("attente");
  const cadre = useRef<HTMLIFrameElement>(null);
  const lignes = useRef<unknown[]>([]);

  useEffect(() => {
    let vivant = true;
    const envoyer = () => cadre.current?.contentWindow?.postMessage({ type: "journal", rows: lignes.current }, window.location.origin);
    const charger = async () => {
      try {
        const r = await fetch(`${FUNCTIONS_URL}/bureau-public?cle=${encodeURIComponent(cle)}`, { cache: "no-store" });
        if (!vivant) return;
        if (r.status === 404) { setAcces("non"); return; }
        if (!r.ok) return;
        const d = await r.json();
        lignes.current = d.rows ?? [];
        setAcces("oui");
        envoyer();
      } catch { /* on réessaiera au prochain tour */ }
    };
    charger();
    const t = setInterval(charger, 15000);
    const ecoute = (e: MessageEvent) => { if (e.origin === window.location.origin && e.data?.type === "pret") envoyer(); };
    window.addEventListener("message", ecoute);
    return () => { vivant = false; clearInterval(t); window.removeEventListener("message", ecoute); };
  }, [cle]);

  if (acces === "attente") return <Seo noindex />;
  if (acces === "non") return <><Seo noindex /><NotFound /></>;
  return (
    <>
      <Seo noindex />
      <iframe ref={cadre} title="Le bureau des agents Heavent" srcDoc={page} style={{ position: "fixed", inset: 0, zIndex: 9999, width: "100%", height: "100%", border: 0, background: "#141414" }} />
    </>
  );
}
