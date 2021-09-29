import { Component, Input, Output, EventEmitter, OnInit, PipeTransform } from '@angular/core';
import { UserService } from '../services/user.service';
import { GetAPIService } from '../services/get-api.service'
import { MovieItem } from '../movie';
import { Router } from '@angular/router';
import Rating from "../Rating"
import Comment from "../Comment"
import Timestamp from '../Timestamp';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {
  constructor(
    private user: UserService, 
    private router: Router,
    private api: GetAPIService
  ) { }

  get detailsPage(): MovieItem | undefined {
    return this.user.details
  }
  workingComment: string = "";

  get genres(): string[] {
    if (!this.movie) return []

    if (this.movie.genres) return this.movie.genres.map(genre => genre.name)

    return this.api.genres(this.movie.genre_ids)
  }

  get movie(): MovieItem | undefined {
    return this.user.details
  }

  get comments(): Observable<Comment[]> {
    return this.user.localComments(this.movie?.id ?? 0)
  }

  get rating(): Rating | undefined {
    if (!this.movie) return

    return this.user.userRating(this.movie.id)
  }

  get ratingValue(): number {
    const rating = this.rating

    return rating?.value ?? 0
  }

  rate(value: number) {
    if (!this.movie) return

    // Value can be 1-5
    this.user.rate(this.movie.id, value)
  }
  
  updateText(event: Event) {
    console.log(event)
    console.log(this.workingComment)
  }

  formatDate(date: Date): string {
    const [day, month, year] = [date.getDate(), date.getMonth(), date.getFullYear()];
    const [hour, minute] = [date.getHours(), date.getMinutes()];

    const padZero = (value: number) => {
      return (
        value < 10 && value > 0
        ? "0" + value
        : value
      )
    }

    const time = (hour: number, minute: number) => {
      let h: number = hour
      let isAM = true

      if (hour == 0) {
        h = 12
      } else if (hour > 12) {
        h = hour - 12
        isAM = false
      } else if (hour == 12) {
        isAM = false
      }

      return `${h}:${padZero(minute)} ${isAM ? "AM" : "PM"}`
    }

    return `${padZero(month + 1)}/${padZero(day)}/${year} ${time(hour, minute)}`
  }

  comment(): void {
    if (!this.movie) return
    console.log(`Leaving comment '${this.workingComment}' on movie ${this.movie.title}`)
    this.user.comment(this.movie?.id, this.workingComment)
      .then(console.log)
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
    this.comments.subscribe(console.log)
  }
}
