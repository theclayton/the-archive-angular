import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  terms: string = ""

  constructor(private router: Router) { }

  ngOnInit(): void { }

  onSearchClicked() {
    this.router.navigate([`/search`], { queryParams: { terms: this.terms } });
    this.terms = ""
  }
}
