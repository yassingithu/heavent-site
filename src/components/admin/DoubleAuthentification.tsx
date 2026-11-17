import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, Smartphone, Copy } from "lucide-react";

/**
 * Double authentification de l'administrateur : un code à 6 chiffres généré par l'app « Mots de passe » de l'iPhone
 * (déverrouillée par Face ID) ou toute application d'authentification. Une fois activée, la connexion à l'administration
 * demande ce code, et la base refuse l'accès à toute session qui ne l'a pas donné (voir la fonction is_admin).
 */
type Facteur = { id: string; friendly_name?: string | null; created_at?: string };
type Inscription = { id: string; qr: string; secret: string; uri: string };

export default function DoubleAuthentification() {
  const { toast } = useToast();
  const [facteurs, setFacteurs] = useState<Facteur[] | null>(null);
  const [inscription, setInscription] = useState<Inscription | null>(null);
  const [code, setCode] = useState("");
  const [occupe, setOccupe] = useState(false);
  const [niveauOk, setNiveauOk] = useState(true);

  const charger = useCallback(async () => {
    const { data } = await supabase.auth.mfa.listFactors();
    setFacteurs((data?.totp ?? []).map((f: any) => ({ id: f.id, friendly_name: f.friendly_name, created_at: f.created_at })));
    const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    // Retirer un facteur exige d'avoir donné le code pendant cette session
    setNiveauOk(!aal || aal.nextLevel !== "aal2" || aal.currentLevel === "aal2");
  }, []);
  useEffect(() => { charger(); }, [charger]);

  const commencer = async () => {
    setOccupe(true);
    try {
      // Un enrôlement abandonné laisse un facteur « non vérifié » : on le retire avant d'en créer un nouveau
      const { data: tous } = await supabase.auth.mfa.listFactors();
      for (const f of (tous as any)?.all ?? []) if (f.factor_type === "totp" && f.status === "unverified") await supabase.auth.mfa.unenroll({ factorId: f.id });
      const { data, error } = await supabase.auth.mfa.enroll({ factorType: "totp", friendlyName: `iPhone ${new Date().toLocaleDateString("fr-FR")}` });
      if (error || !data) throw error ?? new Error("Activation impossible");
      setInscription({ id: data.id, qr: data.totp.qr_code, secret: data.totp.secret, uri: data.totp.uri });
      setCode("");
    } catch (e: any) {
      toast({ title: "Impossible de démarrer", description: e?.message ?? "Réessayez dans un instant.", variant: "destructive" });
    } finally { setOccupe(false); }
  };

  const confirmer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inscription || code.length !== 6) return;
    setOccupe(true);
    const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId: inscription.id, code });
    setOccupe(false);
    if (error) { toast({ title: "Code incorrect", description: "Vérifiez le code affiché dans l'app puis réessayez.", variant: "destructive" }); setCode(""); return; }
    setInscription(null);
    await charger();
    toast({ title: "Double authentification activée", description: "Le code sera demandé à chaque connexion à l'administration." });
  };

  const annuler = async () => {
    if (inscription) await supabase.auth.mfa.unenroll({ factorId: inscription.id });
    setInscription(null); setCode("");
  };

  const retirer = async (id: string) => {
    if (!window.confirm("Retirer cette double authentification ? L'accès à l'administration ne demandera plus de code.")) return;
    setOccupe(true);
    const { error } = await supabase.auth.mfa.unenroll({ factorId: id });
    setOccupe(false);
    if (error) { toast({ title: "Impossible de la retirer", description: error.message, variant: "destructive" }); return; }
    await charger();
  };

  const copier = async (t: string) => {
    try { await navigator.clipboard.writeText(t); toast({ title: "Clé copiée" }); } catch { /* la clé reste sélectionnable à l'écran */ }
  };

  const active = (facteurs?.length ?? 0) > 0;

  return (
    <Card data-testid="double-auth">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ShieldCheck className="h-5 w-5" />
          <span>Double authentification</span>
        </CardTitle>
        <CardDescription>
          {active ? "Active : un code à 6 chiffres est demandé après le mot de passe." : "Un code à 6 chiffres, donné par votre iPhone (Face ID), en plus du mot de passe."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {facteurs === null && <p className="text-sm text-muted-foreground">Chargement…</p>}

        {facteurs && active && !inscription && (
          <div className="space-y-3">
            {facteurs.map((f) => (
              <div key={f.id} className="flex items-center justify-between gap-3 rounded-lg border p-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Smartphone className="h-5 w-5 shrink-0 text-[#7A5F1F]" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{f.friendly_name || "Application d'authentification"}</p>
                    {f.created_at && <p className="text-xs text-muted-foreground">Activée le {new Date(f.created_at).toLocaleDateString("fr-FR")}</p>}
                  </div>
                </div>
                <Button variant="outline" size="sm" disabled={occupe || !niveauOk} onClick={() => retirer(f.id)}>Retirer</Button>
              </div>
            ))}
            {!niveauOk && <p className="text-xs text-muted-foreground">Pour la retirer, reconnectez-vous d'abord avec votre code.</p>}
            <p className="text-xs text-muted-foreground">
              Téléphone perdu ? Gardez un second appareil enregistré avant de retirer le premier : sans code, seul le tableau de bord Supabase permet de rétablir l'accès.
            </p>
          </div>
        )}

        {facteurs && !inscription && (
          <Button onClick={commencer} disabled={occupe} data-testid="double-auth-commencer">
            {active ? "Ajouter un autre appareil" : "Activer la double authentification"}
          </Button>
        )}

        {inscription && (
          <form onSubmit={confirmer} className="space-y-4">
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              <li>
                <strong>Sur ordinateur :</strong> ouvrez l'app <em>Appareil photo</em> de l'iPhone et visez ce code ; <strong>sur l'iPhone lui-même :</strong> touchez « Ouvrir dans Mots de passe ».
              </li>
              <li>Ajoutez le code de vérification : l'iPhone affiche un code à 6 chiffres qui change toutes les 30 secondes.</li>
              <li>Tapez ce code ci-dessous pour terminer.</li>
            </ol>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <img src={inscription.qr} alt="Code à scanner pour la double authentification" className="h-40 w-40 rounded-lg border bg-white p-2" />
              <div className="space-y-2 w-full">
                <a href={inscription.uri} className="inline-flex h-10 w-full sm:w-auto items-center justify-center rounded-md border px-4 text-sm font-medium hover:bg-muted">
                  Ouvrir dans Mots de passe
                </a>
                <button type="button" onClick={() => copier(inscription.secret)} className="flex w-full items-center gap-2 text-left text-xs text-muted-foreground">
                  <Copy className="h-3.5 w-3.5 shrink-0" />
                  <span className="break-all select-all">Saisie manuelle : {inscription.secret}</span>
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="code-double-auth" className="text-sm font-medium">Code à 6 chiffres</label>
              <Input id="code-double-auth" inputMode="numeric" autoComplete="one-time-code" maxLength={6} placeholder="000000"
                value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))} className="h-12 text-center text-xl tracking-[0.4em] max-w-[14rem]" />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={occupe || code.length !== 6}>Terminer</Button>
              <Button type="button" variant="ghost" onClick={annuler} disabled={occupe}>Annuler</Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
