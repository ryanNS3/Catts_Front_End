import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatosAdmin } from './gatos-admin';

describe('GatosAdmin', () => {
  let component: GatosAdmin;
  let fixture: ComponentFixture<GatosAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GatosAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GatosAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
