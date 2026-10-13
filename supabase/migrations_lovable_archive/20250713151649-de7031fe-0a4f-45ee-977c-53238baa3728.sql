-- Supprimer tous les utilisateurs avec cet email de toutes les tables
DELETE FROM public.staff WHERE email = 'selassi.yassin@gmail.com';
DELETE FROM auth.users WHERE email = 'selassi.yassin@gmail.com';