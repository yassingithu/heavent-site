import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Seo from "@/components/Seo";
import { CheckCircle2, Loader2, Minus, Plus } from "lucide-react";
import Invitation from "@/components/invitation/Invitation";
import type { InvitationReglages } from "@/lib/invitation";

interface Infos {
  nom?: string; accompagnants?: string[]; statut_liste?: "valide" | "a_valider" | "refuse"; mode?: "ouverte" | "fermee"; nb_prevus: number; reponse: "attente" | "oui" | "non"; nb_confirmes: number | null; remarque: string | null;
  noms: string; date_evenement: string | null; lieu: string | null; message: string | null; date_limite: string | null; invitation?: InvitationReglages | null;
}
type Langue = "fr" | "en" | "ar";
const T = {
  fr: {
    invite: "Vous êtes invité(e) au mariage de", cher: "Bonjour", repondre: "Serez-vous des nôtres ?", oui: "Avec joie, je serai là", non: "Je ne pourrai pas venir",
    combien: "Nombre de personnes", accompagne: (n: number) => `Les mariés vous autorisent à venir accompagné(e) : jusqu'à ${n} personnes en tout, vous compris.`, accompagnant: (i: number) => `Prénom et nom de l'accompagnant ${i}`, etiq: (i: number) => `Accompagnant ${i}`, phNom: "Prénom et nom", manque: (i: number) => `Il manque le prénom et le nom de l'accompagnant ${i}.`, nomsRequis: "Prénom et nom de chaque personne, enfants compris : ils servent au placement des tables. Même nom que vous ? Écrivez-le quand même.", pasTrouveFerme: "Nous ne vous trouvons pas dans la liste des invités. Vérifiez l'orthographe de votre prénom et de votre nom, comme sur votre invitation. Si cela ne fonctionne toujours pas, contactez les mariés : ils peuvent vous ajouter à la liste.", indisponible: "Cette invitation n'est plus disponible. Contactez les mariés.", aValider: "Les mariés vont valider votre venue. Vous serez prévenu(e) par eux.", venirAvec: "Je viens accompagné(e) de", avec: "Accompagné(e) de", mot: "Un mot pour les mariés, un régime alimentaire… (facultatif)", envoyer: "Envoyer ma réponse",
    merciOui: "Merci ! Votre présence est confirmée.", merciNon: "Merci de nous avoir prévenus.", modifier: "Modifier ma réponse",
    avant: "Merci de répondre avant le", introuvable: "Cette invitation est introuvable.", erreur: "La réponse n'a pas pu être envoyée. Réessayez.",
        prenom: "Prénom", nomFamille: "Nom", chercher: "Continuer", cherche: "Confirmez votre présence", consigne: "Écrivez votre prénom et votre nom, tels que les mariés vous ont invité(e).", nomRequis: "Indiquez votre prénom et votre nom (au moins 2 lettres chacun) pour continuer.", pasTrouve: "Nous ne vous trouvons pas dans la liste. Vérifiez l'orthographe, ou envoyez quand même votre réponse : les mariés la valideront.", plusieurs: "Plusieurs invités portent ce nom. Utilisez le lien personnel que les mariés vous ont envoyé.", envoyerQuandMeme: "Répondre quand même", retour: "Changer de nom", erreurCherche: "Recherche impossible. Réessayez.", bonjourNom: (n: string) => `Bonjour ${n}`,
    partager: "Partager mes photos du mariage", close: "Les réponses sont closes pour ce mariage.", personnes: (n: number) => `${n} personne${n > 1 ? "s" : ""}`, locale: "fr-FR",
  },
  en: {
    invite: "You are invited to the wedding of", cher: "Dear", repondre: "Will you join us?", oui: "Joyfully accept", non: "Regretfully decline",
    combien: "Number of guests", accompagne: (n: number) => `The couple allows you to bring guests: up to ${n} people in total, including you.`, accompagnant: (i: number) => `First and last name of guest ${i}`, etiq: (i: number) => `Guest ${i}`, phNom: "First and last name", manque: (i: number) => `The first and last name of guest ${i} is missing.`, nomsRequis: "First and last name of each person, children included: needed for the table plan. Same surname as you? Please write it anyway.", pasTrouveFerme: "We can't find you in the guest list. Check the spelling of your first and last name, as on your invitation. If it still doesn't work, contact the couple: they can add you to the list.", indisponible: "This invitation is no longer available. Please contact the couple.", aValider: "The couple will confirm your attendance and let you know.", venirAvec: "I am coming with", avec: "Accompanied by", mot: "A note for the couple, dietary needs… (optional)", envoyer: "Send my reply",
    merciOui: "Thank you! Your attendance is confirmed.", merciNon: "Thank you for letting us know.", modifier: "Change my reply",
    avant: "Kindly reply before", introuvable: "This invitation could not be found.", erreur: "Your reply could not be sent. Please try again.",
        prenom: "First name", nomFamille: "Last name", chercher: "Continue", cherche: "Confirm your attendance", consigne: "Write your first and last name, as the couple invited you.", nomRequis: "Enter your first and last name (at least 2 letters each) to continue.", pasTrouve: "We can't find you in the guest list. Check the spelling, or reply anyway: the couple will validate it.", plusieurs: "Several guests share this name. Please use the personal link the couple sent you.", envoyerQuandMeme: "Reply anyway", retour: "Change name", erreurCherche: "Search failed. Please try again.", bonjourNom: (n: string) => `Hello ${n}`,
    partager: "Share my wedding photos", close: "Replies are now closed for this wedding.", personnes: (n: number) => `${n} guest${n > 1 ? "s" : ""}`, locale: "en-GB",
  },
  ar: {
    invite: "يسعدنا دعوتكم لحضور حفل زفاف", cher: "مرحباً", repondre: "هل ستشرفوننا بحضوركم؟", oui: "بكل سرور، سأحضر", non: "للأسف لن أتمكن من الحضور",
    combien: "عدد الأشخاص", accompagne: (n: number) => `يسمح لكم العروسان بمرافقة آخرين: حتى ${n} أشخاص بمن فيهم أنتم.`, accompagnant: (i: number) => `الاسم الشخصي والعائلي للمرافق ${i}`, etiq: (i: number) => `المرافق ${i}`, phNom: "الاسم الشخصي والعائلي", manque: (i: number) => `ينقص الاسم الشخصي والعائلي للمرافق ${i}.`, nomsRequis: "الاسم الشخصي والعائلي لكل شخص بما في ذلك الأطفال: نحتاجه لتوزيع الطاولات. نفس اسم العائلة؟ اكتبوه رغم ذلك.", pasTrouveFerme: "لم نجدكم في قائمة المدعوين. تحققوا من كتابة اسمكم الشخصي والعائلي كما في دعوتكم. وإن لم ينجح الأمر، تواصلوا مع العروسين: يمكنهما إضافتكم إلى القائمة.", indisponible: "هذه الدعوة لم تعد متاحة. يرجى التواصل مع العروسين.", aValider: "سيؤكد العروسان حضوركم وسيخبرونكم.", venirAvec: "سأحضر برفقة", avec: "برفقة", mot: "كلمة للعروسين، نظام غذائي… (اختياري)", envoyer: "إرسال ردي",
    merciOui: "شكراً! تم تأكيد حضوركم.", merciNon: "شكراً لإعلامنا.", modifier: "تعديل ردي",
    avant: "يرجى الرد قبل", introuvable: "هذه الدعوة غير موجودة.", erreur: "تعذر إرسال الرد. حاولوا مرة أخرى.",
        prenom: "الاسم الشخصي", nomFamille: "اسم العائلة", chercher: "متابعة", cherche: "أكدوا حضوركم", consigne: "اكتبوا اسمكم الشخصي والعائلي كما دعاكم العروسان.", nomRequis: "أدخلوا اسمكم الشخصي والعائلي (حرفان على الأقل لكل منهما) للمتابعة.", pasTrouve: "لم نجدكم في قائمة المدعوين. تحققوا من الكتابة أو أرسلوا ردكم على أي حال وسيؤكده العروسان.", plusieurs: "عدة مدعوين يحملون هذا الاسم. استعملوا الرابط الشخصي الذي أرسله لكم العروسان.", envoyerQuandMeme: "الرد على أي حال", retour: "تغيير الاسم", erreurCherche: "تعذر البحث. حاولوا مرة أخرى.", bonjourNom: (n: string) => `مرحباً ${n}`,
    partager: "مشاركة صوري من الزفاف", close: "انتهت فترة الرد على هذه الدعوة.", personnes: (n: number) => `${n} ${n > 1 ? "أشخاص" : "شخص"}`, locale: "ar-MA-u-nu-latn-ca-gregory",
  },
};

