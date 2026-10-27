-- Le mail du matin n'est plus lié aux « mots du jour » : un réglage à part (recoit_resume).
-- Les mots doux et la surprise restent réservés à ceux qui ont recoit_mots (Imane, Nawar) ; Yassin peut recevoir le résumé sans les mots.
-- Retour arrière : alter table public.admin_profils drop column recoit_resume;  (puis remettre .eq("recoit_mots", true) dans resume-matin)
alter table public.admin_profils add column if not exists recoit_resume boolean not null default false;
update public.admin_profils set recoit_resume = true where espace = 'admin' and (recoit_mots or lower(email) = 'y.selassi@heaventagency.com');
