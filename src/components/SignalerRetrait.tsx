import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

/**
 * Demande de retrait d'une photo souvenir.
 * Rien n'est supprimé automatiquement : la demande est transmise à l'agence, qui l'examine et décide.
 * `token` : lien des mariés (photo précise possible) ou lien personnel d'un invité (demande générale).
 * `sombre` : page des invités (fond noir, classes inv-*) ; sinon espace des mariés (crème, filets or).
 */
type Langue = "fr" | "en" | "ar";
const T = {
  fr: {
    ouvrir: "Une photo vous gêne ? Demander son retrait", photo: "Demander la suppression", motif: "Pourquoi ?", message: "Précisions", contact: "E-mail ou téléphone", exemple: "Ex. : photo de la table 4, mon fils au premier plan",
    envoyer: "Envoyer la demande", envoi: "Envoi…", annuler: "Annuler",
    merci: "Nous avons bien reçu votre demande. Nous l'examinons avec soin et revenons vers vous.", merciPlus: "Aucune photo n'est supprimée automatiquement.", mercMasquee: "La photo est masquée du livre en attendant notre réponse (vous pouvez la remettre).",
    sansContact: "Sans e-mail ni téléphone, nous ne pourrons pas vous répondre.", contactRequis: "Indiquez un e-mail ou un téléphone pour que nous puissions vous répondre.",
    erreur: "La demande n'est pas partie. Réessayez dans un instant.", trop: "Trop de demandes en peu de temps. Réessayez dans une heure ou contactez l'agence.", court: "Décrivez en quelques mots la photo ou la situation.",
    intro: "Une personne apparaît sur une photo et ne le souhaite pas ? Dites-le-nous : l'agence examine chaque demande.",
    m: { retrait: "Je souhaite qu'elle soit supprimée", mineur: "Un enfant ou un mineur apparaît", moi_sur_photo: "Je suis sur une photo et je souhaite son retrait", erreur_envoi: "J'ai envoyé une photo par erreur", inapproprie: "Photo inappropriée", autre: "Autre raison" },
  },
  en: {
    ouvrir: "A photo bothers you? Request its removal", photo: "Request deletion", motif: "Why?", message: "Details", contact: "E-mail or phone", exemple: "E.g. photo of table 4, my son in the foreground",
    envoyer: "Send request", envoi: "Sending…", annuler: "Cancel",
    merci: "We have received your request. We will review it carefully and get back to you.", merciPlus: "No photo is deleted automatically.", mercMasquee: "The photo is hidden from the book until we reply (you can put it back).",
    sansContact: "Without an e-mail or phone number we will not be able to reply.", contactRequis: "Please give an e-mail or phone number so that we can reply.",
    erreur: "The request was not sent. Please try again in a moment.", trop: "Too many requests in a short time. Try again in an hour or contact the agency.", court: "Please describe the photo or the situation in a few words.",
    intro: "Does someone appear in a photo and not wish to? Tell us: the agency reviews every request.",
    m: { retrait: "I would like it to be deleted", mineur: "A child or minor appears", moi_sur_photo: "I am in a photo and want it removed", erreur_envoi: "I sent a photo by mistake", inapproprie: "Inappropriate photo", autre: "Another reason" },
  },
  ar: {
    ouvrir: "صورة تزعجكم؟ اطلبوا حذفها", photo: "طلب حذف الصورة", motif: "لماذا؟", message: "تفاصيل", contact: "بريد إلكتروني أو هاتف", exemple: "مثال: صورة الطاولة 4، ابني في المقدمة",
    envoyer: "إرسال الطلب", envoi: "جارٍ الإرسال…", annuler: "إلغاء",
    merci: "تم استلام طلبكم. سندرسه بعناية ونعود إليكم.", merciPlus: "لا تُحذف أي صورة تلقائياً.", mercMasquee: "الصورة مخفية من الكتاب في انتظار ردنا (يمكنكم إرجاعها).",
    sansContact: "بدون بريد إلكتروني أو هاتف لن نتمكن من الرد عليكم.", contactRequis: "أدخلوا بريداً إلكترونياً أو هاتفاً لنتمكن من الرد عليكم.",
    erreur: "لم يُرسل الطلب. حاولوا مرة أخرى بعد قليل.", trop: "طلبات كثيرة في وقت قصير. حاولوا بعد ساعة أو اتصلوا بالوكالة.", court: "صفوا الصورة أو الوضعية في بضع كلمات.",
    intro: "هل يظهر شخص في صورة دون رغبته؟ أخبرونا: تدرس الوكالة كل طلب.",
    m: { retrait: "أرغب في حذفها", mineur: "يظهر طفل أو قاصر", moi_sur_photo: "أظهر في صورة وأريد حذفها", erreur_envoi: "أرسلت صورة عن طريق الخطأ", inapproprie: "صورة غير لائقة", autre: "سبب آخر" },
  },
};

