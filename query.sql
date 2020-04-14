SET search_path = NetflixPolyDB;

--1) Affichez toutes les informations sur un film spécifié par l'utilisateur (selon le titre)
/*
SELECT *
FROM NetflixPolyDB.Film f
ORDER BY f.titre;
*/
--2) Pour chaque genre de film, listez tous les titres de films ainsi que la dernière date à laquelle 
--	 un film a été acheté (DVD) ou visionné...done
/*
SELECT f.genre, f.titre, (SELECT MAX(max_date) FROM (VALUES(tab_3.maxdate_enligne),(tab_3.maxdate_dvd)) as VALUE(max_date)) as most_recent_date
FROM
	(SELECT tab_1.titre as titre_enligne, tab_2.titre as titre_dvd, tab_1.maxdate_enligne, tab_2.maxdate_dvd
		FROM (SELECT f.genre, f.titre, MAX(l.date_visionnement) as maxdate_enligne 
				FROM NETFLIXPOLYDB.EnLigne l FULL JOIN NETFLIXPOLYDB.Film f 
				ON f.numero = l.num_film
				GROUP BY f.genre, f.titre) AS tab_1
		FULL JOIN
			(SELECT f.genre, f.titre, MAX(d.date_livraison) as maxdate_dvd
				FROM NETFLIXPOLYDB.CopieDVD d FULL JOIN NETFLIXPOLYDB.Film f 
				ON f.numero = d.num_film
				GROUP BY f.genre, f.titre)AS tab_2
		ON tab_1.titre = tab_2.titre
		GROUP BY tab_1.titre, tab_2.titre, tab_1.maxdate_enligne, tab_2.maxdate_dvd) as tab_3, NETFLIXPOLYDB.Film f
WHERE tab_3.titre_enligne = f.titre OR tab_3.titre_dvd = f.titre
ORDER BY f.genre;

*/
--3)Pour chaque genre de film, trouvez les noms et courriels des membres qui les ont visionnés le
--	plus souvent. Par exemple, Amal Z est le membre qui a visionné le plus de documentaires
--	animaliers ...à perfectionner
/*
SELECT *
	FROM(SELECT tab_1.nom, tab_1.adr_courriel, MAX (tab_1.nb_films_vus)
		FROM
			(SELECT liste_films.genre, m.nom, m.adr_courriel, COUNT(liste_films.num_film) AS nb_films_vus
				FROM (NetflixPolyDB.Film f 
					  FULL JOIN
					  NetflixPolyDB.EnLigne l 
					  ON l.num_film = f.numero) as liste_films 
			 			FULL JOIN 
			 			NetflixPolyDB.Membre m
						ON liste_films.id_membre = m.id_membre
				GROUP BY liste_films.genre, m.nom, m.adr_courriel
				ORDER BY liste_films.genre) as tab_1
		GROUP BY tab_1.nom, tab_1.adr_courriel) as result_1
	INNER JOIN
		(SELECT tab_2.genre, MAX (tab_2.nb_films_vus)
		FROM
			(SELECT liste_films.genre, m.nom, m.adr_courriel, COUNT(liste_films.num_film) AS nb_films_vus
				FROM (NetflixPolyDB.Film f 
					  FULL JOIN
					  NetflixPolyDB.EnLigne l 
					  ON l.num_film = f.numero) as liste_films 
			 			FULL JOIN 
			 			NetflixPolyDB.Membre m
						ON liste_films.id_membre = m.id_membre
				GROUP BY liste_films.genre, m.nom, m.adr_courriel
				ORDER BY liste_films.genre) as tab_2
		GROUP BY tab_2.genre) as result_2
	ON result_1.max = result_2.max
GROUP BY result_2.genre, result_1.nom, result_1.adr_courriel, result_1.max, result_2.max;
*/

