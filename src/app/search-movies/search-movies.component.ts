import { Component, OnInit } from '@angular/core';
import { MovieItem } from '../movie';
import { AuthService } from '../services/auth.service';
import { GetAPIService } from '../services/get-api.service';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.scss']
})
export class SearchMoviesComponent implements OnInit {
  searchMovies: MovieItem[] = [];
  topRated: MovieItem[] = [];
  constructor(private getApiService: GetAPIService, private auth: AuthService) { }

  search(term: string) {
    console.log("Search requested with term " + term);
    this.getApiService
      .search(term)
      .subscribe(items => this.searchMovies = items);
  }
  
  ngOnInit(): void {
    console.log("Fetching top rated movies");
    this.getApiService
      .fetchTopRated()
      .subscribe(data => {
        console.log(data);
        this.topRated = data;
      }
    )
  }
}
