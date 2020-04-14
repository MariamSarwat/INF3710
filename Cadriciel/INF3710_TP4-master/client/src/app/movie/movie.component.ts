import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { Movie } from "../../../../common/tables/Movie";
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  public movies: Movie[] = [];

  constructor(private communicationService: CommunicationService, private router: Router) { }

  ngOnInit(): void {
    this.getMovies();
  }

  public getMovies(): void {
    this.communicationService.getMovies().subscribe((movies: Movie[]) => {
        this.movies = movies;
        for (let movie of this.movies)
          movie.date_production = movie.date_production.split('T')[0]; // to convert to Date
    });
  }

  public deleteMovie(movieID: number): void{
    this.communicationService.deleteMovie(movieID).subscribe(() => {
      this.getMovies();
    });
    console.log(movieID);
  }

  public goBack(): void {
    this.router.navigateByUrl('/admin-dashboard');
  }
  
  public modifyMovie(movieID: number): void{
    
    console.log(movieID);
  }
}
