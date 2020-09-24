import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {
  paramsSubscription: Subscription;

  projectName: String = ""

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.projectName = this.route.snapshot.params['name']

    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.projectName = params['name'];
        }
      );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }


}
