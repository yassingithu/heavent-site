import Seo from "@/components/Seo";
import { PageTete } from "@/components/seuil/Seuil";
import { useTexte } from "@/i18n/textes";

const PrivacyPolicy = () => {
  const x = useTexte();
  return (
    <div>
      <Seo page="confidentialite" />
      <PageTete surtitre={x("Vos données")} titre={<>{x("Politique de")} {x("Confidentialité")}</>} chapo={x("Comment nous protégeons et utilisons vos données personnelles")} />
      <section className="s-platre">
        <div className="s-section s-wrap" style={{ maxWidth: 860 }}>
          <div className="s-prose s-legal">
            <section>
              <h2>{x("1. Collecte des données")}</h2>
                <p>
                  {x("Heavent Agency SARL AU collecte les données personnelles que vous nous fournissez volontairement lors de :")}
                </p>
                <ul>
                  <li>{x("Votre inscription en tant qu'hôte ou hôtesse")}</li>
                  <li>{x("Vos demandes de devis pour événements d'entreprise")}</li>
                  <li>{x("Vos demandes de devis pour événements")}</li>
                  <li>{x("Vos messages via notre formulaire de contact")}</li>
                </ul>
            </section>
            <section>
              <h2>{x("2. Utilisation des données")}</h2>
                <p>{x("Vos données personnelles sont utilisées pour :")}</p>
                <ul>
                  <li>{x("Traiter vos candidatures et demandes de devis")}</li>
                  <li>{x("Vous contacter concernant nos services")}</li>
                  <li>{x("Améliorer la qualité de nos prestations")}</li>
                  <li>{x("Respecter nos obligations légales")}</li>
                </ul>
            </section>
            <section>
              <h2>{x("3. Protection des données")}</h2>
                <p>
                  {x("Nous mettons en place des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès, modification, divulgation ou destruction non autorisés.")} 
                </p>
                <p>
                  <strong>{x("Mesure d'audience.")}</strong> {x("Pour savoir quelles pages sont consultées, nous comptons les visites de façon anonyme, sans cookie : page vue, site d'où vient la visite (par exemple Google ou Instagram), type d'appareil et clics sur nos moyens de contact. Aucune donnée permettant de vous identifier n'est enregistrée, et ces statistiques sont supprimées au bout de 13 mois.")}
                </p>
                <p id="suppression-des-donnees">
                  <strong>{x("Instagram et suppression de vos données.")}</strong> {x("Si vous commentez « GUIDE » sous une de nos publications Instagram, nous recevons votre nom d'utilisateur et votre commentaire, uniquement pour vous envoyer le guide en message privé. Pour faire supprimer toutes vos données (Instagram, guides, newsletter, demandes de devis), écrivez à i.chaigari@heaventagency.com en indiquant votre e-mail ou votre nom d'utilisateur Instagram : la suppression est faite sous 30 jours.")}
                </p>
                <p>
                  <strong>{x("Guides gratuits et newsletter.")}</strong> {x("Quand vous téléchargez un guide, nous enregistrons votre e-mail, votre prénom et le type d'événement qui vous intéresse, pour vous envoyer ce guide. Vous ne recevez notre newsletter que si vous avez coché la case prévue, et chaque e-mail contient un lien pour vous désinscrire en un clic. Ces données ne sont jamais revendues.")}
                </p>
            </section>
            <section>
              <h2>{x("4. Vos droits")}</h2>
                <p>{x("Conformément à la loi marocaine n° 09-08, vous disposez des droits suivants :")}</p>
                <ul>
                  <li>{x("Droit d'information sur le traitement de vos données")}</li>
                  <li>{x("Droit d'accès à vos données personnelles")}</li>
                  <li>{x("Droit de rectification")}</li>
                  <li>{x("Droit d'opposition")}</li>
                  <li>{x("Suppression de vos données sur simple demande")}</li>
                </ul>
                <p>
                  {x("Pour exercer ces droits, contactez-nous à :")} 
                  <a href="mailto:info@heaventagency.com" className="text-primary hover:underline ml-1">
                    info@heaventagency.com
                  </a>
                </p>
            </section>
            <section>
              <h2>{x("5. Contact")}</h2>
                <p>
                  {x("Pour toute question concernant cette politique de confidentialité ou le traitement de vos données personnelles, contactez-nous :")} 
                </p>
                <ul>
                  <li>{x("Email : info@heaventagency.com")}</li>
                  <li>{x("Téléphone : +212 6 10 93 96 55")}</li>
                  <li>{x("Adresse : Rabat, Maroc")}</li>
                </ul>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;