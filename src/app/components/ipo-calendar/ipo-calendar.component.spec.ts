import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpoCalendarComponent } from './ipo-calendar.component';

describe('IpoCalendarComponent', () => {
  let component: IpoCalendarComponent;
  let fixture: ComponentFixture<IpoCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpoCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpoCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
