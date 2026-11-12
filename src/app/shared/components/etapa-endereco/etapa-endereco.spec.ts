import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EtapaEndereco } from "./etapa-endereco";

describe("EtapaEndereco", () => {
  let component: EtapaEndereco;
  let fixture: ComponentFixture<EtapaEndereco>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtapaEndereco],
    }).compileComponents();

    fixture = TestBed.createComponent(EtapaEndereco);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
