-- =====================================================================
-- Heavent People Agency — schéma complet (consolidé et nettoyé)
-- Remplace les 31 migrations Lovable de juillet 2025.
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- Administrateurs
-- ---------------------------------------------------------------------
create table public.admins (
  email text primary key,
  created_at timestamptz not null default now()
);
insert into public.admins (email) values ('i.chaigari@heaventagency.com');

create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.admins where lower(email) = lower(auth.jwt() ->> 'email'));
$$;

create or replace function public.update_updated_at_column()
returns trigger language plpgsql set search_path = public as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------
-- Staff (hôtes / hôtesses)
-- ---------------------------------------------------------------------
create table public.staff (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  nom text not null,
  prenom text not null,
  telephone text,
  age integer,
  genre text,
  ville text,
  taille integer,
  pointure varchar(10),
  taille_confection varchar(10),
  taille_pantalon varchar,
  taille_haut varchar,
  couleur_cheveux varchar(50),
  couleur_yeux varchar(50),
  competences text,
  langues text,
  experience text,
  permis boolean,
  disponibilites text,
  photo text,
  photo_plein_pied text,
  identite text,
  adresse_complete text,
  code_postal varchar(10),
  nationalite varchar(50),
  date_naissance date,
  lieu_naissance varchar(100),
  situation_familiale varchar(30),
  numero_identite varchar(50),
  numero_securite_sociale varchar(50),
  iban varchar(50),
  niveau_etudes varchar(100),
  nom_urgence varchar(100),
  telephone_urgence varchar(20),
  remarques text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create trigger staff_updated_at before update on public.staff
  for each row execute function public.update_updated_at_column();

alter table public.staff enable row level security;
-- Inscription publique : chacun ne peut créer que sa propre fiche
create policy "staff_insert_self" on public.staff for insert to anon, authenticated
  with check (true);
create policy "staff_select_self_or_admin" on public.staff for select to authenticated
  using (email = auth.email() or public.is_admin());
create policy "staff_update_admin" on public.staff for update to authenticated
  using (public.is_admin()) with check (public.is_admin());
create policy "staff_delete_admin" on public.staff for delete to authenticated
  using (public.is_admin());

-- Vérification « email déjà inscrit » utilisée par le formulaire d'inscription,
-- sans exposer la table staff au public.
create or replace function public.staff_email_exists(p_email text)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.staff where lower(email) = lower(p_email)); $$;
grant execute on function public.staff_email_exists(text) to anon, authenticated;

