import Seo from "@/components/Seo";
import { PageTete } from "@/components/seuil/Seuil";
import { useTexte } from "@/i18n/textes";
import { useEffect } from "react";
import { definirChoixAudience, useChoixAudience } from "@/lib/audience";

const PrivacyPolicy = () => {
  const x = useTexte();
  const choixAudience = useChoixAudience();
  useEffect(() => {
    if (window.location.hash === "#mesure-audience") setTimeout(() => document.getElementById("mesure-audience")?.scrollIntoView({ behavior: "smooth" }), 300);
  }, []);
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
                <p id="mesure-audience">
                  <strong>{x("Mesure d'audience.")}</strong> {x("Pour savoir quelles pages sont consultées, nous comptons les visites de façon anonyme, sans cookie : page vue, site d'où vient la visite (par exemple Google ou Instagram), type d'appareil et clics sur nos moyens de contact. Aucune donnée permettant de vous identifier n'est enregistrée, et ces statistiques sont supprimées au bout de 13 mois.")}{" "}
                  {x("Avec votre accord seulement (le bandeau s'affiche à votre première visite, puis tous les 13 mois), nous utilisons aussi la balise Google Ads, qui peut déposer des cookies et envoyer des données à Google, hors du Maroc, pour mesurer les résultats de nos annonces. Si vous refusez, cette balise n'est pas chargée.")}
                </p>
                <div data-testid="audience-choix" className="flex flex-wrap items-center gap-3">
                  <span>{x("Votre choix actuel :")} <strong>{choixAudience === "oui" ? x("accepté") : choixAudience === "non" ? x("refusé") : x("pas encore choisi")}</strong></span>
                  <button type="button" data-testid="audience-changer-refuser" onClick={() => definirChoixAudience("non")} className="h-11 px-5 border border-[#7A5F1F] hover:bg-[#EBE2CF]">{x("Refuser")}</button>
                  <button type="button" data-testid="audience-changer-accepter" onClick={() => definirChoixAudience("oui")} className="h-11 px-5 border border-[#7A5F1F] hover:bg-[#EBE2CF]">{x("Accepter")}</button>
                </div>
                <p id="assistant-imane">
                  <strong>{x("Salma, l'assistante virtuelle.")}</strong> {x("Si vous écrivez une question à Salma, ce texte (320 caractères au maximum, sans adresse e-mail ni numéro de téléphone, retirés avant l'envoi) est transmis à un service d'intelligence artificielle situé hors du Maroc, uniquement pour préparer la réponse. Nous ne conservons pas votre message. Les boutons de choix ne transmettent rien. Ne saisissez ni coordonnées, ni pièce d'identité, ni données de santé.")}
                </p>
                <p id="justificatifs-depenses">
                  <strong>{x("Tickets et factures de dépenses.")}</strong> {x("Quand l'équipe de l'agence photographie un ticket ou une facture pour enregistrer une dépense, l'image est transmise à un service d'intelligence artificielle (Groq) situé hors du Maroc, uniquement pour lire la date, le montant, le commerce et ses numéros d'identification. Le résultat est toujours vérifié par la personne qui enregistre la dépense. Cela ne concerne pas les photos que vous nous envoyez.")}
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
                  <a href="mailto:info@heaventagency.com" className="text-[#7A5F1F] hover:underline ml-1">
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