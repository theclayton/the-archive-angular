import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-view-content',
  templateUrl: './project-view-content.component.html',
  styleUrls: ['./project-view-content.component.css']
})
export class ProjectViewContentComponent implements OnInit {
  project: Project
  isLoading: boolean = true

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private projectService: ProjectService, private authService: AuthService) {
    try {
      this.project = this.router.getCurrentNavigation().extras.state.project;
      this.isLoading = false
    } catch {
      // pass
    }
  }

  async getProjectDatafromAPI(projectName) {
    const res = await this.projectService.getOneProject(projectName)
    if (res) {
      this.project = res.project
      this.isLoading = false
    } else {
      this.router.navigate([''])
    }
  }

  ngOnInit(): void {
    this.checkIfRouteChanged()
  }

  checkIfRouteChanged() {
    this.activatedRoute.params.subscribe((params: Params) => {
        this.getProjectDatafromAPI(params['name'])
    })
  }

  isAdmin() {
    return this.authService.getIsAdmin()
  }

  onEditProject() {
    let encodedTitle: string = encodeURI(this.project.title.toString())
    this.router.navigate([`edit/${encodedTitle}`])
  }


}
