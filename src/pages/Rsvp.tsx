import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Seo from "@/components/Seo";
import { CheckCircle2, Loader2, Minus, Plus } from "lucide-react";
import Invitation from "@/components/invitation/Invitation";
import type { InvitationReglages } from "@/lib/invitation";

interface Infos {
  nom?: string; nb_prevus: number; reponse: "attente" | "oui" | "non"; nb_confirmes: number | null; remarque: string | null;
  noms: string; date_evenement: string | null; lieu: string | null; message: string | null; date_limite: string | null; invitation?: InvitationReglages | null;
}
type Langue = "fr" | "en" | "ar";
const T = {
  fr: {
    invite: "Vous êtes invité(e) au mariage de", cher: "Bonjour", repondre: "Serez-vous des nôtres ?", oui: "Avec joie, je serai là", non: "Je ne pourrai pas venir",
    combien: "Nombre de personnes", mot: "Un mot pour les mariés, un régime alimentaire… (facultatif)", envoyer: "Envoyer ma réponse",
    merciOui: "Merci ! Votre présence est confirmée.", merciNon: "Merci de nous avoir prévenus.", modifier: "Modifier ma réponse",
    avant: "Merci de répondre avant le", introuvable: "Cette invitation est introuvable.", erreur: "La réponse n'a pas pu être envoyée. Réessayez.",
        prenom: "Prénom", nomFamille: "Nom", chercher: "Continuer", cherche: "Retrouvons votre invitation", pasTrouve: "Nous ne vous trouvons pas dans la liste. Vérifiez l'orthographe, ou envoyez quand même votre réponse : les mariés la valideront.", plusieurs: "Plusieurs invités portent ce nom. Utilisez le lien personnel que les mariés vous ont envoyé.", envoyerQuandMeme: "Répondre quand même", retour: "Changer de nom", bonjourNom: (n: string) => `Bonjour ${n}`,
    close: "Les réponses sont closes pour ce mariage.", personnes: (n: number) => `${n} personne${n > 1 ? "s" : ""}`, locale: "fr-FR",
  },
  en: {
    invite: "You are invited to the wedding of", cher: "Dear", repondre: "Will you join us?", oui: "Joyfully accept", non: "Regretfully decline",
    combien: "Number of guests", mot: "A note for the couple, dietary needs… (optional)", envoyer: "Send my reply",
    merciOui: "Thank you! Your attendance is confirmed.", merciNon: "Thank you for letting us know.", modifier: "Change my reply",
    avant: "Kindly reply before", introuvable: "This invitation could not be found.", erreur: "Your reply could not be sent. Please try again.",
        prenom: "First name", nomFamille: "Last name", chercher: "Continue", cherche: "Let's find your invitation", pasTrouve: "We can't find you in the guest list. Check the spelling, or reply anyway: the couple will validate it.", plusieurs: "Several guests share this name. Please use the personal link the couple sent you.", envoyerQuandMeme: "Reply anyway", retour: "Change name", bonjourNom: (n: string) => `Hello ${n}`,
    close: "Replies are now closed for this wedding.", personnes: (n: number) => `${n} guest${n > 1 ? "s" : ""}`, locale: "en-GB",
  },
  ar: {
    invite: "يسعدنا دعوتكم لحضور حفل زفاف", cher: "مرحباً", repondre: "هل ستشرفوننا بحضوركم؟", oui: "بكل سرور، سأحضر", non: "للأسف لن أتمكن من الحضور",
    combien: "عدد الأشخاص", mot: "كلمة للعروسين، نظام غذائي… (اختياري)", envoyer: "إرسال ردي",
    merciOui: "شكراً! تم تأكيد حضوركم.", merciNon: "شكراً لإعلامنا.", modifier: "تعديل ردي",
    avant: "يرجى الرد قبل", introuvable: "هذه الدعوة غير موجودة.", erreur: "تعذر إرسال الرد. حاولوا مرة أخرى.",
        prenom: "الاسم الشخصي", nomFamille: "اسم العائلة", chercher: "متابعة", cherche: "لنجد دعوتكم", pasTrouve: "لم نجدكم في قائمة المدعوين. تحققوا من الكتابة أو أرسلوا ردكم على أي حال وسيؤكده العروسان.", plusieurs: "عدة مدعوين يحملون هذا الاسم. استعملوا الرابط الشخصي الذي أرسله لكم العروسان.", envoyerQuandMeme: "الرد على أي حال", retour: "تغيير الاسم", bonjourNom: (n: string) => `مرحباً ${n}`,
    close: "انتهت فترة الرد على هذه الدعوة.", personnes: (n: number) => `${n} ${n > 1 ? "أشخاص" : "شخص"}`, locale: "ar-MA",
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
  const [recherche, setRecherche] = useState<"" | "absent" | "plusieurs">("");
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
      if (data) { setNb(data.nb_confirmes || data.nb_prevus); setMot(data.remarque ?? ""); setChoix(data.reponse === "attente" ? null : data.reponse); }
    })();
  }, [jeton, groupe]);

  const dateTxt = (d: string) => new Date(d + "T00:00:00Z").toLocaleDateString(t.locale, { timeZone: "UTC", weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const passe = !!infos?.date_evenement && infos.date_evenement < new Date().toISOString().slice(0, 10);

  const envoyer = async (direct?: "oui" | "non") => {
    const rep = direct ?? choix;
    if (!rep || !infos) return;
    setEnvoi(true); setErreur("");
    const { error } = await (supabase as any).rpc("rsvp_repondre", { p_jeton: jeton, p_reponse: rep, p_nb: rep === "oui" ? nb : 0, p_remarque: mot });
    setEnvoi(false);
    if (error) { setErreur(t.erreur); return; }
    setInfos({ ...infos, reponse: rep, nb_confirmes: rep === "oui" ? nb : 0, remarque: mot });
    setEdition(false);
  };

  const nomSaisi = `${prenom.trim()} ${famille.trim()}`.trim();
  const chercherInvite = async () => {
    if (nomSaisi.length < 3) return;
    setCherche(true); setRecherche(""); setErreur("");
    const { data, error } = await (supabase as any).rpc("rsvp_groupe_chercher", { p_token: token, p_nom: nomSaisi });
    setCherche(false);
    if (error) { setErreur(t.erreur); return; }
    if (data?.statut === "trouve") setJetonTrouve(data.jeton);
    else setRecherche(data?.statut === "plusieurs" ? "plusieurs" : "absent");
  };
  const repondreSansListe = async (rep: "oui" | "non") => {
    setEnvoi(true); setErreur("");
    const { data, error } = await (supabase as any).rpc("rsvp_groupe_ajouter", { p_token: token, p_nom: nomSaisi, p_reponse: rep, p_nb: 1, p_remarque: mot });
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
    const termine = !!g.date_evenement && g.date_evenement < new Date().toISOString().slice(0, 10);
    return (
      <>
        <Seo noindex />
        <Invitation noms={g.noms} date={g.date_evenement} lieu={g.lieu} message={g.message} reglages={g.invitation} langue={langue} haut={langues} bas={pied}>
          <div data-testid="rsvp-groupe">
            {termine ? <p style={{ textAlign: "center", fontSize: 14 }}>{t.close}</p> : (
              <form onSubmit={(e) => { e.preventDefault(); void chercherInvite(); }}>
                <p className="inv-titre-suite">{t.cherche}</p>
                <input className="inv-champ" style={{ marginBottom: 8 }} value={prenom} onChange={(e) => { setPrenom(e.target.value); setRecherche(""); }} placeholder={t.prenom} autoComplete="given-name" maxLength={40} data-testid="rsvp-prenom" />
                <input className="inv-champ" style={{ marginBottom: 8 }} value={famille} onChange={(e) => { setFamille(e.target.value); setRecherche(""); }} placeholder={t.nomFamille} autoComplete="family-name" maxLength={40} data-testid="rsvp-nom-famille" />
                {erreur && <p className="inv-erreur">{erreur}</p>}
                {recherche === "plusieurs" && <p className="inv-erreur">{t.plusieurs}</p>}
                {recherche === "absent" && (
                  <div>
                    <p className="inv-erreur">{t.pasTrouve}</p>
                    <textarea value={mot} onChange={(e) => setMot(e.target.value)} maxLength={200} rows={2} placeholder={t.mot} className="inv-champ" style={{ marginBottom: 8 }} />
                    {(["oui", "non"] as const).map((c) => <button key={c} type="button" className="inv-choix" disabled={envoi} onClick={() => void repondreSansListe(c)} data-testid={`rsvp-sans-liste-${c}`}>{t.envoyerQuandMeme} · {t[c]}</button>)}
                  </div>
                )}
                <button type="submit" className="inv-btn" disabled={cherche || nomSaisi.length < 3} data-testid="rsvp-chercher">{cherche && <Loader2 className="h-4 w-4 animate-spin" />} {t.chercher}</button>
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
          {repondu ? (
            <div style={{ textAlign: "center" }} data-testid="rsvp-merci">
              <CheckCircle2 className="h-8 w-8 mx-auto" style={{ color: "var(--inv-accent)" }} />
              <p style={{ fontWeight: 500, margin: "10px 0 4px" }}>{infos.reponse === "oui" ? t.merciOui : t.merciNon}</p>
              {infos.reponse === "oui" && <p style={{ fontSize: 14, opacity: .8, margin: 0 }}>{t.personnes(infos.nb_confirmes ?? 1)}</p>}
              {!passe && <button type="button" onClick={() => setEdition(true)} className="inv-lien">{t.modifier}</button>}
              {passe && <p style={{ fontSize: 12, opacity: .75 }}>{t.close}</p>}
            </div>
          ) : passe ? (
            <p style={{ textAlign: "center", fontSize: 14 }}>{t.close}</p>
          ) : (
            <div>
              <p className="inv-titre-suite">{t.repondre}</p>
              {(["oui", "non"] as const).map((c) => (
                <button key={c} type="button" onClick={() => { setChoix(c); if (infos.nb_prevus <= 1) void envoyer(c); }} aria-pressed={choix === c} data-testid={`rsvp-${c}`} className="inv-choix">
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
              <button type="button" onClick={() => envoyer()} disabled={!choix || envoi} data-testid="rsvp-envoyer" className="inv-btn">
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
