import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {}

  isAuthenticated() {
    return this.authService.isAuth
  }

  isAdmin() {
    return this.authService.getIsAdmin()
  }

  onLogout() {
    this.authService.logout()
  }

}
