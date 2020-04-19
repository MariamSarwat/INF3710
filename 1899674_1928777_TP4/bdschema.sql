SET search_path = NetflixPolyDB;
CREATE SCHEMA IF NOT EXISTS NETFLIXPOLYDB;

DROP DOMAIN IF EXISTS NETFLIXPOLYDB.sexeType CASCADE;
DROP DOMAIN IF EXISTS NETFLIXPOLYDB.roleType CASCADE;
DROP TABLE IF EXISTS NETFLIXPOLYDB.Membre CASCADE;
DROP TABLE IF EXISTS NETFLIXPOLYDB.AbonnementMensuel CASCADE;
DROP TABLE IF EXISTS NETFLIXPOLYDB.AbonnementPayPerView CASCADE;
DROP TABLE IF EXISTS NETFLIXPOLYDB.CarteDeCredit CASCADE;
DROP TABLE IF EXISTS NETFLIXPOLYDB.Film CASCADE;
DROP TABLE IF EXISTS NETFLIXPOLYDB.EnLigne CASCADE;
DROP TABLE IF EXISTS NETFLIXPOLYDB.CopieDVD CASCADE;
DROP TABLE IF EXISTS NETFLIXPOLYDB.Ceremonie CASCADE;
DROP TABLE IF EXISTS NETFLIXPOLYDB.FilmsVainqueurs CASCADE;
DROP TABLE IF EXISTS NETFLIXPOLYDB.NominationFilms CASCADE;
DROP TABLE IF EXISTS NETFLIXPOLYDB.Employee CASCADE;
DROP TABLE IF EXISTS NETFLIXPOLYDB.Role CASCADE;
DROP TABLE IF EXISTS NETFLIXPOLYDB.Admin CASCADE;

CREATE DOMAIN NETFLIXPOLYDB.sexeType as CHAR
	CHECK(VALUE IN ('M', 'F'));
					
CREATE DOMAIN NETFLIXPOLYDB.roleType as VARCHAR(20)
	CHECK(VALUE IN ('realisateur', 'producteur', 'acteur', 'maquilleur', 'metteur en scene', 'directeur', 'costumier', 'musicien', 'photographe'));

CREATE TABLE IF NOT EXISTS NETFLIXPOLYDB.Admin (
	id_admin		SERIAL		 	NOT NULL,
	adr_courriel	VARCHAR(100) 	NOT NULL,
	mot_de_passe	TEXT		NOT NULL,
	PRIMARY KEY(id_admin)
);
					
CREATE TABLE IF NOT EXISTS NETFLIXPOLYDB.Membre(
	id_membre		SERIAL		 	NOT NULL,
	adr_courriel	VARCHAR(100) 	NOT NULL,
	mot_de_passe	TEXT		NOT NULL,
	nom_rue			VARCHAR(30)		NOT NULL,
	no_appart		NUMERIC(5,0),
	no_rue			NUMERIC(5,0)	NOT NULL,
	code_postal		VARCHAR(6)		NOT NULL,
	ville			VARCHAR(20)		NOT NULL,
	province		VARCHAR(20),
	pays			VARCHAR(30)		NOT NULL,
	nom				VARCHAR(100)	NOT NULL,
	PRIMARY KEY(id_membre)
);

CREATE TABLE IF NOT EXISTS NETFLIXPOLYDB.AbonnementMensuel (
	id_membre				SERIAL		 	NOT NULL,
	prix_abonnement			NUMERIC(7,2) 	NOT NULL,
	date_debut_abonnement	DATE			NOT NULL,
	date_fin_abonnement		DATE			NOT NULL,
	PRIMARY KEY(id_membre),
	FOREIGN KEY (id_membre) REFERENCES NETFLIXPOLYDB.Membre(id_membre) ON DELETE CASCADE ON UPDATE CASCADE
);
				
