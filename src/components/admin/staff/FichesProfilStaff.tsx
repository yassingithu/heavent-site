import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Download, Eye, FileUser, Pencil, Search } from "lucide-react";
import EditionStaff from "./EditionStaff";
import { COULEURS, dateFr, enDataUrl, enteteDoc, esc, logo, nomFichier, photoCrewUrl, piedAgence, telechargerPdf, InfosAgence } from "@/lib/pdf";
import { aujourdhuiMaroc } from "@/lib/dateMaroc";

type StaffComplet = Record<string, any> & { id: string; nom: string; prenom: string; email: string };

const CHAMPS_PROFIL: [string, string][] = [
  ["age", "Âge"], ["genre", "Genre"], ["ville", "Ville"], ["telephone", "Téléphone"], ["email", "Email"],
  ["nationalite", "Nationalité"], ["langues", "Langues"], ["niveau_etudes", "Études"], ["permis", "Permis"],
];
/** Photo d'un candidat : lue par lien temporaire dans l'espace privé. */
function PhotoCrew({ fichier, alt, className }: { fichier: string; alt: string; className?: string }) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => { let actif = true; photoCrewUrl(fichier).then((u) => { if (actif) setUrl(u); }); return () => { actif = false; }; }, [fichier]);
  return url ? <img src={url} alt={alt} className={className} /> : <div className={className} />;
}

const CHAMPS_TAILLES: [string, string][] = [
  ["taille", "Taille (cm)"], ["taille_haut", "Haut"], ["taille_pantalon", "Pantalon"], ["taille_confection", "Confection"],
  ["pointure", "Pointure"], ["couleur_cheveux", "Cheveux"], ["couleur_yeux", "Yeux"],
];

const valeur = (s: StaffComplet, k: string) => {
  const v = s[k];
  if (k === "permis") return v ? "Oui" : v === false ? "Non" : "";
  if (k === "age" && v) return `${v} ans`;
  return v ?? "";
};

const cssFiche = `
  .doc-heavent .profil { display: flex; gap: 20px; }
  .doc-heavent .photos { display: flex; flex-direction: column; gap: 10px; width: 210px; flex: none; }
  .doc-heavent .photos img { width: 210px; height: 270px; object-fit: cover; border: 1px solid #ece6d3; }
  .doc-heavent .photos .pp { height: 330px; }
  .doc-heavent .photos .vide { width: 210px; height: 270px; background: ${COULEURS.creme}; border: 1px dashed #d8cfb0; display: flex; align-items: center; justify-content: center; color: #aaa; }
  .doc-heavent .nomstaff { font-family: "Playfair Display", Georgia, serif; font-size: 28px; color: ${COULEURS.noir}; line-height: 1.1; }
  .doc-heavent .texte { white-space: pre-line; color: #444; }
`;

async function pageProfil(s: StaffComplet, logoSrc: string, agence: InfosAgence | null) {
  const [photo, pleinPied] = await Promise.all([photoCrewUrl(s.photo).then(enDataUrl), photoCrewUrl(s.photo_plein_pied).then(enDataUrl)]);
  const cases = (champs: [string, string][]) =>
    champs.filter(([k]) => valeur(s, k) !== "").map(([k, l]) => `<div class="case"><div class="etiquette">${l}</div><div class="v">${esc(valeur(s, k))}</div></div>`).join("");
  return `<div class="doc-heavent">
  ${enteteDoc(logoSrc, "FICHE PROFIL", `Éditée le ${dateFr(aujourdhuiMaroc())}`)}
  <div class="corps">
    <div class="profil">
      <div class="photos">
        ${photo ? `<img src="${photo}">` : `<div class="vide">Pas de photo</div>`}
        ${pleinPied ? `<img class="pp" src="${pleinPied}">` : ""}
      </div>
      <div style="flex:1">
        <div class="etiquette">Hôte / hôtesse</div>
        <div class="nomstaff">${esc(s.prenom)} ${esc(s.nom)}</div>
        <h2>Profil</h2><div class="grille">${cases(CHAMPS_PROFIL)}</div>
        <h2>Mensurations</h2><div class="grille">${cases(CHAMPS_TAILLES) || '<div class="texte">Non renseignées</div>'}</div>
        ${s.competences ? `<h2>Compétences</h2><div class="bloc texte">${esc(s.competences)}</div>` : ""}
        ${s.experience ? `<h2>Expérience</h2><div class="bloc texte">${esc(s.experience)}</div>` : ""}
        ${s.disponibilites ? `<h2>Disponibilités déclarées</h2><div class="texte">${esc(s.disponibilites)}</div>` : ""}
      </div>
    </div>
  </div>
  ${piedAgence(agence)}
</div>`;
}

