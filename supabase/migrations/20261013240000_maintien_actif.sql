-- Petite fonction appelée tous les 2 jours (GitHub Actions) pour que Supabase ne mette jamais le projet en pause
create table if not exists public.maintien_actif (id int primary key default 1, dernier_passage timestamptz not null default now(), nombre bigint not null default 0, constraint une_ligne check (id = 1));
alter table public.maintien_actif enable row level security;
insert into public.maintien_actif (id) values (1) on conflict do nothing;
create or replace function public.maintenir_actif() returns timestamptz language sql security definer set search_path = public as $$
  update public.maintien_actif set dernier_passage = now(), nombre = nombre + 1 where id = 1 returning dernier_passage;
$$;
revoke all on function public.maintenir_actif() from public;
grant execute on function public.maintenir_actif() to anon, authenticated;
