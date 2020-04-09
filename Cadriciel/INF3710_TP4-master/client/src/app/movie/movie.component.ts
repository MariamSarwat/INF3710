import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { Movie } from "../../../../common/tables/Movie";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  public movies: Movie[] = [];

  constructor(private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  public getMovies(): void {
    this.communicationService.getMovies().subscribe((movies: Movie[]) => {
        this.movies = movies;
    });
  }
}
