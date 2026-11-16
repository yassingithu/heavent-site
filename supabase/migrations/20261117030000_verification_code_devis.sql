-- Vérification par code e-mail avant signature (et avant export / changement important côté mariés).
-- Un lien transféré ne suffit plus : il faut aussi lire l'e-mail du client (ou l'adresse que l'agence a indiquée).
-- Les codes ne sont jamais stockés en clair. 6 chiffres, valables 10 min, 5 essais, 3 envois par heure et par devis.
-- Après un bon code, une « preuve » aléatoire valable 30 min est remise au navigateur ; le serveur la contrôle à la signature.
-- Retour arrière : voir la fin du fichier.

alter table public.devis add column if not exists verification_email text;

create table if not exists public.verifications_devis (
  id uuid primary key default gen_random_uuid(),
  devis_id uuid not null references public.devis(id) on delete cascade,
  envoye_a text not null,
  code_hash text not null,
  expire_le timestamptz not null,
  essais int not null default 0,
  preuve_hash text,
  preuve_expire_le timestamptz,
  cree_le timestamptz not null default now()
);
create index if not exists verifications_devis_devis_idx on public.verifications_devis (devis_id, cree_le desc);
alter table public.verifications_devis enable row level security;
revoke all on public.verifications_devis from anon, authenticated;

create or replace function public._h(p text) returns text language sql immutable as $$ select encode(sha256(convert_to(p, 'UTF8')), 'hex') $$;

-- 1) demander un code : renvoie le code (en clair, une seule fois, à l'appelant serveur) et l'adresse de destination
create or replace function public._verif_demander(p_token uuid)
returns table (code text, email text, devis_id uuid, numero text, nom text)
language plpgsql security definer set search_path to 'public' as $$
declare d record; v_code text; v_email text;
begin
  select * into d from public.devis where lien_token = p_token;
  if not found or d.statut = 'annule' then raise exception 'Lien invalide'; end if;
  v_email := nullif(trim(coalesce(d.verification_email, d.client_email, '')), '');
  if v_email is null then raise exception 'Aucune adresse e-mail pour ce devis : contactez l''agence.'; end if;
  if (select count(*) from public.verifications_devis x where x.devis_id = d.id and x.cree_le > now() - interval '1 hour') >= 3 then
    raise exception 'Trop de demandes. Réessayez dans une heure ou contactez l''agence.';
  end if;
  v_code := lpad(((('x' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 8))::bit(32)::bigint) % 1000000)::text, 6, '0');
  insert into public.verifications_devis (devis_id, envoye_a, code_hash, expire_le)
  values (d.id, v_email, public._h(v_code || ':' || d.id::text), now() + interval '10 minutes');
  return query select v_code, v_email, d.id, d.numero::text, d.client_nom::text;
end $$;

-- 2) vérifier le code : renvoie une preuve (valable 30 min) ou lève une erreur
create or replace function public._verif_verifier(p_token uuid, p_code text)
returns text language plpgsql security definer set search_path to 'public' as $$
declare d record; v record; v_preuve text;
begin
  select * into d from public.devis where lien_token = p_token;
  if not found then raise exception 'Lien invalide'; end if;
  select * into v from public.verifications_devis x where x.devis_id = d.id and x.preuve_hash is null and x.expire_le > now()
    order by x.cree_le desc limit 1 for update;
  if not found then raise exception 'Code expiré ou absent. Demandez un nouveau code.'; end if;
  if v.essais >= 5 then raise exception 'Trop d''essais. Demandez un nouveau code.'; end if;
  update public.verifications_devis set essais = essais + 1 where id = v.id;
  if v.code_hash <> public._h(regexp_replace(coalesce(p_code, ''), '\D', '', 'g') || ':' || d.id::text) then
    return '!Code incorrect.';  -- retour normal (pas d'exception) pour que le compteur d'essais soit bien enregistré
  end if;
  v_preuve := replace(gen_random_uuid()::text || gen_random_uuid()::text, '-', '');
  update public.verifications_devis set preuve_hash = public._h(v_preuve), preuve_expire_le = now() + interval '30 minutes' where id = v.id;
  return v_preuve;
end $$;

-- 3) contrôler la preuve (appelée par la signature côté serveur)
create or replace function public._verif_controler(p_token uuid, p_preuve text)
returns boolean language sql security definer set search_path to 'public' as $$
  select exists (
    select 1 from public.verifications_devis x join public.devis d on d.id = x.devis_id
    where d.lien_token = p_token and x.preuve_hash = public._h(coalesce(p_preuve, '')) and x.preuve_expire_le > now()
  )
$$;

revoke all on function public._verif_demander(uuid), public._verif_verifier(uuid, text), public._verif_controler(uuid, text) from public, anon, authenticated;
grant execute on function public._verif_demander(uuid), public._verif_verifier(uuid, text), public._verif_controler(uuid, text) to service_role;

-- nettoyage : les vérifications de plus de 7 jours ne servent plus
create or replace function public._verif_nettoyer() returns void language sql security definer set search_path to 'public' as $$
  delete from public.verifications_devis where cree_le < now() - interval '7 days'
$$;
revoke all on function public._verif_nettoyer() from public, anon, authenticated;
grant execute on function public._verif_nettoyer() to service_role;

-- Retour arrière : drop function _verif_demander, _verif_verifier, _verif_controler, _verif_nettoyer ; drop table verifications_devis ;
-- alter table devis drop column verification_email.
