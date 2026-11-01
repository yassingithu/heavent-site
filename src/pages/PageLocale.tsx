import { Link } from "react-router-dom";
import Seo, { DONNEES_AGENCE, SITE } from "@/components/Seo";
import { Bouton, PageTete, Photo, Surtitre } from "@/components/seuil/Seuil";
import SectionConfiance, { NoteGoogle, useVitrine } from "@/components/vitrine/Confiance";
import { NUMERO_WHATSAPP } from "@/components/BoutonWhatsApp";
import { PageLocale as Page, SERVICES, VILLES } from "@/lib/pagesLocales";
import { useTexte } from "@/i18n/textes";

/** Page publique d'une ville ou d'un service (contenu propre à chaque page, liens vers les autres). */
export default function PageLocale({ page }: { page: Page }) {
  const v = useVitrine();
  const x = useTexte();
  const url = `${SITE}${page.chemin}`;
  const jsonLd = [
    {
      "@context": "https://schema.org", "@type": "Service", name: page.h1, description: page.descriptionSeo, url,
      provider: { "@id": DONNEES_AGENCE["@id"], "@type": "LocalBusiness", name: DONNEES_AGENCE.name, telephone: DONNEES_AGENCE.telephone, address: DONNEES_AGENCE.address },
      areaServed: page.ville ? { "@type": "City", name: page.ville } : { "@type": "Country", name: "Maroc" },
    },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: page.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.r } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE + "/" },
      { "@type": "ListItem", position: 2, name: page.nomCourt, item: url },
    ] },
  ];
  const lienDevis = page.devis === "mariage" ? "/devis-mariage" : "/devis-entreprise";
  const whatsapp = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(x("Bonjour, je souhaite des informations : {sujet}.", { sujet: x(page.h1) }))}`;
  const autresVilles = VILLES.filter((p) => p.chemin !== page.chemin);
  const autresServices = SERVICES.filter((p) => p.chemin !== page.chemin);

  // Une vraie photo par page, choisie selon le sujet (mariage, Nawar, accueil)
  const photo = page.devis === "mariage"
    ? { nom: "allee-gypsophile", l: 900, h: 1104, alt: x("Longue table de mariage avec un chemin de gypsophile et de roses blanches, chaises médaillon ivoire, sous une verrière") }
    : { nom: "table-honneur", l: 900, h: 1204, alt: x("Table d'honneur d'un mariage devant de grandes verrières en arche, un nuage de gypsophile suspendu au-dessus de la nappe ivoire") };

  return (
    <div data-testid="page-locale">
      <Seo perso={{ chemin: page.chemin, titre: page.titreSeo, description: page.descriptionSeo, motsCles: page.motsCles, jsonLd }} />

      <PageTete
        ariane={<nav className="s-ariane" aria-label={x("Fil d'Ariane")}><Link to="/">{x("Accueil")}</Link><span aria-hidden="true">›</span><span>{x(page.nomCourt)}</span></nav>}
        surtitre={page.ville ? x(page.ville) : "Heavent People Agency"}
        titre={x(page.h1)}
        chapo={x(page.accroche)}>
        <div className="s-actions s-entree-heros" style={{ animationDelay: ".2s" }}>
          <Bouton to={lienDevis} variante="plein" fleche>{x("Demander un devis")}</Bouton>
          <Bouton to="/contact#rendez-vous" variante="filet">{x("Prendre rendez-vous")}</Bouton>
        </div>
        <div style={{ marginTop: 24 }}><NoteGoogle v={v} clair /></div>
      </PageTete>

      <section className="s-platre">
        <div className="s-section s-wrap s-colonnes">
          <div className="s-col-g" data-revele="">
            <Surtitre>{page.type === "ville" ? x("Sur place") : x("Le service")}</Surtitre>
            <div className="s-prose" style={{ marginTop: 22 }}>
              {page.intro.map((p, i) => <p key={i}>{x(p)}</p>)}
            </div>
          </div>
          <div className="s-col-d">
            <div className="s-encadre" data-revele="">
              <h2 className="s-h3" style={{ marginBottom: 18 }}>{page.type === "ville" ? x("Nos missions à {ville}", { ville: x(page.ville ?? "") }) : x("Ce que nous prenons en charge")}</h2>
              <ul className="s-puces">
                {page.evenements.map((e) => <li key={e}>{x(e)}</li>)}
              </ul>
            </div>
            <Photo nom={photo.nom} l={photo.l} h={photo.h} alt={photo.alt} tailles="(min-width:900px) 34vw, 92vw" style={{ marginTop: 32 }} />
          </div>
        </div>
      </section>

      <section className="s-nuit">
        <div className="s-section s-wrap s-colonnes">
          <div className="s-col-g" data-revele="">
            <Surtitre>{x("Comment ça se passe")}</Surtitre>
            <h2 className="s-h2" style={{ marginTop: 20, maxWidth: "12ch" }}>{x("Du devis au dernier invité.")}</h2>
          </div>
          <ol className="s-liste s-col-d">
            {page.pointsCles.map((p, i) => (
              <li key={p.titre} data-revele="" style={{ "--retard": `${i * 0.08}s` } as React.CSSProperties}>
                <span className="num">{["I", "II", "III", "IV", "V"][i]}</span><div><b>{x(p.titre)}</b></div><p>{x(p.texte)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="s-confiance"><SectionConfiance faqExtra={page.faq} /></div>

      <section className="s-nuit">
        <div className="s-fin s-wrap" style={{ paddingBottom: 72 }}>
          <div className="s-haut">
            <div>
              <Surtitre>{x("Votre date")}</Surtitre>
              <h2 data-revele="">{x("Parlons de votre événement")}</h2>
              <p className="s-chapo" style={{ marginTop: 18, maxWidth: "46ch" }}>{x("Devis détaillé, à consulter et signer en ligne. Ou réservez directement un rendez-vous.")}</p>
              <div className="s-actions">
                <Bouton to={lienDevis} variante="plein" fleche>{x("Demander un devis")}</Bouton>
                <Bouton href={whatsapp} variante="filet" externe>WhatsApp</Bouton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="s-papier">
        <div className="s-section s-wrap s-colonnes" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className="s-col-g">
            <h2 className="s-surtitre" style={{ marginBottom: 14 }}>{x("Nos villes")}</h2>
            <div className="s-villes" style={{ marginTop: 0 }}>{autresVilles.map((p) => <Link key={p.chemin} to={p.chemin}>{x("Hôtesses à {ville}", { ville: x(p.nomCourt) })}</Link>)}</div>
          </div>
          <div className="s-col-d">
            <h2 className="s-surtitre" style={{ marginBottom: 14 }}>{x("Nos services")}</h2>
            <div className="s-villes" style={{ marginTop: 0 }}>
              {autresServices.map((p) => <Link key={p.chemin} to={p.chemin}>{x(p.nomCourt)}</Link>)}
              <Link to="/realisations">{x("Nos réalisations en photos")}</Link>
              <Link to="/cree-ton-evenement">{x("Crée ton événement (simulateur)")}</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
