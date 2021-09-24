import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MovieItem } from '../movie';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  constructor(private user: UserService, private router: Router) { }

  get watchlist(): Observable<MovieItem[]> | null | undefined {
    return this.user.watchlist
  }

  wantWatch(): void {
    this.router.navigateByUrl('want-watch');
}
removeFromWatchlist(id: number) {
  this.user.removeFromWatchlist(id)
}
addToFavorites(item: MovieItem) {
  this.user.addToFavorites(item)
}
addToDetails(item: MovieItem) {
  this.router.navigateByUrl('details-page');
  this.user.addToDetails(item)
  }

  ngOnInit(): void {
  }
}
