-- Heavent Studio : demandes de démo des agences et démos personnalisées partagées par lien
create table if not exists public.studio_demandes (
  id uuid primary key default gen_random_uuid(),
  cree_le timestamptz not null default now(),
  nom text not null, agence text not null, email text not null, telephone text, ville text, formule text, message text,
  statut text not null default 'nouvelle' check (statut in ('nouvelle', 'demo_envoyee', 'en_discussion', 'client', 'sans_suite')),
  notes text
);
create table if not exists public.studio_demos (
  jeton uuid primary key default gen_random_uuid(),
  demande_id uuid references public.studio_demandes(id) on delete set null,
  agence text not null, prenom text, ville text,
  cree_le timestamptz not null default now(),
  expire_le timestamptz not null default now() + interval '30 days',
  active boolean not null default true,
  vues integer not null default 0, derniere_vue timestamptz
);
alter table public.studio_demandes enable row level security;
alter table public.studio_demos enable row level security;
create policy studio_demandes_admin on public.studio_demandes for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy studio_demos_admin on public.studio_demos for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Demande de démo depuis la page /studio (visiteurs anonymes, avec limites anti-abus)
create or replace function public.studio_demander(p_nom text, p_agence text, p_email text, p_telephone text, p_ville text, p_formule text, p_message text)
returns uuid language plpgsql security definer set search_path = public as $$
declare v_id uuid; v_mail text := lower(trim(coalesce(p_email, '')));
begin
  if length(trim(coalesce(p_nom, ''))) < 2 or length(trim(coalesce(p_agence, ''))) < 2 or v_mail !~ '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$' then
    raise exception 'Nom, agence et e-mail sont obligatoires';
  end if;
  if (select count(*) from studio_demandes where lower(email) = v_mail and cree_le > now() - interval '1 hour') >= 3
     or (select count(*) from studio_demandes where cree_le > now() - interval '10 minutes') >= 20 then
    raise exception 'Trop de demandes en peu de temps' using errcode = 'P0429';
  end if;
  insert into studio_demandes (nom, agence, email, telephone, ville, formule, message)
  values (left(trim(p_nom), 120), left(trim(p_agence), 120), v_mail, left(nullif(trim(p_telephone), ''), 40), left(nullif(trim(p_ville), ''), 80),
          left(nullif(trim(p_formule), ''), 40), left(nullif(trim(p_message), ''), 3000))
  returning id into v_id;
  return v_id;
end $$;

-- Ouverture d'une démo par son lien : nom de l'agence à afficher, et compteur de vues
create or replace function public.studio_demo_public(p_jeton uuid)
returns json language plpgsql security definer set search_path = public as $$
declare d studio_demos;
begin
  update studio_demos set vues = vues + 1, derniere_vue = now()
   where jeton = p_jeton and active and expire_le > now()
   returning * into d;
  if d.jeton is null then return null; end if;
  return json_build_object('agence', d.agence, 'prenom', d.prenom, 'ville', d.ville, 'expire_le', d.expire_le);
end $$;

revoke execute on function public.studio_demander(text, text, text, text, text, text, text), public.studio_demo_public(uuid) from public;
grant execute on function public.studio_demander(text, text, text, text, text, text, text), public.studio_demo_public(uuid) to anon, authenticated;

-- Notification sur le téléphone des administrateurs à chaque demande de démo
create or replace function public.notif_studio() returns trigger language plpgsql security definer set search_path = public as $$
begin
  perform public.notifier_admins('✨ Heavent Studio : demande de démo', new.agence || coalesce(' · ' || new.ville, '') || coalesce(' · ' || new.formule, ''), '/admin');
  return new;
end $$;
revoke execute on function public.notif_studio() from public, anon, authenticated;
create trigger notif_studio after insert on public.studio_demandes for each row execute function public.notif_studio();

-- Aperçu depuis l'administration : ne compte pas comme une ouverture par le prospect
create or replace function public.studio_demo_public(p_jeton uuid, p_compter boolean)
returns json language plpgsql security definer set search_path = public as $$
declare d studio_demos;
begin
  select * into d from studio_demos where jeton = p_jeton and active and expire_le > now();
  if d.jeton is null then return null; end if;
  if p_compter then update studio_demos set vues = vues + 1, derniere_vue = now() where jeton = p_jeton; end if;
  return json_build_object('agence', d.agence, 'prenom', d.prenom, 'ville', d.ville, 'expire_le', d.expire_le);
end $$;
revoke execute on function public.studio_demo_public(uuid, boolean) from public;
grant execute on function public.studio_demo_public(uuid, boolean) to anon, authenticated;
