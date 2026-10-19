-- Attentions personnelles dans l'administration : accueil au prénom, surprise de bienvenue, un mot de Yassin chaque jour,
-- célébrations des signatures et des records, notifications sur le téléphone.

create table if not exists public.admin_profils (
  email text primary key,
  prenom text not null,
  recoit_mots boolean not null default false,          -- reçoit les mots du jour (et la surprise)
  surprise_vue_le timestamptz,
  signatures_vues_jusqu_au timestamptz not null default now(),
  records_vus jsonb not null default '[]'::jsonb
);
insert into public.admin_profils (email, prenom, recoit_mots) values
  ('i.chaigari@heaventagency.com', 'Imane', true),
  ('y.selassi@heaventagency.com', 'Yassin', false)
on conflict (email) do nothing;
alter table public.admin_profils enable row level security;
revoke all on public.admin_profils from anon;

-- Les mots du jour (écrits par Yassin) : lus uniquement via mon_accueil()
create table if not exists public.mots_yassin (
  id serial primary key,
  ordre int not null,
  texte text not null,
  date_speciale text check (date_speciale ~ '^\d{2}-\d{2}$')   -- « MM-JJ » : anniversaire, mariage…
);
alter table public.mots_yassin enable row level security;
revoke all on public.mots_yassin from anon, authenticated;

create table if not exists public.surprise_bienvenue (
  id int primary key default 1 check (id = 1),
  titre text not null,
  texte text not null,
  signature text not null
);
alter table public.surprise_bienvenue enable row level security;
revoke all on public.surprise_bienvenue from anon, authenticated;

create or replace function public._mon_email() returns text language sql stable as $$ select lower(coalesce(auth.jwt() ->> 'email', '')) $$;

/** Accueil de l'administration : prénom, mot du jour, surprise (une seule fois), dernière signature vue, records déjà fêtés. */
create or replace function public.mon_accueil()
returns json language plpgsql stable security definer set search_path to 'public' as $$
declare p public.admin_profils; v_jour date := (now() at time zone 'UTC')::date; v_mot text; v_n int;
begin
  if not public.is_admin() then raise exception 'Accès refusé'; end if;
  select * into p from public.admin_profils where lower(email) = public._mon_email();
  if p.email is null then return json_build_object('prenom', null); end if;
  if p.recoit_mots then
    select texte into v_mot from public.mots_yassin where date_speciale = to_char(v_jour, 'MM-DD') order by id limit 1;
    if v_mot is null then
      select count(*) into v_n from public.mots_yassin where date_speciale is null;
      if v_n > 0 then
        select texte into v_mot from public.mots_yassin where date_speciale is null
          order by ordre, id offset (((v_jour - date '2026-10-19') % v_n) + v_n) % v_n limit 1;
      end if;
    end if;
  end if;
  return json_build_object(
    'prenom', p.prenom, 'mot', v_mot,
    'surprise', case when p.recoit_mots and p.surprise_vue_le is null then (select to_json(s) from public.surprise_bienvenue s where id = 1) end,
    'signatures_vues_jusqu_au', p.signatures_vues_jusqu_au, 'records_vus', p.records_vus);
end $$;
grant execute on function public.mon_accueil() to authenticated;

create or replace function public.accueil_marquer(p_quoi text)
returns void language plpgsql security definer set search_path to 'public' as $$
begin
  if not public.is_admin() then raise exception 'Accès refusé'; end if;
  if p_quoi = 'surprise' then
    update public.admin_profils set surprise_vue_le = now() where lower(email) = public._mon_email();
  elsif p_quoi = 'signatures' then
    update public.admin_profils set signatures_vues_jusqu_au = now() where lower(email) = public._mon_email();
  elsif p_quoi like 'record:%' then
    update public.admin_profils set records_vus = records_vus || to_jsonb(substr(p_quoi, 8))
      where lower(email) = public._mon_email() and not records_vus ? substr(p_quoi, 8);
  end if;
end $$;
grant execute on function public.accueil_marquer(text) to authenticated;

-- Abonnements aux notifications du téléphone (un par appareil)
create table if not exists public.abonnements_push (
  endpoint text primary key,
  email text not null,
  p256dh text not null,
  auth text not null,
  appareil text,
  cree_le timestamptz not null default now()
);
alter table public.abonnements_push enable row level security;
revoke all on public.abonnements_push from anon;
create policy "abonnements_push_soi" on public.abonnements_push for all to authenticated
  using (public.is_admin() and lower(email) = public._mon_email()) with check (public.is_admin() and lower(email) = public._mon_email());

-- Envoi d'une notification à l'administration (via la fonction notifier-admin)
create or replace function public.notifier_admins(p_titre text, p_corps text, p_lien text default '/admin')
returns void language plpgsql security definer set search_path to 'public' as $$
begin
  if not exists (select 1 from public.abonnements_push) then return; end if;
  perform net.http_post(
    url := 'https://mapiwnsjsluiwmnulhqk.supabase.co/functions/v1/notifier-admin',
    headers := jsonb_build_object('Content-Type', 'application/json', 'x-cle-rappel', (select valeur from public.secrets_internes where nom = 'rappel_signatures')),
    body := jsonb_build_object('titre', p_titre, 'corps', p_corps, 'lien', p_lien));
exception when others then null; -- une notification ne doit jamais bloquer l'action
end $$;
revoke all on function public.notifier_admins(text, text, text) from public, anon, authenticated;

create or replace function public.notif_devis_signe() returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  if old.signe_le is null and new.signe_le is not null then
    perform public.notifier_admins('🎉 ' || coalesce(nullif(new.client_societe, ''), new.client_nom) || ' vient de signer !',
      'Devis ' || coalesce(new.numero, '') || ' · ' || translate(to_char(new.total_ttc, 'FM999G999G990'), ',', ' ') || ' MAD', '/admin#signature');
  end if;
  return new;
end $$;
create or replace trigger notif_devis_signe after update of signe_le on public.devis for each row execute function public.notif_devis_signe();

create or replace function public.notif_demande() returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  if tg_table_name = 'devis_entreprise' then
    perform public.notifier_admins('🏢 Nouvelle demande entreprise', coalesce(new.entreprise, '') || ' · ' || coalesce(new.lieu, '') , '/admin');
  else
    perform public.notifier_admins('💌 Nouvelle demande : ' || coalesce(new.type_evenement, 'événement'),
      trim(coalesce(new.nom, '') || ' ' || coalesce(new.prenom, '')) || coalesce(' · ' || new.nb_invites || ' invités', ''), '/admin');
  end if;
  return new;
end $$;
create or replace trigger notif_demande_entreprise after insert on public.devis_entreprise for each row execute function public.notif_demande();
create or replace trigger notif_demande_mariage after insert on public.devis_mariage for each row execute function public.notif_demande();

create or replace function public.notif_rendez_vous() returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  perform public.notifier_admins('📅 Nouveau rendez-vous', coalesce(new.client_nom, '') || ' · ' ||
    to_char(new.debut at time zone 'UTC', 'DD/MM à HH24"h"MI'), '/admin');
  return new;
end $$;
create or replace trigger notif_rendez_vous after insert on public.rendez_vous for each row execute function public.notif_rendez_vous();

create or replace function public.notif_retard() returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  if old.alerte_retard_le is null and new.alerte_retard_le is not null then
    perform public.notifier_admins('⏰ Crew en retard', (select prenom || ' ' || nom from public.staff where id = new.staff_id) || ' n''a pas encore pointé.', '/admin');
  end if;
  return new;
end $$;
create or replace trigger notif_retard after update of alerte_retard_le on public.affectations for each row execute function public.notif_retard();
