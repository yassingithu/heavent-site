import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Seo from "@/components/Seo";
import NotFound from "@/pages/NotFound";
import Invitation from "@/components/invitation/Invitation";
import { supabase } from "@/integrations/supabase/client";
import type { InvitationReglages, Langue } from "@/lib/invitation";

interface Apercu { mode?: "test" | "final"; avec_reponse?: boolean; noms: string; date_evenement: string | null; lieu: string | null; message: string | null; invitation: InvitationReglages | null }

/** Aperçu offert à un couple : lien privé, non indexé, valable 30 jours. */
const PIED = { fr: "Aperçu offert par Heavent People Agency", en: "Preview offered by Heavent People Agency", ar: "معاينة مقدمة من Heavent People Agency" } as const;
const FILI = { fr: "Aperçu · non valable", en: "Preview · not valid", ar: "معاينة · غير صالحة" } as const;
const DEMO = {
  fr: { q: "Serez-vous des nôtres ?", oui: "Avec joie, je serai là", non: "Je ne pourrai pas venir", merci: "Merci, votre réponse est enregistrée.", prenom: "Prénom", nom: "Nom", avec: "Je viens accompagné(e)", seul: "Seul(e)", plus: (n: number) => `+${n}`, accomp: "Prénom (et nom si possible) de la personne qui vous accompagne", envoyer: "Envoyer ma réponse", nomRequis: "Indiquez votre prénom et votre nom.", accompRequis: "Indiquez le prénom de chaque personne qui vous accompagne.", ferme: "Cette invitation n'accepte plus de réponses : contactez les mariés.", modifier: "Modifier ma réponse", recap: (c: string) => c === "oui" ? "Vous avez répondu : présent(e)" : "Vous avez répondu : absent(e)", echec: "Réponse non enregistrée, réessayez.", note: "Démonstration : vos invités répondent ici avec leur nom (retrouvé dans votre liste), et les accompagnants si vous les autorisez. Vous êtes prévenus." },
  en: { q: "Will you join us?", oui: "Joyfully accept", non: "Regretfully decline", merci: "Thank you, your answer is saved.", prenom: "First name", nom: "Last name", avec: "I am bringing a guest", seul: "Just me", plus: (n: number) => `+${n}`, accomp: "First and last name of your guest", envoyer: "Send my reply", nomRequis: "Please enter your first and last name.", accompRequis: "Please enter the name of each guest you bring.", ferme: "This invitation no longer accepts replies: please contact the couple.", modifier: "Change my reply", recap: (c: string) => c === "oui" ? "Your reply: attending" : "Your reply: not attending", echec: "Reply not saved, please try again.", note: "Demo: your guests reply here with their name (matched to your list), plus guests if you allow them. You are notified." },
  ar: { q: "هل ستشرفوننا بحضوركم؟", oui: "بكل سرور، سأحضر", non: "للأسف لن أتمكن من الحضور", merci: "شكراً، تم تسجيل ردكم.", prenom: "الاسم الشخصي", nom: "اسم العائلة", avec: "سأحضر برفقة", seul: "وحدي", plus: (n: number) => `+${n}`, accomp: "الاسم الكامل لمرافقكم", envoyer: "إرسال ردي", nomRequis: "اكتبوا الاسم الشخصي والعائلي.", accompRequis: "اكتبوا اسم كل مرافق.", ferme: "لم تعد هذه الدعوة تقبل الردود: تواصلوا مع العروسين.", modifier: "تعديل ردي", recap: (c: string) => c === "oui" ? "ردكم: سأحضر" : "ردكم: لن أحضر", echec: "لم يتم تسجيل الرد، أعيدوا المحاولة.", note: "نموذج تجريبي: يرد ضيوفكم هنا باسمهم (يُطابَق مع قائمتكم) ومع مرافقيهم إن سمحتم بذلك. يصلكم الإشعار." },
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
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    if (!/^[0-9a-f-]{36}$/i.test(jeton)) { setD(null); return; }
    (supabase as any).rpc("invitation_apercu_public", { p_jeton: jeton }).then(({ data, error }: any) => setD(error || !data ? null : data));
  }, [jeton]);

  const final = d?.mode === "final";
  const envoyer = async (c: "oui" | "non") => {
    if (!final) { setRep(c); return; }
    const nom = `${prenom} ${famille}`.trim();
    if (nom.length < 2) { setErreur(DEMO[langue].nomRequis); return; }
    if (c === "oui" && Array.from({ length: plus }, (_, k) => (accomps[k] ?? "").trim()).some((v) => v.length < 2)) { setErreur(DEMO[langue].accompRequis); return; }
    setEnvoi(true); setErreur("");
    const { error } = await (supabase as any).rpc("invitation_repondre", { p_jeton: jeton, p_nom: nom, p_reponse: c, p_accompagnants: c === "oui" ? accomps.slice(0, plus).map((x) => x.trim()) : [] });
    setEnvoi(false);
    if (error) { setErreur(/ferm/i.test(error.message ?? "") ? DEMO[langue].ferme : DEMO[langue].echec); return; }
    setRep(c);
  };

  if (d === undefined) return <div className="min-h-screen grid place-items-center bg-[#141414] text-white"><Seo noindex /><Loader2 className="h-6 w-6 animate-spin" /></div>;
  if (d === null) return <><Seo noindex /><NotFound /></>;
  const avecRsvp = d.avec_reponse !== false;
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
      {!final && <div className="inv-filigrane" aria-hidden="true" data-testid="apercu-filigrane"><span lang={langue}>{FILI[langue]}</span></div>}
      <Invitation noms={d.noms} date={d.date_evenement} lieu={d.lieu} message={d.message} reglages={d.invitation} langue={langue} haut={langues}
        bas={final ? undefined : <p className="inv-pied">{PIED[langue]}</p>}>
        {avecRsvp && <div data-testid="apercu-rsvp">
          {rep ? (
            <div style={{ textAlign: "center" }}>
              <CheckCircle2 className="h-8 w-8 mx-auto" style={{ color: "var(--inv-accent)" }} />
              <p style={{ fontWeight: 500, margin: "10px 0 4px" }}>{DEMO[langue].merci}</p>
              {final && <><p style={{ fontSize: 13, margin: "0 0 8px" }}>{DEMO[langue].recap(rep)}</p><button type="button" className="inv-lien" onClick={() => { setRep(null); setChoix(rep); }}>{DEMO[langue].modifier}</button></>}
              {!final && <button type="button" className="inv-lien" aria-label="Recommencer" onClick={() => { setRep(null); setChoix(null); setPlus(0); setAccomps([]); }}>↺</button>}
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
              {choix && <button type="button" className="inv-btn" disabled={envoi} onClick={() => envoyer(choix)} data-testid="apercu-envoyer">{DEMO[langue].envoyer}</button>}
            </>
          )}
          {erreur && <p role="alert" style={{ fontSize: 13, textAlign: "center", margin: "8px 0 0" }}>{erreur}</p>}
          {!final && <p style={{ fontSize: 11, textAlign: "center", opacity: .65, margin: "10px 0 0" }}>{DEMO[langue].note}</p>}
        </div>}
      </Invitation>
    </>
  );
}
