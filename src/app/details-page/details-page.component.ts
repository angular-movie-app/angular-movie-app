import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MovieItem } from '../movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {
  constructor(private user: UserService, private router: Router) { }

  get detailsPage(): MovieItem | undefined {
    return this.user.details
  }

  details(): void {
    this.router.navigateByUrl('details-page');
}
addToFavorites(item: MovieItem) {
  this.user.addToFavorites(item)
}
addToWatchlist(item: MovieItem) {
  this.user.addToWatchlist(item)
  }
  ngOnInit(): void {

  }

}
