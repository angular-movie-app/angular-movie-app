import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PERSISTENCE, SETTINGS, LANGUAGE_CODE, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SearchMoviesComponent } from './search-movies/search-movies.component';
import { HeaderComponent } from './header/header.component';
import { environment } from '../environments/environment'
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WatchlistComponent,
    FavoritesComponent,
    SearchMoviesComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
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
