import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PERSISTENCE, SETTINGS, LANGUAGE_CODE, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SearchMoviesComponent } from './search-movies/search-movies.component';
import { HeaderComponent } from './header/header.component';
import { environment } from '../environments/environment'
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { WantWatchComponent } from './want-watch/want-watch.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModuleModule } from './auth-module/auth-module.module';
import { AngularFireModule } from '@angular/fire/compat';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieCardComponent } from './movie-card/movie-card.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WatchlistComponent,
    FavoritesComponent,
    SearchMoviesComponent,
    HeaderComponent,
    WantWatchComponent,
    MovieDetailsComponent,
    MovieCardComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AuthModuleModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: PERSISTENCE,
      useValue: "session"
    },
    { 
      provide: SETTINGS,
      useValue: { appVerificationDisabledForTesting: true } 
    },
    { 
      provide: LANGUAGE_CODE, 
      useValue: 'en' 
    },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
