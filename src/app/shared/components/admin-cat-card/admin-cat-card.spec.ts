import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCatCard } from './admin-cat-card';

describe('AdminCatCard', () => {
  let component: AdminCatCard;
  let fixture: ComponentFixture<AdminCatCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCatCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCatCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
