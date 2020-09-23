import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/models/project.model'
@Component({
  selector: 'app-side-panel-project',
  templateUrl: './side-panel-project.component.html',
  styleUrls: ['./side-panel-project.component.css'],
})
export class SidePanelProjectComponent implements OnInit {
  @Input() project: Project;

  constructor() {}

  ngOnInit(): void {}

  onProjectClick() {
    console.log(this.project.title);
  }
}
