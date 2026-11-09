-- Nettoyage : index sur les clés étrangères, fonctions internes fermées au public, règles d'accès auth.* évaluées une fois par requête.
create index if not exists affectations_contrat_id_idx on public.affectations(contrat_id);
create index if not exists contrats_devis_id_idx on public.contrats(devis_id);
create index if not exists devis_demande_entreprise_id_idx on public.devis(demande_entreprise_id);
create index if not exists devis_demande_mariage_id_idx on public.devis(demande_mariage_id);
create index if not exists instagram_commentaires_post_id_idx on public.instagram_commentaires(post_id);
create index if not exists newsletters_post_id_idx on public.newsletters(post_id);
create index if not exists paiements_paie_corrige_paiement_idx on public.paiements_paie(corrige_paiement);
create index if not exists remarques_contrat_staff_id_idx on public.remarques_contrat(staff_id);
create index if not exists reponses_invitation_apercu_id_idx on public.reponses_invitation(apercu_id);
create index if not exists souvenirs_invites_devis_id_idx on public.souvenirs_invites(devis_id);
create index if not exists souvenirs_photos_devis_id_idx on public.souvenirs_photos(devis_id);
create index if not exists souvenirs_photos_souvenir_id_idx on public.souvenirs_photos(souvenir_id);
create index if not exists studio_demos_demande_id_idx on public.studio_demos(demande_id);
create index if not exists temoignages_devis_id_idx on public.temoignages(devis_id);

revoke execute on function public._est_nawar() from public, anon;
revoke execute on function public._liste_mode(uuid) from public, anon;
grant execute on function public._est_nawar() to authenticated;
grant execute on function public._liste_mode(uuid) to authenticated;
-- (les 9 règles d'accès staff/contrats/fiches/disponibilités/affectations/remarques/paiements/paramètres ont été réécrites avec (select auth.xxx()) directement en base)
