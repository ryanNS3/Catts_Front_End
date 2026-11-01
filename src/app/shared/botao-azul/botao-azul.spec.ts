import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BotaoAzul } from "./botao-azul";

describe("BotaoAzul", () => {
  let component: BotaoAzul;
  let fixture: ComponentFixture<BotaoAzul>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoAzul],
    }).compileComponents();

    fixture = TestBed.createComponent(BotaoAzul);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
