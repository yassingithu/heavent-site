import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Seo from "@/components/Seo";
import { Camera, CheckCircle2, Loader2, X } from "lucide-react";
import "@/styles/invitation.css";

type Langue = "fr" | "en" | "ar";
interface Etat { etat: "avant" | "ouverte" | "fermee"; noms: string; nom: string | null; date_evenement: string | null; mot: string | null; nb_photos: number; complet?: boolean }

const MAX = 8;
const T = {
  fr: {
    albumPlein: "L'album du mariage est complet : il n'est plus possible d'ajouter de photos. Merci pour votre partage !",
    titre: "Vos souvenirs du mariage", intro: (n: string) => `Partagez vos plus belles photos du mariage de ${n}. Ils les retrouveront dans un livre souvenir.`,
    avant: (d: string) => `Cette page s'ouvrira le jour du mariage, le ${d}. Revenez ce jour-là avec vos photos.`,
    fermee: "Merci ! Le partage de souvenirs est maintenant terminé. Les mariés recevront bientôt leur livre souvenir.",
    ajouter: "Ajouter des photos", reste: (n: number) => `${n} photo${n > 1 ? "s" : ""} possible${n > 1 ? "s" : ""}`, complet: "Vous avez atteint les 8 photos.",
    mot: "Un petit mot pour les mariés (facultatif)", consent: "J'accepte que mes photos et mon mot soient partagés avec les mariés et figurent dans leur livre souvenir.",
    envoyer: "Envoyer mes souvenirs", envoi: "Envoi en cours…", merci: "Merci ! Vos souvenirs sont bien partis.", merciSuite: (n: number) => `${n} photo${n > 1 ? "s" : ""} partagée${n > 1 ? "s" : ""} au total.`, encore: "Ajouter d'autres photos",
    introuvable: "Ce lien est introuvable.", erreur: "L'envoi a échoué. Vérifiez votre connexion et réessayez.", retirer: "Retirer cette photo", locale: "fr-FR", cherche: "Retrouvons votre nom", prenom: "Prénom", nomFamille: "Nom", continuer: "Continuer", absent: "Nous ne vous trouvons pas dans la liste. Vérifiez l'orthographe, comme sur votre invitation. Si vous n'avez pas encore répondu, faites-le d'abord :", repondre: "Répondre à l'invitation", plusieurs: "Plusieurs invités portent ce nom : utilisez le lien personnel de votre invitation.", indispo: "Cette invitation n'est pas disponible.", erreurCherche: "Recherche impossible. Réessayez.", cocher: "Cochez la case ci-dessus pour envoyer.", gardees: (k: number, n: number) => `${k} photos gardées sur ${n} : le maximum est de 8.`, partiel: (k: number, n: number) => `Connexion perdue : ${k} photo${k > 1 ? "s" : ""} sur ${n} ${k > 1 ? "sont parties" : "est partie"}. Touchez « Envoyer » pour envoyer le reste.`, progression: (k: number, n: number) => `Envoi ${k}/${n}…`, definitif: "Une fois envoyées, vous ne pourrez plus retirer vos photos.", etiqMot: "Votre petit mot",
    photoIllisible: "Une photo n'a pas pu être lue (format non pris en charge).", rien: "Ajoutez au moins une photo ou un mot.",
  },
  en: {
    albumPlein: "The wedding album is full: no more photos can be added. Thank you for sharing!",
    titre: "Your wedding memories", intro: (n: string) => `Share your favourite photos from ${n}'s wedding. They will keep them in a memory book.`,
    avant: (d: string) => `This page opens on the wedding day, ${d}. Come back that day with your photos.`,
    fermee: "Thank you! Memory sharing is now closed. The couple will soon receive their memory book.",
    ajouter: "Add photos", reste: (n: number) => `${n} photo${n > 1 ? "s" : ""} left`, complet: "You have reached the 8 photos limit.",
    mot: "A little note for the couple (optional)", consent: "I agree that my photos and note are shared with the couple and included in their memory book.",
    envoyer: "Send my memories", envoi: "Sending…", merci: "Thank you! Your memories have been sent.", merciSuite: (n: number) => `${n} photo${n > 1 ? "s" : ""} shared in total.`, encore: "Add more photos",
    introuvable: "This link could not be found.", erreur: "Sending failed. Check your connection and try again.", retirer: "Remove this photo", locale: "en-GB", cherche: "Let's find your name", prenom: "First name", nomFamille: "Last name", continuer: "Continue", absent: "We can't find you in the guest list. Check the spelling, as on your invitation. If you haven't replied yet, please do so first:", repondre: "Reply to the invitation", plusieurs: "Several guests share this name: please use the personal link from your invitation.", indispo: "This invitation is not available.", erreurCherche: "Search failed. Please try again.", cocher: "Tick the box above to send.", gardees: (k: number, n: number) => `${k} photos kept out of ${n}: the maximum is 8.`, partiel: (k: number, n: number) => `Connection lost: ${k} of ${n} photos were sent. Tap “Send” to send the rest.`, progression: (k: number, n: number) => `Sending ${k}/${n}…`, definitif: "Once sent, you will no longer be able to remove your photos.", etiqMot: "Your note",
    photoIllisible: "A photo could not be read (unsupported format).", rien: "Add at least one photo or a note.",
  },
  ar: {
    albumPlein: "اكتمل ألبوم الزفاف ولم يعد بالإمكان إضافة صور. شكراً لمشاركتكم!",
    titre: "ذكريات حفل الزفاف", intro: (n: string) => `شاركوا أجمل صوركم من حفل زفاف ${n}. سيجدونها في كتاب تذكاري.`,
    avant: (d: string) => `ستفتح هذه الصفحة يوم الزفاف، ${d}. عودوا في ذلك اليوم مع صوركم.`,
    fermee: "شكراً! انتهت مشاركة الذكريات. سيتوصل العروسان قريباً بكتابهما التذكاري.",
    ajouter: "إضافة صور", reste: (n: number) => `يمكنكم إضافة ${n} ${n > 1 ? "صور" : "صورة"}`, complet: "لقد بلغتم 8 صور.",
    mot: "كلمة صغيرة للعروسين (اختياري)", consent: "أوافق على مشاركة صوري وكلمتي مع العروسين وإدراجها في كتابهما التذكاري.",
    envoyer: "إرسال ذكرياتي", envoi: "جارٍ الإرسال…", merci: "شكراً! تم إرسال ذكرياتكم.", merciSuite: (n: number) => `تمت مشاركة ${n} صور في المجموع.`, encore: "إضافة صور أخرى",
    introuvable: "هذا الرابط غير موجود.", erreur: "فشل الإرسال. تحققوا من الاتصال وحاولوا مرة أخرى.", retirer: "إزالة هذه الصورة", locale: "ar-MA-u-nu-latn", cherche: "لنجد اسمكم", prenom: "الاسم الشخصي", nomFamille: "اسم العائلة", continuer: "متابعة", absent: "لم نجدكم في اللائحة. إذا لم تردّوا على الدعوة بعد، يرجى الرد أولاً:", repondre: "الرد على الدعوة", plusieurs: "عدة مدعوين يحملون هذا الاسم: استعملوا الرابط الشخصي لدعوتكم.", indispo: "هذه الدعوة غير متاحة.", erreurCherche: "تعذر البحث. حاولوا مرة أخرى.", cocher: "ضعوا علامة في المربع أعلاه للإرسال.", gardees: (k: number, n: number) => `تم الاحتفاظ بـ ${k} صور من ${n}: الحد الأقصى 8.`, partiel: (k: number, n: number) => `انقطع الاتصال: أُرسلت ${k} من ${n} صور. اضغطوا «إرسال» لإرسال الباقي.`, progression: (k: number, n: number) => `إرسال ${k}/${n}…`, definitif: "بعد الإرسال لن تتمكنوا من حذف صوركم.", etiqMot: "كلمتكم",
    photoIllisible: "تعذرت قراءة صورة (صيغة غير مدعومة).", rien: "أضيفوا صورة أو كلمة على الأقل.",
  },
};

