import Seo from "@/components/Seo";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useInstallationAdmin } from "@/components/admin/accueil/AppTelephone";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";
import { estAdmin, estEspaceNawar } from "@/lib/admin";
import { ChampCode, messageCode } from "@/components/admin/ChampCode";

const bouton = "inline-flex w-full min-h-12 items-center justify-center gap-2 rounded-none bg-[#141414] px-8 font-medium tracking-wide text-[#E4D49A] hover:bg-[#2a2420] disabled:bg-[#D9D0BC] disabled:text-[#5E554A]";

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
  const [erreurCode, setErreurCode] = useState<string | null>(null);
  const champCode = useRef<HTMLInputElement>(null);
  const formCode = useRef<HTMLFormElement>(null);
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

  // Validation automatique dès le sixième chiffre (le code proposé par l'iPhone remplit la case d'un coup)
  useEffect(() => { if (etapeCode && code.length === 6 && !loading) formCode.current?.requestSubmit(); }, [code]); // eslint-disable-line react-hooks/exhaustive-deps

  /** Vrai si la session a donné le mot de passe mais pas encore le code de la double authentification. */
  const codeRequis = async () => {
    const { data, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    if (error) {
      toast({ title: "Connexion impossible", description: "Vérifiez votre réseau puis réessayez.", variant: "destructive" });
      return false;
    }
    return !!data && data.nextLevel === "aal2" && data.currentLevel !== "aal2";
  };

  const verifierCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6 || loading) return;
    setLoading(true);
    try {
      const { data: liste } = await supabase.auth.mfa.listFactors();
      // Chaque appareil enregistré est essayé : le code peut venir de n'importe lequel
      let ok = false;
      let derniere: any = null;
      for (const f of liste?.totp ?? []) {
        const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId: f.id, code });
        if (!error) { ok = true; break; }
        derniere = error;
      }
      if (!ok) {
        setErreurCode(messageCode(derniere ?? { code: "mfa_verification_failed" }));
        setCode("");
        champCode.current?.focus();
        return;
      }
      if ((await estAdmin()) || (await estEspaceNawar())) navigate("/admin");
      else { await supabase.auth.signOut(); setEtapeCode(false); toast({ title: "Accès refusé", description: "Seul l'administrateur peut accéder à cette section", variant: "destructive" }); }
    } catch {
      setErreurCode("Pas de connexion : votre code n'a pas été envoyé. Réessayez.");
    } finally { setLoading(false); }
  };

  const seDeconnecter = async () => { await supabase.auth.signOut(); setEtapeCode(false); setCode(""); setErreurCode(null); setPassword(""); };

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

  const surtitre = "text-[10.5px] font-medium uppercase tracking-[0.28em] text-[#7A5F1F]";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#141414] p-4 sm:p-6 lg:p-8">
      <Seo noindex />
      <div className="relative w-full max-w-md border border-[#DCCDAA] bg-[#FAF6EC] p-6 sm:p-8 min-h-[22rem]">
        <span className="absolute -left-px -right-px -top-px h-[2px] bg-[#A8933F]" aria-hidden />
        {etapeCode ? (
          <form key="etape-code" ref={formCode} onSubmit={verifierCode} className="space-y-5 animate-in fade-in-0 duration-300" data-testid="etape-code" aria-busy={loading}>
            <div className="space-y-2">
              <p className={surtitre}>Deuxième étape</p>
              <h1 className="font-serif text-3xl text-[#141414]">Une dernière vérification</h1>
              <p className="text-sm text-[#5E554A]">Touchez le code proposé au-dessus du clavier, ou ouvrez l'app « Mots de passe » de votre iPhone et tapez le code à 6 chiffres.</p>
            </div>
            <ChampCode ref={champCode} id="code" value={code} onChange={(v) => { setCode(v); setErreurCode(null); }} erreur={erreurCode} autoFocus />
            <button type="submit" className={bouton} disabled={loading || code.length !== 6}>
              {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}{loading ? "Vérification…" : "Valider"}
            </button>
            <div className="border-t border-[#EADFC8] pt-3 text-sm text-[#5E554A]">
              <button type="button" onClick={seDeconnecter} className="min-h-11 px-1 underline">Se déconnecter</button>
              <p className="pt-1">Téléphone indisponible ? Utilisez votre deuxième appareil, ou demandez le retrait du code dans le tableau de bord Supabase.</p>
            </div>
          </form>
        ) : (
          <form key="etape-mdp" onSubmit={handleSignIn} className="space-y-4 animate-in fade-in-0 duration-300">
            <div className="space-y-2">
              <p className={surtitre}>Administration</p>
              <h1 className="font-serif text-3xl text-[#141414]">Connexion</h1>
              <p className="text-sm text-[#5E554A]">Réservée à l'administrateur</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Administrateur</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 sm:h-12 rounded-none text-base"
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
                className="h-11 sm:h-12 rounded-none text-base"
              />
            </div>
            <button type="submit" className={bouton} disabled={loading}>
              {loading ? t('auth.connecting') : t('auth.sign_in')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminAuth;
