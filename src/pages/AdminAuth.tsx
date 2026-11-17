import Seo from "@/components/Seo";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useInstallationAdmin } from "@/components/admin/accueil/AppTelephone";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Shield, ArrowLeft } from "lucide-react";
import { estAdmin, estEspaceNawar } from "@/lib/admin";


const AdminAuth = () => {
  useInstallationAdmin();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  // Étape « code » : le mot de passe est bon, la double authentification demande encore le code à 6 chiffres
  const [etapeCode, setEtapeCode] = useState(false);
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Redirect if already authenticated and is admin
  useEffect(() => {
    if (user && session) {
      (async () => {
        if (await codeRequis()) { setEtapeCode(true); return; }
        if ((await estAdmin()) || (await estEspaceNawar())) navigate("/admin");
      })();
    }
  }, [user, session, navigate]);

  /** Vrai si la session a donné le mot de passe mais pas encore le code de la double authentification. */
  const codeRequis = async () => {
    const { data } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    return !!data && data.nextLevel === "aal2" && data.currentLevel !== "aal2";
  };

  const verifierCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) return;
    setLoading(true);
    try {
      const { data: liste } = await supabase.auth.mfa.listFactors();
      const facteur = liste?.totp?.[0];
      if (!facteur) throw new Error("aucun facteur");
      const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId: facteur.id, code });
      if (error) {
        toast({ title: "Code incorrect", description: "Vérifiez le code affiché sur votre iPhone puis réessayez.", variant: "destructive" });
        setCode("");
        return;
      }
      if ((await estAdmin()) || (await estEspaceNawar())) navigate("/admin");
      else { await supabase.auth.signOut(); setEtapeCode(false); toast({ title: "Accès refusé", description: "Seul l'administrateur peut accéder à cette section", variant: "destructive" }); }
    } catch {
      toast({ title: "Erreur", description: "Une erreur inattendue s'est produite", variant: "destructive" });
    } finally { setLoading(false); }
  };

  const recommencer = async () => { await supabase.auth.signOut(); setEtapeCode(false); setCode(""); setPassword(""); };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast({
            title: "Erreur de connexion",
            description: "Email ou mot de passe incorrect",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Erreur",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }

      if (data.user && (await codeRequis())) { setEtapeCode(true); return; }

      if (data.user && ((await estAdmin()) || (await estEspaceNawar()))) {
        toast({
          title: "Connexion réussie",
          description: "Redirection vers l'administration...",
        });
        navigate("/admin");
      } else {
        // Déconnecter si ce n'est pas le bon utilisateur
        await supabase.auth.signOut();
        toast({
          title: "Accès refusé",
          description: "Seul l'administrateur peut accéder à cette section",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 p-4 sm:p-6 lg:p-8">
      <Seo noindex />
      <Card className="w-full max-w-sm sm:max-w-md shadow-xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-4 sm:pb-6">
          <div className="flex justify-center mb-3 sm:mb-4">
            <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-[#7A5F1F]" />
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold">Administration</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Connexion réservée à l'administrateur
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {etapeCode ? (
            <form onSubmit={verifierCode} className="space-y-4" data-testid="etape-code">
              <div className="space-y-2">
                <Label htmlFor="code">Code de vérification</Label>
                <p className="text-sm text-muted-foreground">Ouvrez l'app « Mots de passe » de votre iPhone (Face ID) et tapez le code à 6 chiffres.</p>
                <Input id="code" inputMode="numeric" autoComplete="one-time-code" autoFocus maxLength={6} placeholder="000000"
                  value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="h-12 text-center text-2xl tracking-[0.4em]" />
              </div>
              <Button type="submit" className="w-full h-11 sm:h-12 text-base font-medium" disabled={loading || code.length !== 6}>
                {loading ? t('auth.connecting') : "Valider"}
              </Button>
              <button type="button" onClick={recommencer} className="mx-auto flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" /> Changer de compte
              </button>
            </form>
          ) : (
          <form onSubmit={handleSignIn} className="space-y-3 sm:space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Administrateur</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 sm:h-12 text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 sm:h-12 text-base"
              />
            </div>
            <Button type="submit" className="w-full h-11 sm:h-12 text-base font-medium" disabled={loading}>
              {loading ? t('auth.connecting') : t('auth.sign_in')}
            </Button>
          </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAuth;