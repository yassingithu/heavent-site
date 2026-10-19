import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Seo from "@/components/Seo";
import ZoneSignature, { ZoneSignatureRef } from "@/components/contrat/ZoneSignature";
import { NUMERO_WHATSAPP } from "@/components/BoutonWhatsApp";
import { CGV_DEFAUT, CGV_NAWAR_DEFAUT } from "@/lib/conditions";
import {
  DevisForm, MENTION_MONTANT_EVOLUTIF, Parametres, calculerTotaux, dateFr, dateHeureFr, devisDepuisBase, money, totalLigne, uniteCourt,
} from "@/components/admin/devis/devisUtils";
import { telechargerDevisPdf, telechargerFacturePdf } from "@/components/admin/devis/devisPdf";
import { Facture, TYPES_FACTURE } from "@/components/admin/devis/factureUtils";
import ChoisirRendezVous from "@/components/rendez-vous/ChoisirRendezVous";
import { CalendarClock, CheckCircle2, Download, FileText, Loader2, MessageCircle, Receipt, Star } from "lucide-react";
import { photoUrl } from "@/lib/pdf";

type Etat = "chargement" | "introuvable" | "pret";

const aujourdhuiMaroc = () => new Date().toISOString().slice(0, 10);

/**
 * Page reçue par le client (lien secret envoyé par e-mail) : il consulte son devis,
 * le télécharge en PDF et le signe en ligne (« Bon pour accord »). Ensuite : montant de l'acompte et RIB.
 */
