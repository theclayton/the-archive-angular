import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userIsAuthenticated = false;
  userIsAdmin = false;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.checkAuthentication()
  }

  checkAuthentication() {
    try {
      this.userIsAuthenticated = this.authService.isAuth()
      this.checkIfUserIsAdmin()
    } catch {
      this.userIsAuthenticated = false;
      this.userIsAdmin = false;
    }

  }

  checkIfUserIsAdmin() {
    try {
      let authLevel = this.authService.getUserAuthLevel()

      if (authLevel === "admin") {
        this.userIsAdmin = true
      }
    } catch (ex) {
      this.userIsAdmin = false
    }
  }

  onLogout() {
    this.userIsAuthenticated = false
    this.userIsAdmin = false
    this.authService.logout()
  }

}
