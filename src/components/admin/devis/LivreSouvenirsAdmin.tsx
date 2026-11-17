import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { BookOpen, Loader2 } from "lucide-react";
import { construireLivre } from "@/lib/livreSouvenirs";

interface Signalement { id: string; photo_id: string | null; source: string; motif: string; message: string | null; contact: string | null; invite_nom: string | null; cree_le: string }
const MOTIFS: Record<string, string> = { mineur: "Un mineur apparaît", retrait: "Suppression demandée", moi_sur_photo: "Un invité demande le retrait de sa photo", inapproprie: "Photo inappropriée", autre: "Autre" };
const btn = "inline-flex items-center justify-center border border-[#A8933F] px-4 min-h-11 text-xs uppercase tracking-[.12em] text-[#141414] transition hover:bg-[#141414] hover:text-[#E4D49A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50";
const lienContact = (c: string) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c) ? `mailto:${c}` : /^[+\d][\d\s().-]{5,}$/.test(c) ? `tel:${c.replace(/[^\d+]/g, "")}` : null);

/** Demandes de retrait de photos de CE mariage. Rien n'est supprimé sans décision ici ; les demandes concernant un mineur passent en premier. */
function SignalementsPhotos({ devisId, onChange }: { devisId: string; onChange: () => void }) {
  const [liste, setListe] = useState<Signalement[]>([]);
  const [note, setNote] = useState<Record<string, string>>({});
  const [occupe, setOccupe] = useState<string | null>(null);
  const [confirmer, setConfirmer] = useState<string | null>(null);
  const [apercu, setApercu] = useState<Record<string, string>>({});
  const [etatPhoto, setEtatPhoto] = useState<Record<string, { masquee: boolean; chemin: string }>>({});
  const [erreur, setErreur] = useState("");
  const charger = useCallback(async () => {
    const { data, error: errL } = await (supabase as any).from("souvenirs_signalements").select("id, photo_id, source, motif, message, contact, invite_nom, cree_le").eq("devis_id", devisId).eq("statut", "nouveau").order("cree_le");
    if (errL) { setErreur("Impossible de charger les demandes de retrait : " + errL.message); return; }
    const l = ((data ?? []) as Signalement[]).sort((a, b) => Number(b.motif === "mineur") - Number(a.motif === "mineur"));
    const ids = l.map((x) => x.photo_id).filter(Boolean) as string[];
    if (ids.length) {
      const { data: ph } = await (supabase as any).from("souvenirs_photos").select("id, chemin, masquee").in("id", ids);
      const chemins = (ph ?? []) as { id: string; chemin: string; masquee: boolean }[];
      setEtatPhoto(Object.fromEntries(chemins.map((c) => [c.id, { masquee: c.masquee, chemin: c.chemin }])));
      const { data: urls } = await supabase.storage.from("souvenirs").createSignedUrls(chemins.map((c) => c.chemin), 600);
      const m: Record<string, string> = {};
      chemins.forEach((c) => { const u = (urls ?? []).find((x: any) => x.path === c.chemin)?.signedUrl; if (u) m[c.id] = u; });
      setApercu(m);
    }
    setListe(l);
  }, [devisId]);
  useEffect(() => { void charger(); }, [charger]);
  const decider = async (id: string, decision: "conservee" | "masquee" | "supprimee") => {
    setOccupe(id); setErreur("");
    const s0 = liste.find((x) => x.id === id);
    const chemin = s0?.photo_id ? etatPhoto[s0.photo_id]?.chemin : undefined;
    // livre déjà préparé : la base l'efface avec la photo, on retient son fichier pour l'effacer aussi
    let cheminLivre: string | undefined;
    if (decision !== "conservee") {
      const { data: lv } = await (supabase as any).from("souvenirs_livres").select("chemin").eq("devis_id", devisId).maybeSingle();
      cheminLivre = lv?.chemin;
    }
    const { error } = await (supabase as any).rpc("souvenir_signalement_traiter", { p_id: id, p_decision: decision, p_note: note[id] ?? "" });
    setOccupe(null); setConfirmer(null);
    if (error) { setErreur("Décision non enregistrée : " + error.message); return; }
    // fichiers effacés tout de suite ; si le stockage refuse, la purge nocturne s'en charge et on le dit
    let reste = false;
    if (decision === "supprimee" && chemin) {
      const r = await supabase.storage.from("souvenirs").remove([chemin]);
      if (r.error) reste = true;
    }
    if (cheminLivre) {
      const r = await supabase.storage.from("livres-souvenirs").remove([cheminLivre]);
      if (r.error) reste = true;
    }
    if (reste) setErreur("Décision enregistrée. Un fichier n'a pas pu être effacé tout de suite : la purge automatique de nuit l'effacera.");
    await charger(); onChange();
  };
  if (!liste.length) return erreur ? <p className="text-xs text-[#B5483C]" role="alert">{erreur}</p> : null;
  const nbMineurs = liste.filter((s) => s.motif === "mineur").length;
  return (
    <div className="border border-[#EADFC8] border-t-2 border-t-[#A8933F] bg-[#FBF6E9] p-3 space-y-3" data-testid="signalements-photos" role="region" aria-label="Demandes de retrait de photos">
      <p className="font-titre text-xl"><span className="text-3xl text-[#8C6D22] align-middle mr-1">{liste.length}</span>demande{liste.length > 1 ? "s" : ""} de retrait à traiter{nbMineurs > 0 && <span className="block text-sm font-sans text-[#B5483C]">dont {nbMineurs} concernant un mineur : à traiter en priorité</span>}</p>
      {erreur && <p className="text-xs text-[#B5483C]" role="alert">{erreur}</p>}
      {liste.map((s) => {
        const mineur = s.motif === "mineur";
        const noteOk = (note[s.id] ?? "").trim().length >= 3;
        const href = s.contact ? lienContact(s.contact) : null;
        return (
          <div key={s.id} className={`bg-white border border-[#EADFC8] p-3 space-y-2 text-sm ${mineur ? "border-s-4 border-s-[#B5483C]" : ""}`}>
            <p className="font-medium">{mineur ? "Mineur · priorité — " : ""}{MOTIFS[s.motif] ?? s.motif} <span className="text-xs font-normal text-muted-foreground">· {s.source === "maries" ? "mariés" : `invité${s.invite_nom ? ` (${s.invite_nom})` : ""}`} · {new Date(s.cree_le).toLocaleDateString("fr-FR")}</span></p>
            <div className="sm:flex gap-3">
              {s.photo_id && (apercu[s.photo_id] ? <a href={apercu[s.photo_id]} target="_blank" rel="noopener noreferrer" className="shrink-0"><img src={apercu[s.photo_id]} alt="Photo signalée" className="h-32 w-32 object-cover ring-1 ring-[#EADFC8]" /></a> : <p className="text-xs text-muted-foreground">Photo concernée : aperçu indisponible.</p>)}
              <div className="space-y-1 min-w-0">
                {s.photo_id && etatPhoto[s.photo_id] && <p className="text-xs">{etatPhoto[s.photo_id].masquee ? "État : photo masquée du livre." : "État : photo visible dans le livre (les mariés ont pu la remettre)."}</p>}
                {s.message && <p className="text-xs whitespace-pre-line">{s.message}</p>}
                {s.contact && <p className="text-xs">Contact : {href ? <a href={href} className="underline">{s.contact}</a> : s.contact}</p>}
                {!s.photo_id && s.source === "invite" && <p className="text-xs text-muted-foreground">Demande d'un invité, sans photo précise. Règle : seuls les mariés décident du retrait. Transmettez-leur la demande (sans donner les coordonnées de l'invité sans son accord) : ils masquent ou demandent la suppression depuis leur espace. Marquez ensuite la demande traitée.</p>}
              </div>
            </div>
            <input value={note[s.id] ?? ""} onChange={(e) => setNote((n) => ({ ...n, [s.id]: e.target.value }))} placeholder={mineur || s.source === "maries" ? "Note interne (obligatoire pour ne pas donner suite)" : "Note interne (facultatif)"} aria-label="Note interne" className="h-11 w-full border border-[#DCCBA6] px-2 text-base" />
            <div className="flex flex-wrap items-center gap-2">
              {s.photo_id ? <button type="button" className={btn} disabled={occupe === s.id} onClick={() => void decider(s.id, "masquee")}>Masquer du livre</button> : null}
              <button type="button" className={btn} disabled={occupe === s.id || ((mineur || s.source === "maries") && !noteOk)} onClick={() => void decider(s.id, "conservee")}>{s.photo_id ? "Ne pas supprimer" : "Marquer traitée"}</button>
            </div>
            {s.photo_id && (
              <div className="border-t pt-2">
                {confirmer === s.id ? (
                  <div className="space-y-2" role="alert">
                    <p className="text-xs">Supprimer cette photo pour toujours ? Le livre déjà préparé sera retiré et devra être refait. Les mariés qui l'ont déjà téléchargé en gardent leur copie.</p>
                    <div className="flex flex-wrap gap-2">
                      <button type="button" className={`${btn} border-[#B5483C] text-[#B5483C]`} disabled={occupe === s.id} onClick={() => void decider(s.id, "supprimee")}>Oui, supprimer pour toujours</button>
                      <button type="button" className={btn} onClick={() => setConfirmer(null)}>Annuler</button>
                    </div>
                  </div>
                ) : <button type="button" className="min-h-11 text-xs uppercase tracking-[.12em] underline underline-offset-4 text-[#B5483C]" onClick={() => setConfirmer(s.id)}>Supprimer définitivement…</button>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

interface Livre { chemin: string; nb_photos: number; nb_invites: number; taille_mo: number | null; created_at: string }

/** Préparation du livre souvenir d'un mariage : livre HTML hors ligne + photos, en ZIP, mis à disposition des mariés. */
export default function LivreSouvenirsAdmin({ devisId, noms, date, lieu }: { devisId: string; noms: string; date: string; lieu: string }) {
  const [livre, setLivre] = useState<Livre | null | undefined>(undefined);
  const [nb, setNb] = useState<{ photos: number; invites: number; masquees: number; derniere: string | null } | null>(null);
  const [occupe, setOccupe] = useState(false);
  const [etape, setEtape] = useState("");
  const [erreur, setErreur] = useState("");
  const [limite, setLimite] = useState(400);
  const [saisie, setSaisie] = useState("");
  const [notif, setNotif] = useState("");

  const charger = useCallback(async () => {
    const [l, s, p, d] = await Promise.all([
      (supabase as any).from("souvenirs_livres").select("chemin, nb_photos, nb_invites, taille_mo, created_at").eq("devis_id", devisId).maybeSingle(),
      (supabase as any).from("souvenirs_invites").select("id", { count: "exact", head: true }).eq("devis_id", devisId),
      (supabase as any).from("souvenirs_photos").select("masquee, created_at").eq("devis_id", devisId),
      (supabase as any).from("devis").select("souvenirs_limite").eq("id", devisId).maybeSingle(),
    ]);
    if (d.data?.souvenirs_limite != null) setLimite(d.data.souvenirs_limite);
    setLivre(l.data ?? null);
    const ph = (p.data ?? []) as { masquee: boolean; created_at: string }[];
    setNb({ photos: ph.filter((x) => !x.masquee).length, invites: s.count ?? 0, masquees: ph.filter((x) => x.masquee).length, derniere: ph.map((x) => x.created_at).sort().pop() ?? null });
  }, [devisId]);
  useEffect(() => { void charger(); }, [charger]);

  const preparer = async () => {
    setOccupe(true); setErreur(""); setEtape("Lecture des souvenirs…");
    try {
      const { data: invs, error: e1 } = await (supabase as any).from("souvenirs_invites").select("id, nom, mot, created_at").eq("devis_id", devisId).order("created_at");
      const { data: phs, error: e2 } = await (supabase as any).from("souvenirs_photos").select("souvenir_id, chemin, masquee, created_at").eq("devis_id", devisId).eq("masquee", false).order("created_at");
      if (e1 || e2) throw new Error("lecture");
      const invites = [] as { nom: string; mot: string | null; photos: Blob[] }[];
      let k = 0; const total = (phs ?? []).length;
      for (const i of invs ?? []) {
        const photos: Blob[] = [];
        for (const p of (phs ?? []).filter((x: any) => x.souvenir_id === i.id)) {
          setEtape(`Téléchargement ${++k}/${total}…`);
          const { data, error } = await supabase.storage.from("souvenirs").download(p.chemin);
          if (error || !data) throw new Error("photo");
          photos.push(data);
        }
        invites.push({ nom: i.nom, mot: i.mot, photos });
      }
      if (total > 800) { setErreur("Trop de photos pour un seul livre (plus de 800). Contactez Yassin."); setOccupe(false); setEtape(""); return; }
      if (!invites.some((i) => i.photos.length || i.mot)) { setErreur("Aucun souvenir à mettre dans le livre pour l'instant."); setOccupe(false); setEtape(""); return; }
      const dateTexte = date ? new Date(date + "T00:00:00Z").toLocaleDateString("fr-FR", { timeZone: "UTC", day: "numeric", month: "long", year: "numeric" }) : "";
      const pret = await construireLivre({ noms, dateTexte, lieu: lieu || null, invites }, setEtape);
      if (pret.zip.size > 52428800) throw new Error("trop gros");
      setEtape("Envoi du livre…");
      const chemin = `${devisId}.zip`;
      const up = await supabase.storage.from("livres-souvenirs").upload(chemin, pret.zip, { upsert: true, contentType: "application/zip" });
      if (up.error) throw up.error;
      const { error: e3 } = await (supabase as any).from("souvenirs_livres").upsert({ devis_id: devisId, chemin, nb_photos: pret.nbPhotos, nb_invites: pret.nbInvites, taille_mo: pret.tailleMo, created_at: new Date().toISOString() });
      if (e3) throw e3;
      await charger();
    } catch (e: any) {
      setErreur(e?.message === "trop gros" ? "Le livre dépasse 50 Mo : retirez quelques photos (côté mariés) puis recommencez." : "La préparation du livre a échoué. Réessayez.");
    }
    setOccupe(false); setEtape("");
  };

  const [precedent, setPrecedent] = useState<number | null>(null);
  const changerLimite = async (v: number, annulation = false) => {
    setNotif(""); setErreur("");
    if (!Number.isFinite(v) || v < 0 || v > 5000) { setErreur("Entrez un nombre entre 0 et 5000."); return; }
    if (!Number.isInteger(v)) { setErreur("Entrez un nombre entier."); return; }
    if (!annulation && v === limite) { setErreur(`Le plafond est déjà de ${limite} photos.`); return; }
    if (v < nb!.photos + nb!.masquees) { setErreur(`Impossible : ${nb!.photos + nb!.masquees} photos sont déjà déposées. Choisissez un plafond au moins égal.`); return; }
    const avant = limite;
    const { error } = await (supabase as any).from("devis").update({ souvenirs_limite: Math.round(v) }).eq("id", devisId);
    if (error) { setErreur("Le plafond n'a pas pu être modifié."); return; }
    setLimite(Math.round(v)); setSaisie(""); setPrecedent(annulation ? null : avant);
    setNotif(annulation ? `Plafond remis à ${Math.round(v)} photos.` : Math.round(v) > nb!.photos + nb!.masquees ? `Plafond porté à ${Math.round(v)} photos : les invités peuvent de nouveau en ajouter.` : `Plafond fixé à ${Math.round(v)} photos : les envois restent bloqués.`);
  };

  const telecharger = async () => {
    if (!livre) return;
    const { data } = await supabase.storage.from("livres-souvenirs").createSignedUrl(livre.chemin, 600, { download: `livre-souvenir.zip` });
    if (data?.signedUrl) window.location.href = data.signedUrl; else setErreur("Le téléchargement n'a pas démarré. Réessayez.");
  };

  if (livre === undefined || !nb) return null;
  const total = nb.photos + nb.masquees;
  const vide = nb.photos === 0 && nb.invites === 0;
  const perime = !!livre && !!nb.derniere && nb.derniere > livre.created_at;
  const finPartage = date ? new Date(new Date(date + "T00:00:00Z").getTime() + 2 * 86400e3).toISOString().slice(0, 10) : null;
  const tropTot = !!finPartage && new Date().toLocaleDateString("en-CA", { timeZone: "Africa/Casablanca" }) <= finPartage;
  return (
    <div className="rounded-lg border p-3 space-y-2" data-testid="livre-souvenirs-admin">
      <div className="font-medium flex items-center gap-2"><BookOpen className="h-4 w-4 text-[#A8933F]" /> Livre souvenir</div>
      <p className="text-xs text-muted-foreground">{vide ? "Aucun souvenir déposé pour l'instant." : `${nb.invites} invité${nb.invites > 1 ? "s" : ""} · ${nb.photos} photo${nb.photos > 1 ? "s" : ""} dans le livre${nb.masquees ? ` (${nb.masquees} masquée${nb.masquees > 1 ? "s" : ""})` : ""}.`}</p>
      <div className="rounded-md bg-muted/40 p-2 space-y-2" data-testid="souvenirs-plafond">
        <p className="text-sm"><b className="text-xl font-titre">{total} / {limite}</b> photos déposées{total >= limite ? " : plafond atteint, les envois sont bloqués." : "."} Au-delà du plafond, les invités ne peuvent plus rien ajouter.</p>
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" size="sm" variant="outline" onClick={() => void changerLimite(limite + 100)} data-testid="plafond-plus100">+ 100 photos</Button>
          <input type="number" inputMode="numeric" min={0} max={5000} value={saisie} onChange={(e) => setSaisie(e.target.value)} placeholder="Autre plafond" aria-label="Nouveau plafond de photos" className="h-9 w-32 rounded-md border px-2 text-base" />
          <Button type="button" size="sm" variant="outline" disabled={saisie === ""} onClick={() => void changerLimite(Number(saisie))}>Appliquer</Button>
        </div>
        {notif && <p className="text-xs text-[#4E6B3A]" role="status">{notif}{precedent !== null && <> · <button type="button" className="underline" onClick={() => void changerLimite(precedent, true)}>Annuler (revenir à {precedent})</button></>}</p>}
      </div>
      {livre && <p className="text-xs">Livre prêt : {livre.nb_photos} photo{livre.nb_photos > 1 ? "s" : ""}, {livre.taille_mo ?? "?"} Mo, préparé le {new Date(livre.created_at).toLocaleDateString("fr-FR")}. Les mariés peuvent le télécharger depuis leur onglet Souvenirs.</p>}
      {perime && <p className="text-xs text-[#8C6D22]" role="status">Des photos ont été ajoutées depuis la préparation : refaites le livre.</p>}
      {tropTot && !vide && <p className="text-xs text-[#8C6D22]">Le partage est ouvert jusqu'au {new Date(finPartage + "T00:00:00Z").toLocaleDateString("fr-FR", { timeZone: "UTC", day: "numeric", month: "long" })} : préparez le livre après cette date pour ne rien oublier.</p>}
      {livre && <p className="text-xs text-muted-foreground">Si les mariés retirent une photo après la préparation, refaites le livre.</p>}
      <SignalementsPhotos devisId={devisId} onChange={() => void charger()} />
      {erreur && <p className="text-xs text-[#B5483C]" role="alert">{erreur}</p>}
      <div className="flex flex-wrap gap-2">
        <Button type="button" size="sm" disabled={occupe || vide} onClick={() => void preparer()} data-testid="preparer-livre">
          {occupe ? <><Loader2 className="h-4 w-4 animate-spin mr-1" /> {etape || "En cours…"}</> : livre ? "Refaire le livre" : "Préparer le livre"}
        </Button>
        {livre && <Button type="button" size="sm" variant="outline" disabled={occupe} onClick={() => void telecharger()}>Télécharger une copie</Button>}
      </div>
    </div>
  );
}
