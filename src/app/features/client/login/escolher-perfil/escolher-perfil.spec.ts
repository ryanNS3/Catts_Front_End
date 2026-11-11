import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EscolherPerfil } from "./escolher-perfil";

describe("EscolherPerfil", () => {
  let component: EscolherPerfil;
  let fixture: ComponentFixture<EscolherPerfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscolherPerfil],
    }).compileComponents();

    fixture = TestBed.createComponent(EscolherPerfil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
