import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditAShiftComponent } from './admin-edit-a-shift.component';

describe('AdminEditAShiftComponent', () => {
  let component: AdminEditAShiftComponent;
  let fixture: ComponentFixture<AdminEditAShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditAShiftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditAShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
