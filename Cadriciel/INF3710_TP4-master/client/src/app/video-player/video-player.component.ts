import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { VideoPlayerService } from './video-player.service';
import { MemberService } from '../member-dashboard/member.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
  providers: [VideoPlayerService]
})
//COde inspirer de https://stackblitz.com/edit/angular-video-player-snapshot?file=src%2Fapp%2FNew%20File
export class VideoPlayerComponent implements OnInit {
  playbackTime: any;
  mediaID: string = "1630723954"; // 1725224003806, 1630723954, 2667647842, 1402726504 
  video: any = {
    title: "",
    description: "",
    duration: "",
    key: ""
  }

  @ViewChild('videoPlayer') videoPlayer: ElementRef;

  constructor(private videoPlayerService: VideoPlayerService, private member: MemberService) { 
    this.playbackTime = this.member.playbackTime;
  }

  ngOnInit() {
    this.getVideo(this.mediaID);
  }

 /* @HostListener('window:keyup' || "pause", ['$event'])
  onVideoPause(event: KeyboardEvent) {
    console.log(this.videoPlayer.nativeElement.currentTime)  
  }*/

  getVideo(mediaID: string) {
    this.videoPlayerService.getVideo(mediaID).subscribe((video: any) => {
      // set duration
      let duration = video.items[0].duration;
      let minutes = Math.floor(duration / 60);
      let seconds = Math.floor(duration % 60);
      this.video.duration = minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);

      this.video.key = video.items[0].assetDescriptors[1].key; // set key
      console.log(this.playbackTime);
      this.videoPlayer.nativeElement.currentTime = this.playbackTime;
      
      setTimeout(() =>   this.videoPlayer.nativeElement.play(), 3000); // play
    })
  }
}
/*SET search_path = NetflixPolyDB;
/*
--tout employe des films
SELECT e.id_employee, e.nom, e.sexe, e.date_naissance, e.nationalite, r.salaire, r.num_film, r.description
	 FROM NetflixPolyDB.Employee e INNER JOIN NetflixPolyDB.Role r ON e.id_employee = r.id_employee
	 INNER JOIN NetflixPolyDB.film f ON f.numero = r.num_film
	;


--tout film gagne
SELECT c.id_ceremonie, c.maitre, c.nom_edifice, c.ville, c.pays, c.date_ceremonie, fv.num_film as film_gagne, fv.categorie as categorie_gagne
	 FROM NetflixPolyDB.Ceremonie c INNER JOIN NetflixPolyDB.filmsVainqueurs fv ON c.id_ceremonie = fv.id_ceremonie
	 INNER JOIN NetflixPolyDB.film f ON f.numero = fv.num_film
	;

 
--tout film nomine
SELECT * FROM	(SELECT c.id_ceremonie, c.maitre, c.nom_edifice, c.ville, c.pays, c.date_ceremonie, nf.num_film as film_nomine, string_agg(nf.categorie, ', ') as categorie_nomine
	 FROM NetflixPolyDB.Ceremonie c INNER JOIN NetflixPolyDB.nominationfilms nf ON c.id_ceremonie = nf.id_ceremonie
	 INNER JOIN NetflixPolyDB.film f ON f.numero = nf.num_film
	GROUP BY c.id_ceremonie, nf.num_film) as tab_1
	NATURAL JOIN
	(SELECT c.id_ceremonie, c.maitre, c.nom_edifice, c.ville, c.pays, c.date_ceremonie, fv.num_film as film_gagne, string_agg(fv.categorie, ', ') as categorie_gagne
	 FROM NetflixPolyDB.Ceremonie c INNER JOIN NetflixPolyDB.filmsVainqueurs fv ON c.id_ceremonie = fv.id_ceremonie
	 INNER JOIN NetflixPolyDB.film f ON f.numero = fv.num_film) as tab_2
	 ;

/*SELECT f.numero, m.id_membre,  f.titre, MAX(l.date_visionnement)
	 FROM NetflixPolyDB.membre m INNER JOIN NetflixPolyDB.enligne l ON m.id_membre = l.id_membre
	 INNER JOIN NetflixPolyDB.film f ON f.numero = l.num_film
	 group by f.numero, m.id_membre;*/
	 
	/* SELECT m.id_membre, f.titre, l.date_visionnement
	 FROM NetflixPolyDB.membre m INNER JOIN NetflixPolyDB.enligne l ON m.id_membre = l.id_membre
	 INNER JOIN NetflixPolyDB.film f ON f.numero = l.num_film
	 ;*/
	 /*
SELECT * FROM 
	(SELECT f.numero, c.id_ceremonie, c.maitre, c.nom_edifice, c.ville, c.pays, c.date_ceremonie, nf.num_film as film_nomine, nf.categorie as categorie_nomine
	 FROM NetflixPolyDB.Ceremonie c INNER JOIN NetflixPolyDB.nominationfilms nf ON c.id_ceremonie = nf.id_ceremonie
	 INNER JOIN NetflixPolyDB.film f ON f.numero = nf.num_film) as tab_1
	 FULL JOIN
	 (SELECT f.numero, c.id_ceremonie, c.maitre, c.nom_edifice, c.ville, c.pays, c.date_ceremonie, fv.num_film as film_gagne, fv.categorie as categorie_gagne
	 FROM NetflixPolyDB.Ceremonie c INNER JOIN NetflixPolyDB.filmsVainqueurs fv ON c.id_ceremonie = fv.id_ceremonie
	 INNER JOIN NetflixPolyDB.film f ON f.numero = fv.num_film) as tab_2
	 ON tab_1.numero = tab_2.numero ;*/