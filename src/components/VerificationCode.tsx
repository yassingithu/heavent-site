import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useTexte } from "@/i18n/textes";
import { NUMERO_WHATSAPP } from "@/components/BoutonWhatsApp";

/**
 * Vérification par code e-mail : un lien transféré ne suffit pas pour signer ou exporter.
 * Le code part à l'adresse du devis (ou à celle indiquée par l'agence). Le serveur remet une « preuve » valable 30 min.
 * Les RSVP et la consultation n'y passent jamais.
 */
const CLE = (token: string) => `verif-${token.slice(0, 8)}`;
/** Preuve gardée pour la session du navigateur (onglet), pour ne pas redemander un code à chaque action. */
export function preuveEnMemoire(token: string): string | null {
  try {
    const v = JSON.parse(sessionStorage.getItem(CLE(token)) ?? "null");
    return v && v.jusqua > Date.now() ? (v.preuve as string) : null;
  } catch { return null; }
}
const ENVOI = (token: string) => `verifenvoi-${token.slice(0, 8)}`;
/** Évite de renvoyer un code à chaque rechargement de la page (3 envois par heure au maximum). */
const dernierEnvoi = (token: string): string | null => {
  try { const v = JSON.parse(sessionStorage.getItem(ENVOI(token)) ?? "null"); return v && Date.now() - v.t < 9 * 60_000 ? (v.adresse as string) : null; } catch { return null; }
};
const noterEnvoi = (token: string, adresse: string) => { try { sessionStorage.setItem(ENVOI(token), JSON.stringify({ t: Date.now(), adresse })); } catch { /* */ } };
/** Chiffres arabes (٠-٩, ۰-۹) → 0-9, puis uniquement les chiffres. */
const chiffres = (v: string) => v.replace(/[٠-٩]/g, (c) => String(c.charCodeAt(0) - 0x0660)).replace(/[۰-۹]/g, (c) => String(c.charCodeAt(0) - 0x06f0)).replace(/\D/g, "");
const garder = (token: string, preuve: string) => {
  try { sessionStorage.setItem(CLE(token), JSON.stringify({ preuve, jusqua: Date.now() + 25 * 60_000 })); } catch { /* */ }
};

async function appel(corps: Record<string, unknown>) {
  const { data, error } = await supabase.functions.invoke("verifier-acces", { body: corps });
  let message = data?.error as string | undefined;
  if (error && !message) { try { message = (await (error as any).context?.json())?.error; } catch { /* */ } }
  return { data, erreur: error || data?.error ? (message ?? "Une erreur est survenue. Réessayez dans un instant.") : null };
}

