// Récapitulatif final, téléchargement et demande de devis (démonstration).
import { RefObject, useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cssBase } from "@/lib/pdf";
import { MENTION_ESTIMATION, TYPES_EVENEMENT, format } from "./config";
import { Creation, calculerBudget, evaluerMissions, placesPrevues } from "./logique";
import {
  CSS_RECAP, Coordonnees, OptionsRecap, documentRecap, nomAmbiance, nomLieu, nomType, optionsChoisies, sceneEnPng, telechargerFichier, telechargerRecapPdf, texteDemande,
} from "./recapitulatif";
import { INTEGRATION_ACTIVE, envoyerDemandeDevis } from "./integration";
import Scene from "./Scene";
import { lienPartage } from "./partage";
import { Bouton } from "./ui";

export function Recapitulatif({ creation, cols, rows, onModifier, onTelecharger, onDevis, onPartager }: {
  creation: Creation; cols: number; rows: number; onModifier: () => void; onTelecharger: (svg: SVGSVGElement | null) => void; onDevis: () => void; onPartager: () => void;
}) {
  const svg = useRef<SVGSVGElement>(null);
  const b = calculerBudget(creation);
  const m = evaluerMissions(creation);
  const r = creation.reglages;
  const info = (e: string, v: string) => (
    <div className="rounded-xl bg-[#FBF8F1] border border-[#EFE5CF] px-3 py-2"><div className="text-[10px] uppercase tracking-wider text-[#8C6D22]">{e}</div><div className="font-medium">{v}</div></div>
  );
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="uppercase tracking-[0.25em] text-xs text-[#8C6D22]">Votre création</p>
        <h2 className="font-serif text-3xl sm:text-4xl">Voici {TYPES_EVENEMENT.find((t) => t.id === r.type)!.article} de rêve</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 items-start">
        <div className="rounded-[2rem] bg-white border border-[#EADFC8] p-3 shadow-[0_20px_60px_-35px_rgba(140,109,34,0.5)]">
          <Scene ref={svg} creation={creation} cols={cols} rows={rows} lectureSeule />
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {info("Événement", nomType(creation))}{info("Ambiance", nomAmbiance(creation))}
            {info("Lieu", nomLieu(creation))}{info("Invités", `${r.invites}`)}
            {info("Places prévues", `${placesPrevues(creation)}`)}{info("Budget souhaité", format(r.budget))}
          </div>
          <div className="rounded-2xl border border-[#EADFC8] bg-white p-4">
            <div className="flex items-baseline justify-between"><h3 className="font-serif">Estimation</h3><span className="font-semibold" data-testid="recap-total">{format(b.total)}</span></div>
            <ul className="mt-2 text-sm divide-y divide-[#F1E9D6]">
              {b.lignes.map((l) => <li key={l.libelle} className="flex justify-between gap-3 py-1"><span>{l.quantite > 1 ? `${l.quantite} × ` : ""}{l.libelle}<span className="block text-[11px] text-[#6B6155]">{l.detail}</span></span><span className="whitespace-nowrap">{format(l.total)}</span></li>)}
            </ul>
            <p className={`text-xs mt-2 ${b.depassement ? "text-[#8A2E26]" : "text-[#4F6B3A]"}`}>{b.depassement ? `Dépasse votre budget de ${format(b.depassement)}.` : `Reste ${format(b.reste)} sur votre budget.`}</p>
            <p className="text-[11px] text-[#6B6155] italic mt-1">{MENTION_ESTIMATION}</p>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-[#EADFC8] bg-white p-4">
          <h3 className="font-serif mb-2">Options choisies</h3>
          <p className="text-sm text-[#4A4238]">{optionsChoisies(creation).join(" · ") || "Aucun élément pour l'instant."}</p>
        </div>
        <div className="rounded-2xl border border-[#EADFC8] bg-white p-4">
          <h3 className="font-serif mb-2">Missions</h3>
          <ul className="space-y-1.5 text-sm">
            {m.map((x) => <li key={x.id} className={x.ok ? "text-[#2F6B3D]" : "text-[#9A4B12]"}>{x.ok ? "✓" : "○"} {x.titre}{!x.ok && <span className="block text-xs ml-4">À compléter : {x.aide}</span>}</li>)}
          </ul>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Bouton variante="secondaire" onClick={onModifier}>Modifier ma création</Bouton>
        <Bouton variante="secondaire" onClick={() => onTelecharger(svg.current)}>Télécharger mon récapitulatif</Bouton>
        <Bouton variante="secondaire" onClick={onPartager}>Partager ma création</Bouton>
        <Bouton onClick={onDevis}>Demander un devis pour cet événement</Bouton>
      </div>
    </div>
  );
}

