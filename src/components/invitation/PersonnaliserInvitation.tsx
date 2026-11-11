import { useEffect, useRef, useState } from "react";
import ChampMessage from "./ChampMessage";
import ChampMusique from "./ChampMusique";
import ImportOuverture from "./ImportOuverture";
import { chargerOuverturesPerso } from "@/lib/ouverturesPerso";
import { RotateCcw, Play } from "lucide-react";
import Invitation from "./Invitation";
import { noms_ar, lieu_ar, titre_ar } from "@/lib/arabe";
import { decorsPour, CLUBS } from "@/lib/decors";
import { POLICES, CHAMPS_COULEUR, OUVERTURES, FERMETURES, PAPIERS, STYLES_OUVERTURE, modelesPour, palettesPour, revelationsPour, couleursDe, modeleDe, ouvertureDe, revelationDe, type Couleurs, type InvitationReglages, type Langue } from "@/lib/invitation";
import { evenementDe, questionDe } from "@/lib/evenements";

interface Props {
  /** Affiche l'outil d'ajout d'ouvertures vidéo (administration seulement). */
  estAdmin?: boolean;
  noms: string; date?: string | null; lieu?: string | null; message?: string | null;
  valeur: InvitationReglages; onChange: (v: InvitationReglages) => void;
}

const LANGUES: [Langue, string][] = [["fr", "FR"], ["en", "EN"], ["ar", "عربي"]];
const egal = (a: Couleurs, b: Couleurs) => (Object.keys(a) as (keyof Couleurs)[]).every((k) => a[k].toLowerCase() === b[k].toLowerCase());

