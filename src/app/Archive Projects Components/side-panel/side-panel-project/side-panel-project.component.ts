import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-panel-project',
  templateUrl: './side-panel-project.component.html',
  styleUrls: ['./side-panel-project.component.css'],
})
export class SidePanelProjectComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onProjectClick() {
    console.log('Project 1');
  }
}
