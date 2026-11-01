import Seo from "@/components/Seo";
import { useTexte } from "@/i18n/textes";
import { PageTete } from "@/components/seuil/Seuil";

const Bloc = ({ titre, children }: { titre: string; children: React.ReactNode }) => {
  const x = useTexte();
  return (
  <section>
    <h2>{x(titre)}</h2>
    <div className="space-y-2" style={{ marginTop: 12 }}>{children}</div>
  </section>
  );
};

const MentionsLegales = () => {
  const x = useTexte();
  return (
  <div>
    <Seo page="mentions" />
    <PageTete surtitre="Heavent People Agency" titre={x("Mentions légales")} />
    <section className="s-platre">
    <div className="s-section s-wrap s-prose s-legal" style={{ maxWidth: 860 }}>
      <Bloc titre="Éditeur du site">
        <p><strong>{x("Heavent People Agency")}</strong> {x("— agence d'hôtes et hôtesses d'accueil, de staffing et d'organisation d'événements.")}</p>
        <p>{x("Siège : Rue Dakar, Imm. N°5, Apt N°1, Océan — Rabat, Maroc")}</p>
        <p>{x("RC 183001 (Tribunal de Rabat) · ICE 003617071000041")}</p>
        <p>{x("Directrice de la publication : Imane CHAIGARI, CEO")}</p>
        <p>{x("Téléphone : +212 6 10 93 96 55 · Email : i.chaigari@heaventagency.com")}</p>
      </Bloc>
      <Bloc titre="Hébergement">
        <p>{x("Site hébergé par one.com (www.one.com). Données de l'application (demandes de devis, espace staff) hébergées par Supabase (supabase.com).")}</p>
      </Bloc>
      <Bloc titre="Propriété intellectuelle">
        <p>{x("Les textes, logos, photos et éléments graphiques de ce site appartiennent à Heavent People Agency ou sont utilisés avec autorisation. Toute reproduction sans accord écrit préalable est interdite.")}</p>
      </Bloc>
      <Bloc titre="Données personnelles">
        <p>{x("Les informations transmises via les formulaires (demandes de devis, inscription du personnel) sont traitées conformément à la loi marocaine n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel. Vous disposez d'un droit d'accès, de rectification et d'opposition en écrivant à i.chaigari@heaventagency.com.")}</p>
        <p>{x("Détails dans notre")} <a href="/politique-confidentialite">{x("politique de confidentialité")}</a>.</p>
      </Bloc>
    </div>
    </section>
  </div>
);
};

export default MentionsLegales;
