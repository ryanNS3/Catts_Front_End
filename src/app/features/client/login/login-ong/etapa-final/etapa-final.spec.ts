import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EtapaFinal } from "./etapa-final";

describe("EtapaFinal", () => {
  let component: EtapaFinal;
  let fixture: ComponentFixture<EtapaFinal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtapaFinal],
    }).compileComponents();

    fixture = TestBed.createComponent(EtapaFinal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