CREATE TABLE IF NOT EXISTS NETFLIXPOLYDB.AbonnementPayPerView (
	id_membre				SERIAL		 	NOT NULL,
	film_payperview			NUMERIC(10,0) 	NOT NULL,
	PRIMARY KEY(id_membre),
	FOREIGN KEY (id_membre) REFERENCES NETFLIXPOLYDB.Membre(id_membre) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS NETFLIXPOLYDB.CarteDeCredit (
	numero			NUMERIC(16,0) 	NOT NULL, 
	ccv				NUMERIC(3,0)	NOT NULL,
	titulaire		VARCHAR(100) 	NOT NULL, 
	date_expiration	DATE			NOT NULL,
	id_membre		SERIAL			NOT NULL,
	PRIMARY KEY(numero),
	FOREIGN KEY (id_membre) REFERENCES NETFLIXPOLYDB.Membre(id_membre) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS NETFLIXPOLYDB.Film (
	numero			SERIAL 			NOT NULL,
	titre			VARCHAR(100)	NOT NULL,
	date_production	DATE 			NOT NULL,
	duree_totale	NUMERIC(3,0)	NOT NULL,
	genre			VARCHAR(20) 	NOT NULL,
	prix			NUMERIC(4,2)	NOT NULL,
	PRIMARY KEY(numero)
);

CREATE TABLE IF NOT EXISTS NETFLIXPOLYDB.EnLigne (
	id_membre			SERIAL		 	NOT NULL,
	num_film			SERIAL 			NOT NULL,
	date_visionnement	TIMESTAMP 			NOT NULL,
	duree_visionnement	NUMERIC(3,0)	NOT NULL,
	PRIMARY KEY(id_membre, num_film, date_visionnement),
	FOREIGN KEY (num_film) REFERENCES NETFLIXPOLYDB.Film(numero) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (id_membre) REFERENCES NETFLIXPOLYDB.Membre(id_membre) ON DELETE CASCADE ON UPDATE CASCADE
);
					
CREATE TABLE IF NOT EXISTS NETFLIXPOLYDB.CopieDVD (
	id_membre			SERIAL		 	NOT NULL,
	num_film			SERIAL 			NOT NULL,
	numero_dvd			SERIAL 			NOT NULL,
	date_livraison		DATE		 	NOT NULL,
	cout_livraison		NUMERIC(5,2)	NOT NULL,
	PRIMARY KEY(numero_dvd, num_film),
	FOREIGN KEY (num_film) REFERENCES NETFLIXPOLYDB.Film(numero) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (id_membre) REFERENCES NETFLIXPOLYDB.Membre(id_membre) ON DELETE CASCADE ON UPDATE CASCADE
);
					
CREATE TABLE IF NOT EXISTS NETFLIXPOLYDB.Ceremonie (
	id_ceremonie		SERIAL 			NOT NULL,
	maitre 				VARCHAR(100) 	, 
	nom_edifice 		VARCHAR(100) 	NOT NULL,
	ville		 		VARCHAR(100) 	NOT NULL, --a revoir
	pays		 		VARCHAR(100) 	NOT NULL, -- a revoir
	date_ceremonie		DATE 			NOT NULL,
	PRIMARY KEY(id_ceremonie)
);

CREATE TABLE IF NOT EXISTS NETFLIXPOLYDB.NominationFilms (
	id_ceremonie	SERIAL 		NOT NULL,
	num_film	 	SERIAL 		NOT NULL,
	categorie		VARCHAR(100)	NOT NULL,
	PRIMARY KEY(id_ceremonie, num_film, categorie),
	FOREIGN KEY (num_film) REFERENCES NETFLIXPOLYDB.Film(numero) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (id_ceremonie) REFERENCES NETFLIXPOLYDB.Ceremonie(id_ceremonie) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS NETFLIXPOLYDB.FilmsVainqueurs (
	id_ceremonie	SERIAL 		NOT NULL,
	num_film	 	SERIAL 		NOT NULL,
	categorie		VARCHAR(100)	NOT NULL,
	PRIMARY KEY(id_ceremonie, num_film,categorie),
	FOREIGN KEY (num_film) REFERENCES NETFLIXPOLYDB.Film(numero) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (id_ceremonie) REFERENCES NETFLIXPOLYDB.Ceremonie(id_ceremonie) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS NETFLIXPOLYDB.Employee (
	id_employee		SERIAL 			NOT NULL,
	nom				VARCHAR(100)	NOT NULL,
	sexe			sexeType		DEFAULT 'F',
	date_naissance 	DATE 			NOT NULL,
	nationalite		VARCHAR(25)		NOT NULL,
	PRIMARY KEY(id_employee)
);

CREATE TABLE IF NOT EXISTS NETFLIXPOLYDB.Role (
	num_film		SERIAL 			NOT NULL,
	id_employee		SERIAL	 		NOT NULL,
	salaire			NUMERIC(12,2)	NOT NULL,
	description		roleType		NOT NULL,
	PRIMARY KEY(num_film, id_employee, description),
	FOREIGN KEY (id_employee) REFERENCES NETFLIXPOLYDB.Employee(id_employee) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (num_film) REFERENCES NETFLIXPOLYDB.Film(numero) ON DELETE CASCADE ON UPDATE CASCADE
);

