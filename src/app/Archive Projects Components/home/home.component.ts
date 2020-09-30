import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredProjects = [];
  isLoading = true;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getProjectList()
  }

  async getProjectList() {
    let apiRes = await this.projectService.getFeaturedProjects("home")
    this.featuredProjects = apiRes.projects
    this.isLoading = false
  }
}
