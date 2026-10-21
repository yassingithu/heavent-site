// Bibliothèque d'idées de posts Instagram, pour générer un mois de publications (2 par jour) en un clic.
// Chaque idée : thème, accroche (petit texte doré), titre (sur le visuel), conseil (légende), recherche Pixabay.
import { GUIDES, lienGuide } from "@/data/guides";

export type Compte = "heavent" | "nawar";
export interface Idee { theme: string; accroche: string; titre: string; conseil: string; recherche: string }

const H = (theme: string, accroche: string, titre: string, conseil: string, recherche: string): Idee => ({ theme, accroche, titre, conseil, recherche });

export const IDEES_HEAVENT: Idee[] = [
  // Mariage
  H("mariage", "Conseil mariage", "Réservez votre lieu 12 mois avant la date", "Les plus beaux lieux partent vite, surtout entre mai et septembre. Fixez la date et le lieu en premier : tout le reste en découle.", "wedding venue"),
  H("mariage", "Conseil mariage", "Le secret d'un accueil inoubliable", "Les premières minutes donnent le ton : hôtesses souriantes, vestiaire, boisson de bienvenue et placement fluide. Vos invités s'en souviendront.", "wedding reception"),
  H("mariage", "Conseil mariage", "Faites un plan de table sans stress", "Regroupez par affinités, éloignez les tensions, placez les aînés près de la piste mais loin des enceintes. Et validez-le une semaine avant.", "wedding table"),
  H("mariage", "Conseil mariage", "Le budget mariage en 5 postes clés", "Lieu, traiteur, décoration, musique, photo/vidéo : ces cinq postes font l'essentiel du budget. Fixez une enveloppe pour chacun dès le départ.", "wedding flowers"),
  H("mariage", "Conseil mariage", "Pourquoi un rétroplanning change tout", "Un calendrier semaine par semaine évite les oublis et les décisions de dernière minute. On vous en prépare un sur mesure.", "wedding planner"),
  H("mariage", "Conseil mariage", "Négafa : comment bien la choisir", "Demandez à voir les tenues en vrai, le nombre de changements inclus et l'équipe présente le jour J. Réservez-la tôt : les meilleures sont prises.", "moroccan wedding"),
  H("mariage", "Conseil mariage", "La musique qui fait danser tout le monde", "Alternez les générations : chaâbi, classiques internationaux, tubes du moment. Un bon DJ lit la salle et s'adapte en direct.", "wedding dance"),
  H("mariage", "Conseil mariage", "Le jour J sans stress pour les mariés", "Confiez la coordination à une seule personne : fournisseurs, horaires, imprévus. Vous, vous profitez.", "bride groom"),
  H("mariage", "Conseil mariage", "La décoration florale qui sublime la salle", "Choisissez 2 ou 3 fleurs et une palette de couleurs, puis répétez-les partout : tables, entrée, scène. L'harmonie fait l'élégance.", "wedding decoration"),
  H("mariage", "Conseil mariage", "Photographe : 3 questions à poser", "Combien d'heures de présence ? Combien de photos livrées et en combien de temps ? Peut-on voir un mariage complet, pas seulement les meilleures images ?", "wedding photographer"),
  H("mariage", "Conseil mariage", "Pièce montée ou buffet de desserts ?", "La pièce montée fait le moment fort, le buffet de desserts régale tout le monde. Pourquoi pas les deux, en version plus petite ?", "wedding cake"),
  H("mariage", "Conseil mariage", "Pensez au confort de vos invités", "Navettes, parking, vestiaire, coin enfants, eau à disposition : ces détails pratiques font un mariage réussi.", "wedding guests"),
  // Naissance
  H("naissance", "Baby shower", "Une baby shower élégante en 5 étapes", "Un thème, une palette douce, un bar à desserts, deux animations et un joli coin photo : c'est tout ce qu'il faut.", "baby shower"),
  H("naissance", "Baby shower", "Le coin photo que tout le monde adore", "Une arche de ballons, une lumière douce et quelques accessoires : vos invités repartent avec des souvenirs.", "baby shower balloons"),
  H("naissance", "Naissance", "Organiser l'aqiqa sereinement", "Prévoyez le lieu, le traiteur et l'accueil des invités à l'avance : la maman doit pouvoir se reposer et profiter.", "newborn baby"),
  H("naissance", "Baby shower", "Gender reveal : 3 idées originales", "Ballon géant, gâteau surprise ou fumigènes colorés : choisissez le moment et préparez la vidéo !", "gender reveal"),
  H("naissance", "Baby shower", "Les jeux qui amusent vraiment", "Deviner la date de naissance, la photo de bébé des invités, le quiz des parents : simples, drôles, sans gêner personne.", "baby party"),
  H("naissance", "Naissance", "Des cadeaux d'invités qui marquent", "Mini confitures, bougies parfumées, dragées personnalisées : un petit souvenir élégant fait toujours plaisir.", "baby gift"),
  H("naissance", "Baby shower", "Pastel, beige ou couleurs vives ?", "Le pastel reste un classique, le beige naturel est très tendance, les couleurs vives donnent de l'énergie. Choisissez ce qui vous ressemble.", "pastel decoration"),
  H("naissance", "Baby shower", "Le bar à desserts parfait", "Trois hauteurs, deux couleurs, des étiquettes : un bar à desserts bien présenté devient la décoration principale.", "dessert table"),
  H("naissance", "Naissance", "Le bon moment pour la célébration", "Après la naissance, laissez passer quelques semaines : la maman sera reposée et bébé plus habitué au monde.", "baby feet"),
  H("naissance", "Baby shower", "Surprise ou pas surprise ?", "Une surprise émeut, mais vérifiez discrètement la date avec le conjoint pour éviter les mauvaises surprises !", "surprise party"),
  H("naissance", "Baby shower", "Le livre d'or qui deviendra un trésor", "Demandez à chaque invité un conseil ou un vœu pour bébé : un souvenir à relire dans quelques années.", "guest book"),
  H("naissance", "Naissance", "Accueillir les invités chez soi sans s'épuiser", "Une hôtesse pour l'accueil et le service, et vous restez avec vos proches au lieu de courir en cuisine.", "family celebration"),
  // Fêtes
  H("fete", "Fiançailles", "Une soirée de henné inoubliable", "Lumières tamisées, tenues traditionnelles, musique et une négafa expérimentée : la magie opère.", "henna"),
  H("fete", "Fêtes", "Anniversaire : surprendre sans se ruiner", "Un lieu qui a du caractère, une belle table et une playlist soignée valent mieux qu'une grosse dépense.", "birthday party"),
  H("fete", "Fiançailles", "Le dress code qui donne le ton", "Indiquez-le clairement sur l'invitation : vos photos seront harmonieuses et vos invités à l'aise.", "elegant party"),
  H("fete", "Fêtes", "Réussir une fête en plein air", "Prévoyez toujours un plan B (tente, salle de repli), de l'éclairage et des moustiquaires en été.", "outdoor party"),
  H("fete", "Fêtes", "Réception à la maison : les bons réflexes", "Libérez de la place, pensez aux toilettes et au vestiaire, et confiez le service : vous profitez de vos invités.", "home party"),
  H("fete", "Fiançailles", "Les fiançailles en 4 temps forts", "L'arrivée, la demande, la bague, la fête : préparez chaque moment et laissez le photographe les capturer.", "engagement ring"),
  H("fete", "Fêtes", "Une table qui fait waouh", "Nappe unie, chemin de table, bougies à différentes hauteurs, fleurs basses pour qu'on se voie : simple et élégant.", "table setting"),
  H("fete", "Fêtes", "Combien d'hôtesses pour votre réception ?", "Comptez environ une hôtesse pour 40 à 50 invités pour l'accueil et le service, davantage s'il y a un vestiaire.", "party hostess"),
  H("fete", "Fêtes", "La playlist qui ne déçoit jamais", "Commencez doux pendant l'apéritif, montez progressivement, gardez les tubes pour le moment où tout le monde est là.", "party music"),
  H("fete", "Fiançailles", "Annonce des fiançailles : soignez l'invitation", "Une belle invitation donne envie de venir : papier, typographie, informations claires et réponse attendue.", "invitation card"),
  H("fete", "Fêtes", "Le timing idéal d'une soirée", "Accueil, apéritif, repas, gâteau, danse : annoncez le programme et respectez-le, l'ambiance suivra.", "evening celebration"),
  H("fete", "Fêtes", "Les petits détails qui changent tout", "Une bougie parfumée à l'entrée, un mot d'accueil, une serviette pliée avec soin : c'est ce dont on se souvient.", "luxury details"),
  // Entreprise
  H("entreprise", "Événement d'entreprise", "Réussir l'accueil de votre salon", "Des hôtesses bilingues, un badge prêt à l'arrivée et une orientation claire : votre stand marque des points dès la première minute.", "conference"),
  H("entreprise", "Événement d'entreprise", "Séminaire : l'organisation en 6 étapes", "Objectif, budget, lieu, programme, logistique, suivi : un séminaire réussi se prépare 2 à 3 mois à l'avance.", "business meeting"),
  H("entreprise", "Événement d'entreprise", "Lancement de produit : créer l'effet waouh", "Une mise en scène, un moment de révélation, des hôtesses qui guident : vos invités deviennent vos ambassadeurs.", "product launch"),
  H("entreprise", "Événement d'entreprise", "Soirée de gala : les codes de l'élégance", "Dress code, placement, animation, discours courts : le gala valorise votre marque autant que vos équipes.", "gala dinner"),
  H("entreprise", "Événement d'entreprise", "Hôtesses bilingues : pourquoi c'est clé", "Vos visiteurs étrangers se sentent accueillis dans leur langue : français, anglais, arabe, espagnol selon vos besoins.", "hostess"),
  H("entreprise", "Événement d'entreprise", "Team building qui crée vraiment du lien", "Choisissez une activité où tout le monde peut participer, quel que soit l'âge ou la condition physique.", "team building"),
  H("entreprise", "Événement d'entreprise", "Congrès : fluidifier les inscriptions", "Badges préparés, files séparées, hôtesses mobiles : on évite les attentes et la première impression est réussie.", "registration desk"),
  H("entreprise", "Événement d'entreprise", "Le stand qui attire les visiteurs", "Un espace ouvert, une animation, une hôtesse à l'avant du stand plutôt que derrière une table : la différence est nette.", "exhibition stand"),
  H("entreprise", "Événement d'entreprise", "Vos invités VIP méritent un accueil VIP", "Accueil personnalisé, accompagnement jusqu'à la place, attention aux détails : vos partenaires le remarquent.", "vip event"),
  H("entreprise", "Événement d'entreprise", "Mesurer le succès d'un événement", "Nombre de participants, contacts récoltés, retours à chaud, retombées : définissez vos indicateurs avant l'événement.", "business event"),
  H("entreprise", "Événement d'entreprise", "La fin d'année qui motive vos équipes", "Une belle soirée, un mot de la direction, des récompenses : un investissement qui renforce la cohésion.", "corporate party"),
  H("entreprise", "Événement d'entreprise", "Briefer ses hôtesses comme un pro", "Programme, plan des lieux, interlocuteurs, questions fréquentes : un brief clair fait toute la différence.", "event staff"),
];

