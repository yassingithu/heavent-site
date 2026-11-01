// Fêtes et occasions pour ajouter (ou intercaler) une publication spéciale dans le planning Instagram.
// date : « MM-JJ » pour une date fixe, null pour une fête qui change chaque année (calendrier hégirien, fête des mères…).
// Textes volontairement simples et festifs : ce sont des vœux, pas des prises de position.
import type { Compte } from "./instagramIdees";

export interface Fete { id: string; nom: string; date: string | null; accroche: string; titre: string; message: string; recherche: string; hashtags: string }

export const FETES: Fete[] = [
  { id: "nouvel_an", nom: "Nouvel an", date: "01-01", accroche: "Bonne année", titre: "Belle et heureuse année à vous", message: "Que cette nouvelle année vous apporte joie, santé et de très beaux moments à célébrer.", recherche: "new year celebration gold", hashtags: "#bonneannee #nouvelan #maroc" },
  { id: "manifeste", nom: "Manifeste de l'Indépendance", date: "01-11", accroche: "Fête nationale", titre: "Bonne fête du Manifeste de l'Indépendance", message: "Une pensée pour cette date importante de notre histoire. Bonne fête à tous les Marocains.", recherche: "morocco flag", hashtags: "#maroc #fetenationale #11janvier" },
  { id: "yennayer", nom: "Nouvel an amazigh (Yennayer)", date: "01-14", accroche: "Assegas Amegas", titre: "Assegas Amegas, bonne année amazighe", message: "Une nouvelle année amazighe sous le signe du partage, de la tradition et de la fête.", recherche: "berber tradition morocco", hashtags: "#yennayer #assegasamegas #amazigh #maroc" },
  { id: "saint_valentin", nom: "Saint-Valentin", date: "02-14", accroche: "Saint-Valentin", titre: "Célébrez l'amour", message: "Une belle journée pour dire à ceux qu'on aime combien ils comptent.", recherche: "red roses romantic", hashtags: "#saintvalentin #amour" },
  { id: "femme", nom: "Journée de la femme", date: "03-08", accroche: "8 mars", titre: "Bonne journée à toutes les femmes", message: "Aux mères, aux sœurs, aux amies, aux entrepreneuses : merci pour tout ce que vous faites.", recherche: "flowers women day", hashtags: "#8mars #journeedelafemme #maroc" },
  { id: "ramadan", nom: "Ramadan", date: null, accroche: "Ramadan Moubarak", titre: "Ramadan Moubarak", message: "Que ce mois béni vous apporte paix, sérénité et de beaux moments en famille.", recherche: "ramadan lantern", hashtags: "#ramadan #ramadanmoubarak #ramadankareem #maroc" },
  { id: "aid_fitr", nom: "Aïd al-Fitr", date: null, accroche: "Aïd Moubarak", titre: "Aïd Moubarak Saïd", message: "Que cette fête soit pleine de joie, de partage et de retrouvailles en famille.", recherche: "eid mubarak", hashtags: "#aidmoubarak #aidalfitr #eid #maroc" },
  { id: "travail", nom: "Fête du travail", date: "05-01", accroche: "1er mai", titre: "Bonne fête du travail", message: "Merci à toutes les équipes qui font vivre nos événements, en coulisses comme sur le terrain.", recherche: "teamwork celebration", hashtags: "#1ermai #fetedutravail #maroc" },
  { id: "meres", nom: "Fête des mères", date: null, accroche: "Fête des mères", titre: "Bonne fête à toutes les mamans", message: "À celles qui donnent tout sans compter : merci, et bonne fête.", recherche: "mother flowers", hashtags: "#fetedesmeres #maman #maroc" },
  { id: "aid_adha", nom: "Aïd al-Adha", date: null, accroche: "Aïd Moubarak", titre: "Aïd al-Adha Moubarak", message: "Que cette fête vous réunisse avec vos proches dans la paix et la joie.", recherche: "eid mubarak lantern", hashtags: "#aidmoubarak #aidaladha #eid #maroc" },
  { id: "hegire", nom: "Nouvel an de l'Hégire", date: null, accroche: "Bonne année", titre: "Bonne année de l'Hégire", message: "Une nouvelle année pleine de paix et de bénédictions pour vous et vos proches.", recherche: "crescent moon night", hashtags: "#nouvelanhegire #maroc" },
  { id: "trone", nom: "Fête du Trône", date: "07-30", accroche: "Fête nationale", titre: "Bonne fête du Trône", message: "Bonne fête du Trône à tous les Marocains, au Maroc et partout dans le monde.", recherche: "morocco flag", hashtags: "#fetedutrone #maroc #fetenationale" },
  { id: "oued_eddahab", nom: "Allégeance Oued Eddahab", date: "08-14", accroche: "Fête nationale", titre: "Bonne fête à tous les Marocains", message: "Bonne fête de l'allégeance d'Oued Eddahab à tous les Marocains.", recherche: "morocco flag", hashtags: "#maroc #fetenationale" },
  { id: "revolution", nom: "Révolution du Roi et du Peuple", date: "08-20", accroche: "Fête nationale", titre: "Bonne fête de la Révolution du Roi et du Peuple", message: "Une date qui rappelle l'attachement de tout un peuple. Bonne fête à tous les Marocains.", recherche: "morocco flag", hashtags: "#maroc #fetenationale #20aout" },
  { id: "jeunesse", nom: "Fête de la jeunesse", date: "08-21", accroche: "Fête de la jeunesse", titre: "Bonne fête de la jeunesse", message: "À la jeunesse marocaine, pleine d'énergie, d'idées et d'avenir : bonne fête !", recherche: "young people celebration", hashtags: "#fetedelajeunesse #maroc" },
  { id: "mawlid", nom: "Aïd al-Mawlid", date: null, accroche: "Aïd Moubarak", titre: "Aïd al-Mawlid Moubarak", message: "Que cette fête vous apporte paix et sérénité, à vous et à vos proches.", recherche: "mosque night lantern", hashtags: "#mawlid #aidmoubarak #maroc" },
  { id: "unite", nom: "Fête de l'Unité", date: "10-31", accroche: "Fête nationale", titre: "Bonne fête de l'Unité", message: "Bonne fête de l'Unité à tous les Marocains, au Maroc et partout dans le monde.", recherche: "morocco flag", hashtags: "#fetedelunite #maroc #fetenationale" },
  { id: "marche_verte", nom: "Marche verte", date: "11-06", accroche: "Fête nationale", titre: "Bonne fête de la Marche verte", message: "Bonne fête de la Marche verte à tous les Marocains.", recherche: "morocco flag", hashtags: "#marcheverte #maroc #fetenationale" },
  { id: "independance", nom: "Fête de l'Indépendance", date: "11-18", accroche: "Fête nationale", titre: "Bonne fête de l'Indépendance", message: "Bonne fête de l'Indépendance à tous les Marocains, au Maroc et partout dans le monde.", recherche: "morocco flag", hashtags: "#fetedelindependance #maroc #fetenationale" },
  { id: "autre", nom: "Autre occasion", date: null, accroche: "", titre: "", message: "", recherche: "celebration", hashtags: "#maroc" },
];

