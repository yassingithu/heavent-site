import { useEffect, useRef, useState } from "react";
import { Check, Loader2, Lock, X } from "lucide-react";
import { resume, type Choix } from "./etat";
import { VIDE, dejaEnvoyee, envoyerDemande, erreurs, type Coordonnees } from "./demande";
import { btnContour, btnOr, champ } from "./ui";

/** Fenêtre simple (la bibliothèque de fenêtres du site passerait sous le jeu plein écran) */
export default function Demande({ ouvert, onFermer, choix, onNote }: { ouvert: boolean; onFermer: () => void; choix: Choix; onNote: (n: string) => void }) {
  const [k, setK] = useState<Coordonnees>({ ...VIDE, ville: choix.ville });
  const [consent, setConsent] = useState(false);
  const [piege, setPiege] = useState("");
  const [err, setErr] = useState<Record<string, string>>({});
  const [envoi, setEnvoi] = useState(false);
  const [bilan, setBilan] = useState<null | { ok: boolean; message?: string }>(null);
  const [deja, setDeja] = useState(false);
  const verrou = useRef(false);
  const premier = useRef<HTMLInputElement>(null);
  const r = resume(choix);

  useEffect(() => { if (ouvert) { setBilan(null); setDeja(false); window.setTimeout(() => premier.current?.focus(), 60); } }, [ouvert]);
  useEffect(() => { if (!ouvert) return; const f = (e: KeyboardEvent) => e.key === "Escape" && !envoi && onFermer(); window.addEventListener("keydown", f); return () => window.removeEventListener("keydown", f); }, [ouvert, onFermer, envoi]);
  useEffect(() => { setK((x) => (x.ville ? x : { ...x, ville: choix.ville })); }, [choix.ville]);
  if (!ouvert) return null;

  const maj = (p: Partial<Coordonnees>) => {
    setK((x) => ({ ...x, ...p }));
    // l'erreur disparaît dès que le champ est corrigé
    setErr((e) => { const n = { ...e }; for (const c of Object.keys(p)) delete n[c]; return n; });
  };
  const envoyer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (verrou.current || envoi) return; // aucune double soumission
    const x = erreurs(k, consent); setErr(x);
    if (Object.keys(x).length) return;
    if (piege) { setBilan({ ok: true }); return; } // robot : on fait comme si, sans rien envoyer
    if (dejaEnvoyee(choix, k.email)) { setDeja(true); return; }
    verrou.current = true; setEnvoi(true);
    const res = await envoyerDemande(choix, k);
    setEnvoi(false);
    if (res.envoye) setBilan({ ok: true }); else { verrou.current = false; setBilan({ ok: false, message: res.message }); }
  };

  const Erreur = ({ id }: { id: string }) => (err[id] ? <p id={`err-${id}`} role="alert" className="mt-1 text-[12.5px] text-[#F2A8A0]">{err[id]}</p> : null);
  const lab = "mb-1 block text-[13px] text-[#D9D0BC]";

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-4" data-testid="demande">
      <div role="dialog" aria-modal="true" aria-labelledby="demande-titre" className="max-h-[94dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-white/15 bg-[#1d1920] p-5 shadow-2xl sm:rounded-3xl">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div><p className="text-[11px] uppercase tracking-[0.2em] text-[#E4D49A]">Heavent People Agency</p><h2 id="demande-titre" className="font-serif text-2xl text-[#F6EFDD]">Confier mon projet à Heavent</h2></div>
          <button onClick={onFermer} disabled={envoi} aria-label="Fermer" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#d8cfbb] hover:bg-white/10"><X className="h-5 w-5" /></button>
        </div>

        {bilan?.ok ? (
          <div className="py-6 text-center" role="status" data-testid="demande-ok">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A74E] text-[#17141a]"><Check className="h-7 w-7" /></span>
            <p className="mt-4 font-serif text-xl text-[#F6EFDD]">Merci {k.nom.trim().split(" ")[0]} !</p>
            <p className="mt-2 text-[14.5px] leading-snug text-[#D9D0BC]">Ta demande est bien enregistrée. Notre équipe étudie ton devis et revient vers toi sous 24 h avec ton prix final.</p>
            <button onClick={onFermer} className={`${btnOr} mt-5`}>Retour à mon événement</button>
          </div>
        ) : (
          <form onSubmit={envoyer} noValidate className="grid gap-3.5">
            <details className="rounded-xl border border-white/12 bg-white/[0.04] p-3 text-[13.5px] text-[#D9D0BC]">
              <summary className="cursor-pointer text-[#F0E8D6]">Ce que l'équipe recevra (résumé de ta création)</summary>
              <ul className="mt-2 grid gap-1 leading-snug">
                <li><b>{r.titre}</b> — {r.type}, environ {r.invites} invités</li>
                <li>Lieu d'inspiration : {r.lieu} · Style : {r.style} · Couleurs : {r.palette}</li>
                {r.lumiere && <li>Lumière : {r.lumiere}</li>}{r.musique && <li>Musique : {r.musique}</li>}{r.accueil && <li>Accueil : {r.accueil}</li>}
                {r.decors.length > 0 && <li>Décoration : {r.decors.map((d) => d.nom).join(", ")}</li>}
                {r.experiences.length > 0 && <li>Expériences : {r.experiences.map((d) => d.nom).join(", ")}</li>}
                {r.missions.length > 0 && <li>Missions : {r.missions.map((m) => `${m.titre} → ${m.reponse}`).join(" ; ")}</li>}
              </ul>
              <p className="mt-2 text-[12px] text-[#8f8777]">Tes échanges avec l'assistant ne sont pas transmis.</p>
            </details>
            <div><label className={lab} htmlFor="d-nom">Nom *</label><input ref={premier} id="d-nom" autoComplete="name" value={k.nom} onChange={(e) => maj({ nom: e.target.value })} aria-invalid={!!err.nom} aria-describedby={err.nom ? "err-nom" : undefined} className={champ} data-testid="d-nom" /><Erreur id="nom" /></div>
            <div><label className={lab} htmlFor="d-email">Adresse e-mail *</label><input id="d-email" type="email" inputMode="email" autoComplete="email" value={k.email} onChange={(e) => maj({ email: e.target.value })} aria-invalid={!!err.email} aria-describedby={err.email ? "err-email" : undefined} className={champ} data-testid="d-email" /><Erreur id="email" /></div>
            <div><label className={lab} htmlFor="d-tel">Téléphone ou WhatsApp (facultatif)</label><input id="d-tel" type="tel" inputMode="tel" autoComplete="tel" value={k.telephone} onChange={(e) => maj({ telephone: e.target.value })} className={champ} data-testid="d-tel" /></div>
            <div><label className={lab} htmlFor="d-ville">Ville *</label><input id="d-ville" autoComplete="address-level2" value={k.ville} onChange={(e) => maj({ ville: e.target.value })} aria-invalid={!!err.ville} aria-describedby={err.ville ? "err-ville" : undefined} className={champ} data-testid="d-ville" /><Erreur id="ville" /></div>
            <div>
              <label className={lab} htmlFor="d-date">Date ou période (facultatif)</label>
              <input id="d-date" type={k.dateInconnue ? "text" : "date"} disabled={k.dateInconnue} value={k.dateInconnue ? "Je ne sais pas encore" : k.date} onChange={(e) => maj({ date: e.target.value })} className={champ} data-testid="d-date" />
              <label className="mt-2 flex min-h-9 items-center gap-2 text-[13px] text-[#D9D0BC]"><input type="checkbox" checked={k.dateInconnue} onChange={(e) => maj({ dateInconnue: e.target.checked })} className="h-4 w-4 accent-[#C9A74E]" />Je ne sais pas encore</label>
            </div>
            <div><label className={lab} htmlFor="d-msg">Message complémentaire (facultatif)</label><textarea id="d-msg" rows={3} maxLength={600} value={k.message} onChange={(e) => maj({ message: e.target.value })} className={`${champ} py-2`} data-testid="d-msg" /></div>
            <div><label className={lab} htmlFor="d-note">Une précision à ajouter à ton projet ? (facultatif)</label><textarea id="d-note" rows={2} maxLength={400} value={choix.note} onChange={(e) => onNote(e.target.value)} className={`${champ} py-2`} placeholder="Ex. un thème, une contrainte, une idée qui nous aiderait…" data-testid="d-note" /></div>
            {/* Champ-piège pour les robots : invisible pour les personnes */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden"><label>Site web<input tabIndex={-1} autoComplete="off" value={piege} onChange={(e) => setPiege(e.target.value)} /></label></div>
            <div>
              <label className="flex items-start gap-2.5 text-[13px] leading-snug text-[#D9D0BC]"><input type="checkbox" checked={consent} onChange={(e) => { setConsent(e.target.checked); setErr((x) => { const n = { ...x }; delete n.consentement; return n; }); }} aria-invalid={!!err.consentement} className="mt-0.5 h-5 w-5 shrink-0 accent-[#C9A74E]" data-testid="d-consent" />
                <span>J'accepte que Heavent People Agency utilise ces informations pour me recontacter au sujet de mon projet, conformément à la <a href="/politique-confidentialite" target="_blank" rel="noreferrer" className="underline text-[#E4D49A]">politique de confidentialité</a>. Elles ne sont jamais conservées dans mon navigateur.</span></label>
              <Erreur id="consentement" />
            </div>
            {deja && <p role="status" className="rounded-xl border border-[#C9A74E]/40 bg-[#C9A74E]/10 p-3 text-[13.5px] text-[#F0E8D6]">Cette demande a déjà été envoyée pendant cette visite. Modifie ton événement si tu souhaites en envoyer une nouvelle.</p>}
            {bilan && !bilan.ok && <p role="alert" className="rounded-xl border border-[#F2A8A0]/50 bg-[#F2A8A0]/10 p-3 text-[13.5px] text-[#F7C7C0]" data-testid="demande-erreur">{bilan.message} Ta création est conservée : tu peux réessayer.</p>}
            <div className="flex flex-wrap items-center gap-2.5">
              <button type="submit" disabled={envoi} className={btnOr} data-testid="demande-envoyer">{envoi ? <><Loader2 className="h-4 w-4 animate-spin" />Envoi en cours…</> : <><Lock className="h-4 w-4" />Envoyer ma demande</>}</button>
              <button type="button" onClick={onFermer} disabled={envoi} className={btnContour}>Annuler</button>
            </div>
            <p className="text-[12px] text-[#8f8777]">Aucun prix n'est affiché ici : l'équipe étudie ton projet et t'envoie ton devis avec le prix final.</p>
          </form>
        )}
      </div>
    </div>
  );
}
