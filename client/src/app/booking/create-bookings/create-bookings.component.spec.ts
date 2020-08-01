import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBookingsComponent } from './create-bookings.component';

describe('CreateBookingsComponent', () => {
  let component: CreateBookingsComponent;
  let fixture: ComponentFixture<CreateBookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
