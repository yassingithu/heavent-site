-- Musique d'ouverture des invitations : fichiers audio (MP3, M4A) dans le dépôt « ouvertures », 10 Mo au plus.
update storage.buckets set file_size_limit = 10485760, allowed_mime_types = array['video/mp4','video/webm','image/webp','image/jpeg','audio/mpeg','audio/mp4','audio/x-m4a','audio/aac'] where id = 'ouvertures';
