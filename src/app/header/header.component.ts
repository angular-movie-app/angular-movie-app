import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { 

  }
  movieLibrary(): void {
    this.router.navigateByUrl('/');
}
  favorites(): void {
    this.router.navigateByUrl('favorites');
}
  search(): void {
    this.router.navigateByUrl('search-movies');
}
  ngOnInit(): void {
  }

}
