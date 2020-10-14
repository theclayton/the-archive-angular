import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {
  projects = [];
  isLoading = true;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getProjectList()
  }

  async getProjectList() {
    let apiRes = await this.projectService.getAllProjects()
    this.projects = apiRes.projects
    this.isLoading = false
  }

  onNameFilter() {
    this.projects = this.projects.sort((a, b) => b.title > a.title ? -1 : a.title < b.title ? 1 : 0)
  }

  onCategoryFilter() {
    this.projects = this.projects.sort((a, b) => b.category < a.category ? -1 : a.category > b.category ? 1 : 0)
  }

  onDateFilter() {
    this.projects = this.projects.sort((a, b) => b.dateCreated < a.dateCreated ? -1 : a.dateCreated > b.dateCreated ? 1 : 0)
  }
}
