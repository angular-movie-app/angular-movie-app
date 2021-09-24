import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MovieItem } from '../movie';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-want-watch',
  templateUrl: './want-watch.component.html',
  styleUrls: ['./want-watch.component.scss']
})
export class WantToWatchComponent implements OnInit {
  constructor(private user: UserService, private router: Router) { }

  get wantToWatch(): Observable<MovieItem[]> | null | undefined {
    return this.user.watchlist
  }

  watchlist(): void {
    this.router.navigateByUrl('watchlist');
}
addToWatchlist(item: MovieItem) {
  this.user.addToWatchlist(item)
  }
removeFromWantToWatch(id: number) {
  this.user.removeFromWantToWatch(id)
}
addToDetails(item: MovieItem): void {
  this.router.navigateByUrl('details-page');
  this.user.addToDetails(item)
  }
  ngOnInit(): void {
  }

}
