import "@/styles/onglets-occasion.css";
import { GROUPES, evenementDe, type TypeEvenement } from "@/lib/evenements";
import { modeleDe } from "@/lib/invitation";

interface Props { valeur?: TypeEvenement; onChoisir: (id: TypeEvenement) => void; onglets?: boolean }

const ORDRE = ["mariage", "fiancailles", "naissance", "anniversaire", "baby-shower", "fete"];
const COURT: Record<string, string> = { fiancailles: "Fiançailles & henné", naissance: "Baptême & naissance", fete: "Iftar & diplôme" };

/** Choix de l'occasion : une liste de grandes lignes (nom en grand, filet or, une phrase). L'anniversaire se précise ensuite : adulte ou enfant. */
export default function ChoixOccasion({ valeur, onChoisir, onglets }: Props) {
  const actuel = evenementDe(valeur);
  if (onglets) {
    const liste = [...GROUPES].sort((a, b) => (ORDRE.indexOf(a.groupe) + 99) % 99 - (ORDRE.indexOf(b.groupe) + 99) % 99);
    const g = liste.find((x) => x.groupe === actuel.groupe) ?? liste[0];
    return (
      <section data-testid="choix-occasion" className="cartes-onglets">
        <div className="cartes-onglets-liste" role="tablist" aria-label="Occasion">
          {liste.map(({ groupe, evenements }) => {
            const choisi = actuel.groupe === groupe;
            return (
              <button key={groupe} type="button" role="tab" id={`onglet-${groupe}`} aria-selected={choisi} aria-controls="occasion-panneau" tabIndex={choisi ? 0 : -1}
                data-testid={`occasion-${groupe}`} onClick={() => onChoisir(choisi ? actuel.id : evenements[0].id)}
                onKeyDown={(e) => { const i = liste.findIndex((x) => x.groupe === groupe); const n = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null; if (n === null) return; e.preventDefault(); const c = liste[(n + liste.length) % liste.length]; onChoisir(c.evenements[0].id); requestAnimationFrame(() => document.getElementById(`onglet-${c.groupe}`)?.focus()); }}>
                {COURT[groupe] ?? evenements[0].groupeNom}
              </button>
            );
          })}
        </div>
        <div key={g.groupe} id="occasion-panneau" role="tabpanel" aria-labelledby={`onglet-${g.groupe}`} className="cartes-onglets-panneau">
          <p>{g.evenements[0].description}</p>
          {g.evenements.length > 1 && (
            <div className="flex flex-wrap gap-2" role="group" aria-label="Précision">
              {g.evenements.map((e) => (
                <button key={e.id} type="button" onClick={() => onChoisir(e.id)} aria-pressed={actuel.id === e.id} data-testid={`occasion-precis-${e.id}`}
                  className={`rounded-full border px-4 min-h-10 text-sm ${actuel.id === e.id ? "border-[#141414] bg-[#141414] text-white" : "border-[#E3D6BA] bg-white hover:border-[#C8B560]"}`}>{e.sous}</button>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }
  return (
    <section data-testid="choix-occasion">
      <h3 className="font-serif text-xl mb-1">L'occasion</h3>
      <p className="text-sm text-[#5E554A] mb-3">Elle règle les textes, les modèles proposés et les questions posées à vos invités.</p>
      <ul className="divide-y divide-[#EADFC8] border-y border-[#EADFC8]" role="group" aria-label="Occasion">
        {GROUPES.map(({ groupe, evenements }) => {
          const choisi = actuel.groupe === groupe;
          const premier = evenements[0];
          const accent = modeleDe(premier.modele).couleurs;
          return (
            <li key={groupe}>
              <button type="button" onClick={() => onChoisir(choisi ? actuel.id : premier.id)} aria-pressed={choisi} data-testid={`occasion-${groupe}`}
                className="group flex w-full items-center gap-3 py-3 text-left min-h-14">
                <span className="h-9 w-1 shrink-0 rounded-full" style={{ background: `linear-gradient(${accent.enveloppe}, ${accent.accent})` }} aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className={`block font-serif text-lg leading-tight ${choisi ? "text-[#8C6D22]" : ""}`}>{premier.groupeNom}</span>
                  <span className="block text-xs text-[#6B6154]">{premier.description}</span>
                </span>
                {choisi && <span className="grid h-6 w-6 place-items-center rounded-full bg-[#141414] text-[#E4D49A] text-xs" aria-hidden="true">✓</span>}
              </button>
              {choisi && evenements.length > 1 && (
                <div className="flex flex-wrap gap-2 pb-3 pl-4" role="group" aria-label="Précision">
                  {evenements.map((e) => (
                    <button key={e.id} type="button" onClick={() => onChoisir(e.id)} aria-pressed={actuel.id === e.id} data-testid={`occasion-precis-${e.id}`}
                      className={`rounded-full border px-4 min-h-10 text-sm ${actuel.id === e.id ? "border-[#141414] bg-[#141414] text-white" : "border-[#E3D6BA] bg-white hover:border-[#C8B560]"}`}>{e.sous}</button>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
