import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { GetAPIService } from './services/get-api.service';

@Component({
  selector: 'app-root',
  template: `
  <app-header></app-header>

  <div style="height:60px">
  </div>
  <div *ngIf="auth.user | async as user; else showLogin">
    <h1>Hello {{ user.displayName }}!</h1>
    <button (click)="logout()">Logout</button>
  </div>
  <ng-template #showLogin>
    <p>Please login.</p>
    <button (click)="loginWithGoogle()">Login with Google</button>
  </ng-template>
  <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = "angular-movie-app"
  constructor(
    public auth: AngularFireAuth,
  ) {}
  user: Observable<firebase.User | null> = this.auth.user
  loginWithGoogle() {
    this.handleErrorsOn(this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()))
  }
  logout() {
    this.handleErrorsOn(this.auth.signOut());
  }

  private handleErrorsOn(item: Promise<any>) {
    item
    .catch(error => {
      this.errorText = error
    })
  }
  errorText: string = ""
  // constructor(private apiService: GetAPIService) { }
  // title = 'angular-movie-app'; 
  // posts: any;
  // https://medium.com/swlh/how-to-get-an-api-with-angular-10-948f2d10dc5
  ngOnInit() {
}
}
