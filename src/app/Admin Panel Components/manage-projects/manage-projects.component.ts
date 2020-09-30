import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-manage-projects',
  templateUrl: './manage-projects.component.html',
  styleUrls: ['./manage-projects.component.css']
})
export class ManageProjectsComponent implements OnInit {
  projectForm: FormGroup;
  isLoading: Boolean = false
  error: Boolean = false
  errorText: string = "Error creating project."

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required]),
    })
  }

  async onNewProject() {
    this.projectForm.markAllAsTouched();
    if (this.projectForm.invalid) return

    this.isLoading = true
    let projectName: string = this.projectForm.value.projectName

    try {
      let apiRes = await this.projectService.createProject(projectName);

      this.isLoading = false

      if (apiRes.message === "success") {
        this.router.navigate([`edit/${apiRes.project.title}`], { state: { project: apiRes.project }});
      } else {
        this.error = true
        this.errorText = apiRes.message
      }
    } catch {

    }

  }

}
