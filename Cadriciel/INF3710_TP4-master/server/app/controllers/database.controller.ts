import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";
import {Member} from '../../../common/tables/Member';
import {Movie} from '../../../common/tables/Movie';
import {MovieNom} from '../../../common/tables/MovieNom';
import {MovieWin} from '../../../common/tables/MovieWin';
import {MovieEmp} from '../../../common/tables/MovieEmp';
import {Online} from '../../../common/tables/Online';
import {CreditCard} from '../../../common/tables/CreditCard'

import { DatabaseService } from "../services/database.service";
import Types from "../types";

@injectable()
export class DatabaseController {
    public constructor(@inject(Types.DatabaseService) private databaseService: DatabaseService) { }

    public get router(): Router {
        const router: Router = Router();

        router.post("/createSchema",
            (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.createSchema().then((result: pg.QueryResult) => {
                res.json(result);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });

        router.post("/populateDb",
            (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.populateDb().then((result: pg.QueryResult) => {
                res.json(result);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });
        
		router.post("/login",
            (req: Request, res: Response, next: NextFunction) => {
                const username: string = req.body.username;
                const password: string = req.body.password;
                const loginType: string = req.body.loginType;
                this.databaseService.loginValidation(username, password, loginType).then((result: pg.QueryResult) => {
                    const members: Member[] = result.rows.map((mem: any) => ({
                        id_membre: mem.id_membre,
                        adr_courriel: mem.adr_courriel,
                        mot_de_passe: mem.mot_de_passe,
                        nom_rue: mem.nom_rue,
                        no_appart: mem.no_appart,
                        no_rue: mem.no_rue,
                        code_postal: mem.code_postal,
                        ville: mem.ville,
                        province: mem.province,
                        pays: mem.pays,
                        nom: mem.nom
                    }));
                    res.json(members);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });

        /*router.get("/rooms",
                   (req: Request, res: Response, next: NextFunction) => {

                    this.databaseService.getRoomFromHotelParams(req.query)
                    .then((result: pg.QueryResult) => {
                        const rooms: Room[] = result.rows.map((room: Room) => (
                            {
                            hotelno: room.hotelno,
                            roomno: room.roomno,
                            typeroom: room.typeroom,
                            price: parseFloat(room.price.toString())
                        }));
                        res.json(rooms);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
            });*/

        router.post("/member/insert",
            (req: Request, res: Response, next: NextFunction) => {
            const member: Member = {
                "id_membre": req.body.id_membre,
                "adr_courriel": req.body.adr_courriel,
                "mot_de_passe": req.body.mot_de_passe,
                "nom_rue": req.body.nom_rue,
                "no_appart": req.body.no_appart,
                "no_rue": req.body.no_rue,
                "code_postal": req.body.code_postal,
                "ville": req.body.ville,
                "province": req.body.province,
                "pays": req.body.pays,
                "nom": req.body.nom
            };
            console.log(member);

            this.databaseService.createMember(member)
            .then((result: pg.QueryResult) => {
                res.json(result.rowCount);
            })
            .catch((e: Error) => {
                console.error(e.stack);
                res.json(-1);
            });
        });

        router.post("/member/insert/cc",
            (req: Request, res: Response, next: NextFunction) => {
            const cc: CreditCard = {
                "id_membre": req.body.id_membre,
                "ccv": req.body.ccv,
                "titulaire": req.body.titulaire,
                "numero": req.body.numero,
                "date_expiration": req.body.date_expiration
            };
            console.log(cc);

            this.databaseService.createCC(cc)
            .then((result: pg.QueryResult) => {
                res.json(result.rowCount);
            })
            .catch((e: Error) => {
                console.error(e.stack);
                res.json(-1);
            });
        });

        router.post("/member/online/insert",
            (req: Request, res: Response, next: NextFunction) => {
            const online: Online = {
                "numero": req.body.numero,
                "id_membre": req.body.id_membre,
                "date_visio": req.body.date_visio,
                "duree_visionnement": req.body.duree_visionnement
            };
            console.log(online);

            this.databaseService.createOnlineEntry(online)
            .then((result: pg.QueryResult) => {
                res.json(result.rowCount);
            })
            .catch((e: Error) => {
                console.error(e.stack);
                res.json(-1);
            });
        });

        router.get("/member",
            (req: Request, res: Response, next: NextFunction) => {
             // Send the request to the service and send the response
                this.databaseService.getMembers().then((result: pg.QueryResult) => {
                const members: Member[] = result.rows.map((mem: any) => ({
                    id_membre: mem.id_membre,
                    adr_courriel: mem.adr_courriel,
                    mot_de_passe: mem.mot_de_passe,
                    nom_rue: mem.nom_rue,
                    no_appart: mem.no_appart,
                    no_rue: mem.no_rue,
                    code_postal: mem.code_postal,
                    ville: mem.ville,
                    province: mem.province,
                    pays: mem.pays,
                    nom: mem.nom
                }));
                res.json(members);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });

        router.get("/member/information/:memberID",
        (req: Request, res: Response, next: NextFunction) => {
         // Send the request to the service and send the response
            this.databaseService.getMemberInfo(req.params.memberID).then((result: pg.QueryResult) => {
            const cc: CreditCard[] = result.rows.map((mem: any) => ({
                'numero': mem.numero,
                'ccv': mem.ccv,
                'titulaire': mem.titulaire,
                'date_expiration': mem.date_expiration,
                'id_membre': mem.id_membre,
            }));
            res.json(cc);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });

        router.get("/movie",
            (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                this.databaseService.getMovies().then((result: pg.QueryResult) => {
                const movies: Movie[] = result.rows.map((mem: any) => ({
                    numero: mem.numero,
                    titre: mem.titre,
                    date_production: mem.date_production,
                    duree_totale: mem.duree_totale,
                    genre: mem.genre,
                    prix: mem.prix
                }));
                res.json(movies);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });

        router.get("/movie/sorted",
            (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                this.databaseService.getMoviesSorted().then((result: pg.QueryResult) => {
                const movies: Movie[] = result.rows.map((mem: any) => ({
                    numero: mem.numero,
                    titre: mem.titre,
                    date_production: mem.date_production,
                    duree_totale: mem.duree_totale,
                    genre: mem.genre,
                    prix: mem.prix
                }));
                res.json(movies);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });

        router.get("/movie/nominations",
        (req: Request, res: Response, next: NextFunction) => {
            // Send the request to the service and send the response
            this.databaseService.getMovieNom().then((result: pg.QueryResult) => {
            const movieNom: MovieNom[] = result.rows.map((mem: any) => ({
                "id_ceremonie": mem.id_ceremonie,
                "maitre": mem.maitre,
                "nom_edifice": mem.nom_edifice,
                "ville": mem.ville,
                "pays": mem.pays,
                "date_ceremonie": mem.date_ceremonie,
                "film_nomine": mem.film_nomine,
                "categorie_nomine": mem.categorie_nomine 
            }));
            res.json(movieNom);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });

        router.get("/member/online",
        (req: Request, res: Response, next: NextFunction) => {
            // Send the request to the service and send the response
            this.databaseService.getOnlineViewings().then((result: pg.QueryResult) => {
            const onlineViewings: Online[] = result.rows.map((mem: any) => ({
                "numero": mem.numero,
                "id_membre": mem.id_membre,
                "date_visio": mem.date_visio,
                "duree_visionnement": mem.duree_visionnement
            }));
            res.json(onlineViewings);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });

        router.get("/movie/employees",
        (req: Request, res: Response, next: NextFunction) => {
            // Send the request to the service and send the response
            this.databaseService.getMovieEmps().then((result: pg.QueryResult) => {
            const movieEmp: MovieEmp[] = result.rows.map((mem: any) => ({
                "id_employee": mem.id_employee,
                "nom": mem.nom,
                "sexe": mem.sexe,
                "date_naissance": mem.date_naissance,
                "nationalite": mem.nationalite,
                "salaire": mem.salaire,
                "num_film": mem.num_film,
                "description": mem.description
            }));
            res.json(movieEmp);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });

        router.get("/movie/winning",
        (req: Request, res: Response, next: NextFunction) => {
            // Send the request to the service and send the response
            this.databaseService.getMovieWin().then((result: pg.QueryResult) => {
            const movieWin: MovieWin[] = result.rows.map((mem: any) => ({
                "id_ceremonie": mem.id_ceremonie,
                "maitre": mem.maitre,
                "nom_edifice": mem.nom_edifice,
                "ville": mem.ville,
                "pays": mem.pays,
                "date_ceremonie": mem.date_ceremonie,
                "film_gagne": mem.film_gagne,
                "categorie_gagne": mem.categorie_gagne
            }));
            res.json(movieWin);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });

        router.post("/movie/insert",
            (req: Request, res: Response, next: NextFunction) => {
            const movie: Movie = {
                "numero": req.body.numero,
                "titre": req.body.titre,
                "date_production": req.body.date_production,
                "duree_totale": req.body.duree_totale,
                "genre": req.body.genre,
                "prix": req.body.prix	
            };
            console.log(movie);

            this.databaseService.createMovie(movie)
            .then((result: pg.QueryResult) => {
                res.json(result.rowCount);
            })
            .catch((e: Error) => {
                console.error(e.stack);
                res.json(-1);
            });
        });

        router.delete ("/movie/delete/:movieID",
            (req: Request, res: Response, next: NextFunction) => {
            // Send the request to the service and send the response
            
            this.databaseService.deleteMovie(req.params.movieID)
            .then((result: pg.QueryResult) => {
                res.json(result.rowCount);
            })
            .catch((e: Error) => {
                console.error(e.stack);
                res.json(-1);
            });
        });

        return router;
    }
}
