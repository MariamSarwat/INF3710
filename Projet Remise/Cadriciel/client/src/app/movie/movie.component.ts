import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { Movie } from "../../../../common/Movie";
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
  public selectedMovie: Movie;

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
  }

  public getHighestID(): number {
    let highestID: number = 0;
    for (let movie of this.movies){
      if(movie.numero > highestID){
        highestID = movie.numero;
      }
    }    
    return highestID;
  }

  public insertMovie(): void {
    const movie: Movie = {
      "numero": this.getHighestID() + 1,
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
  }

  public modifyMovieSubmit(): void {
    const movie: Movie = {
      "numero": this.selectedMovie.numero,
      "titre": this.modifyMovieValUser.value.titre,
      "date_production": this.modifyMovieValUser.value.date_production,
      "duree_totale": this.modifyMovieValUser.value.duree_totale,
      "genre": this.modifyMovieValUser.value.genre,
      "prix": this.modifyMovieValUser.value.prix	
    };
    this.communicationService.modifyMovie(movie).subscribe(() => {
      this.getMovies();
      this.modifyingMovie = false;
    });
  }

  public cancel(): void {
    this.newMovie = false;
    this.modifyingMovie = false;
  }
}