export const IDEES_NAWAR: Idee[] = [
  H("parfum", "Bar à parfums", "Un parfum unique pour chaque invité", "Avec Nawar, chaque invité compose son propre flacon à partir de nos essences : un souvenir personnel qu'il emporte chez lui.", "perfume bottle"),
  H("parfum", "Bar à parfums", "Le cadeau d'invité dont on se souvient", "Fini les dragées oubliées : un parfum créé sur place, c'est un souvenir qui dure des semaines.", "perfume gift"),
  H("parfum", "Mariage", "Votre mariage a désormais un parfum", "Le bar à parfums Nawar devient l'animation élégante de votre soirée, entre deux danses.", "wedding perfume"),
  H("parfum", "Conseil parfum", "Notes de tête, de cœur et de fond", "La tête s'envole en quelques minutes, le cœur dure quelques heures, le fond reste toute la journée. Un bon parfum équilibre les trois.", "perfume ingredients"),
  H("parfum", "Conseil parfum", "Où appliquer son parfum ?", "Poignets, cou, derrière les oreilles : là où le pouls bat, la chaleur révèle les notes. Et sans frotter !", "perfume spray"),
  H("parfum", "Conseil parfum", "L'oud, trésor de l'Orient", "Boisé, profond, envoûtant : l'oud est l'âme des parfums orientaux. Il se marie merveilleusement avec la rose.", "oud wood"),
  H("parfum", "Conseil parfum", "La rose de Damas, reine des fleurs", "Délicate et puissante à la fois, elle apporte élégance et romantisme à toutes les compositions.", "damask rose"),
  H("parfum", "Entreprise", "Un bar à parfums pour vos événements d'entreprise", "Séminaire, lancement, soirée de gala : offrez à vos invités une expérience sensorielle à l'image de votre marque.", "luxury event"),
  H("parfum", "Conseil parfum", "Le musc blanc, douceur absolue", "Propre, doux, enveloppant : le musc blanc est parfait pour ceux qui aiment les parfums discrets et raffinés.", "white flowers"),
  H("parfum", "Bar à parfums", "Comment se passe un atelier Nawar ?", "Nos parfumeurs accueillent vos invités, les guident à travers les essences et les aident à créer leur parfum en quelques minutes.", "perfume workshop"),
  H("parfum", "Conseil parfum", "Bien conserver son parfum", "À l'abri de la lumière, de la chaleur et de l'humidité : évitez la salle de bain, préférez un tiroir de la chambre.", "perfume collection"),
  H("parfum", "Fiançailles", "Une touche parfumée pour vos fiançailles", "Le bar à parfums sublime l'ambiance et ravit vos invités : un moment de partage autour des senteurs.", "engagement party"),
  H("parfum", "Conseil parfum", "L'ambre, chaleur et sensualité", "Résineuse et légèrement sucrée, l'ambre réchauffe une composition et la fait durer sur la peau.", "amber"),
  H("parfum", "Conseil parfum", "Parfum d'été ou parfum d'hiver ?", "En été, place aux notes fraîches et florales. En hiver, osez les boisés, l'oud et la vanille.", "summer flowers"),
  H("parfum", "Baby shower", "Un bar à parfums pour une baby shower", "Des notes douces et florales pour une fête toute en délicatesse : vos invitées repartent avec leur création.", "baby shower"),
  H("parfum", "Conseil parfum", "Le jasmin, l'élégance marocaine", "Le jasmin évoque les jardins et les soirées d'été : solaire, floral, inoubliable.", "jasmine flower"),
  H("parfum", "Bar à parfums", "Des flacons à votre image", "Flacons élégants, étiquettes personnalisées avec vos prénoms et la date : le souvenir parfait de votre événement.", "glass bottle"),
  H("parfum", "Conseil parfum", "Combien de pulvérisations ?", "Deux à trois suffisent pour une eau de parfum. Le parfum doit se découvrir de près, pas annoncer votre arrivée.", "fragrance"),
  H("parfum", "Conseil parfum", "La fleur d'oranger, douceur de chez nous", "Lumineuse, légèrement miellée, elle rappelle les souvenirs d'enfance et les fêtes de famille.", "orange blossom"),
  H("parfum", "Entreprise", "Un parfum signature pour votre marque", "Associez un parfum à votre événement ou à votre marque : vos invités s'en souviendront à chaque fois qu'ils le porteront.", "corporate gift"),
  H("parfum", "Conseil parfum", "Le santal, le bois crémeux", "Doux, laiteux et boisé, le santal apporte rondeur et tenue à une composition.", "sandalwood"),
  H("parfum", "Bar à parfums", "Une animation qui rassemble", "Autour du bar à parfums, les invités échangent, comparent, sentent : une animation qui crée du lien naturellement.", "people celebrating"),
  H("parfum", "Conseil parfum", "Le cuir, audacieux et chic", "Une note de caractère, souvent associée aux bois et aux épices, pour des parfums qui ne passent pas inaperçus.", "leather"),
  H("parfum", "Conseil parfum", "Pourquoi un parfum change selon la peau", "Chaque peau a sa chimie : le même parfum peut sentir différemment sur deux personnes. D'où l'intérêt de le créer sur soi.", "skin care"),
  H("parfum", "Mariage", "Les mariés ont leur propre parfum", "Créez votre parfum de mariage en amont : il deviendra le souvenir olfactif de votre plus beau jour.", "bride"),
  H("parfum", "Conseil parfum", "Le bergamote, fraîcheur pétillante", "Agrume élégant, la bergamote illumine les notes de tête et donne de la fraîcheur à toutes les compositions.", "citrus"),
  H("parfum", "Bar à parfums", "Un bar à parfums dans toutes les villes", "Rabat, Casablanca, Marrakech et partout au Maroc : Nawar se déplace avec ses parfumeurs et ses essences.", "morocco"),
  H("parfum", "Conseil parfum", "La vanille, gourmandise et confort", "Ronde, chaleureuse, rassurante : la vanille adoucit les compositions orientales et boisées.", "vanilla"),
  H("parfum", "Conseil parfum", "Superposer les parfums : l'art du layering", "Un musc en base, une rose par-dessus : superposer deux parfums permet de créer une signature unique.", "perfume layering"),
  H("parfum", "Bar à parfums", "Combien d'invités pour un bar à parfums ?", "De 50 à plusieurs centaines d'invités : nous adaptons le nombre de parfumeurs et d'essences à votre événement.", "elegant party"),
  H("parfum", "Conseil parfum", "Le patchouli, terreux et élégant", "Longtemps mal aimé, le patchouli moderne est raffiné et apporte de la profondeur aux parfums chics.", "patchouli"),
  H("parfum", "Fêtes", "Un anniversaire qui sent bon", "Pour un anniversaire marquant, le bar à parfums offre un moment chic et original à tous les invités.", "birthday celebration"),
  H("parfum", "Conseil parfum", "Le safran, épice précieuse", "Chaud, cuiré et lumineux, le safran donne aux parfums orientaux leur éclat doré.", "saffron"),
  H("parfum", "Bar à parfums", "Nos essences venues du monde entier", "Oud, rose, jasmin, ambre, musc, vanille : une palette riche pour que chacun trouve son parfum.", "essential oils"),
  H("parfum", "Conseil parfum", "Eau de toilette ou eau de parfum ?", "L'eau de parfum est plus concentrée et tient plus longtemps. L'eau de toilette est plus légère, idéale le jour.", "perfume"),
  H("parfum", "Entreprise", "Offrez une expérience, pas un objet", "Vos clients et collaborateurs garderont en mémoire le moment vécu autour du bar à parfums.", "business gift"),
  H("parfum", "Conseil parfum", "L'iris, la poudre élégante", "Poudré, doux, sophistiqué : l'iris est l'une des matières les plus précieuses de la parfumerie.", "iris flower"),
  H("parfum", "Bar à parfums", "Une décoration qui s'accorde à votre thème", "Le bar à parfums s'habille aux couleurs de votre événement : or, blanc, pastel ou bois naturel.", "luxury decoration"),
  H("parfum", "Conseil parfum", "Le néroli, la lumière méditerranéenne", "Extrait des fleurs d'oranger amer, le néroli est frais, vert et lumineux : parfait pour l'été.", "mediterranean"),
  H("parfum", "Baby shower", "Une naissance qui se fête en douceur", "Notes de coton, de fleurs blanches et de musc : des parfums tendres pour célébrer l'arrivée de bébé.", "newborn"),
  H("parfum", "Conseil parfum", "Le cèdre, la force tranquille", "Sec, boisé et élégant, le cèdre structure les compositions et leur donne de la tenue.", "cedar forest"),
  H("parfum", "Bar à parfums", "Le souvenir qui reste sur la peau", "Une photo s'oublie dans un téléphone, un parfum se porte : vos invités pensent à vous à chaque pulvérisation.", "perfume bottles"),
  H("parfum", "Conseil parfum", "Parfumer ses vêtements, bonne idée ?", "Sur un foulard ou une écharpe, le parfum tient plus longtemps. Évitez la soie claire et les tissus fragiles.", "silk scarf"),
  H("parfum", "Fiançailles", "Le henné et le parfum, duo parfait", "Pendant la soirée de henné, le bar à parfums prolonge la magie : traditions et senteurs se rencontrent.", "henna"),
  H("parfum", "Conseil parfum", "Choisir un parfum en cadeau", "Interrogez les goûts : plutôt frais, floral ou boisé ? Le mieux reste de le créer ensemble au bar Nawar.", "gift box"),
];

