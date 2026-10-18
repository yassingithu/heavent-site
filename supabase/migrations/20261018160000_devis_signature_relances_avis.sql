-- Signature du devis en ligne par le client, relances automatiques et demande d'avis Google.
alter table public.devis
  add column if not exists lien_token uuid not null default gen_random_uuid(),
  add column if not exists signe_le timestamptz,
  add column if not exists signature_nom text,
  add column if not exists signature_image text,
  add column if not exists signature_preuve jsonb,
  add column if not exists relances int not null default 0,
  add column if not exists derniere_relance_le timestamptz,
  add column if not exists avis_demande_le timestamptz;
create unique index if not exists devis_lien_token on public.devis(lien_token);
alter table public.parametres_agence add column if not exists lien_avis_google text;

-- Lecture publique d'UN devis par son lien secret (jamais les notes internes ni la preuve de signature)
create or replace function public.devis_public(p_token uuid)
returns json language sql stable security definer set search_path to 'public' as $$
  select json_build_object(
    'devis', (select to_jsonb(d) - 'notes_internes' - 'signature_preuve' - 'demande_entreprise_id' - 'demande_mariage_id' - 'relances' - 'derniere_relance_le' - 'avis_demande_le'
              from public.devis d where d.lien_token = p_token and d.statut <> 'annule'),
    'lignes', (select coalesce(json_agg(l order by l.ordre), '[]'::json) from public.devis_lignes l join public.devis d on d.id = l.devis_id where d.lien_token = p_token),
    'agence', (select to_jsonb(p) - 'lien_avis_google' - 'conditions_contrat' from public.parametres_agence p where p.id = 1)
  )
  where exists (select 1 from public.devis d where d.lien_token = p_token and d.statut <> 'annule');
$$;
grant execute on function public.devis_public(uuid) to anon, authenticated;

-- Passage quotidien à 9 h (heure du Maroc) : relances J+5 / J+10 et avis Google le lendemain de l'événement
select cron.schedule('automatisations-devis-avis', '5 8 * * *',
  $$select net.http_post(url := 'https://mapiwnsjsluiwmnulhqk.supabase.co/functions/v1/automatisations',
    headers := jsonb_build_object('Content-Type','application/json','x-cle-rappel',(select valeur from public.secrets_internes where nom='rappel_signatures')),
    body := '{}'::jsonb)$$);
