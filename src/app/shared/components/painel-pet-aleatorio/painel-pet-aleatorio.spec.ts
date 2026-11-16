import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PainelPetAleatorio } from "./painel-pet-aleatorio";

describe("PainelPetAleatorio", () => {
  let component: PainelPetAleatorio;
  let fixture: ComponentFixture<PainelPetAleatorio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelPetAleatorio],
    }).compileComponents();

    fixture = TestBed.createComponent(PainelPetAleatorio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
