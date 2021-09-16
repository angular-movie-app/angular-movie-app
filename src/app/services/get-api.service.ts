import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GetAPIService {

  constructor(private httpClient: HttpClient) { 
    
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  public getAPI() {
    return this.httpClient.get('api.themoviedb.org/3/search/movie?api_key=3b05444824eda7017c57640089b4e650', this.httpOptions)
  }
}
