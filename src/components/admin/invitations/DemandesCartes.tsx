import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { evenementDe } from "@/lib/evenements";

const db = supabase as any;
/** Numéro marocain saisi « 06… » ou « 6… » : on ajoute l'indicatif 212 pour que le lien WhatsApp fonctionne. */
const wa = (t: string) => { const n = t.replace(/[^\d]/g, ""); if (t.trim().startsWith("+") || n.startsWith("00")) return n.replace(/^00/, ""); if (n.startsWith("212")) return n; return "212" + n.replace(/^0/, ""); };
interface Demande { id: string; cree_le: string; nom: string; telephone: string | null; email: string | null; occasion: string | null; noms: string | null; date_evenement: string | null; lieu: string | null; message: string | null; invitation: any; statut: string; apercu_id: string | null }

/** Demandes reçues depuis la page publique /cartes : un clic transforme la demande en aperçu prêt à partager. */
export default function DemandesCartes({ onApercu }: { onApercu: () => void }) {
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
      noms: d.noms || d.nom, date_evenement: d.date_evenement, lieu: d.lieu, message: d.invitation?.message ?? null, invitation: reglages, prospect: d.nom,
    }).select().single();
    if (error) { setBusy(null); setErr("Création de l'aperçu impossible."); return; }
    await db.from("demandes_cartes").update({ apercu_id: data.id, statut: "apercu" }).eq("id", d.id);
    setBusy(null); await charger(); onApercu();
  };
  const traiter = async (d: Demande) => { await db.from("demandes_cartes").update({ statut: d.statut === "traitee" ? "nouvelle" : "traitee" }).eq("id", d.id); charger(); };

  const aTraiter = liste.filter((d) => d.statut !== "traitee");
  if (liste.length === 0) return null;
  return (
    <section className="rounded-2xl border border-[#DCCBA6] bg-white p-4 space-y-3" data-testid="demandes-cartes">
      <h3 className="font-serif text-lg">Demandes de cartes ({aTraiter.length} à traiter)</h3>
      {err && <p role="alert" className="text-sm text-[#9B2C2C]">{err}</p>}
      <ul className="divide-y divide-[#EADFC8]">
        {liste.map((d) => (
          <li key={d.id} className={`py-3 space-y-1 ${d.statut === "traitee" ? "opacity-60" : ""}`}>
            <p className="text-sm"><b>{d.nom}</b> · {evenementDe(d.occasion === "mariage" ? undefined : (d.occasion as any)).nom} · {new Date(d.cree_le).toLocaleDateString("fr-FR")}</p>
            <p className="text-sm text-[#5E554A]">{[d.noms && `Carte : ${d.noms}`, d.date_evenement, d.lieu].filter(Boolean).join(" · ") || "Informations de la carte non renseignées"}</p>
            <p className="text-sm">{d.telephone && <a className="underline mr-3" href={`https://wa.me/${wa(d.telephone)}`} target="_blank" rel="noreferrer">WhatsApp {d.telephone}</a>}{d.email && <a className="underline" href={`mailto:${d.email}`}>{d.email}</a>}</p>
            {d.message && <p className="text-sm text-[#5E554A] whitespace-pre-line">{d.message}</p>}
            <div className="flex flex-wrap gap-2 pt-1">
              {!d.apercu_id && <button type="button" disabled={busy === d.id} onClick={() => creer(d)} className="rounded-full bg-[#141414] text-white px-4 min-h-11 text-sm disabled:opacity-60" data-testid={`demande-apercu-${d.id}`}>{busy === d.id ? "Création…" : "Créer l'aperçu"}</button>}
              {d.apercu_id && <span className="text-sm text-[#8C6D22] self-center">Aperçu créé, retrouvez-le dans la liste</span>}
              <button type="button" onClick={() => traiter(d)} className="rounded-full border border-[#DCCBA6] px-4 min-h-11 text-sm">{d.statut === "traitee" ? "Remettre à traiter" : "Marquer traitée"}</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
