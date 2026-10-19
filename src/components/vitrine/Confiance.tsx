import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useTexte } from "@/i18n/textes";
import { BadgeCheck, ChevronDown, Clock, HeartHandshake, Quote, ShieldCheck, Star, UserCheck } from "lucide-react";

/**
 * Éléments de confiance (gérés dans l'admin → Site vitrine) : chiffres clés, note Google, engagements,
 * logos de clients, témoignages publiés et FAQ. Chaque bloc n'apparaît que s'il est renseigné.
 */
export interface Vitrine {
  chiffres: { annees: number | null; evenements: number | null; crews: number | null } | null;
  google: { note: number; nb: number | null; lien: string | null } | null;
  engagements: { cnss: boolean; assurance: boolean; remplacement: boolean; reponse24h: boolean } | null;
  faq: { q: string; r: string }[] | null;
  references: { nom: string; logo: string | null; site: string | null }[];
  temoignages: { auteur: string; contexte: string | null; texte: string; note: number | null }[];
}

let cache: Promise<Vitrine | null> | null = null;
export const chargerVitrine = (forcer = false) => {
  if (!cache || forcer) cache = (supabase as any).rpc("vitrine_public").then(({ data }: any) => (data ?? null) as Vitrine | null).catch(() => null);
  return cache!;
};
export function useVitrine() {
  const [v, setV] = useState<Vitrine | null>(null);
  useEffect(() => { let ok = true; chargerVitrine().then((x) => ok && setV(x)); return () => { ok = false; }; }, []);
  return v;
}

const nf = (n: number) => new Intl.NumberFormat("fr-FR").format(n);

export const ENGAGEMENTS = [
  { cle: "remplacement", icone: UserCheck, titre: "Remplacement garanti", texte: "En cas d'absence d'un membre de l'équipe, nous le remplaçons par un profil équivalent." },
  { cle: "cnss", icone: BadgeCheck, titre: "Personnel déclaré", texte: "Nos hôtesses et hôtes sont salariés de l'agence et déclarés à la CNSS." },
  { cle: "assurance", icone: ShieldCheck, titre: "Assurance responsabilité civile", texte: "Nos prestations sont couvertes par une assurance responsabilité civile professionnelle." },
  { cle: "reponse24h", icone: Clock, titre: "Devis sous 24 h", texte: "Votre devis détaillé sous 24 h, à consulter et signer en ligne." },
] as const;

