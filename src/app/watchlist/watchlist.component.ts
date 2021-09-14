import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  constructor(private router: Router) { 
    
  }
  wantWatch(): void {
    this.router.navigateByUrl('want-watch');
}
  ngOnInit(): void {
  }

}
