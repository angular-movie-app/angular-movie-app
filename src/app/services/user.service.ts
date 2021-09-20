import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
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

          this.watchlist?.subscribe(console.log)
          this.watched?.subscribe(console.log)
          this.favorites?.subscribe(console.log)
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
  addToWachlist(item: MovieItem) {
    return this.addToList(item, DataExtension.WatchList)
  }
  addToWatched(item: MovieItem) {
    return this.addToList(item, DataExtension.Watched)
  }
  addToFavorites(item: MovieItem) {
    return this.addToList(item, DataExtension.Favorites)
  }
  
  // Delete
  removeFromWatchlist(item: string | MovieItem) {
    return this.removeItemFromList(item, DataExtension.WatchList)
  }
  removeFromWatched(item: string | MovieItem) {
    return this.removeItemFromList(item, DataExtension.Watched)
  }
  removeFromFavorites(item: string | MovieItem): Promise<any> {
    return this.removeItemFromList(item, DataExtension.Favorites)
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
      new Promise<any>(
        (resolve, reject) => {
          const currentUserId = this.user?.uid
          if (!currentUserId) {
            reject("User is not signed in!")
            return
          }

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

  private removeItemFromList(item: string | MovieItem, list: DataExtension): Promise<any> {
    console.log(`Attempting to delete movie ${item} from list ${list}`)
    return this.handleErrorsOn(
      new Promise<any>(
        (resolve, reject) => {
          const currentUserId = this.user?.uid
          if (!currentUserId) {
            reject("User is not signed in!")
            return
          }

          let itemId: string
          if (typeof(item) == "string") {
            itemId = item
          } else {
            itemId = item.id.toString()
          }

          this.store
            .collection("users")
            .doc(currentUserId)
            .collection(list)
            .doc(itemId)
            .delete()
            .then(resolve, reject)
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