/** Référence discrète d'un profil, imprimée sur la fiche client (jamais d'identifiant technique complet). */
export const referenceProfil = (id: string) => `HVT-${id.replace(/-/g, "").slice(0, 6).toUpperCase()}`;

const cssClient = `
  .doc-heavent[data-fiche="client"] .entete { padding: 22px 0 14px; border-bottom: 1px solid #A8933F; }
  .doc-heavent[data-fiche="client"] .entete img { height: 62px; }
  .doc-heavent[data-fiche="client"] .entete .titre .mot { font-size: 15px; letter-spacing: 7px; color: #8C6D22; }
  .doc-heavent[data-fiche="client"] .corps { padding-top: 30px; }
  .doc-heavent .cl { display: flex; gap: 34px; align-items: stretch; page-break-inside: avoid; }
  .doc-heavent .cl-photo { flex: none; }
  .doc-heavent .cl-photo img { display: block; width: auto; max-width: 390px; height: auto; max-height: 610px; border: 1px solid #EADFC8; }
  .doc-heavent .cl-photo .vide { width: 390px; height: 520px; background: #FBF6E9; border: 1px solid #EADFC8; display: flex; align-items: center; justify-content: center; font: 200px/1 "Playfair Display", Georgia, serif; color: #C8B560; }
  .doc-heavent .cl-droite { flex: 1; display: flex; flex-direction: column; }
  .doc-heavent .cl-nom { font-family: "Playfair Display", Georgia, serif; font-size: 52px; line-height: 1; color: #141414; margin: 6px 0 0; }
  .doc-heavent .cl-age { font-size: 12px; letter-spacing: 3px; text-transform: uppercase; color: #8C6D22; margin-top: 10px; }
  .doc-heavent .cl-filet { width: 40px; height: 1px; background: #A8933F; margin: 22px 0; }
  .doc-heavent .cl-taille .chiffre { font-family: "Playfair Display", Georgia, serif; font-size: 84px; line-height: 1; color: #141414; }
  .doc-heavent .cl-taille .u { font-size: 14px; letter-spacing: 3px; color: #8C6D22; margin-left: 6px; }
  .doc-heavent .cl-liste { margin-top: 26px; }
  .doc-heavent .cl-ligne { display: flex; justify-content: space-between; align-items: baseline; padding: 9px 0; border-bottom: 1px solid #EADFC8; }
  .doc-heavent .cl-ligne .e { font-size: 9.5px; letter-spacing: 2px; text-transform: uppercase; color: #8C6D22; }
  .doc-heavent .cl-ligne .v { font-size: 17px; color: #141414; }
  .doc-heavent .cl-bas { margin-top: auto; padding-top: 18px; }
  .doc-heavent .cl-bas img { display: block; height: 240px; width: auto; max-width: 100%; margin-bottom: 18px; }
  .doc-heavent .cl-ref { font-size: 9px; letter-spacing: 3px; color: #7A7260; }
`;

const LIGNES_CLIENT: [string, string][] = [
  ["taille_haut", "Haut"], ["taille_pantalon", "Pantalon"], ["taille_confection", "Taille vêtement"],
  ["pointure", "Pointure"], ["couleur_cheveux", "Cheveux"], ["couleur_yeux", "Yeux"],
];