/** Choix du modèle, des couleurs (modifiables à tout moment) et aperçu en direct. */
export default function PersonnaliserInvitation({ noms, date, lieu, message, valeur, onChange, estAdmin }: Props) {
  const ev = evenementDe(valeur.evenement);
  const compteur = { v: 0 }; const num = () => ++compteur.v;
  const [rejouer, setRejouer] = useState(0);
  const [langue, setLangue] = useState<Langue>("fr");
  const modele = modeleDe(valeur.modele);
  const actuelles = couleursDe(valeur);

  const apercuRef = useRef<HTMLElement>(null);
  const [, forcer] = useState(0);
  useEffect(() => { chargerOuverturesPerso().then(() => forcer((n) => n + 1)); }, []);
  const [filtre, setFiltre] = useState<string | null>(null);
  const ouv = ouvertureDe(valeur.ouverture);
  const visibles = OUVERTURES.filter((o) => !filtre || o.styles.includes(filtre) || o.id === ouv.id);
  const rev = revelationDe(valeur.revelation);
  const choisirOuverture = (id: string) => { onChange({ ...valeur, ouverture: id }); setRejouer((n) => n + 1); };
  const choisirRevelation = (id: string) => { onChange({ ...valeur, revelation: id }); setRejouer((n) => n + 1); };
  const [erreurLogo, setErreurLogo] = useState<string | null>(null);
  const choisirModele = (id: string) => onChange({ ...valeur, modele: id });
  const appliquerPalette = (c: Couleurs) => onChange({ ...valeur, couleurs: { ...c } });
  const changer = (k: keyof Couleurs, v: string) => onChange({ ...valeur, couleurs: { ...(valeur.couleurs ?? {}), [k]: v } });
  const modifiees = Object.keys(valeur.couleurs ?? {}).length > 0;
  const bouton = "inline-flex items-center gap-1.5 rounded-full border border-[#DCCBA6] bg-white px-3 min-h-10 text-sm hover:bg-[#FAF7EE]";
  const champ = "w-full rounded-xl border border-[#E3D6BA] bg-white px-3 min-h-10 text-sm";

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]" data-testid="personnaliser-invitation">
      <div className="space-y-6 min-w-0 pb-20 lg:pb-0">
        <section>
          <h3 className="font-serif text-xl mb-1">{num()}. Comment l'invitation s'ouvre</h3>
          <p className="text-sm text-[#5E554A] mb-3">Le premier geste de vos invités. Touchez un choix pour le revoir dans l'aperçu.</p>
          <div className="flex gap-3 overflow-x-auto border-b border-[#EADFC8] mb-4" role="group" aria-label="Filtrer par style">
            {[null, ...STYLES_OUVERTURE].map((st) => (
              <button key={st ?? "tous"} type="button" onClick={() => setFiltre(st)} aria-pressed={filtre === st}
                className={`shrink-0 min-h-11 px-0.5 text-xs tracking-[.08em] uppercase border-b-2 ${filtre === st ? "text-[#141414] border-[#8C6D22]" : "text-[#5E554A] border-transparent"}`}>{st ?? "Toutes"}</button>
            ))}
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-x-3 gap-y-5 items-start" role="group" aria-label="Ouverture">
            {visibles.map((o) => {
              const choisie = ouv.id === o.id;
              return (
              <button key={o.id} type="button" onClick={() => choisirOuverture(o.id)} aria-pressed={choisie} data-testid={`ouverture-${o.id}`} className="text-left group">
                <span className={`relative flex aspect-[9/16] w-full overflow-hidden bg-[#EFE6D2] outline outline-2 outline-offset-2 ${choisie ? "outline-[#8C6D22]" : "outline-transparent group-hover:outline-[#E4D49A]"}`} aria-hidden="true">
                  {o.id === "enveloppe"
                    ? <span className="m-auto grid h-full w-full place-items-center bg-[#141414]"><span className="grid h-16 w-16 place-items-center border border-[#A8933F] font-serif italic text-[#E4D49A] text-lg">A &amp; B</span></span>
                    : o.poster
                    ? <img src={o.poster} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                    : <><span className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(/ouvertures/${o.id}-g.webp)` }} /><span className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(/ouvertures/${o.id}-d.webp)` }} /></>}
                  {choisie && <span className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-[#141414] text-[#E4D49A] text-xs">✓</span>}
                </span>
                <span className={`mt-1.5 block font-serif text-[15px] leading-tight ${choisie ? "text-[#8C6D22]" : ""}`}>{o.nom}</span>
                <span className="block whitespace-nowrap text-[11px] tracking-[.1em] uppercase text-[#6B6154]">{o.video ? "Film" : "Animation"} · {String(Math.round(o.duree / 100) / 10).replace(".", ",")} s</span>
              </button>
              );
            })}
          </div>
          <p className="text-xs text-[#6B6154] mt-3"><strong className="font-medium">{ouv.nom}.</strong> {ouv.description}</p>
          {ouv.id === "enveloppe" && (
            <div className="mt-3" role="group" aria-label="Fermeture de l'enveloppe">
              <p className="text-sm font-medium mb-2">Fermeture de l'enveloppe</p>
              <div className="flex flex-wrap gap-2">
                {FERMETURES.map((f) => (
                  <button key={f.id} type="button" aria-pressed={(valeur.fermeture ?? "cachet") === f.id} data-testid={`fermeture-${f.id}`} title={f.description}
                    onClick={() => { onChange({ ...valeur, fermeture: f.id === "cachet" ? undefined : f.id }); setRejouer((n) => n + 1); }}
                    className={`rounded-full border px-4 min-h-10 text-sm ${(valeur.fermeture ?? "cachet") === f.id ? "border-[#141414] bg-[#141414] text-white" : "border-[#E3D6BA] bg-white hover:border-[#C8B560]"}`}>{f.nom}</button>
                ))}
              </div>
            </div>
          )}
          {ouv.id === "enveloppe" && (
            <div className="mt-3 space-y-3" data-testid="matiere-enveloppe">
              <div role="group" aria-label="Papier de l'enveloppe">
                <p className="text-sm font-medium mb-2">Papier de l'enveloppe</p>
                <div className="flex flex-wrap gap-2">
                  {PAPIERS.map((pp) => (
                    <button key={pp.id} type="button" aria-pressed={(valeur.papier ?? "lisse") === pp.id} data-testid={`papier-${pp.id}`}
                      onClick={() => { onChange({ ...valeur, papier: pp.id === "lisse" ? undefined : pp.id }); setRejouer((n) => n + 1); }}
                      className={`rounded-full border px-4 min-h-10 text-sm ${(valeur.papier ?? "lisse") === pp.id ? "border-[#141414] bg-[#141414] text-white" : "border-[#E3D6BA] bg-white hover:border-[#C8B560]"}`}>{pp.nom}</button>
                  ))}
                </div>
              </div>
              <div role="group" aria-label="Doublure du rabat">
                <p className="text-sm font-medium mb-2">Doublure du rabat</p>
                <div className="flex flex-wrap gap-2">
                  {[{ id: undefined, nom: "Couleur du modèle" }, { id: "sauge" as const, nom: "Fleurie sauge" }].map((d) => (
                    <button key={d.nom} type="button" aria-pressed={valeur.doublure === d.id} data-testid={`doublure-${d.id ?? "modele"}`}
                      onClick={() => { onChange({ ...valeur, doublure: d.id }); setRejouer((n) => n + 1); }}
                      className={`rounded-full border px-4 min-h-10 text-sm ${valeur.doublure === d.id ? "border-[#141414] bg-[#141414] text-white" : "border-[#E3D6BA] bg-white hover:border-[#C8B560]"}`}>{d.nom}</button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {ouv.id !== "enveloppe" && !ouv.cadre && ouv.id !== "rose-imperiale" && (
            <label className="mt-3 flex items-center gap-2 min-h-10 text-sm cursor-pointer">
              <input type="checkbox" className="h-5 w-5 accent-[#8C6D22]" checked={valeur.cachet !== false} onChange={(e) => { onChange({ ...valeur, cachet: e.target.checked ? undefined : false }); setRejouer((n) => n + 1); }} data-testid="option-cachet" />
              <span>Cachet de cire doré<span className="block text-xs text-[#6B6154]">Décochez pour un simple bouton « Ouvrir »</span></span>
            </label>
          )}
          <button type="button" onClick={() => { setRejouer((n) => n + 1); apercuRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#DCCBA6] bg-white px-4 min-h-11 text-sm lg:hidden" data-testid="voir-apercu"><Play className="h-4 w-4" /> Voir l'aperçu</button>
          {estAdmin && <ImportOuverture onAjoutee={(id) => choisirOuverture(id)} />}
        </section>

        {revelationsPour(ev.id).length > 1 && (
        <section>
          <h3 className="font-serif text-xl mb-1">{num()}. Une petite surprise ?</h3>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Révélation">
            {revelationsPour(ev.id).map((r) => (
              <button key={r.id} type="button" onClick={() => choisirRevelation(r.id)} aria-pressed={rev.id === r.id} data-testid={`revelation-${r.id}`}
                className={`rounded-full border px-4 min-h-10 text-sm ${rev.id === r.id ? "border-[#141414] bg-[#141414] text-white" : "border-[#E3D6BA] bg-white hover:border-[#C8B560]"}`}>{r.nom}</button>
            ))}
          </div>
          <p className="text-xs text-[#6B6154] mt-2">{rev.description}</p>
        </section>
        )}

        <section>
          <ChampMusique valeur={valeur.musique ?? ""} onChange={(m) => onChange({ ...valeur, musique: m })} estAdmin={estAdmin} champ={champ} />
        </section>

        <section>
          <h3 className="font-serif text-xl mb-1">{num()}. Le style de l'invitation</h3>
          <p className="text-sm text-[#5E554A] mb-3">Chaque modèle a son ornement et ses couleurs. Vos couleurs personnalisées sont conservées quand vous changez de modèle.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {modelesPour(ev.id).map((m) => (
              <button key={m.id} type="button" onClick={() => choisirModele(m.id)} aria-pressed={modele.id === m.id} data-testid={`modele-${m.id}`}
                className={`text-left rounded-2xl border p-2.5 transition ${modele.id === m.id ? "border-[#141414] ring-2 ring-[#141414]/15" : "border-[#E3D6BA] hover:border-[#C8B560]"}`}>
                <span className="flex h-14 rounded-lg overflow-hidden mb-2" style={{ background: m.couleurs.fond }} aria-hidden="true">
                  <span className="m-auto h-8 w-12 rounded-sm" style={{ background: m.couleurs.papier, boxShadow: `0 0 0 3px ${m.couleurs.enveloppe}`, borderBottom: `3px solid ${m.couleurs.accent}` }} />
                </span>
                <span className="block text-sm font-medium">{m.nom}</span>
                <span className="block text-xs text-[#6B6154]">{m.description}</span>
              </button>
            ))}
          </div>
        </section>

        {decorsPour(ev.id).length > 1 && (
        <section data-testid="section-decor">
          <h3 className="font-serif text-xl mb-1">{num()}. Le décor</h3>
          <p className="text-sm text-[#5E554A] mb-3">Le dessin en haut de la carte. Il se combine avec n'importe quel modèle, couleur et ouverture.</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Décor">
            {decorsPour(ev.id).map((d) => (
              <button key={d.id} type="button" aria-pressed={(valeur.decor ?? "aucun") === d.id} data-testid={`decor-${d.id}`}
                onClick={() => onChange({ ...valeur, decor: d.id === "aucun" ? undefined : d.id })}
                className={`rounded-full border px-4 min-h-11 text-sm ${(valeur.decor ?? "aucun") === d.id ? "border-[#141414] bg-[#141414] text-white" : "border-[#E3D6BA] bg-white hover:border-[#C8B560]"}`}>{d.nom}</button>
            ))}
          </div>
          {valeur.decor === "maillot" && (
            <div className="mt-4 space-y-3" data-testid="choix-club">
              <label className="block text-sm font-medium">Équipe
                <select className="mt-1 block w-full min-h-11 rounded-xl border border-[#E3D6BA] bg-white px-3" value={valeur.club ?? "libre"} onChange={(e) => onChange({ ...valeur, club: e.target.value === "libre" ? undefined : e.target.value })} data-testid="club-select">
                  {CLUBS.map((c) => <option key={c.id} value={c.id}>{c.nom}</option>)}
                </select>
              </label>
              <p className="text-xs text-[#6B6154]">Nous dessinons le maillot aux couleurs de l'équipe, sans écusson. Vous pouvez ajouter celui de votre choix ci-dessous.</p>
              <div className="flex flex-wrap items-center gap-2">
                <label className="inline-flex items-center gap-2 rounded-full border border-[#DCCBA6] bg-white px-4 min-h-11 text-sm cursor-pointer">
                  Ajouter l'écusson (logo de l'équipe)
                  <input type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" data-testid="club-logo" onChange={(e) => {
                    const f = e.target.files?.[0]; if (!f) return;
                    const img = new Image(); const url = URL.createObjectURL(f);
                    img.onload = () => {
                      const c = document.createElement("canvas"); const k = 160 / Math.max(img.width, img.height, 1);
                      c.width = Math.max(1, Math.round(img.width * k)); c.height = Math.max(1, Math.round(img.height * k));
                      c.getContext("2d")?.drawImage(img, 0, 0, c.width, c.height);
                      URL.revokeObjectURL(url); setErreurLogo(null); onChange({ ...valeur, club_logo: c.toDataURL("image/webp", 0.85) });
                    };
                    img.onerror = () => { URL.revokeObjectURL(url); setErreurLogo("Image illisible. Utilisez une photo JPG, PNG ou WebP (les photos HEIC d'iPhone ne passent pas : faites une capture d'écran)."); };
                    img.src = url; e.target.value = "";
                  }} />
                </label>
                {valeur.club_logo && <img src={valeur.club_logo} alt="Écusson ajouté" className="h-11 w-11 rounded-lg border border-[#E3D6BA] object-contain bg-white" />}
                {valeur.club_logo && <button type="button" className="text-sm underline min-h-11" onClick={() => onChange({ ...valeur, club_logo: undefined })}>Retirer</button>}
              </div>
              {erreurLogo && <p role="alert" className="text-sm text-[#9B2C2C]">{erreurLogo}</p>}
              <p className="text-xs text-[#6B6154]">L'image envoyée reste celle du client : n'utilisez que des visuels dont vous avez le droit de vous servir.</p>
            </div>
          )}
        </section>
        )}

        <section>
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="font-serif text-xl">{num()}. Les couleurs</h3>
            <button type="button" className={bouton} onClick={() => onChange({ ...valeur, couleurs: {} })} disabled={!modifiees} data-testid="couleurs-reinit">
              <RotateCcw className="h-4 w-4" /> Couleurs du modèle
            </button>
          </div>
          <p className="text-sm text-[#5E554A] mb-3">Un clic sur une palette, ou réglez chaque couleur. Modifiable à tout moment, même après l'envoi : vos invités voient toujours la dernière version.</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {palettesPour(ev.id).map((p) => (
              <button key={p.id} type="button" onClick={() => appliquerPalette(p.couleurs)} aria-pressed={egal(actuelles, p.couleurs)} aria-label={p.nom} title={p.nom} data-testid={`palette-${p.id}`}
                className={`flex items-center gap-2 rounded-full border pl-1.5 pr-3 min-h-10 text-xs ${egal(actuelles, p.couleurs) ? "border-[#141414] bg-[#FAF7EE]" : "border-[#E3D6BA] bg-white hover:bg-[#FAF7EE]"}`}>
                <span className="flex" aria-hidden="true">
                  {[p.couleurs.fond, p.couleurs.papier, p.couleurs.accent].map((c, i) => <span key={i} className="h-5 w-5 rounded-full border border-black/10 -ml-1 first:ml-0" style={{ background: c }} />)}
                </span>
                {p.nom}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            <div className="sm:col-span-2" role="group" aria-label="Police des prénoms">
              <p className="text-sm font-medium">Police des prénoms (version française)</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {POLICES.map((p) => (
                  <button key={p.id} type="button" aria-pressed={(valeur.police ?? "calligraphie") === p.id} onClick={() => onChange({ ...valeur, police: p.id })} data-testid={`police-${p.id}`}
                    className={`min-h-11 rounded-full border px-4 text-lg ${(valeur.police ?? "calligraphie") === p.id ? "bg-[#141414] text-white border-[#141414]" : "border-[#E3D6BA]"}`} style={{ fontFamily: p.css }}>{p.nom}</button>
                ))}
              </div>
            </div>
            {CHAMPS_COULEUR.map(({ cle, libelle, aide }) => (
              <label key={cle} className="flex items-center gap-3 rounded-xl border border-[#E3D6BA] bg-white p-2.5">
                <input type="color" value={actuelles[cle]} onChange={(e) => changer(cle, e.target.value)} className="h-10 w-12 shrink-0 cursor-pointer rounded-lg border-0 bg-transparent p-0" data-testid={`couleur-${cle}`} />
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{libelle}</span>
                  <span className="block text-xs text-[#6B6154]">{aide}</span>
                </span>
              </label>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="font-serif text-xl">{num()}. Le lieu et l'heure</h3>
          <label className="block text-sm">Heure d'accueil (facultatif)
            <input className={`${champ} mt-1`} value={valeur.heure ?? ""} maxLength={20} placeholder="19h30" onChange={(e) => onChange({ ...valeur, heure: e.target.value })} data-testid="invitation-heure" />
          </label>
          <label className="block text-sm">Lien Google Maps du lieu (facultatif)
            <input className={`${champ} mt-1`} value={valeur.lieu_maps ?? ""} maxLength={300} inputMode="url" placeholder="https://maps.app.goo.gl/…" onChange={(e) => onChange({ ...valeur, lieu_maps: e.target.value })} data-testid="invitation-maps" />
            <span className="block text-xs text-[#6B6154] mt-1">Sans lien, le bouton ouvre une recherche Google Maps avec le nom du lieu.</span>
          </label>
        </section>

        <section className="space-y-3" data-testid="invitation-programme">
          <h3 className="font-serif text-xl">{num()}. Le programme (facultatif)</h3>
          <p className="text-xs text-[#6B6154]">Affiché aux invités quand ils font défiler l'invitation.</p>
          {(valeur.programme ?? []).map((l, k) => (
            <div key={k} className="flex gap-2">
              <input className={`${champ} w-24`} value={l.heure} maxLength={10} placeholder="19h30" aria-label="Heure" onChange={(e) => onChange({ ...valeur, programme: (valeur.programme ?? []).map((x, i) => (i === k ? { ...x, heure: e.target.value } : x)) })} />
              <input className={`${champ} flex-1 min-w-0`} value={l.titre} maxLength={50} placeholder="Cérémonie" aria-label="Moment" onChange={(e) => onChange({ ...valeur, programme: (valeur.programme ?? []).map((x, i) => (i === k ? { ...x, titre: e.target.value } : x)) })} />
              <input dir="rtl" className={`${champ} w-36`} value={l.titre_ar ?? ""} maxLength={50} placeholder={titre_ar(l.titre) || "بالعربية"} aria-label="Moment en arabe" onChange={(e) => onChange({ ...valeur, programme: (valeur.programme ?? []).map((x, i) => (i === k ? { ...x, titre_ar: e.target.value } : x)) })} />
              <button type="button" className="px-3 min-h-11 text-sm underline" aria-label="Retirer cette ligne" onClick={() => onChange({ ...valeur, programme: (valeur.programme ?? []).filter((_, i) => i !== k) })}>✕</button>
            </div>
          ))}
          <div className="flex flex-wrap gap-2">
            {(valeur.programme ?? []).length < 8 && <button type="button" className={bouton} onClick={() => onChange({ ...valeur, programme: [...(valeur.programme ?? []), { heure: "", titre: "" }] })}>Ajouter un moment</button>}
            {!(valeur.programme ?? []).length && ev.programme.length > 0 && <button type="button" className={bouton} onClick={() => onChange({ ...valeur, programme: ev.programme })}>Programme type</button>}
          </div>
        </section>

        {ev.questions.length > 0 && (
          <section className="space-y-2" data-testid="invitation-questions">
            <h3 className="font-serif text-xl">{num()}. Les questions posées à vos invités</h3>
            <p className="text-xs text-[#6B6154]">Cochez celles qui vous aident. Toutes sont facultatives pour l'invité. Rien n'est demandé sur la religion ou la santé, hormis ce que l'invité choisit d'indiquer.</p>
            {ev.questions.map((id) => {
              const q = questionDe(id); if (!q) return null;
              const coche = (valeur.questions ?? []).includes(id);
              return (
                <label key={id} className="flex items-center gap-2 min-h-11 text-sm cursor-pointer">
                  <input type="checkbox" className="h-5 w-5 accent-[#8C6D22]" checked={coche} onChange={(e) => onChange({ ...valeur, questions: e.target.checked ? [...(valeur.questions ?? []), id] : (valeur.questions ?? []).filter((x) => x !== id) })} data-testid={`question-choix-${id}`} />
                  <span>{q.fr}</span>
                </label>
              );
            })}
          </section>
        )}

        <section className="space-y-3" data-testid="invitation-arabe">
          <h3 className="font-serif text-xl">{num()}. La version arabe</h3>
          <p className="text-xs text-[#6B6154]">Les prénoms et le lieu sont écrits automatiquement en lettres arabes. Vérifiez et corrigez ici si besoin : ce que vous écrivez remplace la suggestion.</p>
          <label className="block text-sm">{ev.nomsLibelle}
            <input dir="rtl" className={`${champ} mt-1`} value={valeur.noms_ar ?? ""} maxLength={80} placeholder={noms_ar(noms)} onChange={(e) => onChange({ ...valeur, noms_ar: e.target.value })} data-testid="invitation-noms-ar" />
          </label>
          {lieu && (
            <label className="block text-sm">Lieu
              <input dir="rtl" className={`${champ} mt-1`} value={valeur.lieu_ar ?? ""} maxLength={160} placeholder={lieu_ar(lieu)} onChange={(e) => onChange({ ...valeur, lieu_ar: e.target.value })} data-testid="invitation-lieu-ar" />
            </label>
          )}
          {message && (
            <label className="block text-sm">Votre message
              <ChampMessage rtl pagine={!!ouvertureDe(valeur.ouverture).carte} libelle="Message en arabe" valeur={valeur.message_ar ?? ""} onChange={(v) => onChange({ ...valeur, message_ar: v })} className={`${champ} mt-1 py-2`} placeholder="ترجمة رسالتكم بالعربية" testId="invitation-message-ar" />
            </label>
          )}
        </section>
      </div>

      <aside ref={apercuRef} className="min-w-0 scroll-mt-16 order-first lg:order-none lg:sticky lg:top-4 self-start space-y-2" aria-label="Aperçu de l'invitation">
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-1" role="group" aria-label="Langue de l'aperçu">
            {LANGUES.map(([l, t]) => (
              <button key={l} type="button" onClick={() => setLangue(l)} aria-pressed={langue === l}
                className={`rounded-full px-3 min-h-9 text-xs border ${langue === l ? "bg-[#141414] text-white border-[#141414]" : "bg-white border-[#E3D6BA]"}`}>{t}</button>
            ))}
          </div>
          <button type="button" className={bouton} onClick={() => setRejouer((n) => n + 1)} data-testid="invitation-rejouer"><Play className="h-4 w-4" /> Voir l'ouverture</button>
        </div>
        <Invitation noms={noms || "Prénom & Prénom"} date={date} lieu={lieu} message={message} reglages={valeur} langue={langue} pleinePage={false} rejouer={rejouer} ouverte={rejouer === 0} autoOuvrir />
      </aside>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#E3D6BA] bg-[#FBF8F1]/95 px-4 py-2 lg:hidden" style={{ paddingBottom: "max(8px, env(safe-area-inset-bottom, 0px))" }}>
        <button type="button" onClick={() => { setRejouer((n) => n + 1); apercuRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#141414] text-[#F7F3E8] min-h-12 text-sm font-medium" data-testid="voir-apercu-barre"><Play className="h-4 w-4" /> Voir l'aperçu</button>
      </div>
    </div>
  );
}