/** Réduit la photo (≈1600 px, JPEG) : rapide à envoyer en 4G et sous la limite de 3 Mo. */
async function reduire(f: File): Promise<Blob> {
  const url = URL.createObjectURL(f);
  try {
    const img = await new Promise<HTMLImageElement>((ok, ko) => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => ko(new Error("lecture")); i.src = url; });
    const k = Math.min(1, 1600 / Math.max(img.naturalWidth, img.naturalHeight));
    const c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(img.naturalWidth * k)); c.height = Math.max(1, Math.round(img.naturalHeight * k));
    c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
    for (const q of [0.82, 0.7, 0.55]) {
      const b = await new Promise<Blob | null>((ok) => c.toBlob(ok, "image/jpeg", q));
      if (b && b.size < 2.8 * 1024 * 1024) return b;
    }
    throw new Error("taille");
  } finally { URL.revokeObjectURL(url); }
}

interface Choisie { id: string; blob: Blob; apercu: string }

export default function Souvenirs() {
  const { jeton: jetonUrl = "", token = "" } = useParams();
  const groupe = !!token;
  const [trouve, setTrouve] = useState("");
  const jeton = (groupe ? trouve : jetonUrl).toLowerCase();
  const [prenom, setPrenom] = useState("");
  const [famille, setFamille] = useState("");
  const [cherche, setCherche] = useState(false);
  const [recherche, setRecherche] = useState<"" | "absent" | "plusieurs" | "indispo">("");
  const [noms, setNoms] = useState("");
  const [langue, setLangue] = useState<Langue>(() => { const l = (typeof navigator !== "undefined" ? navigator.language : "fr").slice(0, 2); return l === "ar" ? "ar" : l === "en" ? "en" : "fr"; });
  const t = T[langue];
  const [etat, setEtat] = useState<Etat | null | undefined>(undefined);
  const [photos, setPhotos] = useState<Choisie[]>([]);
  const [mot, setMot] = useState("");
  const [consent, setConsent] = useState(false);
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState("");
  const [fini, setFini] = useState<number | null>(null);
  const [progres, setProgres] = useState("");
  const [lecture, setLecture] = useState(0);
  const caseRef = useRef<HTMLInputElement>(null);
  const fichier = useRef<HTMLInputElement>(null);
  const apercus = useRef<string[]>([]);

  useEffect(() => () => apercus.current.forEach((u) => URL.revokeObjectURL(u)), []);
  useEffect(() => {
    (async () => {
      if (groupe && !jeton) { setEtat(undefined); return; }
      if (!/^[0-9a-f-]{36}$/i.test(jeton)) { setEtat(null); return; }
      const { data } = await (supabase as any).rpc("souvenir_etat", { p_jeton: jeton });
      setEtat(data ?? null);
      if (data?.mot) setMot(data.mot);
    })();
  }, [jeton, groupe]);
  useEffect(() => {
    if (!groupe) return;
    (async () => {
      if (!/^[0-9a-f-]{36}$/i.test(token)) { setNoms("?"); return; }
      const { data } = await (supabase as any).rpc("rsvp_groupe_infos", { p_token: token });
      setNoms(data?.noms ?? "?");
    })();
  }, [groupe, token]);
  const chercher = async () => {
    const nom = `${prenom.trim()} ${famille.trim()}`.trim();
    if (nom.length < 3) return;
    setCherche(true); setRecherche(""); setErreur("");
    const { data, error } = await (supabase as any).rpc("rsvp_groupe_chercher", { p_token: token, p_nom: nom });
    setCherche(false);
    if (error) { setErreur(t.erreurCherche); return; }
    if (data?.statut === "trouve") setTrouve(data.jeton);
    else setRecherche(data?.statut === "plusieurs" ? "plusieurs" : data?.statut === "refuse" ? "indispo" : "absent");
  };

  const restantes = etat && !etat.complet ? Math.max(0, MAX - etat.nb_photos - photos.length) : 0;
  const date = etat?.date_evenement ? new Date(etat.date_evenement + "T00:00:00Z").toLocaleDateString(t.locale, { timeZone: "UTC", weekday: "long", day: "numeric", month: "long" }) : "";

  const choisir = async (liste: FileList | null) => {
    if (!liste) return;
    setErreur("");
    const toutes = Array.from(liste); const prises = toutes.slice(0, restantes);
    if (toutes.length > prises.length) setErreur(t.gardees(prises.length, toutes.length));
    setLecture(prises.length);
    const ajoutees: Choisie[] = [];
    for (const f of prises) {
      try { const blob = await reduire(f); const apercu = URL.createObjectURL(blob); apercus.current.push(apercu); ajoutees.push({ id: crypto.randomUUID(), blob, apercu }); }
      catch { setErreur(t.photoIllisible); }
    }
    setLecture(0);
    setPhotos((p) => [...p, ...ajoutees]);
    if (fichier.current) fichier.current.value = "";
  };

  const envoyer = async () => {
    if (!etat) return;
    if (!photos.length && !mot.trim()) { setErreur(t.rien); return; }
    if (!consent) { setErreur(t.cocher); caseRef.current?.scrollIntoView({ block: "center", behavior: "smooth" }); caseRef.current?.focus(); return; }
    setEnvoi(true); setErreur("");
    const chemins: string[] = [];
    try {
      for (const [k, p] of photos.entries()) {
        setProgres(t.progression(k + 1, photos.length));
        const chemin = `${jeton}/${p.id}.jpg`;
        const { error } = await supabase.storage.from("souvenirs").upload(chemin, p.blob, { contentType: "image/jpeg", upsert: false });
        // « existe déjà » = cette photo est déjà partie lors d'un essai précédent : on continue
        if (error && !/already exists|duplicate/i.test(String((error as any).message ?? "") + String((error as any).statusCode ?? ""))) throw error;
        chemins.push(chemin);
      }
      const { data, error } = await (supabase as any).rpc("souvenir_enregistrer", { p_jeton: jeton, p_mot: mot, p_fichiers: chemins, p_consentement: consent });
      if (error) throw error;
      setFini(data?.nb_photos ?? chemins.length);
      setEtat({ ...etat, complet: !!data?.complet || etat.complet, nb_photos: data?.nb_photos ?? etat.nb_photos + chemins.length, mot: mot.trim() || etat.mot });
      setPhotos([]);
    } catch { setErreur(chemins.length ? t.partiel(chemins.length, photos.length) : t.erreur); }
    setEnvoi(false); setProgres("");
  };

  const coque = (contenu: React.ReactNode) => (
    <div className="inv inv-page" dir={langue === "ar" ? "rtl" : "ltr"} style={{ "--inv-fond": "#141414", "--inv-texte": "#FFFFFF", "--inv-sur-fond": "#FFFFFF", "--inv-accent": "#E4D49A", "--inv-sur-accent": "#141414", "--inv-papier": "#1C1A16" } as React.CSSProperties}>
      <Seo noindex />
      <div className="inv-colonne" data-testid="souvenirs" style={{ paddingBlock: 28 }}>
        <div className="inv-langues">
          {(["fr", "en", "ar"] as Langue[]).map((l) => <button key={l} type="button" aria-pressed={langue === l} onClick={() => setLangue(l)}>{l === "fr" ? "FR" : l === "en" ? "EN" : "عربي"}</button>)}
        </div>
        {contenu}
        <p className="inv-pied">Heavent People Agency</p>
      </div>
    </div>
  );

  if (groupe && !jeton) {
    if (noms === "?") return coque(<p style={{ textAlign: "center" }}>{t.introuvable}</p>);
    return coque(
      <form onSubmit={(ev) => { ev.preventDefault(); void chercher(); }} data-testid="souvenirs-recherche">
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <p className="inv-titre-suite" style={{ marginBottom: 6 }}>{t.titre}</p>
          {noms && <p style={{ fontFamily: langue === "ar" ? "'Amiri', serif" : "'Pinyon Script', cursive", fontSize: 38, lineHeight: 1.1, margin: "0 0 8px", color: "var(--inv-accent)" }}>{noms}</p>}
          <p style={{ fontSize: 14, opacity: .85, margin: 0 }}>{t.cherche}</p>
        </div>
        <input className="inv-champ" style={{ marginBottom: 8 }} value={prenom} onChange={(e) => { setPrenom(e.target.value); setRecherche(""); }} placeholder={t.prenom} autoComplete="given-name" maxLength={40} data-testid="souvenirs-prenom" />
        <input className="inv-champ" style={{ marginBottom: 8 }} value={famille} onChange={(e) => { setFamille(e.target.value); setRecherche(""); }} placeholder={t.nomFamille} autoComplete="family-name" maxLength={40} data-testid="souvenirs-nom" />
        {erreur && <p className="inv-erreur">{erreur}</p>}
        {recherche === "plusieurs" && <p className="inv-erreur">{t.plusieurs}</p>}
        {recherche === "indispo" && <p className="inv-erreur">{t.indispo}</p>}
        {recherche === "absent" && <p className="inv-erreur" data-testid="souvenirs-absent">{t.absent} <a href={`/reponse/${token}`} style={{ textDecoration: "underline" }}>{t.repondre}</a></p>}
        <button type="submit" className="inv-btn" disabled={cherche || prenom.trim().length < 2 || famille.trim().length < 2} data-testid="souvenirs-chercher">{cherche && <Loader2 className="h-4 w-4 animate-spin" />} {t.continuer}</button>
      </form>);
  }
  if (etat === undefined) return coque(<Loader2 className="h-6 w-6 animate-spin mx-auto" />);
  if (etat === null) return coque(<p style={{ textAlign: "center" }}>{t.introuvable}</p>);

  const entete = (
    <div style={{ textAlign: "center", marginBottom: 20 }}>
      <p className="inv-titre-suite" style={{ marginBottom: 6 }}>{t.titre}</p>
      <p style={{ fontFamily: "'Pinyon Script', cursive", fontSize: 38, lineHeight: 1.1, margin: "0 0 8px", color: "var(--inv-accent)" }}>{etat.noms}</p>
      {etat.etat === "ouverte" && <p style={{ fontSize: 14, opacity: .85, margin: 0 }}>{t.intro(etat.noms)}</p>}
    </div>
  );

  if (etat.etat === "avant") return coque(<>{entete}<p style={{ textAlign: "center" }} data-testid="souvenirs-avant">{t.avant(date)}</p></>);
  if (etat.etat === "fermee") return coque(<>{entete}<p style={{ textAlign: "center" }} data-testid="souvenirs-fermee">{t.fermee}</p></>);

  if (fini !== null) return coque(
    <>{entete}
      <div style={{ textAlign: "center" }} data-testid="souvenirs-merci">
        <CheckCircle2 className="h-8 w-8 mx-auto" style={{ color: "var(--inv-accent)" }} />
        <p style={{ fontWeight: 500, margin: "10px 0 4px" }}>{t.merci}</p>
        <p style={{ fontSize: 14, opacity: .8, margin: 0 }}>{t.merciSuite(fini)}</p>
        {etat.nb_photos < MAX && !etat.complet && <button type="button" className="inv-lien" onClick={() => setFini(null)}>{t.encore}</button>}
      </div>
    </>);

  return coque(
    <>{entete}
      <div data-testid="souvenirs-formulaire">
        {restantes > 0 ? (
          <>
            <input ref={fichier} type="file" accept="image/*" multiple hidden onChange={(e) => void choisir(e.target.files)} data-testid="souvenirs-fichier" />
            <button type="button" className="inv-choix" onClick={() => fichier.current?.click()} data-testid="souvenirs-ajouter" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, minHeight: 56 }}>
              <Camera className="h-5 w-5" /> {t.ajouter}
            </button>
            <p style={{ fontSize: 12, opacity: .75, textAlign: "center", margin: "6px 0 12px" }}>{t.reste(restantes)}</p>
          </>
        ) : <p style={{ fontSize: 13, opacity: .85, textAlign: "center" }} data-testid="souvenirs-plein">{etat.complet ? t.albumPlein : t.complet}</p>}
          {lecture > 0 && <p style={{ fontSize: 13, opacity: .8, textAlign: "center" }} aria-live="polite"><Loader2 className="h-4 w-4 animate-spin" style={{ display: "inline", marginInlineEnd: 6 }} />{langue === "ar" ? "تحضير صوركم…" : langue === "en" ? "Preparing your photos…" : "Préparation de vos photos…"}</p>}
        {photos.length > 0 && (
          <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(88px,1fr))", gap: 8, listStyle: "none", padding: 0, margin: "0 0 14px" }}>
            {photos.map((p) => (
              <li key={p.id} style={{ position: "relative", aspectRatio: "1", overflow: "hidden", borderRadius: 4, background: "#222" }}>
                <img src={p.apercu} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <button type="button" aria-label={t.retirer} onClick={() => setPhotos((l) => l.filter((x) => x.id !== p.id))}
                  style={{ position: "absolute", top: 4, insetInlineEnd: 4, width: 44, height: 44, borderRadius: 22, background: "rgba(0,0,0,.65)", color: "#fff", display: "grid", placeItems: "center" }}><X className="h-4 w-4" /></button>
              </li>
            ))}
          </ul>
        )}
        <label htmlFor="souv-mot" className="inv-etiq" style={{ display: "block", marginBottom: 6 }}>{t.etiqMot}</label>
        <textarea id="souv-mot" value={mot} onChange={(e) => setMot(e.target.value)} maxLength={500} rows={3} placeholder={t.mot} className="inv-champ" style={{ marginBottom: 12 }} data-testid="souvenirs-mot" />
        <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, lineHeight: 1.4, margin: "0 0 14px", minHeight: 44 }}>
          <input ref={caseRef} type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} style={{ width: 22, height: 22, marginTop: 2, accentColor: "#E4D49A", flexShrink: 0 }} data-testid="souvenirs-consent" />
          <span>{t.consent} <em style={{ opacity: .8 }}>{t.definitif}</em></span>
        </label>
        {erreur && <p className="inv-erreur" aria-live="polite">{erreur}</p>}
        {envoi && <p style={{ fontSize: 12, opacity: .8, textAlign: "center", margin: "0 0 8px" }}>{langue === "ar" ? "أبقوا هذه الصفحة مفتوحة." : langue === "en" ? "Keep this page open." : "Gardez cette page ouverte."}</p>}
        <button type="button" className="inv-btn" disabled={envoi || lecture > 0 || (!photos.length && !mot.trim())} onClick={() => void envoyer()} data-testid="souvenirs-envoyer">
          {envoi && <Loader2 className="h-4 w-4 animate-spin" />} {envoi ? (progres || t.envoi) : t.envoyer}
        </button>
      </div>
    </>);
}
