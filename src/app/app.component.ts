import { Component, OnInit } from '@angular/core';
import { GetAPIService } from './services/get-api.service';

@Component({
  selector: 'app-root',
  template: `
  <app-header></app-header>

  <div style="height:60px">
  </div>
  <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  constructor(private apiService: GetAPIService) { }
  title = 'angular-movie-app'; 
  posts: any;
  // https://medium.com/swlh/how-to-get-an-api-with-angular-10-948f2d10dc5
  ngOnInit() {
}
}
