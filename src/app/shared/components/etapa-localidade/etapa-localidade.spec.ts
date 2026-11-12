import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EtapaLocalidade } from "./etapa-localidade";

describe("EtapaLocalidade", () => {
  let component: EtapaLocalidade;
  let fixture: ComponentFixture<EtapaLocalidade>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtapaLocalidade],
    }).compileComponents();

    fixture = TestBed.createComponent(EtapaLocalidade);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
