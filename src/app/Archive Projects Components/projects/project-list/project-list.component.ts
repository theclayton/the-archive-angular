import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projectList = [];
  userIsAdmin = false;
  isLoading = true;
  displayedColumns: string[] = [ 'title', 'subtitle', 'category', 'dateCreated'];

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit() {
    this.getProjectList()
  }

  async getProjectList() {
    let apiRes = await this.projectService.getAllProjects()
    this.projectList = apiRes.projects

    this.isLoading = false
  }

  onSelectProject(project) {
    this.router.navigate([`projects/${project.title}`], { state: { project: project }});
  }

}