-- ---------------------------------------------------------------------
-- Contrats
-- ---------------------------------------------------------------------
create table public.contrats (
  id uuid primary key default gen_random_uuid(),
  staff_id uuid not null references public.staff(id) on delete cascade,
  titre text not null,
  type_contrat text not null,
  date_debut date not null,
  date_fin date,
  heures_prestations integer,
  taux_horaire numeric(10,2),
  salaire_brut numeric(10,2),
  description text,
  fichier_url text,
  statut text not null default 'actif',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index contrats_staff_idx on public.contrats(staff_id);
create trigger contrats_updated_at before update on public.contrats
  for each row execute function public.update_updated_at_column();
alter table public.contrats enable row level security;
create policy "contrats_select" on public.contrats for select to authenticated
  using (public.is_admin() or staff_id in (select id from public.staff where email = auth.email()));
create policy "contrats_admin_all" on public.contrats for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------
-- Fiches de paie
-- ---------------------------------------------------------------------
create table public.fiches_paie (
  id uuid primary key default gen_random_uuid(),
  staff_id uuid not null references public.staff(id) on delete cascade,
  mois integer not null check (mois between 1 and 12),
  annee integer not null,
  salaire_brut numeric(10,2) not null,
  salaire_net numeric(10,2) not null,
  heures_travaillees numeric(6,2),
  prime numeric(10,2) default 0,
  deductions numeric(10,2) default 0,
  fichier_pdf_url text,
  statut text not null default 'en_attente',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (staff_id, mois, annee)
);
create trigger fiches_paie_updated_at before update on public.fiches_paie
  for each row execute function public.update_updated_at_column();
alter table public.fiches_paie enable row level security;
create policy "fiches_select" on public.fiches_paie for select to authenticated
  using (public.is_admin() or staff_id in (select id from public.staff where email = auth.email()));
create policy "fiches_admin_all" on public.fiches_paie for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------
-- Disponibilités
-- ---------------------------------------------------------------------
create table public.disponibilites (
  id uuid primary key default gen_random_uuid(),
  staff_id uuid not null references public.staff(id) on delete cascade,
  date_jour date not null,
  creneau text check (creneau in ('matin', 'apres_midi', 'soir')),
  disponible boolean not null default true,
  heure_debut time,
  heure_fin time,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint disponibilites_unique_slot unique (staff_id, date_jour, creneau, heure_debut, heure_fin)
);
create index disponibilites_date_idx on public.disponibilites(date_jour);
create trigger disponibilites_updated_at before update on public.disponibilites
  for each row execute function public.update_updated_at_column();

-- Quand un créneau précis est saisi, on retire l'éventuelle entrée « journée » sans créneau.
create or replace function public.clean_old_disponibilites()
returns trigger language plpgsql set search_path = public as $$
begin
  if new.creneau is not null then
    delete from public.disponibilites
    where staff_id = new.staff_id and date_jour = new.date_jour
      and creneau is null and id <> new.id;
  end if;
  return new;
end;
$$;
create trigger disponibilites_clean after insert or update on public.disponibilites
  for each row execute function public.clean_old_disponibilites();

alter table public.disponibilites enable row level security;
create policy "dispo_own" on public.disponibilites for all to authenticated
  using (staff_id in (select id from public.staff where email = auth.email()))
  with check (staff_id in (select id from public.staff where email = auth.email()));
create policy "dispo_admin" on public.disponibilites for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------
-- Demandes de devis venant du site (formulaires publics)
-- ---------------------------------------------------------------------
create table public.devis_entreprise (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  prenom text not null,
  email text not null,
  telephone text,
  entreprise text not null,
  date_evenement date,
  lieu text,
  nb_personnes integer,
  nb_staff integer,
  services text,
  remarques text,
  statut text default 'en_attente' check (statut in ('en_attente', 'envoye', 'accepte', 'refuse')),
  date_envoi_devis timestamptz,
  tarifs_envoyes jsonb,
  montant_total numeric,
  created_at timestamptz default now()
);
alter table public.devis_entreprise enable row level security;
create policy "dev_ent_insert_public" on public.devis_entreprise for insert to anon, authenticated with check (true);
create policy "dev_ent_admin" on public.devis_entreprise for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create table public.devis_mariage (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  prenom text not null,
  email text not null,
  telephone text,
  type_evenement text,
  date_mariage date,
  lieu text,
  nb_invites integer,
  services text,
  remarques text,
  statut text default 'en_attente' check (statut in ('en_attente', 'envoye', 'accepte', 'refuse')),
  date_envoi_devis timestamptz,
  tarifs_envoyes jsonb,
  montant_total numeric,
  created_at timestamptz default now()
);
alter table public.devis_mariage enable row level security;
create policy "dev_mar_insert_public" on public.devis_mariage for insert to anon, authenticated with check (true);
create policy "dev_mar_admin" on public.devis_mariage for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------
-- NOUVEAU — Module « devis rapide »
-- ---------------------------------------------------------------------

-- Paramètres de l'agence (une seule ligne)
create table public.parametres_agence (
  id integer primary key default 1 check (id = 1),
  raison_sociale text not null default 'Heavent People Agency',
  adresse text,
  ville text,
  telephone text default '+212 6 10 93 96 55',
  email text default 'i.chaigari@heaventagency.com',
  site_web text default 'www.heaventagency.com',
  ice text,
  rc text,
  if_fiscal text,
  patente text,
  rib text,
  taux_tva numeric(5,2) not null default 20,
  devise text not null default 'MAD',
  validite_jours integer not null default 30,
  conditions text default 'Acompte de 50 % à la signature, solde à la fin de la prestation.',
  updated_at timestamptz not null default now()
);
insert into public.parametres_agence (id) values (1);
create trigger parametres_updated_at before update on public.parametres_agence
  for each row execute function public.update_updated_at_column();
alter table public.parametres_agence enable row level security;
create policy "param_admin" on public.parametres_agence for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Catalogue des prestations (tarifs par défaut)
create table public.catalogue_prestations (
  id uuid primary key default gen_random_uuid(),
  categorie text not null default 'staff',    -- staff, mariage, evenementiel, logistique, autre
  designation text not null,
  description text,
  unite text not null default 'heure',        -- heure, jour, forfait, unite, personne
  prix_unitaire numeric(12,2) not null default 0,
  actif boolean not null default true,
  ordre integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger catalogue_updated_at before update on public.catalogue_prestations
  for each row execute function public.update_updated_at_column();
alter table public.catalogue_prestations enable row level security;
create policy "catalogue_admin" on public.catalogue_prestations for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Devis émis par l'agence
create sequence public.devis_numero_seq;

create table public.devis (
  id uuid primary key default gen_random_uuid(),
  numero text unique,
  type text not null default 'evenement' check (type in ('entreprise', 'mariage', 'evenement')),
  demande_entreprise_id uuid references public.devis_entreprise(id) on delete set null,
  demande_mariage_id uuid references public.devis_mariage(id) on delete set null,
  -- client
  client_nom text not null,
  client_societe text,
  client_email text,
  client_telephone text,
  client_adresse text,
  client_ice text,
  -- événement
  titre text,
  date_evenement date,
  date_fin_evenement date,
  lieu text,
  nb_personnes integer,
  -- montants (calculés automatiquement à partir des lignes)
  remise_globale_pct numeric(5,2) not null default 0,
  taux_tva numeric(5,2) not null default 20,
  total_ht numeric(12,2) not null default 0,
  total_remise numeric(12,2) not null default 0,
  total_tva numeric(12,2) not null default 0,
  total_ttc numeric(12,2) not null default 0,
  acompte_pct numeric(5,2) not null default 50,
  devise text not null default 'MAD',
  -- suivi
  statut text not null default 'brouillon' check (statut in ('brouillon', 'envoye', 'accepte', 'refuse', 'annule')),
  date_emission date not null default current_date,
  date_validite date,
  date_envoi timestamptz,
  conditions text,
  notes_internes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index devis_statut_idx on public.devis(statut);
create index devis_date_idx on public.devis(date_evenement);

create table public.devis_lignes (
  id uuid primary key default gen_random_uuid(),
  devis_id uuid not null references public.devis(id) on delete cascade,
  ordre integer not null default 0,
  designation text not null,
  description text,
  quantite numeric(10,2) not null default 1,   -- ex. nombre d'hôtesses
  duree numeric(10,2) not null default 1,      -- ex. nombre d'heures / de jours
  unite text not null default 'heure',
  prix_unitaire numeric(12,2) not null default 0,
  remise_pct numeric(5,2) not null default 0,
  total_ht numeric(12,2) generated always as
    (round(quantite * duree * prix_unitaire * (1 - remise_pct / 100), 2)) stored,
  created_at timestamptz not null default now()
);
create index devis_lignes_devis_idx on public.devis_lignes(devis_id);

-- Numéro automatique : DEV-2026-0001
create or replace function public.devis_before_insert()
returns trigger language plpgsql set search_path = public as $$
begin
  if new.numero is null then
    new.numero := 'DEV-' || to_char(coalesce(new.date_emission, current_date), 'YYYY') || '-'
                  || lpad(nextval('public.devis_numero_seq')::text, 4, '0');
  end if;
  if new.date_validite is null then
    new.date_validite := coalesce(new.date_emission, current_date)
      + (select validite_jours from public.parametres_agence where id = 1);
  end if;
  return new;
end;
$$;
create trigger devis_numero before insert on public.devis
  for each row execute function public.devis_before_insert();
create trigger devis_updated_at before update on public.devis
  for each row execute function public.update_updated_at_column();

-- Recalcul des totaux
create or replace function public.devis_recalculer(p_devis_id uuid)
returns void language plpgsql security definer set search_path = public as $$
declare
  v_ht numeric(12,2);
begin
  select coalesce(sum(total_ht), 0) into v_ht from public.devis_lignes where devis_id = p_devis_id;
  update public.devis d set
    total_ht     = v_ht,
    total_remise = round(v_ht * d.remise_globale_pct / 100, 2),
    total_tva    = round((v_ht - round(v_ht * d.remise_globale_pct / 100, 2)) * d.taux_tva / 100, 2),
    total_ttc    = (v_ht - round(v_ht * d.remise_globale_pct / 100, 2))
                   + round((v_ht - round(v_ht * d.remise_globale_pct / 100, 2)) * d.taux_tva / 100, 2)
  where d.id = p_devis_id;
end;
$$;

create or replace function public.devis_lignes_after_change()
returns trigger language plpgsql set search_path = public as $$
begin
  perform public.devis_recalculer(coalesce(new.devis_id, old.devis_id));
  return null;
end;
$$;
create trigger devis_lignes_recalc after insert or update or delete on public.devis_lignes
  for each row execute function public.devis_lignes_after_change();

create or replace function public.devis_after_update()
returns trigger language plpgsql set search_path = public as $$
begin
  if new.remise_globale_pct is distinct from old.remise_globale_pct
     or new.taux_tva is distinct from old.taux_tva then
    perform public.devis_recalculer(new.id);
  end if;
  return null;
end;
$$;
create trigger devis_recalc_on_rates after update on public.devis
  for each row execute function public.devis_after_update();

alter table public.devis enable row level security;
alter table public.devis_lignes enable row level security;
create policy "devis_admin" on public.devis for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
create policy "devis_lignes_admin" on public.devis_lignes for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

revoke execute on function public.devis_recalculer(uuid) from anon;

-- ---------------------------------------------------------------------
-- Stockage des fichiers
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public) values
  ('photos', 'photos', true),          -- photos du staff (lecture publique, utilisée dans les PDF)
  ('identites', 'identites', false),   -- pièces d'identité : PRIVÉ
  ('documents', 'documents', false),   -- contrats / fiches de paie : PRIVÉ
  ('assets', 'assets', true)           -- logos, visuels
on conflict (id) do nothing;

-- photos : dépôt libre au moment de l'inscription, lecture publique, gestion admin
create policy "photos_upload" on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'photos');
create policy "photos_read" on storage.objects for select
  using (bucket_id = 'photos');
create policy "photos_admin" on storage.objects for all to authenticated
  using (bucket_id = 'photos' and public.is_admin()) with check (bucket_id = 'photos' and public.is_admin());

-- identités : dépôt à l'inscription, lecture et gestion réservées à l'admin
create policy "identites_upload" on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'identites');
create policy "identites_admin" on storage.objects for all to authenticated
  using (bucket_id = 'identites' and public.is_admin()) with check (bucket_id = 'identites' and public.is_admin());

-- documents : le staff lit ses propres fichiers (dossier = son email), l'admin gère tout
create policy "documents_own_read" on storage.objects for select to authenticated
  using (bucket_id = 'documents' and split_part(name, '/', 1) = auth.email());
create policy "documents_admin" on storage.objects for all to authenticated
  using (bucket_id = 'documents' and public.is_admin()) with check (bucket_id = 'documents' and public.is_admin());

-- assets : lecture publique, gestion admin
create policy "assets_read" on storage.objects for select using (bucket_id = 'assets');
create policy "assets_admin" on storage.objects for all to authenticated
  using (bucket_id = 'assets' and public.is_admin()) with check (bucket_id = 'assets' and public.is_admin());