/** Fiche à montrer aux clients : photo entière en vedette, prénom, âge, taille et mensurations. Ni contact, ni bio, ni données administratives (pied de page sans RC/ICE/IF). */
async function pageClient(s: StaffComplet, logoSrc: string, agence: InfosAgence | null) {
  const [photo, pleinPied] = await Promise.all([photoCrewUrl(s.photo).then(enDataUrl), photoCrewUrl(s.photo_plein_pied).then(enDataUrl)]);
  const lignes = LIGNES_CLIENT.filter(([k]) => valeur(s, k) !== "")
    .map(([k, l]) => `<div class="cl-ligne"><span class="e">${l}</span><span class="v">${esc(valeur(s, k))}</span></div>`).join("");
  const pied = agence && { raison_sociale: agence.raison_sociale, ville: agence.ville, telephone: agence.telephone, email: agence.email };
  return `<div class="doc-heavent" data-fiche="client">
  ${enteteDoc(logoSrc, "PROFIL", "")}
  <div class="corps"><div class="cl">
    <div class="cl-photo">${photo ? `<img src="${photo}">` : `<div class="vide">${esc(String(s.prenom ?? "").charAt(0).toUpperCase())}</div>`}</div>
    <div class="cl-droite">
      <div class="etiquette">${/^f/i.test(String(s.genre ?? "")) ? "Hôtesse" : /^(h|m)/i.test(String(s.genre ?? "")) ? "Hôte" : "Hôte / hôtesse"}</div>
      <div class="cl-nom">${esc(s.prenom)}</div>
      ${s.age ? `<div class="cl-age">${esc(s.age)} ans</div>` : ""}
      <div class="cl-filet"></div>
      ${s.taille ? `<div class="cl-taille"><span class="chiffre">${esc(s.taille)}</span><span class="u">CM</span></div>` : ""}
      <div class="cl-liste">${lignes}</div>
      <div class="cl-bas">${pleinPied ? `<img src="${pleinPied}">` : ""}<div class="cl-ref">RÉF. ${referenceProfil(s.id)}</div></div>
    </div>
  </div></div>
  ${piedAgence(pied as InfosAgence | null)}
</div>`;
}

/** Télécharge la fiche client (version visuelle, sans données internes) des personnes indiquées. */
export async function telechargerFichesClient(ids: string[]) {
  const [{ data: staff, error }, { data: agence }] = await Promise.all([
    supabase.from("staff").select("*").in("id", ids),
    supabase.from("parametres_agence").select("*").eq("id", 1).maybeSingle(),
  ]);
  if (error) throw error;
  const liste = ((staff ?? []) as StaffComplet[]).sort((a, b) => `${a.prenom}`.localeCompare(`${b.prenom}`));
  const pages = await Promise.all(liste.map((s) => pageClient(s, logo, agence)));
  const nom = liste.length === 1 ? nomFichier("Profil-client", liste[0].prenom, referenceProfil(liste[0].id)) : nomFichier("Profils-client", `${liste.length}-personnes`);
  await telechargerPdf(pages, cssFiche + cssClient, nom);
}

/** Télécharge les fiches profil des personnes indiquées dans un seul PDF. */
export async function telechargerFichesProfil(ids: string[]) {
  const [{ data: staff, error }, { data: agence }] = await Promise.all([
    supabase.from("staff").select("*").in("id", ids),
    supabase.from("parametres_agence").select("*").eq("id", 1).maybeSingle(),
  ]);
  if (error) throw error;
  const liste = ((staff ?? []) as StaffComplet[]).sort((a, b) => `${a.nom}${a.prenom}`.localeCompare(`${b.nom}${b.prenom}`));
  const pages = await Promise.all(liste.map((s) => pageProfil(s, logo, agence)));
  const nom = liste.length === 1 ? nomFichier("Fiche", liste[0].prenom, liste[0].nom) : nomFichier("Fiches-profil", `${liste.length}-personnes`);
  await telechargerPdf(pages, cssFiche, nom);
}

