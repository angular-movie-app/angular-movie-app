// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiKey: "3b05444824eda7017c57640089b4e650",
  baseApiUrl: "https://api.themoviedb.org/3/",
  searchEndpoint: "search/movie?api_key=",
  topRatedEnpoint: "movie/top_rated",
  firebase: {
    apiKey: "AIzaSyAsr52o-xTLC9OGngolD8N1VWIwqP3Hp7E",
    authDomain: "angular-movie-app-38950.firebaseapp.com",
    projectId: "angular-movie-app-38950",
    storageBucket: "angular-movie-app-38950.appspot.com",
    messagingSenderId: "945935627379",
    appId: "1:945935627379:web:f2f3aabde0a0fda56be606",
    measurementId: "G-4NXMQ8N34Y"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