const HASHTAGS: Record<string, string> = {
  mariage: "#mariage #mariagemaroc #mariagemarocain #weddingmorocco #weddingplanner #heaventagency",
  naissance: "#babyshower #naissance #aqiqa #babyshowermaroc #fete #heaventagency",
  fete: "#fiancailles #henna #fete #reception #evenementmaroc #heaventagency",
  entreprise: "#evenemententreprise #seminaire #salon #hotesses #eventmaroc #heaventagency",
  parfum: "#barparfums #parfum #nawar #mariagemaroc #cadeauinvites #oud #parfumerie",
};

const CTA: Record<Compte, string> = {
  heavent: "✨ Un projet ? Écrivez-nous en message privé ou demandez votre devis gratuit (lien en bio).",
  nawar: "✨ Le bar à parfums Nawar pour votre événement ? Écrivez-nous en message privé (lien en bio).",
};

export interface PostGenere { compte: Compte; theme: string; accroche: string; titre: string; legende: string; recherche: string; style: "sombre" | "clair"; date_prevue: string; statut: "brouillon" }

/** Heures de publication (heure du Maroc) : fin de matinée et soirée */
const HEURES = [11, 20];

/**
 * Génère un mois de posts (2 par jour) à partir du lendemain du dernier post prévu.
 * Les idées déjà utilisées (même titre) sont évitées ; un post « guide gratuit » le soir, un jour sur deux, pour Heavent.
 */
