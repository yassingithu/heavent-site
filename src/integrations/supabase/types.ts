export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      affectations: {
        Row: {
          contrat_id: string | null
          created_at: string
          date_jour: string
          devis_id: string
          heure_debut: string | null
          heure_fin: string | null
          heures: number
          id: string
          poste: string
          staff_id: string
          statut: string
          taux_horaire: number
        }
        Insert: {
          contrat_id?: string | null
          created_at?: string
          date_jour: string
          devis_id: string
          heure_debut?: string | null
          heure_fin?: string | null
          heures?: number
          id?: string
          poste?: string
          staff_id: string
          statut?: string
          taux_horaire?: number
        }
        Update: {
          contrat_id?: string | null
          created_at?: string
          date_jour?: string
          devis_id?: string
          heure_debut?: string | null
          heure_fin?: string | null
          heures?: number
          id?: string
          poste?: string
          staff_id?: string
          statut?: string
          taux_horaire?: number
        }
        Relationships: [
          { foreignKeyName: "affectations_devis_id_fkey"; columns: ["devis_id"]; isOneToOne: false; referencedRelation: "devis"; referencedColumns: ["id"] },
          { foreignKeyName: "affectations_staff_id_fkey"; columns: ["staff_id"]; isOneToOne: false; referencedRelation: "staff"; referencedColumns: ["id"] },
        ]
      }
      contrats: {
        Row: {
          devis_id: string | null
          dates: Json | null
          lieu: string | null
          total_heures: number | null
          created_at: string
          date_debut: string
          date_fin: string | null
          description: string | null
          fichier_url: string | null
          heures_prestations: number | null
          id: string
          salaire_brut: number | null
          staff_id: string
          statut: string
          taux_horaire: number | null
          titre: string
          type_contrat: string
          updated_at: string
        }
        Insert: {
          devis_id?: string | null
          dates?: Json | null
          lieu?: string | null
          total_heures?: number | null
          created_at?: string
          date_debut: string
          date_fin?: string | null
          description?: string | null
          fichier_url?: string | null
          heures_prestations?: number | null
          id?: string
          salaire_brut?: number | null
          staff_id: string
          statut?: string
          taux_horaire?: number | null
          titre: string
          type_contrat: string
          updated_at?: string
        }
        Update: {
          devis_id?: string | null
          dates?: Json | null
          lieu?: string | null
          total_heures?: number | null
          created_at?: string
          date_debut?: string
          date_fin?: string | null
          description?: string | null
          fichier_url?: string | null
          heures_prestations?: number | null
          id?: string
          salaire_brut?: number | null
          staff_id?: string
          statut?: string
          taux_horaire?: number | null
          titre?: string
          type_contrat?: string
          updated_at?: string
        }
        Relationships: [
          { foreignKeyName: "contrats_devis_id_fkey"; columns: ["devis_id"]; isOneToOne: false; referencedRelation: "devis"; referencedColumns: ["id"] },
          {
            foreignKeyName: "contrats_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      devis_entreprise: {
        Row: {
          created_at: string | null
          date_envoi_devis: string | null
          date_evenement: string | null
          email: string
          entreprise: string
          id: string
          lieu: string | null
          montant_total: number | null
          nb_personnes: number | null
          nb_staff: number | null
          nom: string
          prenom: string
          remarques: string | null
          services: string | null
          statut: string | null
          tarifs_envoyes: Json | null
          telephone: string | null
        }
        Insert: {
          created_at?: string | null
          date_envoi_devis?: string | null
          date_evenement?: string | null
          email: string
          entreprise: string
          id?: string
          lieu?: string | null
          montant_total?: number | null
          nb_personnes?: number | null
          nb_staff?: number | null
          nom: string
          prenom: string
          remarques?: string | null
          services?: string | null
          statut?: string | null
          tarifs_envoyes?: Json | null
          telephone?: string | null
        }
        Update: {
          created_at?: string | null
          date_envoi_devis?: string | null
          date_evenement?: string | null
          email?: string
          entreprise?: string
          id?: string
          lieu?: string | null
          montant_total?: number | null
          nb_personnes?: number | null
          nb_staff?: number | null
          nom?: string
          prenom?: string
          remarques?: string | null
          services?: string | null
          statut?: string | null
          tarifs_envoyes?: Json | null
          telephone?: string | null
        }
        Relationships: []
      }
      devis_mariage: {
        Row: {
          created_at: string | null
          date_envoi_devis: string | null
          date_mariage: string | null
          email: string
          id: string
          lieu: string | null
          montant_total: number | null
          nb_invites: number | null
          nom: string
          prenom: string
          remarques: string | null
          services: string | null
          statut: string | null
          tarifs_envoyes: Json | null
          telephone: string | null
          type_evenement: string | null
        }
        Insert: {
          created_at?: string | null
          date_envoi_devis?: string | null
          date_mariage?: string | null
          email: string
          id?: string
          lieu?: string | null
          montant_total?: number | null
          nb_invites?: number | null
          nom: string
          prenom: string
          remarques?: string | null
          services?: string | null
          statut?: string | null
          tarifs_envoyes?: Json | null
          telephone?: string | null
          type_evenement?: string | null
        }
        Update: {
          created_at?: string | null
          date_envoi_devis?: string | null
          date_mariage?: string | null
          email?: string
          id?: string
          lieu?: string | null
          montant_total?: number | null
          nb_invites?: number | null
          nom?: string
          prenom?: string
          remarques?: string | null
          services?: string | null
          statut?: string | null
          tarifs_envoyes?: Json | null
          telephone?: string | null
          type_evenement?: string | null
        }
        Relationships: []
      }
      disponibilites: {
        Row: {
          created_at: string
          creneau: string | null
          date_jour: string
          disponible: boolean
          heure_debut: string | null
          heure_fin: string | null
          id: string
          notes: string | null
          staff_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          creneau?: string | null
          date_jour: string
          disponible?: boolean
          heure_debut?: string | null
          heure_fin?: string | null
          id?: string
          notes?: string | null
          staff_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          creneau?: string | null
          date_jour?: string
          disponible?: boolean
          heure_debut?: string | null
          heure_fin?: string | null
          id?: string
          notes?: string | null
          staff_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "disponibilites_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      fiches_paie: {
        Row: {
          details: Json | null
          cnss: number | null
          amo: number | null
          generee_auto: boolean
          annee: number
          created_at: string
          deductions: number | null
          fichier_pdf_url: string | null
          heures_travaillees: number | null
          id: string
          mois: number
          prime: number | null
          salaire_brut: number
          salaire_net: number
          staff_id: string
          statut: string
          updated_at: string
        }
        Insert: {
          details?: Json | null
          cnss?: number | null
          amo?: number | null
          generee_auto?: boolean
          annee: number
          created_at?: string
          deductions?: number | null
          fichier_pdf_url?: string | null
          heures_travaillees?: number | null
          id?: string
          mois: number
          prime?: number | null
          salaire_brut: number
          salaire_net: number
          staff_id: string
          statut?: string
          updated_at?: string
        }
        Update: {
          details?: Json | null
          cnss?: number | null
          amo?: number | null
          generee_auto?: boolean
          annee?: number
          created_at?: string
          deductions?: number | null
          fichier_pdf_url?: string | null
          heures_travaillees?: number | null
          id?: string
          mois?: number
          prime?: number | null
          salaire_brut?: number
          salaire_net?: number
          staff_id?: string
          statut?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fiches_paie_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      catalogue_prestations: {
        Row: {
          actif: boolean
          categorie: string
          created_at: string
          description: string | null
          designation: string
          id: string
          ordre: number
          prix_unitaire: number
          unite: string
          updated_at: string
        }
        Insert: {
          actif?: boolean
          categorie?: string
          created_at?: string
          description?: string | null
          designation: string
          id?: string
          ordre?: number
          prix_unitaire?: number
          unite?: string
          updated_at?: string
        }
        Update: {
          actif?: boolean
          categorie?: string
          created_at?: string
          description?: string | null
          designation?: string
          id?: string
          ordre?: number
          prix_unitaire?: number
          unite?: string
          updated_at?: string
        }
        Relationships: []
      }
      devis: {
        Row: {
          acompte_pct: number
          client_adresse: string | null
          client_email: string | null
          client_ice: string | null
          client_nom: string
          client_societe: string | null
          client_telephone: string | null
          conditions: string | null
          created_at: string
          date_emission: string
          date_envoi: string | null
          date_evenement: string | null
          date_fin_evenement: string | null
          date_validite: string | null
          demande_entreprise_id: string | null
          demande_mariage_id: string | null
          devise: string
          id: string
          lieu: string | null
          nb_personnes: number | null
          notes_internes: string | null
          numero: string | null
          remise_globale_pct: number
          statut: string
          taux_tva: number
          titre: string | null
          total_ht: number
          total_remise: number
          total_ttc: number
          total_tva: number
          type: string
          updated_at: string
        }
        Insert: {
          acompte_pct?: number
          client_adresse?: string | null
          client_email?: string | null
          client_ice?: string | null
          client_nom: string
          client_societe?: string | null
          client_telephone?: string | null
          conditions?: string | null
          created_at?: string
          date_emission?: string
          date_envoi?: string | null
          date_evenement?: string | null
          date_fin_evenement?: string | null
          date_validite?: string | null
          demande_entreprise_id?: string | null
          demande_mariage_id?: string | null
          devise?: string
          id?: string
          lieu?: string | null
          nb_personnes?: number | null
          notes_internes?: string | null
          numero?: string | null
          remise_globale_pct?: number
          statut?: string
          taux_tva?: number
          titre?: string | null
          total_ht?: number
          total_remise?: number
          total_ttc?: number
          total_tva?: number
          type?: string
          updated_at?: string
        }
        Update: {
          acompte_pct?: number
          client_adresse?: string | null
          client_email?: string | null
          client_ice?: string | null
          client_nom?: string
          client_societe?: string | null
          client_telephone?: string | null
          conditions?: string | null
          created_at?: string
          date_emission?: string
          date_envoi?: string | null
          date_evenement?: string | null
          date_fin_evenement?: string | null
          date_validite?: string | null
          demande_entreprise_id?: string | null
          demande_mariage_id?: string | null
          devise?: string
          id?: string
          lieu?: string | null
          nb_personnes?: number | null
          notes_internes?: string | null
          numero?: string | null
          remise_globale_pct?: number
          statut?: string
          taux_tva?: number
          titre?: string | null
          total_ht?: number
          total_remise?: number
          total_ttc?: number
          total_tva?: number
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      devis_lignes: {
        Row: {
          created_at: string
          description: string | null
          designation: string
          devis_id: string
          duree: number
          id: string
          ordre: number
          prix_unitaire: number
          quantite: number
          remise_pct: number
          total_ht: number | null
          unite: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          designation: string
          devis_id: string
          duree?: number
          id?: string
          ordre?: number
          prix_unitaire?: number
          quantite?: number
          remise_pct?: number
          total_ht?: number | null
          unite?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          designation?: string
          devis_id?: string
          duree?: number
          id?: string
          ordre?: number
          prix_unitaire?: number
          quantite?: number
          remise_pct?: number
          total_ht?: number | null
          unite?: string
        }
        Relationships: [
          {
            foreignKeyName: "devis_lignes_devis_id_fkey"
            columns: ["devis_id"]
            isOneToOne: false
            referencedRelation: "devis"
            referencedColumns: ["id"]
          },
        ]
      }
      parametres_agence: {
        Row: {
          adresse: string | null
          conditions: string | null
          devise: string
          email: string | null
          ice: string | null
          id: number
          if_fiscal: string | null
          patente: string | null
          raison_sociale: string
          rc: string | null
          rib: string | null
          site_web: string | null
          taux_tva: number
          telephone: string | null
          updated_at: string
          validite_jours: number
          ville: string | null
        }
        Insert: {
          adresse?: string | null
          conditions?: string | null
          devise?: string
          email?: string | null
          ice?: string | null
          id?: number
          if_fiscal?: string | null
          patente?: string | null
          raison_sociale?: string
          rc?: string | null
          rib?: string | null
          site_web?: string | null
          taux_tva?: number
          telephone?: string | null
          updated_at?: string
          validite_jours?: number
          ville?: string | null
        }
        Update: {
          adresse?: string | null
          conditions?: string | null
          devise?: string
          email?: string | null
          ice?: string | null
          id?: number
          if_fiscal?: string | null
          patente?: string | null
          raison_sociale?: string
          rc?: string | null
          rib?: string | null
          site_web?: string | null
          taux_tva?: number
          telephone?: string | null
          updated_at?: string
          validite_jours?: number
          ville?: string | null
        }
        Relationships: []
      }
      staff: {
        Row: {
          taux_horaire: number
          updated_at: string | null
          adresse_complete: string | null
          age: number | null
          code_postal: string | null
          competences: string | null
          couleur_cheveux: string | null
          couleur_yeux: string | null
          created_at: string | null
          date_naissance: string | null
          disponibilites: string | null
          email: string
          experience: string | null
          genre: string | null
          iban: string | null
          id: string
          identite: string | null
          langues: string | null
          lieu_naissance: string | null
          nationalite: string | null
          niveau_etudes: string | null
          nom: string
          nom_urgence: string | null
          numero_identite: string | null
          numero_securite_sociale: string | null
          permis: boolean | null
          photo: string | null
          photo_plein_pied: string | null
          pointure: string | null
          prenom: string
          remarques: string | null
          situation_familiale: string | null
          taille: number | null
          taille_confection: string | null
          taille_haut: string | null
          taille_pantalon: string | null
          telephone: string | null
          telephone_urgence: string | null
          ville: string | null
        }
        Insert: {
          taux_horaire?: number
          updated_at?: string | null
          adresse_complete?: string | null
          age?: number | null
          code_postal?: string | null
          competences?: string | null
          couleur_cheveux?: string | null
          couleur_yeux?: string | null
          created_at?: string | null
          date_naissance?: string | null
          disponibilites?: string | null
          email: string
          experience?: string | null
          genre?: string | null
          iban?: string | null
          id?: string
          identite?: string | null
          langues?: string | null
          lieu_naissance?: string | null
          nationalite?: string | null
          niveau_etudes?: string | null
          nom: string
          nom_urgence?: string | null
          numero_identite?: string | null
          numero_securite_sociale?: string | null
          permis?: boolean | null
          photo?: string | null
          photo_plein_pied?: string | null
          pointure?: string | null
          prenom: string
          remarques?: string | null
          situation_familiale?: string | null
          taille?: number | null
          taille_confection?: string | null
          taille_haut?: string | null
          taille_pantalon?: string | null
          telephone?: string | null
          telephone_urgence?: string | null
          ville?: string | null
        }
        Update: {
          taux_horaire?: number
          updated_at?: string | null
          adresse_complete?: string | null
          age?: number | null
          code_postal?: string | null
          competences?: string | null
          couleur_cheveux?: string | null
          couleur_yeux?: string | null
          created_at?: string | null
          date_naissance?: string | null
          disponibilites?: string | null
          email?: string
          experience?: string | null
          genre?: string | null
          iban?: string | null
          id?: string
          identite?: string | null
          langues?: string | null
          lieu_naissance?: string | null
          nationalite?: string | null
          niveau_etudes?: string | null
          nom?: string
          nom_urgence?: string | null
          numero_identite?: string | null
          numero_securite_sociale?: string | null
          permis?: boolean | null
          photo?: string | null
          photo_plein_pied?: string | null
          pointure?: string | null
          prenom?: string
          remarques?: string | null
          situation_familiale?: string | null
          taille?: number | null
          taille_confection?: string | null
          taille_haut?: string | null
          taille_pantalon?: string | null
          telephone?: string | null
          telephone_urgence?: string | null
          ville?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: Record<PropertyKey, never>; Returns: boolean }
      staff_email_exists: { Args: { p_email: string }; Returns: boolean }
      generer_fiches_paie: { Args: { p_annee: number; p_mois: number }; Returns: number }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
