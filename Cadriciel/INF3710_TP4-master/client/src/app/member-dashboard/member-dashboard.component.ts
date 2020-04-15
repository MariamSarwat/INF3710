import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
import { CommunicationService } from '../communication.service';
import { Movie } from '../../../../common/tables/Movie';
import { MatDialog } from '@angular/material/dialog';
import { Member } from '../../../../common/tables/Member';
import { MemberService } from './member.service';

@Component({
  selector: 'app-member-dashboard',
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.css']
})
export class MemberDashboardComponent implements OnInit {
  public movies: Movie[] = [];
  public selectedMovie: Movie;
  public loggedInMember: Member;

  constructor(private communicationService: CommunicationService, private movie: MatDialog, private memberService: MemberService/*private router: Router*/) {
    this.loggedInMember = this.memberService.memberInfo;
  }

  ngOnInit(): void {
    this.getMovies();
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
    this.movie.open(content, {disableClose: true});
  }
}
