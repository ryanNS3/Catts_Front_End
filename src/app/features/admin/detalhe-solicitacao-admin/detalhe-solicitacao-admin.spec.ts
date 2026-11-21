import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheSolicitacaoAdmin } from './detalhe-solicitacao-admin';

describe('DetalheSolicitacaoAdmin', () => {
  let component: DetalheSolicitacaoAdmin;
  let fixture: ComponentFixture<DetalheSolicitacaoAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheSolicitacaoAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheSolicitacaoAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
