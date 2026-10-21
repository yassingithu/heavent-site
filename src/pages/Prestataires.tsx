import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Seo from "@/components/Seo";
import { FUNCTIONS_URL, supabase } from "@/integrations/supabase/client";
import { idAleatoire, reduirePhoto } from "@/lib/photos";
import { suivre } from "@/lib/suivi";
import { ArrowRight, Camera, Check, ImagePlus, Loader2, MailCheck, Plus, Trash2, X } from "lucide-react";

/** Inscription des prestataires partenaires (DJ, traiteurs, photographes, décorateurs, loueurs de matériel…). */
export const METIERS = ["DJ / animation", "Traiteur", "Photographe", "Vidéaste", "Décoration / fleurs", "Négafa", "Location de matériel", "Son et lumière",
  "Pâtisserie / pièce montée", "Transport", "Orchestre / musiciens", "Animation enfants", "Sécurité", "Autre"];
const UNITES = [["forfait", "Forfait"], ["jour", "Par jour"], ["heure", "Par heure"], ["personne", "Par personne"], ["unite", "À l'unité"]];
const BUCKET = "prestataires";
const MAX_PHOTOS = 8;

interface Ligne { fonction: string; unite: string; prix: string; description: string }
const ligneVide = (): Ligne => ({ fonction: "", unite: "forfait", prix: "", description: "" });

