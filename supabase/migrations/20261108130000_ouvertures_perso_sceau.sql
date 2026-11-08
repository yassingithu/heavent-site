-- Position verticale du sceau et du bouton sur les ouvertures vidéo ajoutées (en % de la hauteur). Ajout simple, rien n'est supprimé.
alter table public.ouvertures_perso add column if not exists sceau_y smallint not null default 50 check (sceau_y between 15 and 85);
