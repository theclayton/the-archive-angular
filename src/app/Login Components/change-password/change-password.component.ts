import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  isLoading: Boolean = false
  Error: Boolean = false
  ErrorText: string = "Error logging in. Please check you login information."

  constructor(private authService: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
      'password': new FormControl(null, [Validators.required]),
      'verifyPassword': new FormControl(null, [Validators.required]),
    })
  }

  async onChange() {
    this.changePasswordForm.markAllAsTouched();
    if (this.changePasswordForm.invalid) return

    this.isLoading = true

    let password: string = this.changePasswordForm.value.password
    let verifyPassword: string = this.changePasswordForm.value.verifyPassword

    if (password != verifyPassword) {
      this.ErrorText = "Passwords do not match."
      this.Error = true
      this.isLoading = false
      return
    }

    try {
      const updatePassword = await this.authService.changePassword(password)

      if (updatePassword.success) {
        this.openSnackBar(updatePassword.message)
        this.ErrorText = updatePassword.message
        this.isLoading = false
      } else {
        this.ErrorText = updatePassword.message
        this.Error = true
        this.isLoading = false
      }
    } catch (ex) {
      this.ErrorText = "Error updating password. Please try again later."
      this.Error = true
      this.isLoading = false
    }
  }


  openSnackBar(message: string) {
    this._snackBar.open(message, "Dismiss", {
      duration: 5000,
    });
  }

}