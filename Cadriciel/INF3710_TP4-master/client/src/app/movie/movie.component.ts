import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { Movie } from "../../../../common/tables/Movie";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  public movies: Movie[] = [];
  public newMovie: boolean;
  public modifyingMovie: boolean;
  public newMovieValUser: FormGroup;
  public modifyMovieValUser: FormGroup;

  constructor(private communicationService: CommunicationService, private router: Router) { 
    this.newMovieValUser = new FormGroup({
      "titre": new FormControl( "", Validators.compose([Validators.required, Validators.maxLength(100)])),
      "genre": new FormControl( "", Validators.compose([Validators.required, Validators.maxLength(20)])),
      "duree_totale": new FormControl("", Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern("^[0-9]+$")])),
      "prix": new FormControl("", Validators.compose([Validators.required, Validators.pattern("^([0-9]{0,2}((.)[0-9]{0,2}))$")])),
      "date_production": new FormControl("", Validators.compose([Validators.required, Validators.pattern("^\\d{4}[/-](0?[1-9]|1[012])[/-](0?[1-9]|[12][0-9]|3[01])$")]))
    });
  }

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

    public insertMovie(): void {
      let highestID: number = 0;
      for (let movie of this.movies){
        if(movie.numero > highestID){
          highestID = movie.numero;
        }
      }
      console.log(highestID);
    
      const movie: Movie = {
        "numero": highestID + 1,
        "titre": this.newMovieValUser.value.titre,
        "date_production": this.newMovieValUser.value.date_production,
        "duree_totale": this.newMovieValUser.value.duree_totale,
        "genre": this.newMovieValUser.value.genre,
        "prix": this.newMovieValUser.value.prix	
      };
      this.communicationService.insertMovie(movie).subscribe(() => {
        this.getMovies();
        this.newMovie = false;
      });
      this.newMovieValUser.reset();
    }

  public goBack(): void {
    this.router.navigateByUrl('/admin-dashboard');
  }

  public selectedMovie: Movie;

  public modifyMovie(movieID: number): void{

    this.modifyingMovie = true;
    for (let movie of this.movies){
      if(movie.numero === movieID) this.selectedMovie = movie;
    }
    this.modifyMovieValUser = new FormGroup({
      "titre": new FormControl( this.selectedMovie.titre, Validators.compose([Validators.required, Validators.maxLength(100)])),
      "genre": new FormControl(this.selectedMovie.genre, Validators.compose([Validators.required, Validators.maxLength(20)])),
      "duree_totale": new FormControl(this.selectedMovie.duree_totale, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern("^[0-9]+$")])),
      "prix": new FormControl(this.selectedMovie.prix, Validators.compose([Validators.required, Validators.pattern("^([0-9]{0,2}((.)[0-9]{0,2}))$")])),
      "date_production": new FormControl(this.selectedMovie.date_production, Validators.compose([Validators.required, Validators.pattern("^\\d{4}[/-](0?[1-9]|1[012])[/-](0?[1-9]|[12][0-9]|3[01])$")]))
    });
    console.log(this.selectedMovie);
  }

  public modifyMovieSubmit(): void {
    console.log(this.modifyMovieValUser);
    this.modifyingMovie = false;
  }

  public cancel(): void {
    this.newMovie = false;
    this.modifyingMovie = false;
  }

}
