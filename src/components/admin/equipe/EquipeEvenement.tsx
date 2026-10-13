import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileSignature, Plus, UserPlus, X } from "lucide-react";
import { CRENEAUX, Dispo, libelleDispo } from "@/components/admin/staff/PlanningDispos";
import { telechargerContrats } from "./contratPdf";
import { telechargerFichesProfil } from "@/components/admin/staff/FichesProfilStaff";

interface StaffMini { id: string; nom: string; prenom: string; ville: string | null; taux_horaire: number | null; genre?: string | null }
interface Affectation {
  id: string; staff_id: string; date_jour: string; heures: number; poste: string; taux_horaire: number;
  heure_debut: string | null; heure_fin: string | null; statut: string; contrat_id: string | null;
}
interface Props {
  devisId?: string;
  titre: string;
  lieu: string;
  dateDebut: string;
  dateFin: string;
}

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const jourFr = (s: string) => new Date(s + "T12:00:00").toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" });

/** Durée en heures entre deux horaires "HH:MM" (une fin à minuit ou après minuit compte sur le jour suivant). */
export function dureeHeures(debut: string, fin: string) {
  const m = (s: string) => { const [h, mi] = s.split(":").map(Number); return h * 60 + (mi || 0); };
  let d = m(fin) - m(debut);
  if (d <= 0) d += 24 * 60;
  return Math.round((d / 60) * 100) / 100;
}

export function datesEvenement(debut: string, fin: string) {
  if (!debut) return [];
  const res: string[] = [];
  const d = new Date(debut + "T12:00:00");
  const f = new Date((fin && fin >= debut ? fin : debut) + "T12:00:00");
  for (let i = 0; d <= f && i < 60; i++) { res.push(iso(d)); d.setDate(d.getDate() + 1); }
  return res;
}

