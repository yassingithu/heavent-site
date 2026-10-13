import React, { useState } from "react";
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
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const formSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
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
  date_naissance: z.date(),
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
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Récupérer les données sauvegardées du localStorage si elles existent
  const getSavedFormData = () => {
    try {
      const saved = localStorage.getItem('staffRegistrationData');
      return saved ? JSON.parse(saved) : {};
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
      date_naissance: new Date(),
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
      console.log("🔐 Vérification si l'email existe déjà...");
      
      // Vérifier d'abord si l'email existe déjà dans notre base staff
      const { data: existingStaff, error: checkError } = await supabase
        .rpc('staff_email_exists', { p_email: data.email });

      if (checkError) {
        console.error("Erreur vérification email:", checkError);
      }

      if (existingStaff) {
        throw new Error("Un compte avec cet email existe déjà. Essayez de vous connecter ou utilisez un autre email.");
      }

      console.log("✅ Email disponible, création du compte...");

      // 1. Créer le compte utilisateur avec Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            first_name: data.prenom,
            last_name: data.nom
          }
        }
      });

      console.log("📧 Réponse auth:", authData, authError);

      if (authError) {
        // Gestion spécifique des erreurs d'auth
        if (authError.message.includes("User already registered")) {
          throw new Error("Un compte avec cet email existe déjà. Essayez de vous connecter.");
        } else if (authError.message.includes("Password")) {
          throw new Error("Le mot de passe doit contenir au moins 6 caractères.");
        } else if (authError.message.includes("Email")) {
          throw new Error("L'adresse email n'est pas valide.");
        }
        throw new Error(authError.message);
      }

      if (!authData.user) {
        throw new Error("Erreur lors de la création du compte utilisateur");
      }

      console.log("✅ Compte auth créé, insertion données staff...");

      // 2. Insérer les données staff dans la base de données
      const { error: staffError } = await supabase
        .from('staff')
        .insert({
          email: data.email,
          nom: data.nom,
          prenom: data.prenom,
          telephone: data.telephone,
          age: parseInt(data.age),
          genre: data.genre,
          ville: data.ville,
          taille: parseInt(data.taille),
          pointure: data.pointure,
          taille_confection: data.taille_confection,
          taille_pantalon: data.taille_pantalon,
          taille_haut: data.taille_haut,
          couleur_cheveux: data.couleur_cheveux,
          couleur_yeux: data.couleur_yeux,
          competences: data.competences,
          langues: data.langues,
          experience: data.experience,
          permis: data.permis,
          disponibilites: data.availability.join(', '),
          photo: data.photoPortrait || null,
          photo_plein_pied: data.photoPleinPied || null,
          identite: data.carteIdentite || null,
          adresse_complete: data.adresse_complete,
          code_postal: data.code_postal,
          nationalite: data.nationalite,
          date_naissance: data.date_naissance ? format(new Date(data.date_naissance), 'yyyy-MM-dd') : null,
          lieu_naissance: data.lieu_naissance,
          situation_familiale: data.situation_familiale,
          numero_identite: data.numero_identite,
          numero_securite_sociale: data.numero_securite_sociale || null,
          iban: data.iban || null,
          niveau_etudes: data.niveau_etudes,
          nom_urgence: data.nom_urgence,
          telephone_urgence: data.telephone_urgence,
        });

      if (staffError) {
        console.error('❌ Erreur insertion staff:', staffError);
        
        // Si c'est une erreur de duplicate email, supprimer le compte auth créé
        if (staffError.code === '23505' && staffError.message.includes('staff_email_unique')) {
          try {
            await supabase.auth.admin.deleteUser(authData.user.id);
          } catch (deleteError) {
            console.error('Erreur suppression compte auth:', deleteError);
          }
          throw new Error("Un compte avec cet email existe déjà. Si vous avez déjà un compte, essayez de vous connecter.");
        }
        
        throw new Error("Erreur lors de l'enregistrement de vos données. Veuillez réessayer.");
      }

      console.log("✅ Inscription complète réussie !");

      toast({
        title: "Inscription réussie !",
        description: "Votre compte a été créé. Un email de confirmation vous a été envoyé.",
      });
      
      setStep(6); // Page de confirmation
      
    } catch (error: any) {
      console.error('❌ Erreur inscription:', error);
      
      let errorMessage = "Une erreur est survenue lors de l'inscription. Veuillez réessayer.";
      
      // Messages d'erreur spécifiques et utiles
      if (error.message.includes("already registered") || error.message.includes("existe déjà")) {
        errorMessage = "Un compte avec cet email existe déjà. Essayez de vous connecter ou utilisez un autre email.";
      } else if (error.message.includes("Password")) {
        errorMessage = "Le mot de passe doit contenir au moins 6 caractères avec des lettres et des chiffres.";
      } else if (error.message.includes("Email")) {
        errorMessage = "L'adresse email n'est pas valide. Vérifiez le format.";
      } else if (error.message.includes("Network")) {
        errorMessage = "Problème de connexion. Vérifiez votre connexion internet et réessayez.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Erreur d'inscription",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
        if (!value || value !== password || value.length < 6) {
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
        title: "Champs manquants",
        description: `Veuillez remplir : ${missingFields.join(', ')}`,
        variant: "destructive",
      });
      return;
    }
    
    nextStep();
  };

  if (step === 6) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-accent/30 flex items-center justify-center py-12">
        <Card className="max-w-md mx-4 text-center">
          <CardContent className="p-8">
            <CheckCircle className="text-green-500 mx-auto mb-4" size={64} />
            <h2 className="text-2xl font-bold mb-4">Inscription réussie !</h2>
            <p className="text-muted-foreground mb-6">
              Votre compte a été créé avec succès. Vérifiez votre email pour confirmer votre compte, puis connectez-vous à votre espace staff.
            </p>
            <div className="space-y-3">
              <Button onClick={() => navigate("/auth")} className="w-full">
                Me connecter
              </Button>
              <Button variant="outline" onClick={() => navigate("/")} className="w-full">
                Retour à l'accueil
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
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-bold mb-4">
              Inscription <span className="text-primary">Hôtes & Hôtesses</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Rejoignez notre équipe et participez à des événements prestigieux
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Étape {step} sur 5</span>
              <span className="text-sm text-muted-foreground">{Math.round((Math.min(step, 5) / 5) * 100)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(Math.min(step, 5) / 5) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2" size={24} />
                    Informations personnelles
                  </CardTitle>
                  <CardDescription>
                    Renseignez vos informations de base
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="prenom">Prénom *</Label>
                      <Input
                        id="prenom"
                        {...register("prenom")}
                        className={errors.prenom ? "border-destructive" : ""}
                      />
                      {errors.prenom && (
                        <p className="text-sm text-destructive mt-1">{errors.prenom.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="nom">Nom *</Label>
                      <Input
                        id="nom"
                        {...register("nom")}
                        className={errors.nom ? "border-destructive" : ""}
                      />
                      {errors.nom && (
                        <p className="text-sm text-destructive mt-1">{errors.nom.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="age">Âge *</Label>
                      <Input
                        id="age"
                        {...register("age")}
                        className={errors.age ? "border-destructive" : ""}
                      />
                      {errors.age && (
                        <p className="text-sm text-destructive mt-1">{errors.age.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="genre">Genre *</Label>
                      <Select onValueChange={(value) => setValue("genre", value)} value={watch("genre") || ""}>
                        <SelectTrigger className={errors.genre ? "border-destructive" : ""}>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="homme">Homme</SelectItem>
                          <SelectItem value="femme">Femme</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.genre && (
                        <p className="text-sm text-destructive mt-1">{errors.genre.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ville">Ville *</Label>
                      <Select onValueChange={(value) => setValue("ville", value)} value={watch("ville") || ""}>
                        <SelectTrigger className={errors.ville ? "border-destructive" : ""}>
                          <SelectValue placeholder="Sélectionner votre ville" />
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
                          <SelectItem value="safi">Safi</SelectItem>
                          <SelectItem value="mohammedia">Mohammedia</SelectItem>
                          <SelectItem value="autre">Autre ville</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.ville && (
                        <p className="text-sm text-destructive mt-1">{errors.ville.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="telephone">Téléphone *</Label>
                      <Input
                        id="telephone"
                        type="tel"
                        placeholder="+212612345678 (avec indicatif pays)"
                        {...register("telephone")}
                        className={errors.telephone ? "border-destructive" : ""}
                      />
                      {errors.telephone && (
                        <p className="text-sm text-destructive mt-1">{errors.telephone.message}</p>
                      )}
                    </div>
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

                  <div className="flex justify-end">
                    <Button type="button" onClick={handleNextStep}>
                      Continuer
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
                    Informations administratives
                  </CardTitle>
                  <CardDescription>
                    Données nécessaires pour votre contrat de travail
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="adresse_complete">Adresse complète *</Label>
                      <Textarea
                        id="adresse_complete"
                        placeholder="Rue, numéro, quartier..."
                        rows={3}
                        {...register("adresse_complete")}
                        className={errors.adresse_complete ? "border-destructive" : ""}
                      />
                      {errors.adresse_complete && (
                        <p className="text-sm text-destructive mt-1">{errors.adresse_complete.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="code_postal">Code postal *</Label>
                      <Input
                        id="code_postal"
                        {...register("code_postal")}
                        className={errors.code_postal ? "border-destructive" : ""}
                      />
                      {errors.code_postal && (
                        <p className="text-sm text-destructive mt-1">{errors.code_postal.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nationalite">Nationalité *</Label>
                      <Select onValueChange={(value) => setValue("nationalite", value)} value={watch("nationalite") || ""}>
                        <SelectTrigger className={errors.nationalite ? "border-destructive" : ""}>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="marocaine">Marocaine</SelectItem>
                          <SelectItem value="francaise">Française</SelectItem>
                          <SelectItem value="belge">Belge</SelectItem>
                          <SelectItem value="algerienne">Algérienne</SelectItem>
                          <SelectItem value="tunisienne">Tunisienne</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.nationalite && (
                        <p className="text-sm text-destructive mt-1">{errors.nationalite.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lieu_naissance">Lieu de naissance *</Label>
                      <Input
                        id="lieu_naissance"
                        {...register("lieu_naissance")}
                        className={errors.lieu_naissance ? "border-destructive" : ""}
                      />
                      {errors.lieu_naissance && (
                        <p className="text-sm text-destructive mt-1">{errors.lieu_naissance.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="situation_familiale">Situation familiale *</Label>
                      <Select onValueChange={(value) => setValue("situation_familiale", value)} value={watch("situation_familiale") || ""}>
                        <SelectTrigger className={errors.situation_familiale ? "border-destructive" : ""}>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="celibataire">Célibataire</SelectItem>
                          <SelectItem value="marie">Marié(e)</SelectItem>
                          <SelectItem value="divorce">Divorcé(e)</SelectItem>
                          <SelectItem value="veuf">Veuf/Veuve</SelectItem>
                          <SelectItem value="pacs">PACS</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.situation_familiale && (
                        <p className="text-sm text-destructive mt-1">{errors.situation_familiale.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="niveau_etudes">Niveau d'études *</Label>
                      <Select onValueChange={(value) => setValue("niveau_etudes", value)} value={watch("niveau_etudes") || ""}>
                        <SelectTrigger className={errors.niveau_etudes ? "border-destructive" : ""}>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sans_diplome">Sans diplôme</SelectItem>
                          <SelectItem value="bac">Baccalauréat</SelectItem>
                          <SelectItem value="bac_plus_2">Bac+2</SelectItem>
                          <SelectItem value="bac_plus_3">Bac+3 (Licence)</SelectItem>
                          <SelectItem value="bac_plus_5">Bac+5 (Master)</SelectItem>
                          <SelectItem value="doctorat">Doctorat</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.niveau_etudes && (
                        <p className="text-sm text-destructive mt-1">{errors.niveau_etudes.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="numero_identite">Numéro d'identité *</Label>
                      <Input
                        id="numero_identite"
                        placeholder="CIN, Passeport..."
                        {...register("numero_identite")}
                        className={errors.numero_identite ? "border-destructive" : ""}
                      />
                      {errors.numero_identite && (
                        <p className="text-sm text-destructive mt-1">{errors.numero_identite.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="numero_securite_sociale">N° Sécurité sociale</Label>
                      <Input
                        id="numero_securite_sociale"
                        placeholder="Optionnel"
                        {...register("numero_securite_sociale")}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nom_urgence">Contact d'urgence (nom) *</Label>
                      <Input
                        id="nom_urgence"
                        {...register("nom_urgence")}
                        className={errors.nom_urgence ? "border-destructive" : ""}
                      />
                      {errors.nom_urgence && (
                        <p className="text-sm text-destructive mt-1">{errors.nom_urgence.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="telephone_urgence">Téléphone d'urgence *</Label>
                      <Input
                        id="telephone_urgence"
                        type="tel"
                        placeholder="+212612345678"
                        {...register("telephone_urgence")}
                        className={errors.telephone_urgence ? "border-destructive" : ""}
                      />
                      {errors.telephone_urgence && (
                        <p className="text-sm text-destructive mt-1">{errors.telephone_urgence.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="iban">IBAN (compte bancaire)</Label>
                    <Input
                      id="iban"
                      placeholder="MA64 011519 000000 013040 10003 82 (optionnel)"
                      {...register("iban")}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Nécessaire pour le versement des salaires
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={handlePrevStepWithSave}>
                      Précédent
                    </Button>
                    <Button type="button" onClick={handleNextStepWithSave}>
                      Continuer
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
                    Mensurations & Expérience
                  </CardTitle>
                  <CardDescription>
                    Informations complémentaires et expérience professionnelle
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="taille">Taille (cm) *</Label>
                      <Input
                        id="taille"
                        {...register("taille")}
                        className={errors.taille ? "border-destructive" : ""}
                      />
                      {errors.taille && (
                        <p className="text-sm text-destructive mt-1">{errors.taille.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="taille_pantalon">Taille pantalon *</Label>
                      <Select onValueChange={(value) => setValue("taille_pantalon", value)} value={watch("taille_pantalon") || ""}>
                        <SelectTrigger className={errors.taille_pantalon ? "border-destructive" : ""}>
                          <SelectValue placeholder="Ex: 38, 40, 42" />
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
                        <p className="text-sm text-destructive mt-1">{errors.taille_pantalon.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="taille_haut">Taille haut *</Label>
                      <Select onValueChange={(value) => setValue("taille_haut", value)} value={watch("taille_haut") || ""}>
                        <SelectTrigger className={errors.taille_haut ? "border-destructive" : ""}>
                          <SelectValue placeholder="Ex: S, M, L" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="XS">XS</SelectItem>
                          <SelectItem value="S">S</SelectItem>
                          <SelectItem value="M">M</SelectItem>
                          <SelectItem value="L">L</SelectItem>
                          <SelectItem value="XL">XL</SelectItem>
                          <SelectItem value="XXL">XXL</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.taille_haut && (
                        <p className="text-sm text-destructive mt-1">{errors.taille_haut.message}</p>
                      )}
                     </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div>
                       <Label htmlFor="pointure">Pointure chaussures *</Label>
                        <Select onValueChange={(value) => setValue("pointure", value)} value={watch("pointure") || ""}>
                          <SelectTrigger className={errors.pointure ? "border-destructive" : ""}>
                            <SelectValue placeholder="Ex: 39, 42" />
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
                         <p className="text-sm text-destructive mt-1">{errors.pointure.message}</p>
                       )}
                     </div>
                     <div>
                       <Label htmlFor="taille_confection">Taille confection *</Label>
                        <Select onValueChange={(value) => setValue("taille_confection", value)} value={watch("taille_confection") || ""}>
                          <SelectTrigger className={errors.taille_confection ? "border-destructive" : ""}>
                            <SelectValue placeholder="Ex: S, M, L" />
                         </SelectTrigger>
                         <SelectContent>
                           <SelectItem value="XS">XS</SelectItem>
                           <SelectItem value="S">S</SelectItem>
                           <SelectItem value="M">M</SelectItem>
                           <SelectItem value="L">L</SelectItem>
                           <SelectItem value="XL">XL</SelectItem>
                           <SelectItem value="XXL">XXL</SelectItem>
                         </SelectContent>
                       </Select>
                       {errors.taille_confection && (
                         <p className="text-sm text-destructive mt-1">{errors.taille_confection.message}</p>
                       )}
                     </div>
                   </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="couleur_cheveux">Couleur cheveux *</Label>
                      <Select onValueChange={(value) => setValue("couleur_cheveux", value)} value={watch("couleur_cheveux") || ""}>
                        <SelectTrigger className={errors.couleur_cheveux ? "border-destructive" : ""}>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="châtain">Châtain</SelectItem>
                          <SelectItem value="blond">Blond</SelectItem>
                          <SelectItem value="brun">Brun</SelectItem>
                          <SelectItem value="noir">Noir</SelectItem>
                          <SelectItem value="roux">Roux</SelectItem>
                          <SelectItem value="gris">Gris</SelectItem>
                          <SelectItem value="blanc">Blanc</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.couleur_cheveux && (
                        <p className="text-sm text-destructive mt-1">{errors.couleur_cheveux.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="couleur_yeux">Couleur yeux *</Label>
                      <Select onValueChange={(value) => setValue("couleur_yeux", value)} value={watch("couleur_yeux") || ""}>
                        <SelectTrigger className={errors.couleur_yeux ? "border-destructive" : ""}>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="marron">Marron</SelectItem>
                          <SelectItem value="bleu">Bleu</SelectItem>
                          <SelectItem value="vert">Vert</SelectItem>
                          <SelectItem value="noisette">Noisette</SelectItem>
                          <SelectItem value="gris">Gris</SelectItem>
                          <SelectItem value="noir">Noir</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.couleur_yeux && (
                        <p className="text-sm text-destructive mt-1">{errors.couleur_yeux.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="competences">Compétences spécifiques *</Label>
                      <Textarea
                        id="competences"
                        placeholder="Ex: Langues, informatique, animation, service..."
                        rows={3}
                        {...register("competences")}
                        className={errors.competences ? "border-destructive" : ""}
                      />
                      {errors.competences && (
                        <p className="text-sm text-destructive mt-1">{errors.competences.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="langues">Langues parlées *</Label>
                      <Textarea
                        id="langues"
                        placeholder="Ex: Français (natif), Anglais (courant), Arabe (bases)"
                        rows={3}
                        {...register("langues")}
                        className={errors.langues ? "border-destructive" : ""}
                      />
                      {errors.langues && (
                        <p className="text-sm text-destructive mt-1">{errors.langues.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="permis"
                      checked={watch("permis") || false}
                      onCheckedChange={(checked) => setValue("permis", checked as boolean)}
                    />
                    <Label htmlFor="permis">J'ai le permis de conduire</Label>
                  </div>

                  <div>
                    <Label htmlFor="experience">Expérience professionnelle *</Label>
                    <Textarea
                      id="experience"
                      placeholder="Décrivez votre expérience dans l'événementiel, l'accueil, ou domaines connexes..."
                      rows={6}
                      {...register("experience")}
                      className={errors.experience ? "border-destructive" : ""}
                    />
                    {errors.experience && (
                      <p className="text-sm text-destructive mt-1">{errors.experience.message}</p>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={handlePrevStepWithSave}>
                      Précédent
                    </Button>
                    <Button type="button" onClick={handleNextStepWithSave}>
                      Continuer
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
                    Disponibilités & Documents
                  </CardTitle>
                  <CardDescription>
                    Dernières informations pour finaliser votre inscription
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-base font-semibold mb-4 block">
                      Disponibilités dans la semaine *
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
                          <Label htmlFor={day} className="text-sm">{day}</Label>
                        </div>
                      ))}
                    </div>
                    {errors.availability && (
                      <p className="text-sm text-destructive mt-2">{errors.availability.message}</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Documents à télécharger</Label>
                    <div className="grid gap-4">
                      <FileUpload
                        label="Photo portrait"
                        bucket="photos"
                        onFileUploaded={(fileName) => setValue('photoPortrait', fileName)}
                        uploadedFile={watch('photoPortrait')}
                      />
                      <FileUpload
                        label="Photo plein pied"
                        bucket="photos"
                        onFileUploaded={(fileName) => setValue('photoPleinPied', fileName)}
                        uploadedFile={watch('photoPleinPied')}
                      />
                      <FileUpload
                        label="Carte d'identité (recto/verso)"
                        bucket="identites"
                        onFileUploaded={(fileName) => setValue('carteIdentite', fileName)}
                        uploadedFile={watch('carteIdentite')}
                      />
                    </div>
                  </div>


                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={handlePrevStepWithSave}>
                      Précédent
                    </Button>
                    <Button type="button" onClick={handleNextStepWithSave}>
                      Continuer
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
                    Création de votre compte
                  </CardTitle>
                  <CardDescription>
                    Choisissez votre mot de passe pour finaliser votre inscription
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="password">Mot de passe *</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        {...register("password")}
                        className={errors.password ? "border-destructive" : ""}
                      />
                      {errors.password && (
                        <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        Minimum 6 caractères
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        {...register("confirmPassword")}
                        className={errors.confirmPassword ? "border-destructive" : ""}
                      />
                      {errors.confirmPassword && (
                        <p className="text-sm text-destructive mt-1">{errors.confirmPassword.message}</p>
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
                      J'accepte que mes données personnelles soient traitées conformément à la 
                      <a href="/politique-confidentialite" className="text-primary hover:underline ml-1">
                        politique de confidentialité
                      </a> 
                      et au RGPD. Ces données seront utilisées uniquement dans le cadre de ma candidature.
                    </Label>
                  </div>
                  {errors.rgpdConsent && (
                    <p className="text-sm text-destructive">{errors.rgpdConsent.message}</p>
                  )}

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={handlePrevStepWithSave}>
                      Précédent
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="gold-shadow"
                      onClick={(e) => {
                        console.log("=== BOUTON CLIC ===");
                        console.log("Button clicked, form valid:", Object.keys(errors).length === 0);
                        // Nettoyer le localStorage une fois le formulaire soumis
                        localStorage.removeItem('staffRegistrationData');
                        console.log("Form errors:", errors);
                        console.log("RGPD consent:", watch("rgpdConsent"));
                        if (!watch("rgpdConsent")) {
                          console.log("ERREUR: RGPD non accepté");
                          e.preventDefault();
                        }
                      }}
                    >
                      {isSubmitting ? "Création du compte..." : "Créer mon compte"}
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