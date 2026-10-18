import { Helmet } from "react-helmet-async";

export const SITE = "https://heaventagency.com";
const IMAGE = `${SITE}/lovable-uploads/df0014d7-d697-4525-a5ee-71cf8fa774ab.png`;

/** Titres et descriptions de chaque page, pensés pour les recherches des clients au Maroc. */
export const PAGES_SEO = {
  accueil: {
    chemin: "/",
    titre: "Agence d'hôtesses et événementiel au Maroc | Heavent People Agency",
    description: "Hôtes et hôtesses d'accueil, staff événementiel et organisation de mariages au Maroc : Rabat, Casablanca, Marrakech, Tanger. Profils bilingues, devis gratuit sous 24 h.",
    motsCles: "agence hôtesses Maroc, hôtesse d'accueil Casablanca, hôtesse Rabat, hôtesse Marrakech, staff événementiel Maroc, agence événementielle Maroc, wedding planner Maroc",
  },
  entreprise: {
    chemin: "/devis-entreprise",
    titre: "Devis hôtesses pour salons, congrès et séminaires au Maroc | Heavent",
    description: "Hôtesses et stewards bilingues pour salons, congrès, lancements de produit et séminaires au Maroc. Recevez votre devis gratuit sous 24 h.",
    motsCles: "devis hôtesse salon Maroc, hôtesse congrès Casablanca, staffing événementiel entreprise, hôtesse bilingue Maroc, steward événement",
  },
  mariage: {
    chemin: "/devis-mariage",
    titre: "Wedding planner et hôtesses de mariage au Maroc | Heavent",
    description: "Organisation de mariage complète ou partielle, hôtesses d'accueil, coordination jour J à Marrakech, Rabat, Casablanca. Devis personnalisé gratuit.",
    motsCles: "wedding planner Maroc, organisation mariage Marrakech, hôtesse mariage, wedding planner Rabat, mariage Casablanca, coordination jour J",
  },
  inscription: {
    chemin: "/inscription-staff",
    titre: "Devenir hôtesse ou hôte d'accueil au Maroc | Recrutement Heavent",
    description: "Rejoignez l'équipe Heavent : missions d'hôtesse et d'hôte d'accueil sur salons, congrès et mariages au Maroc. Inscription en ligne en quelques minutes.",
    motsCles: "recrutement hôtesse Maroc, devenir hôtesse d'accueil, job hôtesse Casablanca, emploi événementiel Maroc, hôte d'accueil Rabat",
  },
  apropos: {
    chemin: "/a-propos",
    titre: "À propos | Agence événementielle à Rabat | Heavent People Agency",
    description: "Heavent People Agency, agence basée à Rabat : plus de 10 ans d'expérience dans l'accueil événementiel, le staffing et les mariages partout au Maroc.",
    motsCles: "Heavent People Agency, agence événementielle Rabat, agence hôtesses Maroc",
  },
  contact: {
    chemin: "/contact",
    titre: "Contact | Heavent People Agency – Hôtesses et événements au Maroc",
    description: "Contactez Heavent People Agency pour vos hôtesses, votre événement ou votre mariage au Maroc. Téléphone +212 6 10 93 96 55, réponse sous 24 h.",
    motsCles: "contact agence hôtesses Maroc, devis événement Maroc",
  },
  jeu: {
    chemin: "/cree-ton-evenement",
    titre: "Crée ton événement de rêve | Simulateur mariage et événement | Heavent",
    description: "Composez votre mariage ou votre événement en quelques minutes : tables, arche, fleurs, piste, DJ… Visualisez la scène, suivez votre budget et demandez votre devis.",
    motsCles: "simulateur mariage Maroc, budget mariage Maroc, décoration mariage, organiser son événement, wedding planner Maroc",
  },
  realisations: {
    chemin: "/realisations",
    titre: "Nos réalisations | Mariages et événements au Maroc | Heavent",
    description: "Mariages, fêtes, soirées d'entreprise et salons organisés par Heavent People Agency à Rabat, Casablanca et Marrakech, en photos.",
    motsCles: "réalisations mariage Maroc, décoration mariage photos, événementiel Rabat, organisation événement Casablanca",
  },
  mentions: {
    chemin: "/mentions-legales",
    titre: "Mentions légales | Heavent People Agency",
    description: "Mentions légales du site de Heavent People Agency, agence d'hôtesses et d'événementiel à Rabat : éditeur, hébergement, propriété intellectuelle et données personnelles.",
    motsCles: "",
  },
  confidentialite: {
    chemin: "/politique-confidentialite",
    titre: "Politique de confidentialité | Heavent People Agency",
    description: "Comment Heavent People Agency protège vos données personnelles, conformément à la loi marocaine 09-08.",
    motsCles: "",
  },
} as const;

export type PageSeo = keyof typeof PAGES_SEO;

/** Données structurées : l'agence telle que Google doit la comprendre (fiche entreprise). */
export const DONNEES_AGENCE = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${SITE}/#agence`,
  name: "Heavent People Agency",
  alternateName: "Heavent",
  url: SITE,
  logo: IMAGE,
  image: IMAGE,
  description: "Agence d'hôtes et hôtesses d'accueil, de staffing événementiel et d'organisation de mariages au Maroc.",
  telephone: "+212610939655",
  email: "i.chaigari@heaventagency.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rue Dakar, Imm. N°5, Apt N°1, Océan",
    addressLocality: "Rabat",
    addressCountry: "MA",
  },
  areaServed: ["Rabat", "Casablanca", "Marrakech", "Tanger", "Agadir", "Fès", "Maroc"].map((name) => ({ "@type": "City", name })),
  sameAs: ["https://instagram.com/heaventagency"],
  knowsLanguage: ["fr", "ar", "en"],
};

export default function Seo({ page, noindex = false }: { page?: PageSeo; noindex?: boolean }) {
  if (noindex || !page) {
    return <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>;
  }
  const p = PAGES_SEO[page];
  const url = `${SITE}${p.chemin === "/" ? "" : p.chemin}`;
  return (
    <Helmet>
      <html lang="fr" />
      <title>{p.titre}</title>
      <meta name="description" content={p.description} />
      {p.motsCles && <meta name="keywords" content={p.motsCles} />}
      <link rel="canonical" href={url} />
      <meta property="og:site_name" content="Heavent People Agency" />
      <meta property="og:locale" content="fr_MA" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={p.titre} />
      <meta property="og:description" content={p.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={p.titre} />
      <meta name="twitter:description" content={p.description} />
      <meta name="twitter:image" content={IMAGE} />
      {page === "accueil" && <script type="application/ld+json">{JSON.stringify(DONNEES_AGENCE)}</script>}
    </Helmet>
  );
}