export default function SignalerRetrait({ token, photoId, source, langue = "fr", sombre = false, onOuvre, onEnvoye }: {
  token: string; photoId?: string; source: "maries" | "invite"; langue?: Langue; sombre?: boolean;
  onOuvre?: (ouvert: boolean) => void; onEnvoye?: (motif: string) => void;
}) {
  const t = T[langue];
  const ar = langue === "ar";
  const motifs = (source === "maries" ? ["retrait", "mineur", "inapproprie", "autre"] : ["moi_sur_photo", "erreur_envoi", "mineur", "autre"]) as (keyof typeof t.m)[];
  const [ouvert, setOuvert] = useState(false);
  const [motif, setMotif] = useState<string>(motifs[0]);
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [etat, setEtat] = useState<"saisie" | "envoi" | "fait">("saisie");
  const [erreur, setErreur] = useState<string | null>(null);
  const [masquee, setMasquee] = useState(false);
  const refMotif = useRef<HTMLSelectElement>(null);
  const refLien = useRef<HTMLButtonElement>(null);
  const refMerci = useRef<HTMLDivElement>(null);
  useEffect(() => { if (ouvert) refMotif.current?.focus(); }, [ouvert]);
  useEffect(() => { if (etat === "fait") refMerci.current?.focus(); }, [etat]);
  const bascule = (v: boolean) => { setOuvert(v); onOuvre?.(v); if (!v) setTimeout(() => refLien.current?.focus(), 0); };

  const envoyer = async () => {
    setErreur(null);
    if (!photoId && message.trim().length < 5) { setErreur(t.court); return; }
    if (source === "invite" && contact.trim().length < 5) { setErreur(t.contactRequis); return; }
    setEtat("envoi");
    const { data, error } = await (supabase as any).rpc("souvenir_signaler", { p_token: token, p_photo: photoId ?? null, p_motif: motif === "erreur_envoi" ? "retrait" : motif, p_message: motif === "erreur_envoi" ? `(Photo envoyée par erreur) ${message}` : message, p_contact: contact });
    if (error || !data?.ok) { setEtat("saisie"); setErreur(data?.erreur === "trop" ? t.trop : t.erreur); return; }
    setMasquee(!!photoId && (motif === "mineur" || motif === "retrait"));
    onEnvoye?.(motif);
    setEtat("fait");
    onOuvre?.(false);
  };

  const rtl = ar ? "rtl:tracking-normal rtl:normal-case rtl:text-sm" : "";
  const lien = sombre ? "inv-lien" : `text-[12px] uppercase tracking-[.12em] underline underline-offset-4 text-[#6B6155] min-h-11 px-1 ${rtl}`;
  const champ = sombre ? "inv-champ" : "mt-1 block w-full min-h-11 border border-[#A8933F] bg-white px-2 text-base";

  const confirmation = (
    <div ref={refMerci} tabIndex={-1} role="status" aria-live="polite" className={`outline-none ${etat === "fait" ? "sr-entre" : ""}`}>
      {etat === "fait" && (
        <div className={sombre ? "inv-signal" : "p-2 text-[#3F5A2E] text-sm"} dir={ar ? "rtl" : "ltr"}>
          <span className="sr-filet" aria-hidden="true" />
          <p style={sombre ? { margin: 0, fontSize: 14 } : { margin: 0 }}>{t.merci}</p>
          <p style={{ margin: "6px 0 0", fontSize: 12, opacity: .85 }}>{masquee ? t.mercMasquee : t.merciPlus}</p>
        </div>
      )}
    </div>
  );
  if (etat === "fait") return confirmation;
  if (!ouvert) return <button ref={refLien} type="button" onClick={() => bascule(true)} className={lien} dir={ar ? "rtl" : "ltr"} data-testid="signaler-ouvrir">{photoId ? t.photo : t.ouvrir}</button>;
  return (
    <div className={`sr-entre ${sombre ? "inv-signal" : "space-y-2 border border-[#EADFC8] bg-[#FDFBF5] p-3 text-sm text-[#2A2420] text-start"}`} dir={ar ? "rtl" : "ltr"} data-testid="signaler-form">
      {!photoId && <p style={{ margin: "0 0 10px", fontSize: 13 }} className={sombre ? "" : "text-xs text-[#6B6155]"}>{t.intro}</p>}
      <label className={sombre ? "inv-etiq" : "block text-xs"} style={sombre ? { display: "block", marginBottom: 6 } : undefined}>{t.motif}
        <select ref={refMotif} value={motif} onChange={(e) => setMotif(e.target.value)} className={champ}>
          {motifs.map((m) => <option key={m} value={m}>{t.m[m]}</option>)}
        </select>
      </label>
      <label className={sombre ? "inv-etiq" : "block text-xs"} style={sombre ? { display: "block", margin: "10px 0 6px" } : undefined}>{t.message}
        <textarea value={message} onChange={(e) => setMessage(e.target.value.slice(0, 1000))} rows={3} placeholder={t.exemple} className={champ} />
      </label>
      <label className={sombre ? "inv-etiq" : "block text-xs"} style={sombre ? { display: "block", margin: "10px 0 6px" } : undefined}>{t.contact}{source === "invite" ? " *" : ""}
        <input value={contact} onChange={(e) => setContact(e.target.value.slice(0, 200))} className={champ} autoComplete="off" inputMode="email" dir="ltr" />
      </label>
      {!contact.trim() && <p style={{ margin: "4px 0 0", fontSize: 12, opacity: .85 }}>{t.sansContact}</p>}
      {erreur && <p className={sombre ? "inv-erreur" : "text-xs text-[#9B2C23]"} role="alert">{erreur}</p>}
      <div className="flex flex-wrap items-center gap-2" style={{ marginTop: 10 }}>
        <button type="button" disabled={etat === "envoi"} onClick={() => void envoyer()} className={sombre ? "inv-btn" : `inline-flex items-center gap-1.5 border border-[#A8933F] px-4 min-h-11 text-xs uppercase tracking-[.12em] hover:bg-[#141414] hover:text-[#E4D49A] focus-visible:bg-[#141414] focus-visible:text-[#E4D49A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 ${rtl}`} data-testid="signaler-envoyer">
          {etat === "envoi" ? <><Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" /> {t.envoi}</> : t.envoyer}
        </button>
        <button type="button" onClick={() => bascule(false)} className={sombre ? "inv-lien" : `px-3 min-h-11 text-xs uppercase tracking-[.12em] underline underline-offset-4 ${rtl}`}>{t.annuler}</button>
      </div>
    </div>
  );
}
