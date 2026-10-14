-- Remarques du crew sur ses contrats (heures en plus, frais / charge, autre), traitées par l'admin.
create table if not exists public.remarques_contrat (
  id uuid primary key default gen_random_uuid(),
  contrat_id uuid not null references public.contrats(id) on delete cascade,
  staff_id uuid not null references public.staff(id) on delete cascade,
  type text not null default 'autre' check (type in ('heures_sup','frais','autre')),
  date_jour date,
  heures numeric(6,2),
  montant numeric(10,2),
  message text not null check (char_length(message) between 3 and 2000),
  statut text not null default 'nouvelle' check (statut in ('nouvelle','acceptee','refusee','vue')),
  reponse text,
  traitee_le timestamptz,
  created_at timestamptz not null default now()
);
alter table public.remarques_contrat enable row level security;
create index if not exists remarques_contrat_contrat on public.remarques_contrat(contrat_id);

-- Admin : tout ; crew : lit les siennes et en ajoute sur SES contrats (sans pouvoir se répondre / valider)
create policy remarques_admin_all on public.remarques_contrat for all to authenticated using (is_admin()) with check (is_admin());
create policy remarques_crew_lecture on public.remarques_contrat for select to authenticated
  using (staff_id in (select id from public.staff where email = auth.email()));
create policy remarques_crew_ajout on public.remarques_contrat for insert to authenticated with check (
  statut = 'nouvelle' and reponse is null and traitee_le is null
  and staff_id in (select id from public.staff where email = auth.email())
  and contrat_id in (select id from public.contrats c where c.staff_id = remarques_contrat.staff_id));

-- E-mail à l'agence à chaque nouvelle remarque (fonction notifier-remarque)
create or replace function public.remarque_contrat_notifier() returns trigger
language plpgsql security definer set search_path to 'public' as $$
begin
  perform net.http_post(
    url := 'https://mapiwnsjsluiwmnulhqk.supabase.co/functions/v1/notifier-remarque',
    headers := jsonb_build_object('Content-Type', 'application/json',
      'x-cle-rappel', (select valeur from public.secrets_internes where nom = 'rappel_signatures')),
    body := jsonb_build_object('id', new.id));
  return new;
end $$;
revoke execute on function public.remarque_contrat_notifier() from public, anon, authenticated;
create trigger remarque_contrat_notifier after insert on public.remarques_contrat
  for each row execute function public.remarque_contrat_notifier();
