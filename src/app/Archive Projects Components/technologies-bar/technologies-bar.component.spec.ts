import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologiesBarComponent } from './technologies-bar.component';

describe('TechnologiesBarComponent', () => {
  let component: TechnologiesBarComponent;
  let fixture: ComponentFixture<TechnologiesBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnologiesBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnologiesBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
