import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageIcon } from './admin-page-icon';

describe('AdminPageIcon', () => {
  let component: AdminPageIcon;
  let fixture: ComponentFixture<AdminPageIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPageIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPageIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
