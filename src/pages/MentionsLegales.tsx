import Seo from "@/components/Seo";

const Bloc = ({ titre, children }: { titre: string; children: React.ReactNode }) => (
  <section className="mb-8">
    <h2 className="text-xl font-serif font-bold mb-3">{titre}</h2>
    <div className="text-muted-foreground leading-relaxed space-y-2">{children}</div>
  </section>
);

const MentionsLegales = () => (
  <div className="min-h-screen py-12">
    <Seo page="mentions" />
    <div className="container mx-auto px-4 max-w-3xl">
      <h1 className="text-4xl font-serif font-bold mb-8">Mentions légales</h1>
      <Bloc titre="Éditeur du site">
        <p><strong>Heavent People Agency</strong> — agence d'hôtes et hôtesses d'accueil, de staffing et d'organisation d'événements.</p>
        <p>Siège : Rue Dakar, Imm. N°5, Apt N°1, Océan — Rabat, Maroc</p>
        <p>RC 183001 (Tribunal de Rabat) · ICE 003617071000041</p>
        <p>Directrice de la publication : Imane CHAIGARI, CEO</p>
        <p>Téléphone : +212 6 10 93 96 55 · Email : i.chaigari@heaventagency.com</p>
      </Bloc>
      <Bloc titre="Hébergement">
        <p>Site hébergé par one.com (www.one.com). Données de l'application (demandes de devis, espace staff) hébergées par Supabase (supabase.com).</p>
      </Bloc>
      <Bloc titre="Propriété intellectuelle">
        <p>Les textes, logos, photos et éléments graphiques de ce site appartiennent à Heavent People Agency ou sont utilisés avec autorisation. Toute reproduction sans accord écrit préalable est interdite.</p>
      </Bloc>
      <Bloc titre="Données personnelles">
        <p>Les informations transmises via les formulaires (demandes de devis, inscription du personnel) sont traitées conformément à la loi marocaine n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel. Vous disposez d'un droit d'accès, de rectification et d'opposition en écrivant à i.chaigari@heaventagency.com.</p>
        <p>Détails dans notre <a href="/politique-confidentialite" className="text-primary hover:underline">politique de confidentialité</a>.</p>
      </Bloc>
    </div>
  </div>
);

export default MentionsLegales;
