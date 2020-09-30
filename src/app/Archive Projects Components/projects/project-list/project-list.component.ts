import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { AuthService } from 'src/app/services/auth.service';
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

  constructor(private authService: AuthService, private projectService: ProjectService, private router: Router) { }

  ngOnInit() {
    this.getProjectList()

    if (this.isAdmin()) {
      this.displayedColumns.push('actions')
    }
  }

  async getProjectList() {
    let apiRes = await this.projectService.getAllProjects()
    this.projectList = apiRes.projects
    this.isLoading = false
  }

  isAdmin() {
    return this.authService.getIsAdmin()
  }

  onSelectProject(project) {
    this.router.navigate([`projects/${project.title}`], { state: { project: project }});
  }

  onClickEdit() {
    console.log("hii")
    // this.router.navigate([`edit/${project.title}`], { state: { project: project }});
  }

  onClickDelete() {
    // alert("Are you sure you want to delete, " + project.title)
  }

}