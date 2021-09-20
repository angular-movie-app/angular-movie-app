import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MovieItem } from '../movie'
import { pipe } from "rxjs"
import { map } from "rxjs/operators"

interface SearchResponse {
  results: MovieItem[]
}

@Injectable({
  providedIn: 'root'
})

export class GetAPIService {

  constructor(private httpClient: HttpClient) { 
    
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      // 'Access-Control-Allow-Origin': '*'
    })
  }

  public search(movieTerm: string): Observable<MovieItem[]> {
    const url = environment.baseApiUrl + environment.searchEndpoint + environment.apiKey + "&query=" + movieTerm
    console.log("Fetching data at url " + url)
    return this.httpClient.get<SearchResponse>(url, this.httpOptions)
      .pipe(
        map(searchResult => searchResult.results)
      )
  }

  public fetchTopRated(): Observable<MovieItem[]> {
    const url = environment.baseApiUrl + environment.topRatedEnpoint + environment.apiKey
    console.log("Fetching top rated at url " + url)
    return this.httpClient.get<SearchResponse>(url, this.httpOptions)
      .pipe(
        map(searchResults => searchResults.results)
      )
  }
}
