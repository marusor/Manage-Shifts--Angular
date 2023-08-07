import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShiftsComponentComponent } from './user-shifts-component.component';

describe('UserShiftsComponentComponent', () => {
  let component: UserShiftsComponentComponent;
  let fixture: ComponentFixture<UserShiftsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserShiftsComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserShiftsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
