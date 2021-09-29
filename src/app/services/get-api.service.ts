import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MovieItem } from '../movie'
import { pipe, of } from "rxjs"
import { map } from "rxjs/operators"

interface SearchResponse {
  results: MovieItem[]
}

@Injectable({
  providedIn: 'root'
})

export class GetAPIService {
  private cache = new Map<string, MovieItem[]>()
  constructor(private httpClient: HttpClient) { 
    
  }
  // getConfig(): Observable<any> {
  //   return this.httpClient.get<any>('')  
  // }
  // export getImages(): Observable<any> {
  //   return this.httpClient.get<any>('')  
  // }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      // 'Access-Control-Allow-Origin': '*'
    })
  }

  public search(movieTerm: string): Observable<MovieItem[]> {
    const url = environment.baseApiUrl + environment.searchEndpoint + environment.apiKey + "&query=" + movieTerm
    // If search string movies have already returned a response, use the cache for immediate load times
    const cacheResult = this.cache.get(url)
    if (cacheResult) {
      return of(cacheResult)
    }
    
    console.log("Fetching data at url " + url)
    return this.httpClient.get<SearchResponse>(url, this.httpOptions)
    .pipe(
      map(({ results }) => {
        this.cache.set(url, results)
        console.log('Details' + results.map)
        return results
        })
      )
  }

  public fetchTopRated(): Observable<MovieItem[]> {
    const url = environment.baseApiUrl + environment.topRatedEnpoint + environment.apiKey
    // If top rated is already cached, return cached result instead of refetching data
    const cacheResult = this.cache.get(url)
    if (cacheResult) {
      return of(cacheResult)
    }

    console.log("Fetching top rated at url " + url)
    return this.httpClient.get<SearchResponse>(url, this.httpOptions)
      .pipe(
        map(({ results }) => {
          this.cache.set(url, results)
          return results
        })
      )
  }
}