--4) Trouvez le nombre total de films groupés par réalisateur 
/*
SELECT DISTINCT e.nom, COUNT(r.num_film) AS nb_total_films
FROM NETFLIXPOLYDB.Employee e, NETFLIXPOLYDB.Role r
WHERE e.id_employee = r.id_employee AND r.description = 'realisateur'
GROUP BY e.nom;
*/
--5) Trouvez les noms des membres dont le coût total d'achat de DVD est plus élevé que la moyenne
--...done
/*
SELECT result_2.nom, result_2.cout_total_dvd
FROM
		(SELECT AVG(tab.cout_total_livraison + tab.cout_total_film) as moyenne
		FROM(
			SELECT DISTINCT m.nom, SUM(d.cout_livraison) as cout_total_livraison, SUM(f.prix) as cout_total_film
				FROM NetflixPolyDB.Membre m, NETFLIXPOLYDB.CopieDVD d, NetflixPolyDB.Film f
				WHERE m.id_membre = d.id_membre AND f.numero = d.num_film
				GROUP BY m.nom) as tab) 
									as result_1
CROSS JOIN
		(SELECT tab.nom, (tab.cout_total_livraison + tab.cout_total_film) as cout_total_dvd
			FROM(
				SELECT DISTINCT m.nom, SUM(d.cout_livraison) as cout_total_livraison, SUM(f.prix) as cout_total_film
					FROM NetflixPolyDB.Membre m, NETFLIXPOLYDB.CopieDVD d, NetflixPolyDB.Film f
					WHERE m.id_membre = d.id_membre AND f.numero = d.num_film
					GROUP BY m.nom) as tab
			GROUP BY tab.nom, tab.cout_total_livraison, tab.cout_total_film) as result_2
WHERE result_2.cout_total_dvd > result_1.moyenne;
*/
--6) Ordonnez et retournez les films en termes de quantité totale vendue (DVD) et en nombre de
--visionnements
/*
SELECT tab_enLigne.numero as id_film, tab_enLigne.titre, tab_dvd.qte_dvd_vendue, tab_enLigne.nb_visionnements
	FROM(SELECT f.numero, f.titre, COUNT(l.num_film) as nb_visionnements
			FROM NetflixPolyDB.Film f FULL JOIN NetflixPolyDB.EnLigne l ON f.numero = l.num_film
			GROUP BY f.numero, f.titre
			ORDER BY  f.titre) as tab_enLigne
	INNER JOIN
		(SELECT f.titre, COUNT(d.num_film) as qte_dvd_vendue
			FROM NetflixPolyDB.Film f FULL JOIN NETFLIXPOLYDB.CopieDVD d ON f.numero = d.num_film
			GROUP BY f.titre
			ORDER BY f.titre) as tab_dvd
	ON tab_enLigne.titre = tab_dvd.titre
	GROUP BY tab_enLigne.numero, tab_enLigne.titre, tab_enLigne.nb_visionnements, tab_dvd.qte_dvd_vendue
	ORDER BY tab_dvd.qte_dvd_vendue DESC, tab_enLigne.nb_visionnements DESC;
*/
--7) Trouvez le titre et le prix des films qui n’ont jamais été commandés sous forme de DVD mais
--qui ont été visionnés plus de 10 fois
/*
SELECT tab_enLigne.titre, tab_enLigne.prix, tab_enLigne.nb_visionnements, tab_dvd.qte_dvd_commandee
	FROM(SELECT f.titre, f.prix, COUNT(l.num_film) as nb_visionnements
			FROM NetflixPolyDB.Film f FULL JOIN NetflixPolyDB.EnLigne l ON f.numero = l.num_film
			GROUP BY f.titre, f.prix
			ORDER BY  f.titre) as tab_enLigne
	INNER JOIN
		(SELECT f.titre, f.prix, COUNT(d.num_film) as qte_dvd_commandee
			FROM NetflixPolyDB.Film f FULL JOIN NETFLIXPOLYDB.CopieDVD d ON f.numero = d.num_film
			GROUP BY f.titre, f.prix
			ORDER BY f.titre) as tab_dvd
	ON tab_enLigne.titre = tab_dvd.titre
	GROUP BY tab_enLigne.titre, tab_enLigne.prix, tab_enLigne.nb_visionnements, tab_dvd.qte_dvd_commandee
	HAVING tab_enLigne.nb_visionnements >= 10 AND tab_dvd.qte_dvd_commandee = 0;
*/
--8) Trouvez le nom et date de naissance des acteurs qui jouent dans les films qui sont visionnés
--le plus souvent (soit plus que la moyenne)
/*
SELECT tab_films.titre, tab_acteurs.nom, tab_acteurs.date_naissance
	FROM(SELECT tab_2.numero, tab_2.titre, tab_2.nb_visionnements
		FROM
			(SELECT AVG(tab.nb_visionnements) as nb_visionnement_moyen
				FROM(SELECT f.titre, COUNT(l.num_film) as nb_visionnements
						FROM NetflixPolyDB.Film f FULL JOIN NetflixPolyDB.EnLigne l ON f.numero = l.num_film
						GROUP BY f.titre) as tab) as tab_1
			CROSS JOIN
			(SELECT f.numero, f.titre, COUNT(l.num_film) as nb_visionnements
					FROM NetflixPolyDB.Film f FULL JOIN NetflixPolyDB.EnLigne l ON f.numero = l.num_film
					GROUP BY f.numero, f.titre) as tab_2
		WHERE tab_2.nb_visionnements > tab_1.nb_visionnement_moyen) as tab_films
INNER JOIN
	(SELECT r.num_film, e.nom, e.date_naissance, r.description
		FROM NetflixPolyDB.Employee e, NetflixPolyDB.Role r
		WHERE r.description = 'acteur' AND e.id_employee = r.id_employee) as tab_acteurs
ON tab_acteurs.num_film = tab_films.numero
ORDER BY tab_films.numero;
*/

