import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Seo, { SITE } from "@/components/Seo";
import { useTexte } from "@/i18n/textes";
import { suivre } from "@/lib/suivi";
import { GUIDES, guideParSlug, type Guide as TGuide } from "@/data/guides";
import { ArrowRight, BookOpen, Check, Clock, Download, Gift, Loader2, Lock, MessageCircle, PartyPopper, Sparkles, Building2, Baby, Gem, CalendarDays } from "lucide-react";
import { telechargerGuidePdf } from "@/lib/guidePdf";

const ICONES = { mariage: Gem, naissance: Baby, fete: PartyPopper, entreprise: Building2 } as const;
const OUVERTS_PAR_DEFAUT = 3;

/** Les guides débloqués sur cet appareil (simple liste de guides, aucune donnée personnelle) */
const CLE = "heavent-guides";
const debloques = (): string[] => { try { return JSON.parse(localStorage.getItem(CLE) || "[]"); } catch { return []; } };
const debloquer = (slug: string) => { try { localStorage.setItem(CLE, JSON.stringify([...new Set([...debloques(), slug])])); } catch { /* navigation privée */ } };

/* ------------------------------ Éléments communs ------------------------------ */
const THEMES_LIB: Record<string, string> = { mariage: "Mariage", naissance: "Baby shower & naissance", fete: "Fêtes de famille", entreprise: "Événements d'entreprise" };
const minutesLecture = (g: TGuide) => Math.max(3, Math.round([g.intro, ...g.conseils.map((c) => `${c.titre} ${c.texte} ${c.astuce ?? ""}`), g.conclusion].join(" ").split(/\s+/).length / 200));

function Halo() {
  return <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(200,181,96,0.28),transparent_45%),radial-gradient(circle_at_95%_100%,rgba(168,147,63,0.22),transparent_42%)]" />;
}
function Ornement({ clair = false }: { clair?: boolean }) {
  return (
    <div aria-hidden className="flex items-center justify-center gap-3">
      <span className={`h-px w-14 ${clair ? "bg-[#C8B560]/60" : "bg-[#DCCBA6]"}`} />
      <span className="h-2 w-2 rotate-45 bg-[#C8B560]" />
      <span className={`h-px w-14 ${clair ? "bg-[#C8B560]/60" : "bg-[#DCCBA6]"}`} />
    </div>
  );
}

/* ------------------------------ Liste des guides ------------------------------ */
export function ListeGuides() {
  const x = useTexte();
  return (
    <div className="min-h-screen bg-[#FBF8F1]">
      <Seo perso={{ chemin: "/guides", titre: "Guides gratuits : mariage, baby shower, fêtes et événements d'entreprise | Heavent",
        description: "Nos guides gratuits pour organiser votre mariage, baby shower, fiançailles, soirée henné ou événement d'entreprise au Maroc. Offerts par Heavent People Agency." }} />
      <section className="relative overflow-hidden bg-[#141414] text-white">
        <Halo />
        <div className="relative container mx-auto px-4 py-16 sm:py-24 max-w-4xl text-center">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#E4D49A]">Heavent · {x("Guides gratuits")}</p>
          <h1 className="font-serif text-4xl sm:text-6xl mt-5 leading-[1.1]">{x("Nos guides gratuits")}</h1>
          <div className="mt-6"><Ornement clair /></div>
          <p className="text-white/70 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">{x("Des conseils concrets, issus de nos années d'expérience, pour préparer votre événement sereinement.")}</p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-12 sm:py-16 max-w-5xl grid sm:grid-cols-2 gap-5">
        {GUIDES.map((g) => <CarteGuide key={g.slug} g={g} />)}
      </div>
    </div>
  );
}

function CarteGuide({ g }: { g: TGuide }) {
  const x = useTexte();
  const Icone = ICONES[g.theme];
  return (
    <Link to={`/guides/${g.slug}`} className="group relative overflow-hidden rounded-[28px] bg-white border border-[#EADFC8] p-7 sm:p-8 hover:shadow-[0_24px_60px_-30px_rgba(140,109,34,0.45)] hover:-translate-y-0.5 transition-all flex flex-col" data-testid="carte-guide">
      <div className="flex items-center justify-between">
        <span className="h-12 w-12 rounded-full bg-[#141414] flex items-center justify-center"><Icone className="h-5 w-5 text-[#E4D49A]" /></span>
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D22]">{x(THEMES_LIB[g.theme])}</span>
      </div>
      <h2 className="font-serif text-2xl sm:text-[1.7rem] mt-6 leading-snug text-[#141414]">{g.titre}</h2>
      <p className="text-[15px] text-[#5E554A] mt-3 leading-relaxed flex-1">{g.intro.split(". ")[0]}.</p>
      <div className="mt-6 pt-5 border-t border-[#F1ECDD] flex items-center justify-between text-sm">
        <span className="text-[#8A8070]">{g.conseils.length} {x("conseils")} · {minutesLecture(g)} {x("min de lecture")}</span>
        <span className="inline-flex items-center gap-1.5 font-medium text-[#8C6D22]">{x("Lire")} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" /></span>
      </div>
    </Link>
  );
}

