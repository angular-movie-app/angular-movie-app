import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MovieItem } from '../movie';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor(private user: UserService) { }

  favorites: MovieItem[]= []

  removeFromFavorites(id: number) {
    this.user.removeFromFavorites(id)
  }
  ngOnInit(): void {
    this.user.favorites?.subscribe(movies => {
      this.favorites = movies;
    })
  }

}
