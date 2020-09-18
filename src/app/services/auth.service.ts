import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'
import { MatSnackBar } from '@angular/material/snack-bar';

const BACKEND_URL = environment.apiUrl + "/auth/login"

@Injectable({ providedIn: "root" })

export class AuthService {
  private isAuthenticated = false;
  private token: string = "invalid";
  private user: User = { name: "", authLevel: "" }
  private tokenTimer: any
  private logoutWarningTimer: any
  private expirationDate = new Date()

  constructor(private httpClient: HttpClient, private router: Router, private _snackBar: MatSnackBar) { }

  isAuth() {
    if (this.isAuthenticated) {
      return true
    } else {
      if (this.loadLocalStoragelogin()) {
        this.getUserInfo()
        return true
      } else {
        return false
      }
    }
  }

  getToken() {
    return this.token
  }

  getUserName() {
    return this.user.name;
  }

  getUserAuthLevel() {
    return this.user.authLevel;
  }

  async login(email: string, password: string) {
    const loginCreds = { email: email, password: password }

    try {
      let res = await this.httpClient.post<{ message: string, expiresIn: number, token: string, name: string, email: string, authLevel: string }>(BACKEND_URL, loginCreds).toPromise()

      if (res.message === "success") {
        const today = new Date()

        this.isAuthenticated = true
        this.token = res.token
        this.user.name = res.name
        this.user.authLevel = res.authLevel

        this.expirationDate = new Date(today.getTime() + res.expiresIn)
        this.setLogoutTimer(res.expiresIn)
        this.saveLoginDataToLocalStorage()

        return { success: true, message: "Success! Logging in now..." }
      }
    } catch (ex) {
      return { success: false, message: ex.error.message }
    }
  }

  private async getUserInfo() {
    try {
      const params: string = "/getinfo"
      let res = await this.httpClient.post<{ message: string, name: string, authLevel: string }>(BACKEND_URL + params, { token: this.token }).toPromise()

      if (res.message === "success") {
        this.user.name = res.name
        this.user.authLevel = res.authLevel

        return true
      }
    } catch (ex) {
      return false
    }
  }

  logout() {
    this.token = "invalid"
    this.isAuthenticated = false
    this.user = null
    this.clearLocalStorageLoginData()
    clearTimeout(this.tokenTimer)
    clearTimeout(this.logoutWarningTimer)

    this.router.navigate(['/login'])
  }

  private loadLocalStoragelogin() {
    const storageLogin = this.getLocalStorageLogin()
    const now = new Date()

    if (!storageLogin) return false;

    const expiresIn = storageLogin.expirationDate.getTime() - now.getTime()

    if (expiresIn > 0) {
      this.token = storageLogin.token
      this.isAuthenticated = true
      this.setLogoutTimer(expiresIn)

      return true
    }
    return false
  }

  private getLocalStorageLogin() {
    const token = localStorage.getItem('token')
    const expirationDate = localStorage.getItem('expiration')

    // TODO: Decrypt items and then return
    // CRYPTO_KEY

    if (!token || token == "invalid") return;

    return {
      token: token,
      expirationDate: new Date(expirationDate),
    }
  }

  private saveLoginDataToLocalStorage() {
    // TODO: Encrypt data before saving to local storage
    // CRYPTO_KEY

    localStorage.setItem('token', this.token)
    localStorage.setItem('expiration', this.expirationDate.toISOString())
  }

  private setLogoutTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration)

    this.logoutWarningTimer = setTimeout(() => {
      this.openSnackBar("You will be logged out in 60 seconds.")
    }, (duration - 60000)) // 60000 = 60 seconds
  }

  private clearLocalStorageLoginData() {
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Dismiss", {
      duration: 5000,
    });
  }

}