import { Component, OnInit } from '@angular/core';
import { GetAPIService } from '../services/get-api.service';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.scss']
})
export class SearchMoviesComponent implements OnInit {
  searchMovies: any;
  constructor(private getApiService: GetAPIService) { }
  
  ngOnInit(): void {
    this.getApiService.getAPI().subscribe((data)=>{
      console.log(data);
      this.searchMovies = data;
    })
  }

}
