import { useEffect, useState, useSyncExternalStore } from "react";
import type { toast as ToastFn } from "@/hooks/use-toast";

/**
 * Envoi d'un e-mail avec un délai pour annuler, à la place d'une fenêtre « Êtes-vous sûr ? ».
 * Les envois en attente s'affichent dans un bandeau fixe (BandeauEnvois) qui ne disparaît pas quand un autre message apparaît :
 * à qui ça part, combien de secondes il reste, et un bouton « Annuler ». Sans clic, le message part à la fin du compte à rebours.
 * Fermer la page avant la fin : le navigateur prévient que l'envoi ne partira pas.
 */
export const DELAI_ANNULATION_MS = 10000;

interface Attente { cle: string; titre: string; description: string; fin: number; annuler: () => void }
let attentes: Attente[] = [];
const abonnes = new Set<() => void>();
const emettre = () => abonnes.forEach((f) => f());
const lire = () => attentes;
const sAbonner = (f: () => void) => { abonnes.add(f); return () => { abonnes.delete(f); }; };

export function envoyerAvecAnnulation(toast: typeof ToastFn, opts: { titre: string; description: string; envoyer: () => void | Promise<void>; quandAnnule?: () => void; delai?: number; cle?: string }) {
  const cle = opts.cle ?? opts.titre;
  if (attentes.some((a) => a.cle === cle)) { toast({ title: "Déjà en cours", description: "Cet envoi est déjà programmé : utilise « Annuler » dans le bandeau si besoin." }); return; }
  const delai = opts.delai ?? DELAI_ANNULATION_MS;
  let termine = false;
  const retirer = () => { attentes = attentes.filter((a) => a.cle !== cle); emettre(); };
  const minuterie = setTimeout(() => { if (termine) return; termine = true; retirer(); void opts.envoyer(); }, delai);
  attentes = [...attentes, {
    cle, titre: opts.titre, description: opts.description, fin: Date.now() + delai,
    annuler: () => {
      if (termine) { toast({ title: "Trop tard", description: "Le message est déjà parti." }); return; }
      termine = true; clearTimeout(minuterie); retirer(); opts.quandAnnule?.();
      toast({ title: "Envoi annulé", description: "Rien n'a été envoyé au client." });
    },
  }];
  emettre();
}

/** À monter une fois dans l'administration. */
export function BandeauEnvois() {
  const liste = useSyncExternalStore(sAbonner, lire, lire);
  useEffect(() => {
    if (!liste.length) return;
    const avant = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", avant);
    return () => window.removeEventListener("beforeunload", avant);
  }, [liste.length]);
  const [, setTic] = useState(0);
  useEffect(() => {
    if (!liste.length) return;
    const t = setInterval(() => setTic((n) => n + 1), 500);
    return () => clearInterval(t);
  }, [liste.length]);
  if (!liste.length) return null;
  return (
    <div className="fixed inset-x-3 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-[70] flex flex-col gap-2 lg:inset-x-auto lg:bottom-5 lg:right-5 lg:w-[26rem]" role="status" aria-live="polite" data-testid="bandeau-envois">
      {liste.map((a) => {
        const reste = Math.max(0, Math.ceil((a.fin - Date.now()) / 1000));
        return (
          <div key={a.cle} className="border-l-[3px] border-[#A8933F] bg-[#141414] px-4 py-3 text-[#F3ECDD] shadow-2xl">
            <p className="text-[14px] font-medium">{a.titre} · <span className="tabular-nums">{reste} s</span></p>
            <p className="mt-1 text-[12.5px] leading-snug text-[#BDB29C]">{a.description} Ne ferme pas la page.</p>
            <button type="button" onClick={a.annuler} data-testid="envoi-annuler" className="mt-2 inline-flex min-h-11 items-center border border-[#E4D49A]/50 px-5 text-[13px] text-[#E4D49A] hover:bg-white/10 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#E4D49A]">Annuler l'envoi</button>
          </div>
        );
      })}
    </div>
  );
}
