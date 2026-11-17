import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, Copy, Loader2 } from "lucide-react";
import { ChampCode, messageCode } from "./ChampCode";

/**
 * Double authentification de l'administrateur : un code à 6 chiffres généré par l'app « Mots de passe » de l'iPhone
 * (déverrouillée par Face ID) ou toute application d'authentification. Une fois activée, la connexion à l'administration
 * demande ce code, et la base refuse l'accès à toute session qui ne l'a pas donné (voir la fonction is_admin).
 */
type Facteur = { id: string; friendly_name?: string | null; created_at?: string };
type Inscription = { id: string; qr: string; secret: string; uri: string };

const groupes = (s: string) => s.match(/.{1,4}/g)?.join(" ") ?? s;
const dateLongue = (d?: string) => (d ? new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : "");

export default function DoubleAuthentification() {
  const { toast } = useToast();
  const [facteurs, setFacteurs] = useState<Facteur[] | null>(null);
  const [inscription, setInscription] = useState<Inscription | null>(null);
  const [code, setCode] = useState("");
  const [erreur, setErreur] = useState<string | null>(null);
  const [occupe, setOccupe] = useState(false);
  const [niveauOk, setNiveauOk] = useState(true);
  const champ = useRef<HTMLInputElement>(null);
  const formulaire = useRef<HTMLFormElement>(null);

  const charger = useCallback(async () => {
    const { data } = await supabase.auth.mfa.listFactors();
    setFacteurs((data?.totp ?? []).map((f: any) => ({ id: f.id, friendly_name: f.friendly_name, created_at: f.created_at })));
    const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    // Retirer ou ajouter un facteur exige d'avoir donné le code pendant cette session
    setNiveauOk(!aal || aal.nextLevel !== "aal2" || aal.currentLevel === "aal2");
  }, []);
  useEffect(() => { charger(); }, [charger]);

  // Validation automatique dès le sixième chiffre (le code proposé par l'iPhone remplit la case d'un coup)
  useEffect(() => { if (code.length === 6 && !occupe && inscription) formulaire.current?.requestSubmit(); }, [code]); // eslint-disable-line react-hooks/exhaustive-deps

  const commencer = async () => {
    setOccupe(true); setErreur(null);
    try {
      // Un enrôlement abandonné laisse un facteur « non vérifié » : on le retire avant d'en créer un nouveau
      const { data: tous } = await supabase.auth.mfa.listFactors();
      for (const f of (tous as any)?.all ?? []) if (f.factor_type === "totp" && f.status === "unverified") await supabase.auth.mfa.unenroll({ factorId: f.id });
      const nom = `Appareil ${new Date().toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" })}`;
      const { data, error } = await supabase.auth.mfa.enroll({ factorType: "totp", friendlyName: nom, issuer: "heaventagency.com" } as any);
      if (error || !data) throw error ?? new Error("Activation impossible");
      setInscription({ id: data.id, qr: data.totp.qr_code, secret: data.totp.secret, uri: data.totp.uri });
      setCode("");
    } catch (e: any) {
      toast({ title: "Impossible de démarrer", description: e?.message ?? "Réessayez dans un instant.", variant: "destructive" });
    } finally { setOccupe(false); }
  };

  const confirmer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inscription || code.length !== 6 || occupe) return;
    setOccupe(true);
    const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId: inscription.id, code });
    setOccupe(false);
    if (error) { setErreur(messageCode(error as any)); setCode(""); champ.current?.focus(); return; }
    setInscription(null); setErreur(null);
    await charger();
    toast({ title: "Double authentification activée", description: "Gardez l'app Mots de passe : le code sera demandé à chaque connexion à l'administration." });
  };

  const annuler = async () => {
    if (inscription) await supabase.auth.mfa.unenroll({ factorId: inscription.id });
    setInscription(null); setCode(""); setErreur(null);
  };

  const retirer = async (f: Facteur) => {
    if (!window.confirm(`Retirer « ${f.friendly_name || "cet appareil"} » ? L'administration ne sera plus protégée que par le mot de passe.`)) return;
    setOccupe(true);
    const { error } = await supabase.auth.mfa.unenroll({ factorId: f.id });
    setOccupe(false);
    if (error) { toast({ title: "Impossible de la retirer", description: error.message, variant: "destructive" }); return; }
    await charger();
    toast({ title: "Double authentification retirée" });
  };

  const copier = async (t: string) => {
    try { await navigator.clipboard.writeText(t); toast({ title: "Clé copiée" }); } catch { /* la clé reste sélectionnable à l'écran */ }
  };

  const active = (facteurs?.length ?? 0) > 0;
  const boutonPlein = "inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-none bg-[#141414] px-8 font-medium tracking-wide text-[#E4D49A] hover:bg-[#2a2420] disabled:bg-[#D9D0BC] disabled:text-[#5E554A]";

  return (
    <Card data-testid="double-auth" className="rounded-none border-[#DCCDAA] bg-[#FAF6EC] shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 font-serif text-2xl font-normal">
          <ShieldCheck className="h-5 w-5 text-[#7A5F1F]" aria-hidden />
          <span>Double authentification</span>
          {active && !inscription && (
            <span className="ml-1 inline-flex items-center gap-[7px] font-sans text-[12.5px] font-medium text-[#1F5A4C]">
              <span className="h-[6px] w-[6px] rotate-45 bg-current" aria-hidden />Active
            </span>
          )}
        </CardTitle>
        <CardDescription>
          {active ? "Un code à 6 chiffres est demandé après le mot de passe." : "Un code à 6 chiffres, donné par votre iPhone (Face ID), en plus du mot de passe."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {facteurs === null && <div className="min-h-[88px] text-sm text-muted-foreground" aria-busy="true">Chargement…</div>}

        {facteurs && active && !inscription && (
          <div className="space-y-3">
            {facteurs.map((f) => (
              <div key={f.id} className="flex items-center justify-between gap-3 border-t border-[#EADFC8] pt-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{f.friendly_name || "Application d'authentification"}</p>
                  {f.created_at && <p className="text-xs text-[#6B6155]">Activée le {dateLongue(f.created_at)}</p>}
                </div>
                <button type="button" disabled={occupe || !niveauOk} onClick={() => retirer(f)} className="min-h-11 px-2 text-sm underline disabled:no-underline disabled:opacity-50">Retirer</button>
              </div>
            ))}
            {!niveauOk && <p className="text-sm text-[#6B6155]">Pour retirer ou ajouter un appareil, reconnectez-vous d'abord avec votre code.</p>}
            <p className="border-l-2 border-[#A8933F] bg-[#A8933F]/10 py-2 pl-3 text-sm text-[#7A5F1F]">
              Téléphone perdu ? Il n'y a pas de code de secours : gardez un second appareil enregistré. Sinon, seul le tableau de bord Supabase permet de rétablir l'accès.
            </p>
          </div>
        )}

        {facteurs && !inscription && (
          <Button onClick={commencer} disabled={occupe || (active && !niveauOk)} data-testid="double-auth-commencer"
            className="min-h-12 w-full sm:w-auto rounded-none bg-[#141414] px-8 text-[#E4D49A] hover:bg-[#2a2420]">
            {occupe && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />}
            {active ? "Ajouter un autre appareil" : "Activer la double authentification"}
          </Button>
        )}

        {inscription && (
          <form ref={formulaire} onSubmit={confirmer} className="space-y-5 animate-in fade-in-0 duration-300" aria-busy={occupe}>
            <div className="border-l-2 border-[#8A2E26] bg-[#8A2E26]/5 py-2 pl-3 text-sm text-[#5E2018]">
              Avant de terminer : ajoutez aussi ce code sur un <strong>deuxième appareil</strong> (un second téléphone, ou notez la clé de saisie manuelle en lieu sûr).
              Sans code de secours, un téléphone perdu bloque l'administration.
            </div>

            <ol className="m-0 list-none p-0">
              <li className="grid grid-cols-[2rem_1fr] gap-x-3 border-t border-[#EADFC8] py-3">
                <span className="font-serif text-2xl text-[#7A5F1F]">1</span>
                <div className="space-y-3 text-sm">
                  <p><strong>Sur l'iPhone :</strong> touchez le bouton, puis validez dans l'app Mots de passe.</p>
                  <a href={inscription.uri} className={boutonPlein}>Ouvrir dans Mots de passe</a>
                  <div className="hidden sm:flex items-center gap-4">
                    <div className="relative bg-white p-[14px] shadow-[inset_0_0_0_1px_#EADFC8]">
                      <span className="absolute -left-[5px] -top-[5px] h-[18px] w-[18px] border-l-[1.5px] border-t-[1.5px] border-[#A8933F]" aria-hidden />
                      <span className="absolute -bottom-[5px] -right-[5px] h-[18px] w-[18px] border-b-[1.5px] border-r-[1.5px] border-[#A8933F]" aria-hidden />
                      <img src={inscription.qr} alt="Code à scanner pour la double authentification" className="h-44 w-44" />
                    </div>
                    <p className="text-[#5E554A]"><strong>Sur ordinateur :</strong> visez ce code avec l'app Appareil photo de l'iPhone.</p>
                  </div>
                </div>
              </li>
              <li className="grid grid-cols-[2rem_1fr] gap-x-3 border-t border-[#EADFC8] py-3">
                <span className="font-serif text-2xl text-[#7A5F1F]">2</span>
                <div className="space-y-2 text-sm">
                  <p>Dans Mots de passe, enregistrez-le dans l'entrée « heaventagency.com » (« Ajouter le code de vérification »). L'iPhone le proposera alors au-dessus du clavier à chaque connexion.</p>
                  <button type="button" onClick={() => copier(inscription.secret)} className="flex min-h-11 w-full items-center gap-2 text-left text-[#5E554A]">
                    <Copy className="h-4 w-4 shrink-0" aria-hidden />
                    <span>Saisie manuelle : <span className="select-all break-all tabular-nums tracking-[0.12em] text-[#141414]">{groupes(inscription.secret)}</span></span>
                  </button>
                </div>
              </li>
              <li className="grid grid-cols-[2rem_1fr] gap-x-3 border-t border-[#EADFC8] py-3">
                <span className="font-serif text-2xl text-[#7A5F1F]">3</span>
                <div className="text-sm">
                  <p className="mb-2">Tapez le code à 6 chiffres affiché : la validation se fait toute seule.</p>
                  <ChampCode ref={champ} id="code-double-auth" value={code} onChange={(v) => { setCode(v); setErreur(null); }} erreur={erreur} />
                </div>
              </li>
            </ol>

            <div className="flex flex-wrap items-center gap-3">
              <button type="submit" disabled={occupe || code.length !== 6} className={boutonPlein}>
                {occupe && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}{occupe ? "Vérification…" : "Activer maintenant"}
              </button>
              <button type="button" onClick={annuler} disabled={occupe} className="min-h-11 px-2 text-sm underline">Annuler</button>
            </div>
            <p className="text-xs text-[#6B6155]">Si vous annulez, supprimez l'entrée de code ajoutée dans Mots de passe : elle ne fonctionnera plus.</p>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
