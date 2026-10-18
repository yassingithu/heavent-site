import Seo from "@/components/Seo";
import JeuEvenement from "@/components/jeu-evenement/JeuEvenement";

/** Page du mini-jeu « Crée ton événement de rêve » (lien depuis la page d'accueil). */
const CreeTonEvenement = () => (
  <div className="min-h-screen bg-[#FBF8F1]">
    <Seo page="jeu" />
    <div className="container mx-auto px-4 py-10 sm:py-14 max-w-7xl">
      <JeuEvenement />
    </div>
  </div>
);

export default CreeTonEvenement;
