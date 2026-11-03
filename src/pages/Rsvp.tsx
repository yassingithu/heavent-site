import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Seo from "@/components/Seo";
import { CheckCircle2, Loader2, Minus, Plus } from "lucide-react";
import Invitation from "@/components/invitation/Invitation";
import type { InvitationReglages } from "@/lib/invitation";

interface Infos {
  nom: string; nb_prevus: number; reponse: "attente" | "oui" | "non"; nb_confirmes: number | null; remarque: string | null;
  noms: string; date_evenement: string | null; lieu: string | null; message: string | null; date_limite: string | null; invitation?: InvitationReglages | null;
}
type Langue = "fr" | "en" | "ar";
const T = {
  fr: {
    invite: "Vous êtes invité(e) au mariage de", cher: "Bonjour", repondre: "Serez-vous des nôtres ?", oui: "Avec joie, je serai là", non: "Je ne pourrai pas venir",
    combien: "Nombre de personnes", mot: "Un mot pour les mariés, un régime alimentaire… (facultatif)", envoyer: "Envoyer ma réponse",
    merciOui: "Merci ! Votre présence est confirmée.", merciNon: "Merci de nous avoir prévenus.", modifier: "Modifier ma réponse",
    avant: "Merci de répondre avant le", introuvable: "Cette invitation est introuvable.", erreur: "La réponse n'a pas pu être envoyée. Réessayez.",
    close: "Les réponses sont closes pour ce mariage.", personnes: (n: number) => `${n} personne${n > 1 ? "s" : ""}`, locale: "fr-FR",
  },
  en: {
    invite: "You are invited to the wedding of", cher: "Dear", repondre: "Will you join us?", oui: "Joyfully accept", non: "Regretfully decline",
    combien: "Number of guests", mot: "A note for the couple, dietary needs… (optional)", envoyer: "Send my reply",
    merciOui: "Thank you! Your attendance is confirmed.", merciNon: "Thank you for letting us know.", modifier: "Change my reply",
    avant: "Kindly reply before", introuvable: "This invitation could not be found.", erreur: "Your reply could not be sent. Please try again.",
    close: "Replies are now closed for this wedding.", personnes: (n: number) => `${n} guest${n > 1 ? "s" : ""}`, locale: "en-GB",
  },
  ar: {
    invite: "يسعدنا دعوتكم لحضور حفل زفاف", cher: "مرحباً", repondre: "هل ستشرفوننا بحضوركم؟", oui: "بكل سرور، سأحضر", non: "للأسف لن أتمكن من الحضور",
    combien: "عدد الأشخاص", mot: "كلمة للعروسين، نظام غذائي… (اختياري)", envoyer: "إرسال ردي",
    merciOui: "شكراً! تم تأكيد حضوركم.", merciNon: "شكراً لإعلامنا.", modifier: "تعديل ردي",
    avant: "يرجى الرد قبل", introuvable: "هذه الدعوة غير موجودة.", erreur: "تعذر إرسال الرد. حاولوا مرة أخرى.",
    close: "انتهت فترة الرد على هذه الدعوة.", personnes: (n: number) => `${n} ${n > 1 ? "أشخاص" : "شخص"}`, locale: "ar-MA",
  },
};

