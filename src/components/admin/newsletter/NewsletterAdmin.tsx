import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Download, Gift, Loader2, Mail, Plus, Send, Users } from "lucide-react";
import { GUIDES } from "@/data/guides";

/** Onglet Newsletter : abonnés (venus des guides gratuits), newsletters préparées, test et envoi. */
export interface Newsletter {
  id: string; sujet: string; contenu: string; themes: string[]; image_url: string | null; guide_slug: string | null;
  post_id: string | null; statut: "brouillon" | "envoyee"; envoyee_le: string | null; nb_destinataires: number | null; cree_le: string;
}
interface Abonne { id: string; email: string; prenom: string | null; themes: string[]; source: string | null; consentement: boolean; desinscrit_le: string | null; cree_le: string }

export const THEMES_NL: Record<string, string> = { mariage: "Mariage", naissance: "Naissance", fete: "Fêtes", entreprise: "Entreprise" };
const dateFr = (d: string | null) => (d ? new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }) : "");
const abonneActif = (a: Abonne) => a.consentement && !a.desinscrit_le;

async function invoquer(body: Record<string, unknown>) {
  const { data, error } = await supabase.functions.invoke("newsletter", { body });
  if (error) { let m = error.message; try { m = (await (error as any).context?.json())?.error ?? m; } catch { /* rien */ } throw new Error(m); }
  return data;
}

