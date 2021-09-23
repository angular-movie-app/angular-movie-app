import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MovieItem } from '../movie';
import { Observable } from "rxjs"

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor(private user: UserService) { }

  get favorites(): Observable<MovieItem[]> | null | undefined {
    return this.user.favorites
  }

  removeFromFavorites(id: number) {
    this.user.removeFromFavorites(id)
    this.user.localRatings(id).then(ratings => {
      console.log(ratings)
    })
  }
  ngOnInit(): void {
  }
}
