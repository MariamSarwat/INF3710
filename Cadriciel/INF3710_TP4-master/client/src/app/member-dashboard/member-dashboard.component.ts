import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
import { CommunicationService } from '../communication.service';
import { Movie } from '../../../../common/tables/Movie';
import { MatDialog } from '@angular/material/dialog';
import { Member } from '../../../../common/tables/Member';
import { MovieNom } from '../../../../common/tables/MovieNom';
import { MovieWin } from '../../../../common/tables/MovieWin';
import { MemberService } from './member.service';
import { MovieEmp } from '../../../../common/tables/MovieEmp';
import { Online } from '../../../../common/tables/Online';

@Component({
  selector: 'app-member-dashboard',
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.css']
})

export class MemberDashboardComponent implements OnInit {
  public movies: Movie[] = [];
  public selectedMovie: Movie;
  public loggedInMember: Member;

  public allMovieNoms: MovieNom[] = [];
  public allMovieWins: MovieWin[] = [];
  public allMovieEmps: MovieEmp[] = [];

  public movieNoms: MovieNom[] = [];
  public movieWins: MovieWin[] = [];
  public movieEmps: MovieEmp[] = [];

  public onlineViewings: Online[] = [];
  public playBackTime: number;
  public playing: boolean;
message:string;
  constructor(private communicationService: CommunicationService, private dialog: MatDialog, private memberService: MemberService/*private router: Router*/) {
    this.loggedInMember = this.memberService.memberInfo;
  }

  ngOnInit(): void {
    this.memberService.currentMessage.subscribe(message => this.message = message)
    this.getMovies();
    this.getAllMovieInformation();
    this.getOnlineViewings();
  }

  public getMovies(): void {
    this.communicationService.getMoviesSorted().subscribe((movies: Movie[]) => {
        this.movies = movies;
        for (let movie of this.movies)
          movie.date_production = movie.date_production.split('T')[0]; // to convert to Date
    });
  }

  public getOnlineViewings(): void {
    this.communicationService.getOnlineViewings().subscribe((onlineViewings: Online[])=> {
      this.onlineViewings = onlineViewings; 
      for (let online of this.onlineViewings)
        online.date_visio_recente = online.date_visio_recente.split('T')[0];
    });
  }

  public getAllMovieInformation(): void {
    this.communicationService.getMovieNom().subscribe((nominations: MovieNom[]) => {
        this.allMovieNoms = nominations; 
        for (let nom of this.allMovieNoms)
          nom.date_ceremonie = nom.date_ceremonie.split('T')[0];
    });
    this.communicationService.getMovieWin().subscribe((winnings: MovieWin[]) => {
      this.allMovieWins = winnings; 
      for (let win of this.allMovieWins)
        win.date_ceremonie = win.date_ceremonie.split('T')[0];
    });
    this.communicationService.getMovieEmps().subscribe((movieEmps: MovieEmp[]) => {
      this.allMovieEmps = movieEmps; 
      for (let emp of this.allMovieEmps)
        emp.date_naissance = emp.date_naissance.split('T')[0];
    });
  }
  alreadyWatched:boolean;

  public openDialog(content: any, movie: Movie): void {
    this.selectedMovie = movie;
    this.playing = false;
    console.log(this.selectedMovie.numero);
    this.filterMovieInfo(movie);
    console.log(this.alreadyWatched  + " already watched " + 'member id ' + this.loggedInMember.id_membre)
    this.dialog.open(content, {disableClose: true});
  }

  public filterMovieInfo(movie: Movie): void{
    this.movieEmps = [];
    this.movieNoms = [];
    this.movieWins = [];
    this.playBackTime = 0;
    this.alreadyWatched = false;
    for(let nom of this.allMovieNoms){
      if(nom.film_nomine === movie.numero) this.movieNoms.push(nom);
    }
    for(let win of this.allMovieWins){
      if(win.film_gagne === movie.numero) this.movieWins.push(win);
    }
    for(let emp of this.allMovieEmps){
      if(emp.num_film === movie.numero) this.movieEmps.push(emp);
    }
    for(let online of this.onlineViewings){
      if(online.numero === movie.numero && online.id_membre === this.loggedInMember.id_membre){
        this.alreadyWatched = true;
        this.playBackTime = online.duree_visionnement;
      }
    }
  }

  public setToContinueWatching(): void {
    this.playing = true;
    this.memberService.playbackTime = this.playBackTime;
    //console.log('time is  ' + this.memberService.playbackTime);
  }

  public setToStartFromBeginning(): void {
    this.playing = true;
    this.memberService.playbackTime = 0;
    //console.log('time is  ' + this.memberService.playbackTime);
  }

  public close(): void {
    this.memberService.changeMessage("closing");
    console.log('in here')
  }
}
