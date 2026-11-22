import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RadioOpcao } from "./radio-opcao";

describe("RadioOpcao", () => {
  let component: RadioOpcao;
  let fixture: ComponentFixture<RadioOpcao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioOpcao],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioOpcao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
