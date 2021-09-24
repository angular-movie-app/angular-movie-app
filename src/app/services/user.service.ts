import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators'
import { MovieItem } from '../movie';
import Rating from '../Rating'
import Comment from '../Comment'

enum DataExtension {
  Watched = "watched",
  WatchList = "watchlist",
  Favorites = "favorites",
  Details = "details"
}

const ratingsKey = "ratings"
const commentKey = "comments"

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

        // Unsubscribe from & clear previous observers
        this.watchlist = undefined
        this.watched = undefined
        this.favorites = undefined
        this.details = undefined

        if (user?.uid) {
          // Fetch user's remote data from firestore and update local observables
          const userDocumentReference = this.store.collection("users").doc(user.uid)
          // Assuming all of these collections conform to Array<MovieItem> interface
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
  details?: MovieItem

  // Create
  addToWatchlist(item: MovieItem) {
    this.addToList(item, DataExtension.WatchList)
  }
  addToWantToWatch(item: MovieItem) {
    this.addToList(item, DataExtension.Watched)
  }
  addToFavorites(item: MovieItem) {
    this.addToList(item, DataExtension.Favorites)
      .then(() => {
        this.rate(item.id, 9)
      })
  }
  addToDetails(item: MovieItem) {
    this.details = item  
  }
  
  // Delete
  removeFromWatchlist(item: number | MovieItem) {
    this.removeItemFromList(item, DataExtension.WatchList)
  }
  removeFromWantToWatch(item: number | MovieItem) {
    this.removeItemFromList(item, DataExtension.Watched)
  }
  removeFromFavorites(item: number | MovieItem) {
    this.removeItemFromList(item, DataExtension.Favorites)
  }
  removeFromDetails (item: number | MovieItem) {
    this.removeItemFromList(item, DataExtension.Details)
  }

  // TODO: - Implement update (not needed at this point)

  // Rate
  // Create
  rate(movieId: number, score: number) {
    console.log(`Attempting to add rating of score ${score} to movie with id ${movieId} from user with id ${this.user?.uid}`)
    return new Promise(
      (resolve, reject) => {
        // Validation
        if (score > 10 || score < 0.5) {
          reject("Score must be between 10 and 0.5.")
          return
        }
    
        if (!this.user?.uid) {
          reject("You must be logged in to leave a rating.")
          return
        }
    
        const rating: Rating = {
          movieId,
          value: score,
          userId: this.user.uid,
          added: new Date(),
          updated: new Date()
        }
    
        // Submit rating
        this.store.collection(ratingsKey)
          .add(rating)
          .then(resolve, reject)
      }
    )
  }

  // Read
  localRatings(id: number): Promise<Rating[]> {
    return new Promise<Rating[]>((resolve, reject) => {
      this.store.collection(ratingsKey)
      .ref
      .where("movieId", "==", id)
      .get()
      .then(
        snapshot => {
          Promise.all(snapshot.docs.map(item => item.data() as Rating))
            .then(resolve, reject)
        }, reject)
    })
  }

  // Comment
  comment(movieId: number, message: string) {
    console.log(`Attempting to add comment ${message} to movie with id ${movieId} from user with id ${this.user?.uid}`)
    return new Promise(
      (resolve, reject) => {
        // Validation
        if (!message) {
          reject("Your comment cannot be left empty.")
          return
        }
    
        if (!this.user?.uid) {
          reject("You must be logged in to leave a rating.")
          return
        }
    
        const comment: Comment = {
          message,
          movieId,
          userId: this.user.uid,
          added: new Date(),
          updated: new Date()
        }
    
        // Submit rating
        this.store.collection(commentKey)
          .add(comment)
          .then(resolve, reject)
      }
    )
  }

  localComments(id: number): Promise<Comment[]> {
    return new Promise<Comment[]>((resolve, reject) => {
      this.store.collection(commentKey)
      .ref
      .where("movieId", "==", id)
      .get()
      .then(
        snapshot => {
          Promise.all(snapshot.docs.map(item => item.data() as Comment))
            .then(resolve, reject)
        }, reject)
    })
  }

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
    console.log(`Attempting to add movie with id ${item.id} to list ${list} for user with id ${this.user?.uid}`)
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
            .doc(item.id.toString())
            .set(item)
            .then(resolve, reject)
        }
      )
    )
  }

  private removeItemFromList(item: number | MovieItem, list: DataExtension) {
    console.log(`Attempting to delete movie ${item} from list ${list} for user with id ${this.user?.uid}`)
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
            .ref
            .where("id", "==", itemId)
            .get()
            .then(
              snapshot => {
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

  private setErrorText(text: string) {
    console.log("There was an error: " + text)
    this.errorText = text
  }

  private setError(error: Error) {
    this.setErrorText(error.message)
  }

  private handleErrorsOn(item: Promise<any>): Promise<any> {
    return item
    .catch(this.setErrorText)
  }
  private errorText: string = ""
}