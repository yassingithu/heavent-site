import { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { FUNCTIONS_URL, supabase } from "@/integrations/supabase/client";
import { suivre } from "@/lib/suivi";
import {
  ArrowRight, BarChart3, CalendarDays, Check, ChevronDown, FileSignature, Globe, Instagram, Loader2, MessageCircle,
  ShieldCheck, Smartphone, Sparkles, Users, Workflow,
} from "lucide-react";
import imgStats from "@/assets/studio/stats.webp";
import imgDevis from "@/assets/studio/devis.webp";
import imgEquipe from "@/assets/studio/equipe.webp";
import imgAgenda from "@/assets/studio/agenda.webp";
import imgMobileAdmin from "@/assets/studio/mobile-admin.webp";
import imgMobileClient from "@/assets/studio/mobile-client.webp";

/**
 * Heavent Studio : l'offre « outil complet pour agences événementielles », présentée aux professionnels.
 * Page en français uniquement (clientèle professionnelle), séparée du site grand public (pas de menu Heavent).
 */
const WHATSAPP = "https://wa.me/212610939655?text=" + encodeURIComponent("Bonjour, je souhaite une démonstration de Heavent Studio.");
const VISUELS = "https://mapiwnsjsluiwmnulhqk.supabase.co/storage/v1/object/public/assets/instagram/visuels/";
const POSTS = ["6d4fb285-2828-4278-97b6-8c79a45448aa", "ec37691c-ad68-4803-b50b-f0f48a5d01be", "945d232d-9c51-4915-bfea-28211318488d"];

import { METIERS } from "@/demo/metiers";

const OFFRES = [
  { nom: "Vitrine", tag: "Essentiel", plus: null,
    points: ["Site sur mesure, 2 langues", "Pages villes et services pour Google", "Formulaires de devis et contact", "Prise de rendez-vous en ligne", "Réalisations et témoignages modifiables", "Statistiques de visite"] },
  { nom: "Gestion", tag: "Recommandée", plus: "Tout l'Essentiel, plus :",
    points: ["3e langue (dont l'arabe)", "Administration privée + appli téléphone", "Devis, signature en ligne, relances", "Factures conformes, acompte et solde", "Agenda synchronisé, rappels clients", "Espace client, RSVP mariages, avis Google"] },
  { nom: "Agence complète", tag: "Premium", plus: "Toute la Gestion, plus :",
    points: ["Recrutement et espace des équipes", "Contrats signés en ligne", "Pointage selfie + position", "Fiches de paie mensuelles", "Configurateur « Créez votre événement »", "Instagram automatique, guides, newsletter"] },
];

const FAQ = [
  ["Faut-il être à l'aise avec l'informatique ?", "Non. Tout se fait en quelques clics, en français, depuis l'ordinateur ou le téléphone. Nous formons votre équipe à la mise en ligne."],
  ["Peut-on commencer petit et évoluer ?", "Oui. Chaque formule évolue vers la suivante sans rien refaire : tout ce qui est déjà en place est conservé."],
  ["Nos données actuelles peuvent-elles être reprises ?", "Oui : catalogue de prestations, clients, équipes, photos de réalisations. Nous nous en chargeons pendant la mise en place."],
  ["À qui appartiennent l'outil et les données ?", "À vous. Chaque agence a son propre site, sa propre base de données et ses propres accès : rien n'est partagé avec d'autres clients."],
  ["Que se passe-t-il après la mise en ligne ?", "L'accompagnement mensuel couvre l'hébergement, les sauvegardes, les mises à jour de sécurité et le support."],
];

function Halo() {
  return <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(200,181,96,0.28),transparent_45%),radial-gradient(circle_at_95%_100%,rgba(168,147,63,0.22),transparent_42%)]" />;
}
const Surtitre = ({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) =>
  <div className={`text-[11px] uppercase tracking-[0.3em] ${clair ? "text-[#E4D49A]" : "text-[#8C6D22]"}`}>{children}</div>;

function Ecran({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <figure className={`rounded-2xl overflow-hidden border border-[#EADFC8] bg-white shadow-[0_20px_60px_-25px_rgba(20,20,20,0.35)] ${className}`}>
      <div className="flex gap-1.5 px-3 py-2 border-b border-[#F1ECDD] bg-[#FBF8F1]">{[0, 1, 2].map((i) => <span key={i} className="h-2 w-2 rounded-full bg-[#DCCBA6]" />)}</div>
      <img src={src} alt={alt} loading="lazy" className="w-full h-auto block" />
    </figure>
  );
}
function Telephone({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <figure className={`rounded-[2rem] border-[6px] border-[#141414] overflow-hidden bg-white shadow-[0_25px_60px_-20px_rgba(20,20,20,0.5)] ${className}`}>
      <img src={src} alt={alt} loading="lazy" className="w-full h-auto block" />
    </figure>
  );
}

function Bloc({ icone: Icone, surtitre, titre, texte, points, image, inverse = false }: {
  icone: typeof Globe; surtitre: string; titre: string; texte: string; points: string[]; image: React.ReactNode; inverse?: boolean;
}) {
  return (
    <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${inverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
      <div>
        <div className="flex items-center gap-3"><span className="h-10 w-10 rounded-full bg-[#141414] text-[#E4D49A] grid place-items-center"><Icone className="h-5 w-5" /></span><Surtitre>{surtitre}</Surtitre></div>
        <h3 className="font-serif text-3xl sm:text-4xl text-[#141414] mt-4 leading-tight">{titre}</h3>
        <p className="text-[#5E554A] mt-4 leading-relaxed">{texte}</p>
        <ul className="mt-5 space-y-2.5">
          {points.map((p) => <li key={p} className="flex gap-3 text-[#3d362d]"><Check className="h-5 w-5 text-[#A8933F] shrink-0 mt-0.5" /><span>{p}</span></li>)}
        </ul>
      </div>
      <div>{image}</div>
    </div>
  );
}

function FormulaireDemo() {
  const [etat, setEtat] = useState<"saisie" | "envoi" | "ok" | "erreur">("saisie");
  const [f, setF] = useState({ nom: "", agence: "", email: "", telephone: "", ville: "", formule: "Gestion", secteur: "evenementiel", message: "", site: "" });
  const [logo, setLogo] = useState<File | null>(null);
  const champ = "w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 h-12 text-white placeholder:text-white/40 focus:outline-none focus:border-[#C8B560]";
  const valide = f.nom.trim() && f.agence.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim());

  const envoyer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valide || f.site) return; // « site » : champ piège invisible pour les robots
    setEtat("envoi");
    // Enregistrée dans l'administration (onglet Heavent Studio), puis e-mail de notification
    // Logo (facultatif) : déposé dans les photos publiques, pour personnaliser la démo
    let logoUrl: string | null = null;
    if (logo) {
      const chemin = `studio/${crypto.randomUUID?.() ?? Date.now()}.${(logo.name.split(".").pop() || "png").toLowerCase().replace(/[^a-z]/g, "") || "png"}`;
      const { error } = await supabase.storage.from("photos").upload(chemin, logo, { contentType: logo.type || "image/png" });
      if (!error) logoUrl = supabase.storage.from("photos").getPublicUrl(chemin).data.publicUrl;
    }
    const { error: errBase } = await (supabase as any).rpc("studio_demander", { p_nom: f.nom, p_agence: f.agence, p_email: f.email, p_telephone: f.telephone, p_ville: f.ville, p_formule: f.formule, p_message: f.message, p_secteur: f.secteur, p_logo_url: logoUrl });
    if (errBase && /Trop de demandes/.test(errBase.message)) { setEtat("erreur"); return; }
    try {
      const r = await fetch(`${FUNCTIONS_URL}/send-email`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", data: {
          name: `${f.nom.trim()} — ${f.agence.trim()}`, email: f.email.trim(),
          subject: `Heavent Studio : demande de démo (${f.formule})`,
          message: [`Agence : ${f.agence}`, `Contact : ${f.nom}`, `Téléphone : ${f.telephone || "—"}`, `Ville : ${f.ville || "—"}`, `Formule envisagée : ${f.formule}`, `Métier : ${METIERS[f.secteur] ?? f.secteur}`, `Logo : ${logoUrl ?? "non fourni"}`, "", f.message || "(pas de message)"].join("\n"),
        } }),
      });
      if (!r.ok) throw new Error();
      suivre("demande", "studio");
      setEtat("ok");
    } catch { setEtat("erreur"); }
  };

  if (etat === "ok") return (
    <div className="rounded-3xl border border-[#C8B560]/40 bg-white/[0.04] p-8 text-center" data-testid="studio-merci">
      <span className="mx-auto h-14 w-14 rounded-full bg-[#C8B560] text-[#141414] grid place-items-center"><Check className="h-7 w-7" /></span>
      <h3 className="font-serif text-3xl mt-5">Merci, c'est bien reçu</h3>
      <p className="text-white/70 mt-3">Nous vous recontactons sous 24 h pour fixer votre démonstration.</p>
    </div>
  );

  return (
    <form onSubmit={envoyer} className="grid sm:grid-cols-2 gap-3" data-testid="studio-formulaire">
      <input className={champ} placeholder="Votre nom *" value={f.nom} onChange={(e) => setF({ ...f, nom: e.target.value })} data-testid="studio-nom" />
      <input className={champ} placeholder="Nom de votre agence *" value={f.agence} onChange={(e) => setF({ ...f, agence: e.target.value })} data-testid="studio-agence" />
      <input className={champ} type="email" placeholder="E-mail professionnel *" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} data-testid="studio-email" />
      <input className={champ} type="tel" placeholder="Téléphone" value={f.telephone} onChange={(e) => setF({ ...f, telephone: e.target.value })} />
      <input className={champ} placeholder="Ville" value={f.ville} onChange={(e) => setF({ ...f, ville: e.target.value })} />
      <select className={champ} value={f.formule} onChange={(e) => setF({ ...f, formule: e.target.value })} data-testid="studio-formule">
        {["Vitrine", "Gestion", "Agence complète", "Je ne sais pas encore"].map((o) => <option key={o} className="text-black">{o}</option>)}
      </select>
      <select className={champ} value={f.secteur} onChange={(e) => setF({ ...f, secteur: e.target.value })} data-testid="studio-secteur" aria-label="Votre métier">
        {Object.entries(METIERS).map(([k, v]) => <option key={k} value={k} className="text-black">{v}</option>)}
      </select>
      <label className={`${champ} flex items-center gap-2 cursor-pointer text-white/60`} data-testid="studio-logo">
        <input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={(e) => { const x = e.target.files?.[0]; if (x && x.size <= 5 * 1024 * 1024) setLogo(x); }} />
        {logo ? <span className="text-white truncate">Logo : {logo.name}</span> : <span>Votre logo (facultatif)</span>}
      </label>
      <textarea className={`${champ} h-28 py-3 sm:col-span-2 resize-none`} placeholder="Parlez-nous de votre agence (activité, taille de l'équipe, outils actuels…)" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} />
      <input tabIndex={-1} autoComplete="off" aria-hidden className="hidden" value={f.site} onChange={(e) => setF({ ...f, site: e.target.value })} />
      <div className="sm:col-span-2 flex flex-wrap items-center gap-3 mt-1">
        <button type="submit" disabled={!valide || etat === "envoi"} className="inline-flex items-center gap-2 rounded-full bg-[#C8B560] text-[#141414] font-medium px-7 h-12 disabled:opacity-50 hover:bg-[#d6c477] transition" data-testid="studio-envoyer">
          {etat === "envoi" ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />} Demander ma démo
        </button>
        <a href={WHATSAPP} target="_blank" rel="noreferrer" onClick={() => suivre("clic", "whatsapp")} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 h-12 text-white/90 hover:bg-white/10 transition">
          <MessageCircle className="h-4 w-4" /> Ou sur WhatsApp
        </a>
      </div>
      {etat === "erreur" && <p className="sm:col-span-2 text-sm text-red-300">L'envoi n'a pas abouti. Réessayez dans un instant, ou écrivez-nous sur WhatsApp.</p>}
      <p className="sm:col-span-2 text-xs text-white/45">Vos coordonnées servent uniquement à vous recontacter au sujet de Heavent Studio. <Link to="/politique-confidentialite" className="underline">Confidentialité</Link></p>
    </form>
  );
}

