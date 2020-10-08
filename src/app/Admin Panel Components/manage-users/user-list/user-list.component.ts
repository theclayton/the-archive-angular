import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users = [];
  isLoading: Boolean = true
  displayedColumns: string[] = ['name', 'email', 'access'];
  selectedUser: string = ""

  constructor(private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllUsers()
  }

  async getAllUsers() {
    let apiRes = await this.userService.getAllUsers()
    this.users = apiRes.users

    this.isLoading = false
  }

  onEditUser(user) {
    this.selectedUser = user.email
  }

  async onDeleteClick() {
    if (confirm("Are you sure you want to delete " + this.selectedUser)) {
      this.isLoading = true
      let apiRes = await this.userService.deleteUser(this.selectedUser)
      this.openSnackBar(apiRes.message)
      this.isLoading = false
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "Dismiss", {
      duration: 5000,
    });
  }
}