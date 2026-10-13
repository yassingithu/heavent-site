import Seo from "@/components/Seo";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

const Auth = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Détecter immédiatement si on est en mode reset depuis l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const isResetMode = urlParams.get('mode') === 'reset';
  const [resetPassword, setResetPassword] = useState(isResetMode);

  useEffect(() => {
    // Si on est en mode reset, traiter les tokens et ne pas initialiser l'auth normale
    if (isResetMode) {
      console.log("🔄 Mode reset détecté depuis URL");
      
      const storedTokens = localStorage.getItem('reset_tokens');
      if (storedTokens) {
        try {
          const { accessToken, refreshToken } = JSON.parse(storedTokens);
          console.log("🔑 Tokens récupérés pour reset password");
          
          // Établir la session pour permettre le changement de mot de passe
          supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          }).then(({ error }) => {
            if (error) {
              console.error("❌ Erreur établissement session reset:", error);
              toast({
                title: "Erreur",
                description: "Lien de récupération expiré",
                variant: "destructive",
              });
              localStorage.removeItem('reset_tokens');
              setResetPassword(false);
            } else {
              console.log("✅ Session reset établie avec succès");
              localStorage.removeItem('reset_tokens');
            }
          });
          
          // Nettoyer l'URL
          window.history.replaceState({}, document.title, '/auth');
        } catch (e) {
          console.error("❌ Erreur parsing tokens:", e);
          localStorage.removeItem('reset_tokens');
          setResetPassword(false);
        }
      } else {
        // Pas de tokens, retour au mode normal
        setResetPassword(false);
      }
      return; // Arrêter ici pour éviter l'initialisation auth normale
    }
    
    // Configuration auth normale uniquement si pas en mode reset
    console.log("⚙️ Configuration auth normale");
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("🔔 Auth state change:", event);
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("🔍 Session existante:", !!session);
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [isResetMode]);

  // Redirect if already authenticated (but not during password reset)
  useEffect(() => {
    console.log("🚀 Effet de redirection:", { 
      user: !!user, 
      session: !!session, 
      resetPassword, 
      isResetMode,
      url: window.location.href 
    });
    
    // NE PAS rediriger si on est en mode reset
    if (user && session && !resetPassword && !isResetMode) {
      console.log("➡️ Redirection vers dashboard (pas en mode reset)");
      navigate("/staff-dashboard");
    }
  }, [user, session, navigate, resetPassword, isResetMode]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
        toast({
          title: t('auth.login_error'),
          description: t('auth.invalid_credentials'),
          variant: "destructive",
        });
        } else {
        toast({
          title: t('auth.error'),
          description: error.message,
          variant: "destructive",
        });
        }
        return;
      }

      if (data.user) {
        toast({
          title: t('auth.login_success'),
          description: t('auth.redirecting'),
        });
        navigate("/staff-dashboard");
      }
    } catch (error: any) {
      toast({
        title: t('auth.error'),
        description: t('auth.unexpected_error'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };


  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback`,
      });

      if (error) {
        toast({
          title: t('auth.error'),
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: t('auth.email_sent'),
        description: t('auth.check_email_reset'),
      });
      setResetMode(false);
    } catch (error: any) {
      toast({
        title: t('auth.error'),
        description: t('auth.unexpected_error'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        toast({
          title: t('auth.error'),
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Succès",
        description: "Votre mot de passe a été mis à jour avec succès",
      });
      
      setResetPassword(false);
      setNewPassword("");
      navigate("/staff-dashboard");
    } catch (error: any) {
      toast({
        title: t('auth.error'),
        description: t('auth.unexpected_error'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (resetPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-sm sm:max-w-md shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-4 sm:pb-6">
            <CardTitle className="text-xl sm:text-2xl font-bold">Nouveau mot de passe</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Entrez votre nouveau mot de passe
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <form onSubmit={handleUpdatePassword} className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">Nouveau mot de passe</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Entrez votre nouveau mot de passe"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="h-11 sm:h-12 text-base"
                />
              </div>
              <Button type="submit" className="w-full h-11 sm:h-12 text-base font-medium" disabled={loading}>
                {loading ? "Mise à jour..." : "Mettre à jour le mot de passe"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (resetMode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-sm sm:max-w-md shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-4 sm:pb-6">
            <CardTitle className="text-xl sm:text-2xl font-bold">{t('auth.password_recovery')}</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              {t('auth.enter_email_reset')}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <form onSubmit={handlePasswordReset} className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email">{t('auth.email')}</Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder={t('auth.email_placeholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 sm:h-12 text-base"
                />
              </div>
              <Button type="submit" className="w-full h-11 sm:h-12 text-base font-medium" disabled={loading}>
                {loading ? t('auth.sending') : t('auth.send_link')}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full h-11 sm:h-12 text-base"
                onClick={() => setResetMode(false)}
              >
                {t('auth.back_to_login')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 p-4 sm:p-6 lg:p-8">
      <Seo noindex />
      <Card className="w-full max-w-sm sm:max-w-md shadow-xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-4 sm:pb-6">
          <CardTitle className="text-xl sm:text-2xl font-bold">{t('auth.staff_login')}</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            {t('auth.connect_to_space')}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleSignIn} className="space-y-3 sm:space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signin-email">{t('auth.email')}</Label>
              <Input
                id="signin-email"
                type="email"
                placeholder={t('auth.email_placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 sm:h-12 text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signin-password">{t('auth.password')}</Label>
              <Input
                id="signin-password"
                type="password"
                placeholder={t('auth.password_placeholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 sm:h-12 text-base"
              />
            </div>
            <Button type="submit" className="w-full h-11 sm:h-12 text-base font-medium" disabled={loading}>
              {loading ? t('auth.connecting') : t('auth.sign_in')}
            </Button>
            <Button 
              type="button" 
              variant="link" 
              className="w-full text-sm underline-offset-4"
              onClick={() => setResetMode(true)}
            >
              {t('auth.forgot_password')}
            </Button>
          </form>
          
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
            <p className="text-center text-xs sm:text-sm text-muted-foreground mb-3">
              {t('auth.no_account')}
            </p>
            <Button 
              variant="outline" 
              className="w-full h-11 sm:h-12 text-base"
              onClick={() => navigate("/inscription-staff")}
            >
              {t('auth.register_as_staff')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;