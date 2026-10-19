// Outils communs de l'agenda : textes en français / anglais / arabe, dates à l'heure du Maroc, fichiers calendrier (.ics).

export type Langue = "fr" | "en" | "ar";
export const langueDe = (l: unknown): Langue => (l === "en" || l === "ar" ? l : "fr");

const LOCALES: Record<Langue, string> = { fr: "fr-FR", en: "en-GB", ar: "ar-MA" };
export const quand = (iso: string, l: Langue = "fr") =>
  new Date(iso).toLocaleString(LOCALES[l], { timeZone: "UTC", weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });
export const heure = (iso: string, l: Langue = "fr") =>
  new Date(iso).toLocaleTimeString(LOCALES[l], { timeZone: "UTC", hour: "2-digit", minute: "2-digit" });

export const TYPES: Record<string, Record<Langue, string>> = {
  agence: { fr: "à l'agence", en: "at our office", ar: "في الوكالة" },
  telephone: { fr: "par téléphone", en: "by phone", ar: "عبر الهاتف" },
  visio: { fr: "en visio", en: "by video call", ar: "عبر مكالمة فيديو" },
};

/** Textes des e-mails envoyés au client, dans sa langue. */
export const T = {
  sujetConfirmation: { fr: "Votre rendez-vous avec Heavent est confirmé", en: "Your appointment with Heavent is confirmed", ar: "تم تأكيد موعدك مع Heavent" },
  bonjour: { fr: "Bonjour", en: "Hello", ar: "مرحباً" },
  confirme: { fr: "Votre rendez-vous est confirmé :", en: "Your appointment is confirmed:", ar: "تم تأكيد موعدك:" },
  adresse: { fr: "Adresse", en: "Address", ar: "العنوان" },
  appel: { fr: "Nous vous appellerons au", en: "We will call you on", ar: "سنتصل بك على الرقم" },
  visio: { fr: "Le lien de la visio vous sera envoyé avant le rendez-vous.", en: "The video call link will be sent to you before the appointment.", ar: "سنرسل لك رابط مكالمة الفيديو قبل الموعد." },
  lienVisio: { fr: "Lien de la visio", en: "Video call link", ar: "رابط مكالمة الفيديو" },
  calendrier: { fr: "Le fichier joint ajoute ce rendez-vous à votre agenda.", en: "The attached file adds this appointment to your calendar.", ar: "الملف المرفق يضيف هذا الموعد إلى تقويمك." },
  changer: { fr: "Un empêchement ? Répondez simplement à cet e-mail ou écrivez-nous sur WhatsApp au +212 6 10 93 96 55.", en: "Can't make it? Simply reply to this email or message us on WhatsApp at +212 6 10 93 96 55.", ar: "هل لديك مانع؟ يكفي الرد على هذه الرسالة أو مراسلتنا عبر واتساب على الرقم ‎+212 6 10 93 96 55." },
  aBientot: { fr: "À très vite,", en: "See you soon,", ar: "إلى اللقاء قريباً،" },
  sujetRappel: { fr: "Rappel : votre rendez-vous Heavent demain", en: "Reminder: your Heavent appointment tomorrow", ar: "تذكير: موعدك مع Heavent غداً" },
  rappel: { fr: "Petit rappel de votre rendez-vous de demain :", en: "A quick reminder of your appointment tomorrow:", ar: "تذكير بموعدك غداً:" },
  sujetAnnulation: { fr: "Votre rendez-vous Heavent est annulé", en: "Your Heavent appointment has been cancelled", ar: "تم إلغاء موعدك مع Heavent" },
  annule: { fr: "Nous sommes désolés : nous devons annuler votre rendez-vous du", en: "We are sorry: we have to cancel your appointment on", ar: "نعتذر، علينا إلغاء موعدك يوم" },
  reprendre: { fr: "Vous pouvez choisir un nouveau créneau sur notre site, ou nous répondre directement.", en: "You can pick a new time slot on our website, or simply reply to us.", ar: "يمكنك اختيار موعد جديد على موقعنا أو الرد علينا مباشرة." },
  titreEvenement: { fr: "Rendez-vous Heavent People Agency", en: "Appointment — Heavent People Agency", ar: "موعد مع Heavent People Agency" },
} as const;
export const t = (cle: keyof typeof T, l: Langue) => T[cle][l];

