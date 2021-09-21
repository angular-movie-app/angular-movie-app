import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators'
import { MovieItem } from '../movie';

enum DataExtension {
  Watched = "watched",
  WatchList = "watchlist",
  Favorites = "favorites"
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private auth: AngularFireAuth,
    private store: AngularFirestore
  ) {
    this.auth.authState.subscribe(
      user => {
        console.log("User is being updated!")

        this.user = user

        // Clear previous observers
        this.watchlist = undefined
        this.watched = undefined
        this.favorites = undefined

        if (user?.uid) {
          // Fetch user's remote data from firestore and update local observables
          const userDocumentReference = this.store.collection("users").doc(user.uid)
          // Assuming all of these collections conform to MovieItem interface
          this.watchlist = (
            userDocumentReference.collection(
              DataExtension.WatchList,
              ref => ref.orderBy("title")
            ).valueChanges() as Observable<MovieItem[]>
          ).pipe(tap(console.log))
          this.watched = (
            userDocumentReference.collection(
              DataExtension.Watched,
              ref => ref.orderBy("title")
            ).valueChanges() as Observable<MovieItem[]>
          ).pipe(tap(console.log))
          this.favorites = (
            userDocumentReference.collection(
              DataExtension.Favorites,
              ref => ref.orderBy("title")
            ).valueChanges() as Observable<MovieItem[]>
          ).pipe(tap(console.log))
        }
      }
    )
  }
  // Read
  user?: firebase.User | null
  watchlist?: Observable<Array<MovieItem>>
  watched?: Observable<Array<MovieItem>>
  favorites?: Observable<Array<MovieItem>>

  // Create
  addToWatchlist(item: MovieItem) {
    this.addToList(item, DataExtension.WatchList)
  }
  addToWatched(item: MovieItem) {
    this.addToList(item, DataExtension.Watched)
  }
  addToFavorites(item: MovieItem) {
    this.addToList(item, DataExtension.Favorites)
  }
  
  // Delete
  removeFromWatchlist(item: number | MovieItem) {
    this.removeItemFromList(item, DataExtension.WatchList)
  }
  removeFromWatched(item: number | MovieItem) {
    this.removeItemFromList(item, DataExtension.Watched)
  }
  removeFromFavorites(item: number | MovieItem) {
    this.removeItemFromList(item, DataExtension.Favorites)
  }

  // TODO: - Implement update (not needed at this point)

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

  private addToList(item: MovieItem, list: DataExtension) {
    console.log(`Attempting to add movie with id ${item.id} to list ${list}`)
    return this.handleErrorsOn(
      new Promise(
        (resolve, reject) => {
          const currentUserId = this.user?.uid
          if (!currentUserId) {
            reject("User is not signed in!")
            return
          }
          // TODO: - Add duplication protection
          this.store
            .collection("users")
            .doc(currentUserId)
            .collection(list)
            .add(item)
            .then(resolve, reject)
        }
      )
    )
  }

  private removeItemFromList(item: number | MovieItem, list: DataExtension) {
    console.log(`Attempting to delete movie ${item} from list ${list}`)
    return this.handleErrorsOn(
      new Promise(
        (resolve, reject) => {
          const currentUserId = this.user?.uid
          if (!currentUserId) {
            reject("User is not signed in!")
            return
          }

          let itemId: number
          if (typeof(item) == "number") {
            itemId = item
          } else {
            itemId = item.id
          }

          console.log("fetching movies with id " + itemId)
          this.store
            .collection("users")
            .doc(currentUserId)
            .collection(list)
            .ref.where("id", "==", itemId)
            .get()
            .then(
              snapshot => {
                console.log(snapshot.docs)
                Promise.all(
                  snapshot.docs.map(item => item.ref.delete())
                )
                .then(resolve)
                .catch(reject)
              }
            )
            .catch(reject)
        }
      )
    )
  }

  private handleErrorsOn(item: Promise<any>): Promise<any> {
    return item
    .catch(
      error => {
        console.log("There was an error: " + error)
        this.errorText = error
      }
    )
  }
  private errorText: string = ""
}