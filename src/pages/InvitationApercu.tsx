import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Seo from "@/components/Seo";
import NotFound from "@/pages/NotFound";
import Invitation from "@/components/invitation/Invitation";
import { supabase } from "@/integrations/supabase/client";
import type { InvitationReglages, Langue } from "@/lib/invitation";

interface Apercu { noms: string; date_evenement: string | null; lieu: string | null; message: string | null; invitation: InvitationReglages | null }

/** Aperçu offert à un couple : lien privé, non indexé, valable 30 jours. */
export default function InvitationApercu() {
  const { jeton = "" } = useParams();
  const [d, setD] = useState<Apercu | null | undefined>(undefined);
  const [langue, setLangue] = useState<Langue>("fr");

  useEffect(() => {
    if (!/^[0-9a-f-]{36}$/i.test(jeton)) { setD(null); return; }
    (supabase as any).rpc("invitation_apercu_public", { p_jeton: jeton }).then(({ data, error }: any) => setD(error || !data ? null : data));
  }, [jeton]);

  if (d === undefined) return <div className="min-h-screen grid place-items-center bg-[#141414] text-white"><Seo noindex /><Loader2 className="h-6 w-6 animate-spin" /></div>;
  if (d === null) return <><Seo noindex /><NotFound /></>;
  const langues = (
    <div className="inv-langues">
      {(["fr", "en", "ar"] as Langue[]).map((l) => (
        <button key={l} type="button" aria-pressed={langue === l} onClick={() => setLangue(l)}>{l === "fr" ? "FR" : l === "en" ? "EN" : "عربي"}</button>
      ))}
    </div>
  );
  return (
    <>
      <Seo noindex />
      <Invitation noms={d.noms} date={d.date_evenement} lieu={d.lieu} message={d.message} reglages={d.invitation} langue={langue} haut={langues}
        bas={<p className="inv-pied">Aperçu offert par Heavent People Agency</p>} />
    </>
  );
}
