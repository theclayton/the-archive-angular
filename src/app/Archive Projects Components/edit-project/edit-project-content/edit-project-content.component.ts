import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-edit-project-content',
  templateUrl: './edit-project-content.component.html',
  styleUrls: ['./edit-project-content.component.css']
})
export class EditProjectContentComponent implements OnInit {
  project: Project
  projectForm: FormGroup;
  isLoading: Boolean = false
  Error: Boolean = false
  ErrorText: string = "Error saving project."

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router, private projectService: ProjectService) {
    try {
      this.project = this.router.getCurrentNavigation().extras.state.project;
      this.isLoading = false
    } catch {
      this.getProjectDatafromAPI(this.activatedRoute.snapshot.params['name'])
    }
  }

  async getProjectDatafromAPI(projectName) {
    const res = await this.projectService.getOneProject(projectName)
    if (res) {
      this.project = res.project
      this.updateDefaults()
      this.isLoading = false
    } else {
      this.router.navigate(['/'])
    }
  }
  
  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'subtitle': new FormControl(null, [Validators.required]),
      'category': new FormControl(null, [Validators.required]),
      'thumbnail': new FormControl(null, [Validators.required]),
      'dateCreated': new FormControl(new Date(), [Validators.required]),
      'technologies': new FormControl(null, []),
      'description': new FormControl(null, [Validators.required]),
      'links': new FormControl(null, []),
      'images': new FormControl(null, []),
    })
  }

  isAdmin() {
    return this.authService.getIsAdmin()
  }

  updateDefaults() {
    this.projectForm.get("title").setValue(this.project.title);
    this.projectForm.get("subtitle").setValue(this.project.subtitle);
    this.projectForm.get("category").setValue(this.project.category);
    // this.projectForm.get("thumbnail").setValue(this.project.title);
    this.projectForm.get("dateCreated").setValue(this.project.dateCreated);
    // this.projectForm.get("technologies").setValue(this.project.title);
    this.projectForm.get("description").setValue(this.project.description);
    // this.projectForm.get("links").setValue(this.project.title);
    // this.projectForm.get("images").setValue(this.project.title);
  }

  onSaveProject() {
    // TODO: construct project from form values or default empty values
    let projectName: string = this.projectForm.value.title

    // TODO: PUT apt/projects/:name
    // return ErrorText or route to project editor

    let encodedTitle: string = encodeURI(this.project.title.toString())
    this.router.navigate([`projects/${encodedTitle}`])
  }
}