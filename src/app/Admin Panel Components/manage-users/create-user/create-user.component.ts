import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  cUserFormTitle: String = "Create a New User"
  cUserForm: FormGroup;
  isLoading: Boolean = false
  newUserIsAdmin: Boolean = false

  constructor(public authService: AuthService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cUserForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
    })
  }

  onCreateUser() {
    // Are you sure prompt
    // API call
  }

  checkboxChanged() {
    this.newUserIsAdmin = this.newUserIsAdmin ? false : true
  }

}