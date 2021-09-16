import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private store: AngularFirestore
  ) {
    this.auth.authState.subscribe(
      user => {
        this.user = user
      }
    )
  }
  user?: firebase.User | null
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
