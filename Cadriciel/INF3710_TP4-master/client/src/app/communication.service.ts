import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// tslint:disable-next-line:ordered-imports
import { concat, of, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import {Hotel} from "../../../common/tables/Hotel";
import { Member } from "../../../common/tables/Member";
import { Room } from "../../../common/tables/Room";
import { Login } from "../../../common/tables/Login";

@Injectable()
export class CommunicationService {
    private readonly BASE_URL: string = "http://localhost:3000/database";
    public constructor(private http: HttpClient) { }

    private _listners: any = new Subject<any>();

    public listen(): Observable<any> {
       return this._listners.asObservable();
    }

    public filter(filterBy: string): void {
       this._listners.next(filterBy);
    }

    public getHotels(): Observable<any[]> {
        return this.http.get<Hotel[]>(this.BASE_URL + "/hotel").pipe(
            catchError(this.handleError<Hotel[]>("getHotels")),
        );
    }

    public Login(loginInfo: Login): Observable<any[]>{
        return this.http.post<Login[]>(this.BASE_URL + "/login", loginInfo).pipe(
            catchError(this.handleError<Hotel[]>("Login")),
        );
    }

    public getHotelPKs(): Observable<string[]> {
        return this.http.get<string[]>(this.BASE_URL + "/hotel/hotelNo").pipe(
            catchError(this.handleError<string[]>("getHotelPKs")),
        );
    }

    public insertHotel(hotel: any): Observable<number> {
        return this.http.post<number>(this.BASE_URL + "/hotel/insert", hotel).pipe(
            catchError(this.handleError<number>("inserHotel")),
        );
    }

    public insertRoom(room: Room): Observable<number> {
        return this.http.post<number>(this.BASE_URL + "/rooms/insert", room).pipe(
            catchError(this.handleError<number>("inserHotel")),
        );
    }

    public setUpDatabase(): Observable<any> {
        return concat(this.http.post<any>(this.BASE_URL + "/createSchema", []),
                      this.http.post<any>(this.BASE_URL + "/populateDb", []));
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }

    // nouvelles méthodes
    public insertMember(member: Member): Observable<number> { // why "number"?
        return this.http.post<number>(this.BASE_URL + "/member/insert", member).pipe(
            catchError(this.handleError<number>("insertMember")),
        );
    }

    public getMembers(): Observable<any[]> {
        return this.http.get<Member[]>(this.BASE_URL + "/member").pipe(
            catchError(this.handleError<Member[]>("getMembers")),
        );
    }
}
