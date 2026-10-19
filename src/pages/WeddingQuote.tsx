import { suivre } from "@/lib/suivi";
import { FUNCTIONS_URL } from "@/integrations/supabase/client";
import Seo from "@/components/Seo";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Heart, Calendar, Users, CheckCircle, Sparkles } from "lucide-react";
import { useTexte } from "@/i18n/textes";

const formSchema = z.object({
  brideName: z.string().min(2, "Le prénom est requis"),
  groomName: z.string().min(2, "Le prénom est requis"),
  eventType: z.string().min(1, "Le type d'événement est requis"),
  eventDate: z.string().min(1, "La date de l'événement est requise"),
  eventLocation: z.string().min(2, "Le lieu de l'événement est requis"),
  guestCount: z.number().min(10, "Minimum 10 invités").max(500, "Maximum 500 invités"),
  budget: z.string().min(1, "Veuillez sélectionner une fourchette de budget"),
  services: z.array(z.string()).min(1, "Veuillez sélectionner au moins une prestation"),
  contactEmail: z.string().email("Email invalide"),
  contactPhone: z.string().min(10, "Numéro de téléphone invalide"),
  ceremonyLocation: z.string().optional(),
  receptionLocation: z.string().optional(),
  specialRequests: z.string().optional(),
  rgpdConsent: z.boolean().refine(val => val === true, "Vous devez accepter le traitement des données personnelles")
});

type FormData = z.infer<typeof formSchema>;

