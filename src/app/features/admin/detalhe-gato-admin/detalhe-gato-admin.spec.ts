import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheGatoAdmin } from './detalhe-gato-admin';

describe('DetalheGatoAdmin', () => {
  let component: DetalheGatoAdmin;
  let fixture: ComponentFixture<DetalheGatoAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheGatoAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheGatoAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
