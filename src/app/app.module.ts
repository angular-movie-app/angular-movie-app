import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PERSISTENCE, SETTINGS, LANGUAGE_CODE, AngularFireAuthModule } from '@angular/fire/compat/auth';
// import { AngularFireModule } from '@angular/fire/compat';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SearchMoviesComponent } from './search-movies/search-movies.component';
import { HeaderComponent } from './header/header.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { WantWatchComponent } from './want-watch/want-watch.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment'
import { FormsModule } from '@angular/forms';
import { AuthModuleModule } from './auth-module/auth-module.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WatchlistComponent,
    FavoritesComponent,
    SearchMoviesComponent,
    HeaderComponent,
    WantWatchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireAuthModule,
    FormsModule,
    AuthModuleModule
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
