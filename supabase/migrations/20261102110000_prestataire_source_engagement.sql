-- Source de la publicité et engagement sur les prix à l'inscription
alter table public.prestataires add column if not exists source text, add column if not exists engagement_prix_le timestamptz, add column if not exists prix_revu_le timestamptz;

create or replace function public.prestataire_inscrire(p jsonb)
returns uuid language plpgsql security definer set search_path = public as $$
declare v_id uuid; v_mail text := lower(trim(coalesce(p->>'email', '')));
begin
  if length(trim(coalesce(p->>'societe', ''))) < 2 or length(trim(coalesce(p->>'contact', ''))) < 2 or v_mail !~ '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$' then
    raise exception 'Nom, contact et e-mail sont obligatoires';
  end if;
  if jsonb_typeof(p->'prestations') is distinct from 'array' or jsonb_array_length(p->'prestations') = 0 then
    raise exception 'Ajoutez au moins une prestation avec son tarif';
  end if;
  if (select count(*) from prestataires where lower(email) = v_mail and cree_le > now() - interval '1 hour') >= 3
     or (select count(*) from prestataires where cree_le > now() - interval '10 minutes') >= 20 then
    raise exception 'Trop de demandes en peu de temps' using errcode = 'P0429';
  end if;
  insert into prestataires (societe, contact, email, telephone, ville, zones, categories, description, site_web, instagram, logo, photos, prestations, source, engagement_prix_le)
  values (left(trim(p->>'societe'), 120), left(trim(p->>'contact'), 120), v_mail, left(nullif(trim(p->>'telephone'), ''), 40),
    left(nullif(trim(p->>'ville'), ''), 80), left(nullif(trim(p->>'zones'), ''), 300),
    coalesce((select array_agg(left(x, 60)) from jsonb_array_elements_text(coalesce(p->'categories', '[]')) x), '{}'),
    left(nullif(trim(p->>'description'), ''), 3000), left(nullif(trim(p->>'site_web'), ''), 200), left(nullif(trim(p->>'instagram'), ''), 100),
    case when p->>'logo' like 'inscriptions/%' then left(p->>'logo', 300) end,
    coalesce((select array_agg(left(x, 300)) from jsonb_array_elements_text(coalesce(p->'photos', '[]')) x where x like 'inscriptions/%'), '{}'),
    (select coalesce(jsonb_agg(jsonb_build_object(
        'fonction', left(trim(e->>'fonction'), 120), 'unite', coalesce(nullif(e->>'unite', ''), 'forfait'),
        'prix', greatest(0, coalesce((e->>'prix')::numeric, 0)), 'description', left(coalesce(e->>'description', ''), 400))), '[]')
     from (select e from jsonb_array_elements(p->'prestations') e where length(trim(coalesce(e->>'fonction', ''))) > 1 limit 30) t),
    left(nullif(trim(p->>'source'), ''), 60), case when (p->>'engagement_prix') = 'true' then now() end)
  returning id into v_id;
  return v_id;
end $$;
