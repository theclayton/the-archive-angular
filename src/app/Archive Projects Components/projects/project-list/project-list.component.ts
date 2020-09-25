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
    this.checkIfUserIsAdmin()

    if (this.userIsAdmin) {
      this.displayedColumns.push('actions')
    }
    this.getProjectList()
  }

  async getProjectList() {
    let apiRes = await this.projectService.getAllProjects()
    this.projectList = apiRes.projects
    this.isLoading = false
  }

  checkIfUserIsAdmin() {
    try {
      let user = this.authService.getUser()

      if (user.authLevel === "admin") {
        this.userIsAdmin = true
      }
    } catch (ex) {
      this.userIsAdmin = false
    }
  }

  onSelectProject(project) {
    this.router.navigate([`projects/${project.title}`], { state: { project: project }});
  }
}