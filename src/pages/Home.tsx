import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  Building2, 
  Heart, 
  Star, 
  Award, 
  CheckCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";
import heroImage from "@/assets/hero-staff.jpg";

const Home = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: Users,
      title: t('home.hostess.title'),
      description: t('home.hostess.description'),
      link: "/devis-entreprise",
      color: "text-blue-600"
    },
    {
      icon: Heart,
      title: t('home.wedding.title'),
      description: t('home.wedding.description'),
      link: "/devis-mariage",
      color: "text-pink-600"
    },
    {
      icon: Building2,
      title: t('home.event.title'),
      description: t('home.event.description'),
      link: "/devis-entreprise",
      color: "text-primary"
    }
  ];

  const features = [
    {
      icon: Star,
      title: t('home.experience.title'),
      description: t('home.experience.description')
    },
    {
      icon: Users,
      title: t('home.team.title'),
      description: t('home.team.description')
    },
    {
      icon: Award,
      title: t('home.service.title'),
      description: t('home.service.description')
    },
    {
      icon: CheckCircle,
      title: t('home.satisfaction.title'),
      description: t('home.satisfaction.description')
    }
  ];

  return (
    <div>
      <Seo page="accueil" />
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${heroImage})` }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <p className="uppercase tracking-[0.2em] text-xs md:text-sm text-primary/90 mb-4">
              Agence d'hôtesses & d'événementiel · Rabat · Casablanca · Marrakech
            </p>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
              {t('home.heroTitle')}
              <span className="block text-primary">{t('home.heroSubtitle')}</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
              {t('home.heroDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6 gold-shadow">
                <Link to="/devis-entreprise">
                  {t('home.getQuote')}
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Link to="/inscription-staff">
                  {t('home.joinUs')}
                  <Users className="ml-2" size={20} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-b from-background to-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              {t('home.servicesTitle')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.servicesSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <Card key={index} className="hover-lift elegant-shadow group cursor-pointer">
                <CardContent className="p-8 text-center">
                  <div className={`inline-flex p-3 rounded-full bg-accent mb-6 ${service.color}`}>
                    <service.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <Button asChild variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Link to={service.link}>
                      En savoir plus
                      <ArrowRight className="ml-2" size={16} />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="inline-block p-8 gold-gradient text-primary-foreground">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="mr-2" size={24} />
                <span className="text-xl font-semibold">Prêt à organiser votre événement ?</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="secondary" size="lg">
                  <Link to="/devis-entreprise">Devis Entreprise</Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link to="/devis-mariage">Devis Événement</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
                {t('home.whyChooseTitle')}
                <span className="block text-primary">{t('home.whyChooseTitleBrand')}</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t('home.whyChooseDescription')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-background rounded-lg border">
                    <feature.icon className="text-primary flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild size="lg" className="gold-shadow">
                <Link to="/a-propos">
                  Découvrir notre histoire
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-6 animate-scale-in">
              <Card className="hover-lift">
                <CardContent className="p-6 text-center">
                  <Award className="text-primary mx-auto mb-4" size={48} />
                  <h3 className="text-2xl font-bold mb-2">10+</h3>
                  <p className="text-muted-foreground">Années d'expérience</p>
                </CardContent>
              </Card>
              <Card className="hover-lift">
                <CardContent className="p-6 text-center">
                  <Users className="text-primary mx-auto mb-4" size={48} />
                  <h3 className="text-2xl font-bold mb-2">500+</h3>
                  <p className="text-muted-foreground">Événements réussis</p>
                </CardContent>
              </Card>
              <Card className="hover-lift">
                <CardContent className="p-6 text-center">
                  <Star className="text-primary mx-auto mb-4" size={48} />
                  <h3 className="text-2xl font-bold mb-2">98%</h3>
                  <p className="text-muted-foreground">Clients satisfaits</p>
                </CardContent>
              </Card>
              <Card className="hover-lift">
                <CardContent className="p-6 text-center">
                  <Building2 className="text-primary mx-auto mb-4" size={48} />
                  <h3 className="text-2xl font-bold mb-2">100+</h3>
                  <p className="text-muted-foreground">Entreprises partenaires</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      {/* Partout au Maroc (contenu local utile aux clients… et à Google) */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-center">Hôtesses d'accueil et staff événementiel partout au Maroc</h2>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-10">
            Salons, congrès, lancements de produit, soirées d'entreprise ou mariages : nous sélectionnons des hôtes et hôtesses
            bilingues (français, arabe, anglais), formés à l'accueil haut de gamme, et nous gérons pour vous contrats, tenues et coordination sur place.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              ["Rabat", "Siège de l'agence : accueil protocolaire, congrès, ambassades et institutions."],
              ["Casablanca", "Salons professionnels, lancements de marque, séminaires et soirées d'entreprise."],
              ["Marrakech", "Mariages, événements de prestige, incentives et accueil VIP dans les palaces."],
              ["Tanger", "Congrès, inaugurations et événements corporate dans la région du Nord."],
              ["Agadir", "Séminaires, événements hôteliers et animations commerciales."],
              ["Fès", "Congrès et événements culturels ; nos équipes se déplacent aussi partout au Maroc, sur devis."],
            ].map(([ville, texte]) => (
              <div key={ville} className="rounded-lg border bg-card p-5">
                <h3 className="font-semibold text-lg mb-1">Hôtesses à {ville}</h3>
                <p className="text-sm text-muted-foreground">{texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            {t('home.ctaTitle')}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('home.ctaDescription')}
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
            <Link to="/contact">
              {t('home.contactUs')}
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;