export default function EquipeEvenement({ devisId, titre, lieu, dateDebut, dateFin }: Props) {
  const { toast } = useToast();
  const dates = useMemo(() => datesEvenement(dateDebut, dateFin), [dateDebut, dateFin]);
  const [jour, setJour] = useState<string>("");
  const [staff, setStaff] = useState<StaffMini[]>([]);
  const [dispos, setDispos] = useState<Dispo[]>([]);
  const [affects, setAffects] = useState<Affectation[]>([]);
  const [occupes, setOccupes] = useState<{ staff_id: string; date_jour: string; numero: string | null }[]>([]);
  const [ajoutManuel, setAjoutManuel] = useState("");
  const [enCours, setEnCours] = useState(false);
  const [horaireEquipe, setHoraireEquipe] = useState<{ debut: string | null; fin: string | null }>({ debut: null, fin: null });

  useEffect(() => { if (!dates.includes(jour)) setJour(dates[0] ?? ""); }, [dates, jour]);

  const charger = useCallback(async () => {
    if (!devisId || !dates.length) return;
    const [s, d, a, o] = await Promise.all([
      supabase.from("staff").select("id, nom, prenom, ville, taux_horaire, genre").eq("banni", false).order("nom"),
      supabase.from("disponibilites").select("*").in("date_jour", dates),
      supabase.from("affectations").select("*").eq("devis_id", devisId).order("date_jour"),
      supabase.from("affectations").select("staff_id, date_jour, devis(numero)").in("date_jour", dates).neq("devis_id", devisId).neq("statut", "annule"),
    ]);
    setStaff((s.data ?? []) as StaffMini[]);
    setDispos((d.data ?? []) as Dispo[]);
    setAffects((a.data ?? []) as Affectation[]);
    setOccupes(((o.data ?? []) as any[]).map((x) => ({ staff_id: x.staff_id, date_jour: x.date_jour, numero: x.devis?.numero ?? null })));
  }, [devisId, dates]);

  useEffect(() => { charger(); }, [charger]);

  const nomStaff = (id: string) => { const s = staff.find((x) => x.id === id); return s ? `${s.prenom} ${s.nom}` : "?"; };
  const affectesJour = new Set(affects.filter((a) => a.date_jour === jour).map((a) => a.staff_id));
  const disponiblesJour = useMemo(() => {
    const m = new Map<string, Dispo[]>();
    dispos.filter((d) => d.date_jour === jour && d.disponible).forEach((d) => m.set(d.staff_id, [...(m.get(d.staff_id) ?? []), d]));
    return [...m.entries()].filter(([id]) => !affectesJour.has(id) && staff.some((s) => s.id === id)).map(([id, ds]) => ({ id, ds }));
  }, [dispos, jour, affects, staff]); // eslint-disable-line react-hooks/exhaustive-deps

  const equipe = useMemo(() => {
    const m = new Map<string, Affectation[]>();
    affects.forEach((a) => m.set(a.staff_id, [...(m.get(a.staff_id) ?? []), a]));
    return [...m.entries()].map(([staff_id, lignes]) => ({ staff_id, lignes: lignes.sort((x, y) => x.date_jour.localeCompare(y.date_jour)) }))
      .sort((a, b) => nomStaff(a.staff_id).localeCompare(nomStaff(b.staff_id)));
  }, [affects, staff]); // eslint-disable-line react-hooks/exhaustive-deps

  const affecter = async (staffId: string, lesDates: string[]) => {
    if (!devisId) return;
    const s = staff.find((x) => x.id === staffId);
    const modele = affects.find((a) => a.staff_id === staffId);
    const rows = lesDates.filter((d) => !affects.some((a) => a.staff_id === staffId && a.date_jour === d)).map((d) => {
      const dispo = dispos.find((x) => x.staff_id === staffId && x.date_jour === d && x.disponible && !x.creneau && x.heure_debut);
      return {
        devis_id: devisId, staff_id: staffId, date_jour: d,
        poste: modele?.poste ?? (/^h(omme)?$/i.test(String(s?.genre ?? "").trim()) ? "Steward / hôte d'accueil" : /^f(emme)?$/i.test(String(s?.genre ?? "").trim()) ? "Hôtesse d'accueil" : "Hôte / hôtesse d'accueil"),
        heures: modele?.heures ?? 8,
        taux_horaire: modele?.taux_horaire ?? Number(s?.taux_horaire ?? 60),
        heure_debut: modele?.heure_debut ?? horaireEquipe.debut ?? dispo?.heure_debut ?? null,
        heure_fin: modele?.heure_fin ?? horaireEquipe.fin ?? dispo?.heure_fin ?? null,
        ...(modele || !horaireEquipe.debut || !horaireEquipe.fin ? {} : { heures: dureeHeures(horaireEquipe.debut, horaireEquipe.fin) }),
      };
    });
    if (!rows.length) return;
    const { error } = await supabase.from("affectations").insert(rows);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    await syncSilencieux(staffId);
    toast({ title: "Contrat à jour", description: `${s ? `${s.prenom} ${s.nom}` : "Personne"} ajouté(e) — contrat créé avec ses dates` });
    charger();
  };

  const retirer = async (id: string) => {
    const staffId = affects.find((a) => a.id === id)?.staff_id;
    const { error } = await supabase.from("affectations").delete().eq("id", id);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    if (staffId) await syncSilencieux(staffId);
    charger();
  };

  const majPersonne = async (staffId: string, patch: Partial<Affectation>) => {
    const { error } = await supabase.from("affectations").update(patch).eq("devis_id", devisId!).eq("staff_id", staffId);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    setAffects((l) => l.map((a) => (a.staff_id === staffId ? { ...a, ...patch } : a)));
    await syncSilencieux(staffId);
  };

  /** Horaires d'une personne : les heures par jour sont recalculées (ex. 16:00 → 00:00 = 8 h). */
  const changerHoraire = async (staffId: string, l: Affectation, debut: string, fin: string) => {
    if ((l.heure_debut?.slice(0, 5) ?? "") === debut && (l.heure_fin?.slice(0, 5) ?? "") === fin) return;
    const patch: Partial<Affectation> = { heure_debut: debut || null, heure_fin: fin || null };
    if (debut && fin) patch.heures = dureeHeures(debut, fin);
    await majPersonne(staffId, patch);
  };

  /** Applique les mêmes horaires à toute l'équipe (et aux personnes ajoutées ensuite). */
  const appliquerHoraireEquipe = async () => {
    const { debut, fin } = horaireEquipe;
    if (!devisId || !debut || !fin) return;
    const patch = { heure_debut: debut, heure_fin: fin, heures: dureeHeures(debut, fin) };
    const { error } = await supabase.from("affectations").update(patch).eq("devis_id", devisId);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    for (const { staff_id } of equipe) await syncSilencieux(staff_id);
    toast({ title: "Horaires appliqués", description: `${debut} – ${fin} (${patch.heures} h) pour toute l'équipe, contrats mis à jour` });
    charger();
  };

  /**
   * Crée, met à jour ou supprime le contrat d'une personne pour CET événement,
   * à partir de ses affectations (un contrat par personne et par événement, avec toutes ses dates).
   */
  const syncContrat = async (staffId: string): Promise<string | null> => {
    if (!devisId) return null;
    const [{ data: lignes }, { data: exist }, { data: dv }] = await Promise.all([
      supabase.from("affectations").select("*").eq("devis_id", devisId).eq("staff_id", staffId).neq("statut", "annule").order("date_jour"),
      supabase.from("contrats").select("id").eq("devis_id", devisId).eq("staff_id", staffId).maybeSingle(),
      supabase.from("devis").select("numero, titre").eq("id", devisId).maybeSingle(),
    ]);
    const actives = (lignes ?? []) as Affectation[];
    if (!actives.length) {
      if (exist) await supabase.from("contrats").delete().eq("id", exist.id);
      return null;
    }
    const total = actives.reduce((t, l) => t + Number(l.heures), 0);
    const brut = Math.round(actives.reduce((t, l) => t + Number(l.heures) * Number(l.taux_horaire), 0) * 100) / 100;
    const contrat = {
      staff_id: staffId, devis_id: devisId, titre: actives[0].poste, type_contrat: "cdd",
      date_debut: actives[0].date_jour, date_fin: actives[actives.length - 1].date_jour,
      dates: actives.map((l) => ({ date: l.date_jour, heures: Number(l.heures), heure_debut: l.heure_debut, heure_fin: l.heure_fin })),
      heures_prestations: Math.round(total), total_heures: total, taux_horaire: Number(actives[0].taux_horaire), salaire_brut: brut,
      lieu: lieu || null, description: `Mission : ${titre || "événement"}`, statut: "actif",
      evenement: titre || dv?.titre || null, devis_numero: dv?.numero ?? null,
    };
    const res = exist
      ? await supabase.from("contrats").update(contrat).eq("id", exist.id).select("id").single()
      : await supabase.from("contrats").insert(contrat).select("id").single();
    if (res.error) throw res.error;
    await supabase.from("affectations").update({ contrat_id: res.data.id }).eq("devis_id", devisId).eq("staff_id", staffId);
    return res.data.id;
  };

  const syncSilencieux = async (staffId: string) => {
    try { await syncContrat(staffId); } catch (e: any) { toast({ title: "Contrat non mis à jour", description: e.message, variant: "destructive" }); }
  };

  /** Met à jour tous les contrats de l'événement et renvoie leurs identifiants. */
  const genererContrats = async (): Promise<string[]> => {
    if (!devisId) return [];
    setEnCours(true);
    try {
      const ids: string[] = [];
      for (const { staff_id } of equipe) {
        const id = await syncContrat(staff_id);
        if (id) ids.push(id);
      }
      return ids;
    } catch (e: any) {
      toast({ title: "Erreur", description: e.message ?? "Contrats non générés", variant: "destructive" });
      return [];
    } finally {
      setEnCours(false);
    }
  };

  const telechargerTous = async () => {
    const ids = await genererContrats();
    if (!ids.length) return;
    setEnCours(true);
    try { await telechargerContrats(ids); } finally { setEnCours(false); }
  };

  const telechargerUn = async (staffId: string) => {
    const ids = await genererContrats();
    const { data } = await supabase.from("contrats").select("id").eq("devis_id", devisId!).eq("staff_id", staffId).maybeSingle();
    if (!ids.length || !data) return;
    setEnCours(true);
    try { await telechargerContrats([data.id]); } finally { setEnCours(false); }
  };

  if (!devisId) {
    return <Card><CardHeader><CardTitle className="text-base">Équipe de l'événement</CardTitle></CardHeader>
      <CardContent className="text-sm text-muted-foreground">Enregistre d'abord le devis pour voir qui est disponible et constituer l'équipe.</CardContent></Card>;
  }
  if (!dates.length) {
    return <Card><CardHeader><CardTitle className="text-base">Équipe de l'événement</CardTitle></CardHeader>
      <CardContent className="text-sm text-muted-foreground">Indique la date de l'événement (et la date de fin s'il dure plusieurs jours) pour voir les disponibilités.</CardContent></Card>;
  }

  const sansAffectation = staff.filter((s) => !affectesJour.has(s.id));

  return (
    <Card>
      <CardHeader className="space-y-3">
        <CardTitle className="text-base">Équipe de l'événement</CardTitle>
        <div className="flex flex-wrap gap-1">
          {dates.map((d) => {
            const n = affects.filter((a) => a.date_jour === d).length;
            return (
              <Button key={d} size="sm" variant={d === jour ? "default" : "outline"} onClick={() => setJour(d)}>
                {jourFr(d)} {n > 0 && <Badge variant="secondary" className="ml-1">{n}</Badge>}
              </Button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <div className="text-sm font-medium mb-2">Disponibles le {jourFr(jour)} ({disponiblesJour.length})</div>
          {disponiblesJour.length === 0 ? (
            <p className="text-sm text-muted-foreground">Personne n'a indiqué de disponibilité ce jour-là. Tu peux quand même ajouter quelqu'un ci-dessous.</p>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2">
              {disponiblesJour.map(({ id, ds }) => {
                const occ = occupes.filter((o) => o.staff_id === id && o.date_jour === jour);
                return (
                  <div key={id} className="flex items-center justify-between gap-2 border rounded-md p-2">
                    <div className="min-w-0">
                      <div className="font-medium truncate">{nomStaff(id)}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {ds.map((d) => <span key={d.id} className={`text-xs px-1.5 rounded ${d.creneau ? CRENEAUX[d.creneau]?.classe : "bg-emerald-100 text-emerald-900"}`}>{libelleDispo(d)}</span>)}
                        {occ.map((o, i) => <span key={i} className="text-xs px-1.5 rounded bg-red-100 text-red-800">Déjà sur {o.numero ?? "un autre événement"}</span>)}
                      </div>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <Button size="sm" variant="outline" title="Ajouter à ce jour" onClick={() => affecter(id, [jour])}><UserPlus className="h-4 w-4" /></Button>
                      {dates.length > 1 && <Button size="sm" variant="ghost" title="Ajouter à toutes les dates" onClick={() => affecter(id, dates)}>Toutes</Button>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="flex gap-2 mt-3">
            <Select value={ajoutManuel} onValueChange={setAjoutManuel}>
              <SelectTrigger className="max-w-xs"><SelectValue placeholder="Ajouter une autre personne…" /></SelectTrigger>
              <SelectContent>{sansAffectation.map((s) => <SelectItem key={s.id} value={s.id}>{s.prenom} {s.nom}</SelectItem>)}</SelectContent>
            </Select>
            <Button variant="outline" disabled={!ajoutManuel} onClick={() => { affecter(ajoutManuel, [jour]); setAjoutManuel(""); }}><Plus className="h-4 w-4 mr-1" /> Ce jour</Button>
          </div>
        </div>

        <div className="flex flex-wrap items-end gap-2 rounded-md bg-[#FAF7EE] border border-[#ece6d3] p-3">
          <div className="text-sm font-medium w-full">Horaires de l'équipe</div>
          <div className="flex items-center gap-1 text-xs">De <Input className="h-8 w-28" type="time" value={horaireEquipe.debut ?? ""} onChange={(e) => setHoraireEquipe((h) => ({ ...h, debut: e.target.value || null }))} /></div>
          <div className="flex items-center gap-1 text-xs">à <Input className="h-8 w-28" type="time" value={horaireEquipe.fin ?? ""} onChange={(e) => setHoraireEquipe((h) => ({ ...h, fin: e.target.value || null }))} /></div>
          {horaireEquipe.debut && horaireEquipe.fin && <span className="text-xs text-muted-foreground">= {dureeHeures(horaireEquipe.debut, horaireEquipe.fin)} h / jour</span>}
          <Button size="sm" variant="outline" disabled={!horaireEquipe.debut || !horaireEquipe.fin || !equipe.length} onClick={appliquerHoraireEquipe}>Appliquer à toute l'équipe</Button>
        </div>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="text-sm font-medium">Équipe retenue ({equipe.length} personne{equipe.length > 1 ? "s" : ""})</div>
            {equipe.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" disabled={enCours} onClick={() => telechargerFichesProfil(equipe.map((e) => e.staff_id))}><Download className="h-4 w-4 mr-1" /> Fiches profil</Button>
                <Button size="sm" disabled={enCours} onClick={telechargerTous}><FileSignature className="h-4 w-4 mr-1" /> {enCours ? "Création…" : "Contrats (PDF)"}</Button>
              </div>
            )}
          </div>
          {equipe.length === 0 ? (
            <p className="text-sm text-muted-foreground">Personne pour l'instant.</p>
          ) : (
            <div className="space-y-2">
              {equipe.map(({ staff_id, lignes }) => (
                <div key={staff_id} className="border rounded-md p-3 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-medium">{nomStaff(staff_id)}</div>
                    <Button size="sm" variant="ghost" disabled={enCours} onClick={() => telechargerUn(staff_id)}><FileSignature className="h-4 w-4 mr-1" /> Contrat</Button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {lignes.map((l) => (
                      <span key={l.id} className="inline-flex items-center gap-1 text-xs bg-[#FAF7EE] border border-[#ece6d3] rounded px-2 py-0.5">
                        {jourFr(l.date_jour)}
                        <button className="text-muted-foreground hover:text-red-600" title="Retirer cette date" onClick={() => retirer(l.id)}><X className="h-3 w-3" /></button>
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    <Input className="h-8 col-span-2 sm:col-span-1" defaultValue={lignes[0].poste} onBlur={(e) => e.target.value !== lignes[0].poste && majPersonne(staff_id, { poste: e.target.value })} title="Poste (ex. Hôtesse, Steward)" />
                    <div className="flex items-center gap-1 text-xs" title="Heure de début">De <Input key={`d${lignes[0].heure_debut}`} className="h-8" type="time" defaultValue={lignes[0].heure_debut?.slice(0, 5) ?? ""} onBlur={(e) => changerHoraire(staff_id, lignes[0], e.target.value, lignes[0].heure_fin?.slice(0, 5) ?? "")} /></div>
                    <div className="flex items-center gap-1 text-xs" title="Heure de fin">à <Input key={`f${lignes[0].heure_fin}`} className="h-8" type="time" defaultValue={lignes[0].heure_fin?.slice(0, 5) ?? ""} onBlur={(e) => changerHoraire(staff_id, lignes[0], lignes[0].heure_debut?.slice(0, 5) ?? "", e.target.value)} /></div>
                    <div className="flex items-center gap-1 text-xs"><Input key={`h${lignes[0].heures}`} className="h-8" type="number" min={0} step="0.5" defaultValue={lignes[0].heures} onBlur={(e) => Number(e.target.value) !== Number(lignes[0].heures) && majPersonne(staff_id, { heures: Number(e.target.value) })} /> h / jour</div>
                    <div className="flex items-center gap-1 text-xs"><Input className="h-8" type="number" min={0} step="1" defaultValue={lignes[0].taux_horaire} onBlur={(e) => Number(e.target.value) !== Number(lignes[0].taux_horaire) && majPersonne(staff_id, { taux_horaire: Number(e.target.value) })} /> MAD/h</div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Payé au staff : {Math.round(lignes.reduce((t, l) => t + Number(l.heures) * Number(l.taux_horaire), 0))} MAD brut ({lignes.reduce((t, l) => t + Number(l.heures), 0)} h)
                  </div>
                </div>
              ))}
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-2">
            Le contrat se crée automatiquement dès qu'une personne est ajoutée (un contrat par personne et par événement, avec toutes ses dates) et se met à jour à chaque changement. Les heures et le taux horaire (payé au staff) servent aussi à la fiche de paie du mois.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
