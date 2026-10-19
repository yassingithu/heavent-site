-- Éléments de confiance du site (gérés dans l'admin) : chiffres clés, note Google, engagements, FAQ,
-- logos de clients et témoignages. Rien n'est affiché tant que l'agence ne l'a pas renseigné / publié.
create table if not exists public.vitrine (
  id int primary key default 1 check (id = 1),
  annees_experience int,
  nb_evenements int,
  nb_crews int,
  google_note numeric(2,1) check (google_note between 1 and 5),
  google_nb_avis int,
  google_lien text,
  engagement_cnss boolean not null default false,
  engagement_assurance boolean not null default false,
  engagement_remplacement boolean not null default false,
  engagement_reponse_24h boolean not null default false,
  faq jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);
insert into public.vitrine (id, faq) values (1, '[
  {"q": "Comment se passe une demande de devis ?", "r": "Vous remplissez le formulaire (entreprise ou mariage) ou vous composez votre événement avec notre simulateur. Nous vous envoyons un devis détaillé que vous pouvez consulter, télécharger en PDF et signer en ligne. Vous préférez en parler d''abord ? Réservez un rendez-vous directement depuis votre devis."},
  {"q": "Faut-il verser un acompte ?", "r": "Oui : l''acompte indiqué sur le devis est payable à la commande, et le solde à la fin de la prestation, sur facture."},
  {"q": "Le montant du devis peut-il changer ?", "r": "Le devis est établi d''après les informations transmises. Son montant peut évoluer en fonction des services et des prestataires retenus lors d''un premier rendez-vous."},
  {"q": "Que se passe-t-il en cas d''annulation ?", "r": "Les conditions d''annulation figurent dans nos conditions générales de vente, jointes à chaque devis : elles dépendent du délai avant l''événement, et l''acompte versé reste acquis."},
  {"q": "Qui emploie les hôtesses ?", "r": "Le personnel reste placé sous l''autorité et la responsabilité de l''agence, qui en est l''employeur : contrats, fiches de paie et coordination sont gérés par Heavent People Agency."},
  {"q": "Intervenez-vous en dehors de Rabat ?", "r": "Oui : nos équipes interviennent à Rabat, Casablanca, Marrakech, Tanger, Agadir, Fès et se déplacent partout au Maroc, sur devis."}
]'::jsonb) on conflict (id) do nothing;

create table if not exists public.references_clients (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  logo text,              -- chemin dans le stockage public « assets »
  site_web text,
  ordre int not null default 0,
  publie boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.temoignages (
  id uuid primary key default gen_random_uuid(),
  auteur text not null,         -- ex. « Yasmine B. »
  contexte text,                -- ex. « Mariage à Rabat »
  texte text not null,
  note int check (note between 1 and 5),
  devis_id uuid references public.devis(id) on delete set null,
  publie boolean not null default false,
  ordre int not null default 0,
  created_at timestamptz not null default now()
);

-- Le client peut accepter que son avis soit publié (prénom + initiale)
alter table public.devis add column if not exists avis_publiable boolean not null default false;

alter table public.vitrine enable row level security;
alter table public.references_clients enable row level security;
alter table public.temoignages enable row level security;