export default function Rsvp() {
  const { jeton: jetonUrl = "", token = "" } = useParams();
  const groupe = !!token;
  const [jetonTrouve, setJetonTrouve] = useState("");
  const jeton = groupe ? jetonTrouve : jetonUrl;
  const [groupeInfos, setGroupeInfos] = useState<Infos | null | undefined>(undefined);
  const [prenom, setPrenom] = useState("");
  const [famille, setFamille] = useState("");
  const [cherche, setCherche] = useState(false);
  const [recherche, setRecherche] = useState<"" | "absent" | "plusieurs" | "refuse">("");
  const [langue, setLangue] = useState<Langue>(() => {
    const l = (typeof navigator !== "undefined" ? navigator.language : "fr").slice(0, 2);
    return l === "ar" ? "ar" : l === "en" ? "en" : "fr";
  });
  const t = T[langue];
  const [infos, setInfos] = useState<Infos | null | undefined>(undefined);
  const [choix, setChoix] = useState<"oui" | "non" | null>(null);
  const [nb, setNb] = useState(1);
  const [mot, setMot] = useState("");
  const [accomps, setAccomps] = useState<string[]>([]);
  const [nbOuvert, setNbOuvert] = useState(0);
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState("");
  const [edition, setEdition] = useState(false);

  useEffect(() => {
    if (!groupe) return;
    (async () => {
      if (!/^[0-9a-f-]{36}$/i.test(token)) { setGroupeInfos(null); return; }
      const { data } = await (supabase as any).rpc("rsvp_groupe_infos", { p_token: token });
      setGroupeInfos(data ? { ...data, nb_prevus: 1, reponse: "attente", nb_confirmes: null, remarque: null } : null);
    })();
  }, [groupe, token]);

  useEffect(() => {
    (async () => {
      if (groupe && !jeton) { setInfos(undefined); return; }
      if (!/^[0-9a-f-]{36}$/i.test(jeton)) { setInfos(null); return; }
      const { data } = await (supabase as any).rpc("rsvp_public", { p_jeton: jeton });
      setInfos(data ?? null);
      if (data) { setNb(data.nb_confirmes || Math.max(1, 1 + (Array.isArray(data.accompagnants) ? data.accompagnants.filter(Boolean).length : 0))); setMot(data.remarque ?? ""); setAccomps(Array.isArray(data.accompagnants) ? data.accompagnants : []); setChoix(data.reponse === "attente" ? null : data.reponse); }
    })();
  }, [jeton, groupe]);

  const dateTxt = (d: string) => new Date(d + "T00:00:00Z").toLocaleDateString(t.locale, { timeZone: "UTC", weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const auj = new Date().toLocaleDateString("en-CA", { timeZone: "Africa/Casablanca" });
  const souvenirsOuverts = !!infos?.date_evenement && auj >= infos.date_evenement && auj <= new Date(new Date(infos.date_evenement + "T00:00:00Z").getTime() + 2 * 86400e3).toISOString().slice(0, 10);
  const passe = !!infos?.date_evenement && infos.date_evenement < new Date().toLocaleDateString("en-CA", { timeZone: "Africa/Casablanca" });

  const nomComplet = (v: string) => v.trim().length >= 5 && v.trim().split(/\s+/).length >= 2;
  const accompsNb = (n: number) => Array.from({ length: Math.max(0, n) }, (_, k) => (accomps[k] ?? "").trim().replace(/\s+/g, " "));
  const accompsOk = (n: number) => accompsNb(n).every(nomComplet);
  const premierManque = (n: number) => accompsNb(n).findIndex((v) => !nomComplet(v));
  const remarqueFinale = () => mot.trim().slice(0, 300);
  const envoyer = async (direct?: "oui" | "non") => {
    const rep = direct ?? choix;
    if (!rep || !infos) return;
    if (rep === "oui" && !accompsOk(nb - 1)) { setErreur(t.nomsRequis); return; }
    setEnvoi(true); setErreur("");
    const { error } = await (supabase as any).rpc("rsvp_repondre", { p_jeton: jeton, p_reponse: rep, p_nb: rep === "oui" ? nb : 0, p_remarque: remarqueFinale(), p_accompagnants: rep === "oui" ? accompsNb(nb - 1) : [] });
    setEnvoi(false);
    if (error) { setErreur(t.erreur); return; }
    setInfos({ ...infos, reponse: rep, nb_confirmes: rep === "oui" ? nb : 0, remarque: mot, accompagnants: rep === "oui" ? accompsNb(nb - 1) : [] });
    setEdition(false);
  };

  const nomSaisi = `${prenom.trim()} ${famille.trim()}`.trim();
  const chercherInvite = async () => {
    if (prenom.trim().length < 2 || famille.trim().length < 2) { setErreur(t.nomRequis); return; }
    setCherche(true); setRecherche(""); setErreur("");
    const { data, error } = await (supabase as any).rpc("rsvp_groupe_chercher", { p_token: token, p_nom: nomSaisi });
    setCherche(false);
    if (error) { setErreur(t.erreurCherche); return; }
    if (data?.statut === "trouve") setJetonTrouve(data.jeton);
    else setRecherche(data?.statut === "plusieurs" ? "plusieurs" : data?.statut === "refuse" ? "refuse" : "absent");
  };
  const repondreSansListe = async (rep: "oui" | "non") => {
    if (rep === "oui" && !accompsOk(nbOuvert)) { setErreur(t.nomsRequis); return; }
    setEnvoi(true); setErreur("");
    const { data, error } = await (supabase as any).rpc("rsvp_groupe_ajouter", { p_token: token, p_nom: nomSaisi, p_reponse: rep, p_nb: 1 + (rep === "oui" ? nbOuvert : 0), p_remarque: mot, p_accompagnants: rep === "oui" ? accompsNb(nbOuvert) : [] });
    setEnvoi(false);
    if (error || !data?.jeton) { setErreur(t.erreur); return; }
    setJetonTrouve(data.jeton);
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

  if (groupe && !jeton) {
    const g = groupeInfos;
    if (g === undefined) return <div className="inv inv-page" style={{ "--inv-fond": "#141414", "--inv-sur-fond": "#FFFFFF" } as React.CSSProperties}><Loader2 className="h-6 w-6 animate-spin mx-auto" style={{ color: "#fff" }} /></div>;
    if (g === null) return <div className="inv inv-page" style={{ "--inv-fond": "#141414", "--inv-texte": "#FFFFFF", "--inv-sur-fond": "#FFFFFF" } as React.CSSProperties}><Seo noindex /><p style={{ color: "#fff" }}>{t.introuvable}</p></div>;
    const termine = !!g.date_evenement && g.date_evenement < new Date().toLocaleDateString("en-CA", { timeZone: "Africa/Casablanca" });
    return (
      <>
        <Seo noindex />
        <Invitation noms={g.noms} date={g.date_evenement} lieu={g.lieu} message={g.message} reglages={g.invitation} langue={langue} haut={langues} bas={pied}>
          <div data-testid="rsvp-groupe">
            {termine ? <p style={{ textAlign: "center", fontSize: 14 }}>{t.close}</p> : (
              <form onSubmit={(e) => { e.preventDefault(); void chercherInvite(); }}>
                <p className="inv-titre-suite">{t.cherche}</p>
                <p className="inv-info" style={{ textAlign: "center", marginBottom: 10 }} data-testid="rsvp-consigne">{t.consigne}</p>
                <input className="inv-champ" style={{ marginBottom: 8 }} value={prenom} onChange={(e) => { setPrenom(e.target.value); setRecherche(""); setErreur(""); }} placeholder={t.prenom} autoComplete="given-name" maxLength={40} aria-invalid={!!erreur && prenom.trim().length < 2} data-testid="rsvp-prenom" />
                <input className="inv-champ" style={{ marginBottom: 8 }} value={famille} onChange={(e) => { setFamille(e.target.value); setRecherche(""); setErreur(""); }} placeholder={t.nomFamille} autoComplete="family-name" maxLength={40} aria-invalid={!!erreur && famille.trim().length < 2} data-testid="rsvp-nom-famille" />
                {erreur && <p className="inv-erreur">{erreur}</p>}
                {recherche === "plusieurs" && <p className="inv-erreur">{t.plusieurs}</p>}
                {recherche === "refuse" && <p className="inv-erreur">{t.indisponible}</p>}
                {recherche === "absent" && g.mode !== "ouverte" && <p className="inv-erreur" data-testid="rsvp-liste-fermee">{t.pasTrouveFerme}</p>}
                {recherche === "absent" && g.mode === "ouverte" && (
                  <div>
                    <p className="inv-erreur">{t.pasTrouve}</p>
                    <div className="inv-ligne">
                      <span>{t.venirAvec}</span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
                        <button type="button" className="inv-rond" onClick={() => setNbOuvert(Math.max(0, nbOuvert - 1))} aria-label="-"><Minus className="h-4 w-4" /></button>
                        <strong className="inv-nb" data-testid="rsvp-nb-ouvert">+{nbOuvert}</strong>
                        <button type="button" className="inv-rond" onClick={() => setNbOuvert(Math.min(4, nbOuvert + 1))} aria-label="+"><Plus className="h-4 w-4" /></button>
                      </span>
                    </div>
                    {nbOuvert > 0 && <div className="inv-groupe"><p className="inv-info">{t.nomsRequis}</p>{Array.from({ length: nbOuvert }, (_, k) => <label key={k} className="inv-etiq"><span>{t.etiq(k + 1)}</span><input className="inv-champ" value={accomps[k] ?? ""} onChange={(e) => setAccomps((a) => { const c = [...a]; c[k] = e.target.value; return c; })} maxLength={80} placeholder={t.phNom} autoComplete="off" data-testid={`rsvp-accompagnant-${k + 1}`} /></label>)}{premierManque(nbOuvert) >= 0 && <p className="inv-manque" aria-live="polite">{t.manque(premierManque(nbOuvert) + 1)}</p>}</div>}
                    <textarea value={mot} onChange={(e) => setMot(e.target.value)} maxLength={200} rows={2} placeholder={t.mot} className="inv-champ" style={{ marginBottom: 8 }} />
                    {(["oui", "non"] as const).map((c) => <button key={c} type="button" className="inv-choix" disabled={envoi || (c === "oui" && !accompsOk(nbOuvert))} onClick={() => void repondreSansListe(c)} data-testid={`rsvp-sans-liste-${c}`}>{t.envoyerQuandMeme} · {t[c]}</button>)}
                  </div>
                )}
                <button type="submit" className="inv-btn" disabled={cherche} data-testid="rsvp-chercher">{cherche && <Loader2 className="h-4 w-4 animate-spin" />} {t.chercher}</button>
              </form>
            )}
          </div>
        </Invitation>
      </>
    );
  }

  if (infos === undefined || infos === null) {
    return (
      <div className="inv inv-page" style={{ "--inv-fond": "#141414", "--inv-texte": "#FFFFFF", "--inv-sur-fond": "#FFFFFF" } as React.CSSProperties} dir={langue === "ar" ? "rtl" : "ltr"}>
        <Seo noindex />
        <div className="inv-colonne" data-testid="rsvp">
          {infos === undefined ? <Loader2 className="h-6 w-6 animate-spin mx-auto" /> : <><p style={{ textAlign: "center" }}>{t.introuvable}</p>{groupe && <button type="button" className="inv-lien" style={{ display: "block", margin: "12px auto" }} onClick={() => { setJetonTrouve(""); setInfos(undefined); setRecherche(""); }}>{t.retour}</button>}</>}
        </div>
      </div>
    );
  }

  return (
    <>
      <Seo noindex />
      <Invitation ouverte={groupe} noms={infos.noms} date={infos.date_evenement} lieu={infos.lieu} message={infos.message} reglages={infos.invitation} langue={langue} invite={infos.nom}
        haut={langues} bas={pied}>
        <div data-testid="rsvp">
          {repondu ? (
            <div style={{ textAlign: "center" }} data-testid="rsvp-merci">
              <CheckCircle2 className="h-8 w-8 mx-auto" style={{ color: "var(--inv-accent)" }} />
              <p style={{ fontWeight: 500, margin: "10px 0 4px" }}>{infos.reponse === "oui" ? t.merciOui : t.merciNon}</p>
              {infos.reponse === "oui" && <p style={{ fontSize: 14, opacity: .8, margin: 0 }}>{t.personnes(infos.nb_confirmes ?? 1)}</p>}
              {infos.reponse === "oui" && !!infos.accompagnants?.length && <p style={{ fontSize: 13, opacity: .8, margin: "4px 0 0" }} data-testid="rsvp-merci-accompagnants">{t.avec} : {infos.accompagnants.join(", ")}</p>}
              {infos.statut_liste === "a_valider" && <p style={{ fontSize: 13, opacity: .85, margin: "8px 0 0" }} data-testid="rsvp-a-valider">{t.aValider}</p>}
              {souvenirsOuverts && infos.statut_liste !== "a_valider" && <a href={`/souvenirs/${jeton}`} className="inv-btn" style={{ display: "block", margin: "14px 0 0", textDecoration: "none", textAlign: "center" }} data-testid="rsvp-souvenirs">{t.partager}</a>}
              {!passe && <button type="button" onClick={() => setEdition(true)} className="inv-lien">{t.modifier}</button>}
              {passe && <p style={{ fontSize: 12, opacity: .75 }}>{t.close}</p>}
            </div>
          ) : passe ? (
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 14 }}>{t.close}</p>
              {souvenirsOuverts && infos.statut_liste !== "a_valider" && <a href={`/souvenirs/${jeton}`} className="inv-btn" style={{ display: "block", textDecoration: "none" }} data-testid="rsvp-souvenirs">{t.partager}</a>}
            </div>
          ) : (
            <div>
              {souvenirsOuverts && infos.statut_liste !== "a_valider" && <a href={`/souvenirs/${jeton}`} className="inv-btn" style={{ display: "block", margin: "0 0 16px", textDecoration: "none", textAlign: "center" }} data-testid="rsvp-souvenirs">{t.partager}</a>}
              <p className="inv-titre-suite">{t.repondre}</p>
              {(["oui", "non"] as const).map((c) => (
                <button key={c} type="button" onClick={() => { setChoix(c); if (infos.nb_prevus <= 1) void envoyer(c); }} aria-pressed={choix === c} data-testid={`rsvp-${c}`} className="inv-choix">
                  {c === "oui" ? t.oui : t.non}
                </button>
              ))}
              {infos.nb_prevus > 1 && <p style={{ fontSize: 13, textAlign: "center", margin: "0 0 10px", opacity: .85 }} data-testid="rsvp-accompagne">{t.accompagne(infos.nb_prevus)}</p>}
              {choix === "oui" && infos.nb_prevus > 1 && (
                <div className="inv-ligne">
                  <span>{t.venirAvec}</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
                    <button type="button" className="inv-rond" onClick={() => setNb(Math.max(1, nb - 1))} aria-label="-"><Minus className="h-4 w-4" /></button>
                    <strong className="inv-nb" data-testid="rsvp-nb" aria-label={t.personnes(nb)}>+{nb - 1}<small>{t.personnes(nb)}</small></strong>
                    <button type="button" className="inv-rond" onClick={() => setNb(Math.min(infos.nb_prevus, nb + 1))} aria-label="+"><Plus className="h-4 w-4" /></button>
                  </span>
                </div>
              )}
              {choix === "oui" && nb > 1 && (
                <div data-testid="rsvp-accompagnants" className="inv-groupe">
                  <p className="inv-info">{t.nomsRequis}</p>
                  {Array.from({ length: nb - 1 }, (_, k) => (
                    <label key={k} className="inv-etiq"><span>{t.etiq(k + 1)}</span>
                      <input className="inv-champ" value={accomps[k] ?? ""} onChange={(e) => setAccomps((a) => { const c = [...a]; c[k] = e.target.value; return c; })} maxLength={80} placeholder={t.phNom} autoComplete="off" enterKeyHint="next" data-testid={`rsvp-accompagnant-${k + 1}`} />
                    </label>
                  ))}
                  {premierManque(nb - 1) >= 0 && <p className="inv-manque" aria-live="polite" data-testid="rsvp-manque">{t.manque(premierManque(nb - 1) + 1)}</p>}
                </div>
              )}
              {choix && <textarea value={mot} onChange={(e) => setMot(e.target.value)} maxLength={300} rows={3} placeholder={t.mot} className="inv-champ" style={{ marginBottom: 8 }} />}
              {erreur && <p className="inv-erreur">{erreur}</p>}
              <button type="button" onClick={() => envoyer()} disabled={!choix || envoi || (choix === "oui" && !accompsOk(nb - 1))} data-testid="rsvp-envoyer" className="inv-btn">
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
