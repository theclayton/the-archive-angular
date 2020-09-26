import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-manage-projects',
  templateUrl: './manage-projects.component.html',
  styleUrls: ['./manage-projects.component.css']
})
export class ManageProjectsComponent implements OnInit {
  projectForm: FormGroup;
  isLoading: Boolean = false
  Error: Boolean = false
  ErrorText: string = "Error creating project."

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required]),
    })
  }

  onNewProject() {
    let projectName: string = this.projectForm.value.projectName

    console.log(projectName);

    // TODO: POST apt/projects/create
    // return ErrorText or route to project editor
  }

}
