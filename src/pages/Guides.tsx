import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Seo, { SITE } from "@/components/Seo";
import { useTexte } from "@/i18n/textes";
import { suivre } from "@/lib/suivi";
import { GUIDES, guideParSlug, type Guide as TGuide } from "@/data/guides";
import { ArrowRight, BookOpen, Check, Gift, Heart, Lock, MessageCircle, PartyPopper, Printer, Sparkles, Building2, Baby, Gem, CalendarDays } from "lucide-react";

const ICONES = { mariage: Gem, naissance: Baby, fete: PartyPopper, entreprise: Building2 } as const;
const OUVERTS_PAR_DEFAUT = 3;

/** Les guides débloqués sur cet appareil (simple liste de guides, aucune donnée personnelle) */
const CLE = "heavent-guides";
const debloques = (): string[] => { try { return JSON.parse(localStorage.getItem(CLE) || "[]"); } catch { return []; } };
const debloquer = (slug: string) => { try { localStorage.setItem(CLE, JSON.stringify([...new Set([...debloques(), slug])])); } catch { /* navigation privée */ } };

/* ------------------------------ Liste des guides ------------------------------ */
export function ListeGuides() {
  const x = useTexte();
  return (
    <div className="min-h-screen bg-[#FBF8F1]">
      <Seo perso={{ chemin: "/guides", titre: "Guides gratuits : mariage, baby shower, fêtes et événements d'entreprise | Heavent",
        description: "Nos guides gratuits pour organiser votre mariage, baby shower, fiançailles, soirée henné ou événement d'entreprise au Maroc. Offerts par Heavent People Agency." }} />
      <section className="bg-[#141414] text-white">
        <div className="container mx-auto px-4 py-14 sm:py-20 max-w-5xl text-center">
          <Gift className="h-10 w-10 mx-auto text-[#E4D49A] mb-4" />
          <h1 className="font-serif text-4xl sm:text-5xl">{x("Nos guides gratuits")}</h1>
          <p className="text-white/70 mt-3 max-w-2xl mx-auto">{x("Des conseils concrets, issus de nos années d'expérience, pour préparer votre événement sereinement.")}</p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-10 max-w-5xl grid sm:grid-cols-2 gap-4">
        {GUIDES.map((g) => <CarteGuide key={g.slug} g={g} />)}
      </div>
    </div>
  );
}

function CarteGuide({ g }: { g: TGuide }) {
  const x = useTexte();
  const Icone = ICONES[g.theme];
  return (
    <Link to={`/guides/${g.slug}`} className="group rounded-3xl bg-white border border-[#EADFC8] p-6 hover:shadow-lg transition flex flex-col" data-testid="carte-guide">
      <Icone className="h-7 w-7 text-[#A8933F]" />
      <h2 className="font-serif text-2xl mt-3 leading-snug">{g.titre}</h2>
      <p className="text-sm text-muted-foreground mt-2 flex-1">{g.intro.split(". ")[0]}.</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#8C6D22]">{x("Lire le guide gratuit")} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" /></span>
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
  useEffect(() => {
    if (!g) return;
    if (params.get("offert") === "1") debloquer(g.slug);
    setOuvert(debloques().includes(g.slug));
  }, [g, params]);

  if (!g) return <ListeGuides />;
  const Icone = ICONES[g.theme];
  const visibles = ouvert ? g.conseils : g.conseils.slice(0, OUVERTS_PAR_DEFAUT);

  return (
    <div className="min-h-screen bg-[#FBF8F1]" data-testid="page-guide">
      <Seo perso={{ chemin: `/guides/${g.slug}`, titre: `${g.titre} | Guide gratuit Heavent`, description: g.description,
        jsonLd: [{ "@context": "https://schema.org", "@type": "Article", headline: g.titre, description: g.description, inLanguage: "fr",
          author: { "@type": "Organization", name: "Heavent People Agency", url: SITE }, publisher: { "@id": `${SITE}/#agence` } }] }} />
      <section className="bg-[#141414] text-white print:bg-white print:text-black">
        <div className="container mx-auto px-4 py-14 sm:py-20 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C8B560]/50 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[#E4D49A]">
            <Gift className="h-3.5 w-3.5" /> {x("Guide gratuit")}
          </div>
          <Icone className="h-9 w-9 mx-auto text-[#E4D49A] mt-6" />
          <h1 className="font-serif text-4xl sm:text-5xl mt-3 leading-tight">{g.titre}</h1>
          <p className="text-white/70 mt-4 print:text-black/70">{g.accroche}</p>
        </div>
      </section>

      <article className="container mx-auto px-4 py-10 max-w-3xl">
        <p className="font-serif text-xl leading-relaxed text-[#3d362d]">{g.intro}</p>
        <ol className="mt-10 space-y-5">
          {visibles.map((c, i) => (
            <li key={i} className="rounded-3xl bg-white border border-[#EADFC8] p-6 sm:p-7 break-inside-avoid" data-testid="conseil">
              <div className="flex gap-4">
                <span className="font-serif text-4xl leading-none text-[#C8B560] w-12 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="font-serif text-2xl leading-snug">{c.titre}</h2>
                  <p className="mt-2 leading-relaxed text-[#4a4239]">{c.texte}</p>
                  {c.astuce && <p className="mt-3 rounded-xl bg-[#FBF6E9] px-4 py-3 text-sm text-[#5E554A]"><Sparkles className="inline h-4 w-4 text-[#A8933F] -mt-0.5 mr-1" /><b>{x("L'astuce Heavent :")}</b> {c.astuce}</p>}
                </div>
              </div>
            </li>
          ))}
        </ol>

        {!ouvert ? (
          <FormulaireGuide g={g} onDebloque={() => { debloquer(g.slug); setOuvert(true); }} />
        ) : (
          <div className="mt-10 space-y-6">
            <p className="font-serif text-xl leading-relaxed text-center text-[#3d362d]"><Heart className="inline h-5 w-5 text-[#C8B560] fill-[#C8B560] -mt-1 mr-2" />{g.conclusion}</p>
            <div className="flex flex-wrap justify-center gap-3 print:hidden">
              <Link to={g.cta.lien} onClick={() => suivre("clic", `guide-cta:${g.slug}`)} className="inline-flex items-center gap-2 rounded-full bg-[#141414] text-white px-6 min-h-12 font-medium">{x(g.cta.texte)} <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/contact#rendez-vous" className="inline-flex items-center gap-2 rounded-full border border-[#DCCBA6] bg-white px-6 min-h-12"><CalendarDays className="h-4 w-4" /> {x("Prendre rendez-vous")}</Link>
              <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full border border-[#DCCBA6] bg-white px-6 min-h-12" data-testid="imprimer-guide"><Printer className="h-4 w-4" /> {x("Enregistrer en PDF")}</button>
            </div>
          </div>
        )}

        <div className="mt-14 print:hidden">
          <h3 className="text-xs uppercase tracking-[0.2em] text-[#8C6D22] font-semibold mb-3 flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> {x("Nos autres guides gratuits")}</h3>
          <div className="grid sm:grid-cols-3 gap-3">
            {GUIDES.filter((a) => a.slug !== g.slug).map((a) => (
              <Link key={a.slug} to={`/guides/${a.slug}`} className="rounded-2xl bg-white border border-[#EADFC8] p-4 text-sm hover:shadow-md transition">{a.titre}</Link>
            ))}
          </div>
        </div>
      </article>
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
