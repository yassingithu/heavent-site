-- Heavent Studio : 12 métiers de démo au lieu de 4.
-- Seule modification : studio_demander accepte désormais n'importe quel code de métier de la forme « lettres minuscules »
-- (au lieu de la liste figée de 4). Un code inconnu de l'application retombe sur la démo événementielle (secteurDe).
-- Le reste de la fonction est strictement identique à la version du 21/10 (20261021220000_studio_secteur_logo.sql).
-- Retour arrière : réappliquer la version du 21/10 de la fonction (liste de 4 métiers).

create or replace function public.studio_demander(p_nom text, p_agence text, p_email text, p_telephone text, p_ville text, p_formule text, p_message text, p_secteur text, p_logo_url text)
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
  insert into studio_demandes (nom, agence, email, telephone, ville, formule, message, secteur, logo_url)
  values (left(trim(p_nom), 120), left(trim(p_agence), 120), v_mail, left(nullif(trim(p_telephone), ''), 40), left(nullif(trim(p_ville), ''), 80),
          left(nullif(trim(p_formule), ''), 40), left(nullif(trim(p_message), ''), 3000),
          case when p_secteur ~ '^[a-z]{3,20}$' then p_secteur end,
          case when p_logo_url like 'https://mapiwnsjsluiwmnulhqk.supabase.co/storage/v1/object/public/photos/studio/%' then left(p_logo_url, 300) end)
  returning id into v_id;
  return v_id;
end $$;
revoke execute on function public.studio_demander(text, text, text, text, text, text, text, text, text) from public;
grant execute on function public.studio_demander(text, text, text, text, text, text, text, text, text) to anon, authenticated;
