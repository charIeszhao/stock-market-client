import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpoUpdateComponent } from './ipo-update.component';

describe('IpoUpdateComponent', () => {
  let component: IpoUpdateComponent;
  let fixture: ComponentFixture<IpoUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpoUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
