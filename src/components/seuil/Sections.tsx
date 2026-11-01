import { ReactNode } from "react";
import { useTexte } from "@/i18n/textes";
import { NUMERO_WHATSAPP } from "@/components/BoutonWhatsApp";
import { Bouton, Etoile, Surtitre } from "./Seuil";

/** Les chiffres de l'agence, présentés comme un faire-part (10 ans, 6 villes, 3 langues). */
export function FairePart({ id }: { id?: string }) {
  const x = useTexte();
  return (
    <div className="s-fairepart" data-revele="">
      <Etoile /><Etoile className="bas" />
      <div className="s-fp-tete">Heavent People Agency</div>
      <h2 className="s-fp-titre" id={id}>{x("a l'honneur de vous annoncer")}</h2>
      <div className="s-chiffres">
        <div className="s-chiffre"><b data-compte="10">10</b><span><strong>{x("ans")}</strong>{x("d'accueil, d'événements et de mariages")}</span></div>
        <div className="s-chiffre"><b data-compte="6">6</b><span><strong>{x("villes")}</strong>Rabat, Casablanca, Marrakech, Tanger, Agadir, Fès</span></div>
        <div className="s-chiffre"><b data-compte="3">3</b><span><strong>{x("langues")}</strong>{x("français, anglais et arabe")}</span></div>
      </div>
    </div>
  );
}

/** Dernière section d'une page : un titre, le devis et WhatsApp, sur fond nuit. */
export function Fin({ titre, texte, devis = "/devis-entreprise", libelleDevis, messageWhatsApp, children }: {
  titre: ReactNode; texte?: ReactNode; devis?: string; libelleDevis?: string; messageWhatsApp?: string; children?: ReactNode;
}) {
  const x = useTexte();
  const wa = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(messageWhatsApp ?? "Bonjour Heavent People Agency, j'aimerais avoir des informations.")}`;
  return (
    <section className="s-nuit">
      <div className="s-fin s-wrap" style={{ paddingBottom: 72 }}>
        <Surtitre>{x("Votre date")}</Surtitre>
        <h2 data-revele="">{titre}</h2>
        {texte ? <p className="s-chapo" style={{ marginTop: 18, maxWidth: "46ch" }}>{texte}</p> : null}
        {children ?? (
          <div className="s-actions">
            <Bouton to={devis} variante="plein" fleche>{libelleDevis ?? x("Demander un devis")}</Bouton>
            <Bouton href={wa} variante="filet" externe>{x("Écrire sur WhatsApp")}</Bouton>
          </div>
        )}
      </div>
    </section>
  );
}
