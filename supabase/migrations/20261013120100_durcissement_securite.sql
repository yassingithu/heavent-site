alter table public.admins enable row level security;
revoke all on public.admins from anon, authenticated;

-- Le public (non connecté) ne peut rien lire ; il peut seulement déposer
-- une inscription staff ou une demande de devis.
revoke all on public.staff, public.contrats, public.fiches_paie, public.disponibilites,
  public.devis_entreprise, public.devis_mariage, public.parametres_agence,
  public.catalogue_prestations, public.devis, public.devis_lignes from anon;
grant insert on public.staff, public.devis_entreprise, public.devis_mariage to anon;

-- Le recalcul des totaux n'est déclenché que par les triggers
alter function public.devis_lignes_after_change() security definer;
alter function public.devis_after_update() security definer;
revoke execute on function public.devis_recalculer(uuid) from authenticated, anon, public;
revoke execute on function public.devis_lignes_after_change() from authenticated, anon, public;
revoke execute on function public.devis_after_update() from authenticated, anon, public;
