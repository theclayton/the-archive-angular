import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResults = [];
  resText = ""
  isLoading = true;

  constructor(private projectService: ProjectService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.checkIfRouteChanged()
  }

  checkIfRouteChanged() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      console.log(queryParams.terms)
        this.getSearchResults(queryParams.terms)
    })
  }

  async getSearchResults(terms: string) {
    let apiRes = await this.projectService.getSearchResults(terms)
    if (apiRes.projects.length > 0) {
      this.searchResults = apiRes.projects
      this.resText = `Search Results for: ${terms}`
    } else {
      this.searchResults = []
      this.resText = `No Results for: ${terms}`
    }
    this.isLoading = false
  }


}