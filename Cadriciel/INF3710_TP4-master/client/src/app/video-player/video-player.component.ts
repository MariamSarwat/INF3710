import { Component, OnInit, ElementRef, ViewChild, /*HostListener*/ } from '@angular/core';
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

  public mediaID: string = "1630723954"; // 1725224003806, 1630723954, 2667647842, 1402726504 
  @ViewChild('videoPlayer') videoPlayer: ElementRef;

  constructor(private videoPlayerService: VideoPlayerService, private member: MemberService) { }

  ngOnInit() {
    this.getVideo(this.mediaID);
    this.member.currentMessage.subscribe(message => {
      if(this.hasBeenPlayed){
		this.member.playbackTime = this.videoPlayer.nativeElement.currentTime;
        console.log('hello time is ' + this.videoPlayer.nativeElement.currentTime + ' and time in member is ' +this.member.playbackTime);
        this.hasBeenPlayed = false;
      }
    });
  }

  getVideo(mediaID: string) {
    this.videoPlayerService.getVideo(mediaID).subscribe((video: any) => {
      this.key = video.items[0].assetDescriptors[1].key; // set key
      this.videoPlayer.nativeElement.currentTime = this.member.playbackTime;
      
      setTimeout(() =>   this.videoPlayer.nativeElement.play(), 1000); // play
      this.hasBeenPlayed = true;
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