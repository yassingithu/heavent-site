import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, X } from "lucide-react";
import { Link } from "react-router-dom";
import Invitation from "./Invitation";
import ChampDate from "./ChampDate";
import { FORMULES, descriptionVente, formuleDe, prixDe, prixNombre, totalCommande, type OuvertureDef } from "@/lib/invitation";
import { evenementDe, GROUPES } from "@/lib/evenements";
import { supabase } from "@/integrations/supabase/client";
import { suivre } from "@/lib/suivi";

const WHATSAPP = "https://wa.me/212610939655?text=";
const aujourdhui = () => new Date().toISOString().slice(0, 10);
/** Date d'exemple : toujours dans le futur, pour que l'aperçu ne se démode pas. */
const dateExemple = () => { const d = new Date(); d.setMonth(d.getMonth() + 9); d.setDate(12); return d.toISOString().slice(0, 10); };
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
    const verif = () => { window.clearTimeout(t); if (el.dataset.phase === "ouverte") t = window.setTimeout(() => setN((x) => x + 1), 5500); };
    const mo = new MutationObserver(verif); mo.observe(el, { attributes: true, attributeFilter: ["data-phase"] }); verif();
    return () => { mo.disconnect(); window.clearTimeout(t); };
  }, [ouverture.id, n]);
  return (
    <div className="cv-apercu" ref={racine} data-testid="apercu-boucle">
      <Invitation key={ouverture.id} noms="Lina & Adam" date={date} lieu="Domaine des Roses, Marrakech" message="Nous serions heureux de partager ce moment avec vous."
        reglages={{ modele: "or-ivoire", ouverture: ouverture.id }} pleinePage={false} rejouer={n} autoOuvrir />
      <button type="button" className="cv-rejouer" onClick={() => setN((x) => x + 1)} data-testid="invitation-rejouer">↺ Revoir l'ouverture</button>
    </div>
  );
}

interface Props { ouvert: boolean; onFermer: () => void; ouverture: OuvertureDef; rang: number }

/** Fiche d'une carte : l'aperçu tourne en continu, à côté (ordinateur) ou avant (téléphone) la demande. Rien à régler : l'équipe prépare l'aperçu personnalisé. */
export default function FicheCarte({ ouvert, onFermer, ouverture: o }: Props) {
  const f = FORMULES.find((x) => x.id === formuleDe(o));
  const [etape, setEtape] = useState<"carte" | "demande">("carte");
  const [v, setV] = useState({ noms: "", occasion: "mariage", date: "", lieu: "", message: "", nom: "", tel: "", accord: false });
  const [dateOk, setDateOk] = useState(true);
  const [err, setErr] = useState<Record<string, string>>({});
  const [etat, setEtat] = useState<"saisie" | "envoi" | "ok">("saisie");
  const [erreur, setErreur] = useState<string | null>(null);
  const corps = useRef<HTMLDivElement>(null);
  useEffect(() => { if (ouvert) { setEtape("carte"); setErr({}); setErreur(null); setEtat("saisie"); } }, [ouvert, o.id]);
  const maj = (k: string, x: string | boolean) => { setV((a) => ({ ...a, [k]: x })); if (err[k]) setErr((e) => ({ ...e, [k]: "" })); };
  const prix = totalCommande(o, []);

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
    const { error } = await (supabase as any).rpc("carte_demander", {
      p_nom: v.nom, p_telephone: v.tel, p_email: "", p_occasion: v.occasion, p_noms: v.noms,
      p_date: v.date || null, p_lieu: v.lieu, p_message: [resume, v.message && `Message de la carte : ${v.message}`].filter(Boolean).join("\n\n"),
      p_invitation: { ouverture: o.id, evenement: v.occasion === "mariage" ? undefined : v.occasion, noms: v.noms, message: v.message, extras: [], total: prix },
    });
    if (error) { setEtat("saisie"); return setErreur(error.code === "P0429" ? "Vous avez déjà envoyé plusieurs demandes. Merci de patienter un peu ou de nous écrire sur WhatsApp." : "L'envoi n'a pas fonctionné. Réessayez, ou écrivez-nous sur WhatsApp."); }
    suivre("clic", `cartes:demande:${o.id}`); setEtat("ok");
    requestAnimationFrame(() => corps.current?.scrollTo({ top: 0 }));
  };

  return (
    <Dialog.Root open={ouvert} onOpenChange={(x) => { if (!x) onFermer(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="cv-voile" />
        <Dialog.Content className="cv-fiche" data-etape={etape} aria-describedby="cv-fiche-desc" data-testid="fiche-carte"
          onCloseAutoFocus={(e) => { e.preventDefault(); document.querySelector<HTMLElement>(`[data-testid="ouverture-${o.id}"]`)?.focus({ preventScroll: true }); }}>
          <header className="cv-fiche-tete">
            {etape === "demande" && etat !== "ok" && <button type="button" className="cv-retour" onClick={() => setEtape("carte")} aria-label="Revoir la carte" data-testid="fiche-retour"><ArrowLeft aria-hidden="true" /></button>}
            <div>
              <small>{f?.nom} · {prixDe(o)}</small>
              <Dialog.Title>{o.nom}</Dialog.Title>
            </div>
            <Dialog.Close className="cv-fermer" aria-label="Fermer la fiche" data-testid="fiche-fermer"><X aria-hidden="true" /></Dialog.Close>
          </header>
          <div className="cv-fiche-corps" ref={corps}>
            {etat === "ok" ? (
              <div className="cv-merci" role="status" data-testid="cartes-merci" tabIndex={-1}>
                <h4>Demande bien reçue</h4>
                <p>Merci {v.nom.split(" ")[0]}. Nous préparons votre carte « {o.nom} » avec vos prénoms et vous envoyons l'aperçu sur WhatsApp au {v.tel}.</p>
                <p className="cv-merci-etapes">Vous validez l'aperçu, vous réglez, puis votre carte est livrée sous 1 semaine à partir du paiement.</p>
                <a className="s-btn s-btn-plein cv-bouton" href={WHATSAPP + encodeURIComponent(`Bonjour Heavent, je viens de demander la carte « ${o.nom} ». Je m'appelle ${v.nom}.`)} target="_blank" rel="noopener noreferrer">Nous écrire sur WhatsApp</a>
                <button type="button" className="cv-lien" onClick={onFermer} data-testid="autre-demande">Voir d'autres cartes</button>
              </div>
            ) : etape === "carte" ? (
              <div className="cv-fiche-carte">
                <div className="cv-infos">
                  <p id="cv-fiche-desc" className="cv-desc">{descriptionVente(o)}</p>
                  <ul className="cv-etiquettes">{[f?.nom, ...o.styles.slice(0, 2)].map((t) => <li key={t}>{t}</li>)}</ul>
                  <div className="cv-formule"><b>{f?.nom} · {prixDe(o)}</b><p>{f?.texte}</p></div>
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
                <label>Un message sur la carte <i>(facultatif)</i>
                  <textarea className="cv-champ" rows={2} value={v.message} onChange={(e) => maj("message", e.target.value)} maxLength={400} placeholder="Nous serions heureux de partager ce moment avec vous." data-testid="cartes-message" />
                </label>
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
                  {etat === "envoi" ? "Envoi en cours…" : `Envoyer ma demande · ${prixNombre(o)} DH`}
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
