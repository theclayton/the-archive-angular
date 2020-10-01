import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-project-preview',
  templateUrl: './project-preview.component.html',
  styleUrls: ['./project-preview.component.css']
})
export class ProjectPreviewComponent implements OnInit {
  @Input() project: Project;
  descriptionPreview: String = ""

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.descriptionPreview = this.project.description.substr(0, 150) + "..."
  }

  getImageUrl() {
    return `url('${this.project.images[0].src}')`;
  }

  onViewClicked() {
    this.router.navigate([`projects/${this.project.title}`], { state: { project: this.project }});
  }
}
