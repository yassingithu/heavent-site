import { useState } from "react";
import Seo from "@/components/Seo";
import "@/styles/cartes-v2.css";
import BoutiqueCartes from "@/components/invitation/BoutiqueCartes";
import FicheCarte from "@/components/invitation/FicheCarte";
import { ouverturesBoutique, ouvertureDe } from "@/lib/invitation";
import { suivre } from "@/lib/suivi";

/**
 * Boutique « Cartes d'invitation » : une grille de cartes qui se jouent en boucle, une fiche avec l'aperçu, une demande.
 * Le client ne règle rien : Heavent prépare l'aperçu à ses prénoms et le lui envoie sur WhatsApp. Pas de paiement en ligne.
 */
const WHATSAPP = "https://wa.me/212610939655?text=";
const QUESTIONS: [string, string][] = [
  ["Combien coûte une carte ?", "Chaque carte est à 250 DH, écrite à vos prénoms avec la date et le lieu (350 DH pour les paysages animés : Salle de bal, Chalet sous la neige, Oliveraie, Côte bleue). Vous ajoutez ensuite seulement les options qu'il vous faut, 50 DH chacune : compte à rebours, cœur à gratter, plan Google Maps, programme, confirmation de présence, livre d'or, musique…"],
  ["Comment ça se passe ?", "Vous choisissez une carte et envoyez votre demande. Nous préparons l'aperçu avec vos prénoms, votre date et votre lieu, et nous vous l'envoyons sur WhatsApp. Vous le validez, vous réglez, puis votre carte est livrée sous 1 semaine à partir du paiement (sous 24 h avec le supplément « Création urgente », 150 DH)."],
  ["Comment mes invités la reçoivent-ils ?", "Par un lien que vous partagez sur WhatsApp : la carte s'ouvre sur leur téléphone, comme dans les aperçus de cette page."],
  ["Puis-je demander une modification ?", "Oui."],
];

export default function Cartes() {
  const [fiche, setFiche] = useState<string | null>(null);
  const [dernier, setDernier] = useState<string | undefined>(undefined);
  const ouv = ouvertureDe(fiche ?? dernier);
  const rang = ouverturesBoutique().findIndex((x) => x.id === ouv.id) + 1;
  return (
    <div className="cv-page">
      <Seo perso={{ chemin: "/cartes", titre: "Cartes d'invitation digitales sur mesure | Heavent", description: "Cartes d'invitation digitales en film pour mariage, fiançailles, baptême et anniversaire : choisissez votre carte, recevez l'aperçu à vos prénoms sur WhatsApp, payez après l'avoir validé. Dès 250 DH, options à 50 DH." }} />
      <header className="cv-haut">
        <h1>Votre invitation, en film</h1>
        <p>Choisissez une carte. Nous l'écrivons à vos prénoms, vous la validez avant de payer.</p>
      </header>

      <main>
        <section id="boutique" aria-label="Les cartes">
          <BoutiqueCartes onOuvrir={(id) => { setFiche(id); setDernier(id); suivre("clic", `cartes:fiche:${id}`); }} />
        </section>

        <section className="cv-aide">
          <h2>Vous ne trouvez pas votre style ?</h2>
          <p>Décrivez-nous votre mariage ou votre fête : nous vous proposons la carte qui lui ressemble.</p>
          <a href={WHATSAPP + encodeURIComponent("Bonjour Heavent, je voudrais une carte d'invitation digitale.")} target="_blank" rel="noopener noreferrer" className="cv-bouton cv-bouton-filet">Nous écrire sur WhatsApp</a>
        </section>

        <section className="cv-faq" aria-labelledby="cv-faq-titre">
          <h2 id="cv-faq-titre">Questions fréquentes</h2>
          {QUESTIONS.map(([q, r]) => <details key={q}><summary>{q}</summary><p>{r}</p></details>)}
        </section>
        <p className="cv-credit">Bouton « Ajouter à mon agenda » inspiré d'<a href="https://github.com/Rainier-PS/Invitation-Template" target="_blank" rel="noopener noreferrer">Invitation Template</a> de Rainier Pearson Saputra (licence MIT).</p>
      </main>

      <FicheCarte ouvert={fiche !== null} onFermer={() => setFiche(null)} ouverture={ouv} rang={rang} />
    </div>
  );
}
