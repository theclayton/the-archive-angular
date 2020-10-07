import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-project-preview-small',
  templateUrl: './project-preview-small.component.html',
  styleUrls: ['./project-preview-small.component.css']
})
export class ProjectPreviewSmallComponent implements OnInit {
  @Input() project: Project;

  constructor(private router: Router) { }

  ngOnInit(): void {}

  getImageUrl() {
    return `url('${this.project.images[0].src}')`;
  }

  onViewClicked() {
    this.router.navigate([`projects/${this.project.title}`], { state: { project: this.project }});
  }
}
