import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EtapaDadosPessoais } from "./etapa-dados-pessoais";

describe("EtapaDadosPessoais", () => {
  let component: EtapaDadosPessoais;
  let fixture: ComponentFixture<EtapaDadosPessoais>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtapaDadosPessoais],
    }).compileComponents();

    fixture = TestBed.createComponent(EtapaDadosPessoais);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