export default function Prestataires() {
  const [f, setF] = useState({ societe: "", contact: "", email: "", telephone: "", ville: "", zones: "", description: "", site_web: "", instagram: "", piege: "" });
  const [metiers, setMetiers] = useState<string[]>([]);
  const [lignes, setLignes] = useState<Ligne[]>([ligneVide()]);
  const [logo, setLogo] = useState<File | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [accord, setAccord] = useState(false);
  const [etat, setEtat] = useState<"saisie" | "envoi" | "ok">("saisie");
  const [erreur, setErreur] = useState<string | null>(null);

  const champ = "w-full rounded-xl border border-[#EADFC8] bg-white px-4 h-12 focus:outline-none focus:border-[#C8B560]";
  const lignesOk = lignes.filter((l) => l.fonction.trim().length > 1 && Number(l.prix) > 0);
  const valide = f.societe.trim().length > 1 && f.contact.trim().length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim()) && lignesOk.length > 0 && accord;

  const deposer = async (fichier: Blob, nom: string, type: string) => {
    const chemin = `inscriptions/${idAleatoire()}/${nom}`;
    const { error } = await supabase.storage.from(BUCKET).upload(chemin, fichier, { contentType: type });
    if (error) throw new Error("Une image n'a pas pu être envoyée : " + error.message);
    return chemin;
  };

  const envoyer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valide || f.piege) return;
    setEtat("envoi"); setErreur(null);
    try {
      const cheminLogo = logo ? await deposer(await reduirePhoto(logo, 800, "image/png"), "logo.png", "image/png") : null;
      const cheminsPhotos: string[] = [];
      for (const [i, p] of photos.entries()) cheminsPhotos.push(await deposer(await reduirePhoto(p, 1800), `photo-${i + 1}.jpg`, "image/jpeg"));
      const { data: id, error } = await (supabase as any).rpc("prestataire_inscrire", { p: {
        ...f, categories: metiers, logo: cheminLogo, photos: cheminsPhotos,
        prestations: lignesOk.map((l) => ({ fonction: l.fonction.trim(), unite: l.unite, prix: Number(l.prix), description: l.description.trim() })),
      } });
      if (error) throw new Error(/Trop de demandes/.test(error.message) ? "Trop de demandes en peu de temps : réessayez dans une heure." : error.message);
      await fetch(`${FUNCTIONS_URL}/prestataires`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "inscription", id }) }).catch(() => {});
      suivre("demande", "prestataire");
      setEtat("ok"); window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) { setErreur((err as Error).message); setEtat("saisie"); }
  };

  if (etat === "ok") return (
    <div className="min-h-[70vh] grid place-items-center bg-[#FBF8F1] px-4 py-16" data-testid="prestataire-merci">
      <div className="max-w-lg text-center">
        <span className="mx-auto h-16 w-16 rounded-full bg-[#141414] text-[#E4D49A] grid place-items-center"><MailCheck className="h-8 w-8" /></span>
        <h1 className="font-serif text-4xl text-[#141414] mt-6">Plus qu'une étape</h1>
        <p className="text-[#5E554A] mt-4 text-lg leading-relaxed">Nous venons de vous envoyer un e-mail à <b>{f.email}</b>. Cliquez sur le lien qu'il contient pour confirmer votre inscription : notre équipe étudiera ensuite votre dossier.</p>
        <p className="text-sm text-[#7a705f] mt-4">Rien reçu ? Pensez à regarder dans les courriers indésirables.</p>
      </div>
    </div>
  );

  return (
    <div className="bg-[#FBF8F1] min-h-screen">
      <Seo perso={{ chemin: "/prestataires", titre: "Devenir prestataire partenaire | Heavent People Agency",
        description: "DJ, traiteurs, photographes, décorateurs, loueurs de matériel : rejoignez le réseau de prestataires de Heavent People Agency au Maroc." }} />
      <section className="bg-[#141414] text-white relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(200,181,96,0.28),transparent_45%),radial-gradient(circle_at_95%_100%,rgba(168,147,63,0.2),transparent_42%)]" />
        <div className="relative max-w-4xl mx-auto px-4 py-16 sm:py-20 text-center">
          <div className="text-[11px] uppercase tracking-[0.3em] text-[#E4D49A]">Prestataires partenaires</div>
          <h1 className="font-serif text-4xl sm:text-5xl mt-4 leading-tight">Travaillons ensemble sur nos prochains événements</h1>
          <p className="text-white/70 mt-5 max-w-2xl mx-auto text-lg">DJ, traiteurs, photographes, décorateurs, loueurs de matériel… Présentez vos prestations et vos tarifs : une fois validé, vous êtes proposé dans nos devis mariages, fêtes et événements d'entreprise.</p>
        </div>
      </section>

      <form onSubmit={envoyer} className="max-w-3xl mx-auto px-4 py-12 space-y-8" data-testid="formulaire-prestataire">
        <Bloc titre="Votre activité" numero={1}>
          <div className="grid sm:grid-cols-2 gap-3">
            <input className={champ} placeholder="Nom de l'entreprise ou nom d'artiste *" value={f.societe} onChange={(e) => setF({ ...f, societe: e.target.value })} data-testid="presta-societe" />
            <input className={champ} placeholder="Votre nom et prénom *" value={f.contact} onChange={(e) => setF({ ...f, contact: e.target.value })} data-testid="presta-contact" />
            <input className={champ} type="email" placeholder="E-mail *" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} data-testid="presta-email" />
            <input className={champ} type="tel" placeholder="Téléphone / WhatsApp" value={f.telephone} onChange={(e) => setF({ ...f, telephone: e.target.value })} />
            <input className={champ} placeholder="Ville" value={f.ville} onChange={(e) => setF({ ...f, ville: e.target.value })} />
            <input className={champ} placeholder="Villes où vous intervenez" value={f.zones} onChange={(e) => setF({ ...f, zones: e.target.value })} />
            <input className={champ} placeholder="Site web" value={f.site_web} onChange={(e) => setF({ ...f, site_web: e.target.value })} />
            <input className={champ} placeholder="Instagram (@…)" value={f.instagram} onChange={(e) => setF({ ...f, instagram: e.target.value })} />
          </div>
          <p className="text-sm text-[#5E554A] mt-5 mb-2">Vos métiers</p>
          <div className="flex flex-wrap gap-2">
            {METIERS.map((m) => {
              const actif = metiers.includes(m);
              return <button type="button" key={m} onClick={() => setMetiers(actif ? metiers.filter((x) => x !== m) : [...metiers, m])}
                className={`rounded-full px-4 h-9 text-sm border transition ${actif ? "bg-[#141414] text-white border-[#141414]" : "bg-white border-[#EADFC8] hover:border-[#C8B560]"}`}>{actif && <Check className="inline h-3.5 w-3.5 mr-1" />}{m}</button>;
            })}
          </div>
          <textarea className={`${champ} h-28 py-3 mt-4 resize-none`} placeholder="Présentez-vous en quelques lignes (expérience, style, matériel…)" value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} />
        </Bloc>

        <Bloc titre="Vos prestations et tarifs" numero={2} aide="Une ligne par prestation, avec le prix que vous proposez (en MAD). Une fois validées, elles pourront être ajoutées à nos devis.">
          <div className="space-y-3">
            {lignes.map((l, i) => (
              <div key={i} className="rounded-2xl border border-[#EADFC8] bg-white p-3 grid sm:grid-cols-[1.4fr_0.8fr_0.7fr_auto] gap-2 items-start" data-testid="presta-ligne">
                <input className={champ} placeholder="Prestation (ex. DJ soirée de mariage)" value={l.fonction} onChange={(e) => setLignes(lignes.map((x, k) => (k === i ? { ...x, fonction: e.target.value } : x)))} data-testid="presta-fonction" />
                <select className={champ} value={l.unite} onChange={(e) => setLignes(lignes.map((x, k) => (k === i ? { ...x, unite: e.target.value } : x)))}>
                  {UNITES.map(([v, t]) => <option key={v} value={v}>{t}</option>)}
                </select>
                <input className={champ} inputMode="decimal" placeholder="Prix MAD" value={l.prix} onChange={(e) => setLignes(lignes.map((x, k) => (k === i ? { ...x, prix: e.target.value.replace(/[^\d.,]/g, "").replace(",", ".") } : x)))} data-testid="presta-prix" />
                <button type="button" onClick={() => setLignes(lignes.length > 1 ? lignes.filter((_, k) => k !== i) : [ligneVide()])} className="h-12 w-12 grid place-items-center rounded-xl text-[#8a8070] hover:text-red-700" aria-label="Retirer"><Trash2 className="h-4 w-4" /></button>
                <input className={`${champ} sm:col-span-3 h-10 text-sm`} placeholder="Détail (optionnel) : durée, inclus, conditions…" value={l.description} onChange={(e) => setLignes(lignes.map((x, k) => (k === i ? { ...x, description: e.target.value } : x)))} />
              </div>
            ))}
            {lignes.length < 30 && <button type="button" onClick={() => setLignes([...lignes, ligneVide()])} className="inline-flex items-center gap-1.5 text-sm text-[#8C6D22]"><Plus className="h-4 w-4" /> Ajouter une prestation</button>}
          </div>
        </Bloc>

        <Bloc titre="Votre logo et vos photos" numero={3} aide="Votre logo (si vous en avez un) et jusqu'à 8 photos de votre matériel ou de vos réalisations.">
          <div className="flex flex-wrap gap-4 items-start">
            <label className="cursor-pointer">
              <input type="file" accept="image/*" className="hidden" onChange={(e) => { const x = e.target.files?.[0]; if (x) setLogo(x); e.target.value = ""; }} data-testid="presta-logo" />
              <div className="h-28 w-28 rounded-2xl border-2 border-dashed border-[#DCCBA6] bg-white grid place-items-center overflow-hidden">
                {logo ? <img src={URL.createObjectURL(logo)} alt="Logo" className="h-full w-full object-contain p-2" /> : <span className="text-xs text-[#8a8070] text-center px-2"><ImagePlus className="h-6 w-6 mx-auto mb-1 text-[#A8933F]" />Logo</span>}
              </div>
            </label>
            {photos.map((p, i) => (
              <div key={i} className="relative h-28 w-28 rounded-2xl overflow-hidden bg-white border border-[#EADFC8]">
                <img src={URL.createObjectURL(p)} alt="" className="h-full w-full object-cover" />
                <button type="button" onClick={() => setPhotos(photos.filter((_, k) => k !== i))} className="absolute top-1 right-1 h-7 w-7 rounded-full bg-black/60 text-white grid place-items-center" aria-label="Retirer"><X className="h-4 w-4" /></button>
              </div>
            ))}
            {photos.length < MAX_PHOTOS && (
              <label className="cursor-pointer">
                <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => { setPhotos([...photos, ...[...(e.target.files ?? [])]].slice(0, MAX_PHOTOS)); e.target.value = ""; }} data-testid="presta-photos" />
                <div className="h-28 w-28 rounded-2xl border-2 border-dashed border-[#DCCBA6] bg-white grid place-items-center"><span className="text-xs text-[#8a8070] text-center"><Camera className="h-6 w-6 mx-auto mb-1 text-[#A8933F]" />Photos</span></div>
              </label>
            )}
          </div>
        </Bloc>

        <input tabIndex={-1} autoComplete="off" aria-hidden className="hidden" value={f.piege} onChange={(e) => setF({ ...f, piege: e.target.value })} />
        <label className="flex gap-3 text-sm text-[#5E554A] items-start">
          <input type="checkbox" checked={accord} onChange={(e) => setAccord(e.target.checked)} className="mt-1 h-4 w-4 accent-[#A8933F]" data-testid="presta-accord" />
          <span>J'accepte que Heavent People Agency conserve ces informations pour me proposer des prestations, et m'écrive à ce sujet. <Link to="/politique-confidentialite" className="underline">Confidentialité</Link></span>
        </label>
        {erreur && <p className="text-sm text-red-700" data-testid="presta-erreur">{erreur}</p>}
        <button type="submit" disabled={!valide || etat === "envoi"} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#141414] text-white px-8 h-13 py-3.5 font-medium disabled:opacity-40" data-testid="presta-envoyer">
          {etat === "envoi" ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />} Envoyer ma candidature
        </button>
        {!valide && <p className="text-xs text-[#8a8070]">Champs obligatoires : entreprise, nom, e-mail, au moins une prestation avec son prix, et votre accord.</p>}
      </form>
    </div>
  );
}

