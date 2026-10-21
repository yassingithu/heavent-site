import { useState } from "react";
import { ArrowRight, Check, Loader2, MapPin, MessageCircle, Phone, Quote, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SECTEURS, imageDemo, secteurDe } from "./secteurs";
import type { ConfigDemo } from "./donneesDemo";

/**
 * Site vitrine fictif du prospect (démo Heavent Studio), aux couleurs et aux photos de son métier
 * (jamais celles de Heavent). Les demandes envoyées arrivent dans l'administration de la démo.
 */
export default function DemoSite({ cfg, versAdmin }: { cfg: ConfigDemo; versAdmin: () => void }) {
  const metier = secteurDe(cfg.secteur);
  const sec = SECTEURS[metier];
  const t = sec.theme;
  const img = (n: number) => imageDemo(metier, n);
  const ville = cfg.ville || "Casablanca";
  const [f, setF] = useState({ nom: "", email: "", telephone: "", type: sec.site.typeDemande[0], message: "" });
  const [etat, setEtat] = useState<"saisie" | "envoi" | "ok">("saisie");
  const initiales = cfg.agence.split(/\s+/).map((m) => m[0]).join("").slice(0, 2).toUpperCase();
  const champ = "w-full rounded-xl border bg-white px-4 h-12 placeholder:text-black/35 focus:outline-none";

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
  const bouton = { background: t.accent, color: t.surAccent };

  return (
    <div className="min-h-screen" style={{ background: t.clair, color: t.texteClair }} data-testid="demo-site">
      {/* En-tête */}
      <header className="sticky top-12 z-40 backdrop-blur border-b" style={{ background: `${t.fond}F2`, borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-3 min-w-0">
            {cfg.logo_url ? <img src={cfg.logo_url} alt={cfg.agence} className="h-10 w-auto max-w-[160px] object-contain rounded bg-white/95 p-1" />
              : <span className="h-10 w-10 rounded-full grid place-items-center font-semibold" style={bouton}>{initiales}</span>}
            <span className="text-lg font-semibold tracking-tight truncate">{cfg.agence}</span>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-sm text-white/75">
            {sec.site.services.slice(0, 3).map(([x]) => <span key={x}>{x}</span>)}
            <span>Contact</span>
          </nav>
          <a href="#demande" className="rounded-full text-sm font-medium px-5 h-10 inline-flex items-center shrink-0" style={bouton}>{sec.site.cta}</a>
        </div>
      </header>

      {/* Grande photo d'ouverture */}
      <section className="relative min-h-[78vh] flex items-end overflow-hidden text-white">
        <img src={img(sec.images.hero)} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${t.fond}33 0%, ${t.fond}99 55%, ${t.fond}F2 100%)` }} />
        <div className="relative max-w-6xl mx-auto px-4 pb-16 sm:pb-24 w-full">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] backdrop-blur" style={{ background: "rgba(255,255,255,0.12)" }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: t.accent }} /> {sec.site.accroche} · {ville}
          </div>
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.05] mt-5 max-w-3xl">{sec.site.titre}</h1>
          <p className="text-white/80 text-lg mt-5 max-w-2xl leading-relaxed">{sec.site.texte}</p>
          <div className="flex flex-wrap gap-3 mt-8">
            <a href="#demande" className="inline-flex items-center gap-2 rounded-full font-medium px-7 h-12" style={bouton}>{sec.site.cta} <ArrowRight className="h-4 w-4" /></a>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 h-12 backdrop-blur"><MessageCircle className="h-4 w-4" /> WhatsApp</span>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-12 max-w-2xl">
            {sec.chiffres.map(([c, l]) => (
              <div key={l} className="rounded-2xl px-4 py-3 backdrop-blur" style={{ background: "rgba(255,255,255,0.1)" }}>
                <div className="text-2xl sm:text-3xl font-semibold" style={{ color: t.accent }}>{c}</div>
                <div className="text-xs text-white/75 mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mise en avant (modèles, best-sellers, biens, réalisations) */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight" style={{ color: t.fond }}>{sec.vedette.titre}</h2>
          <a href="#demande" className="text-sm font-medium inline-flex items-center gap-1" style={{ color: t.fond }}>Tout voir <ArrowRight className="h-4 w-4" /></a>
        </div>
        <div className="grid sm:grid-cols-3 gap-5 mt-8">
          {sec.vedette.cartes.map(([titre, detail, etiquette], i) => (
            <article key={titre} className="group rounded-3xl overflow-hidden bg-white shadow-[0_18px_50px_-25px_rgba(0,0,0,0.35)]">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src={img(sec.images.cartes[i] ?? i)} alt="" loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
                <span className="absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold" style={bouton}>{etiquette}</span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold" style={{ color: t.fond }}>{titre}</h3>
                <p className="text-sm opacity-75 mt-1">{detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Services en photos */}
      <section style={{ background: t.fond }} className="text-white">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Nos services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {sec.site.services.map(([titre, d], i) => (
              <div key={titre} className="relative rounded-3xl overflow-hidden min-h-[260px] flex items-end">
                <img src={img(sec.images.services[i] ?? i)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 20%, ${t.fond}F0 95%)` }} />
                <div className="relative p-5">
                  <div className="h-1 w-8 rounded-full mb-3" style={{ background: t.accent }} />
                  <h3 className="text-lg font-semibold">{titre}</h3>
                  <p className="text-sm text-white/75 mt-1 leading-relaxed">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avis clients */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="flex items-center gap-1" style={{ color: t.accent }}>{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-5 w-5 fill-current" />)}</div>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-3" style={{ color: t.fond }}>Ils nous ont fait confiance</h2>
        <div className="grid sm:grid-cols-3 gap-5 mt-8">
          {sec.avis.map(([qui, texte]) => (
            <figure key={qui} className="rounded-3xl bg-white p-6 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.3)]">
              <Quote className="h-6 w-6" style={{ color: t.accent }} />
              <blockquote className="mt-3 leading-relaxed">{texte}</blockquote>
              <figcaption className="mt-4 text-sm font-semibold" style={{ color: t.fond }}>{qui}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Formulaire */}
      <section id="demande" className="scroll-mt-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-20 grid lg:grid-cols-[0.9fr_1.1fr] gap-10">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: t.accent === "#FFFFFF" ? t.fond : t.accent }}>Réponse sous 24 h</div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-3" style={{ color: t.fond }}>{sec.site.formulaire}</h2>
            <p className="opacity-75 mt-4">Essayez : envoyez une demande, puis ouvrez l'onglet « L'administration » en haut de la page, elle y est déjà.</p>
            <div className="mt-6 space-y-2 text-sm opacity-80">
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {ville}, Maroc</p>
              <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> +212 6 00 00 00 00</p>
            </div>
          </div>
          {etat === "ok" ? (
            <div className="rounded-3xl p-8 text-center" style={{ background: t.clair }} data-testid="demo-site-merci">
              <span className="mx-auto h-14 w-14 rounded-full grid place-items-center" style={bouton}><Check className="h-7 w-7" /></span>
              <h3 className="text-2xl font-semibold mt-5" style={{ color: t.fond }}>Demande envoyée</h3>
              <p className="opacity-75 mt-2">C'est ce que voit votre client. De votre côté, la demande vient d'arriver dans votre administration.</p>
              <button onClick={versAdmin} className="mt-6 inline-flex items-center gap-2 rounded-full text-white px-6 h-11 text-sm" style={{ background: t.fond }} data-testid="demo-voir-admin">Voir dans l'administration <ArrowRight className="h-4 w-4" /></button>
            </div>
          ) : (
            <form onSubmit={envoyer} className="grid sm:grid-cols-2 gap-3" data-testid="demo-site-formulaire">
              <input className={champ} placeholder="Nom et prénom *" value={f.nom} onChange={(e) => setF({ ...f, nom: e.target.value })} data-testid="demo-site-nom" />
              <input className={champ} type="email" placeholder="E-mail" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
              <input className={champ} type="tel" placeholder="Téléphone" value={f.telephone} onChange={(e) => setF({ ...f, telephone: e.target.value })} />
              <select className={champ} value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })}>{sec.site.typeDemande.map((x) => <option key={x}>{x}</option>)}</select>
              <textarea className={`${champ} h-28 py-3 sm:col-span-2 resize-none`} placeholder="Votre message" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} />
              <button type="submit" disabled={f.nom.trim().length < 2 || etat === "envoi"} className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-full font-medium h-12 disabled:opacity-50" style={bouton} data-testid="demo-site-envoyer">
                {etat === "envoi" ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />} Envoyer ma demande
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="text-white/60 text-sm" style={{ background: t.fond }}>
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-wrap justify-between gap-3"><span>© {new Date().getFullYear()} {cfg.agence} · {ville}</span><span>Site propulsé par Heavent Studio</span></div>
      </footer>
    </div>
  );
}
