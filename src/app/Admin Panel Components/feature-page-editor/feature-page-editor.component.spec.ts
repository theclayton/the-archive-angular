import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturePageEditorComponent } from './feature-page-editor.component';

describe('FeaturePageEditorComponent', () => {
  let component: FeaturePageEditorComponent;
  let fixture: ComponentFixture<FeaturePageEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturePageEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturePageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
