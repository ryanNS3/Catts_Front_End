import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PainelGato } from "./painel-gato";

describe("PainelGato", () => {
  let component: PainelGato;
  let fixture: ComponentFixture<PainelGato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelGato],
    }).compileComponents();

    fixture = TestBed.createComponent(PainelGato);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
