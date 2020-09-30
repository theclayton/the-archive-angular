import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project.model'
@Component({
  selector: 'app-side-panel-project',
  templateUrl: './side-panel-project.component.html',
  styleUrls: ['./side-panel-project.component.css'],
})
export class SidePanelProjectComponent implements OnInit {
  @Input() project: Project;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onProjectClick() {
    this.router.navigate([`projects/${this.project.title}`], { state: { project: this.project }});
  }
}
