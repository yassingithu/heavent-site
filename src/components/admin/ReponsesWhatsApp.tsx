import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useTexte } from "@/i18n/textes";
import { ChevronLeft, MessageCircle, Send } from "lucide-react";

/**
 * Réponses WhatsApp toutes prêtes, en français, en anglais et en arabe (modifiables avant l'envoi),
 * ouvertes directement dans la conversation du client.
 * La langue est devinée (prénom écrit en arabe → arabe, sinon français) puis se change d'un clic : FR / EN / عربي.
 */
export type LangueClient = "fr" | "en" | "ar";
export type ModeleId = "recu" | "devisPret" | "appel" | "relance" | "confirme" | "merci" | "indispo" | "paiement";

export interface ContexteClient {
  telephone?: string | null;
  prenom?: string | null;
  evenement?: string | null;   // « votre mariage », « votre séminaire »… (français ; sert aussi à deviner le genre en EN/AR)
  date?: string | null;        // déjà formatée en français
  dateIso?: string | null;     // AAAA-MM-JJ : permet d'écrire la date dans la langue du client
  lienDevis?: string | null;
  langue?: LangueClient | null; // si on la connaît (sinon devinée)
  facture?: string | null;      // « FAC-2026-0003 » (rappel de paiement)
  montant?: string | null;      // « 12 000 MAD » (rappel de paiement)
}

let prenomCache: Promise<string | null> | null = null;
const prenomAdmin = () => (prenomCache ??= (supabase as any).rpc("mon_accueil")
  .then(({ data }: any) => (data?.prenom as string) || null)
  .catch(() => null));

export const numeroWhatsApp = (tel?: string | null) => {
  let n = String(tel ?? "").replace(/\D/g, "");
  if (n.startsWith("00")) n = n.slice(2);
  else if (n.startsWith("0")) n = "212" + n.slice(1);
  return n.length >= 9 ? n : "";
};

/** Langue la plus probable : prénom en lettres arabes → arabe ; sinon français. */
export const deviner = (c: ContexteClient): LangueClient => c.langue ?? (/[؀-ۿ]/.test(c.prenom ?? "") ? "ar" : "fr");

type Genre = "mariage" | "fiancailles" | "bebe" | "anniversaire" | "autre";
const genre = (evenement?: string | null): Genre => {
  const t = (evenement ?? "").toLowerCase();
  return /mariage/.test(t) ? "mariage" : /fian/.test(t) ? "fiancailles" : /baby|naissance|b[ée]b[ée]/.test(t) ? "bebe" : /anniversaire/.test(t) ? "anniversaire" : "autre";
};
const EVT = {
  en: { mariage: "your wedding", fiancailles: "your engagement party", bebe: "your baby shower", anniversaire: "your birthday celebration", autre: "your event" },
  ar: { mariage: "حفل زفافكم", fiancailles: "حفل خطوبتكم", bebe: "حفل استقبال مولودكم", anniversaire: "حفل عيد ميلادكم", autre: "مناسبتكم" },
} as const;
const LOCALE: Record<LangueClient, string> = { fr: "fr-FR", en: "en-GB", ar: "ar-MA-u-nu-latn" };

