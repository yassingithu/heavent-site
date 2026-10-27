import Seo from "@/components/Seo";
import JeuEvenement from "@/components/jeu-evenement/JeuEvenement";

/** ANCIEN jeu « Crée ton événement de rêve », conservé pour un retour en arrière (/cree-ton-evenement-ancien, non indexé). */
const CreeTonEvenement = () => (
  <div className="min-h-screen bg-[#FBF8F1]">
    <Seo noindex />
    <div className="container mx-auto px-4 py-10 sm:py-14 max-w-7xl">
      <JeuEvenement />
    </div>
  </div>
);

export default CreeTonEvenement;
