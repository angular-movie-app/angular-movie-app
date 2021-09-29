import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {
  @Input() selectedRating!: number;
  @Output() ratingChanged = new EventEmitter<number>();

  stars = [
    {
      id: 1,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 2,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 3,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 4,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 5,
      icon: 'star',
      class: 'star-gray star-hover star'
    }

  ];
  
  constructor() { }
  
  selectStar(value: number) {
    console.log("Setting selected rating to " + value)
    this.stars.filter(
      star => {
        star.class = star.id <= value ? 'star-gold star' : 'star-gray star';

        return star;
      }
    )

    this.selectedRating = value;
    this.ratingChanged.emit(value);
  }

  ngOnInit(): void {
    this.selectStar(this.selectedRating)
  }
}