function evenementEtDate(c: ContexteClient, l: LangueClient) {
  const g = genre(c.evenement);
  const evt = l === "fr" ? c.evenement || "votre événement" : EVT[l][g];
  let jour = "";
  if (c.dateIso) jour = new Date(c.dateIso.slice(0, 10) + "T12:00:00Z").toLocaleDateString(LOCALE[l], { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  else if (c.date && l === "fr") jour = c.date;
  const date = !jour ? "" : l === "fr" ? ` du ${jour}` : l === "en" ? ` on ${jour}` : ` بتاريخ ${jour}`;
  return { evt, date };
}

export const ORDRE_MODELES: ModeleId[] = ["recu", "devisPret", "appel", "relance", "paiement", "confirme", "merci", "indispo"];

/** Texte d'un modèle dans la langue du client (exporté pour les tests). */
export function texteModele(id: ModeleId, l: LangueClient, c: ContexteClient, prenomSignataire: string | null): string {
  const { evt, date } = evenementEtDate(c, l);
  const p = c.prenom?.trim();
  const sig = l === "fr" ? (prenomSignataire ? `${prenomSignataire} — Heavent People Agency` : "L'équipe Heavent People Agency")
    : l === "en" ? (prenomSignataire ? `${prenomSignataire} — Heavent People Agency` : "The Heavent People Agency team")
    : (prenomSignataire ? `${prenomSignataire} — Heavent People Agency` : "فريق Heavent People Agency");
  const bonjour = l === "fr" ? `Bonjour${p ? ` ${p}` : ""},` : l === "en" ? `Hello${p ? ` ${p}` : ""},` : `السلام عليكم${p ? ` ${p}` : ""}،`;
  const ref = c.facture ? ` ${c.facture}` : "";
  const mont = c.montant ? ` (${c.montant})` : "";
  const T: Record<LangueClient, Record<ModeleId, string>> = {
    fr: {
      recu: `Merci beaucoup pour votre demande pour ${evt}${date} ! Je l'étudie avec attention et je vous envoie votre devis très rapidement.`,
      devisPret: `Votre devis pour ${evt}${date} est prêt${c.lienDevis ? ` : vous pouvez le consulter et le signer en ligne ici 👉 ${c.lienDevis}` : " et vient de vous être envoyé par e-mail"}.\n\nJe reste disponible pour toute question ou ajustement.`,
      appel: `Pour bien préparer ${evt}${date}, je vous propose un court appel de 10 minutes afin de valider ensemble vos envies et les détails. Quel moment vous arrangerait ?`,
      relance: `Je me permets de revenir vers vous au sujet du devis pour ${evt}${date}. Avez-vous pu le consulter ? Si vous souhaitez modifier quelque chose, je l'adapte avec plaisir.${c.lienDevis ? `\n\nVous le retrouvez ici 👉 ${c.lienDevis}` : ""}`,
      paiement: `Je me permets de vous écrire au sujet du règlement de la facture${ref}${mont} pour ${evt}${date}. Pourriez-vous me dire quand le virement pourra être effectué ? Si c'est déjà fait, merci beaucoup, et n'hésitez pas à m'envoyer la preuve de paiement.`,
      confirme: `C'est confirmé : nous serons à vos côtés pour ${evt}${date} ! Merci pour votre confiance. Je reviens vers vous quelques jours avant pour caler les derniers détails.`,
      merci: `Un immense merci de nous avoir fait confiance pour ${evt}. Ce fut un plaisir de partager ce moment avec vous ! Si vous avez une minute, votre avis nous aiderait énormément.\n\nÀ très bientôt,`,
      indispo: `Merci pour votre demande pour ${evt}${date}. Malheureusement, nous sommes déjà complets à cette date. Si vous avez une date alternative, je vous préparerai avec plaisir un devis.`,
    },
    en: {
      recu: `Thank you so much for your request for ${evt}${date}! I'm reviewing it carefully and will send you your quote very shortly.`,
      devisPret: `Your quote for ${evt}${date} is ready${c.lienDevis ? `: you can view and sign it online here 👉 ${c.lienDevis}` : " and has just been sent to you by email"}.\n\nI remain available for any question or adjustment.`,
      appel: `To prepare ${evt}${date} properly, I'd suggest a short 10-minute call so we can go over your wishes and the details together. What time would suit you?`,
      relance: `I'm following up on the quote for ${evt}${date}. Have you had a chance to look at it? If you'd like to change anything, I'll gladly adapt it.${c.lienDevis ? `\n\nYou can find it here 👉 ${c.lienDevis}` : ""}`,
      paiement: `I'm writing about the payment of invoice${ref}${mont} for ${evt}${date}. Could you let me know when the transfer can be made? If it's already done, thank you very much, and please feel free to send me the proof of payment.`,
      confirme: `It's confirmed: we will be by your side for ${evt}${date}! Thank you for your trust. I'll get back to you a few days beforehand to settle the last details.`,
      merci: `A huge thank you for trusting us with ${evt}. It was a pleasure to share this moment with you! If you have a minute, your review would help us enormously.\n\nSee you very soon,`,
      indispo: `Thank you for your request for ${evt}${date}. Unfortunately, we are already fully booked on that date. If you have an alternative date, I'd be happy to prepare a quote for you.`,
    },
    ar: {
      recu: `شكرًا جزيلًا على طلبكم بخصوص ${evt}${date}! أقوم بدراسته باهتمام وسأرسل لكم عرض السعر في أقرب وقت.`,
      devisPret: `عرض السعر بخصوص ${evt}${date} جاهز${c.lienDevis ? `، ويمكنكم الاطلاع عليه وتوقيعه إلكترونيًا من هنا 👉 ${c.lienDevis}` : " وقد تم إرساله إليكم للتو عبر البريد الإلكتروني"}.\n\nأنا رهن إشارتكم لأي سؤال أو تعديل.`,
      appel: `لتحضير ${evt}${date} على أفضل وجه، أقترح عليكم مكالمة قصيرة مدتها 10 دقائق لنتفق معًا على رغباتكم وعلى التفاصيل. ما هو الوقت المناسب لكم؟`,
      relance: `أعاود التواصل معكم بخصوص عرض السعر المتعلق ب${evt}${date}. هل تمكنتم من الاطلاع عليه؟ وإن رغبتم في تعديل أي شيء فسأقوم بذلك بكل سرور.${c.lienDevis ? `\n\nيمكنكم الاطلاع عليه هنا 👉 ${c.lienDevis}` : ""}`,
      paiement: `أكتب إليكم بخصوص أداء الفاتورة${ref}${mont} المتعلقة ب${evt}${date}. هل يمكنكم إخباري بموعد إجراء التحويل؟ وإن كان قد تم فعلًا فشكرًا جزيلًا، ويُرجى إرسال وصل الأداء إن أمكن.`,
      confirme: `تم التأكيد: سنكون إلى جانبكم في ${evt}${date}! شكرًا لثقتكم بنا. سأتواصل معكم قبل الموعد بأيام قليلة لضبط آخر التفاصيل.`,
      merci: `شكرًا جزيلًا على ثقتكم بنا في ${evt}. كان من دواعي سرورنا مشاركتكم هذه اللحظة الجميلة! وإن توفّر لديكم بعض الوقت، فرأيكم سيساعدنا كثيرًا.\n\nإلى لقاء قريب،`,
      indispo: `شكرًا لكم على طلبكم بخصوص ${evt}${date}. للأسف، جدولنا ممتلئ في هذا التاريخ. إن كان لديكم تاريخ بديل، يسعدني أن أعدّ لكم عرض سعر.`,
    },
  };
  const corps = T[l][id];
  // « Merci après l'événement » se termine déjà par une formule de politesse
  return id === "merci" ? `${bonjour}\n\n${corps}\n${sig}` : `${bonjour}\n\n${corps}\n\n${sig}`;
}

const CHOIX_LANGUE: { id: LangueClient; texte: string }[] = [{ id: "fr", texte: "Français" }, { id: "en", texte: "English" }, { id: "ar", texte: "العربية" }];

interface Props {
  contexte: ContexteClient;
  compact?: boolean;
  /** Ouvre directement ce modèle (l'utilisateur relit, corrige si besoin, puis envoie) */
  modeleDirect?: ModeleId;
  /** Texte et style du bouton (sinon : bouton vert « Répondre sur WhatsApp ») */
  libelle?: string;
  classe?: string;
  /** Appelé quand l'utilisateur ouvre WhatsApp pour envoyer le message */
  onEnvoye?: () => void;
}

const useMobile = () => {
  const [m, setM] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches);
  useEffect(() => { const q = window.matchMedia("(max-width: 639px)"); const f = () => setM(q.matches); q.addEventListener("change", f); return () => q.removeEventListener("change", f); }, []);
  return m;
};

export default function ReponsesWhatsApp({ contexte, compact = false, modeleDirect, libelle, classe, onEnvoye }: Props) {
  const x = useTexte("fr");
  const mobile = useMobile();
  const [prenomSig, setPrenomSig] = useState<string | null>(null);
  const [langue, setLangue] = useState<LangueClient>(deviner(contexte));
  const [modele, setModele] = useState<ModeleId | null>(null);
  const [texte, setTexte] = useState<string | null>(null);
  const [modifie, setModifie] = useState(false);
  const [ouvert, setOuvert] = useState(false);
  useEffect(() => { prenomAdmin().then(setPrenomSig); }, []);
  const numero = numeroWhatsApp(contexte.telephone);
  if (!numero) return null;

  const titres: Record<ModeleId, string> = {
    recu: x("Bien reçu"), devisPret: x("Votre devis est prêt"), appel: x("Proposer un appel"), relance: x("Petite relance"),
    paiement: x("Rappel de paiement"), confirme: x("Date confirmée"), merci: x("Merci après l'événement"), indispo: x("Date indisponible"),
  };
  const choisir = (id: ModeleId, l: LangueClient = langue) => { setModele(id); setTexte(texteModele(id, l, contexte, prenomSig)); setModifie(false); };
  const changerLangue = (l: LangueClient) => {
    if (l === langue) return;
    if (modele && texte !== null && modifie && !confirm(x("Changer de langue remplace le message que tu as modifié. Continuer ?"))) return;
    setLangue(l);
    if (modele) choisir(modele, l);
  };
  const retour = () => { setTexte(null); setModele(null); setModifie(false); };
  const ouvrir = (o: boolean) => {
    if (!o && modifie && texte !== null && !confirm(x("Fermer sans envoyer ? Ton message modifié sera perdu."))) return;
    setOuvert(o);
    if (o) { const l = deviner(contexte); setLangue(l); if (modeleDirect) { setModele(modeleDirect); setTexte(texteModele(modeleDirect, l, contexte, prenomSig)); setModifie(false); } }
    else retour();
  };
  const envoyer = () => { window.open(`https://wa.me/${numero}?text=${encodeURIComponent(texte ?? "")}`, "_blank", "noopener"); onEnvoye?.(); setModifie(false); setOuvert(false); retour(); };

  const onglets = (
    <div className="wa-onglets" role="group" aria-label={x("Langue du message")} data-testid="langue-whatsapp">
      {CHOIX_LANGUE.map((c) => (
        <button key={c.id} type="button" onClick={() => changerLangue(c.id)} aria-pressed={langue === c.id} data-langue={c.id}>{c.texte}</button>
      ))}
    </div>
  );
  const corps = (
    <div className="wa-panneau" data-testid="panneau-whatsapp">
      {texte === null ? (
        <div data-testid="modeles-whatsapp">
          <p className="wa-titre">{x("Réponses prêtes")}</p>
          {onglets}
          <div className="wa-liste">
            {ORDRE_MODELES.map((id) => <button key={id} onClick={() => choisir(id)}>{titres[id]}</button>)}
          </div>
        </div>
      ) : (
        <div>
          <p className="wa-titre">{modele ? titres[modele] : ""}</p>
          {onglets}
          <div className="wa-texte">
            {!modeleDirect && <button onClick={retour} className="wa-retour"><ChevronLeft className="h-4 w-4 rtl:rotate-180" /> {x("Autres réponses")}</button>}
            <textarea value={texte} onChange={(e) => { setTexte(e.target.value); setModifie(true); }} rows={mobile ? 8 : 9} dir={langue === "ar" ? "rtl" : "ltr"} lang={langue} data-testid="texte-whatsapp" />
          </div>
          <div className="wa-envoyer">
            <button onClick={envoyer} className="s-btn s-btn-plein s-sombre" data-testid="ouvrir-whatsapp"><Send className="h-4 w-4 text-[#25D366]" /> {x("Ouvrir dans WhatsApp")}</button>
          </div>
        </div>
      )}
    </div>
  );
  const declencheur = (
    <button type="button" onClick={(e) => { e.stopPropagation(); if (mobile) ouvrir(true); }} data-testid="reponses-whatsapp"
      className={classe ?? `inline-flex items-center gap-1.5 rounded-md border border-green-200 bg-green-50 text-green-800 hover:bg-green-100 text-sm ${compact ? "h-9 px-2.5" : "h-10 px-3"}`}>
      <MessageCircle className={`h-4 w-4 ${classe ? "text-[#25D366]" : ""}`} /> {libelle ?? (compact ? "WhatsApp" : "Répondre sur WhatsApp")}
    </button>
  );

  if (mobile) return (
    <>
      {declencheur}
      <Sheet open={ouvert} onOpenChange={ouvrir}>
        <SheetContent side="bottom" className="wa-tiroir p-0" onInteractOutside={(e) => { if (modifie) e.preventDefault(); }} onClick={(e) => e.stopPropagation()}>
          <SheetTitle className="sr-only">{x("Réponses prêtes")}</SheetTitle>
          {corps}
        </SheetContent>
      </Sheet>
    </>
  );
  return (
    <Popover open={ouvert} onOpenChange={ouvrir}>
      <PopoverTrigger asChild>{declencheur}</PopoverTrigger>
      <PopoverContent align="end" className="wa-fenetre w-[min(92vw,400px)] p-0" onClick={(e) => e.stopPropagation()} onInteractOutside={(e) => { if (modifie) e.preventDefault(); }}>
        {corps}
      </PopoverContent>
    </Popover>
  );
}
