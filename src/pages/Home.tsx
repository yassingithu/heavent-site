import { CSSProperties, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Seo from "@/components/Seo";
import SectionConfiance from "@/components/vitrine/Confiance";
import AppelCandidats from "@/components/vitrine/AppelCandidats";
import { VILLES } from "@/lib/pagesLocales";
import { useTexte } from "@/i18n/textes";
import { NUMERO_WHATSAPP } from "@/components/BoutonWhatsApp";
import { Bouton, Etoile, Lumieres, Photo, Ruban, Surtitre, consommerPremierAffichage } from "@/components/seuil/Seuil";

/**
 * Accueil — direction « Seuil » (v3, prototype design-captures/v3/accueil.html).
 * Uniquement de vraies photos des événements Heavent et du bar Nawar, entières, avec leur liseré or.
 * L'ouverture en battants est jouée par index.html (une fois par visite) ; le titre monte ensuite dans ses masques.
 */
const WHATSAPP = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent("Bonjour Heavent People Agency, j'aimerais avoir des informations.")}`;

const Home = () => {
  const x = useTexte();
  // Page pré-générée déjà affichée : les animations du héros reprennent là où elles en sont (pas de second départ)
  const [t0] = useState(() => (consommerPremierAffichage() ? -Math.min(Math.round(performance.now()), 5000) : 0));
  const cta = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    // le reflet passe une fois sur le bouton plein quand le titre est en place
    const ouverture = document.documentElement.classList.contains("avec-ouverture") && !document.documentElement.classList.contains("ouverture-finie");
    const id = window.setTimeout(() => cta.current?.classList.add("brille"), Math.max(0, (ouverture ? 2000 : 1300) + t0));
    return () => window.clearTimeout(id);
  }, [t0]);

  const metiers = [
    { num: "I", titre: x("Hôtesses & accueil"), texte: x("Congrès, salons, galas, ambassades : l'accueil qui donne le ton dès la porte."), lien: "/hotesses-salons-congres" },
    { num: "II", titre: x("Staff événementiel"), texte: x("Maîtres d'hôtel, serveurs, vestiaire, voituriers : une équipe en tenue, coordonnée sur place."), lien: "/staff-evenementiel" },
    { num: "III", titre: x("Mariages"), texte: x("Du henné au dernier invité, chaque soirée orchestrée sans que personne ne vous voie courir."), lien: "/organisation-mariage" },
    { num: "IV", titre: "Nawar", texte: x("Le bar à parfums : des parfums choisis par les mariés pour leurs invités, servis au flacon."), lien: "/nawar" },
  ];
  const engagements = [
    { num: "I", titre: x("En place avant vous"), texte: x("L'équipe arrive bien avant le premier invité : tenues, vestiaire et plan de salle sont prêts.") },
    { num: "II", titre: x("Une seule personne à appeler"), texte: x("Un coordinateur suit votre événement, du devis jusqu'au dernier invité.") },
    { num: "III", titre: x("Le soir même, on ne vous dérange pas"), texte: x("Les imprévus se règlent entre nous, sans que la salle ne le remarque.") },
  ];
  const etapes = [
    ["16h00", x("Mise en place"), x("La salle est vérifiée, l'équipe s'habille, chacun connaît sa place.")],
    ["19h30", x("Accueil des invités"), x("Hôtesses au seuil, vestiaire, placement à table.")],
    ["21h00", x("Entrée des mariés"), x("Le signal est donné à la musique et au service, à la seconde.")],
    ["23h00", x("Dîner et soirée"), x("Le service suit le rythme de la piste, pas l'inverse.")],
    ["03h00", x("Dernier invité"), x("On raccompagne, on range ; vous partez les mains libres.")],
  ];

  return (
    <div>
      <Seo page="accueil" />
      <Helmet>
        <link rel="preload" as="image" href="/photos/table-honneur-720.webp" imageSrcSet="/photos/table-honneur-480.webp 480w, /photos/table-honneur-720.webp 720w, /photos/table-honneur.jpg 900w" imageSizes="(min-width:900px) 40vw, 92vw" />
      </Helmet>

      {/* Héros : le titre, le bouton devis dans le premier écran, la table d'honneur */}
      <section className="s-nuit" aria-labelledby="t-heros">
        <div className="s-heros s-wrap" style={{ "--t0": `${t0}ms` } as CSSProperties}>
          <div className="s-meta"><span>{x("Agence d'hôtesses & d'événementiel")}</span><span className="long">{x("Rabat · partout au Maroc")}</span></div>
          <span className="s-filet" aria-hidden="true" />
          <h1 className="s-titre-heros" id="t-heros">
            <span className="s-ligne s-l1" style={{ "--n": x("L'accueil,").length, "--f": /[\u0600-\u06FF]/.test(x("L'accueil,")) ? .5 : .42 } as CSSProperties}><span>{x("L'accueil,")}</span></span>
            <span className="s-ligne s-l2"><span>{x("c'est le premier")}</span></span>
            <span className="s-ligne s-l2 s-l3"><span>{x("souvenir.")}</span></span>
          </h1>
          <div className="s-chapo-zone">
            <p className="s-chapo s-entree-heros">{x("Hôtesses, staff et mariages orchestrés de Rabat à Marrakech, par une équipe qui connaît chaque palais, chaque protocole et chaque détail.")}</p>
            <div className="s-actions s-entree-heros">
              <a ref={cta} className="s-btn s-btn-plein" href="#devis" data-testid="accueil-devis">{x("Demander un devis")} <span className="fl" aria-hidden="true">→</span></a>
              <Bouton to="/cree-ton-evenement" variante="filet">{x("Imaginer mon événement")}</Bouton>
            </div>
          </div>
          <Photo prioritaire nom="table-honneur" l={900} h={1204} legende={x("Table d'honneur · gypsophile suspendue")}
            alt={x("Table d'honneur d'un mariage devant de grandes verrières en arche, un nuage de gypsophile suspendu au-dessus de la nappe ivoire")} />
        </div>
      </section>

      {/* Sommaire des métiers */}
      <section className="s-platre" aria-labelledby="t-som">
        <div className="s-section s-sommaire s-wrap">
          <div className="gauche" data-revele="">
            <Surtitre>{x("Sommaire")}</Surtitre>
            <h2 id="t-som">{x("Quatre métiers, un seul accueil.")}</h2>
          </div>
          <div className="s-entrees">
            {metiers.map((m, i) => (
              <Link key={m.num} to={m.lien} className="s-entree" data-revele="" style={{ "--retard": `${i * 0.08}s` } as CSSProperties}>
                <span className="num">{m.num}</span><h3>{m.titre}</h3><span className="fl" aria-hidden="true">→</span><p>{m.texte}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* La signature : le ruban noir HEAVENT des serviettes */}
      <section className="s-papier" aria-labelledby="t-ruban">
        <div className="s-signature-r s-wrap">
          <div className="s-txt" data-revele="">
            <Ruban>Heavent</Ruban>
            <h2 id="t-ruban">{x("Notre signature tient dans un ruban.")}</h2>
            <p className="s-texte">{x("Sur chaque assiette, une serviette nouée d'un ruban noir à notre nom. Personne ne le cherche ; tout le monde le remarque.")}</p>
          </div>
          <Photo nom="ruban-heavent" l={900} h={1208} legende={x("Le ruban HEAVENT · assiette dorée ajourée")}
            alt={x("Serviette blanche nouée d'un ruban noir marqué HEAVENT, posée sur une assiette de présentation dorée ajourée")} />
        </div>
      </section>

      {/* Notre règle : une phrase, puis ce qu'elle veut dire concrètement */}
      <section className="s-nuit" aria-labelledby="t-regle">
        <div className="s-regle s-wrap">
          <div className="gauche" data-revele="">
            <Surtitre>{x("Notre règle")}</Surtitre>
            <h2 id="t-regle">{x("Le luxe, c'est quand")} <em>{x("personne ne voit")}</em> {x("le travail.")}</h2>
          </div>
          <ol className="s-liste">
            {engagements.map((e, i) => (
              <li key={e.num} data-revele="" style={{ "--retard": `${i * 0.08}s` } as CSSProperties}><span className="num">{e.num}</span><div><b>{e.titre}</b></div><p>{e.texte}</p></li>
            ))}
          </ol>
          <div className="s-details">
            <Photo petit nom="assiette-liseret-or" l={900} h={1026} tailles="(min-width:900px) 25vw, 46vw" legende={x("Liseré or")} alt={x("Assiette ivoire à liseré or et couverts dorés dans une lumière rasante")} />
            <Photo petit nom="coffret-laiton" l={900} h={1218} tailles="(min-width:900px) 25vw, 46vw" legende={x("Laiton ciselé")} alt={x("Coffret octogonal en bois avec encensoir en laiton ciselé et pétales de rose séchés")} />
          </div>
        </div>
      </section>

      {/* Les chiffres, comme un faire-part */}
      <section className="s-platre" aria-labelledby="t-fp">
        <div className="s-section s-wrap">
          <div className="s-chiffres-zone">
            <div className="s-intro" data-revele="">
              <Surtitre>{x("En quelques chiffres")}</Surtitre>
              <p className="s-texte">{x("Le siège est à Rabat ; les équipes se déplacent partout au Maroc.")}</p>
              <nav className="s-villes" aria-label={x("Nos villes")}>
                {VILLES.map((v) => <Link key={v.chemin} to={v.chemin}>{x("Hôtesses à {ville}", { ville: x(v.nomCourt) })}</Link>)}
              </nav>
            </div>
            <div className="s-fairepart" data-revele="">
              <Etoile /><Etoile className="bas" />
              <div className="s-fp-tete">Heavent People Agency</div>
              <h2 className="s-fp-titre" id="t-fp">{x("a l'honneur de vous annoncer")}</h2>
              <div className="s-chiffres">
                <div className="s-chiffre"><b data-compte="10">10</b><span><strong>{x("ans")}</strong>{x("d'accueil, d'événements et de mariages")}</span></div>
                <div className="s-chiffre"><b data-compte="6">6</b><span><strong>{x("villes")}</strong>Rabat, Casablanca, Marrakech, Tanger, Agadir, Fès</span></div>
                <div className="s-chiffre"><b data-compte="3">3</b><span><strong>{x("langues")}</strong>{x("français, anglais et arabe")}</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mariages : le déroulé de la soirée, le henné, le sur-mesure */}
      <section className="s-platre" aria-labelledby="t-mar">
        <div className="s-section s-wrap" style={{ paddingTop: 0 }}>
          <div className="s-mariages">
            <div className="s-txt" data-revele="">
              <Surtitre>{x("Mariages")}</Surtitre>
              <h2 id="t-mar">{x("Le jour J, on ne vous verra pas courir.")}</h2>
              <p className="s-texte">{x("Organisation complète ou partielle : prestataires, planning, accueil des invités et coordination le soir même, pour que vous n'ayez qu'à être là.")}</p>
              <Link className="s-lien" to="/organisation-mariage">{x("Voir les mariages")}</Link>
            </div>
            <Photo nom="allee-gypsophile" l={900} h={1104} legende={x("Chemin de gypsophile et roses blanches")}
              alt={x("Longue table de mariage avec un chemin de gypsophile et de roses blanches, chaises médaillon ivoire, sous une verrière")} />
            <div className="s-deroule" data-deroule="">
              <h3>{x("Une soirée, de notre côté")}</h3>
              <div className="s-etapes">
                {etapes.map(([h, t, d]) => <div key={h} className="s-etape"><time>{h}</time><div><b>{t}</b><span>{d}</span></div></div>)}
              </div>
            </div>
            <div className="s-henne">
              <Photo nom="decor-henne" l={900} h={1208}
                alt={x("Décor de henné : banquette dorée devant un panneau de moucharabieh en arche, plateau de laiton et tapis rouge")} />
              <div className="s-texte-h" data-revele="">
                <Surtitre>{x("Le henné")}</Surtitre>
                <h3>{x("La soirée qui ouvre le mariage.")}</h3>
                <p>{x("Banquette, moucharabieh en arche, laiton et bougies : un décor installé et tenu pour vous, jusqu'à la dernière invitée.")}</p>
              </div>
            </div>
            <div className="s-prenom">
              <div className="s-texte-p" data-revele="">
                <Surtitre>{x("Sur mesure")}</Surtitre>
                <h3>{x("Jusqu'au prénom de la mariée.")}</h3>
                <p>{x("Boîte brodée, chevalet d'accueil, date peinte à la main : chaque soirée porte son nom.")}</p>
              </div>
              <div className="s-duo">
                <Photo petit nom="boite-henne-prenom" l={900} h={1092} tailles="(min-width:900px) 25vw, 46vw" legende={x("Boîte de henné brodée")}
                  alt={x("Boîte de henné brodée d'une étoile, au prénom de la mariée et à la date de la soirée, entre deux brûle-parfums en laiton")} />
                <Photo petit nom="chevalet-accueil" l={900} h={1216} tailles="(min-width:900px) 25vw, 46vw" legende={x("Chevalet d'accueil")}
                  alt={x("Chevalet doré « Marhbabikoum au Henna de Zayneb », un encensoir fumant au premier plan")} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nawar : de vraies photos du bar, et ses petites lumières */}
      <section className="s-nawar" aria-labelledby="t-naw">
        <Lumieres />
        <div className="s-nawar-s s-wrap s-grille">
          <div className="s-txt" data-revele="">
            <img className="s-logo-nawar" src="/logo-nawar-clair.png" alt={x("Nawar, bar à parfums")} width={463} height={488} loading="lazy" />
            <h2 id="t-naw">{x("Ce que vos invités emportent, c'est un parfum.")}</h2>
            <p className="s-chapo">{x("Les mariés choisissent les parfums ; Nawar les sert au flacon, et vos invités repartent avec un souvenir qu'on sent encore le lendemain.")}</p>
            <div className="s-actions"><Bouton to="/nawar" variante="filet" fleche>{x("Découvrir Nawar")}</Bouton></div>
          </div>
          <div className="s-photos">
            <Photo nom="nawar-bar" l={900} h={1246} legende={x("Le bar Nawar, un soir de mariage")}
              alt={x("Le bar à parfums Nawar la nuit : comptoir en bois clair au logo Nawar, distributeurs de parfum et roses, sous des palmiers")} />
            <Photo nom="nawar-flacons" className="second" l={880} h={1318} tailles="(min-width:900px) 25vw, 70vw" legende={x("Les parfums choisis par les mariés")}
              alt={x("Les distributeurs numérotés N°1 à N°5 et les flacons Nawar, sous un palmier éclairé")} />
          </div>
        </div>
      </section>

      {/* Avis, engagements et questions fréquentes (renseignés dans l'admin) */}
      <SectionConfiance />

      {/* Fin : le devis, WhatsApp, les coordonnées, la signature */}
      <section className="s-nuit" id="devis" aria-labelledby="t-fin" style={{ scrollMarginTop: 64 }}>
        <div className="s-fin s-wrap" style={{ paddingBottom: 72 }}>
          <div className="s-haut">
            <div>
              <Surtitre>{x("Votre date")}</Surtitre>
              <h2 id="t-fin" data-revele="">{x("Racontez-nous l'événement. On s'occupe de l'accueil.")}</h2>
              <div className="s-actions" data-revele="">
                <Bouton to="/devis-mariage" variante="plein" fleche testid="fin-devis-mariage">{x("Devis mariage ou fête")}</Bouton>
                <Bouton to="/devis-entreprise" variante="filet" testid="fin-devis-entreprise">{x("Devis entreprise")}</Bouton>
              </div>
              <a className="s-lien" href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{ marginTop: 14 }}>{x("Écrire sur WhatsApp")}</a>
            </div>
            <div className="s-coord" data-revele="">
              <span><b>{x("Siège")}</b> · Rabat</span>
              <span><b>{x("Contact")}</b> · <a href="mailto:info@heaventagency.com">info@heaventagency.com</a></span>
              <span><b>{x("Candidat(e) ?")}</b> · <Link to="/inscription-staff" data-testid="fin-inscription-staff">{x("Inscription ici")}</Link></span>
              <span><b>{x("Langues")}</b> · FR · EN · ع</span>
            </div>
          </div>
        </div>
      </section>
      <AppelCandidats />
    </div>
  );
};

export default Home;