export default function MonDevis() {
  const { token = "" } = useParams();
  const [etat, setEtat] = useState<Etat>("chargement");
  const [devis, setDevis] = useState<DevisForm | null>(null);
  const [agence, setAgence] = useState<Parametres | null>(null);
  const [pdf, setPdf] = useState(false);
  const [factures, setFactures] = useState<Facture[]>([]);
  const [equipe, setEquipe] = useState<MembreEquipe[]>([]);
  const [avis, setAvis] = useState<{ note: number | null; google: string | null }>({ note: null, google: null });

  const charger = async () => {
    if (!/^[0-9a-f-]{36}$/i.test(token)) { setEtat("introuvable"); return; }
    const { data, error } = await (supabase as any).rpc("devis_public", { p_token: token });
    if (error || !data?.devis) { setEtat("introuvable"); return; }
    setDevis(devisDepuisBase(data.devis, data.lignes ?? []));
    setAgence(data.agence ?? null);
    setFactures((data.factures ?? []) as Facture[]);
    setEquipe((data.equipe ?? []) as MembreEquipe[]);
    setAvis({ note: data.devis.avis_note ?? null, google: data.avis_google ?? null });
    setEtat("pret");
  };
  useEffect(() => { charger(); }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const telecharger = async () => {
    if (!devis) return;
    setPdf(true);
    try { await telechargerDevisPdf(devis, agence); } finally { setPdf(false); }
  };

  if (etat === "chargement") {
    return <Cadre><div className="flex justify-center py-24 text-[#8C6D22]"><Loader2 className="h-6 w-6 animate-spin" /></div></Cadre>;
  }
  if (etat === "introuvable" || !devis) {
    return (
      <Cadre>
        <div className="max-w-lg mx-auto text-center py-16 space-y-4">
          <h1 className="font-serif text-3xl">Devis introuvable</h1>
          <p className="text-[#5E554A]">Ce lien n'est plus valable ou le devis a été retiré. Contactez-nous, nous vous renverrons votre proposition.</p>
          <Contact />
        </div>
      </Cadre>
    );
  }

  const devise = agence?.devise ?? "MAD";
  const t = calculerTotaux(devis.lignes, devis.remise_globale_pct, devis.taux_tva, devis.acompte_pct);
  const expire = !devis.signe_le && !!devis.date_validite && devis.date_validite < aujourdhuiMaroc();
  const refuse = devis.statut === "refuse";
  const cgv = devis.marque === "nawar" ? (agence?.cgv_nawar?.trim() || CGV_NAWAR_DEFAUT) : (agence?.cgv?.trim() || CGV_DEFAUT);
  const lignes = devis.lignes.filter((l) => l.designation.trim());

  return (
    <Cadre>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* En-tête */}
        <div className="text-center space-y-2">
          <p className="uppercase tracking-[0.25em] text-xs text-[#8C6D22]">{devis.marque === "nawar" ? "Nawar — bar à parfums" : "Heavent People Agency"}</p>
          <h1 className="font-serif text-3xl sm:text-4xl">Votre devis {devis.numero}</h1>
          <p className="text-[#5E554A]">Pour {devis.client_societe || devis.client_nom}{devis.titre ? ` · ${devis.titre}` : ""}</p>
          <div className="flex justify-center pt-1">
            {devis.signe_le ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF6EA] text-[#2F5A2A] border border-[#CFE3C5] px-3 py-1 text-sm" data-testid="statut-signe">
                <CheckCircle2 className="h-4 w-4" /> Accepté et signé le {dateHeureFr(devis.signe_le)}
              </span>
            ) : expire ? (
              <span className="rounded-full bg-[#FBEDEB] text-[#8A2E26] border border-[#EFC9C4] px-3 py-1 text-sm">Expiré le {dateFr(devis.date_validite)}</span>
            ) : refuse ? (
              <span className="rounded-full bg-[#FBEDEB] text-[#8A2E26] border border-[#EFC9C4] px-3 py-1 text-sm">Devis refusé</span>
            ) : (
              <span className="rounded-full bg-[#FFF7E6] text-[#5C4512] border border-[#F0D9A8] px-3 py-1 text-sm">
                En attente de votre accord{devis.date_validite ? ` · valable jusqu'au ${dateFr(devis.date_validite)}` : ""}
              </span>
            )}
          </div>
        </div>

        {/* Événement */}
        {(devis.date_evenement || devis.lieu || devis.nb_personnes) && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {devis.date_evenement && <Info titre="Date" valeur={`${dateFr(devis.date_evenement)}${devis.date_fin_evenement ? ` → ${dateFr(devis.date_fin_evenement)}` : ""}`} />}
            {devis.lieu && <Info titre="Lieu" valeur={devis.lieu} />}
            {devis.nb_personnes && <Info titre="Invités" valeur={devis.nb_personnes} />}
          </div>
        )}

        {/* Prestations */}
        <section className="rounded-3xl bg-white border border-[#EADFC8] shadow-[0_20px_60px_-40px_rgba(140,109,34,0.5)] overflow-hidden">
          <div className="px-5 sm:px-7 pt-5 pb-3 flex items-center justify-between gap-3">
            <h2 className="font-serif text-xl">Prestations</h2>
            <button onClick={telecharger} disabled={pdf} className="inline-flex items-center gap-1.5 rounded-full border border-[#DCCBA6] px-4 min-h-10 text-sm hover:bg-[#FAF7EE] disabled:opacity-60">
              {pdf ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />} {pdf ? "Création…" : "Télécharger le PDF"}
            </button>
          </div>
          <ul className="divide-y divide-[#F1ECDD]">
            {lignes.map((l, i) => (
              <li key={i} className="px-5 sm:px-7 py-3 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-medium text-[#141414]">{l.designation}</div>
                  {l.description && <div className="text-xs text-[#6B6155] whitespace-pre-line">{l.description}</div>}
                  <div className="text-xs text-[#8C6D22] mt-0.5">
                    {l.quantite} × {money(l.prix_unitaire, devise)}{l.unite !== "forfait" && l.duree !== 1 ? ` × ${l.duree} ${uniteCourt(l.unite)}` : l.unite !== "forfait" ? ` / ${uniteCourt(l.unite)}` : ""}
                    {l.remise_pct ? ` · remise ${l.remise_pct} %` : ""}
                  </div>
                </div>
                <div className="font-medium whitespace-nowrap">{money(totalLigne(l), devise)}</div>
              </li>
            ))}
          </ul>
          <div className="bg-[#FAF7EE] border-t border-[#EADFC8] px-5 sm:px-7 py-4 space-y-1.5 text-sm">
            <Ligne libelle="Total HT" valeur={money(t.ht, devise)} />
            {t.remise > 0 && <><Ligne libelle={`Remise ${devis.remise_globale_pct} %`} valeur={`- ${money(t.remise, devise)}`} /><Ligne libelle="Net HT" valeur={money(t.base, devise)} /></>}
            <Ligne libelle={`TVA ${devis.taux_tva} %`} valeur={money(t.tva, devise)} />
            <div className="flex justify-between items-baseline pt-2 border-t border-[#E3D6BA]">
              <span className="uppercase tracking-[0.15em] text-xs font-semibold text-[#8C6D22]">Total TTC</span>
              <span className="font-serif text-2xl" data-testid="total-ttc">{money(t.ttc, devise)}</span>
            </div>
            {devis.acompte_pct > 0 && <Ligne libelle={`Acompte ${devis.acompte_pct} % à la commande`} valeur={money(t.acompte, devise)} fort />}
          </div>
        </section>
        <p className="text-xs text-[#6B6155] text-center max-w-2xl mx-auto" data-testid="mention-montant">{MENTION_MONTANT_EVOLUTIF}</p>

        {devis.conditions && (
          <section className="rounded-2xl border border-[#EADFC8] bg-white px-5 sm:px-7 py-4">
            <h2 className="text-xs uppercase tracking-[0.2em] text-[#8C6D22] font-semibold mb-1">Conditions</h2>
            <p className="text-sm text-[#4A4238] whitespace-pre-line">{devis.conditions}</p>
          </section>
        )}
        <details className="rounded-2xl border border-[#EADFC8] bg-white px-5 sm:px-7 py-4 group">
          <summary className="cursor-pointer text-sm font-medium flex items-center gap-2"><FileText className="h-4 w-4 text-[#8C6D22]" /> Conditions générales de vente</summary>
          <div className="mt-3 max-h-80 overflow-y-auto text-xs text-[#4A4238] whitespace-pre-line leading-relaxed">{cgv}</div>
        </details>

        {/* Signature / confirmation */}
        {devis.signe_le ? (
          <Confirmation devis={devis} acompte={t.acompte} devise={devise} rib={agence?.rib ?? null} />
        ) : expire || refuse ? (
          <section className="rounded-3xl border border-[#EADFC8] bg-white p-6 text-center space-y-3">
            <p className="text-[#4A4238]">{expire ? "Ce devis a dépassé sa date de validité." : "Ce devis n'est plus valable."} Écrivez-nous et nous vous enverrons une proposition à jour.</p>
            <Contact />
          </section>
        ) : (
          <>
            {devis.rdv_demande_le && (
              <div className="rounded-2xl border border-[#F0D9A8] bg-[#FFF7E6] p-4 text-sm text-[#5C4512] flex gap-3" data-testid="rdv-envoye" role="status">
                <CalendarClock className="h-5 w-5 shrink-0" />
                <div>{devis.rdv_message?.startsWith("Rendez-vous réservé")
                  ? <>{devis.rdv_message.split("\n")[0]}. Une confirmation vous a été envoyée par e-mail. Vous pouvez aussi signer ce devis dès maintenant si vous le souhaitez.</>
                  : <>Votre demande de rendez-vous a bien été envoyée le {dateHeureFr(devis.rdv_demande_le)}. Nous vous contactons pour en fixer la date. Vous pouvez aussi signer ce devis dès maintenant si vous le souhaitez.</>}</div>
              </div>
            )}
            <Signature token={token} devis={devis} onSigne={charger} />
            {!devis.rdv_demande_le && <RendezVous token={token} devis={devis} onEnvoye={charger} />}
          </>
        )}

        {(equipe.length > 0 || avis.google) && devis.statut === "accepte" && (
          <AvisEvenement token={token} equipe={equipe} dejaNote={avis.note} lienGoogle={avis.google} onEnvoye={charger} />
        )}

        {factures.length > 0 && <MesFactures factures={factures} agence={agence} />}

        <div className="text-center text-sm text-[#6B6155] pb-6">
          Une question sur ce devis ? <Contact compact />
        </div>
      </div>
    </Cadre>
  );
}