--9) Trouvez le nom du ou des réalisateurs qui ont réalisé les films qui ont le plus grand nombre
--de nominations aux oscars. Par exemple, Woody Allen et Steven Spielberg ont réalisé 10
--films qui ont été nominés aux oscars.
--nb de nomination par film
/*
SELECT tab_realisateurs.nom, tab_nominations.titre, tab_nominations.nb_nominations
FROM(SELECT tab_2.numero as film_id, tab_2.titre, tab_2.nb_nominations
	FROM
		(SELECT MAX(tab.nb_nominations) as nb_nominations_max
			FROM(SELECT f.numero, f.titre, COUNT(n.num_film) as nb_nominations
				FROM NetflixPolyDB.Film f, NetflixPolyDB.NominationFilms n
				WHERE f.numero = n.num_film
				GROUP BY f.titre, f.numero
				ORDER BY f.numero) as tab) as tab_1
	INNER JOIN
		(SELECT f.numero, f.titre, COUNT(n.num_film) as nb_nominations
			FROM NetflixPolyDB.Film f, NetflixPolyDB.NominationFilms n
			WHERE f.numero = n.num_film
			GROUP BY f.titre, f.numero
			ORDER BY f.numero) as tab_2
	ON tab_1.nb_nominations_max = tab_2.nb_nominations) as tab_nominations
INNER JOIN
	(SELECT r.num_film, e.nom
		FROM NetflixPolyDB.Employee e, NetflixPolyDB.Role r
		WHERE r.description = 'realisateur' AND e.id_employee = r.id_employee) as tab_realisateurs
ON tab_realisateurs.num_film = tab_nominations.film_id;
*/
--10) Trouvez le nom des réalisateurs qui ont été le plus souvent nominés aux oscars mais qui
--n’ont jamais gagné d’oscar...on suppose que par 'plus souvent nominé', on veut dire 'max de nominations'
/*
SELECT tab_result.nom, MAX(tab_result.nb_total_nominations)as nb_total_nominations, tab_result.nb_total_dundies
FROM(
	SELECT tab_total_nominations.nom, tab_total_nominations.nb_total_nominations, tab_total_oscars.nb_total_dundies
	FROM(SELECT tab_realisateurs.nom, SUM(tab_nominations.nb_nominations) as nb_total_nominations
			FROM(SELECT f.numero, f.titre, COUNT(n.num_film) as nb_nominations
					FROM NetflixPolyDB.Film f, NetflixPolyDB.NominationFilms n
					WHERE f.numero = n.num_film
					GROUP BY f.titre, f.numero
					ORDER BY f.numero) as tab_nominations
			INNER JOIN
				(SELECT r.num_film, e.nom
					FROM NetflixPolyDB.Employee e, NetflixPolyDB.Role r
					WHERE r.description = 'realisateur' AND e.id_employee = r.id_employee) as tab_realisateurs
			ON tab_realisateurs.num_film = tab_nominations.numero
			GROUP BY tab_realisateurs.nom) as tab_total_nominations
	FULL JOIN
		(SELECT tab_realisateurs.nom, SUM(tab_oscars.nb_oscars) as nb_total_dundies
			FROM(SELECT f.numero, f.titre, COUNT(v.num_film) as nb_oscars
					FROM NetflixPolyDB.Film f, NetflixPolyDB.FilmsVainqueurs v
					WHERE f.numero = v.num_film
					GROUP BY f.titre, f.numero
					ORDER BY f.numero) as tab_oscars
			INNER JOIN
				(SELECT r.num_film, e.nom
					FROM NetflixPolyDB.Employee e, NetflixPolyDB.Role r
					WHERE r.description = 'realisateur' AND e.id_employee = r.id_employee) as tab_realisateurs
			ON tab_realisateurs.num_film = tab_oscars.numero
			GROUP BY tab_realisateurs.nom) as tab_total_oscars
	ON tab_total_oscars.nom = tab_total_nominations.nom
	WHERE tab_total_oscars.nb_total_dundies IS NULL
	GROUP BY tab_total_nominations.nom, tab_total_nominations.nb_total_nominations, tab_total_oscars.nb_total_dundies) as tab_result
GROUP BY tab_result.nom, tab_result.nb_total_dundies;
*/


