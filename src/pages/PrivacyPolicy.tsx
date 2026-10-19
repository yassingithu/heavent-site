import Seo from "@/components/Seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTexte } from "@/i18n/textes";

const PrivacyPolicy = () => {
  const x = useTexte();
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Seo page="confidentialite" />
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold mb-4">
              {x("Politique de")} <span className="text-primary">{x("Confidentialité")}</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              {x("Comment nous protégeons et utilisons vos données personnelles")}
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>{x("1. Collecte des données")}</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p>
                  {x("Heavent People Agency collecte les données personnelles que vous nous fournissez volontairement lors de :")}
                </p>
                <ul>
                  <li>{x("Votre inscription en tant qu'hôte ou hôtesse")}</li>
                  <li>{x("Vos demandes de devis pour événements d'entreprise")}</li>
                  <li>{x("Vos demandes de devis pour événements")}</li>
                  <li>{x("Vos messages via notre formulaire de contact")}</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{x("2. Utilisation des données")}</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p>{x("Vos données personnelles sont utilisées pour :")}</p>
                <ul>
                  <li>{x("Traiter vos candidatures et demandes de devis")}</li>
                  <li>{x("Vous contacter concernant nos services")}</li>
                  <li>{x("Améliorer la qualité de nos prestations")}</li>
                  <li>{x("Respecter nos obligations légales")}</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{x("3. Protection des données")}</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p>
                  {x("Nous mettons en place des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès, modification, divulgation ou destruction non autorisés.")} 
                </p>
                <p>
                  <strong>{x("Mesure d'audience.")}</strong> {x("Pour savoir quelles pages sont consultées, nous comptons les visites de façon anonyme, sans cookie : page vue, site d'où vient la visite (par exemple Google ou Instagram), type d'appareil et clics sur nos moyens de contact. Aucune donnée permettant de vous identifier n'est enregistrée, et ces statistiques sont supprimées au bout de 13 mois.")}
                </p>
                <p>
                  <strong>{x("Guides gratuits et newsletter.")}</strong> {x("Quand vous téléchargez un guide, nous enregistrons votre e-mail, votre prénom et le type d'événement qui vous intéresse, pour vous envoyer ce guide. Vous ne recevez notre newsletter que si vous avez coché la case prévue, et chaque e-mail contient un lien pour vous désinscrire en un clic. Ces données ne sont jamais revendues.")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{x("4. Vos droits RGPD")}</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p>{x("Conformément au RGPD, vous disposez des droits suivants :")}</p>
                <ul>
                  <li>{x("Droit d'accès à vos données personnelles")}</li>
                  <li>{x("Droit de rectification")}</li>
                  <li>{x("Droit à l'effacement")}</li>
                  <li>{x("Droit à la limitation du traitement")}</li>
                  <li>{x("Droit à la portabilité")}</li>
                  <li>{x("Droit d'opposition")}</li>
                </ul>
                <p>
                  {x("Pour exercer ces droits, contactez-nous à :")} 
                  <a href="mailto:privacy@heaventagency.com" className="text-primary hover:underline ml-1">
                    privacy@heaventagency.com
                  </a>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{x("5. Contact")}</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p>
                  {x("Pour toute question concernant cette politique de confidentialité ou le traitement de vos données personnelles, contactez-nous :")} 
                </p>
                <ul>
                  <li>{x("Email : info@heaventagency.com")}</li>
                  <li>{x("Téléphone : +212 6 10 93 96 55")}</li>
                  <li>{x("Adresse : Rabat, Maroc")}</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;