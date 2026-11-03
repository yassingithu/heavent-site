import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Seo from "@/components/Seo";
import NotFound from "@/pages/NotFound";
import Invitation from "@/components/invitation/Invitation";
import { supabase } from "@/integrations/supabase/client";
import type { InvitationReglages, Langue } from "@/lib/invitation";

interface Apercu { noms: string; date_evenement: string | null; lieu: string | null; message: string | null; invitation: InvitationReglages | null }

/** Aperçu offert à un couple : lien privé, non indexé, valable 30 jours. */
const PIED = { fr: "Aperçu offert par Heavent People Agency", en: "Preview offered by Heavent People Agency", ar: "معاينة مقدمة من Heavent People Agency" } as const;
const DEMO = {
  fr: { q: "Serez-vous des nôtres ?", oui: "Avec joie, je serai là", non: "Je ne pourrai pas venir", merci: "Merci, votre réponse est enregistrée.", note: "Démonstration : vos invités répondent ici en un clic, et vous êtes prévenus." },
  en: { q: "Will you join us?", oui: "Joyfully accept", non: "Regretfully decline", merci: "Thank you, your answer is saved.", note: "Demo: your guests answer here in one tap, and you are notified." },
  ar: { q: "هل ستشرفوننا بحضوركم؟", oui: "بكل سرور، سأحضر", non: "للأسف لن أتمكن من الحضور", merci: "شكراً، تم تسجيل ردكم.", note: "نموذج تجريبي: يرد ضيوفكم هنا بضغطة واحدة ويصلكم الإشعار." },
} as const;

export default function InvitationApercu() {
  const { jeton = "" } = useParams();
  const [d, setD] = useState<Apercu | null | undefined>(undefined);
  const [langue, setLangue] = useState<Langue>("fr");
  const [rep, setRep] = useState<"oui" | "non" | null>(null);

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
        bas={<p className="inv-pied">{PIED[langue]}</p>}>
        <div data-testid="apercu-rsvp">
          {rep ? (
            <div style={{ textAlign: "center" }}>
              <CheckCircle2 className="h-8 w-8 mx-auto" style={{ color: "var(--inv-accent)" }} />
              <p style={{ fontWeight: 500, margin: "10px 0 4px" }}>{DEMO[langue].merci}</p>
              <button type="button" className="inv-lien" aria-label="Recommencer" onClick={() => setRep(null)}>↺</button>
            </div>
          ) : (
            <>
              <p className="inv-titre-suite">{DEMO[langue].q}</p>
              {(["oui", "non"] as const).map((c) => <button key={c} type="button" className="inv-choix" onClick={() => setRep(c)} data-testid={`apercu-${c}`}>{DEMO[langue][c]}</button>)}
            </>
          )}
          <p style={{ fontSize: 11, textAlign: "center", opacity: .65, margin: "10px 0 0" }}>{DEMO[langue].note}</p>
        </div>
      </Invitation>
    </>
  );
}
