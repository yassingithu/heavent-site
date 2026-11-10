import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CalendarPlus, Check, Copy, Download, ExternalLink, ImagePlus, Instagram, KeyRound, Loader2, Search, Sparkles, Trash2, Wand2 } from "lucide-react";
import { composerVisuel, enJpeg } from "./visuel";
import { guidePourTheme } from "@/data/guides";
import CommentezGuide from "./CommentezGuide";
import AjouterPost from "./AjouterPost";
import "@/styles/admin-seuil.css";
import { genererMois, type Compte } from "@/data/instagramIdees";

/** Onglet Instagram : posts conseils préparés (photo Pixabay + texte Heavent), à télécharger ou publier. */
interface Post {
  id: string; date_prevue: string | null; theme: string; accroche: string | null; titre: string; legende: string; recherche: string;
  style: "sombre" | "clair"; photo_url: string | null; photo_page: string | null; photo_auteur: string | null; visuel_url: string | null;
  statut: "brouillon" | "pret" | "publie" | "erreur"; publie_le: string | null; erreur?: string | null; compte?: Compte;
}
interface Photo { id: number; apercu: string; grande: string; page: string; auteur: string; largeur: number; hauteur: number }

const THEMES: Record<string, string> = { mariage: "Mariage", naissance: "Naissance", fete: "Fêtes", entreprise: "Entreprise", parfum: "Parfum" };
const COMPTES: Record<Compte, string> = { heavent: "Heavent", nawar: "Nawar — bar à parfums" };
const STATUTS: Record<Post["statut"], [string, string]> = {
  brouillon: ["À préparer", "bg-[#F1ECDD] text-[#7A5F1E]"], pret: ["Prêt", "bg-[#1F5A4C]/10 text-[#1F5A4C]"],
  publie: ["Publié", "bg-[#141414] text-white"], erreur: ["Erreur", "bg-[#9C4A2C]/10 text-[#9C4A2C]"],
};
/** Pas encore publié alors que son heure est passée de plus de 2 h (au-delà, la publication automatique ne l'envoie plus) */
const estEnRetard = (p: { statut: string; date_prevue: string | null }) => p.statut !== "publie" && !!p.date_prevue && new Date(p.date_prevue).getTime() < Date.now() - 2 * 3600e3;
const quand = (d: string | null) => d ? new Date(d).toLocaleString("fr-FR", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "Sans date";

async function fonction(body: Record<string, unknown>) {
  const { data, error } = await supabase.functions.invoke("instagram-photos", { body });
  if (error) {
    let message = error.message;
    try { message = (await (error as any).context?.json())?.error ?? message; } catch { /* rien */ }
    throw new Error(message);
  }
  return data;
}

/** Monte le visuel et l'enregistre dans le stockage */
async function enregistrerVisuel(post: Post, photoUrl: string) {
  const canvas = document.createElement("canvas");
  await composerVisuel(canvas, photoUrl, post);
  const blob = await enJpeg(canvas);
  const chemin = `instagram/visuels/${post.id}.jpg`;
  const { error } = await supabase.storage.from("assets").upload(chemin, blob, { upsert: true, contentType: "image/jpeg" });
  if (error) throw error;
  const url = `${supabase.storage.from("assets").getPublicUrl(chemin).data.publicUrl}?v=${Date.now()}`;
  await (supabase as any).from("posts_instagram").update({ visuel_url: url, statut: "pret" }).eq("id", post.id);
  return url;
}

export default function InstagramAdmin({ famille = false }: { famille?: boolean }) {
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [reglages, setReglages] = useState<{ pixabay: boolean; instagram: boolean; instagram_nom?: string | null; secret_app?: boolean; webhook_jeton?: string | null; abonne_le?: string | null } | null>(null);
  const [jeton, setJeton] = useState("");
  const [appId, setAppId] = useState("");
  const [secretApp, setSecretApp] = useState("");
  const methodeFacebook = jeton.trim().startsWith("EA");
  const [changerJeton, setChangerJeton] = useState(false);
  const [connexion, setConnexion] = useState(false);
  const [cle, setCle] = useState("");
  const [ouvert, setOuvert] = useState<Post | null>(null);
  const [auto, setAuto] = useState<{ fait: number; total: number } | null>(null);
  const [compte, setCompte] = useState<Compte>(famille ? "nawar" : "heavent");
  const [replanif, setReplanif] = useState(false);
  const [generation, setGeneration] = useState(false);
  const [ajout, setAjout] = useState(false);

  const charger = useCallback(async () => {
    const [{ data }, r] = await Promise.all([
      (supabase as any).from("posts_instagram").select("*").eq("compte", compte).order("date_prevue", { ascending: true, nullsFirst: false }),
      (supabase as any).rpc("instagram_reglages_compte", { p_compte: compte }),
    ]);
    setPosts((data ?? []) as Post[]);
    setReglages(r.data ?? { pixabay: false, instagram: false });
  }, [compte]);
  useEffect(() => { charger(); }, [charger]);

  const enregistrerCle = async () => {
    const { error } = await (supabase as any).rpc("instagram_enregistrer_cle", { p_nom: "pixabay", p_valeur: cle });
    if (error) return toast({ title: "Clé non enregistrée", description: error.message, variant: "destructive" });
    try { await fonction({ action: "chercher", recherche: "wedding cake" }); }
    catch (e: any) { return toast({ title: "Clé enregistrée, mais Pixabay la refuse", description: e.message, variant: "destructive" }); }
    setCle(""); toast({ title: "Clé Pixabay enregistrée ✓", description: "Elle reste cachée : personne ne peut la relire depuis le site." }); charger();
  };

  const connecterInstagram = async () => {
    setConnexion(true);
    try {
      const { data, error } = await supabase.functions.invoke("instagram-publier", { body: { action: "connecter", jeton, app_id: appId, secret: secretApp, compte } });
      if (error) { let m = error.message; try { m = (await (error as any).context?.json())?.error ?? m; } catch { /* rien */ } throw new Error(m); }
      setJeton(""); setSecretApp(""); setChangerJeton(false); toast({ title: `Instagram connecté ✓`, description: `Compte @${data.nom} : les posts prêts partiront tout seuls à leur date.` }); charger();
    } catch (e: any) { toast({ title: "Connexion impossible", description: e.message, variant: "destructive" }); }
    setConnexion(false);
  };

  /** Un mois de publications, 2 par jour, d'un coup (textes prêts ; les visuels se préparent ensuite) */
  const genererUnMois = async () => {
    if (!confirm(`Créer 60 posts pour ${COMPTES[compte]} (2 par jour pendant 30 jours, après le dernier post prévu) ?`)) return;
    setGeneration(true);
    const nouveaux = genererMois(compte, posts ?? []);
    const { error } = await (supabase as any).from("posts_instagram").insert(nouveaux);
    setGeneration(false);
    if (error) return toast({ title: "Génération impossible", description: error.message, variant: "destructive" });
    const fin = new Date(nouveaux[nouveaux.length - 1].date_prevue).toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
    toast({ title: `${nouveaux.length} posts créés ✨`, description: `Jusqu'au ${fin}. Clique sur « Préparer les visuels » pour les photos.` });
    charger();
  };

  const preparerTout = async () => {
    const aFaire = (posts ?? []).filter((p) => p.statut !== "publie" && !p.visuel_url);
    setAuto({ fait: 0, total: aFaire.length });
    let erreurs = 0;
    // Jamais deux fois la même photo : identifiants déjà pris par TOUS les posts (Heavent et Nawar, publiés ou non, même supprimés)
    const utilisees = new Set<string>(((await fonction({ action: "utilisees" })).ids ?? []).map(String));
    const cache = new Map<string, Photo[]>();
    for (const p of aFaire) {
      try {
        let photo = p.photo_url;
        if (!photo) {
          let choix: Photo | undefined;
          // Pas de photo libre sur la 1re page de résultats : on cherche sur les suivantes, jamais de doublon
          for (let page = 1; page <= 5 && !choix; page++) {
            const cle = `${p.recherche}|${page}`;
            if (!cache.has(cle)) cache.set(cle, (await fonction({ action: "chercher", recherche: p.recherche, page })).photos as Photo[]);
            const libres = cache.get(cle)!.filter((x) => !utilisees.has(String(x.id)));
            choix = libres.find((x) => x.hauteur >= x.largeur * 0.9) ?? libres[0];
            if (!cache.get(cle)!.length) break;
          }
          if (!choix) throw new Error("aucune photo libre");
          utilisees.add(String(choix.id));
          photo = (await fonction({ action: "choisir", post_id: p.id, photo: choix })).photo_url;
        }
        await enregistrerVisuel(p, photo!);
      } catch { erreurs++; }
      setAuto((a) => a && { ...a, fait: a.fait + 1 });
    }
    setAuto(null); await charger();
    toast({ title: erreurs ? `Visuels préparés (${erreurs} à revoir)` : "Tous les visuels sont prêts ✨" });
  };

  if (!posts || !reglages) return <p className="text-sm text-muted-foreground py-8 text-center">Chargement…</p>;
  const manquants = posts.filter((p) => p.statut !== "publie" && !p.visuel_url).length;
  const enRetard = posts.filter(estEnRetard);

  /** Les posts en retard prennent les prochains créneaux libres (11h30 / 20h30, heure du Maroc) */
  const replanifier = async () => {
    setReplanif(true);
    const pris = new Set(posts.filter((p) => p.statut !== "publie" && p.date_prevue && !estEnRetard(p)).map((p) => new Date(p.date_prevue!).toISOString()));
    const d = new Date(Date.now() + 30 * 60000); let erreur = null;
    for (const p of [...enRetard].sort((a, b) => a.date_prevue!.localeCompare(b.date_prevue!))) {
      let creneau: string;
      do {
        const h = d.getUTCHours() * 60 + d.getUTCMinutes();
        if (h < 10 * 60 + 30) d.setUTCHours(10, 30, 0, 0);
        else if (h < 19 * 60 + 30) d.setUTCHours(19, 30, 0, 0);
        else { d.setUTCDate(d.getUTCDate() + 1); d.setUTCHours(10, 30, 0, 0); }
        creneau = d.toISOString(); d.setUTCMinutes(d.getUTCMinutes() + 1);
      } while (pris.has(creneau));
      pris.add(creneau);
      const { error } = await (supabase as any).from("posts_instagram").update({ date_prevue: creneau }).eq("id", p.id);
      if (error) { erreur = error; break; }
    }
    setReplanif(false);
    if (erreur) toast({ title: "Replanification impossible", description: erreur.message, variant: "destructive" });
    else toast({ title: `${enRetard.length} publication${enRetard.length > 1 ? "s" : ""} replanifiée${enRetard.length > 1 ? "s" : ""} ✓`, description: "Elles prennent les prochains créneaux libres." });
    charger();
  };

  // Prochaine publication : le premier post non publié dont l'heure n'est pas passée
  const prochain = posts.find((p) => p.statut !== "publie" && !!p.date_prevue && new Date(p.date_prevue).getTime() >= Date.now());
  const etiquette = (p: Post) => estEnRetard(p) ? null : <span className={`ig-etiq ${p.statut}`}>{STATUTS[p.statut][0]}</span>;

  return (
    <div className={`ig space-y-5 ${famille ? "ig-famille" : ""}`} data-testid="instagram-admin">
      {/* En-tête noir + bascule de compte à biseau (la famille ne voit que Nawar) */}
      {!famille && <div className="ig-tete">
        <div><small>Compte publié</small><h2>{compte === "nawar" ? "Nawar" : "Heavent"}</h2></div>
        <div className="ig-comptes" data-compte={compte} role="group" aria-label="Compte Instagram" data-testid="choix-compte">
          <span className="biseau" aria-hidden="true" />
          {(Object.keys(COMPTES) as Compte[]).map((c) => (
            <button key={c} aria-pressed={compte === c} onClick={() => { if (c !== compte) { setCompte(c); setPosts(null); } }} data-testid={`compte-${c}`} title={COMPTES[c]}>
              {c === "nawar" && <img src="/marque-nawar.png" alt="" />}{c === "nawar" ? "Nawar" : "Heavent"}
            </button>
          ))}
        </div>
      </div>}

      {/* Prochaine publication, en tête */}
      {prochain && (
        <section className="ig-prochain" aria-labelledby="ig-t-prochain" data-testid="prochaine-publication">
          <div className="ig-vis">
            {prochain.visuel_url || prochain.photo_url ? <img src={prochain.visuel_url ?? prochain.photo_url!} alt="" />
              : <div className="ig-couv">{prochain.titre}</div>}
          </div>
          <div className="ig-quand">
            <h2 className="a-surtitre" id="ig-t-prochain">Prochaine</h2>
            {(() => { const d = new Date(prochain.date_prevue!); return (
              <div className="ig-date">
                <span className="j">{d.getDate()}</span>
                <span className="m">{d.toLocaleDateString("fr-FR", { weekday: "long" })}<br />{d.toLocaleDateString("fr-FR", { month: "long" })} · {d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            ); })()}
            <h3>{prochain.titre}</h3>
          </div>
          <div className="ig-etat">
            <span className={`a-st ${prochain.statut === "pret" ? "vert" : prochain.statut === "erreur" ? "terre" : "vide"}`}>
              {prochain.statut === "pret" ? (reglages.instagram && !famille ? "Prête, partira toute seule" : "Prête à publier") : prochain.statut === "erreur" ? "Erreur à revoir" : "Visuel à préparer"}
            </span>
            <button onClick={() => setOuvert(prochain)} className="s-btn s-btn-filet">Ouvrir</button>
          </div>
        </section>
      )}

      {/* Réglages (réservés à l'administration) */}
      {!famille && <div className="grid md:grid-cols-2 gap-3">
        <section className="ig-encart">
          <h3><KeyRound className="h-4 w-4 text-[#A8933F]" /> Photos gratuites (Pixabay)</h3>
          {reglages.pixabay ? (
            <p className="a-st vert mt-2" data-testid="pixabay-ok">Clé enregistrée</p>
          ) : (
            <div className="mt-2 flex gap-2">
              <input type="password" autoComplete="off" value={cle} onChange={(e) => setCle(e.target.value)} placeholder="Colle ta clé Pixabay ici"
                className="flex-1 min-w-0 border px-3 h-11 text-sm" data-testid="cle-pixabay" />
              <button onClick={enregistrerCle} disabled={!cle.trim()} className="s-btn s-btn-plein s-sombre">Enregistrer</button>
            </div>
          )}
        </section>
        <section className="ig-encart">
          <h3><Instagram className="h-4 w-4 text-[#A8933F]" /> Publication automatique</h3>
          {reglages.instagram && !changerJeton ? (
            <>
              <p className="a-st vert mt-2" data-testid="instagram-connecte">@{reglages.instagram_nom} connecté : les posts « Prêts » partent tout seuls à leur date.</p>
              <button onClick={() => setChangerJeton(true)} className="mt-1 text-xs underline underline-offset-2 text-muted-foreground hover:text-foreground" data-testid="changer-jeton">Mettre à jour le jeton</button>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mt-1">En attendant, télécharge le visuel et copie la légende pour publier à la main.</p>
              <div className="mt-2 flex gap-2">
                <input type="password" autoComplete="off" value={jeton} onChange={(e) => setJeton(e.target.value)} placeholder="Colle le jeton Instagram ici"
                  className="flex-1 min-w-0 border px-3 h-11 text-sm" data-testid="jeton-instagram" />
                <button onClick={connecterInstagram} disabled={jeton.trim().length < 20 || connexion || (methodeFacebook && (!appId.trim() || (!reglages.secret_app && !secretApp.trim())))} className="s-btn s-btn-plein s-sombre">{connexion ? "…" : "Connecter"}</button>
              </div>
              {methodeFacebook && (
                <div className="mt-2 grid sm:grid-cols-2 gap-2" data-testid="methode-facebook">
                  <input value={appId} onChange={(e) => setAppId(e.target.value)} placeholder="App ID (App settings → Basic)" className="rounded-md border px-3 h-10 text-sm" data-testid="app-id" />
                  {!reglages.secret_app && <input type="password" autoComplete="off" value={secretApp} onChange={(e) => setSecretApp(e.target.value)} placeholder="App secret (App settings → Basic)" className="rounded-md border px-3 h-10 text-sm" data-testid="app-secret" />}
                  <p className="sm:col-span-2 text-xs text-muted-foreground">Jeton Facebook détecté : on passe par la Page Facebook reliée au compte Instagram.</p>
                </div>
              )}
            </>
          )}
        </section>
      </div>}
      {!famille && compte === "heavent" && <CommentezGuide reglages={reglages} onChange={charger} />}
      {!famille && compte === "nawar" && !reglages.instagram && (
        <p className="ig-encart text-sm text-[#5A5146]">
          Pour publier automatiquement sur le compte Nawar : le compte Instagram Nawar doit être professionnel et relié à une Page Facebook Nawar.
          Génère ensuite un jeton dans l'explorateur Graph API (même app « Heavent Publication »), en cochant la Page Nawar, puis colle-le ci-dessus.
          En attendant, les visuels se préparent et se téléchargent normalement.
        </p>
      )}

      {enRetard.length > 0 && (
        <div className="ig-retard" data-testid="bandeau-retard">
          <p><b>{enRetard.length} publication{enRetard.length > 1 ? "s" : ""} en retard</b> : {enRetard.length > 1 ? "elles ne partiront pas" : "elle ne partira pas"} toute{enRetard.length > 1 ? "s" : ""} seule{enRetard.length > 1 ? "s" : ""}.</p>
          <button onClick={replanifier} disabled={replanif} data-testid="replanifier">{replanif ? "…" : "Les replanifier aux prochains créneaux"}</button>
        </div>
      )}

      {/* Bilan */}
      <div className="ig-bilan">
        <span><b>{posts.length}</b>posts</span>
        <span><b>{posts.filter((p) => p.statut === "pret").length}</b>prêts</span>
        <span><b>{posts.filter((p) => p.statut === "publie").length}</b>publiés</span>
      </div>

      {/* Actions : un plein (l'action utile), des filets */}
      <div className="ig-outils">
        {reglages.pixabay && manquants > 0 && (
          <button onClick={preparerTout} disabled={!!auto} data-testid="preparer-visuels" className="s-btn s-btn-plein s-sombre">
            {auto ? <><Loader2 className="h-4 w-4 animate-spin" /> {auto.fait}/{auto.total} visuels…</> : <><Wand2 className="h-4 w-4 text-[#E4D49A]" /> Préparer les {manquants} visuels automatiquement</>}
          </button>
        )}
        <button onClick={() => setAjout(true)} disabled={!!auto} data-testid="ajouter-publication" className="s-btn s-btn-filet">
          <CalendarPlus className="h-4 w-4 text-[#7A5F1F]" /> Ajouter une publication (fête…)
        </button>
        {!famille && (
          <button onClick={genererUnMois} disabled={generation || !!auto} data-testid="generer-mois" className="s-btn s-btn-filet">
            {generation ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4 text-[#7A5F1F]" />} Générer 1 mois (2 posts/jour)
          </button>
        )}
      </div>

      {/* Calendrier des posts */}
      <h2 className="a-surtitre">Le planning</h2>
      {(() => {
        const carte = (p: Post) => (
          <button key={p.id} onClick={() => setOuvert(p)} className="ig-carte" data-testid="carte-post">
            <div className="ig-vis">
              {p.visuel_url || p.photo_url ? <img src={p.visuel_url ?? p.photo_url!} alt="" loading="lazy" />
                : <div className="ig-couv"><ImagePlus className="h-5 w-5 text-[#A8933F]" /><span className="line-clamp-4">{p.titre}</span></div>}
              {estEnRetard(p) ? <span className="ig-etiq retard" data-testid="pastille-retard">En retard</span> : etiquette(p)}
            </div>
            <div className="bas">
              <div className="theme">{THEMES[p.theme] ?? p.theme}</div>
              <div className="quand first-letter:uppercase">{quand(p.date_prevue)}</div>
            </div>
          </button>
        );
        const aVenir = posts.filter((p) => p.statut !== "publie");
        const publies = posts.filter((p) => p.statut === "publie");
        return (
          <>
            <div className="ig-grille">{aVenir.map(carte)}</div>
            {publies.length > 0 && (
              <details className="mt-6" data-testid="posts-publies">
                <summary className="cursor-pointer text-sm text-muted-foreground select-none">Déjà publiés ({publies.length})</summary>
                <div className="ig-grille mt-3">{publies.map(carte)}</div>
              </details>
            )}
          </>
        );
      })()}

      {ajout && <AjouterPost compte={compte} posts={posts} famille={famille} onFermer={() => setAjout(false)} onCree={async (id) => {
        setAjout(false);
        const { data } = await (supabase as any).from("posts_instagram").select("*").eq("id", id).single();
        await charger();
        if (data) setOuvert(data as Post);
      }} />}
      {ouvert && <EditeurPost post={ouvert} pixabay={reglages.pixabay} instagram={!famille && reglages.instagram} famille={famille} onFermer={() => { setOuvert(null); charger(); }} />}
    </div>
  );
}

function EditeurPost({ post: initial, pixabay, instagram, famille, onFermer }: { post: Post; pixabay: boolean; instagram: boolean; famille: boolean; onFermer: () => void }) {
  const { toast } = useToast();
  const [p, setP] = useState(initial);
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [prises, setPrises] = useState<Set<string>>(new Set());
  const [recherche, setRecherche] = useState(initial.recherche);
  const [occupe, setOccupe] = useState<string | null>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const set = <K extends keyof Post>(k: K, v: Post[K]) => setP((x) => ({ ...x, [k]: v }));

  // Aperçu en direct
  useEffect(() => {
    if (!p.photo_url || !canvas.current) return;
    const t = setTimeout(() => composerVisuel(canvas.current!, p.photo_url!, p).catch(() => {}), 250);
    return () => clearTimeout(t);
  }, [p.photo_url, p.titre, p.accroche, p.style]);

  const chercher = async () => {
    setOccupe("chercher");
    try {
      const [r, u] = await Promise.all([fonction({ action: "chercher", recherche }), fonction({ action: "utilisees" })]);
      // les photos déjà prises par un AUTRE post sont signalées et non choisissables ; celle de ce post reste choisissable
      const miennes = String(p.photo_url ?? "").match(/-(\d+)\.jpg/)?.[1];
      setPrises(new Set((u.ids ?? []).map(String).filter((id: string) => id !== miennes)));
      setPhotos(r.photos);
    }
    catch (e: any) { toast({ title: "Recherche impossible", description: e.message, variant: "destructive" }); }
    setOccupe(null);
  };
  const choisir = async (photo: Photo) => {
    setOccupe("choisir");
    try { const { photo_url } = await fonction({ action: "choisir", post_id: p.id, photo }); setP((x) => ({ ...x, photo_url, photo_auteur: photo.auteur, photo_page: photo.page, visuel_url: null, statut: "brouillon" })); setPhotos(null); }
    catch (e: any) { toast({ title: "Photo non enregistrée", description: e.message, variant: "destructive" }); }
    setOccupe(null);
  };
  const enregistrer = async () => {
    setOccupe("enregistrer");
    const { error } = await (supabase as any).from("posts_instagram").update({
      accroche: p.accroche || null, titre: p.titre, legende: p.legende, style: p.style, recherche,
      date_prevue: p.date_prevue,
    }).eq("id", p.id);
    if (!error && p.photo_url) { try { set("visuel_url", await enregistrerVisuel({ ...p, recherche }, p.photo_url)); set("statut", "pret"); } catch (e: any) { toast({ title: "Visuel non enregistré", description: e.message, variant: "destructive" }); } }
    setOccupe(null);
    if (error) toast({ title: "Erreur", description: error.message, variant: "destructive" }); else toast({ title: "Post enregistré ✓" });
  };
  const telecharger = () => canvas.current?.toBlob((b) => {
    if (!b) return;
    const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = `${p.compte ?? "heavent"}-instagram-${(p.date_prevue ?? "").slice(0, 10) || p.id.slice(0, 6)}.jpg`; a.click();
  }, "image/jpeg", 0.92);
  const copier = async () => { await navigator.clipboard.writeText(p.legende).catch(() => {}); toast({ title: "Légende copiée", description: "Colle-la dans Instagram." }); };
  const marquerPublie = async () => {
    await (supabase as any).from("posts_instagram").update({ statut: "publie", publie_le: new Date().toISOString() }).eq("id", p.id);
    toast({ title: "Marqué comme publié 🎉" }); onFermer();
  };
  const publierMaintenant = async () => {
    setOccupe("publier");
    const { error } = await supabase.functions.invoke("instagram-publier", { body: { action: "publier", post_id: p.id } });
    setOccupe(null);
    if (error) { let m = error.message; try { m = (await (error as any).context?.json())?.error ?? m; } catch { /* rien */ } return toast({ title: "Publication impossible", description: m, variant: "destructive" }); }
    toast({ title: "Publié sur Instagram 🎉" }); onFermer();
  };
  const [confirmeSuppr, setConfirmeSuppr] = useState(false);
  const supprimer = async () => {
    if (!confirmeSuppr) { setConfirmeSuppr(true); return; }
    setOccupe("supprimer");
    const { error } = await (supabase as any).from("posts_instagram").delete().eq("id", p.id);
    setOccupe(null);
    if (error) { setConfirmeSuppr(false); return toast({ title: "Suppression impossible", description: error.message, variant: "destructive" }); }
    toast({ title: "Post supprimé", description: "Il ne sera pas publié." }); onFermer();
  };
  const guide = guidePourTheme(p.theme);
  const creerNewsletter = async () => {
    setOccupe("newsletter");
    const contenu = p.legende.split(/\n\s*\n/).filter((b) => !b.trim().startsWith("#") && !b.includes("lien en bio")).join("\n\n").trim();
    const { error } = await (supabase as any).from("newsletters").insert({
      sujet: p.titre, contenu, themes: [p.theme], image_url: p.visuel_url?.split("?")[0] ?? null, guide_slug: guide.slug, post_id: p.id,
    });
    setOccupe(null);
    if (error) return toast({ title: "Erreur", description: error.message, variant: "destructive" });
    toast({ title: "Newsletter créée ✉️", description: "Retrouve-la dans l'onglet Newsletter pour la relire, la tester et l'envoyer." });
  };
  const dateLocale = p.date_prevue ? new Date(new Date(p.date_prevue).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16) : "";

  return (
    <Dialog open onOpenChange={(o) => !o && onFermer()}>
      <DialogContent className="max-w-5xl max-h-[94vh] overflow-y-auto" data-testid="editeur-post" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogTitle className="font-serif text-2xl">Post Instagram · {THEMES[p.theme] ?? p.theme}</DialogTitle>
        {p.statut === "erreur" && p.erreur && <p className="text-sm rounded-md bg-[#9C4A2C]/10 text-[#9C4A2C] px-3 py-2">La publication a échoué : {p.erreur}</p>}
        <div className="grid md:grid-cols-[minmax(0,380px)_1fr] gap-6">
          <div className="space-y-2">
            <div className="aspect-[4/5] rounded-xl overflow-hidden bg-[#F4EFE3] relative">
              {p.photo_url ? <canvas ref={canvas} className="h-full w-full" data-testid="apercu-visuel" />
                : <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground p-6 text-center">Choisis une photo pour voir l'aperçu</div>}
            </div>
            {p.photo_auteur && <p className="text-[11px] text-muted-foreground">Photo : {p.photo_auteur} sur {p.photo_page ? <a href={p.photo_page} target="_blank" rel="noreferrer" className="underline">Pixabay <ExternalLink className="inline h-3 w-3" /></a> : "Pixabay"}</p>}
            {p.photo_url && (
              <div className="flex flex-wrap gap-2">
                <button onClick={telecharger} className="inline-flex items-center gap-1.5 rounded-md border px-3 h-9 text-sm" data-testid="telecharger-visuel"><Download className="h-4 w-4" /> Télécharger</button>
                <button onClick={copier} className="inline-flex items-center gap-1.5 rounded-md border px-3 h-9 text-sm"><Copy className="h-4 w-4" /> Copier la légende</button>
              </div>
            )}
          </div>
          <div className="space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="text-sm space-y-1 block"><span className="text-muted-foreground">Petit texte au-dessus</span>
                <input value={p.accroche ?? ""} onChange={(e) => set("accroche", e.target.value)} className="w-full rounded-md border px-3 h-10" /></label>
              <label className="text-sm space-y-1 block"><span className="text-muted-foreground">Date de publication</span>
                <input type="datetime-local" value={dateLocale} onChange={(e) => set("date_prevue", e.target.value ? new Date(e.target.value).toISOString() : null)} className="w-full rounded-md border px-3 h-10" /></label>
            </div>
            <label className="text-sm space-y-1 block"><span className="text-muted-foreground">Texte sur la photo</span>
              <textarea value={p.titre} onChange={(e) => set("titre", e.target.value)} rows={2} className="w-full rounded-md border p-3 font-serif text-lg" data-testid="titre-post" /></label>
            <div className="flex gap-2 text-sm">
              {(["sombre", "clair"] as const).map((s) => (
                <button key={s} onClick={() => set("style", s)} className={`rounded-full px-4 h-9 border ${p.style === s ? "bg-[#141414] text-white border-[#141414]" : "bg-white"}`}>
                  {s === "sombre" ? "Texte blanc sur la photo" : "Carte crème"}
                </button>
              ))}
            </div>
            {(p.compte ?? "heavent") === "heavent" && <p className="text-xs rounded-md bg-[#FBF6E9] px-3 py-2 text-[#5E554A]">🎁 Guide lié : <a href={`/guides/${guide.slug}`} target="_blank" rel="noreferrer" className="underline">{guide.titre}</a> · lien en bio : heaventagency.com/liens</p>}
            <label className="text-sm space-y-1 block"><span className="text-muted-foreground">Légende du post</span>
              <textarea value={p.legende} onChange={(e) => set("legende", e.target.value)} rows={9} className="w-full rounded-md border p-3 text-sm leading-relaxed" /></label>

            <div className="rounded-xl border border-[#EADFC8] p-3 space-y-2">
              <div className="text-sm font-medium flex items-center gap-1.5"><Sparkles className="h-4 w-4 text-[#A8933F]" /> {p.photo_url ? "Changer de photo" : "Choisir une photo"}</div>
              {pixabay ? (
                <div className="flex gap-2">
                  <input value={recherche} onChange={(e) => setRecherche(e.target.value)} onKeyDown={(e) => e.key === "Enter" && chercher()} placeholder="ex. wedding cake, balloons…"
                    className="flex-1 min-w-0 rounded-md border px-3 h-10 text-sm" data-testid="recherche-photo" />
                  <button onClick={chercher} disabled={!!occupe} className="inline-flex items-center gap-1.5 rounded-md bg-[#141414] text-white px-3 h-10 text-sm" data-testid="chercher-photo">
                    {occupe === "chercher" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />} Chercher
                  </button>
                </div>
              ) : <p className="text-sm text-muted-foreground">Enregistre d'abord ta clé Pixabay en haut de la page.</p>}
              <p className="text-[11px] text-muted-foreground">Astuce : les mots-clés en anglais donnent plus de résultats.</p>
              {photos && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-80 overflow-y-auto" data-testid="resultats-photos">
                  {photos.length === 0 && <p className="col-span-full text-sm text-muted-foreground">Aucune photo, essaie d'autres mots.</p>}
                  {photos.map((ph) => (
                    <button key={ph.id} onClick={() => choisir(ph)} disabled={!!occupe || prises.has(String(ph.id))} className="aspect-[4/5] rounded-md overflow-hidden relative group disabled:cursor-not-allowed" data-deja={prises.has(String(ph.id)) ? "oui" : undefined}>
                      <img src={ph.apercu} alt="" className={`h-full w-full object-cover group-hover:scale-105 transition ${prises.has(String(ph.id)) ? "opacity-30 grayscale" : ""}`} loading="lazy" />
                      {prises.has(String(ph.id)) && <span className="absolute inset-x-0 bottom-0 bg-black/70 text-white text-[10px] py-0.5 text-center">Déjà utilisée</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <button onClick={enregistrer} disabled={!!occupe} className="s-btn s-btn-plein s-sombre !min-h-[44px] !px-5 !text-[13px]" data-testid="enregistrer-post">
                {occupe === "enregistrer" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Enregistrer
              </button>
              {instagram && p.statut !== "publie" && p.visuel_url && (
                <button onClick={publierMaintenant} disabled={!!occupe} className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] text-white px-5 h-10 text-sm disabled:opacity-60" data-testid="publier-maintenant">
                  {occupe === "publier" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Instagram className="h-4 w-4" />} Publier maintenant
                </button>
              )}
              {!famille && (p.compte ?? "heavent") === "heavent" && <button onClick={creerNewsletter} disabled={!!occupe} className="rounded-full border px-4 h-10 text-sm" data-testid="creer-newsletter">✉️ Créer la newsletter</button>}
              {!instagram && !famille && p.statut !== "publie" && p.visuel_url && <button onClick={marquerPublie} className="rounded-full border px-4 h-10 text-sm">Je l'ai publié</button>}
              <button onClick={onFermer} className="rounded-full px-4 h-10 text-sm text-muted-foreground">Fermer</button>
              {p.statut !== "publie" && (
                <button onClick={supprimer} onBlur={() => setConfirmeSuppr(false)} disabled={!!occupe} data-testid="supprimer-post"
                  className={`ml-auto inline-flex items-center gap-1.5 rounded-full px-4 h-10 text-sm transition-colors ${confirmeSuppr ? "bg-[#9C4A2C] text-white" : "text-[#9C4A2C] hover:bg-[#9C4A2C]/10"}`}>
                  {occupe === "supprimer" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />} {confirmeSuppr ? "Confirmer la suppression" : "Supprimer ce post"}
                </button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
