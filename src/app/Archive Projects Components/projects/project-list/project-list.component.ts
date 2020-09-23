import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  // TODO: GET ALL PROJECTS Newest to Oldest
  data = [
    { number: '1', title: 'Project One', subtitle: 'The coolest app ever', category: 'Mobile', dateCreated: '12/05/2000' },
    { number: '2', title: 'Project Two', subtitle: 'The second coolest app ever', category: 'Mobile', dateCreated: '01/15/2007' },
  ];


  userIsAdmin = false;

  displayedColumns: string[] = [ 'number', 'title', 'subtitle', 'category', 'dateCreated'];


  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.checkIfUserIsAdmin()

    if (this.userIsAdmin) {
      this.displayedColumns.push('actions')
    }
  }

  checkIfUserIsAdmin() {
    try {
      let user = this.authService.getUser()

      if (user.authLevel === "admin") {
        this.userIsAdmin = true
      }
    } catch (ex) {
      this.userIsAdmin = false
    }
  }

  onSelectProject(thisProj) {
    console.log(thisProj)
    // let url: string = "../assets/docs/" + thisProj.resource
    // window.open(url, '_blank');
  }
}