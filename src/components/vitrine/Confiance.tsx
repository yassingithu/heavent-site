import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useTexte } from "@/i18n/textes";
import { BadgeCheck, ChevronDown, Clock, ShieldCheck, Star, UserCheck } from "lucide-react";
import { Surtitre } from "@/components/seuil/Seuil";

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
    <span className={`inline-flex flex-wrap items-center gap-2 px-4 py-2 text-sm ${clair ? "bg-white/10 text-white border border-[rgba(228,212,154,.3)]" : "bg-[#FAF6EC] border border-[#DCCDAA] text-[#141414]"}`} data-testid="note-google">
      <span className="flex">{[1, 2, 3, 4, 5].map((i) => <Star key={i} className={`h-4 w-4 ${i <= Math.round(v.google!.note) ? "fill-[#A8933F] text-[#A8933F]" : "text-[#DCCDAA]"}`} />)}</span>
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
    <div className="flex flex-wrap gap-x-12 gap-y-4" data-testid="chiffres-cles">
      {liste.map(([n, l]) => (
        <div key={l}>
          <div className="font-serif text-4xl sm:text-5xl text-[#141414]">{n}</div>
          <div className="text-xs uppercase tracking-[0.2em] text-[#5A5146] mt-1">{l}</div>
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
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-[#DCCDAA]" data-testid="engagements">
      {actifs.map(({ cle, icone: Icone, titre, texte }) => (
        <div key={cle} className="border-b border-[#DCCDAA] py-5 sm:pr-6">
          <Icone className="h-5 w-5 text-[#A8933F] mb-3" strokeWidth={1.4} />
          <div className="font-serif text-xl mb-1">{x(titre)}</div>
          <p className="text-[15px] leading-relaxed text-[#5A5146]">{x(texte)}</p>
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
      <p className="text-xs uppercase tracking-[0.3em] text-[#7A5F1F] mb-4">{x("Ils nous ont fait confiance")}</p>
      <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
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
        <figure key={i} className="relative border border-[#DCCDAA] bg-[#FAF6EC] p-6 flex flex-col">
          {x.note ? <div className="flex mb-3" aria-label={`${x.note}/5`}>{[1, 2, 3, 4, 5].map((n) => <Star key={n} className={`h-3.5 w-3.5 ${n <= x.note! ? "fill-[#A8933F] text-[#A8933F]" : "text-[#DCCDAA]"}`} />)}</div> : null}
          <blockquote className="font-serif text-xl leading-snug text-[#141414] flex-1 whitespace-pre-line">« {x.texte} »</blockquote>
          <figcaption className="mt-4 text-sm text-[#5A5146]"><b className="font-medium text-[#141414]">{x.auteur}</b>{x.contexte ? <span> · {x.contexte}</span> : null}</figcaption>
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
    <div className="border-t border-[#DCCDAA]" data-testid="faq">
      {liste.map((f, i) => (
        <div key={i} className="border-b border-[#DCCDAA]">
          <button className="w-full flex items-center justify-between gap-4 text-start py-5 min-h-[56px] font-serif text-xl leading-snug" onClick={() => setOuverte(ouverte === i ? null : i)} aria-expanded={ouverte === i}>
            {x(f.q)} <ChevronDown className={`h-4 w-4 shrink-0 text-[#7A5F1F] transition-transform ${ouverte === i ? "rotate-180" : ""}`} />
          </button>
          {ouverte === i && <p className="pb-5 pe-8 text-[15.5px] leading-relaxed text-[#5A5146] whitespace-pre-line">{x(f.r)}</p>}
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
        <section className="s-papier" data-testid="section-confiance">
          <div className="s-section s-wrap space-y-12">
            <div className="space-y-5" data-revele="">
              <Surtitre>{x("Ils en parlent")}</Surtitre>
              <h2 className="s-h2" style={{ maxWidth: "14ch" }}>{x("Pourquoi nous faire confiance")}</h2>
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
        <section className="s-platre">
          <div className="s-section s-wrap s-colonnes">
            <div className="s-col-q" data-revele="">
              <Surtitre>{x("Avant de nous écrire")}</Surtitre>
              <h2 className="s-h2" style={{ marginTop: 18, fontSize: "clamp(32px, 8vw, 56px)" }}>{x(titreFaq)}</h2>
            </div>
            <div className="s-col-r">
            <Faq v={v} extra={faqExtra} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
