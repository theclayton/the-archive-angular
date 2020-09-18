import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  data = [
    { number: '1', name: 'clayton', email: 'clayton@flaresoftware.com' },
    { number: '2', name: 'guest', email: 'clayton@flaresoftware.com' }

  ];

  displayedColumns: string[] = [ 'number', 'name', 'email', 'actions' ];


  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  openDoc(thisRow) {
    let url: string = "../assets/docs/" + thisRow.resource
    window.open(url, '_blank');
  }
}