import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { evenementDe } from "@/lib/evenements";
import "@/styles/invitations-admin.css";
import { numeroWa as wa } from "@/lib/whatsapp";
import { ouvertureDe } from "@/lib/invitation";

const db = supabase as any;
interface Demande { id: string; cree_le: string; nom: string; telephone: string | null; email: string | null; occasion: string | null; noms: string | null; date_evenement: string | null; lieu: string | null; message: string | null; invitation: any; statut: string; apercu_id: string | null }

export function MiniCarte({ reglages, petite }: { reglages: any; petite?: boolean }) {
  const o = ouvertureDe(reglages?.ouverture ?? reglages?.modele);
  const src = o.poster || o.carte?.fin;
  if (!src) return null;
  return <img src={src} alt="" loading="lazy" className="ia-mini" style={petite ? { width: 28, height: 50 } : undefined} />;
}

/** Demandes reçues depuis la page publique /cartes : un clic transforme la demande en aperçu prêt à partager. */
export default function DemandesCartes({ onApercu, onChange, onVoir, complet, resume }: { onApercu: (id?: string) => void; onChange?: () => void; onVoir?: () => void; complet?: boolean; resume?: boolean }) {
  const [liste, setListe] = useState<Demande[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const charger = useCallback(async () => {
    const { data } = await db.from("demandes_cartes").select("*").order("cree_le", { ascending: false }).limit(50);
    setListe(data ?? []);
  }, []);
  useEffect(() => { charger(); }, [charger]);

  const creer = async (d: Demande) => {
    setBusy(d.id); setErr(null);
    const { noms: _n, message: _m, ...reglages } = d.invitation ?? {};
    const { data, error } = await db.from("invitations_apercu").insert({
      noms: d.noms || "", telephone: d.telephone || null, date_evenement: d.date_evenement, lieu: d.lieu, message: d.invitation?.message ?? null, invitation: reglages, prospect: d.nom,
    }).select().single();
    if (error) { setBusy(null); setErr("Création de l'aperçu impossible."); return; }
    await db.from("demandes_cartes").update({ apercu_id: data.id, statut: "apercu" }).eq("id", d.id);
    setBusy(null); await charger(); onChange?.(); onApercu(data.id);
  };
  const traiter = async (d: Demande) => { await db.from("demandes_cartes").update({ statut: d.statut === "traitee" ? (d.apercu_id ? "apercu" : "nouvelle") : "traitee" }).eq("id", d.id); await charger(); onChange?.(); };

  const aTraiter = liste.filter((d) => d.statut === "nouvelle");
  const enLettres = (v: string) => new Date(`${v.slice(0, 10)}T12:00:00`).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  if (resume) {
    if (aTraiter.length === 0) return null;
    return (
      <div className="ia-admin ia-bandeau" data-testid="demandes-cartes-resume">
        <p className="text-[15px] flex items-center"><span className="ia-chiffre">{aTraiter.length}</span>{aTraiter.length > 1 ? "demandes de cartes à traiter" : "demande de carte à traiter"}</p>
        <button type="button" onClick={onVoir} className="ia-btn ia-btn-or inline-flex items-center justify-center rounded-full text-sm font-medium" data-testid="demandes-cartes-voir">Voir les demandes</button>
      </div>
    );
  }
  if (liste.length === 0) return complet ? (
    <section className="ia-admin ia-carte ia-vide" data-testid="demandes-cartes-vide">
      <div className="ia-arche" aria-hidden="true" />
      <p className="ia-titre text-[22px]">Aucune demande pour le moment</p>
      <p className="text-sm text-[#5E554A] mt-1">Les commandes passées depuis la boutique /cartes arriveront ici, avec le numéro WhatsApp du client.</p>
    </section>
  ) : null;
  return (
    <section className="ia-admin ia-carte p-4 sm:p-5" data-testid="demandes-cartes">
      <div className="ia-section">
        <span className="ia-legende">Reçues depuis /cartes</span>
        <h3 className="text-2xl leading-tight mt-1">{aTraiter.length} à traiter <span className="text-sm text-[#5E554A]" style={{ fontFamily: "Jost, sans-serif" }}>· {liste.length} au total</span></h3>
      </div>
      {err && <p role="alert" className="text-sm text-[#9B2C2C] mt-2">{err}</p>}
      <ul className="divide-y divide-[#E3D6BA] ia-liste">
        {liste.map((d) => {
          const cree = new Date(d.cree_le);
          const traitee = d.statut === "traitee";
          const infos = [d.noms && `Carte ${d.noms}`, d.date_evenement && enLettres(d.date_evenement), d.lieu].filter(Boolean) as string[];
          return (
            <li key={d.id} className="ia-demande">
              <div className="ia-date"><b>{cree.getDate()}</b><small>{cree.toLocaleDateString("fr-FR", { month: "short", year: "numeric" }).replace(".", "")}</small></div>
              <div className="min-w-0 space-y-1.5 [overflow-wrap:anywhere]">
                <p className="ia-titre text-xl leading-tight flex flex-wrap items-center gap-x-2 gap-y-1">{d.nom}
                  <MiniCarte reglages={d.invitation} petite /><span className="ia-tag ia-tag-calme">{evenementDe(d.occasion === "mariage" ? undefined : (d.occasion as any)).nom}</span>
                  {d.statut === "nouvelle" ? <span className="ia-tag ia-tag-test">À traiter</span> : traitee ? <span className="ia-tag ia-tag-calme">Traitée</span> : <span className="ia-tag ia-tag-final">Aperçu créé</span>}
                </p>
                <p className="ia-meta">{infos.length ? infos.map((x, i) => <span key={i}>{i > 0 && <i>·</i>}{x}</span>) : "Informations de la carte non renseignées"}</p>
                <p className="text-sm">{d.telephone && <a className="ia-lien mr-3" href={`https://wa.me/${wa(d.telephone)}`} target="_blank" rel="noreferrer">WhatsApp {d.telephone}</a>}{d.email && <a className="ia-lien break-all" href={`mailto:${d.email}`}>{d.email}</a>}</p>
                {d.message && <p className="ia-meta whitespace-pre-line">Message du client : {d.message}</p>}
                <p className="ia-meta text-[13px]">Livraison : 1 semaine après le paiement.</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {!d.apercu_id && <button type="button" disabled={busy === d.id} onClick={() => creer(d)} className="ia-btn ia-btn-1 inline-flex items-center justify-center rounded-full text-sm font-medium disabled:opacity-60" data-testid={`demande-apercu-${d.id}`}>{busy === d.id ? "Création…" : "Créer l'aperçu"}</button>}
                  {d.apercu_id && <button type="button" onClick={() => onApercu(d.apercu_id!)} className="ia-btn ia-btn-1 inline-flex items-center justify-center rounded-full text-sm font-medium">Ouvrir l'aperçu</button>}
                  <button type="button" onClick={() => traiter(d)} className="ia-btn ia-btn-2 inline-flex items-center justify-center rounded-full text-sm font-medium">{traitee ? "Remettre à traiter" : "Terminée, rien à faire"}</button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
