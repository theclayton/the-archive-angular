import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectViewContentComponent } from './project-view-content.component';

describe('ProjectViewContentComponent', () => {
  let component: ProjectViewContentComponent;
  let fixture: ComponentFixture<ProjectViewContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectViewContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectViewContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
