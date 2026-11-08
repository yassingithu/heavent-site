import { useEffect, useRef, useState } from "react";
import ImportOuverture from "./ImportOuverture";
import { chargerOuverturesPerso } from "@/lib/ouverturesPerso";
import { RotateCcw, Play } from "lucide-react";
import Invitation from "./Invitation";
import { noms_ar, lieu_ar, titre_ar } from "@/lib/arabe";
import { CHAMPS_COULEUR, MODELES, OUVERTURES, STYLES_OUVERTURE, PALETTES, REVELATIONS, couleursDe, modeleDe, ouvertureDe, revelationDe, type Couleurs, type InvitationReglages, type Langue } from "@/lib/invitation";

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
  const choisirModele = (id: string) => onChange({ ...valeur, modele: id });
  const appliquerPalette = (c: Couleurs) => onChange({ ...valeur, couleurs: { ...c } });
  const changer = (k: keyof Couleurs, v: string) => onChange({ ...valeur, couleurs: { ...(valeur.couleurs ?? {}), [k]: v } });
  const modifiees = Object.keys(valeur.couleurs ?? {}).length > 0;
  const bouton = "inline-flex items-center gap-1.5 rounded-full border border-[#DCCBA6] bg-white px-3 min-h-10 text-sm hover:bg-[#FAF7EE]";
  const champ = "w-full rounded-xl border border-[#E3D6BA] bg-white px-3 min-h-10 text-sm";

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]" data-testid="personnaliser-invitation">
      <div className="space-y-6 min-w-0">
        <section>
          <h3 className="font-serif text-xl mb-1">1. Comment l'invitation s'ouvre</h3>
          <p className="text-sm text-[#5E554A] mb-3">Le premier geste de vos invités. Touchez un choix pour le revoir dans l'aperçu.</p>
          <div className="flex gap-5 overflow-x-auto border-b border-[#EADFC8] mb-4" role="group" aria-label="Filtrer par style">
            {[null, ...STYLES_OUVERTURE].map((st) => (
              <button key={st ?? "tous"} type="button" onClick={() => setFiltre(st)} aria-pressed={filtre === st}
                className={`shrink-0 min-h-11 px-0.5 text-[13px] tracking-[.12em] uppercase border-b-2 ${filtre === st ? "text-[#141414] border-[#8C6D22]" : "text-[#5E554A] border-transparent"}`}>{st ?? "Toutes"}</button>
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
                <span className="block text-[11px] tracking-[.14em] uppercase text-[#6B6154]">{o.video ? "Film" : "Animation"} · {Math.round(o.duree / 1000)} s</span>
              </button>
              );
            })}
          </div>
          <p className="text-xs text-[#6B6154] mt-3"><strong className="font-medium">{ouv.nom}.</strong> {ouv.description}</p>
          <button type="button" onClick={() => { setRejouer((n) => n + 1); apercuRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#DCCBA6] bg-white px-4 min-h-11 text-sm lg:hidden" data-testid="voir-apercu"><Play className="h-4 w-4" /> Voir l'aperçu</button>
          {estAdmin && <ImportOuverture onAjoutee={(id) => choisirOuverture(id)} />}
        </section>

        <section>
          <h3 className="font-serif text-xl mb-1">2. Une petite surprise ?</h3>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Révélation">
            {REVELATIONS.map((r) => (
              <button key={r.id} type="button" onClick={() => choisirRevelation(r.id)} aria-pressed={rev.id === r.id} data-testid={`revelation-${r.id}`}
                className={`rounded-full border px-4 min-h-10 text-sm ${rev.id === r.id ? "border-[#141414] bg-[#141414] text-white" : "border-[#E3D6BA] bg-white hover:border-[#C8B560]"}`}>{r.nom}</button>
            ))}
          </div>
          <p className="text-xs text-[#6B6154] mt-2">{rev.description}</p>
        </section>

        <section>
          <label className="block text-sm">Musique à l'ouverture (facultatif)
            <input className={`${champ} mt-1`} value={valeur.musique ?? ""} maxLength={300} inputMode="url" placeholder="https://…/ma-musique.mp3" data-testid="invitation-musique-lien" onChange={(e) => onChange({ ...valeur, musique: e.target.value })} />
            <span className="block text-xs text-[#6B6154] mt-1">Lien direct vers un fichier audio (MP3) dont vous avez les droits. Elle démarre quand l'invité ouvre, avec un bouton pour la couper.</span>
          </label>
        </section>

        <section>
          <h3 className="font-serif text-xl mb-1">3. Le style de l'invitation</h3>
          <p className="text-sm text-[#5E554A] mb-3">Chaque modèle a son ornement et ses couleurs. Vos couleurs personnalisées sont conservées quand vous changez de modèle.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {MODELES.map((m) => (
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

        <section>
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="font-serif text-xl">4. Les couleurs</h3>
            <button type="button" className={bouton} onClick={() => onChange({ ...valeur, couleurs: {} })} disabled={!modifiees} data-testid="couleurs-reinit">
              <RotateCcw className="h-4 w-4" /> Couleurs du modèle
            </button>
          </div>
          <p className="text-sm text-[#5E554A] mb-3">Un clic sur une palette, ou réglez chaque couleur. Modifiable à tout moment, même après l'envoi : vos invités voient toujours la dernière version.</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {PALETTES.map((p) => (
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
          <h3 className="font-serif text-xl">5. Le lieu et l'heure</h3>
          <label className="block text-sm">Heure d'accueil (facultatif)
            <input className={`${champ} mt-1`} value={valeur.heure ?? ""} maxLength={20} placeholder="19h30" onChange={(e) => onChange({ ...valeur, heure: e.target.value })} data-testid="invitation-heure" />
          </label>
          <label className="block text-sm">Lien Google Maps du lieu (facultatif)
            <input className={`${champ} mt-1`} value={valeur.lieu_maps ?? ""} maxLength={300} inputMode="url" placeholder="https://maps.app.goo.gl/…" onChange={(e) => onChange({ ...valeur, lieu_maps: e.target.value })} data-testid="invitation-maps" />
            <span className="block text-xs text-[#6B6154] mt-1">Sans lien, le bouton ouvre une recherche Google Maps avec le nom du lieu.</span>
          </label>
        </section>

        <section className="space-y-3" data-testid="invitation-programme">
          <h3 className="font-serif text-xl">6. Le programme (facultatif)</h3>
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
            {!(valeur.programme ?? []).length && <button type="button" className={bouton} onClick={() => onChange({ ...valeur, programme: [{ heure: "19h30", titre: "Accueil des invités" }, { heure: "20h30", titre: "Entrée des mariés" }, { heure: "21h00", titre: "Dîner" }, { heure: "23h00", titre: "Soirée dansante" }] })}>Programme type</button>}
          </div>
        </section>

        <section className="space-y-3" data-testid="invitation-arabe">
          <h3 className="font-serif text-xl">7. La version arabe</h3>
          <p className="text-xs text-[#6B6154]">Les prénoms et le lieu sont écrits automatiquement en lettres arabes. Vérifiez et corrigez ici si besoin : ce que vous écrivez remplace la suggestion.</p>
          <label className="block text-sm">Prénoms des mariés
            <input dir="rtl" className={`${champ} mt-1`} value={valeur.noms_ar ?? ""} maxLength={80} placeholder={noms_ar(noms)} onChange={(e) => onChange({ ...valeur, noms_ar: e.target.value })} data-testid="invitation-noms-ar" />
          </label>
          {lieu && (
            <label className="block text-sm">Lieu
              <input dir="rtl" className={`${champ} mt-1`} value={valeur.lieu_ar ?? ""} maxLength={160} placeholder={lieu_ar(lieu)} onChange={(e) => onChange({ ...valeur, lieu_ar: e.target.value })} data-testid="invitation-lieu-ar" />
            </label>
          )}
          {message && (
            <label className="block text-sm">Votre message
              <textarea dir="rtl" rows={2} className={`${champ} mt-1 py-2`} value={valeur.message_ar ?? ""} maxLength={300} placeholder="ترجمة رسالتكم بالعربية" onChange={(e) => onChange({ ...valeur, message_ar: e.target.value })} data-testid="invitation-message-ar" />
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
    </div>
  );
}
