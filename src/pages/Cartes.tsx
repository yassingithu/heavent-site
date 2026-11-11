import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Seo from "@/components/Seo";
import { Bouton, Etoile, Surtitre } from "@/components/seuil/Seuil";
import "@/styles/cartes.css";
import ChoixOccasion from "@/components/invitation/ChoixOccasion";
import PersonnaliserInvitation from "@/components/invitation/PersonnaliserInvitation";
import { evenementDe, type TypeEvenement } from "@/lib/evenements";
import { decorsPour } from "@/lib/decors";
import type { InvitationReglages } from "@/lib/invitation";
import { supabase } from "@/integrations/supabase/client";
import { suivre } from "@/lib/suivi";

/**
 * Page publique « Choisir ma carte » : le client compose sa carte d'invitation digitale avec l'aperçu en direct,
 * puis envoie sa demande à Heavent (pas de paiement en ligne : l'équipe le recontacte). Page en français pour l'instant.
 */
const WHATSAPP = "https://wa.me/212610939655?text=";
const champ = "w-full rounded-xl border border-[#E3D6BA] bg-white px-3 min-h-11 text-base";
const MAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Cartes() {
  const [invitation, setInvitation] = useState<InvitationReglages>({ modele: "fleur-oranger" });
  const [noms, setNoms] = useState("");
  const [date, setDate] = useState("");
  const [lieu, setLieu] = useState("");
  const [message, setMessage] = useState("");
  const [f, setF] = useState({ nom: "", telephone: "", email: "", note: "", accord: false });
  const [etat, setEtat] = useState<"saisie" | "envoi" | "ok">("saisie");
  const [erreur, setErreur] = useState<string | null>(null);
  const [err, setErr] = useState<Record<string, string>>({});
  const ev = evenementDe(invitation.evenement);

  const choisirOccasion = (id: TypeEvenement) => {
    const d = evenementDe(id);
    setInvitation((v) => ({
      ...v, evenement: id === "mariage" ? undefined : id, modele: d.modele, ouverture: d.ouverture, revelation: "aucune", couleurs: {}, questions: [],
      ...(decorsPour(id).some((x) => x.id === v.decor) ? {} : { decor: undefined, club: undefined, club_logo: undefined }),
    }));
  };

  const envoyer = async (e: React.FormEvent) => {
    e.preventDefault(); setErreur(null);
    const x: Record<string, string> = {};
    if (f.nom.trim().length < 2) x.nom = "Indiquez votre nom.";
    if (!f.telephone.trim() && !f.email.trim()) x.tel = "Indiquez un numéro WhatsApp ou une adresse e-mail pour que nous puissions vous répondre.";
    else if (f.telephone.trim() && f.telephone.replace(/\D/g, "").length < 8) x.tel = "Ce numéro semble incomplet.";
    if (f.email.trim() && !MAIL_OK.test(f.email.trim())) x.email = "L'adresse e-mail semble incorrecte.";
    if (!f.accord) x.accord = "Cochez la case ci-dessus pour que nous puissions vous répondre.";
    setErr(x);
    const premier = Object.keys(x)[0];
    if (premier) { document.getElementById(`cartes-champ-${premier}`)?.focus(); return; }
    setEtat("envoi");
    const { error } = await (supabase as any).rpc("carte_demander", {
      p_nom: f.nom, p_telephone: f.telephone, p_email: f.email, p_occasion: invitation.evenement ?? "mariage", p_noms: noms,
      p_date: date || null, p_lieu: lieu, p_message: [message && `Message de la carte : ${message}`, f.note].filter(Boolean).join("\n\n"), p_invitation: { ...invitation, noms, message },
    });
    if (error) { setEtat("saisie"); return setErreur(error.code === "P0429" ? "Vous avez déjà envoyé plusieurs demandes. Merci de patienter un peu ou de nous écrire sur WhatsApp." : "L'envoi n'a pas fonctionné. Réessayez, ou écrivez-nous sur WhatsApp."); }
    suivre("clic", "cartes:demande"); setEtat("ok");
  };

  return (
    <div className="cartes-page">
      <Seo perso={{ chemin: "/cartes", titre: "Cartes d'invitation digitales sur mesure | Heavent", description: "Composez votre carte d'invitation digitale : enveloppe, ruban ou cachet, couleurs, décor, surprise à la révélation. Aperçu en direct, puis demande à Heavent." }} />
      <section className="s-nuit cartes-haut s-g">
        <div className="in">
          <div>
            <Surtitre className="s-entree-heros">Cartes d'invitation digitales</Surtitre>
            <h1 className="s-h1 s-entree-heros">Votre carte, <em>avant même</em> le premier invité.</h1>
            <p className="s-chapo s-entree-heros" style={{ animationDelay: ".12s" }}>Choisissez l'enveloppe, le cachet, les couleurs. Voyez-la s'ouvrir sur votre téléphone, puis confiez-la-nous : nous vous répondons avec un aperçu et le tarif.</p>
            <div className="cartes-cta">
              <a href="#composer" className="s-btn s-btn-plein">Composer ma carte</a>
              <a href="#demande" className="s-btn s-btn-filet">Envoyer ma demande</a>
            </div>
          </div>
          <div className="cartes-scene" aria-hidden="true">
            <div className="cartes-carte cartes-c1"><div><small>Fiançailles</small><b>Salma<br />&amp; Omar</b><i>14 · 06 · 2027</i></div></div>
            <div className="cartes-carte cartes-c3"><div><small>Mariage</small><b>Lina<br />&amp; Adam</b><i>12 · 09 · 2027</i></div></div>
            <div className="cartes-carte cartes-c2"><div><small>Ont la joie de vous convier</small><b>Yasmine<br />&amp; Karim</b><i>03 · 10 · 2027</i></div></div>
          </div>
        </div>
        <div className="cartes-bande" />
      </section>

      <main id="composer" className="bg-[#FBF8F1] text-[#2A2420] scroll-mt-4">
        <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
          <ChoixOccasion valeur={invitation.evenement} onChoisir={choisirOccasion} />

          <section className="space-y-3" aria-labelledby="t-infos">
            <h3 id="t-infos" className="font-serif text-xl">Les informations de la carte</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <label className="block text-sm sm:col-span-3">Prénoms ou nom affichés
                <input className={champ} value={noms} onChange={(e) => setNoms(e.target.value)} placeholder={ev.id === "mariage" ? "Lina & Adam" : "Adam"} maxLength={80} data-testid="cartes-noms" />
              </label>
              <label className="block text-sm">Date
                <input type="date" className={champ} value={date} onChange={(e) => setDate(e.target.value)} data-testid="cartes-date" />
              </label>
              <label className="block text-sm sm:col-span-2">Lieu
                <input className={champ} value={lieu} onChange={(e) => setLieu(e.target.value)} placeholder="Villa, salle, restaurant, ville…" maxLength={120} data-testid="cartes-lieu" />
              </label>
            </div>
            <label className="block text-sm">Votre message sur la carte (facultatif)
              <textarea className={champ} rows={3} value={message} onChange={(e) => setMessage(e.target.value)} maxLength={400} placeholder="Ex. : Nous serions heureux de partager ce moment avec vous." data-testid="cartes-message" />
            </label>
            <p className="text-xs text-[#6B6154]">La date est dévoilée par la surprise de la carte : sans date, la surprise ne s'affiche pas.</p>
          </section>

          <PersonnaliserInvitation modeClient noms={noms} date={date || null} lieu={lieu || null} message={message || null} valeur={invitation} onChange={setInvitation} />

          <section id="demande" className="max-w-xl space-y-4" aria-labelledby="t-demande">
            <h3 id="t-demande" className="font-serif text-2xl">J'envoie ma demande à Heavent</h3>
            {etat === "ok" ? (
              <div className="s-fairepart s-merci" role="status" data-testid="cartes-merci">
                <Etoile /><Etoile className="bas" />
                <h4 className="s-h3">Demande bien reçue</h4>
                <p className="text-sm text-[#5E554A]">Merci {f.nom.split(" ")[0]}. Notre équipe prépare votre carte : vous recevez un aperçu à partager et le tarif sous 24 h ouvrées.</p>
                <Bouton href={WHATSAPP + encodeURIComponent(`Bonjour Heavent, je viens d'envoyer ma demande de carte d'invitation (${ev.nom}). Je m'appelle ${f.nom}.`)} externe variante="filet">Nous écrire sur WhatsApp</Bouton>
              </div>
            ) : (
              <form onSubmit={envoyer} className="space-y-3 s-form cartes-formulaire" style={{ padding: "22px 18px" }} noValidate>
                <p className="text-sm text-[#5E554A]">Aucun paiement maintenant. Notre équipe vous répond sous 24 h ouvrées avec un aperçu de votre carte et le tarif.</p>
                <label className="block text-sm">Votre nom
                  <input className={champ} value={f.nom} onChange={(e) => setF({ ...f, nom: e.target.value })} autoComplete="name" required id="cartes-champ-nom" aria-invalid={!!err.nom} data-testid="cartes-nom" />
                  {err.nom && <span className="block text-sm text-[#9B2C2C]" role="alert">{err.nom}</span>}
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block text-sm">WhatsApp ou téléphone
                    <input className={champ} type="tel" inputMode="tel" value={f.telephone} onChange={(e) => setF({ ...f, telephone: e.target.value })} autoComplete="tel" placeholder="+212 6…" id="cartes-champ-tel" aria-invalid={!!err.tel} data-testid="cartes-tel" />
                    {err.tel && <span className="block text-sm text-[#9B2C2C]" role="alert">{err.tel}</span>}
                  </label>
                  <label className="block text-sm">E-mail (facultatif si WhatsApp)
                    <input className={champ} type="email" inputMode="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} autoComplete="email" id="cartes-champ-email" aria-invalid={!!err.email} data-testid="cartes-email" />
                    {err.email && <span className="block text-sm text-[#9B2C2C]" role="alert">{err.email}</span>}
                  </label>
                </div>
                <label className="block text-sm">Un mot pour nous (facultatif)
                  <textarea className={champ} rows={3} value={f.note} onChange={(e) => setF({ ...f, note: e.target.value })} maxLength={800} placeholder="Une envie, un thème, un nombre d'invités…" />
                </label>
                <label className="cartes-accord flex items-start gap-2 text-sm">
                  <input type="checkbox" className="mt-1 h-5 w-5" checked={f.accord} onChange={(e) => setF({ ...f, accord: e.target.checked })} id="cartes-champ-accord" aria-invalid={!!err.accord} data-testid="cartes-accord" />
                  <span>J'accepte que Heavent utilise ces informations pour me répondre. <Link to="/politique-confidentialite" className="underline">Politique de confidentialité</Link></span>
                </label>
                {err.accord && <p className="text-sm text-[#9B2C2C]" role="alert">{err.accord}</p>}
                {erreur && <p role="alert" className="text-sm text-[#9B2C2C]" data-testid="cartes-erreur">{erreur}</p>}
                <button type="submit" disabled={etat === "envoi"} className="s-btn s-btn-plein s-sombre disabled:opacity-60" data-testid="cartes-envoyer">
                  {etat === "envoi" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />} Envoyer ma demande
                </button>
              </form>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
