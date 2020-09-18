import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  data = [
    { number: '1', title: 'Project One', subtitle: 'The coolest app ever', category: 'Mobile', dateCreated: '12/05/2000' },
    { number: '2', title: 'Project Two', subtitle: 'The second coolest app ever', category: 'Mobile', dateCreated: '01/15/2007' },
  ];

  displayedColumns: string[] = [ 'number', 'title', 'subtitle', 'category', 'dateCreated', 'actions' ];


  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  openProject(thisProj) {
    console.log(thisProj)
    // let url: string = "../assets/docs/" + thisProj.resource
    // window.open(url, '_blank');
  }
}