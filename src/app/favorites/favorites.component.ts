import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MovieItem } from '../movie';
import { Observable } from "rxjs"
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor(private user: UserService, private router: Router) { }

  get favorites(): Observable<MovieItem[]> | null | undefined {
    return this.user.favorites
  }

  removeFromFavorites(id: number) {
    this.user.removeFromFavorites(id)
  }
  addToDetails(item: MovieItem): void {
    this.router.navigateByUrl('details-page');
    this.user.addToDetails(item)
    }
  ngOnInit(): void {
  }
}
