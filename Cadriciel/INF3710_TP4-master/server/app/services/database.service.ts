import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import {schema} from "../createSchema";
import {data} from "../populateDB";
import { Member } from "../../../common/tables/Member";
import { Movie } from "../../../common/tables/Movie";

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

/*
    // ROOM
    public getRoomFromHotel(hotelNo: string, roomType: string, price: number): Promise<pg.QueryResult> {
        let query: string =
        `SELECT * FROM HOTELDB.room
        WHERE hotelno=\'${hotelNo}\'`;
        if (roomType !== undefined) {
            query = query.concat('AND ');
            query = query.concat(`typeroom=\'${roomType}\'`);
        }
        if (price !== undefined) {
            query = query.concat('AND ');
            query = query.concat(`price =\'${price}\'`);
        }
        console.log(query);

        return this.pool.query(query);
    }

    public getRoomFromHotelParams(params: object): Promise<pg.QueryResult> {
        let query: string = 'SELECT * FROM HOTELDB.room \n';
        const keys: string[] = Object.keys(params);
        if (keys.length > 0) {
            query = query.concat(`WHERE ${keys[0]} =\'${params[keys[0]]}\'`);
        }

        // On enleve le premier element
        keys.shift();

        // tslint:disable-next-line:forin
        for (const param in keys) {
            const value: string = keys[param];
            query = query.concat(`AND ${value} = \'${params[value]}\'`);
            if (param === 'price') {
                query = query.replace('\'', '');
            }
        }

        console.log(query);

        return this.pool.query(query);
    }*/

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
            queryText = `INSERT INTO NetflixPolyDB.Membre VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);`;
        } else {
            values.splice(4,1);
            queryText = `INSERT INTO NetflixPolyDB.Membre(id_membre, adr_courriel, mot_de_passe, nom_rue, no_rue, code_postal, ville, province, pays, nom) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);`;
        }         
        return this.pool.query(queryText, values);
    }

        // MEMBERS
    public getMembers(): Promise<pg.QueryResult> {
        return this.pool.query('SELECT * FROM NetflixPolyDB.Membre;');
    }

    public getMovies(): Promise<pg.QueryResult> {
        return this.pool.query('SELECT * FROM NetflixPolyDB.Film;');
    }

    public getMoviesSorted(): Promise<pg.QueryResult> {
        return this.pool.query('SELECT * FROM NetflixPolyDB.Film ORDER BY titre ASC;');
    }

    public loginValidation(username: string, password: string, loginType: string): Promise<pg.QueryResult> {
        let query: string ='';
        if(loginType === "member"){
            query = `SELECT * FROM NetflixPolyDB.Membre `;
        } else if(loginType === "admin"){
            query = `SELECT * FROM NetflixPolyDB.Admin `;
        }
        console.log(password);
        query = query.concat(`WHERE adr_courriel =\'${username}\' AND mot_de_passe = \'${password}\';`);
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
}
