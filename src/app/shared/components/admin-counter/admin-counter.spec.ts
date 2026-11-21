import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCounter } from './admin-counter';

describe('AdminCounter', () => {
  let component: AdminCounter;
  let fixture: ComponentFixture<AdminCounter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCounter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCounter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
