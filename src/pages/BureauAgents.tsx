import { useEffect, useRef, useState } from "react";
import Seo from "@/components/Seo";
import NotFound from "@/pages/NotFound";
import { supabase } from "@/integrations/supabase/client";
import { estAdmin } from "@/lib/admin";
import page from "./bureauAgents.html?raw";

/**
 * Bureau des agents : page PRIVÉE (aucun lien sur le site, absente du plan du site, non indexée).
 * Réservée aux administrateurs : pour tout autre visiteur elle s'affiche comme une page introuvable.
 * Les traces viennent de la table journal_agents (écrite par les agents) et des publications Instagram.
 */
export default function BureauAgents() {
  const [acces, setAcces] = useState<"attente" | "oui" | "non">("attente");
  const cadre = useRef<HTMLIFrameElement>(null);
  const lignes = useRef<unknown[]>([]);

  useEffect(() => {
    let vivant = true;
    supabase.auth.getSession().then(async ({ data }) => {
      const ok = data.session ? await estAdmin() : false;
      if (vivant) setAcces(ok ? "oui" : "non");
    });
    return () => { vivant = false; };
  }, []);

  useEffect(() => {
    if (acces !== "oui") return;
    const envoyer = () => cadre.current?.contentWindow?.postMessage({ type: "journal", rows: lignes.current }, window.location.origin);
    const charger = async () => {
      const db = supabase as any;
      const debut = new Date(Date.now() - 36 * 3600e3).toISOString();
      const fin = new Date(Date.now() + 48 * 3600e3).toISOString();
      const [j, ig] = await Promise.all([
        db.from("journal_agents").select("agent,action,statut,cree_le").order("cree_le", { ascending: false }).limit(80),
        db.from("posts_instagram").select("titre,compte,statut,date_prevue,publie_le").gte("date_prevue", debut).lte("date_prevue", fin).order("date_prevue", { ascending: false }).limit(20),
      ]);
      const insta = ((ig.data ?? []) as any[]).map((p) => ({
        agent: "instagram",
        action: `${p.compte === "nawar" ? "Nawar" : "Heavent"} : ${p.titre ?? "publication"}`,
        statut: p.statut === "publie" ? "termine" : p.statut === "erreur" ? "erreur" : "prevu",
        cree_le: p.publie_le ?? p.date_prevue,
      })).filter((p) => p.statut !== "prevu" || new Date(p.cree_le).getTime() > Date.now());
      lignes.current = [...(j.data ?? []), ...insta];
      envoyer();
    };
    charger();
    const t = setInterval(charger, 15000);
    const ecoute = (e: MessageEvent) => { if (e.origin === window.location.origin && e.data?.type === "pret") envoyer(); };
    window.addEventListener("message", ecoute);
    return () => { clearInterval(t); window.removeEventListener("message", ecoute); };
  }, [acces]);

  if (acces === "attente") return <Seo noindex />;
  if (acces === "non") return <><Seo noindex /><NotFound /></>;
  return (
    <>
      <Seo noindex />
      <iframe ref={cadre} title="Bureau des agents Heavent" srcDoc={page} style={{ position: "fixed", inset: 0, zIndex: 9999, width: "100%", height: "100%", border: 0, background: "#141414" }} />
    </>
  );
}
