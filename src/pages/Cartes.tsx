import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { Bouton, Etoile, Surtitre } from "@/components/seuil/Seuil";
import "@/styles/cartes.css";
import "@/styles/boutique.css";
import ChoixOccasion from "@/components/invitation/ChoixOccasion";
import PersonnaliserInvitation from "@/components/invitation/PersonnaliserInvitation";
import BoutiqueCartes from "@/components/invitation/BoutiqueCartes";
import FicheCarte from "@/components/invitation/FicheCarte";
import { evenementDe, GROUPES, type TypeEvenement } from "@/lib/evenements";
import { decorsPour } from "@/lib/decors";
import { ouverturesBoutique, ouvertureDe, type InvitationReglages, FORMULES, formuleDe, prixDe, prixNombre, extrasPour, totalCommande } from "@/lib/invitation";
import { supabase } from "@/integrations/supabase/client";
import { suivre } from "@/lib/suivi";

/**
 * Boutique « Cartes d'invitation » : le client parcourt le catalogue, ouvre la fiche d'une carte (aperçu en direct, texte, options),
 * l'ajoute à sa commande, puis envoie sa demande à Heavent (pas de paiement en ligne : l'équipe le recontacte). Page en français pour l'instant.
 */
const WHATSAPP = "https://wa.me/212610939655?text=";
const champ = "w-full min-h-11 px-3 text-base bg-[#FFFDF7] border-0 border-b border-[#A8933F] rounded-none";
const GARANTIES: [string, string][] = [["1 semaine", "Pour recevoir votre carte"], ["Aperçu", "Validé avant le paiement"], ["Paiement", "Avant la réception du fichier final"], ["WhatsApp", "Pour partager votre carte"]];

/** Ce que contient la commande : la carte telle qu'elle a été réglée dans la fiche, et ses options. */
interface Ligne { invitation: InvitationReglages; noms: string; date: string; lieu: string; message: string; extras: string[] }
const aujourdhui = () => new Date().toISOString().slice(0, 10);

