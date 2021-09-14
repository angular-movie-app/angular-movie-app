import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-want-watch',
  templateUrl: './want-watch.component.html',
  styleUrls: ['./want-watch.component.scss']
})
export class WantWatchComponent implements OnInit {

  constructor(private router: Router) { 

  }
  movieLibrary(): void {
    this.router.navigateByUrl('watchlist');
}
  ngOnInit(): void {
  }

}
