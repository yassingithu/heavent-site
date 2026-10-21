import { useState } from "react";
import { ArrowRight, Check, Loader2, MapPin, MessageCircle, Phone, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SECTEURS, secteurDe } from "./secteurs";
import type { ConfigDemo } from "./donneesDemo";

/** Site vitrine fictif du prospect (démo Heavent Studio) : ses demandes arrivent dans l'administration de la démo. */
export default function DemoSite({ cfg, versAdmin }: { cfg: ConfigDemo; versAdmin: () => void }) {
  const sec = SECTEURS[secteurDe(cfg.secteur)];
  const ville = cfg.ville || "Casablanca";
  const [f, setF] = useState({ nom: "", email: "", telephone: "", type: sec.site.typeDemande[0], message: "" });
  const [etat, setEtat] = useState<"saisie" | "envoi" | "ok">("saisie");
  const initiales = cfg.agence.split(/\s+/).map((m) => m[0]).join("").slice(0, 2).toUpperCase();
  const champ = "w-full rounded-xl border border-[#E5DED0] bg-white px-4 h-12 text-[#2A2420] placeholder:text-[#9a917f] focus:outline-none focus:border-[#C8B560]";

  const envoyer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (f.nom.trim().length < 2) return;
    setEtat("envoi");
    const [prenom, ...nom] = f.nom.trim().split(/\s+/);
    await (supabase as any).from("devis_mariage").insert({
      nom: prenom, prenom: nom.join(" "), email: f.email || "client@demo.test", telephone: f.telephone || null, type_evenement: f.type,
      date_mariage: new Date(Date.now() + 20 * 864e5).toISOString().slice(0, 10), lieu: ville, nb_invites: null, services: f.type, remarques: f.message || null,
      statut: "en_attente", created_at: new Date().toISOString(),
    });
    setEtat("ok");
  };

  return (
    <div className="min-h-screen bg-[#FBF8F1] text-[#2A2420]" data-testid="demo-site">
      <header className="sticky top-12 z-40 bg-white/95 backdrop-blur border-b border-[#EADFC8]">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {cfg.logo_url ? <img src={cfg.logo_url} alt={cfg.agence} className="h-10 w-auto max-w-[160px] object-contain" />
              : <span className="h-10 w-10 rounded-full bg-[#141414] text-[#E4D49A] grid place-items-center font-serif">{initiales}</span>}
            <span className="font-serif text-lg truncate">{cfg.agence}</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-[#5E554A]">
            {sec.site.services.slice(0, 3).map(([t]) => <span key={t}>{t}</span>)}
            <span>Contact</span>
          </nav>
          <a href="#demande" className="rounded-full bg-[#141414] text-white text-sm px-4 h-10 inline-flex items-center shrink-0">{sec.site.cta}</a>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#141414] text-white">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(200,181,96,0.3),transparent_45%),radial-gradient(circle_at_95%_100%,rgba(168,147,63,0.22),transparent_42%)]" />
        <div className="relative max-w-6xl mx-auto px-4 py-20 sm:py-28">
          <div className="text-[11px] uppercase tracking-[0.3em] text-[#E4D49A]">{sec.site.accroche} · {ville}</div>
          <h1 className="font-serif text-4xl sm:text-6xl leading-[1.08] mt-5 max-w-3xl">{sec.site.titre}</h1>
          <p className="text-white/70 text-lg mt-6 max-w-2xl leading-relaxed">{sec.site.texte}</p>
          <div className="flex flex-wrap gap-3 mt-9">
            <a href="#demande" className="inline-flex items-center gap-2 rounded-full bg-[#C8B560] text-[#141414] font-medium px-7 h-12">{sec.site.cta} <ArrowRight className="h-4 w-4" /></a>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 h-12 text-white/90"><MessageCircle className="h-4 w-4" /> WhatsApp</span>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sec.site.services.map(([t, d]) => (
            <div key={t} className="rounded-2xl bg-white border border-[#EADFC8] p-6">
              <Sparkles className="h-5 w-5 text-[#A8933F]" />
              <h3 className="font-serif text-xl text-[#141414] mt-4">{t}</h3>
              <p className="text-sm text-[#5E554A] mt-2 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
        {secteurDe(cfg.secteur) === "evenementiel" && (
          <div className="mt-6 rounded-2xl bg-[#141414] text-white p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
            <div><div className="text-[11px] uppercase tracking-[0.3em] text-[#E4D49A]">Inclus</div><h3 className="font-serif text-2xl mt-2">Configurateur « Créez votre événement »</h3>
              <p className="text-white/65 text-sm mt-1 max-w-xl">Vos visiteurs composent leur événement sur un plan interactif et voient une estimation en direct avec vos tarifs.</p></div>
          </div>
        )}
      </section>

      <section id="demande" className="bg-white border-y border-[#EADFC8] scroll-mt-28">
        <div className="max-w-5xl mx-auto px-4 py-20 grid lg:grid-cols-[0.9fr_1.1fr] gap-10">
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-[#8C6D22]">Réponse sous 24 h</div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#141414] mt-4">{sec.site.formulaire}</h2>
            <p className="text-[#5E554A] mt-4">Essayez : envoyez une demande, puis ouvrez l'onglet « L'administration » en haut de la page, elle y est déjà.</p>
            <div className="mt-6 space-y-2 text-sm text-[#5E554A]">
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#A8933F]" /> {ville}, Maroc</p>
              <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#A8933F]" /> +212 6 00 00 00 00</p>
            </div>
          </div>
          {etat === "ok" ? (
            <div className="rounded-3xl border border-[#EADFC8] bg-[#FBF8F1] p-8 text-center" data-testid="demo-site-merci">
              <span className="mx-auto h-14 w-14 rounded-full bg-[#C8B560] text-[#141414] grid place-items-center"><Check className="h-7 w-7" /></span>
              <h3 className="font-serif text-2xl mt-5">Demande envoyée</h3>
              <p className="text-[#5E554A] mt-2">C'est ce que voit votre client. De votre côté, la demande vient d'arriver dans votre administration.</p>
              <button onClick={versAdmin} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#141414] text-white px-6 h-11 text-sm" data-testid="demo-voir-admin">Voir dans l'administration <ArrowRight className="h-4 w-4" /></button>
            </div>
          ) : (
            <form onSubmit={envoyer} className="grid sm:grid-cols-2 gap-3" data-testid="demo-site-formulaire">
              <input className={champ} placeholder="Nom et prénom *" value={f.nom} onChange={(e) => setF({ ...f, nom: e.target.value })} data-testid="demo-site-nom" />
              <input className={champ} type="email" placeholder="E-mail" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
              <input className={champ} type="tel" placeholder="Téléphone" value={f.telephone} onChange={(e) => setF({ ...f, telephone: e.target.value })} />
              <select className={champ} value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })}>{sec.site.typeDemande.map((t) => <option key={t}>{t}</option>)}</select>
              <textarea className={`${champ} h-28 py-3 sm:col-span-2 resize-none`} placeholder="Votre message" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} />
              <button type="submit" disabled={f.nom.trim().length < 2 || etat === "envoi"} className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#C8B560] text-[#141414] font-medium h-12 disabled:opacity-50" data-testid="demo-site-envoyer">
                {etat === "envoi" ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />} Envoyer ma demande
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="bg-[#141414] text-white/50 text-sm">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-wrap justify-between gap-3"><span>© {new Date().getFullYear()} {cfg.agence} · {ville}</span><span>Site propulsé par Heavent Studio</span></div>
      </footer>
    </div>
  );
}
