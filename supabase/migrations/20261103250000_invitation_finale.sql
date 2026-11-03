-- Invitation digitale seule : version test (filigrane) → version finale (sans filigrane), réponses des invités centralisées.
alter table public.invitations_apercu
  add column if not exists mode text not null default 'test' check (mode in ('test','final')),
  add column if not exists avec_reponse boolean not null default true,
  add column if not exists finale_le timestamptz;

create table if not exists public.reponses_invitation (
  id uuid primary key default gen_random_uuid(),
  apercu_id uuid not null references public.invitations_apercu(id) on delete cascade,
  nom text not null,
  reponse text not null check (reponse in ('oui','non')),
  nb_confirmes int not null default 1 check (nb_confirmes between 1 and 6),
  accompagnants text[] not null default '{}',
  created_at timestamptz not null default now()
);
alter table public.reponses_invitation enable row level security;
create policy reponses_invitation_admin on public.reponses_invitation for all to authenticated using (public.is_admin()) with check (public.is_admin());
revoke all on public.reponses_invitation from anon;

create or replace function public.invitation_apercu_public(p_jeton uuid)
returns json language sql stable security definer set search_path to 'public' as $$
  select json_build_object('noms', noms, 'date_evenement', date_evenement, 'lieu', lieu, 'message', message, 'invitation', invitation,
    'mode', mode, 'avec_reponse', avec_reponse)
  from public.invitations_apercu where jeton = p_jeton and expire_le > now();
$$;
grant execute on function public.invitation_apercu_public(uuid) to anon, authenticated;

-- Réponse d'un invité sur la version finale (lien commun) : enregistrée seulement si finale + réponses activées.
create or replace function public.invitation_repondre(p_jeton uuid, p_nom text, p_reponse text, p_accompagnants text[])
returns json language plpgsql security definer set search_path to 'public' as $$
declare v public.invitations_apercu; v_acc text[]; n int;
begin
  select * into v from public.invitations_apercu where jeton = p_jeton and expire_le > now();
  if v.id is null or v.mode <> 'final' or not v.avec_reponse then raise exception 'Réponses fermées'; end if;
  if p_reponse not in ('oui','non') or length(trim(coalesce(p_nom,''))) < 2 then raise exception 'Réponse invalide'; end if;
  if (select count(*) from public.reponses_invitation where apercu_id = v.id) >= 500 then raise exception 'Trop de réponses'; end if;
  v_acc := case when p_reponse = 'oui' then (select coalesce(array_agg(left(trim(x), 80)), '{}') from unnest(coalesce(p_accompagnants,'{}')) x where length(trim(x)) >= 2 limit 5) else '{}' end;
  n := 1 + coalesce(array_length(v_acc,1),0);
  insert into public.reponses_invitation (apercu_id, nom, reponse, nb_confirmes, accompagnants) values (v.id, left(trim(p_nom), 80), p_reponse, n, v_acc);
  return json_build_object('ok', true);
end $$;
grant execute on function public.invitation_repondre(uuid, text, text, text[]) to anon, authenticated;
