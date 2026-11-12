import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EtapaDadosDaInstituicao } from "./etapa-dados-da-instituicao";

describe("EtapaDadosDaInstituicao", () => {
  let component: EtapaDadosDaInstituicao;
  let fixture: ComponentFixture<EtapaDadosDaInstituicao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtapaDadosDaInstituicao],
    }).compileComponents();

    fixture = TestBed.createComponent(EtapaDadosDaInstituicao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