--11) Trouvez les films (titre, année) qui ont gagné le plus d’oscars. Listez également leur
--réalisateurs et leurs acteurs; ...on suppose que par plus d'oscars, on veut dire 'plus que la moyenne'

SELECT tab_films.titre, tab_films.date_production, tab_employees.realisateurs, tab_employees.acteurs
	FROM(SELECT tab_oscars.numero, tab_oscars.titre, tab_oscars.date_production, tab_oscars.nb_oscars
		FROM(SELECT AVG(tab_oscars.nb_oscars) as moyenne_oscars
				FROM(SELECT f.numero, f.titre, f.date_production, COUNT(v.num_film) as nb_oscars
						FROM NetflixPolyDB.Film f, NetflixPolyDB.FilmsVainqueurs v
						WHERE f.numero = v.num_film
						GROUP BY f.titre, f.numero
						ORDER BY f.numero) as tab_oscars) as tab_moyenne
		CROSS JOIN
			(SELECT f.numero, f.titre, f.date_production, COUNT(v.num_film) as nb_oscars
						FROM NetflixPolyDB.Film f, NetflixPolyDB.FilmsVainqueurs v
						WHERE f.numero = v.num_film
						GROUP BY f.titre, f.numero
						ORDER BY f.numero) as tab_oscars
		WHERE tab_oscars.nb_oscars > tab_moyenne.moyenne_oscars) as tab_films
INNER JOIN
		(SELECT tab_realisateurs.num_film, tab_realisateurs.realisateurs as realisateurs, tab_acteurs.acteurs as acteurs
			FROM(SELECT r.num_film, e.nom as realisateurs
					FROM NetflixPolyDB.Employee e, NetflixPolyDB.Role r
					WHERE r.description = 'realisateur' AND e.id_employee = r.id_employee) as tab_realisateurs
		INNER JOIN
				(SELECT r.num_film, e.nom as acteurs
					FROM NetflixPolyDB.Employee e, NetflixPolyDB.Role r
					WHERE r.description = 'acteur' AND e.id_employee = r.id_employee) as tab_acteurs
		ON tab_realisateurs.num_film = tab_acteurs.num_film) as tab_employees
ON tab_films.numero = tab_employees.num_film;


--12) Quelles paires de femmes québécoises ont le plus souvent travaillé ensemble dans différents
--films ?...à faire...
--Parmi tous les films, on retourne les employés de sexe féminin de nationalité québécoise
/*
SELECT f.numero, f.titre, e.nom, e.id_employee
FROM NETFLIXPOLYDB.Film f, NetflixPolyDB.Employee e, NetflixPolyDB.Role r
WHERE e.nationalite = 'Québec' AND e.sexe = 'F' AND e.id_employee = r.id_employee AND r.num_film = f.numero
*/
--13) Comment a évolué la carrière de Woody Allen ? (On veut connaitre tous ses rôles dans un
--film (réalisateur, acteur, etc.) du plus ancien au plus récent)
/*
SELECT tab_films.titre as titre_film, tab_films.date_production, tab_roles_woody.description as role_film
	FROM(SELECT tab_role.num_film, tab_role.description
			FROM(SELECT e.id_employee, e.nom
				FROM NETFLIXPOLYDB.Employee e
				WHERE e.nom = 'Woody Allen') as tab_woody
		INNER JOIN
				(SELECT r.id_employee, r.num_film, r.description
				FROM NETFLIXPOLYDB.Role r) as tab_role
		ON tab_woody.id_employee = tab_role.id_employee) as tab_roles_woody
INNER JOIN
		(SELECT f.numero, f.titre, f.date_production
		FROM NETFLIXPOLYDB.Film f) as tab_films
ON tab_roles_woody.num_film = tab_films.numero
ORDER BY tab_films.date_production;
*/