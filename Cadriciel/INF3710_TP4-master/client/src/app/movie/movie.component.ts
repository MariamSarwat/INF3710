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
  public newMovie: boolean;
  public duplicateError: boolean = false; // Un membre doit être unique, on ne veut pas que sont ID soit dupliqué

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

    // Comment on distingue les champs qui peuvent être null? Et ceux qui sont obligatoires
    public insertMovie(titre: string, date_production: string, duree_totale: string, genre: string, prix: number): void {
        const movie: Movie = {
          "numero": this.movies.length + 1,
          "titre": titre,
          "date_production": date_production,
          "duree_totale": duree_totale,
          "genre": genre,
          "prix": prix	
        };
        this.communicationService.insertMovie(movie).subscribe((res: number) => {
        if (res > 0) this.communicationService.filter("update"); // see what "filter" does
        this.duplicateError = (res === -1);
        this.getMovies();
        this.newMovie = false;
        });
    }

  public goBack(): void {
    this.router.navigateByUrl('/admin-dashboard');
  }

  public modifyMovie(movieID: number): void{
    console.log(movieID);
  }

  public cancel(): void {
    this.newMovie = false;
  }
}
