import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-project-view-content',
  templateUrl: './project-view-content.component.html',
  styleUrls: ['./project-view-content.component.css']
})
export class ProjectViewContentComponent implements OnInit {
  projectData: Project
  @Input() project: Project

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (!this.project) {
      // TODO: Get project

      // if not existing go to 404 page
    } else {
      this.projectData = this.project
    }
  }

}
