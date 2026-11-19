-- Réponses rapides (« Envoyer un devis ») : un numéro à part, REP-AAAA-NNNN, distinct des devis DEV-AAAA-NNNN.
alter table public.devis_mariage add column if not exists numero text;
alter table public.devis_entreprise add column if not exists numero text;

create or replace function public.numeroter_reponse_rapide() returns trigger
language plpgsql set search_path = public as $$
declare v_annee text := to_char(now() at time zone 'Africa/Casablanca', 'YYYY'); v_n int;
begin
  if new.numero is null and new.statut = 'envoye' and new.tarifs_envoyes is not null then
    perform pg_advisory_xact_lock(hashtext('numero_reponse_rapide'));
    select coalesce(max(substring(numero from '(\d+)$')::int), 0) + 1 into v_n from (
      select numero from public.devis_mariage where numero like 'REP-' || v_annee || '-%'
      union all select numero from public.devis_entreprise where numero like 'REP-' || v_annee || '-%') t;
    new.numero := 'REP-' || v_annee || '-' || lpad(v_n::text, 4, '0');
  end if;
  return new;
end $$;

drop trigger if exists numeroter_reponse_rapide on public.devis_mariage;
create trigger numeroter_reponse_rapide before insert on public.devis_mariage for each row execute function public.numeroter_reponse_rapide();
drop trigger if exists numeroter_reponse_rapide on public.devis_entreprise;
create trigger numeroter_reponse_rapide before insert on public.devis_entreprise for each row execute function public.numeroter_reponse_rapide();

-- Les réponses rapides déjà envoyées reçoivent leur numéro (ordre d'envoi)
do $$ declare r record; v_n int := 0; begin
  for r in select 'm' t, id, created_at from public.devis_mariage where numero is null and statut in ('envoye','accepte','refuse') and tarifs_envoyes is not null
           union all select 'e', id, created_at from public.devis_entreprise where numero is null and statut in ('envoye','accepte','refuse') and tarifs_envoyes is not null
           order by created_at loop
    v_n := v_n + 1;
    if r.t = 'm' then update public.devis_mariage set numero = 'REP-' || to_char(r.created_at, 'YYYY') || '-' || lpad(v_n::text, 4, '0') where id = r.id;
    else update public.devis_entreprise set numero = 'REP-' || to_char(r.created_at, 'YYYY') || '-' || lpad(v_n::text, 4, '0') where id = r.id; end if;
  end loop; end $$;
