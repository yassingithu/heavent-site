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
  ["Combien coûte une carte ?", "De 250 DH (Classique) à 650 DH (Prestige). Les paysages animés (Salle de bal, Chalet sous la neige, Oliveraie, Côte bleue) sont à 750 DH. Le prix de chaque carte est affiché sur la carte."],
  ["Comment ça se passe ?", "Vous choisissez une carte et envoyez votre demande. Nous préparons l'aperçu avec vos prénoms, votre date et votre lieu, et nous vous l'envoyons sur WhatsApp. Vous le validez, vous réglez, puis votre carte est livrée sous 1 semaine à partir du paiement."],
  ["Comment mes invités la reçoivent-ils ?", "Par un lien que vous partagez sur WhatsApp : la carte s'ouvre sur leur téléphone, comme dans les aperçus de cette page."],
  ["Puis-je demander une modification ?", "Vous validez l'aperçu avant de payer. Une modification supplémentaire après l'aperçu coûte 50 DH."],
];

export default function Cartes() {
  const [fiche, setFiche] = useState<string | null>(null);
  const ouv = ouvertureDe(fiche ?? undefined);
  const rang = ouverturesBoutique().findIndex((x) => x.id === ouv.id) + 1;
  return (
    <div className="cv-page">
      <Seo perso={{ chemin: "/cartes", titre: "Cartes d'invitation digitales sur mesure | Heavent", description: "Cartes d'invitation digitales en film pour mariage, fiançailles, baptême et anniversaire : choisissez votre carte, recevez l'aperçu à vos prénoms sur WhatsApp, payez après l'avoir validé. De 250 à 750 DH." }} />
      <header className="cv-haut">
        <h1>Cartes d'invitation digitales, en film</h1>
        <p>Choisissez votre carte · Aperçu avant de payer · Livrée 1 semaine après le paiement</p>
        <small>Partage par WhatsApp</small>
      </header>

      <main>
        <section id="boutique" aria-label="Les cartes">
          <BoutiqueCartes onOuvrir={(id) => { setFiche(id); suivre("clic", `cartes:fiche:${id}`); }} />
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
      </main>

      <FicheCarte ouvert={fiche !== null} onFermer={() => setFiche(null)} ouverture={ouv} rang={rang} />
    </div>
  );
}
