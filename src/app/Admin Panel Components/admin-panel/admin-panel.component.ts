import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  isLoading: Boolean = false
  user: User

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.user = this.authService.getUser()
  }

  isAuthenticated() {
    return this.authService.isAuth
  }

  isAdmin() {
    if (this.user.authLevel === "admin") {
      return true
    } else {
      return false
    }
  }


}
