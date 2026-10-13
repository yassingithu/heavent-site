-- Mettre à jour la fonction send_auth_email pour rediriger vers la page de connexion
CREATE OR REPLACE FUNCTION public.send_auth_email()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  payload jsonb;
  webhook_url text;
BEGIN
  -- URL de notre edge function
  webhook_url := 'https://dlxaqkaivjkxtqyxswls.supabase.co/functions/v1/auth-email';
  
  -- Construire le payload avec les données nécessaires
  payload := jsonb_build_object(
    'user', jsonb_build_object(
      'id', NEW.id,
      'email', NEW.email,
      'created_at', NEW.created_at
    ),
    'email_data', jsonb_build_object(
      'token_hash', NEW.confirmation_token,
      'token', NEW.confirmation_token,
      'email_action_type', 'signup',
      'redirect_to', 'https://heaventagency.com/auth'
    )
  );

  -- Envoyer la requête HTTP vers notre edge function
  -- On utilise pg_net.http_post pour faire l'appel asynchrone
  PERFORM net.http_post(
    url := webhook_url,
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := payload
  );

  RETURN NEW;
END;
$function$;