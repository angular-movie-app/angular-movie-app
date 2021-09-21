import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieItem } from '../movie';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  @Input() config: any;

  public imgUrl: string;

  constructor(private router: Router) {
    this.imgUrl = '';
  }

  ngOnInit(): void {
  //   if (this.id) {
  //     this.api.getImages(this.id).subscribe(
  //       (images: any) => {
  //         if (images.poster['posters'].length) {
  //           const path: string = images.posters[0].file_path;
  //           this.imgUrl = `${this.config['images'].secure_base_url}/${this.config['images'].poster_sizes[PosterSize.SML]}${path}`;
  //         }
  //         else {
  //           this.imgUrl = '';
  //         }
  //       },
  //       (error: any) => {
  //         this.imgUrl = '';
  //         console.log(error(error))
  //       }
  //     )
  //   }
  }

}
