import { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { FUNCTIONS_URL } from "@/integrations/supabase/client";
import { suivre } from "@/lib/suivi";
import { Check, Gift, Heart, Loader2, MessageCircle, Sparkles, Users } from "lucide-react";
import { HaloNawar, Lumieres, Photo, Surtitre } from "@/components/seuil/Seuil";

/**
 * Nawar — bar à parfums : page de présentation (lien en bio du compte Instagram Nawar).
 * Uniquement de vraies photos du bar Nawar (aucune image de banque d'images ni générée).
 */
const WHATSAPP = "https://wa.me/212610939655?text=" + encodeURIComponent("Bonjour, je souhaite un devis pour le bar à parfums Nawar.");
const ESSENCES = ["Oud", "Rose de Damas", "Jasmin", "Ambre", "Musc blanc", "Vanille", "Fleur d'oranger", "Santal", "Bergamote", "Iris", "Safran", "Cèdre"];
const EVENEMENTS = [
  [Heart, "Mariages", "L'animation élégante entre deux danses, et le cadeau d'invité dont on se souvient."],
  [Sparkles, "Fiançailles & henné", "Traditions et senteurs se rencontrent : une touche raffinée pour vos soirées."],
  [Gift, "Baby shower & naissance", "Des notes douces et florales pour célébrer l'arrivée de bébé."],
  [Users, "Événements d'entreprise", "Séminaires, lancements, galas : une expérience sensorielle à l'image de votre marque."],
] as const;

function Formulaire() {
  const [f, setF] = useState({ nom: "", email: "", telephone: "", date: "", invites: "", evenement: "Mariage", message: "", site: "" });
  const [etat, setEtat] = useState<"saisie" | "envoi" | "ok" | "erreur">("saisie");
  const champ = "w-full border border-[#F0D6A0]/30 bg-white/[0.05] px-4 h-12 text-[#FAF6EC] placeholder:text-[#BDB29C] focus:outline-none focus:border-[#F0D6A0] [color-scheme:dark]";
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
    <div className="border border-[#F0D6A0]/40 bg-white/[0.04] p-8 text-center" data-testid="nawar-merci">
      <span className="mx-auto h-14 w-14 rounded-full border border-[#F0D6A0]/60 text-[#F0D6A0] grid place-items-center"><Check className="h-6 w-6" /></span>
      <h3 className="font-serif text-3xl mt-5">Merci, c'est bien reçu</h3>
      <p className="text-[#E3D7C0] mt-3">Nous revenons vers vous sous 24 h avec une proposition pour votre événement.</p>
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
        <button type="submit" disabled={!valide || etat === "envoi"} className="s-btn s-btn-plein" data-testid="nawar-envoyer">
          {etat === "envoi" ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Demander mon devis <span className="fl" aria-hidden="true">→</span>
        </button>
        <a href={WHATSAPP} target="_blank" rel="noreferrer" onClick={() => suivre("clic", "whatsapp")} className="s-btn s-btn-filet"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
      </div>
      {etat === "erreur" && <p className="sm:col-span-2 text-sm text-red-300">L'envoi n'a pas abouti. Réessayez, ou écrivez-nous sur WhatsApp.</p>}
      <p className="sm:col-span-2 text-xs text-[#BDB29C]">Vos coordonnées servent uniquement à vous répondre. <Link to="/politique-confidentialite" className="underline">Confidentialité</Link></p>
    </form>
  );
}

export default function Nawar() {
  return (
    <div className="min-h-screen s-nuit">
      <Seo perso={{ chemin: "/nawar", titre: "Nawar — bar à parfums pour mariages et événements au Maroc",
        description: "Nawar, le bar à parfums : des parfums choisis par les mariés ou les hôtes et offerts à leurs invités, pour votre mariage, vos fiançailles ou votre événement d'entreprise. Rabat, Casablanca, Marrakech et partout au Maroc." }} />

      {/* En-tête : le logo, la promesse, la vraie photo du bar, et ses petites lumières */}
      <section className="s-nawar">
        <Lumieres />
        <div className="s-wrap s-g" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 64, borderBottom: "1px solid rgba(240,214,160,.14)" }}>
          <Link to="/" className="inline-flex items-center min-h-[44px]" aria-label="Heavent People Agency"><img src="/seuil/logo-heavent-or.png" alt="Heavent People Agency" width={726} height={214} style={{ height: 26, width: "auto" }} /></Link>
          <a href="#devis" className="s-devis-court" style={{ display: "inline-flex" }}>Devis</a>
        </div>
        <div className="s-nawar-s s-wrap s-grille" style={{ paddingTop: 40 }}>
          <div className="s-txt">
            <img className="s-logo-nawar s-entree-heros" src="/logo-nawar-clair.png" alt="Nawar — bar à parfums" width={463} height={488} style={{ width: 132 }} />
            <p className="s-surtitre s-entree-heros" style={{ marginTop: 26, color: "#F0D6A0" }}>Le bar à parfums de vos événements</p>
            <h1 className="s-h2 s-entree-heros" style={{ marginTop: 18, color: "var(--s-papier)", maxWidth: "15ch", fontSize: "clamp(36px, 9.4vw, 60px)", animationDelay: ".08s" }}>Vous choisissez les parfums, vos invités repartent avec.</h1>
            <p className="s-chapo s-entree-heros" style={{ animationDelay: ".16s" }}>Vous choisissez à l'avance les parfums que vous offrez. Le jour J, notre équipe installe un bar élégant au cœur de votre événement, fait découvrir vos senteurs et remet à chaque invité son flacon : un souvenir qu'on sent encore le lendemain.</p>
            <div className="s-actions s-entree-heros" style={{ animationDelay: ".24s" }}>
              <a href="#devis" className="s-btn s-btn-plein">Demander un devis <span className="fl" aria-hidden="true">→</span></a>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="s-btn s-btn-filet"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
            </div>
          </div>
          <div className="s-photos">
            <Photo prioritaire nom="nawar-bar" l={900} h={1246} legende="Le bar Nawar, un soir de mariage"
              alt="Le bar à parfums Nawar la nuit : comptoir en bois clair au logo Nawar, distributeurs de parfum et roses, sous des palmiers" />
            <Photo nom="nawar-flacons" className="second" l={880} h={1318} tailles="(min-width:900px) 25vw, 70vw" legende="Les parfums choisis par les mariés"
              alt="Les distributeurs numérotés N°1 à N°5 et les flacons Nawar, sous un palmier éclairé" />
          </div>
        </div>
      </section>

      {/* Comment ça se passe */}
      <section className="s-platre">
        <div className="s-section s-wrap s-colonnes">
          <div className="s-col-q" data-revele="">
            <Surtitre>Le jour J</Surtitre>
            <h2 className="s-h2" style={{ marginTop: 20 }}>{"Comment ça se passe\u00a0?"}</h2>
          </div>
          <ol className="s-liste s-col-r">
            {[["Vous choisissez", "Avec nous, vous sélectionnez les parfums offerts à vos invités : fleuris, boisés, orientaux ou frais."], ["Ils découvrent", "Le jour J, notre équipe accueille vos invités au bar et leur fait sentir les parfums que vous avez choisis."], ["Ils emportent", "Chaque invité repart avec son flacon étiqueté à votre nom : un souvenir qui dure des semaines."]].map(([t, d], i) => (
              <li key={t} data-revele="" style={{ "--retard": `${i * 0.08}s` } as React.CSSProperties}><span className="num">{["I", "II", "III"][i]}</span><div><b>{t}</b></div><p>{d}</p></li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pour tous vos moments */}
      <section className="s-nuit">
        <div className="s-section s-wrap s-colonnes">
          <div className="s-col-q" data-revele="">
            <Surtitre>Pour tous vos moments</Surtitre>
            <h2 className="s-h2" style={{ marginTop: 20 }}>Un bar à parfums pour chaque événement</h2>
          </div>
          <ol className="s-liste s-col-r">
            {EVENEMENTS.map(([, t, d], i) => (
              <li key={t} data-revele="" style={{ "--retard": `${i * 0.08}s` } as React.CSSProperties}><span className="num">{["I", "II", "III", "IV"][i]}</span><div><b>{t}</b></div><p>{d}</p></li>
            ))}
          </ol>
        </div>
      </section>

      {/* La palette d'essences */}
      <section className="s-papier">
        <div className="s-section s-wrap">
          <div data-revele="">
            <Surtitre>Les essences</Surtitre>
            <h2 className="s-h2" style={{ marginTop: 20, maxWidth: "14ch" }}>Notre palette d'essences</h2>
            <p className="s-texte" style={{ marginTop: 16, maxWidth: "48ch" }}>Des matières venues du monde entier, choisies pour leur qualité et leur tenue.</p>
          </div>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2" style={{ marginTop: 32, listStyle: "none", padding: 0 }} data-revele="">
            {ESSENCES.map((e, i) => (
              <li key={e} className="inline-flex items-center gap-4 font-serif text-[26px] sm:text-[34px] leading-tight text-[#141414]">
                {i > 0 && <span aria-hidden="true" className="inline-block h-[7px] w-[7px] rotate-45 bg-[#A8933F]" />}{e}
              </li>
            ))}
          </ul>
          <p className="s-note" style={{ marginTop: 32, maxWidth: "60ch" }}>Flacons élégants, étiquettes personnalisées à vos prénoms et à la date · Décoration du bar assortie à votre thème · Partout au Maroc</p>
        </div>
      </section>

      {/* Devis */}
      <section id="devis" className="s-nawar" style={{ scrollMarginTop: 8 }}>
        <Lumieres />
        <div className="s-nawar-s s-wrap s-colonnes" style={{ position: "relative" }}>
          <div className="s-col-q">
            <div className="flex items-center gap-3"><HaloNawar /><span className="s-surtitre" style={{ color: "#F0D6A0" }}>Devis gratuit</span></div>
            <h2 style={{ marginTop: 22 }}>Parlons de votre événement</h2>
            <p className="s-chapo">Dites-nous la date, le nombre d'invités et l'ambiance souhaitée : nous vous proposons une formule sur mesure sous 24 h.</p>
          </div>
          <div className="s-col-r"><Formulaire /></div>
        </div>
      </section>

      <footer className="s-nuit" style={{ borderTop: "1px solid rgba(228,212,154,.14)" }}>
        <div className="s-wrap s-g flex flex-wrap items-center justify-between gap-4 text-sm text-[#BDB29C]" style={{ paddingTop: 28, paddingBottom: 96 }}>
          <span>© {new Date().getFullYear()} Nawar — bar à parfums · une marque de Heavent People Agency</span>
          <div className="flex gap-5"><Link to="/" className="hover:text-[#E4D49A] min-h-[40px] inline-flex items-center">heaventagency.com</Link><Link to="/mentions-legales" className="hover:text-[#E4D49A] min-h-[40px] inline-flex items-center">Mentions légales</Link></div>
        </div>
      </footer>
    </div>
  );
}