export default function Rsvp() {
  const { jeton = "" } = useParams();
  const [langue, setLangue] = useState<Langue>(() => {
    const l = (typeof navigator !== "undefined" ? navigator.language : "fr").slice(0, 2);
    return l === "ar" ? "ar" : l === "en" ? "en" : "fr";
  });
  const t = T[langue];
  const [infos, setInfos] = useState<Infos | null | undefined>(undefined);
  const [choix, setChoix] = useState<"oui" | "non" | null>(null);
  const [nb, setNb] = useState(1);
  const [mot, setMot] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState("");
  const [edition, setEdition] = useState(false);

  useEffect(() => {
    (async () => {
      if (!/^[0-9a-f-]{36}$/i.test(jeton)) { setInfos(null); return; }
      const { data } = await (supabase as any).rpc("rsvp_public", { p_jeton: jeton });
      setInfos(data ?? null);
      if (data) { setNb(data.nb_confirmes || data.nb_prevus); setMot(data.remarque ?? ""); setChoix(data.reponse === "attente" ? null : data.reponse); }
    })();
  }, [jeton]);

  const dateTxt = (d: string) => new Date(d + "T00:00:00Z").toLocaleDateString(t.locale, { timeZone: "UTC", weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const passe = !!infos?.date_evenement && infos.date_evenement < new Date().toISOString().slice(0, 10);

  const envoyer = async () => {
    if (!choix || !infos) return;
    setEnvoi(true); setErreur("");
    const { error } = await (supabase as any).rpc("rsvp_repondre", { p_jeton: jeton, p_reponse: choix, p_nb: nb, p_remarque: mot });
    setEnvoi(false);
    if (error) { setErreur(t.erreur); return; }
    setInfos({ ...infos, reponse: choix, nb_confirmes: choix === "oui" ? nb : 0, remarque: mot });
    setEdition(false);
  };

  const repondu = infos && infos.reponse !== "attente" && !edition;

  const langues = (
    <div className="inv-langues">
      {(["fr", "en", "ar"] as Langue[]).map((l) => (
        <button key={l} type="button" aria-pressed={langue === l} onClick={() => setLangue(l)}>{l === "fr" ? "FR" : l === "en" ? "EN" : "عربي"}</button>
      ))}
    </div>
  );
  const pied = <p className="inv-pied">Heavent People Agency</p>;

  if (infos === undefined || infos === null) {
    return (
      <div className="inv inv-page" style={{ "--inv-fond": "#141414", "--inv-texte": "#FFFFFF", "--inv-sur-fond": "#FFFFFF" } as React.CSSProperties} dir={langue === "ar" ? "rtl" : "ltr"}>
        <Seo noindex />
        <div className="inv-colonne" data-testid="rsvp">
          {infos === undefined ? <Loader2 className="h-6 w-6 animate-spin mx-auto" /> : <p style={{ textAlign: "center" }}>{t.introuvable}</p>}
        </div>
      </div>
    );
  }

  return (
    <>
      <Seo noindex />
      <Invitation noms={infos.noms} date={infos.date_evenement} lieu={infos.lieu} message={infos.message} reglages={infos.invitation} langue={langue} invite={infos.nom}
        haut={langues} bas={pied}>
        <div data-testid="rsvp">
          {passe ? (
            <p style={{ textAlign: "center", fontSize: 14 }}>{t.close}</p>
          ) : repondu ? (
            <div style={{ textAlign: "center" }} data-testid="rsvp-merci">
              <CheckCircle2 className="h-8 w-8 mx-auto" style={{ color: "var(--inv-accent)" }} />
              <p style={{ fontWeight: 500, margin: "10px 0 4px" }}>{infos.reponse === "oui" ? t.merciOui : t.merciNon}</p>
              {infos.reponse === "oui" && <p style={{ fontSize: 14, opacity: .8, margin: 0 }}>{t.personnes(infos.nb_confirmes ?? 1)}</p>}
              <button type="button" onClick={() => setEdition(true)} className="inv-lien">{t.modifier}</button>
            </div>
          ) : (
            <div>
              <p className="inv-titre-suite">{t.repondre}</p>
              {(["oui", "non"] as const).map((c) => (
                <button key={c} type="button" onClick={() => setChoix(c)} aria-pressed={choix === c} data-testid={`rsvp-${c}`} className="inv-choix">
                  {c === "oui" ? t.oui : t.non}
                </button>
              ))}
              {choix === "oui" && infos.nb_prevus > 1 && (
                <div className="inv-ligne">
                  <span>{t.combien}</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
                    <button type="button" className="inv-rond" onClick={() => setNb(Math.max(1, nb - 1))} aria-label="-"><Minus className="h-4 w-4" /></button>
                    <strong data-testid="rsvp-nb" style={{ minWidth: 20, textAlign: "center" }}>{nb}</strong>
                    <button type="button" className="inv-rond" onClick={() => setNb(Math.min(infos.nb_prevus, nb + 1))} aria-label="+"><Plus className="h-4 w-4" /></button>
                  </span>
                </div>
              )}
              {choix && <textarea value={mot} onChange={(e) => setMot(e.target.value)} maxLength={300} rows={3} placeholder={t.mot} className="inv-champ" style={{ marginBottom: 8 }} />}
              {erreur && <p className="inv-erreur">{erreur}</p>}
              <button type="button" onClick={envoyer} disabled={!choix || envoi} data-testid="rsvp-envoyer" className="inv-btn">
                {envoi && <Loader2 className="h-4 w-4 animate-spin" />} {t.envoyer}
              </button>
              {infos.date_limite && <p style={{ fontSize: 12, textAlign: "center", opacity: .75, margin: "10px 0 0" }}>{t.avant} {dateTxt(infos.date_limite)}</p>}
            </div>
          )}
        </div>
      </Invitation>
    </>
  );
}
