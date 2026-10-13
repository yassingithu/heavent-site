import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { KeyRound, Save } from "lucide-react";

export const LANGUES = ["Arabe", "Darija", "Amazigh", "Français", "Anglais", "Espagnol", "Allemand", "Italien", "Portugais", "Chinois", "Russe", "Turc"];

type Champ = { k: string; l: string; type?: "number" | "date" | "texte" };
const SECTIONS: { titre: string; champs: Champ[] }[] = [
  { titre: "Identité", champs: [
    { k: "prenom", l: "Prénom" }, { k: "nom", l: "Nom" }, { k: "telephone", l: "Téléphone" }, { k: "age", l: "Âge", type: "number" },
    { k: "genre", l: "Genre" }, { k: "ville", l: "Ville" }, { k: "nationalite", l: "Nationalité" },
    { k: "date_naissance", l: "Date de naissance", type: "date" }, { k: "lieu_naissance", l: "Lieu de naissance" },
    { k: "situation_familiale", l: "Situation familiale" }, { k: "niveau_etudes", l: "Niveau d'études" },
  ] },
  { titre: "Administratif (contrats et paie)", champs: [
    { k: "adresse_complete", l: "Adresse" }, { k: "code_postal", l: "Code postal" }, { k: "numero_identite", l: "N° CIN" },
    { k: "numero_securite_sociale", l: "N° CNSS" }, { k: "iban", l: "RIB / IBAN" }, { k: "taux_horaire", l: "Taux horaire payé (MAD/h)", type: "number" },
    { k: "nom_urgence", l: "Contact d'urgence" }, { k: "telephone_urgence", l: "Téléphone d'urgence" },
  ] },
  { titre: "Mensurations", champs: [
    { k: "taille", l: "Taille (cm)", type: "number" }, { k: "taille_haut", l: "Haut" }, { k: "taille_pantalon", l: "Pantalon" },
    { k: "taille_confection", l: "Confection" }, { k: "pointure", l: "Pointure" }, { k: "couleur_cheveux", l: "Cheveux" }, { k: "couleur_yeux", l: "Yeux" },
  ] },
  { titre: "Profil", champs: [
    { k: "competences", l: "Compétences", type: "texte" }, { k: "experience", l: "Expérience", type: "texte" }, { k: "remarques", l: "Remarques internes", type: "texte" },
  ] },
];

interface Props { staffId: string | null; onClose: () => void; onSaved?: () => void }

export default function EditionStaff({ staffId, onClose, onSaved }: Props) {
  const { toast } = useToast();
  const [s, setS] = useState<Record<string, any> | null>(null);
  const [mdp, setMdp] = useState({ a: "", b: "" });
  const [enCours, setEnCours] = useState(false);

  useEffect(() => {
    setS(null); setMdp({ a: "", b: "" });
    if (staffId) supabase.from("staff").select("*").eq("id", staffId).single().then(({ data }) => setS(data));
  }, [staffId]);

  const langues = String(s?.langues ?? "").split(",").map((l) => l.trim()).filter(Boolean);
  const basculerLangue = (l: string, v: boolean) => {
    const suite = v ? [...langues, l] : langues.filter((x) => x !== l);
    setS({ ...s, langues: LANGUES.filter((x) => suite.includes(x)).concat(suite.filter((x) => !LANGUES.includes(x))).join(", ") });
  };

  const enregistrer = async () => {
    if (!s) return;
    setEnCours(true);
    const { id, email, created_at, updated_at, ...maj } = s;
    for (const sec of SECTIONS) for (const c of sec.champs) {
      if (c.type === "number") maj[c.k] = maj[c.k] === "" || maj[c.k] == null ? null : Number(maj[c.k]);
      if (c.type === "date" && !maj[c.k]) maj[c.k] = null;
    }
    if (maj.taux_horaire == null) maj.taux_horaire = 60;
    const { error } = await supabase.from("staff").update(maj).eq("id", id);
    setEnCours(false);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Fiche enregistrée", description: `${s.prenom} ${s.nom}` });
    onSaved?.();
  };

  const changerMotDePasse = async () => {
    if (mdp.a.length < 8) { toast({ title: "Mot de passe trop court", description: "8 caractères minimum", variant: "destructive" }); return; }
    if (mdp.a !== mdp.b) { toast({ title: "Les deux mots de passe ne correspondent pas", variant: "destructive" }); return; }
    setEnCours(true);
    const { data, error } = await supabase.functions.invoke("admin-change-password", { body: { userEmail: s!.email, newPassword: mdp.a } });
    setEnCours(false);
    if (error || data?.error) {
      toast({ title: "Erreur", description: data?.error ?? "Le mot de passe n'a pas pu être changé (cette personne a-t-elle déjà créé son compte ?)", variant: "destructive" });
      return;
    }
    setMdp({ a: "", b: "" });
    toast({ title: "Mot de passe changé", description: `Communique-le à ${s!.prenom} : il / elle pourra se connecter sur l'espace staff.` });
  };

  return (
    <Dialog open={!!staffId} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{s ? `${s.prenom} ${s.nom}` : "Chargement…"}</DialogTitle></DialogHeader>
        {s && (
          <div className="space-y-6">
            <div className="text-sm text-muted-foreground">Email de connexion : <b className="text-foreground">{s.email}</b></div>
            {SECTIONS.map((sec) => (
              <div key={sec.titre}>
                <div className="text-sm font-semibold mb-2">{sec.titre}</div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {sec.champs.map((c) => (
                    <div key={c.k} className={c.type === "texte" ? "sm:col-span-3" : ""}>
                      <Label className="text-xs">{c.l}</Label>
                      {c.type === "texte"
                        ? <Textarea rows={2} value={s[c.k] ?? ""} onChange={(e) => setS({ ...s, [c.k]: e.target.value })} />
                        : <Input type={c.type === "number" ? "number" : c.type === "date" ? "date" : "text"} value={s[c.k] ?? ""} onChange={(e) => setS({ ...s, [c.k]: e.target.value })} />}
                    </div>
                  ))}
                  {sec.titre === "Identité" && (
                    <label className="flex items-center gap-2 text-sm mt-5"><Switch checked={!!s.permis} onCheckedChange={(v) => setS({ ...s, permis: v })} /> Permis de conduire</label>
                  )}
                </div>
                {sec.titre === "Profil" && (
                  <div className="mt-3">
                    <Label className="text-xs">Langues parlées</Label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-1">
                      {LANGUES.map((l) => (
                        <label key={l} className="flex items-center gap-2 text-sm"><Checkbox checked={langues.includes(l)} onCheckedChange={(v) => basculerLangue(l, !!v)} /> {l}</label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Button onClick={enregistrer} disabled={enCours}><Save className="h-4 w-4 mr-1" /> Enregistrer la fiche</Button>

            <div className="border-t pt-4">
              <div className="text-sm font-semibold mb-1 flex items-center gap-2"><KeyRound className="h-4 w-4" /> Nouveau mot de passe</div>
              <p className="text-xs text-muted-foreground mb-2">En cas d'oubli : choisis un nouveau mot de passe et communique-le à la personne.</p>
              <div className="grid gap-2 sm:grid-cols-3">
                <Input type="password" placeholder="Nouveau mot de passe" value={mdp.a} onChange={(e) => setMdp({ ...mdp, a: e.target.value })} />
                <Input type="password" placeholder="Confirmer" value={mdp.b} onChange={(e) => setMdp({ ...mdp, b: e.target.value })} />
                <Button variant="outline" onClick={changerMotDePasse} disabled={enCours || !mdp.a}>Changer le mot de passe</Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
