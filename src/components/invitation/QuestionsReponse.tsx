import type { QuestionDef } from "@/lib/evenements";
import type { Langue } from "@/lib/invitation";

interface Props { questions: QuestionDef[]; langue: Langue; valeurs: Record<string, string>; onChange: (id: string, valeur: string) => void }

/** Questions ajoutées par l'hôte au formulaire de réponse : toutes facultatives, rien d'imposé à l'invité. */
export default function QuestionsReponse({ questions, langue, valeurs, onChange }: Props) {
  if (!questions.length) return null;
  return (
    <div className="inv-groupe" data-testid="questions-reponse">
      {questions.map((q) => {
        const libelle = q[langue];
        const aide = q.aide?.[langue];
        if (q.genre === "oui") {
          const oui = valeurs[q.id] === "oui";
          return <button key={q.id} type="button" className="inv-choix" aria-pressed={oui} onClick={() => onChange(q.id, oui ? "" : "oui")} data-testid={`question-${q.id}`}>{libelle}</button>;
        }
        return (
          <label key={q.id} className="inv-etiq"><span>{libelle}{aide ? ` · ${aide}` : ""}</span>
            {q.genre === "long"
              ? <textarea className="inv-champ" rows={2} maxLength={160} value={valeurs[q.id] ?? ""} onChange={(e) => onChange(q.id, e.target.value)} data-testid={`question-${q.id}`} />
              : <input className="inv-champ" maxLength={80} value={valeurs[q.id] ?? ""} onChange={(e) => onChange(q.id, e.target.value)} autoComplete="off" data-testid={`question-${q.id}`} />}
          </label>
        );
      })}
    </div>
  );
}
