import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MovieItem } from '../movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor(private user: UserService, private router: Router) { }

  favorites: MovieItem[]= []

  removeFromFavorites(id: number) {
    this.user.removeFromFavorites(id)
  }
  addToDetails(item: MovieItem): void {
    this.router.navigateByUrl('details-page');
    this.user.addToDetails(item)
    }
  ngOnInit(): void {
    this.user.favorites?.subscribe(movies => {
      this.favorites = movies;
    })
  }

}
