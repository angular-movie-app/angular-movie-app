import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { SearchMoviesComponent } from './search-movies/search-movies.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { WantWatchComponent } from './want-watch/want-watch.component';

const routes: Routes = [
  { path: '', component: WatchlistComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'search-movies', component: SearchMoviesComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'want-watch', component: WantWatchComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// Check this for redirecting when user is not logged in: https://stackoverflow.com/questions/41922466/redirect-user-with-router-depending-on-logged-in-status