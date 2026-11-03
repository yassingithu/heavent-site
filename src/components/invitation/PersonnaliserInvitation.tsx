import { useState } from "react";
import { RotateCcw, Play } from "lucide-react";
import Invitation from "./Invitation";
import { CHAMPS_COULEUR, MODELES, PALETTES, couleursDe, modeleDe, type Couleurs, type InvitationReglages, type Langue } from "@/lib/invitation";

interface Props {
  noms: string; date?: string | null; lieu?: string | null; message?: string | null;
  valeur: InvitationReglages; onChange: (v: InvitationReglages) => void;
}

const LANGUES: [Langue, string][] = [["fr", "FR"], ["en", "EN"], ["ar", "عربي"]];
const egal = (a: Couleurs, b: Couleurs) => (Object.keys(a) as (keyof Couleurs)[]).every((k) => a[k].toLowerCase() === b[k].toLowerCase());

/** Choix du modèle, des couleurs (modifiables à tout moment) et aperçu en direct. */
export default function PersonnaliserInvitation({ noms, date, lieu, message, valeur, onChange }: Props) {
  const [rejouer, setRejouer] = useState(0);
  const [langue, setLangue] = useState<Langue>("fr");
  const modele = modeleDe(valeur.modele);
  const actuelles = couleursDe(valeur);

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
          <h3 className="font-serif text-xl mb-1">1. Choisissez un modèle</h3>
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
            <h3 className="font-serif text-xl">2. Vos couleurs</h3>
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
          <h3 className="font-serif text-xl">3. Le lieu et l'heure</h3>
          <label className="block text-sm">Heure d'accueil (facultatif)
            <input className={`${champ} mt-1`} value={valeur.heure ?? ""} maxLength={20} placeholder="19h30" onChange={(e) => onChange({ ...valeur, heure: e.target.value })} data-testid="invitation-heure" />
          </label>
          <label className="block text-sm">Lien Google Maps du lieu (facultatif)
            <input className={`${champ} mt-1`} value={valeur.lieu_maps ?? ""} maxLength={300} inputMode="url" placeholder="https://maps.app.goo.gl/…" onChange={(e) => onChange({ ...valeur, lieu_maps: e.target.value })} data-testid="invitation-maps" />
            <span className="block text-xs text-[#6B6154] mt-1">Sans lien, le bouton ouvre une recherche Google Maps avec le nom du lieu.</span>
          </label>
        </section>

        <section className="space-y-3" data-testid="invitation-programme">
          <h3 className="font-serif text-xl">4. Le programme (facultatif)</h3>
          <p className="text-xs text-[#6B6154]">Affiché aux invités quand ils font défiler l'invitation.</p>
          {(valeur.programme ?? []).map((l, k) => (
            <div key={k} className="flex gap-2">
              <input className={`${champ} w-24`} value={l.heure} maxLength={10} placeholder="19h30" aria-label="Heure" onChange={(e) => onChange({ ...valeur, programme: (valeur.programme ?? []).map((x, i) => (i === k ? { ...x, heure: e.target.value } : x)) })} />
              <input className={`${champ} flex-1 min-w-0`} value={l.titre} maxLength={50} placeholder="Cérémonie" aria-label="Moment" onChange={(e) => onChange({ ...valeur, programme: (valeur.programme ?? []).map((x, i) => (i === k ? { ...x, titre: e.target.value } : x)) })} />
              <button type="button" className="px-3 min-h-11 text-sm underline" aria-label="Retirer cette ligne" onClick={() => onChange({ ...valeur, programme: (valeur.programme ?? []).filter((_, i) => i !== k) })}>✕</button>
            </div>
          ))}
          <div className="flex flex-wrap gap-2">
            {(valeur.programme ?? []).length < 8 && <button type="button" className={bouton} onClick={() => onChange({ ...valeur, programme: [...(valeur.programme ?? []), { heure: "", titre: "" }] })}>Ajouter un moment</button>}
            {!(valeur.programme ?? []).length && <button type="button" className={bouton} onClick={() => onChange({ ...valeur, programme: [{ heure: "19h30", titre: "Accueil des invités" }, { heure: "20h30", titre: "Entrée des mariés" }, { heure: "21h00", titre: "Dîner" }, { heure: "23h00", titre: "Soirée dansante" }] })}>Programme type</button>}
          </div>
        </section>
      </div>

      <aside className="min-w-0 order-first lg:order-none lg:sticky lg:top-4 self-start space-y-2" aria-label="Aperçu de l'invitation">
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-1" role="group" aria-label="Langue de l'aperçu">
            {LANGUES.map(([l, t]) => (
              <button key={l} type="button" onClick={() => setLangue(l)} aria-pressed={langue === l}
                className={`rounded-full px-3 min-h-9 text-xs border ${langue === l ? "bg-[#141414] text-white border-[#141414]" : "bg-white border-[#E3D6BA]"}`}>{t}</button>
            ))}
          </div>
          <button type="button" className={bouton} onClick={() => setRejouer((n) => n + 1)} data-testid="invitation-rejouer"><Play className="h-4 w-4" /> Voir l'ouverture</button>
        </div>
        <Invitation noms={noms || "Prénom & Prénom"} date={date} lieu={lieu} message={message} reglages={valeur} langue={langue} pleinePage={false} rejouer={rejouer} ouverte={rejouer === 0} />
      </aside>
    </div>
  );
}
