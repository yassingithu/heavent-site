-- Configuration des webhooks d'authentification pour utiliser notre edge function personnalisée
-- Cela permet d'envoyer des emails de confirmation personnalisés via Resend

-- D'abord, on s'assure que l'extension pg_net est activée pour faire des requêtes HTTP
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Fonction pour envoyer les emails d'authentification via notre edge function
CREATE OR REPLACE FUNCTION public.send_auth_email()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
      'redirect_to', 'https://heaventagency.com/staff-dashboard'
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
$$;

-- Créer un trigger qui se déclenche quand un nouvel utilisateur est créé
-- et qu'il a besoin d'une confirmation email
DROP TRIGGER IF EXISTS on_auth_user_created_email ON auth.users;

CREATE TRIGGER on_auth_user_created_email
  AFTER INSERT ON auth.users
  FOR EACH ROW
  WHEN (NEW.confirmation_token IS NOT NULL AND NEW.email_confirmed_at IS NULL)
  EXECUTE FUNCTION public.send_auth_email();

-- Message de confirmation
DO $$
BEGIN
  RAISE NOTICE 'Configuration des emails d''authentification terminée. Les emails de confirmation seront maintenant envoyés via Resend.';
END $$;