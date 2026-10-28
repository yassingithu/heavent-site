import Seo from "@/components/Seo";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { FileUpload } from "@/components/ui/file-upload";
import { toast, useToast } from "@/hooks/use-toast";
import { CheckCircle, User, Ruler, Calendar, Upload, Lock } from "lucide-react";
import { ParcoursInscription, Confettis } from "@/components/inscription/ParcoursInscription";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useTexte } from "@/i18n/textes";

const LANGUES = ["Arabe", "Darija", "Amazigh", "Français", "Anglais", "Espagnol", "Allemand", "Italien", "Portugais", "Chinois", "Russe", "Turc"];

const formSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  confirmPassword: z.string(),
  telephone: z.string().regex(/^(\+\d{1,4}\d{8,15}|00\d{1,4}\d{8,15})$/, "Le téléphone doit commencer par un indicatif pays (ex: +212, +32, +33, 00212, 0032)"),
  age: z.string().min(1, "L'âge est requis"),
  genre: z.string().min(1, "Le genre est requis"),
  ville: z.string().min(1, "La ville est requise"),
  taille: z.string().min(1, "La taille est requise"),
  taille_pantalon: z.string().min(1, "La taille de pantalon est requise"),
  taille_haut: z.string().min(1, "La taille de haut est requise"),
  pointure: z.string().min(1, "La pointure est requise"),
  taille_confection: z.string().min(1, "La taille de confection est requise"),
  couleur_cheveux: z.string().min(1, "La couleur des cheveux est requise"),
  couleur_yeux: z.string().min(1, "La couleur des yeux est requise"),
  competences: z.string().min(1, "Les compétences sont requises"),
  langues: z.string().min(1, "Les langues parlées sont requises"),
  experience: z.string().min(10, "L'expérience doit être détaillée (minimum 10 caractères)"),
  availability: z.array(z.string()).min(1, "Sélectionnez au moins un jour de disponibilité"),
  permis: z.boolean(),
  // Champs pour contrat de travail
  adresse_complete: z.string().min(10, "L'adresse complète est requise"),
  code_postal: z.string().min(4, "Le code postal est requis"),
  nationalite: z.string().min(1, "La nationalité est requise"),
  date_naissance: z.coerce.date({ invalid_type_error: "La date de naissance est requise", required_error: "La date de naissance est requise" })
    .refine((d) => { const a = (Date.now() - d.getTime()) / 31557600000; return a >= 16 && a <= 80; }, "Vérifiez la date de naissance"),
  lieu_naissance: z.string().min(1, "Le lieu de naissance est requis"),
  situation_familiale: z.string().min(1, "La situation familiale est requise"),
  numero_identite: z.string().min(5, "Le numéro d'identité est requis"),
  numero_securite_sociale: z.string().optional(),
  iban: z.string().optional(),
  niveau_etudes: z.string().min(1, "Le niveau d'études est requis"),
  nom_urgence: z.string().min(2, "Nom de contact d'urgence requis"),
  telephone_urgence: z.string().regex(/^(\+\d{1,4}\d{8,15}|00\d{1,4}\d{8,15})$/, "Téléphone d'urgence avec indicatif pays requis (ex: +212, 00212)"),
  photoPortrait: z.string().optional(),
  photoPleinPied: z.string().optional(),
  carteIdentite: z.string().optional(),
  rgpdConsent: z.boolean().refine(val => val === true, "Vous devez accepter les conditions RGPD"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>;

const StaffRegistration = () => {
  const x = useTexte();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Nouvelle étape : on remonte en haut pour voir la progression et les nouvelles questions
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [step]);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Récupérer les données sauvegardées du localStorage si elles existent
  const getSavedFormData = () => {
    try {
      const saved = localStorage.getItem('staffRegistrationData');
      const d = saved ? JSON.parse(saved) : {};
      if (d.date_naissance) d.date_naissance = String(d.date_naissance).slice(0, 10);
      return d;
    } catch {
      return {};
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      availability: [],
      permis: false,
      rgpdConsent: false,
      password: "",
      confirmPassword: "",
      ...getSavedFormData(), // Restaurer les données sauvegardées
    }
  });

  // Sauvegarder les données du formulaire dans localStorage à chaque changement
  const saveFormData = () => {
    const currentData = getValues();
    try {
      localStorage.setItem('staffRegistrationData', JSON.stringify({
        ...currentData,
        password: "", // Ne pas sauvegarder les mots de passe
        confirmPassword: ""
      }));
    } catch (error) {
      console.error('Erreur sauvegarde localStorage:', error);
    }
  };

  // Sauvegarder automatiquement les données avant de changer d'étape
  const handleNextStepWithSave = () => {
    saveFormData();
    handleNextStep();
  };

  const handlePrevStepWithSave = () => {
    saveFormData();
    prevStep();
  };

  const watchedAvailability = watch("availability") || [];

  const daysOfWeek = [
    "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"
  ];

  const handleAvailabilityChange = (day: string, checked: boolean) => {
    const current = watchedAvailability;
    if (checked) {
      setValue("availability", [...current, day]);
    } else {
      setValue("availability", current.filter(d => d !== day));
    }
  };

  const onSubmit = async (data: FormData) => {
    console.log("=== DEBUT SOUMISSION FORMULAIRE ===");
    console.log("Form submitted with data:", data);
    console.log("Current step:", step);
    console.log("Photos uploaded:", data.photoPortrait, data.photoPleinPied);
    console.log("Identity uploaded:", data.carteIdentite);
    setIsSubmitting(true);
    
    try {
      // Création du compte + fiche côté serveur (compte directement actif, pas d'email de confirmation à attendre)
      const { data: rep, error } = await supabase.functions.invoke("inscription-staff", {
        body: { ...data, email: data.email.trim().toLowerCase(), date_naissance: format(new Date(data.date_naissance), "yyyy-MM-dd") },
      });
      if (error || rep?.error) {
        let message = rep?.error as string | undefined;
        try { message = message ?? (await (error as any)?.context?.json())?.error; } catch { /* réponse illisible */ }
        throw new Error(message ?? "Le serveur n'a pas répondu. Vérifiez votre connexion et réessayez.");
      }

      localStorage.removeItem('staffRegistrationData');
      // Connexion automatique à l'espace staff
      await supabase.auth.signInWithPassword({ email: data.email.trim().toLowerCase(), password: data.password });

      toast({ title: x("Inscription réussie !"), description: x("Votre espace staff est prêt.") });
      setStep(6);

    } catch (error: any) {
      console.error('❌ Erreur inscription:', error);
      
      let errorMessage = x("Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
      
      // Messages d'erreur spécifiques et utiles
      if (error.message.includes("already registered") || error.message.includes("existe déjà")) {
        errorMessage = x("Un compte avec cet email existe déjà. Essayez de vous connecter ou utilisez un autre email.");
      } else if (error.message.includes("Password")) {
        errorMessage = x("Le mot de passe doit contenir au moins 8 caractères avec des lettres et des chiffres.");
      } else if (error.message.includes("Email")) {
        errorMessage = x("L'adresse email n'est pas valide. Vérifiez le format.");
      } else if (error.message.includes("Network")) {
        errorMessage = x("Problème de connexion. Vérifiez votre connexion internet et réessayez.");
      } else if (error.message) {
        errorMessage = x(error.message);
      }
      
      toast({
        title: x("Erreur d'inscription"),
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Formulaire refusé : on dit quoi corriger et on revient à l'étape concernée (avant, le bouton ne faisait rien)
  const ETAPE_DU_CHAMP: Record<string, number> = {
    nom: 1, prenom: 1, age: 1, genre: 1, ville: 1, telephone: 1, email: 1,
    adresse_complete: 2, code_postal: 2, nationalite: 2, date_naissance: 2, lieu_naissance: 2, situation_familiale: 2, numero_identite: 2, niveau_etudes: 2, nom_urgence: 2, telephone_urgence: 2, numero_securite_sociale: 2, iban: 2,
    taille: 3, taille_pantalon: 3, taille_haut: 3, pointure: 3, taille_confection: 3, couleur_cheveux: 3, couleur_yeux: 3, competences: 3, langues: 3, experience: 3,
    availability: 4, photoPortrait: 4, photoPleinPied: 4, carteIdentite: 4,
    password: 5, confirmPassword: 5, rgpdConsent: 5,
  };
  const onInvalid = (errs: Record<string, any>) => {
    const champs = Object.keys(errs);
    const etape = Math.min(...champs.map((c) => ETAPE_DU_CHAMP[c] ?? 5));
    setStep(etape);
    toast({
      title: x("Il manque des informations"),
      description: champs.map((c) => errs[c]?.message).filter(Boolean).slice(0, 4).map((m) => x(String(m))).join(" · ") || x("Vérifiez les champs en rouge."),
      variant: "destructive",
    });
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 6));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  // Fonction pour valider et passer à l'étape suivante
  const handleNextStep = async () => {
    // Définir les champs requis pour chaque étape
    const stepFields: Record<number, (keyof FormData)[]> = {
      1: ['nom', 'prenom', 'age', 'genre', 'ville', 'telephone', 'email'],
      2: ['adresse_complete', 'code_postal', 'nationalite', 'date_naissance', 'lieu_naissance', 'situation_familiale', 'numero_identite', 'niveau_etudes', 'nom_urgence', 'telephone_urgence'],
      3: ['taille', 'taille_pantalon', 'taille_haut', 'pointure', 'taille_confection', 'couleur_cheveux', 'couleur_yeux', 'competences', 'langues', 'experience'],
      4: ['availability'],
      5: ['password', 'confirmPassword', 'rgpdConsent']
    };

    const currentStepFields = stepFields[step] || [];
    
    // Utiliser la validation native du formulaire react-hook-form
    const formData = watch();
    const missingFields: string[] = [];
    
    for (const field of currentStepFields) {
      const value = formData[field];
      
      // Validation spéciale pour availability (array)
      if (field === 'availability') {
        if (!Array.isArray(value) || value.length === 0) {
          missingFields.push('disponibilités');
        }
        continue;
      }
      
      // Validation spéciale pour rgpdConsent
      if (field === 'rgpdConsent') {
        if (value !== true) {
          missingFields.push('conditions RGPD');
        }
        continue;
      }
      
      // Validation spéciale pour confirmPassword
      if (field === 'confirmPassword') {
        const password = formData.password;
        if (!value || value !== password || value.length < 8) {
          missingFields.push('confirmation du mot de passe');
        }
        continue;
      }
      
      // Validation générale pour les autres champs
      if (!value || (typeof value === 'string' && value.trim().length === 0)) {
        missingFields.push(field);
      }
    }
    
    if (missingFields.length > 0) {
      console.log('Champs manquants:', missingFields);
      console.log('Données actuelles du formulaire:', formData);
      toast({
        title: x("Champs manquants"),
        description: x("Veuillez remplir : {champs}", { champs: missingFields.map((c) => x(c)).join(", ") }),
        variant: "destructive",
      });
      return;
    }
    
    nextStep();
  };

  // Progression « en direct » : se remplit à chaque réponse donnée
  const valeurs = watch();
  const CHAMPS_OBLIGATOIRES = ['nom', 'prenom', 'age', 'genre', 'ville', 'telephone', 'email', 'adresse_complete', 'code_postal', 'nationalite',
    'date_naissance', 'lieu_naissance', 'situation_familiale', 'numero_identite', 'niveau_etudes', 'nom_urgence', 'telephone_urgence', 'taille',
    'taille_pantalon', 'taille_haut', 'pointure', 'taille_confection', 'couleur_cheveux', 'couleur_yeux', 'competences', 'langues', 'experience',
    'availability', 'password', 'confirmPassword', 'rgpdConsent'] as const;
  const champsRemplis = CHAMPS_OBLIGATOIRES.filter((c) => {
    const v = (valeurs as any)[c];
    return Array.isArray(v) ? v.length > 0 : typeof v === "boolean" ? v : v != null && String(v).trim() !== "";
  }).length;

  if (step === 6) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-accent/30 flex items-center justify-center py-12">
        <Card className="max-w-md mx-4 text-center">
          <CardContent className="p-8">
            <Confettis />
            <div className="text-6xl mb-3" aria-hidden>🏆</div>
            <div className="inline-block text-xs uppercase tracking-widest bg-primary/15 text-primary font-semibold rounded-full px-3 py-1 mb-3">{x("Badge débloqué · Membre de la team Heavent")}</div>
            <h2 className="text-2xl font-bold mb-4">{x("Bienvenue dans l'équipe !")}</h2>
            <p className="text-muted-foreground mb-6">
              {x("Votre compte est créé et déjà actif. Vous pouvez dès maintenant indiquer vos disponibilités dans votre espace staff. Un email de bienvenue vous a été envoyé.")}
            </p>
            <div className="space-y-3">
              <Button onClick={() => navigate("/staff-dashboard")} className="w-full">
                {x("Accéder à mon espace staff")}
              </Button>
              <Button variant="outline" onClick={() => navigate("/")} className="w-full">
                {x("Retour à l'accueil")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/30 py-12">
      <div className="container mx-auto px-4">
        <Seo page="inscription" />
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-bold mb-4">
              {x("Inscription")} <span className="text-primary">{x("Hôtes & Hôtesses")}</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              {x("Rejoins la team et participe à des événements prestigieux — 5 petites étapes, environ 7 minutes ⏱️")}
            </p>
          </div>

          <ParcoursInscription etape={Math.min(step, 5)} remplis={champsRemplis} total={CHAMPS_OBLIGATOIRES.length} />

          <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
            {step === 1 && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2" size={24} />
                    {x("Informations personnelles")}
                  </CardTitle>
                  <CardDescription>
                    {x("Renseignez vos informations de base")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="prenom">{x("Prénom *")}</Label>
                      <Input
                        id="prenom"
                        {...register("prenom")}
                        className={errors.prenom ? "border-destructive" : ""}
                      />
                      {errors.prenom && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.prenom.message ?? ""))}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="nom">{x("Nom *")}</Label>
                      <Input
                        id="nom"
                        {...register("nom")}
                        className={errors.nom ? "border-destructive" : ""}
                      />
                      {errors.nom && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.nom.message ?? ""))}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="age">{x("Âge *")}</Label>
                      <Input
                        id="age"
                        {...register("age")}
                        className={errors.age ? "border-destructive" : ""}
                      />
                      {errors.age && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.age.message ?? ""))}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="genre">{x("Genre *")}</Label>
                      <Select onValueChange={(value) => setValue("genre", value)} value={watch("genre") || ""}>
                        <SelectTrigger className={errors.genre ? "border-destructive" : ""}>
                          <SelectValue placeholder={x("Sélectionner")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="homme">{x("Homme")}</SelectItem>
                          <SelectItem value="femme">{x("Femme")}</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.genre && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.genre.message ?? ""))}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ville">{x("Ville *")}</Label>
                      <Select onValueChange={(value) => setValue("ville", value)} value={watch("ville") || ""}>
                        <SelectTrigger className={errors.ville ? "border-destructive" : ""}>
                          <SelectValue placeholder={x("Sélectionner votre ville")} />
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
                          <SelectItem value="safi">{x("Safi")}</SelectItem>
                          <SelectItem value="mohammedia">{x("Mohammedia")}</SelectItem>
                          <SelectItem value="autre">{x("Autre ville")}</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.ville && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.ville.message ?? ""))}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="telephone">{x("Téléphone *")}</Label>
                      <Input
                        id="telephone"
                        type="tel"
                        placeholder={x("+212612345678 (avec indicatif pays)")}
                        {...register("telephone")}
                        className={errors.telephone ? "border-destructive" : ""}
                      />
                      {errors.telephone && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.telephone.message ?? ""))}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">{x("Email *")}</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{x(String(errors.email.message ?? ""))}</p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Button type="button" onClick={handleNextStep}>
                      {x("Continuer")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lock className="mr-2" size={24} />
                    {x("Informations administratives")}
                  </CardTitle>
                  <CardDescription>
                    {x("Données nécessaires pour votre contrat de travail")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="adresse_complete">{x("Adresse complète *")}</Label>
                      <Textarea
                        id="adresse_complete"
                        placeholder={x("Rue, numéro, quartier...")}
                        rows={3}
                        {...register("adresse_complete")}
                        className={errors.adresse_complete ? "border-destructive" : ""}
                      />
                      {errors.adresse_complete && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.adresse_complete.message ?? ""))}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="code_postal">{x("Code postal *")}</Label>
                      <Input
                        id="code_postal"
                        {...register("code_postal")}
                        className={errors.code_postal ? "border-destructive" : ""}
                      />
                      {errors.code_postal && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.code_postal.message ?? ""))}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nationalite">{x("Nationalité *")}</Label>
                      <Select onValueChange={(value) => setValue("nationalite", value)} value={watch("nationalite") || ""}>
                        <SelectTrigger className={errors.nationalite ? "border-destructive" : ""}>
                          <SelectValue placeholder={x("Sélectionner")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="marocaine">{x("Marocaine")}</SelectItem>
                          <SelectItem value="francaise">{x("Française")}</SelectItem>
                          <SelectItem value="belge">{x("Belge")}</SelectItem>
                          <SelectItem value="algerienne">{x("Algérienne")}</SelectItem>
                          <SelectItem value="tunisienne">{x("Tunisienne")}</SelectItem>
                          <SelectItem value="autre">{x("Autre")}</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.nationalite && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.nationalite.message ?? ""))}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lieu_naissance">{x("Lieu de naissance *")}</Label>
                      <Input
                        id="lieu_naissance"
                        {...register("lieu_naissance")}
                        className={errors.lieu_naissance ? "border-destructive" : ""}
                      />
                      {errors.lieu_naissance && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.lieu_naissance.message ?? ""))}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="date_naissance">{x("Date de naissance *")}</Label>
                    <Input
                      id="date_naissance"
                      type="date"
                      max={new Date().toISOString().slice(0, 10)}
                      {...register("date_naissance")}
                      className={`max-w-[220px] ${errors.date_naissance ? "border-destructive" : ""}`}
                    />
                    {errors.date_naissance && (
                      <p className="text-sm text-destructive mt-1">{errors.date_naissance.message as string}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="situation_familiale">{x("Situation familiale *")}</Label>
                      <Select onValueChange={(value) => setValue("situation_familiale", value)} value={watch("situation_familiale") || ""}>
                        <SelectTrigger className={errors.situation_familiale ? "border-destructive" : ""}>
                          <SelectValue placeholder={x("Sélectionner")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="celibataire">{x("Célibataire")}</SelectItem>
                          <SelectItem value="marie">{x("Marié(e)")}</SelectItem>
                          <SelectItem value="divorce">{x("Divorcé(e)")}</SelectItem>
                          <SelectItem value="veuf">{x("Veuf/Veuve")}</SelectItem>
                          <SelectItem value="pacs">{x("PACS")}</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.situation_familiale && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.situation_familiale.message ?? ""))}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="niveau_etudes">{x("Niveau d'études *")}</Label>
                      <Select onValueChange={(value) => setValue("niveau_etudes", value)} value={watch("niveau_etudes") || ""}>
                        <SelectTrigger className={errors.niveau_etudes ? "border-destructive" : ""}>
                          <SelectValue placeholder={x("Sélectionner")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sans_diplome">{x("Sans diplôme")}</SelectItem>
                          <SelectItem value="bac">{x("Baccalauréat")}</SelectItem>
                          <SelectItem value="bac_plus_2">{x("Bac+2")}</SelectItem>
                          <SelectItem value="bac_plus_3">{x("Bac+3 (Licence)")}</SelectItem>
                          <SelectItem value="bac_plus_5">{x("Bac+5 (Master)")}</SelectItem>
                          <SelectItem value="doctorat">{x("Doctorat")}</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.niveau_etudes && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.niveau_etudes.message ?? ""))}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="numero_identite">{x("Numéro d'identité *")}</Label>
                      <Input
                        id="numero_identite"
                        placeholder={x("CIN, Passeport...")}
                        {...register("numero_identite")}
                        className={errors.numero_identite ? "border-destructive" : ""}
                      />
                      {errors.numero_identite && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.numero_identite.message ?? ""))}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="numero_securite_sociale">{x("N° Sécurité sociale")}</Label>
                      <Input
                        id="numero_securite_sociale"
                        placeholder="Optionnel"
                        {...register("numero_securite_sociale")}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nom_urgence">{x("Contact d'urgence (nom) *")}</Label>
                      <Input
                        id="nom_urgence"
                        {...register("nom_urgence")}
                        className={errors.nom_urgence ? "border-destructive" : ""}
                      />
                      {errors.nom_urgence && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.nom_urgence.message ?? ""))}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="telephone_urgence">{x("Téléphone d'urgence *")}</Label>
                      <Input
                        id="telephone_urgence"
                        type="tel"
                        placeholder="+212612345678"
                        {...register("telephone_urgence")}
                        className={errors.telephone_urgence ? "border-destructive" : ""}
                      />
                      {errors.telephone_urgence && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.telephone_urgence.message ?? ""))}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="iban">{x("IBAN (compte bancaire)")}</Label>
                    <Input
                      id="iban"
                      placeholder={x("MA64 011519 000000 013040 10003 82 (optionnel)")}
                      {...register("iban")}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {x("Nécessaire pour le versement des salaires")}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={handlePrevStepWithSave}>
                      {x("Précédent")}
                    </Button>
                    <Button type="button" onClick={handleNextStepWithSave}>
                      {x("Continuer")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Ruler className="mr-2" size={24} />
                    {x("Mensurations & Expérience")}
                  </CardTitle>
                  <CardDescription>
                    {x("Informations complémentaires et expérience professionnelle")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="taille">{x("Taille (cm) *")}</Label>
                      <Input
                        id="taille"
                        {...register("taille")}
                        className={errors.taille ? "border-destructive" : ""}
                      />
                      {errors.taille && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.taille.message ?? ""))}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="taille_pantalon">{x("Taille pantalon *")}</Label>
                      <Select onValueChange={(value) => setValue("taille_pantalon", value)} value={watch("taille_pantalon") || ""}>
                        <SelectTrigger className={errors.taille_pantalon ? "border-destructive" : ""}>
                          <SelectValue placeholder={x("Ex: 38, 40, 42")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="34">34</SelectItem>
                          <SelectItem value="36">36</SelectItem>
                          <SelectItem value="38">38</SelectItem>
                          <SelectItem value="40">40</SelectItem>
                          <SelectItem value="42">42</SelectItem>
                          <SelectItem value="44">44</SelectItem>
                          <SelectItem value="46">46</SelectItem>
                          <SelectItem value="48">48</SelectItem>
                          <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.taille_pantalon && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.taille_pantalon.message ?? ""))}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="taille_haut">{x("Taille haut *")}</Label>
                      <Select onValueChange={(value) => setValue("taille_haut", value)} value={watch("taille_haut") || ""}>
                        <SelectTrigger className={errors.taille_haut ? "border-destructive" : ""}>
                          <SelectValue placeholder={x("Ex: S, M, L")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="XS">{x("XS")}</SelectItem>
                          <SelectItem value="S">{x("S")}</SelectItem>
                          <SelectItem value="M">{x("M")}</SelectItem>
                          <SelectItem value="L">{x("L")}</SelectItem>
                          <SelectItem value="XL">{x("XL")}</SelectItem>
                          <SelectItem value="XXL">{x("XXL")}</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.taille_haut && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.taille_haut.message ?? ""))}</p>
                      )}
                     </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div>
                       <Label htmlFor="pointure">{x("Pointure chaussures *")}</Label>
                        <Select onValueChange={(value) => setValue("pointure", value)} value={watch("pointure") || ""}>
                          <SelectTrigger className={errors.pointure ? "border-destructive" : ""}>
                            <SelectValue placeholder={x("Ex: 39, 42")} />
                         </SelectTrigger>
                         <SelectContent>
                           <SelectItem value="35">35</SelectItem>
                           <SelectItem value="36">36</SelectItem>
                           <SelectItem value="37">37</SelectItem>
                           <SelectItem value="38">38</SelectItem>
                           <SelectItem value="39">39</SelectItem>
                           <SelectItem value="40">40</SelectItem>
                           <SelectItem value="41">41</SelectItem>
                           <SelectItem value="42">42</SelectItem>
                           <SelectItem value="43">43</SelectItem>
                           <SelectItem value="44">44</SelectItem>
                           <SelectItem value="45">45</SelectItem>
                           <SelectItem value="46">46</SelectItem>
                         </SelectContent>
                       </Select>
                       {errors.pointure && (
                         <p className="text-sm text-destructive mt-1">{x(String(errors.pointure.message ?? ""))}</p>
                       )}
                     </div>
                     <div>
                       <Label htmlFor="taille_confection">{x("Taille confection *")}</Label>
                        <Select onValueChange={(value) => setValue("taille_confection", value)} value={watch("taille_confection") || ""}>
                          <SelectTrigger className={errors.taille_confection ? "border-destructive" : ""}>
                            <SelectValue placeholder={x("Ex: S, M, L")} />
                         </SelectTrigger>
                         <SelectContent>
                           <SelectItem value="XS">{x("XS")}</SelectItem>
                           <SelectItem value="S">{x("S")}</SelectItem>
                           <SelectItem value="M">{x("M")}</SelectItem>
                           <SelectItem value="L">{x("L")}</SelectItem>
                           <SelectItem value="XL">{x("XL")}</SelectItem>
                           <SelectItem value="XXL">{x("XXL")}</SelectItem>
                         </SelectContent>
                       </Select>
                       {errors.taille_confection && (
                         <p className="text-sm text-destructive mt-1">{x(String(errors.taille_confection.message ?? ""))}</p>
                       )}
                     </div>
                   </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="couleur_cheveux">{x("Couleur cheveux *")}</Label>
                      <Select onValueChange={(value) => setValue("couleur_cheveux", value)} value={watch("couleur_cheveux") || ""}>
                        <SelectTrigger className={errors.couleur_cheveux ? "border-destructive" : ""}>
                          <SelectValue placeholder={x("Sélectionner")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="châtain">{x("Châtain")}</SelectItem>
                          <SelectItem value="blond">{x("Blond")}</SelectItem>
                          <SelectItem value="brun">{x("Brun")}</SelectItem>
                          <SelectItem value="noir">{x("Noir")}</SelectItem>
                          <SelectItem value="roux">{x("Roux")}</SelectItem>
                          <SelectItem value="gris">{x("Gris")}</SelectItem>
                          <SelectItem value="blanc">{x("Blanc")}</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.couleur_cheveux && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.couleur_cheveux.message ?? ""))}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="couleur_yeux">{x("Couleur yeux *")}</Label>
                      <Select onValueChange={(value) => setValue("couleur_yeux", value)} value={watch("couleur_yeux") || ""}>
                        <SelectTrigger className={errors.couleur_yeux ? "border-destructive" : ""}>
                          <SelectValue placeholder={x("Sélectionner")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="marron">{x("Marron")}</SelectItem>
                          <SelectItem value="bleu">{x("Bleu")}</SelectItem>
                          <SelectItem value="vert">{x("Vert")}</SelectItem>
                          <SelectItem value="noisette">{x("Noisette")}</SelectItem>
                          <SelectItem value="gris">{x("Gris")}</SelectItem>
                          <SelectItem value="noir">{x("Noir")}</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.couleur_yeux && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.couleur_yeux.message ?? ""))}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="competences">{x("Compétences spécifiques *")}</Label>
                      <Textarea
                        id="competences"
                        placeholder={x("Ex: Langues, informatique, animation, service...")}
                        rows={3}
                        {...register("competences")}
                        className={errors.competences ? "border-destructive" : ""}
                      />
                      {errors.competences && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.competences.message ?? ""))}</p>
                      )}
                    </div>
                    <div>
                      <Label>Langues parlées * <span className="text-muted-foreground font-normal">{x("(coche tout ce que tu parles)")}</span></Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {LANGUES.map((langue) => {
                          const choisies = (watch("langues") || "").split(",").map((l) => l.trim()).filter(Boolean);
                          const coche = choisies.includes(langue);
                          return (
                            <label key={langue} className="flex items-center gap-2 text-sm cursor-pointer">
                              <Checkbox
                                checked={coche}
                                onCheckedChange={(v) => {
                                  const suivantes = v ? [...choisies, langue] : choisies.filter((l) => l !== langue);
                                  setValue("langues", LANGUES.filter((l) => suivantes.includes(l)).concat(suivantes.filter((l) => !LANGUES.includes(l))).join(", "), { shouldValidate: true });
                                }}
                              />
                              {x(langue)}
                            </label>
                          );
                        })}
                      </div>
                      <Input
                        className="mt-2"
                        placeholder={x("Autre langue (facultatif)")}
                        onBlur={(e) => {
                          const autre = e.target.value.trim();
                          if (!autre) return;
                          const choisies = (watch("langues") || "").split(",").map((l) => l.trim()).filter(Boolean);
                          if (!choisies.includes(autre)) setValue("langues", [...choisies, autre].join(", "), { shouldValidate: true });
                          e.target.value = "";
                        }}
                      />
                      {errors.langues && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.langues.message ?? ""))}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="permis"
                      checked={watch("permis") || false}
                      onCheckedChange={(checked) => setValue("permis", checked as boolean)}
                    />
                    <Label htmlFor="permis">{x("J'ai le permis de conduire")}</Label>
                  </div>

                  <div>
                    <Label htmlFor="experience">{x("Expérience professionnelle *")}</Label>
                    <Textarea
                      id="experience"
                      placeholder={x("Décrivez votre expérience dans l'événementiel, l'accueil, ou domaines connexes...")}
                      rows={6}
                      {...register("experience")}
                      className={errors.experience ? "border-destructive" : ""}
                    />
                    {errors.experience && (
                      <p className="text-sm text-destructive mt-1">{x(String(errors.experience.message ?? ""))}</p>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={handlePrevStepWithSave}>
                      {x("Précédent")}
                    </Button>
                    <Button type="button" onClick={handleNextStepWithSave}>
                      {x("Continuer")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 4 && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2" size={24} />
                    {x("Disponibilités & Documents")}
                  </CardTitle>
                  <CardDescription>
                    {x("Dernières informations pour finaliser votre inscription")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-base font-semibold mb-4 block">
                      {x("Disponibilités dans la semaine *")}
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {daysOfWeek.map((day) => (
                        <div key={day} className="flex items-center space-x-2">
                          <Checkbox
                            id={day}
                            checked={watchedAvailability.includes(day)}
                            onCheckedChange={(checked) => 
                              handleAvailabilityChange(day, checked as boolean)
                            }
                          />
                          <Label htmlFor={day} className="text-sm">{x(day)}</Label>
                        </div>
                      ))}
                    </div>
                    {errors.availability && (
                      <p className="text-sm text-destructive mt-2">{x(String(errors.availability.message ?? ""))}</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base font-semibold">{x("Documents à télécharger")}</Label>
                    <div className="grid gap-4">
                      <FileUpload
                        label={x("Photo portrait")}
                        bucket="photos"
                        onFileUploaded={(fileName) => setValue('photoPortrait', fileName)}
                        uploadedFile={watch('photoPortrait')}
                      />
                      <FileUpload
                        label={x("Photo plein pied")}
                        bucket="photos"
                        onFileUploaded={(fileName) => setValue('photoPleinPied', fileName)}
                        uploadedFile={watch('photoPleinPied')}
                      />
                      <FileUpload
                        label={x("Carte d'identité (recto/verso)")}
                        bucket="identites"
                        onFileUploaded={(fileName) => setValue('carteIdentite', fileName)}
                        uploadedFile={watch('carteIdentite')}
                      />
                    </div>
                  </div>


                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={handlePrevStepWithSave}>
                      {x("Précédent")}
                    </Button>
                    <Button type="button" onClick={handleNextStepWithSave}>
                      {x("Continuer")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 5 && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lock className="mr-2" size={24} />
                    {x("Création de votre compte")}
                  </CardTitle>
                  <CardDescription>
                    {x("Choisissez votre mot de passe pour finaliser votre inscription")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="password">{x("Mot de passe *")}</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        {...register("password")}
                        className={errors.password ? "border-destructive" : ""}
                      />
                      {errors.password && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.password.message ?? ""))}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {x("Minimum 6 caractères")}
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="confirmPassword">{x("Confirmer le mot de passe *")}</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        {...register("confirmPassword")}
                        className={errors.confirmPassword ? "border-destructive" : ""}
                      />
                      {errors.confirmPassword && (
                        <p className="text-sm text-destructive mt-1">{x(String(errors.confirmPassword.message ?? ""))}</p>
                      )}
                    </div>
                  </div>

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
                      {x("et au RGPD. Ces données seront utilisées uniquement dans le cadre de ma candidature.")}
                    </Label>
                  </div>
                  {errors.rgpdConsent && (
                    <p className="text-sm text-destructive">{x(String(errors.rgpdConsent.message ?? ""))}</p>
                  )}

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={handlePrevStepWithSave}>
                      {x("Précédent")}
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="gold-shadow"
                      onClick={(e) => {
                        console.log("=== BOUTON CLIC ===");
                        console.log("Button clicked, form valid:", Object.keys(errors).length === 0);
                        console.log("Form errors:", errors);
                        console.log("RGPD consent:", watch("rgpdConsent"));
                        if (!watch("rgpdConsent")) {
                          console.log("ERREUR: RGPD non accepté");
                          e.preventDefault();
                        }
                      }}
                    >
                      {isSubmitting ? x("Création du compte...") : x("Créer mon compte")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default StaffRegistration;