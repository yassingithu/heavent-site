import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, Loader2 } from "lucide-react";

/**
 * Demande de retrait / signalement d'une photo souvenir.
 * Rien n'est supprimé automatiquement : la demande est transmise à l'agence, qui décide et répond.
 * `token` : lien des mariés (photo précise possible) ou lien personnel d'un invité (demande générale).
 */
type Langue = "fr" | "en" | "ar";
const T = {
  fr: {
    ouvrir: "Signaler / demander un retrait", photo: "Signaler cette photo", motif: "Pourquoi ?", message: "Précisions", contact: "E-mail ou téléphone pour vous répondre (facultatif)",
    envoyer: "Envoyer la demande", envoi: "Envoi…", annuler: "Annuler", merci: "Demande reçue. Heavent l'examine et vous répond : la photo n'est pas supprimée automatiquement.",
    erreur: "La demande n'est pas partie. Réessayez dans un instant.", trop: "Trop de demandes en peu de temps. Réessayez dans une heure ou contactez l'agence.", court: "Décrivez en quelques mots la photo ou la situation.",
    intro: "Une personne apparaît sur une photo et ne le souhaite pas, ou une photo pose problème ? Dites-le-nous : l'agence examine chaque demande.",
    m: { retrait: "Je veux la supprimer définitivement", mineur: "Un enfant ou un mineur apparaît", moi_sur_photo: "Je suis sur une photo et je souhaite son retrait", inapproprie: "Photo inappropriée", autre: "Autre raison" },
  },
  en: {
    ouvrir: "Report / request removal", photo: "Report this photo", motif: "Why?", message: "Details", contact: "E-mail or phone so we can reply (optional)",
    envoyer: "Send request", envoi: "Sending…", annuler: "Cancel", merci: "Request received. Heavent will review it and reply: the photo is not deleted automatically.",
    erreur: "The request was not sent. Please try again in a moment.", trop: "Too many requests in a short time. Try again in an hour or contact the agency.", court: "Please describe the photo or the situation in a few words.",
    intro: "Does someone appear in a photo and not wish to, or is a photo a problem? Tell us: the agency reviews every request.",
    m: { retrait: "I want it permanently deleted", mineur: "A child or minor appears", moi_sur_photo: "I am in a photo and want it removed", inapproprie: "Inappropriate photo", autre: "Another reason" },
  },
  ar: {
    ouvrir: "إبلاغ / طلب حذف", photo: "الإبلاغ عن هذه الصورة", motif: "لماذا؟", message: "تفاصيل", contact: "بريد إلكتروني أو هاتف للرد عليكم (اختياري)",
    envoyer: "إرسال الطلب", envoi: "جارٍ الإرسال…", annuler: "إلغاء", merci: "تم استلام الطلب. ستدرسه Heavent وتردّ عليكم: لا تُحذف الصورة تلقائياً.",
    erreur: "لم يُرسل الطلب. حاولوا مرة أخرى بعد قليل.", trop: "طلبات كثيرة في وقت قصير. حاولوا بعد ساعة أو اتصلوا بالوكالة.", court: "صفوا الصورة أو الوضعية في بضع كلمات.",
    intro: "هل يظهر شخص في صورة دون رغبته، أو هل تسبب صورة مشكلة؟ أخبرونا: تدرس الوكالة كل طلب.",
    m: { retrait: "أريد حذفها نهائياً", mineur: "يظهر طفل أو قاصر", moi_sur_photo: "أظهر في صورة وأريد حذفها", inapproprie: "صورة غير لائقة", autre: "سبب آخر" },
  },
};

export default function SignalerRetrait({ token, photoId, source, langue = "fr", sombre = false }: { token: string; photoId?: string; source: "maries" | "invite"; langue?: Langue; sombre?: boolean }) {
  const t = T[langue];
  const motifs = source === "maries" ? (["retrait", "mineur", "inapproprie", "autre"] as const) : (["moi_sur_photo", "mineur", "autre"] as const);
  const [ouvert, setOuvert] = useState(false);
  const [motif, setMotif] = useState<string>(motifs[0]);
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [etat, setEtat] = useState<"saisie" | "envoi" | "fait">("saisie");
  const [erreur, setErreur] = useState<string | null>(null);

  const envoyer = async () => {
    setErreur(null);
    if (!photoId && message.trim().length < 5) { setErreur(t.court); return; }
    setEtat("envoi");
    const { data, error } = await (supabase as any).rpc("souvenir_signaler", { p_token: token, p_photo: photoId ?? null, p_motif: motif, p_message: message, p_contact: contact });
    if (error || !data?.ok) { setEtat("saisie"); setErreur(data?.erreur === "trop" ? t.trop : t.erreur); return; }
    setEtat("fait");
  };

  if (etat === "fait") return <p className="flex items-start gap-2 text-xs text-[#4E6B3A] p-2" role="status"><CheckCircle2 className="h-4 w-4 shrink-0" /> {t.merci}</p>;
  if (!ouvert) return <button type="button" onClick={() => setOuvert(true)} className={`text-[11px] uppercase tracking-[.12em] underline underline-offset-4 ${sombre ? "text-[#E4D49A]" : "text-[#6B6155]"} min-h-11 px-1`} data-testid="signaler-ouvrir">{photoId ? t.photo : t.ouvrir}</button>;
  return (
    <div className="space-y-2 border border-[#EADFC8] bg-[#FDFBF5] p-3 text-sm text-[#2A2420]" dir={langue === "ar" ? "rtl" : "ltr"} data-testid="signaler-form">
      {!photoId && <p className="text-xs text-[#6B6155]">{t.intro}</p>}
      <label className="block text-xs">{t.motif}
        <select value={motif} onChange={(e) => setMotif(e.target.value)} className="mt-1 block w-full min-h-11 border border-[#DCCBA6] bg-white px-2 text-base">
          {motifs.map((m) => <option key={m} value={m}>{t.m[m]}</option>)}
        </select>
      </label>
      <label className="block text-xs">{t.message}
        <textarea value={message} onChange={(e) => setMessage(e.target.value.slice(0, 1000))} rows={3} className="mt-1 block w-full border border-[#DCCBA6] bg-white p-2 text-base" />
      </label>
      <label className="block text-xs">{t.contact}
        <input value={contact} onChange={(e) => setContact(e.target.value.slice(0, 200))} className="mt-1 block w-full min-h-11 border border-[#DCCBA6] bg-white px-2 text-base" autoComplete="off" />
      </label>
      {erreur && <p className="text-xs text-[#B5483C]" role="alert">{erreur}</p>}
      <div className="flex flex-wrap gap-2">
        <button type="button" disabled={etat === "envoi"} onClick={() => void envoyer()} className="inline-flex items-center gap-1.5 border border-[#A8933F] px-4 min-h-11 text-xs uppercase tracking-[.12em] hover:bg-[#141414] hover:text-[#E4D49A] disabled:opacity-50" data-testid="signaler-envoyer">
          {etat === "envoi" ? <><Loader2 className="h-4 w-4 animate-spin" /> {t.envoi}</> : t.envoyer}
        </button>
        <button type="button" onClick={() => setOuvert(false)} className="px-3 min-h-11 text-xs uppercase tracking-[.12em] underline underline-offset-4">{t.annuler}</button>
      </div>
    </div>
  );
}
