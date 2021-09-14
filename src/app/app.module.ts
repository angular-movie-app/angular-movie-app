import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
