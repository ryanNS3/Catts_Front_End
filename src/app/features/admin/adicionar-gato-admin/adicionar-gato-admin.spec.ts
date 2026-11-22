import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AdicionarGatoAdmin } from "./adicionar-gato-admin";

describe("AdicionarGatoAdmin", () => {
  let component: AdicionarGatoAdmin;
  let fixture: ComponentFixture<AdicionarGatoAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarGatoAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(AdicionarGatoAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
