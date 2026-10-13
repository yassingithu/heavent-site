import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Users, Building, Heart, Plus, FileText, Euro, CalendarIcon, Edit, MessageSquare, LogOut, Shield, Download, Globe, Trash2, Send, CheckCircle, X } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { supabase, FUNCTIONS_URL } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User, Session } from "@supabase/supabase-js";
import DevisRapide from "@/components/admin/devis/DevisRapide";
import FichesProfilStaff from "@/components/admin/staff/FichesProfilStaff";
import PlanningDispos from "@/components/admin/staff/PlanningDispos";
import FichesPaieMensuelles from "@/components/admin/paie/FichesPaieMensuelles";
import ContratsEvenements from "@/components/admin/equipe/ContratsEvenements";

const ADMIN_EMAIL = "i.chaigari@heaventagency.com";

interface Staff {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  age?: number;
  ville?: string;
  genre?: string;
  taille?: number;
  permis?: boolean;
  disponibilites?: string;
  remarques?: string;
  created_at?: string;
}

interface Contrat {
  id: string;
  staff_id: string;
  titre: string;
  type_contrat: string;
  date_debut: string;
  date_fin?: string;
  salaire_brut?: number;
  heures_prestations?: number;
  taux_horaire?: number;
  description?: string;
  statut: string;
  created_at?: string;
}

interface FichePaie {
  id: string;
  staff_id: string;
  mois: number;
  annee: number;
  salaire_brut: number;
  salaire_net: number;
  heures_travaillees?: number;
  prime?: number;
  deductions?: number;
  statut: string;
  created_at?: string;
}

interface DevisEntreprise {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  entreprise: string;
  telephone?: string;
  date_evenement?: string;
  nb_personnes?: number;
  nb_staff?: number;
  lieu?: string;
  services?: string;
  remarques?: string;
  statut?: string;
  date_envoi_devis?: string;
  tarifs_envoyes?: any;
  montant_total?: number;
  created_at?: string;
}

interface DevisMariage {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  date_mariage?: string;
  nb_invites?: number;
  lieu?: string;
  type_evenement?: string;
  services?: string;
  remarques?: string;
  statut?: string;
  date_envoi_devis?: string;
  tarifs_envoyes?: any;
  montant_total?: number;
  created_at?: string;
}