export default function Cartes() {
  const [invitation, setInvitation] = useState<InvitationReglages>({ modele: "fleur-oranger" });
  const [noms, setNoms] = useState("");
  const [date, setDate] = useState("");
  const [lieu, setLieu] = useState("");
  const [message, setMessage] = useState("");
  const [extras, setExtras] = useState<string[]>([]);
  const [fiche, setFiche] = useState(false);
  const [panier, setPanier] = useState<Ligne | null>(null);
  const [f, setF] = useState({ nom: "", telephone: "", email: "", note: "", accord: false });
  const [etat, setEtat] = useState<"saisie" | "envoi" | "ok">("saisie");
  const [erreur, setErreur] = useState<string | null>(null);
  const [err, setErr] = useState<Record<string, string>>({});
  const [versCommande, setVersCommande] = useState(false);
  const [maj, setMaj] = useState(0);
  const ev = evenementDe(invitation.evenement);
  const ouv = ouvertureDe(invitation.ouverture);
  const rang = (id: string) => ouverturesBoutique().findIndex((x) => x.id === id) + 1;
  const reduit = () => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const cible = document.getElementById("commande"); if (!cible) return;
    const io = new IntersectionObserver(([e]) => setVersCommande(e.isIntersecting), { rootMargin: "0px 0px -15% 0px" });
    io.observe(cible); return () => io.disconnect();
  }, []);

  /* L'occasion règle les textes et le décor ; la carte choisie, elle, ne change pas */
  const choisirOccasion = (id: TypeEvenement) => {
    const d = evenementDe(id);
    setInvitation((v) => ({
      ...v, evenement: id === "mariage" ? undefined : id, modele: d.modele, ouverture: v.ouverture ?? d.ouverture, revelation: "aucune", couleurs: {}, questions: [],
      ...(decorsPour(id).some((x) => x.id === v.decor) ? {} : { decor: undefined, club: undefined, club_logo: undefined }),
    }));
  };

  const ouvrirFiche = (id: string) => {
    if (panier && panier.invitation.ouverture === id) {
      setInvitation(panier.invitation); setNoms(panier.noms); setDate(panier.date); setLieu(panier.lieu); setMessage(panier.message); setExtras(panier.extras);
    } else { setInvitation((v) => ({ ...v, ouverture: id })); setExtras(panier ? panier.extras : []); }
    setErr({}); setFiche(true); suivre("clic", `cartes:fiche:${id}`);
  };
  const modifier = () => panier && ouvrirFiche(panier.invitation.ouverture!);
  const retirer = () => { setPanier(null); setEtat("saisie"); };
  const recommencer = () => { setPanier(null); setEtat("saisie"); setNoms(""); setDate(""); setLieu(""); setMessage(""); setExtras([]); setErr({}); setF((x) => ({ ...x, accord: false, note: "" })); document.getElementById("boutique")?.scrollIntoView({ block: "start", behavior: reduit() ? "auto" : "smooth" }); };

  const ajouter = () => {
    const x: Record<string, string> = {};
    if (!noms.trim()) x.noms = "Indiquez les prénoms à écrire sur la carte.";
    if (date && date < aujourdhui()) x.date = "Cette date est déjà passée. Choisissez une date à venir.";
    setErr(x);
    const premier = Object.keys(x)[0];
    if (premier) { document.getElementById(`cartes-champ-${premier}`)?.focus(); return; }
    setPanier({ invitation, noms, date, lieu, message, extras: extras.filter((id) => extrasPour(ouv).some((e) => e.id === id)) });
    setVersCommande(true); setMaj((n) => n + 1); setFiche(false); suivre("clic", "cartes:ajout");
    window.setTimeout(() => document.getElementById("commande")?.scrollIntoView({ block: "start", behavior: reduit() ? "auto" : "smooth" }), 220);
  };

  const envoyer = async (e: React.FormEvent) => {
    e.preventDefault(); setErreur(null);
    if (!panier) return;
    const x: Record<string, string> = {};
    if (f.nom.trim().length < 2) x.nom = "Indiquez votre nom.";
    if (!f.telephone.trim()) x.tel = "Indiquez votre numéro WhatsApp, pour vous répondre.";
    else if (f.telephone.trim() && f.telephone.replace(/\D/g, "").length < 8) x.tel = "Ce numéro semble incomplet.";
    if (!f.accord) x.accord = "Cochez la case ci-dessus pour que nous puissions vous répondre.";
    setErr(x);
    const premier = Object.keys(x)[0];
    if (premier) { document.getElementById(`cartes-champ-${premier}`)?.focus(); return; }
    setEtat("envoi");
    const o = ouvertureDe(panier.invitation.ouverture);
    const choisies = extrasPour(o).filter((z) => panier.extras.includes(z.id));
    const total = totalCommande(o, panier.extras);
    const resume = [`Commande : carte « ${o.nom} » (${prixDe(o)})`, ...choisies.map((z) => `+ ${z.nom} (${z.prix} DH)`), `Total estimé : ${total} DH`].join("\n");
    const { error } = await (supabase as any).rpc("carte_demander", {
      p_nom: f.nom, p_telephone: f.telephone, p_email: f.email, p_occasion: panier.invitation.evenement ?? "mariage", p_noms: panier.noms,
      p_date: panier.date || null, p_lieu: panier.lieu, p_message: [resume, panier.message && `Message de la carte : ${panier.message}`, f.note].filter(Boolean).join("\n\n"),
      p_invitation: { ...panier.invitation, noms: panier.noms, message: panier.message, extras: panier.extras, total },
    });
    if (error) { setEtat("saisie"); return setErreur(error.code === "P0429" ? "Vous avez déjà envoyé plusieurs demandes. Merci de patienter un peu ou de nous écrire sur WhatsApp." : "L'envoi n'a pas fonctionné. Réessayez, ou écrivez-nous sur WhatsApp."); }
    suivre("clic", "cartes:demande"); setEtat("ok");
    requestAnimationFrame(() => { const m = document.querySelector<HTMLElement>('[data-testid="cartes-merci"]'); m?.setAttribute("tabindex", "-1"); m?.scrollIntoView({ block: "center", behavior: reduit() ? "auto" : "smooth" }); m?.focus({ preventScroll: true }); });
  };

  const ligne = panier ? ouvertureDe(panier.invitation.ouverture) : null;
  const lignesExtras = ligne && panier ? extrasPour(ligne).filter((z) => panier.extras.includes(z.id)) : [];
  const totalPanier = ligne && panier ? totalCommande(ligne, panier.extras) : 0;
  const evPanier = panier ? evenementDe(panier.invitation.evenement) : ev;

  /* Contenu de la fiche : texte de la carte puis options */
  const reglages = (
    <div className="boutique-reglages">
      <p className="boutique-formule-texte"><b>Formule {FORMULES.find((x) => x.id === formuleDe(ouv))?.nom}, {prixDe(ouv)}.</b> {FORMULES.find((x) => x.id === formuleDe(ouv))?.texte}</p>
      <fieldset className="boutique-champs">
        <legend>Sur votre carte</legend>
        <label className="sm:col-span-3">Prénoms ou nom affichés
          <input className={champ} value={noms} onChange={(e) => { setNoms(e.target.value); if (err.noms) setErr((x) => ({ ...x, noms: "" })); }} placeholder={/^mariage|fiancailles|henne/.test(ev.id) ? "Lina & Adam" : "Adam"} maxLength={80} data-testid="cartes-noms" id="cartes-champ-noms" aria-invalid={!!err.noms} aria-describedby={err.noms ? "err-noms" : undefined} />
          {!!err.noms && <span id="err-noms" className="block text-[#9B2C2C]" role="alert">{err.noms}</span>}
        </label>
        <label>Date
          <input type="date" lang="fr" min={aujourdhui()} className={champ} value={date} onChange={(e) => { setDate(e.target.value); if (err.date) setErr((x) => ({ ...x, date: "" })); }} data-testid="cartes-date" id="cartes-champ-date" aria-invalid={!!err.date} />
          {!!err.date && <span className="block text-[#9B2C2C]" role="alert">{err.date}</span>}
        </label>
        <label className="sm:col-span-2">Lieu
          <input className={champ} value={lieu} onChange={(e) => setLieu(e.target.value)} placeholder="Villa, salle, restaurant, ville…" maxLength={120} data-testid="cartes-lieu" />
        </label>
        <label className="sm:col-span-3">Occasion
          <select className={`${champ} boutique-occasion-select`} value={ev.id} onChange={(e) => choisirOccasion(e.target.value as TypeEvenement)} data-testid="fiche-occasion">
            {GROUPES.flatMap((g) => g.evenements).map((e) => <option key={e.id} value={e.id}>{e.nom}</option>)}
          </select>
        </label>
        <label className="sm:col-span-3">Votre message sur la carte (facultatif)
          <textarea className={champ} rows={3} value={message} onChange={(e) => setMessage(e.target.value)} maxLength={400} placeholder="Ex. : Nous serions heureux de partager ce moment avec vous." data-testid="cartes-message" />
        </label>
        {invitation.revelation && invitation.revelation !== "aucune" && !date && <p className="sm:col-span-3 text-[#7A5F1F]">Ajoutez la date : c'est elle que la surprise dévoile.</p>}
      </fieldset>
      <fieldset className="boutique-options">
        <legend>Options</legend>
        {extrasPour(ouv).map((z) => (
          <label key={z.id} className="boutique-option">
            <input type="checkbox" checked={extras.includes(z.id)} onChange={(e) => setExtras(e.target.checked ? [...extras, z.id] : extras.filter((x) => x !== z.id))} data-testid={`extra-${z.id}`} />
            <span><b>{z.nom}</b><small>{z.texte}</small></span>
            <em>+ {z.prix} DH</em>
          </label>
        ))}
      </fieldset>
    </div>
  );

  return (
    <div className="cartes-page">
      <Seo perso={{ chemin: "/cartes", titre: "Cartes d'invitation digitales sur mesure | Heavent", description: "Boutique de cartes d'invitation digitales : choisissez votre carte (mariage, fiançailles, baptême, anniversaire), voyez-la s'ouvrir, personnalisez-la, puis commandez auprès de Heavent." }} />
      <section className="s-nuit cartes-haut s-g">
        <div className="in">
          <div>
            <Surtitre className="s-entree-heros">Cartes d'invitation digitales</Surtitre>
            <h1 className="s-h1 s-entree-heros">Votre carte, <em>avant même</em> le premier invité.</h1>
            <p className="s-chapo s-entree-heros" style={{ animationDelay: ".12s" }}>Choisissez une carte, voyez-la s'ouvrir sur votre téléphone, écrivez vos prénoms dessus. Nous vous répondons avec un aperçu et le prix confirmé, de 250 à 750 DH selon la carte.</p>
            <div className="cartes-cta s-entree-heros" style={{ animationDelay: ".24s" }}>
              <a href="#boutique" className="s-btn s-btn-plein">Voir les cartes</a>
              <a href={WHATSAPP + encodeURIComponent("Bonjour Heavent, je voudrais une carte d'invitation digitale.")} target="_blank" rel="noopener noreferrer" className="cartes-lien">Ou écrivez-nous sur WhatsApp</a>
            </div>
          </div>
          <div className="cartes-scene" data-revele aria-hidden="true">
            <div className="cartes-carte cartes-c1"><div><small>Fiançailles</small><b>Salma<br />&amp; Omar</b><i>14 · 06 · 2027</i></div></div>
            <div className="cartes-carte cartes-c3"><div><small>Mariage</small><b>Lina<br />&amp; Adam</b><i>12 · 09 · 2027</i></div></div>
            <div className="cartes-carte cartes-c2"><div><small>Ont la joie de vous convier</small><b>Yasmine<br />&amp; Karim</b><i>03 · 10 · 2027</i></div></div>
          </div>
        </div>
        <div className="cartes-bande" />
      </section>

      <main className="text-[#2A2420] cartes-fond">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <ul className="boutique-garanties" aria-label="Nos engagements">{GARANTIES.map(([n, t]) => <li key={n}><b>{n}</b><span>{t}</span></li>)}</ul>

          <section id="boutique" className="scroll-mt-28" aria-labelledby="t-boutique">
            <header className="cartes-tete" data-revele>
              <span className="cartes-n" aria-hidden="true">01</span>
              <div><small>La boutique</small><h2 id="t-boutique">Choisissez votre carte</h2></div>
              {panier && <a href="#commande" className="boutique-panier-lien" data-testid="lien-commande">Ma commande · <span key={totalPanier} className="boutique-maj boutique-maj-inline">{totalPanier} DH</span></a>}
            </header>
            <p className="boutique-occasion-titre">Pour quelle occasion ?</p>
            <ChoixOccasion valeur={invitation.evenement} onChoisir={choisirOccasion} onglets />
            <BoutiqueCartes dansCommande={panier?.invitation.ouverture ?? null} onOuvrir={ouvrirFiche} />
          </section>

          <div className="cartes-sep" aria-hidden="true" />
          <section id="commande" className="scroll-mt-28" aria-labelledby="t-commande">
            <header className="cartes-tete" data-revele>
              <span className="cartes-n" aria-hidden="true">02</span>
              <div><small>Votre demande</small><h2 id="t-commande">Ma commande</h2></div>
            </header>
            {etat === "ok" ? (
              <div className="s-fairepart s-merci" role="status" data-testid="cartes-merci">
                <Etoile /><Etoile className="bas" />
                <h4 className="s-h3 s-entree-heros">Demande bien reçue</h4>
                <p className="cartes-delai s-entree-heros" style={{ animationDelay: ".25s" }}><b>1 semaine</b><span>pour votre carte</span></p>
                <p className="boutique-merci-texte">Merci {f.nom.split(" ")[0]}. Notre équipe prépare votre carte « {ligne?.nom} » : vous recevez un aperçu à valider, puis votre carte sous 1 semaine.</p>
                <p className="boutique-merci-rappel">Carte « {ligne?.nom} » · {totalPanier} DH · réponse sur WhatsApp au {f.telephone}</p>
                <Bouton href={WHATSAPP + encodeURIComponent(`Bonjour Heavent, je viens d'envoyer ma demande de carte d'invitation (${evPanier.nom}). Je m'appelle ${f.nom}.`)} externe variante="filet">Nous écrire sur WhatsApp</Bouton>
                <button type="button" className="boutique-lien" onClick={recommencer} data-testid="autre-demande">Faire une autre demande</button>
              </div>
            ) : !panier || !ligne ? (
              <div className="boutique-panier-vide" data-testid="commande-vide">
                <p>Votre commande est vide.</p>
                <span>Ouvrez une carte, écrivez vos prénoms dessus, puis ajoutez-la ici.</span>
                <a href="#boutique" className="s-btn s-btn-plein">Choisir ma carte</a>
              </div>
            ) : (
              <div className="boutique-commande">
                <aside className="boutique-recap" aria-label="Récapitulatif de la commande" data-testid="cartes-recap" data-revele="">
                  <span key={maj} className="boutique-recap-lueur" aria-hidden="true" />
                  <p className="boutique-recap-tete"><b>Reçu provisoire</b><span>{new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" }).replaceAll("/", " · ")}</span></p>
                  <div className="boutique-recap-carte">
                    <span className="boutique-recap-img" aria-hidden="true">{ligne.poster ? <img src={ligne.poster} alt="" /> : ligne.id === "enveloppe" || ligne.id === "rose-imperiale" ? <i>{String(rang(ligne.id)).padStart(2, "0")}</i> : <><b style={{ backgroundImage: `url(/ouvertures/${ligne.id}-g.webp)` }} /><b style={{ backgroundImage: `url(/ouvertures/${ligne.id}-d.webp)` }} /></>}</span>
                    <div>
                      <small>{FORMULES.find((x) => x.id === formuleDe(ligne))?.nom} · Nº {String(rang(ligne.id)).padStart(2, "0")}</small>
                      <b>{ligne.nom}</b>
                      <em className="boutique-recap-noms">{panier.noms}</em>
                      <span>{evPanier.nom}{panier.lieu ? ` · ${panier.lieu}` : ""}</span>
                      {panier.date && <span className="boutique-recap-date">{panier.date.split("-").reverse().join(" · ")}</span>}
                    </div>
                  </div>
                  <dl className="boutique-lignes">
                    <div><dt>Carte « {ligne.nom} »</dt><dd>{prixNombre(ligne)} DH</dd></div>
                    {lignesExtras.map((z) => <div key={z.id}><dt>{z.nom}</dt><dd>+ {z.prix} DH</dd></div>)}
                    <div className="boutique-total-ligne"><dt>Total estimé</dt><dd key={totalPanier} className="boutique-maj" data-testid="commande-total">{totalPanier} DH</dd></div>
                  </dl>
                  <p className="boutique-recap-note">Aucun paiement maintenant. Notre équipe vous contacte sur WhatsApp, vous validez l'aperçu, puis le paiement est réglé avant l'envoi du fichier final. Délai : 1 semaine.</p>
                  <div className="boutique-recap-actions">
                    <button type="button" className="boutique-lien" onClick={modifier} data-testid="commande-modifier">Modifier ma carte</button>
                    <button type="button" className="boutique-lien" onClick={retirer} data-testid="commande-retirer">Retirer</button>
                  </div>
                </aside>

                <form onSubmit={envoyer} className="space-y-3 s-form cartes-formulaire boutique-formulaire" noValidate>
                  <h3 className="boutique-form-titre">Comment vous répondre ?</h3>
                  <label className="block text-sm">Votre nom
                    <input className={champ} value={f.nom} onChange={(e) => setF({ ...f, nom: e.target.value })} autoComplete="name" required id="cartes-champ-nom" aria-invalid={!!err.nom} data-testid="cartes-nom" />
                    {err.nom && <span className="block text-sm text-[#9B2C2C]" role="alert">{err.nom}</span>}
                  </label>
                  <div className="grid gap-3">
                    <label className="block text-sm">Votre numéro WhatsApp
                      <input className={champ} type="tel" inputMode="tel" value={f.telephone} onChange={(e) => setF({ ...f, telephone: e.target.value })} autoComplete="tel" placeholder="+212 6…" id="cartes-champ-tel" aria-invalid={!!err.tel} data-testid="cartes-tel" />
                      {err.tel && <span className="block text-sm text-[#9B2C2C]" role="alert">{err.tel}</span>}
                    </label>
                  </div>
                  <label className="block text-sm">Une précision pour l'équipe (facultatif)
                    <textarea className={champ} rows={3} value={f.note} onChange={(e) => setF({ ...f, note: e.target.value })} maxLength={800} placeholder="Une envie, un thème, un nombre d'invités…" />
                  </label>
                  <label className="cartes-accord flex items-start gap-2 text-sm">
                    <input type="checkbox" className="mt-1" checked={f.accord} onChange={(e) => setF({ ...f, accord: e.target.checked })} id="cartes-champ-accord" aria-invalid={!!err.accord} data-testid="cartes-accord" />
                    <span>J'accepte que Heavent utilise ces informations pour me répondre. <Link to="/politique-confidentialite" className="underline">Politique de confidentialité</Link></span>
                  </label>
                  {err.accord && <p className="text-sm text-[#9B2C2C]" role="alert">{err.accord}</p>}
                  {erreur && <p role="alert" className="text-sm text-[#9B2C2C]" data-testid="cartes-erreur">{erreur}</p>}
                  <button type="submit" disabled={etat === "envoi"} aria-busy={etat === "envoi"} className="s-btn s-btn-plein s-sombre" data-testid="cartes-envoyer">
                    {etat === "envoi" ? "Envoi en cours…" : `Envoyer ma demande · ${totalPanier} DH`}
                  </button>
                </form>
              </div>
            )}
          </section>
        </div>
      </main>

      {panier && etat !== "ok" && !versCommande && !fiche && (
        <div className="cartes-barre boutique-barre-panier" style={{ paddingBottom: "max(8px, env(safe-area-inset-bottom, 0px))" }}>
          <a href="#commande" className="cartes-barre-choix boutique-barre-lien"><small>Ma commande · {ligne?.nom}</small><b key={totalPanier} className="boutique-maj">{totalPanier} DH</b></a>
          <a href="#commande" className="s-btn s-btn-plein s-sombre cartes-barre-btn" data-testid="aller-demande">Voir ma commande</a>
        </div>
      )}

      <FicheCarte ouvert={fiche} onFermer={() => setFiche(false)} ouverture={ouv} rang={rang(ouv.id)} total={totalCommande(ouv, extras)}
        action={panier && panier.invitation.ouverture === ouv.id ? "Mettre à jour ma commande" : panier ? `Remplacer « ${ouvertureDe(panier.invitation.ouverture).nom} »` : "Ajouter à ma commande"}
        actionCourt={panier && panier.invitation.ouverture === ouv.id ? "Mettre à jour" : panier ? "Remplacer" : "Ajouter"} retour={ouv.id} onAction={ajouter}>
        {fiche && <PersonnaliserInvitation modeClient sansCatalogue avant={reglages} noms={noms} date={date || null} lieu={lieu || null} message={message || null} valeur={invitation} onChange={setInvitation} />}
      </FicheCarte>
    </div>
  );
}
