-- Demandes de cartes d'invitation envoyées depuis la page publique /cartes
create table if not exists public.demandes_cartes (
  id uuid primary key default gen_random_uuid(),
  cree_le timestamptz not null default now(),
  nom text not null,
  telephone text,
  email text,
  occasion text,
  noms text,
  date_evenement date,
  lieu text,
  message text,
  invitation jsonb not null default '{}'::jsonb,
  statut text not null default 'nouvelle',
  notes text,
  apercu_id uuid references public.invitations_apercu(id) on delete set null
);
alter table public.demandes_cartes enable row level security;
drop policy if exists demandes_cartes_admin on public.demandes_cartes;
create policy demandes_cartes_admin on public.demandes_cartes for all using (is_admin()) with check (is_admin());

create or replace function public.carte_demander(
  p_nom text, p_telephone text, p_email text, p_occasion text, p_noms text,
  p_date date, p_lieu text, p_message text, p_invitation jsonb
) returns uuid
language plpgsql security definer set search_path to 'public' as $$
declare v_id uuid; v_mail text := lower(trim(coalesce(p_email, ''))); v_tel text := nullif(trim(coalesce(p_telephone, '')), '');
begin
  if length(trim(coalesce(p_nom, ''))) < 2 then raise exception 'Le nom est obligatoire'; end if;
  if v_tel is null and v_mail = '' then raise exception 'Un téléphone ou un e-mail est obligatoire'; end if;
  if v_mail <> '' and v_mail !~ '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$' then raise exception 'E-mail invalide'; end if;
  if length(coalesce(p_invitation::text, '')) > 60000 then raise exception 'Demande trop volumineuse'; end if;
  if (select count(*) from demandes_cartes where cree_le > now() - interval '10 minutes') >= 20
     or (v_tel is not null and (select count(*) from demandes_cartes where telephone = v_tel and cree_le > now() - interval '1 hour') >= 3)
     or (v_mail <> '' and (select count(*) from demandes_cartes where lower(email) = v_mail and cree_le > now() - interval '1 hour') >= 3) then
    raise exception 'Trop de demandes en peu de temps' using errcode = 'P0429';
  end if;
  insert into demandes_cartes (nom, telephone, email, occasion, noms, date_evenement, lieu, message, invitation)
  values (left(trim(p_nom), 120), left(v_tel, 40), nullif(left(v_mail, 160), ''), left(nullif(trim(p_occasion), ''), 40),
          left(nullif(trim(p_noms), ''), 160), p_date, left(nullif(trim(p_lieu), ''), 200), left(nullif(trim(p_message), ''), 2000),
          coalesce(p_invitation, '{}'::jsonb))
  returning id into v_id;
  return v_id;
end $$;
revoke all on function public.carte_demander(text, text, text, text, text, date, text, text, jsonb) from public;
grant execute on function public.carte_demander(text, text, text, text, text, date, text, text, jsonb) to anon, authenticated;
