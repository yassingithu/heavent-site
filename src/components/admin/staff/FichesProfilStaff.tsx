import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, Pencil, Search } from "lucide-react";
import EditionStaff from "./EditionStaff";
import { COULEURS, dateFr, enDataUrl, enteteDoc, esc, logo, nomFichier, photoUrl, piedAgence, telechargerPdf, InfosAgence } from "@/lib/pdf";

type StaffComplet = Record<string, any> & { id: string; nom: string; prenom: string; email: string };

const CHAMPS_PROFIL: [string, string][] = [
  ["age", "Âge"], ["genre", "Genre"], ["ville", "Ville"], ["telephone", "Téléphone"], ["email", "Email"],
  ["nationalite", "Nationalité"], ["langues", "Langues"], ["niveau_etudes", "Études"], ["permis", "Permis"],
];
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
  const [photo, pleinPied] = await Promise.all([enDataUrl(photoUrl(s.photo)), enDataUrl(photoUrl(s.photo_plein_pied))]);
  const cases = (champs: [string, string][]) =>
    champs.filter(([k]) => valeur(s, k) !== "").map(([k, l]) => `<div class="case"><div class="etiquette">${l}</div><div class="v">${esc(valeur(s, k))}</div></div>`).join("");
  return `<div class="doc-heavent">
  ${enteteDoc(logoSrc, "FICHE PROFIL", `Éditée le ${dateFr(new Date().toISOString().slice(0, 10))}`)}
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

  const chargerStaff = () =>
    supabase.from("staff").select("id, nom, prenom, email, ville, langues, genre").order("nom").then(({ data }) => setStaff((data ?? []) as StaffComplet[]));
  useEffect(() => { chargerStaff(); }, []);

  const filtres = useMemo(() => {
    const q = recherche.trim().toLowerCase();
    return staff.filter((s) => !q || [s.nom, s.prenom, s.ville, s.langues].some((v) => String(v ?? "").toLowerCase().includes(q)));
  }, [staff, recherche]);

  const basculer = (id: string) => setSelection((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toutCocher = (oui: boolean) => setSelection(oui ? new Set(filtres.map((s) => s.id)) : new Set());

  const telecharger = async (ids: string[]) => {
    if (!ids.length) return;
    setEnCours(true);
    try {
      await telechargerFichesProfil(ids);
      toast({ title: "PDF téléchargé", description: `${ids.length} fiche(s) profil` });
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
          <Button variant="outline" size="sm" onClick={() => toutCocher(selection.size < filtres.length)}>
            {selection.size && selection.size >= filtres.length ? "Tout décocher" : "Tout cocher"}
          </Button>
          <Button size="sm" disabled={!selection.size || enCours} onClick={() => telecharger([...selection])}>
            <Download className="h-4 w-4 mr-1" /> {enCours ? "Création…" : `Télécharger la sélection (${selection.size})`}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {filtres.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aucun membre du personnel pour l'instant.</p>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {filtres.map((s) => (
              <label key={s.id} className="flex items-center gap-3 border rounded-md p-2 cursor-pointer hover:bg-muted/50">
                <Checkbox checked={selection.has(s.id)} onCheckedChange={() => basculer(s.id)} />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{s.prenom} {s.nom}</div>
                  <div className="text-xs text-muted-foreground truncate">{[s.ville, s.langues].filter(Boolean).join(" · ") || s.email}</div>
                </div>
                <Button size="icon" variant="ghost" title="Modifier la fiche / mot de passe" onClick={(e) => { e.preventDefault(); setEdition(s.id); }}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" title="Fiche PDF" disabled={enCours} onClick={(e) => { e.preventDefault(); telecharger([s.id]); }}>
                  <Download className="h-4 w-4" />
                </Button>
              </label>
            ))}
          </div>
        )}
      </CardContent>
      <EditionStaff staffId={edition} onClose={() => setEdition(null)} onSaved={chargerStaff} />
    </Card>
  );
}
