import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Building2, CalendarCheck2, Loader2, Phone, Video } from "lucide-react";

/**
 * Choix d'un créneau de rendez-vous parmi les disponibilités réglées dans l'admin (onglet Agenda).
 * Heures affichées à l'heure du Maroc. Textes en français, anglais ou arabe.
 */
export type LangueRdv = "fr" | "en" | "ar";
type TypeRdv = "agence" | "telephone" | "visio";
interface Creneau { debut: string; fin: string }

const TZ = "UTC"; // heure du Maroc : GMT depuis le 20 septembre 2026 (fin du GMT+1)
const LOCALES: Record<LangueRdv, string> = { fr: "fr-FR", en: "en-GB", ar: "ar-MA" };

const TXT = {
  type: { fr: "Comment souhaitez-vous nous rencontrer ?", en: "How would you like to meet?", ar: "كيف تفضل لقاءنا؟" },
  agence: { fr: "À l'agence", en: "At our office", ar: "في الوكالة" },
  telephone: { fr: "Par téléphone", en: "By phone", ar: "عبر الهاتف" },
  visio: { fr: "En visio", en: "Video call", ar: "مكالمة فيديو" },
  jour: { fr: "Choisissez un jour", en: "Choose a day", ar: "اختر يوماً" },
  heure: { fr: "Choisissez une heure", en: "Choose a time", ar: "اختر ساعة" },
  heureMaroc: { fr: "heure du Maroc", en: "Morocco time", ar: "بتوقيت المغرب" },
  duree: { fr: "Durée", en: "Duration", ar: "المدة" },
  nom: { fr: "Nom et prénom", en: "Full name", ar: "الاسم الكامل" },
  email: { fr: "E-mail", en: "Email", ar: "البريد الإلكتروني" },
  tel: { fr: "Téléphone", en: "Phone", ar: "الهاتف" },
  telRequis: { fr: "(pour vous appeler)", en: "(so we can call you)", ar: "(للاتصال بك)" },
  facultatif: { fr: "(facultatif)", en: "(optional)", ar: "(اختياري)" },
  message: { fr: "Un mot sur votre projet", en: "A word about your project", ar: "كلمة عن مشروعك" },
  confirmer: { fr: "Confirmer le rendez-vous", en: "Confirm the appointment", ar: "تأكيد الموعد" },
  aucun: { fr: "Aucun créneau disponible pour le moment.", en: "No time slots available at the moment.", ar: "لا توجد مواعيد متاحة حالياً." },
  confirme: { fr: "Rendez-vous confirmé", en: "Appointment confirmed", ar: "تم تأكيد الموعد" },
  confirmeDetail: { fr: "Une confirmation vous a été envoyée par e-mail, avec un fichier pour l'ajouter à votre agenda.", en: "A confirmation has been sent to you by email, with a file to add it to your calendar.", ar: "أرسلنا إليك تأكيداً عبر البريد الإلكتروني مع ملف لإضافته إلى تقويمك." },
  errNom: { fr: "Indiquez votre nom.", en: "Please enter your name.", ar: "يرجى إدخال اسمك." },
  errEmail: { fr: "L'adresse e-mail n'est pas valide.", en: "The email address is not valid.", ar: "البريد الإلكتروني غير صالح." },
  errTel: { fr: "Indiquez un numéro de téléphone pour que nous puissions vous appeler.", en: "Please enter a phone number so we can call you.", ar: "يرجى إدخال رقم هاتف لنتمكن من الاتصال بك." },
  errPris: { fr: "Ce créneau vient d'être réservé. Choisissez-en un autre.", en: "This slot has just been booked. Please choose another one.", ar: "تم حجز هذا الموعد للتو. يرجى اختيار موعد آخر." },
  errLimite: { fr: "Vous avez déjà des rendez-vous à venir. Contactez-nous pour en ajouter un.", en: "You already have upcoming appointments. Please contact us to add another one.", ar: "لديك مواعيد قادمة بالفعل. تواصل معنا لإضافة موعد آخر." },
  errAutre: { fr: "Le rendez-vous n'a pas pu être enregistré. Réessayez ou écrivez-nous sur WhatsApp.", en: "The appointment could not be saved. Please try again or message us on WhatsApp.", ar: "تعذر تسجيل الموعد. حاول مرة أخرى أو راسلنا عبر واتساب." },
  choisirCreneau: { fr: "Choisissez un créneau.", en: "Please choose a time slot.", ar: "يرجى اختيار موعد." },
} as const;

const ICONES: Record<TypeRdv, typeof Phone> = { agence: Building2, telephone: Phone, visio: Video };
const jourMaroc = (iso: string) => new Date(iso).toLocaleDateString("en-CA", { timeZone: TZ }); // AAAA-MM-JJ

export interface RdvReserve { debut: string; fin: string; type: TypeRdv }

