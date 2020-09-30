import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ProjectService } from 'src/app/services/project.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-feature-page-editor',
  templateUrl: './feature-page-editor.component.html',
  styleUrls: ['./feature-page-editor.component.css']
})
export class FeaturePageEditorComponent implements OnInit {
  allProjects = [];
  featuredProjects = [];
  isLoading = true

  constructor(private projectService: ProjectService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getFeaturedList();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  async getFeaturedList() {
    let apiRes = await this.projectService.getFeaturedProjects("home");
    this.featuredProjects = apiRes.projects;

    this.getProjectList()
  }

  async getProjectList() {
    let apiRes = await this.projectService.getAllProjects();
    this.allProjects = apiRes.projects;

    let i = this.allProjects.length;
    while (i--) {
      if (this.allProjects[i].featured === "home") {
        this.allProjects.splice(i, 1);
      }
    }

    this.isLoading = false;
  }


  async onSave() {
    this.isLoading = true;

    let featuredNames = []
    for (let i = 0; i < this.featuredProjects.length; i++) {
      featuredNames.push({ title: this.featuredProjects[i].title });
    }
    console.log(featuredNames)
    let apiRes = await this.projectService.updateFeaturedProjects("home", featuredNames);
    this.openSnackBar(apiRes.message)
    this.isLoading = false
  }


  openSnackBar(message: string) {
    this.snackBar.open(message, "Dismiss", {
      duration: 5000,
    });
  }
}