const SIGNATURE: Record<Compte, string> = {
  heavent: "Toute l'équipe Heavent People Agency vous souhaite une très belle fête. ✨",
  nawar: "Toute l'équipe Nawar, bar à parfums, vous souhaite une très belle fête. ✨",
};
const TAGS_COMPTE: Record<Compte, string> = { heavent: "#heaventagency", nawar: "#nawar #barparfums" };

/** Textes proposés pour une occasion et un compte (modifiables avant d'enregistrer) */
export function textesFete(f: Fete, compte: Compte) {
  if (f.id === "autre") return { accroche: "", titre: "", legende: `\n\n${SIGNATURE[compte]}\n\n#maroc ${TAGS_COMPTE[compte]}`, recherche: f.recherche };
  return { accroche: f.accroche, titre: f.titre, legende: `${f.titre}\n\n${f.message}\n\n${SIGNATURE[compte]}\n\n${f.hashtags} ${TAGS_COMPTE[compte]}`, recherche: f.recherche };
}

/** Prochaine date (AAAA-MM-JJ) d'une fête à date fixe, à partir d'aujourd'hui */
export function prochaineDate(f: Fete, aujourdhui = new Date()): string | null {
  if (!f.date) return null;
  const an = aujourdhui.getFullYear();
  const cette = `${an}-${f.date}`;
  const jour = aujourdhui.toISOString().slice(0, 10);
  return cette >= jour ? cette : `${an + 1}-${f.date}`;
}
