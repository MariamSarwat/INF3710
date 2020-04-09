import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

import {Hotel} from "../../../common/tables/Hotel";
import {Member} from '../../../common/tables/Member';
import {Room} from '../../../common/tables/Room';
import {Movie} from '../../../common/tables/Movie';


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

        router.get("/hotel",
                   (req: Request, res: Response, next: NextFunction) => {
                    // Send the request to the service and send the response
                    this.databaseService.getHotels().then((result: pg.QueryResult) => {
                    const hotels: Hotel[] = result.rows.map((hot: any) => (
                        {
                        hotelno: hot.hotelno,
                        hotelname: hot.hotelname,
                        city: hot.city
                    }));
                    res.json(hotels);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.get("/hotel/hotelNo",
                   (req: Request, res: Response, next: NextFunction) => {
                      this.databaseService.getHotelNo().then((result: pg.QueryResult) => {
                        const hotelPKs: string[] = result.rows.map((row: any) => row.hotelno);
                        res.json(hotelPKs);
                      }).catch((e: Error) => {
                        console.error(e.stack);
                    });
                  });

        router.post("/hotel/insert",
            (req: Request, res: Response, next: NextFunction) => {
                const hotelNo: string = req.body.hotelNo;
                const hotelName: string = req.body.hotelName;
                const city: string = req.body.city;
                this.databaseService.createHotel(hotelNo, hotelName, city).then((result: pg.QueryResult) => {
                res.json(result.rowCount);
            }).catch((e: Error) => {
                console.error(e.stack);
                res.json(-1);
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
		router.delete("/hotel/insert", /*TODO*/);

        router.get("/rooms",
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
            });

        router.post("/rooms/insert",
                    (req: Request, res: Response, next: NextFunction) => {
                    const room: Room = {
                        hotelno: req.body.hotelno,
                        roomno: req.body.roomno,
                        typeroom: req.body.typeroom,
                        price: parseFloat(req.body.price)};
                    console.log(room);

                    this.databaseService.createRoom(room)
                    .then((result: pg.QueryResult) => {
                        res.json(result.rowCount);
                    })
                    .catch((e: Error) => {
                        console.error(e.stack);
                        res.json(-1);
                    });
        });

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
        router.get("/tables/:tableName",
                   (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.getAllFromTable(req.params.tableName)
                    .then((result: pg.QueryResult) => {
                        res.json(result.rows);
                    }).catch((e: Error) => {
                        console.error(e.stack);
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

        return router;
    }
}
