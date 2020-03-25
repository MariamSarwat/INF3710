export const data: string = `SET search_path = NetflixPolyDB;

INSERT INTO NETFLIXPOLYDB.Membre (adr_courriel, mot_de_passe, nom_rue, no_rue, code_postal, ville, province, pays, nom) VALUES (
    'dav.gagleroux@gmail.com', 'Requin360', 'avenue Lacombe', 4705, 'H3W1R4', 'Montréal', 'Québec', 'Canada', 'David Gagné-Leroux');
INSERT INTO NETFLIXPOLYDB.Membre (adr_courriel, mot_de_passe, nom_rue, no_appart, no_rue, code_postal, ville, province, pays, nom) VALUES (
    'sarwatmariam@gmail.com', 'Hello123', 'boulevard Graham', 3, 1030, 'H3P2G2', 'Montréal', 'Québec', 'Canada', 'Mariam Sarwat');
INSERT INTO NETFLIXPOLYDB.Membre (adr_courriel, mot_de_passe, nom_rue, no_rue, code_postal, ville, province, pays, nom) VALUES (
 'genevieve.gagneleroux@gmail.com', 'Hirondelle180', 'avenue Lacombe', 4705, 'H3W1R4', 'Montréal', 'Québec', 'Canada',
 'Geneviève Gagné-Leroux');
INSERT INTO NETFLIXPOLYDB.Membre (adr_courriel, mot_de_passe, nom_rue, no_appart, no_rue, code_postal, ville, province, pays, nom) VALUES (
    'sarwats1304@gmail.com', 'HarryPotter12', 'boulevard Graham', 3, 1030, 'H3P2G2', 'Montréal', 'Québec', 'Canada', 'Sarah Sarwat');

INSERT INTO NETFLIXPOLYDB.AbonnementMensuel (id_membre, prix_abonnement, date_debut_abonnement, date_fin_abonnement) VALUES (3, 9.99,
    '2020-03-14', '2020-04-14');
INSERT INTO NETFLIXPOLYDB.AbonnementMensuel (id_membre, prix_abonnement, date_debut_abonnement, date_fin_abonnement) VALUES (4, 12.99,
    '2020-03-01', '2020-04-01');

INSERT INTO NETFLIXPOLYDB.AbonnementPayPerView (id_membre, film_payperview) VALUES (1, 2);
INSERT INTO NETFLIXPOLYDB.AbonnementPayPerView (id_membre, film_payperview) VALUES (2, 1);

INSERT INTO NETFLIXPOLYDB.CarteDeCredit (numero, ccv, titulaire, date_expiration, id_membre) VALUES (2134567891011121, 988,
    'David Gagne-Leroux', '2022-01-07', 1);
INSERT INTO NETFLIXPOLYDB.CarteDeCredit (numero, ccv, titulaire, date_expiration, id_membre) VALUES (2224567891011121, 862,
    'Mariam Sarwat', '2021-02-08', 2);
INSERT INTO NETFLIXPOLYDB.CarteDeCredit (numero, ccv, titulaire, date_expiration, id_membre) VALUES (2134567901011121, 722,
    'Genevieve Gagne-Leroux', '2023-03-07', 3);
INSERT INTO NETFLIXPOLYDB.CarteDeCredit (numero, ccv, titulaire, date_expiration, id_membre) VALUES (2235567891011121, 433,
    'Sarah Sarwat', '2022-01-09', 4);

INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre) VALUES ('The Irishman', '2019-11-27', '03:30:00', 'Gangster');
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre) VALUES ('Once Upon a Time... in Hollywood',
'2019-07-26', '02:41:00', 'Comedie dramatique');
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre) VALUES ('1917', '2020-01-10', '01:59:00', 'Guerre');
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre) VALUES ('Annie Hall', '1977-04-20', '01:33:00', 'Comedie');
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre) VALUES ('Interiors', '1978-08-02', '01:33:00', 'Drame');
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre) VALUES ('Manhattan', '1979-03-14', '01:36:00', 'Comedie');
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre) VALUES ('Broadway Danny Rose',
'1984-01-27', '01:21:00', 'Comedie');
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre) VALUES ('The Purple Rose of Cairo',
'1985-03-01', '01:25:00', 'Comedie');
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre) VALUES ('Hannah and Her Sisters',
'1986-03-14', '01:47:00', 'Comedie');
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre) VALUES ('Crimes and Misdemeanors',
'1989-10-13', '01:44:00', 'Comedie');
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre) VALUES ('Alice', '1990-12-25', '01:42:00', 'Comedie');
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre) VALUES ('Mighty Aphrodite',
'1996-01-11', '01:35:00', 'Romance');
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre) VALUES ('Deconstructing Harry',
'1997-12-12', '01:36:00', 'Comedie');
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre) VALUES ('Match Point', '2005-12-28', '02:04:00', 'Drame');
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre) VALUES ('Midnight in Paris',
'2011-05-20', '01:40:00', 'Comedie');
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre) VALUES ('Blue Jasmine', '2013-07-26', '01:38:00', 'Drame');


INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (1, 1, '2020-03-17', '03:00:00');
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (2, 6, '2020-03-18', '02:41:00');
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (2, 7, '2020-03-19', '01:59:00');
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (2, 8, '2020-03-20', '01:33:00');
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (2, 9, '2020-03-20', '01:33:00');
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (2, 10, '2020-03-20', '01:33:00');
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (3, 1, '2020-03-21', '01:33:00');
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (4, 1, '2020-03-28', '01:33:00');

INSERT INTO NETFLIXPOLYDB.CopieDVD (id_membre, num_film, numero_dvd, date_livraison, cout_livraison) VALUES (2, 1, 1, '2020-03-19', 19.99);
INSERT INTO NETFLIXPOLYDB.CopieDVD (id_membre, num_film, numero_dvd, date_livraison, cout_livraison) VALUES (2, 5, 1, '2020-03-16', 19.99);
INSERT INTO NETFLIXPOLYDB.CopieDVD (id_membre, num_film, numero_dvd, date_livraison, cout_livraison) VALUES (2, 14, 1, '2020-03-17', 19.99);
INSERT INTO NETFLIXPOLYDB.CopieDVD (id_membre, num_film, numero_dvd, date_livraison, cout_livraison) VALUES (2, 10, 1, '2020-03-24', 19.99);


INSERT INTO NETFLIXPOLYDB.Ceremonie (maitre, nom_edifice, ville, pays, date_ceremonie) VALUES ('Bob Hope',
'Dorothy Chandler Pavilion', 'Los Angeles', 'USA', '1978-04-03');
INSERT INTO NETFLIXPOLYDB.Ceremonie (maitre, nom_edifice, ville, pays, date_ceremonie) VALUES ('Johnny Carson',
'Dorothy Chandler Pavilion', 'Los Angeles', 'USA', '1979-04-09');
INSERT INTO NETFLIXPOLYDB.Ceremonie (maitre, nom_edifice, ville, pays, date_ceremonie) VALUES ('Johnny Carson',
'Dorothy Chandler Pavilion', 'Los Angeles', 'USA', '1980-04-14');
INSERT INTO NETFLIXPOLYDB.Ceremonie (maitre, nom_edifice, ville, pays, date_ceremonie) VALUES ('Jack Lemmon',
'Dorothy Chandler Pavilion', 'Los Angeles', 'USA', '1985-03-25');
INSERT INTO NETFLIXPOLYDB.Ceremonie (maitre, nom_edifice, ville, pays, date_ceremonie) VALUES ('Robin Williams',
'Dorothy Chandler Pavilion', 'Los Angeles', 'USA', '1986-03-24');
INSERT INTO NETFLIXPOLYDB.Ceremonie (maitre, nom_edifice, ville, pays, date_ceremonie) VALUES ('Chevy Chase',
'Dorothy Chandler Pavilion', 'Los Angeles', 'USA', '1987-03-30');
INSERT INTO NETFLIXPOLYDB.Ceremonie (maitre, nom_edifice, ville, pays, date_ceremonie) VALUES ('Billy Cristal',
'Dorothy Chandler Pavilion', 'Los Angeles', 'USA', '1990-03-26');
INSERT INTO NETFLIXPOLYDB.Ceremonie (maitre, nom_edifice, ville, pays, date_ceremonie) VALUES ('Billy Cristal',
'Shrine Auditorium', 'Los Angeles', 'USA', '1991-03-25');
INSERT INTO NETFLIXPOLYDB.Ceremonie (maitre, nom_edifice, ville, pays, date_ceremonie) VALUES ('Whoopi Goldberg',
'Dorothy Chandler Pavilion', 'Los Angeles', 'USA', '1996-03-25');
INSERT INTO NETFLIXPOLYDB.Ceremonie (maitre, nom_edifice, ville, pays, date_ceremonie) VALUES ('Billy Cristal',
'Shrine Auditorium', 'Los Angeles', 'USA', '1998-03-23');
INSERT INTO NETFLIXPOLYDB.Ceremonie (maitre, nom_edifice, ville, pays, date_ceremonie) VALUES ('Jon Stewart',
'Kodak Theater', 'Los Angeles', 'USA', '2006-03-05');
INSERT INTO NETFLIXPOLYDB.Ceremonie (maitre, nom_edifice, ville, pays, date_ceremonie) VALUES ('Billy Cristal',
'Hollywood and Highland Center', 'Los Angeles', 'USA', '2012-02-26');
INSERT INTO NETFLIXPOLYDB.Ceremonie (maitre, nom_edifice, ville, pays, date_ceremonie) VALUES ('Ellen DeGeneres',
'Dolby Theater', 'Los Angeles', 'USA', '2014-03-02');
INSERT INTO NETFLIXPOLYDB.Ceremonie (nom_edifice, ville, pays, date_ceremonie) VALUES ('Dolby Theater','Los Angeles', 'USA', '2020-02-09');


INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (14, 1, 'meilleur film');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (14, 1, 'meilleure realisation');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (14, 1, 'meilleur acteur secondaire');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (14, 1, 'meilleur scenario adapte');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (14, 1, 'meilleurs decors');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (14, 1, 'meilleurs costumes');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (14, 1, 'meilleure photographie');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (14, 1, 'meilleur montage');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (14, 1, 'meilleurs effets visuels');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (14, 2, 'meilleur film');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (14, 2, 'meilleure realisation');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (14, 2, 'meilleur acteur');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (14, 2, 'meilleur acteur secondaire');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (14, 2, 'meilleur scenario original');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (14, 2, 'meilleurs decors');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (14, 2, 'meilleurs costumes');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (14, 2, 'meilleure photographie');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (14, 2, 'meilleur mixage audio');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (14, 2, 'meilleur montage audio');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (14, 3, 'meilleur film');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (14, 3, 'meilleure realisation');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (14, 3, 'meilleur scenario original');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (14, 3, 'meilleurs decors');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (14, 3, 'meilleurs maquillages et coiffures');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (14, 3, 'meilleure photographie');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (14, 3, 'meilleur mixage audio');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (14, 3, 'meilleur montage audio');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (14, 3, 'meilleurs effets visuels');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (14, 3, 'meilleure bande originale');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (1, 4, 'meilleur realisateur');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (1, 4, 'meilleur scenario original');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (1, 4, 'meilleur acteur');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (2, 5, 'meilleur realisateur');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (2, 5, 'meilleur scenario original');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (3, 6, 'meilleur scenario original');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (4, 7, 'meilleur realisateur');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (4, 7, 'meilleur scenario original');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (5, 8, 'meilleur scenario original');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (6, 9, 'meilleur realisateur');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (6, 9, 'meilleur scenario original');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (7, 10, 'meilleur realisateur');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (7, 10, 'meilleur scenario original');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (8, 11, 'meilleur scenario original');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (9, 12, 'meilleur scenario original');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (10, 13, 'meilleur scenario original');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (11, 14, 'meilleur scenario original');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (12, 15, 'meilleur scenario original');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (12, 15, 'meilleur realisateur');
INSERT INTO NETFLIXPOLYDB.NominationFilms (id_ceremonie, num_film, categorie) VALUES (13, 16, 'meilleur scenario original');

INSERT INTO NETFLIXPOLYDB.FilmsVainqueurs (id_ceremonie, num_film, categorie) VALUES (14, 2, 'meilleur acteur secondaire');
INSERT INTO NETFLIXPOLYDB.FilmsVainqueurs (id_ceremonie, num_film, categorie) VALUES (14, 2, 'meilleurs decors');
INSERT INTO NETFLIXPOLYDB.FilmsVainqueurs (id_ceremonie, num_film, categorie) VALUES (14, 3, 'meilleure photographie');
INSERT INTO NETFLIXPOLYDB.FilmsVainqueurs (id_ceremonie, num_film, categorie) VALUES (14, 3, 'meilleurs effets visuels');
INSERT INTO NETFLIXPOLYDB.FilmsVainqueurs (id_ceremonie, num_film, categorie) VALUES (14, 3, 'meilleur mixage audio');
INSERT INTO NETFLIXPOLYDB.FilmsVainqueurs (id_ceremonie, num_film, categorie) VALUES (12, 15, 'meilleur scenario original');
INSERT INTO NETFLIXPOLYDB.FilmsVainqueurs (id_ceremonie, num_film, categorie) VALUES (1, 4, 'meilleur realisateur');
INSERT INTO NETFLIXPOLYDB.FilmsVainqueurs (id_ceremonie, num_film, categorie) VALUES (1, 4, 'meilleur scenario original');
INSERT INTO NETFLIXPOLYDB.FilmsVainqueurs (id_ceremonie, num_film, categorie) VALUES (6, 9, 'meilleur scenario original');

INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, age, nationalite) VALUES ('Martin Scorsese', 'M', 77, 'USA');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, age, nationalite) VALUES ('Robert De Niro', 'M', 76, 'USA');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, age, nationalite) VALUES ('Al Pacino', 'M', 79, 'USA');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, age, nationalite) VALUES ('Joe Pesci', 'M', 77, 'USA');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, age, nationalite) VALUES ('Quentin Tarantino', 'M', 56, 'USA');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, age, nationalite) VALUES ('Leonardo DiCaprio', 'M', 45, 'USA');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, age, nationalite) VALUES ('Brad Pitt', 'M', 56, 'USA');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, age, nationalite) VALUES ('Margot Robbie', 'F', 29, 'Australie');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, age, nationalite) VALUES ('Sam Mendes', 'M', 54, 'Angleterre');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, age, nationalite) VALUES ('George MacKay', 'M', 28, 'Angleterre');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, age, nationalite) VALUES ('Dean-Charles Chapman', 'M', 22, 'Angleterre');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, age, nationalite) VALUES ('Woody Allen', 'M', 84, 'USA');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, age, nationalite) VALUES ('Diane Keaton', 'F', 74, 'USA');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, age, nationalite) VALUES ('Mary Beth Hurt', 'F', 73, 'USA');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, age, nationalite) VALUES ('Meryl Streep', 'F', 70, 'USA');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, age, nationalite) VALUES ('Mia Farrow', 'F', 75, 'USA');

INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (1, 1, 100000, 'realisateur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (1, 2, 95000, 'acteur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (1, 3, 95000, 'acteur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (1, 4, 90000, 'acteur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (2, 5, 120000, 'realisateur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (2, 6, 100000, 'acteur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (2, 7, 90000, 'acteur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (2, 8, 75000, 'acteur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (3, 9, 85000, 'realisateur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (3, 10, 50000, 'acteur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (3, 11, 40000, 'acteur');

INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (4, 12, 15000, 'acteur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (4, 12, 25000, 'realisateur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (4, 12, 10000, 'metteur en scene');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (4, 13, 15000, 'acteur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (5, 12, 25000, 'realisateur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (5, 12, 10000, 'metteur en scene');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (5, 13, 15000, 'acteur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (5, 14, 15000, 'acteur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (6, 12, 15000, 'acteur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (6, 12, 25000, 'realisateur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (6, 12, 10000, 'metteur en scene');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (6, 13, 15000, 'acteur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (6, 15, 15000, 'acteur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (7, 12, 25000, 'realisateur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (7, 12, 10000, 'metteur en scene');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (7, 12, 15000, 'acteur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (7, 16, 15000, 'acteur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (8, 12, 25000, 'realisateur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (8, 12, 10000, 'metteur en scene');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (8, 16, 15000, 'acteur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (9, 12, 15000, 'acteur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (9, 12, 25000, 'realisateur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (9, 12, 10000, 'metteur en scene');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (9, 16, 15000, 'acteur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (10, 12, 25000, 'realisateur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (10, 12, 15000, 'acteur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (10, 16, 15000, 'acteur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (11, 12, 25000, 'realisateur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (11, 12, 10000, 'metteur en scene');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (11, 12, 15000, 'acteur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (11, 16, 15000, 'acteur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (12, 12, 25000, 'realisateur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (12, 12, 10000, 'metteur en scene');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (12, 12, 15000, 'acteur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (13, 12, 25000, 'realisateur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (13, 12, 10000, 'metteur en scene');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (13, 12, 15000, 'acteur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (14, 12, 25000, 'realisateur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (14, 12, 10000, 'metteur en scene');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (15, 12, 25000, 'realisateur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (15, 12, 10000, 'metteur en scene');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (16, 12, 25000, 'realisateur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (16, 12, 10000, 'metteur en scene');
;`;
