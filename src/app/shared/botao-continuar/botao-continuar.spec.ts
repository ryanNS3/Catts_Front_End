import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BotaoContinuar } from "./botao-continuar";

describe("BotaoContinuar", () => {
  let component: BotaoContinuar;
  let fixture: ComponentFixture<BotaoContinuar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoContinuar],
    }).compileComponents();

    fixture = TestBed.createComponent(BotaoContinuar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