interface Disponibilite {
  id: string;
  staff_id: string;
  date_jour: string;
  creneau?: string;
  disponible: boolean;
  heure_debut?: string;
  heure_fin?: string;
  notes?: string;
  created_at?: string;
  staff?: {
    nom: string;
    prenom: string;
  };
}

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [contrats, setContrats] = useState<Contrat[]>([]);
  const [fichesPaie, setFichesPaie] = useState<FichePaie[]>([]);
  const [devisEntreprise, setDevisEntreprise] = useState<DevisEntreprise[]>([]);
  const [devisMariage, setDevisMariage] = useState<DevisMariage[]>([]);
  const [disponibilites, setDisponibilites] = useState<Disponibilite[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStaff, setSelectedStaff] = useState<string>("");
  const [remarques, setRemarques] = useState<{[key: string]: string}>({});
  const [searchDate, setSearchDate] = useState<Date | undefined>(undefined);
  const [availableStaff, setAvailableStaff] = useState<Staff[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  // État pour les formulaires
  const [contratForm, setContratForm] = useState({
    staff_id: "",
    titre: "",
    type_contrat: "cdi",
    date_debut: new Date(),
    date_fin: undefined as Date | undefined,
    heures_prestations: "",
    taux_horaire: "",
    description: ""
  });

  const [ficheForm, setFicheForm] = useState({
    staff_id: "",
    mois: new Date().getMonth() + 1,
    annee: new Date().getFullYear(),
    salaire_brut: "",
    salaire_net: "",
    heures_travaillees: "",
    prime: "",
    deductions: ""
  });

  const [emailForm, setEmailForm] = useState({
    type: "entreprise" as "entreprise" | "mariage",
    nom: "",
    prenom: "",
    email: "",
    entreprise: "",
    telephone: "",
    date_evenement: "",
    nb_personnes: "",
    nb_staff: "",
    lieu: "",
    services: "",
    remarques: "",
    tarifs: [{ description: "", prix: "" }]
  });

  const [passwordForm, setPasswordForm] = useState({
    selectedStaffId: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setAuthLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!authLoading) {
      if (!user || !session || user.email !== ADMIN_EMAIL) {
        navigate("/admin-auth");
        return;
      }
      // Only fetch data if user is authenticated and is admin
      fetchData();
    }
  }, [user, session, authLoading, navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch staff data
      const { data: staffData, error: staffError } = await supabase
        .from('staff')
        .select('*')
        .order('created_at', { ascending: false });

      if (staffError) throw staffError;

      // Fetch contrats
      const { data: contratsData, error: contratsError } = await supabase
        .from('contrats')
        .select('*, staff(nom, prenom)')
        .order('created_at', { ascending: false });

      if (contratsError) throw contratsError;

      // Fetch fiches de paie
      const { data: fichesData, error: fichesError } = await supabase
        .from('fiches_paie')
        .select('*, staff(nom, prenom)')
        .order('annee', { ascending: false })
        .order('mois', { ascending: false });

      if (fichesError) throw fichesError;

      // Fetch devis entreprise data
      const { data: entrepriseData, error: entrepriseError } = await supabase
        .from('devis_entreprise')
        .select('*')
        .order('created_at', { ascending: false });

      if (entrepriseError) throw entrepriseError;

      // Fetch devis mariage data
      const { data: mariageData, error: mariageError } = await supabase
        .from('devis_mariage')
        .select('*')
        .order('created_at', { ascending: false });

      if (mariageError) throw mariageError;

      // Fetch disponibilites data
      const { data: disponibilitesData, error: disponibilitesError } = await supabase
        .from('disponibilites')
        .select('*, staff(nom, prenom)')
        .order('date_jour', { ascending: false });

      if (disponibilitesError) throw disponibilitesError;

      setStaff(staffData || []);
      setContrats(contratsData || []);
      setFichesPaie(fichesData || []);
      setDevisEntreprise(entrepriseData || []);
      setDevisMariage(mariageData || []);
      setDisponibilites(disponibilitesData || []);
      
      // Initialiser les remarques avec les valeurs existantes
      const initialRemarques: {[key: string]: string} = {};
      staffData?.forEach(person => {
        if (person.remarques) {
          initialRemarques[person.id] = person.remarques;
        }
      });
      setRemarques(initialRemarques);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createContrat = async () => {
    try {
      const heures = parseInt(contratForm.heures_prestations);
      const taux = parseFloat(contratForm.taux_horaire);
      const salaireCalcule = heures * taux;

      const { error } = await supabase
        .from('contrats')
        .insert({
          staff_id: contratForm.staff_id,
          titre: contratForm.titre,
          type_contrat: contratForm.type_contrat,
          date_debut: format(contratForm.date_debut, 'yyyy-MM-dd'),
          date_fin: contratForm.date_fin ? format(contratForm.date_fin, 'yyyy-MM-dd') : null,
          heures_prestations: heures,
          taux_horaire: taux,
          salaire_brut: salaireCalcule,
          description: contratForm.description
        });

      if (error) throw error;

      toast({
        title: "Contrat créé",
        description: "Le contrat a été créé avec succès",
      });

      // Reset form
      setContratForm({
        staff_id: "",
        titre: "",
        type_contrat: "cdi",
        date_debut: new Date(),
        date_fin: undefined,
        heures_prestations: "",
        taux_horaire: "",
        description: ""
      });

      fetchData();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer le contrat",
        variant: "destructive",
      });
    }
  };

  const createFichePaie = async () => {
    try {
      const { error } = await supabase
        .from('fiches_paie')
        .insert({
          staff_id: ficheForm.staff_id,
          mois: ficheForm.mois,
          annee: ficheForm.annee,
          salaire_brut: parseFloat(ficheForm.salaire_brut),
          salaire_net: parseFloat(ficheForm.salaire_net),
          heures_travaillees: ficheForm.heures_travaillees ? parseFloat(ficheForm.heures_travaillees) : null,
          prime: ficheForm.prime ? parseFloat(ficheForm.prime) : 0,
          deductions: ficheForm.deductions ? parseFloat(ficheForm.deductions) : 0
        });

      if (error) throw error;

      toast({
        title: "Fiche de paie créée",
        description: "La fiche de paie a été créée avec succès",
      });

      // Reset form
      setFicheForm({
        staff_id: "",
        mois: new Date().getMonth() + 1,
        annee: new Date().getFullYear(),
        salaire_brut: "",
        salaire_net: "",
        heures_travaillees: "",
        prime: "",
        deductions: ""
      });

      fetchData();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer la fiche de paie",
        variant: "destructive",
      });
    }
  };

  const sendDevis = async () => {
    try {
      // Calculer le total
      const total = emailForm.tarifs.reduce((sum, tarif) => {
        return sum + (parseFloat(tarif.prix) || 0);
      }, 0);

      // Envoyer l'email avec le devis professionnel
      const { data: sessionData } = await supabase.auth.getSession();
      const response = await fetch(`${FUNCTIONS_URL}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionData.session?.access_token ?? ''}`,
        },
        body: JSON.stringify({
          type: 'quote',
          data: {
            ...emailForm,
            total: total
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi du devis');
      }

      // Sauvegarder le devis envoyé dans la base de données
      const tableName = emailForm.type === "entreprise" ? "devis_entreprise" : "devis_mariage";
      const data = emailForm.type === "entreprise" 
        ? {
            nom: emailForm.nom,
            prenom: emailForm.prenom,
            email: emailForm.email,
            entreprise: emailForm.entreprise,
            telephone: emailForm.telephone,
            date_evenement: emailForm.date_evenement || null,
            nb_personnes: emailForm.nb_personnes ? parseInt(emailForm.nb_personnes) : null,
            nb_staff: emailForm.nb_staff ? parseInt(emailForm.nb_staff) : null,
            lieu: emailForm.lieu,
            services: emailForm.services,
            remarques: emailForm.remarques,
            statut: 'envoye',
            date_envoi_devis: new Date().toISOString(),
            tarifs_envoyes: emailForm.tarifs,
            montant_total: total
          }
        : {
            nom: emailForm.nom,
            prenom: emailForm.prenom,
            email: emailForm.email,
            telephone: emailForm.telephone,
            date_mariage: emailForm.date_evenement || null,
            nb_invites: emailForm.nb_personnes ? parseInt(emailForm.nb_personnes) : null,
            lieu: emailForm.lieu,
            services: emailForm.services,
            remarques: emailForm.remarques,
            statut: 'envoye',
            date_envoi_devis: new Date().toISOString(),
            tarifs_envoyes: emailForm.tarifs,
            montant_total: total
          };

      const { error } = await supabase
        .from(tableName)
        .insert(data);

      if (error) throw error;

      toast({
        title: "Devis envoyé",
        description: `Le devis a été envoyé avec succès à ${emailForm.email}`,
      });

      // Reset form
      setEmailForm({
        type: "entreprise",
        nom: "",
        prenom: "",
        email: "",
        entreprise: "",
        telephone: "",
        date_evenement: "",
        nb_personnes: "",
        nb_staff: "",
        lieu: "",
        services: "",
        remarques: "",
        tarifs: [{ description: "", prix: "" }]
      });

      fetchData();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le devis",
        variant: "destructive",
      });
    }
  };

  const updateDevisStatus = async (devisId: string, type: "entreprise" | "mariage", status: "accepte" | "refuse" | "envoye" | "en_attente") => {
    try {
      const tableName = type === "entreprise" ? "devis_entreprise" : "devis_mariage";
      
      const { error } = await supabase
        .from(tableName)
        .update({ statut: status })
        .eq('id', devisId);

      if (error) throw error;

      const statusLabels = {
        'accepte': 'accepté',
        'refuse': 'refusé', 
        'envoye': 'envoyé',
        'en_attente': 'en attente'
      };

      toast({
        title: "Statut mis à jour",
        description: `Le devis a été marqué comme ${statusLabels[status]}`,
      });

      fetchData();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
        variant: "destructive",
      });
    }
  };

  const updateStaffRemarques = async (staffId: string, newRemarques: string) => {
    try {
      const { error } = await supabase
        .from('staff')
        .update({ remarques: newRemarques })
        .eq('id', staffId);

      if (error) throw error;

      toast({
        title: "Remarques mises à jour",
        description: "Les remarques ont été sauvegardées",
      });

      fetchData();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les remarques",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/admin-auth");
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté de l'administration",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la déconnexion",
        variant: "destructive",
      });
    }
  };

  const generateStaffPDF = async (staffId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-staff-pdf', {
        body: { staff_id: staffId }
      });

      if (error) throw error;

      // Créer un blob avec le HTML retourné et le télécharger directement
      const blob = new Blob([data], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      
      // Créer un lien de téléchargement temporaire
      const link = document.createElement('a');
      link.href = url;
      link.download = `fiche-staff-${staffId}-${Date.now()}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Nettoyer l'URL
      window.URL.revokeObjectURL(url);

      toast({
        title: "Fiche téléchargée",
        description: "La fiche PDF a été téléchargée avec succès",
      });
    } catch (error) {
      console.error('Erreur génération PDF:', error);
      toast({
        title: "Erreur",
        description: "Impossible de générer la fiche PDF",
        variant: "destructive",
      });
    }
  };

  const searchAvailableStaff = async (date: Date) => {
    try {
      const formattedDate = format(date, 'yyyy-MM-dd');
      
      // Rechercher dans les disponibilités pour cette date
      const { data: disponibilites, error: dispError } = await supabase
        .from('disponibilites')
        .select('staff_id, staff(nom, prenom, email, telephone)')
        .eq('date_jour', formattedDate)
        .eq('disponible', true);

      if (dispError) throw dispError;

      // Extraire les staff disponibles
      const staffIds = disponibilites?.map(d => d.staff_id) || [];
      
      if (staffIds.length === 0) {
        setAvailableStaff([]);
        toast({
          title: "Aucun staff disponible",
          description: `Aucun staff n'est disponible le ${format(date, 'dd/MM/yyyy', { locale: fr })}`,
        });
        return;
      }

      // Récupérer les détails complets du staff disponible
      const { data: staffData, error: staffError } = await supabase
        .from('staff')
        .select('*')
        .in('id', staffIds);

      if (staffError) throw staffError;

      setAvailableStaff(staffData || []);
      toast({
        title: "Recherche terminée",
        description: `${staffData?.length || 0} staff disponible(s) le ${format(date, 'dd/MM/yyyy', { locale: fr })}`,
      });
    } catch (error) {
      console.error('Erreur recherche:', error);
      toast({
        title: "Erreur",
        description: "Impossible de rechercher les disponibilités",
        variant: "destructive",
      });
    }
  };

  const generateContractPDF = async (contractId: string, language: string = 'fr') => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-contract-pdf', {
        body: { contract_id: contractId, language }
      });

      if (error) throw error;

      // Créer un blob avec le HTML retourné et le télécharger directement
      const blob = new Blob([data], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      
      // Créer un lien de téléchargement temporaire
      const link = document.createElement('a');
      link.href = url;
      link.download = `contrat-${contractId}-${language}-${Date.now()}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Nettoyer l'URL
      window.URL.revokeObjectURL(url);

      toast({
        title: "Contrat téléchargé",
        description: `Le contrat en ${language === 'fr' ? 'français' : language === 'en' ? 'anglais' : 'arabe'} a été téléchargé`,
      });
    } catch (error) {
      console.error('Erreur génération contrat:', error);
      toast({
        title: "Erreur",
        description: "Impossible de générer le contrat PDF",
        variant: "destructive",
      });
    }
  };

  const deleteStaff = async (staffId: string, staffName: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer ${staffName} ? Cette action est irréversible.`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('staff')
        .delete()
        .eq('id', staffId);

      if (error) throw error;

      toast({
        title: "Staff supprimé",
        description: `${staffName} a été supprimé avec succès`,
      });

      fetchData();
    } catch (error) {
      console.error('Erreur suppression staff:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le staff",
        variant: "destructive",
      });
    }
  };

  const changeStaffPassword = async () => {
    // Vérifier que l'utilisateur connecté est l'admin
    if (!user || user.email !== ADMIN_EMAIL) {
      toast({
        title: "Accès refusé",
        description: "Seul l'administrateur peut changer les mots de passe",
        variant: "destructive",
      });
      return;
    }

    // Validation
    if (!passwordForm.selectedStaffId) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un membre du personnel",
        variant: "destructive",
      });
      return;
    }

    if (!passwordForm.newPassword) {
      toast({
        title: "Erreur", 
        description: "Veuillez saisir un nouveau mot de passe",
        variant: "destructive",
      });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit faire au moins 6 caractères",
        variant: "destructive",
      });
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return;
    }

    try {
      setPasswordLoading(true);

      // Trouver l'email du staff sélectionné
      const selectedStaff = staff.find(s => s.id === passwordForm.selectedStaffId);
      if (!selectedStaff) {
        throw new Error("Staff non trouvé");
      }

      // Appeler l'edge function pour changer le mot de passe
      const { data, error } = await supabase.functions.invoke('admin-change-password', {
        body: {
          userEmail: selectedStaff.email,
          newPassword: passwordForm.newPassword
        }
      });

      console.log("Edge function response:", { data, error });

      if (error) {
        console.error("Edge function error details:", error);
        throw new Error(error.message || 'Erreur lors du changement de mot de passe');
      }

      if (data?.error) {
        console.error("Edge function returned error:", data.error);
        throw new Error(data.error);
      }

      toast({
        title: "Mot de passe modifié",
        description: `Le mot de passe de ${selectedStaff.prenom} ${selectedStaff.nom} a été modifié avec succès`,
      });

      // Reset form
      setPasswordForm({
        selectedStaffId: "",
        newPassword: "",
        confirmPassword: ""
      });

    } catch (error: any) {
      console.error('Erreur changement mot de passe:', error);
      toast({
        title: "Erreur",
        description: error.message || "Impossible de changer le mot de passe",
        variant: "destructive",
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  const generateInvoicePDF = async (devisId: string, type: "entreprise" | "mariage") => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-invoice-pdf', {
        body: { devis_id: devisId, type }
      });

      if (error) throw error;

      // Créer un blob avec le HTML retourné et le télécharger directement
      const blob = new Blob([data], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      
      // Créer un lien de téléchargement temporaire
      const link = document.createElement('a');
      link.href = url;
      link.download = `facture-${devisId}-${Date.now()}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Nettoyer l'URL
      window.URL.revokeObjectURL(url);

      toast({
        title: "Facture générée",
        description: "La facture a été téléchargée avec succès",
      });
    } catch (error) {
      console.error('Erreur génération facture:', error);
      toast({
        title: "Erreur",
        description: "Impossible de générer la facture",
        variant: "destructive",
      });
    }
  };

  const generatePayrollPDF = async (ficheId: string, language: string = 'fr') => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-staff-professional-pdf', {
        body: { fiche_id: ficheId, language, type: 'payroll' }
      });

      if (error) throw error;

      if (data?.pdf_url) {
        // Ouvrir le PDF dans un nouvel onglet
        window.open(data.pdf_url, '_blank');
        
        toast({
          title: "Fiche de paie générée",
          description: "La fiche de paie PDF a été générée avec succès",
        });
      }
    } catch (error) {
      console.error('Erreur génération fiche de paie PDF:', error);
      toast({
        title: "Erreur",
        description: "Impossible de générer la fiche de paie PDF",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Non spécifiée";
    return format(new Date(dateString), 'dd/MM/yyyy', { locale: fr });
  };

  const getStaffName = (staffId: string) => {
    const person = staff.find(s => s.id === staffId);
    return person ? `${person.prenom} ${person.nom}` : "Staff inconnu";
  };

  if (authLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Vérification des droits d'accès...</div>
      </div>
    );
  }

  if (!user || user.email !== ADMIN_EMAIL) {
    return null; // Will redirect
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Chargement des données...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header avec déconnexion */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Administration</h1>
          <p className="text-muted-foreground">Gestion complète du personnel et des demandes</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>{user?.email}</span>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staff.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contrats</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contrats.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fiches Paie</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fichesPaie.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Devis Entreprise</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{devisEntreprise.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Devis Événement</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{devisMariage.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Data Tables */}
      <Tabs defaultValue="devis-rapide" className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="grid w-full min-w-[1000px] grid-cols-10 sm:min-w-0">
            <TabsTrigger value="devis-rapide" className="text-xs sm:text-sm flex items-center space-x-1">
              <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Devis</span>
            </TabsTrigger>
            <TabsTrigger value="staff" className="text-xs sm:text-sm">👥 <span className="hidden sm:inline">Personnel</span></TabsTrigger>
            <TabsTrigger value="disponibilites" className="text-xs sm:text-sm">📅 <span className="hidden sm:inline">Dispo</span></TabsTrigger>
            <TabsTrigger value="envoyer-devis" className="text-xs sm:text-sm flex items-center space-x-1">
              <Send className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Envoyer</span>
            </TabsTrigger>
            <TabsTrigger value="contrats" className="text-xs sm:text-sm">📋 <span className="hidden sm:inline">Contrats</span></TabsTrigger>
            <TabsTrigger value="fiches" className="text-xs sm:text-sm">💰 <span className="hidden sm:inline">Fiches</span></TabsTrigger>
            <TabsTrigger value="entreprise" className="text-xs sm:text-sm">🏢 <span className="hidden sm:inline">Entreprise</span></TabsTrigger>
            <TabsTrigger value="mariage" className="text-xs sm:text-sm">💒 <span className="hidden sm:inline">Événement</span></TabsTrigger>
            <TabsTrigger value="devis-envoyes" className="text-xs sm:text-sm">📤 <span className="hidden sm:inline">Envoyés</span></TabsTrigger>
            <TabsTrigger value="securite" className="text-xs sm:text-sm flex items-center space-x-1">
              <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Sécurité</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="devis-rapide" className="space-y-4">
          <DevisRapide
            demandesEntreprise={devisEntreprise as any}
            demandesMariage={devisMariage as any}
            onDemandesChange={fetchData}
          />
        </TabsContent>

        {/* Disponibilités Tab */}
        <TabsContent value="disponibilites" className="space-y-4">
          <PlanningDispos />
          <Card>
            <CardHeader>
              <CardTitle>Disponibilités du Personnel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="whitespace-nowrap min-w-[120px]">Staff</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[100px]">Date</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[100px]">Créneau</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[100px]">Disponible</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[120px]">Horaires</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[100px]">Notes</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[100px]">Créé le</TableHead>
                    </TableRow>
                  </TableHeader>
                <TableBody>
                  {disponibilites.map((dispo) => (
                    <TableRow key={dispo.id}>
                      <TableCell>
                        {dispo.staff ? `${dispo.staff.prenom} ${dispo.staff.nom}` : getStaffName(dispo.staff_id)}
                      </TableCell>
                      <TableCell>{formatDate(dispo.date_jour)}</TableCell>
                      <TableCell>
                        {dispo.creneau ? (
                          <Badge variant={dispo.creneau === 'matin' ? 'default' : dispo.creneau === 'apres_midi' ? 'secondary' : 'outline'}>
                            {dispo.creneau === 'matin' ? 'Matin' : 
                             dispo.creneau === 'apres_midi' ? 'Après-midi' : 'Soir'}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">Journée complète</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={dispo.disponible ? "default" : "destructive"}>
                          {dispo.disponible ? "Disponible" : "Indisponible"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {dispo.heure_debut && dispo.heure_fin 
                          ? `${dispo.heure_debut} - ${dispo.heure_fin}`
                          : "Non spécifié"
                        }
                      </TableCell>
                      <TableCell>{dispo.notes || "Aucune"}</TableCell>
                      <TableCell>{formatDate(dispo.created_at)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Envoyer Devis Tab */}
        <TabsContent value="envoyer-devis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Envoyer un Devis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type de devis</Label>
                  <Select 
                    value={emailForm.type} 
                    onValueChange={(value: "entreprise" | "mariage") => setEmailForm(prev => ({...prev, type: value}))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entreprise">Devis Entreprise</SelectItem>
                      <SelectItem value="mariage">Devis Événement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    value={emailForm.email}
                    onChange={(e) => setEmailForm(prev => ({...prev, email: e.target.value}))}
                    placeholder="email@exemple.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Prénom *</Label>
                  <Input
                    value={emailForm.prenom}
                    onChange={(e) => setEmailForm(prev => ({...prev, prenom: e.target.value}))}
                    placeholder="Prénom"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Nom *</Label>
                  <Input
                    value={emailForm.nom}
                    onChange={(e) => setEmailForm(prev => ({...prev, nom: e.target.value}))}
                    placeholder="Nom"
                  />
                </div>

                {emailForm.type === "entreprise" && (
                  <div className="space-y-2">
                    <Label>Entreprise</Label>
                    <Input
                      value={emailForm.entreprise}
                      onChange={(e) => setEmailForm(prev => ({...prev, entreprise: e.target.value}))}
                      placeholder="Nom de l'entreprise"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Téléphone</Label>
                  <Input
                    value={emailForm.telephone}
                    onChange={(e) => setEmailForm(prev => ({...prev, telephone: e.target.value}))}
                    placeholder="+212..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Date de l'événement</Label>
                  <Input
                    type="date"
                    value={emailForm.date_evenement}
                    onChange={(e) => setEmailForm(prev => ({...prev, date_evenement: e.target.value}))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>{emailForm.type === "entreprise" ? "Nombre de personnes" : "Nombre d'invités"}</Label>
                  <Input
                    type="number"
                    value={emailForm.nb_personnes}
                    onChange={(e) => setEmailForm(prev => ({...prev, nb_personnes: e.target.value}))}
                    placeholder="50"
                  />
                </div>

                {emailForm.type === "entreprise" && (
                  <div className="space-y-2">
                    <Label>Nombre de staff</Label>
                    <Input
                      type="number"
                      value={emailForm.nb_staff}
                      onChange={(e) => setEmailForm(prev => ({...prev, nb_staff: e.target.value}))}
                      placeholder="5"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Lieu</Label>
                  <Input
                    value={emailForm.lieu}
                    onChange={(e) => setEmailForm(prev => ({...prev, lieu: e.target.value}))}
                    placeholder="Lieu de l'événement"
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  <Label>Services</Label>
                  <Textarea
                    value={emailForm.services}
                    onChange={(e) => setEmailForm(prev => ({...prev, services: e.target.value}))}
                    placeholder="Services demandés..."
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  <Label>Remarques</Label>
                  <Textarea
                    value={emailForm.remarques}
                    onChange={(e) => setEmailForm(prev => ({...prev, remarques: e.target.value}))}
                    placeholder="Remarques particulières..."
                  />
                </div>

                {/* Section Tarifs */}
                <div className="col-span-2 space-y-4">
                  <Label className="text-lg font-semibold">Tarifs</Label>
                  {emailForm.tarifs.map((tarif, index) => (
                    <div key={index} className="flex gap-2 items-end">
                      <div className="flex-1">
                        <Label>Description</Label>
                        <Input
                          value={tarif.description}
                          onChange={(e) => {
                            const newTarifs = [...emailForm.tarifs];
                            newTarifs[index].description = e.target.value;
                            setEmailForm(prev => ({...prev, tarifs: newTarifs}));
                          }}
                          placeholder="Ex: Hôtesses d'accueil (8h)"
                        />
                      </div>
                      <div className="w-32">
                        <Label>Prix (MAD)</Label>
                        <Input
                          type="number"
                          value={tarif.prix}
                          onChange={(e) => {
                            const newTarifs = [...emailForm.tarifs];
                            newTarifs[index].prix = e.target.value;
                            setEmailForm(prev => ({...prev, tarifs: newTarifs}));
                          }}
                          placeholder="0"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newTarifs = emailForm.tarifs.filter((_, i) => i !== index);
                          setEmailForm(prev => ({...prev, tarifs: newTarifs}));
                        }}
                        disabled={emailForm.tarifs.length === 1}
                      >
                        Suppr.
                      </Button>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEmailForm(prev => ({
                        ...prev, 
                        tarifs: [...prev.tarifs, { description: "", prix: "" }]
                      }));
                    }}
                  >
                    + Ajouter une ligne
                  </Button>

                  {/* Total */}
                  <div className="bg-accent/20 p-4 rounded-lg">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total TTC:</span>
                      <span>
                        {emailForm.tarifs.reduce((sum, tarif) => sum + (parseFloat(tarif.prix) || 0), 0).toFixed(2)} MAD
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={sendDevis} className="w-full mt-4" disabled={!emailForm.email || !emailForm.prenom || !emailForm.nom}>
                <Send className="h-4 w-4 mr-2" />
                Envoyer le devis
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Personnel Tab */}
        <TabsContent value="staff" className="space-y-4">
          <FichesProfilStaff />
          {/* Recherche par date */}
          <Card>
            <CardHeader>
              <CardTitle>🔍 Rechercher staff disponible par date</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Label>Date de l'événement</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {searchDate ? format(searchDate, "dd MMMM yyyy", { locale: fr }) : "Sélectionner une date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={searchDate}
                        onSelect={setSearchDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <Button 
                  onClick={() => searchDate && searchAvailableStaff(searchDate)}
                  disabled={!searchDate}
                  className="mt-6"
                >
                  Rechercher
                </Button>
              </div>
              
              {availableStaff.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Staff disponible le {searchDate && format(searchDate, "dd MMMM yyyy", { locale: fr })} :</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {availableStaff.map((person) => (
                      <Card key={person.id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium">{person.prenom} {person.nom}</h5>
                            <p className="text-sm text-muted-foreground">{person.email}</p>
                            <p className="text-sm text-muted-foreground">{person.telephone}</p>
                            <p className="text-sm">{person.ville}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => generateStaffPDF(person.id)}
                          >
                            📄 Fiche
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Gestion du Personnel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="whitespace-nowrap min-w-[120px]">Nom & Prénom</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[150px]">Email</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[100px]">Téléphone</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[80px]">Ville</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[70px]">Permis</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[200px]">Remarques</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[150px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                <TableBody>
                  {staff.map((person) => (
                     <TableRow key={person.id}>
                       <TableCell className="whitespace-nowrap">
                         <div className="font-medium">{person.prenom} {person.nom}</div>
                       </TableCell>
                       <TableCell className="whitespace-nowrap">{person.email}</TableCell>
                       <TableCell className="whitespace-nowrap">{person.telephone || "Non renseigné"}</TableCell>
                       <TableCell className="whitespace-nowrap">{person.ville || "Non renseigné"}</TableCell>
                       <TableCell>
                         <Badge variant={person.permis ? "default" : "secondary"}>
                           {person.permis ? "Oui" : "Non"}
                         </Badge>
                       </TableCell>
                       <TableCell>
                         <div className="flex items-center space-x-2">
                           <Textarea
                             value={remarques[person.id] || ""}
                             onChange={(e) => setRemarques(prev => ({
                               ...prev,
                               [person.id]: e.target.value
                             }))}
                             placeholder="Ajouter des remarques..."
                             className="min-h-[60px] max-w-[200px]"
                           />
                           {remarques[person.id] !== (person.remarques || "") && (
                             <Button
                               size="sm"
                               onClick={() => updateStaffRemarques(person.id, remarques[person.id] || "")}
                             >
                               <MessageSquare className="h-4 w-4" />
                             </Button>
                           )}
                         </div>
                       </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => generateStaffPDF(person.id)}
                            >
                              📄 Fiche PDF
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteStaff(person.id, `${person.prenom} ${person.nom}`)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                     </TableRow>
                  ))}
                </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contrats Tab */}
        <TabsContent value="contrats" className="space-y-4">
          <ContratsEvenements />
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Gestion des Contrats</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nouveau Contrat
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Créer un nouveau contrat</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Personnel</Label>
                      <Select 
                        value={contratForm.staff_id} 
                        onValueChange={(value) => setContratForm(prev => ({...prev, staff_id: value}))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner le personnel" />
                        </SelectTrigger>
                        <SelectContent>
                          {staff.map((person) => (
                            <SelectItem key={person.id} value={person.id}>
                              {person.prenom} {person.nom}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Titre du contrat</Label>
                      <Input
                        value={contratForm.titre}
                        onChange={(e) => setContratForm(prev => ({...prev, titre: e.target.value}))}
                        placeholder="Titre du contrat"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Type de contrat</Label>
                      <Select 
                        value={contratForm.type_contrat} 
                        onValueChange={(value) => setContratForm(prev => ({...prev, type_contrat: value}))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cdi">CDI</SelectItem>
                          <SelectItem value="cdd">CDD</SelectItem>
                          <SelectItem value="interim">Intérim</SelectItem>
                          <SelectItem value="freelance">Freelance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Heures de prestations par semaine</Label>
                      <Input
                        type="number"
                        value={contratForm.heures_prestations}
                        onChange={(e) => setContratForm(prev => ({...prev, heures_prestations: e.target.value}))}
                        placeholder="35"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Taux horaire (DH)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={contratForm.taux_horaire}
                        onChange={(e) => setContratForm(prev => ({...prev, taux_horaire: e.target.value}))}
                        placeholder="15.00"
                      />
                    </div>

                    {contratForm.heures_prestations && contratForm.taux_horaire && (
                      <div className="col-span-1 sm:col-span-2 p-3 bg-muted rounded-lg">
                        <Label className="text-sm font-medium">Salaire brut calculé:</Label>
                        <p className="text-lg font-bold">
                          {(parseInt(contratForm.heures_prestations) * parseFloat(contratForm.taux_horaire)).toFixed(2)} DH / semaine
                        </p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Date de début</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {format(contratForm.date_debut, "dd MMMM yyyy", { locale: fr })}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={contratForm.date_debut}
                            onSelect={(date) => date && setContratForm(prev => ({...prev, date_debut: date}))}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label>Date de fin (optionnel)</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {contratForm.date_fin ? format(contratForm.date_fin, "dd MMMM yyyy", { locale: fr }) : "Pas de date de fin"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={contratForm.date_fin}
                            onSelect={(date) => setContratForm(prev => ({...prev, date_fin: date}))}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="col-span-1 sm:col-span-2 space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={contratForm.description}
                        onChange={(e) => setContratForm(prev => ({...prev, description: e.target.value}))}
                        placeholder="Description du contrat"
                      />
                    </div>
                  </div>
                  <Button onClick={createContrat} className="w-full">
                    Créer le contrat
                  </Button>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="whitespace-nowrap min-w-[120px]">Personnel</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[150px]">Titre</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[80px]">Type</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[100px]">Date début</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[80px]">Heures/sem</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[100px]">Taux horaire</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[100px]">Salaire brut</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[80px]">Statut</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[150px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                <TableBody>
                  {contrats.map((contrat) => (
                    <TableRow key={contrat.id}>
                      <TableCell>{getStaffName(contrat.staff_id)}</TableCell>
                      <TableCell className="font-medium">{contrat.titre}</TableCell>
                      <TableCell>{contrat.type_contrat.toUpperCase()}</TableCell>
                      <TableCell>{formatDate(contrat.date_debut)}</TableCell>
                      <TableCell>{contrat.heures_prestations ? `${contrat.heures_prestations}h` : "Non spécifié"}</TableCell>
                       <TableCell>{contrat.taux_horaire ? `${contrat.taux_horaire} DH` : "Non spécifié"}</TableCell>
                       <TableCell>{contrat.salaire_brut ? `${contrat.salaire_brut} DH` : "Non spécifié"}</TableCell>
                      <TableCell>
                        <Badge variant={contrat.statut === "actif" ? "default" : "secondary"}>
                          {contrat.statut}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => generateContractPDF(contrat.id, 'fr')}
                            title="Contrat en français"
                          >
                            🇫🇷 FR
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => generateContractPDF(contrat.id, 'en')}
                            title="Contrat en anglais"
                          >
                            🇬🇧 EN
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => generateContractPDF(contrat.id, 'ar')}
                            title="Contrat en arabe"
                          >
                            🇲🇦 AR
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fiches de Paie Tab */}
        <TabsContent value="fiches" className="space-y-4">
          <FichesPaieMensuelles />
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Gestion des Fiches de Paie</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nouvelle Fiche de Paie
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Créer une nouvelle fiche de paie</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Personnel</Label>
                      <Select 
                        value={ficheForm.staff_id} 
                        onValueChange={(value) => setFicheForm(prev => ({...prev, staff_id: value}))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner le personnel" />
                        </SelectTrigger>
                        <SelectContent>
                          {staff.map((person) => (
                            <SelectItem key={person.id} value={person.id}>
                              {person.prenom} {person.nom}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Mois</Label>
                      <Select 
                        value={ficheForm.mois.toString()} 
                        onValueChange={(value) => setFicheForm(prev => ({...prev, mois: parseInt(value)}))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({length: 12}, (_, i) => (
                            <SelectItem key={i+1} value={(i+1).toString()}>
                              {format(new Date(2024, i), "MMMM", { locale: fr })}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Année</Label>
                      <Input
                        type="number"
                        value={ficheForm.annee}
                        onChange={(e) => setFicheForm(prev => ({...prev, annee: parseInt(e.target.value)}))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Salaire brut (DH)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={ficheForm.salaire_brut}
                        onChange={(e) => setFicheForm(prev => ({...prev, salaire_brut: e.target.value}))}
                        placeholder="Salaire brut"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Salaire net (DH)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={ficheForm.salaire_net}
                        onChange={(e) => setFicheForm(prev => ({...prev, salaire_net: e.target.value}))}
                        placeholder="Salaire net"
                      />
                    </div>

                    <div className="space-y-2">
                       <Label>Heures travaillées</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={ficheForm.heures_travaillees}
                        onChange={(e) => setFicheForm(prev => ({...prev, heures_travaillees: e.target.value}))}
                        placeholder="Heures travaillées"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Prime (DH)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={ficheForm.prime}
                        onChange={(e) => setFicheForm(prev => ({...prev, prime: e.target.value}))}
                        placeholder="Prime"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Déductions (DH)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={ficheForm.deductions}
                        onChange={(e) => setFicheForm(prev => ({...prev, deductions: e.target.value}))}
                        placeholder="Déductions"
                      />
                    </div>
                  </div>
                  <Button onClick={createFichePaie} className="w-full">
                    Créer la fiche de paie
                  </Button>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="whitespace-nowrap min-w-[120px]">Personnel</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[100px]">Période</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[120px]">Salaire brut</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[120px]">Salaire net</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[100px]">Heures</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[80px]">Prime</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[80px]">Statut</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[150px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fichesPaie.map((fiche) => (
                      <TableRow key={fiche.id}>
                        <TableCell className="whitespace-nowrap">{getStaffName(fiche.staff_id)}</TableCell>
                        <TableCell className="whitespace-nowrap">
                          {format(new Date(fiche.annee, fiche.mois - 1), "MMMM yyyy", { locale: fr })}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{fiche.salaire_brut} DH</TableCell>
                        <TableCell className="whitespace-nowrap">{fiche.salaire_net} DH</TableCell>
                        <TableCell className="whitespace-nowrap">{fiche.heures_travaillees || "Non spécifié"}h</TableCell>
                        <TableCell className="whitespace-nowrap">{fiche.prime || 0} DH</TableCell>
                        <TableCell>
                          <Badge variant={fiche.statut === "paye" ? "default" : "secondary"}>
                            {fiche.statut}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => generatePayrollPDF(fiche.id, 'fr')}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            PDF FR
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Devis Entreprise Tab */}
        <TabsContent value="entreprise" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Demandes de Devis Entreprise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="whitespace-nowrap min-w-[120px]">Contact</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[120px]">Entreprise</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[150px]">Email</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[100px]">Date Événement</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[100px]">Nb Personnes</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[100px]">Nb Staff</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[120px]">Lieu</TableHead>
                      <TableHead className="whitespace-nowrap min-w-[100px]">Date Demande</TableHead>
                    </TableRow>
                  </TableHeader>
                <TableBody>
                  {devisEntreprise.map((devis) => (
                    <TableRow key={devis.id}>
                      <TableCell className="font-medium">
                        {devis.prenom} {devis.nom}
                      </TableCell>
                      <TableCell>{devis.entreprise}</TableCell>
                      <TableCell>{devis.email}</TableCell>
                      <TableCell>{formatDate(devis.date_evenement)}</TableCell>
                      <TableCell>{devis.nb_personnes || "Non spécifié"}</TableCell>
                      <TableCell>{devis.nb_staff || "Non spécifié"}</TableCell>
                      <TableCell>{devis.lieu || "Non spécifié"}</TableCell>
                      <TableCell>{formatDate(devis.created_at)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Devis Événement Tab */}
        <TabsContent value="mariage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Demandes de Devis Événement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[120px]">Contact</TableHead>
                      <TableHead className="min-w-[150px]">Email</TableHead>
                      <TableHead className="min-w-[120px]">Date Événement</TableHead>
                      <TableHead className="min-w-[100px]">Nb Invités</TableHead>
                      <TableHead className="min-w-[120px]">Type Événement</TableHead>
                      <TableHead className="min-w-[120px]">Lieu</TableHead>
                      <TableHead className="min-w-[80px]">Statut</TableHead>
                      <TableHead className="min-w-[100px]">Date Demande</TableHead>
                      <TableHead className="min-w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                <TableBody>
                  {devisMariage.map((devis) => (
                    <TableRow key={devis.id}>
                      <TableCell className="font-medium">
                        {devis.prenom} {devis.nom}
                      </TableCell>
                      <TableCell>{devis.email}</TableCell>
                      <TableCell>{formatDate(devis.date_mariage)}</TableCell>
                      <TableCell>{devis.nb_invites || "Non spécifié"}</TableCell>
                      <TableCell>{devis.type_evenement || "Non spécifié"}</TableCell>
                      <TableCell>{devis.lieu || "Non spécifié"}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          devis.statut === 'accepte' ? 'bg-green-100 text-green-800' :
                          devis.statut === 'refuse' ? 'bg-red-100 text-red-800' :
                          devis.statut === 'envoye' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {devis.statut === 'en_attente' ? 'En attente' :
                           devis.statut === 'envoye' ? 'Envoyé' : 
                           devis.statut === 'accepte' ? 'Accepté' : 
                           devis.statut === 'refuse' ? 'Refusé' : devis.statut}
                        </span>
                      </TableCell>
                      <TableCell>{formatDate(devis.created_at)}</TableCell>
                      <TableCell>
                        <Select 
                          value={devis.statut} 
                          onValueChange={(newStatus) => updateDevisStatus(devis.id, 'mariage', newStatus as "accepte" | "refuse" | "envoye" | "en_attente")}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en_attente">En attente</SelectItem>
                            <SelectItem value="envoye">Envoyé</SelectItem>
                            <SelectItem value="accepte">Accepté</SelectItem>
                            <SelectItem value="refuse">Refusé</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Devis Envoyés Tab */}
        <TabsContent value="devis-envoyes" className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            
            {/* Devis Entreprise Envoyés */}
            <Card>
              <CardHeader>
                <CardTitle>Devis Entreprise Envoyés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[120px]">Client</TableHead>
                        <TableHead className="min-w-[120px]">Entreprise</TableHead>
                        <TableHead className="min-w-[100px]">Montant</TableHead>
                        <TableHead className="min-w-[100px]">Date envoi</TableHead>
                        <TableHead className="min-w-[80px]">Statut</TableHead>
                        <TableHead className="min-w-[150px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                  <TableBody>
                    {devisEntreprise.filter(devis => devis.statut === 'envoye' || devis.statut === 'accepte' || devis.statut === 'refuse').map((devis) => (
                      <TableRow key={devis.id}>
                        <TableCell>{devis.prenom} {devis.nom}</TableCell>
                        <TableCell>{devis.entreprise}</TableCell>
                        <TableCell>{devis.montant_total ? `${devis.montant_total} MAD` : '-'}</TableCell>
                        <TableCell>
                          {devis.date_envoi_devis ? formatDate(devis.date_envoi_devis) : '-'}
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            devis.statut === 'accepte' ? 'bg-green-100 text-green-800' :
                            devis.statut === 'refuse' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {devis.statut === 'envoye' ? 'Envoyé' : 
                             devis.statut === 'accepte' ? 'Accepté' : 'Refusé'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {devis.statut === 'accepte' && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                                onClick={() => generateInvoicePDF(devis.id, 'entreprise')}
                              >
                                <FileText className="h-3 w-3 mr-1" />
                                Facture
                              </Button>
                            )}
                            <Select 
                              value={devis.statut} 
                              onValueChange={(newStatus) => updateDevisStatus(devis.id, 'entreprise', newStatus as "accepte" | "refuse" | "envoye" | "en_attente")}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="envoye">Envoyé</SelectItem>
                                <SelectItem value="accepte">Accepté</SelectItem>
                                <SelectItem value="refuse">Refusé</SelectItem>
                                <SelectItem value="en_attente">En attente</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Devis Événement Envoyés */}
            <Card>
              <CardHeader>
                <CardTitle>Devis Événement Envoyés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[120px]">Clients</TableHead>
                        <TableHead className="min-w-[120px]">Date événement</TableHead>
                        <TableHead className="min-w-[100px]">Type</TableHead>
                        <TableHead className="min-w-[100px]">Montant</TableHead>
                        <TableHead className="min-w-[100px]">Date envoi</TableHead>
                        <TableHead className="min-w-[80px]">Statut</TableHead>
                        <TableHead className="min-w-[150px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                  <TableBody>
                    {devisMariage.filter(devis => devis.statut === 'envoye' || devis.statut === 'accepte' || devis.statut === 'refuse').map((devis) => (
                      <TableRow key={devis.id}>
                        <TableCell>{devis.prenom} {devis.nom}</TableCell>
                        <TableCell>
                          {devis.date_mariage ? formatDate(devis.date_mariage) : '-'}
                        </TableCell>
                        <TableCell>{devis.type_evenement || 'Mariage'}</TableCell>
                        <TableCell>{devis.montant_total ? `${devis.montant_total} MAD` : '-'}</TableCell>
                        <TableCell>
                          {devis.date_envoi_devis ? formatDate(devis.date_envoi_devis) : '-'}
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            devis.statut === 'accepte' ? 'bg-green-100 text-green-800' :
                            devis.statut === 'refuse' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {devis.statut === 'envoye' ? 'Envoyé' : 
                             devis.statut === 'accepte' ? 'Accepté' : 'Refusé'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {devis.statut === 'accepte' && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                                onClick={() => generateInvoicePDF(devis.id, 'mariage')}
                              >
                                <FileText className="h-3 w-3 mr-1" />
                                Facture
                              </Button>
                            )}
                            <Select 
                              value={devis.statut} 
                              onValueChange={(newStatus) => updateDevisStatus(devis.id, 'mariage', newStatus as "accepte" | "refuse" | "envoye" | "en_attente")}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="envoye">Envoyé</SelectItem>
                                <SelectItem value="accepte">Accepté</SelectItem>
                                <SelectItem value="refuse">Refusé</SelectItem>
                                <SelectItem value="en_attente">En attente</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Sécurité Tab */}
        <TabsContent value="securite" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Gestion des Mots de Passe</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800">Information de sécurité</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Cette fonctionnalité permet de changer le mot de passe de n'importe quel membre du personnel. 
                      Utilisée uniquement en cas d'urgence ou de demande du personnel.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="staff-select">Sélectionner le membre du personnel</Label>
                    <Select 
                      value={passwordForm.selectedStaffId} 
                      onValueChange={(value) => setPasswordForm(prev => ({...prev, selectedStaffId: value}))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir un membre du personnel" />
                      </SelectTrigger>
                      <SelectContent>
                        {staff.map((person) => (
                          <SelectItem key={person.id} value={person.id}>
                            {person.prenom} {person.nom} - {person.email}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nouveau mot de passe</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm(prev => ({...prev, newPassword: e.target.value}))}
                      placeholder="Minimum 6 caractères"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm(prev => ({...prev, confirmPassword: e.target.value}))}
                      placeholder="Retaper le mot de passe"
                    />
                  </div>

                  <Button 
                    onClick={changeStaffPassword}
                    disabled={passwordLoading || !passwordForm.selectedStaffId || !passwordForm.newPassword || !passwordForm.confirmPassword}
                    className="w-full"
                  >
                    {passwordLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Changement en cours...
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4 mr-2" />
                        Changer le mot de passe
                      </>
                    )}
                  </Button>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Instructions</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                    <li>Sélectionnez le membre du personnel concerné</li>
                    <li>Saisissez un nouveau mot de passe (minimum 6 caractères)</li>
                    <li>Confirmez le mot de passe</li>
                    <li>Cliquez sur "Changer le mot de passe"</li>
                    <li>Informez la personne de son nouveau mot de passe</li>
                  </ol>
                  
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                    <p className="text-xs text-blue-700">
                      <strong>Conseil :</strong> Demandez au personnel de changer leur mot de passe 
                      lors de leur prochaine connexion pour des raisons de sécurité.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
