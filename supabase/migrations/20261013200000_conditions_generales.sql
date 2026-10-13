-- Conditions générales imprimées en 2e page des devis et des contrats (modifiables dans « Infos agence »)
alter table public.parametres_agence
  add column if not exists cgv text,
  add column if not exists conditions_contrat text;

update public.parametres_agence set cgv = $cgv$Article 1 — Objet et formation du contrat
Les présentes conditions générales s'appliquent à toutes les prestations de Heavent People Agency (accueil, hôtes et hôtesses, staff événementiel, coordination et organisation d'événements et de mariages). La commande devient ferme à réception du devis daté et signé avec la mention « Bon pour accord » et du versement de l'acompte. Conformément à l'article 230 du Dahir des Obligations et des Contrats (DOC), le contrat ainsi formé tient lieu de loi entre les parties.

Article 2 — Prix
Les prix sont exprimés en dirhams hors taxes ; la TVA est appliquée au taux légal en vigueur. Toute heure effectuée au-delà de l'horaire prévu, tout déplacement hors de la ville de l'événement, ainsi que les repas et l'hébergement du personnel lorsqu'ils sont nécessaires, sont facturés en supplément selon les tarifs de l'agence.

Article 3 — Conditions de paiement
L'acompte indiqué sur le devis est payable à la commande ; le solde est payable à la fin de la prestation, sur facture. Pour les clients professionnels, les délais de paiement sont ceux prévus par la loi n° 15-95 formant Code de commerce, telle que modifiée par les lois n° 32-10 et n° 69-21 relatives aux délais de paiement : tout retard entraîne de plein droit l'application des pénalités de retard prévues par cette réglementation. L'agence se réserve le droit de suspendre toute prestation en cas d'impayé.

Article 4 — Modification et annulation par le client
Toute modification (dates, horaires, nombre de personnes) doit être notifiée par écrit et peut donner lieu à un devis rectificatif. En cas d'annulation par le client, à titre d'indemnité forfaitaire (clause pénale au sens de l'article 264 du DOC), restent dus : 30 % du montant TTC si l'annulation intervient plus de 30 jours avant l'événement ; 50 % entre 30 et 8 jours ; 100 % à moins de 8 jours. L'acompte versé reste acquis à l'agence et vient en déduction de ces sommes.

Article 5 — Obligations du client
Le client fournit des informations exactes et complètes sur l'événement. Il garantit au personnel des conditions de travail sûres et respectueuses (accès aux lieux, vestiaire, temps de pause, eau, et repas pour toute vacation supérieure à 6 heures). Il s'interdit de confier au personnel des tâches étrangères à la mission définie au devis, ainsi que tout comportement contraire à la dignité ou à la sécurité du personnel. Tout manquement autorise l'agence à retirer son personnel, la prestation restant intégralement due.

Article 6 — Personnel et non-sollicitation
Le personnel reste placé sous l'autorité et la responsabilité de l'agence, qui en est l'employeur. En cas d'absence, l'agence s'efforce de le remplacer par un profil équivalent. Le client s'interdit, pendant la mission et les 12 mois qui suivent, d'engager ou de faire travailler directement ou par un tiers le personnel présenté par l'agence ; à défaut, il versera une indemnité égale à trois mois de facturation de la prestation concernée.

Article 7 — Responsabilité
L'agence est tenue d'une obligation de moyens. Sa responsabilité ne saurait être engagée pour les dommages indirects, ni pour les biens, matériels ou valeurs confiés au personnel sans inventaire contradictoire. En tout état de cause, sa responsabilité est limitée au montant hors taxes de la prestation concernée. Le client demeure responsable de l'assurance du lieu, du matériel et du public de l'événement.

Article 8 — Force majeure
Conformément aux articles 268 et 269 du DOC, aucune des parties n'est responsable de l'inexécution de ses obligations résultant d'un cas de force majeure ou d'un cas fortuit (notamment décision des autorités, catastrophe, épidémie, intempéries graves). Les parties recherchent alors de bonne foi un report de la prestation ; les sommes correspondant aux frais déjà engagés restent dues.

Article 9 — Image et données personnelles
Les photos et informations du personnel transmises au client ne servent qu'à la sélection pour l'événement et ne peuvent être diffusées, conservées ni utilisées à d'autres fins. Les données personnelles sont traitées conformément à la loi n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel. Sauf refus écrit du client, l'agence peut mentionner l'événement à titre de référence.

Article 10 — Droit applicable et litiges
Les présentes conditions sont soumises au droit marocain. Pour les clients consommateurs, les dispositions de la loi n° 31-08 édictant des mesures de protection du consommateur s'appliquent. À défaut de règlement amiable, tout litige avec un client professionnel relève de la compétence exclusive du tribunal de commerce de Rabat.$cgv$
where id = 1 and cgv is null;

update public.parametres_agence set conditions_contrat = $cc$Article 1 — Cadre légal
Le présent contrat est un contrat de travail à durée déterminée conclu pour une mission ponctuelle liée à un événement, conformément à l'article 16 de la loi n° 65-99 relative au Code du travail. Il prend fin de plein droit à l'issue de la dernière date de mission, sans préavis ni indemnité de fin de contrat.

Article 2 — Présence et ponctualité
Le / la salarié(e) se présente à l'heure et au lieu fixés, en tenue conforme. Toute absence doit être signalée à l'agence au moins 48 heures à l'avance, sauf cas de force majeure dûment justifié. Une absence non justifiée ou un abandon de poste constitue une faute pouvant entraîner la rupture immédiate du contrat dans les conditions prévues par le Code du travail, et la seule rémunération due est celle des heures effectivement travaillées.

Article 3 — Tenue et comportement
Le / la salarié(e) respecte les consignes de l'agence et du responsable sur place, porte la tenue fournie ou indiquée et la restitue en bon état à la fin de la mission. Il / elle adopte en toutes circonstances une attitude courtoise et professionnelle. L'usage du téléphone personnel, la consommation d'alcool ou de tabac pendant le service sont interdits.

Article 4 — Confidentialité
Le / la salarié(e) s'engage à ne divulguer aucune information concernant le client, l'événement, ses participants ou ses invités, pendant et après la mission. Aucune photo ou vidéo de l'événement ne peut être prise ni publiée sur les réseaux sociaux sans l'accord écrit de l'agence.

Article 5 — Non-sollicitation
Pendant la mission et les 12 mois qui suivent, le / la salarié(e) s'interdit d'accepter directement d'un client présenté par l'agence une mission de même nature sans passer par l'agence.

Article 6 — Données personnelles et image
Les données personnelles du / de la salarié(e) sont traitées par l'agence pour la gestion de son dossier, de ses missions et de sa paie, conformément à la loi n° 09-08. Ses photos ne sont transmises aux clients que pour la sélection des profils. Il / elle dispose d'un droit d'accès, de rectification et d'opposition auprès de l'agence.

Article 7 — Rémunération et cotisations
La rémunération est versée mensuellement sur la base des heures effectivement travaillées, après retenue des cotisations sociales légales (CNSS, AMO). Une fiche de paie est remise pour chaque mois travaillé.$cc$
where id = 1 and conditions_contrat is null;
