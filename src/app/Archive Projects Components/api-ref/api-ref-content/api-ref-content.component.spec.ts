import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiRefContentComponent } from './api-ref-content.component';

describe('ApiRefContentComponent', () => {
  let component: ApiRefContentComponent;
  let fixture: ComponentFixture<ApiRefContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiRefContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiRefContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
