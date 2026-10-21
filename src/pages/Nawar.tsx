import { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { FUNCTIONS_URL } from "@/integrations/supabase/client";
import { suivre } from "@/lib/suivi";
import { ArrowRight, Check, Gift, Heart, Loader2, MessageCircle, Sparkles, Users } from "lucide-react";

/**
 * Nawar — bar à parfums : page de présentation (lien en bio du compte Instagram Nawar).
 * Aucune photo de banque d'images : le logo, la typographie et les couleurs suffisent.
 */
const WHATSAPP = "https://wa.me/212610939655?text=" + encodeURIComponent("Bonjour, je souhaite un devis pour le bar à parfums Nawar.");
const ESSENCES = ["Oud", "Rose de Damas", "Jasmin", "Ambre", "Musc blanc", "Vanille", "Fleur d'oranger", "Santal", "Bergamote", "Iris", "Safran", "Cèdre"];
const EVENEMENTS = [
  [Heart, "Mariages", "L'animation élégante entre deux danses, et le cadeau d'invité dont on se souvient."],
  [Sparkles, "Fiançailles & henné", "Traditions et senteurs se rencontrent : une touche raffinée pour vos soirées."],
  [Gift, "Baby shower & naissance", "Des notes douces et florales pour célébrer l'arrivée de bébé."],
  [Users, "Événements d'entreprise", "Séminaires, lancements, galas : une expérience sensorielle à l'image de votre marque."],
] as const;

function Ornement() {
  return (
    <div aria-hidden className="flex items-center justify-center gap-3">
      <span className="h-px w-14 bg-[#C8B560]/60" /><span className="h-2 w-2 rotate-45 bg-[#C8B560]" /><span className="h-px w-14 bg-[#C8B560]/60" />
    </div>
  );
}

function Formulaire() {
  const [f, setF] = useState({ nom: "", email: "", telephone: "", date: "", invites: "", evenement: "Mariage", message: "", site: "" });
  const [etat, setEtat] = useState<"saisie" | "envoi" | "ok" | "erreur">("saisie");
  const champ = "w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 h-12 text-white placeholder:text-white/40 focus:outline-none focus:border-[#C8B560]";
  const valide = f.nom.trim().length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim());
  const envoyer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valide || f.site) return;
    setEtat("envoi");
    try {
      const r = await fetch(`${FUNCTIONS_URL}/send-email`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", data: { name: f.nom.trim(), email: f.email.trim(), subject: `Nawar — bar à parfums : demande de devis (${f.evenement})`,
          message: [`Événement : ${f.evenement}`, `Date : ${f.date || "—"}`, `Nombre d'invités : ${f.invites || "—"}`, `Téléphone : ${f.telephone || "—"}`, "", f.message || "(pas de message)"].join("\n") } }),
      });
      if (!r.ok) throw new Error();
      suivre("demande", "nawar"); setEtat("ok");
    } catch { setEtat("erreur"); }
  };
  if (etat === "ok") return (
    <div className="rounded-3xl border border-[#C8B560]/40 bg-white/[0.04] p-8 text-center" data-testid="nawar-merci">
      <span className="mx-auto h-14 w-14 rounded-full bg-[#C8B560] text-[#141414] grid place-items-center"><Check className="h-7 w-7" /></span>
      <h3 className="font-serif text-3xl mt-5">Merci, c'est bien reçu</h3>
      <p className="text-white/70 mt-3">Nous revenons vers vous sous 24 h avec une proposition pour votre événement.</p>
    </div>
  );
  return (
    <form onSubmit={envoyer} className="grid sm:grid-cols-2 gap-3" data-testid="nawar-formulaire">
      <input className={champ} placeholder="Votre nom *" value={f.nom} onChange={(e) => setF({ ...f, nom: e.target.value })} data-testid="nawar-nom" />
      <input className={champ} type="email" placeholder="E-mail *" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} data-testid="nawar-email" />
      <input className={champ} type="tel" placeholder="Téléphone" value={f.telephone} onChange={(e) => setF({ ...f, telephone: e.target.value })} />
      <select className={champ} value={f.evenement} onChange={(e) => setF({ ...f, evenement: e.target.value })}>
        {["Mariage", "Fiançailles / henné", "Baby shower / naissance", "Anniversaire", "Événement d'entreprise", "Autre"].map((o) => <option key={o} className="text-black">{o}</option>)}
      </select>
      <input className={champ} type="date" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} aria-label="Date de l'événement" />
      <input className={champ} type="number" min={1} placeholder="Nombre d'invités" value={f.invites} onChange={(e) => setF({ ...f, invites: e.target.value })} />
      <textarea className={`${champ} h-24 py-3 sm:col-span-2 resize-none`} placeholder="Votre message (lieu, ambiance, idées…)" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} />
      <input tabIndex={-1} autoComplete="off" aria-hidden className="hidden" value={f.site} onChange={(e) => setF({ ...f, site: e.target.value })} />
      <div className="sm:col-span-2 flex flex-wrap gap-3 items-center">
        <button type="submit" disabled={!valide || etat === "envoi"} className="inline-flex items-center gap-2 rounded-full bg-[#C8B560] text-[#141414] font-medium px-7 h-12 disabled:opacity-50" data-testid="nawar-envoyer">
          {etat === "envoi" ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />} Demander mon devis
        </button>
        <a href={WHATSAPP} target="_blank" rel="noreferrer" onClick={() => suivre("clic", "whatsapp")} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 h-12 text-white/90"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
      </div>
      {etat === "erreur" && <p className="sm:col-span-2 text-sm text-red-300">L'envoi n'a pas abouti. Réessayez, ou écrivez-nous sur WhatsApp.</p>}
      <p className="sm:col-span-2 text-xs text-white/45">Vos coordonnées servent uniquement à vous répondre. <Link to="/politique-confidentialite" className="underline">Confidentialité</Link></p>
    </form>
  );
}