export default function NewsletterAdmin() {
  const [abonnes, setAbonnes] = useState<Abonne[] | null>(null);
  const [lettres, setLettres] = useState<Newsletter[]>([]);
  const [ouverte, setOuverte] = useState<Newsletter | "nouvelle" | null>(null);
  const [recherche, setRecherche] = useState("");

  const charger = useCallback(async () => {
    const [a, n] = await Promise.all([
      (supabase as any).from("abonnes_newsletter").select("id, email, prenom, themes, source, consentement, desinscrit_le, cree_le").order("cree_le", { ascending: false }),
      (supabase as any).from("newsletters").select("*").order("cree_le", { ascending: false }),
    ]);
    setAbonnes(a.data ?? []); setLettres(n.data ?? []);
  }, []);
  useEffect(() => { charger(); }, [charger]);

  const stats = useMemo(() => {
    const l = abonnes ?? [];
    const actifs = l.filter(abonneActif);
    return { total: l.length, actifs: actifs.length, parTheme: Object.keys(THEMES_NL).map((t) => [t, actifs.filter((a) => a.themes.includes(t)).length] as const) };
  }, [abonnes]);
  const filtres = (abonnes ?? []).filter((a) => !recherche || `${a.email} ${a.prenom ?? ""}`.toLowerCase().includes(recherche.toLowerCase()));

  const exporter = () => {
    const lignes = [["E-mail", "Prénom", "Thèmes", "Newsletter", "Source", "Inscrit le"], ...(abonnes ?? []).map((a) => [a.email, a.prenom ?? "", a.themes.map((t) => THEMES_NL[t] ?? t).join(" / "), abonneActif(a) ? "oui" : "non", a.source ?? "", dateFr(a.cree_le)])];
    const csv = "﻿" + lignes.map((l) => l.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(";")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a"); a.href = url; a.download = `abonnes-heavent-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
  };

  if (!abonnes) return <p className="text-sm text-muted-foreground py-8 text-center">Chargement…</p>;
  return (
    <div className="space-y-5" data-testid="newsletter-admin">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Tuile icone={Users} valeur={stats.actifs} libelle="abonnés à la newsletter" testId="nb-abonnes" />
        <Tuile icone={Gift} valeur={stats.total} libelle="guides téléchargés (personnes)" />
        {stats.parTheme.slice(0, 2).map(([t, n]) => <Tuile key={t} icone={Mail} valeur={n} libelle={`intéressés · ${THEMES_NL[t]}`} />)}
      </div>

      <section className="rounded-2xl border border-[#EADFC8] bg-white p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-medium">Newsletters</h3>
          <button onClick={() => setOuverte("nouvelle")} className="inline-flex items-center gap-1.5 rounded-full bg-[#141414] text-white px-4 h-9 text-sm" data-testid="nouvelle-newsletter"><Plus className="h-4 w-4" /> Nouvelle newsletter</button>
        </div>
        {lettres.length === 0 ? <p className="text-sm text-muted-foreground">Aucune newsletter pour l'instant. Astuce : depuis un post Instagram, « Créer la newsletter » la prépare pour toi.</p> : (
          <ul className="divide-y divide-[#F1ECDD]">
            {lettres.map((n) => (
              <li key={n.id}>
                <button onClick={() => setOuverte(n)} className="w-full text-left py-2.5 flex flex-wrap items-center justify-between gap-2 hover:bg-[#FBF8F1] px-2 rounded-lg" data-testid="ligne-newsletter">
                  <span className="font-medium text-sm">{n.sujet}</span>
                  <span className="text-xs text-muted-foreground">
                    {n.themes.length ? n.themes.map((t) => THEMES_NL[t]).join(", ") : "Tous les abonnés"} · {n.statut === "envoyee" ? `envoyée le ${dateFr(n.envoyee_le)} à ${n.nb_destinataires}` : "brouillon"}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-2xl border border-[#EADFC8] bg-white p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-medium">Abonnés ({stats.total})</h3>
          <div className="flex gap-2">
            <input value={recherche} onChange={(e) => setRecherche(e.target.value)} placeholder="Rechercher…" className="rounded-md border px-3 h-9 text-sm w-44" />
            <button onClick={exporter} disabled={!abonnes.length} className="inline-flex items-center gap-1.5 rounded-md border px-3 h-9 text-sm disabled:opacity-50"><Download className="h-4 w-4" /> Excel</button>
          </div>
        </div>
        {filtres.length === 0 ? <p className="text-sm text-muted-foreground">Les personnes qui téléchargent un guide gratuit apparaîtront ici.</p> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left text-xs text-muted-foreground"><th className="py-1.5 pr-3">E-mail</th><th className="pr-3">Prénom</th><th className="pr-3">Intérêts</th><th className="pr-3">Newsletter</th><th>Inscrit le</th></tr></thead>
              <tbody>
                {filtres.slice(0, 200).map((a) => (
                  <tr key={a.id} className="border-t border-[#F1ECDD]" data-testid="ligne-abonne">
                    <td className="py-1.5 pr-3">{a.email}</td><td className="pr-3">{a.prenom}</td>
                    <td className="pr-3">{a.themes.map((t) => THEMES_NL[t] ?? t).join(", ")}</td>
                    <td className="pr-3">{abonneActif(a) ? <span className="text-emerald-700">oui</span> : <span className="text-muted-foreground">{a.desinscrit_le ? "désinscrit" : "non"}</span>}</td>
                    <td>{dateFr(a.cree_le)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="text-[11px] text-muted-foreground">Seules les personnes qui ont coché « recevoir la newsletter » reçoivent les envois. Chaque e-mail contient un lien de désinscription.</p>
      </section>

      {ouverte && <EditeurNewsletter initiale={ouverte === "nouvelle" ? null : ouverte} abonnes={abonnes} onFermer={() => { setOuverte(null); charger(); }} />}
    </div>
  );
}

function Tuile({ icone: Icone, valeur, libelle, testId }: { icone: typeof Users; valeur: number; libelle: string; testId?: string }) {
  return (
    <div className="rounded-2xl border border-[#EADFC8] bg-white px-4 py-3">
      <Icone className="h-4 w-4 text-[#A8933F] mb-1" />
      <div className="font-serif text-2xl leading-none" data-testid={testId}>{valeur}</div>
      <div className="text-xs text-muted-foreground mt-1">{libelle}</div>
    </div>
  );
}

function EditeurNewsletter({ initiale, abonnes, onFermer }: { initiale: Newsletter | null; abonnes: Abonne[]; onFermer: () => void }) {
  const { toast } = useToast();
  const [n, setN] = useState<Partial<Newsletter>>(initiale ?? { sujet: "", contenu: "", themes: [], image_url: null, guide_slug: GUIDES[0].slug, statut: "brouillon" });
  const [occupe, setOccupe] = useState<string | null>(null);
  const [confirmer, setConfirmer] = useState(false);
  const envoyee = n.statut === "envoyee";
  const set = <K extends keyof Newsletter>(k: K, v: Newsletter[K]) => setN((x) => ({ ...x, [k]: v }));
  const destinataires = abonnes.filter((a) => abonneActif(a) && (!(n.themes ?? []).length || a.themes.some((t) => n.themes!.includes(t)))).length;

  const enregistrer = async (): Promise<string | null> => {
    if (!n.sujet?.trim() || !n.contenu?.trim()) { toast({ title: "Ajoute un sujet et un texte", variant: "destructive" }); return null; }
    const donnees = { sujet: n.sujet.trim(), contenu: n.contenu, themes: n.themes ?? [], image_url: n.image_url || null, guide_slug: n.guide_slug || null, post_id: n.post_id ?? null };
    const r = n.id ? await (supabase as any).from("newsletters").update(donnees).eq("id", n.id).select().single()
      : await (supabase as any).from("newsletters").insert(donnees).select().single();
    if (r.error) { toast({ title: "Erreur", description: r.error.message, variant: "destructive" }); return null; }
    setN(r.data); return r.data.id;
  };
  const tester = async () => {
    setOccupe("tester");
    try { const id = await enregistrer(); if (id) { const d = await invoquer({ action: "tester", newsletter_id: id }); toast({ title: "Test envoyé ✓", description: `Regarde ta boîte : ${d.a}` }); } }
    catch (e: any) { toast({ title: "Test impossible", description: e.message, variant: "destructive" }); }
    setOccupe(null);
  };
  const envoyer = async () => {
    setOccupe("envoyer"); setConfirmer(false);
    try {
      const id = await enregistrer(); if (!id) return;
      const d = await invoquer({ action: "envoyer", newsletter_id: id });
      toast({ title: d.erreurs?.length ? `Envoyée à ${d.envoyes} sur ${d.total} (erreurs : ${d.erreurs.join(", ")})` : `Newsletter envoyée à ${d.envoyes} abonné${d.envoyes > 1 ? "s" : ""} 🎉` });
      onFermer();
    } catch (e: any) { toast({ title: "Envoi impossible", description: e.message, variant: "destructive" }); }
    setOccupe(null);
  };

  return (
    <Dialog open onOpenChange={(o) => !o && onFermer()}>
      <DialogContent className="max-w-3xl max-h-[94vh] overflow-y-auto" data-testid="editeur-newsletter">
        <DialogTitle className="font-serif text-2xl">{envoyee ? "Newsletter envoyée" : n.id ? "Modifier la newsletter" : "Nouvelle newsletter"}</DialogTitle>
        <fieldset disabled={envoyee} className="space-y-3">
          <label className="text-sm space-y-1 block"><span className="text-muted-foreground">Sujet de l'e-mail</span>
            <input value={n.sujet ?? ""} onChange={(e) => set("sujet", e.target.value)} className="w-full rounded-md border px-3 h-10" data-testid="nl-sujet" /></label>
          <label className="text-sm space-y-1 block"><span className="text-muted-foreground">Texte (une ligne vide = nouveau paragraphe)</span>
            <textarea value={n.contenu ?? ""} onChange={(e) => set("contenu", e.target.value)} rows={10} className="w-full rounded-md border p-3 text-sm leading-relaxed" data-testid="nl-contenu" /></label>
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="text-sm space-y-1 block"><span className="text-muted-foreground">Guide gratuit mis en avant (bouton)</span>
              <select value={n.guide_slug ?? ""} onChange={(e) => set("guide_slug", e.target.value || null)} className="w-full rounded-md border px-3 h-10 bg-white">
                <option value="">Aucun (bouton « Découvrir Heavent »)</option>
                {GUIDES.map((g) => <option key={g.slug} value={g.slug}>{g.titre}</option>)}
              </select></label>
            <label className="text-sm space-y-1 block"><span className="text-muted-foreground">Image en haut (lien, facultatif)</span>
              <input value={n.image_url ?? ""} onChange={(e) => set("image_url", e.target.value || null)} placeholder="https://…" className="w-full rounded-md border px-3 h-10" /></label>
          </div>
          <div className="text-sm space-y-1.5">
            <span className="text-muted-foreground">À qui ?</span>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => set("themes", [])} className={`rounded-full px-3 h-8 border text-sm ${!(n.themes ?? []).length ? "bg-[#141414] text-white border-[#141414]" : "bg-white"}`}>Tous</button>
              {Object.entries(THEMES_NL).map(([t, l]) => {
                const actif = (n.themes ?? []).includes(t);
                return <button type="button" key={t} onClick={() => set("themes", actif ? n.themes!.filter((x) => x !== t) : [...(n.themes ?? []), t])} className={`rounded-full px-3 h-8 border text-sm ${actif ? "bg-[#141414] text-white border-[#141414]" : "bg-white"}`}>{l}</button>;
              })}
            </div>
            <p className="text-xs text-muted-foreground" data-testid="nb-destinataires">{envoyee ? `Envoyée à ${n.nb_destinataires} abonné(s) le ${dateFr(n.envoyee_le ?? null)}` : `${destinataires} abonné${destinataires > 1 ? "s" : ""} recevront cette newsletter`}</p>
          </div>
        </fieldset>
        {n.image_url && <img src={n.image_url} alt="" className="rounded-xl max-h-56 object-cover w-full" />}
        {!envoyee && (
          <div className="flex flex-wrap gap-2 pt-2">
            <button onClick={async () => { setOccupe("enregistrer"); if (await enregistrer()) toast({ title: "Brouillon enregistré ✓" }); setOccupe(null); }} disabled={!!occupe} className="rounded-full border px-4 h-10 text-sm">Enregistrer</button>
            <button onClick={tester} disabled={!!occupe} className="inline-flex items-center gap-1.5 rounded-full border px-4 h-10 text-sm" data-testid="nl-tester">{occupe === "tester" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />} M'envoyer un test</button>
            {!confirmer ? (
              <button onClick={() => setConfirmer(true)} disabled={!!occupe || !destinataires} className="inline-flex items-center gap-1.5 rounded-full bg-[#141414] text-white px-5 h-10 text-sm disabled:opacity-50" data-testid="nl-envoyer">
                <Send className="h-4 w-4" /> Envoyer à {destinataires}
              </button>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-3 h-10 text-sm">
                Envoyer maintenant à {destinataires} personne{destinataires > 1 ? "s" : ""} ?
                <button onClick={envoyer} className="rounded-full bg-[#141414] text-white px-3 h-7" data-testid="nl-confirmer">{occupe === "envoyer" ? "Envoi…" : "Oui, envoyer"}</button>
                <button onClick={() => setConfirmer(false)} className="underline">Annuler</button>
              </span>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
