import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

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
    this.userIsAuthenticated = this.authService.isAuth()
    this.checkIfUserIsAdmin()
  }

  async checkIfUserIsAdmin() {
    try {
      const authLevel = await this.authService.getUserAuthLevel()

      console.log(authLevel)
      if (authLevel === "admin") {
        this.userIsAdmin = true
      }
    } catch (ex) {
    }
  }
  
  onLogout() {
    this.userIsAuthenticated = false
    this.userIsAdmin = false
    this.authService.logout()
  }

}