const WeddingQuote = () => {
  const x = useTexte();
  const { t } = useTranslation();
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
    resolver: zodResolver(formSchema),
    defaultValues: {
      services: [],
      eventType: ""
    }
  });

  const watchedServices = watch("services") || [];

  const availableServices = [
    { id: "dj", label: "DJ / Animation musicale", description: x("Ambiance musicale pour votre soirée") },
    { id: "decoration", label: "Décoration", description: x("Décoration florale et mise en scène") },
    { id: "photo", label: "Photographe", description: x("Capturer vos plus beaux moments") },
    { id: "video", label: "Vidéaste", description: x("Film de votre mariage") },
    { id: "catering", label: "Traiteur", description: x("Service de restauration") },
    { id: "transport", label: "Transport", description: x("Voiture de mariage, navettes invités") },
    { id: "ceremony", label: "Officiant de cérémonie", description: x("Cérémonie laïque personnalisée") },
    { id: "hostess", label: "Hôtes/Hôtesses d'accueil", description: x("Accueil et accompagnement des invités") },
    { id: "planning", label: "Wedding planner", description: x("Coordination complète de votre mariage") }
  ];

  const budgetRanges = [
    "Moins de 50 000 MAD",
    "50 000 MAD - 100 000 MAD",
    "100 000 MAD - 200 000 MAD",
    "200 000 MAD - 350 000 MAD",
    "350 000 MAD - 500 000 MAD",
    "Plus de 500 000 MAD"
  ];

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    const current = watchedServices;
    if (checked) {
      setValue("services", [...current, serviceId]);
    } else {
      setValue("services", current.filter(s => s !== serviceId));
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${FUNCTIONS_URL}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'wedding',
          data: data
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi');
      }
      suivre("demande", "devis-mariage");

      toast({
        title: x("Demande envoyée !"),
        description: x("Votre demande de devis a été envoyée avec succès. Nous vous contacterons sous 24h pour organiser un rendez-vous."),
      });
      
      setIsSubmitted(true);
    } catch (error) {
      toast({
        title: x("Erreur"),
        description: x("Une erreur est survenue lors de l'envoi. Veuillez réessayer."),
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
            <div className="flex justify-center mb-4">
              <div className="relative">
                <CheckCircle className="text-green-500" size={64} />
                <Heart className="absolute -top-2 -right-2 text-pink-500" size={24} />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">{x("Demande envoyée !")}</h2>
            <p className="text-muted-foreground mb-6">
              {x("Votre demande de devis événement a été envoyée avec succès. Notre équipe spécialisée va l'examiner et vous contacter sous 24h pour organiser un rendez-vous et discuter de votre projet en détail.")}
            </p>
            <Button onClick={() => window.location.href = "/"}>
              {x("Retour à l'accueil")}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Seo page="mariage" />
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/30 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-bold mb-4">
              {x("Demande de devis")} <span className="text-primary">{x("Événement")}</span>
            </h1>
            <p className="text-xl text-muted-foreground flex items-center justify-center">
              <Heart className="mr-2 text-pink-500" size={24} />
              {x("Créons ensemble l'événement de vos rêves")}
            </p>
          </div>

          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="mr-2" size={24} />
                  {t('wedding_quote.project_title')}
                </CardTitle>
                <CardDescription>
                  {t('wedding_quote.project_description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Informations des participants */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Heart className="mr-2 text-pink-500" size={20} />
                    {x("Vos informations")}
                  </h3>
                  
                  <div>
                    <Label htmlFor="eventType">{x("Type d'événement *")}</Label>
                    <Select onValueChange={(value) => setValue("eventType", value)}>
                      <SelectTrigger className={errors.eventType ? "border-destructive" : ""}>
                        <SelectValue placeholder={x("Sélectionner le type d'événement")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mariage">{x("Mariage")}</SelectItem>
                        <SelectItem value="anniversaire">{x("Anniversaire")}</SelectItem>
                        <SelectItem value="fiancailles">{x("Fiançailles")}</SelectItem>
                        <SelectItem value="bapteme">{x("Baptême")}</SelectItem>
                        <SelectItem value="communion">{x("Communion")}</SelectItem>
                        <SelectItem value="evg">{x("Enterrement de vie de garçon")}</SelectItem>
                        <SelectItem value="evf">{x("Enterrement de vie de jeune fille")}</SelectItem>
                        <SelectItem value="retraite">{x("Départ à la retraite")}</SelectItem>
                        <SelectItem value="graduation">{x("Remise de diplômes")}</SelectItem>
                        <SelectItem value="baby-shower">{x("Baby shower")}</SelectItem>
                        <SelectItem value="autre">{x("Autre événement")}</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.eventType && (
                      <p className="text-sm text-destructive mt-1">{x(String(errors.eventType.message ?? ""))}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="brideName">{x("Prénom principal *")}</Label>
                      <Input
                        id="brideName"
                        {...register("brideName")}
                        className={errors.brideName ? "border-destructive" : ""}
                        placeholder={x("Votre prénom")}
                      />
                      {errors.brideName && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.brideName.message ?? ""))}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="groomName">{x("Prénom du partenaire")}</Label>
                      <Input
                        id="groomName"
                        {...register("groomName")}
                        className={errors.groomName ? "border-destructive" : ""}
                        placeholder={x("Prénom du partenaire (optionnel)")}
                      />
                      {errors.groomName && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.groomName.message ?? ""))}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Détails de l'événement */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Calendar className="mr-2" size={20} />
                    {x("Détails de votre événement")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="eventDate">{x("Date de l'événement *")}</Label>
                      <Input
                        id="eventDate"
                        type="date"
                        {...register("eventDate")}
                        className={errors.eventDate ? "border-destructive" : ""}
                      />
                      {errors.eventDate && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.eventDate.message ?? ""))}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="guestCount">{x("Nombre d'invités *")}</Label>
                      <Input
                        id="guestCount"
                        type="number"
                        min="10"
                        max="500"
                        {...register("guestCount", { valueAsNumber: true })}
                        className={errors.guestCount ? "border-destructive" : ""}
                      />
                      {errors.guestCount && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.guestCount.message ?? ""))}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="eventLocation">{x("Lieu principal (ville/région) *")}</Label>
                    <Select onValueChange={(value) => setValue("eventLocation", value)}>
                      <SelectTrigger className={errors.eventLocation ? "border-destructive" : ""}>
                        <SelectValue placeholder={x("Sélectionner la ville principale")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rabat">{x("Rabat")}</SelectItem>
                        <SelectItem value="casablanca">{x("Casablanca")}</SelectItem>
                        <SelectItem value="marrakech">{x("Marrakech")}</SelectItem>
                        <SelectItem value="fes">{x("Fès")}</SelectItem>
                        <SelectItem value="tanger">{x("Tanger")}</SelectItem>
                        <SelectItem value="agadir">{x("Agadir")}</SelectItem>
                        <SelectItem value="meknes">{x("Meknès")}</SelectItem>
                        <SelectItem value="oujda">{x("Oujda")}</SelectItem>
                        <SelectItem value="kenitra">{x("Kénitra")}</SelectItem>
                        <SelectItem value="tetouan">{x("Tétouan")}</SelectItem>
                        <SelectItem value="autre">{x("Autre ville")}</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.eventLocation && (
                      <p className="text-sm text-destructive mt-1">{x(String(errors.eventLocation.message ?? ""))}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ceremonyLocation">{x("Lieu de cérémonie (optionnel)")}</Label>
                      <Input
                        id="ceremonyLocation"
                        placeholder={x("Église, mairie, lieu extérieur...")}
                        {...register("ceremonyLocation")}
                      />
                    </div>
                    <div>
                      <Label htmlFor="receptionLocation">{x("Lieu de réception (optionnel)")}</Label>
                      <Input
                        id="receptionLocation"
                        placeholder={x("Salle, château, restaurant...")}
                        {...register("receptionLocation")}
                      />
                    </div>
                  </div>
                </div>

                {/* Budget */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{x("Budget estimé")}</h3>
                  <div>
                    <Label htmlFor="budget">{x("Budget total pour les prestations *")}</Label>
                    <select
                      id="budget"
                      {...register("budget")}
                      className={`w-full p-3 border rounded-md ${errors.budget ? "border-destructive" : "border-input"}`}
                    >
                      <option value="">{x("Sélectionner une fourchette")}</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>{x(range)}</option>
                      ))}
                    </select>
                    {errors.budget && (
                      <p className="text-sm text-destructive mt-1">{x(String(errors.budget.message ?? ""))}</p>
                    )}
                  </div>
                </div>

                {/* Services */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Users className="mr-2" size={20} />
                    {x("Prestations souhaitées *")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {x("Sélectionnez toutes les prestations qui vous intéressent")}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availableServices.map((service) => (
                      <div key={service.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                        <Checkbox
                          id={service.id}
                          checked={watchedServices.includes(service.id)}
                          onCheckedChange={(checked) => 
                            handleServiceChange(service.id, checked as boolean)
                          }
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <Label htmlFor={service.id} className="font-medium cursor-pointer">
                            {x(service.label)}
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            {x(service.description)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.services && (
                    <p className="text-sm text-destructive">{x(String(errors.services.message ?? ""))}</p>
                  )}
                </div>

                {/* Contact */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{x("Contact")}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactEmail">{x("Email *")}</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        {...register("contactEmail")}
                        className={errors.contactEmail ? "border-destructive" : ""}
                      />
                      {errors.contactEmail && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.contactEmail.message ?? ""))}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="contactPhone">{x("Téléphone *")}</Label>
                      <Input
                        id="contactPhone"
                        type="tel"
                        {...register("contactPhone")}
                        className={errors.contactPhone ? "border-destructive" : ""}
                      />
                      {errors.contactPhone && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.contactPhone.message ?? ""))}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="specialRequests">{x("Demandes spéciales ou informations complémentaires")}</Label>
                    <Textarea
                      id="specialRequests"
                      placeholder={x("Décrivez vos souhaits particuliers, le style d'événement envisagé, contraintes spécifiques, inspirations...")}
                      rows={4}
                      {...register("specialRequests")}
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
                    {x("J'accepte que mes données personnelles soient traitées conformément à la")} 
                    <a href="/politique-confidentialite" className="text-primary hover:underline ml-1">
                      {x("politique de confidentialité")}
                    </a> 
                    {x("et au RGPD. Ces données seront utilisées uniquement pour traiter ma demande de devis événement.")}
                  </Label>
                </div>
                {errors.rgpdConsent && (
                  <p className="text-sm text-destructive">{x(String(errors.rgpdConsent.message ?? ""))}</p>
                )}

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full gold-shadow"
                  size="lg"
                >
                  {isSubmitting ? x("Envoi en cours...") : x("Envoyer ma demande de devis")}
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

export default WeddingQuote;