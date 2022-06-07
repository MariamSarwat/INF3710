
/* Nous avons d�cid� de ne pas impl�menter l'utilisation de google maps API. Cependant, nous avons quand m�me d�cid� d'impl�menter le trigger en esp�rant qu'on peut chercher quelques points. 

Dans la partie qui suit, nous allons expliquer qu'est-ce qu'on aurait fait. Tout d'abord, en lisant la documentation de l'API, on est capable de comprendre les diff�rents param�tres qui doivent �tre d�clar� et comment les int�grer dans notre appel. Comme mentionn� dans l'�nonc�, le param�tre origins de l'API sera fix� � l'adresse de Polytechnique tandis que le param�tre destinations sera mis � l'adresse du membre. Cette adresse de livraison sera obtenu en faisant un SELECT dans la table des membres avec l'id du membre en question. Finalement, on peut obtenir la distance entre les deux adresses avec l'API en suivant les consignes dans la page web suivante : https://developers.google.com/maps/documentation/distance-matrix/intro. 

Pour la prochaine partie (th�oriquement) nous aurons cr�� une table temporaire qui sera utilis�e dans notre trigger. Cette table qui s'appelle CommandeDVD poss�derait les attributs suivants: id membre, num film, numero_dvd et distance livraison. Donc, apr�s avoir obtenu la distance a l'aide de l'API, nous allons ins�rer les informations dans la table temporaire.  */

SET search_path = NETFLIXPOLYDB;

DROP TRIGGER IF EXISTS new_purchase ON NETFLIXPOLYDB.CommandeDVD CASCADE;
DROP FUNCTION IF EXISTS calculate_cost CASCADE;

CREATE FUNCTION calculate_cost() RETURNS trigger AS $purchase$
BEGIN
INSERT INTO NETFLIXPOLYDB.CopieDVD (id_membre, num_film, numero_dvd, date_livraison, cout_livraison) VALUES (NEW.id_membre, NEW.num_film,
NEW.numero_dvd, current_timestamp, NEW.distance_livraison * 0.25);
RETURN NEW;
END;
$purchase$ LANGUAGE plpgsql;

CREATE TRIGGER new_purchase AFTER INSERT
ON NETFLIXPOLYDB.CommandeDVD
FOR EACH ROW EXECUTE FUNCTION calculate_cost();

--Test
/*INSERT INTO NETFLIXPOLYDB.CommandeDVD (id_membre, num_film, numero_dvd, distance_livraison) VALUES (2, 2, 3, 3, 22.12);
 SELECT * FROM NETFLIXPOLYDB.CopieDVD;
 SELECT * FROM NETFLIXPOLYDB.CommandeDVD; */