function Bloc({ titre, numero, aide, children }: { titre: string; numero: number; aide?: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-baseline gap-3"><span className="font-serif text-3xl text-[#C8B560]">{String(numero).padStart(2, "0")}</span><h2 className="font-serif text-2xl text-[#141414]">{titre}</h2></div>
      {aide && <p className="text-sm text-[#7a705f] mt-1 mb-4">{aide}</p>}
      <div className={aide ? "" : "mt-4"}>{children}</div>
    </section>
  );
}

/** Lien reçu par e-mail */
export function ConfirmerPrestataire() {
  const { jeton } = useParams();
  const [r, setR] = useState<{ societe: string; statut: string } | null | undefined>(undefined);
  useEffect(() => { (supabase as any).rpc("prestataire_confirmer", { p_jeton: jeton }).then(({ data }: any) => setR(data ?? null)); }, [jeton]);
  return (
    <div className="min-h-[70vh] grid place-items-center bg-[#FBF8F1] px-4 py-16" data-testid="prestataire-confirme">
      <Seo noindex />
      {r === undefined ? <Loader2 className="h-8 w-8 animate-spin text-[#A8933F]" /> : r === null ? (
        <div className="text-center max-w-md"><h1 className="font-serif text-3xl">Lien invalide</h1><p className="text-[#5E554A] mt-3">Ce lien de confirmation n'existe pas ou n'est plus valable.</p></div>
      ) : (
        <div className="text-center max-w-md">
          <span className="mx-auto h-16 w-16 rounded-full bg-[#C8B560] text-[#141414] grid place-items-center"><Check className="h-8 w-8" /></span>
          <h1 className="font-serif text-4xl mt-6 text-[#141414]">Merci, c'est confirmé</h1>
          <p className="text-[#5E554A] mt-4 text-lg">{r.statut === "valide" ? <>Le profil de <b>{r.societe}</b> est déjà validé.</> : <>Le dossier de <b>{r.societe}</b> est entre les mains de notre équipe. Vous recevrez un e-mail dès qu'il sera validé.</>}</p>
          <Link to="/" className="inline-flex mt-8 rounded-full border border-[#141414] px-6 h-11 items-center">Retour au site</Link>
        </div>
      )}
    </div>
  );
}
