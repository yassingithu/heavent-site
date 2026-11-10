import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Check, Copy, Loader2, Search, WifiOff } from "lucide-react";
import Seo from "@/components/Seo";
import { supabase } from "@/integrations/supabase/client";

interface Reponse { nom: string; reponse: "oui" | "non"; nb: number; accompagnants: string[]; le: string }
interface Liste { noms: string; date_evenement: string | null; lieu: string | null; reponses: Reponse[] }

const INTERVALLE = 20_000;
const cle = (r: Reponse) => `${r.nom.toLowerCase()}|${r.reponse}|${r.nb}|${r.le}`;
const pluriel = (n: number, un: string, plus: string) => `${n} ${n > 1 ? plus : un}`;

/** Liste des invités en direct : lien privé, lecture seule, sans compte. Se met à jour toute seule. */
export default function ListeInvitesDirecte() {
  const { jeton = "" } = useParams();
  const [d, setD] = useState<Liste | null | undefined>(undefined);
  const [horsLigne, setHorsLigne] = useState(false);
  const [maj, setMaj] = useState<number | null>(null);
  const [nouveaux, setNouveaux] = useState<Set<string>>(new Set());
  const [recherche, setRecherche] = useState("");
  const [copie, setCopie] = useState(false);
  const vus = useRef<Set<string> | null>(null);

  const charger = useCallback(async () => {
    if (!/^[0-9a-f-]{36}$/i.test(jeton)) { setD(null); return; }
    try {
      const { data, error } = await (supabase as any).rpc("liste_invites_directe", { p_jeton: jeton });
      if (error) throw error;
      setHorsLigne(false); setMaj(Date.now());
      if (!data) { setD(null); return; }
      const liste = data as Liste;
      const maintenant = new Set(liste.reponses.map(cle));
      if (vus.current) {
        const neufs = new Set([...maintenant].filter((k) => !vus.current!.has(k)));
        if (neufs.size) { setNouveaux(neufs); window.setTimeout(() => setNouveaux(new Set()), 8000); }
      }
      vus.current = maintenant;
      setD(liste);
    } catch { setHorsLigne(true); setD((x) => (x === undefined ? null : x)); }
  }, [jeton]);

  useEffect(() => {
    charger();
    const id = window.setInterval(() => { if (document.visibilityState === "visible") charger(); }, INTERVALLE);
    const revoir = () => { if (document.visibilityState === "visible") charger(); };
    document.addEventListener("visibilitychange", revoir);
    return () => { window.clearInterval(id); document.removeEventListener("visibilitychange", revoir); };
  }, [charger]);

  const [, tic] = useState(0);
  useEffect(() => { const id = window.setInterval(() => tic((n) => n + 1), 10_000); return () => window.clearInterval(id); }, []);

  const { oui, non, personnes } = useMemo(() => {
    const r = d?.reponses ?? [];
    const o = r.filter((x) => x.reponse === "oui"); const n = r.filter((x) => x.reponse === "non");
    return { oui: o, non: n, personnes: o.reduce((s, x) => s + x.nb, 0) };
  }, [d]);
  const q = recherche.trim().toLowerCase();
  const filtre = (x: Reponse) => !q || x.nom.toLowerCase().includes(q) || x.accompagnants.some((a) => a.toLowerCase().includes(q));

  const copier = async () => {
    if (!d) return;
    const t = `Invités confirmés — ${d.noms}\n${pluriel(personnes, "personne", "personnes")}\n\n${oui.map((c) => `• ${c.nom}${c.accompagnants.length ? ` + ${c.accompagnants.join(", ")}` : ""}`).join("\n")}${non.length ? `\n\nNe viendront pas : ${non.map((c) => c.nom).join(", ")}` : ""}`;
    try { await navigator.clipboard.writeText(t); setCopie(true); window.setTimeout(() => setCopie(false), 2000); } catch { /* copie refusée */ }
  };

  if (d === undefined) return <div className="min-h-[100dvh] grid place-items-center bg-[#141414] text-white"><Seo noindex /><Loader2 className="h-6 w-6 animate-spin" /></div>;
  if (d === null) return (
    <main className="min-h-[100dvh] grid place-items-center bg-[#141414] px-6 text-center text-[#F7F3E8]">
      <Seo noindex />
      <div className="max-w-sm">
        <p className="font-titre text-3xl">Ce lien n'est plus actif</p>
        <p className="font-texte mt-3 text-[#CFC6B2]">{horsLigne ? "Impossible de charger la liste : vérifiez votre connexion, puis rechargez la page." : "Il a peut-être été coupé. Demandez un nouveau lien à Heavent People Agency."}</p>
      </div>
    </main>
  );

  const date = d.date_evenement ? new Date(`${d.date_evenement}T12:00:00`).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : null;
  const il = maj ? Math.max(0, Math.round((Date.now() - maj) / 1000)) : 0;
  const lignes = oui.filter(filtre);

  return (
    <main className="min-h-[100dvh] bg-[#FBF8F1] text-[#2A2420] font-texte" data-testid="liste-directe">
      <Seo noindex />
      <header className="bg-[#141414] text-[#F7F3E8] px-4 pt-[max(2rem,env(safe-area-inset-top))] pb-8 text-center">
        <p className="text-[11px] tracking-[.32em] uppercase text-[#C6AD62]">Vos invités, en direct</p>
        <h1 className="font-titre text-[clamp(30px,9vw,44px)] leading-tight mt-2 text-balance">{d.noms}</h1>
        {(date || d.lieu) && <p className="mt-2 text-sm text-[#CFC6B2] first-letter:uppercase">{[date, d.lieu].filter(Boolean).join(" · ")}</p>}
        <p className="mt-5 inline-flex items-center gap-2 text-xs text-[#CFC6B2]" role="status" aria-live="polite">
          {horsLigne ? <><WifiOff className="h-3.5 w-3.5 text-[#E4B07A]" /> Hors connexion : dernière mise à jour il y a {il < 60 ? `${il} s` : `${Math.round(il / 60)} min`}</> : <><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full rounded-full bg-[#7FD1A8] opacity-60 motion-safe:animate-ping" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#7FD1A8]" /></span> En direct · mis à jour {il < 5 ? "à l'instant" : il < 60 ? `il y a ${il} s` : `il y a ${Math.round(il / 60)} min`}</>}
        </p>
      </header>

      <div className="mx-auto max-w-xl px-4 -mt-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white border border-[#EADFC8] px-4 py-4 text-center shadow-sm">
            <p className="font-titre text-4xl text-[#8E7333]" data-testid="total-personnes">{personnes}</p>
            <p className="text-xs uppercase tracking-widest text-[#6B6154] mt-1">{personnes > 1 ? "personnes confirmées" : "personne confirmée"}</p>
          </div>
          <div className="rounded-2xl bg-white border border-[#EADFC8] px-4 py-4 text-center shadow-sm">
            <p className="font-titre text-4xl text-[#2A2420]">{non.length}</p>
            <p className="text-xs uppercase tracking-widest text-[#6B6154] mt-1">{non.length > 1 ? "absents" : "absent"}</p>
          </div>
        </div>

        <section className="mt-6 rounded-3xl bg-white border border-[#EADFC8] p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-titre text-xl">Ils seront là</h2>
            <button type="button" onClick={copier} className="inline-flex items-center gap-1.5 rounded-full border border-[#DCCBA6] px-3 min-h-10 text-sm hover:bg-[#FBF6E9]">
              {copie ? <><Check className="h-4 w-4 text-[#1F5A4C]" /> Copié</> : <><Copy className="h-4 w-4" /> Copier la liste</>}
            </button>
          </div>
          {oui.length > 10 && (
            <label className="mt-3 flex items-center gap-2 rounded-xl border border-[#E3D6BA] px-3 min-h-11 bg-[#FBF8F1]">
              <Search className="h-4 w-4 text-[#8a8070]" aria-hidden="true" />
              <span className="sr-only">Chercher un invité</span>
              <input className="w-full bg-transparent text-base outline-none" placeholder="Chercher un invité" value={recherche} onChange={(e) => setRecherche(e.target.value)} />
            </label>
          )}
          {oui.length === 0 ? (
            <p className="mt-4 text-sm text-[#6B6154]">Personne n'a encore confirmé. Cette page se met à jour toute seule dès la première réponse.</p>
          ) : lignes.length === 0 ? (
            <p className="mt-4 text-sm text-[#6B6154]">Aucun invité ne correspond à « {recherche} ».</p>
          ) : (
            <ul className="mt-2 divide-y divide-[#EFE6D2]">
              {lignes.map((c) => (
                <li key={cle(c)} className={`py-3 flex items-start justify-between gap-3 rounded-lg ${nouveaux.has(cle(c)) ? "bg-[#FFF7E0] motion-safe:animate-[pulse_1.6s_ease-out_2]" : ""}`}>
                  <span className="min-w-0">
                    <span className="block font-medium break-words">{c.nom}{nouveaux.has(cle(c)) && <span className="ml-2 align-middle text-[10px] uppercase tracking-widest rounded-full bg-[#141414] text-[#E4D49A] px-2 py-0.5">Nouveau</span>}</span>
                    {c.accompagnants.length > 0 && <span className="block text-sm text-[#6B6154] break-words">avec {c.accompagnants.join(", ")}</span>}
                  </span>
                  <span className="shrink-0 text-sm text-[#8E7333] font-medium">{pluriel(c.nb, "personne", "personnes")}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {non.length > 0 && (
          <details className="mt-3 rounded-3xl bg-white border border-[#EADFC8] px-4 sm:px-5 py-3">
            <summary className="cursor-pointer min-h-10 flex items-center font-medium">Ne pourront pas venir ({non.length})</summary>
            <ul className="mt-1 divide-y divide-[#EFE6D2]">{non.filter(filtre).map((c) => <li key={cle(c)} className="py-2.5 break-words">{c.nom}</li>)}</ul>
          </details>
        )}

        <p className="mt-8 mb-[max(2rem,env(safe-area-inset-bottom))] text-center text-xs text-[#8a8070]">Liste privée, en lecture seule. Ne partagez ce lien qu'avec les personnes de confiance : elles verront les noms de vos invités.<br />Heavent People Agency</p>
      </div>
    </main>
  );
}
