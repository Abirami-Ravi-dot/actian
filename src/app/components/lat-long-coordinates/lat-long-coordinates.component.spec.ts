import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatLongCoordinatesComponent } from './lat-long-coordinates.component';

describe('LatLongCoordinatesComponent', () => {
  let component: LatLongCoordinatesComponent;
  let fixture: ComponentFixture<LatLongCoordinatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatLongCoordinatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatLongCoordinatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
