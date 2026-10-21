-- Deux comptes Instagram : Heavent et Nawar (bar à parfums)
alter table public.posts_instagram add column if not exists compte text not null default 'heavent';
alter table public.posts_instagram add constraint posts_instagram_compte_check check (compte in ('heavent', 'nawar'));
create index if not exists posts_instagram_compte_date on public.posts_instagram (compte, date_prevue);

-- Réglages Instagram d'un compte (Heavent ou Nawar) : rien de secret n'est renvoyé
create or replace function public.instagram_reglages_compte(p_compte text)
returns json language plpgsql stable security definer set search_path = public as $$
declare v_admin boolean := public.is_admin(); p text := case when p_compte = 'nawar' then 'nawar_' else '' end;
begin
  if not (v_admin or public._est_nawar()) then raise exception 'Accès refusé'; end if;
  return json_build_object(
    'pixabay', exists (select 1 from secrets_internes where nom = 'pixabay'),
    'instagram', exists (select 1 from secrets_internes where nom = p || 'instagram_jeton'),
    'instagram_nom', (select valeur from secrets_internes where nom = p || 'instagram_nom'),
    'secret_app', exists (select 1 from secrets_internes where nom = 'instagram_secret_app'),
    'webhook_jeton', case when v_admin and p = '' then (select valeur from secrets_internes where nom = 'instagram_webhook_jeton') end,
    'abonne_le', case when v_admin then (select valeur from secrets_internes where nom = p || 'instagram_abonne_le') end);
end $$;
revoke execute on function public.instagram_reglages_compte(text) from public, anon;
grant execute on function public.instagram_reglages_compte(text) to authenticated;
