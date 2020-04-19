SET search_path = NetflixPolyDB;

--1) Affiche toutes les informations sur le film '1917'.
/*
SELECT *
FROM NetflixPolyDB.Film f
WHERE f.titre = '1917'; 
*/
--2) Liste les titres de film et la dernière date de visionnement ou d'achat ordonné selon les genres de film.
/*
SELECT f.genre, f.titre, tab_3.most_recent_date
FROM
	(SELECT tab_1.titre as titre, (SELECT MAX(max_date) FROM (VALUES(tab_1.maxdate_enligne),(tab_2.maxdate_dvd)) as VALUE(max_date)) as most_recent_date
		FROM (SELECT f.genre, f.titre, MAX(l.date_visionnement) as maxdate_enligne 
				FROM NETFLIXPOLYDB.EnLigne l FULL JOIN NETFLIXPOLYDB.Film f 
				ON f.numero = l.num_film
				GROUP BY f.genre, f.titre) AS tab_1
		FULL JOIN
			(SELECT f.genre, f.titre, MAX(d.date_livraison) as maxdate_dvd
				FROM NETFLIXPOLYDB.CopieDVD d FULL JOIN NETFLIXPOLYDB.Film f 
				ON f.numero = d.num_film
				GROUP BY f.genre, f.titre)AS tab_2
		ON tab_1.titre = tab_2.titre ) as tab_3 INNER JOIN NETFLIXPOLYDB.Film f ON tab_3.titre = f.titre
ORDER BY f.genre;
*/
--3) Affiche les noms et courriels des membres qui ont vissionnés chaque genre de film le plus souvent.
/*
SELECT genre , nom, adresse_courriel, nb_visonnements 
FROM (SELECT f.genre , m.nom, m.adr_courriel, count(f.genre ) as nb_visonnements 
	  FROM NETFLIXPOLYDB.Film f, NETFLIXPOLYDB.Membre m, NETFLIXPOLYDB.EnLigne l 
	  WHERE m.id_membre = l.id_membre and f.numero = l.num_film 
	  GROUP BY f.genre, m.nom, m.adr_courriel) as membrevisiongenre(genre, nom, adresse_courriel, nb_visonnements) 
	  WHERE nb_visonnements >= all (SELECT COUNT(f.genre ) as nb_visonnements 
								FROM NETFLIXPOLYDB.Film f, NETFLIXPOLYDB.Membre m, NETFLIXPOLYDB.EnLigne l 
								WHERE m.id_membre = l.id_membre and f.numero = l.num_film and membrevisiongenre.genre = f.genre 
								GROUP BY f.genre, m.nom, m.adr_courriel)
							
*/
--4) Trouve le nombre total de films groupés par réalisateur. 
/*
SELECT DISTINCT e.nom as realisateurs, COUNT(r.num_film) AS nb_total_films
FROM NETFLIXPOLYDB.Employee e, NETFLIXPOLYDB.Role r
WHERE e.id_employee = r.id_employee AND r.description = 'realisateur'
GROUP BY e.nom;
*/
--5) Trouve les noms des membres dont le coût total d'achat de DVD est plus élevé que la moyenne
/*
SELECT result_2.nom as membres, result_2.cout_total_dvd
FROM
		(SELECT AVG(tab.cout_total_livraison + tab.cout_total_film) as moyenne
		FROM(
			SELECT m.nom, SUM(d.cout_livraison) as cout_total_livraison, SUM(f.prix) as cout_total_film
				FROM NetflixPolyDB.Membre m, NETFLIXPOLYDB.CopieDVD d, NetflixPolyDB.Film f
				WHERE m.id_membre = d.id_membre AND f.numero = d.num_film
				GROUP BY m.nom) as tab) 
									as result_1
CROSS JOIN
		(SELECT tab.nom, (tab.cout_total_livraison + tab.cout_total_film) as cout_total_dvd
			FROM(
				SELECT m.nom, SUM(d.cout_livraison) as cout_total_livraison, SUM(f.prix) as cout_total_film
					FROM NetflixPolyDB.Membre m, NETFLIXPOLYDB.CopieDVD d, NetflixPolyDB.Film f
					WHERE m.id_membre = d.id_membre AND f.numero = d.num_film
					GROUP BY m.nom) as tab
			GROUP BY tab.nom, tab.cout_total_livraison, tab.cout_total_film) as result_2
WHERE result_2.cout_total_dvd > result_1.moyenne;
*/
--6) Retourne en ordre la quantité totale vendue (DVD) et nombre de visionnements par film.
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
--7) Trouve le titre et le prix des films qui n’ont jamais été commandés sous forme de DVD mais qui ont été visionnés plus de 10 fois.
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
--8) Retourne le nom et date de naissance des acteurs qui jouent dans les films qui sont visionnés plus souvent que la moyenne.
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
--9) Retourne le nom du ou des réalisateurs qui ont réalisé les films qui ont le plus grand nombre de nominations aux oscars. 
/*
SELECT tab_realisateurs.nom, tab_realisateurs.nb_nominations
FROM
	(SELECT MAX(realisateurs_nominations.nb_nominations) as nb_nominations_max
	FROM(
		SELECT tab.nom, tab.id_employee, COUNT (tab.id_employee) as nb_nominations
		FROM(
			SELECT *
			FROM(SELECT DISTINCT f.numero, f.titre, c.date_ceremonie
			FROM NETFLIXPOLYDB.Film f, NETFLIXPOLYDB.NominationFilms n, NETFLIXPOLYDB.Ceremonie c
			WHERE f.numero = n.num_film AND  n.id_ceremonie = c.id_ceremonie) as tab_nominations
			INNER JOIN
				(SELECT r.num_film, e.nom, r.id_employee
					FROM NetflixPolyDB.Employee e, NetflixPolyDB.Role r
					WHERE r.description = 'realisateur' AND e.id_employee = r.id_employee) as tab_realisateurs
			ON tab_realisateurs.num_film = tab_nominations.numero) as tab
		GROUP BY tab.nom, tab.id_employee) as realisateurs_nominations) as tab_max
INNER JOIN
		(SELECT tab.nom, tab.id_employee, COUNT (tab.id_employee) as nb_nominations
		FROM(
			SELECT *
			FROM(SELECT DISTINCT f.numero, f.titre, c.date_ceremonie
					FROM NETFLIXPOLYDB.Film f, NETFLIXPOLYDB.NominationFilms n, NETFLIXPOLYDB.Ceremonie c
					WHERE f.numero = n.num_film AND  n.id_ceremonie = c.id_ceremonie) as tab_nominations
			INNER JOIN
				(SELECT r.num_film, e.nom, r.id_employee
					FROM NetflixPolyDB.Employee e, NetflixPolyDB.Role r
					WHERE r.description = 'realisateur' AND e.id_employee = r.id_employee) as tab_realisateurs
			ON tab_realisateurs.num_film = tab_nominations.numero) as tab
		 GROUP BY tab.nom, tab.id_employee) as tab_realisateurs
ON tab_max.nb_nominations_max = tab_realisateurs.nb_nominations;
*/
--10) Trouve le nom des réalisateurs qui ont été nominés le plus souvent aux oscars (Max nominations) mais qui n’ont jamais gagné un prix.
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
--11) Retourne les films (titre, année) ainsi que leur réalisateurs et leurs acteurs qui ont gagné le plus d’oscars que la moyenne. 
/*
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
*/
--12) Retourne le(s) paire(s) de femmes québécoises qui ont travaillé ensemble le plus souvent.
/*
SELECT f.numero, f.titre, e.nom, e.id_employee
FROM NETFLIXPOLYDB.Film f, NetflixPolyDB.Employee e, NetflixPolyDB.Role r
WHERE e.nationalite = 'Québec' AND e.sexe = 'F' AND e.id_employee = r.id_employee AND r.num_film = f.numero
*/
--13) Trouve l'évolution de la carrière de Woody Allen. Retourne tous ses rôles dans un film (réalisateur, acteur, etc.) ordonné du plus ancien au plus 
-- récent
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