export default function Studio() {
  const [ouverte, setOuverte] = useState<number | null>(0);
  const versDemo = () => { suivre("clic", "studio:demo"); document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <div className="min-h-screen bg-[#FBF8F1] text-[#2A2420]">
      <Seo perso={{ chemin: "/studio", titre: "Heavent Studio | Le site et l'outil de gestion des agences événementielles",
        description: "Site trilingue, devis et factures signés en ligne, agenda, équipes, paie, pointage, Instagram automatique : l'outil complet conçu par une agence événementielle, pour les agences événementielles." }} />

      {/* En-tête */}
      <header className="sticky top-0 z-40 bg-[#141414]/95 backdrop-blur text-white border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
          <Link to="/studio" className="flex items-center gap-2.5">
            <img src="/marque-or.png" alt="" className="h-8" />
            <span className="font-serif text-lg leading-none">Heavent <span className="text-[#E4D49A]">Studio</span></span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/" className="hidden sm:inline text-sm text-white/60 hover:text-white">heaventagency.com</Link>
            <button onClick={versDemo} className="rounded-full bg-[#C8B560] text-[#141414] text-sm font-medium px-4 h-10" data-testid="studio-cta-entete">Demander une démo</button>
          </div>
        </div>
      </header>

      {/* Ouverture */}
      <section className="relative overflow-hidden bg-[#141414] text-white">
        <Halo />
        <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-20 sm:pt-24 grid lg:grid-cols-[1.05fr_1fr] gap-12 items-center">
          <div>
            <Surtitre clair>Pour les agences événementielles</Surtitre>
            <h1 className="font-serif text-4xl sm:text-6xl leading-[1.08] mt-5">Votre agence, entièrement digitalisée.</h1>
            <p className="text-white/70 text-lg mt-6 max-w-xl leading-relaxed">Un site qui attire vos clients, et une administration qui gère tout le reste : devis signés en ligne, factures, agenda, équipes, paie, Instagram. Conçu par une agence événementielle, pour les agences événementielles.</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <button onClick={versDemo} className="inline-flex items-center gap-2 rounded-full bg-[#C8B560] text-[#141414] font-medium px-7 h-12 hover:bg-[#d6c477] transition">Demander une démo <ArrowRight className="h-4 w-4" /></button>
              <a href="#formules" className="inline-flex items-center rounded-full border border-white/20 px-7 h-12 text-white/90 hover:bg-white/10 transition">Voir les formules</a>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-10 text-sm text-white/60">
              {["Français · anglais · arabe", "Sur ordinateur et téléphone", "Vos données restent à vous"].map((t) => <span key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-[#E4D49A]" />{t}</span>)}
            </div>
          </div>
          <div className="relative">
            <Ecran src={imgStats} alt="Statistiques du site dans l'administration" />
            <Telephone src={imgMobileAdmin} alt="L'administration sur téléphone" className="absolute -bottom-10 -left-6 w-[34%] hidden sm:block" />
          </div>
        </div>
      </section>

      {/* Constat */}
      <section className="max-w-6xl mx-auto px-4 py-20 sm:py-28">
        <div className="max-w-3xl">
          <Surtitre>Le constat</Surtitre>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#141414] mt-4 leading-tight">Vous passez trop de temps à gérer, pas assez à créer.</h2>
          <p className="text-[#5E554A] text-lg mt-5 leading-relaxed">Demandes éparpillées entre WhatsApp, e-mails et appels. Devis refaits à la main. Contrats imprimés, signés, scannés. Relances oubliées. Chaque heure passée là-dessus est une heure de moins pour vos clients.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {[["24 h", "pour répondre à chaque demande, même le week-end"], ["3", "langues, dont l'arabe, pour vos clients du monde entier"], ["0", "ressaisie entre devis, contrat et facture"], ["1", "seul outil, sur ordinateur et téléphone"]].map(([c, t]) => (
            <div key={t} className="rounded-2xl bg-[#141414] text-white p-6"><div className="font-serif text-4xl text-[#E4D49A]">{c}</div><p className="text-white/70 text-sm mt-2">{t}</p></div>
          ))}
        </div>
        <blockquote className="mt-14 border-y border-[#EADFC8] py-10 text-center font-serif italic text-2xl sm:text-3xl text-[#3d362d] leading-snug max-w-4xl mx-auto">
          « Nous avons construit pour nous-mêmes l'outil que nous aurions rêvé d'avoir. Aujourd'hui, nous le mettons au service de votre agence. »
          <footer className="not-italic font-sans text-xs uppercase tracking-[0.3em] text-[#8C6D22] mt-5">Heavent People Agency</footer>
        </blockquote>
      </section>

      {/* La solution */}
      <section className="bg-white border-y border-[#EADFC8]">
        <div className="max-w-6xl mx-auto px-4 py-20 sm:py-28 space-y-24">
          <div className="text-center max-w-2xl mx-auto">
            <Surtitre>La solution</Surtitre>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#141414] mt-4">Tout votre métier, dans un seul outil</h2>
          </div>
          <Bloc icone={Globe} surtitre="Votre site" titre="Un site à la hauteur de vos événements"
            texte="Élégant, rapide, pensé pour le téléphone, et construit pour transformer chaque visite en demande de devis."
            points={["Design sur mesure, vos vraies réalisations en photos", "Plusieurs langues ; les messages étrangers vous arrivent traduits", "Pages dédiées à vos villes et services, pour Google", "Formulaires de devis, rendez-vous en ligne, WhatsApp"]}
            image={<div className="rounded-2xl bg-[#141414] p-6 sm:p-8 text-white relative overflow-hidden"><Halo />
              <div className="relative"><Surtitre clair>Essayez-le en direct</Surtitre>
                <h4 className="font-serif text-2xl sm:text-3xl mt-3">Le configurateur « Créez votre événement »</h4>
                <p className="text-white/70 mt-3">Vos visiteurs composent leur événement sur un plan, voient une estimation en direct avec vos tarifs, et vous envoient une demande prête à chiffrer. Celui de Heavent est en ligne : testez-le.</p>
                <Link to="/cree-ton-evenement" onClick={() => suivre("clic", "studio:jeu")} className="inline-flex items-center gap-2 mt-6 rounded-full bg-[#C8B560] text-[#141414] font-medium px-6 h-11"><Sparkles className="h-4 w-4" /> Ouvrir le configurateur</Link>
              </div></div>} />
          <Bloc inverse icone={FileSignature} surtitre="Commercial" titre="De la demande à la facture, sans ressaisie"
            texte="Chaque demande devient un devis en un clic. Le client le signe sur son téléphone, l'acompte et les relances suivent tout seuls."
            points={["Devis pré-remplis depuis la demande, PDF à votre image", "Signature en ligne, relances automatiques à J+5 et J+10", "Factures conformes, numérotation protégée, acompte et solde", "Espace personnel du client, avis Google après l'événement"]}
            image={<div className="relative"><Ecran src={imgDevis} alt="Création d'un devis" /><Telephone src={imgMobileClient} alt="Le devis vu par le client" className="absolute -bottom-8 -right-3 w-[32%] hidden sm:block" /></div>} />
          <Bloc icone={Users} surtitre="Équipes" titre="Vos crews, du recrutement à la paie"
            texte="Hôtesses, hôtes et extras s'inscrivent seuls, reçoivent leurs missions, signent leurs contrats et pointent depuis leur téléphone."
            points={["Inscription en ligne, fiches profil à envoyer aux clients", "Disponibilités et constitution de l'équipe par date", "Contrats générés et signés en ligne", "Pointage selfie + position, fiches de paie en un clic"]}
            image={<Ecran src={imgEquipe} alt="Gestion du personnel" />} />
          <Bloc inverse icone={CalendarDays} surtitre="Organisation" titre="Un agenda qui se remplit tout seul"
            texte="Vos clients réservent un rendez-vous sur vos créneaux libres. Vous recevez une notification, eux un rappel la veille, dans leur langue."
            points={["Horaires, pauses, indisponibilités", "Agence, téléphone ou visio", "Synchronisation avec le calendrier de votre téléphone"]}
            image={<Ecran src={imgAgenda} alt="Agenda et rendez-vous" />} />
          <Bloc icone={Instagram} surtitre="Marketing" titre="Instagram, guides et newsletter en pilote automatique"
            texte="Des posts conseils mis en page à vos couleurs et publiés à l'heure prévue. Quand quelqu'un commente « GUIDE », il reçoit votre guide en message privé, et vous récupérez un contact."
            points={["Visuels composés automatiquement : photo, texte, logo", "Publication via l'API officielle de Meta", "Guides PDF offerts contre un e-mail, newsletter avec consentement"]}
            image={<div className="grid grid-cols-3 gap-3">{POSTS.map((id) => <img key={id} src={`${VISUELS}${id}.jpg`} alt="Post Instagram généré automatiquement" loading="lazy" className="rounded-xl w-full aspect-[4/5] object-cover shadow-lg" />)}</div>} />
        </div>
      </section>

      {/* Bénéfices automatiques */}
      <section className="max-w-6xl mx-auto px-4 py-20 sm:py-28">
        <div className="max-w-2xl"><Surtitre>Ce qui se fait tout seul</Surtitre><h2 className="font-serif text-3xl sm:text-5xl text-[#141414] mt-4">Pendant que vous êtes sur le terrain</h2></div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {[[Workflow, "Relance des devis sans réponse", "Plus de devis signés, sans y penser"], [FileSignature, "Facture de solde après l'événement", "Une trésorerie encaissée plus vite"],
            [BarChart3, "Demande d'avis le lendemain", "Plus d'avis Google, une meilleure réputation"], [CalendarDays, "Rappels de rendez-vous et de signatures", "Moins d'oublis, moins d'appels"],
            [Smartphone, "Notifications sur votre téléphone", "Vous répondez en premier"], [ShieldCheck, "Sauvegardes et sécurité", "Chacun ne voit que ce qui le concerne"]].map(([I, t, d]) => {
            const Icone = I as typeof Globe;
            return <div key={t as string} className="rounded-2xl border border-[#EADFC8] bg-white p-6"><Icone className="h-6 w-6 text-[#A8933F]" /><h3 className="font-serif text-xl text-[#141414] mt-4">{t as string}</h3><p className="text-[#5E554A] text-sm mt-1.5">{d as string}</p></div>;
          })}
        </div>
      </section>

      {/* Méthode */}
      <section className="bg-[#141414] text-white relative overflow-hidden">
        <Halo />
        <div className="relative max-w-6xl mx-auto px-4 py-20 sm:py-28">
          <Surtitre clair>Notre méthode</Surtitre>
          <h2 className="font-serif text-3xl sm:text-5xl mt-4">Quatre étapes, un seul interlocuteur</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {[["Écoute", "Un atelier pour comprendre votre activité, vos clients et vos priorités."], ["Maquettes", "Vous validez le design et le parcours avant toute construction."],
              ["Construction", "Des livraisons régulières : vous testez au fur et à mesure."], ["Mise en ligne", "Reprise de vos contenus, formation de votre équipe, accompagnement."]].map(([t, d], i) => (
              <div key={t} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <div className="font-serif text-4xl text-[#C8B560]">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="font-serif text-xl mt-3">{t}</h3><p className="text-white/65 text-sm mt-1.5">{d}</p>
              </div>
            ))}
          </div>
          <p className="text-white/60 mt-10 max-w-3xl">La preuve : cet outil fait tourner chaque jour <Link to="/" className="text-[#E4D49A] underline">heaventagency.com</Link> et toute notre agence. Démonstration en direct sur simple demande.</p>
        </div>
      </section>

      {/* Formules */}
      <section id="formules" className="max-w-6xl mx-auto px-4 py-20 sm:py-28 scroll-mt-16">
        <div className="text-center max-w-2xl mx-auto"><Surtitre>Formules</Surtitre><h2 className="font-serif text-3xl sm:text-5xl text-[#141414] mt-4">Trois formules, selon votre ambition</h2>
          <p className="text-[#5E554A] mt-4">Conception sur mesure, mise en ligne, formation et un mois d'accompagnement inclus.</p></div>
        <div className="grid lg:grid-cols-3 gap-5 mt-12">
          {OFFRES.map((o) => {
            const vedette = o.tag === "Recommandée";
            return (
              <div key={o.nom} className={`rounded-3xl p-7 flex flex-col ${vedette ? "bg-[#141414] text-white lg:-translate-y-3 shadow-2xl" : "bg-white border border-[#EADFC8]"}`} data-testid="studio-offre">
                <span className={`text-[11px] uppercase tracking-[0.25em] ${vedette ? "text-[#E4D49A]" : "text-[#8C6D22]"}`}>{o.tag}</span>
                <h3 className={`font-serif text-3xl mt-2 ${vedette ? "" : "text-[#141414]"}`}>{o.nom}</h3>
                {o.plus && <p className={`text-sm font-medium mt-5 ${vedette ? "text-[#E4D49A]" : "text-[#8C6D22]"}`}>{o.plus}</p>}
                <ul className={`space-y-2 ${o.plus ? "mt-2" : "mt-5"} flex-1`}>
                  {o.points.map((p) => <li key={p} className={`flex gap-2.5 text-sm ${vedette ? "text-white/85" : "text-[#3d362d]"}`}><Check className="h-4 w-4 text-[#C8B560] shrink-0 mt-0.5" />{p}</li>)}
                </ul>
                <button onClick={versDemo} className={`mt-7 rounded-full h-11 font-medium ${vedette ? "bg-[#C8B560] text-[#141414]" : "border border-[#141414] text-[#141414] hover:bg-[#141414] hover:text-white transition"}`}>Demander une démo</button>
              </div>
            );
          })}
        </div>
        <p className="text-center text-sm text-[#7a705f] mt-8">Chaque projet est chiffré sur mesure après la démonstration. Modules à la carte possibles.</p>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 pb-20 sm:pb-28">
        <div className="text-center"><Surtitre>Vos questions</Surtitre><h2 className="font-serif text-3xl sm:text-4xl text-[#141414] mt-4">Ce que l'on nous demande souvent</h2></div>
        <div className="mt-10 divide-y divide-[#EADFC8] border-y border-[#EADFC8]">
          {FAQ.map(([q, r], i) => (
            <div key={q}>
              <button onClick={() => setOuverte(ouverte === i ? null : i)} className="w-full flex items-center justify-between gap-4 py-5 text-left">
                <span className="font-serif text-lg text-[#141414]">{q}</span><ChevronDown className={`h-5 w-5 text-[#A8933F] shrink-0 transition ${ouverte === i ? "rotate-180" : ""}`} />
              </button>
              {ouverte === i && <p className="pb-5 text-[#5E554A] leading-relaxed">{r}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Démo */}
      <section id="demo" className="bg-[#141414] text-white relative overflow-hidden scroll-mt-16">
        <Halo />
        <div className="relative max-w-6xl mx-auto px-4 py-20 sm:py-28 grid lg:grid-cols-[0.9fr_1.1fr] gap-12">
          <div>
            <Surtitre clair>Démonstration gratuite</Surtitre>
            <h2 className="font-serif text-3xl sm:text-5xl mt-4 leading-tight">Voyons ensemble ce que l'outil changerait pour votre agence</h2>
            <p className="text-white/70 mt-5 leading-relaxed">30 minutes en visio ou dans nos bureaux de Rabat : nous vous montrons l'outil en conditions réelles et vous repartez avec une proposition adaptée.</p>
            <ul className="mt-6 space-y-2.5 text-white/80">
              {["Sans engagement", "Réponse sous 24 h", "Un interlocuteur unique, du premier échange à la mise en ligne"].map((t) => <li key={t} className="flex gap-2.5"><Check className="h-5 w-5 text-[#E4D49A] shrink-0" />{t}</li>)}
            </ul>
          </div>
          <FormulaireDemo />
        </div>
      </section>

      <footer className="bg-[#0d0d0d] text-white/50 text-sm">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-wrap items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} Heavent Studio · une activité de Heavent People Agency, Rabat</span>
          <div className="flex gap-5"><Link to="/" className="hover:text-white">heaventagency.com</Link><Link to="/mentions-legales" className="hover:text-white">Mentions légales</Link><Link to="/politique-confidentialite" className="hover:text-white">Confidentialité</Link></div>
        </div>
      </footer>
    </div>
  );
}
