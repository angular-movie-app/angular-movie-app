import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { dispatch } from 'rxjs/internal/observable/pairs';

enum DataExtension {
  Watched = "watched",
  WatchList = "watchlist",
  Favorites = "favorites"
}

interface MovieItem {
  title: string
  tagline: string
  id: number
  voteAverage: number
  voteCount: number
  runtime?: number
  posterPath?: string
}

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

        // Clear previous observers
        this.watchlist = undefined
        this.watched = undefined
        this.favorites = undefined

        if (user?.uid) {
          // Fetch user's remote data from firestore and update local observables
          const userDocumentReference = store.collection("users").doc(user.uid)
          // Assuming all of these collections conform to MovieItem interface
          this.watchlist = userDocumentReference.collection(
            DataExtension.WatchList,
            ref => ref.orderBy("title")
          ).valueChanges() as Observable<MovieItem[]>
          this.watched = userDocumentReference.collection(
            DataExtension.Watched,
            ref => ref.orderBy("title")
          ).valueChanges() as Observable<MovieItem[]>
          this.favorites = userDocumentReference.collection(
            DataExtension.Favorites,
            ref => ref.orderBy("title")
          ).valueChanges() as Observable<MovieItem[]>
        }
      }
    )
  }
  user?: firebase.User | null
  watchlist?: Observable<Array<MovieItem>>
  watched?: Observable<Array<MovieItem>>
  favorites?: Observable<Array<MovieItem>>

  loginWithGoogle() {
    this.handleErrorsOn(this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()))
  }

  logout() {
    this.handleErrorsOn(this.auth.signOut());
  }
  // Dont allow setting error text
  get errorMessage(): string {
    return this.errorText
  }

  private handleErrorsOn(item: Promise<any>) {
    item
    .catch(error => {
      this.errorText = error
    })
  }
  private errorText: string = ""
}