const esc = (v: unknown) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

/** Détails pratiques (adresse, appel, visio) selon le type. */
export function infosPratiques(r: any, l: Langue, adresse: string | null, lienVisio: string | null) {
  if (r.type === "agence" && adresse) return `${t("adresse", l)} : ${esc(adresse)}`;
  if (r.type === "telephone") return `${t("appel", l)} <span dir="ltr">${esc(r.client_telephone ?? "")}</span>`;
  if (r.type === "visio") return lienVisio ? `${t("lienVisio", l)} : <a href="${esc(lienVisio)}">${esc(lienVisio)}</a>` : t("visio", l);
  return "";
}

/** Corps d'e-mail client (confirmation ou rappel), dans la langue du client. */
export function emailClient(r: any, l: Langue, intro: string, pratique: string, avecIcs: boolean) {
  const dir = l === "ar" ? ' dir="rtl"' : "";
  return `<div${dir} style="font-family:Arial,sans-serif;max-width:620px;color:#2a2420">
    <p>${t("bonjour", l)} ${esc(r.client_nom)},</p>
    <p>${intro}</p>
    <div style="background:#FAF7EE;border:1px solid #ece6d3;border-radius:8px;padding:12px 16px">
      <b style="font-size:16px">📅 ${esc(quand(r.debut, l))}</b> (${esc(TYPES[r.type]?.[l] ?? r.type)})<br>${pratique}
    </div>
    ${avecIcs ? `<p style="font-size:13px;color:#555">${t("calendrier", l)}</p>` : ""}
    <p style="font-size:13px;color:#555">${t("changer", l)}</p>
    <p>${t("aBientot", l)}<br>Imane CHAIGARI — Heavent People Agency</p></div>`;
}

// ---------- fichiers calendrier (.ics) ----------
const icsDate = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const icsTexte = (s: unknown) => String(s ?? "").replace(/\\/g, "\\\\").replace(/;/g, "\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
/** Coupe les lignes à 75 octets comme le demande la norme iCalendar. */
const plier = (ligne: string) => {
  const octets = new TextEncoder().encode(ligne);
  if (octets.length <= 74) return ligne;
  const morceaux: string[] = []; let courant = "";
  for (const c of ligne) {
    if (new TextEncoder().encode(courant + c).length > 73) { morceaux.push(courant); courant = ""; }
    courant += c;
  }
  morceaux.push(courant);
  return morceaux.join("\r\n ");
};

export interface EvenementIcs { uid: string; debut: string; fin: string; titre: string; lieu?: string | null; description?: string | null; annule?: boolean }

export function calendrierIcs(evenements: EvenementIcs[], nom = "Heavent — rendez-vous", methode = "PUBLISH") {
  const maintenant = icsDate(new Date().toISOString());
  const lignes = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Heavent People Agency//Agenda//FR", "CALSCALE:GREGORIAN", `METHOD:${methode}`,
    `X-WR-CALNAME:${icsTexte(nom)}`, "X-WR-TIMEZONE:UTC", "REFRESH-INTERVAL;VALUE=DURATION:PT1H", "X-PUBLISHED-TTL:PT1H"];
  for (const e of evenements) {
    lignes.push("BEGIN:VEVENT", `UID:${e.uid}@heaventagency.com`, `DTSTAMP:${maintenant}`, `DTSTART:${icsDate(e.debut)}`, `DTEND:${icsDate(e.fin)}`,
      `SUMMARY:${icsTexte(e.titre)}`);
    if (e.lieu) lignes.push(`LOCATION:${icsTexte(e.lieu)}`);
    if (e.description) lignes.push(`DESCRIPTION:${icsTexte(e.description)}`);
    lignes.push(`STATUS:${e.annule ? "CANCELLED" : "CONFIRMED"}`, "BEGIN:VALARM", "ACTION:DISPLAY", "DESCRIPTION:Rendez-vous", "TRIGGER:-PT1H", "END:VALARM", "END:VEVENT");
  }
  lignes.push("END:VCALENDAR");
  return lignes.map(plier).join("\r\n") + "\r\n";
}

export const base64 = (s: string) => {
  const octets = new TextEncoder().encode(s);
  let bin = ""; for (const o of octets) bin += String.fromCharCode(o);
  return btoa(bin);
};
