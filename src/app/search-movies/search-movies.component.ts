import { Component, OnInit } from '@angular/core';
import { MovieItem } from '../movie';
import { UserService } from '../services/user.service';
import { GetAPIService } from '../services/get-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.scss']
})
export class SearchMoviesComponent implements OnInit {
  searchMovies: MovieItem[] = [];
  topRated: MovieItem[] = [];
  constructor(private getApiService: GetAPIService, private router: Router, public user: UserService) { }

  addToWatchlist(item: MovieItem) {
  this.user.addToWatchlist(item)
  }
  addToFavorites(item: MovieItem) {
    this.user.addToFavorites(item)
  }
  addToWantToWatch(item: MovieItem) {
    this.user.addToWantToWatch(item)
  }
  // addToWatched(item: MovieItem) {
  //   return this.addToList(item, DataExtension.Watched)
  // }
  // addToFavorites(item: MovieItem) {
  //   return this.addToList(item, DataExtension.Favorites)
  // }

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
