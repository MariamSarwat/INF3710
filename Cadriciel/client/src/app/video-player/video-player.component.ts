import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { VideoPlayerService } from './video-player.service';
import { MemberService } from '../member-dashboard/member.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
  providers: [VideoPlayerService]
})

//Code inspirer de https://stackblitz.com/edit/angular-video-player-snapshot?file=src%2Fapp%2FNew%20File
export class VideoPlayerComponent implements OnInit {
  public hasBeenPlayed: boolean
  public key: string = '';
  public mediaID: string = "1630723954"; 

  @ViewChild('videoPlayer') videoPlayer: ElementRef;

  constructor(private videoPlayerService: VideoPlayerService, private member: MemberService) {}

  ngOnInit(): void {
    this.getVideo(this.mediaID);
    this.member.currentMessage.subscribe(() => {
      if(this.hasBeenPlayed){
		this.member.playbackTime = this.videoPlayer.nativeElement.currentTime;
        this.hasBeenPlayed = false;
      }
    });
  }

  public getVideo(mediaID: string): void {
    this.videoPlayerService.getVideo(mediaID).subscribe((video: any) => {
      this.key = video.items[0].assetDescriptors[1].key; // set key
      this.videoPlayer.nativeElement.currentTime = this.member.playbackTime;
      
      setTimeout(() =>   this.videoPlayer.nativeElement.play(), 1000); // play
      this.hasBeenPlayed = true;
    })
  }
}