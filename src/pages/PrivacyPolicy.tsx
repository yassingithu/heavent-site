import Seo from "@/components/Seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Seo page="confidentialite" />
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold mb-4">
              Politique de <span className="text-primary">Confidentialité</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Comment nous protégeons et utilisons vos données personnelles
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Collecte des données</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p>
                  Heavent People Agency collecte les données personnelles que vous nous fournissez volontairement lors de :
                </p>
                <ul>
                  <li>Votre inscription en tant qu'hôte ou hôtesse</li>
                  <li>Vos demandes de devis pour événements d'entreprise</li>
                  <li>Vos demandes de devis pour événements</li>
                  <li>Vos messages via notre formulaire de contact</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Utilisation des données</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p>Vos données personnelles sont utilisées pour :</p>
                <ul>
                  <li>Traiter vos candidatures et demandes de devis</li>
                  <li>Vous contacter concernant nos services</li>
                  <li>Améliorer la qualité de nos prestations</li>
                  <li>Respecter nos obligations légales</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Protection des données</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p>
                  Nous mettons en place des mesures techniques et organisationnelles appropriées 
                  pour protéger vos données contre tout accès, modification, divulgation ou 
                  destruction non autorisés.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Vos droits RGPD</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul>
                  <li>Droit d'accès à vos données personnelles</li>
                  <li>Droit de rectification</li>
                  <li>Droit à l'effacement</li>
                  <li>Droit à la limitation du traitement</li>
                  <li>Droit à la portabilité</li>
                  <li>Droit d'opposition</li>
                </ul>
                <p>
                  Pour exercer ces droits, contactez-nous à : 
                  <a href="mailto:privacy@heaventagency.com" className="text-primary hover:underline ml-1">
                    privacy@heaventagency.com
                  </a>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Contact</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p>
                  Pour toute question concernant cette politique de confidentialité ou 
                  le traitement de vos données personnelles, contactez-nous :
                </p>
                <ul>
                  <li>Email : info@heaventagency.com</li>
                  <li>Téléphone : +212 6 10 93 96 55</li>
                  <li>Adresse : Rabat, Maroc</li>
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