import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosnetDetectionComponent } from './posnet-detection.component';

describe('PosnetDetectionComponent', () => {
  let component: PosnetDetectionComponent;
  let fixture: ComponentFixture<PosnetDetectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosnetDetectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosnetDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
