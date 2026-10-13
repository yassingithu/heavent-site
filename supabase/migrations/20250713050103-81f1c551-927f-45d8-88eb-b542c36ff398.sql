-- S'assurer que le bucket identites est public
UPDATE storage.buckets 
SET public = true 
WHERE id = 'identites';