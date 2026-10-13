import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { 
  Award, 
  Users, 
  Heart, 
  Star, 
  Building2, 
  Calendar,
  CheckCircle,
  Sparkles
} from "lucide-react";

const About = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: Award,
      title: t('about.values.excellence.title'),
      description: t('about.values.excellence.description')
    },
    {
      icon: Heart,
      title: t('about.values.passion.title'),
      description: t('about.values.passion.description')
    },
    {
      icon: Users,
      title: t('about.values.professionalism.title'),
      description: t('about.values.professionalism.description')
    },
    {
      icon: Sparkles,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description')
    }
  ];

  const stats = [
    { number: "10+", label: t('about.stats.years_experience'), icon: Calendar },
    { number: "500+", label: t('about.stats.successful_events'), icon: CheckCircle },
    { number: "98%", label: t('about.stats.satisfied_clients'), icon: Star },
    { number: "100+", label: t('about.stats.partner_companies'), icon: Building2 }
  ];

  const services = [
    {
      title: t('about.services.event_staffing.title'),
      description: t('about.services.event_staffing.description'),
      tags: t('about.services.event_staffing.tags', { returnObjects: true }) as string[]
    },
    {
      title: t('about.services.corporate_events.title'),
      description: t('about.services.corporate_events.description'),
      tags: t('about.services.corporate_events.tags', { returnObjects: true }) as string[]
    },
    {
      title: t('about.services.wedding_services.title'),
      description: t('about.services.wedding_services.description'),
      tags: t('about.services.wedding_services.tags', { returnObjects: true }) as string[]
    }
  ];

  return (
    <div>
      <Helmet>
        <title>À Propos | Notre Histoire | Heavent People Agency Maroc</title>
        <meta name="description" content="Découvrez l'histoire de Heavent People Agency, agence événementielle de prestige au Maroc. +10 ans d'expérience, 500+ événements réussis, 98% de clients satisfaits." />
        <meta name="keywords" content="Heavent People Agency, agence événementielle Maroc, histoire entreprise, événements prestige, équipe professionnelle" />
        <meta property="og:title" content="À Propos de Heavent People Agency" />
        <meta property="og:description" content="Notre expertise et notre passion au service de vos événements exceptionnels depuis plus de 10 ans." />
        <link rel="canonical" href="https://heavent.ma/a-propos" />
      </Helmet>
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-background to-accent/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              {t('about.hero_title')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {t('about.hero_description')}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-scale-in">
                <stat.icon className="text-primary mx-auto mb-4" size={48} />
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="animate-fade-in">
                <h2 className="text-4xl font-serif font-bold mb-6">
                  {t('about.story_title')}
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    {t('about.story_paragraphs.p1')}
                  </p>
                  <p>
                    {t('about.story_paragraphs.p2')}
                  </p>
                  <p>
                    {t('about.story_paragraphs.p3')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 animate-scale-in">
                <Card className="hover-lift">
                  <CardContent className="p-6 text-center">
                    <Award className="text-primary mx-auto mb-4" size={40} />
                    <h3 className="font-semibold mb-2">{t('about.quality_cards.premium_quality')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('about.quality_cards.premium_desc')}
                    </p>
                  </CardContent>
                </Card>
                <Card className="hover-lift">
                  <CardContent className="p-6 text-center">
                    <Users className="text-primary mx-auto mb-4" size={40} />
                    <h3 className="font-semibold mb-2">{t('about.quality_cards.expert_team')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('about.quality_cards.expert_desc')}
                    </p>
                  </CardContent>
                </Card>
                <Card className="hover-lift">
                  <CardContent className="p-6 text-center">
                    <Heart className="text-primary mx-auto mb-4" size={40} />
                    <h3 className="font-semibold mb-2">{t('about.quality_cards.custom_made')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('about.quality_cards.custom_desc')}
                    </p>
                  </CardContent>
                </Card>
                <Card className="hover-lift">
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="text-primary mx-auto mb-4" size={40} />
                    <h3 className="font-semibold mb-2">{t('about.quality_cards.reliability')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('about.quality_cards.reliability_desc')}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-6">
              {t('about.values_title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('about.values_description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover-lift text-center">
                <CardContent className="p-8">
                  <div className="inline-flex p-3 rounded-full bg-primary/10 mb-6">
                    <value.icon className="text-primary" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-6">
              {t('about.services_title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('about.services_description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover-lift">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">
            {t('about.cta_title')}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('about.cta_description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              {t('about.contact_us')}
            </a>
            <a 
              href="/devis-entreprise" 
              className="inline-flex items-center justify-center px-8 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors font-medium"
            >
              {t('about.request_quote')}
            </a>
          </div>
        </div>
      </section>
    </div>
    </div>
  );
};

export default About;