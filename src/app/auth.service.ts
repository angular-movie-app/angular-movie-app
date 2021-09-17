// import { Injectable } from '@angular/core';
// import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
// import { Firestore } from '@angular/fire/firestore';
// import { map } from "rxjs/operators"
// import firebase from 'firebase/compat/app';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   constructor(
//     public auth: AngularFireAuth,
//   ) {
//     this.auth.user.pipe(
//       map(newUser => this.user = newUser)
//     )
//   }
//   user: firebase.User | null = null
//   login(service: number) {
//     this.auth.signInWithPopup(signInProvider(service))
//   }
//   logout() {
//     this.auth.signOut();
//   }
//   // user() {
//   //   console.log(this.auth.user)
//   //   return this.auth.user
//   // }
// }
