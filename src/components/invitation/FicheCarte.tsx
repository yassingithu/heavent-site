import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, X } from "lucide-react";
import { Link } from "react-router-dom";
import Invitation from "./Invitation";
import ChampDate from "./ChampDate";
import { OPTIONS_CARTE, PRIX_OPTION, descriptionVente, prixDe, totalCommande, type OuvertureDef } from "@/lib/invitation";
import { evenementDe, GROUPES } from "@/lib/evenements";
import { supabase } from "@/integrations/supabase/client";
import { suivre } from "@/lib/suivi";

const WHATSAPP = "https://wa.me/212610939655?text=";
const aujourdhui = () => new Date().toISOString().slice(0, 10);
/** Date d'exemple : toujours dans le futur, pour que l'aperçu ne se démode pas. */
const dateExemple = () => { const d = new Date(); d.setMonth(d.getMonth() + 9); d.setDate(12); return d.toISOString().slice(0, 10); };
/** Moins de 10 jours entre aujourd'hui et la date : la livraison (1 semaine après le paiement) risque de ne pas tenir. */
const tropProche = (iso: string) => !!iso && (new Date(iso).getTime() - Date.now()) / 86400000 < 10;
const numeroAffiche = (t: string) => { const d = t.replace(/\D/g, ""); if (d.startsWith("212") && d.length === 12) return `+212 ${d[3]} ${d.slice(4).replace(/(\d\d)(?=\d)/g, "$1 ")}`; if (d.length === 10 && d.startsWith("0")) return `+212 ${d[1]} ${d.slice(2).replace(/(\d\d)(?=\d)/g, "$1 ")}`; return t; };
const reduit = () => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Aperçu qui se rejoue sans fin : ouverture, carte écrite, quelques secondes de pause, puis on recommence. */
function ApercuBoucle({ ouverture }: { ouverture: OuvertureDef }) {
  const [n, setN] = useState(1);
  const racine = useRef<HTMLDivElement>(null);
  const [date] = useState(dateExemple);
  useEffect(() => {
    if (reduit()) return;
    const el = racine.current?.querySelector<HTMLElement>("[data-testid=invitation]"); if (!el) return;
    let t = 0;
    /* on rejoue seul quelques fois, puis on laisse la main au bouton : pas de boucle infinie en arrière-plan */
    const verif = () => { window.clearTimeout(t); if (el.dataset.phase === "ouverte" && n < 4) t = window.setTimeout(() => setN((x) => x + 1), 5500); };
    const mo = new MutationObserver(verif); mo.observe(el, { attributes: true, attributeFilter: ["data-phase"] }); verif();
    return () => { mo.disconnect(); window.clearTimeout(t); };
  }, [ouverture.id, n]);
  return (
    <div className="cv-apercu" ref={racine} data-testid="apercu-boucle">
      <div className="cv-apercu-in" aria-hidden="true" {...{ inert: "" }}>
        <Invitation key={ouverture.id} noms="Lina & Adam" date={date} lieu="Marrakech"
          reglages={{ modele: "or-ivoire", couleurs: { fond: "#EAE2D0" }, ouverture: ouverture.id }} pleinePage={false} rejouer={n} autoOuvrir />
      </div>
      <button type="button" className="cv-rejouer" onClick={() => setN((x) => x + 1)} data-testid="invitation-rejouer">↺ Revoir l'ouverture</button>
    </div>
  );
}

interface Props { ouvert: boolean; onFermer: () => void; ouverture: OuvertureDef; rang: number }

