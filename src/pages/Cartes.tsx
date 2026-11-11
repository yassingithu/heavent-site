import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Loader2 } from "lucide-react";
import Seo from "@/components/Seo";
import { Bouton, PageTete } from "@/components/seuil/Seuil";
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
    if (f.nom.trim().length < 2) return setErreur("Indiquez votre nom.");
    if (!f.telephone.trim() && !f.email.trim()) return setErreur("Indiquez un numéro WhatsApp ou une adresse e-mail pour que nous puissions vous répondre.");
    if (f.email.trim() && !MAIL_OK.test(f.email.trim())) return setErreur("L'adresse e-mail semble incorrecte.");
    if (!f.accord) return setErreur("Cochez la case pour que nous puissions utiliser vos informations afin de vous répondre.");
    setEtat("envoi");
    const { error } = await (supabase as any).rpc("carte_demander", {
      p_nom: f.nom, p_telephone: f.telephone, p_email: f.email, p_occasion: invitation.evenement ?? "mariage", p_noms: noms,
      p_date: date || null, p_lieu: lieu, p_message: [message && `Message de la carte : ${message}`, f.note].filter(Boolean).join("\n\n"), p_invitation: { ...invitation, noms, message },
    });
    if (error) { setEtat("saisie"); return setErreur(error.code === "P0429" ? "Vous avez déjà envoyé plusieurs demandes. Merci de patienter un peu ou de nous écrire sur WhatsApp." : "L'envoi n'a pas fonctionné. Réessayez, ou écrivez-nous sur WhatsApp."); }
    suivre("clic", "cartes:demande"); setEtat("ok");
  };

  return (
    <div>
      <Seo perso={{ chemin: "/cartes", titre: "Cartes d'invitation digitales sur mesure | Heavent", description: "Composez votre carte d'invitation digitale : enveloppe, ruban ou cachet, couleurs, décor, surprise à la révélation. Aperçu en direct, puis demande à Heavent." }} />
      <PageTete surtitre="Cartes d'invitation digitales" titre="Choisissez votre carte" chapo="Anniversaire, naissance, fiançailles, henné, iftar… Composez la carte que vos invités recevront, voyez-la s'ouvrir, puis envoyez-nous votre demande." />

      <main className="bg-[#FBF8F1] text-[#2A2420]">
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
            <p className="text-xs text-[#6B6154]">La date est dévoilée par la surprise de la carte : sans date, la surprise ne s'affiche pas.</p>
          </section>

          <PersonnaliserInvitation modeClient noms={noms} date={date || null} lieu={lieu || null} message={message || null} valeur={invitation} onChange={setInvitation} />

          <section id="demande" className="max-w-xl space-y-4" aria-labelledby="t-demande">
            <h3 id="t-demande" className="font-serif text-2xl">J'envoie ma demande à Heavent</h3>
            {etat === "ok" ? (
              <div className="rounded-2xl border border-[#DCCBA6] bg-white p-5 space-y-3" role="status" data-testid="cartes-merci">
                <p className="flex items-center gap-2 font-serif text-xl"><CheckCircle2 className="h-6 w-6 text-[#8C6D22]" aria-hidden="true" /> Demande bien reçue</p>
                <p className="text-sm text-[#5E554A]">Merci {f.nom.split(" ")[0]}. Notre équipe prépare votre carte : vous recevez un aperçu à partager et le tarif sous 24 h ouvrées.</p>
                <Bouton href={WHATSAPP + encodeURIComponent(`Bonjour Heavent, je viens d'envoyer ma demande de carte d'invitation (${ev.nom}). Je m'appelle ${f.nom}.`)} externe variante="filet">Nous écrire sur WhatsApp</Bouton>
              </div>
            ) : (
              <form onSubmit={envoyer} className="space-y-3" noValidate>
                <p className="text-sm text-[#5E554A]">Aucun paiement maintenant. Notre équipe vous répond sous 24 h ouvrées avec un aperçu de votre carte et le tarif.</p>
                <label className="block text-sm">Votre nom
                  <input className={champ} value={f.nom} onChange={(e) => setF({ ...f, nom: e.target.value })} autoComplete="name" required data-testid="cartes-nom" />
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block text-sm">WhatsApp ou téléphone
                    <input className={champ} type="tel" inputMode="tel" value={f.telephone} onChange={(e) => setF({ ...f, telephone: e.target.value })} autoComplete="tel" placeholder="+212 6…" data-testid="cartes-tel" />
                  </label>
                  <label className="block text-sm">E-mail (facultatif si WhatsApp)
                    <input className={champ} type="email" inputMode="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} autoComplete="email" data-testid="cartes-email" />
                  </label>
                </div>
                <label className="block text-sm">Un mot pour nous (facultatif)
                  <textarea className={champ} rows={3} value={f.note} onChange={(e) => setF({ ...f, note: e.target.value })} maxLength={800} placeholder="Une envie, un thème, un nombre d'invités…" />
                </label>
                <label className="flex items-start gap-2 text-sm">
                  <input type="checkbox" className="mt-1 h-5 w-5" checked={f.accord} onChange={(e) => setF({ ...f, accord: e.target.checked })} data-testid="cartes-accord" />
                  <span>J'accepte que Heavent utilise ces informations pour me répondre. <Link to="/politique-confidentialite" className="underline">Politique de confidentialité</Link></span>
                </label>
                {erreur && <p role="alert" className="text-sm text-[#9B2C2C]" data-testid="cartes-erreur">{erreur}</p>}
                <button type="submit" disabled={etat === "envoi"} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#141414] text-[#F7F3E8] px-6 min-h-12 text-base font-medium disabled:opacity-60" data-testid="cartes-envoyer">
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
