import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formTitle: String = "Login"
  loginForm: FormGroup;
  isLoading: Boolean = false
  loginError: Boolean = false
  loginErrorText: string = "Error logging in. Please check you login information."
  constructor(public authService: AuthService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
    })
  }

  async onLogin() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return

    this.isLoading = true

    let email: string = this.loginForm.value.email
    let password: string = this.loginForm.value.password

    try {
      const login = await this.authService.login(email, password)

      if (login.success) {
        this.router.navigate(['/'])
        this.loginErrorText = login.message
      } else {
        this.loginErrorText = login.message
        this.loginError = true
        this.isLoading = false
      }
    } catch (ex) {
      this.loginErrorText = "Error logging in. Please check you login information."
      this.loginError = true
      this.isLoading = false
    }


  }

  onCreateAccount() {

  }

  onPrivacyPolicy() {

  }

}
