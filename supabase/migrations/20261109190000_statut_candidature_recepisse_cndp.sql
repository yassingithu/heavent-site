-- Statut de candidature des crews (en attente / approuvé / refusé) et n° de récépissé CNDP
alter table public.staff add column if not exists statut_candidature text not null default 'en_attente' check (statut_candidature in ('en_attente','approuve','refuse'));
update public.staff s set statut_candidature='approuve' where exists (select 1 from public.contrats c where c.staff_id=s.id) or exists (select 1 from public.affectations a where a.staff_id=s.id) or exists (select 1 from public.fiches_paie f where f.staff_id=s.id);
alter table public.parametres_agence add column if not exists cndp_recepisse text;
create or replace function public.recepisse_cndp() returns text language sql stable security definer set search_path=public as $$ select nullif(btrim(cndp_recepisse),'') from public.parametres_agence order by id limit 1 $$;
grant execute on function public.recepisse_cndp() to anon, authenticated;
