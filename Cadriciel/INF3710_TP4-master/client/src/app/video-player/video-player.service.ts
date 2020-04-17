import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideoPlayerService {

  API_ENDPOINT: string = 'https://www.cbc.ca/bistro/order';
  playbackTime: any;
  constructor(private http: HttpClient) {}
  
  getPlaybackTime() {
    return this.playbackTime;
  }

  setPlayBackTime(){
    this.playbackTime = 50;
  }
  
  getVideo(mediaID: string) {
      return this.http.get(`${this.API_ENDPOINT}?mediaId=${mediaID}`);
  }
}
