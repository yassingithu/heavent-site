import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Seo from "@/components/Seo";
import { CheckCircle2, Heart, Loader2, Minus, Plus } from "lucide-react";

interface Infos {
  nom: string; nb_prevus: number; reponse: "attente" | "oui" | "non"; nb_confirmes: number | null; remarque: string | null;
  noms: string; date_evenement: string | null; lieu: string | null; message: string | null; date_limite: string | null;
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

  return (
    <div className="relative overflow-hidden min-h-screen bg-[#141414] text-white flex items-center justify-center px-4 py-10" dir={langue === "ar" ? "rtl" : "ltr"}>
      <Seo noindex />
      <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(circle_at_15%_15%,#C8B560_0,transparent_40%),radial-gradient(circle_at_85%_85%,#A8933F_0,transparent_40%)]" />
      <div className="relative w-full max-w-md">
        <div className="flex justify-center gap-1 mb-4 text-xs">
          {(["fr", "en", "ar"] as Langue[]).map((l) => (
            <button key={l} onClick={() => setLangue(l)} className={`rounded-full px-3 py-1 ${langue === l ? "bg-white text-[#141414]" : "text-white/70 hover:text-white"}`}>{l === "fr" ? "FR" : l === "en" ? "EN" : "عربي"}</button>
          ))}
        </div>
        <div className="rounded-[2rem] bg-[#FBF8F1] text-[#2A2420] p-7 sm:p-9 text-center shadow-2xl" data-testid="rsvp">
          {infos === undefined ? (
            <Loader2 className="h-6 w-6 animate-spin mx-auto text-[#8C6D22]" />
          ) : infos === null ? (
            <p>{t.introuvable}</p>
          ) : (
            <div className="space-y-5">
              <Heart className="h-7 w-7 mx-auto text-[#C8B560] fill-[#C8B560]" />
              <div className="space-y-1">
                <p className="text-sm text-[#6B6155]">{t.cher} {infos.nom},</p>
                <p className="text-sm text-[#6B6155]">{t.invite}</p>
                <h1 className="font-serif text-3xl sm:text-4xl leading-tight" data-testid="rsvp-noms">{infos.noms}</h1>
                {infos.date_evenement && <p className="text-[#8C6D22] font-medium pt-1">{dateTxt(infos.date_evenement)}</p>}
                {infos.lieu && <p className="text-sm text-[#6B6155]">{infos.lieu}</p>}
              </div>
              {infos.message && <p className="text-sm italic text-[#4A4238] whitespace-pre-line border-y border-[#EADFC8] py-4">{infos.message}</p>}

              {passe ? (
                <p className="text-sm text-[#6B6155]">{t.close}</p>
              ) : repondu ? (
                <div className="space-y-3" data-testid="rsvp-merci">
                  <CheckCircle2 className="h-8 w-8 mx-auto text-[#2F5A2A]" />
                  <p className="font-medium">{infos.reponse === "oui" ? t.merciOui : t.merciNon}</p>
                  {infos.reponse === "oui" && <p className="text-sm text-[#6B6155]">{t.personnes(infos.nb_confirmes ?? 1)}</p>}
                  <button onClick={() => setEdition(true)} className="text-sm text-[#8C6D22] underline">{t.modifier}</button>
                </div>
              ) : (
                <div className="space-y-4 text-start">
                  <p className="font-serif text-xl text-center">{t.repondre}</p>
                  <div className="grid gap-2">
                    {(["oui", "non"] as const).map((c) => (
                      <button key={c} onClick={() => setChoix(c)} data-testid={`rsvp-${c}`}
                        className={`rounded-2xl border px-4 min-h-12 text-sm font-medium transition ${choix === c ? "bg-[#141414] text-white border-[#141414]" : "bg-white border-[#E3D6BA] hover:bg-[#FAF7EE]"}`}>
                        {c === "oui" ? t.oui : t.non}
                      </button>
                    ))}
                  </div>
                  {choix === "oui" && infos.nb_prevus > 1 && (
                    <div className="flex items-center justify-between rounded-2xl border border-[#E3D6BA] bg-white px-4 py-2">
                      <span className="text-sm">{t.combien}</span>
                      <div className="flex items-center gap-3">
                        <button onClick={() => setNb(Math.max(1, nb - 1))} className="h-9 w-9 rounded-full border border-[#DCCBA6] flex items-center justify-center" aria-label="-"><Minus className="h-4 w-4" /></button>
                        <span className="w-6 text-center font-semibold" data-testid="rsvp-nb">{nb}</span>
                        <button onClick={() => setNb(Math.min(infos.nb_prevus, nb + 1))} className="h-9 w-9 rounded-full border border-[#DCCBA6] flex items-center justify-center" aria-label="+"><Plus className="h-4 w-4" /></button>
                      </div>
                    </div>
                  )}
                  {choix && (
                    <textarea value={mot} onChange={(e) => setMot(e.target.value)} maxLength={300} rows={3} placeholder={t.mot}
                      className="w-full rounded-2xl border border-[#E3D6BA] bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8B560]/50" />
                  )}
                  {erreur && <p className="text-sm text-[#8A2E26]">{erreur}</p>}
                  <button onClick={envoyer} disabled={!choix || envoi} data-testid="rsvp-envoyer"
                    className="w-full rounded-full bg-[#A8933F] text-white min-h-12 font-medium disabled:opacity-50 inline-flex items-center justify-center gap-2">
                    {envoi && <Loader2 className="h-4 w-4 animate-spin" />} {t.envoyer}
                  </button>
                  {infos.date_limite && <p className="text-xs text-center text-[#8C6D22]">{t.avant} {dateTxt(infos.date_limite)}</p>}
                </div>
              )}
            </div>
          )}
        </div>
        <p className="text-center text-[11px] text-white/50 mt-4">Heavent People Agency</p>
      </div>
    </div>
  );
}