export function NoteGoogle({ v, clair = false }: { v: Vitrine | null; clair?: boolean }) {
  const x = useTexte();
  if (!v?.google) return null;
  const contenu = (
    <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm ${clair ? "bg-white/10 text-white" : "bg-white border border-[#EADFC8] text-[#141414]"}`} data-testid="note-google">
      <span className="flex">{[1, 2, 3, 4, 5].map((i) => <Star key={i} className={`h-4 w-4 ${i <= Math.round(v.google!.note) ? "fill-[#C8B560] text-[#C8B560]" : "text-[#DCCBA6]"}`} />)}</span>
      <b>{x.langue === "fr" ? String(v.google.note).replace(".", ",") : String(v.google.note)}/5</b> {x("sur Google")}{v.google.nb ? <span className="opacity-70">({x("{n} avis", { n: nf(v.google.nb) })})</span> : null}
    </span>
  );
  return v.google.lien ? <a href={v.google.lien} target="_blank" rel="noreferrer">{contenu}</a> : contenu;
}

export function Chiffres({ v }: { v: Vitrine | null }) {
  const x = useTexte();
  const c = v?.chiffres;
  const liste = [
    c?.annees && [x("{n} ans", { n: nf(c.annees) }), x("d'expérience")],
    c?.evenements && [`${nf(c.evenements)}+`, x("événements réalisés")],
    c?.crews && [`${nf(c.crews)}+`, x("hôtesses et hôtes")],
  ].filter(Boolean) as [string, string][];
  if (!liste.length) return null;
  return (
    <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 max-w-2xl mx-auto" data-testid="chiffres-cles">
      {liste.map(([n, l]) => (
        <div key={l} className="text-center">
          <div className="font-serif text-3xl sm:text-4xl text-[#A8933F]">{n}</div>
          <div className="text-xs sm:text-sm text-muted-foreground">{l}</div>
        </div>
      ))}
    </div>
  );
}

export function Engagements({ v }: { v: Vitrine | null }) {
  const x = useTexte();
  const actifs = ENGAGEMENTS.filter((e) => v?.engagements?.[e.cle]);
  if (!actifs.length) return null;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="engagements">
      {actifs.map(({ cle, icone: Icone, titre, texte }) => (
        <div key={cle} className="rounded-2xl border border-[#EADFC8] bg-white p-5">
          <Icone className="h-6 w-6 text-[#A8933F] mb-2" />
          <div className="font-semibold mb-1">{x(titre)}</div>
          <p className="text-sm text-muted-foreground">{x(texte)}</p>
        </div>
      ))}
    </div>
  );
}

export function Logos({ v }: { v: Vitrine | null }) {
  const x = useTexte();
  const refs = (v?.references ?? []).filter((r) => r.logo);
  if (!refs.length) return null;
  return (
    <div data-testid="logos-clients">
      <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">{x("Ils nous ont fait confiance")}</p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
        {refs.map((r) => {
          const img = <img src={supabase.storage.from("assets").getPublicUrl(r.logo!).data.publicUrl} alt={r.nom} title={r.nom} loading="lazy" className="h-10 sm:h-12 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition" />;
          return r.site ? <a key={r.nom} href={r.site} target="_blank" rel="noreferrer nofollow">{img}</a> : <span key={r.nom}>{img}</span>;
        })}
      </div>
    </div>
  );
}

export function Temoignages({ v }: { v: Vitrine | null }) {
  const t = v?.temoignages ?? [];
  if (!t.length) return null;
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="temoignages">
      {t.slice(0, 6).map((x, i) => (
        <figure key={i} className="rounded-2xl border border-[#EADFC8] bg-white p-5 flex flex-col">
          <Quote className="h-5 w-5 text-[#C8B560] mb-2" />
          {x.note ? <div className="flex mb-2">{[1, 2, 3, 4, 5].map((n) => <Star key={n} className={`h-4 w-4 ${n <= x.note! ? "fill-[#C8B560] text-[#C8B560]" : "text-[#DCCBA6]"}`} />)}</div> : null}
          <blockquote className="text-sm text-[#3d362d] flex-1 whitespace-pre-line">« {x.texte} »</blockquote>
          <figcaption className="mt-3 text-sm"><b>{x.auteur}</b>{x.contexte ? <span className="text-muted-foreground"> · {x.contexte}</span> : null}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export function Faq({ v, extra = [] }: { v: Vitrine | null; extra?: { q: string; r: string }[] }) {
  const x = useTexte();
  const [ouverte, setOuverte] = useState<number | null>(null);
  const liste = [...extra, ...(v?.faq ?? [])].filter((f) => f.q?.trim() && f.r?.trim());
  if (!liste.length) return null;
  return (
    <div className="divide-y rounded-2xl border border-[#EADFC8] bg-white" data-testid="faq">
      {liste.map((f, i) => (
        <div key={i}>
          <button className="w-full flex items-center justify-between gap-3 text-left px-5 py-4 font-medium" onClick={() => setOuverte(ouverte === i ? null : i)} aria-expanded={ouverte === i}>
            {x(f.q)} <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${ouverte === i ? "rotate-180" : ""}`} />
          </button>
          {ouverte === i && <p className="px-5 pb-4 text-sm text-muted-foreground whitespace-pre-line">{x(f.r)}</p>}
        </div>
      ))}
    </div>
  );
}

/** Section complète, à placer sur l'accueil et les pages villes / services. */
export default function SectionConfiance({ faqExtra = [], titreFaq = "Questions fréquentes" }: { faqExtra?: { q: string; r: string }[]; titreFaq?: string }) {
  const x = useTexte();
  const v = useVitrine();
  const aDuContenu = !!(v && (v.google || v.chiffres?.annees || v.chiffres?.evenements || v.chiffres?.crews || Object.values(v.engagements ?? {}).some(Boolean) || v.references.some((r) => r.logo) || v.temoignages.length));
  return (
    <>
      {aDuContenu && (
        <section className="py-20 bg-[#FAF7EE]" data-testid="section-confiance">
          <div className="container mx-auto px-4 space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-serif font-bold flex items-center justify-center gap-2"><HeartHandshake className="h-8 w-8 text-[#A8933F]" /> {x("Pourquoi nous faire confiance")}</h2>
              <NoteGoogle v={v} />
            </div>
            <Chiffres v={v} />
            <Engagements v={v} />
            <Logos v={v} />
            <Temoignages v={v} />
          </div>
        </section>
      )}
      {(faqExtra.length > 0 || (v?.faq?.length ?? 0) > 0) && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-serif font-bold mb-6 text-center">{x(titreFaq)}</h2>
            <Faq v={v} extra={faqExtra} />
          </div>
        </section>
      )}
    </>
  );
}