export function genererMois(compte: Compte, existants: { titre: string; date_prevue: string | null }[], jours = 30): PostGenere[] {
  const deja = new Set(existants.map((p) => p.titre.trim().toLowerCase()));
  const idees = (compte === "nawar" ? IDEES_NAWAR : IDEES_HEAVENT);
  // Les idées pas encore utilisées d'abord, en alternant les thèmes ; puis on recommence si besoin
  const neuves = idees.filter((i) => !deja.has(i.titre.toLowerCase()));
  const parTheme = new Map<string, Idee[]>();
  for (const i of neuves.length >= jours ? neuves : [...neuves, ...idees]) (parTheme.get(i.theme) ?? parTheme.set(i.theme, []).get(i.theme)!).push(i);
  const themes = [...parTheme.keys()];
  const file: Idee[] = [];
  for (let k = 0; file.length < jours * 2 && k < 500; k++) { const t = parTheme.get(themes[k % themes.length])!; const i = t.shift(); if (i) file.push(i); }

  const dernier = existants.map((p) => p.date_prevue).filter(Boolean).sort().pop();
  const depart = new Date(Math.max(Date.now(), dernier ? Date.parse(dernier) : 0));
  depart.setUTCHours(0, 0, 0, 0); depart.setUTCDate(depart.getUTCDate() + 1);

  const res: PostGenere[] = [];
  let n = 0, g = 0;
  for (let j = 0; j < jours; j++) {
    for (const [k, h] of HEURES.entries()) {
      const date = new Date(depart); date.setUTCDate(depart.getUTCDate() + j); date.setUTCHours(h - 1, 30, 0, 0); // Maroc = UTC+1
      const guideDuSoir = compte === "heavent" && k === 1 && j % 2 === 1;
      if (guideDuSoir) {
        const guide = GUIDES[g++ % GUIDES.length];
        res.push({ compte, theme: guide.theme, accroche: "🎁 Guide gratuit", titre: guide.titre, style: "clair", recherche: idees.find((i) => i.theme === guide.theme)?.recherche ?? "celebration",
          legende: `🎁 ${guide.titre}\n\n${guide.accroche}\n\nCommentez « GUIDE » et recevez-le gratuitement en message privé, ou téléchargez-le ici : ${lienGuide(guide)} (lien en bio).\n\n${HASHTAGS[guide.theme] ?? ""}`,
          date_prevue: date.toISOString(), statut: "brouillon" });
        continue;
      }
      const i = file[n++ % file.length];
      res.push({ compte, theme: i.theme, accroche: i.accroche, titre: i.titre, style: (n % 3 === 0 ? "clair" : "sombre"), recherche: i.recherche,
        legende: `${i.titre}\n\n${i.conseil}\n\n${CTA[compte]}\n\n${HASHTAGS[i.theme] ?? ""}`, date_prevue: date.toISOString(), statut: "brouillon" });
    }
  }
  return res;
}
