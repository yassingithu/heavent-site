-- Créer les tables pour l'espace staff

-- Table des contrats de travail
CREATE TABLE public.contrats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  staff_id UUID NOT NULL REFERENCES public.staff(id) ON DELETE CASCADE,
  titre TEXT NOT NULL,
  type_contrat TEXT NOT NULL, -- 'cdi', 'cdd', 'interim', 'freelance'
  date_debut DATE NOT NULL,
  date_fin DATE,
  salaire_brut DECIMAL(10,2),
  description TEXT,
  fichier_url TEXT,
  statut TEXT NOT NULL DEFAULT 'actif', -- 'actif', 'termine', 'suspendu'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des fiches de paie
CREATE TABLE public.fiches_paie (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  staff_id UUID NOT NULL REFERENCES public.staff(id) ON DELETE CASCADE,
  mois INTEGER NOT NULL, -- 1-12
  annee INTEGER NOT NULL,
  salaire_brut DECIMAL(10,2) NOT NULL,
  salaire_net DECIMAL(10,2) NOT NULL,
  heures_travaillees DECIMAL(5,2),
  prime DECIMAL(10,2) DEFAULT 0,
  deductions DECIMAL(10,2) DEFAULT 0,
  fichier_pdf_url TEXT,
  statut TEXT NOT NULL DEFAULT 'en_attente', -- 'en_attente', 'valide', 'paye'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(staff_id, mois, annee)
);

-- Table des disponibilités par jour
CREATE TABLE public.disponibilites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  staff_id UUID NOT NULL REFERENCES public.staff(id) ON DELETE CASCADE,
  date_jour DATE NOT NULL,
  disponible BOOLEAN NOT NULL DEFAULT true,
  heure_debut TIME,
  heure_fin TIME,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(staff_id, date_jour)
);

-- Activer RLS sur toutes les tables
ALTER TABLE public.contrats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fiches_paie ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disponibilites ENABLE ROW LEVEL SECURITY;

-- Créer les politiques RLS pour que les staff ne voient que leurs propres données
CREATE POLICY "Staff peut voir ses propres contrats" 
ON public.contrats 
FOR SELECT 
USING (staff_id IN (SELECT id FROM public.staff WHERE email = auth.jwt() ->> 'email'));

CREATE POLICY "Staff peut voir ses propres fiches de paie" 
ON public.fiches_paie 
FOR SELECT 
USING (staff_id IN (SELECT id FROM public.staff WHERE email = auth.jwt() ->> 'email'));

CREATE POLICY "Staff peut gérer ses disponibilités" 
ON public.disponibilites 
FOR ALL 
USING (staff_id IN (SELECT id FROM public.staff WHERE email = auth.jwt() ->> 'email'));

-- Créer des fonctions pour mettre à jour les timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Créer les triggers pour les timestamps
CREATE TRIGGER update_contrats_updated_at
BEFORE UPDATE ON public.contrats
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_fiches_paie_updated_at
BEFORE UPDATE ON public.fiches_paie
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_disponibilites_updated_at
BEFORE UPDATE ON public.disponibilites
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Créer un bucket pour stocker les fichiers PDF
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false);

-- Créer les politiques de stockage
CREATE POLICY "Staff peut voir ses propres documents" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'documents' AND auth.jwt() ->> 'email' = (split_part(name, '/', 1)));

CREATE POLICY "Admins peuvent gérer tous les documents" 
ON storage.objects 
FOR ALL 
USING (bucket_id = 'documents');