-- Alertes de quota (additif). Rien n'est inventé : une limite non confirmée par Yassin est signalée comme telle,
-- une consommation non mesurée est signalée « non mesurée ».
create table if not exists public.quotas_limites (
  ressource text primary key, libelle text not null, unite text not null, limite numeric,
  confirme boolean not null default false, source text not null, mesure_auto boolean not null default false
);
create table if not exists public.quotas_mesures (
  id bigserial primary key, ressource text not null references public.quotas_limites(ressource), mesure_le timestamptz not null default now(),
  valeur numeric not null, nature text not null default 'mesure' check (nature in ('mesure','estimation'))
);
create index if not exists quotas_mesures_idx on public.quotas_mesures (ressource, mesure_le desc);
create table if not exists public.quotas_alertes (ressource text primary key, niveau int not null, notifie_le timestamptz not null default now());
create table if not exists public.quotas_usages (ressource text not null, jour date not null default current_date, n int not null default 0, primary key (ressource, jour));
alter table public.quotas_limites enable row level security;
alter table public.quotas_mesures enable row level security;
alter table public.quotas_alertes enable row level security;
alter table public.quotas_usages enable row level security;
create policy quotas_limites_admin on public.quotas_limites for all using (public.is_admin()) with check (public.is_admin());
create policy quotas_mesures_admin on public.quotas_mesures for select using (public.is_admin());

-- Limites : chiffres officiels publiés du plan gratuit Supabase, NON confirmés sur le compte tant que confirme = false.
insert into public.quotas_limites (ressource, libelle, unite, limite, confirme, source, mesure_auto) values
 ('base_donnees', 'Base de données', 'octets', 524288000, false, 'Plan gratuit Supabase (500 Mo, documentation officielle) : à confirmer sur le tableau de bord', true),
 ('stockage_fichiers', 'Stockage de fichiers', 'octets', 1073741824, false, 'Plan gratuit Supabase (1 Go, documentation officielle) : à confirmer sur le tableau de bord', true),
 ('emails', 'E-mails envoyés (Resend)', 'e-mails/mois', null, false, 'Limite du compte Resend à communiquer par Yassin ; consommation non mesurée (20 fonctions envoient)', false),
 ('appels_ia', 'Appels IA (Heavent City)', 'appels/mois', null, false, 'Limite / crédit du compte IA à communiquer par Yassin', false)
on conflict (ressource) do nothing;

create or replace function public.quota_compter(p_ressource text) returns void
language sql security definer set search_path to 'public' as $$
  insert into public.quotas_usages (ressource, jour, n) values (p_ressource, current_date, 1)
  on conflict (ressource, jour) do update set n = public.quotas_usages.n + 1 $$;
revoke all on function public.quota_compter(text) from public, anon, authenticated;
grant execute on function public.quota_compter(text) to service_role;

create or replace function public.quotas_relever() returns void
language plpgsql security definer set search_path to 'public','storage' as $$
begin
  insert into public.quotas_mesures (ressource, valeur) values ('base_donnees', pg_database_size(current_database()));
  insert into public.quotas_mesures (ressource, valeur) select 'stockage_fichiers', coalesce(sum((metadata->>'size')::bigint),0) from storage.objects;
  delete from public.quotas_mesures where mesure_le < now() - interval '400 days';
  delete from public.quotas_usages where jour < current_date - 400;
end $$;
revoke all on function public.quotas_relever() from public, anon, authenticated;
grant execute on function public.quotas_relever() to service_role;

-- Lignes à montrer dans le résumé du matin ; marque ce qui est montré pour ne pas répéter
-- (≥ 80 % ou ≥ 95 % : à chaque franchissement de palier puis rappel après 7 jours ; limite à confirmer / non mesuré : rappel après 30 jours).
create or replace function public.quota_resume() returns table(libelle text, texte text, urgent boolean)
language plpgsql security definer set search_path to 'public' as $$
declare r record; v numeric; pct numeric; niv int; deja record; fmt text;
begin
  for r in select * from public.quotas_limites order by ressource loop
    niv := null; texte := null; urgent := false;
    if r.mesure_auto then
      select valeur into v from public.quotas_mesures where ressource = r.ressource order by mesure_le desc limit 1;
    elsif r.ressource = 'appels_ia' then
      select coalesce(sum(n),0) into v from public.quotas_usages where ressource = 'appels_ia' and jour >= date_trunc('month', current_date);
    else v := null; end if;
    fmt := case when r.unite = 'octets' then round(coalesce(v,0)/1048576.0, 1)::text || ' Mo' else coalesce(v,0)::text end;
    if r.limite is not null and v is not null and r.mesure_auto then
      pct := round(100 * v / r.limite, 1);
      niv := case when pct >= 95 then 95 when pct >= 80 then 80 else null end;
      if niv is not null then
        texte := fmt || ' sur ' || case when r.unite='octets' then round(r.limite/1048576.0)::text || ' Mo' else r.limite::text end || ' (' || pct || ' %, mesuré)' || case when r.confirme then '' else ' — limite à confirmer' end;
        urgent := true;
      end if;
    end if;
    if niv is null and not r.confirme and (r.limite is null or r.mesure_auto) then niv := -1; texte := case when r.limite is null then 'limite du compte inconnue : à communiquer' else 'limite officielle du plan gratuit utilisée, à confirmer (' || fmt || ' mesurés)' end; end if;
    if niv is null and r.ressource = 'emails' then niv := -2; texte := 'consommation non mesurée'; end if;
    if niv is null then continue; end if;
    select * into deja from public.quotas_alertes a where a.ressource = r.ressource;
    if not found or deja.niveau <> niv or deja.notifie_le < now() - (case when niv > 0 then interval '7 days' else interval '30 days' end) then
      insert into public.quotas_alertes (ressource, niveau, notifie_le) values (r.ressource, niv, now())
        on conflict (ressource) do update set niveau = excluded.niveau, notifie_le = now();
      libelle := r.libelle; return next;
    end if;
  end loop;
end $$;
revoke all on function public.quota_resume() from public, anon, authenticated;
grant execute on function public.quota_resume() to service_role;

select cron.schedule('quotas-releve', '40 5 * * *', 'select public.quotas_relever()');
select public.quotas_relever();
-- Retour arrière : select cron.unschedule('quotas-releve'); drop function public.quota_resume(), public.quotas_relever(), public.quota_compter(text); drop table public.quotas_usages, public.quotas_alertes, public.quotas_mesures, public.quotas_limites;
