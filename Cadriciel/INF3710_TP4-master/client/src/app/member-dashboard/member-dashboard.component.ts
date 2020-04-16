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
  public playing: boolean;

  constructor(private communicationService: CommunicationService, private movie: MatDialog, private memberService: MemberService/*private router: Router*/) {
    this.loggedInMember = this.memberService.memberInfo;
  }

  ngOnInit(): void {
    this.getMovies();
    this.getAllMovieInformation();
  }

  public getMovies(): void {
    this.communicationService.getMoviesSorted().subscribe((movies: Movie[]) => {
        this.movies = movies;
        for (let movie of this.movies)
          movie.date_production = movie.date_production.split('T')[0]; // to convert to Date
    });
  }

  public openDialog(content: any, movie: Movie): void {
    this.selectedMovie = movie;
    console.log(this.selectedMovie.numero);
    this.filterMovieInfo(movie);
    this.movie.open(content, {disableClose: true});
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

  public filterMovieInfo(movie: Movie): void{
    this.movieEmps = [];
    this.movieNoms = [];
    this.movieWins = [];
    for(let nom of this.allMovieNoms){
      if(nom.film_nomine === movie.numero){
        this.movieNoms.push(nom);
      }
    }
    for(let win of this.allMovieWins){
      if(win.film_gagne === movie.numero)
        this.movieWins.push(win);
    }
    for(let emp of this.allMovieEmps){
      if(emp.num_film === movie.numero)
        this.movieEmps.push(emp);
    }
    console.log(this.movieNoms);
    console.log(this.movieEmps);
    console.log(this.movieWins);
  }

  
}
