export const data: string = `SET search_path = NetflixPolyDB;
CREATE EXTENSION IF NOT EXISTS pgcrypto;
INSERT INTO NETFLIXPOLYDB.Membre (adr_courriel, mot_de_passe, nom_rue, no_rue, code_postal, ville, province, pays, nom) VALUES ('dav.gagleroux@gmail.com', 'Requin360', 'avenue Lacombe', 4705, 'H3W1R4', 'Montréal', 'Québec', 'Canada', 'David Gagné-Leroux');
INSERT INTO NETFLIXPOLYDB.Membre (adr_courriel, mot_de_passe, nom_rue, no_appart, no_rue, code_postal, ville, province, pays, nom) VALUES ('sarwatmariam@gmail.com', 'Hello123', 'boulevard Graham', 3, 1030, 'H3P2G2', 'Montréal', 'Québec', 'Canada', 'Mariam Sarwat');
INSERT INTO NETFLIXPOLYDB.Membre (adr_courriel, mot_de_passe, nom_rue, no_rue, code_postal, ville, province, pays, nom) VALUES ('genevieve.gagneleroux@gmail.com', 'Hirondelle180', 'avenue Lacombe', 4705, 'H3W1R4', 'Montréal', 'Québec', 'Canada', 'Geneviève Gagné-Leroux');
INSERT INTO NETFLIXPOLYDB.Membre (adr_courriel, mot_de_passe, nom_rue, no_appart, no_rue, code_postal, ville, province, pays, nom) VALUES ('sarwats1304@gmail.com', 'HarryPotter12', 'boulevard Graham', 3, 1030, 'H3P2G2', 'Montréal', 'Québec', 'Canada', 'Sarah Sarwat');
INSERT INTO NETFLIXPOLYDB.Membre (adr_courriel, mot_de_passe, nom_rue, no_rue, code_postal, ville, province, pays, nom) VALUES ('mayurpatel@gmail.com', 'Ronaldo07', 'rue Cedar', 46, 'H3J5R4', 'Montréal', 'Québec', 'Canada', 'Mayur Patel');
INSERT INTO NETFLIXPOLYDB.Membre (adr_courriel, mot_de_passe, nom_rue, no_rue, code_postal, ville, province, pays, nom) VALUES ('nicohirab@gmail.com', 'Messi11', 'rue Roger-Pilon', 85, 'H3W4B6', 'Montréal', 'Québec', 'Canada', 'Nicolas Hirab');
INSERT INTO NETFLIXPOLYDB.Admin (adr_courriel, mot_de_passe) VALUES ('admin@gmail.com', 'Admin');

INSERT INTO NETFLIXPOLYDB.AbonnementMensuel (id_membre, prix_abonnement, date_debut_abonnement, date_fin_abonnement) VALUES (1, 9.99, '2020-03-14', '2020-04-14');
INSERT INTO NETFLIXPOLYDB.AbonnementMensuel (id_membre, prix_abonnement, date_debut_abonnement, date_fin_abonnement) VALUES (2, 9.99, '2020-03-01', '2020-04-01');
INSERT INTO NETFLIXPOLYDB.AbonnementMensuel (id_membre, prix_abonnement, date_debut_abonnement, date_fin_abonnement) VALUES (5, 9.99, '2020-03-01', '2020-04-01');

INSERT INTO NETFLIXPOLYDB.AbonnementPayPerView (id_membre, film_payperview) VALUES (3, 1);
INSERT INTO NETFLIXPOLYDB.AbonnementPayPerView (id_membre, film_payperview) VALUES (4, 3);
INSERT INTO NETFLIXPOLYDB.AbonnementPayPerView (id_membre, film_payperview) VALUES (6, 3);

INSERT INTO NETFLIXPOLYDB.CarteDeCredit (numero, ccv, titulaire, date_expiration, id_membre) VALUES (2134567891011121, 988, 'David Gagne-Leroux', '2022-01-07', 1);
INSERT INTO NETFLIXPOLYDB.CarteDeCredit (numero, ccv, titulaire, date_expiration, id_membre) VALUES (2224567891011121, 862, 'Mariam Sarwat', '2021-02-08', 2);
INSERT INTO NETFLIXPOLYDB.CarteDeCredit (numero, ccv, titulaire, date_expiration, id_membre) VALUES (2134567901011121, 722, 'Genevieve Gagne-Leroux', '2023-03-07', 3);
INSERT INTO NETFLIXPOLYDB.CarteDeCredit (numero, ccv, titulaire, date_expiration, id_membre) VALUES (2235567891011121, 433, 'Sarah Sarwat', '2022-01-09', 4);
INSERT INTO NETFLIXPOLYDB.CarteDeCredit (numero, ccv, titulaire, date_expiration, id_membre) VALUES (2235567891511121, 422, 'Mayur Patel', '2022-02-09', 5);
INSERT INTO NETFLIXPOLYDB.CarteDeCredit (numero, ccv, titulaire, date_expiration, id_membre) VALUES (2235567891611121, 633, 'Nicolas Hirab', '2022-03-09', 6);

INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre, prix) VALUES ('The Irishman', '2019-11-27', 213, 'Gangster', 39.99);
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre, prix) VALUES ('Once Upon a Time... in Hollywood', '2019-07-26', 161, 'Comedie dramatique', 45.99);
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre, prix) VALUES ('1917', '2020-01-10', 119, 'Guerre', 45.99);
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre, prix) VALUES ('Annie Hall', '1977-04-20', 93, 'Comedie', 9.99);
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre, prix) VALUES ('Interiors', '1978-08-02', 93, 'Drame', 9.99);
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre, prix) VALUES ('Manhattan', '1979-03-14', 96, 'Comedie', 9.99);
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre, prix) VALUES ('Broadway Danny Rose', '1984-01-27', 81, 'Comedie', 9.99);
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre, prix) VALUES ('The Purple Rose of Cairo', '1985-03-01', 85, 'Comedie', 9.99);
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre, prix) VALUES ('Hannah and Her Sisters', '1986-03-14', 107, 'Comedie', 9.99);
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre, prix) VALUES ('Crimes and Misdemeanors', '1989-10-13', 104, 'Comedie', 19.99);
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre, prix) VALUES ('Alice', '1990-12-25', 102, 'Comedie', 19.99);
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre, prix) VALUES ('Mighty Aphrodite', '1996-01-11', 95, 'Romance', 19.99);
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre, prix) VALUES ('Deconstructing Harry', '1997-12-12', 96, 'Comedie', 19.99);
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre, prix) VALUES ('Match Point', '2005-12-28', 124, 'Drame', 19.99);
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre, prix) VALUES ('Midnight in Paris', '2011-05-20', 100, 'Comedie', 19.99);
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre, prix) VALUES ('Blue Jasmine', '2013-07-26', 98, 'Drame', 29.99);
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre, prix) VALUES ('Laurence Anyways', '2012-05-18', 168, 'Melodrame', 29.99);
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre, prix) VALUES ('J ai tué ma mère', '2009-06-05', 96, 'Biographie', 29.99);
INSERT INTO NETFLIXPOLYDB.Film (titre, date_production, duree_totale, genre, prix) VALUES ('Mommy', '2014-09-19', 134, 'Drame', 29.99);


INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (1, 1, '2020-03-17 04:55:30', 180);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (1, 1, '2020-03-18 04:56:30', 180);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (1, 1, '2020-03-19 04:57:30', 180);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (1, 2, '2020-03-16 04:54:30', 120);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (1, 2, '2020-03-17 04:53:30', 120);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (1, 2, '2020-03-18 04:52:30', 120);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (1, 2, '2020-03-19 04:51:30', 120);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (1, 2, '2020-03-20 04:45:30', 120);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (1, 2, '2020-03-21 04:24:30', 120);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (1, 2, '2020-03-22 04:35:30', 120);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (1, 2, '2020-03-23 04:23:30', 120);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (1, 2, '2020-03-24 04:22:30', 120);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (1, 2, '2020-03-25 05:55:30', 120);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (1, 2, '2020-03-26 06:55:30', 120);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (1, 2, '2020-03-27 07:55:30', 120);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (1, 6, '2020-03-17 08:55:30', 180);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (1, 7, '2020-03-17 09:55:30', 180);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (1, 8, '2020-03-17 02:55:30', 180);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (2, 6, '2020-03-18 01:55:30', 101);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (2, 7, '2020-03-19 00:55:30', 119);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (2, 8, '2020-03-20 04:55:00', 93);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (2, 9, '2020-03-20 04:55:19', 93);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (2, 10, '2020-03-20 03:33:19', 93);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (2, 3, '2020-03-16 04:00:19', 119);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (2, 3, '2020-03-17 04:10:19', 119);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (2, 3, '2020-03-18 04:20:19', 119);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (2, 3, '2020-03-19 06:44:19', 119);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (2, 3, '2020-03-20 02:06:19', 119);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (2, 3, '2020-03-21 02:10:19', 119);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (2, 3, '2020-03-22 11:55:19', 119);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (2, 3, '2020-03-23 10:55:19', 119);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (2, 3, '2020-03-24 9:50:00', 119);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (2, 3, '2020-03-25 02:30:00', 119);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (2, 3, '2020-03-26 03:33:33', 119);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (2, 3, '2020-03-27 06:12:12', 119);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (3, 12, '2020-03-21 00:00:19', 93);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (4, 13, '2020-03-28 12:05:19', 93);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (4, 14, '2020-03-28 14:00:19', 93);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (4, 16, '2020-03-28 13:00:00', 93);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (6, 17, '2020-04-14 15:55:19', 120);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (6, 18, '2020-04-14 16:55:19', 60);
INSERT INTO NETFLIXPOLYDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES (6, 19, '2020-04-14 17:55:19', 120);

INSERT INTO NETFLIXPOLYDB.CopieDVD (id_membre, num_film, numero_dvd, date_livraison, cout_livraison) VALUES (2, 1, 1, '2020-03-19', 1.25);
INSERT INTO NETFLIXPOLYDB.CopieDVD (id_membre, num_film, numero_dvd, date_livraison, cout_livraison) VALUES (2, 5, 1, '2020-03-16', 1.25);
INSERT INTO NETFLIXPOLYDB.CopieDVD (id_membre, num_film, numero_dvd, date_livraison, cout_livraison) VALUES (2, 14, 1, '2020-03-17', 1.25);
INSERT INTO NETFLIXPOLYDB.CopieDVD (id_membre, num_film, numero_dvd, date_livraison, cout_livraison) VALUES (2, 10, 1, '2020-03-24', 1.25);
INSERT INTO NETFLIXPOLYDB.CopieDVD (id_membre, num_film, numero_dvd, date_livraison, cout_livraison) VALUES (3, 10, 2, '2020-03-24', 0.75);
INSERT INTO NETFLIXPOLYDB.CopieDVD (id_membre, num_film, numero_dvd, date_livraison, cout_livraison) VALUES (4, 10, 3, '2020-03-24', 1.25);
INSERT INTO NETFLIXPOLYDB.CopieDVD (id_membre, num_film, numero_dvd, date_livraison, cout_livraison) VALUES (4, 11, 1, '2020-03-24', 1.25);
INSERT INTO NETFLIXPOLYDB.CopieDVD (id_membre, num_film, numero_dvd, date_livraison, cout_livraison) VALUES (4, 12, 1, '2020-03-24', 1.25);


INSERT INTO NETFLIXPOLYDB.Ceremonie (maitre, nom_edifice, ville, pays, date_ceremonie) VALUES ('Bob Hope', 'Dorothy Chandler Pavilion', 'Los Angeles', 'USA', '1978-04-03');
INSERT INTO NETFLIXPOLYDB.Ceremonie (maitre, nom_edifice, ville, pays, date_ceremonie) VALUES ('Johnny Carson', 'Dorothy Chandler Pavilion', 'Los Angeles', 'USA', '1979-04-09');
INSERT INTO NETFLIXPOLYDB.Ceremonie (maitre, nom_edifice, ville, pays, date_ceremonie) VALUES ('Johnny Carson', 'Dorothy Chandler Pavilion', 'Los Angeles', 'USA', '1980-04-14');
INSERT INTO NETFLIXPOLYDB.Ceremonie (maitre, nom_edifice, ville, pays, date_ceremonie) VALUES ('Jack Lemmon', 'Dorothy Chandler Pavilion', 'Los Angeles', 'USA', '1985-03-25');
INSERT INTO NETFLIXPOLYDB.Ceremonie (maitre, nom_edifice, ville, pays, date_ceremonie) VALUES ('Robin Williams', 'Dorothy Chandler Pavilion', 'Los Angeles', 'USA', '1986-03-24');
INSERT INTO NETFLIXPOLYDB.Ceremonie (maitre, nom_edifice, ville, pays, date_ceremonie) VALUES ('Chevy Chase', 'Dorothy Chandler Pavilion', 'Los Angeles', 'USA', '1987-03-30');
INSERT INTO NETFLIXPOLYDB.Ceremonie (maitre, nom_edifice, ville, pays, date_ceremonie) VALUES ('Billy Cristal', 'Dorothy Chandler Pavilion', 'Los Angeles', 'USA', '1990-03-26');
INSERT INTO NETFLIXPOLYDB.Ceremonie (maitre, nom_edifice, ville, pays, date_ceremonie) VALUES ('Billy Cristal', 'Shrine Auditorium', 'Los Angeles', 'USA', '1991-03-25');
INSERT INTO NETFLIXPOLYDB.Ceremonie (maitre, nom_edifice, ville, pays, date_ceremonie) VALUES ('Whoopi Goldberg', 'Dorothy Chandler Pavilion', 'Los Angeles', 'USA', '1996-03-25');
INSERT INTO NETFLIXPOLYDB.Ceremonie (maitre, nom_edifice, ville, pays, date_ceremonie) VALUES ('Billy Cristal', 'Shrine Auditorium', 'Los Angeles', 'USA', '1998-03-23');
INSERT INTO NETFLIXPOLYDB.Ceremonie (maitre, nom_edifice, ville, pays, date_ceremonie) VALUES ('Jon Stewart', 'Kodak Theater', 'Los Angeles', 'USA', '2006-03-05');
INSERT INTO NETFLIXPOLYDB.Ceremonie (maitre, nom_edifice, ville, pays, date_ceremonie) VALUES ('Billy Cristal', 'Hollywood and Highland Center', 'Los Angeles', 'USA', '2012-02-26');
INSERT INTO NETFLIXPOLYDB.Ceremonie (maitre, nom_edifice, ville, pays, date_ceremonie) VALUES ('Ellen DeGeneres', 'Dolby Theater', 'Los Angeles', 'USA', '2014-03-02');
INSERT INTO NETFLIXPOLYDB.Ceremonie (nom_edifice, ville, pays, date_ceremonie) VALUES ('Dolby Theater', 'Los Angeles', 'USA', '2020-02-09');


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

INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, date_naissance, nationalite) VALUES ('Martin Scorsese', 'M', '1942-11-17', 'USA');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, date_naissance, nationalite) VALUES ('Robert De Niro', 'M', '1943-08-17', 'USA');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, date_naissance, nationalite) VALUES ('Al Pacino', 'M', '1940-04-25', 'USA');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, date_naissance, nationalite) VALUES ('Joe Pesci', 'M', '1943-02-09', 'USA');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, date_naissance, nationalite) VALUES ('Quentin Tarantino', 'M', '1963-03-27', 'USA');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, date_naissance, nationalite) VALUES ('Leonardo DiCaprio', 'M', '1974-11-11', 'USA');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, date_naissance, nationalite) VALUES ('Brad Pitt', 'M', '1963-12-18', 'USA');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, date_naissance, nationalite) VALUES ('Margot Robbie', 'F', '1990-07-02', 'Australie');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, date_naissance, nationalite) VALUES ('Sam Mendes', 'M', '1965-08-01', 'Angleterre');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, date_naissance, nationalite) VALUES ('George MacKay', 'M', '1992-03-13', 'Angleterre');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, date_naissance, nationalite) VALUES ('Dean-Charles Chapman', 'M', '1997-09-07', 'Angleterre');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, date_naissance, nationalite) VALUES ('Woody Allen', 'M', '1935-12-01', 'USA');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, date_naissance, nationalite) VALUES ('Diane Keaton', 'F', '1946-01-05', 'USA');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, date_naissance, nationalite) VALUES ('Mary Beth Hurt', 'F', '1946-09-26', 'USA');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, date_naissance, nationalite) VALUES ('Meryl Streep', 'F', '1949-06-22', 'USA');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, date_naissance, nationalite) VALUES ('Mia Farrow', 'F', '1945-02-09', 'USA');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, date_naissance, nationalite) VALUES ('Anne Dorval', 'F', '1960-11-08', 'Québec');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, date_naissance, nationalite) VALUES ('Suzanne Clément', 'F', '1969-05-12', 'Québec');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, date_naissance, nationalite) VALUES ('Monia Chokri', 'F', '1982-06-27', 'Québec');
INSERT INTO NETFLIXPOLYDB.Employee (nom, sexe, date_naissance, nationalite) VALUES ('Xavier Dolan', 'M', '1989-03-20', 'Québec');


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

INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (17, 20, 70000, 'realisateur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (17, 19, 50000, 'acteur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (17, 18, 50000, 'acteur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (18, 20, 70000, 'realisateur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (18, 17, 10000, 'acteur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (18, 18, 10000, 'acteur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (19, 20, 70000, 'realisateur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (19, 17, 10000, 'acteur');
INSERT INTO NETFLIXPOLYDB.Role (num_film, id_employee, salaire, description) VALUES (19, 18, 10000, 'acteur');
`;
