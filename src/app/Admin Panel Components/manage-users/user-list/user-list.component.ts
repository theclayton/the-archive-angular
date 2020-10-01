import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users = [];
  isLoading: Boolean = true
  displayedColumns: string[] = [ 'name', 'email', 'access' ];


  constructor(public userService: UserService) {}

  ngOnInit() {
    this.getAllUsers()
  }

  async getAllUsers() {
    let apiRes = await this.userService.getAllUsers()
    this.users = apiRes.users

    this.isLoading = false
  }

  onEditUser(user) {
    console.log(user)
  }

}