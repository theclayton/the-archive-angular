import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelProjectComponent } from './side-panel-project.component';

describe('SidePanelProjectComponent', () => {
  let component: SidePanelProjectComponent;
  let fixture: ComponentFixture<SidePanelProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidePanelProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidePanelProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
