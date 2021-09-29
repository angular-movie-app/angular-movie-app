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
import { WantToWatchComponent } from './want-watch/want-watch.component';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieOverviewComponent } from './movie-overview/movie-overview.component';
import { MatIconModule } from '@angular/material/icon';
import { DetailsPageComponent } from './details-page/details-page.component';
import SortCommentsPipe from "./SortCommentsPipe";
import { StarRatingComponent } from './star-rating/star-rating.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WatchlistComponent,
    FavoritesComponent,
    SearchMoviesComponent,
    HeaderComponent,
    WantToWatchComponent,
    MovieCardComponent,
    MovieOverviewComponent,
    DetailsPageComponent,
    SortCommentsPipe,
    StarRatingComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatIconModule
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
    UserService,
    SortCommentsPipe
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
