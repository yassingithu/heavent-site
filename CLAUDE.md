# Heavent — consignes pour Claude

- Répondre en français.
- Avant de livrer un nouvel écran ou une nouvelle fonctionnalité visible :
  1. faire relire par l'agent **ergonome-heavent** (facilité et logique d'utilisation) ;
  2. faire relire par l'agent **designer-heavent** (esthétique propre à Heavent et Nawar, rien de générique), avec **motion-heavent** pour le mouvement ;
  3. appliquer les points « Indispensable » ou les changements les plus forts, puis seulement après faire tester par **beta-testeur-heavent**.
- Nawar : des parfums **choisis par les mariés (ou les hôtes) pour leurs invités**, jamais « chacun compose son parfum ».
- Heavent City (le jeu) : tout changement de rendu, d'objets ou de scène passe par l'agent **3d-heavent-city**.
- Questions de métier (prestataires, prix, déroulé, logistique, contrats, recrutement de partenaires) : demander conseil à l'agent **event-manager-heavent** avant de décider. Heavent est une agence qui recrute des partenaires, jamais une plateforme.
- Bureau des agents (page privée `/bureau-prive`, réservée aux administrateurs, jamais liée ni indexée) : à chaque appel d'un agent (ergonome, designer, motion, beta, 3d, auditeur, event-manager), écrire une ligne dans la table `journal_agents` du projet Supabase `mapiwnsjsluiwmnulhqk` au début (`statut='en_cours'`) puis une autre à la fin (`'termine'` ou `'erreur'`), avec `agent` = ergonome | designer | motion | beta | 3d | auditeur | event-manager et `action` = une phrase courte en français. Les tâches automatiques (relances, securite, prospection) écrivent la leur.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- When graphify-out/graph.json exists, run `graphify query "<question>"` before your first grep, search or source-file read for a codebase question, and put this rule in every subagent prompt that explores code. Read raw files only for lines the graph or an earlier read already located. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- A committed graphify-out/graph.json is rewritten whole on every build, so a large diff to it in a pull request is expected. Do not flag it as churn or suggest skipping the graph rebuild or its hooks.
