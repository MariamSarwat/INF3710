import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoPlayerService {
  public API_ENDPOINT: string = 'https://www.cbc.ca/bistro/order';
  constructor(private http: HttpClient) {}
  
  public getVideo(mediaID: string): Observable<any> {
      return this.http.get(`${this.API_ENDPOINT}?mediaId=${mediaID}`);
  }
}
