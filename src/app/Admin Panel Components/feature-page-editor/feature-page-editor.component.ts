import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-feature-page-editor',
  templateUrl: './feature-page-editor.component.html',
  styleUrls: ['./feature-page-editor.component.css']
})
export class FeaturePageEditorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  allProjects = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  featuredProjects = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

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

  onSave() {
    // Save featured projects to database
  }

}
