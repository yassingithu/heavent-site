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
  fr: { q: "Serez-vous des nôtres ?", oui: "Avec joie, je serai là", non: "Je ne pourrai pas venir", merci: "Merci, votre réponse est enregistrée.", prenom: "Prénom", nom: "Nom", avec: "Je viens accompagné(e)", seul: "Seul(e)", plus: (n: number) => `+${n}`, accomp: "Prénom et nom de la personne qui vous accompagne", envoyer: "Envoyer ma réponse", note: "Démonstration : vos invités répondent ici avec leur nom (retrouvé dans votre liste), et les accompagnants si vous les autorisez. Vous êtes prévenus." },
  en: { q: "Will you join us?", oui: "Joyfully accept", non: "Regretfully decline", merci: "Thank you, your answer is saved.", prenom: "First name", nom: "Last name", avec: "I am bringing a guest", seul: "Just me", plus: (n: number) => `+${n}`, accomp: "First and last name of your guest", envoyer: "Send my reply", note: "Demo: your guests reply here with their name (matched to your list), plus guests if you allow them. You are notified." },
  ar: { q: "هل ستشرفوننا بحضوركم؟", oui: "بكل سرور، سأحضر", non: "للأسف لن أتمكن من الحضور", merci: "شكراً، تم تسجيل ردكم.", prenom: "الاسم الشخصي", nom: "اسم العائلة", avec: "سأحضر برفقة", seul: "وحدي", plus: (n: number) => `+${n}`, accomp: "الاسم الكامل لمرافقكم", envoyer: "إرسال ردي", note: "نموذج تجريبي: يرد ضيوفكم هنا باسمهم (يُطابَق مع قائمتكم) ومع مرافقيهم إن سمحتم بذلك. يصلكم الإشعار." },
} as const;

export default function InvitationApercu() {
  const { jeton = "" } = useParams();
  const [d, setD] = useState<Apercu | null | undefined>(undefined);
  const [langue, setLangue] = useState<Langue>("fr");
  const [rep, setRep] = useState<"oui" | "non" | null>(null);
  const [choix, setChoix] = useState<"oui" | "non" | null>(null);
  const [prenom, setPrenom] = useState("");
  const [famille, setFamille] = useState("");
  const [plus, setPlus] = useState(0);
  const [accomps, setAccomps] = useState<string[]>([]);

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
              <button type="button" className="inv-lien" aria-label="Recommencer" onClick={() => { setRep(null); setChoix(null); setPlus(0); setAccomps([]); }}>↺</button>
            </div>
          ) : (
            <>
              <p className="inv-titre-suite">{DEMO[langue].q}</p>
              <input className="inv-champ" style={{ marginBottom: 8 }} value={prenom} onChange={(e) => setPrenom(e.target.value)} placeholder={DEMO[langue].prenom} autoComplete="given-name" maxLength={40} data-testid="apercu-prenom" />
              <input className="inv-champ" style={{ marginBottom: 8 }} value={famille} onChange={(e) => setFamille(e.target.value)} placeholder={DEMO[langue].nom} autoComplete="family-name" maxLength={40} data-testid="apercu-nom" />
              {(["oui", "non"] as const).map((c) => <button key={c} type="button" className="inv-choix" aria-pressed={choix === c} onClick={() => setChoix(c)} data-testid={`apercu-${c}`}>{DEMO[langue][c]}</button>)}
              {choix === "oui" && (
                <>
                  <label style={{ display: "block", fontSize: 13, margin: "6px 0" }}>{DEMO[langue].avec}
                    <select className="inv-champ" style={{ marginTop: 4 }} value={plus} onChange={(e) => setPlus(Number(e.target.value))} data-testid="apercu-plus">
                      <option value={0}>{DEMO[langue].seul}</option>
                      <option value={1}>{DEMO[langue].plus(1)}</option>
                      <option value={2}>{DEMO[langue].plus(2)}</option>
                    </select>
                  </label>
                  {Array.from({ length: plus }, (_, k) => <input key={k} className="inv-champ" style={{ marginBottom: 8 }} value={accomps[k] ?? ""} onChange={(e) => setAccomps((a) => { const c = [...a]; c[k] = e.target.value; return c; })} placeholder={plus > 1 ? `${DEMO[langue].accomp} ${k + 1}` : DEMO[langue].accomp} maxLength={80} data-testid={k === 0 ? "apercu-accompagnant" : `apercu-accompagnant-${k + 1}`} />)}
                </>
              )}
              {choix && <button type="button" className="inv-btn" disabled={choix === "oui" && plus > 0 && !Array.from({ length: plus }, (_, k) => (accomps[k] ?? "").trim()).every((v) => v.length >= 5 && v.split(/\s+/).length >= 2)} onClick={() => setRep(choix)} data-testid="apercu-envoyer">{DEMO[langue].envoyer}</button>}
            </>
          )}
          <p style={{ fontSize: 11, textAlign: "center", opacity: .65, margin: "10px 0 0" }}>{DEMO[langue].note}</p>
        </div>
      </Invitation>
    </>
  );
}
