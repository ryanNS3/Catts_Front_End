import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EtapaContato } from "./etapa-contato";

describe("EtapaContato", () => {
  let component: EtapaContato;
  let fixture: ComponentFixture<EtapaContato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtapaContato],
    }).compileComponents();

    fixture = TestBed.createComponent(EtapaContato);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
