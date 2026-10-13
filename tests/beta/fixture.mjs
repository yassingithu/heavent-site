const cat = (categorie, designation, unite, prix_unitaire, description='') => ({ id: 'c_'+designation, categorie, designation, unite, prix_unitaire, actif: true, ordre: 0, description });
export const catalogue = [
  cat('mariage','Organisation complète du mariage','forfait',25000,'Wedding planning de A à Z'),
  cat('mariage','Hôtesses d\'accueil invités (mariage)','jour',900,'Accueil, vestiaire, placement — soirée jusqu\'à 8 h'),
  cat('mariage','Traiteur mariage (menu complet)','personne',450,'Cocktail de bienvenue, entrées, plats, pâtisseries marocaines, pièce montée, service à table'),
  cat('mariage','Négafa','forfait',25000,'Tenues traditionnelles, bijoux et accompagnement de la mariée'),
  cat('mariage','DJ / animation musicale','forfait',12000,'DJ, sonorisation et éclairage de piste pour la soirée'),
  cat('mariage','Décoration et art floral','forfait',30000,'Scénographie, fleurs, centres de table, éclairage d\'ambiance'),
  cat('mariage','Photographe mariage','forfait',8000,'Couverture complète de la soirée, retouches, galerie en ligne'),
  cat('mariage','Vidéaste mariage','forfait',10000,'Film de la soirée, teaser, prises de vue drone'),
  cat('mariage','Transport des invités (navette)','unite',3000,'Autocar ou minibus avec chauffeur, aller-retour'),
  cat('staff','Hôtesse d\'accueil','jour',900,'Journée de 8 h — français / arabe'),
  cat('staff','Hôtesse bilingue','jour',1200,'Journée de 8 h — français / anglais / arabe'),
];
export const param = [{ id:1, raison_sociale:'Heavent People Agency', adresse:'Rue Dakar, Imm. N°5, Apt N°1, Océan', ville:'Rabat', telephone:'+212 6 10 93 96 55', email:'i.chaigari@heaventagency.com', site_web:'www.heaventagency.com', ice:'003617071000041', rc:'183001 (Tribunal de Rabat)', taux_tva:20, devise:'MAD', validite_jours:30, conditions:'Acompte de 50 % à la signature, solde à la fin de la prestation.', cgv:null, conditions_contrat:null }];
export const dem = [{ id:'cdb38082', nom:'TEST2 Tazi', prenom:'TEST2 Idrissi', email:'youtusel26@gmail.com', telephone:'+212600000000', type_evenement:'Mariage', date_mariage:'2026-10-15', lieu:'Marrakech', nb_invites:300,
  services:"DJ / Animation musicale, Décoration, Photographe, Vidéaste, Traiteur, Transport, Officiant de cérémonie, Hôtes/Hôtesses d'accueil, Wedding planner",
  remarques:"TEST 2 (test interne Heavent) : mariage de 300 invités, service wedding planner complet, tous les services compris. Besoin aussi de 3 hôtesses et 2 stewards bilingues français / arabe de 16h à minuit.\nBudget : 350 000 MAD - 500 000 MAD", statut:'en_attente', created_at:'2026-10-13T18:47:54Z' }];
const S = (id, prenom, genre, email) => ({ id, nom:'TEST1', prenom, genre, email, ville:'Marrakech', langues:'Arabe, Français', taux_horaire:60, telephone:'+2126000000' });
export const staff = [S('s1','Salma','Femme','test1.salma@heavent.test'), S('s2','Nora','Femme','test1.nora@heavent.test'), S('s3','Imane','Femme','test1.imane@heavent.test'), S('s4','Youssef','Homme','test1.youssef@heavent.test'), S('s5','Karim','Homme','test1.karim@heavent.test')];
export const dispos = staff.map((s,i) => ({ id:'d'+i, staff_id:s.id, date_jour:'2026-10-15', creneau:'soir', disponible:true }));
