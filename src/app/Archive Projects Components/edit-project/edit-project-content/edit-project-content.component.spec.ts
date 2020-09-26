import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectContentComponent } from './edit-project-content.component';

describe('EditProjectContentComponent', () => {
  let component: EditProjectContentComponent;
  let fixture: ComponentFixture<EditProjectContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProjectContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
