import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VedioTestComponent } from './video-test.component';

describe('VedioTestComponent', () => {
  let component: VedioTestComponent;
  let fixture: ComponentFixture<VedioTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VedioTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedioTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
