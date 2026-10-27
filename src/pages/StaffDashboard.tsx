import Seo from "@/components/Seo";
import { estDemo } from "@/demo/mode";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { FileText, Download, Calendar as CalendarIcon, LogOut, User as UserIcon, ChevronLeft, ChevronRight, Key, Clock, CheckCircle } from "lucide-react";
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, getDay, isWeekend, addDays, isAfter, isBefore } from "date-fns";
import { fr } from "date-fns/locale";
import { TimeSlotSelector } from "@/components/TimeSlotSelector";
import { telechargerContrats } from "@/components/admin/equipe/contratPdf";
import SignatureContrat from "@/components/contrat/SignatureContrat";
import RemarquesContrat from "@/components/contrat/RemarquesContrat";
import { BADGE_SIGNATURE, dateHeureFr, etatSignature, finSignature, limiteSignature } from "@/lib/signature";
import { telechargerFichesPaie } from "@/components/admin/paie/FichesPaieMensuelles";
import MesMissions from "@/components/staff/MesMissions";
import { CarteInstallerStaff, useAppStaff } from "@/components/staff/AppStaff";

interface Contrat {
  id: string;
  titre: string;
  type_contrat: string;
  date_debut: string;
  date_fin?: string;
  salaire_brut?: number;
  heures_prestations?: number;
  taux_horaire?: number;
  description?: string;
  statut: string;
  evenement?: string | null;
  devis_numero?: string | null;
  lieu?: string | null;
  total_heures?: number | null;
  dates?: { date: string; heures: number; heure_debut?: string | null; heure_fin?: string | null }[] | null;
  signe_le?: string | null;
  signature_nom?: string | null;
}

interface FichePaie {
  id: string;
  mois: number;
  annee: number;
  salaire_brut: number;
  salaire_net: number;
  heures_travaillees?: number;
  prime?: number;
  statut: string;
  fichier_pdf_url?: string;
}

interface Disponibilite {
  id?: string;
  date_jour: string;
  disponible: boolean;
  creneau?: 'matin' | 'apres_midi' | 'soir';
  heure_debut?: string;
  heure_fin?: string;
  notes?: string;
}

