import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BotaoOpcao } from "./botao-opcao";

describe("BotaoOpcao", () => {
  let component: BotaoOpcao;
  let fixture: ComponentFixture<BotaoOpcao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoOpcao],
    }).compileComponents();

    fixture = TestBed.createComponent(BotaoOpcao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