export default function Nawar() {
  return (
    <div className="min-h-screen bg-[#141414] text-[#FAF7EE]">
      <Seo perso={{ chemin: "/nawar", titre: "Nawar — bar à parfums pour mariages et événements au Maroc",
        description: "Nawar, le bar à parfums : vos invités créent leur propre parfum pendant votre mariage, vos fiançailles ou votre événement d'entreprise. Rabat, Casablanca, Marrakech et partout au Maroc." }} />
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(200,181,96,0.28),transparent_45%),radial-gradient(circle_at_90%_95%,rgba(168,147,63,0.22),transparent_42%)]" />
        <div className="relative max-w-4xl mx-auto px-4 pt-14 pb-20 text-center">
          <img src="/logo-nawar-clair.png" alt="Nawar — bar à parfums" className="h-44 sm:h-56 mx-auto" />
          <p className="text-[11px] uppercase tracking-[0.35em] text-[#E4D49A] mt-10">Le bar à parfums de vos événements</p>
          <h1 className="font-serif text-4xl sm:text-6xl leading-[1.1] mt-5">Chaque invité repart avec son propre parfum.</h1>
          <p className="text-white/70 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">Nos parfumeurs installent un bar élégant au cœur de votre événement. Vos invités sentent, composent et emportent un flacon créé pour eux : le souvenir le plus personnel qui soit.</p>
          <div className="flex flex-wrap justify-center gap-3 mt-9">
            <a href="#devis" className="inline-flex items-center gap-2 rounded-full bg-[#C8B560] text-[#141414] font-medium px-7 h-12">Demander un devis <ArrowRight className="h-4 w-4" /></a>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 h-12"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
          </div>
        </div>
      </section>

      <section className="bg-[#FBF8F1] text-[#2A2420]">
        <div className="max-w-5xl mx-auto px-4 py-20">
          <Ornement />
          <h2 className="font-serif text-3xl sm:text-4xl text-center text-[#141414] mt-6">Comment ça se passe ?</h2>
          <div className="grid sm:grid-cols-3 gap-5 mt-12">
            {[["Ils découvrent", "Nos parfumeurs présentent les essences et guident chaque invité selon ses goûts."], ["Ils composent", "Chacun assemble ses notes préférées : fleuries, boisées, orientales ou fraîches."], ["Ils emportent", "Le parfum est mis en flacon, étiqueté, et devient un souvenir qui dure des semaines."]].map(([t, d], i) => (
              <div key={t} className="rounded-3xl bg-white border border-[#EADFC8] p-7 text-center">
                <div className="font-serif text-5xl text-[#C8B560]">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="font-serif text-2xl text-[#141414] mt-3">{t}</h3>
                <p className="text-[#5E554A] mt-2 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-20">
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#E4D49A] text-center">Pour tous vos moments</p>
        <h2 className="font-serif text-3xl sm:text-4xl text-center mt-4">Un bar à parfums pour chaque événement</h2>
        <div className="grid sm:grid-cols-2 gap-4 mt-12">
          {EVENEMENTS.map(([I, t, d]) => (
            <div key={t} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
              <I className="h-6 w-6 text-[#E4D49A]" />
              <h3 className="font-serif text-2xl mt-4">{t}</h3>
              <p className="text-white/65 mt-2 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#FBF8F1] text-[#2A2420]">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <Ornement />
          <h2 className="font-serif text-3xl sm:text-4xl text-[#141414] mt-6">Notre palette d'essences</h2>
          <p className="text-[#5E554A] mt-4 max-w-2xl mx-auto">Des matières venues du monde entier, choisies pour leur qualité et leur tenue.</p>
          <div className="flex flex-wrap justify-center gap-2.5 mt-10">
            {ESSENCES.map((e) => <span key={e} className="rounded-full border border-[#DCCBA6] bg-white px-5 py-2.5 font-serif text-lg text-[#3d362d]">{e}</span>)}
          </div>
          <p className="text-sm text-[#7a705f] mt-10">Flacons élégants, étiquettes personnalisées à vos prénoms et à la date · Décoration du bar assortie à votre thème · Partout au Maroc</p>
        </div>
      </section>

      <section id="devis" className="relative overflow-hidden scroll-mt-4">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(200,181,96,0.2),transparent_45%)]" />
        <div className="relative max-w-5xl mx-auto px-4 py-20 grid lg:grid-cols-[0.85fr_1.15fr] gap-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#E4D49A]">Devis gratuit</p>
            <h2 className="font-serif text-3xl sm:text-4xl mt-4 leading-tight">Parlons de votre événement</h2>
            <p className="text-white/70 mt-5 leading-relaxed">Dites-nous la date, le nombre d'invités et l'ambiance souhaitée : nous vous proposons une formule sur mesure sous 24 h.</p>
          </div>
          <Formulaire />
        </div>
      </section>

      <footer className="border-t border-white/10 text-white/50 text-sm">
        <div className="max-w-5xl mx-auto px-4 py-8 flex flex-wrap items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} Nawar — bar à parfums · une marque de Heavent People Agency</span>
          <div className="flex gap-5"><Link to="/" className="hover:text-white">heaventagency.com</Link><Link to="/mentions-legales" className="hover:text-white">Mentions légales</Link></div>
        </div>
      </footer>
    </div>
  );
}
