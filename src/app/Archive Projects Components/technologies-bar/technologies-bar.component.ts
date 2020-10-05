import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-technologies-bar',
  templateUrl: './technologies-bar.component.html',
  styleUrls: ['./technologies-bar.component.css']
})
export class TechnologiesBarComponent implements OnInit {
  technologies = [];

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.getTechnologies()
  }

  async getTechnologies() {
    let apiRes = await this.projectService.getUniqueTechnologies()
    if (apiRes.message === "success") {
     this.technologies = apiRes.technologies
    } else {
      console.log(apiRes.message)
    }
  }

  onTechClick(tech) {
    this.router.navigate([`/search`], { queryParams: { terms: tech } });
  }

}