export default function VerificationCode({ token, motif, onVerifie, onAnnuler }: { token: string; motif: string; onVerifie: (preuve: string) => void; onAnnuler: () => void }) {
  const x = useTexte();
  const [etat, setEtat] = useState<"envoi" | "saisie" | "controle" | "echec">("envoi");
  const [adresse, setAdresse] = useState("");
  const [dejaEnvoye, setDejaEnvoye] = useState(false);
  const [code, setCode] = useState("");
  const [erreur, setErreur] = useState("");
  const [renvoiDans, setRenvoiDans] = useState(30);
  const lance = useRef(false);
  const racine = useRef<HTMLDivElement>(null);
  const champ = useRef<HTMLInputElement>(null);

  const demander = async (force = true) => {
    setErreur("");
    const avant = force ? null : dernierEnvoi(token);
    if (avant) { setAdresse(avant); setDejaEnvoye(true); setEtat("saisie"); return; }
    setEtat("envoi"); setDejaEnvoye(false);
    const { data, erreur: err } = await appel({ token, action: "demander", langue: x.langue });
    if (err) { setErreur(err); const recent = dernierEnvoi(token); if (recent) { setAdresse(recent); setDejaEnvoye(true); setEtat("saisie"); } else setEtat("echec"); return; }
    const a = data?.envoye_a ?? ""; noterEnvoi(token, a);
    setAdresse(a); setCode(""); setRenvoiDans(30); setEtat("saisie");
  };
  useEffect(() => {
    if (lance.current) return; lance.current = true;
    racine.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    void demander(false);
  }, []); // eslint-disable-line
  useEffect(() => { if (etat === "saisie") champ.current?.focus({ preventScroll: true }); }, [etat]);
  useEffect(() => {
    if (etat !== "saisie" || renvoiDans <= 0) return;
    const t = setTimeout(() => setRenvoiDans((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [etat, renvoiDans]);

  const verifier = async (valeur = code) => {
    const propre = chiffres(valeur);
    if (propre.length !== 6) return setErreur(x("Saisissez les 6 chiffres du code."));
    setErreur(""); setEtat("controle");
    const { data, erreur: err } = await appel({ token, action: "verifier", code: propre });
    if (err) { setErreur(err); setEtat("saisie"); return; }
    garder(token, data.preuve);
    onVerifie(data.preuve as string);
  };
  const saisir = (v: string) => { const c = chiffres(v).slice(0, 6); setCode(c); if (c.length === 6 && etat === "saisie") void verifier(c); };
  const message = encodeURIComponent("Bonjour, je n'ai plus accès à l'e-mail de mon devis. Voici le nom des mariés et la date de l'événement : ");

  return (
    <div ref={racine} className="border border-[#EADFC8] border-l-2 border-l-[#A8933F] bg-[#FBF6E9] p-4 sm:p-5 pt-5 space-y-4" role="group" aria-labelledby="verif-titre" data-testid="verification-code">
      <div>
        <p className="text-[11px] uppercase tracking-[0.22em] text-[#8C6D22]">{x("Étape finale")}</p>
        <h3 id="verif-titre" className="font-serif text-2xl">{x("Une dernière vérification")}</h3>
      </div>
      <p className="text-sm text-[#5E554A]">
        {motif}{" "}{etat === "saisie" ? <>{x("Seul le dernier code reçu est valable.")}{" "}</> : null}
        {etat === "envoi" ? x("Envoi du code…") : adresse && etat !== "echec" ? <>{dejaEnvoye ? x("Code déjà envoyé à l'adresse :") : x("Votre code est parti à l'adresse :")} <bdi dir="ltr" className="font-medium text-[#141414]">{adresse}</bdi></> : ""}
      </p>
      {etat !== "echec" && (
        <div className="space-y-3">
          <div>
            <label htmlFor="code-verif" className="text-xs uppercase tracking-[0.18em] text-[#6B6155]">{x("Votre code")}</label>
            <input ref={champ} id="code-verif" value={code} onChange={(e) => saisir(e.target.value)} inputMode="numeric" autoComplete="one-time-code" maxLength={8} dir="ltr" placeholder="······"
              onKeyDown={(e) => { if (e.key === "Enter") void verifier(); }}
              className="mt-1 block w-full max-w-[16rem] rounded-none border-0 border-b-2 border-[#A8933F] bg-transparent px-1 min-h-14 font-serif text-3xl tabular-nums tracking-[0.4em] text-[#141414] placeholder:text-[#C9BFA8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8C6D22]" data-testid="code-verif" />
          </div>
          <button type="button" onClick={() => void verifier()} disabled={etat !== "saisie" || chiffres(code).length !== 6}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-none bg-[#141414] text-[#E4D49A] tracking-wide px-8 min-h-12 font-medium disabled:bg-[#D9D0BC] disabled:text-[#5E554A]" data-testid="verifier-code">
            {etat === "controle" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />} {x("Confirmer")}
          </button>
        </div>
      )}
      <p className="min-h-5 text-sm" aria-live="polite">{erreur && <span className="block border-l-2 border-[#8A2E26] pl-2 text-[#8A2E26]">{erreur}</span>}</p>
      <div className="border-t border-[#EADFC8] pt-3 space-y-2 text-sm text-[#5E554A]">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          {etat === "echec"
            ? <button type="button" onClick={() => void demander(true)} className="underline min-h-11">{x("Réessayer")}</button>
            : <button type="button" onClick={() => void demander(true)} disabled={etat !== "saisie" || (!dejaEnvoye && renvoiDans > 0)} className="underline disabled:no-underline disabled:opacity-60 min-h-11">
                {!dejaEnvoye && renvoiDans > 0 ? x("Renvoyer le code ({s} s)", { s: renvoiDans }) : x("Renvoyer le code")}
              </button>}
          <button type="button" onClick={onAnnuler} className="underline min-h-11">{x("Annuler")}</button>
        </div>
        <a className="inline-flex items-center underline min-h-11" href={`https://wa.me/${NUMERO_WHATSAPP}?text=${message}`} target="_blank" rel="noreferrer">
          {x("Plus d'accès à cet e-mail ? Écrivez-nous sur WhatsApp : nous enverrons le code à une autre adresse.")}
        </a>
      </div>
    </div>
  );
}
