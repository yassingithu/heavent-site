import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Building2, Calendar, Users, CheckCircle } from "lucide-react";

const formSchema = z.object({
  companyName: z.string().min(2, "Le nom de la société est requis"),
  sector: z.string().min(2, "Le secteur d'activité est requis"),
  eventType: z.string().min(1, "Veuillez sélectionner un type d'événement"),
  eventDate: z.string().min(1, "La date de l'événement est requise"),
  eventLocation: z.string().min(2, "Le lieu de l'événement est requis"),
  staffCount: z.number().min(1, "Le nombre de personnel est requis").max(100, "Maximum 100 personnes"),
  requirements: z.string().optional(),
  contactName: z.string().min(2, "Le nom du responsable est requis"),
  contactEmail: z.string().email("Email invalide"),
  contactPhone: z.string().min(10, "Numéro de téléphone invalide"),
  budget: z.string().optional(),
  comments: z.string().optional(),
  rgpdConsent: z.boolean().refine(val => val === true, "Vous devez accepter le traitement des données personnelles")
});

type FormData = z.infer<typeof formSchema>;

const BusinessQuote = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const eventTypes = [
    "Congrès / Conférence",
    "Séminaire d'entreprise",
    "Salon professionnel",
    "Lancement de produit",
    "Soirée d'entreprise",
    "Team building",
    "Formation",
    "Assemblée générale",
    "Autre"
  ];

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://dlxaqkaivjkxtqyxswls.supabase.co/functions/v1/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'business',
          data: data
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi');
      }

      toast({
        title: "Demande envoyée !",
        description: "Votre demande de devis a été envoyée avec succès. Nous vous contacterons sous 24h.",
      });
      
      setIsSubmitted(true);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi. Veuillez réessayer.",
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
            <h2 className="text-2xl font-bold mb-4">Demande envoyée !</h2>
            <p className="text-muted-foreground mb-6">
              Votre demande de devis a été envoyée avec succès. Notre équipe commerciale va l'examiner et vous contacter sous 24h pour discuter de votre projet.
            </p>
            <Button onClick={() => window.location.href = "/"}>
              Retour à l'accueil
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Devis Entreprise | Événements Corporate Maroc | Heavent People Agency</title>
        <meta name="description" content="Demandez votre devis gratuit pour votre événement d'entreprise au Maroc. Staffing professionnel, hôtes et hôtesses pour congrès, salons, séminaires." />
        <meta name="keywords" content="devis entreprise Maroc, staffing événementiel, hôte hôtesse, événement corporate, congrès salon Maroc" />
        <meta property="og:title" content="Devis Entreprise | Heavent People Agency" />
        <meta property="og:description" content="Solutions professionnelles pour vos événements d'entreprise. Devis gratuit et personnalisé." />
        <link rel="canonical" href="https://heavent.ma/devis-entreprise" />
      </Helmet>
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/30 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-bold mb-4">
              Demande de Devis <span className="text-primary">Entreprise</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Obtenez un devis personnalisé pour votre événement d'entreprise
            </p>
          </div>

          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="mr-2" size={24} />
                Informations sur votre événement
              </CardTitle>
              <CardDescription>
                Renseignez les détails de votre projet pour recevoir un devis personnalisé
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Informations société */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Informations société</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyName">Nom de la société *</Label>
                      <Input
                        id="companyName"
                        {...register("companyName")}
                        className={errors.companyName ? "border-destructive" : ""}
                      />
                      {errors.companyName && (
                        <p className="text-sm text-destructive mt-1">{errors.companyName.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="sector">Secteur d'activité *</Label>
                      <Input
                        id="sector"
                        {...register("sector")}
                        className={errors.sector ? "border-destructive" : ""}
                      />
                      {errors.sector && (
                        <p className="text-sm text-destructive mt-1">{errors.sector.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Détails événement */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Calendar className="mr-2" size={20} />
                    Détails de l'événement
                  </h3>
                  <div>
                    <Label htmlFor="eventType">Type d'événement *</Label>
                    <Select onValueChange={(value) => setValue("eventType", value)}>
                      <SelectTrigger className={errors.eventType ? "border-destructive" : ""}>
                        <SelectValue placeholder="Sélectionner le type d'événement" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.eventType && (
                      <p className="text-sm text-destructive mt-1">{errors.eventType.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="eventDate">Date de l'événement *</Label>
                      <Input
                        id="eventDate"
                        type="date"
                        {...register("eventDate")}
                        className={errors.eventDate ? "border-destructive" : ""}
                      />
                      {errors.eventDate && (
                        <p className="text-sm text-destructive mt-1">{errors.eventDate.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="eventLocation">Lieu de l'événement *</Label>
                      <Select onValueChange={(value) => setValue("eventLocation", value)}>
                        <SelectTrigger className={errors.eventLocation ? "border-destructive" : ""}>
                          <SelectValue placeholder="Sélectionner la ville" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rabat">Rabat</SelectItem>
                          <SelectItem value="casablanca">Casablanca</SelectItem>
                          <SelectItem value="marrakech">Marrakech</SelectItem>
                          <SelectItem value="fes">Fès</SelectItem>
                          <SelectItem value="tanger">Tanger</SelectItem>
                          <SelectItem value="agadir">Agadir</SelectItem>
                          <SelectItem value="meknes">Meknès</SelectItem>
                          <SelectItem value="oujda">Oujda</SelectItem>
                          <SelectItem value="kenitra">Kénitra</SelectItem>
                          <SelectItem value="tetouan">Tétouan</SelectItem>
                          <SelectItem value="autre">Autre ville</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.eventLocation && (
                        <p className="text-sm text-destructive mt-1">{errors.eventLocation.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Personnel requis */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Users className="mr-2" size={20} />
                    Personnel requis
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="staffCount">Nombre d'hôtes/hôtesses *</Label>
                      <Input
                        id="staffCount"
                        type="number"
                        min="1"
                        max="100"
                        {...register("staffCount", { valueAsNumber: true })}
                        className={errors.staffCount ? "border-destructive" : ""}
                      />
                      {errors.staffCount && (
                        <p className="text-sm text-destructive mt-1">{errors.staffCount.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="budget">Budget estimé (optionnel)</Label>
                      <Select onValueChange={(value) => setValue("budget", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une fourchette" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="< 10000 MAD">Moins de 10 000 MAD</SelectItem>
                          <SelectItem value="10000-25000 MAD">10 000 MAD - 25 000 MAD</SelectItem>
                          <SelectItem value="25000-50000 MAD">25 000 MAD - 50 000 MAD</SelectItem>
                          <SelectItem value="50000-100000 MAD">50 000 MAD - 100 000 MAD</SelectItem>
                          <SelectItem value="> 100000 MAD">Plus de 100 000 MAD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="requirements">Critères et exigences spécifiques</Label>
                    <Textarea
                      id="requirements"
                      placeholder="Ex: profil recherché, compétences linguistiques, dress code, missions spécifiques..."
                      rows={4}
                      {...register("requirements")}
                    />
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Contact</h3>
                  <div>
                    <Label htmlFor="contactName">Nom du responsable *</Label>
                    <Input
                      id="contactName"
                      {...register("contactName")}
                      className={errors.contactName ? "border-destructive" : ""}
                    />
                    {errors.contactName && (
                      <p className="text-sm text-destructive mt-1">{errors.contactName.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactEmail">Email *</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        {...register("contactEmail")}
                        className={errors.contactEmail ? "border-destructive" : ""}
                      />
                      {errors.contactEmail && (
                        <p className="text-sm text-destructive mt-1">{errors.contactEmail.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="contactPhone">Téléphone *</Label>
                      <Input
                        id="contactPhone"
                        type="tel"
                        {...register("contactPhone")}
                        className={errors.contactPhone ? "border-destructive" : ""}
                      />
                      {errors.contactPhone && (
                        <p className="text-sm text-destructive mt-1">{errors.contactPhone.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="comments">Commentaires ou informations complémentaires</Label>
                    <Textarea
                      id="comments"
                      placeholder="Décrivez votre événement, vos attentes particulières, contraintes spécifiques..."
                      rows={4}
                      {...register("comments")}
                    />
                  </div>
                </div>

                {/* RGPD */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="rgpdConsent"
                    checked={watch("rgpdConsent") || false}
                    onCheckedChange={(checked) => setValue("rgpdConsent", checked as boolean)}
                    className={errors.rgpdConsent ? "border-destructive" : ""}
                  />
                  <Label htmlFor="rgpdConsent" className="text-sm leading-5">
                    J'accepte que mes données personnelles soient traitées conformément à la 
                    <a href="/politique-confidentialite" className="text-primary hover:underline ml-1">
                      politique de confidentialité
                    </a> 
                    et au RGPD. Ces données seront utilisées uniquement pour traiter ma demande de devis.
                  </Label>
                </div>
                {errors.rgpdConsent && (
                  <p className="text-sm text-destructive">{errors.rgpdConsent.message}</p>
                )}

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full gold-shadow"
                  size="lg"
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande de devis"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </div>
  );
};

export default BusinessQuote;