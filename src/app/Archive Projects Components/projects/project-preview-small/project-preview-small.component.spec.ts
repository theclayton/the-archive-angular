import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPreviewSmallComponent } from './project-preview-small.component';

describe('ProjectPreviewSmallComponent', () => {
  let component: ProjectPreviewSmallComponent;
  let fixture: ComponentFixture<ProjectPreviewSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectPreviewSmallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPreviewSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
