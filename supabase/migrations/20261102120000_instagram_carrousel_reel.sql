-- Posts Instagram : carrousel (plusieurs images) et Reel (vidéo)
alter table public.posts_instagram add column if not exists diapositives text[], add column if not exists video_url text;
