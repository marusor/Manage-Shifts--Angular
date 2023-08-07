import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllShiftsComponent } from './admin-all-shifts.component';

describe('AdminAllShiftsComponent', () => {
  let component: AdminAllShiftsComponent;
  let fixture: ComponentFixture<AdminAllShiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAllShiftsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAllShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
