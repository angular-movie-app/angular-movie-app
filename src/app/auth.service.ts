import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
  private errorText: string = ""
  // Dont allow setting error text
  get errorMessage(): string {
    return this.errorText
  }
}
