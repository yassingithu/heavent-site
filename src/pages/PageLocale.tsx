import { Link } from "react-router-dom";
import Seo, { DONNEES_AGENCE, SITE } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarCheck2, CheckCircle2, MapPin, MessageCircle, Sparkles } from "lucide-react";
import SectionConfiance, { NoteGoogle, useVitrine } from "@/components/vitrine/Confiance";
import { NUMERO_WHATSAPP } from "@/components/BoutonWhatsApp";
import { PageLocale as Page, SERVICES, VILLES } from "@/lib/pagesLocales";

/** Page publique d'une ville ou d'un service (contenu propre à chaque page, liens vers les autres). */
export default function PageLocale({ page }: { page: Page }) {
  const v = useVitrine();
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
  const whatsapp = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(`Bonjour, je souhaite des informations : ${page.h1}.`)}`;
  const autresVilles = VILLES.filter((x) => x.chemin !== page.chemin);
  const autresServices = SERVICES.filter((x) => x.chemin !== page.chemin);

  return (
    <div data-testid="page-locale">
      <Seo perso={{ chemin: page.chemin, titre: page.titreSeo, description: page.descriptionSeo, motsCles: page.motsCles, jsonLd }} />

      <section className="py-20 md:py-28 bg-gradient-to-b from-[#FAF7EE] to-background">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-6">
          <nav className="text-xs text-muted-foreground" aria-label="Fil d'Ariane"><Link to="/" className="hover:underline">Accueil</Link> › {page.nomCourt}</nav>
          <p className="uppercase tracking-[0.25em] text-xs text-[#8C6D22] flex items-center justify-center gap-1">
            {page.ville ? <><MapPin className="h-3.5 w-3.5" /> {page.ville}</> : <><Sparkles className="h-3.5 w-3.5" /> Heavent People Agency</>}
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold">{page.h1}</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{page.accroche}</p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button asChild size="lg"><Link to={lienDevis}>Demander un devis <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            <Button asChild size="lg" variant="outline"><Link to="/contact#rendez-vous"><CalendarCheck2 className="mr-2 h-4 w-4" /> Prendre rendez-vous</Link></Button>
          </div>
          <div className="pt-2"><NoteGoogle v={v} /></div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl grid lg:grid-cols-[1.4fr_1fr] gap-10">
          <div className="space-y-4 text-[17px] leading-relaxed text-[#3d362d]">
            {page.intro.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="rounded-2xl border border-[#EADFC8] bg-white p-6">
            <h2 className="font-serif text-2xl mb-4">{page.type === "ville" ? `Nos missions à ${page.ville}` : "Ce que nous prenons en charge"}</h2>
            <ul className="space-y-2">
              {page.evenements.map((e) => <li key={e} className="flex gap-2"><CheckCircle2 className="h-5 w-5 shrink-0 text-[#A8933F]" /> {e}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-serif font-bold mb-8 text-center">Comment ça se passe</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {page.pointsCles.map((p, i) => (
              <div key={p.titre} className="rounded-2xl bg-white border border-[#EADFC8] p-6">
                <div className="h-9 w-9 rounded-full bg-[#141414] text-white flex items-center justify-center font-semibold mb-3">{i + 1}</div>
                <h3 className="font-semibold text-lg mb-1">{p.titre}</h3>
                <p className="text-sm text-muted-foreground">{p.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionConfiance faqExtra={page.faq} />

      <section className="py-16 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center space-y-5 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">Parlons de votre événement</h2>
          <p className="text-lg opacity-80">Devis détaillé, à consulter et signer en ligne. Ou réservez directement un rendez-vous.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary"><Link to={lienDevis}>Demander un devis</Link></Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-background border-background/40 hover:bg-background/10"><a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle className="mr-2 h-4 w-4" /> WhatsApp</a></Button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-5xl grid sm:grid-cols-2 gap-8 text-sm">
          <div>
            <h2 className="font-semibold mb-3">Nos villes</h2>
            <ul className="space-y-1.5">{autresVilles.map((x) => <li key={x.chemin}><Link to={x.chemin} className="text-[#8C6D22] hover:underline">Hôtesses à {x.nomCourt}</Link></li>)}</ul>
          </div>
          <div>
            <h2 className="font-semibold mb-3">Nos services</h2>
            <ul className="space-y-1.5">
              {autresServices.map((x) => <li key={x.chemin}><Link to={x.chemin} className="text-[#8C6D22] hover:underline">{x.nomCourt}</Link></li>)}
              <li><Link to="/realisations" className="text-[#8C6D22] hover:underline">Nos réalisations en photos</Link></li>
              <li><Link to="/cree-ton-evenement" className="text-[#8C6D22] hover:underline">Crée ton événement (simulateur)</Link></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