export default function FichesProfilStaff() {
  const { toast } = useToast();
  const [staff, setStaff] = useState<StaffComplet[]>([]);
  const [selection, setSelection] = useState<Set<string>>(new Set());
  const [recherche, setRecherche] = useState("");
  const [enCours, setEnCours] = useState(false);
  const [edition, setEdition] = useState<string | null>(null);
  const [consulte, setConsulte] = useState<StaffComplet | null>(null);

  const consulter = async (id: string) => {
    const { data, error } = await supabase.from("staff").select("*").eq("id", id).maybeSingle();
    if (data) setConsulte(data as StaffComplet);
    else if (error) toast({ title: "Connexion impossible", description: "Réessayez dans un instant.", variant: "destructive" });
    else toast({ title: "Fiche introuvable", description: "Le lien est peut-être ancien.", variant: "destructive" });
  };
  // Lien direct (mail du matin) : /admin?crew=<id> ouvre la fiche en consultation
  useEffect(() => {
    let id = new URLSearchParams(window.location.search).get("crew");
    try { id = id || sessionStorage.getItem("heavent-crew"); sessionStorage.removeItem("heavent-crew"); } catch { /* sans stockage */ }
    if (!id) return;
    consulter(id);
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  const chargerStaff = () =>
    supabase.from("staff").select("id, nom, prenom, email, ville, langues, genre, banni").order("nom").then(({ data }) => setStaff((data ?? []) as StaffComplet[]));
  useEffect(() => { chargerStaff(); }, []);

  const filtres = useMemo(() => {
    const q = recherche.trim().toLowerCase();
    return staff.filter((s) => !q || [s.nom, s.prenom, s.ville, s.langues].some((v) => String(v ?? "").toLowerCase().includes(q)));
  }, [staff, recherche]);

  const basculer = (id: string) => setSelection((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toutCocher = (oui: boolean) => setSelection((cur) => { const n = new Set(cur); filtres.forEach((s) => oui ? n.add(s.id) : n.delete(s.id)); return n; });
  const tousCoches = filtres.length > 0 && filtres.every((s) => selection.has(s.id));

  const telecharger = async (ids: string[], client = false) => {
    if (!ids.length) return;
    setEnCours(true);
    try {
      await (client ? telechargerFichesClient(ids) : telechargerFichesProfil(ids));
      toast({ title: "PDF téléchargé", description: ids.length === 1 ? (client ? "Fiche pour client prête (vérifiez vos téléchargements)" : "Fiche interne prête") : `${ids.length} fiches ${client ? "pour client" : "internes"} prêtes` });
    } catch (e) {
      console.error(e);
      toast({ title: "Erreur", description: "Impossible de créer le PDF", variant: "destructive" });
    } finally {
      setEnCours(false);
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-3">
        <CardTitle className="text-base">Mon équipe — fiches profil</CardTitle>
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="h-4 w-4 absolute left-2 top-3 text-muted-foreground" />
            <Input className="pl-8" placeholder="Nom, ville, langue…" value={recherche} onChange={(e) => setRecherche(e.target.value)} />
          </div>
          <Button variant="outline" size="sm" onClick={() => toutCocher(!tousCoches)}>
            {tousCoches ? "Tout décocher" : "Tout cocher"}
          </Button>
          <Button size="sm" disabled={!selection.size || enCours} onClick={() => telecharger([...selection])}>
            <Download className="h-4 w-4 mr-1" /> {enCours ? "Création…" : `Fiches internes (${selection.size})`}
          </Button>
          <Button size="sm" variant="outline" disabled={!selection.size || enCours} onClick={() => telecharger([...selection], true)}>
            <FileUser className="h-4 w-4 mr-1" /> Fiches pour client ({selection.size})
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {filtres.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aucun membre du personnel pour l'instant.</p>
        ) : (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {filtres.map((s) => (
              <div key={s.id} className={`flex min-w-0 items-center gap-1 border rounded-md p-1 hover:bg-muted/50 ${s.banni ? "opacity-60" : ""}`}>
                <label className="h-11 w-11 grid place-items-center cursor-pointer flex-none" aria-label={`Sélectionner ${s.prenom} ${s.nom}`}>
                  <Checkbox checked={selection.has(s.id)} onCheckedChange={() => basculer(s.id)} />
                </label>
                <button type="button" className="flex-1 min-w-0 text-left py-1" onClick={() => consulter(s.id)}>
                  <div className="font-medium truncate">{s.prenom} {s.nom} {s.banni && <span className="ml-1 text-[10px] uppercase tracking-wide bg-[#9C4A2C]/10 text-[#9C4A2C] rounded px-1.5 py-0.5">Banni</span>}</div>
                  <div className="text-xs text-muted-foreground line-clamp-2 break-words">{[s.ville, s.langues].filter(Boolean).join(" · ") || s.email}</div>
                </button>
                <Button size="icon" variant="ghost" className="h-11 w-11" title="Consulter la fiche" aria-label="Consulter la fiche" onClick={() => consulter(s.id)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="h-11 w-11" title="Modifier la fiche / mot de passe" aria-label="Modifier la fiche et le mot de passe" onClick={() => setEdition(s.id)}>
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <Dialog open={!!consulte} onOpenChange={(o) => !o && setConsulte(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {consulte && (
            <>
              <DialogHeader><DialogTitle>{consulte.prenom} {consulte.nom}</DialogTitle></DialogHeader>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex sm:flex-col gap-2 sm:w-44 flex-none">
                  {consulte.photo ? <PhotoCrew fichier={consulte.photo} alt={`Portrait de ${consulte.prenom}`} className="w-1/2 sm:w-44 aspect-[3/4] object-cover rounded-md border" /> : <div className="w-1/2 sm:w-44 aspect-[3/4] grid place-items-center rounded-md border border-dashed text-xs text-muted-foreground">Pas de photo</div>}
                  {consulte.photo_plein_pied && <PhotoCrew fichier={consulte.photo_plein_pied} alt="Photo en pied" className="w-1/2 sm:w-44 aspect-[3/4] object-cover rounded-md border" />}
                </div>
                <div className="flex-1 min-w-0 space-y-3 text-sm">
                  {[["Profil", CHAMPS_PROFIL], ["Mensurations", CHAMPS_TAILLES]].map(([titre, champs]) => (
                    <div key={titre as string}>
                      <div className="text-[11px] uppercase tracking-widest text-[#8C6D22] mb-1">{titre as string}</div>
                      <dl className="grid grid-cols-2 gap-x-3 gap-y-1">
                        {(champs as [string, string][]).filter(([k]) => valeur(consulte, k) !== "").map(([k, l]) => (
                          <div key={k} className="min-w-0"><dt className="text-xs text-muted-foreground">{l}</dt><dd className="break-words">{String(valeur(consulte, k))}</dd></div>
                        ))}
                      </dl>
                    </div>
                  ))}
                  {consulte.competences && <div><div className="text-[11px] uppercase tracking-widest text-[#8C6D22] mb-1">Compétences</div><p className="whitespace-pre-line">{consulte.competences}</p></div>}
                  {consulte.experience && <div><div className="text-[11px] uppercase tracking-widest text-[#8C6D22] mb-1">Expérience</div><p className="whitespace-pre-line">{consulte.experience}</p></div>}
                  {consulte.disponibilites && <div><div className="text-[11px] uppercase tracking-widest text-[#8C6D22] mb-1">Disponibilités déclarées</div><p>{consulte.disponibilites}</p></div>}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-2 border-t">
                <Button size="sm" variant="outline" onClick={() => { const id = consulte.id; setConsulte(null); setEdition(id); }}><Pencil className="h-4 w-4 mr-1" /> Modifier</Button>
                <Button size="sm" disabled={enCours} onClick={() => telecharger([consulte.id], true)}><FileUser className="h-4 w-4 mr-1" /> Fiche pour client (PDF)</Button>
                <Button size="sm" variant="outline" disabled={enCours} onClick={() => telecharger([consulte.id])}><Download className="h-4 w-4 mr-1" /> Fiche interne — équipe seulement (PDF)</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      <EditionStaff staffId={edition} onClose={() => setEdition(null)} onSaved={chargerStaff} />
    </Card>
  );
}
