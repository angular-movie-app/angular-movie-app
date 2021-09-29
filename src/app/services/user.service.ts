import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators'
import { MovieItem } from '../movie';
import Rating from '../Rating'
import Comment, { CommentBuffer } from '../Comment'
import Timestamp from '../Timestamp';

enum DataExtension {
  Watched = "want-watch",
  WatchList = "watchlist",
  Favorites = "favorites",
  Details = "details"
}

const ratingsKey = "ratings"
const commentKey = "comments"
const detailKey = "detail_item"
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
  
  private commentObserverMap = new Map<number, Observable<Comment[]>>()

  // Read
  user?: firebase.User | null
  watchlist?: Observable<Array<MovieItem>>
  watched?: Observable<Array<MovieItem>>
  favorites?: Observable<Array<MovieItem>>
  private detailMovie?: MovieItem
  get details(): MovieItem | undefined {
    if (this.detailMovie) {
      return this.detailMovie
    }
    const storedItemString = localStorage.getItem(detailKey)

    if (storedItemString) {
      const storedItem = JSON.parse(storedItemString)

      if (storedItem) {
        return storedItem as MovieItem
      }
    }

    return undefined
  }
  set details(item: MovieItem | undefined) {
    this.detailMovie = item
    localStorage.setItem(detailKey, JSON.stringify(item))
  }

  // Create
  addToWatchlist(item: MovieItem) {
    this.addToList(item, DataExtension.Watched)
  }
  addToWantToWatch(item: MovieItem) {
    this.addToList(item, DataExtension.WatchList)
  }
  addToFavorites(item: MovieItem) {
    this.addToList(item, DataExtension.Favorites)
  }
  addToDetails(item: MovieItem) {
    this.details = item
  }
  
  // Delete
  removeFromWatchlist(item: number | MovieItem) {
    this.removeItemFromList(item, DataExtension.Watched)
  }
  removeFromWantToWatch(item: number | MovieItem) {
    this.removeItemFromList(item, DataExtension.WatchList)
  }
  removeFromFavorites(item: number | MovieItem) {
    this.removeItemFromList(item, DataExtension.Favorites)
  }
  removeFromDetails (item: number | MovieItem) {
    this.removeItemFromList(item, DataExtension.Details)
  }

  // Get user's rating for movie function
  userRating(movieId: number): Rating | undefined {
    if (!this.user) return

    const storedStringValue = localStorage.getItem(movieId.toString() + this.user.uid + ratingsKey)

    console.log(storedStringValue)

    if (storedStringValue) {
      const rating: Rating = JSON.parse(storedStringValue)

      console.log(rating)

      return rating
    }

    return undefined
  }

  rate(movieId: number, value: number) {
    if (!this.user) return
    const now = new Date()
    const rating: Rating = {
      value,
      movieId,
      userId: this.user.uid,
      added: now,
      updated: now
    }
    localStorage.setItem(movieId.toString() + this.user.uid + ratingsKey, JSON.stringify(rating))
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

        console.log("Creating timestamp...")
        const now = new Date()
        console.log("" + now)
        const comment: Comment = {
          message,
          movieId,
          userId: this.user.uid,
          added: now,
          updated: now
        }
    
        // Submit rating
        this.store.collection(commentKey)
          .add(comment)
          .then(resolve, reject)
      }
    )
  }

  localComments(id: number): Observable<Comment[]> {
    const observable = this.commentObserverMap.get(id) ?? new Observable<Comment[]>(
      subscription => {
        console.log("gettings comments for " + id)
        const bufferToComment = (buffer: CommentBuffer) => {
          const comment: Comment = {
            ...buffer,
            added: buffer.added.toDate(),
            updated: buffer.updated.toDate()
          }

          return comment
        }

        const unsub = this.store.firestore
            .collection(commentKey)
            .where("movieId", "==", id)
            .onSnapshot(
              snapshot => {
                console.log("Got comments for " + id)
                console.log(snapshot.docs.map(item => item.data()))
                subscription.next(
                  snapshot.docs.map(
                    item => {
                      return bufferToComment({ ...item.data() } as CommentBuffer)
                    }
                  )
                )
              }
            )
        
            return unsub
      }
    )

    this.commentObserverMap.set(id, observable)
    
    return observable
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