import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllWorkersComponent } from './admin-all-workers.component';

describe('AdminAllWorkersComponent', () => {
  let component: AdminAllWorkersComponent;
  let fixture: ComponentFixture<AdminAllWorkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAllWorkersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAllWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
