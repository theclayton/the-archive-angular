import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent implements OnInit {
  projectList = [];
  isLoading = true;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getProjectList()
  }

  async getProjectList() {
    let apiRes = await this.projectService.getRecentProjects()
    this.projectList = apiRes.projects
    this.isLoading = false
  }

}