// ── Téléchargement : aperçu et choix ────────────────────────────────────────
export function FenetreTelechargement({ ouvert, onFermer, creation, svg }: { ouvert: boolean; onFermer: () => void; creation: Creation; svg: RefObject<SVGSVGElement | null> }) {
  const [o, setO] = useState<OptionsRecap>({ scene: true, estimation: true, missions: true });
  const [formatFichier, setFormat] = useState<"pdf" | "png">("pdf");
  const [image, setImage] = useState<string | null>(null);
  const [etat, setEtat] = useState<"" | "en_cours" | "ok" | "erreur">("");
  useEffect(() => {
    if (!ouvert) return;
    setEtat("");
    if (svg.current) sceneEnPng(svg.current, 1.5).then(setImage).catch(() => setImage(null));
  }, [ouvert, svg]);

  const telecharger = async () => {
    setEtat("en_cours");
    try {
      if (formatFichier === "pdf") await telechargerRecapPdf(creation, o, o.scene ? image ?? (svg.current ? await sceneEnPng(svg.current) : null) : null);
      else {
        if (!svg.current) throw new Error("scène absente");
        const png = await sceneEnPng(svg.current, 2.5);
        telechargerFichier("ma-scene-evenement.png", await (await fetch(png)).blob());
      }
      setEtat("ok");
    } catch { setEtat("erreur"); }
  };
  const case_ = (k: keyof OptionsRecap, t: string) => (
    <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="h-4 w-4 accent-[#C9A74E]" checked={o[k]} disabled={formatFichier === "png"} onChange={(e) => setO({ ...o, [k]: e.target.checked })} />{t}</label>
  );
  return (
    <Dialog open={ouvert} onOpenChange={(v) => !v && onFermer()}>
      <DialogContent className="max-w-3xl max-h-[92vh] overflow-y-auto bg-[#FBF8F1]">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Télécharger mon récapitulatif</DialogTitle>
          <DialogDescription>Choisissez le format et ce que vous voulez garder. Aucune coordonnée n'est demandée.</DialogDescription>
        </DialogHeader>
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-5">
          <div className="space-y-4">
            <fieldset className="space-y-2">
              <legend className="font-medium text-sm mb-1">Format</legend>
              <label className="flex items-start gap-2 text-sm"><input type="radio" name="format" className="mt-1 accent-[#C9A74E]" checked={formatFichier === "pdf"} onChange={() => setFormat("pdf")} /><span><b>PDF</b> — document complet à imprimer ou partager</span></label>
              <label className="flex items-start gap-2 text-sm"><input type="radio" name="format" className="mt-1 accent-[#C9A74E]" checked={formatFichier === "png"} onChange={() => setFormat("png")} /><span><b>Image (PNG)</b> — la scène seule, en haute définition</span></label>
            </fieldset>
            <fieldset className="space-y-2">
              <legend className="font-medium text-sm mb-1">Contenu du PDF</legend>
              {case_("scene", "Aperçu de la scène")}{case_("estimation", "Détail de l'estimation")}{case_("missions", "Missions et points à compléter")}
            </fieldset>
            <Bouton onClick={telecharger} disabled={etat === "en_cours"} className="w-full">{etat === "en_cours" ? "Préparation…" : `Télécharger (${formatFichier.toUpperCase()})`}</Bouton>
            <p aria-live="polite" className="text-xs">
              {etat === "ok" && <span className="text-[#2F6B3D]">Fichier téléchargé ✓ — retrouvez-le dans vos téléchargements.</span>}
              {etat === "erreur" && <span className="text-[#9B2C2C]">Le fichier n'a pas pu être créé. Réessayez.</span>}
            </p>
          </div>
          <div>
            <div className="text-xs font-medium mb-1.5">Aperçu</div>
            <div className="rounded-xl border border-[#E3D6BA] bg-white overflow-hidden" style={{ height: 520 }}>
              {formatFichier === "pdf" ? (
                <div style={{ transform: "scale(0.52)", transformOrigin: "top left", width: 794 }} data-testid="apercu-recap"
                  dangerouslySetInnerHTML={{ __html: `<style>${cssBase()}${CSS_RECAP}</style>${documentRecap(creation, o, image)}` }} />
              ) : image ? <img src={image} alt="Aperçu de l'image de la scène" className="w-full h-full object-contain" /> : <p className="p-4 text-sm">Préparation de l'image…</p>}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Demande de devis (démonstration) ────────────────────────────────────────
const VIDE: Coordonnees = { prenom: "", email: "", telephone: "", date: "", dateInconnue: false, ville: "", message: "" };

export function FenetreDevis({ ouvert, onFermer, creation }: { ouvert: boolean; onFermer: () => void; creation: Creation }) {
  // Les coordonnées restent en mémoire uniquement : jamais dans le stockage du navigateur.
  const [k, setK] = useState<Coordonnees>(VIDE);
  const [erreurs, setErreurs] = useState<Partial<Record<keyof Coordonnees, string>>>({});
  const [etat, setEtat] = useState<"saisie" | "envoi" | "envoye" | "echec" | "demo">("saisie");
  const [texte, setTexte] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => { if (!ouvert) { setK(VIDE); setEtat("saisie"); setErreurs({}); setTexte(""); } }, [ouvert]);

  const set = <F extends keyof Coordonnees>(f: F, v: Coordonnees[F]) => setK((x) => ({ ...x, [f]: v }));
  const valider = async () => {
    const e: typeof erreurs = {};
    if (!k.prenom.trim()) e.prenom = "Indiquez votre prénom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(k.email.trim())) e.email = "Indiquez une adresse e-mail valide.";
    if (!k.dateInconnue && !k.date) e.date = "Choisissez une date ou cochez « Je ne sais pas encore ».";
    if (!k.ville.trim()) e.ville = "Indiquez la ville ou le lieu.";
    setErreurs(e);
    if (Object.keys(e).length) return;
    const t = texteDemande(creation, k);
    setTexte(t);
    if (!INTEGRATION_ACTIVE) { setEtat("demo"); return; }
    setEtat("envoi");
    const r = await envoyerDemandeDevis({ coordonnees: k, creation, texte: t });
    if (r.envoye) setEtat("envoye");
    else { setMessage(r.message ?? ""); setEtat("echec"); }
  };
  const telecharger = () => telechargerFichier(`demande-devis-${new Date().toISOString().slice(0, 10)}.txt`, texte);
  const champ = (f: keyof Coordonnees, label: string, props: Record<string, unknown> = {}, facultatif = false) => (
    <div>
      <label htmlFor={`devis-${f}`} className="text-sm font-medium">{label}{facultatif && <span className="font-normal text-[#6B6155]"> (facultatif)</span>}</label>
      <input id={`devis-${f}`} value={k[f] as string} onChange={(e) => set(f, e.target.value as never)} aria-invalid={!!erreurs[f]} aria-describedby={erreurs[f] ? `err-${f}` : undefined}
        className="mt-1 w-full rounded-xl border border-[#DCCBA6] bg-white px-3 min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A74E]" {...props} />
      {erreurs[f] && <p id={`err-${f}`} className="text-xs text-[#9B2C2C] mt-1">{erreurs[f]}</p>}
    </div>
  );
  return (
    <Dialog open={ouvert} onOpenChange={(v) => !v && etat !== "envoi" && onFermer()}>
      <DialogContent className="max-w-xl max-h-[92vh] overflow-y-auto bg-[#FBF8F1]">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">{etat === "envoye" ? "Merci, votre demande est envoyée" : "Demander un devis pour cet événement"}</DialogTitle>
          <DialogDescription>
            {etat === "envoye"
              ? "Nous l'avons bien reçue avec votre création. Nous revenons vers vous sous 24 h."
              : INTEGRATION_ACTIVE
                ? "Votre création (type, ambiance, invités, éléments, estimation) est jointe automatiquement à votre demande."
                : "Démonstration : ce formulaire prépare votre demande à télécharger, sans l'envoyer."}
          </DialogDescription>
        </DialogHeader>
        {(etat === "saisie" || etat === "envoi") && (
          <form className="space-y-3" noValidate onSubmit={(e) => { e.preventDefault(); valider(); }}>
            {champ("prenom", "Prénom", { autoComplete: "given-name" })}
            {champ("email", "Adresse e-mail", { type: "email", autoComplete: "email", inputMode: "email" })}
            {champ("telephone", "Téléphone", { type: "tel", autoComplete: "tel", inputMode: "tel" }, true)}
            <div>
              <label htmlFor="devis-date" className="text-sm font-medium">Date souhaitée</label>
              <div className="flex flex-wrap items-center gap-3 mt-1">
                <input id="devis-date" type="date" disabled={k.dateInconnue} value={k.date} onChange={(e) => set("date", e.target.value)} aria-invalid={!!erreurs.date}
                  className="rounded-xl border border-[#DCCBA6] bg-white px-3 min-h-11 disabled:opacity-50" />
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="h-4 w-4 accent-[#C9A74E]" checked={k.dateInconnue} onChange={(e) => set("dateInconnue", e.target.checked)} />Je ne sais pas encore</label>
              </div>
              {erreurs.date && <p className="text-xs text-[#9B2C2C] mt-1">{erreurs.date}</p>}
            </div>
            {champ("ville", "Ville ou lieu", { autoComplete: "address-level2" })}
            <div>
              <label htmlFor="devis-message" className="text-sm font-medium">Message <span className="font-normal text-[#6B6155]">(facultatif)</span></label>
              <textarea id="devis-message" rows={3} value={k.message} onChange={(e) => set("message", e.target.value)} className="mt-1 w-full rounded-xl border border-[#DCCBA6] bg-white px-3 py-2" />
            </div>
            <p className="text-xs text-[#6B6155]">Vos coordonnées servent uniquement à vous répondre (loi 09-08). Elles ne sont pas conservées sur cet appareil.</p>
            <div className="flex flex-wrap gap-2">
              <Bouton type="submit" disabled={etat === "envoi"}>{etat === "envoi" ? "Envoi…" : INTEGRATION_ACTIVE ? "Envoyer ma demande" : "Préparer ma demande"}</Bouton>
              <Bouton type="button" variante="discret" onClick={onFermer} disabled={etat === "envoi"}>Annuler</Bouton>
            </div>
          </form>
        )}
        {etat === "envoye" && (
          <div className="space-y-3" data-testid="demande-envoyee">
            <div className="rounded-xl bg-[#EEF6EA] border border-[#CFE3C5] p-3 text-sm text-[#2F5A2A]" role="status">
              ✓ Demande envoyée à Heavent People Agency. Une confirmation avec votre récapitulatif arrive sur {k.email}.
            </div>
            <div className="flex flex-wrap gap-2">
              <Bouton variante="secondaire" onClick={telecharger}>Garder une copie (.txt)</Bouton>
              <Bouton onClick={onFermer}>Fermer</Bouton>
            </div>
          </div>
        )}
        {(etat === "echec" || etat === "demo") && (
          <div className="space-y-3" data-testid="demande-preparee">
            <div className={`rounded-xl p-3 text-sm ${etat === "echec" ? "bg-[#FBEDEB] border border-[#EFC9C4] text-[#8A2E26]" : "bg-[#FFF7E6] border border-[#F0D9A8] text-[#5C4512]"}`} role={etat === "echec" ? "alert" : "status"}>
              {etat === "echec"
                ? <>Votre demande n'a pas pu être envoyée{message ? ` (${message})` : ""}. Réessayez, ou téléchargez-la et écrivez-nous à info@heaventagency.com.</>
                : "Mode démonstration : votre demande n'a pas été envoyée. Téléchargez-la pour la garder ou nous la transmettre."}
            </div>
            <textarea readOnly value={texte} rows={10} aria-label="Contenu de la demande" className="w-full rounded-xl border border-[#E3D6BA] bg-white p-3 text-xs font-mono" />
            <div className="flex flex-wrap gap-2">
              {etat === "echec" && <Bouton onClick={valider}>Réessayer l'envoi</Bouton>}
              <Bouton variante={etat === "echec" ? "secondaire" : "principal"} onClick={telecharger}>Télécharger ma demande</Bouton>
              <Bouton variante="discret" onClick={() => setEtat("saisie")}>Modifier mes informations</Bouton>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ── Partage de la création ──────────────────────────────────────────────────
export function FenetrePartage({ ouvert, onFermer, creation }: { ouvert: boolean; onFermer: () => void; creation: Creation }) {
  const [copie, setCopie] = useState(false);
  const lien = ouvert ? lienPartage(creation) : "";
  const type = TYPES_EVENEMENT.find((t) => t.id === creation.reglages.type)!;
  const message = `Regarde ${type.article.replace(/^votre /, "le ").replace(/^vos /, "les ")} que j'imagine avec Heavent ✨ ${creation.reglages.invites} invités, ambiance ${nomAmbiance(creation).toLowerCase()}.`;
  useEffect(() => { if (ouvert) setCopie(false); }, [ouvert]);
  const copier = async () => {
    try { await navigator.clipboard.writeText(lien); setCopie(true); }
    catch { const champ = document.getElementById("lien-partage") as HTMLInputElement | null; champ?.select(); }
  };
  const partagerNatif = async () => { try { await navigator.share({ title: "Mon événement Heavent", text: message, url: lien }); } catch { /* annulé */ } };
  return (
    <Dialog open={ouvert} onOpenChange={(v) => !v && onFermer()}>
      <DialogContent className="max-w-md bg-[#FBF8F1]">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Partager ma création</DialogTitle>
          <DialogDescription>Montrez votre scène à vos proches : le lien l'ouvre telle quelle, et ils peuvent la reprendre à leur tour. Aucune coordonnée n'y figure.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <a href={`https://wa.me/?text=${encodeURIComponent(`${message}\n${lien}`)}`} target="_blank" rel="noopener noreferrer" data-testid="partage-whatsapp"
            className="flex items-center justify-center gap-2 rounded-full min-h-12 bg-[#25D366] text-white font-medium hover:bg-[#1EBE5B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A74E]">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z" /></svg>
            Envoyer sur WhatsApp
          </a>
          {typeof navigator !== "undefined" && "share" in navigator && <Bouton variante="secondaire" className="w-full" onClick={partagerNatif}>Partager autrement…</Bouton>}
          <div>
            <label htmlFor="lien-partage" className="text-xs font-medium">Lien de votre création</label>
            <div className="flex gap-2 mt-1">
              <input id="lien-partage" readOnly value={lien} onFocus={(e) => e.currentTarget.select()} className="flex-1 min-w-0 rounded-xl border border-[#DCCBA6] bg-white px-3 min-h-11 text-xs" />
              <Bouton variante="secondaire" onClick={copier}>{copie ? "Copié ✓" : "Copier"}</Bouton>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** Ce que voit la personne qui ouvre un lien partagé. */
export function VuePartagee({ creation, cols, rows, onReprendre, onZero }: { creation: Creation; cols: number; rows: number; onReprendre: () => void; onZero: () => void }) {
  const b = calculerBudget(creation);
  const type = TYPES_EVENEMENT.find((t) => t.id === creation.reglages.type)!;
  return (
    <div className="space-y-5" data-testid="vue-partagee">
      <div className="text-center space-y-2">
        <p className="uppercase tracking-[0.25em] text-xs text-[#8C6D22]">Une création partagée avec vous</p>
        <h2 className="font-serif text-3xl sm:text-4xl">{type.nom} · {creation.reglages.invites} invités</h2>
        <p className="text-sm text-[#5E554A]">Ambiance {nomAmbiance(creation).toLowerCase()}, {nomLieu(creation).toLowerCase()} · estimation {format(b.total)}</p>
      </div>
      <div className="rounded-[2rem] bg-white border border-[#EADFC8] p-3 shadow-[0_20px_60px_-35px_rgba(140,109,34,0.5)] max-w-4xl mx-auto">
        <Scene creation={creation} cols={cols} rows={rows} lectureSeule />
      </div>
      <p className="text-sm text-center text-[#4A4238] max-w-2xl mx-auto">{optionsChoisies(creation).join(" · ")}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Bouton onClick={onReprendre} className="px-6">Créer la mienne à partir de celle-ci</Bouton>
        <Bouton variante="secondaire" onClick={onZero}>Commencer de zéro</Bouton>
      </div>
    </div>
  );
}