const StaffDashboard = () => {
  const { t } = useTranslation();
  useAppStaff();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [contrats, setContrats] = useState<Contrat[]>([]);
  const [fichesPaie, setFichesPaie] = useState<FichePaie[]>([]);
  const [disponibilites, setDisponibilites] = useState<Disponibilite[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDatesForSlots, setSelectedDatesForSlots] = useState<Date[]>([]);
  const [showTimeSlotSelector, setShowTimeSlotSelector] = useState(false);
  const [staffInfo, setStaffInfo] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (!session) {
          if (!estDemo()) navigate("/auth");
        } else if (session?.user?.email) {
          loadData();
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) {
        if (!estDemo()) navigate("/auth");
      } else if (session.user?.email) {
        loadData();
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadData = async () => {
    console.log("🔄 loadData appelée");
    const currentSession = await supabase.auth.getSession();
    console.log("📱 Session récupérée:", currentSession.data.session?.user?.email);
    if (!currentSession.data.session?.user?.email) {
      console.log("❌ Pas de session/email valide");
      return;
    }

    try {
      // Récupérer les infos du staff d'abord
      const { data: staffList, error: staffError } = await supabase
        .from("staff")
        .select("*")
        .eq("email", currentSession.data.session.user.email);
      
      const staff = staffList?.[0]; // Prendre le premier si plusieurs existent
      
      if (staffError) {
        console.error("Erreur staff:", staffError);
        toast({
          title: "Compte non trouvé",
          description: "Votre email n'est pas enregistré comme staff. Veuillez vous inscrire d'abord.",
          variant: "destructive",
        });
        return;
      }

      console.log("👤 Staff trouvé:", staff);
      setStaffInfo(staff);

      if (staff) {
        // Récupérer les contrats
        const { data: contratsData } = await supabase
          .from("contrats")
          .select("*")
          .eq("staff_id", staff.id)
          .order("created_at", { ascending: false });
        
        setContrats((contratsData || []) as unknown as Contrat[]);

        // Récupérer les fiches de paie
        const { data: fichesData } = await supabase
          .from("fiches_paie")
          .select("*, paiements_paie(montant, date_paiement)")
          .eq("staff_id", staff.id)
          .order("annee", { ascending: false })
          .order("mois", { ascending: false });
        
        setFichesPaie(fichesData || []);

        // Récupérer les disponibilités pour les 6 prochains mois
        const startDate = startOfMonth(addMonths(new Date(), -1));
        const endDate = endOfMonth(addMonths(new Date(), 6));
        
        const { data: dispoData } = await supabase
          .from("disponibilites")
          .select("*")
          .eq("staff_id", staff.id)
          .gte("date_jour", format(startDate, "yyyy-MM-dd"))
          .lte("date_jour", format(endDate, "yyyy-MM-dd"));
        
        // Convertir les données avec le bon type pour creneau
        const typedDispoData = (dispoData || []).map(item => ({
          ...item,
          creneau: item.creneau as 'matin' | 'apres_midi' | 'soir' | undefined
        }));
        setDisponibilites(typedDispoData);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
    }
  };

  const handleSignOut = async () => {
    if (estDemo()) { window.location.href = "/studio"; return; }
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const updateDisponibilite = async (date: Date, creneau: 'matin' | 'apres_midi' | 'soir', disponible: boolean, notes?: string) => {
    if (!user?.email) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté",
        variant: "destructive",
      });
      return;
    }

    const dateString = format(date, "yyyy-MM-dd");
    
    try {
      // Récupérer le staff ID directement depuis l'état si disponible, sinon depuis la base
      let currentStaffId = staffInfo?.id;
      
      if (!currentStaffId) {
        const { data: staffData, error: staffError } = await supabase
          .from("staff")
          .select("id")
          .eq("email", user.email)
          .maybeSingle();
        
        if (staffError) {
          console.error('Erreur lors de la récupération du staff:', staffError);
          toast({
            title: "Erreur",
            description: "Erreur lors de la récupération du profil",
            variant: "destructive",
          });
          return;
        }
        
        if (!staffData) {
          console.error('Staff non trouvé pour l\'email:', user.email);
          toast({
            title: "Profil staff non trouvé",
            description: `Aucun profil staff trouvé pour l'email: ${user.email}. Contactez l'administrateur.`,
            variant: "destructive",
          });
          return;
        }
        currentStaffId = staffData.id;
      }

      if (disponible) {
        // Insérer ou mettre à jour la disponibilité
        const { error } = await supabase
          .from("disponibilites")
          .upsert({
            staff_id: currentStaffId,
            date_jour: dateString,
            creneau,
            disponible: true,
            notes: notes || null,
          }, {
            onConflict: 'staff_id,date_jour,creneau'
          });

        if (error) throw error;
      } else {
        // Supprimer la disponibilité
        const { error } = await supabase
          .from("disponibilites")
          .delete()
          .eq("staff_id", currentStaffId)
          .eq("date_jour", dateString)
          .eq("creneau", creneau);

        if (error) throw error;
      }

      // Recharger les données
      await loadData();
      
      toast({
        title: "Succès",
        description: `Disponibilité ${disponible ? 'ajoutée' : 'supprimée'} pour le ${format(date, "dd/MM/yyyy")}`,
      });

    } catch (error: any) {
      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description: error.message || "Impossible de mettre à jour la disponibilité",
        variant: "destructive",
      });
    }
  };

  const getSlotsForDate = (dates: Date[]) => {
    if (dates.length === 0) return [];
    
    // Pour l'affichage, on prend les créneaux de la première date sélectionnée
    const firstDate = dates[0];
    const dateString = format(firstDate, "yyyy-MM-dd");
    return disponibilites.filter(d => d.date_jour === dateString && d.creneau).map(slot => ({
      id: slot.id || '',
      creneau: slot.creneau!,
      disponible: slot.disponible,
      notes: slot.notes
    }));
  };

  const hasAnySlotForDate = (date: Date) => {
    return getSlotsForDate([date]).some(slot => slot.disponible);
  };

  const handleDateClick = (date: Date) => {
    console.log("📅 handleDateClick appelé pour:", format(date, "yyyy-MM-dd"));
    setSelectedDatesForSlots([date]);
    console.log("📅 selectedDatesForSlots sera:", [date]);
    setShowTimeSlotSelector(true);
    console.log("📅 showTimeSlotSelector sera:", true);
  };

  const handleSlotUpdate = async (creneau: 'matin' | 'apres_midi' | 'soir', disponible: boolean, notes?: string) => {
    console.log("🎯 handleSlotUpdate appelée avec:", { creneau, disponible, notes });
    console.log("📅 selectedDatesForSlots:", selectedDatesForSlots);
    
    if (selectedDatesForSlots.length > 0) {
      console.log("✅ Va appeler updateDisponibilite pour toutes les dates");
      // Appliquer à toutes les dates sélectionnées
      for (const date of selectedDatesForSlots) {
        console.log("🔄 Appel updateDisponibilite pour:", format(date, "yyyy-MM-dd"));
        try {
          await updateDisponibilite(date, creneau, disponible, notes);
          console.log("✅ updateDisponibilite terminée pour:", format(date, "yyyy-MM-dd"));
        } catch (error) {
          console.error("❌ Erreur dans updateDisponibilite pour:", format(date, "yyyy-MM-dd"), error);
        }
      }
    } else {
      console.log("❌ Pas de selectedDatesForSlots");
    }
  };

  const handleCustomSlotUpdate = async (slot: { id?: string; heure_debut: string; heure_fin: string; disponible: boolean; notes?: string }, isNew = false) => {
    if (!staffInfo || selectedDatesForSlots.length === 0) return;

    // Appliquer à toutes les dates sélectionnées
    for (const date of selectedDatesForSlots) {
      const dateString = format(date, "yyyy-MM-dd");
      
      try {
        const slotData = {
          staff_id: staffInfo.id,
          date_jour: dateString,
          heure_debut: slot.heure_debut,
          heure_fin: slot.heure_fin,
          disponible: slot.disponible,
          notes: slot.notes || null,
          creneau: null // Les créneaux personnalisés n'ont pas de créneau prédéfini
        };

        if (isNew || !slot.id) {
          const { error } = await supabase
            .from("disponibilites")
            .insert(slotData);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from("disponibilites")
            .update(slotData)
            .eq("id", slot.id);
          if (error) throw error;
        }
      } catch (error) {
        console.error("Erreur:", error);
        toast({
          title: "Erreur",
          description: `Impossible de mettre à jour le créneau pour le ${format(date, "dd/MM/yyyy")}`,
          variant: "destructive",
        });
        return;
      }
    }

    // Recharger les disponibilités
    await loadData();
    
    toast({
      title: "Créneaux mis à jour",
      description: `Créneau ${slot.heure_debut}-${slot.heure_fin} appliqué à ${selectedDatesForSlots.length} date(s)`,
    });
  };

  const handleDeleteCustomSlot = async (slotId: string) => {
    try {
      const { error } = await supabase
        .from("disponibilites")
        .delete()
        .eq("id", slotId);

      if (error) throw error;

      // Recharger les disponibilités
      await loadData();
      
      toast({
        title: "Créneau supprimé",
        description: "Le créneau a été supprimé avec succès",
      });
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le créneau",
        variant: "destructive",
      });
    }
  };

  // Fonction pour calculer le 5ème jour ouvrable du mois
  const [telechargement, setTelechargement] = useState<string | null>(null);
  const [aSigner, setASigner] = useState<Contrat | null>(null);

  // Contrat : PDF généré directement dans le navigateur (contrat + conditions)
  const downloadContractPDF = async (contractId: string) => {
    setTelechargement(contractId);
    try {
      await telechargerContrats([contractId]);
      toast({ title: "Contrat téléchargé", description: "Le PDF a été enregistré" });
    } catch (error) {
      console.error('Erreur génération contrat:', error);
      toast({ title: "Erreur", description: "Impossible de télécharger le contrat", variant: "destructive" });
    } finally {
      setTelechargement(null);
    }
  };

  // Fiche de paie : PDF généré directement dans le navigateur
  const downloadPayslipPDF = async (payslipId: string) => {
    setTelechargement(payslipId);
    try {
      await telechargerFichesPaie([payslipId]);
      toast({ title: "Fiche de paie téléchargée", description: "Le PDF a été enregistré" });
    } catch (error) {
      console.error('Erreur génération fiche de paie:', error);
      toast({ title: "Erreur", description: "Impossible de télécharger la fiche de paie", variant: "destructive" });
    } finally {
      setTelechargement(null);
    }
  };

  const getCustomSlotsForDate = (dates: Date[]) => {
    if (dates.length === 0) return [];
    
    // Pour l'affichage, on prend les créneaux de la première date sélectionnée
    const firstDate = dates[0];
    const dateString = format(firstDate, "yyyy-MM-dd");
    return disponibilites
      .filter(d => d.date_jour === dateString && !d.creneau && d.heure_debut && d.heure_fin)
      .map(slot => ({
        id: slot.id,
        heure_debut: slot.heure_debut!,
        heure_fin: slot.heure_fin!,
        disponible: slot.disponible,
        notes: slot.notes
      }));
  };

  const generateCalendarDays = () => {
    const startDate = startOfMonth(selectedDate);
    const endDate = endOfMonth(selectedDate);
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    
    // Ajouter les jours du mois précédent pour remplir la première semaine
    const firstDayOfWeek = getDay(startDate);
    const startPadding = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1; // Lundi = 0
    
    const paddingDays = [];
    for (let i = startPadding; i > 0; i--) {
      const paddingDate = new Date(startDate);
      paddingDate.setDate(paddingDate.getDate() - i);
      paddingDays.push(paddingDate);
    }
    
    return [...paddingDays, ...days];
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Chargement...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      <Seo noindex />
      <div className="container mx-auto p-2 sm:p-4 space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white rounded-lg p-3 sm:p-4 shadow-sm space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <UserIcon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            <div>
              <h1 className="text-lg sm:text-2xl font-bold">{t('dashboard.staff_space')}</h1>
              <p className="text-sm sm:text-base text-muted-foreground truncate max-w-[200px] sm:max-w-none">
                {staffInfo ? `${staffInfo.prenom} ${staffInfo.nom}` : user.email}
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={handleSignOut} className="w-full sm:w-auto text-sm">
            <LogOut className="h-4 w-4 mr-2" />
            <span className="sm:inline">{t('dashboard.logout')}</span>
          </Button>
        </div>

        <CarteInstallerStaff />

        <MesMissions />

        <Tabs defaultValue="contrats" className="space-y-3 sm:space-y-4">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1">
            <TabsTrigger value="contrats" className="text-xs sm:text-sm py-2">{t('dashboard.contracts_tab')}</TabsTrigger>
            <TabsTrigger value="paie" className="text-xs sm:text-sm py-2">{t('dashboard.payslips_tab')}</TabsTrigger>
            <TabsTrigger value="disponibilites" className="text-xs sm:text-sm py-2">{t('dashboard.availability_tab')}</TabsTrigger>
          </TabsList>

          {/* Contrats */}
          <TabsContent value="contrats">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  {t('dashboard.contracts.title')}
                </CardTitle>
                <CardDescription>
                  {t('dashboard.contracts.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {contrats.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    {t('dashboard.contracts.no_contracts')}
                  </p>
                ) : (
                  <div className="space-y-4">
                    {contrats.map((contrat) => {
                      const lignes = (contrat.dates ?? []).slice().sort((x, y) => x.date.localeCompare(y.date));
                      return (
                        <div key={contrat.id} className="border rounded-lg p-3 sm:p-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                            <div>
                              <h3 className="font-semibold text-sm sm:text-base">{contrat.evenement || contrat.titre}</h3>
                              <p className="text-xs text-muted-foreground">{[contrat.titre, contrat.lieu, contrat.devis_numero].filter(Boolean).join(" · ")}</p>
                            </div>
                            {(() => { const b = BADGE_SIGNATURE[etatSignature(contrat)]; return <span className={`text-xs font-medium rounded-full px-2.5 py-1 ${b.classe}`}>{b.texte}</span>; })()}
                          </div>
                          <div className="space-y-1 text-sm">
                            {lignes.length > 0 ? (
                              <div>
                                <span className="font-medium">Dates :</span>
                                <ul className="mt-1 space-y-0.5">
                                  {lignes.map((l) => (
                                    <li key={l.date} className="text-sm">
                                      {format(new Date(l.date + "T12:00:00"), "EEEE dd MMMM yyyy", { locale: fr })}
                                      {l.heure_debut && l.heure_fin ? ` · ${l.heure_debut.slice(0, 5)} – ${l.heure_fin.slice(0, 5)}` : ""} · {l.heures} h
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : (
                              <p><span className="font-medium">{t('dashboard.contracts.start')}:</span> {format(new Date(contrat.date_debut), "dd MMMM yyyy", { locale: fr })}</p>
                            )}
                            {contrat.taux_horaire && (
                              <p><span className="font-medium">{t('dashboard.contracts.hourly_rate')}:</span> {contrat.taux_horaire} DH/h</p>
                            )}
                            {contrat.salaire_brut && (
                              <p><span className="font-medium">{t('dashboard.contracts.gross_salary')}:</span> {contrat.salaire_brut} DH{contrat.total_heures ? ` (${contrat.total_heures} h)` : ""}</p>
                            )}
                          </div>
                          {etatSignature(contrat) === "a_signer" && (
                            <div className="mt-3 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm">
                              <div className="font-medium text-amber-900">✍️ Ce contrat attend ta signature</div>
                              <div className="text-amber-800 text-xs mb-2">Merci de le signer avant le {dateHeureFr(limiteSignature(contrat))} (24 h avant la mission). Dernier délai : {dateHeureFr(finSignature(contrat))}.</div>
                              <Button size="sm" onClick={() => setASigner(contrat)}>Lire et signer mon contrat</Button>
                            </div>
                          )}
                          {etatSignature(contrat) === "en_retard" && (
                            <div className="mt-3 rounded-md border border-orange-300 bg-orange-50 p-3 text-sm">
                              <div className="font-medium text-orange-900">⏰ Signature en retard</div>
                              <div className="text-orange-800 text-xs mb-2">Ce contrat devait être signé 24 h avant la mission. Tu peux encore le signer jusqu'au {dateHeureFr(finSignature(contrat))} — un rappel t'est envoyé par e-mail tous les 2 jours.</div>
                              <Button size="sm" onClick={() => setASigner(contrat)}>Lire et signer mon contrat</Button>
                            </div>
                          )}
                          {etatSignature(contrat) === "ferme" && (
                            <div className="mt-3 rounded-md border border-red-200 bg-red-50 p-3 text-xs text-red-800">Le délai de signature (fin du mois de la mission) est dépassé. Contacte l'agence.</div>
                          )}
                          {contrat.signe_le && (
                            <div className="mt-3 text-xs text-emerald-800">Signé le {dateHeureFr(contrat.signe_le)}{contrat.signature_nom ? ` par ${contrat.signature_nom}` : ""}.</div>
                          )}
                          <div className="mt-3">
                            <Button variant="outline" size="sm" onClick={() => downloadContractPDF(contrat.id)} disabled={telechargement === contrat.id} className="text-xs sm:text-sm">
                              <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                              {telechargement === contrat.id ? "Création du PDF…" : "Télécharger mon contrat (PDF)"}
                            </Button>
                          </div>
                          {staffInfo?.id && <RemarquesContrat contrat={contrat} staffId={staffInfo.id} />}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Fiches de paie */}
          <TabsContent value="paie">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="h-5 w-5 mr-2" />
                  {t('dashboard.payslips.title')}
                </CardTitle>
                <CardDescription>
                  {t('dashboard.payslips.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {fichesPaie.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    {t('dashboard.payslips.no_payslips')}
                  </p>
                ) : (
                  <div className="space-y-4">
                    {fichesPaie.map((fiche) => (
                      <div key={fiche.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold capitalize">
                            {format(new Date(fiche.annee, fiche.mois - 1), "MMMM yyyy", { locale: fr })}
                          </h3>
                          <Badge variant={fiche.statut === "paye" ? "default" : "secondary"}>
                            {fiche.statut === "paye" ? <><CheckCircle className="h-3 w-3 mr-1" /> Payée</> : fiche.statut === "valide" || fiche.statut === "validee" ? "Validée" : <><Clock className="h-3 w-3 mr-1" /> En préparation</>}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p><span className="font-medium">{t('dashboard.payslips.gross_salary')}:</span> {fiche.salaire_brut} DH</p>
                            <p><span className="font-medium">{t('dashboard.payslips.net_salary')}:</span> {fiche.salaire_net} DH</p>
                            {(fiche as any).paiements_paie?.length ? (
                              <p data-testid="crew-paye"><span className="font-medium">Payé :</span> {(fiche as any).paiements_paie.reduce((t: number, p: any) => t + Number(p.montant || 0), 0)} DH
                                {" "}(le {format(new Date((fiche as any).paiements_paie.filter((p: any) => Number(p.montant) > 0).map((p: any) => p.date_paiement).sort().pop() + "T12:00:00"), "dd/MM/yyyy")})</p>
                            ) : null}
                          </div>
                          <div>
                            {fiche.heures_travaillees ? (
                              <p><span className="font-medium">{t('dashboard.payslips.hours')}:</span> {fiche.heures_travaillees}h</p>
                            ) : null}
                            {fiche.prime && fiche.prime > 0 ? (
                              <p><span className="font-medium">{t('dashboard.payslips.bonus')}:</span> {fiche.prime} DH</p>
                            ) : null}
                          </div>
                        </div>
                        <div className="mt-3">
                          <Button variant="outline" size="sm" onClick={() => downloadPayslipPDF(fiche.id)} disabled={telechargement === fiche.id}>
                            <Download className="h-4 w-4 mr-2" />
                            {telechargement === fiche.id ? "Création du PDF…" : t('dashboard.payslips.download_pdf')}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Disponibilités */}
          <TabsContent value="disponibilites">
            {showTimeSlotSelector && selectedDatesForSlots.length > 0 ? (
              <div className="pointer-events-auto">
                <TimeSlotSelector
                  selectedDate={selectedDatesForSlots[0]}
                  selectedDates={selectedDatesForSlots}
                  timeSlots={getSlotsForDate(selectedDatesForSlots)}
                  customTimeSlots={getCustomSlotsForDate(selectedDatesForSlots)}
                  onUpdateSlot={handleSlotUpdate}
                  onUpdateCustomSlot={handleCustomSlotUpdate}
                  onDeleteCustomSlot={handleDeleteCustomSlot}
                  onClose={() => setShowTimeSlotSelector(false)}
                />
              </div>
            ) : (
              <div className="space-y-6">
                {/* Sélection multiple de dates */}
                <Card>
                  <CardHeader>
                     <CardTitle>{t('dashboard.availability.multiple_selection')}</CardTitle>
                     <CardDescription>
                       {t('dashboard.availability.multiple_description')}
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Calendar
                        mode="multiple"
                        selected={selectedDatesForSlots}
                        onSelect={(dates) => setSelectedDatesForSlots(dates || [])}
                        className="rounded-md border pointer-events-auto"
                      />
                      
                      {selectedDatesForSlots.length > 0 && (
                        <div className="mt-4 p-3 bg-muted rounded-md">
                          <p className="text-sm font-medium mb-2">{t('dashboard.availability.selected_dates')}</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedDatesForSlots.map((date, index) => (
                              <Badge key={index} variant="outline">
                                {format(date, "dd/MM/yyyy")}
                              </Badge>
                            ))}
                          </div>
                          <Button 
                            onClick={() => setShowTimeSlotSelector(true)}
                            className="mt-3"
                          >
                            {t('dashboard.availability.manage_slots')}
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Calendrier mensuel existant */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CalendarIcon className="h-5 w-5 mr-2" />
                       {t('dashboard.availability.title')}
                     </CardTitle>
                     <CardDescription>
                       {t('dashboard.availability.description')}
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Navigation mensuelle */}
                      <div className="flex items-center justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedDate(prev => addMonths(prev, -1))}
                        >
                          <ChevronLeft className="h-4 w-4 mr-2" />
                          {t('dashboard.availability.previous')}
                        </Button>
                        <h3 className="text-xl font-semibold">
                          {format(selectedDate, "MMMM yyyy", { locale: fr })}
                        </h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedDate(prev => addMonths(prev, 1))}
                        >
                          {t('dashboard.availability.next')}
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>

                      {/* Calendrier amélioré */}
                      <div className="border rounded-lg overflow-hidden">
                        {/* En-têtes des jours */}
                        <div className="grid grid-cols-7 bg-muted/50">
                          {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(day => (
                            <div key={day} className="p-3 text-center font-medium text-sm border-r last:border-r-0">
                              {day}
                            </div>
                          ))}
                        </div>
                        
                        {/* Grille du calendrier */}
                        <div className="grid grid-cols-7">
                          {generateCalendarDays().map((date, index) => {
                            const slots = getSlotsForDate([date]);
                            const hasAvailableSlots = hasAnySlotForDate(date);
                            const isToday = isSameDay(date, new Date());
                            const isCurrentMonth = date.getMonth() === selectedDate.getMonth();
                            
                            return (
                              <div
                                key={`${date.toISOString()}-${index}`}
                                className={`min-h-[80px] border-r border-b last:border-r-0 p-2 cursor-pointer hover:bg-accent/5 transition-colors ${
                                  !isCurrentMonth ? "text-muted-foreground bg-muted/20" : ""
                                } ${isToday ? "bg-primary/5 border-primary/30" : ""}`}
                                onClick={() => isCurrentMonth ? handleDateClick(date) : null}
                              >
                                <div className={`text-sm font-medium mb-1 ${isToday ? "text-primary" : ""}`}>
                                  {format(date, "d")}
                                </div>
                                
                                {/* Indicateurs de créneaux */}
                                {isCurrentMonth && (
                                  <div className="space-y-1">
                                    {['matin', 'apres_midi', 'soir'].map(creneau => {
                                      const slot = slots.find(s => s.creneau === creneau);
                                      if (!slot?.disponible) return null;
                                      
                                      return (
                                        <div 
                                          key={creneau}
                                          className={`text-xs px-1 py-0.5 rounded text-center ${
                                            creneau === 'matin' ? 'bg-yellow-100 text-yellow-800' :
                                            creneau === 'apres_midi' ? 'bg-orange-100 text-orange-800' :
                                            'bg-blue-100 text-blue-800'
                                          }`}
                                        >
                                          {creneau === 'matin' ? 'M' : 
                                           creneau === 'apres_midi' ? 'AM' : 'S'}
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Légende */}
                      <div className="bg-muted/30 rounded-lg p-4">
                         <h4 className="font-medium mb-2">{t('dashboard.availability.legend')}</h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                           <div className="flex items-center space-x-2">
                             <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
                             <span>{t('dashboard.availability.morning')}</span>
                           </div>
                           <div className="flex items-center space-x-2">
                             <div className="w-4 h-4 bg-orange-100 border border-orange-300 rounded"></div>
                             <span>{t('dashboard.availability.afternoon')}</span>
                           </div>
                           <div className="flex items-center space-x-2">
                             <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
                             <span>{t('dashboard.availability.evening')}</span>
                           </div>
                           <div className="text-muted-foreground">
                             <span>{t('dashboard.availability.click_date')}</span>
                           </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        <SignatureContrat contrat={aSigner} nomStaff={staffInfo ? `${staffInfo.prenom} ${staffInfo.nom}` : ""} onClose={() => setASigner(null)} onSigne={loadData} />
        </Tabs>

      </div>
    </div>
  );
};

export default StaffDashboard;