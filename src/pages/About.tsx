import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { useTranslation } from "react-i18next";
import { useTexte } from "@/i18n/textes";
import { PageTete, Photo, Surtitre } from "@/components/seuil/Seuil";
import { FairePart, Fin } from "@/components/seuil/Sections";

const ROMAINS = ["I", "II", "III", "IV", "V"];

const About = () => {
  const { t } = useTranslation();
  const x = useTexte();

  const valeurs = ["excellence", "passion", "professionalism", "innovation"].map((k) => ({
    titre: t(`about.values.${k}.title`), texte: t(`about.values.${k}.description`),
  }));
  const services = [
    { cle: "event_staffing", lien: "/hotesses-salons-congres" },
    { cle: "corporate_events", lien: "/staff-evenementiel" },
    { cle: "wedding_services", lien: "/organisation-mariage" },
  ].map(({ cle, lien }) => ({
    titre: t(`about.services.${cle}.title`), texte: t(`about.services.${cle}.description`),
    tags: t(`about.services.${cle}.tags`, { returnObjects: true }) as string[], lien,
  }));

  return (
    <div>
      <Seo page="apropos" />
      <PageTete surtitre={x("À propos")} titre={t("about.hero_title")} chapo={t("about.hero_description")} />

      {/* L'histoire */}
      <section className="s-platre">
        <div className="s-section s-wrap s-colonnes">
          <div className="s-col-g" data-revele="">
            <Surtitre>{x("L'agence")}</Surtitre>
            <h2 className="s-h2" style={{ marginTop: 20, maxWidth: "12ch" }}>{t("about.story_title")}</h2>
            <div className="s-prose" style={{ marginTop: 26 }}>
              <p>{t("about.story_paragraphs.p1")}</p>
              <p>{t("about.story_paragraphs.p2")}</p>
              <p>{t("about.story_paragraphs.p3")}</p>
            </div>
          </div>
          <div className="s-col-d">
            <Photo nom="ruban-heavent" l={900} h={1208} tailles="(min-width:900px) 34vw, 92vw" legende={x("Le ruban HEAVENT · assiette dorée ajourée")}
              alt={x("Serviette blanche nouée d'un ruban noir marqué HEAVENT, posée sur une assiette de présentation dorée ajourée")} />
          </div>
        </div>
      </section>

      {/* Les valeurs */}
      <section className="s-nuit">
        <div className="s-section s-wrap s-colonnes">
          <div className="s-col-g" data-revele="">
            <Surtitre>{t("about.values_title")}</Surtitre>
            <h2 className="s-h2" style={{ marginTop: 20, maxWidth: "13ch" }}>{t("about.values_description")}</h2>
          </div>
          <ol className="s-liste s-col-d">
            {valeurs.map((v, i) => (
              <li key={v.titre} data-revele="" style={{ "--retard": `${i * 0.08}s` } as CSSProperties}>
                <span className="num">{ROMAINS[i]}</span><div><b>{v.titre}</b></div><p>{v.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Les chiffres, comme un faire-part */}
      <section className="s-platre">
        <div className="s-section s-wrap">
          <div className="s-chiffres-zone">
            <div className="s-intro" data-revele="">
              <Surtitre>{x("En quelques chiffres")}</Surtitre>
              <p className="s-texte">{x("Le siège est à Rabat ; les équipes se déplacent partout au Maroc.")}</p>
            </div>
            <FairePart />
          </div>
        </div>
      </section>

      {/* Les expertises */}
      <section className="s-papier">
        <div className="s-section s-sommaire s-wrap">
          <div className="gauche" data-revele="">
            <Surtitre>{t("about.services_title")}</Surtitre>
            <h2>{t("about.services_description")}</h2>
          </div>
          <div className="s-entrees">
            {services.map((s, i) => (
              <Link key={s.titre} to={s.lien} className="s-entree" data-revele="" style={{ "--retard": `${i * 0.08}s` } as CSSProperties}>
                <span className="num">{ROMAINS[i]}</span><h3>{s.titre}</h3><span className="fl" aria-hidden="true">→</span>
                <p>{s.texte}<br /><span style={{ fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--s-laiton-texte)" }}>{s.tags.join(" · ")}</span></p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Fin titre={t("about.cta_title")} texte={t("about.cta_description")} libelleDevis={t("about.request_quote")} />
    </div>
  );
};

export default About;