export default function ChoisirRendezVous({ langue = "fr", source, devisToken, nom: nomInitial = "", email: emailInitial = "", telephone: telInitial = "", onReserve }: {
  langue?: LangueRdv; source: "devis" | "contact" | "jeu"; devisToken?: string;
  nom?: string; email?: string; telephone?: string; onReserve?: (r: RdvReserve) => void;
}) {
  const t = (k: keyof typeof TXT) => TXT[k][langue];
  const loc = LOCALES[langue];
  const [chargement, setChargement] = useState(true);
  const [reglages, setReglages] = useState<{ duree_minutes: number; types: TypeRdv[]; actif: boolean; adresse: string | null } | null>(null);
  const [creneaux, setCreneaux] = useState<Creneau[]>([]);
  const [type, setType] = useState<TypeRdv | null>(null);
  const [jour, setJour] = useState<string | null>(null);
  const [choix, setChoix] = useState<string | null>(null);
  const [nom, setNom] = useState(nomInitial);
  const [email, setEmail] = useState(emailInitial);
  const [tel, setTel] = useState(telInitial);
  const [message, setMessage] = useState("");
  const [piege, setPiege] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState("");
  const [reserve, setReserve] = useState<RdvReserve | null>(null);

  const charger = async () => {
    const [{ data: r }, { data: c }] = await Promise.all([
      (supabase as any).rpc("agenda_public"),
      (supabase as any).rpc("agenda_creneaux"),
    ]);
    setReglages(r ?? null);
    setCreneaux((c ?? []) as Creneau[]);
    if (r?.types?.length && !type) setType(r.types[0]);
    setChargement(false);
  };
  useEffect(() => { charger(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const parJour = useMemo(() => {
    const m = new Map<string, Creneau[]>();
    for (const c of creneaux) { const j = jourMaroc(c.debut); m.set(j, [...(m.get(j) ?? []), c]); }
    return m;
  }, [creneaux]);
  const jours = [...parJour.keys()];
  useEffect(() => { if (!jour && jours.length) setJour(jours[0]); }, [jours.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const fmtJour = (j: string) => {
    const d = new Date(j + "T12:00:00Z");
    return {
      semaine: d.toLocaleDateString(loc, { weekday: "short", timeZone: "UTC" }),
      num: d.toLocaleDateString(loc, { day: "numeric", timeZone: "UTC" }),
      mois: d.toLocaleDateString(loc, { month: "short", timeZone: "UTC" }),
    };
  };
  const fmtHeure = (iso: string) => new Date(iso).toLocaleTimeString(loc, { timeZone: TZ, hour: "2-digit", minute: "2-digit" });
  const fmtComplet = (iso: string) => new Date(iso).toLocaleString(loc, { timeZone: TZ, weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });

  const confirmer = async () => {
    setErreur("");
    if (!choix) return setErreur(t("choisirCreneau"));
    if (nom.trim().length < 2) return setErreur(t("errNom"));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setErreur(t("errEmail"));
    if (type === "telephone" && tel.replace(/\D/g, "").length < 8) return setErreur(t("errTel"));
    setEnvoi(true);
    const { data, error } = await supabase.functions.invoke("prendre-rdv", {
      body: { debut: choix, type, nom, email, telephone: tel, message, langue, source, devisToken, site: piege },
    });
    let code = data?.error as string | undefined;
    if (error && !code) { try { code = (await (error as any).context?.json())?.error; } catch { /* */ } }
    setEnvoi(false);
    if (error || code) {
      if (code === "pris") { setChoix(null); charger(); return setErreur(t("errPris")); }
      if (code === "limite") return setErreur(t("errLimite"));
      if (code === "telephone") return setErreur(t("errTel"));
      if (code === "email") return setErreur(t("errEmail"));
      return setErreur(t("errAutre"));
    }
    const r = { debut: data.debut, fin: data.fin, type: data.type } as RdvReserve;
    setReserve(r); onReserve?.(r);
  };

  const dir = langue === "ar" ? "rtl" : "ltr";
  if (chargement) return <div className="flex justify-center py-8 text-[#8C6D22]"><Loader2 className="h-5 w-5 animate-spin" /></div>;
  if (reserve) {
    return (
      <div dir={dir} className="rounded-2xl border border-[#CFE3C5] bg-[#F5FAF2] p-5 flex gap-3" data-testid="rdv-confirme" role="status">
        <CalendarCheck2 className="h-6 w-6 text-[#2F5A2A] shrink-0" />
        <div>
          <div className="font-serif text-xl">{t("confirme")}</div>
          <div className="font-medium mt-1 capitalize">{fmtComplet(reserve.debut)} · {t(reserve.type)}</div>
          {reserve.type === "agence" && reglages?.adresse && <div className="text-sm text-[#5E554A]">{reglages.adresse}</div>}
          <div className="text-sm text-[#5E554A] mt-1">{t("confirmeDetail")}</div>
        </div>
      </div>
    );
  }
  if (!reglages?.actif || !jours.length) return <p dir={dir} className="text-sm text-[#5E554A]" data-testid="rdv-aucun">{t("aucun")}</p>;

  const champ = "mt-1 w-full rounded-xl border border-[#DCCBA6] bg-white px-3 min-h-11";
  return (
    <div dir={dir} className="space-y-5" data-testid="choisir-rdv">
      {reglages.types.length > 1 && (
        <div>
          <div className="text-sm font-medium mb-2">{t("type")}</div>
          <div className="flex flex-wrap gap-2">
            {reglages.types.map((ty) => {
              const Icone = ICONES[ty];
              return (
                <button key={ty} type="button" onClick={() => setType(ty)} aria-pressed={type === ty} data-testid={`rdv-type-${ty}`}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 min-h-11 text-sm ${type === ty ? "bg-[#141414] text-white border-[#141414]" : "border-[#DCCBA6] hover:bg-[#FAF7EE]"}`}>
                  <Icone className="h-4 w-4" /> {t(ty)}
                </button>
              );
            })}
          </div>
          {type === "agence" && reglages.adresse && <p className="text-xs text-[#6B6155] mt-1.5">{reglages.adresse}</p>}
        </div>
      )}

      <div>
        <div className="text-sm font-medium mb-2">{t("jour")}</div>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 snap-x" role="listbox" aria-label={t("jour")}>
          {jours.map((j) => {
            const f = fmtJour(j);
            return (
              <button key={j} type="button" role="option" aria-selected={jour === j} onClick={() => { setJour(j); setChoix(null); }} data-testid="rdv-jour"
                className={`snap-start shrink-0 w-16 rounded-2xl border py-2 text-center ${jour === j ? "bg-[#141414] text-white border-[#141414]" : "border-[#DCCBA6] bg-white hover:bg-[#FAF7EE]"}`}>
                <div className="text-[11px] uppercase tracking-wide opacity-80">{f.semaine}</div>
                <div className="text-lg font-semibold leading-tight">{f.num}</div>
                <div className="text-[11px] opacity-80">{f.mois}</div>
              </button>
            );
          })}
        </div>
      </div>

      {jour && (
        <div>
          <div className="text-sm font-medium mb-2">{t("heure")} <span className="font-normal text-[#6B6155]">({t("heureMaroc")} · {t("duree")} {reglages.duree_minutes} min)</span></div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {(parJour.get(jour) ?? []).map((c) => (
              <button key={c.debut} type="button" onClick={() => setChoix(c.debut)} aria-pressed={choix === c.debut} data-testid="rdv-heure"
                className={`rounded-xl border min-h-11 text-sm font-medium ${choix === c.debut ? "bg-[#C8B560] text-white border-[#C8B560]" : "border-[#DCCBA6] bg-white hover:bg-[#FAF7EE]"}`}>
                <span dir="ltr">{fmtHeure(c.debut)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {choix && (
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm font-medium">{t("nom")}<input value={nom} onChange={(e) => setNom(e.target.value)} className={champ} autoComplete="name" data-testid="rdv-nom" /></label>
            <label className="block text-sm font-medium">{t("email")}<input type="email" dir="ltr" value={email} onChange={(e) => setEmail(e.target.value)} className={champ} autoComplete="email" data-testid="rdv-email" /></label>
            <label className="block text-sm font-medium sm:col-span-2">{t("tel")} <span className="font-normal text-[#6B6155]">{type === "telephone" ? t("telRequis") : t("facultatif")}</span>
              <input type="tel" dir="ltr" value={tel} onChange={(e) => setTel(e.target.value)} className={champ} autoComplete="tel" data-testid="rdv-tel" /></label>
            <label className="block text-sm font-medium sm:col-span-2">{t("message")} <span className="font-normal text-[#6B6155]">{t("facultatif")}</span>
              <textarea rows={2} value={message} onChange={(e) => setMessage(e.target.value)} className="mt-1 w-full rounded-xl border border-[#DCCBA6] bg-white px-3 py-2" data-testid="rdv-message" /></label>
            <input tabIndex={-1} aria-hidden="true" autoComplete="off" value={piege} onChange={(e) => setPiege(e.target.value)} className="hidden" name="site" />
          </div>
          {erreur && <p className="text-sm text-[#8A2E26]" role="alert">{erreur}</p>}
          <button type="button" onClick={confirmer} disabled={envoi} data-testid="rdv-confirmer"
            className="inline-flex items-center gap-2 rounded-full bg-[#141414] text-white px-6 min-h-11 font-medium disabled:opacity-60">
            {envoi ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarCheck2 className="h-4 w-4" />} {t("confirmer")}
          </button>
          <p className="text-xs text-[#6B6155] capitalize">{fmtComplet(choix)} · {type && t(type)}</p>
        </div>
      )}
      {!choix && erreur && <p className="text-sm text-[#8A2E26]" role="alert">{erreur}</p>}
    </div>
  );
}
