import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import {schema} from "../createSchema";
import {data} from "../populateDB";
import { Member } from "../../../common/tables/Member";
import { Movie } from "../../../common/tables/Movie";
import { Online } from "../../../common/tables/Online";
import { CreditCard } from "../../../common/tables/CreditCard";

@injectable()
export class DatabaseService {

    // A MODIFIER POUR VOTRE BD
    public connectionConfig: pg.ConnectionConfig = {
        user: "mariam",
        database: "netflixPoly",
        password: "mariam06",
        port: 5432,
        host: "127.0.0.1",
        keepAlive : true
    };

    private pool: pg.Pool = new pg.Pool(this.connectionConfig);

    public constructor() {
        this.pool.connect();
    }
    /*
        METHODES DE DEBUG
    */
    public createSchema(): Promise<pg.QueryResult> {
        return this.pool.query(schema);
    }

    public populateDb(): Promise<pg.QueryResult> {
        return this.pool.query(data);
    }   

    public createMember(memberInfo: Member): Promise<pg.QueryResult> {
        let values: string[] = [
            memberInfo.id_membre.toString(),
            memberInfo.adr_courriel,
            memberInfo.mot_de_passe,
            memberInfo.nom_rue,
            memberInfo.no_appart.toString(),
            memberInfo.no_rue.toString(),
            memberInfo.code_postal.toString(),
            memberInfo.ville,
            memberInfo.province,
            memberInfo.pays,
            memberInfo.nom
        ];
        let queryText: string;
        if(memberInfo.no_appart){ 
            queryText = `INSERT INTO NetflixPolyDB.Membre VALUES($1,$2, NetflixPolyDB.crypt($3, NetflixPolyDB.gen_salt('bf')),$4,$5,$6,$7,$8,$9,$10,$11);`;
        } else {
            values.splice(4,1);
            queryText = `INSERT INTO NetflixPolyDB.Membre(id_membre, adr_courriel, mot_de_passe, nom_rue, no_rue, code_postal, ville, province, pays, nom) VALUES($1,$2, NetflixPolyDB.crypt($3, NetflixPolyDB.gen_salt('bf')),$4,$5,$6,$7,$8,$9,$10);`;
        }         
        return this.pool.query(queryText, values);
    }

        // MEMBERS
    public getMembers(): Promise<pg.QueryResult> {
        return this.pool.query('SELECT * FROM NetflixPolyDB.Membre;');
    }

    public getMovies(): Promise<pg.QueryResult> {
        return this.pool.query('SELECT * FROM NetflixPolyDB.Film ORDER BY numero;');
    }

    public getMoviesSorted(): Promise<pg.QueryResult> {
        return this.pool.query('SELECT * FROM NetflixPolyDB.Film ORDER BY titre ASC;');
    }

    public getMovieNom(): Promise<pg.QueryResult> {
        return this.pool.query(`SELECT c.id_ceremonie, c.maitre, c.nom_edifice, c.ville, c.pays, c.date_ceremonie, nf.num_film as film_nomine, string_agg(nf.categorie, ', ') as categorie_nomine
        FROM NetflixPolyDB.Ceremonie c INNER JOIN NetflixPolyDB.nominationfilms nf ON c.id_ceremonie = nf.id_ceremonie
        INNER JOIN NetflixPolyDB.film f ON f.numero = nf.num_film
       GROUP BY c.id_ceremonie, nf.num_film;`);
    }

    public getMovieWin(): Promise<pg.QueryResult> {
        return this.pool.query(`SELECT c.id_ceremonie, c.maitre, c.nom_edifice, c.ville, c.pays, c.date_ceremonie, fv.num_film as film_gagne, string_agg(fv.categorie, ', ') as categorie_gagne
        FROM NetflixPolyDB.Ceremonie c INNER JOIN NetflixPolyDB.filmsVainqueurs fv ON c.id_ceremonie = fv.id_ceremonie
        INNER JOIN NetflixPolyDB.film f ON f.numero = fv.num_film 
        GROUP BY c.id_ceremonie, fv.num_film;`);
    }

