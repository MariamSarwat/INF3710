
/* Nous avons décidé de ne pas implémenter l'utilisation de google maps API. Cependant, nous avons quand même décidé d'implémenter le trigger en espérant qu'on peut chercher quelques points. 

Dans la partie qui suit, nous allons expliquer qu'est-ce qu'on aurait fait. Tout d'abord, en lisant la documentation de l'API, on est capable de comprendre les différents paramètres qui doivent être déclaré et comment les intégrer dans notre appel. Comme mentionné dans l'énoncé, le paramètre origins de l'API sera fixé à l'adresse de Polytechnique tandis que le paramètre destinations sera mis à l'adresse du membre. Cette adresse de livraison sera obtenu en faisant un SELECT dans la table des membres avec l'id du membre en question. Finalement, on peut obtenir la distance entre les deux adresses avec l'API en suivant les consignes dans la page web suivante : https://developers.google.com/maps/documentation/distance-matrix/intro. 

Pour la prochaine partie (théoriquement) nous aurons créé une table temporaire qui sera utilisée dans notre trigger. Cette table qui s'appelle CommandeDVD possèderait les attributs suivants: id membre, num film, numero_dvd et distance livraison. Donc, après avoir obtenu la distance a l'aide de l'API, nous allons insérer les informations dans la table temporaire.  */

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