interface MembreEquipe { id: string; prenom: string; initiale: string; photo: string | null; poste: string; note: number | null }

function Etoiles({ valeur, onChange, taille = 28, libelle }: { valeur: number; onChange: (n: number) => void; taille?: number; libelle: string }) {
  return (
    <div className="flex gap-1" role="radiogroup" aria-label={libelle}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button" role="radio" aria-checked={valeur === n} aria-label={`${n} étoile${n > 1 ? "s" : ""}`} onClick={() => onChange(n)} className="p-0.5" data-testid={`etoile-${n}`}>
          <Star style={{ width: taille, height: taille }} className={n <= valeur ? "fill-[#C8B560] text-[#C8B560]" : "text-[#DCCBA6]"} />
        </button>
      ))}
    </div>
  );
}

/** Après l'événement : le client note le service et chaque membre de l'équipe, puis peut laisser un avis Google. */
function AvisEvenement({ token, equipe, dejaNote, lienGoogle, onEnvoye }: { token: string; equipe: MembreEquipe[]; dejaNote: number | null; lienGoogle: string | null; onEnvoye: () => void }) {
  const [note, setNote] = useState(dejaNote ?? 0);
  const [commentaire, setCommentaire] = useState("");
  const [notes, setNotes] = useState<Record<string, number>>(Object.fromEntries(equipe.filter((m) => m.note).map((m) => [m.id, m.note!])));
  const [reprendre, setReprendre] = useState(false);
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState("");
  const [merci, setMerci] = useState<{ google: string | null } | null>(dejaNote ? { google: dejaNote >= 4 ? lienGoogle : null } : null);
  useEffect(() => {
    if (window.location.hash === "#avis") setTimeout(() => document.getElementById("avis")?.scrollIntoView({ behavior: "smooth" }), 300);
  }, []);
  const envoyer = async () => {
    setErreur("");
    if (!note) return setErreur("Choisissez une note pour l'événement.");
    setEnvoi(true);
    const { data, error } = await supabase.functions.invoke("evaluer-equipe", {
      body: { token, note, commentaire, reprendre, crews: Object.entries(notes).map(([id, n]) => ({ id, note: n })) },
    });
    let msg = data?.error as string | undefined;
    if (error && !msg) { try { msg = (await (error as any).context?.json())?.error; } catch { /* */ } }
    setEnvoi(false);
    if (error || data?.error) return setErreur(msg ?? "Votre avis n'a pas pu être envoyé. Réessayez.");
    setMerci({ google: data.avis_google ?? null });
  };
  return (
    <section id="avis" className="rounded-3xl border border-[#EADFC8] bg-white p-5 sm:p-7 space-y-5 scroll-mt-6" data-testid="avis-evenement">
      {merci ? (
        <div className="text-center space-y-3" data-testid="avis-merci">
          <h2 className="font-serif text-2xl">Merci pour votre avis !</h2>
          <p className="text-sm text-[#5E554A]">Il nous aide énormément, et il est transmis à toute l'équipe.</p>
          {merci.google && (
            <>
              <p className="text-sm text-[#5E554A]">Accepteriez-vous de le partager aussi sur Google ? Cela aide d'autres familles et entreprises à nous découvrir.</p>
              <a href={merci.google} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#C8B560] text-white px-6 min-h-11 font-medium" data-testid="avis-google">
                <Star className="h-4 w-4 fill-white" /> Laisser un avis sur Google
              </a>
            </>
          )}
        </div>
      ) : (
        <>
          <div>
            <h2 className="font-serif text-2xl">Comment s'est passé votre événement ?</h2>
            <p className="text-sm text-[#5E554A]">Votre avis compte pour nous, et pour l'équipe qui vous a accompagné(e).</p>
          </div>
          <div className="space-y-1"><div className="text-sm font-medium">Votre note globale</div><Etoiles valeur={note} onChange={setNote} libelle="Note globale" /></div>
          {equipe.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium">Votre équipe <span className="font-normal text-[#6B6155]">(facultatif)</span></div>
              <div className="grid gap-3 sm:grid-cols-2">
                {equipe.map((m) => (
                  <div key={m.id} className="flex items-center gap-3 rounded-2xl border border-[#F1ECDD] p-3" data-testid="membre-equipe">
                    {m.photo ? <img src={photoUrl(m.photo)!} alt="" className="h-14 w-14 rounded-full object-cover" /> : <div className="h-14 w-14 rounded-full bg-[#FAF7EE] flex items-center justify-center font-serif text-xl text-[#8C6D22]">{m.prenom.charAt(0)}</div>}
                    <div className="min-w-0">
                      <div className="font-medium">{m.prenom} {m.initiale}.</div>
                      <div className="text-xs text-[#6B6155] mb-1">{m.poste}</div>
                      <Etoiles taille={20} valeur={notes[m.id] ?? 0} onChange={(n) => setNotes((x) => ({ ...x, [m.id]: n }))} libelle={`Note de ${m.prenom}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div>
            <label htmlFor="avis-commentaire" className="text-sm font-medium">Un mot <span className="font-normal text-[#6B6155]">(facultatif)</span></label>
            <textarea id="avis-commentaire" rows={3} value={commentaire} onChange={(e) => setCommentaire(e.target.value)} className="mt-1 w-full rounded-xl border border-[#DCCBA6] bg-white px-3 py-2" />
          </div>
          {equipe.length > 0 && (
            <label className="flex items-start gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={reprendre} onChange={(e) => setReprendre(e.target.checked)} className="mt-1 h-4 w-4 accent-[#C8B560]" data-testid="reprendre-equipe" />
              Je souhaite retravailler avec la même équipe pour mon prochain événement.
            </label>
          )}
          {erreur && <p className="text-sm text-[#8A2E26]" role="alert">{erreur}</p>}
          <button onClick={envoyer} disabled={envoi} className="inline-flex items-center gap-2 rounded-full bg-[#141414] text-white px-6 min-h-11 font-medium disabled:opacity-60" data-testid="envoyer-avis">
            {envoi && <Loader2 className="h-4 w-4 animate-spin" />} Envoyer mon avis
          </button>
        </>
      )}
    </section>
  );
}

/** Factures du devis (acompte, solde), téléchargeables en PDF. */
function MesFactures({ factures, agence }: { factures: Facture[]; agence: Parametres | null }) {
  const [enCours, setEnCours] = useState<string | null>(null);
  useEffect(() => {
    if (window.location.hash === "#factures") setTimeout(() => document.getElementById("factures")?.scrollIntoView({ behavior: "smooth" }), 300);
  }, []);
  const telecharger = async (f: Facture) => {
    setEnCours(f.id);
    try { await telechargerFacturePdf(f, agence); } finally { setEnCours(null); }
  };
  return (
    <section id="factures" className="rounded-3xl border border-[#EADFC8] bg-white overflow-hidden scroll-mt-6" data-testid="mes-factures">
      <h2 className="font-serif text-xl px-5 sm:px-7 pt-5 pb-3 flex items-center gap-2"><Receipt className="h-5 w-5 text-[#8C6D22]" /> Vos factures</h2>
      <ul className="divide-y divide-[#F1ECDD]">
        {factures.map((f) => (
          <li key={f.id} className="px-5 sm:px-7 py-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="font-medium">{TYPES_FACTURE[f.type]} <span className="font-mono text-sm">{f.numero}</span></div>
              <div className="text-xs text-[#6B6155]">
                Émise le {dateFr(f.date_emission)} · {money(Number(f.net_a_payer), f.devise)}
                {" · "}{f.statut === "payee" ? <span className="text-[#2F5A2A] font-medium">réglée{f.payee_le ? ` le ${dateFr(f.payee_le)}` : ""} ✓</span> : <span className="text-[#8A5A12] font-medium">à régler</span>}
              </div>
            </div>
            <button onClick={() => telecharger(f)} disabled={enCours === f.id} data-testid="telecharger-facture"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#DCCBA6] px-4 min-h-10 text-sm hover:bg-[#FAF7EE] disabled:opacity-60">
              {enCours === f.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />} PDF
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Signature({ token, devis, onSigne }: { token: string; devis: DevisForm; onSigne: () => void }) {
  const zone = useRef<ZoneSignatureRef>(null);
  const [nom, setNom] = useState(devis.client_nom);
  const [lu, setLu] = useState(false);
  const [traits, setTraits] = useState(0);
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState("");

  const signer = async () => {
    setErreur("");
    if (nom.trim().length < 3) return setErreur("Écrivez votre nom complet.");
    if (traits < 15) return setErreur("Dessinez votre signature dans le cadre.");
    if (!lu) return setErreur("Cochez la case pour confirmer votre accord.");
    setEnvoi(true);
    const { data, error } = await supabase.functions.invoke("signer-devis", { body: { token, nom: nom.trim(), image: zone.current!.image(), accepte: true } });
    let message = data?.error as string | undefined;
    if (error && !message) { try { message = (await (error as any).context?.json())?.error; } catch { /* */ } }
    setEnvoi(false);
    if (error || data?.error) return setErreur(message ?? "La signature n'a pas pu être enregistrée. Réessayez dans un instant.");
    onSigne();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="rounded-3xl border-2 border-[#C8B560] bg-white p-5 sm:p-7 space-y-4" data-testid="bloc-signature">
      <div>
        <h2 className="font-serif text-2xl">Bon pour accord</h2>
        <p className="text-sm text-[#5E554A]">Signez en ligne pour confirmer votre réservation. Votre signature est apposée sur le devis et ses conditions générales. Si les services ou prestataires évoluent après notre rendez-vous, nous vous enverrons un devis ajusté.</p>
      </div>
      <div>
        <label htmlFor="nom-signataire" className="text-sm font-medium">Nom et prénom du signataire</label>
        <input id="nom-signataire" value={nom} onChange={(e) => setNom(e.target.value)} autoComplete="name"
          className="mt-1 w-full rounded-xl border border-[#DCCBA6] bg-white px-3 min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A74E]" />
      </div>
      <ZoneSignature ref={zone} onTraits={setTraits} consigne="Signez avec votre doigt ou la souris" />
      <label className="flex items-start gap-3 text-sm cursor-pointer">
        <input type="checkbox" checked={lu} onChange={(e) => setLu(e.target.checked)} className="mt-0.5 h-5 w-5 accent-[#C8B560]" data-testid="case-accord" />
        <span>J'ai lu le devis et les conditions générales de vente, et je donne mon <b>« Bon pour accord »</b>.</span>
      </label>
      {erreur && <p className="text-sm text-[#8A2E26]" role="alert">{erreur}</p>}
      <button onClick={signer} disabled={envoi} data-testid="signer-devis"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#141414] text-white px-8 min-h-12 font-medium hover:bg-black disabled:opacity-60">
        {envoi && <Loader2 className="h-4 w-4 animate-spin" />} {envoi ? "Signature…" : "Signer le devis"}
      </button>
      <p className="text-xs text-[#6B6155]">Signature électronique simple (loi 53-05) : la date, l'heure et l'appareil utilisé sont enregistrés comme preuve. Vous recevrez une confirmation par e-mail.</p>
    </section>
  );
}

/** Pas prêt à signer : le client garde son devis (PDF) ou demande d'abord un rendez-vous. */
function RendezVous({ token, devis, onEnvoye }: { token: string; devis: DevisForm; onEnvoye: () => void }) {
  const [ouvert, setOuvert] = useState(false);
  const [texteLibre, setTexteLibre] = useState(false);
  const [dispo, setDispo] = useState("");
  const [message, setMessage] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState("");
  const envoyer = async () => {
    setEnvoi(true); setErreur("");
    const { data, error } = await supabase.functions.invoke("signer-devis", { body: { token, action: "rdv", message, disponibilites: dispo } });
    let msg = data?.error as string | undefined;
    if (error && !msg) { try { msg = (await (error as any).context?.json())?.error; } catch { /* */ } }
    setEnvoi(false);
    if (error || data?.error) return setErreur(msg ?? "La demande n'a pas pu être envoyée. Réessayez ou écrivez-nous sur WhatsApp.");
    onEnvoye();
  };
  return (
    <section className="rounded-3xl border border-[#EADFC8] bg-white p-5 sm:p-7 space-y-3" data-testid="bloc-rdv">
      <h2 className="font-serif text-xl">Pas encore prêt(e) à signer ?</h2>
      <p className="text-sm text-[#5E554A]">Aucune obligation : vous pouvez simplement garder ce devis (bouton « Télécharger le PDF » plus haut), ou nous rencontrer d'abord pour affiner les services et les prestataires. Le devis sera ajusté si besoin.</p>
      {!ouvert ? (
        <button onClick={() => setOuvert(true)} data-testid="ouvrir-rdv"
          className="inline-flex items-center gap-2 rounded-full border border-[#DCCBA6] px-5 min-h-11 text-sm font-medium hover:bg-[#FAF7EE]">
          <CalendarClock className="h-4 w-4" /> Je préfère d'abord un rendez-vous
        </button>
      ) : !texteLibre ? (
        <div className="space-y-3">
          <ChoisirRendezVous source="devis" devisToken={token} nom={devis.client_nom} email={devis.client_email} telephone={devis.client_telephone} />
          <button onClick={() => setTexteLibre(true)} data-testid="rdv-texte-libre" className="text-sm text-[#8C6D22] underline underline-offset-4">
            Aucun créneau ne vous convient ? Indiquez-nous vos disponibilités
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <label htmlFor="rdv-dispo" className="text-sm font-medium">Vos disponibilités <span className="font-normal text-[#6B6155]">(facultatif)</span></label>
            <input id="rdv-dispo" value={dispo} onChange={(e) => setDispo(e.target.value)} placeholder="Ex. en semaine après 18 h, ou samedi matin"
              className="mt-1 w-full rounded-xl border border-[#DCCBA6] bg-white px-3 min-h-11" />
          </div>
          <div>
            <label htmlFor="rdv-message" className="text-sm font-medium">Un mot pour nous <span className="font-normal text-[#6B6155]">(facultatif)</span></label>
            <textarea id="rdv-message" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} className="mt-1 w-full rounded-xl border border-[#DCCBA6] bg-white px-3 py-2" />
          </div>
          {erreur && <p className="text-sm text-[#8A2E26]" role="alert">{erreur}</p>}
          <div className="flex flex-wrap gap-2">
            <button onClick={envoyer} disabled={envoi} data-testid="envoyer-rdv" className="inline-flex items-center gap-2 rounded-full bg-[#141414] text-white px-6 min-h-11 font-medium disabled:opacity-60">
              {envoi && <Loader2 className="h-4 w-4 animate-spin" />} Demander un rendez-vous
            </button>
            <button onClick={() => setOuvert(false)} className="rounded-full px-4 min-h-11 text-sm text-[#5E554A]">Annuler</button>
          </div>
        </div>
      )}
    </section>
  );
}

function Confirmation({ devis, acompte, devise, rib }: { devis: DevisForm; acompte: number; devise: string; rib: string | null }) {
  const [copie, setCopie] = useState(false);
  const copier = async () => { if (!rib) return; try { await navigator.clipboard.writeText(rib.replace(/\s/g, "")); setCopie(true); } catch { /* */ } };
  return (
    <section className="rounded-3xl border border-[#CFE3C5] bg-[#F5FAF2] p-5 sm:p-7 space-y-4" data-testid="confirmation-signature">
      <div className="flex items-start gap-3">
        <CheckCircle2 className="h-7 w-7 text-[#2F5A2A] shrink-0" />
        <div>
          <h2 className="font-serif text-2xl">Merci, votre réservation est confirmée</h2>
          <p className="text-sm text-[#4A4238]">Signé par {devis.signature_nom} le {dateHeureFr(devis.signe_le)}. Une confirmation vous a été envoyée par e-mail.</p>
        </div>
      </div>
      {acompte > 0 && (
        <div className="rounded-2xl bg-white border border-[#E3D6BA] p-4 space-y-2" data-testid="acompte">
          <div className="text-xs uppercase tracking-[0.2em] text-[#8C6D22] font-semibold">Acompte à régler</div>
          <div className="font-serif text-3xl">{money(acompte, devise)}</div>
          {rib ? (
            <div className="text-sm space-y-1">
              <div>Par virement bancaire sur le RIB :</div>
              <div className="flex flex-wrap items-center gap-2">
                <code className="rounded-lg bg-[#FAF7EE] border border-[#EADFC8] px-3 py-1.5 font-mono text-sm break-all">{rib}</code>
                <button onClick={copier} className="rounded-full border border-[#DCCBA6] px-3 min-h-9 text-sm">{copie ? "Copié ✓" : "Copier"}</button>
              </div>
              <div>Référence à indiquer : <b>{devis.numero}</b></div>
            </div>
          ) : (
            <p className="text-sm">Nous vous communiquons les coordonnées de paiement par e-mail.</p>
          )}
        </div>
      )}
    </section>
  );
}

function Cadre({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FBF8F1] text-[#2A2420]">
      <Seo noindex />
      <div className="container mx-auto px-4 py-10 sm:py-14">{children}</div>
    </div>
  );
}
const Info = ({ titre, valeur }: { titre: string; valeur: string }) => (
  <div className="rounded-2xl border border-[#EADFC8] bg-white px-4 py-3">
    <div className="text-[11px] uppercase tracking-[0.2em] text-[#8C6D22] font-semibold">{titre}</div>
    <div className="font-medium mt-0.5">{valeur}</div>
  </div>
);
const Ligne = ({ libelle, valeur, fort }: { libelle: string; valeur: string; fort?: boolean }) => (
  <div className={`flex justify-between gap-3 ${fort ? "text-[#8C6D22] font-semibold pt-1" : "text-[#4A4238]"}`}><span>{libelle}</span><span className="whitespace-nowrap">{valeur}</span></div>
);
function Contact({ compact = false }: { compact?: boolean }) {
  const lien = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent("Bonjour Heavent, j'ai une question sur mon devis.")}`;
  return compact ? (
    <a href={lien} target="_blank" rel="noopener noreferrer" className="text-[#8C6D22] underline">Écrivez-nous sur WhatsApp</a>
  ) : (
    <a href={lien} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-5 min-h-11 font-medium">
      <MessageCircle className="h-4 w-4" /> Nous écrire sur WhatsApp
    </a>
  );
}