    public getOnlineViewings(): Promise<pg.QueryResult> {
        return this.pool.query(`SELECT l.id_membre, l.num_film as numero, l.date_visionnement as date_visio, l.duree_visionnement FROM NetflixPolyDB.enligne l 
        WHERE l.date_visionnement = (SELECT MAX(l_1.date_visionnement) FROM NetflixPolyDB.enligne l_1 
        WHERE l_1.num_film = l.num_film AND l_1.id_membre = l.id_membre)`);
    }

    public getMovieEmps(): Promise<pg.QueryResult> {
        return this.pool.query(`SELECT e.id_employee, e.nom, e.sexe, e.date_naissance, e.nationalite, r.salaire, r.num_film, r.description
        FROM NetflixPolyDB.Employee e INNER JOIN NetflixPolyDB.Role r ON e.id_employee = r.id_employee
        INNER JOIN NetflixPolyDB.film f ON f.numero = r.num_film;`);
    }
    
    public getMemberInfo(memberID: number): Promise<pg.QueryResult> {
        return this.pool.query(`SELECT * FROM NetflixPolyDB.CarteDeCredit cc WHERE cc.id_membre = \'${memberID}\';`);
    }

    public createCC(cc: CreditCard): Promise<pg.QueryResult> {
        let values: string[] = [
            cc.id_membre.toString(),
            cc.numero.toString(),
            cc.ccv.toString(),
            cc.titulaire,
            cc.date_expiration
        ];
        const queryText: string = `INSERT INTO NETFLIXPOLYDB.CarteDeCredit (id_membre, numero, ccv, titulaire, date_expiration) VALUES ($1, $2, $3, $4, $5);`;   
        return this.pool.query(queryText, values);
    }

    public createOnlineEntry(online: Online): Promise<pg.QueryResult> {
        let values: string[] = [
            online.id_membre.toString(),
            online.numero.toString(),
            online.duree_visionnement.toString(),
        ];
        const queryText: string = `INSERT INTO NetflixPolyDB.EnLigne (id_membre, num_film, date_visionnement, duree_visionnement) VALUES ($1, $2, current_timestamp, $3);`;   
        return this.pool.query(queryText, values);
    }

    public loginValidation(username: string, password: string, loginType: string): Promise<pg.QueryResult> {
        let query: string ='';
        if(loginType === "member"){
            query = `SELECT * FROM NetflixPolyDB.Membre `;
        } else if(loginType === "admin"){
            query = `SELECT * FROM NetflixPolyDB.Admin `;
        }
        console.log(password);
        query = query.concat(`WHERE adr_courriel =\'${username}\' AND mot_de_passe = NetflixPolyDB.crypt(\'${password}\', mot_de_passe);`);
        return this.pool.query(query);
    }

    public deleteMovie(movieID: number): Promise<pg.QueryResult> {
        let query: string =`DELETE FROM NetflixPolyDB.Film WHERE numero = \'${movieID.toString()}\';`;
        return this.pool.query(query);
    }

    public createMovie(movieInfo: Movie): Promise<pg.QueryResult> {
        const values: string[] = [
            movieInfo.numero.toString(),
            movieInfo.titre,
            movieInfo.date_production,
            movieInfo.duree_totale,
            movieInfo.genre,
            movieInfo.prix.toString(),
        ];
        const queryText: string= `INSERT INTO NetflixPolyDB.Film VALUES($1,$2,$3,$4,$5,$6);`;

        return this.pool.query(queryText, values);
    }

    public modifyMovie(movieInfo: Movie): Promise<pg.QueryResult> {
        const values: string[] = [
            movieInfo.numero.toString(),
            movieInfo.titre,
            movieInfo.date_production,
            movieInfo.duree_totale,
            movieInfo.genre,
            movieInfo.prix.toString(),
        ];
        const queryText: string= `UPDATE NetflixPolyDB.film SET titre = $2, date_production = $3, duree_totale= $4, genre = $5, prix = $6
        WHERE numero = $1;`;

        return this.pool.query(queryText, values);
    }
}