/* ------------------------------ Un guide ------------------------------ */
export function PageGuide() {
  const x = useTexte();
  const { slug } = useParams();
  const [params] = useSearchParams();
  const g = guideParSlug(slug);
  const [ouvert, setOuvert] = useState(false);
  const [pdf, setPdf] = useState(false);
  useEffect(() => {
    if (!g) return;
    if (params.get("offert") === "1") debloquer(g.slug);
    setOuvert(debloques().includes(g.slug));
  }, [g, params]);

  if (!g) return <ListeGuides />;
  const Icone = ICONES[g.theme];
  const visibles = ouvert ? g.conseils : g.conseils.slice(0, OUVERTS_PAR_DEFAUT);
  const telecharger = async () => {
    setPdf(true);
    try { await telechargerGuidePdf(g); suivre("clic", `guide-pdf:${g.slug}`); } finally { setPdf(false); }
  };
  const aller = (i: number) => document.getElementById(`conseil-${i + 1}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="min-h-screen bg-[#FBF8F1]" data-testid="page-guide">
      <Seo perso={{ chemin: `/guides/${g.slug}`, titre: `${g.titre} | Guide gratuit Heavent`, description: g.description,
        jsonLd: [{ "@context": "https://schema.org", "@type": "Article", headline: g.titre, description: g.description, inLanguage: "fr",
          author: { "@type": "Organization", name: "Heavent People Agency", url: SITE }, publisher: { "@id": `${SITE}/#agence` } }] }} />

      {/* En-tête */}
      <section className="relative overflow-hidden bg-[#141414] text-white">
        <Halo />
        <div aria-hidden className="hidden sm:block absolute inset-5 border border-[#C8B560]/25 rounded-[28px] pointer-events-none" />
        <div className="relative container mx-auto px-5 pt-10 pb-16 sm:pt-14 sm:pb-24 max-w-4xl text-center">
          <Link to="/guides" className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-[#E4D49A] transition"><BookOpen className="h-3.5 w-3.5" /> {x("Guides gratuits")}</Link>
          <div className="mt-8 flex items-center justify-center gap-3 text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#E4D49A]">
            <span className="h-px w-8 bg-[#C8B560]/60" /> {x("Guide gratuit")} · {x(THEMES_LIB[g.theme])} <span className="h-px w-8 bg-[#C8B560]/60" />
          </div>
          <h1 className="font-serif text-[2.4rem] sm:text-6xl mt-6 leading-[1.08]">{g.titre}</h1>
          <p className="text-white/70 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">{g.accroche}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-2 text-xs text-white/75">
            {[[Icone, `${g.conseils.length} ${x("conseils")}`], [Clock, `${minutesLecture(g)} ${x("min de lecture")}`], [Gift, x("Offert par Heavent")]].map(([I, t], k) => {
              const Ic = I as typeof Gift;
              return <span key={k} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5"><Ic className="h-3.5 w-3.5 text-[#E4D49A]" /> {t as string}</span>;
            })}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-5 py-12 sm:py-16 max-w-6xl lg:grid lg:grid-cols-[230px_1fr] lg:gap-14">
        {/* Sommaire */}
        <aside className="hidden lg:block">
          <nav className="sticky top-28">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#8C6D22] mb-4">{x("Sommaire")}</p>
            <ol className="space-y-1 border-l border-[#EADFC8]">
              {g.conseils.map((c, i) => {
                const verrou = !ouvert && i >= OUVERTS_PAR_DEFAUT;
                return (
                  <li key={i}>
                    <button onClick={() => (verrou ? document.getElementById("debloquer")?.scrollIntoView({ behavior: "smooth", block: "center" }) : aller(i))}
                      className="w-full text-left -ml-px pl-4 pr-2 py-1.5 border-l border-transparent hover:border-[#C8B560] text-[13px] leading-snug text-[#5E554A] hover:text-[#141414] transition flex gap-2">
                      <span className="font-serif text-[#C8B560] w-5 shrink-0">{i + 1}.</span>
                      <span className={verrou ? "text-[#B5AA95]" : ""}>{c.titre}</span>
                      {verrou && <Lock className="h-3 w-3 shrink-0 mt-0.5 text-[#B5AA95]" />}
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>
        </aside>

        <article className="max-w-3xl">
          <p className="font-serif text-xl sm:text-[1.4rem] leading-[1.7] text-[#3d362d] first-letter:float-left first-letter:font-serif first-letter:text-7xl first-letter:leading-[0.85] first-letter:pr-3 first-letter:pt-1 first-letter:text-[#A8933F]">{g.intro}</p>
          <div className="my-12"><Ornement /></div>

          <ol className="space-y-12 sm:space-y-14">
            {visibles.map((c, i) => (
              <li key={i} id={`conseil-${i + 1}`} className="scroll-mt-28 break-inside-avoid" data-testid="conseil">
                <div className="flex gap-5 sm:gap-8">
                  <span aria-hidden className="font-serif text-5xl sm:text-7xl leading-none text-transparent [-webkit-text-stroke:1.2px_#C8B560] shrink-0 w-14 sm:w-20">{String(i + 1).padStart(2, "0")}</span>
                  <div className="min-w-0 pt-1">
                    <h2 className="font-serif text-2xl sm:text-[1.9rem] leading-snug text-[#141414]">{c.titre}</h2>
                    <p className="mt-3 text-[16.5px] leading-[1.8] text-[#4a4239]">{c.texte}</p>
                    {c.astuce && (
                      <div className="mt-5 rounded-r-2xl border-l-2 border-[#C8B560] bg-white px-5 py-4 shadow-[0_10px_30px_-24px_rgba(140,109,34,0.6)]">
                        <p className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D22] flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5" /> {x("L'astuce Heavent")}</p>
                        <p className="mt-1.5 text-[15px] leading-relaxed text-[#5E554A]">{c.astuce}</p>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {!ouvert ? (
            <div id="debloquer"><FormulaireGuide g={g} onDebloque={() => { debloquer(g.slug); setOuvert(true); }} /></div>
          ) : (
            <div className="mt-16 space-y-8">
              <figure className="relative rounded-[28px] bg-white border border-[#EADFC8] px-7 sm:px-12 py-10 text-center">
                <span aria-hidden className="absolute -top-6 left-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-[#141414] flex items-center justify-center font-serif text-3xl text-[#E4D49A] leading-none pt-3">“</span>
                <blockquote className="font-serif text-xl sm:text-2xl leading-relaxed text-[#3d362d]">{g.conclusion}</blockquote>
                <figcaption className="mt-5 text-[11px] uppercase tracking-[0.3em] text-[#8C6D22]">{x("L'équipe Heavent")}</figcaption>
              </figure>
              <section className="relative overflow-hidden rounded-[28px] bg-[#141414] text-white px-7 sm:px-12 py-10 text-center print:hidden">
                <Halo />
                <div className="relative">
                  <h2 className="font-serif text-3xl sm:text-4xl">{x("Parlons de votre événement")}</h2>
                  <p className="text-white/65 mt-3">{x("Un devis sur mesure ou un rendez-vous : on vous répond rapidement.")}</p>
                  <div className="mt-7 flex flex-wrap justify-center gap-3">
                    <Link to={g.cta.lien} onClick={() => suivre("clic", `guide-cta:${g.slug}`)} className="inline-flex items-center gap-2 rounded-full bg-[#C8B560] text-[#141414] px-6 min-h-12 font-semibold hover:bg-[#d6c477] transition">{x(g.cta.texte)} <ArrowRight className="h-4 w-4" /></Link>
                    <Link to="/contact#rendez-vous" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 min-h-12 hover:bg-white/10 transition"><CalendarDays className="h-4 w-4" /> {x("Prendre rendez-vous")}</Link>
                    <button onClick={telecharger} disabled={pdf} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 min-h-12 hover:bg-white/10 transition disabled:opacity-60" data-testid="telecharger-guide">
                      {pdf ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />} {pdf ? x("Préparation du PDF…") : x("Télécharger le guide en PDF")}
                    </button>
                  </div>
                </div>
              </section>
            </div>
          )}

          <div className="mt-20 print:hidden">
            <div className="mb-6"><Ornement /></div>
            <h3 className="text-center text-[11px] uppercase tracking-[0.3em] text-[#8C6D22] mb-6">{x("Nos autres guides gratuits")}</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {GUIDES.filter((a) => a.slug !== g.slug).map((a) => {
                const I = ICONES[a.theme];
                return (
                  <Link key={a.slug} to={`/guides/${a.slug}`} className="group rounded-2xl bg-white border border-[#EADFC8] p-5 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col">
                    <I className="h-5 w-5 text-[#A8933F]" />
                    <span className="mt-3 font-serif text-lg leading-snug text-[#141414] flex-1">{a.titre}</span>
                    <span className="mt-3 text-xs text-[#8C6D22] inline-flex items-center gap-1">{x("Lire le guide gratuit")} <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition" /></span>
                  </Link>
                );
              })}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

function FormulaireGuide({ g, onDebloque }: { g: TGuide; onDebloque: () => void }) {
  const x = useTexte();
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [etat, setEtat] = useState<"saisie" | "envoi" | "erreur">("saisie");
  const restants = g.conseils.length - OUVERTS_PAR_DEFAUT;

  const envoyer = async (e: React.FormEvent) => {
    e.preventDefault();
    setEtat("envoi");
    const { error } = await (supabase as any).rpc("newsletter_inscrire", { p_email: email, p_prenom: prenom, p_theme: g.theme, p_newsletter: newsletter, p_source: `guide:${g.slug}` });
    if (error) { setEtat("erreur"); return; }
    supabase.functions.invoke("newsletter", { body: { action: "guide", email, slug: g.slug } }).catch(() => {});
    suivre("demande", `guide:${g.slug}`);
    onDebloque();
  };

  return (
    <div className="relative mt-5">
      {/* Aperçu flouté des conseils suivants */}
      <div aria-hidden className="relative max-h-56 overflow-hidden select-none pointer-events-none">
        <div className="space-y-5 blur-[6px] opacity-60">
          {g.conseils.slice(OUVERTS_PAR_DEFAUT, OUVERTS_PAR_DEFAUT + 2).map((c, i) => (
            <div key={i} className="rounded-3xl bg-white border border-[#EADFC8] p-7"><h2 className="font-serif text-2xl">{c.titre}</h2><p className="mt-2">{c.texte}</p></div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FBF8F1]" />
      </div>
      <form onSubmit={envoyer} className="relative -mt-32 mx-auto max-w-xl rounded-3xl bg-[#141414] text-white p-6 sm:p-8 shadow-2xl" data-testid="formulaire-guide">
        <Lock className="h-6 w-6 text-[#E4D49A]" />
        <h2 className="font-serif text-2xl sm:text-3xl mt-3">{x("Recevez les {n} conseils suivants, gratuitement", { n: restants })}</h2>
        <p className="text-white/70 text-sm mt-2">{x("Le guide complet s'ouvre tout de suite, et on vous l'envoie aussi par e-mail pour le garder.")}</p>
        <div className="grid sm:grid-cols-2 gap-3 mt-5">
          <input value={prenom} onChange={(e) => setPrenom(e.target.value)} placeholder={x("Votre prénom")} autoComplete="given-name" className="rounded-xl bg-white/10 border border-white/15 px-4 h-12 placeholder:text-white/40" data-testid="guide-prenom" />
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={x("Votre e-mail")} autoComplete="email" className="rounded-xl bg-white/10 border border-white/15 px-4 h-12 placeholder:text-white/40" data-testid="guide-email" />
        </div>
        <label className="flex items-start gap-3 mt-4 text-sm text-white/80 cursor-pointer">
          <input type="checkbox" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} className="mt-1 h-4 w-4 accent-[#C8B560]" data-testid="guide-newsletter" />
          <span>{x("Oui, je veux recevoir les conseils et nouveautés Heavent par e-mail (1 à 2 fois par mois). Désinscription en un clic.")}</span>
        </label>
        <button type="submit" disabled={etat === "envoi"} className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C8B560] text-[#141414] font-semibold min-h-12 disabled:opacity-60" data-testid="guide-envoyer">
          <Gift className="h-4 w-4" /> {etat === "envoi" ? x("Un instant…") : x("Lire le guide complet")}
        </button>
        {etat === "erreur" && <p className="text-sm text-red-300 mt-3">{x("Vérifiez votre adresse e-mail et réessayez.")}</p>}
        <p className="text-[11px] text-white/45 mt-4">{x("Vos données restent chez Heavent et ne sont jamais revendues.")} <Link to="/politique-confidentialite" className="underline">{x("Politique de confidentialité")}</Link></p>
      </form>
    </div>
  );
}

/* ------------------------------ Désinscription ------------------------------ */
export function Desinscription() {
  const x = useTexte();
  const { jeton } = useParams();
  const [etat, setEtat] = useState<"attente" | "ok" | "inconnu">("attente");
  useEffect(() => {
    if (!jeton || !/^[0-9a-f-]{36}$/i.test(jeton)) { setEtat("inconnu"); return; }
    (supabase as any).rpc("newsletter_desinscrire", { p_jeton: jeton }).then(({ data }: any) => setEtat(data?.ok ? "ok" : "inconnu"));
  }, [jeton]);
  return (
    <div className="min-h-[70vh] bg-[#FBF8F1] flex items-center justify-center px-4">
      <Seo noindex />
      <div className="max-w-md text-center rounded-3xl bg-white border border-[#EADFC8] p-8" data-testid="desinscription">
        {etat === "attente" ? <p className="text-muted-foreground">{x("Un instant…")}</p> : etat === "ok" ? (
          <>
            <Check className="h-10 w-10 mx-auto text-emerald-600" />
            <h1 className="font-serif text-2xl mt-3">{x("C'est fait, vous êtes désinscrit(e)")}</h1>
            <p className="text-muted-foreground mt-2">{x("Vous ne recevrez plus notre newsletter. Nos guides restent disponibles sur le site quand vous voulez.")}</p>
          </>
        ) : (
          <>
            <h1 className="font-serif text-2xl">{x("Lien de désinscription invalide")}</h1>
            <p className="text-muted-foreground mt-2">{x("Écrivez-nous et nous vous retirerons de la liste immédiatement.")}</p>
          </>
        )}
        <Link to="/" className="inline-block mt-6 underline text-sm">{x("Retour à l'accueil")}</Link>
      </div>
    </div>
  );
}

/* ------------------------------ Page « lien en bio » ------------------------------ */
export function Liens() {
  const x = useTexte();
  const lien = "rounded-2xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.12] transition px-5 py-4 flex items-center gap-3 text-left";
  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Seo perso={{ chemin: "/liens", titre: "Heavent People Agency | Guides gratuits, devis et rendez-vous", description: "Tous les liens de Heavent People Agency : guides gratuits, devis mariage et entreprise, crée ton événement, rendez-vous et WhatsApp." }} />
      <div className="max-w-md mx-auto px-4 py-12 space-y-3">
        <div className="text-center mb-6">
          <img src="/marque-or.png" alt="Heavent" className="h-14 mx-auto" />
          <h1 className="font-serif text-2xl mt-3">Heavent People Agency</h1>
          <p className="text-white/60 text-sm">{x("Mariages, fêtes et événements d'entreprise au Maroc")}</p>
        </div>
        <div className="text-[11px] uppercase tracking-[0.25em] text-[#E4D49A] pt-2">{x("Guides gratuits")}</div>
        {GUIDES.map((g) => { const Icone = ICONES[g.theme]; return (
          <Link key={g.slug} to={`/guides/${g.slug}`} onClick={() => suivre("clic", `liens:${g.slug}`)} className={lien} data-testid="lien-guide">
            <Icone className="h-5 w-5 text-[#E4D49A] shrink-0" /><span className="text-sm">{g.titre}</span>
          </Link>
        ); })}
        <div className="text-[11px] uppercase tracking-[0.25em] text-[#E4D49A] pt-4">{x("Votre événement")}</div>
        <Link to="/cree-ton-evenement" className={lien}><Sparkles className="h-5 w-5 text-[#E4D49A]" /><span className="text-sm">{x("Crée ton événement en 2 minutes")}</span></Link>
        <Link to="/devis-mariage" className={lien}><Gem className="h-5 w-5 text-[#E4D49A]" /><span className="text-sm">{x("Devis mariage et fêtes")}</span></Link>
        <Link to="/devis-entreprise" className={lien}><Building2 className="h-5 w-5 text-[#E4D49A]" /><span className="text-sm">{x("Devis entreprise")}</span></Link>
        <Link to="/contact#rendez-vous" className={lien}><CalendarDays className="h-5 w-5 text-[#E4D49A]" /><span className="text-sm">{x("Prendre rendez-vous")}</span></Link>
        <a href="https://wa.me/212610939655" target="_blank" rel="noreferrer" className={lien}><MessageCircle className="h-5 w-5 text-[#E4D49A]" /><span className="text-sm">{x("Nous écrire sur WhatsApp")}</span></a>
      </div>
    </div>
  );
}
