import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'
import { tap } from "rxjs/operators"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService
  ) {
  }
  displayName(): string | void {
    if (this.auth.user?.displayName) {
      return this.auth.user?.displayName
    }
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
  login(): void {
    this.router.navigateByUrl('login');
}
  logout(): void {
    this.auth.logout()
    this.login()
}
  ngOnInit(): void {
  }

}
