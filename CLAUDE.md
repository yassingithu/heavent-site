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
