import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';
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
  title = "angular-movie-app"
  constructor() {}
}
