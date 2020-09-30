import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

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

  constructor(public userService: UserService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cUserForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
    })
  }

  async onCreateUser() {
    let name: string = this.cUserForm.value.name
    let email: string = this.cUserForm.value.email
    let password: string = this.cUserForm.value.password
    let authLevel: string = "Guest"

    if (this.newUserIsAdmin) {
      authLevel = "Admin"
    }

    let apiRes = await this.userService.createUser(name, email, password, authLevel)
    this.openSnackBar(apiRes.message)
  }

  checkboxChanged() {
    this.newUserIsAdmin = this.newUserIsAdmin ? false : true
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "Dismiss", {
      duration: 5000,
    });
  }

}