/** Fiche d'une carte : l'aperçu tourne en continu, à côté (ordinateur) ou avant (téléphone) la demande. Rien à régler : l'équipe prépare l'aperçu personnalisé. */
export default function FicheCarte({ ouvert, onFermer, ouverture: o }: Props) {
  const [etape, setEtape] = useState<"carte" | "demande">("carte");
  const [v, setV] = useState({ noms: "", occasion: "mariage", date: "", lieu: "", message: "", nom: "", tel: "", accord: false, heure: "", maps: "", programme: "", musique: "", photos: false });
  const [opts, setOpts] = useState<string[]>([]);
  const bascule = (id: string) => setOpts((a) => a.includes(id) ? a.filter((x) => x !== id) : [...a, id]);
  const [dateOk, setDateOk] = useState(true);
  const [err, setErr] = useState<Record<string, string>>({});
  const [etat, setEtat] = useState<"saisie" | "envoi" | "ok">("saisie");
  const [erreur, setErreur] = useState<string | null>(null);
  const corps = useRef<HTMLDivElement>(null);
  useEffect(() => { if (ouvert) { setEtape("carte"); setErr({}); setErreur(null); setEtat("saisie"); } }, [ouvert, o.id]);
  const maj = (k: string, x: string | boolean) => { setV((a) => ({ ...a, [k]: x })); if (err[k]) setErr((e) => ({ ...e, [k]: "" })); };
  const prix = totalCommande(o, opts);
  useEffect(() => { if (etat === "ok") requestAnimationFrame(() => document.querySelector<HTMLElement>("[data-testid=cartes-merci]")?.focus()); }, [etat]);

  const envoyer = async (e: React.FormEvent) => {
    e.preventDefault(); setErreur(null);
    const x: Record<string, string> = {};
    if (!v.noms.trim()) x.noms = "Indiquez les prénoms à écrire sur la carte.";
    if (!dateOk) x.date = "Complétez la date (jour, mois, année sur 4 chiffres) ou videz les cases.";
    else if (v.date && v.date < aujourdhui()) x.date = "Cette date est déjà passée.";
    if (v.nom.trim().length < 2) x.nom = "Indiquez votre nom.";
    if (!v.tel.trim()) x.tel = "Indiquez votre numéro WhatsApp : c'est là que nous vous envoyons l'aperçu.";
    else if (v.tel.replace(/\D/g, "").length < 8) x.tel = "Ce numéro semble incomplet.";
    if (!v.accord) x.accord = "Cochez la case pour que nous puissions vous répondre.";
    setErr(x);
    const premier = Object.keys(x)[0];
    if (premier) { document.getElementById(`cv-champ-${premier}`)?.focus(); return; }
    setEtat("envoi");
    const resume = `Demande de carte « ${o.nom} » (${prixDe(o)})`;
    const choisies = OPTIONS_CARTE.filter((x) => opts.includes(x.id));
    const details = [choisies.length > 0 && `Options (${PRIX_OPTION} DH chacune) : ${choisies.map((x) => x.nom).join(", ")}`, v.heure && `Heure : ${v.heure}`, v.maps && `Lien Google Maps : ${v.maps}`, v.programme && `Programme : ${v.programme}`, v.musique && `Musique souhaitée : ${v.musique}`, v.photos && "Photos à envoyer par WhatsApp", `Total estimé : ${prix} DH`].filter(Boolean).join("\n");
    const { error } = await (supabase as any).rpc("carte_demander", {
      p_nom: v.nom, p_telephone: v.tel, p_email: "", p_occasion: v.occasion, p_noms: v.noms,
      p_date: v.date || null, p_lieu: v.lieu, p_message: [resume, v.message && `Message de la carte : ${v.message}`, details].filter(Boolean).join("\n\n"),
      p_invitation: { ouverture: o.id, evenement: v.occasion === "mariage" ? undefined : v.occasion, noms: v.noms, message: v.message, extras: opts, total: prix, details: { heure: v.heure, maps: v.maps, programme: v.programme, musique: v.musique, photos: v.photos } },
    });
    if (error) { setEtat("saisie"); return setErreur(error.code === "P0429" ? "Vous avez déjà envoyé plusieurs demandes. Merci de patienter un peu ou de nous écrire sur WhatsApp." : "L'envoi n'a pas fonctionné. Réessayez, ou écrivez-nous sur WhatsApp."); }
    suivre("clic", `cartes:demande:${o.id}`); setEtat("ok");
    requestAnimationFrame(() => corps.current?.scrollTo({ top: 0 }));
  };

  return (
    <Dialog.Root open={ouvert} onOpenChange={(x) => { if (!x) onFermer(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="cv-voile" />
        <Dialog.Content className="cv-fiche" data-etape={etape} data-testid="fiche-carte"
          onCloseAutoFocus={(e) => { e.preventDefault(); document.querySelector<HTMLElement>(`[data-testid="ouverture-${o.id}"]`)?.focus({ preventScroll: true }); }}>
          <header className="cv-fiche-tete">
            {etape === "demande" && etat !== "ok" && <button type="button" className="cv-retour" onClick={() => setEtape("carte")} aria-label="Revoir la carte" data-testid="fiche-retour"><ArrowLeft aria-hidden="true" /></button>}
            <div>
              <small>À partir de {prixDe(o)}</small>
              <Dialog.Title>{o.nom}</Dialog.Title>
            </div>
            <Dialog.Close className="cv-fermer" aria-label="Fermer la fiche" data-testid="fiche-fermer"><X aria-hidden="true" /></Dialog.Close>
          </header>
          {etape !== "carte" || etat === "ok" ? <Dialog.Description className="cv-sr">{descriptionVente(o)}</Dialog.Description> : null}
          <div className="cv-fiche-corps" ref={corps}>
            {etat === "ok" ? (
              <div className="cv-merci" role="status" data-testid="cartes-merci" tabIndex={-1}>
                <h4>Demande bien reçue</h4>
                <p>Merci {v.nom.split(" ")[0]}. Nous préparons votre carte « {o.nom} » avec vos prénoms et vous envoyons l'aperçu sur WhatsApp au <b>{numeroAffiche(v.tel)}</b>.</p>
                <p className="cv-merci-num">Ce n'est pas le bon numéro ? <a href={WHATSAPP + encodeURIComponent(`Bonjour Heavent, j'ai fait une erreur de numéro dans ma demande de carte « ${o.nom} ». Mon bon numéro : `)} target="_blank" rel="noopener noreferrer">Écrivez-nous ici</a>.</p>
                {tropProche(v.date) && <p className="cv-alerte" role="note">Votre date est proche : écrivez-nous sur WhatsApp pour que nous vous répondions en priorité.</p>}
                <p className="cv-merci-etapes">Vous validez l'aperçu, vous réglez, puis votre carte est livrée sous 1 semaine à partir du paiement.</p>
                <a className="s-btn s-btn-plein cv-bouton" href={WHATSAPP + encodeURIComponent(`Bonjour Heavent, je viens de demander la carte « ${o.nom} ». Je m'appelle ${v.nom}.`)} target="_blank" rel="noopener noreferrer">Nous écrire sur WhatsApp</a>
                <button type="button" className="cv-lien" onClick={onFermer} data-testid="autre-demande">Voir d'autres cartes</button>
              </div>
            ) : etape === "carte" ? (
              <div className="cv-fiche-carte">
                <div className="cv-infos">
                  <Dialog.Description id="cv-fiche-desc" className="cv-desc">{descriptionVente(o)}</Dialog.Description>
                  <ul className="cv-etiquettes">{o.styles.slice(0, 2).map((t) => <li key={t}>{t}</li>)}</ul>
                  <div className="cv-formule"><b>La carte · {prixDe(o)}</b><p>Écrite à vos prénoms, avec la date et le lieu, partagée par WhatsApp. Ajoutez seulement les options qu'il vous faut, {PRIX_OPTION} DH chacune : compte à rebours, cœur à gratter, plan Google Maps, confirmation de présence, livre d'or…</p></div>
                  <ul className="cv-garanties"><li>Aperçu à vos prénoms avant de payer</li><li>Livrée 1 semaine après le paiement</li><li>Partagée par WhatsApp</li></ul>
                  <p className="cv-apercu-note">Exemple avec « Lina &amp; Adam ». Votre carte portera vos prénoms, votre date et votre lieu.</p>
                </div>
                <div className="cv-scene">
                  {ouvert && <ApercuBoucle ouverture={o} />}
                </div>
              </div>
            ) : (
              <form onSubmit={envoyer} className="cv-form" noValidate data-testid="cartes-formulaire">
                <h3>Je veux cette carte</h3>
                <p className="cv-form-aide">Dites-nous ce qu'il faut écrire dessus. Nous vous envoyons l'aperçu sur WhatsApp, vous ne payez qu'après l'avoir validé.</p>
                <label>Prénoms à écrire sur la carte
                  <input className="cv-champ" value={v.noms} onChange={(e) => maj("noms", e.target.value)} placeholder="Lina & Adam" maxLength={80} id="cv-champ-noms" data-testid="cartes-noms" aria-invalid={!!err.noms} />
                  {err.noms && <span className="cv-err" role="alert">{err.noms}</span>}
                </label>
                <label>Occasion
                  <select className="cv-champ" value={v.occasion} onChange={(e) => maj("occasion", e.target.value)} data-testid="fiche-occasion">
                    {GROUPES.flatMap((g) => g.evenements).map((e) => <option key={e.id} value={e.id}>{e.nom}</option>)}
                  </select>
                </label>
                <div className="cv-duo">
                  <label>Date
                    <ChampDate onValidite={setDateOk} className="cv-champ" value={v.date} onChange={(d) => maj("date", d)} data-testid="cartes-date" id="cv-champ-date" invalide={!!err.date} />
                    {err.date && <span className="cv-err" role="alert">{err.date}</span>}
                  </label>
                  <label>Lieu
                    <input className="cv-champ" value={v.lieu} onChange={(e) => maj("lieu", e.target.value)} placeholder="Villa, salle, ville…" maxLength={120} data-testid="cartes-lieu" />
                  </label>
                </div>
                {tropProche(v.date) && !err.date && <p className="cv-alerte" role="note" data-testid="alerte-delai">Livraison 1 semaine après le paiement : pour une date aussi proche, <a href={WHATSAPP + encodeURIComponent("Bonjour Heavent, ma date est proche, est-il possible d'avoir ma carte à temps ?")} target="_blank" rel="noopener noreferrer">écrivez-nous d'abord sur WhatsApp</a>. Vous pouvez aussi envoyer la demande.</p>}
                <label>Un message sur la carte <i>(facultatif)</i>
                  <textarea className="cv-champ" rows={2} value={v.message} onChange={(e) => maj("message", e.target.value)} maxLength={400} placeholder="Nous serions heureux de partager ce moment avec vous." data-testid="cartes-message" />
                </label>
                <fieldset className="cv-options" data-testid="cartes-options">
                  <legend>Options <i>({PRIX_OPTION} DH chacune, facultatif)</i></legend>
                  {OPTIONS_CARTE.map((x) => (
                    <label key={x.id} className="cv-option">
                      <input type="checkbox" checked={opts.includes(x.id)} onChange={() => bascule(x.id)} data-testid={`option-${x.id}`} />
                      <span><b>{x.nom}</b><small>{x.texte}</small></span>
                      <em>+{PRIX_OPTION} DH</em>
                    </label>
                  ))}
                  {opts.includes("programme") && (
                    <div className="cv-option-champs">
                      <label>Heure<input className="cv-champ" value={v.heure} onChange={(e) => maj("heure", e.target.value)} placeholder="19h30" maxLength={20} /></label>
                      <label>Programme<textarea className="cv-champ" rows={2} value={v.programme} onChange={(e) => maj("programme", e.target.value)} maxLength={500} placeholder="Cérémonie 17h, cocktail 18h, dîner 20h…" /></label>
                    </div>
                  )}
                  {opts.includes("maps") && <div className="cv-option-champs"><label>Lien Google Maps<input className="cv-champ" type="url" inputMode="url" value={v.maps} onChange={(e) => maj("maps", e.target.value)} placeholder="https://maps.app.goo.gl/…" maxLength={300} /></label></div>}
                  {opts.includes("musique") && <div className="cv-option-champs"><label>Musique souhaitée<input className="cv-champ" value={v.musique} onChange={(e) => maj("musique", e.target.value)} placeholder="Titre ou ambiance (nous vous proposerons)" maxLength={120} /></label></div>}
                  {(opts.includes("histoire") || opts.includes("prenom")) && <label className="cv-accord"><input type="checkbox" checked={v.photos} onChange={(e) => maj("photos", e.target.checked)} /><span>Je vous envoie photos et textes par WhatsApp</span></label>}
                </fieldset>
                <div className="cv-duo">
                  <label>Votre nom
                    <input className="cv-champ" value={v.nom} onChange={(e) => maj("nom", e.target.value)} autoComplete="name" id="cv-champ-nom" data-testid="cartes-nom" aria-invalid={!!err.nom} />
                    {err.nom && <span className="cv-err" role="alert">{err.nom}</span>}
                  </label>
                  <label>Votre WhatsApp
                    <input className="cv-champ" type="tel" inputMode="tel" value={v.tel} onChange={(e) => maj("tel", e.target.value)} autoComplete="tel" placeholder="+212 6…" id="cv-champ-tel" data-testid="cartes-tel" aria-invalid={!!err.tel} />
                    {err.tel && <span className="cv-err" role="alert">{err.tel}</span>}
                  </label>
                </div>
                <label className="cv-accord">
                  <input type="checkbox" checked={v.accord} onChange={(e) => maj("accord", e.target.checked)} id="cv-champ-accord" data-testid="cartes-accord" />
                  <span>J'accepte que Heavent utilise ces informations pour me répondre. <Link to="/politique-confidentialite">Confidentialité</Link></span>
                </label>
                {err.accord && <span className="cv-err" role="alert">{err.accord}</span>}
                {erreur && <p role="alert" className="cv-err" data-testid="cartes-erreur">{erreur}</p>}
                <button type="submit" disabled={etat === "envoi"} aria-busy={etat === "envoi"} className="s-btn s-btn-plein cv-bouton" data-testid="cartes-envoyer">
                  {etat === "envoi" ? "Envoi en cours…" : `Envoyer ma demande · ${prix} DH`}
                </button>
                <ul className="cv-petit">
                  <li>Aucun paiement maintenant.</li>
                  <li>Livraison 1 semaine après le paiement, par WhatsApp.</li>
                  <li>Une modification supplémentaire après l'aperçu : 50 DH.</li>
                </ul>
              </form>
            )}
          </div>
          {etat !== "ok" && etape === "carte" && (
            <footer className="cv-fiche-pied">
              <p>Aperçu avant de payer · livraison 1 semaine après le paiement</p>
              <div>
                <button type="button" className="s-btn s-btn-plein cv-bouton" onClick={() => { setEtape("demande"); corps.current?.scrollTo({ top: 0 }); }} data-testid="fiche-ajouter">Je veux cette carte · {prixDe(o)}</button>
              </div>
            </footer>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
