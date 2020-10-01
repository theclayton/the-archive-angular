import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-technologies-bar',
  templateUrl: './technologies-bar.component.html',
  styleUrls: ['./technologies-bar.component.css']
})
export class TechnologiesBarComponent implements OnInit {
  technologies = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getTechnologies()
  }

  async getTechnologies() {
    let apiRes = await this.projectService.getUniqueTechnologies()
    if (apiRes.message === "success") {
      if (apiRes.names.length === apiRes.srcs.length) {
        for (let i=0; i<apiRes.names.length; i++) {
          this.technologies.push({ name: apiRes.names[i], src: apiRes.srcs[i] })
        }
      }
    } else {
      console.log(apiRes.message)
    }
  }

  onTechClick(tech) {
    console.log(tech)
  }

}
