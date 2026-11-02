import { useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Seo, { DONNEES_AGENCE, SITE } from "@/components/Seo";
import { Bouton, PageTete, Photo, Surtitre } from "@/components/seuil/Seuil";
import SectionConfiance from "@/components/vitrine/Confiance";
import { NUMERO_WHATSAPP } from "@/components/BoutonWhatsApp";
import { ETAPES_WP, FAQ_WP, FORMULES_WP, MOMENTS_WP, PAYS_WP, VILLES_WP } from "@/lib/weddingPlannerMaroc";

const CHEMIN = "/wedding-planner-maroc";
const sans = (t: string) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Mesure d'un clic sur un bouton de la page (utile pour Google Ads) : aucune donnée personnelle. */
const suivre = (action: string) => { try { (window as any).gtag?.("event", "clic_wedding_planner_maroc", { action }); } catch { /* */ } };

/**
 * Page de référencement « Wedding planner et organisation de mariage au Maroc » : villes, pays, traditions, questions.
 * Accessible depuis le pied de page uniquement. Prête pour Google Ads : ?ville=marrakech et/ou ?pays=france adaptent le titre.
 */
export default function WeddingPlannerMaroc() {
  const [params] = useSearchParams();
  const ville = VILLES_WP.find((v) => v.id === sans(params.get("ville") ?? ""));
  const pays = PAYS_WP.find((p) => p.id === sans(params.get("pays") ?? ""));
  const { hash } = useLocation();
  // Arrivée par ancre (pied de page, annonce) : la page est chargée en différé, on fait donc défiler nous-mêmes, sans animation.
  useEffect(() => {
    const id = decodeURIComponent(hash.slice(1));
    if (!id) return;
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: "start" }), 80);
    return () => clearTimeout(t);
  }, [hash]);
  const url = `${SITE}${CHEMIN}`;
  const versDevis = ville ? `/devis-mariage?ville=${ville.id}` : pays ? `/devis-mariage?pays=${pays.id}` : "/devis-mariage";
  const whatsapp = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent("Bonjour, je souhaite organiser mon mariage au Maroc avec Heavent.")}`;

  const titre = ville ? <>Wedding planner à {ville.nom} : organisation de mariage</>
    : pays ? <>Mariage au Maroc depuis {pays.de} : wedding planner</>
    : <>Wedding planner au Maroc</>;
  const chapo = ville
    ? `Heavent People Agency organise votre mariage à ${ville.nom} : décoration, prestataires, planning et coordination du jour J. Réponse sous 24 h, devis détaillé gratuit.`
    : pays
      ? `Vous vous mariez au Maroc depuis ${pays.de} ? Nous préparons votre mariage avec vous à distance et nous coordonnons le jour J sur place. Réponse sous 24 h.`
      
      : "L'organisation de votre mariage, de A\u00a0à\u00a0Z. Heavent People Agency organise des mariages à Marrakech, Casablanca, Rabat, Tanger, Fès, Agadir et dans tout le Maroc, pour les couples qui vivent ici comme pour ceux qui reviennent de l'étranger.";

  const jsonLd = [
    {
      "@context": "https://schema.org", "@type": "Service", name: "Wedding planner et organisation de mariage au Maroc", serviceType: "Wedding planner", url,
      description: "Organisation complète ou partielle de mariage, coordination du jour J, décoration, fiançailles et henné partout au Maroc, pour les couples résidents et les Marocains du monde.",
      provider: { "@id": DONNEES_AGENCE["@id"], "@type": "LocalBusiness", name: DONNEES_AGENCE.name, telephone: DONNEES_AGENCE.telephone, address: DONNEES_AGENCE.address },
      areaServed: [{ "@type": "Country", name: "Maroc" }, ...VILLES_WP.map((v) => ({ "@type": "City", name: v.nom }))],
      audience: { "@type": "Audience", audienceType: "Couples qui se marient au Maroc, résidents et Marocains du monde" },
    },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ_WP.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.r } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE + "/" },
      { "@type": "ListItem", position: 2, name: "Wedding planner au Maroc", item: url },
    ] },
  ];

  return (
    <div data-testid="page-wedding-planner" className="s-wp-page">
      <Seo perso={{
        chemin: CHEMIN,
        titre: "Wedding planner au Maroc | Organisation de mariage | Heavent",
        description: "Wedding planner au Maroc : organisation complète ou partielle de votre mariage à Marrakech, Casablanca, Rabat, Tanger, Fès, Agadir. Réponse sous 24 h, devis détaillé gratuit signé en ligne.",
        motsCles: "wedding planner Maroc, organisation mariage Maroc, mariage marocain, mariage au Maroc, se marier au Maroc, wedding planner Marrakech, wedding planner Casablanca, wedding planner Rabat, organisatrice de mariage Maroc, agence organisation mariage Maroc, décoration mariage Maroc, destination wedding Morocco, Morocco wedding planner",
        jsonLd,
      }} />

      <PageTete
        ariane={<nav className="s-ariane" aria-label="Fil d'Ariane"><Link to="/">Accueil</Link><span aria-hidden="true">›</span><span>Wedding planner au Maroc</span></nav>}
        surtitre="Mariage au Maroc"
        titre={titre}
        chapo={chapo}
        testid="wp-tete">
        <div className="s-actions s-entree-heros" style={{ animationDelay: ".2s" }}>
          <Bouton to={versDevis} variante="plein" fleche onClick={() => suivre("devis_haut")} testid="wp-devis">Demander un devis gratuit</Bouton>
          <Bouton href={whatsapp} variante="filet" externe onClick={() => suivre("whatsapp_haut")}>Écrire sur WhatsApp</Bouton>
        </div>
      </PageTete>

      {ville ? (
        <section className="s-platre s-wp-bandeau" data-testid="wp-bandeau-ville">
          <div className="s-wrap s-wp-bandeau-in">
            <div>
              <Surtitre>Votre mariage à {ville.nom}</Surtitre>
              <p>{ville.texte}</p>
            </div>
            <Bouton to={versDevis} variante="plein" fleche onClick={() => suivre(`devis_bandeau_${ville.id}`)}>Devis à {ville.nom}</Bouton>
          </div>
        </section>
      ) : null}

      {/* Qu'est-ce qu'un wedding planner : réponse directe, utile aux extraits Google */}
      <section className="s-platre">
        <div className="s-section s-wrap s-colonnes">
          <div className="s-col-g" data-revele="">
            <Surtitre>Votre organisatrice de mariage</Surtitre>
            <h2 className="s-h2" style={{ marginTop: 20, maxWidth: "16ch" }}>Un wedding planner, pour quoi faire ?</h2>
            <div className="s-prose" style={{ marginTop: 22 }}>
              <p>Un wedding planner, ou organisateur de mariage, conçoit et coordonne votre mariage avec vous : le style, la décoration, les prestataires, le budget, le planning et le déroulé du jour J. Il vous évite les dizaines de coups de fil et les mauvaises surprises, et vous laisse profiter.</p>
              <p>Heavent People Agency est une agence événementielle basée à Rabat. Nous organisons des mariages, des fiançailles et des soirées de henné au Maroc, pour les couples qui y vivent comme pour les Marocains du monde qui reviennent se marier au pays.</p>
            </div>
          </div>
          <div className="s-col-d">
            <div className="s-encadre" data-revele="">
              <h2 className="s-h3" style={{ marginBottom: 18 }}>Ce que nous prenons en charge</h2>
              <ul className="s-puces">
                <li>Le style et la décoration de votre mariage</li>
                <li>La sélection des prestataires : salle, traiteur, négafa, orchestre ou DJ, photographe, fleuriste</li>
                <li>Le suivi du budget et du planning</li>
                <li>La coordination et l'accueil des invités le jour J</li>
                <li>Les fiançailles et la soirée de henné</li>
              </ul>
            </div>
            <Photo nom="allee-gypsophile" l={900} h={1104} alt="Longue table de mariage avec un chemin de gypsophile et de roses blanches, chaises médaillon ivoire, sous une verrière" tailles="(min-width:900px) 34vw, 92vw" style={{ marginTop: 32 }} />
          </div>
        </div>
      </section>

      {/* Formules */}
      <section className="s-nuit" id="formules">
        <div className="s-section s-wrap s-colonnes">
          <div className="s-col-g" data-revele="">
            <Surtitre>Nos formules</Surtitre>
            <h2 className="s-h2" style={{ marginTop: 20, maxWidth: "13ch" }}>Organisation de mariage : choisissez votre niveau d'aide.</h2>
          </div>
          <ol className="s-liste s-col-d">
            {FORMULES_WP.map((f, i) => (
              <li key={f.titre} data-revele="" style={{ "--retard": `${i * 0.08}s` } as React.CSSProperties}>
                <span className="num">{["I", "II", "III", "IV"][i]}</span><div><b>{f.titre}</b></div><p>{f.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Mariage marocain : traditions */}
      <section className="s-papier" id="mariage-marocain">
        <div className="s-section s-wrap s-colonnes">
          <div className="s-col-g" data-revele="">
            <Surtitre>Mariage marocain</Surtitre>
            <h2 className="s-h2" style={{ marginTop: 20, maxWidth: "14ch" }}>Un mariage marocain, de la tradition à la modernité.</h2>
            <div className="s-prose" style={{ marginTop: 22 }}>
              <p>Un mariage au Maroc se vit en plusieurs temps. Nous respectons vos traditions et les familles, et nous y ajoutons l'organisation qui évite les imprévus : chaque moment a son décor, son horaire et ses prestataires.</p>
              <p>Que vous rêviez d'un mariage traditionnel, d'une cérémonie contemporaine ou d'un mélange des deux, nous construisons le déroulé avec vous.</p>
            </div>
          </div>
          <div className="s-col-d">
            <div className="s-encadre" data-revele="">
              <h2 className="s-h3" style={{ marginBottom: 18 }}>Les moments que nous organisons</h2>
              <ul className="s-puces">{MOMENTS_WP.map((m) => <li key={m}>{m}</li>)}</ul>
            </div>
            <Photo nom="decor-henne" l={900} h={1208} alt="Décor de henné : banquette dorée devant un panneau de moucharabieh en arche, plateau de laiton et tapis rouge" tailles="(min-width:900px) 34vw, 92vw" style={{ marginTop: 32 }} />
          </div>
        </div>
      </section>

      {/* Par ville */}
      <section className="s-platre" id="villes">
        <div className="s-section s-wrap">
          <div data-revele="">
            <Surtitre>Partout au Maroc</Surtitre>
            <h2 className="s-h2" style={{ marginTop: 20, maxWidth: "20ch" }}>Wedding planner à Marrakech, Casablanca, Rabat et dans toutes les villes du Maroc.</h2>
            <p className="s-chapo" style={{ marginTop: 18, maxWidth: "58ch", color: "var(--s-texte-2)" }}>Choisissez votre ville : nous organisons votre mariage sur place ou à distance, et les déplacements éventuels sont précisés ligne par ligne dans le devis.</p>
          </div>
          <div className="s-wp-grille" style={{ marginTop: 36 }}>
            {VILLES_WP.filter((v) => v.page).map((v) => (
              <article key={v.id} id={v.id} className={`s-wp-ville s-wp-ville-grande${ville?.id === v.id ? " choisie" : ""}`}>
                <h3><span className="pre">Wedding planner à</span> {v.nom}</h3>
                <p>{v.texte}</p>
                <p className="liens">
                  <Link to={`/devis-mariage?ville=${v.id}`} onClick={() => suivre(`devis_${v.id}`)}>Devis à {v.nom} →</Link>
                </p>
              </article>
            ))}
          </div>
          <div className="s-wp-autres" style={{ marginTop: 40 }}>
            <h3 className="s-surtitre" style={{ marginBottom: 6 }}>Et aussi dans ces villes</h3>
            {VILLES_WP.filter((v) => !v.page).map((v) => (
              <article key={v.id} id={v.id} className={`s-wp-ville s-wp-ville-ligne${ville?.id === v.id ? " choisie" : ""}`}>
                <h4><span className="pre">Wedding planner à</span> {v.nom}</h4>
                <p>{v.texte} <Link to={`/devis-mariage?ville=${v.id}`} onClick={() => suivre(`devis_${v.id}`)}>Devis à {v.nom} →</Link></p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Par pays */}
      <section className="s-nuit" id="depuis-letranger">
        <div className="s-section s-wrap s-colonnes">
          <div className="s-col-g" data-revele="">
            <Surtitre>Marocains du monde</Surtitre>
            <h2 className="s-h2" style={{ marginTop: 20, maxWidth: "16ch" }}>Vous vous mariez au Maroc depuis l'étranger ?</h2>
            <div className="s-prose" style={{ marginTop: 22 }}>
              <p>Se marier au Maroc quand on vit en France, en Belgique ou ailleurs, c'est préparer à distance un jour très important. Nous travaillons avec vous en visio ou par WhatsApp, vous envoyons un devis détaillé à signer en ligne, puis nous coordonnons tout sur place : vous arrivez, tout est prêt.</p>
            </div>
            <p className="s-wp-pays" id="pays">
              Nous accompagnons les couples qui vivent {PAYS_WP.map((p, i) => (
                <span key={p.id} id={`pays-${p.id}`}>{i > 0 ? (i === PAYS_WP.length - 1 ? " ou " : ", ") : ""}<Link to={`/wedding-planner-maroc?pays=${p.id}`} onClick={() => suivre(`pays_${p.id}`)} aria-label={`Mariage au Maroc depuis ${p.de}`}>{p.nom}</Link></span>
              ))}.
            </p>
          </div>
          <div className="s-col-d">
            <ol className="s-liste">
              {ETAPES_WP.map((e, i) => (
                <li key={e.titre} data-revele="" style={{ "--retard": `${i * 0.08}s` } as React.CSSProperties}>
                  <span className="num">{["I", "II", "III", "IV"][i]}</span><div><b>{e.titre}</b></div><p>{e.texte}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* English + Arabic : recherches « wedding planner Morocco » */}
      <section className="s-platre" id="english">
        <div className="s-section s-wrap s-colonnes">
          <div className="s-col-g" lang="en" data-revele="">
            <Surtitre>In English</Surtitre>
            <h2 className="s-h2" style={{ marginTop: 20, maxWidth: "16ch" }}>Wedding planner in Morocco</h2>
            <div className="s-prose" style={{ marginTop: 22 }}>
              <p>Heavent People Agency is a wedding planning and event agency based in Rabat. We plan and coordinate weddings in Marrakech, Casablanca, Rabat, Tangier, Fez, Agadir and across Morocco, for local couples and for couples getting married in Morocco from abroad.</p>
              <p>Full planning, partial planning or day-of coordination: tell us your date, city and guest count and we will reply within 24 hours and send you a detailed quote. We work in English, French and Arabic.</p>
            </div>
            <div className="s-actions" style={{ marginTop: 24 }}>
              <Bouton to={versDevis} variante="plein" fleche onClick={() => suivre("devis_en")}>Request a free quote</Bouton>
            </div>
          </div>
          <div className="s-col-d s-wp-ar" lang="ar" dir="rtl" data-revele="">
            <Surtitre>بالعربية</Surtitre>
            <h2 className="s-h2" style={{ marginTop: 20 }}>منظمة حفلات زفاف وتنظيم أعراس في المغرب</h2>
            <div className="s-prose" style={{ marginTop: 22 }}>
              <p>Heavent People Agency وكالة مقرها الرباط. ننظم حفلات الزفاف والخطوبة وليلة الحناء في مراكش والدار البيضاء والرباط وطنجة وفاس وأكادير وفي جميع مدن المغرب.</p>
              <p>أخبرونا بالتاريخ والمدينة وعدد المدعوين، وسنرد عليكم خلال 24 ساعة ثم نرسل لكم عرض أسعار مفصلاً.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="s-confiance"><SectionConfiance faqExtra={FAQ_WP} /></div>

      <section className="s-nuit" id="devis">
        <div className="s-fin s-wrap" style={{ paddingBottom: 72 }}>
          <div className="s-haut">
            <div>
              <Surtitre>Votre date</Surtitre>
              <h2 data-revele="">Parlons de votre mariage</h2>
              <p className="s-chapo" style={{ marginTop: 18, maxWidth: "46ch" }}>Réponse sous 24 h, puis devis détaillé gratuit, à consulter et signer en ligne. Ou réservez directement un rendez-vous.</p>
              <div className="s-actions">
                <Bouton to={versDevis} variante="plein" fleche onClick={() => suivre("devis_bas")}>Demander un devis gratuit</Bouton>
                <Bouton to="/contact#rendez-vous" variante="filet" onClick={() => suivre("rdv_bas")}>Prendre rendez-vous</Bouton>
                <Bouton href={whatsapp} variante="filet" externe onClick={() => suivre("whatsapp_bas")}>WhatsApp</Bouton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="s-papier">
        <div className="s-section s-wrap s-colonnes" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className="s-col-g">
            <h2 className="s-surtitre" style={{ marginBottom: 14 }}>Pour aller plus loin</h2>
            <div className="s-villes" style={{ marginTop: 0 }}>
              <Link to="/cree-ton-evenement">Crée ton événement (simulateur)</Link>
              <Link to="/realisations">Nos réalisations en photos</Link>
              <Link to="/guides/10-conseils-mariage-reussi">10 conseils pour un mariage réussi</Link>
              <Link to="/guides/guide-fiancailles-henne-fetes">Guide fiançailles et henné</Link>
            </div>
          </div>
          <div className="s-col-d">
            <h2 className="s-surtitre" style={{ marginBottom: 14 }}>Nos services de mariage</h2>
            <div className="s-villes" style={{ marginTop: 0 }}>
              <Link to="/organisation-mariage">Organisation de mariage</Link>
              <Link to="/hotesses-mariage">Hôtesses de mariage</Link>
              <Link to="/nawar">Nawar, bar à parfums</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
