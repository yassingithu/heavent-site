import { FUNCTIONS_URL } from "@/integrations/supabase/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  MessageSquare,
  Clock,
  Send,
  CheckCircle
} from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"), 
  subject: z.string().min(5, "Le sujet doit contenir au moins 5 caractères"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type FormData = z.infer<typeof formSchema>;

const Contact = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const contactInfo = [
    {
      icon: Phone,
      title: t('contact.info.phone'),
      value: "+212 6 10 93 96 55",
      description: t('contact.info.phoneDescription'),
      href: "tel:+212610939655"
    },
    {
      icon: Mail,
      title: t('contact.info.email'),
      value: "info@heaventagency.com",
      description: t('contact.info.emailDescription'),
      href: "mailto:info@heaventagency.com"
    },
    {
      icon: MapPin,
      title: t('contact.info.address'),
      value: t('contact.info.addressValue'),
      description: t('contact.info.addressDescription'),
      href: "#"
    },
    {
      icon: Instagram,
      title: t('contact.info.instagram'),
      value: "@heaventagency",
      description: t('contact.info.instagramDescription'),
      href: "https://instagram.com/heaventagency"
    }
  ];

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${FUNCTIONS_URL}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact',
          data: data
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi');
      }

      toast({
        title: t('contact.form.success'),
        description: t('contact.form.successDescription'),
      });
      
      setIsSubmitted(true);
      reset();
    } catch (error: any) {
      console.error('❌ Erreur envoi contact:', error);
      
      let errorMessage = t('contact.form.errorDescription');
      
      if (error.message?.includes('Network')) {
        errorMessage = "Problème de connexion. Vérifiez votre connexion internet.";
      } else if (error.message?.includes('500')) {
        errorMessage = "Erreur serveur temporaire. Veuillez réessayer dans quelques instants.";
      }
      
      toast({
        title: t('contact.form.error'),
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-accent/30 flex items-center justify-center py-12">
        <Card className="max-w-md mx-4 text-center">
          <CardContent className="p-8">
            <CheckCircle className="text-green-500 mx-auto mb-4" size={64} />
            <h2 className="text-2xl font-bold mb-4">Message envoyé !</h2>
            <p className="text-muted-foreground mb-6">
              Votre message a été envoyé avec succès. Notre équipe va l'examiner et vous répondra sous 24h.
            </p>
            <Button onClick={() => setIsSubmitted(false)}>
              Envoyer un nouveau message
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Contact | Nous Contacter | Heavent People Agency Maroc</title>
        <meta name="description" content="Contactez Heavent People Agency pour votre projet événementiel au Maroc. Devis gratuit, conseil personnalisé. ☎️ +212 6 10 93 96 55 📧 info@heaventagency.com" />
        <meta name="keywords" content="contact Heavent People Agency, devis événement Maroc, projet événementiel, consultation gratuite" />
        <meta property="og:title" content="Contact | Heavent People Agency" />
        <meta property="og:description" content="Une question ? Un projet ? Parlons-en ensemble. Contactez notre équipe d'experts." />
        <link rel="canonical" href="https://heavent.ma/contact" />
      </Helmet>
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-background to-accent/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              {t('contact.title')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-serif font-bold mb-8">
                Nos <span className="text-primary">Coordonnées</span>
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="hover-lift cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <info.icon className="text-primary" size={24} />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{info.title}</h3>
                          <a 
                            href={info.href}
                            className="text-foreground hover:text-primary transition-colors font-medium"
                          >
                            {info.value}
                          </a>
                          <p className="text-sm text-muted-foreground mt-1">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* WhatsApp Button */}
              <Card className="mt-6 bg-green-50 border-green-200 hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <MessageSquare className="text-green-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">WhatsApp</h3>
                      <a 
                        href="https://wa.me/212610939655"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700 transition-colors font-medium"
                      >
                        Chattez avec nous
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Réponse rapide garantie
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card className="mt-6">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Clock className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Horaires d'ouverture</h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Lun - Ven</span>
                          <span>9h00 - 18h00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Samedi</span>
                          <span>10h00 - 16h00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Dimanche</span>
                          <span>Fermé</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Send className="mr-2" size={24} />
                    Envoyez-nous un message
                  </CardTitle>
                  <CardDescription>
                    Remplissez ce formulaire et nous vous répondrons dans les plus brefs délais
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nom complet *</Label>
                        <Input
                          id="name"
                          {...register("name")}
                          className={errors.name ? "border-destructive" : ""}
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Sujet *</Label>
                      <Input
                        id="subject"
                        placeholder="Ex: Demande d'information, devis événement..."
                        {...register("subject")}
                        className={errors.subject ? "border-destructive" : ""}
                      />
                      {errors.subject && (
                        <p className="text-sm text-destructive mt-1">{errors.subject.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Décrivez votre demande en détail..."
                        rows={6}
                        {...register("message")}
                        className={errors.message ? "border-destructive" : ""}
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full gold-shadow"
                      size="lg"
                    >
                      {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                      <Send className="ml-2" size={20} />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-8">
            Vous préférez un devis <span className="text-primary">immédiat</span> ?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Accédez directement à nos formulaires de devis spécialisés pour une réponse plus rapide
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Card className="hover-lift cursor-pointer">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="p-4 bg-primary/10 rounded-full inline-flex mb-4">
                    <Phone className="text-primary" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Événement d'Entreprise</h3>
                  <p className="text-muted-foreground mb-4">
                    Devis personnalisé pour votre événement corporate
                  </p>
                  <Button asChild className="w-full">
                    <a href="/devis-entreprise">Demander un devis</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift cursor-pointer">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="p-4 bg-pink-100 rounded-full inline-flex mb-4">
                    <MessageSquare className="text-pink-600" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Mariage</h3>
                  <p className="text-muted-foreground mb-4">
                    Créons ensemble le mariage de vos rêves
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <a href="/devis-mariage">Demander un devis</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
    </div>
  );
};

export default Contact;