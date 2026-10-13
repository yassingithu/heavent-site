import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Vérifier d'abord s'il y a des paramètres dans l'URL
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('access_token');
        const refreshToken = urlParams.get('refresh_token');
        const type = urlParams.get('type');
        const error = urlParams.get('error');
        const errorDescription = urlParams.get('error_description');

        console.log("AuthCallback - URL params:", { accessToken, refreshToken, type, error, errorDescription });

        // Si il y a une erreur dans l'URL
        if (error) {
          console.error("Erreur dans l'URL:", error, errorDescription);
          toast.error(`Erreur : ${errorDescription || error}`);
          navigate("/auth");
          return;
        }

        // Si c'est une récupération de mot de passe, aller directement à une page dédiée
        if (type === 'recovery' && accessToken && refreshToken) {
          console.log("🔄 Récupération de mot de passe détectée, redirection directe vers reset");
          // Sauvegarder les tokens dans localStorage temporairement
          localStorage.setItem('reset_tokens', JSON.stringify({ accessToken, refreshToken }));
          navigate('/auth?mode=reset');
          return;
        }

        // Pour la confirmation d'email, essayer d'échanger les tokens
        if (type === 'signup' && accessToken && refreshToken) {
          console.log("Confirmation d'email détectée");
          
          // Utiliser les tokens pour établir la session
          const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });

          if (sessionError) {
            console.error("Erreur lors de l'établissement de la session:", sessionError);
            toast.error("Erreur lors de la confirmation de votre email");
            navigate("/auth");
            return;
          }

          if (sessionData.session) {
            toast.success("Email confirmé avec succès !");
            navigate("/staff-dashboard");
            return;
          }
        }

        // Fallback : vérifier la session normale
        const { data, error: getSessionError } = await supabase.auth.getSession();
        
        if (getSessionError) {
          console.error("Erreur lors de la récupération de session:", getSessionError);
          toast.error("Erreur lors de la confirmation");
          navigate("/auth");
          return;
        }

        if (data.session) {
          toast.success("Authentification réussie !");
          navigate("/staff-dashboard");
        } else {
          console.log("Aucune session trouvée, redirection vers auth");
          navigate("/auth");
        }
      } catch (error) {
        console.error("Erreur dans AuthCallback:", error);
        toast.error("Une erreur s'est produite");
        navigate("/auth");
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-accent/30">
      <div className="text-center max-w-md mx-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-lg mb-2">Traitement de l'authentification...</p>
        <p className="text-sm text-muted-foreground">
          URL actuelle: {window.location.href}
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Paramètres: {window.location.search}
        </p>
      </div>
    </div>
  );
};

export default AuthCallback;